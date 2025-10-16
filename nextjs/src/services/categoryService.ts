import { getStrapiData } from "@/lib/strapi";
import { Category, Product, StrapiImage } from "@/type";
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

export async function getCategoryBySlug(
  slug: string
): Promise<Category | null> {
  const query = qs.stringify(
    {
      filters: { slug: { $eq: slug } },
      populate: {
        image: true,
        products: {
          populate: {
            image: true,
            category: true,
          },
        },
      },
    },
    { encodeValuesOnly: true }
  );

  const res = await getStrapiData<{ data: any[] }>(`/categories?${query}`);
  if (!res?.data?.length) return null;

  const category = res.data[0];
  const baseUrl =
    process.env.NEXT_PUBLIC_STRAPI_API_URL ?? "http://localhost:1337";

  // 🧩 Map semua produk di kategori ini
  const products: Product[] = Array.isArray(category.products)
    ? category.products.map((p: any): Product => {
        const images: StrapiImage[] = Array.isArray(p.image)
          ? p.image.map((img: any) => ({
              id: img.id,
              name: img.name,
              url: img.url.startsWith("http")
                ? img.url
                : `${baseUrl}${img.formats?.medium?.url ?? img.url}`,
              formats: img.formats,
            }))
          : p.image
          ? [
              {
                id: p.image.id,
                name: p.image.name,
                url: p.image.url.startsWith("http")
                  ? p.image.url
                  : `${baseUrl}${p.image.formats?.medium?.url ?? p.image.url}`,
                formats: p.image.formats,
              },
            ]
          : [];

        return {
          id: p.id,
          title: p.title,
          slug: p.slug,
          description: p.description ?? "",
          price: p.price ?? 0,
          sku: p.sku ?? "",
          isNewArrival: p.isNewArrival ?? false,
          isBestSeller: p.isBestSeller ?? false,
          image: images,
          category: p.category?.title ?? "Uncategorized",
        };
      })
    : [];

  return {
    id: category.id,
    title: category.title,
    slug: category.slug,
    description: category.description ?? "",
    image: category.image
      ? {
          id: category.image.id,
          name: category.image.name,
          url: category.image.url.startsWith("http")
            ? category.image.url
            : `${baseUrl}${
                category.image.formats?.medium?.url ?? category.image.url
              }`,
          formats: category.image.formats,
        }
      : undefined,
    products,
  };
}
