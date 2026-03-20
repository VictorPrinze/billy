import { useState } from 'react';
import { useLang } from './Langcontext';

export default function EventSection() {
  const { t, lang } = useLang();
  const [activeDay, setActiveDay] = useState(0);

  const days = [
    {
      label:   { en:'Church Service', de:'Kirchliche Trauung', sw:'Ibada ya Kanisa' },
      date:    '28 · XII · 2026',
      time:    '10:00 AM',
      icon:    '⛪',
      color:   '#C9963A',
      schedule:[
        { time:'8:30 AM',  en:'Arrival & Photo Session',   de:'Ankunft & Fototermin',   sw:'Kuwasili & Picha',        sub:{ en:'Bridal team & close family', de:'Brautteam & enge Familie', sw:'Timu ya bibi arusi & familia ya karibu' } },
        { time:'10:00 AM', en:'Groom Enters',              de:'Einzug des Bräutigams',  sw:'Bwana Arusi Aingia',      sub:{ en:'Opening prayer & Praise', de:'Eröffnungsgebet & Lobpreis', sw:'Sala ya ufunguzi & Sifa' } },
        { time:'10:15 AM', en:'Bride Entrance',            de:'Einzug der Braut',       sw:'Bibi Arusi Aingia',       sub:{ en:'The moment we\'ve waited for', de:'Der Moment, auf den wir gewartet haben', sw:'Wakati tuliousubiri' } },
        { time:'10:30 AM', en:'Sermon',                    de:'Predigt',                sw:'Mahubiri',                sub:{ en:'Message & exchanging of vows', de:'Botschaft & Eheversprechen', sw:'Ujumbe & Kubadilishana Ahadi' } },
        { time:'12:30 PM', en:'Closing Prayer',            de:'Abschlussgebet',         sw:'Sala ya Kufunga',         sub:{ en:'Photo session & lunch', de:'Fototermin & Mittagessen', sw:'Picha & Chakula cha mchana' } },
      ],
    },
    {
      label:   { en:'Reception', de:'Empfang', sw:'Mapokezi' },
      date:    '28 · XII · 2026',
      time:    '2:00 PM',
      icon:    '🥂',
      color:   '#BE0027',
      schedule:[
        { time:'2:00 PM',  en:'Grand Entrance',       de:'Großer Einzug',       sw:'Kuingia kwa Fahari',  sub:{ en:'Opening prayer & introductions', de:'Eröffnungsgebet & Vorstellungen', sw:'Sala ya ufunguzi & utambulisho' } },
        { time:'2:30 PM',  en:'Speeches',             de:'Reden',               sw:'Hotuba',              sub:{ en:'Family & friends speak', de:'Familie & Freunde sprechen', sw:'Familia & marafiki wanazungumza' } },
        { time:'3:00 PM',  en:'Cake Cutting & Gifts', de:'Torte & Geschenke',   sw:'Keki & Zawadi',       sub:{ en:'Sweet celebrations', de:'Süße Feierlichkeiten', sw:'Sherehe tamu' } },
        { time:'3:20 PM',  en:'Vote of Thanks',       de:'Dankesworte',         sw:'Shukrani',            sub:{ en:'Asanteni Sana', de:'Herzlichen Dank', sw:'Asanteni Sana' } },
        { time:'3:30 PM',  en:'Closing Prayer',       de:'Abschlussgebet',      sw:'Sala ya Kufunga',     sub:{ en:'Guests depart', de:'Gäste gehen', sw:'Wageni wanaondoka' } },
      ],
    },
    {
      label:   { en:'Evening Dinner', de:'Abendessen', sw:'Chakula cha Jioni' },
      date:    '28 · XII · 2026',
      time:    '6:00 PM',
      icon:    '🌙',
      color:   '#2D4A2D',
      note:    { en:'German guests automatically invited', de:'Deutsche Gäste automatisch eingeladen', sw:'Wageni wa Ujerumani wanaalikwa moja kwa moja' },
      schedule:[
        { time:'6:00 PM',  en:'Welcome & Prayer',    de:'Willkommen & Gebet',  sw:'Karibu & Sala',       sub:{ en:'Opening ceremony', de:'Eröffnungsfeier', sw:'Sherehe ya ufunguzi' } },
        { time:'6:30 PM',  en:'Guest Introductions', de:'Gästevorstellungen',  sw:'Utambulisho wa Wageni', sub:{ en:'Meet the families', de:'Familien kennenlernen', sw:'Kutana na familia' } },
        { time:'7:00 PM',  en:'Supper & Activities', de:'Abendessen & Spiele', sw:'Chakula & Shughuli',   sub:{ en:'Eat, dance, celebrate', de:'Essen, tanzen, feiern', sw:'Kula, cheza, sherehekea' } },
        { time:'9:00 PM',  en:'Wedding Dance',       de:'Hochzeitstanz',       sw:'Dansi ya Harusi',     sub:{ en:'The floor is yours', de:'Die Tanzfläche gehört euch', sw:'Sakafu ni yako' } },
        { time:'10:00 PM', en:'Closing Prayer',      de:'Abschlussgebet',      sw:'Sala ya Kufunga',     sub:{ en:'Mungu Ni Mwema', de:'Mungu Ni Mwema (Gott ist gut)', sw:'Mungu Ni Mwema' } },
      ],
    },
  ];

  // Evening dinner is private — German guests only
  // Only show it when language is set to DE
  const visibleDays = lang === 'de' ? days : days.slice(0, 2);

  // Reset to first tab if active tab becomes hidden
  const safeActive = activeDay < visibleDays.length ? activeDay : 0;

  return (
    <section id="events" style={{ background:'#FAF6EF', padding:'clamp(3rem,8vw,7rem) 0', overflow:'hidden' }}>
      <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'0 clamp(16px,4vw,48px)', boxSizing:'border-box' }}>

        {/* Header */}
        <div className="reveal" style={{ textAlign:'center', marginBottom:'clamp(2rem,5vw,3.5rem)' }}>
          <span style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.68rem', letterSpacing:'0.45em', textTransform:'uppercase', color:'#C9963A', display:'block', marginBottom:'0.6rem' }}>
            {t('The Big Day', 'Der große Tag', 'Siku Yetu')}
          </span>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(2rem,5vw,3.8rem)', fontWeight:400, color:'#3D2B1F', margin:'0 0 0.5rem' }}>
            {t('Order of the Day', 'Programm', 'Mpangilio wa Siku')}
          </h2>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'0.8rem', margin:'1rem 0 1.2rem' }}>
            <div style={{ width:'60px', height:'1px', background:'linear-gradient(90deg,transparent,#C9963A)' }} />
            <span style={{ color:'#C9963A', fontSize:'0.75rem' }}>✦</span>
            <div style={{ width:'60px', height:'1px', background:'linear-gradient(90deg,#C9963A,transparent)' }} />
          </div>
          {/* Date + Venue pill */}
          <div style={{ display:'inline-flex', alignItems:'center', gap:'0.8rem', background:'#3D2B1F', padding:'0.6rem 1.5rem' }}>
            <span style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.7rem', letterSpacing:'0.22em', textTransform:'uppercase', color:'rgba(201,150,58,0.85)' }}>
              📍 Eldoret, Kenya
            </span>
            <span style={{ color:'rgba(201,150,58,0.3)' }}>|</span>
            <span style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.7rem', letterSpacing:'0.22em', textTransform:'uppercase', color:'rgba(245,239,230,0.75)' }}>
              {t('28 December 2026', '28. Dezember 2026', '28 Desemba 2026')}
            </span>
          </div>
        </div>

        {/* Day selector — Evening Dinner only visible in German */}
        {(() => {
          // Reset to first tab if currently on evening dinner and not in DE
          if (activeDay === 2 && lang !== 'de') setActiveDay(0);
          return null;
        })()}
        <div className="reveal" style={{ display:'flex', gap:'clamp(0.5rem,2vw,1rem)', marginBottom:'2rem', flexWrap:'wrap' }}>
          {days.map((day, i) => {
            // Hide evening dinner tab (index 2) unless language is DE
            if (i === 2 && lang !== 'de') return null;
            return (
              <button key={i} onClick={() => setActiveDay(i)} style={{
                flex:'1', minWidth:'min(100%,160px)',
                padding:'1rem clamp(0.8rem,2vw,1.5rem)',
                background: activeDay===i ? day.color : 'transparent',
                border:`1px solid ${activeDay===i ? day.color : 'rgba(61,43,31,0.2)'}`,
                color: activeDay===i ? '#fff' : '#6B4A30',
                fontFamily:"'Raleway',sans-serif", fontSize:'0.72rem',
                letterSpacing:'0.15em', textTransform:'uppercase',
                cursor:'pointer', transition:'all 0.3s',
                display:'flex', alignItems:'center', justifyContent:'center', gap:'0.5rem',
              }}
              onMouseEnter={e => { if(activeDay!==i) { e.currentTarget.style.background='rgba(61,43,31,0.06)'; } }}
              onMouseLeave={e => { if(activeDay!==i) { e.currentTarget.style.background='transparent'; } }}
              >
                <span>{day.icon}</span>
                <span>{lang==='sw' ? day.label.sw : lang==='de' ? day.label.de : day.label.en}</span>
              </button>
            );
          })}
        </div>

        {/* Active day schedule */}
        <div className="reveal">
          {(() => {
            const day = visibleDays[safeActive];
            return (
              <div style={{ display:'grid', gridTemplateColumns:'clamp(260px,35%,360px) 1fr', gap:'clamp(1.5rem,4vw,3rem)', alignItems:'start' }} className="event-grid">
                {/* Left: info card */}
                <div style={{ background:'#3D2B1F', padding:'2rem', color:'#F5EFE6' }}>
                  <div style={{ fontSize:'3rem', marginBottom:'0.8rem' }}>{day.icon}</div>
                  <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.6rem', fontWeight:400, margin:'0 0 0.3rem' }}>
                    {lang==='sw' ? day.label.sw : lang==='de' ? day.label.de : day.label.en}
                  </h3>
                  <p style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.7rem', letterSpacing:'0.2em', color:'rgba(201,150,58,0.8)', textTransform:'uppercase', margin:'0 0 1.5rem' }}>
                    {day.date} · {day.time}
                  </p>
                  <div style={{ width:'40px', height:'2px', background:day.color, marginBottom:'1.5rem' }} />
                  <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'1.05rem', color:'rgba(245,239,230,0.7)', lineHeight:1.75, margin:0 }}>
                    {t('"Love is patient, love is kind… Love never fails."', '"Die Liebe ist geduldig und freundlich… Die Liebe hört niemals auf."', '"Upendo huvumilia, upendo wema… Upendo haupotei kamwe."')}
                    <br/>
                    <span style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.62rem', letterSpacing:'0.15em', fontStyle:'normal', color:'rgba(201,150,58,0.65)' }}>
                      — 1 {t('Corinthians', 'Korinther', 'Wakorintho')} 13
                    </span>
                  </p>
                  {day.note && (
                    <div style={{ marginTop:'1.5rem', padding:'0.8rem 1rem', background:'rgba(201,150,58,0.1)', border:'1px solid rgba(201,150,58,0.2)', fontFamily:"'Raleway',sans-serif", fontSize:'0.72rem', color:'rgba(201,150,58,0.85)', lineHeight:1.6 }}>
                      ⭐ {lang==='sw' ? day.note.sw : lang==='de' ? day.note.de : day.note.en}
                    </div>
                  )}
                </div>

                {/* Right: timeline */}
                <div style={{ display:'flex', flexDirection:'column', gap:'0' }}>
                  {day.schedule.map((item, i, arr) => (
                    <div key={i} style={{ display:'flex', gap:'1.2rem', alignItems:'flex-start', position:'relative', paddingBottom: i<arr.length-1 ? '1.5rem' : 0 }}>
                      {/* Time */}
                      <div style={{ minWidth:'68px', textAlign:'right', flexShrink:0 }}>
                        <span style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.65rem', fontWeight:700, color:day.color, letterSpacing:'0.08em' }}>{item.time}</span>
                      </div>
                      {/* Connector */}
                      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', flexShrink:0 }}>
                        <div style={{ width:'10px', height:'10px', borderRadius:'50%', background: i===0 ? day.color : '#fff', border:`2px solid ${day.color}`, marginTop:'2px', zIndex:1, position:'relative' }} />
                        {i < arr.length-1 && <div style={{ width:'1px', flex:1, background:`rgba(${day.color==='#C9963A'?'201,150,58':day.color==='#BE0027'?'190,0,39':'45,74,45'},0.25)`, marginTop:'2px', minHeight:'30px' }} />}
                      </div>
                      {/* Event */}
                      <div style={{ flex:1, paddingBottom:'0.2rem' }}>
                        <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'1rem', color:'#3D2B1F', fontWeight:500, lineHeight:1.2 }}>
                          {lang==='sw' ? item.sw : lang==='de' ? item.de : item.en}
                        </div>
                        <div style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.75rem', color:'#9A7060', marginTop:'0.2rem', lineHeight:1.5 }}>
                          {lang==='sw' ? item.sub.sw : lang==='de' ? item.sub.de : item.sub.en}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>

        {/* Dress code strip */}
        <div className="reveal" style={{ marginTop:'clamp(2rem,5vw,3.5rem)', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap:'1px', background:'rgba(201,150,58,0.15)' }}>
          {[
            { icon:'👔', label:{ en:'Wedding Attire', de:'Hochzeitskleidung', sw:'Mavazi ya Harusi' }, body:{ en:'Vibrant colors, bold styles. This is a joyful celebration — dress bright!', de:'Lebendige Farben, kühne Stile. Das ist eine freudige Feier — bunt anziehen!', sw:'Rangi nzuri, mitindo ya kisasa. Hii ni sherehe ya furaha — vaa vizuri!' } },
            { icon:'🌍', label:{ en:'Cultural Dress Welcome', de:'Trachten willkommen', sw:'Mavazi ya Kitamaduni Yanakaribishwa' }, body:{ en:'Kenyan or German traditional attire is warmly welcomed and celebrated.', de:'Kenianische oder deutsche Tracht ist herzlich willkommen und wird gefeiert.', sw:'Mavazi ya kitamaduni ya Kenya au Ujerumani yanakaribishwa na kusherehekewa.' } },
            { icon:'📿', label:{ en:'Look Your Best', de:'Im besten Look', sw:'Vaa Vizuri Kabisa' }, body:{ en:'Come looking radiant — this is a once-in-a-lifetime day for Billy & Sarah.', de:'Kommt strahlend — das ist ein einmaliger Tag für Billy & Sarah.', sw:'Kuja ukiwa umevaa vizuri — hii ni siku ya kipekee kwa Billy na Sarah.' } },
          ].map((card, i) => (
            <div key={i} style={{ background:'#fff', padding:'1.8rem', textAlign:'center' }}>
              <div style={{ fontSize:'2rem', marginBottom:'0.6rem' }}>{card.icon}</div>
              <div style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.68rem', letterSpacing:'0.22em', textTransform:'uppercase', color:'#C9963A', marginBottom:'0.6rem' }}>
                {lang==='sw' ? card.label.sw : lang==='de' ? card.label.de : card.label.en}
              </div>
              <p style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.8rem', color:'#7A5A40', lineHeight:1.8, margin:0 }}>
                {lang==='sw' ? card.body.sw : lang==='de' ? card.body.de : card.body.en}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .event-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}