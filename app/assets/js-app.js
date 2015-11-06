"use strict";

// Global Variables
	_g.animate_duration_delay = 320;
	_g.inputIndex = 0;
	_g.lang = 'zh_cn';
	_g.joint = '・';
	_g.isClient = typeof node == 'undefined' && typeof nw == 'undefined' ? false : true;
	_g.defaultHqLv = 90;
	
	function eventName(event, name){
		name = name ? ('.' + name) : ''
		if( _g.event[event] )
			return _g.event[event].split(' ').map(function(value){
				return value + name
			}).join(' ')
		return event + name
	}

	_g.updateDefaultHqLv = function(val){
		val = parseInt(val) || _g.defaultHqLv
		if( val <= 0 )
			val = _g.defaultHqLv
		if( val != Lockr.get('hqLvDefault', _g.defaultHqLv) ){
			Lockr.set('hqLvDefault', val)
			clearTimeout(this.delay_updateDefaultHqLv)
			this.delay_updateDefaultHqLv = setTimeout(function(){
				$body.trigger('update_defaultHqLv', [val])
				clearTimeout(this.delay_updateDefaultHqLv)
				this.delay_updateDefaultHqLv = null
			}.bind(this), 200)
		}
	};



// locale object
	let _l = {};



// String
	String.prototype.printf = function() {
		if( typeof vsprintf != 'undefined' )
			return vsprintf(this, Array.prototype.slice.call(arguments));
		return this;
	};

(function(root, factory) {

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = factory(root, exports);
    }
  } else if (typeof define === 'function' && define.amd) {
    define(['exports'], function(exports) {
      root.Lockr = factory(root, exports);
    });
  } else {
    root.Lockr = factory(root, {});
  }

}(this, function(root, Lockr) {
  'use strict';

  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(elt /*, from*/)
    {
      var len = this.length >>> 0;

      var from = Number(arguments[1]) || 0;
      from = (from < 0)
      ? Math.ceil(from)
      : Math.floor(from);
      if (from < 0)
        from += len;

      for (; from < len; from++)
      {
        if (from in this &&
            this[from] === elt)
          return from;
      }
      return -1;
    };
  }

  Lockr.prefix = "";

  Lockr._getPrefixedKey = function(key, options) {
    options = options || {};

    if (options.noPrefix) {
      return key;
    } else {
      return this.prefix + key;
    }

  };

  Lockr.set = function (key, value, options) {
    var query_key = this._getPrefixedKey(key, options);

    try {
      localStorage.setItem(query_key, JSON.stringify({"data": value}));
    } catch (e) {
      if (console) console.warn("Lockr didn't successfully save the '{"+ key +": "+ value +"}' pair, because the localStorage is full.");
    }
  };

  Lockr.get = function (key, missing, options) {
    var query_key = this._getPrefixedKey(key, options),
        value;
    try {
      value = JSON.parse(localStorage.getItem(query_key));
    } catch (e) {
      if( localStorage[query_key] ){
        value = JSON.parse('{"data":"' + localStorage.getItem(query_key) + '"}')
      }else{
        value = null;
      }
    }
    if(value === null)
      return missing;
    else
      return (typeof value == 'object' && typeof value.data != 'undefined')
              ? value.data
              : (value || missing);
  };

  Lockr.sadd = function(key, value, options) {
    var query_key = this._getPrefixedKey(key, options),
        json;

    var values = Lockr.smembers(key);

    if (values.indexOf(value) > -1) {
      return null;
    }

    try {
      values.push(value);
      json = JSON.stringify({"data": values});
      localStorage.setItem(query_key, json);
    } catch (e) {
      console.log(e);
      if (console) console.warn("Lockr didn't successfully add the "+ value +" to "+ key +" set, because the localStorage is full.");
    }
  };

  Lockr.smembers = function(key, options) {
    var query_key = this._getPrefixedKey(key, options),
        value;

    try {
      value = JSON.parse(localStorage.getItem(query_key));
    } catch (e) {
      value = null;
    }

    if (value === null)
      return [];
    else
      return (value.data || []);
  };

  Lockr.sismember = function(key, value, options) {
    var query_key = this._getPrefixedKey(key, options);

    return Lockr.smembers(key).indexOf(value) > -1;
  };

  Lockr.getAll = function () {
    var keys = Object.keys(localStorage);

    return keys.map(function (key) {
      return Lockr.get(key);
    });
  };

  Lockr.srem = function(key, value, options) {
    var query_key = this._getPrefixedKey(key, options),
        json,
        index;

    var values = Lockr.smembers(key, value);

    index = values.indexOf(value);

    if (index > -1)
      values.splice(index, 1);

    json = JSON.stringify({"data": values});

    try {
      localStorage.setItem(query_key, json);
    } catch (e) {
      if (console) console.warn("Lockr couldn't remove the "+ value +" from the set "+ key);
    }
  };

  Lockr.rm =  function (key) {
    localStorage.removeItem(key);
  };

  Lockr.flush = function () {
    localStorage.clear();
  };
  return Lockr;

}));

//
// SmoothScroll for websites v1.3.8 (Balazs Galambosi)
// Licensed under the terms of the MIT license.
//
// You may use it in your theme if you credit me. 
// It is also free to use on any individual website.
//
// Exception:
// The only restriction would be not to publish any  
// extension for browsers or native application
// without getting a written permission first.
//
 
(function () {
  
// Scroll Variables (tweakable)
var defaultOptions = {
 
    // Scrolling Core
    frameRate        : 150, // [Hz]
    animationTime    : 200, // [px]
    //stepSize         : 120, // [px]
    stepSize         : 100, // [px]
 
    // Pulse (less tweakable)
    // ratio of "tail" to "acceleration"
    pulseAlgorithm   : true,
    pulseScale       : 4,
    pulseNormalize   : 1,
 
    // Acceleration
    accelerationDelta : 20,  // 20
    accelerationMax   : 1,   // 1
 
    // Keyboard Settings
    keyboardSupport   : true,  // option
    arrowScroll       : 50,     // [px]
 
    // Other
    touchpadSupport   : true,
    fixedBackground   : true, 
    excluded          : ''    
};
 
var options = defaultOptions;
 
 
// Other Variables
var isExcluded = false;
var isFrame = false;
var direction = { x: 0, y: 0 };
var initDone  = false;
var root = document.documentElement;
var activeElement;
var observer;
var deltaBuffer = [];
var isMac = /^Mac/.test(navigator.platform);
 
var key = { left: 37, up: 38, right: 39, down: 40, spacebar: 32, 
            pageup: 33, pagedown: 34, end: 35, home: 36 };
 
 
/***********************************************
 * SETTINGS
 ***********************************************/
 
var options = defaultOptions;
 
 
/***********************************************
 * INITIALIZE
 ***********************************************/
 
/**
 * Tests if smooth scrolling is allowed. Shuts down everything if not.
 */
function initTest() {
    if (options.keyboardSupport) {
        addEvent('keydown', keydown);
    }
}
 
/**
 * Sets up scrolls array, determines if frames are involved.
 */
function init() {
  
    if (initDone || !document.body) return;
 
    initDone = true;
 
    var body = document.body;
    var html = document.documentElement;
    var windowHeight = window.innerHeight; 
    var scrollHeight = body.scrollHeight;
    
    // check compat mode for root element
    root = (document.compatMode.indexOf('CSS') >= 0) ? html : body;
    activeElement = body;
    
    initTest();
 
    // Checks if this script is running in a frame
    if (top != self) {
        isFrame = true;
    }
 
    /**
     * This fixes a bug where the areas left and right to 
     * the content does not trigger the onmousewheel event
     * on some pages. e.g.: html, body { height: 100% }
     */
    else if (scrollHeight > windowHeight &&
            (body.offsetHeight <= windowHeight || 
             html.offsetHeight <= windowHeight)) {
 
        var fullPageElem = document.createElement('div');
        fullPageElem.style.cssText = 'position:absolute; z-index:-10000; ' +
                                     'top:0; left:0; right:0; height:' + 
                                      root.scrollHeight + 'px';
        document.body.appendChild(fullPageElem);
        
        // DOM changed (throttled) to fix height
        var pendingRefresh;
        var refresh = function () {
            if (pendingRefresh) return; // could also be: clearTimeout(pendingRefresh);
            pendingRefresh = setTimeout(function () {
                if (isExcluded) return; // could be running after cleanup
                fullPageElem.style.height = '0';
                fullPageElem.style.height = root.scrollHeight + 'px';
                pendingRefresh = null;
            }, 500); // act rarely to stay fast
        };
  
        setTimeout(refresh, 10);
 
        // TODO: attributeFilter?
        var config = {
            attributes: true, 
            childList: true, 
            characterData: false 
            // subtree: true
        };
 
        observer = new MutationObserver(refresh);
        observer.observe(body, config);
 
        if (root.offsetHeight <= windowHeight) {
            var clearfix = document.createElement('div');   
            clearfix.style.clear = 'both';
            body.appendChild(clearfix);
        }
    }
 
    // disable fixed background
    if (!options.fixedBackground && !isExcluded) {
        body.style.backgroundAttachment = 'scroll';
        html.style.backgroundAttachment = 'scroll';
    }
}
 
/**
 * Removes event listeners and other traces left on the page.
 */
function cleanup() {
    observer && observer.disconnect();
    removeEvent(wheelEvent, wheel);
    removeEvent('mousedown', mousedown);
    removeEvent('keydown', keydown);
}
 
 
/************************************************
 * SCROLLING 
 ************************************************/
 
var que = [];
var pending = false;
var lastScroll = Date.now();
 
/**
 * Pushes scroll actions to the scrolling queue.
 */
function scrollArray(elem, left, top) {
    
    directionCheck(left, top);
 
    if (options.accelerationMax != 1) {
        var now = Date.now();
        var elapsed = now - lastScroll;
        if (elapsed < options.accelerationDelta) {
            var factor = (1 + (50 / elapsed)) / 2;
            if (factor > 1) {
                factor = Math.min(factor, options.accelerationMax);
                left *= factor;
                top  *= factor;
            }
        }
        lastScroll = Date.now();
    }          
    
    // push a scroll command
    que.push({
        x: left, 
        y: top, 
        lastX: (left < 0) ? 0.99 : -0.99,
        lastY: (top  < 0) ? 0.99 : -0.99, 
        start: Date.now()
    });
        
    // don't act if there's a pending queue
    if (pending) {
        return;
    }  
 
    var scrollWindow = (elem === document.body);
    
    var step = function (time) {
        
        var now = Date.now();
        var scrollX = 0;
        var scrollY = 0; 
    
        for (var i = 0; i < que.length; i++) {
            
            var item = que[i];
            var elapsed  = now - item.start;
            var finished = (elapsed >= options.animationTime);
            
            // scroll position: [0, 1]
            var position = (finished) ? 1 : elapsed / options.animationTime;
            
            // easing [optional]
            if (options.pulseAlgorithm) {
                position = pulse(position);
            }
            
            // only need the difference
            var x = (item.x * position - item.lastX) >> 0;
            var y = (item.y * position - item.lastY) >> 0;
            
            // add this to the total scrolling
            scrollX += x;
            scrollY += y;            
            
            // update last values
            item.lastX += x;
            item.lastY += y;
        
            // delete and step back if it's over
            if (finished) {
                que.splice(i, 1); i--;
            }           
        }
 
        // scroll left and top
        if (scrollWindow) {
            window.scrollBy(scrollX, scrollY);
        } 
        else {
            if (scrollX) elem.scrollLeft += scrollX;
            if (scrollY) elem.scrollTop  += scrollY;                    
        }
        
        // clean up if there's nothing left to do
        if (!left && !top) {
            que = [];
        }
        
        if (que.length) { 
            requestFrame(step, elem, (1000 / options.frameRate + 1)); 
        } else { 
            pending = false;
        }
    };
    
    // start a new queue of actions
    requestFrame(step, elem, 0);
    pending = true;
}
 
 
/***********************************************
 * EVENTS
 ***********************************************/
 
/**
 * Mouse wheel handler.
 * @param {Object} event
 */
function wheel(event) {
 
    if (!initDone) {
        init();
    }
    
    var target = event.target;
    var overflowing = overflowingAncestor(target);
 
    // use default if there's no overflowing
    // element or default action is prevented   
    // or it's a zooming event with CTRL 
    if (!overflowing || event.defaultPrevented || event.ctrlKey) {
        return true;
    }
    
    // leave embedded content alone (flash & pdf)
    if (isNodeName(activeElement, 'embed') || 
       (isNodeName(target, 'embed') && /\.pdf/i.test(target.src)) ||
       isNodeName(activeElement, 'object')) {
        return true;
    }
 
    var deltaX = -event.wheelDeltaX || event.deltaX || 0;
    var deltaY = -event.wheelDeltaY || event.deltaY || 0;
    
    if (isMac) {
        if (event.wheelDeltaX && isDivisible(event.wheelDeltaX, 120)) {
            deltaX = -120 * (event.wheelDeltaX / Math.abs(event.wheelDeltaX));
        }
        if (event.wheelDeltaY && isDivisible(event.wheelDeltaY, 120)) {
            deltaY = -120 * (event.wheelDeltaY / Math.abs(event.wheelDeltaY));
        }
    }
    
    // use wheelDelta if deltaX/Y is not available
    if (!deltaX && !deltaY) {
        deltaY = -event.wheelDelta || 0;
    }
 
    // line based scrolling (Firefox mostly)
    if (event.deltaMode === 1) {
        deltaX *= 40;
        deltaY *= 40;
    }
    
    // check if it's a touchpad scroll that should be ignored
    if (!options.touchpadSupport && isTouchpad(deltaY)) {
        return true;
    }
 
    // scale by step size
    // delta is 120 most of the time
    // synaptics seems to send 1 sometimes
    if (Math.abs(deltaX) > 1.2) {
        deltaX *= options.stepSize / 120;
    }
    if (Math.abs(deltaY) > 1.2) {
        deltaY *= options.stepSize / 120;
    }
    
    scrollArray(overflowing, deltaX, deltaY);
    event.preventDefault();
    scheduleClearCache();
}
 
/**
 * Keydown event handler.
 * @param {Object} event
 */
function keydown(event) {
 
    var target   = event.target;
    var modifier = event.ctrlKey || event.altKey || event.metaKey || 
                  (event.shiftKey && event.keyCode !== key.spacebar);
    
    // our own tracked active element could've been removed from the DOM
    if (!document.contains(activeElement)) {
        activeElement = document.activeElement;
    }
 
    // do nothing if user is editing text
    // or using a modifier key (except shift)
    // or in a dropdown
    // or inside interactive elements
    var inputNodeNames = /^(textarea|select|embed|object)$/i;
    var buttonTypes = /^(button|submit|radio|checkbox|file|color|image)$/i;
    if ( inputNodeNames.test(target.nodeName) ||
         isNodeName(target, 'input') && !buttonTypes.test(target.type) ||
         isNodeName(activeElement, 'video') ||
         isInsideYoutubeVideo(event) ||
         target.isContentEditable || 
         event.defaultPrevented   ||
         modifier ) {
      return true;
    }
    
    // spacebar should trigger button press
    if ((isNodeName(target, 'button') ||
         isNodeName(target, 'input') && buttonTypes.test(target.type)) &&
        event.keyCode === key.spacebar) {
      return true;
    }
    
    var shift, x = 0, y = 0;
    var elem = overflowingAncestor(activeElement);
    var clientHeight = elem.clientHeight;
 
    if (elem == document.body) {
        clientHeight = window.innerHeight;
    }
 
    switch (event.keyCode) {
        case key.up:
            y = -options.arrowScroll;
            break;
        case key.down:
            y = options.arrowScroll;
            break;         
        case key.spacebar: // (+ shift)
            shift = event.shiftKey ? 1 : -1;
            y = -shift * clientHeight * 0.9;
            break;
        case key.pageup:
            y = -clientHeight * 0.9;
            break;
        case key.pagedown:
            y = clientHeight * 0.9;
            break;
        case key.home:
            y = -elem.scrollTop;
            break;
        case key.end:
            var damt = elem.scrollHeight - elem.scrollTop - clientHeight;
            y = (damt > 0) ? damt+10 : 0;
            break;
        case key.left:
            x = -options.arrowScroll;
            break;
        case key.right:
            x = options.arrowScroll;
            break;            
        default:
            return true; // a key we don't care about
    }
 
    scrollArray(elem, x, y);
    event.preventDefault();
    scheduleClearCache();
}
 
/**
 * Mousedown event only for updating activeElement
 */
function mousedown(event) {
    activeElement = event.target;
}
 
 
/***********************************************
 * OVERFLOW
 ***********************************************/
 
var uniqueID = (function () {
    var i = 0;
    return function (el) {
        return el.uniqueID || (el.uniqueID = i++);
    };
})();
 
var cache = {}; // cleared out after a scrolling session
var clearCacheTimer;
 
//setInterval(function () { cache = {}; }, 10 * 1000);
 
function scheduleClearCache() {
    clearTimeout(clearCacheTimer);
    clearCacheTimer = setInterval(function () { cache = {}; }, 1*1000);
}
 
function setCache(elems, overflowing) {
    for (var i = elems.length; i--;)
        cache[uniqueID(elems[i])] = overflowing;
    return overflowing;
}
 
//  (body)                (root)
//         | hidden | visible | scroll |  auto  |
// hidden  |   no   |    no   |   YES  |   YES  |
// visible |   no   |   YES   |   YES  |   YES  |
// scroll  |   no   |   YES   |   YES  |   YES  |
// auto    |   no   |   YES   |   YES  |   YES  |
 
function overflowingAncestor(el) {
    var elems = [];
    var body = document.body;
    var rootScrollHeight = root.scrollHeight;
    do {
        var cached = cache[uniqueID(el)];
        if (cached) {
            return setCache(elems, cached);
        }
        elems.push(el);
        if (rootScrollHeight === el.scrollHeight) {
            var topOverflowsNotHidden = overflowNotHidden(root) && overflowNotHidden(body);
            var isOverflowCSS = topOverflowsNotHidden || overflowAutoOrScroll(root);
            if (isFrame && isContentOverflowing(root) || 
               !isFrame && isOverflowCSS) {
                return setCache(elems, getScrollRoot()); 
            }
        } else if (isContentOverflowing(el) && overflowAutoOrScroll(el)) {
            return setCache(elems, el);
        }
    } while (el = el.parentElement);
}
 
function isContentOverflowing(el) {
    return (el.clientHeight + 10 < el.scrollHeight);
}
 
// typically for <body> and <html>
function overflowNotHidden(el) {
    var overflow = getComputedStyle(el, '').getPropertyValue('overflow-y');
    return (overflow !== 'hidden');
}
 
// for all other elements
function overflowAutoOrScroll(el) {
    var overflow = getComputedStyle(el, '').getPropertyValue('overflow-y');
    return (overflow === 'scroll' || overflow === 'auto');
}
 
 
/***********************************************
 * HELPERS
 ***********************************************/
 
function addEvent(type, fn) {
    window.addEventListener(type, fn, false);
}
 
function removeEvent(type, fn) {
    window.removeEventListener(type, fn, false);  
}
 
function isNodeName(el, tag) {
    return (el.nodeName||'').toLowerCase() === tag.toLowerCase();
}
 
function directionCheck(x, y) {
    x = (x > 0) ? 1 : -1;
    y = (y > 0) ? 1 : -1;
    if (direction.x !== x || direction.y !== y) {
        direction.x = x;
        direction.y = y;
        que = [];
        lastScroll = 0;
    }
}
 
var deltaBufferTimer;
 
if (window.localStorage && localStorage.SS_deltaBuffer) {
    deltaBuffer = localStorage.SS_deltaBuffer.split(',');
}
 
function isTouchpad(deltaY) {
    if (!deltaY) return;
    if (!deltaBuffer.length) {
        deltaBuffer = [deltaY, deltaY, deltaY];
    }
    deltaY = Math.abs(deltaY)
    deltaBuffer.push(deltaY);
    deltaBuffer.shift();
    clearTimeout(deltaBufferTimer);
    deltaBufferTimer = setTimeout(function () {
        if (window.localStorage) {
            localStorage.SS_deltaBuffer = deltaBuffer.join(',');
        }
    }, 1000);
    return !allDeltasDivisableBy(120) && !allDeltasDivisableBy(100);
} 
 
function isDivisible(n, divisor) {
    return (Math.floor(n / divisor) == n / divisor);
}
 
function allDeltasDivisableBy(divisor) {
    return (isDivisible(deltaBuffer[0], divisor) &&
            isDivisible(deltaBuffer[1], divisor) &&
            isDivisible(deltaBuffer[2], divisor));
}
 
function isInsideYoutubeVideo(event) {
    var elem = event.target;
    var isControl = false;
    if (document.URL.indexOf ('www.youtube.com/watch') != -1) {
        do {
            isControl = (elem.classList && 
                         elem.classList.contains('html5-video-controls'));
            if (isControl) break;
        } while (elem = elem.parentNode);
    }
    return isControl;
}
 
var requestFrame = (function () {
      return (window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    ||
              function (callback, element, delay) {
                 window.setTimeout(callback, delay || (1000/60));
             });
})();
 
var MutationObserver = (window.MutationObserver || 
                        window.WebKitMutationObserver ||
                        window.MozMutationObserver);  
 
var getScrollRoot = (function() {
  var SCROLL_ROOT;
  return function() {
    if (!SCROLL_ROOT) {
      var dummy = document.createElement('div');
      dummy.style.cssText = 'height:10000px;width:1px;';
      document.body.appendChild(dummy);
      var bodyScrollTop  = document.body.scrollTop;
      var docElScrollTop = document.documentElement.scrollTop;
      window.scrollBy(0, 1);
      if (document.body.scrollTop != bodyScrollTop)
        (SCROLL_ROOT = document.body);
      else 
        (SCROLL_ROOT = document.documentElement);
      window.scrollBy(0, -1);
      document.body.removeChild(dummy);
    }
    return SCROLL_ROOT;
  };
})();
 
 
/***********************************************
 * PULSE (by Michael Herf)
 ***********************************************/
 
/**
 * Viscous fluid with a pulse for part and decay for the rest.
 * - Applies a fixed force over an interval (a damped acceleration), and
 * - Lets the exponential bleed away the velocity over a longer interval
 * - Michael Herf, http://stereopsis.com/stopping/
 */
function pulse_(x) {
    var val, start, expx;
    // test
    x = x * options.pulseScale;
    if (x < 1) { // acceleartion
        val = x - (1 - Math.exp(-x));
    } else {     // tail
        // the previous animation ended here:
        start = Math.exp(-1);
        // simple viscous drag
        x -= 1;
        expx = 1 - Math.exp(-x);
        val = start + (expx * (1 - start));
    }
    return val * options.pulseNormalize;
}
 
function pulse(x) {
    if (x >= 1) return 1;
    if (x <= 0) return 0;
 
    if (options.pulseNormalize == 1) {
        options.pulseNormalize /= pulse_(1);
    }
    return pulse_(x);
}
 
var wheelEvent;
if ('onwheel' in document.createElement('div'))
    wheelEvent = 'wheel';
else if ('onmousewheel' in document.createElement('div'))
    wheelEvent = 'mousewheel';
 
if (wheelEvent) {
    addEvent(wheelEvent, wheel);
    addEvent('mousedown', mousedown);
    addEvent('load', init);
}
 
})();
// Copyright (c) 2013 Pieroxy <pieroxy@pieroxy.net>
// This work is free. You can redistribute it and/or modify it
// under the terms of the WTFPL, Version 2
// For more information see LICENSE.txt or http://www.wtfpl.net/
//
// For more information, the home page:
// http://pieroxy.net/blog/pages/lz-string/testing.html
//
// LZ-based compression algorithm, version 1.4.4
var LZString = (function() {

// private property
var f = String.fromCharCode;
var keyStrBase64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
var keyStrUriSafe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$";
var baseReverseDic = {};

function getBaseValue(alphabet, character) {
  if (!baseReverseDic[alphabet]) {
    baseReverseDic[alphabet] = {};
    for (var i=0 ; i<alphabet.length ; i++) {
      baseReverseDic[alphabet][alphabet.charAt(i)] = i;
    }
  }
  return baseReverseDic[alphabet][character];
}

var LZString = {
  compressToBase64 : function (input) {
    if (input == null) return "";
    var res = LZString._compress(input, 6, function(a){return keyStrBase64.charAt(a);});
    switch (res.length % 4) { // To produce valid Base64
    default: // When could this happen ?
    case 0 : return res;
    case 1 : return res+"===";
    case 2 : return res+"==";
    case 3 : return res+"=";
    }
  },

  decompressFromBase64 : function (input) {
    if (input == null) return "";
    if (input == "") return null;
    return LZString._decompress(input.length, 32, function(index) { return getBaseValue(keyStrBase64, input.charAt(index)); });
  },

  compressToUTF16 : function (input) {
    if (input == null) return "";
    return LZString._compress(input, 15, function(a){return f(a+32);}) + " ";
  },

  decompressFromUTF16: function (compressed) {
    if (compressed == null) return "";
    if (compressed == "") return null;
    return LZString._decompress(compressed.length, 16384, function(index) { return compressed.charCodeAt(index) - 32; });
  },

  //compress into uint8array (UCS-2 big endian format)
  compressToUint8Array: function (uncompressed) {
    var compressed = LZString.compress(uncompressed);
    var buf=new Uint8Array(compressed.length*2); // 2 bytes per character

    for (var i=0, TotalLen=compressed.length; i<TotalLen; i++) {
      var current_value = compressed.charCodeAt(i);
      buf[i*2] = current_value >>> 8;
      buf[i*2+1] = current_value % 256;
    }
    return buf;
  },

  //decompress from uint8array (UCS-2 big endian format)
  decompressFromUint8Array:function (compressed) {
    if (compressed===null || compressed===undefined){
        return LZString.decompress(compressed);
    } else {
        var buf=new Array(compressed.length/2); // 2 bytes per character
        for (var i=0, TotalLen=buf.length; i<TotalLen; i++) {
          buf[i]=compressed[i*2]*256+compressed[i*2+1];
        }

        var result = [];
        buf.forEach(function (c) {
          result.push(f(c));
        });
        return LZString.decompress(result.join(''));

    }

  },


  //compress into a string that is already URI encoded
  compressToEncodedURIComponent: function (input) {
    if (input == null) return "";
    return LZString._compress(input, 6, function(a){return keyStrUriSafe.charAt(a);});
  },

  //decompress from an output of compressToEncodedURIComponent
  decompressFromEncodedURIComponent:function (input) {
    if (input == null) return "";
    if (input == "") return null;
    input = input.replace(/ /g, "+");
    return LZString._decompress(input.length, 32, function(index) { return getBaseValue(keyStrUriSafe, input.charAt(index)); });
  },

  compress: function (uncompressed) {
    return LZString._compress(uncompressed, 16, function(a){return f(a);});
  },
  _compress: function (uncompressed, bitsPerChar, getCharFromInt) {
    if (uncompressed == null) return "";
    var i, value,
        context_dictionary= {},
        context_dictionaryToCreate= {},
        context_c="",
        context_wc="",
        context_w="",
        context_enlargeIn= 2, // Compensate for the first entry which should not count
        context_dictSize= 3,
        context_numBits= 2,
        context_data=[],
        context_data_val=0,
        context_data_position=0,
        ii;

    for (ii = 0; ii < uncompressed.length; ii += 1) {
      context_c = uncompressed.charAt(ii);
      if (!Object.prototype.hasOwnProperty.call(context_dictionary,context_c)) {
        context_dictionary[context_c] = context_dictSize++;
        context_dictionaryToCreate[context_c] = true;
      }

      context_wc = context_w + context_c;
      if (Object.prototype.hasOwnProperty.call(context_dictionary,context_wc)) {
        context_w = context_wc;
      } else {
        if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate,context_w)) {
          if (context_w.charCodeAt(0)<256) {
            for (i=0 ; i<context_numBits ; i++) {
              context_data_val = (context_data_val << 1);
              if (context_data_position == bitsPerChar-1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
            }
            value = context_w.charCodeAt(0);
            for (i=0 ; i<8 ; i++) {
              context_data_val = (context_data_val << 1) | (value&1);
              if (context_data_position == bitsPerChar-1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
              value = value >> 1;
            }
          } else {
            value = 1;
            for (i=0 ; i<context_numBits ; i++) {
              context_data_val = (context_data_val << 1) | value;
              if (context_data_position ==bitsPerChar-1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
              value = 0;
            }
            value = context_w.charCodeAt(0);
            for (i=0 ; i<16 ; i++) {
              context_data_val = (context_data_val << 1) | (value&1);
              if (context_data_position == bitsPerChar-1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
              value = value >> 1;
            }
          }
          context_enlargeIn--;
          if (context_enlargeIn == 0) {
            context_enlargeIn = Math.pow(2, context_numBits);
            context_numBits++;
          }
          delete context_dictionaryToCreate[context_w];
        } else {
          value = context_dictionary[context_w];
          for (i=0 ; i<context_numBits ; i++) {
            context_data_val = (context_data_val << 1) | (value&1);
            if (context_data_position == bitsPerChar-1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
            value = value >> 1;
          }


        }
        context_enlargeIn--;
        if (context_enlargeIn == 0) {
          context_enlargeIn = Math.pow(2, context_numBits);
          context_numBits++;
        }
        // Add wc to the dictionary.
        context_dictionary[context_wc] = context_dictSize++;
        context_w = String(context_c);
      }
    }

    // Output the code for w.
    if (context_w !== "") {
      if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate,context_w)) {
        if (context_w.charCodeAt(0)<256) {
          for (i=0 ; i<context_numBits ; i++) {
            context_data_val = (context_data_val << 1);
            if (context_data_position == bitsPerChar-1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
          }
          value = context_w.charCodeAt(0);
          for (i=0 ; i<8 ; i++) {
            context_data_val = (context_data_val << 1) | (value&1);
            if (context_data_position == bitsPerChar-1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
            value = value >> 1;
          }
        } else {
          value = 1;
          for (i=0 ; i<context_numBits ; i++) {
            context_data_val = (context_data_val << 1) | value;
            if (context_data_position == bitsPerChar-1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
            value = 0;
          }
          value = context_w.charCodeAt(0);
          for (i=0 ; i<16 ; i++) {
            context_data_val = (context_data_val << 1) | (value&1);
            if (context_data_position == bitsPerChar-1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
            value = value >> 1;
          }
        }
        context_enlargeIn--;
        if (context_enlargeIn == 0) {
          context_enlargeIn = Math.pow(2, context_numBits);
          context_numBits++;
        }
        delete context_dictionaryToCreate[context_w];
      } else {
        value = context_dictionary[context_w];
        for (i=0 ; i<context_numBits ; i++) {
          context_data_val = (context_data_val << 1) | (value&1);
          if (context_data_position == bitsPerChar-1) {
            context_data_position = 0;
            context_data.push(getCharFromInt(context_data_val));
            context_data_val = 0;
          } else {
            context_data_position++;
          }
          value = value >> 1;
        }


      }
      context_enlargeIn--;
      if (context_enlargeIn == 0) {
        context_enlargeIn = Math.pow(2, context_numBits);
        context_numBits++;
      }
    }

    // Mark the end of the stream
    value = 2;
    for (i=0 ; i<context_numBits ; i++) {
      context_data_val = (context_data_val << 1) | (value&1);
      if (context_data_position == bitsPerChar-1) {
        context_data_position = 0;
        context_data.push(getCharFromInt(context_data_val));
        context_data_val = 0;
      } else {
        context_data_position++;
      }
      value = value >> 1;
    }

    // Flush the last char
    while (true) {
      context_data_val = (context_data_val << 1);
      if (context_data_position == bitsPerChar-1) {
        context_data.push(getCharFromInt(context_data_val));
        break;
      }
      else context_data_position++;
    }
    return context_data.join('');
  },

  decompress: function (compressed) {
    if (compressed == null) return "";
    if (compressed == "") return null;
    return LZString._decompress(compressed.length, 32768, function(index) { return compressed.charCodeAt(index); });
  },

  _decompress: function (length, resetValue, getNextValue) {
    var dictionary = [],
        next,
        enlargeIn = 4,
        dictSize = 4,
        numBits = 3,
        entry = "",
        result = [],
        i,
        w,
        bits, resb, maxpower, power,
        c,
        data = {val:getNextValue(0), position:resetValue, index:1};

    for (i = 0; i < 3; i += 1) {
      dictionary[i] = i;
    }

    bits = 0;
    maxpower = Math.pow(2,2);
    power=1;
    while (power!=maxpower) {
      resb = data.val & data.position;
      data.position >>= 1;
      if (data.position == 0) {
        data.position = resetValue;
        data.val = getNextValue(data.index++);
      }
      bits |= (resb>0 ? 1 : 0) * power;
      power <<= 1;
    }

    switch (next = bits) {
      case 0:
          bits = 0;
          maxpower = Math.pow(2,8);
          power=1;
          while (power!=maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }
            bits |= (resb>0 ? 1 : 0) * power;
            power <<= 1;
          }
        c = f(bits);
        break;
      case 1:
          bits = 0;
          maxpower = Math.pow(2,16);
          power=1;
          while (power!=maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }
            bits |= (resb>0 ? 1 : 0) * power;
            power <<= 1;
          }
        c = f(bits);
        break;
      case 2:
        return "";
    }
    dictionary[3] = c;
    w = c;
    result.push(c);
    while (true) {
      if (data.index > length) {
        return "";
      }

      bits = 0;
      maxpower = Math.pow(2,numBits);
      power=1;
      while (power!=maxpower) {
        resb = data.val & data.position;
        data.position >>= 1;
        if (data.position == 0) {
          data.position = resetValue;
          data.val = getNextValue(data.index++);
        }
        bits |= (resb>0 ? 1 : 0) * power;
        power <<= 1;
      }

      switch (c = bits) {
        case 0:
          bits = 0;
          maxpower = Math.pow(2,8);
          power=1;
          while (power!=maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }
            bits |= (resb>0 ? 1 : 0) * power;
            power <<= 1;
          }

          dictionary[dictSize++] = f(bits);
          c = dictSize-1;
          enlargeIn--;
          break;
        case 1:
          bits = 0;
          maxpower = Math.pow(2,16);
          power=1;
          while (power!=maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }
            bits |= (resb>0 ? 1 : 0) * power;
            power <<= 1;
          }
          dictionary[dictSize++] = f(bits);
          c = dictSize-1;
          enlargeIn--;
          break;
        case 2:
          return result.join('');
      }

      if (enlargeIn == 0) {
        enlargeIn = Math.pow(2, numBits);
        numBits++;
      }

      if (dictionary[c]) {
        entry = dictionary[c];
      } else {
        if (c === dictSize) {
          entry = w + w.charAt(0);
        } else {
          return null;
        }
      }
      result.push(entry);

      // Add w+entry[0] to the dictionary.
      dictionary[dictSize++] = w + entry.charAt(0);
      enlargeIn--;

      w = entry;

      if (enlargeIn == 0) {
        enlargeIn = Math.pow(2, numBits);
        numBits++;
      }

    }
  }
};
  return LZString;
})();

if (typeof define === 'function' && define.amd) {
  define(function () { return LZString; });
} else if( typeof module !== 'undefined' && module != null ) {
  module.exports = LZString
}

(function(window) {
    var re = {
        not_string: /[^s]/,
        number: /[diefg]/,
        json: /[j]/,
        not_json: /[^j]/,
        text: /^[^\x25]+/,
        modulo: /^\x25{2}/,
        placeholder: /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijosuxX])/,
        key: /^([a-z_][a-z_\d]*)/i,
        key_access: /^\.([a-z_][a-z_\d]*)/i,
        index_access: /^\[(\d+)\]/,
        sign: /^[\+\-]/
    }

    function sprintf() {
        var key = arguments[0], cache = sprintf.cache
        if (!(cache[key] && cache.hasOwnProperty(key))) {
            cache[key] = sprintf.parse(key)
        }
        return sprintf.format.call(null, cache[key], arguments)
    }

    sprintf.format = function(parse_tree, argv) {
        var cursor = 1, tree_length = parse_tree.length, node_type = "", arg, output = [], i, k, match, pad, pad_character, pad_length, is_positive = true, sign = ""
        for (i = 0; i < tree_length; i++) {
            node_type = get_type(parse_tree[i])
            if (node_type === "string") {
                output[output.length] = parse_tree[i]
            }
            else if (node_type === "array") {
                match = parse_tree[i] // convenience purposes only
                if (match[2]) { // keyword argument
                    arg = argv[cursor]
                    for (k = 0; k < match[2].length; k++) {
                        if (!arg.hasOwnProperty(match[2][k])) {
                            throw new Error(sprintf("[sprintf] property '%s' does not exist", match[2][k]))
                        }
                        arg = arg[match[2][k]]
                    }
                }
                else if (match[1]) { // positional argument (explicit)
                    arg = argv[match[1]]
                }
                else { // positional argument (implicit)
                    arg = argv[cursor++]
                }

                if (get_type(arg) == "function") {
                    arg = arg()
                }

                if (re.not_string.test(match[8]) && re.not_json.test(match[8]) && (get_type(arg) != "number" && isNaN(arg))) {
                    throw new TypeError(sprintf("[sprintf] expecting number but found %s", get_type(arg)))
                }

                if (re.number.test(match[8])) {
                    is_positive = arg >= 0
                }

                switch (match[8]) {
                    case "b":
                        arg = arg.toString(2)
                    break
                    case "c":
                        arg = String.fromCharCode(arg)
                    break
                    case "d":
                    case "i":
                        arg = parseInt(arg, 10)
                    break
                    case "j":
                        arg = JSON.stringify(arg, null, match[6] ? parseInt(match[6]) : 0)
                    break
                    case "e":
                        arg = match[7] ? arg.toExponential(match[7]) : arg.toExponential()
                    break
                    case "f":
                        arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg)
                    break
                    case "g":
                        arg = match[7] ? parseFloat(arg).toPrecision(match[7]) : parseFloat(arg)
                    break
                    case "o":
                        arg = arg.toString(8)
                    break
                    case "s":
                        arg = ((arg = String(arg)) && match[7] ? arg.substring(0, match[7]) : arg)
                    break
                    case "u":
                        arg = arg >>> 0
                    break
                    case "x":
                        arg = arg.toString(16)
                    break
                    case "X":
                        arg = arg.toString(16).toUpperCase()
                    break
                }
                if (re.json.test(match[8])) {
                    output[output.length] = arg
                }
                else {
                    if (re.number.test(match[8]) && (!is_positive || match[3])) {
                        sign = is_positive ? "+" : "-"
                        arg = arg.toString().replace(re.sign, "")
                    }
                    else {
                        sign = ""
                    }
                    pad_character = match[4] ? match[4] === "0" ? "0" : match[4].charAt(1) : " "
                    pad_length = match[6] - (sign + arg).length
                    pad = match[6] ? (pad_length > 0 ? str_repeat(pad_character, pad_length) : "") : ""
                    output[output.length] = match[5] ? sign + arg + pad : (pad_character === "0" ? sign + pad + arg : pad + sign + arg)
                }
            }
        }
        return output.join("")
    }

    sprintf.cache = {}

    sprintf.parse = function(fmt) {
        var _fmt = fmt, match = [], parse_tree = [], arg_names = 0
        while (_fmt) {
            if ((match = re.text.exec(_fmt)) !== null) {
                parse_tree[parse_tree.length] = match[0]
            }
            else if ((match = re.modulo.exec(_fmt)) !== null) {
                parse_tree[parse_tree.length] = "%"
            }
            else if ((match = re.placeholder.exec(_fmt)) !== null) {
                if (match[2]) {
                    arg_names |= 1
                    var field_list = [], replacement_field = match[2], field_match = []
                    if ((field_match = re.key.exec(replacement_field)) !== null) {
                        field_list[field_list.length] = field_match[1]
                        while ((replacement_field = replacement_field.substring(field_match[0].length)) !== "") {
                            if ((field_match = re.key_access.exec(replacement_field)) !== null) {
                                field_list[field_list.length] = field_match[1]
                            }
                            else if ((field_match = re.index_access.exec(replacement_field)) !== null) {
                                field_list[field_list.length] = field_match[1]
                            }
                            else {
                                throw new SyntaxError("[sprintf] failed to parse named argument key")
                            }
                        }
                    }
                    else {
                        throw new SyntaxError("[sprintf] failed to parse named argument key")
                    }
                    match[2] = field_list
                }
                else {
                    arg_names |= 2
                }
                if (arg_names === 3) {
                    throw new Error("[sprintf] mixing positional and named placeholders is not (yet) supported")
                }
                parse_tree[parse_tree.length] = match
            }
            else {
                throw new SyntaxError("[sprintf] unexpected placeholder")
            }
            _fmt = _fmt.substring(match[0].length)
        }
        return parse_tree
    }

    var vsprintf = function(fmt, argv, _argv) {
        _argv = (argv || []).slice(0)
        _argv.splice(0, 0, fmt)
        return sprintf.apply(null, _argv)
    }

    /**
     * helpers
     */
    function get_type(variable) {
        return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase()
    }

    function str_repeat(input, multiplier) {
        return Array(multiplier + 1).join(input)
    }

    /**
     * export to either browser or node.js
     */
    if (typeof exports !== "undefined") {
        exports.sprintf = sprintf
        exports.vsprintf = vsprintf
    }
    else {
        window.sprintf = sprintf
        window.vsprintf = vsprintf

        if (typeof define === "function" && define.amd) {
            define(function() {
                return {
                    sprintf: sprintf,
                    vsprintf: vsprintf
                }
            })
        }
    }
})(typeof window === "undefined" ? this : window);

var _ga = {
	/*
	defaults: {
		'v': 		1,					// Version
		'tid': 		'UA-63582858-1',	// Tracking ID / Property ID
		'cid': 		555, 				// Anonymous Client ID

			'an': 	'WhoCallsTheFleet_Desktop_nw.js',
			'av': 	node.gui.App.manifest.version
	},

	counter: function(path, title, screenName){
		var data = {
			// Hit type
			't': 	'pageview'
		}

		screenName = screenName || title

		// Session Control
			if( !ga.is_init )
				data['sc'] = 'start'

		// Document Path
			if( path )
				data['dp'] = path

		// Document Title
			if( title )
				data['dt'] = title

		// Screen Name
			data['cd'] = screenName || 'Default'

		node.request({
			'uri': 		'http://www.google-analytics.com',
			'method': 	'POST',
			'formData': $.extend(true, {}, ga.defaults, data)
		}, function(err, response, body){
			_g.log(err)
			_g.log(response)
			_g.log(body)
		})

		if( !ga.is_init ){
			node.win.on('close', function(){
				node.win.hide()
				node.request({
					'uri': 		'http://www.google-analytics.com',
					'method': 	'POST',
					'formData': $.extend(true, {}, ga.defaults, {
						'sc': 	'end'
					})
				}, function(err, response, body){
					_g.log(err)
					_g.log(response)
					_g.log(body)
					node.win.close(true)
				})
			})
			ga.is_init = true
		}
	}*/
	
	//hiddenIframe: false,
	
	counter: function(path, title, screenName){
		//_g.log('ga')
		
		if( debugmode )
			return true
		/*
		ga('send', 'pageview', {
				'location':	'http://fleet.diablohu.com/ga.html',
				'page': 	'/' + path,
				'title': 	title || _frame.app_main.title
			});
		*/

		title = _frame.app_main.title

		_frame.dom.hiddenIframe[0].contentWindow.location.replace(node.url.format(
						'http://fleet.diablohu.com/ga.html' + path
						+ ( title
							? ('&title=' + encodeURIComponent(title))
							: ''
						)
					))
	}
}

// put this file before all js files when compile with a builder

"use strict";

if( typeof _g == 'undefined' )
	var _g = {}

_g.lang = _g.lang || 'zh_cn' 
// 公式来源: http://bbs.ngacn.cc/read.php?tid=8329592

let Formula = {
	// 装备类型
		equipmentType: {
			SmallCaliber:		1,		// 小口径主炮
			SmallCaliberHigh:	2,		// 小口径主炮（高角）
			SmallCaliberAA:		3,		// 小口径主炮（高射）
			MediumCaliber:		4,		// 中口径主炮
			LargeCaliber:		5,		// 大口径主炮
			SuperCaliber:		6,		// 超大口径主炮
			SecondaryGun:		7,		// 副炮
			SecondaryGunHigh:	8,		// 副炮（高角）
			SecondaryGunAA:		9,		// 副炮（高射）
			APShell:			11,		// 穿甲弹
			Torpedo:			12,		// 鱼雷
			SubmarineTorpedo:	13,		// 潜艇鱼雷
			MidgetSubmarine:	14,		// 微型潜艇
			ReconSeaplane:		15,		// 水上侦察机
			ReconSeaplaneNight:	16,		// 夜侦
			SeaplaneBomber:		17,		// 水上轰炸机
			CarrierFighter:		18,		// 舰战 / 舰载战斗机
			TorpedoBomber:		19,		// 舰攻 / 舰载鱼雷轰炸机
			DiveBomber:			20,		// 舰爆 / 舰载俯冲轰炸机
			CarrierRecon:		21,		// 舰侦 / 舰载侦察机
			Autogyro:			22,		// 旋翼机
			AntiSubPatrol:		23,		// 对潜哨戒机
			SmallRadar:			24,		// 小型雷达
			LargeRadar:			25,		// 大型雷达
			DepthCharge:		26,		// 爆雷
			Sonar:				27,		// 声纳
			LargeSonar:			28,		// 大型声纳
			AAGun:				29,		// 对空机枪
			AAGunConcentrated:	30,		// 对空机枪（集中配备）
			Searchlight:		39,		// 探照灯
			LargeFlyingBoat:	45,		// 大型水上飞艇
			SearchlightLarge:	46,		// 大型探照灯
			SuparRadar:			47,		// 超大型雷达
			CarrierRecon2:		50		// 舰侦II / 舰载侦察机II
		},
	
	// 舰种
		shipType: {
			// 航空母舰
			Carriers: [
				9,
				10,
				11
			],
			// 轻巡系
			LightCruisers: [
				2,
				3,
				21,
				28
			],
			// 潜艇
			Submarines: [
				13,
				14
			]
		},
	
	calculate: function( type, ship, equipments_by_slot, star_by_slot, rank_by_slot, options ){
		if( !type || !ship )
			return 0
		
		if( !(ship instanceof Ship) )
			ship = _g.data.ships[ship]
		
		let result = 0
			,count = {
					'main': 0,
					'secondary': 0,
					'torpedo': 0,
					'seaplane': 0,
					'apshell': 0,
					'radar': 0
				}
			,powerFire = function(){
					let result = 0
						,isCV = false
					
					// 检查是否为航母攻击模式
						if( $.inArray(ship.type, Formula.shipType.Carriers) > -1 ){
							isCV = true
						}else{
							equipments_by_slot.forEach(function(equipment){
								if( equipment && !isCV && $.inArray(equipment.type, Formula.equipmentType.CarrierBased) > -1 )
									isCV = true
							})
						}
					
					if( isCV ){
						// 航母攻击模式
						let torpedoDamage = 0
							,bombDamage = 0
						ship.slot.map(function(carry, index){
							if( equipments_by_slot[index] ){
								result+= (equipments_by_slot[index].stat.fire * 1.5) || 0
								
								if( equipments_by_slot[index].type == Formula.equipmentType.TorpedoBomber )
									torpedoDamage+= equipments_by_slot[index].stat.torpedo || 0
									
								if( equipments_by_slot[index].type == Formula.equipmentType.DiveBomber )
									bombDamage+= equipments_by_slot[index].stat.bomb || 0
								
								if( $.inArray( equipments_by_slot[index].type, Formula.equipmentType.SecondaryGuns ) > -1 )
									result+= Math.sqrt((star_by_slot[index] || 0) * 1.5)
							}
						})
						if( !torpedoDamage && !bombDamage )
							return -1
						else
							result+= ( bombDamage * 1.3 + torpedoDamage + ship.stat.fire_max ) * 1.5 + 50
						return result
					}else{
						result = ship.stat.fire_max || 0
						// 其他舰种
						let CLGunNavalNumber = 0
							,CLGunTwinNumber = 0
						ship.slot.map(function(carry, index){
							if( equipments_by_slot[index] ){
								result+= equipments_by_slot[index].stat.fire || 0
								
								// 轻巡系主炮加成
									if( $.inArray(ship.type, Formula.shipType.LightCruisers) > -1 ){
										if( equipments_by_slot[index].id == 4 || equipments_by_slot[index].id == 65 )
											CLGunNavalNumber+= 1
										if( equipments_by_slot[index].id == 119 || equipments_by_slot[index].id == 139 )
											CLGunTwinNumber+= 1
									}
								
								// 改修加成
									if( star_by_slot[index] ){
										// 忽略装备类型: 鱼雷、雷达
										if( $.inArray( equipments_by_slot[index].type, Formula.equipmentType.Torpedos.concat(Formula.equipmentType.Radars) ) < 0 ){
											let multipler = 1
											// 对潜装备
												if( $.inArray( equipments_by_slot[index].type, Formula.equipmentType.AntiSubmarines ) > -1 )
													multipler = 0.75
											// 大口径主炮
												if( $.inArray( equipments_by_slot[index].type, Formula.equipmentType.LargeCalibers ) > -1 )
													multipler = 1.5
											result+= Math.sqrt(star_by_slot[index]) * multipler
										}
									}
							}
						})
						return result + 2 * Math.sqrt(CLGunTwinNumber) + Math.sqrt(CLGunNavalNumber)
					}
					return (ship.stat.fire_max || 0)
				}
			,powerTorpedo = function(){
					let result = 0
					if( $.inArray(ship.type, Formula.shipType.Carriers) > -1 ){
						return -1
					}else{
						result = ship.stat.torpedo_max || 0
						ship.slot.map(function(carry, index){
							if( equipments_by_slot[index] ){
								result+= equipments_by_slot[index].type == Formula.equipmentType.TorpedoBomber
											? 0
											: (equipments_by_slot[index].stat.torpedo || 0)
									
								// 改修加成
									if( star_by_slot[index] ){
										let multipler = 0
										// 鱼雷
											if( $.inArray( equipments_by_slot[index].type, Formula.equipmentType.Torpedos ) > -1 )
												multipler = 1.2
										// 机枪
											if( $.inArray( equipments_by_slot[index].type, Formula.equipmentType.AAGuns ) > -1 )
												multipler = 1
										result+= Math.sqrt(star_by_slot[index]) * multipler
									}
							}
						})
						return result
					}
					return (ship.stat.torpedo_max || 0)
				}
			,value = 0
		
		equipments_by_slot = equipments_by_slot.map(function(equipment){
				if( !equipment )
					return null
				if( equipment instanceof Equipment )
					return equipment
				return _g.data.items[equipment]
			}) || []
		star_by_slot = star_by_slot || []
		rank_by_slot = rank_by_slot || []
		options = options || {}
		
		equipments_by_slot.forEach(function(equipment){
			if( !equipment )
				return
			if( $.inArray( equipment.type, Formula.equipmentType.MainGuns ) > -1 )
				count.main+= 1
			else if( $.inArray( equipment.type, Formula.equipmentType.SecondaryGuns ) > -1 )
				count.secondary+= 1
			else if( $.inArray( equipment.type, Formula.equipmentType.Torpedos ) > -1 )
				count.torpedo+= 1
			else if( $.inArray( equipment.type, Formula.equipmentType.Seaplanes ) > -1 )
				count.seaplane+= 1
			else if( equipment.type == Formula.equipmentType.APShell )
				count.apshell+= 1
			else if( $.inArray( equipment.type, Formula.equipmentType.Radars ) > -1 )
				count.radar+= 1
		})
		
		switch(type){
			// 制空战力，装备须为战斗机类型 Formula.equipmentType.Fighters
			// 计算公式参考 http://bbs.ngacn.cc/read.php?tid=8680767
			case 'fighterPower':
				value = 0
				ship.slot.map(function(carry, index){
					if( equipments_by_slot[index]
						&& $.inArray( equipments_by_slot[index].type, Formula.equipmentType.Fighters ) > -1
						&& carry
					){
						value = Math.sqrt(carry) * (equipments_by_slot[index].stat.aa || 0)
						if( equipments_by_slot[index].type == Formula.equipmentType.CarrierFighter ){
							switch( rank_by_slot[index] ){
								case 1: case '1':
									value+= 1; break;
								case 2: case '2':
									value+= 4; break;
								case 3: case '3':
									value+= 6; break;
								case 4: case '4':
									value+= 11; break;
								case 5: case '5':
									value+= 16; break;
								case 6: case '6':
									value+= 17; break;
								case 7: case '7':
									value+= 25; break;
							}
						}else if( $.inArray( equipments_by_slot[index].type, Formula.equipmentType.Recons ) == -1 ){
							let max_per_slot = equipments_by_slot[index].type == Formula.equipmentType.SeaplaneBomber
												? 9
												: 3
							value+= rank_by_slot[index] == 1
										? 1
										: max_per_slot / 6 * (rank_by_slot[index] - 1)
						}
						result+= Math.floor(value)
					}
				})
				return result
				//return Math.floor(result)
				break;

			// 同时返回制空战力的上下限
			// 返回值为Array
			case 'fighterPower_v2':
				return Formula.calcByShip.fighterPower_v2(ship, equipments_by_slot, star_by_slot, rank_by_slot)
				break;
			
			// 炮击威力，除潜艇外
			case 'shelling':
			case 'shellingDamage':
				if( $.inArray(ship.type, Formula.shipType.Submarines) > -1 ){
					return '-'
				}else{
					result = powerFire()
					if( result && result > -1 )
						return Math.floor(result) + 5
					return '-'
				}
				break;
			
			// 雷击威力，航母除外
			case 'torpedo':
			case 'torpedoDamage':
				result = powerTorpedo()
				if( result && result > -1 )
					return Math.floor(result) + 5
				return '-'
				break;
			
			// 夜战模式 & 伤害力
			case 'nightBattle':
				if( $.inArray(ship.type, Formula.shipType.Carriers) > -1 ){
					// 航母没有夜战
					return '-'
				}else{
					//console.log(count)
					result = powerFire() + powerTorpedo()
					if( count.torpedo >= 2 ){
						return '雷击CI ' + Math.floor( result * 1.5 ) + ' x 2'
					}else if( count.main >= 3 ){
						return '炮击CI ' + Math.floor( result * 2 ) + ''
					}else if( count.main == 2 && count.secondary >= 1 ){
						return '炮击CI ' + Math.floor( result * 1.75 ) + ''
					}else if( count.main >= 1 && count.torpedo == 1 ){
						return '炮雷CI ' + Math.floor( result * 1.3 ) + ' x 2'
					}else if(
						(count.main == 2 && count.secondary <= 0 && count.torpedo <= 0)
						|| (count.main == 1 && count.secondary >= 1 && count.torpedo <= 0)
						|| (count.main == 0 && count.secondary >= 2 && count.torpedo >= 0)
					){
						return '连击 ' + Math.floor( result * 1.2 ) + ' x 2'
					}else{
						return '通常 ' + Math.floor( result ) + ''
					}
				}
				break;
			
			// 命中总和
			case 'addHit':
				ship.slot.map(function(carry, index){
					if( equipments_by_slot[index] )
						result+= equipments_by_slot[index].stat.hit || 0
				})
				return result>=0 ? '+'+result : result
				break;
			
			// 装甲总和
			case 'addArmor':
				ship.slot.map(function(carry, index){
					if( equipments_by_slot[index] )
						result+= equipments_by_slot[index].stat.armor || 0
				})
				return result
				break;
			
			// 回避总和
			case 'addEvasion':
				ship.slot.map(function(carry, index){
					if( equipments_by_slot[index] )
						result+= equipments_by_slot[index].stat.evasion || 0
				})
				return result
				break;

			// 索敌能力
			case 'losPower':
				return Formula.calcByShip.losPower(ship, equipments_by_slot, star_by_slot, rank_by_slot, options)
				break;
		}
		
		return '-'
	},
	
	calcByShip: {},
	calc: {}
};

Formula.equipmentType.MainGuns = [
		Formula.equipmentType.SmallCaliber,
		Formula.equipmentType.SmallCaliberHigh,
		Formula.equipmentType.SmallCaliberAA,
		Formula.equipmentType.MediumCaliber,
		Formula.equipmentType.LargeCaliber,
		Formula.equipmentType.SuperCaliber
	];

Formula.equipmentType.LargeCalibers = [
		Formula.equipmentType.LargeCaliber,
		Formula.equipmentType.SuperCaliber
	];

Formula.equipmentType.SecondaryGuns = [
		Formula.equipmentType.SecondaryGun,
		Formula.equipmentType.SecondaryGunHigh,
		Formula.equipmentType.SecondaryGunAA
	];

Formula.equipmentType.Torpedos = [
		Formula.equipmentType.Torpedo,
		Formula.equipmentType.SubmarineTorpedo
	];

Formula.equipmentType.Seaplanes = [
		Formula.equipmentType.ReconSeaplane,
		Formula.equipmentType.ReconSeaplaneNight,
		Formula.equipmentType.SeaplaneBomber
	];

Formula.equipmentType.Fighters = [
		Formula.equipmentType.SeaplaneBomber,
		Formula.equipmentType.CarrierFighter,
		Formula.equipmentType.TorpedoBomber,
		Formula.equipmentType.DiveBomber/*,
		Formula.equipmentType.CarrierRecon*/
	];

Formula.equipmentType.Recons = [
		Formula.equipmentType.ReconSeaplane,
		Formula.equipmentType.ReconSeaplaneNight,
		Formula.equipmentType.CarrierRecon,
		Formula.equipmentType.CarrierRecon2,
		Formula.equipmentType.LargeFlyingBoat
	];

Formula.equipmentType.SeaplaneRecons = [
		Formula.equipmentType.ReconSeaplane,
		Formula.equipmentType.ReconSeaplaneNight,
		Formula.equipmentType.LargeFlyingBoat
	];

Formula.equipmentType.SeaplaneBombers = [
		Formula.equipmentType.SeaplaneBomber
	];

Formula.equipmentType.CarrierRecons = [
		Formula.equipmentType.CarrierRecon,
		Formula.equipmentType.CarrierRecon2
	];

Formula.equipmentType.CarrierBased = [
		Formula.equipmentType.CarrierFighter,
		Formula.equipmentType.TorpedoBomber,
		Formula.equipmentType.DiveBomber,
		Formula.equipmentType.CarrierRecon,
		Formula.equipmentType.CarrierRecon2
	];

Formula.equipmentType.TorpedoBombers = [
		Formula.equipmentType.TorpedoBomber
	];

Formula.equipmentType.DiveBombers = [
		Formula.equipmentType.DiveBomber
	];

Formula.equipmentType.Autogyros = [
		Formula.equipmentType.Autogyro
	];

Formula.equipmentType.AntiSubPatrols = [
		Formula.equipmentType.AntiSubPatrol
	];

Formula.equipmentType.Aircrafts = [];
	[].concat(Formula.equipmentType.Seaplanes)
		.concat(Formula.equipmentType.Recons)
		.concat(Formula.equipmentType.CarrierBased)
		.concat(Formula.equipmentType.Autogyros)
		.concat(Formula.equipmentType.AntiSubPatrols)
		.forEach(function(v){
			if( Formula.equipmentType.Aircrafts.indexOf(v) < 0 )
				Formula.equipmentType.Aircrafts.push(v)
		})

Formula.equipmentType.Radars = [
		Formula.equipmentType.SmallRadar,
		Formula.equipmentType.LargeRadar,
		Formula.equipmentType.SuparRadar
	];

Formula.equipmentType.SmallRadars = [
		Formula.equipmentType.SmallRadar
	];

Formula.equipmentType.LargeRadars = [
		Formula.equipmentType.LargeRadar,
		Formula.equipmentType.SuparRadar
	];

Formula.equipmentType.AntiSubmarines = [
		Formula.equipmentType.DepthCharge,
		Formula.equipmentType.Sonar,
		Formula.equipmentType.LargeSonar
	];

Formula.equipmentType.AAGuns = [
		Formula.equipmentType.AAGun,
		Formula.equipmentType.AAGunConcentrated
	];

Formula.equipmentType.Searchlights = [
		Formula.equipmentType.Searchlight,
		Formula.equipmentType.SearchlightLarge
	];




Formula.shellingDamage = function(ship, equipments_by_slot, star_by_slot, rank_by_slot){
	return this.calculate( 'shellingDamage', ship, equipments_by_slot, star_by_slot, rank_by_slot )
};
Formula.torpedoDamage = function(ship, equipments_by_slot, star_by_slot, rank_by_slot){
	return this.calculate( 'torpedoDamage', ship, equipments_by_slot, star_by_slot, rank_by_slot )
};
Formula.fighterPower = function(ship, equipments_by_slot, star_by_slot, rank_by_slot){
	return this.calculate( 'fighterPower', ship, equipments_by_slot, star_by_slot, rank_by_slot )
};
Formula.fighterPower_v2 = function(ship, equipments_by_slot, star_by_slot, rank_by_slot){
	return this.calculate( 'fighterPower_v2', ship, equipments_by_slot, star_by_slot, rank_by_slot )
};
Formula.nightBattle = function(ship, equipments_by_slot, star_by_slot, rank_by_slot){
	return this.calculate( 'nightBattle', ship, equipments_by_slot, star_by_slot, rank_by_slot )
};
Formula.addHit = function(ship, equipments_by_slot, star_by_slot, rank_by_slot){
	return this.calculate( 'addHit', ship, equipments_by_slot, star_by_slot, rank_by_slot )
};
Formula.addArmor = function(ship, equipments_by_slot, star_by_slot, rank_by_slot){
	return this.calculate( 'addArmor', ship, equipments_by_slot, star_by_slot, rank_by_slot )
};
Formula.addEvasion = function(ship, equipments_by_slot, star_by_slot, rank_by_slot){
	return this.calculate( 'addEvasion', ship, equipments_by_slot, star_by_slot, rank_by_slot )
};
Formula.losPower = function(ship, equipments_by_slot, star_by_slot, rank_by_slot, options){
	return this.calculate( 'losPower', ship, equipments_by_slot, star_by_slot, rank_by_slot, options )
};









// Formulas
	Formula.calc.losPower = function(data){
		// http://biikame.hatenablog.com/entry/2014/11/14/224925

		var calc = function (x) {
			x = $.extend({'(Intercept)': 1}, x);
			x['hqLv'] = (Math.ceil(x['hqLv'] / 5) * 5);
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
				x_estimate: x_estimate
				, y_estimate: y_estimate
				, x_std_error: x_std_error
				, y_std_error: y_std_error
			};
		};
		var keys = [
			'(Intercept)'
			, 'DiveBombers'
			, 'TorpedoBombers'
			, 'CarrierRecons'
			, 'SeaplaneRecons'
			, 'SeaplaneBombers'
			, 'SmallRadars'
			, 'LargeRadars'
			, 'Searchlights'
			, 'statLos'
			, 'hqLv'
		];
		var estimate_coefficients = {
			'(Intercept)': 0
			, 'DiveBombers': 1.03745043134563
			, 'TorpedoBombers': 1.3679056374142
			, 'CarrierRecons': 1.65940512636315
			, 'SeaplaneRecons': 2
			, 'SeaplaneBombers': 1.77886368594467
			, 'SmallRadars': 1.0045778494921
			, 'LargeRadars': 0.990738063979571
			, 'Searchlights': 0.906965144360512
			, 'statLos': 1.6841895400986
			, 'hqLv': -0.614246711531445
		};
		var std_error_coefficients = {
			'(Intercept)': 4.66445565766347
			, 'DiveBombers': 0.0965028505325845
			, 'TorpedoBombers': 0.108636184978525
			, 'CarrierRecons': 0.0976055279516298
			, 'SeaplaneRecons': 0.0866229392463539
			, 'SeaplaneBombers': 0.0917722496848294
			, 'SmallRadars': 0.0492773648320346
			, 'LargeRadars': 0.0491221486053861
			, 'Searchlights': 0.0658283797225724
			, 'statLos': 0.0781594211213618
			, 'hqLv': 0.0369222352426548
		};
		var correlation = {
			'(Intercept)': {
				'(Intercept)': 1
				, 'DiveBombers': -0.147020064768061
				, 'TorpedoBombers': -0.379236131621529
				, 'CarrierRecons': -0.572858669501918
				, 'SeaplaneRecons': -0.733913857017495
				, 'SeaplaneBombers': -0.642621825152428
				, 'SmallRadars': -0.674829588068364
				, 'LargeRadars': -0.707418111752863
				, 'Searchlights': -0.502304601556193
				, 'statLos': -0.737374218573832
				, 'hqLv': -0.05071933950163
			}
			, 'DiveBombers': {
				'(Intercept)': -0.147020064768061
				, 'DiveBombers': 1
				, 'TorpedoBombers': 0.288506347076736
				, 'CarrierRecons': 0.365820372770994
				, 'SeaplaneRecons': 0.425744409856409
				, 'SeaplaneBombers': 0.417783698791503
				, 'SmallRadars': 0.409046013184429
				, 'LargeRadars': 0.413855653833994
				, 'Searchlights': 0.308730607324667
				, 'statLos': 0.317984916914851
				, 'hqLv': -0.386740224500626
			}
			, 'TorpedoBombers': {
				'(Intercept)': -0.379236131621529
				, 'DiveBombers': 0.288506347076736
				, 'TorpedoBombers': 1
				, 'CarrierRecons': 0.482215071254241
				, 'SeaplaneRecons': 0.584455876852325
				, 'SeaplaneBombers': 0.558515133495825
				, 'SmallRadars': 0.547260012897553
				, 'LargeRadars': 0.560437619378443
				, 'Searchlights': 0.437934879351188
				, 'statLos': 0.533934507932748
				, 'hqLv': -0.405349979885748
			}
			, 'CarrierRecons': {
				'(Intercept)': -0.572858669501918
				, 'DiveBombers': 0.365820372770994
				, 'TorpedoBombers': 0.482215071254241
				, 'CarrierRecons': 1
				, 'SeaplaneRecons': 0.804494553748065
				, 'SeaplaneBombers': 0.75671307047535
				, 'SmallRadars': 0.748420581669228
				, 'LargeRadars': 0.767980338133817
				, 'Searchlights': 0.589651513349878
				, 'statLos': 0.743851348255527
				, 'hqLv': -0.503544281376776
			}
			, 'SeaplaneRecons': {
				'(Intercept)': -0.733913857017495
				, 'DiveBombers': 0.425744409856409
				, 'TorpedoBombers': 0.584455876852325
				, 'CarrierRecons': 0.804494553748065
				, 'SeaplaneRecons': 1
				, 'SeaplaneBombers': 0.932444440578382
				, 'SmallRadars': 0.923988080549326
				, 'LargeRadars': 0.94904944359066
				, 'Searchlights': 0.727912987329348
				, 'statLos': 0.944434077970518
				, 'hqLv': -0.614921413821462
			}
			, 'SeaplaneBombers': {
				'(Intercept)': -0.642621825152428
				, 'DiveBombers': 0.417783698791503
				, 'TorpedoBombers': 0.558515133495825
				, 'CarrierRecons': 0.75671307047535
				, 'SeaplaneRecons': 0.932444440578382
				, 'SeaplaneBombers': 1
				, 'SmallRadars': 0.864289865445084
				, 'LargeRadars': 0.886872388674911
				, 'Searchlights': 0.68310647756898
				, 'statLos': 0.88122333327317
				, 'hqLv': -0.624797255805045
			}
			, 'SmallRadars': {
				'(Intercept)': -0.674829588068364
				, 'DiveBombers': 0.409046013184429
				, 'TorpedoBombers': 0.547260012897553
				, 'CarrierRecons': 0.748420581669228
				, 'SeaplaneRecons': 0.923988080549326
				, 'SeaplaneBombers': 0.864289865445084
				, 'SmallRadars': 1
				, 'LargeRadars': 0.872011318623459
				, 'Searchlights': 0.671926570242336
				, 'statLos': 0.857213501657084
				, 'hqLv': -0.560018086758868
			}
			, 'LargeRadars': {
				'(Intercept)': -0.707418111752863
				, 'DiveBombers': 0.413855653833994
				, 'TorpedoBombers': 0.560437619378443
				, 'CarrierRecons': 0.767980338133817
				, 'SeaplaneRecons': 0.94904944359066
				, 'SeaplaneBombers': 0.886872388674911
				, 'SmallRadars': 0.872011318623459
				, 'LargeRadars': 1
				, 'Searchlights': 0.690102027588321
				, 'statLos': 0.883771367337743
				, 'hqLv': -0.561336967269448
			}
			, 'Searchlights': {
				'(Intercept)': -0.502304601556193
				, 'DiveBombers': 0.308730607324667
				, 'TorpedoBombers': 0.437934879351188
				, 'CarrierRecons': 0.589651513349878
				, 'SeaplaneRecons': 0.727912987329348
				, 'SeaplaneBombers': 0.68310647756898
				, 'SmallRadars': 0.671926570242336
				, 'LargeRadars': 0.690102027588321
				, 'Searchlights': 1
				, 'statLos': 0.723228553177704
				, 'hqLv': -0.518427865593732
			}
			, 'statLos': {
				'(Intercept)': -0.737374218573832
				, 'DiveBombers': 0.317984916914851
				, 'TorpedoBombers': 0.533934507932748
				, 'CarrierRecons': 0.743851348255527
				, 'SeaplaneRecons': 0.944434077970518
				, 'SeaplaneBombers': 0.88122333327317
				, 'SmallRadars': 0.857213501657084
				, 'LargeRadars': 0.883771367337743
				, 'Searchlights': 0.723228553177704
				, 'statLos': 1
				, 'hqLv': -0.620804120587684
			}
			, 'hqLv': {
				'(Intercept)': -0.05071933950163
				, 'DiveBombers': -0.386740224500626
				, 'TorpedoBombers': -0.405349979885748
				, 'CarrierRecons': -0.503544281376776
				, 'SeaplaneRecons': -0.614921413821462
				, 'SeaplaneBombers': -0.624797255805045
				, 'SmallRadars': -0.560018086758868
				, 'LargeRadars': -0.561336967269448
				, 'Searchlights': -0.518427865593732
				, 'statLos': -0.620804120587684
				, 'hqLv': 1
			}
		};

		var x = {
			'DiveBombers': 		0,
			'TorpedoBombers': 	0,
			'CarrierRecons':	0,
			'SeaplaneRecons':	0,
			'SeaplaneBombers':	0,
			'SmallRadars':		0,
			'LargeRadars':		0,
			'Searchlights':		0,
			'statLos':			1,
			'hqLv':				1,
		};
		
		for( var i in data ){
			x[i] = data[i]
		}
		
		return calc(x);
		//var result = calc(x);
		//var score = result.y_estimate.toFixed(1) + ' ± ' + result.y_std_error.toFixed(1);
	}









// Calculate by Ship
	Formula.calcByShip.fighterPower_v2 = function(ship, equipments_by_slot, star_by_slot, rank_by_slot){
		// http://bbs.ngacn.cc/read.php?tid=8680767
		// http://ja.kancolle.wikia.com/wiki/%E8%89%A6%E8%BC%89%E6%A9%9F%E7%86%9F%E7%B7%B4%E5%BA%A6
	
		let rankInternal = []
			,typeValue = {}
			,results = [0, 0]
	
		rankInternal[0] = [0, 9]
		rankInternal[1] = [10, 24]
		rankInternal[2] = [25, 39]
		rankInternal[3] = [40, 54]
		rankInternal[4] = [55, 69]
		rankInternal[5] = [70, 84]
		rankInternal[6] = [85, 99]
		rankInternal[7] = [100, 120]
		
		typeValue.CarrierFighter = [
			0,
			0,
			2,
			5,
			9,
			14,
			14,
			22
		]
		
		typeValue.SeaplaneBomber = [
			0,
			0,
			1,
			1,
			1,
			3,
			3,
			6
		]
	
		ship.slot.map(function(carry, index){
			if( equipments_by_slot[index]
				&& $.inArray( equipments_by_slot[index].type, Formula.equipmentType.Fighters ) > -1
				&& carry
			){
				// Math.floor(Math.sqrt(carry) * (equipments_by_slot[index].stat.aa || 0) + Math.sqrt( rankInternal / 10 ) + typeValue)
				let base = Math.sqrt(carry) * (equipments_by_slot[index].stat.aa || 0)
					,_rank = rank_by_slot[index] || 0
					,_rankInternal = rankInternal[_rank]
					,_typeValue = 0
				if( equipments_by_slot[index].type == Formula.equipmentType.CarrierFighter )
					_typeValue = typeValue.CarrierFighter[_rank]
				if( equipments_by_slot[index].type == Formula.equipmentType.SeaplaneBomber )
					_typeValue = typeValue.SeaplaneBomber[_rank]
				results[0]+= Math.floor(base + Math.sqrt( _rankInternal[0] / 10 ) + _typeValue)
				results[1]+= Math.floor(base + Math.sqrt( _rankInternal[1] / 10 ) + _typeValue)
			}
		})
		return results
	}
	
	Formula.calcByShip.losPower = function(ship, equipments_by_slot, star_by_slot, rank_by_slot, options){
		// http://biikame.hatenablog.com/entry/2014/11/14/224925
		
		options = options || {}
		options.shipLv = options.shipLv || 1
		options.hqLv = options.hqLv || 1
		
		if( options.shipLv < 0 )
			options.shipLv = 1
		if( options.hqLv < 0 )
			options.hqLv = 1
	
		var x = {
			'DiveBombers': 		0,
			'TorpedoBombers': 	0,
			'CarrierRecons':	0,
			'SeaplaneRecons':	0,
			'SeaplaneBombers':	0,
			'SmallRadars':		0,
			'LargeRadars':		0,
			'Searchlights':		0,
			'statLos':			Math.sqrt(ship.getAttribute('los', options.shipLv)),
			'hqLv':				options.hqLv,
		};
		
		equipments_by_slot.forEach(function(equipment){
			if( equipment ){
				for(let i in x){
					if( Formula.equipmentType[i]
						&& Formula.equipmentType[i].push
						&& Formula.equipmentType[i].indexOf(equipment.type) > -1
					)
						x[i]+= equipment.stat.los
				}
			}
		})
		
		return Formula.calc.losPower(x);
	}
class ItemBase {
	constructor() {
	}

	getName(language){
		language = language || _g.lang
		return this['name']
				? (this['name'][language] || this['name'])
				: null
	}
	
	get _name(){
		return this.getName()
	}
}
// Class for Entity (Person/Group, such as CVs, illustrators)

class Entity extends ItemBase{
	constructor(data) {
		super()
		$.extend(true, this, data)
	}
}
class Equipment extends ItemBase{
	constructor(data) {
		super()
		$.extend(true, this, data)
	}
	
	getName(small_brackets, language){
		language = language || _g.lang
		var result = ItemBase.prototype.getName.call(this, language)
			//,result = super.getName(language)
			,small_brackets_tag = small_brackets && !small_brackets === true ? small_brackets : 'small'
		return small_brackets
				? result.replace(/（([^（^）]+)）/g, '<'+small_brackets_tag+'>($1)</'+small_brackets_tag+'>')
				: result
	}
	
	getType(language){
		language = language || _g.lang
		return this['type']
				? _g['data']['item_types'][this['type']]['name'][language]
				: null
	}

	getIconId(){
		return _g.data.item_types[this['type']]['icon']
	}
	get _icon(){
		return 'assets/images/itemicon/' + this.getIconId() + '.png'
	}
	
	getCaliber(){
		let name = this.getName(false, 'ja_jp')
			,caliber = parseFloat(name)
		
		return caliber
	}
	
	getPower(){
		return this.stat[
			_g.data['item_types'][this['type']]['main_attribute'] || 'fire'
		]
		/*
		switch( this['type'] ){
			// Guns
				case 1:
				case 2:
				case 3:
				case 4:
				case 5:
				case 6:
				case 7:
				case 8:
				case 9:
		}
		*/
	}
}
/* Class: Ship / 舰娘

 *******************************************************************

new Ship( Object data )
	data	原始数据

 *******************************************************************

ship instanceof Ship

ship.getName( joint, language )
	获取舰名
	变量
		joint		[OPTIONAL]
			String		连接符，如果存在后缀名，则在舰名和后缀名之间插入该字符串
			Boolean		如果为 true，则添加默认连接符
						如果为 false，则不添加连接符
			null		不添加连接符
		language	[OPTIONAL]
			String		语言代码，默认为 _g.lang
	返回值
		String		舰名 + 连接符（如果有） + 后缀名（如果有）
	快捷方式
		ship._name	默认连接符，默认语言

ship.getNameNoSuffix( language )
	获取舰名，不包括后缀
	变量
		language	[OPTIONAL]
			String		语言代码，默认为 _g.lang
	返回值
		String		舰名，不包括后缀

ship.getSuffix( language )
	获取后缀名
	变量
		language	[OPTIONAL]
			String		语言代码，默认为 _g.lang
	返回值
		String		后缀名

ship.getType( language )
	获取舰种
	变量
		language	[OPTIONAL]
			String		语言代码，默认为 _g.lang
	返回值
		String		舰种
	快捷方式
		ship._type	默认语言

ship.getSeriesData()
	获取系列数据
	返回值
		Object		系列

ship.getPic( picId )
	获取图鉴uri/path
	变量
		picId	[OPTIONAL]
			Number		图鉴Id，默认 0
	返回值
		String		uri/path
	快捷方式
		ship._pics	获取全部图鉴，Array

ship.getRel( relation )
	获取关系
	变量
		relation	[OPTIONAL]
			String		关系名
	返回值
		Object			如果没有给出 relation，返回关系对象
		String||Number	如果给出 relation，返回值，默认读取 rels 下的属性，如果不存在，读取上一个改造版本的对应关系

ship.getCV( language )
	获取声优
	变量
		language	[OPTIONAL]
			String		语言代码，默认为 _g.lang
	返回值
		String		声优名
	快捷方式
		ship._cv	默认语言

ship.getIllustrator( language )
	获取画师
	变量
		language	[OPTIONAL]
			String		语言代码，默认为 _g.lang
	返回值
		String		画师名
	快捷方式
		ship._illustrator	默认语言

 */

class Ship extends ItemBase{
	constructor(data){
		super()
		$.extend(true, this, data)
	}
	
	getName(joint, language){
		joint = joint || ''
		language = language || _g.lang
		let suffix = this.getSuffix(language)
		return (
				this['name'][language] || this['name']['ja_jp']
				) + ( suffix ? (
						(joint === true ? _g.joint : joint)
						+ suffix
					) : ''
				)
	}
	
	getNameNoSuffix(language){
		language = language || _g.lang
		return this['name'][language] || this['name']['ja_jp']
	}
	
	getSuffix(language){
		language = language || _g.lang
		return this['name'].suffix
					? (
						_g.data['ship_namesuffix'][this['name'].suffix][language]
						|| _g.data['ship_namesuffix'][this['name'].suffix]['ja_jp']
						|| ''
					)
					: ''
	}
	
	getType(language){
		language = language || _g.lang
		return this['type']
				? _g['data']['ship_types'][this['type']]['full_zh']
				: null
	}
	get _type(){
		return this.getType()
	}
	
	getSeriesData(){
		return this['series']
				? _g['data']['ship_series'][this['series']]['ships']
				: [{
						'id':	this.id
					}]
	}
	
	getPic(picId){
		let series = this.getSeriesData()
		picId = parseInt(picId || 0)
		
		let getURI = function(i, p){
			if( typeof node != 'undefined' && node && node.path && _g.path.pics.ships )
				return node.path.join(_g.path.pics.ships, i + '/' +p+ '.webp')
			if( _g.path.pics.ships )
				return _g.path.pics.ships + i + '/' + p + '.png'
			return '/' + i + '/' + p + '.png'
		}
		
		for(let i=0; i<series.length; i++){
			if( series[i].id == this.id ){
				switch(picId){
					case 0:
					case 1:
					case 2:
					case 3:
					case 12:
					case 13:
					case 14:
						return getURI(this.id, picId)
						break;
					default:
						if( series[i].illust_delete ){
							return getURI(series[i-1].id, picId)
						}else{
							return getURI(this.id, picId)
						}
						break;
				}
				break;
			}
		}
	}
	get _pics(){
		let arr = []
		for(let i=0; i<15; i++){
			arr.push( this.getPic(i) )
		}
		return arr
	}
	
	getSpeed(language){
		language = language || _g.lang
		return _g.statSpeed[parseInt(this.stat.speed)]
	}
	get _speed(){
		return this.getSpeed()
	}
	
	getRange(language){
		language = language || _g.lang
		return _g.statRange[parseInt(this.stat.range)]
	}
	get _range(){
		return this.getRange()
	}
	
	getEquipmentTypes(){
		return _g.data.ship_types[this['type']].equipable.concat( ( this.additional_item_types || [] ) ).sort(function(a, b){
			return a-b
		})
	}
	
	getAttribute(attr, lvl){
		lvl = lvl || 1
		if( lvl > 150 )
			lvl = 150
		
		let getStatOfLvl = function( lvl, base, max ){
			lvl = lvl || 1
			base = parseFloat(base)
			max = parseFloat(max) || base
			if( base < 0 || max < 0 )
				return -1
			if( base == max )
				return max
			return Math.floor( base + (max - base) * lvl / 99 )
		}
		
		let value
		
		switch(attr){
			case 'hp':
				value = this['stat']['hp']
				if( lvl > 99 ){
					if (this['stat']['hp'] >= 90) value = this['stat']['hp'] + 9
					else if (this['stat']['hp'] >= 70) value = this['stat']['hp'] + 8
					else if (this['stat']['hp'] >= 50) value = this['stat']['hp'] + 7
					else if (this['stat']['hp'] >= 40) value = this['stat']['hp'] + 6
					else if (this['stat']['hp'] >= 30) value = this['stat']['hp'] + 5
					else value = this['stat']['hp'] + 4
					if (value > this['stat']['hp_max']) value = this['stat']['hp_max']
				}
				return value
				break;
			case 'speed':
				return _g.getStatSpeed( this['stat']['speed'] )
				break;
			case 'range':
				return _g.getStatRange( this['stat']['range'] )
				break;
			case 'luck':
				if( lvl > 99 )
					return (this['stat']['luck'] + 3)
				return this['stat']['luck']
				break;
			case 'fuel':
			case 'ammo':
				if( lvl > 99 )
					return Math.floor( this['consum'][attr] * 0.85 )
				return this['consum'][attr]
				break;
			case 'aa':
			case 'armor':
			case 'fire':
			case 'torpedo':
				return this['stat'][attr+'_max'] || this['stat'][attr]
				break;
			default:
				return getStatOfLvl( lvl, this['stat'][attr], this['stat'][attr + '_max'] )
				break;
		}
	}
	
	getRel( relation ){
		if( relation ){
			if( !this.rels[relation] && this.remodel && this.remodel.prev ){
				let prev = _g.data.ships[this.remodel.prev]
				while( prev ){
					if( prev.rels && prev.rels[relation] )
						return prev.rels[relation]
					if( !prev.remodel || !prev.remodel.prev )
						prev = null
					else
						prev = _g.data.ships[prev.remodel.prev]
				}
			}
			return this.rels[relation]
		}else{
			return this.rels
		}
	}
	
	getCV(language){
		let entity = this.getRel('cv')
		if( entity )
			return _g.data.entities[entity].getName(language || _g.lang)
		return
	}
	get _cv(){
		return this.getCV()
	}
	
	getIllustrator(language){
		let entity = this.getRel('illustrator')
		if( entity )
			return _g.data.entities[entity].getName(language || _g.lang)
		return
	}
	get _illustrator(){
		return this.getIllustrator()
	}
}
/* Perser for kancolle-calc.net

 *******************************************************************

_g.kancolle_calc.decode( data, version )
	解析舰载机厨格式为是谁呼叫舰队格式
	变量
		data
			String		字符串化的（stringify）JSON
			Object		JSON，原数据
		version		[OPTIONAL]
			Number		代码版本，目前支持：3；如果不填，默认为当前支持的最新版本
	返回值
		Array		是谁呼叫舰队的存储格式

_g.kancolle_calc.encode( data, version )
	将是谁呼叫舰队格式编码为舰载机厨格式
	变量
		data
			String		字符串化的（stringify）Array
			Array		原数据
		version		[OPTIONAL]
			Number		代码版本，目前支持：3；如果不填，默认为当前支持的最新版本
	返回值
		Object		舰载机厨格式

 *******************************************************************

舰载机厨格式 - V3
	{
		// 版本
		"version": 3,
		
		// 舰队#1
		"f1": {
			// 舰娘#1
			"s1": {
				"id":	330,
				"lv":	97 || null,
				"luck":	-1 || 50,		// -1 表示默认值
				"items": {
					"ix": {},
					// 装备#1
					"i1": {
						"id":	122,
						"rf":	1		// 改修星级
					}
				}
			}
		},
		
		// 舰队#2
		"f2": {},
		
		// 舰队#3
		"f3": {},
		
		// 舰队#4
		"f4": {}
	}

实例
	{"version":3,"f1":{"s1":{"id":330,"lv":97,"luck":-1,"items":{"ix":{},"i1":{"id":122,"rf":1},"i2":{"id":122,"rf":0},"i3":{"id":106,"rf":7}}},"s2":{"id":144,"lv":98,"luck":-1,"items":{"ix":{},"i1":{"id":63,"rf":1},"i2":{"id":147,"rf":0},"i3":{"id":47,"rf":3}}},"s3":{"id":145,"lv":98,"luck":-1,"items":{"ix":{},"i1":{"id":122,"rf":0},"i2":{"id":122,"rf":0},"i3":{"id":106,"rf":0}}},"s4":{"id":420,"lv":92,"luck":-1,"items":{"ix":{},"i1":{"id":122,"rf":10},"i2":{"id":91,"rf":0},"i3":{"id":106,"rf":0}}},"s5":{"id":426,"lv":87,"luck":-1,"items":{"ix":{},"i1":{"id":122,"rf":10},"i2":{"id":91,"rf":0},"i3":{"id":88,"rf":6}}},"s6":{"id":141,"lv":81,"luck":-1,"items":{"ix":{},"i1":{"id":135,"rf":10},"i2":{"id":131,"rf":0},"i3":{"id":124,"rf":0}}}},"f2":{},"f3":{},"f4":{}}
	{"version":3,"f1":{"s1":{"id":411,"lv":null,"luck":-1,"items":{"ix":{},"i1":{"id":9,"rf":10},"i2":{"id":137,"rf":10},"i3":{"id":116,"rf":6},"i4":{"id":80,"rf":0}}},"s2":{"id":427,"lv":null,"luck":-1,"items":{"ix":{},"i1":{"id":50,"rf":7},"i2":{"id":123,"rf":0},"i3":{"id":59,"rf":0},"i4":{"id":35,"rf":0}}},"s3":{"id":319,"lv":null,"luck":-1,"items":{"ix":{},"i1":{"id":50,"rf":10},"i2":{"id":123,"rf":0},"i3":{"id":102,"rf":0},"i4":{"id":35,"rf":0}}},"s4":{"id":428,"lv":null,"luck":-1,"items":{"ix":{},"i1":{"id":50,"rf":4},"i2":{"id":135,"rf":10},"i3":{"id":131,"rf":0},"i4":{"id":35,"rf":0}}},"s5":{"id":156,"lv":null,"luck":-1,"items":{"ix":{},"i1":{"id":60,"rf":0},"i2":{"id":110,"rf":0},"i3":{"id":110,"rf":0},"i4":{"id":54,"rf":0}}},"s6":{"id":278,"lv":null,"luck":-1,"items":{"ix":{},"i1":{"id":22,"rf":0},"i2":{"id":22,"rf":0},"i3":{"id":144,"rf":0},"i4":{"id":22,"rf":0}}}},"f2":{},"f3":{},"f4":{}}

可使用URL直接访问
	http://www.kancolle-calc.net/deckbuilder.html?predeck=XXOO
	使用 encodeURIComponent 对数据进行编码

 *******************************************************************

是谁呼叫舰队格式
	[
		// 舰队#1
		[
			// 舰娘#1
			[
				STRING/NUMBER 舰娘ID,
				[
					NUMBER 等级,
					NUMBER 运，如果没有特殊指定则为 -1
				],
				[
					NUMBER 装备ID,	// 实际装备
					...
				],
				[
					NUMBER 改修星级,	// 实际装备，此ARRAY可选
					...
				],
				[
					NUMBER 熟练度, 	// 实际装备，此ARRAY可选
				]
			]
		]
	]

实例
	["319",[91,40],[50,58,58,101],[7,6,0,0]]
	["144",[96,-1],[122,29,88],[1,0,0]
	["145",[96,-1],[122,29,29],[]]
	["403",[83,-1],[127,58],[0,0]]

 *******************************************************************
 */

_g.kancolle_calc = {
	version: 3,

	decode: function(data, version){
		if( !data )
			return
		if( typeof data == 'string' )
			data = JSON.parse(data)
		if( typeof data != 'object' )
			return
		version = parseInt(data.version) || this.version
		
		let result
			,i = 0
			,j = 0
			,k = 0
			,data_fleet
			,data_ship
			,data_item
			,max_fleets = 4
			,max_ships_per_fleet = 6
			,max_equipments_per_ship = 5
		
		switch(version){
			case 3:
				result = []
				i=0
				//while( data_fleet = data['f' + (i+1)] ){
				while( i<max_fleets ){
					data_fleet = data['f' + (i+1)]
					result[i] = []
					if( data_fleet ){
						j=0
						//while( data_ship = data_fleet['s' + (j+1)] ){
						while( j<max_ships_per_fleet ){
							data_ship = data_fleet['s' + (j+1)]
							if( data_ship && data_ship.id ){
								result[i][j] = [
									data_ship.id,
									[
										data_ship.lv || null,
										data_ship.luck || -1
									],
									[],
									[],
									[]
								]
								if( data_ship.items ){
									k=0
									//while( data_item = data_ship.items['i' + (k+1)] ){
									while( k<max_equipments_per_ship ){
										data_item = data_ship.items['i' + (k+1)]
										if( data_item && data_item.id ){
											result[i][j][2][k] = data_item.id
											result[i][j][3][k] = data_item.rf || null
											result[i][j][4][k] = data_item.rp || null
										}else{
											result[i][j][2][k] = null
											result[i][j][3][k] = null
											result[i][j][4][k] = null
										}
										k++
									}
								}
							}else{
								result[i][j] = null
							}
							j++
						}
					}
					i++
				}
				break;
		}
		
		return result
	},

	encode: function(data, version){
		if( !data )
			return
		if( !data.length || !data.push )
			data = JSON.parse(data)
		if( !data.length || !data.push )
			return
		version = parseInt(version) || this.version
		
		let result
		
		switch(version){
			case 3:
				result = {
					'version': 3
				}
				data.forEach(function(data_fleet, i){
					result['f' + (i+1)] = {}
					data_fleet.forEach(function(data_ship, j){
						if( data_ship[0] ){
							result['f' + (i+1)]['s' + (j+1)] = {
								'id':	parseInt(data_ship[0]),
								'lv':	parseInt(data_ship[1][0]) || null,
								'luck':	parseInt(data_ship[1][1]) || -1,
								'items':{
									'ix': {}
								}
							}
							data_ship[2].forEach(function(id_item, k){
								if( id_item ){
									result['f' + (i+1)]['s' + (j+1)].items['i' + (k+1)] = {
										'id':	parseInt(id_item)
									}
									if( data_ship[3] )
										result['f' + (i+1)]['s' + (j+1)].items['i' + (k+1)].rf
											= parseInt(data_ship[3][k]) || 0
									if( data_ship[4] )
										result['f' + (i+1)]['s' + (j+1)].items['i' + (k+1)].rp
											= parseInt(data_ship[4][k]) || 0
								}
							})
						}
					})
				})
				break;
		}
		
		return result
	}
}
// node.js modules
	node.require('fs')
	node.require('nedb')
	node.require('mkdirp')
	node.require('request')
	node.require('request-progress')
	node.require('semver')
	node.require('url')

	var Q = node.require('q')
		,markdown = node.require( "markdown" ).markdown





// Global Variables
	_g.event = {
		'animationend':			'webkitAnimationEnd',
		'animationiteration':	'webkitAnimationIteration',
		'transitionend':		'transitionend'
	};
	
	_g.path = {
		'db': 		node.path.join(_g.root, '/app-db/'),
		'page': 	node.path.join(_g.root, '/app/page/'),
		'bgimg_dir':node.path.join(_g.root, '/app/assets/images/homebg/'),
		'pics': {
			'ships': 	node.path.join(_g.root, '/pics/ships/'),
			'items': 	node.path.join(_g.root, '/pics/items/')
		}
	}

	_g.pathMakeObj = function(obj){
		for( var i in obj ){
			if( typeof obj[i] == 'object' ){
				_g.pathMakeObj( obj[i] )
			}else{
				node.mkdirp.sync( obj[i] )
			}
		}
	}
	_g.pathMakeObj( _g.path )

	_g.data = {
		'entities': {},

		'items': {},
		'item_types': {},

		'ships': {},
		'ship_id_by_type': [], 			// refer to _g.ship_type_order
		'ship_types': {},
		'ship_type_order': {},
		'ship_classes': {}
	}

	var _db = {
		'fleets': new node.nedb({
				filename: 	node.path.join(node.gui.App.dataPath, 'NeDB/fleets.json')
			})
	}
	_g.ship_type_order = []
	_g.ship_type_order_map = {}











// extend NeDB
	// 根据 _id 更新数据，替换为新内容 docReplace，并执行 callback
	// 该方法会采用队列，即上一个更新操作正在进行时，新的更新操作会进入队列
		// 此时如果又有新的更新操作，之前队列的更新操作会被替换
		// 注：前一个callback将不会执行 
		node.nedb.prototype.updateById = function( _id, docReplace, callback ){
			if( !this._updateByIdQueue ){
				this._updateByIdQueue = {}
				Object.defineProperty(this._updateByIdQueue, 'running', {
					enumerable: false,
					value: false,
					writable: true
				})
			}
			
			docReplace = docReplace || {}
			docReplace._id = _id
			
			this._updateByIdQueue[_id] = {
				docReplace: docReplace,
				callback: callback || function(){}
			}
			
			this._updateById()
		}
		node.nedb.prototype._updateById = function(){
			if( !this._updateByIdQueue || this._updateByIdQueue.running )
				return false

			let _id
			for(let i in this._updateByIdQueue){
				if( this._updateByIdQueue[i] ){
					_id = i
					break;
				}
			}
			
			if( !_id )
				return false
			
			let queue = this._updateByIdQueue[_id]
			
			this._updateByIdQueue[_id] = null
			delete this._updateByIdQueue[_id]
			
			this._updateByIdQueue.running = true
			
			this.update({
				_id: _id
			}, queue.docReplace, {}, function (err, numReplaced) {
				queue.callback.call(this, err, numReplaced)
				this._updateByIdQueue.running = false
				this._updateById()
			}.bind(this))
		}
















// Global Functions
	_g.statSpeed = {
		5: 	'低速',
		10: '高速'
	}
	_g.statRange = {
		1: 	'短',
		2: 	'中',
		3: 	'长',
		4: 	'超长'
	}
	_g.textRank = {
		1:	'|',
		2:	'||',
		3:	'|||',
		4:	'\\',
		5:	'\\\\',
		6:	'\\\\\\',
		7:	'》'
	}
	_g.getStatSpeed = function( speed ){
		speed = parseInt(speed)
		return _g.statSpeed[speed]
	}
	_g.getStatRange = function( range ){
		range = parseInt(range)
		return _g.statRange[range]
	}
	/*
		moved to Ship.getName()
	_g.getName = function( nameObj, joint, lang ){
		joint = joint || ''
		if( !nameObj )
			return null
		return (
				nameObj[ _g.lang ] || nameObj['ja_jp']
				) + (
				nameObj.suffix ? (
						joint + (
								_g.data['ship_namesuffix'][nameObj.suffix][ _g.lang ] || _g.data['ship_namesuffix'][nameObj.suffix]['ja_jp']
							)
					) : ''
				)
	}
	*/
	_g.log = function(){
		if( debugmode )
			console.log.apply(console, arguments)
	}
















// Global Frame
_frame.app_main = {
	page: {},
	page_dom: {},
	page_html: {},

	// is_init: false
	//bgimg_dir: 	'./app/assets/images/homebg',
	bgimgs: 	[],
	// cur_bgimg_el: null

	// cur_page: null

	// 尚未载入完毕的内容
		loading: [
			'dbs',
			'bgimgs',
			'db_namesuffix'
		],
		// is_loaded: false,

	// 页面初始化载入完毕后执行的函数组
		functions_on_ready: [],

	// 载入完毕一项内容，并检查其余内容是否载入完毕
	// 如果全部载入完毕，#layout 添加 .ready
		loaded: function( item, is_instant ){
			if( item ){
				var index = _frame.app_main.loading.indexOf(item)
				if( index > -1 ){
					_frame.app_main.loading.splice(_frame.app_main.loading.indexOf(item), 1)
					_frame.app_main.is_loaded = false
				}
			}
			if( !_frame.app_main.loading.length && !_frame.app_main.is_loaded ){
				setTimeout(function(){
					if( _frame.app_main.is_loaded && !_frame.app_main.loading.length && !$html.hasClass('app-ready') ){
						_frame.dom.layout.addClass('ready')
						$html.addClass('app-ready')
						setTimeout(function(){
							for(let i=0; i<_frame.app_main.functions_on_ready.length; i++){
								_frame.app_main.functions_on_ready[i]()
							}
						}, 1500)
					}
				}, is_instant ? 300 : 1000)

				// 绑定onhashchange事件
				//	$window.on('hashchange.pagechange', function(){
				//		_frame.app_main.load_page_func(_g.uriHash('page'))
				//	})

				// 初次检查 uriSearch
					if( !this.window_event_bound ){
						$window.on('popstate._global', function(e){
							if( e.originalEvent && e.originalEvent.state ){
								_frame.app_main.state( e.originalEvent.state )
							}else{
								var _uriGet = location.search ? location.search.split('?')[1] : ''
									,uriGet = {}
								_uriGet = _uriGet.split('&');
								for(var i=0;i<_uriGet.length;i++){
									var h=_uriGet[i].split('=')
									uriGet[h[0]] = h[1] || true
								}
								// 首次运行，检查是否存在 page
								// 如果URI未指定，自动加载 Lockr.get('last_page') || 第一个导航页
									if( !_frame.app_main.window_event_bound && !(uriGet['page'] || uriGet['infos']) ){
										_frame.app_main.load_page(
											Lockr.get('last_page', _frame.app_main.nav[0]['page'])
										)
										//_frame.app_main.load_page( _frame.app_main.nav[0]['page'] )
										//uriGet['page'] = _frame.app_main.nav[0]['page']
									}
								_frame.app_main.state( uriGet )
							}
						}).trigger('popstate._global')
						this.window_event_bound = true
					}

				//_frame.app_main.load_page_func(_g.uriHash('page'))
				_frame.app_main.is_loaded = true
			}
		},


	// pushState
		pushState: function( stateObj, title, url ){
			history.pushState( stateObj, title, url )

			if( !stateObj['infos'] )
				_frame.infos.hide()
		},


	// 根据 history state 运行相应函数
		state: function( stateObj ){
			//_g.log( stateObj )
			if( stateObj['infos'] ){
				_frame.infos.show_func( stateObj['infos'], stateObj['id'], null, stateObj['infosHistoryIndex'] )
			}else{
				_frame.infos.hide()
			}
			if( stateObj['page'] ){
				this.load_page_func( stateObj['page'] )
			}
		},


	// 更换背景图
		//change_bgimg_fadein: false,
		//change_bgimg_oldEl: null,
		change_bgimg: function( bgimgs_new ){
			// _frame.app_main.bgimgs 未生成，函数不予执行
			if( !_frame.app_main.bgimgs.length )
				return false

			var bgimgs = bgimgs_new && bgimgs_new.length ? bgimgs_new : _frame.app_main.bgimgs
				,img_new = bgimgs[_g.randInt(bgimgs.length)]
				,img_old = _frame.app_main.cur_bgimg_el ? _frame.app_main.cur_bgimg_el.css('background-image') : null

			img_old = img_old ? img_old.split('/') : null
			img_old = img_old ? img_old[img_old.length - 1].split(')') : null
			img_old = img_old ? img_old[0] : null

			while( img_new == img_old ){
				img_new = bgimgs[_g.randInt(bgimgs.length - 1)]
			}

			var img_new_blured = 'file://' + encodeURI( node.path.join( _g.path.bgimg_dir , '/blured/' + img_new ).replace(/\\/g, '/') )
			this.bgimg_path = node.path.join( _g.path.bgimg_dir , '/' + img_new )
			img_new = 'file://' + encodeURI( this.bgimg_path.replace(/\\/g, '/') )

			//function delete_old_dom( old_dom ){
			//	setTimeout(function(){
			//		old_dom.remove()
			//	}, _g.animate_duration_delay)
			//}

			if( img_old ){
				this.change_bgimg_oldEl = _frame.app_main.cur_bgimg_el
				//delete_old_dom( _frame.app_main.cur_bgimg_el )
			}

			//_frame.app_main.cur_bgimg_el = $('<img src="' + img_new + '" />').appendTo( _frame.dom.bgimg )
			_frame.app_main.cur_bgimg_el = $('<div/>').css('background-image','url('+img_new+')').appendTo( _frame.dom.bgimg )
											.add( $('<s'+( _frame.app_main.change_bgimg_fadein ? ' class="fadein"' : '' )+'/>').css('background-image','url('+img_new_blured+')').appendTo( _frame.dom.nav ) )
											.add( $('<s'+( _frame.app_main.change_bgimg_fadein ? ' class="fadein"' : '' )+'/>').css('background-image','url('+img_new_blured+')').appendTo( _frame.dom.main ) )

			if( _frame.dom.bg_controls )
				_frame.app_main.cur_bgimg_el = _frame.app_main.cur_bgimg_el
											.add( $('<s'+( _frame.app_main.change_bgimg_fadein ? ' class="fadein"' : '' )+'/>').css('background-image','url('+img_new_blured+')').appendTo( _frame.dom.bg_controls) )

			_frame.app_main.change_bgimg_fadein = true
		},
		change_bgimg_after: function(oldEl){
			oldEl = oldEl || this.change_bgimg_oldEl
			if( oldEl ){
				this.change_bgimg_oldEl.remove()
				this.change_bgimg_oldEl = null
			}
		},





	// 隐藏内容，只显示背景图
		toggle_hidecontent: function(){
			_frame.dom.layout.toggleClass('hidecontent')
		},





	// 更换页面
		load_page: function( page, options ){
			if( _frame.app_main.cur_page == page || !page )
				return page

			options = options || {}

			this.pushState(
				{
					'page': 	page
				},
				null,
				'?page=' + page
			)
			
			this.load_page_func( page, options )

			if( options.callback_modeSelection_select ){
				_frame.app_main.page_dom[page].trigger('modeSelectionEnter', [
					options.callback_modeSelection_select || function(){},
					options.callback_modeSelection_enter || function(){}
				])
			}else{
				_frame.app_main.mode_selection_off()
			}
			//_g.uriHash('page', page)
		},
		load_page_func: function( page, options ){
			_g.log( 'PREPARE LOADING: ' + page )
			options = options || {}
			
			if( !page )
				return page
			
			// 检查page合法性，如果失效，读取第一个导航项
				let checked = false
					
				if( page == 'donate' ){
					checked = true
				}if( !_frame.app_main.cur_page ){
					_frame.app_main.nav.forEach(function(currentValue){
						if( page == currentValue.page )
							checked = true
					})
				}else{
					checked = true
				}
				
				if( !checked ){
					page = _frame.app_main.nav[0].page
					_frame.app_main.load_page(page, options)
					return page
				}

			if( !_frame.app_main.page_dom[page] ){
				_frame.app_main.page_dom[page] = $('<div class="page-container" page="'+page+'"/>').appendTo( _frame.dom.main )
				this.page_html[page] = node.fs.readFileSync(_g.path.page + page + '.html', 'utf8')
				if(this.page_html[page]){
					_frame.app_main.page_dom[page].html( this.page_html[page] )
					if( _frame.app_main.page[page] && _frame.app_main.page[page].init )
						_frame.app_main.page[page].init(_frame.app_main.page_dom[page])
					_p.initDOM(_frame.app_main.page_dom[page])
				}
			}
			
			_frame.app_main.page_dom[page].trigger('show')

			if( !options.callback_modeSelection_select ){
				_frame.app_main.title = _frame.app_main.navtitle[page]
				_frame.infos.last = null
	
				_ga.counter(
					location.search
				)
			}

			console.log(_frame.app_main.cur_page)
			if( _frame.app_main.cur_page == page )
				return page

			_frame.app_main.page_dom[page].removeClass('off').trigger('on')

			// 关闭之前的页面
				if( _frame.app_main.cur_page ){
					if( _frame.dom.navs[_frame.app_main.cur_page] )
						_frame.dom.navs[_frame.app_main.cur_page].removeClass('on')
					if( _frame.app_main.page_dom[_frame.app_main.cur_page] )
						_frame.app_main.page_dom[_frame.app_main.cur_page].addClass('off').trigger('pageoff')
				}

			if( _frame.dom.navs[page] )
				_frame.dom.navs[page].addClass('on')

			if( !options.callback_modeSelection_select ){
				if( _frame.dom.layout.hasClass('ready') )
					_frame.app_main.change_bgimg()

				if( page != 'about' )
					Lockr.set('last_page', page)
			}
			
			_frame.dom.main.attr('data-theme', page)
			_frame.app_main.cur_page = page

			_g.log( 'LOADED: ' + page )
		},







	// 仅显示背景图
		// only_bg: false,
		only_bg_on: function(){
			if( this.only_bg )
				return true

			if( !_frame.dom.bg_controls ){
				_frame.dom.bg_controls = $('<div class="bg_controls"/>')
						.on(eventName('transitionend', 'only_bg_off'), function(e){
							if( e.currentTarget == e.target
								&& e.originalEvent.propertyName == 'bottom'
								&& _frame.dom.layout.hasClass('only_bg')
								&& $(this).offset().top >= $body.height()
							){
								_frame.dom.layout.removeClass('only_bg')
								_frame.app_main.only_bg = false
							}
						})
						.appendTo(_frame.dom.layout)

				_frame.app_main.cur_bgimg_el = _frame.app_main.cur_bgimg_el.add(
						_frame.app_main.cur_bgimg_el.eq(0).clone().appendTo( _frame.dom.bg_controls)
					)

				$('<button class="prev" icon="arrow-left"/>')
						.on('click', function(){
							var pathParse = node.path.parse(_frame.app_main.bgimg_path)
								,index = $.inArray( pathParse['base'], _frame.app_main.bgimgs ) - 1
							if( index < 0 )
								index = _frame.app_main.bgimgs.length - 1
							_frame.app_main.change_bgimg( [_frame.app_main.bgimgs[index]] )
						})
						.appendTo(_frame.dom.bg_controls)

				$('<button class="back"/>')
						.html('返回')
						.on('click', function(){
							_frame.app_main.only_bg_off()
						})
						.appendTo(_frame.dom.bg_controls)

				$('<button class="back"/>')
						.html('保存图片')
						.on('click', function(){
							var pathParse = node.path.parse(_frame.app_main.bgimg_path)
								,index = $.inArray( pathParse['base'], _frame.app_main.bgimgs )
							_g.file_save_as( _frame.app_main.bgimg_path, (index + 1) + pathParse['ext'] )
						})
						.appendTo(_frame.dom.bg_controls)

				$('<button class="next" icon="arrow-right"/>')
						.on('click', function(){
							var pathParse = node.path.parse(_frame.app_main.bgimg_path)
								,index = $.inArray( pathParse['base'], _frame.app_main.bgimgs ) + 1
							if( index >= _frame.app_main.bgimgs.length )
								index = 0
							_frame.app_main.change_bgimg( [_frame.app_main.bgimgs[index]] )
						})
						.appendTo(_frame.dom.bg_controls)
			}

			_frame.dom.layout.addClass('only_bg')
			setTimeout(function(){
				_frame.dom.bg_controls.addClass('on')
			}, 10)

			this.only_bg = true
		},
		only_bg_off: function(){
			if( !this.only_bg )
				return true
			_frame.dom.bg_controls.removeClass('on')
			//_frame.dom.layout.removeClass('only_bg')
			//this.only_bg = false
		},
		only_bg_toggle: function(){
			if( this.only_bg )
				return this.only_bg_off()
			return this.only_bg_on()
		},








	init: function(){
		if( _frame.app_main.is_init )
			return true

		// 创建基础框架
			_frame.dom.nav = $('<nav/>').appendTo( _frame.dom.layout )
				_frame.dom.logo = $('<button class="logo" />')
									.on(_g.event.animationend, function(e){
										_frame.dom.logo.addClass('ready-animated')
									})
									/*
									.on({
										'animationend, webkitAnimationEnd': function(e){
											$(this).addClass('ready-animated')
										}
									})*/
									.appendTo( _frame.dom.nav )
				/*
				_frame.dom.logo = $('<button class="logo" />').on('click', function(){
										_frame.app_main.toggle_hidecontent()
									})
									.html('<strong>' + node.gui.App.manifest['name'] + '</strong><b>' + node.gui.App.manifest['name'] + '</b>')
									.on({
										'animationend, webkitAnimationEnd': function(e){
											$(this).addClass('ready-animated')
										}
									})
									.appendTo( _frame.dom.nav )
				*/
				_frame.dom.navlinks = $('<div class="pages"/>').appendTo( _frame.dom.nav )
					_frame.dom.globaloptions = $('<section class="options"/>').appendTo( _frame.dom.nav )
						_frame.dom.btnDonates = $('<button class="donate" icon="heart4"/>')
												.on('click', function(){_frame.app_main.load_page('donate')}).appendTo( _frame.dom.globaloptions )
						_frame.dom.btnShowOnlyBg = $('<button class="show_only_bg" icon="images"/>')
												.on('click', function(){_frame.app_main.only_bg_toggle()}).appendTo( _frame.dom.globaloptions )
					_frame.dom.btnShowOnlyBgBack = $('<button class="show_only_bg_back" icon="arrow-set2-left"/>')
											.on('click', function(){_frame.app_main.only_bg_off()}).appendTo( _frame.dom.nav )
				_frame.dom.btnsHistory = $('<div class="history"/>').appendTo( _frame.dom.nav )
					_frame.dom.btnHistoryBack = $('<button class="button back" icon="arrow-set2-left"/>')
							.on({
								'click': function(){
									_frame.dom.btnHistoryForward.removeClass('disabled')
									history.back()
								}
							}).appendTo( _frame.dom.btnsHistory )
					_frame.dom.btnHistoryForward = $('<button class="button forward disabled" icon="arrow-set2-right"/>')
							.on('click', function(){
								history.forward()
							}).appendTo( _frame.dom.btnsHistory )
			_frame.dom.main = $('<main/>').appendTo( _frame.dom.layout )
			_frame.dom.bgimg = $('<div class="bgimg" />').appendTo( _frame.dom.layout )

		// 功能按钮：反馈信息
		/*
			$('#titlebar>.buttons')
				.prepend(
					$('<button/>',{
						'icon': 	'cog',
						'html': 	'反馈信息'
					})
				)
		*/

		// 创建主导航
			if( _frame.app_main.nav && _frame.app_main.nav.length ){
				_frame.dom.navs = {}
				_frame.app_main.navtitle = {}
				_frame.app_main.nav.forEach(function(o, i){
					_frame.app_main.navtitle[o.page] = o.title
					_frame.dom.navs[o.page] = (function(page){
								return $('<button class="button" />').on('click', function(){
										_frame.app_main.load_page(page)
									})
							})(o.page).html(o.title).appendTo( _frame.dom.navlinks )
					if( o.state )
						_frame.dom.navs[o.page].attr('mod-state', o.state)
					//if( (i == 0 && !_g.uriHash('page') && !_g.uriSearch('page'))
					//	|| o.page == _g.uriSearch('page')
					//){
					//	_frame.dom.navs[o.page].trigger('click')
					//}
				})
			}

		var promise_chain 	= Q.fcall(function(){})

		// 开始异步函数链
			promise_chain

		// 检查 aap-db 目录，预加载全部数据库
			.then(function(){
				var deferred = Q.defer()
				node.fs.readdir(_g.path.db, function(err, files){
					if( err ){
						deferred.reject(new Error(err))
					}else{
						files.forEach(function(file){
							_db[ node.path.parse(file)['name'] ]
								= new node.nedb({
										filename: 	node.path.join(_g.path.db, '/' + file)
									})
						})
						deferred.resolve(files)
					}
				})
				return deferred.promise
			})

		// 获取背景图列表，生成背景图
			.then(function(){
				_g.log('背景图: START')
				var deferred = Q.defer()
				node.fs.readdir(_g.path.bgimg_dir, function(err, files){
					if( err ){
						deferred.reject(new Error(err))
					}else{
						var bgimgs_last = _config.get('bgimgs')
							,bgimgs_new = []
						bgimgs_last = bgimgs_last ? bgimgs_last.split(',') : []
						files.forEach(function(file){
							var lstat = node.fs.lstatSync( node.path.join( _g.path.bgimg_dir , '/' + file) )
							if( !lstat.isDirectory() ){
								_frame.app_main.bgimgs.push( file )

								// 存在bgimgs_last：直接比对
								// 不存在bgimgs_last：比对每个文件，找出最新者
								if( bgimgs_last.length ){
									if( $.inArray( file, bgimgs_last ) < 0 )
										bgimgs_new.push( file )
								}else{
									var ctime = parseInt(lstat.ctime.valueOf())
									if( bgimgs_new.length ){
										if( ctime > bgimgs_new[1] )
											bgimgs_new = [ file, ctime ]
									}else{
										bgimgs_new = [ file, ctime ]
									}
								}
							}
						})
						if( !bgimgs_last.length )
							bgimgs_new.pop()
						_config.set(
							'bgimgs',
							_frame.app_main.bgimgs
						)
						_frame.app_main.change_bgimg( bgimgs_new );
						_frame.app_main.loaded('bgimgs')
						//if( !_g.uriHash('page') )
						//	_frame.app_main.load_page( _frame.app_main.nav[0].page )
						//setTimeout(function(){
						//	_frame.dom.layout.addClass('ready')
						//}, 1000)
						_g.log('背景图: DONE')
						deferred.resolve()
					}
				})
				return deferred.promise
			})

		// 读取db
			.then(function(){
				_g.log('Preload All DBs: START')
				var the_promises = []
					,dbs = []
					,loaded_count = 0

				for( var db_name in _db ){
					dbs.push(db_name)
				}

				dbs.forEach(function(db_name){
					var deferred = Q.defer()
					function _done(_db_name){
						_g.log('DB ' + _db_name + ' DONE')
						deferred.resolve()
						loaded_count++
						if( loaded_count >= dbs.length ){
							_g.log('Preload All DBs: DONE')
							setTimeout(function(){
								_frame.app_main.loaded('dbs')
							}, 100)
						}
					}
					_db[db_name].loadDatabase(function(err){
						if( err ){
							deferred.reject(new Error(err))
						}else{
							switch( db_name ){
								/*
									case 'entities':
									case 'items':
									case 'item_types':
									case 'ship_classes':
									case 'ship_types':
										_db[db_name].find({}, function(err, docs){
											if( typeof _g.data[db_name] == 'undefined' )
												_g.data[db_name] = {}
											for(var i in docs ){
												_g.data[db_name][docs[i]['id']] = docs[i]
											}
											_db_load_next()
										})
										break;
									*/
								case 'ships':
								case 'fleets':
									_done(db_name);
									break;
								case 'ship_namesuffix':
									_db.ship_namesuffix.find({}).sort({ 'id': 1 }).exec(function(dberr, docs){
										if( dberr ){
											deferred.reject(new Error(dberr))
										}else{
											_g.data.ship_namesuffix = [{}].concat(docs)
											_frame.app_main.loaded('db_namesuffix')
											_done(db_name)
										}
									})
									break;
								case 'ship_type_order':
									_db.ship_type_order.find({}).sort({'id': 1}).exec(function(dberr, docs){
										if( dberr ){
											deferred.reject(new Error(dberr))
										}else{
											docs.forEach(function(doc,i){
												_g.ship_type_order.push(
													doc['types'].length > 1 ? doc['types'] : doc['types'][0]
												)
												//_g.data['ship_type_order'][doc['id']] = doc
												_g.data['ship_type_order'][i] = doc
											})
											// ship type -> ship order
												_g.ship_type_order.forEach(function(currentValue, i){
													if( typeof _g.ship_type_order[i] == 'object' ){
														_g.ship_type_order[i].forEach(function(cur, j){
															_g.ship_type_order_map[ _g.ship_type_order[i][j] ] = i
														})
													}else{
														_g.ship_type_order_map[ _g.ship_type_order[i] ] = i
													}
												})
											_db.ships.find({}).sort({
												//'class': 1, 'class_no': 1, 'series': 1, 'type': 1, 'time_created': 1, 'name.suffix': 1
												'type': 1, 'class': 1, 'class_no': 1, 'time_created': 1, 'name.suffix': 1
											}).exec(function(dberr2, docs){
												if( dberr2 ){
													deferred.reject(new Error(dberr))
												}else{
													docs.forEach(function(doc){
														_g.data.ships[doc['id']] = new Ship(doc)

														if( typeof _g.data.ship_id_by_type[ _g.ship_type_order_map[doc['type']] ] == 'undefined' )
															_g.data.ship_id_by_type[ _g.ship_type_order_map[doc['type']] ] = []
														_g.data.ship_id_by_type[ _g.ship_type_order_map[doc['type']] ].push( doc['id'] )
													})
													function __(i){
														let j=0
														while(
															_g.data.ship_id_by_type[i]
															&& _g.data.ship_id_by_type[i][j]
														){
															let id = _g.data.ship_id_by_type[i][j]
																,i_remodel
																,next_id = _g.data.ships[id].remodel ? _g.data.ships[id].remodel.next : null
															if( next_id
																&& _g.data.ships[next_id]
																&& next_id != _g.data.ship_id_by_type[i][j+1]
																&& (i_remodel = $.inArray(next_id, _g.data.ship_id_by_type[i])) > -1
															){
																_g.log(
																	id
																	+ ', ' + next_id
																	+ ', ' + i_remodel
																)
																_g.data.ship_id_by_type[i].splice(
																	i_remodel,
																	1
																)
																_g.data.ship_id_by_type[i].splice(
																	$.inArray(id, _g.data.ship_id_by_type[i])+1,
																	0,
																	next_id
																)
																//console.log(_g.data.ship_id_by_type[i])
																__(i)
																break
															}
															if( j >= _g.data.ship_id_by_type[i].length - 2 ){
																i++
																j=0
															}else{
																j++
															}
														}
													}
													__(0)
													_done(db_name)
												}
											})
										}
									})
									break;
								case 'updates':
									if( typeof _g.data[db_name] == 'undefined' )
										_g.data[db_name] = {}
									_done(db_name)
									break;
								case 'arsenal_all':
									_g.data['arsenal_all'] = []
									_db.arsenal_all.find({}).sort({
										'sort': 1
									}).exec(function(err, docs){
										docs.forEach(function(doc){
											_g.data['arsenal_all'].push(doc['id'])
										})
										_done(db_name)
									})
									break;
								case 'arsenal_weekday':
									_g.data['arsenal_weekday'] = {}
									_db.arsenal_weekday.find({}).sort({
										'weekday': 1
									}).exec(function(err, docs){
										docs.forEach(function(doc, i){
											_g.data['arsenal_weekday'][i]
												= doc.improvements
										})
										_done(db_name)
									})
									break;
								default:
									_db[db_name].find({}, function(dberr, docs){
										if( dberr ){
											deferred.reject(new Error(dberr))
										}else{
											if( typeof _g.data[db_name] == 'undefined' )
												_g.data[db_name] = {}
											docs.forEach(function(doc){
												switch( db_name ){
													case 'items':
														_g.data[db_name][doc['id']] = new Equipment(doc)
														break;
													case 'entities':
														_g.data[db_name][doc['id']] = new Entity(doc)
														break;
													default:
														_g.data[db_name][doc['id']] = doc
														break;
												}
											})
											_done(db_name)
										}
									})
									break;
							}

						}
					})
					the_promises.push(deferred.promise)
				})

				return Q.all(the_promises);
			})

		// 根据装备大类和类型排序整理装备ID
			.then(function(){
				var deferred = Q.defer()
				_g.data.item_id_by_type = []
				_g.item_type_order = []
				var type_by_collection = {}
					,type_order_map = {}
				// 遍历大类
					for(var i in _g.data.item_type_collections){
						for(var j in _g.data.item_type_collections[i]['types']){
							type_by_collection[ _g.data.item_type_collections[i]['types'][j] ] = i
							_g.item_type_order.push( _g.data.item_type_collections[i]['types'][j] )
							type_order_map[ _g.data.item_type_collections[i]['types'][j] ] = _g.item_type_order.length - 1
						}
					}
				// 遍历装备数据
					for(var i in _g.data.items){
						var order = type_order_map[ _g.data.items[i]['type'] ]
						if( !_g.data.item_id_by_type[order] )
							_g.data.item_id_by_type[order] = {
								'collection': type_by_collection[_g.data.items[i]['type']],
								'equipments': [],
								'names': []
							}
						_g.data.item_id_by_type[order]['equipments'].push( _g.data.items[i]['id'] )
						_g.data.item_id_by_type[order]['names'].push( _g.data.items[i].getName() )
					}
				// 排序
					_g.data.item_id_by_type.forEach(function(currentValue){
						currentValue['equipments'].sort(function(a, b){
							let diff = _g.data.items[a].getPower() - _g.data.items[b].getPower()
							if( diff === 0 ){
								let diff_aa = _g.data.items[a]['stat']['aa'] - _g.data.items[b]['stat']['aa']
								if( diff_aa === 0 ){
									return _g.data.items[a]['stat']['hit'] - _g.data.items[b]['stat']['hit']
								}
								return diff_aa
							}
							return diff
						})
					})
				setTimeout(function(){
					deferred.resolve()
				}, 100)
				return deferred.promise
			})

		// 如果从启动器载入，检查数据是否有更新
			.then(function(){
				_g.log('数据更新检查: START')
				if( global.launcherOptions && global.launcherOptions["dataUpdated"] )
					return global.launcherOptions["dataUpdated"]
				return {}
			})
			.then(function(dataUpdated){
				var the_promises = []
					,updated = []
					,done_count = 0
					,doms = $()

				for(var i in dataUpdated){
					var version = dataUpdated[i].split('.')
						,_version = ''

					for( var j = 0; j < Math.min(3, version.length); j++ )
						_version+= '.' + version[j]

					_version = _version.substr(1)
					updated.push({
						'type': 	i,
						'version': 	_version
					})
				}

				if( !updated.length ){
					_g.log('数据更新检查: DONE，无数据更新')
					return false
				}else{
					updated.forEach(function(obj){
						var deferred = Q.defer()

						function _done(item){
							_g.log('数据更新检查: '+item+' DONE')
							deferred.resolve()
							done_count++
							if( done_count >= updated.length ){
								if( doms.length ){
									_g.log('数据更新检查: DONE')
									_frame.app_main.functions_on_ready.push(function(){
										_frame.modal.show(
											$('<div class="updates"/>')
												.append(doms)
												.on('click.infosHideModal', '[data-infos], a[href^="?page="]', function(){
													_frame.modal.hide()
												}),
											'<span>更新日志</span>',
											{
												'classname': 	'update_journal'
											}
										)
									})
								}else{
									_g.log('数据更新检查: DONE，无更新日志')
								}
								//setTimeout(function(){
								//}, 100)
							}
						}

						_db.updates.find(obj).sort({'date': -1}).exec(function(err, docs){
							if( err ){
								deferred.reject(new Error(err))
							}else{
								docs.forEach(function(doc){
									var section = $('<section class="update_journal" data-version-'+doc['type']+'="'+doc['version']+'"/>')
												.html(_frame.app_main.page['about'].journaltitle(doc))
									try{
										$(_frame.app_main.page['about'].journal_parse(doc['journal'])).appendTo( section )
									}catch(e){
										_g.error(e)
										section.remove()
									}
									doms = doms.add(section)
								})
								_done(obj['type'] + ' - ' + obj['version'])
							}
						})

						the_promises.push(deferred.promise)
					})

					return Q.all(the_promises);
				}
			})

		// 部分全局事件委托
			.then(function(){
				let link_page = function(e){
							e.preventDefault()
							_frame.app_main.load_page($(this).attr('href').substr('?page='.length))
						},
					link_infos = function(e){
							e.preventDefault()
							let el = $(this)
							if( !el.attr('data-infos') ){
								let exp = /^[\?]{0,1}infos\=([^\&]+)\&id\=([^\&]+)/ig.exec(el.attr('href'))
								el.attr('data-infos', '[[' + exp[1].toUpperCase() + '::' + exp[2] + ']]')
								//el.trigger('click')
								_frame.infos.click(el)
							}
						}
				$body.on('click.pagechange', 'a[href^="?page="]', link_page)
					.on('click.pagechange', 'a[href^="?infos="]', link_infos)
				_frame.dom.bgimg.on(_g.event.animationend, 'div', function(){
					_frame.app_main.change_bgimg_after()
				})
				/*
					$html.on('click.openShipModal', '[data-shipid][modal="true"]', function(e){
						if( !(e.target.tagName.toLowerCase() == 'input' && e.target.className == 'compare') ){
							if( $(this).data('shipedit') ){
								try{
									//_frame.app_main.page['ships'].show_ship_form( _g.data.ships[ $(this).data('shipid') ] )
								}catch(err){}
							}else{
								try{
									_frame.app_main.show_ship( _g.data.ships[ $(this).data('shipid') ] )
								}catch(err){}
							}
						}
					})
				*/
				return true
			})

		// 鼠标侧键操作

		// Debug Mode
			.then(function(){
				if( debugmode ){
					_frame.dom.hashbar = $('<input type="text"/>')
							.on({
								'urlchanged': function(){
									$(this).val(
										location.href.substr( (location.origin + location.pathname).length )
									)
								},
								'change': function(){
									location.replace( location.origin + location.pathname + _frame.dom.hashbar.blur().val() )
								}
							})
							.appendTo(
								$('<div class="debug_hashbar"/>').appendTo(_frame.dom.layout)
							)
							.trigger( 'urlchanged' )
					//_frame.dom.layout.addClass('debug-hashbar')
					$window.on({
						'hashchange.debug_mode_hashbar': function(){
							_frame.dom.hashbar.trigger('urlchanged')
						},
						'popstate.debug_mode_hashbar': function(){
							_frame.dom.hashbar.trigger('urlchanged')
						}
					})
					// HACK: 在 history.pushstate() 同时，触发 window.onpopstate 事件
					// http://felix-kling.de/blog/2011/01/06/how-to-detect-history-pushstate/
					function hackHistory(history){
						var pushState = history.pushState;
						history.pushState = function(state) {
							if (typeof history.onpushstate == "function") {
								history.onpushstate({state: state});
							}
							setTimeout(function(){
								//$window.trigger('popstate')
								_frame.dom.hashbar.trigger('urlchanged')
							}, 1)
							return pushState.apply(history, arguments);
						}
					}
					hackHistory(window.history);
					
					let title_buttons = $('#titlebar > .buttons')
					
					// 在标题栏添加hashbar开关
						title_buttons.prepend( $('<button/>',{
							'class':	'console',
							'html':		'Toggle Hashbar'
						}).on('click', function(){
							_frame.dom.layout.toggleClass('debug-hashbar')
						}) )
					
					// 在标题栏添加Web输出入口
						$.getScript('../dev-output/js-output/output.js', function(){
							title_buttons.prepend( $('<button/>',{
								'class':	'console',
								'html':		'Output to Web'
							}).on('click', function(){
								_frame.modal.show(
									dev_output_form(),
									'Output to Web'
								)
							}) )
						})
				}
				return true
			})

		// 错误处理
			.catch(function (err) {
				_g.error(err)
			})
			.done(function(){
				_g.log('Global initialization DONE')
			})

		// 标记已进行过初始化函数
			_frame.app_main.is_init = true
	}
}
//
_g.error = function( err ){
	if( !(err instanceof Error) )
		err = new Error(err)

	_g.log(err)

	node.fs.appendFileSync(
		node.path.join(_g.execPath, 'errorlog.txt'),
		new Date()
		+ "\r\n"
		+ err.message
		+ "\r\n"
		+ "\r\n"
		+ "========================================"
		+ "\r\n"
		+ "\r\n"
	)

	//throw err
}

/*

自动更新流程
	获取本地版本
		JSON.parse( _config.get['nwjs-data-version'] )
	获取远端版本
		http://fleet.diablohu.com/versions.json
		packages[name].version
	对比各数据包版本
	如果没有更新
		返回
	如果有更新
		创建更新器提示
		按顺序
			获取文件
				http://fleet.diablohu.com/ + packages[name].path
				更新器提示的更新进度
			检查文件大小和MD5
				packages[name].bytes
				packages[name].md5
			检查通过
				pipe 程序目录
					[name].updated
				删除原有数据包
				重命名新数据包
				如果以上过程发生错误
					权限不足
						提示用户
						TODO 弹出权限请求，之后继续流程
					其他原因
						放弃操作
		全部完成后
			删除 data/prev || 删除 [node.gui.App.dataPath]/Extracted Data/__prev__
			更新器提示的提示状态
*/

var _updater = {
	'local_versions':{},
	'remote_root':	'http://fleet.diablohu.com',
	'remote_url': 	'http://fleet.diablohu.com/versions.json',
	'remote_data': 	{}
}

// 获取本地版本
	_updater.get_local_version = function(){
		_updater.local_versions = JSON.parse( localStorage['nwjs-data-version'] || '{}' )
		return _updater.local_versions
	}

// 获取远端版本
	_updater.get_remote = function(){
		var deferred = Q.defer()
		node.request({
			'uri': 		_updater.remote_url,
			'method': 	'GET'
		}, function(err, response, body){
			if(err){
				deferred.reject(new Error(err))
			}else if(response.statusCode != 200){
				deferred.reject(new Error(response.statusCode))
			}else{
				_updater.remote_data = JSON.parse( body || '{}' ) || {}
				deferred.resolve( _updater.remote_data )
			}
		})
		return deferred.promise
	}

// 对比各数据包版本，检查哪些数据包需要更新
	_updater.get_packages_updated = function(){
		// compare version
			// 对比版本号 a 相对于 b
			// a > b => 1
			// a = b => 0
			// a < b => -1
			function compareVersion(a, b) {
				var i;
				var len;

				if (typeof a + typeof b !== 'stringstring') {
					return false;
				}

				a = a.split('.');
				b = b.split('.');
				i = 0;
				len = Math.max(a.length, b.length);

				for (; i < len; i++) {
					if ((a[i] && !b[i] && parseInt(a[i]) > 0) || (parseInt(a[i]) > parseInt(b[i]))) {
						return 1;
					} else if ((b[i] && !a[i] && parseInt(b[i]) > 0) || (parseInt(a[i]) < parseInt(b[i]))) {
						return -1;
					}
				}

				return 0;
			};
		var updated = []

		for( var i in _updater.local_versions ){
			if( _updater.remote_data.packages && _updater.remote_data.packages[i] ){
				var remote_version = _updater.remote_data.packages[i].version
										? _updater.remote_data.packages[i].version
										: _updater.remote_data.packages[i]
				if( compareVersion( remote_version , _updater.local_versions[i] ) > 0 )
					updated.push(i)
			}
		}


		// 根据文件大小升序排序
		return updated.sort(function(a, b){
			// 降序
				//return _updater.remote_data.packages[b].bytes - _updater.remote_data.packages[a].bytes
			// 升序
				return _updater.remote_data.packages[a].bytes - _updater.remote_data.packages[b].bytes
		})
	}

// 创建更新器提示
	_updater.create_update_indicator = function(){
		if( !_updater.update_indicator || !_updater.update_indicator.length ){
			_updater.update_indicator = $('<button class="update_progress" icon="stairs-up" data-tip="检测到新版本<br>更新中..."/>')
											.prependTo( _frame.dom.globaloptions )
			_updater.update_indicator_bar = $('<s/>').appendTo( _updater.update_indicator )
		}
	}

// 更新数据包流程
	_updater.update = function(){
		var promise_chain 	= Q.fcall(function(){})
			,dirRoot = node.path.dirname(process.execPath).split(node.path.sep)
			,dirData = ''
			,datadir_exists = false
		dirRoot = (process.platform == 'darwin' || (dirRoot[dirRoot.length - 1] == 'nwjs' && node.path.basename( process.execPath ) == 'nw.exe') )
					? process.cwd()
					: node.path.dirname(process.execPath)
		dirData = node.path.join( dirRoot, 'data' )

		// 开始异步函数链
			promise_chain

		// 检查数据包目录是否存在
			.then(function(){
				var deferred = Q.defer()
				node.fs.lstat(dirData, function(err, stats){
					if( err || !stats.isDirectory() ){
						deferred.reject( '数据包目录不存在, 不进行自动更新' )
					}else{
						datadir_exists = true
						deferred.resolve( true )
					}
				})
				return deferred.promise
			})

		// 获取数据包目录下的文件列表，并筛选 .updated 文件
			.then(function(){
				var deferred = Q.defer()
				node.fs.readdir(dirData, function(err, files){
					if( err ){
						deferred.reject( err )
					}else{
						var selected = []
						files.forEach(function(file){
							if( node.path.extname(file) == '.updated' )
								selected.push(file)
						})
						deferred.resolve( selected )
					}
				})
				return deferred.promise
			})

		// 清理数据包目录下所有的 .updated 文件
			.then(function(files){
				var the_promises = []
				files.forEach(function(filename){
					var deferred = Q.defer()
					node.fs.unlink( node.path.join( dirData, filename ), function(err){
						_g.log('已删除更新残留文件 ' + filename)
						deferred.resolve()
					} )
					the_promises.push(deferred.promise)
				})
				return Q.all(the_promises);
			})

		// 其余流程
			.then(_updater.get_local_version())
			.then(_updater.get_remote)
			.then(_updater.get_packages_updated)
			.then(function(updated){
				if( !updated.length ){
					_g.log('所有数据包均为最新')
					return false
				}

				_g.log('自动更新过程开始 (' + updated.join(', ') + ')')
				_updater.create_update_indicator()
				var promise_chain_update = Q.fcall(function(){})
					,count = 0
					,permission = true
					,size_total = 0
					,size_received = 0

				updated.forEach(function(package_name){
					(function(package_name, count){
						size_total+= _updater.remote_data.packages[package_name].bytes

						promise_chain_update = promise_chain_update.then(function(){
							var deferred = Q.defer()
								,savefile = false

							var tempfile = node.path.join(
										dirData,
										package_name
										+ node.path.extname(_updater.remote_data.packages[package_name].path)
										+ '.updated'
									)
								,targetFile = node.path.join(
										dirData,
										package_name
										+ node.path.extname(_updater.remote_data.packages[package_name].path)
									)

							/*
							tempfile = node.path.join(
										node.path.normalize('C:\Program Files (x86)\\'),
										'__' + package_name
										+ node.path.extname(_updater.remote_data.packages[package_name].path)
									)
							*/

							function err_handler(err, msg){
								msg = msg || ''
								if( err.errno == -4048 || err.message.indexOf( 'not permitted' ) > -1 ){
									_g.log('    ' + msg + '权限不足')
								}else{
									_g.log(err)
									_g.log('    ' + msg + '发生错误 [' +err.errno+ ']: ' + err.message)
								}
							}

							_g.log('')
							_g.log('========== ' + count + '/' + updated.length + ' ==========')
							_g.log('')
							_g.log('    ' + package_name
								+ ' | 本地版本: ' + _updater.local_versions[package_name]
								+ ' | 服务器版本: ' + (_updater.remote_data.packages[package_name].version
														? _updater.remote_data.packages[package_name].version
														: _updater.remote_data.packages[package_name])
							)

							node['request-progress'](
							node.request({
								'uri': 		node.url.format(
												_updater.remote_root + '/'
												+ _updater.remote_data.packages[package_name].path
											),
								'method': 	'GET'
							}).on('error',function(err){
								_g.log('    下载数据包出错')
								node.fs.unlink(tempfile, function(err2){
									deferred.reject(new Error(err))
								})
								//deferred.reject(new Error(err))
							}).on('response', function(response){
								if( response.statusCode == 200
									&& parseInt(response.headers['content-length']) == _updater.remote_data.packages[package_name].bytes
								)
									savefile = true
							})).on('error',function(err){
								_g.log('    下载数据包出错')
								node.fs.unlink(tempfile, function(err2){
									deferred.reject(new Error(err))
								})
								//deferred.reject(new Error(err))
							}).on('progress',function(state){
								_updater.update_indicator.addClass('on')
								_g.log('    ' + state.received + ' / ' + state.total + ' (' + state.percent + '%)'
									+ ' | ' + Math.floor( (size_received + state.received) / size_total * 100 ) + '%'
								)
								_updater.update_indicator_bar.css('width', Math.floor( (size_received + state.received) / size_total * 100 ) + '%')
							}).pipe(
								node.fs.createWriteStream(tempfile)
								.on('finish', function(){
									if( savefile ){
										size_received+= _updater.remote_data.packages[package_name].bytes
										node.fs.unlink(targetFile, function(err){
											if( err ){
												err_handler(err, '删除原有数据包')
												_g.log('    跳过')
												//deferred.resolve()
											}//else{
												node.fs.rename(
													tempfile,
													targetFile,
													function(err){
														if( err ){
															err_handler(err, '重命名新数据包')
															_g.log('    跳过')
														}else{
															_g.log('    该数据包更新完成')
														}
														deferred.resolve()
													}
												)
											//}
										})
									}else{
										_g.log('    下载数据包出错')
										node.fs.unlink(tempfile, function(err){
											deferred.resolve()
										})
									}
								}).on('error', function(err){
									err_handler(err, '写入文件')
									_g.log('    流程结束')
									//deferred.resolve()
									deferred.reject(new Error(err))
								})
							)
							return deferred.promise
						})
					})(package_name, count)
					count++
				})
				promise_chain_update = promise_chain_update
					.catch(function (err) {
						_g.error(err)
						_g.log('自动更新失败')
						_updater.update_indicator.removeClass('on')
					})
					.done(function(){
						_g.log('')
						if( size_received >= size_total ){
							_g.log('========== ' + updated.length + '/' + updated.length + ' ==========')
							_g.log('')
							_g.log('自动更新完毕')
							_updater.update_indicator.addClass('done').data('tip', '更新完成<br>请重新启动程序')
							_updater.update_indicator_bar.css('width', '')
						}else{
							_g.log('========== ' + updated.length + '/' + updated.length + ' ==========')
							_g.log('')
							_g.log('自动更新失败, 结束流程')
							_updater.update_indicator.removeClass('on')
						}
					})
			})
		
		// 错误处理
			.catch(function (err) {
				_g.log('自动更新失败')
				if( err == '数据包目录不存在, 不进行自动更新' )
					console.warn(err)
				else
					_g.error(err)
				if( _updater.update_indicator && _updater.update_indicator.length )
					_updater.update_indicator.remove()
			})
			.done(function(){
				_g.log('自动更新过程初始化完毕')
			})
	}


// 将更新流程加入页面序列
	_frame.app_main.functions_on_ready.push( _updater.update )
_tmpl.improvement = function( equipment, improvement_index, requirement_index, returnHTML ){
	if( typeof equipment == 'undefined' )
		return false

	if( typeof equipment != 'object' )
		if( !(equipment = _g.data.items[equipment]) )
			return false

	improvement_index = improvement_index || 0
	requirement_index = requirement_index || [0]
	returnHTML = returnHTML || false

	var improvement = equipment['improvement'][improvement_index]
		,upgrade_to = improvement['upgrade']
						? _g.data.items[improvement['upgrade'][0]]
						: false
		,req_ships = []
		,requirement = ''

	requirement_index.forEach(function(currentValue){
		var req = improvement['req'][currentValue]
		if( req[1] )
			req_ships.mergeFrom(req[1])
			//req_ships = req_ships.concat(req[1])
	})
	if( req_ships.length ){
		var names = []
		req_ships.forEach(function(currentValue){
			names.push(
				'<a'
				+ ' href="?infos=ship&id='+currentValue+'"'
				+ ' data-infos="[[SHIP::'+currentValue+']]"'
				+ ' data-tip="[[SHIP::'+currentValue+']]"'
				+ '>'
				+ _g.data.ships[currentValue].getName()
				+ '</a>'
			)
		})
		requirement = '<font>'+names.join(' / ')+'</font>'
	}else{
		requirement = '<font class="no">无秘书舰要求</font>'
	}

	return _tmpl.export(
			'<span class="improvement">'
				+ _tmpl.improvement__title(equipment, upgrade_to, improvement['upgrade'][1])
				+ requirement
				+ _tmpl.improvement__resource(improvement, upgrade_to ? true : false)
			+ '</span>',
			returnHTML
		)
}










_tmpl.improvement_detail = function( equipment, returnHTML ){
	if( typeof equipment == 'undefined' )
		return false

	if( typeof equipment != 'object' )
		if( !(equipment = _g.data.items[equipment]) )
			return false

	let html = ''
		,data = equipment['improvement'] || []

	data.forEach(function(improvement){
		let upgrade_to = improvement['upgrade']
							? _g.data.items[improvement['upgrade'][0]]
							: false
			,requirements = this.improvement__reqdetails(improvement.req)

		html+= '<span class="improvement improvement-details">'
					+ _tmpl.improvement__title(equipment, upgrade_to, improvement['upgrade'][1])
					+ requirements
					+ _tmpl.improvement__resource(improvement, upgrade_to ? true : false)
				+ '</span>'
	},this)

	return _tmpl.export(
			html,
			returnHTML
		)
}










_tmpl.improvement_inEquipmentInfos = function( equipment, returnHTML ){
	if( typeof equipment == 'undefined' )
		return false

	if( typeof equipment != 'object' )
		if( !(equipment = _g.data.items[equipment]) )
			return false

	let html = ''
		,data = equipment['improvement'] || []

	data.forEach(function(improvement){
		let upgrade_to = improvement['upgrade']
							? _g.data.items[improvement['upgrade'][0]]
							: false
			,requirements = this.improvement__reqdetails(improvement.req)

		html+= '<span class="unit improvement improvement-details">'
					+ '<b>'
						+ ( upgrade_to
							? '<span class="indicator true">可升级为</span>'
								+ '<a style="background-image:url(../app/assets/images/itemicon/'
									+ upgrade_to.getIconId()
									+ '.png)"'
									+ ' href="?infos=equipment&id='+upgrade_to['id']+'"'
									+ ' data-infos="[[EQUIPMENT::'+upgrade_to['id']+']]"'
									+ ' data-tip="[[EQUIPMENT::'+upgrade_to['id']+']]"'
								+ '>' + upgrade_to.getName(true) + '</a>'
								+ ( improvement['upgrade'][1]
									? '<i>+'+improvement['upgrade'][1]+'</i>'
									: ''
								)
							: '<span class="indicator false">不可升级</span>'
						)
					+ '</b>'
					+ requirements
					+ _tmpl.improvement__resource(improvement, upgrade_to ? true : false)
				+ '</span>'
	}, this)

	return _tmpl.export(
			html,
			returnHTML
		)
}









_tmpl.improvement__title = function(equipment, upgrade_to, upgrade_to_star){
	return '<strong>'
		+ '<a style="background-image:url(../app/assets/images/itemicon/'
			+ equipment.getIconId()
			+ '.png)"'
			+ ' href="?infos=equipment&id='+equipment['id']+'"'
			+ ' data-infos="[[EQUIPMENT::'+equipment['id']+']]"'
			+ ' data-tip="[[EQUIPMENT::'+equipment['id']+']]"'
		+ '>' + equipment.getName(true) + '</a>'
		+ ( upgrade_to
			? '<b></b>'
				+ '<a style="background-image:url(../app/assets/images/itemicon/'
					+ upgrade_to.getIconId()
					+ '.png)"'
					+ ' href="?infos=equipment&id='+upgrade_to['id']+'"'
					+ ' data-infos="[[EQUIPMENT::'+upgrade_to['id']+']]"'
					+ ' data-tip="[[EQUIPMENT::'+upgrade_to['id']+']]"'
				+ '>' + upgrade_to.getName(true) + '</a>'
				+ ( upgrade_to_star
					? '<i>+'+upgrade_to_star+'</i>'
					: ''
				)
			: ''
		)
	+ '</strong>'
}
_tmpl.improvement__resource = function(improvement, upgradable){
	function getValue( v ){
		v = parseInt(v)
		if( v<0 )
			return '?'
		return v
	}

	var resource = {}

	resource['all'] = '<span>'
						+ '<em>必要资源</em>'
						+ '<i class="fuel">' + getValue(improvement['resource'][0][0]) + '</i>'
						+ '<i class="ammo">' + getValue(improvement['resource'][0][1]) + '</i>'
						+ '<i class="steel">' + getValue(improvement['resource'][0][2]) + '</i>'
						+ '<i class="bauxite">' + getValue(improvement['resource'][0][3]) + '</i>'
					+ '</span>'

	for(var i=1; i<4; i++){
		var title = ''
		switch(i){
			case 1: title = '★+0 ~ +6'; break;
			case 2: title = '★+6 ~ MAX'; break;
			case 3: title = '升级'; break;
		}
		resource[i] = '<span>'
						+ '<em>'+title+'</em>'
						+ ( i == 3 && !upgradable
							? '<i class="no">-</i>'
							: (
								'<i class="dev_mat">'
									+ getValue(improvement['resource'][i][0])
									+ '<i>(' + getValue(improvement['resource'][i][1]) + ')</i>'
								+ '</i>'
								+ '<i class="imp_mat">'
									+ getValue(improvement['resource'][i][2])
									+ '<i>(' + getValue(improvement['resource'][i][3]) + ')</i>'
								+ '</i>'
								+ ( improvement['resource'][i][4]
									? (
										'<a class="equipment"'
											+ ' style="background-image:url(../app/assets/images/itemicon/'
											+ _g.data.items[improvement['resource'][i][4]].getIconId()
											+ '.png)"'
											+ ' href="?infos=equipment&id='+improvement['resource'][i][4]+'"'
											+ ' data-infos="[[EQUIPMENT::'+improvement['resource'][i][4]+']]"'
											+ ' data-tip="[[EQUIPMENT::'+improvement['resource'][i][4]+']]"'
										+ '>'
										+ _g.data.items[improvement['resource'][i][4]].getName(true)
										+ '<i>x' + getValue(improvement['resource'][i][5]) + '</i>'
										+ '</a>'
									)
									: ''
								)
							)
						)
					+ '</span>'
	}

	return 	'<span>'
					+ resource['all']
					+ resource['1']
					+ resource['2']
					+ resource['3']
				+ '</span>'

}
_tmpl.improvement__reqdetails = function(reqdata){
	if( !reqdata || !reqdata.push || !reqdata.length )
		return ''

	var requirements = '<font>'

	reqdata.forEach(function(req){
		var names = []
			,text

		requirements+= '<b>'

		for(var k=0; k<7; k++){
			switch(k){
				case 0: text = '日'; break;
				case 1: text = '一'; break;
				case 2: text = '二'; break;
				case 3: text = '三'; break;
				case 4: text = '四'; break;
				case 5: text = '五'; break;
				case 6: text = '六'; break;
			}
			requirements+= '<i' + (req[0][k] ? ' class="on"' : '') + '>'+text+'</i>'
		}

		if( req[1] ){
			req[1].forEach(function(shipid){
				names.push(
					'<a'
					+ ' href="?infos=ship&id='+shipid+'"'
					+ ' data-infos="[[SHIP::'+shipid+']]"'
					+ ' data-tip="[[SHIP::'+shipid+']]"'
					+ '>'
					+ _g.data.ships[shipid].getName()
					+ '</a>'
				)
			})
			requirements+= names.join(' / ')
		}else{
			requirements+= '<b>无秘书舰要求</b>'
		}

		requirements+= '</b>'
	})

	requirements+= '</font>'

	return requirements
}

_tmpl.link_entity = function( entity, tagName, returnHTML, count ){
	if( !entity )
		return false

	if( tagName && typeof tagName == 'object' )
		return _tmpl.link_entity(
					entity,
					tagName['tagName'] || null,
					tagName['returnHTML'] || null,
					tagName['count'] || null
				)

	tagName = tagName || 'a'
	returnHTML = returnHTML || false
	count = typeof count == 'undefined' ? false : count

	if( typeof entity != 'object' ){
		var entityId = parseInt(entity)
		entity = _g.data.entities[entityId]
	}else{
		var entityId = entity['id']
	}

	return _tmpl.export(
			'<' + tagName
				+ (tagName == 'a' ? ' href="?infos=entity&id='+entityId+'"' : '')
				+ ' class="link_entity" data-entityid="' + entityId + '" data-infos="[[ENTITY::' + entityId + ']]">'
				+ (entity.picture && entity.picture.avatar
					? '<i style="background-image:url(' + entity.picture.avatar + ')"></i>'
					: '<i></i>'
				)
				+ '<span>'
					+ entity._name
					+ ( typeof count == 'undefined'
						? ''
						: ' <small>(' + count + ')</small>'
					)
				+ '</span>'
			+ '</' + tagName + '>',
			returnHTML
		)
}

_tmpl.link_equipment = function( equipment, tagName, returnHTML, improvementStar ){
	if( !equipment )
		return false

	if( tagName && typeof tagName == 'object' )
		return _tmpl.link_equipment(
					equipment,
					tagName['tagName'] || null,
					tagName['returnHTML'] || null,
					typeof tagName['improvementStar'] == 'undefined' ? null : tagName['improvementStar']
				)

	tagName = tagName || 'a'
	returnHTML = returnHTML || false
	improvementStar = typeof improvementStar == 'undefined' ? null : improvementStar

	if( typeof equipment != 'object' ){
		var equipmentId = parseInt(equipment)
		equipment = _g.data.items[equipmentId]
	}else{
		var equipmentId = equipment['id']
	}

	return _tmpl.export(
			'<' + tagName
				+ (tagName == 'a' ? ' href="?infos=equipment&id='+equipmentId+'"' : '')
				+ ' class="link_equipment"'
				+ ' data-equipmentid="' + equipmentId + '"'
				+ ' data-tip-position="right"'
				+ ' data-infos="[[EQUIPMENT::' + equipmentId + ']]"'
				+ ' data-tip="[[EQUIPMENT::' + equipmentId + ']]"'
			+ '>'
				+ '<i style="background-image:url(assets/images/itemicon/'
					+ equipment.getIconId()
					+ '.png)"></i>'
				/*
				+ '<i style="background-image:url('
					+ node.path.normalize('assets/images/itemicon/' + _g.data.item_types[equipment['type']]['icon'] + '.png')
					+ ')"></i>'
				*/
				+ '<span>'
					+ equipment.getName(true)
				+ '</span>'
				+ ( improvementStar !== null
					? '<em' + (improvementStar<=0 ? ' class="zero"' : '') + '>+' + improvementStar + '</em>'
					: ''
				)
			+ '</' + tagName + '>',
			returnHTML
		)
}

_tmpl.link_ship = function( ship, tagName, returnHTML, mode ){
	if( !ship )
		return false

	if( tagName && typeof tagName == 'object' )
		return _tmpl.link_ship(
					ship,
					tagName['tagName'] || null,
					tagName['returnHTML'] || null,
					tagName['mode'] || null
				)

	tagName = tagName || 'a'
	returnHTML = returnHTML || false
	mode = mode || 'default'

	if( typeof ship != 'object' ){
		var shipId = parseInt(ship)
		ship = _g.data.ships[shipId]
	}else{
		var shipId = ship['id']
	}
	
	let content = ''
		,shipType = ship.getType()
	
	switch(mode){
		case 'names':
			var names = []
			ship.getSeriesData().forEach(function(thisSeries){
				let thisName = _g.data.ships[thisSeries.id].getNameNoSuffix()
				if( $.inArray( thisName, names ) < 0 )
					names.push( thisName )
			})
			content = names.join(' / ')
			break;
		default:
			content = (shipType ? '<small>' + shipType + '</small>' : '' )
						+ ship.getName(_g.joint)
			break;
	}

	return _tmpl.export(
			'<' + tagName
				+ (tagName == 'a' ? ' href="?infos=ship&id='+shipId+'"' : '')
				+ ' class="link_ship" data-shipid="' + shipId + '" data-infos="[[SHIP::' + shipId + ']]">'
				+ '<img src="' + node.path.normalize(_g.path.pics.ships) + '/' + shipId + '/0.webp"/>'
				+ '<span>'
					+ content
				+ '</span>'
			+ '</' + tagName + '>',
			/*
			`<${tagName} class="unit link_ship" data-shipid="${shipId}" data-infos="[[SHIP::${shipId}]]">
				<img src="${_g.path.pics.ships}/${shipId}/0.webp"/>
				<span>${shipName}</span>
			</${tagName}>`,*/
			returnHTML
		)
}

_tmpl.textlink_entity = function( entity, tagName, returnHTML ){
	if( !entity )
		return false

	if( tagName && typeof tagName == 'object' )
		return _tmpl.textlink_entity(
					entity,
					tagName['tagName'] || null,
					tagName['returnHTML'] || null
				)

	tagName = tagName || 'a'
	returnHTML = returnHTML || false

	if( typeof entity != 'object' ){
		var entityId = parseInt(entity)
		entity = _g.data.entities[entityId]
	}else{
		var entityId = entity['id']
	}

	return _tmpl.export(
			'<' + tagName
				+ (tagName == 'a' ? ' href="?infos=entity&id='+entityId+'"' : '')
				+ ' data-entityid="' + entityId + '" data-infos="[[ENTITY::' + entityId + ']]">'
				+ entity._name
			+ '</' + tagName + '>',
			returnHTML
		)
}

_tmpl.textlink_ship = function( ship, tagName, returnHTML ){
	if( !ship )
		return false

	if( tagName && typeof tagName == 'object' )
		return _tmpl.textlink_ship(
					ship,
					tagName['tagName'] || null,
					tagName['returnHTML'] || null
				)

	tagName = tagName || 'a'
	returnHTML = returnHTML || false

	if( typeof ship != 'object' ){
		var shipId = parseInt(ship)
		ship = _g.data.ships[shipId]
	}else{
		var shipId = ship['id']
	}
	
	var shipType = ship.getType()

	return _tmpl.export(
			'<' + tagName
				+ (tagName == 'a' ? ' href="?infos=ship&id='+shipId+'"' : '')
				+ ' data-shipid="' + shipId + '" data-infos="[[SHIP::' + shipId + ']]">'
				+ (shipType ? '[' + shipType + '] ' : '' )
				+ ship.getName(_g.joint)
			+ '</' + tagName + '>',
			returnHTML
		)
}

class PAGE {
	constructor( $page ) {
	}
	
	modeSelectionEnter(callback_select, callback_enter){
		let _callback_select
		
		callback_select = callback_select || function(){}
		_callback_select = function(){
			//callback_select.apply( callback_select, arguments )
			callback_select(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], arguments[10])
			this.modeSelectionExit()
		}.bind(this)
		
		_frame.app_main.mode_selection_callback = _callback_select
		
		_frame.app_main.mode_selection_on(callback_enter)
		
		return _callback_select
	}
	
	modeSelectionExit(){
		if( !_frame.dom.layout.hasClass('mode-selection') )
			return false

		_frame.app_main.mode_selection_off()
	}
}

//class PageFleets extends PAGE

_frame.app_main.page['fleets'] = {
	init: function( $page ){		
		this.object = new class extends PAGE{
			constructor( $page ){
				super( $page )
				//this.inited = false
				$page.on({
					'show': function(){
						if( this.inited ){
							/*
							$page.html( _frame.app_main.page_html['fleets'] )
							_p.initDOM($page)
							*/
							$page.children('.tablelist').data('tablelist').refresh()
						}
						this.inited = true
					}
				})
			}
		}( $page )
	}
}

//class PageShips extends PAGE

_frame.app_main.page['ships'] = {
	init: function( $page ){
		/*
		this.tablelist = page.find('.tablelist')
		this.tablelistObj = this.tablelist.data('tablelist')
	
		page.on('pageon', function(){
			if( !_frame.app_main.page['ships'].tablelistObj )
				_frame.app_main.page['ships'].tablelistObj
					= _frame.app_main.page['ships'].tablelist.data('tablelist')
	
			if( _frame.app_main.page['ships'].tablelistObj )
				_frame.app_main.page['ships'].tablelistObj.thead_redraw()
		})
		*/
		
		this.object = new class extends PAGE{
			constructor( $page ){
				super( $page )
				
				this.tablelist = $page.find('.tablelist')
				this.tablelistObj = this.tablelist.data('tablelist')
			
				$page.on({
					'on': function(){
						if( !this.tablelistObj )
							this.tablelistObj
								= this.tablelist.data('tablelist')
				
						if( this.tablelistObj )
							this.tablelistObj.thead_redraw()
					}.bind(this),
					'modeSelectionEnter': function(e, callback_select){
						this.modeSelectionEnter(callback_select)
					}.bind(this)
				})
			}
			
			//modeSelectionEnter(callback_select){
			//	callback_select = super.modeSelectionEnter(callback_select)
			//	console.log(callback_select)
			//}
		}( $page )
	}
}

//class PageEquipments extends PAGE

_frame.app_main.page['equipments'] = {
	init: function( $page ){
		this.object = new class extends PAGE{
			constructor( $page ){
				super( $page )
				
				this.tablelist = $page.find('.tablelist')
				this.tablelistObj = this.tablelist.data('tablelist')
			
				$page.on({
					'on': function(){
						if( !this.tablelistObj )
							this.tablelistObj
								= this.tablelist.data('tablelist')
				
						if( this.tablelistObj ){
							this.tablelistObj.thead_redraw()
							this.tablelistObj.apply_types()
						}
					}.bind(this),
					'modeSelectionEnter': function(e, callback_select, callback_enter){
						this.modeSelectionEnter(callback_select, callback_enter)
					}.bind(this),
					'show': function(){
						if( this.tablelistObj ){
							this.tablelistObj.thead_redraw()
							this.tablelistObj.apply_types()
						}
					}.bind(this)
				})
			}
			
			//modeSelectionEnter(callback_select){
			//	callback_select = super.modeSelectionEnter(callback_select)
			//	console.log(callback_select)
			//}
		}( $page )
	}
}

_frame.app_main.page['arsenal'] = {}
_frame.app_main.page['arsenal'].init = function( page ){
	// tab radios
		$('<input/>',{
			'id':	'arsenal_headtab-1',
			'type':	'radio',
			'name':	'arsenal_headtab'
		}).prop('checked', true).appendTo(page)
		$('<input/>',{
			'id':	'arsenal_headtab-2',
			'type':	'radio',
			'name':	'arsenal_headtab'
		}).appendTo(page)

	// tabs
		var tabs = $('<div/>',{
				'class':	'tabs',
				'html':		'<label for="arsenal_headtab-1" class="tab">'
								+ '每日改修'
							+ '</label>'
							+ '<label for="arsenal_headtab-2" class="tab">'
								+ '明细表'
							+ '</label>'
			}).appendTo(page)
		// Blinky Akashi - http://codepen.io/Diablohu/pen/RPjBgG
			var akashi = $('<span/>',{
								'animation':	Math.floor((Math.random() * 3) + 1)
							})
							.on(_g.event.animationiteration, function(){
								akashi.attr(
									'animation',
									Math.floor((Math.random() * 3) + 1)
								)
							})
							.appendTo($('<div class="akashi"/>').prependTo(tabs))

	// contents
		this.elMain = $('<div class="main"/>')
			.append(this.init_weekday())
			.append(this.init_all())
			.appendTo(page)
			
		page.find('input[type="radio"]').on('change', function(){
				_frame.app_main.page['arsenal'].elMain.scrollTop(0)
			})
}




// 每日改修
	_frame.app_main.page['arsenal'].init_weekday = function(){
		var body = $('<div class="body body-1 body-weekday"/>')
			,weekday = $('<div class="weekday"/>').appendTo(body)
			,weekday_select = $('<div/>').html('<span>星期</span>').appendTo(weekday)
			,radios = []
			,checkbox_showmeterials = $('<input/>',{
						'type':	'checkbox',
						'id': 	'arsenal_weekday-showmeterials'
					}).prop(
						'checked', Lockr.get('arsenal_weekday-showmeterials', true) ? true : false
					).on('change', function(){
						Lockr.set(
							'arsenal_weekday-showmeterials',
							checkbox_showmeterials.prop('checked') ? 1 : 0
						)
					}).prependTo(body)

		for(var i=0; i<7; i++){
			var text

			switch(i){
				case 0: text = '日'; break;
				case 1: text = '一'; break;
				case 2: text = '二'; break;
				case 3: text = '三'; break;
				case 4: text = '四'; break;
				case 5: text = '五'; break;
				case 6: text = '六'; break;
			}

			radios[i] = $('<input/>',{
					'id':	'arsenal_weekday-' + i,
					'type':	'radio',
					'name':	'arsenal_weekday'
				}).prependTo(body)

			$('<label/>',{
					'html':	text,
					'for':	'arsenal_weekday-' + i
				}).appendTo(weekday_select)

			$('<div class="content content-'+i+'"/>')
				.append(
					_p.el.flexgrid.create()
						.appendDOM(function(){
							var o = $()
							for(var j in _g.data.arsenal_weekday[i]){
								var d = _g.data.arsenal_weekday[i][j]
								o = o.add(
									_tmpl.improvement(d[0], d[1], d[2])
										.addClass('unit')
								)
							}
							return o
						})
				)
				.appendTo(body)
		}

		$('<span/>',{
			'html':	'<b>*</b>日本东京时间'
		}).appendTo(weekday)

		$('<label/>',{
			'for': 	'arsenal_weekday-showmeterials',
			'html': '显示资源消耗'
		}).appendTo(weekday)

		// 获取当前日本东京时间，选择星期
			var date = new Date()
			date.setTime( date.getTime() + date.getTimezoneOffset()*60*1000 )
			date.setTime( date.getTime() + 9*60*60*1000 )
			radios[date.getDay()].prop('checked', true)

		return body
	}



// 明细表
	_frame.app_main.page['arsenal'].init_all = function(){
		var body = $('<div class="body body-2 body-all"/>')

		_g.data.arsenal_all.forEach(function(currentValue){
			_tmpl.improvement_detail(currentValue).appendTo(body)
		})

		return body
	}

_frame.app_main.page['about'] = {}

_frame.app_main.page['about'].journal_parse = function( raw ){
	var searchRes
		,scrapePtrn = /\[\[([^\:]+)\:([0-9]+)\]\]/gi
		,resultHTML = markdown.toHTML( raw )

	while( (searchRes = scrapePtrn.exec(raw)) !== null ){
		try{
			resultHTML = resultHTML.replace( searchRes[0], _tmpl['link_'+searchRes[1].toLowerCase()](searchRes[2], null, true) )
		}catch(e){}
	}

	searchRes = null
	scrapePtrn = /\[\[([^\:]+)\:([0-9]+)\:TEXT\]\]/gi
	while( (searchRes = scrapePtrn.exec(raw)) !== null ){
		try{
			resultHTML = resultHTML.replace( searchRes[0], _tmpl['textlink_'+searchRes[1].toLowerCase()](searchRes[2], null, true) )
		}catch(e){}
	}

	return resultHTML
}

_frame.app_main.page['about'].journaltitle = function( d, tagName ){
	d = d || {}
	tagName = tagName || 'h3'

	return 	'<h3>'
			+ (d['hotfix']
				? 'HOTFIX - '
				: '')
			+ (d['type'] == 'app'
				? ''
				: (d['type'] == 'app-db' ? 'DB' : d['type']).toUpperCase() + ' / ')
			+ d['version']
			+ '<small>'+(d['date'] ? d['date'] : 'WIP')+'</small>'
			+ '</h3>'
}

_frame.app_main.page['about'].init = function( page ){
	/*
	var latestVersionSection = $('[data-version-app]:first-of-type')
		,latestVersion = latestVersionSection.attr('data-version-app').split('.')
		,latestVersionSub = latestVersion[0] + '.' + latestVersion[1]
	*/
	//$('[data-version-app^="'+latestVersionSub+'"]')

	function addUpdateJournal( updateData ){
		var section = $('<section class="update_journal" data-version-'+updateData['type']+'="'+updateData['version']+'"/>')
						.html(_frame.app_main.page['about'].journaltitle(updateData))
						.appendTo(page)
		try{
			$(_frame.app_main.page['about'].journal_parse(updateData['journal'])).appendTo( section )
		}catch(e){
			_g.error(e)
			section.remove()
		}
	}

	var promise_chain 	= Q.fcall(function(){})

	// 开始异步函数链
		promise_chain

	// 获取全部开发中的更新日志
		.then(function(){
			var deferred = Q.defer()
			_db.updates.find({'date': ""}).sort({'date': -1, 'version': -1}).exec(function(err, docs){
				docs.forEach(function(doc){
					addUpdateJournal(doc)
				})
				deferred.resolve(err)
			})
			return deferred.promise
		})

	// 获取全部已更新的更新日志
		.then(function(){
			var deferred = Q.defer()
			_db.updates.find({$not:{'date':""}}).sort({'date': -1, 'version': -1}).exec(function(err, docs){
				docs.forEach(function(doc){
					addUpdateJournal(doc)
				})
				deferred.resolve(err)
			})
			return deferred.promise
		})

}

/* 
 */

_frame.infos = {
	// curContent: 			null,			// 当前内容的hashCode

	// lastCurrentPage: null, 		// 进入 infos 框架之前显示的页面
	// last: null, 					// 上一次 infos，通常进入其他页面后会被重置
	historyLength: -1,
	historyCurrent: -1,

	contentCache: {},

	getContent: function(type, id){
		if( !this.contentCache[type] )
			this.contentCache[type] = {}
		
		function initcont( $el ){
			return _p.initDOM(
				$el.addClass('infosbody')
					.attr({
						'data-infos-type':	type,
						'data-infos-id':	id
					})
			)
		}

		if( id == '__NEW__' )
			return initcont( _frame.infos['__' + type]( id ) )
		
		if( id == '__OUTPUT__' )
			this.contentCache[type][id] = initcont( _frame.infos['__' + type + '__OUTPUT']( id ) ).removeAttr('data-infos-id')

		if( !this.contentCache[type][id] ){
			this.contentCache[type][id] = initcont( _frame.infos['__' + type]( id ) )
		}

		return this.contentCache[type][id]
	},

	show: function(cont, el, doNotPushHistory){
		var exp			= /^\[\[([^\:]+)\:\:(.+)\]\]$/.exec(cont)
			,infosType 	= null
			,infosId 	= null

		if( exp && exp.length > 2 ){
			infosType = exp[1].toLowerCase()
			if( isNaN(exp[2]) )
				//infosId = encodeURI(JSON.stringify( exp[2] ))
				infosId = exp[2]
			else
				infosId = parseInt( exp[2] )
			switch( infosType ){
				case 'item':
				case 'equip':
					infosType = 'equipment'
					break;
			}
		}else{
			return false
		}

		// 如果为相同内容，不运行
			if( this.curContent == infosType + '::' + infosId )
				return _frame.infos.dom.container.children('div:first-child')

		if( !doNotPushHistory ){
		//}else{
			this.historyCurrent++
			this.historyLength = this.historyCurrent
			_frame.app_main.pushState(
				{
					'infos':infosType,
					'id': 	infosId,
					'infosHistoryIndex': _frame.infos.historyCurrent
				},
				null,
				'?infos=' + infosType + '&id=' + infosId
			)
		}

		this.show_func( infosType, infosId, doNotPushHistory )
	},

	//show_func: function(cont, el, history){
	show_func: function(type, id, doNotPushHistory, infosHistoryIndex){
		if( !type || !id )
			return false

		// 如果为相同内容，不运行
			if( this.curContent == type + '::' + id )
				return _frame.infos.dom.container.children('div:first-child')

		type = type.toLowerCase()
		if( isNaN(id) )
			id = id
		else
			id = parseInt(id)

		var cont = ''
			,title = null

		// 第一次运行，创建相关DOM和变量
			if( !_frame.infos.dom ){
				_frame.infos.dom = {
					//'nav': 		$('<div class="infos"/>').appendTo( _frame.dom.nav ),
					'main': 	$('<div class="page-container infos"/>').appendTo( _frame.dom.main )
				}
				_frame.infos.dom.container = $('<div class="wrapper"/>').appendTo( _frame.infos.dom.main )
				/*
				_frame.infos.dom.back = $('<button class="back" icon="arrow-set2-left"/>')
						.on({
							'click': function(){
								_frame.infos.dom.forward.removeClass('disabled')
								history.back()
								//_frame.infos.hide()
							},
							'transitionend.infos_hide': function(e){
								if( e.currentTarget == e.target
									&& e.originalEvent.propertyName == 'opacity'
									&& parseInt(_frame.infos.dom.back.css('opacity')) == 0
								){
									_frame.infos.hide_finish()
								}
							}
						}).appendTo( _frame.infos.dom.nav )
				_frame.infos.dom.forward = $('<button class="forward disabled" icon="arrow-set2-right"/>')
						.on('click', function(){
							history.forward()
							//_frame.infos.hide()
						}).appendTo( _frame.infos.dom.nav )
				*/
				_frame.dom.btnHistoryBack.on(eventName('transitionend', 'infos_hide'), function(e){
								if( e.currentTarget == e.target
									&& e.originalEvent.propertyName == 'opacity'
									&& parseFloat(_frame.dom.btnHistoryBack.css('opacity')) == 0
								){
									_frame.infos.hide_finish()
								}
							})
			}

		// 计算历史记录相关，确定 Back/Forward 按钮是否可用
			infosHistoryIndex = typeof infosHistoryIndex != 'undefined' ? infosHistoryIndex : this.historyCurrent
			this.historyCurrent = infosHistoryIndex
			//_g.log( this.historyCurrent, this.historyLength )
			if( this.historyCurrent == this.historyLength && this.historyCurrent > -1 )
				_frame.dom.btnHistoryForward.addClass('disabled')

		// 先将内容区域设定为可见
			_frame.dom.layout.addClass('is-infos-show')

		// 处理内容
			switch(type){
				case 'ship':
				case 'equipment':
				case 'entity':
					cont = this.getContent(type, id)
					_frame.infos.dom.main.attr('data-infostype', type)
					title = cont.attr('data-infos-title')
					break;
				case 'fleet':
					cont = this.getContent(type, id)
					_frame.infos.dom.main.attr('data-infostype', 'fleet')
					_frame.app_main.mode_selection_off()
					TablelistEquipments.types = []
					break;
			}
			//var hashcode = (cont.append) ? cont[0].outerHTML.hashCode() : cont.hashCode()
			//if( _frame.infos.curContent != hashcode ){
				var contentDOM = cont.append ? cont : $(cont)
					,is_firstShow = !contentDOM.data('is_infosinit')

				//if( el && el.attr('data-infos-history-skip-this') )
				//	contentDOM.attr('data-infos-history-skip-this', true)

				//if( _frame.infos.dom.main.children().length )
				//	contentDOM.addClass('fadein')

				/*
				if( history ){
					_frame.infos.dom.main.children().filter('[data-infos-history-skip-this="true"]').remove()
					_frame.infos.dom.main.children().slice(2).remove()
					_frame.infos.dom.main.children().eq(0).addClass('off')
					_frame.infos.dom.historyback.html(history).addClass('show')
				}else{
					_frame.infos.dom.historyback.html('').removeClass('show')
					_frame.infos.dom.main.empty()
				}*/
				//data-infos-history-skip-this

				if( !contentDOM.data('is_infosinit') ){
					contentDOM.data('is_infosinit', true)
						.on(eventName('transitionend','hide'), function(e){
							if( e.currentTarget == e.target && e.originalEvent.propertyName == 'opacity' && parseInt(contentDOM.css('opacity')) == 0 ){
								contentDOM.detach()
									.data('is_show', false)
							}
						})
				}
				contentDOM.prependTo( _frame.infos.dom.container )
					.trigger('show', [is_firstShow])
					.data('is_show', true)

				//_p.initDOM( contentDOM )
				//_frame.infos.curContent = hashcode
				this.curContent = type + '::' + id
			//}

		// 取消主导航上的当前项目状态
			if( _frame.app_main.cur_page ){
				//this.lastCurrentPage = _frame.app_main.cur_page

				// exit selection mode
					//_frame.app_main.mode_selection_off()
				
				if( _frame.dom.navs[_frame.app_main.cur_page] )
					_frame.dom.navs[_frame.app_main.cur_page].removeClass('on')
				if( _frame.app_main.page_dom[_frame.app_main.cur_page] )
					_frame.app_main.page_dom[_frame.app_main.cur_page].addClass('off').trigger('pageoff')
				_frame.app_main.cur_page = null
			}
		
		// 确定 theme
			_frame.dom.main.attr('data-theme', cont.attr('data-theme') || type)

		setTimeout(function(){
			// 显示内容
				_frame.dom.layout.addClass('is-infos-on')
				
			_frame.app_main.title = title
			
			//console.log( _frame.infos.last )
			
			if( _frame.infos.last != title )
				_ga.counter(
					location.search
				)
			
			_frame.infos.last = title
		}, 1)
	},

	hide: function(){
		if( !_frame.infos.dom || !this.curContent )
			return false

		// 隐藏内容
			_frame.dom.layout.removeClass('is-infos-on')
			_frame.dom.btnHistoryForward.addClass('disabled')
			this.curContent = null

		//if( this.lastCurrentPage ){
		//	if( _frame.dom.navs[this.lastCurrentPage] )
		//		_frame.dom.navs[this.lastCurrentPage].addClass('on')
			//_frame.app_main.cur_page = this.lastCurrentPage
		//}

		/*
		// 为主导航最后一个元素绑定 transitionEnd 事件
		// transitionEnd 触发后，检查 top CSS，如果为 0，判断动画播放结束
		// 将内容区域设定为不可见
			_frame.dom.navlinks.children('button:last-of-type')
					.on('transitionend.infos_hide', function(e){
						if( e.currentTarget == e.target && e.originalEvent.propertyName == 'top' && parseInt($(this).css('top')) == 0 ){
							_frame.dom.layout.removeClass('is-infos-show')
							_frame.infos.dom.main.attr('data-infostype', '')
							$(this).off('transitionend.infos_hide')
						}
					})
		*/
	},

	hide_finish: function(){
		// 仍在显示，不予执行
			if( _frame.infos.curContent )
				return false

		_frame.dom.layout.removeClass('is-infos-show')
		_frame.infos.dom.main.attr({
			'data-infostype': 	'',
			'data-theme': 		''
		})
		//$(this).off('transitionend.infos_hide')
		this.historyLength = -1
		this.historyCurrent = -1
	},

	historyback: function(){
		_frame.infos.dom.main.children().slice(1).remove()
		_frame.infos.dom.main.children().eq(0).removeClass('off').addClass('fadein')
		_frame.infos.dom.historyback.empty().removeClass('show')

		if( _frame.infos.dom.main.children().eq(0).hasClass('ship') )
			_frame.infos.dom.main.attr('data-infostype', 'ship')
		else if( _frame.infos.dom.main.children().eq(0).hasClass('equipment') )
			_frame.infos.dom.main.attr('data-infostype', 'equipment')
		else if( _frame.infos.dom.main.children().eq(0).hasClass('fleet') )
			_frame.infos.dom.main.attr('data-infostype', 'fleet')
		else if( _frame.infos.dom.main.children().eq(0).hasClass('entity') )
			_frame.infos.dom.main.attr('data-infostype', 'entity')
	},
	
	click: function(el){
		_frame.infos.show(
			el.attr('data-infos'),
			el,
			el.attr('data-infos-nohistory')
		)
	}
}







// 初始化
_frame.infos.init = function(){
	if( _frame.infos.is_init )
		return true

	$body.on( 'click._infos', '[data-infos]', function(e){
			if( !(e.target.tagName.toLowerCase() == 'input' && e.target.className == 'compare') ){
				_frame.infos.click($(this))

				if( e.target.tagName.toLowerCase() == 'a' )
					e.preventDefault()
			}
		})

	_frame.infos.is_init = true
	return true
}

// 实体信息

_frame.infos.__entity = function( id ){
	let d = _g.data.entities[ id ]
		,dom = $('<div class="infos-entity"/>')
					.attr('data-infos-title', d._name + ' - 声优&画师')
		//,serieses = []
		//,seriesCV = []
		//,seriesIllustrator = []

	_g.log(d)
	
	// 标题
		$('<div class="title"/>')
			.html(
				'<h2 data-content="' + d.getName() + '">' + d.getName() + '</h2>'
				+ '<small>' + d.getName('ja_jp') + '</small>'
			).appendTo(dom)
	
	// 图片
		if( d.picture && d.picture.avatar ){
			dom.addClass('is-hasavatar')
			$('<img/>',{
				'src':			d.picture.avatar,
				'class':		'avatar'//,
				//'data-filename':d.getName() + '.jpg'
			}).appendTo(dom)
		}

	/*
	// 遍历全部舰娘，分析声优、画师数据
	// 缓存舰娘所属系列，目前每一个系列只会有一位声优、画师
		_g.data.ship_id_by_type.forEach(function(thisType){
			thisType.forEach(function(thisShip){
				thisShip = _g.data.ships[thisShip]
				if( !thisShip.series || $.inArray( thisShip.series, serieses ) < 0 ){
					if( thisShip.series )
						serieses.push( thisShip.series )
					
					let seriesData = thisShip.getSeriesData()

					if( thisShip.getRel('cv') == id )
						seriesCV.push(seriesData)

					if( thisShip.getRel('illustrator') == id )
						seriesIllustrator.push(seriesData)
				}
			})
		})
	
	let appendInfos = function(title, seriesArray){
		if( !seriesArray.length )
			return

		let container = $('<div class="entity-info"/>').html('<h4 data-content="'+title+'">'+title + '<small>(' + seriesArray.length + ')</small>'+'</h4>').appendTo(dom)
			,flexgrid = _p.el.flexgrid.create().appendTo( container ).addClass('list-ship')
		
		seriesArray.forEach(function(seriesData){
			flexgrid.appendDOM(
				_tmpl.link_ship(seriesData[seriesData.length-1].id, {
					mode:	'names'
				}).addClass('unit')
			)
		})
	}
	
	appendInfos('配音', seriesCV)
	appendInfos('绘制', seriesIllustrator)
	*/
	
	let appendInfos = function(title, t){
		if( !d.relation || !d.relation[t] || !d.relation[t].length )
			return

		let container = $('<div class="entity-info"/>')
						.html('<h4 data-content="'+title+'">'+title + '<small>(' + d.relation[t].length + ')</small>'+'</h4>')
						.appendTo(dom)
			,flexgrid = _p.el.flexgrid.create().appendTo( container ).addClass('list-ship')
		
		d.relation[t].forEach(function(seriesShipIds){
			flexgrid.appendDOM(
				_tmpl.link_ship(seriesShipIds[seriesShipIds.length-1], {
					mode:	'names'
				}).addClass('unit')
			)
		})
	}
	
	appendInfos('配音', 'cv')
	appendInfos('绘制', 'illustrator')
	
	return dom
}

// 装备信息
	_frame.infos.__equipment = function( id ){
		var d = _g.data.items[ id ]

		_g.log(d)

		function _stat(stat, title){
			if( d['stat'][stat] ){
				var html = '<small class="stat-'+stat+'">' + title + '</small>'
				switch(stat){
					case 'range':
						html+= '<em>' + _g.getStatRange( d['stat'][stat] ) + '</em>';
						break;
					default:
						var val = parseInt( d['stat'][stat] )
						html+= '<em'+ (val < 0 ? ' class="negative"' : '') +'>' + ( val > 0 ? '+' : '') + val + '</em>'
						break;
				}
				$('<span/>').html(html).appendTo(stat_container)
			}//else{
			//	return ''
			//}
		}

		var dom = $('<div class="infos-equipment"/>')
					.attr('data-infos-title', d._name + ' - 装备')

		// 名称 & 类型 & 开发改修
			$('<div class="title"/>')
				.html(
					'<h2 data-content="' + d.getName() + '">' + d.getName() + '</h2>'
					+ '<small>'
						+ '<span data-tip="图鉴编号">No.' + d['id'] + '</span>'
						+ ( d['type']
							? ( d.getType()
								+ TablelistEquipments.gen_helper_equipable_on( d['type'] )
							): '' )
					+ '</small>'
					+ '<small>'
						+ '<small class="indicator '+(d['craftable'] ? 'true' : 'false')+'">'
							+ ( d['craftable'] ? '可开发' : '不可开发' )
						+ '</small>'
						+ ($.inArray(_g.data.items[id].type, _g.data.item_type_collections[3].types) > -1
							? '<small class="indicator '+(d['rankupgradable'] ? 'true' : 'false')+'">'
									+ ( d['rankupgradable'] ? '可提升熟练度' : '无熟练度' )
								+ '</small>'
							: '<small class="indicator '+(d['improvable'] ? 'true' : 'false')+'">'
									+ ( d['improvable'] ? '可改修' : '不可改修' )
								+ '</small>'
								+ '<small class="indicator '+(d['upgrade_to'] && d['upgrade_to'].push && d['upgrade_to'].length ? 'true' : 'false')+'">'
									+ ( d['upgrade_to'] && d['upgrade_to'].push && d['upgrade_to'].length ? '可升级' : '不可升级' )
								+ '</small>'
						)
					+ '</small>'
				).appendTo(dom)

		// 属性
			var stats = $('<div class="stats"/>')
							.html('<h4 data-content="属性">属性</h4>')
							.appendTo(dom)
				,stat_container = $('<div class="stat"/>').appendTo(stats)

			_stat('fire', '火力')
			_stat('torpedo', '雷装')
			_stat('aa', '对空')
			_stat('asw', '对潜')
			_stat('bomb', '爆装')
			_stat('hit', '命中')
			_stat('armor', '装甲')
			_stat('evasion', '回避')
			_stat('los', '索敌')
			_stat('range', '射程')

		// 开发 & 改修
		/*
			var arsenal = $('<div class="stats"/>')
							.html('<h4 data-content="开发改修">开发改修</h4>')
							.appendTo(dom)
				,arsenal1 = $('<div class="stat"/>').appendTo(arsenal)

			$('<span/>')
				.append(
					$('<small class="indicator">')
						.addClass( d['craftable'] ? 'true' : 'false' )
						.html( d['craftable'] ? '可开发' : '不可开发' )
				)
				.appendTo( arsenal1 )
			$('<span/>')
				.append(
					$('<small class="indicator">')
						.addClass( d['improvable'] ? 'true' : 'false' )
						.html( d['improvable'] ? '可改修' : '不可改修' )
				)
				.appendTo( arsenal1 )
			if( d['improvable'] && !(d['upgrade_to'] && d['upgrade_to'].push && d['upgrade_to'].length) ){
				$('<span/>').html('<small class="indicator false">不可升级</small>')
					.appendTo( arsenal1 )
			}

			// 可升级为
				if( d['upgrade_to'] && d['upgrade_to'].push && d['upgrade_to'].length ){
					var arsenal_to = $('<div class="stat upgrade"/>')
							.html('<span><small class="indicator true">可升级为</small></span>')
							.appendTo(arsenal)
					for( var i in d['upgrade_to'] ){
						_tmpl.link_equipment(d['upgrade_to'][i][0], null, null, d['upgrade_to'][i][1]).appendTo( arsenal_to )
					}
				}
		*/

		// 改修选项
			if( d['improvement'] && d['improvement'].push && d['improvement'].length ){
				//var improvements = $('<div class="stats improvement-options"/>')
				//		.html('<h4 data-content="改修选项">改修选项</h4>')
				//		.appendTo(dom)
				//_tmpl.improvement_inEquipmentInfos(d).appendTo(improvements)
				_p.el.flexgrid.create()
					.addClass('improvement-options')
					.appendDOM(_tmpl.improvement_inEquipmentInfos(d))
					.prepend($('<h4 data-content="改修选项">改修选项</h4>'))
					.appendTo(dom)
			}

		// 升级来源
			if( d['upgrade_from'] && d['upgrade_from'].push && d['upgrade_from'].length ){
				var upgrade_from = $('<div class="upgrade-from"/>')
								.html('<h4 data-content="可由以下装备升级获得">可由以下装备升级获得</h4>')
								.appendTo(dom)
					,upgrade_from1 = $('<div class="stat upgrade"/>')
						.appendTo(upgrade_from)
				d['upgrade_from'].forEach(function(currentValue){
					_tmpl.link_equipment(currentValue).appendTo( upgrade_from1 )
				})
			}

		// 初始装备于
			var equipped = $('<div class="equipped"/>').html('<h4 data-content="初始装备于">初始装备于</h4>').appendTo(dom)
				,equipped_container = _p.el.flexgrid.create().appendTo( equipped ).addClass('list-ship')
			if( d.default_equipped_on && d.default_equipped_on.length ){
				d.default_equipped_on.forEach(function(currentValue){
					equipped_container.appendDOM(
						_tmpl.link_ship(currentValue).addClass('unit')
					)
				})
			}else{
				equipped_container.addClass('no').html('暂无初始配置该装备的舰娘...')
			}

		// 图鉴
			var illusts = $('<aside class="illustrations"/>').appendTo(dom)
			try{
				var file = node.path.normalize(_g.path.pics.items) + d['id'] + '/card.webp'
					,stat = node.fs.lstatSync(file)
				if( stat && stat.isFile() ){
					$('<img src="'+file+'" data-filename="'+d.getName()+'.webp"/>')
						.appendTo(illusts)
				}
			}catch(e){}

		return dom
	}

// 舰队配置
	_frame.infos.__fleet = function( id, el ){
		return (new InfosFleet(id, el)).el
	}









class InfosFleet{
	constructor( id, el ){
		this.el = el || $('<div/>')
		this.el.addClass('infos-fleet loading').attr('data-infos-title','舰队 ('+id+')')
		
		this.doms = {}
		this.fleets = []
		//this._updating = false
		//this.is_init = false
		this.tip_hqlv_input = '输入 0 表示采用默认等级 (Lv.%1$d)'
	
		if( id == '__NEW__' ){
			_db.fleets.insert( _tablelist.prototype._fleets_new_data(), function(err, newDoc){
				if(err){
					_g.error(err)
				}else{
					if( _frame.infos.curContent == 'fleet::__NEW__' )
						_frame.infos.show('[[FLEET::' + newDoc['_id'] + ']]')
						//this.init(newDoc)
				}
			}.bind(this))
		}else{
			_db.fleets.find({
				'_id': 		id
			}, function(err, docs){
				if(err || !docs){
					_g.error(err)
				}else{
					if( _frame.infos.curContent == 'fleet::' + id )
						this.init(docs[0])
				}
			}.bind(this))
		}

		this.el.on('show', function(e, is_firstShow){
			if( !is_firstShow ){
				// 再次显示时，重新计算分舰队的索敌能力
				let i = 0
					,l = Lockr.get('hqLvDefault', _g.defaultHqLv)
				while(i < 4){
					this.fleets[i].summaryCalc(true)
					i++
				}
				if( !this._hqlv )
					this.doms['hqlvOption'].val(l)
				this.doms['hqlvOptionLabel'].data('tip', this.tip_hqlv_input.printf(l) )
				this.doms['hqlvOption'].attr('placeholder', l)
			}
		}.bind(this))

		if( !_g.isClient )
			this.doms.warning = $('<div/>',{
					'class':	'warning',
					'html':		'功能移植/测试中，请勿日常使用'
				}).appendTo( this.el )
	}



	// 初始化内容
	init( d ){
		if( !d )
			return false

		//$.extend(true, this, d)
		this.data = d
		//_g.log(this.data)

		let i = 0
			,defaultHqLv = Lockr.get('hqLvDefault', _g.defaultHqLv)

		this.el.attr({
				'data-fleetid': d._id,
				'data-infos-id':d._id
			})
			//.data('fleet', d)
			.removeClass('loading')
		
		this.el.find('.loading-msg').remove()
		
		// 创建DOM
			$('<header/>')
				.append(
					this.doms['name'] = $('<h3 contenteditable/>')
						.html('点击编辑标题')
						.on({
							'input': function(){
								this.update_data({})
								this.doms['name'].trigger('namechange')
							}.bind(this),
							'focus': function(){
								if( this.doms['name'].text() == '点击编辑标题' )
									this.doms['name'].html('')
							}.bind(this),
							'blur': function(){
								if( !this.doms['name'].text() )
									this.doms['name'].html('点击编辑标题')
							}.bind(this),
							'namechange': function(e, content){
								if( typeof content == 'undefined' ){
									content = this.doms['name'].text()
								}
								
								this._name = content
								return this.doms['name']
							}.bind(this),
							'keydown': function(e){
								if( e.keyCode == 13 ){
									this.doms['name'].blur()
									setTimeout(function(){
										this.doms['name'].blur()
									}.bind(this), 1)
								}
							}.bind(this)
						})
				)
				.append(
					this.doms['user'] = $('<button/>')
				)
				.appendTo(this.el)
	
			$('<div class="fleets"/>')
				.append(
					this.doms['tabs'] = $('<div class="tabs"/>')
				)
				.append(
					this.doms['options'] = $('<div class="options"/>')
						.append(
							this.doms['hqlvOptionLabel'] = $('<label/>',{
								'class':	'option option-hqlv',
								'html':		'司令部等级',
								'data-tip':	this.tip_hqlv_input.printf(defaultHqLv)
							})
							.append(
								this.doms['hqlvOption'] = $('<input/>',{
										'type':		'number',
										'min':		0,
										'max':		150,
										'placeholder': defaultHqLv
									})
									.val(this._hqlv || defaultHqLv)
									.on({
										'input': function(){
											this._hqlv = this.doms['hqlvOption'].val()
										}.bind(this),
										'focus': function(){
											this.doms['hqlvOption'].trigger('tipshow')
										}.bind(this),
										'blur': function(){
											this.doms['hqlvOption'].trigger('tiphide')
										}.bind(this),
										'click': function(e){
											e.stopImmediatePropagation()
											e.stopPropagation()
										}
									})
							)
						)
						.append(
							this.doms['theme'] = $('<select class="option option-theme-value"/>')
								.on('change', function(){
									this._theme = this.doms['theme'].val()
								}.bind(this))
								.append(function(){
									let els = $()
									for( let j=1; j<11; j++ ){
										els = els.add(
											$('<option/>',{
												'value':	j,
												'html':		'主题-'+j
											})
										)
									}
									return els
								})
						)
						.append(
							this.doms['themeOption'] = $('<button class="option option-theme mod-dropdown"/>').html('主题').on('click', function(){
								if( !InfosFleet.menuTheme ){
									InfosFleet.menuThemeItems = $('<div/>')
									for(let i=1; i<11; i++){
										$('<button class="theme-' + i + '"/>').html(i)
											.on('click', function(){
												InfosFleet.menuCur._theme = i
												this.el.attr('data-theme', this._theme)
											}.bind(this))
											.appendTo(InfosFleet.menuThemeItems)
									}
									InfosFleet.menuTheme = new _menu({
										'className': 'contextmenu-infos_fleet_themes',
										'items': [InfosFleet.menuThemeItems]
									})
								}
								InfosFleet.menuCur = this
								InfosFleet.menuTheme.show(this.doms['themeOption'])
							}.bind(this))
						)
						.append(
							this.doms['exportOption'] = $('<button class="option mod-dropdown"/>').html('导出').on('click', function(){
								if( !InfosFleet.menuExport ){
									InfosFleet.menuExport = new _menu({
										'className': 'contextmenu-infos_fleet_themes',
										'items': [
											$('<menuitem/>',{
													'html':		'导出代码'
												}).on('click', function(){
													InfosFleet.menuCur.modalExport_show()
												}),
											$('<menuitem/>',{
													'html':		'导出文本'
												}).on('click', function(){
													InfosFleet.menuCur.modalExportText_show()
												}),
											$('<menuitem/>',{
													'html':		'导出图片'
												}).on('click', function(){
													InfosFleet.menuCur.exportPic()
												})
										]
									})
								}
								InfosFleet.menuCur = this
								InfosFleet.menuExport.show(this.doms['exportOption'])
							}.bind(this))
						)
						/*
						.append(
							$('<button class="option"/>').html('导出代码').on('click', function(){
								this.modalExport_show()
							}.bind(this))
						)
						.append(
							$('<button class="option"/>').html('导出文本').on('click', function(){
								this.modalExportText_show()
							}.bind(this))
						)
						.append(
							$('<button class="option"/>').html('导出图片').on('click', function(){
								this.exportPic()
							}.bind(this))
						)
						*/
						.append(
							this.doms['optionOptions'] = $('<button class="icon" icon="cog"/>').on('click', function(){
								TablelistFleets.menuOptions_show(this.doms['optionOptions'])
							}.bind(this))
						)
						/*
						.append(
							$('<span class="option"/>').html('[PH] 阵型')
						)
						.append(
							$('<span class="option"/>').html('[PH] 导出图片')
						)
						*/
				)
				.appendTo(this.el)
	
			this.doms['ships'] = $('<div class="ships"/>').appendTo(this.el)
	
			// 4个分舰队
				while(i < 4){
					this.fleets[i] = new InfosFleetSubFleet(this, [], i)

					$('<input/>',{
							'type': 	'radio',
							'name': 	'fleet_' + d._id + '_tab',
							'id': 		'fleet_' + d._id + '_tab_' + i,
							'value': 	i
						}).prop('checked', (i == 0)).prependTo( this.el )
			
					$('<label/>',{
							'for': 		'fleet_' + d._id + '_tab_' + i,
							'data-fleet':i,
							'html': 	'#' + (i+1)
						}).appendTo( this.doms['tabs'] )

					this.fleets[i].el
						.attr('data-fleet', i)
						.appendTo( this.doms['ships'] )

					i++
				}

		// 根据数据更新DOM
			this.update( d )
		
		this._theme = this._theme
		
		// 事件: 默认司令部等级更新
			$body.on('update_defaultHqLv.fleet'+this.data._id, function(e, val){
				if( this.el.data('is_show') ){
					if( !this._hqlv )
						this.doms['hqlvOption'].val(val)
					this.doms['hqlvOptionLabel'].data('tip', this.tip_hqlv_input.printf(val) )
					this.doms['hqlvOption'].attr('placeholder', val)
				}
			}.bind(this))
	}



	// 根据数据更新内容
	update( d ){
		this._updating = true
		d = d || {}
				
		// check d.data if is JSON
		// if not, decompress and JSON.parse
			d['data'] = InfosFleet.decompress(d['data'])

		// 主题颜色
			if( typeof d['theme'] != 'undefined' ){
				_frame.infos.dom.main.attr('data-theme', d['theme'])
				this.doms['theme'].val(d['theme']).attr('value', d['theme'])
			}

		// 标题
			if( typeof d['name'] != 'undefined' )
				this.doms['name'].trigger('namechange',[d['name']]).trigger('blur')

		// 分舰队
			if( d['data'] && d['data'].push ){
				d['data'].forEach(function(currentValue, i){
					//_g.log(currentValue)
					this.fleets[i].updateEl(currentValue)
				}, this)
			}
		
		this._updating = false
	}



	// 每个操作都会更新数据，并触发更新数据库倒计时
	update_data( d ){
		d = d || {}
		this.update(d)
	}



	// 更新数据库



	
	// 舰队名
		get _name(){
			return this.data['name']
		}
		set _name( value ){
			this.data['name'] = value
			this.doms['name'].html(value)

			if( value ){
				this.doms['name'].attr('data-content', value)
			}else{
				this.doms['name'].removeAttr('data-content')
			}
			
			this.save()
		}

	// 主题
		get _theme(){
			return this.data['theme']
		}
		set _theme( value ){
			this.data['theme'] = value || 1
			this.doms['theme'].val(this.data['theme']).attr('value', this.data['theme'])
			_frame.infos.dom.main.attr('data-theme', this.data['theme'])
			this.el.attr('data-theme', this.data['theme'])
			_frame.dom.main.attr('data-theme', this.data['theme'])
			this.save()
		}
	
	// 司令部等级
		get _hqlv(){
			if( this.data['hq_lv'] > 0 )
				return this.data['hq_lv']
			return 0
		}
		set _hqlv( value ){
			value = parseInt(value)
			let last = this._hqlv
			if( value && value > 0 ){
				this.data['hq_lv'] = value
				this.doms['hqlvOption'].val(value)
			}else{
				value = -1
				this.data['hq_lv'] = -1
				this.doms['hqlvOption'].val(Lockr.get('hqLvDefault', _g.defaultHqLv))
			}
			if( last != value ){
				let i = 0;
				while(i < 4){
					this.fleets[i].summaryCalc(true)
					i++
				}
				this.save()
			}
		}
	
	// 保存
		save( not_save_to_file ){
			if( this._updating )
				return this
			
			if( this.is_init ){
				this.data.data = []
				this.fleets.forEach(function(currentValue, i){
					this.data.data[i] = currentValue.data
				}, this)
				
				// 更新时间
				this.data.time_modify = _g.timeNow()
				
				// 清理Array中的null值
				/*
				let deleteNull = function(arr){
					if( arr && arr.length && arr.push ){
						arr.forEach(function(value, i){
							if( value === null ){
								delete arr[i]
								console.log(arr)
							}
							if( value && value.length && value.push )
								deleteNull(value)
						})
					}
				}
				deleteNull(this.data.data)
				
				//_g.log(this)
				_g.log(JSON.stringify(this.data.data))
				*/
				
				// JSON.stringify and compress this.data.data
				//console.log(this.data)
				//this.data.data = InfosFleet.compress(this.data.data)
				
				if( !not_save_to_file ){
					clearTimeout( this.delay_updateDb )
					this.delay_updateDb = setTimeout(function(){
						_db.fleets.updateById(this.data._id, InfosFleet.compressMetaData(this.data), function(){
							_g.log('saved')
							InfosFleet.decompressMetaData(this.data)
						}.bind(this))
						clearTimeout( this.delay_updateDb )
						this.delay_updateDb = null
					}.bind(this), 200)
				}
			}
			
			this.is_init = true			
			return this
		}
	
	// 浮动窗口
		modalExport_show(){
			InfosFleet.modalExport_show(this.data)
		}
		modalExportText_show(){
			InfosFleet.modalExportText_show(this.data)
		}
	
	// 导出图片
		exportPic(){
			if( !InfosFleet.fileDialog_export ){
				InfosFleet.fileDialog_export = $('<input type="file" accept=".png" nwsaveas/>')
					.on({
						'click': function(e, windowWidth, windowHeight){
							InfosFleet.fileDialog_export.data({
									'windowWidth':	windowWidth,
									'windowHeight': windowHeight
								})
							InfosFleet.fileDialog_export_showing = true
						},
						'change': function(){
							let path = InfosFleet.fileDialog_export.val()
							InfosFleet.fileDialog_export.val('')
							
							_g.log('changed')
							
							setTimeout(function(){
								node.win.capturePage(function(buffer){
									let wstream = node.fs.createWriteStream(path);
									wstream.write(buffer);
									wstream.end();
								}, { format : 'png', datatype : 'buffer'})
							}, 0)
						},
						'resetCaptureMode': function(){
							if( !InfosFleet.fileDialog_export.val() && $body.hasClass('mod-capture') ){
								$body.removeClass('mod-capture')
								node.win.resizeTo(
									InfosFleet.fileDialog_export.data('windowWidth'),
									InfosFleet.fileDialog_export.data('windowHeight')
								)
								InfosFleet.fileDialog_export.data({
										'windowWidth':	null,
										'windowHeight': null
									})
								_menu.hideAll()
							}
						}
					})
					.appendTo(_frame.dom.hidden)
				$window.on('focus.resetCaptureMode', function(){
					if( InfosFleet.fileDialog_export_showing )
						setTimeout(function(){
							InfosFleet.fileDialog_export.trigger('resetCaptureMode')
							InfosFleet.fileDialog_export_showing = false
						}, 100)
				})
			}
			// 存储当前窗口尺寸
				let windowWidth = $window.width()
					,windowHeight = $window.height()
			
			// 改变样式
				$body.addClass('mod-capture')
				node.win.resizeTo( 1280, 720 )
			
			// 选择文件
				InfosFleet.fileDialog_export.trigger('click', [windowWidth, windowHeight])
		}
}
InfosFleet.modalExport = function(curval){
	if( !InfosFleet.elModalExport ){
		InfosFleet.elModalExport = $('<div/>')
			.append(
				InfosFleet.elModalExportTextarea = $('<textarea/>',{
					'readonly': true
				})
			)
			.append(
				$('<p class="note-codeusage"/>').html('* 该配置代码可用于<a href="http://www.kancolle-calc.net/deckbuilder.html">艦載機厨デッキビルダー</a>')
			)
			.append(
				$('<button class="button"/>').html('复制到剪切板')
					.on('click', function(){
						node.clipboard.set(InfosFleet.elModalExportTextarea.val(), 'text');
					})
			)
	}
	InfosFleet.elModalExportTextarea.val(curval || '')
	
	return InfosFleet.elModalExport
}
InfosFleet.modalExport_show = function(data){
	data = InfosFleet.decompress(data.data || [])

	/*
	data = JSON.stringify(data)
	while( data.indexOf(',null]') > -1 )
		data = data.replace(/\,null\]/g,']')
	while( data.indexOf('[null]') > -1 )
		data = data.replace(/\[null\]/g,'[]')
	*/
	
	data = JSON.stringify( _g.kancolle_calc.encode(data) )

	_frame.modal.show(
		InfosFleet.modalExport(data),
		'导出配置代码',
		{
			'classname': 	'infos_fleet infos_fleet_export'
		}
	)
}
InfosFleet.modalExportText_show = function(data){
	if( !data )
		return false
	
	let text = ''
		,fleets = InfosFleet.decompress(data.data).filter(function(value){
						return value.length
					}) || []
	
	text+= data.name || ''
	
	fleets.forEach(function(fleet, i){
		//console.log(fleet)
		text+= (text ? '\n' : '')
			+ ( fleets.length > 1 ? '\n第 ' + (i+1) + ' 舰队' : '')
		fleet.filter(function(value){
			return value.length > 0 && value[0] 
		}).forEach(function(ship, j){
			text+= '\n'
				+ '(' + (i ? (i+1) + '-' : '') + (j+1) + ')'
				+ _g.data.ships[ship[0]]._name
				+ ( ship[1] && ship[1][0] ? ' Lv.' + ship[1][0] : '' )
			let equipments = ship[2] || []
				,stars = ship[3] || []
				,ranks = ship[4] || []
			equipments.filter(function(value){
				return value
			}).forEach(function(equipment, k){
				text+= (!k ? ' | ' : ', ')
					+ _g.data.items[equipment]._name
					+ (stars[k] ? '★'+stars[k] : '')
					+ (ranks[k] ? '['+_g.textRank[ranks[k]]+']' : '')
			})
		})
	})
	
	text+= (text ? '\n\n' : '')
		+ '* 创建自 是谁呼叫舰队 (fleet.diablohu.com)'

	_frame.modal.show(
		InfosFleet.modalExport(text),
		'导出配置文本',
		{
			'classname': 	'infos_fleet infos_fleet_export mod-text'
		}
	)
}
InfosFleet.decompress = function(code){
	if( code && !code.push ){
		try{
			code = JSON.parse( LZString.decompressFromEncodedURIComponent(code) )
		}catch(e){
			_g.error(e)
		}
	}
	return code
}
InfosFleet.compress = function(code){
	if( code && code.push ){
		try{
			code = LZString.compressToEncodedURIComponent( JSON.stringify( code ) )
		}catch(e){
			_g.error(e)
		}
	}
	return code
}
InfosFleet.compressMetaData = function(code){
	if( code && code.data && code.data.push ){
		try{
			code.data = InfosFleet.compress( code.data )
		}catch(e){
			_g.error(e)
		}
	}
	return code
}
InfosFleet.decompressMetaData = function(code){
	if( code && code.data && !code.data.push ){
		try{
			code.data = InfosFleet.decompress( code.data )
		}catch(e){
			_g.error(e)
		}
	}
	return code
}







// 类：子舰队
class InfosFleetSubFleet{
	constructor(infosFleet, d, index){
		d = d || []
		this.data = d

		this.el = $('<dl class="fleetinfos-ships"/>')
		
		this.ships = []

		// 6个舰娘
			let i = 0
			while( i < 6 ){
				this.ships[i] = new InfosFleetShip(infosFleet, this, i)
				this.ships[i].getEl().appendTo( this.el )
				//$('<s/>').appendTo( this.el )
				i++
			}
		
		// 舰队综合属性
			this.elSummary = $('<span class="summary"/>')
				//.html('<h4 data-content="舰队数据">舰队数据</h4>')
				.appendTo( this.el )
				.append(
					$('<span class="summary-item"/>')
						.html('航速')
						.append(
							this.elSummarySpeed = $('<strong/>').html('-')
						)
				)
				.append(
					$('<span class="summary-item"/>')
						.html('制空战力')
						.append(
							this.elSummaryFighterPower = $('<strong/>').html('-')
						)
				)
				.append(
					$('<span class="summary-item"/>')
						.html('索敌能力')
						.append(
							this.elSummaryLos = $('<strong/>').html('-')
						)
				)
				.append(
					$('<span class="summary-item summary-item-consummation"/>')
						.html('总消耗')
						.append(
							this.elSummaryConsummation = $('<strong/>').html('-')
						)
				)
				/*
				.append(
					$('<span class="summary-item"/>')
						.html('索敌能力')
						.append(
							this.elSummaryLOS = $('<strong/>')
						)
				)*/
		
		this.infosFleet = infosFleet

		this.updateEl()
		
		// 事件: 默认司令部等级更新
			$body.on('update_defaultHqLv.fleet'+infosFleet.data._id+'-'+(index+1), function(){
				if( this.infosFleet.el.data('is_show') )
					this.summaryCalc(true)
			}.bind(this))
	}


	// 更新元数据
	
	// 根据元数据更新页面元素
		updateEl(d){
			this.data = d || this.data
			if( d )
				d.forEach(function(currentValue, i){
					this.ships[i].updateEl(currentValue)
				}, this)
		}
	
	// 获取当前状态的元数据
		getData(){
			return this.data
		}
	
	// 遍历该子舰队下全部装备，计算相关舰队数据
		summaryCalc( is_onlyHqLvChange ){
			if( this.summaryCalculating )
				return false
			
			this.summaryCalculating = setTimeout(function(){
				if( !is_onlyHqLvChange ){
					let fighterPower = [0, 0]
						//,fighterPower = 0
						//,los = {}
						,fleetSpeet = 'fast'
						,consumFuel = 0
						,consumAmmo = 0
					
					this.ships.forEach(function(shipdata){
						if( shipdata.data[0] ){
							let ship = _g.data.ships[shipdata.data[0]]
							
							// 航速
								if( ship.stat.speed < 10 )
									fleetSpeet = 'slow'
							
							// 制空战力
								//fighterPower+= shipdata.calculate('fighterPower')
								shipdata.calculate('fighterPower_v2').forEach(function(val, i){
									fighterPower[i]+= val > 0 ? val : 0
								})
							
							// 索敌能力
							/*
								let losData = shipdata.calculate('losPower')
								for(let i in losData){
									if( typeof losData[i] == 'object' ){
										los[i] = los[i] || {}
										for(let j in losData[i]){
											los[i][j] = los[i][j] || 0
											los[i][j]+= losData[i][j]
										}
									}else{
										los[i] = los[i] || 0
										los[i]+= losData[i]
									}
								}
								*/
							
							// 总消耗
								consumFuel+= ship.getAttribute('fuel', shipdata.shipLv) || 0
								consumAmmo+= ship.getAttribute('ammo', shipdata.shipLv) || 0
						}
					})
					
					this.elSummarySpeed.html( fleetSpeet == 'fast' ? '高速' : '低速' )
					
					//this.elSummaryFighterPower.html( fighterPower > 0 ? Math.floor(fighterPower) : '-' )
					//if( fighterPower > 0 )
					//	this.elSummaryFighterPower.removeClass('empty')
					//else
					//	this.elSummaryFighterPower.addClass('empty')
					if( Math.max( fighterPower[0], fighterPower[1] ) > 0 ){
						let val1 = Math.floor(fighterPower[0])
							,val2 = Math.floor(fighterPower[1])
						this.elSummaryFighterPower.html(
							val1 == val2
								? val1
								: val1 + '~' + val2
						)
						this.elSummaryFighterPower.removeClass('empty')
					}else{
						this.elSummaryFighterPower.html( '-' )
						this.elSummaryFighterPower.addClass('empty')
					}
					
					this.elSummaryConsummation.html(
						(consumFuel || consumAmmo)
							? '<span class="fuel">' + consumFuel + '</span><span class="ammo">' + consumAmmo + '</span>'
							: '-'
					)
				}

				let los = this.summaryCalcLos()
				if( los.y_estimate && los.y_std_error ){
					//_g.log(los)
					let losMin = (los.y_estimate - los.y_std_error).toFixed(1)
						,losMax = (los.y_estimate + los.y_std_error).toFixed(1)
					if( losMin < 0 )
						losMin = 0
					if( losMax < 0 )
						losMax = 0
					this.elSummaryLos.html( losMin == losMax ? losMin : losMin + '~' + losMax )
				}

				this.summaryCalculating = null
			}.bind(this), 10)
		}
	
	// 计算: 索敌能力
		summaryCalcLos(){			
			let hq_lv = this.infosFleet.data.hq_lv || Lockr.get('hqLvDefault', _g.defaultHqLv)
			if( hq_lv < 0 )
				hq_lv = Lockr.get('hqLvDefault', _g.defaultHqLv)
			
			var x = {
				'DiveBombers': 		0,
				'TorpedoBombers': 	0,
				'CarrierRecons':	0,
				'SeaplaneRecons':	0,
				'SeaplaneBombers':	0,
				'SmallRadars':		0,
				'LargeRadars':		0,
				'Searchlights':		0,
				'statLos':			0,
				'hqLv':				hq_lv,
			};
			
			this.ships.forEach(function(shipdata){
				if( shipdata && shipdata.shipId ){
					// ship, equipments_by_slot, star_by_slot, rank_by_slot, options
					// shipdata.shipId, shipdata.data[2], shipdata.data[3], shipdata.data[4]
					let equipments_by_slot = shipdata.data[2].map(function(equipment){
							if( !equipment )
								return null
							if( equipment instanceof Equipment )
								return equipment
							return _g.data.items[equipment]
						}) || []
					equipments_by_slot.forEach(function(equipment){
						if( equipment ){
							//console.log(equipment)
							for(let i in x){
								if( Formula.equipmentType[i]
									&& Formula.equipmentType[i].push
									&& Formula.equipmentType[i].indexOf(equipment.type) > -1
								)
									x[i]+= equipment.stat.los
								}
						}
					})
					let shipLv = shipdata.shipLv || 1
						,shipLos = _g.data.ships[shipdata.shipId].getAttribute('los', shipLv) || 1
					if( shipLv < 0 )
						shipLv = 1
					if( shipLos < 0 )
						shipLos = 1
					x.statLos+= Math.sqrt(shipLos)
				}
			})
			
			return Formula.calc.losPower(x);
		}



	
	// 保存
		save(){
			// 如果该子舰队下没有任何数据，则存储数据时不传输该子舰队数据
			let allEmpty = true
			this.data = this.data || []
			
			this.ships.forEach(function(currentValue,i){
				this.data[i] = currentValue.data
				
				if( currentValue.data[0] )
					allEmpty = false
			}, this)
			
			if( allEmpty )
				this.data = null
			
			if( this.infosFleet )
				this.infosFleet.save()
		}
}







// 类：舰娘
class InfosFleetShip{
	constructor(infosFleet, infosFleetSubFleet, index, d){
		// 数据结构
		/* [
				STRING 舰娘ID,
				[
					NUMBER 等级,
					NUMBER 运，如果没有特殊指定则为 -1
				],
				[
					NUMBER 装备ID,	// 实际装备
					...
				],
				[
					NUMBER 改修星级,	// 实际装备
					...
				],
				[
					NUMBER 熟练度, 	// 实际装备
				]
			]*/
		// 数据实例
		// ["319",[91,40],[50,58,58,101],[7,6,0,0]]
		// ["144",[96,-1],[122,29,88],[1,0,0]
		// ["145",[96,-1],[122,29,29],[]]
		// ["403",[83,-1],[127,58],[0,0]]
		
		// 数据正在更新中，禁止触发任何存储操作
		//this._updating = false

		if( this.el )
			return this.el

		d = d || [null, [null, -1], [], [], []]
		this.data = d
		this.infosFleet = infosFleet
		this.infosFleetSubFleet = infosFleetSubFleet		
		this.equipments = []
		this.index = index
		
		this.el = $('<dd class="noship"/>')
			// 头像 & 名称
			.append(
				$('<dt/>')
					.append(
						this.elAvatar = $('<s/>').on({
							'mousedown': function(e){
								e.preventDefault()
								if( this.data[0] )
									InfosFleetShip.dragStart( this )
							}.bind(this)
						})
					)
					.append(
						this.elInfos = $('<div/>').html('<span>选择舰娘...</span>')
							.append(
								this.elInfosTitle = $('<div class="title"/>')
							)
							.append(
								$('<div class="info"/>')
									.append(
										$('<label/>').html('Lv.')
											.append(
												this.elInputLevel = $('<input/>',{
													'type':	'number',
													'min':	0,
													'max':	150
												}).on({
													'change': function(e){
														let value = this.elInputLevel.val()
														
														if( (typeof value == 'undefined' || value === '') && this.data[1][0] )
															this.shipLv = null
														
														value = parseInt(value)
														if( value < 0 ){
															value = 0
															this.elInputLevel.val(0)
														}else if( value > 150 ){
															value = 150
															this.elInputLevel.val(150)
														}
														if( !isNaN(value) && this.data[1][0] != value )
															this.shipLv = value
													}.bind(this),
													'input': function(){
														this.elInputLevel.trigger('change')
													}.bind(this)
												})
											)
									)
									.append(
										this.elInfosInfo = $('<span/>')
									)
							)
					)
			)
			// 装备
			.append(
				$('<div class="equipments"/>').append(function(){
					let els = $()
					for( let i=0; i<4; i++ ){
						this.equipments[i] = new InfosFleetShipEquipment(this, i)
						els = els.add(this.equipments[i].el)
					}
					//this.elAttrbutes = $('<div class="equipment"/>')
					//els = els.add(this.elAttrbutes)
					return els
				}.bind(this))
			)
			// 属性
			.append(
				$('<div class="attributes"/>')
					.append(
						this.elAttrShelling = $('<span class="shelling"/>')
					)
					.append(
						this.elAttrTorpedo = $('<span class="torpedo"/>')
					)
					.append(
						this.elAttrHitSum = $('<span class="hitsum"/>')
					)
					.append(
						this.elAttrHp = $('<span class="hp"/>')
					)
					.append(
						this.elAttrArmor = $('<span class="armor"/>')
					)
					.append(
						this.elAttrEvasion = $('<span class="evasion"/>')
					)
					.append(
						this.elAttrNightBattle = $('<span class="nightbattle" data-text="夜战"/>')
					)
				/*
					.append($('<span class="shelling"/>').html('炮击力').append(
						this.elAttrShelling = $('<strong/>').html('-')
					))
					*/
			)
			// 选项/操作
			.append(
				$('<div class="options"/>')
					.append(
						this.elBtnOptions = $('<button class="options"/>').on('click', function(e){
								this.showMenu()
							}.bind(this))
					)
				/*
					.append(
						$('<button/>',{
							'html':			'i',
							'data-tip':		'查看资料'
						}).on('click', function(e){
								_frame.infos.show('[[SHIP::'+this.shipId+']]', $(this))
								e.stopPropagation()
							}.bind(this))
					)
					.append(
						$('<button/>').html('×')
							.on('click', function(e){
								this.shipId = null
								e.preventDefault()
								e.stopPropagation()
							}.bind(this))
					)*/
			)
			// 事件
			.on({
				// [点击] 无舰娘时，选择舰娘
					'click': function(){
						if( !this.data[0] )
							this.selectShipStart()
					}.bind(this),
					
					'mouseenter': function(e){
						InfosFleetShip.dragEnter(this)
					}.bind(this)
			})
		
		this.after = $('<s/>')
		
		this.els = this.el.add(this.after)

		//this.updateEl()
	}
	
	// 返回页面元素
		getEl(){
			return this.els
		}
	
	// 开始选择
		selectShipStart(){
			_g.log('开始选择舰娘')

			//_frame.infos.hide()
			//_frame.app_main.cur_page = null
			_frame.app_main.load_page('ships', {
				callback_modeSelection_select:		function(id){
					history.back()
					this.shipId = id
					this.shipLv = null
					if( this.infosFleet )
						_frame.infos.dom.main.attr('data-theme', this.infosFleet.data['theme'])
				}.bind(this)
			})
		}
	
	// 更改运
		changeLuck(luck){
			this.data[1][1] = luck || -1
		}
	
	// 计算并显示属性
		updateAttrs(){
			this.elAttrShelling.html( this.calculate('shellingDamage') )
			this.elAttrTorpedo.html( this.calculate('torpedoDamage') )
			
			let hitSum = this.calculate('addHit')
				if( hitSum >= 0 )
					this.elAttrHitSum.removeClass('negative')
				else
					this.elAttrHitSum.addClass('negative')
				this.elAttrHitSum.html( hitSum )

			this.elAttrHp.html( this.calculate('attribute', 'hp') )
			this.elAttrArmor.html( this.calculate('attribute', 'armor') + this.calculate('addArmor') )
			
			let attrEvasion = this.shipLv ? this.calculate('attribute', 'evasion') : -1
				this.elAttrEvasion.html( attrEvasion >= 0
											? attrEvasion + this.calculate('addEvasion')
											: '-' )

			this.elAttrNightBattle.html( this.calculate('nightBattle') )
		}
	
	// 单项属性计算
		calculate(type, attr){
			if( !this.shipId )
				return '-'
			if( type == 'attribute' )
				return _g.data.ships[this.shipId].getAttribute(attr, this.shipLv)
			if( Formula[type] ){
				switch(type){
					case 'losPower':
						return Formula[type]( this.shipId, this.data[2], this.data[3], this.data[4], {
							'hqLv':		this.infosFleet.data.hq_lv,
							'shipLv':	this.shipLv
						} )
						break;
					default:
						return Formula[type]( this.shipId, this.data[2], this.data[3], this.data[4] )
						break;
				}
			}
			return '-'
		}

	// 更新元数据
	
	// 根据元数据更新页面元素
		updateEl(d){
			this._updating = true
			
			this.data = d || this.data
		
			if( typeof this.data[0] == 'string' )
				this.data[0] = parseInt(this.data[0])
			if( !this.data[2] )
				this.data[2] = []
			if( !this.data[3] )
				this.data[3] = []
			if( !this.data[4] )
				this.data[4] = []
			
			if( this.data[0] )
				this.shipId = this.data[0]
			
			if( this.data[1][0] )
				this.shipLv = this.data[1][0]
			
			for( let i=0; i<4; i++ ){
				this.equipments[i].id = this.data[2][i]
				this.equipments[i].star = this.data[3][i]
				this.equipments[i].rank = this.data[4][i]
			}
			
			this.updateAttrs()
			
			this._updating = false
		}
	
	// 获取当前状态的元数据
		getData(){
			return this.data
		}
	
	// 显示舰娘相关操作菜单
		showMenu(){
			InfosFleetShip.menuCurObj = this
		
			if( !InfosFleetShip.menu ){
				InfosFleetShip.menuItems = [
					$('<menuitem class="move move-up"/>').html(' ')
						.on({
							'click': function(e){
								InfosFleetShip.menuCurObj.moveUp()
							},
							'show': function(){
								if( InfosFleetShip.menuCurObj.index )
									InfosFleetShip.menuItems[0].removeClass('disabled')
								else
									InfosFleetShip.menuItems[0].addClass('disabled')
							}
						}),
					$('<menuitem class="move move-down"/>').html(' ')
						.on({
							'click': function(e){
								InfosFleetShip.menuCurObj.moveDown()
							},
							'show': function(){
								if( InfosFleetShip.menuCurObj.index < 5 )
									InfosFleetShip.menuItems[1].removeClass('disabled')
								else
									InfosFleetShip.menuItems[1].addClass('disabled')
							}
						}),
					
					$('<hr/>'),
					
					$('<menuitem/>').html('查看资料')
						.on({
							'show': function(){
								InfosFleetShip.menuItems[3].attr(
									'data-infos',
									'[[SHIP::'+InfosFleetShip.menuCurObj.shipId+']]'
								)
							}
						}),
						
					$('<menuitem/>').html('移除')
						.on({
							'click': function(e){
								InfosFleetShip.menuCurObj.shipId = null
							}
						}),
						
					$('<menuitem/>').html('替换为 ...')
						.on({
							'click': function(e){
								InfosFleetShip.menuCurObj.selectShipStart()
							}
						}),
						
					$('<div/>').on('show', function(){
						var $div = InfosFleetShip.menuItems[6].empty()
						if( InfosFleetShip.menuCurObj.shipId ){
							var series = _g['data']['ships'][InfosFleetShip.menuCurObj.shipId].getSeriesData() || []
							if( series.length > 1 ){
								series.forEach(function(currentValue, i){
									if( !i )
										$div.append($('<hr/>'))
									if( currentValue['id'] != InfosFleetShip.menuCurObj.shipId )
									$div.append(
										$('<menuitem/>')
											.html('替换为 ' + _g['data']['ships'][currentValue['id']].getName(true))
											.on({
												'click': function(){
													InfosFleetShip.menuCurObj.shipId = currentValue['id']
												}
											})
									)
								})
							}
						}
					})
				]
				InfosFleetShip.menu = new _menu({
					'className': 'contextmenu-ship',
					'items': InfosFleetShip.menuItems
				})
			}
		
			InfosFleetShip.menu.show(this.elBtnOptions)
		}
	
	// 移动
		swap(target, save){
			if( typeof target == 'number' )
				target = this.infosFleetSubFleet.ships[target]

			if( this.index > target.index ){
				this.el.insertBefore(target.el)
			}else{
				this.el.insertAfter(target.after)
			}
			this.after.insertAfter(this.el)
			
			let newIndex_dragging = target.index
				,newIndex_enter = this.index
			
			console.log(newIndex_dragging, newIndex_enter)
			
			this.index = newIndex_dragging
			target.index = newIndex_enter
			this.infosFleetSubFleet.ships[newIndex_dragging] = this
			this.infosFleetSubFleet.ships[newIndex_enter] = target
			
			if( save )
				this.save()
		}
		moveUp(){
			if( this.index <= 0 )
				return
			
			this.swap( this.index - 1, true )
		}
		moveDown(){
			if( this.index >= 5 )
				return
			
			this.swap( this.index + 1, true )
		}
	
	
	
	// 舰娘ID
		get shipId(){
			return this.data[0]
		}
		set shipId( value ){
			if( value != this.data[0] ){
				this.data[0] = value
				this.shipLv = null
			}
			
			if( value ){
				let ship = _g.data.ships[value]
					,suffix = ship.getSuffix()
					,speed = ship._speed
					,stype = ship._type
				
				stype = stype.replace(speed, '')
					
				this.el.attr('data-shipId', value)
				this.el.removeClass('noship')
				this.elAvatar.html('<img src="' + ship.getPic(10) + '"/>')
				this.elInfosTitle.html('<h4 data-content="'+ship['name'][_g.lang]+'">' +ship['name'][_g.lang]+'</h4>'
										+ ( suffix
											? '<h5 data-content="'+suffix+'">' +suffix+'</h5>'
											: ''
										)
									)
				this.elInfosInfo.html( speed + ' ' + stype )
				
				// 装备栏数据
					for( let i=0; i<4; i++ ){
						this.equipments[i].carry = ship.slot[i]
						if( !this._updating ){
							this.equipments[i].id = null
							this.equipments[i].star = null
							this.equipments[i].rank = null
						}
					}
			}else{
				this.el.removeAttr('data-shipId')
				this.el.addClass('noship')
				this.elAvatar.html('')
				this.data[2] = []
				this.data[3] = []
				this.data[4] = []
				// [null, [null, -1], [], [], []]
			}
			
			this.save()
		}
	
	// 舰娘等级
		get shipLv(){
			return this.data[1][0]
		}
		set shipLv( value ){
			this.data[1][0] = value || null
			if( value && value > 0 ){
				this.elInputLevel.val( value )
			}else{
				this.elInputLevel.val('')
			}
			//this.el.attr('data-shipLv', value)
			
			this.save()
		}
	
	// 舰娘运
	
	// 保存
		save(){
			if( this._updating )
				return false

			/*
			// 计算属性
				if( !this._updateTimeout ){
					this._updateTimeout = setTimeout(function(){
						this.updateAttrs()
						this.infosFleetSubFleet.summaryCalc()
						this._updateTimeout = null
					}.bind(this), 10)
				}

			if( !this._saveTimeout ){
				this._saveTimeout = setTimeout(function(){
					if( this.infosFleetSubFleet )
						this.infosFleetSubFleet.save()
					
					this._saveTimeout = null
				}.bind(this), 1000)
			}
			*/
			if( !this._updateTimeout ){
				this._updateTimeout = setTimeout(function(){
					this.updateAttrs()
					if( this.infosFleetSubFleet ){
						this.infosFleetSubFleet.summaryCalc()
						this.infosFleetSubFleet.save()
					}
					this._updateTimeout = null
				}.bind(this), 50)
			}
		}
}
InfosFleetShip.dragStart = function(infosFleetShip){
	if( InfosFleetShip.dragging || !infosFleetShip )
		return false

	InfosFleetShip.dragging = infosFleetShip
	infosFleetShip.el.addClass('moving')
	
	if( !InfosFleetShip.isInit ){
		$body.on({
			'mouseup.InfosFleetShip_dragend': function(){
				if( InfosFleetShip.dragging ){
					InfosFleetShip.dragging.el.removeClass('moving')
					InfosFleetShip.dragging.save()
					InfosFleetShip.dragging = null
				}
			}
		})
		InfosFleetShip.isInit = true
	}
}
InfosFleetShip.dragEnter = function(infosFleetShip_enter){
	if( !InfosFleetShip.dragging || !infosFleetShip_enter || InfosFleetShip.dragging == infosFleetShip_enter )
		return false
	
	InfosFleetShip.dragging.swap(infosFleetShip_enter)
}







// 类：装备
class InfosFleetShipEquipment{
	constructor(infosFleetShip, index){
		// 数据结构
		/* [
				STRING 舰娘ID,
				[
					NUMBER 等级,
					NUMBER 运，如果没有特殊指定则为 -1
				],
				[
					NUMBER 装备ID,	// 实际装备
					...
				],
				[
					NUMBER 改修星级,	// 实际装备
					...
				]
			]*/
		// 数据实例
		// ["319",[91,40],[50,58,58,101],[7,6,0,0]]
		// ["144",[96,-1],[122,29,88],[1,0,0]
		// ["145",[96,-1],[122,29,29],[]]
		// ["403",[83,-1],[127,58],[0,0]]

		// 直接对 infosFleetShip.data 相关数据进行读写 
		
		this.index = index || 0
		this.infosFleetShip = infosFleetShip
		
		// 数据正在更新中，禁止触发任何存储操作
		//this._updating = false

		if( this.el )
			return this.el
		
		this.el = $('<div class="equipment"/>')
					.append(
						this.elCarry = $('<div class="equipment-layer equipment-add"/>')
										.on('click', function(){
											this.selectEquipmentStart()
										}.bind(this))
					)
					.append(
						$('<div class="equipment-layer equipment-infos"/>')
							.append(
								this.elName = $('<span class="equipment-name"/>')
							)
							.append(
								this.elStar = $('<span class="equipment-star"/>').html(0)
							)
							.append(
								this.elRank = $('<span class="equipment-rank"/>')
							)
							.append(function(){
								let el = $('<span class="equipment-carry"/>').html(0)
								this.elCarry = this.elCarry.add( el )
								return el
							}.bind(this))
					)
					.append(
						$('<div class="equipment-layer equipment-options"/>')
							.append(
								this.elInputStar = $('<input/>',{
									'class':		'equipment-starinput',
									'type':			'number',
									'placeholder':	0
								}).on('input', function(){
									let value = this.elInputStar.val()
									
									if( (typeof value == 'undefined' || value === '') && this.star )
										this.star = null
									
									value = parseInt(value)
									if( !isNaN(value) && this.star != value )
										this.star = value
								}.bind(this))				
							)
							.append(
								this.elSelectRank = $('<div/>',{
									'class':	'equipment-rankselect',
									'html': 	'<span>无</span>'
								}).on('click', function(){
									if( !InfosFleet.menuRankSelect ){
										InfosFleet.menuRankSelectItems = $('<div/>')
										for(let i=0; i<8; i++){
											$('<button class="rank-' + i + '"/>')
												.html( !i ? '无' : '' )
												.on('click', function(){
													InfosFleet.menuRankSelectCur.rank = i
												})
												.appendTo(InfosFleet.menuRankSelectItems)
										}
										InfosFleet.menuRankSelect = new _menu({
											'className': 'contextmenu-infos_fleet_rank_select',
											'items': [InfosFleet.menuRankSelectItems]
										})
									}
									InfosFleet.menuRankSelectCur = this
									InfosFleet.menuRankSelect.show(this.elSelectRank)
								}.bind(this))				
							)
							.append(
								//this.elButtonInspect = $('<button class="inspect"/>').html('资料').on('click', function(){
								this.elButtonInspect = $('<button class="inspect" icon="search"/>').on('click', function(){
									if( this.id )
										_frame.infos.show('[[EQUIPMENT::' + this.id + ']]')
								}.bind(this))
							)
							.append(
								//$('<button class="change"/>').html('更变').on('click',function(){
								$('<button class="change" icon="loop"/>').on('click',function(){
									this.selectEquipmentStart()
								}.bind(this))
							)
							.append(
								$('<button class="remove"/>').html('×').on('click',function(){
									this.id = null
								}.bind(this))
							)
					)
	}
	
	// 返回页面元素
		getEl(){
			return this.el
		}
	
	// 开始选择
		selectEquipmentStart(){
			_g.log('开始选择装备')

			_frame.app_main.load_page('equipments', {
				callback_modeSelection_select: function(id){
					history.back()
					this.id = id
					this.star = 0
					this.rank = (Lockr.get( 'fleetlist-option-aircraftdefaultmax' )
									&& id
									&& _g.data.items[id].rankupgradable
									&& $.inArray(_g.data.items[id].type, Formula.equipmentType.Aircrafts) > -1
								) ? 7 : 0
					TablelistEquipments.types = []
					TablelistEquipments.shipId = null
					if( this.infosFleetShip.infosFleet )
						_frame.infos.dom.main.attr('data-theme', this.infosFleetShip.infosFleet.data['theme'])
				}.bind(this),
				callback_modeSelection_enter: function(){
					TablelistEquipments.types = _g.data.ships[this.infosFleetShip.shipId].getEquipmentTypes()
					TablelistEquipments.shipId = this.infosFleetShip.shipId
					_frame.app_main.page['equipments'].object.tablelistObj.apply_types()
				}.bind(this)
			})
		}
	
	// 获取当前状态的元数据
		getData(){
			return this.data
		}
	
	
	
	// 装备ID
		get id(){
			return this.infosFleetShip.data[2][this.index]
		}
		set id( value ){
			value = parseInt(value) || null
			//this.star = 0
			_p.tip.hide()
			this.el.removeData(['tip', 'tip-filtered'])
			
			if( value != this.infosFleetShip.data[2][this.index] )
				this.star = 0
			
			if( value && !isNaN(value) ){
				this.infosFleetShip.data[2][this.index] = value
				this.improvable = _g.data.items[value].improvable || false
				this.el.attr({
							'data-equipmentid': value,
							'data-tip':			'[[EQUIPMENT::' +value+ ']]'
						})
						.css('background-image', 'url('+_g.data.items[value]._icon+')')
				this.elName.html(_g.data.items[value]._name)
				// 如果装备为飞行器，标记样式
					if( $.inArray(_g.data.items[value].type, Formula.equipmentType.Aircrafts) > -1 ){
						this.el.addClass('is-aircraft')
						if( _g.data.items[value].rankupgradable )
							this.el.addClass('is-rankupgradable')
					}else
						this.el.removeClass('is-aircraft')
			}else{
				this.infosFleetShip.data[2][this.index] = null
				this.improvable = false
				this.el.removeAttr('data-equipmentId')
						.removeAttr('data-tip')
						.removeAttr('data-star')
						.removeAttr('data-rank')
						.css('background-image', '')
						.removeClass('is-aircraft is-rankupgradable')
				this.elName.html('')
			}
			
			this.infosFleetShip.infosFleetSubFleet.summaryCalc()
			this.save()
		}
	
	// 改修星级
		get star(){
			return this.infosFleetShip.data[3][this.index]
		}
		set star( value ){
			if( this._improvable ){
				value = parseInt(value) || null
				
				if( value > 10 )
					value = 10
				
				if( value < 0 )
					value = 0
				
				if( value ){
					this.infosFleetShip.data[3][this.index] = value
					this.elInputStar.val( value )
					this.elStar.html(value)
					this.el.attr('data-star', value)
				}else{
					this.infosFleetShip.data[3][this.index] = null
					this.elInputStar.val('')
					this.elStar.html(0)
					this.el.attr('data-star', '')
				}
				
			}else{
				this.infosFleetShip.data[3][this.index] = null
				this.el.removeAttr('data-star')
			}
			this.infosFleetShip.infosFleetSubFleet.summaryCalc()
			this.save()
		}
	
	// 熟练度
		get rank(){
			return this.infosFleetShip.data[4][this.index]
		}
		set rank( value ){
			if( this.id && $.inArray(_g.data.items[this.id].type, Formula.equipmentType.Aircrafts) > -1 ){
				value = parseInt(value) || null
				
				if( value > 7 )
					value = 7
				
				if( value < 0 )
					value = 0
				
				if( value ){
					this.infosFleetShip.data[4][this.index] = value
					this.el.attr('data-rank', value)
				}else{
					this.infosFleetShip.data[4][this.index] = null
					this.el.attr('data-rank', '')
				}
				
			}else{
				this.infosFleetShip.data[4][this.index] = null
				this.el.removeAttr('data-rank')
			}
			this.infosFleetShip.infosFleetSubFleet.summaryCalc()
			this.save()
		}
	
	// 搭载数 & 是否可用
		set carry(value){
			if( typeof value == 'undefined' ){
				this.el.removeAttr('data-carry')
				this.elCarry.html(0)
			}else{
				value = parseInt(value) || 0
				this.el.attr('data-carry', value)
				this.elCarry.html(value)
			}
		}
	
	// 是否可改修
		set improvable(value){
			if( !value ){
				this.el.removeAttr('data-star')
				this.elInputStar.prop('disabled', true)
								.attr('placeholder', '--')
				this._improvable = false
			}else{
				this.el.attr('data-star', '')
				this.elInputStar.prop('disabled', false)
								.attr('placeholder', '0')
				this._improvable = true
			}
		}
	
	// 保存
		save(){
			if( this._updating )
				return false
			if( this.infosFleetShip ){
				//this.infosFleetShip.data[2][this.index] = this.id
				//this.infosFleetShip.data[3][this.index] = this.star
				this.infosFleetShip.save()
			}
		}
}

// 舰队配置 - OUTPUT
	_frame.infos.__fleet__OUTPUT = function( id ){
		return $('<div class="infos-fleet loading"/>')
			.append(
				$('<div class="loading-msg"/>').html('Loading...')
			)
	}
// 舰娘信息

_frame.infos.__ship = function( id ){
	var d = _g.data.ships[ id ]

	_g.log(d)

	function _val( val, show_zero ){
		if( !show_zero && (val == 0 || val == '0') )
			return '<small class="zero">-</small>'
		if( val == -1 || val == '-1' )
			return '<small class="zero">?</small>'
		return val
	}
	function _add_stat( name, title, tar ){
		let val99, val150

		switch( name ){
			case 'hp':
				val99 = _val( d.getAttribute('hp', 99) )
				val150 = _val( d.getAttribute('hp', 150) )
				break;
			case 'asw':
				val99 = _val( d.getAttribute('asw', 99), /^(5|8|9|12|24)$/.test(d['type']) )
				val150 = _val( d.getAttribute('asw', 150), /^(5|8|9|12|24)$/.test(d['type']) )
				break;
			case 'evasion':
			case 'los':
				val99 = _val( d.getAttribute(name, 99) )
				val150 = _val( d.getAttribute(name, 150) )
				break;
			case 'speed':
				val99 = _g.getStatSpeed( d['stat']['speed'] )
				break;
			case 'range':
				val99 = _g.getStatRange( d['stat']['range'] )
				break;
			case 'luck':
				val99 = d['stat']['luck'] + '<sup>' + d['stat']['luck_max'] + '</sup>'
				val150 = (d['stat']['luck'] + 3) + '<sup>' + d['stat']['luck_max'] + '</sup>'
				break;
			case 'fuel':
			case 'ammo':
				val99 = d.getAttribute(name, 99)
				val150 = d.getAttribute(name, 150)
				break;
			default:
				val99 = _val( d.getAttribute(name, 99) )
				break;
		}

		$('<span/>')
			.html(
				'<small class="stat-'+name+'">' + title + '</small>'
				+ '<em'+( val150 ? ' class="lvl99"' : '' )+'>' + val99 + '</em>'
				+ ( val150 ? '<em class="lvl150">' + val150 + '</em>' : '' )
				//+ '<em class="lvl99'+( !val150 ? ' lvl150' : '' )+'">' + val99 + '</em>'
				//+ ( val150 ? '<em class="lvl150">' + val150 + '</em>' : '' )
			)
			.appendTo(tar)
	}

	//_frame.modal.resetContent()

	var dom = $('<div class="infos-ship"/>')
					.attr('data-infos-title', d._name + ' - 舰娘')
		,ship_name = d.getName(_g.joint) || '舰娘'
		,illustrations = []
		,has_no = d['no'] && parseInt(d['no']) < 500 ? true : false

	// 名称 & 舰种 & 舰级
		$('<div class="title"/>')
			.html(
				'<h2 data-content="' + ship_name + '">' + ship_name + '</h2>'
				+ '<small>'
					+ '<span data-tip="' + (has_no ? '图鉴编号' : '无图鉴编号') + '">No.'
						+ ( has_no
							? d['no']
							: '-'
						)
					+ '</span>'
					+ ( d['class'] ? _g['data']['ship_classes'][d['class']]['name_zh'] + '级' : '' )
					+ ( d['class_no'] ? '<em>' + d['class_no'] + '</em>号舰' : '' )
					+ ( d['type'] ? ' / ' + _g['data']['ship_types'][d['type']]['full_zh'] : '' )
				+ '</small>'
			).appendTo(dom)

	// 属性
		//var lvlRadio99_id = '_input_g' + parseInt(_g.inputIndex)
		//	,lvlRadio150_id = '_input_g' + (parseInt(_g.inputIndex) + 1)
		var lvlRadio99_id = id + '_stat_lv_99'
			,lvlRadio150_id = id + '_stat_lv_150'
			,curLvl = parseInt(_config.get('ship_infos_lvl') || 99)
			,stats = $('<div class="stats"/>')
						.html(
							'<div class="title">'
								+ '<h4 data-content="基础属性">基础属性</h4>'
								+ '<span>'
									+ '<label for="'+lvlRadio99_id+'" class="lvl99">99</label>'
									+ '<label for="'+lvlRadio150_id+'" class="lvl150">150</label>'
								+ '</span>'
							+ '</div>'
						)
						.prepend(
							$('<input type="radio" name="ship_infos_lvl_'+id+'" id="'+lvlRadio99_id+'" value="99" checked/>')
								.prop('checked', curLvl == 99)
								.on('change', function(){
									_config.set('ship_infos_lvl', 99)
								})
						)
						.prepend(
							$('<input type="radio" name="ship_infos_lvl_'+id+'" id="'+lvlRadio150_id+'" value="150"/>')
								.prop('checked', curLvl == 150)
								.on('change', function(){
									_config.set('ship_infos_lvl', 150)
								})
						)
						.appendTo(dom)
			,stat1 = $('<div class="stat"/>').appendTo(stats)
			,stat2 = $('<div class="stat"/>').appendTo(stats)
			,stat3 = $('<div class="stat"/>').appendTo(stats)
			,stat_consum = $('<div class="stat consum"/>').appendTo(stats)

		_g.inputIndex+=2

		_add_stat( 'hp', 		'耐久',	stat1 )
		_add_stat( 'armor', 	'装甲',	stat1 )
		_add_stat( 'evasion', 	'回避',	stat1 )
		_add_stat( 'carry', 	'搭载',	stat1 )

		_add_stat( 'fire', 		'火力',	stat2 )
		_add_stat( 'torpedo', 	'雷装',	stat2 )
		_add_stat( 'aa', 		'对空',	stat2 )
		_add_stat( 'asw', 		'对潜',	stat2 )

		_add_stat( 'speed', 	'航速',	stat3 )
		_add_stat( 'range', 	'射程',	stat3 )
		_add_stat( 'los', 		'索敌',	stat3 )
		_add_stat( 'luck', 		'运',	stat3 )

		_add_stat( 'fuel', 		'油耗',	stat_consum )
		_add_stat( 'ammo', 		'弹耗',	stat_consum )

	// 初始装备 & 搭载量
		var equips = $('<div class="equipments"/>').html('<h4 data-content="初始装备 & 搭载量">初始装备 & 搭载量</h4>').appendTo(dom)
			,i = 0
		while( i < 4 ){
			var equip = $('<a/>').appendTo(equips)
				,icon = $('<i/>').appendTo( equip )
				,name = $('<small/>').appendTo( equip )
				,slot = $('<em/>').appendTo( equip )

			if( typeof d['slot'][i] == 'undefined' ){
				equip.addClass('no')
			}else if( typeof d['equip'][i] == 'undefined' || !d['equip'][i] || d['equip'][i] === '' ){
				equip.addClass('empty')
				name.html( '--未装备--' )
				slot.html( d['slot'][i] )
			}else{
				var item_data = _g.data.items[d['equip'][i]]
					,item_icon = 'assets/images/itemicon/'
									+ item_data.getIconId()
									+ '.png'
				equip.attr({
					'data-equipmentid': 	d['equip'][i],
					'data-tip-position': 	'left',
					'data-infos': 			'[[EQUIPMENT::'+d['equip'][i]+']]',
					'data-tip':				'[[EQUIPMENT::'+d['equip'][i]+']]',
					'href':					'?infos=equipment&id=' + d['equip'][i]
				})
				name.html(
					item_data.getName(true)
				)
				slot.html( d['slot'][i] )
				icon.css(
					'background-image',
					'url(' + item_icon + ')'
				)
			}
			i++
		}

	// 近代化改修（合成）
		var modernization = $('<div class="modernization"/>').html('<h4 data-content="合成">合成</h4>').appendTo(equips)
			,stats = $('<div class="stats"/>').appendTo(modernization)
			,has_modernization = false
		if( d['modernization'] )
			d['modernization'].forEach(function(currentValue, i){
				if( currentValue ){
					has_modernization = true
					var stat
					switch(i){
						case 0: stat = 'fire'; break;
						case 1: stat = 'torpedo'; break;
						case 2: stat = 'aa'; break;
						case 3: stat = 'armor'; break;
					}
					$('<span class="stat-' + stat + '"/>').html('+' + currentValue).appendTo(stats)
				}
			})
		// まるゆ
			if( d['id'] == 163 )
				$('<span class="stat-luck"/>').html('+1.2').appendTo(stats)
			if( d['id'] == 402 )
				$('<span class="stat-luck"/>').html('+1.6').appendTo(stats)
		if( !has_modernization )
			modernization.addClass('no').append($('<em/>').html('-'))
	
	// 可额外装备
		if( d['additional_item_types'] && d['additional_item_types'].length ){
			var additional_equipment_types = $('<div class="add_equip"/>').appendTo(dom)
				,_additional_equipment_types = $('<div/>').html('<h4 data-content="特有装备类型">特有装备类型</h4>').appendTo(additional_equipment_types)
			d['additional_item_types'].forEach(function(currentValue){
				let _d = _g['data']['item_types'][currentValue]
				_additional_equipment_types.append(
					$('<span/>')
						.html(_d['name'][_g.lang])
						.css({
							'background-image': 'url(assets/images/itemicon/'
									+ _d['icon']
									+ '.png'+')'
						})
				)
			})
		}

	// 声优 & 画师 & 消耗
		let cvId = d.getRel('cv')
			,illustratorId = d.getRel('illustrator')
			,cvLink = $('<a/>',{
					'class':		'entity'
				})
				.html(
					'<strong>声优</strong>'
					+ '<span>' + ( d._cv || '?' ) + '</span>'
				)
				.appendTo(dom)
			,illustratorLink = $('<a/>',{
					'class':		'entity'
				})
				.html(
					'<strong>画师</strong>'
					+ '<span>' + ( d._illustrator || '?' ) + '</span>'
				)
				.appendTo(dom)
		if( cvId )
			cvLink.attr({
				'href':			'?infos=entity&id=' + cvId,
				'data-infos':	'[[ENTITY::' + cvId + ']]'
			})
		if( illustratorId )
			illustratorLink.attr({
				'href':			'?infos=entity&id=' + illustratorId,
				'data-infos':	'[[ENTITY::' + illustratorId + ']]'
			})
			/*
		var consum = $('<span class="consum"/>').html('<strong>消耗</strong>').appendTo(dom)
		_add_stat( 'fuel', 		'', _val( d['consum']['fuel'] ),		consum )
		_add_stat( 'ammo', 		'', _val( d['consum']['ammo'] ),		consum )
		*/

	// 图鉴
		// illustrations
		var illusts = $('<aside class="illustrations"/>').appendTo(dom)
			,illusts_container = $('<div/>').appendTo(illusts)

	// 改造信息
		//var remodels = $('<div class="remodels"/>').html('<h4 data-content="改造">改造</h4>').appendTo(dom)
		let remodels = $('<div class="remodels"/>').html('<h4 data-content="改造">改造</h4>').insertBefore(illusts)
			,remodels_container = _p.el.flexgrid.create().appendTo( remodels )
			,seriesData = d.getSeriesData()
		if( seriesData ){
			seriesData.forEach(function(currentValue, i){
				let remodel_ship_data = _g.data.ships[currentValue['id']]
					,remodel_ship_name = remodel_ship_data.getName(_g.joint)
					,tip = '<h3 class="shipinfo">'
								+ '<strong data-content="' + remodel_ship_name + '">'
									+ remodel_ship_name
								+ '</strong>'
								+ (
									remodel_ship_data['type'] ?
										'<small>' + _g['data']['ship_types'][remodel_ship_data['type']]['full_zh'] + '</small>'
										: ''
								)
							+ '</h3>'
					,data_prev = i ? seriesData[ i - 1 ] : null
					,remodel_lvl = data_prev ? data_prev['next_lvl'] : null
					,remodel_blueprint = data_prev ? (data_prev['next_blueprint']) : null
					,remodel_catapult = data_prev ? (data_prev['next_catapult']) : null
					,has_extra_illust = currentValue.illust_extra && currentValue.illust_extra.length && currentValue.illust_extra[0] ? true : false
				
				if( remodel_blueprint || remodel_catapult ){
					if( remodel_blueprint )
						tip+= '<span class="requirement is-blueprint">需要：改装设计图</span>'
					if( remodel_catapult )
						tip+= '<span class="requirement is-catapult">需要：试制甲板弹射器</span>'
				}
				
				if( !has_extra_illust && currentValue.illust_delete && data_prev )
					has_extra_illust = data_prev.illust_extra && data_prev.illust_extra.length && data_prev.illust_extra[0] ? true : false

				remodels_container.appendDOM(
					$('<a/>',{
							'class':		'unit'
											+ (currentValue['id'] == d['id'] ? ' on' : '')
											+ (remodel_blueprint ? ' mod-blueprint' : '')
											+ (remodel_catapult ? ' mod-catapult' : ''),
							'href':			'?infos=ship&id=' + currentValue['id'],
							'data-shipid':	currentValue['id'],
							'data-infos': 	'[[SHIP::'+ currentValue['id'] +']]',
							'data-tip': 	tip,
							'data-infos-nohistory': true,
							'html':			'<i><img src="' + _g.path.pics.ships + '/' + currentValue['id']+'/0.webp"/></i>'
											+ (remodel_lvl ? '<strong>' + remodel_lvl + '</strong>' : '')
											+ (has_extra_illust ? '<em icon="hanger"></em>' : '')
						})
				)
				
				if( currentValue.next_loop )
					remodels_container.appendDOM(
						$('<span class="unit" icon="loop-alt3" data-tip="可在两个改造版本间切换"/>').html(' ')
					)

				// 处理图鉴信息
					if( currentValue['id'] == d['id'] ){
						if( currentValue.illust_delete ){
							if( data_prev ){
								illustrations.push( data_prev['id'] )
								if( data_prev.illust_extra && data_prev.illust_extra.length && data_prev.illust_extra[0] ){
									data_prev.illust_extra.forEach(function(cur){
										illustrations.push( 'extra_' + cur )
									})
								}
							}
						}else{
							illustrations.push( currentValue['id'] )
							if( currentValue.illust_extra && currentValue.illust_extra.length && currentValue.illust_extra[0] ){
								currentValue.illust_extra.forEach(function(cur){
									illustrations.push( 'extra_' + cur )
								})
							}
						}
					}
			})
			
			let index = 0
			function check_append( file ){
				//file = file.replace(/\\/g, '/')
				try{
					let stat = node.fs.lstatSync(file)
					if( stat && stat.isFile() ){
						index++
						let radioid = 'ship_' + d['id'] +'_illustrations_' + index
						$('<input type="radio" name="ship_'+d['id']+'_illustrations" id="'+radioid+'" value="'+index+'"' + (index==1 ? ' checked' : '') + '/>')
							.prop('checked', (index == 1))
							.insertBefore(illusts_container)
						$('<label for="'+radioid+'"/>').insertBefore(illusts_container)
						$('<span/>')
							.html('<img src="'+file+'" data-filename="'+ship_name+' - '+index+'.webp"/>')
							//.css('background-image', 'url(' + file + ')')
							.appendTo(illusts_container)
					}
				}catch(e){}
			}
			illustrations.forEach(function(currentValue){
				check_append( node.path.normalize(_g.path.pics.ships) + currentValue + '/8.webp' )
				check_append( node.path.normalize(_g.path.pics.ships) + currentValue + '/9.webp' )
			})
			/*
			_db.ship_series.find({'id': d['series']}, function(err,docs){
				console.log(docs, d.getSeriesData())
				if( !err && docs && docs.length ){
					// 遍历 docs[0].ships
						for(var i in docs[0].ships){
							var _i = parseInt(i)
								,remodel_ship_data = _g.data.ships[docs[0].ships[i]['id']]
								,remodel_ship_name = remodel_ship_data.getName(_g.joint)
								,tip = '<h3 class="shipinfo">'
											+ '<strong data-content="' + remodel_ship_name + '">'
												+ remodel_ship_name
											+ '</strong>'
											+ (
												remodel_ship_data['type'] ?
													'<small>' + _g['data']['ship_types'][remodel_ship_data['type']]['full_zh'] + '</span>'
													: ''
											)
										+ '</h3>'
								,remodel_lvl = _i ? docs[0].ships[ _i - 1 ]['next_lvl'] : null
								,remodel_blueprint = _i ? (docs[0].ships[ _i - 1 ]['next_blueprint']) : null

							remodels_container.appendDOM(
								$('<button class="unit" data-shipid="'+ docs[0].ships[i]['id'] +'"/>')
									.attr({
										'data-infos': 	'[[SHIP::'+ docs[0].ships[i]['id'] +']]',
										'data-tip': 	tip,
										'data-infos-nohistory': true
									})
									.addClass(docs[0].ships[i]['id'] == d['id'] ? 'on' : '')
									.addClass(remodel_blueprint ? 'blueprint' : '')
									.html(
										'<i><img src="' + _g.path.pics.ships + '/' + docs[0].ships[i]['id']+'/0.webp"/></i>'
										+ (remodel_lvl ? '<strong>' + remodel_lvl + '</strong>' : '')
									)
							)

							// 处理图鉴信息
								if( docs[0].ships[i]['id'] == d['id'] ){
									if( docs[0].ships[i].illust_delete ){
										if( _i ){
											illustrations.push( docs[0].ships[_i - 1]['id'] )
											if( docs[0].ships[_i - 1].illust_extra && docs[0].ships[_i - 1].illust_extra.length && docs[0].ships[_i - 1].illust_extra[0] ){
												//illustrations = illustrations.concat('extra_'+docs[0].ships[_i - 1].illust_extra)
												for( var j in docs[0].ships[_i - 1].illust_extra ){
													illustrations.push( 'extra_' + docs[0].ships[_i - 1].illust_extra[j] )
												}
											}
										}
									}else{
										illustrations.push( docs[0].ships[i]['id'] )
										if( docs[0].ships[i].illust_extra && docs[0].ships[i].illust_extra.length && docs[0].ships[i].illust_extra[0] ){
											for( var j in docs[0].ships[i].illust_extra ){
												illustrations.push( 'extra_' + docs[0].ships[i].illust_extra[j] )
											}
											//illustrations = illustrations.concat('extra_'+docs[0].ships[i].illust_extra)
										}
									}
								}
						}
						var index = 0
						function check_append( file ){
							file = file.replace(/\\/g, '/')
							try{
								var stat = node.fs.lstatSync(file)
								if( stat && stat.isFile() ){
									index++
									$('<input type="radio" name="ship_'+d['id']+'_illustrations" value="'+index+'"/>')
										.prop('checked', (index == 1))
										.insertBefore(illusts_container)
									$('<span class="container"/>')
										.html('<img src="'+file+'" data-filename="'+ship_name+' - '+index+'.webp"/>')
										//.css('background-image', 'url(' + file + ')')
										.appendTo(illusts_container)
								}
							}catch(e){}
						}
						for( var i in illustrations ){
							//if( i )
							//	check_append( _g.path.pics.ships + '/' + illustrations[i] + '/2.jpg' )
							check_append( _g.path.pics.ships + '/' + illustrations[i] + '/8.webp' )
							check_append( _g.path.pics.ships + '/' + illustrations[i] + '/9.webp' )
						}
				}
			})*/
		}

	return dom
}

_frame.app_main.is_mode_selection = function(){
	return $html.hasClass('mode-selection') || _frame.dom.layout.hasClass('mode-selection')
}

_frame.app_main.mode_selection_callback = null

_frame.app_main.mode_selection_on = function( callback ){
	if( !_frame.dom.navSelectionInfo ){
		_frame.dom.navSelectionInfo = $('<div class="selection-info"/>').html('请选择……').appendTo( _frame.dom.nav )
	}
	callback = callback || function(){}
	callback()
	_frame.dom.layout.addClass('mode-selection')
}

_frame.app_main.mode_selection_off = function(){
	if( _frame.app_main.cur_page )
		_frame.app_main.page_dom[_frame.app_main.cur_page].trigger('modeSelectionExit')
	_frame.dom.layout.removeClass('mode-selection')
}

if( typeof _p.tip != 'undefined' ){

_p.tip.filters.push( function(cont){
	var exp = /^\[\[EQUIPMENT\:\:([0-9]+)\]\]$/.exec(cont)
	if( exp && exp.length > 1 )
		return _p.tip.content_equipment( _g.data.items[ parseInt(exp[1]) ] )
} )

_p.tip.content_equipment = function( d ){

	function _stat(stat, title){
		if( d['stat'][stat] ){
			switch(stat){
				case 'range':
					return '<span>射程: ' + _g.getStatRange( d['stat'][stat] ) + '</span>';
					break;
				default:
					var val = parseInt( d['stat'][stat] )
					return '<span>' + ( val > 0 ? '+' : '') + val + ' ' + title + '</span>'
					break;
			}
		}else{
			return ''
		}
	}

	var item_icon = 'assets/images/itemicon/'
						+ d.getIconId()
						+ '.png'
		,item_name = d.getName()
		,html = '<h3 class="itemstat">'
					+ '<s style="background-image: url(' + item_icon + ')"></s>'
					+ '<strong data-content="' + item_name + '">'
						+ item_name
					+ '</strong>'
					+ '<small>' + _g.data.item_types[d['type']]['name']['zh_cn'] + '</small>'
				+ '</h3>'
				+ _stat('fire', '火力')
				+ _stat('torpedo', '雷装')
				+ _stat('aa', '对空')
				+ _stat('asw', '对潜')
				+ _stat('bomb', '爆装')
				+ _stat('hit', '命中')
				+ _stat('armor', '装甲')
				+ _stat('evasion', '回避')
				+ _stat('los', '索敌')
				+ _stat('range', '射程')

	return html

}}

if( typeof _p.tip != 'undefined' ){

_p.tip.filters.push( function(cont){
	var exp = /^\[\[SHIP\:\:([0-9]+)\]\]$/.exec(cont)
	if( exp && exp.length > 1 )
		return _p.tip.content_ship( _g.data.ships[ parseInt(exp[1]) ] )
} )

_p.tip.content_ship = function( d ){
	var ship_name = d.getName(_g.joint)
		,html = '<h3 class="shipinfo">'
				+ '<img src="' + _g.path.pics.ships + '/' + d['id']+'/0.webp" width="160" height="40"/>'
				+ '<strong data-content="' + ship_name + '">'
					+ ship_name
				+ '</strong>'
				+ (
					d['type'] ?
						'<small>' + _g['data']['ship_types'][d['type']]['full_zh'] + '</span>'
						: ''
				)
			+ '</h3>'

	return html

}}

/*
 */
_p.el.tablelist = {
	init_el: function(el){
		if( el.data('tablelist') )
			return true

		if( el.hasClass('ships') )
			el.data({
				'tablelist': new TablelistShips( el )
			})
		else if( el.hasClass('tablelist-equipments') )
			el.data({
				'tablelist': new TablelistEquipments( el )
			})
		else if( el.hasClass('fleets') )
			el.data({
				'tablelist': new TablelistFleets( el )
			})
		else if( el.hasClass('entities') )
			el.data({
				'tablelist': new TablelistEntities( el )
			})
		/*
		else
			el.data({
				'tablelist': new _tablelist( el )
			})*/
	},

	init: function(tar, els){
		tar = tar || $body;
		els = els || tar.find('.tablelist')

		els.each(function(){
			_p.el.tablelist.init_el($(this))
		})
	}
}





class Tablelist{
	constructor( container, options ){
		this.dom = {
			'container': container
		}
		
		options = options || {}
		
		this._index = Tablelist.index++
		this.trIndex = 0
		this.flexgrid_empty_count = options.flexgrid_empty_count || 8
		this.sort_data_by_stat = options.sort_data_by_stat || {}
		this.sort_default_order_by_stat = options.sort_default_order_by_stat || {}
		/*
		if( this.is_init )
			return true
	
		if( this['_' + this.listtype + '_init'] )
			this['_' + this.listtype + '_init']()
	
		this.is_init = true
		*/
	}

	// 添加选项
		append_option( type, name, label, value, suffix, options ){
			options = options || {}
			function gen_input(){
				let input
					,option_empty
					,o_el
					//,id = '_input_g' + (_g.inputIndex++)
					,id = Tablelist.genId()
				//_g.inputIndex++
				switch( type ){
					case 'text':
					case 'number':
					case 'hidden':
						input = $('<input type="'+type+'" name="'+name+'" id="'+id+'" />').val(value)
						break;
					case 'select':
						input = $('<select name="'+name+'" id="'+id+'" />')
						option_empty = $('<option value=""/>').html('').appendTo( input )
						value.forEach(function(currentValue, i){
							if( typeof currentValue == 'object' ){
								o_el = $('<option value="' + (typeof currentValue.val == 'undefined' ? currentValue['value'] : currentValue.val) + '"/>')
									.html(currentValue['title'] || currentValue['name'])
									.appendTo( input )
							}else{
								o_el = $('<option value="' + currentValue + '"/>')
									.html(currentValue)
									.appendTo( input )
							}
							if( typeof options['default'] != 'undefined' && o_el.val() == options['default'] ){
								o_el.prop('selected', true)
							}
						})
						if( !value || !value.length ){
							option_empty.remove()
							$('<option value=""/>').html('...').appendTo( input )
						}
						if( options['new'] ){
							$('<option value=""/>').html('==========').insertAfter( option_empty )
							$('<option value="___new___"/>').html('+ 新建').insertAfter( option_empty )
							input.on('change.___new___', function(){
								var select = $(this)
								if( select.val() == '___new___' ){
									select.val('')
									options['new']( input )
								}
							})
						}
						break;
					case 'checkbox':
						input = $('<input type="'+type+'" name="'+name+'" id="'+id+'" />').prop('checked', value)
						break;
					case 'radio':
						input = $();
						value.forEach(function(currentValue, i){
							var title, val
								,checked = false
							if( value[i].push ){
								val = value[i][0]
								title = value[i][1]
							}else{
								val = value[i].val || value[i].value
								title = value[i].title || value[i].name
							}
							if( options.radio_default && options.radio_default == val )
								checked = true
							input = input.add(
								$('<input type="radio" name="'+name+'" id="'+id+'-'+val+'" ischecked="'+checked+'" />')
									.val(val)
									.prop('checked', (checked || (!checked && i == 0) ))
								)
							input = input.add($('<label for="'+id+'-'+val+'"/>').html( title ))
						})
						break;
				}
		
				if( options.required ){
					input.prop('required', true)
				}
		
				if( options.onchange ){
					input.on('change.___onchange___', function(e){
						options.onchange( e, $(this) )
					})
					if( options['default'] )
						input.trigger('change')
				}
		
				if( !name )
					input.attr('name', null)
		
				return input
			}
		
			let line = $('<p/>').addClass(name).appendTo( this.dom.filters )
				,input = gen_input().appendTo(line)
				//,id = '_input_g' + parseInt(_g.inputIndex)
				,id = input.attr('id') || Tablelist.genId()
		
			label = label ? $('<label for="'+id+'"/>').html( label ).appendTo(line) : null
		
			if( type == 'checkbox' && label )
				label.insertAfter(input)
		
			if( suffix )
				$('<label for="'+id+'"/>').html(suffix).appendTo(line)
		
			//_g.inputIndex++
			return line
		}

		// 强制 thead 重绘，以解决某些CSS计算延迟问题
			thead_redraw( timeout_duration ){
				if( this.dom.thead && this.dom.thead.length ){
					var thead = this.dom.thead
					setTimeout(function(){
						thead.hide().show(0)
					}, timeout_duration || 10)
				}
			}

		// 表格排序相关
			// 排序表格中正在显示行中某一列(td:nth-of-type)
			// 返回一个Array，每一个元素为jQuery DOM Object
			// is_ascending 	是否为升序，默认降序
			// rows				目标行，默认为全部可见行
				sort_column( nth, is_ascending, rows ){
					if( !rows ){
						let tbody = this.dom.tbody
						if( !tbody || !tbody.length )
							tbody = this.dom.table.find('tbody')
						//rows = tbody.find('tr.row:visible').not('[data-donotcompare]')
						rows = tbody.find('tr.row:visible:not([data-donotcompare])')
					}
					nth = nth || 1
		
					// 建立临时用对象，在函数结束时delete
						this._tmp_values = []
						this._tmp_value_map_cell = {}
		
					// 遍历，将值全部导出到 _tmp_values，_tmp_value_map_cell 中记录 值 -> jQuery DOM
						rows.find('td:nth-of-type(' + nth + ')').each(function(index, element){
							let cell = $(element)
								//,val = cell.data('value')
								,val = cell.attr('data-value')
		
							val = parseFloat(val)
		
							if( $.inArray( val, this._tmp_values ) < 0 )
								this._tmp_values.push( val )
		
							if( !this._tmp_value_map_cell[val] )
								this._tmp_value_map_cell[val] = $()
		
							this._tmp_value_map_cell[val] = this._tmp_value_map_cell[val].add( cell )
						}.bind(this))
		
					// 排序
						this._tmp_values.sort(function(a, b){
							if( is_ascending )
								return a-b
							else
								return b-a
						})
		
					// 根据排序结果，整理返回结果
						let return_array = []
						this._tmp_values.forEach(function(currentValue){
							return_array.push( this._tmp_value_map_cell[currentValue] )
						}, this)
		
					// delete 临时对象
						delete this._tmp_values
						delete this._tmp_value_map_cell
		
					return return_array
				}

			// 标记表格全部数据列中第一和第二高值的单元格
				mark_high( cacheSortData ){
					let tbody = this.dom.tbody
		
					if( !tbody || !tbody.length )
						tbody = this.dom.table.find('tbody')
		
					//let rows = tbody.find('tr.row:visible').not('[data-donotcompare]')
					let rows = tbody.find('tr.row:visible:not([data-donotcompare])')
		
					rows.find('td[data-value]').removeClass('sort-first sort-second')
		
					rows.eq(0).find('td[data-value]').each(function(index, element){
						let is_ascending = false
							,$this = $(element)
							,stat = $this.data('stat')
		
						// 以下属性不进行标记，但仍计算排序
							,noMark = stat.match(/\b(speed|range|extra_illust)\b/ )
		
						if( typeof this.sort_default_order_by_stat[stat] == 'undefined' ){
							// 以下属性为升序
								if( stat.match(/\b(consum_fuel|consum_ammo)\b/ ) )
									is_ascending = true
							this.sort_default_order_by_stat[stat] = is_ascending ? 'asc' : 'desc'
						}else{
							is_ascending = this.sort_default_order_by_stat[stat] == 'asc' ? true : false
						}
		
						let sort = this.sort_column( index+1, is_ascending, rows )
							,max = Math.min( 6, Math.ceil(rows.length / 2) + 1 )
		
						if( !noMark && sort.length > 1 && sort[0].length < max ){
							sort[0].addClass('sort-first')
							if( sort.length > 2 && sort[1].length < max )
								sort[1].addClass('sort-second')
						}
						
						//console.log(is_ascending, sort)
		
						// 将排序结果存储到表头对应的列中
							if( cacheSortData )
								this.sort_data_by_stat[stat] = sort
							else
								delete( this.sort_data_by_stat[stat] )
		
					}.bind(this))
		
					return rows
				}

			// thead td, thead th
			// 点击表头单元格，表格排序
				sort_table_from_theadcell( cell ){
					if( !cell )
						return
					
					let stat = cell.data('stat')
						,sortData = this.sort_data_by_stat[stat]
					
					console.log(stat, sortData)
						
					if( !stat || !sortData )
						return false
		
					if( stat != this.lastSortedStat ){
						if( this.lastSortedHeader )
							this.lastSortedHeader.removeClass('sorting desc asc')
						cell.addClass('sorting')
					}
		
					let order = (stat == this.lastSortedStat && this.lastSortedOrder == 'obverse')
									? 'reverse'
									: 'obverse'
						,i = order == 'reverse' ? sortData.length - 1 : 0
		
					if( this.sort_default_order_by_stat[stat] ){
						let reverse = this.sort_default_order_by_stat[stat] == 'asc' ? 'desc' : 'asc'
						if( order == 'obverse' ){
							cell.removeClass(reverse).addClass(this.sort_default_order_by_stat[stat])
						}else{
							cell.removeClass(this.sort_default_order_by_stat[stat]).addClass(reverse)
						}
					}
		
					this.sortedRow = $()
		
					while( sortData[i] ){
						this._tmpDOM = sortData[i].parent()
						this.sortedRow = this.sortedRow.add( this._tmpDOM )
						this._tmpDOM.appendTo( this.dom.tbody )
						i = order == 'reverse' ? i - 1 : i + 1
					}
		
					// 修改排序提示按钮
						this.dom.btn_compare_sort.removeClass('disabled').html('取消排序')
		
					this.lastSortedStat = stat
					this.lastSortedOrder = order
					this.lastSortedHeader = cell
					delete this._tmpDOM
				}

			// 重置表格排序
				sort_table_restore(){
					if( !this.sortedRow )
						return true
		
					// 还原所有DOM位置
						let parent, arr = []
						this.sortedRow.each(function(index, element){
							var $this = $(element)
								,trIndex = parseInt( $this.data('trindex') )
							parent = parent || $this.parent()
							arr.push({
								'index': 	trIndex,
								'el': 		$this,
								'prev': 	parent.children('tr[data-trindex="' + (trIndex - 1) + '"]')
							})
						})
						// 如果在上一步直接将DOM移动到上一个index行的后方，可能会因为目标DOM也为排序目标同时在当前DOM顺序后，造成结果不正常
						// 故需要两步操作
						arr.sort(function(a, b){
							return a['index']-b['index']
						})
						arr.forEach(function(currentValue){
							currentValue.el.insertAfter( currentValue.prev )
						})
		
					// 修改排序提示按钮
						this.dom.btn_compare_sort.addClass('disabled').html('点击表格标题可排序')
		
					// 重置其他样式
						this.lastSortedHeader.removeClass('sorting desc asc')
		
					delete this.sortedRow
					delete this.lastSortedStat
					delete this.lastSortedOrder
					delete this.lastSortedHeader
					return true
				}
}
Tablelist.index = 0
Tablelist.genId = function(text){
	var hash = 0
		, i
		, chr
		, len
	text = text || ((new Date()).toISOString() + _g.randInt(10000));
	if (text.length == 0) return hash;
	for (i = 0, len = text.length; i < len; i++) {
		chr   = text.charCodeAt(i);
		hash  = ((hash << 5) - hash) + chr;
		hash |= 0; // Convert to 32bit integer
	}
	return 'tablelist'+hash;
}

// Entities

class TablelistEntities extends Tablelist{
	constructor( container, options ){
		super( container, options )

		// 标记全局载入状态
			_frame.app_main.loading.push('tablelist_'+this._index)
			_frame.app_main.is_loaded = false
		
		if( container.children('.tablelist-list').length ){
			this.init_parse()
		}else if( this.init_new ){
			this.init_new( options )
		}
	}
	
	
	
	
	
	
	
	
	
	init_parse(){
		this.generated = true
		_frame.app_main.loaded('tablelist_'+this._index, true)
	}
}

// Entities

TablelistEntities.prototype.append_item_cv = function( entity ){
	return _tmpl.link_entity( entity, null, false, entity.relation.cv.length ).addClass('unit cv')
}

TablelistEntities.prototype.append_item_illustrator = function( entity ){
	return $('<a/>',{
		'class':	'unit illustrator',
		'href':		'?infos=entity&id=' + entity.id,
		'html':		entity._name + ' (' + entity.relation.illustrator.length + ')'
	})
}

TablelistEntities.prototype.append_items = function( title, arr, callback_append_item ){
	let container
	
	this.dom.container
		.append(
			$('<div/>',{
				'class':	'typetitle',
				'html':		title
			})
		)
		.append(
			container = _p.el.flexgrid.create().addClass('tablelist-list')
		)
	
	arr.forEach(function(item){
		container.appendDOM( callback_append_item( item ) )
	}, this)
}

	
	
	
	
	
	
	
	
	
TablelistEntities.prototype.init_new = function(options){
	options = options || {}
	
	let listCV = [],
		listIllustrator = []
	
	for( let i in _g.data.entities ){
		let entity = _g.data.entities[i]
		if( !entity.relation )
			continue
		if( entity.relation.cv && entity.relation.cv.length )
			listCV.push(entity)
		if( entity.relation.illustrator && entity.relation.illustrator.length )
			listIllustrator.push(entity)
	}

	this.append_items(
		'声优',
		listCV.sort(function(a,b){
			return b.relation.cv.length - a.relation.cv.length
		}),
		this.append_item_cv
	)
	this.append_items(
		'画师',
		listIllustrator.sort(function(a,b){
			return b.relation.illustrator.length - a.relation.illustrator.length
		}),
		this.append_item_illustrator
	)
	
	this.generated = true
	_frame.app_main.loaded('tablelist_'+this._index, true)
}

// Equipments

class TablelistEquipments extends Tablelist{
	constructor( container, options ){
		super( container, options )

		this.columns = [
			'  ',
			['火力',	'fire'],
			['雷装',	'torpedo'],
			['对空',	'aa'],
			['对潜',	'asw'],
			['爆装',	'bomb'],
			['命中',	'hit'],
			['装甲',	'armor'],
			['回避',	'evasion'],
			['索敌',	'los'],
			['射程',	'range'],
			['可改修','improvable']
		]

		// 标记全局载入状态
			_frame.app_main.loading.push('tablelist_'+this._index)
			_frame.app_main.is_loaded = false
		
		if( container.children('.fixed-table-container').length ){
			this.init_parse()
		}else if(this.init_new){
			this.init_new()
		}
	}

	apply_types(){
		console.log('types: ' + TablelistEquipments.types)
		this.dom.filter_types.removeAttr('class')
		
		if( TablelistEquipments.types.length ){
			this.dom.filter_types.addClass('type' + TablelistEquipments.types.join(' type'))
			if( this.generated )
				this.apply_types_check()
		}
	}

	apply_types_check(){
		if( TablelistEquipments.shipIdLast && TablelistEquipments.shipIdLast == TablelistEquipments.shipId )
			return
		
		TablelistEquipments.shipIdLast = TablelistEquipments.shipId
		
		// 航母：直接进入飞行器页
		if( TablelistEquipments.shipId
			&& $.inArray(_g.data.ships[TablelistEquipments.shipId].type, [9, 10, 11] ) > -1
		){
			let k = 0
				,el
	
			while( this.dom.types[k++].attr('data-equipmentcollection') != 3
				|| $.inArray((parseInt(this.dom.types[k].attr('data-type')) || null), TablelistEquipments.types) <= -1 ){
				el = this.dom.types[k+1]
			}
			
			el = el || this.dom.types[0]
			
			this.dom.type_radios[3].prop('checked', true).trigger('change')
			this.dom.table_container_inner.scrollTop(el[0].offsetTop || 0)
			return
		}
		
		if( TablelistEquipments.types.length ){
			let k = 0
				,el
	
			while( $.inArray((parseInt(this.dom.types[k++].attr('data-type')) || null), TablelistEquipments.types) <= -1 ){
				el = this.dom.types[k]
			}
			
			el = el || this.dom.types[0]
			
			this.dom.type_radios[parseInt(el.attr('data-equipmentcollection')) || 1].prop('checked', true).trigger('change')
			this.dom.table_container_inner.scrollTop(el[0].offsetTop || 0)
		}
	}
	
	
	
	
	
	
	
	
	

	init_parse(){
		// 生成过滤器与选项
			this.dom.filter_container = this.dom.container.children('.options')
			this.dom.filters = this.dom.filter_container.children('.filters')
	
		// 装备大类切换
			this.dom.type_radios = {}
			this.dom.container.children('input[type="radio"][name="equipmentcollection"]').each(function(i, radio){
				radio = $(radio)
				let val = parseInt(radio.val())
				this.dom.type_radios[val] = radio
					.prop('checked', val == 1 )
					.on('change', function(){
						// force thead redraw
						this.dom.table_container_inner.scrollTop(0)
						this.thead_redraw()
					}.bind(this))
			}.bind(this))
		
		// 装备类型过滤
			this.dom.filter_types = this.dom.container.children('input[name="types"][type="hidden"]')
	
		// 生成表格框架
			this.dom.table_container = this.dom.container.children('.fixed-table-container')
			this.dom.table_container_inner = this.dom.table_container.children('.fixed-table-container-inner')
			this.dom.table = this.dom.table_container_inner.children('.equipments.hashover.hashover-column')
			this.dom.thead = this.dom.table.children('thead')
			this.dom.tbody = this.dom.table.children('tbody')
	
		// 生成装备数据DOM
			this.parse_all_items()
	
		// 生成底部内容框架
			this.dom.msg_container = this.dom.container.children('.msgs')
			if( !_config.get( 'hide-equipmentsinfos' ) )
				this.dom.msg_container.attr( 'data-msgs', 'equipmentsinfos' )
			else
				this.dom.msg_container.removeAttr( 'data-msgs' )
	
		// 生成部分底部内容
			let equipmentsinfos = this.dom.msg_container.children('.equipmentsinfos')
				equipmentsinfos.children('button').on('click', function(){
					this.dom.msg_container.removeAttr('data-msgs')
					_config.set( 'hide-equipmentsinfos', true )
				}.bind(this))
	}
	parse_all_items(){
		this.generated = false
		this.dom.types = []
		
		let header_index = -1

		this.dom.tbody.children('tr.typetitle,tr.row').each(function(index, tr){
			tr = $(tr)
			if( tr.hasClass('typetitle') ){
				header_index++
				this.dom.types[header_index] = tr
			}else{
				//let equipment_data = _g.data.items[ tr.attr('data-equipmentid') ]
				let etype = parseInt(tr.attr('data-equipmenttype')) || -1
					,eid = tr.attr('data-equipmentid')
				tr.on('click', function(e, forceInfos){
						if( !forceInfos && _frame.app_main.is_mode_selection() ){
							e.preventDefault()
							e.stopImmediatePropagation()
							e.stopPropagation()
							
							if( $.inArray(etype, TablelistEquipments.types) > -1 )
								_frame.app_main.mode_selection_callback(eid)
							
							//if( $.inArray(equipment_data.type, TablelistEquipments.types) > -1 )
							//	_frame.app_main.mode_selection_callback(equipment_data['id'])
						}
					})
			}
		}.bind(this))

		this.thead_redraw()
		this.generated = true
		this.apply_types_check()
		_frame.app_main.loaded('tablelist_'+this._index, true)
	}
}

TablelistEquipments.gen_helper_equipable_on = function( type_id ){
	var equipable_on = ''
	_g.data.item_types[type_id]['equipable_on_type'].forEach(function(currentValue, i){
		var item_type_id = _g.data.item_types[type_id]['equipable_on_type'][i]
		equipable_on+= '<span>'
							+ _g['data']['ship_types'][item_type_id]['full_zh']
							+ ( i < _g.data.item_types[type_id]['equipable_on_type'].length-1 ? ',&nbsp;' : '' )
						+ '</span>'
	})
	return '<em class="helper" data-tip="<h4 class=item_equipable_on>可装备于</h4>' + equipable_on + '">?</em>'
}

TablelistEquipments.types = []
TablelistEquipments.shipId = null
TablelistEquipments.shipIdLast = null

// Equipments (Other Class Functions)

TablelistEquipments.prototype.append_item = function( equipment_data, collection_id ){
	let tr = $('<tr/>',{
					'class':			'row',
					'data-equipmentid':	equipment_data['id'],
					'data-equipmentcollection':	collection_id,
					'data-infos': 		'[[EQUIPMENT::'+ equipment_data['id'] +']]',
					'data-equipmentedit':this.dom.container.hasClass('equipmentlist-edit') ? 'true' : null,
					'data-equipmenttype':equipment_data.type
				})
				.on('click', function(e, forceInfos){
					if( !forceInfos && _frame.app_main.is_mode_selection() ){
						e.preventDefault()
						e.stopImmediatePropagation()
						e.stopPropagation()
						
						if( $.inArray(equipment_data.type, TablelistEquipments.types) > -1 )
							_frame.app_main.mode_selection_callback(equipment_data['id'])
					}
				})
				.appendTo( this.dom.tbody )

	function _val( val, show_zero ){
		if( !show_zero && (val == 0 || val === '0' || val === '') )
			//return '<small class="zero">-</small>'
			return '-'
		//if( val > 0 )
		//	return '+' + val
		return val
	}

	this.columns.forEach(function(currentValue){
		switch( currentValue[1] ){
			case ' ':
				$('<th/>').html(equipment_data.getName()).appendTo(tr)
				break;
			case 'range':
				$('<td data-stat="range" data-value="' + equipment_data['stat']['range'] + '"/>')
					.html(
						equipment_data['stat']['range']
							? _g.getStatRange( equipment_data['stat']['range'] )
							: '<small class="zero">-</small>'
					)
					.appendTo(tr)
				break;
			case 'improvable':
				$('<td data-stat="range" data-value="' + (equipment_data['improvable'] ? '1' : '0') + '"/>')
					.html(
						equipment_data['improvable']
							? '✓'
							: '<small class="zero">-</small>'
					)
					.appendTo(tr)
				break;
			default:
				$('<td data-stat="'+currentValue[1]+'" data-value="' + (equipment_data['stat'][currentValue[1]] || 0) + '"/>')
					.addClass( equipment_data['stat'][currentValue[1]] < 0 ? 'negative' : '' )
					.html( _val( equipment_data['stat'][currentValue[1]] ) )
					.appendTo(tr)
				break;
		}
	})

	return tr
}

TablelistEquipments.prototype.append_all_items = function(){
	this.generated = false
	this.dom.types = []
	function _do( i, j ){
		if( _g.data.item_id_by_type[i] ){
			if( !j ){
				var data_equipmenttype = _g.data.item_types[ _g.item_type_order[i] ]
				this.dom.types.push(
					$('<tr class="typetitle" data-equipmentcollection="'+_g.data.item_id_by_type[i]['collection']+'" data-type="'+data_equipmenttype.id+'">'
							+ '<th colspan="' + (this.columns.length + 1) + '">'
								+ '<span style="background-image: url(../app/assets/images/itemicon/'+data_equipmenttype['icon']+'.png)"></span>'
								+ data_equipmenttype['name']['zh_cn']
								+ TablelistEquipments.gen_helper_equipable_on( data_equipmenttype['id'] )
							+ '</th></tr>'
						).appendTo( this.dom.tbody )
				)
			}

			this.append_item(
				_g.data.items[ _g.data.item_id_by_type[i]['equipments'][j] ],
				_g.data.item_id_by_type[i]['collection']
			)

			setTimeout(function(){
				if( j >= _g.data.item_id_by_type[i]['equipments'].length - 1 ){
					_do( i+1, 0 )
				}else{
					_do( i, j+1 )
				}
			}, 0)
		}else{
			//this.mark_high()
			// force thead redraw
				this.thead_redraw()
				this.generated = true
				this.apply_types_check()
			_frame.app_main.loaded('tablelist_'+this._index, true)
		}
	}
	_do = _do.bind(this)
	_do( 0, 0 )
}
	
	
	
	
	
	
	
	
	
TablelistEquipments.prototype.init_new = function(){
	// 生成过滤器与选项
		this.dom.filter_container = $('<div class="options"/>').appendTo( this.dom.container )
		this.dom.filters = $('<div class="filters"/>').appendTo( this.dom.filter_container )

	// 装备大类切换
		var checked = false
		this.dom.type_radios = {}
		for(var i in _g.data.item_type_collections){
			//var radio_id = '_input_g' + parseInt(_g.inputIndex)
			let radio_id = Tablelist.genId()
			this.dom.type_radios[i] = $('<input type="radio" name="equipmentcollection" id="'+radio_id+'" value="'+i+'"/>')
				.prop('checked', !checked )
				.on('change', function(){
					// force thead redraw
					this.dom.table_container_inner.scrollTop(0)
					this.thead_redraw()
				}.bind(this))
				.prependTo( this.dom.container )
			$('<label class="tab container" for="'+radio_id+'" data-equipmentcollection="'+i+'"/>')
				.html(
					'<i></i>'
					+ '<span>' + _g.data.item_type_collections[i]['name']['zh_cn'].replace(/\&/g, '<br/>') + '</span>'
				)
				.appendTo( this.dom.filters )
			checked = true
			//_g.inputIndex++
		}
	
	// 装备类型过滤
		this.dom.filter_types = $('<input name="types" type="hidden"/>').prependTo( this.dom.container )

	// 生成表格框架
		this.dom.table_container = $('<div class="fixed-table-container"/>').appendTo( this.dom.container )
		this.dom.table_container_inner = $('<div class="fixed-table-container-inner"/>').appendTo( this.dom.table_container )
		this.dom.table = $('<table class="equipments hashover hashover-column"/>').appendTo( this.dom.table_container_inner )
		function gen_thead(arr){
			this.dom.thead = $('<thead/>')
			var tr = $('<tr/>').appendTo(this.dom.thead)
			arr.forEach(function(currentValue){
				if( typeof currentValue == 'object' ){
					$('<td data-stat="' + currentValue[1] + '"/>')
						.html('<div class="th-inner-wrapper"><span><span>'+currentValue[0]+'</span></span></div>').appendTo(tr)
				}else{
					$('<th/>').html('<div class="th-inner-wrapper"><span><span>'+currentValue[0]+'</span></span></div>').appendTo(tr)
				}
			})
			return this.dom.thead
		}
		gen_thead = gen_thead.bind(this)
		gen_thead( this.columns ).appendTo( this.dom.table )
		this.dom.tbody = $('<tbody/>').appendTo( this.dom.table )

	// 生成装备数据DOM
		this.append_all_items()

	// 生成底部内容框架
		this.dom.msg_container = $('<div class="msgs"/>').appendTo( this.dom.container )
		if( !_config.get( 'hide-equipmentsinfos' ) )
			this.dom.msg_container.attr( 'data-msgs', 'equipmentsinfos' )

	// 生成部分底部内容
		var equipmentsinfos = $('<div class="equipmentsinfos"/>').html('点击装备查询初装舰娘等信息').appendTo( this.dom.msg_container )
			$('<button/>').html('&times;').on('click', function(){
				this.dom.msg_container.removeAttr('data-msgs')
				_config.set( 'hide-equipmentsinfos', true )
			}.bind(this)).appendTo( equipmentsinfos )
}

/* TODO
	新建
		导入舰载机厨URL/用户名/字符串
		加载配置文件
	导出
		配置文件
	分享
		图片
		文本
*/

class TablelistFleets extends Tablelist{
	constructor( container, options ){
		super( container, options )
		
		this.columns = [
				'  ',
				['创建者',	'user'],
				['修改时间','time_modify'],
				['评价',	'rating'],
				['',		'options']
			]
	
		this.kancolle_calc = {
			'_ApplicationId': 	'l1aps8iaIfcq2ZzhOHJWNUU2XrNySIzRahodijXW',
			'_ClientVersion': 	'js1.2.19',
			'_InstallationId': 	'62522018-ec82-b434-f5a5-08c3ab61d932',
			'_JavaScriptKey': 	'xOrFpWEQZFxUDK2fN1DwbKoj3zTKAEkgJHzwTuZ4'
		}
		
		//_g.data.fleets_tablelist = {
		//	lists: [],
		//	items: {}
		//}
	
		// 标记全局载入状态
			_frame.app_main.loading.push('tablelist_'+this._index)
			_frame.app_main.is_loaded = false
			//_g.data.fleets_tablelist.lists.push(this)

		// [创建] 过滤器与选项
			this.dom.filter_container = $('<div class="options" viewtype="card"/>').appendTo( this.dom.container )
			this.dom.filters = $('<div class="filters"/>').appendTo( this.dom.filter_container )
			// 左
				this.dom.btn_new = $('<button class="new" icon="import"/>').html('新建/导入')
									.on('click',function(e, target){
										this.btn_new(target)
									}.bind(this))
									.appendTo(this.dom.filters)
				this.dom.btn_exportFile = $('<button class="export" icon="floppy-disk"/>').html('导出配置文件')
									.on('click',function(){
										_db.fleets.persistence.compactDatafile()
										_g.file_save_as(_db.fleets.filename, 'fleets.json')
									})
									.appendTo(this.dom.filters)
			// 右 - 选项组
				this.dom.buttons_right = $('<div class="buttons_right"/>').appendTo(this.dom.filters)
				this.dom.setting_hqlv = $('<label/>',{
										'class':	'setting setting-hqlv',
										'html':		'默认司令部等级',
										'data-tip':	'如果舰队配置没有设置司令部等级，<br/>则会使用该默认数值<br/>司令部等级会影响索敌能力的计算'
									})
									.append(
										this.dom.setting_hqlv_input = $('<input/>',{
												'type':		'number',
												'min':		0,
												'max':		150
											})
											.val(Lockr.get('hqLvDefault', _g.defaultHqLv))
											.on({
												'input': function(){
													_g.updateDefaultHqLv(this.dom.setting_hqlv_input.val())
												}.bind(this),
												'focus': function(){
													this.dom.setting_hqlv_input.trigger('tipshow')
												}.bind(this),
												'blur': function(){
													this.dom.setting_hqlv_input.trigger('tiphide')
												}.bind(this),
												'click': function(e){
													e.stopImmediatePropagation()
													e.stopPropagation()
												}
											})
									)
									.appendTo(this.dom.buttons_right)
					$body.on('update_defaultHqLv.update_fleets_hqlv_input', function(e, val){
						this.dom.setting_hqlv_input.val(val)
					}.bind(this))
				this.dom.btn_settings = $('<button icon="cog"/>')
									.on('click',function(){
										this.btn_settings()
									}.bind(this))
									.appendTo(this.dom.buttons_right)
			if( !_g.isClient )
				this.dom.warning = $('<div/>',{
						'class':	'warning',
						'html':		'功能移植/测试中，请勿日常使用'
					}).appendTo( this.dom.filter_container )

		// [创建] 表格框架
			this.dom.table_container = $('<div class="fixed-table-container"/>').appendTo( this.dom.container )
			this.dom.table_container_inner = $('<div class="fixed-table-container-inner"/>').appendTo( this.dom.table_container )
			this.dom.table = $('<table class="fleets hashover hashover-column"/>').appendTo( this.dom.table_container_inner )
			function gen_thead(arr){
				this.dom.thead = $('<thead/>')
				var tr = $('<tr/>').appendTo(this.dom.thead)
				arr.forEach(function(column){
					if( typeof column == 'object' ){
						$('<td data-stat="' + column[1] + '"/>')
							.html('<div class="th-inner-wrapper"><span><span>'+column[0]+'</span></span></div>').appendTo(tr)
					}else{
						$('<th/>').html('<div class="th-inner-wrapper"><span><span>'+column[0]+'</span></span></div>').appendTo(tr)
					}
				})
				return this.dom.thead
			}
			gen_thead = gen_thead.bind(this)
			gen_thead( this.columns ).appendTo( this.dom.table )
			this.dom.tbody = $('<tbody/>').appendTo( this.dom.table )

		// [创建] 无内容时的新建提示框架
			$('<div class="nocontent container"/>')
				.append(
					$($('<div/>')
						.append($('<span>').html('暂无舰队配置'))
						.append($('<button>').html('新建/导入')
									.on('click',function(e){
										this.dom.btn_new.trigger('click', [e])
									}.bind(this))
								)
					)
				)
				.appendTo( this.dom.table_container_inner )
	
		// 右键菜单事件
			this.dom.table.on('contextmenu.contextmenu_fleet', 'tr[data-fleetid]', function(e){
				this.contextmenu_show($(e.currentTarget), null , e)
				e.preventDefault()
			}.bind(this)).on('click.contextmenu_fleet', 'tr[data-fleetid]>th>em', function(e){
				this.contextmenu_show($(e.currentTarget).parent().parent(), $(e.currentTarget))
				e.stopImmediatePropagation()
				e.stopPropagation()
			}.bind(this))

		this.genlist()
	}
	
	// 新建数据
		new_data(obj){
			return $.extend({
				'data': 		[],
				'time_create': 	(new Date()).valueOf(),
				'time_modify': 	(new Date()).valueOf(),
				'hq_lv': 		-1,
				'name': 		'',
				'note': 		'',
				'user': 		{},
				'rating': 		-1,
				'theme': 		_g.randNumber(10)
			}, obj || {})
		}

	// 读取已保存数据
		loaddata(){
			let deferred = Q.defer()
			
			_db.fleets.find({}).sort({name: 1}).exec(function(err, docs){
				if( err ){
					deferred.resolve( [] )
				}else{
					docs.forEach(function(doc){
						doc.data =  InfosFleet.decompress(doc['data'])
					})
					console.log(docs)
					deferred.resolve( docs )
				}
			})
			
			return deferred.promise
			//return []
			// PLACEHOLDER START
			/*
				var deferred = Q.defer()
				var data = $.extend( this.kancolle_calc, {
						'_method': 	'GET',
						'where': {
							'owner': 	'Diablohu'
						}
					})
				$.ajax({
					'url': 	'https://api.parse.com/1/classes/Deck',
					'data': JSON.stringify(data),
					'method': 'POST',
					'success': function( data ){
						var arr = []
						if( data && data['results'] ){
							for(var i in data['results']){
								arr.push( this.parse_kancolle_calc_data(data['results'][i]) )
							}
						}
						deferred.resolve( arr )
					}.bind(this),
					'error': function( jqXHR, textStatus, errorThrown ){
						_g.log(jqXHR)
						_g.log(textStatus)
						_g.log(errorThrown)
						deferred.resolve([])
					}
				})
				return deferred.promise
			*/
			// PLACEHOLDER END
			// PLACEHOLDER START
			/*
				return [
					{
						'name': 	'1-5',
						'owner': 	'Diablohu',
						'hq_lv': 	101,
						'note': 	'',
						'createdAt':'2014-09-30T21:06:44.046Z',
						'updatedAt':'2015-05-20T03:04:51.898Z',
						'ojbectId': 'XU9DFdVoVQ',
						'data': 	'[[["408",[83,-1],[94,64,100,54]],["82",[58,-1],[79,79,79,26]],["321",[88,-1],[47,47,34,45]],["293",[54,-1],[47,47,87,45]]]]'
					}
				]*/
			// PLACEHOLDER END
		}

	// 检测数据，删除空数据条目
		validdata(arr){
			let deferred = Q.defer()
				,to_remove = []
				,i = 0
				,valid = function( fleetdata ){
					if( fleetdata['hq_lv'] > -1
						|| fleetdata['name']
						|| fleetdata['note']
						|| fleetdata['rating'] > -1
					){
						return true
					}
					if( !fleetdata.data || !fleetdata.data.length || !fleetdata.data.push )
						return false
					let is_valid = false
					for( let fleet of fleetdata.data ){
						if( fleet && fleet.length && fleet.push ){
							for( let shipdata of fleet ){
								if( typeof shipdata != 'undefined' && shipdata && shipdata.push && typeof shipdata[0] != 'undefined' && shipdata[0] )
									is_valid = true
							}
						}
					}
					return is_valid
				}
				
			while( i < arr.length ){
				if( valid( arr[i] ) ){
					i++
				}else{
					to_remove.push( arr[i]._id )
					arr.splice(i, 1)
				}
			}
			
			if( to_remove.length ){
				_db.fleets.remove({
					_id: { $in: to_remove }
				}, { multi: true }, function (err, numRemoved) {
					deferred.resolve( arr )
				});
			}else{
				deferred.resolve( arr )
			}
			
			return deferred.promise
		}

	// 检测已处理数据，如果没有条目，标记样式
		datacheck(arr){
			arr = arr || []
	
			if( !arr.length )
				this.dom.container.addClass('nocontent')
			else
				this.dom.container.removeClass('nocontent')
	
			return arr
		}

	// 创建全部数据行内容
		append_all_items(arr){
			arr = arr || []
			arr.sort(function(a, b){
				if (a['name'] < b['name']) return -1;
				if (a['name'] > b['name']) return 1;
				return 0;
			})
			//_g.log(arr)
			
			this.trIndex = 0
			
			// 处理“按主题颜色分组”选项默认值
				if( typeof Lockr.get( 'fleetlist-option-groupbytheme' ) == 'undefined' )
					Lockr.set( 'fleetlist-option-groupbytheme', true )
	
			let deferred = Q.defer()
				,k = 0
			
			if( Lockr.get( 'fleetlist-option-groupbytheme' ) ){
				// 按主题颜色分组array
				let sorted = {}
					,count = 0
				arr.forEach(function(cur,i){
					if( !sorted[cur.theme] )
						sorted[cur.theme] = []
					sorted[cur.theme].push(i)
				})
				//console.log(sorted)
				
				// 根据主题颜色遍历
					for( let i in sorted ){
						k = 0
						// 创建flexgrid placeholder
							while(k < this.flexgrid_empty_count){
								if( !k )
									this.flexgrid_ph = $('<tr class="empty" data-fleetid="-1" data-trindex="99999"/>').appendTo(this.dom.tbody)
								else
									$('<tr class="empty" data-fleetid="-1" data-trindex="99999"/>').appendTo(this.dom.tbody)
								k++
							}

						// 创建数据行
							sorted[i].forEach(function(index){
								setTimeout((function(i){
									this.append_item( arr[i] )
									count++
									if( count >= arr.length -1 )
										deferred.resolve()
								}.bind(this))(index), 0)
							}.bind(this))

						// 创建强制换行
							$('<tr class="typetitle" data-trindex="'+(++this.trIndex)+'">'
								+ '<th colspan="' + (this.columns.length + 1) + '">'
								+ '</th></tr>')
								.appendTo( this.dom.tbody )
							this.trIndex++
					}
			}else{
				// 创建flexgrid placeholder
					while(k < this.flexgrid_empty_count){
						if( !k )
							this.flexgrid_ph = $('<tr class="empty" data-fleetid="-1" data-trindex="99999"/>').appendTo(this.dom.tbody)
						else
							$('<tr class="empty" data-fleetid="-1" data-trindex="99999"/>').appendTo(this.dom.tbody)
						k++
					}
		
				// 创建数据行
					arr.forEach(function(currentValue, i){
						setTimeout((function(i){
							this.append_item( arr[i] )
							if( i >= arr.length -1 )
								deferred.resolve()
						}.bind(this))(i), 0)
					}.bind(this))
			}
	
			if( !arr.length )
				deferred.resolve()
	
			return deferred.promise
		}

	// 创建单行数据行内容
		append_item( data, index, isPrepend ){
			if( !data )
				return false
	
			if( typeof index == 'undefined' ){
				index = this.trIndex
				this.trIndex++
			}
			
			//_g.log(data)
			
			let tr = $('<tr class="row"/>')
						.attr({
							'data-trindex': index,
							'data-fleetid': data._id || 'PLACEHOLDER',
							//'data-infos': 	'[[FLEET::'+JSON.stringify(data)+']]'
							'data-infos': 	'[[FLEET::'+data._id+']]',
							'data-theme':	data.theme
						})
						.data({
							'initdata': 	data
						})
			
			this.columns.forEach(function(column){
				switch( column[1] ){
					case ' ':
						var html = '<i>'
							,ships = data['data'][0] || []
							,j = 0;
						while( j < 6 ){
							if( ships[j] && ships[j][0] )
								html+='<img src="' + _g.path.pics.ships + '/' + ships[j][0]+'/0.webp" contextmenu="disabled"/>'
							else
								html+='<s/>'
							j++
						}
						html+='</i>'
						$('<th/>')
							.attr(
								'data-value',
								data['name']
							)
							.html(
								html
								+ '<strong>' + data['name'] + '</strong>'
								+ '<em></em>'
							)
							.appendTo(tr)
						break;
					default:
						var datavalue = data[column[1]]
						$('<td/>')
							.attr(
								'data-value',
								datavalue
							)
							.html( datavalue )
							.appendTo(tr)
						break;
				}
			})
	
			if( isPrepend )
				tr.prependTo( this.dom.tbody )
			else
				tr.insertBefore( this.flexgrid_ph )
	
			return tr
		}

	// [按钮操作] 新建/导入配置
		btn_new(target){
			if( !this.menu_new ){
				this.menu_new = new _menu({
					'target': 	this.dom.btn_new,
					'items': [
						$('<div class="menu_fleets_new"/>')
							.append(
								$('<menuitem/>').html('新建配置')
									.on('click', function(){
										this.action_new()
									}.bind(this))
							)
							.append(
								$('<menuitem/>').html('导入配置代码')
									.on('click', function(){
										if( !TablelistFleets.modalImport ){
											TablelistFleets.modalImport = $('<div/>')
												.append(
													TablelistFleets.modalImportTextarea = $('<textarea/>',{
														'placeholder': '输入配置代码...'
													})
												)
												.append(
													$('<p/>').html('* 配置代码兼容<a href="http://www.kancolle-calc.net/deckbuilder.html">艦載機厨デッキビルダー</a>')
												)
												.append(
													TablelistFleets.modalImportBtn = $('<button class="button"/>').html('导入')
												)
										}
										TablelistFleets.modalImportTextarea.val('')
										TablelistFleets.modalImportBtn.off('click.import')
											.on('click', function(){
												let val = TablelistFleets.modalImportTextarea.val()
												//console.log(val)
												if( val ){
													val = JSON.parse(val)
													if( !val.length || !val.push )
														val = _g.kancolle_calc.decode(val)
													this.action_new({
														'data': 	val
													})
													_frame.modal.hide()
													TablelistFleets.modalImportTextarea.val('')
												}
											}.bind(this))
										_frame.modal.show(
											TablelistFleets.modalImport,
											'导入配置代码',
											{
												'classname': 	'infos_fleet infos_fleet_import'
											}
										)
									}.bind(this))
							)
							.append(
								$('<menuitem/>').html('导入配置文件').on('click', function(){
									this.dbfile_selector.trigger('click')
								}.bind(this))
							)
					]
				})
				this.dbfile_selector = $('<input type="file" class="none"/>')
					.on('change', function(){
						let file = this.dbfile_selector.val()
							,promise_chain 	= Q.fcall(function(){})

						this.dbfile_selector.val('')
						
						promise_chain
						
						// 载入文件
							.then(function(){
								let deferred = Q.defer()
								node.fs.readFile(file, 'utf8', function(err, data){
									if( err )
										deferred.reject('文件载入失败', new Error(err))
									else
										deferred.resolve(data)
								})
								return deferred.promise
							})
						
						// 处理文件内容，以换行符为准创建Array
							.then(function(data){
								let array = []
									,deferred = Q.defer()
								data.split('\n').forEach(function(line){
									if( line ){
										try{
											array.push(JSON.parse(line))
										}catch(e){
											deferred.reject('文件格式错误', e)
										}
										deferred.resolve(array)
									}else{
										deferred.reject('文件无内容')
									}
								})
								return deferred.promise
							})
						
						// 已处理JSON，导入
							.then(function(array){
								let the_promises = []
									,complete = 0
								
								array.forEach(function(data){
									let deferred = Q.defer()
									the_promises.push(deferred.promise)
									
									_db.fleets.insert(data, function(err){
										complete++
										if(err && err.errorType == "uniqueViolated"){
											//if( confirm('舰队 [' + (data['name']||'无标题') + '] 已经存在，是否更新？') ){
												_db.fleets.update({
													_id: data._id
												}, data, {}, function(err, numReplaced){
													deferred.resolve()
													if( err )
														_g.log(err)
													else
														_g.log(numReplaced)
												})
											//}else{
											//	deferred.resolve()
											//}
										}else{
											deferred.resolve()
										}
									})
								})
								
								return Q.all(the_promises);
							})
						
						// 错误处理
							.catch(function(msg, err) {
								_g.log(msg)
								_g.error(err)
							})
							.done(function(){
								_g.log('import complete')
								this.refresh()
							}.bind(this))
					}.bind(this))
					.appendTo(this.dom.filters)
			}
			
			if( target && target.clientX )
				return this.menu_new.show(target.clientX, target.clientY)
			return this.menu_new.show(target)
		}

	// [按钮操作] 选项设置
		btn_settings(){
			TablelistFleets.menuOptions_show(this.dom.btn_settings, this)
		}

	// [操作] 新建配置
		action_new( dataDefault ){
			dataDefault = dataDefault || {}
			//_frame.infos.show('[[FLEET::__NEW__]]')
			console.log(dataDefault)
	
			_db.fleets.insert( this.new_data(dataDefault), function(err, newDoc){
				console.log(err, newDoc)
				if(err){
					_g.error(err)
				}else{
					if( _frame.app_main.cur_page == 'fleets' ){
						_frame.infos.show('[[FLEET::' + newDoc['_id'] + ']]')
						this.menu_new.hide()
						//this.init(newDoc)
						
						//for(let i in _g.data.fleets_tablelist.lists){
						//	_g.data.fleets_tablelist.lists[i].append_item( newDoc, null, true )
						//}
					}
				}
			}.bind(this))
		}

	// 处理舰载机厨的单项数据，返回新格式
		parse_kancolle_calc_data(obj){
			return this.new_data(obj)
		}

	// 菜单
		contextmenu_show($tr, $em, is_rightclick){		
			if( !TablelistFleets.contextmenu )
				TablelistFleets.contextmenu = new _menu({
					'className': 'contextmenu-fleet',
					'items': [
						$('<menuitem/>').html('详情')
							.on({
								'click': function(e){
									TablelistFleets.contextmenu.curel.trigger('click', [true])
								}
							}),
							
						$('<menuitem/>').html('导出配置代码')
							.on({
								'click': function(e){
									InfosFleet.modalExport_show(TablelistFleets.contextmenu.curel.data('initdata'))
								}
							}),
							
						$('<menuitem/>').html('导出配置文本')
							.on({
								'click': function(e){
									InfosFleet.modalExportText_show(TablelistFleets.contextmenu.curel.data('initdata'))
								}
							}),
							
						$('<menuitem/>').html('移除')
							.on({
								'click': function(e){
									let id = TablelistFleets.contextmenu.curel.attr('data-fleetid')
									_db.fleets.remove({
										_id: id
									}, { multi: true }, function (err, numRemoved) {
										_g.log('Fleet ' + id + ' removed.')
										_db.fleets.count({}, function(err, count){
											if( !count )
												TablelistFleets.contextmenu.curobject.dom.container.addClass('nocontent')
										})
									});
									TablelistFleets.contextmenu.curel.remove()
								}
							})
					]
				})

			TablelistFleets.contextmenu.curobject = this
			TablelistFleets.contextmenu.curel = $tr

			if( is_rightclick )
				TablelistFleets.contextmenu.show(is_rightclick.clientX, is_rightclick.clientY)
			else
				TablelistFleets.contextmenu.show($em || $tr)
		}
	
	
	// 生成列表
		genlist(){
			let promise_chain 	= Q.fcall(function(){})
	
				//promise_chain
	
			// 读取已保存数据
				.then(function(){
					return this.loaddata()
				}.bind(this))
			
			// 检查每条数据
				.then(function(arr){
					return this.validdata(arr)
				}.bind(this))
	
			// 如果没有数据，标记状态
				.then(function(arr){
					return this.datacheck(arr)
				}.bind(this))
	
			// [创建] 全部数据行
				.then(function(arr){
					return this.append_all_items(arr)
				}.bind(this))
	
			// [框架] 标记读取完成
				.then(function(){
					setTimeout(function(){
						_frame.app_main.loaded('tablelist_'+this._index, true)
					}.bind(this), 100)
				}.bind(this))
	
			// 错误处理
				.catch(function (err) {
					_g.log(err)
				})
				.done(function(){
					_g.log('Fleets list DONE')
				})
		}
	
	
	// 重新生成列表
		refresh(){
			console.log('refresh')
			this.dom.tbody.empty()
			this.genlist()
		}
}
TablelistFleets.menuOptions_show = function( $el, $el_tablelist ){
	if( !TablelistFleets.menuOptions )
		TablelistFleets.menuOptions = new _menu({
			'className':	'mod-checkbox menu-tablelistfleets-options',
			'items': [
				$('<menuitem class="donot_hide option-groupbytheme"/>')
					.append($('<input/>',{
							'type':	'checkbox',
							'id':	'_input_g' + _g.inputIndex
						}).prop('checked', Lockr.get( 'fleetlist-option-groupbytheme' ))
						.on('change', function(e){
							Lockr.set( 'fleetlist-option-groupbytheme', e.target.checked )
							if( TablelistFleets.menuOptions.curTablelist ){
								TablelistFleets.menuOptions.curTablelist.dom.tbody.empty()
								TablelistFleets.menuOptions.curTablelist.genlist()
							}
						}))
					.append($('<label/>',{
							'for':	'_input_g' + (_g.inputIndex++),
							'html':	'按主题颜色进行分组'
						})),

				$('<menuitem class="donot_hide option-aircraftdefaultmax"/>')
					.append($('<input/>',{
							'type':	'checkbox',
							'id':	'_input_g' + _g.inputIndex
						}).prop('checked', Lockr.get( 'fleetlist-option-aircraftdefaultmax' ))
						.on('change', function(e){
							Lockr.set( 'fleetlist-option-aircraftdefaultmax', e.target.checked )
						}))
					.append($('<label/>',{
							'for':	'_input_g' + (_g.inputIndex++),
							'html':	'新增飞行器熟练度默认为'
						}))
			]
		})

	TablelistFleets.menuOptions.curTablelist = $el_tablelist || null
	
	if( $el_tablelist )
		TablelistFleets.menuOptions.dom.menu.addClass('is-tablelist')
	else
		TablelistFleets.menuOptions.dom.menu.removeClass('is-tablelist')
	TablelistFleets.menuOptions.show($el)
}



class TablelistShips extends Tablelist{
	constructor( container, options ){
		super( container, options )

		this.columns = [
			'  ',
			['火力',	'fire'],
			['雷装',	'torpedo'],
			['夜战',	'nightpower'],
			['对空',	'aa'],
			['对潜',	'asw'],
			['耐久',	'hp'],
			['装甲',	'armor'],
			['回避',	'evasion'],
			['搭载',	'carry'],
			['航速',	'speed'],
			['射程',	'range'],
			['索敌',	'los'],
			['运',		'luck'],
			['油耗',	'consum_fuel'],
			['弹耗',	'consum_ammo'],
			['多立绘',	'extra_illust']
		]
		this.header_checkbox = []
		this.checkbox = []
		this.last_item = null

		// 标记全局载入状态
			_frame.app_main.loading.push('tablelist_'+this._index)
			_frame.app_main.is_loaded = false
	
			//_g.log( 'shiplist init', _frame.app_main.loading )
		
		if( container.children('.fixed-table-container').length ){
			this.init_parse()
		}else if(this.init_new){
			this.init_new()
		}
	}

	compare_btn_show( is_checked ){
		if( (!is_checked && this.dom.tbody.find('input[type="checkbox"].compare:checked').length)
			|| is_checked
		){
			this.dom.msg_container.attr('data-msgs', 'comparestart')
		}else{
			this.dom.msg_container.removeAttr('data-msgs')
		}
	}

	compare_start(){
		// 隐藏底部提示信息
			this.dom.msg_container.removeAttr('data-msgs')
	
		// 存储当前状态
			this.last_viewtype = this.dom.filter_container.attr('viewtype')
			_config.set( 'shiplist-viewtype', this.last_viewtype )
			this.last_scrollTop = this.dom.table_container_inner.scrollTop()
	
		// 更改视图
			this.dom.filter_container.attr('viewtype', 'compare')
			this.dom.table_container_inner.scrollTop( 0 )
			this.dom.table.addClass('sortable')
	
		// 计算数据排序排序
			this.mark_high( true )
			this.thead_redraw( 500 )
	}

	compare_off(){
		this.dom.filter_container.attr('viewtype', this.last_viewtype)
		this.sort_table_restore()
		this.mark_high()
		this.thead_redraw( 500 )
		this.dom.table_container_inner.scrollTop( this.last_scrollTop )
		this.dom.table.removeClass('sortable')
		delete this.last_viewtype
		delete this.last_scrollTop
	}

	compare_end(){
		this.dom.tbody.find('input[type="checkbox"].compare:checked').prop('checked', false).trigger('change')
		this.dom.msg_container.removeAttr('data-msgs')
		this.compare_off()
	}

	compare_continue(){
		this.dom.msg_container.attr('data-msgs', 'comparestart')
		this.compare_off()
	}
	
	contextmenu_show($el, shipId, is_rightclick){
		if( this.dom.filter_container.attr('viewtype') == 'compare' || $el.attr('data-donotcompare') == 'true' )
			return false
	
		if( !TablelistShips.contextmenu )
			TablelistShips.contextmenu = new _menu({
				'className': 'contextmenu-ship',
				'items': [
					$('<menuitem/>').html('选择')
						.on({
							'click': function(e){
								if( _frame.app_main.is_mode_selection() )
									_frame.app_main.mode_selection_callback(TablelistShips.contextmenu._curid)
							},
							'show': function(){
								if( _frame.app_main.is_mode_selection() )
									$(this).show()
								else
									$(this).hide()
							}
						}),
					$('<menuitem/>').html('查看资料')
						.on({
							'click': function(e){
								TablelistShips.contextmenu._curel.trigger('click', [true])
							}
						}),
	
					$('<menuitem/>').html('将该舰娘加入对比')
						.on({
							'click': function(e){
								this.checkbox[TablelistShips.contextmenu._curid]
									.prop('checked', !this.checkbox[TablelistShips.contextmenu._curid].prop('checked'))
									.trigger('change')
							}.bind(this),
							'show': function(e){
								if( !TablelistShips.contextmenu._curid )
									return false
								
								if( _g.data.ship_types[_g['data']['ships'][TablelistShips.contextmenu._curid]['type']]['donotcompare'] )
									$(e.target).hide()
								else
									$(e.target).show()
									
								if( this.checkbox[TablelistShips.contextmenu._curid].prop('checked') )
									$(e.target).html('取消对比')
								else
									$(e.target).html('将该舰娘加入对比')
							}.bind(this)
						}),
					
					$('<div/>').on('show', function(e){
						var $div = $(e.target).empty()
						if( TablelistShips.contextmenu._curid ){
							var series = _g['data']['ships'][TablelistShips.contextmenu._curid].getSeriesData() || []
							series.forEach(function(currentValue, i){
								if( !i )
									$div.append($('<hr/>'))
								let checkbox = null
								try{
									checkbox = this.checkbox[currentValue['id']]
								}catch(e){}
								$div.append(
									$('<div class="item"/>')
										.html('<span>' + _g['data']['ships'][currentValue['id']].getName(true) + '</span>')
										.append(
											$('<div class="group"/>')
												.append(function(){
													var els = $()
													
													if( _frame.app_main.is_mode_selection() ){
														els = els.add(
															$('<menuitem/>')
																.html('选择')
																.on({
																	'click': function(){
																		if( _frame.app_main.is_mode_selection() )
																			_frame.app_main.mode_selection_callback(currentValue['id'])
																	}
																})
														)
													}
													
													return els
												})
												.append(
													$('<menuitem data-infos="[[SHIP::'+currentValue['id']+']]"/>')
														.html('查看资料')
												)
												.append(
													$('<menuitem/>')
														.html(
															checkbox && checkbox.prop('checked')
																? '取消对比'
																: '加入对比'
														)
														.on({
															'click': function(e){
																if( checkbox ){
																	this.checkbox[currentValue['id']]
																		.prop('checked', !checkbox.prop('checked'))
																		.trigger('change')
																}
															}.bind(this)
														})
												)
										)
								)
							}, this)
						}
					}.bind(this))
				]
			})
	
		TablelistShips.contextmenu._curid = shipId || $el.data('shipid')
		TablelistShips.contextmenu._curel = $el

		if( is_rightclick )
			TablelistShips.contextmenu.show(is_rightclick.clientX, is_rightclick.clientY)
		else
			TablelistShips.contextmenu.show($el)
	}
	
	
	
	
	
	
	
	
	
	init_parse(){
		// 生成过滤器与选项
			this.dom.filter_container = this.dom.container.children('.options')
			this.dom.filters = this.dom.filter_container.children('.filters')
			this.dom.exit_compare = this.dom.filter_container.children('.exit_compare')
			// 结束对比
				this.dom.exit_compare.children('button[icon="arrow-set2-left"]').on('click', function(){
						this.compare_end()
					}.bind(this))
			// 继续选择
				this.dom.exit_compare.children('button[icon="checkbox-checked"]').on('click', function(){
						this.compare_continue()
					}.bind(this))
			// 点击表格标题可排序
				this.dom.btn_compare_sort = this.dom.exit_compare.children('button[icon="sort-amount-desc"]')
					.on('click', function(){
						if( !this.dom.btn_compare_sort.hasClass('disabled') )
							this.sort_table_restore()
					}.bind(this))
			// 仅显示同种同名舰最终版本
				this.dom.btn_hide_premodel = this.dom.filters.find('[name="hide-premodel"]')
					.prop('checked', _config.get( 'shiplist-filter-hide-premodel' ) === 'false' ? null : true)
					.on('change', function( e ){
						_config.set( 'shiplist-filter-hide-premodel', this.dom.btn_hide_premodel.prop('checked') )
						this.dom.filter_container.attr('filter-hide-premodel', this.dom.btn_hide_premodel.prop('checked'))
						this.thead_redraw()
					}.bind(this))
			// 视图切换
				this.dom.filters.find('[name="viewtype"]').each(function(index, $el){
					$el = $($el)
					let viewtype = _config.get( 'shiplist-viewtype' ) || 'card'
					if( $el.val() == viewtype )
						$el.prop('checked', true)
					$el.on('change', function( e ){
						if( $el.is(':checked') ){
							_config.set( 'shiplist-viewtype', $el.val() )
							this.dom.filter_container.attr('viewtype', $el.val())
							this.thead_redraw()
						}
					}.bind(this))
				}.bind(this))
			this.dom.filters.find('input').trigger('change')
	
		// 生成表格框架
			this.dom.table_container = this.dom.container.children('.fixed-table-container')
			this.dom.table_container_inner = this.dom.table_container.children('.fixed-table-container-inner')
			this.dom.table = this.dom.table_container_inner.children('table.ships')
				this.dom.table.find('thead td').on('click', function(e){
										this.sort_table_from_theadcell($(e.currentTarget))
									}.bind(this))
			this.dom.tbody = this.dom.table.children('tbody')
		
		// 右键菜单事件
			this.dom.table.on('contextmenu.contextmenu_ship', 'tr[data-shipid]', function(e){
				this.contextmenu_show($(e.currentTarget), null, e)
				e.preventDefault()
			}.bind(this)).on('click.contextmenu_ship', 'tr[data-shipid]>th>em', function(e){
				this.contextmenu_show($(e.currentTarget).parent().parent())
				e.stopImmediatePropagation()
				e.stopPropagation()
			}.bind(this))
	
		// 生成底部内容框架
			this.dom.msg_container = this.dom.container.children('.msgs')
			if( _config.get( 'hide-compareinfos' ) )
				this.dom.msg_container.removeAttr('data-msgs')
			else
				this.dom.msg_container.attr( 'data-msgs', 'compareinfos' )
	
		// 处理所有舰娘数据
			//if( _g.data.ship_types ){
				this.parse_all_items()
			//}
	
		// 生成部分底部内容
			let compareinfos = this.dom.msg_container.children('.compareinfos')
				compareinfos.children('button').on('click', function(){
						this.dom.msg_container.removeAttr('data-msgs')
						_config.set( 'hide-compareinfos', true )
					}.bind(this))
			this.dom.msg_container.children('.comparestart')
					.on('click', function(){
						this.compare_start()
					}.bind(this))
	}
	parse_all_items(){
		let header_index = -1

		this.dom.tbody.children('tr.typetitle,tr.row').each(function(index, tr){
			tr = $(tr)
			if( tr.hasClass('typetitle') ){
				header_index++
				this.last_item = tr
				let checkbox = tr.find('input[type="checkbox"]')
						//.prop('disabled', _g.data['ship_type_order'][header_index]['donotcompare'] ? true : false)
						.on({
							'change': function(){
								checkbox.data('ships').filter(':visible').each(function(index, element){
									$(element).data('checkbox').prop('checked', checkbox.prop('checked')).trigger('change', [true])
								})
							},
							'docheck': function(){
								// ATTR: compare-checked
								var trs = checkbox.data('ships').filter(':visible')
									,checked = trs.filter('[compare-checked=true]')
								if( !checked.length ){
									checkbox.prop({
										'checked': 			false,
										'indeterminate': 	false
									})
								}else if( checked.length < trs.length ){
									checkbox.prop({
										'checked': 			false,
										'indeterminate': 	true
									})
								}else{
									checkbox.prop({
										'checked': 			true,
										'indeterminate': 	false
									})
								}
							}
						})
						.data('ships', $())
				this.header_checkbox[header_index] = checkbox
			}else{
				let donotcompare = tr.attr('data-donotcompare')
					//,ship_data = _g.data.ships[ tr.attr('data-shipid') ]
					,ship_id = tr.attr('data-shipid')
					,checkbox = tr.find('input[type="checkbox"]')
					,title_index = header_index
				
				tr.on('click', function(e, forceInfos){
						if( !forceInfos && e.target.tagName.toLowerCase() != 'em' && _frame.app_main.is_mode_selection() ){
							e.preventDefault()
							e.stopImmediatePropagation()
							e.stopPropagation()
							if(!donotcompare)
								_frame.app_main.mode_selection_callback(ship_id)
						}
					})

				checkbox.prop('disabled', donotcompare)
					.on('click change',function(e, not_trigger_check){
						e.stopImmediatePropagation()
						e.stopPropagation()
						if( checkbox.prop('checked') )
							tr.attr('compare-checked', true )
						else
							tr.removeAttr('compare-checked')
						this.compare_btn_show( checkbox.prop('checked') )
						if( !not_trigger_check )
							this.header_checkbox[title_index].trigger('docheck')
					}.bind(this))
	
				this.header_checkbox[title_index].data(
						'ships',
						this.header_checkbox[title_index].data('ships').add( tr )
					)

				tr.data('checkbox', checkbox)
			
				this.checkbox[ship_id] = checkbox
			}
		}.bind(this))

		this.mark_high()
		this.thead_redraw()
		_frame.app_main.loaded('tablelist_'+this._index, true)
		delete( this.last_item )
	}
}

TablelistShips.prototype.append_item = function( ship_data, header_index ){
		//,tr = $('<tr class="row" data-shipid="'+ ship_data['id'] +'" data-header="'+ header_index +'" modal="true"/>')
		//,tr = $('<tr class="row" data-shipid="'+ ship_data['id'] +'" data-header="'+ header_index +'" data-infos="__ship__"/>')
	let donotcompare = _g.data.ship_types[ship_data['type']]['donotcompare'] ? true : false
		,tr = $('<tr/>',{
					'class':		'row',
					'data-shipid':	ship_data['id'],
					'data-header':	header_index,
					'data-trindex': this.trIndex,
					'data-infos': 	'[[SHIP::'+ship_data['id']+']]',
					'data-shipedit':this.dom.container.hasClass('shiplist-edit') ? 'true' : null,
					'data-donotcompare': donotcompare ? true : null
				})
				.on('click', function(e, forceInfos){
					if( !forceInfos && e.target.tagName.toLowerCase() != 'em' && _frame.app_main.is_mode_selection() ){
						e.preventDefault()
						e.stopImmediatePropagation()
						e.stopPropagation()
						if(!donotcompare)
							_frame.app_main.mode_selection_callback(ship_data['id'])
					}
				})
				//.appendTo( this.dom.tbody )
				.insertAfter( this.last_item )
		,name = ship_data['name'][_g.lang]
				+ (ship_data['name']['suffix']
					? '<small>' + _g.data.ship_namesuffix[ship_data['name']['suffix']][_g.lang] + '</small>'
					: '')
		,checkbox = $('<input type="checkbox" class="compare"/>')
						.prop('disabled', donotcompare)
						.on('click, change',function(e, not_trigger_check){
							if( checkbox.prop('checked') )
								tr.attr('compare-checked', true )
							else
								tr.removeAttr('compare-checked')
							this.compare_btn_show( checkbox.prop('checked') )
							if( !not_trigger_check )
								this.header_checkbox[header_index].trigger('docheck')
						}.bind(this))
		,label = $('<label/>').append(checkbox)
		,has_extra_illust = false
		,seriesData = ship_data.getSeriesData()
	
	seriesData.forEach(function(data_cur, i){
		let data_prev = i ? seriesData[ i - 1 ] : null
		
		has_extra_illust = data_cur.illust_extra && data_cur.illust_extra.length && data_cur.illust_extra[0] ? true : false
		
		if( !has_extra_illust && data_cur.illust_delete && data_prev )
			has_extra_illust = data_prev.illust_extra && data_prev.illust_extra.length && data_prev.illust_extra[0] ? true : false
	})

	this.last_item = tr
	this.trIndex++

	this.header_checkbox[header_index].data(
			'ships',
			this.header_checkbox[header_index].data('ships').add( tr )
		)
	tr.data('checkbox', checkbox)
	
	this.checkbox[ship_data['id']] = checkbox

	function _val( val, show_zero ){
		if( !show_zero && (val == 0 || val == '0') )
			//return '<small class="zero">-</small>'
			return '-'
		if( val == -1 || val == '-1' )
			//return '<small class="zero">?</small>'
			return '?'
		return val
	}

	this.columns.forEach(function(currentValue, i){
		switch( currentValue[1] ){
			case ' ':
				$('<th/>')
					.html(
						//'<img src="../pics/ships/'+ship_data['id']+'/0.jpg"/>'
						//'<img src="' + _g.path.pics.ships + '/' + ship_data['id']+'/0.webp" contextmenu="disabled"/>'
						'<a href="?infos=ship&id='+ship_data['id']+'"'
							+ (has_extra_illust ? ' icon="hanger"' : '')
						+ '>'
						+ '<img src="../pics/ships/'+ship_data['id']+'/0.webp" contextmenu="disabled"/>'
						+ '<strong>' + name + '</strong>'
						+ '</a>'
						+ '<em></em>'
						//+ '<small>' + ship_data['pron'] + '</small>'
					)
					.prepend(
						label
					)
					.appendTo(tr)
				break;
			case 'nightpower':
				// 航母没有夜战火力
				var datavalue = /^(9|10|11)$/.test( ship_data['type'] )
								? 0
								: (parseInt(ship_data['stat']['fire_max'] || 0)
									+ parseInt(ship_data['stat']['torpedo_max'] || 0)
								)
				$('<td data-stat="nightpower"/>')
					.attr(
						'data-value',
						datavalue
					)
					.html( _val( datavalue ) )
					.appendTo(tr)
				break;
			case 'asw':
				$('<td data-stat="asw" />')
					.attr(
						'data-value',
						ship_data['stat']['asw_max'] || 0
					)
					.html( _val(
						ship_data['stat']['asw_max'],
						/^(5|8|9|12|24)$/.test( ship_data['type'] )
					) )
					.appendTo(tr)
				break;
			case 'hp':
				$('<td data-stat="hp" data-value="' + (ship_data['stat']['hp'] || 0) + '"/>')
					.html(_val( ship_data['stat']['hp'] ))
					.appendTo(tr)
				break;
			case 'carry':
				$('<td data-stat="carry" data-value="' + (ship_data['stat']['carry'] || 0) + '"/>')
					.html(_val( ship_data['stat']['carry'] ))
					.appendTo(tr)
				break;
			case 'speed':
				$('<td data-stat="speed" data-value="' + (ship_data['stat']['speed'] || 0) + '"/>')
					.html( _g.getStatSpeed( ship_data['stat']['speed'] ) )
					.appendTo(tr)
				break;
			case 'range':
				$('<td data-stat="range" data-value="' + (ship_data['stat']['range'] || 0) + '"/>')
					.html( _g.getStatRange( ship_data['stat']['range'] ) )
					.appendTo(tr)
				break;
			case 'luck':
				$('<td data-stat="luck" data-value="' + (ship_data['stat']['luck'] || 0) + '"/>')
					.html(ship_data['stat']['luck'] + '<sup>' + ship_data['stat']['luck_max'] + '</sup>')
					.appendTo(tr)
				break;
			case 'consum_fuel':
				$('<td data-stat="consum_fuel"/>')
					.attr(
						'data-value',
						ship_data['consum']['fuel'] || 0
					)
					.html( _val(ship_data['consum']['fuel']) )
					.appendTo(tr)
				break;
			case 'consum_ammo':
				$('<td data-stat="consum_ammo"/>')
					.attr(
						'data-value',
						ship_data['consum']['ammo'] || 0
					)
					.html( _val(ship_data['consum']['ammo']) )
					.appendTo(tr)
				break;
			case 'extra_illust':
				$('<td data-stat="'+currentValue[1]+'" data-value="' + (has_extra_illust ? '1' : '0') + '"/>')
					.html(
						has_extra_illust
							? '✓'
							: '<small class="zero">-</small>'
					)
					.appendTo(tr)
				break;
			default:
				$('<td data-stat="'+currentValue[1]+'"/>')
					.attr(
						'data-value',
						ship_data['stat'][currentValue[1] + '_max'] || 0
					)
					.html( _val( ship_data['stat'][currentValue[1] + '_max'] ) )
					.appendTo(tr)
				break;
		}
	})

	// 检查数据是否存在 remodel.next
	// 如果 remodel.next 与当前数据 type & name 相同，标记当前为可改造前版本
	if( ship_data.remodel && ship_data.remodel.next
		&& _g.data.ships[ ship_data.remodel.next ]
		&& _g.ship_type_order_map[ship_data['type']] == _g.ship_type_order_map[_g.data.ships[ ship_data.remodel.next ]['type']]
		&& ship_data['name']['ja_jp'] == _g.data.ships[ ship_data.remodel.next ]['name']['ja_jp']
	){
		tr.addClass('premodeled')
	}

	return tr
}

TablelistShips.prototype.append_all_items = function(){
	function _do( i, j ){
		if( _g.data.ship_id_by_type[i] ){
			if( !j ){
				let data_shiptype
					,checkbox

				if( typeof _g.ship_type_order[i] == 'object' ){
					data_shiptype = _g.data.ship_types[ _g.ship_type_order[i][0] ]
				}else{
					data_shiptype = _g.data.ship_types[ _g.ship_type_order[i] ]
				}

				//let checkbox_id = '_input_g' + parseInt(_g.inputIndex)
				let checkbox_id = Tablelist.genId()
				
				this.last_item =
						$('<tr class="typetitle" data-trindex="'+this.trIndex+'">'
							+ '<th colspan="' + (this.columns.length + 1) + '">'
							+ '<label for="' + checkbox_id + '">'
							//+ data_shiptype['full_zh']
							//+ _g.data['ship_type_order'][i+1]['name']['zh_cn']
							+ _g.data['ship_type_order'][i]['name']['zh_cn']
							//+ ( _g.data['ship_type_order'][i+1]['name']['zh_cn'] == data_shiptype['full_zh']
							+ ( _g.data['ship_type_order'][i]['name']['zh_cn'] == data_shiptype['full_zh']
								? ('<small>[' + data_shiptype['code'] + ']</small>')
								: ''
							)
							+ '</label></th></tr>')
							.appendTo( this.dom.tbody )
				this.trIndex++

				// 创建空DOM，欺骗flexbox layout排版
					var k = 0
					while(k < this.flexgrid_empty_count){
						var _index = this.trIndex + _g.data.ship_id_by_type[i].length + k
						$('<tr class="empty" data-trindex="'+_index+'" data-shipid/>').appendTo(this.dom.tbody)
						k++
					}

				checkbox = $('<input type="checkbox" id="' + checkbox_id + '"/>')
						//.prop('disabled', _g.data['ship_type_order'][i+1]['donotcompare'] ? true : false)
						.prop('disabled', _g.data['ship_type_order'][i]['donotcompare'] ? true : false)
						.on({
							'change': function(){
								checkbox.data('ships').filter(':visible').each(function(index, element){
									$(element).data('checkbox').prop('checked', checkbox.prop('checked')).trigger('change', [true])
								})
							},
							'docheck': function(){
								// ATTR: compare-checked
								var trs = checkbox.data('ships').filter(':visible')
									,checked = trs.filter('[compare-checked=true]')
								if( !checked.length ){
									checkbox.prop({
										'checked': 			false,
										'indeterminate': 	false
									})
								}else if( checked.length < trs.length ){
									checkbox.prop({
										'checked': 			false,
										'indeterminate': 	true
									})
								}else{
									checkbox.prop({
										'checked': 			true,
										'indeterminate': 	false
									})
								}
							}
						})
						.data('ships', $())
						.prependTo( this.last_item.find('th') )

				this.header_checkbox[i] = checkbox

				//_g.inputIndex++
			}

			this.append_item( _g.data.ships[ _g.data.ship_id_by_type[i][j] ], i )

			setTimeout(function(){
				if( j >= _g.data.ship_id_by_type[i].length - 1 ){
					this.trIndex+= this.flexgrid_empty_count
					_do( i+1, 0 )
				}else{
					_do( i, j+1 )
				}
			}.bind(this), 0)
		}else{
			this.mark_high()
			this.thead_redraw()
			_frame.app_main.loaded('tablelist_'+this._index, true)
			//_g.log( this.last_item )
			delete( this.last_item )
			//_g.log( this.last_item )
		}
	}
	_do = _do.bind(this)
	_do( 0, 0 )
}
	
	
	
	
	
	
	
	
	
TablelistShips.prototype.init_new = function(){
	// 生成过滤器与选项
		this.dom.filter_container = $('<div class="options"/>').appendTo( this.dom.container )
		this.dom.filters = $('<div class="filters"/>').appendTo( this.dom.filter_container )
		this.dom.exit_compare = $('<div class="exit_compare"/>')
								.append(
									$('<button icon="arrow-set2-left"/>')
										.html('结束对比')
										.on('click', function(){
											this.compare_end()
										}.bind(this))
								)
								.append(
									$('<button icon="checkbox-checked"/>')
										.html('继续选择')
										.on('click', function(){
											this.compare_continue()
										}.bind(this))
								)
								.appendTo( this.dom.filter_container )
		this.dom.btn_compare_sort = $('<button icon="sort-amount-desc" class="disabled"/>')
											.html('点击表格标题可排序')
											.on('click', function(){
												if( !this.dom.btn_compare_sort.hasClass('disabled') )
													this.sort_table_restore()
											}.bind(this)).appendTo( this.dom.exit_compare )

	// 初始化设置
		this.append_option( 'checkbox', 'hide-premodel', '仅显示同种同名舰最终版本',
			_config.get( 'shiplist-filter-hide-premodel' ) === 'false' ? null : true, null, {
				'onchange': function( e, input ){
					_config.set( 'shiplist-filter-hide-premodel', input.prop('checked') )
					this.dom.filter_container.attr('filter-hide-premodel', input.prop('checked'))
					this.thead_redraw()
				}.bind(this)
			} )
		this.append_option( 'radio', 'viewtype', null, [
				['card', ''],
				['list', '']
			], null, {
				'radio_default': _config.get( 'shiplist-viewtype' ),
				'onchange': function( e, input ){
					if( input.is(':checked') ){
						_config.set( 'shiplist-viewtype', input.val() )
						this.dom.filter_container.attr('viewtype', input.val())
						this.thead_redraw()
					}
				}.bind(this)
			} ).attr('data-caption', '布局')
		this.dom.filters.find('input').trigger('change')

	// 生成表格框架
		this.dom.table_container = $('<div class="fixed-table-container"/>').appendTo( this.dom.container )
		this.dom.table_container_inner = $('<div class="fixed-table-container-inner"/>').appendTo( this.dom.table_container )
		this.dom.table = $('<table class="ships hashover hashover-column"/>').appendTo( this.dom.table_container_inner )
		function gen_thead(arr){
			this.dom.thead = $('<thead/>')
			var tr = $('<tr/>').appendTo(this.dom.thead)
			arr.forEach(function(currentValue, i){
				if( typeof currentValue == 'object' ){
					var td = $('<td data-stat="' + currentValue[1] + '"/>')
								.html('<div class="th-inner-wrapper"><span><span>'+currentValue[0]+'</span></span></div>')
								.on('click', function(){
									this.sort_table_from_theadcell(td)
								}.bind(this))
								.appendTo(tr)
				}else{
					$('<th/>').html('<div class="th-inner-wrapper"><span><span>'+currentValue[0]+'</span></span></div>').appendTo(tr)
				}
			}, this)
			return this.dom.thead
		}
		gen_thead = gen_thead.bind(this)
		gen_thead( this.columns ).appendTo( this.dom.table )
		this.dom.tbody = $('<tbody/>').appendTo( this.dom.table )
	
	// 右键菜单事件
		this.dom.table.on('contextmenu.contextmenu_ship', 'tr[data-shipid]', function(e){
			this.contextmenu_show($(e.currentTarget), null, e)
		}.bind(this)).on('click.contextmenu_ship', 'tr[data-shipid]>th em', function(e){
			this.contextmenu_show($(e.currentTarget).parent().parent())
			e.stopImmediatePropagation()
			e.stopPropagation()
		}.bind(this))

	// 获取所有舰娘数据，按舰种顺序 (_g.ship_type_order / _g.ship_type_order_map) 排序
	// -> 获取舰种名称
	// -> 生成舰娘DOM
		if( _g.data.ship_types ){
			this.append_all_items()
		}else{
			$('<p/>').html('暂无数据...').appendTo( this.dom.table_container_inner )
		}
		//_db.ships.find({}).sort({'type': 1, 'class': 1, 'class_no': 1, 'time_created': 1, 'name.suffix': 1}).exec(function(err, docs){
		//	if( !err ){
		//		for(var i in docs){
		//			_g.data.ships[docs[i]['id']] = docs[i]

		//			if( typeof _g.data.ship_id_by_type[ _g.ship_type_order_map[docs[i]['type']] ] == 'undefined' )
		//				_g.data.ship_id_by_type[ _g.ship_type_order_map[docs[i]['type']] ] = []
		//			_g.data.ship_id_by_type[ _g.ship_type_order_map[docs[i]['type']] ].push( docs[i]['id'] )
		//		}
		//	}

			/*
			_db.ship_types.find({}, function(err2, docs2){
				if( !err2 ){
					for(var i in docs2 ){
						_g.data.ship_types[docs2[i]['id']] = docs2[i]
					}

				}
			})
			*/
		//	if( _g.data.ship_types ){
		//		this.append_all_items()
		//	}else{
		//		$('<p/>').html('暂无数据...').appendTo( this.dom.table_container_inner )
		//	}
		//})

	// 生成底部内容框架
		this.dom.msg_container = $('<div class="msgs"/>').appendTo( this.dom.container )
		if( !_config.get( 'hide-compareinfos' ) )
			this.dom.msg_container.attr( 'data-msgs', 'compareinfos' )

	// 生成部分底部内容
		let compareinfos = $('<div class="compareinfos"/>').html('点击舰娘查询详细信息，勾选舰娘进行对比').appendTo( this.dom.msg_container )
			$('<button/>').html('&times;').on('click', function(){
				this.dom.msg_container.removeAttr('data-msgs')
				_config.set( 'hide-compareinfos', true )
			}.bind(this)).appendTo( compareinfos )
		$('<div class="comparestart"/>').html('开始对比')
							.on('click', function(){
								this.compare_start()
							}.bind(this)).appendTo( this.dom.msg_container )
}
