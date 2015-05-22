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

class ProductBox extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
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

ProductBox = connectToStores(ProductBox, [ProductStore], function (stores, props) {
    return {
        producAppState: stores.ProductStore.getState()
    };
});

ProductBox = provideContext(ProductBox);

ProductBox.contextTypes = {
    getStore: React.PropTypes.func,
    executeAction: React.PropTypes.func
};

export default ProductBox;
