import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import TopBar from "./components/TopBar/TopBar";
import BottomTabBar from "./components/BottomTabBar/BottomTabBar";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import Reviews from "./pages/Reviews";

import { getTelegramWebApp } from "./utils/telegram";

export default function App() {
  useEffect(() => {
    const tg = getTelegramWebApp();
    try {
      tg?.ready?.();
      tg?.expand?.();
    } catch {}
  }, []);

  return (
    <BrowserRouter>
      <div className="appShell">
        <TopBar />

        <div className="appContent">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/reviews" element={<Reviews />} />
          </Routes>
        </div>

        <BottomTabBar />
      </div>
    </BrowserRouter>
  );
}
