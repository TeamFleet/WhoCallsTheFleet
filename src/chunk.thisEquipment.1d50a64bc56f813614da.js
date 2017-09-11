exports.ids = [1];
exports.modules = {

/***/ 749:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _default; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__appUI_containers_infos_page__ = __webpack_require__(799);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__appUtils_html_head_js__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__appLogic_database__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__appLogic_equipment_details_api_js__ = __webpack_require__(833);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__details_commons_header_jsx__ = __webpack_require__(834);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class, _dec2, _class2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




// import translate from 'sp-i18n'
// import PageContainer from 'sp-ui-pagecontainer'







// import { ImportStyle } from 'sp-css-import'
// import style from './details.less'

var tabsAvailable = ['infos', 'refittable'];

var contentComponents = [];

if (true) tabsAvailable.forEach(function (tab, index) {
    contentComponents[index] = __webpack_require__(926)("./" + tab + '.jsx').default;
});

var extracFromState = function extracFromState(state) {
    var pathname = state.routing.locationBeforeTransitions.pathname;
    var segs = pathname.split('/');
    var indexEquipments = segs.indexOf('equipments');

    return {
        id: parseInt(segs[indexEquipments + 1]),
        tab: segs[indexEquipments + 2] || tabsAvailable[0]
    };
};

var getDescription = function getDescription(equipment) {
    return equipment._name
    // 类型
    + ('' + (equipment.type ? ', ' + equipment._type : ''));
};

// @ImportStyle(style)
var _default = (_dec = Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["b" /* connect */])(function (state, ownProps) {
    return state.equipmentDetails[ownProps.params.id] || {};
}), _dec(_class = function (_React$Component) {
    _inherits(_default, _React$Component);

    function _default() {
        _classCallCheck(this, _default);

        return _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).apply(this, arguments));
    }

    _createClass(_default, [{
        key: 'onTabChange',
        value: function onTabChange() /*newTab, newTabIndex*/{
            // if (newTabIndex !== this.props.tabIndex) {
            // console.log(newTabIndex, this.props.tabIndex)
            // this.props.dispatch(
            //     shipDetailsChangeTab(this.props.params.id, newTabIndex)
            // )
            window.scrollTo(undefined, 0);
            // }
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            if (this.props.location.action === 'PUSH' && typeof this.props.tabIndex !== 'undefined') this.props.dispatch(Object(__WEBPACK_IMPORTED_MODULE_5__appLogic_equipment_details_api_js__["c" /* reset */])(this.props.params.id));
        }
    }, {
        key: 'render',
        value: function render() {
            if (typeof this.props.tabIndex === 'undefined') {
                this.props.dispatch(Object(__WEBPACK_IMPORTED_MODULE_5__appLogic_equipment_details_api_js__["b" /* init */])(this.props.params.id, {
                    tabIndex: tabsAvailable.indexOf(this.props.params && this.props.params.tab ? this.props.params.tab : tabsAvailable[0])
                }));
                if (true) return null;
            }

            if (!this.equipment) return null;

            if (false) console.log('thisEquipment', this.equipment, this.props.tabIndex);

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_2__appUI_containers_infos_page__["a" /* default */],
                { className: this.props.className },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__details_commons_header_jsx__["default"], {
                    equipment: this.equipment,
                    tabs: tabsAvailable,
                    onTabChange:  true ? this.onTabChange.bind(this) : undefined
                }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    PageEquipmentDetailsBody,
                    { equipment: this.equipment },
                    this.props.children
                )
            );
        }
    }, {
        key: 'equipment',
        get: function get() {
            if (!this._data && this.props.params.id) this._data = __WEBPACK_IMPORTED_MODULE_4__appLogic_database__["a" /* default */].equipments[this.props.params.id];
            return this._data || undefined;
        }
    }], [{
        key: 'onServerRenderStoreExtend',
        value: function onServerRenderStoreExtend(store) {
            var state = store.getState();
            var dispatch = store.dispatch;
            var preprocessTasks = [];

            var _extracFromState = extracFromState(state),
                id = _extracFromState.id,
                tab = _extracFromState.tab;

            preprocessTasks.push(dispatch(Object(__WEBPACK_IMPORTED_MODULE_5__appLogic_equipment_details_api_js__["b" /* init */])(id, {
                tabIndex: tabsAvailable.indexOf(tab)
            })));
            return preprocessTasks;
        }
    }, {
        key: 'onServerRenderHtmlExtend',
        value: function onServerRenderHtmlExtend(ext, store) {
            var _extracFromState2 = extracFromState(store.getState()),
                id = _extracFromState2.id;

            var equipment = __WEBPACK_IMPORTED_MODULE_4__appLogic_database__["a" /* default */].equipments[id];
            var obj = {
                store: store
            };
            if (equipment) {
                obj.title = equipment._name;
                obj.subtitle = equipment.type ? equipment._type : '';
                obj.description = getDescription(equipment);
            }
            var head = Object(__WEBPACK_IMPORTED_MODULE_3__appUtils_html_head_js__["a" /* default */])(obj);

            ext.metas = ext.metas.concat(head.meta);
            ext.title = head.title; // + translate("ship_details." + tab)
        }
    }]);

    return _default;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class);


var PageEquipmentDetailsBody = (_dec2 = Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["b" /* connect */])(function (state, ownProps) {
    return {
        tabIndex: state.equipmentDetails[ownProps.equipment.id] ? state.equipmentDetails[ownProps.equipment.id].tabIndex : undefined
    };
}), _dec2(_class2 = function (_React$Component2) {
    _inherits(PageEquipmentDetailsBody, _React$Component2);

    function PageEquipmentDetailsBody() {
        _classCallCheck(this, PageEquipmentDetailsBody);

        return _possibleConstructorReturn(this, (PageEquipmentDetailsBody.__proto__ || Object.getPrototypeOf(PageEquipmentDetailsBody)).apply(this, arguments));
    }

    _createClass(PageEquipmentDetailsBody, [{
        key: 'render',
        value: function render() {
            if (true && typeof this.props.tabIndex !== 'undefined') return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(contentComponents[this.props.tabIndex], {
                equipment: this.props.equipment
                // illustIndex: this.props.illustIndex,
                // onIllustChange: this.onIllustChange.bind(this)
            });

            if (false) return React.cloneElement(this.props.children, {
                equipment: this.props.equipment
            });
        }
    }]);

    return PageEquipmentDetailsBody;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class2);

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

/***/ 758:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InfosComponentContainer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__appUI_components_title_jsx__ = __webpack_require__(792);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_sp_css_import__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__styles_less__ = __webpack_require__(805);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__styles_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__styles_less__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








// @connect()
var InfosComponentContainer = (_dec = Object(__WEBPACK_IMPORTED_MODULE_2_sp_css_import__["a" /* ImportStyle */])(__WEBPACK_IMPORTED_MODULE_3__styles_less___default.a), _dec(_class = function (_React$Component) {
    _inherits(InfosComponentContainer, _React$Component);

    function InfosComponentContainer() {
        _classCallCheck(this, InfosComponentContainer);

        return _possibleConstructorReturn(this, (InfosComponentContainer.__proto__ || Object.getPrototypeOf(InfosComponentContainer)).apply(this, arguments));
    }

    _createClass(InfosComponentContainer, [{
        key: 'render',
        value: function render() {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: this.props.className },
                this.props.title && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    __WEBPACK_IMPORTED_MODULE_1__appUI_components_title_jsx__["a" /* default */],
                    { tag: 'h2', className: 'title' },
                    this.props.title
                ),
                this.props.children
            );
        }
    }]);

    return InfosComponentContainer;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class);


/***/ }),

/***/ 759:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames() {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg === 'undefined' ? 'undefined' : _typeof(arg);

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if ("function" === 'function' && _typeof(__webpack_require__(763)) === 'object' && __webpack_require__(763)) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return classNames;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
		window.classNames = classNames;
	}
})();

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

/***/ 763:
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

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

/***/ 766:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_kckit__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_kckit___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_kckit__);


/* harmony default export */ __webpack_exports__["a"] = (function (item) {
  return __WEBPACK_IMPORTED_MODULE_0_kckit__["get"].ship(item);
});

/***/ }),

/***/ 767:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IconEquipment; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__appLogic_database__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__appUtils_get_equipment__ = __webpack_require__(775);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_sp_css_import__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__styles_less__ = __webpack_require__(789);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__styles_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__styles_less__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









var IconEquipment = (_dec = Object(__WEBPACK_IMPORTED_MODULE_3_sp_css_import__["a" /* ImportStyle */])(__WEBPACK_IMPORTED_MODULE_4__styles_less___default.a), _dec(_class = function (_React$Component) {
    _inherits(IconEquipment, _React$Component);

    function IconEquipment() {
        _classCallCheck(this, IconEquipment);

        return _possibleConstructorReturn(this, (IconEquipment.__proto__ || Object.getPrototypeOf(IconEquipment)).apply(this, arguments));
    }

    _createClass(IconEquipment, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                className = _props.className,
                tag = _props.tag,
                icon = _props.icon,
                type = _props.type,
                equipment = _props.equipment;


            var TagName = tag || 'span';
            var _icon = icon;

            if (typeof _icon === 'undefined') {
                if (equipment) {
                    _icon = Object(__WEBPACK_IMPORTED_MODULE_2__appUtils_get_equipment__["a" /* default */])(equipment)._icon;
                } else if (type) {
                    _icon = __WEBPACK_IMPORTED_MODULE_1__appLogic_database__["a" /* default */].equipmentTypes[type].icon;
                }
            }

            var iconID = parseInt(_icon);

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                TagName,
                {
                    className: className,
                    'data-icon': iconID,
                    'data-suffix': ('' + _icon).replace(iconID, '').toUpperCase() || undefined
                },
                this.props.children
            );
        }
    }]);

    return IconEquipment;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class);


/***/ }),

/***/ 768:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _default; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router__ = __webpack_require__(179);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var _default = function (_React$Component) {
    _inherits(_default, _React$Component);

    function _default() {
        _classCallCheck(this, _default);

        return _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).apply(this, arguments));
    }

    _createClass(_default, [{
        key: 'render',
        value: function render() {
            var to = this.props.to || this.props.href || '';

            var props = _extends({}, this.props);
            ['className', 'children', 'to', 'href'].forEach(function (key) {
                return delete props[key];
            });

            return to.match(/^(https?:)?\/\//) ? to.indexOf('://') < 0 ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'a',
                _extends({ className: this.props.className, href: to }, props),
                this.props.children
            ) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'a',
                _extends({ className: this.props.className, href: to, target: '_blank' }, props),
                this.props.children
            ) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_1_react_router__["b" /* Link */],
                _extends({ className: this.props.className, to: to }, props),
                this.props.children
            );
        }
    }]);

    return _default;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);



/***/ }),

/***/ 769:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/a6785515c4efdb463cbc2cf3b91d59ae.png";

/***/ }),

/***/ 770:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Stat; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__appUI_components_icon_stat__ = __webpack_require__(807);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_sp_css_import__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__styles_less__ = __webpack_require__(810);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__styles_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__styles_less__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








// @connect()
var Stat = (_dec = Object(__WEBPACK_IMPORTED_MODULE_2_sp_css_import__["a" /* ImportStyle */])(__WEBPACK_IMPORTED_MODULE_3__styles_less___default.a), _dec(_class = function (_React$Component) {
    _inherits(Stat, _React$Component);

    function Stat() {
        _classCallCheck(this, Stat);

        return _possibleConstructorReturn(this, (Stat.__proto__ || Object.getPrototypeOf(Stat)).apply(this, arguments));
    }

    _createClass(Stat, [{
        key: 'render',
        value: function render() {
            var type = this.props.type || this.props.title;
            var Component = this.props.stat ? __WEBPACK_IMPORTED_MODULE_1__appUI_components_icon_stat__["a" /* default */] : 'dl';

            var componentProps = {
                className: this.props.className
            };

            if (this.props.stat) {
                componentProps.tag = "dl";
                componentProps.stat = this.props.stat;
                componentProps.disableResourceColor = this.props.disableResourceColor;
            }

            if (typeof this.props.value !== 'undefined' && this.props.value < 0) {
                componentProps.className += ' is-negative';
            }

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                Component,
                componentProps,
                type && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'dt',
                    { className: 'type' },
                    type
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'dd',
                    { className: 'value' },
                    this.props.value,
                    this.props.children,
                    this.props.max && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'sup',
                        { className: 'value-max' },
                        this.props.max
                    )
                )
            );
        }
    }]);

    return Stat;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class);


/***/ }),

/***/ 772:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LinkShip; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__normal_jsx__ = __webpack_require__(773);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__appLogic_database__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__appUtils_get_ship_js__ = __webpack_require__(766);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__appUtils_get_pic_js__ = __webpack_require__(760);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__appUI_components_icon_jsx__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__appUI_components_flag_navy_jsx__ = __webpack_require__(778);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_sp_css_import__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ship_less__ = __webpack_require__(787);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ship_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__ship_less__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }















var LinkShip = (_dec = Object(__WEBPACK_IMPORTED_MODULE_7_sp_css_import__["a" /* ImportStyle */])(__WEBPACK_IMPORTED_MODULE_8__ship_less___default.a), _dec(_class = function (_React$Component) {
    _inherits(LinkShip, _React$Component);

    function LinkShip() {
        _classCallCheck(this, LinkShip);

        return _possibleConstructorReturn(this, (LinkShip.__proto__ || Object.getPrototypeOf(LinkShip)).apply(this, arguments));
    }

    _createClass(LinkShip, [{
        key: 'checkShow',
        value: function checkShow(type) {
            return this.props[type] || typeof this.props[type] === 'undefined';
        }
    }, {
        key: 'renderName',
        value: function renderName() {
            if (this.props.type) {
                var type = this.ship.type && this.ship.type_display && this.ship.type !== this.ship.type_display ? this.ship.type_display : this.ship.type;
                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'span',
                    null,
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'small',
                        { className: 'name-type' },
                        __WEBPACK_IMPORTED_MODULE_2__appLogic_database__["a" /* default */].shipTypes[type]._name
                    ),
                    this.ship._name
                );
            }
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'span',
                null,
                this.ship.getNameNoSuffix(),
                this.ship.name.suffix && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'small',
                    { className: 'name-suffix' },
                    this.ship.getSuffix()
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            this.ship = Object(__WEBPACK_IMPORTED_MODULE_3__appUtils_get_ship_js__["a" /* default */])(this.props.ship);

            // const props = { ...this.props };
            // [
            //     'className',
            //     'children',
            //     'onClick',
            //     'id',
            //     'ship',
            //     'extraIllust',
            //     'navy',
            //     'name',
            //     'pic'
            // ].forEach(key => delete props[key])

            // console.log(props)

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_1__normal_jsx__["a" /* default */],
                {
                    className: this.props.className,
                    to: '/ships/' + this.ship.id,
                    onClick: this.props.onClick,
                    pic: this.checkShow('pic') ? Object(__WEBPACK_IMPORTED_MODULE_4__appUtils_get_pic_js__["a" /* default */])(this.ship, '0-2') : null,
                    name: this.checkShow('name') ? this.renderName() : null
                },
                this.props.extraIllust && this.ship.hasExtraIllust() && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__appUI_components_icon_jsx__["a" /* default */], { className: 'icon-has-extra-illust', icon: 'hanger' }),
                this.checkShow('navy') && this.ship._navy !== 'ijn' && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__appUI_components_flag_navy_jsx__["a" /* default */], { className: 'flag-navy', navy: this.ship._navy }),
                this.props.children
            );
        }
    }]);

    return LinkShip;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class);


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

/***/ 775:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_kckit__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_kckit___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_kckit__);


/* harmony default export */ __webpack_exports__["a"] = (function (item) {
  return __WEBPACK_IMPORTED_MODULE_0_kckit__["get"].equipment(item);
});

/***/ }),

/***/ 776:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Bullet; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__appUI_components_icon__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_sp_css_import__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__styles_less__ = __webpack_require__(806);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__styles_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__styles_less__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








// @connect()
var Bullet = (_dec = Object(__WEBPACK_IMPORTED_MODULE_2_sp_css_import__["a" /* ImportStyle */])(__WEBPACK_IMPORTED_MODULE_3__styles_less___default.a), _dec(_class = function (_React$Component) {
    _inherits(Bullet, _React$Component);

    function Bullet() {
        _classCallCheck(this, Bullet);

        return _possibleConstructorReturn(this, (Bullet.__proto__ || Object.getPrototypeOf(Bullet)).apply(this, arguments));
    }

    _createClass(Bullet, [{
        key: 'render',
        value: function render() {
            var level = this.props.level;
            if (typeof level === 'undefined') level = this.props.bullet;
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                {
                    className: this.props.className,
                    'data-level': level || 0
                },
                level === -1 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__appUI_components_icon__["a" /* default */], { className: 'icon', icon: 'question6' }),
                level === 0 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__appUI_components_icon__["a" /* default */], { className: 'icon', icon: 'cross' }),
                this.props.title,
                this.props.children && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'span',
                    { className: 'des' },
                    this.props.children
                )
            );
        }
    }]);

    return Bullet;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class);


/***/ }),

/***/ 777:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function (value) {
    if (value === false) return '-';
    if (value === undefined) return '?';
    return value;
});

/***/ }),

/***/ 778:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _default; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_sp_css_import__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__flag_navy_less__ = __webpack_require__(781);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__flag_navy_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__flag_navy_less__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var navies = ["ijn", // 日本帝国海军
"km", // 纳粹德国海军"
"rm", // 意大利皇家海军"
"mn", // 法国海军"
"rn", // 英国皇家海军"
"usn", // 美国海军"
"vmf" // 苏联海军"
];

var _default = (_dec = Object(__WEBPACK_IMPORTED_MODULE_1_sp_css_import__["a" /* ImportStyle */])(__WEBPACK_IMPORTED_MODULE_2__flag_navy_less___default.a), _dec(_class = function (_React$Component) {
    _inherits(_default, _React$Component);

    function _default() {
        _classCallCheck(this, _default);

        return _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).apply(this, arguments));
    }

    _createClass(_default, [{
        key: 'render',
        value: function render() {
            var TagName = this.props.tag || 'span';
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(TagName, { className: this.props.className, 'data-navy': navies.indexOf(this.props.navy) });
        }
    }]);

    return _default;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class);



/***/ }),

/***/ 779:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (['fuel', 'ammo', 'steel', 'bauxite']);

/***/ }),

/***/ 781:
/***/ (function(module, exports, __webpack_require__) {

module.exports ={wrapper:'e3ec864f',css:'.e3ec864f{background:url(' + __webpack_require__(782) + ') no-repeat 50% 1rem/cover;display:inline-block;height:1rem;width:1rem}.e3ec864f[data-navy="0"]{background-position:50% 0}.e3ec864f[data-navy="1"]{background-position:50% 16.66666667%}.e3ec864f[data-navy="2"]{background-position:50% 33.33333333%}.e3ec864f[data-navy="3"]{background-position:50% 50%}.e3ec864f[data-navy="4"]{background-position:50% 66.66666667%}.e3ec864f[data-navy="5"]{background-position:50% 83.33333333%}.e3ec864f[data-navy="6"]{background-position:50% 100%}.e3ec864f[data-navy="7"]{background-position:50% 116.66666667%}@media (-webkit-min-device-pixel-ratio:1.25),(min-resolution:120dpi){.e3ec864f{background-image:url(' + __webpack_require__(783) + ')}}@media (-webkit-min-device-pixel-ratio:1.5),(min-resolution:144dpi){.e3ec864f{background-image:url(' + __webpack_require__(784) + ')}}@media (-webkit-min-device-pixel-ratio:2),(min-resolution:192dpi){.e3ec864f{background-image:url(' + __webpack_require__(785) + ')}}@media (-webkit-min-device-pixel-ratio:3),(min-resolution:288dpi){.e3ec864f{background-image:url(' + __webpack_require__(786) + ')}}'}

/***/ }),

/***/ 782:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/fd6277a1c31cb1fbcec1ca29acbd27a3.png";

/***/ }),

/***/ 783:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/4d1c00d9665fe7baa09c133fb3d00e06.png";

/***/ }),

/***/ 784:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/f6d32bd4e8fb3e0c02a6a70fd4c242b8.png";

/***/ }),

/***/ 785:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/76c78002caf2af27bfadccf4607ebdbd.png";

/***/ }),

/***/ 786:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/ad3e485eaae9f5bb694365023b20c4b5.png";

/***/ }),

/***/ 787:
/***/ (function(module, exports) {

module.exports ={wrapper:'aa3bc43f',css:'.aa3bc43f{padding-left:4.35rem}.aa3bc43f .icon-has-extra-illust{-webkit-transform:rotate(15deg);fill:#fff;height:1rem;left:3.5rem;margin-top:-.5rem;position:absolute;top:50%;transform:rotate(15deg);width:1rem;z-index:10}.aa3bc43f .flag-navy{-webkit-filter:drop-shadow(-.05rem .05rem .05rem rgba(0,0,0,.75));-webkit-transform:rotate(10deg);filter:drop-shadow(-.05rem .05rem .05rem rgba(0,0,0,.75));height:1rem;left:3.3rem;margin-top:-1.2rem;position:absolute;top:50%;transform:rotate(10deg);width:1rem;z-index:-1}'}

/***/ }),

/***/ 789:
/***/ (function(module, exports, __webpack_require__) {

module.exports ={wrapper:'f7f14dc3',css:'.f7f14dc3{position:relative}.f7f14dc3:before{content:"";float:left;margin:0 .2rem 0 0}.f7f14dc3:before,.f7f14dc3:empty{background:url(' + __webpack_require__(769) + ') no-repeat 0 1.8rem/cover;display:inline-block;height:1.8rem;width:1.8rem}.f7f14dc3[data-icon="0"]:before{background-position:0 -2.27272727%}.f7f14dc3[data-icon="1"]:before{background-position:0 0}.f7f14dc3[data-icon="2"]:before{background-position:0 2.27272727%}.f7f14dc3[data-icon="3"]:before{background-position:0 4.54545455%}.f7f14dc3[data-icon="4"]:before{background-position:0 6.81818182%}.f7f14dc3[data-icon="5"]:before{background-position:0 9.09090909%}.f7f14dc3[data-icon="6"]:before{background-position:0 11.36363636%}.f7f14dc3[data-icon="7"]:before{background-position:0 13.63636364%}.f7f14dc3[data-icon="8"]:before{background-position:0 15.90909091%}.f7f14dc3[data-icon="9"]:before{background-position:0 18.18181818%}.f7f14dc3[data-icon="10"]:before{background-position:0 20.45454545%}.f7f14dc3[data-icon="11"]:before{background-position:0 22.72727273%}.f7f14dc3[data-icon="12"]:before{background-position:0 25%}.f7f14dc3[data-icon="13"]:before{background-position:0 27.27272727%}.f7f14dc3[data-icon="14"]:before{background-position:0 29.54545455%}.f7f14dc3[data-icon="15"]:before{background-position:0 31.81818182%}.f7f14dc3[data-icon="16"]:before{background-position:0 34.09090909%}.f7f14dc3[data-icon="17"]:before{background-position:0 36.36363636%}.f7f14dc3[data-icon="18"]:before{background-position:0 38.63636364%}.f7f14dc3[data-icon="19"]:before{background-position:0 40.90909091%}.f7f14dc3[data-icon="20"]:before{background-position:0 43.18181818%}.f7f14dc3[data-icon="21"]:before{background-position:0 45.45454545%}.f7f14dc3[data-icon="22"]:before{background-position:0 47.72727273%}.f7f14dc3[data-icon="23"]:before{background-position:0 50%}.f7f14dc3[data-icon="24"]:before{background-position:0 52.27272727%}.f7f14dc3[data-icon="25"]:before{background-position:0 54.54545455%}.f7f14dc3[data-icon="26"]:before{background-position:0 56.81818182%}.f7f14dc3[data-icon="27"]:before{background-position:0 59.09090909%}.f7f14dc3[data-icon="28"]:before{background-position:0 61.36363636%}.f7f14dc3[data-icon="29"]:before{background-position:0 63.63636364%}.f7f14dc3[data-icon="30"]:before{background-position:0 65.90909091%}.f7f14dc3[data-icon="31"]:before{background-position:0 68.18181818%}.f7f14dc3[data-icon="32"]:before{background-position:0 70.45454545%}.f7f14dc3[data-icon="33"]:before{background-position:0 72.72727273%}.f7f14dc3[data-icon="34"]:before{background-position:0 75%}.f7f14dc3[data-icon="35"]:before{background-position:0 77.27272727%}.f7f14dc3[data-icon="36"]:before{background-position:0 79.54545455%}.f7f14dc3[data-icon="37"]:before{background-position:0 81.81818182%}.f7f14dc3[data-icon="38"]:before{background-position:0 84.09090909%}.f7f14dc3[data-icon="39"]:before{background-position:0 86.36363636%}.f7f14dc3[data-icon="40"]:before{background-position:0 88.63636364%}.f7f14dc3[data-icon="41"]:before{background-position:0 90.90909091%}.f7f14dc3[data-icon="42"]:before{background-position:0 93.18181818%}.f7f14dc3[data-icon="43"]:before{background-position:0 95.45454545%}.f7f14dc3[data-icon="44"]:before{background-position:0 97.72727273%}.f7f14dc3[data-icon="45"]:before{background-position:0 100%}.f7f14dc3:empty:before{display:none}.f7f14dc3:empty[data-icon="0"]{background-position:0 -2.27272727%}.f7f14dc3:empty[data-icon="1"]{background-position:0 0}.f7f14dc3:empty[data-icon="2"]{background-position:0 2.27272727%}.f7f14dc3:empty[data-icon="3"]{background-position:0 4.54545455%}.f7f14dc3:empty[data-icon="4"]{background-position:0 6.81818182%}.f7f14dc3:empty[data-icon="5"]{background-position:0 9.09090909%}.f7f14dc3:empty[data-icon="6"]{background-position:0 11.36363636%}.f7f14dc3:empty[data-icon="7"]{background-position:0 13.63636364%}.f7f14dc3:empty[data-icon="8"]{background-position:0 15.90909091%}.f7f14dc3:empty[data-icon="9"]{background-position:0 18.18181818%}.f7f14dc3:empty[data-icon="10"]{background-position:0 20.45454545%}.f7f14dc3:empty[data-icon="11"]{background-position:0 22.72727273%}.f7f14dc3:empty[data-icon="12"]{background-position:0 25%}.f7f14dc3:empty[data-icon="13"]{background-position:0 27.27272727%}.f7f14dc3:empty[data-icon="14"]{background-position:0 29.54545455%}.f7f14dc3:empty[data-icon="15"]{background-position:0 31.81818182%}.f7f14dc3:empty[data-icon="16"]{background-position:0 34.09090909%}.f7f14dc3:empty[data-icon="17"]{background-position:0 36.36363636%}.f7f14dc3:empty[data-icon="18"]{background-position:0 38.63636364%}.f7f14dc3:empty[data-icon="19"]{background-position:0 40.90909091%}.f7f14dc3:empty[data-icon="20"]{background-position:0 43.18181818%}.f7f14dc3:empty[data-icon="21"]{background-position:0 45.45454545%}.f7f14dc3:empty[data-icon="22"]{background-position:0 47.72727273%}.f7f14dc3:empty[data-icon="23"]{background-position:0 50%}.f7f14dc3:empty[data-icon="24"]{background-position:0 52.27272727%}.f7f14dc3:empty[data-icon="25"]{background-position:0 54.54545455%}.f7f14dc3:empty[data-icon="26"]{background-position:0 56.81818182%}.f7f14dc3:empty[data-icon="27"]{background-position:0 59.09090909%}.f7f14dc3:empty[data-icon="28"]{background-position:0 61.36363636%}.f7f14dc3:empty[data-icon="29"]{background-position:0 63.63636364%}.f7f14dc3:empty[data-icon="30"]{background-position:0 65.90909091%}.f7f14dc3:empty[data-icon="31"]{background-position:0 68.18181818%}.f7f14dc3:empty[data-icon="32"]{background-position:0 70.45454545%}.f7f14dc3:empty[data-icon="33"]{background-position:0 72.72727273%}.f7f14dc3:empty[data-icon="34"]{background-position:0 75%}.f7f14dc3:empty[data-icon="35"]{background-position:0 77.27272727%}.f7f14dc3:empty[data-icon="36"]{background-position:0 79.54545455%}.f7f14dc3:empty[data-icon="37"]{background-position:0 81.81818182%}.f7f14dc3:empty[data-icon="38"]{background-position:0 84.09090909%}.f7f14dc3:empty[data-icon="39"]{background-position:0 86.36363636%}.f7f14dc3:empty[data-icon="40"]{background-position:0 88.63636364%}.f7f14dc3:empty[data-icon="41"]{background-position:0 90.90909091%}.f7f14dc3:empty[data-icon="42"]{background-position:0 93.18181818%}.f7f14dc3:empty[data-icon="43"]{background-position:0 95.45454545%}.f7f14dc3:empty[data-icon="44"]{background-position:0 97.72727273%}.f7f14dc3:empty[data-icon="45"]{background-position:0 100%}.f7f14dc3[data-suffix]:after{bottom:0;content:"";display:block;font-size:.6rem;line-height:1.2em;position:absolute;right:0;text-align:center;z-index:2}.f7f14dc3[data-suffix=AA]:after{-webkit-transform:scale(.83333333);-webkit-transform-origin:100% 100%;background:rgba(76,175,80,.5);border:.05rem solid #69f0ae;border-radius:.55em;color:#b9f6ca;content:attr(data-suffix);padding:0 .25em;transform:scale(.83333333);transform-origin:100% 100%}.f7f14dc3[data-suffix="+"]:after,.f7f14dc3[data-suffix="-"]:after{bottom:0;height:.7rem;width:.7rem}.f7f14dc3[data-suffix="+"]:after{background:url(' + __webpack_require__(790) + ') no-repeat 50% 50%/cover}.f7f14dc3[data-suffix="-"]:after{background:url(' + __webpack_require__(791) + ') no-repeat 50% 50%/cover}.f7f14dc3[data-icon="16"][data-suffix="+"]:after,.f7f14dc3[data-icon="16"][data-suffix="-"]:after{background:url(' + __webpack_require__(769) + ') no-repeat 0 65.90909091%/cover;bottom:-.25rem;height:1.4rem;right:-.25rem;width:1.4rem}.f7f14dc3[data-icon="16"][data-suffix="-"]:after{-webkit-filter:saturate(0);filter:saturate(0)}'}

/***/ }),

/***/ 790:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/1888cba35d31b951a2febdff4a8f7f6d.svg";

/***/ }),

/***/ 791:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/a4c4a7db02784cd230d6beeb4758c738.svg";

/***/ }),

/***/ 792:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Title; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_sp_css_import__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__title_less__ = __webpack_require__(803);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__title_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__title_less__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var Title = (_dec = Object(__WEBPACK_IMPORTED_MODULE_1_sp_css_import__["a" /* ImportStyle */])(__WEBPACK_IMPORTED_MODULE_2__title_less___default.a), _dec(_class = function (_React$Component) {
    _inherits(Title, _React$Component);

    function Title() {
        _classCallCheck(this, Title);

        return _possibleConstructorReturn(this, (Title.__proto__ || Object.getPrototypeOf(Title)).apply(this, arguments));
    }

    _createClass(Title, [{
        key: 'render',
        value: function render() {
            var TagName = this.props.tag || this.props.tagname || 'div';
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                TagName,
                { className: this.props.className },
                this.props.children
            );
        }
    }]);

    return Title;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class);


/***/ }),

/***/ 794:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (['fire', 'torpedo', 'aa', 'asw', 'bomb', 'hit', 'armor', 'evasion', 'los', 'range']);

/***/ }),

/***/ 795:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListShips; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__appUI_components_link_ship__ = __webpack_require__(772);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__appUtils_get_ship_js__ = __webpack_require__(766);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_sp_css_import__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__styles_less__ = __webpack_require__(796);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__styles_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__styles_less__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









// @connect()
var ListShips = (_dec = Object(__WEBPACK_IMPORTED_MODULE_3_sp_css_import__["a" /* ImportStyle */])(__WEBPACK_IMPORTED_MODULE_4__styles_less___default.a), _dec(_class = function (_React$Component) {
    _inherits(ListShips, _React$Component);

    function ListShips() {
        _classCallCheck(this, ListShips);

        return _possibleConstructorReturn(this, (ListShips.__proto__ || Object.getPrototypeOf(ListShips)).apply(this, arguments));
    }

    _createClass(ListShips, [{
        key: 'insertPlaceHolders',
        value: function insertPlaceHolders() {
            var i = 0;
            var arr = [];
            while (i++ < 10) {
                arr.push(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span', { className: 'item placeholder', key: i }));
            }return arr;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                className = _props.className,
                list = _props.list,
                array = _props.array,
                type = _props.type,
                props = _objectWithoutProperties(_props, ['className', 'list', 'array', 'type']);

            var _list = list || array || [];
            var hasItem = _list.length ? true : false;
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: className },
                hasItem && _list.map(function (shipId) {
                    return Object(__WEBPACK_IMPORTED_MODULE_2__appUtils_get_ship_js__["a" /* default */])(shipId);
                }).sort(function (a, b) {
                    return a.order - b.order;
                }).map(function (ship) {
                    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__appUI_components_link_ship__["a" /* default */], _extends({
                        ship: ship,
                        key: ship.id,
                        className: 'item',
                        type: typeof type === 'undefined' ? true : type
                    }, props));
                }),
                !hasItem && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'span',
                    { className: 'list-empty' },
                    this.props.empty
                ),
                this.props.children,
                this.insertPlaceHolders()
            );
        }
    }]);

    return ListShips;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class);


/***/ }),

/***/ 796:
/***/ (function(module, exports) {

module.exports ={wrapper:'ff55c9ed',css:'.ff55c9ed{-webkit-box-direction:normal;-webkit-box-orient:horizontal;-webkit-flex-flow:row wrap;clear:both;display:-webkit-box;display:-webkit-flex;display:flex;flex-flow:row wrap;margin-right:-.5rem;margin-top:-.5rem}.ff55c9ed .item{-webkit-box-flex:1;-webkit-flex:1 0 10rem;flex:1 0 10rem;margin:.5rem .5rem 0 0}.ff55c9ed .item.placeholder{height:0;margin-top:auto}.ff55c9ed .list-empty{color:rgba(169,193,205,.55);margin-top:.5rem}'}

/***/ }),

/***/ 799:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InfosPageContainer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_sp_ui_pagecontainer__ = __webpack_require__(756);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_sp_css_import__ = __webpack_require__(41);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var InfosPageContainer = (_dec = Object(__WEBPACK_IMPORTED_MODULE_2_sp_css_import__["a" /* ImportStyle */])(__webpack_require__(800)), _dec(_class = function (_React$Component) {
    _inherits(InfosPageContainer, _React$Component);

    function InfosPageContainer() {
        _classCallCheck(this, InfosPageContainer);

        return _possibleConstructorReturn(this, (InfosPageContainer.__proto__ || Object.getPrototypeOf(InfosPageContainer)).apply(this, arguments));
    }

    _createClass(InfosPageContainer, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                props = _objectWithoutProperties(_props, ['children']);

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_1_sp_ui_pagecontainer__["a" /* default */],
                props,
                children
            );
        }
    }]);

    return InfosPageContainer;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class);


/***/ }),

/***/ 800:
/***/ (function(module, exports) {

module.exports ={wrapper:'e089ed43',css:'.e089ed43{padding-top:5.5rem}@media (max-width:850px){.e089ed43{padding-top:1rem}}@media (min-width:851px) and (max-height:760px){.e089ed43{padding-top:4.1rem}}'}

/***/ }),

/***/ 802:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InfosHeader; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames__ = __webpack_require__(759);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__appUI_components_main_header_jsx__ = __webpack_require__(764);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__appUI_components_title_jsx__ = __webpack_require__(792);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_sp_css_import__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__styles_less__ = __webpack_require__(804);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__styles_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__styles_less__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }












// @connect()
var InfosHeader = (_dec = Object(__WEBPACK_IMPORTED_MODULE_6_sp_css_import__["a" /* ImportStyle */])(__WEBPACK_IMPORTED_MODULE_7__styles_less___default.a), _dec(_class = function (_React$Component) {
    _inherits(InfosHeader, _React$Component);

    function InfosHeader() {
        _classCallCheck(this, InfosHeader);

        return _possibleConstructorReturn(this, (InfosHeader.__proto__ || Object.getPrototypeOf(InfosHeader)).apply(this, arguments));
    }

    _createClass(InfosHeader, [{
        key: 'renderTab',

        /* props
         * currentIndex
         * urlBase
         * title
         * onTabChange
         * tabs
         * [{
         *      tabId
         *      tabName
         * }]
         */
        value: function renderTab(tabInfo, tabIndex) {
            var _this2 = this;

            var tabId = tabInfo.tabId,
                tabName = tabInfo.tabName;

            var url = '' + this.props.urlBase + (tabIndex ? '/' + tabId : '');

            if (true) {
                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'a',
                    {
                        href: url,
                        className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()(['tab', {
                            'on': tabIndex === this.props.currentIndex
                        }]),
                        key: tabIndex,
                        onClick: function onClick(evt) {
                            if (typeof _this2.props.onTabChange === 'function') {
                                evt.preventDefault();
                                _this2.props.onTabChange(tabId, tabIndex);
                            }
                        }
                    },
                    tabName
                );
            } else {
                var Tag = tabIndex ? Link : IndexLink;
                return React.createElement(
                    Tag,
                    {
                        to: url,
                        className: 'tab',
                        activeClassName: 'on',
                        key: tabIndex
                    },
                    tabName
                );
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var isPortal = true;
            var Component = isPortal ? __WEBPACK_IMPORTED_MODULE_4__appUI_components_main_header_jsx__["a" /* default */] : 'div';

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                Component,
                { className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()([this.props.className, {
                        'is-portal': isPortal
                    }]) },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'infos' },
                    this.props.title && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        __WEBPACK_IMPORTED_MODULE_5__appUI_components_title_jsx__["a" /* default */],
                        { tag: 'h1', className: 'title' },
                        this.props.title
                    ),
                    this.props.children
                ),
                this.props.tabs && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'tabs' },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        { className: 'wrapper' },
                        this.props.tabs.map(this.renderTab.bind(this))
                    )
                )
            );
        }
    }]);

    return InfosHeader;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class);


/***/ }),

/***/ 803:
/***/ (function(module, exports) {

module.exports ={wrapper:'dd41d8cd10',css:''}

/***/ }),

/***/ 804:
/***/ (function(module, exports) {

module.exports ={wrapper:'eed95143',css:'.eed95143 .infos{color:rgba(169,193,205,.55);font-size:.7rem;line-height:1rem;margin:0 0 1rem;overflow:hidden}@media (max-width:850px){.eed95143 .infos{display:none}}@media (min-width:851px) and (max-height:760px){.eed95143 .infos{margin-bottom:.5rem}}.eed95143 .title{border-right:.05rem solid rgba(237,240,242,.15);color:#fff;display:block;float:left;font-size:1.5rem;font-weight:400;line-height:2rem;margin:0 1rem 0 0;padding:0 1rem 0 0}.eed95143 .tabs{clear:both;font-size:.8rem;height:3rem;line-height:3rem;margin-left:-1.5rem;margin-right:-1.5rem;overflow:hidden}@media (max-width:850px){.eed95143 .tabs{margin-left:-1.2rem;margin-right:-1.2rem}}@media (max-width:850px) and all and (max-width:660px){.eed95143 .tabs{margin-left:-.6rem;margin-right:-.6rem}}@media (max-width:660px){.eed95143 .tabs{margin-left:-.6rem;margin-right:-.6rem}}@media (min-width:851px) and (max-height:760px){.eed95143 .tabs{height:2.6rem;line-height:2.6rem}}.eed95143 .tabs>.wrapper{-webkit-box-direction:normal;-webkit-box-orient:horizontal;-webkit-flex-flow:row nowrap;display:-webkit-box;display:-webkit-flex;display:flex;flex-flow:row nowrap;height:4rem;overflow:hidden;overflow-x:auto;padding-left:1.5rem;padding-right:1.5rem;position:relative}@media (max-width:850px){.eed95143 .tabs>.wrapper{padding-left:1.2rem;padding-right:1.2rem}}@media (max-width:660px){.eed95143 .tabs>.wrapper{padding-left:.6rem;padding-right:.6rem}}.eed95143 .tabs>.wrapper:after{-webkit-box-flex:0;-webkit-flex:none;content:"";flex:none;width:1.5rem}@media (max-width:850px){.eed95143 .tabs>.wrapper:after{width:1.2rem}}@media (max-width:660px){.eed95143 .tabs>.wrapper:after{width:.6rem}}.eed95143 .tab{-webkit-box-flex:0;-webkit-flex:none;border-bottom:.1rem solid transparent;color:rgba(169,193,205,.55);display:inline-block;flex:none;height:2.95rem;margin-right:2em;position:relative}html.is-hover .eed95143 .tab:hover{color:#fff}.eed95143 .tab:active,html.is-hover .eed95143 .tab:hover:active{color:hsla(0,0%,100%,.5)}.eed95143 .tab.on{border-bottom-color:#40c4ff;color:#fff;pointer-events:none;z-index:-1}.eed95143 .tab:last-child{margin-right:0}@media (min-width:851px) and (max-height:760px){.eed95143 .tab{height:2.55rem}}.eed95143.is-portal{padding-top:1rem}@media (max-width:850px){.eed95143.is-portal{padding-top:0}}@media (min-width:851px) and (max-height:760px){.eed95143.is-portal{padding-top:.75rem}}'}

/***/ }),

/***/ 805:
/***/ (function(module, exports) {

module.exports ={wrapper:'ee71a7bb',css:'.ee71a7bb{border-top:2rem solid transparent}.ee71a7bb>.title{display:block;margin-bottom:.5rem;margin-top:0}.ee71a7bb>h2.title{font-size:.9rem;line-height:1.1rem}'}

/***/ }),

/***/ 806:
/***/ (function(module, exports) {

module.exports ={wrapper:'cc522d2f',css:'.cc522d2f{display:block;font-size:.8rem;line-height:.8rem;margin:1rem 0;min-height:.8rem;padding:0 0 0 1.3rem;position:relative}.cc522d2f:first-child{margin-top:0}.cc522d2f:last-child{margin-bottom:0}.cc522d2f .des{display:block;font-size:.7rem;line-height:.9rem;margin-top:.25rem}.cc522d2f .des .requirement{margin:.25rem 0 0;padding:0}.cc522d2f .des .requirement li{margin:0 0 0 1.5em}.cc522d2f .des .requirement:first-of-type:last-of-type li{list-style:none;margin-left:0}.cc522d2f:before{background:currentColor;border-radius:50%;content:"";display:block}.cc522d2f .icon,.cc522d2f:before{height:.8rem;left:0;position:absolute;top:0;width:.8rem}.cc522d2f .equipment{padding-left:1.1rem}.cc522d2f .equipment:before{float:none;height:1.3rem;left:-.2rem;margin-top:-.65rem;position:absolute;top:50%;width:1.3rem}.cc522d2f[data-level="0"],.cc522d2f[data-level="-1"]{color:rgba(169,193,205,.55)}.cc522d2f[data-level="0"]:before,.cc522d2f[data-level="-1"]:before{display:none}.cc522d2f[data-level="1"]{color:#fff}.cc522d2f[data-level="1"]:before{background:#40c4ff}.cc522d2f[data-level="2"]{color:#fff}.cc522d2f[data-level="2"]:before{background:#69f0ae}'}

/***/ }),

/***/ 807:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _default; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_sp_css_import__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__icon_stat_less__ = __webpack_require__(808);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__icon_stat_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__icon_stat_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__appData_resources__ = __webpack_require__(779);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var stats = ['hp', 'armor', 'evasion', 'carry', 'fire', 'torpedo', 'aa', 'asw', 'speed', 'range', 'los', 'luck', 'fuel', 'ammo', 'bomb', 'hit', 'steel', 'bauxite', 'dev', 'screw'];

var _default = (_dec = Object(__WEBPACK_IMPORTED_MODULE_1_sp_css_import__["a" /* ImportStyle */])(__WEBPACK_IMPORTED_MODULE_2__icon_stat_less___default.a), _dec(_class = function (_React$Component) {
    _inherits(_default, _React$Component);

    function _default() {
        _classCallCheck(this, _default);

        return _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).apply(this, arguments));
    }

    _createClass(_default, [{
        key: 'render',
        value: function render() {
            var TagName = this.props.tag || 'span';
            var isResource = !this.props.disableResourceColor && __WEBPACK_IMPORTED_MODULE_3__appData_resources__["a" /* default */].includes(this.props.stat);

            var stat = this.props.stat;
            switch (stat) {
                case 'distance':
                    stat = 'range';
                    break;
                case 'antibomber':
                    stat = 'hit';
                    break;
                case 'interception':
                    stat = 'evasion';
                    break;
            }

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                TagName,
                {
                    className: this.props.className,
                    'data-stat': stats.indexOf(stat),
                    'data-resource': isResource ? this.props.stat : undefined
                },
                this.props.children
            );
        }
    }]);

    return _default;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class);



/***/ }),

/***/ 808:
/***/ (function(module, exports, __webpack_require__) {

module.exports ={wrapper:'dd8a9ac4',css:'.dd8a9ac4:before{content:"";float:left;margin:0 .2rem 0 0}.dd8a9ac4:before,.dd8a9ac4:empty{background:url(' + __webpack_require__(809) + ') no-repeat 0 .9rem/cover;display:inline-block;height:.9rem;width:.9rem}.dd8a9ac4[data-stat="0"]:before{background-position:0 0}.dd8a9ac4[data-stat="1"]:before{background-position:0 5.26315789%}.dd8a9ac4[data-stat="2"]:before{background-position:0 10.52631579%}.dd8a9ac4[data-stat="3"]:before{background-position:0 15.78947368%}.dd8a9ac4[data-stat="4"]:before{background-position:0 21.05263158%}.dd8a9ac4[data-stat="5"]:before{background-position:0 26.31578947%}.dd8a9ac4[data-stat="6"]:before{background-position:0 31.57894737%}.dd8a9ac4[data-stat="7"]:before{background-position:0 36.84210526%}.dd8a9ac4[data-stat="8"]:before{background-position:0 42.10526316%}.dd8a9ac4[data-stat="9"]:before{background-position:0 47.36842105%}.dd8a9ac4[data-stat="10"]:before{background-position:0 52.63157895%}.dd8a9ac4[data-stat="11"]:before{background-position:0 57.89473684%}.dd8a9ac4[data-stat="12"]:before{background-position:0 63.15789474%}.dd8a9ac4[data-stat="13"]:before{background-position:0 68.42105263%}.dd8a9ac4[data-stat="14"]:before{background-position:0 73.68421053%}.dd8a9ac4[data-stat="15"]:before{background-position:0 78.94736842%}.dd8a9ac4[data-stat="16"]:before{background-position:0 84.21052632%}.dd8a9ac4[data-stat="17"]:before{background-position:0 89.47368421%}.dd8a9ac4[data-stat="18"]:before{background-position:0 94.73684211%}.dd8a9ac4[data-stat="19"]:before{background-position:0 100%}.dd8a9ac4[data-stat="20"]:before{background-position:0 105.26315789%}.dd8a9ac4[data-resource=fuel]{color:#7fbd75}.dd8a9ac4[data-resource=ammo]{color:#ccbf8e}.dd8a9ac4[data-resource=steel]{color:#e3e3e3}.dd8a9ac4[data-resource=bauxite]{color:#f2bb91}.dd8a9ac4:empty:before{display:none}.dd8a9ac4:empty[data-stat="0"]{background-position:0 0}.dd8a9ac4:empty[data-stat="1"]{background-position:0 5.26315789%}.dd8a9ac4:empty[data-stat="2"]{background-position:0 10.52631579%}.dd8a9ac4:empty[data-stat="3"]{background-position:0 15.78947368%}.dd8a9ac4:empty[data-stat="4"]{background-position:0 21.05263158%}.dd8a9ac4:empty[data-stat="5"]{background-position:0 26.31578947%}.dd8a9ac4:empty[data-stat="6"]{background-position:0 31.57894737%}.dd8a9ac4:empty[data-stat="7"]{background-position:0 36.84210526%}.dd8a9ac4:empty[data-stat="8"]{background-position:0 42.10526316%}.dd8a9ac4:empty[data-stat="9"]{background-position:0 47.36842105%}.dd8a9ac4:empty[data-stat="10"]{background-position:0 52.63157895%}.dd8a9ac4:empty[data-stat="11"]{background-position:0 57.89473684%}.dd8a9ac4:empty[data-stat="12"]{background-position:0 63.15789474%}.dd8a9ac4:empty[data-stat="13"]{background-position:0 68.42105263%}.dd8a9ac4:empty[data-stat="14"]{background-position:0 73.68421053%}.dd8a9ac4:empty[data-stat="15"]{background-position:0 78.94736842%}.dd8a9ac4:empty[data-stat="16"]{background-position:0 84.21052632%}.dd8a9ac4:empty[data-stat="17"]{background-position:0 89.47368421%}.dd8a9ac4:empty[data-stat="18"]{background-position:0 94.73684211%}.dd8a9ac4:empty[data-stat="19"]{background-position:0 100%}.dd8a9ac4:empty[data-stat="20"]{background-position:0 105.26315789%}'}

/***/ }),

/***/ 809:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/a7802b5cbb37cfda161ae72def8fce6e.png";

/***/ }),

/***/ 810:
/***/ (function(module, exports) {

module.exports ={wrapper:'f58f52d6',css:'.f58f52d6{color:#fff;display:block;line-height:.9rem;margin:0;overflow:hidden;padding:.1rem 0}.f58f52d6 .type,.f58f52d6 .value{display:block;float:left;margin:0;padding:0}.f58f52d6 .type{color:#a9c1cd;margin-right:.3rem}.f58f52d6 .value-max{margin-left:.25em}.f58f52d6.is-positive{color:#69f0ae}.f58f52d6.is-negative{color:#ff8a80}.f58f52d6.is-negative .type{color:rgba(255,204,209,.75)}.f58f52d6.disabled{opacity:.4}'}

/***/ }),

/***/ 811:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function (n) {
    return function (f) {
        var iter = function iter(i) {
            if (i === n) return;
            f(i);
            iter(i + 1);
        };
        return iter(0);
    };
});

/***/ }),

/***/ 812:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LinkEquipment; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__appUI_components_icon_equipment__ = __webpack_require__(767);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__appUtils_get_equipment__ = __webpack_require__(775);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__appUtils_get_link__ = __webpack_require__(762);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_sp_css_import__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__styles_less__ = __webpack_require__(935);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__styles_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__styles_less__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






// import db from '@appLogic/database'






// @connect()
var LinkEquipment = (_dec = Object(__WEBPACK_IMPORTED_MODULE_5_sp_css_import__["a" /* ImportStyle */])(__WEBPACK_IMPORTED_MODULE_6__styles_less___default.a), _dec(_class = function (_React$Component) {
    _inherits(LinkEquipment, _React$Component);

    function LinkEquipment() {
        _classCallCheck(this, LinkEquipment);

        return _possibleConstructorReturn(this, (LinkEquipment.__proto__ || Object.getPrototypeOf(LinkEquipment)).apply(this, arguments));
    }

    _createClass(LinkEquipment, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                className = _props.className,
                tag = _props.tag,
                equipment = _props.equipment,
                children = _props.children,
                props = _objectWithoutProperties(_props, ['className', 'tag', 'equipment', 'children']);

            var Component = tag ? tag : __WEBPACK_IMPORTED_MODULE_1_react_router__["b" /* Link */];
            var _equipment = Object(__WEBPACK_IMPORTED_MODULE_3__appUtils_get_equipment__["a" /* default */])(equipment);

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                Component,
                _extends({
                    className: className,
                    to: !tag || tag !== 'a' ? Object(__WEBPACK_IMPORTED_MODULE_4__appUtils_get_link__["a" /* default */])('equipment', _equipment.id) : undefined
                }, props),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__appUI_components_icon_equipment__["a" /* default */], { className: 'icon', icon: _equipment._icon }),
                _equipment._name,
                children
            );
        }
    }]);

    return LinkEquipment;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class);


/***/ }),

/***/ 833:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return init; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return reset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return changeTab; });
/* unused harmony export changeIllust */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions_js__ = __webpack_require__(924);


var init = function init(id, initialState) {
    return function (dispatch) {
        dispatch(__WEBPACK_IMPORTED_MODULE_0__actions_js__["c" /* init */](id, initialState));
    };
};

var reset = function reset(id, initialState) {
    return function (dispatch) {
        dispatch(__WEBPACK_IMPORTED_MODULE_0__actions_js__["d" /* reset */](id, initialState));
    };
};

var changeTab = function changeTab(id, tabIndex) {
    return function (dispatch) {
        dispatch(__WEBPACK_IMPORTED_MODULE_0__actions_js__["b" /* changeTab */](id, tabIndex));
    };
};

var changeIllust = function changeIllust(id, illustIndex) {
    return function (dispatch) {
        dispatch(__WEBPACK_IMPORTED_MODULE_0__actions_js__["a" /* changeIllust */](id, illustIndex));
    };
};

/***/ }),

/***/ 834:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EquipmentDetailsHeader; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_sp_i18n__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__appLogic_equipment_details_api__ = __webpack_require__(833);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__appUtils_get_link__ = __webpack_require__(762);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__appUI_containers_infos_header__ = __webpack_require__(802);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_sp_css_import__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__header_less__ = __webpack_require__(925);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__header_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__header_less__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





// import db from '@appLogic/database'








var EquipmentDetailsHeader = (_dec = Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["b" /* connect */])(function (state, ownProps) {
    return state.equipmentDetails[ownProps.equipment.id] || {};
}), _dec2 = Object(__WEBPACK_IMPORTED_MODULE_6_sp_css_import__["a" /* ImportStyle */])(__WEBPACK_IMPORTED_MODULE_7__header_less___default.a), _dec(_class = _dec2(_class = function (_React$Component) {
    _inherits(EquipmentDetailsHeader, _React$Component);

    function EquipmentDetailsHeader() {
        _classCallCheck(this, EquipmentDetailsHeader);

        return _possibleConstructorReturn(this, (EquipmentDetailsHeader.__proto__ || Object.getPrototypeOf(EquipmentDetailsHeader)).apply(this, arguments));
    }

    _createClass(EquipmentDetailsHeader, [{
        key: 'onTabChange',
        value: function onTabChange(tabId, tabIndex) {
            if (typeof this.props.onTabChange === 'function') this.props.onTabChange(tabId, tabIndex);
            this.props.dispatch(Object(__WEBPACK_IMPORTED_MODULE_3__appLogic_equipment_details_api__["a" /* changeTab */])(this.props.equipment.id, tabIndex));
        }
    }, {
        key: 'getTabs',
        value: function getTabs() {
            if (!Array.isArray(this.props.tabs)) return [];
            return this.props.tabs.map(function (tabId) {
                return {
                    tabId: tabId,
                    tabName: Object(__WEBPACK_IMPORTED_MODULE_2_sp_i18n__["a" /* default */])("equipment_details." + tabId)
                };
            });
        }
    }, {
        key: 'render',
        value: function render() {
            if (!this.props.equipment) return null;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_5__appUI_containers_infos_header__["a" /* default */],
                {
                    className: this.props.className,
                    title: this.props.equipment._name,
                    tabs: this.getTabs(),
                    urlBase: Object(__WEBPACK_IMPORTED_MODULE_4__appUtils_get_link__["a" /* default */])('equipment', this.props.equipment.id),
                    currentIndex: this.props.tabIndex,
                    onTabChange: this.onTabChange.bind(this)
                },
                __WEBPACK_IMPORTED_MODULE_2_sp_i18n__["c" /* localeId */] !== 'ja' && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'span',
                    { className: 'name-ja' },
                    this.props.equipment.getName(undefined, 'ja_jp')
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'span',
                    { className: 'number' },
                    'No.',
                    this.props.equipment.id
                ),
                __WEBPACK_IMPORTED_MODULE_2_sp_i18n__["c" /* localeId */] === 'ja' && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
                this.props.equipment._type
            );
        }
    }]);

    return EquipmentDetailsHeader;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class) || _class);


/***/ }),

/***/ 835:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EquipmentDetailsComponentFacts; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames__ = __webpack_require__(759);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__appUI_containers_infos_component__ = __webpack_require__(758);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__appUI_components_bullet__ = __webpack_require__(776);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__appData_equipment_stats__ = __webpack_require__(794);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__appUI_components_stat__ = __webpack_require__(770);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__appUtils_get_value__ = __webpack_require__(777);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_kckit__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_kckit___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_kckit__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_sp_i18n__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_sp_css_import__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__styles_less__ = __webpack_require__(927);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__styles_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__styles_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__styles_container_less__ = __webpack_require__(928);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__styles_container_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__styles_container_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__styles_facts_less__ = __webpack_require__(929);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__styles_facts_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12__styles_facts_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__styles_stats_less__ = __webpack_require__(930);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__styles_stats_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13__styles_stats_less__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class, _dec2, _class2, _dec3, _class3, _dec4, _class4;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








// import arrResources from '@appData/resources'
// import getEquipment from '@appUtils/get-equipment'
// import equipmentTypes from 'kckit/src/types/equipments'






/*
 * non-aircraft: 开发 | 改修 | 升级
 * aircraft: 开发 | 改修 | 升级 | 提升熟练度
 */




// @connect()
var EquipmentDetailsComponentFacts = (_dec = Object(__WEBPACK_IMPORTED_MODULE_9_sp_css_import__["a" /* ImportStyle */])(__WEBPACK_IMPORTED_MODULE_10__styles_less___default.a), _dec(_class = function (_React$Component) {
    _inherits(EquipmentDetailsComponentFacts, _React$Component);

    function EquipmentDetailsComponentFacts() {
        _classCallCheck(this, EquipmentDetailsComponentFacts);

        return _possibleConstructorReturn(this, (EquipmentDetailsComponentFacts.__proto__ || Object.getPrototypeOf(EquipmentDetailsComponentFacts)).apply(this, arguments));
    }

    _createClass(EquipmentDetailsComponentFacts, [{
        key: 'render',
        value: function render() {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_2__appUI_containers_infos_component__["a" /* default */],
                { className: this.props.className },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(EquipmentDetailsComponentFactsFacts, { equipment: this.props.equipment }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(EquipmentDetailsComponentFactsStats, { equipment: this.props.equipment })
            );
        }
    }]);

    return EquipmentDetailsComponentFacts;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class);




var EquipmentDetailsComponentFactsContainer = (_dec2 = Object(__WEBPACK_IMPORTED_MODULE_9_sp_css_import__["a" /* ImportStyle */])(__WEBPACK_IMPORTED_MODULE_11__styles_container_less___default.a), _dec2(_class2 = function (_React$Component2) {
    _inherits(EquipmentDetailsComponentFactsContainer, _React$Component2);

    function EquipmentDetailsComponentFactsContainer() {
        _classCallCheck(this, EquipmentDetailsComponentFactsContainer);

        return _possibleConstructorReturn(this, (EquipmentDetailsComponentFactsContainer.__proto__ || Object.getPrototypeOf(EquipmentDetailsComponentFactsContainer)).apply(this, arguments));
    }

    _createClass(EquipmentDetailsComponentFactsContainer, [{
        key: 'render',
        value: function render() {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: this.props.className },
                this.props.children
            );
        }
    }]);

    return EquipmentDetailsComponentFactsContainer;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class2);



var EquipmentDetailsComponentFactsFacts = (_dec3 = Object(__WEBPACK_IMPORTED_MODULE_9_sp_css_import__["a" /* ImportStyle */])(__WEBPACK_IMPORTED_MODULE_12__styles_facts_less___default.a), _dec3(_class3 = function (_React$Component3) {
    _inherits(EquipmentDetailsComponentFactsFacts, _React$Component3);

    function EquipmentDetailsComponentFactsFacts() {
        _classCallCheck(this, EquipmentDetailsComponentFactsFacts);

        return _possibleConstructorReturn(this, (EquipmentDetailsComponentFactsFacts.__proto__ || Object.getPrototypeOf(EquipmentDetailsComponentFactsFacts)).apply(this, arguments));
    }

    _createClass(EquipmentDetailsComponentFactsFacts, [{
        key: 'render',
        value: function render() {
            // const equipment = getEquipment(this.props.equipment)
            var _props = this.props,
                equipment = _props.equipment,
                className = _props.className;


            var arr = [['craftable', !!equipment.craftable], ['improvable', !!equipment.improvable], ['upgradable', Array.isArray(equipment.upgrade_to) && equipment.upgrade_to.length]];

            if (equipment.isType('Aircraft')) arr.push(['rankupgradable', equipment.rankupgradable]);

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                EquipmentDetailsComponentFactsContainer,
                { className: className },
                arr.map(function (pair) {
                    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__appUI_components_bullet__["a" /* default */], {
                        className: 'item',
                        title: Object(__WEBPACK_IMPORTED_MODULE_8_sp_i18n__["a" /* default */])('equipment_details.facts_' + (pair[1] ? '' : 'un') + pair[0]),
                        level: pair[1] ? 2 : 0,
                        key: pair[0]
                    });
                })
            );
        }
    }]);

    return EquipmentDetailsComponentFactsFacts;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class3);



var EquipmentDetailsComponentFactsStats = (_dec4 = Object(__WEBPACK_IMPORTED_MODULE_9_sp_css_import__["a" /* ImportStyle */])(__WEBPACK_IMPORTED_MODULE_13__styles_stats_less___default.a), _dec4(_class4 = function (_React$Component4) {
    _inherits(EquipmentDetailsComponentFactsStats, _React$Component4);

    function EquipmentDetailsComponentFactsStats() {
        _classCallCheck(this, EquipmentDetailsComponentFactsStats);

        return _possibleConstructorReturn(this, (EquipmentDetailsComponentFactsStats.__proto__ || Object.getPrototypeOf(EquipmentDetailsComponentFactsStats)).apply(this, arguments));
    }

    _createClass(EquipmentDetailsComponentFactsStats, [{
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                equipment = _props2.equipment,
                className = _props2.className;

            var stats = [].concat(_toConsumableArray(__WEBPACK_IMPORTED_MODULE_4__appData_equipment_stats__["a" /* default */]));
            var isInterceptor = equipment.isType('Interceptor');

            if (equipment.isType('Aircraft')) stats.push('distance');

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                EquipmentDetailsComponentFactsContainer,
                { className: className },
                stats.map(function (stat) {
                    var value = stat === 'range' ? __WEBPACK_IMPORTED_MODULE_7_kckit__["get"].range(equipment.stat[stat]) : Object(__WEBPACK_IMPORTED_MODULE_6__appUtils_get_value__["a" /* default */])(equipment.stat[stat]);

                    if (isInterceptor) {
                        if (stat === 'hit') stat = 'antibomber';else if (stat === 'evasion') stat = 'interception';
                    }

                    {/* if (!value) return null */}
                    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        __WEBPACK_IMPORTED_MODULE_5__appUI_components_stat__["a" /* default */],
                        {
                            type: Object(__WEBPACK_IMPORTED_MODULE_8_sp_i18n__["a" /* default */])('stat.' + stat),
                            key: stat,
                            className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()(["item", {
                                "is-negative": value < 0,
                                "is-positive": value > 0 && stat !== 'range' && stat !== 'distance',
                                'disabled': !value
                            }]),
                            stat: stat
                        },
                        '' + (value > 0 && stat !== 'range' && stat !== 'distance' ? '+' : '') + (!value ? '-' : value)
                    );
                })
            );
        }
    }]);

    return EquipmentDetailsComponentFactsStats;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class4);

// import stylesScrap from './styles-scrap.less'
// @ImportStyle(stylesScrap)
// class EquipmentDetailsComponentFactsScrap extends React.Component {
//     render() {
//         return (
//             <ComponentContainer className={this.props.className} title={translate("equipment_details.scrap")}>
//                 <EquipmentDetailsComponentFactsContainer className={this.props.className}>
//                     {arrResources.map((resource, index) => {
//                         const value = getValue(this.props.equipment.dismantle[index])
//                         return (
//                             <Stat
//                                 className={
//                                     classNames(['item', {
//                                         disabled: !value
//                                     }])
//                                 }
//                                 key={index}
//                                 stat={resource}
//                             >
//                                 {value}
//                             </Stat>
//                         )
//                     })}
//                 </EquipmentDetailsComponentFactsContainer>
//             </ComponentContainer>
//         )
//     }
// }

/***/ }),

/***/ 836:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EquipmentDetailsComponentIllust; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__appUI_containers_infos_component__ = __webpack_require__(758);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__appUtils_get_pic_js__ = __webpack_require__(760);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_sp_css_import__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__styles_less__ = __webpack_require__(931);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__styles_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__styles_less__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





// import translate from 'sp-i18n'





// @connect()
var EquipmentDetailsComponentIllust = (_dec = Object(__WEBPACK_IMPORTED_MODULE_3_sp_css_import__["a" /* ImportStyle */])(__WEBPACK_IMPORTED_MODULE_4__styles_less___default.a), _dec(_class = function (_React$Component) {
    _inherits(EquipmentDetailsComponentIllust, _React$Component);

    function EquipmentDetailsComponentIllust() {
        _classCallCheck(this, EquipmentDetailsComponentIllust);

        return _possibleConstructorReturn(this, (EquipmentDetailsComponentIllust.__proto__ || Object.getPrototypeOf(EquipmentDetailsComponentIllust)).apply(this, arguments));
    }

    _createClass(EquipmentDetailsComponentIllust, [{
        key: 'render',
        value: function render() {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_1__appUI_containers_infos_component__["a" /* default */],
                { className: this.props.className },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'wrapper' },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { className: 'illust', src: Object(__WEBPACK_IMPORTED_MODULE_2__appUtils_get_pic_js__["a" /* default */])('equipment', this.props.equipment.id, 'card') })
                )
            );
        }
    }]);

    return EquipmentDetailsComponentIllust;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class);


/***/ }),

/***/ 837:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EquipmentDetailsComponentImprovements; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__appUI_containers_infos_component__ = __webpack_require__(758);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__appUI_containers_flex__ = __webpack_require__(932);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__appUI_components_improvement__ = __webpack_require__(934);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__appUI_components_bullet__ = __webpack_require__(776);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__appUI_components_link_equipment__ = __webpack_require__(812);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_sp_i18n__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_sp_css_import__ = __webpack_require__(41);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class, _dec2, _class2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }













// @connect()
var EquipmentDetailsComponentImprovements = (_dec = Object(__WEBPACK_IMPORTED_MODULE_7_sp_css_import__["a" /* ImportStyle */])(__webpack_require__(940)), _dec(_class = function (_React$Component) {
    _inherits(EquipmentDetailsComponentImprovements, _React$Component);

    function EquipmentDetailsComponentImprovements() {
        _classCallCheck(this, EquipmentDetailsComponentImprovements);

        return _possibleConstructorReturn(this, (EquipmentDetailsComponentImprovements.__proto__ || Object.getPrototypeOf(EquipmentDetailsComponentImprovements)).apply(this, arguments));
    }

    _createClass(EquipmentDetailsComponentImprovements, [{
        key: 'render',
        value: function render() {
            var list = this.props.equipment.improvement || [];
            var hasItem = !!list.length;
            var upgradable = Array.isArray(this.props.equipment.upgrade_to) && this.props.equipment.upgrade_to.length;
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_1__appUI_containers_infos_component__["a" /* default */],
                { className: this.props.className, title: Object(__WEBPACK_IMPORTED_MODULE_6_sp_i18n__["a" /* default */])("equipment_details.improvements") },
                hasItem && list.map(function (data, index) {
                    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(EquipmentDetailsComponentImprovementsImprovement, { data: data, key: index, upgradable: upgradable, className: 'flex-item' });
                }),
                hasItem && __WEBPACK_IMPORTED_MODULE_2__appUI_containers_flex__["a" /* placeholders */],
                !hasItem && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'span',
                    { className: 'disabled' },
                    Object(__WEBPACK_IMPORTED_MODULE_6_sp_i18n__["a" /* default */])("none")
                )
            );
        }
    }]);

    return EquipmentDetailsComponentImprovements;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class);

var EquipmentDetailsComponentImprovementsImprovement = (_dec2 = Object(__WEBPACK_IMPORTED_MODULE_7_sp_css_import__["a" /* ImportStyle */])(__webpack_require__(941)), _dec2(_class2 = function (_React$Component2) {
    _inherits(EquipmentDetailsComponentImprovementsImprovement, _React$Component2);

    function EquipmentDetailsComponentImprovementsImprovement() {
        _classCallCheck(this, EquipmentDetailsComponentImprovementsImprovement);

        return _possibleConstructorReturn(this, (EquipmentDetailsComponentImprovementsImprovement.__proto__ || Object.getPrototypeOf(EquipmentDetailsComponentImprovementsImprovement)).apply(this, arguments));
    }

    _createClass(EquipmentDetailsComponentImprovementsImprovement, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                className = _props.className,
                data = _props.data,
                upgradable = _props.upgradable;
            var upgrade = data.upgrade,
                req = data.req,
                resource = data.resource;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: className },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    __WEBPACK_IMPORTED_MODULE_4__appUI_components_bullet__["a" /* default */],
                    {
                        className: 'upgradability',
                        level: upgrade ? 2 : 0
                    },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'span',
                        { className: 'subtitle' },
                        upgrade ? Object(__WEBPACK_IMPORTED_MODULE_6_sp_i18n__["a" /* default */])('equipment_details.upgrade_to') : Object(__WEBPACK_IMPORTED_MODULE_6_sp_i18n__["a" /* default */])('equipment_details.facts_unupgradable')
                    ),
                    upgrade && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__appUI_components_link_equipment__["a" /* default */], {
                        equipment: upgrade[0],
                        className: 'equipment color-alt'
                    }),
                    upgrade && !!upgrade[1] && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__appUI_components_improvement__["c" /* Star */], { className: 'default-star', star: upgrade[1] })
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__appUI_components_improvement__["a" /* DayAndShip */], { className: 'dayships', data: req }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__appUI_components_improvement__["b" /* Resources */], { className: 'resources', data: resource, upgradable: upgradable })
            );
        }
    }]);

    return EquipmentDetailsComponentImprovementsImprovement;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class2);

/***/ }),

/***/ 838:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EquipmentDetailsComponentRequiredForImprovements; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__appUI_containers_infos_component__ = __webpack_require__(758);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__appUI_components_list_equipments__ = __webpack_require__(839);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_sp_i18n__ = __webpack_require__(64);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








// import { ImportStyle } from 'sp-css-import'
// import styles from './styles.less'

// @connect()
// @ImportStyle(styles)

var EquipmentDetailsComponentRequiredForImprovements = function (_React$Component) {
    _inherits(EquipmentDetailsComponentRequiredForImprovements, _React$Component);

    function EquipmentDetailsComponentRequiredForImprovements() {
        _classCallCheck(this, EquipmentDetailsComponentRequiredForImprovements);

        return _possibleConstructorReturn(this, (EquipmentDetailsComponentRequiredForImprovements.__proto__ || Object.getPrototypeOf(EquipmentDetailsComponentRequiredForImprovements)).apply(this, arguments));
    }

    _createClass(EquipmentDetailsComponentRequiredForImprovements, [{
        key: 'render',
        value: function render() {
            var list = this.props.equipment.upgrade_for || [];
            var hasItem = !!list.length;
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_1__appUI_containers_infos_component__["a" /* default */],
                { className: this.props.className, title: Object(__WEBPACK_IMPORTED_MODULE_3_sp_i18n__["a" /* default */])("equipment_details.required_for_improvements") },
                hasItem && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__appUI_components_list_equipments__["a" /* default */], { list: list }),
                !hasItem && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'span',
                    { className: 'disabled' },
                    Object(__WEBPACK_IMPORTED_MODULE_3_sp_i18n__["a" /* default */])("none")
                )
            );
        }
    }]);

    return EquipmentDetailsComponentRequiredForImprovements;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);



/***/ }),

/***/ 839:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListShips; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__appUI_components_link_equipment__ = __webpack_require__(812);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__appUtils_get_equipment_js__ = __webpack_require__(775);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_sp_css_import__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__styles_less__ = __webpack_require__(942);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__styles_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__styles_less__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









// @connect()
var ListShips = (_dec = Object(__WEBPACK_IMPORTED_MODULE_3_sp_css_import__["a" /* ImportStyle */])(__WEBPACK_IMPORTED_MODULE_4__styles_less___default.a), _dec(_class = function (_React$Component) {
    _inherits(ListShips, _React$Component);

    function ListShips() {
        _classCallCheck(this, ListShips);

        return _possibleConstructorReturn(this, (ListShips.__proto__ || Object.getPrototypeOf(ListShips)).apply(this, arguments));
    }

    _createClass(ListShips, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                className = _props.className,
                list = _props.list,
                array = _props.array,
                type = _props.type,
                props = _objectWithoutProperties(_props, ['className', 'list', 'array', 'type']);

            var _list = list || array || [];
            var hasItem = _list.length ? true : false;
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: className },
                hasItem && _list.map(function (equipmentId) {
                    return Object(__WEBPACK_IMPORTED_MODULE_2__appUtils_get_equipment_js__["a" /* default */])(equipmentId);
                }).sort(function (a, b) {
                    return a.order - b.order;
                }).map(function (equipment) {
                    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__appUI_components_link_equipment__["a" /* default */], _extends({
                        equipment: equipment,
                        key: equipment.id,
                        className: 'item color-alt'
                    }, props));
                }),
                this.props.children
            );
        }
    }]);

    return ListShips;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class);


/***/ }),

/***/ 840:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EquipmentDetailsComponentScrap; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames__ = __webpack_require__(759);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__appUI_containers_infos_component__ = __webpack_require__(758);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__appUI_components_stat__ = __webpack_require__(770);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_sp_i18n__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__appData_resources__ = __webpack_require__(779);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__appUtils_get_value__ = __webpack_require__(777);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_sp_css_import__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__styles_less__ = __webpack_require__(943);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__styles_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__styles_less__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }














// @connect()
var EquipmentDetailsComponentScrap = (_dec = Object(__WEBPACK_IMPORTED_MODULE_7_sp_css_import__["a" /* ImportStyle */])(__WEBPACK_IMPORTED_MODULE_8__styles_less___default.a), _dec(_class = function (_React$Component) {
    _inherits(EquipmentDetailsComponentScrap, _React$Component);

    function EquipmentDetailsComponentScrap() {
        _classCallCheck(this, EquipmentDetailsComponentScrap);

        return _possibleConstructorReturn(this, (EquipmentDetailsComponentScrap.__proto__ || Object.getPrototypeOf(EquipmentDetailsComponentScrap)).apply(this, arguments));
    }

    _createClass(EquipmentDetailsComponentScrap, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_2__appUI_containers_infos_component__["a" /* default */],
                { className: this.props.className, title: Object(__WEBPACK_IMPORTED_MODULE_4_sp_i18n__["a" /* default */])("equipment_details.scrap") },
                __WEBPACK_IMPORTED_MODULE_5__appData_resources__["a" /* default */].map(function (resource, index) {
                    var value = Object(__WEBPACK_IMPORTED_MODULE_6__appUtils_get_value__["a" /* default */])(_this2.props.equipment.dismantle[index]);
                    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        __WEBPACK_IMPORTED_MODULE_3__appUI_components_stat__["a" /* default */],
                        {
                            className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()(['item', {
                                disabled: !value
                            }]),
                            key: index,
                            stat: resource
                        },
                        value
                    );
                })
            );
        }
    }]);

    return EquipmentDetailsComponentScrap;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class);


/***/ }),

/***/ 841:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EquipmentDetailsComponentStocked; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__appUI_containers_infos_component__ = __webpack_require__(758);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__appUI_components_list_ships__ = __webpack_require__(795);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_sp_i18n__ = __webpack_require__(64);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








// import { ImportStyle } from 'sp-css-import'
// import styles from './styles.less'

// @connect()
// @ImportStyle(styles)

var EquipmentDetailsComponentStocked = function (_React$Component) {
    _inherits(EquipmentDetailsComponentStocked, _React$Component);

    function EquipmentDetailsComponentStocked() {
        _classCallCheck(this, EquipmentDetailsComponentStocked);

        return _possibleConstructorReturn(this, (EquipmentDetailsComponentStocked.__proto__ || Object.getPrototypeOf(EquipmentDetailsComponentStocked)).apply(this, arguments));
    }

    _createClass(EquipmentDetailsComponentStocked, [{
        key: 'render',
        value: function render() {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_1__appUI_containers_infos_component__["a" /* default */],
                { className: this.props.className, title: Object(__WEBPACK_IMPORTED_MODULE_3_sp_i18n__["a" /* default */])("equipment_details.stocked") },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__appUI_components_list_ships__["a" /* default */], {
                    list: this.props.equipment.default_equipped_on || [],
                    empty: Object(__WEBPACK_IMPORTED_MODULE_3_sp_i18n__["a" /* default */])("equipment_details.stocked_list_empty"),

                    navy: true
                })
            );
        }
    }]);

    return EquipmentDetailsComponentStocked;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);



/***/ }),

/***/ 842:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EquipmentDetailsComponentUpgradeFrom; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__appUI_containers_infos_component__ = __webpack_require__(758);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__appUI_components_list_equipments__ = __webpack_require__(839);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_sp_i18n__ = __webpack_require__(64);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








// import { ImportStyle } from 'sp-css-import'
// import styles from './styles.less'

// @connect()
// @ImportStyle(styles)

var EquipmentDetailsComponentUpgradeFrom = function (_React$Component) {
    _inherits(EquipmentDetailsComponentUpgradeFrom, _React$Component);

    function EquipmentDetailsComponentUpgradeFrom() {
        _classCallCheck(this, EquipmentDetailsComponentUpgradeFrom);

        return _possibleConstructorReturn(this, (EquipmentDetailsComponentUpgradeFrom.__proto__ || Object.getPrototypeOf(EquipmentDetailsComponentUpgradeFrom)).apply(this, arguments));
    }

    _createClass(EquipmentDetailsComponentUpgradeFrom, [{
        key: 'render',
        value: function render() {
            var list = this.props.equipment.upgrade_from || [];
            var hasItem = !!list.length;
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_1__appUI_containers_infos_component__["a" /* default */],
                { className: this.props.className, title: Object(__WEBPACK_IMPORTED_MODULE_3_sp_i18n__["a" /* default */])("equipment_details.upgrade_from") },
                hasItem && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__appUI_components_list_equipments__["a" /* default */], { list: list }),
                !hasItem && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'span',
                    { className: 'disabled' },
                    Object(__WEBPACK_IMPORTED_MODULE_3_sp_i18n__["a" /* default */])("none")
                )
            );
        }
    }]);

    return EquipmentDetailsComponentUpgradeFrom;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);



/***/ }),

/***/ 924:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return init; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return reset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return changeTab; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return changeIllust; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__redux_action_types_js__ = __webpack_require__(24);


var init = function init(id, initialState) {
    return {
        type: __WEBPACK_IMPORTED_MODULE_0__redux_action_types_js__["g" /* EQUIPMENTDETAILS_INIT */],
        id: id,
        initialState: initialState
    };
};

var reset = function reset(id, initialState) {
    return {
        type: __WEBPACK_IMPORTED_MODULE_0__redux_action_types_js__["h" /* EQUIPMENTDETAILS_RESET */],
        id: id,
        initialState: initialState
    };
};

var changeTab = function changeTab(id, tabIndex) {
    return {
        type: __WEBPACK_IMPORTED_MODULE_0__redux_action_types_js__["f" /* EQUIPMENTDETAILS_CHANGE_TAB */],
        id: id,
        tabIndex: tabIndex
    };
};

var changeIllust = function changeIllust(id, illustIndex) {
    return {
        type: __WEBPACK_IMPORTED_MODULE_0__redux_action_types_js__["e" /* EQUIPMENTDETAILS_CHANGE_ILLUSTRATION */],
        id: id,
        illustIndex: illustIndex
    };
};

/***/ }),

/***/ 925:
/***/ (function(module, exports) {

module.exports ={wrapper:'a3a9402a',css:'.a3a9402a .name-ja{display:block;height:1rem}.a3a9402a .number{background:rgba(169,193,205,.55);border-radius:.1rem;color:rgba(37,49,55,.8);display:inline-block;font-size:.6rem;height:.8rem;line-height:.8rem;margin:0 .4rem .2rem 0;padding:0 .25rem;vertical-align:text-top}.a3a9402a .name-ja~.number{margin-bottom:0}'}

/***/ }),

/***/ 926:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./commons/header.jsx": 834,
	"./components/facts/index.jsx": 835,
	"./components/illust/index.jsx": 836,
	"./components/improvements/index.jsx": 837,
	"./components/required-for-improvements/index.jsx": 838,
	"./components/scrap/index.jsx": 840,
	"./components/stats/index.jsx": 944,
	"./components/stocked/index.jsx": 841,
	"./components/upgrade-from/index.jsx": 842,
	"./infos.jsx": 945,
	"./refittable.jsx": 947
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 926;

/***/ }),

/***/ 927:
/***/ (function(module, exports) {

module.exports ={wrapper:'a7881ab4',css:'.a7881ab4{padding-top:.25rem}'}

/***/ }),

/***/ 928:
/***/ (function(module, exports) {

module.exports ={wrapper:'b632b416',css:'.b632b416{margin-right:-1rem;overflow:hidden}.b632b416 .item{float:left;padding-right:1rem}.b632b416 .title{font-size:.7rem}.b632b416+.b632b416{margin-top:1rem}'}

/***/ }),

/***/ 929:
/***/ (function(module, exports) {

module.exports ={wrapper:'d3d44900',css:'.d3d44900 .item{margin-top:0}.d3d44900 .item,.d3d44900 .item:last-child{margin-bottom:.75rem}'}

/***/ }),

/***/ 930:
/***/ (function(module, exports) {

module.exports ={wrapper:'d1db3925',css:'.d1db3925{max-width:37.5rem}.d1db3925 .item{margin-bottom:.25rem;padding-right:.5rem;width:20%}.d1db3925 .item .type{font-size:.7rem}@media (max-width:660px){.d1db3925 .item{width:33.3333%}}@media (max-width:480px){.d1db3925 .item{width:50%}}.d1db3925 .item:not(.is-negative) .type{color:#f2f2f2}'}

/***/ }),

/***/ 931:
/***/ (function(module, exports) {

module.exports ={wrapper:'d7d3845f',css:'.d7d3845f{max-width:13rem;position:relative;width:13rem}.d7d3845f .wrapper{height:0;overflow:hidden;padding-bottom:100%;position:relative}.d7d3845f .illust{display:block;position:relative;width:100%}'}

/***/ }),

/***/ 932:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return placeholders; });
/* unused harmony export default */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__appUtils_times__ = __webpack_require__(811);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_sp_css_import__ = __webpack_require__(41);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var placeholders = [];
Object(__WEBPACK_IMPORTED_MODULE_1__appUtils_times__["a" /* default */])(10)(function (index) {
    return placeholders.push(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span', { className: 'flex-item placeholder', key: index }));
});

var FlexContainer = (_dec = Object(__WEBPACK_IMPORTED_MODULE_2_sp_css_import__["a" /* ImportStyle */])(__webpack_require__(933)), _dec(_class = function (_React$Component) {
    _inherits(FlexContainer, _React$Component);

    function FlexContainer() {
        _classCallCheck(this, FlexContainer);

        return _possibleConstructorReturn(this, (FlexContainer.__proto__ || Object.getPrototypeOf(FlexContainer)).apply(this, arguments));
    }

    _createClass(FlexContainer, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                noPlaceholder = _props.noPlaceholder,
                props = _objectWithoutProperties(_props, ['children', 'noPlaceholder']);

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                props,
                children,
                !noPlaceholder && placeholders
            );
        }
    }]);

    return FlexContainer;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class);


/***/ }),

/***/ 933:
/***/ (function(module, exports) {

module.exports ={wrapper:'d3dfc541',css:'.d3dfc541{display:-webkit-box;display:-webkit-flex;display:flex}.d3dfc541>.placeholder{height:0;margin-bottom:auto;margin-top:auto}'}

/***/ }),

/***/ 934:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export default */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DayAndShip; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Resources; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Star; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__appUI_components_link__ = __webpack_require__(768);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__appUI_components_stat__ = __webpack_require__(770);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__appUI_components_link_equipment__ = __webpack_require__(812);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__appUtils_get_date_timezone__ = __webpack_require__(936);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__appUtils_get_link__ = __webpack_require__(762);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__appUtils_get_ship__ = __webpack_require__(766);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__appData_resources__ = __webpack_require__(779);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__appLogic_database__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_sp_i18n__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_sp_css_import__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__appUtils_get_value__ = __webpack_require__(777);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _dec, _class, _dec2, _class2, _dec3, _class3;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
















var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thurday", "Friday", "Saturday"];

var Improvement = function (_React$Component) {
    _inherits(Improvement, _React$Component);

    function Improvement() {
        _classCallCheck(this, Improvement);

        return _possibleConstructorReturn(this, (Improvement.__proto__ || Object.getPrototypeOf(Improvement)).apply(this, arguments));
    }

    _createClass(Improvement, [{
        key: 'render',
        value: function render() {
            return null;
        }
    }]);

    return Improvement;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);



var DayAndShip = (_dec = Object(__WEBPACK_IMPORTED_MODULE_10_sp_css_import__["a" /* ImportStyle */])(__webpack_require__(937)), _dec(_class = function (_React$Component2) {
    _inherits(DayAndShip, _React$Component2);

    function DayAndShip() {
        _classCallCheck(this, DayAndShip);

        return _possibleConstructorReturn(this, (DayAndShip.__proto__ || Object.getPrototypeOf(DayAndShip)).apply(this, arguments));
    }

    _createClass(DayAndShip, [{
        key: 'renderItem',
        value: function renderItem(data, index) {
            var _data = _slicedToArray(data, 2),
                dataDays = _data[0],
                dataShips = _data[1];

            if (dataShips) dataShips = dataShips.map(function (shipId) {
                return Object(__WEBPACK_IMPORTED_MODULE_6__appUtils_get_ship__["a" /* default */])(shipId);
            }); /*.sort((a, b) => a.order - b.order)*/
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'item', key: index },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'days' },
                    days.map(function (day, index) {
                        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            'span',
                            { className: 'day' + (dataDays[index] ? ' on' : ''), key: index },
                            Object(__WEBPACK_IMPORTED_MODULE_9_sp_i18n__["a" /* default */])('day_abbr.' + day)
                        );
                    })
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: "ships" + (!dataShips ? ' is-any' : '') },
                    dataShips && dataShips.map(function (ship, index) {
                        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            __WEBPACK_IMPORTED_MODULE_1__appUI_components_link__["a" /* default */],
                            { className: 'ship color-alt', key: index, to: Object(__WEBPACK_IMPORTED_MODULE_5__appUtils_get_link__["a" /* default */])('ship', ship.id) },
                            ship.getName(Object(__WEBPACK_IMPORTED_MODULE_9_sp_i18n__["a" /* default */])('shipname_dash_none'))
                        );
                    }),
                    !dataShips && Object(__WEBPACK_IMPORTED_MODULE_9_sp_i18n__["a" /* default */])('improvement.any_2nd_ship')
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var data = this.props.data || this.props.req || this.props.require;
            if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object' && data.req) data = data.req;
            if (!Array.isArray(data) || !data.length) data = [[[], false]];

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: this.props.className, 'data-day': Object(__WEBPACK_IMPORTED_MODULE_4__appUtils_get_date_timezone__["a" /* default */])(9).getDay() },
                data.map(this.renderItem.bind(this))
            );
        }
    }]);

    return DayAndShip;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class);

var isUndefined = function isUndefined(value) {
    return typeof value === 'undefined' || value === -1;
};

var getValue = function getValue(value) {
    if (isUndefined(value)) value = undefined;
    return Object(__WEBPACK_IMPORTED_MODULE_11__appUtils_get_value__["a" /* default */])(value);
};

var Resources = (_dec2 = Object(__WEBPACK_IMPORTED_MODULE_10_sp_css_import__["a" /* ImportStyle */])(__webpack_require__(938)), _dec2(_class2 = function (_React$Component3) {
    _inherits(Resources, _React$Component3);

    function Resources() {
        _classCallCheck(this, Resources);

        return _possibleConstructorReturn(this, (Resources.__proto__ || Object.getPrototypeOf(Resources)).apply(this, arguments));
    }

    _createClass(Resources, [{
        key: 'renderCategory',
        value: function renderCategory(category, data) {
            var title = typeof category === 'string' ? Object(__WEBPACK_IMPORTED_MODULE_9_sp_i18n__["a" /* default */])('improvement.' + category) : '\u2605+' + category + ' ~ ' + (category === 0 ? '+6' : 'MAX');
            var resources = null;
            var equipments = null;

            if (!data) {
                resources = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'span',
                    { className: 'item disabled' },
                    '-'
                );
            } else {
                switch (category) {
                    case 'resources':
                        {
                            resources = __WEBPACK_IMPORTED_MODULE_7__appData_resources__["a" /* default */].map(function (resource, index) {
                                var value = getValue(data[index]);
                                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    __WEBPACK_IMPORTED_MODULE_2__appUI_components_stat__["a" /* default */],
                                    {
                                        className: 'item item-resource',
                                        key: resource,
                                        stat: resource
                                    },
                                    value
                                );
                            });
                            break;
                        }
                    default:
                        {
                            resources = [__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                __WEBPACK_IMPORTED_MODULE_2__appUI_components_stat__["a" /* default */],
                                {
                                    className: 'item item-resource',
                                    key: 'dev',
                                    stat: 'dev'
                                },
                                getValue(data[0]),
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    'span',
                                    { className: 'guaranteed' },
                                    '(',
                                    getValue(data[1]),
                                    ')'
                                )
                            ), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                __WEBPACK_IMPORTED_MODULE_2__appUI_components_stat__["a" /* default */],
                                {
                                    className: 'item item-resource',
                                    key: 'screw',
                                    stat: 'screw'
                                },
                                getValue(data[2]),
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    'span',
                                    { className: 'guaranteed' },
                                    '(',
                                    getValue(data[3]),
                                    ')'
                                )
                            )];
                        }
                }

                // equipments
                var list = Array.isArray(data[4]) ? data[4].filter(function (item) {
                    return item[1] !== 0;
                }) : data[4] ? [[data[4], data[5]]] : [];
                if (list.length) {
                    equipments = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'span',
                        { className: 'equipments' },
                        list.map(function (arr) {
                            if (isNaN(arr[0])) {
                                var id = parseInt(arr[0].substr(arr[0].indexOf('_') + 1));
                                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    'span',
                                    {
                                        className: 'equipment equipment-other color-alt',
                                        key: arr[0]
                                    },
                                    __WEBPACK_IMPORTED_MODULE_8__appLogic_database__["a" /* default */].consumables[id]._name,
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        'span',
                                        { className: 'guaranteed' },
                                        'x',
                                        getValue(arr[1])
                                    )
                                );
                            } else {
                                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    __WEBPACK_IMPORTED_MODULE_3__appUI_components_link_equipment__["a" /* default */],
                                    {
                                        equipment: arr[0],
                                        className: 'equipment color-alt',
                                        key: arr[0]
                                    },
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        'span',
                                        { className: 'guaranteed' },
                                        'x',
                                        getValue(arr[1])
                                    )
                                );
                            }
                        })
                    );
                }
            }

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'category' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'span',
                    { className: 'category-title' },
                    title
                ),
                resources,
                equipments
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var data = this.props.data || this.props.resource || this.props.resources;
            if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object' && data.resource) data = data.resource;
            if (!Array.isArray(data)) data = [];
            var upgradable = typeof this.props.upgradable !== 'undefined' ? this.props.upgradable : typeof data[3] !== 'undefined';

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: this.props.className },
                this.renderCategory('resources', data[0] || [undefined, undefined, undefined, undefined]),
                this.renderCategory(0, data[1] || [undefined, undefined, undefined, undefined, undefined]),
                this.renderCategory(6, data[2] || [undefined, undefined, undefined, undefined, undefined]),
                upgradable && this.renderCategory('upgrading', data[3]),
                !upgradable && this.renderCategory('upgrading', false)
            );
        }
    }]);

    return Resources;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class2);

var Star = (_dec3 = Object(__WEBPACK_IMPORTED_MODULE_10_sp_css_import__["a" /* ImportStyle */])(__webpack_require__(939)), _dec3(_class3 = function (_React$Component4) {
    _inherits(Star, _React$Component4);

    function Star() {
        _classCallCheck(this, Star);

        return _possibleConstructorReturn(this, (Star.__proto__ || Object.getPrototypeOf(Star)).apply(this, arguments));
    }

    _createClass(Star, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                className = _props.className,
                star = _props.star,
                props = _objectWithoutProperties(_props, ['className', 'star']);

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'span',
                _extends({ className: className }, props),
                '+',
                star
            );
        }
    }]);

    return Star;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class3);

/***/ }),

/***/ 935:
/***/ (function(module, exports) {

module.exports ={wrapper:'b3bf9880',css:'.b3bf9880{display:inline-block;padding-left:1.3rem;position:relative}.b3bf9880 .icon:before,.b3bf9880 .icon:empty{height:1.5rem;left:-.15rem;position:absolute;top:-.15rem;width:1.5rem}'}

/***/ }),

/***/ 936:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function (hourPlus) {
    // const hourPlus = 1
    if (typeof hourPlus === 'string') {
        switch (hourPlus.toLowerCase()) {
            case 'jp':
            case 'tokyo':
                hourPlus = 9;break;
        }
    }

    var now = new Date();
    var timezoneOffsetTo = hourPlus * 60 + now.getTimezoneOffset();

    now.setHours(now.getHours() + Math.floor(timezoneOffsetTo / 60));

    return now;
});

/***/ }),

/***/ 937:
/***/ (function(module, exports) {

module.exports ={wrapper:'f8fb9193',css:'.f8fb9193{font-size:.7rem;line-height:.8rem;position:relative}.f8fb9193 .item{margin-bottom:.05rem;padding-bottom:.1rem;padding-left:7.65rem;padding-top:.1rem;position:relative}.f8fb9193 .item:last-child{margin-bottom:0}.f8fb9193 .days{left:0;overflow:hidden;position:absolute;top:0}.f8fb9193 .day{background:rgba(237,240,242,.15);color:rgba(169,193,205,.55);display:block;float:left;font-size:.6rem;height:1rem;line-height:1rem;margin-right:.05rem;text-align:center;width:1rem}.f8fb9193 .day.on{background:#388e3c;color:#b9f6ca}.f8fb9193 .day:first-child{border-bottom-left-radius:.25rem;border-top-left-radius:.25rem}.f8fb9193 .day:last-child{border-bottom-right-radius:.25rem;border-top-right-radius:.25rem}.f8fb9193 .ships{margin-right:-.6rem}.f8fb9193 .ship{margin-right:.6rem}.f8fb9193 .ship:after{color:#a9c1cd;content:"/";display:inline-block;margin:0 .2rem;position:absolute;z-index:-1}.f8fb9193 .ship:last-child:after{content:normal}.f8fb9193[data-day]:after,.f8fb9193[data-day]:before{border:.2rem solid transparent;content:"";height:0;left:.5rem;margin-left:-.2rem;overflow:hidden;position:absolute;width:0;z-index:5}.f8fb9193[data-day]:before{border-top-color:rgba(169,193,205,.55);top:-.3rem}.f8fb9193[data-day]:after{border-bottom-color:rgba(169,193,205,.55);bottom:-.3rem}.f8fb9193[data-day="1"]:after,.f8fb9193[data-day="1"]:before{left:1.55rem}.f8fb9193[data-day="2"]:after,.f8fb9193[data-day="2"]:before{left:2.6rem}.f8fb9193[data-day="3"]:after,.f8fb9193[data-day="3"]:before{left:3.65rem}.f8fb9193[data-day="4"]:after,.f8fb9193[data-day="4"]:before{left:4.7rem}.f8fb9193[data-day="5"]:after,.f8fb9193[data-day="5"]:before{left:5.75rem}.f8fb9193[data-day="6"]:after,.f8fb9193[data-day="6"]:before{left:6.8rem}.f8fb9193[data-day="7"]:after,.f8fb9193[data-day="7"]:before{left:7.85rem}'}

/***/ }),

/***/ 938:
/***/ (function(module, exports) {

module.exports ={wrapper:'b3b8f709',css:'.b3b8f709{font-size:.7rem;line-height:.9rem}.b3b8f709 .category{margin:0 0 .2rem;overflow:hidden;padding-left:4.25rem}@media (max-width:660px){.b3b8f709 .category{margin-bottom:.3rem}}.b3b8f709 .category:last-child{margin-bottom:0}.b3b8f709 .category-title{color:rgba(169,193,205,.55);display:block;margin-left:-4.25rem;position:absolute;width:4.25rem}.b3b8f709 .item{float:left;padding:0}.b3b8f709 .item.disabled{color:rgba(169,193,205,.55);opacity:1}.b3b8f709 .item-resource{width:3.75rem}@media (max-width:480px){.b3b8f709 .item-resource:nth-child(2n+2){clear:left}}.b3b8f709 .guaranteed{color:#69f0ae;padding-left:.35em}.b3b8f709 .equipments{display:block;float:left}@media (max-width:660px){.b3b8f709 .equipments{clear:left;float:none}}.b3b8f709 .equipment{display:block;padding-left:1rem}.b3b8f709 .equipment .icon:before,.b3b8f709 .equipment .icon:empty{height:1.3rem;left:-.2rem;top:-.2rem;width:1.3rem}.b3b8f709 .equipment-other{color:#e6e6e6}'}

/***/ }),

/***/ 939:
/***/ (function(module, exports) {

module.exports ={wrapper:'c9cb37d7',css:'.c9cb37d7{color:#74c674;display:inline-block;font-size:.7rem;padding-left:.8rem;vertical-align:bottom}.c9cb37d7:before{content:"★";font-size:.9rem;margin-left:-.8rem;margin-top:-.05rem;position:absolute}'}

/***/ }),

/***/ 940:
/***/ (function(module, exports) {

module.exports ={wrapper:'bbacf846',css:'.bbacf846{-webkit-box-direction:normal;-webkit-box-orient:horizontal;-webkit-flex-flow:row wrap;display:-webkit-box;display:-webkit-flex;display:flex;flex-flow:row wrap;margin-right:-1rem}.bbacf846>h2.title{-webkit-box-flex:0;-webkit-flex:none;flex:none;margin-bottom:-.75rem;width:100%}.bbacf846>.disabled{margin-top:1.25rem}.bbacf846>.flex-item{-webkit-box-flex:1;-webkit-flex:1 1 25rem;flex:1 1 25rem}.bbacf846>.flex-item.placeholder{height:0;margin-bottom:auto;margin-top:auto}'}

/***/ }),

/***/ 941:
/***/ (function(module, exports) {

module.exports ={wrapper:'d9847dee',css:'.d9847dee{margin-right:1rem;margin-top:1.5rem}.d9847dee .upgradability{display:-webkit-box;display:-webkit-flex;display:flex}.d9847dee .upgradability,.d9847dee .upgradability .des{-webkit-box-direction:normal;-webkit-box-orient:horizontal;-webkit-flex-flow:row nowrap;flex-flow:row nowrap;margin:0}.d9847dee .upgradability .des{display:inline-block;display:-webkit-box;display:-webkit-flex;display:flex;font-size:inherit}.d9847dee .upgradability .subtitle{-webkit-box-flex:0;-webkit-flex:0;flex:0;white-space:nowrap}.d9847dee .upgradability .equipment{-webkit-box-flex:1;-webkit-flex:1;flex:1;margin-left:.9rem;padding-left:1.1rem}.d9847dee .upgradability .equipment .icon:before,.d9847dee .upgradability .equipment .icon:empty{height:1.7rem;left:-.45rem;top:-.45rem;width:1.7rem}.d9847dee .upgradability .default-star{margin-left:.25em}.d9847dee .dayships,.d9847dee .resources{border-left:1.25rem solid transparent;border-top:.5rem solid transparent}@media (max-width:660px){.d9847dee .dayships,.d9847dee .resources{border-left-width:.5rem}}'}

/***/ }),

/***/ 942:
/***/ (function(module, exports) {

module.exports ={wrapper:'f09fc684',css:'.f09fc684{margin-right:-1rem;margin-top:-.25rem;overflow:hidden}.f09fc684 .item{float:left;margin-right:1rem;margin-top:.25rem}'}

/***/ }),

/***/ 943:
/***/ (function(module, exports) {

module.exports ={wrapper:'dd6e70bc',css:'.dd6e70bc{margin-right:-1rem;overflow:hidden}.dd6e70bc .item{float:left;padding-right:1rem}'}

/***/ }),

/***/ 944:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EquipmentDetailsComponentStats; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__appUI_containers_infos_component__ = __webpack_require__(758);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_sp_i18n__ = __webpack_require__(64);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







// import { ImportStyle } from 'sp-css-import'
// import styles from './styles.less'

// @connect()
// @ImportStyle(styles)

var EquipmentDetailsComponentStats = function (_React$Component) {
    _inherits(EquipmentDetailsComponentStats, _React$Component);

    function EquipmentDetailsComponentStats() {
        _classCallCheck(this, EquipmentDetailsComponentStats);

        return _possibleConstructorReturn(this, (EquipmentDetailsComponentStats.__proto__ || Object.getPrototypeOf(EquipmentDetailsComponentStats)).apply(this, arguments));
    }

    _createClass(EquipmentDetailsComponentStats, [{
        key: 'render',
        value: function render() {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_1__appUI_containers_infos_component__["a" /* default */],
                { className: this.props.className },
                Object(__WEBPACK_IMPORTED_MODULE_2_sp_i18n__["a" /* default */])('under_construction')
            );
        }
    }]);

    return EquipmentDetailsComponentStats;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);



/***/ }),

/***/ 945:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EquipmentDetailsContentInfos; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_illust__ = __webpack_require__(836);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_facts__ = __webpack_require__(835);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_scrap__ = __webpack_require__(840);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_improvements__ = __webpack_require__(837);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_required_for_improvements__ = __webpack_require__(838);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_upgrade_from__ = __webpack_require__(842);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_stocked__ = __webpack_require__(841);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_sp_css_import__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__infos_less__ = __webpack_require__(946);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__infos_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__infos_less__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





// import Stats from './components/stats'









// @connect()
var EquipmentDetailsContentInfos = (_dec = Object(__WEBPACK_IMPORTED_MODULE_8_sp_css_import__["a" /* ImportStyle */])(__WEBPACK_IMPORTED_MODULE_9__infos_less___default.a), _dec(_class = function (_React$Component) {
    _inherits(EquipmentDetailsContentInfos, _React$Component);

    function EquipmentDetailsContentInfos() {
        _classCallCheck(this, EquipmentDetailsContentInfos);

        return _possibleConstructorReturn(this, (EquipmentDetailsContentInfos.__proto__ || Object.getPrototypeOf(EquipmentDetailsContentInfos)).apply(this, arguments));
    }

    _createClass(EquipmentDetailsContentInfos, [{
        key: 'render',
        value: function render() {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: this.props.className },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__components_illust__["default"], { equipment: this.props.equipment, className: 'equipmentinfo equipmentinfo-illust' }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__components_facts__["default"], { equipment: this.props.equipment, className: 'equipmentinfo equipmentinfo-facts' }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__components_scrap__["default"], { equipment: this.props.equipment, className: 'equipmentinfo equipmentinfo-scrap' }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__components_improvements__["default"], { equipment: this.props.equipment, className: 'equipmentinfo equipmentinfo-improvements' }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__components_required_for_improvements__["default"], { equipment: this.props.equipment, className: 'equipmentinfo equipmentinfo-required-for-improvements' }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__components_upgrade_from__["default"], { equipment: this.props.equipment, className: 'equipmentinfo equipmentinfo-upgrade-from' }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__components_stocked__["default"], { equipment: this.props.equipment, className: 'equipmentinfo equipmentinfo-stocked' })
            );
        }
    }]);

    return EquipmentDetailsContentInfos;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class);


/***/ }),

/***/ 946:
/***/ (function(module, exports) {

module.exports ={wrapper:'ff1fa5e6',css:'.ff1fa5e6 .equipmentinfo-illust{float:right;margin-bottom:-5rem;margin-left:1rem}@media (max-width:1440px){.ff1fa5e6 .equipmentinfo-illust{width:20vw}}@media (max-width:850px){.ff1fa5e6 .equipmentinfo-illust{float:none;margin-bottom:auto;margin-left:auto;margin-right:auto;width:auto}}'}

/***/ }),

/***/ 947:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EquipmentDetailsRefittable; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_sp_i18n__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_sp_css_import__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__refittable_less__ = __webpack_require__(948);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__refittable_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__refittable_less__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }


// import { Link } from 'react-router'


// import db from '@appLogic/database'




// @connect()
var EquipmentDetailsRefittable = (_dec = Object(__WEBPACK_IMPORTED_MODULE_2_sp_css_import__["a" /* ImportStyle */])(__WEBPACK_IMPORTED_MODULE_3__refittable_less___default.a), _dec(_class = function (_React$Component) {
    _inherits(EquipmentDetailsRefittable, _React$Component);

    function EquipmentDetailsRefittable() {
        _classCallCheck(this, EquipmentDetailsRefittable);

        return _possibleConstructorReturn(this, (EquipmentDetailsRefittable.__proto__ || Object.getPrototypeOf(EquipmentDetailsRefittable)).apply(this, arguments));
    }

    _createClass(EquipmentDetailsRefittable, [{
        key: 'render',
        value: function render() {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: this.props.className },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'h3',
                    null,
                    'REFITTABLE'
                ),
                Object(__WEBPACK_IMPORTED_MODULE_1_sp_i18n__["a" /* default */])('under_construction')
            );
        }
    }]);

    return EquipmentDetailsRefittable;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class);


/***/ }),

/***/ 948:
/***/ (function(module, exports) {

module.exports ={wrapper:'dd41d8cd9',css:''}

/***/ })

};;