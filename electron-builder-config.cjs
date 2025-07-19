module.exports = {
  appId: 'com.pomodoro.sanrio',
  productName: 'Pomodoro Sanrio',
  directories: {
    output: 'dist-electron'
  },
  files: [
    'dist/**/*',
    'electron.js',
    'electron-error-handler.js',
    'notifications.js',
    'data-manager.js',
    'preload.js',
    'public/**/*'
  ],
  win: {
    target: 'portable',
    signAndEditExecutable: false,
    requestedExecutionLevel: 'asInvoker'
  },
  mac: {
    target: 'dmg'
  },
  linux: {
    target: 'AppImage'
  },
  forceCodeSigning: false,
  publish: null,
  compression: 'normal',
  removePackageScripts: false,
  removePackageKeywords: false
}; 