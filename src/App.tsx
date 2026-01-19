import { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import TopBar from "./components/TopBar/TopBar";
import BottomTabBar from "./components/BottomTabBar/BottomTabBar";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";

import type { TgUser } from "./utils/telegram";
import { getTelegramUser, getTelegramWebApp } from "./utils/telegram";

// ⚠️ МЕНЯЙ ЭТО ЧИСЛО КАЖДЫЙ РАЗ, КОГДА ХОЧЕШЬ ПРОВЕРИТЬ ЧТО ОБНОВИЛОСЬ
const BUILD = "2026-01-19_10"; 

export default function App() {
  const [user, setUser] = useState<TgUser | null>(null);

  useEffect(() => {
    const tg = getTelegramWebApp();

    console.log("BUILD:", BUILD);
    console.log("TG:", tg);
    console.log("initDataUnsafe.user:", tg?.initDataUnsafe?.user);

    try {
      tg?.ready?.();
      tg?.expand?.();
    } catch {}

    setUser(getTelegramUser());
  }, []);

  const topbarUser = useMemo(() => user, [user]);

  return (
    <BrowserRouter>
      <div className="appShell">
        <TopBar user={topbarUser} />

        <div className="appContent">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>

        <BottomTabBar />

        {/* Невидимый маркер версии, чтобы 100% видеть обновление */}
        <div
          style={{
            position: "fixed",
            left: 8,
            bottom: 8,
            fontSize: 11,
            opacity: 0.35,
            zIndex: 9999,
            pointerEvents: "none",
          }}
        >
          {BUILD}
        </div>
      </div>
    </BrowserRouter>
  );
}
