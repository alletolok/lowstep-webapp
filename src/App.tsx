import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Favorites from "./pages/Favorites/Favorites";
import Payment from "./pages/Payment/Payment";
import Profile from "./pages/Profile/Profile";
import Product from "./pages/Product/Product";

import BottomNav from "./components/BottomNav/BottomNav";
import TopBar from "./components/TopBar/TopBar";

import "./App.css";

export default function App() {
  return (
    <Router>
      <TopBar />

      <main className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </main>

      <BottomNav />
    </Router>
  );
}
