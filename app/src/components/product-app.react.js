/* @flow */

import React from 'react';
import Header from './header.react';
import SearchBar from './search-bar.react';
import ProductTable from './product-table.react';
import ProductStore from '../store/product-store';

import {connectToStores, provideContext} from 'fluxible/addons';

class ProductApp extends React.Component {
  render(): any {
    return (
      <div className="container">
        <Header />
        <SearchBar />
        <br />
        <ProductTable
          products={this.props.productAppState.products} />
      </div>
    );
  }
}

ProductApp = connectToStores(ProductApp, [ProductStore], function getStateFromStores(stores: any): any {
  return {
    productAppState: stores.ProductStore.getState()
  };
});

ProductApp = provideContext(ProductApp);

ProductApp.propTypes = {
  productAppState: React.PropTypes.object
};

ProductApp.contextTypes = {
  getStore: React.PropTypes.func,
  executeAction: React.PropTypes.func,
  productAppState: React.PropTypes.object
};

export default ProductApp;
