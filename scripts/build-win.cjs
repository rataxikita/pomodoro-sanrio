const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Construyendo aplicación para Windows...');

try {
  // 1. Limpiar directorios anteriores
  console.log('📁 Limpiando directorios anteriores...');
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
  }
  if (fs.existsSync('dist-electron')) {
    fs.rmSync('dist-electron', { recursive: true, force: true });
  }

  // 2. Construir la aplicación web
  console.log('🔨 Construyendo aplicación web...');
  execSync('npm run build', { stdio: 'inherit' });

  // 3. Verificar que la construcción fue exitosa
  if (!fs.existsSync('dist/index.html')) {
    throw new Error('La construcción de la aplicación web falló');
  }

  // 4. Construir con electron-builder sin firma
  console.log('💻 Construyendo aplicación de escritorio...');
  execSync('npx electron-builder --win --config electron-builder-config.cjs', {
    stdio: 'inherit',
    env: {
      ...process.env,
      CSC_IDENTITY_AUTO_DISCOVERY: 'false'
    }
  });

  console.log('✅ ¡Aplicación construida exitosamente!');
  console.log('📦 Archivos generados en: dist-electron/');

} catch (error) {
  console.error('❌ Error durante la construcción:', error.message);
  process.exit(1);
} 