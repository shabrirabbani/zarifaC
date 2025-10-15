import { getGallery } from "@/services/galleryService";
import Image from "next/image";

export default async function Gallery() {
  const gallery = await getGallery();

  if (!gallery) return null;

  return (
    <div className="pt-6 md:pt-24 max-w-7xl mx-auto">
      <section className="py-16 px-6 md:px-12">
        <div className="mb-4 md:mb-8">
          <h2 className="text-2xl md:text-4xl tracking-wider text-center text-gray-900 font-semibold">
            {gallery.title}
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {gallery.image.map((img) => (
            <div
              key={img.id}
              className="relative w-full aspect-[3/4] cursor-pointer overflow-hidden group"
            >
              <Image
                src={img.url}
                alt={img.name}
                fill
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
