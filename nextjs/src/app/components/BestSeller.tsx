"use client";

import Image from "next/image";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Sneakers",
    price: "Rp 450.000",
    image: "https://picsum.photos/400/400?random=21",
  },
  {
    id: 2,
    name: "Flat Shoes",
    price: "Rp 380.000",
    image: "https://picsum.photos/400/400?random=22",
  },
  {
    id: 3,
    name: "Heels",
    price: "Rp 520.000",
    image: "https://picsum.photos/400/400?random=23",
  },
  {
    id: 4,
    name: "Boots",
    price: "Rp 600.000",
    image: "https://picsum.photos/400/400?random=24",
  },
];

export default function BestSeller() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-6 md:px-0">
      <h2 className="text-xl md:text-2xl font-semibold text-center mb-10 tracking-wide">
        BEST SELLER
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((cat, index) => (
          <Link key={index} href={"#"} className="group block text-center">
            <div className="aspect-[3/4] relative overflow-hidden">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            <div className="mt-3 text-center">
              <p className="font-medium text-gray-800 tracking-wider">
                {cat.name}
              </p>
              <p className="text-gray-500 text-sm">{cat.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
