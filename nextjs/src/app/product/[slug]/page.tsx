"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";
import { use, useState } from "react";

type Variant = {
  name: string;
  image: string;
  slug: string;
};

type Product = {
  slug: string;
  title: string;
  price: string;
  description: string;
  images: string[];
  variants: Variant[];
};

// Dummy products with full variant list
const dummyProducts: Product[] = [
  {
    slug: "bag-black",
    title: "Bag Black",
    price: "$45",
    description: "Elegant black bag.",
    images: [
      "https://picsum.photos/500/500?random=1",
      "https://picsum.photos/500/500?random=2",
    ],
    variants: [
      {
        name: "Black",
        image: "https://picsum.photos/500/500?random=1",
        slug: "bag-black",
      },
      {
        name: "Brown",
        image: "https://picsum.photos/500/500?random=3",
        slug: "bag-brown",
      },
      {
        name: "Red",
        image: "https://picsum.photos/500/500?random=4",
        slug: "bag-red",
      },
    ],
  },
  {
    slug: "bag-brown",
    title: "Bag Brown",
    price: "$45",
    description: "Elegant brown bag.",
    images: [
      "https://picsum.photos/500/500?random=5",
      "https://picsum.photos/500/500?random=6",
    ],
    variants: [
      {
        name: "Black",
        image: "https://picsum.photos/500/500?random=1",
        slug: "bag-black",
      },
      {
        name: "Brown",
        image: "https://picsum.photos/500/500?random=5",
        slug: "bag-brown",
      },
      {
        name: "Red",
        image: "https://picsum.photos/500/500?random=4",
        slug: "bag-red",
      },
    ],
  },
  {
    slug: "bag-red",
    title: "Bag Red",
    price: "$45",
    description: "Elegant red bag.",
    images: [
      "https://picsum.photos/500/500?random=7",
      "https://picsum.photos/500/500?random=8",
    ],
    variants: [
      {
        name: "Black",
        image: "https://picsum.photos/500/500?random=1",
        slug: "bag-black",
      },
      {
        name: "Brown",
        image: "https://picsum.photos/500/500?random=5",
        slug: "bag-brown",
      },
      {
        name: "Red",
        image: "https://picsum.photos/500/500?random=7",
        slug: "bag-red",
      },
    ],
  },
];

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductPage({ params }: PageProps) {
  const { slug } = use(params);
  const router = useRouter();

  const product = dummyProducts.find((p) => p.slug === slug);
  if (!product) return notFound();

  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="pt-6 md:pt-20">
      <section className="py-16 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-5 md:gap-12">
          {/* Left: Images */}
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            {/* Main Image */}
            <div className="w-full aspect-square relative overflow-hidden border">
              <Image
                src={selectedImage}
                alt={product.title}
                fill
                className="object-cover w-full h-full"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 hidden md:flex">
              {product.images.map((img, idx) => (
                <div
                  key={idx}
                  className={`w-20 aspect-square border cursor-pointer overflow-hidden relative ${
                    selectedImage === img
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                  onClick={() => setSelectedImage(img)}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${idx}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <div className="w-full md:w-1/2 flex flex-col justify-start gap-4">
            <h1 className="text-3xl font-semibold text-gray-900">
              {product.title}
            </h1>
            <span className="text-xl text-gray-700">{product.price}</span>

            {/* Variant */}
            <div className="mt-2">
              <span className="font-medium mr-2">Variant:</span>
              <div className="flex gap-2 mt-1">
                {product.variants.map((variant) => (
                  <div
                    key={variant.slug}
                    className={`w-12 h-12 border cursor-pointer relative ${
                      variant.slug === product.slug
                        ? "border-blue-500"
                        : "border-gray-300"
                    }`}
                    onClick={() => router.push(`/product/${variant.slug}`)}
                  >
                    <Image
                      src={variant.image}
                      alt={variant.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="text-sm text-gray-600">
                SKU : 12345314232543
              </span>
            </div>

            {/* <Button className="mt-4 text-white px-6 py-3 rounded-none">
              Add to Cart
            </Button> */}

            {/* Collapsible Description */}
            <div className="mt-4">
              <div
                className="flex items-center justify-between border-b border-gray-300 py-2 cursor-pointer"
                onClick={() => setIsOpen((prev) => !prev)}
              >
                <span>Description</span>
                {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="desc"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden text-gray-600 mt-2"
                  >
                    <p>{product.description}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
