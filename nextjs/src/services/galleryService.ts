import { getStrapiData } from "@/lib/strapi";
import { Gallery, StrapiImage } from "@/type";
import qs from "qs";

export async function getGallery(): Promise<Gallery | null> {
  const query = qs.stringify(
    {
      populate: {
        image: {
          fields: ["url", "formats", "name"],
        },
      },
    },
    { encodeValuesOnly: true }
  );

  // Sesuai struktur Strapi 5+ (single type)
  const res = await getStrapiData<{ data: any }>(`/gallery?${query}`);
  if (!res?.data) return null;

  const data = res.data;

  const gallery: Gallery = {
    id: data.id,
    title: data.title,
    image:
      data.image?.map(
        (img: any): StrapiImage => ({
          id: img.id,
          name: img.name,
          url: img.url.startsWith("http")
            ? img.url
            : `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${img.url}`,
          formats: img.formats ?? {},
        })
      ) ?? [],
  };

  return gallery;
}
