import { useEffect, useState, useRef } from 'react';
import { useLang } from './Langcontext';

export default function Hero() {
  const { t } = useLang();
  const [timeLeft, setTimeLeft] = useState({ days:0, hours:0, minutes:0, seconds:0 });
  const [parallaxY, setParallaxY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const wedding = new Date('2026-12-28T10:00:00');
    const tick = () => {
      const d = wedding.getTime() - Date.now();
      if (d <= 0) return;
      setTimeLeft({ days:Math.floor(d/86400000), hours:Math.floor((d/3600000)%24), minutes:Math.floor((d/60000)%60), seconds:Math.floor((d/1000)%60) });
    };
    tick(); const id = setInterval(tick,1000); return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      if (rect.bottom > 0) setParallaxY(window.scrollY * 0.3);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
      background:'linear-gradient(170deg, #180C04 0%, #3D2010 40%, #2A1608 70%, #0E0703 100%)',
    }}>

      {/* Parallax background layer */}
      <div style={{
        position:'absolute', inset:'-20%',
        transform:`translateY(${parallaxY}px)`,
        transition:'transform 0.05s linear',
        backgroundImage:`
          radial-gradient(ellipse 70% 50% at 25% 35%, rgba(201,150,58,0.09) 0%, transparent 65%),
          radial-gradient(ellipse 50% 40% at 80% 20%, rgba(190,0,39,0.06) 0%, transparent 55%),
          radial-gradient(ellipse 40% 50% at 70% 80%, rgba(45,74,45,0.08) 0%, transparent 55%)
        `,
      }} />

      {/* Animated diagonal lines (savanna grass feel) */}
      <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.04, pointerEvents:'none' }}>
        {Array.from({length:12}).map((_,i) => (
          <line key={i}
            x1={`${i*9}%`} y1="0" x2={`${i*9+20}%`} y2="100%"
            stroke="#C9963A" strokeWidth="0.5"
          />
        ))}
      </svg>

      {/* Dual flag strip — top */}
      <div style={{
        position:'absolute', top:0, left:0, right:0,
        display:'flex', height:'4px',
        animation:'fadeIn 1s ease 2.5s both',
      }}>
        <div style={{ flex:1, background:'#006600' }} />
        <div style={{ flex:1, background:'#BB0000' }} />
        <div style={{ flex:1, background:'#FFFFFF' }} />
        <div style={{ flex:0.15, background:'#3D2B1F' }} />
        <div style={{ flex:1, background:'#000000' }} />
        <div style={{ flex:1, background:'#DD0000' }} />
        <div style={{ flex:1, background:'#FFCC00' }} />
      </div>

      {/* Top ornament */}
      <div style={{
        position:'absolute', top:'5%', left:'50%', transform:'translateX(-50%)',
        color:'rgba(201,150,58,0.25)', fontSize:'clamp(1.5rem,4vw,3rem)',
        letterSpacing:'1.2rem', fontFamily:'serif', userSelect:'none',
        animation:'fadeIn 1.2s ease 1.5s both',
      }}>⟡ ✦ ⟡</div>

      {/* Content */}
      <div style={{
        width:'100%', maxWidth:'780px', margin:'0 auto',
        padding:'110px clamp(20px,5vw,48px) 90px',
        textAlign:'center', position:'relative', zIndex:2, boxSizing:'border-box',
      }}>

        {/* Flags inline */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'0.6rem', marginBottom:'1.5rem', animation:'fadeUp 0.8s ease 0.3s both' }}>
          <div style={{ fontSize:'1.5rem' }}>🇰🇪</div>
          <div style={{ width:'30px', height:'1px', background:'rgba(201,150,58,0.4)' }} />
          <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'0.9rem', color:'rgba(201,150,58,0.7)', letterSpacing:'0.1em' }}>KENYA × DEUTSCHLAND</span>
          <div style={{ width:'30px', height:'1px', background:'rgba(201,150,58,0.4)' }} />
          <div style={{ fontSize:'1.5rem' }}>🇩🇪</div>
        </div>

        {/* Pre-title */}
        <p style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.68rem', letterSpacing:'0.5em', textTransform:'uppercase', color:'rgba(201,150,58,0.85)', marginBottom:'1.4rem', animation:'fadeUp 0.8s ease 0.5s both' }}>
          {t('You are cordially invited', 'Herzliche Einladung')}
        </p>

        {/* Names */}
        <div style={{ animation:'fadeUp 0.9s ease 0.7s both' }}>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(5rem,18vw,10rem)', fontWeight:400, color:'#F5EFE6', lineHeight:0.9, margin:0, textShadow:'0 4px 60px rgba(201,150,58,0.2)' }}>Billy</h1>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(1rem,3vw,1.5rem)', color:'rgba(201,150,58,0.8)', margin:'0.3rem 0', letterSpacing:'0.3em', fontStyle:'italic' }}>&amp;</div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(5rem,18vw,10rem)', fontWeight:400, fontStyle:'italic', color:'#F5EFE6', lineHeight:0.9, margin:0, textShadow:'0 4px 60px rgba(201,150,58,0.2)' }}>Sarah</h1>
        </div>

        {/* Divider */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'0.8rem', margin:'2rem 0', animation:'fadeUp 0.8s ease 0.9s both' }}>
          <div style={{ width:'80px', height:'1px', background:'linear-gradient(90deg,transparent,rgba(201,150,58,0.5))' }} />
          <span style={{ color:'rgba(201,150,58,0.8)', fontSize:'0.85rem' }}>✦</span>
          <div style={{ width:'80px', height:'1px', background:'linear-gradient(90deg,rgba(201,150,58,0.5),transparent)' }} />
        </div>

        {/* Date / venue */}
        <div style={{ animation:'fadeUp 0.8s ease 1s both' }}>
          <p style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(1.1rem,3.5vw,1.7rem)', color:'#F5EFE6', marginBottom:'0.25rem', letterSpacing:'0.05em' }}>
            {t('28th December 2026', '28. Dezember 2026')}
          </p>
          <p style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.72rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(201,150,58,0.8)' }}>
            Eldoret, Kenya
          </p>
        </div>

        {/* Bible verse */}
        <div style={{ margin:'1.8rem auto 0', maxWidth:'440px', padding:'1.1rem 1.6rem', border:'1px solid rgba(201,150,58,0.18)', background:'rgba(255,255,255,0.03)', animation:'fadeUp 0.8s ease 1.1s both' }}>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', color:'rgba(245,239,230,0.75)', fontSize:'0.98rem', lineHeight:1.75, margin:0 }}>
            {t('"Every good and perfect gift is from above."', '"Jede gute Gabe und jedes vollkommene Geschenk kommt von oben."')}
          </p>
          <p style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.62rem', letterSpacing:'0.2em', color:'rgba(201,150,58,0.65)', margin:'0.5rem 0 0' }}>
            — {t('James 1:17', 'Jakobus 1,17')}
          </p>
        </div>

        {/* Countdown */}
        <div style={{ display:'flex', justifyContent:'center', gap:'clamp(1rem,4vw,2.5rem)', flexWrap:'wrap', marginTop:'2.2rem', animation:'fadeUp 0.8s ease 1.2s both' }}>
          {countItems.map(({ v, en, de }) => (
            <div key={en} style={{ textAlign:'center', minWidth:'52px' }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(2.2rem,6vw,3.5rem)', fontWeight:400, color:'#F5EFE6', lineHeight:1, transition:'all 0.3s' }}>
                {String(v).padStart(2,'0')}
              </div>
              <div style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.58rem', letterSpacing:'0.28em', textTransform:'uppercase', color:'rgba(201,150,58,0.65)', marginTop:'0.3rem' }}>
                {t(en, de)}
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap', marginTop:'2.5rem', animation:'fadeUp 0.8s ease 1.4s both' }}>
          <a href="#rsvp" style={{
            padding:'0.9rem 2.5rem', background:'linear-gradient(135deg,#C9963A,#A07520)',
            color:'#FFFCF7', fontFamily:"'Raleway',sans-serif", fontSize:'0.7rem',
            letterSpacing:'0.3em', textTransform:'uppercase', fontWeight:600,
            boxShadow:'0 4px 20px rgba(201,150,58,0.35)',
            transition:'all 0.3s', display:'inline-block',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 30px rgba(201,150,58,0.5)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 4px 20px rgba(201,150,58,0.35)'; }}
          >{t('RSVP Now', 'Jetzt zusagen')}</a>

          <a href="#travel" style={{
            padding:'0.9rem 2.5rem', border:'1px solid rgba(201,150,58,0.55)',
            color:'rgba(201,150,58,0.9)', fontFamily:"'Raleway',sans-serif",
            fontSize:'0.7rem', letterSpacing:'0.3em', textTransform:'uppercase',
            transition:'all 0.3s', display:'inline-block',
          }}
          onMouseEnter={e => { e.currentTarget.style.background='rgba(201,150,58,0.12)'; e.currentTarget.style.transform='translateY(-2px)'; }}
          onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.transform='none'; }}
          >{t('How to get there', 'Anreise')}</a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position:'absolute', bottom:'32px', left:'50%', transform:'translateX(-50%)',
        display:'flex', flexDirection:'column', alignItems:'center', gap:'8px',
        animation:'fadeIn 1s ease 2s both',
        zIndex:2,
      }}>
        <span style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.58rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(201,150,58,0.55)' }}>
          {t('Scroll', 'Scrollen')}
        </span>
        <div style={{ width:'1px', height:'50px', background:'linear-gradient(to bottom,rgba(201,150,58,0.5),transparent)', animation:'floatUp 2s ease infinite' }} />
      </div>

      {/* Fade to next section */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'120px', background:'linear-gradient(to top,#FAF6EF,transparent)', pointerEvents:'none', zIndex:3 }} />

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(28px) } to { opacity:1; transform:translateY(0) } }
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes floatUp { 0%,100%{transform:translateY(0)} 50%{transform:translateY(12px)} }
      `}</style>
    </section>
  );
}