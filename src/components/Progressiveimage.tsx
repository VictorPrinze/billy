import { useState, useRef, useEffect } from 'react';

interface Props {
  src: string;
  thumb: string;
  alt: string;
  style?: React.CSSProperties;
  className?: string;
  position?: string; // e.g. 'top', 'center', '50% 20%'
}

export default function ProgressiveImage({ src, thumb, alt, style, className, position = 'center' }: Props) {
  const [fullLoaded, setFullLoaded] = useState(false);
  const [inView, setInView]         = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#1a0a02',
        ...style,
      }}
    >
      {/* Blur placeholder */}
      <img
        src={thumb}
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: position,
          filter: 'blur(15px)',
          transform: 'scale(1.1)',
          opacity: fullLoaded ? 0 : 1,
          transition: 'opacity 0.7s ease',
        }}
      />

      {/* Full WebP */}
      {inView && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setFullLoaded(true)}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: position,
            opacity: fullLoaded ? 1 : 0,
            transition: 'opacity 0.9s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      )}
    </div>
  );
}

// Photo position map — tells each image where to focus when cropped
// 'top' = show top of image (good for portraits — keeps faces visible)
// 'center' = default, good for landscapes and wide shots
// '50% 20%' = custom fine-tuning
export const PHOTO_POSITIONS: Record<string, string> = {
  // ── DSC series ──
  'DSC05281.JPG': '50% 30%',   // couple portrait — keep faces
  'DSC05285.JPG': '50% 80%',   // looking up through flowers — faces at bottom
  'DSC05402.JPG': 'center',    // landscape/mountain — center fine
  'DSC05406.JPG': '50% 25%',   // portrait — keep faces high
  'DSC05411.JPG': '50% 25%',   // portrait — keep faces high
  'DSC05415.JPG': '50% 20%',   // portrait — keep faces high
  'DSC05417.JPG': '50% 25%',   // portrait — keep faces high
  'DSC05433.JPG': '50% 20%',   // portrait — keep faces high
  'DSC05442.JPG': 'center',    // landscape/wide shot
  'DSC05443.JPG': '50% 25%',   // portrait — keep faces high
  'DSC05449.JPG': '50% 25%',   // portrait — keep faces high
  'DSC05466.JPG': 'center',    // landscape wide shot

  // ── image series ──
  'image1.JPG':   '50% 25%',   // portrait couple
  'image2.JPG':   '50% 20%',   // portrait couple
  'image3.JPG':   '50% 15%',   // bench photo — faces at top, torso was showing
  'image4.JPG':   '50% 20%',   // portrait
  'image5.JPG':   '50% 15%',   // suit/dress — heads at top, was cropped at chest
  'image7.JPG':   '50% 20%',   // portrait couple
  'image8.JPG':   '50% 20%',   // portrait couple
};

export function getWebPPaths(filename: string) {
  const base = filename.replace(/\.[^.]+$/, '');
  return {
    src:   `/images/webp/${base}.webp`,
    thumb: `/images/thumbs/${base}-thumb.webp`,
  };
}