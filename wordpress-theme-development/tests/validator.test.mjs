import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const skill = readFileSync(join(root, 'SKILL.md'), 'utf8');

test('SKILL.md has required frontmatter and preserves platform choices', () => {
  assert.match(skill, /^---\n[\s\S]*?\n---\n/);
  assert.match(skill, /^name:\s*wordpress-theme-development\s*$/m);
  for (const term of ['LocalWP', 'Tailwind', 'classic', 'block', 'hybrid', 'Trofo', 'ACF Free', 'ACF Pro']) assert.match(skill, new RegExp(term, 'i'));
});

test('handoff references and templates exist', () => {
  for (const file of ['references/design-handoff.md', 'references/wordpress-implementation.md', 'templates/DESIGN-HANDOFF.md', 'presets/trofo-localwp.md']) assert.equal(existsSync(join(root, file)), true, file);
});

test('handoff keeps approved v2 artifacts and state QA explicit', () => {
  for (const term of ['docs/DESIGN.md', 'docs/ASSET-INVENTORY.md', 'docs/IMPLEMENTATION.md', 'empty', 'long', 'missing image', 'editor-controlled', 'deviations']) assert.match(skill + readFileSync(join(root, 'references/design-handoff.md'), 'utf8') + readFileSync(join(root, 'references/wordpress-implementation.md'), 'utf8'), new RegExp(term, 'i'));
});
