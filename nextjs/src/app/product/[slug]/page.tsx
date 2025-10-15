import { getProductBySlug } from "@/services/productService";
import ProductPage from "../components/ProductPage";

export default async function Page({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);

  if (!product) return <p>Product not found</p>;
  console.log(product);

  return <ProductPage product={product} />;
}
