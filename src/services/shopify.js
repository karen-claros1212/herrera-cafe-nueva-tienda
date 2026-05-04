/**
 * shopify.js — Servicio de Checkout para Herrera Café
 * Conecta el carrito de React con la Storefront API de Shopify
 * para generar URLs de pago seguras.
 */

const DOMAIN = "herrera-cafe.myshopify.com";
const STOREFRONT_TOKEN = "399e4518d129d54eeb09e886d65d31b1";

/**
 * Crea un checkout en Shopify y devuelve la URL de pago.
 * @param {Array} cart - El carrito de React. Cada item debe tener { cartId (gid de variante), qty, title }
 * @returns {string|null} URL segura de Shopify Checkout o null si falla
 */
export async function createShopifyCheckout(cart) {
  if (!cart?.length) return null;

  const lineItems = cart.map(item => ({
    variantId: item.cartId,
    quantity: item.qty,
  }));

  const query = `
    mutation checkoutCreate($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
          id
          webUrl
        }
        checkoutUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  try {
    const response = await fetch(
      `https://${DOMAIN}/api/2024-01/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
        },
        body: JSON.stringify({
          query,
          variables: { input: { lineItems } },
        }),
      }
    );

    const { data, errors: networkErrors } = await response.json();

    if (networkErrors?.length) {
      console.error("Error de red Shopify:", networkErrors);
      return null;
    }

    const checkout = data?.checkoutCreate?.checkout;
    const userErrors = data?.checkoutCreate?.checkoutUserErrors;

    if (userErrors?.length) {
      console.error("Errores de validación Shopify:", userErrors);
      return null;
    }

    if (!checkout?.webUrl) {
      console.error("Shopify no devolvió URL de checkout");
      return null;
    }

    return checkout.webUrl;
  } catch (error) {
    console.error("Excepción al conectar con Storefront API:", error);
    return null;
  }
}
