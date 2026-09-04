# elvishan.dev (working name)

A personal site drawn as a bedroom: a painted room where every object opens a section. The bookshelf opens the reading list, the laptop opens research, the papers on the floor open publications, the boxes on the shelf open builds, the journal opens things I believe, the projector opens movies, the plant opens contact. An older floorplan view lives at `map.html`.

No framework, no build step. The files:

| file | what it is | edit it when |
|---|---|---|
| `content.js` | every word on the site (about, research, publications, builds, beliefs, contact) | you add a belief, a paper, a project, or change the "now" line |
| `books.js` | the bookshelf: books, short stories, manga, manhwa, plus the movie list for the projector | you finish a book, write a review, or watch a film |
| `index.html` | the home room: the painting plus the hotspot rectangles drawn over it | you move a hotspot or add an object |
| `img/home.jpg` | the painting itself | you replace the room art |
| `room.js`, `room.css` | room behavior (zoom, panel, bookshelf view) and its styling | rarely |
| `map.html`, `app.js` | the floorplan site map, reachable from the top-right link | rarely |
| `style.css` | shared colors, type, panel, mobile layout | you want a different palette or font |
| `render.js` | shared renderer for content blocks | almost never |

`build.py` is optional. It inlines everything into `dist/index.html` (one file you can email or drop anywhere) and `dist/artifact.html` (for claude.ai artifacts). GitHub Pages does not need it.

## Deploy to GitHub Pages (about five minutes)

1. Create a new public repo, for example `elvishan2022.github.io` (that exact name gives you `https://elvishan2022.github.io` with no extra setup) or any name for a project site.
2. Copy everything except `dist/` and `build.py` into it, keeping the `img/` folder.
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

Publications use `pub`. The status text sets the badge color automatically: anything containing "submitted" is blue, "preparation" or "working" is outlined, everything else (accepted, published) is ink.

```js
{ type: "pub",
  title: "Paper title",
  venue: "Venue, year",
  status: "Accepted",
  link: "https://...",                   // optional
  text: "" }                             // optional one-line summary
```

Beliefs are just strings in the `beliefs` array of the `beliefs` room. Add a line, save, done. The counter in the bottom-left corner updates itself.

The `now` line at the top of the page is a single string. Keep it under about sixty characters or it truncates.

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

## What to change, and where

| You want to change | Open | What to look for |
|---|---|---|
| A belief, a project, a paper, the "now" line | `content.js` | the room with the matching `id` |
| A book, a review, a rating, a reread | `books.js` | `BOOKS.shelves` |
| A film | `books.js` | `MOVIES.items` at the bottom |
| A blog post or a profile link | `posts.js` | `POSTS.items` and `POSTS.feeds` |
| The name or one-line description of a clickable object | `room.js` | the `SPOTS` list at the top |
| Where an object's clickable box sits on the painting | `index.html` | the `<rect class="hs">` list, on a 2000 × 1116 grid |
| The color and strength of the hover outline | `room.css` | the four `--hs-*` variables at the top |
| The help card text | `index.html` | `<aside class="help">` |
| Fonts and the overall palette | `style.css` | the `:root` block |

## Full-bleed vs framed

`index.html` line 13 is `<body class="room-page fill">`. With `fill`, the painting covers the whole window and the directory, status, and help card float over it. Delete the word `fill` and the painting returns to a framed box on a dark wall. Nothing else changes.

In fill mode the painting is scaled to cover the window but never cropped more than 20% past "fit", so the bookshelf and the volleyball corner always stay visible. That limit is the `contain * 1.2` line in `fitScene()` in `room.js`.

## Fonts

All type is controlled from one block at the top of `style.css`: an `@import` line that downloads the fonts, and three variables that assign them.

| Variable | What it sets inside a panel |
|---|---|
| `--f-display` | the kanji and the big title, book titles, project titles, post titles |
| `--f-body` | ordinary paragraphs and list items |
| `--f-mono` | genuinely monospaced things, mainly the clock |
| `--f-label` | the subtitle under the title, the small red section headings, buttons, dates, venues, tags, link labels |

Three more variables control the *character* of that small type rather than its family: `--f-label`, `--label-case`, and `--label-track`. Monospace plus uppercase plus wide letter-spacing is the "terminal HUD" look. Setting `--f-label: var(--f-body)`, `--label-case: none`, `--label-track: .02em` turns every label editorial in one edit.

Three ready alternatives are written out as comments in that block: sharper and editorial (Zen Old Mincho, Newsreader, JetBrains Mono), warmer with hand-written headings (Klee One, Lora), and modern sans (Zen Kaku Gothic New, Public Sans). Paste one set over the `@import` line and the three variables, commit, done.

To use a font that is not listed, find it on fonts.google.com, click "Get font" then "Get embed code", copy the URL out of the `<link>` they give you into the `@import`, and put the family name first in the matching variable. Keep a Japanese-capable face in `--f-display`, or the kanji labels fall back to a system font.

Sizes are separate from families: panel body text is `.panel-body { font-size }`, the title is `.panel-title`, and the section headings are `.panel-body h3`, all in `style.css`.

## Roadmap toward "more interactive"

Ideas in rough order of effort, all of which fit the current structure:

- Mini-posts: add a `posts` array to `content.js` and a `post` block type in `app.js`, rendered in the study; or keep posts as markdown files and load them with `fetch` (works on GitHub Pages).
- Ambient motion: window lights that flicker, a cat that walks the engawa, rain on the pond. All are SVG animations in `index.html`.
- Time of day: read the visitor's clock and swap the palette between day and night.
- A proper 3D scene (Three.js) can replace `#map` later without touching `content.js` or the panel logic. Keep `data-room` ids stable and everything else keeps working.

## Credits and notes

The hanko in the panel corner is a placeholder (`印`). Change it in `style.css` under `.panel-head::after`. Fonts are Shippori Mincho, Source Serif 4, and IBM Plex Mono from Google Fonts; swap the `<link>` in `index.html` and the `--f-*` variables to change them.
