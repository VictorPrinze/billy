// ─── Gallery ────────────────────────────────────────────────────────────────
import { useState } from 'react';
import { useLang } from './Langcontext';
import ProgressiveImage, { getWebPPaths, PHOTO_POSITIONS } from './Progressiveimage';

const ALL_PHOTOS = [
  { file:'DSC05281.JPG',  label:'Billy & Sarah',   caption:{ en:'Together always',           de:'Immer zusammen' } },
  { file:'DSC05285.JPG',  label:'Our Story',        caption:{ en:'Where it all began',         de:'Wo alles begann' } },
  { file:'DSC05402.JPG',  label:'In Love',          caption:{ en:'Two hearts, one soul',       de:'Zwei Herzen, eine Seele' } },
  { file:'DSC05406.JPG',  label:'Pure Joy',         caption:{ en:'Happiness looks like this',  de:'So sieht Glück aus' } },
  { file:'DSC05411.JPG',  label:'Special Moment',   caption:{ en:'A moment frozen in time',    de:'Ein unvergesslicher Moment' } },
  { file:'DSC05415.JPG',  label:'The Proposal',     caption:{ en:'The beginning of forever',   de:'Der Beginn der Ewigkeit' } },
  { file:'DSC05417.JPG',  label:'Just Us',          caption:{ en:'You and me, always',         de:'Du und ich, immer' } },
  { file:'DSC05433.JPG',  label:'Our Engagement',   caption:{ en:'He asked, she said yes 😊',  de:'Er fragte, sie sagte Ja 😊' } },
  { file:'DSC05442.JPG',  label:'Our Journey',      caption:{ en:'Every step together',        de:'Jeden Schritt gemeinsam' } },
  { file:'DSC05443.JPG',  label:'Love Story',       caption:{ en:'Kenya meets Deutschland',    de:'Kenia trifft Deutschland' } },
  { file:'image8.JPG',    label:'Adventure',        caption:{ en:'Life is better together',    de:'Das Leben ist besser zusammen' } },
  { file:'DSC05466.JPG',  label:'Forever',          caption:{ en:'And so the adventure begins',de:'Das Abenteuer beginnt' } },
  { file:'image1.JPG',    label:'Sweet Moments',    caption:{ en:'Every moment with you',      de:'Jeder Moment mit dir' } },
  { file:'image2.JPG',    label:'Beautiful Day',    caption:{ en:'Days like these',            de:'Solche Tage' } },
  { file:'image3.JPG',    label:'Our Light',        caption:{ en:'You are my sunshine',        de:'Du bist mein Sonnenschein' } },
  { file:'image4.JPG',    label:'Bliss',            caption:{ en:'Pure happiness',             de:'Reines Glück' } },
  { file:'image5.JPG',    label:'My Person',        caption:{ en:'Found my person',            de:'Mein Mensch gefunden' } },
  { file:'image7.JPG',    label:'Close to You',     caption:{ en:'Home is wherever you are',   de:'Zuhause ist, wo du bist' } },
  { file:'image8.JPG',    label:'Love',             caption:{ en:'This is love',               de:'Das ist Liebe' } },
];

// Desktop masonry layout — 19 photos, 3 cols, varied heights
const MASONRY = [
  { idx:0,  col:'1',        row:'span 2' }, // tall
  { idx:1,  col:'2',        row:'span 1' },
  { idx:2,  col:'3',        row:'span 2' }, // tall
  { idx:3,  col:'2',        row:'span 1' },
  { idx:4,  col:'1',        row:'span 1' },
  { idx:5,  col:'3',        row:'span 1' },
  { idx:6,  col:'1 / span 2', row:'span 1' }, // wide
  { idx:7,  col:'3',        row:'span 1' },
  { idx:8,  col:'1',        row:'span 1' },
  { idx:9,  col:'2',        row:'span 2' }, // tall
  { idx:10, col:'1 / span 2', row:'span 1' },  // DSC05449 landscape — needs wide slot
  { idx:11, col:'1',        row:'span 1' },
  { idx:12, col:'3',        row:'span 1' },
  { idx:13, col:'1 / span 3', row:'span 1' }, // full width panoramic
  { idx:14, col:'1',        row:'span 2' }, // tall
  { idx:15, col:'2',        row:'span 1' },
  { idx:16, col:'3',        row:'span 2' }, // tall
  { idx:17, col:'2',        row:'span 1' },
  { idx:18, col:'1 / span 1', row:'span 1' },
];

export function Gallery() {
  const { t, lang } = useLang();
  const [lightbox, setLightbox] = useState<number|null>(null);
  const [hovered, setHovered]   = useState<number|null>(null);

  const prev = () => setLightbox(i => i !== null ? (i - 1 + ALL_PHOTOS.length) % ALL_PHOTOS.length : null);
  const next = () => setLightbox(i => i !== null ? (i + 1) % ALL_PHOTOS.length : null);

  // Keyboard nav
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft')  prev();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'Escape')     setLightbox(null);
  };

  return (
    <>
      <section id="gallery" style={{ background:'#FBF7EE', padding:'clamp(3rem,8vw,7rem) 0', overflow:'hidden' }}>
        <div style={{ maxWidth:'1280px', margin:'0 auto', padding:'0 clamp(16px,4vw,40px)', boxSizing:'border-box' }}>

          {/* Header */}
          <div className="reveal" style={{ textAlign:'center', marginBottom:'clamp(2rem,5vw,3.5rem)' }}>
            <span style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.68rem', letterSpacing:'0.45em', textTransform:'uppercase', color:'#D4A043', display:'block', marginBottom:'0.6rem' }}>
              {t('Our Memories','Unsere Erinnerungen','Kumbukumbu Zetu')}
            </span>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(2rem,5vw,3.8rem)', fontWeight:400, color:'#5C3D22', margin:'0 0 0.5rem' }}>
              {t('Photo Gallery','Fotogalerie','Picha Zetu')}
            </h2>
            <p style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.82rem', color:'#9A7050', maxWidth:'440px', margin:'0.6rem auto 0', lineHeight:1.85 }}>
              {t('Click any photo to view in full — swipe or use arrows to browse','Auf ein Foto klicken zum Vergrößern — Pfeiltasten zum Blättern','Bonyeza picha kuona kikamilifu — tumia mishale kuvinjari')}
            </p>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'0.8rem', marginTop:'1rem' }}>
              <div style={{ width:'55px', height:'1px', background:'linear-gradient(90deg,transparent,#D4A043)' }}/>
              <span style={{ color:'#D4A043', fontSize:'0.75rem' }}>✦</span>
              <div style={{ width:'55px', height:'1px', background:'linear-gradient(90deg,#D4A043,transparent)' }}/>
            </div>
          </div>

          {/* ── Desktop masonry grid ── */}
          <div className="gal-desktop" style={{
            display:'grid',
            gridTemplateColumns:'repeat(3,1fr)',
            gridAutoRows:'180px',
            gap:'8px',
          }}>
            {MASONRY.map(({ idx, col, row }) => {
              const p = ALL_PHOTOS[idx];
              return (
                <div key={idx}
                  onMouseEnter={() => setHovered(idx)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => setLightbox(idx)}
                  style={{
                    gridColumn: col, gridRow: row,
                    position:'relative', overflow:'hidden',
                    cursor:'pointer',
                    transition:'transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.45s',
                    transform: hovered===idx ? 'scale(1.02)' : 'scale(1)',
                    boxShadow: hovered===idx ? '0 16px 48px rgba(92,61,34,0.22)' : '0 2px 8px rgba(92,61,34,0.08)',
                  }}
                >
                  <ProgressiveImage
                    {...getWebPPaths(p.file)}
                    alt={p.label}
                    position={PHOTO_POSITIONS[p.file] || 'center'}
                    style={{
                      width:'100%', height:'100%',
                      transition:'transform 0.6s ease',
                      transform: hovered===idx ? 'scale(1.06)' : 'scale(1)',
                    }}
                  />
                  {/* Warm tint overlay always */}
                  <div style={{ position:'absolute', inset:0, background:'rgba(255,248,235,0.04)', pointerEvents:'none' }}/>
                  {/* Hover reveal */}
                  <div style={{
                    position:'absolute', inset:0,
                    background:'linear-gradient(to top, rgba(20,8,2,0.75) 0%, rgba(20,8,2,0.15) 50%, transparent 100%)',
                    opacity: hovered===idx ? 1 : 0,
                    transition:'opacity 0.35s',
                    display:'flex', flexDirection:'column',
                    justifyContent:'flex-end', padding:'1.2rem',
                    pointerEvents:'none',
                  }}>
                    <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'0.95rem', color:'#FDF8EB', fontWeight:500 }}>{p.label}</div>
                    <div style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.65rem', color:'rgba(212,160,67,0.85)', marginTop:'0.25rem', letterSpacing:'0.08em' }}>
                      {lang==='en' ? p.caption.en : p.caption.de}
                    </div>
                    <div style={{ display:'flex', alignItems:'center', gap:'6px', marginTop:'0.5rem' }}>
                      <div style={{ width:'16px', height:'1px', background:'rgba(212,160,67,0.6)' }}/>
                      <span style={{ fontSize:'0.55rem', color:'rgba(212,160,67,0.7)', letterSpacing:'0.2em', textTransform:'uppercase' }}>View</span>
                    </div>
                  </div>
                  {/* Photo number badge */}
                  <div style={{ position:'absolute', top:'10px', right:'10px', width:'22px', height:'22px', borderRadius:'50%', background:'rgba(212,160,67,0.9)', display:'flex', alignItems:'center', justifyContent:'center', opacity: hovered===idx ? 1 : 0, transition:'opacity 0.3s' }}>
                    <span style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.55rem', color:'#fff', fontWeight:700 }}>{idx+1}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Mobile 2-col grid ── */}
          <div className="gal-mobile" style={{ display:'none', gridTemplateColumns:'1fr 1fr', gap:'6px' }}>
            {ALL_PHOTOS.map((p, i) => (
              <div key={i}
                onClick={() => setLightbox(i)}
                style={{
                  height: i === 0 ? '220px' : '160px',
                  gridColumn: i === 0 ? '1 / span 2' : 'auto',
                  position:'relative', overflow:'hidden', cursor:'pointer',
                }}
              >
                <ProgressiveImage
                  {...getWebPPaths(p.file)}
                  alt={p.label}
                  position={PHOTO_POSITIONS[p.file] || 'center'}
                  style={{ width:'100%', height:'100%' }}
                />
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(20,8,2,0.5),transparent)', display:'flex', alignItems:'flex-end', padding:'0.8rem' }}>
                  <span style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.62rem', color:'rgba(253,248,235,0.9)', letterSpacing:'0.1em' }}>{p.label}</span>
                </div>
              </div>
            ))}
          </div>

          {/* View all counter */}
          <div style={{ textAlign:'center', marginTop:'1.5rem' }}>
            <span style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.65rem', letterSpacing:'0.25em', textTransform:'uppercase', color:'rgba(155,115,75,0.6)' }}>
              {t(`${ALL_PHOTOS.length} photographs`, `${ALL_PHOTOS.length} Fotografien`, `Picha ${ALL_PHOTOS.length}`)} · {t('Click to open gallery','Zum Öffnen klicken','Bonyeza kufungua')}
            </span>
          </div>
        </div>
      </section>

      {/* ── Lightbox ── */}
      {lightbox !== null && (
        <div
          tabIndex={0} onKeyDown={onKey}
          ref={el => el?.focus()}
          onClick={e => { if (e.target === e.currentTarget) setLightbox(null); }}
          style={{
            position:'fixed', inset:0, zIndex:9000,
            background:'rgba(12,5,1,0.96)',
            display:'flex', flexDirection:'column',
            alignItems:'center', justifyContent:'center',
            animation:'lbFadeIn 0.3s ease',
            outline:'none',
          }}
        >
          {/* Close */}
          <button onClick={() => setLightbox(null)} style={{
            position:'absolute', top:'20px', right:'24px',
            background:'none', border:'1px solid rgba(212,160,67,0.3)',
            color:'rgba(212,160,67,0.8)', fontSize:'1.1rem',
            width:'40px', height:'40px', cursor:'pointer',
            display:'flex', alignItems:'center', justifyContent:'center',
            transition:'all 0.25s', borderRadius:0,
          }}
          onMouseEnter={e=>{e.currentTarget.style.background='rgba(212,160,67,0.12)';}}
          onMouseLeave={e=>{e.currentTarget.style.background='none';}}
          >✕</button>

          {/* Counter */}
          <div style={{ position:'absolute', top:'24px', left:'50%', transform:'translateX(-50%)', fontFamily:"'Raleway',sans-serif", fontSize:'0.62rem', letterSpacing:'0.3em', color:'rgba(212,160,67,0.55)', textTransform:'uppercase' }}>
            {lightbox + 1} / {ALL_PHOTOS.length}
          </div>

          {/* Prev arrow */}
          <button onClick={prev} style={{
            position:'absolute', left:'clamp(8px,3vw,28px)', top:'50%', transform:'translateY(-50%)',
            background:'none', border:'1px solid rgba(212,160,67,0.25)',
            color:'rgba(212,160,67,0.7)', fontSize:'1.2rem',
            width:'44px', height:'44px', cursor:'pointer',
            display:'flex', alignItems:'center', justifyContent:'center',
            transition:'all 0.25s', borderRadius:0, zIndex:2,
          }}
          onMouseEnter={e=>{e.currentTarget.style.background='rgba(212,160,67,0.12)'; e.currentTarget.style.borderColor='rgba(212,160,67,0.6)';}}
          onMouseLeave={e=>{e.currentTarget.style.background='none'; e.currentTarget.style.borderColor='rgba(212,160,67,0.25)';}}
          >‹</button>

          {/* Main image */}
          <div style={{ maxWidth:'min(90vw,900px)', maxHeight:'80vh', position:'relative', animation:'lbScaleIn 0.3s ease' }}>
            <img
              src={`/images/webp/${ALL_PHOTOS[lightbox].file.replace(/\.[^.]+$/, '.webp')}`}
              alt={ALL_PHOTOS[lightbox].label}
              style={{ maxWidth:'100%', maxHeight:'78vh', objectFit:'contain', display:'block', boxShadow:'0 24px 80px rgba(0,0,0,0.6)' }}
            />
            {/* Caption */}
            <div style={{ marginTop:'1rem', textAlign:'center' }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.1rem', color:'#FDF8EB', fontWeight:400 }}>
                {ALL_PHOTOS[lightbox].label}
              </div>
              <div style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.68rem', color:'rgba(212,160,67,0.65)', marginTop:'0.3rem', letterSpacing:'0.15em' }}>
                {lang==='en' ? ALL_PHOTOS[lightbox].caption.en : ALL_PHOTOS[lightbox].caption.de}
              </div>
            </div>
          </div>

          {/* Next arrow */}
          <button onClick={next} style={{
            position:'absolute', right:'clamp(8px,3vw,28px)', top:'50%', transform:'translateY(-50%)',
            background:'none', border:'1px solid rgba(212,160,67,0.25)',
            color:'rgba(212,160,67,0.7)', fontSize:'1.2rem',
            width:'44px', height:'44px', cursor:'pointer',
            display:'flex', alignItems:'center', justifyContent:'center',
            transition:'all 0.25s', borderRadius:0, zIndex:2,
          }}
          onMouseEnter={e=>{e.currentTarget.style.background='rgba(212,160,67,0.12)'; e.currentTarget.style.borderColor='rgba(212,160,67,0.6)';}}
          onMouseLeave={e=>{e.currentTarget.style.background='none'; e.currentTarget.style.borderColor='rgba(212,160,67,0.25)';}}
          >›</button>

          {/* Dot strip */}
          <div style={{ position:'absolute', bottom:'20px', display:'flex', gap:'6px' }}>
            {ALL_PHOTOS.map((_,i) => (
              <button key={i} onClick={() => setLightbox(i)} style={{
                width: i===lightbox ? '20px' : '6px',
                height:'6px', borderRadius:'10px',
                background: i===lightbox ? '#D4A043' : 'rgba(212,160,67,0.3)',
                border:'none', padding:0, cursor:'pointer',
                transition:'all 0.3s',
              }}/>
            ))}
          </div>
        </div>
      )}

      <style>{`
        .gal-desktop { display: grid !important; }
        .gal-mobile  { display: none !important; }
        @media (max-width: 640px) {
          .gal-desktop { display: none !important; }
          .gal-mobile  { display: grid !important; }
        }
        @keyframes lbFadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes lbScaleIn { from{opacity:0;transform:scale(0.94)} to{opacity:1;transform:scale(1)} }
      `}</style>
    </>
  );
}


// ─── RSVP ────────────────────────────────────────────────────────────────────
import { useState as useStateRSVP } from 'react';
import type { CSSProperties } from 'react';
import { submitRSVP } from '../lib/supabase';

const iStyle: CSSProperties = {
  width:'100%', padding:'0.85rem 1.1rem',
  border:'1px solid rgba(92,61,34,0.18)',
  background:'rgba(255,252,245,0.9)',
  fontFamily:"'Raleway',sans-serif", fontSize:'0.88rem', color:'#5C3D22',
  outline:'none', transition:'border-color 0.3s, box-shadow 0.3s',
  borderRadius:0, boxSizing:'border-box',
  WebkitAppearance:'none', appearance:'none',
};
const lStyle: CSSProperties = {
  fontFamily:"'Raleway',sans-serif", fontSize:'0.65rem', letterSpacing:'0.28em',
  textTransform:'uppercase', color:'#8B6040', display:'block', marginBottom:'0.45rem',
};

export function RSVP() {
  const { t, lang } = useLang();
  const [form, setForm] = useStateRSVP({ name:'', email:'', phone:'', guests:'1', attendance:'', meal:'', language:'', message:'' });
  const [errors, setErrors] = useStateRSVP<Record<string,string>>({});
  const [submitted, setSubmitted] = useStateRSVP(false);

  const change = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(p=>({...p,[name]:value}));
    setErrors(p=>({...p,[name]:''}));
  };

  const submit = async () => {
    const errs: Record<string,string> = {};
    if (!form.name.trim())  errs.name = t('Required','Pflichtfeld');
    if (!form.email.trim()) errs.email = t('Required','Pflichtfeld');
    if (!form.attendance)   errs.attendance = t('Required','Pflichtfeld');
    if (Object.keys(errs).length) { setErrors(errs); return; }

    try {
      // Save to Supabase
      await submitRSVP({
        name:       form.name,
        email:      form.email,
        phone:      form.phone,
        guests:     parseInt(form.guests) || 1,
        attendance: form.attendance,
        meal:       form.meal,
        language:   form.language,
        message:    form.message,
      });

      setSubmitted(true);
    } catch (err) {
      console.error('RSVP submission failed:', err);
      alert(t('Something went wrong. Please try again.', 'Etwas ist schiefgelaufen. Bitte versuche es erneut.', 'Hitilafu imetokea. Tafadhali jaribu tena.'));
    }
  };

  if (submitted) return (
    <section id="rsvp" style={{ position:'relative', overflow:'hidden', minHeight:'60vh', display:'flex', alignItems:'center' }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:'url(/images/webp/DSC05417.webp)', backgroundSize:'cover', backgroundPosition:'center' }}/>
      <div style={{ position:'absolute', inset:0, background:'rgba(20,8,2,0.82)' }}/>
      <div style={{ maxWidth:'600px', margin:'0 auto', padding:'clamp(4rem,10vw,8rem) 24px', textAlign:'center', boxSizing:'border-box', position:'relative', zIndex:1 }}>
        <div style={{ fontSize:'3.5rem', marginBottom:'1rem', animation:'scaleIn 0.6s ease' }}>✦</div>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(2rem,6vw,3.5rem)', fontWeight:400, color:'#FDF8EB', marginBottom:'1rem' }}>
          {t(`Thank you, ${form.name}!`,`Danke, ${form.name}!`,`Asante, ${form.name}!`)}
        </h2>
        <p style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.88rem', color:'rgba(253,248,235,0.65)', lineHeight:1.9, margin:'0 auto 1.5rem', maxWidth:'380px' }}>
          {t("We've received your RSVP and can't wait to celebrate with you on 28 December 2026.","Wir haben deine Antwort erhalten und freuen uns auf die Feier am 28. Dezember 2026.")}
        </p>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'0.8rem', marginBottom:'1rem' }}>
          <div style={{ width:'40px', height:'1px', background:'rgba(212,160,67,0.4)' }}/>
          <span style={{ fontSize:'1.2rem' }}>🇰🇪</span>
          <span style={{ color:'rgba(212,160,67,0.6)', fontSize:'0.8rem' }}>✦</span>
          <span style={{ fontSize:'1.2rem' }}>🇩🇪</span>
          <div style={{ width:'40px', height:'1px', background:'rgba(212,160,67,0.4)' }}/>
        </div>
        <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', color:'rgba(212,160,67,0.75)', fontSize:'1.1rem', lineHeight:1.7 }}>
          {t('"I have found the one whom my soul loves."','"Ich habe gefunden, den meine Seele liebt."','"Nimempata anayependwa na nafsi yangu."')}
        </p>
      </div>
    </section>
  );

  return (
    <section id="rsvp" style={{ position:'relative', overflow:'hidden' }}>
      {/* Photo background */}
      <div style={{ position:'absolute', inset:0, backgroundImage:'url(/images/webp/DSC05466.webp)', backgroundSize:'cover', backgroundPosition:'center top' }}/>
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(105deg, rgba(20,8,2,0.88) 0%, rgba(20,8,2,0.75) 50%, rgba(20,8,2,0.55) 100%)' }}/>

      <div style={{ maxWidth:'1150px', margin:'0 auto', padding:'clamp(3.5rem,8vw,7rem) clamp(16px,4vw,48px)', boxSizing:'border-box', position:'relative', zIndex:1 }}>
        <div className="rsvp-layout">

          {/* Left — text on photo */}
          <div className="rsvp-left">
            <span style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.68rem', letterSpacing:'0.45em', textTransform:'uppercase', color:'#D4A043', display:'block', marginBottom:'0.7rem' }}>
              {t('Join the Celebration','Dabei sein','Jiunge na Sherehe')}
            </span>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(2rem,5vw,3.6rem)', fontWeight:400, color:'#FDF8EB', margin:'0 0 1rem', lineHeight:1.08 }}>
              {t('Celebrate Our Love With Us','Feiert unsere Liebe mit uns','Sherehekea Upendo Wetu Nasi')}
            </h2>
            <div style={{ width:'44px', height:'2px', background:'#D4A043', marginBottom:'1.5rem' }}/>
            <p style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.88rem', color:'rgba(253,248,235,0.65)', lineHeight:1.9, marginBottom:'2rem' }}>
              {t(
                'Please RSVP by November 28th, 2026. We would be deeply honored to have you witness our union in Eldoret, Kenya.',
                'Bitte bis zum 28. November 2026 zusagen. Wir freuen uns sehr, wenn du dabei sein kannst.'
              )}
            </p>
            <blockquote style={{ borderLeft:'2px solid rgba(212,160,67,0.4)', paddingLeft:'1.3rem', margin:'0 0 2rem' }}>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', color:'rgba(253,248,235,0.72)', fontSize:'1.08rem', lineHeight:1.75, margin:0 }}>
                {t('"He who finds a wife finds what is good and receives favor from the Lord."','"Wer eine Frau gefunden hat, hat etwas Gutes gefunden."','"Mtu apatapo mke, anapata kitu kizuri na kupata kibali kwa Bwana."')}
              </p>
              <cite style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.65rem', letterSpacing:'0.15em', color:'rgba(212,160,67,0.65)', marginTop:'0.5rem', display:'block', fontStyle:'normal' }}>
                — {t('Proverbs 18:22','Sprüche 18,22','Mithali 18:22')}
              </cite>
            </blockquote>

            {/* Stats row */}
            <div style={{ display:'flex', gap:'2rem', flexWrap:'wrap' }}>
              {[
                { n:'28', label:{ en:'Dec 2026', de:'Dez 2026' } },
                { n:'3',  label:{ en:'Events',   de:'Feiern' } },
                { n:'2',  label:{ en:'Nations',  de:'Nationen' } },
              ].map(s => (
                <div key={s.n}>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'2.2rem', color:'#D4A043', fontWeight:400, lineHeight:1 }}>{s.n}</div>
                  <div style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.62rem', letterSpacing:'0.22em', textTransform:'uppercase', color:'rgba(253,248,235,0.45)', marginTop:'0.2rem' }}>
                    {lang==='en' ? s.label.en : s.label.de}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form card */}
          <div>
            <div style={{
              background:'rgba(255,252,245,0.97)',
              backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)',
              padding:'clamp(1.5rem,4vw,2.5rem)',
              boxShadow:'0 24px 80px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.1)',
              borderTop:'3px solid #D4A043',
            }}>
              {/* Form header */}
              <div style={{ marginBottom:'1.5rem', paddingBottom:'1rem', borderBottom:'1px solid rgba(92,61,34,0.1)' }}>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.3rem', color:'#5C3D22', marginBottom:'0.2rem' }}>
                  {t('Your RSVP','Ihre Antwort','Jibu Lako')}
                </div>
                <p style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.72rem', color:'#9A7050', margin:0, letterSpacing:'0.05em' }}>
                  {t('Deadline: 28 November 2026','Frist: 28. November 2026','Mwisho: 28 Novemba 2026')}
                </p>
              </div>

              <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
                {[
                  { name:'name',  label:{en:'Full Name *',de:'Vollständiger Name *',sw:'Jina Kamili *'}, type:'text', ph:{en:'Your full name',de:'Dein vollständiger Name',sw:'Jina lako kamili'} },
                  { name:'email', label:{en:'Email *',de:'E-Mail *',sw:'Barua Pepe *'},                  type:'email',ph:{en:'your@email.com',de:'deine@email.de',sw:'barua@pepe.yako'} },
                  { name:'phone', label:{en:'WhatsApp / Phone',de:'WhatsApp / Telefon',sw:'WhatsApp / Simu'},type:'tel',ph:{en:'+49 or +254…',de:'+49 oder +254…',sw:'+254 au +49…'} },
                ].map(f => (
                  <div key={f.name}>
                    <label style={lStyle}>{lang==='sw'?f.label.sw:lang==='de'?f.label.de:f.label.en}</label>
                    <input name={f.name} type={f.type} value={(form as any)[f.name]} onChange={change}
                      placeholder={lang==='sw'?f.ph.sw:lang==='de'?f.ph.de:f.ph.en}
                      style={{...iStyle, borderColor:errors[f.name]?'#BB0000':'rgba(92,61,34,0.18)'}}
                    />
                    {errors[f.name] && <p style={{color:'#BB0000',fontSize:'0.68rem',margin:'0.2rem 0 0',fontFamily:"'Raleway',sans-serif"}}>{errors[f.name]}</p>}
                  </div>
                ))}

                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
                  <div>
                    <label style={lStyle}>{t('Guests','Gäste','Wageni')}</label>
                    <select name="guests" value={form.guests} onChange={change} style={iStyle}>
                      {['1','2','3','4','5+'].map(n=><option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={lStyle}>{t('Attending? *','Dabei? *','Utakuwepo? *')}</label>
                    <select name="attendance" value={form.attendance} onChange={change}
                      style={{...iStyle,borderColor:errors.attendance?'#BB0000':'rgba(92,61,34,0.18)'}}>
                      <option value="">{t('Select…','Auswählen…','Chagua…')}</option>
                      <option value="yes">{t('Joyfully yes 🎉','Ja, gerne 🎉','Ndiyo kwa furaha 🎉')}</option>
                      <option value="no">{t('Regretfully no','Leider nein','Samahani, hapana')}</option>
                      <option value="maybe">{t('Will confirm soon','Bestätige noch','Nitathibitisha hivi karibuni')}</option>
                    </select>
                    {errors.attendance && <p style={{color:'#BB0000',fontSize:'0.68rem',margin:'0.2rem 0 0',fontFamily:"'Raleway',sans-serif"}}>{errors.attendance}</p>}
                  </div>
                </div>

                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
                  <div>
                    <label style={lStyle}>{t('Meal','Mahlzeit','Chakula')}</label>
                    <select name="meal" value={form.meal} onChange={change} style={iStyle}>
                      <option value="">{t('Select…','Auswählen…','Chagua…')}</option>
                      <option value="standard">Standard</option>
                      <option value="vegetarian">{t('Vegetarian','Vegetarisch','Mboga tu')}</option>
                      <option value="vegan">Vegan</option>
                      <option value="halal">Halal</option>
                    </select>
                  </div>
                  <div>
                    <label style={lStyle}>{t('Language','Sprache','Lugha')}</label>
                    <select name="language" value={form.language} onChange={change} style={iStyle}>
                      <option value="">{t('Select…','Auswählen…','Chagua…')}</option>
                      <option value="en">English</option>
                      <option value="de">Deutsch</option>
                      <option value="sw">Kiswahili</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={lStyle}>{t('Message for Billy & Sarah','Nachricht ans Brautpaar','Ujumbe kwa Billy na Sarah')}</label>
                  <textarea name="message" value={form.message} onChange={change} rows={3}
                    placeholder={t('A blessing, wish, or special message…','Ein Segen oder eine besondere Nachricht…','Baraka, dua, au ujumbe maalum…')}
                    style={{...iStyle, resize:'vertical'}}
                  />
                </div>

                <button onClick={submit} style={{
                  width:'100%', padding:'1rem',
                  background:'linear-gradient(135deg,#D4A043,#A87825)',
                  color:'#FFFCF5', border:'none',
                  fontFamily:"'Raleway',sans-serif", fontSize:'0.72rem',
                  letterSpacing:'0.32em', textTransform:'uppercase', fontWeight:600,
                  cursor:'pointer', transition:'all 0.3s',
                  boxShadow:'0 4px 20px rgba(212,160,67,0.35)',
                }}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='0 8px 32px rgba(212,160,67,0.5)';}}
                onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='0 4px 20px rgba(212,160,67,0.35)';}}
                >{t('Send RSVP  ✦','RSVP senden  ✦','Tuma Jibu  ✦')}</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .rsvp-layout { display:grid; grid-template-columns:1fr 1.05fr; gap:clamp(2rem,5vw,5rem); align-items:center; }
        @media (max-width:800px) {
          .rsvp-layout { grid-template-columns:1fr; }
          .rsvp-left { margin-bottom: 1rem; }
        }
      `}</style>
    </section>
  );
}


// ─── Footer ──────────────────────────────────────────────────────────────────
export function Footer() {
  const { t } = useLang();

  const links = [
    {en:'Home',de:'Start',href:'#home'},
    {en:'Our Story',de:'Geschichte',href:'#story'},
    {en:'Events',de:'Ablauf',href:'#events'},
    {en:'Travel',de:'Anreise',href:'#travel'},
    {en:'Gallery',de:'Galerie',href:'#gallery'},
    {en:'RSVP',de:'RSVP',href:'#rsvp'},
  ];

  return (
    <footer style={{ position:'relative', overflow:'hidden' }}>
      {/* Photo background */}
      <div style={{ position:'absolute', inset:0, backgroundImage:'url(/images/webp/DSC05406.webp)', backgroundSize:'cover', backgroundPosition:'center' }}/>
      <div style={{ position:'absolute', inset:0, background:'rgba(10,4,1,0.9)' }}/>

      <div style={{ position:'relative', zIndex:1, maxWidth:'960px', margin:'0 auto', padding:'clamp(3.5rem,7vw,6rem) clamp(16px,4vw,40px) clamp(1.5rem,3vw,2.5rem)', textAlign:'center', boxSizing:'border-box' }}>

        {/* Top ornament line */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'1rem', marginBottom:'2.5rem' }}>
          <div style={{ flex:1, height:'1px', background:'linear-gradient(90deg,transparent,rgba(212,160,67,0.2))' }}/>
          <span style={{ fontSize:'1.6rem' }}>🇰🇪</span>
          <span style={{ color:'rgba(212,160,67,0.4)', fontSize:'0.9rem' }}>✦</span>
          <span style={{ fontSize:'1.6rem' }}>🇩🇪</span>
          <div style={{ flex:1, height:'1px', background:'linear-gradient(270deg,transparent,rgba(212,160,67,0.2))' }}/>
        </div>

        <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(2rem,6vw,3.2rem)', fontWeight:400, color:'#FDF8EB', marginBottom:'0.3rem', letterSpacing:'-0.01em' }}>
          Billy <span style={{ fontStyle:'italic', color:'#D4A043' }}>&</span> Sarah
        </div>
        <div style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.65rem', letterSpacing:'0.4em', textTransform:'uppercase', color:'rgba(212,160,67,0.5)', marginBottom:'2.5rem' }}>
          28 · December · 2026 · Eldoret, Kenya
        </div>

        <nav>
          <div style={{ display:'flex', justifyContent:'center', flexWrap:'wrap', gap:'0.1rem 0.4rem', marginBottom:'2.5rem' }}>
            {links.map(l => (
              <a key={l.href} href={l.href} style={{
                fontFamily:"'Raleway',sans-serif", fontSize:'0.65rem', letterSpacing:'0.22em',
                textTransform:'uppercase', color:'rgba(253,248,235,0.3)',
                padding:'0.35rem 0.6rem', transition:'color 0.3s',
              }}
              onMouseEnter={e=>e.currentTarget.style.color='rgba(212,160,67,0.85)'}
              onMouseLeave={e=>e.currentTarget.style.color='rgba(253,248,235,0.3)'}
              >{t(l.en,l.de)}</a>
            ))}
          </div>
        </nav>

        <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'1rem', color:'rgba(253,248,235,0.3)', maxWidth:'460px', margin:'0 auto 2rem', lineHeight:1.8 }}>
          {t('"Many waters cannot quench love; rivers cannot sweep it away."','"Viele Wasser können die Liebe nicht auslöschen."','"Maji mengi hayawezi kuzima upendo; mito haiwezi kuufunika."')}
          <span style={{ display:'block', fontFamily:"'Raleway',sans-serif", fontSize:'0.6rem', fontStyle:'normal', letterSpacing:'0.18em', color:'rgba(212,160,67,0.4)', marginTop:'0.4rem' }}>
            — {t('Song of Solomon 8:7','Hoheslied 8,7','Wimbo wa Sulemani 8:7')}
          </span>
        </p>

        <div style={{ height:'1px', background:'rgba(212,160,67,0.08)', marginBottom:'2rem' }}/>

        {/* Mungu Ni Mwema — closing blessing */}
        <div style={{ marginBottom:'1.8rem' }}>
          <p style={{
            fontFamily:"'Playfair Display',serif",
            fontSize:'clamp(1.2rem,3vw,1.8rem)',
            fontWeight:400,
            color:'rgba(212,160,67,0.8)',
            margin:'0 0 0.3rem',
            letterSpacing:'0.05em',
          }}>
            Mungu Ni Mwema
          </p>
          <p style={{
            fontFamily:"'Raleway',sans-serif",
            fontSize:'0.62rem',
            letterSpacing:'0.3em',
            textTransform:'uppercase',
            color:'rgba(253,248,235,0.25)',
            margin:0,
          }}>
            God Is Good · Gott Ist Gut
          </p>
        </div>

        <div style={{ height:'1px', background:'rgba(212,160,67,0.08)', marginBottom:'1.5rem' }}/>

        <p style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.58rem', letterSpacing:'0.15em', color:'rgba(253,248,235,0.15)', margin:0 }}>
          © 2026 Billy &amp; Sarah · Made with ♥ · Kenya × Deutschland
        </p>
      </div>
    </footer>
  );
}