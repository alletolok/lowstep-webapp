import "./Product.css";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { products } from "../data/products";
import type { Product } from "../types/product";
import { useShop } from "../state/shopStore";

function formatPrice(price: number) {
  return price.toLocaleString("ru-RU") + " ₽";
}

function hapticLight() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tg = (window as any)?.Telegram?.WebApp;
  tg?.HapticFeedback?.impactOccurred?.("light");
}

export default function ProductPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const product: Product | undefined = useMemo(() => {
    const pid = Number(id);
    if (!Number.isFinite(pid)) return undefined;
    return products.find((p) => p.id === pid);
  }, [id]);

  const [activeImg, setActiveImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);

  const isFav = useShop((s) => (product ? s.isFav(product.id) : false));
  const isInCart = useShop((s) => (product ? s.isInCart(product.id, selectedSize) : false));
  const addToCart = useShop((s) => s.addToCart);
  const toggleFavorite = useShop((s) => s.toggleFavorite);

  if (!product) {
    return (
      <div className="productPage">
        <button className="backTri" onClick={() => navigate(-1)} aria-label="Назад" />
        <div className="productNotFound">Товар не найден</div>
      </div>
    );
  }

  const images = product.images?.length ? product.images : ["/products/AdidasSambaOG.png"];
  const sizes = product.sizes?.length ? product.sizes : [40, 41, 42, 43, 44];
  const imgSrc = images[Math.min(activeImg, images.length - 1)];

  const canAdd = selectedSize != null;

  const onAdd = () => {
    if (!canAdd) {
      alert("Выберите размер");
      return;
    }
    hapticLight();

    if (isInCart) {
      navigate("/cart");
      return;
    }

    addToCart(product.id, selectedSize!);
  };

  const onFav = () => {
    hapticLight();
    toggleFavorite(product.id);
  };

  return (
    <div className="productPage">
      {/* стрелка: фикс, без фона, отдельно от поддержки */}
      <button className="backTri" onClick={() => navigate(-1)} aria-label="Назад" />

      <div className="productWrap">
        <div className="productImgFrame">
          <img
            className="productImg"
            src={imgSrc}
            alt={product.title}
            loading="eager"
            decoding="async"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "/products/AdidasSambaOG.png";
            }}
          />
        </div>

        {/* сегменты фото */}
        {images.length > 1 && (
          <div className="photoSegments" aria-label="Фото товара">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`seg ${idx === activeImg ? "isActive" : ""}`}
                onClick={() => setActiveImg(idx)}
                aria-label={`Фото ${idx + 1}`}
              />
            ))}
          </div>
        )}

        <div className="productInfo">
          <div className="productTitleBig">{product.title}</div>
          <div className="productPriceBig">{formatPrice(product.price)}</div>

          <div className="productDesc">
            {product.description ??
              "Описание добавим позже. Сейчас это мок, но страница уже живая 😄"}
          </div>

          <div className="sizesBlock">
            <div className="sizesTitle">Размер</div>
            <div className="sizesRow">
              {sizes.map((s) => {
                const active = selectedSize === s;
                return (
                  <button
                    key={s}
                    type="button"
                    className={`sizeBtn ${active ? "isActive" : ""}`}
                    onClick={() => setSelectedSize(s)}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* кнопки закреплены снизу, БЕЗ прозрачности */}
      <div className="productActions">
        <button
          type="button"
          className={`addToCartBtn ${!canAdd ? "isDisabled" : ""} ${isInCart ? "isInCart" : ""}`}
          onClick={onAdd}
        >
          {isInCart ? "В корзине" : "В корзину"}
        </button>

        <button
          type="button"
          className={`favBtn ${isFav ? "isActive" : ""}`}
          onClick={onFav}
          aria-label="В избранное"
          title="В избранное"
        >
          ♥
        </button>
      </div>
    </div>
  );
}
