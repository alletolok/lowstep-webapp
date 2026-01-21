import { useMemo, useState } from "react";
import "./Home.css";

import ProductCard from "../components/ProductCard/ProductCard";
import { products } from "../data/products";

export default function Home() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => p.title.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="home">
      {/* Sticky search */}
      <div className="home__searchBar">
        <div className="home__searchInner">
          <span className="home__searchIcon">⌕</span>
          <input
            className="home__searchInput"
            placeholder="Поиск кроссовок, брендов"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Grid */}
      <div className="home__grid">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
