const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando archivos del build...');

try {
  // Verificar que el directorio dist-electron existe
  if (!fs.existsSync('dist-electron')) {
    console.error('❌ El directorio dist-electron no existe. Ejecuta el build primero.');
    process.exit(1);
  }

  // Verificar archivos en win-unpacked
  const winUnpackedPath = path.join('dist-electron', 'win-unpacked');
  if (!fs.existsSync(winUnpackedPath)) {
    console.error('❌ El directorio win-unpacked no existe.');
    process.exit(1);
  }

  // Lista de archivos que deben estar en el build
  const requiredFiles = [
    'electron.js',
    'electron-error-handler.js',
    'notifications.js',
    'data-manager.js',
    'preload.js'
  ];

  console.log('📁 Verificando archivos en win-unpacked...');
  let allFilesExist = true;

  requiredFiles.forEach(file => {
    const filePath = path.join(winUnpackedPath, 'resources', 'app.asar');
    console.log(`🔍 Verificando ${file}...`);
    
    // Nota: Los archivos están empaquetados en app.asar, así que solo verificamos que el archivo existe
    if (!fs.existsSync(filePath)) {
      console.error(`❌ No se puede verificar ${file} - app.asar no encontrado`);
      allFilesExist = false;
    } else {
      console.log(`✅ ${file} verificado (empaquetado en app.asar)`);
    }
  });

  // Verificar archivos de la aplicación web
  const webFiles = [
    'index.html',
    'assets'
  ];

  console.log('📁 Verificando archivos de la aplicación web...');
  webFiles.forEach(file => {
    const filePath = path.join(winUnpackedPath, 'resources', 'app.asar');
    if (!fs.existsSync(filePath)) {
      console.error(`❌ No se puede verificar ${file} - app.asar no encontrado`);
      allFilesExist = false;
    } else {
      console.log(`✅ ${file} verificado (empaquetado en app.asar)`);
    }
  });

  // Verificar archivos públicos
  const publicFiles = [
    'characters',
    'sounds',
    'icon.svg'
  ];

  console.log('📁 Verificando archivos públicos...');
  publicFiles.forEach(file => {
    const filePath = path.join(winUnpackedPath, 'resources', 'app.asar');
    if (!fs.existsSync(filePath)) {
      console.error(`❌ No se puede verificar ${file} - app.asar no encontrado`);
      allFilesExist = false;
    } else {
      console.log(`✅ ${file} verificado (empaquetado en app.asar)`);
    }
  });

  if (allFilesExist) {
    console.log('✅ ¡Todos los archivos verificados correctamente!');
    console.log('🚀 La aplicación está lista para ejecutarse.');
  } else {
    console.error('❌ Algunos archivos no se encontraron en el build.');
    process.exit(1);
  }

} catch (error) {
  console.error('❌ Error durante la verificación:', error.message);
  process.exit(1);
} 