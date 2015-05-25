/* @flow */

import React                              from 'react';
import {Grid, Row, Col, Input, Glyphicon} from 'react-bootstrap';
import myEventMmiter                      from './../eventemmiter/product-event-emmiter';

class SearchBar extends React.Component {
  constructor(props: any): void {
    super(props);
  }
  handleSearch(): void {
    myEventMmiter.searchIptChange(this.refs.searchIpt.getValue());
  }
  render(): any {
    return (
      <Grid fluid={true}>
        <Row className='show-grid'>
          <Col xs={6} md={3}>
            <Input
              type='text'
              placeholder='搜索产品名称与型号'
              hasFeedback
              ref='searchIpt'
              groupClassName='group-class'
              wrapperClassName='wrapper-class'
              labelClassName='label-class'
              addonAfter={<Glyphicon glyph='search' />}
              onChange={this.handleSearch.bind(this)}/>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default SearchBar;
