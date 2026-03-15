import { drupalFetch } from "./drupal.ts";
import type { DrupalProduct, Product } from "../types/product.ts";

// MOCK mientras Drupal no está disponible
import mockProducts from "../content/products/mock.json";

const USE_MOCK = import.meta.env.USE_MOCK_DATA === "true";

export async function getProducts(): Promise<Product[]> {
  if (USE_MOCK) return mockProducts as Product[];
  const data = await drupalFetch<{ data: DrupalProduct[] }>(
    "/jsonapi/commerce_product/default",
  );
  return data.data.map(normalizeProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (USE_MOCK)
    return (mockProducts as Product[]).find((p) => p.slug === slug) ?? null;
  const data = await drupalFetch<{ data: DrupalProduct[] }>(
    `/jsonapi/commerce_product/default?filter[field_slug]=${slug}`,
  );
  return data.data[0] ? normalizeProduct(data.data[0]) : null;
}

export async function getProductsByStoreSlug(
  storeSlug: string,
): Promise<Product[]> {
  if (USE_MOCK) {
    return (mockProducts as Product[]).filter(
      (p) => p.brand?.slug === storeSlug,
    );
  }
  const data = await drupalFetch<{ data: DrupalProduct[] }>(
    `/jsonapi/commerce_product/default?filter[field_store_slug]=${storeSlug}`,
  );
  return data.data.map(normalizeProduct);
}

// Normalizar la respuesta de Drupal JSON:API al tipo interno
function normalizeProduct(raw: DrupalProduct): Product {
  return {
    id: raw.id,
    title: raw.attributes.title,
    slug: raw.attributes.field_slug,
    price: raw.attributes.field_price?.number,
    brand: raw.attributes.field_brand ?? null,
    sizes: raw.attributes.field_sizes ?? null,
    colors: raw.attributes.field_colors ?? null,
    currency: raw.attributes.field_price?.currency_code,
    image: raw.attributes.field_image?.data ?? null,
  };
}
