import { useEffect, useRef } from 'react';
import type { Feature, LineString } from 'geojson';
import type { GeoJSONSource, Map as MapLibreMap } from 'maplibre-gl';

// maplibre-gl v6 locates its worker at runtime with
// `new URL('./maplibre-gl-worker.mjs', import.meta.url)`. That's a runtime
// string, so Vite never traces or emits it, and the bundled chunk ends up
// asking for /_astro/maplibre-gl-worker.mjs — which 404s and leaves every map
// blank in production. Let Vite bundle the worker itself and hand maplibre the
// resulting URL via setWorkerUrl().
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';

type Mode = 'drive' | 'fly' | 'hike' | 'bus';
type Line = Feature<LineString>;

interface Props {
  apiKey: string;
  mode: Mode;
  route: Line;
  /** Optional leg drawn beneath the main route, e.g. the bus ride in. */
  under?: Line;
}

const ROUTE_COLOR = '#d6452c';
const UNDER_COLOR = '#6b6b6b';

const empty = (): Line => ({
  type: 'Feature',
  properties: {},
  geometry: { type: 'LineString', coordinates: [] },
});

function bounds(lines: Line[]): [[number, number], [number, number]] {
  let w = 180, s = 90, e = -180, n = -90;
  for (const line of lines) {
    for (const [lon, lat] of line.geometry.coordinates) {
      if (lon < w) w = lon;
      if (lon > e) e = lon;
      if (lat < s) s = lat;
      if (lat > n) n = lat;
    }
  }
  return [[w, s], [e, n]];
}

/**
 * A non-interactive route figure: fits the route, then draws the line in once
 * when it scrolls into view. maplibre-gl is imported dynamically so the five
 * maps on the page share one lazily-fetched chunk and none of it loads until a
 * map is near the viewport.
 */
export default function RouteMapIsland({ apiKey, mode, route, under }: Props) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;

    let cancelled = false;
    let map: MapLibreMap | undefined;
    let observer: IntersectionObserver | undefined;
    let frame = 0;
    let settle = 0;

    (async () => {
      // maplibre-gl v6 has named exports only — there is no default.
      const [{ Map: MapCtor, Marker, setWorkerUrl }, { default: turfLength }, { default: turfSlice }] =
        await Promise.all([
          import('maplibre-gl'),
          import('@turf/length'),
          import('@turf/line-slice-along'),
          import('maplibre-gl/dist/maplibre-gl.css'),
        ]);
      if (cancelled) return;

      // Idempotent, so it's fine that all five maps call it.
      setWorkerUrl(workerUrl);

      const instance = new MapCtor({
        container: el,
        style: `https://api.maptiler.com/maps/outdoor-v2/style.json?key=${apiKey}`,
        bounds: bounds(under ? [route, under] : [route]),
        fitBoundsOptions: { padding: 36 },
        // A figure, not a widget: never steal the page scroll or a swipe.
        interactive: false,
        attributionControl: { compact: true },
      });

      map = instance;

      instance.on('load', () => {
        if (cancelled) return;

        if (under) {
          instance.addSource('under', { type: 'geojson', data: under });
          instance.addLayer({
            id: 'under',
            type: 'line',
            source: 'under',
            layout: { 'line-cap': 'round', 'line-join': 'round' },
            paint: {
              'line-color': UNDER_COLOR,
              'line-width': 2,
              'line-dasharray': [2, 2],
              'line-opacity': 0.85,
            },
          });
        }

        instance.addSource('route', { type: 'geojson', data: empty() });
        // A white casing so the line reads over both snow and dark rock.
        instance.addLayer({
          id: 'route-casing',
          type: 'line',
          source: 'route',
          layout: { 'line-cap': 'round', 'line-join': 'round' },
          paint: { 'line-color': '#fff', 'line-width': 6, 'line-opacity': 0.9 },
        });
        instance.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          layout: { 'line-cap': 'round', 'line-join': 'round' },
          paint: {
            'line-color': ROUTE_COLOR,
            'line-width': 3,
            ...(mode === 'fly' ? { 'line-dasharray': [1.5, 1.5] } : {}),
          },
        });

        const coords = route.geometry.coordinates;
        for (const at of [coords[0], coords[coords.length - 1]]) {
          const dot = document.createElement('div');
          dot.className = 'route-endpoint';
          new Marker({ element: dot }).setLngLat(at as [number, number]).addTo(instance);
        }

        const source = instance.getSource('route') as GeoJSONSource;
        const total = turfLength(route, { units: 'kilometers' });

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          source.setData(route);
          return;
        }

        // Longer routes get a little more time, but never more than 2.5s.
        const duration = Math.min(2500, 900 + total * 4);
        let start: number | null = null;

        const step = (now: number) => {
          if (cancelled) return;
          if (start === null) start = now;
          const t = Math.min(1, (now - start) / duration);
          // ease-out, so the line arrives rather than stopping dead
          const km = total * (1 - Math.pow(1 - t, 3));
          source.setData(km <= 0.001 ? empty() : (turfSlice(route, 0, km, { units: 'kilometers' }) as Line));
          if (t < 1) frame = requestAnimationFrame(step);
        };

        // Wait for the whole figure to be on screen, then a beat, so the line
        // starts drawing under the reader's eye rather than part-way up the
        // edge of the viewport as they scroll past.
        const SETTLE_MS = 400;

        // A map taller than the viewport can never reach ratio 1, so aim for
        // the most it could actually reach.
        const height = el.getBoundingClientRect().height;
        const target = height > 0 ? Math.min(1, window.innerHeight / height) * 0.98 : 1;

        observer = new IntersectionObserver(
          (entries) => {
            const settled = entries.some((entry) => entry.intersectionRatio >= target);
            if (settled && !settle) {
              settle = window.setTimeout(() => {
                observer?.disconnect();
                frame = requestAnimationFrame(step);
              }, SETTLE_MS);
            } else if (!settled && settle) {
              // Scrolled back out before it settled — try again next pass.
              clearTimeout(settle);
              settle = 0;
            }
          },
          { threshold: [0, target, 1] },
        );
        observer.observe(el);
      });
    })();

    return () => {
      cancelled = true;
      observer?.disconnect();
      clearTimeout(settle);
      cancelAnimationFrame(frame);
      map?.remove();
    };
  }, [apiKey, mode, route, under]);

  return <div ref={host} className="route-map" />;
}
