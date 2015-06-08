import EventEmitter from 'events';
import path from 'path';
import CSON from 'season';
import Menu from 'menu';
import _ from 'lodash';

export default class ApplicationMenu extends EventEmitter {
  constructor(application) {
    super();

    this.log = application.log.child();

    let menuConfigFilePath = CSON.resolve(path.join(__dirname, '..', 'assets', 'menus', `${process.platform}`));
    this.log.info({menuConfigFilePath}, 'menu template file path:');
    let template = CSON.readFileSync(menuConfigFilePath);
    this.log.debug({template}, 'original template:');

    this.template = this.translateTemplate(template.menu, application.pkgInfo);
  }

  translateTemplate(template, pkgInfo) {
    template.forEach((item) => {
      if (!item.metadata) item.metadata = {};

      if (item.label) item.label = (_.template(item.label))(pkgInfo);
      if (item.command) item.click = () => this.emit(item.command);
      if (item.submenu) this.translateTemplate(item.submenu, pkgInfo);
    });

    this.log.debug({template}, 'translated template:');
    return template;
  }

  attachToWindow() {
    this.menu = Menu.buildFromTemplate(_.cloneDeep(this.template));
    Menu.setApplicationMenu(this.menu);
  }
}
