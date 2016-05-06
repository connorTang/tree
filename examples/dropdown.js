webpackJsonp([6,8],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(12);


/***/ },

/***/ 5:
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.generateData = generateData;
	exports.calcTotal = calcTotal;
	exports.isInclude = isInclude;
	exports.filterParentPosition = filterParentPosition;
	exports.getFilterExpandedKeys = getFilterExpandedKeys;
	exports.getRadioSelectKeys = getRadioSelectKeys;
	/* eslint no-loop-func: 0*/
	
	function generateData() {
	  var x = arguments.length <= 0 || arguments[0] === undefined ? 3 : arguments[0];
	  var y = arguments.length <= 1 || arguments[1] === undefined ? 2 : arguments[1];
	  var z = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];
	  var gData = arguments.length <= 3 || arguments[3] === undefined ? [] : arguments[3];
	
	  // x：每一级下的节点总数。y：每级节点里有y个节点、存在子节点。z：树的level层级数（0表示一级）
	  function _loop(_level, _preKey, _tns) {
	    var preKey = _preKey || '0';
	    var tns = _tns || gData;
	
	    var children = [];
	    for (var i = 0; i < x; i++) {
	      var key = preKey + '-' + i;
	      tns.push({ title: key + '-label', key: key + '-key' });
	      if (i < y) {
	        children.push(key);
	      }
	    }
	    if (_level < 0) {
	      return tns;
	    }
	    var __level = _level - 1;
	    children.forEach(function (key, index) {
	      tns[index].children = [];
	      return _loop(__level, key, tns[index].children);
	    });
	  }
	  _loop(z);
	  return gData;
	}
	function calcTotal() {
	  var x = arguments.length <= 0 || arguments[0] === undefined ? 3 : arguments[0];
	  var y = arguments.length <= 1 || arguments[1] === undefined ? 2 : arguments[1];
	  var z = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];
	
	  /* eslint no-param-reassign:0*/
	  var rec = function rec(n) {
	    return n >= 0 ? x * Math.pow(y, n--) + rec(n) : 0;
	  };
	  return rec(z + 1);
	}
	console.log('总节点数（单个tree）：', calcTotal());
	// 性能测试：总节点数超过 2000（z要小）明显感觉慢。z 变大时，递归多，会卡死。
	
	var gData = exports.gData = generateData();
	
	function isInclude(smallArray, bigArray) {
	  return smallArray.every(function (ii, i) {
	    return ii === bigArray[i];
	  });
	}
	// console.log(isInclude(['0', '1'], ['0', '10', '1']));
	
	// arr.length === 628, use time: ~20ms
	function filterParentPosition(arr) {
	  var levelObj = {};
	  arr.forEach(function (item) {
	    var posLen = item.split('-').length;
	    if (!levelObj[posLen]) {
	      levelObj[posLen] = [];
	    }
	    levelObj[posLen].push(item);
	  });
	  var levelArr = Object.keys(levelObj).sort();
	
	  var _loop2 = function _loop2(i) {
	    if (levelArr[i + 1]) {
	      levelObj[levelArr[i]].forEach(function (ii) {
	        var _loop3 = function _loop3(j) {
	          levelObj[levelArr[j]].forEach(function (_i, index) {
	            if (isInclude(ii.split('-'), _i.split('-'))) {
	              levelObj[levelArr[j]][index] = null;
	            }
	          });
	          levelObj[levelArr[j]] = levelObj[levelArr[j]].filter(function (p) {
	            return p;
	          });
	        };
	
	        for (var j = i + 1; j < levelArr.length; j++) {
	          _loop3(j);
	        }
	      });
	    }
	  };
	
	  for (var i = 0; i < levelArr.length; i++) {
	    _loop2(i);
	  }
	  var nArr = [];
	  levelArr.forEach(function (i) {
	    nArr = nArr.concat(levelObj[i]);
	  });
	  return nArr;
	}
	// console.log(filterParentPosition(['0-2', '0-3-3', '0-10', '0-10-0', '0-0-1', '0-0', '0-1-1', '0-1']));
	
	function loopData(data, callback) {
	  var loop = function loop(d) {
	    var level = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	
	    d.forEach(function (item, index) {
	      var pos = level + '-' + index;
	      if (item.children) {
	        loop(item.children, pos);
	      }
	      callback(item, index, pos);
	    });
	  };
	  loop(data);
	}
	
	function spl(str) {
	  return str.split('-');
	}
	function splitLen(str) {
	  return str.split('-').length;
	}
	
	function getFilterExpandedKeys(data, expandedKeys) {
	  var expandedPosArr = [];
	  loopData(data, function (item, index, pos) {
	    if (expandedKeys.indexOf(item.key) > -1) {
	      expandedPosArr.push(pos);
	    }
	  });
	  var filterExpandedKeys = [];
	  loopData(data, function (item, index, pos) {
	    expandedPosArr.forEach(function (p) {
	      if ((splitLen(pos) < splitLen(p) && p.indexOf(pos) === 0 || pos === p) && filterExpandedKeys.indexOf(item.key) === -1) {
	        filterExpandedKeys.push(item.key);
	      }
	    });
	  });
	  return filterExpandedKeys;
	}
	
	function isSibling(pos, pos1) {
	  pos.pop();
	  pos1.pop();
	  return pos.join(',') === pos1.join(',');
	}
	
	function getRadioSelectKeys(data, selectedKeys, key) {
	  var res = [];
	  var pkObjArr = [];
	  var selPkObjArr = [];
	  loopData(data, function (item, index, pos) {
	    if (selectedKeys.indexOf(item.key) > -1) {
	      pkObjArr.push([pos, item.key]);
	    }
	    if (key && key === item.key) {
	      selPkObjArr.push(pos, item.key);
	    }
	  });
	  var lenObj = {};
	  var getPosKey = function getPosKey(pos, k) {
	    var posLen = splitLen(pos);
	    if (!lenObj[posLen]) {
	      lenObj[posLen] = [[pos, k]];
	    } else {
	      lenObj[posLen].forEach(function (pkArr, i) {
	        if (isSibling(spl(pkArr[0]), spl(pos))) {
	          // 后来覆盖前者
	          lenObj[posLen][i] = [pos, k];
	        } else if (spl(pkArr[0]) !== spl(pos)) {
	          lenObj[posLen].push([pos, k]);
	        }
	      });
	    }
	  };
	  pkObjArr.forEach(function (pk) {
	    getPosKey(pk[0], pk[1]);
	  });
	  if (key) {
	    getPosKey(selPkObjArr[0], selPkObjArr[1]);
	  }
	
	  Object.keys(lenObj).forEach(function (item) {
	    lenObj[item].forEach(function (i) {
	      if (res.indexOf(i[1]) === -1) {
	        res.push(i[1]);
	      }
	    });
	  });
	  return res;
	}

/***/ },

/***/ 12:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"rc-tree/assets/index.less\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	__webpack_require__(13);
	
	var _react = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react-dom\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _rcTree = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"rc-tree\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _rcTree2 = _interopRequireDefault(_rcTree);
	
	var _rcTrigger = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"rc-trigger\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _rcTrigger2 = _interopRequireDefault(_rcTrigger);
	
	var _util = __webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var placements = {
	  topLeft: {
	    points: ['bl', 'tl'],
	    overflow: {
	      adjustX: 1,
	      adjustY: 1
	    },
	    offset: [0, -3],
	    targetOffset: [0, 0]
	  },
	  bottomLeft: {
	    points: ['tl', 'bl'],
	    overflow: {
	      adjustX: 1,
	      adjustY: 1
	    },
	    offset: [0, 3],
	    targetOffset: [0, 0]
	  }
	}; /* eslint react/no-multi-comp:0 */
	
	var DropdownTree = _react2["default"].createClass({
	  displayName: 'DropdownTree',
	
	  propTypes: {
	    minOverlayWidthMatchTrigger: _react.PropTypes.bool,
	    onVisibleChange: _react.PropTypes.func,
	    prefixCls: _react.PropTypes.string,
	    children: _react.PropTypes.any,
	    transitionName: _react.PropTypes.string,
	    overlayClassName: _react.PropTypes.string,
	    animation: _react.PropTypes.any,
	    align: _react.PropTypes.object,
	    overlayStyle: _react.PropTypes.object,
	    placement: _react.PropTypes.string,
	    trigger: _react.PropTypes.array
	  },
	  getDefaultProps: function getDefaultProps() {
	    return {
	      minOverlayWidthMatchTrigger: true,
	      prefixCls: 'demo-dropdown-tree',
	      trigger: ['hover'],
	      overlayClassName: '',
	      overlayStyle: {},
	      defaultVisible: false,
	      onVisibleChange: function onVisibleChange() {},
	
	      placement: 'bottomLeft'
	    };
	  },
	  getInitialState: function getInitialState() {
	    var props = this.props;
	    if ('visible' in props) {
	      return {
	        visible: props.visible
	      };
	    }
	    return {
	      visible: props.defaultVisible
	    };
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(props) {
	    if ('visible' in props) {
	      this.setState({
	        visible: props.visible
	      });
	    }
	  },
	  onChange: function onChange(value) {
	    console.log('change', value);
	  },
	  onSelect: function onSelect(value) {
	    console.log('select ', value);
	  },
	  onClick: function onClick(e) {
	    var props = this.props;
	    var overlayProps = props.overlay.props;
	    if (!('visible' in props)) {
	      this.setState({
	        visible: false
	      });
	    }
	    if (overlayProps.onClick) {
	      overlayProps.onClick(e);
	    }
	  },
	  onVisibleChange: function onVisibleChange(v) {
	    var props = this.props;
	    if (!('visible' in props)) {
	      this.setState({
	        visible: v
	      });
	    }
	    props.onVisibleChange(v);
	  },
	  getPopupElement: function getPopupElement() {
	    var props = this.props;
	    return _react2["default"].cloneElement(props.overlay, {
	      // prefixCls: `${props.prefixCls}-menu`,
	      onClick: this.onClick
	    });
	  },
	  afterVisibleChange: function afterVisibleChange(visible) {
	    if (visible && this.props.minOverlayWidthMatchTrigger) {
	      var overlayNode = this.refs.trigger.getPopupDomNode();
	      var rootNode = _reactDom2["default"].findDOMNode(this);
	      if (rootNode.offsetWidth > overlayNode.offsetWidth) {
	        overlayNode.style.width = rootNode.offsetWidth + 'px';
	      }
	    }
	  },
	  render: function render() {
	    var _props = this.props;
	    var prefixCls = _props.prefixCls;
	    var children = _props.children;
	    var transitionName = _props.transitionName;
	    var animation = _props.animation;
	    var align = _props.align;
	    var placement = _props.placement;
	    var overlayClassName = _props.overlayClassName;
	    var overlayStyle = _props.overlayStyle;
	    var trigger = _props.trigger;
	
	    return _react2["default"].createElement(
	      _rcTrigger2["default"],
	      { prefixCls: prefixCls,
	        ref: 'trigger',
	        popupClassName: overlayClassName,
	        popupStyle: overlayStyle,
	        builtinPlacements: placements,
	        action: trigger,
	        popupPlacement: placement,
	        popupAlign: align,
	        popupTransitionName: transitionName,
	        popupAnimation: animation,
	        popupVisible: this.state.visible,
	        afterPopupVisibleChange: this.afterVisibleChange,
	        popup: this.getPopupElement(),
	        onPopupVisibleChange: this.onVisibleChange
	      },
	      children
	    );
	  }
	});
	
	var Demo = _react2["default"].createClass({
	  displayName: 'Demo',
	  getInitialState: function getInitialState() {
	    return {
	      visible: false,
	      inputValue: '',
	      sel: '',
	      expandedKeys: [],
	      autoExpandParent: true
	    };
	  },
	  onChange: function onChange(event) {
	    this.filterKeys = [];
	    this.setState({
	      inputValue: event.target.value
	    });
	  },
	  onVisibleChange: function onVisibleChange(visible) {
	    this.setState({
	      visible: visible
	    });
	  },
	  onSelect: function onSelect(selectedKeys, info) {
	    console.log('selected: ', info);
	    this.setState({
	      visible: false,
	      sel: info.node.props.title
	    });
	  },
	  onExpand: function onExpand(expandedKeys) {
	    this.filterKeys = undefined;
	    console.log('onExpand', arguments);
	    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
	    // or, you can remove all expanded chilren keys.
	    this.setState({
	      expandedKeys: expandedKeys,
	      autoExpandParent: false
	    });
	  },
	  filterTreeNode: function filterTreeNode(treeNode) {
	    console.log(treeNode);
	    // 根据 key 进行搜索，可以根据其他数据，如 value
	    return this.filterFn(treeNode.props.eventKey);
	  },
	  filterFn: function filterFn(key) {
	    if (this.state.inputValue && key.indexOf(this.state.inputValue) > -1) {
	      return true;
	    }
	    return false;
	  },
	  render: function render() {
	    var _this = this;
	
	    var loop = function loop(data) {
	      return data.map(function (item) {
	        if (_this.filterKeys && _this.filterFn(item.key)) {
	          _this.filterKeys.push(item.key);
	        }
	        if (item.children) {
	          return _react2["default"].createElement(
	            _rcTree.TreeNode,
	            { key: item.key, title: item.key },
	            loop(item.children)
	          );
	        }
	        return _react2["default"].createElement(_rcTree.TreeNode, { key: item.key, title: item.key });
	      });
	    };
	    var expandedKeys = this.state.expandedKeys;
	    var autoExpandParent = this.state.autoExpandParent;
	    if (this.filterKeys) {
	      expandedKeys = this.filterKeys;
	      autoExpandParent = true;
	    }
	
	    var overlay = _react2["default"].createElement(
	      'div',
	      null,
	      _react2["default"].createElement('input', { placeholder: '请筛选', value: this.state.inputValue, onChange: this.onChange }),
	      _react2["default"].createElement(
	        _rcTree2["default"],
	        {
	          onExpand: this.onExpand, expandedKeys: expandedKeys,
	          autoExpandParent: autoExpandParent,
	          onSelect: this.onSelect, filterTreeNode: this.filterTreeNode },
	        loop(_util.gData)
	      )
	    );
	
	    return _react2["default"].createElement(
	      'div',
	      { style: { padding: '10px 30px' } },
	      _react2["default"].createElement(
	        'h3',
	        null,
	        'tree in dropdown'
	      ),
	      _react2["default"].createElement(
	        DropdownTree,
	        { trigger: ['click'],
	          onVisibleChange: this.onVisibleChange,
	          visible: this.state.visible,
	          closeOnSelect: false,
	          overlay: overlay, animation: 'slide-up' },
	        _react2["default"].createElement(
	          'div',
	          { className: 'demo-dropdown-trigger' },
	          this.state.sel
	        )
	      )
	    );
	  }
	});
	
	_reactDom2["default"].render(_react2["default"].createElement(Demo, null), document.getElementById('__react-content'));

/***/ },

/***/ 13:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

});
//# sourceMappingURL=dropdown.js.map