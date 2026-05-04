#!/usr/bin/env python3
"""
Herrera Café — Shopify GraphQL Metafield Dump
=============================================
Extrae metacampos adicionales (perfil de taza, notas de cata, origen)
usando el Storefront API Token expuesto.
"""

import json
import os
import sys
import urllib.request
import urllib.error
from pathlib import Path

BASE_DIR = Path(os.path.expanduser("~/herrera-cafe-nueva-tienda"))
OUTPUT_PATH = BASE_DIR / "data/raw/shopify_metafields_dump.json"

STORE = "herrera-cafe.myshopify.com"
TOKEN = "399e4518d129d54eeb09e886d65d31b1"
API_URL = f"https://{STORE}/api/2024-07/graphql.json"

# ── Query to get all products with full metafields ──────────────────────

METAFIELD_QUERY = """
{
  products(first: 50) {
    edges {
      node {
        id
        title
        handle
        description
        productType
        vendor
        availableForSale
        onlineStoreUrl
        priceRange {
          minVariantPrice { amount currencyCode }
          maxVariantPrice { amount currencyCode }
        }
        images(first: 10) {
          edges { node { url altText width height } }
        }
        variants(first: 25) {
          edges {
            node {
              id
              title
              sku
              price { amount currencyCode }
              selectedOptions { name value }
              availableForSale
              image { url altText }
            }
          }
        }
        collections(first: 5) {
          edges { node { id title handle } }
        }
      }
    }
    pageInfo { hasNextPage }
  }
}
"""

# ── Extended query with metafields ─────────────────────────────────────

EXTENDED_QUERY = """
{
  products(first: 50) {
    edges {
      node {
        id
        title
        handle
        description
        productType
        tags
        metafields(
          identifiers: [
            { namespace: "custom", key: "cup_profile" }
            { namespace: "custom", key: "tasting_notes" }
            { namespace: "custom", key: "altitude" }
            { namespace: "custom", key: "process" }
            { namespace: "custom", key: "variety" }
            { namespace: "custom", key: "origin" }
            { namespace: "custom", key: "roast_level" }
            { namespace: "custom", key: "suggested_for" }
            { namespace: "custom", key: "certifications" }
            { namespace: "global", key: "description_tag" }
            { namespace: "global", key: "title_tag" }
          ]
        ) {
          value
          key
          namespace
        }
        variants(first: 25) {
          edges {
            node {
              id
              title
              sku
              price { amount currencyCode }
              selectedOptions { name value }
              metafields(
                identifiers: [
                  { namespace: "custom", key: "lot_number" }
                  { namespace: "custom", key: "harvest_date" }
                ]
              ) {
                value
                key
                namespace
              }
            }
          }
        }
      }
    }
    pageInfo { hasNextPage }
  }
}
"""


def graphql_request(query, label="query"):
    """Execute a GraphQL query against the Shopify Storefront API."""
    body = json.dumps({"query": query}).encode("utf-8")
    req = urllib.request.Request(API_URL, data=body, method="POST")
    req.add_header("Content-Type", "application/json")
    req.add_header("X-Shopify-Storefront-Access-Token", TOKEN)
    
    try:
        resp = urllib.request.urlopen(req, timeout=30)
        data = json.loads(resp.read().decode("utf-8"))
        if "errors" in data:
            print(f"  ⚠️  {label}: {len(data['errors'])} error(es) (parcial OK)")
            for err in data['errors'][:3]:
                print(f"     → {err.get('message', 'unknown error')[:80]}")
        return data
    except urllib.error.HTTPError as e:
        print(f"  ❌ HTTP {e.code}: {e.read().decode()[:200]}")
        return None
    except Exception as e:
        print(f"  ❌ Error: {e}")
        return None


def main():
    print("=" * 60)
    print("  HERRERA CAFÉ — Shopify GraphQL Metafield Dump")
    print("=" * 60)
    
    # Step 1: Basic product query
    print("\n📡 Query 1: Productos base...")
    data = graphql_request(METAFIELD_QUERY, "productos base")
    if data:
        products = data.get("data", {}).get("products", {}).get("edges", [])
        print(f"  ✅ {len(products)} productos obtenidos")
    
    # Step 2: Extended metafield query
    print("\n📡 Query 2: Metacampos extendidos...")
    extended = graphql_request(EXTENDED_QUERY, "metacampos")
    
    result = {"store": STORE, "api_version": "2024-07"}
    
    if extended:
        result["data"] = extended.get("data")
        if "errors" in extended:
            result["partial_errors"] = extended["errors"]
        
        # Count metafields found
        products_data = extended.get("data", {}).get("products", {}).get("edges", [])
        total_mf = 0
        for edge in products_data:
            mfs = edge["node"].get("metafields", [])
            for mf in mfs:
                if mf and isinstance(mf, dict) and mf.get("value"):
                    total_mf += 1
        
        result["total_metafields_found"] = total_mf
        
        # Also try to get shop info
        print("\n📡 Query 3: Shop info...")
        shop_query = "{ shop { name email description myshopifyDomain primaryDomain { url } }}"
        shop_data = graphql_request(shop_query, "shop info")
        if shop_data and "data" in shop_data:
            result["shop"] = shop_data["data"].get("shop")
            shop = result["shop"]
            if shop:
                print(f"  ✅ Shop: {shop.get('name')} ({shop.get('myshopifyDomain')})")
                print(f"  📧 {shop.get('email', 'N/A')}")
    
    # Save
    with open(OUTPUT_PATH, "w") as f:
        json.dump(result, f, indent=2, ensure_ascii=False)
    
    print(f"\n💾 Guardado: {OUTPUT_PATH}")
    print(f"📊 Metacampos encontrados: {result.get('total_metafields_found', 0)}")
    
    # Summary of what was found
    if extended:
        products = extended.get("data", {}).get("products", {}).get("edges", [])
        print(f"\n{'─' * 60}")
        print("  METACAMPOS POR PRODUCTO:")
        print(f"{'─' * 60}")
        for edge in products:
            node = edge["node"]
            mfs = node.get("metafields", [])
            active_mfs = [m for m in mfs if m and isinstance(m, dict) and m.get("value")]
            if active_mfs:
                print(f"\n  🔹 {node['title']}:")
                for mf in active_mfs:
                    print(f"     • {mf['namespace']}.{mf['key']}: {mf['value'][:60]}")
            else:
                print(f"\n  🔹 {node['title']}: (sin metacampos)")
    
    return 0


if __name__ == "__main__":
    sys.exit(main())
