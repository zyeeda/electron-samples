/* @flow */

import React from 'react';
import {PageHeader, Button, ModalTrigger} from 'react-bootstrap';
import ProductFormModal from './product-form-modal.react';

class Header extends React.Component {
  render(): any {
    return (
      <PageHeader>
        产品
        <ModalTrigger modal={<ProductFormModal />}>
          <Button className="pull-right" bsStyle="success"><i className="fa fa-plus"></i>  新增产品</Button>
        </ModalTrigger>
      </PageHeader>
    );
  }
}

export default Header;
