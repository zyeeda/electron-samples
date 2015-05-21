/* @flow */
global.jQuery = require('jquery');
require('bootstrap');

require("!style!css!less!./../../../node_modules/bootstrap/less/bootstrap.less");

require("!style!css!less!./../../../node_modules/font-awesome/less/font-awesome.less");

const React          = require('react'),
      ReactBootstrap = require('react-bootstrap'),
      productAction  = require('./../actions/product-action'),

      Button = ReactBootstrap.Button,
      Modal  = ReactBootstrap.Modal;

class ProductModal extends React.Component {
    constructor(props){
        super(props);
    }
    doDelete(){
        let product = this.props.product;

        // 关闭 Modal
        this.props.onRequestHide();

        productAction.delete(product.id);
    }
    render(){
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

ProductModal.defaultProps = { url: '/product-del' };

module.exports = ProductModal;
