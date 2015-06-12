import path from 'path';
import BaseWindow from './base-window';

export default class SpecWindow extends BaseWindow {
  constructor(application) {
    super(application);

    this.targetPath = path.resolve(__dirname, '..', 'specs', 'index.html');
    this.log.info({targetUrl: this.targetUrl}, 'spec window will open target url:');
  }
}
