import React, { useRef, useEffect } from 'react';

const MarqueeStrip = ({
  text = 'ENVÍO GRATIS EN PEDIDOS MAYORES A $80,000 • CAFÉ 100% COLOMBIANO • HUELLA HÍDRICA CERO • ',
  speed = 20,
  fontSize = '0.85rem',
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scrollWidth = el.scrollWidth / 2;
    const duration = scrollWidth / speed;

    el.style.setProperty('--duration', `${duration}s`);
    el.style.setProperty('--scroll-width', `${scrollWidth}px`);
  }, [speed, text]);

  return (
    <div
      style={{
        width: '100%',
        overflow: 'hidden',
        backgroundColor: 'rgba(201, 168, 124, 0.08)',
        borderTop: '1px solid rgba(201, 168, 124, 0.1)',
        borderBottom: '1px solid rgba(201, 168, 124, 0.1)',
        padding: '0.5rem 0',
        position: 'relative',
      }}
    >
      <style>{`
        .marquee-track {
          display: flex;
          white-space: nowrap;
          will-change: transform;
          animation: marqueeScroll var(--duration, 30s) linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-1 * var(--scroll-width, 1000px))); }
        }
      `}</style>
      <div className="marquee-track" ref={containerRef}>
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize,
            color: '#c9a87c',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontWeight: 300,
            paddingRight: '3rem',
          }}
        >
          {text}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize,
            color: '#c9a87c',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontWeight: 300,
            paddingRight: '3rem',
          }}
        >
          {text}
        </span>
      </div>
    </div>
  );
};

export default MarqueeStrip;
