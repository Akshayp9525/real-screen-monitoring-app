
const { contextBridge, ipcRenderer } = require('electron');
console.log('Preload script loaded successfully');

contextBridge.exposeInMainWorld('api', {
    sendToMain: (channel, data) => {
        ipcRenderer.send(channel, data);
    },
    receiveFromMain: (channel, callback) => {
        ipcRenderer.on(channel, (event, ...args) => callback(...args));
    }
});

