import { useState } from 'react';

export default function Settings({ onSave }) {
  const [studyTime, setStudyTime] = useState(() => Number(localStorage.getItem('studyTime')) || 25);
  const [breakTime, setBreakTime] = useState(() => Number(localStorage.getItem('breakTime')) || 5);
  const [totalSessions, setTotalSessions] = useState(() => Number(localStorage.getItem('totalSessions')) || 5);

  const handleSave = () => {
    // Guardar en localStorage
    localStorage.setItem('studyTime', studyTime);
    localStorage.setItem('breakTime', breakTime);
    localStorage.setItem('totalSessions', totalSessions);

    // Avisar al componente padre (Timer) que hay nuevos valores
    if (onSave) {
      onSave({ studyTime, breakTime, totalSessions });
    }

    alert('Configuración guardada ✔️');
  };

  return (
    <div style={{ margin: '20px', textAlign: 'center' }}>
      <h2>⚙️ Configuración</h2>

      <div>
        <label>Minutos de estudio: </label>
        <input
          type="number"
          min="1"
          value={studyTime}
          onChange={(e) => setStudyTime(Number(e.target.value))}
        />
      </div>

      <div>
        <label>Minutos de descanso: </label>
        <input
          type="number"
          min="1"
          value={breakTime}
          onChange={(e) => setBreakTime(Number(e.target.value))}
        />
      </div>

      <div>
        <label>Número de sesiones: </label>
        <input
          type="number"
          min="1"
          value={totalSessions}
          onChange={(e) => setTotalSessions(Number(e.target.value))}
        />
      </div>

      <button onClick={handleSave} style={{ marginTop: '10px' }}>
        Guardar
      </button>
    </div>
  );
}
