/* @flow */

const ProductDispather  = require('./../dispatchers/product-dispatcher'),
      Immutable         = require('immutable'),
      EventEmitter      = require('events').EventEmitter,
      util              = require('util'),
      CHANGE_EVENT      = 'change';

class ProductStore extends EventEmitter {
    constructor(products) {
        super();

        this.products = products;
    }
    createProduct(product){
        this.products = this.products.set(product.id, product);
        this.emit(CHANGE_EVENT);
    }
    updateProduct(product){
        this.products = this.products.set(product.id, product);
        this.emit(CHANGE_EVENT);
    }
    deleteProduct(id){
        this.products = this.products.remove(id);
        this.emit(CHANGE_EVENT);
    }
    getAllProducts(){
        return this.products;
    }
    addChangeListener(callback){
        this.on(CHANGE_EVENT, callback);
    }
    removeChangeListener(callback){
        this.removeListener(CHANGE_EVENT, callback);
    }
}

module.exports = new ProductStore(
    Immutable.Map({})
);
