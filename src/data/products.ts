// src/data/products.ts
import type { Product } from "../types/product";

const baseProducts: Product[] = [
  {
    id: 1,
    title: "Adidas Samba OG",
    price: 8990,
    images: ["/products/AdidasSambaOG.png"],
    sizes: [40, 41, 42, 43, 44],
    description:
      "Классика на каждый день: Samba OG — низкий профиль, комфортная посадка и тот самый вайб ретро-футбола.",
  },
  {
    id: 2,
    title: "Air Jordan 1",
    price: 14990,
    images: [
      "/products/AirJordan.png",
      "/products/AirJordan(2).png",
      "/products/AirJordan(3).png",
      "/products/AirJordan(4).png",
    ],
    sizes: [41, 42, 43, 44],
    description:
      "Air Jordan 1 - легенда. Высокий силуэт, узнаваемая форма и стиль, который не устаревает вообще никогда. Любите стиль и оригинальность? Тогда вам точно стоит приобрести данный вариант! Унисекс, пойдут как мужчинам так и женщинам. Отлично пойдут как подарок, покупайте и удивляйте родных и близких.",
  },
  {
    id: 3,
    title: "ASICS GEL-NYC",
    price: 17990,
    images: [
      "/products/AsicsGEL-NYC.png",
      "/products/AsicsGEL-NYC(2).png",
      "/products/AsicsGEL-NYC(3).png",
    ],
    sizes: [40, 41, 42, 43, 44],
    description:
      "ASICS GEL-NYC — комфорт на максималках: мягкая амортизация, техно-ретро и супер удобная колодка.",
  },
  {
    id: 4,
    title: "Nike Zoom Vomero",
    price: 20590,
    images: [
      "/products/NikeZoomVomero.png",
      "/products/NikeZoomVomero(3).png",
      "/products/NikeZoomVomero(2).png",
    ],
    sizes: [40, 41, 42, 43, 44],
    description:
      "Vomero — про мягкость и беговой комфорт в лайфстайле. Нога скажет спасибо, стилёк тоже.",
  },
  {
    id: 5,
    title: "Nike Air Max 90",
    price: 15890,
    images: ["/products/NikeAirMax90.png"],
    sizes: [40, 41, 42, 43, 44],
    description:
      "Air Max 90 — база. Силуэт узнаётся с километра, амортизация — приятная, стиль — железный.",
  },
];

function makeLots(multiplier = 18): Product[] {
  // 5 базовых * 18 = 90 товаров — нормальный скролл на ПК
  const out: Product[] = [];
  let id = 1;

  for (let round = 0; round < multiplier; round++) {
    for (const p of baseProducts) {
      const variant = round % 6; // просто чтобы названия не были 1-в-1
      const suffix =
        variant === 0
          ? ""
          : variant === 1
          ? " • Classic"
          : variant === 2
          ? " • Premium"
          : variant === 3
          ? " • OG"
          : variant === 4
          ? " • Limited"
          : " • Sport";

      out.push({
        ...p,
        id: id++,
        title: p.title + suffix,
        // микролёгкая “разбежка” цен, чтобы не выглядело как копипаста
        price: p.price + round * 10,
      });
    }
  }

  return out;
}

export const products: Product[] = makeLots(18);
