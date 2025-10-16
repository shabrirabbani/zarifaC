import { getCollectionBySlug } from "@/services/collectionService";
import { notFound } from "next/navigation";
import CollectionClient from "./collection-client";

interface PageProps {
  params: { slug: string };
}

export default async function CollectionPage({ params }: PageProps) {
  const collection = await getCollectionBySlug(params.slug);
  if (!collection) return notFound();
  return <CollectionClient collection={collection} />;
}
