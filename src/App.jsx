import React, { useEffect, useState } from 'react';

const App = () => {
  const [tg, setTg] = useState(null);
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  const [isInTelegram, setIsInTelegram] = useState(false);
  const [debugData, setDebugData] = useState({});

  useEffect(() => {
    const telegram = window.Telegram?.WebApp;

    setDebugData({
      hasWindowTelegram: !!window.Telegram,
      hasWebApp: !!telegram,
      initDataUnsafe: telegram?.initDataUnsafe || null,
    });

    if (!telegram || !telegram.initDataUnsafe?.user) {
      setIsInTelegram(false);
      return;
    }

    telegram.ready();
    setIsInTelegram(true);
    setTg(telegram);
    setUser(telegram.initDataUnsafe.user);
    setTheme(telegram.colorScheme || 'light');

    telegram.MainButton.setText('👍 Готово');
    telegram.MainButton.show();
  }, []);

  return (
    <div className={`min-h-screen p-6 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <h1 className="text-2xl font-bold mb-4">🧪 Проверка среды</h1>

      <div className="mb-6">
        <p><strong>🛠 Запущено в Telegram:</strong> {isInTelegram ? '✅ Да' : '❌ Нет'}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">📦 Отладочные данные:</h2>
        <pre className="bg-gray-100 text-black p-2 rounded shadow overflow-x-auto text-sm">
          {JSON.stringify(debugData, null, 2)}
        </pre>
      </div>

      {user && (
        <div>
          <h2 className="text-xl font-semibold mb-2">👤 Пользователь:</h2>
          <p><strong>Имя:</strong> {user.first_name} {user.last_name}</p>
          <p><strong>Юзернейм:</strong> @{user.username}</p>
          <p><strong>Язык:</strong> {user.language_code}</p>
          <p><strong>ID:</strong> {user.id}</p>
        </div>
      )}
    </div>
  );
};

export default App;
