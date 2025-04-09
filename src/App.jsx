import React, { useEffect, useState } from 'react';

const App = () => {
  const [tg, setTg] = useState(null);
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Инициализируем Telegram WebApp
    const telegram = window.Telegram.WebApp;
    telegram.ready();

    setTg(telegram);
    setUser(telegram.initDataUnsafe?.user || null);
    setTheme(telegram.colorScheme || 'light');

    // Открываем main button для теста (если надо)
    telegram.MainButton.setText('👍 Готово');
    telegram.MainButton.show();
  }, []);

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
        <p>Пользователь не найден. Запусти в Telegram 🙃</p>
      )}
    </div>
  );
};

export default App;