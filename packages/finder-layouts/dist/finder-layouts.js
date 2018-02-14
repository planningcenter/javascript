'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));

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

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var TwoColumnFixedLeftWidth =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TwoColumnFixedLeftWidth, _React$Component);

  function TwoColumnFixedLeftWidth() {
    _classCallCheck(this, TwoColumnFixedLeftWidth);
    return _possibleConstructorReturn(this, (TwoColumnFixedLeftWidth.__proto__ || Object.getPrototypeOf(TwoColumnFixedLeftWidth)).apply(this, arguments));
  }

  _createClass(TwoColumnFixedLeftWidth, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          left = _props.left,
          leftWidth = _props.leftWidth,
          right = _props.right,
          nativeProps = _objectWithoutProperties(_props, ["left", "leftWidth", "right"]);
      return React.createElement("div", nativeProps, React.createElement("div", {
        style: {
          width: leftWidth
        }
      }, left()), React.createElement("div", {
        style: {
          width: "calc(100% - ".concat(leftWidth, "px)")
        }
      }, right()));
    }
  }]);
  return TwoColumnFixedLeftWidth;
}(React.Component);
Object.defineProperty(TwoColumnFixedLeftWidth, "defaultProps", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    leftWidth: 240,
    left: function left() {
      return React.createElement("div", null, "Left side!");
    },
    right: function right() {
      return React.createElement("div", null, "Right side!");
    }
  }
});

// import flat (default) for Finder module

exports.TwoColumnFixedLeftWidth = TwoColumnFixedLeftWidth;
//# sourceMappingURL=finder-layouts.js.map
