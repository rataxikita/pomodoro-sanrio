export default function Character({ personaje = "cinnamoroll", isBreak }) {
    const fase = isBreak ? "break" : "study";
    const ruta = `/characters/${personaje}-${fase}.png`;
  
    return (
      <div style={{ marginTop: "20px" }}>
        <img
          src={ruta}
          alt={`${personaje} ${fase}`}
          style={{ width: "200px", height: "auto" }}
        />
      </div>
    );
  }
  