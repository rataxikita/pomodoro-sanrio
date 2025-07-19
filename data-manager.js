import fs from 'fs';
import path from 'path';
import { app } from 'electron';

class DataManager {
  constructor() {
    this.dataPath = path.join(app.getPath('userData'), 'pomodoro-data.json');
    this.statsPath = path.join(app.getPath('userData'), 'pomodoro-stats.json');
    this.ensureDataDirectory();
  }

  // Asegurar que el directorio de datos existe
  ensureDataDirectory() {
    const dataDir = path.dirname(this.dataPath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
  }

  // Guardar configuración
  saveConfig(config) {
    try {
      const data = {
        config,
        lastUpdated: new Date().toISOString()
      };
      fs.writeFileSync(this.dataPath, JSON.stringify(data, null, 2));
      return true;
    } catch (error) {
      console.error('Error guardando configuración:', error);
      return false;
    }
  }

  // Cargar configuración
  loadConfig() {
    try {
      if (fs.existsSync(this.dataPath)) {
        const data = JSON.parse(fs.readFileSync(this.dataPath, 'utf8'));
        return data.config || this.getDefaultConfig();
      }
      return this.getDefaultConfig();
    } catch (error) {
      console.error('Error cargando configuración:', error);
      return this.getDefaultConfig();
    }
  }

  // Configuración por defecto
  getDefaultConfig() {
    return {
      studyTime: 25,
      breakTime: 5,
      totalSessions: 5,
      autoMode: false,
      selectedCharacter: 'cinnamoroll',
      ambientType: 'olas',
      soundMuted: false
    };
  }

  // Guardar estadísticas
  saveStats(stats) {
    try {
      const data = {
        stats,
        lastUpdated: new Date().toISOString()
      };
      fs.writeFileSync(this.statsPath, JSON.stringify(data, null, 2));
      return true;
    } catch (error) {
      console.error('Error guardando estadísticas:', error);
      return false;
    }
  }

  // Cargar estadísticas
  loadStats() {
    try {
      if (fs.existsSync(this.statsPath)) {
        const data = JSON.parse(fs.readFileSync(this.statsPath, 'utf8'));
        return data.stats || this.getDefaultStats();
      }
      return this.getDefaultStats();
    } catch (error) {
      console.error('Error cargando estadísticas:', error);
      return this.getDefaultStats();
    }
  }

  // Estadísticas por defecto
  getDefaultStats() {
    return {
      totalSessions: 0,
      totalStudyTime: 0,
      totalBreakTime: 0,
      dailyProgress: {},
      weeklyProgress: {},
      monthlyProgress: {}
    };
  }

  // Actualizar progreso diario
  updateDailyProgress(date, sessionsCompleted) {
    try {
      const stats = this.loadStats();
      stats.dailyProgress[date] = sessionsCompleted;
      stats.totalSessions += sessionsCompleted;
      this.saveStats(stats);
      return true;
    } catch (error) {
      console.error('Error actualizando progreso diario:', error);
      return false;
    }
  }

  // Obtener progreso de una fecha específica
  getDailyProgress(date) {
    try {
      const stats = this.loadStats();
      return stats.dailyProgress[date] || 0;
    } catch (error) {
      console.error('Error obteniendo progreso diario:', error);
      return 0;
    }
  }

  // Obtener estadísticas generales
  getGeneralStats() {
    try {
      const stats = this.loadStats();
      return {
        totalSessions: stats.totalSessions,
        totalStudyTime: stats.totalStudyTime,
        totalBreakTime: stats.totalBreakTime,
        averageSessionsPerDay: this.calculateAverageSessionsPerDay(stats)
      };
    } catch (error) {
      console.error('Error obteniendo estadísticas generales:', error);
      return {
        totalSessions: 0,
        totalStudyTime: 0,
        totalBreakTime: 0,
        averageSessionsPerDay: 0
      };
    }
  }

  // Calcular promedio de sesiones por día
  calculateAverageSessionsPerDay(stats) {
    const days = Object.keys(stats.dailyProgress).length;
    if (days === 0) return 0;
    
    const totalSessions = Object.values(stats.dailyProgress).reduce((sum, sessions) => sum + sessions, 0);
    return Math.round((totalSessions / days) * 100) / 100;
  }

  // Exportar datos
  exportData() {
    try {
      const config = this.loadConfig();
      const stats = this.loadStats();
      
      const exportData = {
        config,
        stats,
        exportedAt: new Date().toISOString(),
        version: '1.0.0'
      };
      
      const exportPath = path.join(app.getPath('downloads'), `pomodoro-sanrio-backup-${Date.now()}.json`);
      fs.writeFileSync(exportPath, JSON.stringify(exportData, null, 2));
      
      return exportPath;
    } catch (error) {
      console.error('Error exportando datos:', error);
      return null;
    }
  }

  // Importar datos
  importData(filePath) {
    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      
      if (data.config) {
        this.saveConfig(data.config);
      }
      
      if (data.stats) {
        this.saveStats(data.stats);
      }
      
      return true;
    } catch (error) {
      console.error('Error importando datos:', error);
      return false;
    }
  }

  // Limpiar datos antiguos (más de 30 días)
  cleanupOldData() {
    try {
      const stats = this.loadStats();
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const cleanedProgress = {};
      Object.keys(stats.dailyProgress).forEach(date => {
        if (new Date(date) >= thirtyDaysAgo) {
          cleanedProgress[date] = stats.dailyProgress[date];
        }
      });
      
      stats.dailyProgress = cleanedProgress;
      this.saveStats(stats);
      
      return true;
    } catch (error) {
      console.error('Error limpiando datos antiguos:', error);
      return false;
    }
  }
}

export default new DataManager(); 