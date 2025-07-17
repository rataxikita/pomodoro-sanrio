import { useState, useEffect, useRef } from "react";
import AudioManager from './AudioManager';
import Character from './Character';

export default function Timer({ config }) {
    const [minutes, setMinutes] = useState(config.studyTime);
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isBreak, setIsBreak] = useState(false);
    const [session, setSession] = useState(1);
    const [playNotification, setPlayNotification] = useState(false);
    const [ambientType, setAmbientType] = useState('olas');
    const [playAmbient, setPlayAmbient] = useState(false);
    const [dailyProgress, setDailyProgress] = useState(0);

    const interval = useRef(null);

    const getToday = () => new Date().toISOString().slice(0, 10);

    useEffect(() => {
        if (isRunning) {
            interval.current = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                } else if (minutes > 0) {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                } else {
                    handleEndOfPeriod();
                }
            }, 1000);
        } else {
            clearInterval(interval.current);
        }
        return () => clearInterval(interval.current);
    }, [isRunning, minutes, seconds]);

    useEffect(() => {
        if (playNotification) {
            setPlayNotification(false);
        }
    }, [playNotification]);

    useEffect(() => {
        if (isRunning && !isBreak && playAmbient) {
            // El sonido ambiental ya está corriendo
            // Se detendrá automáticamente cuando el timer llegue a 0
            // porque handleEndOfPeriod() pone setPlayAmbient(false)
        }
    }, [isRunning, isBreak, playAmbient]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('pomodoroProgress'));
        if (saved && saved.date === getToday()) {
            setDailyProgress(saved.count);
        } else {
            setDailyProgress(0);
        }
    }, []);

    const handleEndOfPeriod = () => {
        if (isBreak) {
            setIsBreak(false);
            setSession(session + 1);
            setMinutes(config.studyTime);
            setSeconds(0);
            setPlayAmbient(true);
        } else {
            setIsBreak(true);
            setMinutes(config.breakTime);
            setSeconds(0);
            setPlayAmbient(false);
        }
        // Progreso diario
        const saved = JSON.parse(localStorage.getItem('pomodoroProgress'));
        let newCount = 1;
        if (saved && saved.date === getToday()) {
            newCount = saved.count + 1;
        }
        setDailyProgress(newCount);
        localStorage.setItem('pomodoroProgress', JSON.stringify({
            date: getToday(),
            count: newCount
        }));
        setIsRunning(false);
        setPlayNotification(true);
    };    

    const toggleTimer = () => {
        setIsRunning((prev) => {
            const next = !prev;
            if (next) {
                if (!isBreak) {
                    setPlayAmbient(true);
                }
            } else {
                setPlayAmbient(false);
            }
            return next;
        });
    };

    const resetTimer = () => {
        setMinutes(config.studyTime);
        setSeconds(0);
        setIsRunning(false);
        setIsBreak(false);
        setSession(1);
        setPlayAmbient(false);
    
    };

    return (
            <div style={{ textAlign: 'center', marginTop: '30px', fontFamily: 'sans-serif' }}>
            <h2>{isBreak ? 'Descanso 💤' : 'Estudio 📚'}</h2>
            <Character personaje="cinnamoroll" isBreak={isBreak} />
            {/* Selector de sonido ambiental - solo visible durante estudio */}
            {!isBreak && (
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ 
                        display: 'block', 
                        marginBottom: '8px',
                        fontSize: '14px',
                        color: '#666'
                    }}>
                        🎵 Sonido ambiental:
                    </label>
                    <select
                        value={ambientType}
                        onChange={(e) => setAmbientType(e.target.value)}
                        disabled={isRunning}
                        style={{
                            padding: '8px 12px',
                            borderRadius: '6px',
                            border: '1px solid #ddd',
                            fontSize: '14px',
                            backgroundColor: isRunning ? '#f5f5f5' : 'pointer'
                        }}
                    >
                        <option value="olas">🌊 Olas</option>
                        <option value="lluvia">🌧️ Lluvia</option>
                        <option value="fuego">🔥 Fuego</option>
                    </select>
                </div>
            )}

                <h1 style={{ fontSize: '60px' }}>
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </h1>

            <p style={{ fontWeight: 'bold', color: '#4caf50' }}>
  Hoy completaste {dailyProgress}/{config.totalSessions} sesiones
</p>

            <p>Sesión {session} de {config.totalSessions}</p>

            <button onClick={toggleTimer}>
                {isRunning ? 'Pausar' : 'Iniciar'}
            </button>

            <button onClick={resetTimer} style={{ marginLeft: '10px' }}>
                Reiniciar
            </button>
            
            <AudioManager
                playNotification={playNotification}
                ambientType={ambientType}
                playAmbient={playAmbient}
            />
        </div>
    );
}
