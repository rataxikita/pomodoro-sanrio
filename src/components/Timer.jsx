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
    const [playAmbient, setPlayAmbient] = useState(false);
    const [dailyProgress, setDailyProgress] = useState(0);
    const [autoMode, setAutoMode] = useState(config.autoMode);
    const [selectedCharacter, setSelectedCharacter] = useState(config.selectedCharacter);
    const [ambientType, setAmbientType] = useState(config.ambientType);
    const [soundMuted, setSoundMuted] = useState(config.soundMuted);

    const interval = useRef(null);

    const getToday = () => new Date().toISOString().slice(0, 10);

    // Actualizar configuración cuando cambie
    useEffect(() => {
        setSelectedCharacter(config.selectedCharacter);
        setAmbientType(config.ambientType);
        setSoundMuted(config.soundMuted);
        setAutoMode(config.autoMode);
    }, [config]);

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
        
        setPlayNotification(true);
        
        // Modo automático: continuar automáticamente
        if (autoMode && session < config.totalSessions) {
            setIsRunning(true);
        } else {
            setIsRunning(false);
        }
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

    const toggleSoundMute = () => {
        const newMuted = !soundMuted;
        setSoundMuted(newMuted);
        localStorage.setItem('soundMuted', newMuted.toString());
        
        // Si se mutearon los sonidos, detener el ambiental
        if (newMuted) {
            setPlayAmbient(false);
        }
    };

    return (
        <div style={{ 
            textAlign: 'center', 
            padding: '20px',
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '15px',
            margin: '20px 0'
        }}>
            <h2 style={{
                fontSize: '2rem',
                color: isBreak ? '#ff6b6b' : '#4ecdc4',
                marginBottom: '20px',
                fontWeight: 'bold'
            }}>
                {isBreak ? '💤 Descanso' : '📚 Estudio'}
            </h2>
            
            <Character personaje={selectedCharacter} isBreak={isBreak} />
            
            {/* Botón de mutear sonidos */}
            <div style={{ marginBottom: '20px' }}>
                <button
                    onClick={toggleSoundMute}
                    style={{
                        padding: '8px 16px',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        border: 'none',
                        borderRadius: '8px',
                        background: soundMuted ? '#ff6b6b' : '#4ecdc4',
                        color: 'white',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                    onMouseOver={(e) => e.target.style.transform = 'translateY(-1px)'}
                    onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                >
                    {soundMuted ? '🔇 Sonidos Silenciados' : '🔊 Sonidos Activos'}
                </button>
            </div>

            <div style={{
                fontSize: '4rem',
                fontWeight: 'bold',
                color: isBreak ? '#ff6b6b' : '#4ecdc4',
                margin: '20px 0',
                fontFamily: 'monospace',
                textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
            }}>
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>

            <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '15px',
                borderRadius: '10px',
                margin: '20px 0',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
            }}>
                <p style={{ fontWeight: 'bold', margin: '0 0 5px 0' }}>
                    Hoy completaste {dailyProgress}/{config.totalSessions} sesiones
                </p>
                <p style={{ margin: '0', opacity: '0.9' }}>
                    Sesión {session} de {config.totalSessions}
                </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
                <button 
                    onClick={toggleTimer}
                    style={{
                        padding: '15px 30px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        border: 'none',
                        borderRadius: '10px',
                        background: isRunning ? '#ff6b6b' : '#4ecdc4',
                        color: 'white',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                        minWidth: '120px'
                    }}
                    onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                    onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                >
                    {isRunning ? '⏸️ Pausar' : '▶️ Iniciar'}
                </button>

                <button 
                    onClick={resetTimer}
                    style={{
                        padding: '15px 30px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        border: 'none',
                        borderRadius: '10px',
                        background: '#95a5a6',
                        color: 'white',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                        minWidth: '120px'
                    }}
                    onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                    onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                >
                    🔄 Reiniciar
                </button>
            </div>
            
            <AudioManager
                playNotification={playNotification && !soundMuted}
                ambientType={ambientType}
                playAmbient={playAmbient && !soundMuted}
            />
        </div>
    );
}
