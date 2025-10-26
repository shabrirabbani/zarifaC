import { getHero } from "@/services/heroService";
import Image from "next/image";
import Link from "next/link";

export default async function Hero() {
  const hero = await getHero();
  if (!hero) return null;

  return (
    <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src={hero.backgroundUrl || "/placeholder.jpg"}
        alt="Hero Banner"
        fill
        priority
        className="object-cover w-full h-full"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Text Content (hanya muncul jika ada title atau buttonText) */}
      {(hero.title || hero.buttonText) && (
        <div className="relative z-10 text-center text-white px-4">
          {hero.title && (
            <p className="text-sm md:text-lg mb-6">{hero.title}</p>
          )}

          {hero.buttonText && hero.buttonLink && (
            <Link
              href={hero.buttonLink}
              className="bg-white/20 text-white px-12 py-3 font-medium text-sm md:text-base tracking-wide hover:bg-white/10 transition-all"
            >
              {hero.buttonText}
            </Link>
          )}
        </div>
      )}
    </section>
  );
}
