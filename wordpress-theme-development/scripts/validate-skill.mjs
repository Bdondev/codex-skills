#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const skill = readFileSync(join(root, 'SKILL.md'), 'utf8');
const errors = [];
if (!/^---\n[\s\S]*?\n---\n/.test(skill) || !/^name:\s*wordpress-theme-development\s*$/m.test(skill) || !/^description:\s*.+$/m.test(skill)) errors.push('invalid SKILL.md frontmatter');
for (const path of [
  'references/architecture.md', 'references/content-and-acf-free.md', 'references/localwp-workflow.md',
  'references/official-links.md', 'references/visual-qa.md', 'references/design-handoff.md',
  'references/wordpress-implementation.md', 'presets/trofo-localwp.md', 'templates/AGENTS.wordpress.md',
  'templates/section-brief.md', 'templates/DESIGN-HANDOFF.md'
]) if (!existsSync(join(root, path))) errors.push(`missing local reference: ${path}`);
for (const needle of ['mockup-to-design-spec', 'ASSET-INVENTORY.md', 'IMPLEMENTATION.md', 'ACF Pro', 'empty', 'long', 'missing-image', 'deviations']) if (!skill.toLowerCase().includes(needle.toLowerCase())) errors.push(`missing required handoff term: ${needle}`);
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log('wordpress-theme-development: frontmatter, local references and handoff requirements are valid');
