# Route geometry

GeoJSON `LineString` features, fetched once and committed so builds need no
network access.

| file | source |
| --- | --- |
| `anchorage-seward.geo.json` | OSRM `driving`, ANC airport → Seward |
| `seward-homer.geo.json` | OSRM `driving` |
| `homer-denali.geo.json` | OSRM `driving`, via Anchorage |
| `homer-lake-clark.geo.json` | great-circle interpolation, Homer → Chinitna Bay |
| `denali-park-road.geo.json` | OSM `name="Denali Park Road"` via Overpass, stitched from 99 ways and cut at mile 43 (the East Fork bridge, where the road is closed) |
| `denali-hike.geo.json` | Jack's Gaia GPS tracks, 21–23 Aug 2026 |

`denali-hike.geo.json` is the real thing: four Gaia GPS tracks (Friday, Saturday,
Sunday morning, Sunday lunch) merged in timestamp order into one line — 37 km
over three days, including the Sunday day-hike out and back. The two
sub-kilometre gaps between tracks are where the GPS was off in camp; they're
joined straight, which is indistinguishable at this zoom.

Simplified from 5,556 points to 443 and rounded to 5 decimal places, which drops
GPS jitter (39.4 km raw → 37.2 km) along with the timestamps and elevations. The
raw .gpx files are deliberately not committed — they carry precise timestamped
positions, which is more than the map needs.

Both ends land on the park road by themselves: the start is 0.1 km from it
(around mile 37, where they got off the bus) and the end 0.3 km (mile 43, the
Toklat East Fork). The road line runs mile 0–43, covering the ride in and the
ride back out. Replacing it is a one-file change: export the real track as
GeoJSON, keep the `LineString` geometry and the `{"mode": "hike"}` property,
and drop it in. Nothing else needs to change.

Lines were simplified with `@turf/simplify` to a few hundred points each; the
animation doesn't benefit from OSRM's full resolution.
