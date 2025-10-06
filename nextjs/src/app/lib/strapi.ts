import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

// Typing untuk response langsung di data
export type StrapiResponse<T> = {
  data: T;
  meta?: any;
};

export async function getStrapiData<T>(
  endpoint: string
): Promise<StrapiResponse<T>> {
  const res = await axios.get(`${API_URL}${endpoint}`);
  if (!res.data || !res.data.data) {
    throw new Error(`No data returned from Strapi endpoint: ${endpoint}`);
  }
  return res.data;
}
