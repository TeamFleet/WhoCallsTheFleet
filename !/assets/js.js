"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

var $window = $(window),
    $document = $(document),
    $html = $('html'),
    $body = $('body'),
    $body_preventMouseover = !1,
    $body_isTouch = !1,
    _g = {
	isinit: !1,

	isload: !1,

	isfocus: document.hasFocus ? document.hasFocus() : !0,

	everfocus: document.hasFocus ? document.hasFocus() : !0,

	posttime: [],
	time_format: 'm月d日',
	time_format2: 'Y年m月d日',
	time_diff_range: 4 * 24 * 60 * 60 * 1000,
	time_diff_range2: 365 * 24 * 60 * 60 * 1000,

	last: {
		width: 0,
		height: 0
	},

	interval: {},

	initSize: 20,

	baseSize: 10,

	baseMultiper: 1,

	lastBaseSize: 10,

	pixelRatio: window.devicePixelRatio ? window.devicePixelRatio : screen.deviceXDPI ? screen.deviceXDPI / 72 : 1,

	maxMultiper: Math.max(1, Math.ceil((screen.availHeight || screen.height || $window.height()) / 800 * 10) / 10),

	strings: {},

	inputIndex: 0,

	lang: 'zh_cn',

	_: !1
},
    _p = {
	comp: {},
	el: {}
},
    _frame = {
	dom: {},
	init_all: function init_all() {
		for (var i in _frame) {
			if (_frame[i].init) {
				_frame[i].init();
			}
		}
	}
},
    _module = {},
    _page = {},
    _data = {};

if (typeof _huScrolled == 'undefined') var _huScrolled = {};
if (!_huScrolled.ver || _huScrolled.ver < 1.2) {
	_huScrolled.ver = 1.2;
	_huScrolled.timeout = !1;
	_huScrolled.throttle = _huScrolled.throttle || 100;

	var bIEnew = /\(Windows NT [0-9\.]+.+Trident\/[0-9\.]+.+rv.{1}[0-9\.]+\)/.test(navigator.userAgent),
	    bIE = !!(window.attachEvent && !window.opera) || bIEnew;

	var el = bIE && parseFloat(navigator.appVersion.split("MSIE")[1]) < 9 ? $window : $document;

	el.on({
		'scroll.huScrolled': function scrollHuScrolled() {
			if (_huScrolled.timeout) return !0;

			_huScrolled.timeout = setTimeout(function () {
				$document.trigger('huScrolled');

				_huScrolled.timeout = null;
			}, _huScrolled.throttle);
		}
	});
}

if (typeof _huResized == 'undefined') var _huResized = {};

if (!_huResized.ver || _huResized.ver < 2.1) {
	_huResized.ver = 2.1;
	_huResized.throttle = _huResized.throttle || 300;
	_huResized.startSize = {};

	_huResized.viewport = function () {
		var e = window,
		    a = 'inner';
		if (!('innerWidth' in window)) {
			a = 'client';
			e = document.documentElement || document.body;
		}
		return {
			width: e[a + 'Width'],
			height: e[a + 'Height']
		};
	};

	$window.on({
		'resize.huResized': function resizeHuResized(e, settings) {
			settings = settings || {};

			var viewport = _huResized.viewport(),
			    sWidth = _huResized.startSize.width || viewport.width,
			    sHeight = _huResized.startSize.height || viewport.height,
			    toshow = Math.abs(viewport.width - sWidth) > 50 || Math.abs(viewport.height - sHeight) > 50;

			if (_huResized.timeout) {
				clearTimeout(_huResized.timeout);
				_huResized.timeout = null;
			}

			if (!_huResized.topmask) _huResized.topmask = $('<div/>').css({
				'z-index': '16777269',
				'display': 'none',
				'position': 'fixed',
				'width': '100%',
				'height': '100%',
				'top': 0,
				'left': 0,
				'background-color': 'rgba(0,0,0,.5)'
			}).appendTo($body);

			if (toshow && !settings.isInitial && !_huResized.maskShowing) {
				_huResized.topmask.css('display', 'block');
				_huResized.maskShowing = !0;
			}

			if (!toshow && !_huResized.isChanging) {
				_huResized.startSize = {
					width: viewport.width,
					height: viewport.height
				};
			}

			_huResized.isChanging = !0;

			_huResized.timeout = setTimeout(function () {
				$window.trigger('huResized');
				_huResized.timeout = null;
				_huResized.maskShowing = !1;
				_huResized.isChanging = !1;

				_huResized.topmask.css('display', 'none');

				viewport = _huResized.viewport();
				_huResized.startSize = {
					width: viewport.width,
					height: viewport.height
				};
			}, settings.isInitial ? 0 : _huResized.throttle);
		}
	});
}

if (typeof _huCss == 'undefined') var _huCss = {};
if (!_huCss.ver || _huCss.ver < 1.2) {
	_huCss.ver = 1.2;
	_huCss.cssprefix_result = {};

	_huCss.csscheck = function (prop) {
		if (!_huCss.csscheck_div) {
			_huCss.csscheck_div = document.documentElement;
		}
		if (prop in _huCss.csscheck_div.style) {
			return !0;
		} else {
			var strs = prop.split('-');
			prop = strs[0];
			for (var i = 1; i < strs.length; i++) {
				prop += strs[1].substr(0, 1).toUpperCase() + strs[1].substr(1);
			}
			return prop in _huCss.csscheck_div.style;
		}
	};
	_huCss.csscheck_full = function (prop) {
		return _huCss.cssprefix(prop, null, !0);
	};

	_huCss.cssprefix = function (prop, onlyPrefix, isCheck) {
		if (_huCss.cssprefix_result[prop]) {
			var b = _huCss.cssprefix_result[prop];
		} else if (_huCss.cssprefix_result[prop] === !1) {
			if (isCheck) return !1;
			var b = '';
		} else {
			var b = '',
			    pre = ['-webkit-', '-moz-', '-ms-', '-o-'],
			    check = _huCss.csscheck(prop);

			if (!check) {
				b = !1;
				for (var i = 0; i < pre.length; i++) {
					if (_huCss.csscheck(pre[i] + prop)) {
						b = pre[i];
						break;
					}
				}
			}

			_huCss.cssprefix_result[prop] = b;

			if (isCheck) {
				b = b === !1 ? !1 : !0;
				return b;
			}
		}

		b = b === !1 ? '' : b;

		return onlyPrefix ? b : b + prop;
	};

	_huCss.csscheck_3d = function () {
		return _huCss.csscheck_full('perspective');
	};

	_huCss.createSheet = function (name) {
		var sheet = document.createElement('style');

		if (name) sheet.title = name;

		document.getElementsByTagName('head')[0].appendChild(sheet);
		if (!window.createPopup) {
			sheet.appendChild(document.createTextNode(''));
		}

		if (name) {
			for (var i = 0; i < document.styleSheets.length; i++) {
				if (document.styleSheets[i].title == name) {
					return document.styleSheets[i];
				}
			}
		}

		return document.styleSheets[document.styleSheets.length - 1];
	};

	_huCss.getSheet = function (sheet) {
		sheet = sheet || _huCss.sheet;
		if (!sheet) {
			_huCss.sheet = _huCss.createSheet('__huCss_sheet');

			sheet = _huCss.sheet;
		}
		return sheet;
	};

	_huCss.getCssRulesNum = function (sheet) {
		sheet = _huCss.getSheet(sheet);
		return sheet.cssRules ? sheet.cssRules.length : 0;
	};

	_huCss.addRule = function (selector, declaration, index, sheet) {
		var v = '';
		sheet = _huCss.getSheet(sheet);

		for (var i in declaration) {
			if (!_huCss.csscheck_full(i)) {
				if (i == 'opacity' && _huCss.csscheck_full('filter')) {
					v += 'filter:alpha(opacity=' + declaration[i] * 100 + ')';
				}
			} else {
				v += _huCss.cssprefix(i) + ':' + declaration[i] + ';';
			}
		}

		if (!index && index !== 0) {
			index = sheet.cssRules ? sheet.cssRules.length : _huCss.getCssRulesNum();
		}

		if (sheet.insertRule) {
			sheet.insertRule(selector + '{' + v + '}', index);
		} else {
			selector = selector.split(',');
			for (i = 0; i < selector.length; i++) {
				sheet.addRule(selector[i], v, index);
			}
		}
	};
	_huCss.removeRule = function (index, sheet) {
		if (!index && index !== 0) return !1;

		sheet = _huCss.getSheet(sheet);
		try {
			sheet.deleteRule(index);
		} catch (e) {
			sheet.removeRule(index);
		}
	};
}

var _UA = navigator.userAgent,
    bChrome = /Chrome/.test(_UA),
    bChromeVer = bChrome ? /Chrome\/([0-9\.]+)/.exec(navigator.appVersion) : !1,
    bSafari = /Safari/.test(_UA) && !bChrome,
    bFirefox = /Firefox/.test(_UA),
    bOpera = /Opera/.test(_UA),
    bWebkit = /WebKit/.test(_UA),
    bWebkitVer = bWebkit ? /(AppleWebKit|Safari)\/([0-9\.]+)/.exec(navigator.appVersion) : !1,
    bIEnew = /\(Windows NT [0-9\.]+.+Trident\/[0-9\.]+.+rv.{1}[0-9\.]+\)/.test(_UA),
    bIEnewVer = bIEnew ? parseFloat(_UA.split('rv:')[1]) : !1,
    bIE = !!(window.attachEvent && !window.opera) || bIEnew,
    bIE6 = bIE && parseFloat(navigator.appVersion.split("MSIE")[1]) < 7,
    bIE7 = bIE && parseFloat(navigator.appVersion.split("MSIE")[1]) < 8,
    bIE8 = bIE && parseFloat(navigator.appVersion.split("MSIE")[1]) < 9,
    bIE9 = bIE && parseFloat(navigator.appVersion.split("MSIE")[1]) < 10,
    bIE10 = bIE && parseFloat(navigator.appVersion.split("MSIE")[1]) < 11,
    bIE11 = bIEnewVer && bIEnewVer < 12,
    bGecko = !bIE && !bIEnew && !bWebkit && _UA.indexOf("Gecko") != -1,
    bIphone = /iPhone/i.test(_UA),
    bIpad = /iPad/i.test(_UA),
    bAndroid = /Android/i.test(_UA),
    bIOS = !1,
    bIOSver = bIphone || bIpad ? /CPU.*OS\s*([0-9_]+)/i.exec(navigator.appVersion) : !1,
    bMobile = bIphone || bIpad || bAndroid,
    bCSSrem = !bIE8,
    bCSS3 = _huCss.csscheck_full('border-radius'),
    bCSS3A = _huCss.csscheck_full('animation'),
    bCSS3flex = _huCss.csscheck_full('flex'),
    b3D = _huCss.csscheck_full('perspective'),
    bCSS3calc = bCSSrem,
    bTouch = /Touch/.test(_UA),
    bUnsupport = bIE7,
    bHTML5m3u8 = bMobile,
    bAccessYoutube = !1,
    bAccessTwitter = !1,
    bAccessFacebook = !1;

if (bWebkitVer && bWebkitVer.length) bWebkitVer = bWebkitVer[2];

if (bChromeVer && bChromeVer.length) bChromeVer = parseFloat(bChromeVer[1]);

if (bIOSver && bIOSver.length) {
	bIOSver = parseFloat(bIOSver[1].replace(/_/, '.'));
	bIOS = !0;
}

if (bChromeVer && bChromeVer < 29 || bIOSver && bIOSver < 7) bCSS3flex = !1;

if (bIOSver && bIOSver < 6) {
	bCSS3calc = !1;
}

if (bGecko) {
	$html.addClass('is-gecko');
} else if (bIE11 && !bIE10) {
	$html.removeClass('ie9').addClass('ie11' + (bTouch ? ' ie-touch' : ''));
} else if (bIE10 && !bIE9) {
	$html.removeClass('ie9').addClass('ie10' + (bTouch ? ' ie-touch' : ''));
} else if (bMobile) {
	$html.addClass('mobile');
	if (bIOS) {
		$html.addClass('ios');
	}
	if (bIphone) {
		$html.addClass('iphone');
	}
	if (bIpad) {
		$html.addClass('ipad');
	}
	if (bAndroid) {
		$html.addClass('android');
	}
} else if (bWebkitVer < 537) {
	$html.addClass('oldwebkit');
}

if (bTouch) {
	$html.addClass('touch');
}

if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
	var msViewportStyle = document.createElement("style");
	msViewportStyle.appendChild(document.createTextNode("@-ms-viewport{width:auto!important}"));
	document.getElementsByTagName("head")[0].appendChild(msViewportStyle);
}

_g.getUrl = function () {
	return location.href.split('#')[0];
};

_g.uriSearchArr = {};
_g.uriHashArr = {};
_g.timeHash = function () {
	var d = new Date();d = d.getTime();return d;
};
_g.uriSearch = function (name) {
	if (!_g.uriSearchArr.length) {
		var _s = location.search ? location.search.split('?')[1] : '';
		_s = _s.split('&');
		for (var i = 0; i < _s.length; i++) {
			var h = _s[i].split('=');
			_g.uriSearchArr[h[0]] = h[1] || '';
		}
	}
	return !name ? location.search.substr(location.search.indexOf('?') + 1) : _g.uriSearchArr[name];
};
_g.uriHash = function (name, val, value) {
	var curH = location.hash,
	    _h = curH ? curH.split('#')[1] : '';
	_h = _h.split('&');

	if (!_g.uriHashInited) {
		_g.uriHashArr = {};
		for (var i in _h) {
			var h = _h[i].split('=');
			if (h[0] !== '') _g.uriHashArr[h[0]] = h[1] || !1;
		}
		_g.uriHashInited = !0;
	}

	if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) == 'object') {
		for (var k in name) {
			curH = _g.uriHash(k, name[k], curH);
		}
		location.hash = curH;
	} else {
		if (val === !1 || val === '') {
			curH = curH.replace('&' + name + '=' + _g.uriHashArr[name], '').replace(name + '=' + _g.uriHashArr[name], '');

			if (curH == '#' || curH == '' || !curH) curH = '_';

			location.hash = curH;
		} else if (typeof val != 'undefined') {
			if (val == _g.uriHashArr[name]) return val;

			var _val = _g.uriHashArr[name] ? curH.replace(name + '=' + _g.uriHashArr[name], name + '=' + val) : curH + (curH == '' ? '#' : '&') + name + '=' + val;
			_g.uriHashArr[name] = val;
			if (value) {
				return _val;
			} else {
				location.hash = _val;
			}
			return val;
		}
	}
	return !name ? location.hash.substr(location.hash.indexOf('#') + 1) : _g.uriHashArr[name] || !1;
};

_g.randNumber = function (maxn) {
	var d = new Date();d = d.getTime();d = (d * 9301 + 49297) % 233280;if (!maxn) {
		maxn = 1000;
	};return Math.ceil(d / 233280.0 * maxn);
};
_g.randInt = function (max, min) {
	return Math.floor(Math.random() * parseInt(max) + (min ? parseInt(min) : 0));
};

_g.scrollTo = function (tar, y) {
	if (isNaN(tar)) {
		tar = $(tar);
		var cur = tar.scrollTop();
	} else {
		y = tar;
		tar = $('html,body');
		var cur = $window.scrollTop();
	}

	var diff = Math.abs(cur - y),
	    height = $window.height(),
	    time = diff <= height ? 200 : 200 * (diff / height) * (2 / 3);

	tar.stop().animate({
		'scrollTop': y
	}, time);
};

_g.get_em = function (num, el, fix) {
	var _num = parseFloat(num);
	el = el || $body;
	fix = fix || 0;
	if (isNaN(_num)) return num;
	return _num / parseFloat(el.css('font-size')) + fix + 'em';
};

_g.get_fontsize = function (el) {
	el = el || $body;
	return parseInt(el.css('font-size'));
};

_g.get_basesize = function () {
	return parseInt($body.css('font-size')) / _g.initSize * 10;
};

_g.get_basesize_true = function () {
	return parseInt($body.css('font-size'));
};

_g.get_basemultiper = function () {
	return parseFloat(_g.get_basesize() / 10);
};

_g.get_rem = function (unit) {
	var num = parseFloat(unit);

	if (isNaN(num)) return unit;

	if (!bCSSrem) return unit;

	return num / _g.initSize + 'rem';
};

_g.rem = function (unit, demical) {
	var num = parseFloat(unit);

	if (isNaN(num)) return unit;

	if (!bCSSrem) return unit;

	num = num / (_g.get_basesize() / 10) / _g.initSize;

	if (demical) return num + 'rem';

	return Math.round(10 * num) / 10 + 'rem';
};

_g.px = function (unit, only_number) {
	var num = parseFloat(unit);

	if (isNaN(num)) return unit;

	if (bIE8) return unit;

	return num * _g.initSize + (only_number ? 0 : 'px');
};

_g.get_animate_duration = function (duration) {
	return _g.isfocus ? duration : 0;
};

_g.goto_hash = function (hash, time) {
	hash = hash || location.hash;
	hash = hash.replace(/^([\#]{0,1})(.+)/, '$2');

	if (hash[0] == '!') return !1;

	var tar = $('#' + hash);
	if (!tar.length) return !1;

	var tarY = tar.offset().top,
	    curY = $window.scrollTop(),
	    diff = Math.abs(curY - tarY),
	    height = $window.height();

	time = time == null ? diff <= height ? 200 : 200 * (diff / height) * (2 / 3) : time;

	if (time) {
		$('html,body').stop().animate({
			'scrollTop': tarY
		}, time, function () {
			location.hash = hash;
		});
	} else {
		$('html,body').scrollTop(tarY);
		location.hash = hash;
	}

	return hash;
};

_g.time = function (str) {
	if (!str) return _g.timeNow();

	var time,
	    patt = [{
		exp: /(\d{4}).(\d{1,2}).(\d{1,2})[^0-9]*(\d{0,2})[:]{0,1}(\d{0,2})[:]{0,1}(\d{0,2})([\+\-])(\d{2})\:(\d{2})/i,
		p: {
			year: 1,
			month: 2,
			day: 3,
			hour: 4,
			min: 5,
			sec: 6,
			zoneD: 7,
			zoneH: 8,
			zoneM: 9
		}
	}, {
		exp: /(\d{1,2}).(\d{1,2}).(\d{4})[^0-9]*(\d{0,2})[:]{0,1}(\d{0,2})[:]{0,1}(\d{0,2})/i,
		p: {
			year: 3,
			month: 1,
			day: 2,
			hour: 4,
			min: 5,
			sec: 6
		}
	}, {
		exp: /(\d{4}).(\d{1,2}).(\d{1,2})[^0-9]*(\d{0,2})[:]{0,1}(\d{0,2})[:]{0,1}(\d{0,2})/i,
		p: {
			year: 1,
			month: 2,
			day: 3,
			hour: 4,
			min: 5,
			sec: 6
		}
	}];

	for (var i = 0; i < patt.length; i++) {
		var exp = patt[i].exp,
		    m = str.match(exp);

		if (!time && m && m.length) {
			var year = parseInt(m[patt[i].p.year]),
			    month = parseInt(m[patt[i].p.month]) || 0,
			    day = parseInt(m[patt[i].p.day]) || 1,
			    hour = parseInt(m[patt[i].p.hour]) || 0,
			    min = parseInt(m[patt[i].p.min]) || 0,
			    sec = parseInt(m[patt[i].p.sec]) || 0;

			time = new Date(year, month - 1, day, hour, min, sec, 0);

			if (patt[i].p.zoneD && m[patt[i].p.zoneD]) {
				var delta = m[patt[i].p.zoneD] == '+' ? -1 : 1,
				    hour = parseInt(m[patt[i].p.zoneH]) || 0,
				    min = parseInt(m[patt[i].p.zoneM]) || 0,
				    zone = delta * (min + hour * 60 + time.getTimezoneOffset()) * 60 * 1000;
				time = new Date(time.valueOf() + zone);
			}
		}
	}

	return time;
};

_g.timeCal = function (timestamp, hasfix) {
	if (timestamp < 60000) {
		return Math.floor(timestamp / 1000) + '秒' + (hasfix ? '前' : '');
	} else if (timestamp < 3600000) {
		return Math.floor(timestamp / 60000) + '分钟' + (hasfix ? '前' : '');
	} else if (timestamp < 86400000) {
		return Math.floor(timestamp / 3600000) + '小时' + (hasfix ? '前' : '');
	} else if (timestamp < 172800000) {
		return '昨天';
	} else if (timestamp < 2592000000) {
		return Math.floor(timestamp / 86400000) + '天' + (hasfix ? '前' : '');
	} else if (timestamp < 31536000000) {
		return Math.floor(timestamp / 2592000000) + '月' + (hasfix ? '前' : '');
	} else {
		return Math.floor(timestamp / 31536000000) + '年' + (hasfix ? '前' : '');
	}
};

_g.timeNow = function () {
	var now = new Date();
	return now.getTime();
};

_g.timeDiff = function (data) {
	var defaults = {
		time: _g.timeNow(),
		obj: null,
		format: _g.time_format,
		format2: _g.time_format2,
		range: _g.time_diff_range,
		range2: _g.time_diff_range2,
		is_init: !0
	};
	$.extend(defaults, data);
	if (!defaults.obj) return !1;
	data = defaults;
	return data;
};

_g.timeDiffInterval = function () {
	function theinterval() {
		if (!_g.isfocus) return !1;

		for (var i = 0; i < _g.posttime.length; i++) {
			var cur = !_g.posttime[i].is_init ? _g.timeDiff(_g.posttime[i]) : _g.posttime[i],
			    now = new Date(),
			    diff = now.getTime() - cur.time,
			    range = cur.range,
			    range2 = cur.range2;

			if (diff < range) {
				cur.obj.html(diff < 60000 ? '刚刚' : _g.timeCal(diff, !0));
			} else {
				var text = diff > range2 ? cur.format2 : cur.format,
				    _c = cur.time;

				text = text.replace(/Y/g, _c.getFullYear());
				text = text.replace(/M/g, _c.getMonth() + 1 < 10 ? '0' + (_c.getMonth() + 1) : _c.getMonth() + 1);
				text = text.replace(/m/g, _c.getMonth() + 1);
				text = text.replace(/D/g, _c.getDate() < 10 ? '0' + _c.getDate() : _c.getDate());
				text = text.replace(/d/g, _c.getDate());

				cur.obj.html(text);
			}
		}
	}
	clearInterval(_g.interval.posttime);
	theinterval();
	_g.interval.posttime = setInterval(function () {
		theinterval();
	}, 60000);
};

var _support = {
	cache: {},
	check: function check(technology) {
		technology = technology.toLowerCase().replace(/[ :-_]/g, '');
		if (typeof _support.cache[technology] == 'undefined' && _support['_' + technology]) {
			_support.cache[technology] = _support['_' + technology]();
		}
		return _support.cache[technology];
	}
};
function _b(string) {
	return _support.check(string);
}

_support._css3 = function () {
	return _huCss.csscheck_full('border-radius');
};

_support._css3animation = function () {
	return _huCss.csscheck_full('animation');
};

_support._css3transition = function () {
	return _huCss.csscheck_full('transition');
};

_support._css3flex = function () {
	return _huCss.csscheck_full('flex');
};

_support._css33d = function () {
	return _huCss.csscheck_full('perspective');
};
_support._css3d = _support._css33d;

_support._css3mediaquery = function () {
	return window.matchMedia || window.msMatchMedia ? !0 : !1;
};
_support._mediaquery = _support._css3mediaquery;

_support._css3imageset = function () {
	var result = null,
	    test = $('<div/>', {
		'style': 'background-image:url(' + _g.pathImg + '_g-p.gif' + ')'
	});

	function _test(prefix) {
		test.css('background-image', 'image-set(url(' + _g.pathImg + '_g-p.gif' + ') 1x)');
		var r = test.css('background-image');

		if (r && r != 'none') return !0;

		if (prefix) {
			test.css('background-image', prefix + 'image-set(url(' + _g.pathImg + '_g-p.gif' + ') 1x)');
			r = test.css('background-image');
			if (r && r != 'none') return prefix;
		}

		return !1;
	}

	if (bWebkit) {
		result = _test('-webkit-');
	} else if (bGecko) {
		result = _test('-moz-');
	} else if (bIE) {
		result = _test('-ms-');
	} else {
		result = _test();
	}

	return result;
};

_support._pluginflash = function () {
	var _ = !1;
	try {
		_ = typeof navigator.plugins != "undefined" && _typeof(navigator.plugins["Shockwave Flash"]) == "object" || window.ActiveXObject && new ActiveXObject("ShockwaveFlash.ShockwaveFlash") != !1;
	} catch (e) {}
	return _;
};
_support._flash = _support._pluginflash;

_support._html5attrdownload = function () {
	return "download" in document.createElement("a");
};
_support._html5download = _support._html5attrdownload;
_support._html5attributedownload = _support._html5attrdownload;

_support._html5videomp4 = function () {
	var mp4check = document.createElement('video'),
	    _ = !1;
	if (mp4check.canPlayType && mp4check.canPlayType('video/mp4').replace(/no/, '')) _ = !0;
	return _;
};
_support._html5mp4 = _support._html5videomp4;

_g.init = function () {
	_g.baseSize = _g.get_basesize();
	_g.baseMultiper = parseFloat(_g.baseSize / 10);
	_g.lastBaseSize = _g.get_basesize();

	_g.isfocus = Visibility.state() == 'visible';
	_g.everfocus = _g.isfocus;

	Visibility.change(function (e, state) {
		if (state == 'visible') {
			_g.isfocus = !0;
			if (!_g.everfocus) {
				_g.everfocus = !0;
				_g.last.width = -1;
				_g.last.height = -1;
				_frame.main.last.width = -1;
				_frame.main.last.height = -1;
			}
			$window.trigger('resized_check._g');
			_g.timeDiffInterval();
		} else {
			_g.isfocus = !1;
		}
	});

	$window.on({

		'orientationchange': function orientationchange() {
			$window.trigger('resize');
		},

		'huResized': function huResized() {
			$window.trigger('resized_check._g');
		},

		'resized_check._g': function resized_check_g() {
			if (!_g.isfocus) return !1;

			var w = $window,
			    _width = w.width(),
			    _height = w.height();

			_g.baseSize = _g.get_basesize();
			_g.orientation = _width >= _height ? 'landscape' : 'portrait';

			if (_g.baseSize != _g.lastBaseSize) {
				_g.baseMultiper = parseFloat(_g.baseSize / 10);
				_g.lastBaseSize = _g.baseSize;
				_g.isBaseChange = !0;

				w.trigger('basechange');
			}
			if (_width != _g.last.width || _height != _g.last.height) {
				var data = {
					is_widthchange: _width != _g.last.width,
					is_heightchange: _height != _g.last.height
				};

				w.trigger('resized_before', [data]).trigger('resized', [data]);

				_g.isEverResized = !0;
			}
			_g.last.width = _width;
			_g.last.height = _height;
		},

		'basechange': function basechange() {
			if (_g.isBaseChange) {
				_g.isBaseChange = !1;
				setTimeout(function () {
					$window.trigger('resized_before').trigger('resized', [{
						is_basechange: !0
					}]);
				}, _g.animate_duration_delay);
			}
		},

		'load.trigger_resized': function loadTrigger_resized() {
			if (!_g.isfocus) return !1;

			setTimeout(function () {
				$window.trigger('resized_before', [{
					is_load: !0
				}]).trigger('resized', [{
					is_load: !0
				}]);
			}, _g.readyLock ? _g.animate_duration * 4 + 10 : 0);
			_g.isload = !0;
		},

		"hashchange._global": function hashchange_global(e) {
			_g.uriHashArr = {};
			var _h = (location.hash ? location.hash.split('#')[1] : '').split('&');
			for (var i in _h) {
				var h = _h[i].split('=');
				if (h[0] !== '') _g.uriHashArr[h[0]] = h[1] || !1;
			}
			_g.uriHashInited = !0;

			if (!_g.uriHash() || _g.uriHash() == '') {
				e.preventDefault();
				e.stopPropagation();
			}
		},

		'unload.focuswindow': function unloadFocuswindow() {
			$(this).focus();
		}
	});

	setTimeout(function () {
		$window.trigger('hashchange');
	}, _g.animate_duration_delay + 10);

	$document.on({
		'huScrolled': function huScrolled() {
			$window.trigger('scrolled');
		}
	});

	$body.on({
		'touchstart.preventMouseover': function touchstartPreventMouseover() {
			$body.removeClass('hover');
			$body_preventMouseover = !0;
			$body_isTouch = !0;
		},

		'pointerenter': function pointerenter(e) {
			if (e.originalEvent.pointerType == 'touch') $body.trigger('touchstart.preventMouseover');else {
				$body_preventMouseover = !1;
				$body_isTouch = !1;
			}
		},

		'mouseover': function mouseover() {
			if ($body_isTouch) {
				$body_isTouch = !1;
				$body_preventMouseover = !0;
			} else {
				$body.addClass('hover');
				$body_preventMouseover = !1;
			}
		},
		'mouseleave': function mouseleave() {
			$body.removeClass('hover');
		}
	});

	if (top != self) {
		try {
			if (self.location.host != top.location.host) top.location.replace(self.location.href);

			if (self.location.host == top.location.host) {
				$body.addClass('only-content');
				_g.changeTheme(top._g.getTheme());
			}

			$html.css('font-size', top.$html.css('font-size'));
			$window.on({
				'resized.iframe_resize': function resizedIframe_resize() {
					$html.css('font-size', top.$html.css('font-size'));
				}
			});
		} catch (e) {}
	}

	_hotkey.init();
	_frame.init_all();

	_p.init_document_ready();

	$html.addClass('ready');

	$window.trigger('resize', [{ isInitial: !0 }]);

	_g.readyLock = !0;
	setTimeout(function () {
		_g.readyLock = null;
	}, _g.animate_duration * 4 + 10);

	try {
		window.external.msSiteModeClearBadge();
	} catch (e) {}

	_g.isinit = !0;
	return !1;
};

function addHandler(object, event, handler) {
	if (typeof object.addEventListener != 'undefined') object.addEventListener(event, handler, !1);else if (typeof object.attachEvent != 'undefined') object.attachEvent('on' + event, handler);else throw 'Incompatible browser';
}

jQuery.cookie = function (name, value, options) {
	if (typeof value != 'undefined') {
		options = options || {};
		if (value === null) {
			value = '';
			options.expires = -1;
		}
		var expires = '';
		if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
			var date;
			if (typeof options.expires == 'number') {
				date = new Date();
				date.setTime(date.getTime() + options.expires * 24 * 60 * 60 * 1000);
			} else {
				date = options.expires;
			}
			expires = '; expires=' + date.toUTCString();
		}

		var path = '; path=' + (options.path ? options.path : '/');
		var domain = options.domain ? '; domain=' + options.domain : /(.*)([\.]*)acgdb\.com/.test(location.host) ? '; domain=.acgdb.com' : '';
		var secure = options.secure ? '; secure' : '';
		document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
	} else {
		var cookieValue = null;
		if (document.cookie && document.cookie != '') {
			var cookies = document.cookie.split(';');
			for (var i = 0; i < cookies.length; i++) {
				var cookie = jQuery.trim(cookies[i]);

				if (cookie.substring(0, name.length + 1) == name + '=') {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	}
};

(function ($) {
	$.fn.innerWidth = function () {
		return parseFloat(this.css('width'));
	};
	$.fn.innerHeight = function () {
		return parseFloat(this.css('height'));
	};
})(jQuery);

$.fn.serializeObject = function () {
	var o = {};
	var a = this.serializeArray();
	function _mobj(obj, arr, val) {
		if (!arr.length) {
			return obj;
		}

		var e = arr[0];

		if (typeof obj[e] == 'undefined') {
			obj[e] = arr.length > 1 ? {} : val;
		} else if (arr.length == 1) {
			if (!obj[e].push) {
				obj[e] = [obj[e]];
			}
			obj[e].push(_val(val));
		}

		arr.shift();

		_mobj(obj[e], arr, val);
	}
	function _val(value) {
		if (typeof value == 'number' && value === 0) return value;
		return value || '';
	}
	$.each(a, function () {
		if (!/^_tabview\-/.test(this.name)) {
			this.value = isNaN(this.value) || !this.value ? this.value : parseFloat(this.value);
			if (this.name.indexOf('.') > -1) {
				var sep = this.name.split('.');
				_mobj(o, sep, this.value);
			} else {
				if (o[this.name] || o[this.name] === 0) {
					if (!o[this.name].push) {
						o[this.name] = [o[this.name]];
					}
					o[this.name].push(_val(this.value));
				} else {
					o[this.name] = _val(this.value);
				}
			}
		}
	});
	return o;
};

_p.initDOM = function (tar) {
	tar = tar || _frame.dom.layout || _frame.dom.layout || $body;

	return tar.initAll();
};
_p.initAll = _p.initDOM;
$.fn.initDOM = function () {
	for (var i in _p.el) {
		if (_p.el[i].init) _p.el[i].init(this);
	}

	return this;
};
$.fn.initAll = $.fn.initDOM;

_p.init_document_ready = function () {
	if (!_p.is_init_document_ready) {
		_p.initDOM($body);
		_p.is_init_document_ready = !0;
	}
};

_p.getSummary = function () {
	var summary = $('#summary').text() || !1;
	if (!summary && $('head').find('meta[name=keywords]').length) {
		summary = $('head').find('meta[name=Description]').attr('content');
		summary = summary.substr(0, summary.indexOf(' - ACGDB'));
	}
	return summary;
}, _p.get_tar = function (tar, className, is_startwith) {
	tar = tar || _frame.dom.layout || $('#layout') || $body;

	if (className.substr(0, 1) == '.') className = className.substr(1);
	if (tar.hasClass(className)) return tar;
	if (is_startwith) return tar.find('[class^="' + className + '"]');
	return tar.find('.' + className);
};

_p.hashlinks = function (tar) {
	tar = tar || $body;
	tar.find('a[href^=#]').each(function () {
		$(this).off('click.hashlink').on({
			'click.hashlink': function clickHashlink() {
				_g.goto_hash($(this).attr('href'));
				return !1;
			}
		});
	});
};

_p.get_lines = function (el, el_lineheight) {
	el_lineheight = el_lineheight || el;
	return Math.max(1, Math.floor(Math.min(el.innerHeight(), el.height()) / parseFloat(el_lineheight.css('line-height'))));
};

_p.el.time = {
	init: function init(tar) {
		var els = _p.get_tar(tar, '.time');
		els.each(function () {
			var o = $(this),
			    str = o.text();
			time = str ? _g.time(str) : null;

			if (time) {
				_g.posttime.push({
					time: time,
					obj: o
				});
			}
		});
		_g.timeDiffInterval();
	}
};

_p.el.timeSec = {
	init: function init(tar) {
		var els = _p.get_tar(tar, '.time-sec');
		els.each(function () {
			var o = $(this);

			if (o.data('acgdb-time-sec')) return o.data('acgdb-time-sec');

			var str = o.text(),
			    time = /\s*([0-9]+)/.exec(str);
			if (time && time.length > 1) {
				time = parseInt(time[1]);
				var m = Math.floor(time / 60),
				    s = time % 60,
				    t = (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s + "'";
				o.text(t);
			}
			o.data('acgdb-time-sec', time);
		});
	}
};

_p.removeEmptyTextNode = function (el) {
	el = $(el);

	if (!el.length) return !1;

	el.contents().filter(function () {
		return this.nodeType === 3;
	}).remove();
};

Object.defineProperty(Array.prototype, 'mergeFrom', {
	enumerable: !1,

	value: function value(arr2) {
		Array.prototype.push.apply(this, _instanceof(arr2, Array) ? arr2 : [arr2]);
		return this;
	}
});

Date.prototype.format = function (pattern, set) {
	return _g.formatTime(this, pattern, set);
};

_g.formatTime_string = {
	'zh_CN': {
		'Midnight': '深夜',

		'Sunday': '周日',
		'Monday': '周一',
		'Tuesday': '周二',
		'Wednesday': '周三',
		'Thursday': '周四',
		'Friday': '周五',
		'Saturday': '周六'
	}
};
_g.formatTime_weekdaymappding = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
_g.formatTime = function (time, pattern, set) {
	if (!time) return !1;

	set = set || {};
	pattern = pattern || '%Y年%m月%d日';

	if (typeof time != 'date') time = new Date(time);

	var timestamp = time.valueOf();

	function _zero(num) {
		return num < 10 ? '0' + num : num;
	}

	if (typeof set.output_timezone != 'undefined') {
		timestamp += (set.output_timezone + time.getTimezoneOffset() / 60) * 60 * 60 * 1000;
		time = new Date(timestamp);
	}

	var _G = time.getHours(),
	    _H = _zero(_G);

	if (set.midnight_astoday && (_G < 6 || _G == 24)) {
		_G += 24;
		_H = _G;
		timestamp -= 24 * 60 * 60 * 1000;
		time = new Date(timestamp);
		pattern = pattern.replace(/\%midnight/g, 'Midnight'._(_g.formatTime_string));
	} else {
		pattern = pattern.replace(/\%midnight/g, '');
	}

	return pattern.replace(/\%Y/g, time.getFullYear()).replace(/\%m/g, _zero(time.getMonth() + 1)).replace(/\%n/g, time.getMonth() + 1).replace(/\%d/g, _zero(time.getDate())).replace(/\%j/g, time.getDate()).replace(/\%G/g, _G).replace(/\%H/g, _H).replace(/\%i/g, _zero(time.getMinutes())).replace(/\%s/g, _zero(time.getSeconds())).replace(/\%l/g, _g.formatTime_weekdaymappding[time.getDay()]._(_g.formatTime_string));
};

Object.defineProperty(Object.prototype, '_size', {
	enumerable: !1,

	get: function get() {
		var size = 0;
		for (var i in this) {
			size++;
		}
		return size;
	}
});

String.prototype.getText = function (table, locale) {
	return _g.getText(this, table, locale, !0);
};
String.prototype._ = String.prototype.getText;

_g.getText = function (text, table, locale, isString) {
	if (!text || !table) return text;

	function _r(t) {
		if ((typeof t === 'undefined' ? 'undefined' : _typeof(t)) == 'object' && t.length) return t[0];
		return t;
	}

	locale = locale || _g.lang;

	var result = null;

	if (table[text]) {
		if (typeof table[text] == 'string') return _r(table[text]);
		if (table[text][locale]) return _r(table[text][locale]);
	}

	if (table[locale]) {
		if (table[locale][text]) return _r(table[locale][text]);
	}

	if (typeof text != 'string' && isString) {
		_t = '';
		for (i = 0; i < text.length; i++) _t += text[i];
		text = _t;
	}

	return _r(text);
};

_g.hashCode = function (t) {
	var length = 5;

	t = encodeURIComponent(t);

	try {
		return t.split("").reduce(function (a, b) {
			a = (a << length) - a + b.charCodeAt(0);return a & a;
		}, 0).toString(16);
	} catch (e) {
		var hash = 0,
		    i,
		    char;
		if (t.length == 0) return hash;
		for (i = 0, l = t.length; i < l; i++) {
			char = t.charCodeAt(i);
			hash = (hash << length) - hash + char;
			hash |= 0;
		}
		return hash.toString(16);
	}
};
String.prototype.hashCode = function () {
	return _g.hashCode(this);
};

String.prototype.filter = function () {
	return _g.stringFilter(this);
};
String.prototype.filterCensored = function () {
	return _g.stringFilterCensored(this);
};

String.prototype.escape = function () {
	return $('<div />').text(this).html();
};

var _tmpl = {
	export: function _export(value, returnHTML) {
		if (value.attr && returnHTML) return value.prop('outerHTML');
		if (value.attr && !returnHTML) return value;
		if (!value.attr && returnHTML) return value;
		if (!value.attr && !returnHTML) return $(value);
	}
};

var _hotkey = {
	allowed: !0,
	keyCodeBindings: {}
};

_hotkey.bind = function (keyCode, modifier, func, options) {
	if (typeof modifier == 'function') return _hotkey.bind(keyCode, null, modifier, func);

	if (!keyCode || !func) return !1;

	keyCode = parseInt(keyCode);
	modifier = typeof modifier == 'text' ? [modifier] : modifier || [];
	options = options || {};

	if (typeof _hotkey.keyCodeBindings[keyCode] == 'undefined') _hotkey.keyCodeBindings[keyCode] = {
		'default': [],
		'meta': [],
		'alt': [],
		'shift': [],
		'meta+alt': [],
		'meta+shift': [],
		'alt+shift': [],
		'meta+alt+shift': []
	};

	var metaKey = !1,
	    altKey = !1,
	    shiftKey = !1;

	for (var i in modifier) {
		modifier[i] = modifier[i].toLowerCase();

		if (modifier[i] == 'ctrl' || modifier[i] == 'meta') metaKey = !0;
		if (modifier[i] == 'alt') altKey = !0;
		if (modifier[i] == 'shift') shiftKey = !0;
	}

	if (metaKey && altKey && shiftKey) {
		_hotkey.keyCodeBindings[keyCode]['meta+alt+shift'].push(func);
	} else if (metaKey && altKey) {
		_hotkey.keyCodeBindings[keyCode]['meta+alt'].push(func);
	} else if (metaKey && shiftKey) {
		_hotkey.keyCodeBindings[keyCode]['meta+shift'].push(func);
	} else if (altKey && shiftKey) {
		_hotkey.keyCodeBindings[keyCode]['alt+shift'].push(func);
	} else if (metaKey) {
		_hotkey.keyCodeBindings[keyCode]['meta'].push(func);
	} else if (altKey) {
		_hotkey.keyCodeBindings[keyCode]['alt'].push(func);
	} else if (shiftKey) {
		_hotkey.keyCodeBindings[keyCode]['shift'].push(func);
	} else {
		_hotkey.keyCodeBindings[keyCode]['default'].push(func);
	}

	return !0;
};

_hotkey._run = function (arr) {
	for (var i in arr) arr[i]();
};

_hotkey.init = function () {
	if (_hotkey.is_init) return _hotkey;

	$window.on('keydown._hotkey', function (e) {
		if (document.activeElement.tagName != 'INPUT' && document.activeElement.tagName != 'TEXTAREA' && document.activeElement.tagName != 'SELECT' && !document.activeElement.hasAttribute('contenteditable') && _hotkey.allowed) {
			var keyCode = parseInt(e.keyCode || e.which);
			if (_hotkey.keyCodeBindings[keyCode]) {
				if ((e.ctrlKey || e.metaKey) && e.altKey && e.shiftKey) {
					_hotkey._run(_hotkey.keyCodeBindings[keyCode]['meta+alt+shift']);
				} else if ((e.ctrlKey || e.metaKey) && e.altKey) {
					_hotkey._run(_hotkey.keyCodeBindings[keyCode]['meta+alt']);
				} else if ((e.ctrlKey || e.metaKey) && e.shiftKey) {
					_hotkey._run(_hotkey.keyCodeBindings[keyCode]['meta+shift']);
				} else if (e.altKey && e.shiftKey) {
					_hotkey._run(_hotkey.keyCodeBindings[keyCode]['alt+shift']);
				} else if (e.ctrlKey || e.metaKey) {
					_hotkey._run(_hotkey.keyCodeBindings[keyCode]['meta']);
				} else if (e.altKey) {
					_hotkey._run(_hotkey.keyCodeBindings[keyCode]['alt']);
				} else if (e.shiftKey) {
					_hotkey._run(_hotkey.keyCodeBindings[keyCode]['shift']);
				} else if (!e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
					_hotkey._run(_hotkey.keyCodeBindings[keyCode]['default']);
				}
			}
		}
	});

	_hotkey.is_init = !0;
};

var _form = {};

_form.section = function (type, name, label, value, suffix, options) {
	if (!type) return !1;

	if ((typeof type === 'undefined' ? 'undefined' : _typeof(type)) == 'object') return _form.section(type['type'], type['name'] || null, type['label'] || null, type['value'] || null, type['suffix'] || null, type);

	if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) == 'object') return _form.section(type, name, name['label'] || null, name['value'] || null, name['suffix'] || null, name);

	if ((typeof label === 'undefined' ? 'undefined' : _typeof(label)) == 'object') return _form.section(type, name, label['label'] || null, label['value'] || null, label['suffix'] || null, label);

	if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object') return _form.section(type, name, id, value['value'] || null, value['suffix'] || null, value);

	if ((typeof suffix === 'undefined' ? 'undefined' : _typeof(suffix)) == 'object') return _form.section(type, name, id, value || null, suffix['suffix'] || null, suffix);

	options = options || {};

	var line = $('<dl/>').addClass(type, options.className),
	    title = $('<dt/>').appendTo(line),
	    cont = $('<dd/>').appendTo(line),
	    id = '_input_g' + _g.inputIndex;
	_g.inputIndex++;

	switch (type) {
		case 'directory':
			$('<label/>').html(label).appendTo(title);
			break;
		default:
			if (suffix) {
				$('<label/>').html(label).appendTo(title);
			} else {
				$('<label for="' + id + '"/>').html(label).appendTo(title);
			}
			break;
	}

	_form.element(type, name, id, value, options).appendTo(cont);

	if (suffix) $('<label for="' + id + '"/>').html(suffix).appendTo(cont);

	if (options.add) cont.append(options.add);

	return cont;
};
_form.line = _form.section;

_form.element = function (type, name, id, value, options) {
	if (!type) return !1;

	if ((typeof type === 'undefined' ? 'undefined' : _typeof(type)) == 'object') return _form.element(type['type'], type['name'] || null, type['id'] || null, type['value'] || null, type);

	if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) == 'object') return _form.element(type, name, name['id'] || null, name['value'] || null, name);

	if ((typeof id === 'undefined' ? 'undefined' : _typeof(id)) == 'object') return _form.element(type, name, id['id'] || null, id['value'] || null, id);

	if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object') return _form.element(type, name, id, value['value'] || null, value);

	options = options || {};
	id = id || null;

	if (id === null) {
		id = '_input_g' + _g.inputIndex;
		_g.inputIndex++;
	}

	var element = $(),
	    defaultValue = options['default'] || options['defaultValue'];

	switch (type) {
		default:
			element = $('<input/>', {
				'type': type,
				'name': name,
				'id': id
			}).val(value);
			break;
		case 'select':
			element = $('<select/>', {
				'name': name,
				'id': id
			}).val(value);
			var optionEmpty = $('<option value=""/>').appendTo(element);
			for (var i in value) {
				if (_typeof(value[i]) == 'object') {
					var v = value[i]['value'] || value[i].val,
					    o_el = $('<option value="' + v + '"/>').html(value[i]['title'] || value[i]['name']).appendTo(element);
				} else {
					var v = value[i],
					    o_el = $('<option value="' + v + '"/>').html(v).appendTo(element);
				}
				if (typeof defaultValue != 'undefined' && v == defaultValue) {
					o_el.prop('selected', !0);
				}
				if (!o_el.val()) {
					o_el.attr('disabled', !0);
				}
			}
			if (!value || !value.length) {
				optionEmpty.html('...');
			}
			if (options['new']) {
				$('<option value="" disabled/>').html('==========').insertAfter(optionEmpty);
				$('<option value="___new___"/>').html('+ 新建').insertAfter(optionEmpty);
				element.on('change.___new___', function () {
					if (element.val() == '___new___') {
						element.val('');
						options['new'](element);
					}
				});
			}
			break;
		case 'select_group':
		case 'selectGroup':
			element = $('<select/>', {
				'name': name,
				'id': id
			}).val(value);
			var optionEmpty = $('<option value=""/>').appendTo(element);
			for (var i in value) {
				var group = $('<optgroup label="' + value[i][0] + '"/>').appendTo(element);
				for (var j in value[i][1]) {
					var _v = value[i][1][j];
					if ((typeof _v === 'undefined' ? 'undefined' : _typeof(_v)) == 'object') {
						var o_el = $('<option value="' + (typeof _v.val == 'undefined' ? _v['value'] : _v.val) + '"/>').html(_v['title'] || _v['name']).appendTo(group);
					} else {
						var o_el = $('<option value="' + _v + '"/>').html(_v).appendTo(group);
					}
					if (typeof defaultValue != 'undefined' && o_el.val() == defaultValue) {
						o_el.prop('selected', !0);
					}
					if (!o_el.val()) {
						o_el.attr('disabled', !0);
					}
				}
			}
			if (!value || !value.length) {
				optionEmpty.html('...');
			}
			if (options['new']) {
				$('<option value="" disabled/>').html('==========').insertAfter(optionEmpty);
				$('<option value="___new___"/>').html('+ 新建').insertAfter(optionEmpty);
				element.on('change.___new___', function () {
					if (element.val() == '___new___') {
						element.val('');
						options['new'](element);
					}
				});
			}
			break;
		case 'checkbox':
			element = $('<input/>', {
				'type': type,
				'name': name,
				'id': id
			});

			if (typeof value == 'string' && value.toLowerCase() !== 'true') {
				element.val(value).prop('checked', options['checked']);
			} else {
				element.prop('checked', typeof options['checked'] == 'undefined' ? value : options['checked']);
			}
			break;
		case 'checkboxes':
			for (var i in value) {
				var v = value[i];
				if ((typeof v === 'undefined' ? 'undefined' : _typeof(v)) != 'object') v = [v, !1];

				if (parseInt(i)) {
					_g.inputIndex++;
					id = '_input_g' + _g.inputIndex;
				}

				element = element.add($('<input type="checkbox" name="' + name + '" id="' + id + '" value="' + v[0] + '" />').prop('checked', v[1])).add($('<label for="' + id + '"/>').html(v[2] || v[0]));
			}
			break;
		case 'directory':
		case 'file':
			element = $('<input type="text" name="' + name + '" id="' + id + '" />').on({
				'input': function input() {
					element.trigger('change');
				},
				'click': function click() {
					if (!element.val()) button.trigger('click');
				}
			}).val(value);
			var fileinput = $('<input type="file" class="none"' + (type == 'directory' ? ' nwdirectory' : '') + ' />').on('change', function () {
				element.val($(this).val()).trigger('change');
			}),
			    button = $('<button type="button" value="Browse..."/>').html('Browse...').on('click', function () {
				fileinput.trigger('click');
			});
			var elementAll = element.add(fileinput).add(button);
			if (options['accept']) fileinput.attr('accept', options['accept']);
			break;
	}

	if (options.required) element.prop('required', !0);

	if (options.onchange) {
		element.on('change.___onchange___', options.onchange);
		if (options['default']) element.trigger('change');
	}

	if (elementAll) return elementAll;

	return element;
};

_frame.dom = {};
_frame.main = {
	'last': {}
};

_frame.global = {
	key_registerd: [],

	esc_funcs: [],

	allowKeyNav: !0,
	esc_register: function esc_register(func) {
		_frame.global.esc_funcs.push(func);
	},

	disableBodyScroll: function disableBodyScroll() {
		$(document.body).on("touchmove.disableBodyScroll mousewheel.disableBodyScroll", function (event) {
			event.preventDefault();
			event.stopPropagation();
		});
	},

	enableBodyScroll: function enableBodyScroll() {
		$(document.body).off("touchmove.disableBodyScroll mousewheel.disableBodyScroll");
	}

};

_frame.global.init = function () {
	if (_frame.global.is_init) return !0;

	_frame.dom = {
		'layout': $('#layout')
	};

	$body.on({
		'keydown.esckey': function keydownEsckey(e) {
			if (document.activeElement.tagName != 'INPUT' && document.activeElement.tagName != 'TEXTAREA' && document.activeElement.tagName != 'SELECT' && !$(document.activeElement).attr('contenteditable') && _frame.global.allowKeyNav) {
				if (!e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
					var key = window.event ? e.keyCode : e.which;
					key = key.toString();
				}
			} else if (!_frame.global.allowKeyNav) {
					if (!e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
						var key = window.event ? e.keyCode : e.which;
						key = key.toString();
						switch (key) {
							case '27':
								for (var i = 0; i < _frame.global.esc_funcs.length; i++) {
									_frame.global.esc_funcs[i]();
								}
								break;
						}
					}
				}
		}
	});

	_frame.dom.hidden = $('<div/>', { 'class': 'none' }).appendTo($body);
	_frame.dom.hiddenVisible = $('<div/>', { 'class': 'none-visible' }).appendTo($body);
	_frame.dom.hiddenIframe = $('<iframe/>', { 'class': 'none', 'name': 'hiddeniframe' }).appendTo($body);

	$body.on('submit.check_submitting_status', 'form', function (e) {
		var form = $(this);
		if (form.hasClass('submitting') || form.hasClass('loading') || form.hasClass('disabled')) e.preventDefault();
	});

	_frame.global.is_init = !0;

	return !0;
};

var _menu = function _menu(settings) {
	if (!this.settings) {
		this.settings = $.extend(!0, {}, this.defaults, settings || {});

		this.init();
	}
};

_menu.prototype.defaults = {
	'items': [],

	'target': null,

	'className': null,

	'showBlured': !0
};

_menu.prototype.init = function () {
	var self = this;

	this.dom = {};
	this.dom.menu = $('<div class="menu"/>').addClass(this.settings.className).on('click', function () {
		if (!self.timeout_hideself) self.timeout_hideself = setTimeout(function () {
			self.timeout_hideself = null;
			self.hide();
		}, 10);
	});

	this.dom.body = $('<div class="body"/>').appendTo(this.dom.menu);

	this.dom.menu.on({
		'transitionend.menu_hide webkitTransitionEnd.menu_hide mozTransitionEnd.menu_hide': function transitionendMenu_hideWebkitTransitionEndMenu_hideMozTransitionEndMenu_hide(e) {
			if (e.currentTarget == e.target && e.originalEvent.propertyName == 'opacity' && parseFloat(self.dom.menu.css('opacity')) === 0) {
				self.hideTrue();
			}
		}
	});

	for (var i = 0, menuitem; menuitem = this.settings.items[i]; i++) {
		if (menuitem) {
			switch (menuitem) {
				case 'separator':
					menuitem = $('<hr/>');
					break;
			}
			if (menuitem.hasClass('donot_hide')) {
				menuitem.on('click', function () {
					setTimeout(function () {
						clearTimeout(self.timeout_hideself);
						self.timeout_hideself = null;
					}, 1);
				});
			}
			self.appendItem(menuitem);
		}
	}
	this.dom.body.find('input[type="checkbox"]+label').addClass('checkbox');

	if (this.settings.showBlured && _huCss.csscheck_full('backdrop-filter')) {
		this.dom.menu.addClass('mod-blur-backdrop');
	} else if (this.settings.showBlured && typeof node != 'undefined') {
		this.dom.menu.addClass('mod-blur-shot');
	}

	_frame.menu.menus.push(this);
};

_menu.prototype.show = function (targetEl, x, y) {
	if (this.showing) return this;

	if (typeof targetEl == 'number') return this.show('mouse', targetEl, x);

	var top, left, viewport_height, viewport_width, menu_height, menu_width;
	targetEl = targetEl || this.settings.target;

	clearTimeout(_frame.menu.timeout_hideall);
	_frame.menu.timeout_hideall = null;

	this.dom.menu.appendTo(_frame.menu.dom.container).addClass('show');
	_frame.menu.dom.container.addClass('on');

	this.showing = !0;

	this.dom.body.children().trigger('show');

	if (targetEl && _instanceof(targetEl, jQuery)) {
		var offset = targetEl.offset();
		top = offset.top + targetEl.height() - $body.scrollTop() + (y || 0);
		left = offset.left - $body.scrollLeft() + (x || 0);
	} else if (targetEl == 'mouse' || !targetEl && typeof x == 'number') {
		left = x || 0;
		top = y + 5 || 0;
	}

	viewport_height = $window.height() - 10;
	viewport_width = $window.width() - 10;

	menu_height = this.dom.menu.outerHeight();
	menu_width = this.dom.menu.outerWidth();

	this.dom.menu.css({
		'top': top + menu_height > viewport_height ? viewport_height - menu_height : top,

		'left': left + menu_width > viewport_width ? viewport_width - menu_width : left
	});

	if (this.settings.showBlured && typeof node != 'undefined') {
		node.win.capturePage(this.capturePage_callback.bind(this), 'jpg', 'datauri');
	} else {
		this.dom.menu.addClass('on');
	}
};

_menu.prototype.hide = function () {
	if (!this.showing) return !1;

	if (!this.dom.menu.hasClass('on')) this.hideTrue();

	this.dom.menu.removeClass('on');
};

_menu.prototype.hideTrue = function () {
	this.dom.menu.removeClass('show').css({
		'top': '',
		'left': ''
	}).detach();

	if (_instanceof(this.dom.blured, jQuery)) {
		this.dom.blured.remove();
		delete this.dom.blured;
	}

	this.showing = !1;
	_frame.menu.dom.container.removeClass('on');
};

_menu.prototype.appendItem = function (item) {
	if (_instanceof(item, jQuery)) return item.appendTo(this.dom.body);
};

_menu.prototype.capturePage_callback = function (datauri) {
	if (this.showing) {
		this.dom.blured = $('<s class="blured"/>').css('background-image', 'url(' + datauri + ')').appendTo(this.dom.menu.addClass('on'));
	}
};

_menu.hideAll = function (ms) {
	_frame.menu.timeout_hideall = setTimeout(function () {
		for (var i in _frame.menu.menus) {
			if (_frame.menu.menus[i].hide) _frame.menu.menus[i].hide();
		}
		_frame.menu.timeout_hideall = null;
	}, ms || 1);
};

_frame.menu = {
	dom: {},
	menus: [],
	init: function init() {
		if (this.is_init) return this;

		this.dom.container = $('<div class="menus"/>').on({
			'click': function click(e, ms) {
				_menu.hideAll(ms);
			},
			'contextmenu': function contextmenu() {
				_frame.menu.dom.container.trigger('click');
			} }).appendTo($body);

		$body.on('click.cancel_hideall', '.menus>.menu', function (e) {
			clearTimeout(_frame.menu.timeout_hideall);
			_frame.menu.timeout_hideall = null;
		});

		this.is_init = !0;
	}
};

_frame.modal = {
	dom: {},

	defaults: {
		'classname': '',

		'showBlured': !0

	},

	show: function show(content, title, options, callback) {
		clearTimeout(this.hide_timeout);
		this.hide_timeout = null;

		this.dom.container.addClass('show');
		this.showing = !0;

		var settings = $.extend({}, this.defaults, options);

		if (settings.detach) this.content = content;

		content.appendTo(this.dom.content);

		if (title) {
			this.dom.titlebar.html(title);
			this.dom.container.addClass('hastitle');
		} else {
			this.dom.titlebar.html('');
			this.dom.container.removeClass('hastitle');
		}

		this.dom.box.css({
			'width': settings.width || null,
			'height': settings.height || null
		});

		if (settings.showBlured) {
			if (_huCss.csscheck_full('backdrop-filter')) {
				this.dom.container.addClass('mod-blur-backdrop');
			} else if (!this.dom.blured && typeof node != 'undefined') {
				node.win.capturePage(function (datauri) {
					_frame.modal.dom.blured = $('<img/>').attr('src', datauri).appendTo(_frame.modal.dom.bg);
				}, 'jpg', 'datauri');
				this.dom.container.addClass('mod-blur-shot');
			}
		}

		this.dom.container.addClass('on ' + settings.classname).data('customclass', settings.classname);
		_p.initDOM(this.dom.content);

		this.dom.bg.off('click.blank_to_close').on('click.blank_to_close', function () {
			if (settings.blank_to_close) {
				_frame.modal.dom.btn_close.trigger('click');
			}
		});

		if (callback) callback(this.dom.content);
	},

	hide: function hide() {
		if (!this.showing) return !1;

		clearTimeout(this.hide_timeout);
		this.hide_timeout = null;
		this.dom.container.removeClass('on');
	},

	reset: function reset() {
		this.resetContent();

		if (this.dom.blured) {
			if (!parseInt(this.dom.container.css('opacity'))) {
				this.dom.blured.remove();
				this.dom.blured = null;
			}
			this.dom.container.removeClass('mod-blur-backdrop mod-blur-shot');
		}
	},

	resetContent: function resetContent() {
		if (this.content) {
			this.content.detach();
			this.content = null;
		}

		this.dom.content.empty();

		this.dom.container.removeClass(this.dom.container.data('customclass'));
		this.dom.container.data('customclass', '');

		this.dom.titlebar.html('');
		this.dom.container.removeClass('hastitle');
	}
};

_frame.modal.init = function () {
	if (this.is_init) return !0;

	this.dom.container = $('<div class="modal" />').on({
		'transitionend.modal_hide webkitTransitionEnd.modal_hide mozTransitionEnd.modal_hide': function transitionendModal_hideWebkitTransitionEndModal_hideMozTransitionEndModal_hide(e) {
			if (_frame.modal.showing && e.currentTarget == e.target && e.originalEvent.propertyName == 'opacity' && _frame.modal.dom.container.css('opacity') == 0) {
				_frame.modal.hide_timeout = setTimeout(function () {
					_frame.modal.reset();
					_frame.modal.dom.container.removeClass('show');

					_frame.modal.showing = !1;
				}, 10);
			}
		}
	}).prependTo($body);
	this.dom.box = $('<div/>').appendTo(this.dom.container);
	this.dom.titlebar = $('<header/>').appendTo(this.dom.box);
	this.dom.content = $('<section/>').appendTo(this.dom.box);
	this.dom.btn_close = $('<button class="close" />').html('&times;').on('click', function () {
		_frame.modal.hide();
	}).appendTo(this.dom.box);
	this.dom.bg = $('<s/>').appendTo(this.dom.container);

	_hotkey.bind('27', function () {
		_frame.modal.hide();
	});

	this.is_init = !0;
	return !0;
};

_p.tip = {
	pos: 'bottom',
	size_indicator: 8,

	filters: [],

	countdown_fade: 250,

	init_global: function init_global() {
		if (this.is_init) return !1;

		this.dom = $('<div id="tip"/>').on('transitionend webkitTransitionEnd mozTransitionEnd', function (e) {
			if (e.currentTarget == e.target && e.originalEvent.propertyName == 'opacity' && _p.tip.dom.css('opacity') == 0) {
				_p.tip.dom.removeClass('show').css({
					'top': '',
					'left': ''
				}).attr({
					'data-tip-indicator-pos': '',
					'data-tip-indicator-offset-x': '',
					'data-tip-indicator-offset-y': ''
				});
				if (_p.tip.dom_bluredbg) _p.tip.dom_bluredbg.css('background-image', '');
			}
		}).appendTo($body);

		this.dom_body = $('<div class="body"/>').appendTo(this.dom);

		if (_huCss.csscheck_full('backdrop-filter')) {
			this.dom.addClass('mod-blur-backdrop');
		} else if (typeof node != 'undefined') {
			this.dom.addClass('mod-blur-shot');
			this.dom_bluredbg = $('<div/>').appendTo($('<div class="bluredbg"/>').appendTo(this.dom));
		}

		this.is_init = !0;
	},

	show: function show(cont, el, pos) {
		if ($('body').data('preventMouseover') || !cont) return !1;

		clearTimeout(this.timeout_fade);
		this.timeout_fade = null;

		el = el || 'body';
		this.el = $(el);

		pos = pos || this.pos;

		cont = this.content(cont);

		this.init_global();

		if (!this.dom.hasClass('show')) {
			if (this.dom_bluredbg && typeof node != 'undefined') {
				node.win.capturePage(function (datauri) {
					_p.tip.dom_bluredbg.css('background-image', 'url(' + datauri + ')');
				}, 'jpg', 'datauri');
			}
			this.dom.addClass('show');
		}

		this.position(cont, pos);

		this.is_showing = !0;
	},

	position: function position(cont, pos) {
		var hashcode = cont.hashCode();

		if (this.curContent != hashcode) {
			this.dom.css({
				top: '-1000px',
				left: '-1000px'
			});
			this.dom_body.html(cont);
			_p.initDOM(this.dom_body);

			this.curContent = hashcode;
		}

		var coords = this['pos_' + pos](this.dom.outerWidth(), this.dom.outerHeight());
		if (coords) {
			this.move(coords.x, coords.y);
		}
	},

	hide: function hide(is_instant) {
		if (!this.is_init || !this.is_showing) return !1;

		this.timeout_fade = setTimeout(function () {
			_p.tip.el = null;

			_p.tip.dom.removeClass('on');

			_p.tip.is_showing = !1;
			_p.tip.curContent = null;

			_p.tip.timeout_fade = null;
		}, is_instant ? 0 : this.countdown_fade);
	},

	content: function content(cont, el) {
		el = el || this.el;

		return cont;
	},

	move: function move(x, y) {
		this.dom.css({
			top: y,
			left: x
		}).addClass('on');
	},

	get_indicator_size: function get_indicator_size() {
		return this.size_indicator * _g.baseMultiper;
	},

	pos_mouse: function pos_mouse(w, h) {
		this.el.unbind('mousemove.tooltip').bind('mousemove.tooltip', function (e) {
			var xOff = 25,
			    yOff = 30,
			    x = e.pageX + xOff,
			    y = e.pageY + 20,
			    _w = jQuery(window).innerWidth(),
			    _h = jQuery(window).innerHeight(),
			    _t = jQuery(window).scrollTop(),
			    _l = jQuery(window).scrollLeft();
			if (x + w + xOff > _w + _l) {
				x = x - w - xOff - 20;
			}
			if (y + 10 + h > _h + _t) {
				y = _h + _t - h - 10;
			}
			_p.tip.move(x, y);
		});
	},
	pos_bottom: function pos_bottom(w, h) {
		var el = this.el,
		    dom = this.dom,
		    offset = el.offset(),
		    x = offset.left + (el.outerWidth() - dom.outerWidth()) / 2,
		    y = offset.top + el.outerHeight() + this.get_indicator_size();

		this.dom.attr('data-tip-indicator-pos', 'top');

		return this.checkpos(x, y, w, h);
	},
	pos_top: function pos_top(w, h) {
		var el = this.el,
		    dom = this.dom,
		    offset = el.offset(),
		    x = offset.left + (el.outerWidth() - dom.outerWidth()) / 2,
		    y = offset.top - h - this.get_indicator_size();

		this.dom.attr('data-tip-indicator-pos', 'bottom');

		return this.checkpos(x, y, w, h);
	},
	pos_left: function pos_left(w, h) {
		var el = this.el,
		    dom = this.dom,
		    offset = el.offset(),
		    x = offset.left - w - this.get_indicator_size(),
		    y = offset.top + (el.outerHeight() - dom.outerHeight()) / 2;

		this.dom.attr('data-tip-indicator-pos', 'right');

		return this.checkpos(x, y, w, h);
	},
	pos_right: function pos_right(w, h) {
		var el = this.el,
		    dom = this.dom,
		    offset = el.offset(),
		    x = offset.left + el.outerWidth() + this.get_indicator_size(),
		    y = offset.top + (el.outerHeight() - dom.outerHeight()) / 2;

		this.dom.attr('data-tip-indicator-pos', 'left');

		return this.checkpos(x, y, w, h);
	},
	checkpos: function checkpos(x, y, w, h) {
		var el = this.el,
		    dom = this.dom,
		    offset = el.offset(),
		    nx = x,
		    ny = y,
		    pos = { x: nx, y: ny },
		    clientWidth = $document.width() || $window.width();

		if (x + w > clientWidth) {
			if (w > offset.left) {
				pos = {
					'x': clientWidth - w - 2,
					'y': y
				};
			} else {
				pos = this['pos_left'](w, h);
			}
		} else if (x < 0) pos = this['pos_right'](w, h);

		if (y + h > $(window).scrollTop() + $(window).height()) pos = this['pos_top'](w, h);else if (y < $(window).scrollTop()) pos = this['pos_bottom'](w, h);

		dom.attr({
			'data-tip-indicator-offset-x': x - nx + 'px',
			'data-tip-indicator-offset-y': y - ny + 'px'
		});
		return pos;
	},

	trigger_by_el: function trigger_by_el(el) {
		var cont = el.data('tip');

		if (!el.data('tip-filtered')) {
			this.filters.forEach(function (filter) {
				cont = filter(cont) || cont;
			});
			el.data({
				'tip': cont,
				'tip-filtered': !0
			});
		}

		this.show(cont, el, el.data('tip-position'));
	}
};

_p.el.tip = {

	init: function init() {
		if (_p.el.tip.isInit) return !1;

		$body.on('mouseenter._tip', '[data-tip]', function () {
			if (!$body_preventMouseover) _p.tip.trigger_by_el($(this));
		}).on('mouseleave._tip', '[data-tip]', function () {
			_p.tip.hide();
		}).on('click._tip', '[data-tip]', function () {
			_p.tip.hide(!0);
		}).on('tipshow._tip', '[data-tip]', function () {
			_p.tip.trigger_by_el($(this));
		}).on('tiphide._tip', '[data-tip]', function () {
			_p.tip.hide();
		});

		_p.el.tip.isInit = !0;
	}
};

_p.el.links = {
	is_init: !1,

	click: function click(el, e) {
		var href = el.attr('href');

		if (el.hasClass('disabled')) {
			if (e) {
				e.preventDefault();
				e.stopImmediatePropagation();
				e.stopPropagation();
			}
			return !1;
		}
	},

	init: function init(tar) {
		if (!_p.el.links.is_init) {
			$body.on('click.link_delegate', 'a', function (e) {
				var el = $(this),
				    target = el.attr('target');

				if (typeof node != 'undefined') {
					if (this.hostname != window.location.hostname) target = '_external';

					if (target == '_external' || target == '_blank') {
						node.gui.Shell.openExternal(el.attr('href'));
						e.preventDefault();
						return !0;
					}
				}

				_p.el.links.click(el, e);
			});

			_p.el.links.is_init = !0;
		}
	}
};

_p.el.form = {
	init_el: function init_el(el) {
		if (el.data('is_init_form_el')) return !0;

		el.find('textarea').on({
			'keyup.ctrl_enter_submit': function keyupCtrl_enter_submit(e) {
				var key = window.event ? e.keyCode : e.which;
				key = key.toString();
				switch (key) {
					case '13':
						if (e.metaKey || e.ctrlKey) {
							el.submit();
						}
						break;
				}
			}
		});

		el.data('is_init_form_el', !0);
	},

	init: function init(tar, els) {
		tar = tar || $body;
		els = els || tar.find('form');

		els.each(function () {
			_p.el.form.init_el($(this));
		});
	}
};

_p.el.flexgrid = {
	create: function create() {
		var el = $('<div class="flexgrid"/>');
		_p.el.flexgrid.init_el(el);
		return el;
	},

	init_el: function init_el(el) {
		if (el.data('is_init_flexgrid')) return !0;

		if (!el.data('append_before_this')) {
			el.data('append_before_this', $('<div class="unit"/>').appendTo(el));
			var i = 0;
			while (i < 9) {
				$('<div class="unit"/>').appendTo(el);
				i++;
			}
		}

		el.data('is_init_flexgrid', !0);
	},

	init: function init(tar, els) {
		tar = tar || $body;
		els = els || tar.find('.flexgrid');

		els.each(function () {
			_p.el.flexgrid.init_el($(this));
		});
	}
};

jQuery.fn.extend({
	appendDOM: function appendDOM(el_to_append) {
		if (typeof el_to_append == 'function') el_to_append = el_to_append();

		if (el_to_append) el_to_append.insertBefore(this.data('append_before_this'));
		return this;
	}
});

_p.el.table = {
	dom: {},

	hover_column_getTable: function hover_column_getTable(path) {
		function _check(index) {
			if (path[index].tagName.toLowerCase() == 'table') return $(path[index]);

			return _check(index + 1);
		}
		return _check(0);
	},
	hover_column_getTr: function hover_column_getTr(path) {
		function _check(index) {
			if (path[index].tagName.toLowerCase() == 'tr') return $(path[index]);

			return _check(index + 1);
		}
		return _check(0);
	},

	hover_column_mouseenter: function hover_column_mouseenter(table, td_index) {
		table.find('tbody tr td:nth-of-type(' + (parseInt(td_index) + 1) + ')').addClass('state-hover-column');
	},
	hover_column_mouseleave: function hover_column_mouseleave(table, td_index) {
		table.find('tbody tr td:nth-of-type(' + (parseInt(td_index) + 1) + ')').removeClass('state-hover-column');
	},

	init_el: function init_el(el) {
		if (el.data('is_init_table')) return !0;

		el.data('is_init_table', !0);
	},

	init: function init(tar, els) {
		tar = tar || $body;
		els = els || tar.find('table');

		if (!_p.el.table.is_init) {
			$html.on('mouseenter.tablehover-column', 'body.hover table.hashover-column tbody td', function (e) {
				if (e && e.originalEvent.path) {
					var path = e.originalEvent.path,
					    td = $(this).on('mouseleave.tablehover-column', function () {
						_p.el.table.hover_column_mouseleave(table, index);
						td.off('mouseleave.tablehover-column');
					}),
					    table = _p.el.table.hover_column_getTable(path),
					    tr = _p.el.table.hover_column_getTr(path),
					    index = $.inArray(td[0], tr.find('td'));
					_p.el.table.hover_column_mouseenter(table, index);
				}
			});
			_p.el.table.is_init = !0;
		}

		els.each(function () {
			_p.el.table.init_el($(this));
		});
	}
};

_p.el.tabview = {
	dom: {},
	index: 0,

	init_el: function init_el(el) {
		if (el.data('is_init_tabview')) return !0;

		var tabid = 'tabv' + _p.el.tabview.index,
		    tabc = el.children('section'),
		    tabs = $('<header/>').prependTo(el);

		_p.el.tabview.dom[tabid] = el;

		tabc.each(function (index) {
			var _id = '_tabview-' + tabid + '-' + (index + 1),
			    _content = $(this),
			    title = _content.data('tabname');

			$('<input />', {
				'type': 'radio',
				'name': '_tabview-' + tabid,
				'id': _id,
				'value': index + 1,
				'class': 'tabview-switch'
			}).data('tabview-content', _content).prop('checked', index == 0).on('change', function () {
				if ($(this).prop('checked')) {
					$(this).data('tabview-content').trigger('tabview-show');
					_g.uriHash('tv_' + tabid, index + 1);
				} else {
					$(this).data('tabview-content').trigger('tabview-hide');
				}
			}).prependTo(el);

			$('<label/>', {
				'for': _id,
				'html': title
			}).appendTo(tabs);

			if (!index) _content.trigger('tabview-show');
		});

		_p.el.tabview.index++;

		$window.on('hashchange.tabview-' + tabid, function () {
			var hash = _g.uriHash('tv_' + tabid);
			if (hash) {
				_p.el.tabview.dom[tabid].children('input[type="radio"].tabview-switch[value="' + hash + '"]').prop('checked');
			}
		});

		el.data('is_init_tabview', !0);
	},

	init: function init(tar, els) {
		tar = tar || $body;
		els = els || tar.find('.tabview');

		els.each(function () {
			_p.el.tabview.init_el($(this));
		});
	}
};
$document.ready(function () {

	$body = $('body');

	for (var i in _g.func_first) {
		_g.func_first[i]();
	}

	_g.init();

	for (var i in _g.func_last) {
		_g.func_last[i]();
	}
});

"use strict";

_g.animate_duration_delay = 320;
_g.inputIndex = 0;
_g.lang = 'zh_cn';
_g.joint = '・';
_g.isNWjs = typeof node != 'undefined' || typeof nw != 'undefined';
_g.isClient = _g.isNWjs ? !0 : !1;
_g.defaultHqLv = 90;

function eventName(event, name) {
	name = name ? '.' + name : '';
	if (_g.event[event]) return _g.event[event].split(' ').map(function (value) {
		return value + name;
	}).join(' ');
	return event + name;
}

_g.updateDefaultHqLv = function (val) {
	val = parseInt(val) || _g.defaultHqLv;
	if (val <= 0) val = _g.defaultHqLv;
	if (val != Lockr.get('hqLvDefault', _g.defaultHqLv)) {
		Lockr.set('hqLvDefault', val);
		clearTimeout(_g.delay_updateDefaultHqLv);
		_g.delay_updateDefaultHqLv = setTimeout(function () {
			$body.trigger('update_defaultHqLv', [val]);
			clearTimeout(_g.delay_updateDefaultHqLv);
			_g.delay_updateDefaultHqLv = null;
		}, 200);
	}
};

_g.statSpeed = {
	5: '低速',
	10: '高速'
};
_g.statRange = {
	1: '短',
	2: '中',
	3: '长',
	4: '超长'
};
_g.textRank = {
	1: '|',
	2: '||',
	3: '|||',
	4: '\\',
	5: '\\\\',
	6: '\\\\\\',
	7: '》'
};
_g.getStatSpeed = function (speed) {
	return _g.statSpeed[parseInt(speed)];
};
_g.getStatRange = function (range) {
	return _g.statRange[parseInt(range)];
};

var _l = {};

String.prototype.printf = function () {
	if (typeof vsprintf != 'undefined') return vsprintf(this, Array.prototype.slice.call(arguments));
	return this;
};

_g.badge = function (cont, t) {
	if (typeof t == 'string') t = t.toLowerCase();
	switch (t) {
		case 'error':
			return _g.badgeError(cont);
			break;
		default:
			return _g.badgeMsg(cont);
			break;
	}
};
_g.badgeMsg = function (cont) {
	_frame.dom.layout.attr('data-msgbadge', cont);
	clearTimeout(this.timeout_badgeMsg_hiding);
	this.timeout_badgeMsg_hiding = setTimeout(function () {
		_frame.dom.layout.removeAttr('data-msgbadge');
		delete _g.timeout_badgeMsg_hiding;
	}, 3000);
};
_g.badgeError = function (cont) {
	_frame.dom.layout.attr('data-errorbadge', cont);
	clearTimeout(this.timeout_badgeError_hiding);
	this.timeout_badgeError_hiding = setTimeout(function () {
		_frame.dom.layout.removeAttr('data-errorbadge');
		delete _g.timeout_badgeError_hiding;
	}, 3000);
};

_g.pageChangeBefore = function () {
	_frame.dom.mobilemenu.prop('checked', !1);
};

var _ga = {
	counter: function counter(path, title, screenName) {

		if (debugmode) return !0;

		if (!this.init_count) {
			this.init_count = !0;
			return;
		}

		ga('send', 'pageview', {
			'location': location.href,
			'page': location.pathname
		});
	}
};

var _config = {
	getFullKeyname: function getFullKeyname(key) {
		return 'config_' + key;
	},

	get: function get(key) {
		if (!localStorage) return !1;

		var value = localStorage[_config.getFullKeyname(key)];

		if (value === 'true') return !0;

		if (value === 'undefined') {
			delete localStorage[_config.getFullKeyname(key)];
			return null;
		}

		return value;
	},

	set: function set(key, value) {
		if (!localStorage) return !1;

		if (value === null && localStorage[_config.getFullKeyname(key)]) {
			delete localStorage[_config.getFullKeyname(key)];
		} else {
			localStorage[_config.getFullKeyname(key)] = value;
		}
	}
};

_frame.app_config = {

	init: function init() {
		if (_frame.app_config.is_init) return !0;

		_frame.app_config.is_init = !0;
	}
};

"use strict";

if (typeof _g == 'undefined') var _g = {};

_g.lang = _g.lang || 'zh_cn';

var Formula = {
	equipmentType: {
		SmallCaliber: 1,
		SmallCaliberHigh: 2,
		SmallCaliberAA: 3,
		MediumCaliber: 4,
		LargeCaliber: 5,
		SuperCaliber: 6,
		SecondaryGun: 7,
		SecondaryGunHigh: 8,
		SecondaryGunAA: 9,
		APShell: 11,
		Torpedo: 12,
		SubmarineTorpedo: 13,
		MidgetSubmarine: 14,
		ReconSeaplane: 15,
		ReconSeaplaneNight: 16,
		SeaplaneBomber: 17,
		CarrierFighter: 18,
		TorpedoBomber: 19,
		DiveBomber: 20,
		CarrierRecon: 21,
		Autogyro: 22,
		AntiSubPatrol: 23,
		SmallRadar: 24,
		LargeRadar: 25,
		DepthCharge: 26,
		Sonar: 27,
		LargeSonar: 28,
		AAGun: 29,
		AAGunConcentrated: 30,
		Searchlight: 39,
		LargeFlyingBoat: 45,
		SearchlightLarge: 46,
		SuparRadar: 47,
		CarrierRecon2: 50 },

	shipType: {
		Carriers: [9, 10, 11],

		LightCruisers: [2, 3, 21, 28],

		Submarines: [13, 14]
	},

	calculate: function calculate(type, ship, equipments_by_slot, star_by_slot, rank_by_slot, options) {
		if (!type || !ship) return 0;

		if (!_instanceof(ship, Ship)) ship = _g.data.ships[ship];

		var result = 0,
		    count = {
			'main': 0,
			'secondary': 0,
			'torpedo': 0,
			'seaplane': 0,
			'apshell': 0,
			'radar': 0
		},
		    powerTorpedo = function powerTorpedo() {
			var result = 0;
			if ($.inArray(ship.type, Formula.shipType.Carriers) > -1) {
				return -1;
			} else {
				result = ship.stat.torpedo_max || 0;
				ship.slot.map(function (carry, index) {
					if (equipments_by_slot[index]) {
						result += equipments_by_slot[index].type == Formula.equipmentType.TorpedoBomber ? 0 : equipments_by_slot[index].stat.torpedo || 0;

						if (star_by_slot[index]) {
							var multipler = 0;

							if ($.inArray(equipments_by_slot[index].type, Formula.equipmentType.Torpedos) > -1) multipler = 1.2;

							if ($.inArray(equipments_by_slot[index].type, Formula.equipmentType.AAGuns) > -1) multipler = 1;
							result += Math.sqrt(star_by_slot[index]) * multipler;
						}
					}
				});
				return result;
			}
			return ship.stat.torpedo_max || 0;
		},
		    value = 0;

		equipments_by_slot = equipments_by_slot.map(function (equipment) {
			if (!equipment) return null;
			if (_instanceof(equipment, Equipment)) return equipment;
			return _g.data.items[equipment];
		}) || [];
		star_by_slot = star_by_slot || [];
		rank_by_slot = rank_by_slot || [];
		options = options || {};

		equipments_by_slot.forEach(function (equipment) {
			if (!equipment) return;
			if ($.inArray(equipment.type, Formula.equipmentType.MainGuns) > -1) count.main += 1;else if ($.inArray(equipment.type, Formula.equipmentType.SecondaryGuns) > -1) count.secondary += 1;else if ($.inArray(equipment.type, Formula.equipmentType.Torpedos) > -1) count.torpedo += 1;else if ($.inArray(equipment.type, Formula.equipmentType.Seaplanes) > -1) count.seaplane += 1;else if (equipment.type == Formula.equipmentType.APShell) count.apshell += 1;else if ($.inArray(equipment.type, Formula.equipmentType.Radars) > -1) count.radar += 1;
		});

		switch (type) {
			case 'fighterPower':
				value = 0;
				ship.slot.map(function (carry, index) {
					if (equipments_by_slot[index] && $.inArray(equipments_by_slot[index].type, Formula.equipmentType.Fighters) > -1 && carry) {
						value = Math.sqrt(carry) * (equipments_by_slot[index].stat.aa || 0);
						if (equipments_by_slot[index].type == Formula.equipmentType.CarrierFighter) {
							switch (rank_by_slot[index]) {
								case 1:case '1':
									value += 1;break;
								case 2:case '2':
									value += 4;break;
								case 3:case '3':
									value += 6;break;
								case 4:case '4':
									value += 11;break;
								case 5:case '5':
									value += 16;break;
								case 6:case '6':
									value += 17;break;
								case 7:case '7':
									value += 25;break;
							}
						} else if ($.inArray(equipments_by_slot[index].type, Formula.equipmentType.Recons) == -1) {
							var max_per_slot = equipments_by_slot[index].type == Formula.equipmentType.SeaplaneBomber ? 9 : 3;
							value += rank_by_slot[index] == 1 ? 1 : max_per_slot / 6 * (rank_by_slot[index] - 1);
						}
						result += Math.floor(value);
					}
				});
				return result;

				break;

			case 'fighterPower_v2':
				return Formula.calcByShip.fighterPower_v2(ship, equipments_by_slot, star_by_slot, rank_by_slot);
				break;

			case 'shelling':
			case 'shellingDamage':
				if ($.inArray(ship.type, Formula.shipType.Submarines) > -1) {
					return '-';
				} else {
					result = Formula.calcByShip.shellingPower(ship, equipments_by_slot, star_by_slot, rank_by_slot);
					if (result && result > -1) return Math.floor(result) + 5;
					return '-';
				}
				break;

			case 'torpedo':
			case 'torpedoDamage':
				result = powerTorpedo();
				if (result && result > -1) return Math.floor(result) + 5;
				return '-';
				break;

			case 'nightBattle':
				if (!ship.additional_night_shelling && $.inArray(ship.type, Formula.shipType.Carriers) > -1) {
					return '-';
				} else {
					result = Formula.calcByShip.shellingPower(ship, equipments_by_slot, star_by_slot, rank_by_slot, {
						isNight: !0
					}) + powerTorpedo();
					if (count.torpedo >= 2) {
						return '雷击CI ' + Math.floor(result * 1.5) + ' x 2';
					} else if (count.main >= 3) {
						return '炮击CI ' + Math.floor(result * 2) + '';
					} else if (count.main == 2 && count.secondary >= 1) {
						return '炮击CI ' + Math.floor(result * 1.75) + '';
					} else if (count.main >= 1 && count.torpedo == 1) {
						return '炮雷CI ' + Math.floor(result * 1.3) + ' x 2';
					} else if (count.main == 2 && count.secondary <= 0 && count.torpedo <= 0 || count.main == 1 && count.secondary >= 1 && count.torpedo <= 0 || count.main == 0 && count.secondary >= 2 && count.torpedo >= 0) {
						return '连击 ' + Math.floor(result * 1.2) + ' x 2';
					} else {
						return '通常 ' + Math.floor(result) + '';
					}
				}
				break;

			case 'addHit':
				ship.slot.map(function (carry, index) {
					if (equipments_by_slot[index]) result += equipments_by_slot[index].stat.hit || 0;
				});
				return result >= 0 ? '+' + result : result;
				break;

			case 'addArmor':
				ship.slot.map(function (carry, index) {
					if (equipments_by_slot[index]) result += equipments_by_slot[index].stat.armor || 0;
				});
				return result;
				break;

			case 'addEvasion':
				ship.slot.map(function (carry, index) {
					if (equipments_by_slot[index]) result += equipments_by_slot[index].stat.evasion || 0;
				});
				return result;
				break;

			case 'losPower':
				return Formula.calcByShip.losPower(ship, equipments_by_slot, star_by_slot, rank_by_slot, options);
				break;
		}

		return '-';
	},

	calcByShip: {},
	calc: {}
};

Formula.equipmentType.MainGuns = [Formula.equipmentType.SmallCaliber, Formula.equipmentType.SmallCaliberHigh, Formula.equipmentType.SmallCaliberAA, Formula.equipmentType.MediumCaliber, Formula.equipmentType.LargeCaliber, Formula.equipmentType.SuperCaliber];

Formula.equipmentType.LargeCalibers = [Formula.equipmentType.LargeCaliber, Formula.equipmentType.SuperCaliber];

Formula.equipmentType.SecondaryGuns = [Formula.equipmentType.SecondaryGun, Formula.equipmentType.SecondaryGunHigh, Formula.equipmentType.SecondaryGunAA];

Formula.equipmentType.Torpedos = [Formula.equipmentType.Torpedo, Formula.equipmentType.SubmarineTorpedo];

Formula.equipmentType.Seaplanes = [Formula.equipmentType.ReconSeaplane, Formula.equipmentType.ReconSeaplaneNight, Formula.equipmentType.SeaplaneBomber];

Formula.equipmentType.Fighters = [Formula.equipmentType.SeaplaneBomber, Formula.equipmentType.CarrierFighter, Formula.equipmentType.TorpedoBomber, Formula.equipmentType.DiveBomber];

Formula.equipmentType.Recons = [Formula.equipmentType.ReconSeaplane, Formula.equipmentType.ReconSeaplaneNight, Formula.equipmentType.CarrierRecon, Formula.equipmentType.CarrierRecon2, Formula.equipmentType.LargeFlyingBoat];

Formula.equipmentType.SeaplaneRecons = [Formula.equipmentType.ReconSeaplane, Formula.equipmentType.ReconSeaplaneNight, Formula.equipmentType.LargeFlyingBoat];

Formula.equipmentType.SeaplaneBombers = [Formula.equipmentType.SeaplaneBomber];

Formula.equipmentType.CarrierRecons = [Formula.equipmentType.CarrierRecon, Formula.equipmentType.CarrierRecon2];

Formula.equipmentType.CarrierBased = [Formula.equipmentType.CarrierFighter, Formula.equipmentType.TorpedoBomber, Formula.equipmentType.DiveBomber, Formula.equipmentType.CarrierRecon, Formula.equipmentType.CarrierRecon2];

Formula.equipmentType.TorpedoBombers = [Formula.equipmentType.TorpedoBomber];

Formula.equipmentType.DiveBombers = [Formula.equipmentType.DiveBomber];

Formula.equipmentType.Autogyros = [Formula.equipmentType.Autogyro];

Formula.equipmentType.AntiSubPatrols = [Formula.equipmentType.AntiSubPatrol];

Formula.equipmentType.Aircrafts = [];
[].concat(Formula.equipmentType.Seaplanes).concat(Formula.equipmentType.Recons).concat(Formula.equipmentType.CarrierBased).concat(Formula.equipmentType.Autogyros).concat(Formula.equipmentType.AntiSubPatrols).forEach(function (v) {
	if (Formula.equipmentType.Aircrafts.indexOf(v) < 0) Formula.equipmentType.Aircrafts.push(v);
});

Formula.equipmentType.Radars = [Formula.equipmentType.SmallRadar, Formula.equipmentType.LargeRadar, Formula.equipmentType.SuparRadar];

Formula.equipmentType.SmallRadars = [Formula.equipmentType.SmallRadar];

Formula.equipmentType.LargeRadars = [Formula.equipmentType.LargeRadar, Formula.equipmentType.SuparRadar];

Formula.equipmentType.AntiSubmarines = [Formula.equipmentType.DepthCharge, Formula.equipmentType.Sonar, Formula.equipmentType.LargeSonar];

Formula.equipmentType.AAGuns = [Formula.equipmentType.AAGun, Formula.equipmentType.AAGunConcentrated];

Formula.equipmentType.Searchlights = [Formula.equipmentType.Searchlight, Formula.equipmentType.SearchlightLarge];

Formula.shellingDamage = function (ship, equipments_by_slot, star_by_slot, rank_by_slot) {
	return this.calculate('shellingDamage', ship, equipments_by_slot, star_by_slot, rank_by_slot);
};
Formula.torpedoDamage = function (ship, equipments_by_slot, star_by_slot, rank_by_slot) {
	return this.calculate('torpedoDamage', ship, equipments_by_slot, star_by_slot, rank_by_slot);
};
Formula.fighterPower = function (ship, equipments_by_slot, star_by_slot, rank_by_slot) {
	return this.calculate('fighterPower', ship, equipments_by_slot, star_by_slot, rank_by_slot);
};
Formula.fighterPower_v2 = function (ship, equipments_by_slot, star_by_slot, rank_by_slot) {
	return this.calculate('fighterPower_v2', ship, equipments_by_slot, star_by_slot, rank_by_slot);
};
Formula.nightBattle = function (ship, equipments_by_slot, star_by_slot, rank_by_slot) {
	return this.calculate('nightBattle', ship, equipments_by_slot, star_by_slot, rank_by_slot);
};
Formula.addHit = function (ship, equipments_by_slot, star_by_slot, rank_by_slot) {
	return this.calculate('addHit', ship, equipments_by_slot, star_by_slot, rank_by_slot);
};
Formula.addArmor = function (ship, equipments_by_slot, star_by_slot, rank_by_slot) {
	return this.calculate('addArmor', ship, equipments_by_slot, star_by_slot, rank_by_slot);
};
Formula.addEvasion = function (ship, equipments_by_slot, star_by_slot, rank_by_slot) {
	return this.calculate('addEvasion', ship, equipments_by_slot, star_by_slot, rank_by_slot);
};
Formula.losPower = function (ship, equipments_by_slot, star_by_slot, rank_by_slot, options) {
	return this.calculate('losPower', ship, equipments_by_slot, star_by_slot, rank_by_slot, options);
};

Formula.calc.losPower = function (data) {

	var calc = function calc(x) {
		x = $.extend({ '(Intercept)': 1 }, x);
		x['hqLv'] = Math.ceil(x['hqLv'] / 5) * 5;
		var x_estimate = {};
		var y_estimate = 0;
		$.each(keys, function () {
			var estimate = x[this] * estimate_coefficients[this];
			x_estimate[this] = estimate;
			y_estimate += estimate;
		});
		var x_std_error = {};
		$.each(keys, function () {
			x_std_error[this] = x[this] * std_error_coefficients[this];
		});
		var y_std_error = 0;
		$.each(keys, function () {
			var key1 = this;
			$.each(keys, function () {
				var key2 = this;
				y_std_error += x_std_error[key1] * x_std_error[key2] * correlation[key1][key2];
			});
		});
		return {
			x_estimate: x_estimate,
			y_estimate: y_estimate,
			x_std_error: x_std_error,
			y_std_error: y_std_error
		};
	};
	var keys = ['(Intercept)', 'DiveBombers', 'TorpedoBombers', 'CarrierRecons', 'SeaplaneRecons', 'SeaplaneBombers', 'SmallRadars', 'LargeRadars', 'Searchlights', 'statLos', 'hqLv'];
	var estimate_coefficients = {
		'(Intercept)': 0,
		'DiveBombers': 1.03745043134563,
		'TorpedoBombers': 1.3679056374142,
		'CarrierRecons': 1.65940512636315,
		'SeaplaneRecons': 2,
		'SeaplaneBombers': 1.77886368594467,
		'SmallRadars': 1.0045778494921,
		'LargeRadars': 0.990738063979571,
		'Searchlights': 0.906965144360512,
		'statLos': 1.6841895400986,
		'hqLv': -0.614246711531445
	};
	var std_error_coefficients = {
		'(Intercept)': 4.66445565766347,
		'DiveBombers': 0.0965028505325845,
		'TorpedoBombers': 0.108636184978525,
		'CarrierRecons': 0.0976055279516298,
		'SeaplaneRecons': 0.0866229392463539,
		'SeaplaneBombers': 0.0917722496848294,
		'SmallRadars': 0.0492773648320346,
		'LargeRadars': 0.0491221486053861,
		'Searchlights': 0.0658283797225724,
		'statLos': 0.0781594211213618,
		'hqLv': 0.0369222352426548
	};
	var correlation = {
		'(Intercept)': {
			'(Intercept)': 1,
			'DiveBombers': -0.147020064768061,
			'TorpedoBombers': -0.379236131621529,
			'CarrierRecons': -0.572858669501918,
			'SeaplaneRecons': -0.733913857017495,
			'SeaplaneBombers': -0.642621825152428,
			'SmallRadars': -0.674829588068364,
			'LargeRadars': -0.707418111752863,
			'Searchlights': -0.502304601556193,
			'statLos': -0.737374218573832,
			'hqLv': -0.05071933950163
		},
		'DiveBombers': {
			'(Intercept)': -0.147020064768061,
			'DiveBombers': 1,
			'TorpedoBombers': 0.288506347076736,
			'CarrierRecons': 0.365820372770994,
			'SeaplaneRecons': 0.425744409856409,
			'SeaplaneBombers': 0.417783698791503,
			'SmallRadars': 0.409046013184429,
			'LargeRadars': 0.413855653833994,
			'Searchlights': 0.308730607324667,
			'statLos': 0.317984916914851,
			'hqLv': -0.386740224500626
		},
		'TorpedoBombers': {
			'(Intercept)': -0.379236131621529,
			'DiveBombers': 0.288506347076736,
			'TorpedoBombers': 1,
			'CarrierRecons': 0.482215071254241,
			'SeaplaneRecons': 0.584455876852325,
			'SeaplaneBombers': 0.558515133495825,
			'SmallRadars': 0.547260012897553,
			'LargeRadars': 0.560437619378443,
			'Searchlights': 0.437934879351188,
			'statLos': 0.533934507932748,
			'hqLv': -0.405349979885748
		},
		'CarrierRecons': {
			'(Intercept)': -0.572858669501918,
			'DiveBombers': 0.365820372770994,
			'TorpedoBombers': 0.482215071254241,
			'CarrierRecons': 1,
			'SeaplaneRecons': 0.804494553748065,
			'SeaplaneBombers': 0.75671307047535,
			'SmallRadars': 0.748420581669228,
			'LargeRadars': 0.767980338133817,
			'Searchlights': 0.589651513349878,
			'statLos': 0.743851348255527,
			'hqLv': -0.503544281376776
		},
		'SeaplaneRecons': {
			'(Intercept)': -0.733913857017495,
			'DiveBombers': 0.425744409856409,
			'TorpedoBombers': 0.584455876852325,
			'CarrierRecons': 0.804494553748065,
			'SeaplaneRecons': 1,
			'SeaplaneBombers': 0.932444440578382,
			'SmallRadars': 0.923988080549326,
			'LargeRadars': 0.94904944359066,
			'Searchlights': 0.727912987329348,
			'statLos': 0.944434077970518,
			'hqLv': -0.614921413821462
		},
		'SeaplaneBombers': {
			'(Intercept)': -0.642621825152428,
			'DiveBombers': 0.417783698791503,
			'TorpedoBombers': 0.558515133495825,
			'CarrierRecons': 0.75671307047535,
			'SeaplaneRecons': 0.932444440578382,
			'SeaplaneBombers': 1,
			'SmallRadars': 0.864289865445084,
			'LargeRadars': 0.886872388674911,
			'Searchlights': 0.68310647756898,
			'statLos': 0.88122333327317,
			'hqLv': -0.624797255805045
		},
		'SmallRadars': {
			'(Intercept)': -0.674829588068364,
			'DiveBombers': 0.409046013184429,
			'TorpedoBombers': 0.547260012897553,
			'CarrierRecons': 0.748420581669228,
			'SeaplaneRecons': 0.923988080549326,
			'SeaplaneBombers': 0.864289865445084,
			'SmallRadars': 1,
			'LargeRadars': 0.872011318623459,
			'Searchlights': 0.671926570242336,
			'statLos': 0.857213501657084,
			'hqLv': -0.560018086758868
		},
		'LargeRadars': {
			'(Intercept)': -0.707418111752863,
			'DiveBombers': 0.413855653833994,
			'TorpedoBombers': 0.560437619378443,
			'CarrierRecons': 0.767980338133817,
			'SeaplaneRecons': 0.94904944359066,
			'SeaplaneBombers': 0.886872388674911,
			'SmallRadars': 0.872011318623459,
			'LargeRadars': 1,
			'Searchlights': 0.690102027588321,
			'statLos': 0.883771367337743,
			'hqLv': -0.561336967269448
		},
		'Searchlights': {
			'(Intercept)': -0.502304601556193,
			'DiveBombers': 0.308730607324667,
			'TorpedoBombers': 0.437934879351188,
			'CarrierRecons': 0.589651513349878,
			'SeaplaneRecons': 0.727912987329348,
			'SeaplaneBombers': 0.68310647756898,
			'SmallRadars': 0.671926570242336,
			'LargeRadars': 0.690102027588321,
			'Searchlights': 1,
			'statLos': 0.723228553177704,
			'hqLv': -0.518427865593732
		},
		'statLos': {
			'(Intercept)': -0.737374218573832,
			'DiveBombers': 0.317984916914851,
			'TorpedoBombers': 0.533934507932748,
			'CarrierRecons': 0.743851348255527,
			'SeaplaneRecons': 0.944434077970518,
			'SeaplaneBombers': 0.88122333327317,
			'SmallRadars': 0.857213501657084,
			'LargeRadars': 0.883771367337743,
			'Searchlights': 0.723228553177704,
			'statLos': 1,
			'hqLv': -0.620804120587684
		},
		'hqLv': {
			'(Intercept)': -0.05071933950163,
			'DiveBombers': -0.386740224500626,
			'TorpedoBombers': -0.405349979885748,
			'CarrierRecons': -0.503544281376776,
			'SeaplaneRecons': -0.614921413821462,
			'SeaplaneBombers': -0.624797255805045,
			'SmallRadars': -0.560018086758868,
			'LargeRadars': -0.561336967269448,
			'Searchlights': -0.518427865593732,
			'statLos': -0.620804120587684,
			'hqLv': 1
		}
	};

	var x = {
		'DiveBombers': 0,
		'TorpedoBombers': 0,
		'CarrierRecons': 0,
		'SeaplaneRecons': 0,
		'SeaplaneBombers': 0,
		'SmallRadars': 0,
		'LargeRadars': 0,
		'Searchlights': 0,
		'statLos': 1,
		'hqLv': 1
	};

	for (var i in data) {
		x[i] = data[i];
	}

	return calc(x);
};

Formula.calcByShip.shellingPower = function (ship, equipments_by_slot, star_by_slot, rank_by_slot, options) {
	options = options || {};

	var result = 0,
	    isCV = !1;

	if ($.inArray(ship.type, Formula.shipType.Carriers) > -1) {
		isCV = !0;
	} else {
		equipments_by_slot.forEach(function (equipment) {
			if (equipment && !isCV && $.inArray(equipment.type, Formula.equipmentType.CarrierBased) > -1) isCV = !0;
		});
	}

	if (isCV && !options.isNight) {
		var torpedoDamage = 0,
		    bombDamage = 0;
		ship.slot.map(function (carry, index) {
			if (equipments_by_slot[index]) {
				result += equipments_by_slot[index].stat.fire * 1.5 || 0;

				if (equipments_by_slot[index].type == Formula.equipmentType.TorpedoBomber) torpedoDamage += equipments_by_slot[index].stat.torpedo || 0;

				bombDamage += equipments_by_slot[index].stat.bomb || 0;

				if ($.inArray(equipments_by_slot[index].type, Formula.equipmentType.SecondaryGuns) > -1) result += Math.sqrt((star_by_slot[index] || 0) * 1.5);
			}
		});
		if (!torpedoDamage && !bombDamage) return -1;else result += (bombDamage * 1.3 + torpedoDamage + ship.stat.fire_max) * 1.5 + 50;
		return result;
	} else {
		result = ship.stat.fire_max || 0;

		var CLGunNavalNumber = 0,
		    CLGunTwinNumber = 0;
		ship.slot.map(function (carry, index) {
			if (equipments_by_slot[index]) {
				result += equipments_by_slot[index].stat.fire || 0;

				if ($.inArray(ship.type, Formula.shipType.LightCruisers) > -1) {
					if (equipments_by_slot[index].id == 4 || equipments_by_slot[index].id == 65) CLGunNavalNumber += 1;
					if (equipments_by_slot[index].id == 119 || equipments_by_slot[index].id == 139) CLGunTwinNumber += 1;
				}

				if (star_by_slot[index]) {
					if ($.inArray(equipments_by_slot[index].type, Formula.equipmentType.Torpedos.concat(Formula.equipmentType.Radars)) < 0) {
						var multipler = 1;

						if ($.inArray(equipments_by_slot[index].type, Formula.equipmentType.AntiSubmarines) > -1) multipler = 0.75;

						if ($.inArray(equipments_by_slot[index].type, Formula.equipmentType.LargeCalibers) > -1) {
							if (options.isNight) multipler = 1;else multipler = 1.5;
						}
						result += Math.sqrt(star_by_slot[index]) * multipler;
					}
				}
			}
		});
		return result + 2 * Math.sqrt(CLGunTwinNumber) + Math.sqrt(CLGunNavalNumber);
	}
	return ship.stat.fire_max || 0;
};

Formula.calcByShip.fighterPower_v2 = function (ship, equipments_by_slot, star_by_slot, rank_by_slot) {

	var rankInternal = [],
	    typeValue = {},
	    results = [0, 0];

	rankInternal[0] = [0, 9];
	rankInternal[1] = [10, 24];
	rankInternal[2] = [25, 39];
	rankInternal[3] = [40, 54];
	rankInternal[4] = [55, 69];
	rankInternal[5] = [70, 84];
	rankInternal[6] = [85, 99];
	rankInternal[7] = [100, 120];

	typeValue.CarrierFighter = [0, 0, 2, 5, 9, 14, 14, 22];

	typeValue.SeaplaneBomber = [0, 0, 1, 1, 1, 3, 3, 6];

	ship.slot.map(function (carry, index) {
		if (equipments_by_slot[index] && $.inArray(equipments_by_slot[index].type, Formula.equipmentType.Fighters) > -1 && carry) {
			var base = Math.sqrt(carry) * (equipments_by_slot[index].stat.aa || 0),
			    _rank = rank_by_slot[index] || 0,
			    _rankInternal = rankInternal[_rank],
			    _typeValue = 0;
			if (equipments_by_slot[index].type == Formula.equipmentType.CarrierFighter) _typeValue = typeValue.CarrierFighter[_rank];
			if (equipments_by_slot[index].type == Formula.equipmentType.SeaplaneBomber) _typeValue = typeValue.SeaplaneBomber[_rank];
			results[0] += Math.floor(base + Math.sqrt(_rankInternal[0] / 10) + _typeValue);
			results[1] += Math.floor(base + Math.sqrt(_rankInternal[1] / 10) + _typeValue);
		}
	});
	return results;
};

Formula.calcByShip.losPower = function (ship, equipments_by_slot, star_by_slot, rank_by_slot, options) {

	options = options || {};
	options.shipLv = options.shipLv || 1;
	options.hqLv = options.hqLv || 1;

	if (options.shipLv < 0) options.shipLv = 1;
	if (options.hqLv < 0) options.hqLv = 1;

	var x = {
		'DiveBombers': 0,
		'TorpedoBombers': 0,
		'CarrierRecons': 0,
		'SeaplaneRecons': 0,
		'SeaplaneBombers': 0,
		'SmallRadars': 0,
		'LargeRadars': 0,
		'Searchlights': 0,
		'statLos': Math.sqrt(ship.getAttribute('los', options.shipLv)),
		'hqLv': options.hqLv
	};

	equipments_by_slot.forEach(function (equipment) {
		if (equipment) {
			for (var _i in x) {
				if (Formula.equipmentType[_i] && Formula.equipmentType[_i].push && Formula.equipmentType[_i].indexOf(equipment.type) > -1) x[_i] += equipment.stat.los;
			}
		}
	});

	return Formula.calc.losPower(x);
};

var ItemBase = (function () {
	function ItemBase() {
		_classCallCheck(this, ItemBase);
	}

	_createClass(ItemBase, [{
		key: 'getName',
		value: function getName(language) {
			language = language || _g.lang;
			return this['name'] ? this['name'][language] || this['name'] : null;
		}
	}, {
		key: '_name',
		get: function get() {
			return this.getName();
		}
	}]);

	return ItemBase;
})();

var Entity = (function (_ItemBase) {
	_inherits(Entity, _ItemBase);

	function Entity(data) {
		_classCallCheck(this, Entity);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Entity).call(this));

		$.extend(!0, _this, data);
		return _this;
	}

	return Entity;
})(ItemBase);

var Equipment = (function (_ItemBase2) {
	_inherits(Equipment, _ItemBase2);

	function Equipment(data) {
		_classCallCheck(this, Equipment);

		var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Equipment).call(this));

		$.extend(!0, _this2, data);
		return _this2;
	}

	_createClass(Equipment, [{
		key: 'getName',
		value: function getName(small_brackets, language) {
			language = language || _g.lang;
			var result = ItemBase.prototype.getName.call(this, language),
			    small_brackets_tag = small_brackets && !small_brackets === !0 ? small_brackets : 'small';
			return small_brackets ? result.replace(/（([^（^）]+)）/g, '<' + small_brackets_tag + '>($1)</' + small_brackets_tag + '>') : result;
		}
	}, {
		key: 'getType',
		value: function getType(language) {
			language = language || _g.lang;
			return this['type'] ? _g['data']['item_types'][this['type']]['name'][language] : null;
		}
	}, {
		key: 'getIconId',
		value: function getIconId() {
			return _g.data.item_types[this['type']]['icon'];
		}
	}, {
		key: 'getCaliber',
		value: function getCaliber() {
			var name = this.getName(!1, 'ja_jp'),
			    caliber = parseFloat(name);

			return caliber;
		}
	}, {
		key: 'getPower',
		value: function getPower() {
			return this.stat[_g.data['item_types'][this['type']]['main_attribute'] || 'fire'];
		}
	}, {
		key: '_icon',
		get: function get() {
			return '/!/assets/images/itemicon/' + this.getIconId() + '.png';
		}
	}]);

	return Equipment;
})(ItemBase);

var Ship = (function (_ItemBase3) {
	_inherits(Ship, _ItemBase3);

	function Ship(data) {
		_classCallCheck(this, Ship);

		var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(Ship).call(this));

		$.extend(!0, _this3, data);
		return _this3;
	}

	_createClass(Ship, [{
		key: 'getName',
		value: function getName(joint, language) {
			joint = joint || '';
			language = language || _g.lang;
			var suffix = this.getSuffix(language);
			return (this['name'][language] || this['name']['ja_jp']) + (suffix ? (joint === !0 ? _g.joint : joint) + suffix : '');
		}
	}, {
		key: 'getNameNoSuffix',
		value: function getNameNoSuffix(language) {
			language = language || _g.lang;
			return this['name'][language] || this['name']['ja_jp'];
		}
	}, {
		key: 'getSuffix',
		value: function getSuffix(language) {
			language = language || _g.lang;
			return this['name'].suffix ? _g.data['ship_namesuffix'][this['name'].suffix][language] || _g.data['ship_namesuffix'][this['name'].suffix]['ja_jp'] || '' : '';
		}
	}, {
		key: 'getType',
		value: function getType(language) {
			language = language || _g.lang;
			return this['type'] ? _g['data']['ship_types'][this['type']]['full_zh'] : null;
		}
	}, {
		key: 'getSeriesData',
		value: function getSeriesData() {
			return this['series'] ? _g['data']['ship_series'][this['series']]['ships'] : [{
				'id': this.id
			}];
		}
	}, {
		key: 'getPic',
		value: function getPic(picId) {
			var series = this.getSeriesData();
			picId = parseInt(picId || 0);

			var getURI = function getURI(i, p) {
				if (typeof node != 'undefined' && node && node.path && _g.path.pics.ships) return node.path.join(_g.path.pics.ships, i + '/' + p + '.png');
				if (_g.path.pics.ships) return _g.path.pics.ships + i + '/' + p + '.png';
				return '/' + i + '/' + p + '.png';
			};

			for (var _i2 = 0; _i2 < series.length; _i2++) {
				if (series[_i2].id == this.id) {
					switch (picId) {
						case 0:
						case 1:
						case 2:
						case 3:
						case 12:
						case 13:
						case 14:
							return getURI(this.id, picId);
							break;
						default:
							if (series[_i2].illust_delete) {
								return getURI(series[_i2 - 1].id, picId);
							} else {
								return getURI(this.id, picId);
							}
							break;
					}
					break;
				}
			}
		}
	}, {
		key: 'getSpeed',
		value: function getSpeed(language) {
			language = language || _g.lang;
			return _g.statSpeed[parseInt(this.stat.speed)];
		}
	}, {
		key: 'getRange',
		value: function getRange(language) {
			language = language || _g.lang;
			return _g.statRange[parseInt(this.stat.range)];
		}
	}, {
		key: 'getEquipmentTypes',
		value: function getEquipmentTypes() {
			return _g.data.ship_types[this['type']].equipable.concat(this.additional_item_types || []).sort(function (a, b) {
				return a - b;
			});
		}
	}, {
		key: 'getAttribute',
		value: function getAttribute(attr, lvl) {
			lvl = lvl || 1;
			if (lvl > 150) lvl = 150;

			var getStatOfLvl = function getStatOfLvl(lvl, base, max) {
				lvl = lvl || 1;
				base = parseFloat(base);
				max = parseFloat(max) || base;
				if (base < 0 || max < 0) return -1;
				if (base == max) return max;
				return Math.floor(base + (max - base) * lvl / 99);
			};

			var value = undefined;

			switch (attr) {
				case 'hp':
					value = this['stat']['hp'];
					if (lvl > 99) {
						if (this['stat']['hp'] >= 90) value = this['stat']['hp'] + 9;else if (this['stat']['hp'] >= 70) value = this['stat']['hp'] + 8;else if (this['stat']['hp'] >= 50) value = this['stat']['hp'] + 7;else if (this['stat']['hp'] >= 40) value = this['stat']['hp'] + 6;else if (this['stat']['hp'] >= 30) value = this['stat']['hp'] + 5;else value = this['stat']['hp'] + 4;
						if (value > this['stat']['hp_max']) value = this['stat']['hp_max'];
					}
					return value;
					break;
				case 'speed':
					return _g.getStatSpeed(this['stat']['speed']);
					break;
				case 'range':
					return _g.getStatRange(this['stat']['range']);
					break;
				case 'luck':
					if (lvl > 99) return this['stat']['luck'] + 3;
					return this['stat']['luck'];
					break;
				case 'fuel':
				case 'ammo':
					if (lvl > 99) return Math.floor(this['consum'][attr] * 0.85);
					return this['consum'][attr];
					break;
				case 'aa':
				case 'armor':
				case 'fire':
				case 'torpedo':
					return this['stat'][attr + '_max'] || this['stat'][attr];
					break;
				default:
					return getStatOfLvl(lvl, this['stat'][attr], this['stat'][attr + '_max']);
					break;
			}
		}
	}, {
		key: 'getRel',
		value: function getRel(relation) {
			if (relation) {
				if (!this.rels[relation] && this.remodel && this.remodel.prev) {
					var prev = _g.data.ships[this.remodel.prev];
					while (prev) {
						if (prev.rels && prev.rels[relation]) return prev.rels[relation];
						if (!prev.remodel || !prev.remodel.prev) prev = null;else prev = _g.data.ships[prev.remodel.prev];
					}
				}
				return this.rels[relation];
			} else {
				return this.rels;
			}
		}
	}, {
		key: 'getCV',
		value: function getCV(language) {
			var entity = this.getRel('cv');
			if (entity) return _g.data.entities[entity].getName(language || _g.lang);
			return;
		}
	}, {
		key: 'getIllustrator',
		value: function getIllustrator(language) {
			var entity = this.getRel('illustrator');
			if (entity) return _g.data.entities[entity].getName(language || _g.lang);
			return;
		}
	}, {
		key: '_type',
		get: function get() {
			return this.getType();
		}
	}, {
		key: '_pics',
		get: function get() {
			var arr = [];
			for (var _i3 = 0; _i3 < 15; _i3++) {
				arr.push(this.getPic(_i3));
			}
			return arr;
		}
	}, {
		key: '_speed',
		get: function get() {
			return this.getSpeed();
		}
	}, {
		key: '_range',
		get: function get() {
			return this.getRange();
		}
	}, {
		key: '_cv',
		get: function get() {
			return this.getCV();
		}
	}, {
		key: '_illustrator',
		get: function get() {
			return this.getIllustrator();
		}
	}]);

	return Ship;
})(ItemBase);

_g.kancolle_calc = {
	version: 3,

	decode: function decode(data, version) {
		if (!data) return;
		if (typeof data == 'string') data = JSON.parse(data);
		if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) != 'object') return;
		version = parseInt(data.version) || this.version;

		var result = undefined,
		    i = 0,
		    j = 0,
		    k = 0,
		    data_fleet = undefined,
		    data_ship = undefined,
		    data_item = undefined,
		    max_fleets = 4,
		    max_ships_per_fleet = 6,
		    max_equipments_per_ship = 5;

		switch (version) {
			case 3:
				result = [];
				i = 0;

				while (i < max_fleets) {
					data_fleet = data['f' + (i + 1)];
					result[i] = [];
					if (data_fleet) {
						j = 0;

						while (j < max_ships_per_fleet) {
							data_ship = data_fleet['s' + (j + 1)];
							if (data_ship && data_ship.id) {
								result[i][j] = [data_ship.id, [data_ship.lv || null, data_ship.luck || -1], [], [], []];
								if (data_ship.items) {
									k = 0;

									while (k < max_equipments_per_ship) {
										data_item = data_ship.items['i' + (k + 1)];
										if (data_item && data_item.id) {
											result[i][j][2][k] = data_item.id;
											result[i][j][3][k] = data_item.rf || null;
											result[i][j][4][k] = data_item.rp || null;
										} else {
											result[i][j][2][k] = null;
											result[i][j][3][k] = null;
											result[i][j][4][k] = null;
										}
										k++;
									}
								}
							} else {
								result[i][j] = null;
							}
							j++;
						}
					}
					i++;
				}
				break;
		}

		return result;
	},

	encode: function encode(data, version) {
		if (!data) return;
		if (!data.length || !data.push) data = JSON.parse(data);
		if (!data.length || !data.push) return;
		version = parseInt(version) || this.version;

		var result = undefined;

		switch (version) {
			case 3:
				result = {
					'version': 3
				};
				data.forEach(function (data_fleet, i) {
					result['f' + (i + 1)] = {};
					data_fleet.forEach(function (data_ship, j) {
						if (data_ship[0]) {
							result['f' + (i + 1)]['s' + (j + 1)] = {
								'id': parseInt(data_ship[0]),
								'lv': parseInt(data_ship[1][0]) || null,
								'luck': parseInt(data_ship[1][1]) || -1,
								'items': {
									'ix': {}
								}
							};
							data_ship[2].forEach(function (id_item, k) {
								if (id_item) {
									result['f' + (i + 1)]['s' + (j + 1)].items['i' + (k + 1)] = {
										'id': parseInt(id_item)
									};
									if (data_ship[3]) result['f' + (i + 1)]['s' + (j + 1)].items['i' + (k + 1)].rf = parseInt(data_ship[3][k]) || 0;
									if (data_ship[4]) result['f' + (i + 1)]['s' + (j + 1)].items['i' + (k + 1)].rp = parseInt(data_ship[4][k]) || 0;
								}
							});
						}
					});
				});
				break;
		}

		return result;
	}
};

_g.db_version = '1.9.0.0';

_g.bgimg_count=26;

_g.event = {
	'animationend': 'animationend webkitAnimationEnd',
	'animationiteration': 'animationiteration webkitAnimationIteration',
	'transitionend': 'transitionend webkitTransitionEnd mozTransitionEnd'
};

_g.path = {
	'db': '/!/db/',
	'bgimg_dir': '/!/assets/images/homebg/',
	'pics': {
		'ships': '/!/pics/ships/',
		'items': '/!/pics/items/'
	}
};

_g.dbs = ['ships', 'ship_types', 'ship_series', 'ship_namesuffix', 'items', 'item_types'];

_g.data = {};

var _db = {
	'fleets': new Nedb({
		filename: 'fleets'
	})
};

Nedb.prototype.updateById = function (_id, docReplace, callback) {
	if (!this._updateByIdQueue) {
		this._updateByIdQueue = {};
		Object.defineProperty(this._updateByIdQueue, 'running', {
			enumerable: !1,
			value: !1,
			writable: !0
		});
	}

	docReplace = docReplace || {};
	docReplace._id = _id;

	this._updateByIdQueue[_id] = {
		docReplace: docReplace,
		callback: callback || function () {}
	};

	this._updateById();
};
Nedb.prototype._updateById = function () {
	if (!this._updateByIdQueue || this._updateByIdQueue.running) return !1;

	var _id = undefined;
	for (var _i4 in this._updateByIdQueue) {
		if (this._updateByIdQueue[_i4]) {
			_id = _i4;
			break;
		}
	}

	if (!_id) return !1;

	var queue = this._updateByIdQueue[_id];

	this._updateByIdQueue[_id] = null;
	delete this._updateByIdQueue[_id];

	this._updateByIdQueue.running = !0;

	this.update({
		_id: _id
	}, queue.docReplace, {}, (function (err, numReplaced) {
		queue.callback.call(this, err, numReplaced);
		this._updateByIdQueue.running = !1;
		this._updateById();
	}).bind(this));
};

_g.log = function () {
	console.log.apply(console, arguments);
};

_g.parseURI = function (uri) {
	uri = uri || location.pathname;
	var parts = uri.split('/').filter(function (c) {
		return c;
	});

	if (!parts.length) {
		return {
			'page': 'home'
		};
	} else if (parts.length == 1) {
		return {
			'page': parts[0]
		};
	} else if (parts.length == 2) {
		var t = parts[0];
		switch (t) {
			case 'ships':
				t = 'ship';break;
			case 'equipments':
				t = 'equipment';break;
			case 'entities':
				t = 'entity';break;
			case 'fleets':
				t = 'fleet';
				parts[1] = _g.uriSearch('i') || '__NEW__';
				break;
		}
		return {
			'infos': t,
			'id': parts[1]
		};
	}
};

_g.state2URI = function (state) {
	if (!state || state.page == 'home') return '/';

	if (state.page) return '/' + state.page + '/';

	if (state.infos) {
		var t = state.infos,
		    extra = '';
		switch (t) {
			case 'ship':
				t = 'ships';break;
			case 'equipment':
				t = 'equipments';break;
			case 'entity':
				t = 'entities';break;
			case 'fleet':
				t = 'fleets';
				extra = '?i=' + state.id;
				state.id = 'build';
				break;
		}
		return '/' + t + '/' + state.id + '/' + extra;
	}
};

_frame.app_main = {
	page: {},
	page_dom: {},
	page_html: {},
	page_title: {},

	bgimgs: [],

	loading: ['dbs', 'bgimgs'],

	functions_on_ready: [],

	loaded: function loaded(item, is_instant) {
		_g.log(item + ' loaded.');
		if (item) {
			if (this.loading.indexOf(item) > -1) {
				this.loading.splice(this.loading.indexOf(item), 1);
				this.is_loaded = !1;
			}
		}
		if (!this.loading.length && !this.is_loaded) {
			setTimeout(function () {
				if (_frame.app_main.is_loaded && !_frame.app_main.loading.length && !$html.hasClass('app-ready')) {
					_frame.dom.layout.addClass('ready');
					$html.addClass('app-ready');
					setTimeout(function () {
						for (var _i5 = 0; _i5 < _frame.app_main.functions_on_ready.length; _i5++) {
							_frame.app_main.functions_on_ready[_i5]();
						}
					}, 1500);
				}
			}, is_instant ? 300 : 1000);

			if (!this.window_event_bound) {
				$window.on('popstate._global', function (e) {
					if (e.originalEvent && e.originalEvent.state) {
						_frame.app_main.state(e.originalEvent.state);
					} else {
						_frame.app_main.state(_g.parseURI());
					}
				}).trigger('popstate._global');
				this.window_event_bound = !0;
			}

			this.is_loaded = !0;
		}
	},

	pushState: function pushState(stateObj, title, url) {
		history.pushState(stateObj, title, url);

		console.log(stateObj);
	},

	state: function state(stateObj) {
		if (stateObj['infos']) {
			_frame.infos.show_func(stateObj['infos'], stateObj['id'], null, stateObj['infosHistoryIndex']);
		} else {
			_frame.infos.hide();
		}
		if (stateObj['page']) {
			this.load_page_func(stateObj['page']);
		}
	},

	change_bgimg: function change_bgimg(bgimgs_new) {
		if (!this.bgimgs.length) return !1;

		var bgimgs = bgimgs_new && bgimgs_new.length ? bgimgs_new : this.bgimgs,
		    img_new = bgimgs[_g.randInt(bgimgs.length)],
		    img_old = this.cur_bgimg_el ? this.cur_bgimg_el.css('background-image') : null;

		img_old = img_old ? img_old.split('/') : null;
		img_old = img_old ? img_old[img_old.length - 1].split(')') : null;
		img_old = img_old ? img_old[0] : null;

		while (img_new == img_old) {
			img_new = bgimgs[_g.randInt(bgimgs.length - 1)];
		}

		var img_new_blured = _g.path.bgimg_dir + 'blured/' + img_new;
		this.bgimg_path = _g.path.bgimg_dir + img_new;
		img_new = this.bgimg_path;

		if (img_old) {
			this.change_bgimg_oldEl = this.cur_bgimg_el;
		}

		this.cur_bgimg_el = $('<div/>').css('background-image', 'url(' + img_new + ')').appendTo(_frame.dom.bgimg).add($('<s' + (this.change_bgimg_fadein ? ' class="fadein"' : '') + '/>').css('background-image', 'url(' + img_new_blured + ')').appendTo(_frame.dom.nav)).add($('<s' + (this.change_bgimg_fadein ? ' class="fadein"' : '') + '/>').css('background-image', 'url(' + img_new_blured + ')').appendTo(_frame.dom.main));

		if (_frame.dom.bg_controls) this.cur_bgimg_el = this.cur_bgimg_el.add($('<s' + (this.change_bgimg_fadein ? ' class="fadein"' : '') + '/>').css('background-image', 'url(' + img_new_blured + ')').appendTo(_frame.dom.bg_controls));

		this.change_bgimg_fadein = !0;
	},
	change_bgimg_after: function change_bgimg_after(oldEl) {
		oldEl = oldEl || this.change_bgimg_oldEl;
		if (oldEl) {
			this.change_bgimg_oldEl.remove();
			this.change_bgimg_oldEl = null;
		}
	},

	toggle_hidecontent: function toggle_hidecontent() {
		_frame.dom.layout.toggleClass('hidecontent');
	},

	loading_queue: [],
	loading_state: {},

	loading_start: function loading_start(url, callback_success, callback_error, callback_successAfter, callback_beforeSend, callback_complete) {
		url = url || location.pathname;
		var isUrl = !0;

		if ((typeof callback_success === 'undefined' ? 'undefined' : _typeof(callback_success)) == 'object') {
			isUrl = typeof callback_success.isUrl != 'undefined' ? callback_success.isUrl : !0;
			callback_error = callback_success.error;
			callback_successAfter = callback_success.successAfter;
			callback_beforeSend = callback_success.beforeSend;
			callback_complete = callback_success.complete;
			callback_success = callback_success.success;
		} else if (callback_success === !1) {
			isUrl = !1;
		}

		callback_beforeSend = callback_beforeSend || function () {};
		callback_success = callback_success || function () {};
		callback_successAfter = callback_successAfter || function () {};
		callback_error = callback_error || function () {};
		callback_complete = callback_complete || function () {};

		this.loading_cur = url;

		if (typeof this.loading_state[url] == 'undefined' || this.loading_state[url] == 'fail') {
			if (this.loading_state[url] != 'fail') this.loading_state[url] = 'loading';
			this.loading_queue.push(url);
			_frame.dom.layout.addClass('is-loading');

			if (isUrl) {
				$.ajax({
					'url': url,
					'type': 'get',
					'dataType': 'html',

					'beforeSend': function beforeSend(jqXHR, settings) {
						callback_beforeSend(url, jqXHR, settings);
					},

					'success': function success(data) {
						var result_main = /\<main\>(.+)\<\/main\>/.exec(data),
						    result_title = /\<title\>([^\<]+)\<\/title\>/.exec(data);
						if (result_title && result_title.length > 1) {
							_frame.app_main.page_title[url] = result_title[1];
						}
						callback_success(result_main && result_main.length > 1 ? result_main[1] : '');
						if (url == _frame.app_main.loading_cur) {
							callback_successAfter(result_main && result_main.length > 1 ? result_main[1] : '');
						}
						_frame.app_main.loading_state[url] = 'complete';
					},

					'error': function error(jqXHR, textStatus, errorThrown) {
						errorThrown = errorThrown || '';
						_g.log('Loading Fail: ' + url + ' [' + textStatus + '] (' + errorThrown + ')');

						if (_frame.app_main.loading_state[url] == 'fail' || ['Bad Request', 'Not Found', 'Forbidden'].indexOf(errorThrown) > -1) return _frame.app_main.loading_fail(url, textStatus, errorThrown, callback_error);

						_frame.app_main.loading_state[url] = 'fail';
					},

					'complete': function complete(jqXHR, textStatus) {
						_frame.app_main.loading_complete(url);
						callback_complete(url, jqXHR, textStatus);

						if (_frame.app_main.loading_state[url] == 'fail') {
							console.log('retry');
							_frame.app_main.loading_start(url, callback_success, callback_error, callback_successAfter, callback_beforeSend, callback_complete);
						}
					}
				});
			} else {}
		} else if (this.loading_state[url] == 'complete') {
			callback_success();
			callback_successAfter();
		}
	},

	loading_complete: function loading_complete(url) {
		if (!url) return;
		if (url == this.loading_cur) this.loading_cur = null;
		var i = this.loading_queue.indexOf(url);
		if (i >= 0) this.loading_queue.splice(i, 1);
		if (this.loading_queue.length) return;
		_frame.dom.layout.removeClass('is-loading');
	},

	loading_fail: function loading_fail(url, textStatus, errorThrown, callback_error) {
		if (!url) return;
		if (this.loading_state) delete this.loading_state[url];

		_frame.dom.layout.attr('data-errorbadge', url + ' 载入失败 (' + errorThrown + ')');
		clearTimeout(this.loading_fail_timeout_errorbadge);
		this.loading_fail_timeout_errorbadge = setTimeout(function () {
			_frame.dom.layout.removeAttr('data-errorbadge');
			delete _frame.app_main.loading_fail_timeout_errorbadge;
		}, 3000);
		console.log(callback_error);
		return callback_error(url, textStatus, errorThrown);
	},

	load_page: function load_page(page, options) {
		if (this.cur_page == page || !page) return page;

		options = options || {};

		this.pushState({
			'page': page
		}, null, _g.state2URI({
			'page': page
		}));

		this.load_page_func(page, options);
	},
	load_page_func: function load_page_func(page, options) {
		_g.pageChangeBefore();

		_g.log('PREPARE LOADING: ' + page);
		options = options || {};

		if (!page) return page;

		var checked = !1;

		if (page == 'donate') {
			checked = !0;
		}if (!this.cur_page) {
			this.nav.forEach(function (currentValue) {
				if (page == currentValue.page) checked = !0;
			});
		} else {
			checked = !0;
		}

		if (!checked) {
			page = this.nav[0].page;
			this.load_page(page, options);
			return page;
		}

		var u = _g.state2URI({ page: page });

		function callback() {
			_frame.app_main.page_dom[page].trigger('show');
			_frame.infos.hide();

			if (!options.callback_modeSelection_select) {
				_frame.app_main.title = _frame.app_main.navtitle[page];
				_frame.infos.last = null;

				document.title = _frame.app_main.page_title[u];

				_ga.counter(location.search);
			}

			if (_frame.app_main.cur_page == page) return page;

			_frame.app_main.page_dom[page].appendTo(_frame.dom.main).removeClass('off').trigger('on');

			if (_frame.app_main.cur_page) {
				if (_frame.dom.navs[_frame.app_main.cur_page]) _frame.dom.navs[_frame.app_main.cur_page].removeClass('on');
				if (_frame.app_main.page_dom[_frame.app_main.cur_page]) setTimeout((function (p) {
					_frame.app_main.page_dom[p].addClass('off').trigger('pageoff').detach();
				})(_frame.app_main.cur_page), 100);
			}

			if (_frame.dom.navs[page]) _frame.dom.navs[page].addClass('on');

			if (!options.callback_modeSelection_select) {

				if (page != 'about') Lockr.set('last_page', page);
			}

			_frame.dom.main.attr('data-theme', page);
			_frame.app_main.cur_page = page;

			_g.log('LOADED: ' + page);

			if (options.callback_modeSelection_select) {
				_frame.app_main.page_dom[page].trigger('modeSelectionEnter', [options.callback_modeSelection_select || function () {}, options.callback_modeSelection_enter || function () {}]);
			} else {
				_frame.app_main.mode_selection_off();
			}
		}

		if (!this.page_dom[page]) {
			this.page_dom[page] = _frame.dom.main.find('.page-container[page="' + page + '"]');
			if (this.page_dom[page].length) {
				this.page_init(page);
				this.page_title[u] = document.title;
				callback();
			} else {
				this.loading_start(u, {
					success: function success(html) {
						if (html) {
							_frame.app_main.page_dom[page] = $(html).appendTo(_frame.dom.main);
							if (u != location.pathname) _frame.app_main.page_dom[page].addClass('off');

							_frame.app_main.page_init(page);
						}
					},
					successAfter: callback,
					error: function error() {
						delete _frame.app_main.page_dom[page];
						history.back();
					}
				});
			}
		} else {
			callback();
		}
	},

	only_bg_on: function only_bg_on() {
		if (this.only_bg) return !0;

		if (!_frame.dom.bg_controls) {
			_frame.dom.bg_controls = $('<div class="bg_controls"/>').on(eventName('transitionend', 'only_bg_off'), function (e) {
				console.log(e);
				if (e.currentTarget == e.target && e.originalEvent.propertyName == 'bottom' && _frame.dom.layout.hasClass('only_bg') && _frame.dom.bg_controls.offset().top >= $body.height()) {
					_frame.dom.layout.removeClass('only_bg');
					_frame.app_main.only_bg = !1;
				}
			}).appendTo(_frame.dom.layout);

			this.cur_bgimg_el = this.cur_bgimg_el.add(this.cur_bgimg_el.eq(0).clone().appendTo(_frame.dom.bg_controls));

			$('<button class="prev" icon="arrow-left"/>').on('click', function () {
				var pathParse = _frame.app_main.bgimg_path.split('/'),
				    index = $.inArray(pathParse[pathParse.length - 1], _frame.app_main.bgimgs) - 1;
				if (index < 0) index = _frame.app_main.bgimgs.length - 1;
				_frame.app_main.change_bgimg([_frame.app_main.bgimgs[index]]);
			}).appendTo(_frame.dom.bg_controls);

			$('<button class="back"/>').html('返回').on('click', function () {
				_frame.app_main.only_bg_off();
			}).appendTo(_frame.dom.bg_controls);

			$('<button class="back"/>').html('保存图片').on('click', function () {
				window.open(_frame.app_main.bgimg_path);
			}).appendTo(_frame.dom.bg_controls);

			$('<button class="next" icon="arrow-right"/>').on('click', function () {
				var pathParse = _frame.app_main.bgimg_path.split('/'),
				    index = $.inArray(pathParse[pathParse.length - 1], _frame.app_main.bgimgs) + 1;
				if (index >= _frame.app_main.bgimgs.length) index = 0;
				_frame.app_main.change_bgimg([_frame.app_main.bgimgs[index]]);
			}).appendTo(_frame.dom.bg_controls);
		}

		_frame.dom.layout.addClass('only_bg');
		setTimeout(function () {
			_frame.dom.bg_controls.addClass('on');
		}, 10);

		this.only_bg = !0;
	},
	only_bg_off: function only_bg_off() {
		if (!this.only_bg) return !0;
		_frame.dom.bg_controls.removeClass('on');
	},
	only_bg_toggle: function only_bg_toggle() {
		if (this.only_bg) return this.only_bg_off();
		return this.only_bg_on();
	},

	init: function init() {
		if (this.is_init) return !0;

		_frame.dom.mobilemenu = _frame.dom.layout.children('#view-mobile-menu');
		_frame.dom.nav = _frame.dom.layout.children('nav');
		_frame.dom.logo = $('<button class="logo"/>').on(_g.event.animationend, function (e) {
			_frame.dom.logo.addClass('ready-animated');
		}).appendTo(_frame.dom.nav);
		_frame.dom.navlinks = _frame.dom.nav.children('.pages');
		_frame.dom.globaloptions = _frame.dom.nav.children('section.options');

		_frame.dom.btnShowOnlyBg = $('<button class="show_only_bg" icon="images"/>').on('click', function () {
			_frame.app_main.only_bg_toggle();
		}).appendTo(_frame.dom.globaloptions);
		_frame.dom.btnShowOnlyBgBack = $('<button class="show_only_bg_back" icon="arrow-set2-left"/>').on('click', function () {
			_frame.app_main.only_bg_off();
		}).appendTo(_frame.dom.nav);

		_frame.dom.main = _frame.dom.layout.children('main');
		_frame.dom.bgimg = $('<div class="bgimg" />').appendTo(_frame.dom.layout);
		$('<div class="nav-mask"/>').appendTo(_frame.dom.layout).on('click', function () {
			_frame.dom.mobilemenu.prop('checked', !1);
		});

		var promise_chain = Q.fcall(function () {});

		this.nav = [];
		this.navtitle = {};

		promise_chain.then(function () {
			_frame.dom.navs = {};

			_frame.dom.navlinks.find('a').each(function (index, $el) {
				$el = $($el);
				var p = _g.parseURI($el.attr('href')).page,
				    t = $el.text();
				_frame.app_main.nav.push({
					'title': t,
					'state': $el.attr('mod-state'),
					'page': p
				});
				_frame.app_main.navtitle[p] = t;
				if (!$el.hasClass('button')) $el = $el.parent();
				_frame.dom.navs[p] = $el;
			});
			return _frame.app_main.nav;
		}).then(function () {
			for (var _i6 = 0; _i6 < _g.bgimg_count; _i6++) {
				_frame.app_main.bgimgs.push(_i6 + '.jpg');
			}

			_frame.app_main.change_bgimg();
			_frame.app_main.loaded('bgimgs');

			_g.log('BGs: ' + _frame.app_main.bgimgs.join(', '));

			return _frame.app_main.bgimgs;
		}).then(function () {
			_g.log('Preload All DBs (JSON ver.): START');

			var dbchain = Q(),
			    masterDeferred = Q.defer();

			_g.dbs.forEach(function (db_name) {
				dbchain = dbchain.then(function () {
					var deferred = Q.defer();

					$.ajax({
						'url': '/!/db/' + db_name + '.json?v=' + _g.db_version,
						'dataType': 'text',
						'success': function success(data) {
							data = LZString.decompressFromBase64(data);
							var arr = data.split('\n');
							switch (db_name) {
								default:
									if (typeof _g.data[db_name] == 'undefined') _g.data[db_name] = {};
									arr.forEach(function (str) {
										if (str) {
											var doc = JSON.parse(str);
											switch (db_name) {
												case 'ships':
													_g.data[db_name][doc['id']] = new Ship(doc);
													break;
												case 'items':
													_g.data[db_name][doc['id']] = new Equipment(doc);
													break;
												case 'entities':
													_g.data[db_name][doc['id']] = new Entity(doc);
													break;
												default:
													_g.data[db_name][doc['id']] = doc;
													break;
											}
										}
									});
									break;
							}
						},
						'complete': function complete(jqXHR, textStatus) {
							deferred.resolve();
						}
					});

					return deferred.promise;
				});
			});

			dbchain = dbchain.catch(function (e) {
				console.log(e);
			}).done(function () {
				_g.log('Preload All DBs (JSON ver.): DONE');

				masterDeferred.resolve();
			});

			return masterDeferred.promise;
		}).then(function () {
			_g.log('Preload All DBs: START');
			var the_promises = [],
			    dbs = [],
			    loaded_count = 0;

			for (var db_name in _db) {
				dbs.push(db_name);
			}

			dbs.forEach(function (db_name) {
				var deferred = Q.defer();
				function _done(_db_name) {
					_g.log('DB ' + _db_name + ' DONE');
					deferred.resolve();
					loaded_count++;
					if (loaded_count >= dbs.length) {
						_g.log('Preload All DBs: DONE');
						setTimeout(function () {
							_frame.app_main.loaded('dbs');
						}, 100);
					}
				}
				_db[db_name].loadDatabase(function (err) {
					if (err) {
						deferred.reject(new Error(err));
					} else {
						_db[db_name].find({}, function (dberr, docs) {
							if (dberr) {
								deferred.reject(new Error(dberr));
							} else {
								if (typeof _g.data[db_name] == 'undefined') _g.data[db_name] = {};
								docs.forEach(function (doc) {
									_g.data[db_name][doc['id']] = doc;
								});
								_done(db_name);
							}
						});
					}
				});
				the_promises.push(deferred.promise);
			});

			return Q.all(the_promises);
		}).then(function () {
			var link_page = function link_page(e) {
				e.preventDefault();
				_frame.app_main.load_page($(this).attr('href').substr('?page='.length));
			},
			    link_infos = function link_infos(e) {
				e.preventDefault();
				var el = $(this);
				if (!el.attr('data-infos')) {
					var exp = /^[\?]{0,1}infos\=([^\&]+)\&id\=([^\&]+)/ig.exec(el.attr('href'));
					el.attr('data-infos', '[[' + exp[1].toUpperCase() + '::' + exp[2] + ']]');

					_frame.infos.click(el);
				}
			},
			    link_default = function link_default(e) {
				e.preventDefault();
				var el = $(this),
				    parse = _g.parseURI(el.attr('href'));

				if (parse.page) {
					_frame.app_main.load_page(parse.page);
				} else if (parse.infos) {
					_frame.infos.click(el.attr('data-infos', '[[' + parse.infos.toUpperCase() + '::' + parse.id + ']]'));
				}
			};

			$body.on('click.global_delegate_page', 'a[href^="?page="]', link_page).on('click.global_delegate_infos', 'a[href^="?infos="]', link_infos).on('click.global_delegate_default', 'a[href^="/"]', link_default);

			_frame.dom.bgimg.on(_g.event.animationend, 'div', function () {
				_frame.app_main.change_bgimg_after();
			});

			return !0;
		}).then(function () {
			_frame.gg(_frame.dom.layout);
		}).catch(function (err) {
			_g.error(err);
		}).done(function () {
			_g.log('Global initialization DONE');
		});

		this.is_init = !0;
	}
};

_g.error = function (err) {
	if (!_instanceof(err, Error)) err = new Error(err);

	_g.log(err);
};

var debugmode = !1;

_frame.app_main.page_init = function (page, $page) {
	$page = $page || this.page_dom[page];
	if (this.page[page] && this.page[page].init) this.page[page].init($page);
	_p.initDOM($page);
};

var ShareBar = (function () {
	function ShareBar(options) {
		_classCallCheck(this, ShareBar);

		options = options || {};
		this.settings = $.extend(!0, {}, ShareBar.defaults, options);

		this.el = this.create();

		return this;
	}

	_createClass(ShareBar, [{
		key: 'create',
		value: function create() {
			this.el = $('<div class="sharebar"/>');

			this.settings.sites.forEach((function (site) {
				var link = $('<a/>', {
					'class': 'sharebar-share sharebar-site-' + site,
					'data-share-site': site,
					'href': 'javascript:;',
					'target': '_self',
					'icon': ShareBar.iconmap[site] || site
				}).appendTo(this.el);

				if (this.settings.modifyItem) this.settings.modifyItem(link);
			}).bind(this));

			this.el.on('click.sharebar-share', 'a[data-share-site]', (function (e, is_to_launch) {
				var $el = $(e.target),
				    site = $el.attr('data-share-site');
				$el.attr({
					'href': 'http://www.jiathis.com/send/?webid=' + site + '&url=' + encodeURIComponent(this.getContent('url', location.href)) + '&title=' + encodeURIComponent(this.getContent('title', document.title)) + '&summary=' + encodeURIComponent(this.getContent('summary', $('meta[name="description"]').attr('content'))) + (this.settings.uid ? '&uid=' + this.settings.uid : '') + (this.settings.appkey[site] ? '&appkey=' + this.settings.appkey[site] : ''),
					'target': '_blank'
				});
			}).bind(this));

			return this.el;
		}
	}, {
		key: 'getContent',
		value: function getContent(t, fallback) {
			if (typeof this.settings[t] == 'function') return this.settings[t](this);
			if (this.settings[t]) return this.settings[t];
			return fallback;
		}
	}]);

	return ShareBar;
})();

ShareBar.defaults = {
	sites: ['tsina', 'tqq', 'cqq', 'twitter', 'tieba'],

	appkey: {}
};

ShareBar.iconmap = {
	'tsina': 'weibo',
	'tqq': 'tencent-weibo',
	'cqq': 'qq'
};

_tmpl.improvement = function (equipment, improvement_index, requirement_index, returnHTML) {
	if (typeof equipment == 'undefined') return !1;

	if ((typeof equipment === 'undefined' ? 'undefined' : _typeof(equipment)) != 'object') if (!(equipment = _g.data.items[equipment])) return !1;

	improvement_index = improvement_index || 0;
	requirement_index = requirement_index || [0];
	returnHTML = returnHTML || !1;

	var improvement = equipment['improvement'][improvement_index],
	    upgrade_to = improvement['upgrade'] ? _g.data.items[improvement['upgrade'][0]] : !1,
	    req_ships = [],
	    requirement = '';

	requirement_index.forEach(function (currentValue) {
		var req = improvement['req'][currentValue];
		if (req[1]) req_ships.mergeFrom(req[1]);
	});
	if (req_ships.length) {
		var names = [];
		req_ships.forEach(function (currentValue) {
			names.push('<a' + ' href="?infos=ship&id=' + currentValue + '"' + ' data-infos="[[SHIP::' + currentValue + ']]"' + ' data-tip="[[SHIP::' + currentValue + ']]"' + '>' + _g.data.ships[currentValue].getName() + '</a>');
		});
		requirement = '<font>' + names.join(' / ') + '</font>';
	} else {
		requirement = '<font class="no">无秘书舰要求</font>';
	}

	return _tmpl.export('<span class="improvement">' + _tmpl.improvement__title(equipment, upgrade_to, improvement['upgrade'][1]) + requirement + _tmpl.improvement__resource(improvement, upgrade_to ? !0 : !1) + '</span>', returnHTML);
};

_tmpl.improvement_detail = function (equipment, returnHTML) {
	if (typeof equipment == 'undefined') return !1;

	if ((typeof equipment === 'undefined' ? 'undefined' : _typeof(equipment)) != 'object') if (!(equipment = _g.data.items[equipment])) return !1;

	var html = '',
	    data = equipment['improvement'] || [];

	data.forEach(function (improvement) {
		var upgrade_to = improvement['upgrade'] ? _g.data.items[improvement['upgrade'][0]] : !1,
		    requirements = this.improvement__reqdetails(improvement.req);

		html += '<span class="improvement improvement-details">' + _tmpl.improvement__title(equipment, upgrade_to, improvement['upgrade'][1]) + requirements + _tmpl.improvement__resource(improvement, upgrade_to ? !0 : !1) + '</span>';
	}, this);

	return _tmpl.export(html, returnHTML);
};

_tmpl.improvement_inEquipmentInfos = function (equipment, returnHTML) {
	if (typeof equipment == 'undefined') return !1;

	if ((typeof equipment === 'undefined' ? 'undefined' : _typeof(equipment)) != 'object') if (!(equipment = _g.data.items[equipment])) return !1;

	var html = '',
	    data = equipment['improvement'] || [];

	data.forEach(function (improvement) {
		var upgrade_to = improvement['upgrade'] ? _g.data.items[improvement['upgrade'][0]] : !1,
		    requirements = this.improvement__reqdetails(improvement.req);

		html += '<span class="unit improvement improvement-details">' + '<b>' + (upgrade_to ? '<span class="indicator true">可升级为</span>' + '<a style="background-image:url(/!/assets/images/itemicon/' + upgrade_to.getIconId() + '.png)"' + ' href="?infos=equipment&id=' + upgrade_to['id'] + '"' + ' data-infos="[[EQUIPMENT::' + upgrade_to['id'] + ']]"' + ' data-tip="[[EQUIPMENT::' + upgrade_to['id'] + ']]"' + '>' + upgrade_to.getName(!0) + '</a>' + (improvement['upgrade'][1] ? '<i>+' + improvement['upgrade'][1] + '</i>' : '') : '<span class="indicator false">不可升级</span>') + '</b>' + requirements + _tmpl.improvement__resource(improvement, upgrade_to ? !0 : !1) + '</span>';
	}, this);

	return _tmpl.export(html, returnHTML);
};

_tmpl.improvement__title = function (equipment, upgrade_to, upgrade_to_star) {
	return '<strong>' + '<a style="background-image:url(/!/assets/images/itemicon/' + equipment.getIconId() + '.png)"' + ' href="?infos=equipment&id=' + equipment['id'] + '"' + ' data-infos="[[EQUIPMENT::' + equipment['id'] + ']]"' + ' data-tip="[[EQUIPMENT::' + equipment['id'] + ']]"' + '>' + equipment.getName(!0) + '</a>' + (upgrade_to ? '<b></b>' + '<a style="background-image:url(/!/assets/images/itemicon/' + upgrade_to.getIconId() + '.png)"' + ' href="?infos=equipment&id=' + upgrade_to['id'] + '"' + ' data-infos="[[EQUIPMENT::' + upgrade_to['id'] + ']]"' + ' data-tip="[[EQUIPMENT::' + upgrade_to['id'] + ']]"' + '>' + upgrade_to.getName(!0) + '</a>' + (upgrade_to_star ? '<i>+' + upgrade_to_star + '</i>' : '') : '') + '</strong>';
};
_tmpl.improvement__resource = function (improvement, upgradable) {
	function getValue(v) {
		v = parseInt(v);
		if (v < 0) return '?';
		return v;
	}

	var resource = {};

	resource['all'] = '<span>' + '<em>必要资源</em>' + '<i class="fuel">' + getValue(improvement['resource'][0][0]) + '</i>' + '<i class="ammo">' + getValue(improvement['resource'][0][1]) + '</i>' + '<i class="steel">' + getValue(improvement['resource'][0][2]) + '</i>' + '<i class="bauxite">' + getValue(improvement['resource'][0][3]) + '</i>' + '</span>';

	for (var i = 1; i < 4; i++) {
		var title = '';
		switch (i) {
			case 1:
				title = '★+0 ~ +6';break;
			case 2:
				title = '★+6 ~ MAX';break;
			case 3:
				title = '升级';break;
		}
		resource[i] = '<span>' + '<em>' + title + '</em>' + (i == 3 && !upgradable ? '<i class="no">-</i>' : '<i class="dev_mat">' + getValue(improvement['resource'][i][0]) + '<i>(' + getValue(improvement['resource'][i][1]) + ')</i>' + '</i>' + '<i class="imp_mat">' + getValue(improvement['resource'][i][2]) + '<i>(' + getValue(improvement['resource'][i][3]) + ')</i>' + '</i>' + (improvement['resource'][i][4] ? '<a class="equipment"' + ' style="background-image:url(/!/assets/images/itemicon/' + _g.data.items[improvement['resource'][i][4]].getIconId() + '.png)"' + ' href="?infos=equipment&id=' + improvement['resource'][i][4] + '"' + ' data-infos="[[EQUIPMENT::' + improvement['resource'][i][4] + ']]"' + ' data-tip="[[EQUIPMENT::' + improvement['resource'][i][4] + ']]"' + '>' + _g.data.items[improvement['resource'][i][4]].getName(!0) + '<i>x' + getValue(improvement['resource'][i][5]) + '</i>' + '</a>' : '')) + '</span>';
	}

	return '<span>' + resource['all'] + resource['1'] + resource['2'] + resource['3'] + '</span>';
};
_tmpl.improvement__reqdetails = function (reqdata) {
	if (!reqdata || !reqdata.push || !reqdata.length) return '';

	var requirements = '<font>';

	reqdata.forEach(function (req) {
		var names = [],
		    text;

		requirements += '<b>';

		for (var k = 0; k < 7; k++) {
			switch (k) {
				case 0:
					text = '日';break;
				case 1:
					text = '一';break;
				case 2:
					text = '二';break;
				case 3:
					text = '三';break;
				case 4:
					text = '四';break;
				case 5:
					text = '五';break;
				case 6:
					text = '六';break;
			}
			requirements += '<i' + (req[0][k] ? ' class="on"' : '') + '>' + text + '</i>';
		}

		if (req[1]) {
			req[1].forEach(function (shipid) {
				names.push('<a' + ' href="?infos=ship&id=' + shipid + '"' + ' data-infos="[[SHIP::' + shipid + ']]"' + ' data-tip="[[SHIP::' + shipid + ']]"' + '>' + _g.data.ships[shipid].getName() + '</a>');
			});
			requirements += names.join(' / ');
		} else {
			requirements += '<b>无秘书舰要求</b>';
		}

		requirements += '</b>';
	});

	requirements += '</font>';

	return requirements;
};

_tmpl.link_entity = function (entity, tagName, returnHTML, count) {
	if (!entity) return !1;

	if (tagName && (typeof tagName === 'undefined' ? 'undefined' : _typeof(tagName)) == 'object') return _tmpl.link_entity(entity, tagName['tagName'] || null, tagName['returnHTML'] || null, tagName['count'] || null);

	tagName = tagName || 'a';
	returnHTML = returnHTML || !1;
	count = typeof count == 'undefined' ? !1 : count;

	if ((typeof entity === 'undefined' ? 'undefined' : _typeof(entity)) != 'object') {
		var entityId = parseInt(entity);
		entity = _g.data.entities[entityId];
	} else {
		var entityId = entity['id'];
	}

	return _tmpl.export('<' + tagName + (tagName == 'a' ? ' href="?infos=entity&id=' + entityId + '"' : '') + ' class="link_entity" data-entityid="' + entityId + '" data-infos="[[ENTITY::' + entityId + ']]">' + (entity.picture && entity.picture.avatar ? '<i style="background-image:url(' + entity.picture.avatar + ')"></i>' : '<i></i>') + '<span>' + entity._name + (typeof count == 'undefined' ? '' : ' <small>(' + count + ')</small>') + '</span>' + '</' + tagName + '>', returnHTML);
};

_tmpl.link_equipment = function (equipment, tagName, returnHTML, improvementStar) {
	if (!equipment) return !1;

	if (tagName && (typeof tagName === 'undefined' ? 'undefined' : _typeof(tagName)) == 'object') return _tmpl.link_equipment(equipment, tagName['tagName'] || null, tagName['returnHTML'] || null, typeof tagName['improvementStar'] == 'undefined' ? null : tagName['improvementStar']);

	tagName = tagName || 'a';
	returnHTML = returnHTML || !1;
	improvementStar = typeof improvementStar == 'undefined' ? null : improvementStar;

	if ((typeof equipment === 'undefined' ? 'undefined' : _typeof(equipment)) != 'object') {
		var equipmentId = parseInt(equipment);
		equipment = _g.data.items[equipmentId];
	} else {
		var equipmentId = equipment['id'];
	}

	return _tmpl.export('<' + tagName + (tagName == 'a' ? ' href="?infos=equipment&id=' + equipmentId + '"' : '') + ' class="link_equipment"' + ' data-equipmentid="' + equipmentId + '"' + ' data-tip-position="right"' + ' data-infos="[[EQUIPMENT::' + equipmentId + ']]"' + ' data-tip="[[EQUIPMENT::' + equipmentId + ']]"' + '>' + '<i style="background-image:url(/!/assets/images/itemicon/' + equipment.getIconId() + '.png)"></i>' + '<span>' + equipment.getName(!0) + '</span>' + (improvementStar !== null ? '<em' + (improvementStar <= 0 ? ' class="zero"' : '') + '>+' + improvementStar + '</em>' : '') + '</' + tagName + '>', returnHTML);
};

_tmpl.link_ship = function (ship, tagName, returnHTML, mode) {
	if (!ship) return !1;

	if (tagName && (typeof tagName === 'undefined' ? 'undefined' : _typeof(tagName)) == 'object') return _tmpl.link_ship(ship, tagName['tagName'] || null, tagName['returnHTML'] || null, tagName['mode'] || null);

	tagName = tagName || 'a';
	returnHTML = returnHTML || !1;
	mode = mode || 'default';

	if ((typeof ship === 'undefined' ? 'undefined' : _typeof(ship)) != 'object') {
		var shipId = parseInt(ship);
		ship = _g.data.ships[shipId];
	} else {
		var shipId = ship['id'];
	}

	var content = '',
	    shipType = ship.getType();

	switch (mode) {
		case 'names':
			var names = [];
			ship.getSeriesData().forEach(function (thisSeries) {
				var thisName = _g.data.ships[thisSeries.id].getNameNoSuffix();
				if ($.inArray(thisName, names) < 0) names.push(thisName);
			});
			content = names.join(' / ');
			break;
		default:
			content = (shipType ? '<small>' + shipType + '</small>' : '') + ship.getName(_g.joint);
			break;
	}

	return _tmpl.export('<' + tagName + (tagName == 'a' ? ' href="?infos=ship&id=' + shipId + '"' : '') + ' class="link_ship" data-shipid="' + shipId + '" data-infos="[[SHIP::' + shipId + ']]">' + '<img src="' + node.path.normalize(_g.path.pics.ships) + '/' + shipId + '/0.png"/>' + '<span>' + content + '</span>' + '</' + tagName + '>', returnHTML);
};

_tmpl.textlink_entity = function (entity, tagName, returnHTML) {
	if (!entity) return !1;

	if (tagName && (typeof tagName === 'undefined' ? 'undefined' : _typeof(tagName)) == 'object') return _tmpl.textlink_entity(entity, tagName['tagName'] || null, tagName['returnHTML'] || null);

	tagName = tagName || 'a';
	returnHTML = returnHTML || !1;

	if ((typeof entity === 'undefined' ? 'undefined' : _typeof(entity)) != 'object') {
		var entityId = parseInt(entity);
		entity = _g.data.entities[entityId];
	} else {
		var entityId = entity['id'];
	}

	return _tmpl.export('<' + tagName + (tagName == 'a' ? ' href="?infos=entity&id=' + entityId + '"' : '') + ' data-entityid="' + entityId + '" data-infos="[[ENTITY::' + entityId + ']]">' + entity._name + '</' + tagName + '>', returnHTML);
};

_tmpl.textlink_ship = function (ship, tagName, returnHTML) {
	if (!ship) return !1;

	if (tagName && (typeof tagName === 'undefined' ? 'undefined' : _typeof(tagName)) == 'object') return _tmpl.textlink_ship(ship, tagName['tagName'] || null, tagName['returnHTML'] || null);

	tagName = tagName || 'a';
	returnHTML = returnHTML || !1;

	if ((typeof ship === 'undefined' ? 'undefined' : _typeof(ship)) != 'object') {
		var shipId = parseInt(ship);
		ship = _g.data.ships[shipId];
	} else {
		var shipId = ship['id'];
	}

	var shipType = ship.getType();

	return _tmpl.export('<' + tagName + (tagName == 'a' ? ' href="?infos=ship&id=' + shipId + '"' : '') + ' data-shipid="' + shipId + '" data-infos="[[SHIP::' + shipId + ']]">' + (shipType ? '[' + shipType + '] ' : '') + ship.getName(_g.joint) + '</' + tagName + '>', returnHTML);
};

var PAGE = (function () {
	function PAGE($page) {
		_classCallCheck(this, PAGE);
	}

	_createClass(PAGE, [{
		key: 'modeSelectionEnter',
		value: function modeSelectionEnter(callback_select, callback_enter) {
			var _callback_select = undefined;

			callback_select = callback_select || function () {};
			_callback_select = (function () {
				callback_select(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], arguments[10]);
				this.modeSelectionExit();
			}).bind(this);

			_frame.app_main.mode_selection_callback = _callback_select;

			_frame.app_main.mode_selection_on(callback_enter);

			return _callback_select;
		}
	}, {
		key: 'modeSelectionExit',
		value: function modeSelectionExit() {
			if (!_frame.dom.layout.hasClass('mode-selection')) return !1;

			_frame.app_main.mode_selection_off();
		}
	}]);

	return PAGE;
})();

_frame.app_main.page['fleets'] = {
	init: function init($page) {
		this.object = new ((function (_PAGE) {
			_inherits(_class, _PAGE);

			function _class($page) {
				_classCallCheck(this, _class);

				var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(_class).call(this, $page));

				$page.on({
					'show': function show() {
						if (this.inited) {
							$page.children('.tablelist').data('tablelist').refresh();
						}
						this.inited = !0;
					}
				});
				return _this4;
			}

			return _class;
		})(PAGE))($page);
	}
};

_frame.app_main.page['ships'] = {
	init: function init($page) {

		this.object = new ((function (_PAGE2) {
			_inherits(_class2, _PAGE2);

			function _class2($page) {
				_classCallCheck(this, _class2);

				var _this5 = _possibleConstructorReturn(this, Object.getPrototypeOf(_class2).call(this, $page));

				_this5.tablelist = $page.find('.tablelist');
				_this5.tablelistObj = _this5.tablelist.data('tablelist');

				$page.on({
					'on': (function () {
						if (!this.tablelistObj) this.tablelistObj = this.tablelist.data('tablelist');

						if (this.tablelistObj) this.tablelistObj.thead_redraw();
					}).bind(_this5),
					'modeSelectionEnter': (function (e, callback_select) {
						this.modeSelectionEnter(callback_select);
					}).bind(_this5)
				});
				return _this5;
			}

			return _class2;
		})(PAGE))($page);
	}
};

_frame.app_main.page['equipments'] = {
	init: function init($page) {
		this.object = new ((function (_PAGE3) {
			_inherits(_class3, _PAGE3);

			function _class3($page) {
				_classCallCheck(this, _class3);

				var _this6 = _possibleConstructorReturn(this, Object.getPrototypeOf(_class3).call(this, $page));

				_this6.tablelist = $page.find('.tablelist');
				_this6.tablelistObj = _this6.tablelist.data('tablelist');

				$page.on({
					'on': (function () {
						if (!this.tablelistObj) this.tablelistObj = this.tablelist.data('tablelist');

						if (this.tablelistObj) {
							this.tablelistObj.thead_redraw();
							this.tablelistObj.apply_types();
						}
					}).bind(_this6),
					'modeSelectionEnter': (function (e, callback_select, callback_enter) {
						this.modeSelectionEnter(callback_select, callback_enter);
					}).bind(_this6),
					'show': (function () {
						if (this.tablelistObj) {
							this.tablelistObj.thead_redraw();
							this.tablelistObj.apply_types();
						}
					}).bind(_this6)
				});
				return _this6;
			}

			return _class3;
		})(PAGE))($page);
	}
};

_frame.app_main.page['arsenal'] = {};
_frame.app_main.page['arsenal'].init = function (page) {
	var akashi = page.find('.akashi');
	akashi.attr({
		'animation': Math.floor(Math.random() * 3 + 1)
	}).on(_g.event.animationiteration, function () {
		akashi.attr('animation', Math.floor(Math.random() * 3 + 1));
	});

	this.elMain = page.children('.main');
	this.parse_weekday(this.elMain.children('.body-weekday'));
	this.parse_all(this.elMain.children('.body-all'));

	page.find('input[type="radio"]').on('change', function () {
		_frame.app_main.page['arsenal'].elMain.scrollTop(0);
	});
};

_frame.app_main.page['arsenal'].parse_weekday = function (body) {
	var checkbox_showmeterials = body.find('#arsenal_weekday-showmeterials');
	checkbox_showmeterials.prop('checked', Lockr.get('arsenal_weekday-showmeterials', !0) ? !0 : !1).on('change', function () {
		Lockr.set('arsenal_weekday-showmeterials', checkbox_showmeterials.prop('checked') ? 1 : 0);
	});

	var date = new Date();
	date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
	date.setTime(date.getTime() + 9 * 60 * 60 * 1000);
	body.find('#arsenal_weekday-' + date.getDay()).prop('checked', !0);

	return body;
};

_frame.app_main.page['arsenal'].parse_all = function (body) {};

_frame.app_main.page['about'] = {};

_frame.app_main.page['about'].journal_parse = function (raw) {
	var searchRes,
	    scrapePtrn = /\[\[([^\:]+)\:([0-9]+)\]\]/gi,
	    resultHTML = markdown.toHTML(raw);

	while ((searchRes = scrapePtrn.exec(raw)) !== null) {
		try {
			resultHTML = resultHTML.replace(searchRes[0], _tmpl['link_' + searchRes[1].toLowerCase()](searchRes[2], null, !0));
		} catch (e) {}
	}

	searchRes = null;
	scrapePtrn = /\[\[([^\:]+)\:([0-9]+)\:TEXT\]\]/gi;
	while ((searchRes = scrapePtrn.exec(raw)) !== null) {
		try {
			resultHTML = resultHTML.replace(searchRes[0], _tmpl['textlink_' + searchRes[1].toLowerCase()](searchRes[2], null, !0));
		} catch (e) {}
	}

	return resultHTML;
};

_frame.app_main.page['about'].journaltitle = function (d, tagName) {
	d = d || {};
	tagName = tagName || 'h3';

	return '<h3>' + (d['hotfix'] ? 'HOTFIX - ' : '') + (d['type'] == 'app' ? '' : (d['type'] == 'app-db' ? 'DB' : d['type']).toUpperCase() + ' / ') + d['version'] + '<small>' + (d['date'] ? d['date'] : 'WIP') + '</small>' + '</h3>';
};

_frame.app_main.page['about'].init = function (page) {

	var i = 0;

	function addUpdateJournal(updateData) {
		var id = 'update_journal_' + i++,
		    section = $('<input type="checkbox" id="' + id + '"/>').prop('checked', i < 3 ? !0 : !1).add($('<section class="update_journal" data-version-' + updateData['type'] + '="' + updateData['version'] + '"/>').append($('<label for="' + id + '"/>').html(_frame.app_main.page['about'].journaltitle(updateData)))).appendTo(page);
		try {
			$(_frame.app_main.page['about'].journal_parse(updateData['journal'])).appendTo(section);
		} catch (e) {
			_g.error(e);
			section.remove();
		}
	}

	var promise_chain = Q.fcall(function () {});

	promise_chain.then(function () {
		var deferred = Q.defer();
		_db.updates.find({ 'date': "" }).sort({ 'date': -1, 'version': -1 }).exec(function (err, docs) {
			docs.forEach(function (doc) {
				addUpdateJournal(doc);
			});
			deferred.resolve(err);
		});
		return deferred.promise;
	}).then(function () {
		var deferred = Q.defer();
		_db.updates.find({ $not: { 'date': "" } }).sort({ 'date': -1, 'version': -1 }).exec(function (err, docs) {
			docs.forEach(function (doc) {
				addUpdateJournal(doc);
			});
			deferred.resolve(err);
		});
		return deferred.promise;
	});
};

_frame.app_main.page['calctp'] = {
	'init': function init(page) {
		page.find('form.tpcalculator').each(function (i, form) {
			form = $(form);
			var resultA = form.find('.result_a'),
			    resultS = form.find('.result_s');

			form.on('input', 'input', function () {
				form.trigger('submit');
			}).on('submit', function (e) {
				var d = form.serializeObject(),
				    rA = 0,
				    rS = 0;

				for (var _i7 in d) {
					var count = parseInt(d[_i7]) || 0;
					switch (_i7) {
						case 'dd':
						case 'cl':
							rA += 3 * count;
							rS += 4.5 * count;
							break;
						case 'cav':
							rA += 3 * count;
							rS += 4 * count;
							break;
						case 'av':
							rA += 8 * count;
							rS += 10.5 * count;
							break;
						case 'lha':
						case 'ao':
							rA += 10 * count;
							rS += 13.5 * count;
							break;

						case 'e75':
							rA += 3.5 * count;
							rS += 5 * count;
							break;
						case 'e68':
							rA += 5.5 * count;
							rS += 8.3333 * count;
							break;
					}
				}
				e.preventDefault();
				resultA.html(Math.floor(rA));
				resultS.html(Math.floor(rS));
			});
		});
	}
};

_frame.gg = function () {
	$.ajax({
		'url': 'http://fleet.diablohu.com/!/gg/',
		'method': 'get',
		'dataType': 'html',
		'success': function success(data) {
			if (data) {
				var gg = $('<div class="gg"/>').html(data).append($('<button type="button" class="close"/>').on('click', function () {
					_frame.dom.layout.css('padding-bottom', '').removeClass('mod-gg');
				}));
				_frame.dom.layout.append(gg).addClass('mod-gg').css('padding-bottom', gg.height() + 1);
			}
		}
	});
};

_frame.infos = {
	historyLength: -1,
	historyCurrent: -1,

	contentCache: {},

	getContent: function getContent(type, id, callback) {
		if (!this.contentCache[type]) this.contentCache[type] = {};

		function cb($el) {
			if (callback) callback($el);
			return $el;
		}

		if (!this.firstrun) {
			var firstChildren = this.dom.container.children('.infosbody').eq(0);
			this.firstrun = !0;
			if (firstChildren.attr('data-infos-type') == type && firstChildren.attr('data-infos-id') == id) {
				this.contentCache[type][id] = _p.initDOM(firstChildren);
				_frame.app_main.page_title[_g.state2URI({
					'infos': type,
					'id': id
				})] = document.title;
				return cb(this.contentCache[type][id]);
			} else if (firstChildren.attr('data-infos-type') == type) {
				firstChildren.remove();
			}
		}

		function initcont($el) {
			if (type == 'fleet') $el = _frame.infos['__' + type](id, $el);

			return _p.initDOM($el.addClass('infosbody').attr({
				'data-infos-type': type,
				'data-infos-id': id
			}));
		}

		if (id == '__NEW__') return cb(initcont(this['__' + type](id)));

		if (!this.contentCache[type][id]) {
			_frame.app_main.loading_start(_g.state2URI({
				'infos': type,
				'id': id
			}), {
				success: function success(html) {
					if (html) {
						var result = /\<div class\=\"wrapper\"\>(.+)\<\/div\>/.exec(html);
						_frame.infos.contentCache[type][id] = initcont($(result.length > 1 ? result[1] : ''));
					}
				},
				successAfter: function successAfter() {
					return cb(_frame.infos.contentCache[type][id]);
				},
				error: function error() {
					if (typeof _frame.infos.contentCache[type][id] != 'undefined') delete _frame.infos.contentCache[type][id];
					history.back();
				}
			});
		} else {
			return cb(this.contentCache[type][id]);
		}
	},

	show: function show(cont, el, doNotPushHistory) {
		var exp = /^\[\[([^\:]+)\:\:(.+)\]\]$/.exec(cont),
		    infosType = null,
		    infosId = null;

		if (exp && exp.length > 2) {
			infosType = exp[1].toLowerCase();
			if (isNaN(exp[2])) infosId = exp[2];else infosId = parseInt(exp[2]);
			switch (infosType) {
				case 'item':
				case 'equip':
				case 'equipments':
					infosType = 'equipment';
					break;
			}
		} else {
			return !1;
		}

		if (this.curContent == infosType + '::' + infosId) return this.dom.container.children('div:first-child');

		if (!doNotPushHistory) {
			this.historyCurrent++;
			this.historyLength = this.historyCurrent;
			_frame.app_main.pushState({
				'infos': infosType,
				'id': infosId,
				'infosHistoryIndex': this.historyCurrent
			}, null, _g.state2URI({
				'infos': infosType,
				'id': infosId
			}));
		}

		this.show_func(infosType, infosId, doNotPushHistory);
	},

	show_func: function show_func(type, id, doNotPushHistory, infosHistoryIndex) {
		if (!type || !id) return !1;

		_g.pageChangeBefore();

		if (this.curContent == type + '::' + id) return this.dom.container.children('div:first-child');

		type = type.toLowerCase();
		if (!isNaN(id)) id = parseInt(id);

		var title = null;

		if (!this.dom) {
			this.dom = {
				'main': _frame.dom.main.children('.page-container.infos')
			};
			if (!this.dom.main.length) {
				this.dom.main = $('<div class="page-container infos"/>').appendTo(_frame.dom.main);
				this.dom.container = $('<div class="wrapper"/>').appendTo(this.dom.main);
			} else {
				this.dom.container = this.dom.main.children('.wrapper');
			}
			this.dom.main.on(eventName('transitionend', 'infos_hide'), function (e) {
				if (e.currentTarget == e.target && e.originalEvent.propertyName == 'opacity' && _frame.infos.dom.main.css('opacity') == 0) {
					_frame.infos.hide_finish();
				}
			});
		}

		_frame.dom.layout.addClass('is-infos-show');

		this.curContent = type + '::' + id;

		this.getContent(type, id, (function (cont) {
			this.dom.container.children().not(cont).each(function (i, el) {
				var $el = $(el);
				if ($el.css('opacity') == 0) $el.trigger('hidden');
			});

			switch (type) {
				case 'ship':
				case 'equipment':
				case 'entity':
					this.dom.main.attr('data-infostype', type);
					title = cont.attr('data-infos-title');
					break;
				case 'fleet':
					this.dom.main.attr('data-infostype', 'fleet');
					_frame.app_main.mode_selection_off();
					TablelistEquipments.types = [];
					break;
			}

			var is_firstShow = !cont.data('is_infosinit');

			if (!cont.data('is_infosinit')) {
				if (type == 'ship') {
					(function () {
						var curLvl = parseInt(_config.get('ship_infos_lvl') || 99);
						cont.find('input[type="radio"][name^="ship_infos_lvl_"]').each(function () {
							var $el = $(this),
							    val = $el.val();
							$el.prop('checked', curLvl == val).on('change', function () {
								_config.set('ship_infos_lvl', val);
							});
						});
					})();
				}

				if (_frame.infos['__' + type + '_init']) _frame.infos['__' + type + '_init'](cont);

				cont.data('is_infosinit', !0).on('hidden', function () {
					cont.detach().data('is_show', !1);
				}).on(eventName('transitionend', 'hide'), function (e) {
					if (e.currentTarget == e.target && e.originalEvent.propertyName == 'opacity' && cont.css('opacity') == 0 && cont.data('is_show')) {
						if (_frame.infos.curContent == type + '::' + id) {
							cont.prependTo(_frame.infos.dom.container);
						} else {
							cont.trigger('hidden');
						}
					}
				});
			}

			if (this.curContent != type + '::' + id) return;

			cont.prependTo(this.dom.container).trigger('show', [is_firstShow]).data('is_show', !0);

			this.dom.main.scrollTop(0);

			if (_frame.app_main.cur_page) {

				if (_frame.dom.navs[_frame.app_main.cur_page]) _frame.dom.navs[_frame.app_main.cur_page].removeClass('on');
				if (_frame.app_main.page_dom[_frame.app_main.cur_page]) _frame.app_main.page_dom[_frame.app_main.cur_page].addClass('off').trigger('pageoff').detach();
				_frame.app_main.cur_page = null;
			}

			_frame.dom.main.attr('data-theme', cont.attr('data-theme') || type);

			setTimeout(function () {
				_frame.dom.layout.addClass('is-infos-on');

				if (title) {
					_frame.app_main.title = title;
					document.title = _frame.app_main.page_title[_g.state2URI({
						'infos': type,
						'id': id
					})];
				}

				_ga.counter(location.search);
			}, 1);
		}).bind(this));
	},

	hide: function hide() {
		if (!this.dom || !this.curContent) return !1;

		_frame.dom.layout.removeClass('is-infos-on');

		this.curContent = null;
	},

	hide_finish: function hide_finish() {
		if (this.curContent) return !1;

		this.dom.container.children().trigger('hidden');

		_frame.dom.layout.removeClass('is-infos-show');
		this.dom.main.attr({
			'data-infostype': '',
			'data-theme': ''
		});

		this.historyLength = -1;
		this.historyCurrent = -1;
	},

	click: function click(el) {
		this.show(el.attr('data-infos'), el, el.attr('data-infos-nohistory'));
	},

	init: function init() {
		if (this.is_init) return !0;

		$body.on('click._infos', '[data-infos]', function (e) {
			if (!(e.target.tagName.toLowerCase() == 'input' && e.target.className == 'compare')) {
				_frame.infos.click($(this));

				if (e.target.tagName.toLowerCase() == 'a') e.preventDefault();
			}
		});

		this.is_init = !0;
		return !0;
	}
};

_frame.infos.__ship_init = function ($el) {
	var x = undefined,
	    originalX = undefined,
	    startX = undefined,
	    startY = undefined,
	    deltaX = undefined,
	    deltaY = undefined,
	    isPanning = !1,
	    isScrollSnap = _huCss.csscheck_full('scroll-snap-type') && !bFirefox,
	    illustMain = $el.find('.illustrations'),
	    illust = illustMain.children('div'),
	    imgs = illust.children('span'),
	    s = imgs.eq(0),
	    labels = illustMain.children('label'),
	    inputs = illustMain.children('input[type="radio"]').on('change', function (e) {
		var i = parseInt(e.target.getAttribute('value')) - 1;
		if (!labels.eq(i).is(':visible')) {
			i--;
			inputs.eq(i).prop('checked', !0);
		}
		if (isScrollSnap) {
			illust.off('scroll').animate({
				scrollLeft: imgs.eq(i)[0].offsetLeft
			}, 200, function () {
				illust.on('scroll', scrollHandler);
			});
		} else {}
	}),
	    illustWidth = 0,
	    inputCur = 0,
	    sCount = 1;

	function scrollStart() {
		originalX = illust.scrollLeft();
		illustWidth = illust.width();
		inputCur = parseInt(inputs.filter(':checked').val()) - 1;
		sCount = Math.floor(illustWidth / (s.outerWidth() * 0.95));
	}
	function scrollHandler() {
		x = illust.scrollLeft();
		if (!isPanning) {
			requestAnimationFrame(scrollX);
		}
		isPanning = !0;
	}
	function scrollX() {
		var delta = x - originalX,
		    pDelta = (Math.floor(Math.abs(delta) / illustWidth) + (Math.abs(delta % illustWidth) > illustWidth / 2 ? 1 : 0)) * (x < originalX ? -1 : 1);

		isPanning = !1;
		if (delta !== 0) inputs.eq(inputCur + pDelta * sCount).prop('checked', !0);
	}

	function panX() {
		isPanning = !1;
		var half = inputCur <= 0 && deltaX > 0 || inputCur >= inputs.length - sCount && deltaX < 0;
		illust.addClass('is-panning').css('transform', 'translateX(' + (deltaX * (half ? 0.3333 : 1) + originalX) + 'px)');
	}
	function calcScrollbar() {}

	if (isScrollSnap) {
		illustMain.addClass('mod-scroll-snap');
		$window.on('resized', function () {
			scrollStart();
			if ($el.data('is_show')) inputs.filter(':checked').trigger('change');
		});
		illust.on({
			'scroll': scrollHandler,
			'pointerdown': function pointerdown(e) {
				if (e.originalEvent.pointerType == 'touch') {
					scrollStart();
				}
			} });
		calcScrollbar();
	} else {
		(function () {
			var panEnd = function panEnd() {
				illust.css('transform', '').removeClass('is-panning');
				originalX = 0;
				startX = 0;
				startY = 0;
				deltaX = 0;
				deltaY = 0;
				sCount = 0;
				isActualPanning = !1;
				$(document).off('touchmove.infosShipIllust touchend.infosShipIllust touchcancel.infosShipIllust');
			};

			var panHandler = function panHandler() {
				if (!isPanning) {
					requestAnimationFrame(panX);
				}
				isPanning = !0;
			};

			var bodyTouchMove = function bodyTouchMove(e) {
				if ((startX || startY) && e.originalEvent.targetTouches.length == 1) {
					deltaX = e.originalEvent.targetTouches[0].clientX - startX;
					if (isActualPanning) {
						panHandler();
					} else {
						deltaY = e.originalEvent.targetTouches[0].clientY - startY;
						var absX = Math.abs(deltaX),
						    absY = Math.abs(deltaY);
						if (absX < 20 && absY < 20 || absX > absY) {
							e.preventDefault();
							if (absX > absY) {
								isActualPanning = !0;
								panHandler();
							}
						} else {
							panEnd();
						}
					}
				}
			};

			var bodyTouchEnd = function bodyTouchEnd(e) {
				requestAnimationFrame(function () {
					if (deltaX && Math.abs(deltaX) >= 30) {
						if (deltaX < 0 && inputCur < inputs.length - 1) {
							inputs.eq(inputCur + sCount).prop('checked', !0).trigger('change');
						} else if (deltaX > 0 && inputCur > 0) {
							inputs.eq(inputCur - 1).prop('checked', !0).trigger('change');
						}
					}
					panEnd();
				});
			};

			var isActualPanning = !1;

			illustMain.on({
				'touchstart': function touchstart(e) {
					if (e.originalEvent.targetTouches && e.originalEvent.targetTouches.length == 1) {
						var matrix = illust.css('transform').replace(/[^0-9\-.,]/g, '').split(',');
						originalX = parseInt(matrix[12] || matrix[4] || 0);
						startX = e.originalEvent.targetTouches[0].clientX;
						startY = e.originalEvent.targetTouches[0].clientY;
						inputCur = parseInt(inputs.filter(':checked').val()) - 1;
						sCount = Math.floor(illust.width() / (s.outerWidth() * 0.95));

						$(document).on({
							'touchmove.infosShipIllust': bodyTouchMove,
							'touchend.infosShipIllust': bodyTouchEnd,
							'touchcancel.infosShipIllust': bodyTouchEnd
						});
					}
				},
				'touchmove': function touchmove(e) {
					if (isActualPanning) e.preventDefault();
				}
			});
		})();
	}
};

_frame.infos.__fleet = function (id, el, d) {
	return new InfosFleet(id, el, d).el;
};

var InfosFleet = (function () {
	function InfosFleet(id, el, d) {
		_classCallCheck(this, InfosFleet);

		this.el = el || $('<div/>');
		this.el.addClass('infos-fleet infosbody loading').attr({
			'data-infos-type': 'fleet',
			'data-infos-title': '舰队 (' + id + ')'
		});

		this.doms = {};
		this.fleets = [];

		this.tip_hqlv_input = '输入 0 表示采用默认等级 (Lv.%1$d)';

		if (d) {
			this.init(d);
		} else {
			if (id == '__NEW__') {
				_db.fleets.insert(_tablelist.prototype._fleets_new_data(), (function (err, newDoc) {
					if (err) {
						_g.error(err);
					} else {
						if (_frame.infos.curContent == 'fleet::__NEW__') _frame.infos.show('[[FLEET::' + newDoc['_id'] + ']]');
					}
				}).bind(this));
			} else {
				_db.fleets.find({
					'_id': id
				}, (function (err, docs) {
					if (err || !docs) {
						_g.error(err);
					} else {
						if (_frame.infos.curContent == 'fleet::' + id) {
							if (docs.length) {
								this.init(docs[0]);
							} else {
								try {
									this._infos_state_id = id;
									this.init(TablelistFleets.prototype.new_data(JSON.parse(LZString.decompressFromEncodedURIComponent(_g.uriSearch('d')))));
								} catch (e) {
									_g.error(e);
								}
							}
						} else {
								el.remove();
								delete _frame.infos.contentCache.fleet[id];
							}
					}
				}).bind(this));
			}
		}

		InfosFleet.cur = this;
	}

	_createClass(InfosFleet, [{
		key: 'init',
		value: function init(d) {
			if (!d) return !1;

			this.el.on({
				'show': (function (e, is_firstShow) {
					if (!is_firstShow) {
						var _i8 = 0,
						    _l2 = Lockr.get('hqLvDefault', _g.defaultHqLv);
						while (_i8 < 4) {
							this.fleets[_i8].summaryCalc(!0);
							_i8++;
						}
						if (!this._hqlv) this.doms['hqlvOption'].val(_l2);
						this.doms['hqlvOptionLabel'].data('tip', this.tip_hqlv_input.printf(_l2));
						this.doms['hqlvOption'].attr('placeholder', _l2);
					}
					if (this.is_init) {
						this.updateURI();
					}
				}).bind(this) }).on('focus.number_input_select', 'input[type="number"]:not([readonly])', function (e) {
				e.currentTarget.select();
			});

			this.data = d;

			var i = 0,
			    defaultHqLv = Lockr.get('hqLvDefault', _g.defaultHqLv);

			this.el.attr({
				'data-fleetid': d._id,
				'data-infos-id': d._id
			}).removeClass('loading');

			this.el.find('.loading-msg').remove();

			$('<header/>').append(this.doms['name'] = $('<h3 contenteditable/>').html('点击编辑标题').on({
				'input': (function () {
					this.doms['name'].trigger('namechange');
				}).bind(this),
				'focus': (function () {
					if (this.doms['name'].text() == '点击编辑标题') this.doms['name'].html('');
				}).bind(this),
				'blur': (function () {
					if (!this.doms['name'].text()) this.doms['name'].html('点击编辑标题');
				}).bind(this),
				'namechange': (function (e, content) {
					if (typeof content == 'undefined') {
						content = this.doms['name'].text();
					}

					this._name = content;
					return this.doms['name'];
				}).bind(this),
				'keydown': (function (e) {
					if (e.keyCode == 13) {
						this.doms['name'].blur();
						setTimeout((function () {
							this.doms['name'].blur();
						}).bind(this), 1);
					}
					setTimeout((function () {
						if (!this.doms['name'].text()) this._name = '';
					}).bind(this), 100);
				}).bind(this)
			})).append(this.doms['preview'] = $('<div class="preview"/>')).appendTo(this.el);

			$('<div class="fleets"/>').append(this.doms['tabs'] = $('<div class="tabs"/>')).append(this.doms['options'] = $('<div class="options"/>').append(this.doms['hqlvOptionLabel'] = $('<label/>', {
				'class': 'option option-hqlv',
				'html': '司令部等级',
				'data-tip': this.tip_hqlv_input.printf(defaultHqLv)
			}).on({
				'mouseenter mouseleave': (function (e) {
					if (_p.tip.is_showing && !_p.tip.timeout_fade && this.doms['hqlvOption'].is(':focus')) {
						e.stopImmediatePropagation();
						e.stopPropagation();
					}
				}).bind(this)
			}).append(this.doms['hqlvOption'] = $('<input/>', {
				'type': 'number',
				'min': 0,
				'max': 150,
				'placeholder': defaultHqLv
			}).val(this._hqlv || defaultHqLv).on({
				'input': (function () {
					this._hqlv = this.doms['hqlvOption'].val();
				}).bind(this),
				'focus.tipshow': (function () {
					this.doms['hqlvOption'].trigger('tipshow');
				}).bind(this),
				'blur.tiphide': (function () {
					this.doms['hqlvOption'].trigger('tiphide');
				}).bind(this),
				'click': function click(e) {
					e.stopImmediatePropagation();
					e.stopPropagation();
				}
			}))).append(this.doms['theme'] = $('<select class="option option-theme-value"/>').on('change', (function () {
				this._theme = this.doms['theme'].val();
			}).bind(this)).append(function () {
				var els = $();
				for (var j = 1; j < 11; j++) {
					els = els.add($('<option/>', {
						'value': j,
						'html': '主题-' + j
					}));
				}
				return els;
			})).append(this.doms['themeOption'] = $('<button class="option option-theme mod-dropdown"/>').html('主题').on('click', (function () {
				var _this7 = this;

				if (!InfosFleet.menuTheme) {
					InfosFleet.menuThemeItems = $('<div/>');

					var _loop = function _loop(_i9) {
						$('<button class="theme-' + _i9 + '"/>').html(_i9).on('click', (function () {
							InfosFleet.menuCur._theme = _i9;
							this.el.attr('data-theme', this._theme);
						}).bind(_this7)).appendTo(InfosFleet.menuThemeItems);
					};

					for (var _i9 = 1; _i9 < 11; _i9++) {
						_loop(_i9);
					}
					InfosFleet.menuTheme = new _menu({
						'className': 'contextmenu-infos_fleet_themes',
						'items': [InfosFleet.menuThemeItems]
					});
				}
				InfosFleet.menuCur = this;
				InfosFleet.menuTheme.show(this.doms['themeOption']);
			}).bind(this))).append(this.doms['exportOption'] = $('<button class="option mod-dropdown"/>').html('分享').on('click', (function () {
				if (!InfosFleet.menuExport) {
					var menuitems = [];
					if (!_g.isClient) {
						menuitems.push($('<div class="item"/>').append('分享当前配置<small>可直接分享网址</small>').add(new ShareBar({
							title: function title() {
								return InfosFleet.menuCur.data.name;
							},
							summary: '分享自 是谁呼叫舰队 (http://fleet.diablohu.com)',
							sites: ['tsina', 'tqq', 'cqq', 'twitter', 'tieba'],
							uid: 1552359,
							modifyItem: function modifyItem(el) {
								el.addClass('menuitem');
							}
						}).el.addClass('item')).add($('<hr/>')));
					}
					menuitems = menuitems.concat([$('<menuitem/>', {
						'html': '导出配置代码'
					}).on('click', function () {
						InfosFleet.menuCur.modalExport_show();
					}), $('<menuitem/>', {
						'html': '导出配置文本'
					}).on('click', function () {
						InfosFleet.menuCur.modalExportText_show();
					})]);
					if (_g.isClient) {
						menuitems.push($('<menuitem/>', {
							'html': '生成图片'
						}).on('click', function () {
							InfosFleet.menuCur.exportPic();
						}));
					}
					InfosFleet.menuExport = new _menu({
						'className': 'contextmenu-infos_fleet_themes',
						'items': menuitems
					});
				}
				InfosFleet.menuCur = this;
				InfosFleet.menuExport.show(this.doms['exportOption']);
			}).bind(this))).append(this.doms['optionOptions'] = $('<button class="icon" icon="cog"/>').on('click', (function () {
				TablelistFleets.menuOptions_show(this.doms['optionOptions']);
			}).bind(this)))).appendTo(this.el);

			this.doms['ships'] = $('<div class="ships"/>').appendTo(this.el);

			while (i < 4) {
				this.fleets[i] = new InfosFleetSubFleet(this, [], i);

				$('<input/>', {
					'type': 'radio',
					'name': 'fleet_' + d._id + '_tab',
					'id': 'fleet_' + d._id + '_tab_' + i,
					'value': i
				}).prop('checked', i == 0).prependTo(this.el);

				$('<label/>', {
					'for': 'fleet_' + d._id + '_tab_' + i,
					'data-fleet': i,
					'html': '#' + (i + 1)
				}).appendTo(this.doms['tabs']);

				this.fleets[i].el.attr('data-fleet', i).appendTo(this.doms['ships']);

				i++;
			}

			if (!this.data._id) {
				this.el.addClass('mod-preview');
				this.doms['preview'].html('若要编辑配置或保存以备日后查看，请').append($('<button/>', {
					'html': '保存配置'
				}).on('click', (function () {
					this.previewSave();
				}).bind(this)));

				this.doms['name'].removeAttr('contenteditable');
				this.doms['hqlvOptionLabel'].data('tip', '若要编辑配置或保存以备日后查看，<br/>请点击上方的“保存配置”按钮');
				this.doms['hqlvOption'].prop('readonly', !0);
			}

			this.update(d);

			this._theme = this._theme;

			$body.on('update_defaultHqLv.fleet' + this.data._id, (function (e, val) {
				if (this.el.data('is_show')) {
					if (!this._hqlv) this.doms['hqlvOption'].val(val);
					this.doms['hqlvOptionLabel'].data('tip', this.tip_hqlv_input.printf(val));
					this.doms['hqlvOption'].attr('placeholder', val);
				}
			}).bind(this));
		}
	}, {
		key: 'update',
		value: function update(d) {
			this._updating = !0;
			d = d || {};

			d['data'] = InfosFleet.decompress(d['data']);

			if (typeof d['theme'] != 'undefined') {
				_frame.infos.dom.main.attr('data-theme', d['theme']);
				this.doms['theme'].val(d['theme']).attr('value', d['theme']);
			}

			if (typeof d['name'] != 'undefined') this.doms['name'].html(d['name']).trigger('namechange', [d['name']]).trigger('blur');

			if (d['data'] && d['data'].push) {
				d['data'].forEach(function (currentValue, i) {
					this.fleets[i].updateEl(currentValue);
				}, this);
			}

			this._updating = !1;
		}
	}, {
		key: 'update_data',
		value: function update_data(d) {
			d = d || {};
			this.update(d);
		}
	}, {
		key: 'previewSave',
		value: function previewSave() {
			_db.fleets.insert(TablelistFleets.prototype.new_data(this.data), (function (err, newDoc) {
				if (err) {
					_g.error(err);
				} else {
					this.el.attr({
						'data-infos-id': newDoc._id
					});
					_frame.infos.curContent = 'fleet::' + newDoc._id;
					var newEl = _frame.infos.__fleet(newDoc._id, null, newDoc);
					_frame.infos.contentCache.fleet[newDoc._id] = newEl;
					_frame.infos.contentCache.fleet[this._infos_state_id] = newEl;
					newEl.insertBefore(this.el);
					this.el.remove();
					delete this;

					_g.badgeMsg('舰队配置已保存');
				}
			}).bind(this));
		}
	}, {
		key: 'updateURI',
		value: function updateURI() {
			if (!_g.isClient && this.data._id && _g.uriSearch()) {
				var d = $.extend(!0, {}, this.data),
				    _id = d._id;
				delete d._id;
				delete d.time_create;
				delete d.time_modify;
				delete d.rating;
				delete d.user;
				history.replaceState(history.state, document.title, location.pathname + '?i=' + _id + '&d=' + LZString.compressToEncodedURIComponent(JSON.stringify(d)));
			}
		}
	}, {
		key: 'save',
		value: function save(not_save_to_file) {
			if (this._updating) return this;

			if (this.is_init) {
				this.data.data = [];
				this.fleets.forEach(function (currentValue, i) {
					this.data.data[i] = currentValue.data;
				}, this);

				this.data.time_modify = _g.timeNow();

				this.updateURI();

				if (!not_save_to_file) {
					clearTimeout(this.delay_updateDb);
					this.delay_updateDb = setTimeout((function () {
						_db.fleets.updateById(this.data._id, InfosFleet.compressMetaData(this.data), (function () {
							_g.log('saved');
							InfosFleet.decompressMetaData(this.data);
						}).bind(this));
						clearTimeout(this.delay_updateDb);
						this.delay_updateDb = null;
					}).bind(this), 200);
				}
			} else {
				this.updateURI();
			}

			this.is_init = !0;
			return this;
		}
	}, {
		key: 'modalExport_show',
		value: function modalExport_show() {
			InfosFleet.modalExport_show(this.data);
		}
	}, {
		key: 'modalExportText_show',
		value: function modalExportText_show() {
			InfosFleet.modalExportText_show(this.data);
		}
	}, {
		key: 'exportPic',
		value: function exportPic() {
			if (!InfosFleet.fileDialog_export) {
				InfosFleet.fileDialog_export = $('<input type="file" accept=".png" nwsaveas/>').on({
					'click': function click(e, windowWidth, windowHeight) {
						InfosFleet.fileDialog_export.data({
							'windowWidth': windowWidth,
							'windowHeight': windowHeight
						});
						InfosFleet.fileDialog_export_showing = !0;
					},
					'change': function change() {
						var path = InfosFleet.fileDialog_export.val();
						InfosFleet.fileDialog_export.val('');

						_g.log('changed');

						setTimeout(function () {
							node.win.capturePage(function (buffer) {
								var wstream = node.fs.createWriteStream(path);
								wstream.write(buffer);
								wstream.end();
							}, { format: 'png', datatype: 'buffer' });
						}, 0);
					},
					'resetCaptureMode': function resetCaptureMode() {
						if (!InfosFleet.fileDialog_export.val() && $body.hasClass('mod-capture')) {
							$body.removeClass('mod-capture');
							node.win.resizeTo(InfosFleet.fileDialog_export.data('windowWidth'), InfosFleet.fileDialog_export.data('windowHeight'));
							InfosFleet.fileDialog_export.data({
								'windowWidth': null,
								'windowHeight': null
							});
							_menu.hideAll();
						}
					}
				}).appendTo(_frame.dom.hidden);
				$window.on('focus.resetCaptureMode', function () {
					if (InfosFleet.fileDialog_export_showing) setTimeout(function () {
						InfosFleet.fileDialog_export.trigger('resetCaptureMode');
						InfosFleet.fileDialog_export_showing = !1;
					}, 100);
				});
			}

			var windowWidth = $window.width(),
			    windowHeight = $window.height();

			$body.addClass('mod-capture');
			node.win.resizeTo(1280, 720);

			InfosFleet.fileDialog_export.trigger('click', [windowWidth, windowHeight]);
		}
	}, {
		key: 'remove',
		value: function remove() {
			InfosFleet.modalRemove_show(this);
		}
	}, {
		key: '_name',
		get: function get() {
			return this.data['name'];
		},
		set: function set(value) {
			this.data['name'] = value;

			if (value) {
				this.doms['name'].attr('data-content', value);
			} else {
				this.doms['name'].removeAttr('data-content');
			}

			this.save();
		}
	}, {
		key: '_theme',
		get: function get() {
			return this.data['theme'];
		},
		set: function set(value) {
			this.data['theme'] = value || 1;
			this.doms['theme'].val(this.data['theme']).attr('value', this.data['theme']);
			_frame.infos.dom.main.attr('data-theme', this.data['theme']);
			this.el.attr('data-theme', this.data['theme']);
			_frame.dom.main.attr('data-theme', this.data['theme']);
			this.save();
		}
	}, {
		key: '_hqlv',
		get: function get() {
			if (this.data['hq_lv'] > 0) return this.data['hq_lv'];
			return 0;
		},
		set: function set(value) {
			value = parseInt(value);
			var last = this._hqlv;
			if (value && value > 0) {
				this.data['hq_lv'] = value;
				this.doms['hqlvOption'].val(value);
			} else {
				value = -1;
				this.data['hq_lv'] = -1;
				this.doms['hqlvOption'].val(Lockr.get('hqLvDefault', _g.defaultHqLv));
			}
			if (last != value) {
				var _i10 = 0;
				while (_i10 < 4) {
					this.fleets[_i10].summaryCalc(!0);
					_i10++;
				}
				this.save();
			}
		}
	}]);

	return InfosFleet;
})();

InfosFleet.modalExport = function (curval) {
	if (!InfosFleet.elModalExport) {
		InfosFleet.elModalExport = $('<div/>').append(InfosFleet.elModalExportTextarea = $('<textarea/>', {
			'readonly': !0
		})).append($('<p class="note-codeusage"/>').html('* 该配置代码可用于<a href="http://www.kancolle-calc.net/deckbuilder.html">艦載機厨デッキビルダー</a>')).append($('<button class="button"/>').html('复制到剪切板').on('click', function () {
			node.clipboard.set(InfosFleet.elModalExportTextarea.val(), 'text');
		}));
	}
	InfosFleet.elModalExportTextarea.val(curval || '');

	return InfosFleet.elModalExport;
};
InfosFleet.modalExport_show = function (data) {
	data = InfosFleet.decompress(data.data || []);

	data = JSON.stringify(_g.kancolle_calc.encode(data));

	_frame.modal.show(InfosFleet.modalExport(data), '导出配置代码', {
		'classname': 'infos_fleet infos_fleet_export',
		'detach': !0
	});
};
InfosFleet.modalExportText_show = function (data) {
	if (!data) return !1;

	var text = '',
	    fleets = InfosFleet.decompress(data.data).filter(function (value) {
		return value.length;
	}) || [];

	text += data.name || '';

	fleets.forEach(function (fleet, i) {
		text += (text ? '\n' : '') + (fleets.length > 1 ? '\n第 ' + (i + 1) + ' 舰队' : '');
		fleet.filter(function (value) {
			return value.length > 0 && value[0];
		}).forEach(function (ship, j) {
			text += '\n' + '(' + (i ? i + 1 + '-' : '') + (j + 1) + ')' + _g.data.ships[ship[0]]._name + (ship[1] && ship[1][0] ? ' Lv.' + ship[1][0] : '');
			var equipments = ship[2] || [],
			    stars = ship[3] || [],
			    ranks = ship[4] || [];
			equipments.filter(function (value) {
				return value;
			}).forEach(function (equipment, k) {
				text += (!k ? ' | ' : ', ') + _g.data.items[equipment]._name + (stars[k] ? '★' + stars[k] : '') + (ranks[k] ? '[' + _g.textRank[ranks[k]] + ']' : '');
			});
		});
	});

	text += (text ? '\n\n' : '') + '* 创建自 是谁呼叫舰队 (fleet.diablohu.com)';

	_frame.modal.show(InfosFleet.modalExport(text), '导出配置文本', {
		'classname': 'infos_fleet infos_fleet_export mod-text',
		'detach': !0
	});
};
InfosFleet.modalRemove_show = function (id, is_list) {
	if (typeof id == 'undefined') return;

	var infosFleet = undefined;
	if (_instanceof(id, InfosFleet)) {
		infosFleet = id;
		id = infosFleet.data._id;
	}

	if (!InfosFleet.elModalRemove) {
		InfosFleet.elModalRemove = $('<form/>').append(InfosFleet.elModalRemoveId = $('<input name="id" type="hidden"/>')).append($('<p/>').html('是否删除该舰队配置？')).append($('<p class="actions"/>').append($('<button/>', {
			'type': 'submit',
			'class': 'button',
			'html': '是'
		})).append($('<button/>', {
			'type': 'button',
			'class': 'button',
			'html': '否'
		}).on('click', function () {
			_frame.modal.hide();
		}))).on('submit', function (e) {
			e.preventDefault();
			var _id = InfosFleet.elModalRemoveId.val();
			if (_id) {
				_frame.app_main.loading_start('remove_fleet_' + _id, !1);
				_db.fleets.remove({
					_id: _id
				}, { multi: !0 }, function (err, numRemoved) {
					_g.log('Fleet ' + _id + ' removed.');
					_frame.app_main.loading_complete('remove_fleet_' + _id);
					_frame.modal.hide();
					_g.badgeMsg('已删除配置');
					if (is_list && _instanceof(is_list, TablelistFleets)) {
						is_list.refresh();
					} else {
						_frame.dom.navs.fleets.click();
					}
				});
			}
			return !1;
		});
	}

	InfosFleet.elModalRemoveId.val(id);

	_frame.modal.show(InfosFleet.elModalRemove, '删除配置', {
		'classname': 'infos_fleet infos_fleet_remove',
		'detach': !0
	});
};
InfosFleet.decompress = function (code) {
	if (code && !code.push) {
		try {
			code = JSON.parse(LZString.decompressFromEncodedURIComponent(code));
		} catch (e) {
			_g.error(e);
		}
	}
	return code;
};
InfosFleet.compress = function (code) {
	if (code && code.push) {
		try {
			code = LZString.compressToEncodedURIComponent(JSON.stringify(code));
		} catch (e) {
			_g.error(e);
		}
	}
	return code;
};
InfosFleet.compressMetaData = function (code) {
	if (code && code.data && code.data.push) {
		try {
			code.data = InfosFleet.compress(code.data);
		} catch (e) {
			_g.error(e);
		}
	}
	return code;
};
InfosFleet.decompressMetaData = function (code) {
	if (code && code.data && !code.data.push) {
		try {
			code.data = InfosFleet.decompress(code.data);
		} catch (e) {
			_g.error(e);
		}
	}
	return code;
};

var InfosFleetSubFleet = (function () {
	function InfosFleetSubFleet(infosFleet, d, index) {
		_classCallCheck(this, InfosFleetSubFleet);

		d = d || [];
		this.data = d;

		this.el = $('<dl class="fleetinfos-ships"/>');

		this.ships = [];

		var i = 0;
		while (i < 6) {
			this.ships[i] = new InfosFleetShip(infosFleet, this, i);
			this.ships[i].getEl().appendTo(this.el);

			i++;
		}

		this.elSummary = $('<span class="summary"/>').appendTo(this.el).append($('<span class="summary-item"/>').html('航速').append(this.elSummarySpeed = $('<strong/>').html('-'))).append($('<span class="summary-item"/>').html('制空战力').append(this.elSummaryFighterPower = $('<strong/>').html('-'))).append($('<span class="summary-item"/>').html('索敌能力').append(this.elSummaryLos = $('<strong/>').html('-'))).append($('<span class="summary-item summary-item-consummation"/>').html('总消耗').append(this.elSummaryConsummation = $('<strong/>').html('-')));

		this.infosFleet = infosFleet;

		this.updateEl();

		$body.on('update_defaultHqLv.fleet' + infosFleet.data._id + '-' + (index + 1), (function () {
			if (this.infosFleet.el.data('is_show')) this.summaryCalc(!0);
		}).bind(this));
	}

	_createClass(InfosFleetSubFleet, [{
		key: 'updateEl',
		value: function updateEl(d) {
			this.data = d || this.data;
			if (d) d.forEach(function (currentValue, i) {
				this.ships[i].updateEl(currentValue);
			}, this);
		}
	}, {
		key: 'getData',
		value: function getData() {
			return this.data;
		}
	}, {
		key: 'summaryCalc',
		value: function summaryCalc(is_onlyHqLvChange) {
			if (this.summaryCalculating) return !1;

			this.summaryCalculating = setTimeout((function () {
				var _this8 = this;

				if (!is_onlyHqLvChange) {
					(function () {
						var fighterPower = [0, 0],
						    fleetSpeet = 'fast',
						    consumFuel = 0,
						    consumAmmo = 0;

						_this8.ships.forEach(function (shipdata) {
							if (shipdata.data[0]) {
								var ship = _g.data.ships[shipdata.data[0]];

								if (ship.stat.speed < 10) fleetSpeet = 'slow';

								shipdata.calculate('fighterPower_v2').forEach(function (val, i) {
									fighterPower[i] += val > 0 ? val : 0;
								});

								consumFuel += ship.getAttribute('fuel', shipdata.shipLv) || 0;
								consumAmmo += ship.getAttribute('ammo', shipdata.shipLv) || 0;
							}
						});

						_this8.elSummarySpeed.html(fleetSpeet == 'fast' ? '高速' : '低速');

						if (Math.max(fighterPower[0], fighterPower[1]) > 0) {
							var val1 = Math.floor(fighterPower[0]),
							    val2 = Math.floor(fighterPower[1]);
							_this8.elSummaryFighterPower.html(val1 == val2 ? val1 : val1 + '~' + val2);
							_this8.elSummaryFighterPower.removeClass('empty');
						} else {
							_this8.elSummaryFighterPower.html('-');
							_this8.elSummaryFighterPower.addClass('empty');
						}

						_this8.elSummaryConsummation.html(consumFuel || consumAmmo ? '<span class="fuel">' + consumFuel + '</span><span class="ammo">' + consumAmmo + '</span>' : '-');
					})();
				}

				var los = this.summaryCalcLos();
				if (los.y_estimate && los.y_std_error) {
					var losMin = (los.y_estimate - los.y_std_error).toFixed(1),
					    losMax = (los.y_estimate + los.y_std_error).toFixed(1);
					if (losMin < 0) losMin = 0;
					if (losMax < 0) losMax = 0;
					this.elSummaryLos.html(losMin == losMax ? losMin : losMin + '~' + losMax);
				}

				this.summaryCalculating = null;
			}).bind(this), 10);
		}
	}, {
		key: 'summaryCalcLos',
		value: function summaryCalcLos() {
			var hq_lv = this.infosFleet.data.hq_lv || Lockr.get('hqLvDefault', _g.defaultHqLv);
			if (hq_lv < 0) hq_lv = Lockr.get('hqLvDefault', _g.defaultHqLv);

			var x = {
				'DiveBombers': 0,
				'TorpedoBombers': 0,
				'CarrierRecons': 0,
				'SeaplaneRecons': 0,
				'SeaplaneBombers': 0,
				'SmallRadars': 0,
				'LargeRadars': 0,
				'Searchlights': 0,
				'statLos': 0,
				'hqLv': hq_lv
			};

			this.ships.forEach(function (shipdata) {
				if (shipdata && shipdata.shipId) {
					var equipments_by_slot = shipdata.data[2].map(function (equipment) {
						if (!equipment) return null;
						if (_instanceof(equipment, Equipment)) return equipment;
						return _g.data.items[equipment];
					}) || [];
					equipments_by_slot.forEach(function (equipment) {
						if (equipment) {
							for (var _i11 in x) {
								if (Formula.equipmentType[_i11] && Formula.equipmentType[_i11].push && Formula.equipmentType[_i11].indexOf(equipment.type) > -1) x[_i11] += equipment.stat.los;
							}
						}
					});
					var shipLv = shipdata.shipLv || 1,
					    shipLos = _g.data.ships[shipdata.shipId].getAttribute('los', shipLv) || 1;
					if (shipLv < 0) shipLv = 1;
					if (shipLos < 0) shipLos = 1;
					x.statLos += Math.sqrt(shipLos);
				}
			});

			return Formula.calc.losPower(x);
		}
	}, {
		key: 'save',
		value: function save() {
			var allEmpty = !0;
			this.data = this.data || [];

			this.ships.forEach(function (currentValue, i) {
				this.data[i] = currentValue.data;

				if (currentValue.data[0]) allEmpty = !1;
			}, this);

			if (allEmpty) this.data = null;

			if (this.infosFleet) this.infosFleet.save();
		}
	}]);

	return InfosFleetSubFleet;
})();

var InfosFleetShip = (function () {
	function InfosFleetShip(infosFleet, infosFleetSubFleet, index, d) {
		_classCallCheck(this, InfosFleetShip);

		if (this.el) return this.el;

		d = d || [null, [null, -1], [], [], []];
		this.data = d;
		this.infosFleet = infosFleet;
		this.infosFleetSubFleet = infosFleetSubFleet;
		this.equipments = [];
		this.index = index;

		this.el = $('<dd class="noship"/>').append($('<dt/>').append(this.elAvatar = $('<s touch-action="none"/>')).append(this.elInfos = $('<div/>').html('<span>' + (this.infosFleet.data._id ? '选择舰娘' : '无舰娘') + '...</span>').append(this.elInfosTitle = $('<div class="title"/>')).append($('<div class="info"/>').append($('<label/>').html('Lv.').append(this.elInputLevel = $('<input/>', {
			'type': 'number',
			'min': 0,
			'max': 150
		}).on({
			'change': (function (e) {
				var value = this.elInputLevel.val();

				if ((typeof value == 'undefined' || value === '') && this.data[1][0]) this.shipLv = null;

				value = parseInt(value);
				if (value < 0) {
					value = 0;
					this.elInputLevel.val(0);
				} else if (value > 150) {
					value = 150;
					this.elInputLevel.val(150);
				}
				if (!isNaN(value) && this.data[1][0] != value) this.shipLv = value;
			}).bind(this),
			'input': (function () {
				this.elInputLevel.trigger('change');
			}).bind(this)
		}))).append(this.elInfosInfo = $('<span/>'))))).append($('<div class="equipments"/>').append((function () {
			var els = $();
			for (var _i12 = 0; _i12 < 4; _i12++) {
				this.equipments[_i12] = new InfosFleetShipEquipment(this, _i12);
				els = els.add(this.equipments[_i12].el);
			}

			return els;
		}).bind(this))).append($('<div class="attributes"/>').append(this.elAttrShelling = $('<span class="shelling"/>')).append(this.elAttrTorpedo = $('<span class="torpedo"/>')).append(this.elAttrHitSum = $('<span class="hitsum"/>')).append(this.elAttrHp = $('<span class="hp"/>')).append(this.elAttrArmor = $('<span class="armor"/>')).append(this.elAttrEvasion = $('<span class="evasion"/>')).append(this.elAttrNightBattle = $('<span class="nightbattle" data-text="夜战"/>')).append(_huCss.csscheck_full('mask-image') ? null : $('<div class="bg"/>'))).append($('<div class="options"/>').append(this.elBtnOptions = $('<button class="options"/>').on('click', (function (e) {
			this.showMenu();
		}).bind(this))));

		this.after = $('<s/>');

		this.els = this.el.add(this.after);

		if (this.infosFleet.data._id) {
			this.el.on({
				'click': (function () {
					if (!this.data[0]) this.selectShipStart();
				}).bind(this),

				'pointerenter': (function () {
					InfosFleetShip.dragEnter(this);
				}).bind(this)
			});
			this.elAvatar.on({
				'pointerdown': (function (e) {
					e.preventDefault();
					if (this.data[0]) {
						document.activeElement.blur();
						InfosFleetShip.dragStart(this);
					}
				}).bind(this)
			});
		} else {
			this.elInputLevel.prop('readonly', !0);
		}

		if (!_huCss.csscheck_full('mask-image')) {
			this.el.addClass('mod-nomask');
		}
	}

	_createClass(InfosFleetShip, [{
		key: 'getEl',
		value: function getEl() {
			return this.els;
		}
	}, {
		key: 'selectShipStart',
		value: function selectShipStart() {
			_g.log('开始选择舰娘');

			_frame.app_main.load_page('ships', {
				callback_modeSelection_select: (function (id) {
					history.back();
					this.shipId = id;
					this.shipLv = null;
					if (this.infosFleet) _frame.infos.dom.main.attr('data-theme', this.infosFleet.data['theme']);
				}).bind(this)
			});
		}
	}, {
		key: 'changeLuck',
		value: function changeLuck(luck) {
			this.data[1][1] = luck || -1;
		}
	}, {
		key: 'updateAttrs',
		value: function updateAttrs() {
			this.elAttrShelling.html(this.calculate('shellingDamage'));
			this.elAttrTorpedo.html(this.calculate('torpedoDamage'));

			var hitSum = this.calculate('addHit');
			if (hitSum >= 0) this.elAttrHitSum.removeClass('negative');else this.elAttrHitSum.addClass('negative');
			this.elAttrHitSum.html(hitSum);

			this.elAttrHp.html(this.calculate('attribute', 'hp'));
			this.elAttrArmor.html(this.calculate('attribute', 'armor') + this.calculate('addArmor'));

			var attrEvasion = this.shipLv ? this.calculate('attribute', 'evasion') : -1;
			this.elAttrEvasion.html(attrEvasion >= 0 ? attrEvasion + this.calculate('addEvasion') : '-');

			this.elAttrNightBattle.html(this.calculate('nightBattle'));
		}
	}, {
		key: 'calculate',
		value: function calculate(type, attr) {
			if (!this.shipId) return '-';
			if (type == 'attribute') return _g.data.ships[this.shipId].getAttribute(attr, this.shipLv);
			if (Formula[type]) {
				switch (type) {
					case 'losPower':
						return Formula[type](this.shipId, this.data[2], this.data[3], this.data[4], {
							'hqLv': this.infosFleet.data.hq_lv,
							'shipLv': this.shipLv
						});
						break;
					default:
						return Formula[type](this.shipId, this.data[2], this.data[3], this.data[4]);
						break;
				}
			}
			return '-';
		}
	}, {
		key: 'updateEl',
		value: function updateEl(d) {
			this._updating = !0;

			this.data = d || this.data;

			if (typeof this.data[0] == 'string') this.data[0] = parseInt(this.data[0]);
			if (!this.data[2]) this.data[2] = [];
			if (!this.data[3]) this.data[3] = [];
			if (!this.data[4]) this.data[4] = [];

			if (this.data[0]) this.shipId = this.data[0];

			if (this.data[1][0]) this.shipLv = this.data[1][0];

			for (var _i13 = 0; _i13 < 4; _i13++) {
				this.equipments[_i13].id = this.data[2][_i13];
				this.equipments[_i13].star = this.data[3][_i13];
				this.equipments[_i13].rank = this.data[4][_i13];
			}

			this.updateAttrs();

			this._updating = !1;
		}
	}, {
		key: 'getData',
		value: function getData() {
			return this.data;
		}
	}, {
		key: 'showMenu',
		value: function showMenu() {
			InfosFleetShip.menuCurObj = this;

			if (!InfosFleetShip.menu) {
				InfosFleetShip.menuItems = [$('<menuitem class="move move-up"/>').html(' ').on({
					'click': function click(e) {
						InfosFleetShip.menuCurObj.moveUp();
					},
					'show': function show() {
						if (InfosFleetShip.menuCurObj.index) InfosFleetShip.menuItems[0].removeClass('disabled');else InfosFleetShip.menuItems[0].addClass('disabled');
					}
				}), $('<menuitem class="move move-down"/>').html(' ').on({
					'click': function click(e) {
						InfosFleetShip.menuCurObj.moveDown();
					},
					'show': function show() {
						if (InfosFleetShip.menuCurObj.index < 5) InfosFleetShip.menuItems[1].removeClass('disabled');else InfosFleetShip.menuItems[1].addClass('disabled');
					}
				}), $('<hr/>'), $('<menuitem/>').html('查看资料').on({
					'show': function show() {
						InfosFleetShip.menuItems[3].attr('data-infos', '[[SHIP::' + InfosFleetShip.menuCurObj.shipId + ']]');
					}
				}), $('<menuitem/>').html('移除').on({
					'click': function click(e) {
						InfosFleetShip.menuCurObj.shipId = null;
					}
				}), $('<menuitem/>').html('替换为 ...').on({
					'click': function click(e) {
						InfosFleetShip.menuCurObj.selectShipStart();
					}
				}), $('<div/>').on('show', function () {
					var $div = InfosFleetShip.menuItems[6].empty();
					if (InfosFleetShip.menuCurObj.shipId) {
						var series = _g['data']['ships'][InfosFleetShip.menuCurObj.shipId].getSeriesData() || [];
						if (series.length > 1) {
							series.forEach(function (currentValue, i) {
								if (!i) $div.append($('<hr/>'));
								if (currentValue['id'] != InfosFleetShip.menuCurObj.shipId) $div.append($('<menuitem/>').html('替换为 ' + _g['data']['ships'][currentValue['id']].getName(!0)).on({
									'click': function click() {
										InfosFleetShip.menuCurObj.shipId = currentValue['id'];
									}
								}));
							});
						}
					}
				})];
				InfosFleetShip.menu = new _menu({
					'className': 'contextmenu-ship',
					'items': InfosFleetShip.menuItems
				});
			}

			InfosFleetShip.menu.show(this.elBtnOptions);
		}
	}, {
		key: 'swap',
		value: function swap(target, save) {
			if (typeof target == 'number') target = this.infosFleetSubFleet.ships[target];

			if (this.index > target.index) {
				this.el.insertBefore(target.el);
			} else {
				this.el.insertAfter(target.after);
			}
			this.after.insertAfter(this.el);

			var newIndex_dragging = target.index,
			    newIndex_enter = this.index;

			console.log(newIndex_dragging, newIndex_enter);

			this.index = newIndex_dragging;
			target.index = newIndex_enter;
			this.infosFleetSubFleet.ships[newIndex_dragging] = this;
			this.infosFleetSubFleet.ships[newIndex_enter] = target;

			if (save) this.save();
		}
	}, {
		key: 'moveUp',
		value: function moveUp() {
			if (this.index <= 0) return;

			this.swap(this.index - 1, !0);
		}
	}, {
		key: 'moveDown',
		value: function moveDown() {
			if (this.index >= 5) return;

			this.swap(this.index + 1, !0);
		}
	}, {
		key: 'save',
		value: function save() {
			if (this._updating) return !1;

			if (!this._updateTimeout) {
				this._updateTimeout = setTimeout((function () {
					this.updateAttrs();
					if (this.infosFleetSubFleet) {
						this.infosFleetSubFleet.summaryCalc();
						this.infosFleetSubFleet.save();
					}
					this._updateTimeout = null;
				}).bind(this), 50);
			}
		}
	}, {
		key: 'shipId',
		get: function get() {
			return this.data[0];
		},
		set: function set(value) {
			if (value != this.data[0]) {
				this.data[0] = value;
				this.shipLv = null;
			}

			if (value) {
				var ship = _g.data.ships[value],
				    suffix = ship.getSuffix(),
				    speed = ship._speed,
				    stype = ship._type;

				stype = stype.replace(speed, '');

				this.el.attr('data-shipId', value);
				this.el.removeClass('noship');
				this.elAvatar.html('<img src="' + ship.getPic(10) + '"/>');
				this.elInfosTitle.html('<h4 data-content="' + ship['name'][_g.lang] + '">' + ship['name'][_g.lang] + '</h4>' + (suffix ? '<h5 data-content="' + suffix + '">' + suffix + '</h5>' : ''));
				this.elInfosInfo.html(speed + ' ' + stype);

				for (var _i14 = 0; _i14 < 4; _i14++) {
					this.equipments[_i14].carry = ship.slot[_i14];
					if (!this._updating) {
						this.equipments[_i14].id = null;
						this.equipments[_i14].star = null;
						this.equipments[_i14].rank = null;
					}
				}
			} else {
				this.el.removeAttr('data-shipId');
				this.el.addClass('noship');
				this.elAvatar.html('');
				this.data[2] = [];
				this.data[3] = [];
				this.data[4] = [];
			}

			this.save();
		}
	}, {
		key: 'shipLv',
		get: function get() {
			return this.data[1][0];
		},
		set: function set(value) {
			this.data[1][0] = value || null;
			if (value && value > 0) {
				this.elInputLevel.val(value);
			} else {
				this.elInputLevel.val('');
			}

			this.save();
		}
	}]);

	return InfosFleetShip;
})();

InfosFleetShip.dragStart = function (infosFleetShip) {
	if (InfosFleetShip.dragging || !infosFleetShip) return !1;

	InfosFleetShip.dragging = infosFleetShip;
	infosFleetShip.el.addClass('moving');

	if (!InfosFleetShip.isInit) {
		$body.on({
			'pointerup.InfosFleetShip_dragend pointercancel.InfosFleetShip_dragend': function pointerupInfosFleetShip_dragendPointercancelInfosFleetShip_dragend() {
				if (InfosFleetShip.dragging) {
					InfosFleetShip.dragging.el.removeClass('moving');
					InfosFleetShip.dragging.save();
					InfosFleetShip.dragging = null;
				}
			}
		});
		InfosFleetShip.isInit = !0;
	}
};
InfosFleetShip.dragEnter = function (infosFleetShip_enter) {
	if (!InfosFleetShip.dragging || !infosFleetShip_enter || InfosFleetShip.dragging == infosFleetShip_enter) return !1;

	InfosFleetShip.dragging.swap(infosFleetShip_enter);
};

var InfosFleetShipEquipment = (function () {
	function InfosFleetShipEquipment(infosFleetShip, index) {
		_classCallCheck(this, InfosFleetShipEquipment);

		this.index = index || 0;
		this.infosFleetShip = infosFleetShip;

		if (this.el) return this.el;

		this.el = $('<div class="equipment" touch-action="none" tabindex="0"/>').on({
			'focus': (function () {
				this.el.addClass('is-hover');
			}).bind(this),
			'blur': (function () {
				this.el.removeClass('is-hover');
			}).bind(this),
			'pointerenter': (function (e) {
				if (e.originalEvent.pointerType != 'touch') {
					this.el.addClass('is-hover');
				}
			}).bind(this),
			'pointerleave': (function (e) {
				if (e.originalEvent.pointerType != 'touch') {
					this.el.removeClass('is-hover').blur();
				}
			}).bind(this)
		}).append(this.elCarry = $('<div class="equipment-layer equipment-add"/>').on('click', (function () {
			this.selectEquipmentStart();
		}).bind(this))).append($('<div class="equipment-layer equipment-infos"/>').append(this.elName = $('<span class="equipment-name"/>')).append(this.elStar = $('<span class="equipment-star"/>').html(0)).append(this.elRank = $('<span class="equipment-rank"/>')).append((function () {
			var el = $('<span class="equipment-carry"/>').html(0);
			this.elCarry = this.elCarry.add(el);
			return el;
		}).bind(this))).append($('<div class="equipment-layer equipment-options"/>').append(this.elInputStar = $('<input/>', {
			'class': 'equipment-starinput',
			'type': 'number',
			'placeholder': 0
		}).on({
			'input': (function () {
				var value = this.elInputStar.val();

				if ((typeof value == 'undefined' || value === '') && this.star) this.star = null;

				value = parseInt(value);
				if (!isNaN(value) && this.star != value) this.star = value;
			}).bind(this),
			'focus': (function () {
				this.el.addClass('is-hover');
				console.log('focus');
			}).bind(this),
			'blur': (function () {
				setTimeout((function () {
					if (!this.el.is(':focus')) this.el.removeClass('is-hover');
				}).bind(this), 10);
			}).bind(this)
		})).append(this.elSelectRank = $('<div/>', {
			'class': 'equipment-rankselect',
			'html': '<span>无</span>'
		}).on('click', (function () {
			if (!InfosFleet.menuRankSelect) {
				InfosFleet.menuRankSelectItems = $('<div/>');

				var _loop2 = function _loop2(_i15) {
					$('<button class="rank-' + _i15 + '"/>').html(!_i15 ? '无' : '').on('click', function () {
						InfosFleet.menuRankSelectCur.rank = _i15;
					}).appendTo(InfosFleet.menuRankSelectItems);
				};

				for (var _i15 = 0; _i15 < 8; _i15++) {
					_loop2(_i15);
				}
				InfosFleet.menuRankSelect = new _menu({
					'className': 'contextmenu-infos_fleet_rank_select',
					'items': [InfosFleet.menuRankSelectItems]
				});
			}
			InfosFleet.menuRankSelectCur = this;
			InfosFleet.menuRankSelect.show(this.elSelectRank);
		}).bind(this))).append(this.elButtonInspect = $('<span class="button inspect" icon="search"/>').on('click', (function () {
			if (this.id) _frame.infos.show('[[EQUIPMENT::' + this.id + ']]');
		}).bind(this))).append($('<span class="button change" icon="loop"/>').on('click', (function () {
			this.selectEquipmentStart();
		}).bind(this))).append($('<span class="button remove"/>').html('×').on('click', (function () {
			this.id = null;
		}).bind(this))));
	}

	_createClass(InfosFleetShipEquipment, [{
		key: 'getEl',
		value: function getEl() {
			return this.el;
		}
	}, {
		key: 'selectEquipmentStart',
		value: function selectEquipmentStart() {
			_g.log('开始选择装备');

			_frame.app_main.load_page('equipments', {
				callback_modeSelection_select: (function (id) {
					history.back();
					this.id = id;
					this.star = 0;
					this.rank = Lockr.get('fleetlist-option-aircraftdefaultmax') && id && _g.data.items[id].rankupgradable && $.inArray(_g.data.items[id].type, Formula.equipmentType.Aircrafts) > -1 ? 7 : 0;
					TablelistEquipments.types = [];
					TablelistEquipments.shipId = null;
					if (this.infosFleetShip.infosFleet) _frame.infos.dom.main.attr('data-theme', this.infosFleetShip.infosFleet.data['theme']);
				}).bind(this),
				callback_modeSelection_enter: (function () {
					TablelistEquipments.types = _g.data.ships[this.infosFleetShip.shipId].getEquipmentTypes();
					TablelistEquipments.shipId = this.infosFleetShip.shipId;
					_frame.app_main.page['equipments'].object.tablelistObj.apply_types();
				}).bind(this)
			});
		}
	}, {
		key: 'getData',
		value: function getData() {
			return this.data;
		}
	}, {
		key: 'save',
		value: function save() {
			if (this._updating) return !1;
			if (this.infosFleetShip) {
				this.infosFleetShip.save();
			}
		}
	}, {
		key: 'id',
		get: function get() {
			return this.infosFleetShip.data[2][this.index];
		},
		set: function set(value) {
			value = parseInt(value) || null;

			_p.tip.hide();
			this.el.removeData(['tip', 'tip-filtered']);

			if (value != this.infosFleetShip.data[2][this.index]) this.star = 0;

			if (value && !isNaN(value)) {
				this.infosFleetShip.data[2][this.index] = value;
				this.improvable = _g.data.items[value].improvable || !1;
				this.el.attr({
					'data-equipmentid': value,
					'data-tip': '[[EQUIPMENT::' + value + ']]'
				}).css('background-image', 'url(' + _g.data.items[value]._icon + ')');
				this.elName.html(_g.data.items[value]._name);

				if ($.inArray(_g.data.items[value].type, Formula.equipmentType.Aircrafts) > -1) {
					this.el.addClass('is-aircraft');
					if (_g.data.items[value].rankupgradable) this.el.addClass('is-rankupgradable');
				} else this.el.removeClass('is-aircraft');
			} else {
				this.infosFleetShip.data[2][this.index] = null;
				this.improvable = !1;
				this.el.removeAttr('data-equipmentId').removeAttr('data-tip').removeAttr('data-star').removeAttr('data-rank').css('background-image', '').removeClass('is-aircraft is-rankupgradable');
				this.elName.html('');
			}

			this.infosFleetShip.infosFleetSubFleet.summaryCalc();
			this.save();
		}
	}, {
		key: 'star',
		get: function get() {
			return this.infosFleetShip.data[3][this.index];
		},
		set: function set(value) {
			if (this._improvable) {
				value = parseInt(value) || null;

				if (value > 10) value = 10;

				if (value < 0) value = 0;

				if (value) {
					this.infosFleetShip.data[3][this.index] = value;
					this.elInputStar.val(value);
					this.elStar.html(value);
					this.el.attr('data-star', value);
				} else {
					this.infosFleetShip.data[3][this.index] = null;
					this.elInputStar.val('');
					this.elStar.html(0);
					this.el.attr('data-star', '');
				}
			} else {
				this.infosFleetShip.data[3][this.index] = null;
				this.el.removeAttr('data-star');
			}
			this.infosFleetShip.infosFleetSubFleet.summaryCalc();
			this.save();
		}
	}, {
		key: 'rank',
		get: function get() {
			return this.infosFleetShip.data[4][this.index];
		},
		set: function set(value) {
			if (this.id && $.inArray(_g.data.items[this.id].type, Formula.equipmentType.Aircrafts) > -1) {
				value = parseInt(value) || null;

				if (value > 7) value = 7;

				if (value < 0) value = 0;

				if (value) {
					this.infosFleetShip.data[4][this.index] = value;
					this.el.attr('data-rank', value);
				} else {
					this.infosFleetShip.data[4][this.index] = null;
					this.el.attr('data-rank', '');
				}
			} else {
				this.infosFleetShip.data[4][this.index] = null;
				this.el.removeAttr('data-rank');
			}
			this.infosFleetShip.infosFleetSubFleet.summaryCalc();
			this.save();
		}
	}, {
		key: 'carry',
		set: function set(value) {
			if (typeof value == 'undefined') {
				this.el.removeAttr('data-carry');
				this.elCarry.html(0);
			} else {
				value = parseInt(value) || 0;
				this.el.attr('data-carry', value);
				this.elCarry.html(value);
			}
		}
	}, {
		key: 'improvable',
		set: function set(value) {
			if (!value) {
				this.el.removeAttr('data-star');
				this.elInputStar.prop('disabled', !0).attr('placeholder', '--');
				this._improvable = !1;
			} else {
				this.el.attr('data-star', '');
				this.elInputStar.prop('disabled', !1).attr('placeholder', '0');
				this._improvable = !0;
			}
		}
	}]);

	return InfosFleetShipEquipment;
})();

_frame.app_main.is_mode_selection = function () {
	return $html.hasClass('mode-selection') || _frame.dom.layout.hasClass('mode-selection');
};

_frame.app_main.mode_selection_callback = null;

_frame.app_main.mode_selection_on = function (callback) {
	if (!_frame.dom.navSelectionInfo) {
		_frame.dom.navSelectionInfo = $('<div class="selection-info"/>').html('请选择……').appendTo(_frame.dom.nav);
	}
	callback = callback || function () {};
	callback();
	_frame.dom.layout.addClass('mode-selection');
};

_frame.app_main.mode_selection_off = function () {
	if (this.cur_page) this.page_dom[this.cur_page].trigger('modeSelectionExit');
	_frame.dom.layout.removeClass('mode-selection');
};

if (typeof _p.tip != 'undefined') {

	_p.tip.filters.push(function (cont) {
		var exp = /^\[\[EQUIPMENT\:\:([0-9]+)\]\]$/.exec(cont);
		if (exp && exp.length > 1) return _p.tip.content_equipment(_g.data.items[parseInt(exp[1])]);
	});

	_p.tip.content_equipment = function (d) {

		function _stat(stat, title) {
			if (d['stat'][stat]) {
				switch (stat) {
					case 'range':
						return '<span>射程: ' + _g.getStatRange(d['stat'][stat]) + '</span>';
						break;
					default:
						var val = parseInt(d['stat'][stat]);
						return '<span>' + (val > 0 ? '+' : '') + val + ' ' + title + '</span>';
						break;
				}
			} else {
				return '';
			}
		}

		var item_icon = '/!/assets/images/itemicon/' + d.getIconId() + '.png',
		    item_name = d.getName(),
		    html = '<h3 class="itemstat">' + '<s style="background-image: url(' + item_icon + ')"></s>' + '<strong data-content="' + item_name + '">' + item_name + '</strong>' + '<small>' + _g.data.item_types[d['type']]['name']['zh_cn'] + '</small>' + '</h3>' + _stat('fire', '火力') + _stat('torpedo', '雷装') + _stat('aa', '对空') + _stat('asw', '对潜') + _stat('bomb', '爆装') + _stat('hit', '命中') + _stat('armor', '装甲') + _stat('evasion', '回避') + _stat('los', '索敌') + _stat('range', '射程');

		return html;
	};
}

if (typeof _p.tip != 'undefined') {

	_p.tip.filters.push(function (cont) {
		var exp = /^\[\[SHIP\:\:([0-9]+)\]\]$/.exec(cont);
		if (exp && exp.length > 1) return _p.tip.content_ship(_g.data.ships[parseInt(exp[1])]);
	});

	_p.tip.content_ship = function (d) {
		var ship_name = d.getName(_g.joint),
		    html = '<h3 class="shipinfo">' + '<img src="' + _g.path.pics.ships + '/' + d['id'] + '/0.png" width="160" height="40"/>' + '<strong data-content="' + ship_name + '">' + ship_name + '</strong>' + (d['type'] ? '<small>' + _g['data']['ship_types'][d['type']]['full_zh'] + '</span>' : '') + '</h3>';

		return html;
	};
}

_p.el.tablelist = {
	init_el: function init_el(el) {
		if (el.data('tablelist')) return !0;

		if (el.hasClass('ships')) el.data({
			'tablelist': new TablelistShips(el)
		});else if (el.hasClass('tablelist-equipments')) el.data({
			'tablelist': new TablelistEquipments(el)
		});else if (el.hasClass('fleets')) el.data({
			'tablelist': new TablelistFleets(el)
		});else if (el.hasClass('entities')) el.data({
			'tablelist': new TablelistEntities(el)
		});
	},

	init: function init(tar, els) {
		tar = tar || $body;
		els = els || tar.find('.tablelist');

		els.each(function () {
			_p.el.tablelist.init_el($(this));
		});
	}
};

var Tablelist = (function () {
	function Tablelist(container, options) {
		_classCallCheck(this, Tablelist);

		this.dom = {
			'container': container
		};

		options = options || {};

		this._index = Tablelist.index++;
		this.trIndex = 0;
		this.flexgrid_empty_count = options.flexgrid_empty_count || 8;
		this.sort_data_by_stat = options.sort_data_by_stat || {};
		this.sort_default_order_by_stat = options.sort_default_order_by_stat || {};
	}

	_createClass(Tablelist, [{
		key: 'append_option',
		value: function append_option(type, name, label, value, suffix, options) {
			options = options || {};
			function gen_input() {
				var input = undefined,
				    option_empty = undefined,
				    o_el = undefined,
				    id = Tablelist.genId();

				switch (type) {
					case 'text':
					case 'number':
					case 'hidden':
						input = $('<input type="' + type + '" name="' + name + '" id="' + id + '" />').val(value);
						break;
					case 'select':
						input = $('<select name="' + name + '" id="' + id + '" />');
						option_empty = $('<option value=""/>').html('').appendTo(input);
						value.forEach(function (currentValue, i) {
							if ((typeof currentValue === 'undefined' ? 'undefined' : _typeof(currentValue)) == 'object') {
								o_el = $('<option value="' + (typeof currentValue.val == 'undefined' ? currentValue['value'] : currentValue.val) + '"/>').html(currentValue['title'] || currentValue['name']).appendTo(input);
							} else {
								o_el = $('<option value="' + currentValue + '"/>').html(currentValue).appendTo(input);
							}
							if (typeof options['default'] != 'undefined' && o_el.val() == options['default']) {
								o_el.prop('selected', !0);
							}
						});
						if (!value || !value.length) {
							option_empty.remove();
							$('<option value=""/>').html('...').appendTo(input);
						}
						if (options['new']) {
							$('<option value=""/>').html('==========').insertAfter(option_empty);
							$('<option value="___new___"/>').html('+ 新建').insertAfter(option_empty);
							input.on('change.___new___', function () {
								var select = $(this);
								if (select.val() == '___new___') {
									select.val('');
									options['new'](input);
								}
							});
						}
						break;
					case 'checkbox':
						input = $('<input type="' + type + '" name="' + name + '" id="' + id + '" />').prop('checked', value);
						break;
					case 'radio':
						input = $();
						value.forEach(function (currentValue, i) {
							var title,
							    val,
							    checked = !1;
							if (value[i].push) {
								val = value[i][0];
								title = value[i][1];
							} else {
								val = value[i].val || value[i].value;
								title = value[i].title || value[i].name;
							}
							if (options.radio_default && options.radio_default == val) checked = !0;
							input = input.add($('<input type="radio" name="' + name + '" id="' + id + '-' + val + '" ischecked="' + checked + '" />').val(val).prop('checked', checked || !checked && i == 0));
							input = input.add($('<label for="' + id + '-' + val + '"/>').html(title));
						});
						break;
				}

				if (options.required) {
					input.prop('required', !0);
				}

				if (options.onchange) {
					input.on('change.___onchange___', function (e) {
						options.onchange(e, $(this));
					});
					if (options['default']) input.trigger('change');
				}

				if (!name) input.attr('name', null);

				return input;
			}

			var line = $('<p/>').addClass(name).appendTo(this.dom.filters),
			    input = gen_input().appendTo(line),
			    id = input.attr('id') || Tablelist.genId();

			label = label ? $('<label' + (type == 'checkbox' ? ' class="checkbox"' : '') + ' for="' + id + '"/>').html(label).appendTo(line) : null;
			if (type == 'checkbox' && label) label.insertAfter(input);

			if (suffix) $('<label for="' + id + '"/>').html(suffix).appendTo(line);

			return line;
		}
	}, {
		key: 'thead_redraw',
		value: function thead_redraw(timeout_duration) {
			if (this.dom.thead && this.dom.thead.length) {
				var thead = this.dom.thead;
				setTimeout(function () {
					thead.hide().show(0);
				}, timeout_duration || 10);
			}
		}
	}, {
		key: 'sort_column',
		value: function sort_column(nth, is_ascending, rows) {
			if (!rows) {
				var tbody = this.dom.tbody;
				if (!tbody || !tbody.length) tbody = this.dom.table.find('tbody');

				rows = tbody.find('tr.row:visible:not([data-donotcompare])');
			}
			nth = nth || 1;

			this._tmp_values = [];
			this._tmp_value_map_cell = {};

			rows.find('td:nth-of-type(' + nth + ')').each((function (index, element) {
				var cell = $(element),
				    val = cell.attr('data-value');

				val = parseFloat(val);

				if ($.inArray(val, this._tmp_values) < 0) this._tmp_values.push(val);

				if (!this._tmp_value_map_cell[val]) this._tmp_value_map_cell[val] = $();

				this._tmp_value_map_cell[val] = this._tmp_value_map_cell[val].add(cell);
			}).bind(this));

			this._tmp_values.sort(function (a, b) {
				if (is_ascending) return a - b;else return b - a;
			});

			var return_array = [];
			this._tmp_values.forEach(function (currentValue) {
				return_array.push(this._tmp_value_map_cell[currentValue]);
			}, this);

			delete this._tmp_values;
			delete this._tmp_value_map_cell;

			return return_array;
		}
	}, {
		key: 'mark_high',
		value: function mark_high(cacheSortData) {
			var tbody = this.dom.tbody;

			if (!tbody || !tbody.length) tbody = this.dom.table.find('tbody');

			var rows = tbody.find('tr.row:visible:not([data-donotcompare])');

			rows.find('td[data-value]').removeClass('sort-first sort-second');

			rows.eq(0).find('td[data-value]').each((function (index, element) {
				var is_ascending = !1,
				    $this = $(element),
				    stat = $this.data('stat'),
				    noMark = stat.match(/\b(speed|range|extra_illust)\b/);

				if (typeof this.sort_default_order_by_stat[stat] == 'undefined') {
					if (stat.match(/\b(consum_fuel|consum_ammo)\b/)) is_ascending = !0;
					this.sort_default_order_by_stat[stat] = is_ascending ? 'asc' : 'desc';
				} else {
					is_ascending = this.sort_default_order_by_stat[stat] == 'asc' ? !0 : !1;
				}

				var sort = this.sort_column(index + 1, is_ascending, rows),
				    max = Math.min(6, Math.ceil(rows.length / 2) + 1);

				if (!noMark && sort.length > 1 && sort[0].length < max) {
					sort[0].addClass('sort-first');
					if (sort.length > 2 && sort[1].length < max) sort[1].addClass('sort-second');
				}

				if (cacheSortData) this.sort_data_by_stat[stat] = sort;else delete this.sort_data_by_stat[stat];
			}).bind(this));

			return rows;
		}
	}, {
		key: 'sort_table_from_theadcell',
		value: function sort_table_from_theadcell(cell) {
			if (!cell) return;

			var stat = cell.data('stat'),
			    sortData = this.sort_data_by_stat[stat];

			console.log(stat, sortData);

			if (!stat || !sortData) return !1;

			if (stat != this.lastSortedStat) {
				if (this.lastSortedHeader) this.lastSortedHeader.removeClass('sorting desc asc');
				cell.addClass('sorting');
			}

			var order = stat == this.lastSortedStat && this.lastSortedOrder == 'obverse' ? 'reverse' : 'obverse',
			    i = order == 'reverse' ? sortData.length - 1 : 0;

			if (this.sort_default_order_by_stat[stat]) {
				var reverse = this.sort_default_order_by_stat[stat] == 'asc' ? 'desc' : 'asc';
				if (order == 'obverse') {
					cell.removeClass(reverse).addClass(this.sort_default_order_by_stat[stat]);
				} else {
					cell.removeClass(this.sort_default_order_by_stat[stat]).addClass(reverse);
				}
			}

			this.sortedRow = $();

			while (sortData[i]) {
				this._tmpDOM = sortData[i].parent();
				this.sortedRow = this.sortedRow.add(this._tmpDOM);
				this._tmpDOM.appendTo(this.dom.tbody);
				i = order == 'reverse' ? i - 1 : i + 1;
			}

			this.dom.btn_compare_sort.removeClass('disabled').html('取消排序');

			this.lastSortedStat = stat;
			this.lastSortedOrder = order;
			this.lastSortedHeader = cell;
			delete this._tmpDOM;
		}
	}, {
		key: 'sort_table_restore',
		value: function sort_table_restore() {
			if (!this.sortedRow) return !0;

			var parent = undefined,
			    arr = [];
			this.sortedRow.each(function (index, element) {
				var $this = $(element),
				    trIndex = parseInt($this.data('trindex'));
				parent = parent || $this.parent();
				arr.push({
					'index': trIndex,
					'el': $this,
					'prev': parent.children('tr[data-trindex="' + (trIndex - 1) + '"]')
				});
			});

			arr.sort(function (a, b) {
				return a['index'] - b['index'];
			});
			arr.forEach(function (currentValue) {
				currentValue.el.insertAfter(currentValue.prev);
			});

			this.dom.btn_compare_sort.addClass('disabled').html('点击表格标题可排序');

			this.lastSortedHeader.removeClass('sorting desc asc');

			delete this.sortedRow;
			delete this.lastSortedStat;
			delete this.lastSortedOrder;
			delete this.lastSortedHeader;
			return !0;
		}
	}]);

	return Tablelist;
})();

Tablelist.index = 0;
Tablelist.genId = function (text) {
	var hash = 0,
	    i,
	    chr,
	    len;
	text = text || new Date().toISOString() + _g.randInt(10000);
	if (text.length == 0) return hash;
	for (i = 0, len = text.length; i < len; i++) {
		chr = text.charCodeAt(i);
		hash = (hash << 5) - hash + chr;
		hash |= 0;
	}
	return 'tablelist' + hash;
};

var TablelistEntities = (function (_Tablelist) {
	_inherits(TablelistEntities, _Tablelist);

	function TablelistEntities(container, options) {
		_classCallCheck(this, TablelistEntities);

		var _this9 = _possibleConstructorReturn(this, Object.getPrototypeOf(TablelistEntities).call(this, container, options));

		_frame.app_main.loading.push('tablelist_' + _this9._index);
		_frame.app_main.is_loaded = !1;

		if (container.children('.tablelist-list').length) {
			_this9.init_parse();
		} else if (_this9.init_new) {
			_this9.init_new(options);
		}
		return _this9;
	}

	_createClass(TablelistEntities, [{
		key: 'init_parse',
		value: function init_parse() {
			this.generated = !0;
			_frame.app_main.loaded('tablelist_' + this._index, !0);
		}
	}]);

	return TablelistEntities;
})(Tablelist);

var TablelistEquipments = (function (_Tablelist2) {
	_inherits(TablelistEquipments, _Tablelist2);

	function TablelistEquipments(container, options) {
		_classCallCheck(this, TablelistEquipments);

		var _this10 = _possibleConstructorReturn(this, Object.getPrototypeOf(TablelistEquipments).call(this, container, options));

		_this10.columns = ['  ', ['火力', 'fire'], ['雷装', 'torpedo'], ['对空', 'aa'], ['对潜', 'asw'], ['爆装', 'bomb'], ['命中', 'hit'], ['装甲', 'armor'], ['回避', 'evasion'], ['索敌', 'los'], ['射程', 'range'], ['可改修', 'improvable']];

		_frame.app_main.loading.push('tablelist_' + _this10._index);
		_frame.app_main.is_loaded = !1;

		if (container.children('.fixed-table-container').length) {
			_this10.init_parse();
		} else if (_this10.init_new) {
			_this10.init_new();
		}
		return _this10;
	}

	_createClass(TablelistEquipments, [{
		key: 'apply_types',
		value: function apply_types() {
			console.log('types: ' + TablelistEquipments.types);
			this.dom.filter_types.removeAttr('class');

			if (TablelistEquipments.types.length) {
				this.dom.filter_types.addClass('type' + TablelistEquipments.types.join(' type'));
				if (this.generated) this.apply_types_check();
			}
		}
	}, {
		key: 'apply_types_check',
		value: function apply_types_check() {
			if (TablelistEquipments.shipIdLast && TablelistEquipments.shipIdLast == TablelistEquipments.shipId) return;

			TablelistEquipments.shipIdLast = TablelistEquipments.shipId;

			if (TablelistEquipments.shipId && $.inArray(_g.data.ships[TablelistEquipments.shipId].type, [9, 10, 11]) > -1) {
				var k = 0,
				    _el = undefined;

				while (this.dom.types[k++].attr('data-equipmentcollection') != 3 || $.inArray(parseInt(this.dom.types[k].attr('data-type')) || null, TablelistEquipments.types) <= -1) {
					_el = this.dom.types[k + 1];
				}

				_el = _el || this.dom.types[0];

				this.dom.type_radios[3].prop('checked', !0).trigger('change');
				this.dom.table_container_inner.scrollTop(_el[0].offsetTop || 0);
				return;
			}

			if (TablelistEquipments.types.length) {
				var k = 0,
				    _el2 = undefined;

				while ($.inArray(parseInt(this.dom.types[k++].attr('data-type')) || null, TablelistEquipments.types) <= -1) {
					_el2 = this.dom.types[k];
				}

				_el2 = _el2 || this.dom.types[0];

				this.dom.type_radios[parseInt(_el2.attr('data-equipmentcollection')) || 1].prop('checked', !0).trigger('change');
				this.dom.table_container_inner.scrollTop(_el2[0].offsetTop || 0);
			}
		}
	}, {
		key: 'init_parse',
		value: function init_parse() {
			this.dom.filter_container = this.dom.container.children('.options');
			this.dom.filters = this.dom.filter_container.children('.filters');

			this.dom.type_radios = {};
			this.dom.container.children('input[type="radio"][name="equipmentcollection"]').each((function (i, radio) {
				radio = $(radio);
				var val = parseInt(radio.val());
				this.dom.type_radios[val] = radio.prop('checked', val == 1).on('change', (function () {
					this.dom.table_container_inner.scrollTop(0);
					this.thead_redraw();
				}).bind(this));
			}).bind(this));

			this.dom.filter_types = this.dom.container.children('input[name="types"][type="hidden"]');

			this.dom.table_container = this.dom.container.children('.fixed-table-container');
			this.dom.table_container_inner = this.dom.table_container.children('.fixed-table-container-inner');
			this.dom.table = this.dom.table_container_inner.children('.equipments.hashover.hashover-column');
			this.dom.thead = this.dom.table.children('thead');
			this.dom.tbody = this.dom.table.children('tbody');

			this.parse_all_items();

			this.dom.msg_container = this.dom.container.children('.msgs');
			if (!_config.get('hide-equipmentsinfos')) this.dom.msg_container.attr('data-msgs', 'equipmentsinfos');else this.dom.msg_container.removeAttr('data-msgs');

			var equipmentsinfos = this.dom.msg_container.children('.equipmentsinfos');
			equipmentsinfos.children('button').on('click', (function () {
				this.dom.msg_container.removeAttr('data-msgs');
				_config.set('hide-equipmentsinfos', !0);
			}).bind(this));
		}
	}, {
		key: 'parse_all_items',
		value: function parse_all_items() {
			this.generated = !1;
			this.dom.types = [];

			var header_index = -1;

			this.dom.tbody.children('tr.typetitle,tr.row').each((function (index, tr) {
				tr = $(tr);
				if (tr.hasClass('typetitle')) {
					header_index++;
					this.dom.types[header_index] = tr;
				} else {
					(function () {
						var etype = parseInt(tr.attr('data-equipmenttype')) || -1,
						    eid = tr.attr('data-equipmentid');
						tr.on('click', function (e, forceInfos) {
							if (!forceInfos && _frame.app_main.is_mode_selection()) {
								e.preventDefault();
								e.stopImmediatePropagation();
								e.stopPropagation();

								if ($.inArray(etype, TablelistEquipments.types) > -1) _frame.app_main.mode_selection_callback(eid);
							}
						});
					})();
				}
			}).bind(this));

			this.thead_redraw();
			this.generated = !0;
			this.apply_types_check();
			_frame.app_main.loaded('tablelist_' + this._index, !0);
		}
	}]);

	return TablelistEquipments;
})(Tablelist);

TablelistEquipments.gen_helper_equipable_on = function (type_id) {
	var equipable_on = '';
	_g.data.item_types[type_id]['equipable_on_type'].forEach(function (currentValue, i) {
		var item_type_id = _g.data.item_types[type_id]['equipable_on_type'][i];
		equipable_on += '<span>' + _g['data']['ship_types'][item_type_id]['full_zh'] + (i < _g.data.item_types[type_id]['equipable_on_type'].length - 1 ? ',&nbsp;' : '') + '</span>';
	});
	return '<em class="helper" data-tip="<h4 class=item_equipable_on>可装备于</h4>' + equipable_on + '">?</em>';
};

TablelistEquipments.types = [];
TablelistEquipments.shipId = null;
TablelistEquipments.shipIdLast = null;

var TablelistFleets = (function (_Tablelist3) {
	_inherits(TablelistFleets, _Tablelist3);

	function TablelistFleets(container, options) {
		_classCallCheck(this, TablelistFleets);

		var _this11 = _possibleConstructorReturn(this, Object.getPrototypeOf(TablelistFleets).call(this, container, options));

		_this11.columns = ['  ', ['创建者', 'user'], ['修改时间', 'time_modify'], ['评价', 'rating'], ['', 'options']];

		_this11.kancolle_calc = {
			'_ApplicationId': 'l1aps8iaIfcq2ZzhOHJWNUU2XrNySIzRahodijXW',
			'_ClientVersion': 'js1.2.19',
			'_InstallationId': '62522018-ec82-b434-f5a5-08c3ab61d932',
			'_JavaScriptKey': 'xOrFpWEQZFxUDK2fN1DwbKoj3zTKAEkgJHzwTuZ4'
		};

		_frame.app_main.loading.push('tablelist_' + _this11._index);
		_frame.app_main.is_loaded = !1;

		_this11.dom.filter_container = $('<div class="options" viewtype="card"/>').appendTo(_this11.dom.container);
		_this11.dom.filters = $('<div class="filters"/>').appendTo(_this11.dom.filter_container);

		_this11.dom.btn_new = $('<button class="new" icon="import"/>').html('新建/导入').on('click', (function (e, target) {
			this.btn_new(target);
		}).bind(_this11)).appendTo(_this11.dom.filters);
		if (TablelistFleets.support.buildfile) {
			_this11.dom.btn_exportFile = $('<button class="export" icon="floppy-disk"/>').html('导出配置文件').on('click', function () {
				_db.fleets.persistence.compactDatafile();
				if (_g.isClient) {
					_g.file_save_as(_db.fleets.filename, 'fleets.json');
				} else {
					(function () {
						if (!TablelistFleets.btn_exportFile_link) {
							TablelistFleets.btn_exportFile_link = document.createElement('a');
							TablelistFleets.btn_exportFile_link.download = 'fleets.json';
						}
						_frame.app_main.loading_start('tablelist_fleets_export', !1);
						var data = '';
						_db.fleets.find({}, function (err, docs) {
							if (err) {
								_g.error(err);
							} else {
								docs.forEach(function (doc) {
									data += JSON.stringify(doc) + '\n';
								});
								var blob = new Blob([data], { type: "application/json" });
								TablelistFleets.btn_exportFile_link.href = URL.createObjectURL(blob);
								TablelistFleets.btn_exportFile_link.click();
								_frame.app_main.loading_complete('tablelist_fleets_export');
							}
						});
					})();
				}
			}).appendTo(_this11.dom.filters);
		}

		_this11.dom.buttons_right = $('<div class="buttons_right"/>').appendTo(_this11.dom.filters);
		_this11.dom.setting_hqlv = $('<label/>', {
			'class': 'setting setting-hqlv',
			'html': '默认司令部等级',
			'data-tip': '如果舰队配置没有设置司令部等级，<br/>则会使用该默认数值<br/>司令部等级会影响索敌能力的计算'
		}).on({
			'mouseenter mouseleave': (function (e) {
				if (_p.tip.is_showing && !_p.tip.timeout_fade && this.dom.setting_hqlv_input.is(':focus')) {
					e.stopImmediatePropagation();
					e.stopPropagation();
				}
			}).bind(_this11)
		}).append(_this11.dom.setting_hqlv_input = $('<input/>', {
			'type': 'number',
			'min': 0,
			'max': 150
		}).val(Lockr.get('hqLvDefault', _g.defaultHqLv)).on({
			'input': (function () {
				_g.updateDefaultHqLv(this.dom.setting_hqlv_input.val());
			}).bind(_this11),
			'focus.tipshow': (function () {
				this.dom.setting_hqlv_input.trigger('tipshow');
			}).bind(_this11),
			'blur.tiphide': (function () {
				this.dom.setting_hqlv_input.trigger('tiphide');
			}).bind(_this11),
			'click': function click(e) {
				e.stopImmediatePropagation();
				e.stopPropagation();
			}
		})).appendTo(_this11.dom.buttons_right);
		$body.on('update_defaultHqLv.update_fleets_hqlv_input', (function (e, val) {
			this.dom.setting_hqlv_input.val(val);
		}).bind(_this11));
		_this11.dom.btn_settings = $('<button icon="cog"/>').on('click', (function () {
			this.btn_settings();
		}).bind(_this11)).appendTo(_this11.dom.buttons_right);

		_this11.dom.table_container = $('<div class="fixed-table-container"/>').appendTo(_this11.dom.container);
		_this11.dom.table_container_inner = $('<div class="fixed-table-container-inner"/>').appendTo(_this11.dom.table_container);
		_this11.dom.table = $('<table class="fleets hashover hashover-column"/>').appendTo(_this11.dom.table_container_inner);
		function gen_thead(arr) {
			this.dom.thead = $('<thead/>');
			var tr = $('<tr/>').appendTo(this.dom.thead);
			arr.forEach(function (column) {
				if ((typeof column === 'undefined' ? 'undefined' : _typeof(column)) == 'object') {
					$('<td data-stat="' + column[1] + '"/>').html('<div class="th-inner-wrapper"><span><span>' + column[0] + '</span></span></div>').appendTo(tr);
				} else {
					$('<th/>').html('<div class="th-inner-wrapper"><span><span>' + column[0] + '</span></span></div>').appendTo(tr);
				}
			});
			return this.dom.thead;
		}
		gen_thead = gen_thead.bind(_this11);
		gen_thead(_this11.columns).appendTo(_this11.dom.table);
		_this11.dom.tbody = $('<tbody/>').appendTo(_this11.dom.table);

		$('<div class="nocontent container"/>').append($($('<div/>').append($('<span>').html('暂无舰队配置')).append($('<button>').html('新建/导入').on('click', (function (e) {
			this.dom.btn_new.trigger('click', [e]);
		}).bind(_this11))))).appendTo(_this11.dom.table_container_inner);

		_this11.dom.table.on('contextmenu.contextmenu_fleet', 'tr[data-fleetid]', (function (e) {
			this.contextmenu_show($(e.currentTarget), null, e);
			e.preventDefault();
		}).bind(_this11)).on('click.contextmenu_fleet', 'tr[data-fleetid]>th>em', (function (e) {
			this.contextmenu_show($(e.currentTarget).parent().parent(), $(e.currentTarget));
			e.stopImmediatePropagation();
			e.stopPropagation();
		}).bind(_this11));

		_this11.dom.container.on('focus.number_input_select', 'input[type="number"]', function (e) {
			e.currentTarget.select();
		});

		_this11.genlist();
		return _this11;
	}

	_createClass(TablelistFleets, [{
		key: 'new_data',
		value: function new_data(obj) {
			return $.extend({
				'data': [],
				'time_create': new Date().valueOf(),
				'time_modify': new Date().valueOf(),
				'hq_lv': -1,
				'name': '',
				'note': '',
				'user': {},
				'rating': -1,
				'theme': _g.randNumber(10)
			}, obj || {});
		}
	}, {
		key: 'loaddata',
		value: function loaddata() {
			var deferred = Q.defer();

			_db.fleets.find({}).sort({ name: 1 }).exec(function (err, docs) {
				if (err) {
					deferred.resolve([]);
				} else {
					docs.forEach(function (doc) {
						doc.data = InfosFleet.decompress(doc['data']);
					});
					console.log(docs);
					deferred.resolve(docs);
				}
			});

			return deferred.promise;
		}
	}, {
		key: 'validdata',
		value: function validdata(arr) {
			var deferred = Q.defer(),
			    to_remove = [],
			    i = 0,
			    valid = function valid(fleetdata) {
				if (fleetdata['hq_lv'] > -1 || fleetdata['name'] || fleetdata['note'] || fleetdata['rating'] > -1) {
					return !0;
				}
				if (!fleetdata.data || !fleetdata.data.length || !fleetdata.data.push) return !1;
				var is_valid = !1;

				var _iteratorNormalCompletion = !0;

				var _didIteratorError = !1;

				var _iteratorError = undefined;

				try {
					for (var _iterator = fleetdata.data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
						var fleet = _step.value;

						if (fleet && fleet.length && fleet.push) {
							var _iteratorNormalCompletion2 = !0;

							var _didIteratorError2 = !1;

							var _iteratorError2 = undefined;

							try {
								for (var _iterator2 = fleet[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = !0) {
									var shipdata = _step2.value;

									if (typeof shipdata != 'undefined' && shipdata && shipdata.push && typeof shipdata[0] != 'undefined' && shipdata[0]) is_valid = !0;
								}
							} catch (err) {
								_didIteratorError2 = !0;
								_iteratorError2 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion2 && _iterator2.return) {
										_iterator2.return();
									}
								} finally {
									if (_didIteratorError2) {
										throw _iteratorError2;
									}
								}
							}
						}
					}
				} catch (err) {
					_didIteratorError = !0;
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

				return is_valid;
			};

			while (i < arr.length) {
				if (valid(arr[i])) {
					i++;
				} else {
					to_remove.push(arr[i]._id);
					arr.splice(i, 1);
				}
			}

			if (to_remove.length) {
				_db.fleets.remove({
					_id: { $in: to_remove }
				}, { multi: !0 }, function (err, numRemoved) {
					deferred.resolve(arr);
				});
			} else {
				deferred.resolve(arr);
			}

			return deferred.promise;
		}
	}, {
		key: 'datacheck',
		value: function datacheck(arr) {
			arr = arr || [];

			if (!arr.length) this.dom.container.addClass('nocontent');else this.dom.container.removeClass('nocontent');

			return arr;
		}
	}, {
		key: 'append_all_items',
		value: function append_all_items(arr) {
			var _this12 = this;

			arr = arr || [];
			arr.sort(function (a, b) {
				if (a['name'] < b['name']) return -1;
				if (a['name'] > b['name']) return 1;
				return 0;
			});

			this.trIndex = 0;

			if (typeof Lockr.get('fleetlist-option-groupbytheme') == 'undefined') Lockr.set('fleetlist-option-groupbytheme', !0);

			var deferred = Q.defer(),
			    k = 0;

			if (Lockr.get('fleetlist-option-groupbytheme')) {
				(function () {
					var sorted = {},
					    count = 0;
					arr.forEach(function (cur, i) {
						if (!sorted[cur.theme]) sorted[cur.theme] = [];
						sorted[cur.theme].push(i);
					});

					for (var _i16 in sorted) {
						k = 0;

						while (k < _this12.flexgrid_empty_count) {
							if (!k) _this12.flexgrid_ph = $('<tr class="empty" data-fleetid="-1" data-trindex="99999"/>').appendTo(_this12.dom.tbody);else $('<tr class="empty" data-fleetid="-1" data-trindex="99999"/>').appendTo(_this12.dom.tbody);
							k++;
						}

						sorted[_i16].forEach((function (index) {
							setTimeout((function (i) {
								this.append_item(arr[i]);
								count++;
								if (count >= arr.length - 1) deferred.resolve();
							}).bind(this)(index), 0);
						}).bind(_this12));

						$('<tr class="typetitle" data-trindex="' + ++_this12.trIndex + '">' + '<th colspan="' + (_this12.columns.length + 1) + '">' + '</th></tr>').appendTo(_this12.dom.tbody);
						_this12.trIndex++;
					}
				})();
			} else {
				while (k < this.flexgrid_empty_count) {
					if (!k) this.flexgrid_ph = $('<tr class="empty" data-fleetid="-1" data-trindex="99999"/>').appendTo(this.dom.tbody);else $('<tr class="empty" data-fleetid="-1" data-trindex="99999"/>').appendTo(this.dom.tbody);
					k++;
				}

				arr.forEach((function (currentValue, i) {
					setTimeout((function (i) {
						this.append_item(arr[i]);
						if (i >= arr.length - 1) deferred.resolve();
					}).bind(this)(i), 0);
				}).bind(this));
			}

			if (!arr.length) deferred.resolve();

			return deferred.promise;
		}
	}, {
		key: 'append_item',
		value: function append_item(data, index, isPrepend) {
			if (!data) return !1;

			if (typeof index == 'undefined') {
				index = this.trIndex;
				this.trIndex++;
			}

			var tr = $('<tr class="row"/>').attr({
				'data-trindex': index,
				'data-fleetid': data._id || 'PLACEHOLDER',

				'data-infos': '[[FLEET::' + data._id + ']]',
				'data-theme': data.theme
			}).data({
				'initdata': data
			});

			this.columns.forEach(function (column) {
				switch (column[1]) {
					case ' ':
						var html = '<i>',
						    ships = data['data'][0] || [],
						    j = 0;
						while (j < 6) {
							if (ships[j] && ships[j][0]) html += '<img src="' + _g.path.pics.ships + '/' + ships[j][0] + '/0' + (_huCss.csscheck_full('mask-image') ? '.png' : '-mask-2.png') + '" contextmenu="disabled"' + (_huCss.csscheck_full('mask-image') ? '' : ' class="nomask"') + '/>';else html += '<s' + (_huCss.csscheck_full('mask-image') ? '' : ' class="nomask"') + '/>';
							j++;
						}
						html += '</i>';
						$('<th/>').attr('data-value', data['name']).html(html + '<strong>' + data['name'] + '</strong>' + '<em></em>').appendTo(tr);
						break;
					default:
						var datavalue = data[column[1]];
						$('<td/>').attr('data-value', datavalue).html(datavalue).appendTo(tr);
						break;
				}
			});

			if (isPrepend) tr.prependTo(this.dom.tbody);else tr.insertBefore(this.flexgrid_ph);

			return tr;
		}
	}, {
		key: 'btn_new',
		value: function btn_new(target) {
			if (!this.menu_new) {
				this.menu_new = new _menu({
					'target': this.dom.btn_new,
					'items': [$('<div class="menu_fleets_new"/>').append($('<menuitem/>').html('新建配置').on('click', (function () {
						this.action_new();
					}).bind(this))).append($('<menuitem/>').html('导入配置代码').on('click', (function () {
						if (!TablelistFleets.modalImport) {
							TablelistFleets.modalImport = $('<div/>').append(TablelistFleets.modalImportTextarea = $('<textarea/>', {
								'placeholder': '输入配置代码...'
							})).append($('<p/>').html('* 配置代码兼容<a href="http://www.kancolle-calc.net/deckbuilder.html">艦載機厨デッキビルダー</a>')).append(TablelistFleets.modalImportBtn = $('<button class="button"/>').html('导入'));
						}
						TablelistFleets.modalImportTextarea.val('');
						TablelistFleets.modalImportBtn.off('click.import').on('click', (function () {
							var val = TablelistFleets.modalImportTextarea.val();

							if (val) {
								val = JSON.parse(val);
								if (!val.length || !val.push) val = _g.kancolle_calc.decode(val);
								this.action_new({
									'data': val
								});
								_frame.modal.hide();
								TablelistFleets.modalImportTextarea.val('');
							}
						}).bind(this));
						_frame.modal.show(TablelistFleets.modalImport, '导入配置代码', {
							'classname': 'infos_fleet infos_fleet_import',
							'detach': !0
						});
					}).bind(this))).append(TablelistFleets.support.buildfile ? $('<menuitem/>').html('导入配置文件').on('click', (function () {
						this.dbfile_selector.trigger('click');
					}).bind(this)) : null)]
				});
				this.dbfile_selector = $('<input type="file" class="none"/>').on('change', (function (e) {
					_frame.app_main.loading_start('tablelist_fleets_import', !1);
					this.dbfile_selector.prop('disabled', !0);

					var file = this.dbfile_selector.val(),
					    promise_chain = Q.fcall(function () {});

					promise_chain.then(function () {
						var deferred = Q.defer();
						if (_g.isNWjs) {
							node.fs.readFile(file, 'utf8', function (err, data) {
								if (err) deferred.reject('文件载入失败', new Error(err));else deferred.resolve(data);
							});
						} else {
							for (var _i17 = 0, f = undefined; f = e.target.files[_i17]; _i17++) {
								var reader = new FileReader();
								reader.onload = (function (theFile) {
									return function (r) {
										return deferred.resolve(r.target.result);
									};
								})(f);
								reader.readAsText(f);
							}
						}
						return deferred.promise;
					}).then((function (data) {
						this.dbfile_selector.val('');

						var array = [],
						    deferred = Q.defer();
						data.split('\n').forEach(function (line) {
							if (line) {
								try {
									array.push(JSON.parse(line));
								} catch (e) {
									deferred.reject('文件格式错误', e);
								}
								deferred.resolve(array);
							} else {
								deferred.reject('文件无内容');
							}
						});
						return deferred.promise;
					}).bind(this)).then(function (array) {
						var the_promises = [],
						    complete = 0;

						array.forEach(function (data) {
							var deferred = Q.defer();
							the_promises.push(deferred.promise);

							_db.fleets.insert(data, function (err) {
								complete++;
								if (err && err.errorType == "uniqueViolated") {
									_db.fleets.update({
										_id: data._id
									}, data, {}, function (err, numReplaced) {
										deferred.resolve();
										if (err) _g.log(err);else _g.log(numReplaced);
									});
								} else {
										deferred.resolve();
									}
							});
						});

						return Q.all(the_promises);
					}).then((function () {
						this.refresh();
						_g.badgeMsg('成功导入配置');
					}).bind(this)).catch(function (msg, err) {
						_g.log(msg);
						_g.error(err);
						_g.badgeError(msg);
					}).done((function () {
						_g.log('import complete');
						_frame.app_main.loading_complete('tablelist_fleets_import');
						this.dbfile_selector.prop('disabled', !1);
					}).bind(this));
				}).bind(this)).appendTo(this.dom.filters);
			}

			if (target && target.clientX) return this.menu_new.show(target.clientX, target.clientY);
			return this.menu_new.show(target);
		}
	}, {
		key: 'btn_settings',
		value: function btn_settings() {
			TablelistFleets.menuOptions_show(this.dom.btn_settings, this);
		}
	}, {
		key: 'action_new',
		value: function action_new(dataDefault) {
			dataDefault = dataDefault || {};

			console.log(dataDefault);

			_db.fleets.insert(this.new_data(dataDefault), (function (err, newDoc) {
				console.log(err, newDoc);
				if (err) {
					_g.error(err);
				} else {
					if (_frame.app_main.cur_page == 'fleets') {
						_frame.infos.show('[[FLEET::' + newDoc['_id'] + ']]');
						this.menu_new.hide();
					}
				}
			}).bind(this));
		}
	}, {
		key: 'parse_kancolle_calc_data',
		value: function parse_kancolle_calc_data(obj) {
			return this.new_data(obj);
		}
	}, {
		key: 'contextmenu_show',
		value: function contextmenu_show($tr, $em, is_rightclick) {
			if (!TablelistFleets.contextmenu) TablelistFleets.contextmenu = new _menu({
				'className': 'contextmenu-fleet',
				'items': [$('<menuitem/>').html('详情').on({
					'click': function click(e) {
						TablelistFleets.contextmenu.curel.trigger('click', [!0]);
					}
				}), $('<menuitem/>').html('导出配置代码').on({
					'click': function click(e) {
						InfosFleet.modalExport_show(TablelistFleets.contextmenu.curel.data('initdata'));
					}
				}), $('<menuitem/>').html('导出配置文本').on({
					'click': function click(e) {
						InfosFleet.modalExportText_show(TablelistFleets.contextmenu.curel.data('initdata'));
					}
				}), $('<menuitem/>').html('移除').on({
					'click': function click(e) {
						var id = TablelistFleets.contextmenu.curel.attr('data-fleetid');
						if (id) {
							InfosFleet.modalRemove_show(id, TablelistFleets.contextmenu.curobject);
						}
					}
				})]
			});

			TablelistFleets.contextmenu.curobject = this;
			TablelistFleets.contextmenu.curel = $tr;

			if (is_rightclick) TablelistFleets.contextmenu.show(is_rightclick.clientX, is_rightclick.clientY);else TablelistFleets.contextmenu.show($em || $tr);
		}
	}, {
		key: 'genlist',
		value: function genlist() {
			var promise_chain = Q.fcall(function () {}).then((function () {
				return this.loaddata();
			}).bind(this)).then((function (arr) {
				return this.validdata(arr);
			}).bind(this)).then((function (arr) {
				return this.datacheck(arr);
			}).bind(this)).then((function (arr) {
				return this.append_all_items(arr);
			}).bind(this)).then((function () {
				setTimeout((function () {
					_frame.app_main.loaded('tablelist_' + this._index, !0);
				}).bind(this), 100);
			}).bind(this)).catch(function (err) {
				_g.log(err);
			}).done(function () {
				_g.log('Fleets list DONE');
			});
		}
	}, {
		key: 'refresh',
		value: function refresh() {
			console.log('refresh');
			this.dom.tbody.empty();
			this.genlist();
		}
	}]);

	return TablelistFleets;
})(Tablelist);

TablelistFleets.menuOptions_show = function ($el, $el_tablelist) {
	if (!TablelistFleets.menuOptions) TablelistFleets.menuOptions = new _menu({
		'className': 'menu-tablelistfleets-options',
		'items': [$('<menuitem class="mod-checkbox donot_hide option-in-tablelist option-groupbytheme"/>').append($('<input/>', {
			'type': 'checkbox',
			'id': '_input_g' + _g.inputIndex
		}).prop('checked', Lockr.get('fleetlist-option-groupbytheme')).on('change', function (e) {
			Lockr.set('fleetlist-option-groupbytheme', e.target.checked);
			if (TablelistFleets.menuOptions.curTablelist) {
				TablelistFleets.menuOptions.curTablelist.dom.tbody.empty();
				TablelistFleets.menuOptions.curTablelist.genlist();
			}
		})).append($('<label/>', {
			'for': '_input_g' + _g.inputIndex++,
			'html': '按主题颜色进行分组'
		})), $('<menuitem class="mod-checkbox donot_hide option-aircraftdefaultmax"/>').append($('<input/>', {
			'type': 'checkbox',
			'id': '_input_g' + _g.inputIndex
		}).prop('checked', Lockr.get('fleetlist-option-aircraftdefaultmax')).on('change', function (e) {
			Lockr.set('fleetlist-option-aircraftdefaultmax', e.target.checked);
		})).append($('<label/>', {
			'for': '_input_g' + _g.inputIndex++,
			'html': '新增飞行器熟练度默认为'
		})), $('<hr class="option-in-infos"/>'), $('<menuitem/>', {
			'class': 'option-in-infos',
			'html': '移除配置'
		}).on('click', function () {
			if (InfosFleet.cur) InfosFleet.cur.remove();
		})]
	});

	TablelistFleets.menuOptions.curTablelist = $el_tablelist || null;

	if ($el_tablelist) TablelistFleets.menuOptions.dom.menu.addClass('is-tablelist');else TablelistFleets.menuOptions.dom.menu.removeClass('is-tablelist');
	TablelistFleets.menuOptions.show($el);
};

TablelistFleets.support = {};
TablelistFleets.support.buildfile = _g.isNWjs || window.File && window.FileReader && window.FileList && window.Blob && window.URL ? !0 : !1;

var TablelistShips = (function (_Tablelist4) {
	_inherits(TablelistShips, _Tablelist4);

	function TablelistShips(container, options) {
		_classCallCheck(this, TablelistShips);

		var _this13 = _possibleConstructorReturn(this, Object.getPrototypeOf(TablelistShips).call(this, container, options));

		_this13.columns = ['  ', ['火力', 'fire'], ['雷装', 'torpedo'], ['夜战', 'nightpower'], ['对空', 'aa'], ['对潜', 'asw'], ['耐久', 'hp'], ['装甲', 'armor'], ['回避', 'evasion'], ['搭载', 'carry'], ['航速', 'speed'], ['射程', 'range'], ['索敌', 'los'], ['运', 'luck'], ['油耗', 'consum_fuel'], ['弹耗', 'consum_ammo'], ['多立绘', 'extra_illust']];
		_this13.header_checkbox = [];
		_this13.checkbox = [];
		_this13.last_item = null;

		_frame.app_main.loading.push('tablelist_' + _this13._index);
		_frame.app_main.is_loaded = !1;

		if (container.children('.fixed-table-container').length) {
			_this13.init_parse();
		} else if (_this13.init_new) {
			_this13.init_new();
		}
		return _this13;
	}

	_createClass(TablelistShips, [{
		key: 'compare_btn_show',
		value: function compare_btn_show(is_checked) {
			if (!is_checked && this.dom.tbody.find('input[type="checkbox"].compare:checked').length || is_checked) {
				this.dom.msg_container.attr('data-msgs', 'comparestart');
			} else {
				this.dom.msg_container.removeAttr('data-msgs');
			}
		}
	}, {
		key: 'compare_start',
		value: function compare_start() {
			this.dom.msg_container.removeAttr('data-msgs');

			this.last_viewtype = this.dom.filter_container.attr('viewtype');
			_config.set('shiplist-viewtype', this.last_viewtype);
			this.last_scrollTop = this.dom.table_container_inner.scrollTop();

			this.dom.filter_container.attr('viewtype', 'compare');
			this.dom.table_container_inner.scrollTop(0);
			this.dom.table.addClass('sortable');

			this.mark_high(!0);
			this.thead_redraw(500);
		}
	}, {
		key: 'compare_off',
		value: function compare_off() {
			this.dom.filter_container.attr('viewtype', this.last_viewtype);
			this.sort_table_restore();
			this.mark_high();
			this.thead_redraw(500);
			this.dom.table_container_inner.scrollTop(this.last_scrollTop);
			this.dom.table.removeClass('sortable');
			delete this.last_viewtype;
			delete this.last_scrollTop;
		}
	}, {
		key: 'compare_end',
		value: function compare_end() {
			this.dom.tbody.find('input[type="checkbox"].compare:checked').prop('checked', !1).trigger('change');
			this.dom.msg_container.removeAttr('data-msgs');
			this.compare_off();
		}
	}, {
		key: 'compare_continue',
		value: function compare_continue() {
			this.dom.msg_container.attr('data-msgs', 'comparestart');
			this.compare_off();
		}
	}, {
		key: 'contextmenu_show',
		value: function contextmenu_show($el, shipId, is_rightclick) {
			if (this.dom.filter_container.attr('viewtype') == 'compare' || $el.attr('data-donotcompare') == 'true') return !1;

			if (!TablelistShips.contextmenu) TablelistShips.contextmenu = new _menu({
				'className': 'contextmenu-ship',
				'items': [$('<menuitem/>').html('选择').on({
					'click': function click(e) {
						if (_frame.app_main.is_mode_selection()) _frame.app_main.mode_selection_callback(TablelistShips.contextmenu._curid);
					},
					'show': function show() {
						if (_frame.app_main.is_mode_selection()) $(this).show();else $(this).hide();
					}
				}), $('<menuitem/>').html('查看资料').on({
					'click': function click(e) {
						TablelistShips.contextmenu._curel.trigger('click', [!0]);
					}
				}), $('<menuitem/>').html('将该舰娘加入对比').on({
					'click': (function (e) {
						this.checkbox[TablelistShips.contextmenu._curid].prop('checked', !this.checkbox[TablelistShips.contextmenu._curid].prop('checked')).trigger('change');
					}).bind(this),
					'show': (function (e) {
						if (!TablelistShips.contextmenu._curid) return !1;

						if (_g.data.ship_types[_g['data']['ships'][TablelistShips.contextmenu._curid]['type']]['donotcompare']) $(e.target).hide();else $(e.target).show();

						if (this.checkbox[TablelistShips.contextmenu._curid].prop('checked')) $(e.target).html('取消对比');else $(e.target).html('将该舰娘加入对比');
					}).bind(this)
				}), $('<div/>').on('show', (function (e) {
					var $div = $(e.target).empty();
					if (TablelistShips.contextmenu._curid) {
						var series = _g['data']['ships'][TablelistShips.contextmenu._curid].getSeriesData() || [];
						series.forEach(function (currentValue, i) {
							if (!i) $div.append($('<hr/>'));
							var checkbox = null;
							try {
								checkbox = this.checkbox[currentValue['id']];
							} catch (e) {}
							$div.append($('<div class="item"/>').html('<span>' + _g['data']['ships'][currentValue['id']].getName(!0) + '</span>').append($('<div class="group"/>').append(function () {
								var els = $();

								if (_frame.app_main.is_mode_selection()) {
									els = els.add($('<menuitem/>').html('选择').on({
										'click': function click() {
											if (_frame.app_main.is_mode_selection()) _frame.app_main.mode_selection_callback(currentValue['id']);
										}
									}));
								}

								return els;
							}).append($('<menuitem data-infos="[[SHIP::' + currentValue['id'] + ']]"/>').html('查看资料')).append($('<menuitem/>').html(checkbox && checkbox.prop('checked') ? '取消对比' : '加入对比').on({
								'click': (function (e) {
									if (checkbox) {
										this.checkbox[currentValue['id']].prop('checked', !checkbox.prop('checked')).trigger('change');
									}
								}).bind(this)
							}))));
						}, this);
					}
				}).bind(this))]
			});

			TablelistShips.contextmenu._curid = shipId || $el.data('shipid');
			TablelistShips.contextmenu._curel = $el;

			if (is_rightclick) TablelistShips.contextmenu.show(is_rightclick.clientX, is_rightclick.clientY);else TablelistShips.contextmenu.show($el);
		}
	}, {
		key: 'init_parse',
		value: function init_parse() {
			this.dom.filter_container = this.dom.container.children('.options');
			this.dom.filters = this.dom.filter_container.children('.filters');
			this.dom.exit_compare = this.dom.filter_container.children('.exit_compare');

			this.dom.exit_compare.children('button[icon="arrow-set2-left"]').on('click', (function () {
				this.compare_end();
			}).bind(this));

			this.dom.exit_compare.children('button[icon="checkbox-checked"]').on('click', (function () {
				this.compare_continue();
			}).bind(this));

			this.dom.btn_compare_sort = this.dom.exit_compare.children('button[icon="sort-amount-desc"]').on('click', (function () {
				if (!this.dom.btn_compare_sort.hasClass('disabled')) this.sort_table_restore();
			}).bind(this));

			this.dom.btn_hide_premodel = this.dom.filters.find('[name="hide-premodel"]').prop('checked', _config.get('shiplist-filter-hide-premodel') === 'false' ? null : !0).on('change', (function (e) {
				_config.set('shiplist-filter-hide-premodel', this.dom.btn_hide_premodel.prop('checked'));
				this.dom.filter_container.attr('filter-hide-premodel', this.dom.btn_hide_premodel.prop('checked'));
				this.thead_redraw();
			}).bind(this));

			this.dom.filters.find('[name="viewtype"]').each((function (index, $el) {
				$el = $($el);
				var viewtype = _config.get('shiplist-viewtype') || 'card';
				if ($el.val() == viewtype) $el.prop('checked', !0);
				$el.on('change', (function (e) {
					if ($el.is(':checked')) {
						_config.set('shiplist-viewtype', $el.val());
						this.dom.filter_container.attr('viewtype', $el.val());
						this.thead_redraw();
					}
				}).bind(this));
			}).bind(this));
			this.dom.filters.find('input').trigger('change');

			this.dom.table_container = this.dom.container.children('.fixed-table-container');
			this.dom.table_container_inner = this.dom.table_container.children('.fixed-table-container-inner');
			this.dom.table = this.dom.table_container_inner.children('table.ships');
			this.dom.table.find('thead td').on('click', (function (e) {
				this.sort_table_from_theadcell($(e.currentTarget));
			}).bind(this));
			this.dom.tbody = this.dom.table.children('tbody');

			this.dom.table.on('contextmenu.contextmenu_ship', 'tr[data-shipid]', (function (e) {
				this.contextmenu_show($(e.currentTarget), null, e);
				e.preventDefault();
			}).bind(this)).on('click.contextmenu_ship', 'tr[data-shipid]>th>em', (function (e) {
				this.contextmenu_show($(e.currentTarget).parent().parent());
				e.stopImmediatePropagation();
				e.stopPropagation();
			}).bind(this));

			this.dom.msg_container = this.dom.container.children('.msgs');
			if (_config.get('hide-compareinfos')) this.dom.msg_container.removeAttr('data-msgs');else this.dom.msg_container.attr('data-msgs', 'compareinfos');

			this.parse_all_items();

			var compareinfos = this.dom.msg_container.children('.compareinfos');
			compareinfos.children('button').on('click', (function () {
				this.dom.msg_container.removeAttr('data-msgs');
				_config.set('hide-compareinfos', !0);
			}).bind(this));
			this.dom.msg_container.children('.comparestart').on('click', (function () {
				this.compare_start();
			}).bind(this));

			this.dom.tbody.on('click', 'tr.row[data-shipid]', (function (e, forceInfos) {
				if (e.target.tagName.toLowerCase() == 'label') {
					this.checkbox[e.currentTarget.getAttribute('data-shipid')].prop('checked', !this.checkbox[e.currentTarget.getAttribute('data-shipid')].prop('checked')).trigger('change');
					e.stopPropagation();
				} else if (!forceInfos && _frame.app_main.is_mode_selection()) {
						e.preventDefault();
						e.stopImmediatePropagation();
						e.stopPropagation();
						if (!e.currentTarget.getAttribute('data-donotcompare')) _frame.app_main.mode_selection_callback(e.currentTarget.getAttribute('data-shipid'));
					}
			}).bind(this));
		}
	}, {
		key: 'parse_all_items',
		value: function parse_all_items() {
			var header_index = -1;

			this.dom.tbody.children('tr.typetitle,tr.row').each((function (index, tr) {
				var _this14 = this;

				tr = $(tr);
				if (tr.hasClass('typetitle')) {
					(function () {
						header_index++;
						_this14.last_item = tr;
						var checkbox = tr.find('input[type="checkbox"]').on({
							'change': function change() {
								checkbox.data('ships').filter(':visible').each(function (index, element) {
									$(element).data('checkbox').prop('checked', checkbox.prop('checked')).trigger('change', [!0]);
								});
							},
							'docheck': function docheck() {
								var trs = checkbox.data('ships').filter(':visible'),
								    checked = trs.filter('[compare-checked=true]');
								if (!checked.length) {
									checkbox.prop({
										'checked': !1,
										'indeterminate': !1
									});
								} else if (checked.length < trs.length) {
									checkbox.prop({
										'checked': !1,
										'indeterminate': !0
									});
								} else {
									checkbox.prop({
										'checked': !0,
										'indeterminate': !1
									});
								}
							}
						}).data('ships', $());
						_this14.header_checkbox[header_index] = checkbox;
					})();
				} else {
					(function () {
						var donotcompare = tr.attr('data-donotcompare'),
						    ship_id = tr.attr('data-shipid'),
						    checkbox = tr.find('input[type="checkbox"]'),
						    title_index = header_index;

						checkbox.prop('disabled', donotcompare).on('change', (function (e, not_trigger_check) {
							if (checkbox.prop('checked')) tr.attr('compare-checked', !0);else tr.removeAttr('compare-checked');
							this.compare_btn_show(checkbox.prop('checked'));
							if (!not_trigger_check) this.header_checkbox[title_index].trigger('docheck');
						}).bind(_this14));

						_this14.header_checkbox[title_index].data('ships', _this14.header_checkbox[title_index].data('ships').add(tr));

						tr.data('checkbox', checkbox);

						_this14.checkbox[ship_id] = checkbox;
					})();
				}
			}).bind(this));

			this.mark_high();
			this.thead_redraw();
			_frame.app_main.loaded('tablelist_' + this._index, !0);
			delete this.last_item;
		}
	}]);

	return TablelistShips;
})(Tablelist);