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

function parseUserFromInitData(initData?: string): TgUser | null {
  if (!initData) return null;

  try {
    const params = new URLSearchParams(initData);
    const userRaw = params.get("user");
    if (!userRaw) return null;

    // URLSearchParams обычно уже декодит, но на всякий:
    const json = userRaw.startsWith("%7B") ? decodeURIComponent(userRaw) : userRaw;

    const parsed = JSON.parse(json);
    if (!parsed || typeof parsed !== "object") return null;

    return parsed as TgUser;
  } catch {
    return null;
  }
}

export function getTelegramUser(): TgUser | null {
  const tg = getTelegramWebApp();

  // 1) Нормальный путь: Telegram сам распарсил
  const unsafeUser = tg?.initDataUnsafe?.user ?? null;
  if (unsafeUser) return unsafeUser as TgUser;

  // 2) Резервный путь: парсим сами из initData (строка)
  const initData = tg?.initData ?? "";
  const parsedUser = parseUserFromInitData(initData);
  if (parsedUser) return parsedUser;

  return null;
}

export function isTelegram(): boolean {
  return !!getTelegramWebApp();
}
