# Getting the site online, step by step

Time: about 15 minutes. Cost: free. You need a GitHub account and a browser. No terminal, no domain.

## What is in this folder

| file | purpose |
|---|---|
| `index.html` | the page and the SVG floorplan |
| `style.css` | colors, fonts, panel, mobile layout |
| `content.js` | all site text: about, research, publications, builds, beliefs, contact |
| `books.js` | your reading list for the future bookshelf view (not wired into the page yet) |
| `app.js` | the code that renders content.js into the page |
| `README.md` | the editing guide |
| `CLAUDE.md` | notes for Claude Code |
| `SETUP.md` | this file |
| `build.py`, `dist/` | optional single-file bundler; ignore for now |

## Part A: put it on GitHub Pages

1. Go to github.com and sign in (or create an account). Note your username exactly as written; the steps below assume `ElvisHan2022`.
2. Click the plus icon (top right) and choose "New repository."
3. Repository name: `elvishan2022.github.io` (all lowercase, your username followed by `.github.io`). This exact name is what makes GitHub serve it at that address with no extra setup.
4. Set it to Public. Leave "Add a README" unchecked. Click "Create repository."
5. On the empty repository page, click the link "uploading an existing file."
6. Drag every file from this folder into the upload box: `index.html`, `style.css`, `content.js`, `books.js`, `app.js`, `README.md`, `CLAUDE.md`, `SETUP.md`. You can skip `build.py` and the `dist` folder.
7. In the commit box at the bottom write `first version` and click "Commit changes."
8. Click "Settings" (top tab of the repository), then "Pages" in the left sidebar.
9. Under "Build and deployment," set Source to "Deploy from a branch," Branch to `main`, folder to `/ (root)`. Click Save.
10. Wait one to two minutes, then open `https://elvishan2022.github.io`. If you see the floorplan, you are live. If you see a 404, wait another minute and refresh; the first deploy is the slow one.

## Part B: make your first edit (to prove the loop works)

1. In the repository, click `content.js`.
2. Click the pencil icon (top right of the file view).
3. Find the line that starts with `now:` near the top and change the text inside the quotes.
4. Scroll down, click "Commit changes," confirm.
5. Refresh your site after about a minute. The top strip shows the new line.

That is the whole update process for text: open file, pencil, edit, commit.

## Part C (optional, later): a custom domain

1. Buy a domain (Cloudflare Registrar or Namecheap, roughly $10 to $15 a year).
2. In the repository, add a new file named `CNAME` (no extension) containing only your domain, for example `elvishan.com`.
3. At the registrar, add DNS records: an `A` record for `@` pointing to `185.199.108.153` (GitHub publishes four such addresses; add all four), and a `CNAME` record for `www` pointing to `elvishan2022.github.io`.
4. In Settings, Pages, enter the domain under "Custom domain" and tick "Enforce HTTPS" once it becomes available.

## Part D (optional, for structural work): Claude Code

1. Install Claude Code from claude.com/claude-code and sign in.
2. Install Git if you do not have it (git-scm.com), then in a terminal run `git clone https://github.com/ElvisHan2022/elvishan2022.github.io` and `cd elvishan2022.github.io`.
3. Run `claude` inside that folder. It reads `CLAUDE.md` and knows the layout.
4. Describe changes in plain language ("add a bookshelf view that renders books.js"). When it is done, say "commit and push" and the live site updates.

## If something goes wrong

- Blank page: open the browser console (F12). A red line naming `content.js` means a typo in that file, usually a missing comma or quote. Undo the last edit from the repository's "History" view.
- Fonts look plain: the Google Fonts link in `index.html` failed to load; check your network, it is not a code problem.
- 404 after the first deploy: the repository name does not match your username, or Pages is not set to `main` / root.
