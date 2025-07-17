import { useEffect, useRef } from 'react';

export default function AudioManager({ playNotification, ambientType, playAmbient }) {
  // Refs para los audios
  const campanaRef = useRef(null);
  const olasRef = useRef(null);
  const fuegoRef = useRef(null);
  const lluviaRef = useRef(null);

  // Reproducir sonido de notificación
  useEffect(() => {
    if (playNotification && campanaRef.current) {
      campanaRef.current.currentTime = 0;
      campanaRef.current.play();
    }
  }, [playNotification]);

  // Manejar sonido ambiental
  useEffect(() => {
    // Pausar todos
    [olasRef, fuegoRef, lluviaRef].forEach(ref => {
      if (ref.current) {
        ref.current.pause();
        ref.current.currentTime = 0;
      }
    });
    // Reproducir el seleccionado
    if (playAmbient) {
      let ref = null;
      if (ambientType === 'olas') ref = olasRef;
      if (ambientType === 'fuego') ref = fuegoRef;
      if (ambientType === 'lluvia') ref = lluviaRef;
      if (ref && ref.current) {
        ref.current.volume = 0.3;
        ref.current.loop = true;
        ref.current.play();
      }
    }
  }, [ambientType, playAmbient]);

  return (
    <div style={{ display: 'none' }}>
      <audio ref={campanaRef} src="/sounds/Campana.mp3" preload="auto" />
      <audio ref={olasRef} src="/sounds/Olas.mp3" preload="auto" />
      <audio ref={fuegoRef} src="/sounds/Fuego.mp3" preload="auto" />
      <audio ref={lluviaRef} src="/sounds/Lluvia.mp3" preload="auto" />
    </div>
  );
} 