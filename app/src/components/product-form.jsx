/* @flow */
global.jQuery = require('jquery');
require('bootstrap');

require("!style!css!less!./../../../node_modules/bootstrap/less/bootstrap.less");

const React          = require('react'),
      ReactBootstrap = require('react-bootstrap'),
      productAction  = require('./../actions/product-action'),
      uuidGenerator  = require('./../tools/uuid-generator'),

      Grid         = ReactBootstrap.Grid,
      Row          = ReactBootstrap.Row,
      Col          = ReactBootstrap.Col,
      Input        = ReactBootstrap.Input;

class ProductForm extends React.Component {
    constructor(props){
        super(props);
    }
    handleFormSubmit(){
        let product = {
            id: uuidGenerator.uuid(),
            name: this.refs.name.getValue(),
            model: this.refs.model.getValue(),
            status: this.refs.status.getValue(),
        };

        productAction.create(product);
    }
    render(){
        return (
            <Grid fluid={true}>
                <Row className='show-grid'>
                    <Col xs={6}>
                        <Input
                            type='text'
                            placeholder='输入产品名称'
                            label='产品名称'
                            hasFeedback
                            ref='name'
                            groupClassName='group-class'
                            wrapperClassName='wrapper-class'
                            labelClassName='label-class'/>
                    </Col>
                    <Col xs={6}>
                        <Input
                            type='text'
                            placeholder='输入产品型号'
                            label='产品型号'
                            hasFeedback
                            ref='model'
                            groupClassName='group-class'
                            wrapperClassName='wrapper-class'
                            labelClassName='label-class'/>
                    </Col>
                </Row>
                <Row className='show-grid' style={{'margin-top': 10}}>
                    <Col xs={12}>
                        <Input type='select' label='状态' placeholder='选择状态' ref='status'>
                            <option value="init">初始</option>
                            <option value="using">使用中</option>
                            <option value="scrapped">已报废</option>
                        </Input>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

ProductForm.defaultProps = { url: '/product' };

module.exports = ProductForm;
