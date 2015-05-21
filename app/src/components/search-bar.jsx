/* @flow */
global.jQuery = require('jquery');
require('bootstrap');

require("!style!css!less!./../../../node_modules/bootstrap/less/bootstrap.less");

const React          = require('react'),
      ReactBootstrap = require('react-bootstrap'),
      myEventMmiter  = require('./../eventemmiter/product-event-emmiter'),

      Grid      = ReactBootstrap.Grid,
      Row       = ReactBootstrap.Row,
      Col       = ReactBootstrap.Col,
      Input     = ReactBootstrap.Input,
      Glyphicon = ReactBootstrap.Glyphicon;

class SearchBar extends React.Component {
  constructor(props){
    super(props);
  }
  handleSearch(){
    myEventMmiter.searchIptChange(this.refs.searchIpt.getValue());
  }
  render(){
    let innerGlyphicon = <Glyphicon glyph='search' />;

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
              addonAfter={innerGlyphicon}
              onChange={this.handleSearch.bind(this)}/>
          </Col>
        </Row>
      </Grid>
    );
  }
}

module.exports = SearchBar;
