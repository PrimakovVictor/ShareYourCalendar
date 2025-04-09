import React, { useState } from 'react';
import { CalendarIcon, LayoutGridIcon, ClockIcon } from 'lucide-react';
import { Button } from "@/components/ui/button"; // если используешь shadcn/ui

const MainView = () => {
  const [view, setView] = useState('day');

  const renderContent = () => {
    switch (view) {
      case 'day':
        return <div className="text-center text-xl mt-6">Дневной режим 📅</div>;
      case 'week':
        return <div className="text-center text-xl mt-6">Недельный режим 📆</div>;
      case 'month':
        return <div className="text-center text-xl mt-6">Месячный режим 🗓️</div>;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <h1 className="text-2xl font-bold text-center mb-6">📔 Календарь задач</h1>

      <div className="flex justify-center gap-4 mb-6">
        <Button
          variant={view === 'day' ? 'default' : 'outline'}
          onClick={() => setView('day')}
        >
          <ClockIcon className="w-4 h-4 mr-2" /> День
        </Button>
        <Button
          variant={view === 'week' ? 'default' : 'outline'}
          onClick={() => setView('week')}
        >
          <LayoutGridIcon className="w-4 h-4 mr-2" /> Неделя
        </Button>
        <Button
          variant={view === 'month' ? 'default' : 'outline'}
          onClick={() => setView('month')}
        >
          <CalendarIcon className="w-4 h-4 mr-2" /> Месяц
        </Button>
      </div>

      <div className="rounded-xl p-6 shadow-md bg-white">{renderContent()}</div>
    </div>
  );
};

export default MainView;
