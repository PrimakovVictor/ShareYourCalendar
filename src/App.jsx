import React, { useEffect, useState } from "react";

const App = () => {
  const [env, setEnv] = useState({
    hasWindowTelegram: false,
    hasWebApp: false,
    initDataUnsafe: null,
    userAgent: "",
    href: "",
  });

  const [user, setUser] = useState(null);

  useEffect(() => {
    const hasWindowTelegram = typeof window !== "undefined" && !!window.Telegram;
    const hasWebApp = !!window.Telegram?.WebApp;
    const initDataUnsafe = window.Telegram?.WebApp?.initDataUnsafe ?? null;

    setEnv({
      hasWindowTelegram,
      hasWebApp,
      initDataUnsafe,
      userAgent: navigator.userAgent,
      href: window.location.href,
    });

    if (hasWebApp) {
      window.Telegram.WebApp.ready();

      if (initDataUnsafe?.user) {
        setUser(initDataUnsafe.user);
        window.Telegram.WebApp.MainButton.setText("Готово ✅");
        window.Telegram.WebApp.MainButton.show();
      }
    }
  }, []);

  return (
    <div className="min-h-screen p-6 bg-white text-black">
      <h1 className="text-2xl font-bold mb-4">📱 Telegram Mini App</h1>

      {user ? (
        <div className="mb-6 space-y-1">
          <h2 className="text-lg font-semibold">👤 Пользователь:</h2>
          <p>Имя: {user.first_name} {user.last_name}</p>
          <p>Юзернейм: @{user.username}</p>
          <p>ID: {user.id}</p>
          <p>Язык: {user.language_code}</p>
        </div>
      ) : (
        <div className="mb-6 text-red-600">
          <p>⚠️ Пользователь не найден.</p>
          <p>Проверь, что Mini App запущен через Telegram.</p>
        </div>
      )}

      <div>
        <h2 className="text-lg font-semibold mb-1">🔍 Диагностика окружения:</h2>
        <pre className="bg-gray-100 text-sm p-3 rounded overflow-auto">
          {JSON.stringify(env, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default App;
