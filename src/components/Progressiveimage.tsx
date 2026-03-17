import { useState, useRef, useEffect } from 'react';

interface Props {
  src: string;
  thumb: string;
  alt: string;
  style?: React.CSSProperties;
  className?: string;
}

export default function ProgressiveImage({ src, thumb, alt, style, className }: Props) {
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
      {/* Blur placeholder — always visible until full image loads */}
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
          filter: 'blur(15px)',
          transform: 'scale(1.1)',
          opacity: fullLoaded ? 0 : 1,
          transition: 'opacity 0.7s ease',
        }}
      />

      {/* Full WebP image — fades in over blur */}
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
            opacity: fullLoaded ? 1 : 0,
            transition: 'opacity 0.9s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      )}
    </div>
  );
}

// Converts filename to WebP + thumb paths
// e.g. 'DSC05415.JPG' → { src: '/images/webp/DSC05415.webp', thumb: '/images/thumbs/DSC05415-thumb.webp' }
export function getWebPPaths(filename: string) {
  const base = filename.replace(/\.[^.]+$/, '');
  return {
    src:   `/images/webp/${base}.webp`,
    thumb: `/images/thumbs/${base}-thumb.webp`,
  };
}