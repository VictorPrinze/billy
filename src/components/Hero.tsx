import { useEffect, useState, useRef } from 'react';
import { useLang } from './Langcontext';

// All 9 photos — hero cycles through them as a cinematic slideshow
const HERO_PHOTOS = [
  'DSC05281.JPG',
  'DSC05467.JPG',
  'DSC05417.JPG',
  'DSC05358.JPG',
  'DSC05447.JPG',
];

export default function Hero() {
  const { t } = useLang();
  const [timeLeft, setTimeLeft] = useState({ days:0, hours:0, minutes:0, seconds:0 });
  const [parallaxY, setParallaxY] = useState(0);
  const [slideIdx, setSlideIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState<number|null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  // Countdown
  useEffect(() => {
    const wedding = new Date('2026-12-28T10:00:00');
    const tick = () => {
      const d = wedding.getTime() - Date.now();
      if (d <= 0) return;
      setTimeLeft({ days:Math.floor(d/86400000), hours:Math.floor((d/3600000)%24), minutes:Math.floor((d/60000)%60), seconds:Math.floor((d/1000)%60) });
    };
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, []);

  // Parallax
  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current) return;
      if (heroRef.current.getBoundingClientRect().bottom > 0)
        setParallaxY(window.scrollY * 0.28);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Auto-slide every 5s
  useEffect(() => {
    const id = setInterval(() => {
      setPrevIdx(slideIdx);
      setTransitioning(true);
      setTimeout(() => {
        setSlideIdx(i => (i + 1) % HERO_PHOTOS.length);
        setTransitioning(false);
        setPrevIdx(null);
      }, 900);
    }, 5000);
    return () => clearInterval(id);
  }, [slideIdx]);

  const countItems = [
    { v: timeLeft.days,    en:'Days',    de:'Tage' },
    { v: timeLeft.hours,   en:'Hours',   de:'Stunden' },
    { v: timeLeft.minutes, en:'Minutes', de:'Minuten' },
    { v: timeLeft.seconds, en:'Seconds', de:'Sekunden' },
  ];

  return (
    <section id="home" ref={heroRef} style={{
      width:'100%', minHeight:'100vh', position:'relative',
      display:'flex', alignItems:'center', justifyContent:'center',
      overflow:'hidden',
    }}>
      {/* ── Sliding photo backgrounds ── */}
      {HERO_PHOTOS.map((photo, i) => (
        <div key={photo} style={{
          position:'absolute', inset:'-10%',
          backgroundImage: `url(/src/assets/images/${photo})`,
          backgroundSize:'cover', backgroundPosition:'center',
          transform:`translateY(${i === slideIdx ? parallaxY : 0}px)`,
          opacity: i === slideIdx ? 1 : (i === prevIdx && transitioning ? 1 : 0),
          transition: i === slideIdx
            ? 'opacity 1s ease'
            : (i === prevIdx && transitioning ? 'opacity 0.9s ease' : 'none'),
          zIndex: i === slideIdx ? 1 : (i === prevIdx ? 0 : -1),
        }} />
      ))}

      {/* Deep cinematic overlay — lighter than before */}
      <div style={{
        position:'absolute', inset:0, zIndex:2,
        background:`
          linear-gradient(to bottom,
            rgba(20,8,2,0.55) 0%,
            rgba(20,8,2,0.3) 40%,
            rgba(20,8,2,0.45) 70%,
            rgba(255,248,235,1) 100%
          )`,
      }} />

      {/* Vignette sides */}
      <div style={{
        position:'absolute', inset:0, zIndex:2, pointerEvents:'none',
        background:'radial-gradient(ellipse 120% 100% at 50% 50%, transparent 40%, rgba(15,6,1,0.4) 100%)',
      }} />

      {/* Dual flag strip — top */}
      <div style={{
        position:'absolute', top:0, left:0, right:0,
        display:'flex', height:'4px', zIndex:4,
        animation:'hFadeIn 1s ease 2s both',
      }}>
        <div style={{flex:3,background:'#006600'}}/>
        <div style={{flex:0.5,background:'#fff'}}/>
        <div style={{flex:4,background:'#BB0000'}}/>
        <div style={{flex:0.5,background:'#fff'}}/>
        <div style={{flex:3,background:'#006600'}}/>
        <div style={{flex:0.2,background:'#2a1608'}}/>
        <div style={{flex:3,background:'#000'}}/>
        <div style={{flex:3,background:'#DD0000'}}/>
        <div style={{flex:3,background:'#FFCC00'}}/>
      </div>

      {/* Slide dots */}
      <div style={{
        position:'absolute', bottom:'140px', left:'50%',
        transform:'translateX(-50%)',
        display:'flex', gap:'8px', zIndex:5,
        animation:'hFadeIn 1s ease 1.5s both',
      }}>
        {HERO_PHOTOS.map((_,i) => (
          <button key={i}
            onClick={() => setSlideIdx(i)}
            style={{
              width: i === slideIdx ? '24px' : '7px',
              height:'7px', borderRadius:'20px',
              background: i === slideIdx ? '#D4A043' : 'rgba(255,255,255,0.4)',
              border:'none', padding:0, cursor:'pointer',
              transition:'all 0.4s ease',
            }}
          />
        ))}
      </div>

      {/* ── Content ── */}
      <div style={{
        width:'100%', maxWidth:'820px', margin:'0 auto',
        padding:'110px clamp(20px,5vw,48px) 100px',
        textAlign:'center', position:'relative', zIndex:3, boxSizing:'border-box',
      }}>
        {/* Flags + cultural label */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'0.7rem', marginBottom:'1.4rem', animation:'hFadeUp 0.8s ease 0.3s both' }}>
          <span style={{ fontSize:'1.4rem' }}>🇰🇪</span>
          <div style={{ width:'28px', height:'1px', background:'rgba(212,160,67,0.5)' }}/>
          <span style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.62rem', letterSpacing:'0.45em', textTransform:'uppercase', color:'rgba(212,160,67,0.85)' }}>Kenya × Deutschland</span>
          <div style={{ width:'28px', height:'1px', background:'rgba(212,160,67,0.5)' }}/>
          <span style={{ fontSize:'1.4rem' }}>🇩🇪</span>
        </div>

        {/* Pre-title */}
        <p style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.65rem', letterSpacing:'0.5em', textTransform:'uppercase', color:'rgba(255,248,235,0.8)', marginBottom:'1.2rem', animation:'hFadeUp 0.8s ease 0.5s both' }}>
          {t('You are cordially invited', 'Herzliche Einladung')}
        </p>

        {/* Names */}
        <div style={{ animation:'hFadeUp 0.9s ease 0.7s both' }}>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(5rem,18vw,10rem)', fontWeight:400, color:'#FDF8EB', lineHeight:0.9, margin:0, textShadow:'0 4px 60px rgba(0,0,0,0.4), 0 0 120px rgba(212,160,67,0.15)' }}>
            Billy
          </h1>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(1rem,3vw,1.6rem)', color:'#D4A043', margin:'0.2rem 0', letterSpacing:'0.3em', fontStyle:'italic' }}>&amp;</div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(5rem,18vw,10rem)', fontWeight:400, fontStyle:'italic', color:'#FDF8EB', lineHeight:0.9, margin:0, textShadow:'0 4px 60px rgba(0,0,0,0.4), 0 0 120px rgba(212,160,67,0.15)' }}>
            Sarah
          </h1>
        </div>

        {/* Divider */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'0.8rem', margin:'1.8rem 0', animation:'hFadeUp 0.8s ease 0.9s both' }}>
          <div style={{ width:'70px', height:'1px', background:'linear-gradient(90deg,transparent,rgba(212,160,67,0.6))' }}/>
          <span style={{ color:'rgba(212,160,67,0.85)', fontSize:'0.85rem' }}>✦</span>
          <div style={{ width:'70px', height:'1px', background:'linear-gradient(90deg,rgba(212,160,67,0.6),transparent)' }}/>
        </div>

        {/* Date & venue */}
        <div style={{ animation:'hFadeUp 0.8s ease 1s both' }}>
          <p style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(1rem,3.5vw,1.6rem)', color:'#FDF8EB', marginBottom:'0.2rem', letterSpacing:'0.05em', textShadow:'0 2px 12px rgba(0,0,0,0.4)' }}>
            {t('28th December 2026', '28. Dezember 2026')}
          </p>
          <p style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.7rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(212,160,67,0.85)' }}>
            Eldoret, Kenya
          </p>
        </div>

        {/* Verse */}
        <div style={{ margin:'1.6rem auto 0', maxWidth:'430px', padding:'1rem 1.5rem', border:'1px solid rgba(212,160,67,0.2)', background:'rgba(253,248,235,0.07)', backdropFilter:'blur(4px)', animation:'hFadeUp 0.8s ease 1.1s both' }}>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', color:'rgba(253,248,235,0.8)', fontSize:'0.95rem', lineHeight:1.75, margin:0 }}>
            {t('"Every good and perfect gift is from above."', '"Jede gute Gabe kommt von oben."')}
          </p>
          <p style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.6rem', letterSpacing:'0.2em', color:'rgba(212,160,67,0.7)', margin:'0.4rem 0 0' }}>— {t('James 1:17','Jakobus 1,17')}</p>
        </div>

        {/* Countdown */}
        <div style={{ display:'flex', justifyContent:'center', gap:'clamp(1rem,4vw,2.5rem)', flexWrap:'wrap', marginTop:'2rem', animation:'hFadeUp 0.8s ease 1.2s both' }}>
          {countItems.map(({ v, en, de }) => (
            <div key={en} style={{ textAlign:'center', minWidth:'52px' }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(2rem,6vw,3.2rem)', fontWeight:400, color:'#FDF8EB', lineHeight:1, textShadow:'0 2px 16px rgba(0,0,0,0.4)' }}>
                {String(v).padStart(2,'0')}
              </div>
              <div style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.55rem', letterSpacing:'0.28em', textTransform:'uppercase', color:'rgba(212,160,67,0.75)', marginTop:'0.25rem' }}>
                {t(en, de)}
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap', marginTop:'2.2rem', animation:'hFadeUp 0.8s ease 1.4s both' }}>
          <a href="#rsvp" style={{
            padding:'0.9rem 2.5rem',
            background:'linear-gradient(135deg, #D4A043, #A87825)',
            color:'#FDF8EB', fontFamily:"'Raleway',sans-serif", fontSize:'0.7rem',
            letterSpacing:'0.3em', textTransform:'uppercase', fontWeight:600,
            boxShadow:'0 4px 24px rgba(212,160,67,0.4)',
            transition:'all 0.3s', display:'inline-block',
          }}
          onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='0 8px 32px rgba(212,160,67,0.55)';}}
          onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='0 4px 24px rgba(212,160,67,0.4)';}}
          >{t('RSVP Now','Jetzt zusagen')}</a>
          <a href="#travel" style={{
            padding:'0.9rem 2.5rem',
            border:'1px solid rgba(212,160,67,0.6)',
            background:'rgba(253,248,235,0.08)',
            backdropFilter:'blur(8px)',
            color:'rgba(253,248,235,0.9)', fontFamily:"'Raleway',sans-serif",
            fontSize:'0.7rem', letterSpacing:'0.3em', textTransform:'uppercase',
            transition:'all 0.3s', display:'inline-block',
          }}
          onMouseEnter={e=>{e.currentTarget.style.background='rgba(212,160,67,0.18)';e.currentTarget.style.transform='translateY(-2px)';}}
          onMouseLeave={e=>{e.currentTarget.style.background='rgba(253,248,235,0.08)';e.currentTarget.style.transform='none';}}
          >{t('Travel Guide','Anreise')}</a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position:'absolute', bottom:'28px', left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:'6px', zIndex:4, animation:'hFadeIn 1s ease 2s both' }}>
        <span style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.55rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(212,160,67,0.55)' }}>{t('Scroll','Scrollen')}</span>
        <div style={{ width:'1px', height:'44px', background:'linear-gradient(to bottom,rgba(212,160,67,0.5),transparent)', animation:'hFloat 2s ease infinite' }}/>
      </div>

      <style>{`
        @keyframes hFadeUp { from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:none} }
        @keyframes hFadeIn { from{opacity:0}to{opacity:1} }
        @keyframes hFloat  { 0%,100%{transform:translateY(0)}50%{transform:translateY(10px)} }
      `}</style>
    </section>
  );
}