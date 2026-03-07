export default function Footer() {
  const links = ['Home','Our Story','Events','Gallery','RSVP'];
  return (
    <footer style={{ background: '#1a0f08', padding: 'clamp(3rem,8vw,5rem) 0 clamp(1.5rem,4vw,2.5rem)' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,7vw,3rem)', fontWeight: 300, color: '#f5efe6', marginBottom: '0.2rem' }}>
          Billy &amp; Sarah
        </div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.6rem,2vw,0.68rem)', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(200,160,80,0.7)', marginBottom: '1.8rem' }}>
          28 · December · 2026 · Eldoret
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1.8rem' }}>
          <div style={{ width: '70px', height: '1px', background: 'rgba(200,160,80,0.18)' }} />
          <span style={{ color: 'rgba(200,160,80,0.45)', fontSize: '0.65rem' }}>✦</span>
          <div style={{ width: '70px', height: '1px', background: 'rgba(200,160,80,0.18)' }} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.2rem 1rem', marginBottom: '1.5rem' }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(' ','-')}`} style={{
              fontFamily: 'var(--font-body)', fontSize: 'clamp(0.6rem,2vw,0.68rem)',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'rgba(245,239,230,0.42)', textDecoration: 'none',
              padding: '0.3rem 0.2rem', transition: 'color 0.3s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(200,160,80,0.9)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,239,230,0.42)'}
            >
              {l}
            </a>
          ))}
        </div>

        <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'clamp(0.85rem,2.5vw,0.95rem)', color: 'rgba(245,239,230,0.35)', maxWidth: '440px', margin: '0 auto 1.5rem', lineHeight: 1.7 }}>
          "Many waters cannot quench love; rivers cannot sweep it away." — Song of Solomon 8:7
        </p>

        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', letterSpacing: '0.12em', color: 'rgba(245,239,230,0.18)', margin: 0 }}>
          © 2026 Billy &amp; Sarah · Made with ♥
        </p>
      </div>
    </footer>
  );
}