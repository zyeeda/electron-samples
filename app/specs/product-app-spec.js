import React from 'react/addons';
const {TestUtils} = React.addons;
import Fluxible from 'fluxible';
require('./jasmine-matchers');

import ProductApp from '../renderer/components/product-app.react';
import ProductStore from '../renderer/store/product-store';

describe('Product App', () => {
  let fluxibleApp = new Fluxible({
    component: ProductApp,
    stores: [ProductStore]
  });
  let main;

  beforeEach(() => {
    main = TestUtils.renderIntoDocument(fluxibleApp.createContext().createElement());
  });

  it('应该渲染一个"产品"标题', () => {
    let mainDom = React.findDOMNode(main);
    expect(mainDom.querySelector('.page-header > h1 > span').textContent.trim()).toEqual('产品');
  });
});
