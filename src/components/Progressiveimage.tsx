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
  'DSC05281.JPG': 'center',
  'DSC05285.JPG': 'top',
  'DSC05402.JPG': 'center',
  'DSC05406.JPG': 'top',
  'DSC05411.JPG': 'top',
  'DSC05415.JPG': '50% 20%',
  'DSC05417.JPG': 'top',
  'DSC05433.JPG': '50% 15%',  // this one was getting cut — focus higher
  'DSC05442.JPG': 'center',
  'DSC05443.JPG': 'top',
  'DSC05449.JPG': 'top',
  'DSC05466.JPG': 'center',
  'image1.JPG':   'center',
  'image2.JPG':   'center',
  'image3.JPG':   'top',
  'image4.JPG':   'center',
  'image5.JPG':   'top',
  'image7.JPG':   'center',
  'image8.JPG':   'center',
};

export function getWebPPaths(filename: string) {
  const base = filename.replace(/\.[^.]+$/, '');
  return {
    src:   `/images/webp/${base}.webp`,
    thumb: `/images/thumbs/${base}-thumb.webp`,
  };
}