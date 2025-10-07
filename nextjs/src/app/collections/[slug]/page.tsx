import Image from "next/image";
import { notFound } from "next/navigation";

type Product = {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
};

type Collection = {
  title: string;
  slug: string;
  description: string;
  products: Product[];
};

// Dummy data
const dummyCollections: Collection[] = [
  {
    title: "Buttonscarves Accessories",
    slug: "bags",
    description: "Explore our latest accessories collection.",
    products: [
      {
        id: 1,
        name: "Scarf A",
        price: "$25",
        image: "https://picsum.photos/300/400?random=1",
        category: "Scarf",
      },
      {
        id: 2,
        name: "Scarf B",
        price: "$30",
        image: "https://picsum.photos/300/400?random=2",
        category: "Scarf",
      },
      {
        id: 3,
        name: "Bag C",
        price: "$45",
        image: "https://picsum.photos/300/400?random=3",
        category: "Bag",
      },
      {
        id: 4,
        name: "Bag D",
        price: "$50",
        image: "https://picsum.photos/300/400?random=4",
        category: "Bag",
      },
      {
        id: 5,
        name: "Hat E",
        price: "$20",
        image: "https://picsum.photos/300/400?random=5",
        category: "Hat",
      },
      {
        id: 6,
        name: "Hat F",
        price: "$22",
        image: "https://picsum.photos/300/400?random=6",
        category: "Hat",
      },
    ],
  },
];

interface PageProps {
  params: { slug: string };
}

export default function CollectionPage({ params }: PageProps) {
  const collection = dummyCollections.find((c) => c.slug === params.slug);
  if (!collection) return notFound();

  const categories = Array.from(
    new Set(collection.products.map((p) => p.category))
  );
  const selectedCategory = ""; // dummy
  const filteredProducts = selectedCategory
    ? collection.products.filter((p) => p.category === selectedCategory)
    : collection.products;

  return (
    <section className="py-16 px-6 md:px-12 bg-white">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          {collection.title}
        </h1>
        <p className="mt-4 text-gray-600">{collection.description}</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filter */}
        <aside className="w-full lg:w-1/4 border p-4 rounded-md bg-gray-50">
          <h2 className="font-semibold mb-4">Filter by Category</h2>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li key={cat} className="cursor-pointer hover:text-blue-600">
                {cat}
              </li>
            ))}
          </ul>
        </aside>

        {/* Grid Produk */}
        <div className="w-full lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              {/* Gambar */}
              <div className="overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={400}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Judul & Harga */}
              <div className="mt-2 text-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-gray-600 mt-1">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
