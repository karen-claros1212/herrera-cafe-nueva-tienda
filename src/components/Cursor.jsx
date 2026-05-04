import React, { useState, useEffect, useRef } from 'react';

const Cursor = () => {
  const [hidden, setHidden] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  const lerp = (a, b, t) => a + (b - a) * t;

  useEffect(() => {
    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
    };

    const onMouseLeave = () => setHidden(true);
    const onMouseEnter = () => setHidden(false);

    const onHoverStart = (e) => {
      if (e.target.closest('a, button, [data-cursor-hover]')) setIsHovered(true);
    };
    const onHoverEnd = (e) => {
      if (e.target.closest('a, button, [data-cursor-hover]')) setIsHovered(false);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseover', onHoverStart);
    document.addEventListener('mouseout', onHoverEnd);

    const animate = () => {
      ringPos.current.x = lerp(ringPos.current.x, mouseRef.current.x, 0.1);
      ringPos.current.y = lerp(ringPos.current.y, mouseRef.current.y, 0.1);
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`;
      }
      requestAnimationFrame(animate);
    };
    const raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseover', onHoverStart);
      document.removeEventListener('mouseout', onHoverEnd);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <style>{`
        * { cursor: none !important; }
        @media (pointer: coarse) { * { cursor: auto !important; } }
      `}</style>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          backgroundColor: '#c9a87c',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          transition: 'opacity 0.3s ease',
          opacity: hidden ? 0 : 1,
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          border: '1.5px solid #c9a87c',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99998,
          transition: `opacity 0.3s ease, width 0.3s ease, height 0.3s ease, background-color 0.3s ease`,
          opacity: hidden ? 0 : 1,
          width: isHovered ? 56 : 40,
          height: isHovered ? 56 : 40,
          backgroundColor: isHovered ? 'rgba(201, 168, 124, 0.08)' : 'transparent',
        }}
      />
    </>
  );
};

export default Cursor;
