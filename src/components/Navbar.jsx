import React, { useState } from 'react';
import Logo from './Logo';

const navLinks = [
  { label: 'Catálogo', target: '#catalogo' },
  { label: 'Métodos', target: '#metodos' },
  { label: 'Proceso', target: '#proceso' },
];

const Navbar = ({ cartCount = 0, onCartOpen }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (target) => {
    setMobileOpen(false);
    if (typeof window !== 'undefined' && window.lenis) {
      window.lenis.scrollTo(target);
    } else {
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .navbar-menu {
            position: fixed;
            top: 0;
            right: -100%;
            width: 70%;
            max-width: 320px;
            height: 100vh;
            background: rgba(20, 17, 15, 0.97);
            backdrop-filter: blur(20px);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 2rem;
            transition: right 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            z-index: 999;
          }
          .navbar-menu.open {
            right: 0;
          }
          .hamburger {
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 5px;
            cursor: pointer;
            background: none;
            border: none;
            padding: 8px;
            z-index: 1000;
            position: relative;
          }
          .hamburger span {
            width: 24px;
            height: 1.5px;
            background: #c9a87c;
            transition: all 0.3s ease;
          }
          .hamburger.open span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
          }
          .hamburger.open span:nth-child(2) {
            opacity: 0;
          }
          .hamburger.open span:nth-child(3) {
            transform: rotate(-45deg) translate(5px, -5px);
          }
        }
        @media (min-width: 769px) {
          .hamburger { display: none; }
          .navbar-menu { display: flex; gap: 2.5rem; align-items: center; }
          .mobile-overlay { display: none !important; }
        }
      `}</style>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.5)',
            zIndex: 998,
          }}
        />
      )}

      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: '0.75rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: scrolled
            ? 'rgba(15, 13, 12, 0.82)'
            : 'rgba(15, 13, 12, 0.4)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(201, 168, 124, 0.08)',
          transition: 'background 0.4s ease, border-bottom 0.4s ease',
        }}
      >
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#hero');
          }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}
        >
          <Logo size={36} />
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.2rem',
              color: '#c9a87c',
              letterSpacing: '0.08em',
              fontWeight: 500,
            }}
          >
            Herrera Café
          </span>
        </a>

        {/* Desktop nav links + cart */}
        <div className="navbar-menu" style={{}}>
          {navLinks.map((link) => (
            <button
              key={link.target}
              onClick={() => handleNavClick(link.target)}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(255,255,255,0.75)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                cursor: 'pointer',
                padding: '0.25rem 0',
                transition: 'color 0.3s ease',
                fontWeight: 300,
              }}
              onMouseEnter={(e) => (e.target.style.color = '#c9a87c')}
              onMouseLeave={(e) => (e.target.style.color = 'rgba(255,255,255,0.75)')}
            >
              {link.label}
            </button>
          ))}

          {/* Cart button */}
          <button
            onClick={onCartOpen}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              padding: '0.25rem',
            }}
            aria-label="Abrir carrito"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c9a87c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {cartCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: -4,
                  right: -6,
                  backgroundColor: '#c9a87c',
                  color: '#0f0d0c',
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`hamburger ${mobileOpen ? 'open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menú"
          style={{ display: 'none' }}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>
    </>
  );
};

export default Navbar;
