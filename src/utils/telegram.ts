export type TgUser = {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
};

export function getTelegramWebApp(): any {
  return (window as any)?.Telegram?.WebApp;
}

export function initTelegram() {
  const wa = getTelegramWebApp();
  if (!wa) return;

  try {
    wa.ready?.();
    wa.expand?.();
  } catch {
    // ничего страшного
  }
}

export function getTelegramUser(): TgUser | null {
  const wa = getTelegramWebApp();
  const user = wa?.initDataUnsafe?.user;
  return user ?? null;
}
