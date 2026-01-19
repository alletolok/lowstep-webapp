export const baseProducts: Product[] = [
  {
    id: 1,
    title: "Adidas Samba OG",
    price: 8990,
    images: ["/products/AdidasSambaOG.png"],
    sizes: [40, 41, 42, 43, 44],
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
  },
  {
    id: 3,
    title: "Asics GEL-NYC",
    price: 12990,
    images: [
      "/products/AsicsGEL-NYC.png",
      "/products/AsicsGEL-NYC(2).png",
      "/products/AsicsGEL-NYC(3).png",
    ],
    sizes: [40, 41, 42, 43],
  },
  {
    id: 4,
    title: "Nike Zoom Vomero",
    price: 13990,
    images: [
      "/products/NikeZoomVomero.png",
      "/products/NikeZoomVomero(2).png",
      "/products/NikeZoomVomero(3).png",
    ],
    sizes: [41, 42, 43, 44],
  },
  {
    id: 5,
    title: "Nike Air Max 90",
    price: 11990,
    images: ["/products/NikeAirMax90.png"],
    sizes: [40, 41, 42, 43, 44],
  },
];

export const products: Product[] = [
  ...baseProducts,
  ...baseProducts.map(p => ({ ...p, id: p.id + 100 })),
  ...baseProducts.map(p => ({ ...p, id: p.id + 200 })),
  ...baseProducts.map(p => ({ ...p, id: p.id + 300 })),
  ...baseProducts.map(p => ({ ...p, id: p.id + 400 })),
  ...baseProducts.map(p => ({ ...p, id: p.id + 500 })),
  ...baseProducts.map(p => ({ ...p, id: p.id + 600 })),
  ...baseProducts.map(p => ({ ...p, id: p.id + 700 })),
];

