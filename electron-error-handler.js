import { app, dialog } from 'electron';

// Manejar errores no capturados
process.on('uncaughtException', (error) => {
  console.error('Error no capturado:', error);
  
  dialog.showErrorBox(
    'Error de la Aplicación',
    `Ha ocurrido un error inesperado:\n\n${error.message}\n\nLa aplicación se cerrará.`
  );
  
  app.quit();
});

// Manejar promesas rechazadas
process.on('unhandledRejection', (reason, promise) => {
  console.error('Promesa rechazada no manejada:', reason);
  
  dialog.showErrorBox(
    'Error de Promesa',
    `Una promesa fue rechazada:\n\n${reason}\n\nLa aplicación continuará funcionando.`
  );
});

// Manejar errores de la ventana
export function handleWindowError(window, error) {
  console.error('Error de ventana:', error);
  
  dialog.showErrorBox(
    'Error de Ventana',
    `Ha ocurrido un error en la ventana:\n\n${error.message}`
  );
}

// Manejar errores de carga de página
export function handlePageLoadError(window, error) {
  console.error('Error de carga de página:', error);
  
  dialog.showMessageBox(window, {
    type: 'error',
    title: 'Error de Carga',
    message: 'No se pudo cargar la página',
    detail: error.message,
    buttons: ['Reintentar', 'Cerrar']
  }).then((result) => {
    if (result.response === 0) {
      // Reintentar carga
      window.reload();
    }
  });
} 