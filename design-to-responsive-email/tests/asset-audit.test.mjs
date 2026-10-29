import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync, writeFileSync, rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {inspectImage, auditDirectory, toMarkdown} from '../scripts/audit-assets.mjs';

function temp(fn) {const dir=mkdtempSync(join(tmpdir(),'email-audit-')); try{fn(dir);}finally{rmSync(dir,{recursive:true,force:true});}}

test('reads PNG dimensions and alpha channel conservatively', () => temp(dir => {
  const png=Buffer.alloc(26); Buffer.from('89504e470d0a1a0a','hex').copy(png,0);png.write('IHDR',12);png.writeUInt32BE(1200,16);png.writeUInt32BE(600,20);png[25]=6;
  const file=join(dir,'hero.png');writeFileSync(file,png);
  const info=inspectImage(file);assert.equal(info.format,'png');assert.equal(info.width,1200);assert.equal(info.height,600);assert.equal(info.alphaChannel,'possible');
  const all=auditDirectory(dir);assert.equal(all.length,1);assert.match(toMarkdown(dir,all),/1200×600/);
}));

test('reads GIF dimensions without claiming actual transparency', () => temp(dir => {
  const gif=Buffer.alloc(10);gif.write('GIF89a');gif.writeUInt16LE(320,6);gif.writeUInt16LE(390,8);const file=join(dir,'mini.gif');writeFileSync(file,gif);
  const img=inspectImage(file);assert.equal(img.width,320);assert.equal(img.height,390);assert.equal(img.alphaChannel,'possible');
}));

test('reads JPEG SOF dimensions', () => temp(dir => {
  const jpeg=Buffer.from([0xff,0xd8,0xff,0xc0,0x00,0x0b,0x08,0x02,0x58,0x04,0xb0,0x03,0x01,0x11,0x00,0xff,0xd9]);
  const file=join(dir,'farm.jpg');writeFileSync(file,jpeg);
  const img=inspectImage(file);assert.equal(img.width,1200);assert.equal(img.height,600);assert.equal(img.alphaChannel,'no');
}));

test('bad file gives an honest unknown rather than dimensions', () => temp(dir => {
  const file=join(dir,'fake.png');writeFileSync(file,Buffer.from('not an image'));
  const img=inspectImage(file);assert.equal(img.width,null);assert.equal(img.format,'unknown');assert.ok(img.warnings.length);
}));
