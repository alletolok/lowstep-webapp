import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import TopBar from "./components/TopBar/TopBar";
import BottomTabBar from "./components/BottomTabBar/BottomTabBar";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Cart from "./pages/Cart";
import Reviews from "./pages/Reviews";
import Checkout from "./pages/Checkout";

export default function App() {
  return (
    <BrowserRouter>
      <div className="appShell">
        <TopBar />

        <main className="appContent">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </main>

        <BottomTabBar />
      </div>
    </BrowserRouter>
  );
}
