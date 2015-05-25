/* @flow */

import React         from 'react';
import {Table}       from 'react-bootstrap';
import _             from 'lodash';
import Product       from './product';
import myEventMmiter from './../eventemmiter/product-event-emmiter';

class ProductTable extends React.Component {
    constructor(props: any): void {
        super(props);

        this.state = {filterText: ''};
    }
    bindEventEmmiterLister(): void {
        // 过滤列表数据
        myEventMmiter.on('filterTable', (filterText: string) => : void
            this.setState({
                filterText: filterText
            })
        )

        // 重新设定处于编辑状态的数据
        myEventMmiter.on('resetEditStatus', (product: any) => : void {
            this.setState({
                editProduct: product
            });
        })

        // 清除数据的编辑状态
        myEventMmiter.on('clearEditStatus', () => : void
            this.setState({
                editProduct: null
            })
        )
    }
    componentWillMount(): void {
        this.bindEventEmmiterLister.apply(this);
    }
    componentWillUnmount(): void {
        // 删除 eventemmiter 监听的事件
        myEventMmiter.removeListener('filterTable');
        myEventMmiter.removeListener('resetEditStatus');
        myEventMmiter.removeListener('clearEditStatus');
    }
    render(): any {
        let [productRows, j, isEdit] = [[], 1, false];

        this.props.products.forEach((product) => {
            if (_.trim(this.state.filterText) === '' || (_.trim(this.state.filterText) !== '' && (product.name.indexOf(_.trim(this.state.filterText)) !== -1 || product.model.indexOf(_.trim(this.state.filterText)) !== -1))){

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

ProductTable.contextTypes = {
  products: React.PropTypes.array
};

export default ProductTable;
