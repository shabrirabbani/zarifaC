import { getStrapiData } from "@/lib/strapi";
import { Collection, Product, StrapiImage } from "@/type";
import qs from "qs";

export async function getCollections(): Promise<Collection[]> {
  const query = qs.stringify(
    {
      populate: {
        image: true,
        products: {
          populate: {
            image: true,
          },
        },
      },
      sort: ["title:asc"],
      pagination: {
        page: 1,
        pageSize: 25,
      },
    },
    { encodeValuesOnly: true }
  );

  const res = await getStrapiData<{ data: any[] }>(`/collections?${query}`);

  if (!res?.data || !Array.isArray(res.data)) return [];

  const baseUrl =
    process.env.NEXT_PUBLIC_STRAPI_API_URL ?? "http://localhost:1337";

  const collections: Collection[] = res.data.map((item) => {
    const img = item.image;
    const products = Array.isArray(item.products)
      ? item.products.map((p: any): Product => {
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
                    : `${baseUrl}${
                        p.image.formats?.medium?.url ?? p.image.url
                      }`,
                  formats: p.image.formats,
                },
              ]
            : [];

          return {
            id: p.id,
            title: p.title,
            slug: p.slug,
            description: p.description ?? "",
            price: p.price ?? "",
            sku: p.sku ?? "",
            isNewArrival: p.isNewArrival ?? false,
            isBestSeller: p.isBestSeller ?? false,
            image: images,
          };
        })
      : [];

    return {
      id: item.id,
      title: item.title,
      slug: item.slug,
      description: item.description ?? "",
      isNewArrival: item.isNewArrival ?? false,
      isBestSeller: item.isBestSeller ?? false,
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
      products,
    };
  });

  return collections;
}

export async function getCollectionBySlug(
  slug: string
): Promise<Collection | null> {
  const query = qs.stringify(
    {
      filters: { slug: { $eq: slug } },
      populate: {
        image: true,
        products: {
          populate: {
            image: true,
            category: { fields: ["title"] },
          },
        },
      },
      pagination: {
        page: 1,
        pageSize: 1,
      },
    },
    { encodeValuesOnly: true }
  );

  const res = await getStrapiData<{ data: any[] }>(`/collections?${query}`);
  if (!res?.data?.length) return null;

  const item = res.data[0];

  const baseUrl =
    process.env.NEXT_PUBLIC_STRAPI_API_URL ?? "http://localhost:1337";

  // ==== Produk ====
  const products: Product[] = Array.isArray(item.products)
    ? item.products.map((p: any): Product => {
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
          price: p.price ?? "",
          sku: p.sku ?? "",
          isNewArrival: p.isNewArrival ?? false,
          isBestSeller: p.isBestSeller ?? false,
          image: images,
          category: p.category.title,
        };
      })
    : [];

  // ==== Koleksi ====
  const collection: Collection = {
    id: item.id,
    title: item.title,
    slug: item.slug,
    description: item.description ?? "",
    isNewArrival: item.isNewArrival ?? false,
    isBestSeller: item.isBestSeller ?? false,
    image: item.image
      ? {
          id: item.image.id,
          name: item.image.name,
          url: item.image.url.startsWith("http")
            ? item.image.url
            : `${baseUrl}${item.image.formats?.medium?.url ?? item.image.url}`,
          formats: item.image.formats,
        }
      : undefined,
    products,
  };

  return collection;
}
