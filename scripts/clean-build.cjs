const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧹 Limpiando y reconstruyendo la aplicación...');

try {
  // 1. Limpiar directorios anteriores
  console.log('📁 Limpiando directorios anteriores...');
  const dirsToClean = ['dist', 'dist-electron', 'node_modules/.cache'];
  
  dirsToClean.forEach(dir => {
    if (fs.existsSync(dir)) {
      console.log(`🗑️  Eliminando ${dir}...`);
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });

  // 2. Verificar que los archivos necesarios existen
  console.log('🔍 Verificando archivos necesarios...');
  const requiredFiles = [
    'electron.js',
    'electron-error-handler.js',
    'notifications.js',
    'data-manager.js',
    'preload.js'
  ];

  requiredFiles.forEach(file => {
    if (!fs.existsSync(file)) {
      throw new Error(`Archivo requerido no encontrado: ${file}`);
    }
    console.log(`✅ ${file} encontrado`);
  });

  // 3. Instalar dependencias si es necesario
  console.log('📦 Verificando dependencias...');
  if (!fs.existsSync('node_modules')) {
    console.log('📦 Instalando dependencias...');
    execSync('npm install', { stdio: 'inherit' });
  }

  // 4. Construir la aplicación web
  console.log('🔨 Construyendo aplicación web...');
  execSync('npm run build', { stdio: 'inherit' });

  // 5. Verificar que la construcción fue exitosa
  if (!fs.existsSync('dist/index.html')) {
    throw new Error('La construcción de la aplicación web falló');
  }

  // 6. Construir con electron-builder
  console.log('💻 Construyendo aplicación de escritorio...');
  execSync('npx electron-builder --win --config electron-builder-config.cjs', {
    stdio: 'inherit',
    env: {
      ...process.env,
      CSC_IDENTITY_AUTO_DISCOVERY: 'false'
    }
  });

  // 7. Verificar que el build fue exitoso
  if (!fs.existsSync('dist-electron')) {
    throw new Error('La construcción de la aplicación de escritorio falló');
  }

  console.log('✅ ¡Aplicación construida exitosamente!');
  console.log('📦 Archivos generados en: dist-electron/');
  console.log('🚀 Puedes ejecutar la aplicación desde: dist-electron/win-unpacked/Pomodoro Sanrio.exe');

} catch (error) {
  console.error('❌ Error durante la construcción:', error.message);
  process.exit(1);
} 