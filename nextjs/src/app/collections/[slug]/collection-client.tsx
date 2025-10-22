"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatRupiah } from "@/lib/formatRp";
import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function CollectionClient({ collection }: { collection: any }) {
  const [open, setOpen] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

  const categories = Array.from(
    new Set(collection.products.map((p: any) => p.category).filter(Boolean))
  ) as string[];

  const priceRanges = [
    { label: "Rp 100,000 - Rp 200,000", min: 100000, max: 200000 },
    { label: "Rp 200,000 - Rp 500,000", min: 200000, max: 500000 },
    { label: "Rp 500,000 - Rp 1,000,000", min: 500000, max: 1000000 },
    { label: "Rp 1,000,000 - Rp 10,000,000", min: 1000000, max: 10000000 },
  ];

  // Filter kategori
  const handleCheckbox = (item: string) => {
    setSelectedFilters((prev) =>
      prev.includes(item) ? prev.filter((f) => f !== item) : [...prev, item]
    );
  };

  const handleClear = () => {
    setSelectedFilters([]);
    setSelectedPrice(null);
  };

  const filteredProducts =
    selectedFilters.length > 0 || selectedPrice
      ? collection.products.filter((p: any) => {
          const inCategory =
            selectedFilters.length === 0 ||
            selectedFilters.includes(p.category?.name);

          const inPrice =
            !selectedPrice ||
            (() => {
              const range = priceRanges.find((r) => r.label === selectedPrice);
              if (!range) return true;
              const price = Number(p.price);
              return price >= range.min && price <= range.max;
            })();

          return inCategory && inPrice;
        })
      : collection.products;

  return (
    <div className="pt-6 md:pt-24 max-w-7xl mx-auto">
      <section className="py-16 px-6 md:px-12 bg-white">
        {/* Header */}
        <div className="mb-5 md:mb-12">
          <h1 className="text-lg md:text-2xl font-medium tracking-wider text-center text-gray-900">
            {collection.title}
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* === Sidebar Filter === */}
          <aside className="w-full lg:w-1/4 lg:sticky lg:top-28 self-start h-fit">
            <h2 className="mb-4 tracking-widest text-gray-900 text-xs md:text-sm">
              FILTER BY:
            </h2>

            {/* Active Filters */}
            {(selectedFilters.length > 0 || selectedPrice) && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedPrice && (
                  <div className="flex items-center gap-1 border rounded-md px-2 py-1 text-xs">
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
                    className="flex items-center gap-1 border rounded-md px-2 py-1 text-xs"
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
                  className="text-gray-700 text-xs underline ml-auto"
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
                <CollapsibleTrigger className="flex justify-between w-full  text-gray-800 text-xs md:text-sm">
                  Category
                  {open === "Category" ? (
                    <Minus size={16} />
                  ) : (
                    <Plus size={16} />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-3 space-y-2">
                  <CollapsibleContent className="mt-3 space-y-2">
                    {categories.map((cat) => (
                      <label
                        key={cat}
                        className="flex items-center gap-2 text-gray-700 text-xs cursor-pointer"
                      >
                        <Checkbox
                          checked={selectedFilters.includes(cat)}
                          onCheckedChange={() => handleCheckbox(cat)}
                        />
                        {cat}
                      </label>
                    ))}
                  </CollapsibleContent>
                </CollapsibleContent>
              </Collapsible>

              {/* Price */}
              <Collapsible
                open={open === "Price"}
                onOpenChange={() => setOpen(open === "Price" ? null : "Price")}
              >
                <CollapsibleTrigger className="flex justify-between w-full text-xs md:text-sm text-gray-800">
                  Price
                  {open === "Price" ? <Minus size={16} /> : <Plus size={16} />}
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-3 space-y-2">
                  <RadioGroup
                    value={selectedPrice || ""}
                    onValueChange={(value) => setSelectedPrice(value)}
                  >
                    {priceRanges.map((range) => (
                      <div
                        key={range.label}
                        className="flex items-center gap-2 text-gray-700 text-xs"
                      >
                        <RadioGroupItem value={range.label} id={range.label} />
                        <label htmlFor={range.label}>{range.label}</label>
                      </div>
                    ))}
                  </RadioGroup>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </aside>

          {/* === Grid Produk === */}
          <div className="w-full lg:w-3/4 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product: any) => (
                <div key={product.id} className="group cursor-pointer">
                  <Link href={`/product/${product.slug}`}>
                    <div className="overflow-hidden">
                      <Image
                        src={
                          product.image?.[0]?.url
                            ? product.image[0].url
                            : "/placeholder.jpg"
                        }
                        alt={product.title}
                        width={300}
                        height={400}
                        className="object-cover w-full h-full aspect-[3/4] transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="mt-2 text-center">
                      <h3 className="text-xs md:text-sm font-medium text-gray-800 tracking-wider">
                        {product.title}
                      </h3>
                      <p className="text-gray-600 mt-1 text-xs tracking-wider">
                        {formatRupiah(product.price)}
                      </p>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 py-10">
                No Product Found
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
