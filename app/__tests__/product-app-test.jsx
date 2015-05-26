'use strict';

describe('ProductApp', function () {
    // beforeEach(function() {
    //   jasmine.getFixtures().fixturesPath = './';
    //   loadFixtures("index.html");
    // });

    const React = require('react/addons'),
        Fluxible = require('fluxible'),
        ProductApp = require('./../src/components/product-app'),
        ProductStore = require('./../src/store/product-store'),
        TestUtils = React.addons.TestUtils,
        fluxibleApp = new Fluxible({ component: ProductApp, stores: [ProductStore] });
    let main;

    beforeEach(function () {
        main = TestUtils.renderIntoDocument(fluxibleApp.createContext().createElement());
    });

    /*
     * 主界面是否成功渲染到页面
    */

    //标题界面显示
    it('does the dom have page-header class', function () {
        expect($j(React.findDOMNode(main)).find('.page-header').length).toBeGreaterThan(0);
    });

    //标题
    it('does page header render', function () {
        expect($j(React.findDOMNode(main)).find('.page-header').find('span')[0].textContent).toEqual('产品');
    });

    //新增按钮
    it('does page header have create button', function() {
        //是否有一个button
        expect($j(React.findDOMNode(main)).find('.page-header').find('button').length).toBeGreaterThan(0);
        //button名字
        expect($j(React.findDOMNode(main)).find('.page-header').find('button').find('span')[0].textContent).toEqual('  新增产品');
    });

    //搜索框
    it('does have search input', function() {
        expect($j(React.findDOMNode(main)).find('.container-fluid').find('input').length).toBeGreaterThan(0);
    });

    //产品展示列表
    it('does have table', function() {
        expect($j(React.findDOMNode(main)).find('table').length).toBeGreaterThan(0);
    });

    /*
     * 新增界面
    */

    //新增界面显示
    it('does add interface can render', function() {
        //新增按钮点击前
        expect($j(document.body).find('.modal-dialog').length).toEqual(0);

        //触发新增按钮点击
        let addButton = TestUtils.findRenderedDOMComponentWithTag(main, 'button');
        TestUtils.Simulate.click(React.findDOMNode(addButton));

        // //新增按钮点击后
        expect($j(document.body).find('.modal-dialog').length).toEqual(1);
        expect($j(document.body).find('.modal-dialog').find('.modal-title')[0].textContent).toEqual('新增产品');
    });

    //两个输入框
    it('does add interface have two <input>', function() {
        expect($j(document.body).find('.modal-dialog').find('.modal-body').find('input').length).toEqual(2);
    });

    //一个下拉选框
    it('does add interface have a <select>', function() {
        expect($j(document.body).find('.modal-dialog').find('.modal-body').find('select').length).toEqual(1);
    });

    //确定和关闭按钮
    it('does add interface have open/close <button>', function() {
        expect($j(document.body).find('.modal-dialog').find('.modal-footer').find('button').length).toEqual(2);
        expect($j(document.body).find('.modal-dialog').find('.modal-footer').find('button')[0].textContent).toEqual(' 关闭 ');
        expect($j(document.body).find('.modal-dialog').find('.modal-footer').find('button')[1].textContent).toEqual(' 确定 ');
    });

    //新增一条数据
    it('does add interface can add a data to table', function() {

        // TestUtils.Simulate.change(node, {target: {value: 'hello'}});

    });

    /**
    * 编辑界面
    */

    it('does update interface can render', function() {

    });

});
