/* @flow */

import React                        from 'react';
import {Label, Input, ModalTrigger} from 'react-bootstrap';
import ProductModal                 from './product-modal';
import myEventMmiter                from './../eventemmiter/product-event-emmiter';
import productAction                from './../actions/product-action';

class Product extends React.Component {
    constructor(props: any, context: any): void {
        super(props, context);
    }
    handleEdit(): void {
        myEventMmiter.afterHandleEdit(this.props.product);
    }
    onToggerModal(): void {
        // 不做操作, 默认关闭 modal
    }
    doEdit(): void {
        let product = {
            id: this.props.product.id,
            name: this.refs.name.getValue(),
            model: this.refs.model.getValue(),
            status: this.refs.status.getValue(),
        };

        myEventMmiter.clearEditStatus();
        this.context.executeAction(productAction, {product, actionType: 'UPDATE'});
    }
    handleCancleDelete(): void {
        myEventMmiter.clearEditStatus();
    }
    render(): any {
        let [statusStyleMap, statusRenderMap] = [
        {
            init: 'info',
            using: 'success',
            scrapped: 'danger',
        },
        {
            init: '初始',
            using: '使用中',
            scrapped: '已报废',
        }];

        let [statusStyle, statusRenderText] = [statusStyleMap[this.props.product.status], statusRenderMap[this.props.product.status]];

        let productNameTdText = this.props.isEdit ?
                        <Input
                            type='text' placeholder='输入产品名称' hasFeedback
                            ref='name' groupClassName='group-class'
                            wrapperClassName='wrapper-class' labelClassName='label-class'
                            style={{width: 170}} defaultValue={this.props.product.name} />
                        :
                        this.props.product.name;

        let productModelTdText = this.props.isEdit ?
                        <Input
                            type='text' placeholder='输入产品型号' hasFeedback
                            ref='model' groupClassName='group-class'
                            wrapperClassName='wrapper-class' labelClassName='label-class'
                            style={{width: 170}} defaultValue={this.props.product.model} />
                        :
                        this.props.product.model;

        let productStatusTdText = this.props.isEdit ?
                        <Input
                            type='select' placeholder='选择状态' hasFeedback
                            ref='status' groupClassName='group-class'
                            style={{width: 170}}
                            defaultValue={this.props.product.status} >
                            <option value="init">初始</option>
                            <option value="using">使用中</option>
                            <option value="scrapped">已报废</option>
                        </Input>
                        :
                        <Label bsStyle={statusStyle}>{statusRenderText}</Label>;

        let operateBtnTdText = this.props.isEdit ?
                        <div>
                            <span className="inlineOperateBtn green" title="保存" onClick={this.doEdit.bind(this)}>
                                <i className="fa fa-check"></i>
                            </span>
                            &nbsp;&nbsp;&nbsp;
                            <span className="inlineOperateBtn red" title="取消" onClick={this.handleCancleDelete.bind(this)}>
                                <i className="fa fa-times"></i>
                            </span>
                        </div>
                        :
                        <div>
                            <span className="inlineOperateBtn green" title="编辑" onClick={this.handleEdit.bind(this)}>
                                <i className="fa fa-pencil"></i>
                            </span>
                            &nbsp;&nbsp;&nbsp;
                            <ModalTrigger modal={<ProductModal product={this.props.product} />}>
                                <span className="inlineOperateBtn red" title="删除" onClick={this.onToggerModal.bind(this)}>
                                    <i className="fa fa-trash"></i>
                                </span>
                            </ModalTrigger>
                        </div>;

        return (
            <tr id={this.props.product.id}>
                <td style={{'vertical-align': 'middle'}}>
                    {this.props.index}
                </td>
                <td>
                    {productNameTdText}
                </td>
                <td>
                    {productModelTdText}
                </td>
                <td>
                    {productStatusTdText}
                </td>
                <td style={{'vertical-align': 'middle'}}>
                    {operateBtnTdText}
                </td>
            </tr>
        );
    }
}

Product.contextTypes = {
    executeAction: React.PropTypes.func,
    product: React.PropTypes.object,
    isEdit: React.PropTypes.bool
};

export default Product;
