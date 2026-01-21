import "./Favorites.css";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { products } from "../data/products";
import { useShop } from "../state/shopStore";

function formatPrice(price: number) {
  return price.toLocaleString("ru-RU") + " ₽";
}

export default function Favorites() {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useShop();

  const favProducts = useMemo(() => {
    const set = new Set(favorites);
    return products.filter((p) => set.has(p.id));
  }, [favorites]);

  if (favProducts.length === 0) {
    return (
      <div className="favPage">
        <div className="favEmpty">В избранном пока пусто</div>
      </div>
    );
  }

  return (
    <div className="favPage">
      <div className="favList">
        {favProducts.map((p) => (
          <div key={p.id} className="favRow" onClick={() => navigate(`/product/${p.id}`)} role="button" tabIndex={0}>
            <div className="favImgWrap">
              <img className="favImg" src={p.images?.[0]} alt={p.title} loading="eager" decoding="async" />
            </div>

            <div className="favInfo">
              <div className="favTitle">{p.title}</div>
              <div className="favPrice">{formatPrice(p.price)}</div>
            </div>

            <div className="favActions" onClick={(e) => e.stopPropagation()}>
              <button className="favCartBtn" type="button" onClick={() => navigate(`/product/${p.id}`)}>
                В корзину
              </button>

              <button
                className="favHeartBtn isOn"
                type="button"
                onClick={() => toggleFavorite(p.id)}
                aria-label="Убрать из избранного"
                title="Убрать"
              >
                ♥
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
