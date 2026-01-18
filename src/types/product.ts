export type ProductSize = {
  size: string;
  available: boolean;
};

export type Product = {
  id: string;
  title: string;
  price: number;
  images: string[]; // URLs (https)
  description: string;
  sizes: ProductSize[];
};
