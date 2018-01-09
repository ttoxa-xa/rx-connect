"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ofActions = exports.mapActionCreators = exports.rxConnect = undefined;

var _mapActionCreators2 = require("./mapActionCreators");

Object.defineProperty(exports, "ofActions", {
  enumerable: true,
  get: function get() {
    return _mapActionCreators2.ofActions;
  }
});

var _rxConnect2 = require("./rxConnect");

var _rxConnect3 = _interopRequireDefault(_rxConnect2);

var _mapActionCreators3 = _interopRequireDefault(_mapActionCreators2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.rxConnect = _rxConnect3.default;
exports.mapActionCreators = _mapActionCreators3.default;