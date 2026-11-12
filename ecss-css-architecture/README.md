# ECSS CSS Architecture

Version: 1.1.0

Reusable Codex skill inspired by [Efficient CSS](https://ecss.info/en/), adapted for the Bdondev/codex-skills collection. It is not an official ECSS implementation or a replacement for Sass or Tailwind.

## Install

Copy the complete folder into `~/.agents/skills/ecss-css-architecture/` for personal reuse or `.agents/skills/ecss-css-architecture/` for project-specific sharing. Avoid duplicating installed skills unnecessarily.

## Usage

- `$ecss-css-architecture Audit the existing CSS architecture; report findings only.`
- `$astro-screenshot-to-site $ecss-css-architecture Implement only the supplied hero; preserve existing tokens and utilities.`
- `$ecss-css-architecture Diagnose mobile overflow and fix the responsible component.`
- `$verify-before-done Verify the completed CSS change against the approved reference.`

Native mode follows selected ECSS principles; compatible mode preserves existing Tailwind, Sass and platform styles. Use project-kickstart for approved setup, platform skills for implementation, and verify-before-done for formal verification as requested or required.

## Package

- SKILL.md — primary workflow; agents/openai.yaml — optional interface metadata.
- references/ — load only relevant guidance.
- templates/AGENTS.css.md — optional project policy snippet.
- tests/scenarios.md — manual evaluation cases, not automated tests.

## Changes from v1.0

Added explicit read-only audits and authorization boundaries, coordination, Sass adaptation, separate token/debugging/source references, agent metadata, and evaluation scenarios. Moved the AGENTS template into templates/.

## Validation

Package structure, YAML, and local references checked. Codex scenario runs, actual project builds, browser testing and ECSS Stylelint integration have not been performed.
