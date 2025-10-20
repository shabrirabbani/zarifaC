// lib/strapi.ts
import qs from "qs";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL ?? "http://localhost:1337";

export async function getStrapiData<T>(
  endpoint: string,
  query?: Record<string, any>
): Promise<T> {
  // Jika endpoint sudah mengandung '?', jangan tambahkan lagi
  const hasQuery = endpoint.includes("?");
  const queryString =
    query && !hasQuery
      ? `?${qs.stringify(query, { encodeValuesOnly: true })}`
      : "";

  const url = `${STRAPI_URL}/api${endpoint}${queryString}`;

  const res = await fetch(url, {
    next: { revalidate: 60 }, // revalidate setiap 60 detik
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }

  return res.json();
}
