console.log('hello world');

const React = require('react/addons');
const TestUtils = React.addons.TestUtils;
import Header from '../src/components/header';

describe('Header', function _describe() {
  let header;

  beforeEach(function _beforeEach() {
    header = TestUtils.renderIntoDocument(<Header />);
  });

  it('应该显示“产品”标题和“新增产品”按钮', function test() {
    expect(header).toExist();
    expect($j(React.findDOMNode(header)).find('h1').find('span')[0].textContent).toEqual('产品');
    expect($j(React.findDOMNode(header)).find('button').find('span')[0].textContent).toEqual('新增产品');
  });
});
