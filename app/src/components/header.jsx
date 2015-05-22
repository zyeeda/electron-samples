/* @flow */
global.jQuery = require('jquery');
require('bootstrap');

require("!style!css!less!./../../../node_modules/bootstrap/less/bootstrap.less");

require("!style!css!less!./../../../node_modules/font-awesome/less/font-awesome.less");

import React                  from 'react';
import {Button, ModalTrigger} from 'react-bootstrap';
import ProductFormModal       from './product-form-modal';

class Header extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <ModalTrigger modal={<ProductFormModal />}>
        <Button className="pull-right" bsStyle='success'><i className="fa fa-plus"></i>  新增产品</Button>
      </ModalTrigger>
    );
  }
}

export default Header;
