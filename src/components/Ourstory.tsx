import { useLang } from './Langcontext';

export default function OurStory() {
  const { t, lang } = useLang();

  const verses = [
    { ref: 'Colossians 3:14', label: { en:'Unity', de:'Einheit' },
      text: { en:'"And over all these virtues put on love, which binds them all together in perfect unity."',
              de:'"Und über alles zieht die Liebe an, die alles andere in sich umfasst."' } },
    { ref: 'Song of Solomon 8:7', label: { en:'Enduring Love', de:'Beständige Liebe' },
      text: { en:'"Many waters cannot quench love; rivers cannot sweep it away."',
              de:'"Viele Wasser können die Liebe nicht auslöschen, auch Ströme können sie nicht wegschwemmen."' } },
    { ref: 'Proverbs 18:22', label: { en:"Groom's Blessing", de:'Segen des Bräutigams' },
      text: { en:'"He who finds a wife finds what is good and receives favor from the Lord."',
              de:'"Wer eine Frau gefunden hat, hat etwas Gutes gefunden und Wohlgefallen beim HERRN erlangt."' } },
  ];

  const timeline = [
    { year:'2020', en:'Two worlds meet — Billy in Kenya, Sarah in Germany, connected by faith.', de:'Zwei Welten begegnen sich — Billy in Kenia, Sarah in Deutschland, verbunden durch den Glauben.' },
    { year:'2022', en:'First meeting in person — a moment neither will forget.', de:'Erstes persönliches Treffen — ein Moment, den keiner vergessen wird.' },
    { year:'2024', en:'He asked, she said yes. Two nations celebrated.', de:'Er fragte, sie sagte Ja. Zwei Nationen feierten.' },
    { year:'2026', en:'December 28 — two become one before God and family.', de:'28. Dezember — zwei werden eins vor Gott und Familie.' },
  ];

  return (
    <section id="story" style={{ background:'#FFFCF7', padding:'clamp(3rem,8vw,7rem) 0', overflow:'hidden' }}>
      <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'0 clamp(16px,4vw,48px)', boxSizing:'border-box' }}>

        {/* Header */}
        <div className="reveal" style={{ textAlign:'center', marginBottom:'clamp(2rem,5vw,4rem)' }}>
          <span style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.68rem', letterSpacing:'0.45em', textTransform:'uppercase', color:'#C9963A', display:'block', marginBottom:'0.6rem' }}>
            {t('A Love Story', 'Eine Liebesgeschichte')}
          </span>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(2rem,5vw,3.8rem)', fontWeight:400, color:'#3D2B1F', margin:'0 0 0.5rem' }}>
            Billy <span style={{ fontStyle:'italic', color:'#C9963A' }}>&</span> Sarah
          </h2>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'0.8rem', margin:'1rem 0 1.4rem' }}>
            <div style={{ width:'60px', height:'1px', background:'linear-gradient(90deg,transparent,#C9963A)' }} />
            <div style={{ fontSize:'1rem' }}>🇰🇪</div>
            <span style={{ color:'#C9963A', fontSize:'0.7rem' }}>✦</span>
            <div style={{ fontSize:'1rem' }}>🇩🇪</div>
            <div style={{ width:'60px', height:'1px', background:'linear-gradient(90deg,#C9963A,transparent)' }} />
          </div>
          <p style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.9rem', color:'#7A5A40', maxWidth:'540px', margin:'0 auto', lineHeight:1.9 }}>
            {t(
              'A Kenyan heart and a German soul — united by faith, love, and the beauty of two cultures becoming one family.',
              'Ein kenianisches Herz und eine deutsche Seele — vereint durch Glauben, Liebe und die Schönheit zweier Kulturen, die eine Familie werden.'
            )}
          </p>
        </div>

        {/* Timeline */}
        <div className="reveal" style={{ marginBottom:'clamp(3rem,6vw,5rem)' }}>
          <div style={{ display:'flex', flexDirection:'column', position:'relative', maxWidth:'700px', margin:'0 auto' }}>
            {/* Vertical line */}
            <div style={{ position:'absolute', left:'clamp(28px,5%,50px)', top:0, bottom:0, width:'1px', background:'linear-gradient(to bottom,transparent,rgba(201,150,58,0.3),rgba(201,150,58,0.5),rgba(201,150,58,0.3),transparent)' }} />

            {timeline.map((item, i) => (
              <div key={i} style={{ display:'flex', gap:'clamp(1.5rem,4vw,3rem)', alignItems:'flex-start', marginBottom:'2rem', paddingLeft:'clamp(16px,4vw,20px)', position:'relative' }}>
                {/* Dot */}
                <div style={{
                  width:'12px', height:'12px', borderRadius:'50%',
                  background: i === timeline.length-1 ? '#C9963A' : '#fff',
                  border:`2px solid #C9963A`, flexShrink:0,
                  marginTop:'4px', position:'relative', zIndex:1,
                  boxShadow: i === timeline.length-1 ? '0 0 12px rgba(201,150,58,0.5)' : 'none',
                }} />
                <div style={{ flex:1 }}>
                  <span style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.65rem', letterSpacing:'0.28em', textTransform:'uppercase', color:'#C9963A', fontWeight:600 }}>{item.year}</span>
                  <p style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.88rem', color:'#6B4A30', lineHeight:1.75, margin:'0.3rem 0 0' }}>
                    {lang === 'en' ? item.en : item.de}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bible verse cards */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap:'clamp(1rem,2.5vw,1.5rem)' }}>
          {verses.map((v, i) => (
            <div key={i} className="reveal" style={{ animationDelay:`${i*0.15}s` }}>
              <div style={{
                padding:'clamp(1.5rem,3vw,2rem)', height:'100%',
                background: i===1 ? '#3D2B1F' : '#FAF6EF',
                border:'1px solid rgba(201,150,58,0.15)',
                transition:'transform 0.35s, box-shadow 0.35s',
                position:'relative', overflow:'hidden',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 12px 40px rgba(61,43,31,0.15)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none'; }}
              >
                {/* Corner ornament */}
                <div style={{ position:'absolute', top:'12px', right:'12px', color:'rgba(201,150,58,0.2)', fontSize:'1.2rem', fontFamily:'serif' }}>✦</div>

                <div style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.62rem', letterSpacing:'0.32em', textTransform:'uppercase', color:'#C9963A', marginBottom:'1rem' }}>
                  {lang === 'en' ? v.label.en : v.label.de}
                </div>
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'1.05rem', color: i===1 ? '#F5EFE6' : '#3D2B1F', lineHeight:1.75, marginBottom:'0.9rem' }}>
                  {lang === 'en' ? v.text.en : v.text.de}
                </p>
                <p style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.65rem', color:'#C9963A', letterSpacing:'0.12em', margin:0 }}>
                  — {v.ref}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}