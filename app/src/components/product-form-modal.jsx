/* @flow */
global.jQuery = require('jquery');
require('bootstrap');

require("!style!css!less!./../../../node_modules/bootstrap/less/bootstrap.less");

require("!style!css!less!./../../../node_modules/font-awesome/less/font-awesome.less");

const React          = require('react'),
      ReactBootstrap = require('react-bootstrap'),
      ProductForm    = require('./product-form'),

      Button = ReactBootstrap.Button,
      Modal  = ReactBootstrap.Modal;

class ProductFormModal extends React.Component {
  constructor(props){
    super(props);
  }
  handleFormSubmit(){
    // 调用表单的提交方法提交数据
    this.refs.productForm.handleFormSubmit();

    // 关闭 Modal
    this.props.onRequestHide();
  }
  render(){
    return (
      <Modal
        bsStyle = 'primary'
        title = '新增产品'
        onRequestHide={this.props.onRequestHide} >
        <div className = 'modal-body' >
          <ProductForm ref="productForm" />
        </div>
        <div className = 'modal-footer' >
          <Button onClick={this.props.onRequestHide} ><i className="fa fa-times"></i> 关闭 </Button>
          <Button bsStyle='primary' onClick={this.handleFormSubmit.bind(this)} ><i className="fa fa-check"></i> 确定 </Button>
        </div>
      </Modal>
    );
  }
}

module.exports = ProductFormModal;
