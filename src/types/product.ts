export type Product = {
  id: number;
  title: string;
  price: number;
  images: string[]; // пути к фото
  description: string;
  sizes: number[];
};
