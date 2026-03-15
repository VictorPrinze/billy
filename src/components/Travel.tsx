import { useState } from 'react';
import { useLang } from './Langcontext';

const TABS = ['flights', 'accommodation', 'tips'] as const;
type Tab = typeof TABS[number];

const AIRPORTS = [
  { code: 'FRA', city: 'Frankfurt', flag: '🇩🇪', airline: 'Kenya Airways / Lufthansa', duration: '~8h 30m', notes: { en: 'Direct flight to NBO. Best option from Germany.', de: 'Direktflug nach Nairobi. Beste Option aus Deutschland.' } },
  { code: 'MUC', city: 'Munich', flag: '🇩🇪', airline: 'Kenya Airways / Turkish', duration: '~9–11h', notes: { en: 'Via Istanbul or direct. Good connections.', de: 'Via Istanbul oder direkt. Gute Verbindungen.' } },
  { code: 'BER', city: 'Berlin', flag: '🇩🇪', airline: 'Turkish / Ethiopian', duration: '~10–13h', notes: { en: 'Usually 1 stop via Istanbul or Addis.', de: 'Meist 1 Stopp via Istanbul oder Addis.' } },
  { code: 'HAM', city: 'Hamburg', flag: '🇩🇪', airline: 'Various via NBO', duration: '~10–14h', notes: { en: 'Connect via Frankfurt or Amsterdam.', de: 'Verbindung via Frankfurt oder Amsterdam.' } },
];

const HOTELS = [
  { name: 'Eldoret Primrose Hotel', stars: 4, price: 'KES 6,000–9,000/night', feature: { en: 'Central location, great breakfast, conference facilities', de: 'Zentrale Lage, großes Frühstück, Tagungsräume' }, tag: { en: 'Recommended', de: 'Empfohlen' }, tagColor: '#C9963A' },
  { name: 'Sirikwa Hotel', stars: 4, price: 'KES 5,500–8,500/night', feature: { en: 'Iconic Eldoret hotel, pool, business center', de: 'Ikonisches Hotel, Pool, Business Center' }, tag: null, tagColor: '' },
  { name: 'Boma Inn Eldoret', stars: 3, price: 'KES 4,000–6,500/night', feature: { en: 'Comfortable, great value, restaurant on site', de: 'Komfortabel, gutes Preis-Leistungs-Verhältnis' }, tag: { en: 'Budget-Friendly', de: 'Preiswert' }, tagColor: '#2D4A2D' },
  { name: 'Naiberi River Campsite', stars: 3, price: 'KES 3,500–5,500/night', feature: { en: 'Scenic riverside, eco-friendly, unique experience', de: 'Malerischer Fluss, umweltfreundlich, einzigartig' }, tag: { en: 'Nature Lovers', de: 'Naturliebhaber' }, tagColor: '#4A7FA5' },
];

const TIPS = [
  { icon: '✈️', title: { en: 'Book Early', de: 'Frühzeitig buchen' }, body: { en: 'December is peak season. Book flights at least 3–4 months in advance for best prices.', de: 'Dezember ist Hochsaison. Flüge mindestens 3–4 Monate im Voraus buchen.' } },
  { icon: '🛂', title: { en: 'Visa & Entry', de: 'Visum & Einreise' }, body: { en: 'German citizens need a Kenya eTA (approx. $30 USD). Apply at etakenya.go.ke. Valid passport required.', de: 'Deutsche Staatsbürger benötigen eine Kenya eTA (ca. 30 USD). Antrag auf etakenya.go.ke. Gültiger Reisepass erforderlich.' } },
  { icon: '💉', title: { en: 'Health & Vaccinations', de: 'Gesundheit & Impfungen' }, body: { en: 'Yellow Fever cert may be required. Malaria prophylaxis recommended. Bring any personal medications.', de: 'Gelbfieberimpfung kann erforderlich sein. Malariaprophylaxe empfohlen. Persönliche Medikamente mitbringen.' } },
  { icon: '💱', title: { en: 'Currency', de: 'Währung' }, body: { en: 'Kenyan Shilling (KES). ATMs widely available. 1 EUR ≈ 140–150 KES. Credit cards accepted in most hotels.', de: 'Kenianischer Schilling (KES). Geldautomaten weit verbreitet. 1 EUR ≈ 140–150 KES.' } },
  { icon: '📱', title: { en: 'SIM & Data', de: 'SIM & Daten' }, body: { en: 'Buy a local Safaricom SIM at JKIA airport. 1GB data ≈ KES 100. Mpesa mobile payments are everywhere.', de: 'Lokale Safaricom-SIM am Flughafen kaufen. 1 GB Daten ≈ 100 KES. Mpesa-Mobilzahlungen sind überall.' } },
  { icon: '🌡️', title: { en: 'Weather in December', de: 'Wetter im Dezember' }, body: { en: 'Eldoret sits at 2,100m. Expect 15–25°C (60–77°F). Evenings cool. Pack a light jacket!', de: 'Eldoret liegt auf 2.100 m. Erwarte 15–25°C. Abends kühl. Leichte Jacke einpacken!' } },
  { icon: '🚗', title: { en: 'Getting to Eldoret', de: 'Nach Eldoret kommen' }, body: { en: 'From Nairobi (JKIA): Fly to Eldoret Airport (EDL) — 1Hr. Or shuttle/matatu (~6h). The wedding team can help arrange group transport.', de: 'Von Nairobi: Flug nach Eldoret (EDL) — 45 Min. Oder Shuttle (~4h). Das Hochzeitsteam hilft bei der Gruppenreise.' } },
  { icon: '📞', title: { en: 'Emergency Contacts', de: 'Notfallkontakte' }, body: { en: 'Kenya Police: 999 | Ambulance: 0700 395 395 | German Embassy Nairobi: +254 20 426 2100', de: 'Kenya Polizei: 999 | Krankenwagen: 0700 395 395 | Deutsche Botschaft Nairobi: +254 20 426 2100' } },
];

export default function Travel() {
  const { t, lang } = useLang();
  const [tab, setTab] = useState<Tab>('flights');
  const [flightExpanded, setFlightExpanded] = useState<string | null>('FRA');

  return (
    <section id="travel" style={{ background:'#1A0D06', padding:'clamp(3rem,8vw,6rem) 0', position:'relative', overflow:'hidden' }}>

      {/* Background grid pattern */}
      <div style={{ position:'absolute', inset:0, opacity:0.03, pointerEvents:'none',
        backgroundImage:`linear-gradient(rgba(201,150,58,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,150,58,1) 1px, transparent 1px)`,
        backgroundSize:'60px 60px',
      }} />

      {/* Top accent */}
      <div style={{ position:'absolute', top:0, left:0, right:0, height:'3px', background:'linear-gradient(90deg,#006600,#BB0000,#FFFFFF,#000,#DD0000,#FFCC00)' }} />

      <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'0 clamp(16px,4vw,48px)', boxSizing:'border-box', position:'relative', zIndex:1 }}>

        {/* Header */}
        <div className="reveal" style={{ textAlign:'center', marginBottom:'3rem' }}>
          <span style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.68rem', letterSpacing:'0.45em', textTransform:'uppercase', color:'#C9963A', display:'block', marginBottom:'0.6rem' }}>
            {t('Getting Here', 'Anreise')}
          </span>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(2rem,5vw,3.5rem)', fontWeight:400, color:'#F5EFE6', margin:'0 0 0.8rem', lineHeight:1.1 }}>
            {t('Travel Guide', 'Reiseführer')}
          </h2>
          <p style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.88rem', color:'rgba(245,239,230,0.55)', maxWidth:'520px', margin:'0 auto', lineHeight:1.85 }}>
            {t(
              'We\'ve prepared everything you need to travel comfortably from Germany to Eldoret for our special day.',
              'Wir haben alles vorbereitet, was du für eine komfortable Reise von Deutschland nach Eldoret brauchst.'
            )}
          </p>
        </div>

        {/* Visual route map */}
        <div className="reveal" style={{
          background:'rgba(255,255,255,0.03)', border:'1px solid rgba(201,150,58,0.12)',
          padding:'clamp(1.5rem,4vw,2.5rem)', marginBottom:'2.5rem', overflow:'hidden', position:'relative',
        }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'1rem' }}>
            {/* Germany side */}
            <div style={{ textAlign:'center', minWidth:'100px' }}>
              <div style={{ fontSize:'2.5rem', marginBottom:'0.4rem' }}>🇩🇪</div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.2rem', color:'#F5EFE6', fontWeight:500 }}>Germany</div>
              <div style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.65rem', color:'rgba(201,150,58,0.7)', letterSpacing:'0.15em', textTransform:'uppercase' }}>FRA / MUC / BER</div>
            </div>

            {/* Flight path SVG */}
            <div style={{ flex:1, minWidth:'120px', maxWidth:'400px', position:'relative', height:'80px' }}>
              <svg viewBox="0 0 300 80" style={{ width:'100%', height:'100%' }}>
                <defs>
                  <linearGradient id="pathGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#DD0000" stopOpacity="0.6" />
                    <stop offset="50%" stopColor="#C9963A" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#006600" stopOpacity="0.6" />
                  </linearGradient>
                </defs>
                {/* Curved flight path */}
                <path d="M 20 55 Q 150 10 280 55" fill="none" stroke="url(#pathGrad)" strokeWidth="1.5" strokeDasharray="4 3" />
                {/* Plane emoji path approximation */}
                <text x="148" y="22" textAnchor="middle" style={{ fontSize:'16px' }}>✈️</text>
                {/* Distance label */}
                <text x="150" y="72" textAnchor="middle" fill="rgba(201,150,58,0.7)" style={{ fontSize:'8px', fontFamily:'Raleway, sans-serif', letterSpacing:'1px' }}>~6,500 KM · 8–13 HRS</text>
              </svg>
            </div>

            {/* Kenya side */}
            <div style={{ textAlign:'center', minWidth:'100px' }}>
              <div style={{ fontSize:'2.5rem', marginBottom:'0.4rem' }}>🇰🇪</div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.2rem', color:'#F5EFE6', fontWeight:500 }}>Kenya</div>
              <div style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.65rem', color:'rgba(201,150,58,0.7)', letterSpacing:'0.15em', textTransform:'uppercase' }}>NBO → EDL</div>
            </div>
          </div>

          {/* Leg 2 indicator */}
          <div style={{ marginTop:'1.5rem', padding:'0.8rem 1.2rem', background:'rgba(201,150,58,0.06)', border:'1px solid rgba(201,150,58,0.1)', display:'flex', alignItems:'center', gap:'1rem', flexWrap:'wrap' }}>
            <span style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.65rem', letterSpacing:'0.18em', textTransform:'uppercase', color:'rgba(201,150,58,0.75)', whiteSpace:'nowrap' }}>
              {t('Then from Nairobi', 'Dann von Nairobi')}
            </span>
            <div style={{ flex:1, height:'1px', background:'rgba(201,150,58,0.2)', minWidth:'20px' }} />
            <span style={{ fontSize:'1rem' }}>✈️</span>
            <div style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.75rem', color:'#F5EFE6' }}>
              Nairobi (JKIA) → Eldoret (EDL) — <span style={{ color:'#C9963A' }}>45 min</span> &nbsp;|&nbsp;
              {t('Or shuttle bus', 'Oder Shuttle-Bus')} — <span style={{ color:'#C9963A' }}>~4h</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display:'flex', gap:'0', marginBottom:'1.5rem', flexWrap:'wrap' }}>
          {TABS.map(tabId => {
            const labels: Record<Tab, [string,string]> = {
              flights:       ['✈️  Flights from Germany',     '✈️  Flüge aus Deutschland'],
              accommodation: ['🏨  Where to Stay',             '🏨  Unterkunft'],
              tips:          ['📋  Travel Tips',               '📋  Reise-Tipps'],
            };
            const [en, de] = labels[tabId];
            return (
              <button key={tabId} onClick={() => setTab(tabId)} style={{
                padding:'0.75rem 1.4rem',
                background: tab === tabId ? '#C9963A' : 'rgba(255,255,255,0.04)',
                border:`1px solid ${tab === tabId ? '#C9963A' : 'rgba(201,150,58,0.15)'}`,
                color: tab === tabId ? '#FFFCF7' : 'rgba(245,239,230,0.55)',
                fontFamily:"'Raleway',sans-serif", fontSize:'0.7rem', letterSpacing:'0.15em',
                textTransform:'uppercase', cursor:'pointer', transition:'all 0.3s',
                fontWeight: tab === tabId ? 600 : 400,
              }}>
                {t(en, de)}
              </button>
            );
          })}
        </div>

        {/* ── Tab: Flights ── */}
        {tab === 'flights' && (
          <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
            {AIRPORTS.map(apt => (
              <div key={apt.code}
                onClick={() => setFlightExpanded(flightExpanded === apt.code ? null : apt.code)}
                style={{
                  background:'rgba(255,255,255,0.03)', border:`1px solid ${flightExpanded===apt.code ? 'rgba(201,150,58,0.4)' : 'rgba(201,150,58,0.1)'}`,
                  padding:'1.2rem 1.5rem', cursor:'pointer',
                  transition:'all 0.3s', boxSizing:'border-box',
                }}
                onMouseEnter={e => e.currentTarget.style.background='rgba(201,150,58,0.05)'}
                onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.03)'}
              >
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:'1rem', flexWrap:'wrap' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
                    <div style={{ fontSize:'1.5rem' }}>{apt.flag}</div>
                    <div>
                      <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.1rem', color:'#F5EFE6', fontWeight:500 }}>
                        {apt.city} <span style={{ color:'rgba(201,150,58,0.7)', fontSize:'0.85rem' }}>({apt.code})</span>
                      </div>
                      <div style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.72rem', color:'rgba(245,239,230,0.5)', marginTop:'0.15rem' }}>
                        {apt.airline}
                      </div>
                    </div>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:'1.5rem' }}>
                    <div style={{ textAlign:'right' }}>
                      <div style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.65rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'rgba(201,150,58,0.65)' }}>{t('Flight time', 'Flugzeit')}</div>
                      <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.1rem', color:'#C9963A', fontWeight:500 }}>{apt.duration}</div>
                    </div>
                    <span style={{ color:'rgba(201,150,58,0.6)', fontSize:'0.9rem', transition:'transform 0.3s', transform: flightExpanded===apt.code ? 'rotate(180deg)':'none', display:'block' }}>▾</span>
                  </div>
                </div>
                {flightExpanded === apt.code && (
                  <div style={{ marginTop:'1rem', paddingTop:'1rem', borderTop:'1px solid rgba(201,150,58,0.12)' }}>
                    <p style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.82rem', color:'rgba(245,239,230,0.65)', lineHeight:1.85, margin:0 }}>
                      {lang === 'en' ? apt.notes.en : apt.notes.de}
                    </p>
                    <div style={{ display:'flex', gap:'0.8rem', marginTop:'0.9rem', flexWrap:'wrap' }}>
                      <a href="https://www.kenya-airways.com" target="_blank" rel="noreferrer" style={{ display:'inline-block', padding:'0.5rem 1.1rem', background:'rgba(201,150,58,0.12)', border:'1px solid rgba(201,150,58,0.3)', color:'#C9963A', fontFamily:"'Raleway',sans-serif", fontSize:'0.65rem', letterSpacing:'0.18em', textTransform:'uppercase', transition:'all 0.3s' }}>Kenya Airways →</a>
                      <a href="https://www.google.com/flights" target="_blank" rel="noreferrer" style={{ display:'inline-block', padding:'0.5rem 1.1rem', background:'rgba(201,150,58,0.06)', border:'1px solid rgba(201,150,58,0.18)', color:'rgba(245,239,230,0.6)', fontFamily:"'Raleway',sans-serif", fontSize:'0.65rem', letterSpacing:'0.18em', textTransform:'uppercase', transition:'all 0.3s' }}>Google Flights →</a>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Group travel note */}
            <div style={{ marginTop:'0.5rem', padding:'1.2rem 1.5rem', background:'rgba(45,74,45,0.15)', border:'1px solid rgba(45,74,45,0.3)' }}>
              <div style={{ display:'flex', gap:'0.8rem', alignItems:'flex-start' }}>
                <span style={{ fontSize:'1.3rem', flexShrink:0 }}>🤝</span>
                <div>
                  <div style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.72rem', fontWeight:600, letterSpacing:'0.15em', textTransform:'uppercase', color:'rgba(201,150,58,0.85)', marginBottom:'0.4rem' }}>
                    {t('Group Travel Coordination', 'Gruppenreise-Koordination')}
                  </div>
                  <p style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.8rem', color:'rgba(245,239,230,0.6)', lineHeight:1.8, margin:0 }}>
                    {t(
                      'If you\'re coming from Germany, reach out to Sarah directly. She\'ll create a WhatsApp group to coordinate flights, shared transfers, and accommodation for German guests.',
                      'Wenn du aus Deutschland kommst, wende dich direkt an Sarah. Sie erstellt eine WhatsApp-Gruppe zur Koordination von Flügen, Transfers und Unterkunft für deutsche Gäste.'
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Tab: Accommodation ── */}
        {tab === 'accommodation' && (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap:'1rem' }}>
            {HOTELS.map(h => (
              <div key={h.name} style={{
                background:'rgba(255,255,255,0.04)', border:'1px solid rgba(201,150,58,0.1)',
                padding:'1.5rem', position:'relative', overflow:'hidden',
                transition:'all 0.35s',
              }}
              onMouseEnter={e => { e.currentTarget.style.border='1px solid rgba(201,150,58,0.35)'; e.currentTarget.style.background='rgba(201,150,58,0.05)'; }}
              onMouseLeave={e => { e.currentTarget.style.border='1px solid rgba(201,150,58,0.1)'; e.currentTarget.style.background='rgba(255,255,255,0.04)'; }}
              >
                {h.tag && (
                  <div style={{ position:'absolute', top:0, right:0, background:h.tagColor, padding:'0.3rem 0.8rem', fontFamily:"'Raleway',sans-serif", fontSize:'0.58rem', letterSpacing:'0.18em', textTransform:'uppercase', color:'#fff' }}>
                    {lang === 'en' ? h.tag.en : h.tag.de}
                  </div>
                )}
                <div style={{ display:'flex', gap:'0.3rem', marginBottom:'0.7rem' }}>
                  {Array.from({length:h.stars}).map((_,i) => <span key={i} style={{ color:'#C9963A', fontSize:'0.8rem' }}>★</span>)}
                </div>
                <h4 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.05rem', color:'#F5EFE6', fontWeight:500, margin:'0 0 0.5rem', lineHeight:1.3 }}>{h.name}</h4>
                <p style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.75rem', color:'rgba(245,239,230,0.55)', lineHeight:1.7, margin:'0 0 0.8rem' }}>
                  {lang === 'en' ? h.feature.en : h.feature.de}
                </p>
                <div style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.68rem', color:'#C9963A', letterSpacing:'0.08em', fontWeight:600 }}>{h.price}</div>
              </div>
            ))}
            <div style={{ gridColumn:'1/-1', padding:'1.2rem 1.5rem', background:'rgba(201,150,58,0.06)', border:'1px solid rgba(201,150,58,0.15)', fontFamily:"'Raleway',sans-serif", fontSize:'0.78rem', color:'rgba(245,239,230,0.6)', lineHeight:1.8 }}>
              📍 {t('All hotels are within 5–15 min drive of the venue. The wedding team will help guests book and arrange shared transport. Contact us early — December is busy!', 'Alle Hotels sind 5–15 Minuten vom Veranstaltungsort entfernt. Das Hochzeitsteam hilft bei Buchung und Transport. Frühzeitig melden — Dezember ist viel los!')}
            </div>
          </div>
        )}

        {/* ── Tab: Tips ── */}
        {tab === 'tips' && (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap:'1rem' }}>
            {TIPS.map((tip, i) => (
              <div key={i} style={{
                background:'rgba(255,255,255,0.03)', border:'1px solid rgba(201,150,58,0.1)',
                padding:'1.4rem', display:'flex', gap:'1rem', alignItems:'flex-start',
                transition:'all 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.border='1px solid rgba(201,150,58,0.3)'; e.currentTarget.style.transform='translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.border='1px solid rgba(201,150,58,0.1)'; e.currentTarget.style.transform='none'; }}
              >
                <span style={{ fontSize:'1.6rem', flexShrink:0, lineHeight:1 }}>{tip.icon}</span>
                <div>
                  <div style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.72rem', fontWeight:600, letterSpacing:'0.15em', textTransform:'uppercase', color:'rgba(201,150,58,0.85)', marginBottom:'0.4rem' }}>
                    {lang === 'en' ? tip.title.en : tip.title.de}
                  </div>
                  <p style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.78rem', color:'rgba(245,239,230,0.58)', lineHeight:1.8, margin:0 }}>
                    {lang === 'en' ? tip.body.en : tip.body.de}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}