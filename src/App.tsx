import { useEffect, useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
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

export default function App() {
  const [user, setUser] = useState<TgUser | null>(null);

  useEffect(() => {
    const tg = getTelegramWebApp();

    try {
      tg?.ready?.();
      tg?.expand?.();
    } catch {}

    // 1) первичная попытка
    setUser(getTelegramUser());

    // 2) на всякий: iOS/Telegram иногда “догружает” user чуть позже
    const t = setTimeout(() => setUser(getTelegramUser()), 250);
    return () => clearTimeout(t);
  }, []);

  return (
    <HashRouter>
      <div className="appShell">
        <TopBar user={user} />

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
      </div>
    </HashRouter>
  );
}
