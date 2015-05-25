/* @flow */

import React                              from 'react';
import {PageHeader, Button, ModalTrigger} from 'react-bootstrap';
import ProductFormModal                   from './product-form-modal';

/**
 * 头部组件, 结合 react-bootstrap 提供的组件生成页眉区域内容.
 */
class Header extends React.Component {

  /**
   * 构造函数
   * @param {object} props - react 组件内部存放由上层组件所传入参数的对象.
   */
  constructor(props: any): void {
    super(props);
  }

  /**
   * react 组件返回组件内容的基本函数.
   * @returns 组装成的一个 jsx 语法的页眉组件, 最终会被渲染成 html.
   */
  render(): any {
    return (
      <PageHeader>
        产品
        <ModalTrigger modal={<ProductFormModal />}>
          <Button className="pull-right" bsStyle='success'><i className="fa fa-plus"></i>  新增产品</Button>
        </ModalTrigger>
      </PageHeader>
    );
  }
}

export default Header;
