import "./BottomTabBar.css";
import { NavLink } from "react-router-dom";

type Item = {
  to: string;
  label: string;
  icon: React.ReactNode;
};

function IconHome() {
  return (
    <svg viewBox="0 0 24 24" className="tabIcon" aria-hidden="true">
      <path
        d="M12 3.2 3 10.2v10.1c0 .9.8 1.7 1.7 1.7h5.1v-7.2h4.4V22h5.1c.9 0 1.7-.8 1.7-1.7V10.2l-9-7Z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconHeart() {
  return (
    <svg viewBox="0 0 24 24" className="tabIcon" aria-hidden="true">
      <path
        d="M12 21s-7.2-4.4-9.6-8.5C.6 9 2.1 5.9 5.4 5.1c1.8-.4 3.7.2 4.8 1.6 1.1-1.4 3-2 4.8-1.6 3.3.8 4.8 3.9 3 7.4C19.2 16.6 12 21 12 21Z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconCart() {
  return (
    <svg viewBox="0 0 24 24" className="tabIcon" aria-hidden="true">
      <path
        d="M7 18.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm10 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM6.2 6.2H21l-1.6 7.2a2 2 0 0 1-2 1.6H8a2 2 0 0 1-2-1.6L4.4 4.5H2.5a.9.9 0 0 1 0-1.8h2.6c.4 0 .8.3.9.7l.2.8Z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconCard() {
  // нормальная “оплата”: карточка, без кривых форм
  return (
    <svg viewBox="0 0 24 24" className="tabIcon" aria-hidden="true">
      <path
        d="M6.5 6.5h11A2.5 2.5 0 0 1 20 9v8a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17V9a2.5 2.5 0 0 1 2.5-2.5Zm-1 4.2h13V9c0-.6-.4-1-1-1h-11c-.6 0-1 .4-1 1v1.7Zm0 1.8V17c0 .6.4 1 1 1h11c.6 0 1-.4 1-1v-4.5h-13Z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconUser() {
  return (
    <svg viewBox="0 0 24 24" className="tabIcon" aria-hidden="true">
      <path
        d="M12 12.2a4.5 4.5 0 1 0-4.5-4.5 4.5 4.5 0 0 0 4.5 4.5Zm0 2.1c-4.2 0-7.6 2.2-7.6 5v.7h15.2v-.7c0-2.8-3.4-5-7.6-5Z"
        fill="currentColor"
      />
    </svg>
  );
}

const items: Item[] = [
  { to: "/", label: "Home", icon: <IconHome /> },
  { to: "/favorites", label: "Favorites", icon: <IconHeart /> },
  { to: "/cart", label: "Cart", icon: <IconCart /> },
  { to: "/checkout", label: "Checkout", icon: <IconCard /> },
  { to: "/profile", label: "Profile", icon: <IconUser /> },
];

export default function BottomTabBar() {
  return (
    <nav className="tabbarWrap" aria-label="Bottom navigation">
      {/* прогрессивный блюр: заканчивается ровно по высоте капсулы */}
      <div className="tabbarFog" aria-hidden="true" />

      <div className="tabbarCapsule" role="tablist" aria-label="Tabs">
        {items.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            end={it.to === "/"}
            className={({ isActive }) => `tabBtn ${isActive ? "isActive" : ""}`}
            aria-label={it.label}
            role="tab"
          >
            {it.icon}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
