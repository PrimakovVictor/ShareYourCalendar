import React, { useEffect, useState } from 'react';

const App = () => {
  const [tg, setTg] = useState(null);
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  const [isTelegram, setIsTelegram] = useState(true);

  useEffect(() => {
    if (!window.Telegram || !window.Telegram.WebApp) {
      console.warn('🚫 Telegram WebApp API недоступен');
      setIsTelegram(false);
      return;
    }

    const telegram = window.Telegram.WebApp;
    telegram.ready();

    setTg(telegram);
    setUser(telegram.initDataUnsafe?.user || null);
    setTheme(telegram.colorScheme || 'light');

    telegram.MainButton.setText('👍 Готово');
    telegram.MainButton.show();
  }, []);

  if (!isTelegram) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center p-4 text-lg text-red-600">
        Это приложение предназначено для запуска внутри Telegram 📱
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
        <p>Не удалось получить пользователя. Проверь, запущено ли приложение из Telegram 🙃</p>
      )}
    </div>
  );
};

export default App;
