/* @flow */

import React           from 'react';
import {Button, Modal} from 'react-bootstrap';
import productAction   from './../actions/product-action';

class ProductModal extends React.Component {
    constructor(props: any, context: any): void {
        super(props, context);
    }
    doDelete(): void {
        let product = this.props.product;

        // 关闭 Modal
        this.props.onRequestHide();

        this.context.executeAction(productAction, {id: product.id, actionType: 'DELETE'});
    }
    render(): any {
        return (
            <Modal title = '请确定' onRequestHide = {this.props.onRequestHide} >
                <div className = 'modal-body' >
                    确定要删除此记录吗 ？
                </div>
                <div className = 'modal-footer' >
                    <Button onClick = {this.props.onRequestHide} ><i className="fa fa-times"></i> 取消 </Button>
                    <Button bsStyle='danger' onClick = {this.doDelete.bind(this)} ><i className="fa fa-check"></i> 确定 </Button>
                </div>
            </Modal>
        );
    }
}

ProductModal.contextTypes = {
    executeAction: React.PropTypes.func,
    onRequestHide: React.PropTypes.func
};

export default ProductModal;
