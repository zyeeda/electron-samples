/* @flow */
global.jQuery = require('jquery');
require('bootstrap');

require("!style!css!less!./../../../node_modules/bootstrap/less/bootstrap.less");

const React          = require('react'),
      ReactBootstrap = require('react-bootstrap'),
      Header         = require('./header'),
      SearchBar      = require('./search-bar'),
      ProductTable   = require('./product-table'),

      PageHeader     = ReactBootstrap.PageHeader;

class ProductBox extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className="container">
        <PageHeader>产品
          <Header />
        </PageHeader>
        <SearchBar />
        <br/>
        <ProductTable />
      </div>
    );
  }
}

module.exports = ProductBox;
