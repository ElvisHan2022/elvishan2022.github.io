# elvishan.dev (working name)

A personal site drawn as a bedroom: a painted room where every object opens a section. The bookshelf opens the reading list, the laptop opens research, the papers on the floor open publications, the boxes on the shelf open builds, the journal opens things I believe, the CD rack opens music, the projector opens movies, the plant opens contact. An older floorplan view lives at `map.html`.

No framework, no build step. The files:

| file | what it is | edit it when |
|---|---|---|
| `content.js` | every word on the site (about, research, publications, builds, beliefs, contact) | you add a belief, a paper, a project, or change the "now" line |
| `books.js` | the bookshelf: books, short stories, manga, manhwa, plus the movie list for the projector | you finish a book, write a review, or watch a film |
| `music.js` | albums for the music panel: titles, artists, cover art, optional links | you add an album to the wall |
| `posts.js` | writing list behind the low shelf | you publish a post elsewhere |
| `index.html` | the home room: the painting plus the hotspot rectangles drawn over it | you move a hotspot or add an object |
| `img/home.jpg` | the painting itself | you replace the room art |
| `img/music/` | album cover images referenced from `music.js` | you add a cover (jpg, png, or webp) |
| `room.js`, `room.css` | room behavior (zoom, panel, bookshelf/music views) and its styling | rarely |
| `map.html`, `app.js` | the floorplan site map, reachable from the top-right link | rarely |
| `style.css` | shared colors, type, panel layout, mobile stack | you want a different palette or panel font |
| `render.js` | shared renderer for content blocks | almost never |

`build.py` is optional. It inlines everything into `dist/index.html` (one file you can email or drop anywhere) and `dist/artifact.html` (for claude.ai artifacts). GitHub Pages does not need it.

## Deploy to GitHub Pages (about five minutes)

1. Create a new public repo, for example `elvishan2022.github.io` (that exact name gives you `https://elvishan2022.github.io` with no extra setup) or any name for a project site.
2. Copy everything except `dist/` and `build.py` into it, keeping the `img/` folder (including `img/music/` for album covers).
3. Push to `main`.
4. In the repo, Settings → Pages → Source: "Deploy from a branch", branch `main`, folder `/ (root)`. Save.
5. Wait a minute. The site is at the URL Pages shows you.
6. Optional custom domain: buy one, add a `CNAME` file containing the domain, and point the domain's DNS at GitHub per their docs.

## Editing content

Open `content.js`. Each room is an object in the `rooms` array. Three block types cover most needs:

```js
{ type: "p", text: "A paragraph." }
{ type: "h", text: "A small red section heading" }
{ type: "list", items: ["one", "two"] }
```

Research and builds use `entry`:

```js
{ type: "entry",
  title: "Name of the project",
  meta: "Lab or venue · dates",
  text: "One or two sentences on what it does and what you found.",
  link: "https://github.com/...",       // optional
  tags: ["wearables", "subgroup auditing"] }
```

Publications use `pub`. Status badges are colored bubbles (see `pub-legend` below). The color is picked from the status text automatically:

| Status text contains | Color | Examples |
|---|---|---|
| `accepted` | green | "Accepted, NeurIPS 2026" |
| `submitted`, `in review` | orange | "Submitted, Aug 2026", "Abstract submitted" |
| everything else | blue | "In preparation", "Working paper" |

Add a legend row at the top of the publications room with `{ type: "pub-legend" }`.

```js
{ type: "pub",
  title: "Paper title",
  venue: "Venue, year",
  status: "Submitted, Aug 2026",
  link: "https://...",                   // optional
  text: "" }                             // optional one-line summary
```

Beliefs are just strings in the `beliefs` array of the `beliefs` room. Add a line, save, done. The books-on-shelf counter in the bottom-left corner updates itself.

The `now` string in `content.js` still drives the "Now" panel; it is no longer shown in a top banner.

## Moving or adding a hotspot in the room

Hotspots are `<rect class="hs" data-spot="...">` elements inside the SVG in `index.html`, drawn on a 2000 × 1116 grid laid over the painting (x runs left to right, y top to bottom). To move one, change its x, y, width, height. To add one, copy a rect, give it a new `data-spot` id, then add a matching entry to the `SPOTS` list at the top of `room.js` (kanji, title, subtitle, and either `room: "<id from content.js>"` or `view: "<built-in view>"`).

## Replacing the painting

Drop a new image at `img/home.jpg`. If its proportions differ from 2752 × 1536, update the `width`/`height` on the `<img>` in `index.html` and the `aspect-ratio` and `width` calc in `room.css`, then re-trace the hotspots.

## Writing (blog posts hosted elsewhere)

`posts.js` holds the list shown behind the low shelf. Add one object per post:

```js
{ title: "Why average accuracy is the wrong number to lead with",
  where: "LessWrong",              // badge text: LessWrong, Substack, anywhere
  date: "2026-10",                 // "YYYY-MM" or "YYYY-MM-DD"
  url: "https://www.lesswrong.com/posts/...",
  summary: "One paragraph on what the post argues." }   // optional
```

Entries sort newest first automatically. `feeds` at the bottom of the file holds your profile links (LessWrong, Substack), rendered as buttons.

Why a manual list rather than a live feed: GitHub Pages serves static files only, and browsers block a page from reading another site's RSS directly (cross-origin). Pulling posts automatically would mean either a scheduled GitHub Action that fetches your feeds and rewrites `posts.js` on a timer, or a third-party proxy. Both are addable later; pasting four lines per post is faster until you are publishing weekly.

## Music (album covers on the wall)

Albums live in `music.js`. Cover art goes in `img/music/` and is referenced by path. `index.html` already loads `music.js` after `posts.js`.

```js
window.MUSIC = {
  items: [
    {
      title: "Jane Doe",
      artist: "Chainsaw Man OST",
      cover: "img/music/jane-doe.jpg",   // drop the file in img/music/
      note: "The cover on the wall — Reze.",
    },
    {
      title: "Another Album",
      artist: "Artist name",
      cover: "img/music/another-album.webp",  // optional; omit for a color placeholder
      link: "https://open.spotify.com/...",   // optional; makes the card a link
      note: "Why it stays on the wall.",
    },
  ],
};
```

- **`cover`** — path to a jpg, png, or webp in `img/music/`. If the file is missing, the panel falls back to a colored square.
- **`link`** — optional. Omit it if the card should not navigate anywhere.
- **`note`** — optional one-liner under the artist name.

The music panel renders a grid of cover squares with title, artist, and note below each. Covers use the same rounded keycap frame as the floating UI.

## Floating UI (menu, help, status, buttons)

The directory, help card, status box, top-right buttons, and menu tab share one "keycap" look in `room.css`. Change only the six `--chrome-*` variables at the top of that file:

| Variable | What it controls |
|---|---|
| `--chrome-bg` | beige face (`#e7dcc6`) |
| `--chrome-bg-lit` | lighter top of the keycap |
| `--chrome-ink` | text on beige |
| `--chrome-ink-dim` | secondary text |
| `--chrome-radius` | corner softness (`16px`) |
| `--chrome-lip` | height of the printed bottom edge (`5px`) |

Push `--chrome-radius` to `22px` for rounder keys, `--chrome-lip` to `7px` for chunkier ones. Move `--chrome-bg` toward `#e3d5b8` for warmer beige or `#e8e2d2` for cooler.

The menu tab (`部屋 menu`) on the left opens the full object list; it is hidden by default. On mobile the list stays visible as a stacked section.

Panel tag keywords and publication status bubbles reuse the same rounded style on the room page. Panel body text on the room page uses **Arimo** (`--f-chrome`); titles inside the panel still use the display font from `style.css`.

## What to change, and where

| You want to change | Open | What to look for |
|---|---|---|
| A belief, a project, a paper, the "now" line | `content.js` | the room with the matching `id` |
| A book, a review, a rating, a reread | `books.js` | `BOOKS.shelves` |
| A film | `books.js` | `MOVIES.items` at the bottom |
| A blog post or a profile link | `posts.js` | `POSTS.items` and `POSTS.feeds` |
| An album or cover art | `music.js` | `MUSIC.items`; image file in `img/music/` |
| The name or one-line description of a clickable object | `room.js` | the `SPOTS` list at the top |
| Where an object's clickable box sits on the painting | `index.html` | the `<rect class="hs">` list, on a 2000 × 1116 grid |
| The color and strength of the hover outline | `room.css` | the four `--hs-*` variables |
| The beige floating panels and buttons | `room.css` | the six `--chrome-*` variables |
| The help card text | `index.html` | `<aside class="help">` |
| Fonts and palette inside the sliding panel | `style.css` | the `@import` line and `:root` block |

## Full-bleed vs framed

`index.html` has `<body class="room-page fill">`. With `fill`, the painting covers the whole viewport as a background and the chrome panels float over it. Delete the word `fill` and the painting returns to a framed box on a dark wall. Nothing else changes.

In fill mode the painting uses `object-fit: cover` so there are no black bars at the edges. Hotspot outlines and zoom-to-object navigation still work when a panel is open.

## Fonts

Two layers:

**Inside the sliding panel** — controlled from the block at the top of `style.css`: an `@import` line and `--f-display`, `--f-body`, `--f-mono`, `--f-label`. Current defaults are Zen Old Mincho and Newsreader for the washi panel.

**Floating chrome and room-page labels** — Arimo, set by `--f-chrome` in `room.css`. This covers the menu, help, status, buttons, tag bubbles, publication status pills, album labels, and panel body paragraphs on the room page.

| Variable | What it sets |
|---|---|
| `--f-display` | kanji and big titles, book and project titles |
| `--f-body` | panel paragraphs and lists (map page and panel interior) |
| `--f-label` | subtitles, section headings, dates, venues |
| `--f-chrome` | beige UI and room-page body copy (Arimo) |

Three ready alternatives for the panel fonts are written as comments in `style.css`. To swap Arimo on the chrome, change the `@import` at the top of `room.css` and `--f-chrome`.

Keep a Japanese-capable face in `--f-display`, or kanji in the panel header fall back to a system font.

Sizes: panel body is `.panel-body { font-size }` in `style.css`; chrome labels are sized in `room.css`.

## Roadmap toward "more interactive"

Ideas in rough order of effort, all of which fit the current structure:

- Mini-posts: add a `posts` array to `content.js` and a `post` block type in `app.js`, rendered in the study; or keep posts as markdown files and load them with `fetch` (works on GitHub Pages).
- Ambient motion: window lights that flicker, a cat that walks the engawa, rain on the pond. All are SVG animations in `index.html`.
- Time of day: read the visitor's clock and swap the palette between day and night.
- A proper 3D scene (Three.js) can replace `#map` later without touching `content.js` or the panel logic. Keep `data-room` ids stable and everything else keeps working.

## Credits and notes

The hanko in the panel corner is a placeholder (`印`). Change it in `style.css` under `.panel-head::after`. Panel fonts load from Google Fonts via `@import` in `style.css`; chrome fonts load from `@import` in `room.css`.
