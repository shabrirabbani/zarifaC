import { getCollections } from "@/services/collectionService";
import Image from "next/image";
import Link from "next/link";

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <div className="pt-6 md:pt-24">
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="mb-4 md:mb-8">
          <h1 className="text-2xl md:text-4xl tracking-wider text-gray-900 font-semibold text-center">
            Collections
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="relative cursor-pointer overflow-hidden group"
            >
              <div className="relative w-full aspect-[4/3]">
                <Link href={`/collections/${collection.slug}`}>
                  <Image
                    src={collection.image?.url || "/placeholder.jpg"}
                    alt={collection.title}
                    fill
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <h2 className="text-white text-lg md:text-xl font-semibold text-center px-2">
                      {collection.title}
                    </h2>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
