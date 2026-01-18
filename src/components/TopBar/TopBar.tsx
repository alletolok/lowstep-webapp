import "./TopBar.css";

export default function TopBar() {
  // пока мок: позже подключим Telegram.WebApp и подставим имя/юзернейм
  const name = "qwqw";
  const username = "@username";

  return (
    <header className="topbar">
      <button className="topbar__btn topbar__left" type="button">
        Поддержка
      </button>

      <div className="topbar__center">
        <div className="topbar__avatar" />
        <div className="topbar__user">
          <div className="topbar__name">{name}</div>
          <div className="topbar__username">{username}</div>
        </div>
      </div>

      <button className="topbar__btn topbar__right" type="button">
        Отзывы
      </button>
    </header>
  );
}
