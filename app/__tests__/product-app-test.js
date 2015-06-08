const React = require('react/addons');
const TestUtils = React.addons.TestUtils;
const Fluxible = require('fluxible');
import ProductApp from '../src/components/product-app.react';
import ProductStore from '../src/store/product-store';

describe('ProductApp', function _describe() {
  let fluxibleApp = new Fluxible({ component: ProductApp, stores: [ProductStore] });
  let main;

  beforeEach(function _beforeEach() {
    main = TestUtils.renderIntoDocument(fluxibleApp.createContext().createElement());
  });

  // 标题
  it('应该渲染一个 class 为 page-header 的 div，且内容为“产品”', function test() {
    expect($j(React.findDOMNode(main)).find('.page-header').length).toBeGreaterThan(0);
    expect($j(React.findDOMNode(main)).find('.page-header').find('span')[0].textContent).toEqual('产品');
  });

  // 新增按钮
  it('应该渲染一个新增产品按钮', function test() {
    expect($j(React.findDOMNode(main)).find('.page-header').find('button').length).toBeGreaterThan(0);
    expect($j(React.findDOMNode(main)).find('.page-header').find('button').find('span')[0].textContent).toEqual('新增产品');
  });

  // 搜索框
  it('应该渲染一个 input', function test() {
    expect($j(React.findDOMNode(main)).find('.container-fluid').find('input').length).toBeGreaterThan(0);
  });

  // 产品展示列表
  it('应该渲染一个 table', function test() {
    expect($j(React.findDOMNode(main)).find('table').length).toBeGreaterThan(0);
  });

  it('应该可以搜索数据', function test() {
    let input = TestUtils.findRenderedDOMComponentWithTag(main, 'input');
    let inputDomNode = React.findDOMNode(input);
    let mainDomNode = React.findDOMNode(main);

    // 列表 table 中包含表头有两个 tr
    expect($j(mainDomNode).find('table').find('tbody').find('tr').length).toEqual(1);

    // 改变搜索框中的值: hello world
    $j(inputDomNode).val('hello world');
    TestUtils.Simulate.change(inputDomNode);
    // TestUtils.Simulate.change(domNode, {target: {value: 'hello world'}});

    // 原来的表中的数据是 test，不匹配搜索结果，所以列表中应该没有数据
    expect($j(mainDomNode).find('table').find('tbody').find('tr').length).toEqual(0);

    // 清空搜索框中的值
    $j(inputDomNode).val('');
    TestUtils.Simulate.change(inputDomNode);
    // TestUtils.Simulate.change(React.findDOMNode(input), {target: {value: ''}});

    // 重置搜索框，列表中的数据恢复为原来的数据，条数是 1 条
    expect($j(mainDomNode).find('table').find('tbody').find('tr').length).toEqual(1);
  });

  // 新增界面显示
  it('应该可以打开新增界面', function test() {
    // 新增按钮点击前，dom 中没有 class 为 modal-dialog 的 div
    expect($j(document.body).hasClass('modal-open')).toBe(false);
    expect($j(document.body).find('.modal-dialog').length).toEqual(0);

    // 触发新增按钮点击
    let addButton = TestUtils.findRenderedDOMComponentWithTag(main, 'button');
    TestUtils.Simulate.click(React.findDOMNode(addButton));

    // 成功打开新增界面，dom 中出现一个 class 为 modal-dialog 的 div，并且标题为“新增产品”
    expect($j(document.body).hasClass('modal-open')).toBe(true);
    expect($j(document.body).find('.modal-dialog').length).toEqual(1);
    expect($j(document.body).find('.modal-dialog').find('.modal-title')[0].textContent).toEqual('新增产品');
  });

  // 两个输入框
  it('应该有两个输入框', function test() {
    expect($j(document.body).find('.modal-dialog').find('.modal-body').find('input').length).toEqual(2);
  });

  // 一个下拉选框
  it('应该有一个下拉列表', function test() {
    expect($j(document.body).find('.modal-dialog').find('.modal-body').find('select').length).toEqual(1);
  });

  // 确定和关闭按钮
  it('应该包含“确定”和“关闭”按钮', function test() {
    expect($j(document.body).find('.modal-dialog').find('.modal-footer').find('button').length).toEqual(2);
    expect($j(document.body).find('.modal-dialog').find('.modal-footer').find('button')[0].textContent).toEqual('关闭');
    expect($j(document.body).find('.modal-dialog').find('.modal-footer').find('button')[1].textContent).toEqual('确定');
  });

  // 新增一条数据
  it('应该可以新增一条数据', function test() {
    let nameInput = $j(document.body).find('.modal-dialog').find('.modal-body').find('input')[0];
    let modeInput = $j(document.body).find('.modal-dialog').find('.modal-body').find('input')[1];
    $j(nameInput).val('hello');
    TestUtils.Simulate.change(nameInput);
    $j(modeInput).val('world');
    TestUtils.Simulate.change(modeInput);

    // 点击确定按钮，新增数据
    TestUtils.Simulate.click($j(document.body).find('.modal-dialog').find('.modal-footer').find('button')[1]);

    // 确认按钮点击后，新增窗口消失
    expect($j(document.body).hasClass('modal-open')).toBe(false);

    $j(document.body).find('.modal-dialog').remove();
  });

  // 编辑界面显示
  it('应该可以显示编辑界面', function test() {
    expect($j(React.findDOMNode(main)).find('table').find('tbody').find('tr').find('input').length).toEqual(0);
    expect($j(React.findDOMNode(main)).find('table').find('tbody').find('tr').find('select').length).toEqual(0);

    // 模拟点击编辑按钮
    TestUtils.Simulate.click($j(React.findDOMNode(main)).find('table').find('.inlineOperateBtn.green')[0]);

    // 数据所在行出现两个 input 和一个 select
    expect($j(React.findDOMNode(main)).find('table').find('tbody').find('tr').find('input').length).toEqual(2);

    expect($j(React.findDOMNode(main)).find('table').find('tbody').find('tr').find('select').length).toEqual(1);

    // 模拟点击取消按钮
    TestUtils.Simulate.click($j(React.findDOMNode(main)).find('table').find('.inlineOperateBtn.red')[0]);

    expect($j(React.findDOMNode(main)).find('table').find('tr').find('input').length).toEqual(0);
    expect($j(React.findDOMNode(main)).find('table').find('tr').find('select').length).toEqual(0);
  });

  // 删除界面显示
  it('可以显示删除界面', function test() {
    // 删除按钮点击前
    expect($j(document.body).hasClass('modal-open')).toBe(false);
    expect($j(document.body).find('.modal-dialog').length).toEqual(0);
    expect($j(React.findDOMNode(main)).find('table').find('tbody').find('tr').length).toEqual(1);

    // 模拟点击删除按钮
    TestUtils.Simulate.click($j(React.findDOMNode(main)).find('table').find('tbody').find('.inlineOperateBtn.red')[0]);

    // 弹出删除确认对话框
    expect($j(document.body).hasClass('modal-open')).toBe(true);
    expect($j(document.body).find('.modal-dialog').length).toEqual(1);
    expect($j(document.body).find('.modal-dialog').find('.modal-body')[0].textContent).toEqual('确定要删除此记录吗 ？');

    TestUtils.Simulate.click($j(document.body).find('.modal-dialog').find('.modal-footer').find('.confirmButton')[0]);
  });
});
