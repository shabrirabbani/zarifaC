"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://picsum.photos/1600/700?random=2"
        alt="Elzatta Hero Banner"
        fill
        priority
        className="object-cover w-full h-full"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Text Content */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-3xl md:text-5xl font-semibold mb-4">
          Discover the New Collection
        </h1>
        <p className="text-sm md:text-lg mb-6">
          Stylish. Comfortable. Timeless.
        </p>
        <Link
          href="/shop"
          className="bg-white text-black px-6 py-3 font-medium text-sm md:text-base tracking-wide hover:bg-gray-200 transition-all"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
}
