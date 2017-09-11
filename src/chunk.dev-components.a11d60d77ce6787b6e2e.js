exports.ids = [5];
exports.modules = {

/***/ 752:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _default; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_sp_ui_pagecontainer__ = __webpack_require__(756);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__appUtils_html_head_js__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__appUI_components_dev_header_jsx__ = __webpack_require__(951);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__appUI_components_button_jsx__ = __webpack_require__(953);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__appUI_components_button_group_jsx__ = __webpack_require__(955);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_sp_css_import__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_less__ = __webpack_require__(957);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__components_less__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }














var _default = (_dec = Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["b" /* connect */])(), _dec2 = Object(__WEBPACK_IMPORTED_MODULE_7_sp_css_import__["a" /* ImportStyle */])(__WEBPACK_IMPORTED_MODULE_8__components_less___default.a), _dec(_class = _dec2(_class = function (_React$Component) {
    _inherits(_default, _React$Component);

    function _default() {
        _classCallCheck(this, _default);

        return _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).apply(this, arguments));
    }

    _createClass(_default, [{
        key: 'render',
        value: function render() {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_2_sp_ui_pagecontainer__["a" /* default */],
                { className: this.props.className },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__appUI_components_dev_header_jsx__["a" /* default */], null),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(SamplesButton, null),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(SamplesButtonGroup, null)
            );
        }
    }], [{
        key: 'onServerRenderHtmlExtend',
        value: function onServerRenderHtmlExtend(ext, store) {
            var head = Object(__WEBPACK_IMPORTED_MODULE_3__appUtils_html_head_js__["a" /* default */])({
                store: store,
                title: 'Dev (Components)'
            });

            ext.metas = ext.metas.concat(head.meta);
            ext.title = head.title;
        }
    }]);

    return _default;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class) || _class);



var SamplesButton = function (_React$Component2) {
    _inherits(SamplesButton, _React$Component2);

    function SamplesButton() {
        _classCallCheck(this, SamplesButton);

        return _possibleConstructorReturn(this, (SamplesButton.__proto__ || Object.getPrototypeOf(SamplesButton)).apply(this, arguments));
    }

    _createClass(SamplesButton, [{
        key: 'render',
        value: function render() {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                null,
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'h2',
                    null,
                    'Button'
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'p',
                    null,
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        __WEBPACK_IMPORTED_MODULE_5__appUI_components_button_jsx__["a" /* default */],
                        null,
                        'Sample Button'
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        __WEBPACK_IMPORTED_MODULE_5__appUI_components_button_jsx__["a" /* default */],
                        { href: '/' },
                        'With URI link'
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        __WEBPACK_IMPORTED_MODULE_5__appUI_components_button_jsx__["a" /* default */],
                        { to: '/' },
                        'With Router link'
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        __WEBPACK_IMPORTED_MODULE_5__appUI_components_button_jsx__["a" /* default */],
                        { tag: 'span' },
                        'Custom tag name'
                    )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'h4',
                    null,
                    'Colors'
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'p',
                    null,
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        __WEBPACK_IMPORTED_MODULE_5__appUI_components_button_jsx__["a" /* default */],
                        null,
                        'Default color'
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        __WEBPACK_IMPORTED_MODULE_5__appUI_components_button_jsx__["a" /* default */],
                        { color: 'primary' },
                        'Primary'
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        __WEBPACK_IMPORTED_MODULE_5__appUI_components_button_jsx__["a" /* default */],
                        { color: 'success' },
                        'Success'
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        __WEBPACK_IMPORTED_MODULE_5__appUI_components_button_jsx__["a" /* default */],
                        { color: 'warning' },
                        'Warning'
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        __WEBPACK_IMPORTED_MODULE_5__appUI_components_button_jsx__["a" /* default */],
                        { color: 'danger' },
                        'Danger'
                    )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'h4',
                    null,
                    'Sizes'
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'p',
                    null,
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        __WEBPACK_IMPORTED_MODULE_5__appUI_components_button_jsx__["a" /* default */],
                        null,
                        'Default size'
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        __WEBPACK_IMPORTED_MODULE_5__appUI_components_button_jsx__["a" /* default */],
                        { size: 'large' },
                        'Large'
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        __WEBPACK_IMPORTED_MODULE_5__appUI_components_button_jsx__["a" /* default */],
                        { size: 'small' },
                        'Small'
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        __WEBPACK_IMPORTED_MODULE_5__appUI_components_button_jsx__["a" /* default */],
                        { size: 'tiny' },
                        'Tiny'
                    )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'h4',
                    null,
                    'States'
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'p',
                    null,
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        __WEBPACK_IMPORTED_MODULE_5__appUI_components_button_jsx__["a" /* default */],
                        null,
                        'Default state'
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        __WEBPACK_IMPORTED_MODULE_5__appUI_components_button_jsx__["a" /* default */],
                        { state: 'disabled' },
                        'Disabled'
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        __WEBPACK_IMPORTED_MODULE_5__appUI_components_button_jsx__["a" /* default */],
                        { disabled: true },
                        'Disabled another method'
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        __WEBPACK_IMPORTED_MODULE_5__appUI_components_button_jsx__["a" /* default */],
                        { state: 'active' },
                        'Active'
                    )
                )
            );
        }
    }]);

    return SamplesButton;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

var SamplesButtonGroup = function (_React$Component3) {
    _inherits(SamplesButtonGroup, _React$Component3);

    function SamplesButtonGroup() {
        _classCallCheck(this, SamplesButtonGroup);

        return _possibleConstructorReturn(this, (SamplesButtonGroup.__proto__ || Object.getPrototypeOf(SamplesButtonGroup)).apply(this, arguments));
    }

    _createClass(SamplesButtonGroup, [{
        key: 'render',
        value: function render() {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                null,
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'h2',
                    null,
                    'Button Group'
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'p',
                    null,
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        __WEBPACK_IMPORTED_MODULE_6__appUI_components_button_group_jsx__["a" /* default */],
                        null,
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            __WEBPACK_IMPORTED_MODULE_5__appUI_components_button_jsx__["a" /* default */],
                            null,
                            'Sample Button'
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            __WEBPACK_IMPORTED_MODULE_5__appUI_components_button_jsx__["a" /* default */],
                            { href: '/' },
                            'With URI link'
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            __WEBPACK_IMPORTED_MODULE_5__appUI_components_button_jsx__["a" /* default */],
                            { to: '/' },
                            'With Router link'
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            __WEBPACK_IMPORTED_MODULE_5__appUI_components_button_jsx__["a" /* default */],
                            { tag: 'span' },
                            'Custom tag name'
                        )
                    )
                )
            );
        }
    }]);

    return SamplesButtonGroup;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/***/ }),

/***/ 756:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SPPageContainer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_super_project_src_ReactApp_HTMLExtendTool__ = __webpack_require__(757);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var combineClassName = function combineClassName() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    var classNames = [];
    args.forEach(function (arg) {
        arg = arg || '';
        classNames = classNames.concat(arg.split(' ').filter(function (item) {
            return !!item;
        }));
    });
    return classNames.join(' ');
};

/**
 * React component: PageContainer
 * 
 * @export
 * @class
 * @extends {React.Component}
 * 
 * @props {*string} className
 * @props {*string} id
 * @props {*boolean} isLoading - if true, will only render (<div className="loading">Loading...</div>)
 * @props {*boolean} isReady - only for className
 * @props {*boolean} isError - only for className
 * @props {*(string|Component)} contentLoading - content/component for loading
 * @props {*function} render - will run this function when renderMain() runs
 */
var SPPageContainer = (_temp = _class = function (_React$Component) {
    _inherits(SPPageContainer, _React$Component);

    function SPPageContainer() {
        _classCallCheck(this, SPPageContainer);

        return _possibleConstructorReturn(this, (SPPageContainer.__proto__ || Object.getPrototypeOf(SPPageContainer)).apply(this, arguments));
    }

    _createClass(SPPageContainer, [{
        key: 'renderMain',
        value: function renderMain() {
            var _this2 = this;

            if (typeof this.props.render === 'function') this.props.render(this);

            if (this.props.isLoading) {
                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'sp-pagecontainer-body loading' },
                    this.props.contentLoading || 'Loading...'
                );
            } else {
                if (true) {
                    if (this.context.router && this.context.store) {
                        Object(__WEBPACK_IMPORTED_MODULE_2_react_router__["e" /* match */])({
                            routes: this.context.router.routes,
                            location: this.context.router.location
                        }, function (error, redirectLocation, renderProps) {
                            var _iteratorNormalCompletion = true;
                            var _didIteratorError = false;
                            var _iteratorError = undefined;

                            try {
                                for (var _iterator = renderProps.components[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                    var component = _step.value;

                                    if (component && component.WrappedComponent && component.WrappedComponent.onServerRenderHtmlExtend) {
                                        component.WrappedComponent.onServerRenderHtmlExtend(new __WEBPACK_IMPORTED_MODULE_3_super_project_src_ReactApp_HTMLExtendTool__["a" /* default */](), _this2.context.store);
                                    }
                                }
                            } catch (err) {
                                _didIteratorError = true;
                                _iteratorError = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion && _iterator.return) {
                                        _iterator.return();
                                    }
                                } finally {
                                    if (_didIteratorError) {
                                        throw _iteratorError;
                                    }
                                }
                            }
                        });
                    }
                }

                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'sp-pagecontainer-body' },
                    this.props.children
                );
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: combineClassName('sp-pagecontainer', this.props.className, this.props.isLoading ? 'is-loading' : '', this.props.isReady ? 'is-ready' : '', this.props.isError ? 'is-error' : '') },
                this.renderMain()
            );
        }
    }]);

    return SPPageContainer;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component), _class.contextTypes = {
    router: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
    store: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object
}, _temp);


/***/ }),

/***/ 757:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HTMLExtendTool; });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HTMLExtendTool = function () {
    function HTMLExtendTool() {
        _classCallCheck(this, HTMLExtendTool);

        this.title = '';
        this.metas = [];
    }

    _createClass(HTMLExtendTool, [{
        key: 'setTitle',
        value: function setTitle(title) {
            this.title = title;
        }
    }, {
        key: 'addMeta',
        value: function addMeta(meta) {
            this.metas.push(meta);
        }
    }]);

    return HTMLExtendTool;
}();



/***/ }),

/***/ 761:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (name, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && module.exports) {
        module.exports = factory();
    } else {
        window[name] = factory();
    }
})('check-css-prop', function () {

    "use strict";

    return function (propName) {
        if (typeof window === 'undefined') return propName;

        if (!window.elementForCheck) window.elementForCheck = document.createElement('a');

        propName = propName.replace(/\-(.){1}/g, function (letter) {
            return letter.substr(1).toUpperCase();
        });

        if (typeof window.elementForCheck.style[propName] !== 'undefined') return propName;

        var prefixes = ['webkit', 'moz', 'ms', 'o'];
        var result = '';

        if (typeof window.elementForCheck.style[propName] !== 'undefined') return propName;

        prefixes.some(function (prefix) {
            var vendorCheck = prefix + propName;
            if (typeof window.elementForCheck.style[vendorCheck] !== 'undefined') {
                result = vendorCheck;
                return vendorCheck;
            }
        });

        return result;
    };
});

/***/ }),

/***/ 764:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _default; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_check_css_prop__ = __webpack_require__(761);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_check_css_prop___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_check_css_prop__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__background_jsx__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_sp_css_import__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__main_header_less__ = __webpack_require__(765);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__main_header_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__main_header_less__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }











var _default = (_dec = Object(__WEBPACK_IMPORTED_MODULE_4_sp_css_import__["a" /* ImportStyle */])(__WEBPACK_IMPORTED_MODULE_5__main_header_less___default.a), _dec(_class = function (_React$Component) {
    _inherits(_default, _React$Component);

    function _default() {
        _classCallCheck(this, _default);

        return _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).apply(this, arguments));
    }

    _createClass(_default, [{
        key: 'getProps',
        value: function getProps() {
            var props = _extends({}, this.props);
            delete props.className;

            return props;
        }
    }, {
        key: 'renderContent',
        value: function renderContent() {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                _extends({ className: this.props.className + " main-header" }, this.getProps()),
                this.props.children,
                true && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__background_jsx__["a" /* default */], { type: 'blured' })
            );
        }
    }, {
        key: 'render',
        value: function render() {
            if (false) return this.renderContent();

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                MainHeaderPortal,
                null,
                this.renderContent()
            );
        }
    }]);

    return _default;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class);



var MainHeaderPortal = function (_React$Component2) {
    _inherits(MainHeaderPortal, _React$Component2);

    function MainHeaderPortal() {
        _classCallCheck(this, MainHeaderPortal);

        return _possibleConstructorReturn(this, (MainHeaderPortal.__proto__ || Object.getPrototypeOf(MainHeaderPortal)).apply(this, arguments));
    }

    _createClass(MainHeaderPortal, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(newProps) {
            this.renderPortal(newProps);
        }
    }, {
        key: 'renderPortal',
        value: function renderPortal() {
            var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

            if (!this.parent) {
                this.parent = document.getElementById('main-mask');
            }

            if (!this.node) {
                this.node = document.createElement('div');
                this.node.className = 'wrapper';
                this.parent.appendChild(this.node);
            }

            var children = props.children;
            // https://gist.github.com/jimfb/d99e0678e9da715ccf6454961ef04d1b
            if (typeof props.children.type === 'function') {
                children = __WEBPACK_IMPORTED_MODULE_0_react___default.a.cloneElement(props.children);
            }

            this.portal = __WEBPACK_IMPORTED_MODULE_1_react_dom___default.a.unstable_renderSubtreeIntoContainer(this, children, this.node);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.renderPortal();
        }
    }, {
        key: 'render',
        value: function render() {
            return null;
        }
    }]);

    return MainHeaderPortal;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/***/ }),

/***/ 765:
/***/ (function(module, exports) {

module.exports ={wrapper:'cca804c6',css:'.cca804c6{box-shadow:0 .5rem 1rem -.5rem rgba(0,0,0,.2);left:0;overflow:hidden;padding:0 1.5rem;position:absolute;right:0;transition:inherit}@supports ((-webkit-backdrop-filter:blur(20px)) or (backdrop-filter:blur(20px))){.cca804c6{box-shadow:0 .5rem 1rem -.5rem rgba(0,0,0,.3)}}@media (max-width:850px){.cca804c6{padding-left:1.2rem;padding-right:1.2rem}}@media (max-width:660px){.cca804c6{padding-left:.6rem;padding-right:.6rem}}.cca804c6 .background-container{z-index:-2}.cca804c6:after{background:rgba(237,240,242,.15);bottom:.05rem;content:"";height:.05rem;left:0;position:absolute;right:0}'}

/***/ }),

/***/ 951:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _default; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__appUI_components_main_header_jsx__ = __webpack_require__(764);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_sp_css_import__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__header_less__ = __webpack_require__(952);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__header_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__header_less__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








var _default = (_dec = Object(__WEBPACK_IMPORTED_MODULE_2_sp_css_import__["a" /* ImportStyle */])(__WEBPACK_IMPORTED_MODULE_3__header_less___default.a), _dec(_class = function (_React$Component) {
    _inherits(_default, _React$Component);

    function _default() {
        _classCallCheck(this, _default);

        return _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).apply(this, arguments));
    }

    _createClass(_default, [{
        key: 'render',
        value: function render() {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_1__appUI_components_main_header_jsx__["a" /* default */],
                null,
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: this.props.className },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'h2',
                        null,
                        '@appUI/components/main-header'
                    )
                )
            );
        }
    }]);

    return _default;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class);



/***/ }),

/***/ 952:
/***/ (function(module, exports) {

module.exports ={wrapper:'e6eb4da3',css:'.e6eb4da3{height:10rem;padding-top:7.5rem}.e6eb4da3 h2{margin:0}'}

/***/ }),

/***/ 953:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _default; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_sp_css_import__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__button_less__ = __webpack_require__(954);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__button_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__button_less__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var _default = (_dec = Object(__WEBPACK_IMPORTED_MODULE_2_sp_css_import__["a" /* ImportStyle */])(__WEBPACK_IMPORTED_MODULE_3__button_less___default.a), _dec(_class = function (_React$Component) {
    _inherits(_default, _React$Component);

    function _default() {
        _classCallCheck(this, _default);

        return _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).apply(this, arguments));
    }

    _createClass(_default, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                className = _props.className,
                children = _props.children,
                tag = _props.tag,
                href = _props.href,
                link = _props.link,
                to = _props.to,
                type = _props.type,
                color = _props.color,
                size = _props.size,
                state = _props.state,
                props = _objectWithoutProperties(_props, ['className', 'children', 'tag', 'href', 'link', 'to', 'type', 'color', 'size', 'state']);

            var TagName = void 0;
            if (tag) TagName = tag;else if (to) TagName = __WEBPACK_IMPORTED_MODULE_1_react_router__["b" /* Link */];else if (href || link) TagName = 'a';else TagName = 'button';

            var disabled = void 0;

            var buttonType = type || (TagName === 'button' ? 'button' : undefined);
            var linkUrl = href || link || undefined;

            if (color) className += ' is-color-' + color;

            if (size) className += ' is-size-' + size;

            if (state === 'disable' || state === 'disabled') disabled = true;else if (state) className += ' is-state-' + state;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                TagName,
                _extends({
                    className: 'button ' + className,
                    href: linkUrl,
                    to: to,
                    type: buttonType,
                    disabled: disabled
                }, props),
                children
            );
        }
    }]);

    return _default;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class);



/***/ }),

/***/ 954:
/***/ (function(module, exports) {

module.exports ={wrapper:'a66a1346',css:'.a66a1346{background:rgba(176,190,196,.15);border:.05rem solid rgba(176,190,196,.3);border-radius:.15rem;color:#d0d9dd;display:inline-block;font:inherit;line-height:1.2em;padding:calc(.25em - .05rem) .75em}html.is-webapp .a66a1346{cursor:pointer}html.is-hover .a66a1346:hover{background:rgba(176,190,196,.4);color:#fff}.a66a1346.is-state-active,.a66a1346:active,html.is-hover .a66a1346:hover.is-state-active,html.is-hover .a66a1346:hover:active{background:rgba(0,0,0,.1);border-color:rgba(176,190,196,.4);box-shadow:inset 0 .15rem .25rem .05rem rgba(0,0,0,.3);color:#d0d9dd}.a66a1346:focus{outline:0}.a66a1346:focus:not(:active){border-color:#40c4ff;box-shadow:0 0 .25rem rgba(64,196,255,.5)}.a66a1346[disabled]{color:rgba(169,193,205,.55);opacity:.6}'}

/***/ }),

/***/ 955:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _default; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_sp_css_import__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__button_group_less__ = __webpack_require__(956);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__button_group_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__button_group_less__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var _default = (_dec = Object(__WEBPACK_IMPORTED_MODULE_2_sp_css_import__["a" /* ImportStyle */])(__WEBPACK_IMPORTED_MODULE_3__button_group_less___default.a), _dec(_class = function (_React$Component) {
    _inherits(_default, _React$Component);

    function _default() {
        _classCallCheck(this, _default);

        return _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).apply(this, arguments));
    }

    _createClass(_default, [{
        key: 'render',
        value: function render() {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'span',
                {
                    className: this.props.className
                },
                this.props.children
            );
        }
    }]);

    return _default;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class);



/***/ }),

/***/ 956:
/***/ (function(module, exports) {

module.exports ={wrapper:'bbcb07c3',css:'.bbcb07c3{display:inline-block;overflow:hidden;position:relative}.bbcb07c3>.button{float:left;z-index:2}.bbcb07c3>.button:not(:first-child):not(:last-child){border-radius:0}.bbcb07c3>.button:not(:first-child){border-left-width:0}.bbcb07c3>.button:not(:first-child):focus{border-left-width:.05rem;margin-left:-.05rem}.bbcb07c3>.button:first-child{border-bottom-right-radius:0;border-top-right-radius:0}.bbcb07c3>.button:last-child{border-bottom-left-radius:0;border-top-left-radius:0}.bbcb07c3>.button:active,html.is-hover .bbcb07c3>.button:hover{z-index:1}.bbcb07c3>.button:focus{z-index:5}'}

/***/ }),

/***/ 957:
/***/ (function(module, exports) {

module.exports ={wrapper:'d83d155d',css:'.d83d155d{padding-top:10rem}.d83d155d h1{margin-top:0}'}

/***/ })

};;