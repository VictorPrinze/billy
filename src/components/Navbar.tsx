import { useState, useEffect } from 'react';
import { useLang } from './Langcontext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const { lang, setLang, t } = useLang();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const total = document.body.scrollHeight - window.innerHeight;
      setScrollPct(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 992) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const links = [
    { en: 'Home',      de: 'Start',    href: '#home' },
    { en: 'Our Story', de: 'Unsere Geschichte', href: '#story' },
    { en: 'Events',    de: 'Ablauf',   href: '#events' },
    { en: 'Travel',    de: 'Anreise',  href: '#travel' },
    { en: 'Gallery',   de: 'Galerie',  href: '#gallery' },
    { en: 'RSVP',      de: 'RSVP',    href: '#rsvp' },
  ];

  const solidBg   = scrolled || menuOpen;
  const brandClr  = solidBg ? '#3D2B1F' : '#FFFCF7';
  const linkClr   = solidBg ? '#3D2B1F' : 'rgba(255,252,247,0.9)';

  return (
    <>
      {/* Scroll progress */}
      <div style={{
        position: 'fixed', top: 0, left: 0, height: '3px', zIndex: 1001,
        width: `${scrollPct}%`,
        background: 'linear-gradient(90deg, #BE0027, #C9963A, #DD0000)',
        transition: 'width 0.1s linear',
        pointerEvents: 'none',
      }} />

      <nav className={`bs-nav${scrolled ? ' scrolled' : ''}`}>
        <div className="bs-nav-inner">

          {/* Brand */}
          <a href="#home" onClick={() => setMenuOpen(false)} style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.2rem,3vw,1.5rem)', fontWeight: 700,
            color: brandClr, letterSpacing: '0.04em', flexShrink: 0,
            transition: 'color 0.35s',
          }}>
            B <span style={{ color: '#C9963A', fontStyle: 'italic' }}>&</span> S
          </a>

          {/* Desktop links */}
          <ul className="bs-desktop-nav" style={{
            listStyle: 'none', margin: 0, padding: 0,
            display: 'flex', gap: '0.1rem', alignItems: 'center',
          }}>
            {links.map(link => (
              <li key={link.href}>
                <a href={link.href} style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: '0.7rem', letterSpacing: '0.18em',
                  textTransform: 'uppercase', color: linkClr,
                  fontWeight: 500, padding: '0.5rem 0.75rem',
                  display: 'block', transition: 'color 0.25s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#C9963A'}
                onMouseLeave={e => e.currentTarget.style.color = linkClr}
                >{t(link.en, link.de)}</a>
              </li>
            ))}
          </ul>

          {/* Right side: flags + lang + hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            {/* Flag buttons */}
            <div className="bs-desktop-nav" style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
              <button onClick={() => setLang('en')} title="English"
                style={{
                  background: 'none', border: 'none', cursor: 'pointer', padding: '2px',
                  opacity: lang === 'en' ? 1 : 0.45, transition: 'opacity 0.3s',
                  transform: lang === 'en' ? 'scale(1.15)' : 'scale(1)',
                }}>
                <div style={{ width: '24px', height: '16px', overflow: 'hidden', borderRadius: '2px', boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>
                  {/* Kenya mini flag */}
                  <div style={{ height: '33%', background: '#006600' }} />
                  <div style={{ height: '34%', background: '#BB0000' }} />
                  <div style={{ height: '33%', background: '#006600' }} />
                </div>
              </button>
              <button onClick={() => setLang('de')} title="Deutsch"
                style={{
                  background: 'none', border: 'none', cursor: 'pointer', padding: '2px',
                  opacity: lang === 'de' ? 1 : 0.45, transition: 'opacity 0.3s',
                  transform: lang === 'de' ? 'scale(1.15)' : 'scale(1)',
                }}>
                <div style={{ width: '24px', height: '16px', overflow: 'hidden', borderRadius: '2px', boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>
                  {/* Germany mini flag */}
                  <div style={{ height: '33%', background: '#000' }} />
                  <div style={{ height: '34%', background: '#DD0000' }} />
                  <div style={{ height: '33%', background: '#FFCC00' }} />
                </div>
              </button>
            </div>

            {/* Hamburger */}
            <button onClick={() => setMenuOpen(v => !v)} aria-label="Menu"
              className="bs-hamburger"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'flex-end' }}>
              {[{ w: menuOpen?'22px':'26px', t: menuOpen?'rotate(45deg) translate(5px,5px)':'none' }, { w:'22px', o: menuOpen?0:1 }, { w: menuOpen?'22px':'18px', t: menuOpen?'rotate(-45deg) translate(5px,-5px)':'none' }].map((s,i) => (
                <span key={i} style={{ display:'block', width:s.w, height:'2px', background:brandClr, transition:'all 0.3s', transform:s.t??'none', opacity:s.o??1 }} />
              ))}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div style={{
          maxHeight: menuOpen ? '520px' : '0',
          overflow: 'hidden', transition: 'max-height 0.4s ease',
          background: 'rgba(250,246,239,0.99)',
          borderTop: menuOpen ? '1px solid rgba(201,150,58,0.12)' : 'none',
        }}>
          <div style={{ padding: '0.5rem 0 1rem' }}>
            {links.map(link => (
              <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} style={{
                display: 'block', padding: '0.9rem 1.5rem',
                fontFamily: "'Raleway', sans-serif", fontSize: '0.82rem',
                letterSpacing: '0.22em', textTransform: 'uppercase',
                color: '#3D2B1F', fontWeight: 500,
                borderBottom: '1px solid rgba(201,150,58,0.07)',
              }}>{t(link.en, link.de)}</a>
            ))}
            {/* Mobile lang toggle */}
            <div style={{ display: 'flex', gap: '0.8rem', padding: '1rem 1.5rem 0' }}>
              {(['en','de'] as const).map(l => (
                <button key={l} onClick={() => setLang(l)} style={{
                  background: lang === l ? '#C9963A' : 'transparent',
                  border: '1px solid rgba(201,150,58,0.5)',
                  color: lang === l ? '#fff' : '#C9963A',
                  fontFamily: "'Raleway', sans-serif", fontSize: '0.65rem',
                  letterSpacing: '0.2em', padding: '0.35rem 0.8rem',
                  cursor: 'pointer', textTransform: 'uppercase',
                }}>
                  {l === 'en' ? '🇰🇪 EN' : '🇩🇪 DE'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <style>{`
        .bs-desktop-nav { display: flex !important; }
        .bs-hamburger   { display: none !important; }
        @media (max-width: 991px) {
          .bs-desktop-nav { display: none !important; }
          .bs-hamburger   { display: flex !important; }
        }
      `}</style>
    </>
  );
}