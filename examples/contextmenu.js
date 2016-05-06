webpackJsonp([4,8],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(8);


/***/ },

/***/ 8:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"rc-tree/assets/index.less\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	__webpack_require__(9);
	
	var _react = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react-dom\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _rcTree = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"rc-tree\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _rcTree2 = _interopRequireDefault(_rcTree);
	
	var _objectAssign = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"object-assign\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var _rcTooltip = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"rc-tooltip\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _rcTooltip2 = _interopRequireDefault(_rcTooltip);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function contains(root, n) {
	  var node = n;
	  while (node) {
	    if (node === root) {
	      return true;
	    }
	    node = node.parentNode;
	  }
	  return false;
	}
	
	var Demo = _react2["default"].createClass({
	  displayName: 'Demo',
	
	  propTypes: {},
	  componentDidMount: function componentDidMount() {
	    this.getContainer();
	    // console.log(ReactDOM.findDOMNode(this), this.cmContainer);
	    console.log(contains(_reactDom2["default"].findDOMNode(this), this.cmContainer));
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    if (this.cmContainer) {
	      _reactDom2["default"].unmountComponentAtNode(this.cmContainer);
	      document.body.removeChild(this.cmContainer);
	      this.cmContainer = null;
	    }
	  },
	  onSelect: function onSelect(info) {
	    console.log('selected', info);
	  },
	  onRightClick: function onRightClick(info) {
	    console.log('right click', info);
	    this.renderCm(info);
	  },
	  onMouseEnter: function onMouseEnter(info) {
	    console.log('enter', info);
	    this.renderCm(info);
	  },
	  onMouseLeave: function onMouseLeave(info) {
	    console.log('leave', info);
	  },
	  getContainer: function getContainer() {
	    if (!this.cmContainer) {
	      this.cmContainer = document.createElement('div');
	      document.body.appendChild(this.cmContainer);
	    }
	    return this.cmContainer;
	  },
	  renderCm: function renderCm(info) {
	    if (this.toolTip) {
	      _reactDom2["default"].unmountComponentAtNode(this.cmContainer);
	      this.toolTip = null;
	    }
	    this.toolTip = _react2["default"].createElement(
	      _rcTooltip2["default"],
	      { trigger: 'click', placement: 'bottomRight', prefixCls: 'rc-tree-contextmenu',
	        defaultVisible: true, overlay: _react2["default"].createElement(
	          'h4',
	          null,
	          info.node.props.title
	        ) },
	      _react2["default"].createElement('span', null)
	    );
	
	    var container = this.getContainer();
	    (0, _objectAssign2["default"])(this.cmContainer.style, {
	      position: 'absolute',
	      left: info.event.pageX + 'px',
	      top: info.event.pageY + 'px'
	    });
	
	    _reactDom2["default"].render(this.toolTip, container);
	  },
	  render: function render() {
	    return _react2["default"].createElement(
	      'div',
	      null,
	      _react2["default"].createElement(
	        'h2',
	        null,
	        'right click contextmenu'
	      ),
	      _react2["default"].createElement(
	        _rcTree2["default"],
	        { onRightClick: this.onRightClick, onSelect: this.onSelect,
	          defaultSelectedKeys: ['0-1', '0-1-1'],
	          multiple: true, defaultExpandAll: true, showLine: true },
	        _react2["default"].createElement(
	          _rcTree.TreeNode,
	          { title: 'parent 1', key: '0-1' },
	          _react2["default"].createElement(
	            _rcTree.TreeNode,
	            { title: 'parent 1-0', key: '0-1-1' },
	            _react2["default"].createElement(_rcTree.TreeNode, { title: 'leaf0' }),
	            _react2["default"].createElement(_rcTree.TreeNode, { title: 'leaf1' }),
	            _react2["default"].createElement(_rcTree.TreeNode, { title: 'leaf2' })
	          ),
	          _react2["default"].createElement(
	            _rcTree.TreeNode,
	            { title: 'parent 1-1' },
	            _react2["default"].createElement(_rcTree.TreeNode, { title: 'leaf' })
	          )
	        )
	      ),
	      _react2["default"].createElement(
	        'h2',
	        null,
	        'hover popup contextmenu'
	      ),
	      _react2["default"].createElement(
	        _rcTree2["default"],
	        { onMouseEnter: this.onMouseEnter, onMouseLeave: this.onMouseLeave, onSelect: this.onSelect,
	          multiple: true, defaultExpandAll: true, showLine: true },
	        _react2["default"].createElement(
	          _rcTree.TreeNode,
	          { title: 'parent 1', key: '0-1' },
	          _react2["default"].createElement(
	            _rcTree.TreeNode,
	            { title: 'parent 1-0', key: '0-1-1' },
	            _react2["default"].createElement(_rcTree.TreeNode, { title: 'leaf' }),
	            _react2["default"].createElement(_rcTree.TreeNode, { title: 'leaf' })
	          ),
	          _react2["default"].createElement(
	            _rcTree.TreeNode,
	            { title: 'parent 1-1' },
	            _react2["default"].createElement(_rcTree.TreeNode, { title: 'leaf' })
	          )
	        )
	      )
	    );
	  }
	});
	_reactDom2["default"].render(_react2["default"].createElement(Demo, null), document.getElementById('__react-content'));

/***/ },

/***/ 9:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

});
//# sourceMappingURL=contextmenu.js.map