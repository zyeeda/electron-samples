/* @flow */
global.jQuery = require('jquery');
require('bootstrap');

require("!style!css!less!./../../../node_modules/bootstrap/less/bootstrap.less");

const React          = require('react'),
      ReactBootstrap = require('react-bootstrap'),
      Product        = require('./product'),
      myEventMmiter  = require('./../eventemmiter/product-event-emmiter'),
      productStore   = require('./../store/product-store'),

      Table = ReactBootstrap.Table;

class ProductTable extends React.Component {
    constructor(props){
        super(props);
        this.state = {filterText: '', products: []};
    }
    bindEventEmmiterLister(){
        // 过滤列表数据
        myEventMmiter.on('filterTable', (filterText) =>
            this.setState({
                filterText: filterText
            })
        )

        // 重新设定处于编辑状态的数据
        myEventMmiter.on('resetEditStatus', (product) =>
            this.setState({
                editProduct: product
            })
        )

        // 清除数据的编辑状态
        myEventMmiter.on('clearEditStatus', () =>
            this.setState({
                editProduct: null
            })
        )

        // // 刷新列表数据
        // myEventMmiter.on('refreshTable', (product) =>
        //     this.refreshProducts.apply(this)
        // )
    }
    componentWillMount(){
        // 监听其它模块定义的操作事件
        this.bindEventEmmiterLister.apply(this);

        // 监听数据变化的事件
        productStore.addChangeListener(this.refreshProducts.bind(this));
    }
    componentWillUnmount() {
        this.removeChangeListener(this.refreshProducts.bind(this));
    }
    refreshProducts(){
        this.setState({products: productStore.getAllProducts(), editProduct: null});
    }
    render(){
        let [productRows, j, isEdit] = [[], 1, false];

        this.state.products.forEach((product) => {
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

ProductTable.defaultProps = { url: '/product' };

module.exports = ProductTable;
