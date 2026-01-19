import { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";

import TopBar from "./components/TopBar/TopBar";
import BottomTabBar from "./components/BottomTabBar/BottomTabBar";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
// если страница отзывов есть:
import Reviews from "./pages/Reviews";

import type { TgUser } from "./utils/telegram";
import { getTelegramUser, getTelegramWebApp } from "./utils/telegram";

function AppInner() {
  const navigate = useNavigate();
  const [user, setUser] = useState<TgUser | null>(null);

  useEffect(() => {
    const tg = getTelegramWebApp();

    console.log("TG:", tg);
    console.log("initDataUnsafe.user:", tg?.initDataUnsafe?.user);

  try {
    tg?.ready?.();
    tg?.expand?.();
  } catch {}

  setUser(getTelegramUser());
}, []);

    try {
      tg?.ready?.();
      tg?.expand?.();
    } catch {}

    setUser(getTelegramUser());
  }, []);

  const topbarUser = useMemo(() => user, [user]);

  return (
    <div className="appShell">
      <TopBar
        user={topbarUser}
        onSupportClick={() => navigate("/support")}  // потом добавим страницу/чат
        onReviewsClick={() => navigate("/reviews")}
      />

      <div className="appContent">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/reviews" element={<Reviews />} />
          {/* временно */}
          <Route path="/support" element={<div style={{ padding: 16 }}>Support позже</div>} />
        </Routes>
      </div>

      <BottomTabBar />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}
