const { spawn } = require('child_process');
const { createServer } = require('vite');
const electron = require('electron');
const path = require('path');

async function startDev() {
  console.log('🚀 Iniciando desarrollo con Electron...');
  
  // Iniciar servidor de desarrollo de Vite
  const server = await createServer({
    configFile: path.resolve(__dirname, '../vite.config.js'),
    mode: 'development'
  });
  
  await server.listen(5173);
  console.log('✅ Servidor de desarrollo iniciado en http://localhost:5173');
  
  // Iniciar Electron
  const electronProcess = spawn(electron, [path.resolve(__dirname, '../electron.js')], {
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_ENV: 'development'
    }
  });
  
  electronProcess.on('close', () => {
    console.log('👋 Cerrando aplicación...');
    server.close();
    process.exit();
  });
  
  // Manejar señales de terminación
  process.on('SIGINT', () => {
    electronProcess.kill();
    server.close();
    process.exit();
  });
  
  process.on('SIGTERM', () => {
    electronProcess.kill();
    server.close();
    process.exit();
  });
}

startDev().catch(console.error); 