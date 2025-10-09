"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Dummy collections data
const collections = [
  {
    id: 1,
    title: "Bags",
    image: "https://picsum.photos/600/400?random=1",
    url: "/collections/bags",
  },
  {
    id: 2,
    title: "Accessories",
    image: "https://picsum.photos/600/400?random=2",
    url: "/collections/accessories",
  },
  {
    id: 3,
    title: "Active Slip-On 2.0",
    image: "https://picsum.photos/600/400?random=3",
    url: "/collections/active-slip-on-2.0",
  },
  {
    id: 4,
    title: "Activewear",
    image: "https://picsum.photos/600/400?random=4",
    url: "/collections/activewear",
  },
  {
    id: 5,
    title: "Al Aqsa Series",
    image: "https://picsum.photos/600/400?random=5",
    url: "/collections/al-aqsa-series",
  },
  {
    id: 6,
    title: "Al-Fitr Hampers",
    image: "https://picsum.photos/600/400?random=6",
    url: "/collections/al-fitr-hampers",
  },
];

export default function CollectionsPage() {
  return (
    <div className="pt-6 md:pt-20">
      <section className="py-16 px-6 md:px-12">
        <div className=" mb-4 md:mb-8">
          <h1 className="text-2xl md:text-4xl tracking-wider text-gray-900 font-semibold text-center">
            Collections
          </h1>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.05 } },
          }}
        >
          {collections.map((collection) => (
            <motion.div
              key={collection.id}
              className="relative cursor-pointer overflow-hidden group"
              whileHover={{}}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <div className="relative w-full aspect-[4/3]">
                {/* Gambar zoom saat hover */}
                <Link href={collection.url}>
                  <Image
                    src={collection.image}
                    alt={collection.title}
                    fill
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Overlay text selalu terlihat */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <h2 className="text-white text-lg md:text-xl font-semibold text-center px-2">
                      {collection.title}
                    </h2>
                  </div>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
