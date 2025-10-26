"use client";

import { formatRupiah } from "@/lib/formatRp";
import { Product, ProductVariant } from "@/type";
import Image from "next/image";
import { useState } from "react";
import ProductImageGallery from "./ProductImageGallery";

export default function ProductPage({ product }: { product: Product }) {
  const [activeVariant, setActiveVariant] = useState<ProductVariant | null>(
    null
  );

  // Tentukan data yang sedang aktif (product atau variant)
  const displayedImages = activeVariant?.image ?? product.image;
  const displayedTitle = activeVariant?.title ?? product.title;
  const displayedVariant = activeVariant?.variantName ?? "";
  const displayedPrice = activeVariant?.priceOverride || product.price;
  const displayedSku = activeVariant?.sku ?? product.sku;

  // Gabungkan product utama + variant
  const allVariants = [
    { ...product, isMainProduct: true },
    ...(product.product_variants ?? []),
  ];

  return (
    <div className="pt-6 md:pt-20">
      <section className="py-16 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-5 md:gap-12">
          {/* --- Left: Images --- */}
          <ProductImageGallery
            key={activeVariant?.id || product.id}
            images={displayedImages?.map((img) =>
              img.url.startsWith("http")
                ? img.url
                : `${process.env.NEXT_PUBLIC_STRAPI_URL}${img.url}`
            )}
            title={displayedTitle}
          />

          {/* --- Right: Info --- */}
          <div className="w-full md:w-1/2 flex flex-col justify-start gap-4">
            <h1 className="text-base md:text-xl font-medium text-gray-900 tracking-wider">
              {displayedTitle}
            </h1>

            <span className=" text-gray-700 tracking-wider text-sm md:text-base">
              {formatRupiah(displayedPrice ?? 0)}
            </span>

            {/* --- Variants --- */}
            <div className="mt-2">
              <span className="font-medium mr-2 text-xs md:text-sm">
                Variant: {displayedVariant}
              </span>
              <div className="flex gap-2 mt-1 flex-wrap">
                {allVariants.map((variant, idx) => {
                  const isMain = (variant as any).isMainProduct;
                  const isActive = isMain
                    ? !activeVariant
                    : activeVariant?.id === variant.id;

                  return (
                    <button
                      key={
                        isMain ? `main-${product.id}` : `variant-${variant.id}`
                      }
                      onClick={() =>
                        isMain
                          ? setActiveVariant(null)
                          : setActiveVariant(variant as ProductVariant)
                      }
                      className={`w-12 h-12 border relative rounded-md overflow-hidden transition ${
                        isActive ? "border-blue-500 border-2" : ""
                      }`}
                    >
                      <Image
                        src={
                          variant.image?.[0]?.url
                            ? variant.image[0].url.startsWith("http")
                              ? variant.image[0].url
                              : `${process.env.NEXT_PUBLIC_STRAPI_URL}${variant.image[0].url}`
                            : "/placeholder.jpg"
                        }
                        alt={variant.title}
                        fill
                        className="object-cover rounded-md"
                        sizes="20vw"
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* --- SKU & Description --- */}
            <div className="mt-2">
              <span className="text-xs text-gray-600 tracking-wider">
                SKU: {displayedSku}
              </span>
            </div>

            {/* --- Description --- */}
            {/* {product.description && (
              <ProductDescription description={product.description} />
            )} */}
          </div>
        </div>
      </section>
    </div>
  );
}
