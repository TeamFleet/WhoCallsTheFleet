exports.ids = [6];
exports.modules = {

/***/ 747:
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__appUI_components_link_entity__ = __webpack_require__(887);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }











// import { ImportStyle } from 'sp-css-import'

// @ImportStyle(style)
var _default = (_dec = Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["b" /* connect */])(), _dec(_class = function (_React$Component) {
    _inherits(_default, _React$Component);

    function _default() {
        _classCallCheck(this, _default);

        return _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).apply(this, arguments));
    }

    _createClass(_default, [{
        key: 'render',
        value: function render() {
            var listCVs = [];
            var listArtists = [];

            for (var id in __WEBPACK_IMPORTED_MODULE_5__appLogic_database__["a" /* default */].entities) {
                var entity = __WEBPACK_IMPORTED_MODULE_5__appLogic_database__["a" /* default */].entities[id];
                if (!entity.relation) continue;
                if (Array.isArray(entity.relation.cv) && entity.relation.cv.length) listCVs.push(entity);
                if (Array.isArray(entity.relation.illustrator) && entity.relation.illustrator.length) listArtists.push(entity);
            }

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
                    'h2',
                    null,
                    Object(__WEBPACK_IMPORTED_MODULE_2_sp_i18n__["a" /* default */])('seiyuu')
                ),
                listCVs.map(function (entity) {
                    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__appUI_components_link_entity__["a" /* default */], { entity: entity, key: entity.id });
                }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'h2',
                    null,
                    Object(__WEBPACK_IMPORTED_MODULE_2_sp_i18n__["a" /* default */])('artist')
                )
            );
        }
    }], [{
        key: 'onServerRenderHtmlExtend',
        value: function onServerRenderHtmlExtend(ext, store) {
            var head = Object(__WEBPACK_IMPORTED_MODULE_4__appUtils_html_head_js__["a" /* default */])({
                store: store,
                title: Object(__WEBPACK_IMPORTED_MODULE_2_sp_i18n__["a" /* default */])('nav.entities')
            });

            ext.metas = ext.metas.concat(head.meta);
            ext.title = head.title;
        }
    }]);

    return _default;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class);



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

/***/ 760:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__appLogic_database__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_kckit_src_class_ship_js__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_kckit_src_class_ship_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_kckit_src_class_ship_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_kckit_src_class_entity_js__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_kckit_src_class_entity_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_kckit_src_class_entity_js__);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };






var ext = true && self._html && self._html.classList.contains('webp') ? '.webp' : '.png';

var getUri = function getUri(type, id, file, revision) {
    if ((typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'object') {
        if (type instanceof __WEBPACK_IMPORTED_MODULE_1_kckit_src_class_ship_js___default.a) return getUri('ship', type.id, id);
        if (type instanceof __WEBPACK_IMPORTED_MODULE_2_kckit_src_class_entity_js___default.a) return getUri('entity', type.id, id);
    }

    if (typeof id !== 'undefined' && typeof file === 'undefined') {
        var arr = id.split('/');
        if (arr.length > 1) return getUri(type, arr[0], arr[1].split('.')[0]);
        return '';
    }

    if (revision) revision = "?" + revision;else revision = '';

    switch (type) {
        case 'ship':
        case 'ships':
            return 'ships/' + __WEBPACK_IMPORTED_MODULE_0__appLogic_database__["a" /* default */].ships[id].getPic(file, ext);

        case 'ship-extra':
        case 'ships-extra':
            return 'ships-extra/' + id + '/' + file + ext + revision;

        case 'equipment':
        case 'equipments':
            return 'equipments/' + id + '/' + file + ext + revision;

        case 'entity':
        case 'entities':
            return 'entities/' + id + '/' + file + ext + revision;

        case 'enemy':
        case 'enemies':
            return 'enemies/' + id + '/' + file + ext + revision;
    }
};

/* harmony default export */ __webpack_exports__["a"] = (function (type, id, file) {
    if (false) return '';

    // ? 'https://yuubari.fleet.moe/client'
    var base =  true ? '' : __DEV__ ? '/app' : __PUBLIC__;

    // const folder = __SPA__ ? '../pics/' : '/_pics/'
    var folder =  true ? __webpack_require__(741).remote.getGlobal('__path_pics') : '/_pics/';

    return base + folder + getUri(type, id, file);
});

/***/ }),

/***/ 762:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function (type, id) {
    switch (type) {
        case 'ship':
        case 'ships':
            return '/ships/' + id;

        case 'item':
        case 'items':
        case 'equipment':
        case 'equipments':
            return '/equipments/' + id;

        case 'entity':
        case 'entities':
            return '/entities/' + id;
    }
});

/***/ }),

/***/ 773:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LinkTypeNormal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_sp_css_import__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__normal_less__ = __webpack_require__(774);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__normal_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__normal_less__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var LinkTypeNormal = (_dec = Object(__WEBPACK_IMPORTED_MODULE_2_sp_css_import__["a" /* ImportStyle */])(__WEBPACK_IMPORTED_MODULE_3__normal_less___default.a), _dec(_class = function (_React$Component) {
    _inherits(LinkTypeNormal, _React$Component);

    function LinkTypeNormal() {
        _classCallCheck(this, LinkTypeNormal);

        return _possibleConstructorReturn(this, (LinkTypeNormal.__proto__ || Object.getPrototypeOf(LinkTypeNormal)).apply(this, arguments));
    }

    _createClass(LinkTypeNormal, [{
        key: 'renderName',
        value: function renderName(name) {
            if (typeof name === 'string') {
                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'span',
                    { className: 'name' },
                    name
                );
            }
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.cloneElement(name, {
                className: 'name'
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                pic = _props.pic,
                avatar = _props.avatar,
                image = _props.image,
                src = _props.src,
                picture = _props.picture,
                img = _props.img,
                name = _props.name,
                title = _props.title,
                text = _props.text,
                to = _props.to,
                href = _props.href,
                link = _props.link,
                props = _objectWithoutProperties(_props, ['pic', 'avatar', 'image', 'src', 'picture', 'img', 'name', 'title', 'text', 'to', 'href', 'link']);

            var thisPic = pic || avatar || image || src || picture || img;
            var thisName = name || title || text || null;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_1_react_router__["b" /* Link */],
                _extends({
                    to: to || href || link
                }, props),
                thisPic && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span', {
                    className: 'pic',
                    style: {
                        backgroundImage: 'url(' + thisPic + ')'
                    }
                }),
                thisName && this.renderName(thisName),
                this.props.children
            );
        }
    }]);

    return LinkTypeNormal;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class);


/***/ }),

/***/ 774:
/***/ (function(module, exports) {

module.exports ={wrapper:'aac42ba8',css:'.aac42ba8{color:#fff;height:2rem;min-width:9rem;position:relative}.aac42ba8,.aac42ba8:before{display:inline-block;vertical-align:middle}.aac42ba8:before{content:"";height:100%;overflow:hidden;width:0}.aac42ba8:after{border-radius:0 .25rem .25rem 0;bottom:0;content:"";left:1rem;position:absolute;right:0;top:0;z-index:-10}.aac42ba8 .pic{background:no-repeat -2.5rem 0/contain;display:block;height:100%;left:-.25rem;pointer-events:none;position:absolute;right:0;top:0;z-index:-2}.aac42ba8 .name{display:inline-block;line-height:1.1em;position:relative;transition:none;vertical-align:middle;z-index:2}.aac42ba8 .name-suffix,.aac42ba8 .name-type{display:block;font-size:.75em;font-weight:400;line-height:1.05em}.aac42ba8 .name-type{margin-bottom:.15em;transition:none}.aac42ba8 .name-suffix{color:#a9c1cd;margin-left:.2rem;margin-top:.15em}html.is-hover .aac42ba8:hover{color:#40c4ff}html.is-hover .aac42ba8:hover:after{background:rgba(0,0,0,.15)}html.is-hover .aac42ba8:hover .name-suffix{color:#03a9f4}.aac42ba8:active,.aac42ba8:active .name-suffix,html.is-hover .aac42ba8:hover:active,html.is-hover .aac42ba8:hover:active .name-suffix{color:hsla(0,0%,100%,.5)}.aac42ba8:active:after{background:rgba(0,0,0,.15)}.aac42ba8:active .name-suffix{color:inherit;transition:inherit}[data-locale=en] .aac42ba8 .name{font-size:.7rem}'}

/***/ }),

/***/ 887:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LinkEntity; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__normal_jsx__ = __webpack_require__(773);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__appUtils_get_entity_js__ = __webpack_require__(888);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__appUtils_get_pic_js__ = __webpack_require__(760);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__appUtils_get_link_js__ = __webpack_require__(762);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_sp_css_import__ = __webpack_require__(41);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }










var checkShow = function checkShow(value) {
    return value || typeof value === 'undefined';
};

var LinkEntity = (_dec = Object(__WEBPACK_IMPORTED_MODULE_5_sp_css_import__["a" /* ImportStyle */])(__webpack_require__(889)), _dec(_class = function (_React$Component) {
    _inherits(LinkEntity, _React$Component);

    function LinkEntity() {
        _classCallCheck(this, LinkEntity);

        return _possibleConstructorReturn(this, (LinkEntity.__proto__ || Object.getPrototypeOf(LinkEntity)).apply(this, arguments));
    }

    _createClass(LinkEntity, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                entity = _props.entity,
                id = _props.id,
                pic = _props.pic,
                name = _props.name,
                children = _props.children,
                props = _objectWithoutProperties(_props, ['entity', 'id', 'pic', 'name', 'children']);

            this.entity = Object(__WEBPACK_IMPORTED_MODULE_2__appUtils_get_entity_js__["a" /* default */])(entity || id);

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_1__normal_jsx__["a" /* default */],
                _extends({
                    to: Object(__WEBPACK_IMPORTED_MODULE_4__appUtils_get_link_js__["a" /* default */])('entity', this.entity.id),
                    pic: checkShow(pic) ? Object(__WEBPACK_IMPORTED_MODULE_3__appUtils_get_pic_js__["a" /* default */])(this.entity, '0-2') : null,
                    name: checkShow(name) ? this.entity._name : null
                }, props),
                children
            );
        }
    }]);

    return LinkEntity;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class);


/***/ }),

/***/ 888:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__appLogic_database__ = __webpack_require__(280);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };



/* harmony default export */ __webpack_exports__["a"] = (function (item) {
    if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' && item.id) return item;

    if (typeof item === 'string') item = parseInt(item);

    if (typeof item === 'number') return __WEBPACK_IMPORTED_MODULE_0__appLogic_database__["a" /* default */].entities[item];
});

/***/ }),

/***/ 889:
/***/ (function(module, exports) {

module.exports ={wrapper:'a988a335',css:'.a988a335{padding-left:2.85rem}'}

/***/ })

};;