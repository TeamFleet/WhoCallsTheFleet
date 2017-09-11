exports.ids = [7];
exports.modules = {

/***/ 753:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _default; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_sp_ui_pagecontainer__ = __webpack_require__(756);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__appUtils_html_head_js__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__appUI_components_main_header_jsx__ = __webpack_require__(764);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__appUI_components_icon_jsx__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_sp_css_import__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__icons_less__ = __webpack_require__(958);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__icons_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__icons_less__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }













var _default = (_dec = Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["b" /* connect */])(), _dec2 = Object(__WEBPACK_IMPORTED_MODULE_6_sp_css_import__["a" /* ImportStyle */])(__WEBPACK_IMPORTED_MODULE_7__icons_less___default.a), _dec(_class = _dec2(_class = function (_React$Component) {
    _inherits(_default, _React$Component);

    _createClass(_default, null, [{
        key: 'onServerRenderHtmlExtend',
        value: function onServerRenderHtmlExtend(ext, store) {
            var head = Object(__WEBPACK_IMPORTED_MODULE_3__appUtils_html_head_js__["a" /* default */])({
                store: store,
                title: 'Dev (Icons)'
            });

            ext.metas = ext.metas.concat(head.meta);
            ext.title = head.title;
        }
    }]);

    function _default() {
        _classCallCheck(this, _default);

        return _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this));
    }

    _createClass(_default, [{
        key: 'getIcons',
        value: function getIcons() {
            if (false) return [];

            var parser = new DOMParser();
            var doc = parser.parseFromString("<svg style=\"position: absolute; width: 0; height: 0; overflow: hidden;\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n<defs>\n<symbol id=\"icon-loop\" viewBox=\"0 0 32 32\">\n\n<path d=\"M28 16v2c0 1.102-0.898 2-2 2h-14.004l0.004-4-8 6 8 6-0.004-4h14.004c3.309 0 6-2.695 6-6v-2h-4zM4 14c0-1.105 0.898-2 2-2h14v4l7.992-6-7.992-6v4h-14c-3.309 0-6 2.688-6 6v2h4v-2z\"></path>\n</symbol>\n<symbol id=\"icon-hanger\" viewBox=\"0 0 32 32\">\n\n<path d=\"M29.541 27.159l-13.541-8.705v-0.989c1.22-0.705 2-2.021 2-3.465 0-2.206-1.794-4-4-4-1.692 0-3.208 1.072-3.772 2.666-0.184 0.521 0.089 1.092 0.61 1.276s1.092-0.089 1.276-0.61c0.282-0.797 1.040-1.333 1.886-1.333 1.103 0 2 0.897 2 2 0 0.846-0.536 1.605-1.333 1.887-0.4 0.141-0.667 0.519-0.667 0.943l-0 1.625-13.541 8.705c-0.286 0.184-0.459 0.501-0.459 0.841v1c0 1.654 1.346 3 3 3h24c1.654 0 3-1.346 3-3v-1c0-0.34-0.173-0.657-0.459-0.841zM28 29c0 0.551-0.449 1-1 1h-24c-0.551 0-1-0.449-1-1v-0.454l13-8.357 13 8.357v0.454z\"></path>\n</symbol>\n<symbol id=\"icon-search\" viewBox=\"0 0 32 32\">\n\n<path d=\"M31.008 27.231l-7.58-6.447c-0.784-0.705-1.622-1.029-2.299-0.998 1.789-2.096 2.87-4.815 2.87-7.787 0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12c2.972 0 5.691-1.081 7.787-2.87-0.031 0.677 0.293 1.515 0.998 2.299l6.447 7.58c1.104 1.226 2.907 1.33 4.007 0.23s0.997-2.903-0.23-4.007zM12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z\"></path>\n</symbol>\n<symbol id=\"icon-cog\" viewBox=\"0 0 32 32\">\n\n<path d=\"M29.181 19.070c-1.679-2.908-0.669-6.634 2.255-8.328l-3.145-5.447c-0.898 0.527-1.943 0.829-3.058 0.829-3.361 0-6.085-2.742-6.085-6.125h-6.289c0.008 1.044-0.252 2.103-0.811 3.070-1.679 2.908-5.411 3.897-8.339 2.211l-3.144 5.447c0.905 0.515 1.689 1.268 2.246 2.234 1.676 2.903 0.672 6.623-2.241 8.319l3.145 5.447c0.895-0.522 1.935-0.82 3.044-0.82 3.35 0 6.067 2.725 6.084 6.092h6.289c-0.003-1.034 0.259-2.080 0.811-3.038 1.676-2.903 5.399-3.894 8.325-2.219l3.145-5.447c-0.899-0.515-1.678-1.266-2.232-2.226zM16 22.479c-3.578 0-6.479-2.901-6.479-6.479s2.901-6.479 6.479-6.479c3.578 0 6.479 2.901 6.479 6.479s-2.901 6.479-6.479 6.479z\"></path>\n</symbol>\n<symbol id=\"icon-puzzle\" viewBox=\"0 0 32 32\">\n\n<path d=\"M29.948 8.008h-5.264c-1.357-0.002-2.709-0.094-1.391-2.421 1.321-2.331 2.254-5.595-3.050-5.595s-4.371 3.264-3.050 5.595c1.319 2.327-0.034 2.418-1.391 2.421h-5.746c-1.129 0-2.052 0.924-2.052 2.052v6.387c0 1.36 0.369 2.72-1.962 1.399s-6.042-2.254-6.042 3.050c0 5.303 3.711 4.371 6.042 3.050s1.962 0.039 1.962 1.399v4.611c0 1.129 0.924 2.052 2.052 2.052h5.738c1.36 0 2.72-0.544 1.399-2.875s-2.254-5.595 3.050-5.595 4.371 3.264 3.050 5.595c-1.321 2.331 0.039 2.875 1.399 2.875h5.256c1.129 0 2.052-0.924 2.052-2.052v-19.896c0-1.129-0.923-2.052-2.052-2.052z\"></path>\n</symbol>\n<symbol id=\"icon-puzzle2\" viewBox=\"0 0 32 32\">\n\n<path d=\"M29.085 32h-4.904c-1.544 0-2.23-0.619-2.533-1.138-0.46-0.788-0.34-1.813 0.357-3.047 0.758-1.344 1.012-2.425 0.696-2.966-0.296-0.507-1.244-0.786-2.671-0.786s-2.375 0.279-2.671 0.786c-0.316 0.541-0.062 1.622 0.696 2.965 0.697 1.235 0.817 2.26 0.357 3.048-0.303 0.519-0.989 1.138-2.533 1.138h-4.954c-1.607 0-2.915-1.311-2.915-2.923v-4.321c0-0.175 0.006-0.341 0.011-0.502 0.001-0.039 0.003-0.082 0.004-0.127-0.099 0.049-0.215 0.11-0.351 0.188-0.876 0.498-2.737 1.092-4.058 1.092-1.087 0-1.993-0.411-2.62-1.189-0.669-0.831-0.995-2.018-0.995-3.63s0.325-2.799 0.995-3.63c0.627-0.778 1.533-1.189 2.62-1.189 1.321 0 3.182 0.594 4.058 1.092 0.136 0.077 0.252 0.139 0.351 0.188-0.001-0.045-0.003-0.088-0.004-0.127-0.005-0.161-0.011-0.327-0.011-0.502l-0.025-5.48c0-1.616 1.308-2.928 2.915-2.928h4.962c0.146-0 0.521-0.001 0.765-0.037-0.042-0.143-0.135-0.379-0.338-0.74-1.166-2.066-1.395-4.234-0.681-5.457 0.689-1.179 2.168-1.777 4.398-1.777s3.71 0.598 4.398 1.777c0.714 1.223 0.485 3.391-0.681 5.457-0.204 0.361-0.296 0.597-0.338 0.74 0.244 0.036 0.619 0.036 0.767 0.037h4.91c1.607 0 2.915 1.311 2.915 2.923l0.025 18.142c0 1.613-1.308 2.924-2.915 2.924zM23.377 29.852c0.058 0.046 0.295 0.148 0.804 0.148h4.904c0.505 0 0.915-0.414 0.915-0.923l-0.025-18.142c0-0.51-0.41-0.924-0.915-0.924h-4.912c-0.801-0.001-2.010-0.003-2.569-0.962-0.537-0.921-0.029-2.038 0.4-2.798 0.758-1.344 1.012-2.925 0.696-3.466-0.296-0.507-1.244-0.786-2.671-0.786s-2.375 0.279-2.671 0.786c-0.316 0.541-0.062 2.122 0.696 3.466 0.429 0.76 0.937 1.877 0.4 2.797-0.559 0.959-1.768 0.961-2.568 0.962h-4.963c-0.505 0-0.915 0.414-0.915 0.923l0.025 5.48c0 0.146 0.005 0.295 0.010 0.44 0.023 0.7 0.048 1.425-0.458 1.947-0.191 0.197-0.53 0.432-1.062 0.432-0 0-0 0-0 0-0.483 0-1.043-0.196-1.815-0.635-0.927-0.528-2.389-0.831-3.068-0.831-0.442 0-1.615 0-1.615 2.82s1.173 2.819 1.615 2.819c0.679 0 2.141-0.303 3.069-0.831 0.772-0.439 1.332-0.635 1.815-0.635 0.533 0 0.872 0.235 1.063 0.432 0.505 0.523 0.481 1.247 0.458 1.947-0.005 0.145-0.010 0.294-0.010 0.435v4.321c0 0.509 0.41 0.923 0.915 0.923h4.954c0.509 0 0.746-0.103 0.804-0.148 0.009-0.055 0.027-0.352-0.37-1.054-1.166-2.066-1.395-3.734-0.681-4.957 0.689-1.179 2.168-1.777 4.398-1.777s3.71 0.598 4.398 1.777c0.714 1.223 0.485 2.891-0.681 4.957-0.397 0.703-0.378 0.999-0.37 1.054z\"></path>\n</symbol>\n<symbol id=\"icon-menu\" viewBox=\"0 0 32 32\">\n\n<path d=\"M2 6h28v4h-28v-4z\"></path>\n<path d=\"M2 14h28v4h-28v-4z\"></path>\n<path d=\"M2 22h28v4h-28v-4z\"></path>\n</symbol>\n<symbol id=\"icon-warning2\" viewBox=\"0 0 32 32\">\n\n<path d=\"M31.561 28.617v0l-13.659-27.222c-0.523-0.93-1.213-1.395-1.903-1.395s-1.379 0.465-1.903 1.395l-13.659 27.222c-1.046 1.86-0.156 3.383 1.978 3.383h27.166c2.134 0 3.025-1.522 1.978-3.383zM16 28c-1.105 0-2-0.895-2-2s0.895-2 2-2c1.105 0 2 0.895 2 2s-0.895 2-2 2zM18 20c0 1.105-0.895 2-2 2s-2-0.895-2-2v-6c0-1.105 0.895-2 2-2s2 0.895 2 2v6z\"></path>\n</symbol>\n<symbol id=\"icon-question6\" viewBox=\"0 0 32 32\">\n\n<path d=\"M16 26c-1.105 0-2-0.895-2-2v-2.055c0-2.819 2.249-4.953 4.424-7.017 1.758-1.668 3.576-3.394 3.576-4.928 0-2.986-2.164-6-7-6-3.574 0-6.565 2.674-6.957 6.22-0.121 1.098-1.109 1.89-2.208 1.768s-1.889-1.11-1.768-2.208c0.296-2.675 1.564-5.145 3.571-6.953 2.023-1.823 4.637-2.827 7.362-2.827 2.949 0 5.668 0.927 7.656 2.61 2.156 1.825 3.344 4.45 3.344 7.39 0 3.253-2.562 5.684-4.823 7.829-1.489 1.413-3.177 3.015-3.177 4.116l0 2.055c0 1.105-0.895 2-2 2z\"></path>\n<path d=\"M18 30c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z\"></path>\n</symbol>\n<symbol id=\"icon-cross\" viewBox=\"0 0 32 32\">\n\n<path d=\"M27.914 6.914l-2.828-2.828-9.086 9.086-9.086-9.086-2.828 2.828 9.086 9.086-9.086 9.086 2.828 2.828 9.086-9.086 9.086 9.086 2.828-2.828-9.086-9.086z\"></path>\n</symbol>\n<symbol id=\"icon-arrow-up3\" viewBox=\"0 0 32 32\">\n\n<path d=\"M0 21l3 3 13-13 13 13 3-3-16-16-16 16z\"></path>\n</symbol>\n<symbol id=\"icon-arrow-right3\" viewBox=\"0 0 32 32\">\n\n<path d=\"M11 0l-3 3 13 13-13 13 3 3 16-16-16-16z\"></path>\n</symbol>\n<symbol id=\"icon-arrow-down3\" viewBox=\"0 0 32 32\">\n\n<path d=\"M32 11l-3-3-13 13-13-13-3 3 16 16 16-16z\"></path>\n</symbol>\n<symbol id=\"icon-arrow-left3\" viewBox=\"0 0 32 32\">\n\n<path d=\"M21 32l3-3-13-13 13-13-3-3-16 16 16 16z\"></path>\n</symbol>\n<symbol id=\"icon-sort-amount-desc\" viewBox=\"0 0 32 32\">\n\n<path d=\"M10 24v-24h-4v24h-5l7 7 7-7h-5z\"></path>\n<path d=\"M14 0h18v4h-18v-4z\"></path>\n<path d=\"M14 6h14v4h-14v-4z\"></path>\n<path d=\"M14 12h10v4h-10v-4z\"></path>\n<path d=\"M14 18h6v4h-6v-4z\"></path>\n</symbol>\n<symbol id=\"icon-checkbox-checked\" viewBox=\"0 0 32 32\">\n\n<path d=\"M28 0h-24c-2.2 0-4 1.8-4 4v24c0 2.2 1.8 4 4 4h24c2.2 0 4-1.8 4-4v-24c0-2.2-1.8-4-4-4zM14 24.828l-7.414-7.414 2.828-2.828 4.586 4.586 9.586-9.586 2.828 2.828-12.414 12.414z\"></path>\n</symbol>\n<symbol id=\"icon-paragraph-left\" viewBox=\"0 0 32 32\">\n\n<path d=\"M0 2h32v4h-32zM0 10h20v4h-20zM0 26h20v4h-20zM0 18h32v4h-32z\"></path>\n</symbol>\n<symbol id=\"icon-share3\" viewBox=\"0 0 32 32\">\n\n<path d=\"M27 22c-1.411 0-2.685 0.586-3.594 1.526l-13.469-6.734c0.041-0.258 0.063-0.522 0.063-0.791s-0.022-0.534-0.063-0.791l13.469-6.734c0.909 0.94 2.183 1.526 3.594 1.526 2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5c0 0.269 0.022 0.534 0.063 0.791l-13.469 6.734c-0.909-0.94-2.183-1.526-3.594-1.526-2.761 0-5 2.239-5 5s2.239 5 5 5c1.411 0 2.685-0.586 3.594-1.526l13.469 6.734c-0.041 0.258-0.063 0.522-0.063 0.791 0 2.761 2.239 5 5 5s5-2.239 5-5c0-2.761-2.239-5-5-5z\"></path>\n</symbol>\n</defs>\n</svg>\n", "image/svg+xml");
            var icons = [];

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = doc.querySelectorAll('symbol[id]')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var symbol = _step.value;

                    icons.push(symbol.getAttribute('id').replace(/^icon\-/, ''));
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

            return icons;
        }
    }, {
        key: 'render',
        value: function render() {
            this.getIcons();
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_2_sp_ui_pagecontainer__["a" /* default */],
                { className: this.props.className },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    __WEBPACK_IMPORTED_MODULE_4__appUI_components_main_header_jsx__["a" /* default */],
                    null,
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        { className: 'header', style: { height: "100px", paddingTop: "20px" } },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            'h1',
                            null,
                            'Icons'
                        )
                    )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'icon-sample-group' },
                    this.getIcons().map(function (icon, index) {
                        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(IconSample, { icon: icon, key: index });
                    })
                )
            );
        }
    }]);

    return _default;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class) || _class);



var IconSample = function (_React$Component2) {
    _inherits(IconSample, _React$Component2);

    function IconSample() {
        _classCallCheck(this, IconSample);

        return _possibleConstructorReturn(this, (IconSample.__proto__ || Object.getPrototypeOf(IconSample)).apply(this, arguments));
    }

    _createClass(IconSample, [{
        key: 'render',
        value: function render() {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'label',
                { className: 'icon-sample' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'text', value: this.props.icon, readOnly: true }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__appUI_components_icon_jsx__["a" /* default */], { icon: this.props.icon, className: 'icon' })
            );
        }
    }]);

    return IconSample;
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

/***/ 958:
/***/ (function(module, exports) {

module.exports ={wrapper:'d7123df4',css:'.d7123df4{padding-top:5rem}.d7123df4 .icon-sample-group{display:grid;grid-column-gap:1rem;grid-row-gap:.5rem;grid-template-columns:repeat(auto-fit,minmax(6.6rem,1fr))}.d7123df4 .icon-sample{-webkit-align-items:center;-webkit-box-align:center;-webkit-box-direction:normal;-webkit-box-orient:horizontal;-webkit-flex-flow:row nowrap;align-items:center;display:-webkit-box;display:-webkit-flex;display:flex;flex-flow:row nowrap;height:2.1rem}.d7123df4 .icon-sample .icon{-webkit-box-flex:0;-webkit-box-ordinal-group:2;-webkit-flex:0 0 1.6rem;-webkit-order:1;flex:0 0 1.6rem;height:1.6rem;order:1;width:1.6rem}.d7123df4 .icon-sample input{-webkit-box-flex:1;-webkit-box-ordinal-group:3;-webkit-flex:1 0 auto;-webkit-order:2;flex:1 0 auto;font-size:.6rem;margin:0 0 0 .4rem;order:2;padding:.2em .35em;width:0}.d7123df4 .icon-sample input:focus~.icon{-webkit-filter:drop-shadow(0 0 .25rem #000);fill:#40c4ff;filter:drop-shadow(0 0 .25rem #000)}'}

/***/ })

};;