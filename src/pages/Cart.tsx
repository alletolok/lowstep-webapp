import "./Cart.css";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { products } from "../data/products";
import { useShop } from "../state/shopStore";

function formatPrice(price: number) {
  return price.toLocaleString("ru-RU") + " ₽";
}

function hapticLight() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tg = (window as any)?.Telegram?.WebApp;
  tg?.HapticFeedback?.impactOccurred?.("light");
}

export default function Cart() {
  const navigate = useNavigate();
  const cart = useShop((s) => s.cart);
  const incQty = useShop((s) => s.incQty);
  const decQty = useShop((s) => s.decQty);

  const items = useMemo(() => {
    return cart
      .map((line) => {
        const p = products.find((x) => x.id === line.productId);
        if (!p) return null;
        return { line, product: p };
      })
      .filter(Boolean) as Array<{ line: (typeof cart)[number]; product: (typeof products)[number] }>;
  }, [cart]);

  const total = useMemo(() => {
    return items.reduce((sum, x) => sum + x.product.price * x.line.qty, 0);
  }, [items]);

  if (items.length === 0) {
    return (
      <div className="cartPage">
        <div className="cartEmpty">Корзина пока пустая</div>
      </div>
    );
  }

  return (
    <div className="cartPage">
      <div className="cartList">
        {items.map(({ line, product }) => {
          const img = product.images?.[0] ?? "/products/AdidasSambaOG.png";

          return (
            <div
              className="cartItem"
              key={`${line.productId}_${line.size}`}
              onClick={() => navigate(`/product/${product.id}`)}
              role="button"
              tabIndex={0}
            >
              <img
                className="cartImg"
                src={img}
                alt={product.title}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/products/AdidasSambaOG.png";
                }}
              />

              <div className="cartMid">
                <div className="cartTitle">{product.title}</div>
                <div className="cartMeta">Размер {line.size}</div>
                <div className="cartPrice">{formatPrice(product.price)}</div>
              </div>

              {/* ВАЖНО: +/- не открывают карточку */}
              <div className="cartQty" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  className="qtyBtn"
                  onClick={() => {
                    hapticLight();
                    decQty(line.productId, line.size);
                  }}
                  aria-label="Минус"
                >
                  −
                </button>

                <div className="qtyVal">{line.qty}</div>

                <button
                  type="button"
                  className="qtyBtn"
                  onClick={() => {
                    hapticLight();
                    incQty(line.productId, line.size);
                  }}
                  aria-label="Плюс"
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="cartBottom">
        <div className="cartTotalRow">
          <div className="cartTotalLabel">Итого</div>
          <div className="cartTotalValue">{formatPrice(total)}</div>
        </div>

        <button
          type="button"
          className="cartCheckoutBtn"
          onClick={() => {
            hapticLight();
            alert("Оформление — следующий шаг 🙂");
          }}
        >
          Оформить
        </button>
      </div>
    </div>
  );
}
