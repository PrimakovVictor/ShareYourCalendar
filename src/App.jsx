import React, { useEffect, useState } from "react";
import MainView from "./MainView";

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
    const hasWindowTelegram = !!window.Telegram;
    const hasWebApp = !!window.Telegram?.WebApp;
    const initDataUnsafe = window.Telegram?.WebApp?.initDataUnsafe ?? null;

    setEnv({
      hasWindowTelegram,
      hasWebApp,
      initDataUnsafe,
      userAgent: navigator.userAgent,
      href: window.location.href,
    });

    if (hasWebApp && initDataUnsafe?.user) {
      setUser(initDataUnsafe.user);
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.MainButton.setText("Готово ✅");
      window.Telegram.WebApp.MainButton.show();
    }
  }, []);

  return (
    <div className="min-h-screen p-6 bg-white text-black space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-4">🔍 Проверка среды</h1>

        <p className="mb-2 text-lg">
          🛠️ Запущено в <strong>Telegram</strong>:{" "}
          {env.hasWindowTelegram && env.hasWebApp ? (
            <span className="text-green-600">✅ Да</span>
          ) : (
            <span className="text-red-600">❌ Нет</span>
          )}
        </p>

        <h2 className="text-lg font-semibold mt-4 mb-1">📦 Отладочные данные:</h2>
        <pre className="bg-gray-100 text-sm p-3 rounded overflow-auto">
          {JSON.stringify(env, null, 2)}
        </pre>

        {user && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold">👤 Пользователь:</h2>
            <p>Имя: {user.first_name} {user.last_name}</p>
            <p>Юзернейм: @{user.username}</p>
            <p>ID: {user.id}</p>
          </div>
        )}
      </div>

      {/* 👇 ВСТАВКА календаря */}
      <MainView />
    </div>
  );
};

export default App;
