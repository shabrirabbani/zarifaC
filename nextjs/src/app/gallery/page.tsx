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
    <div className="pt-6 md:pt-20">
      <section className="py-16 px-6 md:px-12">
        <div className="mb-4 md:mb-8">
          <h2 className="text-2xl md:text-4xl tracking-wider text-center text-gray-900 font-semibold">
            Gallery
          </h2>
        </div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-5 gap-4 "
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.05 } },
          }}
        >
          {galleryImages.map((src, index) => (
            <motion.div
              key={index}
              className="relative w-full aspect-[3/4] cursor-pointer overflow-hidden"
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
    </div>
  );
}
