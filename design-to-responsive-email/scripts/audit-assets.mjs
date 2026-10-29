#!/usr/bin/env node
/**
 * Read-only image metadata auditor for email campaign assets.
 * No image editing, upscaling, hosted file checks or claim of visual fidelity.
 * Supports PNG, JPEG, GIF and common WebP headers. Zero dependencies.
 */
import { readFileSync, readdirSync, statSync, mkdirSync, writeFileSync } from 'node:fs';
import { basename, extname, join, relative, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

function dimensionsFromJPEG(buffer) {
  let offset = 2;
  while (offset + 4 <= buffer.length) {
    if (buffer[offset] !== 0xff) { offset++; continue; }
    while (offset < buffer.length && buffer[offset] === 0xff) offset++;
    const marker = buffer[offset++];
    if (marker === 0xd9 || marker === 0xda) break;
    if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) continue;
    if (offset + 2 > buffer.length) break;
    const length = buffer.readUInt16BE(offset);
    if (length < 2 || offset + length > buffer.length) break;
    if ([0xc0,0xc1,0xc2,0xc3,0xc5,0xc6,0xc7,0xc9,0xca,0xcb,0xcd,0xce,0xcf].includes(marker) && length >= 7) {
      return { width: buffer.readUInt16BE(offset + 5), height: buffer.readUInt16BE(offset + 3) };
    }
    offset += length;
  }
  return {};
}

export function inspectImage(filePath) {
  const buffer = readFileSync(filePath);
  const bytes = buffer.length;
  let format = 'unknown', width = null, height = null, alphaChannel = 'unknown';
  const pngMagic = Buffer.from('89504e470d0a1a0a', 'hex');
  if (bytes >= 26 && buffer.subarray(0, 8).equals(pngMagic) && buffer.toString('ascii', 12, 16) === 'IHDR') {
    format = 'png'; width = buffer.readUInt32BE(16); height = buffer.readUInt32BE(20);
    const c = buffer[25];
    alphaChannel = c === 4 || c === 6 || buffer.includes(Buffer.from('tRNS')) ? 'possible' : 'no';
  } else if (bytes > 4 && buffer[0] === 0xff && buffer[1] === 0xd8) {
    format = 'jpeg'; ({width = null, height = null} = dimensionsFromJPEG(buffer)); alphaChannel = 'no';
  } else if (bytes >= 10 && ['GIF87a','GIF89a'].includes(buffer.toString('ascii', 0, 6))) {
    format = 'gif'; width = buffer.readUInt16LE(6); height = buffer.readUInt16LE(8); alphaChannel = 'possible';
  } else if (bytes >= 30 && buffer.toString('ascii',0,4) === 'RIFF' && buffer.toString('ascii',8,12) === 'WEBP') {
    format = 'webp'; const fourcc = buffer.toString('ascii',12,16);
    if (fourcc === 'VP8X' && bytes >= 30) {
      width = 1 + buffer.readUIntLE(24,3); height = 1 + buffer.readUIntLE(27,3);
      alphaChannel = (buffer[20] & 0x10) ? 'possible' : 'no';
    } else if (fourcc === 'VP8 ' && bytes >= 30 && buffer[23] === 0x9d && buffer[24] === 0x01 && buffer[25] === 0x2a) {
      width = buffer.readUInt16LE(26) & 0x3fff; height = buffer.readUInt16LE(28) & 0x3fff; alphaChannel = 'no';
    } else if (fourcc === 'VP8L' && bytes >= 25 && buffer[20] === 0x2f) {
      const b0=buffer[21], b1=buffer[22], b2=buffer[23], b3=buffer[24];
      width = 1 + (((b1 & 0x3f) << 8) | b0);
      height = 1 + (((b3 & 0x0f) << 10) | (b2 << 2) | (b1 >> 6));
      alphaChannel = 'possible';
    }
  }
  const warnings = [];
  if (format === 'unknown') warnings.push('Unsupported or unrecognized image format.');
  if (!width || !height) warnings.push('Intrinsic pixel dimensions unavailable.');
  if (format === 'webp') warnings.push('WebP email-client support varies; confirm target clients or use JPEG/PNG.');
  if (width && width <= 225) warnings.push('Small intrinsic width; verify actual display size rather than upscaling.');
  if (alphaChannel === 'possible') warnings.push('Alpha *may* exist; header alone does not prove transparent pixels.');
  return { file: filePath, format, width, height, bytes, alphaChannel, warnings };
}

export function auditDirectory(root) {
  const dir = resolve(root);
  const results = [];
  const extensions = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp']);
  function visit(path) {
    for (const entry of readdirSync(path, { withFileTypes: true })) {
      const full = join(path, entry.name);
      if (entry.isDirectory()) visit(full);
      else if (entry.isFile() && extensions.has(extname(entry.name).toLowerCase())) {
        try { results.push({...inspectImage(full), file: relative(dir, full)}); }
        catch (err) { results.push({file: relative(dir,full),error:err.message}); }
      }
    }
  }
  if (!statSync(dir).isDirectory()) throw new Error(`${dir} is not a directory`);
  visit(dir);
  return results.sort((a,b)=>a.file.localeCompare(b.file));
}

function mdEscape(value) { return String(value ?? '—').replace(/\|/g,'\\|').replace(/[\r\n]/g,' '); }
export function toMarkdown(root, rows) {
  const out = [`# Asset metadata audit`, '', `Source directory: \`${root}\``, `Files inspected: **${rows.length}**`, '',
    `> Metadata only. This does not establish visual quality, exact crop provenance, actual transparency or delivery readiness.`, '',
    `| File | Format | Intrinsic size | Bytes | Alpha channel | Warnings |`, `|---|---|---:|---:|---|---|`];
  for (const r of rows) out.push(`| ${mdEscape(r.file)} | ${mdEscape(r.format)} | ${r.width && r.height ? r.width+'×'+r.height : 'unknown'} | ${r.bytes ?? '—'} | ${mdEscape(r.alphaChannel)} | ${mdEscape(r.error || r.warnings?.join('; ') || '')} |`);
  out.push('', 'Next: compare widths against the approved asset manifest, inspect actual crops, preserve the originals and document missing assets.');
  return out.join('\n') + '\n';
}

function main(argv) {
  if (argv.includes('--help') || argv.includes('-h')) {
    console.log('Usage: node audit-assets.mjs [assets-directory] [--out docs/ASSET_AUDIT.md] [--json]'); return;
  }
  let folder = 'assets', out = null, json = false;
  for (let i=0;i<argv.length;i++) {
    const a = argv[i];
    if (a === '--out') { out=argv[++i]; if(!out) throw new Error('--out needs a destination path'); }
    else if (a === '--json') json = true;
    else if (a.startsWith('-')) throw new Error(`Unknown option: ${a}`);
    else folder = a;
  }
  const rows = auditDirectory(folder);
  const content = json || (out && extname(out) === '.json') ? JSON.stringify({directory:resolve(folder),assets:rows}, null,2) + '\n' : toMarkdown(folder,rows);
  if (out) { mkdirSync(dirname(resolve(out)),{recursive:true}); writeFileSync(resolve(out),content); console.log(`Wrote ${out} (${rows.length} image files).`); }
  else process.stdout.write(content);
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))) {
  try { main(process.argv.slice(2)); } catch (error) { console.error(error.message); process.exitCode=2; }
}
