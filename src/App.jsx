import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { RAW_DATA, formatCOP, getVariantId } from './data/catalog';
import { useCatalog } from './hooks/useCatalog';
import useScrollAnimations from './hooks/useScrollAnimations';
import { createShopifyCheckout } from './services/shopify';
import './styles/global.css';

// Componentes
import FontLoader from './components/FontLoader';
import Cursor from './components/Cursor';
import Grain from './components/Grain';
import Navbar from './components/Navbar';
import MarqueeStrip from './components/MarqueeStrip';
import CartDrawer from './components/CartDrawer';
import ProductModal from './components/ProductModal';
import ThankYou from './components/ThankYou';
import Logo from './components/Logo';

// ─── CONSTANTES ──────────────────────────────────────────────────────────
const FILTERS = [
  ['TODOS', 'TODOS'],
  ['TRADICIONALES', 'TRADICIONALES'],
  ['EXÓTICOS', 'EXOTICOS'],
  ['ESPECIALES', 'ESPECIALES'],
];

// ─── SECCIÓN HERO ────────────────────────────────────────────────────────
function HeroSection({ heroProduct, onOpenModal }) {
  return (
    <section id="hero" className="hero-bg" style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      justifyContent: 'center', paddingTop: 72, position: 'relative', overflow: 'hidden'
    }}>
      {/* Círculos decorativos animados */}
      <div className="animate-spin-slow" style={{
        position: 'absolute', top: '10%', right: '5%', width: 260, height: 260,
        borderRadius: '50%', border: '1px solid rgba(201,168,124,0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none'
      }}>
        {[180, 100].map((s, i) => (
          <div key={i} style={{
            width: s, height: s, borderRadius: '50%',
            border: `1px solid rgba(201,168,124,${[0.06, 0.08][i]})`,
            position: i === 0 ? 'absolute' : undefined,
          }} />
        ))}
      </div>

      {/* Side label */}
      <div style={{
        position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%) rotate(-90deg)',
        fontFamily: 'Josefin Sans', fontSize: 8, letterSpacing: '0.4em', textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.2)', whiteSpace: 'nowrap', pointerEvents: 'none'
      }}>
        Finca Bello Horizonte · Huila · Colombia
      </div>

      <div style={{
        maxWidth: 1280, margin: '0 auto', width: '100%',
        padding: '80px 48px', display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: 64, alignItems: 'center'
      }}>
        {/* Columna izquierda — Texto */}
        <div>
          <div className="animate-fade-up" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            border: '1px solid rgba(255,255,255,0.08)', borderRadius: 100,
            padding: '6px 16px', background: 'rgba(255,255,255,0.03)', marginBottom: 28
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%', background: '#c9a87c',
              animation: 'pulse 2s infinite'
            }} />
            <span style={{
              fontFamily: 'Josefin Sans', fontSize: 9, letterSpacing: '0.25em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)'
            }}>
              Cosecha 2025/2026 · Disponible
            </span>
          </div>

          <h1 className="hero-title animate-fade-up delay-100" style={{ marginBottom: 28 }}>
            Café de<br /><em>Especialidad</em><br />Colombiano.
          </h1>

          <p className="animate-fade-up delay-200" style={{
            fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.9,
            maxWidth: 440, marginBottom: 40, fontWeight: 300
          }}>
            Microlotes seleccionados de las fincas más altas del Huila.
            Variedades exóticas, procesos experimentales, trazabilidad completa del árbol a la taza.
          </p>

          <div className="animate-fade-up delay-300" style={{
            display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 48
          }}>
            <button className="btn-gold"
              onClick={() => window.lenis?.scrollTo('#catalogo') || document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })}>
              Explorar Catálogo
            </button>
            <button className="btn-ghost"
              onClick={() => window.lenis?.scrollTo('#proceso') || document.getElementById('proceso')?.scrollIntoView({ behavior: 'smooth' })}>
              Nuestro Proceso
            </button>
          </div>

          <div className="animate-fade-up delay-400" style={{
            display: 'flex', gap: 36, paddingTop: 32,
            borderTop: '1px solid rgba(255,255,255,0.06)'
          }}>
            {[['15+', 'Variedades'], ['92+', 'Puntaje SCA'], ['100%', 'Trazable']].map(([v, l]) => (
              <div key={l}>
                <div style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.8rem', fontWeight: 300, color: '#c9a87c', lineHeight: 1 }}>
                  {v}
                </div>
                <div style={{ fontFamily: 'Josefin Sans', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginTop: 4 }}>
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Columna derecha — Imagen hero */}
        {heroProduct && (
          <div className="animate-scale-in delay-200" style={{
            position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center'
          }}>
            <div style={{
              position: 'absolute', width: 380, height: 380, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(201,168,124,0.12) 0%, transparent 70%)',
              filter: 'blur(40px)', pointerEvents: 'none'
            }} />
            <img
              src={heroProduct.img} alt={heroProduct.title}
              fetchpriority="high"
              onClick={() => onOpenModal(heroProduct)}
              className="animate-float"
              style={{
                width: '100%', maxWidth: 380, objectFit: 'contain',
                position: 'relative', zIndex: 1,
                filter: 'drop-shadow(0 32px 64px rgba(201,168,124,0.15))',
                cursor: 'pointer'
              }}
            />
            {/* Score badge */}
            <div style={{
              position: 'absolute', top: 20, left: 0,
              background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.06)', padding: '12px 16px', borderRadius: 2
            }}>
              <div style={{
                fontFamily: 'Josefin Sans', fontSize: 8, letterSpacing: '0.2em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 3
              }}>
                SCA Score
              </div>
              <div style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.6rem', color: '#c9a87c', lineHeight: 1 }}>
                {heroProduct.score || '92'}
              </div>
            </div>
            {/* Product info card */}
            <div style={{
              position: 'absolute', bottom: 40, right: -20,
              background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.06)', padding: '16px 20px',
              borderRadius: 2, minWidth: 160
            }}>
              <div style={{
                fontFamily: 'Josefin Sans', fontSize: 8, letterSpacing: '0.2em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 4
              }}>
                Variedad Destacada
              </div>
              <div style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.1rem', fontStyle: 'italic', marginBottom: 8 }}>
                {heroProduct.title}
              </div>
              {heroProduct.badge && (
                <span style={{
                  fontSize: 8, letterSpacing: '0.15em', textTransform: 'uppercase',
                  padding: '3px 10px', border: '1px solid rgba(201,168,124,0.4)',
                  color: '#c9a87c', borderRadius: 100
                }}>
                  {heroProduct.badge}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── SECCIÓN CATÁLOGO ───────────────────────────────────────────────────
function CatalogSection({ coffees, filter, onFilterChange, onOpenModal }) {
  const visibleCoffees = useMemo(
    () => filter === 'TODOS' ? coffees : coffees.filter(p => p.tag === filter),
    [coffees, filter]
  );

  return (
    <section id="catalogo" style={{ padding: '100px 48px', maxWidth: 1280, margin: '0 auto' }}>
      <div className="reveal" style={{ marginBottom: 56 }}>
        <div className="section-label" style={{ marginBottom: 12 }}>Nuestro Catálogo</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}>
          <h2 className="section-title">
            Microlotes de<br /><em style={{ fontStyle: 'italic' }}>Excepción.</em>
          </h2>
          <div style={{ display: 'flex', gap: 8 }}>
            {FILTERS.map(([label, val]) => (
              <button
                key={val}
                aria-pressed={filter === val}
                onClick={() => onFilterChange(val)}
                className={`btn-filter ${filter === val ? 'active' : ''}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
        {visibleCoffees.map((p, i) => (
          <div
            key={p.id}
            className={`product-card reveal reveal-delay-${(i % 4) + 1}`}
            onClick={() => onOpenModal(p)}
            tabIndex={0}
            role="button"
            aria-label={`Ver ${p.title}, desde ${formatCOP(p.priceMin)}`}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onOpenModal(p); }}
          >
            <div style={{
              padding: '40px 32px 24px', background: 'rgba(255,255,255,0.02)',
              position: 'relative', display: 'flex', justifyContent: 'center'
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(circle at center, rgba(201,168,124,0.06) 0%, transparent 70%)',
                pointerEvents: 'none'
              }} />
              {p.badge && (
                <div style={{
                  position: 'absolute', top: 12, left: 12, fontFamily: 'Josefin Sans',
                  fontSize: 7, letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: '#c9a87c', background: 'rgba(201,168,124,0.1)',
                  border: '1px solid rgba(201,168,124,0.25)', padding: '3px 10px', borderRadius: 1
                }}>
                  {p.badge}
                </div>
              )}
              <img
                src={p.img} alt={p.title}
                loading="lazy" decoding="async"
                style={{ height: 220, objectFit: 'contain', position: 'relative', transition: 'transform .6s cubic-bezier(.23,1,.32,1)' }}
                onMouseEnter={e => e.target.style.transform = 'scale(1.06)'}
                onMouseLeave={e => e.target.style.transform = 'scale(1)'}
              />
            </div>
            <div style={{ padding: '20px 24px 24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div>
                  <div className="section-label" style={{ marginBottom: 4 }}>{p.region}</div>
                  <h3 style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.4rem', fontWeight: 400, fontStyle: 'italic' }}>
                    {p.title}
                  </h3>
                </div>
                <div style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.1rem', color: '#c9a87c', whiteSpace: 'nowrap' }}>
                  {formatCOP(p.priceMin)}
                </div>
              </div>

              {p.notes?.length > 0 && (
                <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
                  {p.notes.map(n => (
                    <span key={n} style={{ fontSize: 8, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.35)' }}>
                      {n}
                    </span>
                  )).reduce((acc, el, i) =>
                    i ? [...acc, <span key={`s-${i}`} style={{ color: 'rgba(255,255,255,0.2)', fontSize: 8 }}>·</span>, el] : [el], []
                  )}
                </div>
              )}

              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.04)'
              }}>
                <span style={{ fontFamily: 'Josefin Sans', fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gray-4)' }}>
                  {p.process}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#c9a87c' }} />
                  <span style={{ fontFamily: 'Josefin Sans', fontSize: 8, color: '#c9a87c', letterSpacing: '0.1em' }}>
                    SCA {p.score || '—'}
                  </span>
                </div>
              </div>

              <button
                className="btn-gold" style={{ marginTop: 16, width: '100%', fontSize: 9, padding: '11px 16px' }}
                onClick={e => { e.stopPropagation(); onOpenModal(p); }}
              >
                Configurar Compra
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── SECCIÓN MÉTODOS ────────────────────────────────────────────────────
function MethodsSection({ methods }) {
  return (
    <section id="metodos" style={{
      borderTop: '1px solid var(--border)', padding: '100px 48px', maxWidth: 1280, margin: '0 auto'
    }}>
      <div className="reveal" style={{ marginBottom: 56 }}>
        <div className="section-label" style={{ marginBottom: 12 }}>Extracción Perfecta</div>
        <h2 className="section-title">
          Métodos de<br /><em style={{ fontStyle: 'italic' }}>Preparación.</em>
        </h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
        {methods.map((m, i) => (
          <div key={m.id} className={`product-card reveal reveal-delay-${(i % 4) + 1}`}
            style={{ padding: '32px 24px', textAlign: 'center' }}>
            <img src={m.img} alt={m.title} loading="lazy" decoding="async" style={{
              width: '100%', height: 180, objectFit: 'contain', marginBottom: 24,
              mixBlendMode: 'lighten', opacity: 0.9
            }} />
            <div className="section-label" style={{ marginBottom: 8 }}>Equipo Esencial</div>
            <h3 style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.2rem', fontWeight: 400, color: '#f0ece4', marginBottom: 12 }}>
              {m.title}
            </h3>
            <p style={{ fontSize: 11, color: 'var(--gray-4)', lineHeight: 1.6 }}>{m.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── SECCIÓN ORIGEN ──────────────────────────────────────────────────────
function OriginSection() {
  return (
    <section id="proceso" style={{
      background: 'rgba(201,168,124,0.03)', borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)', padding: '100px 48px'
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center'
      }}>
        <div className="reveal">
          <div className="section-label" style={{ marginBottom: 12 }}>Origen & Comunidad</div>
          <h2 className="section-title" style={{ marginBottom: 24 }}>
            Finca Bello<br /><em style={{ fontStyle: 'italic' }}>Horizonte.</em>
          </h2>
          <div style={{ width: 48, height: 1, background: 'var(--gold)', opacity: 0.5, marginBottom: 28 }} />
          <p style={{ fontSize: 13, color: 'var(--gray-4)', lineHeight: 2, fontWeight: 300, marginBottom: 28 }}>
            A 1.500 metros sobre el nivel del mar en Pitalito, Huila. Somos productores directos
            con una filosofía clara: del productor al consumidor, garantizando trazabilidad total y precios justos.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 40 }}>
            {[['Compostaje', 'Planta Propia'], ['Reforestación', '2000+ Árboles'],
              ['Agua', 'Recolección Lluvia'], ['Ecosistema', 'Apicultura']].map(([k, v]) => (
              <div key={k} style={{ borderLeft: '1px solid rgba(201,168,124,0.3)', paddingLeft: 16 }}>
                <div style={{ fontSize: 9, color: 'var(--gray-4)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 4 }}>
                  {k}
                </div>
                <div style={{ fontFamily: 'Josefin Sans', fontSize: 12, color: '#c9a87c', letterSpacing: '0.1em' }}>
                  {v}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal reveal-delay-2" style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', border: '1px solid var(--border)' }}>
          <video
            autoPlay loop muted playsInline
            className="absolute inset-0 w-full h-full object-cover"
            src=""
            poster="https://raw.githubusercontent.com/karen-claros1212/herreracafe-assets-cdn/main/coffees/bourbon-bolsas.webp"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          >
            Tu navegador no soporta video.
          </video>
          {/* Overlay oscuro para contraste del texto */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 100%)',
            pointerEvents: 'none'
          }} />
          <div style={{
            position: 'absolute', bottom: 16, left: 16, fontFamily: 'Josefin Sans',
            fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)',
            zIndex: 2
          }}>
            Pitalito · Colombia
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', padding: '60px 48px', background: 'var(--ink)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <Logo size={24} />
              <span style={{ fontFamily: 'Josefin Sans', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>
                Herrera Café
              </span>
            </div>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', lineHeight: 1.9, fontWeight: 300, maxWidth: 260 }}>
              Café de especialidad colombiano. Finca Bello Horizonte, Pitalito, Huila. Del árbol a tu taza.
            </p>
          </div>
          {[
            ['Catálogo', ['Exóticos', 'Tradicionales', 'Drips', 'Métodos']],
            ['Nosotros', ['Sostenibilidad', 'Turismo Rural', 'El Proceso', 'Certificaciones']],
            ['Contacto', ['Calle 13 # 15-77, Bogotá', '+57 300 826 2695', 'cafe.herrera12@gmail.com']],
          ].map(([title, items]) => (
            <div key={title}>
              <div style={{ fontFamily: 'Josefin Sans', fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>
                {title}
              </div>
              {items.map(item => (
                <div key={item} style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', marginBottom: 10 }}>
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          paddingTop: 24, borderTop: '1px solid var(--border)', flexWrap: 'wrap', gap: 12
        }}>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', fontFamily: 'Josefin Sans', letterSpacing: '0.1em' }}>
            © {new Date().getFullYear()} Herrera Café · Arquitectura Headless Shopify
          </span>
          <div style={{ display: 'flex', gap: 20 }}>
            {[['Stock Seguro', true], ['Pagos Encriptados', true]].map(([label, active]) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: active ? '#4ade80' : '#c9a87c' }} />
                <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── TOAST ────────────────────────────────────────────────────────────────
function Toast({ msg, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 2800); return () => clearTimeout(t); }, [onDone]);
  return <div className="toast" role="alert" aria-live="assertive">{msg}</div>;
}

// ─── APP PRINCIPAL ───────────────────────────────────────────────────────
export default function App() {
  const { coffees, methods } = useCatalog(RAW_DATA);

  // Cart state
  const [cart,          setCart]          = useState([]);
  const [cartOpen,      setCartOpen]      = useState(false);
  const [modalProduct,  setModalProduct]  = useState(null);
  const [toast,         setToast]         = useState(null);
  const [catalogFilter, setCatalogFilter] = useState('TODOS');
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [showThankYou, setShowThankYou]   = useState(false);

  // Inicializar animaciones de scroll Apple-style (GSAP + Lenis)
  const lenisRef = useScrollAnimations([]);

  // Hero product: Geisha (premium) con fallback
  const heroProduct = useMemo(
    () => coffees.find(p => p.handle === 'geisha') || coffees.find(p => p.score >= 90) || coffees[0],
    [coffees]
  );

  // Detectar redirect post-pago
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('success') === 'true') setShowThankYou(true);
  }, []);

  // Handlers memoizados
  const addToCart = useCallback((product, tipo, peso, variedad, price, qty = 1) => {
    const cartId = getVariantId(product, tipo, peso, variedad) || `${product.id}|${tipo}|${peso}|${variedad}`;
    setCart(prev => {
      const existing = prev.find(i => i.cartId === cartId);
      if (existing) return prev.map(i => i.cartId === cartId ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { id: product.id, cartId, title: product.title, img: product.img, tipo, peso, variedad, price, qty }];
    });
    setToast(`${product.title} agregado al carrito`);
  }, []);

  const removeFromCart = useCallback((cartId) => setCart(prev => prev.filter(i => i.cartId !== cartId)), []);
  const changeQty = useCallback((cartId, delta) => setCart(prev =>
    prev.map(i => i.cartId === cartId ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
  ), []);

  const handleCheckout = useCallback(async () => {
    setCheckoutLoading(true);
    const url = await createShopifyCheckout(cart);
    setCheckoutLoading(false);
    if (url) {
      window.location.href = url;
    } else {
      alert("Hubo un problema al conectar con la pasarela de pagos. Intenta de nuevo.");
    }
  }, [cart]);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  // ── THANK YOU PAGE ──
  if (showThankYou) {
    return (
      <ThankYou
        orderNumber="HC"
        customerEmail="cafe.herrera12@gmail.com"
        onHome={() => {
          setShowThankYou(false);
          window.history.replaceState({}, '', '/');
        }}
      />
    );
  }

  return (
    <>
      <FontLoader />
      <Cursor />
      <Grain />

      <div className="grain" style={{ minHeight: '100vh', background: 'var(--ink)' }}>
        <Navbar cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />

        {/* ── HERO ── */}
        <HeroSection heroProduct={heroProduct} onOpenModal={setModalProduct} />

        {/* ── MARQUEE ── */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)',
          padding: '14px 0', background: 'rgba(255,255,255,0.01)', overflow: 'hidden'
        }}>
          <div className="marquee-inner animate-marquee" style={{ display: 'inline-flex', gap: 48 }}>
            {Array(4).fill(null).flatMap(() =>
              ['Geisha · Huila · Colombia', '✦', 'Procesos Naturales', '✦',
               'Score SCA 85+', '✦', 'Trazabilidad Total', '✦', 'Finca Bello Horizonte', '✦']
            ).map((t, i) => (
              <span key={i} style={{
                fontFamily: 'Josefin Sans', fontSize: 9, letterSpacing: '0.3em',
                textTransform: 'uppercase', color: t === '✦' ? '#c9a87c' : 'rgba(255,255,255,0.25)',
                whiteSpace: 'nowrap'
              }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* ── CATÁLOGO ── */}
        <CatalogSection
          coffees={coffees}
          filter={catalogFilter}
          onFilterChange={setCatalogFilter}
          onOpenModal={setModalProduct}
        />

        {/* ── MÉTODOS ── */}
        {methods.length > 0 && <MethodsSection methods={methods} />}

        {/* ── ORIGEN ── */}
        <OriginSection />

        {/* ── FOOTER ── */}
        <Footer />
      </div>

      {/* ── MODALES ── */}
      {cartOpen && (
        <CartDrawer
          cart={cart}
          onClose={() => setCartOpen(false)}
          onRemove={removeFromCart}
          onQtyChange={changeQty}
          onCheckout={handleCheckout}
          checkoutLoading={checkoutLoading}
        />
      )}
      {modalProduct && (
        <ProductModal
          product={modalProduct}
          onClose={() => setModalProduct(null)}
          onAddToCart={addToCart}
        />
      )}
      {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
    </>
  );
}
