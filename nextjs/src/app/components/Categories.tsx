import { getCategory } from "@/services/categoryService";
import Image from "next/image";
import Link from "next/link";

export default async function ShopByCategories() {
  const categories = await getCategory();

  return (
    <section className="py-20 max-w-7xl mx-auto px-6 md:px-0">
      <h2 className="text-xl md:text-2xl font-semibold text-center mb-10 tracking-wide">
        SHOP BY CATEGORIES
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories?.map((cat, index) => (
          <Link
            key={index}
            href={"/categories/" + cat.slug}
            className="group block text-center"
          >
            <div className="aspect-square relative overflow-hidden">
              <Image
                src={cat.image?.url || "/placeholder.jpg"}
                alt={cat.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            <div className="mt-4">
              <span className="text-sm md:text-base font-medium text-gray-800 tracking-wide group-hover:text-[#4B1E32] transition-colors duration-300">
                {cat.title}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
