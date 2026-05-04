import React, { useState, useEffect, useRef } from 'react';
import OptionSelector from './OptionSelector';
import { formatCOP, findVariant, getVariantPrice } from '../data/catalog';

const ProductModal = ({ product, onClose, onAddToCart }) => {
  const [qty, setQty] = useState(1);
  const [tipo, setTipo] = useState('');
  const [peso, setPeso] = useState('');
  const [variedad, setVariedad] = useState('');
  const [adding, setAdding] = useState(false);
  const overlayRef = useRef(null);

  const opts = product?.options || {};
  const hasTipo = opts.tipo?.length > 0;
  const hasPeso = opts.peso?.length > 0;
  const hasVariedad = opts.variedad?.length > 0;

  // Auto-select first option for each dimension
  useEffect(() => {
    if (hasTipo && !tipo) setTipo(opts.tipo[0]);
    if (hasPeso && !peso) setPeso(opts.peso[0]);
    if (hasVariedad && !variedad) setVariedad(opts.variedad[0]);
  }, [product]);

  // Reset qty when product changes
  useEffect(() => {
    setQty(1);
    setTipo(hasTipo ? opts.tipo[0] : '');
    setPeso(hasPeso ? opts.peso[0] : '');
    setVariedad(hasVariedad ? opts.variedad[0] : '');
  }, [product?.id]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  // Price based on selected variant
  const variant = findVariant(product, tipo, peso, variedad);
  const price = variant?.price ?? product?.priceMin ?? 0;
  const selectedVariantId = variant?.id ?? null;
  const selectedVariantTitle = variant?.title ?? '';

  const handleAddToCart = () => {
    if (adding) return;
    setAdding(true);
    onAddToCart({
      product,
      variantId: selectedVariantId,
      variantTitle: selectedVariantTitle,
      tipo,
      peso,
      variedad,
      qty,
      price,
    });
    // Brief delay for feedback then close
    setTimeout(() => {
      setAdding(false);
      onClose();
    }, 300);
  };

  if (!product) return null;

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
          backgroundColor: 'rgba(0,0,0,0.7)',
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
      >
        {/* Modal panel */}
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            backgroundColor: '#141110',
            border: '1px solid rgba(201, 168, 124, 0.12)',
            width: '100%',
            maxWidth: 800,
            maxHeight: '90vh',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'row',
            position: 'relative',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '0.75rem',
              right: '0.75rem',
              width: 36,
              height: 36,
              background: 'rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#fff',
              fontSize: '1rem',
              cursor: 'pointer',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              lineHeight: 1,
            }}
            aria-label="Cerrar"
          >
            ✕
          </button>

          {/* Left: Image */}
          <div
            style={{
              width: '50%',
              minHeight: 400,
              backgroundColor: 'rgba(255,255,255,0.02)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <img
              src={product.img}
              alt={product.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>

          {/* Right: Content */}
          <div
            style={{
              width: '50%',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Badge */}
            {product.badge && (
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.6rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  color: '#c9a87c',
                  border: '1px solid #c9a87c',
                  padding: '0.2rem 0.6rem',
                  display: 'inline-block',
                  alignSelf: 'flex-start',
                  marginBottom: '0.75rem',
                  fontWeight: 400,
                }}
              >
                {product.badge}
              </span>
            )}

            {/* Title */}
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                color: '#fff',
                fontSize: '1.6rem',
                fontWeight: 600,
                margin: '0 0 0.35rem',
                lineHeight: 1.2,
              }}
            >
              {product.title}
            </h2>

            {/* Region */}
            {product.region && (
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  color: 'rgba(255,255,255,0.3)',
                  fontSize: '0.75rem',
                  fontWeight: 300,
                  marginBottom: '1rem',
                  letterSpacing: '0.05em',
                }}
              >
                {product.region}
              </span>
            )}

            {/* Editorial data */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.75rem',
                marginBottom: '1.25rem',
              }}
            >
              {product.altitude && (
                <EditorialTag label="Altitud" value={product.altitude} />
              )}
              {product.process && (
                <EditorialTag label="Proceso" value={product.process} />
              )}
              {product.roast && (
                <EditorialTag label="Tostión" value={product.roast} />
              )}
              {product.score && (
                <EditorialTag label="SCA" value={`${product.score}`} />
              )}
            </div>

            {/* Tasting notes */}
            {product.notes && product.notes.length > 0 && (
              <div style={{ marginBottom: '1.25rem' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.65rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    color: 'rgba(255,255,255,0.3)',
                    display: 'block',
                    marginBottom: '0.4rem',
                    fontWeight: 300,
                  }}
                >
                  Notas de cata
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                  {product.notes.map((note) => (
                    <span
                      key={note}
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.7rem',
                        color: '#c9a87c',
                        border: '1px solid rgba(201, 168, 124, 0.2)',
                        padding: '0.15rem 0.6rem',
                        fontWeight: 300,
                        letterSpacing: '0.03em',
                      }}
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            {product.description && (
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  color: 'rgba(255,255,255,0.45)',
                  fontSize: '0.8rem',
                  lineHeight: 1.6,
                  margin: '0 0 1.25rem',
                  fontWeight: 300,
                }}
              >
                {product.description}
              </p>
            )}

            {/* Option selectors */}
            {hasTipo && (
              <OptionSelector
                label="Tipo"
                options={opts.tipo}
                selected={tipo}
                onSelect={setTipo}
              />
            )}
            {hasPeso && (
              <OptionSelector
                label="Peso"
                options={opts.peso}
                selected={peso}
                onSelect={setPeso}
              />
            )}
            {hasVariedad && (
              <OptionSelector
                label="Variedad"
                options={opts.variedad}
                selected={variedad}
                onSelect={setVariedad}
              />
            )}

            {/* Price + Qty + Add to cart */}
            <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
              {/* Price */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '0.5rem',
                  marginBottom: '1rem',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    color: '#c9a87c',
                    fontSize: '1.5rem',
                    fontWeight: 600,
                  }}
                >
                  {formatCOP(price)}
                </span>
                {product.priceMax > price && (
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      color: 'rgba(255,255,255,0.2)',
                      fontSize: '0.85rem',
                      textDecoration: 'line-through',
                      fontWeight: 300,
                    }}
                  >
                    {formatCOP(product.priceMax)}
                  </span>
                )}
              </div>

              {/* Qty + Add */}
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid rgba(255,255,255,0.12)',
                  }}
                >
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    disabled={qty <= 1}
                    style={{
                      width: 38,
                      height: 38,
                      background: 'none',
                      border: 'none',
                      color: qty <= 1 ? 'rgba(255,255,255,0.15)' : '#fff',
                      fontSize: '1rem',
                      cursor: qty <= 1 ? 'not-allowed' : 'pointer',
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
                      fontSize: '0.9rem',
                      minWidth: 32,
                      textAlign: 'center',
                      fontWeight: 400,
                    }}
                  >
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    style={{
                      width: 38,
                      height: 38,
                      background: 'none',
                      border: 'none',
                      color: '#fff',
                      fontSize: '1rem',
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

                <button
                  onClick={handleAddToCart}
                  disabled={adding}
                  style={{
                    flex: 1,
                    padding: '0.75rem 1.5rem',
                    background: adding
                      ? 'rgba(201, 168, 124, 0.5)'
                      : 'linear-gradient(135deg, #c9a87c 0%, #b8965e 100%)',
                    color: '#0f0d0c',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    border: 'none',
                    cursor: adding ? 'not-allowed' : 'pointer',
                    opacity: adding ? 0.7 : 1,
                    transition: 'transform 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!adding) e.target.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  {adding ? 'Agregando...' : 'Agregar al carrito'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Small helper component for editorial data tags
const EditorialTag = ({ label, value }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '0.1rem',
    }}
  >
    <span
      style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '0.55rem',
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
        color: 'rgba(255,255,255,0.25)',
        fontWeight: 300,
      }}
    >
      {label}
    </span>
    <span
      style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '0.75rem',
        color: 'rgba(255,255,255,0.6)',
        fontWeight: 400,
      }}
    >
      {value}
    </span>
  </div>
);

export default ProductModal;
