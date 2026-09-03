# elvishan.dev (working name)

A personal site drawn as the floorplan of a small clinic at night. Each room opens a section: entrance (about), exam room (research), study (publications), workshop (builds), veranda (things I believe), garden (contact).

No framework, no build step. Four files matter:

| file | what it is | edit it when |
|---|---|---|
| `content.js` | every word on the site, as plain JavaScript objects | you add a belief, a paper, a project, or change the "now" line |
| `index.html` | page structure and the SVG map | you want to redraw a room or add a new one |
| `style.css` | colors, type, panel, mobile layout | you want a different palette or font |
| `app.js` | renders `content.js` into the page | almost never |

`build.py` is optional. It inlines everything into `dist/index.html` (one file you can email or drop anywhere) and `dist/artifact.html` (for claude.ai artifacts). GitHub Pages does not need it.

## Deploy to GitHub Pages (about five minutes)

1. Create a new public repo, for example `elvishan2022.github.io` (that exact name gives you `https://elvishan2022.github.io` with no extra setup) or any name for a project site.
2. Copy `index.html`, `style.css`, `content.js`, `app.js`, and `CLAUDE.md` into it. `dist/` and `build.py` can stay or go.
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

## Adding a room to the map

1. In `index.html`, copy one of the `<g class="room" data-room="...">` groups and change its `data-room` to a new id, its rectangle coordinates, and its labels. The map is a 1200 × 800 grid.
2. In `content.js`, add a room object with the same `id`. The directory, panel, keyboard navigation, and mobile stack pick it up automatically.

## Roadmap toward "more interactive"

Ideas in rough order of effort, all of which fit the current structure:

- Mini-posts: add a `posts` array to `content.js` and a `post` block type in `app.js`, rendered in the study; or keep posts as markdown files and load them with `fetch` (works on GitHub Pages).
- Ambient motion: window lights that flicker, a cat that walks the engawa, rain on the pond. All are SVG animations in `index.html`.
- Time of day: read the visitor's clock and swap the palette between day and night.
- A proper 3D scene (Three.js) can replace `#map` later without touching `content.js` or the panel logic. Keep `data-room` ids stable and everything else keeps working.

## Credits and notes

The hanko in the panel corner is a placeholder (`印`). Change it in `style.css` under `.panel-head::after`. Fonts are Shippori Mincho, Source Serif 4, and IBM Plex Mono from Google Fonts; swap the `<link>` in `index.html` and the `--f-*` variables to change them.
