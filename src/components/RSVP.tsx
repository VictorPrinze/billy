import { useState } from 'react';

type FormState = {
  name: string; email: string; phone: string;
  guests: string; attendance: string; meal: string; message: string;
};

export default function RSVP() {
  const [form, setForm] = useState<FormState>({
    name: '', email: '', phone: '', guests: '1', attendance: '', meal: '', message: '',
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
    setErrors(p => ({ ...p, [e.target.name]: '' }));
  };

  const submit = () => {
    const errs: Partial<FormState> = {};
    if (!form.name.trim())    errs.name = 'Please enter your name';
    if (!form.email.trim())   errs.email = 'Please enter your email';
    if (!form.attendance)     errs.attendance = 'Please select your attendance';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitted(true);
  };

  const inp: React.CSSProperties = {
    width: '100%', padding: '0.8rem 1rem',
    border: '1px solid rgba(200,160,80,0.28)',
    background: 'var(--cream)', color: 'var(--text-dark)',
    fontFamily: 'var(--font-body)', fontSize: 'clamp(0.82rem,2.5vw,0.9rem)',
    borderRadius: 0,
  };
  const lbl: React.CSSProperties = {
    display: 'block', fontFamily: 'var(--font-body)',
    fontSize: '0.62rem', letterSpacing: '0.25em',
    textTransform: 'uppercase', color: 'var(--text-light)',
    marginBottom: '0.4rem',
  };
  const err: React.CSSProperties = {
    fontFamily: 'var(--font-body)', fontSize: '0.7rem',
    color: '#b94040', marginTop: '0.25rem',
  };

  if (submitted) {
    return (
      <section id="rsvp" style={{ background: 'var(--brown-rich)', padding: 'clamp(4rem,10vw,7rem) 20px', minHeight: '50vh', display: 'flex', alignItems: 'center' }}>
        <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', color: 'rgba(200,160,80,0.65)', marginBottom: '1.2rem' }}>✦</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,7vw,3.2rem)', fontWeight: 300, color: '#f5efe6', marginBottom: '0.8rem' }}>
            Thank You, {form.name}!
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.85rem,2.5vw,0.95rem)', color: 'rgba(245,239,230,0.7)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
            We've received your RSVP and can't wait to celebrate with you on December 28th, 2026 in Eldoret.
          </p>
          <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'rgba(200,160,80,0.8)', fontSize: '1rem' }}>
            "I have found the one whom my soul loves." — Song of Solomon 3:4
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" style={{ background: 'var(--brown-rich)', padding: 'clamp(3rem,8vw,6rem) 0' }}>
      <div className="container">
        <div className="row align-items-center g-4 g-lg-5">

          {/* Left: copy */}
          <div className="col-12 col-lg-5">
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(200,160,80,0.85)', marginBottom: '0.7rem' }}>Join the Celebration</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,7vw,3.5rem)', fontWeight: 300, color: '#f5efe6', lineHeight: 1.1, marginBottom: '1.2rem' }}>
              Celebrate Our Love With Us
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
              <div style={{ width: '40px', height: '1px', background: 'rgba(200,160,80,0.35)' }} />
              <span style={{ color: 'rgba(200,160,80,0.6)', fontSize: '0.65rem' }}>✦</span>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.82rem,2.5vw,0.9rem)', color: 'rgba(245,239,230,0.65)', lineHeight: 1.85, marginBottom: '1.5rem' }}>
              We would be honored to have you witness our union in love. Please let us know by{' '}
              <strong style={{ color: 'rgba(200,160,80,0.9)' }}>November 28th, 2026</strong> if you'll be joining us.
            </p>
            <blockquote style={{ borderLeft: '2px solid rgba(200,160,80,0.35)', paddingLeft: '1.2rem', margin: 0 }}>
              <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'rgba(245,239,230,0.7)', fontSize: 'clamp(0.92rem,2.5vw,1rem)', lineHeight: 1.7, margin: 0 }}>
                "He who finds a wife finds what is good and receives favor from the Lord."
              </p>
              <cite style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', letterSpacing: '0.15em', color: 'rgba(200,160,80,0.65)', marginTop: '0.4rem', display: 'block' }}>
                — Proverbs 18:22
              </cite>
            </blockquote>
          </div>

          {/* Right: form */}
          <div className="col-12 col-lg-7">
            <div style={{ background: 'var(--cream)', padding: 'clamp(1.5rem,4vw,2.5rem)' }}>
              <div className="row g-3">

                <div className="col-12 col-sm-6">
                  <label style={lbl}>Full Name *</label>
                  <input type="text" name="name" value={form.name} onChange={change}
                    placeholder="Your full name"
                    style={{ ...inp, borderColor: errors.name ? '#b94040' : 'rgba(200,160,80,0.28)' }} />
                  {errors.name && <p style={err}>{errors.name}</p>}
                </div>

                <div className="col-12 col-sm-6">
                  <label style={lbl}>Email Address *</label>
                  <input type="email" name="email" value={form.email} onChange={change}
                    placeholder="your@email.com"
                    style={{ ...inp, borderColor: errors.email ? '#b94040' : 'rgba(200,160,80,0.28)' }} />
                  {errors.email && <p style={err}>{errors.email}</p>}
                </div>

                <div className="col-12 col-sm-6">
                  <label style={lbl}>Phone (optional)</label>
                  <input type="tel" name="phone" value={form.phone} onChange={change}
                    placeholder="+254 700 000 000" style={inp} />
                </div>

                <div className="col-6 col-sm-3">
                  <label style={lbl}>Guests</label>
                  <select name="guests" value={form.guests} onChange={change} style={inp}>
                    {['1','2','3','4','5+'].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>

                <div className="col-6 col-sm-3">
                  <label style={lbl}>Attending? *</label>
                  <select name="attendance" value={form.attendance} onChange={change}
                    style={{ ...inp, borderColor: errors.attendance ? '#b94040' : 'rgba(200,160,80,0.28)' }}>
                    <option value="">Select...</option>
                    <option value="yes">Joyfully accepts</option>
                    <option value="no">Regretfully declines</option>
                    <option value="maybe">Will confirm soon</option>
                  </select>
                  {errors.attendance && <p style={err}>{errors.attendance}</p>}
                </div>

                <div className="col-12">
                  <label style={lbl}>Meal Preference</label>
                  <select name="meal" value={form.meal} onChange={change} style={inp}>
                    <option value="">Select preference...</option>
                    <option value="standard">Standard</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="halal">Halal</option>
                    <option value="gluten-free">Gluten-Free</option>
                  </select>
                </div>

                <div className="col-12">
                  <label style={lbl}>Message for the Couple</label>
                  <textarea name="message" value={form.message} onChange={change} rows={3}
                    placeholder="Share a blessing or special message..."
                    style={{ ...inp, resize: 'vertical' }} />
                </div>

                <div className="col-12">
                  <button onClick={submit} style={{
                    width: '100%', padding: 'clamp(0.8rem,2.5vw,1rem)',
                    background: 'linear-gradient(135deg, var(--brown-rich), var(--brown-mid))',
                    color: '#f5efe6', border: 'none', cursor: 'pointer',
                    fontFamily: 'var(--font-body)', fontSize: 'clamp(0.65rem,2vw,0.72rem)',
                    letterSpacing: '0.3em', textTransform: 'uppercase',
                    transition: 'opacity 0.3s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.82'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                  >
                    Send RSVP
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}