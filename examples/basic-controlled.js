webpackJsonp([2,8],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(4);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"rc-tree/assets/index.less\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _react = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react-dom\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _rcTree = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"rc-tree\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _rcTree2 = _interopRequireDefault(_rcTree);
	
	var _util = __webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var Demo = _react2["default"].createClass({
	  displayName: 'Demo',
	
	  propTypes: {
	    multiple: _react.PropTypes.bool
	  },
	  getDefaultProps: function getDefaultProps() {
	    return {
	      multiple: true
	    };
	  },
	  getInitialState: function getInitialState() {
	    return {
	      // expandedKeys: getFilterExpandedKeys(gData, ['0-0-0-key']),
	      expandedKeys: ['0-0-0-key'],
	      autoExpandParent: true,
	      // checkedKeys: ['0-0-0-0-key', '0-0-1-0-key', '0-1-0-0-key'],
	      checkedKeys: ['0-0-0-key'],
	      checkStrictlyKeys: {},
	      selectedKeys: []
	    };
	  },
	  onExpand: function onExpand(expandedKeys) {
	    console.log('onExpand', arguments);
	    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
	    // or, you can remove all expanded chilren keys.
	    this.setState({
	      expandedKeys: expandedKeys,
	      autoExpandParent: false
	    });
	  },
	  onCheck: function onCheck(checkedKeys) {
	    this.setState({
	      checkedKeys: checkedKeys
	    });
	  },
	  onCheckStrictly: function onCheckStrictly(checkedKeys) /* extra*/{
	    console.log(arguments);
	    // const { checkedNodesPositions } = extra;
	    // const pps = filterParentPosition(checkedNodesPositions.map(i => i.pos));
	    // console.log(checkedNodesPositions.filter(i => pps.indexOf(i.pos) > -1).map(i => i.node.key));
	    var cks = {
	      checked: checkedKeys.checked || checkedKeys,
	      halfChecked: ['0-0-' + parseInt(Math.random() * 3, 10) + '-key']
	    };
	    this.setState({
	      // checkedKeys,
	      checkStrictlyKeys: cks
	    });
	  },
	  // checkStrictlyKeys: checkedKeys,
	  onSelect: function onSelect(selectedKeys, info) {
	    console.log('onSelect', selectedKeys, info);
	    this.setState({
	      selectedKeys: selectedKeys
	    });
	  },
	  onRbSelect: function onRbSelect(selectedKeys, info) {
	    var _selectedKeys = selectedKeys;
	    if (info.selected) {
	      _selectedKeys = (0, _util.getRadioSelectKeys)(_util.gData, selectedKeys, info.node.props.eventKey);
	    }
	    this.setState({
	      selectedKeys: _selectedKeys
	    });
	  },
	  render: function render() {
	    var loop = function loop(data) {
	      return data.map(function (item) {
	        if (item.children) {
	          return _react2["default"].createElement(
	            _rcTree.TreeNode,
	            { key: item.key, title: item.title,
	              disableCheckbox: item.key === '0-0-0-key' ? true : false },
	            loop(item.children)
	          );
	        }
	        return _react2["default"].createElement(_rcTree.TreeNode, { key: item.key, title: item.title });
	      });
	    };
	    // console.log(getRadioSelectKeys(gData, this.state.selectedKeys));
	    return _react2["default"].createElement(
	      'div',
	      { style: { padding: '0 20px' } },
	      _react2["default"].createElement(
	        'h2',
	        null,
	        'controlled'
	      ),
	      _react2["default"].createElement(
	        _rcTree2["default"],
	        { checkable: true, multiple: this.props.multiple,
	          onExpand: this.onExpand, expandedKeys: this.state.expandedKeys,
	          autoExpandParent: this.state.autoExpandParent,
	          onCheck: this.onCheck, checkedKeys: this.state.checkedKeys,
	          onSelect: this.onSelect, selectedKeys: this.state.selectedKeys },
	        loop(_util.gData)
	      ),
	      _react2["default"].createElement(
	        'h2',
	        null,
	        'checkStrictly'
	      ),
	      _react2["default"].createElement(
	        _rcTree2["default"],
	        { checkable: true, multiple: this.props.multiple, defaultExpandAll: true,
	          onExpand: this.onExpand, expandedKeys: this.state.expandedKeys,
	          onCheck: this.onCheckStrictly,
	          checkedKeys: this.state.checkStrictlyKeys,
	          checkStrictly: true },
	        loop(_util.gData)
	      ),
	      _react2["default"].createElement(
	        'h2',
	        null,
	        'radio\'s behavior select (in the same level)'
	      ),
	      _react2["default"].createElement(
	        _rcTree2["default"],
	        { multiple: true, defaultExpandAll: true,
	          onSelect: this.onRbSelect,
	          selectedKeys: (0, _util.getRadioSelectKeys)(_util.gData, this.state.selectedKeys) },
	        loop(_util.gData)
	      )
	    );
	  }
	});
	
	_reactDom2["default"].render(_react2["default"].createElement(Demo, null), document.getElementById('__react-content'));

/***/ },
/* 5 */
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

/***/ }
]);
//# sourceMappingURL=basic-controlled.js.map