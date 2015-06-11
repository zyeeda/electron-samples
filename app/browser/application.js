import app from 'app';
import EventEmitter from 'events';
import BrowserWindow from 'browser-window';
import createLogger from './logger';
import ApplicationWindow from './application-window';
import ApplicationMenu from './application-menu';

export default class Application extends EventEmitter {
  /**
   * options -
   *    : devMode
   *    : testMode
   *    : logLevel
   */
  constructor(options) {
    super();

    let {devMode, testMode, logLevel} = options;
    this.devMode = devMode;
    this.testMode = testMode;
    this.logLevel = logLevel;

    this.log = createLogger(options);
    this.pkgInfo = require('../../package.json');
    this.windows = [];

    app.on('window-all-closed', () => {
      app.quit();
    });

    this.openWindow(this.testMode);
  }

  openWindow(forceInTestMode = false) {
    let createWindowMethod = forceInTestMode ? this.createTestWindow : this.createAppWindow;
    let newWindow = createWindowMethod.bind(this)();
    newWindow.show();
    this.windows.push(newWindow);
    newWindow.on('closed', () => this.removeAppWindow(newWindow));
  }

  createTestWindow() {
    return new ApplicationWindow(this, require.resolve('../specs/main'));
  }

  createAppWindow() {
    let appWindow = new ApplicationWindow(this, require.resolve('../renderer/main'));

    this.appMenu = new ApplicationMenu(this);
    this.appMenu.attachToWindow(appWindow);

    this.appMenu.on('application:quit', () => app.quit());

    this.appMenu.on('window:reload', () => BrowserWindow.getFocusedWindow().reload());

    this.appMenu.on('window:toggle-full-screen', () => {
      let focusedWindow = BrowserWindow.getFocusedWindow();
      focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
    });

    this.appMenu.on('window:toggle-dev-tools', () => BrowserWindow.getFocusedWindow().toggleDevTools());

    this.appMenu.on('application:run-specs', () => this.openWindow(true));

    return appWindow;
  }

  removeAppWindow(appWindow) {
    this.log.info('window of id %s is closed', appWindow.window.id);
    this.log.info('count of opened windows before remove: %d', this.windows.length);
    this.windows.forEach((w, idx) => {
      if (w === appWindow) this.windows.splice(idx, 1);
    });
    this.log.info('count of opened windows after remove: %d', this.windows.length);
  }
}

