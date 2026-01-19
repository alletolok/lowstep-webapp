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

export default function App() {
  const [user, setUser] = useState<TgUser | null>(null);

  useEffect(() => {
    const tg = getTelegramWebApp();
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
      </div>
    </BrowserRouter>
  );
}
