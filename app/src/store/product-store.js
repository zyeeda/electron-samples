/* @flow */

import Immutable   from 'immutable';
import {BaseStore} from 'fluxible/addons';

class ProductStore extends BaseStore {
    constructor(dispatcher: any): void {
        super(dispatcher);
        this.products = Immutable.Map({});
    }
    createProduct(payload: any): void{
        this.products = this.products.set(payload.product.id, payload.product);
        this.emitChange();
    }
    updateProduct(payload: any): void {
        this.products = this.products.set(payload.product.id, payload.product);
        this.emitChange();
    }
    deleteProduct(payload: any): void {
        this.products = this.products.remove(payload.id);
        this.emitChange();
    }
    getState(): any {
        return {
            products: this.products
        };
    }
}

ProductStore.storeName = 'ProductStore'; // PR open in dispatchr to remove this need
ProductStore.handlers = {
    'CREATE': 'createProduct',
    'UPDATE': 'updateProduct',
    'DELETE': 'deleteProduct'
};

export default ProductStore;
