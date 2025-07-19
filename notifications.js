import { Notification, nativeImage } from 'electron';
import path from 'path';

class NotificationManager {
  constructor() {
    this.isSupported = Notification.isSupported();
  }

  // Mostrar notificación de inicio de sesión
  showStudyStartNotification() {
    if (!this.isSupported) return;

    const notification = new Notification({
      title: 'Pomodoro Sanrio',
      body: '¡Comienza tu sesión de estudio! 💪',
      icon: path.join(process.cwd(), 'public/characters/cinnamoroll-study.png'),
      silent: false
    });

    notification.show();
  }

  // Mostrar notificación de fin de sesión de estudio
  showStudyEndNotification() {
    if (!this.isSupported) return;

    const notification = new Notification({
      title: 'Pomodoro Sanrio',
      body: '¡Excelente trabajo! Es hora de descansar. 💤',
      icon: path.join(process.cwd(), 'public/characters/cinnamoroll-break.png'),
      silent: false
    });

    notification.show();
  }

  // Mostrar notificación de fin de descanso
  showBreakEndNotification() {
    if (!this.isSupported) return;

    const notification = new Notification({
      title: 'Pomodoro Sanrio',
      body: '¡Descanso terminado! Volvamos a estudiar. 📚',
      icon: path.join(process.cwd(), 'public/characters/cinnamoroll-study.png'),
      silent: false
    });

    notification.show();
  }

  // Mostrar notificación de sesión completada
  showSessionCompleteNotification(sessionNumber, totalSessions) {
    if (!this.isSupported) return;

    const notification = new Notification({
      title: 'Pomodoro Sanrio',
      body: `¡Sesión ${sessionNumber} de ${totalSessions} completada! 🎉`,
      icon: path.join(process.cwd(), 'public/characters/cinnamoroll-break.png'),
      silent: false
    });

    notification.show();
  }

  // Mostrar notificación de todas las sesiones completadas
  showAllSessionsCompleteNotification() {
    if (!this.isSupported) return;

    const notification = new Notification({
      title: 'Pomodoro Sanrio',
      body: '¡Felicitaciones! Has completado todas las sesiones del día. 🏆',
      icon: path.join(process.cwd(), 'public/characters/cinnamoroll-break.png'),
      silent: false
    });

    notification.show();
  }

  // Mostrar notificación personalizada
  showCustomNotification(title, body, icon = null) {
    if (!this.isSupported) return;

    const notification = new Notification({
      title: title || 'Pomodoro Sanrio',
      body: body,
      icon: icon || path.join(process.cwd(), 'public/characters/cinnamoroll-study.png'),
      silent: false
    });

    notification.show();
  }

  // Verificar si las notificaciones están soportadas
  isNotificationSupported() {
    return this.isSupported;
  }

  // Solicitar permisos de notificación (solo en macOS)
  requestPermission() {
    if (process.platform === 'darwin') {
      // En macOS, las notificaciones se manejan automáticamente
      return Promise.resolve(true);
    }
    
    // En Windows y Linux, las notificaciones funcionan sin permisos especiales
    return Promise.resolve(true);
  }
}

export default new NotificationManager(); 