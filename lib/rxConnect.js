"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.getAdapter = getAdapter;
exports.default = rxConnect;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _lodash = require("lodash.isplainobject");

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require("lodash.isobject");

var _lodash4 = _interopRequireDefault(_lodash3);

var _lodash5 = require("lodash.isarray");

var _lodash6 = _interopRequireDefault(_lodash5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEFAULT_OPTIONS = {
    noDebounce: false
};

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || "Component";
}
function isObservable(obj) {
    if (!obj) {
        return false;
    }

    return getAdapter().isObservable(obj);
}

function getAdapter() {
    var adapter = rxConnect.adapter || require("./rx5Adapter");
    return adapter.__esModule ? adapter.default : adapter;
}

function rxConnect(selector) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_OPTIONS;

    return function (WrappedComponent) {
        var _class, _temp;

        return _temp = _class = function (_React$PureComponent) {
            _inherits(RxConnector, _React$PureComponent);

            function RxConnector(props) {
                _classCallCheck(this, RxConnector);

                var _this = _possibleConstructorReturn(this, (RxConnector.__proto__ || Object.getPrototypeOf(RxConnector)).call(this, props));

                _this.stateSubscription = undefined;
                _this.shouldDebounce = false;
                _this.subProps = {};


                _this.props$ = new (getAdapter().Rx.BehaviorSubject)(props);
                return _this;
            }

            _createClass(RxConnector, [{
                key: "componentWillMount",
                value: function componentWillMount() {
                    var _this2 = this;

                    var Rx = getAdapter().Rx;
                    this.shouldDebounce = false;

                    var mutations$ = selector;
                    if (!isObservable(mutations$)) {
                        if (typeof selector === 'function') {
                            mutations$ = selector(this.props$);
                        } else {
                            // eslint-disable-next-line no-console
                            console.error("Selector must be a function or an Observable. Check rxConnect of " + getDisplayName(WrappedComponent) + ". Got: ", selector);
                            return;
                        }
                    }

                    if (!isObservable(mutations$)) {
                        // eslint-disable-next-line no-undef
                        if (mutations$ && typeof mutations$[Symbol.iterator] === 'function') {
                            var _Rx$Observable;

                            mutations$ = (_Rx$Observable = Rx.Observable).merge.apply(_Rx$Observable, _toConsumableArray(mutations$));
                        } else {
                            // eslint-disable-next-line no-console
                            console.error("Selector must return an Observable or an iterator of observables. Check rxConnect of " + getDisplayName(WrappedComponent) + ". Got: ", mutations$);
                            return;
                        }
                    }

                    this.stateSubscription = mutations$.scan(function (state, mutation) {
                        if (typeof mutation === "function") {
                            return mutation(state);
                        }

                        if ((0, _lodash2.default)(mutation)) {
                            return Object.assign({}, state, mutation);
                        }

                        if ((0, _lodash4.default)(mutation) && !(0, _lodash6.default)(mutation)) {
                            return Object.assign({}, state, _extends({}, mutation));
                        }

                        // eslint-disable-next-line no-console
                        console.error("Mutation must be a plain object or function. Check rxConnect of " + getDisplayName(WrappedComponent) + ". Got: ", mutation);
                        return state;
                    }, {}).debounce(function () {
                        return !options.noDebounce && _this2.shouldDebounce ? Rx.Observable.interval(0) : Rx.Observable.of();
                    }).subscribe(function (state) {
                        _this2.subProps = state;
                        _this2.forceUpdate();
                    });
                }
            }, {
                key: "componentDidMount",
                value: function componentDidMount() {
                    this.shouldDebounce = true;
                }
            }, {
                key: "componentWillUnmount",
                value: function componentWillUnmount() {
                    getAdapter().unsubscribe(this.stateSubscription);
                }
            }, {
                key: "componentWillReceiveProps",
                value: function componentWillReceiveProps(nextProps) {
                    getAdapter().next(this.props$, nextProps);
                }
            }, {
                key: "render",
                value: function render() {
                    return _react2.default.createElement(WrappedComponent, this.subProps, this.props.children);
                }
            }]);

            RxConnector.navigationOptions = WrappedComponent.navigationOptions
            return RxConnector;
        }(_react2.default.PureComponent), _class.displayName = "RxConnector", _temp;
    };
}
