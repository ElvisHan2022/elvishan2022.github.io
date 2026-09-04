# Personal site: the home room

Static site, no framework, no build step required. Deployed on GitHub Pages from the repo root. `index.html` is a painted bedroom with clickable hotspots; `map.html` is the older floorplan kept as a site map.

## Structure
- `content.js`: the single source of truth for all text. `window.SITE = { name, tagline, location, links, now, rooms: [...] }`. Each room has `id`, `kanji`, `romaji`, `title`, `subtitle`, and either `blocks` (typed content blocks: p, h, list, entry, pub, links) or `beliefs` (array of strings) plus optional `intro`.
- `books.js`: `window.BOOKS = { shelves: [{ id, label, kanji, items: [{ title, author?, kind?, reads: [{from, to?}], rereads, rating, review }] }] }` and `window.MOVIES = { items: [...] }`. An open-ended read (no `to`) means currently reading.
- `index.html`: the room. `<img src="img/home.jpg">` (2752 × 1536) under an SVG with `viewBox="0 0 2000 1116"` holding `<rect class="hs" data-spot="<id>">` hotspots. `data-spot` must match an entry in `SPOTS` in `room.js`.
- `room.js`: SPOTS list (order = directory order), hover labels, zoom-to-hotspot (CSS transform on `.scene-inner`), panel open/close, and the built-in views: bookshelf (spine grid from books.js), music (reads `window.MUSIC` if a music.js exists), movies, outdoor placeholder, now.
- `room.css`: room-specific styles, loaded after style.css.
- `posts.js`: `window.POSTS = { items: [{title, where, date, url, summary}], feeds: [{label, url}] }`. Rendered by the `writing` spot, sorted newest first.
- `render.js`: shared `R.el`, `R.renderBlocks`, `R.linksList`, `R.clock`, `R.colophon`.
- `map.html` + `app.js`: the floorplan (viewBox 1200 × 800), self-contained.
- `style.css`: fonts are loaded by an `@import` at the top of this file (not a `<link>` in the HTML) and assigned by `--f-display` / `--f-body` / `--f-mono`; documented alternatives sit in the comment block above them. Single committed dark theme (indigo night ground, washi paper panel). CSS variables at the top define palette and type. Mobile layout under `@media (max-width: 820px)` shows a stacked version of all sections.
- `app.js`: renders content into directory, panel, and mobile stack; handles hash deep links (`#beliefs`), Escape, arrow keys, prev/next.
- `build.py`: optional; inlines everything to `dist/index.html`, and `--artifact` writes a body-only fragment for claude.ai artifacts.

## Conventions
- Content edits go in `content.js` only. Do not hardcode text into `index.html` or `app.js`.
- Keep `data-spot` (room) and `data-room` (map) ids stable; deep links (`#beliefs`) depend on them.
- New objects in the room: add a rect in index.html and a SPOTS entry in room.js; content goes in content.js or books.js.
- New block types: add a `case` in `renderBlocks` in `app.js` and matching styles in `style.css` (both in `.panel-body` and in the `.stack` mobile overrides).
- Writing style for site copy: no em dashes, no "not X but Y" constructions, first person, plain and specific.
- Publication statuses must be stated honestly (submitted, in preparation, accepted). Never upgrade a status without confirmation.

## Testing
`python3 build.py` then open `dist/index.html` (room) or `python3 build.py map` for the floorplan, or serve the folder with `python3 -m http.server`. Check desktop (1400 wide) and a 390-wide mobile viewport. Every room on the map and every directory line should open the panel; Escape closes it.
