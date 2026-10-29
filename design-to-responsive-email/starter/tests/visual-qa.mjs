#!/usr/bin/env node
/**
 * Browser-only visual QA. Requires `npm i -D playwright` and `npx playwright install chromium`.
 * It does not emulate Outlook, Gmail, Apple Mail or dark-mode transformations.
 */
import {mkdir, readFile, writeFile} from 'node:fs/promises';
import {resolve, dirname, join} from 'node:path';
import {pathToFileURL} from 'node:url';

const viewports = [320,390,600,1440];
const htmlFile = resolve(process.argv[2] || 'dist/email.html');
const screenshotDir = resolve(process.argv[3] || 'tests/screenshots');
const reportPath = resolve('docs/QA_REPORT.md');

if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log('Usage: node tests/visual-qa.mjs [compiled-html] [screenshot-directory]');
  process.exit(0);
}

let chromium;
try { ({chromium} = await import('playwright')); }
catch { console.error('Playwright is optional. Install in the EMAIL PROJECT: npm i -D playwright && npx playwright install chromium'); process.exit(2); }

let browser;
try {
  const html = await readFile(htmlFile);
  await mkdir(screenshotDir,{recursive:true}); await mkdir(dirname(reportPath),{recursive:true});
  browser = await chromium.launch({headless:true});
  const result = [];
  for (const width of viewports) {
    const page = await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1});
    await page.goto(pathToFileURL(htmlFile).href,{waitUntil:'load'});
    await page.evaluate(() => document.fonts?.ready);
    const info = await page.evaluate(() => {
      const doc = document.documentElement;
      const images = [...document.images].map(img=>({src:img.getAttribute('src') || '',altPresent:img.hasAttribute('alt'),loaded:img.complete && img.naturalWidth>0}));
      const links = [...document.querySelectorAll('a')].map(a=>a.getAttribute('href') || '');
      const placeholders = links.filter(h => !h || h === '#' || /example\.com|replace.me|todo.url|insert.url.here/i.test(h));
      return {pageWidth:innerWidth,scrollWidth:doc.scrollWidth,overflow:doc.scrollWidth>innerWidth+1,images,links:links.length,placeholderLinks:placeholders};
    });
    const filename = join(screenshotDir,`email-${width}px.png`);
    await page.screenshot({path:filename,fullPage:true});
    result.push({width,filename, ...info});
    await page.close();
  }
  const lines = [`# Browser visual QA`, '', `Source: \`${htmlFile}\``, `Compiled HTML bytes: **${html.byteLength}**`, '',
    '**Important:** Chromium screenshots are browser-only. They do not prove Outlook, Gmail, Apple Mail or real-inbox compatibility.', '',
    '| Width | Overflow | Unloaded images | Images missing alt | Placeholder links | Screenshot |', '|---:|---|---:|---:|---:|---|'];
  for (const r of result) lines.push(`| ${r.width}px | ${r.overflow?'YES':'No'} | ${r.images.filter(i=>!i.loaded).length} | ${r.images.filter(i=>!i.altPresent).length} | ${r.placeholderLinks.length} | \`${r.filename}\` |`);
  lines.push('', '## Required manual reviews', '', '- [ ] Compare every section with supplied design (including crop, overlap, type and spacing).', '- [ ] Read with images disabled.', '- [ ] Test target Gmail / Apple Mail / Outlook versions with actual inboxes or service.', '- [ ] Verify ESP tokens, links, sender details, legal/unsubscribe and hosted HTTPS assets.', '');
  await writeFile(reportPath,lines.join('\n'));
  console.log(`Wrote ${reportPath} and ${result.length} screenshots.`);
  if (result.some(r=>r.overflow||r.images.some(i=>!i.loaded)||r.placeholderLinks.length>0)) process.exitCode=1;
} catch(err) {
  console.error('Visual QA failed:',err.message);
  process.exitCode=2;
} finally { if(browser) await browser.close(); }
