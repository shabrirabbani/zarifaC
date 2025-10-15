import { getAbout } from "@/services/aboutService";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Image from "next/image";

export default async function About() {
  const about = await getAbout();
  if (!about) return null;

  const blocks =
    typeof about.content === "string"
      ? JSON.parse(about.content)
      : about.content;

  return (
    <div className="pt-6 md:pt-24 max-w-7xl mx-auto">
      <section className="py-16 px-6 md:px-12">
        <div className="mb-4 md:mb-8">
          <h2 className="text-2xl md:text-4xl tracking-wider text-center text-gray-900 font-semibold">
            {about.title}
          </h2>
        </div>

        <div>
          <Image
            src={
              about.image
                ? typeof about.image === "string"
                  ? about.image
                  : about.image.url.startsWith("http")
                  ? about.image.url
                  : `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${about.image.url}`
                : "/placeholder.jpg"
            }
            alt={about.title}
            width={1200}
            height={600}
            className="object-cover w-full h-full"
          />

          <div className="text-base md:text-lg text-gray-600 text-justify mt-5">
            <BlocksRenderer content={blocks} />
          </div>
        </div>
      </section>
    </div>
  );
}
