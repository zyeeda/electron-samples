const app = require('app');  // Module to control application life.
const BrowserWindow = require('browser-window');  // Module to create native browser window.
const path = require('path');

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
let mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function onAllWindowClosed() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// app.commandLine.appendSwitch('remote-debugging-port', '8315');
// app.commandLine.appendSwitch('host-rules', 'MAP * 127.0.0.1');

// This method will be called when atom-shell has done everything
// initialization and ready for creating browser windows.
app.on('ready', function onReady() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    'use-content-size': true,
    resizable: true
  });

  // and load the index.html of the app.
  mainWindow.loadUrl(path.normalize('file://' + path.join(__dirname, '..', 'index.html')));

  // Emitted when the window is closed.
  mainWindow.on('closed', function onClosed() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});

