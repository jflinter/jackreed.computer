import { useEffect, useState } from 'react';
import Lightbox, { type SlideImage, type SlideVideo } from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import Video from 'yet-another-react-lightbox/plugins/video';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import './lightbox.css';

export type Slide = SlideImage | SlideVideo;

/**
 * The page's single carousel. Figures render as plain server HTML carrying a
 * `data-lightbox` index; one delegated listener here opens the right slide, so
 * 46 figures cost one island rather than 46.
 */
export default function Gallery({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const trigger = (event.target as HTMLElement | null)?.closest?.('[data-lightbox]');
      if (!trigger) return;
      const next = Number(trigger.getAttribute('data-lightbox'));
      if (Number.isInteger(next)) {
        event.preventDefault();
        setIndex(next);
      }
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <Lightbox
      open={index >= 0}
      index={Math.max(index, 0)}
      close={() => setIndex(-1)}
      slides={slides}
      plugins={[Captions, Video, Zoom]}
      // Photos.app-ish: swipe or drag down to dismiss, tap the backdrop to close.
      controller={{ closeOnPullDown: true, closeOnBackdropClick: true }}
      captions={{ descriptionTextAlign: 'center', showToggle: false }}
      zoom={{ maxZoomPixelRatio: 3, doubleClickMaxStops: 2 }}
      video={{ controls: true, playsInline: true, autoPlay: true }}
      animation={{ swipe: 250 }}
      carousel={{ finite: true, padding: 0, spacing: '16px', imageFit: 'contain' }}
      styles={{
        container: { backgroundColor: 'rgba(10, 10, 10, 0.98)' },
        captionsDescription: { fontSize: '0.85rem', lineHeight: 1.5 },
      }}
    />
  );
}
