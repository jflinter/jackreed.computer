import type { ImageMetadata } from 'astro';

import img_001 from '../assets/alaska/001.jpg';
import img_052 from '../assets/alaska/052.jpg';
import img_059 from '../assets/alaska/059.jpg';
import img_060 from '../assets/alaska/060.jpg';
import img_112 from '../assets/alaska/112.jpg';
import img_176 from '../assets/alaska/176.jpg';
import img_harding from '../assets/alaska/harding.jpg';
import img_144 from '../assets/alaska/144.jpg';
import img_163 from '../assets/alaska/163.jpg';
import img_182 from '../assets/alaska/182.jpg';
import img_199 from '../assets/alaska/199.jpg';
import img_221 from '../assets/alaska/221.jpg';
import img_230 from '../assets/alaska/230.jpg';
import img_274_poster from '../assets/alaska/274-poster.jpg';
import img_300 from '../assets/alaska/300.jpg';
import img_305 from '../assets/alaska/305.jpg';
import img_313 from '../assets/alaska/313.jpg';
import img_318 from '../assets/alaska/318.jpg';
import img_382 from '../assets/alaska/382.jpg';
import img_340 from '../assets/alaska/340.jpg';
import img_349 from '../assets/alaska/349.jpg';
import img_354 from '../assets/alaska/354.jpg';
import img_363 from '../assets/alaska/363.jpg';
import img_375 from '../assets/alaska/375.jpg';
import img_413 from '../assets/alaska/413.jpg';
import img_505 from '../assets/alaska/505.jpg';
import img_436 from '../assets/alaska/436.jpg';
import img_441 from '../assets/alaska/441.jpg';
import img_444 from '../assets/alaska/444.jpg';
import img_451_poster from '../assets/alaska/451-poster.jpg';
import img_459_poster from '../assets/alaska/459-poster.jpg';
import img_472 from '../assets/alaska/472.jpg';
import img_465 from '../assets/alaska/465.jpg';
import img_454 from '../assets/alaska/454.jpg';
import img_497 from '../assets/alaska/497.jpg';
import img_537 from '../assets/alaska/537.jpg';
import img_552 from '../assets/alaska/552.jpg';
import img_585 from '../assets/alaska/585.jpg';
import img_618_poster from '../assets/alaska/618-poster.jpg';
import img_607 from '../assets/alaska/607.jpg';
import img_631 from '../assets/alaska/631.jpg';
import img_629 from '../assets/alaska/629.jpg';
import img_649 from '../assets/alaska/649.jpg';
import img_658 from '../assets/alaska/658.jpg';
import img_689 from '../assets/alaska/689.jpg';
import img_679 from '../assets/alaska/679.jpg';
import img_695 from '../assets/alaska/695.jpg';
import img_710_poster from '../assets/alaska/710-poster.jpg';

/**
 * Every photo and video in the Alaska post, in the order they appear on the
 * page. This array IS the carousel order: a figure's index here is the slide
 * it opens to, so nothing depends on render order.
 *
 * Captions are Jack's, copied verbatim from the vault draft. Never write or
 * edit one — see the rule at the top of CLAUDE.md.
 *
 * The imports above are written out rather than globbed: import.meta.glob puts
 * every file in Vite's asset graph, which emits all the untouched originals
 * (~20MB) into dist/ next to the optimized WebPs, with nothing linking to them.
 * Regenerate this file rather than editing the import list by hand.
 */
export type MediaItem =
  | { kind: 'photo'; key: string; caption: string }
  | { kind: 'video'; key: string; width: number; height: number; caption: string };

const images: Record<string, ImageMetadata> = {
  '001': img_001,
  '052': img_052,
  '059': img_059,
  '060': img_060,
  '112': img_112,
  '176': img_176,
  'harding': img_harding,
  '144': img_144,
  '163': img_163,
  '182': img_182,
  '199': img_199,
  '221': img_221,
  '230': img_230,
  '274-poster': img_274_poster,
  '300': img_300,
  '305': img_305,
  '313': img_313,
  '318': img_318,
  '382': img_382,
  '340': img_340,
  '349': img_349,
  '354': img_354,
  '363': img_363,
  '375': img_375,
  '413': img_413,
  '505': img_505,
  '436': img_436,
  '441': img_441,
  '444': img_444,
  '451-poster': img_451_poster,
  '459-poster': img_459_poster,
  '472': img_472,
  '465': img_465,
  '454': img_454,
  '497': img_497,
  '537': img_537,
  '552': img_552,
  '585': img_585,
  '618-poster': img_618_poster,
  '607': img_607,
  '631': img_631,
  '629': img_629,
  '649': img_649,
  '658': img_658,
  '689': img_689,
  '679': img_679,
  '695': img_695,
  '710-poster': img_710_poster,
};

export const media: MediaItem[] = [
  { kind: 'photo', key: '001', caption: 'The very first photo we took on the trip!' },
  { kind: 'photo', key: '052', caption: 'The scale of these things is tough to get your brain around, but our boat guide helpfully explained that some of these icebergs are the size of a Costco' },
  { kind: 'photo', key: '059', caption: 'This is a tidewater glacier, meaning it goes up to the water and you can watch icebergs calve into the sea. Cool but sad.' },
  { kind: 'photo', key: '060', caption: 'Little families of seals hang out on the ice.' },
  { kind: 'photo', key: '112', caption: 'Steller sea lions' },
  { kind: 'photo', key: '176', caption: 'Our route started at the bottom of this glacier and tracked the right edge of it' },
  { kind: 'photo', key: 'harding', caption: 'Deceptively only about 1/3 of the way up' },
  { kind: 'photo', key: '144', caption: 'Yet another reminder that Avery did all this while 5 months pregnant' },
  { kind: 'photo', key: '163', caption: 'The top of the hike. 1000 square miles of 1000-foot-thick ice.' },
  { kind: 'photo', key: '182', caption: 'The Homer spit, the center of most of our activities.' },
  { kind: 'photo', key: '199', caption: 'An otter in the Homer harbor' },
  { kind: 'photo', key: '221', caption: 'Bald eagle the size of a turkey in Kachemak Bay State Park' },
  { kind: 'photo', key: '230', caption: 'Right after getting dropped off by the boat' },
  { kind: 'video', key: '274', width: 720, height: 1280,
    caption: 'Our challenging hike was rewarded with a harrowing ride on the hand tram' },
  { kind: 'photo', key: '300', caption: 'I did not go swimming in the ice-cold lagoon; not having a nude polar bear photo is my biggest regret of the trip' },
  { kind: 'photo', key: '305', caption: 'The underbrush was thick.' },
  { kind: 'photo', key: '313', caption: 'We feasted on crab back in Homer (this is what crabs look like)' },
  { kind: 'photo', key: '318', caption: 'Approaching Lake Clark' },
  { kind: 'photo', key: '382', caption: 'The little plane has big tough tires so it can just land on the beach.' },
  { kind: 'photo', key: '340', caption: 'This is a real photo' },
  { kind: 'photo', key: '349', caption: 'Mama and babies' },
  { kind: 'photo', key: '354', caption: 'ʕ•ᴥ•ʔ' },
  { kind: 'photo', key: '363', caption: 'Time for snack' },
  { kind: 'photo', key: '375', caption: 'Time for nap' },
  { kind: 'photo', key: '413', caption: 'Different bears!' },
  { kind: 'photo', key: '505', caption: 'We landed on a glacier!' },
  { kind: 'photo', key: '436', caption: 'Polychrome mountains' },
  { kind: 'photo', key: '441', caption: 'We would later go on to hike in this valley' },
  { kind: 'photo', key: '444', caption: 'Approaching Denali, in the distance' },
  { kind: 'video', key: '451', width: 1280, height: 720,
    caption: 'Approaching Denali from the East; way more snow to the South of the big mountains' },
  { kind: 'video', key: '459', width: 1280, height: 720,
    caption: 'Another world' },
  { kind: 'photo', key: '472', caption: 'Mountains and glaciers' },
  { kind: 'photo', key: '465', caption: 'Glacial pools' },
  { kind: 'photo', key: '454', caption: 'Denali itself' },
  { kind: 'photo', key: '497', caption: 'I once again remind you that Avery was 5 months pregnant while we did this' },
  { kind: 'photo', key: '537', caption: 'This big old bear was just wandering down the street about 1 mile before we got off the bus' },
  { kind: 'photo', key: '552', caption: 'Avery hiking down into the Teklanika River valley' },
  { kind: 'photo', key: '585', caption: 'Jack\'s brain was gone after crossing the river many times' },
  { kind: 'video', key: '618', width: 720, height: 1280,
    caption: 'Caribou!' },
  { kind: 'photo', key: '607', caption: 'Alpine tundra, what we were hiking on much of the time.' },
  { kind: 'photo', key: '631', caption: 'Day 2, descending towards Toklat River East Fork' },
  { kind: 'photo', key: '629', caption: 'Jack\'s glasses being held together by so much krazy glue' },
  { kind: 'photo', key: '649', caption: 'Day 3 we day-hiked to an unknown glacier before packing up' },
  { kind: 'photo', key: '658', caption: 'I once again must remind you Avery did this all while 5 months pregnant' },
  { kind: 'photo', key: '689', caption: 'Jack hiking down Toklat River East Fork, nearly out of the park' },
  { kind: 'photo', key: '679', caption: 'The rivers are "braided" so you cross them 10000x while hiking along' },
  { kind: 'photo', key: '695', caption: 'Just before getting on the bus on the way out. Of course we saw a bear right after this.' },
  { kind: 'video', key: '710', width: 720, height: 1280,
    caption: 'Twiggy, the water skiing squirrel' },
];

/** The still shown in the page, and the carousel's poster for a video. */
export function imageFor(item: MediaItem): ImageMetadata {
  const slug = item.kind === 'video' ? `${item.key}-poster` : item.key;
  const image = images[slug];
  if (!image) throw new Error(`No image asset for '${slug}' — did the media prep run?`);
  return image;
}

/** Videos are served straight from public/; Astro's pipeline doesn't touch them. */
export const videoSrc = (item: MediaItem) => `/alaska/${item.key}.mp4`;

export const indexOf = (key: string) => media.findIndex((m) => m.key === key);

export interface RouteMapDef {
  id: string;
  /** Extra legs drawn beneath the main route, e.g. the bus ride in. */
  under?: { route: string; mode: 'bus' };
  mode: 'drive' | 'fly' | 'hike';
  /** Aspect ratio of the map box, width / height. */
  aspect: number;
}

/** Deliberately captionless: map figures carry no prose. */
export const routeMaps: Record<string, RouteMapDef> = {
  'anchorage-seward': { id: 'anchorage-seward', mode: 'drive', aspect: 4 / 3 },
  'seward-homer': { id: 'seward-homer', mode: 'drive', aspect: 4 / 3 },
  'homer-lake-clark': { id: 'homer-lake-clark', mode: 'fly', aspect: 4 / 3 },
  'homer-denali': { id: 'homer-denali', mode: 'drive', aspect: 3 / 4 },
  'denali-hike': {
    id: 'denali-hike', mode: 'hike', aspect: 4 / 3,
    under: { route: 'denali-park-road', mode: 'bus' },
  },
};
