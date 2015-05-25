/* @flow */

global.jQuery = require('jquery');
require('bootstrap');

require("!style!css!less!./../node_modules/bootstrap/less/bootstrap.less");
require("!style!css!less!./../node_modules/font-awesome/less/font-awesome.less");
require("!style!css!sass!./src/common/main.scss");

import React from 'react';
import Fluxible from 'fluxible';
import ProductApp from './src/components/product-app';
import ProductStore from './src/store/product-store';

// 为所有字符串对象添加去前后空格函数
String.prototype.trim = function(){
    return this.replace(/(^\s*)|(\s*$)/g, "");
};

let fluxibleApp = new Fluxible({
    component: ProductApp,
    stores: [
      ProductStore
    ]
});

React.render(
  fluxibleApp.createContext().createElement(),
  document.getElementById('container')
);
