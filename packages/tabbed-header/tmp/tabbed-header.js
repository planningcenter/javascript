"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabsContainer = TabsContainer;
exports.PageTitleContainer = PageTitleContainer;
exports.FlexibleSpacer = FlexibleSpacer;
exports.PageTitle = PageTitle;
exports.Tab = Tab;
exports.EightPixelFlexTabSpacer = EightPixelFlexTabSpacer;
exports.Container = Container;
exports.TabNotificationBubble = TabNotificationBubble;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function TabsContainer(props) {
  return _react.default.createElement("div", _extends({
    style: {
      display: "flex",
      alignItems: "top",
      marginTop: 16
    }
  }, props));
}

function PageTitleContainer(props) {
  return _react.default.createElement("div", _extends({
    style: {
      display: "flex",
      alignItems: "center",
      marginTop: 24,
      marginBottom: 24
    }
  }, props));
}

function FlexibleSpacer() {
  return _react.default.createElement("div", {
    style: {
      margin: "auto"
    }
  });
}

function PageTitle(_ref) {
  var _ref$as = _ref.as,
      As = _ref$as === void 0 ? "span" : _ref$as,
      style = _ref.style,
      props = _objectWithoutProperties(_ref, ["as", "style"]);

  return _react.default.createElement(As, _extends({
    style: _objectSpread({
      margin: 0,
      color: "white",
      fontSize: 22,
      fontWeight: 700
    }, style)
  }, props));
}

function Tab(_ref2) {
  var target = _ref2.target,
      children = _ref2.children,
      style = _ref2.style,
      props = _objectWithoutProperties(_ref2, ["target", "children", "style"]);

  return _react.default.createElement("a", _extends({
    style: _objectSpread({
      backgroundColor: target === true ? "white" : "rgba(255,255,255, .8)",
      fontWeight: target === true ? 700 : 400,
      color: target === true ? "#000" : "#444",
      paddingTop: 16,
      paddingRight: 24,
      paddingBottom: 16,
      paddingLeft: 24,
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4
    }, style)
  }, props), children);
}

function EightPixelFlexTabSpacer() {
  return _react.default.createElement("div", {
    style: {
      margin: 4
    }
  });
}

function Container(_ref3) {
  var style = _ref3.style,
      props = _objectWithoutProperties(_ref3, ["style"]);

  return _react.default.createElement("div", _extends({
    style: _objectSpread({
      display: "flex",
      flexDirection: "column",
      backgroundColor: "lightgray",
      paddingLeft: 24,
      paddingRight: 24
    }, style)
  }, props));
}

function TabNotificationBubble(_ref4) {
  var children = _ref4.children,
      style = _ref4.style,
      props = _objectWithoutProperties(_ref4, ["children", "style"]);

  return _react.default.createElement("span", _extends({
    style: _objectSpread({
      backgroundColor: "rgba(0,0,0, .12)",
      borderRadius: 9999,
      display: "inline-block",
      padding: 8,
      margin: -8,
      marginLeft: 8,
      fontWeight: 700
    }, style)
  }, props), children);
}