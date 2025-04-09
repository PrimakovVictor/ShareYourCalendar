import React, { useEffect, useState } from 'react';

const App = () => {
  const [tg, setTg] = useState(null);
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const telegram = window.Telegram?.WebApp;

    if (!telegram || !telegram.initDataUnsafe?.user) {
      console.warn('Not inside Telegram WebApp or user data missing.');
      return;
    }

    telegram.ready();
    setTg(telegram);
    setUser(telegram.initDataUnsafe.user);
    setTheme(telegram.colorScheme || 'light');

    telegram.MainButton.setText('👍 Готово');
    telegram.MainButton.show();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-center p-4">
        <p className="text-lg text-red-600 font-semibold">
          Это приложение предназначено для<br />запуска внутри Telegram!!! 📱
        </p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-6 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <h1 className="text-2xl font-bold mb-4">Привет, Telegram Mini App 👋</h1>

      <div className="space-y-2">
        <p><strong>Имя:</strong> {user.first_name} {user.last_name}</p>
        <p><strong>Юзернейм:</strong> @{user.username}</p>
        <p><strong>Язык:</strong> {user.language_code}</p>
        <p><strong>ID:</strong> {user.id}</p>
      </div>
    </div>
  );
};

export default App;
