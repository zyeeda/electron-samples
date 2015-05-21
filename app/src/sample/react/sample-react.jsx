var React = require('react');

var lt8k = require('../../../assets/images/sample/react/lt-8k.png');

var gt8k = require('../../../assets/images/sample/react/gt-8k.png');

var MainDiv = React.createClass({
  render: function() {
    return <div className="sample-react-css">Hello, {this.props.name}!
        <img src={lt8k} />
        <img src={gt8k} />
        <button type="button" className="btn btn-danger">Action</button>
    </div>;
  }
});

module.exports = MainDiv;
