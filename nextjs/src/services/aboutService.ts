import { getStrapiData } from "@/lib/strapi";
import { About } from "@/type";
import qs from "qs";

export async function getAbout(): Promise<About | null> {
  const query = qs.stringify(
    {
      populate: {
        image: {
          fields: ["url", "formats"],
        },
      },
    },
    { encodeValuesOnly: true }
  );

  const res = await getStrapiData<{ data: About }>(`/about?${query}`);

  if (!res?.data) return null;

  const aboutData = res.data;

  const hero: About = {
    id: aboutData.id,
    title: aboutData.title,
    content: aboutData.content,
    image: aboutData.image,
  };

  return hero;
}
