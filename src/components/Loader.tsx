import { useEffect, useState } from 'react';

export default function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'reveal' | 'done'>('loading');
  const [msgIdx, setMsgIdx] = useState(0);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number; delay: number }[]>([]);

  const messages = [
    { en: 'Preparing your invitation…',     de: 'Einladung wird vorbereitet…' },
    { en: 'Billy & Sarah — 28 Dec 2026',    de: 'Billy & Sarah — 28. Dez 2026' },
    { en: '🇰🇪 Kenya meets Deutschland 🇩🇪', de: '🇰🇪 Kenia trifft Deutschland 🇩🇪' },
    { en: 'A cross-cultural celebration…',  de: 'Eine interkulturelle Feier…' },
    { en: '✦  Welcome  ·  Willkommen  ✦',   de: '✦  Willkommen  ·  Welcome  ✦' },
  ];

  useEffect(() => {
    // Generate random sparkle positions
    setSparkles(
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 4,
      }))
    );

    const stages = [
      { target: 10, delay: 300 },
      { target: 25, delay: 1200 },
      { target: 42, delay: 2400 },
      { target: 58, delay: 3500 },
      { target: 74, delay: 4500 },
      { target: 89, delay: 5600 },
      { target: 100, delay: 6600 },
    ];
    stages.forEach(({ target, delay }) => setTimeout(() => setProgress(target), delay));

    const msgTimes = [0, 1400, 2900, 4400, 6000];
    msgTimes.forEach((delay, i) => setTimeout(() => setMsgIdx(i), delay));

    setTimeout(() => setPhase('reveal'), 7200);
    setTimeout(() => { setPhase('done'); onDone(); }, 8000);
  }, []);

  if (phase === 'done') return null;

  // Determine language from progress (switches mid-load for fun effect)
  const isDE = msgIdx === 1 || msgIdx === 3;
  const msg = isDE ? messages[msgIdx].de : messages[msgIdx].en;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'linear-gradient(160deg, #1C0A02 0%, #2E1408 50%, #1A0C04 100%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      opacity: phase === 'reveal' ? 0 : 1,
      transition: 'opacity 1.2s ease',
      pointerEvents: phase === 'reveal' ? 'none' : 'all',
      overflow: 'hidden',
    }}>

      {/* Animated sparkle dots */}
      {sparkles.map(s => (
        <div key={s.id} style={{
          position: 'absolute',
          left: `${s.x}%`, top: `${s.y}%`,
          width: '2px', height: '2px', borderRadius: '50%',
          background: '#E8C068',
          animation: `ldrTwinkle ${2 + s.delay * 0.5}s ease-in-out ${s.delay * 0.3}s infinite`,
          pointerEvents: 'none',
        }} />
      ))}

      {/* Radial glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(232,192,104,0.09) 0%, transparent 70%)',
      }} />

      {/* Top ornamental line */}
      <div style={{
        position: 'absolute', top: '12%', left: '50%', transform: 'translateX(-50%)',
        width: 'min(280px, 60vw)', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(232,192,104,0.4), transparent)',
        animation: 'ldrFadeIn 1s ease 0.5s both',
      }} />

      {/* ── FLAG EMOJIS — large, crisp on every device ── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '1.2rem',
        marginBottom: '2.2rem',
        animation: 'ldrFadeUp 0.9s ease 0.2s both',
      }}>
        {/* Kenya flag emoji — exactly what the phone shows */}
        <div style={{
          fontSize: 'clamp(3rem, 10vw, 5rem)',
          lineHeight: 1,
          filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.5))',
          transition: 'transform 0.4s',
        }}>🇰🇪</div>

        {/* Animated heart in between */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
        }}>
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
            color: '#E8C068', fontStyle: 'italic',
            animation: 'ldrPulse 2s ease infinite',
          }}>×</div>
          <div style={{
            fontSize: '0.55rem', letterSpacing: '0.3em',
            fontFamily: "'Raleway', sans-serif",
            textTransform: 'uppercase',
            color: 'rgba(232,192,104,0.5)',
          }}>love</div>
        </div>

        {/* Germany flag emoji */}
        <div style={{
          fontSize: 'clamp(3rem, 10vw, 5rem)',
          lineHeight: 1,
          filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.5))',
        }}>🇩🇪</div>
      </div>

      {/* Main names */}
      <div style={{
        textAlign: 'center', marginBottom: '0.6rem',
        animation: 'ldrFadeUp 1s ease 0.5s both',
      }}>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(3rem, 10vw, 6rem)',
          fontWeight: 400, color: '#FDF6E8',
          lineHeight: 0.92, margin: 0,
          letterSpacing: '-0.02em',
          textShadow: '0 0 60px rgba(232,192,104,0.2)',
        }}>
          Billy
        </h1>
        <div style={{
          fontFamily: "'Raleway', sans-serif",
          fontSize: 'clamp(0.7rem, 2vw, 0.9rem)',
          letterSpacing: '0.55em', textTransform: 'uppercase',
          color: 'rgba(232,192,104,0.7)', margin: '0.2rem 0',
        }}>&amp;</div>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(3rem, 10vw, 6rem)',
          fontWeight: 400, fontStyle: 'italic', color: '#FDF6E8',
          lineHeight: 0.92, margin: 0, letterSpacing: '-0.02em',
          textShadow: '0 0 60px rgba(232,192,104,0.2)',
        }}>
          Sarah
        </h1>
      </div>

      {/* Date line */}
      <p style={{
        fontFamily: "'Raleway', sans-serif",
        fontSize: 'clamp(0.62rem, 1.8vw, 0.72rem)',
        letterSpacing: '0.5em', textTransform: 'uppercase',
        color: 'rgba(232,192,104,0.55)', margin: '0.6rem 0 2.5rem',
        animation: 'ldrFadeUp 0.8s ease 0.8s both',
      }}>
        28 · XII · 2026 · Eldoret, Kenya
      </p>

      {/* Progress section */}
      <div style={{
        width: 'min(340px, 78vw)',
        animation: 'ldrFadeUp 0.7s ease 1s both',
      }}>
        {/* Bar track */}
        <div style={{
          width: '100%', height: '2px', background: 'rgba(255,255,255,0.07)',
          position: 'relative', overflow: 'visible', marginBottom: '0.8rem',
        }}>
          {/* Colored fill: Kenya red → gold → German gold */}
          <div style={{
            position: 'absolute', top: 0, left: 0, height: '100%',
            background: 'linear-gradient(90deg, #006600, #BB0000, #E8C068, #DD0000, #FFCC00)',
            backgroundSize: '200% 100%',
            width: `${progress}%`,
            transition: 'width 0.9s cubic-bezier(0.25,0.46,0.45,0.94)',
            boxShadow: '0 0 12px rgba(232,192,104,0.6)',
          }} />
          {/* Glow dot at end of bar */}
          <div style={{
            position: 'absolute', top: '50%',
            left: `${progress}%`, transform: 'translate(-50%, -50%)',
            width: '6px', height: '6px', borderRadius: '50%',
            background: '#E8C068',
            boxShadow: '0 0 8px #E8C068, 0 0 20px rgba(232,192,104,0.5)',
            transition: 'left 0.9s cubic-bezier(0.25,0.46,0.45,0.94)',
          }} />
        </div>

        {/* Message + % */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: 'clamp(0.58rem, 1.5vw, 0.65rem)',
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'rgba(232,192,104,0.5)',
            transition: 'opacity 0.5s',
          }}>
            {msg}
          </span>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '0.95rem', color: 'rgba(232,192,104,0.55)',
            fontStyle: 'italic', flexShrink: 0, marginLeft: '0.8rem',
          }}>
            {progress}%
          </span>
        </div>
      </div>

      {/* Bottom ornament */}
      <div style={{
        position: 'absolute', bottom: '12%', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: '0.6rem', alignItems: 'center',
        animation: 'ldrFadeIn 1s ease 1.5s both',
      }}>
        {['🇰🇪', '✦', '✝', '✦', '🇩🇪'].map((c, i) => (
          <span key={i} style={{
            fontSize: c.includes('🇰') || c.includes('🇩') ? '0.9rem' : '0.5rem',
            color: 'rgba(232,192,104,0.2)',
            animation: `ldrTwinkle ${2 + i * 0.3}s ease ${i * 0.2}s infinite`,
          }}>{c}</span>
        ))}
      </div>

      <style>{`
        @keyframes ldrFadeUp {
          from { opacity:0; transform:translateY(22px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes ldrFadeIn {
          from { opacity:0; } to { opacity:1; }
        }
        @keyframes ldrPulse {
          0%,100% { transform:scale(1); opacity:0.7; }
          50%      { transform:scale(1.3); opacity:1; }
        }
        @keyframes ldrTwinkle {
          0%,100% { opacity:0.15; transform:scale(0.8); }
          50%      { opacity:0.8;  transform:scale(1.2); }
        }
      `}</style>
    </div>
  );
}