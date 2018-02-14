(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
	typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
	(factory((global.Finder = {}),global.React));
}(this, (function (exports,React) { 'use strict';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var WindowSize =
/*#__PURE__*/
function (_React$Component) {
  _inherits(WindowSize, _React$Component);

  function WindowSize() {
    var _this;

    _classCallCheck(this, WindowSize);
    _this = _possibleConstructorReturn(this, (WindowSize.__proto__ || Object.getPrototypeOf(WindowSize)).call(this));
    _this.state = {
      width: 0
    };
    _this.setWidth = _this.setWidth.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(WindowSize, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener("resize", this.setWidth);
      this.setWidth();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener("resize", this.setWidth);
    }
  }, {
    key: "setWidth",
    value: function setWidth() {
      this.setState({
        width: window.innerWidth
      });
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.render(this.state);
    }
  }]);
  return WindowSize;
}(React.Component);
WindowSize.propTypes = {
  render: PropTypes.func.isRequired
};
WindowSize.defaultProps = {
  render: function render() {
    return React.createElement("div", null, "Left side!");
  }
};

/* ! copy-pasted from react-overflowing for easy customization before adding as dep */

var EdgeGradient =
/*#__PURE__*/
function (_React$Component) {
  _inherits(EdgeGradient, _React$Component);

  function EdgeGradient() {
    _classCallCheck(this, EdgeGradient);
    return _possibleConstructorReturn(this, (EdgeGradient.__proto__ || Object.getPrototypeOf(EdgeGradient)).apply(this, arguments));
  }

  _createClass(EdgeGradient, [{
    key: "render",
    value: function render() {
      var _rollupPluginBabelHel;

      var _props = this.props,
          gap = _props.gap,
          direction = _props.direction,
          edge = _props.edge,
          style = _props.style,
          nativeProps = _objectWithoutProperties(_props, ["gap", "direction", "edge", "style"]);
      return React.createElement("div", _extends({}, nativeProps, {
        style: _extends((_rollupPluginBabelHel = {
          width: gap / 12 < 16 ? gap / 12 : 16,
          height: "100%",
          position: "absolute",
          backgroundColor: "red",
          top: 0
        }, _defineProperty(_rollupPluginBabelHel, edge, 0), _defineProperty(_rollupPluginBabelHel, "background", "linear-gradient(to ".concat(direction, ", rgba(0,0,0, .075), transparent)")), _rollupPluginBabelHel), style)
      }));
    }
  }]);
  return EdgeGradient;
}(React.Component);
/* ! copy-pasted from react-overflowing for easy customization before adding as dep */


var Overflowing =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(Overflowing, _React$Component2);

  function Overflowing() {
    var _this;

    _classCallCheck(this, Overflowing);
    _this = _possibleConstructorReturn(this, (Overflowing.__proto__ || Object.getPrototypeOf(Overflowing)).call(this));
    _this.state = {
      left: 0,
      right: 0
    };
    _this.handleOverflow = _this.handleOverflow.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Overflowing, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // HACK: provide a better hook for updating with async content
      setTimeout(this.handleOverflow, 500);
      window.addEventListener("resize", this.handleOverflow);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener("resize", this.handleOverflow);
    }
  }, {
    key: "handleOverflow",
    value: function handleOverflow() {
      this.setState({
        left: this.containerEl.scrollLeft,
        right: this.containerEl.scrollWidth - this.containerEl.offsetWidth - this.containerEl.scrollLeft
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          children = _props2.children,
          style = _props2.style,
          nativeProps = _objectWithoutProperties(_props2, ["children", "style"]);
      return React.createElement("div", {
        style: {
          position: "relative"
        }
      }, Boolean(this.state.right) && React.createElement(EdgeGradient, {
        gap: this.state.right,
        direction: "left",
        edge: "right"
      }), React.createElement("div", _extends({
        className: "testing",
        ref: function ref(el) {
          return _this2.containerEl = el;
        }
      }, nativeProps, {
        style: _extends({
          overflow: "auto"
        }, style),
        onScroll: this.handleOverflow
      }), React.createElement("div", {
        ref: function ref(el) {
          return _this2.innerEl = el;
        }
      }, children)), Boolean(this.state.left) && React.createElement(EdgeGradient, {
        gap: this.state.left,
        direction: "right",
        edge: "left"
      }));
    }
  }]);
  return Overflowing;
}(React.Component);

exports.Overflowing = Overflowing;
exports.WindowSize = WindowSize;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=finder.umd.js.map
