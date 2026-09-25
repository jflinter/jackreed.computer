# jackreed.computer

Jack's personal site. Astro, fully static output, no adapter, no server side.
Served from Cloudflare Workers static assets.

## Never write prose for this site

**Every word a visitor reads here is Jack's.** Do not write, rewrite, extend or
"improve" any site copy unless he explicitly asks for that specific text.

This covers anything that reaches a reader, not just body text: page copy,
headings, image and figure captions, alt text, link text, button and empty-state
labels, `title` and `description` frontmatter, meta and Open Graph tags, and
commit-worthy microcopy of any kind.

When content is missing, leave it out and say so. A caption you invented is
worse than no caption, and a plausible-sounding one is worst of all — it reads
as his voice and he may not catch it. If a component seems to need text, ask.

Fixing a typo he made is fine. Moving his words from one file to another is
fine. Inventing a sentence is not.

Code comments, `CLAUDE.md`, and READMEs are not site content — write those
normally.

## Commands

```
pnpm dev          # dev server
pnpm build        # -> dist/
pnpm preview      # wrangler dev; serves dist/ through the real Workers asset runtime
pnpm run deploy   # build + wrangler deploy (rarely needed by hand — see below)
```

`pnpm run deploy`, not `pnpm deploy` — the latter is a reserved pnpm builtin and
errors with `ERR_PNPM_CANNOT_DEPLOY`.

Use `pnpm preview`, not just `pnpm dev`, to check anything routing-related —
trailing slashes and 404 status codes only behave correctly under the Workers
runtime.

## Deploys

Pushing to `master` triggers a **Cloudflare Workers Build**, which runs
`pnpm build` then `pnpm exec wrangler deploy`. There is no GitHub Action, and
this repo is no longer on GitHub Pages.

`wrangler.jsonc` is an assets-only Worker — no `main`, no `ASSETS` binding,
because nothing here runs server-side. If you ever need on-demand rendering,
that's when `@astrojs/cloudflare` becomes necessary; until then it's not.

## Adding a page

Create `src/pages/thing.mdx`:

```mdx
---
layout: ../layouts/PageLayout.astro
title: Thing
---

Words.
```

That's the entire process — it's now live at `/thing/`. Nothing gets registered
anywhere else.

**There is deliberately no index, post list, nav, or RSS feed.** Pages are
shared by link, not browsed. Don't add a listing page, and don't link new pages
from the homepage unless explicitly asked.

## Interactivity

The reason this site is on Astro at all. Put a React component in
`src/components/`, import it into the MDX, and give it a `client:*` directive:

```mdx
import Demo from '../components/Demo.tsx';

<Demo client:visible />
```

Without a directive the component renders to static HTML and ships no JS.
Prefer `client:visible`. Islands are per-page, so **keep `/` at zero JS** —
check with `grep -c '<script' dist/index.html` after building.

`/alaska-2026` is the worked example of the whole path — islands, a media
manifest, and map figures.

## Media-heavy posts

`/alaska-2026` sets the pattern. Source images live in `src/assets/alaska/` as
2048px JPEGs (converted from the Obsidian vault with sharp — originals are far
too big to commit); videos live in `public/alaska/` as faststart MP4s, because
Astro's asset pipeline doesn't process video.

`src/data/alaska.ts` is the single source of truth: an ordered array of every
photo and video with its caption. **That order is the carousel order** — a
figure's index in the array is the slide it opens to. `<Figure id="052" />` in
the MDX looks items up by key. The image imports in that file are written out
one per line rather than globbed on purpose; see the comment there.

Figures render as plain server HTML carrying a `data-lightbox` index. One
delegated listener in `Lightbox.tsx` opens the carousel, so 46 figures cost a
single island rather than 46.

`pnpm build` runs `scripts/prune-assets.mjs` afterwards. Astro emits the
untouched original of every imported `src/assets/` image even when pages only
ever link to the optimized WebPs; on this post that's ~20MB of files nothing
references. The script removes only files whose name appears nowhere in the
built output.

## Maps

`<RouteMap id="..." />` draws a route from `src/data/routes/*.geo.json` over
MapTiler tiles and animates it in on scroll. The maps are deliberately
non-interactive — a one-finger drag has to scroll the page, not pan the map.

They need `PUBLIC_MAPTILER_KEY`, in `.env` locally (see `.env.example`) **and
in the Cloudflare Workers Build environment**. Astro inlines `PUBLIC_*` into the
client bundle at build time, so the key is public once deployed — restrict it by
origin in the MapTiler dashboard if that matters. Without the variable the maps
render a placeholder box rather than failing the build, which means a missing
key in Cloudflare looks fine locally and broken in production. Check the live
page after changing it.

Route geometry is committed rather than fetched at build time, so builds need no
network. `src/data/routes/README.md` records where each line came from.

Note the files are `.geo.json`, not `.geojson`: Vite only parses the former as
JSON.

## Styling

Everything is `src/styles/global.css`, including the `prefers-color-scheme:
dark` block that is the site's entire dark mode. **Test both schemes.**

`body.wide` widens the column from 480px to 720px; posts opt in with
`width: wide` in frontmatter. `global.css` zeroes all margins and strips list markers — correct for the
homepage, wrong for prose — so `PageLayout.astro` re-adds prose styling scoped
to `.prose`. Descendants arrive via `<slot>`, so those rules need Astro's
`:global()` to reach them.

## archive/

The old pre-Astro site, kept for nostalgia. It sits at the repo root, outside
`src/` and `public/`, so Astro ignores it: not built, not served, not deployed.
`/archive/*` URLs 404 and that's intended. **Leave it alone** — don't wire it
back up, don't move it into `public/`.

## Domains

`jackreed.computer` and `www.` are custom domains on the Worker, declared in
`wrangler.jsonc`. `jackflintermann.com` 301s to `jackreed.computer` via a
zone-level Cloudflare Redirect Rule — that lives in the Cloudflare dashboard,
not in this repo, so there's no redirect code here to find.
