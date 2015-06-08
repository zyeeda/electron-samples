import createLogger from './browser/logger';

window.onload = function _onload() {
  try {
    // skip "?settings=" query string
    let settings = JSON.parse(decodeURIComponent(location.search.substr(10)));
    let log = createLogger(settings);
    log.info({settings}, 'settings collected from browser process:');

    window.settings = settings;
    require(settings.bootstrapScript);
    require('ipc').send('window-command', 'window:loaded');
  } catch (error) {
    let currentWindow = require('remote').getCurrentWindow();
    currentWindow.setSize(800, 600);
    currentWindow.center();
    currentWindow.show();
    currentWindow.openDevTools();

    console.error(error.stack || error); // eslint-disable-line no-console
  }
};
