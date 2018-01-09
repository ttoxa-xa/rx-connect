"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _rx = require("rx/dist/rx.lite");

var _rx2 = _interopRequireDefault(_rx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

    Rx: _rx2.default,

    next: function next(o, value) {
        o.onNext(value);
    },
    isObservable: function isObservable(obj) {
        return obj && _rx2.default.Observable.isObservable(obj);
    },
    unsubscribe: function unsubscribe(subscription) {
        subscription.dispose();
    }
};
module.exports = exports["default"];