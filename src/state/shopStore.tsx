import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartLine = {
  productId: number;
  size: number;
  qty: number;
};

type ShopState = {
  favorites: number[];
  cart: CartLine[];

  isFav: (productId: number) => boolean;
  toggleFavorite: (productId: number) => void;

  isInCart: (productId: number, size: number | null) => boolean;
  addToCart: (productId: number, size: number) => void;
  removeFromCart: (productId: number, size: number) => void;

  incQty: (productId: number, size: number) => void;
  decQty: (productId: number, size: number) => void;
};

export const useShop = create<ShopState>()(
  persist(
    (set, get) => ({
      favorites: [],
      cart: [],

      isFav: (productId) => get().favorites.includes(productId),

      toggleFavorite: (productId) => {
        const fav = get().favorites;
        const has = fav.includes(productId);
        set({
          favorites: has ? fav.filter((id) => id !== productId) : [...fav, productId],
        });
      },

      isInCart: (productId, size) => {
        if (size == null) return false;
        return get().cart.some((l) => l.productId === productId && l.size === size);
      },

      addToCart: (productId, size) => {
        const cart = get().cart;
        const idx = cart.findIndex((l) => l.productId === productId && l.size === size);

        if (idx >= 0) {
          const next = cart.slice();
          next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
          set({ cart: next });
          return;
        }

        set({ cart: [...cart, { productId, size, qty: 1 }] });
      },

      removeFromCart: (productId, size) => {
        set({
          cart: get().cart.filter((l) => !(l.productId === productId && l.size === size)),
        });
      },

      incQty: (productId, size) => {
        const cart = get().cart;
        const idx = cart.findIndex((l) => l.productId === productId && l.size === size);
        if (idx < 0) return;

        const next = cart.slice();
        next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
        set({ cart: next });
      },

      decQty: (productId, size) => {
        const cart = get().cart;
        const idx = cart.findIndex((l) => l.productId === productId && l.size === size);
        if (idx < 0) return;

        const line = cart[idx];
        if (line.qty <= 1) {
          set({
            cart: cart.filter((l) => !(l.productId === productId && l.size === size)),
          });
          return;
        }

        const next = cart.slice();
        next[idx] = { ...next[idx], qty: next[idx].qty - 1 };
        set({ cart: next });
      },
    }),
    { name: "lowstep_shop_v1" }
  )
);
