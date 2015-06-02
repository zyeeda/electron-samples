describe('Header', function() {
    const React     = require('react/addons'),
          Header    = require('./../src/components/header'),
          TestUtils = React.addons.TestUtils;
    let header;

    beforeEach(function () {
        header = TestUtils.renderIntoDocument(<Header />);
    });

    it('does header component can render', function() {
        expect(header).toExist();
        expect($j(React.findDOMNode(header)).find('h1').find('span')[0].textContent).toEqual('产品');
        expect($j(React.findDOMNode(header)).find('button').find('span')[0].textContent).toEqual('  新增产品');
    });

    // it('does add button can work', function() {
        //TestUtils.Simulate.click($j(React.findDOMNode(header)).find('button')[0]);
        // console.log($j(React.findDOMNode(header)));
        // console.log($j(document.body));
    // });
});
