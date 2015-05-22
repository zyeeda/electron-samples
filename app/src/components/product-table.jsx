/* @flow */
global.jQuery = require('jquery');
require('bootstrap');

require("!style!css!less!./../../../node_modules/bootstrap/less/bootstrap.less");

import React         from 'react';
import {Table}       from 'react-bootstrap';
import Product       from './product';
import myEventMmiter from './../eventemmiter/product-event-emmiter';

class ProductTable extends React.Component {
    constructor(props){
        super(props);

        this.state = {filterText: ''};
    }
    bindEventEmmiterLister(){
        // 过滤列表数据
        myEventMmiter.on('filterTable', (filterText) =>
            this.setState({
                filterText: filterText
            })
        )

        // 重新设定处于编辑状态的数据
        myEventMmiter.on('resetEditStatus', (product) => {
            this.setState({
                editProduct: product
            });
        })

        // 清除数据的编辑状态
        myEventMmiter.on('clearEditStatus', () =>
            this.setState({
                editProduct: null
            })
        )
    }
    componentWillMount(){
        this.bindEventEmmiterLister.apply(this);
    }
    render(){
        let [productRows, j, isEdit] = [[], 1, false];

        this.props.products.forEach((product) => {
            if (this.state.filterText.trim() === '' || (this.state.filterText.trim() !== '' && (product.name.indexOf(this.state.filterText) !== -1 || product.model.indexOf(this.state.filterText) !== -1))){

                if(this.state.editProduct && this.state.editProduct.id === product.id){
                    isEdit = true;
                }else{
                    isEdit = false;
                }

                productRows.push(<Product isEdit={isEdit} product={product} index={j++} />);
            }
        });

        return (
            <Table striped condensed hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>产品名称</th>
                        <th>产品型号</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {productRows}
                </tbody>
            </Table>
        );
    }
}

export default ProductTable;
