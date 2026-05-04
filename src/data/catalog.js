// ─── DATA SOURCE ───────────────────────────────────────────────────────────
// Catálogo inline de Herrera Café — 12 productos Shopify

export const RAW_DATA = {
  store: 'herreracafe.com',
  shopify_domain: 'herrera-cafe.myshopify.com',
  products: [
    {
      id: 'gid://shopify/Product/8017185734793',
      title: 'BLEND',
      handle: 'blend-castillo-y-caturra',
      productType: 'CAFÉ TOSTADO EMPACADO',
      tags: ['TRADICIONALES'],
      availableForSale: true,
      priceRange: { minVariantPrice: { amount: '30000.0' }, maxVariantPrice: { amount: '200000.0' } },
      images: { edges: [{ node: { url: 'https://raw.githubusercontent.com/karen-claros1212/herreracafe-assets-cdn/main/coffees/blend.png' } }] },
      description: 'CAFÉ PREMIUMFINCA CAFETERA: BELLO HORIZONTE-PITALITO HUILA.ASNM: 1500 mts',
      variants: { edges: [
        { node: { id: 'gid://shopify/ProductVariant/43412041269385', title: 'GRANO / 250g / BLEND', price: { amount: '30000.0' }, availableForSale: true } },
        { node: { id: 'gid://shopify/ProductVariant/44521764061321', title: 'GRANO / 250g / BLEND CASTILLO', price: { amount: '35000.0' }, availableForSale: true } },
        { node: { id: 'gid://shopify/ProductVariant/43412041302153', title: 'GRANO / 450g / BLEND', price: { amount: '40000.0' }, availableForSale: true } },
        { node: { id: 'gid://shopify/ProductVariant/43412041334921', title: 'GRANO / 2500g / BLEND', price: { amount: '170000.0' }, availableForSale: true } },
        { node: { id: 'gid://shopify/ProductVariant/43412041367689', title: 'MOLIDO / 250g / BLEND', price: { amount: '30000.0' }, availableForSale: true } },
      ] },
      options: [
        { name: 'TIPO', values: ['GRANO', 'MOLIDO'] },
        { name: 'PESO', values: ['250g', '450g', '2500g'] },
        { name: 'VARIEDAD', values: ['BLEND', 'BLEND CASTILLO', 'BLEND CATURRA', 'BLEND BOURBON ROSADO'] },
      ],
    },
    {
      id: 'gid://shopify/Product/8017185767561',
      title: 'CASTILLO',
      handle: 'castillo',
      productType: 'CAFÉ TOSTADO EMPACADO',
      tags: ['TRADICIONALES'],
      availableForSale: true,
      priceRange: { minVariantPrice: { amount: '30000.0' }, maxVariantPrice: { amount: '170000.0' } },
      images: { edges: [{ node: { url: 'https://raw.githubusercontent.com/karen-claros1212/herreracafe-assets-cdn/main/coffees/castillo.png' } }] },
      description: 'FINCA CAFETERA: BELLO HORIZONTE, PITALITO-HUILA.ASNM: 1500 mts',
      variants: { edges: [
        { node: { id: 'gid://shopify/ProductVariant/43412042088585', title: 'GRANO / 250g', price: { amount: '30000.0' }, availableForSale: true } },
        { node: { id: 'gid://shopify/ProductVariant/43412042121353', title: 'GRANO / 450g', price: { amount: '40000.0' }, availableForSale: true } },
        { node: { id: 'gid://shopify/ProductVariant/43412042154121', title: 'GRANO / 2500g', price: { amount: '170000.0' }, availableForSale: true } },
      ] },
      options: [
        { name: 'TIPO', values: ['GRANO', 'MOLIDO'] },
        { name: 'PESO', values: ['250g', '450g', '2500g'] },
      ],
    },
    {
      id: 'gid://shopify/Product/8017185800329',
      title: 'CATURRA',
      handle: 'caturra',
      productType: 'CAFÉ TOSTADO EMPACADO',
      tags: ['TRADICIONALES'],
      availableForSale: true,
      priceRange: { minVariantPrice: { amount: '30000.0' }, maxVariantPrice: { amount: '300000.0' } },
      images: { edges: [{ node: { url: 'https://raw.githubusercontent.com/karen-claros1212/herreracafe-assets-cdn/main/coffees/caturra.png' } }] },
      description: 'CAFÉ PREMIUMFINCA CAFETERA: BELLO HORIZONTE, PITALITO-HUILA.ASNM: 1500 mts',
      variants: { edges: [
        { node: { id: 'gid://shopify/ProductVariant/43412043268233', title: 'GRANO / 250g / CATURRA', price: { amount: '30000.0' }, availableForSale: true } },
        { node: { id: 'gid://shopify/ProductVariant/43412043300745', title: 'GRANO / 250g / CATURRA CHIROSO', price: { amount: '40000.0' }, availableForSale: true } },
        { node: { id: 'gid://shopify/ProductVariant/43412043333513', title: 'GRANO / 2500g / CATURRA CHIROSO', price: { amount: '280000.0' }, availableForSale: true } },
      ] },
      options: [
        { name: 'TIPO', values: ['GRANO', 'MOLIDO'] },
        { name: 'PESO', values: ['250g', '450g', '2500g'] },
        { name: 'VARIEDAD', values: ['CATURRA', 'CATURRA CHIROSO', 'CATURRA CHIROSO NATURAL'] },
      ],
    },
    {
      id: 'gid://shopify/Product/8017186029705',
      title: 'BOURBON',
      handle: 'bourbon',
      productType: 'CAFÉ TOSTADO EMPACADO',
      tags: ['EXOTICOS'],
      availableForSale: true,
      priceRange: { minVariantPrice: { amount: '35000.0' }, maxVariantPrice: { amount: '300000.0' } },
      images: { edges: [{ node: { url: 'https://raw.githubusercontent.com/karen-claros1212/herreracafe-assets-cdn/main/coffees/bourbon.png' } }] },
      description: 'Variedad exotic de proceso honey y natural. Notas dulces y florales.',
      variants: { edges: [
        { node: { id: 'gid://shopify/ProductVariant/43412048609417', title: 'GRANO / 250g / BOURBON ROSADO', price: { amount: '35000.0' }, availableForSale: true } },
        { node: { id: 'gid://shopify/ProductVariant/43412048642185', title: 'GRANO / 250g / BOURBON ROSADO HONEY', price: { amount: '38000.0' }, availableForSale: true } },
        { node: { id: 'gid://shopify/ProductVariant/43412048674953', title: 'GRANO / 250g / BOURBON SIDRA', price: { amount: '40000.0' }, availableForSale: true } },
        { node: { id: 'gid://shopify/ProductVariant/43412048707721', title: 'GRANO / 2500g / BOURBON SIDRA NATURAL', price: { amount: '300000.0' }, availableForSale: true } },
      ] },
      options: [
        { name: 'TIPO', values: ['GRANO', 'MOLIDO'] },
        { name: 'PESO', values: ['250g', '450g', '2500g'] },
        { name: 'VARIEDAD', values: ['BOURBON ROSADO', 'BOURBON ROSADO HONEY', 'BOURBON ROSADO NATURAL', 'BOURBON SIDRA', 'BOURBON SIDRA NATURAL'] },
      ],
    },
    {
      id: 'gid://shopify/Product/8154361299081',
      title: 'PAPAYO',
      handle: 'papayo-1',
      productType: 'CAFÉ TOSTADO EMPACADO',
      tags: ['EXOTICOS'],
      availableForSale: true,
      priceRange: { minVariantPrice: { amount: '40000.0' }, maxVariantPrice: { amount: '300000.0' } },
      images: { edges: [{ node: { url: 'https://raw.githubusercontent.com/karen-claros1212/herreracafe-assets-cdn/main/coffees/caturra.png' } }] },
      description: 'Variedad nativa colombiana con perfil tropical único.',
      variants: { edges: [
        { node: { id: 'gid://shopify/ProductVariant/44000001000001', title: 'GRANO / 250g / PAPAYO', price: { amount: '40000.0' }, availableForSale: true } },
        { node: { id: 'gid://shopify/ProductVariant/44000001000002', title: 'GRANO / 250g / PAPAYO NATURAL', price: { amount: '45000.0' }, availableForSale: true } },
        { node: { id: 'gid://shopify/ProductVariant/44000001000003', title: 'GRANO / 250g / PAPAYO HONEY', price: { amount: '48000.0' }, availableForSale: true } },
      ] },
      options: [
        { name: 'TIPO', values: ['GRANO', 'MOLIDO'] },
        { name: 'PESO', values: ['250g', '450g', '2500g'] },
        { name: 'VARIEDAD', values: ['PAPAYO', 'PAPAYO NATURAL', 'PAPAYO HONEY'] },
      ],
    },
    {
      id: 'gid://shopify/Product/8154363363465',
      title: 'LAURINA NATURAL',
      handle: 'laurina-natural',
      tags: ['EXOTICOS'],
      availableForSale: true,
      priceRange: { minVariantPrice: { amount: '70000.0' }, maxVariantPrice: { amount: '500000.0' } },
      images: { edges: [{ node: { url: 'https://raw.githubusercontent.com/karen-claros1212/herreracafe-assets-cdn/main/coffees/castillo.png' } }] },
      description: 'Variedad ultra-baja en cafeína, perfil floral y cítrico intenso.',
      variants: { edges: [
        { node: { id: 'gid://shopify/ProductVariant/44000002000001', title: 'GRANO / 250g', price: { amount: '70000.0' }, availableForSale: true } },
        { node: { id: 'gid://shopify/ProductVariant/44000002000002', title: 'GRANO / 2500g', price: { amount: '500000.0' }, availableForSale: true } },
      ] },
      options: [
        { name: 'TIPO', values: ['GRANO', 'MOLIDO'] },
        { name: 'PESO', values: ['250g', '450g', '2500g'] },
      ],
    },
    {
      id: 'gid://shopify/Product/8154366836873',
      title: 'GEISHA',
      handle: 'geisha',
      tags: ['EXOTICOS'],
      availableForSale: true,
      priceRange: { minVariantPrice: { amount: '65000.0' }, maxVariantPrice: { amount: '400000.0' } },
      images: { edges: [{ node: { url: 'https://raw.githubusercontent.com/karen-claros1212/herreracafe-assets-cdn/main/coffees/bourbon.png' } }] },
      description: 'La variedad más preciada del mundo. Perfil floral, frutal, complejo.',
      variants: { edges: [
        { node: { id: 'gid://shopify/ProductVariant/44000003000001', title: 'GRANO / 250g', price: { amount: '65000.0' }, availableForSale: true } },
        { node: { id: 'gid://shopify/ProductVariant/44000003000002', title: 'GRANO / 450g', price: { amount: '110000.0' }, availableForSale: true } },
      ] },
      options: [
        { name: 'TIPO', values: ['GRANO', 'MOLIDO'] },
        { name: 'PESO', values: ['250g', '450g', '2500g'] },
      ],
    },
    {
      id: 'gid://shopify/Product/8360891744393',
      title: 'CAJA DRIPS X5 UND.',
      handle: 'caja-drips',
      tags: ['ESPECIALES'],
      availableForSale: true,
      priceRange: { minVariantPrice: { amount: '15000.0' }, maxVariantPrice: { amount: '25000.0' } },
      images: { edges: [{ node: { url: 'https://raw.githubusercontent.com/karen-claros1212/herreracafe-assets-cdn/main/coffees/caja-drips.png' } }] },
      description: '5 drips individuales. Ideal para regalo o para llevar a donde vayas.',
      variants: { edges: [
        { node: { id: 'gid://shopify/ProductVariant/44000004000001', title: 'BLEND', price: { amount: '20000.0' }, availableForSale: true } },
        { node: { id: 'gid://shopify/ProductVariant/44000004000002', title: 'CASTILLO', price: { amount: '20000.0' }, availableForSale: true } },
        { node: { id: 'gid://shopify/ProductVariant/44000004000003', title: 'GEISHA', price: { amount: '25000.0' }, availableForSale: true } },
      ] },
      options: [
        { name: 'VARIEDAD', values: ['BLEND', 'CASTILLO', 'CATURRA', 'GEISHA'] },
      ],
    },
    {
      id: 'gid://shopify/Product/8017186521225',
      title: 'METODO MOKA ITALIANA (GRECA)',
      handle: 'metodo-moka',
      productType: 'METODOS DE EXTRACCION',
      availableForSale: true,
      priceRange: { minVariantPrice: { amount: '0.0' }, maxVariantPrice: { amount: '0.0' } },
      images: { edges: [{ node: { url: 'https://raw.githubusercontent.com/karen-claros1212/herreracafe-assets-cdn/main/methods/moka-tapa.jpg' } }] },
      description: 'Auténtico sabor italiano en cada taza. La Moka prepara un café fuerte y aromático.',
      variants: { edges: [] }, options: [],
    },
    {
      id: 'gid://shopify/Product/8017186553993',
      title: 'METODO PRENSA FRANCESA',
      handle: 'metodo-prensa-francesa',
      productType: 'METODOS DE EXTRACCION',
      availableForSale: true,
      priceRange: { minVariantPrice: { amount: '0.0' }, maxVariantPrice: { amount: '0.0' } },
      images: { edges: [{ node: { url: 'https://raw.githubusercontent.com/karen-claros1212/herreracafe-assets-cdn/main/methods/prensa-francesa-1.jpg' } }] },
      description: 'Café con cuerpo intenso y textura envolvente. Extrae todos los aceites naturales.',
      variants: { edges: [] }, options: [],
    },
    {
      id: 'gid://shopify/Product/8017186652297',
      title: 'METODO V60',
      handle: 'metodo-v60',
      productType: 'FILTROS',
      availableForSale: true,
      priceRange: { minVariantPrice: { amount: '0.0' }, maxVariantPrice: { amount: '0.0' } },
      images: { edges: [{ node: { url: 'https://raw.githubusercontent.com/karen-claros1212/herreracafe-assets-cdn/main/methods/v60-hr-1.jpg' } }] },
      description: 'Taza limpia y deliciosa. Perfecto para iniciarte en los métodos de filtrado manual.',
      variants: { edges: [] }, options: [],
    },
    {
      id: 'gid://shopify/Product/8017186685065',
      title: 'METODO CHEMEX',
      handle: 'metodo-chemex',
      availableForSale: true,
      priceRange: { minVariantPrice: { amount: '0.0' }, maxVariantPrice: { amount: '0.0' } },
      images: { edges: [{ node: { url: 'https://raw.githubusercontent.com/karen-claros1212/herreracafe-assets-cdn/main/methods/chemex-1.jpg' } }] },
      description: 'Café limpio, elegante y con equilibrio perfecto. Resalta una acidez equilibrada.',
      variants: { edges: [] }, options: [],
    },
  ],
};

// ─── HELPERS ──────────────────────────────────────────────────────────────
export const EDITORIAL = {
  'blend-castillo-y-caturra': { notes: ['Chocolate', 'Nuez', 'Caramelo'],       altitude: '1500 MSNM', process: 'Washed',              roast: 'Medium',       score: 85, badge: null,               region: 'Pitalito · Huila' },
  castillo:                    { notes: ['Manzana', 'Panela', 'Almendra'],       altitude: '1500 MSNM', process: 'Washed',              roast: 'Medium-Light', score: 86, badge: null,               region: 'Bello Horizonte · Huila' },
  caturra:                     { notes: ['Cítrico', 'Frambuesa', 'Cacao'],       altitude: '1500 MSNM', process: 'Washed / Natural',    roast: 'Light',        score: 87, badge: null,               region: 'Bello Horizonte · Huila' },
  bourbon:                     { notes: ['Durazno', 'Miel', 'Bergamota'],        altitude: '1500 MSNM', process: 'Honey / Natural',     roast: 'Medium-Light', score: 90, badge: 'Bestseller',        region: 'Bello Horizonte · Huila' },
  'papayo-1':                  { notes: ['Tropical', 'Flores', 'Maracuyá'],     altitude: '1500 MSNM', process: 'Washed / Natural / Honey', roast: 'Light',   score: 88, badge: null,               region: 'Bello Horizonte · Huila' },
  'laurina-natural':           { notes: ['Jazmín', 'Cítrico', 'Té verde'],      altitude: '1500 MSNM', process: 'Natural',             roast: 'Light',        score: 91, badge: 'Edición Limitada',  region: 'Bello Horizonte · Huila' },
  geisha:                      { notes: ['Jazmín', 'Mango', 'Bergamota'],       altitude: '1500 MSNM', process: 'Natural Anaeróbico', roast: 'Light',        score: 92, badge: 'Edición Limitada',  region: 'Bello Horizonte · Huila' },
  'caja-drips':                { notes: ['Variado', 'Sorpresa', 'Premium'],     altitude: '1500 MSNM', process: 'Varios',             roast: 'Varios',       score: 88, badge: 'Gift',              region: 'Huila · Colombia' },
};
export const EDITORIAL_DEFAULT = { notes: ['Café', 'Dulce', 'Suave'], altitude: '1500 MSNM', process: 'Washed', roast: 'Medium', score: 84, badge: null, region: 'Huila · Colombia' };

// ─── UTILITIES ────────────────────────────────────────────────────────────
export const parseCOP = (str) => Math.round(parseFloat(str || '0'));
export const extractImages = (edges) => (edges || []).map(e => e?.node?.url).filter(Boolean);
export const titleCase = (str) => str.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()).replace(/\bV(\d+)\b/gi, (_, n) => `V${n}`);
export const cleanDescription = (raw) => (raw || '').replace(/([A-ZÁÉÍÓÚÑ]{2,})([A-Z][a-z])/g, '$1 $2').replace(/\s{2,}/g, ' ').trim();
export const optionValues = (options, name) => (options.find(o => o.name.toUpperCase() === name) || {}).values || [];

/**
 * Parse variant title by POSITIONAL ORDER (TIPO / PESO / VARIEDAD)
 */
export const parseVariantTitle = (variantTitle, productOptions) => {
  const parts = variantTitle.split(' / ').map(s => s.trim());
  const optNames = productOptions.map(o => o.name.toUpperCase());
  return {
    tipo:    optNames.includes('TIPO')     ? (parts[optNames.indexOf('TIPO')]     ?? null) : null,
    peso:    optNames.includes('PESO')     ? (parts[optNames.indexOf('PESO')]     ?? null) : null,
    variedad:optNames.includes('VARIEDAD') ? (parts[optNames.indexOf('VARIEDAD')] ?? null) : null,
  };
};

export const formatCOP = (amount) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(amount);

// ─── LOCAL IMAGE MAP ───────────────────────────────────────────────────
// Las imágenes se sirven desde /assets/images/ (Vite public dir)
// para evitar bloqueos CORS del CDN de Shopify

const CDN_BASE = 'https://raw.githubusercontent.com/karen-claros1212/herreracafe-assets-cdn/main';

const CDN_IMAGES = {
  'blend-castillo-y-caturra': CDN_BASE + '/coffees/blend.png',
  'castillo': CDN_BASE + '/coffees/castillo.png',
  'caturra': CDN_BASE + '/coffees/caturra.png',
  'bourbon': CDN_BASE + '/coffees/bourbon.png',
  'papayo-1': CDN_BASE + '/coffees/papayo.png',
  'laurina-natural': CDN_BASE + '/coffees/laurina-natural.png',
  'geisha': CDN_BASE + '/coffees/geisha.png',
  'caja-drips': CDN_BASE + '/coffees/caja-drips.png',
  'metodo-moka': CDN_BASE + '/methods/moka.webp',
  'metodo-prensa-francesa': CDN_BASE + '/methods/prensa-francesa-1.jpg',
  'metodo-v60': CDN_BASE + '/methods/v60-hr-1.jpg',
  'metodo-chemex': CDN_BASE + '/methods/chemex-1.jpg',
};

const GALLERY_IMAGES = {
  'castillo': [CDN_BASE + '/coffees/castillo.png', CDN_BASE + '/coffees/castillo-back.jpg'],
  'bourbon': [CDN_BASE + '/coffees/bourbon.png', CDN_BASE + '/coffees/bourbon-bolsas.jpg'],
  'metodo-moka': [CDN_BASE + '/methods/moka.webp', CDN_BASE + '/methods/moka-tapa.jpg'],
  'metodo-prensa-francesa': [
    CDN_BASE + '/methods/prensa-francesa-1.jpg',
    CDN_BASE + '/methods/prensa-francesa-hr-1.jpg',
    CDN_BASE + '/methods/prensa-francesa-3.jpg',
    CDN_BASE + '/methods/prensa-francesa-hr-2.jpg',
  ],
  'metodo-v60': [
    CDN_BASE + '/methods/v60-hr-1.jpg',
    CDN_BASE + '/methods/v60-2.jpg',
    CDN_BASE + '/methods/v60-hr-2.jpg',
    CDN_BASE + '/methods/v60-hr-3.jpg',
    CDN_BASE + '/methods/v60-hr-4.jpg',
  ],
  'metodo-chemex': [
    CDN_BASE + '/methods/chemex-1.jpg',
    CDN_BASE + '/methods/chemex-2.jpg',
    CDN_BASE + '/methods/chemex-3.jpg',
    CDN_BASE + '/methods/chemex-4.jpg',
  ],
};

const CDN_FALLBACK = 'https://raw.githubusercontent.com/karen-claros1212/herreracafe-assets-cdn/main/coffees/blend.png';

const getCdnImage = (handle) => CDN_IMAGES[handle] ?? CDN_FALLBACK;

// ─── NORMALIZATION ────────────────────────────────────────────────────────
export const normalizeVariants = (variantEdges, productOptions) =>
  (variantEdges || []).map(({ node }) => {
    const parsed = parseVariantTitle(node.title, productOptions);
    return {
      id: node.id || node.title,
      title: node.title,
      price: parseCOP(node.price?.amount),
      sku: node.sku ?? null,
      available: node.availableForSale ?? true,
      tipo: parsed.tipo,
      peso: parsed.peso,
      variedad: parsed.variedad,
    };
  });

export const normalizeProduct = (raw) => {
  const editorial = EDITORIAL[raw.handle] ?? EDITORIAL_DEFAULT;
  const localImg = getCdnImage(raw.handle);
  const gallery = GALLERY_IMAGES[raw.handle] ?? null;
  const options = raw.options ?? [];
  return {
    id: raw.id,
    handle: raw.handle,
    title: titleCase(raw.title),
    tag: raw.tags?.[0] ?? null,
    description: cleanDescription(raw.description),
    available: raw.availableForSale ?? true,
    url: raw.onlineStoreUrl ?? `https://herreracafe.com/products/${raw.handle}`,
    img: localImg,
    images: gallery ?? [localImg],
    priceMin: parseCOP(raw.priceRange?.minVariantPrice?.amount),
    priceMax: parseCOP(raw.priceRange?.maxVariantPrice?.amount),
    options: {
      tipo:     optionValues(options, 'TIPO'),
      peso:     optionValues(options, 'PESO'),
      variedad: optionValues(options, 'VARIEDAD'),
    },
    variants: normalizeVariants(raw.variants?.edges, options),
    ...editorial,
  };
};

/**
 * Progressive variant matching:
 * 1. Exact (tipo + peso + variedad)
 * 2. tipo + peso
 * 3. peso only
 * 4. First available
 * 5. First
 */
export function findVariant(product, tipo, peso, variedad) {
  const { variants } = product;
  if (!variants?.length) return null;
  return (
    variants.find(v => (!tipo || v.tipo === tipo) && (!peso || v.peso === peso) && (!variedad || v.variedad === variedad)) ||
    variants.find(v => (!tipo || v.tipo === tipo) && (!peso || v.peso === peso)) ||
    variants.find(v => !peso || v.peso === peso) ||
    variants.find(v => v.available) ||
    variants[0]
  );
}

export const getVariantPrice = (product, tipo, peso, variedad) => findVariant(product, tipo, peso, variedad)?.price ?? product.priceMin;
export const getVariantId   = (product, tipo, peso, variedad) => findVariant(product, tipo, peso, variedad)?.id ?? null;
