export default function Character({ personaje = "cinnamoroll", isBreak }) {
    const fase = isBreak ? "break" : "study";
    const ruta = `/characters/${personaje}-${fase}.png`;
  
    return (
      <div style={{ 
        marginTop: "20px",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}>
        <div style={{
          position: 'relative',
          padding: '20px',
          borderRadius: '20px',
          background: isBreak 
            ? 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)' 
            : 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
          transform: 'scale(1)',
          transition: 'all 0.3s ease',
          animation: isBreak ? 'bounce 2s infinite' : 'pulse 3s infinite'
        }}>
          <img
            src={ruta}
            alt={`${personaje} ${fase}`}
            style={{ 
              width: "180px", 
              height: "auto",
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
              transition: 'transform 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          />
        </div>
        
        <p style={{
          marginTop: '15px',
          fontSize: '16px',
          fontWeight: 'bold',
          color: isBreak ? '#ff6b6b' : '#4ecdc4',
          textAlign: 'center',
          opacity: '0.8'
        }}>
          {isBreak ? '💤 ¡Hora de descansar!' : '📚 ¡A estudiar!'}
        </p>
        
        <style jsx>{`
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateY(0) scale(1);
            }
            40% {
              transform: translateY(-10px) scale(1.02);
            }
            60% {
              transform: translateY(-5px) scale(1.01);
            }
          }
          
          @keyframes pulse {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.02);
            }
            100% {
              transform: scale(1);
            }
          }
        `}</style>
      </div>
    );
  }
  