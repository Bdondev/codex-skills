import test from 'node:test';
import assert from 'node:assert/strict';
import { validateHtml } from '../scripts/validate-email.mjs';

const healthy = `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"></head>
<body><div class="preheader" style="display:none">Preview</div>
<table role="presentation"><tr><td><a href="https://shop.example.org/sale">Shop now</a></td></tr></table>
<p>Contact address: 111 Demo Street</p><a href="https://shop.example.org/unsubscribe">Unsubscribe</a>
<img src="https://cdn.example.org/photo.jpg" alt="Fresh produce" width="600" height="300"></body></html>`;

test('normal marketing email static lint has no detected issues', () => {
  const result = validateHtml(healthy, { type: 'marketing', strict: true });
  assert.equal(result.errors, 0);
  assert.equal(result.warnings, 0);
});

test('strict mode fails on marketing placeholder link and missing alt', () => {
  const broken = healthy.replace('https://shop.example.org/sale', '#')
    .replace(' alt="Fresh produce"', '')
    .replace('https://cdn.example.org/photo.jpg', './photo.png');
  const result = validateHtml(broken, { type: 'marketing', strict: true });
  assert.ok(result.errors >= 3);
  assert.ok(result.issues.some(i => i.code === 'IMG_ALT'));
  assert.ok(result.issues.some(i => i.code === 'IMG_HOSTING'));
  assert.ok(result.issues.some(i => i.code === 'LINK_TARGET'));
});

test('transactional email has no marketing-only footer warnings', () => {
  const result = validateHtml(healthy.replace(/<p>Contact address[\s\S]*?<\/p>/, '').replace(/<a href="https:\/\/shop.example.org\/unsubscribe">Unsubscribe<\/a>/, ''), { type: 'transactional' });
  assert.ok(!result.issues.some(i => i.code === 'UNSUBSCRIBE' || i.code === 'POSTAL'));
});

test('script tags are errors even in non-strict mode', () => {
  const result = validateHtml(healthy + '<script>alert(1)</script>', { type: 'transactional' });
  assert.ok(result.issues.some(i => i.code === 'UNSAFE_ELEMENT' && i.severity === 'error'));
});

test('insecure HTTP image URLs are flagged with the correct code', () => {
  const html = healthy.replace('https://cdn.example.org/photo.jpg', 'http://cdn.example.org/photo.jpg');
  const result = validateHtml(html, {type:'marketing',strict:true});
  assert.ok(result.issues.some(i=>i.code==='IMG_HTTP' && i.severity==='error'));
});


test('missing image dimensions and external stylesheet are reported without inventing client results', () => {
  const html = healthy.replace(' width="600" height="300"', '').replace('</head>', '<link rel="stylesheet" href="https://cdn.example.org/styles.css"></head>');
  const result = validateHtml(html, { type: 'marketing' });
  assert.ok(result.issues.some(i => i.code === 'IMG_DIMENSIONS'));
  assert.ok(result.issues.some(i => i.code === 'EXTERNAL_CSS'));
});

test('warns at pre-ESP 90k budget, later at Gmail clipping risk', () => {
  const near = validateHtml(healthy + ' '.repeat(91_000), { type: 'marketing' });
  assert.ok(near.issues.some(i => i.code === 'BYTE_BUDGET'));
  assert.ok(!near.issues.some(i => i.code === 'CLIPPING'));
  const large = validateHtml(healthy + ' '.repeat(105_000), { type: 'marketing' });
  assert.ok(large.issues.some(i => i.code === 'CLIPPING'));
});

test('HTTP links warn and are errors with strict validation', () => {
  const insecure = healthy.replace('https://shop.example.org/sale', 'http://shop.example.org/sale');
  const result = validateHtml(insecure, { type: 'marketing', strict: true });
  assert.ok(result.issues.some(i => i.code === 'LINK_HTTP' && i.severity === 'error'));
});

test('detects missing document charset and doctype', () => {
  const broken = healthy.replace(/<!doctype html>/i, '').replace('<meta charset="UTF-8">', '');
  const result = validateHtml(broken, { type: 'marketing' });
  assert.ok(result.issues.some(i => i.code === 'DOCTYPE'));
  assert.ok(result.issues.some(i => i.code === 'CHARSET'));
});
