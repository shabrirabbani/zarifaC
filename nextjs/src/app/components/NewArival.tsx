"use client";

import { formatRupiah } from "@/lib/formatRp";
import { Product } from "@/type";
import Image from "next/image";
import Link from "next/link";

interface NewArrivalSectionProps {
  title: string;
  slug: string;
  description?: string;
  image?: { url: string };
  products?: Product[];
}

export default function NewArrivalSection({
  title,
  slug,
  description,
  image,
  products = [],
}: NewArrivalSectionProps) {
  return (
    <section className="w-full py-5 px-6 md:px-0 bg-white max-w-7xl mx-auto">
      {/* Banner */}
      <div className="relative w-full aspect-[16/8] overflow-hidden mb-8">
        <Image
          src={image?.url || "/placeholder.jpg"}
          alt={title}
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Title & Description */}
      <div className="text-center mb-10 max-w-2xl mx-auto">
        <h3 className="text-xl md:text-2xl font-semibold mb-3 tracking-wide">
          {title}
        </h3>
        {description && (
          <p className="mb-6 text-sm md:text-base">{description}</p>
        )}
        <Link
          href={`/collections/${slug}`}
          className="inline-block bg-black text-white px-6 py-3 text-sm font-medium hover:bg-gray-900 transition-colors"
        >
          SHOP NOW
        </Link>
      </div>

      {/* Products */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {products.length > 0 ? (
          products.map((product) => {
            return (
              <div key={product.id} className="group cursor-pointer">
                <Link href={`/product/${product.slug}`}>
                  <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100">
                    <Image
                      src={
                        product.image?.[0]?.url
                          ? product.image[0].url
                          : "/placeholder.jpg"
                      }
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="50vw"
                    />
                  </div>
                  <div className="mt-3 text-center">
                    <p className="font-medium text-gray-800 tracking-wider">
                      {product.title}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {formatRupiah(product.price ?? 0)}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products available.
          </p>
        )}
      </div>
    </section>
  );
}
