// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://jackreed.computer',
  integrations: [mdx(), react()],
  vite: {
    // maplibre-gl creates its worker with { type: 'module' }, so Vite has to
    // emit it as an ES module rather than its default IIFE. See the
    // setWorkerUrl comment in src/components/RouteMapIsland.tsx.
    worker: { format: 'es' },
  },
});
