"use client";

import Image from "next/image";
import Link from "next/link";

type Product = {
  id: number;
  name: string;
  price: string;
  image: string;
};

type NewArrivalSectionProps = {
  title: string;
  description: string;
  banner: string;
  products: Product[];
};

export default function NewArrivalSection({
  title,
  description,
  banner,
  products,
}: NewArrivalSectionProps) {
  return (
    <section className="w-full py-5 px-6 md:px-0 bg-white max-w-7xl mx-auto">
      <div className="relative w-full aspect-[16/8] overflow-hidden mb-8">
        <Image src={banner} alt={title} fill className="object-cover" />
      </div>

      <div className="text-center mb-10 max-w-2xl mx-auto">
        <h3 className="text-xl md:text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-500 mb-6 text-sm md:text-base">{description}</p>
        <Link
          href={`/shop/${title.toLowerCase()}`}
          className="inline-block bg-black text-white px-6 py-2 text-sm font-medium hover:bg-gray-900 transition-colors"
        >
          SHOP NOW
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="group cursor-pointer">
            <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
              <div className="absolute top-2 left-2 bg-gray-800 text-white text-[10px] font-medium px-2 py-1 uppercase">
                Limited Edition
              </div>
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="mt-3 text-center">
              <p className="text-sm font-medium text-gray-800">
                {product.name}
              </p>
              <p className="text-gray-500 text-sm">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
