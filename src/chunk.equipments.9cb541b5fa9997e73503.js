exports.ids = [4];
exports.modules = {

/***/ 745:
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__appLogic_database__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__appLogic_equipment_list_api_js__ = __webpack_require__(793);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__appUI_components_equipment_list__ = __webpack_require__(872);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_sp_css_import__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__list_less__ = __webpack_require__(885);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__list_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__list_less__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




// import Link from '@appUI/components/link'












var equipmentListId = 'pageEquipmentList';

var About = (_dec = Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["b" /* connect */])(function (state) {
    return {
        isEquipmentListInit: typeof state.equipmentList[equipmentListId] !== 'undefined'
    };
}), _dec2 = Object(__WEBPACK_IMPORTED_MODULE_8_sp_css_import__["a" /* ImportStyle */])(__WEBPACK_IMPORTED_MODULE_9__list_less___default.a), _dec(_class = _dec2(_class = function (_React$Component) {
    _inherits(About, _React$Component);

    function About() {
        _classCallCheck(this, About);

        return _possibleConstructorReturn(this, (About.__proto__ || Object.getPrototypeOf(About)).apply(this, arguments));
    }

    _createClass(About, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            if (this.props.isEquipmentListInit && this.props.location.action === 'PUSH') this.props.dispatch(Object(__WEBPACK_IMPORTED_MODULE_6__appLogic_equipment_list_api_js__["d" /* reset */])(equipmentListId));
        }
    }, {
        key: 'render',
        value: function render() {
            if (false) console.log('Equipment Collections', db.equipmentCollections);
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_3_sp_ui_pagecontainer__["a" /* default */],
                { className: this.props.className },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__appUI_components_equipment_list__["a" /* default */], { id: equipmentListId })
            );
            // return (
            //     <PageContainer
            //         className={this.props.className}
            //     >
            //         <p><i>{translate('under_construction')}...</i></p>
            //         {db.equipmentCollections.map((collection, collectionIndex) => (
            //             <div key={collectionIndex}>
            //                 <h3>{collection.name}</h3>
            //                 {collection.list.map((list, listIndex) => (
            //                     <div key={`${collectionIndex}-${listIndex}`}>
            //                         <h5>{db.equipmentTypes[list.type]._name}</h5>
            //                         <ul>
            //                             {list.equipments.map((equipment, equipmentIndex) => (
            //                                 <li key={`${collectionIndex}-${listIndex}-${equipmentIndex}`}>
            //                                     <Link to={`/equipments/${equipment.id}`}>
            //                                         {equipment._name}
            //                                     </Link>
            //                                 </li>
            //                             ))}
            //                         </ul>
            //                     </div>
            //                 ))}
            //                 <hr />
            //                 <br />
            //             </div>
            //         ))}
            //     </PageContainer>
            // )
        }
    }], [{
        key: 'onServerRenderHtmlExtend',
        value: function onServerRenderHtmlExtend(ext, store) {
            var head = Object(__WEBPACK_IMPORTED_MODULE_4__appUtils_html_head_js__["a" /* default */])({
                store: store,
                title: Object(__WEBPACK_IMPORTED_MODULE_2_sp_i18n__["a" /* default */])('nav.equipments')
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

/***/ 775:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_kckit__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_kckit___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_kckit__);


/* harmony default export */ __webpack_exports__["a"] = (function (item) {
  return __WEBPACK_IMPORTED_MODULE_0_kckit__["get"].equipment(item);
});

/***/ }),

/***/ 788:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataTable; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_sp_css_import__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__datatable_less__ = __webpack_require__(797);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__datatable_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__datatable_less__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var DataTable = (_dec = Object(__WEBPACK_IMPORTED_MODULE_1_sp_css_import__["a" /* ImportStyle */])(__WEBPACK_IMPORTED_MODULE_2__datatable_less___default.a), _dec(_class = function (_React$Component) {
    _inherits(DataTable, _React$Component);

    function DataTable() {
        _classCallCheck(this, DataTable);

        return _possibleConstructorReturn(this, (DataTable.__proto__ || Object.getPrototypeOf(DataTable)).apply(this, arguments));
    }

    _createClass(DataTable, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            // console.log(prevProps.scrollLeft, this.props.scrollLeft, this._table, this._table.scrollLeft)
            if (!this._table || typeof this.props.scrollLeft === 'undefined' || this._table.scrollLeft === this.props.scrollLeft) return;
            this._table.scrollLeft = this.props.scrollLeft;
        }
    }, {
        key: 'renderHeader',
        value: function renderHeader() {
            if (!this.props.headers) return null;
            var TagName = this.props.tag || 'thead';
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                TagName,
                { className: 'header' },
                this.renderRow(this.props.headers)
            );
        }
    }, {
        key: 'renderBody',
        value: function renderBody() {
            var _this2 = this;

            if (!this.props.data) return null;
            var TagName = this.props.tag || 'tbody';
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                TagName,
                { className: 'body' },
                this.props.data.map(function (row, index) {
                    if ((typeof row === 'undefined' ? 'undefined' : _typeof(row)) === 'object' && row.cells) return _this2.renderRow(row.cells, row.key || index, row.props);
                    return _this2.renderRow(row, index);
                })
            );
        }
    }, {
        key: 'renderRow',
        value: function renderRow(data) {
            var _this3 = this;

            var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            var TagName = this.props.tag || 'tr';
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                TagName,
                _extends({ className: 'row', key: index }, props),
                data.map(function (children, index2) {
                    return _this3.renderCell(children, index, index2);
                })
            );
        }
    }, {
        key: 'renderCell',
        value: function renderCell(data, indexRow, indexCell) {
            var TagName = this.props.tag || 'td';
            var content = data;
            var props = {};

            if (Array.isArray(data)) {
                content = data[0];
                props = data[1];
            }

            if (props.className) props.className = 'cell ' + props.className;else props.className = 'cell';

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                TagName,
                _extends({ key: indexRow + '-' + indexCell }, props),
                content
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var TagName = this.props.tag || 'table';

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                TagName,
                {
                    className: this.props.className + (TagName !== 'table' ? ' flex' : ''),
                    onScroll: this.props.onScroll,
                    ref: function ref(el) {
                        return _this4._table = el;
                    }
                },
                this.renderHeader(),
                this.renderBody()
            );
        }
    }]);

    return DataTable;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class);


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

/***/ 793:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return init; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return reset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return changeCollection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return highlightColumn; });
/* unused harmony export scroll */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions_js__ = __webpack_require__(871);


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

var changeCollection = function changeCollection(id, collection) {
    return function (dispatch) {
        dispatch(__WEBPACK_IMPORTED_MODULE_0__actions_js__["a" /* changeCollection */](id, collection));
    };
};

var highlightColumn = function highlightColumn(id, column) {
    return function (dispatch) {
        dispatch(__WEBPACK_IMPORTED_MODULE_0__actions_js__["b" /* highlightColumn */](id, column));
    };
};

var scroll = function scroll(id, scrollLeft) {
    return function (dispatch) {
        dispatch(__WEBPACK_IMPORTED_MODULE_0__actions_js__["e" /* scroll */](id, scrollLeft));
    };
};

/***/ }),

/***/ 794:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (['fire', 'torpedo', 'aa', 'asw', 'bomb', 'hit', 'armor', 'evasion', 'los', 'range']);

/***/ }),

/***/ 797:
/***/ (function(module, exports) {

module.exports ={wrapper:'b4207bec',css:'.b4207bec{overflow-y:hidden}.b4207bec .cell{position:relative}.b4207bec .empty{color:rgba(169,193,205,.55);font-size:.6rem}.b4207bec .body .row{border-top:.05rem solid rgba(237,240,242,.15)}html.is-hover .b4207bec .body .cell:hover:after{background:rgba(0,0,0,.15);bottom:-100vh;content:"";left:0;position:absolute;right:0;top:-100vh;z-index:-1}.b4207bec.flex{display:block}.b4207bec.flex .row{-webkit-align-items:stretch;-webkit-box-align:stretch;-webkit-box-direction:normal;-webkit-box-orient:horizontal;-webkit-flex-flow:row nowrap;align-items:stretch;display:-webkit-box;display:-webkit-flex;display:flex;flex-flow:row nowrap;width:100%}.b4207bec.flex .cell{-webkit-box-flex:1;-webkit-flex:1 1 auto;display:block;flex:1 1 auto}'}

/***/ }),

/***/ 798:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function (uri) {
    if (false) return;

    // console.log(
    //     (__SPA__ ? '' : location.pathname)
    //     + (uri.substr(0, 1) !== '/' ? '/' : '')
    //     + uri
    // )

    self.routerHistory.push((uri.substr(0, 1) !== '/' ? '/' : '') + uri);
});

/***/ }),

/***/ 871:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return init; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return reset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return changeCollection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return highlightColumn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return scroll; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__redux_action_types_js__ = __webpack_require__(24);


var init = function init(id, initialState) {
    return {
        type: __WEBPACK_IMPORTED_MODULE_0__redux_action_types_js__["k" /* EQUIPMENTLIST_INIT */],
        id: id,
        initialState: initialState
    };
};

var reset = function reset(id, initialState) {
    return {
        type: __WEBPACK_IMPORTED_MODULE_0__redux_action_types_js__["l" /* EQUIPMENTLIST_RESET */],
        id: id,
        initialState: initialState
    };
};

var changeCollection = function changeCollection(id, collection) {
    return {
        type: __WEBPACK_IMPORTED_MODULE_0__redux_action_types_js__["i" /* EQUIPMENTLIST_CHANGE_COLLECTION */],
        id: id,
        collection: collection
    };
};

var highlightColumn = function highlightColumn(id, column) {
    return {
        type: __WEBPACK_IMPORTED_MODULE_0__redux_action_types_js__["j" /* EQUIPMENTLIST_HIGHLIGHT_COLUMN */],
        id: id,
        column: column
    };
};

var scroll = function scroll(id, scrollLeft) {
    return {
        type: __WEBPACK_IMPORTED_MODULE_0__redux_action_types_js__["m" /* EQUIPMENTLIST_SCROLL */],
        id: id,
        scrollLeft: scrollLeft
    };
};

/***/ }),

/***/ 872:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__body_jsx__ = __webpack_require__(873);


/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__body_jsx__["a" /* default */]);

/***/ }),

/***/ 873:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EquipmentList; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_transition_group_TransitionGroup__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_transition_group_TransitionGroup___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_transition_group_TransitionGroup__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_transition_group_CSSTransition__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_transition_group_CSSTransition___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_transition_group_CSSTransition__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_classnames__ = __webpack_require__(759);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__appLogic_database__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__appLogic_equipment_list_api_js__ = __webpack_require__(793);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__title_jsx__ = __webpack_require__(874);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__header_jsx__ = __webpack_require__(876);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__table_body_jsx__ = __webpack_require__(882);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_sp_css_import__ = __webpack_require__(41);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class, _dec2, _dec3, _class2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







// import translate from 'sp-i18n'


// import { REALTIME_LOCATION_REDUCER_NAME } from '@app/client/redux/realtime-location'


// import List from './list.jsx'




// import style from './body.less'

// @ImportStyle(style)
var EquipmentList = (_dec = Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["b" /* connect */])(function (state, ownProps) {
    return {
        // ...state.shipList[ownProps.id],
        isInit: state.equipmentList[ownProps.id] ? true : false
        // location: state[REALTIME_LOCATION_REDUCER_NAME]
    };
}), _dec(_class = function (_React$Component) {
    _inherits(EquipmentList, _React$Component);

    function EquipmentList() {
        _classCallCheck(this, EquipmentList);

        return _possibleConstructorReturn(this, (EquipmentList.__proto__ || Object.getPrototypeOf(EquipmentList)).apply(this, arguments));
    }

    _createClass(EquipmentList, [{
        key: 'render',

        // componentWillMount() {
        //     if (this.props.isInit && this.props.location && this.props.location.action === 'PUSH')
        //         this.props.dispatch(listReset(this.props.id))
        // }

        value: function render() {
            if (!this.props.isInit) {
                this.props.dispatch(Object(__WEBPACK_IMPORTED_MODULE_6__appLogic_equipment_list_api_js__["c" /* init */])(this.props.id));
                if (true) return null;
            }

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(EquipmentListBody, this.props);
        }
    }]);

    return EquipmentList;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class);

// @connect((state, ownProps) => ({
//     ...state.equipmentList[ownProps.id],
//     // location: state.location
// }))


var EquipmentListBody = (_dec2 = Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["b" /* connect */])(function (state, ownProps) {
    var obj = _extends({}, state.equipmentList[ownProps.id]) || {};
    delete obj.column;
    return obj;
}), _dec3 = Object(__WEBPACK_IMPORTED_MODULE_10_sp_css_import__["a" /* ImportStyle */])(__webpack_require__(884)), _dec2(_class2 = _dec3(_class2 = function (_React$Component2) {
    _inherits(EquipmentListBody, _React$Component2);

    function EquipmentListBody() {
        _classCallCheck(this, EquipmentListBody);

        return _possibleConstructorReturn(this, (EquipmentListBody.__proto__ || Object.getPrototypeOf(EquipmentListBody)).apply(this, arguments));
    }

    _createClass(EquipmentListBody, [{
        key: 'renderCollection',
        value: function renderCollection(collection, index) {
            var _this3 = this;

            if (typeof index !== 'undefined') index = index + '-';else index = '';
            return collection.list.map(function (type, typeIndex) {
                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    CSSTransitionComponent,
                    { key: index + typeIndex },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        { className: __WEBPACK_IMPORTED_MODULE_4_classnames___default()({
                                'first': typeIndex === 0,
                                'last': typeIndex === collection.list.length - 1
                            }) },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__title_jsx__["a" /* default */], { id: _this3.props.id, type: type.type }),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9__table_body_jsx__["a" /* default */], { id: _this3.props.id, equipments: type.equipments })
                    )
                );
            });
        }
    }, {
        key: 'renderBody',
        value: function renderBody() {
            // console.log(db)
            if (true) {
                // if (__DEV__) console.log(this.props.collection, db.equipmentCollections[this.props.collection])
                return this.renderCollection(__WEBPACK_IMPORTED_MODULE_5__appLogic_database__["a" /* default */].equipmentCollections[this.props.collection], 'c-' + this.props.collection);
            } else {
                return db.equipmentCollections.map(this.renderCollection.bind(this));
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps /*, prevState*/) {
            if (prevProps.collection !== this.props.collection) window.scrollTo(undefined, 0);
        }
    }, {
        key: 'render',
        value: function render() {
            if (false) {
                // if (__DEV__) {
                console.log('equipmentList', this.props);
                var t0 = performance.now();
                setTimeout(function () {
                    console.log("Rendering equipment-list took " + (performance.now() - t0) + " milliseconds.");
                });
            }

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: this.props.className,
                    'data-equipmentlist-id': this.props.id
                },
                true && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__header_jsx__["a" /* default */], { id: this.props.id }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    __WEBPACK_IMPORTED_MODULE_2_react_transition_group_TransitionGroup___default.a,
                    {
                        component: 'div',
                        className: 'wrapper'
                    },
                    this.renderBody()
                )
            );
        }
    }]);

    return EquipmentListBody;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class2) || _class2);

// @connect((state, ownProps) => ({
//     ...state.equipmentList[ownProps.id],
//     // location: state.location
// }))
// @connect()
// @ImportStyle(style)
// class EquipmentListBodyList extends React.Component {
//     render() {
//         return (
//             <div className={this.props.className}>
//                 <Title id={this.props.id} type={this.props.type} />
//                 {this.props.children}
//             </div>
//         )
//     }
// }

var CSSTransitionComponent = function CSSTransitionComponent(props) {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_transition_group_CSSTransition___default.a, _extends({}, props, {
        classNames: 'transition',
        timeout: {
            enter: 200
        },
        exit: false
    }));
};

/***/ }),

/***/ 874:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShipListTitle; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__appLogic_database__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__appUI_components_icon_equipment__ = __webpack_require__(767);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_sp_css_import__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__title_less__ = __webpack_require__(875);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__title_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__title_less__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }


// import { connect } from 'react-redux'

// import translate from 'sp-i18n'







// @connect((state, ownProps) => ({}))
var ShipListTitle = (_dec = Object(__WEBPACK_IMPORTED_MODULE_3_sp_css_import__["a" /* ImportStyle */])(__WEBPACK_IMPORTED_MODULE_4__title_less___default.a), _dec(_class = function (_React$Component) {
    _inherits(ShipListTitle, _React$Component);

    function ShipListTitle() {
        _classCallCheck(this, ShipListTitle);

        return _possibleConstructorReturn(this, (ShipListTitle.__proto__ || Object.getPrototypeOf(ShipListTitle)).apply(this, arguments));
    }

    _createClass(ShipListTitle, [{
        key: 'render',
        value: function render() {
            if (this.props.type) {
                var type = __WEBPACK_IMPORTED_MODULE_1__appLogic_database__["a" /* default */].equipmentTypes[this.props.type];
                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    __WEBPACK_IMPORTED_MODULE_2__appUI_components_icon_equipment__["a" /* default */],
                    { tag: 'h4', className: this.props.className, icon: type.icon },
                    type._name
                );
            } else return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'h4',
                { className: this.props.className },
                '--'
            );
        }
    }]);

    return ShipListTitle;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class);


/***/ }),

/***/ 875:
/***/ (function(module, exports) {

module.exports ={wrapper:'ff203621',css:'.ff203621{display:block;height:2.5rem;line-height:1.8rem;margin:0;padding-right:1em;padding-top:.7rem}.first .ff203621{height:1.8rem;margin-top:-.4rem;padding-top:0}'}

/***/ }),

/***/ 876:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EquipmentListHeader; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_sp_i18n__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__appLogic_database__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__appLogic_equipment_list_api_js__ = __webpack_require__(793);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__appUI_components_main_header_jsx__ = __webpack_require__(764);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__table_header_jsx__ = __webpack_require__(877);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_sp_css_import__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__header_less__ = __webpack_require__(879);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__header_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__header_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__header_tabs_less__ = __webpack_require__(880);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__header_tabs_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__header_tabs_less__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class, _dec3, _dec4, _class2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






// import bindEvent from 'bind-event'

// import classNames from 'classnames'


// import Icon from '@appUI/components/icon.jsx'
// import Button from '@appUI/components/button.jsx'
// import ButtonGroup from '@appUI/components/button-group.jsx'





var EquipmentListHeader = (_dec = Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["b" /* connect */])(function (state, ownProps) {
    return state.equipmentList[ownProps.id] || {};
}), _dec2 = Object(__WEBPACK_IMPORTED_MODULE_7_sp_css_import__["a" /* ImportStyle */])(__WEBPACK_IMPORTED_MODULE_8__header_less___default.a), _dec(_class = _dec2(_class = function (_React$Component) {
    _inherits(EquipmentListHeader, _React$Component);

    function EquipmentListHeader() {
        _classCallCheck(this, EquipmentListHeader);

        return _possibleConstructorReturn(this, (EquipmentListHeader.__proto__ || Object.getPrototypeOf(EquipmentListHeader)).apply(this, arguments));
    }

    _createClass(EquipmentListHeader, [{
        key: 'render',
        value: function render() {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_5__appUI_components_main_header_jsx__["a" /* default */],
                { className: this.props.className },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Tabs, { id: this.props.id }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__table_header_jsx__["a" /* default */], { id: this.props.id })
            );
        }
    }]);

    return EquipmentListHeader;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class) || _class);




var Tabs = (_dec3 = Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["b" /* connect */])(function (state, ownProps) {
    return {
        collection: state.equipmentList[ownProps.id].collection
    };
}), _dec4 = Object(__WEBPACK_IMPORTED_MODULE_7_sp_css_import__["a" /* ImportStyle */])(__WEBPACK_IMPORTED_MODULE_9__header_tabs_less___default.a), _dec3(_class2 = _dec4(_class2 = function (_React$Component2) {
    _inherits(Tabs, _React$Component2);

    function Tabs() {
        _classCallCheck(this, Tabs);

        return _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).apply(this, arguments));
    }

    _createClass(Tabs, [{
        key: 'onTabClick',
        value: function onTabClick(collection) {
            this.props.dispatch(Object(__WEBPACK_IMPORTED_MODULE_4__appLogic_equipment_list_api_js__["a" /* changeCollection */])(this.props.id, collection));
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: this.props.className },
                __WEBPACK_IMPORTED_MODULE_3__appLogic_database__["a" /* default */].equipmentCollections.map(function (collection, index) {
                    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'span',
                        {
                            key: index,
                            className: 'link item' + (_this3.props.collection === index ? ' on' : ''),
                            'data-tab-index': index + 1,
                            onClick: function onClick() {
                                _this3.onTabClick(index);
                            }
                        },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span', { className: 'name',
                            dangerouslySetInnerHTML: {
                                __html: collection.name.split('&').join('<br>')
                            }
                        })
                    );
                })
            );
        }
    }]);

    return Tabs;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class2) || _class2);

/***/ }),

/***/ 877:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShipListTableHeader; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames__ = __webpack_require__(759);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_sp_i18n__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__datatable_jsx__ = __webpack_require__(788);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__appData_equipment_stats__ = __webpack_require__(794);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_sp_css_import__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__table_header_less__ = __webpack_require__(878);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__table_header_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__table_header_less__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }








// import {
//     compareScroll,
//     compareSort
// } from '@appLogic/equipment-list/api.js'

// import IconStat from '@appUI/components/icon-stat.jsx'




var headers = [''].concat(_toConsumableArray(__WEBPACK_IMPORTED_MODULE_5__appData_equipment_stats__["a" /* default */]), ['equipment.craftable', 'equipment.improvable']);

var ShipListTableHeader = (_dec = Object(__WEBPACK_IMPORTED_MODULE_6_sp_css_import__["a" /* ImportStyle */])(__WEBPACK_IMPORTED_MODULE_7__table_header_less___default.a), _dec2 = Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["b" /* connect */])(function (state, ownProps) {
    return {
        collection: state.equipmentList[ownProps.id].collection,
        //     sortType: state.shipList[ownProps.id].compareSort[0],
        //     sortOrder: state.shipList[ownProps.id].compareSort[1],
        //     scrollLeft: state.shipList[ownProps.id].compareScrollLeft
        columnHighlight: state.equipmentList[ownProps.id].column
    };
}), _dec(_class = _dec2(_class = function (_React$Component) {
    _inherits(ShipListTableHeader, _React$Component);

    function ShipListTableHeader() {
        _classCallCheck(this, ShipListTableHeader);

        return _possibleConstructorReturn(this, (ShipListTableHeader.__proto__ || Object.getPrototypeOf(ShipListTableHeader)).apply(this, arguments));
    }

    _createClass(ShipListTableHeader, [{
        key: 'getHeader',
        value: function getHeader(stat) {
            if (this.props.collection === 2 && stat === 'range') stat = 'distance';
            return [stat ? Object(__WEBPACK_IMPORTED_MODULE_3_sp_i18n__["a" /* default */])('stat.' + stat) : null, {
                className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()({
                    'cell-name': !stat,
                    'is-highlight': this.props.columnHighlight === stat
                }),
                "data-stat": stat.replace(/^equipment\./, '') || undefined
            }];
        }
    }, {
        key: 'render',
        value: function render() {
            // onScroll={this.onScroll.bind(this)}
            // scrollLeft={this.props.scrollLeft}
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__datatable_jsx__["a" /* default */], {
                className: this.props.className,
                tag: 'div',
                headers: headers.map(this.getHeader.bind(this))
            });
        }
    }]);

    return ShipListTableHeader;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class) || _class);


/***/ }),

/***/ 878:
/***/ (function(module, exports) {

module.exports ={wrapper:'ffc71c70',css:'.ffc71c70{height:2rem}.ffc71c70.flex{overflow-x:hidden;padding-left:0}@media (max-width:1024px){.ffc71c70.flex{margin-left:-1.5rem;margin-right:-.75rem}}@media (max-width:850px){.ffc71c70.flex{margin-left:-1.2rem;margin-right:-1.2rem}}@media (max-width:850px) and all and (max-width:660px){.ffc71c70.flex{margin-left:-.6rem;margin-right:-.6rem}}@media (max-width:660px){.ffc71c70.flex{margin-left:-.6rem;margin-right:-.6rem}}@media (max-width:850px){.ffc71c70.flex .row:after{-webkit-box-flex:0;-webkit-box-ordinal-group:101;-webkit-flex:0 0 .5em;-webkit-order:100;content:"";flex:0 0 .5em;height:.05rem;order:100}}@media (max-width:660px){.ffc71c70.flex .row:after{-webkit-flex-basis:0.4rem;flex-basis:0.4rem}}.ffc71c70.flex .row .cell{-webkit-box-flex:1;-webkit-flex:1 0 2rem;flex:1 0 2rem;font-size:.7rem}.ffc71c70.flex .row .cell.cell-name{-webkit-box-flex:7.5;-webkit-flex:7.5 0 7.5rem;flex:7.5 0 7.5rem;pointer-events:none;text-align:left;z-index:-1}@supports (pointer-events:none){.ffc71c70.flex .row .cell.cell-name{z-index:auto}}.ffc71c70.flex .row .cell[data-stat]{text-align:center}@media (max-width:660px){.ffc71c70.flex .row .cell.cell-name{-webkit-flex-basis:4.25rem;-webkit-flex-shrink:1;flex-basis:4.25rem;flex-shrink:1}.ffc71c70.flex .row .cell[data-stat]{-webkit-flex-basis:2em;flex-basis:2em;font-size:.6rem;width:2em}.ffc71c70.flex .row .cell[data-stat=craftable],.ffc71c70.flex .row .cell[data-stat=improvable]{display:none}}.ffc71c70.flex .cell{height:2rem;line-height:2rem}html.is-hover .ffc71c70.flex .cell.is-highlight{background:hsla(0,0%,100%,.1)}@media (max-width:660px){.ffc71c70.flex .row .cell[data-stat]{-webkit-transform:rotate(-30deg);transform:rotate(-30deg)}}'}

/***/ }),

/***/ 879:
/***/ (function(module, exports) {

module.exports ={wrapper:'d570d276',css:'#main-mask .d570d276:before{border-bottom:.05rem solid rgba(237,240,242,.15);border-top:.05rem solid rgba(237,240,242,.15);bottom:0;content:"";height:2rem;left:0;position:absolute;top:auto;width:100%;z-index:-1}#main-mask .d570d276:after{background:rgba(0,0,0,.2);bottom:.05rem;height:1.9rem;top:auto;z-index:-2}'}

/***/ }),

/***/ 880:
/***/ (function(module, exports, __webpack_require__) {

module.exports ={wrapper:'e7e5d52a',css:'.e7e5d52a{font-size:.7rem;margin-bottom:-.05rem;margin-left:-2vw;overflow:hidden;position:relative;z-index:2}.e7e5d52a .item{-webkit-align-items:center;-webkit-box-align:center;-webkit-box-direction:normal;-webkit-box-orient:horizontal;-webkit-flex-flow:row nowrap;align-items:center;border-bottom:.1rem solid transparent;color:rgba(169,193,205,.55);display:inline-block;display:-webkit-box;display:-webkit-flex;display:flex;flex-flow:row nowrap;float:left;height:3.05rem;line-height:1.2em;margin-left:2vw;padding-left:1.4rem;position:relative}html.is-hover .e7e5d52a .item:hover{color:#fff}.e7e5d52a .item:active,html.is-hover .e7e5d52a .item:hover:active{color:hsla(0,0%,100%,.5)}.e7e5d52a .item.on{border-bottom-color:#40c4ff;color:#fff;pointer-events:none;z-index:-1}.e7e5d52a .item:before{background:url(' + __webpack_require__(881) + ') no-repeat 50% 0/cover;content:"";height:1.2rem;left:0;margin-top:-.6rem;opacity:.4;position:absolute;top:50%;width:1.2rem}.e7e5d52a .item:after{content:8}html.is-hover .e7e5d52a .item:hover:before{opacity:1}html.is-hover .e7e5d52a .item:hover:active:before{opacity:.4}.e7e5d52a .item.on:before{opacity:1}.e7e5d52a .item:active:before{opacity:.4}.e7e5d52a .item .name{transition:none}@media (max-width:660px){.e7e5d52a .item{height:2.3rem}}.e7e5d52a .item[data-tab-index="1"]:before{background-position:50% 0}.e7e5d52a .item[data-tab-index="2"]:before{background-position:50% 14.28571429%}.e7e5d52a .item[data-tab-index="3"]:before{background-position:50% 28.57142857%}.e7e5d52a .item[data-tab-index="4"]:before{background-position:50% 42.85714286%}.e7e5d52a .item[data-tab-index="5"]:before{background-position:50% 57.14285714%}.e7e5d52a .item[data-tab-index="6"]:before{background-position:50% 71.42857143%}.e7e5d52a .item[data-tab-index="7"]:before{background-position:50% 85.71428571%}.e7e5d52a .item[data-tab-index="8"]:before{background-position:50% 100%}@media (max-width:1024px){.e7e5d52a{font-size:.6rem;margin-left:-1rem}.e7e5d52a .item{margin-left:1rem}}@media (max-width:850px){.e7e5d52a{-webkit-box-direction:normal;-webkit-box-orient:horizontal;-webkit-flex-flow:row nowrap;display:-webkit-box;display:-webkit-flex;display:flex;flex-flow:row nowrap;margin:0 0 -.05rem}.e7e5d52a .item{-webkit-box-flex:1;-webkit-flex:1;flex:1;float:none;margin:0;padding:0}.e7e5d52a .item:before{left:50%;margin-left:-.6rem}.e7e5d52a .item .name{display:none}}'}

/***/ }),

/***/ 881:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/017317e08bf0dcc88363eeb52e679184.png";

/***/ }),

/***/ 882:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EquipmentListTableBody; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__datatable_jsx__ = __webpack_require__(788);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__appUI_components_link__ = __webpack_require__(768);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_kckit__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_kckit___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_kckit__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__appLogic_equipment_list_api_js__ = __webpack_require__(793);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__appData_equipment_stats__ = __webpack_require__(794);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__appUtils_router_push__ = __webpack_require__(798);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__appUtils_get_link__ = __webpack_require__(762);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_sp_css_import__ = __webpack_require__(41);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }



// import { browserHistory } from 'react-router'








// import DataTableFlex, { Row, Cell } from '@appUI/components/datatable-flex'


// import style from './table-body.less'

var stats = [].concat(_toConsumableArray(__WEBPACK_IMPORTED_MODULE_6__appData_equipment_stats__["a" /* default */]), ['equipment.craftable', 'equipment.improvable']);

var EquipmentListTableBody = (_dec = Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["b" /* connect */])(function (state, ownProps) {
    return {
        collection: state.equipmentList[ownProps.id].collection
        // columnHighlight: state.equipmentList[ownProps.id].column
    };
}), _dec2 = Object(__WEBPACK_IMPORTED_MODULE_9_sp_css_import__["a" /* ImportStyle */])(__webpack_require__(883)), _dec(_class = _dec2(_class = function (_React$Component) {
    _inherits(EquipmentListTableBody, _React$Component);

    function EquipmentListTableBody() {
        _classCallCheck(this, EquipmentListTableBody);

        return _possibleConstructorReturn(this, (EquipmentListTableBody.__proto__ || Object.getPrototypeOf(EquipmentListTableBody)).apply(this, arguments));
    }

    _createClass(EquipmentListTableBody, [{
        key: 'getData',
        value: function getData() {
            var _this2 = this;

            if (!Array.isArray(this.props.equipments)) return [];
            // console.log(this.props.equipments)

            var results = this.props.equipments.map(function (equipment) {
                var cells = [[__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    __WEBPACK_IMPORTED_MODULE_3__appUI_components_link__["a" /* default */],
                    { to: Object(__WEBPACK_IMPORTED_MODULE_8__appUtils_get_link__["a" /* default */])('equipment', equipment.id) },
                    equipment._name
                ), {
                    className: 'cell-name'
                }]];

                stats.forEach(function (stat) {
                    if (_this2.props.collection === 2 && stat === 'range') stat = 'distance';

                    var value = equipment.stat[stat];
                    var content = value;
                    var className = 'stat-' + stat;
                    var trueValue = void 0;

                    if (stat.indexOf('equipment.') > -1) {
                        var type = stat.substr('equipment.'.length);
                        if (equipment[type]) {
                            content = '✓';
                            trueValue = 1;
                        } else {
                            content = '-';
                            trueValue = 0;
                            className += ' empty';
                        }
                    } else if (value < 0) {
                        className += ' negative';
                    } else if (!value) {
                        className += ' empty';
                        content = '-';
                    } else {
                        if (stat === 'range' || stat === 'speed') {
                            trueValue = value;
                            content = __WEBPACK_IMPORTED_MODULE_4_kckit__["get"][stat](trueValue);
                        }
                    }

                    if (_this2.props.sortType === stat) className += ' is-sorting';

                    // if (!index && this.props.columnHighlight === stat)
                    //     className += ' is-hover'

                    cells.push([content, {
                        className: className,
                        "data-stat": stat.replace(/^equipment\./, '') || undefined,
                        value: trueValue,
                        onMouseEnter: function onMouseEnter() {
                            // this.getContainer(evt.target).setAttribute('data-highlighting', indexStat)
                            _this2.props.dispatch(
                            // highlightColumn(this.props.id, indexStat)
                            Object(__WEBPACK_IMPORTED_MODULE_5__appLogic_equipment_list_api_js__["b" /* highlightColumn */])(_this2.props.id, stat));
                        },
                        onMouseLeave: function onMouseLeave() {
                            // this.getContainer(evt.target).removeAttribute('data-highlighting')
                            _this2.props.dispatch(Object(__WEBPACK_IMPORTED_MODULE_5__appLogic_equipment_list_api_js__["b" /* highlightColumn */])(_this2.props.id, undefined));
                        }
                    }]);
                });

                return {
                    key: equipment.id,
                    cells: cells,
                    props: {
                        onClick: function onClick() {
                            if (true) Object(__WEBPACK_IMPORTED_MODULE_7__appUtils_router_push__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_8__appUtils_get_link__["a" /* default */])('equipment', equipment.id));
                        }
                    }
                };
            });

            return results;
        }

        // getContainer(target) {
        //     if (!this._container) {
        //         while (!target.dataset.equipmentlistId) {
        //             target = target.parentNode
        //         }
        //         this._container = target
        //     }
        //     return this._container
        // }

    }, {
        key: 'render',
        value: function render() {
            // console.log(this.props.columnHighlight)
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__datatable_jsx__["a" /* default */], {
                className: this.props.className,
                tag: 'div',
                data: this.getData()
            });
        }

        /*
        getList() {
            return this.props.equipments
        }
          renderRow(equipment) {
            return (
                <Row
                    className="row"
                    key={equipment.id}
                    onClick={() => {
                        if (__CLIENT__)
                            routerPush(getLink('equipment', equipment.id));
                    }}
                >
                    <Cell className="cell cell-name">
                        <Link to={getLink('equipment', equipment.id)}>{equipment._name}</Link>
                    </Cell>
                    {stats.map(stat => this.renderCellStat(equipment, stat))}
                </Row>
            )
        }
          renderCellStat(equipment, stat) {
            if (this.props.collection === 2 && stat === 'range')
                stat = 'distance'
              const value = equipment.stat[stat]
            let content = value
            let className = 'cell stat-' + stat
            let trueValue
              if (stat.indexOf('equipment.') > -1) {
                const type = stat.substr('equipment.'.length)
                if (equipment[type]) {
                    content = '✓'
                    trueValue = 1
                } else {
                    content = '-'
                    trueValue = 0
                    className += ' empty'
                }
            } else if (value < 0) {
                className += ' negative'
            } else if (!value) {
                className += ' empty'
                content = '-'
            } else {
                if (stat === 'range' || stat === 'speed') {
                    trueValue = value
                    content = get[stat](trueValue)
                }
            }
              if (this.props.sortType === stat)
                className += ' is-sorting'
              // if (!index && this.props.columnHighlight === stat)
            //     className += ' is-hover'
              return (
                <Cell
                    key={stat}
                    className={className}
                    data-stat={stat.replace(/^equipment\./, '') || undefined}
                    value={trueValue}
                    onMouseEnter={() => {
                        // this.getContainer(evt.target).setAttribute('data-highlighting', indexStat)
                        this.props.dispatch(
                            // highlightColumn(this.props.id, indexStat)
                            highlightColumn(this.props.id, stat)
                        )
                    }}
                    onMouseLeave={() => {
                        // this.getContainer(evt.target).removeAttribute('data-highlighting')
                        this.props.dispatch(
                            highlightColumn(this.props.id, undefined)
                        )
                    }}
                >
                    {content}
                </Cell>
            )
        }
          render() {
            return (
                <DataTableFlex className={this.props.className}>
                    {this.getList().map(this.renderRow.bind(this))}
                </DataTableFlex>
            )
        }
        */

    }]);

    return EquipmentListTableBody;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class) || _class);


/***/ }),

/***/ 883:
/***/ (function(module, exports) {

module.exports ={wrapper:'aab282b0',css:'.aab282b0{border-bottom:.05rem solid rgba(237,240,242,.15)}.aab282b0.flex{overflow-x:hidden;padding-left:0}@media (max-width:1024px){.aab282b0.flex{margin-left:-1.5rem;margin-right:-.75rem}}@media (max-width:850px){.aab282b0.flex{margin-left:-1.2rem;margin-right:-1.2rem}}@media (max-width:850px) and all and (max-width:660px){.aab282b0.flex{margin-left:-.6rem;margin-right:-.6rem}}@media (max-width:660px){.aab282b0.flex{margin-left:-.6rem;margin-right:-.6rem}}@media (max-width:850px){.aab282b0.flex .row:after{-webkit-box-flex:0;-webkit-box-ordinal-group:101;-webkit-flex:0 0 .5em;-webkit-order:100;content:"";flex:0 0 .5em;height:.05rem;order:100}}@media (max-width:660px){.aab282b0.flex .row:after{-webkit-flex-basis:0.4rem;flex-basis:0.4rem}}.aab282b0.flex .row .cell{-webkit-box-flex:1;-webkit-flex:1 0 2rem;flex:1 0 2rem;font-size:.7rem}.aab282b0.flex .row .cell.cell-name{-webkit-box-flex:7.5;-webkit-flex:7.5 0 7.5rem;flex:7.5 0 7.5rem;pointer-events:none;text-align:left;z-index:-1}@supports (pointer-events:none){.aab282b0.flex .row .cell.cell-name{z-index:auto}}.aab282b0.flex .row .cell[data-stat]{text-align:center}@media (max-width:660px){.aab282b0.flex .row .cell.cell-name{-webkit-flex-basis:4.25rem;-webkit-flex-shrink:1;flex-basis:4.25rem;flex-shrink:1}.aab282b0.flex .row .cell[data-stat]{-webkit-flex-basis:2em;flex-basis:2em;font-size:.6rem;width:2em}.aab282b0.flex .row .cell[data-stat=craftable],.aab282b0.flex .row .cell[data-stat=improvable]{display:none}}html.is-hover .aab282b0.flex .row:hover{background:rgba(0,0,0,.15)}html.is-webapp .aab282b0.flex .row{cursor:pointer}.aab282b0.flex .row .cell{-webkit-box-direction:normal;-webkit-box-orient:vertical;-webkit-box-pack:center;-webkit-flex-flow:column wrap;-webkit-justify-content:center;display:-webkit-box;display:-webkit-flex;display:flex;flex-flow:column wrap;justify-content:center;line-height:.8rem;padding:.25rem 0}.aab282b0.flex .row .cell-name{font-size:.7rem;padding-left:2rem;padding-right:.25em}.aab282b0.flex .row .cell-name a{color:#fafafa}@media (max-width:850px){.aab282b0.flex .row .cell-name{font-size:.65rem;padding-left:1.2rem}}@media (max-width:660px){.aab282b0.flex .row .cell-name{-ms-hyphens:auto;-ms-word-break:break-all;-webkit-hyphens:auto;font-size:.6rem;hyphens:auto;overflow-wrap:break-word;padding-left:1.81818182vw;padding-right:1.81818182vw;word-break:break-all;word-break:break-word;word-wrap:break-word}}.aab282b0.flex .row .cell[data-stat]{font-size:.65rem}@media (max-width:660px){.aab282b0.flex .row .cell[data-stat]{border-left:.05rem solid rgba(237,240,242,.15);font-size:.6rem}}.aab282b0 .negative{color:#ff8a80}html.is-hover .aab282b0 .body .cell.stat-fire:hover:after{background-color:rgba(189,33,15,.2)}html.is-hover .aab282b0 .body .cell.stat-torpedo:hover:after{background-color:rgba(15,111,189,.2)}html.is-hover .aab282b0 .body .cell.stat-night:hover:after{background-color:rgba(102,72,102,.4)}html.is-hover .aab282b0 .body .cell.stat-aa:hover:after{background-color:rgba(189,90,15,.2)}html.is-hover .aab282b0 .body .cell.stat-armor:hover:after{background-color:rgba(189,128,15,.2)}.last .aab282b0{border-bottom:0}'}

/***/ }),

/***/ 884:
/***/ (function(module, exports) {

module.exports ={wrapper:'d22d87fa',css:'.d22d87fa{padding-top:5rem}@media (max-width:660px){.d22d87fa{padding-top:4.25rem}}.d22d87fa .transition-enter{-webkit-transform:translateY(-1rem);opacity:.01!important;transform:translateY(-1rem);transition-property:opacity,-webkit-transform;transition-property:opacity,transform;transition-property:opacity,transform,-webkit-transform}@media (max-width:660px){.d22d87fa .transition-enter{transition-property:none}}.d22d87fa .transition-enter.transition-enter-active{-webkit-transform:none;opacity:1!important;transform:none;transition-duration:.13333333333s}.d22d87fa .transition-enter+.transition-enter{transition-delay:44.44444444ms}.d22d87fa .transition-enter+.transition-enter+.transition-enter{transition-delay:88.88888889ms}.d22d87fa .transition-enter+.transition-enter+.transition-enter+.transition-enter{transition-delay:.13333333333s}.d22d87fa .transition-enter+.transition-enter+.transition-enter+.transition-enter+.transition-enter{transition-delay:.17777777778s}.d22d87fa .transition-enter+.transition-enter+.transition-enter+.transition-enter+.transition-enter+.transition-enter{transition-delay:.22222222222s}.d22d87fa .transition-enter+.transition-enter+.transition-enter+.transition-enter+.transition-enter+.transition-enter+.transition-enter{transition-delay:.26666666667s}.d22d87fa .transition-enter+.transition-enter+.transition-enter+.transition-enter+.transition-enter+.transition-enter+.transition-enter+.transition-enter{transition-delay:.31111111111s}.d22d87fa .transition-enter+.transition-enter+.transition-enter+.transition-enter+.transition-enter+.transition-enter+.transition-enter+.transition-enter+.transition-enter{transition-delay:.35555555556s}.d22d87fa .transition-enter+.transition-enter+.transition-enter+.transition-enter+.transition-enter+.transition-enter+.transition-enter+.transition-enter+.transition-enter+.transition-enter{transition-delay:.4s}.d22d87fa .transition-enter+.transition-enter+.transition-enter+.transition-enter+.transition-enter+.transition-enter+.transition-enter+.transition-enter+.transition-enter+.transition-enter+.transition-enter{transition-delay:.44444444444s}.d22d87fa .transition-enter.results{-webkit-transform:none;transform:none}'}

/***/ }),

/***/ 885:
/***/ (function(module, exports) {

module.exports ={wrapper:'dd41d8cd7',css:''}

/***/ })

};;