import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TopBar.css";

type TgUser = {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
};

function IconSupport() {
  return (
    <svg viewBox="0 0 24 24" className="topbar__icon" aria-hidden="true">
      <path
        d="M12 2a8 8 0 0 0-8 8v3a3 3 0 0 0 3 3h1v-6H7a1 1 0 0 0-1 1v2a6 6 0 1 1 12 0v2a1 1 0 0 1-1 1h-1v2h1a3 3 0 0 0 3-3v-3a8 8 0 0 0-8-8z"
        fill="currentColor"
      />
      <path
        d="M9 18h6a3 3 0 0 1-3 3h-0a3 3 0 0 1-3-3z"
        fill="currentColor"
        opacity="0.7"
      />
    </svg>
  );
}

function IconReviews() {
  return (
    <svg viewBox="0 0 24 24" className="topbar__icon" aria-hidden="true">
      <path
        d="M12 17.3l-5.47 3.2 1.48-6.23L3 9.76l6.4-.55L12 3.3l2.6 5.9 6.4.55-5.01 4.51 1.48 6.23L12 17.3z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function TopBar() {
  const navigate = useNavigate();
  const [user, setUser] = useState<TgUser | null>(null);

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (!tg) return;

    try {
      tg.ready?.();
      tg.expand?.();
      const u = tg.initDataUnsafe?.user as TgUser | undefined;
      if (u) setUser(u);
    } catch {
      // no-op
    }
  }, []);

  const displayName = useMemo(() => {
    if (!user) return "Профиль";
    if (user.username) return `@${user.username}`;
    const full = [user.first_name, user.last_name].filter(Boolean).join(" ").trim();
    return full || "Профиль";
  }, [user]);

  const avatarUrl = user?.photo_url || "";

  const openSupport = () => {
    // ВПИШЕШЬ СВОЙ @support (без @)
    const supportUsername = "your_support_username";
    const tg = (window as any).Telegram?.WebApp;

    const url = `https://t.me/${supportUsername}`;
    if (tg?.openTelegramLink) tg.openTelegramLink(url);
    else window.open(url, "_blank");
  };

  return (
    <header className="topbar">
      <button
        className="topbar__iconBtn topbar__left"
        type="button"
        aria-label="Поддержка"
        onClick={openSupport}
      >
        <IconSupport />
      </button>

      <div className="topbar__center" title={displayName}>
        {avatarUrl ? (
          <img className="topbar__avatarImg" src={avatarUrl} alt="avatar" />
        ) : (
          <div className="topbar__avatar" />
        )}
        <div className="topbar__pillText">{displayName}</div>
      </div>

      <button
        className="topbar__iconBtn topbar__right"
        type="button"
        aria-label="Отзывы"
        onClick={() => navigate("/reviews")}
      >
        <IconReviews />
      </button>
    </header>
  );
}
