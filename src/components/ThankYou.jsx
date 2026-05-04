import React, { useEffect, useState } from 'react';

const ThankYou = ({
  orderNumber = '',
  customerEmail = '',
  onHome,
}) => {
  const onContinueShopping = onHome;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const ringCount = 3;
  const rings = Array.from({ length: ringCount }, (_, i) => ({
    size: 80 + i * 120,
    borderWidth: 1.5 - i * 0.3,
    delay: i * 1.2,
    duration: 4 + i * 0.8,
    opacity: 0.3 - i * 0.08,
  }));

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0f0d0c',
        overflow: 'hidden',
        padding: '2rem',
      }}
    >
      {/* Animated rings */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        {rings.map((ring, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: ring.size,
              height: ring.size,
              marginLeft: -ring.size / 2,
              marginTop: -ring.size / 2,
              borderRadius: '50%',
              border: `${ring.borderWidth}px solid #c9a87c`,
              opacity: 0,
              animation: mounted
                ? `ringPulse ${ring.duration}s ease-out ${ring.delay}s infinite`
                : 'none',
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes ringPulse {
          0% { transform: scale(0.3); opacity: 0.35; }
          50% { opacity: 0.15; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          maxWidth: 520,
          animation: 'fadeUp 0.8s ease-out forwards',
        }}
      >
        {/* Checkmark icon */}
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            border: '2px solid #c9a87c',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 2rem',
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#c9a87c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        {/* Gradient text */}
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '3rem',
            fontWeight: 600,
            margin: '0 0 0.75rem',
            background: 'linear-gradient(135deg, #c9a87c 0%, #e8d5b5 50%, #c9a87c 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '0.02em',
          }}
        >
          ¡Gracias por tu compra!
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-sans)',
            color: 'rgba(255,255,255,0.6)',
            fontSize: '1rem',
            lineHeight: 1.7,
            margin: '0 0 1.5rem',
            fontWeight: 300,
          }}
        >
          Estamos preparando tu café con todo el cuidado que merece.
          Recibirás un correo de confirmación en{' '}
          <span style={{ color: '#c9a87c' }}>{customerEmail || 'tu correo'}</span>
          {' '}con los detalles de tu envío.
        </p>

        {orderNumber && (
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              color: 'rgba(255,255,255,0.4)',
              fontSize: '0.85rem',
              margin: '0 0 2rem',
              fontWeight: 300,
              letterSpacing: '0.05em',
            }}
          >
            Pedido #{orderNumber}
          </p>
        )}

        {/* Gold CTA */}
        <button
          onClick={onContinueShopping}
          style={{
            background: 'linear-gradient(135deg, #c9a87c 0%, #b8965e 100%)',
            color: '#0f0d0c',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.9rem',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            padding: '0.9rem 2.5rem',
            border: 'none',
            borderRadius: 0,
            cursor: 'pointer',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            boxShadow: '0 4px 20px rgba(201, 168, 124, 0.25)',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 30px rgba(201, 168, 124, 0.35)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 20px rgba(201, 168, 124, 0.25)';
          }}
        >
          Seguir comprando
        </button>
      </div>
    </div>
  );
};

export default ThankYou;
