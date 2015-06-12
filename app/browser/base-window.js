// import path from 'path';
import url from 'url';
import EventEmitter from 'events';
import BrowserWindow from 'browser-window';

export default class BaseWindow extends EventEmitter {
  constructor(application) {
    super();

    this.log = application.log.child();

    this.settings = {
      devMode: application.devMode,
      testMode: application.testMode
    };

    this.window = new BrowserWindow({
      width: 800,
      height: 600,
      title: application.pkgInfo.productName || application.pkgInfo.name,
      'use-content-size': true,
      center: true,
      'web-preferences': {
        'subpixel-font-scaling': true,
        'direct-write': true
      }
    });

    this.window.on('closed', (e) => this.emit('closed', e));
    // this.window.on('devtools-opened', () => this.window.webContents.send('window:toggle-dev-tools', true));
    // this.window.on('devtools-closed', () => this.window.webContents.send('window:toogle-dev-tools', false));
  }

  show() {
    /*let targetPath = path.resolve(__dirname, '..', 'index.html');

    let targetUrl = url.format({
      protocol: 'file',
      pathname: targetPath,
      slashes: true,
      query: {settings: JSON.stringify(this.settings)}
    });*/
    let targetUrl = url.format({
      protocol: 'file',
      pathname: this.targetPath,
      slashes: true
    });

    this.log.info({targetUrl}, 'target url opened by browser window:');

    this.window.loadUrl(targetUrl);
    this.window.show();
  }

  reload() {
    this.window.webContents.reload();
  }

  toggleFullScreen() {
    this.window.setFullScreen(!this.window.isFullScreen());
  }

  toggleDevTools() {
    this.window.toggleDevTools();
  }

  close() {
    this.window.close();
    this.window = null;
  }
}

