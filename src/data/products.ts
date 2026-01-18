import type { Product } from "../types/product";

const base: Product[] = [
  {
    id: "p1",
    title: "Nike Air Max 90",
    price: 14990,
    images: ["/products/airmax90.jpg"],
    description:
      "Классика на каждый день. Легкие, удобные, подходят под любой лук.",
    sizes: [
      { size: "39", available: false },
      { size: "40", available: true },
      { size: "41", available: true },
      { size: "42", available: true },
      { size: "43", available: false },
    ],
  },
  {
    id: "p2",
    title: "Adidas Samba OG",
    price: 13990,
    images: ["/products/samba.jpg"],
    description:
      "Икона стиля. Узнаваемый силуэт, комфортная посадка, аккуратно смотрится с чем угодно.",
    sizes: [
      { size: "40", available: true },
      { size: "41", available: true },
      { size: "42", available: true },
      { size: "43", available: false },
      { size: "44", available: true },
    ],
  },
  {
    id: "p3",
    title: "Nike Dunk Low",
    price: 15990,
    images: ["/products/dunk.jpg"],
    description:
      "Городская база. Плотная посадка, стабильная подошва, отлично в повседнев.",
    sizes: [
      { size: "40", available: true },
      { size: "41", available: false },
      { size: "42", available: true },
      { size: "43", available: true },
      { size: "44", available: true },
    ],
  },
  {
    id: "p4",
    title: "New Balance 2002R",
    price: 17990,
    images: ["/products/newbalance.jpg"],
    description:
      "Супер комфорт. Мягкая подошва, выглядит дорого. Идеально для города.",
    sizes: [
      { size: "40", available: true },
      { size: "41", available: true },
      { size: "42", available: true },
      { size: "43", available: true },
      { size: "44", available: false },
    ],
  },
  {
    id: "p5",
    title: "ASICS Gel-Kayano 14",
    price: 18990,
    images: ["/products/asics.jpg"],
    description:
      "Беговой вайб в лайфстайле. Амортизация, легкость, очень приятная ходьба.",
    sizes: [
      { size: "39", available: true },
      { size: "40", available: true },
      { size: "41", available: true },
      { size: "42", available: false },
      { size: "43", available: true },
    ],
  },
  {
    id: "p6",
    title: "Nike Vomero 5",
    price: 19990,
    images: ["/products/extra.jpg"],
    description:
      "Трендовая ретро-беговая форма. Дышит, мягкая, на ноге выглядит топ.",
    sizes: [
      { size: "40", available: true },
      { size: "41", available: true },
      { size: "42", available: true },
      { size: "43", available: true },
      { size: "44", available: true },
    ],
  },
];

// делаем много товаров для скролла, но логику компонентов не трогаем
function makeManyProducts(src: Product[], targetCount = 60): Product[] {
  const out: Product[] = [];
  let i = 0;

  while (out.length < targetCount) {
    const p = src[i % src.length];
    const idx = Math.floor(i / src.length) + 1;

    out.push({
      ...p,
      id: `${p.id}-${idx}`,
      // небольшая вариативность цен (чтобы не было клонов 1 в 1)
      price: p.price + ((idx * 300) % 1800),
      // можно расширять позже на 2-3 фотки, но пока стабильно 1 локальная
      images: [...p.images],
    });

    i += 1;
  }

  return out;
}

export const products: Product[] = makeManyProducts(base, 60);
