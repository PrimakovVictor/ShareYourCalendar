import React, { useEffect, useState } from 'react';

const App = () => {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  const [isTelegram, setIsTelegram] = useState(false);
  const [debugInfo, setDebugInfo] = useState(null);

  useEffect(() => {
    const rawTelegram = window.Telegram;
    const telegram = rawTelegram?.WebApp;

    console.log('📦 window.Telegram:', rawTelegram);
    console.log('📦 window.Telegram.WebApp:', telegram);
    console.log('📦 initDataUnsafe:', telegram?.initDataUnsafe);

    setDebugInfo({
      telegram: rawTelegram,
      webApp: telegram,
      initDataUnsafe: telegram?.initDataUnsafe,
    });

    if (!telegram) {
      console.warn('❌ WebApp не найден. Ты точно открыл через Telegram?');
      return;
    }

    telegram.ready();
    setIsTelegram(true);
    setUser(telegram.initDataUnsafe?.user || null);
    setTheme(telegram.colorScheme || 'light');

    telegram.MainButton.setText('👍 Готово');
    telegram.MainButton.show();
  }, []);

  if (!isTelegram) {
    return (
      <div className="min-h-screen bg-red-50 text-red-800 p-4 space-y-2 text-sm">
        <h2 className="text-lg font-semibold">⚠️ Не запущено в Telegram</h2>
        <p>window.Telegram.WebApp не найден</p>
        <pre className="bg-white text-black p-2 rounded shadow overflow-x-auto">
          {JSON.stringify(debugInfo, null, 2)}
        </pre>
        <p className="mt-4">
          Попробуй открыть приложение через <strong>бота в Telegram</strong>, а не напрямую в браузере.
        </p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-6 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <h1 className="text-2xl font-bold mb-4">Привет, Telegram Mini App 👋</h1>

      {user ? (
        <div className="space-y-2">
          <p><strong>Имя:</strong> {user.first_name} {user.last_name}</p>
          <p><strong>Юзернейм:</strong> @{user.username}</p>
          <p><strong>Язык:</strong> {user.language_code}</p>
          <p><strong>ID:</strong> {user.id}</p>
        </div>
      ) : (
        <p>Пользователь не найден. Проверь, что миниаппа запущена через Telegram 🙃</p>
      )}
    </div>
  );
};

export default App;