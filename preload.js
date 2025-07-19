import { contextBridge, ipcRenderer } from 'electron';

// Exponer APIs protegidas al renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  // APIs para notificaciones del sistema
  showNotification: (title, body) => {
    ipcRenderer.send('show-notification', { title, body });
  },
  
  // APIs para el temporizador
  onTimerComplete: (callback) => {
    ipcRenderer.on('timer-complete', callback);
  },
  
  // APIs para la configuración
  getConfig: () => {
    return ipcRenderer.invoke('get-config');
  },
  
  saveConfig: (config) => {
    return ipcRenderer.invoke('save-config', config);
  },
  
  // APIs para el estado de la aplicación
  onAppStateChange: (callback) => {
    ipcRenderer.on('app-state-change', callback);
  },
  
  // APIs para la ventana
  minimizeWindow: () => {
    ipcRenderer.send('minimize-window');
  },
  
  closeWindow: () => {
    ipcRenderer.send('close-window');
  },
  
  // APIs para el sistema de archivos (solo lectura)
  readFile: (filePath) => {
    return ipcRenderer.invoke('read-file', filePath);
  },
  
  // APIs para el almacenamiento local
  getStorage: (key) => {
    return ipcRenderer.invoke('get-storage', key);
  },
  
  setStorage: (key, value) => {
    return ipcRenderer.invoke('set-storage', key, value);
  },
  
  // APIs para el audio
  playSound: (soundFile) => {
    ipcRenderer.send('play-sound', soundFile);
  },
  
  stopSound: () => {
    ipcRenderer.send('stop-sound');
  },
  
  // APIs para el menú de la bandeja del sistema
  updateTrayMenu: (menuItems) => {
    ipcRenderer.send('update-tray-menu', menuItems);
  },
  
  // APIs para el estado de la aplicación
  setAppState: (state) => {
    ipcRenderer.send('set-app-state', state);
  },
  
  // APIs para las notificaciones del sistema
  requestNotificationPermission: () => {
    return ipcRenderer.invoke('request-notification-permission');
  },
  
  // APIs para el tema del sistema
  getSystemTheme: () => {
    return ipcRenderer.invoke('get-system-theme');
  },
  
  onThemeChange: (callback) => {
    ipcRenderer.on('theme-change', callback);
  },
  
  // APIs para el estado de la ventana
  isWindowVisible: () => {
    return ipcRenderer.invoke('is-window-visible');
  },
  
  showWindow: () => {
    ipcRenderer.send('show-window');
  },
  
  hideWindow: () => {
    ipcRenderer.send('hide-window');
  },
  
  // APIs para el estado de la aplicación
  getAppVersion: () => {
    return ipcRenderer.invoke('get-app-version');
  },
  
  // APIs para el estado del temporizador
  getTimerState: () => {
    return ipcRenderer.invoke('get-timer-state');
  },
  
  setTimerState: (state) => {
    ipcRenderer.send('set-timer-state', state);
  },
  
  // APIs para las estadísticas
  getStats: () => {
    return ipcRenderer.invoke('get-stats');
  },
  
  saveStats: (stats) => {
    return ipcRenderer.invoke('save-stats', stats);
  },
  
  // APIs para las actualizaciones
  checkForUpdates: () => {
    return ipcRenderer.invoke('check-for-updates');
  },
  
  onUpdateAvailable: (callback) => {
    ipcRenderer.on('update-available', callback);
  },
  
  // APIs para el estado de la aplicación
  isOnline: () => {
    return ipcRenderer.invoke('is-online');
  },
  
  onOnlineStatusChange: (callback) => {
    ipcRenderer.on('online-status-change', callback);
  }
});

// Exponer APIs para el desarrollo
if (process.env.NODE_ENV === 'development') {
  contextBridge.exposeInMainWorld('devAPI', {
    openDevTools: () => {
      ipcRenderer.send('open-dev-tools');
    },
    
    reloadWindow: () => {
      ipcRenderer.send('reload-window');
    },
    
    getLogs: () => {
      return ipcRenderer.invoke('get-logs');
    }
  });
} 