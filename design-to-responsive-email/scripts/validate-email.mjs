#!/usr/bin/env node
/**
 * Heuristic static audit for compiled HTML email.
 * Standard library only; does NOT prove email-client rendering, accessibility, or legal compliance.
 * Usage: node validate-email.mjs dist/email.html [--type marketing|transactional] [--strict] [--json]
 */
import { readFileSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

function parseArgs(argv) {
  const opts = { path: null, type: 'marketing', strict: false, json: false };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--help' || arg === '-h') return { help: true };
    if (arg === '--strict') opts.strict = true;
    else if (arg === '--json') opts.json = true;
    else if (arg === '--type') opts.type = argv[++i];
    else if (arg.startsWith('--type=')) opts.type = arg.slice(7);
    else if (!arg.startsWith('-') && !opts.path) opts.path = arg;
    else throw new Error(`Unknown or repeated argument: ${arg}`);
  }
  if (!opts.path) throw new Error('Missing input HTML path.');
  if (!['marketing', 'transactional'].includes(opts.type)) throw new Error('Invalid --type (marketing or transactional).');
  return opts;
}

function attributes(tag) {
  const map = new Map();
  const open = tag.replace(/^<\/?[\w:-]+/, '').replace(/\/?\s*>$/, '');
  // Heuristic HTML attribute parser, robust enough for common quoted MJML output.
  for (const match of open.matchAll(/([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g)) {
    map.set(match[1].toLowerCase(), match[2] ?? match[3] ?? match[4] ?? '');
  }
  return map;
}

function stripText(markup) {
  return markup.replace(/<!--([\s\S]*?)-->/g, '').replace(/<[^>]*>/g, ' ').replace(/&(?:nbsp|#160);/gi, ' ').replace(/\s+/g, ' ').trim();
}

export function validateHtml(html, opts = {}) {
  const type = opts.type || 'marketing';
  const strict = Boolean(opts.strict);
  const issues = [];
  const add = (severity, code, message) => issues.push({ severity, code, message });
  const draft = (code, message) => add(strict ? 'error' : 'warning', code, message);

  const bytes = Buffer.byteLength(html, 'utf8');
  if (!/^\s*<!doctype\s+html\s*>/i.test(html)) add('warning', 'DOCTYPE', 'Missing HTML doctype at start (comments/conditional declarations may precede it in some email builds).');
  if (!/<html\b/i.test(html)) add('warning', 'HTML_ROOT', 'No <html> root found.');
  if (!/<html\b[^>]*\blang\s*=/i.test(html)) add('warning', 'LANG', 'No language on the <html> tag.');
  if (!/<meta\b[^>]*\bcharset\s*(?:=|:)/i.test(html)) add('warning', 'CHARSET', 'No charset declaration found in meta tags.');
  if (!/<meta\b[^>]*\bname\s*=\s*['"]?viewport\b/i.test(html)) add('warning', 'VIEWPORT', 'No viewport meta declaration found.');
  if (!/<table\b/i.test(html)) add('warning', 'LAYOUT', 'No layout table found; inspect email-client compatibility.');
  if (bytes >= 90_000 && bytes <= 102_400) add('warning', 'BYTE_BUDGET', `${bytes} HTML bytes: pre-ESP engineering budget is commonly under 80–90 KB; ESP changes may increase size.`);
  if (bytes > 102_400) add('warning', 'CLIPPING', `${bytes} HTML bytes; Gmail may clip some emails around 102 KB. Test final ESP-transformed message.`);

  // A sentinel must never be shipped in final campaign creative.
  if (/(?:REPLACE_ME|INSERT_URL_HERE|TODO_URL|example\.com|lorem ipsum)/i.test(html)) {
    draft('PLACEHOLDER', 'Placeholder text or example.com URL is present.');
  }
  if (/<link\b[^>]*\brel\s*=\s*['"]?stylesheet/i.test(html)) add('warning', 'EXTERNAL_CSS', 'External stylesheet found; essential CSS should be inlined for mail clients.');
  if (/src\s*=\s*['"]data:image\//i.test(html)) add('warning', 'BASE64_IMAGE', 'Embedded base64 image detected; replace with approved hosted images when possible.');
  for (const tag of ['script', 'iframe', 'form', 'video', 'canvas']) {
    if (new RegExp(`<${tag}\\b`, 'i').test(html)) add('error', 'UNSAFE_ELEMENT', `Found <${tag}>; check unsupported/unsafe email markup.`);
  }

  const imgs = [...html.matchAll(/<img\b[^>]*>/gi)].map(x => x[0]);
  for (let index = 0; index < imgs.length; index++) {
    const at = attributes(imgs[index]);
    if (!at.has('alt')) draft('IMG_ALT', `Image ${index + 1} has no alt attribute (empty alt is valid for decoration).`);
    const src = at.get('src') || '';
    if (!src) draft('IMG_SRC', `Image ${index + 1} has no src.`);
    else if (/^http:\/\//i.test(src)) draft('IMG_HTTP', `Image ${index + 1} uses insecure HTTP.`);
    else if (/^(?:\/|\.\/|\.\.\/|data:)/i.test(src) || !/^(?:https:\/\/|cid:|\{\{|\{%)/i.test(src)) {
      draft('IMG_HOSTING', `Image ${index + 1} uses a potentially non-deliverable src: ${src.slice(0, 120)}`);
    }
    if (!at.has('width') || !at.has('height')) add('warning', 'IMG_DIMENSIONS', `Image ${index + 1} has no explicit width and height attributes; verify image fallback and responsive sizing.`);
    const width = at.get('width');
    if (width && /^\d+$/.test(width) && +width > 1200) add('warning', 'IMG_WIDTH', `Image ${index + 1} has width=${width}; inspect mobile scaling.`);
  }

  const anchors = [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)];
  if (!anchors.length) add('warning', 'LINKS', 'No links detected; check CTAs.');
  for (let index = 0; index < anchors.length; index++) {
    const a = attributes('<a ' + anchors[index][1] + '>');
    const href = a.get('href') || '';
    if (!href || href === '#' || /^javascript:/i.test(href)) draft('LINK_TARGET', `Link ${index + 1} has missing, placeholder or unsafe href.`);
    else if (/^http:\/\//i.test(href)) draft('LINK_HTTP', `Link ${index + 1} uses insecure HTTP; use an approved HTTPS target.`);
    else if (!/^(https?:\/\/|mailto:|tel:|\{\{|\{%|\[\[)/i.test(href)) draft('LINK_TARGET', `Link ${index + 1} has a relative/unsupported href: ${href.slice(0, 120)}`);
    const inner = anchors[index][2];
    if (!stripText(inner) && !/<img\b[^>]*\balt\s*=/i.test(inner)) add('warning', 'LINK_NAME', `Link ${index + 1} may lack a discernible name.`);
  }

  if (!/(?:preheader|mj-preview|display\s*:\s*none)[\s\S]{0,180}/i.test(html)) {
    add('warning', 'PREHEADER', 'Hidden preview/preheader not detected (heuristic).');
  }
  if (type === 'marketing') {
    if (!/(?:unsubscribe|désabonn|desabonn|opt.out|\{\%\s*unsubscribe|\{\{\s*unsubscribe)/i.test(html)) {
      add('warning', 'UNSUBSCRIBE', 'No obvious marketing opt-out link/token detected; verify ESP and jurisdiction requirements.');
    }
    if (!/(?:address|adresse|postal|street|avenue|road|rue|boulevard)/i.test(html)) {
      add('warning', 'POSTAL', 'No obvious postal address detected; verify supplied compliance footer.');
    }
  }
  if (/\b(?:position\s*:\s*absolute|display\s*:\s*grid|display\s*:\s*flex)\b/i.test(html)) {
    add('warning', 'CSS_SUPPORT', 'Potentially unsupported browser-style CSS found; inspect inbox rendering.');
  }
  return { bytes, type, strict, images: imgs.length, links: anchors.length, issues,
    errors: issues.filter(i => i.severity === 'error').length,
    warnings: issues.filter(i => i.severity === 'warning').length };
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.help) {
    console.log('Usage: node validate-email.mjs <compiled.html> [--type marketing|transactional] [--strict] [--json]');
    return;
  }
  const path = resolve(opts.path);
  if (!statSync(path).isFile()) throw new Error(`Not a file: ${path}`);
  const html = readFileSync(path, 'utf8');
  const result = validateHtml(html, opts);
  if (opts.json) console.log(JSON.stringify({ file: path, ...result }, null, 2));
  else {
    console.log(`HTML email lint: ${path}\n${result.bytes} bytes, ${result.images} images, ${result.links} links; ${result.errors} errors, ${result.warnings} warnings`);
    for (const issue of result.issues) console.log(`  [${issue.severity.toUpperCase()}] ${issue.code}: ${issue.message}`);
    if (!result.issues.length) console.log('No static heuristic issues detected. Real-client QA is still required.');
  }
  if (result.errors) process.exitCode = 1;
}

const isDirect = process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url));
if (isDirect) {
  try { main(); }
  catch (error) { console.error(`Error: ${error.message}`); process.exitCode = 2; }
}
