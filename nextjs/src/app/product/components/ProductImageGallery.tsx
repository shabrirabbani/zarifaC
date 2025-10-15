"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// Helper untuk normalisasi URL gambar Strapi
function getStrapiMedia(url?: string) {
  if (!url) return "/placeholder.jpg";
  return url.startsWith("http")
    ? url
    : `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
}

interface ProductImageGalleryProps {
  images: { url: string }[] | string[] | undefined;
  title: string;
}

export default function ProductImageGallery({
  images = [],
  title,
}: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    setSelectedImage(0);
  }, [images]);

  // Ubah array image menjadi list URL string aman
  const imageUrls = images.map((img: any) =>
    typeof img === "string" ? getStrapiMedia(img) : getStrapiMedia(img.url)
  );

  const mainImage = imageUrls[selectedImage] ?? "/placeholder.jpg";

  return (
    <div className="w-full md:w-1/2 flex flex-col gap-4">
      {/* Main Image */}
      <div className="w-full aspect-square relative overflow-hidden border rounded-lg">
        <Image
          src={mainImage}
          alt={title}
          fill
          priority
          className="object-cover w-full h-full"
        />
      </div>

      {/* Thumbnails */}
      {imageUrls.length > 1 && (
        <div className="flex gap-4 mt-4 hidden md:flex">
          {imageUrls.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(idx)}
              className={`w-20 aspect-square border cursor-pointer overflow-hidden relative rounded-md transition ${
                selectedImage === idx ? "border-blue-500 border-2" : ""
              }`}
            >
              <Image
                src={img ?? "/placeholder.jpg"}
                alt={`Thumbnail ${idx}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
