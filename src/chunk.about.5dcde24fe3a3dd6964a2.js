exports.ids = [9];
exports.modules = {

/***/ 755:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return About; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_sp_i18n__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_sp_ui_pagecontainer__ = __webpack_require__(756);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__appUtils_html_head_js__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_sp_css_import__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__styles_less__ = __webpack_require__(984);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__styles_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__styles_less__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }











var About = (_dec = Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["b" /* connect */])(), _dec2 = Object(__WEBPACK_IMPORTED_MODULE_5_sp_css_import__["a" /* ImportStyle */])(__WEBPACK_IMPORTED_MODULE_6__styles_less___default.a), _dec(_class = _dec2(_class = function (_React$Component) {
    _inherits(About, _React$Component);

    function About() {
        _classCallCheck(this, About);

        return _possibleConstructorReturn(this, (About.__proto__ || Object.getPrototypeOf(About)).apply(this, arguments));
    }

    _createClass(About, [{
        key: 'render',
        value: function render() {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_3_sp_ui_pagecontainer__["a" /* default */],
                {
                    className: this.props.className
                },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'p',
                    null,
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'i',
                        null,
                        Object(__WEBPACK_IMPORTED_MODULE_2_sp_i18n__["a" /* default */])('under_construction'),
                        '...'
                    )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    null,
                    'Based on ',
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'a',
                        { href: 'https://github.com/websage-team/super-project', target: '_blank' },
                        'Super Project'
                    ),
                    ' v',
                    __webpack_require__(985).version
                )
            );
        }
    }], [{
        key: 'onServerRenderHtmlExtend',
        value: function onServerRenderHtmlExtend(ext, store) {
            var head = Object(__WEBPACK_IMPORTED_MODULE_4__appUtils_html_head_js__["a" /* default */])({
                store: store,
                title: Object(__WEBPACK_IMPORTED_MODULE_2_sp_i18n__["a" /* default */])('nav.about')
            });

            ext.metas = ext.metas.concat(head.meta);
            ext.title = head.title;
        }
    }]);

    return About;
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

/***/ 984:
/***/ (function(module, exports) {

module.exports ={wrapper:'dd41d8cd0',css:''}

/***/ }),

/***/ 985:
/***/ (function(module, exports) {

module.exports = {"name":"super-project","version":"1.5.0","description":"Base framework for Super Project.","main":"","scripts":{"test":"echo \"Error: no test specified\" && exit 1"},"repository":{"type":"git","url":"https://github.com/websage-team/super-project.git"},"keywords":["react","style","import-style","import-css"],"author":"cs_victor@126.com,dongwenxiao,diablohu","license":"Apache 2.0","bugs":{"url":"https://github.com/websage-team/super-project/issues"},"homepage":"https://github.com/websage-team/super-project","dependencies":{"sp-css-loader":"^1.1.3","sp-css-import":"^1.6.0","sp-koa-views":"^1.0.1","sp-i18n":"^2.2.0","sp-ui-pagecontainer":"^2.0.0","sp-pwa":"^2.1.0","sp-isomorphic-utils":"^1.0.1","koa":"^2.3.0","koa-body":"^2.3.0","koa-compress":"^2.0.0","koa-convert":"^1.2.0","koa-html-minifier":"^1.0.1","koa-json":"^1.1.1","koa-log4":"^2.2.1","koa-multer":"^1.0.2","koa-onerror":"^3.1.0","koa-response-time":"^2.0.0","koa-router":"^7.2.1","koa-static":"^3.0.0","koa-compose":"^3.2.1","koa-helmet":"^3.2.0","react":"15.x","react-dom":"15.x","react-router":"3.x","redux":"3.x","redux-thunk":"2.x","react-redux":"5.x","react-router-redux":"4.x","isomorphic-fetch":"^2.2.1","ejs":"^2.5.7","xmlify":"^1.1.0","yargs":"^8.0.2","md5":"^2.2.1","sha1":"^1.1.1","underscore":"1.8.3","is_js":"^0.9.0","babel-core":"^6.26.0","babel-polyfill":"^6.26.0","babel-preset-env":"1.6.0","babel-preset-react":"^6.24.1","babel-preset-stage-0":"^6.24.1","babel-preset-es2015":"^6.24.1","babel-preset-es2015-loose":"^8.0.0","babel-plugin-add-module-exports":"^0.2.1","babel-plugin-transform-decorators-legacy":"^1.3.4","babel-plugin-transform-runtime":"^6.23.0","babel-plugin-transform-regenerator":"^6.26.0","babel-plugin-transform-class-properties":"^6.24.1","eslint":"^4.6.1","eslint-plugin-react":"^7.3.0","babel-eslint":"^7.2.3","webpack":"^3.5.6","webpack-dev-server":"^2.7.1","webpack-dashboard":"^0.4.0","webpack-dev-middleware":"^1.12.0","webpack-hot-middleware":"^2.19.1","babel-loader":"^7.1.2","json-loader":"^0.5.7","file-loader":"^0.11.2","url-loader":"^0.5.9","react-hot-loader":"^3.0.0-beta.6","postcss-loader":"^2.0.6","css-loader":"^0.28.7","less-loader":"^4.0.5","sass-loader":"^6.0.6","style-loader":"^0.18.2","markdown-loader":"^2.0.1","html-loader":"^0.5.1","raw-loader":"^0.5.1","rimraf":"^2.6.1","copyfiles":"^1.2.0","autoprefixer":"^7.1.4","less":"^2.7.2","classlist-polyfill":"^1.2.0","es5-shim":"^4.5.9","fs-extra":"^4.0.1","cross-env":"^5.0.5"},"peerDependencies":{"react":"15.x","react-dom":"15.x","react-router":"3.x","redux":"3.x","redux-thunk":"2.x","react-redux":"5.x","react-router-redux":"4.x"}}

/***/ })

};;