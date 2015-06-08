import app from 'app';
import EventEmitter from 'events';
import BrowserWindow from 'browser-window';
import createLogger from './logger';
import ApplicationWindow from './application-window';
import ApplicationMenu from './application-menu';

export default class Application extends EventEmitter {
  /**
   * options -
   *    : dev
   *    : test
   *    : logLevel
   *    : logFile
   */
  constructor(options) {
    super();

    let {devMode, testMode, logLevel, logFile} = options;
    this.devMode = devMode;
    this.testMode = testMode;
    this.logLevel = logLevel;
    this.logFile = logFile;

    this.log = createLogger(options);
    this.pkgInfo = require('../../package.json');
    this.windows = [];

    /*app.on('will-quit', (e) => {
      e.preventDefault();
    });*/

    /*app.on('window-all-closed', () => {
      this.log.info('process.platform is %s', process.platform);
      if (process.platform !== 'darwin') app.quit();
    });*/
    app.on('window-all-closed', () => {
      app.quit();
    });

    this.openWindow();
  }

  openWindow(forceUseTestMode = false) {
    let openWindowMethod = forceUseTestMode ? this.openSpecsWindow : this.openAppWindow;
    let newWindow = openWindowMethod.bind(this)();
    newWindow.show();
    this.windows.push(newWindow);
    newWindow.on('closed', () => this.removeAppWindow(newWindow));
  }

  openSpecsWindow() {
    this.log('Open specs window.');
  }

  openAppWindow() {
    let appWindow = new ApplicationWindow(this);

    this.appMenu = new ApplicationMenu(this);
    this.appMenu.attachToWindow(appWindow);

    this.appMenu.on('application:quit', () => app.quit());

    this.appMenu.on('window:reload', () => BrowserWindow.getFocusedWindow().reload());

    this.appMenu.on('window:toggle-full-screen', () => {
      let focusedWindow = BrowserWindow.getFocusedWindow();
      focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
    });

    this.appMenu.on('window:toggle-dev-tools', () => BrowserWindow.getFocusedWindow().toggleDevTools());

    this.appMenu.on('application:run-specs', () => this.openWindow({forceUseTestMode: true}));

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

