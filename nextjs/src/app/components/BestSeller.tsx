import { formatRupiah } from "@/lib/formatRp";
import { getProducts } from "@/services/productService";
import Image from "next/image";
import Link from "next/link";

export default async function BestSeller() {
  const products = await getProducts();
  const bestSellers = products.filter(
    (product) => product.isBestSeller === true
  );

  return (
    <section className="py-10 max-w-7xl mx-auto px-6 md:px-0">
      <h2 className="text-lg md:text-2xl font-medium text-center mb-10 tracking-wide">
        BEST SELLER
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {bestSellers.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="group block text-center"
          >
            <div className="aspect-[3/4] relative overflow-hidden">
              <Image
                src={product.image?.[0]?.url || "/placeholder.jpg"}
                alt={product.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>

            <div className="mt-3 text-center">
              <p className=" text-gray-800 tracking-wider text-xs md:text-sm mb-1">
                {product.title}
              </p>
              <p className="text-gray-500 text-xs tracking-wider">
                {formatRupiah(product.price ?? 0)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
