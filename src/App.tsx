import { useState, useEffect } from 'react';
import { LangProvider } from './components/Langcontext';
import { useScrollReveal } from './components/Usescrollreveal';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import OurStory from './components/Ourstory';
import EventSection from './components/EventSection';
import Travel from './components/Travel';
import { Gallery, RSVP, Footer } from './components/Sections';

// Custom cursor
function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [ring, setRing] = useState({ x: -100, y: -100 });
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    let rx = -100, ry = -100;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    const lerp = () => {
      rx += (pos.x - rx) * 0.12;
      ry += (pos.y - ry) * 0.12;
      setRing({ x: rx, y: ry });
      raf = requestAnimationFrame(lerp);
    };
    raf = requestAnimationFrame(lerp);
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      cancelAnimationFrame(raf);
    };
  }, [pos.x, pos.y]);

  return (
    <>
      <div style={{
        position: 'fixed', left: pos.x, top: pos.y,
        width: clicking ? '6px' : '8px', height: clicking ? '6px' : '8px',
        borderRadius: '50%', background: '#C9963A',
        transform: 'translate(-50%,-50%)', pointerEvents: 'none',
        zIndex: 9998, transition: 'width 0.2s, height 0.2s',
      }} />
      <div style={{
        position: 'fixed', left: ring.x, top: ring.y,
        width: clicking ? '24px' : '36px', height: clicking ? '24px' : '36px',
        borderRadius: '50%', border: '1px solid rgba(201,150,58,0.5)',
        transform: 'translate(-50%,-50%)', pointerEvents: 'none',
        zIndex: 9997, transition: 'width 0.3s, height 0.3s',
      }} />
    </>
  );
}

// Inner app that uses hooks
function AppInner() {
  useScrollReveal();

  return (
    <>
      <Cursor />
      <Navbar />
      <Hero />
      <OurStory />
      <EventSection />
      <Travel />
      <Gallery />
      <RSVP />
      <Footer />
    </>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <LangProvider>
      <Loader onDone={() => setLoaded(true)} />
      <div style={{
        opacity: loaded ? 1 : 0,
        transition: 'opacity 0.6s ease 0.2s',
        visibility: loaded ? 'visible' : 'hidden',
      }}>
        <AppInner />
      </div>
    </LangProvider>
  );
}