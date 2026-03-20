import { useState, useEffect } from 'react';
import { useLang } from './Langcontext';

const KenyaFlag = () => (
  <svg width="22" height="15" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" style={{ display:'block', borderRadius:'2px', flexShrink:0 }}>
    <path fill="#060" d="M36 27a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4v18z"/>
    <path fill="#BB1600" d="M0 13h36v10H0z"/>
    <path fill="#141414" d="M32 5H4a4 4 0 0 0-4 4v4h36V9a4 4 0 0 0-4-4z"/>
    <path fill="#EEE" d="M0 13h36v1H0zm0 9h36v1H0z"/>
    <path fill="#141414" d="M23.054 9.404c-.066-.039-.186.089-.794.764c-.216.24-.486.539-.785.86c-.608.653-1.244 1.461-.783 1.935l-7.265 12.211c-.011.018-.019.047.003.087a.432.432 0 0 0 .294.177h.003c.046 0 .068-.021.079-.039l7.268-12.215c.626.148 1.024-.784 1.305-1.616c.14-.417.274-.796.381-1.1c.302-.856.356-1.027.294-1.064z"/>
    <path fill="#FFF" d="M22.305 10.208c-.216.24-.486.539-.786.861c-.886.952-1.124 1.528-.769 1.868l.018.016l-7.29 12.252c-.004.008.001.021.005.027a.378.378 0 0 0 .242.145h.002c.01 0 .023-.001.028-.01l7.279-12.234l.012-.02l.022.006c.458.13.846-.355 1.254-1.572c.14-.417.274-.796.381-1.101c.168-.475.314-.889.314-.984c-.082.046-.375.372-.712.746z"/>
    <path fill="#141414" d="M15.308 12.963c.461-.474-.174-1.282-.783-1.935c-.299-.322-.569-.62-.785-.86c-.608-.674-.728-.803-.794-.764c-.062.038-.008.208.293 1.063c.107.304.241.683.381 1.1c.28.833.678 1.764 1.305 1.616l7.268 12.215c.011.018.033.039.079.039h.003a.432.432 0 0 0 .294-.177c.021-.04.014-.069.003-.087l-7.264-12.21z"/>
    <path fill="#FFF" d="M15.25 12.937c.355-.34.118-.916-.769-1.868c-.3-.322-.569-.621-.786-.861c-.337-.374-.631-.7-.714-.745c0 .095.146.509.314.984c.107.305.242.684.381 1.101c.409 1.217.796 1.702 1.254 1.572l.022-.006l.012.02l7.279 12.234c.005.009.019.01.028.01h.002a.374.374 0 0 0 .242-.145c.004-.007.009-.02.005-.027l-7.29-12.252l.02-.017z"/>
    <path fill="#141414" d="M18.018 10.458L18 10.444l-.018.014c-2.492 1.87-3.704 4.331-3.704 7.523s1.211 5.653 3.704 7.524l.018.013l.018-.013c2.492-1.87 3.704-4.331 3.704-7.524s-1.212-5.655-3.704-7.523z"/>
    <path fill="#BB1600" d="M20.879 14.059c-.603-1.363-1.551-2.54-2.88-3.54c-1.326.999-2.273 2.174-2.877 3.533c.525 1.181.782 2.468.782 3.937c0 1.467-.256 2.751-.779 3.928c.604 1.356 1.55 2.529 2.873 3.527c1.326-.999 2.273-2.174 2.876-3.534c-.521-1.178-.776-2.461-.776-3.921c.002-1.462.258-2.747.781-3.93z"/>
    <path fill="#FFF" d="M18 18.927c.306 0 .555-.424.555-.946s-.249-.947-.555-.947c-.306 0-.554.424-.554.947c-.001.522.248.946.554.946zm-.231-2.497c-.502-.739-.746-1.677-.746-2.821c0-1.145.244-2.083.746-2.823v5.644zm.462 0c.501-.739.744-1.677.744-2.821c0-1.145-.243-2.083-.744-2.823v5.644zm-.462 3.1c-.502.738-.746 1.677-.746 2.821c0 1.146.244 2.082.746 2.822V19.53zm.462 0c.501.738.744 1.677.744 2.821c0 1.146-.243 2.082-.744 2.822V19.53z"/>
  </svg>
);
const GermanyFlag = () => (
  <svg width="22" height="15" viewBox="0 0 22 15" style={{ display:'block', borderRadius:'2px', flexShrink:0 }}>
    <rect width="22" height="5" fill="#000"/>
    <rect y="5" width="22" height="5" fill="#DD0000"/>
    <rect y="10" width="22" height="5" fill="#FFCC00"/>
  </svg>
);

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
    { en: 'Home',      de: 'Start',              sw: 'Nyumbani',     href: '#home' },
    { en: 'Our Story', de: 'Unsere Geschichte',  sw: 'Hadithi Yetu', href: '#story' },
    { en: 'Events',    de: 'Ablauf',             sw: 'Matukio',      href: '#events' },
    { en: 'Travel',    de: 'Anreise',            sw: 'Safari',       href: '#travel' },
    { en: 'Gallery',   de: 'Galerie',            sw: 'Picha',        href: '#gallery' },
    { en: 'RSVP',      de: 'RSVP',              sw: 'Jibu',         href: '#rsvp' },
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
                >{t(link.en, link.de, link.sw)}</a>
              </li>
            ))}
          </ul>

          {/* Right side: flags + lang + hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            {/* Decorative flags — desktop only, UI purpose only, no language switching */}
            <div className="bs-desktop-nav" style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <span style={{ fontSize: '1.5rem', lineHeight: 1 }} title="Kenya">🇰🇪</span>
              <span style={{ color: 'rgba(92,61,34,0.25)', fontSize: '0.7rem' }}>✦</span>
              <span style={{ fontSize: '1.5rem', lineHeight: 1 }} title="Deutschland">🇩🇪</span>
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
              }}>{t(link.en, link.de, link.sw)}</a>
            ))}
            {/* Mobile lang toggle */}
            <div style={{ display: 'flex', gap: '0.6rem', padding: '1rem 1.5rem 0', flexWrap:'wrap' }}>
              {([
                { l: 'en' as const, Flag: KenyaFlag,   label: 'EN' },
                { l: 'de' as const, Flag: GermanyFlag, label: 'DE' },
                { l: 'sw' as const, Flag: KenyaFlag,   label: 'SW' },
              ]).map(({ l, Flag, label }) => (
                <button key={l} onClick={() => { setLang(l); setMenuOpen(false); }} style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  background: lang === l ? '#C9963A' : 'transparent',
                  border: '1px solid rgba(201,150,58,0.5)',
                  color: lang === l ? '#fff' : '#C9963A',
                  fontFamily: "'Raleway', sans-serif", fontSize: '0.65rem',
                  letterSpacing: '0.2em', padding: '0.4rem 0.9rem',
                  cursor: 'pointer', textTransform: 'uppercase', borderRadius: '4px',
                }}>
                  <Flag />
                  <span>{label}</span>
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