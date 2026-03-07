import { useState } from 'react';

const slots = [
  { id: 1, label: 'Engagement',   col: 'span 1', row: 'span 2', minH: '360px', grad: 'linear-gradient(135deg,#c8a050,#7a4c28)' },
  { id: 2, label: 'Our Story',    col: 'span 2', row: 'span 1', minH: '200px', grad: 'linear-gradient(135deg,#3d2b1f,#7a5038)' },
  { id: 3, label: 'Together',     col: 'span 1', row: 'span 1', minH: '200px', grad: 'linear-gradient(135deg,#d4b870,#9a6838)' },
  { id: 4, label: 'Special Moment', col:'span 1',row:'span 1', minH: '200px', grad: 'linear-gradient(135deg,#5a3820,#9a6838)' },
  { id: 5, label: 'The Proposal', col: 'span 1', row: 'span 1', minH: '200px', grad: 'linear-gradient(135deg,#b08860,#5a3420)' },
  { id: 6, label: 'Our Journey',  col: 'span 1', row: 'span 1', minH: '200px', grad: 'linear-gradient(135deg,#7a5030,#c8a060)' },
];

export default function Gallery() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="gallery" style={{ background: '#f5f0e8', padding: 'clamp(3rem,8vw,6rem) 0' }}>
      <div className="container">
        <div className="text-center" style={{ marginBottom: 'clamp(2rem,5vw,3rem)' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.7rem' }}>Our Memories</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,7vw,3.8rem)', fontWeight: 300, color: 'var(--text-dark)', lineHeight: 1.1, marginBottom: '0.8rem' }}>Photo Gallery</h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <div style={{ width: '45px', height: '1px', background: 'rgba(200,160,80,0.35)' }} />
            <span style={{ color: 'var(--gold)', fontSize: '0.65rem' }}>✦</span>
            <div style={{ width: '45px', height: '1px', background: 'rgba(200,160,80,0.35)' }} />
          </div>
        </div>

        {/* Desktop: CSS grid masonry */}
        <div className="gallery-desktop" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '10px',
        }}>
          {slots.map((s) => (
            <div key={s.id}
              onMouseEnter={() => setHovered(s.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: 'relative', overflow: 'hidden', cursor: 'pointer',
                gridColumn: s.col, gridRow: s.row,
                minHeight: s.minH,
                background: s.grad,
                transition: 'transform 0.35s ease',
                transform: hovered === s.id ? 'scale(1.015)' : 'scale(1)',
              }}
            >
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem,4vw,2.5rem)', color: 'rgba(255,255,255,0.18)', fontWeight: 300 }}>B &amp; S</span>
              </div>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'rgba(40,20,8,0.55)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: hovered === s.id ? 1 : 0,
                transition: 'opacity 0.3s',
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(0.9rem,2.5vw,1.1rem)', color: '#f5efe6' }}>{s.label}</div>
                  <div style={{ width: '28px', height: '1px', background: 'rgba(200,160,80,0.8)', margin: '0.4rem auto 0' }} />
                </div>
              </div>
              <div style={{
                position: 'absolute', bottom: '8px', left: '10px',
                fontFamily: 'var(--font-body)', fontSize: '0.55rem',
                letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)',
                textTransform: 'uppercase',
              }}>
                Add photo
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: simple 2-col grid */}
        <div className="gallery-mobile" style={{ display: 'none', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {slots.map((s) => (
            <div key={s.id} style={{
              position: 'relative', overflow: 'hidden',
              minHeight: '140px', background: s.grad,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'rgba(255,255,255,0.2)' }}>B &amp; S</span>
              <div style={{
                position: 'absolute', bottom: '6px', left: '8px',
                fontFamily: 'var(--font-body)', fontSize: '0.52rem',
                color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em',
              }}>{s.label}</div>
            </div>
          ))}
        </div>

        <p className="text-center" style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--gold)', letterSpacing: '0.08em', marginTop: '1rem' }}>
          Replace gradient placeholders with &lt;img&gt; tags in Gallery.tsx
        </p>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .gallery-desktop { display: none !important; }
          .gallery-mobile  { display: grid !important; }
        }
      `}</style>
    </section>
  );
}