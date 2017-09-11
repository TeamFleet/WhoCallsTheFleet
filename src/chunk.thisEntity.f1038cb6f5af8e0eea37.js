exports.ids = [11];
exports.modules = {

/***/ 750:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _default; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_sp_i18n__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_sp_ui_pagecontainer__ = __webpack_require__(756);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__appUtils_html_head_js__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__appLogic_database__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_sp_css_import__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__details_less__ = __webpack_require__(949);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__details_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__details_less__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }












var _default = (_dec = Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["b" /* connect */])(), _dec2 = Object(__WEBPACK_IMPORTED_MODULE_6_sp_css_import__["a" /* ImportStyle */])(__WEBPACK_IMPORTED_MODULE_7__details_less___default.a), _dec(_class = _dec2(_class = function (_React$Component) {
    _inherits(_default, _React$Component);

    function _default() {
        _classCallCheck(this, _default);

        return _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).apply(this, arguments));
    }

    _createClass(_default, [{
        key: 'render',
        value: function render() {
            if (false) console.log('thisEntity', this.data);
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_3_sp_ui_pagecontainer__["a" /* default */],
                {
                    className: this.props.className
                },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'h2',
                    null,
                    this.data._name
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'p',
                    null,
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'i',
                        null,
                        Object(__WEBPACK_IMPORTED_MODULE_2_sp_i18n__["a" /* default */])('under_construction'),
                        '...'
                    )
                )
            );
        }
    }, {
        key: 'data',
        get: function get() {
            if (!this._data && this.props.params.id) this._data = __WEBPACK_IMPORTED_MODULE_5__appLogic_database__["a" /* default */].entities[this.props.params.id];
            return this._data || {};
        }
    }], [{
        key: 'onServerRenderHtmlExtend',
        value: function onServerRenderHtmlExtend(ext, store) {
            var head = Object(__WEBPACK_IMPORTED_MODULE_4__appUtils_html_head_js__["a" /* default */])({
                store: store,
                title: __WEBPACK_IMPORTED_MODULE_5__appLogic_database__["a" /* default */].entities[store.getState().routing.locationBeforeTransitions.pathname.split('/').reverse()[0]]._name
            });

            ext.metas = ext.metas.concat(head.meta);
            ext.title = head.title;
        }
    }]);

    return _default;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class) || _class);



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

/***/ 949:
/***/ (function(module, exports) {

module.exports ={wrapper:'dd41d8cd5',css:''}

/***/ })

};;