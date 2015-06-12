export default function requireMain(mainPath) {
  try {
    require(mainPath);
  } catch (error) {
    let currentWindow = require('remote').getCurrentWindow();
    currentWindow.setSize(800, 600);
    currentWindow.center();
    currentWindow.show();
    currentWindow.openDevTools();

    console.error(error.stack || error); // eslint-disable-line no-console
  }
}
