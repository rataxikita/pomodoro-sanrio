import { useState } from 'react';
import Timer from './components/timer';
import Settings from './components/Settings';

function App() {
  const [config, setConfig] = useState({
    studyTime: Number(localStorage.getItem('studyTime')) || 25,
    breakTime: Number(localStorage.getItem('breakTime')) || 5,
    totalSessions: Number(localStorage.getItem('totalSessions')) || 5,
    autoMode: localStorage.getItem('autoMode') === 'true' || false,
    selectedCharacter: localStorage.getItem('selectedCharacter') || 'cinnamoroll',
    ambientType: localStorage.getItem('ambientType') || 'olas',
    soundMuted: localStorage.getItem('soundMuted') === 'true' || false,
  });

  const [activeTab, setActiveTab] = useState('timer');

  const handleSaveConfig = (newConfig) => {
    setConfig(newConfig);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        padding: '30px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
      }}>
        <h1 style={{ 
          textAlign: 'center', 
          color: '#4a5568',
          marginBottom: '30px',
          fontSize: '2.5rem',
          fontWeight: 'bold'
        }}>
          🍓 Pomodoro Sanrio 🍓
        </h1>

        {/* Pestañas */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '30px',
          borderBottom: '2px solid #e2e8f0'
        }}>
          <button
            onClick={() => setActiveTab('timer')}
            style={{
              padding: '12px 24px',
              margin: '0 10px',
              border: 'none',
              background: activeTab === 'timer' ? '#667eea' : 'transparent',
              color: activeTab === 'timer' ? 'white' : '#4a5568',
              borderRadius: '10px 10px 0 0',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              transition: 'all 0.3s ease'
            }}
          >
            ⏰ Temporizador
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            style={{
              padding: '12px 24px',
              margin: '0 10px',
              border: 'none',
              background: activeTab === 'settings' ? '#667eea' : 'transparent',
              color: activeTab === 'settings' ? 'white' : '#4a5568',
              borderRadius: '10px 10px 0 0',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              transition: 'all 0.3s ease'
            }}
          >
            ⚙️ Configuración
          </button>
        </div>

        {/* Contenido de las pestañas */}
        {activeTab === 'timer' && (
          <Timer config={config} />
        )}
        
        {activeTab === 'settings' && (
          <Settings onSave={handleSaveConfig} config={config} />
        )}
      </div>
    </div>
  );
}

export default App;
