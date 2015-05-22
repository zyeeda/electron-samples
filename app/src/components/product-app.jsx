/* @flow */

global.jQuery = require('jquery');
require('bootstrap');

require("!style!css!less!./../../../node_modules/bootstrap/less/bootstrap.less");

import React        from 'react';
import {PageHeader} from 'react-bootstrap';
import Header       from './header';
import SearchBar    from './search-bar';
import ProductTable from './product-table';
import ProductStore from './../store/product-store';

import {connectToStores, provideContext} from 'fluxible/addons';

class ProductApp extends React.Component {
  constructor(props: any): void {
    super(props);
  }
  render(): any {
    return (
      <div className="container">
        <PageHeader>产品
          <Header />
        </PageHeader>
        <SearchBar />
        <br/>
        <ProductTable
          products = {this.props.producAppState.products} />
      </div>
    );
  }
}

ProductApp = connectToStores(ProductApp, [ProductStore], function (stores: any, props: any): any {
  return {
    producAppState: stores.ProductStore.getState()
  };
});

ProductApp = provideContext(ProductApp);

ProductApp.contextTypes = {
  getStore: React.PropTypes.func,
  executeAction: React.PropTypes.func,
  producAppState: React.PropTypes.object
};

export default ProductApp;
