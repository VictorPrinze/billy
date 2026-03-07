import { useEffect, useState } from 'react';

export default function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'reveal' | 'done'>('loading');
  const [messageIdx, setMessageIdx] = useState(0);

  const messages = [
    'Preparing your invitation…',
    'Loading Billy & Sarah\'s big day…',
    'Kenya × Deutschland 🌍',
    'Almost ready…',
    'Welcome ✦ Willkommen',
  ];

  useEffect(() => {
    // Slower, more dramatic staged loading
    const stages = [
      { target: 12, delay: 500 },
      { target: 28, delay: 1400 },
      { target: 45, delay: 2500 },
      { target: 62, delay: 3600 },
      { target: 78, delay: 4600 },
      { target: 91, delay: 5400 },
      { target: 100, delay: 6200 },
    ];

    stages.forEach(({ target, delay }) => {
      setTimeout(() => setProgress(target), delay);
    });

    // Cycle through messages
    const msgTimings = [0, 1400, 2800, 4400, 6000];
    msgTimings.forEach((delay, i) => {
      setTimeout(() => setMessageIdx(i), delay);
    });

    setTimeout(() => setPhase('reveal'), 6800);
    setTimeout(() => { setPhase('done'); onDone(); }, 7600);
  }, []);

  if (phase === 'done') return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#1a0d06',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      opacity: phase === 'reveal' ? 0 : 1,
      transition: 'opacity 1s ease',
      pointerEvents: phase === 'reveal' ? 'none' : 'all',
    }}>

      {/* Background radial glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `radial-gradient(ellipse 70% 55% at 50% 50%, rgba(201,150,58,0.07) 0%, transparent 70%)`,
      }} />

      {/* Flags row */}
      <div style={{
        display: 'flex', gap: '2rem', marginBottom: '2.8rem',
        alignItems: 'center',
        animation: 'ldrFadeUp 0.8s ease 0.3s both',
      }}>

        {/* ── KENYA FLAG (correct: black / red / green + white edges + shield) ── */}
        <div style={{
          width: '72px', height: '48px', overflow: 'hidden',
          borderRadius: '4px', boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          position: 'relative', flexShrink: 0,
        }}>
          {/* Stripes: black top, thin white, red center, thin white, green bottom */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 3, background: '#000000' }} />
            <div style={{ flex: 0.6, background: '#FFFFFF' }} />
            <div style={{ flex: 4, background: '#BB0000' }} />
            <div style={{ flex: 0.6, background: '#FFFFFF' }} />
            <div style={{ flex: 3, background: '#006600' }} />
          </div>
          {/* Maasai shield + spears — SVG centered */}
          <svg
            viewBox="0 0 72 48"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          >
            {/* Two spears (vertical lines, slight angle) */}
            <line x1="32" y1="2" x2="34" y2="46" stroke="white" strokeWidth="1.2" />
            <line x1="40" y1="2" x2="38" y2="46" stroke="white" strokeWidth="1.2" />
            {/* Spear tips */}
            <polygon points="32,2 34,2 33,0" fill="white" />
            <polygon points="38,2 40,2 39,0" fill="white" />
            {/* Shield body — Maasai oval shape */}
            <ellipse cx="36" cy="24" rx="7" ry="13" fill="#BB0000" stroke="white" strokeWidth="1" />
            {/* Shield top stripe */}
            <ellipse cx="36" cy="14" rx="5.5" ry="5" fill="#000000" />
            {/* Shield bottom stripe */}
            <ellipse cx="36" cy="34" rx="5.5" ry="5" fill="#000000" />
            {/* Center white band across shield */}
            <rect x="29" y="21" width="14" height="6" fill="white" />
          </svg>
        </div>

        {/* Separator */}
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '1.6rem', color: 'rgba(201,150,58,0.65)',
          lineHeight: 1,
          animation: 'ldrShimmer 2s ease infinite',
        }}>✕</div>

        {/* ── GERMANY FLAG (correct: black / red / gold) ── */}
        <div style={{
          width: '72px', height: '48px', overflow: 'hidden',
          borderRadius: '4px', boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          display: 'flex', flexDirection: 'column', flexShrink: 0,
        }}>
          <div style={{ flex: 1, background: '#000000' }} />
          <div style={{ flex: 1, background: '#DD0000' }} />
          <div style={{ flex: 1, background: '#FFCC00' }} />
        </div>
      </div>

      {/* Names */}
      <div style={{
        textAlign: 'center', marginBottom: '3rem',
        animation: 'ldrFadeUp 0.9s ease 0.6s both',
      }}>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(2.8rem, 9vw, 5.5rem)',
          fontWeight: 400, color: '#F5EFE6',
          lineHeight: 0.95, margin: 0,
          letterSpacing: '-0.01em',
          textShadow: '0 2px 40px rgba(201,150,58,0.25)',
        }}>
          Billy <span style={{ fontStyle: 'italic', color: '#C9963A' }}>&</span> Sarah
        </h1>
        <p style={{
          fontFamily: "'Raleway', sans-serif",
          fontSize: '0.7rem', letterSpacing: '0.5em',
          textTransform: 'uppercase', color: 'rgba(201,150,58,0.7)',
          marginTop: '0.9rem', marginBottom: 0,
        }}>
          28 · XII · 2026 · Eldoret, Kenya
        </p>
      </div>

      {/* Progress bar */}
      <div style={{
        width: 'min(320px, 72vw)', marginBottom: '1rem',
        animation: 'ldrFadeUp 0.7s ease 1s both',
      }}>
        {/* Track */}
        <div style={{
          width: '100%', height: '2px',
          background: 'rgba(255,255,255,0.08)',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Fill */}
          <div style={{
            position: 'absolute', top: 0, left: 0, height: '100%',
            background: 'linear-gradient(90deg, #BB0000, #C9963A, #FFCC00)',
            width: `${progress}%`,
            transition: 'width 0.8s cubic-bezier(0.25,0.46,0.45,0.94)',
            boxShadow: '0 0 10px rgba(201,150,58,0.7)',
          }} />
        </div>

        {/* Percentage + message row */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', marginTop: '0.6rem',
        }}>
          <span style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: '0.58rem', letterSpacing: '0.3em',
            textTransform: 'uppercase', color: 'rgba(201,150,58,0.45)',
          }}>
            {messages[messageIdx]}
          </span>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '0.9rem', color: 'rgba(201,150,58,0.6)',
            fontStyle: 'italic',
          }}>
            {progress}%
          </span>
        </div>
      </div>

      {/* Small ornament */}
      <div style={{
        color: 'rgba(201,150,58,0.2)', fontSize: '1rem',
        letterSpacing: '0.8rem', marginTop: '0.5rem',
        animation: 'ldrShimmer 3s ease infinite',
        fontFamily: 'serif',
      }}>
        ✦ ✦ ✦
      </div>

      <style>{`
        @keyframes ldrFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ldrShimmer {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 1; }
        }
      `}</style>
    </div>
  );
}