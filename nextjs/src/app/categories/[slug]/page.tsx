import { getCategoryBySlug } from "@/services/categoryService";
import { notFound } from "next/navigation";
import CategoryClient from "./category-client";

interface PageProps {
  params: { slug: string };
}

export default async function CategoriesPage({ params }: PageProps) {
  const category = await getCategoryBySlug(params.slug);
  if (!category) return notFound();
  return <CategoryClient category={category} />;
}
