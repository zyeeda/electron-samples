/* @flow */

global.jQuery = require('jquery');
require('bootstrap');

import React from 'react';
import Fluxible from 'fluxible';
import ProductApp from './components/product-app.react';
import ProductStore from './store/product-store';

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
