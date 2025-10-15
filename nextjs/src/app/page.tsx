import { getCollections } from "@/services/collectionService";
import BestSeller from "./components/BestSeller";
import ShopByCategories from "./components/Categories";
import Hero from "./components/Hero";
import NewArrivalSection from "./components/NewArival";

export default async function Home() {
  const collections = await getCollections();

  const newArrivals = collections.filter(
    (collection) => collection.isNewArrival === true
  );

  return (
    <div className="pt-18 md:pt-26">
      <Hero />
      <ShopByCategories />
      <div>
        <h2 className="text-xl md:text-2xl font-semibold text-center mb-8 tracking-wide">
          NEW ARRIVALS
        </h2>
        {newArrivals?.map((section, idx) => (
          <NewArrivalSection key={idx} {...section} />
        ))}
        <BestSeller />
      </div>
    </div>
  );
}
