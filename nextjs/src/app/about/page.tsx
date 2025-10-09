"use client";

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

export default function About() {
  return (
    <div className="pt-6 md:pt-20">
      <section className="py-16 px-6 md:px-12">
        <div className="mb-4 md:mb-8">
          <h2 className="text-2xl md:text-4xl tracking-wider text-center text-gray-900 font-semibold">
            Our Story
          </h2>
        </div>

        <div>
          <Image
            src="https://picsum.photos/1200/600?random=1"
            alt="Elzatta Hero Banner"
            width={1200}
            height={600}
            className="object-cover w-full h-full"
          />
          <p className="text-base md:text-lg text-gray-600 text-justify mt-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
            consectetur, quos natus quas quia quae quod quibusdam quidem
            quaequae quaequae quaequae quaequae quaequae quaequae quaequae
            quaequae quaequae quaequae quaequae quaequae quaequae quaequae
            quaequae quaequae quaequae quaequae quaequae quaequae quaequae
            quaequae quaequae quaequae quaequae quaequae quaequae quaequae
            quaequae quaequae quaequae quaequae quaequae quaequae quaequae
            quaequae quaequae quaequae quaequae quaequae quaequae quaequae
            quaequae quaequae quaequae quaequae quaequae quaequae quaequae
            quaequae quaequae quaequae quaequae quaequae quaequae quaequae
            quaequae quaequae quaequae quaequae quaequae quaequae quaequae
            quaequae quaequae quaequae quaequae quaequae quaequae quaequae
            quaequae quaequae quaequae quaequae quaequae quaequae quaequae
          </p>
        </div>
      </section>
    </div>
  );
}
