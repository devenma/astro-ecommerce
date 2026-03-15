import { drupalFetch } from "./drupal.ts";
import type { Store, DrupalStore } from "../types/store.ts";

// MOCK mientras Drupal no está disponible
import mockStores from "../content/stores/mock.json";

const USE_MOCK = import.meta.env.USE_MOCK_DATA === "true";

export async function getStores(): Promise<Store[]> {
  if (USE_MOCK) return mockStores as Store[];
  const data = await drupalFetch<{ data: DrupalStore[] }>(
    "/jsonapi/commerce_product/default",
  );
  return data.data.map(normalizeStore);
}

export async function getStoreBySlug(slug: string): Promise<Store | null> {
  if (USE_MOCK)
    return (mockStores as Store[]).find((p) => p.slug === slug) ?? null;
  const data = await drupalFetch<{ data: DrupalStore[] }>(
    `/jsonapi/commerce_product/default?filter[field_slug]=${slug}`,
  );
  return data.data[0] ? normalizeStore(data.data[0]) : null;
}

// Normalizar la respuesta de Drupal JSON:API al tipo interno
function normalizeStore(raw: DrupalStore): Store {
  return {
    id: raw.id,
    name: raw.attributes.title,
    slug: raw.attributes.field_slug,
    logo: raw.attributes.field_logo?.data ?? null,
    address: raw.attributes.field_address ?? null,
    url: raw.attributes.field_url ?? null,
    phone: raw.attributes.field_phone ?? null,
    description: raw.attributes.field_description ?? null,
  };
}
