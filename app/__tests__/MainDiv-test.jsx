//jest.dontMock('../MainDiv.jsx');
describe('MainDiv', function() {
  it('does stuff', function() {
    var React = require('react/addons');
    var MainDiv = require('../src/sample/react/sample-react.js');
    var TestUtils = React.addons.TestUtils;

    var main = TestUtils.renderIntoDocument(
      <MainDiv name="world"/>
      //React.createElement(MainDiv, {name: 'world'})
    );

    var div = TestUtils.findRenderedDOMComponentWithTag(main, 'div');
    expect(main.getDOMNode().textContent).toEqual('Hello, world!');
  });
});
