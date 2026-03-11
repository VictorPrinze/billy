import { useState, useEffect, useRef } from 'react';
import { LangProvider, useLang } from './LangContext';
import { useScrollReveal } from './useScrollReveal';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import OurStory from './components/OurStory';
import EventSection from './components/EventSection';
import Travel from './components/Travel';
import { Gallery, RSVP, Footer } from './components/Sections';

// ── Subtle cursor — tiny dot only, mix-blend-mode so it never covers text ──
function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch device — hide cursor entirely on mobile
    if ('ontouchstart' in window) { setIsTouch(true); return; }

    let px = -100, py = -100;
    let raf: number;

    const onMove = (e: MouseEvent) => { px = e.clientX; py = e.clientY; };

    const animate = () => {
      if (dotRef.current) {
        dotRef.current.style.left = px + 'px';
        dotRef.current.style.top  = py + 'px';
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (isTouch) return null;

  return (
    <div
      ref={dotRef}
      style={{
        position: 'fixed',
        width: '5px', height: '5px',
        borderRadius: '50%',
        background: '#E8C068',
        transform: 'translate(-50%,-50%)',
        pointerEvents: 'none',
        zIndex: 9990,
        // mix-blend-mode means the dot inverts color under it — never hides text
        mixBlendMode: 'difference',
        transition: 'opacity 0.3s',
      }}
    />
  );
}

// ── Floating Language Switcher — always visible, mobile-first ──
function LangSwitcher() {
  const { lang, setLang } = useLang();
  const [visible, setVisible] = useState(true);
  const lastScroll = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const cur = window.scrollY;
      // Hide when scrolling down fast, show when scrolling up
      setVisible(cur < 100 || cur < lastScroll.current);
      lastScroll.current = cur;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '20px',
      zIndex: 1050,
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      transform: visible ? 'translateY(0)' : 'translateY(100px)',
      opacity: visible ? 1 : 0,
      transition: 'transform 0.4s ease, opacity 0.4s ease',
    }}>
      {/* Label */}
      <div style={{
        textAlign: 'center',
        fontFamily: "'Raleway', sans-serif",
        fontSize: '0.52rem',
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        color: 'rgba(61,43,31,0.45)',
      }}>Language</div>

      {/* Pill container */}
      <div style={{
        display: 'flex',
        background: 'rgba(255,252,247,0.95)',
        border: '1px solid rgba(201,150,58,0.25)',
        borderRadius: '50px',
        padding: '4px',
        boxShadow: '0 4px 20px rgba(61,43,31,0.18), 0 1px 4px rgba(0,0,0,0.08)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        gap: '4px',
      }}>
        {/* EN button */}
        <button
          onClick={() => setLang('en')}
          title="Switch to English"
          style={{
            display: 'flex', alignItems: 'center', gap: '5px',
            padding: '8px 14px',
            borderRadius: '40px',
            border: 'none',
            background: lang === 'en'
              ? 'linear-gradient(135deg, #C9963A, #A07520)'
              : 'transparent',
            color: lang === 'en' ? '#fff' : '#6B4A30',
            fontFamily: "'Raleway', sans-serif",
            fontSize: '0.7rem',
            fontWeight: 600,
            letterSpacing: '0.1em',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            whiteSpace: 'nowrap',
            boxShadow: lang === 'en' ? '0 2px 8px rgba(201,150,58,0.35)' : 'none',
          }}
        >
          <span style={{ fontSize: '1rem', lineHeight: 1 }}>🇰🇪</span>
          <span>EN</span>
        </button>

        {/* DE button */}
        <button
          onClick={() => setLang('de')}
          title="Auf Deutsch wechseln"
          style={{
            display: 'flex', alignItems: 'center', gap: '5px',
            padding: '8px 14px',
            borderRadius: '40px',
            border: 'none',
            background: lang === 'de'
              ? 'linear-gradient(135deg, #C9963A, #A07520)'
              : 'transparent',
            color: lang === 'de' ? '#fff' : '#6B4A30',
            fontFamily: "'Raleway', sans-serif",
            fontSize: '0.7rem',
            fontWeight: 600,
            letterSpacing: '0.1em',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            whiteSpace: 'nowrap',
            boxShadow: lang === 'de' ? '0 2px 8px rgba(201,150,58,0.35)' : 'none',
          }}
        >
          <span style={{ fontSize: '1rem', lineHeight: 1 }}>🇩🇪</span>
          <span>DE</span>
        </button>
      </div>
    </div>
  );
}

// ── Inner app ──
function AppInner() {
  useScrollReveal();
  return (
    <>
      <Cursor />
      <LangSwitcher />
      <Navbar />
      <Hero />
      <OurStory />
      <EventSection />
      <Travel />
      <Gallery />
      <RSVP />
      <Footer />
    </>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <LangProvider>
      <Loader onDone={() => setLoaded(true)} />
      <div style={{
        opacity: loaded ? 1 : 0,
        transition: 'opacity 0.8s ease 0.2s',
        visibility: loaded ? 'visible' : 'hidden',
      }}>
        <AppInner />
      </div>
    </LangProvider>
  );
}