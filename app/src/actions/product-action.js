/* @flow */

const ProductDispather  = require('./../dispatchers/product-dispatcher'),
      ProductConstants  = require('./../constants/product-constants');

class ProductAction {
  create(product){
    ProductDispather.dispatch({
      actionType: ProductConstants.CREATE,
      product: product
    });
  }

  update(product){
    ProductDispather.dispatch({
      actionType: ProductConstants.UPDATE,
      product: product
    });
  }

  delete(id){
    ProductDispather.dispatch({
      actionType: ProductConstants.DELETE,
      id: id
    });
  }
}

module.exports = new ProductAction();
