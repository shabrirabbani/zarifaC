import { getStrapiData } from "@/lib/strapi";
import { Category } from "@/type";
import qs from "qs";
export async function getCategory(): Promise<Category[]> {
  const query = qs.stringify(
    {
      populate: {
        image: true,
      },
    },
    { encodeValuesOnly: true }
  );
  const res = await getStrapiData<{ data: Category[] }>(`/categories?${query}`);

  if (!res?.data || !Array.isArray(res.data)) return [];

  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;

  const categories: Category[] = res.data.map((item) => {
    const img = item.image;

    return {
      id: item.id,
      title: item.title,
      slug: item.slug,
      description: item.description ?? "",
      image: img
        ? {
            id: img.id,
            name: img.name,
            url: img.url.startsWith("http")
              ? img.url
              : `${baseUrl}${img.formats?.medium?.url ?? img.url}`,
            formats: img.formats,
          }
        : undefined,
    };
  });

  return categories;
}
