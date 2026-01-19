import "./TopBar.css";
import { useLocation, useNavigate } from "react-router-dom";
import { getTelegramWebApp } from "../../utils/telegram";

function getPageTitle(pathname: string) {
  if (pathname === "/") return "Каталог";
  if (pathname.startsWith("/favorites")) return "Избранное";
  if (pathname.startsWith("/cart")) return "Корзина";
  if (pathname.startsWith("/checkout")) return "Оплата";
  if (pathname.startsWith("/profile")) return "Профиль";
  if (pathname.startsWith("/reviews")) return "Отзывы";
  return "Каталог";
}

function IconSupport() {
  return (
    <svg viewBox="0 0 24 24" className="topbarIcon" aria-hidden="true">
      <path
        d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v7A2.5 2.5 0 0 1 17.5 15H9l-4.5 4v-4H6.5A2.5 2.5 0 0 1 4 12.5v-7Z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconReviews() {
  return (
    <svg viewBox="0 0 24 24" className="topbarIcon" aria-hidden="true">
      <path
        d="M12 17.3 6.6 20.6l1.5-6.2-4.9-4.2 6.4-.5L12 3.9l2.5 5.8 6.4.5-4.9 4.2 1.5 6.2L12 17.3Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function TopBar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const title = getPageTitle(pathname);

  const tg = getTelegramWebApp();

  const openSupport = () => {
    const url = "https://t.me/pavzn";
    try {
      // в WebApp лучше так
      tg?.openTelegramLink?.(url);
      // fallback (браузер/локалка)
      if (!tg?.openTelegramLink) window.open(url, "_blank", "noopener,noreferrer");
    } catch {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const openReviews = () => {
    navigate("/reviews");
  };

  return (
    <header className="topbar">
      <button
        className="topbarIconBtn"
        type="button"
        aria-label="Техподдержка"
        onClick={openSupport}
      >
        <IconSupport />
      </button>

      <div className="topbarCenter">
        {/* капсулу НЕ меняем — только текст внутри */}
        <div className="topbarUserPill" aria-label="Текущая страница">
          <span className="topbarTitle">{title}</span>
        </div>
      </div>

      <button
        className="topbarIconBtn"
        type="button"
        aria-label="Отзывы"
        onClick={openReviews}
      >
        <IconReviews />
      </button>
    </header>
  );
}
