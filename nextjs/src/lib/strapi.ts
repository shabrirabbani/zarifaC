import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

export type StrapiResponse<T> = {
  data: T[];
  meta?: any;
};

export async function getStrapiData<T>(
  endpoint: string
): Promise<StrapiResponse<T>> {
  const res = await axios.get(`${API_URL}${endpoint}`);
  return res.data;
}
