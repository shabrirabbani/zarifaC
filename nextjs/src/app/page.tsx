import ShopByCategories from "./components/Categories";
import Gallery from "./components/Gallery";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import NewArrival from "./components/NewArival";

export default async function Home() {
  const newArrivals = [
    {
      title: "Pakaian",
      description: "A limited-edition series inspired by the desert landscape.",
      banner: "https://picsum.photos/1200/600?random=1",
      products: [
        {
          id: 1,
          name: "Gamis",
          price: "Rp 350.000",
          image: "https://picsum.photos/400/400?random=11",
        },
        {
          id: 2,
          name: "Tunik",
          price: "Rp 290.000",
          image: "https://picsum.photos/400/400?random=12",
        },
        {
          id: 3,
          name: "Kemeja",
          price: "Rp 320.000",
          image: "https://picsum.photos/400/400?random=13",
        },
        {
          id: 4,
          name: "Dress",
          price: "Rp 410.000",
          image: "https://picsum.photos/400/400?random=14",
        },
      ],
    },
    {
      title: "Sepatu",
      description: "A collection of comfortable and elegant footwear.",
      banner: "https://picsum.photos/1200/600?random=2",
      products: [
        {
          id: 1,
          name: "Sneakers",
          price: "Rp 450.000",
          image: "https://picsum.photos/400/400?random=21",
        },
        {
          id: 2,
          name: "Flat Shoes",
          price: "Rp 380.000",
          image: "https://picsum.photos/400/400?random=22",
        },
        {
          id: 3,
          name: "Heels",
          price: "Rp 520.000",
          image: "https://picsum.photos/400/400?random=23",
        },
        {
          id: 4,
          name: "Boots",
          price: "Rp 600.000",
          image: "https://picsum.photos/400/400?random=24",
        },
      ],
    },
  ];
  return (
    <div className="pt-18 md:pt-26">
      <Navbar />
      <Hero />
      <ShopByCategories />
      <div>
        <h2 className="text-xl md:text-2xl font-semibold text-center mb-8 tracking-wide">
          NEW ARRIVALS
        </h2>
        {newArrivals.map((section, idx) => (
          <NewArrival key={idx} {...section} />
        ))}
        <Gallery />
      </div>
    </div>
  );
}
