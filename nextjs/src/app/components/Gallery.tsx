"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const galleryImages = [
  "https://picsum.photos/600/600?random=1",
  "https://picsum.photos/600/600?random=2",
  "https://picsum.photos/600/600?random=3",
  "https://picsum.photos/600/600?random=4",
  "https://picsum.photos/600/600?random=5",
  "https://picsum.photos/600/600?random=6",
  "https://picsum.photos/600/600?random=7",
  "https://picsum.photos/600/600?random=8",
];

export default function Gallery() {
  return (
    <section className="py-16 bg-white">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-semibold tracking-wide text-gray-800">
          Gallery
        </h2>
        <p className="text-gray-500 mt-2">Explore our visual inspirations</p>
      </div>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-5  gap-4 px-6 md:px-12"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.05 } },
        }}
      >
        {galleryImages.map((src, index) => (
          <motion.div
            key={index}
            className="relative w-full aspect-square cursor-pointer overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <Image
              src={src}
              alt={`Gallery ${index + 1}`}
              fill
              className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
