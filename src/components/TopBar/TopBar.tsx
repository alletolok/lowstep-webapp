import "./TopBar.css";
import type { TgUser } from "../../utils/telegram";

type Props = {
  user: TgUser | null;
};

function getTitle(user: TgUser | null) {
  const first = user?.first_name?.trim();
  const uname = user?.username?.trim();

  if (first) return first;
  if (uname) return `@${uname}`;
  return "Alexander";
}

function getInitial(user: TgUser | null) {
  const base =
    (user?.first_name?.trim() ||
      user?.username?.trim() ||
      "A").trim();
  return base.charAt(0).toUpperCase();
}

export default function TopBar({ user }: Props) {
  const title = getTitle(user);
  const avatarUrl = user?.photo_url?.trim() || "";

  return (
    <header className="topbar">
      <button className="topbarIconBtn" type="button" aria-label="Support">
        <svg viewBox="0 0 24 24" className="topbarIcon">
          <path
            d="M12 3a8 8 0 0 0-8 8v5a3 3 0 0 0 3 3h1v-7H5v-1a7 7 0 1 1 14 0v1h-3v7h1a3 3 0 0 0 3-3v-5a8 8 0 0 0-8-8Z"
            fill="currentColor"
          />
        </svg>
      </button>

      <div className="topbarCenter">
        <div className="topbarUserPill">
          <div className="topbarAvatar">
            {avatarUrl ? (
              <img src={avatarUrl} alt="avatar" />
            ) : (
              <span>{getInitial(user)}</span>
            )}
          </div>

          <span className="topbarTitle">{title}</span>
        </div>
      </div>

      <button className="topbarIconBtn" type="button" aria-label="Reviews">
        <svg viewBox="0 0 24 24" className="topbarIcon">
          <path
            d="M12 17.3 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21 12 17.3Z"
            fill="currentColor"
          />
        </svg>
      </button>
    </header>
  );
}

