# 📖 Instrucciones de Uso - Pomodoro Sanrio

## 🎯 Resumen de Mejoras Implementadas

### ✅ Problemas Solucionados

1. **El temporizador ya NO se pausa al cambiar de pestaña**
   - El estado del temporizador se mantiene al navegar entre pestañas
   - Puedes configurar sin interrumpir tu sesión de estudio

2. **Opciones de personaje y sonido movidas a configuración**
   - Todas las opciones de personalización están en la pestaña "⚙️ Configuración"
   - La vista principal está limpia y enfocada en el temporizador

3. **Vista principal simplificada**
   - Solo muestra el temporizador con el personaje seleccionado
   - Botón de silenciar sonidos fácilmente accesible
   - Interfaz más limpia y enfocada

4. **Opción de mutear sonidos agregada**
   - Botón para silenciar/activar todos los sonidos
   - Control total sobre las notificaciones de audio

5. **Soporte para aplicación de escritorio**
   - Configuración completa de Electron
   - Scripts para construir en Windows, Mac y Linux
   - Notificaciones del sistema integradas

## 🚀 Cómo Usar la Aplicación

### Vista Principal (Temporizador)

1. **Iniciar/Pausar**: 
   - Haz clic en el botón principal para controlar el temporizador
   - El botón cambia entre "▶️ Iniciar" y "⏸️ Pausar"

2. **Reiniciar**: 
   - Usa el botón "🔄 Reiniciar" para volver al inicio de la sesión actual

3. **Silenciar Sonidos**: 
   - El botón "🔇 Sonidos Silenciados" / "🔊 Sonidos Activos" controla el audio
   - Cambia instantáneamente el estado de todos los sonidos

4. **Progreso**: 
   - Ve cuántas sesiones has completado hoy en la barra de progreso

### Configuración

Accede a la pestaña "⚙️ Configuración" para personalizar:

#### ⏰ Tiempos
- **Minutos de estudio**: 1-120 minutos (por defecto: 25)
- **Minutos de descanso**: 1-60 minutos (por defecto: 5)
- **Número de sesiones**: 1-20 sesiones (por defecto: 5)

#### 🎭 Personalización
- **Personaje**: Selecciona tu compañero de estudio (actualmente Cinnamoroll)
- **Sonido ambiental**: Elige entre olas, lluvia o fuego
- **Silenciar sonidos**: Desactiva todas las notificaciones de audio

#### 🔄 Modo Automático
- **Activado**: El temporizador continúa automáticamente entre fases
- **Desactivado**: El temporizador se pausa al final de cada fase

## 💻 Aplicación de Escritorio

### Instalación

1. **Desarrollo**:
   ```bash
   npm run electron-dev
   ```

2. **Construir para Windows**:
   ```bash
   npm run electron-pack-win
   ```

3. **Construir para macOS**:
   ```bash
   npm run electron-pack-mac
   ```

4. **Construir para Linux**:
   ```bash
   npm run electron-pack-linux
   ```

### Características de la Aplicación de Escritorio

- **Notificaciones del sistema**: Alertas cuando terminan las sesiones
- **Bandeja del sistema**: Icono en la bandeja para acceso rápido
- **Menú nativo**: Menús del sistema operativo integrados
- **Persistencia de datos**: Configuración guardada localmente
- **Estadísticas**: Seguimiento de progreso a largo plazo

## 🎵 Sistema de Sonidos

### Sonidos Disponibles
- **Campana**: Notificación al final de cada fase
- **Olas**: Sonido ambiental relajante
- **Lluvia**: Ambiente de lluvia suave
- **Fuego**: Sonido de fuego crepitante

### Control de Audio
- **Botón de silenciar**: Controla todos los sonidos desde la vista principal
- **Configuración**: Ajusta el tipo de sonido ambiental en configuración
- **Volumen**: Los sonidos ambientales se reproducen al 30% del volumen

## 📊 Seguimiento de Progreso

### Progreso Diario
- Se registra automáticamente cada sesión completada
- Se reinicia cada día
- Se muestra en la barra de progreso

### Estadísticas (Aplicación de Escritorio)
- Total de sesiones completadas
- Tiempo total de estudio
- Promedio de sesiones por día
- Progreso semanal y mensual

## 🔧 Solución de Problemas

### Problemas Comunes

**Los sonidos no funcionan:**
- Verifica que el navegador permita reproducción de audio
- Usa el botón de silenciar para controlar el audio
- Asegúrate de que los archivos de sonido estén presentes

**La aplicación de escritorio no se ejecuta:**
- Instala las dependencias: `npm install`
- Ejecuta en modo desarrollo: `npm run electron-dev`
- Verifica que Node.js esté actualizado

**El temporizador no mantiene el estado:**
- ✅ **Solucionado**: El temporizador ahora mantiene su estado al cambiar pestañas

**No se guardan las configuraciones:**
- Verifica que localStorage esté habilitado en el navegador
- En la aplicación de escritorio, los datos se guardan automáticamente

## 🎨 Personalización Avanzada

### Agregar Nuevos Personajes
1. Agrega las imágenes en `public/characters/`
2. Formato: `nombre-personaje-study.png` y `nombre-personaje-break.png`
3. Actualiza el selector en `Settings.jsx`

### Modificar Sonidos
1. Reemplaza los archivos en `public/sounds/`
2. Mantén los mismos nombres de archivo
3. Usa formato MP3 para mejor compatibilidad

### Cambiar Iconos
- Reemplaza los archivos en `public/`:
  - `icon.png` - Icono principal (512x512)
  - `icon.ico` - Icono para Windows
  - `icon.icns` - Icono para macOS

## 📱 Compatibilidad

### Navegadores Web
- ✅ Chrome/Edge (recomendado)
- ✅ Firefox
- ✅ Safari
- ✅ Dispositivos móviles

### Sistemas Operativos (Aplicación de Escritorio)
- ✅ Windows 10/11
- ✅ macOS 10.14+
- ✅ Linux (Ubuntu, Fedora, etc.)

## 🆕 Nuevas Características

### v1.0.0
- ✨ Temporizador que mantiene estado entre pestañas
- 🎭 Configuración centralizada de personajes y sonidos
- 🔇 Control completo de sonidos
- 💻 Aplicación de escritorio con Electron
- 📊 Sistema de estadísticas avanzado
- 🔔 Notificaciones del sistema integradas
- 💾 Persistencia de datos mejorada

---

**¡Disfruta de tus sesiones de estudio con Pomodoro Sanrio! 🍓✨** 