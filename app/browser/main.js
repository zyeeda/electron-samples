require('babel/polyfill');

import app from 'app';
import createLogger from './logger';
import Application from './application';

global.shellStartTime = Date.now();

process.on('uncaughtException', ({message, stack}) => {
  if (message) process.stderr.write(message + '\n');
  if (stack) process.stderr.write(stack + '\n');
});

function parseCommandLine() {
  let yargs = require('yargs')
    .alias('h', 'help').boolean('h').describe('h', 'Print this usage message.')
    .alias('v', 'version').boolean('v').describe('v', 'Print the version.')
    .alias('d', 'dev-mode').boolean('d').describe('d', 'Run in development mode.')
    .alias('t', 'test-mode').boolean('t').describe('t', 'Run the specified specs and exit with error code on failures.')
    .alias('l', 'log-level').string('l').describe('l', 'Log all output in this level.')
    .alias('f', 'log-file').string('f').describe('f', 'Log all output to file.');

  let [, ...tail] = process.argv;
  let {
    help,
    version,
    'dev-mode': devMode,
    'test-mode': testMode,
    'log-level': logLevel,
    'log-file': logFile
  } = yargs.parse(tail);

  if (help) {
    yargs.showHelp('log');
    app.quit();
  }

  if (version) {
    process.stdout.write(`${app.getVersion()}\n`);
    app.quit();
  }

  return {devMode, testMode, logLevel, logFile};
}

function start() {
  let args = parseCommandLine();

  app.commandLine.appendSwitch('js-flags', '--harmony');
  if (args.devMode) app.commandLine.appendSwitch('remote-debugging-port', '8315');

  let log = createLogger(args);
  log.info({args}, 'command line args:');

  /**
   * Note: It's important that you don't do anything with Electron
   * unless it's after 'ready', or else mysterious bad things will happen
   * to you.
   */
  app.on('ready', () => {
    global.application = new Application(args);
    log.info(`application load time: ${Date.now() - global.shellStartTime}ms`);

    log.info({resourcesPath: process.resourcesPath}, 'process.resourcesPath:');
  });
}

start();
