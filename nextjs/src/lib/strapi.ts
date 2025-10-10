import axios, { AxiosError } from "axios";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

if (!API_URL) {
  throw new Error("❌ Missing NEXT_PUBLIC_STRAPI_API_URL in .env");
}

export const strapi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export type StrapiResponse<T> = {
  data: T | T[];
  meta?: Record<string, any>;
};

export async function getStrapiData<T>(
  endpoint: string,
  params?: Record<string, any>
): Promise<StrapiResponse<T> | null> {
  try {
    const res = await strapi.get<StrapiResponse<T>>(endpoint, { params });
    return res.data;
  } catch (error) {
    const err = error as AxiosError;
    console.error(`❌ Failed to fetch from ${endpoint}:`, err.message);
    return null;
  }
}
