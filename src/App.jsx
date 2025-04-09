import React, { useEffect, useState } from 'react';

const App = () => {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  const [webAppReady, setWebAppReady] = useState(false);

  useEffect(() => {
    const telegram = window?.Telegram?.WebApp;

    if (!telegram) {
      console.warn("WebApp API не найден — открой через Telegram бота.");
      return;
    }

    telegram.ready();
    setWebAppReady(true);
    setUser(telegram.initDataUnsafe?.user || null);
    setTheme(telegram.colorScheme || 'light');

    telegram.MainButton.setText("Готово ✅");
    telegram.MainButton.show();
  }, []);

  if (!webAppReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-100 text-red-800 text-center p-4">
        <div>
          <h2 className="text-xl font-bold mb-2">🔒 Не запущено в Telegram</h2>
          <p className="text-sm">Пожалуйста, открой миниаппу через кнопку в Telegram-боте.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-6 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <h1 className="text-2xl font-bold mb-4">Привет, {user?.first_name || 'пользователь'} 👋</h1>
      {user && (
        <ul className="space-y-1 text-sm">
          <li><strong>Имя:</strong> {user.first_name} {user.last_name}</li>
          <li><strong>Юзернейм:</strong> @{user.username}</li>
          <li><strong>Язык:</strong> {user.language_code}</li>
          <li><strong>ID:</strong> {user.id}</li>
        </ul>
      )}
    </div>
  );
};

export default App;
