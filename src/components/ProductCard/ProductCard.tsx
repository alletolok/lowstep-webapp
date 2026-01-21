import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
import type { Product } from "../../types/product";

function formatPrice(price: number) {
  return price.toLocaleString("ru-RU") + " ₽";
}

export default function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();

  const img = product.images?.[0] || "/products/AdidasSambaOG.png";

  return (
    <button
      type="button"
      className="productCard"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="productCard__imgWrap">
        <img
          className="productCard__img"
          src={img}
          alt={product.title}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "/products/AdidasSambaOG.png";
          }}
        />
      </div>

      <div className="productCard__title">{product.title}</div>
      <div className="productCard__price">{formatPrice(product.price)}</div>
    </button>
  );
}
