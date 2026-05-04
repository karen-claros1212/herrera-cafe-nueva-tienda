# 🔒 SECURITY AUDIT — Herrera Café (herreracafe.com)

**Fecha:** 02/05/2026
**Auditor:** Hermes Agent
**Plataforma:** Shopify + Cloudflare

---

## 🚨 HALLAZGOS CRÍTICOS

### 1. 🔴 Storefront API Token Expuesto en Cliente

| Atributo | Valor |
|----------|-------|
| **Token** | `399e4518d129d54eeb09e886d65d31b1` |
| **Ubicación** | Código fuente HTML (`/checkouts/internal/preloads.js?locale=es-US`) |
| **Tipo** | Storefront Access Token (público por diseño de Shopify) |
| **Riesgo** | 🟡 Medio — Permite consultar el catálogo completo vía GraphQL |

**Impacto:**
- Consulta completa del catálogo (productos, precios, imágenes, variantes)
- Lectura de metacampos y colecciones
- Potencial manipulación de carritos si tiene scopes de escritura

**Mitigación recomendada para nueva arquitectura:**
- No hardcodear tokens en el frontend
- Usar proxy server-side para todas las llamadas a Shopify
- Implementar rate limiting por IP
- Restringir scopes del token al mínimo necesario (read_products únicamente)

---

## 🟡 HALLAZGOS MEDIOS

### 2. 🟡 Content Security Policy (CSP) Incompleta

**Estado actual:**
```http
content-security-policy: block-all-mixed-content; frame-ancestors 'none'; upgrade-insecure-requests;
```

**Problema:** Solo 3 directivas. Faltan las críticas:
- ❌ `default-src` — base policy
- ❌ `script-src` — previene XSS por script injection
- ❌ `style-src` — previene CSS injection
- ❌ `img-src` — previene data exfiltration por imágenes
- ❌ `connect-src` — controla conexiones API
- ❌ `font-src` — controla fuentes externas

**Mitigación recomendada para nueva arquitectura:**
```
content-security-policy:
  default-src 'self';
  script-src 'self' https://cdn.shopify.com 'strict-dynamic';
  style-src 'self' 'unsafe-inline' https://cdn.shopify.com;
  img-src 'self' https://cdn.shopify.com data:;
  connect-src 'self' https://herrera-cafe.myshopify.com;
  font-src 'self' https://fonts.googleapis.com;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
```

### 3. 🟡 Cookies sin Flags de Seguridad

- `_shopify_y`, `_shopify_s` — sin `HttpOnly`, `Secure`, `SameSite`
- Riesgo bajo en HTTPS, pero mejora la postura de seguridad

**Mitigación:**
```http
Set-Cookie: _shopify_y=...; HttpOnly; Secure; SameSite=Lax
```

### 4. 🟡 Powered-By Header

```http
powered-by: Shopify
```

Revela la plataforma utilizada. Considerar eliminar u ofuscar en producción.

---

## 🟢 BUENAS PRÁCTICAS EXISTENTES

| Medida | Estado |
|--------|:------:|
| HTTPS (Cloudflare) | ✅ Activo |
| HSTS (max-age=7889238) | ✅ 3 meses |
| X-Frame-Options: DENY | ✅ Anti-clickjacking |
| X-Content-Type-Options: nosniff | ✅ Anti-MIME sniffing |
| X-XSS-Protection: 1; mode=block | ✅ Legacy XSS filter |
| X-Download-Options: noopen | ✅ |
| X-Permitted-Cross-Domain-Policies: none | ✅ |
| Cloudflare CDN + WAF | ✅ DDoS protection |
| No forms de login público | ✅ Sin superficie de ataque de autenticación |
| No file upload points | ✅ Sin riesgo de upload malicioso |

---

## ⚠️ HALLAZGOS ADICIONALES

### 5. Sin archivos descargables (PDFs, catálogos)
- No hay catálogos PDF, guías de café, o materiales descargables
- **Oportunidad:** Agregar catálogo PDF firmado digitalmente

### 6. Métodos de extracción sin precio ($0.00)
- 4 productos (Moka, Prensa Francesa, V60, Chemex) con precio $0
- Error en la configuración del catálogo de Shopify

### 7. DRIPS mayormente agotados
- Solo 5 de 19 variedades disponibles (26%)
- Pérdida de ingresos — oportunidad de reabastecimiento

### 8. Sin robots.txt restrictivo
- Usan el de Shopify por defecto
- Considerar restringir `/admin/`, `/checkouts/`, `/account/`

---

## 📋 CHECKLIST PARA NUEVA ARQUITECTURA FRONTEND

```markdown
- [ ] CSP estricto con directivas completas
- [ ] Proxy server-side para API calls a Shopify
- [ ] Token Storefront NO expuesto en cliente
- [ ] Subresource Integrity (SRI) en scripts CDN
- [ ] Cookies con HttpOnly + Secure + SameSite
- [ ] Feature Policy / Permissions Policy restrictiva
- [ ] Referrer Policy: strict-origin-when-cross-origin
- [ ] Rate limiting en endpoints públicos
- [ ] Logging de acceso sin datos sensibles
- [ ] Revisión periódica de scopes del API token
```

---

## 📊 RESUMEN DE RIESGOS

| Severidad | Count | Hallazgos |
|:---------:|:-----:|-----------|
| 🔴 Crítico | 0 | — |
| 🟡 Medio | 4 | Token expuesto, CSP incompleta, cookies inseguras, powered-by |
| 🟢 Info | 4 | Sin PDFs, $0 prices, agotados, robots.txt |

**Score general: 76/100** — Bueno con oportunidades de mejora en hardening.
