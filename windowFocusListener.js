const { exec,execSync } = require('child_process');
const { app, BrowserWindow } = require('electron');
const fs = require('fs').promises;
const path = require('path');
const screenshot = require('screenshot-desktop');

// Function to capture a screenshot and save it
async function captureAndSaveScreenshot() {
    try {
        const img = await screenshot();
        const userDataPath = app.getPath('userData');
        const filePath = path.join(userDataPath, `screenshot_${Date.now()}.png`);
        await fs.writeFile(filePath, img);
        console.log('Screenshot saved:', filePath);
    } catch (err) {
        console.error('Failed to save screenshot:', err);
    }
}

function getCurrentActiveWindowTitle() {
    try {
        const result = execSync('wmic path Win32_Process get Caption').toString();
        const titles = result.split('\r\r\n').filter(title => title.trim() !== '');
        return titles[0]; // Assuming the first title is the active window
    } catch (error) {
        console.error('Error getting active window title:', error);
        return null;
    }
}

function startWindowFocusListener() {
    exec('node_modules\\.bin\\windows-window-focus-listener', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing window focus listener: ${error}`);
            return;
        }
        console.log(`Window focus listener stdout: ${stdout}`);
        console.error(`Window focus listener stderr: ${stderr}`);
    });

    // When a window focus change event is detected, capture and save a screenshot
    process.on('focus-change', () => {
        captureAndSaveScreenshot();
    });
}

module.exports = { startWindowFocusListener,captureAndSaveScreenshot };
