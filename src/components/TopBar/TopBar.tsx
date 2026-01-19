import "./TopBar.css";
import { useEffect, useMemo, useState } from "react";
import { getTelegramUser, initTelegram, type TgUser } from "../../utils/telegram";
import { useLocation, useNavigate } from "react-router-dom";

export default function TopBar() {
  const nav = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState<TgUser | null>(null);

  useEffect(() => {
    initTelegram();
    setUser(getTelegramUser());
  }, []);

  const display = useMemo(() => {
    const first = user?.first_name?.trim() ?? "";
    const last = user?.last_name?.trim() ?? "";
    const fullName = `${first} ${last}`.trim();

    const title = fullName || (user?.username ? user.username : "Пользователь");
    const subtitle = user?.username ? `@${user.username}` : "";

    const initials = (
      (first?.[0] ?? "") +
      (last?.[0] ?? first?.[1] ?? "")
    ).toUpperCase();

    return {
      title,
      subtitle,
      photoUrl: user?.photo_url ?? "",
      initials: initials || "U",
    };
  }, [user]);

  // если захочешь скрывать таббар на карточке товара — это отдельная логика
  const isOnReviews = location.pathname === "/reviews";

  return (
    <header className="topbar">
      <button
        className="tbIconBtn"
        type="button"
        onClick={() => nav("/profile")}
        aria-label="Поддержка"
      >
        {/* headset icon */}
        <svg width="20" height="20" viewBox="0 0 24 24" className="tbIcon">
          <path
            d="M4 12a8 8 0 0 1 16 0v6a2 2 0 0 1-2 2h-2v-6h4v-2a6 6 0 1 0-12 0v2h4v6H6a2 2 0 0 1-2-2v-6z"
            fill="currentColor"
          />
        </svg>
      </button>

      <div className="tbUserPill" aria-label="Пользователь">
        <div className="tbAvatarWrap">
          {display.photoUrl ? (
            <img className="tbAvatarImg" src={display.photoUrl} alt="avatar" />
          ) : (
            <div className="tbAvatarFallback">{display.initials}</div>
          )}
        </div>

        <div className="tbUserText">
          <div className="tbUserTitle">{display.title}</div>
          {display.subtitle ? <div className="tbUserSub">{display.subtitle}</div> : null}
        </div>
      </div>

      <button
        className={`tbIconBtn ${isOnReviews ? "isActive" : ""}`}
        type="button"
        onClick={() => nav("/reviews")}
        aria-label="Отзывы"
      >
        {/* star icon */}
        <svg width="20" height="20" viewBox="0 0 24 24" className="tbIcon">
          <path
            d="M12 17.3 6.8 20l1-5.8L3.6 9.9l5.9-.9L12 3.7l2.5 5.3 5.9.9-4.2 4.3 1 5.8z"
            fill="currentColor"
          />
        </svg>
      </button>
    </header>
  );
}
