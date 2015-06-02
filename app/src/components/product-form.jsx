/* @flow */

import React                   from 'react';
import {Grid, Row, Col, Input} from 'react-bootstrap';
import productAction           from './../actions/product-action';
import uuid                    from 'uuid';

class ProductForm extends React.Component {
    constructor(props: any, context: any): void {
        super(props, context);
    }
    handleFormSubmit(): void {
        let product = {
            id: uuid.v1(),
            name: this.refs.name.getValue(),
            model: this.refs.model.getValue(),
            status: this.refs.status.getValue(),
        };

        this.context.executeAction(productAction, {product, actionType: 'CREATE'});
    }
    render(): any {
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

ProductForm.contextTypes = {
    executeAction: React.PropTypes.func
};

export default ProductForm;
