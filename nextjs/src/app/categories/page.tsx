import { getCategory } from "@/services/categoryService";
import Image from "next/image";
import Link from "next/link";

export default async function CategoriesPage() {
  const categories = await getCategory();

  return (
    <div className="pt-6 md:pt-24">
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="mb-4 md:mb-8">
          <h1 className="text-lg md:text-2xl tracking-wider text-gray-900 font-medium text-center">
            Categories
          </h1>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="relative cursor-pointer overflow-hidden group"
            >
              <div className="relative w-full aspect-[4/3]">
                <Link href={`/categories/${category.slug}`}>
                  <Image
                    src={category.image?.url || "/placeholder.jpg"}
                    alt={category.title}
                    fill
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <h2 className="text-white text-sm md:text-base font-medium text-center px-2">
                      {category.title}
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
