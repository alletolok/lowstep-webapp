import { NavLink } from "react-router-dom";
import "./BottomTabBar.css";

export default function BottomTabBar() {
  return (
    <nav className="tabbar">
      <NavLink
        to="/"
        end
        className={({ isActive }) => "tab" + (isActive ? " active" : "")}
      >
        <span className="label">Главная</span>
      </NavLink>

      <NavLink
        to="/favorites"
        className={({ isActive }) => "tab" + (isActive ? " active" : "")}
      >
        <span className="label">Избранное</span>
      </NavLink>

      <NavLink
        to="/cart"
        className={({ isActive }) => "tab" + (isActive ? " active" : "")}
      >
        <span className="label">Корзина</span>
      </NavLink>

      {/* 🔥 НОВАЯ КНОПКА — ОПЛАТА */}
      <NavLink
        to="/checkout"
        className={({ isActive }) => "tab" + (isActive ? " active" : "")}
      >
        <span className="label">Оплата</span>
      </NavLink>

      {/* 🔥 НОВАЯ КНОПКА — ПРОФИЛЬ */}
      <NavLink
        to="/profile"
        className={({ isActive }) => "tab" + (isActive ? " active" : "")}
      >
        <span className="label">Профиль</span>
      </NavLink>
    </nav>
  );
}
