# Personal Website (11ty)

Simple, mobile-friendly personal website built with Eleventy.

## Why this setup

- Content is authored in clean Markdown.
- Styling and UI structure live in templates/CSS, not in Markdown content files.
- Contact icons and profile metadata are rendered from structured data.

## Edit content

Main text content:

- `src/content/hero.md`
- `src/content/highlights.md`
- `src/content/belief.md`
- `src/content/now.md`

Structured data (site metadata, proofline, skills, contacts, links):

- `src/_data/site.js`

## Layout and styling

- Page template: `src/index.njk`
- Styles: `src/assets/css/styles.css`
- Theme toggle script: `src/assets/js/theme.js`

## Run locally

Install dependencies:

```bash
npm install
```

Start dev server:

```bash
npm run dev
```

Build static output:

```bash
npm run build
```

Generated site output is written to `_site/`.

Note: `_site/` is generated output and is safe to delete. Running `npm run build` or `npm run dev` recreates it.

## Static assets

- Resume files stay in `downloads/` and are copied to the output automatically.
