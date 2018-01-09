"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _rxjs = require("rxjs");

var _rxjs2 = _interopRequireDefault(_rxjs);

var _symbolObservable = require("symbol-observable");

var _symbolObservable2 = _interopRequireDefault(_symbolObservable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

    Rx: _rxjs2.default,

    next: function next(o, value) {
        o.next(value);
    },
    isObservable: function isObservable(obj) {
        return obj && typeof obj[_symbolObservable2.default] === 'function';
    },
    unsubscribe: function unsubscribe(subscription) {
        subscription.unsubscribe();
    }
};
module.exports = exports["default"];