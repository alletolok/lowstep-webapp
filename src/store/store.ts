// src/store/store.ts
import { useEffect, useState } from "react";

export type CartItem = {
  productId: number;
  size: number;
  qty: number;
};

type StoreState = {
  favorites: number[]; // productId[]
  cart: CartItem[];
};

const LS_KEY = "lowstep_store_v1";

function readStore(): StoreState {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return { favorites: [], cart: [] };
    const parsed = JSON.parse(raw) as StoreState;
    return {
      favorites: Array.isArray(parsed.favorites) ? parsed.favorites : [],
      cart: Array.isArray(parsed.cart) ? parsed.cart : [],
    };
  } catch {
    return { favorites: [], cart: [] };
  }
}

function writeStore(next: StoreState) {
  localStorage.setItem(LS_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("lowstep_store_changed"));
}

export function useLowstepStore() {
  const [state, setState] = useState<StoreState>(() => readStore());

  useEffect(() => {
    const onChange = () => setState(readStore());
    window.addEventListener("lowstep_store_changed", onChange);
    return () => window.removeEventListener("lowstep_store_changed", onChange);
  }, []);

  const toggleFavorite = (productId: number) => {
    const cur = readStore();
    const isFav = cur.favorites.includes(productId);
    const favorites = isFav
      ? cur.favorites.filter((id) => id !== productId)
      : [...cur.favorites, productId];
    writeStore({ ...cur, favorites });
  };

  const addToCart = (productId: number, size: number) => {
    const cur = readStore();
    const idx = cur.cart.findIndex((x) => x.productId === productId && x.size === size);

    const cart =
      idx === -1
        ? [...cur.cart, { productId, size, qty: 1 }]
        : cur.cart.map((it, i) => (i === idx ? { ...it, qty: it.qty + 1 } : it));

    writeStore({ ...cur, cart });
  };

  return { state, toggleFavorite, addToCart };
}
