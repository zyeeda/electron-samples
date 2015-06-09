import bunyan from 'bunyan';
import path from 'path';
import fs from 'fs-plus';

const {name} = require('../../package.json');

export default function createLogger({devMode = false, logLevel}) {
  let defaultLogLevel = logLevel || (devMode ? 'debug' : 'info');

  let streams = [];
  if (devMode) {
    streams.push({
      stream: process.stdout,
      level: defaultLogLevel,
      src: true
    });
  } else {
    let logFile;
    switch (process.platform) {
      case 'darwin':
        logFile = path.join(fs.getHomeDirectory(), 'Library', 'Logs', 'Electron Samples');
        break;
      case 'linux':
        logFile = '/var/logs/electron-samples';
        break;
      case 'win32':
        logFile = path.join(process.env.LOCALAPPDATA, 'logs');
        break;
      default:
        logFile = './logs';
        break;
    }
    logFile = path.join(logFile, 'log.txt');

    if (!fs.existsSync(logFile)) fs.writeFileSync(logFile);

    streams.push({
      type: 'rotating-file',
      path: logFile,
      period: '1d', // daily rotation
      count: 15,
      level: defaultLogLevel
    });
  }

  let options = {
    name,
    streams
  };

  return bunyan.createLogger(options);
}
