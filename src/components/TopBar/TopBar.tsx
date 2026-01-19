// src/components/TopBar/TopBar.tsx

import "./TopBar.css";
import type { TgUser } from "../../utils/telegram";
import { getUserAvatarUrl, getUserDisplayName } from "../../utils/telegram";

type Props = {
  user: TgUser | null;
};

function IconSupport() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2a7 7 0 0 0-7 7v5a3 3 0 0 0 3 3h1v-2H8a1 1 0 0 1-1-1V9a5 5 0 0 1 10 0v5a1 1 0 0 1-1 1h-1v2h1a3 3 0 0 0 3-3V9a7 7 0 0 0-7-7Zm-4 18a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2H8v2Z"
      />
    </svg>
  );
}

function IconReviews() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 17.3l-5.5 3 1-6.2-4.5-4.4 6.2-.9L12 3l2.8 5.8 6.2.9-4.5 4.4 1 6.2-5.5-3Z"
      />
    </svg>
  );
}

export default function TopBar({ user }: Props) {
  const name = getUserDisplayName(user);
  const avatarUrl = getUserAvatarUrl(user);
  const letter = (name.replace("@", "").trim()[0] || "U").toUpperCase();

  return (
    <div className="topbar">
      <button className="topbar__iconBtn" type="button" aria-label="Поддержка">
        <IconSupport />
      </button>

      <div className="topbar__profilePill" role="button" aria-label="Профиль">
        <div className="topbar__avatar">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt=""
              loading="eager"
              decoding="async"
              onError={(e) => {
                // если userpic не нашёлся — убираем img и покажем букву
                const img = e.currentTarget;
                img.style.display = "none";
              }}
            />
          ) : null}
          <span className="topbar__avatarLetter">{letter}</span>
        </div>

        <div className="topbar__name" title={name}>
          {name}
        </div>
      </div>

      <button className="topbar__iconBtn" type="button" aria-label="Отзывы">
        <IconReviews />
      </button>
    </div>
  );
}

      </button>
    </header>
  );
}
