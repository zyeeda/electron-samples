// describe('SearchBar Test', function() {
//     let React     = require('react/addons'),
//         SearchBar    = require('./../src/components/search-bar'),
//         jasmineReact = require('./../../node_modules/jasmine-react-helpers/src/jasmine-react');
//     let searchBarTest;

//     SearchBarTest = React.createClass({
//         handleSearch: function() {
//             console.log('into handleSearch function');
//           }
//         render: function(){
//           return <input ref='searchIpt' onChange={this.handleSearch.bind(this)}/>
//         }
//     });

//     //jasmineReact.spyOnClass(SearchBarTest, "handleSearch");
//     //searchBarTest = jasmineReact.render(<SearchBarTest />);


//     // it('does header component can render', function() {
//     //     expect(searchBarEl).toExist();
//     //     expect($j(React.findDOMNode(searchBarEl)).find('input').length).toEqual(1);
//     //     expect(searchBarEl.refs.searchIpt.props.placeholder).toEqual('搜索产品名称与型号');
//     // });

//     // it('does searchBar can work', function() {
//         // searchBarTest.handleSearch();
//         // expect(jasmineReact.classPrototype(SearchBarTest).handleSearch).not.toHaveBeenCalled();
//     // });
// });
