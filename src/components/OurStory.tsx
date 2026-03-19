import { useLang } from './Langcontext';
import ProgressiveImage, { getWebPPaths, PHOTO_POSITIONS } from './Progressiveimage';

// Photo strip images
const STRIP_PHOTOS = [
  'DSC05402.JPG',
  'DSC05411.JPG',
  'DSC05443.JPG',
  'DSC05449.JPG',
  'DSC05466.JPG',
  'image1.JPG',
  'image2.JPG',
  'image3.JPG',
  'image4.JPG',
  'image5.JPG',
  'image8.JPG',
];

export default function OurStory() {
  const { t, lang } = useLang();

  const verses = [
    { ref:'Wakolosai 3:14 / Colossians 3:14',
      label:{ en:'Unity', de:'Einheit', sw:'Umoja' },
      text:{
        en:'"And over all these virtues put on love, which binds them all together in perfect unity."',
        de:'"Und über alles zieht die Liebe an, die alles andere in sich umfasst."',
        sw:'"Juu ya vyote, vaaeni upendo, ambao ndio kifungo cha ukamilifu."',
      }},
    { ref:'Wimbo wa Sulemani 8:7 / Song of Solomon 8:7',
      label:{ en:'Enduring Love', de:'Beständige Liebe', sw:'Upendo wa Milele' },
      text:{
        en:'"Many waters cannot quench love; rivers cannot sweep it away."',
        de:'"Viele Wasser können die Liebe nicht auslöschen."',
        sw:'"Maji mengi hayawezi kuzima upendo; mito haiwezi kuufunika."',
      }},
    { ref:"Mithali 18:22 / Proverbs 18:22",
      label:{ en:"Groom's Blessing", de:'Segen des Bräutigams', sw:'Baraka ya Bwana Arusi' },
      text:{
        en:'"He who finds a wife finds what is good and receives favor from the Lord."',
        de:'"Wer eine Frau gefunden hat, hat etwas Gutes gefunden."',
        sw:'"Mtu apatapo mke, anapata kitu kizuri na kupata kibali kwa Bwana."',
      }},
  ];

  const timeline = [
    { year:'2022',
      en:'Two worlds meet — Billy in Kenya, Sarah in Germany, connected by faith and love.',
      de:'Zwei Welten begegnen sich — Billy in Kenia, Sarah in Deutschland, verbunden durch Glauben und Liebe.',
      sw:'Ulimwengu mbili unakutana — Billy Kenya, Sarah Ujerumani, wakiungana kwa imani na upendo.' },
    { year:'2022',
      en:'First meeting in person — a moment neither will ever forget.',
      de:'Erstes persönliches Treffen — ein unvergesslicher Moment.',
      sw:'Mkutano wa kwanza uso kwa uso — wakati ambao hawatasahau.' },
    { year:'2025',
      en:'He asked. She said yes 😊  Two nations celebrated.',
      de:'Er fragte. Sie sagte Ja 😊  Zwei Nationen feierten.',
      sw:'Aliomba. Alisema ndiyo 😊  Mataifa mawili yalisherehekea.' },
    { year:'2026',
      en:'December 28 — two become one before God and family in Eldoret.',
      de:'28. Dezember — zwei werden eins vor Gott und Familie in Eldoret.',
      sw:'Desemba 28 — wawili wanakuwa mmoja mbele ya Mungu na familia Eldoret.' },
  ];

  return (
    <section id="story" style={{ background:'#FFFCF5', padding:'clamp(3rem,8vw,7rem) 0', overflow:'hidden' }}>
      <div style={{ maxWidth:'1280px', margin:'0 auto', boxSizing:'border-box' }}>

        {/* ── Horizontal photo strip — full bleed, cinematic ── */}
        <div className="reveal" style={{ overflow:'hidden', marginBottom:'clamp(3rem,6vw,5rem)', position:'relative' }}>
          {/* Scrolling strip */}
          <div style={{
            display:'flex', gap:'6px',
            animation:'storyScroll 30s linear infinite',
            width:'max-content',
          }}>
            {/* Duplicate for seamless loop */}
            {[...STRIP_PHOTOS, ...STRIP_PHOTOS, ...STRIP_PHOTOS].map((photo, i) => (
              <div key={i} style={{
                width:'clamp(200px,28vw,340px)',
                height:'clamp(140px,20vw,240px)',
                flexShrink:0, overflow:'hidden',
                position:'relative',
              }}>
                <ProgressiveImage
                  {...getWebPPaths(photo)}
                  alt="Billy and Sarah"
                  position={PHOTO_POSITIONS[photo] || 'center'}
                  style={{ width:'100%', height:'100%' }}
                />
                {/* Light warm overlay */}
                <div style={{ position:'absolute', inset:0, background:'rgba(255,248,235,0.08)' }}/>
              </div>
            ))}
          </div>
          {/* Fade edges */}
          <div style={{ position:'absolute', top:0, left:0, bottom:0, width:'80px', background:'linear-gradient(90deg,#FFFCF5,transparent)', pointerEvents:'none', zIndex:1 }}/>
          <div style={{ position:'absolute', top:0, right:0, bottom:0, width:'80px', background:'linear-gradient(270deg,#FFFCF5,transparent)', pointerEvents:'none', zIndex:1 }}/>
        </div>

        <div style={{ padding:'0 clamp(16px,4vw,48px)' }}>
          {/* Header */}
          <div className="reveal" style={{ textAlign:'center', marginBottom:'clamp(2rem,5vw,4rem)' }}>
            <span style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.68rem', letterSpacing:'0.45em', textTransform:'uppercase', color:'#D4A043', display:'block', marginBottom:'0.6rem' }}>
              {t('A Love Story','Eine Liebesgeschichte','Hadithi ya Upendo')}
            </span>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(2rem,5vw,3.8rem)', fontWeight:400, color:'#5C3D22', margin:'0 0 0.4rem' }}>
              Billy <span style={{ fontStyle:'italic', color:'#D4A043' }}>&</span> Sarah
            </h2>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'0.8rem', margin:'0.8rem 0 1.2rem' }}>
              <div style={{ width:'55px', height:'1px', background:'linear-gradient(90deg,transparent,#D4A043)' }}/>
              <span style={{ fontSize:'1rem' }}>🇰🇪</span>
              <span style={{ color:'#D4A043', fontSize:'0.7rem' }}>✦</span>
              <span style={{ fontSize:'1rem' }}>🇩🇪</span>
              <div style={{ width:'55px', height:'1px', background:'linear-gradient(90deg,#D4A043,transparent)' }}/>
            </div>
            <p style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.9rem', color:'#8B6040', maxWidth:'540px', margin:'0 auto', lineHeight:1.9 }}>
              {t(
                'A Kenyan heart and a German soul — united by faith, love, and the beauty of two cultures becoming one family.',
                'Ein kenianisches Herz und eine deutsche Seele — vereint durch Glauben, Liebe und die Schönheit zweier Kulturen.',
                'Moyo wa Kenya na roho ya Ujerumani — wakiungana kwa imani, upendo, na uzuri wa tamaduni mbili kuwa familia moja.'
              )}
            </p>
          </div>

          {/* Two-column: timeline + feature photo */}
          <div className="story-split" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'clamp(2rem,5vw,5rem)', alignItems:'center', marginBottom:'clamp(3rem,6vw,5rem)' }}>

            {/* Timeline */}
            <div className="reveal-left">
              <div style={{ display:'flex', flexDirection:'column', gap:'0', position:'relative' }}>
                <div style={{ position:'absolute', left:'5px', top:'8px', bottom:'8px', width:'1px', background:'linear-gradient(to bottom,transparent,rgba(212,160,67,0.4),rgba(212,160,67,0.5),rgba(212,160,67,0.4),transparent)' }}/>
                {timeline.map((item, i) => (
                  <div key={i} style={{ display:'flex', gap:'1.5rem', alignItems:'flex-start', paddingBottom:'2rem', position:'relative' }}>
                    <div style={{
                      width:'11px', height:'11px', borderRadius:'50%', flexShrink:0, marginTop:'3px', zIndex:1, position:'relative',
                      background: i === timeline.length-1 ? '#D4A043' : '#FFFCF5',
                      border:`2px solid #D4A043`,
                      boxShadow: i === timeline.length-1 ? '0 0 12px rgba(212,160,67,0.55)' : 'none',
                    }}/>
                    <div>
                      <span style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.65rem', letterSpacing:'0.28em', textTransform:'uppercase', color:'#D4A043', fontWeight:600 }}>{item.year}</span>
                      <p style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.88rem', color:'#8B6040', lineHeight:1.8, margin:'0.25rem 0 0' }}>
                        {lang==='sw' ? item.sw : lang==='de' ? item.de : item.en}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Feature photo */}
            <div className="reveal-right" style={{ position:'relative' }}>
              <div style={{ position:'relative', overflow:'hidden' }}>
                <ProgressiveImage
                  {...getWebPPaths('DSC05442.JPG')}
                  alt="Billy and Sarah"
                  position={PHOTO_POSITIONS['DSC05442.JPG'] || 'center'}
                  style={{ width:'100%', height:'clamp(300px,45vw,520px)' }}
                />
                {/* Gold corner frame */}
                <div style={{ position:'absolute', top:'12px', left:'12px', width:'40px', height:'40px', borderTop:'2px solid rgba(212,160,67,0.7)', borderLeft:'2px solid rgba(212,160,67,0.7)' }}/>
                <div style={{ position:'absolute', bottom:'12px', right:'12px', width:'40px', height:'40px', borderBottom:'2px solid rgba(212,160,67,0.7)', borderRight:'2px solid rgba(212,160,67,0.7)' }}/>
                {/* Caption overlay */}
                <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'2rem 1.5rem 1.2rem', background:'linear-gradient(to top,rgba(20,8,2,0.7),transparent)' }}>
                  <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'1rem', color:'rgba(253,248,235,0.9)', margin:0, lineHeight:1.6 }}>
                    {t('"I have found the one whom my soul loves."', '"Ich habe gefunden, den meine Seele liebt."', '"Nimempata anayependwa na nafsi yangu."')}
                  </p>
                  <p style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.6rem', letterSpacing:'0.18em', color:'rgba(212,160,67,0.75)', margin:'0.4rem 0 0' }}>
                    — {t('Song of Solomon 3:4','Hoheslied 3,4','Wimbo wa Sulemani 3:4')}
                  </p>
                </div>
              </div>
              {/* Offset shadow block */}
              <div style={{ position:'absolute', bottom:'-10px', right:'-10px', inset:'auto 0 -10px -10px', background:'rgba(212,160,67,0.1)', zIndex:-1 }}/>
            </div>
          </div>

          {/* Bible verse cards */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap:'clamp(1rem,2.5vw,1.5rem)' }}>
            {verses.map((v, i) => (
              <div key={i} className="reveal" style={{ transitionDelay:`${i*0.12}s` }}>
                <div style={{
                  padding:'clamp(1.5rem,3vw,2rem)', height:'100%',
                  background: i===1 ? '#5C3D22' : '#FDF8EB',
                  border:`1px solid ${i===1 ? 'transparent' : 'rgba(212,160,67,0.18)'}`,
                  transition:'transform 0.35s, box-shadow 0.35s',
                  position:'relative', overflow:'hidden',
                }}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-5px)';e.currentTarget.style.boxShadow='0 16px 48px rgba(92,61,34,0.12)';}}
                onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='none';}}
                >
                  <div style={{ position:'absolute', top:'10px', right:'12px', color:'rgba(212,160,67,0.2)', fontSize:'1.3rem', fontFamily:'serif' }}>✦</div>
                  <div style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.62rem', letterSpacing:'0.32em', textTransform:'uppercase', color:'#D4A043', marginBottom:'1rem' }}>
                    {lang==='sw' ? v.label.sw : lang==='de' ? v.label.de : v.label.en}
                  </div>
                  <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'1.05rem', color:i===1?'#FDF8EB':'#5C3D22', lineHeight:1.75, marginBottom:'0.9rem' }}>
                    {lang==='sw' ? v.text.sw : lang==='de' ? v.text.de : v.text.en}
                  </p>
                  <p style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.65rem', color:'#D4A043', letterSpacing:'0.12em', margin:0 }}>— {v.ref}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes storyScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        @media (max-width: 700px) {
          .story-split { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}