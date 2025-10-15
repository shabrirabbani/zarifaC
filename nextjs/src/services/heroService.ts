import { getStrapiData } from "@/lib/strapi";
import { Hero } from "@/type";
import qs from "qs";

export async function getHero(): Promise<Hero | null> {
  const query = qs.stringify(
    {
      populate: {
        background: {
          fields: ["url", "formats"],
        },
      },
    },
    { encodeValuesOnly: true }
  );

  const res = await getStrapiData<{ data: Hero }>(`/hero?${query}`);

  if (!res?.data) return null;

  const heroData = res.data;

  const backgroundImage = heroData.background?.[0]?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${heroData.background[0].url}`
    : null;

  const hero: Hero = {
    id: heroData.id,
    title: heroData.title,
    buttonText: heroData.buttonText,
    buttonLink: heroData.buttonLink,
    background: heroData.background,
    backgroundUrl: backgroundImage,
  };

  return hero;
}
