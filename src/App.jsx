import { useState } from 'react';
import Timer from './components/timer';
import Settings from './components/Settings';

function App() {
  const [config, setConfig] = useState({
    studyTime: Number(localStorage.getItem('studyTime')) || 25,
    breakTime: Number(localStorage.getItem('breakTime')) || 5,
    totalSessions: Number(localStorage.getItem('totalSessions')) || 5,
  });

  const handleSaveConfig = (newConfig) => {
    setConfig(newConfig); // actualiza el estado para el Timer
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Pomodoro Sanrio</h1>
      <Settings onSave={handleSaveConfig} />
      <Timer config={config} />
    </div>
  );
}

export default App;
