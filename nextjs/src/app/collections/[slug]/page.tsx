"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useState } from "react";

// ===== Dummy data =====
type Product = {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
  url: string;
};

type Collection = {
  title: string;
  slug: string;
  description: string;
  products: Product[];
};

const dummyCollections: Collection[] = [
  {
    title: "Bags Collection",
    slug: "bags",
    description: "Explore our latest bag collection.",
    products: [
      {
        id: 1,
        name: "Scarf A",
        price: "$25",
        image: "https://picsum.photos/300/400?random=1",
        category: "Scarf",
        url: "/product/bag-black",
      },
      {
        id: 2,
        name: "Scarf B",
        price: "$30",
        image: "https://picsum.photos/300/400?random=2",
        category: "Scarf",
        url: "/product/bag-black",
      },
      {
        id: 3,
        name: "Bag C",
        price: "$45",
        image: "https://picsum.photos/300/400?random=3",
        category: "Bag",
        url: "/product/bag-black",
      },
      {
        id: 4,
        name: "Bag D",
        price: "$50",
        image: "https://picsum.photos/300/400?random=4",
        category: "Bag",
        url: "/product/bag-black",
      },
      {
        id: 5,
        name: "Hat E",
        price: "$20",
        image: "https://picsum.photos/300/400?random=5",
        category: "Hat",
        url: "/product/bag-black",
      },
      {
        id: 6,
        name: "Hat F",
        price: "$22",
        image: "https://picsum.photos/300/400?random=6",
        category: "Hat",
        url: "/product/bag-black",
      },
    ],
  },
];

// ===== Komponen utama =====
interface PageProps {
  params: { slug: string };
}

export default function CollectionPage({ params }: PageProps) {
  const collection = dummyCollections.find((c) => c.slug === params.slug);
  if (!collection) return notFound();

  const [open, setOpen] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

  const categories = Array.from(
    new Set(collection.products.map((p) => p.category))
  );

  const prices = [
    "Rp 100,000 - Rp 200,000",
    "Rp 200,000 - Rp 500,000",
    "Rp 500,000 - Rp 1,000,000",
    "Rp 1,000,000 - Rp 10,000,000",
  ];

  // Handle Checkbox
  const handleCheckbox = (item: string) => {
    setSelectedFilters((prev) =>
      prev.includes(item) ? prev.filter((f) => f !== item) : [...prev, item]
    );
  };

  // Handle Clear All
  const handleClear = () => {
    setSelectedFilters([]);
    setSelectedPrice(null);
  };

  // Filter produk berdasarkan kategori yang dipilih
  const filteredProducts =
    selectedFilters.length > 0
      ? collection.products.filter((p) => selectedFilters.includes(p.category))
      : collection.products;

  return (
    <div className="pt-6 md:pt-20">
      <section className="py-16 px-6 md:px-12 bg-white">
        {/* Header Section */}
        <div className="mb-5 md:mb-12">
          <h1 className="text-2xl md:text-4xl font-semibold tracking-tight text-gray-900">
            {collection.title}
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* === Sidebar Filter === */}
          <aside className="w-full lg:w-1/4 lg:sticky lg:top-28 self-start h-fit">
            <h2 className="mb-4 tracking-widest text-gray-900">FILTER BY:</h2>

            {/* === Active Filters === */}
            {(selectedFilters.length > 0 || selectedPrice) && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedPrice && (
                  <div className="flex items-center gap-1 border rounded-md px-2 py-1 text-sm">
                    Price: {selectedPrice}{" "}
                    <button
                      onClick={() => setSelectedPrice(null)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
                {selectedFilters.map((filter) => (
                  <div
                    key={filter}
                    className="flex items-center gap-1 border rounded-md px-2 py-1 text-sm"
                  >
                    {filter}
                    <button
                      onClick={() =>
                        setSelectedFilters(
                          selectedFilters.filter((f) => f !== filter)
                        )
                      }
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={handleClear}
                  className="text-gray-700 text-sm underline ml-auto"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* === Collapsible Filters === */}
            <div className="space-y-4">
              {/* Category */}
              <Collapsible
                open={open === "Category"}
                onOpenChange={() =>
                  setOpen(open === "Category" ? null : "Category")
                }
              >
                <CollapsibleTrigger className="flex justify-between w-full font-medium text-gray-800">
                  Category
                  {open === "Category" ? (
                    <Minus size={16} />
                  ) : (
                    <Plus size={16} />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-3 space-y-2">
                  {categories.map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center gap-2 text-gray-700 text-sm cursor-pointer"
                    >
                      <Checkbox
                        checked={selectedFilters.includes(cat)}
                        onCheckedChange={() => handleCheckbox(cat)}
                      />
                      {cat}
                    </label>
                  ))}
                </CollapsibleContent>
              </Collapsible>

              {/* Price */}
              <Collapsible
                open={open === "Price"}
                onOpenChange={() => setOpen(open === "Price" ? null : "Price")}
              >
                <CollapsibleTrigger className="flex justify-between w-full font-medium text-gray-800">
                  Price
                  {open === "Price" ? <Minus size={16} /> : <Plus size={16} />}
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-3 space-y-2">
                  <RadioGroup
                    value={selectedPrice || ""}
                    onValueChange={(value) => setSelectedPrice(value)}
                  >
                    {prices.map((p) => (
                      <div
                        key={p}
                        className="flex items-center gap-2 text-gray-700 text-sm"
                      >
                        <RadioGroupItem value={p} id={p} />
                        <label htmlFor={p}>{p}</label>
                      </div>
                    ))}
                  </RadioGroup>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </aside>

          {/* === Grid Produk === */}
          <div className="w-full lg:w-3/4 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                <Link href={product.url}>
                  {/* Gambar Produk */}
                  <div className="overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={300}
                      height={400}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Nama & Harga */}
                  <div className="mt-2 text-center">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mt-1">{product.price}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
