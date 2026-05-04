import React, { useEffect, useRef } from 'react';
import { formatCOP } from '../data/catalog';

const CartDrawer = ({
  cart = [],
  onClose,
  onRemove,
  onQtyChange,
  onCheckout,
  checkoutLoading = false,
}) => {
  const overlayRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    // Animate in
    requestAnimationFrame(() => {
      if (panelRef.current) panelRef.current.style.transform = 'translateX(0)';
      if (overlayRef.current) overlayRef.current.style.opacity = '1';
    });
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const total = cart.reduce((sum, item) => sum + (item.price || 0) * (item.qty || 1), 0);
  const isEmpty = cart.length === 0;

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.6)',
          zIndex: 9998,
          opacity: 0,
          transition: 'opacity 0.35s ease',
        }}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '100%',
          maxWidth: 420,
          height: '100vh',
          backgroundColor: '#141110',
          borderLeft: '1px solid rgba(201, 168, 124, 0.12)',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          transform: 'translateX(100%)',
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: '-4px 0 40px rgba(0,0,0,0.4)',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.2rem 1.5rem',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.3rem',
              color: '#c9a87c',
              fontWeight: 500,
            }}
          >
            Tu Carrito
          </span>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'rgba(255,255,255,0.4)',
              fontSize: '1.5rem',
              padding: '0.25rem',
              lineHeight: 1,
            }}
            aria-label="Cerrar carrito"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1rem 1.5rem',
          }}
        >
          {isEmpty ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                opacity: 0.4,
                textAlign: 'center',
                gap: '1rem',
              }}
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#c9a87c" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  color: 'rgba(255,255,255,0.5)',
                  fontSize: '0.9rem',
                  fontWeight: 300,
                }}
              >
                Tu carrito está vacío
              </span>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div
                key={item.variantId || idx}
                style={{
                  display: 'flex',
                  gap: '1rem',
                  padding: '1rem 0',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                {/* Thumbnail */}
                <div
                  style={{
                    width: 64,
                    height: 64,
                    backgroundColor: 'rgba(255,255,255,0.04)',
                    borderRadius: 2,
                    overflow: 'hidden',
                    flexShrink: 0,
                  }}
                >
                  {item.img && (
                    <img
                      src={item.img}
                      alt={item.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  )}
                </div>

                {/* Details */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontFamily: 'var(--font-serif)',
                          color: '#fff',
                          fontSize: '0.95rem',
                          display: 'block',
                          fontWeight: 500,
                        }}
                      >
                        {item.title}
                      </span>
                      {item.variantTitle && (
                        <span
                          style={{
                            fontFamily: 'var(--font-sans)',
                            color: 'rgba(255,255,255,0.35)',
                            fontSize: '0.75rem',
                            fontWeight: 300,
                          }}
                        >
                          {item.variantTitle}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => onRemove(item.variantId || idx)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'rgba(255,255,255,0.2)',
                        fontSize: '1rem',
                        padding: '0.1rem',
                        lineHeight: 1,
                        transition: 'color 0.2s ease',
                      }}
                      onMouseEnter={(e) => (e.target.style.color = '#c9a87c')}
                      onMouseLeave={(e) => (e.target.style.color = 'rgba(255,255,255,0.2)')}
                      aria-label="Eliminar"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Price + Qty controls */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: '0.5rem',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        color: '#c9a87c',
                        fontSize: '0.85rem',
                        fontWeight: 400,
                      }}
                    >
                      {formatCOP(item.price * (item.qty || 1))}
                    </span>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                      }}
                    >
                      <button
                        onClick={() =>
                          onQtyChange(item.variantId || idx, (item.qty || 1) - 1)
                        }
                        disabled={(item.qty || 1) <= 1}
                        style={{
                          width: 28,
                          height: 28,
                          background: 'rgba(255,255,255,0.06)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          color: '#fff',
                          fontSize: '0.85rem',
                          cursor: (item.qty || 1) <= 1 ? 'not-allowed' : 'pointer',
                          opacity: (item.qty || 1) <= 1 ? 0.3 : 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        aria-label="Reducir cantidad"
                      >
                        −
                      </button>
                      <span
                        style={{
                          fontFamily: 'var(--font-sans)',
                          color: '#fff',
                          fontSize: '0.85rem',
                          minWidth: 24,
                          textAlign: 'center',
                          fontWeight: 400,
                        }}
                      >
                        {item.qty || 1}
                      </span>
                      <button
                        onClick={() =>
                          onQtyChange(item.variantId || idx, (item.qty || 1) + 1)
                        }
                        style={{
                          width: 28,
                          height: 28,
                          background: 'rgba(255,255,255,0.06)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          color: '#fff',
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        aria-label="Aumentar cantidad"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {!isEmpty && (
          <div
            style={{
              padding: '1.2rem 1.5rem',
              borderTop: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  color: 'rgba(255,255,255,0.5)',
                  fontSize: '0.85rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontWeight: 300,
                }}
              >
                Total
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  color: '#c9a87c',
                  fontSize: '1.3rem',
                  fontWeight: 600,
                }}
              >
                {formatCOP(total)}
              </span>
            </div>

            <button
              onClick={onCheckout}
              disabled={checkoutLoading || isEmpty}
              style={{
                width: '100%',
                padding: '0.9rem 0',
                background: checkoutLoading
                  ? 'rgba(201, 168, 124, 0.5)'
                  : 'linear-gradient(135deg, #c9a87c 0%, #b8965e 100%)',
                color: '#0f0d0c',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                border: 'none',
                cursor: checkoutLoading ? 'not-allowed' : 'pointer',
                opacity: checkoutLoading ? 0.7 : 1,
                transition: 'transform 0.25s ease',
              }}
              onMouseEnter={(e) => {
                if (!checkoutLoading) e.target.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
              }}
            >
              {checkoutLoading ? 'Procesando...' : 'Pagar'}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
