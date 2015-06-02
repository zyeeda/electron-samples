/* @flow */

import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import ProductForm from './product-form.react';

class ProductFormModal extends React.Component {
  render(): any {
    return (
      <Modal
        bsStyle="primary"
        title="新增产品"
        onRequestHide={this.props.onRequestHide}>
        <div className="modal-body">
          <ProductForm ref="productForm" />
        </div>
        <div className="modal-footer">
          <Button onClick={this.props.onRequestHide}><i className="fa fa-times"></i>  关闭</Button>
          <Button bsStyle="primary" onClick={this.handleFormSubmit.bind(this)}><i className="fa fa-check"></i>  确定</Button>
        </div>
      </Modal>
    );
  }

  handleFormSubmit(): void {
    // 调用表单的提交方法提交数据
    this.refs.productForm.handleFormSubmit();

    // 关闭 Modal
    this.props.onRequestHide();
  }
}

ProductFormModal.propTypes = {
  onRequestHide: React.PropTypes.func
};

ProductFormModal.contextTypes = {
  onRequestHide: React.PropTypes.func
};

export default ProductFormModal;
