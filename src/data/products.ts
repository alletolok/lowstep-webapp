export type Product = {
  id: string;
  title: string;
  price: number;
  images: string[];
  sizes: number[];
  description?: string;
};

const baseProducts: Omit<Product, "id">[] = [
  {
    title: "Adidas Samba OG",
    price: 14290,
    images: ["/products/AdidasSambaOG.png"],
    sizes: [40, 41, 42, 43, 44],
  },
  {
    title: "Air Jordan 1",
    price: 14990,
    images: [
      "/products/AirJordan.png",
      "/products/AirJordan(2).png",
      "/products/AirJordan(3).png",
      "/products/AirJordan(4).png",
    ],
    sizes: [41, 42, 43, 44],
  },
  {
    title: "ASICS GEL-NYC",
    price: 19990,
    images: [
      "/products/AsicsGEL-NYC.png",
      "/products/AsicsGEL-NYC(2).png",
      "/products/AsicsGEL-NYC(3).png",
    ],
    sizes: [40, 41, 42, 43, 44, 45],
  },
  {
    title: "Nike Zoom Vomero 5",
    price: 20890,
    images: [
      "/products/NikeZoomVomero.png",
      "/products/NikeZoomVomero(3).png",
      "/products/NikeZoomVomero(2).png",
    ],
    sizes: [40, 41, 42, 43, 44, 45],
  },
  {
    title: "Nike Air Max 90",
    price: 15890,
    images: ["/products/NikeAirMax90.png"],
    sizes: [40, 41, 42, 43, 44, 45],
  },
];

// сколько раз дублируем (можешь поставить 4-6)
const COPIES = 4;

export const products: Product[] = Array.from({ length: COPIES }, (_, copyIdx) =>
  baseProducts.map((p, baseIdx) => ({
    id: `${copyIdx}-${baseIdx}-${p.title.toLowerCase().replace(/\s+/g, "-")}`,
    ...p,
  }))
).flat();

    price: 15890,
    images: ["/products/NikeAirMax90.png"],
    sizes: [40, 41, 42, 43, 44, 45],
  },
];

// сколько раз дублируем (можешь поставить 4-6)
const COPIES = 4;

export const products: Product[] = Array.from({ length: COPIES }, (_, copyIdx) =>
  baseProducts.map((p, baseIdx) => ({
    id: `${copyIdx}-${baseIdx}-${p.title.toLowerCase().replace(/\s+/g, "-")}`,
    ...p,
  }))
).flat();
