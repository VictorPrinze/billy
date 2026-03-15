import { useState,  } from 'react';
import { getAllRSVPs, deleteRSVP, type RSVPEntry } from '../lib/supabase';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'billysarah2026';

// ── Tiny stat card ──
function StatCard({ label, value, color }: { label: string; value: number | string; color: string }) {
  return (
    <div style={{
      background: '#fff', border: `2px solid ${color}`,
      padding: '1.2rem 1.5rem', textAlign: 'center', flex: 1, minWidth: '120px',
    }}>
      <div style={{ fontSize: '2rem', fontWeight: 700, color, fontFamily: "'Playfair Display', serif" }}>{value}</div>
      <div style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888', marginTop: '0.2rem', fontFamily: "'Raleway', sans-serif" }}>{label}</div>
    </div>
  );
}

export default function Admin() {
  const [authed, setAuthed]       = useState(false);
  const [pw, setPw]               = useState('');
  const [showPw, setShowPw]       = useState(false);
  const [pwError, setPwError]     = useState(false);
  const [rsvps, setRsvps]         = useState<RSVPEntry[]>([]);
  const [loading, setLoading]     = useState(false);
  const [deleting, setDeleting]   = useState<string | null>(null);
  const [search, setSearch]       = useState('');
  const [filter, setFilter]       = useState<'all' | 'yes' | 'no' | 'maybe'>('all');
  const [error, setError]         = useState('');

  const login = () => {
    if (pw === ADMIN_PASSWORD) {
      setAuthed(true);
      loadData();
    } else {
      setPwError(true);
      setTimeout(() => setPwError(false), 1500);
    }
  };

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getAllRSVPs();
      setRsvps(data);
    } catch (e: any) {
      setError('Failed to load RSVPs. Check your Supabase connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Remove ${name} from the list?`)) return;
    setDeleting(id);
    try {
      await deleteRSVP(id);
      setRsvps(prev => prev.filter(r => r.id !== id));
    } catch {
      alert('Delete failed — try again');
    } finally {
      setDeleting(null);
    }
  };

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Guests', 'Attending', 'Meal', 'Language', 'Message', 'Submitted'];
    const rows = filtered.map(r => [
      r.name, r.email, r.phone || '', r.guests,
      r.attendance, r.meal || '', r.language || '',
      (r.message || '').replace(/,/g, ' '),
      r.created_at ? new Date(r.created_at).toLocaleDateString() : '',
    ]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'billy-sarah-rsvp.csv'; a.click();
  };

  const filtered = rsvps
    .filter(r => filter === 'all' || r.attendance === filter)
    .filter(r =>
      !search ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase())
    );

  const attending   = rsvps.filter(r => r.attendance === 'yes');
  const declining   = rsvps.filter(r => r.attendance === 'no');
  const pending     = rsvps.filter(r => r.attendance === 'maybe');
  const totalGuests = attending.reduce((sum, r) => sum + (r.guests || 1), 0);

  // ── Login screen ──
  if (!authed) return (
    <div style={{
      minHeight: '100vh', background: '#FFFCF5',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Raleway', sans-serif",
      cursor: 'default',
    }}>
      <div style={{
        background: '#fff', padding: '3rem', width: '360px',
        boxShadow: '0 8px 40px rgba(92,61,34,0.12)',
        borderTop: '3px solid #D4A043', textAlign: 'center',
      }}>
        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💍</div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', color: '#5C3D22', margin: '0 0 0.3rem' }}>
          Billy & Sarah
        </h2>
        <p style={{ fontSize: '0.72rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#D4A043', margin: '0 0 2rem' }}>
          RSVP Admin
        </p>

        <div style={{ position:'relative' }}>
          <input
            type={showPw ? 'text' : 'password'}
            placeholder="Enter admin password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && login()}
            style={{
              width: '100%', padding: '0.85rem 3rem 0.85rem 1rem',
              border: `1px solid ${pwError ? '#BB0000' : 'rgba(92,61,34,0.2)'}`,
              fontFamily: "'Raleway', sans-serif", fontSize: '0.9rem',
              outline: 'none', boxSizing: 'border-box', borderRadius: 0,
              animation: pwError ? 'shake 0.4s ease' : 'none',
              background: pwError ? '#fff5f5' : '#fff',
              transition: 'border-color 0.3s, background 0.3s',
            }}
          />
          <button
            onClick={() => setShowPw(p => !p)}
            style={{
              position:'absolute', right:'10px', top:'50%', transform:'translateY(-50%)',
              background:'none', border:'none', cursor:'pointer',
              color:'rgba(92,61,34,0.45)', fontSize:'1rem', padding:'4px',
              transition:'color 0.2s', lineHeight:1,
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#D4A043'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(92,61,34,0.45)'}
            title={showPw ? 'Hide password' : 'Show password'}
          >
            {showPw ? '🙈' : '👁️'}
          </button>
        </div>
        {pwError && (
          <p style={{ color: '#BB0000', fontSize: '0.72rem', margin: '0.4rem 0 0', textAlign: 'left' }}>
            Incorrect password
          </p>
        )}

        <button onClick={login} style={{
          width: '100%', marginTop: '1rem', padding: '0.9rem',
          background: 'linear-gradient(135deg, #D4A043, #A87825)',
          color: '#fff', border: 'none', cursor: 'pointer',
          fontFamily: "'Raleway', sans-serif", fontSize: '0.72rem',
          letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 600,
          transition: 'opacity 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          Enter Dashboard
        </button>
      </div>
      <style>{`@keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-6px)} 75%{transform:translateX(6px)} }`}</style>
    </div>
  );

  // ── Dashboard ──
  return (
    <div style={{ minHeight: '100vh', background: '#F8F4EE', fontFamily: "'Raleway', sans-serif", cursor: 'default' }}>

      {/* Header */}
      <div style={{ background: '#5C3D22', padding: '1.2rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", color: '#FDF8EB', fontSize: '1.4rem', margin: 0, fontWeight: 400 }}>
            Billy & Sarah — RSVP Dashboard
          </h1>
          <p style={{ color: 'rgba(253,248,235,0.5)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0.2rem 0 0' }}>
            28 December 2026 · Eldoret, Kenya
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <button onClick={loadData} style={{
            padding: '0.6rem 1.2rem', background: 'rgba(212,160,67,0.15)',
            border: '1px solid rgba(212,160,67,0.4)', color: '#D4A043',
            cursor: 'pointer', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase',
          }}>↻ Refresh</button>
          <button onClick={exportCSV} style={{
            padding: '0.6rem 1.2rem', background: '#D4A043',
            border: 'none', color: '#fff',
            cursor: 'pointer', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600,
          }}>↓ Export CSV</button>
          <button onClick={() => setAuthed(false)} style={{
            padding: '0.6rem 1.2rem', background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(253,248,235,0.5)',
            cursor: 'pointer', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase',
          }}>Logout</button>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem clamp(1rem,3vw,2rem)' }}>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <StatCard label="Total RSVPs"    value={rsvps.length}    color="#D4A043" />
          <StatCard label="Attending"      value={attending.length} color="#2E7D32" />
          <StatCard label="Total Guests"   value={totalGuests}      color="#1565C0" />
          <StatCard label="Declining"      value={declining.length} color="#BB0000" />
          <StatCard label="Pending"        value={pending.length}   color="#E65100" />
        </div>

        {/* Search + Filter */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem', alignItems: 'center' }}>
          <input
            placeholder="Search by name or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              flex: 1, minWidth: '200px', padding: '0.75rem 1rem',
              border: '1px solid rgba(92,61,34,0.2)', background: '#fff',
              fontFamily: "'Raleway', sans-serif", fontSize: '0.88rem',
              outline: 'none', borderRadius: 0,
            }}
          />
          {(['all', 'yes', 'no', 'maybe'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: '0.75rem 1.2rem',
              background: filter === f ? '#5C3D22' : '#fff',
              color: filter === f ? '#FDF8EB' : '#8B6040',
              border: '1px solid rgba(92,61,34,0.2)',
              cursor: 'pointer', fontSize: '0.7rem',
              letterSpacing: '0.15em', textTransform: 'uppercase',
              transition: 'all 0.2s',
            }}>
              {f === 'all' ? 'All' : f === 'yes' ? '✓ Attending' : f === 'no' ? '✗ Declining' : '? Pending'}
              {' '}
              <span style={{ opacity: 0.6 }}>
                ({f === 'all' ? rsvps.length : rsvps.filter(r => r.attendance === f).length})
              </span>
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div style={{ background: '#fff5f5', border: '1px solid #BB0000', padding: '1rem', marginBottom: '1rem', color: '#BB0000', fontSize: '0.85rem' }}>
            {error}
          </div>
        )}

        {/* Table */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#D4A043', fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Loading RSVPs...
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#9A7050', fontSize: '0.85rem' }}>
            {rsvps.length === 0 ? 'No RSVPs yet — share the site!' : 'No results match your search.'}
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', boxShadow: '0 2px 16px rgba(92,61,34,0.08)' }}>
              <thead>
                <tr style={{ background: '#5C3D22' }}>
                  {['Name', 'Contact', 'Guests', 'Attending', 'Meal', 'Language', 'Message', 'Date', ''].map(h => (
                    <th key={h} style={{
                      padding: '0.85rem 1rem', textAlign: 'left',
                      fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                      color: 'rgba(253,248,235,0.7)', fontWeight: 600, whiteSpace: 'nowrap',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, i) => (
                  <tr key={r.id} style={{ background: i % 2 === 0 ? '#fff' : '#FDFAF5', borderBottom: '1px solid rgba(92,61,34,0.06)', transition: 'background 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#FFF8ED')}
                    onMouseLeave={e => (e.currentTarget.style.background = i % 2 === 0 ? '#fff' : '#FDFAF5')}
                  >
                    <td style={{ padding: '0.85rem 1rem', fontWeight: 600, color: '#5C3D22', fontSize: '0.88rem', whiteSpace: 'nowrap' }}>{r.name}</td>
                    <td style={{ padding: '0.85rem 1rem', fontSize: '0.78rem', color: '#8B6040' }}>
                      <div>{r.email}</div>
                      {r.phone && <div style={{ color: '#aaa', marginTop: '0.2rem' }}>{r.phone}</div>}
                    </td>
                    <td style={{ padding: '0.85rem 1rem', textAlign: 'center', fontSize: '0.88rem', color: '#5C3D22', fontWeight: 600 }}>{r.guests}</td>
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <span style={{
                        display: 'inline-block', padding: '0.25rem 0.7rem',
                        fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600,
                        background: r.attendance === 'yes' ? '#E8F5E9' : r.attendance === 'no' ? '#FFEBEE' : '#FFF3E0',
                        color:      r.attendance === 'yes' ? '#2E7D32' : r.attendance === 'no' ? '#BB0000' : '#E65100',
                        border: `1px solid ${r.attendance === 'yes' ? '#A5D6A7' : r.attendance === 'no' ? '#EF9A9A' : '#FFCC80'}`,
                      }}>
                        {r.attendance === 'yes' ? '✓ Yes' : r.attendance === 'no' ? '✗ No' : '? Maybe'}
                      </span>
                    </td>
                    <td style={{ padding: '0.85rem 1rem', fontSize: '0.8rem', color: '#8B6040' }}>{r.meal || '—'}</td>
                    <td style={{ padding: '0.85rem 1rem', fontSize: '0.8rem', color: '#8B6040' }}>
                      {r.language === 'en' ? '🇬🇧 EN' : r.language === 'de' ? '🇩🇪 DE' : r.language === 'sw' ? '🇰🇪 SW' : '—'}
                    </td>
                    <td style={{ padding: '0.85rem 1rem', fontSize: '0.78rem', color: '#8B6040', maxWidth: '200px' }}>
                      {r.message ? (
                        <span title={r.message} style={{ cursor: 'help' }}>
                          {r.message.length > 40 ? r.message.slice(0, 40) + '…' : r.message}
                        </span>
                      ) : '—'}
                    </td>
                    <td style={{ padding: '0.85rem 1rem', fontSize: '0.75rem', color: '#aaa', whiteSpace: 'nowrap' }}>
                      {r.created_at ? new Date(r.created_at).toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' }) : '—'}
                    </td>
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <button
                        onClick={() => handleDelete(r.id!, r.name)}
                        disabled={deleting === r.id}
                        style={{
                          padding: '0.35rem 0.8rem', background: 'none',
                          border: '1px solid rgba(187,0,0,0.25)', color: '#BB0000',
                          cursor: 'pointer', fontSize: '0.65rem', letterSpacing: '0.1em',
                          textTransform: 'uppercase', transition: 'all 0.2s',
                          opacity: deleting === r.id ? 0.4 : 1,
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#BB0000'; e.currentTarget.style.color = '#fff'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#BB0000'; }}
                      >
                        {deleting === r.id ? '…' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p style={{ fontSize: '0.7rem', color: '#aaa', marginTop: '0.8rem', textAlign: 'right' }}>
              Showing {filtered.length} of {rsvps.length} entries
            </p>
          </div>
        )}
      </div>
    </div>
  );
}