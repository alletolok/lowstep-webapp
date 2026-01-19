// src/data/products.ts
import type { Product } from "../types/product";

export const baseProducts: Product[] = [
  {
    id: 1,
    title: "Adidas Samba OG",
    price: 14290,
    description: "Классические Adidas Samba OG — вечная модель для города.",
    images: ["/products/AdidasSambaOG.png"],
    sizes: [40, 41, 42, 43, 44],
  },
  {
    id: 2,
    title: "Air Jordan 1",
    price: 14990,
    description: "Air Jordan 1 — культовая баскетбольная модель с историей.",
    images: [
      "/products/AirJordan.png",
      "/products/AirJordan(2).png",
      "/products/AirJordan(3).png",
      "/products/AirJordan(4).png",
    ],
    sizes: [41, 42, 43, 44],
  },
  {
    id: 3,
    title: "ASICS GEL-NYC",
    price: 19290,
    description: "ASICS GEL-NYC — комфорт и беговое ДНК в лайфстайл-формате.",
    images: [
      "/products/AsicsGEL-NYC.png",
      "/products/AsicsGEL-NYC(2).png",
      "/products/AsicsGEL-NYC(3).png",
    ],
    sizes: [40, 41, 42, 43, 44],
  },
  {
    id: 4,
    title: "Nike Zoom Vomero 5",
    price: 20290,
    description: "Nike Zoom Vomero 5 — максимум комфорта на каждый день.",
    images: [
      "/products/NikeZoomVomero.png",
      "/products/NikeZoomVomero(3).png",
      "/products/NikeZoomVomero(2).png",
    ],
    sizes: [40, 41, 42, 43, 44],
  },
  {
    id: 5,
    title: "Nike Air Max 90",
    price: 15890,
    description: "Nike Air Max 90 — икона с фирменным Air-балоном.",
    images: ["/products/NikeAirMax90.png"],
    sizes: [40, 41, 42, 43, 44],
  },
];

// дублируем для скролла
export const products: Product[] = Array.from({ length: 4 }).flatMap(
  (_, batch) =>
    baseProducts.map((p) => ({
      ...p,
      id: p.id + batch * 1000,
    }))
);
