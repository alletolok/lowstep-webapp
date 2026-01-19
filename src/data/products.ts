// src/data/products.ts

export type Product = {
  id: string;
  title: string;
  price: number;
  images: string[];
  sizes: number[];
};

// базовые товары
const baseProducts: Product[] = [
  {
    id: "adidas-samba-og",
    title: "Adidas Samba OG",
    price: 8990,
    images: ["/products/AdidasSambaOG.png"],
    sizes: [40, 41, 42, 43, 44],
  },
  {
    id: "air-jordan-1",
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
    id: "asics-gel-nyc",
    title: "ASICS GEL-NYC",
    price: 13290,
    images: [
      "/products/AsicsGEL-NYC.png",
      "/products/AsicsGEL-NYC(2).png",
      "/products/AsicsGEL-NYC(3).png",
    ],
    sizes: [40, 41, 42, 43, 44],
  },
  {
    id: "nike-zoom-vomero",
    title: "Nike Zoom Vomero",
    price: 16290,
    images: [
      "/products/NikeZoomVomero.png",
      "/products/NikeZoomVomero(3).png",
      "/products/NikeZoomVomero(2).png",
    ],
    sizes: [40, 41, 42, 43, 44],
  },
  {
    id: "nike-air-max-90",
    title: "Nike Air Max 90",
    price: 15890,
    images: ["/products/NikeAirMax90.png"],
    sizes: [40, 41, 42, 43, 44],
  },
];

// 👉 дублируем для нормального скролла
export const products: Product[] = Array.from({ length: 4 }).flatMap(
  (_, i) =>
    baseProducts.map((p) => ({
      ...p,
      id: ${p.id}-${i},
    }))
);