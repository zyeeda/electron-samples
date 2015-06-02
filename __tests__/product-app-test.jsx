describe('ProductApp', function () {
    const React        = require('react/addons'),
          Fluxible     = require('fluxible'),
          ProductApp   = require('./../src/components/product-app'),
          ProductStore = require('./../src/store/product-store'),
          TestUtils    = React.addons.TestUtils,
          fluxibleApp  = new Fluxible({ component: ProductApp, stores: [ProductStore] });
    let main;

    beforeEach(function () {
        main = TestUtils.renderIntoDocument(fluxibleApp.createContext().createElement());
    });

    /*
     * 主界面是否成功渲染到页面
    */

    //标题
    it('does page header render', function () {
        //Dom有一个class为page-header的<div>，并且内容为“产品”
        expect($j(React.findDOMNode(main)).find('.page-header').length).toBeGreaterThan(0);
        expect($j(React.findDOMNode(main)).find('.page-header').find('span')[0].textContent).toEqual('产品');
    });

    //新增按钮
    it('does page header have a create button', function() {
        //是否有一个新增产品的按钮
        expect($j(React.findDOMNode(main)).find('.page-header').find('button').length).toBeGreaterThan(0);
        expect($j(React.findDOMNode(main)).find('.page-header').find('button').find('span')[0].textContent).toEqual('  新增产品');
    });

    //搜索框
    it('does have a search input', function() {
        //Dom中有一个<input>
        expect($j(React.findDOMNode(main)).find('.container-fluid').find('input').length).toBeGreaterThan(0);
    });

    //产品展示列表
    it('does have a table', function() {
        //Dom中有一个<table>
        expect($j(React.findDOMNode(main)).find('table').length).toBeGreaterThan(0);
    });

    /*
    * 搜索框
    */

    it('does search function can work', function() {
        let input = TestUtils.findRenderedDOMComponentWithTag(main, 'input');
        let inputDomNode = React.findDOMNode(input);
        let mainDomNode = React.findDOMNode(main);

        //列表table中包含表头有两个<tr>
        expect($j(mainDomNode).find('table').find('tbody').find('tr').length).toEqual(1);

        //改变搜索框中的值：hello world
        $j(inputDomNode).val('hello world');
        TestUtils.Simulate.change(inputDomNode);
        // TestUtils.Simulate.change(domNode, {target: {value: 'hello world'}});

        //原来的表中的数据是test，不匹配搜索结果，所以列表中应该没有数据
        expect($j(mainDomNode).find('table').find('tbody').find('tr').length).toEqual(0);

        //清空搜索框中的值
        $j(inputDomNode).val('');
        TestUtils.Simulate.change(inputDomNode);
        //TestUtils.Simulate.change(React.findDOMNode(input), {target: {value: ''}});

        //重置搜索框，列表中的数据恢复为原来的数据，条数是1条
        expect($j(mainDomNode).find('table').find('tbody').find('tr').length).toEqual(1);
    });

    /*
     * 新增界面
    */

    //新增界面显示
    it('does add interface can render', function() {
        //新增按钮点击前，Dom中没有class为modal-dialog的<div>
        expect($j(document.body).hasClass('modal-open')).toBe(false);
        expect($j(document.body).find('.modal-dialog').length).toEqual(0);

        //触发新增按钮点击
        let addButton = TestUtils.findRenderedDOMComponentWithTag(main, 'button');
        TestUtils.Simulate.click(React.findDOMNode(addButton));

        // 成功打开新增界面,Dom中出现一个class为modal-dialog的<div>,并且标题为“新增产品”
        expect($j(document.body).hasClass('modal-open')).toBe(true);
        expect($j(document.body).find('.modal-dialog').length).toEqual(1);
        expect($j(document.body).find('.modal-dialog').find('.modal-title')[0].textContent).toEqual('新增产品');
    });

    //两个输入框
    it('does add interface have two <input>', function() {
        //新增界面<div class="modal-body">中有两个<input>
        expect($j(document.body).find('.modal-dialog').find('.modal-body').find('input').length).toEqual(2);
    });

    //一个下拉选框
    it('does add interface have a <select>', function() {
        //新增界面<div class="modal-body">中有一个<select>
        expect($j(document.body).find('.modal-dialog').find('.modal-body').find('select').length).toEqual(1);
    });

    //确定和关闭按钮
    it('does add interface have open/close <button>', function() {
        //新增界面<div class="modal-footer">中有两个按钮<button>
        expect($j(document.body).find('.modal-dialog').find('.modal-footer').find('button').length).toEqual(2);
        expect($j(document.body).find('.modal-dialog').find('.modal-footer').find('button')[0].textContent).toEqual(' 关闭 ');
        expect($j(document.body).find('.modal-dialog').find('.modal-footer').find('button')[1].textContent).toEqual(' 确定 ');
    });

    //新增一条数据
    it('does add interface can add data to table', function() {
        //为新增界面的输入框<input>赋值“hello”“world”
        let nameInput = $j(document.body).find('.modal-dialog').find('.modal-body').find('input')[0];
        let modeInput = $j(document.body).find('.modal-dialog').find('.modal-body').find('input')[1];
        $j(nameInput).val('hello');
        TestUtils.Simulate.change(nameInput);
        $j(modeInput).val('world');
        TestUtils.Simulate.change(modeInput);

        //点击确定按钮，新增数据
        TestUtils.Simulate.click($j(document.body).find('.modal-dialog').find('.modal-footer').find('button')[1]);

        //确认按钮点击后，新增窗口消失
        expect($j(document.body).hasClass('modal-open')).toBe(false);

        console.log('after add，tbody tr length = ', $j(React.findDOMNode(main)).find('table').find('tbody').find('tr').length);
        console.log('after add，table textContent = ', $j(React.findDOMNode(main)).find('table').find('tbody')[0].textContent);

        $j(document.body).find('.modal-dialog').remove();
    });

    /**
    * 编辑界面
    */

    //编辑界面显示
    it('does update interface can render', function() {
        //没有点击编辑按钮前，table的tr行中没有input等
        expect($j(React.findDOMNode(main)).find('table').find('tbody').find('tr').find('input').length).toEqual(0);
        expect($j(React.findDOMNode(main)).find('table').find('tbody').find('tr').find('select').length).toEqual(0);

        //模拟点击编辑按钮
        TestUtils.Simulate.click($j(React.findDOMNode(main)).find('table').find('.inlineOperateBtn.green')[0]);

        //数据所在行出现2个<input>,1个<select>
        expect($j(React.findDOMNode(main)).find('table').find('tbody').find('tr').find('input').length).toEqual(2);

        expect($j(React.findDOMNode(main)).find('table').find('tbody').find('tr').find('select').length).toEqual(1);

        // $j($j(React.findDOMNode(main)).find('table').find('tr').find('input')[0]).val('hello');
        // $j($j(React.findDOMNode(main)).find('table').find('tr').find('input')[1]).val('world');

        // TestUtils.Simulate.change($j(React.findDOMNode(main)).find('table').find('tr').find('input')[0], {target: {value: 'Hello'}});
        // TestUtils.Simulate.change($j(React.findDOMNode(main)).find('table').find('tr').find('input')[1], {target: {value: 'world'}});

        //模拟点击取消按钮
        TestUtils.Simulate.click($j(React.findDOMNode(main)).find('table').find('.inlineOperateBtn.red')[0]);

        expect($j(React.findDOMNode(main)).find('table').find('tr').find('input').length).toEqual(0);
        expect($j(React.findDOMNode(main)).find('table').find('tr').find('select').length).toEqual(0);

        // console.log($j(React.findDOMNode(main)).find('table').find('tbody').find('td').textContent);
    });

    /*
     * 删除界面
    */

    //删除界面显示
    it('does delete confirm interface can render', function () {
        //删除按钮点击前
        expect($j(document.body).hasClass('modal-open')).toBe(false);
        expect($j(document.body).find('.modal-dialog').length).toEqual(0);
        expect($j(React.findDOMNode(main)).find('table').find('tbody').find('tr').length).toEqual(1);

        //模拟点击删除按钮
        TestUtils.Simulate.click($j(React.findDOMNode(main)).find('table').find('tbody').find('.inlineOperateBtn.red')[0]);

        //弹出删除确认对话框
        expect($j(document.body).hasClass('modal-open')).toBe(true);
        expect($j(document.body).find('.modal-dialog').length).toEqual(1);
        expect($j(document.body).find('.modal-dialog').find('.modal-body')[0].textContent).toEqual('确定要删除此记录吗 ？');

        // $j(document.body).find('.modal-dialog').find('.modal-footer').find('.confirmButton').click();
        TestUtils.Simulate.click($j(document.body).find('.modal-dialog').find('.modal-footer').find('.confirmButton')[0]);
        // console.log($j(document.body).hasClass('modal-open'));
        // console.log($j(React.findDOMNode(main)).find('table').find('tbody').find('tr').length);
    });

});
