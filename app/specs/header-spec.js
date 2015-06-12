import React from 'react/addons';
const {TestUtils} = React.addons;
import Header from '../renderer/components/header.react';
require('./jasmine-matchers');

describe('Header', () => {
  let header;

  beforeEach(() => {
    header = TestUtils.renderIntoDocument(<Header />);
  });

  it('应该显示`产品`标题', () => {
    expect(header).toExist();
    let headerDom = React.findDOMNode(header);
    let span = headerDom.querySelector('h1 > span');
    expect(span.textContent).toEqual('产品');
    // React.findDOMNode(header).querySelector('h1').querySelector('span');
    // expect($j(React.findDOMNode(header)).find('h1').find('span')[0].textContent).toEqual('产品');
  });

  it('应该显示`新增产品`按钮', () => {
    expect(header).toExist();
    // expect($j(React.findDOMNode(header)).find('button').find('span')[0].textContent).toEqual('  新增产品');
  });
});
