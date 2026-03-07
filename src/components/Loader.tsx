import { useEffect, useState } from 'react';

export default function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'reveal' | 'done'>('loading');

  useEffect(() => {
    // Simulate asset loading with staged progress
    const stages = [
      { target: 30, delay: 200 },
      { target: 60, delay: 600 },
      { target: 85, delay: 1000 },
      { target: 100, delay: 1600 },
    ];

    stages.forEach(({ target, delay }) => {
      setTimeout(() => setProgress(target), delay);
    });

    setTimeout(() => setPhase('reveal'), 2000);
    setTimeout(() => { setPhase('done'); onDone(); }, 2800);
  }, []);

  if (phase === 'done') return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#1a0d06',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      opacity: phase === 'reveal' ? 0 : 1,
      transition: 'opacity 0.8s ease',
      pointerEvents: phase === 'reveal' ? 'none' : 'all',
    }}>

      {/* Background texture */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,150,58,0.06) 0%, transparent 70%)`,
      }} />

      {/* Flags row */}
      <div style={{
        display: 'flex', gap: '1.5rem', marginBottom: '2.5rem',
        animation: 'fadeIn 0.6s ease 0.3s both',
      }}>
        {/* Kenya flag */}
        <div style={{
          width: '52px', height: '34px', overflow: 'hidden',
          borderRadius: '3px', boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
          flexShrink: 0,
        }}>
          <div style={{ height: '34%', background: '#006600' }} />
          <div style={{ height: '32%', background: '#BB0000', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '10px', height: '10px', background: '#fff', borderRadius: '50%' }} />
          </div>
          <div style={{ height: '34%', background: '#006600' }} />
        </div>

        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '1.4rem', color: 'rgba(201,150,58,0.7)',
          animation: 'shimmer 2s ease infinite',
        }}>✕</div>

        {/* Germany flag */}
        <div style={{
          width: '52px', height: '34px', overflow: 'hidden',
          borderRadius: '3px', boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
        }}>
          <div style={{ height: '33%', background: '#000' }} />
          <div style={{ height: '34%', background: '#DD0000' }} />
          <div style={{ height: '33%', background: '#FFCC00' }} />
        </div>
      </div>

      {/* Names */}
      <div style={{
        textAlign: 'center', marginBottom: '2.5rem',
        animation: 'fadeUp 0.8s ease 0.5s both',
      }}>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(2.8rem, 8vw, 5rem)',
          fontWeight: 400, color: '#F5EFE6',
          lineHeight: 0.95, margin: 0,
          letterSpacing: '-0.01em',
        }}>
          Billy <span style={{ fontStyle: 'italic', color: '#C9963A' }}>&</span> Sarah
        </h1>
        <p style={{
          fontFamily: "'Raleway', sans-serif",
          fontSize: '0.7rem', letterSpacing: '0.5em',
          textTransform: 'uppercase', color: 'rgba(201,150,58,0.75)',
          marginTop: '0.8rem',
        }}>
          28 · XII · 2026 · Eldoret, Kenya
        </p>
      </div>

      {/* Progress bar */}
      <div style={{
        width: 'min(300px, 70vw)', height: '1px',
        background: 'rgba(255,255,255,0.1)',
        position: 'relative', overflow: 'hidden',
        animation: 'fadeIn 0.5s ease 0.8s both',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, height: '100%',
          background: 'linear-gradient(90deg, #C9963A, #E8C068)',
          width: `${progress}%`,
          transition: 'width 0.5s var(--ease-smooth)',
          boxShadow: '0 0 8px rgba(201,150,58,0.6)',
        }} />
      </div>

      <p style={{
        fontFamily: "'Raleway', sans-serif",
        fontSize: '0.62rem', letterSpacing: '0.35em',
        textTransform: 'uppercase', color: 'rgba(201,150,58,0.5)',
        marginTop: '1rem',
        animation: 'fadeIn 0.5s ease 1s both',
      }}>
        {progress < 100 ? 'Preparing your invitation…' : 'Welcome ✦ Willkommen'}
      </p>
    </div>
  );
}