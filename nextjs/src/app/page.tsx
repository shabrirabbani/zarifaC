import { getStrapiData, StrapiResponse } from "./lib/strapi";

type HomepageAttributes = {
  title: string;
  description: string;
};

export default async function Home() {
  const strapiData = await getStrapiData<HomepageAttributes>("/api/homepage");
  const { title, description } = strapiData.data;
  return (
    <div className="text-black">
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
