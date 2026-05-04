// ─── HOOK useCatalog ───────────────────────────────────────────────────
// Normaliza datos RAW de Shopify y separa por categorías
// Usa los normalizadores de data/catalog.js

import { useMemo } from 'react';
import { normalizeProduct } from '../data/catalog';

export function useCatalog(rawJson) {
  return useMemo(() => {
    if (!rawJson?.products) return { coffees: [], methods: [], drips: [], all: [] };
    const all = rawJson.products.map(normalizeProduct);
    const coffees = all.filter(p => p.priceMin > 0 && !p.title.toLowerCase().includes('drip'));
    const methods = all.filter(p => p.priceMin === 0 && p.priceMax === 0);
    const drips   = all.filter(p => p.title.toLowerCase().includes('drip') || p.handle.includes('drip'));
    return { coffees, methods, drips, all };
  }, [rawJson]);
}
