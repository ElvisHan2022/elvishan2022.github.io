# Personal site: night clinic floorplan

Static site, no framework, no build step required. Deployed on GitHub Pages from the repo root.

## Structure
- `content.js`: the single source of truth for all text. `window.SITE = { name, tagline, location, links, now, rooms: [...] }`. Each room has `id`, `kanji`, `romaji`, `title`, `subtitle`, and either `blocks` (typed content blocks: p, h, list, entry, pub, links) or `beliefs` (array of strings) plus optional `intro`.
- `index.html`: page shell and the inline SVG floorplan (viewBox 1200 × 800). Rooms are `<g class="room" data-room="<id>">`; the `data-room` value must match a room `id` in `content.js`.
- `style.css`: single committed dark theme (indigo night ground, washi paper panel). CSS variables at the top define palette and type. Mobile layout under `@media (max-width: 820px)` shows a stacked version of all sections.
- `app.js`: renders content into directory, panel, and mobile stack; handles hash deep links (`#beliefs`), Escape, arrow keys, prev/next.
- `build.py`: optional; inlines everything to `dist/index.html`, and `--artifact` writes a body-only fragment for claude.ai artifacts.

## Conventions
- Content edits go in `content.js` only. Do not hardcode text into `index.html` or `app.js`.
- Keep `data-room` ids stable; the panel logic and deep links depend on them.
- New block types: add a `case` in `renderBlocks` in `app.js` and matching styles in `style.css` (both in `.panel-body` and in the `.stack` mobile overrides).
- Writing style for site copy: no em dashes, no "not X but Y" constructions, first person, plain and specific.
- Publication statuses must be stated honestly (submitted, in preparation, accepted). Never upgrade a status without confirmation.

## Testing
`python3 build.py` then open `dist/index.html`, or serve the folder with `python3 -m http.server`. Check desktop (1400 wide) and a 390-wide mobile viewport. Every room on the map and every directory line should open the panel; Escape closes it.
