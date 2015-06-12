import React from 'react/addons';
const {TestUtils} = React.addons;
import Header from '../renderer/components/header.react';
require('./jasmine-matchers');

describe('Header', () => {
  let header;

  beforeEach(() => {
    header = TestUtils.renderIntoDocument(<Header />);
  });

  it('应该显示"产品"标题', () => {
    expect(header).toExist();
    let headerDom = React.findDOMNode(header);
    let span = headerDom.querySelector('h1 > span');
    expect(span.textContent).toEqual('产品');
  });

  it('应该显示"新增产品"按钮', () => {
    expect(header).toExist();
    let headerDom = React.findDOMNode(header);
    let span = headerDom.querySelector('button > span');
    expect(span.textContent.trim()).toEqual('新增产品');
  });
});
