const { app, BrowserWindow,ipcMain  } = require('electron');
const path = require('path');
const isDev = (...args) =>
  import('electron-is-dev').then(({ default: fetch }) => fetch(...args));
  const { enable } = require('electron-drag');
let mainWindow;
const { dirname } = require('path');
const currentDir = dirname(__filename);
const {
  startWindowFocusListener,
  captureAndSaveScreenshot,
} = require('./windowFocusListener');
const activeWin = require('active-win');

function createWindow() {
  const { width, height } =
    require('electron').screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    width: 500,
    height: 400,
    x: width - 550,
    y: height - 450,
    frame: false,
    alwaysOnTop: true,
    transparent: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true, // Enable context isolation
    },
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  function enableWindowDragging(window) {
    let offsetX = 0;
    let offsetY = 0;
    let isDragging = false;
  
    window.on('move', () => {
      isDragging = true;
    });
  
    window.on('resize', () => {
      isDragging = false;
    });
  
    window.on('moved', (event, newPosition) => {
      if (isDragging && newPosition && newPosition.length >= 2) {
        offsetX = window.getPosition()[0] - newPosition[0];
        offsetY = window.getPosition()[1] - newPosition[1];
        console.log('OffsetX:', offsetX, 'OffsetY:', offsetY);
      }
    });
  
    window.on('mousemove', (event) => {
      if (isDragging) {
        const { screenX, screenY } = event;
        window.setPosition(screenX - offsetX, screenY - offsetY);
        console.log('Dragging at:', screenX - offsetX, screenY - offsetY);
      }
    });
  }
  
  enableWindowDragging(mainWindow);

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(currentDir, '../build/index.html')}`
  );
}
async function checkWindowSwitch() {
  try {
    const { title } = await activeWin();
    console.log('Active window title:', title);
    captureAndSaveScreenshot();
  } catch (error) {
    console.error('Error capturing screenshot:', error);
  }
}
app.whenReady().then(() => {
  createWindow();
  startWindowFocusListener();
  setInterval(checkWindowSwitch, 5000); // Check every 5 seconds
});
app.on('window-focus-changed', (event, focused) => {
  if (focused) {
    captureAndSaveScreenshot();
  }
});
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
ipcMain.on('close-window', () => {
  console.log('Received close-window message');
  if (mainWindow) {
      mainWindow.close();
  }
});