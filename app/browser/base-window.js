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
  }

  show() {
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

