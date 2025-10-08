"use client";

import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    title: "Scarves",
    href: "/scarves",
    imageUrl: "https://picsum.photos/600/800?random=1",
  },
  {
    title: "Pakaian",
    href: "/pakaian",
    imageUrl: "https://picsum.photos/600/800?random=2",
  },
  {
    title: "Kids Collection",
    href: "/kids",
    imageUrl: "https://picsum.photos/600/800?random=3",
  },
  {
    title: "Accessories",
    href: "/accessories",
    imageUrl: "https://picsum.photos/600/800?random=4",
  },
];

export default function ShopByCategories() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-6 md:px-0">
      <h2 className="text-xl md:text-2xl font-semibold text-center mb-10 tracking-wide">
        SHOP BY CATEGORIES
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat, index) => (
          <Link key={index} href={cat.href} className="group block text-center">
            <div className="aspect-[3/4] relative overflow-hidden">
              <Image
                src={cat.imageUrl}
                alt={cat.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 25vw"
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
