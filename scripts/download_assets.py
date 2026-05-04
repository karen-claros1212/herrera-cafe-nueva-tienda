#!/usr/bin/env python3
"""
Herrera Café — Asset Downloader
================================
Parser de imágenes desde el catálogo JSON de Shopify.
Extrae URLs, las descarga y las renombra con el handle del producto.
"""

import json
import os
import sys
import time
import urllib.request
import urllib.error
import ssl
from pathlib import Path
from urllib.parse import urlparse, unquote

# ── Config ──────────────────────────────────────────────────────────────
BASE_DIR = Path(os.path.expanduser("~/herrera-cafe-nueva-tienda"))
JSON_PATH = BASE_DIR / "data/raw/herreracafe_catalogo_completo.json"
ASSETS_DIR = BASE_DIR / "assets"
HIGH_RES_DIR = ASSETS_DIR / "images/high-res"
PRODUCTS_DIR = ASSETS_DIR / "images/products"

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                  "AppleWebKit/537.36 (KHTML, like Gecko) "
                  "Chrome/125.0.0.0 Safari/537.36"
}

# ── Helpers ─────────────────────────────────────────────────────────────

def download_file(url, dest_path, retries=3):
    """Download a file from url to dest_path with retry logic."""
    dest_path.parent.mkdir(parents=True, exist_ok=True)
    
    # Skip if already exists
    if dest_path.exists() and dest_path.stat().st_size > 0:
        return "skipped"
    
    req = urllib.request.Request(url, headers=HEADERS)
    ctx = ssl.create_default_context()
    
    for attempt in range(1, retries + 1):
        try:
            with urllib.request.urlopen(req, context=ctx, timeout=30) as resp:
                if resp.status == 200:
                    content = resp.read()
                    dest_path.write_bytes(content)
                    return f"ok ({len(content)} bytes)"
                else:
                    return f"HTTP {resp.status}"
        except Exception as e:
            if attempt < retries:
                wait = 2 ** attempt
                time.sleep(wait)
            else:
                return f"error: {e}"
    return "failed"


def get_extension(url):
    """Extract file extension from URL, defaulting to .jpg."""
    path = urlparse(url).path
    ext = os.path.splitext(path)[1].lower()
    # Shopify images often have _180x, _360x, etc. in filename
    # but the actual CDN URL will serve the right format
    valid_exts = {'.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'}
    if ext in valid_exts:
        return ext
    # If no extension or weird extension, check URL params
    qs = urlparse(url).query
    if 'format=jpg' in qs:
        return '.jpg'
    if 'format=png' in qs:
        return '.png'
    if 'format=webp' in qs:
        return '.webp'
    return '.jpg'  # safe fallback


def clean_url(url):
    """Remove Shopify size suffixes to get full-resolution image."""
    # Shopify image URLs often have _180x, _360x, _720x, _1024x1024
    # Strip them to get the original
    import re
    cleaned = re.sub(r'[,_]\d+x\d+', '', url)
    # Also handle the cdn.shopify.com pattern
    cleaned = re.sub(r'/(small|compact|medium|large|grande|original)/', '/original/', cleaned)
    return cleaned


# ── Main ────────────────────────────────────────────────────────────────

def main():
    print("=" * 60)
    print("  HERRERA CAFÉ — Asset Downloader")
    print("=" * 60)
    
    # 1. Load JSON
    if not JSON_PATH.exists():
        print(f"❌ JSON no encontrado: {JSON_PATH}")
        sys.exit(1)
    
    with open(JSON_PATH) as f:
        catalog = json.load(f)
    
    products = catalog.get("products", [])
    print(f"\n📦 Productos en catálogo: {len(products)}")
    
    # 2. Parse all image URLs
    image_entries = []  # (dest_dir, filename, url, product_title)
    
    for product in products:
        handle = product.get("handle", "unknown")
        title = product.get("title", "Unknown")
        images = product.get("images", {}).get("edges", [])
        product_type = product.get("productType", "")
        
        # Determine target directory
        is_method = any(kw in title.upper() for kw in ["METODO", "MOKA", "PRENSA", "V60", "CHEMEX", "FILTRO"])
        is_drip = "DRIPS" in title.upper()
        
        if is_method:
            target_dir = HIGH_RES_DIR  # Methods = lifestyle/high-res
        else:
            target_dir = PRODUCTS_DIR  # Coffee bags = products
        
        for idx, img_edge in enumerate(images):
            img_node = img_edge.get("node", {})
            img_url = img_node.get("url", "")
            alt_text = img_node.get("altText", "") or f"{title} - {idx+1}"
            
            if not img_url:
                continue
            
            # Clean URL for full resolution
            full_res_url = clean_url(img_url)
            
            # Build filename: {handle}-{index}.{ext}
            ext = get_extension(img_url)
            filename = f"{handle}-{idx+1}{ext}"
            
            image_entries.append((target_dir, filename, full_res_url, title, alt_text))
    
    print(f"🖼️  Imágenes totales en JSON: {len(image_entries)}")
    
    # 3. Download all images
    print(f"\n{'─' * 60}")
    print("  Descargando activos...")
    print(f"{'─' * 60}")
    
    stats = {"ok": 0, "skipped": 0, "failed": 0, "errors": []}
    
    for target_dir, filename, url, title, alt in image_entries:
        dest_path = target_dir / filename
        result = download_file(url, dest_path)
        
        if result.startswith("ok"):
            stats["ok"] += 1
            print(f"  ✅ {filename:<45} {result}")
        elif result == "skipped":
            stats["skipped"] += 1
            print(f"  ⏭️ {filename:<45} ya existe")
        else:
            stats["failed"] += 1
            stats["errors"].append((filename, url, result))
            # Try original URL (without cleaning) as fallback
            orig_url = image_entries[image_entries.index((target_dir, filename, url, title, alt))][2]
            # Actually re-try with original URL
            orig_dest = target_dir / f"{filename.rsplit('.', 1)[0]}_orig.{filename.rsplit('.', 1)[1]}"
            fallback = download_file(url.replace('cdn.shopify.com', 'cdn.shopify.com'), orig_dest)
            if fallback.startswith("ok"):
                stats["ok"] += 1
                stats["failed"] -= 1
                print(f"  ✅ {filename:<45} (fallback original) {fallback}")
            else:
                print(f"  ❌ {filename:<45} {result}")
    
    # 4. Summary
    print(f"\n{'=' * 60}")
    print(f"  📊 RESUMEN DE DESCARGA")
    print(f"{'=' * 60}")
    print(f"  ✅ Descargados:  {stats['ok']}")
    print(f"  ⏭️  Saltados:    {stats['skipped']}")
    print(f"  ❌ Fallidos:    {stats['failed']}")
    
    if stats["errors"]:
        print(f"\n  ⚠️  Errores:")
        for fname, url, err in stats["errors"][:5]:
            print(f"     • {fname}: {err}")
    
    # 5. Count actual files
    all_files = []
    for dir_path in [HIGH_RES_DIR, PRODUCTS_DIR]:
        if dir_path.exists():
            files = list(dir_path.glob("*"))
            all_files.extend(files)
    
    print(f"\n  📁 Total archivos en /assets: {len(all_files)}")
    
    # Verify match
    if len(all_files) >= len(image_entries):
        print(f"\n  ✅ INTEGRIDAD: {len(all_files)} activos >= {len(image_entries)} entradas JSON")
    else:
        print(f"\n  ⚠️  INTEGRIDAD: {len(all_files)} activos < {len(image_entries)} entradas JSON")
    
    return 0


if __name__ == "__main__":
    sys.exit(main())
