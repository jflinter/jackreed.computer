/**
 * Drops unreferenced source images from dist/_astro/.
 *
 * Astro emits the untouched original of every image imported from src/assets/,
 * because `ImageMetadata.src` has to resolve to a real URL. When a page only
 * ever renders those images through <Image> or getImage() — as the Alaska post
 * does — the originals ship alongside the optimized WebPs with nothing linking
 * to them. On that post it's 46 files and ~19MB of dead weight.
 *
 * This only ever removes a file whose name appears nowhere in the built output,
 * so anything still referenced, however indirectly, survives.
 */
import fs from 'node:fs/promises';
import path from 'node:path';

const DIST = 'dist';
const ASTRO = path.join(DIST, '_astro');
// Source formats only. The WebP/AVIF transforms are what pages actually link to.
const CANDIDATE = /\.(jpe?g|png|tiff?|gif|webp|avif|svg)$/i;
const TEXT = /\.(html|js|mjs|css|json|txt|xml|map)$/i;

async function* walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

const candidates = [];
for await (const file of walk(ASTRO)) {
  if (CANDIDATE.test(file)) candidates.push(file);
}

// One pass over every text file in the build, collecting the basenames it
// mentions — cheaper and far safer than guessing at reference syntax.
const referenced = new Set();
for await (const file of walk(DIST)) {
  if (!TEXT.test(file)) continue;
  const contents = await fs.readFile(file, 'utf8');
  for (const candidate of candidates) {
    const name = path.basename(candidate);
    if (contents.includes(name)) referenced.add(name);
  }
}

let removed = 0;
let bytes = 0;
for (const candidate of candidates) {
  if (referenced.has(path.basename(candidate))) continue;
  bytes += (await fs.stat(candidate)).size;
  await fs.rm(candidate);
  removed++;
}

console.log(
  removed
    ? `pruned ${removed} unreferenced asset${removed === 1 ? '' : 's'} (${(bytes / 1e6).toFixed(1)}MB)`
    : 'no unreferenced assets',
);
