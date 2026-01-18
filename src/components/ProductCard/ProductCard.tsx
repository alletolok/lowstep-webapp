import "./ProductCard.css";
import type { Product } from "../../types/product";

function formatPriceRub(price: number) {
  return new Intl.NumberFormat("ru-RU").format(price);
}

export default function ProductCard({ product }: { product: Product }) {
  const src = product.images?.[0] ?? "";

  return (
    <div className="productCard" role="button" tabIndex={0}>
      <div className="productCard__imageWrap">
        {/* картинка в зону фото на 100% */}
        <img className="productCard__image" src={src} alt={product.title} />
      </div>

      {/* центрируем название+цену */}
      <div className="productCard__meta">
        <div className="productCard__title">{product.title}</div>
        <div className="productCard__price">{formatPriceRub(product.price)} ₽</div>
      </div>
    </div>
  );
}
