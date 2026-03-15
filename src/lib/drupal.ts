const DRUPAL_BASE_URL = import.meta.env.DRUPAL_BASE_URL;
const DRUPAL_API_TOKEN = import.meta.env.DRUPAL_API_TOKEN; // para endpoints protegidos

export async function drupalFetch<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const url = `${DRUPAL_BASE_URL}${endpoint}`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/vnd.api+json",
      ...(DRUPAL_API_TOKEN && { Authorization: `Bearer ${DRUPAL_API_TOKEN}` }),
    },
    ...options,
  });

  if (!res.ok) throw new Error(`Drupal API error: ${res.status} ${url}`);
  return res.json();
}
