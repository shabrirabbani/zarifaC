import { getStrapiData } from "@/lib/strapi";
import { Product, ProductVariant } from "@/type";
import qs from "qs";

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const query = qs.stringify(
    {
      filters: {
        slug: { $eq: slug },
      },
      populate: {
        image: true,
        product_variants: {
          populate: {
            image: true,
          },
        },
      },
    },
    { encodeValuesOnly: true }
  );

  const res = await getStrapiData<{ data: any[] }>(`/products?${query}`);

  if (!res?.data || res.data.length === 0) return null;

  const baseUrl =
    process.env.NEXT_PUBLIC_STRAPI_API_URL ?? "http://localhost:1337";
  const item = res.data[0];

  const img = item.image;
  const variants = Array.isArray(item.product_variants)
    ? item.product_variants.map((v: ProductVariant) => ({
        id: v.id,
        title: v.title,
        slug: v.slug,
        sku: v.sku ?? "",
        priceOverride: v.priceOverride ?? "",
        isNewArrival: v.isNewArrival ?? false,
        isBestSeller: v.isBestSeller ?? false,
        image: Array.isArray(v.image)
          ? v.image.map((img) => ({
              id: img.id,
              name: img.name,
              url: img.url.startsWith("http")
                ? img.url
                : `${baseUrl}${img.formats?.medium?.url ?? img.url}`,
              formats: img.formats,
            }))
          : [],
      }))
    : [];

  const product: Product = {
    id: item.id,
    title: item.title,
    slug: item.slug,
    description: item.description ?? "",
    price: item.price ?? "",
    sku: item.sku ?? "",
    isNewArrival: item.isNewArrival ?? false,
    isBestSeller: item.isBestSeller ?? false,
    image: Array.isArray(img)
      ? img.map((i) => ({
          id: i.id,
          name: i.name,
          url: i.url.startsWith("http")
            ? i.url
            : `${baseUrl}${i.formats?.medium?.url ?? i.url}`,
          formats: i.formats,
        }))
      : [],
    product_variants: variants,
  };

  return product;
}

export async function getProducts(): Promise<Product[]> {
  const query = qs.stringify(
    {
      populate: {
        image: true,
        product_variants: {
          populate: {
            image: true,
          },
        },
      },
    },
    { encodeValuesOnly: true }
  );

  const res = await getStrapiData<{ data: any[] }>(`/products?${query}`);

  if (!res?.data || res.data.length === 0) return [];

  const baseUrl =
    process.env.NEXT_PUBLIC_STRAPI_API_URL ?? "http://localhost:1337";

  const products: Product[] = res.data.map((item) => {
    const img = item.image;

    const variants = Array.isArray(item.product_variants)
      ? item.product_variants.map((v: ProductVariant) => ({
          id: v.id,
          title: v.title,
          slug: v.slug,
          sku: v.sku ?? "",
          priceOverride: v.priceOverride ?? "",
          isNewArrival: v.isNewArrival ?? false,
          isBestSeller: v.isBestSeller ?? false,
          image: Array.isArray(v.image)
            ? v.image.map((img) => ({
                id: img.id,
                name: img.name,
                url: img.url.startsWith("http")
                  ? img.url
                  : `${baseUrl}${img.formats?.medium?.url ?? img.url}`,
                formats: img.formats,
              }))
            : [],
        }))
      : [];

    return {
      id: item.id,
      title: item.title,
      slug: item.slug,
      description: item.description ?? "",
      price: item.price ?? "",
      sku: item.sku ?? "",
      isNewArrival: item.isNewArrival ?? false,
      isBestSeller: item.isBestSeller ?? false,
      image: Array.isArray(img)
        ? img.map((i) => ({
            id: i.id,
            name: i.name,
            url: i.url.startsWith("http")
              ? i.url
              : `${baseUrl}${i.formats?.medium?.url ?? i.url}`,
            formats: i.formats,
          }))
        : [],
      product_variants: variants,
    } as Product;
  });

  return products;
}
