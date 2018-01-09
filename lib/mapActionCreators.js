"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ofActions = ofActions;
exports.default = mapActionCreators;

var _rxConnect = require("./rxConnect");

function ofActions(actions) {
    return this.of(Object.keys(actions).reduce(function (result, key) {
        var action = actions[key];

        if (key.endsWith("$")) {
            result[key.slice(0, -1)] = function () {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                (0, _rxConnect.getAdapter)().next(action, args);
            };
        } else {
            result[key] = action;
        }

        return result;
    }, {}));
}

function mapActionCreators(actions) {
    var _context;

    return (_context = (0, _rxConnect.getAdapter)().Rx.Observable, ofActions).call(_context, actions);
}