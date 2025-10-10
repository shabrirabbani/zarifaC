import { getStrapiData } from "@/lib/strapi";
import { Hero } from "@/type";

export async function getHero(): Promise<Hero | null> {
  const res = await getStrapiData<Hero>("/hero?populate=background");

  if (!res?.data) return null;
  const heroData = Array.isArray(res.data) ? res.data[0] : res.data;

  return {
    id: heroData.id,
    title: heroData.title,
    background: heroData.background,
    buttonText: heroData.buttonText,
    buttonLink: heroData.buttonLink,
  };
}
