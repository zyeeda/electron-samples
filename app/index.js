/* @flow */
require("!style!css!sass!./src/common/main.scss");

import React from 'react';
import Fluxible from 'fluxible';
import ProductBox from './src/components/product-box';
import ProductStore from './src/store/product-store';

// 为所有字符串对象添加去前后空格函数
String.prototype.trim = function(){
    return this.replace(/(^\s*)|(\s*$)/g, "");
};

let ProductApp = new Fluxible({
    component: ProductBox,
    stores: [
      ProductStore
    ]
});

React.render(
  ProductApp.createContext().createElement(),
  document.getElementById('container')
);
