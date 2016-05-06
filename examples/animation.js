webpackJsonp([0,8],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"rc-tree/assets/index.less\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _react = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react-dom\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _rcTree = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"rc-tree\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _rcTree2 = _interopRequireDefault(_rcTree);
	
	var _cssAnimation = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"css-animation\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _cssAnimation2 = _interopRequireDefault(_cssAnimation);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var STYLE = '\n.collapse {\n  overflow: hidden;\n}\n\n.collapse-active {\n  transition: height 0.3s ease-out;\n}\n';
	
	function animate(node, show, done) {
	  var height = void 0;
	  return (0, _cssAnimation2["default"])(node, 'collapse', {
	    start: function start() {
	      if (!show) {
	        node.style.height = node.offsetHeight + 'px';
	      } else {
	        height = node.offsetHeight;
	        node.style.height = 0;
	      }
	    },
	    active: function active() {
	      node.style.height = (show ? height : 0) + 'px';
	    },
	    end: function end() {
	      node.style.height = '';
	      done();
	    }
	  });
	}
	
	var animation = {
	  enter: function enter(node, done) {
	    return animate(node, true, done);
	  },
	  leave: function leave(node, done) {
	    return animate(node, false, done);
	  },
	  appear: function appear(node, done) {
	    return animate(node, true, done);
	  }
	};
	
	var demo = _react2["default"].createElement(
	  'div',
	  null,
	  _react2["default"].createElement(
	    'h2',
	    null,
	    'expanded'
	  ),
	  _react2["default"].createElement('style', { dangerouslySetInnerHTML: { __html: STYLE } }),
	  _react2["default"].createElement(
	    _rcTree2["default"],
	    { defaultExpandAll: false,
	      openAnimation: animation },
	    _react2["default"].createElement(
	      _rcTree.TreeNode,
	      { title: 'parent 1', key: 'p1' },
	      _react2["default"].createElement(_rcTree.TreeNode, { key: 'p10', title: 'leaf' }),
	      _react2["default"].createElement(
	        _rcTree.TreeNode,
	        { title: 'parent 1-1', key: 'p11' },
	        _react2["default"].createElement(
	          _rcTree.TreeNode,
	          { title: 'parent 2-1', key: 'p21' },
	          _react2["default"].createElement(_rcTree.TreeNode, { title: 'leaf' }),
	          _react2["default"].createElement(_rcTree.TreeNode, { title: 'leaf' })
	        ),
	        _react2["default"].createElement(_rcTree.TreeNode, { key: 'p22', title: 'leaf' })
	      )
	    )
	  )
	);
	
	_reactDom2["default"].render(demo, document.getElementById('__react-content'));

/***/ }
]);
//# sourceMappingURL=animation.js.map