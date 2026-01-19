// src/utils/telegram.ts

export type TgUser = {
  id: number;
  is_bot?: boolean;
  first_name?: string;
  last_name?: string;
  username?: string;
  language_code?: string;
};

export function getTelegramWebApp() {
  return (window as any)?.Telegram?.WebApp ?? null;
}

export function getTelegramUser(): TgUser | null {
  const tg = getTelegramWebApp();
  return tg?.initDataUnsafe?.user ?? null;
}

export function getUserDisplayName(user: TgUser | null): string {
  if (!user) return "Пользователь";
  if (user.username) return `@${user.username}`;
  const full = [user.first_name, user.last_name].filter(Boolean).join(" ").trim();
  return full || "Пользователь";
}

// Telegram WebApp напрямую аву пользователя не даёт.
// Самый “без сервера” вариант — userpic по username.
// Если username нет — вернём null (будет буква-плейсхолдер).
export function getUserAvatarUrl(user: TgUser | null): string | null {
  if (!user?.username) return null;
  return `https://t.me/i/userpic/320/${user.username}.jpg`;
}
