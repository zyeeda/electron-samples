import fs from 'fs-plus';

let application = require('remote').getGlobal('application');

if (application.testMode) {
  let Jasmine = require('jasmine');
  let jasmine = new Jasmine();
  jasmine.configureDefaultReporter({
    showColors: true
  });

  fs.listTreeSync(__dirname)
    .filter((specFile) => /-spec\.js$/.test(specFile))
    .forEach((specFile) => jasmine.addSpecFile(specFile));

  jasmine.onComplete(() => require('remote').require('app').quit());
  jasmine.execute();
} else {
  let link = document.createElement('link');
  link.rel = 'stylesheet';
  // this link path is relative to `index.js`
  link.href = '../vendors/jasmine/lib/jasmine-2.3.4/jasmine.css';
  document.head.appendChild(link);

  // all these require paths are relateive to the current file path
  window.jasmineRequire = require('../vendors/jasmine/lib/jasmine-2.3.4/jasmine');
  require('../vendors/jasmine/lib/jasmine-2.3.4/jasmine-html');
  require('../vendors/jasmine/lib/jasmine-2.3.4/boot');

  fs.listTreeSync(__dirname)
    .filter((specFile) => /-spec\.js$/.test(specFile))
    .forEach((specFile) => require(specFile));

  window.jasmineExecute();
}
