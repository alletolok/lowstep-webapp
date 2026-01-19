import { useEffect, useState } from 'react';
import TopBar from './components/TopBar/TopBar';

type TgUser = {
  id?: number;
  first_name?: string;
  username?: string;
  photo_url?: string;
};

function App() {
  const [user, setUser] = useState<TgUser | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const tg = (window as any)?.Telegram?.WebApp;
    if (!tg) return;

    const tgUser = tg.initDataUnsafe?.user;

    if (tgUser) {
      setUser({
        id: tgUser.id,
        first_name: tgUser.first_name,
        username: tgUser.username,
        photo_url: tgUser.photo_url,
      });
    }
  }, []);

  return (
    <>
      <TopBar user={user} />
      {/* остальной UI */}
    </>
  );
}

export default App;
