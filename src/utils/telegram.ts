export type TgUser = {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  photo_url?: string;
};

export function getTelegramWebApp(): any | null {
  // @ts-ignore
  return typeof window !== "undefined" ? window.Telegram?.WebApp ?? null : null;
}

export function getTelegramUser(): TgUser | null {
  const tg = getTelegramWebApp();
  const user = tg?.initDataUnsafe?.user ?? null;
  return user;
}

export function isTelegram(): boolean {
  return !!getTelegramWebApp();
}
