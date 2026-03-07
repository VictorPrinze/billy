// ─── Gallery ───────────────────────────────────────────────────
import { useState } from 'react';
import { useLang } from './Langcontext';

const SLOTS = [
  { id:1, label:'Billy & Sarah',     col:'span 1', row:'span 2', bg:'linear-gradient(160deg,#C9963A 0%,#7A5030 100%)' },
  { id:2, label:'Our Engagement',    col:'span 2', row:'span 1', bg:'linear-gradient(160deg,#3D2B1F 0%,#7A5038 100%)' },
  { id:3, label:'Together',          col:'span 1', row:'span 1', bg:'linear-gradient(160deg,#D4B870 0%,#A07840 100%)' },
  { id:4, label:'Special Moment',    col:'span 1', row:'span 1', bg:'linear-gradient(160deg,#5A3820 0%,#9A7040 100%)' },
  { id:5, label:'The Proposal',      col:'span 1', row:'span 2', bg:'linear-gradient(160deg,#B08860 0%,#6A4828 100%)' },
  { id:6, label:'Our Journey',       col:'span 2', row:'span 1', bg:'linear-gradient(160deg,#8A6040 0%,#C8A060 100%)' },
];

export function Gallery() {
  const { t } = useLang();
  const [hovered, setHovered] = useState<number|null>(null);

  return (
    <section id="gallery" style={{ background:'#F5F0E8', padding:'clamp(3rem,8vw,7rem) 0' }}>
      <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'0 clamp(16px,4vw,48px)', boxSizing:'border-box' }}>

        <div className="reveal" style={{ textAlign:'center', marginBottom:'clamp(2rem,5vw,3.5rem)' }}>
          <span style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.68rem', letterSpacing:'0.45em', textTransform:'uppercase', color:'#C9963A', display:'block', marginBottom:'0.6rem' }}>
            {t('Our Memories', 'Unsere Erinnerungen')}
          </span>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(2rem,5vw,3.8rem)', fontWeight:400, color:'#3D2B1F', margin:0 }}>
            {t('Photo Gallery', 'Fotogalerie')}
          </h2>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'0.8rem', margin:'1rem 0 0' }}>
            <div style={{ width:'60px', height:'1px', background:'linear-gradient(90deg,transparent,#C9963A)' }} />
            <span style={{ color:'#C9963A', fontSize:'0.75rem' }}>✦</span>
            <div style={{ width:'60px', height:'1px', background:'linear-gradient(90deg,#C9963A,transparent)' }} />
          </div>
        </div>

        {/* Masonry desktop */}
        <div className="gallery-grid-desktop" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gridAutoRows:'200px', gap:'10px' }}>
          {SLOTS.map(s => (
            <div key={s.id}
              onMouseEnter={() => setHovered(s.id)}
              onMouseLeave={() => setHovered(null)}
              style={{ gridColumn:s.col, gridRow:s.row, background:s.bg, position:'relative', overflow:'hidden', cursor:'pointer',
                transition:'transform 0.4s, box-shadow 0.4s',
                transform:hovered===s.id?'scale(1.015)':'scale(1)',
                boxShadow:hovered===s.id?'0 8px 30px rgba(61,43,31,0.25)':'none',
              }}>
              <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <span style={{ fontFamily:"'Playfair Display',serif", fontSize:'2rem', color:'rgba(255,255,255,0.18)', fontWeight:400 }}>B & S</span>
              </div>
              {/* Replace with: <img src="photo.jpg" alt={s.label} style={{width:'100%',height:'100%',objectFit:'cover'}} /> */}
              <div style={{ position:'absolute', inset:0, background:'rgba(61,43,31,0.55)', display:'flex', alignItems:'center', justifyContent:'center', opacity:hovered===s.id?1:0, transition:'opacity 0.3s' }}>
                <div style={{ textAlign:'center' }}>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'1rem', color:'#F5EFE6' }}>{s.label}</div>
                  <div style={{ width:'24px', height:'1px', background:'rgba(201,150,58,0.8)', margin:'0.5rem auto 0' }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile 2-col */}
        <div className="gallery-grid-mobile" style={{ display:'none', gridTemplateColumns:'repeat(2,1fr)', gap:'8px' }}>
          {SLOTS.map(s => (
            <div key={s.id} style={{ background:s.bg, height:'150px', position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <span style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.2rem', color:'rgba(255,255,255,0.2)' }}>B & S</span>
              </div>
            </div>
          ))}
        </div>

        <p style={{ textAlign:'center', marginTop:'1.2rem', fontFamily:"'Raleway',sans-serif", fontSize:'0.7rem', color:'#B08860', letterSpacing:'0.08em' }}>
          📸 {t('Replace placeholder blocks with your wedding photos in Gallery.tsx', 'Platzhalter in Gallery.tsx durch eure Hochzeitsfotos ersetzen')}
        </p>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .gallery-grid-desktop { display: none !important; }
          .gallery-grid-mobile  { display: grid !important; }
        }
      `}</style>
    </section>
  );
}


// ─── RSVP ──────────────────────────────────────────────────────
import { useState as useStateRSVP, type CSSProperties } from 'react';

const iStyle: CSSProperties = {
  width:'100%', padding:'0.85rem 1.1rem',
  border:'1px solid rgba(61,43,31,0.2)',
  background:'rgba(255,255,255,0.7)',
  fontFamily:"'Raleway',sans-serif", fontSize:'0.88rem', color:'#3D2B1F',
  outline:'none', transition:'border-color 0.3s', borderRadius:0,
  boxSizing:'border-box', WebkitAppearance:'none', appearance:'none',
};
const lStyle: CSSProperties = {
  fontFamily:"'Raleway',sans-serif", fontSize:'0.65rem', letterSpacing:'0.28em',
  textTransform:'uppercase', color:'#7A5A40', display:'block', marginBottom:'0.45rem',
};

export function RSVP() {
  const { t, lang } = useLang();
  const [form, setForm] = useStateRSVP({ name:'', email:'', phone:'', guests:'1', attendance:'', meal:'', language:'', message:'' });
  const [errors, setErrors] = useStateRSVP<Record<string,string>>({});
  const [submitted, setSubmitted] = useStateRSVP(false);

  const change = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    setErrors(p => ({ ...p, [name]:'' }));
  };

  const submit = () => {
    const errs: Record<string,string> = {};
    if (!form.name.trim())    errs.name='Required';
    if (!form.email.trim())   errs.email='Required';
    if (!form.attendance)     errs.attendance='Required';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitted(true);
  };

  if (submitted) return (
    <section id="rsvp" style={{ background:'#3D2B1F', padding:'clamp(4rem,10vw,8rem) 0', minHeight:'50vh', display:'flex', alignItems:'center' }}>
      <div style={{ maxWidth:'600px', margin:'0 auto', padding:'0 24px', textAlign:'center', boxSizing:'border-box' }}>
        <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'4rem', color:'rgba(201,150,58,0.6)', marginBottom:'1.2rem', animation:'scaleIn 0.6s ease' }}>✦</div>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(2rem,6vw,3.5rem)', fontWeight:400, color:'#F5EFE6', marginBottom:'1rem' }}>
          {t(`Thank you, ${form.name}!`, `Danke, ${form.name}!`)}
        </h2>
        <p style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.88rem', color:'rgba(245,239,230,0.6)', lineHeight:1.9, margin:'0 auto 1.5rem', maxWidth:'380px' }}>
          {t("We've received your RSVP and can't wait to celebrate with you on 28 December 2026.", "Wir haben deine Zu- bzw. Absage erhalten und freuen uns auf die Feier am 28. Dezember 2026.")}
        </p>
        <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', color:'rgba(201,150,58,0.75)', fontSize:'1.05rem' }}>
          "I have found the one whom my soul loves." — {t('Song of Solomon 3:4', 'Hoheslied 3,4')}
        </p>
      </div>
    </section>
  );

  return (
    <section id="rsvp" style={{ background:'linear-gradient(160deg,#2A1608 0%,#3D2B1F 100%)', padding:'clamp(3rem,8vw,7rem) 0', position:'relative', overflow:'hidden' }}>
      {/* Decorative */}
      <div style={{ position:'absolute', top:'-100px', right:'-100px', width:'400px', height:'400px', borderRadius:'50%', background:'radial-gradient(circle,rgba(201,150,58,0.06),transparent 70%)', pointerEvents:'none' }} />

      <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'0 clamp(16px,4vw,48px)', boxSizing:'border-box' }}>
        <div className="rsvp-layout">
          {/* Left */}
          <div className="rsvp-left">
            <span style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.68rem', letterSpacing:'0.45em', textTransform:'uppercase', color:'#C9963A', display:'block', marginBottom:'0.7rem' }}>
              {t('Join the Celebration', 'Dabei sein')}
            </span>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(2rem,5vw,3.5rem)', fontWeight:400, color:'#F5EFE6', margin:'0 0 1.2rem', lineHeight:1.1 }}>
              {t('Celebrate Our Love With Us', 'Feiert unsere Liebe mit uns')}
            </h2>
            <div style={{ width:'40px', height:'2px', background:'#C9963A', marginBottom:'1.5rem' }} />
            <p style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.88rem', color:'rgba(245,239,230,0.6)', lineHeight:1.9, marginBottom:'1.8rem' }}>
              {t(
                'Please RSVP by November 28th, 2026. We would be honored to have you witness our union.',
                'Bitte bis zum 28. November 2026 zusagen. Wir freuen uns sehr, wenn du dabei sein kannst.'
              )}
            </p>
            <blockquote style={{ borderLeft:'2px solid rgba(201,150,58,0.35)', paddingLeft:'1.2rem', margin:0 }}>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', color:'rgba(245,239,230,0.65)', fontSize:'1rem', lineHeight:1.75, margin:0 }}>
                {t('"He who finds a wife finds what is good and receives favor from the Lord."', '"Wer eine Frau gefunden hat, hat etwas Gutes gefunden."')}
              </p>
              <cite style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.65rem', letterSpacing:'0.15em', color:'rgba(201,150,58,0.65)', marginTop:'0.5rem', display:'block', fontStyle:'normal' }}>
                — {t('Proverbs 18:22', 'Sprüche 18,22')}
              </cite>
            </blockquote>
          </div>

          {/* Right */}
          <div>
            <div style={{ background:'rgba(250,246,239,0.97)', padding:'clamp(1.5rem,4vw,2.5rem)', boxShadow:'0 20px 60px rgba(0,0,0,0.3)' }}>
              <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>

                {[{ name:'name', label:{ en:'Full Name *', de:'Vollständiger Name *' }, type:'text', ph:{ en:'Your name', de:'Dein Name' } },
                  { name:'email', label:{ en:'Email *', de:'E-Mail *' }, type:'email', ph:{ en:'your@email.com', de:'deine@email.de' } },
                  { name:'phone', label:{ en:'WhatsApp / Phone', de:'WhatsApp / Telefon' }, type:'tel', ph:{ en:'+49 or +254...', de:'+49 oder +254...' } },
                ].map(f => (
                  <div key={f.name}>
                    <label style={lStyle}>{lang==='en' ? f.label.en : f.label.de}</label>
                    <input name={f.name} type={f.type} value={(form as any)[f.name]} onChange={change}
                      placeholder={lang==='en' ? f.ph.en : f.ph.de}
                      style={{ ...iStyle, borderColor:errors[f.name]?'#BE0027':'rgba(61,43,31,0.2)' }} />
                    {errors[f.name] && <p style={{ color:'#BE0027', fontSize:'0.7rem', margin:'0.25rem 0 0' }}>{errors[f.name]}</p>}
                  </div>
                ))}

                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
                  <div>
                    <label style={lStyle}>{t('Guests', 'Gäste')}</label>
                    <select name="guests" value={form.guests} onChange={change} style={iStyle}>
                      {['1','2','3','4','5+'].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={lStyle}>{t('Attending? *', 'Dabei? *')}</label>
                    <select name="attendance" value={form.attendance} onChange={change} style={{ ...iStyle, borderColor:errors.attendance?'#BE0027':'rgba(61,43,31,0.2)' }}>
                      <option value="">{t('Select…', 'Auswählen…')}</option>
                      <option value="yes">{t('Joyfully accepts 🎉', 'Freudige Zusage 🎉')}</option>
                      <option value="no">{t('Regretfully declines', 'Leider absagen')}</option>
                      <option value="maybe">{t('Will confirm soon', 'Kommt noch')}</option>
                    </select>
                    {errors.attendance && <p style={{ color:'#BE0027', fontSize:'0.7rem', margin:'0.25rem 0 0' }}>{errors.attendance}</p>}
                  </div>
                </div>

                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
                  <div>
                    <label style={lStyle}>{t('Meal Preference', 'Mahlzeit')}</label>
                    <select name="meal" value={form.meal} onChange={change} style={iStyle}>
                      <option value="">{t('Select…', 'Auswählen…')}</option>
                      <option value="standard">Standard</option>
                      <option value="vegetarian">{t('Vegetarian', 'Vegetarisch')}</option>
                      <option value="vegan">Vegan</option>
                      <option value="halal">Halal</option>
                    </select>
                  </div>
                  <div>
                    <label style={lStyle}>{t('Your Language', 'Sprache')}</label>
                    <select name="language" value={form.language} onChange={change} style={iStyle}>
                      <option value="">{t('Select…', 'Auswählen…')}</option>
                      <option value="en">English</option>
                      <option value="de">Deutsch</option>
                      <option value="sw">Kiswahili</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={lStyle}>{t('Message for the Couple', 'Nachricht ans Brautpaar')}</label>
                  <textarea name="message" value={form.message} onChange={change} rows={3}
                    placeholder={t('A blessing or special message…', 'Ein Segen oder eine besondere Nachricht…')}
                    style={{ ...iStyle, resize:'vertical' }} />
                </div>

                <button onClick={submit} style={{
                  width:'100%', padding:'1rem',
                  background:'linear-gradient(135deg,#C9963A,#A07520)',
                  color:'#FFFCF7', border:'none',
                  fontFamily:"'Raleway',sans-serif", fontSize:'0.72rem',
                  letterSpacing:'0.32em', textTransform:'uppercase',
                  cursor:'pointer', transition:'all 0.3s',
                  boxShadow:'0 4px 20px rgba(201,150,58,0.3)',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 30px rgba(201,150,58,0.45)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 4px 20px rgba(201,150,58,0.3)'; }}
                >{t('Send RSVP ✦', 'RSVP senden ✦')}</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .rsvp-layout { display:grid; grid-template-columns:1fr 1.1fr; gap:clamp(2rem,5vw,4rem); align-items:center; }
        .rsvp-left { color: #F5EFE6; }
        @media (max-width:768px) {
          .rsvp-layout { grid-template-columns:1fr; }
          .rsvp-left { text-align:center; }
          .rsvp-left blockquote { text-align:left; }
        }
      `}</style>
    </section>
  );
}


// ─── Footer ────────────────────────────────────────────────────
export function Footer() {
  const { t } = useLang();
  const links = [
    { en:'Home', de:'Start', href:'#home' },
    { en:'Our Story', de:'Geschichte', href:'#story' },
    { en:'Events', de:'Ablauf', href:'#events' },
    { en:'Travel', de:'Anreise', href:'#travel' },
    { en:'Gallery', de:'Galerie', href:'#gallery' },
    { en:'RSVP', de:'RSVP', href:'#rsvp' },
  ];

  return (
    <footer style={{ background:'#0E0703', padding:'clamp(3rem,6vw,5rem) 0 clamp(1.5rem,3vw,2rem)' }}>
      <div style={{ maxWidth:'900px', margin:'0 auto', padding:'0 clamp(16px,4vw,40px)', textAlign:'center', boxSizing:'border-box' }}>

        {/* Flags */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'1rem', marginBottom:'1.5rem' }}>
          <span style={{ fontSize:'1.5rem' }}>🇰🇪</span>
          <div style={{ width:'30px', height:'1px', background:'rgba(201,150,58,0.3)' }} />
          <span style={{ color:'rgba(201,150,58,0.5)', fontSize:'1rem' }}>✦</span>
          <div style={{ width:'30px', height:'1px', background:'rgba(201,150,58,0.3)' }} />
          <span style={{ fontSize:'1.5rem' }}>🇩🇪</span>
        </div>

        <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(1.8rem,5vw,2.8rem)', fontWeight:400, color:'#F5EFE6', marginBottom:'0.3rem' }}>
          Billy <span style={{ fontStyle:'italic', color:'#C9963A' }}>&</span> Sarah
        </div>
        <div style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.65rem', letterSpacing:'0.35em', textTransform:'uppercase', color:'rgba(201,150,58,0.55)', marginBottom:'2rem' }}>
          28 · December · 2026 · Eldoret, Kenya
        </div>

        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'0.8rem', marginBottom:'1.8rem' }}>
          <div style={{ width:'70px', height:'1px', background:'rgba(201,150,58,0.12)' }} />
          <span style={{ color:'rgba(201,150,58,0.3)', fontSize:'0.7rem' }}>✦</span>
          <div style={{ width:'70px', height:'1px', background:'rgba(201,150,58,0.12)' }} />
        </div>

        <div style={{ display:'flex', justifyContent:'center', flexWrap:'wrap', gap:'0.2rem 0.8rem', marginBottom:'2rem' }}>
          {links.map(l => (
            <a key={l.href} href={l.href} style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.66rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(245,239,230,0.35)', textDecoration:'none', padding:'0.3rem', transition:'color 0.3s' }}
            onMouseEnter={e => e.currentTarget.style.color='rgba(201,150,58,0.85)'}
            onMouseLeave={e => e.currentTarget.style.color='rgba(245,239,230,0.35)'}
            >{t(l.en, l.de)}</a>
          ))}
        </div>

        <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'0.95rem', color:'rgba(245,239,230,0.28)', maxWidth:'460px', margin:'0 auto 1.8rem', lineHeight:1.75 }}>
          {t('"Many waters cannot quench love; rivers cannot sweep it away." — Song of Solomon 8:7', '"Viele Wasser können die Liebe nicht auslöschen." — Hoheslied 8,7')}
        </p>

        <p style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.6rem', letterSpacing:'0.12em', color:'rgba(245,239,230,0.15)', margin:0 }}>
          © 2026 Billy &amp; Sarah · Made with ♥ · Kenya × Deutschland
        </p>
      </div>
    </footer>
  );
}