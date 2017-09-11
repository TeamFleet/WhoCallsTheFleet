exports.ids = [0];
exports.modules = {

/***/ 290:
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(291);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ 291:
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
	// get current location
	var location = typeof window !== "undefined" && window.location;

	if (!location) {
		throw new Error("fixUrls requires window.location");
	}

	// blank or null?
	if (!css || typeof css !== "string") {
		return css;
	}

	var baseUrl = location.protocol + "//" + location.host;
	var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
 This regular expression is just a way to recursively match brackets within
 a string.
 	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
    (  = Start a capturing group
      (?:  = Start a non-capturing group
          [^)(]  = Match anything that isn't a parentheses
          |  = OR
          \(  = Match a start parentheses
              (?:  = Start another non-capturing groups
                  [^)(]+  = Match anything that isn't a parentheses
                  |  = OR
                  \(  = Match a start parentheses
                      [^)(]*  = Match anything that isn't a parentheses
                  \)  = Match a end parentheses
              )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
  \)  = Match a close parens
 	 /gi  = Get all matches, not the first.  Be case insensitive.
  */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl.trim().replace(/^"(.*)"$/, function (o, $1) {
			return $1;
		}).replace(/^'(.*)'$/, function (o, $1) {
			return $1;
		});

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
			return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
			//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};

/***/ }),

/***/ 748:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PageShipDetails; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_sp_i18n__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__appUI_containers_infos_page__ = __webpack_require__(799);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__appUtils_html_head_js__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__appLogic_database__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__appLogic_ship_details_api_js__ = __webpack_require__(801);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__details_commons_header_jsx__ = __webpack_require__(816);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class, _dec2, _class2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



// import TransitionGroup from 'react-transition-group/TransitionGroup'
// import CSSTransition from 'react-transition-group/CSSTransition'


// import PageContainer from 'sp-ui-pagecontainer'







// import { ImportStyle } from 'sp-css-import'
// import style from './details.less'

var tabsAvailable = ['infos', 'capabilities', 'equipable'];

var contentComponents = [];

if (true) tabsAvailable.forEach(function (tab, index) {
    contentComponents[index] = __webpack_require__(892)("./" + tab + '.jsx').default;
});

var extracFromState = function extracFromState(state) {
    var pathname = state.routing.locationBeforeTransitions.pathname;
    var segs = pathname.split('/');
    var indexShips = segs.indexOf('ships');

    return {
        id: parseInt(segs[indexShips + 1]),
        tab: segs[indexShips + 2] || tabsAvailable[0]
    };
};

var getShipType = function getShipType(ship) {
    // if (ship.type && ship.type_display && ship.type !== ship.type_display)
    //     return db.shipTypes[ship.type_display]._name + ' (' + ship._type + ')'
    if (ship.type_display) return __WEBPACK_IMPORTED_MODULE_5__appLogic_database__["a" /* default */].shipTypes[ship.type_display]._name;
    if (ship.type) return ship._type;
    return '';
};

var getDescription = function getDescription(ship) {
    var getShipType = function getShipType() {
        if (ship.type && ship.type_display && ship.type !== ship.type_display) return __WEBPACK_IMPORTED_MODULE_5__appLogic_database__["a" /* default */].shipTypes[ship.type_display]._name + ' (' + ship._type + ')';
        if (ship.type) return ship._type;
        return '';
    };
    return ship._name
    // 舰级 & 舰种
    + (', ' + (ship.class_no ? Object(__WEBPACK_IMPORTED_MODULE_2_sp_i18n__["a" /* default */])("shipclass_number", { class: ship._class, number: ship.class_no }) : Object(__WEBPACK_IMPORTED_MODULE_2_sp_i18n__["a" /* default */])("shipclass", { class: ship._class })))
    // 类型
    + ('' + (ship.class && ship.type ? ', ' + getShipType() : ''))
    // 军籍
    + (' | ' + Object(__WEBPACK_IMPORTED_MODULE_2_sp_i18n__["a" /* default */])("ship_details.navy") + ': ' + ship._navyName)
    // CV
    + (', ' + Object(__WEBPACK_IMPORTED_MODULE_2_sp_i18n__["a" /* default */])("ship_details.cv") + ': ' + ship._cv)
    // 画师
    + (', ' + Object(__WEBPACK_IMPORTED_MODULE_2_sp_i18n__["a" /* default */])("ship_details.illustrator") + ': ' + ship._illustrator);
};

// @ImportStyle(style)
var PageShipDetails = (_dec = Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["b" /* connect */])(function (state, ownProps) {
    return state.shipDetails[ownProps.params.id] || {};
}), _dec(_class = function (_React$Component) {
    _inherits(PageShipDetails, _React$Component);

    function PageShipDetails() {
        _classCallCheck(this, PageShipDetails);

        return _possibleConstructorReturn(this, (PageShipDetails.__proto__ || Object.getPrototypeOf(PageShipDetails)).apply(this, arguments));
    }

    _createClass(PageShipDetails, [{
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
            if (this.props.location.action === 'PUSH' && typeof this.props.tabIndex !== 'undefined') this.props.dispatch(Object(__WEBPACK_IMPORTED_MODULE_6__appLogic_ship_details_api_js__["d" /* reset */])(this.props.params.id));
        }
    }, {
        key: 'render',
        value: function render() {
            // console.log(this.props.tabIndex, this.props.illustIndex)

            // const isLocationPUSH = this.props.location && this.props.location.action === 'PUSH'
            // const tabIndex = __CLIENT__ ? (isLocationPUSH ? 0 : this.props.tabIndex) : undefined

            if (typeof this.props.tabIndex === 'undefined') {
                this.props.dispatch(Object(__WEBPACK_IMPORTED_MODULE_6__appLogic_ship_details_api_js__["c" /* init */])(this.props.params.id, {
                    tabIndex: tabsAvailable.indexOf(this.props.params && this.props.params.tab ? this.props.params.tab : tabsAvailable[0])
                }));
                if (true) return null;
            }

            if (!this.ship) return null;

            if (false) console.log('thisShip', this.ship, this.props.tabIndex);

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_3__appUI_containers_infos_page__["a" /* default */],
                { className: this.props.className },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__details_commons_header_jsx__["default"], {
                    ship: this.ship,
                    tabs: this.ship.type_display ? tabsAvailable : [tabsAvailable[0]],
                    onTabChange:  true ? this.onTabChange.bind(this) : undefined
                }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    PageShipDetailsBody,
                    { ship: this.ship },
                    this.props.children
                )
            );
        }
    }, {
        key: 'ship',
        get: function get() {
            if (!this._data && this.props.params.id) this._data = __WEBPACK_IMPORTED_MODULE_5__appLogic_database__["a" /* default */].ships[this.props.params.id];
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

            preprocessTasks.push(dispatch(Object(__WEBPACK_IMPORTED_MODULE_6__appLogic_ship_details_api_js__["c" /* init */])(id, {
                tabIndex: tabsAvailable.indexOf(tab)
            })));
            return preprocessTasks;
        }
    }, {
        key: 'onServerRenderHtmlExtend',
        value: function onServerRenderHtmlExtend(ext, store) {
            var _extracFromState2 = extracFromState(store.getState()),
                id = _extracFromState2.id;

            var ship = __WEBPACK_IMPORTED_MODULE_5__appLogic_database__["a" /* default */].ships[id];
            var obj = {
                store: store
            };
            if (ship) {
                obj.title = ship._name;
                obj.subtitle = (ship.class_no ? Object(__WEBPACK_IMPORTED_MODULE_2_sp_i18n__["a" /* default */])("shipclass_number", { class: ship._class, number: ship.class_no }) : Object(__WEBPACK_IMPORTED_MODULE_2_sp_i18n__["a" /* default */])("shipclass", { class: ship._class })) + (ship.class && ship.type && ' / ' + getShipType(ship) + ' ');
                obj.description = getDescription(ship);
            }
            var head = Object(__WEBPACK_IMPORTED_MODULE_4__appUtils_html_head_js__["a" /* default */])(obj);

            ext.metas = ext.metas.concat(head.meta);
            ext.title = head.title; // + translate("ship_details." + tab)
        }
    }]);

    return PageShipDetails;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class);

var PageShipDetailsBody = (_dec2 = Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["b" /* connect */])(function (state, ownProps) {
    return {
        // ...state.shipDetails[ownProps.ship.id]
        tabIndex: state.shipDetails[ownProps.ship.id] ? state.shipDetails[ownProps.ship.id].tabIndex : undefined
    };
}), _dec2(_class2 = function (_React$Component2) {
    _inherits(PageShipDetailsBody, _React$Component2);

    function PageShipDetailsBody() {
        _classCallCheck(this, PageShipDetailsBody);

        return _possibleConstructorReturn(this, (PageShipDetailsBody.__proto__ || Object.getPrototypeOf(PageShipDetailsBody)).apply(this, arguments));
    }

    _createClass(PageShipDetailsBody, [{
        key: 'render',

        // onIllustChange(newIllustIndex) {
        //     this.illustIndex = newIllustIndex
        //     if (newIllustIndex !== this.props.illustIndex) {
        //         this.props.dispatch(
        //             shipDetailsChangeIllust(this.props.ship.id, newIllustIndex)
        //         )
        //     }
        // }

        // componentWillUnmount() {
        //     this.props.dispatch(
        //         shipDetailsChangeIllust(this.props.ship.id, this.illustIndex)
        //     )
        // }

        value: function render() {
            // const isLocationPUSH = this.props.location && this.props.location.action === 'PUSH'

            if (true && typeof this.props.tabIndex !== 'undefined') return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(contentComponents[this.props.tabIndex], {
                ship: this.props.ship
                // illustIndex: this.props.illustIndex,
                // onIllustChange: this.onIllustChange.bind(this)
            });

            if (false) return React.cloneElement(this.props.children, {
                ship: this.props.ship
            });
        }
    }]);

    return PageShipDetailsBody;
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

/***/ 801:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return init; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return reset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return changeTab; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return changeIllust; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions_js__ = __webpack_require__(890);


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

/***/ 816:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ShipDetailsHeader; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_sp_i18n__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__appLogic_database__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__appLogic_ship_details_api__ = __webpack_require__(801);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__appUtils_get_link__ = __webpack_require__(762);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__appUI_containers_infos_header__ = __webpack_require__(802);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_sp_css_import__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__header_less__ = __webpack_require__(891);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__header_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__header_less__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }














var ShipDetailsHeader = (_dec = Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["b" /* connect */])(function (state, ownProps) {
    return state.shipDetails[ownProps.ship.id] || {};
}), _dec2 = Object(__WEBPACK_IMPORTED_MODULE_7_sp_css_import__["a" /* ImportStyle */])(__WEBPACK_IMPORTED_MODULE_8__header_less___default.a), _dec(_class = _dec2(_class = function (_React$Component) {
    _inherits(ShipDetailsHeader, _React$Component);

    function ShipDetailsHeader() {
        _classCallCheck(this, ShipDetailsHeader);

        return _possibleConstructorReturn(this, (ShipDetailsHeader.__proto__ || Object.getPrototypeOf(ShipDetailsHeader)).apply(this, arguments));
    }

    _createClass(ShipDetailsHeader, [{
        key: 'onTabChange',
        value: function onTabChange(tabId, tabIndex) {
            if (typeof this.props.onTabChange === 'function') this.props.onTabChange(tabId, tabIndex);
            this.props.dispatch(Object(__WEBPACK_IMPORTED_MODULE_4__appLogic_ship_details_api__["b" /* changeTab */])(this.props.ship.id, tabIndex));
        }
    }, {
        key: 'getShipType',
        value: function getShipType() {
            if (this.props.ship.type && this.props.ship.type_display && this.props.ship.type !== this.props.ship.type_display) return __WEBPACK_IMPORTED_MODULE_3__appLogic_database__["a" /* default */].shipTypes[this.props.ship.type_display]._name + ' (' + this.props.ship._type + ')';
            if (this.props.ship.type) return this.props.ship._type;
            return '';
        }
    }, {
        key: 'getTabs',
        value: function getTabs() {
            if (!Array.isArray(this.props.tabs)) return [];
            return this.props.tabs.map(function (tabId) {
                return {
                    tabId: tabId,
                    tabName: Object(__WEBPACK_IMPORTED_MODULE_2_sp_i18n__["a" /* default */])("ship_details." + tabId)
                };
            });
        }
    }, {
        key: 'render',
        value: function render() {
            if (!this.props.ship) return null;
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_6__appUI_containers_infos_header__["a" /* default */],
                {
                    className: this.props.className,
                    title: this.props.ship._name,
                    tabs: this.getTabs(),
                    urlBase: Object(__WEBPACK_IMPORTED_MODULE_5__appUtils_get_link__["a" /* default */])('ship', this.props.ship.id),
                    currentIndex: this.props.tabIndex,
                    onTabChange: this.onTabChange.bind(this)
                },
                __WEBPACK_IMPORTED_MODULE_2_sp_i18n__["c" /* localeId */] !== 'ja' && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'span',
                    { className: 'shipname-ja' },
                    this.props.ship.getName(undefined, 'ja_jp')
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'span',
                    { className: 'shipclassnumber' },
                    'No.',
                    this.props.ship.getNo()
                ),
                __WEBPACK_IMPORTED_MODULE_2_sp_i18n__["c" /* localeId */] === 'ja' && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
                this.props.ship.class_no ? Object(__WEBPACK_IMPORTED_MODULE_2_sp_i18n__["a" /* default */])("shipclass_number", { class: this.props.ship._class, number: this.props.ship.class_no }) : Object(__WEBPACK_IMPORTED_MODULE_2_sp_i18n__["a" /* default */])("shipclass", { class: this.props.ship._class }),
                this.props.ship.class && this.props.ship.type && ' / ' + this.getShipType()
            );
        }
    }]);

    return ShipDetailsHeader;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class) || _class);


/***/ }),

/***/ 817:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ShipDetailsSpecialCombat; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_kckit__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_kckit___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_kckit__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__appLogic_database__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__appUtils_get_equipment_types_from_condition__ = __webpack_require__(895);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__appUI_containers_infos_component__ = __webpack_require__(758);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__appUI_components_bullet__ = __webpack_require__(776);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__appUI_components_icon_equipment__ = __webpack_require__(767);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_sp_i18n__ = __webpack_require__(64);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



// import classNames from 'classnames'


var checkShip = __WEBPACK_IMPORTED_MODULE_2_kckit___default.a.check.ship;
var checkAACI = __WEBPACK_IMPORTED_MODULE_2_kckit___default.a.check.aaci;
var checkOASW = __WEBPACK_IMPORTED_MODULE_2_kckit___default.a.check.oasw;
var checkOTS = __WEBPACK_IMPORTED_MODULE_2_kckit___default.a.check.ots;










var shipTypeRangeNormal = [['BB', 3], ['CV', 1], ['CL', 2], ['CA', 2]];

// import { ImportStyle } from 'sp-css-import'
// import styles from './combat-special.less'

// @ImportStyle(styles)
var ShipDetailsSpecialCombat = (_dec = Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["b" /* connect */])(function (state) {
    return {
        locales_equipment_types: state.locales.equipment_types
    };
}), _dec(_class = function (_React$Component) {
    _inherits(ShipDetailsSpecialCombat, _React$Component);

    function ShipDetailsSpecialCombat() {
        _classCallCheck(this, ShipDetailsSpecialCombat);

        return _possibleConstructorReturn(this, (ShipDetailsSpecialCombat.__proto__ || Object.getPrototypeOf(ShipDetailsSpecialCombat)).apply(this, arguments));
    }

    _createClass(ShipDetailsSpecialCombat, [{
        key: 'renderOASW',
        value: function renderOASW() {
            var _this2 = this;

            var oaswTable = checkOASW(this.props.ship.id) || [];
            var canAlways = oaswTable === true;
            var canOASW = canAlways || Array.isArray(oaswTable) && oaswTable.length ? true : false;
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_6__appUI_components_bullet__["a" /* default */],
                {
                    title: Object(__WEBPACK_IMPORTED_MODULE_8_sp_i18n__["a" /* default */])("combat_phases.oasw"),
                    level: canOASW ? canAlways ? 2 : 1 : 0
                },
                canOASW && canAlways && Object(__WEBPACK_IMPORTED_MODULE_8_sp_i18n__["a" /* default */])("ship_details.can_always_perform"),
                canOASW && !canAlways && oaswTable.length > 1 && Object(__WEBPACK_IMPORTED_MODULE_8_sp_i18n__["a" /* default */])("ship_details.meet_one_requirements_below"),
                canOASW && !canAlways && oaswTable.map(function (OASW, index) {
                    var statsWithEquipments = [];
                    var equipmentRequired = [];
                    if (OASW.shipWithEquipments && OASW.shipWithEquipments.hasStat) {
                        for (var stat in OASW.shipWithEquipments.hasStat) {
                            if (_this2.props.ship.getAttribute(stat, _this2.props.ship_minLv) < OASW.shipWithEquipments.hasStat[stat]) statsWithEquipments.push([stat, OASW.shipWithEquipments.hasStat[stat]]);
                        }
                    }
                    if (OASW.equipments) {
                        var equipments = Object.assign({}, OASW.equipments);
                        for (var condition in equipments) {
                            if (_typeof(equipments[condition]) === 'object' && equipments[condition].hasStat) {
                                var _stat = [];
                                for (var key in equipments[condition].hasStat) {
                                    _stat[0] = key;
                                    _stat[1] = equipments[condition].hasStat[key];
                                }
                                if (condition.substr(0, 3) === 'has' && _this2.props.locales_equipment_types[condition.substr(3).toLocaleLowerCase()]) {
                                    equipmentRequired.push([Object(__WEBPACK_IMPORTED_MODULE_8_sp_i18n__["a" /* default */])('equipment_types.' + condition.substr(3).toLocaleLowerCase()), _stat]);
                                } else {
                                    equipmentRequired.push([Object(__WEBPACK_IMPORTED_MODULE_4__appUtils_get_equipment_types_from_condition__["a" /* default */])(_defineProperty({}, condition, true))[0], _stat]);
                                }
                                delete equipments[condition];
                            }
                        }
                        equipmentRequired = equipmentRequired.concat(Object(__WEBPACK_IMPORTED_MODULE_4__appUtils_get_equipment_types_from_condition__["a" /* default */])(equipments));
                        if (OASW.equipments.hasNameOf === '九三一空') equipmentRequired.push('九三一空');
                    }
                    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'ul',
                        { key: index, className: 'requirement' },
                        oaswTable.length > 1 && '#' + (index + 1),
                        statsWithEquipments.map(function (stat, indexStat) {
                            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                'li',
                                { key: index + '-' + indexStat },
                                Object(__WEBPACK_IMPORTED_MODULE_8_sp_i18n__["a" /* default */])("require.ship_stat_with_equipments", {
                                    stat: Object(__WEBPACK_IMPORTED_MODULE_8_sp_i18n__["a" /* default */])('stat.' + stat[0]),
                                    value: stat[1]
                                })
                            );
                        }),
                        equipmentRequired.map(function (type, indexType) {
                            if (type === '九三一空') return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                'li',
                                { key: index + '-' + indexType },
                                Object(__WEBPACK_IMPORTED_MODULE_8_sp_i18n__["a" /* default */])("require.equipment", { type: "" }),
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    __WEBPACK_IMPORTED_MODULE_7__appUI_components_icon_equipment__["a" /* default */],
                                    { className: 'equipment', icon: 8 },
                                    '\u4E5D\u4E09\u4E00\u7A7A'
                                )
                            );else if (Array.isArray(type)) {
                                console.log(type);
                                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    'li',
                                    { key: index + '-' + indexType },
                                    Object(__WEBPACK_IMPORTED_MODULE_8_sp_i18n__["a" /* default */])("require.equipment", { type: "" }),
                                    typeof type[0] === 'number' && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        __WEBPACK_IMPORTED_MODULE_7__appUI_components_icon_equipment__["a" /* default */],
                                        { className: 'equipment', icon: __WEBPACK_IMPORTED_MODULE_3__appLogic_database__["a" /* default */].equipmentTypes[type[0]].icon },
                                        __WEBPACK_IMPORTED_MODULE_3__appLogic_database__["a" /* default */].equipmentTypes[type[0]]._name
                                    ),
                                    typeof type[0] === 'string' && type[0],
                                    ' (' + Object(__WEBPACK_IMPORTED_MODULE_8_sp_i18n__["a" /* default */])("require.has_stat", {
                                        stat: Object(__WEBPACK_IMPORTED_MODULE_8_sp_i18n__["a" /* default */])('stat.' + type[1][0]),
                                        value: type[1][1]
                                    }) + ')'
                                );
                            } else return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                'li',
                                { key: index + '-' + indexType },
                                Object(__WEBPACK_IMPORTED_MODULE_8_sp_i18n__["a" /* default */])("require.equipment_type", { type: "" }),
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    __WEBPACK_IMPORTED_MODULE_7__appUI_components_icon_equipment__["a" /* default */],
                                    { className: 'equipment', icon: __WEBPACK_IMPORTED_MODULE_3__appLogic_database__["a" /* default */].equipmentTypes[type].icon },
                                    __WEBPACK_IMPORTED_MODULE_3__appLogic_database__["a" /* default */].equipmentTypes[type]._name
                                )
                            );
                        }),
                        OASW.minLv && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            'li',
                            null,
                            Object(__WEBPACK_IMPORTED_MODULE_8_sp_i18n__["a" /* default */])("require.min_possible_level", {
                                level: OASW.minLv || _this2.props.ship._minLv
                            })
                        )
                    );
                })
            );
        }
    }, {
        key: 'renderOTS',
        value: function renderOTS() {
            var otsTable = checkOTS(this.props.ship.id) || [];
            var canAlways = otsTable === true;
            var canOTS = canAlways || Array.isArray(otsTable) && otsTable.length ? true : false;
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_6__appUI_components_bullet__["a" /* default */],
                {
                    title: Object(__WEBPACK_IMPORTED_MODULE_8_sp_i18n__["a" /* default */])("combat_phases.ots"),
                    level: canOTS ? canAlways ? 2 : 1 : 0
                },
                canOTS && canAlways && Object(__WEBPACK_IMPORTED_MODULE_8_sp_i18n__["a" /* default */])("ship_details.can_always_perform"),
                canOTS && !canAlways && otsTable.length > 1 && Object(__WEBPACK_IMPORTED_MODULE_8_sp_i18n__["a" /* default */])("ship_details.meet_one_requirements_below"),
                canOTS && !canAlways && otsTable.map(function (OTS, index) {
                    var equipmentRequired = [];
                    if (OTS.equipments) {
                        equipmentRequired = Object(__WEBPACK_IMPORTED_MODULE_4__appUtils_get_equipment_types_from_condition__["a" /* default */])(OTS.equipments);
                    }
                    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'ul',
                        { key: index, className: 'requirement' },
                        otsTable.length > 1 && '#' + (index + 1),
                        equipmentRequired.map(function (type, indexType) {
                            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                'li',
                                { key: index + '-' + indexType, 'data-type': type },
                                Object(__WEBPACK_IMPORTED_MODULE_8_sp_i18n__["a" /* default */])("require.equipment_type", { type: "" }),
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    __WEBPACK_IMPORTED_MODULE_7__appUI_components_icon_equipment__["a" /* default */],
                                    { className: 'equipment', icon: __WEBPACK_IMPORTED_MODULE_3__appLogic_database__["a" /* default */].equipmentTypes[type].icon },
                                    __WEBPACK_IMPORTED_MODULE_3__appLogic_database__["a" /* default */].equipmentTypes[type]._name
                                )
                            );
                        }),
                        OTS.ship && OTS.ship.minLevel && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            'li',
                            null,
                            Object(__WEBPACK_IMPORTED_MODULE_8_sp_i18n__["a" /* default */])("require.level", {
                                level: OTS.ship.minLevel
                            })
                        )
                    );
                })
            );
        }
    }, {
        key: 'renderRangeDifferent',
        value: function renderRangeDifferent() {
            var _this3 = this;

            var pair = shipTypeRangeNormal.filter(function (arr) {
                return _this3.props.ship.isType(arr[0]) && _this3.props.ship.stat.range != arr[1];
            });
            if (Array.isArray(pair) && pair.length) return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_6__appUI_components_bullet__["a" /* default */],
                {
                    title: Object(__WEBPACK_IMPORTED_MODULE_8_sp_i18n__["a" /* default */])("ship_details.range_different_title", { range: this.props.ship._range }),
                    level: this.props.ship.stat.range > pair[0][1] ? 2 : 1
                },
                Object(__WEBPACK_IMPORTED_MODULE_8_sp_i18n__["a" /* default */])("ship_details.range_different_note", {
                    range: __WEBPACK_IMPORTED_MODULE_2_kckit___default.a.get.range(pair[0][1]),
                    type: __WEBPACK_IMPORTED_MODULE_3__appLogic_database__["a" /* default */].shipTypes[this.props.ship.type_display]._name
                })
            );
            return null;
        }
    }, {
        key: 'render',
        value: function render() {
            var isBattleship = this.props.ship.isType('battleship');
            var isCarrier = this.props.ship.isType('carrier');

            var statASW99 = this.props.ship.getAttribute('asw', 99);
            var statTorpedo99 = this.props.ship.getAttribute('torpedo', 99);

            var aaciTypes = checkAACI(this.props.ship.id);

            var canJetAssault = checkShip(this.props.ship, {
                isID: [461, // 翔鶴・改二
                466, // 翔鶴・改二甲
                462, // 瑞鶴・改二
                467]
            });
            var canAACI = Array.isArray(aaciTypes) && aaciTypes.length ? true : false;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_5__appUI_containers_infos_component__["a" /* default */],
                { className: this.props.className, title: Object(__WEBPACK_IMPORTED_MODULE_8_sp_i18n__["a" /* default */])("ship_details.combat_special") },
                isCarrier && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    __WEBPACK_IMPORTED_MODULE_6__appUI_components_bullet__["a" /* default */],
                    {
                        title: Object(__WEBPACK_IMPORTED_MODULE_8_sp_i18n__["a" /* default */])("combat_phases.jet"),
                        level: canJetAssault ? 1 : 0
                    },
                    canJetAssault && Object(__WEBPACK_IMPORTED_MODULE_8_sp_i18n__["a" /* default */])("require.equipment_type", {
                        type: Object(__WEBPACK_IMPORTED_MODULE_8_sp_i18n__["a" /* default */])("equipment_types.jet")
                    })
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    __WEBPACK_IMPORTED_MODULE_6__appUI_components_bullet__["a" /* default */],
                    {
                        title: Object(__WEBPACK_IMPORTED_MODULE_8_sp_i18n__["a" /* default */])("aaci.title"),
                        level: canAACI ? 1 : 0
                    },
                    canAACI && Object(__WEBPACK_IMPORTED_MODULE_8_sp_i18n__["a" /* default */])("ship_details.see_below_for_required_equipment_types")
                ),
                this.renderRangeDifferent(),
                statASW99 !== false && statASW99 !== undefined && this.renderOASW(),
                statASW99 === undefined && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__appUI_components_bullet__["a" /* default */], {
                    title: Object(__WEBPACK_IMPORTED_MODULE_8_sp_i18n__["a" /* default */])("combat_phases.oasw"),
                    level: -1
                }),
                statTorpedo99 !== false && this.renderOTS(),
                isBattleship && statTorpedo99 !== false && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__appUI_components_bullet__["a" /* default */], {
                    title: Object(__WEBPACK_IMPORTED_MODULE_8_sp_i18n__["a" /* default */])("combat_phases.torpedo"),
                    level: 2
                }),
                this.props.ship.type === 30 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    __WEBPACK_IMPORTED_MODULE_6__appUI_components_bullet__["a" /* default */],
                    {
                        title: Object(__WEBPACK_IMPORTED_MODULE_8_sp_i18n__["a" /* default */])("ship_details.light_attack_carrier_asw_title"),
                        level: 2
                    },
                    Object(__WEBPACK_IMPORTED_MODULE_8_sp_i18n__["a" /* default */])("ship_details.light_attack_carrier_asw_note")
                ),
                isCarrier && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__appUI_components_bullet__["a" /* default */], {
                    title: Object(__WEBPACK_IMPORTED_MODULE_8_sp_i18n__["a" /* default */])("combat_phases.night"),
                    level: this.props.ship.additional_night_shelling ? 2 : 0
                })
            );
        }
    }]);

    return ShipDetailsSpecialCombat;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class);


/***/ }),

/***/ 818:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ShipDetailsSpecialOther; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__appLogic_database__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__appUI_containers_infos_component__ = __webpack_require__(758);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__appUI_components_bullet__ = __webpack_require__(776);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_sp_i18n__ = __webpack_require__(64);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }










// import { ImportStyle } from 'sp-css-import'
// import styles from './combat-special.less'

// @connect()
// @ImportStyle(styles)

var ShipDetailsSpecialOther = function (_React$Component) {
    _inherits(ShipDetailsSpecialOther, _React$Component);

    function ShipDetailsSpecialOther() {
        _classCallCheck(this, ShipDetailsSpecialOther);

        return _possibleConstructorReturn(this, (ShipDetailsSpecialOther.__proto__ || Object.getPrototypeOf(ShipDetailsSpecialOther)).apply(this, arguments));
    }

    _createClass(ShipDetailsSpecialOther, [{
        key: 'render',
        value: function render() {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_2__appUI_containers_infos_component__["a" /* default */],
                { className: this.props.className, title: Object(__WEBPACK_IMPORTED_MODULE_4_sp_i18n__["a" /* default */])("ship_details.other_special") },
                this.props.ship.tp && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__appUI_components_bullet__["a" /* default */], {
                    title: Object(__WEBPACK_IMPORTED_MODULE_4_sp_i18n__["a" /* default */])("ship_details.tp_bonus", {
                        bonus: this.props.ship.tp
                    }),
                    level: 2
                }),
                this.props.ship.tp >= 8 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    __WEBPACK_IMPORTED_MODULE_3__appUI_components_bullet__["a" /* default */],
                    {
                        title: Object(__WEBPACK_IMPORTED_MODULE_4_sp_i18n__["a" /* default */])("ship_details.expedition_bonus", {
                            bonus: '5%'
                        }),
                        level: 2
                    },
                    Object(__WEBPACK_IMPORTED_MODULE_4_sp_i18n__["a" /* default */])("ship_details.expedition_bonus_daihatsu_description", {
                        daihatsu: __WEBPACK_IMPORTED_MODULE_1__appLogic_database__["a" /* default */].equipments[68]._name
                    }),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
                    Object(__WEBPACK_IMPORTED_MODULE_4_sp_i18n__["a" /* default */])("ship_details.expedition_bonus_daihatsu_description2", {
                        daihatsu: __WEBPACK_IMPORTED_MODULE_1__appLogic_database__["a" /* default */].equipments[68]._name
                    })
                ),
                !this.props.ship.tp && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__appUI_components_bullet__["a" /* default */], {
                    title: Object(__WEBPACK_IMPORTED_MODULE_4_sp_i18n__["a" /* default */])("none"),
                    level: 0
                })
            );
        }
    }]);

    return ShipDetailsSpecialOther;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);



/***/ }),

/***/ 819:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ShipDetailsAACI; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames__ = __webpack_require__(759);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_kckit__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_kckit___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_kckit__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__appUI_containers_infos_component__ = __webpack_require__(758);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__appUI_components_icon_equipment__ = __webpack_require__(767);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__appUI_components_bullet__ = __webpack_require__(776);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_sp_i18n__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_sp_css_import__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__aaci_less__ = __webpack_require__(896);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__aaci_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__aaci_less__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var checkAACI = __WEBPACK_IMPORTED_MODULE_2_kckit___default.a.check.aaci;



// import Icon from '@appUI/components/icon'







// @connect()
var ShipDetailsAACI = (_dec = Object(__WEBPACK_IMPORTED_MODULE_7_sp_css_import__["a" /* ImportStyle */])(__WEBPACK_IMPORTED_MODULE_8__aaci_less___default.a), _dec(_class = function (_React$Component) {
    _inherits(ShipDetailsAACI, _React$Component);

    function ShipDetailsAACI() {
        _classCallCheck(this, ShipDetailsAACI);

        return _possibleConstructorReturn(this, (ShipDetailsAACI.__proto__ || Object.getPrototypeOf(ShipDetailsAACI)).apply(this, arguments));
    }

    _createClass(ShipDetailsAACI, [{
        key: 'renderAACI',
        value: function renderAACI(aaci, index) {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'dl',
                { className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()(['item', {
                        'is-limited': aaci.ship.isID || aaci.ship.isClass || aaci.ship.isType || aaci.ship.isBB
                    }]), key: index },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'dt',
                    { className: 'id' },
                    '#',
                    aaci.id,
                    aaci.ship.isID && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'small',
                        null,
                        Object(__WEBPACK_IMPORTED_MODULE_6_sp_i18n__["a" /* default */])("ship_details.aaci_req.ship")
                    ),
                    aaci.ship.isClass && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'small',
                        null,
                        Object(__WEBPACK_IMPORTED_MODULE_6_sp_i18n__["a" /* default */])("ship_details.aaci_req.class")
                    ),
                    (aaci.ship.isType || aaci.ship.isBB) && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'small',
                        null,
                        Object(__WEBPACK_IMPORTED_MODULE_6_sp_i18n__["a" /* default */])("ship_details.aaci_req.type")
                    )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'dd',
                    { className: 'icons' },
                    aaci.icons.map(function (icon, index) {
                        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__appUI_components_icon_equipment__["a" /* default */], { key: index, icon: icon });
                    })
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'dd',
                    { className: 'fixed' },
                    '+',
                    aaci.fixed
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'dd',
                    { className: 'modifier' },
                    'x',
                    aaci.modifier
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var aaciTypes = checkAACI(this.props.ship.id);
            var ableToAACI = Array.isArray(aaciTypes) && aaciTypes.length ? true : false;
            if (false) console.log('thisShip > AACI', aaciTypes);
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_3__appUI_containers_infos_component__["a" /* default */],
                { className: this.props.className, title: Object(__WEBPACK_IMPORTED_MODULE_6_sp_i18n__["a" /* default */])("ship_details.aaci") },
                !ableToAACI && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__appUI_components_bullet__["a" /* default */], {
                    title: Object(__WEBPACK_IMPORTED_MODULE_6_sp_i18n__["a" /* default */])("ship_details.aaci_unable"),
                    level: 0
                }),
                ableToAACI && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'dl',
                    { className: 'item header' },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('dt', { className: 'id' }),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('dd', { className: 'icons' }),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'dd',
                        { className: 'fixed' },
                        Object(__WEBPACK_IMPORTED_MODULE_6_sp_i18n__["a" /* default */])("aaci.fixed")
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'dd',
                        { className: 'modifier' },
                        Object(__WEBPACK_IMPORTED_MODULE_6_sp_i18n__["a" /* default */])("aaci.modifier")
                    )
                ),
                ableToAACI && aaciTypes.map(this.renderAACI.bind(this))
            );
        }
    }]);

    return ShipDetailsAACI;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class);


/***/ }),

/***/ 820:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ShipDetailsCalculatorOASW; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__appUI_containers_infos_component__ = __webpack_require__(758);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__appUI_components_bullet__ = __webpack_require__(776);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__appUI_components_calculator_level_oasw__ = __webpack_require__(897);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_sp_i18n__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_sp_css_import__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__oasw_calculator_less__ = __webpack_require__(901);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__oasw_calculator_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__oasw_calculator_less__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }












// @connect()
var ShipDetailsCalculatorOASW = (_dec = Object(__WEBPACK_IMPORTED_MODULE_5_sp_css_import__["a" /* ImportStyle */])(__WEBPACK_IMPORTED_MODULE_6__oasw_calculator_less___default.a), _dec(_class = function (_React$Component) {
    _inherits(ShipDetailsCalculatorOASW, _React$Component);

    function ShipDetailsCalculatorOASW() {
        _classCallCheck(this, ShipDetailsCalculatorOASW);

        return _possibleConstructorReturn(this, (ShipDetailsCalculatorOASW.__proto__ || Object.getPrototypeOf(ShipDetailsCalculatorOASW)).apply(this, arguments));
    }

    _createClass(ShipDetailsCalculatorOASW, [{
        key: 'render',
        value: function render() {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_1__appUI_containers_infos_component__["a" /* default */],
                { className: this.props.className, title: Object(__WEBPACK_IMPORTED_MODULE_4_sp_i18n__["a" /* default */])("oasw_calculator.title") },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__appUI_components_calculator_level_oasw__["a" /* default */], {
                    className: 'calculator',
                    ship: this.props.ship,

                    componentUnknown: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__appUI_components_bullet__["a" /* default */], {
                        className: 'special',
                        title: Object(__WEBPACK_IMPORTED_MODULE_4_sp_i18n__["a" /* default */])("oasw_calculator.unknown"),
                        level: -1
                    }),
                    componentUnable: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__appUI_components_bullet__["a" /* default */], {
                        className: 'special',
                        title: Object(__WEBPACK_IMPORTED_MODULE_4_sp_i18n__["a" /* default */])("oasw_calculator.unable"),
                        level: 0
                    }),
                    componentAlways: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__appUI_components_bullet__["a" /* default */], {
                        className: 'special',
                        title: Object(__WEBPACK_IMPORTED_MODULE_4_sp_i18n__["a" /* default */])("oasw_calculator.always"),
                        level: 2
                    })
                })
            );
        }
    }]);

    return ShipDetailsCalculatorOASW;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class);


/***/ }),

/***/ 821:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalculatorEquipment; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_kckit__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_kckit___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_kckit__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__appUI_components_icon__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__appUI_components_link__ = __webpack_require__(768);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__appUI_components_icon_equipment__ = __webpack_require__(767);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_sp_css_import__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__equipment_less__ = __webpack_require__(898);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__equipment_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__equipment_less__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }











var CalculatorEquipment = (_dec = Object(__WEBPACK_IMPORTED_MODULE_5_sp_css_import__["a" /* ImportStyle */])(__WEBPACK_IMPORTED_MODULE_6__equipment_less___default.a), _dec(_class = function (_React$Component) {
    _inherits(CalculatorEquipment, _React$Component);

    function CalculatorEquipment() {
        _classCallCheck(this, CalculatorEquipment);

        return _possibleConstructorReturn(this, (CalculatorEquipment.__proto__ || Object.getPrototypeOf(CalculatorEquipment)).apply(this, arguments));
    }

    _createClass(CalculatorEquipment, [{
        key: 'render',
        value: function render() {
            var equipment = __WEBPACK_IMPORTED_MODULE_1_kckit__["get"].equipment(this.props.equipment);
            var isRequired = this.props.className.includes('is-required');
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: this.props.className, 'data-equipment-id': equipment.id },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'span',
                    { className: 'equipment' },
                    this.props.isNotLink && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'span',
                        { className: 'name' },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__appUI_components_icon_equipment__["a" /* default */], { className: 'icon', icon: equipment._icon }),
                        this.props.displayName || equipment._name
                    ),
                    !this.props.isNotLink && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        __WEBPACK_IMPORTED_MODULE_3__appUI_components_link__["a" /* default */],
                        { className: 'name', to: '/equipments/' + equipment.id },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__appUI_components_icon_equipment__["a" /* default */], { className: 'icon', icon: equipment._icon }),
                        this.props.displayName || equipment._name
                    )
                ),
                isRequired && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__appUI_components_icon__["a" /* default */], { className: 'icon-required', icon: 'warning2' }),
                this.props.componentInput
            );
        }
    }]);

    return CalculatorEquipment;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class);


/***/ }),

/***/ 822:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalculatorInputNumber; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_sp_css_import__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__input_number_less__ = __webpack_require__(899);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__input_number_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__input_number_less__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var getValue = function getValue(prop) {
    return typeof prop !== 'undefined' && !isNaN(prop) ? parseInt(prop) : undefined;
};

var CalculatorInputNumber = (_dec = Object(__WEBPACK_IMPORTED_MODULE_1_sp_css_import__["a" /* ImportStyle */])(__WEBPACK_IMPORTED_MODULE_2__input_number_less___default.a), _dec(_class = function (_React$Component) {
    _inherits(CalculatorInputNumber, _React$Component);

    function CalculatorInputNumber(props) {
        _classCallCheck(this, CalculatorInputNumber);

        var _this = _possibleConstructorReturn(this, (CalculatorInputNumber.__proto__ || Object.getPrototypeOf(CalculatorInputNumber)).call(this, props));

        _this.min = getValue(props.min);
        _this.max = getValue(props.max);

        _this.state = {
            value: props.defaultValue
        };
        return _this;
    }

    _createClass(CalculatorInputNumber, [{
        key: 'update',
        value: function update() {
            var _this2 = this;

            var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.input;

            this.setState({
                value: el.value
            }, function () {
                _this2.onUpdate(parseInt(el.value));
            });
        }
    }, {
        key: 'onUpdate',
        value: function onUpdate(newValue) {
            if (typeof this.props.onUpdate === 'function') return this.props.onUpdate(newValue);
        }
    }, {
        key: 'onChange',
        value: function onChange(evt) {
            if (typeof this.max !== 'undefined' && evt.target.value > this.max) return;
            if (typeof this.min !== 'undefined' && evt.target.value < this.min) return;
            this.update(evt.target);
        }
    }, {
        key: 'onBlur',
        value: function onBlur(evt) {
            if (typeof this.max !== 'undefined' && evt.target.value > this.max) evt.target.value = this.max;
            if (typeof this.min !== 'undefined' && evt.target.value < this.min) evt.target.value = this.min;
            this.update(evt.target);
        }
    }, {
        key: 'onBtnClick',
        value: function onBtnClick(evt, delta) {
            var newValue = parseInt(this.input.value) + delta;
            this.input.value = newValue;
            this.update();
            evt.target.blur();
        }

        // componentWillReceiveProps(nextProps) {
        //     if (nextProps.max !== this.props.max) {
        //         console.log(nextProps.max)
        //         this.max = getValue(nextProps.max)
        //         if (typeof this.max !== 'undefined' && this.input > this.max)
        //             this.input = this.max
        //         this.update()
        //     }
        // }

    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: this.props.className },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'button',
                    {
                        type: 'button',
                        className: 'btn btn-minus',
                        disabled: typeof this.min !== 'undefined' && this.state.value <= this.min,
                        onClick: function onClick(evt) {
                            return _this3.onBtnClick(evt, -1);
                        }
                    },
                    '-'
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', {
                    type: 'number',
                    min: this.min,
                    max: this.max,
                    ref: function ref(el) {
                        return _this3.input = el;
                    },
                    onChange: this.onChange.bind(this),
                    onBlur: this.onBlur.bind(this),
                    defaultValue: this.props.defaultValue
                }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'button',
                    {
                        type: 'button',
                        className: 'btn btn-plus',
                        disabled: typeof this.max !== 'undefined' && this.state.value >= this.max,
                        onClick: function onClick(evt) {
                            return _this3.onBtnClick(evt, 1);
                        }
                    },
                    '+'
                )
            );
        }
    }]);

    return CalculatorInputNumber;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class);


/***/ }),

/***/ 823:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ShipDetailsCalculatorSpeedUp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__appUI_containers_infos_component__ = __webpack_require__(758);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__appUI_components_calculator_speed__ = __webpack_require__(902);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_sp_i18n__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_sp_css_import__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__speedup_calculator_less__ = __webpack_require__(904);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__speedup_calculator_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__speedup_calculator_less__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }











// @connect()
var ShipDetailsCalculatorSpeedUp = (_dec = Object(__WEBPACK_IMPORTED_MODULE_4_sp_css_import__["a" /* ImportStyle */])(__WEBPACK_IMPORTED_MODULE_5__speedup_calculator_less___default.a), _dec(_class = function (_React$Component) {
    _inherits(ShipDetailsCalculatorSpeedUp, _React$Component);

    function ShipDetailsCalculatorSpeedUp() {
        _classCallCheck(this, ShipDetailsCalculatorSpeedUp);

        return _possibleConstructorReturn(this, (ShipDetailsCalculatorSpeedUp.__proto__ || Object.getPrototypeOf(ShipDetailsCalculatorSpeedUp)).apply(this, arguments));
    }

    _createClass(ShipDetailsCalculatorSpeedUp, [{
        key: 'render',
        value: function render() {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_1__appUI_containers_infos_component__["a" /* default */],
                { className: this.props.className, title: Object(__WEBPACK_IMPORTED_MODULE_3_sp_i18n__["a" /* default */])("speed_calculator.title") },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__appUI_components_calculator_speed__["a" /* default */], { className: 'calculator', ship: this.props.ship })
            );
        }
    }]);

    return ShipDetailsCalculatorSpeedUp;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class);


/***/ }),

/***/ 824:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ShipDetailsComponentDismantle; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames__ = __webpack_require__(759);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__appUI_containers_infos_component__ = __webpack_require__(758);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__appUI_components_stat__ = __webpack_require__(770);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__appUtils_get_value__ = __webpack_require__(777);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__appData_resources__ = __webpack_require__(779);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_sp_i18n__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_sp_css_import__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__modernization_less__ = __webpack_require__(825);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__modernization_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__modernization_less__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }














// @connect()
var ShipDetailsComponentDismantle = (_dec = Object(__WEBPACK_IMPORTED_MODULE_7_sp_css_import__["a" /* ImportStyle */])(__WEBPACK_IMPORTED_MODULE_8__modernization_less___default.a), _dec(_class = function (_React$Component) {
    _inherits(ShipDetailsComponentDismantle, _React$Component);

    function ShipDetailsComponentDismantle() {
        _classCallCheck(this, ShipDetailsComponentDismantle);

        return _possibleConstructorReturn(this, (ShipDetailsComponentDismantle.__proto__ || Object.getPrototypeOf(ShipDetailsComponentDismantle)).apply(this, arguments));
    }

    _createClass(ShipDetailsComponentDismantle, [{
        key: 'renderItem',
        value: function renderItem(stat, index) {
            var value = Object(__WEBPACK_IMPORTED_MODULE_4__appUtils_get_value__["a" /* default */])(this.props.ship.scrap[index]);
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_3__appUI_components_stat__["a" /* default */],
                {
                    className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()(['item', {
                        disabled: !value
                    }]),
                    key: index,
                    stat: stat
                },
                value
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var hasDismantle = Array.isArray(this.props.ship.scrap);
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_2__appUI_containers_infos_component__["a" /* default */],
                { className: this.props.className, title: Object(__WEBPACK_IMPORTED_MODULE_6_sp_i18n__["a" /* default */])("ship_details.dismantle") },
                !hasDismantle && Object(__WEBPACK_IMPORTED_MODULE_6_sp_i18n__["a" /* default */])("none"),
                hasDismantle && __WEBPACK_IMPORTED_MODULE_5__appData_resources__["a" /* default */].map(this.renderItem.bind(this))
            );
        }
    }]);

    return ShipDetailsComponentDismantle;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class);


/***/ }),

/***/ 825:
/***/ (function(module, exports) {

module.exports ={wrapper:'f101f783',css:'.f101f783{overflow:hidden}.f101f783 .item{float:left;width:3rem}'}

/***/ }),

/***/ 826:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ShipDetailsComponentSlotEquipments; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_transition_group_TransitionGroup__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_transition_group_TransitionGroup___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_transition_group_TransitionGroup__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_transition_group_CSSTransition__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_transition_group_CSSTransition___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_transition_group_CSSTransition__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__appUI_containers_infos_component__ = __webpack_require__(758);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__appUI_components_swiper__ = __webpack_require__(906);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__appUI_components_icon__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__appLogic_database__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__appUtils_get_pic_js__ = __webpack_require__(760);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__appLogic_ship_details_api_js__ = __webpack_require__(801);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_sp_css_import__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__illust_less__ = __webpack_require__(910);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__illust_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__illust_less__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }













// import translate from 'sp-i18n'




var getExtraIllustPic = function getExtraIllustPic(ship, id, illustId) {
    if (Array.isArray(__WEBPACK_IMPORTED_MODULE_7__appLogic_database__["a" /* default */].exillusts[id].exclude) && __WEBPACK_IMPORTED_MODULE_7__appLogic_database__["a" /* default */].exillusts[id].exclude.includes(illustId)) return Object(__WEBPACK_IMPORTED_MODULE_8__appUtils_get_pic_js__["a" /* default */])(ship, illustId);
    return Object(__WEBPACK_IMPORTED_MODULE_8__appUtils_get_pic_js__["a" /* default */])('ship-extra', id, illustId);
};

// @connect()
var ShipDetailsComponentSlotEquipments = (_dec = Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["b" /* connect */])(function (state, ownProps) {
    return {
        // ...state.shipDetails[ownProps.ship.id]
        defaultIndex: state.shipDetails[ownProps.ship.id] ? state.shipDetails[ownProps.ship.id].illustIndex : undefined
    };
}), _dec2 = Object(__WEBPACK_IMPORTED_MODULE_10_sp_css_import__["a" /* ImportStyle */])(__WEBPACK_IMPORTED_MODULE_11__illust_less___default.a), _dec(_class = _dec2(_class = function (_React$Component) {
    _inherits(ShipDetailsComponentSlotEquipments, _React$Component);

    function ShipDetailsComponentSlotEquipments(props) {
        _classCallCheck(this, ShipDetailsComponentSlotEquipments);

        var _this = _possibleConstructorReturn(this, (ShipDetailsComponentSlotEquipments.__proto__ || Object.getPrototypeOf(ShipDetailsComponentSlotEquipments)).call(this, props));

        _this.state = {
            swiperIndex: _this.props.defaultIndex || 0

            // console.log(db.exillusts, db.exillustTypes)

        };_this.pics = [];
        _this.extraIllusts = props.ship._extraIllust;
        var illustIds = [8, 9];
        var ids = ['_'];

        if (Array.isArray(_this.extraIllusts)) ids = ids.concat(_this.extraIllusts.sort(function (a, b) {
            return __WEBPACK_IMPORTED_MODULE_7__appLogic_database__["a" /* default */].exillustTypes[__WEBPACK_IMPORTED_MODULE_7__appLogic_database__["a" /* default */].exillusts[a].type].sort - __WEBPACK_IMPORTED_MODULE_7__appLogic_database__["a" /* default */].exillustTypes[__WEBPACK_IMPORTED_MODULE_7__appLogic_database__["a" /* default */].exillusts[b].type].sort;
        }));

        ids.forEach(function (id) {
            illustIds.forEach(function (illustId) {
                _this.pics.push(id === '_' ? Object(__WEBPACK_IMPORTED_MODULE_8__appUtils_get_pic_js__["a" /* default */])(props.ship, illustId) : getExtraIllustPic(props.ship, id, illustId));
            });
        });
        return _this;
    }

    _createClass(ShipDetailsComponentSlotEquipments, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (true) {
                var _Swiper = __webpack_require__(827);
                this.illusts = new _Swiper(this._container, {
                    speed: 400,
                    spaceBetween: 100
                });
            }
        }
    }, {
        key: 'onSlideChangeEnd',
        value: function onSlideChangeEnd(swiper) {
            this.setState({
                swiperIndex: swiper.realIndex
            });
            if (typeof this.props.onIndexChange === 'function') this.props.onIndexChange(swiper.realIndex);
            // console.log(swiper.activeIndex, swiper.realIndex)
        }
    }, {
        key: 'renderExillustName',
        value: function renderExillustName(type) {
            var name = __WEBPACK_IMPORTED_MODULE_7__appLogic_database__["a" /* default */].exillustTypes[type]._name;
            var time = __WEBPACK_IMPORTED_MODULE_7__appLogic_database__["a" /* default */].exillustTypes[type]._time;
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_3_react_transition_group_CSSTransition___default.a,
                {
                    key: type,
                    classNames: 'transition',
                    timeout: 200
                },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'span',
                    { className: 'illust-name' },
                    name,
                    time && time != name && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'small',
                        null,
                        '(',
                        time,
                        ')'
                    )
                )
            );
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.props.dispatch(Object(__WEBPACK_IMPORTED_MODULE_9__appLogic_ship_details_api_js__["a" /* changeIllust */])(this.props.ship.id, this.state.swiperIndex));
        }
    }, {
        key: 'render',
        value: function render() {
            var currentExtraIllustId = this.extraIllusts && this.extraIllusts[Math.floor((this.state.swiperIndex - 2) / 2)];
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_4__appUI_containers_infos_component__["a" /* default */],
                { className: this.props.className },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    __WEBPACK_IMPORTED_MODULE_5__appUI_components_swiper__["a" /* default */],
                    {
                        slides: this.pics.map(function (url) {
                            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { 'data-src': url, className: 'swiper-lazy' });
                        }),

                        initialSlide: this.props.defaultIndex || 0,

                        slidesPerView: 2,
                        slidesPerGroup: 2,
                        spaceBetween: 10,

                        controlsWrapper: true,

                        pagination: true,

                        prevButton: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__appUI_components_icon__["a" /* default */], { className: 'icon', icon: 'arrow-left3' }),
                        nextButton: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__appUI_components_icon__["a" /* default */], { className: 'icon', icon: 'arrow-right3' }),

                        grabCursor: true,
                        mousewheelControl: true,

                        preloadImages: false,
                        lazyLoading: true,
                        lazyLoadingInPrevNext: true,
                        lazyLoadingInPrevNextAmount: 2,

                        breakpoints: {
                            480: {
                                slidesPerView: 1,
                                slidesPerGroup: 1
                            },
                            1152: {
                                slidesPerView: 2,
                                slidesPerGroup: 2
                            },
                            1440: {
                                slidesPerView: 1,
                                slidesPerGroup: 1
                            }
                        },

                        onSlideChangeEnd: this.onSlideChangeEnd.bind(this)
                    },
                    true && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        __WEBPACK_IMPORTED_MODULE_2_react_transition_group_TransitionGroup___default.a,
                        { component: 'div', className: 'illust-name-container', appear: true },
                        currentExtraIllustId && __WEBPACK_IMPORTED_MODULE_7__appLogic_database__["a" /* default */].exillusts[currentExtraIllustId] && __WEBPACK_IMPORTED_MODULE_7__appLogic_database__["a" /* default */].exillusts[currentExtraIllustId].type && this.renderExillustName(__WEBPACK_IMPORTED_MODULE_7__appLogic_database__["a" /* default */].exillusts[currentExtraIllustId].type)
                    )
                )
            );
        }
    }]);

    return ShipDetailsComponentSlotEquipments;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class) || _class);


/***/ }),

/***/ 827:
/***/ (function(module, exports, __webpack_require__) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Swiper 3.4.2
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * 
 * http://www.idangero.us/swiper/
 * 
 * Copyright 2017, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 * 
 * Licensed under MIT
 * 
 * Released on: March 10, 2017
 */
(function () {
    'use strict';

    var $;

    /*===========================
    Swiper
    ===========================*/
    var Swiper = function Swiper(container, params) {
        if (!(this instanceof Swiper)) return new Swiper(container, params);

        var defaults = {
            direction: 'horizontal',
            touchEventsTarget: 'container',
            initialSlide: 0,
            speed: 300,
            // autoplay
            autoplay: false,
            autoplayDisableOnInteraction: true,
            autoplayStopOnLast: false,
            // To support iOS's swipe-to-go-back gesture (when being used in-app, with UIWebView).
            iOSEdgeSwipeDetection: false,
            iOSEdgeSwipeThreshold: 20,
            // Free mode
            freeMode: false,
            freeModeMomentum: true,
            freeModeMomentumRatio: 1,
            freeModeMomentumBounce: true,
            freeModeMomentumBounceRatio: 1,
            freeModeMomentumVelocityRatio: 1,
            freeModeSticky: false,
            freeModeMinimumVelocity: 0.02,
            // Autoheight
            autoHeight: false,
            // Set wrapper width
            setWrapperSize: false,
            // Virtual Translate
            virtualTranslate: false,
            // Effects
            effect: 'slide', // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
            coverflow: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true
            },
            flip: {
                slideShadows: true,
                limitRotation: true
            },
            cube: {
                slideShadows: true,
                shadow: true,
                shadowOffset: 20,
                shadowScale: 0.94
            },
            fade: {
                crossFade: false
            },
            // Parallax
            parallax: false,
            // Zoom
            zoom: false,
            zoomMax: 3,
            zoomMin: 1,
            zoomToggle: true,
            // Scrollbar
            scrollbar: null,
            scrollbarHide: true,
            scrollbarDraggable: false,
            scrollbarSnapOnRelease: false,
            // Keyboard Mousewheel
            keyboardControl: false,
            mousewheelControl: false,
            mousewheelReleaseOnEdges: false,
            mousewheelInvert: false,
            mousewheelForceToAxis: false,
            mousewheelSensitivity: 1,
            mousewheelEventsTarged: 'container',
            // Hash Navigation
            hashnav: false,
            hashnavWatchState: false,
            // History
            history: false,
            // Commong Nav State
            replaceState: false,
            // Breakpoints
            breakpoints: undefined,
            // Slides grid
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerColumnFill: 'column',
            slidesPerGroup: 1,
            centeredSlides: false,
            slidesOffsetBefore: 0, // in px
            slidesOffsetAfter: 0, // in px
            // Round length
            roundLengths: false,
            // Touches
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: true,
            shortSwipes: true,
            longSwipes: true,
            longSwipesRatio: 0.5,
            longSwipesMs: 300,
            followFinger: true,
            onlyExternal: false,
            threshold: 0,
            touchMoveStopPropagation: true,
            touchReleaseOnEdges: false,
            // Unique Navigation Elements
            uniqueNavElements: true,
            // Pagination
            pagination: null,
            paginationElement: 'span',
            paginationClickable: false,
            paginationHide: false,
            paginationBulletRender: null,
            paginationProgressRender: null,
            paginationFractionRender: null,
            paginationCustomRender: null,
            paginationType: 'bullets', // 'bullets' or 'progress' or 'fraction' or 'custom'
            // Resistance
            resistance: true,
            resistanceRatio: 0.85,
            // Next/prev buttons
            nextButton: null,
            prevButton: null,
            // Progress
            watchSlidesProgress: false,
            watchSlidesVisibility: false,
            // Cursor
            grabCursor: false,
            // Clicks
            preventClicks: true,
            preventClicksPropagation: true,
            slideToClickedSlide: false,
            // Lazy Loading
            lazyLoading: false,
            lazyLoadingInPrevNext: false,
            lazyLoadingInPrevNextAmount: 1,
            lazyLoadingOnTransitionStart: false,
            // Images
            preloadImages: true,
            updateOnImagesReady: true,
            // loop
            loop: false,
            loopAdditionalSlides: 0,
            loopedSlides: null,
            // Control
            control: undefined,
            controlInverse: false,
            controlBy: 'slide', //or 'container'
            normalizeSlideIndex: true,
            // Swiping/no swiping
            allowSwipeToPrev: true,
            allowSwipeToNext: true,
            swipeHandler: null, //'.swipe-handler',
            noSwiping: true,
            noSwipingClass: 'swiper-no-swiping',
            // Passive Listeners
            passiveListeners: true,
            // NS
            containerModifierClass: 'swiper-container-', // NEW
            slideClass: 'swiper-slide',
            slideActiveClass: 'swiper-slide-active',
            slideDuplicateActiveClass: 'swiper-slide-duplicate-active',
            slideVisibleClass: 'swiper-slide-visible',
            slideDuplicateClass: 'swiper-slide-duplicate',
            slideNextClass: 'swiper-slide-next',
            slideDuplicateNextClass: 'swiper-slide-duplicate-next',
            slidePrevClass: 'swiper-slide-prev',
            slideDuplicatePrevClass: 'swiper-slide-duplicate-prev',
            wrapperClass: 'swiper-wrapper',
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
            buttonDisabledClass: 'swiper-button-disabled',
            paginationCurrentClass: 'swiper-pagination-current',
            paginationTotalClass: 'swiper-pagination-total',
            paginationHiddenClass: 'swiper-pagination-hidden',
            paginationProgressbarClass: 'swiper-pagination-progressbar',
            paginationClickableClass: 'swiper-pagination-clickable', // NEW
            paginationModifierClass: 'swiper-pagination-', // NEW
            lazyLoadingClass: 'swiper-lazy',
            lazyStatusLoadingClass: 'swiper-lazy-loading',
            lazyStatusLoadedClass: 'swiper-lazy-loaded',
            lazyPreloaderClass: 'swiper-lazy-preloader',
            notificationClass: 'swiper-notification',
            preloaderClass: 'preloader',
            zoomContainerClass: 'swiper-zoom-container',

            // Observer
            observer: false,
            observeParents: false,
            // Accessibility
            a11y: false,
            prevSlideMessage: 'Previous slide',
            nextSlideMessage: 'Next slide',
            firstSlideMessage: 'This is the first slide',
            lastSlideMessage: 'This is the last slide',
            paginationBulletMessage: 'Go to slide {{index}}',
            // Callbacks
            runCallbacksOnInit: true
            /*
            Callbacks:
            onInit: function (swiper)
            onDestroy: function (swiper)
            onBeforeResize: function (swiper)
            onAfterResize: function (swiper)
            onClick: function (swiper, e)
            onTap: function (swiper, e)
            onDoubleTap: function (swiper, e)
            onSliderMove: function (swiper, e)
            onSlideChangeStart: function (swiper)
            onSlideChangeEnd: function (swiper)
            onTransitionStart: function (swiper)
            onTransitionEnd: function (swiper)
            onImagesReady: function (swiper)
            onProgress: function (swiper, progress)
            onTouchStart: function (swiper, e)
            onTouchMove: function (swiper, e)
            onTouchMoveOpposite: function (swiper, e)
            onTouchEnd: function (swiper, e)
            onReachBeginning: function (swiper)
            onReachEnd: function (swiper)
            onSetTransition: function (swiper, duration)
            onSetTranslate: function (swiper, translate)
            onAutoplayStart: function (swiper)
            onAutoplayStop: function (swiper),
            onLazyImageLoad: function (swiper, slide, image)
            onLazyImageReady: function (swiper, slide, image)
            onKeyPress: function (swiper, keyCode)
            */

        };
        var initialVirtualTranslate = params && params.virtualTranslate;

        params = params || {};
        var originalParams = {};
        for (var param in params) {
            if (_typeof(params[param]) === 'object' && params[param] !== null && !(params[param].nodeType || params[param] === window || params[param] === document || typeof Dom7 !== 'undefined' && params[param] instanceof Dom7 || typeof jQuery !== 'undefined' && params[param] instanceof jQuery)) {
                originalParams[param] = {};
                for (var deepParam in params[param]) {
                    originalParams[param][deepParam] = params[param][deepParam];
                }
            } else {
                originalParams[param] = params[param];
            }
        }
        for (var def in defaults) {
            if (typeof params[def] === 'undefined') {
                params[def] = defaults[def];
            } else if (_typeof(params[def]) === 'object') {
                for (var deepDef in defaults[def]) {
                    if (typeof params[def][deepDef] === 'undefined') {
                        params[def][deepDef] = defaults[def][deepDef];
                    }
                }
            }
        }

        // Swiper
        var s = this;

        // Params
        s.params = params;
        s.originalParams = originalParams;

        // Classname
        s.classNames = [];
        /*=========================
          Dom Library and plugins
          ===========================*/
        if (typeof $ !== 'undefined' && typeof Dom7 !== 'undefined') {
            $ = Dom7;
        }
        if (typeof $ === 'undefined') {
            if (typeof Dom7 === 'undefined') {
                $ = window.Dom7 || window.Zepto || window.jQuery;
            } else {
                $ = Dom7;
            }
            if (!$) return;
        }
        // Export it to Swiper instance
        s.$ = $;

        /*=========================
          Breakpoints
          ===========================*/
        s.currentBreakpoint = undefined;
        s.getActiveBreakpoint = function () {
            //Get breakpoint for window width
            if (!s.params.breakpoints) return false;
            var breakpoint = false;
            var points = [],
                point;
            for (point in s.params.breakpoints) {
                if (s.params.breakpoints.hasOwnProperty(point)) {
                    points.push(point);
                }
            }
            points.sort(function (a, b) {
                return parseInt(a, 10) > parseInt(b, 10);
            });
            for (var i = 0; i < points.length; i++) {
                point = points[i];
                if (point >= window.innerWidth && !breakpoint) {
                    breakpoint = point;
                }
            }
            return breakpoint || 'max';
        };
        s.setBreakpoint = function () {
            //Set breakpoint for window width and update parameters
            var breakpoint = s.getActiveBreakpoint();
            if (breakpoint && s.currentBreakpoint !== breakpoint) {
                var breakPointsParams = breakpoint in s.params.breakpoints ? s.params.breakpoints[breakpoint] : s.originalParams;
                var needsReLoop = s.params.loop && breakPointsParams.slidesPerView !== s.params.slidesPerView;
                for (var param in breakPointsParams) {
                    s.params[param] = breakPointsParams[param];
                }
                s.currentBreakpoint = breakpoint;
                if (needsReLoop && s.destroyLoop) {
                    s.reLoop(true);
                }
            }
        };
        // Set breakpoint on load
        if (s.params.breakpoints) {
            s.setBreakpoint();
        }

        /*=========================
          Preparation - Define Container, Wrapper and Pagination
          ===========================*/
        s.container = $(container);
        if (s.container.length === 0) return;
        if (s.container.length > 1) {
            var swipers = [];
            s.container.each(function () {
                var container = this;
                swipers.push(new Swiper(this, params));
            });
            return swipers;
        }

        // Save instance in container HTML Element and in data
        s.container[0].swiper = s;
        s.container.data('swiper', s);

        s.classNames.push(s.params.containerModifierClass + s.params.direction);

        if (s.params.freeMode) {
            s.classNames.push(s.params.containerModifierClass + 'free-mode');
        }
        if (!s.support.flexbox) {
            s.classNames.push(s.params.containerModifierClass + 'no-flexbox');
            s.params.slidesPerColumn = 1;
        }
        if (s.params.autoHeight) {
            s.classNames.push(s.params.containerModifierClass + 'autoheight');
        }
        // Enable slides progress when required
        if (s.params.parallax || s.params.watchSlidesVisibility) {
            s.params.watchSlidesProgress = true;
        }
        // Max resistance when touchReleaseOnEdges
        if (s.params.touchReleaseOnEdges) {
            s.params.resistanceRatio = 0;
        }
        // Coverflow / 3D
        if (['cube', 'coverflow', 'flip'].indexOf(s.params.effect) >= 0) {
            if (s.support.transforms3d) {
                s.params.watchSlidesProgress = true;
                s.classNames.push(s.params.containerModifierClass + '3d');
            } else {
                s.params.effect = 'slide';
            }
        }
        if (s.params.effect !== 'slide') {
            s.classNames.push(s.params.containerModifierClass + s.params.effect);
        }
        if (s.params.effect === 'cube') {
            s.params.resistanceRatio = 0;
            s.params.slidesPerView = 1;
            s.params.slidesPerColumn = 1;
            s.params.slidesPerGroup = 1;
            s.params.centeredSlides = false;
            s.params.spaceBetween = 0;
            s.params.virtualTranslate = true;
        }
        if (s.params.effect === 'fade' || s.params.effect === 'flip') {
            s.params.slidesPerView = 1;
            s.params.slidesPerColumn = 1;
            s.params.slidesPerGroup = 1;
            s.params.watchSlidesProgress = true;
            s.params.spaceBetween = 0;
            if (typeof initialVirtualTranslate === 'undefined') {
                s.params.virtualTranslate = true;
            }
        }

        // Grab Cursor
        if (s.params.grabCursor && s.support.touch) {
            s.params.grabCursor = false;
        }

        // Wrapper
        s.wrapper = s.container.children('.' + s.params.wrapperClass);

        // Pagination
        if (s.params.pagination) {
            s.paginationContainer = $(s.params.pagination);
            if (s.params.uniqueNavElements && typeof s.params.pagination === 'string' && s.paginationContainer.length > 1 && s.container.find(s.params.pagination).length === 1) {
                s.paginationContainer = s.container.find(s.params.pagination);
            }

            if (s.params.paginationType === 'bullets' && s.params.paginationClickable) {
                s.paginationContainer.addClass(s.params.paginationModifierClass + 'clickable');
            } else {
                s.params.paginationClickable = false;
            }
            s.paginationContainer.addClass(s.params.paginationModifierClass + s.params.paginationType);
        }
        // Next/Prev Buttons
        if (s.params.nextButton || s.params.prevButton) {
            if (s.params.nextButton) {
                s.nextButton = $(s.params.nextButton);
                if (s.params.uniqueNavElements && typeof s.params.nextButton === 'string' && s.nextButton.length > 1 && s.container.find(s.params.nextButton).length === 1) {
                    s.nextButton = s.container.find(s.params.nextButton);
                }
            }
            if (s.params.prevButton) {
                s.prevButton = $(s.params.prevButton);
                if (s.params.uniqueNavElements && typeof s.params.prevButton === 'string' && s.prevButton.length > 1 && s.container.find(s.params.prevButton).length === 1) {
                    s.prevButton = s.container.find(s.params.prevButton);
                }
            }
        }

        // Is Horizontal
        s.isHorizontal = function () {
            return s.params.direction === 'horizontal';
        };
        // s.isH = isH;

        // RTL
        s.rtl = s.isHorizontal() && (s.container[0].dir.toLowerCase() === 'rtl' || s.container.css('direction') === 'rtl');
        if (s.rtl) {
            s.classNames.push(s.params.containerModifierClass + 'rtl');
        }

        // Wrong RTL support
        if (s.rtl) {
            s.wrongRTL = s.wrapper.css('display') === '-webkit-box';
        }

        // Columns
        if (s.params.slidesPerColumn > 1) {
            s.classNames.push(s.params.containerModifierClass + 'multirow');
        }

        // Check for Android
        if (s.device.android) {
            s.classNames.push(s.params.containerModifierClass + 'android');
        }

        // Add classes
        s.container.addClass(s.classNames.join(' '));

        // Translate
        s.translate = 0;

        // Progress
        s.progress = 0;

        // Velocity
        s.velocity = 0;

        /*=========================
          Locks, unlocks
          ===========================*/
        s.lockSwipeToNext = function () {
            s.params.allowSwipeToNext = false;
            if (s.params.allowSwipeToPrev === false && s.params.grabCursor) {
                s.unsetGrabCursor();
            }
        };
        s.lockSwipeToPrev = function () {
            s.params.allowSwipeToPrev = false;
            if (s.params.allowSwipeToNext === false && s.params.grabCursor) {
                s.unsetGrabCursor();
            }
        };
        s.lockSwipes = function () {
            s.params.allowSwipeToNext = s.params.allowSwipeToPrev = false;
            if (s.params.grabCursor) s.unsetGrabCursor();
        };
        s.unlockSwipeToNext = function () {
            s.params.allowSwipeToNext = true;
            if (s.params.allowSwipeToPrev === true && s.params.grabCursor) {
                s.setGrabCursor();
            }
        };
        s.unlockSwipeToPrev = function () {
            s.params.allowSwipeToPrev = true;
            if (s.params.allowSwipeToNext === true && s.params.grabCursor) {
                s.setGrabCursor();
            }
        };
        s.unlockSwipes = function () {
            s.params.allowSwipeToNext = s.params.allowSwipeToPrev = true;
            if (s.params.grabCursor) s.setGrabCursor();
        };

        /*=========================
          Round helper
          ===========================*/
        function round(a) {
            return Math.floor(a);
        }
        /*=========================
          Set grab cursor
          ===========================*/
        s.setGrabCursor = function (moving) {
            s.container[0].style.cursor = 'move';
            s.container[0].style.cursor = moving ? '-webkit-grabbing' : '-webkit-grab';
            s.container[0].style.cursor = moving ? '-moz-grabbin' : '-moz-grab';
            s.container[0].style.cursor = moving ? 'grabbing' : 'grab';
        };
        s.unsetGrabCursor = function () {
            s.container[0].style.cursor = '';
        };
        if (s.params.grabCursor) {
            s.setGrabCursor();
        }
        /*=========================
          Update on Images Ready
          ===========================*/
        s.imagesToLoad = [];
        s.imagesLoaded = 0;

        s.loadImage = function (imgElement, src, srcset, sizes, checkForComplete, callback) {
            var image;
            function onReady() {
                if (callback) callback();
            }
            if (!imgElement.complete || !checkForComplete) {
                if (src) {
                    image = new window.Image();
                    image.onload = onReady;
                    image.onerror = onReady;
                    if (sizes) {
                        image.sizes = sizes;
                    }
                    if (srcset) {
                        image.srcset = srcset;
                    }
                    if (src) {
                        image.src = src;
                    }
                } else {
                    onReady();
                }
            } else {
                //image already loaded...
                onReady();
            }
        };
        s.preloadImages = function () {
            s.imagesToLoad = s.container.find('img');
            function _onReady() {
                if (typeof s === 'undefined' || s === null || !s) return;
                if (s.imagesLoaded !== undefined) s.imagesLoaded++;
                if (s.imagesLoaded === s.imagesToLoad.length) {
                    if (s.params.updateOnImagesReady) s.update();
                    s.emit('onImagesReady', s);
                }
            }
            for (var i = 0; i < s.imagesToLoad.length; i++) {
                s.loadImage(s.imagesToLoad[i], s.imagesToLoad[i].currentSrc || s.imagesToLoad[i].getAttribute('src'), s.imagesToLoad[i].srcset || s.imagesToLoad[i].getAttribute('srcset'), s.imagesToLoad[i].sizes || s.imagesToLoad[i].getAttribute('sizes'), true, _onReady);
            }
        };

        /*=========================
          Autoplay
          ===========================*/
        s.autoplayTimeoutId = undefined;
        s.autoplaying = false;
        s.autoplayPaused = false;
        function autoplay() {
            var autoplayDelay = s.params.autoplay;
            var activeSlide = s.slides.eq(s.activeIndex);
            if (activeSlide.attr('data-swiper-autoplay')) {
                autoplayDelay = activeSlide.attr('data-swiper-autoplay') || s.params.autoplay;
            }
            s.autoplayTimeoutId = setTimeout(function () {
                if (s.params.loop) {
                    s.fixLoop();
                    s._slideNext();
                    s.emit('onAutoplay', s);
                } else {
                    if (!s.isEnd) {
                        s._slideNext();
                        s.emit('onAutoplay', s);
                    } else {
                        if (!params.autoplayStopOnLast) {
                            s._slideTo(0);
                            s.emit('onAutoplay', s);
                        } else {
                            s.stopAutoplay();
                        }
                    }
                }
            }, autoplayDelay);
        }
        s.startAutoplay = function () {
            if (typeof s.autoplayTimeoutId !== 'undefined') return false;
            if (!s.params.autoplay) return false;
            if (s.autoplaying) return false;
            s.autoplaying = true;
            s.emit('onAutoplayStart', s);
            autoplay();
        };
        s.stopAutoplay = function (internal) {
            if (!s.autoplayTimeoutId) return;
            if (s.autoplayTimeoutId) clearTimeout(s.autoplayTimeoutId);
            s.autoplaying = false;
            s.autoplayTimeoutId = undefined;
            s.emit('onAutoplayStop', s);
        };
        s.pauseAutoplay = function (speed) {
            if (s.autoplayPaused) return;
            if (s.autoplayTimeoutId) clearTimeout(s.autoplayTimeoutId);
            s.autoplayPaused = true;
            if (speed === 0) {
                s.autoplayPaused = false;
                autoplay();
            } else {
                s.wrapper.transitionEnd(function () {
                    if (!s) return;
                    s.autoplayPaused = false;
                    if (!s.autoplaying) {
                        s.stopAutoplay();
                    } else {
                        autoplay();
                    }
                });
            }
        };
        /*=========================
          Min/Max Translate
          ===========================*/
        s.minTranslate = function () {
            return -s.snapGrid[0];
        };
        s.maxTranslate = function () {
            return -s.snapGrid[s.snapGrid.length - 1];
        };
        /*=========================
          Slider/slides sizes
          ===========================*/
        s.updateAutoHeight = function () {
            var activeSlides = [];
            var newHeight = 0;
            var i;

            // Find slides currently in view
            if (s.params.slidesPerView !== 'auto' && s.params.slidesPerView > 1) {
                for (i = 0; i < Math.ceil(s.params.slidesPerView); i++) {
                    var index = s.activeIndex + i;
                    if (index > s.slides.length) break;
                    activeSlides.push(s.slides.eq(index)[0]);
                }
            } else {
                activeSlides.push(s.slides.eq(s.activeIndex)[0]);
            }

            // Find new height from heighest slide in view
            for (i = 0; i < activeSlides.length; i++) {
                if (typeof activeSlides[i] !== 'undefined') {
                    var height = activeSlides[i].offsetHeight;
                    newHeight = height > newHeight ? height : newHeight;
                }
            }

            // Update Height
            if (newHeight) s.wrapper.css('height', newHeight + 'px');
        };
        s.updateContainerSize = function () {
            var width, height;
            if (typeof s.params.width !== 'undefined') {
                width = s.params.width;
            } else {
                width = s.container[0].clientWidth;
            }
            if (typeof s.params.height !== 'undefined') {
                height = s.params.height;
            } else {
                height = s.container[0].clientHeight;
            }
            if (width === 0 && s.isHorizontal() || height === 0 && !s.isHorizontal()) {
                return;
            }

            //Subtract paddings
            width = width - parseInt(s.container.css('padding-left'), 10) - parseInt(s.container.css('padding-right'), 10);
            height = height - parseInt(s.container.css('padding-top'), 10) - parseInt(s.container.css('padding-bottom'), 10);

            // Store values
            s.width = width;
            s.height = height;
            s.size = s.isHorizontal() ? s.width : s.height;
        };

        s.updateSlidesSize = function () {
            s.slides = s.wrapper.children('.' + s.params.slideClass);
            s.snapGrid = [];
            s.slidesGrid = [];
            s.slidesSizesGrid = [];

            var spaceBetween = s.params.spaceBetween,
                slidePosition = -s.params.slidesOffsetBefore,
                i,
                prevSlideSize = 0,
                index = 0;
            if (typeof s.size === 'undefined') return;
            if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
                spaceBetween = parseFloat(spaceBetween.replace('%', '')) / 100 * s.size;
            }

            s.virtualSize = -spaceBetween;
            // reset margins
            if (s.rtl) s.slides.css({ marginLeft: '', marginTop: '' });else s.slides.css({ marginRight: '', marginBottom: '' });

            var slidesNumberEvenToRows;
            if (s.params.slidesPerColumn > 1) {
                if (Math.floor(s.slides.length / s.params.slidesPerColumn) === s.slides.length / s.params.slidesPerColumn) {
                    slidesNumberEvenToRows = s.slides.length;
                } else {
                    slidesNumberEvenToRows = Math.ceil(s.slides.length / s.params.slidesPerColumn) * s.params.slidesPerColumn;
                }
                if (s.params.slidesPerView !== 'auto' && s.params.slidesPerColumnFill === 'row') {
                    slidesNumberEvenToRows = Math.max(slidesNumberEvenToRows, s.params.slidesPerView * s.params.slidesPerColumn);
                }
            }

            // Calc slides
            var slideSize;
            var slidesPerColumn = s.params.slidesPerColumn;
            var slidesPerRow = slidesNumberEvenToRows / slidesPerColumn;
            var numFullColumns = slidesPerRow - (s.params.slidesPerColumn * slidesPerRow - s.slides.length);
            for (i = 0; i < s.slides.length; i++) {
                slideSize = 0;
                var slide = s.slides.eq(i);
                if (s.params.slidesPerColumn > 1) {
                    // Set slides order
                    var newSlideOrderIndex;
                    var column, row;
                    if (s.params.slidesPerColumnFill === 'column') {
                        column = Math.floor(i / slidesPerColumn);
                        row = i - column * slidesPerColumn;
                        if (column > numFullColumns || column === numFullColumns && row === slidesPerColumn - 1) {
                            if (++row >= slidesPerColumn) {
                                row = 0;
                                column++;
                            }
                        }
                        newSlideOrderIndex = column + row * slidesNumberEvenToRows / slidesPerColumn;
                        slide.css({
                            '-webkit-box-ordinal-group': newSlideOrderIndex,
                            '-moz-box-ordinal-group': newSlideOrderIndex,
                            '-ms-flex-order': newSlideOrderIndex,
                            '-webkit-order': newSlideOrderIndex,
                            'order': newSlideOrderIndex
                        });
                    } else {
                        row = Math.floor(i / slidesPerRow);
                        column = i - row * slidesPerRow;
                    }
                    slide.css('margin-' + (s.isHorizontal() ? 'top' : 'left'), row !== 0 && s.params.spaceBetween && s.params.spaceBetween + 'px').attr('data-swiper-column', column).attr('data-swiper-row', row);
                }
                if (slide.css('display') === 'none') continue;
                if (s.params.slidesPerView === 'auto') {
                    slideSize = s.isHorizontal() ? slide.outerWidth(true) : slide.outerHeight(true);
                    if (s.params.roundLengths) slideSize = round(slideSize);
                } else {
                    slideSize = (s.size - (s.params.slidesPerView - 1) * spaceBetween) / s.params.slidesPerView;
                    if (s.params.roundLengths) slideSize = round(slideSize);

                    if (s.isHorizontal()) {
                        s.slides[i].style.width = slideSize + 'px';
                    } else {
                        s.slides[i].style.height = slideSize + 'px';
                    }
                }
                s.slides[i].swiperSlideSize = slideSize;
                s.slidesSizesGrid.push(slideSize);

                if (s.params.centeredSlides) {
                    slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
                    if (prevSlideSize === 0 && i !== 0) slidePosition = slidePosition - s.size / 2 - spaceBetween;
                    if (i === 0) slidePosition = slidePosition - s.size / 2 - spaceBetween;
                    if (Math.abs(slidePosition) < 1 / 1000) slidePosition = 0;
                    if (index % s.params.slidesPerGroup === 0) s.snapGrid.push(slidePosition);
                    s.slidesGrid.push(slidePosition);
                } else {
                    if (index % s.params.slidesPerGroup === 0) s.snapGrid.push(slidePosition);
                    s.slidesGrid.push(slidePosition);
                    slidePosition = slidePosition + slideSize + spaceBetween;
                }

                s.virtualSize += slideSize + spaceBetween;

                prevSlideSize = slideSize;

                index++;
            }
            s.virtualSize = Math.max(s.virtualSize, s.size) + s.params.slidesOffsetAfter;
            var newSlidesGrid;

            if (s.rtl && s.wrongRTL && (s.params.effect === 'slide' || s.params.effect === 'coverflow')) {
                s.wrapper.css({ width: s.virtualSize + s.params.spaceBetween + 'px' });
            }
            if (!s.support.flexbox || s.params.setWrapperSize) {
                if (s.isHorizontal()) s.wrapper.css({ width: s.virtualSize + s.params.spaceBetween + 'px' });else s.wrapper.css({ height: s.virtualSize + s.params.spaceBetween + 'px' });
            }

            if (s.params.slidesPerColumn > 1) {
                s.virtualSize = (slideSize + s.params.spaceBetween) * slidesNumberEvenToRows;
                s.virtualSize = Math.ceil(s.virtualSize / s.params.slidesPerColumn) - s.params.spaceBetween;
                if (s.isHorizontal()) s.wrapper.css({ width: s.virtualSize + s.params.spaceBetween + 'px' });else s.wrapper.css({ height: s.virtualSize + s.params.spaceBetween + 'px' });
                if (s.params.centeredSlides) {
                    newSlidesGrid = [];
                    for (i = 0; i < s.snapGrid.length; i++) {
                        if (s.snapGrid[i] < s.virtualSize + s.snapGrid[0]) newSlidesGrid.push(s.snapGrid[i]);
                    }
                    s.snapGrid = newSlidesGrid;
                }
            }

            // Remove last grid elements depending on width
            if (!s.params.centeredSlides) {
                newSlidesGrid = [];
                for (i = 0; i < s.snapGrid.length; i++) {
                    if (s.snapGrid[i] <= s.virtualSize - s.size) {
                        newSlidesGrid.push(s.snapGrid[i]);
                    }
                }
                s.snapGrid = newSlidesGrid;
                if (Math.floor(s.virtualSize - s.size) - Math.floor(s.snapGrid[s.snapGrid.length - 1]) > 1) {
                    s.snapGrid.push(s.virtualSize - s.size);
                }
            }
            if (s.snapGrid.length === 0) s.snapGrid = [0];

            if (s.params.spaceBetween !== 0) {
                if (s.isHorizontal()) {
                    if (s.rtl) s.slides.css({ marginLeft: spaceBetween + 'px' });else s.slides.css({ marginRight: spaceBetween + 'px' });
                } else s.slides.css({ marginBottom: spaceBetween + 'px' });
            }
            if (s.params.watchSlidesProgress) {
                s.updateSlidesOffset();
            }
        };
        s.updateSlidesOffset = function () {
            for (var i = 0; i < s.slides.length; i++) {
                s.slides[i].swiperSlideOffset = s.isHorizontal() ? s.slides[i].offsetLeft : s.slides[i].offsetTop;
            }
        };

        /*=========================
          Dynamic Slides Per View
          ===========================*/
        s.currentSlidesPerView = function () {
            var spv = 1,
                i,
                j;
            if (s.params.centeredSlides) {
                var size = s.slides[s.activeIndex].swiperSlideSize;
                var breakLoop;
                for (i = s.activeIndex + 1; i < s.slides.length; i++) {
                    if (s.slides[i] && !breakLoop) {
                        size += s.slides[i].swiperSlideSize;
                        spv++;
                        if (size > s.size) breakLoop = true;
                    }
                }
                for (j = s.activeIndex - 1; j >= 0; j--) {
                    if (s.slides[j] && !breakLoop) {
                        size += s.slides[j].swiperSlideSize;
                        spv++;
                        if (size > s.size) breakLoop = true;
                    }
                }
            } else {
                for (i = s.activeIndex + 1; i < s.slides.length; i++) {
                    if (s.slidesGrid[i] - s.slidesGrid[s.activeIndex] < s.size) {
                        spv++;
                    }
                }
            }
            return spv;
        };
        /*=========================
          Slider/slides progress
          ===========================*/
        s.updateSlidesProgress = function (translate) {
            if (typeof translate === 'undefined') {
                translate = s.translate || 0;
            }
            if (s.slides.length === 0) return;
            if (typeof s.slides[0].swiperSlideOffset === 'undefined') s.updateSlidesOffset();

            var offsetCenter = -translate;
            if (s.rtl) offsetCenter = translate;

            // Visible Slides
            s.slides.removeClass(s.params.slideVisibleClass);
            for (var i = 0; i < s.slides.length; i++) {
                var slide = s.slides[i];
                var slideProgress = (offsetCenter + (s.params.centeredSlides ? s.minTranslate() : 0) - slide.swiperSlideOffset) / (slide.swiperSlideSize + s.params.spaceBetween);
                if (s.params.watchSlidesVisibility) {
                    var slideBefore = -(offsetCenter - slide.swiperSlideOffset);
                    var slideAfter = slideBefore + s.slidesSizesGrid[i];
                    var isVisible = slideBefore >= 0 && slideBefore < s.size || slideAfter > 0 && slideAfter <= s.size || slideBefore <= 0 && slideAfter >= s.size;
                    if (isVisible) {
                        s.slides.eq(i).addClass(s.params.slideVisibleClass);
                    }
                }
                slide.progress = s.rtl ? -slideProgress : slideProgress;
            }
        };
        s.updateProgress = function (translate) {
            if (typeof translate === 'undefined') {
                translate = s.translate || 0;
            }
            var translatesDiff = s.maxTranslate() - s.minTranslate();
            var wasBeginning = s.isBeginning;
            var wasEnd = s.isEnd;
            if (translatesDiff === 0) {
                s.progress = 0;
                s.isBeginning = s.isEnd = true;
            } else {
                s.progress = (translate - s.minTranslate()) / translatesDiff;
                s.isBeginning = s.progress <= 0;
                s.isEnd = s.progress >= 1;
            }
            if (s.isBeginning && !wasBeginning) s.emit('onReachBeginning', s);
            if (s.isEnd && !wasEnd) s.emit('onReachEnd', s);

            if (s.params.watchSlidesProgress) s.updateSlidesProgress(translate);
            s.emit('onProgress', s, s.progress);
        };
        s.updateActiveIndex = function () {
            var translate = s.rtl ? s.translate : -s.translate;
            var newActiveIndex, i, snapIndex;
            for (i = 0; i < s.slidesGrid.length; i++) {
                if (typeof s.slidesGrid[i + 1] !== 'undefined') {
                    if (translate >= s.slidesGrid[i] && translate < s.slidesGrid[i + 1] - (s.slidesGrid[i + 1] - s.slidesGrid[i]) / 2) {
                        newActiveIndex = i;
                    } else if (translate >= s.slidesGrid[i] && translate < s.slidesGrid[i + 1]) {
                        newActiveIndex = i + 1;
                    }
                } else {
                    if (translate >= s.slidesGrid[i]) {
                        newActiveIndex = i;
                    }
                }
            }
            // Normalize slideIndex
            if (s.params.normalizeSlideIndex) {
                if (newActiveIndex < 0 || typeof newActiveIndex === 'undefined') newActiveIndex = 0;
            }
            // for (i = 0; i < s.slidesGrid.length; i++) {
            // if (- translate >= s.slidesGrid[i]) {
            // newActiveIndex = i;
            // }
            // }
            snapIndex = Math.floor(newActiveIndex / s.params.slidesPerGroup);
            if (snapIndex >= s.snapGrid.length) snapIndex = s.snapGrid.length - 1;

            if (newActiveIndex === s.activeIndex) {
                return;
            }
            s.snapIndex = snapIndex;
            s.previousIndex = s.activeIndex;
            s.activeIndex = newActiveIndex;
            s.updateClasses();
            s.updateRealIndex();
        };
        s.updateRealIndex = function () {
            s.realIndex = parseInt(s.slides.eq(s.activeIndex).attr('data-swiper-slide-index') || s.activeIndex, 10);
        };

        /*=========================
          Classes
          ===========================*/
        s.updateClasses = function () {
            s.slides.removeClass(s.params.slideActiveClass + ' ' + s.params.slideNextClass + ' ' + s.params.slidePrevClass + ' ' + s.params.slideDuplicateActiveClass + ' ' + s.params.slideDuplicateNextClass + ' ' + s.params.slideDuplicatePrevClass);
            var activeSlide = s.slides.eq(s.activeIndex);
            // Active classes
            activeSlide.addClass(s.params.slideActiveClass);
            if (params.loop) {
                // Duplicate to all looped slides
                if (activeSlide.hasClass(s.params.slideDuplicateClass)) {
                    s.wrapper.children('.' + s.params.slideClass + ':not(.' + s.params.slideDuplicateClass + ')[data-swiper-slide-index="' + s.realIndex + '"]').addClass(s.params.slideDuplicateActiveClass);
                } else {
                    s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + s.realIndex + '"]').addClass(s.params.slideDuplicateActiveClass);
                }
            }
            // Next Slide
            var nextSlide = activeSlide.next('.' + s.params.slideClass).addClass(s.params.slideNextClass);
            if (s.params.loop && nextSlide.length === 0) {
                nextSlide = s.slides.eq(0);
                nextSlide.addClass(s.params.slideNextClass);
            }
            // Prev Slide
            var prevSlide = activeSlide.prev('.' + s.params.slideClass).addClass(s.params.slidePrevClass);
            if (s.params.loop && prevSlide.length === 0) {
                prevSlide = s.slides.eq(-1);
                prevSlide.addClass(s.params.slidePrevClass);
            }
            if (params.loop) {
                // Duplicate to all looped slides
                if (nextSlide.hasClass(s.params.slideDuplicateClass)) {
                    s.wrapper.children('.' + s.params.slideClass + ':not(.' + s.params.slideDuplicateClass + ')[data-swiper-slide-index="' + nextSlide.attr('data-swiper-slide-index') + '"]').addClass(s.params.slideDuplicateNextClass);
                } else {
                    s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + nextSlide.attr('data-swiper-slide-index') + '"]').addClass(s.params.slideDuplicateNextClass);
                }
                if (prevSlide.hasClass(s.params.slideDuplicateClass)) {
                    s.wrapper.children('.' + s.params.slideClass + ':not(.' + s.params.slideDuplicateClass + ')[data-swiper-slide-index="' + prevSlide.attr('data-swiper-slide-index') + '"]').addClass(s.params.slideDuplicatePrevClass);
                } else {
                    s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + prevSlide.attr('data-swiper-slide-index') + '"]').addClass(s.params.slideDuplicatePrevClass);
                }
            }

            // Pagination
            if (s.paginationContainer && s.paginationContainer.length > 0) {
                // Current/Total
                var current,
                    total = s.params.loop ? Math.ceil((s.slides.length - s.loopedSlides * 2) / s.params.slidesPerGroup) : s.snapGrid.length;
                if (s.params.loop) {
                    current = Math.ceil((s.activeIndex - s.loopedSlides) / s.params.slidesPerGroup);
                    if (current > s.slides.length - 1 - s.loopedSlides * 2) {
                        current = current - (s.slides.length - s.loopedSlides * 2);
                    }
                    if (current > total - 1) current = current - total;
                    if (current < 0 && s.params.paginationType !== 'bullets') current = total + current;
                } else {
                    if (typeof s.snapIndex !== 'undefined') {
                        current = s.snapIndex;
                    } else {
                        current = s.activeIndex || 0;
                    }
                }
                // Types
                if (s.params.paginationType === 'bullets' && s.bullets && s.bullets.length > 0) {
                    s.bullets.removeClass(s.params.bulletActiveClass);
                    if (s.paginationContainer.length > 1) {
                        s.bullets.each(function () {
                            if ($(this).index() === current) $(this).addClass(s.params.bulletActiveClass);
                        });
                    } else {
                        s.bullets.eq(current).addClass(s.params.bulletActiveClass);
                    }
                }
                if (s.params.paginationType === 'fraction') {
                    s.paginationContainer.find('.' + s.params.paginationCurrentClass).text(current + 1);
                    s.paginationContainer.find('.' + s.params.paginationTotalClass).text(total);
                }
                if (s.params.paginationType === 'progress') {
                    var scale = (current + 1) / total,
                        scaleX = scale,
                        scaleY = 1;
                    if (!s.isHorizontal()) {
                        scaleY = scale;
                        scaleX = 1;
                    }
                    s.paginationContainer.find('.' + s.params.paginationProgressbarClass).transform('translate3d(0,0,0) scaleX(' + scaleX + ') scaleY(' + scaleY + ')').transition(s.params.speed);
                }
                if (s.params.paginationType === 'custom' && s.params.paginationCustomRender) {
                    s.paginationContainer.html(s.params.paginationCustomRender(s, current + 1, total));
                    s.emit('onPaginationRendered', s, s.paginationContainer[0]);
                }
            }

            // Next/active buttons
            if (!s.params.loop) {
                if (s.params.prevButton && s.prevButton && s.prevButton.length > 0) {
                    if (s.isBeginning) {
                        s.prevButton.addClass(s.params.buttonDisabledClass);
                        if (s.params.a11y && s.a11y) s.a11y.disable(s.prevButton);
                    } else {
                        s.prevButton.removeClass(s.params.buttonDisabledClass);
                        if (s.params.a11y && s.a11y) s.a11y.enable(s.prevButton);
                    }
                }
                if (s.params.nextButton && s.nextButton && s.nextButton.length > 0) {
                    if (s.isEnd) {
                        s.nextButton.addClass(s.params.buttonDisabledClass);
                        if (s.params.a11y && s.a11y) s.a11y.disable(s.nextButton);
                    } else {
                        s.nextButton.removeClass(s.params.buttonDisabledClass);
                        if (s.params.a11y && s.a11y) s.a11y.enable(s.nextButton);
                    }
                }
            }
        };

        /*=========================
          Pagination
          ===========================*/
        s.updatePagination = function () {
            if (!s.params.pagination) return;
            if (s.paginationContainer && s.paginationContainer.length > 0) {
                var paginationHTML = '';
                if (s.params.paginationType === 'bullets') {
                    var numberOfBullets = s.params.loop ? Math.ceil((s.slides.length - s.loopedSlides * 2) / s.params.slidesPerGroup) : s.snapGrid.length;
                    for (var i = 0; i < numberOfBullets; i++) {
                        if (s.params.paginationBulletRender) {
                            paginationHTML += s.params.paginationBulletRender(s, i, s.params.bulletClass);
                        } else {
                            paginationHTML += '<' + s.params.paginationElement + ' class="' + s.params.bulletClass + '"></' + s.params.paginationElement + '>';
                        }
                    }
                    s.paginationContainer.html(paginationHTML);
                    s.bullets = s.paginationContainer.find('.' + s.params.bulletClass);
                    if (s.params.paginationClickable && s.params.a11y && s.a11y) {
                        s.a11y.initPagination();
                    }
                }
                if (s.params.paginationType === 'fraction') {
                    if (s.params.paginationFractionRender) {
                        paginationHTML = s.params.paginationFractionRender(s, s.params.paginationCurrentClass, s.params.paginationTotalClass);
                    } else {
                        paginationHTML = '<span class="' + s.params.paginationCurrentClass + '"></span>' + ' / ' + '<span class="' + s.params.paginationTotalClass + '"></span>';
                    }
                    s.paginationContainer.html(paginationHTML);
                }
                if (s.params.paginationType === 'progress') {
                    if (s.params.paginationProgressRender) {
                        paginationHTML = s.params.paginationProgressRender(s, s.params.paginationProgressbarClass);
                    } else {
                        paginationHTML = '<span class="' + s.params.paginationProgressbarClass + '"></span>';
                    }
                    s.paginationContainer.html(paginationHTML);
                }
                if (s.params.paginationType !== 'custom') {
                    s.emit('onPaginationRendered', s, s.paginationContainer[0]);
                }
            }
        };
        /*=========================
          Common update method
          ===========================*/
        s.update = function (updateTranslate) {
            if (!s) return;
            s.updateContainerSize();
            s.updateSlidesSize();
            s.updateProgress();
            s.updatePagination();
            s.updateClasses();
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.set();
            }
            var newTranslate;
            function forceSetTranslate() {
                var translate = s.rtl ? -s.translate : s.translate;
                newTranslate = Math.min(Math.max(s.translate, s.maxTranslate()), s.minTranslate());
                s.setWrapperTranslate(newTranslate);
                s.updateActiveIndex();
                s.updateClasses();
            }
            if (updateTranslate) {
                var translated;
                if (s.controller && s.controller.spline) {
                    s.controller.spline = undefined;
                }
                if (s.params.freeMode) {
                    forceSetTranslate();
                    if (s.params.autoHeight) {
                        s.updateAutoHeight();
                    }
                } else {
                    if ((s.params.slidesPerView === 'auto' || s.params.slidesPerView > 1) && s.isEnd && !s.params.centeredSlides) {
                        translated = s.slideTo(s.slides.length - 1, 0, false, true);
                    } else {
                        translated = s.slideTo(s.activeIndex, 0, false, true);
                    }
                    if (!translated) {
                        forceSetTranslate();
                    }
                }
            } else if (s.params.autoHeight) {
                s.updateAutoHeight();
            }
        };

        /*=========================
          Resize Handler
          ===========================*/
        s.onResize = function (forceUpdatePagination) {
            if (s.params.onBeforeResize) s.params.onBeforeResize(s);
            //Breakpoints
            if (s.params.breakpoints) {
                s.setBreakpoint();
            }

            // Disable locks on resize
            var allowSwipeToPrev = s.params.allowSwipeToPrev;
            var allowSwipeToNext = s.params.allowSwipeToNext;
            s.params.allowSwipeToPrev = s.params.allowSwipeToNext = true;

            s.updateContainerSize();
            s.updateSlidesSize();
            if (s.params.slidesPerView === 'auto' || s.params.freeMode || forceUpdatePagination) s.updatePagination();
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.set();
            }
            if (s.controller && s.controller.spline) {
                s.controller.spline = undefined;
            }
            var slideChangedBySlideTo = false;
            if (s.params.freeMode) {
                var newTranslate = Math.min(Math.max(s.translate, s.maxTranslate()), s.minTranslate());
                s.setWrapperTranslate(newTranslate);
                s.updateActiveIndex();
                s.updateClasses();

                if (s.params.autoHeight) {
                    s.updateAutoHeight();
                }
            } else {
                s.updateClasses();
                if ((s.params.slidesPerView === 'auto' || s.params.slidesPerView > 1) && s.isEnd && !s.params.centeredSlides) {
                    slideChangedBySlideTo = s.slideTo(s.slides.length - 1, 0, false, true);
                } else {
                    slideChangedBySlideTo = s.slideTo(s.activeIndex, 0, false, true);
                }
            }
            if (s.params.lazyLoading && !slideChangedBySlideTo && s.lazy) {
                s.lazy.load();
            }
            // Return locks after resize
            s.params.allowSwipeToPrev = allowSwipeToPrev;
            s.params.allowSwipeToNext = allowSwipeToNext;
            if (s.params.onAfterResize) s.params.onAfterResize(s);
        };

        /*=========================
          Events
          ===========================*/

        //Define Touch Events
        s.touchEventsDesktop = { start: 'mousedown', move: 'mousemove', end: 'mouseup' };
        if (window.navigator.pointerEnabled) s.touchEventsDesktop = { start: 'pointerdown', move: 'pointermove', end: 'pointerup' };else if (window.navigator.msPointerEnabled) s.touchEventsDesktop = { start: 'MSPointerDown', move: 'MSPointerMove', end: 'MSPointerUp' };
        s.touchEvents = {
            start: s.support.touch || !s.params.simulateTouch ? 'touchstart' : s.touchEventsDesktop.start,
            move: s.support.touch || !s.params.simulateTouch ? 'touchmove' : s.touchEventsDesktop.move,
            end: s.support.touch || !s.params.simulateTouch ? 'touchend' : s.touchEventsDesktop.end
        };

        // WP8 Touch Events Fix
        if (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) {
            (s.params.touchEventsTarget === 'container' ? s.container : s.wrapper).addClass('swiper-wp8-' + s.params.direction);
        }

        // Attach/detach events
        s.initEvents = function (detach) {
            var actionDom = detach ? 'off' : 'on';
            var action = detach ? 'removeEventListener' : 'addEventListener';
            var touchEventsTarget = s.params.touchEventsTarget === 'container' ? s.container[0] : s.wrapper[0];
            var target = s.support.touch ? touchEventsTarget : document;

            var moveCapture = s.params.nested ? true : false;

            //Touch Events
            if (s.browser.ie) {
                touchEventsTarget[action](s.touchEvents.start, s.onTouchStart, false);
                target[action](s.touchEvents.move, s.onTouchMove, moveCapture);
                target[action](s.touchEvents.end, s.onTouchEnd, false);
            } else {
                if (s.support.touch) {
                    var passiveListener = s.touchEvents.start === 'touchstart' && s.support.passiveListener && s.params.passiveListeners ? { passive: true, capture: false } : false;
                    touchEventsTarget[action](s.touchEvents.start, s.onTouchStart, passiveListener);
                    touchEventsTarget[action](s.touchEvents.move, s.onTouchMove, moveCapture);
                    touchEventsTarget[action](s.touchEvents.end, s.onTouchEnd, passiveListener);
                }
                if (params.simulateTouch && !s.device.ios && !s.device.android || params.simulateTouch && !s.support.touch && s.device.ios) {
                    touchEventsTarget[action]('mousedown', s.onTouchStart, false);
                    document[action]('mousemove', s.onTouchMove, moveCapture);
                    document[action]('mouseup', s.onTouchEnd, false);
                }
            }
            window[action]('resize', s.onResize);

            // Next, Prev, Index
            if (s.params.nextButton && s.nextButton && s.nextButton.length > 0) {
                s.nextButton[actionDom]('click', s.onClickNext);
                if (s.params.a11y && s.a11y) s.nextButton[actionDom]('keydown', s.a11y.onEnterKey);
            }
            if (s.params.prevButton && s.prevButton && s.prevButton.length > 0) {
                s.prevButton[actionDom]('click', s.onClickPrev);
                if (s.params.a11y && s.a11y) s.prevButton[actionDom]('keydown', s.a11y.onEnterKey);
            }
            if (s.params.pagination && s.params.paginationClickable) {
                s.paginationContainer[actionDom]('click', '.' + s.params.bulletClass, s.onClickIndex);
                if (s.params.a11y && s.a11y) s.paginationContainer[actionDom]('keydown', '.' + s.params.bulletClass, s.a11y.onEnterKey);
            }

            // Prevent Links Clicks
            if (s.params.preventClicks || s.params.preventClicksPropagation) touchEventsTarget[action]('click', s.preventClicks, true);
        };
        s.attachEvents = function () {
            s.initEvents();
        };
        s.detachEvents = function () {
            s.initEvents(true);
        };

        /*=========================
          Handle Clicks
          ===========================*/
        // Prevent Clicks
        s.allowClick = true;
        s.preventClicks = function (e) {
            if (!s.allowClick) {
                if (s.params.preventClicks) e.preventDefault();
                if (s.params.preventClicksPropagation && s.animating) {
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                }
            }
        };
        // Clicks
        s.onClickNext = function (e) {
            e.preventDefault();
            if (s.isEnd && !s.params.loop) return;
            s.slideNext();
        };
        s.onClickPrev = function (e) {
            e.preventDefault();
            if (s.isBeginning && !s.params.loop) return;
            s.slidePrev();
        };
        s.onClickIndex = function (e) {
            e.preventDefault();
            var index = $(this).index() * s.params.slidesPerGroup;
            if (s.params.loop) index = index + s.loopedSlides;
            s.slideTo(index);
        };

        /*=========================
          Handle Touches
          ===========================*/
        function findElementInEvent(e, selector) {
            var el = $(e.target);
            if (!el.is(selector)) {
                if (typeof selector === 'string') {
                    el = el.parents(selector);
                } else if (selector.nodeType) {
                    var found;
                    el.parents().each(function (index, _el) {
                        if (_el === selector) found = selector;
                    });
                    if (!found) return undefined;else return selector;
                }
            }
            if (el.length === 0) {
                return undefined;
            }
            return el[0];
        }
        s.updateClickedSlide = function (e) {
            var slide = findElementInEvent(e, '.' + s.params.slideClass);
            var slideFound = false;
            if (slide) {
                for (var i = 0; i < s.slides.length; i++) {
                    if (s.slides[i] === slide) slideFound = true;
                }
            }

            if (slide && slideFound) {
                s.clickedSlide = slide;
                s.clickedIndex = $(slide).index();
            } else {
                s.clickedSlide = undefined;
                s.clickedIndex = undefined;
                return;
            }
            if (s.params.slideToClickedSlide && s.clickedIndex !== undefined && s.clickedIndex !== s.activeIndex) {
                var slideToIndex = s.clickedIndex,
                    realIndex,
                    duplicatedSlides,
                    slidesPerView = s.params.slidesPerView === 'auto' ? s.currentSlidesPerView() : s.params.slidesPerView;
                if (s.params.loop) {
                    if (s.animating) return;
                    realIndex = parseInt($(s.clickedSlide).attr('data-swiper-slide-index'), 10);
                    if (s.params.centeredSlides) {
                        if (slideToIndex < s.loopedSlides - slidesPerView / 2 || slideToIndex > s.slides.length - s.loopedSlides + slidesPerView / 2) {
                            s.fixLoop();
                            slideToIndex = s.wrapper.children('.' + s.params.slideClass + '[data-swiper-slide-index="' + realIndex + '"]:not(.' + s.params.slideDuplicateClass + ')').eq(0).index();
                            setTimeout(function () {
                                s.slideTo(slideToIndex);
                            }, 0);
                        } else {
                            s.slideTo(slideToIndex);
                        }
                    } else {
                        if (slideToIndex > s.slides.length - slidesPerView) {
                            s.fixLoop();
                            slideToIndex = s.wrapper.children('.' + s.params.slideClass + '[data-swiper-slide-index="' + realIndex + '"]:not(.' + s.params.slideDuplicateClass + ')').eq(0).index();
                            setTimeout(function () {
                                s.slideTo(slideToIndex);
                            }, 0);
                        } else {
                            s.slideTo(slideToIndex);
                        }
                    }
                } else {
                    s.slideTo(slideToIndex);
                }
            }
        };

        var isTouched,
            isMoved,
            allowTouchCallbacks,
            touchStartTime,
            isScrolling,
            currentTranslate,
            startTranslate,
            allowThresholdMove,

        // Form elements to match
        formElements = 'input, select, textarea, button, video',

        // Last click time
        lastClickTime = Date.now(),
            clickTimeout,

        //Velocities
        velocities = [],
            allowMomentumBounce;

        // Animating Flag
        s.animating = false;

        // Touches information
        s.touches = {
            startX: 0,
            startY: 0,
            currentX: 0,
            currentY: 0,
            diff: 0
        };

        // Touch handlers
        var isTouchEvent, startMoving;
        s.onTouchStart = function (e) {
            if (e.originalEvent) e = e.originalEvent;
            isTouchEvent = e.type === 'touchstart';
            if (!isTouchEvent && 'which' in e && e.which === 3) return;
            if (s.params.noSwiping && findElementInEvent(e, '.' + s.params.noSwipingClass)) {
                s.allowClick = true;
                return;
            }
            if (s.params.swipeHandler) {
                if (!findElementInEvent(e, s.params.swipeHandler)) return;
            }

            var startX = s.touches.currentX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
            var startY = s.touches.currentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;

            // Do NOT start if iOS edge swipe is detected. Otherwise iOS app (UIWebView) cannot swipe-to-go-back anymore
            if (s.device.ios && s.params.iOSEdgeSwipeDetection && startX <= s.params.iOSEdgeSwipeThreshold) {
                return;
            }

            isTouched = true;
            isMoved = false;
            allowTouchCallbacks = true;
            isScrolling = undefined;
            startMoving = undefined;
            s.touches.startX = startX;
            s.touches.startY = startY;
            touchStartTime = Date.now();
            s.allowClick = true;
            s.updateContainerSize();
            s.swipeDirection = undefined;
            if (s.params.threshold > 0) allowThresholdMove = false;
            if (e.type !== 'touchstart') {
                var preventDefault = true;
                if ($(e.target).is(formElements)) preventDefault = false;
                if (document.activeElement && $(document.activeElement).is(formElements)) {
                    document.activeElement.blur();
                }
                if (preventDefault) {
                    e.preventDefault();
                }
            }
            s.emit('onTouchStart', s, e);
        };

        s.onTouchMove = function (e) {
            if (e.originalEvent) e = e.originalEvent;
            if (isTouchEvent && e.type === 'mousemove') return;
            if (e.preventedByNestedSwiper) {
                s.touches.startX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                s.touches.startY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
                return;
            }
            if (s.params.onlyExternal) {
                // isMoved = true;
                s.allowClick = false;
                if (isTouched) {
                    s.touches.startX = s.touches.currentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                    s.touches.startY = s.touches.currentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
                    touchStartTime = Date.now();
                }
                return;
            }
            if (isTouchEvent && s.params.touchReleaseOnEdges && !s.params.loop) {
                if (!s.isHorizontal()) {
                    // Vertical
                    if (s.touches.currentY < s.touches.startY && s.translate <= s.maxTranslate() || s.touches.currentY > s.touches.startY && s.translate >= s.minTranslate()) {
                        return;
                    }
                } else {
                    if (s.touches.currentX < s.touches.startX && s.translate <= s.maxTranslate() || s.touches.currentX > s.touches.startX && s.translate >= s.minTranslate()) {
                        return;
                    }
                }
            }
            if (isTouchEvent && document.activeElement) {
                if (e.target === document.activeElement && $(e.target).is(formElements)) {
                    isMoved = true;
                    s.allowClick = false;
                    return;
                }
            }
            if (allowTouchCallbacks) {
                s.emit('onTouchMove', s, e);
            }
            if (e.targetTouches && e.targetTouches.length > 1) return;

            s.touches.currentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
            s.touches.currentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;

            if (typeof isScrolling === 'undefined') {
                var touchAngle;
                if (s.isHorizontal() && s.touches.currentY === s.touches.startY || !s.isHorizontal() && s.touches.currentX === s.touches.startX) {
                    isScrolling = false;
                } else {
                    touchAngle = Math.atan2(Math.abs(s.touches.currentY - s.touches.startY), Math.abs(s.touches.currentX - s.touches.startX)) * 180 / Math.PI;
                    isScrolling = s.isHorizontal() ? touchAngle > s.params.touchAngle : 90 - touchAngle > s.params.touchAngle;
                }
            }
            if (isScrolling) {
                s.emit('onTouchMoveOpposite', s, e);
            }
            if (typeof startMoving === 'undefined') {
                if (s.touches.currentX !== s.touches.startX || s.touches.currentY !== s.touches.startY) {
                    startMoving = true;
                }
            }
            if (!isTouched) return;
            if (isScrolling) {
                isTouched = false;
                return;
            }
            if (!startMoving) {
                return;
            }
            s.allowClick = false;
            s.emit('onSliderMove', s, e);
            e.preventDefault();
            if (s.params.touchMoveStopPropagation && !s.params.nested) {
                e.stopPropagation();
            }

            if (!isMoved) {
                if (params.loop) {
                    s.fixLoop();
                }
                startTranslate = s.getWrapperTranslate();
                s.setWrapperTransition(0);
                if (s.animating) {
                    s.wrapper.trigger('webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd');
                }
                if (s.params.autoplay && s.autoplaying) {
                    if (s.params.autoplayDisableOnInteraction) {
                        s.stopAutoplay();
                    } else {
                        s.pauseAutoplay();
                    }
                }
                allowMomentumBounce = false;
                //Grab Cursor
                if (s.params.grabCursor && (s.params.allowSwipeToNext === true || s.params.allowSwipeToPrev === true)) {
                    s.setGrabCursor(true);
                }
            }
            isMoved = true;

            var diff = s.touches.diff = s.isHorizontal() ? s.touches.currentX - s.touches.startX : s.touches.currentY - s.touches.startY;

            diff = diff * s.params.touchRatio;
            if (s.rtl) diff = -diff;

            s.swipeDirection = diff > 0 ? 'prev' : 'next';
            currentTranslate = diff + startTranslate;

            var disableParentSwiper = true;
            if (diff > 0 && currentTranslate > s.minTranslate()) {
                disableParentSwiper = false;
                if (s.params.resistance) currentTranslate = s.minTranslate() - 1 + Math.pow(-s.minTranslate() + startTranslate + diff, s.params.resistanceRatio);
            } else if (diff < 0 && currentTranslate < s.maxTranslate()) {
                disableParentSwiper = false;
                if (s.params.resistance) currentTranslate = s.maxTranslate() + 1 - Math.pow(s.maxTranslate() - startTranslate - diff, s.params.resistanceRatio);
            }

            if (disableParentSwiper) {
                e.preventedByNestedSwiper = true;
            }

            // Directions locks
            if (!s.params.allowSwipeToNext && s.swipeDirection === 'next' && currentTranslate < startTranslate) {
                currentTranslate = startTranslate;
            }
            if (!s.params.allowSwipeToPrev && s.swipeDirection === 'prev' && currentTranslate > startTranslate) {
                currentTranslate = startTranslate;
            }

            // Threshold
            if (s.params.threshold > 0) {
                if (Math.abs(diff) > s.params.threshold || allowThresholdMove) {
                    if (!allowThresholdMove) {
                        allowThresholdMove = true;
                        s.touches.startX = s.touches.currentX;
                        s.touches.startY = s.touches.currentY;
                        currentTranslate = startTranslate;
                        s.touches.diff = s.isHorizontal() ? s.touches.currentX - s.touches.startX : s.touches.currentY - s.touches.startY;
                        return;
                    }
                } else {
                    currentTranslate = startTranslate;
                    return;
                }
            }

            if (!s.params.followFinger) return;

            // Update active index in free mode
            if (s.params.freeMode || s.params.watchSlidesProgress) {
                s.updateActiveIndex();
            }
            if (s.params.freeMode) {
                //Velocity
                if (velocities.length === 0) {
                    velocities.push({
                        position: s.touches[s.isHorizontal() ? 'startX' : 'startY'],
                        time: touchStartTime
                    });
                }
                velocities.push({
                    position: s.touches[s.isHorizontal() ? 'currentX' : 'currentY'],
                    time: new window.Date().getTime()
                });
            }
            // Update progress
            s.updateProgress(currentTranslate);
            // Update translate
            s.setWrapperTranslate(currentTranslate);
        };
        s.onTouchEnd = function (e) {
            if (e.originalEvent) e = e.originalEvent;
            if (allowTouchCallbacks) {
                s.emit('onTouchEnd', s, e);
            }
            allowTouchCallbacks = false;
            if (!isTouched) return;
            //Return Grab Cursor
            if (s.params.grabCursor && isMoved && isTouched && (s.params.allowSwipeToNext === true || s.params.allowSwipeToPrev === true)) {
                s.setGrabCursor(false);
            }

            // Time diff
            var touchEndTime = Date.now();
            var timeDiff = touchEndTime - touchStartTime;

            // Tap, doubleTap, Click
            if (s.allowClick) {
                s.updateClickedSlide(e);
                s.emit('onTap', s, e);
                if (timeDiff < 300 && touchEndTime - lastClickTime > 300) {
                    if (clickTimeout) clearTimeout(clickTimeout);
                    clickTimeout = setTimeout(function () {
                        if (!s) return;
                        if (s.params.paginationHide && s.paginationContainer.length > 0 && !$(e.target).hasClass(s.params.bulletClass)) {
                            s.paginationContainer.toggleClass(s.params.paginationHiddenClass);
                        }
                        s.emit('onClick', s, e);
                    }, 300);
                }
                if (timeDiff < 300 && touchEndTime - lastClickTime < 300) {
                    if (clickTimeout) clearTimeout(clickTimeout);
                    s.emit('onDoubleTap', s, e);
                }
            }

            lastClickTime = Date.now();
            setTimeout(function () {
                if (s) s.allowClick = true;
            }, 0);

            if (!isTouched || !isMoved || !s.swipeDirection || s.touches.diff === 0 || currentTranslate === startTranslate) {
                isTouched = isMoved = false;
                return;
            }
            isTouched = isMoved = false;

            var currentPos;
            if (s.params.followFinger) {
                currentPos = s.rtl ? s.translate : -s.translate;
            } else {
                currentPos = -currentTranslate;
            }
            if (s.params.freeMode) {
                if (currentPos < -s.minTranslate()) {
                    s.slideTo(s.activeIndex);
                    return;
                } else if (currentPos > -s.maxTranslate()) {
                    if (s.slides.length < s.snapGrid.length) {
                        s.slideTo(s.snapGrid.length - 1);
                    } else {
                        s.slideTo(s.slides.length - 1);
                    }
                    return;
                }

                if (s.params.freeModeMomentum) {
                    if (velocities.length > 1) {
                        var lastMoveEvent = velocities.pop(),
                            velocityEvent = velocities.pop();

                        var distance = lastMoveEvent.position - velocityEvent.position;
                        var time = lastMoveEvent.time - velocityEvent.time;
                        s.velocity = distance / time;
                        s.velocity = s.velocity / 2;
                        if (Math.abs(s.velocity) < s.params.freeModeMinimumVelocity) {
                            s.velocity = 0;
                        }
                        // this implies that the user stopped moving a finger then released.
                        // There would be no events with distance zero, so the last event is stale.
                        if (time > 150 || new window.Date().getTime() - lastMoveEvent.time > 300) {
                            s.velocity = 0;
                        }
                    } else {
                        s.velocity = 0;
                    }
                    s.velocity = s.velocity * s.params.freeModeMomentumVelocityRatio;

                    velocities.length = 0;
                    var momentumDuration = 1000 * s.params.freeModeMomentumRatio;
                    var momentumDistance = s.velocity * momentumDuration;

                    var newPosition = s.translate + momentumDistance;
                    if (s.rtl) newPosition = -newPosition;
                    var doBounce = false;
                    var afterBouncePosition;
                    var bounceAmount = Math.abs(s.velocity) * 20 * s.params.freeModeMomentumBounceRatio;
                    if (newPosition < s.maxTranslate()) {
                        if (s.params.freeModeMomentumBounce) {
                            if (newPosition + s.maxTranslate() < -bounceAmount) {
                                newPosition = s.maxTranslate() - bounceAmount;
                            }
                            afterBouncePosition = s.maxTranslate();
                            doBounce = true;
                            allowMomentumBounce = true;
                        } else {
                            newPosition = s.maxTranslate();
                        }
                    } else if (newPosition > s.minTranslate()) {
                        if (s.params.freeModeMomentumBounce) {
                            if (newPosition - s.minTranslate() > bounceAmount) {
                                newPosition = s.minTranslate() + bounceAmount;
                            }
                            afterBouncePosition = s.minTranslate();
                            doBounce = true;
                            allowMomentumBounce = true;
                        } else {
                            newPosition = s.minTranslate();
                        }
                    } else if (s.params.freeModeSticky) {
                        var j = 0,
                            nextSlide;
                        for (j = 0; j < s.snapGrid.length; j += 1) {
                            if (s.snapGrid[j] > -newPosition) {
                                nextSlide = j;
                                break;
                            }
                        }
                        if (Math.abs(s.snapGrid[nextSlide] - newPosition) < Math.abs(s.snapGrid[nextSlide - 1] - newPosition) || s.swipeDirection === 'next') {
                            newPosition = s.snapGrid[nextSlide];
                        } else {
                            newPosition = s.snapGrid[nextSlide - 1];
                        }
                        if (!s.rtl) newPosition = -newPosition;
                    }
                    //Fix duration
                    if (s.velocity !== 0) {
                        if (s.rtl) {
                            momentumDuration = Math.abs((-newPosition - s.translate) / s.velocity);
                        } else {
                            momentumDuration = Math.abs((newPosition - s.translate) / s.velocity);
                        }
                    } else if (s.params.freeModeSticky) {
                        s.slideReset();
                        return;
                    }

                    if (s.params.freeModeMomentumBounce && doBounce) {
                        s.updateProgress(afterBouncePosition);
                        s.setWrapperTransition(momentumDuration);
                        s.setWrapperTranslate(newPosition);
                        s.onTransitionStart();
                        s.animating = true;
                        s.wrapper.transitionEnd(function () {
                            if (!s || !allowMomentumBounce) return;
                            s.emit('onMomentumBounce', s);

                            s.setWrapperTransition(s.params.speed);
                            s.setWrapperTranslate(afterBouncePosition);
                            s.wrapper.transitionEnd(function () {
                                if (!s) return;
                                s.onTransitionEnd();
                            });
                        });
                    } else if (s.velocity) {
                        s.updateProgress(newPosition);
                        s.setWrapperTransition(momentumDuration);
                        s.setWrapperTranslate(newPosition);
                        s.onTransitionStart();
                        if (!s.animating) {
                            s.animating = true;
                            s.wrapper.transitionEnd(function () {
                                if (!s) return;
                                s.onTransitionEnd();
                            });
                        }
                    } else {
                        s.updateProgress(newPosition);
                    }

                    s.updateActiveIndex();
                }
                if (!s.params.freeModeMomentum || timeDiff >= s.params.longSwipesMs) {
                    s.updateProgress();
                    s.updateActiveIndex();
                }
                return;
            }

            // Find current slide
            var i,
                stopIndex = 0,
                groupSize = s.slidesSizesGrid[0];
            for (i = 0; i < s.slidesGrid.length; i += s.params.slidesPerGroup) {
                if (typeof s.slidesGrid[i + s.params.slidesPerGroup] !== 'undefined') {
                    if (currentPos >= s.slidesGrid[i] && currentPos < s.slidesGrid[i + s.params.slidesPerGroup]) {
                        stopIndex = i;
                        groupSize = s.slidesGrid[i + s.params.slidesPerGroup] - s.slidesGrid[i];
                    }
                } else {
                    if (currentPos >= s.slidesGrid[i]) {
                        stopIndex = i;
                        groupSize = s.slidesGrid[s.slidesGrid.length - 1] - s.slidesGrid[s.slidesGrid.length - 2];
                    }
                }
            }

            // Find current slide size
            var ratio = (currentPos - s.slidesGrid[stopIndex]) / groupSize;

            if (timeDiff > s.params.longSwipesMs) {
                // Long touches
                if (!s.params.longSwipes) {
                    s.slideTo(s.activeIndex);
                    return;
                }
                if (s.swipeDirection === 'next') {
                    if (ratio >= s.params.longSwipesRatio) s.slideTo(stopIndex + s.params.slidesPerGroup);else s.slideTo(stopIndex);
                }
                if (s.swipeDirection === 'prev') {
                    if (ratio > 1 - s.params.longSwipesRatio) s.slideTo(stopIndex + s.params.slidesPerGroup);else s.slideTo(stopIndex);
                }
            } else {
                // Short swipes
                if (!s.params.shortSwipes) {
                    s.slideTo(s.activeIndex);
                    return;
                }
                if (s.swipeDirection === 'next') {
                    s.slideTo(stopIndex + s.params.slidesPerGroup);
                }
                if (s.swipeDirection === 'prev') {
                    s.slideTo(stopIndex);
                }
            }
        };
        /*=========================
          Transitions
          ===========================*/
        s._slideTo = function (slideIndex, speed) {
            return s.slideTo(slideIndex, speed, true, true);
        };
        s.slideTo = function (slideIndex, speed, runCallbacks, internal) {
            if (typeof runCallbacks === 'undefined') runCallbacks = true;
            if (typeof slideIndex === 'undefined') slideIndex = 0;
            if (slideIndex < 0) slideIndex = 0;
            s.snapIndex = Math.floor(slideIndex / s.params.slidesPerGroup);
            if (s.snapIndex >= s.snapGrid.length) s.snapIndex = s.snapGrid.length - 1;

            var translate = -s.snapGrid[s.snapIndex];
            // Stop autoplay
            if (s.params.autoplay && s.autoplaying) {
                if (internal || !s.params.autoplayDisableOnInteraction) {
                    s.pauseAutoplay(speed);
                } else {
                    s.stopAutoplay();
                }
            }
            // Update progress
            s.updateProgress(translate);

            // Normalize slideIndex
            if (s.params.normalizeSlideIndex) {
                for (var i = 0; i < s.slidesGrid.length; i++) {
                    if (-Math.floor(translate * 100) >= Math.floor(s.slidesGrid[i] * 100)) {
                        slideIndex = i;
                    }
                }
            }

            // Directions locks
            if (!s.params.allowSwipeToNext && translate < s.translate && translate < s.minTranslate()) {
                return false;
            }
            if (!s.params.allowSwipeToPrev && translate > s.translate && translate > s.maxTranslate()) {
                if ((s.activeIndex || 0) !== slideIndex) return false;
            }

            // Update Index
            if (typeof speed === 'undefined') speed = s.params.speed;
            s.previousIndex = s.activeIndex || 0;
            s.activeIndex = slideIndex;
            s.updateRealIndex();
            if (s.rtl && -translate === s.translate || !s.rtl && translate === s.translate) {
                // Update Height
                if (s.params.autoHeight) {
                    s.updateAutoHeight();
                }
                s.updateClasses();
                if (s.params.effect !== 'slide') {
                    s.setWrapperTranslate(translate);
                }
                return false;
            }
            s.updateClasses();
            s.onTransitionStart(runCallbacks);

            if (speed === 0 || s.browser.lteIE9) {
                s.setWrapperTranslate(translate);
                s.setWrapperTransition(0);
                s.onTransitionEnd(runCallbacks);
            } else {
                s.setWrapperTranslate(translate);
                s.setWrapperTransition(speed);
                if (!s.animating) {
                    s.animating = true;
                    s.wrapper.transitionEnd(function () {
                        if (!s) return;
                        s.onTransitionEnd(runCallbacks);
                    });
                }
            }

            return true;
        };

        s.onTransitionStart = function (runCallbacks) {
            if (typeof runCallbacks === 'undefined') runCallbacks = true;
            if (s.params.autoHeight) {
                s.updateAutoHeight();
            }
            if (s.lazy) s.lazy.onTransitionStart();
            if (runCallbacks) {
                s.emit('onTransitionStart', s);
                if (s.activeIndex !== s.previousIndex) {
                    s.emit('onSlideChangeStart', s);
                    if (s.activeIndex > s.previousIndex) {
                        s.emit('onSlideNextStart', s);
                    } else {
                        s.emit('onSlidePrevStart', s);
                    }
                }
            }
        };
        s.onTransitionEnd = function (runCallbacks) {
            s.animating = false;
            s.setWrapperTransition(0);
            if (typeof runCallbacks === 'undefined') runCallbacks = true;
            if (s.lazy) s.lazy.onTransitionEnd();
            if (runCallbacks) {
                s.emit('onTransitionEnd', s);
                if (s.activeIndex !== s.previousIndex) {
                    s.emit('onSlideChangeEnd', s);
                    if (s.activeIndex > s.previousIndex) {
                        s.emit('onSlideNextEnd', s);
                    } else {
                        s.emit('onSlidePrevEnd', s);
                    }
                }
            }
            if (s.params.history && s.history) {
                s.history.setHistory(s.params.history, s.activeIndex);
            }
            if (s.params.hashnav && s.hashnav) {
                s.hashnav.setHash();
            }
        };
        s.slideNext = function (runCallbacks, speed, internal) {
            if (s.params.loop) {
                if (s.animating) return false;
                s.fixLoop();
                var clientLeft = s.container[0].clientLeft;
                return s.slideTo(s.activeIndex + s.params.slidesPerGroup, speed, runCallbacks, internal);
            } else return s.slideTo(s.activeIndex + s.params.slidesPerGroup, speed, runCallbacks, internal);
        };
        s._slideNext = function (speed) {
            return s.slideNext(true, speed, true);
        };
        s.slidePrev = function (runCallbacks, speed, internal) {
            if (s.params.loop) {
                if (s.animating) return false;
                s.fixLoop();
                var clientLeft = s.container[0].clientLeft;
                return s.slideTo(s.activeIndex - 1, speed, runCallbacks, internal);
            } else return s.slideTo(s.activeIndex - 1, speed, runCallbacks, internal);
        };
        s._slidePrev = function (speed) {
            return s.slidePrev(true, speed, true);
        };
        s.slideReset = function (runCallbacks, speed, internal) {
            return s.slideTo(s.activeIndex, speed, runCallbacks);
        };

        s.disableTouchControl = function () {
            s.params.onlyExternal = true;
            return true;
        };
        s.enableTouchControl = function () {
            s.params.onlyExternal = false;
            return true;
        };

        /*=========================
          Translate/transition helpers
          ===========================*/
        s.setWrapperTransition = function (duration, byController) {
            s.wrapper.transition(duration);
            if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
                s.effects[s.params.effect].setTransition(duration);
            }
            if (s.params.parallax && s.parallax) {
                s.parallax.setTransition(duration);
            }
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.setTransition(duration);
            }
            if (s.params.control && s.controller) {
                s.controller.setTransition(duration, byController);
            }
            s.emit('onSetTransition', s, duration);
        };
        s.setWrapperTranslate = function (translate, updateActiveIndex, byController) {
            var x = 0,
                y = 0,
                z = 0;
            if (s.isHorizontal()) {
                x = s.rtl ? -translate : translate;
            } else {
                y = translate;
            }

            if (s.params.roundLengths) {
                x = round(x);
                y = round(y);
            }

            if (!s.params.virtualTranslate) {
                if (s.support.transforms3d) s.wrapper.transform('translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)');else s.wrapper.transform('translate(' + x + 'px, ' + y + 'px)');
            }

            s.translate = s.isHorizontal() ? x : y;

            // Check if we need to update progress
            var progress;
            var translatesDiff = s.maxTranslate() - s.minTranslate();
            if (translatesDiff === 0) {
                progress = 0;
            } else {
                progress = (translate - s.minTranslate()) / translatesDiff;
            }
            if (progress !== s.progress) {
                s.updateProgress(translate);
            }

            if (updateActiveIndex) s.updateActiveIndex();
            if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
                s.effects[s.params.effect].setTranslate(s.translate);
            }
            if (s.params.parallax && s.parallax) {
                s.parallax.setTranslate(s.translate);
            }
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.setTranslate(s.translate);
            }
            if (s.params.control && s.controller) {
                s.controller.setTranslate(s.translate, byController);
            }
            s.emit('onSetTranslate', s, s.translate);
        };

        s.getTranslate = function (el, axis) {
            var matrix, curTransform, curStyle, transformMatrix;

            // automatic axis detection
            if (typeof axis === 'undefined') {
                axis = 'x';
            }

            if (s.params.virtualTranslate) {
                return s.rtl ? -s.translate : s.translate;
            }

            curStyle = window.getComputedStyle(el, null);
            if (window.WebKitCSSMatrix) {
                curTransform = curStyle.transform || curStyle.webkitTransform;
                if (curTransform.split(',').length > 6) {
                    curTransform = curTransform.split(', ').map(function (a) {
                        return a.replace(',', '.');
                    }).join(', ');
                }
                // Some old versions of Webkit choke when 'none' is passed; pass
                // empty string instead in this case
                transformMatrix = new window.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
            } else {
                transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
                matrix = transformMatrix.toString().split(',');
            }

            if (axis === 'x') {
                //Latest Chrome and webkits Fix
                if (window.WebKitCSSMatrix) curTransform = transformMatrix.m41;
                //Crazy IE10 Matrix
                else if (matrix.length === 16) curTransform = parseFloat(matrix[12]);
                    //Normal Browsers
                    else curTransform = parseFloat(matrix[4]);
            }
            if (axis === 'y') {
                //Latest Chrome and webkits Fix
                if (window.WebKitCSSMatrix) curTransform = transformMatrix.m42;
                //Crazy IE10 Matrix
                else if (matrix.length === 16) curTransform = parseFloat(matrix[13]);
                    //Normal Browsers
                    else curTransform = parseFloat(matrix[5]);
            }
            if (s.rtl && curTransform) curTransform = -curTransform;
            return curTransform || 0;
        };
        s.getWrapperTranslate = function (axis) {
            if (typeof axis === 'undefined') {
                axis = s.isHorizontal() ? 'x' : 'y';
            }
            return s.getTranslate(s.wrapper[0], axis);
        };

        /*=========================
          Observer
          ===========================*/
        s.observers = [];
        function initObserver(target, options) {
            options = options || {};
            // create an observer instance
            var ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
            var observer = new ObserverFunc(function (mutations) {
                mutations.forEach(function (mutation) {
                    s.onResize(true);
                    s.emit('onObserverUpdate', s, mutation);
                });
            });

            observer.observe(target, {
                attributes: typeof options.attributes === 'undefined' ? true : options.attributes,
                childList: typeof options.childList === 'undefined' ? true : options.childList,
                characterData: typeof options.characterData === 'undefined' ? true : options.characterData
            });

            s.observers.push(observer);
        }
        s.initObservers = function () {
            if (s.params.observeParents) {
                var containerParents = s.container.parents();
                for (var i = 0; i < containerParents.length; i++) {
                    initObserver(containerParents[i]);
                }
            }

            // Observe container
            initObserver(s.container[0], { childList: false });

            // Observe wrapper
            initObserver(s.wrapper[0], { attributes: false });
        };
        s.disconnectObservers = function () {
            for (var i = 0; i < s.observers.length; i++) {
                s.observers[i].disconnect();
            }
            s.observers = [];
        };
        /*=========================
          Loop
          ===========================*/
        // Create looped slides
        s.createLoop = function () {
            // Remove duplicated slides
            s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass).remove();

            var slides = s.wrapper.children('.' + s.params.slideClass);

            if (s.params.slidesPerView === 'auto' && !s.params.loopedSlides) s.params.loopedSlides = slides.length;

            s.loopedSlides = parseInt(s.params.loopedSlides || s.params.slidesPerView, 10);
            s.loopedSlides = s.loopedSlides + s.params.loopAdditionalSlides;
            if (s.loopedSlides > slides.length) {
                s.loopedSlides = slides.length;
            }

            var prependSlides = [],
                appendSlides = [],
                i;
            slides.each(function (index, el) {
                var slide = $(this);
                if (index < s.loopedSlides) appendSlides.push(el);
                if (index < slides.length && index >= slides.length - s.loopedSlides) prependSlides.push(el);
                slide.attr('data-swiper-slide-index', index);
            });
            for (i = 0; i < appendSlides.length; i++) {
                s.wrapper.append($(appendSlides[i].cloneNode(true)).addClass(s.params.slideDuplicateClass));
            }
            for (i = prependSlides.length - 1; i >= 0; i--) {
                s.wrapper.prepend($(prependSlides[i].cloneNode(true)).addClass(s.params.slideDuplicateClass));
            }
        };
        s.destroyLoop = function () {
            s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass).remove();
            s.slides.removeAttr('data-swiper-slide-index');
        };
        s.reLoop = function (updatePosition) {
            var oldIndex = s.activeIndex - s.loopedSlides;
            s.destroyLoop();
            s.createLoop();
            s.updateSlidesSize();
            if (updatePosition) {
                s.slideTo(oldIndex + s.loopedSlides, 0, false);
            }
        };
        s.fixLoop = function () {
            var newIndex;
            //Fix For Negative Oversliding
            if (s.activeIndex < s.loopedSlides) {
                newIndex = s.slides.length - s.loopedSlides * 3 + s.activeIndex;
                newIndex = newIndex + s.loopedSlides;
                s.slideTo(newIndex, 0, false, true);
            }
            //Fix For Positive Oversliding
            else if (s.params.slidesPerView === 'auto' && s.activeIndex >= s.loopedSlides * 2 || s.activeIndex > s.slides.length - s.params.slidesPerView * 2) {
                    newIndex = -s.slides.length + s.activeIndex + s.loopedSlides;
                    newIndex = newIndex + s.loopedSlides;
                    s.slideTo(newIndex, 0, false, true);
                }
        };
        /*=========================
          Append/Prepend/Remove Slides
          ===========================*/
        s.appendSlide = function (slides) {
            if (s.params.loop) {
                s.destroyLoop();
            }
            if ((typeof slides === 'undefined' ? 'undefined' : _typeof(slides)) === 'object' && slides.length) {
                for (var i = 0; i < slides.length; i++) {
                    if (slides[i]) s.wrapper.append(slides[i]);
                }
            } else {
                s.wrapper.append(slides);
            }
            if (s.params.loop) {
                s.createLoop();
            }
            if (!(s.params.observer && s.support.observer)) {
                s.update(true);
            }
        };
        s.prependSlide = function (slides) {
            if (s.params.loop) {
                s.destroyLoop();
            }
            var newActiveIndex = s.activeIndex + 1;
            if ((typeof slides === 'undefined' ? 'undefined' : _typeof(slides)) === 'object' && slides.length) {
                for (var i = 0; i < slides.length; i++) {
                    if (slides[i]) s.wrapper.prepend(slides[i]);
                }
                newActiveIndex = s.activeIndex + slides.length;
            } else {
                s.wrapper.prepend(slides);
            }
            if (s.params.loop) {
                s.createLoop();
            }
            if (!(s.params.observer && s.support.observer)) {
                s.update(true);
            }
            s.slideTo(newActiveIndex, 0, false);
        };
        s.removeSlide = function (slidesIndexes) {
            if (s.params.loop) {
                s.destroyLoop();
                s.slides = s.wrapper.children('.' + s.params.slideClass);
            }
            var newActiveIndex = s.activeIndex,
                indexToRemove;
            if ((typeof slidesIndexes === 'undefined' ? 'undefined' : _typeof(slidesIndexes)) === 'object' && slidesIndexes.length) {
                for (var i = 0; i < slidesIndexes.length; i++) {
                    indexToRemove = slidesIndexes[i];
                    if (s.slides[indexToRemove]) s.slides.eq(indexToRemove).remove();
                    if (indexToRemove < newActiveIndex) newActiveIndex--;
                }
                newActiveIndex = Math.max(newActiveIndex, 0);
            } else {
                indexToRemove = slidesIndexes;
                if (s.slides[indexToRemove]) s.slides.eq(indexToRemove).remove();
                if (indexToRemove < newActiveIndex) newActiveIndex--;
                newActiveIndex = Math.max(newActiveIndex, 0);
            }

            if (s.params.loop) {
                s.createLoop();
            }

            if (!(s.params.observer && s.support.observer)) {
                s.update(true);
            }
            if (s.params.loop) {
                s.slideTo(newActiveIndex + s.loopedSlides, 0, false);
            } else {
                s.slideTo(newActiveIndex, 0, false);
            }
        };
        s.removeAllSlides = function () {
            var slidesIndexes = [];
            for (var i = 0; i < s.slides.length; i++) {
                slidesIndexes.push(i);
            }
            s.removeSlide(slidesIndexes);
        };

        /*=========================
          Effects
          ===========================*/
        s.effects = {
            fade: {
                setTranslate: function setTranslate() {
                    for (var i = 0; i < s.slides.length; i++) {
                        var slide = s.slides.eq(i);
                        var offset = slide[0].swiperSlideOffset;
                        var tx = -offset;
                        if (!s.params.virtualTranslate) tx = tx - s.translate;
                        var ty = 0;
                        if (!s.isHorizontal()) {
                            ty = tx;
                            tx = 0;
                        }
                        var slideOpacity = s.params.fade.crossFade ? Math.max(1 - Math.abs(slide[0].progress), 0) : 1 + Math.min(Math.max(slide[0].progress, -1), 0);
                        slide.css({
                            opacity: slideOpacity
                        }).transform('translate3d(' + tx + 'px, ' + ty + 'px, 0px)');
                    }
                },
                setTransition: function setTransition(duration) {
                    s.slides.transition(duration);
                    if (s.params.virtualTranslate && duration !== 0) {
                        var eventTriggered = false;
                        s.slides.transitionEnd(function () {
                            if (eventTriggered) return;
                            if (!s) return;
                            eventTriggered = true;
                            s.animating = false;
                            var triggerEvents = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'];
                            for (var i = 0; i < triggerEvents.length; i++) {
                                s.wrapper.trigger(triggerEvents[i]);
                            }
                        });
                    }
                }
            },
            flip: {
                setTranslate: function setTranslate() {
                    for (var i = 0; i < s.slides.length; i++) {
                        var slide = s.slides.eq(i);
                        var progress = slide[0].progress;
                        if (s.params.flip.limitRotation) {
                            progress = Math.max(Math.min(slide[0].progress, 1), -1);
                        }
                        var offset = slide[0].swiperSlideOffset;
                        var rotate = -180 * progress,
                            rotateY = rotate,
                            rotateX = 0,
                            tx = -offset,
                            ty = 0;
                        if (!s.isHorizontal()) {
                            ty = tx;
                            tx = 0;
                            rotateX = -rotateY;
                            rotateY = 0;
                        } else if (s.rtl) {
                            rotateY = -rotateY;
                        }

                        slide[0].style.zIndex = -Math.abs(Math.round(progress)) + s.slides.length;

                        if (s.params.flip.slideShadows) {
                            //Set shadows
                            var shadowBefore = s.isHorizontal() ? slide.find('.swiper-slide-shadow-left') : slide.find('.swiper-slide-shadow-top');
                            var shadowAfter = s.isHorizontal() ? slide.find('.swiper-slide-shadow-right') : slide.find('.swiper-slide-shadow-bottom');
                            if (shadowBefore.length === 0) {
                                shadowBefore = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'left' : 'top') + '"></div>');
                                slide.append(shadowBefore);
                            }
                            if (shadowAfter.length === 0) {
                                shadowAfter = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'right' : 'bottom') + '"></div>');
                                slide.append(shadowAfter);
                            }
                            if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
                            if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
                        }

                        slide.transform('translate3d(' + tx + 'px, ' + ty + 'px, 0px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)');
                    }
                },
                setTransition: function setTransition(duration) {
                    s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
                    if (s.params.virtualTranslate && duration !== 0) {
                        var eventTriggered = false;
                        s.slides.eq(s.activeIndex).transitionEnd(function () {
                            if (eventTriggered) return;
                            if (!s) return;
                            if (!$(this).hasClass(s.params.slideActiveClass)) return;
                            eventTriggered = true;
                            s.animating = false;
                            var triggerEvents = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'];
                            for (var i = 0; i < triggerEvents.length; i++) {
                                s.wrapper.trigger(triggerEvents[i]);
                            }
                        });
                    }
                }
            },
            cube: {
                setTranslate: function setTranslate() {
                    var wrapperRotate = 0,
                        cubeShadow;
                    if (s.params.cube.shadow) {
                        if (s.isHorizontal()) {
                            cubeShadow = s.wrapper.find('.swiper-cube-shadow');
                            if (cubeShadow.length === 0) {
                                cubeShadow = $('<div class="swiper-cube-shadow"></div>');
                                s.wrapper.append(cubeShadow);
                            }
                            cubeShadow.css({ height: s.width + 'px' });
                        } else {
                            cubeShadow = s.container.find('.swiper-cube-shadow');
                            if (cubeShadow.length === 0) {
                                cubeShadow = $('<div class="swiper-cube-shadow"></div>');
                                s.container.append(cubeShadow);
                            }
                        }
                    }
                    for (var i = 0; i < s.slides.length; i++) {
                        var slide = s.slides.eq(i);
                        var slideAngle = i * 90;
                        var round = Math.floor(slideAngle / 360);
                        if (s.rtl) {
                            slideAngle = -slideAngle;
                            round = Math.floor(-slideAngle / 360);
                        }
                        var progress = Math.max(Math.min(slide[0].progress, 1), -1);
                        var tx = 0,
                            ty = 0,
                            tz = 0;
                        if (i % 4 === 0) {
                            tx = -round * 4 * s.size;
                            tz = 0;
                        } else if ((i - 1) % 4 === 0) {
                            tx = 0;
                            tz = -round * 4 * s.size;
                        } else if ((i - 2) % 4 === 0) {
                            tx = s.size + round * 4 * s.size;
                            tz = s.size;
                        } else if ((i - 3) % 4 === 0) {
                            tx = -s.size;
                            tz = 3 * s.size + s.size * 4 * round;
                        }
                        if (s.rtl) {
                            tx = -tx;
                        }

                        if (!s.isHorizontal()) {
                            ty = tx;
                            tx = 0;
                        }

                        var transform = 'rotateX(' + (s.isHorizontal() ? 0 : -slideAngle) + 'deg) rotateY(' + (s.isHorizontal() ? slideAngle : 0) + 'deg) translate3d(' + tx + 'px, ' + ty + 'px, ' + tz + 'px)';
                        if (progress <= 1 && progress > -1) {
                            wrapperRotate = i * 90 + progress * 90;
                            if (s.rtl) wrapperRotate = -i * 90 - progress * 90;
                        }
                        slide.transform(transform);
                        if (s.params.cube.slideShadows) {
                            //Set shadows
                            var shadowBefore = s.isHorizontal() ? slide.find('.swiper-slide-shadow-left') : slide.find('.swiper-slide-shadow-top');
                            var shadowAfter = s.isHorizontal() ? slide.find('.swiper-slide-shadow-right') : slide.find('.swiper-slide-shadow-bottom');
                            if (shadowBefore.length === 0) {
                                shadowBefore = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'left' : 'top') + '"></div>');
                                slide.append(shadowBefore);
                            }
                            if (shadowAfter.length === 0) {
                                shadowAfter = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'right' : 'bottom') + '"></div>');
                                slide.append(shadowAfter);
                            }
                            if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
                            if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
                        }
                    }
                    s.wrapper.css({
                        '-webkit-transform-origin': '50% 50% -' + s.size / 2 + 'px',
                        '-moz-transform-origin': '50% 50% -' + s.size / 2 + 'px',
                        '-ms-transform-origin': '50% 50% -' + s.size / 2 + 'px',
                        'transform-origin': '50% 50% -' + s.size / 2 + 'px'
                    });

                    if (s.params.cube.shadow) {
                        if (s.isHorizontal()) {
                            cubeShadow.transform('translate3d(0px, ' + (s.width / 2 + s.params.cube.shadowOffset) + 'px, ' + -s.width / 2 + 'px) rotateX(90deg) rotateZ(0deg) scale(' + s.params.cube.shadowScale + ')');
                        } else {
                            var shadowAngle = Math.abs(wrapperRotate) - Math.floor(Math.abs(wrapperRotate) / 90) * 90;
                            var multiplier = 1.5 - (Math.sin(shadowAngle * 2 * Math.PI / 360) / 2 + Math.cos(shadowAngle * 2 * Math.PI / 360) / 2);
                            var scale1 = s.params.cube.shadowScale,
                                scale2 = s.params.cube.shadowScale / multiplier,
                                offset = s.params.cube.shadowOffset;
                            cubeShadow.transform('scale3d(' + scale1 + ', 1, ' + scale2 + ') translate3d(0px, ' + (s.height / 2 + offset) + 'px, ' + -s.height / 2 / scale2 + 'px) rotateX(-90deg)');
                        }
                    }
                    var zFactor = s.isSafari || s.isUiWebView ? -s.size / 2 : 0;
                    s.wrapper.transform('translate3d(0px,0,' + zFactor + 'px) rotateX(' + (s.isHorizontal() ? 0 : wrapperRotate) + 'deg) rotateY(' + (s.isHorizontal() ? -wrapperRotate : 0) + 'deg)');
                },
                setTransition: function setTransition(duration) {
                    s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
                    if (s.params.cube.shadow && !s.isHorizontal()) {
                        s.container.find('.swiper-cube-shadow').transition(duration);
                    }
                }
            },
            coverflow: {
                setTranslate: function setTranslate() {
                    var transform = s.translate;
                    var center = s.isHorizontal() ? -transform + s.width / 2 : -transform + s.height / 2;
                    var rotate = s.isHorizontal() ? s.params.coverflow.rotate : -s.params.coverflow.rotate;
                    var translate = s.params.coverflow.depth;
                    //Each slide offset from center
                    for (var i = 0, length = s.slides.length; i < length; i++) {
                        var slide = s.slides.eq(i);
                        var slideSize = s.slidesSizesGrid[i];
                        var slideOffset = slide[0].swiperSlideOffset;
                        var offsetMultiplier = (center - slideOffset - slideSize / 2) / slideSize * s.params.coverflow.modifier;

                        var rotateY = s.isHorizontal() ? rotate * offsetMultiplier : 0;
                        var rotateX = s.isHorizontal() ? 0 : rotate * offsetMultiplier;
                        // var rotateZ = 0
                        var translateZ = -translate * Math.abs(offsetMultiplier);

                        var translateY = s.isHorizontal() ? 0 : s.params.coverflow.stretch * offsetMultiplier;
                        var translateX = s.isHorizontal() ? s.params.coverflow.stretch * offsetMultiplier : 0;

                        //Fix for ultra small values
                        if (Math.abs(translateX) < 0.001) translateX = 0;
                        if (Math.abs(translateY) < 0.001) translateY = 0;
                        if (Math.abs(translateZ) < 0.001) translateZ = 0;
                        if (Math.abs(rotateY) < 0.001) rotateY = 0;
                        if (Math.abs(rotateX) < 0.001) rotateX = 0;

                        var slideTransform = 'translate3d(' + translateX + 'px,' + translateY + 'px,' + translateZ + 'px)  rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';

                        slide.transform(slideTransform);
                        slide[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
                        if (s.params.coverflow.slideShadows) {
                            //Set shadows
                            var shadowBefore = s.isHorizontal() ? slide.find('.swiper-slide-shadow-left') : slide.find('.swiper-slide-shadow-top');
                            var shadowAfter = s.isHorizontal() ? slide.find('.swiper-slide-shadow-right') : slide.find('.swiper-slide-shadow-bottom');
                            if (shadowBefore.length === 0) {
                                shadowBefore = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'left' : 'top') + '"></div>');
                                slide.append(shadowBefore);
                            }
                            if (shadowAfter.length === 0) {
                                shadowAfter = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'right' : 'bottom') + '"></div>');
                                slide.append(shadowAfter);
                            }
                            if (shadowBefore.length) shadowBefore[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
                            if (shadowAfter.length) shadowAfter[0].style.opacity = -offsetMultiplier > 0 ? -offsetMultiplier : 0;
                        }
                    }

                    //Set correct perspective for IE10
                    if (s.browser.ie) {
                        var ws = s.wrapper[0].style;
                        ws.perspectiveOrigin = center + 'px 50%';
                    }
                },
                setTransition: function setTransition(duration) {
                    s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
                }
            }
        };

        /*=========================
          Images Lazy Loading
          ===========================*/
        s.lazy = {
            initialImageLoaded: false,
            loadImageInSlide: function loadImageInSlide(index, loadInDuplicate) {
                if (typeof index === 'undefined') return;
                if (typeof loadInDuplicate === 'undefined') loadInDuplicate = true;
                if (s.slides.length === 0) return;

                var slide = s.slides.eq(index);
                var img = slide.find('.' + s.params.lazyLoadingClass + ':not(.' + s.params.lazyStatusLoadedClass + '):not(.' + s.params.lazyStatusLoadingClass + ')');
                if (slide.hasClass(s.params.lazyLoadingClass) && !slide.hasClass(s.params.lazyStatusLoadedClass) && !slide.hasClass(s.params.lazyStatusLoadingClass)) {
                    img = img.add(slide[0]);
                }
                if (img.length === 0) return;

                img.each(function () {
                    var _img = $(this);
                    _img.addClass(s.params.lazyStatusLoadingClass);
                    var background = _img.attr('data-background');
                    var src = _img.attr('data-src'),
                        srcset = _img.attr('data-srcset'),
                        sizes = _img.attr('data-sizes');
                    s.loadImage(_img[0], src || background, srcset, sizes, false, function () {
                        if (typeof s === 'undefined' || s === null || !s) return;
                        if (background) {
                            _img.css('background-image', 'url("' + background + '")');
                            _img.removeAttr('data-background');
                        } else {
                            if (srcset) {
                                _img.attr('srcset', srcset);
                                _img.removeAttr('data-srcset');
                            }
                            if (sizes) {
                                _img.attr('sizes', sizes);
                                _img.removeAttr('data-sizes');
                            }
                            if (src) {
                                _img.attr('src', src);
                                _img.removeAttr('data-src');
                            }
                        }

                        _img.addClass(s.params.lazyStatusLoadedClass).removeClass(s.params.lazyStatusLoadingClass);
                        slide.find('.' + s.params.lazyPreloaderClass + ', .' + s.params.preloaderClass).remove();
                        if (s.params.loop && loadInDuplicate) {
                            var slideOriginalIndex = slide.attr('data-swiper-slide-index');
                            if (slide.hasClass(s.params.slideDuplicateClass)) {
                                var originalSlide = s.wrapper.children('[data-swiper-slide-index="' + slideOriginalIndex + '"]:not(.' + s.params.slideDuplicateClass + ')');
                                s.lazy.loadImageInSlide(originalSlide.index(), false);
                            } else {
                                var duplicatedSlide = s.wrapper.children('.' + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + slideOriginalIndex + '"]');
                                s.lazy.loadImageInSlide(duplicatedSlide.index(), false);
                            }
                        }
                        s.emit('onLazyImageReady', s, slide[0], _img[0]);
                    });

                    s.emit('onLazyImageLoad', s, slide[0], _img[0]);
                });
            },
            load: function load() {
                var i;
                var slidesPerView = s.params.slidesPerView;
                if (slidesPerView === 'auto') {
                    slidesPerView = 0;
                }
                if (!s.lazy.initialImageLoaded) s.lazy.initialImageLoaded = true;
                if (s.params.watchSlidesVisibility) {
                    s.wrapper.children('.' + s.params.slideVisibleClass).each(function () {
                        s.lazy.loadImageInSlide($(this).index());
                    });
                } else {
                    if (slidesPerView > 1) {
                        for (i = s.activeIndex; i < s.activeIndex + slidesPerView; i++) {
                            if (s.slides[i]) s.lazy.loadImageInSlide(i);
                        }
                    } else {
                        s.lazy.loadImageInSlide(s.activeIndex);
                    }
                }
                if (s.params.lazyLoadingInPrevNext) {
                    if (slidesPerView > 1 || s.params.lazyLoadingInPrevNextAmount && s.params.lazyLoadingInPrevNextAmount > 1) {
                        var amount = s.params.lazyLoadingInPrevNextAmount;
                        var spv = slidesPerView;
                        var maxIndex = Math.min(s.activeIndex + spv + Math.max(amount, spv), s.slides.length);
                        var minIndex = Math.max(s.activeIndex - Math.max(spv, amount), 0);
                        // Next Slides
                        for (i = s.activeIndex + slidesPerView; i < maxIndex; i++) {
                            if (s.slides[i]) s.lazy.loadImageInSlide(i);
                        }
                        // Prev Slides
                        for (i = minIndex; i < s.activeIndex; i++) {
                            if (s.slides[i]) s.lazy.loadImageInSlide(i);
                        }
                    } else {
                        var nextSlide = s.wrapper.children('.' + s.params.slideNextClass);
                        if (nextSlide.length > 0) s.lazy.loadImageInSlide(nextSlide.index());

                        var prevSlide = s.wrapper.children('.' + s.params.slidePrevClass);
                        if (prevSlide.length > 0) s.lazy.loadImageInSlide(prevSlide.index());
                    }
                }
            },
            onTransitionStart: function onTransitionStart() {
                if (s.params.lazyLoading) {
                    if (s.params.lazyLoadingOnTransitionStart || !s.params.lazyLoadingOnTransitionStart && !s.lazy.initialImageLoaded) {
                        s.lazy.load();
                    }
                }
            },
            onTransitionEnd: function onTransitionEnd() {
                if (s.params.lazyLoading && !s.params.lazyLoadingOnTransitionStart) {
                    s.lazy.load();
                }
            }
        };

        /*=========================
          Scrollbar
          ===========================*/
        s.scrollbar = {
            isTouched: false,
            setDragPosition: function setDragPosition(e) {
                var sb = s.scrollbar;
                var x = 0,
                    y = 0;
                var translate;
                var pointerPosition = s.isHorizontal() ? e.type === 'touchstart' || e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX || e.clientX : e.type === 'touchstart' || e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY || e.clientY;
                var position = pointerPosition - sb.track.offset()[s.isHorizontal() ? 'left' : 'top'] - sb.dragSize / 2;
                var positionMin = -s.minTranslate() * sb.moveDivider;
                var positionMax = -s.maxTranslate() * sb.moveDivider;
                if (position < positionMin) {
                    position = positionMin;
                } else if (position > positionMax) {
                    position = positionMax;
                }
                position = -position / sb.moveDivider;
                s.updateProgress(position);
                s.setWrapperTranslate(position, true);
            },
            dragStart: function dragStart(e) {
                var sb = s.scrollbar;
                sb.isTouched = true;
                e.preventDefault();
                e.stopPropagation();

                sb.setDragPosition(e);
                clearTimeout(sb.dragTimeout);

                sb.track.transition(0);
                if (s.params.scrollbarHide) {
                    sb.track.css('opacity', 1);
                }
                s.wrapper.transition(100);
                sb.drag.transition(100);
                s.emit('onScrollbarDragStart', s);
            },
            dragMove: function dragMove(e) {
                var sb = s.scrollbar;
                if (!sb.isTouched) return;
                if (e.preventDefault) e.preventDefault();else e.returnValue = false;
                sb.setDragPosition(e);
                s.wrapper.transition(0);
                sb.track.transition(0);
                sb.drag.transition(0);
                s.emit('onScrollbarDragMove', s);
            },
            dragEnd: function dragEnd(e) {
                var sb = s.scrollbar;
                if (!sb.isTouched) return;
                sb.isTouched = false;
                if (s.params.scrollbarHide) {
                    clearTimeout(sb.dragTimeout);
                    sb.dragTimeout = setTimeout(function () {
                        sb.track.css('opacity', 0);
                        sb.track.transition(400);
                    }, 1000);
                }
                s.emit('onScrollbarDragEnd', s);
                if (s.params.scrollbarSnapOnRelease) {
                    s.slideReset();
                }
            },
            draggableEvents: function () {
                if (s.params.simulateTouch === false && !s.support.touch) return s.touchEventsDesktop;else return s.touchEvents;
            }(),
            enableDraggable: function enableDraggable() {
                var sb = s.scrollbar;
                var target = s.support.touch ? sb.track : document;
                $(sb.track).on(sb.draggableEvents.start, sb.dragStart);
                $(target).on(sb.draggableEvents.move, sb.dragMove);
                $(target).on(sb.draggableEvents.end, sb.dragEnd);
            },
            disableDraggable: function disableDraggable() {
                var sb = s.scrollbar;
                var target = s.support.touch ? sb.track : document;
                $(sb.track).off(sb.draggableEvents.start, sb.dragStart);
                $(target).off(sb.draggableEvents.move, sb.dragMove);
                $(target).off(sb.draggableEvents.end, sb.dragEnd);
            },
            set: function set() {
                if (!s.params.scrollbar) return;
                var sb = s.scrollbar;
                sb.track = $(s.params.scrollbar);
                if (s.params.uniqueNavElements && typeof s.params.scrollbar === 'string' && sb.track.length > 1 && s.container.find(s.params.scrollbar).length === 1) {
                    sb.track = s.container.find(s.params.scrollbar);
                }
                sb.drag = sb.track.find('.swiper-scrollbar-drag');
                if (sb.drag.length === 0) {
                    sb.drag = $('<div class="swiper-scrollbar-drag"></div>');
                    sb.track.append(sb.drag);
                }
                sb.drag[0].style.width = '';
                sb.drag[0].style.height = '';
                sb.trackSize = s.isHorizontal() ? sb.track[0].offsetWidth : sb.track[0].offsetHeight;

                sb.divider = s.size / s.virtualSize;
                sb.moveDivider = sb.divider * (sb.trackSize / s.size);
                sb.dragSize = sb.trackSize * sb.divider;

                if (s.isHorizontal()) {
                    sb.drag[0].style.width = sb.dragSize + 'px';
                } else {
                    sb.drag[0].style.height = sb.dragSize + 'px';
                }

                if (sb.divider >= 1) {
                    sb.track[0].style.display = 'none';
                } else {
                    sb.track[0].style.display = '';
                }
                if (s.params.scrollbarHide) {
                    sb.track[0].style.opacity = 0;
                }
            },
            setTranslate: function setTranslate() {
                if (!s.params.scrollbar) return;
                var diff;
                var sb = s.scrollbar;
                var translate = s.translate || 0;
                var newPos;

                var newSize = sb.dragSize;
                newPos = (sb.trackSize - sb.dragSize) * s.progress;
                if (s.rtl && s.isHorizontal()) {
                    newPos = -newPos;
                    if (newPos > 0) {
                        newSize = sb.dragSize - newPos;
                        newPos = 0;
                    } else if (-newPos + sb.dragSize > sb.trackSize) {
                        newSize = sb.trackSize + newPos;
                    }
                } else {
                    if (newPos < 0) {
                        newSize = sb.dragSize + newPos;
                        newPos = 0;
                    } else if (newPos + sb.dragSize > sb.trackSize) {
                        newSize = sb.trackSize - newPos;
                    }
                }
                if (s.isHorizontal()) {
                    if (s.support.transforms3d) {
                        sb.drag.transform('translate3d(' + newPos + 'px, 0, 0)');
                    } else {
                        sb.drag.transform('translateX(' + newPos + 'px)');
                    }
                    sb.drag[0].style.width = newSize + 'px';
                } else {
                    if (s.support.transforms3d) {
                        sb.drag.transform('translate3d(0px, ' + newPos + 'px, 0)');
                    } else {
                        sb.drag.transform('translateY(' + newPos + 'px)');
                    }
                    sb.drag[0].style.height = newSize + 'px';
                }
                if (s.params.scrollbarHide) {
                    clearTimeout(sb.timeout);
                    sb.track[0].style.opacity = 1;
                    sb.timeout = setTimeout(function () {
                        sb.track[0].style.opacity = 0;
                        sb.track.transition(400);
                    }, 1000);
                }
            },
            setTransition: function setTransition(duration) {
                if (!s.params.scrollbar) return;
                s.scrollbar.drag.transition(duration);
            }
        };

        /*=========================
          Controller
          ===========================*/
        s.controller = {
            LinearSpline: function LinearSpline(x, y) {
                var binarySearch = function () {
                    var maxIndex, minIndex, guess;
                    return function (array, val) {
                        minIndex = -1;
                        maxIndex = array.length;
                        while (maxIndex - minIndex > 1) {
                            if (array[guess = maxIndex + minIndex >> 1] <= val) {
                                minIndex = guess;
                            } else {
                                maxIndex = guess;
                            }
                        }return maxIndex;
                    };
                }();
                this.x = x;
                this.y = y;
                this.lastIndex = x.length - 1;
                // Given an x value (x2), return the expected y2 value:
                // (x1,y1) is the known point before given value,
                // (x3,y3) is the known point after given value.
                var i1, i3;
                var l = this.x.length;

                this.interpolate = function (x2) {
                    if (!x2) return 0;

                    // Get the indexes of x1 and x3 (the array indexes before and after given x2):
                    i3 = binarySearch(this.x, x2);
                    i1 = i3 - 1;

                    // We have our indexes i1 & i3, so we can calculate already:
                    // y2 := ((x2−x1) × (y3−y1)) ÷ (x3−x1) + y1
                    return (x2 - this.x[i1]) * (this.y[i3] - this.y[i1]) / (this.x[i3] - this.x[i1]) + this.y[i1];
                };
            },
            //xxx: for now i will just save one spline function to to
            getInterpolateFunction: function getInterpolateFunction(c) {
                if (!s.controller.spline) s.controller.spline = s.params.loop ? new s.controller.LinearSpline(s.slidesGrid, c.slidesGrid) : new s.controller.LinearSpline(s.snapGrid, c.snapGrid);
            },
            setTranslate: function setTranslate(translate, byController) {
                var controlled = s.params.control;
                var multiplier, controlledTranslate;
                function setControlledTranslate(c) {
                    // this will create an Interpolate function based on the snapGrids
                    // x is the Grid of the scrolled scroller and y will be the controlled scroller
                    // it makes sense to create this only once and recall it for the interpolation
                    // the function does a lot of value caching for performance
                    translate = c.rtl && c.params.direction === 'horizontal' ? -s.translate : s.translate;
                    if (s.params.controlBy === 'slide') {
                        s.controller.getInterpolateFunction(c);
                        // i am not sure why the values have to be multiplicated this way, tried to invert the snapGrid
                        // but it did not work out
                        controlledTranslate = -s.controller.spline.interpolate(-translate);
                    }

                    if (!controlledTranslate || s.params.controlBy === 'container') {
                        multiplier = (c.maxTranslate() - c.minTranslate()) / (s.maxTranslate() - s.minTranslate());
                        controlledTranslate = (translate - s.minTranslate()) * multiplier + c.minTranslate();
                    }

                    if (s.params.controlInverse) {
                        controlledTranslate = c.maxTranslate() - controlledTranslate;
                    }
                    c.updateProgress(controlledTranslate);
                    c.setWrapperTranslate(controlledTranslate, false, s);
                    c.updateActiveIndex();
                }
                if (Array.isArray(controlled)) {
                    for (var i = 0; i < controlled.length; i++) {
                        if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
                            setControlledTranslate(controlled[i]);
                        }
                    }
                } else if (controlled instanceof Swiper && byController !== controlled) {

                    setControlledTranslate(controlled);
                }
            },
            setTransition: function setTransition(duration, byController) {
                var controlled = s.params.control;
                var i;
                function setControlledTransition(c) {
                    c.setWrapperTransition(duration, s);
                    if (duration !== 0) {
                        c.onTransitionStart();
                        c.wrapper.transitionEnd(function () {
                            if (!controlled) return;
                            if (c.params.loop && s.params.controlBy === 'slide') {
                                c.fixLoop();
                            }
                            c.onTransitionEnd();
                        });
                    }
                }
                if (Array.isArray(controlled)) {
                    for (i = 0; i < controlled.length; i++) {
                        if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
                            setControlledTransition(controlled[i]);
                        }
                    }
                } else if (controlled instanceof Swiper && byController !== controlled) {
                    setControlledTransition(controlled);
                }
            }
        };

        /*=========================
          Hash Navigation
          ===========================*/
        s.hashnav = {
            onHashCange: function onHashCange(e, a) {
                var newHash = document.location.hash.replace('#', '');
                var activeSlideHash = s.slides.eq(s.activeIndex).attr('data-hash');
                if (newHash !== activeSlideHash) {
                    s.slideTo(s.wrapper.children('.' + s.params.slideClass + '[data-hash="' + newHash + '"]').index());
                }
            },
            attachEvents: function attachEvents(detach) {
                var action = detach ? 'off' : 'on';
                $(window)[action]('hashchange', s.hashnav.onHashCange);
            },
            setHash: function setHash() {
                if (!s.hashnav.initialized || !s.params.hashnav) return;
                if (s.params.replaceState && window.history && window.history.replaceState) {
                    window.history.replaceState(null, null, '#' + s.slides.eq(s.activeIndex).attr('data-hash') || '');
                } else {
                    var slide = s.slides.eq(s.activeIndex);
                    var hash = slide.attr('data-hash') || slide.attr('data-history');
                    document.location.hash = hash || '';
                }
            },
            init: function init() {
                if (!s.params.hashnav || s.params.history) return;
                s.hashnav.initialized = true;
                var hash = document.location.hash.replace('#', '');
                if (hash) {
                    var speed = 0;
                    for (var i = 0, length = s.slides.length; i < length; i++) {
                        var slide = s.slides.eq(i);
                        var slideHash = slide.attr('data-hash') || slide.attr('data-history');
                        if (slideHash === hash && !slide.hasClass(s.params.slideDuplicateClass)) {
                            var index = slide.index();
                            s.slideTo(index, speed, s.params.runCallbacksOnInit, true);
                        }
                    }
                }
                if (s.params.hashnavWatchState) s.hashnav.attachEvents();
            },
            destroy: function destroy() {
                if (s.params.hashnavWatchState) s.hashnav.attachEvents(true);
            }
        };

        /*=========================
          History Api with fallback to Hashnav
          ===========================*/
        s.history = {
            init: function init() {
                if (!s.params.history) return;
                if (!window.history || !window.history.pushState) {
                    s.params.history = false;
                    s.params.hashnav = true;
                    return;
                }
                s.history.initialized = true;
                this.paths = this.getPathValues();
                if (!this.paths.key && !this.paths.value) return;
                this.scrollToSlide(0, this.paths.value, s.params.runCallbacksOnInit);
                if (!s.params.replaceState) {
                    window.addEventListener('popstate', this.setHistoryPopState);
                }
            },
            setHistoryPopState: function setHistoryPopState() {
                s.history.paths = s.history.getPathValues();
                s.history.scrollToSlide(s.params.speed, s.history.paths.value, false);
            },
            getPathValues: function getPathValues() {
                var pathArray = window.location.pathname.slice(1).split('/');
                var total = pathArray.length;
                var key = pathArray[total - 2];
                var value = pathArray[total - 1];
                return { key: key, value: value };
            },
            setHistory: function setHistory(key, index) {
                if (!s.history.initialized || !s.params.history) return;
                var slide = s.slides.eq(index);
                var value = this.slugify(slide.attr('data-history'));
                if (!window.location.pathname.includes(key)) {
                    value = key + '/' + value;
                }
                if (s.params.replaceState) {
                    window.history.replaceState(null, null, value);
                } else {
                    window.history.pushState(null, null, value);
                }
            },
            slugify: function slugify(text) {
                return text.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
            },
            scrollToSlide: function scrollToSlide(speed, value, runCallbacks) {
                if (value) {
                    for (var i = 0, length = s.slides.length; i < length; i++) {
                        var slide = s.slides.eq(i);
                        var slideHistory = this.slugify(slide.attr('data-history'));
                        if (slideHistory === value && !slide.hasClass(s.params.slideDuplicateClass)) {
                            var index = slide.index();
                            s.slideTo(index, speed, runCallbacks);
                        }
                    }
                } else {
                    s.slideTo(0, speed, runCallbacks);
                }
            }
        };

        /*=========================
          Keyboard Control
          ===========================*/
        function handleKeyboard(e) {
            if (e.originalEvent) e = e.originalEvent; //jquery fix
            var kc = e.keyCode || e.charCode;
            // Directions locks
            if (!s.params.allowSwipeToNext && (s.isHorizontal() && kc === 39 || !s.isHorizontal() && kc === 40)) {
                return false;
            }
            if (!s.params.allowSwipeToPrev && (s.isHorizontal() && kc === 37 || !s.isHorizontal() && kc === 38)) {
                return false;
            }
            if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
                return;
            }
            if (document.activeElement && document.activeElement.nodeName && (document.activeElement.nodeName.toLowerCase() === 'input' || document.activeElement.nodeName.toLowerCase() === 'textarea')) {
                return;
            }
            if (kc === 37 || kc === 39 || kc === 38 || kc === 40) {
                var inView = false;
                //Check that swiper should be inside of visible area of window
                if (s.container.parents('.' + s.params.slideClass).length > 0 && s.container.parents('.' + s.params.slideActiveClass).length === 0) {
                    return;
                }
                var windowScroll = {
                    left: window.pageXOffset,
                    top: window.pageYOffset
                };
                var windowWidth = window.innerWidth;
                var windowHeight = window.innerHeight;
                var swiperOffset = s.container.offset();
                if (s.rtl) swiperOffset.left = swiperOffset.left - s.container[0].scrollLeft;
                var swiperCoord = [[swiperOffset.left, swiperOffset.top], [swiperOffset.left + s.width, swiperOffset.top], [swiperOffset.left, swiperOffset.top + s.height], [swiperOffset.left + s.width, swiperOffset.top + s.height]];
                for (var i = 0; i < swiperCoord.length; i++) {
                    var point = swiperCoord[i];
                    if (point[0] >= windowScroll.left && point[0] <= windowScroll.left + windowWidth && point[1] >= windowScroll.top && point[1] <= windowScroll.top + windowHeight) {
                        inView = true;
                    }
                }
                if (!inView) return;
            }
            if (s.isHorizontal()) {
                if (kc === 37 || kc === 39) {
                    if (e.preventDefault) e.preventDefault();else e.returnValue = false;
                }
                if (kc === 39 && !s.rtl || kc === 37 && s.rtl) s.slideNext();
                if (kc === 37 && !s.rtl || kc === 39 && s.rtl) s.slidePrev();
            } else {
                if (kc === 38 || kc === 40) {
                    if (e.preventDefault) e.preventDefault();else e.returnValue = false;
                }
                if (kc === 40) s.slideNext();
                if (kc === 38) s.slidePrev();
            }
            s.emit('onKeyPress', s, kc);
        }
        s.disableKeyboardControl = function () {
            s.params.keyboardControl = false;
            $(document).off('keydown', handleKeyboard);
        };
        s.enableKeyboardControl = function () {
            s.params.keyboardControl = true;
            $(document).on('keydown', handleKeyboard);
        };

        /*=========================
          Mousewheel Control
          ===========================*/
        s.mousewheel = {
            event: false,
            lastScrollTime: new window.Date().getTime()
        };
        function isEventSupported() {
            var eventName = 'onwheel';
            var isSupported = eventName in document;

            if (!isSupported) {
                var element = document.createElement('div');
                element.setAttribute(eventName, 'return;');
                isSupported = typeof element[eventName] === 'function';
            }

            if (!isSupported && document.implementation && document.implementation.hasFeature &&
            // always returns true in newer browsers as per the standard.
            // @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
            document.implementation.hasFeature('', '') !== true) {
                // This is the only way to test support for the `wheel` event in IE9+.
                isSupported = document.implementation.hasFeature('Events.wheel', '3.0');
            }

            return isSupported;
        }
        /**
         * Mouse wheel (and 2-finger trackpad) support on the web sucks.  It is
         * complicated, thus this doc is long and (hopefully) detailed enough to answer
         * your questions.
         *
         * If you need to react to the mouse wheel in a predictable way, this code is
         * like your bestest friend. * hugs *
         *
         * As of today, there are 4 DOM event types you can listen to:
         *
         *   'wheel'                -- Chrome(31+), FF(17+), IE(9+)
         *   'mousewheel'           -- Chrome, IE(6+), Opera, Safari
         *   'MozMousePixelScroll'  -- FF(3.5 only!) (2010-2013) -- don't bother!
         *   'DOMMouseScroll'       -- FF(0.9.7+) since 2003
         *
         * So what to do?  The is the best:
         *
         *   normalizeWheel.getEventType();
         *
         * In your event callback, use this code to get sane interpretation of the
         * deltas.  This code will return an object with properties:
         *
         *   spinX   -- normalized spin speed (use for zoom) - x plane
         *   spinY   -- " - y plane
         *   pixelX  -- normalized distance (to pixels) - x plane
         *   pixelY  -- " - y plane
         *
         * Wheel values are provided by the browser assuming you are using the wheel to
         * scroll a web page by a number of lines or pixels (or pages).  Values can vary
         * significantly on different platforms and browsers, forgetting that you can
         * scroll at different speeds.  Some devices (like trackpads) emit more events
         * at smaller increments with fine granularity, and some emit massive jumps with
         * linear speed or acceleration.
         *
         * This code does its best to normalize the deltas for you:
         *
         *   - spin is trying to normalize how far the wheel was spun (or trackpad
         *     dragged).  This is super useful for zoom support where you want to
         *     throw away the chunky scroll steps on the PC and make those equal to
         *     the slow and smooth tiny steps on the Mac. Key data: This code tries to
         *     resolve a single slow step on a wheel to 1.
         *
         *   - pixel is normalizing the desired scroll delta in pixel units.  You'll
         *     get the crazy differences between browsers, but at least it'll be in
         *     pixels!
         *
         *   - positive value indicates scrolling DOWN/RIGHT, negative UP/LEFT.  This
         *     should translate to positive value zooming IN, negative zooming OUT.
         *     This matches the newer 'wheel' event.
         *
         * Why are there spinX, spinY (or pixels)?
         *
         *   - spinX is a 2-finger side drag on the trackpad, and a shift + wheel turn
         *     with a mouse.  It results in side-scrolling in the browser by default.
         *
         *   - spinY is what you expect -- it's the classic axis of a mouse wheel.
         *
         *   - I dropped spinZ/pixelZ.  It is supported by the DOM 3 'wheel' event and
         *     probably is by browsers in conjunction with fancy 3D controllers .. but
         *     you know.
         *
         * Implementation info:
         *
         * Examples of 'wheel' event if you scroll slowly (down) by one step with an
         * average mouse:
         *
         *   OS X + Chrome  (mouse)     -    4   pixel delta  (wheelDelta -120)
         *   OS X + Safari  (mouse)     -  N/A   pixel delta  (wheelDelta  -12)
         *   OS X + Firefox (mouse)     -    0.1 line  delta  (wheelDelta  N/A)
         *   Win8 + Chrome  (mouse)     -  100   pixel delta  (wheelDelta -120)
         *   Win8 + Firefox (mouse)     -    3   line  delta  (wheelDelta -120)
         *
         * On the trackpad:
         *
         *   OS X + Chrome  (trackpad)  -    2   pixel delta  (wheelDelta   -6)
         *   OS X + Firefox (trackpad)  -    1   pixel delta  (wheelDelta  N/A)
         *
         * On other/older browsers.. it's more complicated as there can be multiple and
         * also missing delta values.
         *
         * The 'wheel' event is more standard:
         *
         * http://www.w3.org/TR/DOM-Level-3-Events/#events-wheelevents
         *
         * The basics is that it includes a unit, deltaMode (pixels, lines, pages), and
         * deltaX, deltaY and deltaZ.  Some browsers provide other values to maintain
         * backward compatibility with older events.  Those other values help us
         * better normalize spin speed.  Example of what the browsers provide:
         *
         *                          | event.wheelDelta | event.detail
         *        ------------------+------------------+--------------
         *          Safari v5/OS X  |       -120       |       0
         *          Safari v5/Win7  |       -120       |       0
         *         Chrome v17/OS X  |       -120       |       0
         *         Chrome v17/Win7  |       -120       |       0
         *                IE9/Win7  |       -120       |   undefined
         *         Firefox v4/OS X  |     undefined    |       1
         *         Firefox v4/Win7  |     undefined    |       3
         *
         */
        function normalizeWheel( /*object*/event) /*object*/{
            // Reasonable defaults
            var PIXEL_STEP = 10;
            var LINE_HEIGHT = 40;
            var PAGE_HEIGHT = 800;

            var sX = 0,
                sY = 0,
                // spinX, spinY
            pX = 0,
                pY = 0; // pixelX, pixelY

            // Legacy
            if ('detail' in event) {
                sY = event.detail;
            }
            if ('wheelDelta' in event) {
                sY = -event.wheelDelta / 120;
            }
            if ('wheelDeltaY' in event) {
                sY = -event.wheelDeltaY / 120;
            }
            if ('wheelDeltaX' in event) {
                sX = -event.wheelDeltaX / 120;
            }

            // side scrolling on FF with DOMMouseScroll
            if ('axis' in event && event.axis === event.HORIZONTAL_AXIS) {
                sX = sY;
                sY = 0;
            }

            pX = sX * PIXEL_STEP;
            pY = sY * PIXEL_STEP;

            if ('deltaY' in event) {
                pY = event.deltaY;
            }
            if ('deltaX' in event) {
                pX = event.deltaX;
            }

            if ((pX || pY) && event.deltaMode) {
                if (event.deltaMode === 1) {
                    // delta in LINE units
                    pX *= LINE_HEIGHT;
                    pY *= LINE_HEIGHT;
                } else {
                    // delta in PAGE units
                    pX *= PAGE_HEIGHT;
                    pY *= PAGE_HEIGHT;
                }
            }

            // Fall-back if spin cannot be determined
            if (pX && !sX) {
                sX = pX < 1 ? -1 : 1;
            }
            if (pY && !sY) {
                sY = pY < 1 ? -1 : 1;
            }

            return {
                spinX: sX,
                spinY: sY,
                pixelX: pX,
                pixelY: pY
            };
        }
        if (s.params.mousewheelControl) {
            /**
             * The best combination if you prefer spinX + spinY normalization.  It favors
             * the older DOMMouseScroll for Firefox, as FF does not include wheelDelta with
             * 'wheel' event, making spin speed determination impossible.
             */
            s.mousewheel.event = navigator.userAgent.indexOf('firefox') > -1 ? 'DOMMouseScroll' : isEventSupported() ? 'wheel' : 'mousewheel';
        }
        function handleMousewheel(e) {
            if (e.originalEvent) e = e.originalEvent; //jquery fix
            var delta = 0;
            var rtlFactor = s.rtl ? -1 : 1;

            var data = normalizeWheel(e);

            if (s.params.mousewheelForceToAxis) {
                if (s.isHorizontal()) {
                    if (Math.abs(data.pixelX) > Math.abs(data.pixelY)) delta = data.pixelX * rtlFactor;else return;
                } else {
                    if (Math.abs(data.pixelY) > Math.abs(data.pixelX)) delta = data.pixelY;else return;
                }
            } else {
                delta = Math.abs(data.pixelX) > Math.abs(data.pixelY) ? -data.pixelX * rtlFactor : -data.pixelY;
            }

            if (delta === 0) return;

            if (s.params.mousewheelInvert) delta = -delta;

            if (!s.params.freeMode) {
                if (new window.Date().getTime() - s.mousewheel.lastScrollTime > 60) {
                    if (delta < 0) {
                        if ((!s.isEnd || s.params.loop) && !s.animating) {
                            s.slideNext();
                            s.emit('onScroll', s, e);
                        } else if (s.params.mousewheelReleaseOnEdges) return true;
                    } else {
                        if ((!s.isBeginning || s.params.loop) && !s.animating) {
                            s.slidePrev();
                            s.emit('onScroll', s, e);
                        } else if (s.params.mousewheelReleaseOnEdges) return true;
                    }
                }
                s.mousewheel.lastScrollTime = new window.Date().getTime();
            } else {
                //Freemode or scrollContainer:
                var position = s.getWrapperTranslate() + delta * s.params.mousewheelSensitivity;
                var wasBeginning = s.isBeginning,
                    wasEnd = s.isEnd;

                if (position >= s.minTranslate()) position = s.minTranslate();
                if (position <= s.maxTranslate()) position = s.maxTranslate();

                s.setWrapperTransition(0);
                s.setWrapperTranslate(position);
                s.updateProgress();
                s.updateActiveIndex();

                if (!wasBeginning && s.isBeginning || !wasEnd && s.isEnd) {
                    s.updateClasses();
                }

                if (s.params.freeModeSticky) {
                    clearTimeout(s.mousewheel.timeout);
                    s.mousewheel.timeout = setTimeout(function () {
                        s.slideReset();
                    }, 300);
                } else {
                    if (s.params.lazyLoading && s.lazy) {
                        s.lazy.load();
                    }
                }
                // Emit event
                s.emit('onScroll', s, e);

                // Stop autoplay
                if (s.params.autoplay && s.params.autoplayDisableOnInteraction) s.stopAutoplay();

                // Return page scroll on edge positions
                if (position === 0 || position === s.maxTranslate()) return;
            }

            if (e.preventDefault) e.preventDefault();else e.returnValue = false;
            return false;
        }
        s.disableMousewheelControl = function () {
            if (!s.mousewheel.event) return false;
            var target = s.container;
            if (s.params.mousewheelEventsTarged !== 'container') {
                target = $(s.params.mousewheelEventsTarged);
            }
            target.off(s.mousewheel.event, handleMousewheel);
            s.params.mousewheelControl = false;
            return true;
        };

        s.enableMousewheelControl = function () {
            if (!s.mousewheel.event) return false;
            var target = s.container;
            if (s.params.mousewheelEventsTarged !== 'container') {
                target = $(s.params.mousewheelEventsTarged);
            }
            target.on(s.mousewheel.event, handleMousewheel);
            s.params.mousewheelControl = true;
            return true;
        };

        /*=========================
          Parallax
          ===========================*/
        function setParallaxTransform(el, progress) {
            el = $(el);
            var p, pX, pY;
            var rtlFactor = s.rtl ? -1 : 1;

            p = el.attr('data-swiper-parallax') || '0';
            pX = el.attr('data-swiper-parallax-x');
            pY = el.attr('data-swiper-parallax-y');
            if (pX || pY) {
                pX = pX || '0';
                pY = pY || '0';
            } else {
                if (s.isHorizontal()) {
                    pX = p;
                    pY = '0';
                } else {
                    pY = p;
                    pX = '0';
                }
            }

            if (pX.indexOf('%') >= 0) {
                pX = parseInt(pX, 10) * progress * rtlFactor + '%';
            } else {
                pX = pX * progress * rtlFactor + 'px';
            }
            if (pY.indexOf('%') >= 0) {
                pY = parseInt(pY, 10) * progress + '%';
            } else {
                pY = pY * progress + 'px';
            }

            el.transform('translate3d(' + pX + ', ' + pY + ',0px)');
        }
        s.parallax = {
            setTranslate: function setTranslate() {
                s.container.children('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function () {
                    setParallaxTransform(this, s.progress);
                });
                s.slides.each(function () {
                    var slide = $(this);
                    slide.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function () {
                        var progress = Math.min(Math.max(slide[0].progress, -1), 1);
                        setParallaxTransform(this, progress);
                    });
                });
            },
            setTransition: function setTransition(duration) {
                if (typeof duration === 'undefined') duration = s.params.speed;
                s.container.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function () {
                    var el = $(this);
                    var parallaxDuration = parseInt(el.attr('data-swiper-parallax-duration'), 10) || duration;
                    if (duration === 0) parallaxDuration = 0;
                    el.transition(parallaxDuration);
                });
            }
        };

        /*=========================
          Zoom
          ===========================*/
        s.zoom = {
            // "Global" Props
            scale: 1,
            currentScale: 1,
            isScaling: false,
            gesture: {
                slide: undefined,
                slideWidth: undefined,
                slideHeight: undefined,
                image: undefined,
                imageWrap: undefined,
                zoomMax: s.params.zoomMax
            },
            image: {
                isTouched: undefined,
                isMoved: undefined,
                currentX: undefined,
                currentY: undefined,
                minX: undefined,
                minY: undefined,
                maxX: undefined,
                maxY: undefined,
                width: undefined,
                height: undefined,
                startX: undefined,
                startY: undefined,
                touchesStart: {},
                touchesCurrent: {}
            },
            velocity: {
                x: undefined,
                y: undefined,
                prevPositionX: undefined,
                prevPositionY: undefined,
                prevTime: undefined
            },
            // Calc Scale From Multi-touches
            getDistanceBetweenTouches: function getDistanceBetweenTouches(e) {
                if (e.targetTouches.length < 2) return 1;
                var x1 = e.targetTouches[0].pageX,
                    y1 = e.targetTouches[0].pageY,
                    x2 = e.targetTouches[1].pageX,
                    y2 = e.targetTouches[1].pageY;
                var distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                return distance;
            },
            // Events
            onGestureStart: function onGestureStart(e) {
                var z = s.zoom;
                if (!s.support.gestures) {
                    if (e.type !== 'touchstart' || e.type === 'touchstart' && e.targetTouches.length < 2) {
                        return;
                    }
                    z.gesture.scaleStart = z.getDistanceBetweenTouches(e);
                }
                if (!z.gesture.slide || !z.gesture.slide.length) {
                    z.gesture.slide = $(this);
                    if (z.gesture.slide.length === 0) z.gesture.slide = s.slides.eq(s.activeIndex);
                    z.gesture.image = z.gesture.slide.find('img, svg, canvas');
                    z.gesture.imageWrap = z.gesture.image.parent('.' + s.params.zoomContainerClass);
                    z.gesture.zoomMax = z.gesture.imageWrap.attr('data-swiper-zoom') || s.params.zoomMax;
                    if (z.gesture.imageWrap.length === 0) {
                        z.gesture.image = undefined;
                        return;
                    }
                }
                z.gesture.image.transition(0);
                z.isScaling = true;
            },
            onGestureChange: function onGestureChange(e) {
                var z = s.zoom;
                if (!s.support.gestures) {
                    if (e.type !== 'touchmove' || e.type === 'touchmove' && e.targetTouches.length < 2) {
                        return;
                    }
                    z.gesture.scaleMove = z.getDistanceBetweenTouches(e);
                }
                if (!z.gesture.image || z.gesture.image.length === 0) return;
                if (s.support.gestures) {
                    z.scale = e.scale * z.currentScale;
                } else {
                    z.scale = z.gesture.scaleMove / z.gesture.scaleStart * z.currentScale;
                }
                if (z.scale > z.gesture.zoomMax) {
                    z.scale = z.gesture.zoomMax - 1 + Math.pow(z.scale - z.gesture.zoomMax + 1, 0.5);
                }
                if (z.scale < s.params.zoomMin) {
                    z.scale = s.params.zoomMin + 1 - Math.pow(s.params.zoomMin - z.scale + 1, 0.5);
                }
                z.gesture.image.transform('translate3d(0,0,0) scale(' + z.scale + ')');
            },
            onGestureEnd: function onGestureEnd(e) {
                var z = s.zoom;
                if (!s.support.gestures) {
                    if (e.type !== 'touchend' || e.type === 'touchend' && e.changedTouches.length < 2) {
                        return;
                    }
                }
                if (!z.gesture.image || z.gesture.image.length === 0) return;
                z.scale = Math.max(Math.min(z.scale, z.gesture.zoomMax), s.params.zoomMin);
                z.gesture.image.transition(s.params.speed).transform('translate3d(0,0,0) scale(' + z.scale + ')');
                z.currentScale = z.scale;
                z.isScaling = false;
                if (z.scale === 1) z.gesture.slide = undefined;
            },
            onTouchStart: function onTouchStart(s, e) {
                var z = s.zoom;
                if (!z.gesture.image || z.gesture.image.length === 0) return;
                if (z.image.isTouched) return;
                if (s.device.os === 'android') e.preventDefault();
                z.image.isTouched = true;
                z.image.touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
                z.image.touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
            },
            onTouchMove: function onTouchMove(e) {
                var z = s.zoom;
                if (!z.gesture.image || z.gesture.image.length === 0) return;
                s.allowClick = false;
                if (!z.image.isTouched || !z.gesture.slide) return;

                if (!z.image.isMoved) {
                    z.image.width = z.gesture.image[0].offsetWidth;
                    z.image.height = z.gesture.image[0].offsetHeight;
                    z.image.startX = s.getTranslate(z.gesture.imageWrap[0], 'x') || 0;
                    z.image.startY = s.getTranslate(z.gesture.imageWrap[0], 'y') || 0;
                    z.gesture.slideWidth = z.gesture.slide[0].offsetWidth;
                    z.gesture.slideHeight = z.gesture.slide[0].offsetHeight;
                    z.gesture.imageWrap.transition(0);
                    if (s.rtl) z.image.startX = -z.image.startX;
                    if (s.rtl) z.image.startY = -z.image.startY;
                }
                // Define if we need image drag
                var scaledWidth = z.image.width * z.scale;
                var scaledHeight = z.image.height * z.scale;

                if (scaledWidth < z.gesture.slideWidth && scaledHeight < z.gesture.slideHeight) return;

                z.image.minX = Math.min(z.gesture.slideWidth / 2 - scaledWidth / 2, 0);
                z.image.maxX = -z.image.minX;
                z.image.minY = Math.min(z.gesture.slideHeight / 2 - scaledHeight / 2, 0);
                z.image.maxY = -z.image.minY;

                z.image.touchesCurrent.x = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                z.image.touchesCurrent.y = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;

                if (!z.image.isMoved && !z.isScaling) {
                    if (s.isHorizontal() && Math.floor(z.image.minX) === Math.floor(z.image.startX) && z.image.touchesCurrent.x < z.image.touchesStart.x || Math.floor(z.image.maxX) === Math.floor(z.image.startX) && z.image.touchesCurrent.x > z.image.touchesStart.x) {
                        z.image.isTouched = false;
                        return;
                    } else if (!s.isHorizontal() && Math.floor(z.image.minY) === Math.floor(z.image.startY) && z.image.touchesCurrent.y < z.image.touchesStart.y || Math.floor(z.image.maxY) === Math.floor(z.image.startY) && z.image.touchesCurrent.y > z.image.touchesStart.y) {
                        z.image.isTouched = false;
                        return;
                    }
                }
                e.preventDefault();
                e.stopPropagation();

                z.image.isMoved = true;
                z.image.currentX = z.image.touchesCurrent.x - z.image.touchesStart.x + z.image.startX;
                z.image.currentY = z.image.touchesCurrent.y - z.image.touchesStart.y + z.image.startY;

                if (z.image.currentX < z.image.minX) {
                    z.image.currentX = z.image.minX + 1 - Math.pow(z.image.minX - z.image.currentX + 1, 0.8);
                }
                if (z.image.currentX > z.image.maxX) {
                    z.image.currentX = z.image.maxX - 1 + Math.pow(z.image.currentX - z.image.maxX + 1, 0.8);
                }

                if (z.image.currentY < z.image.minY) {
                    z.image.currentY = z.image.minY + 1 - Math.pow(z.image.minY - z.image.currentY + 1, 0.8);
                }
                if (z.image.currentY > z.image.maxY) {
                    z.image.currentY = z.image.maxY - 1 + Math.pow(z.image.currentY - z.image.maxY + 1, 0.8);
                }

                //Velocity
                if (!z.velocity.prevPositionX) z.velocity.prevPositionX = z.image.touchesCurrent.x;
                if (!z.velocity.prevPositionY) z.velocity.prevPositionY = z.image.touchesCurrent.y;
                if (!z.velocity.prevTime) z.velocity.prevTime = Date.now();
                z.velocity.x = (z.image.touchesCurrent.x - z.velocity.prevPositionX) / (Date.now() - z.velocity.prevTime) / 2;
                z.velocity.y = (z.image.touchesCurrent.y - z.velocity.prevPositionY) / (Date.now() - z.velocity.prevTime) / 2;
                if (Math.abs(z.image.touchesCurrent.x - z.velocity.prevPositionX) < 2) z.velocity.x = 0;
                if (Math.abs(z.image.touchesCurrent.y - z.velocity.prevPositionY) < 2) z.velocity.y = 0;
                z.velocity.prevPositionX = z.image.touchesCurrent.x;
                z.velocity.prevPositionY = z.image.touchesCurrent.y;
                z.velocity.prevTime = Date.now();

                z.gesture.imageWrap.transform('translate3d(' + z.image.currentX + 'px, ' + z.image.currentY + 'px,0)');
            },
            onTouchEnd: function onTouchEnd(s, e) {
                var z = s.zoom;
                if (!z.gesture.image || z.gesture.image.length === 0) return;
                if (!z.image.isTouched || !z.image.isMoved) {
                    z.image.isTouched = false;
                    z.image.isMoved = false;
                    return;
                }
                z.image.isTouched = false;
                z.image.isMoved = false;
                var momentumDurationX = 300;
                var momentumDurationY = 300;
                var momentumDistanceX = z.velocity.x * momentumDurationX;
                var newPositionX = z.image.currentX + momentumDistanceX;
                var momentumDistanceY = z.velocity.y * momentumDurationY;
                var newPositionY = z.image.currentY + momentumDistanceY;

                //Fix duration
                if (z.velocity.x !== 0) momentumDurationX = Math.abs((newPositionX - z.image.currentX) / z.velocity.x);
                if (z.velocity.y !== 0) momentumDurationY = Math.abs((newPositionY - z.image.currentY) / z.velocity.y);
                var momentumDuration = Math.max(momentumDurationX, momentumDurationY);

                z.image.currentX = newPositionX;
                z.image.currentY = newPositionY;

                // Define if we need image drag
                var scaledWidth = z.image.width * z.scale;
                var scaledHeight = z.image.height * z.scale;
                z.image.minX = Math.min(z.gesture.slideWidth / 2 - scaledWidth / 2, 0);
                z.image.maxX = -z.image.minX;
                z.image.minY = Math.min(z.gesture.slideHeight / 2 - scaledHeight / 2, 0);
                z.image.maxY = -z.image.minY;
                z.image.currentX = Math.max(Math.min(z.image.currentX, z.image.maxX), z.image.minX);
                z.image.currentY = Math.max(Math.min(z.image.currentY, z.image.maxY), z.image.minY);

                z.gesture.imageWrap.transition(momentumDuration).transform('translate3d(' + z.image.currentX + 'px, ' + z.image.currentY + 'px,0)');
            },
            onTransitionEnd: function onTransitionEnd(s) {
                var z = s.zoom;
                if (z.gesture.slide && s.previousIndex !== s.activeIndex) {
                    z.gesture.image.transform('translate3d(0,0,0) scale(1)');
                    z.gesture.imageWrap.transform('translate3d(0,0,0)');
                    z.gesture.slide = z.gesture.image = z.gesture.imageWrap = undefined;
                    z.scale = z.currentScale = 1;
                }
            },
            // Toggle Zoom
            toggleZoom: function toggleZoom(s, e) {
                var z = s.zoom;
                if (!z.gesture.slide) {
                    z.gesture.slide = s.clickedSlide ? $(s.clickedSlide) : s.slides.eq(s.activeIndex);
                    z.gesture.image = z.gesture.slide.find('img, svg, canvas');
                    z.gesture.imageWrap = z.gesture.image.parent('.' + s.params.zoomContainerClass);
                }
                if (!z.gesture.image || z.gesture.image.length === 0) return;

                var touchX, touchY, offsetX, offsetY, diffX, diffY, translateX, translateY, imageWidth, imageHeight, scaledWidth, scaledHeight, translateMinX, translateMinY, translateMaxX, translateMaxY, slideWidth, slideHeight;

                if (typeof z.image.touchesStart.x === 'undefined' && e) {
                    touchX = e.type === 'touchend' ? e.changedTouches[0].pageX : e.pageX;
                    touchY = e.type === 'touchend' ? e.changedTouches[0].pageY : e.pageY;
                } else {
                    touchX = z.image.touchesStart.x;
                    touchY = z.image.touchesStart.y;
                }

                if (z.scale && z.scale !== 1) {
                    // Zoom Out
                    z.scale = z.currentScale = 1;
                    z.gesture.imageWrap.transition(300).transform('translate3d(0,0,0)');
                    z.gesture.image.transition(300).transform('translate3d(0,0,0) scale(1)');
                    z.gesture.slide = undefined;
                } else {
                    // Zoom In
                    z.scale = z.currentScale = z.gesture.imageWrap.attr('data-swiper-zoom') || s.params.zoomMax;
                    if (e) {
                        slideWidth = z.gesture.slide[0].offsetWidth;
                        slideHeight = z.gesture.slide[0].offsetHeight;
                        offsetX = z.gesture.slide.offset().left;
                        offsetY = z.gesture.slide.offset().top;
                        diffX = offsetX + slideWidth / 2 - touchX;
                        diffY = offsetY + slideHeight / 2 - touchY;

                        imageWidth = z.gesture.image[0].offsetWidth;
                        imageHeight = z.gesture.image[0].offsetHeight;
                        scaledWidth = imageWidth * z.scale;
                        scaledHeight = imageHeight * z.scale;

                        translateMinX = Math.min(slideWidth / 2 - scaledWidth / 2, 0);
                        translateMinY = Math.min(slideHeight / 2 - scaledHeight / 2, 0);
                        translateMaxX = -translateMinX;
                        translateMaxY = -translateMinY;

                        translateX = diffX * z.scale;
                        translateY = diffY * z.scale;

                        if (translateX < translateMinX) {
                            translateX = translateMinX;
                        }
                        if (translateX > translateMaxX) {
                            translateX = translateMaxX;
                        }

                        if (translateY < translateMinY) {
                            translateY = translateMinY;
                        }
                        if (translateY > translateMaxY) {
                            translateY = translateMaxY;
                        }
                    } else {
                        translateX = 0;
                        translateY = 0;
                    }
                    z.gesture.imageWrap.transition(300).transform('translate3d(' + translateX + 'px, ' + translateY + 'px,0)');
                    z.gesture.image.transition(300).transform('translate3d(0,0,0) scale(' + z.scale + ')');
                }
            },
            // Attach/Detach Events
            attachEvents: function attachEvents(detach) {
                var action = detach ? 'off' : 'on';

                if (s.params.zoom) {
                    var target = s.slides;
                    var passiveListener = s.touchEvents.start === 'touchstart' && s.support.passiveListener && s.params.passiveListeners ? { passive: true, capture: false } : false;
                    // Scale image
                    if (s.support.gestures) {
                        s.slides[action]('gesturestart', s.zoom.onGestureStart, passiveListener);
                        s.slides[action]('gesturechange', s.zoom.onGestureChange, passiveListener);
                        s.slides[action]('gestureend', s.zoom.onGestureEnd, passiveListener);
                    } else if (s.touchEvents.start === 'touchstart') {
                        s.slides[action](s.touchEvents.start, s.zoom.onGestureStart, passiveListener);
                        s.slides[action](s.touchEvents.move, s.zoom.onGestureChange, passiveListener);
                        s.slides[action](s.touchEvents.end, s.zoom.onGestureEnd, passiveListener);
                    }

                    // Move image
                    s[action]('touchStart', s.zoom.onTouchStart);
                    s.slides.each(function (index, slide) {
                        if ($(slide).find('.' + s.params.zoomContainerClass).length > 0) {
                            $(slide)[action](s.touchEvents.move, s.zoom.onTouchMove);
                        }
                    });
                    s[action]('touchEnd', s.zoom.onTouchEnd);

                    // Scale Out
                    s[action]('transitionEnd', s.zoom.onTransitionEnd);
                    if (s.params.zoomToggle) {
                        s.on('doubleTap', s.zoom.toggleZoom);
                    }
                }
            },
            init: function init() {
                s.zoom.attachEvents();
            },
            destroy: function destroy() {
                s.zoom.attachEvents(true);
            }
        };

        /*=========================
          Plugins API. Collect all and init all plugins
          ===========================*/
        s._plugins = [];
        for (var plugin in s.plugins) {
            var p = s.plugins[plugin](s, s.params[plugin]);
            if (p) s._plugins.push(p);
        }
        // Method to call all plugins event/method
        s.callPlugins = function (eventName) {
            for (var i = 0; i < s._plugins.length; i++) {
                if (eventName in s._plugins[i]) {
                    s._plugins[i][eventName](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                }
            }
        };

        /*=========================
          Events/Callbacks/Plugins Emitter
          ===========================*/
        function normalizeEventName(eventName) {
            if (eventName.indexOf('on') !== 0) {
                if (eventName[0] !== eventName[0].toUpperCase()) {
                    eventName = 'on' + eventName[0].toUpperCase() + eventName.substring(1);
                } else {
                    eventName = 'on' + eventName;
                }
            }
            return eventName;
        }
        s.emitterEventListeners = {};
        s.emit = function (eventName) {
            // Trigger callbacks
            if (s.params[eventName]) {
                s.params[eventName](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
            }
            var i;
            // Trigger events
            if (s.emitterEventListeners[eventName]) {
                for (i = 0; i < s.emitterEventListeners[eventName].length; i++) {
                    s.emitterEventListeners[eventName][i](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                }
            }
            // Trigger plugins
            if (s.callPlugins) s.callPlugins(eventName, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
        };
        s.on = function (eventName, handler) {
            eventName = normalizeEventName(eventName);
            if (!s.emitterEventListeners[eventName]) s.emitterEventListeners[eventName] = [];
            s.emitterEventListeners[eventName].push(handler);
            return s;
        };
        s.off = function (eventName, handler) {
            var i;
            eventName = normalizeEventName(eventName);
            if (typeof handler === 'undefined') {
                // Remove all handlers for such event
                s.emitterEventListeners[eventName] = [];
                return s;
            }
            if (!s.emitterEventListeners[eventName] || s.emitterEventListeners[eventName].length === 0) return;
            for (i = 0; i < s.emitterEventListeners[eventName].length; i++) {
                if (s.emitterEventListeners[eventName][i] === handler) s.emitterEventListeners[eventName].splice(i, 1);
            }
            return s;
        };
        s.once = function (eventName, handler) {
            eventName = normalizeEventName(eventName);
            var _handler = function _handler() {
                handler(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
                s.off(eventName, _handler);
            };
            s.on(eventName, _handler);
            return s;
        };

        // Accessibility tools
        s.a11y = {
            makeFocusable: function makeFocusable($el) {
                $el.attr('tabIndex', '0');
                return $el;
            },
            addRole: function addRole($el, role) {
                $el.attr('role', role);
                return $el;
            },

            addLabel: function addLabel($el, label) {
                $el.attr('aria-label', label);
                return $el;
            },

            disable: function disable($el) {
                $el.attr('aria-disabled', true);
                return $el;
            },

            enable: function enable($el) {
                $el.attr('aria-disabled', false);
                return $el;
            },

            onEnterKey: function onEnterKey(event) {
                if (event.keyCode !== 13) return;
                if ($(event.target).is(s.params.nextButton)) {
                    s.onClickNext(event);
                    if (s.isEnd) {
                        s.a11y.notify(s.params.lastSlideMessage);
                    } else {
                        s.a11y.notify(s.params.nextSlideMessage);
                    }
                } else if ($(event.target).is(s.params.prevButton)) {
                    s.onClickPrev(event);
                    if (s.isBeginning) {
                        s.a11y.notify(s.params.firstSlideMessage);
                    } else {
                        s.a11y.notify(s.params.prevSlideMessage);
                    }
                }
                if ($(event.target).is('.' + s.params.bulletClass)) {
                    $(event.target)[0].click();
                }
            },

            liveRegion: $('<span class="' + s.params.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>'),

            notify: function notify(message) {
                var notification = s.a11y.liveRegion;
                if (notification.length === 0) return;
                notification.html('');
                notification.html(message);
            },
            init: function init() {
                // Setup accessibility
                if (s.params.nextButton && s.nextButton && s.nextButton.length > 0) {
                    s.a11y.makeFocusable(s.nextButton);
                    s.a11y.addRole(s.nextButton, 'button');
                    s.a11y.addLabel(s.nextButton, s.params.nextSlideMessage);
                }
                if (s.params.prevButton && s.prevButton && s.prevButton.length > 0) {
                    s.a11y.makeFocusable(s.prevButton);
                    s.a11y.addRole(s.prevButton, 'button');
                    s.a11y.addLabel(s.prevButton, s.params.prevSlideMessage);
                }

                $(s.container).append(s.a11y.liveRegion);
            },
            initPagination: function initPagination() {
                if (s.params.pagination && s.params.paginationClickable && s.bullets && s.bullets.length) {
                    s.bullets.each(function () {
                        var bullet = $(this);
                        s.a11y.makeFocusable(bullet);
                        s.a11y.addRole(bullet, 'button');
                        s.a11y.addLabel(bullet, s.params.paginationBulletMessage.replace(/{{index}}/, bullet.index() + 1));
                    });
                }
            },
            destroy: function destroy() {
                if (s.a11y.liveRegion && s.a11y.liveRegion.length > 0) s.a11y.liveRegion.remove();
            }
        };

        /*=========================
          Init/Destroy
          ===========================*/
        s.init = function () {
            if (s.params.loop) s.createLoop();
            s.updateContainerSize();
            s.updateSlidesSize();
            s.updatePagination();
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.set();
                if (s.params.scrollbarDraggable) {
                    s.scrollbar.enableDraggable();
                }
            }
            if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
                if (!s.params.loop) s.updateProgress();
                s.effects[s.params.effect].setTranslate();
            }
            if (s.params.loop) {
                s.slideTo(s.params.initialSlide + s.loopedSlides, 0, s.params.runCallbacksOnInit);
            } else {
                s.slideTo(s.params.initialSlide, 0, s.params.runCallbacksOnInit);
                if (s.params.initialSlide === 0) {
                    if (s.parallax && s.params.parallax) s.parallax.setTranslate();
                    if (s.lazy && s.params.lazyLoading) {
                        s.lazy.load();
                        s.lazy.initialImageLoaded = true;
                    }
                }
            }
            s.attachEvents();
            if (s.params.observer && s.support.observer) {
                s.initObservers();
            }
            if (s.params.preloadImages && !s.params.lazyLoading) {
                s.preloadImages();
            }
            if (s.params.zoom && s.zoom) {
                s.zoom.init();
            }
            if (s.params.autoplay) {
                s.startAutoplay();
            }
            if (s.params.keyboardControl) {
                if (s.enableKeyboardControl) s.enableKeyboardControl();
            }
            if (s.params.mousewheelControl) {
                if (s.enableMousewheelControl) s.enableMousewheelControl();
            }
            // Deprecated hashnavReplaceState changed to replaceState for use in hashnav and history
            if (s.params.hashnavReplaceState) {
                s.params.replaceState = s.params.hashnavReplaceState;
            }
            if (s.params.history) {
                if (s.history) s.history.init();
            }
            if (s.params.hashnav) {
                if (s.hashnav) s.hashnav.init();
            }
            if (s.params.a11y && s.a11y) s.a11y.init();
            s.emit('onInit', s);
        };

        // Cleanup dynamic styles
        s.cleanupStyles = function () {
            // Container
            s.container.removeClass(s.classNames.join(' ')).removeAttr('style');

            // Wrapper
            s.wrapper.removeAttr('style');

            // Slides
            if (s.slides && s.slides.length) {
                s.slides.removeClass([s.params.slideVisibleClass, s.params.slideActiveClass, s.params.slideNextClass, s.params.slidePrevClass].join(' ')).removeAttr('style').removeAttr('data-swiper-column').removeAttr('data-swiper-row');
            }

            // Pagination/Bullets
            if (s.paginationContainer && s.paginationContainer.length) {
                s.paginationContainer.removeClass(s.params.paginationHiddenClass);
            }
            if (s.bullets && s.bullets.length) {
                s.bullets.removeClass(s.params.bulletActiveClass);
            }

            // Buttons
            if (s.params.prevButton) $(s.params.prevButton).removeClass(s.params.buttonDisabledClass);
            if (s.params.nextButton) $(s.params.nextButton).removeClass(s.params.buttonDisabledClass);

            // Scrollbar
            if (s.params.scrollbar && s.scrollbar) {
                if (s.scrollbar.track && s.scrollbar.track.length) s.scrollbar.track.removeAttr('style');
                if (s.scrollbar.drag && s.scrollbar.drag.length) s.scrollbar.drag.removeAttr('style');
            }
        };

        // Destroy
        s.destroy = function (deleteInstance, cleanupStyles) {
            // Detach evebts
            s.detachEvents();
            // Stop autoplay
            s.stopAutoplay();
            // Disable draggable
            if (s.params.scrollbar && s.scrollbar) {
                if (s.params.scrollbarDraggable) {
                    s.scrollbar.disableDraggable();
                }
            }
            // Destroy loop
            if (s.params.loop) {
                s.destroyLoop();
            }
            // Cleanup styles
            if (cleanupStyles) {
                s.cleanupStyles();
            }
            // Disconnect observer
            s.disconnectObservers();

            // Destroy zoom
            if (s.params.zoom && s.zoom) {
                s.zoom.destroy();
            }
            // Disable keyboard/mousewheel
            if (s.params.keyboardControl) {
                if (s.disableKeyboardControl) s.disableKeyboardControl();
            }
            if (s.params.mousewheelControl) {
                if (s.disableMousewheelControl) s.disableMousewheelControl();
            }
            // Disable a11y
            if (s.params.a11y && s.a11y) s.a11y.destroy();
            // Delete history popstate
            if (s.params.history && !s.params.replaceState) {
                window.removeEventListener('popstate', s.history.setHistoryPopState);
            }
            if (s.params.hashnav && s.hashnav) {
                s.hashnav.destroy();
            }
            // Destroy callback
            s.emit('onDestroy');
            // Delete instance
            if (deleteInstance !== false) s = null;
        };

        s.init();

        // Return swiper instance
        return s;
    };

    /*==================================================
        Prototype
    ====================================================*/
    Swiper.prototype = {
        isSafari: function () {
            var ua = window.navigator.userAgent.toLowerCase();
            return ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0;
        }(),
        isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent),
        isArray: function isArray(arr) {
            return Object.prototype.toString.apply(arr) === '[object Array]';
        },
        /*==================================================
        Browser
        ====================================================*/
        browser: {
            ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
            ieTouch: window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1 || window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1,
            lteIE9: function () {
                // create temporary DIV
                var div = document.createElement('div');
                // add content to tmp DIV which is wrapped into the IE HTML conditional statement
                div.innerHTML = '<!--[if lte IE 9]><i></i><![endif]-->';
                // return true / false value based on what will browser render
                return div.getElementsByTagName('i').length === 1;
            }()
        },
        /*==================================================
        Devices
        ====================================================*/
        device: function () {
            var ua = window.navigator.userAgent;
            var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
            var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
            var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
            var iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
            return {
                ios: ipad || iphone || ipod,
                android: android
            };
        }(),
        /*==================================================
        Feature Detection
        ====================================================*/
        support: {
            touch: window.Modernizr && Modernizr.touch === true || function () {
                return !!('ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch);
            }(),

            transforms3d: window.Modernizr && Modernizr.csstransforms3d === true || function () {
                var div = document.createElement('div').style;
                return 'webkitPerspective' in div || 'MozPerspective' in div || 'OPerspective' in div || 'MsPerspective' in div || 'perspective' in div;
            }(),

            flexbox: function () {
                var div = document.createElement('div').style;
                var styles = 'alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient'.split(' ');
                for (var i = 0; i < styles.length; i++) {
                    if (styles[i] in div) return true;
                }
            }(),

            observer: function () {
                return 'MutationObserver' in window || 'WebkitMutationObserver' in window;
            }(),

            passiveListener: function () {
                var supportsPassive = false;
                try {
                    var opts = Object.defineProperty({}, 'passive', {
                        get: function get() {
                            supportsPassive = true;
                        }
                    });
                    window.addEventListener('testPassiveListener', null, opts);
                } catch (e) {}
                return supportsPassive;
            }(),

            gestures: function () {
                return 'ongesturestart' in window;
            }()
        },
        /*==================================================
        Plugins
        ====================================================*/
        plugins: {}
    };

    /*===========================
    Dom7 Library
    ===========================*/
    var Dom7 = function () {
        var Dom7 = function Dom7(arr) {
            var _this = this,
                i = 0;
            // Create array-like object
            for (i = 0; i < arr.length; i++) {
                _this[i] = arr[i];
            }
            _this.length = arr.length;
            // Return collection with methods
            return this;
        };
        var $ = function $(selector, context) {
            var arr = [],
                i = 0;
            if (selector && !context) {
                if (selector instanceof Dom7) {
                    return selector;
                }
            }
            if (selector) {
                // String
                if (typeof selector === 'string') {
                    var els,
                        tempParent,
                        html = selector.trim();
                    if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
                        var toCreate = 'div';
                        if (html.indexOf('<li') === 0) toCreate = 'ul';
                        if (html.indexOf('<tr') === 0) toCreate = 'tbody';
                        if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) toCreate = 'tr';
                        if (html.indexOf('<tbody') === 0) toCreate = 'table';
                        if (html.indexOf('<option') === 0) toCreate = 'select';
                        tempParent = document.createElement(toCreate);
                        tempParent.innerHTML = selector;
                        for (i = 0; i < tempParent.childNodes.length; i++) {
                            arr.push(tempParent.childNodes[i]);
                        }
                    } else {
                        if (!context && selector[0] === '#' && !selector.match(/[ .<>:~]/)) {
                            // Pure ID selector
                            els = [document.getElementById(selector.split('#')[1])];
                        } else {
                            // Other selectors
                            els = (context || document).querySelectorAll(selector);
                        }
                        for (i = 0; i < els.length; i++) {
                            if (els[i]) arr.push(els[i]);
                        }
                    }
                }
                // Node/element
                else if (selector.nodeType || selector === window || selector === document) {
                        arr.push(selector);
                    }
                    //Array of elements or instance of Dom
                    else if (selector.length > 0 && selector[0].nodeType) {
                            for (i = 0; i < selector.length; i++) {
                                arr.push(selector[i]);
                            }
                        }
            }
            return new Dom7(arr);
        };
        Dom7.prototype = {
            // Classes and attriutes
            addClass: function addClass(className) {
                if (typeof className === 'undefined') {
                    return this;
                }
                var classes = className.split(' ');
                for (var i = 0; i < classes.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        this[j].classList.add(classes[i]);
                    }
                }
                return this;
            },
            removeClass: function removeClass(className) {
                var classes = className.split(' ');
                for (var i = 0; i < classes.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        this[j].classList.remove(classes[i]);
                    }
                }
                return this;
            },
            hasClass: function hasClass(className) {
                if (!this[0]) return false;else return this[0].classList.contains(className);
            },
            toggleClass: function toggleClass(className) {
                var classes = className.split(' ');
                for (var i = 0; i < classes.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        this[j].classList.toggle(classes[i]);
                    }
                }
                return this;
            },
            attr: function attr(attrs, value) {
                if (arguments.length === 1 && typeof attrs === 'string') {
                    // Get attr
                    if (this[0]) return this[0].getAttribute(attrs);else return undefined;
                } else {
                    // Set attrs
                    for (var i = 0; i < this.length; i++) {
                        if (arguments.length === 2) {
                            // String
                            this[i].setAttribute(attrs, value);
                        } else {
                            // Object
                            for (var attrName in attrs) {
                                this[i][attrName] = attrs[attrName];
                                this[i].setAttribute(attrName, attrs[attrName]);
                            }
                        }
                    }
                    return this;
                }
            },
            removeAttr: function removeAttr(attr) {
                for (var i = 0; i < this.length; i++) {
                    this[i].removeAttribute(attr);
                }
                return this;
            },
            data: function data(key, value) {
                if (typeof value === 'undefined') {
                    // Get value
                    if (this[0]) {
                        var dataKey = this[0].getAttribute('data-' + key);
                        if (dataKey) return dataKey;else if (this[0].dom7ElementDataStorage && key in this[0].dom7ElementDataStorage) return this[0].dom7ElementDataStorage[key];else return undefined;
                    } else return undefined;
                } else {
                    // Set value
                    for (var i = 0; i < this.length; i++) {
                        var el = this[i];
                        if (!el.dom7ElementDataStorage) el.dom7ElementDataStorage = {};
                        el.dom7ElementDataStorage[key] = value;
                    }
                    return this;
                }
            },
            // Transforms
            transform: function transform(_transform) {
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = _transform;
                }
                return this;
            },
            transition: function transition(duration) {
                if (typeof duration !== 'string') {
                    duration = duration + 'ms';
                }
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration;
                }
                return this;
            },
            //Events
            on: function on(eventName, targetSelector, listener, capture) {
                function handleLiveEvent(e) {
                    var target = e.target;
                    if ($(target).is(targetSelector)) listener.call(target, e);else {
                        var parents = $(target).parents();
                        for (var k = 0; k < parents.length; k++) {
                            if ($(parents[k]).is(targetSelector)) listener.call(parents[k], e);
                        }
                    }
                }
                var events = eventName.split(' ');
                var i, j;
                for (i = 0; i < this.length; i++) {
                    if (typeof targetSelector === 'function' || targetSelector === false) {
                        // Usual events
                        if (typeof targetSelector === 'function') {
                            listener = arguments[1];
                            capture = arguments[2] || false;
                        }
                        for (j = 0; j < events.length; j++) {
                            this[i].addEventListener(events[j], listener, capture);
                        }
                    } else {
                        //Live events
                        for (j = 0; j < events.length; j++) {
                            if (!this[i].dom7LiveListeners) this[i].dom7LiveListeners = [];
                            this[i].dom7LiveListeners.push({ listener: listener, liveListener: handleLiveEvent });
                            this[i].addEventListener(events[j], handleLiveEvent, capture);
                        }
                    }
                }

                return this;
            },
            off: function off(eventName, targetSelector, listener, capture) {
                var events = eventName.split(' ');
                for (var i = 0; i < events.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        if (typeof targetSelector === 'function' || targetSelector === false) {
                            // Usual events
                            if (typeof targetSelector === 'function') {
                                listener = arguments[1];
                                capture = arguments[2] || false;
                            }
                            this[j].removeEventListener(events[i], listener, capture);
                        } else {
                            // Live event
                            if (this[j].dom7LiveListeners) {
                                for (var k = 0; k < this[j].dom7LiveListeners.length; k++) {
                                    if (this[j].dom7LiveListeners[k].listener === listener) {
                                        this[j].removeEventListener(events[i], this[j].dom7LiveListeners[k].liveListener, capture);
                                    }
                                }
                            }
                        }
                    }
                }
                return this;
            },
            once: function once(eventName, targetSelector, listener, capture) {
                var dom = this;
                if (typeof targetSelector === 'function') {
                    targetSelector = false;
                    listener = arguments[1];
                    capture = arguments[2];
                }
                function proxy(e) {
                    listener(e);
                    dom.off(eventName, targetSelector, proxy, capture);
                }
                dom.on(eventName, targetSelector, proxy, capture);
            },
            trigger: function trigger(eventName, eventData) {
                for (var i = 0; i < this.length; i++) {
                    var evt;
                    try {
                        evt = new window.CustomEvent(eventName, { detail: eventData, bubbles: true, cancelable: true });
                    } catch (e) {
                        evt = document.createEvent('Event');
                        evt.initEvent(eventName, true, true);
                        evt.detail = eventData;
                    }
                    this[i].dispatchEvent(evt);
                }
                return this;
            },
            transitionEnd: function transitionEnd(callback) {
                var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
                    i,
                    j,
                    dom = this;
                function fireCallBack(e) {
                    /*jshint validthis:true */
                    if (e.target !== this) return;
                    callback.call(this, e);
                    for (i = 0; i < events.length; i++) {
                        dom.off(events[i], fireCallBack);
                    }
                }
                if (callback) {
                    for (i = 0; i < events.length; i++) {
                        dom.on(events[i], fireCallBack);
                    }
                }
                return this;
            },
            // Sizing/Styles
            width: function width() {
                if (this[0] === window) {
                    return window.innerWidth;
                } else {
                    if (this.length > 0) {
                        return parseFloat(this.css('width'));
                    } else {
                        return null;
                    }
                }
            },
            outerWidth: function outerWidth(includeMargins) {
                if (this.length > 0) {
                    if (includeMargins) return this[0].offsetWidth + parseFloat(this.css('margin-right')) + parseFloat(this.css('margin-left'));else return this[0].offsetWidth;
                } else return null;
            },
            height: function height() {
                if (this[0] === window) {
                    return window.innerHeight;
                } else {
                    if (this.length > 0) {
                        return parseFloat(this.css('height'));
                    } else {
                        return null;
                    }
                }
            },
            outerHeight: function outerHeight(includeMargins) {
                if (this.length > 0) {
                    if (includeMargins) return this[0].offsetHeight + parseFloat(this.css('margin-top')) + parseFloat(this.css('margin-bottom'));else return this[0].offsetHeight;
                } else return null;
            },
            offset: function offset() {
                if (this.length > 0) {
                    var el = this[0];
                    var box = el.getBoundingClientRect();
                    var body = document.body;
                    var clientTop = el.clientTop || body.clientTop || 0;
                    var clientLeft = el.clientLeft || body.clientLeft || 0;
                    var scrollTop = window.pageYOffset || el.scrollTop;
                    var scrollLeft = window.pageXOffset || el.scrollLeft;
                    return {
                        top: box.top + scrollTop - clientTop,
                        left: box.left + scrollLeft - clientLeft
                    };
                } else {
                    return null;
                }
            },
            css: function css(props, value) {
                var i;
                if (arguments.length === 1) {
                    if (typeof props === 'string') {
                        if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(props);
                    } else {
                        for (i = 0; i < this.length; i++) {
                            for (var prop in props) {
                                this[i].style[prop] = props[prop];
                            }
                        }
                        return this;
                    }
                }
                if (arguments.length === 2 && typeof props === 'string') {
                    for (i = 0; i < this.length; i++) {
                        this[i].style[props] = value;
                    }
                    return this;
                }
                return this;
            },

            //Dom manipulation
            each: function each(callback) {
                for (var i = 0; i < this.length; i++) {
                    callback.call(this[i], i, this[i]);
                }
                return this;
            },
            html: function html(_html) {
                if (typeof _html === 'undefined') {
                    return this[0] ? this[0].innerHTML : undefined;
                } else {
                    for (var i = 0; i < this.length; i++) {
                        this[i].innerHTML = _html;
                    }
                    return this;
                }
            },
            text: function text(_text) {
                if (typeof _text === 'undefined') {
                    if (this[0]) {
                        return this[0].textContent.trim();
                    } else return null;
                } else {
                    for (var i = 0; i < this.length; i++) {
                        this[i].textContent = _text;
                    }
                    return this;
                }
            },
            is: function is(selector) {
                if (!this[0]) return false;
                var compareWith, i;
                if (typeof selector === 'string') {
                    var el = this[0];
                    if (el === document) return selector === document;
                    if (el === window) return selector === window;

                    if (el.matches) return el.matches(selector);else if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);else if (el.mozMatchesSelector) return el.mozMatchesSelector(selector);else if (el.msMatchesSelector) return el.msMatchesSelector(selector);else {
                        compareWith = $(selector);
                        for (i = 0; i < compareWith.length; i++) {
                            if (compareWith[i] === this[0]) return true;
                        }
                        return false;
                    }
                } else if (selector === document) return this[0] === document;else if (selector === window) return this[0] === window;else {
                    if (selector.nodeType || selector instanceof Dom7) {
                        compareWith = selector.nodeType ? [selector] : selector;
                        for (i = 0; i < compareWith.length; i++) {
                            if (compareWith[i] === this[0]) return true;
                        }
                        return false;
                    }
                    return false;
                }
            },
            index: function index() {
                if (this[0]) {
                    var child = this[0];
                    var i = 0;
                    while ((child = child.previousSibling) !== null) {
                        if (child.nodeType === 1) i++;
                    }
                    return i;
                } else return undefined;
            },
            eq: function eq(index) {
                if (typeof index === 'undefined') return this;
                var length = this.length;
                var returnIndex;
                if (index > length - 1) {
                    return new Dom7([]);
                }
                if (index < 0) {
                    returnIndex = length + index;
                    if (returnIndex < 0) return new Dom7([]);else return new Dom7([this[returnIndex]]);
                }
                return new Dom7([this[index]]);
            },
            append: function append(newChild) {
                var i, j;
                for (i = 0; i < this.length; i++) {
                    if (typeof newChild === 'string') {
                        var tempDiv = document.createElement('div');
                        tempDiv.innerHTML = newChild;
                        while (tempDiv.firstChild) {
                            this[i].appendChild(tempDiv.firstChild);
                        }
                    } else if (newChild instanceof Dom7) {
                        for (j = 0; j < newChild.length; j++) {
                            this[i].appendChild(newChild[j]);
                        }
                    } else {
                        this[i].appendChild(newChild);
                    }
                }
                return this;
            },
            prepend: function prepend(newChild) {
                var i, j;
                for (i = 0; i < this.length; i++) {
                    if (typeof newChild === 'string') {
                        var tempDiv = document.createElement('div');
                        tempDiv.innerHTML = newChild;
                        for (j = tempDiv.childNodes.length - 1; j >= 0; j--) {
                            this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
                        }
                        // this[i].insertAdjacentHTML('afterbegin', newChild);
                    } else if (newChild instanceof Dom7) {
                        for (j = 0; j < newChild.length; j++) {
                            this[i].insertBefore(newChild[j], this[i].childNodes[0]);
                        }
                    } else {
                        this[i].insertBefore(newChild, this[i].childNodes[0]);
                    }
                }
                return this;
            },
            insertBefore: function insertBefore(selector) {
                var before = $(selector);
                for (var i = 0; i < this.length; i++) {
                    if (before.length === 1) {
                        before[0].parentNode.insertBefore(this[i], before[0]);
                    } else if (before.length > 1) {
                        for (var j = 0; j < before.length; j++) {
                            before[j].parentNode.insertBefore(this[i].cloneNode(true), before[j]);
                        }
                    }
                }
            },
            insertAfter: function insertAfter(selector) {
                var after = $(selector);
                for (var i = 0; i < this.length; i++) {
                    if (after.length === 1) {
                        after[0].parentNode.insertBefore(this[i], after[0].nextSibling);
                    } else if (after.length > 1) {
                        for (var j = 0; j < after.length; j++) {
                            after[j].parentNode.insertBefore(this[i].cloneNode(true), after[j].nextSibling);
                        }
                    }
                }
            },
            next: function next(selector) {
                if (this.length > 0) {
                    if (selector) {
                        if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) return new Dom7([this[0].nextElementSibling]);else return new Dom7([]);
                    } else {
                        if (this[0].nextElementSibling) return new Dom7([this[0].nextElementSibling]);else return new Dom7([]);
                    }
                } else return new Dom7([]);
            },
            nextAll: function nextAll(selector) {
                var nextEls = [];
                var el = this[0];
                if (!el) return new Dom7([]);
                while (el.nextElementSibling) {
                    var next = el.nextElementSibling;
                    if (selector) {
                        if ($(next).is(selector)) nextEls.push(next);
                    } else nextEls.push(next);
                    el = next;
                }
                return new Dom7(nextEls);
            },
            prev: function prev(selector) {
                if (this.length > 0) {
                    if (selector) {
                        if (this[0].previousElementSibling && $(this[0].previousElementSibling).is(selector)) return new Dom7([this[0].previousElementSibling]);else return new Dom7([]);
                    } else {
                        if (this[0].previousElementSibling) return new Dom7([this[0].previousElementSibling]);else return new Dom7([]);
                    }
                } else return new Dom7([]);
            },
            prevAll: function prevAll(selector) {
                var prevEls = [];
                var el = this[0];
                if (!el) return new Dom7([]);
                while (el.previousElementSibling) {
                    var prev = el.previousElementSibling;
                    if (selector) {
                        if ($(prev).is(selector)) prevEls.push(prev);
                    } else prevEls.push(prev);
                    el = prev;
                }
                return new Dom7(prevEls);
            },
            parent: function parent(selector) {
                var parents = [];
                for (var i = 0; i < this.length; i++) {
                    if (selector) {
                        if ($(this[i].parentNode).is(selector)) parents.push(this[i].parentNode);
                    } else {
                        parents.push(this[i].parentNode);
                    }
                }
                return $($.unique(parents));
            },
            parents: function parents(selector) {
                var parents = [];
                for (var i = 0; i < this.length; i++) {
                    var parent = this[i].parentNode;
                    while (parent) {
                        if (selector) {
                            if ($(parent).is(selector)) parents.push(parent);
                        } else {
                            parents.push(parent);
                        }
                        parent = parent.parentNode;
                    }
                }
                return $($.unique(parents));
            },
            find: function find(selector) {
                var foundElements = [];
                for (var i = 0; i < this.length; i++) {
                    var found = this[i].querySelectorAll(selector);
                    for (var j = 0; j < found.length; j++) {
                        foundElements.push(found[j]);
                    }
                }
                return new Dom7(foundElements);
            },
            children: function children(selector) {
                var children = [];
                for (var i = 0; i < this.length; i++) {
                    var childNodes = this[i].childNodes;

                    for (var j = 0; j < childNodes.length; j++) {
                        if (!selector) {
                            if (childNodes[j].nodeType === 1) children.push(childNodes[j]);
                        } else {
                            if (childNodes[j].nodeType === 1 && $(childNodes[j]).is(selector)) children.push(childNodes[j]);
                        }
                    }
                }
                return new Dom7($.unique(children));
            },
            remove: function remove() {
                for (var i = 0; i < this.length; i++) {
                    if (this[i].parentNode) this[i].parentNode.removeChild(this[i]);
                }
                return this;
            },
            add: function add() {
                var dom = this;
                var i, j;
                for (i = 0; i < arguments.length; i++) {
                    var toAdd = $(arguments[i]);
                    for (j = 0; j < toAdd.length; j++) {
                        dom[dom.length] = toAdd[j];
                        dom.length++;
                    }
                }
                return dom;
            }
        };
        $.fn = Dom7.prototype;
        $.unique = function (arr) {
            var unique = [];
            for (var i = 0; i < arr.length; i++) {
                if (unique.indexOf(arr[i]) === -1) unique.push(arr[i]);
            }
            return unique;
        };

        return $;
    }();

    /*===========================
     Get Dom libraries
     ===========================*/
    var swiperDomPlugins = ['jQuery', 'Zepto', 'Dom7'];
    for (var i = 0; i < swiperDomPlugins.length; i++) {
        if (window[swiperDomPlugins[i]]) {
            addLibraryPlugin(window[swiperDomPlugins[i]]);
        }
    }
    // Required DOM Plugins
    var domLib;
    if (typeof Dom7 === 'undefined') {
        domLib = window.Dom7 || window.Zepto || window.jQuery;
    } else {
        domLib = Dom7;
    }

    /*===========================
    Add .swiper plugin from Dom libraries
    ===========================*/
    function addLibraryPlugin(lib) {
        lib.fn.swiper = function (params) {
            var firstInstance;
            lib(this).each(function () {
                var s = new Swiper(this, params);
                if (!firstInstance) firstInstance = s;
            });
            return firstInstance;
        };
    }

    if (domLib) {
        if (!('transitionEnd' in domLib.fn)) {
            domLib.fn.transitionEnd = function (callback) {
                var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
                    i,
                    j,
                    dom = this;
                function fireCallBack(e) {
                    /*jshint validthis:true */
                    if (e.target !== this) return;
                    callback.call(this, e);
                    for (i = 0; i < events.length; i++) {
                        dom.off(events[i], fireCallBack);
                    }
                }
                if (callback) {
                    for (i = 0; i < events.length; i++) {
                        dom.on(events[i], fireCallBack);
                    }
                }
                return this;
            };
        }
        if (!('transform' in domLib.fn)) {
            domLib.fn.transform = function (transform) {
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform;
                }
                return this;
            };
        }
        if (!('transition' in domLib.fn)) {
            domLib.fn.transition = function (duration) {
                if (typeof duration !== 'string') {
                    duration = duration + 'ms';
                }
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration;
                }
                return this;
            };
        }
        if (!('outerWidth' in domLib.fn)) {
            domLib.fn.outerWidth = function (includeMargins) {
                if (this.length > 0) {
                    if (includeMargins) return this[0].offsetWidth + parseFloat(this.css('margin-right')) + parseFloat(this.css('margin-left'));else return this[0].offsetWidth;
                } else return null;
            };
        }
    }

    window.Swiper = Swiper;
})();

/*===========================
Swiper AMD Export
===========================*/
if (true) {
    module.exports = window.Swiper;
} else if (typeof define === 'function' && define.amd) {
    define([], function () {
        'use strict';

        return window.Swiper;
    });
}

//# sourceMappingURL=maps/swiper.js.map

/***/ }),

/***/ 828:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ShipDetailsComponentModernization; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames__ = __webpack_require__(759);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__appUI_containers_infos_component__ = __webpack_require__(758);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__appUI_components_stat__ = __webpack_require__(770);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__appUtils_get_value__ = __webpack_require__(777);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_sp_i18n__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_sp_css_import__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__modernization_less__ = __webpack_require__(825);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__modernization_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__modernization_less__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }













var stats = ['fire', 'torpedo', 'aa', 'armor'];

// @connect()
var ShipDetailsComponentModernization = (_dec = Object(__WEBPACK_IMPORTED_MODULE_6_sp_css_import__["a" /* ImportStyle */])(__WEBPACK_IMPORTED_MODULE_7__modernization_less___default.a), _dec(_class = function (_React$Component) {
    _inherits(ShipDetailsComponentModernization, _React$Component);

    function ShipDetailsComponentModernization() {
        _classCallCheck(this, ShipDetailsComponentModernization);

        return _possibleConstructorReturn(this, (ShipDetailsComponentModernization.__proto__ || Object.getPrototypeOf(ShipDetailsComponentModernization)).apply(this, arguments));
    }

    _createClass(ShipDetailsComponentModernization, [{
        key: 'renderItem',
        value: function renderItem(stat, index, value) {
            if (Array.isArray(value)) value = Object(__WEBPACK_IMPORTED_MODULE_4__appUtils_get_value__["a" /* default */])(this.props.ship.modernization[index]);
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_3__appUI_components_stat__["a" /* default */],
                {
                    className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()(['item', {
                        disabled: !value
                    }]),
                    key: index,
                    stat: stat
                },
                '+',
                value
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var hasModernization = Array.isArray(this.props.ship.modernization);
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_2__appUI_containers_infos_component__["a" /* default */],
                { className: this.props.className, title: Object(__WEBPACK_IMPORTED_MODULE_5_sp_i18n__["a" /* default */])("ship_details.modernization") },
                !hasModernization && Object(__WEBPACK_IMPORTED_MODULE_5_sp_i18n__["a" /* default */])("none"),
                hasModernization && stats.map(this.renderItem.bind(this)),
                this.props.ship.id === 163 && this.renderItem('luck', undefined, 1.2),
                this.props.ship.id === 402 && this.renderItem('luck', undefined, 1.6)
            );
        }
    }]);

    return ShipDetailsComponentModernization;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class);


/***/ }),

/***/ 829:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ShipDetailsComponentSlotEquipments; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__appUtils_get_pic__ = __webpack_require__(760);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__appUI_components_link__ = __webpack_require__(768);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__appUI_components_flag_navy__ = __webpack_require__(778);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__appUI_containers_infos_component__ = __webpack_require__(758);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__appUI_components_stat__ = __webpack_require__(770);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_sp_i18n__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_sp_css_import__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__quickfacts_less__ = __webpack_require__(911);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__quickfacts_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__quickfacts_less__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






// import Icon from '@appUI/components/icon'





// import db from '@appLogic/database'




// @connect()
var ShipDetailsComponentSlotEquipments = (_dec = Object(__WEBPACK_IMPORTED_MODULE_7_sp_css_import__["a" /* ImportStyle */])(__WEBPACK_IMPORTED_MODULE_8__quickfacts_less___default.a), _dec(_class = function (_React$Component) {
    _inherits(ShipDetailsComponentSlotEquipments, _React$Component);

    function ShipDetailsComponentSlotEquipments() {
        _classCallCheck(this, ShipDetailsComponentSlotEquipments);

        return _possibleConstructorReturn(this, (ShipDetailsComponentSlotEquipments.__proto__ || Object.getPrototypeOf(ShipDetailsComponentSlotEquipments)).apply(this, arguments));
    }

    _createClass(ShipDetailsComponentSlotEquipments, [{
        key: 'render',
        value: function render() {
            var ship = this.props.ship;
            //title={translate("ship_details.quickfacts")}
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_4__appUI_containers_infos_component__["a" /* default */],
                { className: this.props.className },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    __WEBPACK_IMPORTED_MODULE_5__appUI_components_stat__["a" /* default */],
                    {
                        className: 'item',
                        title: Object(__WEBPACK_IMPORTED_MODULE_6_sp_i18n__["a" /* default */])("ship_details.navy")
                    },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__appUI_components_flag_navy__["a" /* default */], { className: 'flag-navy', navy: ship._navy }),
                    ship._navyName
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    __WEBPACK_IMPORTED_MODULE_5__appUI_components_stat__["a" /* default */],
                    {
                        className: 'item',
                        title: Object(__WEBPACK_IMPORTED_MODULE_6_sp_i18n__["a" /* default */])("ship_details.cv")
                    },
                    ship._cv && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        __WEBPACK_IMPORTED_MODULE_2__appUI_components_link__["a" /* default */],
                        { to: '/entities/' + ship.getRel('cv') },
                        ship._cv
                    ),
                    !ship._cv && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'span',
                        { className: 'unknown' },
                        '?'
                    )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    __WEBPACK_IMPORTED_MODULE_5__appUI_components_stat__["a" /* default */],
                    {
                        className: 'item',
                        title: Object(__WEBPACK_IMPORTED_MODULE_6_sp_i18n__["a" /* default */])("ship_details.illustrator")
                    },
                    ship._illustrator && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        __WEBPACK_IMPORTED_MODULE_2__appUI_components_link__["a" /* default */],
                        { to: '/entities/' + ship.getRel('illustrator') },
                        ship._illustrator
                    ),
                    !ship._illustrator && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'span',
                        { className: 'unknown' },
                        '?'
                    )
                )
            );
        }
    }]);

    return ShipDetailsComponentSlotEquipments;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class);


/***/ }),

/***/ 830:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ShipDetailsComponentRemodels; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames__ = __webpack_require__(759);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_check_css_prop__ = __webpack_require__(761);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_check_css_prop___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_check_css_prop__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__appUI_components_link_ship_jsx__ = __webpack_require__(772);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__appUI_components_icon__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__appUI_containers_infos_component__ = __webpack_require__(758);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_sp_i18n__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__appUtils_get_ship_js__ = __webpack_require__(766);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__appUtils_get_pic_js__ = __webpack_require__(760);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_sp_css_import__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__remodels_less__ = __webpack_require__(912);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__remodels_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__remodels_less__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
















// @connect()
var ShipDetailsComponentRemodels = (_dec = Object(__WEBPACK_IMPORTED_MODULE_9_sp_css_import__["a" /* ImportStyle */])(__WEBPACK_IMPORTED_MODULE_10__remodels_less___default.a), _dec(_class = function (_React$Component) {
    _inherits(ShipDetailsComponentRemodels, _React$Component);

    function ShipDetailsComponentRemodels() {
        _classCallCheck(this, ShipDetailsComponentRemodels);

        return _possibleConstructorReturn(this, (ShipDetailsComponentRemodels.__proto__ || Object.getPrototypeOf(ShipDetailsComponentRemodels)).apply(this, arguments));
    }

    _createClass(ShipDetailsComponentRemodels, [{
        key: 'renderSeries',
        value: function renderSeries(current, index, series) {
            var ship = Object(__WEBPACK_IMPORTED_MODULE_7__appUtils_get_ship_js__["a" /* default */])(current.id);
            var hasIcon = index > 0 && (series[index - 1].next_blueprint === 'on' || series[index - 1].next_catapult === 'on');
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_3__appUI_components_link_ship_jsx__["a" /* default */],
                {
                    className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()(['item', {
                        'on': current.id === this.props.ship.id,
                        'is-has-icon': hasIcon,
                        'is-switchable': index > 0 && series[index - 1].next_loop === 'on',
                        'is-need-blueprint': index > 0 && series[index - 1].next_blueprint === 'on',
                        'is-need-catapult': index > 0 && series[index - 1].next_catapult === 'on'
                    }]),
                    key: index
                    // to={`/ships/${current.id}`}
                    , ship: ship,
                    navy: true,
                    name: false,
                    pic: false,
                    extraIllust: true
                },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'span',
                    { className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()(['lvl', {
                            'is-initial': index <= 0
                        }]) },
                    index > 0 ? series[index - 1].next_lvl : Object(__WEBPACK_IMPORTED_MODULE_6_sp_i18n__["a" /* default */])('ship_details.remodel_initial'),
                    index > 0 && series[index - 1].next_catapult === 'on' && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span', { className: 'icon icon-catapult' }),
                    index > 0 && series[index - 1].next_blueprint === 'on' && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span', { className: 'icon icon-blueprint' })
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span', { className: 'pic', style: {
                        backgroundImage: 'url(' + Object(__WEBPACK_IMPORTED_MODULE_8__appUtils_get_pic_js__["a" /* default */])(ship, __WEBPACK_IMPORTED_MODULE_2_check_css_prop___default()('mask') ? '0' : '0-1') + ')'
                    } }),
                index > 0 && series[index - 1].next_loop === 'on' && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__appUI_components_icon__["a" /* default */], { icon: 'loop', className: 'icon-switchable' })
            );
        }
    }, {
        key: 'render',
        value: function render() {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_5__appUI_containers_infos_component__["a" /* default */],
                { className: this.props.className, title: Object(__WEBPACK_IMPORTED_MODULE_6_sp_i18n__["a" /* default */])("ship_details.remodels") },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'container' },
                    this.props.ship._series.map(this.renderSeries.bind(this))
                )
            );
        }
    }]);

    return ShipDetailsComponentRemodels;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class);


/***/ }),

/***/ 831:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ShipDetailsComponentSlotEquipments; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames__ = __webpack_require__(759);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__appUI_containers_infos_component__ = __webpack_require__(758);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__appUI_components_icon_equipment__ = __webpack_require__(767);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_sp_i18n__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__appLogic_database__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__appUtils_times__ = __webpack_require__(811);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_sp_css_import__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__slot_equipments_less__ = __webpack_require__(915);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__slot_equipments_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__slot_equipments_less__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }















// @connect()
var ShipDetailsComponentSlotEquipments = (_dec = Object(__WEBPACK_IMPORTED_MODULE_8_sp_css_import__["a" /* ImportStyle */])(__WEBPACK_IMPORTED_MODULE_9__slot_equipments_less___default.a), _dec(_class = function (_React$Component) {
    _inherits(ShipDetailsComponentSlotEquipments, _React$Component);

    function ShipDetailsComponentSlotEquipments() {
        _classCallCheck(this, ShipDetailsComponentSlotEquipments);

        return _possibleConstructorReturn(this, (ShipDetailsComponentSlotEquipments.__proto__ || Object.getPrototypeOf(ShipDetailsComponentSlotEquipments)).apply(this, arguments));
    }

    _createClass(ShipDetailsComponentSlotEquipments, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var renderArr = [];
            Object(__WEBPACK_IMPORTED_MODULE_7__appUtils_times__["a" /* default */])(4)(function (index) {
                var slot = _this2.props.ship.slot[index];
                var hasSlot = typeof slot !== 'undefined';
                var equipmentId = hasSlot ? _this2.props.ship.equip[index] : undefined;
                var equipment = equipmentId && __WEBPACK_IMPORTED_MODULE_6__appLogic_database__["a" /* default */].equipments[equipmentId];
                renderArr.push(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'dl',
                    _defineProperty({ key: index, className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()(['item', {
                            disabled: !hasSlot,
                            "is-empty": !equipmentId
                        }]) }, 'className', "item" + (!hasSlot ? ' disabled' : '')),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'dt',
                        { className: 'slot' },
                        hasSlot ? slot : "-"
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'dd',
                        { className: 'equipment' },
                        equipmentId && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            __WEBPACK_IMPORTED_MODULE_1_react_router__["b" /* Link */],
                            { to: '/equipments/' + equipmentId, className: 'equipment-name' },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__appUI_components_icon_equipment__["a" /* default */], { className: 'icon', icon: equipment._icon }),
                            equipment._name
                        ),
                        !equipmentId && hasSlot && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            'span',
                            { className: 'equipment-name' },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__appUI_components_icon_equipment__["a" /* default */], { className: 'icon' }),
                            Object(__WEBPACK_IMPORTED_MODULE_5_sp_i18n__["a" /* default */])("ship_details.emptyslot")
                        ),
                        !equipmentId && !hasSlot && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            'span',
                            { className: 'equipment-name' },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__appUI_components_icon_equipment__["a" /* default */], { className: 'icon' }),
                            Object(__WEBPACK_IMPORTED_MODULE_5_sp_i18n__["a" /* default */])("ship_details.noslot")
                        )
                    )
                ));
            });
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_3__appUI_containers_infos_component__["a" /* default */],
                { className: this.props.className, title: Object(__WEBPACK_IMPORTED_MODULE_5_sp_i18n__["a" /* default */])("ship_details.slot_equipments") },
                renderArr
            );
        }
    }]);

    return ShipDetailsComponentSlotEquipments;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class);


/***/ }),

/***/ 832:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ShipDetailsComponentStats; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames__ = __webpack_require__(759);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_kckit__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_kckit___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_kckit__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__appUI_containers_infos_component__ = __webpack_require__(758);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__appUI_components_stat__ = __webpack_require__(770);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__appUtils_get_value__ = __webpack_require__(777);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__appLogic_preferences__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_sp_i18n__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_sp_css_import__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__stats_less__ = __webpack_require__(916);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__stats_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__stats_less__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
















var stats = ['fire', 'torpedo', 'aa', 'asw', 'hp', 'armor', 'evasion', 'carry', 'speed', 'range', 'los', 'luck', 'consum.fuel', 'consum.ammo'];

var percentage = function percentage(number, max) {
    return number / max * 100 + '%';
};

// @connect()
var ShipDetailsComponentStats = (_dec = Object(__WEBPACK_IMPORTED_MODULE_8_sp_css_import__["a" /* ImportStyle */])(__WEBPACK_IMPORTED_MODULE_9__stats_less___default.a), _dec(_class = function (_React$Component) {
    _inherits(ShipDetailsComponentStats, _React$Component);

    function ShipDetailsComponentStats(props) {
        _classCallCheck(this, ShipDetailsComponentStats);

        var _this = _possibleConstructorReturn(this, (ShipDetailsComponentStats.__proto__ || Object.getPrototypeOf(ShipDetailsComponentStats)).call(this, props));

        var defaultLv = Math.max(__WEBPACK_IMPORTED_MODULE_6__appLogic_preferences__["a" /* default */].shipDetailsStatLevel || 99, props.ship._minLv);
        _this.state = {
            lv: defaultLv,
            lvInput: defaultLv
        };
        return _this;
    }

    _createClass(ShipDetailsComponentStats, [{
        key: 'setLv',
        value: function setLv(lv) {
            if (lv != this.state.lv) {
                this.setState({
                    lv: lv
                });
                this._input.value = lv;
                this.onLevelChange(lv);
            }
        }
    }, {
        key: 'onInputChange',
        value: function onInputChange(evt) {
            var newLv = Math.min(Math.max(evt.target.value, this.props.ship._minLv), __WEBPACK_IMPORTED_MODULE_2_kckit__["maxShipLv"]);
            if (newLv != this.state.lv) {
                this.setState({
                    lv: newLv
                });
                this.onLevelChange(newLv);
            }
            evt.target.value = evt.target.value;
        }
    }, {
        key: 'onInputBlur',
        value: function onInputBlur(evt) {
            if (evt.target.value < this.props.ship._minLv) evt.target.value = this.props.ship._minLv;else if (evt.target.value > __WEBPACK_IMPORTED_MODULE_2_kckit__["maxShipLv"]) evt.target.value = __WEBPACK_IMPORTED_MODULE_2_kckit__["maxShipLv"];
        }
    }, {
        key: 'onInputKeyDown',
        value: function onInputKeyDown(evt) {
            switch (evt.nativeEvent.keyCode) {
                case 27: // esc
                case 13:
                    // enter
                    evt.target.blur();
            }
        }
    }, {
        key: 'onRangeChange',
        value: function onRangeChange(evt) {
            var newLv = evt.target.value;
            if (newLv < this.props.ship._minLv) {
                evt.target.value = this.props.ship._minLv;
                newLv = this.props.ship._minLv;
            }
            if (newLv != this.state.lv) {
                this.setState({
                    lv: newLv
                });
                this.onLevelChange(newLv);
            }
            this._input.value = newLv;
        }
    }, {
        key: 'onLevelChange',
        value: function onLevelChange(newLv) {
            __WEBPACK_IMPORTED_MODULE_6__appLogic_preferences__["a" /* default */].shipDetailsStatLevel = newLv;
        }
    }, {
        key: 'renderStat',
        value: function renderStat(stat, index) {
            var isConsume = stat.includes('consum.');
            var value = isConsume ? 0 - this.props.ship.getAttribute(stat, this.state.lv) : Object(__WEBPACK_IMPORTED_MODULE_5__appUtils_get_value__["a" /* default */])(this.props.ship.getAttribute(stat, this.state.lv));
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_4__appUI_components_stat__["a" /* default */],
                {
                    type: Object(__WEBPACK_IMPORTED_MODULE_7_sp_i18n__["a" /* default */])('stat.' + stat),
                    key: index,
                    className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()(["stat", {
                        "is-negative": isConsume,
                        "is-positive": !isConsume && value !== '-' && value !== '?' && !!value,
                        'disabled': value === '-'
                    }]),
                    stat: stat.replace('consum.', ''),
                    max: stat === 'luck' && this.props.ship.stat.luck_max,
                    disableResourceColor: true
                },
                value
            );
        }
    }, {
        key: 'renderTick',
        value: function renderTick(level, classNameSuffix) {
            var _this2 = this;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span', {
                className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()(['tick', 'tick-' + (classNameSuffix || level), {
                    'tick-align-left': level > 70 && level < 99,
                    'tick-highlight': this.state.lv > level
                }]),
                'data-level': level,
                style: {
                    // left: (level / (maxShipLv + 5) * 100) + '%'
                    left: percentage(level + 5, __WEBPACK_IMPORTED_MODULE_2_kckit__["maxShipLv"] + 10)
                },
                onClick: function onClick() {
                    return _this2.setLv(level);
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_3__appUI_containers_infos_component__["a" /* default */],
                { className: this.props.className, title: Object(__WEBPACK_IMPORTED_MODULE_7_sp_i18n__["a" /* default */])("ship_details.stats") },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'span',
                    { className: 'lv' },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', {
                        type: 'number',
                        className: 'lv-input',
                        defaultValue: this.state.lv,
                        min: this.props.ship._minLv,
                        max: __WEBPACK_IMPORTED_MODULE_2_kckit__["maxShipLv"],
                        onChange: this.onInputChange.bind(this),
                        onBlur: this.onInputBlur.bind(this),
                        onKeyDown: this.onInputKeyDown.bind(this),
                        ref: function ref(el) {
                            return _this3._input = el;
                        }
                    }),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'span',
                        { className: 'lv-text' },
                        this.state.lv
                    )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'span',
                    { className: 'slider' },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', {
                        type: 'range',
                        className: 'lv-slider',
                        value: this.state.lv,
                        min: '1',
                        max: __WEBPACK_IMPORTED_MODULE_2_kckit__["maxShipLv"],
                        onChange: this.onRangeChange.bind(this)
                    }),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span', { className: 'current', style: {
                            // left: (this.props.ship._minLv / maxShipLv * 100) + '%',
                            // right: ((maxShipLv - this.state.lv) / maxShipLv * 100) + '%'
                            left: percentage(this.props.ship._minLv <= 1 ? 0 : this.props.ship._minLv + 5, __WEBPACK_IMPORTED_MODULE_2_kckit__["maxShipLv"] + 10),
                            right: percentage(__WEBPACK_IMPORTED_MODULE_2_kckit__["maxShipLv"] - this.state.lv + 5, __WEBPACK_IMPORTED_MODULE_2_kckit__["maxShipLv"] + 10)
                        } }),
                    this.renderTick(this.props.ship._minLv, 'minlv'),
                    this.renderTick(99),
                    this.renderTick(__WEBPACK_IMPORTED_MODULE_2_kckit__["maxShipLv"], 'maxlv')
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'stats' },
                    stats.map(this.renderStat.bind(this))
                )
            );
        }
    }]);

    return ShipDetailsComponentStats;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class);


/***/ }),

/***/ 890:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return init; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return reset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return changeTab; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return changeIllust; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__redux_action_types_js__ = __webpack_require__(24);


var init = function init(id, initialState) {
    return {
        type: __WEBPACK_IMPORTED_MODULE_0__redux_action_types_js__["u" /* SHIPDETAILS_INIT */],
        id: id,
        initialState: initialState
    };
};

var reset = function reset(id, initialState) {
    return {
        type: __WEBPACK_IMPORTED_MODULE_0__redux_action_types_js__["v" /* SHIPDETAILS_RESET */],
        id: id,
        initialState: initialState
    };
};

var changeTab = function changeTab(id, tabIndex) {
    return {
        type: __WEBPACK_IMPORTED_MODULE_0__redux_action_types_js__["t" /* SHIPDETAILS_CHANGE_TAB */],
        id: id,
        tabIndex: tabIndex
    };
};

var changeIllust = function changeIllust(id, illustIndex) {
    return {
        type: __WEBPACK_IMPORTED_MODULE_0__redux_action_types_js__["s" /* SHIPDETAILS_CHANGE_ILLUSTRATION */],
        id: id,
        illustIndex: illustIndex
    };
};

/***/ }),

/***/ 891:
/***/ (function(module, exports) {

module.exports ={wrapper:'a10aaebf',css:'.a10aaebf .shipname-ja{display:block;height:1rem}.a10aaebf .shipclassnumber{background:rgba(169,193,205,.55);border-radius:.1rem;color:rgba(37,49,55,.8);display:inline-block;font-size:.6rem;height:.8rem;line-height:.8rem;margin:0 .4rem .2rem 0;padding:0 .25rem;vertical-align:text-top}.a10aaebf .shipname-ja~.shipclassnumber{margin-bottom:0}'}

/***/ }),

/***/ 892:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./availability.jsx": 893,
	"./capabilities.jsx": 894,
	"./commons/header.jsx": 816,
	"./components/aaci.jsx": 819,
	"./components/combat-special.jsx": 817,
	"./components/dismantle.jsx": 824,
	"./components/illust.jsx": 826,
	"./components/modernization.jsx": 828,
	"./components/oasw-calculator.jsx": 820,
	"./components/other-special.jsx": 818,
	"./components/quickfacts.jsx": 829,
	"./components/remodels.jsx": 830,
	"./components/slot-equipments.jsx": 831,
	"./components/speedup-calculator.jsx": 823,
	"./components/stats.jsx": 832,
	"./equipable.jsx": 917,
	"./infos.jsx": 921,
	"./voicelines.jsx": 923
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
webpackContext.id = 892;

/***/ }),

/***/ 893:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ShipDetailsContentAvailability; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__appUI_containers_infos_component__ = __webpack_require__(758);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_sp_i18n__ = __webpack_require__(64);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






// import db from '@appLogic/database'

// import { ImportStyle } from 'sp-css-import'
// import styles from './header.less'

// @connect()
// @ImportStyle(styles)

var ShipDetailsContentAvailability = function (_React$Component) {
    _inherits(ShipDetailsContentAvailability, _React$Component);

    function ShipDetailsContentAvailability() {
        _classCallCheck(this, ShipDetailsContentAvailability);

        return _possibleConstructorReturn(this, (ShipDetailsContentAvailability.__proto__ || Object.getPrototypeOf(ShipDetailsContentAvailability)).apply(this, arguments));
    }

    _createClass(ShipDetailsContentAvailability, [{
        key: 'render',
        value: function render() {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_1__appUI_containers_infos_component__["a" /* default */],
                null,
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
                    'p',
                    null,
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'i',
                        null,
                        'ShipDetailsContentAvailability'
                    )
                )
            );
        }
    }]);

    return ShipDetailsContentAvailability;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);



/***/ }),

/***/ 894:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ShipDetailsContentCapabilities; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_combat_special_jsx__ = __webpack_require__(817);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_other_special_jsx__ = __webpack_require__(818);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_aaci_jsx__ = __webpack_require__(819);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_oasw_calculator_jsx__ = __webpack_require__(820);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_speedup_calculator_jsx__ = __webpack_require__(823);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_sp_css_import__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__capabilities_less__ = __webpack_require__(905);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__capabilities_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__capabilities_less__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









// import CenterContainer from '@appUI/containers/center'

// import translate from 'sp-i18n'
// import db from '@appLogic/database'




// @connect()
var ShipDetailsContentCapabilities = (_dec = Object(__WEBPACK_IMPORTED_MODULE_6_sp_css_import__["a" /* ImportStyle */])(__WEBPACK_IMPORTED_MODULE_7__capabilities_less___default.a), _dec(_class = function (_React$Component) {
    _inherits(ShipDetailsContentCapabilities, _React$Component);

    function ShipDetailsContentCapabilities() {
        _classCallCheck(this, ShipDetailsContentCapabilities);

        return _possibleConstructorReturn(this, (ShipDetailsContentCapabilities.__proto__ || Object.getPrototypeOf(ShipDetailsContentCapabilities)).apply(this, arguments));
    }

    _createClass(ShipDetailsContentCapabilities, [{
        key: 'render',
        value: function render() {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: this.props.className },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__components_combat_special_jsx__["default"], { ship: this.props.ship, className: 'shipinfo shipinfo-combat' }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__components_other_special_jsx__["default"], { ship: this.props.ship, className: 'shipinfo shipinfo-special' }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__components_aaci_jsx__["default"], { ship: this.props.ship, className: 'shipinfo shipinfo-aaci' }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__components_speedup_calculator_jsx__["default"], { ship: this.props.ship, className: 'shipinfo shipinfo-speedup' }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__components_oasw_calculator_jsx__["default"], { ship: this.props.ship, className: 'shipinfo shipinfo-oasw' })
            );
        }
    }]);

    return ShipDetailsContentCapabilities;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class);


/***/ }),

/***/ 895:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_kckit_src_types_equipments__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_kckit_src_types_equipments___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_kckit_src_types_equipments__);


/* harmony default export */ __webpack_exports__["a"] = (function (conditionEquipments) {
    var equipmentTypesRequired = [];
    for (var key in conditionEquipments) {
        if (key.substr(0, 3) === 'has') {
            var typeName = key.substr(3);
            if (typeName === 'HAMountAAFD') {
                equipmentTypesRequired = equipmentTypesRequired.concat(__WEBPACK_IMPORTED_MODULE_0_kckit_src_types_equipments___default.a['HAMountsAAFD']);
            } else if (typeName in __WEBPACK_IMPORTED_MODULE_0_kckit_src_types_equipments___default.a) {
                equipmentTypesRequired = equipmentTypesRequired.concat(__WEBPACK_IMPORTED_MODULE_0_kckit_src_types_equipments___default.a[typeName]);
            } else if (typeName + 's' in __WEBPACK_IMPORTED_MODULE_0_kckit_src_types_equipments___default.a) {
                equipmentTypesRequired = equipmentTypesRequired.concat(__WEBPACK_IMPORTED_MODULE_0_kckit_src_types_equipments___default.a[typeName + 's']);
            }
        }
    }
    return equipmentTypesRequired;
});

/***/ }),

/***/ 896:
/***/ (function(module, exports) {

module.exports ={wrapper:'a777a635',css:'.a777a635 .item{-webkit-box-direction:normal;-webkit-box-orient:horizontal;-webkit-flex-flow:row nowrap;border-top:.05rem solid rgba(237,240,242,.15);box-sizing:initial;display:-webkit-box;display:-webkit-flex;display:flex;flex-flow:row nowrap;font-size:.7rem;height:1.8rem;line-height:1.8rem;margin:0;padding:.25rem 0}.a777a635 .item dd,.a777a635 .item dt{margin:0;padding:0}.a777a635 .item .id{-webkit-box-flex:0.1;-webkit-flex:0.1 0 3em;flex:0.1 0 3em}.a777a635 .item .id small{display:block;margin-right:-.75em}[data-locale=en] .a777a635 .item .id small{-webkit-transform:scale(.83333333);-webkit-transform-origin:0 50%;transform:scale(.83333333);transform-origin:0 50%}.a777a635 .item .icons{-webkit-box-flex:0.5;-webkit-flex:0.5 0 7.45rem;flex:0.5 0 7.45rem}.a777a635 .item .fixed,.a777a635 .item .modifier{-webkit-box-flex:1;-webkit-flex:1 0 1.75rem;flex:1 0 1.75rem}.a777a635 .item.is-limited{background:linear-gradient(90deg,transparent,hsla(0,0%,100%,.075) 2.5rem)}.a777a635 .item.is-limited .id{-webkit-box-direction:normal;-webkit-box-orient:vertical;-webkit-flex-flow:column nowrap;-webkit-justify-content:space-around;color:#fff;display:-webkit-box;display:-webkit-flex;display:flex;flex-flow:column nowrap;justify-content:space-around;line-height:1em}.a777a635 .header{border-top:0;color:rgba(169,193,205,.55);margin-top:-2rem;padding:0}'}

/***/ }),

/***/ 897:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalculatorLevelOASW; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames__ = __webpack_require__(759);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_kckit__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_kckit___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_kckit__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__appLogic_database__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__appUI_components_icon__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__equipment__ = __webpack_require__(821);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__input_number__ = __webpack_require__(822);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_sp_i18n__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_sp_css_import__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__styles_less__ = __webpack_require__(900);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__styles_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__styles_less__);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
















var equipmentSamples = {
    Sonar: [149, 47],
    DepthCharge: [45, 44]
};

var requiredEquipmentSamples = {
    hasSonar: 'Sonar',
    hasDiveBomber: ['any', 233],
    hasTorpedoBomber: ['any', 17],
    hasNameOf九三一空: [82, 83],
    hasAircraftHasStat_asw_1: ['aircraft', 70],
    hasTorpedoBomberHasStat_asw_7: [82, 83, 244]
};

var CalculatorLevelOASW = (_dec = Object(__WEBPACK_IMPORTED_MODULE_8_sp_css_import__["a" /* ImportStyle */])(__WEBPACK_IMPORTED_MODULE_9__styles_less___default.a), _dec(_class = function (_React$Component) {
    _inherits(CalculatorLevelOASW, _React$Component);

    function CalculatorLevelOASW(props) {
        _classCallCheck(this, CalculatorLevelOASW);

        var _this = _possibleConstructorReturn(this, (CalculatorLevelOASW.__proto__ || Object.getPrototypeOf(CalculatorLevelOASW)).call(this, props));

        _this.oaswTable = __WEBPACK_IMPORTED_MODULE_2_kckit___default.a.check.oasw(props.ship.id) || [];
        _this.canAlways = _this.oaswTable === true;
        _this.canOASW = _this.canAlways || Array.isArray(_this.oaswTable) && _this.oaswTable.length ? true : false;
        _this.statUnknown = props.ship.getAttribute('asw', 99) === undefined;

        // 确定计算器显示的装备列表
        _this.equipmentList = [];
        _this.isAny = [];
        var samples = Object.assign({}, equipmentSamples);
        if (!_this.canAlways && _this.canOASW) {
            _this.oaswTable.forEach(function (OASW) {
                if (OASW.equipments) for (var req in OASW.equipments) {
                    var hasStat = void 0;
                    if (_typeof(OASW.equipments[req]) === 'object' && OASW.equipments[req].hasStat) {
                        var obj = OASW.equipments[req].hasStat;
                        req += 'HasStat';
                        for (var stat in obj) {
                            req += '_' + stat + '_' + obj[stat];
                            hasStat = [stat, obj[stat]];
                        }
                    }
                    var value = requiredEquipmentSamples[req];
                    if (typeof value === 'string') {
                        // this.equipmentGroupList.push(equipmentSamples[req])
                        _this.equipmentList = _this.equipmentList.concat(equipmentSamples[value]);
                        delete samples[value];
                    } else if (Array.isArray(value)) {
                        if (value[0] === 'any') {
                            // this.equipmentGroupList.push([value[1]])
                            _this.equipmentList.push(value[1]);
                            _this.isAny.push(value[1]);
                        } else if (typeof value[0] === 'string') {
                            _this.equipmentList.push([value[0], value[1], hasStat]);
                            _this.isAny.push(value[1]);
                        } else {
                            // this.equipmentGroupList.push(value)
                            _this.equipmentList = _this.equipmentList.concat(value);
                        }
                    } else if (Array.isArray(requiredEquipmentSamples['' + req + OASW.equipments[req]])) {
                        if (requiredEquipmentSamples['' + req + OASW.equipments[req]][0] === 'any') {
                            // this.equipmentGroupList.push([requiredEquipmentSamples[`${req}${OASW.equipments[req]}`][1]])
                            _this.equipmentList.push(requiredEquipmentSamples['' + req + OASW.equipments[req]][1]);
                            _this.isAny.push(requiredEquipmentSamples['' + req + OASW.equipments[req]][1]);
                        } else {
                            // this.equipmentGroupList.push(requiredEquipmentSamples[`${req}${OASW.equipments[req]}`])
                            _this.equipmentList = _this.equipmentList.concat(requiredEquipmentSamples['' + req + OASW.equipments[req]]);
                        }
                    }
                }
            });
        }
        _this.isRequired = _this.equipmentList.map(function (equipmentID) {
            if (Array.isArray(equipmentID)) return equipmentID[1];
            return equipmentID;
        });
        for (var type in samples) {
            // this.equipmentGroupList.push(samples[type])
            _this.equipmentList = _this.equipmentList.concat(samples[type]);
        }
        // 检查舰娘是否可装备
        // this.equipmentGroupList = this.equipmentGroupList.filter(group => {
        //     if (!Array.isArray(group))
        //         return false
        //     group = group.filter(equipmentID => {
        //         const equipment = kckit.get.equipment(equipmentID)
        //         if (!equipment) return false
        //         return props.ship.canEquip(equipment.type)
        //     })
        //     return (Array.isArray(group) && group.length)
        // })
        _this.equipmentList = _this.equipmentList.filter(function (equipmentID) {
            if (Array.isArray(equipmentID)) return true;
            var equipment = __WEBPACK_IMPORTED_MODULE_2_kckit___default.a.get.equipment(equipmentID);
            if (!equipment) return false;
            return props.ship.canEquip(equipment.type);
        });

        // 初始 state
        var defaultState = {};
        // this.equipmentGroupList.forEach(group => {
        //     group.forEach(equipmentID => {
        //         defaultState[equipmentID] = 0
        //     })
        // })
        _this.equipmentList.forEach(function (equipmentID) {
            if (Array.isArray(equipmentID)) {
                defaultState[equipmentID[1]] = 0;
                return;
            }
            defaultState[equipmentID] = 0;
        });

        // if (__DEV__) console.log('thisShip > OASW', this.oaswTable, this.equipmentGroupList)
        if (false) console.log('thisShip > OASW', _this.oaswTable, _this.equipmentList, _this.isRequired);

        _this.slotsCount = props.ship.slot.length;

        _this.state = Object.assign(defaultState, {
            result: __WEBPACK_IMPORTED_MODULE_2_kckit___default.a.calculate.ship.levelOASW(props.ship, []),
            meetEquipmentsRequirement: __WEBPACK_IMPORTED_MODULE_2_kckit___default.a.check.oasw(props.ship, [])
        });
        return _this;
    }

    _createClass(CalculatorLevelOASW, [{
        key: 'update',
        value: function update(id, count) {
            if (this.state[id] !== count) {
                this.setState(function (prevState, props) {
                    var _ref;

                    // const newState = { ...prevState }
                    prevState[id] = count;
                    var equipments = [];
                    for (var equipmentID in prevState) {
                        if (!isNaN(equipmentID)) {
                            var thisCount = prevState[equipmentID];
                            for (var i = 0; i < thisCount; i++) {
                                equipments.push(equipmentID);
                            }
                        }
                    }
                    var result = __WEBPACK_IMPORTED_MODULE_2_kckit___default.a.calculate.ship.levelOASW(props.ship, equipments);
                    var meetEquipmentsRequirement = __WEBPACK_IMPORTED_MODULE_2_kckit___default.a.check.oasw(props.ship, equipments);
                    if (false) console.log(equipments, result, meetEquipmentsRequirement);
                    return _ref = {}, _defineProperty(_ref, id, count), _defineProperty(_ref, 'result', result), _defineProperty(_ref, 'meetEquipmentsRequirement', meetEquipmentsRequirement), _ref;
                });
            }
        }
    }, {
        key: 'renderEquipment',
        value: function renderEquipment(id, index, arr) {
            var displayName = void 0;
            if (Array.isArray(id)) {
                if (Array.isArray(id[2])) displayName = Object(__WEBPACK_IMPORTED_MODULE_7_sp_i18n__["a" /* default */])('equipment_types.' + id[0]) + ' (' + Object(__WEBPACK_IMPORTED_MODULE_7_sp_i18n__["a" /* default */])('require.has_stat', {
                    stat: Object(__WEBPACK_IMPORTED_MODULE_7_sp_i18n__["a" /* default */])('stat.' + id[2][0]),
                    value: id[2][1]
                }) + ')';else displayName = Object(__WEBPACK_IMPORTED_MODULE_7_sp_i18n__["a" /* default */])('equipment_types.' + id[0]);
                id = id[1];
            } else if (this.isAny.includes(id)) {
                displayName = __WEBPACK_IMPORTED_MODULE_3__appLogic_database__["a" /* default */].equipmentTypes[__WEBPACK_IMPORTED_MODULE_2_kckit___default.a.get.equipment(id).type]._name;
            }
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__equipment__["a" /* default */], {
                equipment: id,
                key: index,
                displayName: displayName,
                isNotLink: typeof displayName !== 'undefined',
                className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()({
                    'is-required': !this.state.meetEquipmentsRequirement && this.isRequired.includes(id),
                    'is-expand': !index && arr.length % 2
                }),
                componentInput: this.renderInput(id)
            });
        }
    }, {
        key: 'renderInput',
        value: function renderInput(id) {
            var _this2 = this;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__input_number__["a" /* default */], {
                className: 'input',

                defaultValue: this.state[id],
                min: 0,
                max: this.slotsCount,
                onUpdate: function onUpdate(newValue) {
                    return _this2.update(id, newValue);
                }
            });
        }
    }, {
        key: 'renderEquipmentGroup',
        value: function renderEquipmentGroup() {
            // return this.equipmentGroupList.map((group, indexGroup) => (
            //     <div className="area-equipment-group" key={indexGroup}>
            //         {group.map(this.renderEquipment.bind(this))}
            //     </div>
            // ))
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()(["area-equipment-group", {
                        'is-half': this.equipmentList.length > 4
                    }]) },
                this.equipmentList.map(this.renderEquipment.bind(this))
            );
        }
    }, {
        key: 'getResult',
        value: function getResult() {
            if (!this.state.meetEquipmentsRequirement) return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'strong',
                { className: 'is-missing' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__appUI_components_icon__["a" /* default */], { className: 'icon-missing', icon: 'warning2' }),
                Object(__WEBPACK_IMPORTED_MODULE_7_sp_i18n__["a" /* default */])("oasw_calculator.no_result")
            );
            if (!this.state.result || this.state.result > __WEBPACK_IMPORTED_MODULE_2_kckit___default.a.maxShipLv) return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'strong',
                null,
                '--'
            );
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'strong',
                { className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()({
                        'is-below-100': this.state.result < 100,
                        'is-atleast-100': this.state.result >= 100
                    }) },
                this.state.result
            );
        }
    }, {
        key: 'render',
        value: function render() {
            if (false) return React.createElement(
                'div',
                null,
                translate("no_javascript_warning")
            );
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()([this.props.className, {
                        'is-unable': !this.canOASW,
                        'is-always': this.canOASW && this.canAlways
                    }]) },
                this.statUnknown && this.props.componentUnknown,
                !this.statUnknown && !this.canOASW && this.props.componentUnable,
                !this.statUnknown && this.canOASW && this.canAlways && this.props.componentAlways,
                this.canOASW && !this.canAlways && this.renderEquipmentGroup(),
                this.canOASW && !this.canAlways && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'area-result' },
                    this.state.meetEquipmentsRequirement && Object(__WEBPACK_IMPORTED_MODULE_7_sp_i18n__["a" /* default */])("oasw_calculator.result"),
                    this.getResult()
                )
            );
        }
    }]);

    return CalculatorLevelOASW;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class);


/***/ }),

/***/ 898:
/***/ (function(module, exports) {

module.exports ={wrapper:'bb5ce1bd',css:'.bb5ce1bd{border-bottom:.05rem solid rgba(237,240,242,.15);font-size:.7rem;height:2.3rem;overflow:hidden;padding:.25rem 4.3rem .25rem 1.8rem;position:relative}.bb5ce1bd .equipment{display:block;height:1.8rem;line-height:1.2em}.bb5ce1bd .equipment .name{display:inline-block;max-height:100%;max-width:100%;vertical-align:middle}.bb5ce1bd .equipment:after{content:"";display:inline-block;height:100%;overflow:hidden;vertical-align:middle;width:0}.bb5ce1bd .icon,.bb5ce1bd .input{position:absolute;top:50%}.bb5ce1bd .icon{height:1.8rem;left:0;margin-top:-.9rem;width:1.8rem}.bb5ce1bd .input{right:0}.bb5ce1bd.has-note{-webkit-box-direction:normal;-webkit-box-orient:horizontal;-webkit-flex-flow:row nowrap;display:-webkit-box;display:-webkit-flex;display:flex;flex-flow:row nowrap;padding-right:0}.bb5ce1bd.has-note .equipment{-webkit-box-flex:1;-webkit-flex:1;flex:1}.bb5ce1bd.has-note .note{-webkit-box-flex:0;-webkit-flex:0;color:rgba(169,193,205,.55);flex:0;font-size:.6rem;line-height:.9rem;padding-left:1em;text-align:right;white-space:nowrap}.bb5ce1bd.is-required{background:linear-gradient(90deg,hsla(0,0%,100%,.2),hsla(0,0%,100%,0) 2.5rem)}.bb5ce1bd.is-required .icon-required{fill:#a9c1cd;height:.8rem;left:.1rem;position:absolute;top:.1rem;width:.8rem;z-index:5}'}

/***/ }),

/***/ 899:
/***/ (function(module, exports) {

module.exports ={wrapper:'d093873d',css:'.d093873d{box-sizing:border-box;height:1.5rem;margin-top:-.75rem;padding:0 1rem;top:50%;width:3.5rem}.d093873d .btn,.d093873d input[type]{box-sizing:border-box;display:block;height:1.5rem;text-align:center}.d093873d input[type]{border-left-width:0;border-radius:0;border-right-width:0;display:block;line-height:1.4rem;width:100%}.d093873d input[type]:focus{border-left-width:.05rem;border-right-width:.05rem}.d093873d input[type]::-webkit-inner-spin-button,.d093873d input[type]::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.d093873d input[type]::inner-spin-button,.d093873d input[type]::outer-spin-button{-moz-appearance:none;-webkit-appearance:none;appearance:none;margin:0}.d093873d .btn{-moz-appearance:none;-webkit-appearance:none;appearance:none;background:rgba(176,190,196,.1);border:.05rem solid rgba(143,163,174,.25);color:#d0d9dd;font:inherit;line-height:1.4rem;padding:0;position:absolute;top:0;width:1rem}.d093873d .btn:focus,html.is-hover .d093873d .btn:hover{background-color:rgba(176,190,196,.15)}.d093873d .btn:focus{border-color:#40c4ff;box-shadow:0 0 .25rem rgba(64,196,255,.5);outline:0}.d093873d .btn-minus{border-radius:.15rem 0 0 .15rem;left:0}.d093873d .btn-plus{border-radius:0 .15rem .15rem 0;right:0}'}

/***/ }),

/***/ 900:
/***/ (function(module, exports) {

module.exports ={wrapper:'c85c10ef',css:'.c85c10ef{overflow:hidden}.c85c10ef .area-equipment-group.is-half{-webkit-box-direction:normal;-webkit-box-orient:horizontal;-webkit-flex-flow:row wrap;display:-webkit-box;display:-webkit-flex;display:flex;flex-flow:row wrap;margin-left:-.1rem;margin-right:-.5rem}.c85c10ef .area-equipment-group.is-half [data-equipment-id]{-webkit-box-flex:1;-webkit-flex:1 1 11rem;border-left:.05rem solid rgba(237,240,242,.15);flex:1 1 11rem;padding-left:1.85rem;padding-right:4.8rem}.c85c10ef .area-equipment-group.is-half [data-equipment-id] .input{right:.5rem}.c85c10ef .area-equipment-group.is-half [data-equipment-id].is-expand{-webkit-flex-basis:22rem;flex-basis:22rem}@media (max-width:660px){.c85c10ef .area-equipment-group.is-half{display:block}}.c85c10ef .area-result{font-size:.7rem;line-height:1.7rem;overflow:hidden;padding-top:.1rem;text-align:center}.c85c10ef .area-result strong{font-size:.8rem}.c85c10ef .area-result .is-below-100{color:#abeeff}.c85c10ef .area-result .is-atleast-100{color:#d6f4ff}.c85c10ef .area-result .icon-missing{margin-right:.2rem;vertical-align:text-top}'}

/***/ }),

/***/ 901:
/***/ (function(module, exports) {

module.exports ={wrapper:'dd7e9740',css:'.dd7e9740 .calculator{border-top:.05rem solid rgba(237,240,242,.15);margin-top:-.25rem}.dd7e9740 .calculator.is-always,.dd7e9740 .calculator.is-unable{border-top-width:0;margin-top:1rem}'}

/***/ }),

/***/ 902:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalculatorSpeed; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames__ = __webpack_require__(759);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_kckit__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_kckit___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_kckit__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__equipment__ = __webpack_require__(821);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__input_number__ = __webpack_require__(822);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_sp_i18n__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_sp_css_import__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__styles_less__ = __webpack_require__(903);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__styles_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__styles_less__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }














var calculateSpeed = __WEBPACK_IMPORTED_MODULE_2_kckit___default.a.calculate.ship.speed;
var maxSlots = 4;

var CalculatorSpeed = (_dec = Object(__WEBPACK_IMPORTED_MODULE_6_sp_css_import__["a" /* ImportStyle */])(__WEBPACK_IMPORTED_MODULE_7__styles_less___default.a), _dec(_class = function (_React$Component) {
    _inherits(CalculatorSpeed, _React$Component);

    function CalculatorSpeed(props) {
        var _this$state;

        _classCallCheck(this, CalculatorSpeed);

        if (false) console.log('thisShip > Speed', { speed: props.ship.stat.speed, rule: props.ship.getSpeedRule() });

        var _this = _possibleConstructorReturn(this, (CalculatorSpeed.__proto__ || Object.getPrototypeOf(CalculatorSpeed)).call(this, props));

        _this.state = (_this$state = {}, _defineProperty(_this$state, 33, 1), _defineProperty(_this$state, 34, 0), _defineProperty(_this$state, 87, 0), _defineProperty(_this$state, 'speedId', props.ship.stat.speed), _defineProperty(_this$state, 'speed', props.ship.getSpeed()), _this$state);

        _this.slotsCount = props.ship.slot.length;
        return _this;
    }

    _createClass(CalculatorSpeed, [{
        key: 'update',
        value: function update(id, count) {
            if (this.state[id] !== count) {
                this.setState(function (prevState, props) {
                    var _ref;

                    // const newState = { ...prevState }
                    prevState[id] = count;
                    var equipments = Array(Math.min(maxSlots, prevState[87])).fill(87).concat(Array(Math.min(prevState[34], maxSlots - Math.min(maxSlots, prevState[87]))).fill(34)).concat(Array(Math.max(maxSlots - prevState[34] - prevState[87], 0))).concat(33);
                    var result = calculateSpeed(props.ship, equipments);
                    if (false) console.log(equipments, result);
                    return _ref = {}, _defineProperty(_ref, id, count), _defineProperty(_ref, 'speedId', result), _defineProperty(_ref, 'speed', __WEBPACK_IMPORTED_MODULE_2_kckit___default.a.get.speed(result)), _ref;
                });
            }
        }

        // getSlotsRemain(curID) {
        //     const countOther = (curID === 34 ? this.state[87] : this.state[34])
        //     return this.slotsCount - countOther + (countOther ? 1 : 0)
        // }

    }, {
        key: 'renderEquipment',
        value: function renderEquipment(id) {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__equipment__["a" /* default */], {
                equipment: id,
                className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()({
                    'has-note': id === 33
                }),
                componentInput: this.renderInput(id)
            });
        }
    }, {
        key: 'renderInput',
        value: function renderInput(id) {
            var _this2 = this;

            if (id === 33) {
                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'note' },
                    Object(__WEBPACK_IMPORTED_MODULE_5_sp_i18n__["a" /* default */])("speed_calculator.equipment_33_note_1"),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
                    Object(__WEBPACK_IMPORTED_MODULE_5_sp_i18n__["a" /* default */])("speed_calculator.equipment_33_note_2")
                );
            }
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__input_number__["a" /* default */], {
                className: 'input',

                defaultValue: this.state[id],
                min: 0,
                max: /*this.getSlotsRemain(id)*/this.slotsCount,
                onUpdate: function onUpdate(newValue) {
                    return _this2.update(id, newValue);
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            if (false) return React.createElement(
                'div',
                null,
                translate("no_javascript_warning")
            );
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: this.props.className },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'area-requirement' },
                    this.renderEquipment(33)
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'area-configurable' },
                    this.renderEquipment(34),
                    this.renderEquipment(87)
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'area-result' },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        { className: 'base' },
                        Object(__WEBPACK_IMPORTED_MODULE_5_sp_i18n__["a" /* default */])("speed_calculator.base_speed"),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            'strong',
                            { 'data-speed-id': this.props.ship.stat.speed },
                            this.props.ship.getSpeed()
                        )
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        { className: 'result' },
                        Object(__WEBPACK_IMPORTED_MODULE_5_sp_i18n__["a" /* default */])("speed_calculator.result"),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            'strong',
                            { 'data-speed-id': this.state.speedId },
                            this.state.speed
                        )
                    )
                )
            );
        }
    }]);

    return CalculatorSpeed;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class);


/***/ }),

/***/ 903:
/***/ (function(module, exports) {

module.exports ={wrapper:'a7a499bb',css:'.a7a499bb .area-result{line-height:1.7rem;overflow:hidden}.a7a499bb .area-result .base,.a7a499bb .area-result .result{float:left;font-size:.7rem;padding-top:.1rem;width:50%}.a7a499bb .area-result .base [data-speed-id],.a7a499bb .area-result .result [data-speed-id]{font-size:.8rem}.a7a499bb .area-result .base{border-right:.05rem solid rgba(237,240,242,.15);padding-right:.75em;text-align:right}.a7a499bb .area-result .result{padding-left:.75em;text-align:left}'}

/***/ }),

/***/ 904:
/***/ (function(module, exports) {

module.exports ={wrapper:'b84735ba',css:'.b84735ba .calculator{border-top:.05rem solid rgba(237,240,242,.15);margin-top:-.25rem}'}

/***/ }),

/***/ 905:
/***/ (function(module, exports) {

module.exports ={wrapper:'aaa8d76c',css:'.aaa8d76c{-webkit-box-direction:normal;-webkit-box-orient:horizontal;-webkit-flex-flow:row wrap;display:-webkit-box;display:-webkit-flex;display:flex;flex-flow:row wrap;margin-right:-2rem}@media (max-width:660px){.aaa8d76c{display:block}}.aaa8d76c .shipinfo{-webkit-box-flex:1;-webkit-flex:1 0 33.3333%;border-right:2rem solid transparent;flex:1 0 33.3333%;min-width:16rem}@media (max-width:660px){.aaa8d76c .shipinfo{min-width:0}}.aaa8d76c .shipinfo-combat,.aaa8d76c .shipinfo-special{-webkit-flex-basis:50%;flex-basis:50%}.aaa8d76c:after{-webkit-box-flex:1;-webkit-flex:1 0 33.3333%;content:"";flex:1 0 33.3333%;height:0}'}

/***/ }),

/***/ 906:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _default; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_sp_css_import__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__styles_less__ = __webpack_require__(909);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__styles_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__styles_less__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var Swiper = typeof window !== 'undefined' && __webpack_require__(827);
typeof window !== 'undefined' && __webpack_require__(907);




var defaults = {
    // speed: 400,
    // spaceBetween: 100
};

var _default = (_dec = Object(__WEBPACK_IMPORTED_MODULE_1_sp_css_import__["a" /* ImportStyle */])(__WEBPACK_IMPORTED_MODULE_2__styles_less___default.a), _dec(_class = function (_React$Component) {
    _inherits(_default, _React$Component);

    function _default() {
        _classCallCheck(this, _default);

        return _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).apply(this, arguments));
    }

    _createClass(_default, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            if (Swiper) {
                var props = _objectWithoutProperties(this.props, []);

                delete props.className;
                delete props.children;
                delete props.slides;

                if (this.props.pagination === true) {
                    props.pagination = '.swiper-pagination';
                    props.paginationClickable = true;
                }

                ['prevButton', 'nextButton'].forEach(function (key) {
                    if (_this2.props[key] === true || __WEBPACK_IMPORTED_MODULE_0_react___default.a.isValidElement(props[key])) {
                        props[key] = _this2['_' + key];
                    }
                });

                ['prevButton', 'nextButton', 'scrollbar'].forEach(function (key) {
                    if (typeof props[key] === 'boolean') delete props[key];
                });

                ['controlsWrapper'].forEach(function (key) {
                    delete props[key];
                });

                this.illusts = new Swiper(this._container, Object.assign(defaults, props));
            }
        }
    }, {
        key: 'renderButtonPrev',
        value: function renderButtonPrev() {
            var _this3 = this;

            if (this.props.prevButton === true) return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { className: 'swiper-button-prev', ref: function ref(el) {
                    return _this3._prevButton = el;
                } });else if (__WEBPACK_IMPORTED_MODULE_0_react___default.a.isValidElement(this.props.prevButton)) return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'swiper-button-prev', ref: function ref(el) {
                        return _this3._prevButton = el;
                    } },
                this.props.prevButton
            );else return undefined;
        }
    }, {
        key: 'renderButtonNext',
        value: function renderButtonNext() {
            var _this4 = this;

            if (this.props.nextButton === true) return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { className: 'swiper-button-next', ref: function ref(el) {
                    return _this4._nextButton = el;
                } });else if (__WEBPACK_IMPORTED_MODULE_0_react___default.a.isValidElement(this.props.nextButton)) return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'swiper-button-next', ref: function ref(el) {
                        return _this4._nextButton = el;
                    } },
                this.props.nextButton
            );else return undefined;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this5 = this;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: "swiper-container " + this.props.className, ref: function ref(el) {
                        return _this5._container = el;
                    } },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'swiper-wrapper' },
                    this.props.slides.map(function (el, index) {
                        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            'div',
                            { className: 'swiper-slide', key: index },
                            el,
                            _this5.props.lazyLoading && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { className: 'swiper-lazy-preloader' })
                        );
                    })
                ),
                this.props.controlsWrapper && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'swiper-controls' },
                    this.props.pagination === true && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { className: 'swiper-pagination' }),
                    this.renderButtonPrev(),
                    this.renderButtonNext(),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.isValidElement(this.props.controlsWrapper) && this.props.controlsWrapper
                ),
                !this.props.controlsWrapper && this.props.pagination === true && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { className: 'swiper-pagination' }),
                !this.props.controlsWrapper && this.renderButtonPrev(),
                !this.props.controlsWrapper && this.renderButtonNext(),
                this.props.scrollbar === true && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { 'class': 'swiper-scrollbar' }),
                this.props.children
            );
        }
    }]);

    return _default;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class);



/***/ }),

/***/ 907:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(908);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(290)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../postcss-loader/lib/index.js!./swiper.min.css", function() {
			var newContent = require("!!../../../postcss-loader/lib/index.js!./swiper.min.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 908:
/***/ (function(module, exports) {

module.exports = ".swiper-container{margin-left:auto;margin-right:auto;overflow:hidden;position:relative;z-index:1}.swiper-container-no-flexbox .swiper-slide{float:left}.swiper-container-vertical>.swiper-wrapper{-webkit-box-orient:vertical;-webkit-flex-direction:column;flex-direction:column}.swiper-wrapper{box-sizing:initial;display:-webkit-box;display:-webkit-flex;display:flex;height:100%;position:relative;transition-property:-webkit-transform;transition-property:transform;transition-property:transform,-webkit-transform;width:100%;z-index:1}.swiper-container-android .swiper-slide,.swiper-wrapper{-webkit-transform:translateZ(0);transform:translateZ(0)}.swiper-container-multirow>.swiper-wrapper{-moz-box-lines:multiple;-webkit-box-lines:multiple;-webkit-flex-wrap:wrap;flex-wrap:wrap}.swiper-container-free-mode>.swiper-wrapper{margin:0 auto;transition-timing-function:ease-out}.swiper-slide{-ms-flex:0 0 auto;-webkit-flex-shrink:0;flex-shrink:0;height:100%;position:relative;width:100%}.swiper-container-autoheight,.swiper-container-autoheight .swiper-slide{height:auto}.swiper-container-autoheight .swiper-wrapper{-webkit-align-items:flex-start;-webkit-box-align:start;align-items:flex-start;transition-property:height,-webkit-transform;transition-property:transform,height;transition-property:transform,height,-webkit-transform}.swiper-container .swiper-notification{left:0;opacity:0;pointer-events:none;position:absolute;top:0;z-index:-1000}.swiper-wp8-horizontal{touch-action:pan-y}.swiper-wp8-vertical{touch-action:pan-x}.swiper-button-next,.swiper-button-prev{background-position:50%;background-repeat:no-repeat;background-size:1.35rem 2.2rem;cursor:pointer;height:2.2rem;margin-top:-1.1rem;position:absolute;top:50%;width:1.35rem;z-index:10}.swiper-button-next.swiper-button-disabled,.swiper-button-prev.swiper-button-disabled{cursor:auto;opacity:.35;pointer-events:none}.swiper-button-prev,.swiper-container-rtl .swiper-button-next{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 27 44'%3E%3Cpath d='M0 22L22 0l2.1 2.1L4.2 22l19.9 19.9L22 44 0 22z' fill='%23007aff'/%3E%3C/svg%3E\");left:.5rem;right:auto}.swiper-button-prev.swiper-button-black,.swiper-container-rtl .swiper-button-next.swiper-button-black{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 27 44'%3E%3Cpath d='M0 22L22 0l2.1 2.1L4.2 22l19.9 19.9L22 44 0 22z'/%3E%3C/svg%3E\")}.swiper-button-prev.swiper-button-white,.swiper-container-rtl .swiper-button-next.swiper-button-white{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 27 44'%3E%3Cpath d='M0 22L22 0l2.1 2.1L4.2 22l19.9 19.9L22 44 0 22z' fill='%23fff'/%3E%3C/svg%3E\")}.swiper-button-next,.swiper-container-rtl .swiper-button-prev{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 27 44'%3E%3Cpath d='M27 22L5 44l-2.1-2.1L22.8 22 2.9 2.1 5 0l22 22z' fill='%23007aff'/%3E%3C/svg%3E\");left:auto;right:.5rem}.swiper-button-next.swiper-button-black,.swiper-container-rtl .swiper-button-prev.swiper-button-black{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 27 44'%3E%3Cpath d='M27 22L5 44l-2.1-2.1L22.8 22 2.9 2.1 5 0l22 22z'/%3E%3C/svg%3E\")}.swiper-button-next.swiper-button-white,.swiper-container-rtl .swiper-button-prev.swiper-button-white{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 27 44'%3E%3Cpath d='M27 22L5 44l-2.1-2.1L22.8 22 2.9 2.1 5 0l22 22z' fill='%23fff'/%3E%3C/svg%3E\")}.swiper-pagination{-webkit-transform:translateZ(0);position:absolute;text-align:center;transform:translateZ(0);transition:.3s;z-index:10}.swiper-pagination.swiper-pagination-hidden{opacity:0}.swiper-container-horizontal>.swiper-pagination-bullets,.swiper-pagination-custom,.swiper-pagination-fraction{bottom:.5rem;left:0;width:100%}.swiper-pagination-bullet{background:#000;border-radius:100%;display:inline-block;height:.4rem;opacity:.2;width:.4rem}button.swiper-pagination-bullet{-moz-appearance:none;-ms-appearance:none;-webkit-appearance:none;appearance:none;border:none;box-shadow:none;margin:0;padding:0}.swiper-pagination-clickable .swiper-pagination-bullet{cursor:pointer}.swiper-pagination-white .swiper-pagination-bullet{background:#fff}.swiper-pagination-bullet-active{background:#007aff;opacity:1}.swiper-pagination-white .swiper-pagination-bullet-active{background:#fff}.swiper-pagination-black .swiper-pagination-bullet-active{background:#000}.swiper-container-vertical>.swiper-pagination-bullets{-webkit-transform:translate3d(0,-50%,0);right:.5rem;top:50%;transform:translate3d(0,-50%,0)}.swiper-container-vertical>.swiper-pagination-bullets .swiper-pagination-bullet{display:block;margin:.25rem 0}.swiper-container-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet{margin:0 .25rem}.swiper-pagination-progress{background:rgba(0,0,0,.25);position:absolute}.swiper-pagination-progress .swiper-pagination-progressbar{-webkit-transform:scale(0);-webkit-transform-origin:left top;background:#007aff;height:100%;left:0;position:absolute;top:0;transform:scale(0);transform-origin:left top;width:100%}.swiper-container-rtl .swiper-pagination-progress .swiper-pagination-progressbar{-webkit-transform-origin:right top;transform-origin:right top}.swiper-container-horizontal>.swiper-pagination-progress{height:.2rem;left:0;top:0;width:100%}.swiper-container-vertical>.swiper-pagination-progress{height:100%;left:0;top:0;width:.2rem}.swiper-pagination-progress.swiper-pagination-white{background:hsla(0,0%,100%,.5)}.swiper-pagination-progress.swiper-pagination-white .swiper-pagination-progressbar{background:#fff}.swiper-pagination-progress.swiper-pagination-black .swiper-pagination-progressbar{background:#000}.swiper-container-3d{-o-perspective:60rem;-webkit-perspective:60rem;perspective:60rem}.swiper-container-3d .swiper-cube-shadow,.swiper-container-3d .swiper-slide,.swiper-container-3d .swiper-slide-shadow-bottom,.swiper-container-3d .swiper-slide-shadow-left,.swiper-container-3d .swiper-slide-shadow-right,.swiper-container-3d .swiper-slide-shadow-top,.swiper-container-3d .swiper-wrapper{-webkit-transform-style:preserve-3d;transform-style:preserve-3d}.swiper-container-3d .swiper-slide-shadow-bottom,.swiper-container-3d .swiper-slide-shadow-left,.swiper-container-3d .swiper-slide-shadow-right,.swiper-container-3d .swiper-slide-shadow-top{height:100%;left:0;pointer-events:none;position:absolute;top:0;width:100%;z-index:10}.swiper-container-3d .swiper-slide-shadow-left{background-image:linear-gradient(270deg,rgba(0,0,0,.5),transparent)}.swiper-container-3d .swiper-slide-shadow-right{background-image:linear-gradient(90deg,rgba(0,0,0,.5),transparent)}.swiper-container-3d .swiper-slide-shadow-top{background-image:linear-gradient(0deg,rgba(0,0,0,.5),transparent)}.swiper-container-3d .swiper-slide-shadow-bottom{background-image:linear-gradient(180deg,rgba(0,0,0,.5),transparent)}.swiper-container-coverflow .swiper-wrapper,.swiper-container-flip .swiper-wrapper{-ms-perspective:60rem}.swiper-container-cube,.swiper-container-flip{overflow:visible}.swiper-container-cube .swiper-slide,.swiper-container-flip .swiper-slide{-webkit-backface-visibility:hidden;backface-visibility:hidden;pointer-events:none;z-index:1}.swiper-container-cube .swiper-slide .swiper-slide,.swiper-container-flip .swiper-slide .swiper-slide{pointer-events:none}.swiper-container-cube .swiper-slide-active,.swiper-container-cube .swiper-slide-active .swiper-slide-active,.swiper-container-flip .swiper-slide-active,.swiper-container-flip .swiper-slide-active .swiper-slide-active{pointer-events:auto}.swiper-container-cube .swiper-slide-shadow-bottom,.swiper-container-cube .swiper-slide-shadow-left,.swiper-container-cube .swiper-slide-shadow-right,.swiper-container-cube .swiper-slide-shadow-top,.swiper-container-flip .swiper-slide-shadow-bottom,.swiper-container-flip .swiper-slide-shadow-left,.swiper-container-flip .swiper-slide-shadow-right,.swiper-container-flip .swiper-slide-shadow-top{-webkit-backface-visibility:hidden;backface-visibility:hidden;z-index:0}.swiper-container-cube .swiper-slide{-webkit-transform-origin:0 0;height:100%;transform-origin:0 0;visibility:hidden;width:100%}.swiper-container-cube.swiper-container-rtl .swiper-slide{-webkit-transform-origin:100% 0;transform-origin:100% 0}.swiper-container-cube .swiper-slide-active,.swiper-container-cube .swiper-slide-next,.swiper-container-cube .swiper-slide-next+.swiper-slide,.swiper-container-cube .swiper-slide-prev{pointer-events:auto;visibility:visible}.swiper-container-cube .swiper-cube-shadow{-webkit-filter:blur(2.5rem);background:#000;bottom:0;filter:blur(2.5rem);height:100%;left:0;opacity:.6;position:absolute;width:100%;z-index:0}.swiper-container-fade.swiper-container-free-mode .swiper-slide{transition-timing-function:ease-out}.swiper-container-fade .swiper-slide{pointer-events:none;transition-property:opacity}.swiper-container-fade .swiper-slide .swiper-slide{pointer-events:none}.swiper-container-fade .swiper-slide-active,.swiper-container-fade .swiper-slide-active .swiper-slide-active{pointer-events:auto}.swiper-zoom-container{-webkit-align-items:center;-webkit-box-align:center;-webkit-box-pack:center;-webkit-justify-content:center;align-items:center;display:-webkit-box;display:-webkit-flex;display:flex;height:100%;justify-content:center;text-align:center;width:100%}.swiper-zoom-container>canvas,.swiper-zoom-container>img,.swiper-zoom-container>svg{max-height:100%;max-width:100%;object-fit:contain}.swiper-scrollbar{-ms-touch-action:none;background:rgba(0,0,0,.1);border-radius:.5rem;position:relative}.swiper-container-horizontal>.swiper-scrollbar{bottom:.15rem;height:.25rem;left:1%;position:absolute;width:98%;z-index:50}.swiper-container-vertical>.swiper-scrollbar{height:98%;position:absolute;right:.15rem;top:1%;width:.25rem;z-index:50}.swiper-scrollbar-drag{background:rgba(0,0,0,.5);border-radius:.5rem;height:100%;left:0;position:relative;top:0;width:100%}.swiper-scrollbar-cursor-drag{cursor:move}.swiper-lazy-preloader{-webkit-animation:swiper-preloader-spin 1s steps(12) infinite;-webkit-transform-origin:50%;animation:swiper-preloader-spin 1s steps(12) infinite;height:2.1rem;left:50%;margin-left:-1.05rem;margin-top:-1.05rem;position:absolute;top:50%;transform-origin:50%;width:2.1rem;z-index:10}.swiper-lazy-preloader:after{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cdefs%3E%3Cpath id='a' stroke='%236c6c6c' stroke-width='11' stroke-linecap='round' d='M60 7v20'/%3E%3C/defs%3E%3Cuse xlink:href='%23a' opacity='.27'/%3E%3Cuse xlink:href='%23a' opacity='.27' transform='rotate(30 60 60)'/%3E%3Cuse xlink:href='%23a' opacity='.27' transform='rotate(60 60 60)'/%3E%3Cuse xlink:href='%23a' opacity='.27' transform='rotate(90 60 60)'/%3E%3Cuse xlink:href='%23a' opacity='.27' transform='rotate(120 60 60)'/%3E%3Cuse xlink:href='%23a' opacity='.27' transform='rotate(150 60 60)'/%3E%3Cuse xlink:href='%23a' opacity='.37' transform='rotate(180 60 60)'/%3E%3Cuse xlink:href='%23a' opacity='.46' transform='rotate(210 60 60)'/%3E%3Cuse xlink:href='%23a' opacity='.56' transform='rotate(240 60 60)'/%3E%3Cuse xlink:href='%23a' opacity='.66' transform='rotate(270 60 60)'/%3E%3Cuse xlink:href='%23a' opacity='.75' transform='rotate(300 60 60)'/%3E%3Cuse xlink:href='%23a' opacity='.85' transform='rotate(330 60 60)'/%3E%3C/svg%3E\");background-position:50%;background-repeat:no-repeat;background-size:100%;content:\"\";display:block;height:100%;width:100%}.swiper-lazy-preloader-white:after{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cdefs%3E%3Cpath id='a' stroke='%23fff' stroke-width='11' stroke-linecap='round' d='M60 7v20'/%3E%3C/defs%3E%3Cuse xlink:href='%23a' opacity='.27'/%3E%3Cuse xlink:href='%23a' opacity='.27' transform='rotate(30 60 60)'/%3E%3Cuse xlink:href='%23a' opacity='.27' transform='rotate(60 60 60)'/%3E%3Cuse xlink:href='%23a' opacity='.27' transform='rotate(90 60 60)'/%3E%3Cuse xlink:href='%23a' opacity='.27' transform='rotate(120 60 60)'/%3E%3Cuse xlink:href='%23a' opacity='.27' transform='rotate(150 60 60)'/%3E%3Cuse xlink:href='%23a' opacity='.37' transform='rotate(180 60 60)'/%3E%3Cuse xlink:href='%23a' opacity='.46' transform='rotate(210 60 60)'/%3E%3Cuse xlink:href='%23a' opacity='.56' transform='rotate(240 60 60)'/%3E%3Cuse xlink:href='%23a' opacity='.66' transform='rotate(270 60 60)'/%3E%3Cuse xlink:href='%23a' opacity='.75' transform='rotate(300 60 60)'/%3E%3Cuse xlink:href='%23a' opacity='.85' transform='rotate(330 60 60)'/%3E%3C/svg%3E\")}@-webkit-keyframes swiper-preloader-spin{to{-webkit-transform:rotate(1turn)}}@keyframes swiper-preloader-spin{to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}"

/***/ }),

/***/ 909:
/***/ (function(module, exports) {

module.exports ={wrapper:'ffed6079',css:'.ffed6079{height:100%}.ffed6079 .swiper-button-next:not(:empty),.ffed6079 .swiper-button-prev:not(:empty){background:none transparent}.ffed6079 .swiper-button-prev{text-align:left}.ffed6079 .swiper-button-next{text-align:right}'}

/***/ }),

/***/ 910:
/***/ (function(module, exports) {

module.exports ={wrapper:'ffb93f55',css:'.ffb93f55{max-height:90vh;overflow:auto;position:relative}.ffb93f55 img{display:block;max-height:100%;max-width:100%;position:relative}.ffb93f55 .swiper-container{-webkit-box-direction:normal;-webkit-box-orient:vertical;-webkit-box-pack:end;-webkit-flex-flow:column nowrap;-webkit-justify-content:flex-end;display:-webkit-box;display:-webkit-flex;display:flex;flex-flow:column nowrap;justify-content:flex-end}.ffb93f55 .swiper-wrapper{-webkit-box-flex:1;-webkit-box-ordinal-group:2;-webkit-flex:1;-webkit-order:1;flex:1;height:auto;max-height:100%;min-height:0;order:1}.ffb93f55 .swiper-slide{box-sizing:border-box;padding:0 .5rem;text-align:center;vertical-align:middle}.ffb93f55 .swiper-slide:after{content:"";display:inline-block;height:100%;overflow:hidden;vertical-align:middle;width:0}.ffb93f55 .swiper-slide img{display:inline-block;max-width:98%;max-width:calc(100% - .2rem);vertical-align:middle}.ffb93f55 .swiper-controls{-webkit-align-items:center;-webkit-box-align:center;-webkit-box-direction:normal;-webkit-box-flex:0;-webkit-box-ordinal-group:4;-webkit-box-orient:horizontal;-webkit-box-pack:center;-webkit-flex:0 0 auto;-webkit-flex-flow:row nowrap;-webkit-justify-content:center;-webkit-order:3;align-items:center;border-color:transparent;border-style:solid;border-width:1.375rem 1rem .5rem;display:-webkit-box;display:-webkit-flex;display:flex;flex:0 0 auto;flex-flow:row nowrap;justify-content:center;line-height:1rem;order:3}.ffb93f55 .swiper-controls .swiper-pagination{-webkit-box-flex:0;-webkit-box-ordinal-group:3;-webkit-flex:0 1 auto;-webkit-order:2;flex:0 1 auto;order:2;position:relative}.ffb93f55 .swiper-controls .swiper-button-next,.ffb93f55 .swiper-controls .swiper-button-prev{-webkit-box-flex:0;-webkit-flex:0 0 1.3rem;flex:0 0 1.3rem;height:.9rem;left:0;margin:0;position:relative;top:0}.ffb93f55 .swiper-controls .swiper-button-prev{-webkit-box-ordinal-group:2;-webkit-order:1;order:1}.ffb93f55 .swiper-controls .swiper-button-next{-webkit-box-ordinal-group:4;-webkit-order:3;order:3}.ffb93f55 .swiper-pagination-bullet{background:none transparent;height:1rem;opacity:1;position:relative;vertical-align:bottom;width:1rem}.ffb93f55 .swiper-pagination-bullet:before{-webkit-transform:scale(.4);background:rgba(169,193,205,.55);border-radius:50%;bottom:0;content:"";display:block;left:0;position:absolute;right:0;top:0;transform:scale(.4)}html.is-hover .ffb93f55 .swiper-pagination-bullet:hover:before{background:#a9c1cd}.ffb93f55 .swiper-pagination-bullet:active:before,html.is-hover .ffb93f55 .swiper-pagination-bullet:hover:active:before{background:rgba(237,240,242,.15)}.ffb93f55 .swiper-pagination-bullet-active{pointer-events:none;z-index:-1}.ffb93f55 .swiper-pagination-bullet-active:before{-webkit-transform:scale(.8);background:rgba(64,196,255,.35);border:.1rem solid #40c4ff;transform:scale(.8)}html.is-hover .ffb93f55 .swiper-pagination-bullet-active:hover:before{background:rgba(64,196,255,.35)}.ffb93f55 .swiper-button-next .icon,.ffb93f55 .swiper-button-prev .icon{fill:rgba(169,193,205,.55);height:.9rem;width:.9rem}html.is-hover .ffb93f55 .swiper-button-next:hover .icon,html.is-hover .ffb93f55 .swiper-button-prev:hover .icon{fill:#a9c1cd}.ffb93f55 .swiper-button-next:active .icon,.ffb93f55 .swiper-button-prev:active .icon,html.is-hover .ffb93f55 .swiper-button-next:hover:active .icon,html.is-hover .ffb93f55 .swiper-button-prev:hover:active .icon{fill:rgba(237,240,242,.15)}.ffb93f55 .swiper-lazy-loaded{-webkit-animation:fadein .2s ease-out;animation:fadein .2s ease-out}.ffb93f55 .illust-name-container{-webkit-box-flex:0;-webkit-box-ordinal-group:3;-webkit-flex:0;-webkit-order:2;bottom:-1.125rem;flex:0;order:2;position:relative}.ffb93f55 .illust-name{-webkit-transform:translate(-50%);background:rgba(237,240,242,.15);border:.05rem solid rgba(169,193,205,.55);border-radius:.55rem;bottom:0;color:#a9c1cd;display:block;font-size:.7rem;left:50%;line-height:.8rem;padding:.1rem .75em;position:absolute;transform:translate(-50%);z-index:2}.ffb93f55 .illust-name small{padding-left:.5em}.ffb93f55 .illust-name.transition-enter,.ffb93f55 .illust-name.transition-exit{transition-property:opacity,-webkit-transform;transition-property:opacity,transform;transition-property:opacity,transform,-webkit-transform}.ffb93f55 .illust-name.transition-enter{-webkit-transform:translate(-50%,1rem) scale(.25,.75);opacity:.01;transform:translate(-50%,1rem) scale(.25,.75)}.ffb93f55 .illust-name.transition-enter.transition-enter-active{-webkit-transform:translate(-50%);opacity:1;transform:translate(-50%)}.ffb93f55 .illust-name.transition-exit{opacity:1}.ffb93f55 .illust-name.transition-exit.transition-exit-active{opacity:.01}'}

/***/ }),

/***/ 911:
/***/ (function(module, exports) {

module.exports ={wrapper:'aa7e5188',css:'.aa7e5188{margin-right:-1.5rem;margin-top:-.75rem;overflow:hidden}.aa7e5188 .item{float:left;margin-right:1.5rem;margin-top:.5rem}.aa7e5188 .item .type{float:none;font-size:.7rem;line-height:1rem}.aa7e5188 .flag-navy{display:inline-block;height:1rem;margin-right:.3rem;margin-top:-.05rem;vertical-align:text-top;width:1rem}.aa7e5188 .unknown{color:rgba(169,193,205,.55)}'}

/***/ }),

/***/ 912:
/***/ (function(module, exports, __webpack_require__) {

module.exports ={wrapper:'b432bd20',css:'.b432bd20 .container{-webkit-box-direction:normal;-webkit-box-orient:horizontal;-webkit-flex-flow:row nowrap;display:-webkit-box;display:-webkit-flex;display:flex;flex-flow:row nowrap;margin-top:-.4rem}.b432bd20 .item{-webkit-box-flex:0;-webkit-flex:0 1 8.5rem;display:block;flex:0 1 8.5rem;margin-right:.5rem;min-width:0;padding:0;position:relative}.b432bd20 .item:before{border-radius:0;bottom:0;content:"";height:auto;left:0;opacity:0;position:absolute;right:0;top:0;width:auto;z-index:10}.b432bd20 .item:after{display:none}.b432bd20 .item .lvl{color:#fff;display:block;left:0;line-height:1.25rem;opacity:.5;position:absolute;top:-1.25rem}.b432bd20 .item .lvl:before{color:#a9c1cd;content:"Lv.";font-size:.6rem;padding-right:.25em}.b432bd20 .item .lvl .icon{background:no-repeat 50% 50%/contain;display:block;float:right;height:1.1rem;margin-left:.1rem;width:1.1rem}.b432bd20 .item .lvl .icon.icon-blueprint{background-image:url(' + __webpack_require__(913) + ')}.b432bd20 .item .lvl .icon.icon-catapult{background-image:url(' + __webpack_require__(914) + ')}.b432bd20 .item .lvl .icon:last-of-type{margin-left:.4rem}.b432bd20 .item .lvl.is-initial{color:#a9c1cd;display:none}.b432bd20 .item .lvl.is-initial:before{display:none}.b432bd20 .item .pic{background:no-repeat 100% 50%/cover;bottom:0;display:block;left:0;opacity:.5;overflow:hidden;position:absolute;right:0;top:0;z-index:-5}@supports ((-webkit-mask-position:0% 0%) or (mask-position:0% 0%)){.b432bd20 .item .pic{-webkit-mask:linear-gradient(270deg,transparent,#000 2.5rem,#000) repeat-y 0 0;background-position:0 50%;mask:linear-gradient(270deg,transparent,#000 2.5rem,#000) repeat-y 0 0}}.b432bd20 .item .flag-navy,.b432bd20 .item .icon-has-extra-illust{left:auto;opacity:.5;right:0;z-index:50}.b432bd20 .item.is-need-blueprint .lvl{color:#ffccd1}.b432bd20 .item.is-need-blueprint .lvl:before{color:rgba(255,204,209,.5)}.b432bd20 .item.is-need-catapult .lvl{color:#f4ff81}.b432bd20 .item.is-need-catapult .lvl:before{color:rgba(244,255,129,.65)}.b432bd20 .item.is-need-blueprint.is-need-catapult .lvl{color:#ffe57f}.b432bd20 .item.is-need-blueprint.is-need-catapult .lvl:before{color:rgba(255,224,130,.6)}.b432bd20 .item.is-switchable{margin-left:1.5rem}.b432bd20 .item .icon-switchable{-webkit-filter:drop-shadow(0 0 .25rem rgba(169,193,205,.55));fill:rgba(169,193,205,.55);filter:drop-shadow(0 0 .25rem rgba(169,193,205,.55));height:1.2rem;left:-1.6rem;margin-top:-.6rem;overflow:visible;position:absolute;top:50%;width:1.2rem;z-index:-1}html.is-hover .b432bd20 .item:hover .flag-navy,html.is-hover .b432bd20 .item:hover .icon-has-extra-illust,html.is-hover .b432bd20 .item:hover .lvl,html.is-hover .b432bd20 .item:hover .pic{opacity:1}html.is-hover .b432bd20 .item:hover:active{opacity:.5}.b432bd20 .item.on .flag-navy,.b432bd20 .item.on .icon-has-extra-illust,.b432bd20 .item.on .lvl,.b432bd20 .item.on .pic,.b432bd20 .item:active .flag-navy,.b432bd20 .item:active .icon-has-extra-illust,.b432bd20 .item:active .lvl,.b432bd20 .item:active .pic{opacity:1}.b432bd20 .item.on{pointer-events:none;z-index:-1}.b432bd20 .item.on:before{box-shadow:inset 0 0 .25rem #80d8ff,0 0 .3rem .05rem #40c4ff;opacity:1}.b432bd20 .item.on .pic{outline:.05rem solid #40c4ff}@supports ((-webkit-mask-position:0% 0%) or (mask-position:0% 0%)){.b432bd20 .item.on .pic{-webkit-mask:none;mask:none}}.b432bd20 .item.on .icon-has-extra-illust{-webkit-transform:none;margin:0;top:-1.2rem;transform:none}@media (max-width:660px){.b432bd20 .container{-webkit-box-direction:normal;-webkit-box-orient:vertical;-webkit-flex-flow:column wrap;border-left:2.5rem solid transparent;flex-flow:column wrap;margin-top:-.25rem}.b432bd20 .item{-webkit-box-flex:0;-webkit-flex:0 0 1.6rem;flex:0 0 1.6rem;margin-top:.5rem;width:7.2rem}.b432bd20 .item .lvl{display:block;font-size:.7rem;height:100%;left:-2.5rem;line-height:1.6rem;padding:0 .5rem 0 0;position:absolute;text-align:right;top:0;width:2.5rem}.b432bd20 .item .lvl .icon{margin-top:.25rem}.b432bd20 .item .lvl.is-initial{display:block}.b432bd20 .item .pic{width:100%}@supports ((-webkit-mask-position:0% 0%) or (mask-position:0% 0%)){.b432bd20 .item .pic{-webkit-mask:none;mask:none}}.b432bd20 .item .icon-has-extra-illust{margin:0;right:-1.2rem;top:-.5rem}.b432bd20 .item.is-switchable{margin-left:0;margin-top:2rem}.b432bd20 .item .icon-switchable{-webkit-transform:rotate(90deg);left:.15rem;margin:0;top:-1.6rem;transform:rotate(90deg)}.b432bd20 .item.is-has-icon .lvl{line-height:1.2em}.b432bd20 .item.is-has-icon .lvl .icon{bottom:0;height:.8rem;position:absolute;right:.5rem;width:.8rem}.b432bd20 .item.is-has-icon .lvl .icon+.icon{right:1.4rem}.b432bd20 .item.is-has-icon .lvl .icon+.icon+.icon{right:2.3rem}.b432bd20 .item.is-has-icon .lvl .icon+.icon+.icon+.icon{right:3.2rem}.b432bd20 .item.is-has-icon .lvl .icon+.icon+.icon+.icon+.icon{right:4.1rem}.b432bd20 .item.is-has-icon .lvl .icon+.icon+.icon+.icon+.icon+.icon{right:5rem}.b432bd20 .item.on .icon-has-extra-illust{margin:0;right:-1.1rem;top:-.5rem}}'}

/***/ }),

/***/ 913:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/ea83ab127cecd6be05116b4555875fd8.png";

/***/ }),

/***/ 914:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/d6a3465fd467cfb17988178f1563b63b.png";

/***/ }),

/***/ 915:
/***/ (function(module, exports) {

module.exports ={wrapper:'d30d1fe8',css:'.d30d1fe8 .item{border-radius:.55rem;display:block;line-height:1.1rem;margin:.55rem 0 0;padding:0;position:relative}.d30d1fe8 .item.disabled{opacity:.25}.d30d1fe8 .slot{background:rgba(169,193,205,.55);border-radius:.55rem 0 0 .55rem;border-right:.5rem solid transparent;color:#212121;display:inline-block;font-size:.7rem;height:1.1rem;left:0;line-height:1.1rem;margin-top:-.55rem;padding:0 0 0 .2rem;position:absolute;text-align:center;top:50%;width:1.6rem;z-index:2}.d30d1fe8 .equipment{display:inline-block;font-size:.7rem;margin:0;padding-left:2.8rem;padding-right:.75em;position:relative}.d30d1fe8 .equipment .icon{background-color:#263238;border:.05rem solid rgba(169,193,205,.55);border-radius:50%;height:1.5rem;left:1.1rem;margin-top:-.75rem;position:absolute;top:50%;width:1.5rem;z-index:10}.d30d1fe8 .equipment-name:after{background:rgba(38,50,56,.5);border:.05rem solid rgba(169,193,205,.25);border-radius:.55rem;bottom:-.05rem;content:"";left:1.85rem;position:absolute;right:0;top:-.05rem;z-index:-2}html.is-hover .d30d1fe8 a.equipment-name:hover:after{background-color:#0277bd;border-color:#0277bd}html.is-hover .d30d1fe8 a.equipment-name:hover .icon{background-color:#013b68;border-color:#0277bd}'}

/***/ }),

/***/ 916:
/***/ (function(module, exports) {

module.exports ={wrapper:'dd14b621',css:'.dd14b621>.title{float:left;margin-right:1em}.dd14b621 .lv{display:block;float:left;font-size:.7rem;line-height:1.1rem;margin:0 .5em .5rem 0;position:relative;text-align:right;width:3em}.dd14b621 .lv-input{-moz-appearance:textfield;-webkit-box-flex:0;-webkit-flex:none;flex:none;opacity:0;padding:0;position:absolute;right:0;text-align:center;top:.05rem;width:2.5em}.dd14b621 .lv-input::-webkit-inner-spin-button,.dd14b621 .lv-input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.dd14b621 .lv-input::inner-spin-button,.dd14b621 .lv-input::outer-spin-button{-moz-appearance:none;-webkit-appearance:none;appearance:none;margin:0}.dd14b621 .lv-input:focus{opacity:1}.dd14b621 .lv-input:focus~.lv-text,.dd14b621 .lv-input:focus~.lv-text:before{opacity:0}.dd14b621 .lv-text{border-bottom:.05rem solid rgba(169,193,205,.55)}.dd14b621 .lv-text:before{-webkit-transform:translateX(-100%);content:"lv.";position:absolute;transform:translateX(-100%);z-index:-1}.dd14b621 .slider{-webkit-align-self:center;align-self:center;display:block;float:left;height:1.1rem;position:relative;width:8.75rem}.dd14b621 .lv-slider{-webkit-appearance:none;background:none transparent;border:0;cursor:pointer;display:block;height:100%;width:100%}.dd14b621 .lv-slider:focus{outline:none}.dd14b621 .lv-slider::-webkit-slider-runnable-track{background:rgba(237,240,242,.15);border-radius:.05rem;height:.1rem;width:100%}.dd14b621 .lv-slider::-webkit-slider-thumb{-webkit-appearance:none;-webkit-transform-origin:50% 50%;background:#a9c1cd;border:0;border-radius:50%;cursor:pointer;height:.5rem;margin-top:-.2rem;position:relative;transform-origin:50% 50%;width:.5rem;z-index:10}.dd14b621 .lv-slider::-webkit-slider-thumb:hover{background:#fff}.dd14b621 .lv-slider::-webkit-slider-thumb:active{-webkit-transform:scale(1.2);background:#fff;transform:scale(1.2)}.dd14b621 .lv-slider::-moz-range-track{background:rgba(237,240,242,.15);height:.1rem;width:100%}.dd14b621 .lv-slider::-moz-range-thumb{background:#a9c1cd;border:0;border-radius:50%;cursor:pointer;height:.5rem;position:relative;transform-origin:50% 50%;width:.5rem;z-index:10}.dd14b621 .lv-slider::-moz-range-thumb:hover{background:#fff}.dd14b621 .lv-slider::-moz-range-thumb:active{background:#fff;transform:scale(1.2)}.dd14b621 .lv-slider::-ms-track{background:transparent;border-color:transparent;color:transparent;height:.1rem;width:100%}.dd14b621 .lv-slider::-ms-fill-lower,.dd14b621 .lv-slider::-ms-fill-upper{background:rgba(237,240,242,.15)}.dd14b621 .lv-slider::-ms-thumb{background:#a9c1cd;border:0;border-radius:50%;cursor:pointer;height:.5rem;margin-top:.05rem;position:relative;transform-origin:50% 50%;width:.5rem;z-index:10}.dd14b621 .lv-slider::-ms-thumb:hover{background:#fff}.dd14b621 .lv-slider::-ms-thumb:active{background:#fff;transform:scale(1.2)}.dd14b621 .current{background:#a9c1cd;height:.1rem;margin-top:-.05rem;pointer-events:none;position:absolute;top:50%}.dd14b621 .tick{bottom:.35rem;cursor:pointer;display:block;height:.5rem;position:absolute}.dd14b621 .tick:before{-webkit-transform:scale(.83333333);-webkit-transform-origin:50% 100%;color:rgba(169,193,205,.55);content:attr(data-level);display:block;font-size:.6rem;left:-.15rem;line-height:.75rem;padding:.25rem;position:absolute;top:-1.15rem;transform:scale(.83333333);transform-origin:50% 100%;z-index:2}.dd14b621 .tick:after{background:rgba(237,240,242,.15);border-radius:.05rem;bottom:0;content:"";left:-.05rem;position:absolute;top:-.65rem;transition:none;width:.1rem;z-index:-1}html.is-hover .dd14b621 .tick:hover:before{color:#a9c1cd}.dd14b621 .tick-align-left:before,.dd14b621 .tick-maxlv:before{left:auto;right:-.15rem}.dd14b621 .tick-highlight:after{background:linear-gradient(0deg,#a9c1cd .25rem,rgba(237,240,242,.15) 75%)}.dd14b621 .stats{clear:both;margin-top:-.2rem;overflow:hidden;position:relative}.dd14b621 .stat{float:left;margin-top:.2rem;overflow:visible;width:25%}.dd14b621 .stat .type{font-size:.7rem}.dd14b621 .stat:not(.is-negative) .type{color:#f2f2f2}@media (max-width:660px){.dd14b621 .stat{width:50%}}'}

/***/ }),

/***/ 917:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ShipDetailsContentEquipable; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames__ = __webpack_require__(759);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__appUI_containers_infos_component__ = __webpack_require__(758);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__appUI_components_icon_equipment__ = __webpack_require__(767);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__appUI_components_link__ = __webpack_require__(768);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__appUtils_get_pic__ = __webpack_require__(760);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__appUtils_get_link__ = __webpack_require__(762);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_sp_i18n__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__appLogic_database__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_sp_css_import__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__equipable_less__ = __webpack_require__(918);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__equipable_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__equipable_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_equipable_item_less__ = __webpack_require__(919);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_equipable_item_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__components_equipable_item_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_equipable_legend_less__ = __webpack_require__(920);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_equipable_legend_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12__components_equipable_legend_less__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class, _dec2, _class2, _dec3, _class3;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
















var equipmentTypeIdExclude = [2, // 小口径高角主炮
3, // 小口径高角主炮 (AAFD)
8, // 高角副炮
9, // 高角副炮 (AAFD)
16, // 夜侦
56, // 喷气机
53, // 陆攻
54, // 局战
59, // 陆战
30];

var ShipDetailsContentEquipable = (_dec = Object(__WEBPACK_IMPORTED_MODULE_9_sp_css_import__["a" /* ImportStyle */])(__WEBPACK_IMPORTED_MODULE_10__equipable_less___default.a), _dec(_class = function (_React$Component) {
    _inherits(ShipDetailsContentEquipable, _React$Component);

    function ShipDetailsContentEquipable() {
        _classCallCheck(this, ShipDetailsContentEquipable);

        return _possibleConstructorReturn(this, (ShipDetailsContentEquipable.__proto__ || Object.getPrototypeOf(ShipDetailsContentEquipable)).apply(this, arguments));
    }

    _createClass(ShipDetailsContentEquipable, [{
        key: 'insertPlaceHolders',
        value: function insertPlaceHolders() {
            var i = 0;
            var arr = [];
            while (i++ < 10) {
                arr.push(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span', { className: 'item placeholder', key: i }));
            }return arr;
        }
    }, {
        key: 'renderCollection',
        value: function renderCollection(collection, collectionIndex) {
            var _this2 = this;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_2__appUI_containers_infos_component__["a" /* default */],
                {
                    className: 'collection',
                    key: collectionIndex,
                    title: collection.name
                },
                collection.list.filter(function (list) {
                    return !equipmentTypeIdExclude.includes(list.type);
                }).map(function (list, listIndex) {
                    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(ShipDetailsContentEquipableItem, {
                        className: 'item',
                        key: collectionIndex + '-' + listIndex,
                        type: __WEBPACK_IMPORTED_MODULE_8__appLogic_database__["a" /* default */].equipmentTypes[list.type],
                        ship: _this2.props.ship
                    });
                }),
                this.insertPlaceHolders()
            );
        }
    }, {
        key: 'renderExSolot',
        value: function renderExSolot() {
            var _this3 = this;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_2__appUI_containers_infos_component__["a" /* default */],
                {
                    className: 'collection',
                    title: Object(__WEBPACK_IMPORTED_MODULE_7_sp_i18n__["a" /* default */])("ship_details.equipable_exslot")
                },
                this.props.ship.getExSlotEquipmentTypes().filter(function (typeID) {
                    return !equipmentTypeIdExclude.includes(typeID) && _this3.props.ship.canEquip(typeID);
                }).sort(function (a, b) {
                    return __WEBPACK_IMPORTED_MODULE_8__appLogic_database__["a" /* default */].equipmentTypes[a].order - __WEBPACK_IMPORTED_MODULE_8__appLogic_database__["a" /* default */].equipmentTypes[b].order;
                }).map(function (typeID, index) {
                    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(ShipDetailsContentEquipableItem, {
                        className: 'item is-exslot',
                        key: index,
                        type: __WEBPACK_IMPORTED_MODULE_8__appLogic_database__["a" /* default */].equipmentTypes[typeID]
                    });
                }),
                this.insertPlaceHolders(),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'noflex and' },
                    Object(__WEBPACK_IMPORTED_MODULE_7_sp_i18n__["a" /* default */])("ship_details.equipable_exslot_and")
                ),
                this.props.ship.getExSlotOtherEquipments().sort(function (a, b) {
                    return __WEBPACK_IMPORTED_MODULE_8__appLogic_database__["a" /* default */].equipments[a].order - __WEBPACK_IMPORTED_MODULE_8__appLogic_database__["a" /* default */].equipments[b].order;
                }).map(function (equipmentID, index) {
                    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(ShipDetailsContentEquipableItem, {
                        className: 'item is-exslot',
                        key: index,
                        equipment: __WEBPACK_IMPORTED_MODULE_8__appLogic_database__["a" /* default */].equipments[equipmentID]
                    });
                }),
                this.insertPlaceHolders()
            );
        }
    }, {
        key: 'render',
        value: function render() {
            if (false) console.log('thisShip equipable', this.props.ship.getEquipmentTypes());
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: this.props.className },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    __WEBPACK_IMPORTED_MODULE_2__appUI_containers_infos_component__["a" /* default */],
                    {
                        className: 'legends'
                    },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(ShipDetailsContentEquipableLegend, {
                        className: 'item off',
                        text: Object(__WEBPACK_IMPORTED_MODULE_7_sp_i18n__["a" /* default */])("ship_details.equipable_legend_no")
                    }),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(ShipDetailsContentEquipableLegend, {
                        className: 'item on',
                        text: Object(__WEBPACK_IMPORTED_MODULE_7_sp_i18n__["a" /* default */])("ship_details.equipable_legend_yes")
                    }),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(ShipDetailsContentEquipableLegend, {
                        className: 'item on is-special',
                        text: Object(__WEBPACK_IMPORTED_MODULE_7_sp_i18n__["a" /* default */])("ship_details.equipable_legend_yes"),
                        textSmall: Object(__WEBPACK_IMPORTED_MODULE_7_sp_i18n__["a" /* default */])("ship_details.equipable_legend_yes_extra", { type: __WEBPACK_IMPORTED_MODULE_8__appLogic_database__["a" /* default */].shipTypes[this.props.ship.type_display]._name })
                    })
                ),
                __WEBPACK_IMPORTED_MODULE_8__appLogic_database__["a" /* default */].equipmentCollections.map(this.renderCollection.bind(this)),
                this.renderExSolot()
            );
        }
    }]);

    return ShipDetailsContentEquipable;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class);




var ShipDetailsContentEquipableItem = (_dec2 = Object(__WEBPACK_IMPORTED_MODULE_9_sp_css_import__["a" /* ImportStyle */])(__WEBPACK_IMPORTED_MODULE_11__components_equipable_item_less___default.a), _dec2(_class2 = function (_React$Component2) {
    _inherits(ShipDetailsContentEquipableItem, _React$Component2);

    function ShipDetailsContentEquipableItem() {
        _classCallCheck(this, ShipDetailsContentEquipableItem);

        return _possibleConstructorReturn(this, (ShipDetailsContentEquipableItem.__proto__ || Object.getPrototypeOf(ShipDetailsContentEquipableItem)).apply(this, arguments));
    }

    _createClass(ShipDetailsContentEquipableItem, [{
        key: 'render',
        value: function render() {
            var _this5 = this;

            if (this.props.equipment) return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_4__appUI_components_link__["a" /* default */],
                { className: this.props.className + ' equipment', to: Object(__WEBPACK_IMPORTED_MODULE_6__appUtils_get_link__["a" /* default */])('equipment', this.props.equipment.id) },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    __WEBPACK_IMPORTED_MODULE_3__appUI_components_icon_equipment__["a" /* default */],
                    {
                        className: 'equipment-wrapper',
                        icon: this.props.equipment._icon
                    },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'span',
                        { className: 'name' },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            'span',
                            { className: 'name-wrapper' },
                            this.props.equipment._name
                        )
                    )
                )
            );

            // const isNotAV = this.props.ship && !this.props.ship.isType('AV')
            var canEquip = this.props.ship ? this.props.ship.canEquip(this.props.type.id) : undefined;
            var canEquipShipType = this.props.ship ? this.props.type.equipable_on_type.includes(this.props.ship.type_display) : undefined;
            // const remodels = this.props.ship.getSeriesData()
            //     .map(d => d.id)
            //     .filter(id => id !== this.props.ship.id)
            // let otherRemodels = canEquip ? [] : remodels.filter(id => db.ships[id].canEquip(this.props.type.id))
            var specialList = canEquipShipType === false ? __WEBPACK_IMPORTED_MODULE_8__appLogic_database__["a" /* default */].shipsSpecial[this.props.ship.type_display] || [] : [];
            specialList = specialList.filter(function (shipId) {
                return shipId !== _this5.props.ship.id
                // && !remodels.includes(shipId)
                && canEquipShipType !== __WEBPACK_IMPORTED_MODULE_8__appLogic_database__["a" /* default */].ships[shipId].canEquip(_this5.props.type.id);
            });

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_3__appUI_components_icon_equipment__["a" /* default */],
                {
                    className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()([this.props.className, {
                        'on': canEquip === true,
                        'off': canEquip === false,
                        'is-special': /*isNotAV && */canEquip && !canEquipShipType
                    }]),
                    icon: this.props.type.icon
                },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'span',
                    { className: 'name' },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'span',
                        { className: 'name-wrapper' },
                        this.props.type._name
                    )
                ),
                specialList.length > 0 && specialList.map(function (shipId, index) {
                    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'span',
                        { className: 'block', key: index },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            __WEBPACK_IMPORTED_MODULE_4__appUI_components_link__["a" /* default */],
                            { className: 'other on ship', to: Object(__WEBPACK_IMPORTED_MODULE_6__appUtils_get_link__["a" /* default */])('ship', shipId) },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span', { className: 'avatar', style: {
                                    backgroundImage: 'url(' + Object(__WEBPACK_IMPORTED_MODULE_5__appUtils_get_pic__["a" /* default */])('ship', shipId, '0-2') + ')'
                                } }),
                            __WEBPACK_IMPORTED_MODULE_8__appLogic_database__["a" /* default */].ships[shipId]._name
                        )
                    );
                }),
                canEquip !== canEquipShipType && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'span',
                    { className: 'block' },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'span',
                        { className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()(['other', {
                                'on': canEquipShipType,
                                'off': !canEquipShipType
                            }]) },
                        Object(__WEBPACK_IMPORTED_MODULE_7_sp_i18n__["a" /* default */])("other_ships_of_type", {
                            type: __WEBPACK_IMPORTED_MODULE_8__appLogic_database__["a" /* default */].shipTypes[this.props.ship.type_display]._name
                        })
                    )
                )
            );
        }
    }]);

    return ShipDetailsContentEquipableItem;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class2);



var ShipDetailsContentEquipableLegend = (_dec3 = Object(__WEBPACK_IMPORTED_MODULE_9_sp_css_import__["a" /* ImportStyle */])(__WEBPACK_IMPORTED_MODULE_12__components_equipable_legend_less___default.a), _dec3(_class3 = function (_React$Component3) {
    _inherits(ShipDetailsContentEquipableLegend, _React$Component3);

    function ShipDetailsContentEquipableLegend() {
        _classCallCheck(this, ShipDetailsContentEquipableLegend);

        return _possibleConstructorReturn(this, (ShipDetailsContentEquipableLegend.__proto__ || Object.getPrototypeOf(ShipDetailsContentEquipableLegend)).apply(this, arguments));
    }

    _createClass(ShipDetailsContentEquipableLegend, [{
        key: 'render',
        value: function render() {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'span',
                { className: this.props.className },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'span',
                    { className: 'wrapper' },
                    this.props.text,
                    this.props.textSmall && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'small',
                        null,
                        this.props.textSmall
                    )
                )
            );
        }
    }]);

    return ShipDetailsContentEquipableLegend;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class3);

/***/ }),

/***/ 918:
/***/ (function(module, exports) {

module.exports ={wrapper:'b28338b1',css:'.b28338b1 .collection{-webkit-box-direction:normal;-webkit-box-orient:horizontal;-webkit-flex-flow:row wrap;display:-webkit-box;display:-webkit-flex;display:flex;flex-flow:row wrap;overflow:hidden;position:relative}.b28338b1 .collection .noflex,.b28338b1 .collection>.title{-webkit-box-flex:0;-webkit-flex:none;flex:none;width:100%}.b28338b1 .collection .item{-webkit-box-flex:1;-webkit-flex:1 0 12.5rem;flex:1 0 12.5rem}.b28338b1 .collection .item.placeholder{height:0;overflow:hidden}.b28338b1 .collection .and{margin:.5em 0}.b28338b1 .legends{margin-right:-1.25em;margin-top:-1em}'}

/***/ }),

/***/ 919:
/***/ (function(module, exports) {

module.exports ={wrapper:'e7315251',css:'.e7315251{padding:.25rem 0 .25rem 1.3rem}.e7315251:before{z-index:5}.e7315251:after,.e7315251:before{left:0;position:absolute;top:.25rem}.e7315251:after{border:.05rem solid transparent;border-radius:50%;content:"";height:1.8rem;width:1.8rem;z-index:4}.e7315251 .name{border-radius:0 .7rem .7rem 0;display:inline-block;height:1.4rem;line-height:1.05em;margin:.2rem 0 .2rem -.5rem;padding:0 .6rem 0 1.25rem;position:relative;transition-property:none;z-index:1}.e7315251 .name:after{content:"";display:inline-block;height:100%;overflow:hidden;vertical-align:middle;width:0}.e7315251 .name-wrapper{display:inline-block;max-height:100%;max-width:100%;transition-property:none;vertical-align:middle}.e7315251 .name-wrapper small{display:block;font-size:.6rem}.e7315251 .other{background:rgba(237,240,242,.15);border:.05rem solid rgba(169,193,205,.55);border-radius:.55rem;color:#a9c1cd;display:inline-block;font-size:.7rem;line-height:1rem;margin-bottom:.1rem;padding:0 .4rem;position:relative}.e7315251 .other:after,.e7315251 .other:before{content:"";position:absolute}.e7315251 .other:before{border-left:.1rem solid rgba(237,240,242,.15);bottom:-.2rem;left:-.6rem;top:-.2rem}.e7315251 .other:after{border-top:.1rem solid rgba(237,240,242,.15);left:-.5rem;margin-top:-.05rem;top:50%;width:.5rem}.e7315251 .other .avatar{background-position:60% 0;background-size:cover;border-radius:.55rem;display:block;float:left;height:1.1rem;margin:-.05rem .25rem -.05rem -.45rem;overflow:hidden;width:1.6rem;z-index:-1}.e7315251 .other.on{background-color:#388e3c;border-color:#388e3c;color:#b9f6ca}.e7315251 .other.off{background-color:rgba(37,49,55,.5);border-color:rgba(237,240,242,.15);color:rgba(169,193,205,.55)}html.is-hover .e7315251 a.other.on:hover{background-color:#4caf50;border-color:#4caf50;color:#fff}.e7315251 a.other.on:active,html.is-hover .e7315251 a.other.on:hover:active{background-color:#1b5e20;border-color:#388e3c;color:#b9f6ca}.e7315251 .block{display:block;margin-left:-1.3rem;overflow:hidden;padding-left:1.3rem}.e7315251 .block:last-of-type{margin-bottom:.15rem}.e7315251 .block:last-of-type .other:before{border-bottom:.1rem solid rgba(237,240,242,.15);border-radius:0 0 0 .25rem;bottom:50%;margin-bottom:-.05rem;width:.6rem}.e7315251 .block:last-of-type .other:after{content:normal}.e7315251.on .name{background-color:#388e3c;color:#b9f6ca}.e7315251.on:after{background:#154a19;border-color:#388e3c}.e7315251.off .name{background-color:rgba(37,49,55,.5);color:rgba(169,193,205,.55)}.e7315251.off:before{opacity:.5}.e7315251.off:after{background:#253137;border-color:rgba(237,240,242,.15)}.e7315251.is-special .name{background-color:#0277bd;color:#cdefff}.e7315251.is-special:after{background:#013b68;border-color:#0277bd}.e7315251.is-exslot{padding-bottom:0;padding-top:0}.e7315251.is-exslot:before{top:0}.e7315251.is-exslot:after{content:normal}.e7315251.is-legend{font-size:.7rem}.e7315251.equipment{position:relative}.e7315251.equipment .equipment-wrapper{position:static;transition-property:none}.e7315251.equipment .equipment-wrapper:before{left:0;position:absolute;top:0;z-index:5}'}

/***/ }),

/***/ 920:
/***/ (function(module, exports) {

module.exports ={wrapper:'d8d44da3',css:'.d8d44da3{border-radius:.9rem;display:inline-block;height:1.8rem;line-height:1.05em;margin:1em 1.25em 0 0;padding:0 .75rem;position:relative}.d8d44da3:after{content:"";height:100%;overflow:hidden;width:0}.d8d44da3 .wrapper,.d8d44da3:after{display:inline-block;vertical-align:middle}.d8d44da3 .wrapper{max-height:100%;max-width:100%;transition-property:none}.d8d44da3 .wrapper small{display:block}.d8d44da3.on{background-color:#388e3c;color:#b9f6ca}.d8d44da3.off{background-color:rgba(37,49,55,.5);color:rgba(169,193,205,.55)}.d8d44da3.is-special{background-color:#0277bd;color:#cdefff}'}

/***/ }),

/***/ 921:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ShipDetailsContentInfos; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_remodels_jsx__ = __webpack_require__(830);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_quickfacts_jsx__ = __webpack_require__(829);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_stats_jsx__ = __webpack_require__(832);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_slot_equipments_jsx__ = __webpack_require__(831);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_illust_jsx__ = __webpack_require__(826);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_modernization_jsx__ = __webpack_require__(828);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_dismantle_jsx__ = __webpack_require__(824);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_sp_css_import__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__infos_less__ = __webpack_require__(922);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__infos_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__infos_less__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }


// import { Link } from 'react-router'









// import translate from 'sp-i18n'
// import db from '@appLogic/database'




// @connect()
var ShipDetailsContentInfos = (_dec = Object(__WEBPACK_IMPORTED_MODULE_8_sp_css_import__["a" /* ImportStyle */])(__WEBPACK_IMPORTED_MODULE_9__infos_less___default.a), _dec(_class = function (_React$Component) {
    _inherits(ShipDetailsContentInfos, _React$Component);

    function ShipDetailsContentInfos() {
        _classCallCheck(this, ShipDetailsContentInfos);

        return _possibleConstructorReturn(this, (ShipDetailsContentInfos.__proto__ || Object.getPrototypeOf(ShipDetailsContentInfos)).apply(this, arguments));
    }

    _createClass(ShipDetailsContentInfos, [{
        key: 'render',
        value: function render() {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: this.props.className },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__components_illust_jsx__["default"], {
                    ship: this.props.ship,
                    className: 'shipinfo shipinfo-illust'
                    // defaultIndex={this.props.illustIndex}
                    // onIndexChange={this.props.onIllustChange}
                }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__components_quickfacts_jsx__["default"], { ship: this.props.ship, className: 'shipinfo shipinfo-facts' }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__components_stats_jsx__["default"], { ship: this.props.ship, className: 'shipinfo shipinfo-stats' }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__components_slot_equipments_jsx__["default"], { ship: this.props.ship, className: 'shipinfo shipinfo-equipments' }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'shipinfo shipinfo-misc' },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__components_modernization_jsx__["default"], { ship: this.props.ship, className: 'shipinfo shipinfo-modernization' }),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__components_dismantle_jsx__["default"], { ship: this.props.ship, className: 'shipinfo shipinfo-dismantle' })
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__components_remodels_jsx__["default"], { ship: this.props.ship, className: 'shipinfo shipinfo-remodels' })
            );
        }
    }]);

    return ShipDetailsContentInfos;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component)) || _class);


/***/ }),

/***/ 922:
/***/ (function(module, exports) {

module.exports ={wrapper:'aae08ce8',css:'.aae08ce8{-webkit-box-direction:normal;-webkit-box-orient:horizontal;-webkit-flex-flow:row wrap;display:-webkit-box;display:-webkit-flex;display:flex;flex-flow:row wrap;min-height:calc(100vh - 9rem);padding-right:26.5625vw;position:relative}.aae08ce8:after{-webkit-box-flex:0;-webkit-box-ordinal-group:101;-webkit-flex:none;-webkit-order:100;content:"";flex:none;height:0;order:100;width:100%}.aae08ce8 .shipinfo{-webkit-box-flex:1;-webkit-flex:1 0 100%;flex:1 0 100%}.aae08ce8 .shipinfo-illust{-webkit-box-flex:0;-webkit-flex:none;flex:none;height:calc(90vh - 3.5rem);position:fixed;right:0;top:5.5rem;width:28.90625vw}.aae08ce8 .shipinfo-illust .swiper-container{-webkit-mask:linear-gradient(90deg,transparent,#000 1rem);mask:linear-gradient(90deg,transparent,#000 1rem)}@media (max-width:1152px){.aae08ce8 .shipinfo-illust{margin-left:-1.5rem;margin-right:-1.5rem}}@media (max-width:850px){.aae08ce8 .shipinfo-illust{margin-left:-1.2rem;margin-right:-1.2rem}}@media (max-width:850px) and all and (max-width:660px){.aae08ce8 .shipinfo-illust{margin-left:-.6rem;margin-right:-.6rem}}@media (max-width:660px){.aae08ce8 .shipinfo-illust{margin-left:-.6rem;margin-right:-.6rem}}.aae08ce8 .shipinfo-equipments,.aae08ce8 .shipinfo-misc{-webkit-flex-basis:50%;flex-basis:50%}.aae08ce8 .shipinfo-misc{min-width:12rem}.aae08ce8 .shipinfo-dismantle,.aae08ce8 .shipinfo-modernization{-webkit-flex-basis:12rem;flex-basis:12rem}@media (max-width:1152px){.aae08ce8{-webkit-align-content:flex-start;align-content:flex-start;padding-right:0}.aae08ce8:after{display:none}.aae08ce8 .shipinfo-illust{-webkit-box-flex:1;-webkit-flex:1 0 100%;bottom:auto;flex:1 0 100%;height:calc(100vh - 10rem);max-height:30rem;min-height:20rem;position:relative;right:auto;top:auto;width:auto}.aae08ce8 .shipinfo-illust .swiper-container{-webkit-mask:none;mask:none}}@media (max-width:850px){.aae08ce8 .shipinfo-facts{-webkit-box-direction:normal;-webkit-box-orient:horizontal;-webkit-flex-flow:row nowrap;display:-webkit-box;display:-webkit-flex;display:flex;flex-flow:row nowrap}.aae08ce8 .shipinfo-facts .item{-webkit-box-flex:1;-webkit-flex:1 0 auto;flex:1 0 auto;float:none}}@media (max-width:660px){.aae08ce8 .shipinfo-equipments,.aae08ce8 .shipinfo-misc{-webkit-flex-basis:100%;flex-basis:100%}.aae08ce8 .shipinfo-stats>.title{float:none}}@media (max-width:480px){.aae08ce8 .shipinfo-facts{display:block}.aae08ce8 .shipinfo-facts .item{float:none}}@media (min-width:1441px){.aae08ce8{padding-right:50%}.aae08ce8 .shipinfo-illust{width:calc(50vw - 6.5rem)}}'}

/***/ }),

/***/ 923:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ShipDetailsContentVoicelines; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__appUI_containers_infos_component__ = __webpack_require__(758);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_sp_i18n__ = __webpack_require__(64);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






// import db from '@appLogic/database'

// import { ImportStyle } from 'sp-css-import'
// import styles from './header.less'

// @connect()
// @ImportStyle(styles)

var ShipDetailsContentVoicelines = function (_React$Component) {
    _inherits(ShipDetailsContentVoicelines, _React$Component);

    function ShipDetailsContentVoicelines() {
        _classCallCheck(this, ShipDetailsContentVoicelines);

        return _possibleConstructorReturn(this, (ShipDetailsContentVoicelines.__proto__ || Object.getPrototypeOf(ShipDetailsContentVoicelines)).apply(this, arguments));
    }

    _createClass(ShipDetailsContentVoicelines, [{
        key: 'render',
        value: function render() {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_1__appUI_containers_infos_component__["a" /* default */],
                null,
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
                    'p',
                    null,
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'i',
                        null,
                        'ShipDetailsContentVoicelines'
                    )
                )
            );
        }
    }]);

    return ShipDetailsContentVoicelines;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);



/***/ })

};;