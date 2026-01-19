import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Favorites.css";

// Подстрой под твой проект:
// если у тебя тип Product лежит в другом месте — поменяй import.
import type { Product } from "../types/product";
import { products as allProducts } from "../data/products";

const LS_KEY = "lowstep_favorites";

function readIds(): string[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map(String);
  } catch {
    return [];
  }
}

function writeIds(ids: string[]) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(ids));
  } catch {}
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" className="favTrashIcon" aria-hidden="true">
      <path
        fill="currentColor"
        d="M9 3h6l1 2h4a1 1 0 1 1 0 2h-1l-1.1 14.1A2 2 0 0 1 15.9 23H8.1a2 2 0 0 1-1.99-1.9L5 7H4a1 1 0 1 1 0-2h4l1-2Zm-2 4 1 13.1c.02.5.44.9.95.9h7.9c.51 0 .93-.4.95-.9L19 7H7Zm3.5 2a1 1 0 0 1 1 1v8a1 1 0 1 1-2 0v-8a1 1 0 0 1 1-1Zm5 0a1 1 0 0 1 1 1v8a1 1 0 1 1-2 0v-8a1 1 0 0 1 1-1Z"
      />
    </svg>
  );
}

export default function Favorites() {
  const navigate = useNavigate();

  const [ids, setIds] = useState<string[]>(() => readIds());
  const [removingId, setRemovingId] = useState<string | null>(null);

  // если где-то в приложении избранное меняется — можно слушать storage
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === LS_KEY) setIds(readIds());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const favorites: Product[] = useMemo(() => {
    const map = new Map<string, Product>();
    for (const p of allProducts as unknown as Product[]) {
      // поддержим и number id и string id
      map.set(String((p as any).id), p);
    }
    // сохраняем порядок как в LS
    return ids.map((id) => map.get(String(id))).filter(Boolean) as Product[];
  }, [ids]);

  const isEmpty = favorites.length === 0;

  function remove(id: string) {
    // мягкое удаление
    setRemovingId(id);
    window.setTimeout(() => {
      const next = ids.filter((x) => String(x) !== String(id));
      setIds(next);
      writeIds(next);
      setRemovingId(null);
    }, 180);
  }

  return (
    <div className="favPage">
      {isEmpty ? (
        <div className="favEmpty">
          <div className="favEmptyText">В избранном пока нет товаров</div>
        </div>
      ) : (
        <div className="favList">
          {favorites.map((p) => {
            const id = String((p as any).id);
            const img =
              (p as any).images?.[0] ||
              (p as any).image ||
              "/products/placeholder.png";

            const price =
              typeof (p as any).price === "number"
                ? (p as any).price.toLocaleString("ru-RU")
                : String((p as any).price ?? "");

            const isRemoving = removingId === id;

            return (
              <div
                key={id}
                className={`favRow ${isRemoving ? "isRemoving" : ""}`}
              >
                <button
                  className="favRowMain"
                  onClick={() => {
                    // Если у тебя есть страница товара — раскомментируй:
                    // navigate(`/product/${id}`);
                    // Пока просто оставим “клик по карточке” без навигации:
                  }}
                  type="button"
                >
                  <div className="favImgWrap">
                    <img
                      src={img}
                      alt={(p as any).title ?? "Товар"}
                      className="favImg"
                      loading="eager"
                      decoding="async"
                    />
                  </div>

                  <div className="favInfo">
                    <div className="favTitle">{(p as any).title}</div>
                    <div className="favPrice">{price} ₽</div>
                  </div>
                </button>

                <button
                  className="favRemoveBtn"
                  type="button"
                  aria-label="Удалить из избранного"
                  onClick={() => remove(id)}
                >
                  <TrashIcon />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
