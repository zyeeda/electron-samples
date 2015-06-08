import bunyan from 'bunyan';

const {name} = require('../../package.json');

export default function createLogger({devMode = false, logLevel, logFile}) {
  let defaultLogLevel = devMode ? 'debug' : 'info';
  if (logLevel) defaultLogLevel = logLevel;
  let options = {
    name,
    stream: process.stdout,
    level: defaultLogLevel,
    src: devMode
  };

  return bunyan.createLogger(options);
}
