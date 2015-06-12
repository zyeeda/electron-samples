import path from 'path';
import BaseWindow from './base-window';

export default class ApplicationWindow extends BaseWindow {
  constructor(application) {
    super(application);

    this.window.on('devtools-opened', () => this.window.webContents.send('window:toggle-dev-tools', true));
    this.window.on('devtools-closed', () => this.window.webContents.send('window:toogle-dev-tools', false));

    this.targetPath = path.resolve(__dirname, '..', 'renderer', 'index.html');
    this.log.info({targetUrl: this.targetUrl}, 'application window will open target url:');
  }
}
