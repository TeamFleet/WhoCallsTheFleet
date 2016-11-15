"use strict";
!function(root,factory){"undefined"!=typeof exports?"undefined"!=typeof module&&module.exports&&(exports=module.exports=factory(root,exports)):"function"==typeof define&&define.amd?define(["exports"],function(exports){root.Lockr=factory(root,exports)}):root.Lockr=factory(root,{})}(this,function(root,Lockr){"use strict";return Array.prototype.indexOf||(Array.prototype.indexOf=function(elt){var len=this.length>>>0,from=Number(arguments[1])||0;for(from=0>from?Math.ceil(from):Math.floor(from),0>from&&(from+=len);len>from;from++)if(from in this&&this[from]===elt)return from;return-1}),Lockr.prefix="",Lockr._getPrefixedKey=function(key,options){return options=options||{},options.noPrefix?key:this.prefix+key},Lockr.set=function(key,value,options){var query_key=this._getPrefixedKey(key,options);try{localStorage.setItem(query_key,JSON.stringify({data:value}))}catch(e){console&&console.warn("Lockr didn't successfully save the '{"+key+": "+value+"}' pair, because the localStorage is full.")}},Lockr.get=function(key,missing,options){var value,query_key=this._getPrefixedKey(key,options);try{value=JSON.parse(localStorage.getItem(query_key))}catch(e){try{value=localStorage[query_key]?JSON.parse('{"data":"'+localStorage.getItem(query_key)+'"}'):null}catch(e){console&&console.warn("Lockr could not load the item with key "+key)}}return null===value?missing:"undefined"!=typeof value.data?value.data:missing},Lockr.sadd=function(key,value,options){var json,query_key=this._getPrefixedKey(key,options),values=Lockr.smembers(key);if(values.indexOf(value)>-1)return null;try{values.push(value),json=JSON.stringify({data:values}),localStorage.setItem(query_key,json)}catch(e){console.log(e),console&&console.warn("Lockr didn't successfully add the "+value+" to "+key+" set, because the localStorage is full.")}},Lockr.smembers=function(key,options){var value,query_key=this._getPrefixedKey(key,options);try{value=JSON.parse(localStorage.getItem(query_key))}catch(e){value=null}return null===value?[]:value.data||[]},Lockr.sismember=function(key,value,options){this._getPrefixedKey(key,options);return Lockr.smembers(key).indexOf(value)>-1},Lockr.getAll=function(){var keys=Object.keys(localStorage);return keys.map(function(key){return Lockr.get(key)})},Lockr.srem=function(key,value,options){var json,index,query_key=this._getPrefixedKey(key,options),values=Lockr.smembers(key,value);index=values.indexOf(value),index>-1&&values.splice(index,1),json=JSON.stringify({data:values});try{localStorage.setItem(query_key,json)}catch(e){console&&console.warn("Lockr couldn't remove the "+value+" from the set "+key)}},Lockr.rm=function(key){localStorage.removeItem(key)},Lockr.flush=function(){localStorage.clear()},Lockr});
//
// SmoothScroll for websites v1.4.4 (Balazs Galambosi)
// http://www.smoothscroll.net/
//
// Licensed under the terms of the MIT license.
//
// You may use it in your theme if you credit me. 
// It is also free to use on any individual website.
//
// Exception:
// The only restriction is to not publish any  
// extension for browsers or native application
// without getting a written permission first.
//

(function () {
  
// Scroll Variables (tweakable)
var defaultOptions = {

    // Scrolling Core
    frameRate        : 150, // [Hz]
    animationTime    : 400, // [ms]
    stepSize         : 100, // [px]

    // Pulse (less tweakable)
    // ratio of "tail" to "acceleration"
    pulseAlgorithm   : true,
    pulseScale       : 4,
    pulseNormalize   : 1,

    // Acceleration
    accelerationDelta : 50,  // 50
    accelerationMax   : 3,   // 3

    // Keyboard Settings
    keyboardSupport   : true,  // option
    arrowScroll       : 50,    // [px]

    // Other
    touchpadSupport   : false, // ignore touchpad by default
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
var refreshSize;
var deltaBuffer = [];
var isMac = /^Mac/.test(navigator.platform);

var key = { left: 37, up: 38, right: 39, down: 40, spacebar: 32, 
            pageup: 33, pagedown: 34, end: 35, home: 36 };
var arrowKeys = { 37: 1, 38: 1, 39: 1, 40: 1 };

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
     * Please duplicate this radar for a Safari fix! 
     * rdar://22376037
     * https://openradar.appspot.com/radar?id=4965070979203072
     * 
     * Only applies to Safari now, Chrome fixed it in v45:
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
        refreshSize = function () {
            if (pendingRefresh) return; // could also be: clearTimeout(pendingRefresh);
            pendingRefresh = setTimeout(function () {
                if (isExcluded) return; // could be running after cleanup
                fullPageElem.style.height = '0';
                fullPageElem.style.height = root.scrollHeight + 'px';
                pendingRefresh = null;
            }, 500); // act rarely to stay fast
        };
  
        setTimeout(refreshSize, 10);

        addEvent('resize', refreshSize);

        // TODO: attributeFilter?
        var config = {
            attributes: true, 
            childList: true, 
            characterData: false 
            // subtree: true
        };

        observer = new MutationObserver(refreshSize);
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
    removeEvent('resize', refreshSize);
    removeEvent('load', init);
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
        isNodeName(activeElement, 'object') ||
        target.shadowRoot) {
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
    if (!document.body.contains(activeElement)) {
        activeElement = document.activeElement;
    }

    // do nothing if user is editing text
    // or using a modifier key (except shift)
    // or in a dropdown
    // or inside interactive elements
    var inputNodeNames = /^(textarea|select|embed|object)$/i;
    var buttonTypes = /^(button|submit|radio|checkbox|file|color|image)$/i;
    if ( event.defaultPrevented ||
         inputNodeNames.test(target.nodeName) ||
         isNodeName(target, 'input') && !buttonTypes.test(target.type) ||
         isNodeName(activeElement, 'video') ||
         isInsideYoutubeVideo(event) ||
         target.isContentEditable || 
         modifier ) {
      return true;
    }

    // [spacebar] should trigger button press, leave it alone
    if ((isNodeName(target, 'button') ||
         isNodeName(target, 'input') && buttonTypes.test(target.type)) &&
        event.keyCode === key.spacebar) {
      return true;
    }

    // [arrwow keys] on radio buttons should be left alone
    if (isNodeName(target, 'input') && target.type == 'radio' &&
        arrowKeys[event.keyCode])  {
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
    deltaY = Math.abs(deltaY);
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
      window.scrollBy(0, 3);
      if (document.body.scrollTop != bodyScrollTop)
        (SCROLL_ROOT = document.body);
      else 
        (SCROLL_ROOT = document.documentElement);
      window.scrollBy(0, -3);
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


/***********************************************
 * FIRST RUN
 ***********************************************/

var userAgent = window.navigator.userAgent;
var isEdge    = /Edge/.test(userAgent); // thank you MS
var isChrome  = /chrome/i.test(userAgent) && !isEdge; 
var isSafari  = /safari/i.test(userAgent) && !isEdge; 
var isMobile  = /mobile/i.test(userAgent);
var isIEWin7  = /Windows NT 6.1/i.test(userAgent) && /rv:11/i.test(userAgent);
var isEnabledForBrowser = (isChrome || isSafari || isIEWin7) && !isMobile;

var wheelEvent;
if ('onwheel' in document.createElement('div'))
    wheelEvent = 'wheel';
else if ('onmousewheel' in document.createElement('div'))
    wheelEvent = 'mousewheel';

if (wheelEvent && isEnabledForBrowser) {
    addEvent(wheelEvent, wheel);
    addEvent('mousedown', mousedown);
    addEvent('load', init);
}


/***********************************************
 * PUBLIC INTERFACE
 ***********************************************/

function SmoothScroll(optionsToSet) {
    for (var key in optionsToSet)
        if (defaultOptions.hasOwnProperty(key)) 
            options[key] = optionsToSet[key];
}
SmoothScroll.destroy = cleanup;

if (window.SmoothScrollOptions) // async API
    SmoothScroll(window.SmoothScrollOptions);

if (typeof define === 'function' && define.amd)
    define(function() {
        return SmoothScroll;
    });
else if ('object' == typeof exports)
    module.exports = SmoothScroll;
else
    window.SmoothScroll = SmoothScroll;

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

/*!
 * PEP v0.4.2 | https://github.com/jquery/PEP
 * Copyright jQuery Foundation and other contributors | http://jquery.org/license
 */
!function(a,b){"object"==typeof exports&&"undefined"!=typeof module?module.exports=b():"function"==typeof define&&define.amd?define(b):a.PointerEventsPolyfill=b()}(this,function(){"use strict";function a(a,b){b=b||Object.create(null);var c=document.createEvent("Event");c.initEvent(a,b.bubbles||!1,b.cancelable||!1);
// define inherited MouseEvent properties
// skip bubbles and cancelable since they're set above in initEvent()
for(var d,e=2;e<m.length;e++)d=m[e],c[d]=b[d]||n[e];c.buttons=b.buttons||0;
// Spec requires that pointers without pressure specified use 0.5 for down
// state and 0 for up state.
var f=0;
// add x/y properties aliased to clientX/Y
// define the properties of the PointerEvent interface
return f=b.pressure&&c.buttons?b.pressure:c.buttons?.5:0,c.x=c.clientX,c.y=c.clientY,c.pointerId=b.pointerId||0,c.width=b.width||0,c.height=b.height||0,c.pressure=f,c.tiltX=b.tiltX||0,c.tiltY=b.tiltY||0,c.pointerType=b.pointerType||"",c.hwTimestamp=b.hwTimestamp||0,c.isPrimary=b.isPrimary||!1,c}function b(){this.array=[],this.size=0}function c(a,b,c,d){this.addCallback=a.bind(d),this.removeCallback=b.bind(d),this.changedCallback=c.bind(d),A&&(this.observer=new A(this.mutationWatcher.bind(this)))}function d(a){return"body /shadow-deep/ "+e(a)}function e(a){return'[touch-action="'+a+'"]'}function f(a){return"{ -ms-touch-action: "+a+"; touch-action: "+a+"; }"}function g(){if(F){D.forEach(function(a){String(a)===a?(E+=e(a)+f(a)+"\n",G&&(E+=d(a)+f(a)+"\n")):(E+=a.selectors.map(e)+f(a.rule)+"\n",G&&(E+=a.selectors.map(d)+f(a.rule)+"\n"))});var a=document.createElement("style");a.textContent=E,document.head.appendChild(a)}}function h(){
// only activate if this platform does not have pointer events
if(!window.PointerEvent){if(window.PointerEvent=a,window.navigator.msPointerEnabled){var b=window.navigator.msMaxTouchPoints;Object.defineProperty(window.navigator,"maxTouchPoints",{value:b,enumerable:!0}),u.registerSource("ms",$)}else u.registerSource("mouse",N),void 0!==window.ontouchstart&&u.registerSource("touch",V);u.register(document)}}function i(a){if(!u.pointermap.has(a)){var b=new Error("InvalidPointerId");throw b.name="InvalidPointerId",b}}function j(a){if(!a.ownerDocument.contains(a)){var b=new Error("InvalidStateError");throw b.name="InvalidStateError",b}}function k(a){var b=u.pointermap.get(a);return 0!==b.buttons}function l(){window.Element&&!Element.prototype.setPointerCapture&&Object.defineProperties(Element.prototype,{setPointerCapture:{value:W},releasePointerCapture:{value:X}})}/**
   * This is the constructor for new PointerEvents.
   *
   * New Pointer Events must be given a type, and an optional dictionary of
   * initialization properties.
   *
   * Due to certain platform requirements, events returned from the constructor
   * identify as MouseEvents.
   *
   * @constructor
   * @param {String} inType The type of the event to create.
   * @param {Object} [inDict] An optional dictionary of initial event properties.
   * @return {Event} A new PointerEvent of type `inType`, initialized with properties from `inDict`.
   */
var m=["bubbles","cancelable","view","detail","screenX","screenY","clientX","clientY","ctrlKey","altKey","shiftKey","metaKey","button","relatedTarget","pageX","pageY"],n=[!1,!1,null,null,0,0,0,0,!1,!1,!1,!1,0,null,0,0],o=window.Map&&window.Map.prototype.forEach,p=o?Map:b;b.prototype={set:function(a,b){return void 0===b?this["delete"](a):(this.has(a)||this.size++,void(this.array[a]=b))},has:function(a){return void 0!==this.array[a]},"delete":function(a){this.has(a)&&(delete this.array[a],this.size--)},get:function(a){return this.array[a]},clear:function(){this.array.length=0,this.size=0},
// return value, key, map
forEach:function(a,b){return this.array.forEach(function(c,d){a.call(b,c,d,this)},this)}};var q=[
// MouseEvent
"bubbles","cancelable","view","detail","screenX","screenY","clientX","clientY","ctrlKey","altKey","shiftKey","metaKey","button","relatedTarget",
// DOM Level 3
"buttons",
// PointerEvent
"pointerId","width","height","pressure","tiltX","tiltY","pointerType","hwTimestamp","isPrimary",
// event instance
"type","target","currentTarget","which","pageX","pageY","timeStamp"],r=[
// MouseEvent
!1,!1,null,null,0,0,0,0,!1,!1,!1,!1,0,null,
// DOM Level 3
0,
// PointerEvent
0,0,0,0,0,0,"",0,!1,
// event instance
"",null,null,0,0,0,0],s={pointerover:1,pointerout:1,pointerenter:1,pointerleave:1},t="undefined"!=typeof SVGElementInstance,u={pointermap:new p,eventMap:Object.create(null),captureInfo:Object.create(null),
// Scope objects for native events.
// This exists for ease of testing.
eventSources:Object.create(null),eventSourceList:[],/**
     * Add a new event source that will generate pointer events.
     *
     * `inSource` must contain an array of event names named `events`, and
     * functions with the names specified in the `events` array.
     * @param {string} name A name for the event source
     * @param {Object} source A new source of platform events.
     */
registerSource:function(a,b){var c=b,d=c.events;d&&(d.forEach(function(a){c[a]&&(this.eventMap[a]=c[a].bind(c))},this),this.eventSources[a]=c,this.eventSourceList.push(c))},register:function(a){for(var b,c=this.eventSourceList.length,d=0;d<c&&(b=this.eventSourceList[d]);d++)
// call eventsource register
b.register.call(b,a)},unregister:function(a){for(var b,c=this.eventSourceList.length,d=0;d<c&&(b=this.eventSourceList[d]);d++)
// call eventsource register
b.unregister.call(b,a)},contains:/*scope.external.contains || */function(a,b){try{return a.contains(b)}catch(c){
// most likely: https://bugzilla.mozilla.org/show_bug.cgi?id=208427
return!1}},
// EVENTS
down:function(a){a.bubbles=!0,this.fireEvent("pointerdown",a)},move:function(a){a.bubbles=!0,this.fireEvent("pointermove",a)},up:function(a){a.bubbles=!0,this.fireEvent("pointerup",a)},enter:function(a){a.bubbles=!1,this.fireEvent("pointerenter",a)},leave:function(a){a.bubbles=!1,this.fireEvent("pointerleave",a)},over:function(a){a.bubbles=!0,this.fireEvent("pointerover",a)},out:function(a){a.bubbles=!0,this.fireEvent("pointerout",a)},cancel:function(a){a.bubbles=!0,this.fireEvent("pointercancel",a)},leaveOut:function(a){this.out(a),this.propagate(a,this.leave,!1)},enterOver:function(a){this.over(a),this.propagate(a,this.enter,!0)},
// LISTENER LOGIC
eventHandler:function(a){
// This is used to prevent multiple dispatch of pointerevents from
// platform events. This can happen when two elements in different scopes
// are set up to create pointer events, which is relevant to Shadow DOM.
if(!a._handledByPE){var b=a.type,c=this.eventMap&&this.eventMap[b];c&&c(a),a._handledByPE=!0}},
// set up event listeners
listen:function(a,b){b.forEach(function(b){this.addEvent(a,b)},this)},
// remove event listeners
unlisten:function(a,b){b.forEach(function(b){this.removeEvent(a,b)},this)},addEvent:/*scope.external.addEvent || */function(a,b){a.addEventListener(b,this.boundHandler)},removeEvent:/*scope.external.removeEvent || */function(a,b){a.removeEventListener(b,this.boundHandler)},
// EVENT CREATION AND TRACKING
/**
     * Creates a new Event of type `inType`, based on the information in
     * `inEvent`.
     *
     * @param {string} inType A string representing the type of event to create
     * @param {Event} inEvent A platform event with a target
     * @return {Event} A PointerEvent of type `inType`
     */
makeEvent:function(b,c){
// relatedTarget must be null if pointer is captured
this.captureInfo[c.pointerId]&&(c.relatedTarget=null);var d=new a(b,c);return c.preventDefault&&(d.preventDefault=c.preventDefault),d._target=d._target||c.target,d},
// make and dispatch an event in one call
fireEvent:function(a,b){var c=this.makeEvent(a,b);return this.dispatchEvent(c)},/**
     * Returns a snapshot of inEvent, with writable properties.
     *
     * @param {Event} inEvent An event that contains properties to copy.
     * @return {Object} An object containing shallow copies of `inEvent`'s
     *    properties.
     */
cloneEvent:function(a){for(var b,c=Object.create(null),d=0;d<q.length;d++)b=q[d],c[b]=a[b]||r[d],
// Work around SVGInstanceElement shadow tree
// Return the <use> element that is represented by the instance for Safari, Chrome, IE.
// This is the behavior implemented by Firefox.
!t||"target"!==b&&"relatedTarget"!==b||c[b]instanceof SVGElementInstance&&(c[b]=c[b].correspondingUseElement);
// keep the semantics of preventDefault
return a.preventDefault&&(c.preventDefault=function(){a.preventDefault()}),c},getTarget:function(a){var b=this.captureInfo[a.pointerId];return b?a._target!==b&&a.type in s?void 0:b:a._target},propagate:function(a,b,c){for(var d=a.target,e=[];!d.contains(a.relatedTarget)&&d!==document;)e.push(d),d=d.parentNode;c&&e.reverse(),e.forEach(function(c){a.target=c,b.call(this,a)},this)},setCapture:function(b,c){this.captureInfo[b]&&this.releaseCapture(b),this.captureInfo[b]=c;var d=new a("gotpointercapture");d.pointerId=b,this.implicitRelease=this.releaseCapture.bind(this,b),document.addEventListener("pointerup",this.implicitRelease),document.addEventListener("pointercancel",this.implicitRelease),d._target=c,this.asyncDispatchEvent(d)},releaseCapture:function(b){var c=this.captureInfo[b];if(c){var d=new a("lostpointercapture");d.pointerId=b,this.captureInfo[b]=void 0,document.removeEventListener("pointerup",this.implicitRelease),document.removeEventListener("pointercancel",this.implicitRelease),d._target=c,this.asyncDispatchEvent(d)}},/**
     * Dispatches the event to its target.
     *
     * @param {Event} inEvent The event to be dispatched.
     * @return {Boolean} True if an event handler returns true, false otherwise.
     */
dispatchEvent:/*scope.external.dispatchEvent || */function(a){var b=this.getTarget(a);if(b)return b.dispatchEvent(a)},asyncDispatchEvent:function(a){requestAnimationFrame(this.dispatchEvent.bind(this,a))}};u.boundHandler=u.eventHandler.bind(u);var v={shadow:function(a){if(a)return a.shadowRoot||a.webkitShadowRoot},canTarget:function(a){return a&&Boolean(a.elementFromPoint)},targetingShadow:function(a){var b=this.shadow(a);if(this.canTarget(b))return b},olderShadow:function(a){var b=a.olderShadowRoot;if(!b){var c=a.querySelector("shadow");c&&(b=c.olderShadowRoot)}return b},allShadows:function(a){for(var b=[],c=this.shadow(a);c;)b.push(c),c=this.olderShadow(c);return b},searchRoot:function(a,b,c){if(a){var d,e,f=a.elementFromPoint(b,c);for(
// is element a shadow host?
e=this.targetingShadow(f);e;){if(
// find the the element inside the shadow root
d=e.elementFromPoint(b,c)){
// shadowed element may contain a shadow root
var g=this.targetingShadow(d);return this.searchRoot(g,b,c)||d}
// check for older shadows
e=this.olderShadow(e)}
// light dom element is the target
return f}},owner:function(a){
// walk up until you hit the shadow root or document
for(var b=a;b.parentNode;)b=b.parentNode;
// the owner element is expected to be a Document or ShadowRoot
return b.nodeType!==Node.DOCUMENT_NODE&&b.nodeType!==Node.DOCUMENT_FRAGMENT_NODE&&(b=document),b},findTarget:function(a){var b=a.clientX,c=a.clientY,d=this.owner(a.target);
// if x, y is not in this root, fall back to document search
return d.elementFromPoint(b,c)||(d=document),this.searchRoot(d,b,c)}},w=Array.prototype.forEach.call.bind(Array.prototype.forEach),x=Array.prototype.map.call.bind(Array.prototype.map),y=Array.prototype.slice.call.bind(Array.prototype.slice),z=Array.prototype.filter.call.bind(Array.prototype.filter),A=window.MutationObserver||window.WebKitMutationObserver,B="[touch-action]",C={subtree:!0,childList:!0,attributes:!0,attributeOldValue:!0,attributeFilter:["touch-action"]};c.prototype={watchSubtree:function(a){
// Only watch scopes that can target find, as these are top-level.
// Otherwise we can see duplicate additions and removals that add noise.
//
// TODO(dfreedman): For some instances with ShadowDOMPolyfill, we can see
// a removal without an insertion when a node is redistributed among
// shadows. Since it all ends up correct in the document, watching only
// the document will yield the correct mutations to watch.
this.observer&&v.canTarget(a)&&this.observer.observe(a,C)},enableOnSubtree:function(a){this.watchSubtree(a),a===document&&"complete"!==document.readyState?this.installOnLoad():this.installNewSubtree(a)},installNewSubtree:function(a){w(this.findElements(a),this.addElement,this)},findElements:function(a){return a.querySelectorAll?a.querySelectorAll(B):[]},removeElement:function(a){this.removeCallback(a)},addElement:function(a){this.addCallback(a)},elementChanged:function(a,b){this.changedCallback(a,b)},concatLists:function(a,b){return a.concat(y(b))},
// register all touch-action = none nodes on document load
installOnLoad:function(){document.addEventListener("readystatechange",function(){"complete"===document.readyState&&this.installNewSubtree(document)}.bind(this))},isElement:function(a){return a.nodeType===Node.ELEMENT_NODE},flattenMutationTree:function(a){
// find children with touch-action
var b=x(a,this.findElements,this);
// flatten the list
// make sure the added nodes are accounted for
return b.push(z(a,this.isElement)),b.reduce(this.concatLists,[])},mutationWatcher:function(a){a.forEach(this.mutationHandler,this)},mutationHandler:function(a){if("childList"===a.type){var b=this.flattenMutationTree(a.addedNodes);b.forEach(this.addElement,this);var c=this.flattenMutationTree(a.removedNodes);c.forEach(this.removeElement,this)}else"attributes"===a.type&&this.elementChanged(a.target,a.oldValue)}};var D=["none","auto","pan-x","pan-y",{rule:"pan-x pan-y",selectors:["pan-x pan-y","pan-y pan-x"]}],E="",F=window.PointerEvent||window.MSPointerEvent,G=!window.ShadowDOMPolyfill&&document.head.createShadowRoot,H=u.pointermap,I=25,J=[1,4,2,8,16],K=!1;try{K=1===new MouseEvent("test",{buttons:1}).buttons}catch(L){}
// handler block for native mouse events
var M,N={POINTER_ID:1,POINTER_TYPE:"mouse",events:["mousedown","mousemove","mouseup","mouseover","mouseout"],register:function(a){u.listen(a,this.events)},unregister:function(a){u.unlisten(a,this.events)},lastTouches:[],
// collide with the global mouse listener
isEventSimulatedFromTouch:function(a){for(var b,c=this.lastTouches,d=a.clientX,e=a.clientY,f=0,g=c.length;f<g&&(b=c[f]);f++){
// simulated mouse events will be swallowed near a primary touchend
var h=Math.abs(d-b.x),i=Math.abs(e-b.y);if(h<=I&&i<=I)return!0}},prepareEvent:function(a){var b=u.cloneEvent(a),c=b.preventDefault;return b.preventDefault=function(){a.preventDefault(),c()},b.pointerId=this.POINTER_ID,b.isPrimary=!0,b.pointerType=this.POINTER_TYPE,b},prepareButtonsForMove:function(a,b){var c=H.get(this.POINTER_ID);
// Update buttons state after possible out-of-document mouseup.
0!==b.which&&c?a.buttons=c.buttons:a.buttons=0,b.buttons=a.buttons},mousedown:function(a){if(!this.isEventSimulatedFromTouch(a)){var b=H.get(this.POINTER_ID),c=this.prepareEvent(a);K||(c.buttons=J[c.button],b&&(c.buttons|=b.buttons),a.buttons=c.buttons),H.set(this.POINTER_ID,a),b&&0!==b.buttons?u.move(c):u.down(c)}},mousemove:function(a){if(!this.isEventSimulatedFromTouch(a)){var b=this.prepareEvent(a);K||this.prepareButtonsForMove(b,a),b.button=-1,H.set(this.POINTER_ID,a),u.move(b)}},mouseup:function(a){if(!this.isEventSimulatedFromTouch(a)){var b=H.get(this.POINTER_ID),c=this.prepareEvent(a);if(!K){var d=J[c.button];
// Produces wrong state of buttons in Browsers without `buttons` support
// when a mouse button that was pressed outside the document is released
// inside and other buttons are still pressed down.
c.buttons=b?b.buttons&~d:0,a.buttons=c.buttons}H.set(this.POINTER_ID,a),
// Support: Firefox <=44 only
// FF Ubuntu includes the lifted button in the `buttons` property on
// mouseup.
// https://bugzilla.mozilla.org/show_bug.cgi?id=1223366
c.buttons&=~J[c.button],0===c.buttons?u.up(c):u.move(c)}},mouseover:function(a){if(!this.isEventSimulatedFromTouch(a)){var b=this.prepareEvent(a);K||this.prepareButtonsForMove(b,a),b.button=-1,H.set(this.POINTER_ID,a),u.enterOver(b)}},mouseout:function(a){if(!this.isEventSimulatedFromTouch(a)){var b=this.prepareEvent(a);K||this.prepareButtonsForMove(b,a),b.button=-1,u.leaveOut(b)}},cancel:function(a){var b=this.prepareEvent(a);u.cancel(b),this.deactivateMouse()},deactivateMouse:function(){H["delete"](this.POINTER_ID)}},O=u.captureInfo,P=v.findTarget.bind(v),Q=v.allShadows.bind(v),R=u.pointermap,S=2500,T=200,U="touch-action",V={events:["touchstart","touchmove","touchend","touchcancel"],register:function(a){M.enableOnSubtree(a)},unregister:function(){},elementAdded:function(a){var b=a.getAttribute(U),c=this.touchActionToScrollType(b);c&&(a._scrollType=c,u.listen(a,this.events),
// set touch-action on shadows as well
Q(a).forEach(function(a){a._scrollType=c,u.listen(a,this.events)},this))},elementRemoved:function(a){a._scrollType=void 0,u.unlisten(a,this.events),
// remove touch-action from shadow
Q(a).forEach(function(a){a._scrollType=void 0,u.unlisten(a,this.events)},this)},elementChanged:function(a,b){var c=a.getAttribute(U),d=this.touchActionToScrollType(c),e=this.touchActionToScrollType(b);
// simply update scrollType if listeners are already established
d&&e?(a._scrollType=d,Q(a).forEach(function(a){a._scrollType=d},this)):e?this.elementRemoved(a):d&&this.elementAdded(a)},scrollTypes:{EMITTER:"none",XSCROLLER:"pan-x",YSCROLLER:"pan-y",SCROLLER:/^(?:pan-x pan-y)|(?:pan-y pan-x)|auto$/},touchActionToScrollType:function(a){var b=a,c=this.scrollTypes;return"none"===b?"none":b===c.XSCROLLER?"X":b===c.YSCROLLER?"Y":c.SCROLLER.exec(b)?"XY":void 0},POINTER_TYPE:"touch",firstTouch:null,isPrimaryTouch:function(a){return this.firstTouch===a.identifier},setPrimaryTouch:function(a){
// set primary touch if there no pointers, or the only pointer is the mouse
(0===R.size||1===R.size&&R.has(1))&&(this.firstTouch=a.identifier,this.firstXY={X:a.clientX,Y:a.clientY},this.scrolling=!1,this.cancelResetClickCount())},removePrimaryPointer:function(a){a.isPrimary&&(this.firstTouch=null,this.firstXY=null,this.resetClickCount())},clickCount:0,resetId:null,resetClickCount:function(){var a=function(){this.clickCount=0,this.resetId=null}.bind(this);this.resetId=setTimeout(a,T)},cancelResetClickCount:function(){this.resetId&&clearTimeout(this.resetId)},typeToButtons:function(a){var b=0;return"touchstart"!==a&&"touchmove"!==a||(b=1),b},touchToPointer:function(a){var b=this.currentTouchEvent,c=u.cloneEvent(a),d=c.pointerId=a.identifier+2;c.target=O[d]||P(c),c.bubbles=!0,c.cancelable=!0,c.detail=this.clickCount,c.button=0,c.buttons=this.typeToButtons(b.type),c.width=a.radiusX||a.webkitRadiusX||0,c.height=a.radiusY||a.webkitRadiusY||0,c.pressure=a.force||a.webkitForce||.5,c.isPrimary=this.isPrimaryTouch(a),c.pointerType=this.POINTER_TYPE,
// forward modifier keys
c.altKey=b.altKey,c.ctrlKey=b.ctrlKey,c.metaKey=b.metaKey,c.shiftKey=b.shiftKey;
// forward touch preventDefaults
var e=this;return c.preventDefault=function(){e.scrolling=!1,e.firstXY=null,b.preventDefault()},c},processTouches:function(a,b){var c=a.changedTouches;this.currentTouchEvent=a;for(var d,e=0;e<c.length;e++)d=c[e],b.call(this,this.touchToPointer(d))},
// For single axis scrollers, determines whether the element should emit
// pointer events or behave as a scroller
shouldScroll:function(a){if(this.firstXY){var b,c=a.currentTarget._scrollType;if("none"===c)
// this element is a touch-action: none, should never scroll
b=!1;else if("XY"===c)
// this element should always scroll
b=!0;else{var d=a.changedTouches[0],e=c,f="Y"===c?"X":"Y",g=Math.abs(d["client"+e]-this.firstXY[e]),h=Math.abs(d["client"+f]-this.firstXY[f]);
// if delta in the scroll axis > delta other axis, scroll instead of
// making events
b=g>=h}return this.firstXY=null,b}},findTouch:function(a,b){for(var c,d=0,e=a.length;d<e&&(c=a[d]);d++)if(c.identifier===b)return!0},
// In some instances, a touchstart can happen without a touchend. This
// leaves the pointermap in a broken state.
// Therefore, on every touchstart, we remove the touches that did not fire a
// touchend event.
// To keep state globally consistent, we fire a
// pointercancel for this "abandoned" touch
vacuumTouches:function(a){var b=a.touches;
// pointermap.size should be < tl.length here, as the touchstart has not
// been processed yet.
if(R.size>=b.length){var c=[];R.forEach(function(a,d){
// Never remove pointerId == 1, which is mouse.
// Touch identifiers are 2 smaller than their pointerId, which is the
// index in pointermap.
if(1!==d&&!this.findTouch(b,d-2)){var e=a.out;c.push(e)}},this),c.forEach(this.cancelOut,this)}},touchstart:function(a){this.vacuumTouches(a),this.setPrimaryTouch(a.changedTouches[0]),this.dedupSynthMouse(a),this.scrolling||(this.clickCount++,this.processTouches(a,this.overDown))},overDown:function(a){R.set(a.pointerId,{target:a.target,out:a,outTarget:a.target}),u.enterOver(a),u.down(a)},touchmove:function(a){this.scrolling||(this.shouldScroll(a)?(this.scrolling=!0,this.touchcancel(a)):(a.preventDefault(),this.processTouches(a,this.moveOverOut)))},moveOverOut:function(a){var b=a,c=R.get(b.pointerId);
// a finger drifted off the screen, ignore it
if(c){var d=c.out,e=c.outTarget;u.move(b),d&&e!==b.target&&(d.relatedTarget=b.target,b.relatedTarget=e,
// recover from retargeting by shadow
d.target=e,b.target?(u.leaveOut(d),u.enterOver(b)):(
// clean up case when finger leaves the screen
b.target=e,b.relatedTarget=null,this.cancelOut(b))),c.out=b,c.outTarget=b.target}},touchend:function(a){this.dedupSynthMouse(a),this.processTouches(a,this.upOut)},upOut:function(a){this.scrolling||(u.up(a),u.leaveOut(a)),this.cleanUpPointer(a)},touchcancel:function(a){this.processTouches(a,this.cancelOut)},cancelOut:function(a){u.cancel(a),u.leaveOut(a),this.cleanUpPointer(a)},cleanUpPointer:function(a){R["delete"](a.pointerId),this.removePrimaryPointer(a)},
// prevent synth mouse events from creating pointer events
dedupSynthMouse:function(a){var b=N.lastTouches,c=a.changedTouches[0];
// only the primary finger will synth mouse events
if(this.isPrimaryTouch(c)){
// remember x/y of last touch
var d={x:c.clientX,y:c.clientY};b.push(d);var e=function(a,b){var c=a.indexOf(b);c>-1&&a.splice(c,1)}.bind(null,b,d);setTimeout(e,S)}}};M=new c(V.elementAdded,V.elementRemoved,V.elementChanged,V);var W,X,Y=u.pointermap,Z=window.MSPointerEvent&&"number"==typeof window.MSPointerEvent.MSPOINTER_TYPE_MOUSE,$={events:["MSPointerDown","MSPointerMove","MSPointerUp","MSPointerOut","MSPointerOver","MSPointerCancel","MSGotPointerCapture","MSLostPointerCapture"],register:function(a){u.listen(a,this.events)},unregister:function(a){u.unlisten(a,this.events)},POINTER_TYPES:["","unavailable","touch","pen","mouse"],prepareEvent:function(a){var b=a;return Z&&(b=u.cloneEvent(a),b.pointerType=this.POINTER_TYPES[a.pointerType]),b},cleanup:function(a){Y["delete"](a)},MSPointerDown:function(a){Y.set(a.pointerId,a);var b=this.prepareEvent(a);u.down(b)},MSPointerMove:function(a){var b=this.prepareEvent(a);u.move(b)},MSPointerUp:function(a){var b=this.prepareEvent(a);u.up(b),this.cleanup(a.pointerId)},MSPointerOut:function(a){var b=this.prepareEvent(a);u.leaveOut(b)},MSPointerOver:function(a){var b=this.prepareEvent(a);u.enterOver(b)},MSPointerCancel:function(a){var b=this.prepareEvent(a);u.cancel(b),this.cleanup(a.pointerId)},MSLostPointerCapture:function(a){var b=u.makeEvent("lostpointercapture",a);u.dispatchEvent(b)},MSGotPointerCapture:function(a){var b=u.makeEvent("gotpointercapture",a);u.dispatchEvent(b)}},_=window.navigator;_.msPointerEnabled?(W=function(a){i(a),j(this),k(a)&&this.msSetPointerCapture(a)},X=function(a){i(a),this.msReleasePointerCapture(a)}):(W=function(a){i(a),j(this),k(a)&&u.setCapture(a,this)},X=function(a){i(a),u.releaseCapture(a,this)}),g(),h(),l();var aa={dispatcher:u,Installer:c,PointerEvent:a,PointerMap:p,targetFinding:v};return aa});
/*!
    localForage -- Offline Storage, Improved
    Version 1.4.3
    https://mozilla.github.io/localForage
    (c) 2013-2016 Mozilla, Apache License 2.0
*/
!function(a){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=a();else if("function"==typeof define&&define.amd)define([],a);else{var b;b="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,b.localforage=a()}}(function(){return function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){"use strict";function d(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function e(){try{if("undefined"!=typeof indexedDB)return indexedDB;if("undefined"!=typeof webkitIndexedDB)return webkitIndexedDB;if("undefined"!=typeof mozIndexedDB)return mozIndexedDB;if("undefined"!=typeof OIndexedDB)return OIndexedDB;if("undefined"!=typeof msIndexedDB)return msIndexedDB}catch(a){}}function f(){try{return!!fa&&(!("undefined"!=typeof openDatabase&&"undefined"!=typeof navigator&&navigator.userAgent&&/Safari/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent))&&(fa&&"function"==typeof fa.open&&"undefined"!=typeof IDBKeyRange))}catch(a){return!1}}function g(){return"function"==typeof openDatabase}function h(){try{return"undefined"!=typeof localStorage&&"setItem"in localStorage&&localStorage.setItem}catch(a){return!1}}function i(a,b){a=a||[],b=b||{};try{return new Blob(a,b)}catch(f){if("TypeError"!==f.name)throw f;for(var c="undefined"!=typeof BlobBuilder?BlobBuilder:"undefined"!=typeof MSBlobBuilder?MSBlobBuilder:"undefined"!=typeof MozBlobBuilder?MozBlobBuilder:WebKitBlobBuilder,d=new c,e=0;e<a.length;e+=1)d.append(a[e]);return d.getBlob(b.type)}}function j(a,b){b&&a.then(function(a){b(null,a)},function(a){b(a)})}function k(a,b,c){"function"==typeof b&&a.then(b),"function"==typeof c&&a.catch(c)}function l(a){for(var b=a.length,c=new ArrayBuffer(b),d=new Uint8Array(c),e=0;e<b;e++)d[e]=a.charCodeAt(e);return c}function m(a){return new ia(function(b){var c=i([""]);a.objectStore(ja).put(c,"key"),a.onabort=function(a){a.preventDefault(),a.stopPropagation(),b(!1)},a.oncomplete=function(){var a=navigator.userAgent.match(/Chrome\/(\d+)/),c=navigator.userAgent.match(/Edge\//);b(c||!a||parseInt(a[1],10)>=43)}}).catch(function(){return!1})}function n(a){return"boolean"==typeof ga?ia.resolve(ga):m(a).then(function(a){return ga=a})}function o(a){var b=ha[a.name],c={};c.promise=new ia(function(a){c.resolve=a}),b.deferredOperations.push(c),b.dbReady?b.dbReady=b.dbReady.then(function(){return c.promise}):b.dbReady=c.promise}function p(a){var b=ha[a.name],c=b.deferredOperations.pop();c&&c.resolve()}function q(a,b){return new ia(function(c,d){if(a.db){if(!b)return c(a.db);o(a),a.db.close()}var e=[a.name];b&&e.push(a.version);var f=fa.open.apply(fa,e);b&&(f.onupgradeneeded=function(b){var c=f.result;try{c.createObjectStore(a.storeName),b.oldVersion<=1&&c.createObjectStore(ja)}catch(c){if("ConstraintError"!==c.name)throw c;console.warn('The database "'+a.name+'" has been upgraded from version '+b.oldVersion+" to version "+b.newVersion+', but the storage "'+a.storeName+'" already exists.')}}),f.onerror=function(){d(f.error)},f.onsuccess=function(){c(f.result),p(a)}})}function r(a){return q(a,!1)}function s(a){return q(a,!0)}function t(a,b){if(!a.db)return!0;var c=!a.db.objectStoreNames.contains(a.storeName),d=a.version<a.db.version,e=a.version>a.db.version;if(d&&(a.version!==b&&console.warn('The database "'+a.name+"\" can't be downgraded from version "+a.db.version+" to version "+a.version+"."),a.version=a.db.version),e||c){if(c){var f=a.db.version+1;f>a.version&&(a.version=f)}return!0}return!1}function u(a){return new ia(function(b,c){var d=new FileReader;d.onerror=c,d.onloadend=function(c){var d=btoa(c.target.result||"");b({__local_forage_encoded_blob:!0,data:d,type:a.type})},d.readAsBinaryString(a)})}function v(a){var b=l(atob(a.data));return i([b],{type:a.type})}function w(a){return a&&a.__local_forage_encoded_blob}function x(a){var b=this,c=b._initReady().then(function(){var a=ha[b._dbInfo.name];if(a&&a.dbReady)return a.dbReady});return k(c,a,a),c}function y(a){function b(){return ia.resolve()}var c=this,d={db:null};if(a)for(var e in a)d[e]=a[e];ha||(ha={});var f=ha[d.name];f||(f={forages:[],db:null,dbReady:null,deferredOperations:[]},ha[d.name]=f),f.forages.push(c),c._initReady||(c._initReady=c.ready,c.ready=x);for(var g=[],h=0;h<f.forages.length;h++){var i=f.forages[h];i!==c&&g.push(i._initReady().catch(b))}var j=f.forages.slice(0);return ia.all(g).then(function(){return d.db=f.db,r(d)}).then(function(a){return d.db=a,t(d,c._defaultConfig.version)?s(d):a}).then(function(a){d.db=f.db=a,c._dbInfo=d;for(var b=0;b<j.length;b++){var e=j[b];e!==c&&(e._dbInfo.db=d.db,e._dbInfo.version=d.version)}})}function z(a,b){var c=this;"string"!=typeof a&&(console.warn(a+" used as a key, but it is not a string."),a=String(a));var d=new ia(function(b,d){c.ready().then(function(){var e=c._dbInfo,f=e.db.transaction(e.storeName,"readonly").objectStore(e.storeName),g=f.get(a);g.onsuccess=function(){var a=g.result;void 0===a&&(a=null),w(a)&&(a=v(a)),b(a)},g.onerror=function(){d(g.error)}}).catch(d)});return j(d,b),d}function A(a,b){var c=this,d=new ia(function(b,d){c.ready().then(function(){var e=c._dbInfo,f=e.db.transaction(e.storeName,"readonly").objectStore(e.storeName),g=f.openCursor(),h=1;g.onsuccess=function(){var c=g.result;if(c){var d=c.value;w(d)&&(d=v(d));var e=a(d,c.key,h++);void 0!==e?b(e):c.continue()}else b()},g.onerror=function(){d(g.error)}}).catch(d)});return j(d,b),d}function B(a,b,c){var d=this;"string"!=typeof a&&(console.warn(a+" used as a key, but it is not a string."),a=String(a));var e=new ia(function(c,e){var f;d.ready().then(function(){return f=d._dbInfo,"[object Blob]"===ka.call(b)?n(f.db).then(function(a){return a?b:u(b)}):b}).then(function(b){var d=f.db.transaction(f.storeName,"readwrite"),g=d.objectStore(f.storeName);null===b&&(b=void 0),d.oncomplete=function(){void 0===b&&(b=null),c(b)},d.onabort=d.onerror=function(){var a=h.error?h.error:h.transaction.error;e(a)};var h=g.put(b,a)}).catch(e)});return j(e,c),e}function C(a,b){var c=this;"string"!=typeof a&&(console.warn(a+" used as a key, but it is not a string."),a=String(a));var d=new ia(function(b,d){c.ready().then(function(){var e=c._dbInfo,f=e.db.transaction(e.storeName,"readwrite"),g=f.objectStore(e.storeName),h=g.delete(a);f.oncomplete=function(){b()},f.onerror=function(){d(h.error)},f.onabort=function(){var a=h.error?h.error:h.transaction.error;d(a)}}).catch(d)});return j(d,b),d}function D(a){var b=this,c=new ia(function(a,c){b.ready().then(function(){var d=b._dbInfo,e=d.db.transaction(d.storeName,"readwrite"),f=e.objectStore(d.storeName),g=f.clear();e.oncomplete=function(){a()},e.onabort=e.onerror=function(){var a=g.error?g.error:g.transaction.error;c(a)}}).catch(c)});return j(c,a),c}function E(a){var b=this,c=new ia(function(a,c){b.ready().then(function(){var d=b._dbInfo,e=d.db.transaction(d.storeName,"readonly").objectStore(d.storeName),f=e.count();f.onsuccess=function(){a(f.result)},f.onerror=function(){c(f.error)}}).catch(c)});return j(c,a),c}function F(a,b){var c=this,d=new ia(function(b,d){return a<0?void b(null):void c.ready().then(function(){var e=c._dbInfo,f=e.db.transaction(e.storeName,"readonly").objectStore(e.storeName),g=!1,h=f.openCursor();h.onsuccess=function(){var c=h.result;return c?void(0===a?b(c.key):g?b(c.key):(g=!0,c.advance(a))):void b(null)},h.onerror=function(){d(h.error)}}).catch(d)});return j(d,b),d}function G(a){var b=this,c=new ia(function(a,c){b.ready().then(function(){var d=b._dbInfo,e=d.db.transaction(d.storeName,"readonly").objectStore(d.storeName),f=e.openCursor(),g=[];f.onsuccess=function(){var b=f.result;return b?(g.push(b.key),void b.continue()):void a(g)},f.onerror=function(){c(f.error)}}).catch(c)});return j(c,a),c}function H(a){var b,c,d,e,f,g=.75*a.length,h=a.length,i=0;"="===a[a.length-1]&&(g--,"="===a[a.length-2]&&g--);var j=new ArrayBuffer(g),k=new Uint8Array(j);for(b=0;b<h;b+=4)c=ma.indexOf(a[b]),d=ma.indexOf(a[b+1]),e=ma.indexOf(a[b+2]),f=ma.indexOf(a[b+3]),k[i++]=c<<2|d>>4,k[i++]=(15&d)<<4|e>>2,k[i++]=(3&e)<<6|63&f;return j}function I(a){var b,c=new Uint8Array(a),d="";for(b=0;b<c.length;b+=3)d+=ma[c[b]>>2],d+=ma[(3&c[b])<<4|c[b+1]>>4],d+=ma[(15&c[b+1])<<2|c[b+2]>>6],d+=ma[63&c[b+2]];return c.length%3===2?d=d.substring(0,d.length-1)+"=":c.length%3===1&&(d=d.substring(0,d.length-2)+"=="),d}function J(a,b){var c="";if(a&&(c=Da.call(a)),a&&("[object ArrayBuffer]"===c||a.buffer&&"[object ArrayBuffer]"===Da.call(a.buffer))){var d,e=pa;a instanceof ArrayBuffer?(d=a,e+=ra):(d=a.buffer,"[object Int8Array]"===c?e+=ta:"[object Uint8Array]"===c?e+=ua:"[object Uint8ClampedArray]"===c?e+=va:"[object Int16Array]"===c?e+=wa:"[object Uint16Array]"===c?e+=ya:"[object Int32Array]"===c?e+=xa:"[object Uint32Array]"===c?e+=za:"[object Float32Array]"===c?e+=Aa:"[object Float64Array]"===c?e+=Ba:b(new Error("Failed to get type for BinaryArray"))),b(e+I(d))}else if("[object Blob]"===c){var f=new FileReader;f.onload=function(){var c=na+a.type+"~"+I(this.result);b(pa+sa+c)},f.readAsArrayBuffer(a)}else try{b(JSON.stringify(a))}catch(c){console.error("Couldn't convert value into a JSON string: ",a),b(null,c)}}function K(a){if(a.substring(0,qa)!==pa)return JSON.parse(a);var b,c=a.substring(Ca),d=a.substring(qa,Ca);if(d===sa&&oa.test(c)){var e=c.match(oa);b=e[1],c=c.substring(e[0].length)}var f=H(c);switch(d){case ra:return f;case sa:return i([f],{type:b});case ta:return new Int8Array(f);case ua:return new Uint8Array(f);case va:return new Uint8ClampedArray(f);case wa:return new Int16Array(f);case ya:return new Uint16Array(f);case xa:return new Int32Array(f);case za:return new Uint32Array(f);case Aa:return new Float32Array(f);case Ba:return new Float64Array(f);default:throw new Error("Unkown type: "+d)}}function L(a){var b=this,c={db:null};if(a)for(var d in a)c[d]="string"!=typeof a[d]?a[d].toString():a[d];var e=new ia(function(a,d){try{c.db=openDatabase(c.name,String(c.version),c.description,c.size)}catch(a){return d(a)}c.db.transaction(function(e){e.executeSql("CREATE TABLE IF NOT EXISTS "+c.storeName+" (id INTEGER PRIMARY KEY, key unique, value)",[],function(){b._dbInfo=c,a()},function(a,b){d(b)})})});return c.serializer=Ea,e}function M(a,b){var c=this;"string"!=typeof a&&(console.warn(a+" used as a key, but it is not a string."),a=String(a));var d=new ia(function(b,d){c.ready().then(function(){var e=c._dbInfo;e.db.transaction(function(c){c.executeSql("SELECT * FROM "+e.storeName+" WHERE key = ? LIMIT 1",[a],function(a,c){var d=c.rows.length?c.rows.item(0).value:null;d&&(d=e.serializer.deserialize(d)),b(d)},function(a,b){d(b)})})}).catch(d)});return j(d,b),d}function N(a,b){var c=this,d=new ia(function(b,d){c.ready().then(function(){var e=c._dbInfo;e.db.transaction(function(c){c.executeSql("SELECT * FROM "+e.storeName,[],function(c,d){for(var f=d.rows,g=f.length,h=0;h<g;h++){var i=f.item(h),j=i.value;if(j&&(j=e.serializer.deserialize(j)),j=a(j,i.key,h+1),void 0!==j)return void b(j)}b()},function(a,b){d(b)})})}).catch(d)});return j(d,b),d}function O(a,b,c){var d=this;"string"!=typeof a&&(console.warn(a+" used as a key, but it is not a string."),a=String(a));var e=new ia(function(c,e){d.ready().then(function(){void 0===b&&(b=null);var f=b,g=d._dbInfo;g.serializer.serialize(b,function(b,d){d?e(d):g.db.transaction(function(d){d.executeSql("INSERT OR REPLACE INTO "+g.storeName+" (key, value) VALUES (?, ?)",[a,b],function(){c(f)},function(a,b){e(b)})},function(a){a.code===a.QUOTA_ERR&&e(a)})})}).catch(e)});return j(e,c),e}function P(a,b){var c=this;"string"!=typeof a&&(console.warn(a+" used as a key, but it is not a string."),a=String(a));var d=new ia(function(b,d){c.ready().then(function(){var e=c._dbInfo;e.db.transaction(function(c){c.executeSql("DELETE FROM "+e.storeName+" WHERE key = ?",[a],function(){b()},function(a,b){d(b)})})}).catch(d)});return j(d,b),d}function Q(a){var b=this,c=new ia(function(a,c){b.ready().then(function(){var d=b._dbInfo;d.db.transaction(function(b){b.executeSql("DELETE FROM "+d.storeName,[],function(){a()},function(a,b){c(b)})})}).catch(c)});return j(c,a),c}function R(a){var b=this,c=new ia(function(a,c){b.ready().then(function(){var d=b._dbInfo;d.db.transaction(function(b){b.executeSql("SELECT COUNT(key) as c FROM "+d.storeName,[],function(b,c){var d=c.rows.item(0).c;a(d)},function(a,b){c(b)})})}).catch(c)});return j(c,a),c}function S(a,b){var c=this,d=new ia(function(b,d){c.ready().then(function(){var e=c._dbInfo;e.db.transaction(function(c){c.executeSql("SELECT key FROM "+e.storeName+" WHERE id = ? LIMIT 1",[a+1],function(a,c){var d=c.rows.length?c.rows.item(0).key:null;b(d)},function(a,b){d(b)})})}).catch(d)});return j(d,b),d}function T(a){var b=this,c=new ia(function(a,c){b.ready().then(function(){var d=b._dbInfo;d.db.transaction(function(b){b.executeSql("SELECT key FROM "+d.storeName,[],function(b,c){for(var d=[],e=0;e<c.rows.length;e++)d.push(c.rows.item(e).key);a(d)},function(a,b){c(b)})})}).catch(c)});return j(c,a),c}function U(a){var b=this,c={};if(a)for(var d in a)c[d]=a[d];return c.keyPrefix=c.name+"/",c.storeName!==b._defaultConfig.storeName&&(c.keyPrefix+=c.storeName+"/"),b._dbInfo=c,c.serializer=Ea,ia.resolve()}function V(a){var b=this,c=b.ready().then(function(){for(var a=b._dbInfo.keyPrefix,c=localStorage.length-1;c>=0;c--){var d=localStorage.key(c);0===d.indexOf(a)&&localStorage.removeItem(d)}});return j(c,a),c}function W(a,b){var c=this;"string"!=typeof a&&(console.warn(a+" used as a key, but it is not a string."),a=String(a));var d=c.ready().then(function(){var b=c._dbInfo,d=localStorage.getItem(b.keyPrefix+a);return d&&(d=b.serializer.deserialize(d)),d});return j(d,b),d}function X(a,b){var c=this,d=c.ready().then(function(){for(var b=c._dbInfo,d=b.keyPrefix,e=d.length,f=localStorage.length,g=1,h=0;h<f;h++){var i=localStorage.key(h);if(0===i.indexOf(d)){var j=localStorage.getItem(i);if(j&&(j=b.serializer.deserialize(j)),j=a(j,i.substring(e),g++),void 0!==j)return j}}});return j(d,b),d}function Y(a,b){var c=this,d=c.ready().then(function(){var b,d=c._dbInfo;try{b=localStorage.key(a)}catch(a){b=null}return b&&(b=b.substring(d.keyPrefix.length)),b});return j(d,b),d}function Z(a){var b=this,c=b.ready().then(function(){for(var a=b._dbInfo,c=localStorage.length,d=[],e=0;e<c;e++)0===localStorage.key(e).indexOf(a.keyPrefix)&&d.push(localStorage.key(e).substring(a.keyPrefix.length));return d});return j(c,a),c}function $(a){var b=this,c=b.keys().then(function(a){return a.length});return j(c,a),c}function _(a,b){var c=this;"string"!=typeof a&&(console.warn(a+" used as a key, but it is not a string."),a=String(a));var d=c.ready().then(function(){var b=c._dbInfo;localStorage.removeItem(b.keyPrefix+a)});return j(d,b),d}function aa(a,b,c){var d=this;"string"!=typeof a&&(console.warn(a+" used as a key, but it is not a string."),a=String(a));var e=d.ready().then(function(){void 0===b&&(b=null);var c=b;return new ia(function(e,f){var g=d._dbInfo;g.serializer.serialize(b,function(b,d){if(d)f(d);else try{localStorage.setItem(g.keyPrefix+a,b),e(c)}catch(a){"QuotaExceededError"!==a.name&&"NS_ERROR_DOM_QUOTA_REACHED"!==a.name||f(a),f(a)}})})});return j(e,c),e}function ba(a,b){a[b]=function(){var c=arguments;return a.ready().then(function(){return a[b].apply(a,c)})}}function ca(){for(var a=1;a<arguments.length;a++){var b=arguments[a];if(b)for(var c in b)b.hasOwnProperty(c)&&(Na(b[c])?arguments[0][c]=b[c].slice():arguments[0][c]=b[c])}return arguments[0]}function da(a){for(var b in Ia)if(Ia.hasOwnProperty(b)&&Ia[b]===a)return!0;return!1}var ea="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},fa=e();"undefined"==typeof Promise&&"undefined"!=typeof a&&a("lie/polyfill");var ga,ha,ia=Promise,ja="local-forage-detect-blob-support",ka=Object.prototype.toString,la={_driver:"asyncStorage",_initStorage:y,iterate:A,getItem:z,setItem:B,removeItem:C,clear:D,length:E,key:F,keys:G},ma="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",na="~~local_forage_type~",oa=/^~~local_forage_type~([^~]+)~/,pa="__lfsc__:",qa=pa.length,ra="arbf",sa="blob",ta="si08",ua="ui08",va="uic8",wa="si16",xa="si32",ya="ur16",za="ui32",Aa="fl32",Ba="fl64",Ca=qa+ra.length,Da=Object.prototype.toString,Ea={serialize:J,deserialize:K,stringToBuffer:H,bufferToString:I},Fa={_driver:"webSQLStorage",_initStorage:L,iterate:N,getItem:M,setItem:O,removeItem:P,clear:Q,length:R,key:S,keys:T},Ga={_driver:"localStorageWrapper",_initStorage:U,iterate:X,getItem:W,setItem:aa,removeItem:_,clear:V,length:$,key:Y,keys:Z},Ha={},Ia={INDEXEDDB:"asyncStorage",LOCALSTORAGE:"localStorageWrapper",WEBSQL:"webSQLStorage"},Ja=[Ia.INDEXEDDB,Ia.WEBSQL,Ia.LOCALSTORAGE],Ka=["clear","getItem","iterate","key","keys","length","removeItem","setItem"],La={description:"",driver:Ja.slice(),name:"localforage",size:4980736,storeName:"keyvaluepairs",version:1},Ma={};Ma[Ia.INDEXEDDB]=f(),Ma[Ia.WEBSQL]=g(),Ma[Ia.LOCALSTORAGE]=h();var Na=Array.isArray||function(a){return"[object Array]"===Object.prototype.toString.call(a)},Oa=function(){function a(b){d(this,a),this.INDEXEDDB=Ia.INDEXEDDB,this.LOCALSTORAGE=Ia.LOCALSTORAGE,this.WEBSQL=Ia.WEBSQL,this._defaultConfig=ca({},La),this._config=ca({},this._defaultConfig,b),this._driverSet=null,this._initDriver=null,this._ready=!1,this._dbInfo=null,this._wrapLibraryMethodsWithReady(),this.setDriver(this._config.driver)}return a.prototype.config=function(a){if("object"===("undefined"==typeof a?"undefined":ea(a))){if(this._ready)return new Error("Can't call config() after localforage has been used.");for(var b in a)"storeName"===b&&(a[b]=a[b].replace(/\W/g,"_")),this._config[b]=a[b];return"driver"in a&&a.driver&&this.setDriver(this._config.driver),!0}return"string"==typeof a?this._config[a]:this._config},a.prototype.defineDriver=function(a,b,c){var d=new ia(function(b,c){try{var d=a._driver,e=new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver"),f=new Error("Custom driver name already in use: "+a._driver);if(!a._driver)return void c(e);if(da(a._driver))return void c(f);for(var g=Ka.concat("_initStorage"),h=0;h<g.length;h++){var i=g[h];if(!i||!a[i]||"function"!=typeof a[i])return void c(e)}var j=ia.resolve(!0);"_support"in a&&(j=a._support&&"function"==typeof a._support?a._support():ia.resolve(!!a._support)),j.then(function(c){Ma[d]=c,Ha[d]=a,b()},c)}catch(a){c(a)}});return k(d,b,c),d},a.prototype.driver=function(){return this._driver||null},a.prototype.getDriver=function(a,b,c){var d=this,e=ia.resolve().then(function(){if(!da(a)){if(Ha[a])return Ha[a];throw new Error("Driver not found.")}switch(a){case d.INDEXEDDB:return la;case d.LOCALSTORAGE:return Ga;case d.WEBSQL:return Fa}});return k(e,b,c),e},a.prototype.getSerializer=function(a){var b=ia.resolve(Ea);return k(b,a),b},a.prototype.ready=function(a){var b=this,c=b._driverSet.then(function(){return null===b._ready&&(b._ready=b._initDriver()),b._ready});return k(c,a,a),c},a.prototype.setDriver=function(a,b,c){function d(){f._config.driver=f.driver()}function e(a){return function(){function b(){for(;c<a.length;){var e=a[c];return c++,f._dbInfo=null,f._ready=null,f.getDriver(e).then(function(a){return f._extend(a),d(),f._ready=f._initStorage(f._config),f._ready}).catch(b)}d();var g=new Error("No available storage method found.");return f._driverSet=ia.reject(g),f._driverSet}var c=0;return b()}}var f=this;Na(a)||(a=[a]);var g=this._getSupportedDrivers(a),h=null!==this._driverSet?this._driverSet.catch(function(){return ia.resolve()}):ia.resolve();return this._driverSet=h.then(function(){var a=g[0];return f._dbInfo=null,f._ready=null,f.getDriver(a).then(function(a){f._driver=a._driver,d(),f._wrapLibraryMethodsWithReady(),f._initDriver=e(g)})}).catch(function(){d();var a=new Error("No available storage method found.");return f._driverSet=ia.reject(a),f._driverSet}),k(this._driverSet,b,c),this._driverSet},a.prototype.supports=function(a){return!!Ma[a]},a.prototype._extend=function(a){ca(this,a)},a.prototype._getSupportedDrivers=function(a){for(var b=[],c=0,d=a.length;c<d;c++){var e=a[c];this.supports(e)&&b.push(e)}return b},a.prototype._wrapLibraryMethodsWithReady=function(){for(var a=0;a<Ka.length;a++)ba(this,Ka[a])},a.prototype.createInstance=function(b){return new a(b)},a}(),Pa=new Oa;b.exports=Pa},{undefined:void 0}]},{},[1])(1)});
(function( name , factory ) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if ( typeof module === 'object' && module.exports ) {
        module.exports = factory()
    } else {
        window[name] = factory();
    }
})( 'KC' , function() {

    "use strict";

    let KC = {
        lang: 	    'zh_cn',
        joint: 	    '・',
        maxShipLv:  155,
        db: {},
        path: {
            db: '/kcdb/',
            pics: {
                ships: '/kcpic/ships/'
            }
        },
        statSpeed: {
            5: 	'低速',
            10: '高速'
        },
        getStatSpeed: function( speed ){
            return this.statSpeed[parseInt(speed)]
        },
        statRange: {
            1: 	'短',
            2: 	'中',
            3: 	'长',
            4: 	'超长'
        },
        getStatRange: function( range ){
            return this.statRange[parseInt(range)]
        },
        textRank: {
            1:	'|',
            2:	'||',
            3:	'|||',
            4:	'\\',
            5:	'\\\\',
            6:	'\\\\\\',
            7:	'》'
        }
    };





/**
 * KC Classes
 */
    // Base class
    class ItemBase {
        constructor( data ) {
            for( let i in data ){
                this[i] = data[i]
            }
        }

        getName(language){
            language = language || KC.lang
            return this.name
                    ? (this.name[language] || this.name)
                    : null
        }
        
        get _name(){
            return this.getName()
        }
    }
    // Class for Entity (Person/Group, such as CVs, illustrators)
    class Entity extends ItemBase{
        constructor(data) {
            super(data);
        }
    }
    class Equipment extends ItemBase{
        constructor(data) {
            super(data);
        }
        
        getName(small_brackets, language){
            language = language || KC.lang
            var result = ItemBase.prototype.getName.call(this, language)
                ,small_brackets_tag = small_brackets && !small_brackets === true ? small_brackets : 'small'
            return small_brackets
                    ? result.replace(/（([^（^）]+)）/g, '<'+small_brackets_tag+'>($1)</'+small_brackets_tag+'>')
                    : result
        }
        
        getType(language){
            language = language || KC.lang
            return this.type
                    ? KC.db.item_types[this.type].name[language]
                    : null
        }

        getIconId(){
            return KC.db.item_types[this.type].icon
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
                KC.db.item_types[this.type].main_attribute || 'fire'
            ]
            /*
            switch( this.type ){
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
    class Ship extends ItemBase{
        constructor(data){
            super(data);
        }
        /**
         * @param {string} joint - OPTIONAL - 连接符，如果存在后缀名，则在舰名和后缀名之间插入该字符串
         * @param {bollean} joint - OPTIONAL - 如果为 true，则添加默认连接符；false，则不添加连接符
         * @param {null} joint - OPTIONAL - 不添加连接符
         * @param {string} language - OPTIONAL - 语言代码，默认为 KCTip.lang
         * @return {string} 舰名 + 连接符（如果有） + 后缀名（如果有）
         * 快捷方式 - ship._name (默认连接符，默认语言)
         */
        getName(joint, language){
            joint = joint || ''
            language = language || KC.lang
            let suffix = this.getSuffix(language)
            return (
                    this.name[language] || this.name.ja_jp
                    ) + ( suffix ? (
                            (joint === true ? KC.joint : joint)
                            + suffix
                        ) : ''
                    )
        }
        /*	获取舰名，不包括后缀
            变量
                language	[OPTIONAL]
                    String		语言代码，默认为 KC.lang
            返回值
                String		舰名，不包括后缀
        */
        getNameNoSuffix(language){
            language = language || KC.lang
            return this.name[language] || this.name.ja_jp
        }
        /*	获取后缀名
            变量
                language	[OPTIONAL]
                    String		语言代码，默认为 KC.lang
            返回值
                String		后缀名
        */
        getSuffix(language){
            language = language || KC.lang
            return this.name.suffix
                        ? (
                            KC.db.ship_namesuffix[this.name.suffix][language]
                            || KC.db.ship_namesuffix[this.name.suffix].ja_jp
                            || ''
                        )
                        : ''
        }
        /*	获取舰种
            变量
                language	[OPTIONAL]
                    String		语言代码，默认为 KC.lang
            返回值
                String		舰种
            快捷方式
                ship._type	默认语言
        */
        getType(language){
            language = language || KC.lang
            return this.type
                    ? KC.db.ship_types[this.type].full_zh
                    : null
        }
        get _type(){
            return this.getType()
        }
        /*	获取系列数据
            返回值
                Object		系列
        */
        getSeriesData(){
            return this.series
                    ? KC.db.ship_series[this.series].ships
                    : [{
                        'id':	this.id
                    }]
        }
        /*	获取图鉴uri/path
            变量
                picId	[OPTIONAL]
                    Number		图鉴Id，默认 0
            返回值
                String		uri/path
            快捷方式
                ship._pics	获取全部图鉴，Array
        */
        getPic(picId){
            let series = this.getSeriesData()
            picId = parseInt(picId || 0)
            
            let getURI = function(i, p){
                if( typeof node != 'undefined' && node && node.path && KC.path.pics.ships )
                    return node.path.join(KC.path.pics.ships, i + '/' +p+ '.webp')
                if( KC.path.pics.ships )
                    return KC.path.pics.ships + i + '/' + p + '.png'
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
                            //break;
                        default:
                            if( series[i].illust_delete ){
                                return getURI(series[i-1].id, picId)
                            }else{
                                return getURI(this.id, picId)
                            }
                            //break;
                    }
                    //break;
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
            language = language || KC.lang
            return KC.statSpeed[parseInt(this.stat.speed)]
        }
        get _speed(){
            return this.getSpeed()
        }
        
        getRange(language){
            language = language || KC.lang
            return KC.statRange[parseInt(this.stat.range)]
        }
        get _range(){
            return this.getRange()
        }
        
        getEquipmentTypes(){
            return KC.db.ship_types[this.type].equipable.concat( ( this.additional_item_types || [] ) ).sort(function(a, b){
                return a-b
            })
        }
        
        getAttribute(attr, lvl){
            lvl = lvl || 1
            if( lvl > Ship.lvlMax )
                lvl = Ship.lvlMax
            
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
                    value = this.stat.hp
                    if( lvl > 99 ){
                        if (this.stat.hp >= 90) value = this.stat.hp + 9
                        else if (this.stat.hp >= 70) value = this.stat.hp + 8
                        else if (this.stat.hp >= 50) value = this.stat.hp + 7
                        else if (this.stat.hp >= 40) value = this.stat.hp + 6
                        else if (this.stat.hp >= 30) value = this.stat.hp + 5
                        else value = this.stat.hp + 4
                        if (value > this.stat.hp_max) value = this.stat.hp_max
                    }
                    return value
                    //break;
                case 'speed':
                    return KC.getStatSpeed( this.stat.speed )
                    //break;
                case 'range':
                    return KC.getStatRange( this.stat.range )
                    //break;
                case 'luck':
                    if( lvl > 99 )
                        return (this.stat.luck + 3)
                    return this.stat.luck
                    //break;
                case 'fuel':
                case 'ammo':
                    if( lvl > 99 )
                        return Math.floor( this.consum[attr] * 0.85 )
                    return this.consum[attr]
                    //break;
                case 'aa':
                case 'armor':
                case 'fire':
                case 'torpedo':
                    return this.stat[attr+'_max'] || this.stat[attr]
                    //break;
                default:
                    return getStatOfLvl( lvl, this.stat[attr], this.stat[attr + '_max'] )
                    //break;
            }
        }
        /*	获取关系
            变量
                relation	[OPTIONAL]
                    String		关系名
            返回值
                Object			如果没有给出 relation，返回关系对象
                String||Number	如果给出 relation，返回值，默认读取 rels 下的属性，如果不存在，读取上一个改造版本的对应关系
        */
        getRel( relation ){
            if( relation ){
                if( !this.rels[relation] && this.remodel && this.remodel.prev ){
                    let prev = KC.db.ships[this.remodel.prev]
                    while( prev ){
                        if( prev.rels && prev.rels[relation] )
                            return prev.rels[relation]
                        if( !prev.remodel || !prev.remodel.prev )
                            prev = null
                        else
                            prev = KC.db.ships[prev.remodel.prev]
                    }
                }
                return this.rels[relation]
            }else{
                return this.rels
            }
        }
        /*	获取声优
            变量
                language	[OPTIONAL]
                    String		语言代码，默认为 KC.lang
            返回值
                String		声优名
            快捷方式
                ship._cv	默认语言
        */
        getCV(language){
            let entity = this.getRel('cv')
            if( entity )
                return KC.db.entities[entity].getName(language || KC.lang)
            return
        }
        get _cv(){
            return this.getCV()
        }
        /*	获取画师
            变量
                language	[OPTIONAL]
                    String		语言代码，默认为 KC.lang
            返回值
                String		画师名
            快捷方式
                ship._illustrator	默认语言
        */
        getIllustrator(language){
            let entity = this.getRel('illustrator')
            if( entity )
                return KC.db.entities[entity].getName(language || KC.lang)
            return
        }
        get _illustrator(){
            return this.getIllustrator()
        }
    }
    Ship.lvlMax = KC.maxShipLv;





/**
 * KC Database
 */
    KC.dbLoad = function( o ){
        if( typeof o == 'string' )
            return KC.dbLoad({type: o});

        if( !o.type && !o.url )
            return null;

        return $.ajax({
            'url':		o.url || (KC.path.db + '/' + o.type + '.json'),
            'dataType':	'text',
            'success': function(data){
                let arr = [];
                if( o.beforeProcess )
                    arr = o.beforeProcess( data );
                if( typeof KC.db[o.type] == 'undefined' )
                    KC.db[o.type] = {};
                arr.forEach(function(str){
                    if( str ){
                        let doc = JSON.parse(str);
                        switch( o.type ){
                            case 'ships':
                                KC.db[o.type][doc.id] = new Ship(doc);
                                break;
                            case 'items':
                                KC.db[o.type][doc.id] = new Equipment(doc);
                                break;
                            case 'entities':
                                KC.db[o.type][doc.id] = new Entity(doc);
                                break;
                            default:
                                KC.db[o.type][doc.id] = doc;
                                break;
                        }
                    }
                });
                if( o.success )
                    o.success( data )
            },
            'complete': function(jqXHR, textStatus){
                if( o.complete )
                    o.complete( jqXHR, textStatus )
            }
        })
    };





/**
 * KC Formulas
 */
    let _ship = (ship) => {
        return ship instanceof Ship
                ? ship
                : (KC.db.ships ? KC.db.ships[ship] : {})
    };
    let _equipment = (equipment) => {
        return equipment instanceof Equipment
                ? equipment
                : (KC.db.equipments ? KC.db.equipments[equipment] : KC.db.items[equipment])
    };
    let formula = {
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
            AAFireDirector:     31,     // 高射装置
            LandingCraft:       38,     // 登陆艇
            Searchlight:		39,		// 探照灯
            LargeFlyingBoat:	45,		// 大型水上飞艇
            SearchlightLarge:	46,		// 大型探照灯
            SuparRadar:			47,		// 超大型雷达
            CarrierRecon2:		50,		// 舰侦II / 舰载侦察机II
            SeaplaneFighter:	51,		// 水战 / 水上战斗机
            AmphibiousCraft:    52,     // 特型内火艇
            LandBasedAttacker:	53,		// 陆攻 / 陆上攻击机
            Interceptor:		54		// 局战 / 局地战斗机
        },	
    // 舰种
        shipType: {
            // 航母系列
            Carriers: [
                9,		// 轻型航母
                10,		// 正规航母
                11		// 装甲航母
            ],
            // 轻巡系列
            LightCruisers: [
                2,		// 轻巡洋舰
                3,		// 重雷装巡洋舰
                21,		// 练习巡洋舰
                28		// 防空轻巡洋舰
            ],
            // 潜艇系列
            Submarines: [
                13,		// 潜艇
                14		// 航母潜艇
            ]
        },
        // 根据舰娘与其装备计算
        calcByShip: {},
        // 根据航空队机场与其飞行器配置计算
        calcByField: {},
        calc: {}
    };
    let _equipmentType = formula.equipmentType;
    // 装备类型集合
    _equipmentType.MainGuns = [
        _equipmentType.SmallCaliber,
        _equipmentType.SmallCaliberHigh,
        _equipmentType.SmallCaliberAA,
        _equipmentType.MediumCaliber,
        _equipmentType.LargeCaliber,
        _equipmentType.SuperCaliber
    ];

    _equipmentType.SmallCalibers = [
        _equipmentType.SmallCaliber,
        _equipmentType.SmallCaliberHigh,
        _equipmentType.SmallCaliberAA
    ];

    _equipmentType.MediumCalibers = [
        _equipmentType.MediumCaliber
    ];

    _equipmentType.LargeCalibers = [
        _equipmentType.LargeCaliber,
        _equipmentType.SuperCaliber
    ];

    _equipmentType.SecondaryGuns = [
        _equipmentType.SecondaryGun,
        _equipmentType.SecondaryGunHigh,
        _equipmentType.SecondaryGunAA
    ];

    _equipmentType.APShells = [
        _equipmentType.APShell
    ];

    _equipmentType.Torpedos = [
        _equipmentType.Torpedo,
        _equipmentType.SubmarineTorpedo
    ];

    _equipmentType.Seaplanes = [
        _equipmentType.ReconSeaplane,
        _equipmentType.ReconSeaplaneNight,
        _equipmentType.SeaplaneBomber,
        _equipmentType.SeaplaneFighter
    ];

    _equipmentType.Fighters = [
        _equipmentType.SeaplaneBomber,
        _equipmentType.CarrierFighter,
        _equipmentType.TorpedoBomber,
        _equipmentType.DiveBomber,
        _equipmentType.SeaplaneFighter,
        _equipmentType.LandBasedAttacker,
        _equipmentType.Interceptor/*,
        _equipmentType.CarrierRecon*/
    ];

    _equipmentType.Recons = [
        _equipmentType.ReconSeaplane,
        _equipmentType.ReconSeaplaneNight,
        _equipmentType.CarrierRecon,
        _equipmentType.CarrierRecon2,
        _equipmentType.LargeFlyingBoat
    ];

    _equipmentType.SeaplaneRecons = [
        _equipmentType.ReconSeaplane,
        _equipmentType.ReconSeaplaneNight,
        _equipmentType.LargeFlyingBoat
    ];

    _equipmentType.SeaplaneBombers = [
        _equipmentType.SeaplaneBomber,
        _equipmentType.SeaplaneFighter
    ];

    _equipmentType.CarrierFighters = [
        _equipmentType.CarrierFighter
    ];

    _equipmentType.CarrierRecons = [
        _equipmentType.CarrierRecon,
        _equipmentType.CarrierRecon2
    ];

    _equipmentType.CarrierBased = [
        _equipmentType.CarrierFighter,
        _equipmentType.TorpedoBomber,
        _equipmentType.DiveBomber,
        _equipmentType.CarrierRecon,
        _equipmentType.CarrierRecon2
    ];

    _equipmentType.LandBased = [
        _equipmentType.LandBasedAttacker,
        _equipmentType.Interceptor
    ];

    _equipmentType.TorpedoBombers = [
        _equipmentType.TorpedoBomber
    ];

    _equipmentType.DiveBombers = [
        _equipmentType.DiveBomber
    ];

    _equipmentType.Autogyros = [
        _equipmentType.Autogyro
    ];

    _equipmentType.AntiSubPatrols = [
        _equipmentType.AntiSubPatrol
    ];

    _equipmentType.Aircrafts = [];
    [].concat(_equipmentType.Seaplanes)
        .concat(_equipmentType.Recons)
        .concat(_equipmentType.CarrierBased)
        .concat(_equipmentType.Autogyros)
        .concat(_equipmentType.AntiSubPatrols)
        .concat(_equipmentType.LandBased)
        .forEach(function(v){
            if( _equipmentType.Aircrafts.indexOf(v) < 0 )
                _equipmentType.Aircrafts.push(v)
        });

    _equipmentType.Radars = [
        _equipmentType.SmallRadar,
        _equipmentType.LargeRadar,
        _equipmentType.SuparRadar
    ];

    _equipmentType.SmallRadars = [
        _equipmentType.SmallRadar
    ];

    _equipmentType.LargeRadars = [
        _equipmentType.LargeRadar,
        _equipmentType.SuparRadar
    ];

    _equipmentType.AntiSubmarines = [
        _equipmentType.DepthCharge,
        _equipmentType.Sonar,
        _equipmentType.LargeSonar
    ];

    _equipmentType.DepthCharges = [
        _equipmentType.DepthCharge
    ];

    _equipmentType.Sonars = [
        _equipmentType.Sonar,
        _equipmentType.LargeSonar
    ];

    _equipmentType.AAGuns = [
        _equipmentType.AAGun,
        _equipmentType.AAGunConcentrated
    ];

    _equipmentType.AAFireDirectors = [
        _equipmentType.AAFireDirector
    ];

    _equipmentType.Searchlights = [
        _equipmentType.Searchlight,
        _equipmentType.SearchlightLarge
    ];

    _equipmentType.LandingCrafts = [
        _equipmentType.LandingCraft,
        _equipmentType.AmphibiousCraft
    ];

    _equipmentType.AmphibiousCrafts = [
        _equipmentType.AmphibiousCraft
    ];

    // 改修收益系数
    formula.starMultiper = {
        SmallCalibers: {
            shelling: 1,
            night: 1
        },
        MediumCalibers: {
            shelling: 1,
            night: 1
        },
        LargeCalibers: {
            shelling: 1.5,
            night: 1
        },
        SecondaryGuns: {
            shelling: 1,
            night: 1
        },
        APShells: {
            shelling: 1,
            night: 1
        },
        AAFireDirectors: {
            shelling: 1,
            night: 1
        },
        Searchlights: {
            shelling: 1,
            night: 1
        },
        AAGuns: {
            shelling: 1,
            torpedo: 1.2
        },
        Torpedos: {
            torpedo: 1.2,
            night: 1
        },
        DepthCharges: {
            shelling: 0.75,
            antisub: 1
        },
        Sonars: {
            shelling: 0.75,
            antisub: 1
        },
        Radars: {
        },
        Seaplanes: {
        },
        CarrierFighters: {
            fighter: 0.2
        },
        DiveBombers: {
            fighter: 0.25
        },
        LandingCrafts: {
            shelling: 1,
            night: 1
        }
    };
    formula.getStarMultiper = function( equipmentType, type ){
        if( !formula.starMultiper._init ){
            for( let i in formula.starMultiper ){
                if( _equipmentType[i] && _equipmentType[i].forEach ){
                    _equipmentType[i].forEach(function( tid ){
                        formula.starMultiper[tid] = formula.starMultiper[i]
                    })
                }
            }
            formula.starMultiper._init = true
        }
        return formula.starMultiper[equipmentType] ? (formula.starMultiper[equipmentType][type] || 0) : 0
    };
    // 飞行器熟练度对制空战力的加成
    formula.getFighterPowerRankMultiper = ( equipment, rank ) => {
        equipment = _equipment(equipment)

        let rankInternal = []
            ,typeValue = {}

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

        let _rankInternal = rankInternal[rank]
            ,_typeValue = 0

        switch( equipment.type ){
            case _equipmentType.CarrierFighter:
            case _equipmentType.Interceptor:
            case _equipmentType.SeaplaneFighter:
                _typeValue = typeValue.CarrierFighter[rank];
                break;
            case _equipmentType.SeaplaneBomber:
                _typeValue = typeValue.SeaplaneBomber[rank]
                break;
        }

        return {
            min: Math.sqrt( _rankInternal[0] / 10 ) + _typeValue,
            max: Math.sqrt( _rankInternal[1] / 10 ) + _typeValue
        }
    };
    formula.calculate = function( type, ship, equipments_by_slot, star_by_slot, rank_by_slot, options ){
        /**
         * 计算
         * @param {string} type - 计算类型
         * @param {number || Ship} ship - 舰娘
         * @param {array} equipments_by_slot - 每格装备ID/装备object
         * @param {array} star_by_slot - 每格装备改修星级
         * @param {array} rank_by_slot - 每格装备熟练度
         * @param {object} options - 选项
         */
        if( !type || !ship )
            return 0
        
        if( !(ship instanceof Ship) )
            ship = KC.db.ships[ship]
        
        let result = 0
            ,count = {
                'main': 0,
                'secondary': 0,
                'torpedo': 0,
                'seaplane': 0,
                'apshell': 0,
                'radar': 0
            }
            ,powerTorpedo = function( options ){
                options = options || {}
                let result = 0
                if( formula.shipType.Carriers.indexOf( ship.type ) > -1 && !options.isNight ){
                    return options.returnZero ? 0 : -1
                }else{
                    result = ship.stat.torpedo_max || 0
                    ship.slot.map(function(carry, index){
                        if( equipments_by_slot[index] ){
                            result+= (equipments_by_slot[index].type == _equipmentType.TorpedoBomber && !options.isNight)
                                        ? 0
                                        : (equipments_by_slot[index].stat.torpedo || 0)

                            // 改修加成
                            if( star_by_slot[index] && !options.isNight ){
                                result+= Math.sqrt(star_by_slot[index]) * formula.getStarMultiper(
                                        equipments_by_slot[index].type,
                                        'torpedo'
                                    )
                            }
                        }
                    })
                    return result
                }
                //return (ship.stat.torpedo_max || 0)
            }
            ,value = 0
        
        equipments_by_slot = equipments_by_slot.map(function(equipment){
            if( !equipment )
                return null
            if( equipment instanceof Equipment )
                return equipment
            return KC.db.equipments ? KC.db.equipments[equipment] : KC.db.items[equipment]
        }) || []
        star_by_slot = star_by_slot || []
        rank_by_slot = rank_by_slot || []
        options = options || {}
        
        equipments_by_slot.forEach(function(equipment){
            if( !equipment )
                return
            if( _equipmentType.MainGuns.indexOf( equipment.type ) > -1 )
                count.main+= 1
            else if( _equipmentType.SecondaryGuns.indexOf( equipment.type ) > -1 )
                count.secondary+= 1
            else if( _equipmentType.Torpedos.indexOf( equipment.type ) > -1 )
                count.torpedo+= 1
            else if( _equipmentType.Seaplanes.indexOf( equipment.type ) > -1 )
                count.seaplane+= 1
            else if( _equipmentType.APShells.indexOf( equipment.type ) > -1 )
                count.apshell+= 1
            else if( _equipmentType.Radars.indexOf( equipment.type ) > -1 )
                count.radar+= 1
        })
        
        switch(type){
            // 制空战力，装备须为战斗机类型 _equipmentType.Fighters
            // 计算公式参考 http://bbs.ngacn.cc/read.php?tid=8680767
            case 'fighterPower':
                value = 0
                ship.slot.map(function(carry, index){
                    if( equipments_by_slot[index]
                        && _equipmentType.Fighters.indexOf( equipments_by_slot[index].type ) > -1
                        && carry
                    ){
                        value = Math.sqrt(carry) * (equipments_by_slot[index].stat.aa || 0)
                        if( equipments_by_slot[index].type == _equipmentType.CarrierFighter ){
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
                        }else if( _equipmentType.Recons.indexOf( equipments_by_slot[index].type ) == -1 ){
                            let max_per_slot = equipments_by_slot[index].type == _equipmentType.SeaplaneBomber
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
                //break;

            // 同时返回制空战力的上下限
            // 返回值为Array
            case 'fighterPower_v2':
                return formula.calcByShip.fighterPower_v2(ship, equipments_by_slot, star_by_slot, rank_by_slot)
                //break;
            
            // 炮击威力，除潜艇外
            case 'shelling':
            case 'shellingDamage':
                if( formula.shipType.Submarines.indexOf( ship.type ) > -1 ){
                    return '-'
                }else{
                    result = formula.calcByShip.shellingPower(ship, equipments_by_slot, star_by_slot, rank_by_slot)
                    if( result && result > -1 )
                        return Math.floor(result)// + 5
                    return '-'
                }
                //break;
            
            // 雷击威力，航母除外
            case 'torpedo':
            case 'torpedoDamage':
                result = powerTorpedo()
                if( result && result > -1 )
                    return Math.floor(result)// + 5
                return '-'
                //break;
            
            // 夜战模式 & 伤害力
            case 'nightBattle':
                if( !ship.additional_night_shelling && formula.shipType.Carriers.indexOf( ship.type ) > -1 ){
                    // 航母没有夜战
                    return '-'
                }else{
                    //console.log(count)
                    result = formula.calcByShip.shellingPower(ship, equipments_by_slot, star_by_slot, rank_by_slot, {
                        isNight: true
                    }) + powerTorpedo({isNight: true, returnZero: true})
                    // 改修加成
                    ship.slot.map(function(carry, index){
                        if( equipments_by_slot[index] ){
                            if( star_by_slot[index] ){
                                result+= Math.sqrt(star_by_slot[index]) * formula.getStarMultiper(
                                        equipments_by_slot[index].type,
                                        'night'
                                    )
                            }
                        }
                    })
                    /*
                    console.log(
                        '夜',
                        formula.calcByShip.shellingPower(ship, equipments_by_slot, star_by_slot, rank_by_slot, {isNight: true}),
                        powerTorpedo({isNight: true, returnZero: true}),
                        result
                    )
                    */
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
                //break;
            
            // 命中总和
            case 'addHit':
                ship.slot.map(function(carry, index){
                    if( equipments_by_slot[index] )
                        result+= equipments_by_slot[index].stat.hit || 0
                })
                return result>=0 ? '+'+result : result
                //break;
            
            // 装甲总和
            case 'addArmor':
                ship.slot.map(function(carry, index){
                    if( equipments_by_slot[index] )
                        result+= equipments_by_slot[index].stat.armor || 0
                })
                return result
                //break;
            
            // 回避总和
            case 'addEvasion':
                ship.slot.map(function(carry, index){
                    if( equipments_by_slot[index] )
                        result+= equipments_by_slot[index].stat.evasion || 0
                })
                return result
                //break;

            // 索敌能力
            case 'losPower':
                return formula.calcByShip.losPower(ship, equipments_by_slot, star_by_slot, rank_by_slot, options)
                //break;
            default:
                return formula.calcByShip[type](ship, equipments_by_slot, star_by_slot, rank_by_slot, options)
                //break;
        }
        
        //return '-'
    };
    // 计算快捷方式
    formula.shellingDamage = function(ship, equipments_by_slot, star_by_slot, rank_by_slot){
        return this.calculate( 'shellingDamage', ship, equipments_by_slot, star_by_slot, rank_by_slot )
    };
    formula.torpedoDamage = function(ship, equipments_by_slot, star_by_slot, rank_by_slot){
        return this.calculate( 'torpedoDamage', ship, equipments_by_slot, star_by_slot, rank_by_slot )
    };
    formula.fighterPower = function(ship, equipments_by_slot, star_by_slot, rank_by_slot){
        return this.calculate( 'fighterPower', ship, equipments_by_slot, star_by_slot, rank_by_slot )
    };
    formula.fighterPower_v2 = function(ship, equipments_by_slot, star_by_slot, rank_by_slot){
        return this.calculate( 'fighterPower_v2', ship, equipments_by_slot, star_by_slot, rank_by_slot )
    };
    formula.nightBattle = function(ship, equipments_by_slot, star_by_slot, rank_by_slot){
        return this.calculate( 'nightBattle', ship, equipments_by_slot, star_by_slot, rank_by_slot )
    };
    formula.addHit = function(ship, equipments_by_slot, star_by_slot, rank_by_slot){
        return this.calculate( 'addHit', ship, equipments_by_slot, star_by_slot, rank_by_slot )
    };
    formula.addArmor = function(ship, equipments_by_slot, star_by_slot, rank_by_slot){
        return this.calculate( 'addArmor', ship, equipments_by_slot, star_by_slot, rank_by_slot )
    };
    formula.addEvasion = function(ship, equipments_by_slot, star_by_slot, rank_by_slot){
        return this.calculate( 'addEvasion', ship, equipments_by_slot, star_by_slot, rank_by_slot )
    };
    formula.losPower = function(ship, equipments_by_slot, star_by_slot, rank_by_slot, options){
        return this.calculate( 'losPower', ship, equipments_by_slot, star_by_slot, rank_by_slot, options )
    };
    // Formulas
    formula.calc.losPower = function(data){
        // http://biikame.hatenablog.com/entry/2014/11/14/224925

        var calc = function (x) {
            if( typeof x['(Intercept)'] == 'undefined' )
                x['(Intercept)'] = 1
            x.hqLv = (Math.ceil(x.hqLv / 5) * 5);
            var x_estimate = {};
            var y_estimate = 0;
            var x_std_error = {};
            var y_std_error = 0;
            keys.forEach(function(key){
                var estimate = x[key] * estimate_coefficients[key];
                x_estimate[key] = estimate;
                y_estimate += estimate;
                x_std_error[key] = x[key] * std_error_coefficients[key];
            });
            keys.forEach(function(key){
                keys.forEach(function(key2){
                    y_std_error += x_std_error[key] * x_std_error[key2] * correlation[key][key2];
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
            'hqLv':				1
        };
        
        for( var i in data ){
            x[i] = data[i]
        }
        
        return calc(x);
        //var result = calc(x);
        //var score = result.y_estimate.toFixed(1) + ' ± ' + result.y_std_error.toFixed(1);
    };        
    formula.calc.TP = function( data ){
        /* data
        * {
        * 		ship: {
        * 			dd
        * 			cl
        * 			cav
        * 			bbv
        * 			ssv
        * 			av
        * 			lha
        * 			ao
        * 			ct
        * 		},
        * 		equipment: {
        * 			68	// landing craft
        * 			75  // canister
        * 			166  // landing craft (force)
        * 		}
        * }
        */
        data = data || {}
        var result = 0
            ,ship = data.ship || {}
            ,equipment = data.equipment || {}

        for(let i in ship){
            let count = parseInt(ship[i]) || 0
                ,multiper = 0
            switch(i){
                case 1:
                case '1':
                case 19:
                case '19':
                case 'dd':		multiper = 5;		break;
                case 2:
                case '2':
                case 'cl':		multiper = 2;		break;
                case 5:
                case '5':
                case 'cav':		multiper = 4;		break;
                case 12:
                case '12':
                case 24:
                case '24':
                case 'av':		multiper = 9.5;		break;
                case 15:
                case '15':
                case 'lha':		multiper = 12.25;	break;
                case 29:
                case '29':
                case 'ao':		multiper = 14.75;	break;
                case 8:
                case '8':
                case 'bbv':
                case 14:
                case '14':
                case 'ssv':		multiper = 7;		break;
                case 21:
                case '21':
                case 'ct':		multiper = 6;		break;
            }
            result+= multiper * count
        }

        for(let i in equipment){
            let count = parseInt(equipment[i]) || 0
                ,multiper = 0
            switch(i){
                // landing craft
                case 68:
                case '68':		multiper = 8;	break;
                // canister
                case 75:
                case '75':		multiper = 5;	break;
                // landing craft (force)
                case 166:
                case '166':		multiper = 10.5;	break;
            }
            result+= multiper * count
        }
        
        return result
    };
    formula.calc.fighterPower = function( equipment, carry, rank, star ){
        if( !equipment )
            return [0, 0]

        equipment = equipment instanceof Equipment
                    ? equipment
                    : (KC.db.equipments ? KC.db.equipments[equipment] : KC.db.items[equipment])
        carry = carry || 0
        rank = rank || 0
        star = star || 0
        
        // http://bbs.ngacn.cc/read.php?tid=8680767
        // http://ja.kancolle.wikia.com/wiki/%E8%89%A6%E8%BC%89%E6%A9%9F%E7%86%9F%E7%B7%B4%E5%BA%A6
    
        let results = [0, 0]
        
        if( _equipmentType.Fighters.indexOf( equipment.type ) > -1
            && carry
        ){
            // Math.floor(Math.sqrt(carry) * (equipment.stat.aa || 0) + Math.sqrt( rankInternal / 10 ) + typeValue)
            /*if( star )
                console.log( equipment._name, '★+' + star, star * formula.getStarMultiper( equipment.type, 'fighter' ) )
            */
            let statAA = (equipment.stat.aa || 0)
                            + ( equipment.type == _equipmentType.Interceptor ? equipment.stat.evasion * 1.5 : 0 )
                            + (star * formula.getStarMultiper( equipment.type, 'fighter' ))
                ,base = statAA * Math.sqrt(carry)
                ,rankBonus = formula.getFighterPowerRankMultiper( equipment, rank )

            results[0]+= Math.floor(base + rankBonus.min)
            results[1]+= Math.floor(base + rankBonus.max)
        }

        return results
    };
    formula.calc.fighterPowerAA = function( equipment, carry, rank, star ){
        if( !equipment )
            return [0, 0]

        equipment = _equipment(equipment)
        carry = carry || 0
        rank = rank || 0
        star = star || 0
        
        // http://wikiwiki.jp/kancolle/?%B4%F0%C3%CF%B9%D2%B6%F5%C2%E2#AirSupremacy
    
        let results = [0, 0]
        
        if( _equipmentType.Fighters.indexOf( equipment.type ) > -1
            && carry
        ){
            // Math.floor(Math.sqrt(carry) * (equipment.stat.aa || 0) + Math.sqrt( rankInternal / 10 ) + typeValue)
            /*if( star )
                console.log( equipment._name, '★+' + star, star * formula.getStarMultiper( equipment.type, 'fighter' ) )
            */
            let statAA = (equipment.stat.aa || 0)
                            + ( equipment.type == _equipmentType.Interceptor ? equipment.stat.evasion : 0 )
                            + ( equipment.type == _equipmentType.Interceptor ? equipment.stat.hit * 2 : 0 )
                            + (star * formula.getStarMultiper( equipment.type, 'fighter' ))
                ,base = statAA * Math.sqrt(carry)
                ,rankBonus = formula.getFighterPowerRankMultiper( equipment, rank )

            results[0]+= Math.floor(base + rankBonus.min)
            results[1]+= Math.floor(base + rankBonus.max)
        }

        return results
    };
    // Calculate by Ship
    formula.calcByShip.shellingPower = function(ship, equipments_by_slot, star_by_slot, rank_by_slot, options){
        options = options || {}

        let result = 0
            ,isCV = false
        
        // 检查是否为航母攻击模式
        if( formula.shipType.Carriers.indexOf( ship.type ) > -1 ){
            isCV = true
        }else{
            //equipments_by_slot.forEach(function(equipment){
            //	if( equipment && !isCV && _equipmentType.CarrierBased.indexOf( equipment.type ) > -1 )
            //		isCV = true
            //})
            equipments_by_slot.some(function(equipment){
                if( equipment && !isCV && _equipmentType.CarrierBased.indexOf( equipment.type ) > -1 ){
                    isCV = true
                    return true
                }
            })
        }
        
        if( isCV && !options.isNight ){
            // 航母攻击模式
            let torpedoDamage = 0
                ,bombDamage = 0
            ship.slot.map(function(carry, index){
                if( equipments_by_slot[index] ){
                    result+= (equipments_by_slot[index].stat.fire * 1.5) || 0
                    
                    if( equipments_by_slot[index].type == _equipmentType.TorpedoBomber )
                        torpedoDamage+= equipments_by_slot[index].stat.torpedo || 0
                        
                    //if( equipments_by_slot[index].type == _equipmentType.DiveBomber )
                    bombDamage+= equipments_by_slot[index].stat.bomb || 0
                    
                    if( _equipmentType.SecondaryGuns.indexOf( equipments_by_slot[index].type ) > -1 )
                        result+= Math.sqrt((star_by_slot[index] || 0) * 1.5)
                }
            })
            if( !torpedoDamage && !bombDamage )
                return -1
            else
                result+= Math.floor(( Math.floor(bombDamage * 1.3) + torpedoDamage + ship.stat.fire_max ) * 1.5) + 50
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
                    if( formula.shipType.LightCruisers.indexOf( ship.type ) > -1 ){
                        // 4	14cm单装炮
                        // 65	15.2cm连装炮
                        // 119	14cm连装炮
                        // 139	15.2cm连装炮改
                        if( equipments_by_slot[index].id == 4 )
                            CLGunNavalNumber+= 1
                        if( equipments_by_slot[index].id == 119 || equipments_by_slot[index].id == 65 || equipments_by_slot[index].id == 139 )
                            CLGunTwinNumber+= 1
                    }
                    
                    // 改修加成
                    if( star_by_slot[index] && !options.isNight ){
                        /*
                        console.log(
                            equipments_by_slot[index]._name,
                            '★+' + star_by_slot[index],
                            formula.getStarMultiper(
                                equipments_by_slot[index].type,
                                options.isNight ? 'night' : 'shelling'
                            ),
                            Math.sqrt(star_by_slot[index]) * formula.getStarMultiper(
                                equipments_by_slot[index].type,
                                options.isNight ? 'night' : 'shelling'
                            ),
                            options.isNight ? '夜战' : '昼战'
                        )
                        */
                        result+= Math.sqrt(star_by_slot[index]) * formula.getStarMultiper(
                                equipments_by_slot[index].type,
                                'shelling'
                            )
                    }
                }
            })
            return result + 2 * Math.sqrt(CLGunTwinNumber) + Math.sqrt(CLGunNavalNumber)
        }
        //return (ship.stat.fire_max || 0)
    };
    formula.calcByShip.fighterPower_v2 = function(ship, equipments_by_slot, star_by_slot, rank_by_slot){
        let results = [0, 0]
    
        ship.slot.map(function(carry, index){
            let r = formula.calc.fighterPower( equipments_by_slot[index], carry, rank_by_slot[index] || 0, star_by_slot[index] || 0 )
            results[0]+= r[0]
            results[1]+= r[1]
        })
        return results
    };
    formula.calcByShip.losPower = function(ship, equipments_by_slot, star_by_slot, rank_by_slot, options){
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
            'hqLv':				options.hqLv
        };
        
        equipments_by_slot.forEach(function(equipment){
            if( equipment ){
                for(let i in x){
                    if( _equipmentType[i]
                        && _equipmentType[i].push
                        && _equipmentType[i].indexOf(equipment.type) > -1
                    )
                        x[i]+= equipment.stat.los
                }
            }
        })
        
        return formula.calc.losPower(x);
    };        
    formula.calcByShip.TP = function(ship, equipments_by_slot, star_by_slot, rank_by_slot, options){
        var data = {
            ship: {},
            equipment: {}
        }
        data.ship[ship.type] = 1
        equipments_by_slot.forEach(function(equipment){
            if( equipment ){
                if( !data.equipment[equipment.id] )
                    data.equipment[equipment.id] = 0
                data.equipment[equipment.id]++
            }
        })
        //console.log(data)
        return formula.calc.TP(data)
    };
    formula.calcByField.fighterPowerAA = ( data ) => {
        /*
         * data {
         *      [
         *          equipment: equipmentId || Equipment,
         *          star: Number,
         *          rank: Number,
         *          [carry]: Number
         *      ]
         * }
         */
        let result = [0, 0]
            ,reconBonus = 1;
        
        function getReconBonus( bonus ){
            reconBonus = Math.max( bonus, reconBonus )
            return reconBonus
        }

        data.forEach( (d) => {
            let equipment = _equipment( d[0] || d.equipment || d.equipmentId )
                ,star = d[1] || d.star || 0
                ,rank = d[2] || d.rank || 0
                ,carry = d[3] || d.carry || 0
                ,_r = formula.calc.fighterPowerAA( equipment, carry, rank, star )

            if( !carry ){
                if( formula.equipmentType.Recons.indexOf( equipment.type ) > -1 )
                    carry = 4
                else
                    carry = 18
            }
            result[0]+= _r[0]
            result[1]+= _r[1]

            // 计算侦察机加成
            switch( equipment.type ){
                case _equipmentType.CarrierRecon:
                case _equipmentType.CarrierRecon2:
                    if( equipment.stat.los <= 7 ){
                        getReconBonus(1.2)
                    }else if( equipment.stat.los >= 9 ){
                        getReconBonus(1.3)
                    }else{
                        getReconBonus(1.25)
                    }
                    break;
                case _equipmentType.ReconSeaplane:
                case _equipmentType.ReconSeaplaneNight:
                case _equipmentType.LargeFlyingBoat:
                    if( equipment.stat.los <= 7 ){
                        getReconBonus(1.1)
                    }else if( equipment.stat.los >= 9 ){
                        getReconBonus(1.16)
                    }else{
                        getReconBonus(1.13)
                    }
                    break;
            }
        } );

        result[0] = result[0] * reconBonus
        result[1] = result[1] * reconBonus

        return result;
    };




/**
 * ES/JS Functions/Features
 */
    // Array.prototype.indexOf()
        // Production steps of ECMA-262, Edition 5, 15.4.4.14
        // Reference: http://es5.github.io/#x15.4.4.14
        if (!Array.prototype.indexOf) {
            Array.prototype.indexOf = function(searchElement, fromIndex) {

                var k;

                // 1. Let o be the result of calling ToObject passing
                //    the this value as the argument.
                if (this == null) {
                    throw new TypeError('"this" is null or not defined');
                }

                var o = Object(this);

                // 2. Let lenValue be the result of calling the Get
                //    internal method of o with the argument "length".
                // 3. Let len be ToUint32(lenValue).
                var len = o.length >>> 0;

                // 4. If len is 0, return -1.
                if (len === 0) {
                    return -1;
                }

                // 5. If argument fromIndex was passed let n be
                //    ToInteger(fromIndex); else let n be 0.
                var n = +fromIndex || 0;

                if (Math.abs(n) === Infinity) {
                    n = 0;
                }

                // 6. If n >= len, return -1.
                if (n >= len) {
                    return -1;
                }

                // 7. If n >= 0, then Let k be n.
                // 8. Else, n<0, Let k be len - abs(n).
                //    If k is less than 0, then let k be 0.
                k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

                // 9. Repeat, while k < len
                while (k < len) {
                    // a. Let Pk be ToString(k).
                    //   This is implicit for LHS operands of the in operator
                    // b. Let kPresent be the result of calling the
                    //    HasProperty internal method of o with argument Pk.
                    //   This step can be combined with c
                    // c. If kPresent is true, then
                    //    i.  Let elementK be the result of calling the Get
                    //        internal method of o with the argument ToString(k).
                    //   ii.  Let same be the result of applying the
                    //        Strict Equality Comparison Algorithm to
                    //        searchElement and elementK.
                    //  iii.  If same is true, return k.
                    if (k in o && o[k] === searchElement) {
                        return k;
                    }
                    k++;
                }
                return -1;
            };
        }





/**
 * 
 */
    KC.Entity = Entity;
    KC.Equipment = Equipment;
    KC.Ship = Ship;
    KC.formula = formula;

    return KC;
});
/* global global */
/* global nw */
/* global vsprintf */
/* global dev_output_form */
/* global Lockr */
/* global LZString */
/* global Nedb */

// Global Variables
	const Ship = KC.Ship
		,Equipment = KC.Equipment
		,Entity = KC.Entity
		,Formula = KC.formula

	_g.animate_duration_delay = 320;
	_g.inputIndex = 0;
	_g.lang = KC.lang;
	_g.joint = KC.joint;
	_g.defaultHqLv = 90;
	_g.shipMaxLv = Ship.lvlMax
	_g.resourcesTable = ['fuel', 'ammo', 'steel', 'bauxite']
	
	// check wheather connect online
		//_g.isOnline = false
	
	// check for NW.js app
		_g.isNWjs = (typeof node != 'undefined' || typeof nw != 'undefined');
	
	// Web App for Android/iOS
		_g.isWebApp = (navigator.standalone || _g.uriSearch('utm_source') == 'web_app_manifest');
	
	// check for Windows Universal App
		_g.isUWP = (typeof Windows !== 'undefined' &&
				typeof Windows.UI !== 'undefined' &&
				typeof Windows.UI.Notifications !== 'undefined')
	
	// check for client/app enviroment, eg. NW.js, Native Web App, Universal Windows App
		_g.isClient = (_g.isNWjs || _g.isWebApp || _g.isUWP);
	
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
			clearTimeout(_g.delay_updateDefaultHqLv)
			_g.delay_updateDefaultHqLv = setTimeout(function(){
				$body.trigger('update_defaultHqLv', [val])
				clearTimeout(_g.delay_updateDefaultHqLv)
				_g.delay_updateDefaultHqLv = null
			}, 200)
		}
	};

	_g.statSpeed = KC.statSpeed;
	_g.statRange = KC.statRange;
	_g.textRank = KC.textRank;
	_g.getStatSpeed = KC.getStatSpeed;
	_g.getStatRange = KC.getStatRange;
	
	_g.getSize = function( bytes, target ){
		target = target.toUpperCase()
		
		if( target[target.length-1] == 'B' )
			target = target.substr(0, target.length-1)
		
		function _r(r){
			return Math.floor( r * 100 ) / 100
		}

		bytes = bytes / 1024;
		if( target == 'K' ) return _r(bytes) + 'KB';
		bytes = bytes / 1024;
		if( target == 'M' ) return _r(bytes) + 'MB';
		bytes = bytes / 1024;
		if( target == 'G' ) return _r(bytes) + 'GB';
		bytes = bytes / 1024;
		if( target == 'T' ) return _r(bytes) + 'TB';
	};



// locale object
	var _l = {};



// String
	String.prototype.printf = function() {
		if( typeof vsprintf != 'undefined' )
			return vsprintf(this, Array.prototype.slice.call(arguments));
		return this;
	};



// main badge
	_g.badge = function( cont, t ){
		if( typeof t == 'string' )
			t = t.toLowerCase()
		switch(t){
			case 'error':
				return _g.badgeError(cont)
				break;
			default:
				return _g.badgeMsg(cont)
				break;
		}
	};
	_g.badgeMsg = function( cont ){
		_frame.dom.layout.attr('data-msgbadge', cont)
		clearTimeout( this.timeout_badgeMsg_hiding )
		this.timeout_badgeMsg_hiding = setTimeout(function(){
			_frame.dom.layout.removeAttr('data-msgbadge')
			delete _g.timeout_badgeMsg_hiding
		}, 3000)
	};
	_g.badgeError = function( cont ){
		_frame.dom.layout.attr('data-errorbadge', cont)
		clearTimeout( this.timeout_badgeError_hiding )
		this.timeout_badgeError_hiding = setTimeout(function(){
			_frame.dom.layout.removeAttr('data-errorbadge')
			delete _g.timeout_badgeError_hiding
		}, 3000)
	};



// main
	_g.pageChangeBefore = function(){
		_frame.dom.mobilemenu.prop('checked', false)
		_frame.modal.hide()
	}
	_g.title = function(t){
		if( !t ){
			let f = document.title.split(' - ')
			if( f.length == 1 )
				return f[0]
			f.pop()
			return f.join(' - ')
		}
		if( _frame.dom.title )
			_frame.dom.title.text(t === true ? '是谁呼叫舰队' : t)
		return t
	}



// search index
	_g.index = {
		ships: {},
		equipments: {}
	};
	_g.buildIndex = function(){
		let shipnamesuffix = {}

		function _build( datalist, n ){
			for(let i in datalist){
				let ids = (n == 'ships')
						? datalist[i].getSeriesData().map(function(o){
									return o.id
								})
						: [datalist[i].id]
				if( ids.push && ids.length == 0 )
					ids = [datalist[i].id]
				for(let j in datalist[i].name){
					if( datalist[i].name[j] ){
						let name = datalist[i].name[j]
						if( j != 'suffix' ){
							let _n = name.toLowerCase()
							if( !_g.index[n][_n] )
								_g.index[n][_n] = []
							ids.forEach(function(thisId){
								if( !_g.index[n][_n].some(function(thisObj){
									return thisObj.id == thisId
								}) ){
									_g.index[n][_n].push( datalist[thisId] )
								}
							})
						}else if( n == 'ships' ){
							if( !shipnamesuffix[ name ] )
								shipnamesuffix[ name ] = []
							shipnamesuffix[ name ].push( datalist[i] )
						}
					}
				}
			}
		}
		_build( _g.data.ships, 'ships' )
		_build( _g.data.items, 'equipments' )

		// 舰名后缀
		for( let i in _g.data.ship_namesuffix ){
			let suffix = _g.data.ship_namesuffix[i]
			let keys = [
				'ja_jp',
				'ja_romaji',
				'zh_cn'
			]
			keys.forEach( function(key){
				_g.index.ships[ suffix[key] ] = shipnamesuffix[ suffix.id ]
			} )
		}
	};
	_g.search = function( q, t ){
		t = _g.index[t]
		let r = [], e = []
		if( !t || !q )
			return r
		q = q.trim().toLowerCase()
		function _concat(a){
			r = r.concat(
				a.filter(function(v){
					if( e.indexOf( t + v.id ) > -1 )
						return false
					e.push( t + v.id )
					return true
					//return (r.indexOf(v) < 0)
				})
				/*
				.sort(function(a,b){
					//return (a._name || a.name[_g.lang]) - (b._name || b.name[_g.lang])
					return (b.name.suffix||0) - (a.name.suffix||0)
				})
				*/
			)
		}
		if( t[q] )
			_concat(t[q])
		for( let i in t ){
			if( q !== i && i.indexOf(q) > -1 ){
				_concat(t[i])
			}
		}
		return r
	};
	_g.searchTest = function( q, t ){
		let r = []
		q = _g.search( q, t )
		for( let i in q ){
			r.push(q[i]._name || q[i].name[_g.lang])
		}
		return r
	};

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
				'location':	'http://fleet.moe/ga.html',
				'page': 	'/' + path,
				'title': 	title || _frame.app_main.title
			});
		*/

		title = _frame.app_main.title

		_frame.dom.hiddenIframe[0].contentWindow.location.replace(node.url.format(
						'http://fleet.moe/ga.html' + path
						+ ( title
							? ('&title=' + encodeURIComponent(title))
							: ''
						)
					))
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
	version: 4,
	
	max_fleets: 4,
	max_ships_per_fleet: 6,
	max_equipments_per_ship: 5,

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
				while( i < max_fleets ){
					data_fleet = data['f' + (i+1)]
					result[i] = []
					if( data_fleet ){
						j=0
						//while( data_ship = data_fleet['s' + (j+1)] ){
						while( j < max_ships_per_fleet ){
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
									while( k < max_equipments_per_ship ){
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
				
				var data_airfields = data['fField']
				if( data_airfields ){
					result[4] = []
					j=0
					while( j < 3 ){
						result[4][j] = []
						var data_field = data_airfields['f' + (j+1)] || {}
						k = 0;
						while( k < 4 ){
							result[4][j][k] = []
							var data_aircraft = data_field['i' + (k+1)]
							if( data_aircraft ){
								result[4][j][k][0] = data_aircraft.id
								result[4][j][k][1] = data_aircraft.rp
								result[4][j][k][2] = data_aircraft.rf
							}
							k++;
						}
						j++;
					}
				}
				break;

			case 4:
				result = []
				i=0
				//while( data_fleet = data['f' + (i+1)] ){
				while( i < max_fleets ){
					data_fleet = data['f' + (i+1)]
					result[i] = []
					if( data_fleet ){
						j=0
						//while( data_ship = data_fleet['s' + (j+1)] ){
						while( j < max_ships_per_fleet ){
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
									while( k < max_equipments_per_ship ){
										data_item = data_ship.items['i' + (k+1)]
										if( data_item && data_item.id ){
											result[i][j][2][k] = data_item.id
											result[i][j][3][k] = data_item.rf || null
											result[i][j][4][k] = data_item.mas || null
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
				
				var data_airfields = data['fField']
				if( data_airfields ){
					result[4] = []
					j=0
					while( j < 3 ){
						result[4][j] = []
						var data_field = data_airfields['f' + (j+1)] || {}
						k = 0;
						while( k < 4 ){
							result[4][j][k] = []
							var data_aircraft = data_field['i' + (k+1)]
							if( data_aircraft ){
								result[4][j][k][0] = data_aircraft.id
								result[4][j][k][1] = data_aircraft.mas
								result[4][j][k][2] = data_aircraft.rf
							}
							k++;
						}
						j++;
					}
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
			,max_fleets = this.max_fleets
		
		switch(version){
			case 3:
				result = {
					'version': 3
				}
				data.forEach(function(data_fleet, i){
					if( data_fleet ){
						if( i < max_fleets ){
							result['f' + (i+1)] = {}
							data_fleet.forEach(function(data_ship, j){
								if( data_ship && data_ship[0] ){
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
						}else if( i == 4 ){
							result['fField'] = {}
							data_fleet.forEach(function(data_field, j){
								if( data_field ){
									result['fField']['f' + (j+1)] = {}
									data_field.forEach(function(data_aircraft, k){
										if( data_aircraft && data_aircraft[0] ){
											result['fField']['f' + (j+1)]['i' + (k+1)] = {
												'id': 	data_aircraft[0],
												'rp': 	data_aircraft[1],
												'rf': 	data_aircraft[2]
											}
										}
									})
								}
							})
						}
					}
				})
				break;

			case 4:
				result = {
					'version': 4
				}
				data.forEach(function(data_fleet, i){
					if( data_fleet ){
						if( i < max_fleets ){
							result['f' + (i+1)] = {}
							data_fleet.forEach(function(data_ship, j){
								if( data_ship && data_ship[0] ){
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
												result['f' + (i+1)]['s' + (j+1)].items['i' + (k+1)].mas
													= parseInt(data_ship[4][k]) || 0
										}
									})
								}
							})
						}else if( i == 4 ){
							result['fField'] = {}
							data_fleet.forEach(function(data_field, j){
								if( data_field ){
									result['fField']['f' + (j+1)] = {}
									data_field.forEach(function(data_aircraft, k){
										if( data_aircraft && data_aircraft[0] ){
											result['fField']['f' + (j+1)]['i' + (k+1)] = {
												'id': 	data_aircraft[0],
												'mas': 	data_aircraft[1],
												'rf': 	data_aircraft[2]
											}
										}
									})
								}
							})
						}
					}
				})
				break;
		}
		
		return result
	}
}
var canvas = {
	isSupport:	window.CanvasRenderingContext2D ? true : false
};
// https://github.com/flozz/StackBlur/
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}/*g.StackBlur = f()*/g.canvas.blur = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
    StackBlur - a fast almost Gaussian Blur For Canvas

    Version:     0.5
    Author:        Mario Klingemann
    Contact:     mario@quasimondo.com
    Website:    http://www.quasimondo.com/StackBlurForCanvas
    Twitter:    @quasimondo

    In case you find this class useful - especially in commercial projects -
    I am not totally unhappy for a small donation to my PayPal account
    mario@quasimondo.de

    Or support me on flattr:
    https://flattr.com/thing/72791/StackBlur-a-fast-almost-Gaussian-Blur-Effect-for-CanvasJavascript

    Copyright (c) 2010 Mario Klingemann

    Permission is hereby granted, free of charge, to any person
    obtaining a copy of this software and associated documentation
    files (the "Software"), to deal in the Software without
    restriction, including without limitation the rights to use,
    copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the
    Software is furnished to do so, subject to the following
    conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
    OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
    HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
    WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
    FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
    OTHER DEALINGS IN THE SOFTWARE.
    */


var mul_table = [
    512,512,456,512,328,456,335,512,405,328,271,456,388,335,292,512,
    454,405,364,328,298,271,496,456,420,388,360,335,312,292,273,512,
    482,454,428,405,383,364,345,328,312,298,284,271,259,496,475,456,
    437,420,404,388,374,360,347,335,323,312,302,292,282,273,265,512,
    497,482,468,454,441,428,417,405,394,383,373,364,354,345,337,328,
    320,312,305,298,291,284,278,271,265,259,507,496,485,475,465,456,
    446,437,428,420,412,404,396,388,381,374,367,360,354,347,341,335,
    329,323,318,312,307,302,297,292,287,282,278,273,269,265,261,512,
    505,497,489,482,475,468,461,454,447,441,435,428,422,417,411,405,
    399,394,389,383,378,373,368,364,359,354,350,345,341,337,332,328,
    324,320,316,312,309,305,301,298,294,291,287,284,281,278,274,271,
    268,265,262,259,257,507,501,496,491,485,480,475,470,465,460,456,
    451,446,442,437,433,428,424,420,416,412,408,404,400,396,392,388,
    385,381,377,374,370,367,363,360,357,354,350,347,344,341,338,335,
    332,329,326,323,320,318,315,312,310,307,304,302,299,297,294,292,
    289,287,285,282,280,278,275,273,271,269,267,265,263,261,259];


var shg_table = [
    9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17,
    17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19,
    19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20,
    20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21,
    21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
    21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22,
    22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22,
    22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23,
    23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
    23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
    23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
    23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
    24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
    24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
    24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
    24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24 ];


function processImage(img, canvas, radius, blurAlphaChannel)
{
    if (typeof(img) == 'string') {
        var img = document.getElementById(img);
    }
    else if (!img instanceof HTMLImageElement) {
        return;
    }
    var w = img.naturalWidth;
    var h = img.naturalHeight;

    if (typeof(canvas) == 'string') {
        var canvas = document.getElementById(canvas);
    }
    else if (!canvas instanceof HTMLCanvasElement) {
        return;
    }

    canvas.style.width  = w + 'px';
    canvas.style.height = h + 'px';
    canvas.width = w;
    canvas.height = h;

    var context = canvas.getContext('2d');
    context.clearRect(0, 0, w, h);
    context.drawImage(img, 0, 0);

    if (isNaN(radius) || radius < 1) return;

    if (blurAlphaChannel)
        processCanvasRGBA(canvas, 0, 0, w, h, radius);
    else
        processCanvasRGB(canvas, 0, 0, w, h, radius);
}

function getImageDataFromCanvas(canvas, top_x, top_y, width, height)
{
    if (typeof(canvas) == 'string')
        var canvas  = document.getElementById(canvas);
    else if (!canvas instanceof HTMLCanvasElement)
        return;

    var context = canvas.getContext('2d');
    var imageData;

    try {
        try {
            imageData = context.getImageData(top_x, top_y, width, height);
        } catch(e) {

            // NOTE: this part is supposedly only needed if you want to work with local files
            // so it might be okay to remove the whole try/catch block and just use
            // imageData = context.getImageData(top_x, top_y, width, height);
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
                imageData = context.getImageData(top_x, top_y, width, height);
            } catch(e) {
                alert("Cannot access local image");
                throw new Error("unable to access local image data: " + e);
                return;
            }
        }
    } catch(e) {
        alert("Cannot access image");
        throw new Error("unable to access image data: " + e);
    }

    return imageData;
}

function processCanvasRGBA(canvas, top_x, top_y, width, height, radius)
{
    if (isNaN(radius) || radius < 1) return;
    radius |= 0;

    var imageData = getImageDataFromCanvas(canvas, top_x, top_y, width, height);

    imageData = processImageDataRGBA(imageData, top_x, top_y, width, height, radius);

    canvas.getContext('2d').putImageData(imageData, top_x, top_y);
}

function processImageDataRGBA(imageData, top_x, top_y, width, height, radius)
{
    var pixels = imageData.data;

    var x, y, i, p, yp, yi, yw, r_sum, g_sum, b_sum, a_sum,
        r_out_sum, g_out_sum, b_out_sum, a_out_sum,
        r_in_sum, g_in_sum, b_in_sum, a_in_sum,
        pr, pg, pb, pa, rbs;

    var div = radius + radius + 1;
    var w4 = width << 2;
    var widthMinus1  = width - 1;
    var heightMinus1 = height - 1;
    var radiusPlus1  = radius + 1;
    var sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;

    var stackStart = new BlurStack();
    var stack = stackStart;
    for (i = 1; i < div; i++)
    {
        stack = stack.next = new BlurStack();
        if (i == radiusPlus1) var stackEnd = stack;
    }
    stack.next = stackStart;
    var stackIn = null;
    var stackOut = null;

    yw = yi = 0;

    var mul_sum = mul_table[radius];
    var shg_sum = shg_table[radius];

    for (y = 0; y < height; y++)
    {
        r_in_sum = g_in_sum = b_in_sum = a_in_sum = r_sum = g_sum = b_sum = a_sum = 0;

        r_out_sum = radiusPlus1 * (pr = pixels[yi]);
        g_out_sum = radiusPlus1 * (pg = pixels[yi+1]);
        b_out_sum = radiusPlus1 * (pb = pixels[yi+2]);
        a_out_sum = radiusPlus1 * (pa = pixels[yi+3]);

        r_sum += sumFactor * pr;
        g_sum += sumFactor * pg;
        b_sum += sumFactor * pb;
        a_sum += sumFactor * pa;

        stack = stackStart;

        for (i = 0; i < radiusPlus1; i++)
        {
            stack.r = pr;
            stack.g = pg;
            stack.b = pb;
            stack.a = pa;
            stack = stack.next;
        }

        for (i = 1; i < radiusPlus1; i++)
        {
            p = yi + ((widthMinus1 < i ? widthMinus1 : i) << 2);
            r_sum += (stack.r = (pr = pixels[p])) * (rbs = radiusPlus1 - i);
            g_sum += (stack.g = (pg = pixels[p+1])) * rbs;
            b_sum += (stack.b = (pb = pixels[p+2])) * rbs;
            a_sum += (stack.a = (pa = pixels[p+3])) * rbs;

            r_in_sum += pr;
            g_in_sum += pg;
            b_in_sum += pb;
            a_in_sum += pa;

            stack = stack.next;
        }


        stackIn = stackStart;
        stackOut = stackEnd;
        for (x = 0; x < width; x++)
        {
            pixels[yi+3] = pa = (a_sum * mul_sum) >> shg_sum;
            if (pa != 0)
            {
                pa = 255 / pa;
                pixels[yi]   = ((r_sum * mul_sum) >> shg_sum) * pa;
                pixels[yi+1] = ((g_sum * mul_sum) >> shg_sum) * pa;
                pixels[yi+2] = ((b_sum * mul_sum) >> shg_sum) * pa;
            } else {
                pixels[yi] = pixels[yi+1] = pixels[yi+2] = 0;
            }

            r_sum -= r_out_sum;
            g_sum -= g_out_sum;
            b_sum -= b_out_sum;
            a_sum -= a_out_sum;

            r_out_sum -= stackIn.r;
            g_out_sum -= stackIn.g;
            b_out_sum -= stackIn.b;
            a_out_sum -= stackIn.a;

            p =  (yw + ((p = x + radius + 1) < widthMinus1 ? p : widthMinus1)) << 2;

            r_in_sum += (stackIn.r = pixels[p]);
            g_in_sum += (stackIn.g = pixels[p+1]);
            b_in_sum += (stackIn.b = pixels[p+2]);
            a_in_sum += (stackIn.a = pixels[p+3]);

            r_sum += r_in_sum;
            g_sum += g_in_sum;
            b_sum += b_in_sum;
            a_sum += a_in_sum;

            stackIn = stackIn.next;

            r_out_sum += (pr = stackOut.r);
            g_out_sum += (pg = stackOut.g);
            b_out_sum += (pb = stackOut.b);
            a_out_sum += (pa = stackOut.a);

            r_in_sum -= pr;
            g_in_sum -= pg;
            b_in_sum -= pb;
            a_in_sum -= pa;

            stackOut = stackOut.next;

            yi += 4;
        }
        yw += width;
    }


    for (x = 0; x < width; x++)
    {
        g_in_sum = b_in_sum = a_in_sum = r_in_sum = g_sum = b_sum = a_sum = r_sum = 0;

        yi = x << 2;
        r_out_sum = radiusPlus1 * (pr = pixels[yi]);
        g_out_sum = radiusPlus1 * (pg = pixels[yi+1]);
        b_out_sum = radiusPlus1 * (pb = pixels[yi+2]);
        a_out_sum = radiusPlus1 * (pa = pixels[yi+3]);

        r_sum += sumFactor * pr;
        g_sum += sumFactor * pg;
        b_sum += sumFactor * pb;
        a_sum += sumFactor * pa;

        stack = stackStart;

        for (i = 0; i < radiusPlus1; i++)
        {
            stack.r = pr;
            stack.g = pg;
            stack.b = pb;
            stack.a = pa;
            stack = stack.next;
        }

        yp = width;

        for (i = 1; i <= radius; i++)
        {
            yi = (yp + x) << 2;

            r_sum += (stack.r = (pr = pixels[yi])) * (rbs = radiusPlus1 - i);
            g_sum += (stack.g = (pg = pixels[yi+1])) * rbs;
            b_sum += (stack.b = (pb = pixels[yi+2])) * rbs;
            a_sum += (stack.a = (pa = pixels[yi+3])) * rbs;

            r_in_sum += pr;
            g_in_sum += pg;
            b_in_sum += pb;
            a_in_sum += pa;

            stack = stack.next;

            if(i < heightMinus1)
            {
                yp += width;
            }
        }

        yi = x;
        stackIn = stackStart;
        stackOut = stackEnd;
        for (y = 0; y < height; y++)
        {
            p = yi << 2;
            pixels[p+3] = pa = (a_sum * mul_sum) >> shg_sum;
            if (pa > 0)
            {
                pa = 255 / pa;
                pixels[p]   = ((r_sum * mul_sum) >> shg_sum) * pa;
                pixels[p+1] = ((g_sum * mul_sum) >> shg_sum) * pa;
                pixels[p+2] = ((b_sum * mul_sum) >> shg_sum) * pa;
            } else {
                pixels[p] = pixels[p+1] = pixels[p+2] = 0;
            }

            r_sum -= r_out_sum;
            g_sum -= g_out_sum;
            b_sum -= b_out_sum;
            a_sum -= a_out_sum;

            r_out_sum -= stackIn.r;
            g_out_sum -= stackIn.g;
            b_out_sum -= stackIn.b;
            a_out_sum -= stackIn.a;

            p = (x + (((p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width)) << 2;

            r_sum += (r_in_sum += (stackIn.r = pixels[p]));
            g_sum += (g_in_sum += (stackIn.g = pixels[p+1]));
            b_sum += (b_in_sum += (stackIn.b = pixels[p+2]));
            a_sum += (a_in_sum += (stackIn.a = pixels[p+3]));

            stackIn = stackIn.next;

            r_out_sum += (pr = stackOut.r);
            g_out_sum += (pg = stackOut.g);
            b_out_sum += (pb = stackOut.b);
            a_out_sum += (pa = stackOut.a);

            r_in_sum -= pr;
            g_in_sum -= pg;
            b_in_sum -= pb;
            a_in_sum -= pa;

            stackOut = stackOut.next;

            yi += width;
        }
    }
    return imageData;
}

function processCanvasRGB(canvas, top_x, top_y, width, height, radius)
{
    if (isNaN(radius) || radius < 1) return;
    radius |= 0;

    var imageData = getImageDataFromCanvas(canvas, top_x, top_y, width, height);
    imageData = processImageDataRGB(imageData, top_x, top_y, width, height, radius);

    canvas.getContext('2d').putImageData(imageData, top_x, top_y);
}

function processImageDataRGB(imageData, top_x, top_y, width, height, radius)
{
    var pixels = imageData.data;

    var x, y, i, p, yp, yi, yw, r_sum, g_sum, b_sum,
        r_out_sum, g_out_sum, b_out_sum,
        r_in_sum, g_in_sum, b_in_sum,
        pr, pg, pb, rbs;

    var div = radius + radius + 1;
    var w4 = width << 2;
    var widthMinus1  = width - 1;
    var heightMinus1 = height - 1;
    var radiusPlus1  = radius + 1;
    var sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;

    var stackStart = new BlurStack();
    var stack = stackStart;
    for (i = 1; i < div; i++)
    {
        stack = stack.next = new BlurStack();
        if (i == radiusPlus1) var stackEnd = stack;
    }
    stack.next = stackStart;
    var stackIn = null;
    var stackOut = null;

    yw = yi = 0;

    var mul_sum = mul_table[radius];
    var shg_sum = shg_table[radius];

    for (y = 0; y < height; y++)
    {
        r_in_sum = g_in_sum = b_in_sum = r_sum = g_sum = b_sum = 0;

        r_out_sum = radiusPlus1 * (pr = pixels[yi]);
        g_out_sum = radiusPlus1 * (pg = pixels[yi+1]);
        b_out_sum = radiusPlus1 * (pb = pixels[yi+2]);

        r_sum += sumFactor * pr;
        g_sum += sumFactor * pg;
        b_sum += sumFactor * pb;

        stack = stackStart;

        for (i = 0; i < radiusPlus1; i++)
        {
            stack.r = pr;
            stack.g = pg;
            stack.b = pb;
            stack = stack.next;
        }

        for (i = 1; i < radiusPlus1; i++)
        {
            p = yi + ((widthMinus1 < i ? widthMinus1 : i) << 2);
            r_sum += (stack.r = (pr = pixels[p])) * (rbs = radiusPlus1 - i);
            g_sum += (stack.g = (pg = pixels[p+1])) * rbs;
            b_sum += (stack.b = (pb = pixels[p+2])) * rbs;

            r_in_sum += pr;
            g_in_sum += pg;
            b_in_sum += pb;

            stack = stack.next;
        }


        stackIn = stackStart;
        stackOut = stackEnd;
        for (x = 0; x < width; x++)
        {
            pixels[yi]   = (r_sum * mul_sum) >> shg_sum;
            pixels[yi+1] = (g_sum * mul_sum) >> shg_sum;
            pixels[yi+2] = (b_sum * mul_sum) >> shg_sum;

            r_sum -= r_out_sum;
            g_sum -= g_out_sum;
            b_sum -= b_out_sum;

            r_out_sum -= stackIn.r;
            g_out_sum -= stackIn.g;
            b_out_sum -= stackIn.b;

            p =  (yw + ((p = x + radius + 1) < widthMinus1 ? p : widthMinus1)) << 2;

            r_in_sum += (stackIn.r = pixels[p]);
            g_in_sum += (stackIn.g = pixels[p+1]);
            b_in_sum += (stackIn.b = pixels[p+2]);

            r_sum += r_in_sum;
            g_sum += g_in_sum;
            b_sum += b_in_sum;

            stackIn = stackIn.next;

            r_out_sum += (pr = stackOut.r);
            g_out_sum += (pg = stackOut.g);
            b_out_sum += (pb = stackOut.b);

            r_in_sum -= pr;
            g_in_sum -= pg;
            b_in_sum -= pb;

            stackOut = stackOut.next;

            yi += 4;
        }
        yw += width;
    }


    for (x = 0; x < width; x++)
    {
        g_in_sum = b_in_sum = r_in_sum = g_sum = b_sum = r_sum = 0;

        yi = x << 2;
        r_out_sum = radiusPlus1 * (pr = pixels[yi]);
        g_out_sum = radiusPlus1 * (pg = pixels[yi+1]);
        b_out_sum = radiusPlus1 * (pb = pixels[yi+2]);

        r_sum += sumFactor * pr;
        g_sum += sumFactor * pg;
        b_sum += sumFactor * pb;

        stack = stackStart;

        for (i = 0; i < radiusPlus1; i++)
        {
            stack.r = pr;
            stack.g = pg;
            stack.b = pb;
            stack = stack.next;
        }

        yp = width;

        for (i = 1; i <= radius; i++)
        {
            yi = (yp + x) << 2;

            r_sum += (stack.r = (pr = pixels[yi])) * (rbs = radiusPlus1 - i);
            g_sum += (stack.g = (pg = pixels[yi+1])) * rbs;
            b_sum += (stack.b = (pb = pixels[yi+2])) * rbs;

            r_in_sum += pr;
            g_in_sum += pg;
            b_in_sum += pb;

            stack = stack.next;

            if(i < heightMinus1)
            {
                yp += width;
            }
        }

        yi = x;
        stackIn = stackStart;
        stackOut = stackEnd;
        for (y = 0; y < height; y++)
        {
            p = yi << 2;
            pixels[p]   = (r_sum * mul_sum) >> shg_sum;
            pixels[p+1] = (g_sum * mul_sum) >> shg_sum;
            pixels[p+2] = (b_sum * mul_sum) >> shg_sum;

            r_sum -= r_out_sum;
            g_sum -= g_out_sum;
            b_sum -= b_out_sum;

            r_out_sum -= stackIn.r;
            g_out_sum -= stackIn.g;
            b_out_sum -= stackIn.b;

            p = (x + (((p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width)) << 2;

            r_sum += (r_in_sum += (stackIn.r = pixels[p]));
            g_sum += (g_in_sum += (stackIn.g = pixels[p+1]));
            b_sum += (b_in_sum += (stackIn.b = pixels[p+2]));

            stackIn = stackIn.next;

            r_out_sum += (pr = stackOut.r);
            g_out_sum += (pg = stackOut.g);
            b_out_sum += (pb = stackOut.b);

            r_in_sum -= pr;
            g_in_sum -= pg;
            b_in_sum -= pb;

            stackOut = stackOut.next;

            yi += width;
        }
    }

    return imageData;
}

function BlurStack()
{
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.a = 0;
    this.next = null;
}

module.exports = {
    image: processImage,
    canvasRGBA: processCanvasRGBA,
    canvasRGB: processCanvasRGB,
    imageDataRGBA: processImageDataRGBA,
    imageDataRGB: processImageDataRGB
};

},{}]},{},[1])(1)
});
// http://stackoverflow.com/questions/18922880/html5-canvas-resize-downscale-image-high-quality

canvas.downScale = function(img, scale){
	// scales the image by (float) scale < 1
	// returns a canvas containing the scaled image.
	function downScaleImage(img, scale) {
		var imgCV = document.createElement('canvas');
		imgCV.width = img.width;
		imgCV.height = img.height;
		var imgCtx = imgCV.getContext('2d');
		imgCtx.drawImage(img, 0, 0);
		return downScaleCanvas(imgCV, scale);
	}

	// scales the canvas by (float) scale < 1
	// returns a new canvas containing the scaled image.
	function downScaleCanvas(cv, scale) {
		if (!(scale < 1) || !(scale > 0)) throw ('scale must be a positive number <1 ');
		var sqScale = scale * scale; // square scale = area of source pixel within target
		var sw = cv.width; // source image width
		var sh = cv.height; // source image height
		var tw = Math.floor(sw * scale); // target image width
		var th = Math.floor(sh * scale); // target image height
		var sx = 0, sy = 0, sIndex = 0; // source x,y, index within source array
		var tx = 0, ty = 0, yIndex = 0, tIndex = 0; // target x,y, x,y index within target array
		var tX = 0, tY = 0; // rounded tx, ty
		var w = 0, nw = 0, wx = 0, nwx = 0, wy = 0, nwy = 0; // weight / next weight x / y
		// weight is weight of current source point within target.
		// next weight is weight of current source point within next target's point.
		var crossX = false; // does scaled px cross its current px right border ?
		var crossY = false; // does scaled px cross its current px bottom border ?
		var sBuffer = cv.getContext('2d').
		getImageData(0, 0, sw, sh).data; // source buffer 8 bit rgba
		var tBuffer = new Float32Array(3 * tw * th); // target buffer Float32 rgb
		var sR = 0, sG = 0,  sB = 0; // source's current point r,g,b
		/* untested !
		var sA = 0;  //source alpha  */    

		for (sy = 0; sy < sh; sy++) {
			ty = sy * scale; // y src position within target
			tY = 0 | ty;     // rounded : target pixel's y
			yIndex = 3 * tY * tw;  // line index within target array
			crossY = (tY != (0 | ty + scale)); 
			if (crossY) { // if pixel is crossing botton target pixel
				wy = (tY + 1 - ty); // weight of point within target pixel
				nwy = (ty + scale - tY - 1); // ... within y+1 target pixel
			}
			for (sx = 0; sx < sw; sx++, sIndex += 4) {
				tx = sx * scale; // x src position within target
				tX = 0 |  tx;    // rounded : target pixel's x
				tIndex = yIndex + tX * 3; // target pixel index within target array
				crossX = (tX != (0 | tx + scale));
				if (crossX) { // if pixel is crossing target pixel's right
					wx = (tX + 1 - tx); // weight of point within target pixel
					nwx = (tx + scale - tX - 1); // ... within x+1 target pixel
				}
				sR = sBuffer[sIndex    ];   // retrieving r,g,b for curr src px.
				sG = sBuffer[sIndex + 1];
				sB = sBuffer[sIndex + 2];

				// !! untested : handling alpha !!
				//sA = sBuffer[sIndex + 3];
				//if (!sA) continue;
				//if (sA != 0xFF) {
				//	sR = (sR * sA) >> 8;  // or use /256 instead ??
				//	sG = (sG * sA) >> 8;
				//	sB = (sB * sA) >> 8;
				//}
				if (!crossX && !crossY) { // pixel does not cross
					// just add components weighted by squared scale.
					tBuffer[tIndex    ] += sR * sqScale;
					tBuffer[tIndex + 1] += sG * sqScale;
					tBuffer[tIndex + 2] += sB * sqScale;
				} else if (crossX && !crossY) { // cross on X only
					w = wx * scale;
					// add weighted component for current px
					tBuffer[tIndex    ] += sR * w;
					tBuffer[tIndex + 1] += sG * w;
					tBuffer[tIndex + 2] += sB * w;
					// add weighted component for next (tX+1) px                
					nw = nwx * scale
					tBuffer[tIndex + 3] += sR * nw;
					tBuffer[tIndex + 4] += sG * nw;
					tBuffer[tIndex + 5] += sB * nw;
				} else if (crossY && !crossX) { // cross on Y only
					w = wy * scale;
					// add weighted component for current px
					tBuffer[tIndex    ] += sR * w;
					tBuffer[tIndex + 1] += sG * w;
					tBuffer[tIndex + 2] += sB * w;
					// add weighted component for next (tY+1) px                
					nw = nwy * scale
					tBuffer[tIndex + 3 * tw    ] += sR * nw;
					tBuffer[tIndex + 3 * tw + 1] += sG * nw;
					tBuffer[tIndex + 3 * tw + 2] += sB * nw;
				} else { // crosses both x and y : four target points involved
					// add weighted component for current px
					w = wx * wy;
					tBuffer[tIndex    ] += sR * w;
					tBuffer[tIndex + 1] += sG * w;
					tBuffer[tIndex + 2] += sB * w;
					// for tX + 1; tY px
					nw = nwx * wy;
					tBuffer[tIndex + 3] += sR * nw;
					tBuffer[tIndex + 4] += sG * nw;
					tBuffer[tIndex + 5] += sB * nw;
					// for tX ; tY + 1 px
					nw = wx * nwy;
					tBuffer[tIndex + 3 * tw    ] += sR * nw;
					tBuffer[tIndex + 3 * tw + 1] += sG * nw;
					tBuffer[tIndex + 3 * tw + 2] += sB * nw;
					// for tX + 1 ; tY +1 px
					nw = nwx * nwy;
					tBuffer[tIndex + 3 * tw + 3] += sR * nw;
					tBuffer[tIndex + 3 * tw + 4] += sG * nw;
					tBuffer[tIndex + 3 * tw + 5] += sB * nw;
				}
			} // end for sx 
		} // end for sy

		// create result canvas
		var resCV = document.createElement('canvas');
		resCV.width = tw;
		resCV.height = th;
		var resCtx = resCV.getContext('2d');
		var imgRes = resCtx.getImageData(0, 0, tw, th);
		var tByteBuffer = imgRes.data;
		// convert float32 array into a UInt8Clamped Array
		var pxIndex = 0; //  
		for (sIndex = 0, tIndex = 0; pxIndex < tw * th; sIndex += 3, tIndex += 4, pxIndex++) {
			tByteBuffer[tIndex] = Math.ceil(tBuffer[sIndex]);
			tByteBuffer[tIndex + 1] = Math.ceil(tBuffer[sIndex + 1]);
			tByteBuffer[tIndex + 2] = Math.ceil(tBuffer[sIndex + 2]);
			tByteBuffer[tIndex + 3] = 255;
		}
		// writing result to canvas.
		resCtx.putImageData(imgRes, 0, 0);
		return resCV;
	}
	
	return downScaleImage(img, scale);
};
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
		'bgimg_custom_dir':node.path.join(_g.root, '/app/assets/images/homebg-custom/'),
		'pics': {
			'ships': 	node.path.join(_g.root, '/pics/ships/'),
			'items': 	node.path.join(_g.root, '/pics/items/')
		}
	}
	KC.path.pics = _g.path.pics

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
	KC.db = _g.data

	var _db = {
		'fleets': new node.nedb({
				filename: 	Lockr.get('fleets-builds-file', node.path.join(node.gui.App.dataPath, 'NeDB', 'fleets.json'))
			})
	}
	_g.ship_type_order = []
	_g.ship_type_order_full = []
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
	
	_g.save = function( url, n, callback ){
		_g.file_save_as(url, n, callback)
	}

	_g.getLink = function( t, id ){
		switch( t ){
				case 'ships':		t = 'ship';		break;
		}
		return `?infos=${t}&id=${id}`
	}
	
	_g.getImg = function( t, id, img ){
		return `${node.path.normalize(_g.path.pics[t])}/${id}/${img}.webp`
	}
















// Global Frame
_frame.app_main = {
	page: {},
	page_dom: {},
	page_html: {},

	// is_init: false

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
				if( this.loading.indexOf(item) > -1 ){
					this.loading.splice(this.loading.indexOf(item), 1)
					this.is_loaded = false
				}
			}
			if( !this.loading.length && !this.is_loaded ){
				setTimeout(function(){
					if( _frame.app_main.is_loaded && !_frame.app_main.loading.length && !$html.hasClass('app-ready') ){
						_frame.dom.layout.addClass('ready')
						$html.addClass('app-ready')
						setTimeout(function(){
							let i = 0;
							while( _frame.app_main.functions_on_ready[i] ){
								_frame.app_main.functions_on_ready[i++]()
							}
							/*
							for(let i=0; i<_frame.app_main.functions_on_ready.length; i++){
								_frame.app_main.functions_on_ready[i]()
							}*/
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

				//this.load_page_func(_g.uriHash('page'))
				this.is_loaded = true
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
	
	
	
	
	// 载入中
		loading_queue: [],
		loading_state: {},
		//loading_cur: null,
		loading_start: function( url, callback_success, callback_error, callback_successAfter, callback_beforeSend, callback_complete ){
			url = url || location.pathname
			let isUrl = true
			
			if( typeof callback_success == 'object' ){
				isUrl = typeof callback_success.isUrl != 'undefined' ? callback_success.isUrl : true
				callback_error = callback_success.error
				callback_successAfter = callback_success.successAfter
				callback_beforeSend = callback_success.beforeSend
				callback_complete = callback_success.complete
				callback_success = callback_success.success
			}else if( callback_success === false ){
				isUrl = false
			}

			callback_beforeSend = callback_beforeSend || function(){}
			callback_success = callback_success || function(){}
			callback_successAfter = callback_successAfter || function(){}
			callback_error = callback_error || function(){}
			callback_complete = callback_complete || function(){}

			this.loading_cur = url
			
			if( typeof this.loading_state[url] == 'undefined' || this.loading_state[url] == 'fail' ){
				if( this.loading_state[url] != 'fail' )
					this.loading_state[url] = 'loading'
				this.loading_queue.push(url)
				_frame.dom.layout.addClass('is-loading')

				if( isUrl ){
					$.ajax({
						'url':		url,
						'type':		'get',
						'dataType':	'html',
						
						'beforeSend': function( jqXHR, settings ){
							callback_beforeSend( url, jqXHR, settings )
						},
						
						'success': function(data){
							let result_main = /\<main\>(.+)\<\/main\>/.exec(data)
								,result_title = /\<title\>([^\<]+)\<\/title\>/.exec(data)
							if( result_title && result_title.length > 1 ){
								_frame.app_main.page_title[url] = result_title[1]
							}
							callback_success( result_main && result_main.length > 1 ? result_main[1] : '' )
							if( url == _frame.app_main.loading_cur ){
							//if( url == location.pathname ){
								callback_successAfter( result_main && result_main.length > 1 ? result_main[1] : '' )
							}
							_frame.app_main.loading_state[url] = 'complete'
						},
						
						'error': function( jqXHR, textStatus, errorThrown ){
							errorThrown = errorThrown || ''
							_g.log( 'Loading Fail: ' + url + ' [' + textStatus + '] (' + errorThrown + ')' )
							
							if( _frame.app_main.loading_state[url] == 'fail'
								|| [
									'Bad Request',
									'Not Found',
									'Forbidden'
								].indexOf(errorThrown) > -1)
								return _frame.app_main.loading_fail(url, textStatus, errorThrown, callback_error)
	
							_frame.app_main.loading_state[url] = 'fail'
						},
						
						'complete': function( jqXHR, textStatus ){
							_frame.app_main.loading_complete( url )
							callback_complete( url, jqXHR, textStatus )
							
							if( _frame.app_main.loading_state[url] == 'fail' ){
								console.log('retry')
								_frame.app_main.loading_start( url, callback_success, callback_error, callback_successAfter, callback_beforeSend, callback_complete )
							}
						}
					})
				}else{
					
				}
			}else if( this.loading_state[url] == 'complete' ){
				callback_success()
				callback_successAfter()
			}
		},
		
		loading_complete: function( url ){
			if( !url )
				return
			if( url == this.loading_cur )
				this.loading_cur = null
			let i = this.loading_queue.indexOf(url)
			if( i >= 0 )
				this.loading_queue.splice(i, 1)
			if( this.loading_queue.length )
				return
			_frame.dom.layout.removeClass('is-loading')
		},
		
		loading_fail: function( url, textStatus, errorThrown, callback_error ){
			if( !url )
				return
			if( this.loading_state )
				delete this.loading_state[url]

			_frame.dom.layout.attr('data-errorbadge', url + ' 载入失败 (' + errorThrown + ')')
			clearTimeout( this.loading_fail_timeout_errorbadge )
			this.loading_fail_timeout_errorbadge = setTimeout(function(){
				_frame.dom.layout.removeAttr('data-errorbadge')
				delete _frame.app_main.loading_fail_timeout_errorbadge
			}, 3000)
			console.log( callback_error )
			return callback_error( url, textStatus, errorThrown )
		},





	// 更换页面
		load_page: function( page, options ){
			if( this.cur_page == page || !page )
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
				this.page_dom[page].trigger('modeSelectionEnter', [
					options.callback_modeSelection_select || function(){},
					options.callback_modeSelection_enter || function(){}
				])
			}else{
				this.mode_selection_off()
			}
			//_g.uriHash('page', page)
		},
		load_page_func: function( page, options ){
			if( this.load_page_lock )
				return
			this.load_page_lock = true
			
			_g.pageChangeBefore()

			_g.log( 'PREPARE LOADING: ' + page )
			//_g.log( 'CURRENT PAGE: ' + (this.cur_page || 'NO PAGE') )
			
			options = options || {}
			
			if( !page )
				return page
			
			// 检查page合法性，如果失效，读取第一个导航项
				let checked = false
					
				if( page == 'donate' ){
					checked = true
				}if( !this.cur_page ){
					this.nav.forEach(function(currentValue){
						if( page == currentValue.page )
							checked = true
					})
				}else{
					checked = true
				}
				
				if( !checked ){
					page = this.nav[0].page
					this.load_page(page, options)
					return page
				}

			if( !this.page_dom[page] ){
				this.page_dom[page] = $('<div class="page-container" page="'+page+'"/>').appendTo( _frame.dom.main )
				this.page_html[page] = node.fs.readFileSync(_g.path.page + page + '.html', 'utf8')
				if(this.page_html[page]){
					this.page_dom[page].html( this.page_html[page] )
					Page.init(page)
					//if( this.page[page] && this.page[page].init )
					//	this.page[page].init(this.page_dom[page])
					//_p.initDOM(this.page_dom[page])
				}
			}
			
			//this.page_dom[page].trigger('show')

			if( !options.callback_modeSelection_select ){
				//this.title = this.navtitle[page]
				_g.title(this.navtitle[page] || true)
				_frame.infos.last = null
	
				_ga.counter(
					location.search
				)
			}

			//_g.log(this.cur_page)
			if( this.cur_page == page ){
				this.load_page_lock = false
				return page
			}

			//this.page_dom[page].appendTo(_frame.dom.main).removeClass('off').trigger('on')
			Page.show(page)

			// 关闭之前的页面
				//if( this.cur_page ){
				//	Page.hide(this.cur_page)
					/*
					if( _frame.dom.navs[this.cur_page] )
						_frame.dom.navs[this.cur_page].removeClass('on')
					if( this.page_dom[this.cur_page] )
						//this.page_dom[this.cur_page].addClass('off').trigger('pageHide').detach()
					*/
				//}

			//if( _frame.dom.navs[page] )
			//	_frame.dom.navs[page].addClass('on')

			if( !options.callback_modeSelection_select ){
				if( _frame.dom.layout.hasClass('ready') )
					BgImg.change()

				if( page != 'about' )
					Lockr.set('last_page', page)
			}
			
			//_frame.dom.main.attr('data-theme', page)
			//this.cur_page = page

			_g.log( 'LOADED: ' + page )
			this.load_page_lock = false
		},








	init: function(){
		if( this.is_init )
			return true

		// 创建基础框架
			_frame.dom.mobilemenu = $('<input type="checkbox" id="view-mobile-menu"/>').prependTo( _frame.dom.layout )
			_frame.dom.logo = $('<div class="logo"/>')
								.on(_g.event.animationend, function(){
									_frame.dom.logo.addClass('ready-animated')
								})
								.appendTo( _frame.dom.layout )
			_frame.dom.nav = $('<nav/>').appendTo( _frame.dom.layout )
				_frame.dom.navlinks = $('<div class="pages"/>').appendTo( _frame.dom.nav )
					_frame.dom.globaloptions = $('<section class="options"/>').appendTo( _frame.dom.nav )
						.append(
							$('<button class="donate" icon="heart4"/>')
								.on('click', function(){_frame.app_main.load_page('donate')})
						)
						.append(
							$('<button class="show_only_bg" icon="images"/>')
								.on('click', function(){BgImg.controlsToggle()})
						)
				_frame.dom.btnsHistory = $('<div class="history"/>').insertBefore( _frame.dom.navlinks )
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
				_frame.dom.navtitle = $('<span class="title"/>')
							.append(
								$('<label for="view-mobile-menu"/>').html('<i></i>')
							)
							.append(
								_frame.dom.title = $('<span/>')
							)
							.appendTo( _frame.dom.nav )
			_frame.dom.main = $('<main/>').appendTo( _frame.dom.layout )
			//_frame.dom.bgimg = $('<div class="bgimg" />').appendTo( _frame.dom.layout )
			$('<div class="nav-mask"/>').appendTo( _frame.dom.layout )
				.on('click', function(){
					_frame.dom.mobilemenu.prop('checked', false)
				})

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

		// 在右上角工具条中加入缩放功能
			let titlebar_btns = $('#titlebar > .buttons');
			if( titlebar_btns && titlebar_btns.length ){
				let o = $('<button/>',{
					'class':	'scale',
					'icon':		'zoomin',
					'html': 	Scale.get()
				}).on('click', function(){
					Scale.menuToggle(o)
				}).prependTo( titlebar_btns )
				Scale.doms.push( o )
			}

		// 创建主导航
			if( this.nav && this.nav.length ){
				_frame.dom.navs = {}
				this.navtitle = {}
				this.nav.forEach(function(o, i){
					_frame.app_main.navtitle[o.page] = o.title
					_frame.dom.navs[o.page] = (function(page){
								return $('<button class="button" />').on('click', function(){
										Page.resetScroll(page)
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

		// 检查 app-db 目录，预加载全部数据库
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
			.then(BgImg.init)

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
												_g.ship_type_order_full = _g.ship_type_order_full.concat( doc['types'] )
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
                    .on('keydown', function(e){
                        switch(e.keyCode){
                            case 123:
                                node.win.showDevTools()
                                break;
                        }
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

					if( titlebar_btns && titlebar_btns.length ){					
						// 在标题栏添加hashbar开关
							titlebar_btns.prepend( $('<button/>',{
								'class':	'console',
								'html':		'Toggle Hashbar'
							}).on('click', function(){
								_frame.dom.layout.toggleClass('debug-hashbar')
							}) )
						
						// 在标题栏添加Web输出入口
							$.getScript('../dev-output/js-output/output.js', function(){
								titlebar_btns.prepend( $('<button/>',{
									'class':	'console',
									'html':		'Output to Web'
								}).on('click', function(){
									_frame.modal.show(
										dev_output_form(),
										'Output to Web',
										{
											'detach':	true
										}
									)
								}) )
							})
					}
				}
				return true
			})
		
		// 广告
			.then(function(){
				_frame.gg(_frame.dom.layout)
			})

		// 错误处理
			.catch(function (err) {
				_g.error(err, '初始化进程')
			})
			.done(function(){
				_g.buildIndex();
				_g.log('Global initialization DONE')
			})

		// 标记已进行过初始化函数
			this.is_init = true
	}
};









// 缩放相关
let Scale = {
	cur: 	1,
	doms:	[],
	preset: [
		0.75,
		1,
		1.25,
		1.5,
		2
	],

	get: function( value ){
		return (value || this.cur) * 100;
	},

	set: function( value ){
		if( value < 0.5 )
			value = 0.5
		_g.zoom(value);
		this.cur = value;
		this.update();
		localforage.setItem( 'scale', value )
	},

	update: function(){
		let value = this.get();
		this.doms.forEach(function($el){
			$el.html( value ).val( value );
		});
	},

	getPresetIndex: function( value ){
		value = value || this.cur;
		let index = 0;
		this.preset.some(function(v, i){
			index = i;
			return value <= v
		})
		return index
	},

	menuShow: function( $el ){
		if( !this.menu ){
			let setScale = function(value, e){
				if( e ){
					e.stopImmediatePropagation();
					e.stopPropagation();
				}
				Scale.set( value );
				setTimeout(function(){
					Scale.menu.position( $el );
				}, 100)

				if( value <= Scale.preset[0] )
					decrease.attr('disabled', true)
				else
					decrease.removeAttr('disabled')

				if( value >= Scale.preset[Scale.preset.length-1] )
					increase.attr('disabled', true)
				else
					increase.removeAttr('disabled')
			}

			let menuitems = []
			let input = $('<input/>',{
				'type':	'number'
			}).val(this.get(this.cur)).on({
				'change': function(){
					setScale(input.val() / 100)
				},
				'click': function(e){
					e.stopImmediatePropagation();
					e.stopPropagation();
				}
			});
			this.doms.push(input);

			let decrease = $('<menuitem/>',{
							'class':'decrease',
							'html':	'-'
						}).on('click', function(e){
							let index = Scale.getPresetIndex();
							index = Math.max( index, 1 );
							setScale( Scale.preset[index - 1], e );
						})
			let increase = $('<menuitem/>',{
							'class':'increase',
							'html':	'+'
						}).on('click', function(e){
							let index = Scale.getPresetIndex();
							if( Scale.cur == Scale.preset[index] )
								index++;
							index = Math.min( index, Scale.preset.length - 1 );
							setScale( Scale.preset[index], e );
						})

			menuitems.push($('<div class="item">窗口缩放</div>')
				.add(
					$('<div class="scale"/>')
						.append(decrease)
						.append(input)
						.append(
							$('<span>%</span>')
						)
						.append(increase)
				)
			);

			this.preset.forEach(function(value){
				menuitems.push(
					$('<menuitem/>',{
						'html':		Scale.get(value) + '%'
					}).on('click', function(e){
						setScale(value, e)
					})
				)
			});

			this.menu = new _menu({
				'className': 'contextmenu-scale',
				'items': menuitems
			})
		}
		this.menu.show( $el )
	},

	menuToggle: function( $el ){
		if( this.menu && this.menu.showing )
			this.menu.hide()
		else
			this.menuShow( $el )
	}
};
localforage.getItem(
	'scale',
	function(err, value){
		if( value )
			Scale.set(value);
	}
);
//
_g.error = function( err, context ){
	if( !(err instanceof Error) )
		err = new Error(err)

	_g.badgeError( err instanceof Error ? err.message : err )
	_g.log(err)

	node.fs.appendFileSync(
		node.path.join(_g.execPath, 'errorlog.txt'),
		new Date()
		+ "\r\n"
		+ ( context ? context + "\r\n" : '' )
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
		http://fleet.moe/versions.json
		packages[name].version
	对比各数据包版本
	如果没有更新
		返回
	如果有更新
		创建更新器提示
		按顺序
			获取文件
				http://fleet.moe/ + packages[name].path
				更新器提示的更新进度
			检查文件大小和MD5
				packages[name].bytes
				packages[name].md5
			检查通过
				pipe 程序目录
					[name].updated
			全部下载完成
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
	'remote_root':	'http://fleet.moe',
	'remote_url': 	'http://fleet.moe/versions.json',
	'remote_data': 	{}
}

// 获取本地版本
	_updater.get_local_version = function(){
		_updater.local_versions = JSON.parse( localStorage['nwjs-data-version'] || '{}' )
		//_g.log('本地版本: ' + _updater.local_versions )
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
				//_g.log('服务器版本: ' + _updater.remote_data )
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

// 更新提示
	_updater.indicator = function( progress ){
		if( !_updater.indicatorEl ){
			_updater.indicatorEl = $('<button class="update_progress" icon="stairs-up" data-tip="检测到新版本<br>更新中..."/>')
											.prependTo( _frame.dom.globaloptions )
											.append(
												_updater.indicatorElBar = $('<s/>')
											)
		}
		if( typeof progress == 'number' && progress >= 0 && progress < 1 ){
			progress = Math.floor(progress * 100)
			_updater.indicatorEl.addClass('on').attr('progress', progress)
			_updater.indicatorElBar.css('width', progress + '%' )
			node.win.setProgressBar(progress / 100)
		}else if( progress ){
			_updater.indicatorEl.addClass('on').attr('progress', 100).data('tip', '更新完成<br>请重新启动程序')
			_updater.indicatorElBar.css('width', '')
			node.win.setProgressBar(1)
		}else{
			_updater.indicatorEl.removeClass('on').removeAttr('progress')
			node.win.setProgressBar(0)
		}
	}

// 更新数据包流程
	_updater.update = function(){
		var promise_chain 	= Q.fcall(function(){
				_g.log('')
				_g.log('========== 自动更新 - 开始 ==========')
				_g.log('')
			})
			,dirRoot = node.path.dirname(process.execPath).split(node.path.sep)
			,dirData = ''
			,datadir_exists = false
			,renamePair = []
			,size_total = 0
			,size_received = 0

		dirRoot = (process.platform == 'darwin' || (dirRoot[dirRoot.length - 1] == 'nwjs' && node.path.basename( process.execPath ) == 'nw.exe') )
					? process.cwd()
					: node.path.dirname(process.execPath)
		dirData = node.path.join( dirRoot, 'data' )

		function err_handler(err, msg){
			msg = msg || ''
			if( err.errno == -4048 || err.message.indexOf( 'not permitted' ) > -1 ){
				_g.log('    ' + msg + '权限不足')
			}else{
				_g.log(err)
				_g.log('    ' + msg + '发生错误 [' +err.errno+ ']: ' + err.message)
			}
		}

		// 开始异步函数链
			promise_chain = promise_chain

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
			.then(_updater.get_local_version)
			.then(_updater.get_remote)
			.then(_updater.get_packages_updated)
			.then(function(updated){
				//_g.log(updated)

				if( !updated.length ){
					_g.log('所有数据包均为最新')
					return true
				}

				console.log('[自动更新] 开始')
				_g.log('更新开始: ' + updated.join(', '))

				let promise_chain_update = Q.fcall(function(){})
					//,permission = true
					,deferredUpdating = Q.defer()

				updated.forEach(function(package_name, index){
					size_total+= _updater.remote_data.packages[package_name].bytes

					promise_chain_update = promise_chain_update.then(function(){
						let deferred = Q.defer()
							,savefile = false
							,filesize = _updater.remote_data.packages[package_name].bytes

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
						_g.log('========= ' + (index+1) + '/' + updated.length + ' ==========')
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
								&& parseInt(response.headers['content-length']) == filesize
							)
								savefile = true
						})).on('error',function(err){
							_g.log('    下载数据包出错')
							node.fs.unlink(tempfile, function(err2){
								deferred.reject(new Error(err))
							})
							//deferred.reject(new Error(err))
						}).on('progress',function(state){
							_g.log('    ' + state.received + ' / ' + state.total + ' (' + state.percent + '%)'
								+ ' | ' + Math.floor( (size_received + state.received) / size_total * 100 ) + '%'
							)
							_updater.indicator( (size_received + state.received) / size_total )
						}).pipe(
							node.fs.createWriteStream(tempfile)
							.on('finish', function(){
								let complete = false
								if( savefile ){
									let stat = node.fs.statSync(tempfile)
									//console.log(
									//	`    ${package_name} | received: ${stat.size} , target: ${filesize}`
									//)
									if( stat.size == filesize )
										complete = true
								}

								if( complete ){
									size_received+= filesize
									renamePair.push([
										package_name,
										tempfile,
										targetFile
									])
									_g.log('[自动更新] ' +package_name+ ' | 下载完成')
									deferred.resolve()
								}else{
									_g.error('[自动更新] ' +package_name+ ' | 下载出现错误')
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
				})
				promise_chain_update = promise_chain_update
					.then(function(){
						deferredUpdating.resolve()
					})
					.catch(function (err) {
						deferredUpdating.reject( err )
					})
				return deferredUpdating.promise
			})
		
		// 全部下载完成		
		promise_chain = promise_chain
			.then(function(){
				if( !size_received )
					return true
				_g.log('')
				_g.log('全部数据包下载完成')
				let deferred = Q.defer()
					,chain = Q.fcall(function(){})
				renamePair.forEach(function(pair){
					chain = chain.then(function(){
						let deferred = Q.defer()
						
						node.fs.unlink(pair[2], function(err){
							if( err ){
								err_handler(err, '删除原有数据包')
								_g.log('    ' +pair[0]+ ' | 删除原有数据包出错')
								//deferred.resolve()
							}//else{
								node.fs.rename(
									pair[1],
									pair[2],
									function(err){
										if( err ){
											err_handler(err, '重命名新数据包')
											_g.log('    ' +pair[0]+ ' | 重命名新数据包出错')
										}else{
											_g.log('    ' +pair[0]+ ' | 更新完成')
										}
										deferred.resolve()
									}
								)
							//}
						})
						
						return deferred.promise
					})
				})
				chain = chain.then(function(){
					deferred.resolve()
				})
				.catch(function (err) {
					deferred.reject(err)
				})
				return deferred.promise
			})

		// 错误处理
			.then(function(){
				if( size_received && size_received >= size_total ){
					_g.log('')
					_g.log('更新完成')
					console.log( '[自动更新] 完成' )
					_updater.indicator(1)
				}else if( _updater.indicatorEl ){
					_g.log('')
					_g.log('自动更新失败, 结束流程')
					console.log( '[自动更新] 失败' )
					//_updater.update_indicator.removeClass('on')
					_updater.indicator(false)
					_g.badgeError('自动更新失败，请访问 fleet.moe 手动下载最新版本')
				}
			})
			.catch(function (err) {
				_g.log('自动更新失败')
				if( err == '数据包目录不存在, 不进行自动更新' )
					console.warn(err)
				else{
					_g.error(err)
					_g.badgeError('自动更新失败，请访问 fleet.moe 手动下载最新版本')
				}
				if( _updater.indicatorEl )
					_updater.indicator(false)
			})
			.done(function(){
				//_g.log('自动更新过程初始化完毕')
				_g.log('')
				_g.log('========== 自动更新 - 结束 ==========')
				_g.log('')
			})
	}


// 将更新流程加入页面序列
	_frame.app_main.functions_on_ready.push( _updater.update )
class ShareBar{
	constructor(options){
		options = options || {}
		this.settings = $.extend(true, {}, ShareBar.defaults, options)
		
		this.el = this.create();
		
		return this
	}
	
	create(){
		this.el = $('<div class="sharebar"/>')
		
		this.settings.sites.forEach(function(site){
			let link = $('<a/>',{
					'class':			'sharebar-share sharebar-site-'+site,
					'data-share-site':	site,
					'href':				'javascript:;',
					'target':			'_self',
					'icon':				ShareBar.iconmap[site] || site
				}).appendTo(this.el)
		
			if( this.settings.modifyItem )
				this.settings.modifyItem(link)
		}.bind(this))
		
		this.el.on('click.sharebar-share', 'a[data-share-site]', function(e, is_to_launch){
            let $el = $(e.target)
                ,site = $el.attr('data-share-site')
            $el.attr({
                'href': 	'http://s.jiathis.com/?webid='
                            + site
                            + '&url='
                            + encodeURIComponent(this.getContent( 'url', location.href ))
                            + '&title='
                            + encodeURIComponent(this.getContent( 'title', document.title ))
                            + '&summary='
                            + encodeURIComponent(this.getContent( 'summary', $('meta[name="description"]').attr('content') ))
                            
                            + (this.settings.uid ? ('&uid=' + this.settings.uid) : '')
                            + (this.settings.appkey[site] ? ('&appkey=' + this.settings.appkey[site]) : '')
                            
                            + '&shortUrl=true',
                'target': 	'_blank'
            })
		}.bind(this))
		
		return this.el
	}
	
	getContent(t, fallback){
		if( typeof this.settings[t] == 'function' )
			return this.settings[t](this)
		if( this.settings[t] )
			return this.settings[t]
		return fallback
	}
}

ShareBar.defaults = {
	// url: null,
	// title: null,
	// summary: null,
	
	// 修改创建的链接
	// modifyItem: function(el){},
	
	// JiaThis的用户ID
	// uid: null,
	
	// 支持的网站 http://www.jiathis.com/help/html/support-media-website
	sites: [
		'tsina',		// 微博
		'tqq',			// 腾讯微博
		'cqq',			// QQ好友
		'twitter',
		'tieba'			// 百度贴吧
	],

	appkey: {}
};

ShareBar.iconmap = {
	'tsina':	'weibo',
	'tqq':		'tencent-weibo',
	'cqq':		'qq'
}

var duoshuoQuery = {
       short_name: "duoshuo", 
       sso: { 
           login: "/?msg=loginsuccess",
           logout: "/?msg=logoutsuccess"
       }};

    (function() {
        if( !_g.isClient ){
            var ds = document.createElement('script');
            ds.type = 'text/javascript';ds.async = true;
            ds.src = 'http://static.duoshuo.com/embed.js';
            ds.charset = 'UTF-8';
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(ds);
        }
    })();
// use Q for promise
// use jQuery for AJAX

/*
var tinyurl = {
    create: function(url){
        let deferred = Q.defer()
        
        $.ajax({
            //'url':      'http://dwz.cn/create.php',
            //'method':   'POST',
            //'data': {
            //    url: url
            //},
            'url':      `http://tinyurl.com/api-create.php?url=${url}`,
            'method':   'GET',
            'success': function(data){
                data = JSON.parse(data)
                _g.log(`[tinyurl] success: ${data.tinyurl}`, data)
                deferred.resolve(data.tinyurl)
            }
        })
        
        return deferred.promise
    }
}
*/
_tmpl.improvement = function( equipment, improvement_index, requirement_index, returnHTML ){
	if( typeof equipment == 'undefined' )
		return false

	if( typeof equipment != 'object' )
		if( !(equipment = _g.data.items[equipment]) )
			return false

	improvement_index = improvement_index || 0
	requirement_index = requirement_index || [0]
	returnHTML = returnHTML || false

	let improvement = equipment['improvement'][improvement_index]
		,upgrade_to = improvement['upgrade']
						? _g.data.items[improvement['upgrade'][0]]
						: false
		,req_ships = []
		,requirement = ''

	requirement_index.forEach(function(currentValue){
		let req = improvement['req'][currentValue]
		if( req[1] )
			req_ships.mergeFrom(req[1])
		
	})
	if( req_ships.length ){
		var names = []
		req_ships.forEach(function(id){
			names.push(
				'<a'
				+ ' href="?infos=ship&id='+id+'"'
				+ ' data-infos="[[SHIP::'+id+']]"'
				+ ' data-tip="[[SHIP::'+id+']]"'
				+ '>'
				+ _g.data.ships[id].getName()
				+ '</a>'
			)
		})
		requirement = '<font>'+names.join(' / ')+'</font>'
	}else{
		requirement = `<font class="no">${ (improvement.resource[0][0] >= 0) ? '无秘书舰' : '未知' }要求</font>`
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
			,requirements = this.improvement__reqdetails(improvement.req , (improvement.resource[0][0] >= 0))

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
			,requirements = this.improvement__reqdetails(improvement.req , (improvement.resource[0][0] >= 0))

		html+= '<span class="unit improvement improvement-details">'
					+ '<b>'
						+ ( upgrade_to
							? '<span class="indicator true">可升级为</span>'
								//+ '<a style="background-image:url(../app/assets/images/itemicon/'
								//	+ upgrade_to.getIconId()
								//	+ '.png)"'
								+ '<a class="equiptypeicon mod-left mod-'
									+ upgrade_to.getIconId()
									+ '"'
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
		//+ '<a style="background-image:url(../app/assets/images/itemicon/'
		//	+ equipment.getIconId()
		//	+ '.png)"'
		+ '<a class="equiptypeicon mod-left mod-'
			+ equipment.getIconId()
			+ '"'
			+ ' href="?infos=equipment&id='+equipment['id']+'"'
			+ ' data-infos="[[EQUIPMENT::'+equipment['id']+']]"'
			+ ' data-tip="[[EQUIPMENT::'+equipment['id']+']]"'
		+ '>' + equipment.getName(true) + '</a>'
		+ ( upgrade_to
			? '<b></b>'
				//+ '<a style="background-image:url(../app/assets/images/itemicon/'
				//	+ upgrade_to.getIconId()
				//	+ '.png)"'
				+ '<a class="equiptypeicon mod-left mod-'
					+ upgrade_to.getIconId()
					+ '"'
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
										//'<a class="equipment"'
										//	+ ' style="background-image:url(../app/assets/images/itemicon/'
										//	+ _g.data.items[improvement['resource'][i][4]].getIconId()
										//	+ '.png)"'
										'<a class="equiptypeicon mod-left mod-'
											+ _g.data.items[improvement['resource'][i][4]].getIconId()
											+ '"'
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
_tmpl.improvement__reqdetails = function( reqdata , dataready ){
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
			requirements+= `<b>${ dataready ? '无秘书舰' : '未知' }要求</b>`
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

_tmpl.link_ship = function( ship, tagName, returnHTML, mode, extraIllust ){
	if( !ship )
		return false

	if( tagName && typeof tagName == 'object' )
		return _tmpl.link_ship(
					ship,
					tagName['tagName'] || null,
					tagName['returnHTML'] || null,
					tagName['mode'] || null,
					tagName['extraIllust'] || null
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
		,hasExtraIllust = false
	
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
	
	if( extraIllust ){
		let seriesData = ship.getSeriesData()
		seriesData.forEach(function(data_cur, i){
			hasExtraIllust = data_cur.illust_extra && data_cur.illust_extra.length && data_cur.illust_extra[0] ? true : false
			if( !hasExtraIllust && data_cur.illust_delete ){
				let data_prev = i ? seriesData[ i - 1 ] : null
				if( data_prev )
					hasExtraIllust = data_prev.illust_extra && data_prev.illust_extra.length && data_prev.illust_extra[0] ? true : false
			}
		})
	}

	return _tmpl.export(
			`<${tagName}`
				+ (tagName == 'a' ? ` href="${_g.getLink('ships', shipId)}"` : '')
				+ ` class="link_ship" data-shipid="${shipId}" data-infos="[[SHIP::${shipId}]]"`
				+ (hasExtraIllust ? ` icon="hanger"` : '')
			+ `>`
				+ `<img src="${_g.getImg('ships', shipId, 0)}"/>`
				+ `<span>${content}</span>`
			+ `</${tagName}>`,
		/*
			'<' + tagName
				+ (tagName == 'a' ? ' href="?infos=ship&id='+shipId+'"' : '')
				+ ' class="link_ship" data-shipid="' + shipId + '" data-infos="[[SHIP::' + shipId + ']]">'
				+ '<img src="' + node.path.normalize(_g.path.pics.ships) + '/' + shipId + '/0.webp"/>'
				+ '<span>'
					+ content
				+ '</span>'
			+ '</' + tagName + '>',
		*/
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

class Page {
	constructor( $page ) {
		$page.on({
			'pageHide': function(){
				this.modeSelectionExit()
			}.bind(this)
		})
	}
	
	modeSelectionEnter(callback_select, callback_enter){
		let _callback_select
		
		callback_select = callback_select || function(){}
		_callback_select = function(){
			//callback_select.apply( callback_select, arguments )
			callback_select(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], arguments[10])
			setTimeout(function(){
				this.modeSelectionExit()
			}.bind(this), 10)
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

Page.hide = function(page){
	page = page || _frame.app_main.cur_page
	if( typeof page == 'string' ){
		if( _frame.app_main.page_dom[page] )
			_frame.app_main.page_dom[page].addClass('off').trigger('pageHide').detach()
		if( _frame.dom.navs[page] )
			_frame.dom.navs[page].removeClass('on')
	}else{
		page.addClass('off').trigger('pageHide').detach()
		let p = page.attr('page')
		if( p && _frame.dom.navs[p] )
			_frame.dom.navs[p].removeClass('on')
	}
	_frame.app_main.cur_page = null
}

Page.show = function(page){
	page = page || _frame.app_main.cur_page
	let p

	if( typeof page == 'string' ){
		if( _frame.app_main.page_dom[page] )
			_frame.app_main.page_dom[page].appendTo(_frame.dom.main).removeClass('off').trigger('pageShow')
		if( _frame.dom.navs[page] )
			_frame.dom.navs[page].addClass('on')
		p = page
	}else{
		page.appendTo(_frame.dom.main).removeClass('off').trigger('pageShow')
		p = page.attr('page')
	}

	// 关闭之前的页面
		if( _frame.app_main.cur_page )
			Page.hide( _frame.app_main.cur_page )
	
	if( p ){
		if( _frame.dom.navs[p] )
			_frame.dom.navs[p].addClass('on')
		//_frame.dom.main.attr('data-theme', p)
		_frame.dom.layout.attr('data-theme', p)
		_frame.app_main.cur_page = p
	}
}

Page.resetScroll = function(page){
	page = page || _frame.app_main.cur_page
	if( typeof page == 'string' )
		page = _frame.app_main.page_dom[page]
	
	if( page && page.length ){
		page.attr('scrollbody', 0)
		page.find('[scrollbody]').each(function(i, el){
			el.setAttribute('scrollbody', 0)
		})
	}
}

Page.init = function(page){
	page = page || _frame.app_main.cur_page
	let p

	if( typeof page == 'string' ){
		p = page
		page = _frame.app_main.page_dom[page]
	}else{
		page.appendTo(_frame.dom.main).removeClass('off').trigger('pageShow')
		p = page.attr('page')
	}

	if( !page || !page.length )
		return

	function handlerScroll(e){
		//$(e.currentTarget).data('scrollTop', e.currentTarget.scrollTop)
		e.currentTarget.setAttribute('scrollbody', e.currentTarget.scrollTop)
	}
	
	if( p && _frame.app_main.page[p] && _frame.app_main.page[p].init )
		_frame.app_main.page[p].init(page)
	_p.initDOM(page)

	page.find('[scrollbody]').on('scroll', handlerScroll)

	page.on({
		'scroll': handlerScroll,
		'pageShow.scrollbody': function(){
			page.scrollTop( page.attr('scrollbody') || 0 )
			page.find('[scrollbody]').each(function(i, el){
				//el.scrollTop = $(el).data('scrollTop')
				el.scrollTop = el.getAttribute('scrollbody') || 0
				setTimeout(function(){
					el.scrollTop = el.getAttribute('scrollbody') || 0
				}, 10)
			})
		}
	})
}

//class PageFleets extends Page

_frame.app_main.page['fleets'] = {
	init: function( $page ){		
		this.object = new class extends Page{
			constructor( $page ){
				super( $page )
				//this.inited = false
				$page.on({
					'pageShow': function(){
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

//class PageShips extends Page

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
		
		this.object = new class extends Page{
			constructor( $page ){
				super( $page )
				
				this.tablelist = $page.find('.tablelist')
				this.tablelistObj = this.tablelist.data('tablelist')
			
				$page.on({
					/*
					'pageShow': function(){
						if( !this.tablelistObj )
							this.tablelistObj
								= this.tablelist.data('tablelist')
				
						if( this.tablelistObj )
							this.tablelistObj.thead_redraw()
					}.bind(this),
					*/
					'modeSelectionEnter': function(e, callback_select){
						this.modeSelectionEnter(callback_select)
					}.bind(this),
					'pageShow': function(){
						if( !this.tablelistObj )
							this.tablelistObj = this.tablelist.data('tablelist')
					}.bind(this),
					'pageHide': function(){
						if( this.tablelistObj ){
							this.tablelistObj.search()
							this.tablelistObj.dom.searchInput.val('')
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

//class PageEquipments extends Page

_frame.app_main.page['equipments'] = {
	init: function( $page ){
		this.object = new class extends Page{
			constructor( $page ){
				super( $page )
				
				this.tablelist = $page.find('.tablelist')
				this.tablelistObj = this.tablelist.data('tablelist')
			
				$page.on({
					'modeSelectionEnter': function(e, callback_select, callback_enter){
						this.modeSelectionEnter(callback_select, callback_enter)
					}.bind(this),
					'pageShow': function(){
						if( !this.tablelistObj )
							this.tablelistObj
								= this.tablelist.data('tablelist')

						if( this.tablelistObj ){
							this.tablelistObj.thead_redraw()
							this.tablelistObj.apply_types()
						}
					}.bind(this),
					'pageHide': function(){
						TablelistEquipments.types = []
						TablelistEquipments.shipId = null
						if( this.tablelistObj ){
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
		this.elMain = $('<div class="main" scrollbody/>')
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
	
	let i = 0;

	function addUpdateJournal( updateData ){
		let id = 'update_journal_'+(i++)
			,checkbox = $('<input type="checkbox" id="'+(id)+'"/>')
						.prop('checked', (i<3 ? true : false))
						.appendTo(page)
			,section = $('<section class="update_journal" data-version-'+updateData['type']+'="'+updateData['version']+'"/>')
								.append(
									$('<label for="'+id+'"/>')
										.html(_frame.app_main.page['about'].journaltitle(updateData))
								)
						.appendTo(page)
		try{
			$(_frame.app_main.page['about'].journal_parse(updateData['journal'])).appendTo( section )
		}catch(e){
			_g.error(e)
			checkbox.remove()
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

_frame.app_main.page['calctp'] = {
	'init': function(page){
		page.find('form.tpcalculator').each(function(i, form){
			form = $(form)
			let resultA = form.find('.result_a')
				,resultS = form.find('.result_s')
			
			form.on('input', 'input', function(){
				form.trigger('submit')
			}).on('submit', function(e){
				e.preventDefault()

				let d = form.serializeObject()
					,data = {
						ship: {},
						equipment: {}
					}
					,rA = 0
					,rS = 0

				for(let i in d){
					let count = parseInt(d[i]) || 0;
					switch(i){
						// canister
						case 'e75':
							data.equipment[75] = count; break;
						
						// daihatsu
						case 'e68':
							data.equipment[68] = count; break;
						
						// 戦闘糧食
						case 'e145':
							data.equipment[145] = count; break;
						
						// 秋刀魚の缶詰
						case 'e150':
							data.equipment[150] = count; break;
						
						// daihatsu (force)
						case 'e166':
							data.equipment[166] = count; break;
						
						// 特二式内火艇
						case 'e167':
							data.equipment[167] = count; break;
						
						default:
							data.ship[i] = count; break;
					}
				}
				
				rS = Math.floor( Formula.calc.TP(data) )
				rA = rS * 0.7

				resultS.html( rS )
				resultA.html(Math.floor(rA))
				
				/* old
				for(let i in d){
					let count = parseInt(d[i]) || 0;
					switch(i){
						case 'dd':
						case 'cl':
							rA+= 3 * count;
							rS+= 4.5 * count;
							break;
						case 'cav':
							rA+= 3 * count;
							rS+= 4 * count;
							break;
						case 'av':
							rA+= 8 * count;
							rS+= 10.5 * count;
							break;
						case 'lha':
						case 'ao':
							rA+= 10 * count;
							rS+= 13.5 * count;
							break;
						// canister
						case 'e75':
							rA+= 3.5 * count;
							rS+= 5 * count;
							break;
						case 'e68':
							rA+= 5.5 * count;
							rS+= 8.3333 * count;
							break;
					}
				}				
				resultA.html(Math.floor(rA))
				resultS.html(Math.floor(rS))
				*/
			})
		})
	}
};
// advertisement

_frame.gg = function(){
	$.ajax({
		'url':		'http://fleet.moe/!/g/',
		'method':	'get',
		'dataType':	'html',
		'success':	function(data){
			_g.isOnline = true;
			if( data ){
				_frame.dom.layout.append(
					$('<div class="g"/>').html(data)
							.append(
								$('<button type="button" class="close"/>')
									.on('click', function(){
										_frame.dom.layout.css('padding-bottom', '')
											.removeClass('mod-g')
									})
							)
				)
					.addClass('mod-g')
					//.css('padding-bottom', gg.height() + 1)
			}
		}
	})
};

/*

static
	cur
	list
	isInit: false

	init()
		controlsInit()
		getDefaultImgs()
	getObj(index || object || name)
	getPath(index || object, type)
	change(index = random || first)
	save(index = current)
	add()
		upload()
	delete(index)
		only work on custom img
	generate(index || object, blur || thumbnail)
	set(index || object, blur || thumbnail, canvas)
	controlsShow()
	controlsHide()
	controlsToggle()

class
	name
		when isDefault === true, name leads as *
		use .filename to get real filename / name
	filename
	isDefault

	GET			index
	GET			els
	GET			elThumbnail
	GET			path
	GET/SET		_path
	GET			blur
	GET/SET		_blur
	GET			thumbnail
	GET/SET		_thumbnail
	GET/SET		visible

	show()
	save()
	append()
	delete()

*/

class BgImg{
	constructor(options){
		options = options || {}
		$.extend(true, this, BgImg.defaults, options)
	}
	
	show(){
		return BgImg.change(this)
	}
	
	save(){
		return BgImg.save(this)
	}
	
	append(){
		if( this.isDefault ){
			if( BgImg.controlsEls.listDefault )
				this.elThumbnail.appendTo( BgImg.controlsEls.listDefault )
		}else{
			if( BgImg.controlsEls.listCustomAdd )
				this.elThumbnail.insertBefore( BgImg.controlsEls.listCustomAdd )
		}
		if( BgImg.cur && BgImg.cur.name === this.name )
			this.elThumbnail.addClass('on')
	}
	
	delete(){
		BgImg.delete(this)
	}
	
	get filename(){
		return this.isDefault ? this.name.substr(1) : this.name
	}
	
	get index(){
		let i = -1
		BgImg.list.some(function(o, index){
			if( o.name === this.name )
				i = index
			return o.name === this.name
		}.bind(this))
		return i
	}
	
	get els(){
		if( !this._els ){
			this._els = $('<s class="bgimg"/>').css('background-image','url(' + this.path + ')')
					.add( $('<s class="bgimg"/>').css('background-image','url(' + this.blur + ')') )
					.add( $('<s class="bgimg"/>').css('background-image','url(' + this.blur + ')') )
					.add( $('<s class="bgimg"/>').css('background-image','url(' + this.blur + ')') )
		}
		return this._els
	}
	
	get elThumbnail(){
		if( !this._elThumbnail ){
			//let checkId = 'checkbox-' + _g.timeNow()
			this._elThumbnail = $('<dd/>')
				.on('click', function(){
					BgImg.change(this)
				}.bind(this))
				.append(
					$('<s/>').css('background-image','url(' + this.thumbnail + ')')
				)
				.append(
					$('<i/>').on('click', function(e){
						e.preventDefault()
						e.stopImmediatePropagation()
						e.stopPropagation()
						this.visible = !this.visible
					}.bind(this))
				)
			if( !this.isDefault )
				this._elThumbnail.append(
					$('<del/>').on('click', function(e){
						e.preventDefault()
						e.stopImmediatePropagation()
						e.stopPropagation()
						this.delete()
					}.bind(this))
				)
		}
		return this._elThumbnail
	}
	
	get path(){
		if( !this._path )
			this._path = BgImg.getPath(this)
		return this._path
	}
	
	get blur(){
		if( !this._blured )
			this._blured = BgImg.getPath(this, 'blured')
		return this._blured
	}
	
	get thumbnail(){
		if( !this._thumbnail )
			this._thumbnail = BgImg.getPath(this, 'thumbnail')
		return this._thumbnail
	}
	
	get visible(){
		return this.elThumbnail.hasClass('is-visible')
	}
	set visible( v ){
		if( v ){
			if( !this.visible ){
				this.elThumbnail.addClass('is-visible')
				BgImg.listVisible.push(this)
				BgImg.namesHidden.forEach(function(n, i){
					if( n === this.name )
						BgImg.namesHidden.splice(i, 1)
				}.bind(this))
			}
		}else{
			if( this.visible ){
				this.elThumbnail.removeClass('is-visible')
				BgImg.listVisible.forEach(function(o, i){
					if( o === this )
						BgImg.listVisible.splice(i, 1)
				}.bind(this))
				BgImg.namesHidden.push(this.name)
			}
		}
		Lockr.set('BgImgHidden', BgImg.namesHidden)
	}
}





BgImg.default = {
	isEnable: 	true//,
	//isDefault:	true
};
BgImg.list = [];
BgImg.listVisible = [];
//BgImg.namesHidden = [];
BgImg.countCustom = 0;





// global
	// BgImg.isInit = false
	BgImg.init = function(){
		if( BgImg.isInit )
			return BgImg.list

		_g.log('背景图: START')
		
		BgImg.controlsInit()
		
		_frame.dom.bgimg = $('<div class="bgimgs"/>').appendTo( _frame.dom.layout )
			.on(_g.event.animationend, 's', function(){
				BgImg.changeAfter()
			})
		
		let deferred = Q.defer()
			,_new

		BgImg.namesHidden = Lockr.get('BgImgHidden', [])

		Q.fcall(BgImg.getDefaultImgs)
		.then(function(){
			BgImg.list.forEach(function(o){
				if( BgImg.namesHidden.indexOf(o.name) > -1 ){
					o.visible = false
				}else{
					o.visible = true
				}
			})
			
			//console.log(BgImg.listVisible)
			BgImg.ensureVisible();

			BgImg.listVisible.some(function(o){
				if( !_new && o.name != Lockr.get('BgImgLast', '') )
					_new = o
				return o.name == Lockr.get('BgImgLast', '')
			})

			Lockr.set('BgImgLast', BgImg.listVisible[0].name)

			BgImg.change( _new );
			_frame.app_main.loaded('bgimgs')

			BgImg.isInit = true
			
			_g.log('背景图: DONE')
			deferred.resolve()
		})
		return deferred.promise
	};
	
	BgImg.getObj = function(o){
		if( typeof o == 'string' ){
			let r
			BgImg.list.some(function(obj){
				if( obj.name === o )
					r = obj
				return obj.name === o
			})
			return r
		}
		
		if( typeof o == 'number' ){
			return BgImg.list[o]
		}
		
		if( typeof o == 'undefined' ){
			return BgImg.cur
		}

		return o
	}
	
	BgImg.change = function( o ){
		if( !BgImg.list.length )
			return
		
		if( typeof o == 'undefined' ){
			BgImg.ensureVisible();
			o = BgImg.listVisible[ _g.randInt(BgImg.listVisible.length) ]
			if( BgImg.cur && o.name === BgImg.cur.name ){
				if( BgImg.listVisible.length == 1 )
					return o
				return BgImg.change()
			}
		}else{
			o = BgImg.getObj(o)
			if( BgImg.cur && o.name === BgImg.cur.name )
				return o
		}
		
		if( BgImg.cur ){
			BgImg.lastToHide = BgImg.cur
			BgImg.cur.elThumbnail.removeClass('on')
		}
		
		o.els.addClass( BgImg.cur ? 'fadein' : '' )
		o.els.eq(0).appendTo( _frame.dom.bgimg )
		o.els.eq(1).appendTo( _frame.dom.nav )
		o.els.eq(2).appendTo( _frame.dom.main )
		o.els.eq(3).appendTo( BgImg.controlsEls.bgimgs )
		o.elThumbnail.addClass('on')
		
		BgImg.cur = o
		return o
	};
	
	BgImg.changeAfter = function(){
		if( BgImg.lastToHide ){
			BgImg.lastToHide.els.detach()
			delete BgImg.lastToHide
		}
	};
	
	BgImg.upload = function(){
		if( !BgImg.fileSelector ){
			BgImg.fileSelector = $('<input type="file" class="none"/>')
				.on('change', function(e){
					if( BgImg.fileSelector.val() ){
						let o,
							mime = e.target.files[0].type
						
						function _done(){
							BgImg.controlsEls.body.removeClass('is-loading')
							BgImg.fileSelector.prop('disabled', false)
							BgImg.fileSelector.val('')
							_g.log('BgImg.add() complete')
						}
						
						if( !mime ){
							_g.badgeError('文件格式未知')
							_done()
							return
						}else{
							mime = mime.split('/')
							if( mime[0].toLowerCase() != 'image' ){
								_g.badgeError('请选择图片文件')
								_done()
								return
							}else if( ['bmp','jpg','jpeg','png','gif','tif','tiff','webp'].indexOf(mime[1].toLowerCase()) < 0 ){
								_g.badgeError('当前仅支持以下格式: BMP、JPG、PNG、GIF、TIFF')
								_done()
								return
							}
						}
						
						Q.fcall(function(){
							BgImg.controlsEls.body.addClass('is-loading')
							BgImg.fileSelector.prop('disabled', true)
							return BgImg.readFile(e)
						})
						.then(function(obj){
							o = obj
							BgImg.list.push(o)
							return BgImg.generate(o, 'thumbnail')
						})
						.then(function(canvas){
							return BgImg.set(o, 'thumbnail', canvas)
						})
						.then(function(){
							return BgImg.generate(o, 'blured')
						})
						.then(function(canvas){
							return BgImg.set(o, 'blured', canvas)
						})
						.then(function(){
							// 如果是上传第一张自定义图片，在随机背景图列表中取消所有内置图片
							if( !BgImg.countCustom ){
								BgImg.list.forEach(function(obj){
									if( obj.visible )
										obj.visible = false
								})
							}
							o.append()
							o.show()
							o.visible = true
							BgImg.countCustom++
						})
						.catch(function(err){
							_g.error(err, '自定义背景图')
							if( o )
								o.delete()
						})
						.done(_done)
					}
				})
		}
		BgImg.fileSelector.trigger('click')
	};

	BgImg.generate = function(o, t){
		o = BgImg.getObj(o)
		let deferred = Q.defer()
			,img
		
		function _error(e){
			deferred.reject('读取图片文件发生错误')
		}

		switch( t ){
			case 'thumbnail':
				img = $('<img/>',{
					'src': 	o.path
				}).on({
					'load': function(){
						let cv = canvas.downScale(img[0], 150 / Math.min(img[0].width, img[0].height))
						img.remove()
						deferred.resolve( cv )
					},
					'error': _error
				}).appendTo($body)
				break;
			
			case 'blured':
				img = $('<img/>',{
					'src': 	o.path
				}).on({
					'load': function(){
						let cv = $('<canvas/>')
						canvas.blur.image(
							img[0],
							cv[0],
							20 * Math.min(img[0].width, img[0].height) / 1080
							/*, blurAlphaChannel*/
						);
						img.remove()
						deferred.resolve( cv[0] )
					},
					'error': _error
				}).appendTo($body)
				break;
		}

		return deferred.promise
	};
	
	BgImg.getUniqueName = function( n ){
		let o, i=1, n2 = n
		if( typeof n == 'number' )
			n = '' + n
		while( o = BgImg.getObj(n2) ){
			n2 = n.split('.')
			let ext = n2.pop()
			n2 = n2.join('.') + '-' + (i++) + '.' + ext
		}
		return n2
	};
	
	BgImg.ensureVisible = function(){
		if( !BgImg.listVisible.length ){
			BgImg.list.forEach(function(o){
				if( (BgImg.countCustom && !o.isDefault)
					|| (!BgImg.countCustom && o.isDefault)
				){
					o.visible = true
				}
			})
		}
	};





// controls
	// BgImg.controlsShowing = false
	BgImg.controlsInit = function(){
		if( BgImg.controlsEls )
			return BgImg.controlsEls.container

		BgImg.controlsEls = {}
		BgImg.controlsEls.body = $('<div class="bgcontrols"/>').appendTo( _frame.dom.layout )
			.on(_g.event.animationend, function(e){
				if( e.currentTarget == e.target ){
					if( BgImg.controlsShowing ){
						BgImg.controlsHideAfter()
					}else{
						BgImg.controlsShowAfter()
					}
					/*
					if( e.originalEvent.animationName == 'sideInRight' ){
						BgImg.controlsHideAfter()
					}else if( e.originalEvent.animationName == 'sideOutRight' ){
						BgImg.controlsShowAfter()
					}
					*/
				}
			})
			.append( BgImg.controlsEls.container = 
				$('<div class="wrapper"/>')
				.append( BgImg.controlsEls.bgimgs = 
					$('<div class="bgimgs"/>')
				)
			)

		return BgImg.controlsEls.container
	};
	BgImg.controlsShow = function(){
		if( !BgImg.controlsEls || BgImg.controlsShowing ) return;
		if( !BgImg.controlsEls.listDefault ){
			$('<div class="controls"/>').appendTo( BgImg.controlsEls.container )
				.append( BgImg.controlsEls.btnViewingToggle =
					$('<button icon="eye"/>').on('click', BgImg.controlsViewingToggle)
				)
				.append(
					$('<button icon="floppy-disk"/>').on('click', function(){
						BgImg.save()
					})
				)
				.append(
					$('<button icon="arrow-set2-right"/>').on('click', BgImg.controlsHide)
				)
			$('<div class="list"/>').appendTo( BgImg.controlsEls.container )
				.append(
					$('<dl/>',{
						'class':	'notes',
						'html':		'勾选的图片将会出现在背景图随机队列中'
					})
				)
				.append( BgImg.controlsEls.listCustom =
					$('<dl/>',{
						'html':	`<dt>自定义</dt>`
					})
					.prepend(function(){
						if( BgImg.quota )
							return $('<small/>')
								.append( BgImg.controlsEls.listCustomQuotaUsed =
									$(`<span>${_g.getSize(BgImg.quotaUsed, 'm')}</span>`)
								)
								.append(` / <span>${_g.getSize(BgImg.quota, 'm')}</span>`)
					})
					.append( BgImg.controlsEls.listCustomAdd =
						$('<dd/>',{
							'class':	'add',
							'html':		'<s></s>'
						}).on('click',function(){
							BgImg.upload()
						})
					)
				)
				.append( BgImg.controlsEls.listDefault =
					$('<dl/>',{
						'html':	'<dt></dt>'
					})
				)
			BgImg.list.forEach(function(o){
				o.append()
			})
		}
		_frame.dom.layout.addClass('mod-bgcontrols')
	};
	BgImg.controlsShowAfter = function(){
		if( !BgImg.controlsEls || BgImg.controlsShowing ) return;
		BgImg.controlsEls.body.addClass('is-on')
		BgImg.controlsShowing = true
	};
	BgImg.controlsHide = function(){
		if( !BgImg.controlsEls || !BgImg.controlsShowing ) return;
		BgImg.controlsEls.body.addClass('is-hiding')
	};
	BgImg.controlsHideAfter = function(){
		if( !BgImg.controlsEls || !BgImg.controlsShowing ) return;
		_frame.dom.layout.removeClass('mod-bgcontrols')
		BgImg.controlsEls.body.removeClass('is-on is-hiding')
		BgImg.controlsShowing = false
	};
	BgImg.controlsToggle = function(){
		if( BgImg.controlsShowing )
			return BgImg.controlsHide()
		return BgImg.controlsShow()
	};
	BgImg.controlsViewingToggle = function(){
		BgImg.controlsEls.body.toggleClass('mod-viewing')
		BgImg.controlsEls.btnViewingToggle.toggleClass('on')
	};

BgImg.getDefaultImgs = function(){
	
	function _list(p){
		return node.fs.readdirSync( p )
			.filter(function(file){
				return !node.fs.lstatSync( node.path.join( p , file) ).isDirectory()
			})
			.map(function(v) { 
				return {
					name: v,
					time: node.fs.statSync( node.path.join( p , v) ).mtime.getTime()
				}; 
			})
			.sort(function(a, b) { return b.time - a.time; })
			.map(function(v) { return v.name; })
	}
	
	_list( _g.path.bgimg_dir )
		.forEach(function(name){
			BgImg.list.push( new BgImg({
				'name': 	'*' + name,
				'isDefault':true
			}) )
		})
	
	_list( _g.path.bgimg_custom_dir )
		.forEach(function(name){
			BgImg.countCustom++;
			BgImg.list.push( new BgImg({
				'name': 	name
			}) )
		})

	return BgImg.list
	
	/*
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
	*/
};

BgImg.getPath = function(o, t){
	o = BgImg.getObj(o)
	
	let folder = o.isDefault ? _g.path.bgimg_dir : _g.path.bgimg_custom_dir
	
	if( t )
		return 'file://' + encodeURI( node.path.join( folder , t, o.filename ).replace(/\\/g, '/') )

	return 'file://' + encodeURI( node.path.join( folder , o.filename ).replace(/\\/g, '/') )
};

BgImg.save = function(o){
	o = BgImg.getObj(o)
	_g.save( node.path.join( o.isDefault ? _g.path.bgimg_dir : _g.path.bgimg_custom_dir , o.filename ), o.filename )
};

BgImg.readFile = function( e ){
	// make sure custom bgimg folder exists
		node.mkdirp.sync( node.path.normalize(_g.path.bgimg_custom_dir) )
		node.mkdirp.sync( node.path.join(_g.path.bgimg_custom_dir, 'blured') )
		node.mkdirp.sync( node.path.join(_g.path.bgimg_custom_dir, 'thumbnail') )

	let deferred = Q.defer()
		,path = BgImg.fileSelector.val()
		,pathParse = node.path.parse( path )
		,streamRead = node.fs.createReadStream( path )
		,streamWrite = node.fs.createWriteStream( node.path.join(_g.path.bgimg_custom_dir, pathParse.base) )

	streamRead.on('error', function(err){
		deferred.reject('文件载入失败', new Error(err))
	});

	streamRead.on('close', function(err){
		//let o = new BgImg({
		//	'name':	pathParse.base
		//})
		deferred.resolve(
			new BgImg({
				'name':	pathParse.base
			})
		)
	});
	streamRead.pipe(streamWrite)

	return deferred.promise
};

BgImg.set = function(o, t, canvas){
	o = BgImg.getObj(o)
	let base64 = canvas.toDataURL("image/jpeg", 0.4)
		,deferred = Q.defer()
	
	function decodeBase64Image(dataString) {
		var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
		response = {};

		if (matches.length !== 3) {
			return new Error('Invalid input string');
		}

		response.type = matches[1];
		response.data = new Buffer(matches[2], 'base64');

		return response;
	}
	
	let imageBuffer = decodeBase64Image(base64)
		,folder = o.isDefault ? _g.path.bgimg_dir : _g.path.bgimg_custom_dir

	node.fs.writeFile(
		node.path.join( folder , t, o.name ),
		imageBuffer.data,
		function(err) {
			canvas.remove()
			deferred.resolve()
		}
	);

	return deferred.promise
};

BgImg.delete = function(o){
	o = BgImg.getObj(o)
	
	let deferred = Q.defer()

	o.elThumbnail.remove();
	o.els.remove();

	BgImg.listVisible.forEach(function(obj, i){
		if( obj === o )
			BgImg.listVisible.splice(i, 1)
	})
	BgImg.namesHidden.forEach(function(n, i){
		if( n === o.name )
			BgImg.namesHidden.splice(i, 1)
	})

	Lockr.set('BgImgHidden', BgImg.namesHidden)

	Q.fcall(function(){
		let deferred = Q.defer()
		node.fs.unlink(
			node.path.join( _g.path.bgimg_custom_dir, o.name ),
			function(err) {
				deferred.resolve()
			}
		);
		return deferred.promise
	})
	.then(function(){
		let deferred = Q.defer()
		node.fs.unlink(
			node.path.join( _g.path.bgimg_custom_dir, 'blured', o.name ),
			function(err) {
				deferred.resolve()
			}
		);
		return deferred.promise
	})
	.then(function(){
		let deferred = Q.defer()
		node.fs.unlink(
			node.path.join( _g.path.bgimg_custom_dir, 'thumbnail', o.name ),
			function(err) {
				deferred.resolve()
			}
		);
		return deferred.promise
	})
	.then(function(){
		BgImg.countCustom--;
		BgImg.list.forEach(function(obj, i){
			if( obj === o )
				BgImg.list.splice(i, 1)
		})
		if( BgImg.cur === o )
			BgImg.change();
		deferred.resolve()
	})

	return deferred.promise
};
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
			return initcont( this['__' + type]( id ) )
		
		if( id == '__OUTPUT__' )
			this.contentCache[type][id] = initcont( this['__' + type + '__OUTPUT']( id ) ).removeAttr('data-infos-id')

		if( !this.contentCache[type][id] ){
			this.contentCache[type][id] = initcont( this['__' + type]( id ) )
		}

		return this.contentCache[type][id]
	},

	show: function(cont, el, doNotPushHistory){
		var exp			= /^\[\[([^\:]+)\:\:(.+)\]\]$/.exec(cont)
			,infosType
			,infosId

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
			return
		}

		// 如果为相同内容，不运行
			if( this.curContent == infosType + '::' + infosId )
				return this.dom.container.children('div:first-child')

		if( !doNotPushHistory ){
		//}else{
			this.historyCurrent++
			this.historyLength = this.historyCurrent
			_frame.app_main.pushState(
				{
					'infos':infosType,
					'id': 	infosId,
					'infosHistoryIndex': this.historyCurrent
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
		
		_g.pageChangeBefore()

		// 如果为相同内容，不运行
			if( this.curContent == type + '::' + id )
				return this.dom.container.children('div:first-child')

		type = type.toLowerCase()
		if( isNaN(id) )
			id = id
		else
			id = parseInt(id)

		var cont = ''
			,title

		// 第一次运行，创建相关DOM和变量
			if( !this.dom ){
				this.dom = {
					//'nav': 		$('<div class="infos"/>').appendTo( _frame.dom.nav ),
					'main': 	$('<div class="page-container infos"/>').appendTo( _frame.dom.main )
				}
				this.dom.container = $('<div class="wrapper"/>').appendTo( this.dom.main )
				/*
				this.dom.back = $('<button class="back" icon="arrow-set2-left"/>')
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
						}).appendTo( this.dom.nav )
				this.dom.forward = $('<button class="forward disabled" icon="arrow-set2-right"/>')
						.on('click', function(){
							history.forward()
							//_frame.infos.hide()
						}).appendTo( this.dom.nav )
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
					this.dom.main.attr('data-infostype', type)
					title = cont.attr('data-infos-title')
					break;
				case 'fleet':
					cont = this.getContent(type, id)
					this.dom.main.attr('data-infostype', 'fleet')
					//_frame.app_main.mode_selection_off()
					TablelistEquipments.types = []
					break;
			}
				
			switch(type){
				case 'ship':
					_g.title( _frame.app_main.navtitle.ships );
					break;
				case 'equipment':
					_g.title( _frame.app_main.navtitle.equipments );
					break;
				case 'entity':
					_g.title( _frame.app_main.navtitle.entities );
					break;
				case 'fleet':
					_g.title( _frame.app_main.navtitle.fleets );
					break;
			}
			//var hashcode = (cont.append) ? cont[0].outerHTML.hashCode() : cont.hashCode()
			//if( this.curContent != hashcode ){
				var contentDOM = cont.append ? cont : $(cont)
					,is_firstShow = !contentDOM.data('is_infosinit')

				//if( el && el.attr('data-infos-history-skip-this') )
				//	contentDOM.attr('data-infos-history-skip-this', true)

				//if( this.dom.main.children().length )
				//	contentDOM.addClass('fadein')

				/*
				if( history ){
					this.dom.main.children().filter('[data-infos-history-skip-this="true"]').remove()
					this.dom.main.children().slice(2).remove()
					this.dom.main.children().eq(0).addClass('off')
					this.dom.historyback.html(history).addClass('show')
				}else{
					this.dom.historyback.html('').removeClass('show')
					this.dom.main.empty()
				}*/
				//data-infos-history-skip-this

				if( !contentDOM.data('is_infosinit') ){
					if( _frame.infos['__' + type + '_init'] )
						_frame.infos['__' + type + '_init']( contentDOM )
						
					contentDOM.data('is_infosinit', true)
						.on(eventName('transitionend','hide'), function(e){
							if( e.currentTarget == e.target && e.originalEvent.propertyName == 'opacity' && parseInt(contentDOM.css('opacity')) == 0 ){
								contentDOM.detach()
									.data('is_show', false)
									.trigger('hidden')
							}
						})
				}
				contentDOM.prependTo( this.dom.container )
					.trigger('show', [is_firstShow])
					.data('is_show', true)

				this.dom.main.scrollTop(0)

				//_p.initDOM( contentDOM )
				//this.curContent = hashcode
				this.curContent = type + '::' + id
			//}

		// 取消主导航上的当前项目状态
			if( _frame.app_main.cur_page ){
				//this.lastCurrentPage = _frame.app_main.cur_page

				// exit selection mode
					//_frame.app_main.mode_selection_off()
				
				Page.hide(_frame.app_main.cur_page)
				/*
				if( _frame.dom.navs[_frame.app_main.cur_page] )
					_frame.dom.navs[_frame.app_main.cur_page].removeClass('on')
				if( _frame.app_main.page_dom[_frame.app_main.cur_page] )
					_frame.app_main.page_dom[_frame.app_main.cur_page].addClass('off').trigger('pageHide').detach()
				_frame.app_main.cur_page = null
				*/
			}
		
		// 确定 theme
			//_frame.dom.main.attr('data-theme', cont.attr('data-theme') || type)
			_frame.dom.layout.attr('data-theme', cont.attr('data-theme') || type)

		setTimeout(function(){
			// 显示内容
				_frame.dom.layout.addClass('is-infos-on')
				
			//_frame.app_main.title = title
			//_g.title(title)
			
			//console.log( _frame.infos.last )
			
			if( _frame.infos.last != title )
				_ga.counter(
					location.search
				)
			
			_frame.infos.last = title
		}, 1)
	},

	hide: function(){
		if( !this.dom || !this.curContent )
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
			if( this.curContent )
				return false

		_frame.dom.layout.removeClass('is-infos-show')
		this.dom.main.attr({
			'data-infostype': 	'',
			'data-theme': 		''
		})
		//$(this).off('transitionend.infos_hide')
		this.historyLength = -1
		this.historyCurrent = -1
	},

	/*
	historyback: function(){
		this.dom.main.children().slice(1).remove()
		this.dom.main.children().eq(0).removeClass('off').addClass('fadein')
		this.dom.historyback.empty().removeClass('show')

		if( this.dom.main.children().eq(0).hasClass('ship') )
			this.dom.main.attr('data-infostype', 'ship')
		else if( this.dom.main.children().eq(0).hasClass('equipment') )
			this.dom.main.attr('data-infostype', 'equipment')
		else if( this.dom.main.children().eq(0).hasClass('fleet') )
			this.dom.main.attr('data-infostype', 'fleet')
		else if( this.dom.main.children().eq(0).hasClass('entity') )
			this.dom.main.attr('data-infostype', 'entity')
	},
	*/
	
	click: function(el){
		this.show(
			el.attr('data-infos'),
			el,
			el.attr('data-infos-nohistory')
		)
	},

	// 初始化
	init: function(){
		if( this.is_init )
			return true
	
		$body.on( 'click._infos', '[data-infos]', function(e){
				if( !(e.target.tagName.toLowerCase() == 'input' && e.target.className == 'compare') ){
					_frame.infos.click($(this))
	
					if( e.target.tagName.toLowerCase() == 'a' )
						e.preventDefault()
				}
			})
	
		this.is_init = true
		return true
	}
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
					mode:		'names',
					extraIllust:(t == 'illustrator')
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
			,isAircraft = $.inArray(_g.data.items[id].type, _g.data.item_type_collections[3].types) > -1

		_g.log(d)

		function _stat(stat, title){
			if( d['stat'][stat] ){
				if( d.type == 54 ){
					// 局地战斗机
					switch( stat ){
						case 'hit': 	title = '对爆';	break;
						case 'evasion': title = '迎击';	break;
					}
				}
				var html = '<small class="stat-'+stat+'">' + title + '</small>'
				switch(stat){
					case 'range':
						html+= '<em>' + _g.getStatRange( d['stat'][stat] ) + '</em>';
						break;
					case 'distance':
						html+= '<em>' + d['stat'][stat] + '</em>';
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
            let upgradable = d['upgrade_to'] && d['upgrade_to'].push && d['upgrade_to'].length ? true : false
			let title = $('<div class="title right-gutter"/>')
				.html(
					'<h2 data-content="' + d.getName() + '">' + d.getName() + '</h2>'
					+ '<small>'
						+ '<span data-tip="图鉴编号">No.' + d['id'] + '</span>'
						+ ( d['type']
							? ( d.getType()
								//+ `<em class="helper" data-tip="[[EQUIPABLE::${d['type']}]]">?</em>`
							): '' )
					+ '</small>'
					+ '<small>'
						+ '<small class="indicator '+(d['craftable'] ? 'true' : 'false')+'">'
							+ ( d['craftable'] ? '可开发' : '不可开发' )
						+ '</small>'
                        + `<small class="indicator ${d['improvable'] ? 'true' : 'false'}">${d['improvable'] ? '可改修' : '不可改修'}</small>`
                        + `<small class="indicator ${upgradable ? 'true' : 'false'}">${upgradable ? '可升级' : '不可升级'}</small>`
						+ (isAircraft
							? '<small class="indicator '+(d['rankupgradable'] ? 'true' : 'false')+'">'
									+ ( d['rankupgradable'] ? '可提升熟练度' : '无熟练度' )
								+ '</small>'
							: ''
						)
					+ '</small>'
				).appendTo(dom)
		
		// 可装备于
			/*
			$('<div class="equipable"/>')
				.append(
					$('<button/>', {
						'type': 	'button',
						'class': 	'button-equipable'
						'html': 	'查询可装备舰娘',
						'data-equipment-type': d['type']
					}).on('click', showEquipable)
				)
				.appendTo( title )
				*/
			$('<button/>', {
				'type': 	'button',
				'class': 	'button-equipable',
				'html': 	'可装备于...',
				'data-equipment-type': d['type']
			}).appendTo( title.find('small').eq(0) )

		// 属性
			var stats = $('<div class="stats"/>')
							.html('<h4 data-content="属性">属性</h4>')
							.appendTo(dom)
				,stat_container = $('<div class="stat right-gutter"/>').appendTo(stats)

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
			if( isAircraft )
				_stat('distance', '航程')
			
			if( !stat_container.html() )
				stat_container.html('<div class="no-content">无...</div>')

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

		// 废弃获得资源
			var dismantle = $('<div class="dismantle"/>')
							.html('<h4 data-content="废弃获得资源">废弃获得资源</h4>')
							.appendTo(dom)
			_g.resourcesTable.forEach(function(v, i){
				$(`<span class="${v}">${d.dismantle[i] || 0}</span>`).appendTo(dismantle)
			})

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

		// 可用于其他装备改修
			if( d['upgrade_for'] && d['upgrade_for'].push && d['upgrade_for'].length ){
				var upgrade_for = $('<div class="upgrade-for"/>')
								.html('<h4 data-content="可用于改修其他装备">可用于改修其他装备</h4>')
								.appendTo(dom)
					,upgrade_for1 = $('<div class="stat upgrade"/>')
						.appendTo(upgrade_for)
				d['upgrade_for'].forEach(function(currentValue){
					_tmpl.link_equipment(currentValue).appendTo( upgrade_for1 )
				})
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
				equipped_container.addClass('no no-content').html('暂无初始配置该装备的舰娘...')
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


_frame.infos.__equipment_init = function( $el ){  
    function showEquipable( e ){
        return modal.equipable.show( e.currentTarget.getAttribute('data-equipment-type') )
    }
    
    $el.on('click.equipable', 'button[data-equipment-type]', showEquipable)
};
// 舰队配置
	_frame.infos.__fleet = function( id, el, d ){
		return (new InfosFleet(id, el, d)).el
	}









class InfosFleet{
	constructor( id, el, d ){
		this.el = el || $('<div/>')
		this.el.addClass('infos-fleet infosbody loading')
				.attr({
					'data-infos-type':	'fleet',
					'data-infos-title':	'舰队 ('+id+')'
				})
		
		this.doms = {}
		this.fleets = []
		//this._updating = false
		//this.is_init = false
		this.tip_hqlv_input = '输入 0 表示采用默认等级 (Lv.%1$d)'
		
		if( d ){
			this.init(d)
		}else{
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
						if( _frame.infos.curContent == 'fleet::' + id ){
							if( docs.length ){
								this.init(docs[0])
							}else{
								try{
									this._infos_state_id = id
									this.init(TablelistFleets.prototype.new_data(JSON.parse(LZString.decompressFromEncodedURIComponent(_g.uriSearch('d')))))
								}catch(e){
									_g.error(e)
								}
								/*
								_db.fleets.insert(
									TablelistFleets.prototype.new_data(JSON.parse(LZString.decompressFromEncodedURIComponent(_g.uriSearch('d')))),
									function(err, newDoc){
										if(err){
											_g.error(err)
										}else{
											if( _frame.infos.curContent == 'fleet::' + id )
												this.init(newDoc)
										}
									}.bind(this)
								)*/
							}
						}else{
							el.remove()
							delete _frame.infos.contentCache.fleet[id]
						}
					}
				}.bind(this))
			}
		}

		InfosFleet.cur = this
	}



	// 初始化内容
	init( d ){
		if( !d )
			return false

		this.el.on({
			'show': function(e, is_firstShow){
					this.is_showing = true
					if( InfosFleetShipEquipment.cur )
						InfosFleetShipEquipment.cur.trigger('blur')
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
					if( this.is_init ){
						this.updateURI()
					}
					/*
					if( InfosFleetShipEquipment.cur ){
						InfosFleetShipEquipment.cur.removeClass('is-hover')//.trigger('tiphide')
						InfosFleetShipEquipment.cur = null
					}
					*/
				}.bind(this),
			'hidden': function(){
					this.is_showing = false
					if( InfosFleetShipEquipment.cur )
						InfosFleetShipEquipment.cur.trigger('blur')
				}
			/*,
			'click': function(){
					if( InfosFleetShipEquipment.cur ){
						InfosFleetShipEquipment.cur.removeClass('is-hover')//.trigger('tiphide')
						InfosFleetShipEquipment.cur = null
					}
			}*/
		})
		.on('focus.number_input_select', 'input[type="number"]:not([readonly])', function(e){
			e.currentTarget.select()
		})
		/*
		.on('click', '.equipment', function(e){
			if( InfosFleetShipEquipment.cur && InfosFleetShipEquipment.cur[0] != e.currentTarget ){
				InfosFleetShipEquipment.cur.removeClass('is-hover').trigger('tiphide')
				InfosFleetShipEquipment.cur = null
			}
		}.bind(this))
		.on('click', ':not(.equipment)', function(){
			if( InfosFleetShipEquipment.cur ){
				InfosFleetShipEquipment.cur.removeClass('is-hover').trigger('tiphide')
				InfosFleetShipEquipment.cur = null
			}
		}.bind(this))
		*/

		/*
			this.doms.warning = $('<div/>',{
					'class':	'warning',
					'html':		'功能移植/测试中，请勿日常使用'
				}).appendTo( this.el
		*/

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
								//this.update_data({})
								this.doms['name'].trigger('namechange')
							}.bind(this),
							'focus': function(){
								//console.log('focus')
								if( this.doms['name'].text() == '点击编辑标题' )
									this.doms['name'].html('')
							}.bind(this),
							'blur': function(){
								//console.log(document.activeElement == this.doms['name'][0], 'blur')
								if( !this.doms['name'].text() )
									this.doms['name'].html('点击编辑标题')
							}.bind(this),
							'namechange': function(e, content){
								if( typeof content == 'undefined' ){
									content = this.doms['name'].text()
								}
								if( content != this.doms['name'].html() )
									this.doms['name'].html(content)
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
								setTimeout(function(){
									if( !this.doms['name'].text() )
										this._name = ''
								}.bind(this), 100)
							}.bind(this)
						})
				)
				.append(
					this.doms['preview'] = $('<div class="preview"/>')
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
							.on({
								'mouseenter mouseleave': function(e){
									if( _p.tip.is_showing && !_p.tip.timeout_fade && this.doms['hqlvOption'].is(':focus') ){
										e.stopImmediatePropagation()
										e.stopPropagation()
									}
								}.bind(this)
							})
							.append(
								this.doms['hqlvOption'] = $('<input/>',{
										'type':		'number',
										'min':		0,
										'max':		_g.shipMaxLv,
										'placeholder': defaultHqLv
									})
									.val(this._hqlv || defaultHqLv)
									.on({
										'input': function(){
											this._hqlv = this.doms['hqlvOption'].val()
										}.bind(this),
										'focus.tipshow': function(){
											this.doms['hqlvOption'].trigger('tipshow')
										}.bind(this),
										'blur.tiphide': function(){
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
							this.doms['exportOption'] = $('<button class="option mod-dropdown"/>').html('分享').on('click', function(){
								if( !InfosFleet.menuExport ){
									let menuitems = []
									if( !_g.isClient || _g.isOnline ){
										menuitems.push($('<div class="item"/>')
											.html(
												'分享当前配置' + (!_g.isClient ? '<small>可直接分享网址</small>' : '' )
											)
											.add(
												(new ShareBar({
													title: function(){
														return InfosFleet.menuCur.data.name
													},
													summary: '分享自 是谁呼叫舰队（ http://fleet.moe ）',
													sites: [
														'tsina',		// 微博
														'tqq',			// 腾讯微博
														'cqq',			// QQ好友
														'twitter',
														'tieba'			// 百度贴吧
													],
													uid:	1552359,
													modifyItem: function(el){
														el.addClass('menuitem')
													},
													url: 	function(){
														return InfosFleet.menuCur.url
													}
												})).el.addClass('item')
											)
											.add($('<hr/>'))
										)
									}
									if( _g.isClient ){
										menuitems.push($('<menuitem/>',{
													'html':		'在浏览器中打开当前配置'
												}).on('click', function(){
													node.gui.Shell.openExternal( InfosFleet.menuCur.url );
												}))
									}
									menuitems = menuitems.concat([
										$('<menuitem/>',{
												'html':		'导出配置代码'
											}).on('click', function(){
												InfosFleet.menuCur.modalExport_show()
											}),
										$('<menuitem/>',{
												'html':		'导出配置文本'
											}).on('click', function(){
												InfosFleet.menuCur.modalExportText_show()
											})
									])
									if( _g.isNWjs ){
										menuitems.push($('<menuitem/>',{
													'html':		'生成图片'
												}).on('click', function(){
													InfosFleet.menuCur.exportPic()
												}))
									}
									InfosFleet.menuExport = new _menu({
										'className': 'contextmenu-infos_fleet_themes',
										'items': menuitems
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
					$('<input/>',{
							'type': 	'radio',
							'name': 	'fleet_' + d._id + '_tab',
							'id': 		'fleet_' + d._id + '_tab_' + i,
							'value': 	i
						}).prop('checked', (i == 0)).prependTo( this.el )

					this.fleets[i] = new InfosFleetSubFleet(
						this,
						[],
						i,
						$('<label/>',{
								'for': 		'fleet_' + d._id + '_tab_' + i,
								'data-fleet':i,
								'html': 	'#' + (i+1)
							}).appendTo( this.doms['tabs'] )
					)

					this.fleets[i].el
						.attr('data-fleet', i)
						.appendTo( this.doms['ships'] )

					i++
				}
			
			// 基地航空队
				$('<input/>',{
						'type': 	'radio',
						'name': 	'fleet_' + d._id + '_tab',
						'id': 		'fleet_' + d._id + '_tab_airfileds',
						'value': 	4
					}).prop('checked', false).prependTo( this.el )
					
				this.fleet_airfileds = new InfosFleetSubAirfield(
					this,
					[],
					$('<label/>',{
							'for': 		'fleet_' + d._id + '_tab_airfileds',
							'data-fleet':4,
							'html': 	'基地'
						}).appendTo( this.doms['tabs'] )
				)

				this.fleet_airfileds.el
					.attr('data-fleet', 4)
					.appendTo( this.doms['ships'] )
			
			// 预览模式
				if( !this.data._id ){
					this.el.addClass('mod-preview')
					this.doms['preview']
						.html('若要编辑配置或保存以备日后查看，请')
						.append( $('<button/>',{
								'html':		'保存配置'
							}).on('click', function(){
								this.previewSave()
							}.bind(this)) )
					
					this.doms['name'].removeAttr('contenteditable')
					this.doms['hqlvOptionLabel'].data('tip', '若要编辑配置或保存以备日后查看，<br/>请点击上方的“保存配置”按钮' )
					this.doms['hqlvOption'].prop('readonly', true)
				}

		// 根据数据更新DOM
			this.update( d )
		
		this._theme = this._theme
		
		// 事件: 默认司令部等级更新
			$body.on('update_defaultHqLv.fleet'+this.data._id, function(e, val){
				//if( this.el.data('is_show') ){
				if( this.is_showing ){
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
				this.doms['name'].html(d['name']).trigger('namechange',[d['name']]).trigger('blur')

		// 分舰队
			if( d['data'] && d['data'].push ){
				d['data'].forEach(function(currentValue, i){
					//_g.log(currentValue)
					if( i == 4 ){
						this.fleet_airfileds.updateEl(currentValue)
					}else{
						this.fleets[i].updateEl(currentValue)
					}
				}, this)
			}
		
		this._updating = false
	}



	// 每个操作都会更新数据，并触发更新数据库倒计时
	update_data( d ){
		d = d || {}
		this.update(d)
	}
	
	
	// 保存预览配置到本地
		previewSave(){
			_db.fleets.insert(
				TablelistFleets.prototype.new_data( this.data ),
				function(err, newDoc){
					if(err){
						_g.error(err)
					}else{
						this.el.attr({
							'data-infos-id':	newDoc._id
						})
						_frame.infos.curContent = 'fleet::' + newDoc._id
						let newEl = _frame.infos.__fleet( newDoc._id, null, newDoc )
						_frame.infos.contentCache.fleet[newDoc._id] = newEl
						_frame.infos.contentCache.fleet[this._infos_state_id] = newEl
						newEl.insertBefore(this.el)
						this.el.remove()
						delete this
						
						_g.badgeMsg('舰队配置已保存')
						//this._infos_state_id = id'fleet::' + id
					}
				}.bind(this)
			)
		}



	// 更新数据库



	
	// 舰队名
		get _name(){
			return this.data['name']
		}
		set _name( value ){
			this.data['name'] = value
			
			//if( value != this.doms['name'].html() )
			//	this.doms['name'].html(value)

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
			//_frame.dom.main.attr('data-theme', this.data['theme'])
			_frame.dom.layout.attr('data-theme', this.data['theme'])
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
	
	// Web Version - 更新URI Search
		updateURI(){
			if( !_g.isNWjs && this.data._id && _g.uriSearch() ){
				let d = $.extend(true, {}, this.data)
					,_id = d._id
				delete d._id
				delete d.time_create
				delete d.time_modify
				delete d.rating
				delete d.user
				history.replaceState(
					history.state,
					document.title,
					location.pathname + '?i=' + _id + '&d=' + LZString.compressToEncodedURIComponent( JSON.stringify( d ) )
				);
			}
		}
	
	// 获取URL
		get url(){
			if( this.data._id ){
				let d = $.extend(true, {}, this.data)
					,_id = d._id
				delete d._id
				delete d.time_create
				delete d.time_modify
				delete d.rating
				delete d.user
				return 'http://fleet.moe/fleets/build/?i=' + _id + '&d=' + LZString.compressToEncodedURIComponent( JSON.stringify( d ) )
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
				this.data.data[4] = this.fleet_airfileds.data
				InfosFleet.clean(this.data.data)
				
				// 更新时间
				this.data.time_modify = _g.timeNow()
				
				// Web Version - 更新URI Search
				this.updateURI()
				
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
			}else{
				InfosFleet.clean(this.data.data)
				// Web Version - 更新URI Search
				this.updateURI()
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
						'click': function(e, windowWidth, windowHeight, isMaxmize){
							InfosFleet.fileDialog_export.data({
									'windowWidth':	windowWidth,
									'windowHeight': windowHeight,
									'isMaxmize':	isMaxmize
								});
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
								if( InfosFleet.fileDialog_export.data('isMaxmize') )
									node.win.maximize()
								InfosFleet.fileDialog_export.data({
										'windowWidth':	null,
										'windowHeight': null,
										'isMaxmize':	null
									})
								_g.zoom(Scale.cur);
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
						}, 1000)
				})
			}
			// 存储当前窗口尺寸
				_g.zoom(1);
				let windowWidth = $window.width()
					,windowHeight = $window.height()
					,isMaxmize = $html.hasClass('window-maxmize')
			
			// 改变样式
				if( isMaxmize )
					node.win.unmaximize()
				$body.addClass('mod-capture')
				node.win.resizeTo( 1280, 720 )
			
			// 选择文件
				setTimeout(function(){
					InfosFleet.fileDialog_export.trigger('click', [windowWidth, windowHeight, isMaxmize])
				}, 200)
		}
	
	// 删除配置
		remove(){
			InfosFleet.modalRemove_show(this)
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
			'classname': 	'infos_fleet infos_fleet_export',
			'detach':		true
		}
	)
}
InfosFleet.modalExportText_show = function(data){
	if( !data )
		return false
	
	let text = ''
		,fleets = InfosFleet.decompress(data.data).filter(function(value){
						return (value && value.length)
					}) || []
	
	text+= data.name || ''
	
	fleets.forEach(function(fleet, i){
		//console.log(fleet)
		text+= (text ? '\n' : '')
			+ ( fleets.length > 1 ? '\n第 ' + (i+1) + ' 舰队' : '')
		fleet.filter(function(value){
			return (value && value[0] && value.length > 0)
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
		+ '* 创建自 是谁呼叫舰队 (fleet.moe)'

	_frame.modal.show(
		InfosFleet.modalExport(text),
		'导出配置文本',
		{
			'classname': 	'infos_fleet infos_fleet_export mod-text',
			'detach':		true
		}
	)
}
InfosFleet.modalRemove_show = function(id, is_list){
	if( typeof id == 'undefined' )
		return 
	
	let infosFleet
	if( id instanceof InfosFleet ){
		infosFleet = id
		id = infosFleet.data._id
	}

	if( !InfosFleet.elModalRemove ){
		InfosFleet.elModalRemove = $('<form/>')
			.append(
				InfosFleet.elModalRemoveId = $('<input name="id" type="hidden"/>')
			)
			.append(
				$('<p/>').html('是否删除该舰队配置？')
			)
			.append(
				$('<p class="actions"/>')
					.append(
						$('<button/>',{
							'type':		'submit',
							'class':	'button',
							'html':		'是'
						})
					)
					.append(
						$('<button/>',{
							'type':		'button',
							'class':	'button',
							'html': 	'否'
						}).on('click', function(){
							_frame.modal.hide()
						})
					)
			).on('submit', function(e){
				e.preventDefault()
				let _id = InfosFleet.elModalRemoveId.val()
				if( _id ){
					_frame.app_main.loading_start('remove_fleet_'+_id, false)
					_db.fleets.remove({
						_id: _id
					}, { multi: true }, function (err, numRemoved) {
						_g.log('Fleet ' + _id + ' removed.')
						_frame.app_main.loading_complete('remove_fleet_'+_id)
						_frame.modal.hide()
						_g.badgeMsg('已删除配置')
						if( is_list && is_list instanceof TablelistFleets ){
							is_list.refresh()
						}else{
							_frame.dom.navs.fleets.click()
						}
					});
				}
				return false
			})
	}
	
	InfosFleet.elModalRemoveId.val(id)

	_frame.modal.show(
		InfosFleet.elModalRemove,
		'删除配置',
		{
			'classname': 	'infos_fleet infos_fleet_remove',
			'detach':		true
		}
	)
}
InfosFleet.clean = function(arr){
	if( !arr )
		return
	function _clean(array){
		if( array && array.length ){
			array.forEach(function(v, i){
				if( v && v.push ){
					_clean(v)
				}else if( i == array.length - 1 && v === null ){
					array.pop()
					_clean(array)
				}
			})
		}
	}
	_clean(arr)
	return arr
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
	constructor(infosFleet, d, index, label){
		d = d || []
		this.data = d

		this.el = $('<dl class="fleetships"/>')
		this.label = label
		
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
						.html('运输TP')
						.append(
							this.elSummaryTP = $('<strong/>').html('-')
						)
				)
				*/
		
		this.infosFleet = infosFleet

		//this.updateEl()
		
		// 事件: 默认司令部等级更新
			$body.on('update_defaultHqLv.fleet'+infosFleet.data._id+'-'+(index+1), function(){
				if( this.infosFleet.is_showing )
				//if( this.infosFleet.el.data('is_show') )
					this.summaryCalc(true)
			}.bind(this))
	}


	// 更新元数据
	
	// 根据元数据更新页面元素
		updateEl(d){
			this.data = d || this.data
			let count = 0
			if( d )
				d.forEach(function(sd, i){
					this.ships[i].updateEl(sd)
					if( sd && sd.push && sd[0] )
						count++
				}, this)
			
			if( count ){
				this.label.addClass('highlight')
			}else{
				this.label.removeClass('highlight')
			}
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
						//,tp = 0
					
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
							
							// TP
								//tp+= shipdata.calculate('TP')
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
					
					//this.elSummaryTP.html( tp > 1 ? Math.floor(tp) : '-' )
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
			let count = 0
			this.data = this.data || []
			
			this.ships.forEach(function(d,i){
				this.data[i] = d.data
				if( d.data && d.data[0] )
					count++
			}, this)
			
			console.log( this.count )
			
			if( count ){
				this.label.addClass('highlight')
			}else{
				this.data = null
				this.label.removeClass('highlight')
			}
			
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
		
		this.el = $('<dd class="ship"/>')
			// 头像 & 名称
			.append(
				$('<dt/>')
					.append(
						this.elAvatar = $('<s touch-action="none"/>')
					)
					.append(
						this.elInfos = $('<div/>').html('<span>' + (this.infosFleet.data._id ? '选择舰娘' : '无舰娘' ) + '...</span>')
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
													'max':	_g.shipMaxLv
												}).on({
													'change': function(e){
														let value = this.elInputLevel.val()
														
														if( (typeof value == 'undefined' || value === '') && this.data[1][0] )
															this.shipLv = null
														
														value = parseInt(value)
														if( value < 0 ){
															value = 0
															this.elInputLevel.val(0)
														}else if( value > _g.shipMaxLv ){
															value = _g.shipMaxLv
															this.elInputLevel.val(_g.shipMaxLv)
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
					.append(
						_huCss.csscheck_full('mask-image')
							? null
							: $('<div class="bg"/>')
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
		
		this.after = $('<s/>')
		
		this.els = this.el.add(this.after)
		
		if( this.infosFleet.data._id ){
			// 事件
			this.el.on({
					// [点击] 无舰娘时，选择舰娘
						'click': function(){
							if( !this.data[0] )
								this.selectShipStart()
						}.bind(this),
						
						//'mouseenter': function(e){
						'pointerenter': function(){
							InfosFleetShip.dragEnter(this)
						}.bind(this)
				})
			this.elAvatar.on({
					//'mousedown': function(e){
					'pointerdown': function(e){
						e.preventDefault()
						if( this.data[0] ){
							document.activeElement.blur()
							InfosFleetShip.dragStart( this )
						}
					}.bind(this)
				})
		}else{
			this.elInputLevel.prop('readonly', true)
		}
		
		if( !_huCss.csscheck_full('mask-image') ){
			this.el.addClass('mod-nomask')
		}

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
			return Formula.calculate( type, this.shipId, this.data[2], this.data[3], this.data[4] ) || '-'
			//return '-'
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
				//this.el.removeClass('noship')
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
				//this.el.addClass('noship')
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

	/*
	if( InfosFleetShipEquipment.cur ){
		InfosFleetShipEquipment.cur.removeClass('is-hover')//.trigger('tiphide')
		InfosFleetShipEquipment.cur = null
	}
	*/

	InfosFleetShip.dragging = infosFleetShip
	infosFleetShip.el.addClass('moving')
	
	if( !InfosFleetShip.isInit ){
		$body.on({
			//'mouseup.InfosFleetShip_dragend': function(){
			'pointerup.InfosFleetShip_dragend pointercancel.InfosFleetShip_dragend': function(){
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

	/*
	if( InfosFleetShipEquipment.cur ){
		InfosFleetShipEquipment.cur.removeClass('is-hover')//.trigger('tiphide')
		InfosFleetShipEquipment.cur = null
	}
	*/
	
	InfosFleetShip.dragging.swap(infosFleetShip_enter)
}







// 类：装备
class InfosFleetShipEquipment{
	constructor(infosParent, index, carry, equipmentTypes){
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

		// 直接对 infosParent.data 相关数据进行读写 

		this.index = index || 0
		this.isParentAirfield = infosParent instanceof InfosFleetAirfield
		this.infosParent = infosParent
		
		// 数据正在更新中，禁止触发任何存储操作
		//this._updating = false

		if( this.el )
			return this.el
		
		//this.el = $('<div class="equipment" touch-action="none" tabindex="0"/>')
		this.el = $('<div class="equipment" tabindex="0"/>')
					.on({
						/*
						'pointerenter': function(e){
							if( e.originalEvent.pointerType != 'touch' ){
								if( InfosFleetShipEquipment.cur )
									InfosFleetShipEquipment.cur.removeClass('is-hover')
								InfosFleetShipEquipment.cur = this.el.addClass('is-hover')
							}
						}.bind(this),
						'pointerup pointercancel': function(e){
							if( e.originalEvent.pointerType == 'touch' ){
								setTimeout(function(){
									if( InfosFleetShipEquipment.cur )
										InfosFleetShipEquipment.cur.removeClass('is-hover')//.trigger('tiphide')
									InfosFleetShipEquipment.cur
										= this.el.addClass('is-hover')
												//.trigger('tipshow')
								}.bind(this), bIOS ? 400 : 10)
							}
						}.bind(this),
						'pointerleave': function(e){
							if( e.originalEvent.pointerType != 'touch' ){
								this.el.removeClass('is-hover')
								//if( InfosFleetShipEquipment.cur )
								//	InfosFleetShipEquipment.cur.removeClass('is-hover')
								//InfosFleetShipEquipment.cur = null
							}
						}.bind(this)
						*/
						'focus': function(){
								InfosFleetShipEquipment.cur = this.el.addClass('is-hover')
							}.bind(this),
						'blur': function(){
								this.el.removeClass('is-hover')
								InfosFleetShipEquipment.cur = null
							}.bind(this),
						'pointerenter': function(e){
								if( e.originalEvent.pointerType != 'touch' ){
									InfosFleetShipEquipment.cur = this.el.addClass('is-hover')
											//.focus()
								}
							}.bind(this),
						'pointerleave': function(e){
								if( e.originalEvent.pointerType != 'touch' ){
									this.el.removeClass('is-hover')
											.blur()
									InfosFleetShipEquipment.cur = null
								}
							}.bind(this)
					})
					.append(
						this.elCarry = $('<div class="equipment-layer equipment-add"/>')
										.on('click', function(){
											this.selectEquipmentStart()
											//this.el.trigger('blur')
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
									'placeholder':	0,
									'min': 			0,
									'max': 			10
								}).on({
									'input': function(){
											let value = this.elInputStar.val()
											
											if( (typeof value == 'undefined' || value === '') && this.star )
												this.star = null
											
											value = parseInt(value)
											if( !isNaN(value) && this.star != value )
												this.star = value
										}.bind(this),
									'focus': function(){
											this.el.addClass('is-hover')
											console.log('focus')
										}.bind(this),
									'blur': function(){
											setTimeout(function(){
												if( !this.el.is(':focus') )
													this.el.removeClass('is-hover')
											}.bind(this), 10)
										}.bind(this)
								})			
							)
							.append(
								this.elSelectRank = $('<div/>',{
									'class':	'equipment-rankselect',
									'html': 	'<span>...</span>'
								}).on('click', function(){
									if( !this.el.hasClass('is-rankupgradable') )
										return
									if( !InfosFleet.menuRankSelect ){
										InfosFleet.menuRankSelectItems = $('<div/>')
										for(let i=0; i<8; i++){
											$('<button class="rank-' + i + '"/>')
												.html( !i ? '...' : '' )
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
									InfosFleet.menuRankSelect.show(this.elSelectRank/*, 0 - this.elSelectRank.width(), 0 - this.elSelectRank.height() - 5*/)
								}.bind(this))
							)
							.append(
								//this.elButtonInspect = $('<button class="inspect"/>').html('资料').on('click', function(){
								this.elButtonInspect = $('<span class="button inspect" icon="search"/>').on('click', function(){
									if( this.id )
										_frame.infos.show('[[EQUIPMENT::' + this.id + ']]')
								}.bind(this))
							)
							.append(
								//$('<button class="change"/>').html('更变').on('click',function(){
								$('<span class="button change" icon="loop"/>').on('click',function(){
									this.selectEquipmentStart()
								}.bind(this))
							)
							.append(
								$('<span class="button remove"/>')/*.html('×')*/.on('click',function(){
									this.id = null
								}.bind(this))
							)
					)
		
		if( carry )
			this.carry = carry
		
		if( equipmentTypes )
			this.equipmentTypes = equipmentTypes
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
					//TablelistEquipments.types = []
					//TablelistEquipments.shipId = null
					if( this.infosParent.infosFleet )
						_frame.infos.dom.main.attr('data-theme', this.infosParent.infosFleet.data['theme'])
				}.bind(this),
				callback_modeSelection_enter: function(){
					TablelistEquipments.types = this.equipmentTypes || _g.data.ships[this.infosParent.shipId].getEquipmentTypes()
					TablelistEquipments.shipId = this.infosParent.shipId
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
			return this.isParentAirfield
					? this.infosParent.data[this.index][0]
					: this.infosParent.data[2][this.index]
		}
		set id( value ){
			value = parseInt(value) || null
			//this.star = 0
			_p.tip.hide()
			this.el.removeData(['tip', 'tip-filtered'])
			
			if( !this.isParentAirfield && value != this.infosParent.data[2][this.index] )
				this.star = 0

			if( value && !isNaN(value) ){
				if( this.isParentAirfield )
					this.infosParent.data[this.index][0] = value
				else
					this.infosParent.data[2][this.index] = value
				this.improvable = _g.data.items[value].improvable || false
				this.el.attr({
							'data-equipmentid': value,
							'data-tip':			'[[EQUIPMENT::' +value+ ']]',
                            'touch-action':     'none'
						})
						//.addClass('equiptypeicon mod-left mod-' + _g.data.items[value].getIconId())
						.css('background-image', 'url('+_g.data.items[value]._icon+')')
				this.elName.html(_g.data.items[value]._name)
				// 如果装备为飞行器，标记样式
					if( $.inArray(_g.data.items[value].type, Formula.equipmentType.Aircrafts) > -1 ){
						this.el.addClass('is-aircraft')
						if( _g.data.items[value].rankupgradable )
							this.el.addClass('is-rankupgradable')
					}else
						this.el.removeClass('is-aircraft is-rankupgradable')
				// 基地航空队 - 如果选择为侦察机，搭载修改为4
				if( this.isParentAirfield ){
					if( Formula.equipmentType.Recons.indexOf( _g.data.items[value].type ) > -1 )
						this.carry = 4
					else
						this.carry = 18
				}
			}else{
				if( this.isParentAirfield ){
					this.infosParent.data[this.index][0] = null
					this.carry = 18
				}else
					this.infosParent.data[2][this.index] = null
				this.improvable = false
				this.el.removeAttr('data-equipmentId')
						.removeAttr('data-tip')
						.removeAttr('data-star')
						.removeAttr('data-rank')
						.removeAttr('touch-action')
						.css('background-image', '')
						.removeClass('is-aircraft is-rankupgradable')
				this.elName.html('')
			}
			
			if( this.isParentAirfield )
				this.infosParent.summaryCalc()
			else
				this.infosParent.infosFleetSubFleet.summaryCalc()
				
			this.save()
		}
	
	// 改修星级
		get star(){
			return this.isParentAirfield ? 0 : this.infosParent.data[3][this.index]
		}
		set star( value ){
			let update = function( value ){
				if( this.isParentAirfield )
					//this.infosParent.data[this.index][2] = value
					this.infosParent.data[this.index][2] = 0
				else
					this.infosParent.data[3][this.index] = value
			}.bind(this)
			if( this._improvable ){
				value = parseInt(value) || null
				
				if( value > 10 )
					value = 10
				
				if( value < 0 )
					value = 0
				
				if( value ){
					update(value)
					this.elInputStar.val( value )
					this.elStar.html(value)
					this.el.attr('data-star', value)
				}else{
					update(null)
					this.elInputStar.val('')
					this.elStar.html(0)
					this.el.attr('data-star', '')
				}
				
			}else{
				update(null)
				this.el.removeAttr('data-star')
			}
			
			if( this.isParentAirfield )
				this.infosParent.summaryCalc()
			else
				this.infosParent.infosFleetSubFleet.summaryCalc()
				
			this.save()
		}
	
	// 熟练度
		get rank(){
			return this.isParentAirfield
					? this.infosParent.data[this.index][1]
					: this.infosParent.data[4][this.index]
		}
		set rank( value ){
			let update = function( value ){
				if( this.isParentAirfield )
					this.infosParent.data[this.index][1] = value
				else
					this.infosParent.data[4][this.index] = value
			}.bind(this)
			if( this.id && $.inArray(_g.data.items[this.id].type, Formula.equipmentType.Aircrafts) > -1 ){
				value = parseInt(value) || null
				
				if( value > 7 )
					value = 7
				
				if( value < 0 )
					value = 0
				
				if( value ){
					update(value)
					this.el.attr('data-rank', value)
				}else{
					update(null)
					this.el.attr('data-rank', '')
				}
				
			}else{
				update(null)
				this.el.removeAttr('data-rank')
			}
			
			if( this.isParentAirfield )
				this.infosParent.summaryCalc()
			else
				this.infosParent.infosFleetSubFleet.summaryCalc()

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
			if( this.isParentAirfield || !value ){
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
			if( this.infosParent ){
				//this.infosParent.data[2][this.index] = this.id
				//this.infosParent.data[3][this.index] = this.star
				this.infosParent.save()
			}
		}
}








// 类：基地航空队
class InfosFleetSubAirfield{
	constructor(infosFleet, d, label){
		d = d || []
		this.data = d
		this.label = label

		this.el = $('<dl class="fleetships fleetairfields"/>')
		this.container = $('<dl class="airfields"/>').appendTo( this.el )
		
		this.fields = []

		// 3个机场
			let i = 0
			while( i < 3 ){
				this.fields[i] = new InfosFleetAirfield(infosFleet, this, i)
				this.fields[i].getEl().appendTo( this.container )
				i++
			}
		
		// tips
			$('<dl class="gap"/>').appendTo(this.el)
			let tips = [
				'“航程”决定了该航空队在出击时所能抵达的最远作战点，数值由航程属性最小的中队决定，侦察机也可以提高这一数值。',
				'“制空战力”表示该航空队执行出击任务时的制空能力，“防空战力”则表示防空任务能力。',
				'局地战斗机的“迎击”属性也可以提高制空战力。装备列表中局战的“回避”列数值即为“迎击”属性。',
				'除了局地战斗机的“迎击”和“对爆”属性外，在航空队种配置侦察机也可以有效提高防空战力。'
			]
			$('<dl class="tips"/>')
				.html(`
					<ul class="tip-content">
						<h4 data-content="小贴士">小贴士</h4>
						${tips.map((tip)=>{
							return `<li>${tip}</li>`
						}).join('')}
					</ul>
				`)
				.appendTo(this.el)

		this.infosFleet = infosFleet

		//this.updateEl()
	}


	// 更新元数据
	
	// 根据元数据更新页面元素
		updateEl(d){
			this.data = d || this.data
			let count = 0
				
			if( d )
				d.forEach(function(fd, i){
					this.fields[i].updateEl(fd)
					if( fd && fd.push )
						fd.forEach(function(a){
							if( a && a.push && a[0] )
								count++
						})
				}, this)
			
			if( count ){
				this.label.addClass('highlight')
			}else{
				this.label.removeClass('highlight')
			}
		}
	
	// 获取当前状态的元数据
		getData(){
			return this.data
		}
	
	// 保存
		save(){
			// 如果该子舰队下没有任何数据，则存储数据时不传输该子舰队数据
			//let allEmpty = true
			this.data = this.data || []
			let count = 0
			
			this.fields.forEach(function(field,i){
				this.data[i] = field.data
				if( field.data && field.data.push )
					field.data.forEach(function(a){
						if( a && a.push && a[0] )
							count++
					})
				//field.data.forEach(function(d, j){
				//	console.log( d )
				//	if( d[0] )
				//		allEmpty = false
				//})
			}, this)
			//console.log( field.data, allEmpty )
			
			if( count ){
				this.label.addClass('highlight')
			}else{
				this.label.removeClass('highlight')
			}
			//if( allEmpty )
			//	this.data = null
			
			if( this.infosFleet )
				this.infosFleet.save()
		}
}







// 类：基地航空队机场
class InfosFleetAirfield{
	constructor(infosFleet, infosParent, index, d){
		/**
		 * [
		 * 		[装备ID, 熟练度, 改修星级],
		 * 		[装备ID, 熟练度, 改修星级],
		 * 		[装备ID, 熟练度, 改修星级],
		 * 		[装备ID, 熟练度, 改修星级]
		 * ]
		 */
		
		// 数据正在更新中，禁止触发任何存储操作
		//this._updating = false

		if( this.el )
			return this.el

		d = d || [[], [], [], []]
		this.data = d
		this.infosFleet = infosFleet
		this.infosParent = infosParent
		this.aircrafts = []
		this.index = index
		//this.isSortie = true
		
		let no = [
			'一',
			'二',
			'三'
		]
		
		this.el = $('<dd class="airfield"/>')
			.append(
				$('<h4/>',{
					'html': 		`第${no[index]}航空队`,
					'data-content': `第${no[index]}航空队`
				})
			)
			/*
			.append(
				$('<label class="switch-mission"/>')
					.append(
						$('<input/>',{
							type: 	'checkbox',
							checked:true
						})
					)
			)
			*/
			.append(
				$('<div class="aircrafts"/>')
					.append(
						function(){
							let els = $()
							for( let i=0; i<4; i++ ){
								this.aircrafts[i] = new InfosFleetShipEquipment(
									this,
									i,
									18, // carry slot
									InfosFleetAirfield.equipmentTypes // equipment types
								)
								els = els.add(this.aircrafts[i].el)
							}
							return els
						}.bind(this)
					)
			)

		this.elSummary = $('<span class="summary"/>')
			//.html('<h4 data-content="舰队数据">舰队数据</h4>')
			.appendTo(
				$('<div class="airfield-summary"/>').appendTo(this.el)
			)
			.append(
				$('<span class="summary-item"/>')
					.html('航程')
					.append(
						this.elSummaryDistance = $('<strong/>').html('-')
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
					.html('防空战力')
					.append(
						this.elSummaryFighterPowerAA = $('<strong/>').html('-')
					)
			)
		
		this.els = this.el

		//this.updateEl()
	}
	
	// 返回页面元素
		getEl(){
			return this.els
		}

	// 更新元数据
	
	// 根据元数据更新页面元素
		updateEl(d){
			this._updating = true
			
			this.data = d || this.data
			
			for( let i = 0; i<4; i++ ){
				if( !this.data[i] )
					this.data[i] = []
				else{
					if( this.data[i][0] )
						this.aircrafts[i].id = this.data[i][0]
					if( this.data[i][1] )
						this.aircrafts[i].rank = this.data[i][1]
					//if( this.data[i][2] )
					//	this.aircrafts[i].star = this.data[i][2]
					if( this.data[i][2] )
						this.aircrafts[i].star = 0
				}
			}
			
			this._updating = false
		}
	
	// 获取当前状态的元数据
		getData(){
			return this.data
		}
	
	// 获取搭载量
		getCarry( equipment ){
			if( Formula.equipmentType.Recons.indexOf( equipment.type ) > -1 )
				return 4
			else
				return 18
		}
	
	// 更新属性总览
		summaryCalc(){
			if( this.summaryCalculating || !this.data || !this.data.push )
				return false
			
			this.summaryCalculating = setTimeout(function(){			
				let fighterPower = [0, 0]
					,distance = {
						min: 0,
						max: 0,
						recon: 0
					}
					,fighterPowerAA = [0, 0]
					,dataFighterPowerAA = []
				
				this.data.forEach(function( d ){
					if( d[0] ){
						let e = _g.data.items[d[0]]
							,carry = this.getCarry(e)
							,fp = Formula.calc.fighterPower( e, carry, d[1], d[2] )
							,_distance = e.stat.distance || 0
							
						fighterPower[0]+= fp[0]
						fighterPower[1]+= fp[1]
						
						if( Formula.equipmentType.Recons.indexOf( e.type ) > -1 ){
							distance.recon = Math.max( distance.recon, _distance )
						}else{
							distance.min = distance.min <= 0 ? _distance : Math.min( distance.min, _distance )
							distance.max = Math.max( distance.max, _distance )
						}

						dataFighterPowerAA.push({
							equipment: e,
							star: d[1],
							rank: d[2],
							carry: carry
						})
					}
				}, this)

				fighterPowerAA = Formula.calcByField.fighterPowerAA(dataFighterPowerAA)

				let renderMinMax = (data, dom) => {
					if( Math.max( data[0], data[1] ) > 0 ){
						let val1 = Math.floor(data[0])
							,val2 = Math.floor(data[1])
						dom.removeClass('empty').html(
							val1 == val2
								? val1
								: val1 + '~' + val2
						)
					}else{
						dom.addClass('empty').html( '-' )
					}
				}

				renderMinMax(fighterPower, this.elSummaryFighterPower)
				renderMinMax(fighterPowerAA, this.elSummaryFighterPowerAA)

				// 航程计算
				if( distance.min + distance.recon > 0 ){
					let val = distance.min
					if( distance.recon ){
						/*
						val+= ` + ${
							Math.round(Math.min(
								3,
								Math.max(
									0,
									Math.sqrt( distance.recon - distance.min )
								)
							))
							}`
						*/
						val+= Math.round(Math.min(
								3,
								Math.max(
									0,
									Math.sqrt( distance.recon - distance.min )
								)
							))
					}
					this.elSummaryDistance.removeClass('empty').html(val)
				}else{
					this.elSummaryDistance.addClass('empty').html( '-' )
				}
				
				this.summaryCalculating = null
			}.bind(this), 10)
			
			return true
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
	
	// 保存
		save(){
			if( this._updating )
				return false

			if( !this._updateTimeout ){
				this._updateTimeout = setTimeout(function(){
			
					if( this.infosParent ){
						this.infosParent.save()
					}
					this._updateTimeout = null
				}.bind(this), 50)
			}
		}
}
InfosFleetAirfield.dragStart = function(InfosFleetAirfield){
	if( InfosFleetAirfield.dragging || !InfosFleetAirfield )
		return false

	InfosFleetAirfield.dragging = InfosFleetAirfield
	InfosFleetAirfield.el.addClass('moving')
	
	if( !InfosFleetAirfield.isInit ){
		$body.on({
			'pointerup.InfosFleetAirfield_dragend pointercancel.InfosFleetAirfield_dragend': function(){
				if( InfosFleetAirfield.dragging ){
					InfosFleetAirfield.dragging.el.removeClass('moving')
					InfosFleetAirfield.dragging.save()
					InfosFleetAirfield.dragging = null
				}
			}
		})
		InfosFleetAirfield.isInit = true
	}
}
InfosFleetAirfield.dragEnter = function(infosFleetAirfield_enter){
	if( !InfosFleetAirfield.dragging || !infosFleetAirfield_enter || InfosFleetAirfield.dragging == infosFleetAirfield_enter )
		return false
	
	InfosFleetAirfield.dragging.swap(infosFleetAirfield_enter)
}
//Formula.equipmentType.Aircrafts
InfosFleetAirfield.equipmentTypes = $.unique(
	Formula.equipmentType.LandBased
		.concat(Formula.equipmentType.Seaplanes)
		.concat(Formula.equipmentType.CarrierBased)
		.concat(Formula.equipmentType.Recons)
)
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
        if( typeof val != 'number' )
            val = parseInt(val)
        if( isNaN(val) || val < 0 )
            return '<small class="zero">?</small>'
		if( !show_zero && val == 0 )
			return '<small class="zero">-</small>'
		return val
	}

	function _add_stat( name, title, tar ){
		let val99, valMax

		switch( name ){
			case 'hp':
				val99 = _val( d.getAttribute('hp', 99) )
				valMax = _val( d.getAttribute('hp', _g.shipMaxLv) )
				break;
			case 'asw':
				val99 = _val( d.getAttribute('asw', 99), /^(5|8|9|12|24)$/.test(d['type']) )
				valMax = _val( d.getAttribute('asw', _g.shipMaxLv), /^(5|8|9|12|24)$/.test(d['type']) )
				break;
			case 'evasion':
			case 'los':
				val99 = _val( d.getAttribute(name, 99) )
				valMax = _val( d.getAttribute(name, _g.shipMaxLv) )
				break;
			case 'speed':
				val99 = _g.getStatSpeed( d['stat']['speed'] )
				break;
			case 'range':
				val99 = _g.getStatRange( d['stat']['range'] )
				break;
			case 'luck':
				val99 = d['stat']['luck'] + '<sup>' + _val(d['stat']['luck_max']) + '</sup>'
				valMax = (d['stat']['luck'] + 3) + '<sup>' + _val(d['stat']['luck_max']) + '</sup>'
				break;
			case 'fuel':
			case 'ammo':
				val99 = _val( d.getAttribute(name, 99) )
				valMax = _val( d.getAttribute(name, _g.shipMaxLv) )
				break;
			default:
				val99 = _val( d.getAttribute(name, 99) )
				break;
		}

		$('<span/>')
			.html(
				'<small class="stat-'+name+'">' + title + '</small>'
				+ '<em'+( valMax ? ' class="lvl99"' : '' )+'>' + val99 + '</em>'
				+ ( valMax ? '<em class="lvl150">' + valMax + '</em>' : '' )
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
									+ '<label for="'+lvlRadio150_id+'" class="lvl150">'+_g.shipMaxLv+'</label>'
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
					//,item_icon = 'assets/images/itemicon/'
					//				+ item_data.getIconId()
					//				+ '.png'
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
				icon.addClass('equiptypeicon mod-' + item_data.getIconId())
				//icon.css(
				//	'background-image',
				//	'url(' + item_icon + ')'
				//)
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
				,_additional_equipment_types = $('<div/>').html('<h4 data-content="额外装备类型">额外装备类型</h4>').appendTo(additional_equipment_types)
			d['additional_item_types'].forEach(function(currentValue){
				let _d = _g['data']['item_types'][currentValue]
				_additional_equipment_types.append(
					$('<span/>')
						.html(_d['name'][_g.lang])
						.addClass('equiptypeicon mod-left mod-'+_d['icon'])
						//.css({
						//	'background-image': 'url(assets/images/itemicon/'
						//			+ _d['icon']
						//			+ '.png'+')'
						//})
				)
			})
		}
	
	// 其他额外信息
		if( d['additional_night_shelling'] ){
			$('<div class="add_equip add_other"/>')
				.html(`<div>
					<h4 data-content="额外能力">额外能力</h4>
					<span>夜战炮击</span>
				</div>`).appendTo(dom)
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
			,illusts_wrapper = $('<div class="wrapper"/>').appendTo(illusts)
			,illusts_container = $('<div class="body"/>').appendTo(illusts_wrapper)

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
											+ (remodel_lvl ? '<strong>' + _val(remodel_lvl) + '</strong>' : '')
											+ (has_extra_illust ? '<em icon="hanger"></em>' : '')
						})
				)
				
				if( currentValue.next_loop )
					remodels_container.appendDOM(
						$('<span class="unit" icon="loop-alt3" data-tip="可在两个改造版本间切换"/>').html('&nbsp;')
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
                
                //,lastContainer
			function check_append( file, positionInPair ){
				//file = file.replace(/\\/g, '/')
				try{
					let stat = node.fs.lstatSync(file)
					if( stat && stat.isFile() ){
						index++
						let radioid = 'ship_' + d['id'] +'_illustrations_' + index
                            //,isSingle = ( !lastContainer && positionInPair == 1 )
						$('<input type="radio" name="ship_'+d['id']+'_illustrations" id="'+radioid+'" value="'+index+'"' + (index==1 ? ' checked' : '') + '/>')
							.prop('checked', (index == 1))
							.insertBefore(illusts_wrapper)
						$('<label for="'+radioid+'"/>').insertBefore(illusts_wrapper)
						//lastContainer =
                        $('<span/>')
							.html('<img src="'+file+'" data-filename="'+ship_name+' - '+index+'.webp"/>')
							//.css('background-image', 'url(' + file + ')')
							.appendTo(illusts_container)
                            //.addClass( isSingle ? 'mod-single' : '' )
					}else{
                        //if( lastContainer )
                        //    lastContainer.addClass('mod-single')
                    }
				}catch(e){
                    //if( lastContainer )
                    //    lastContainer.addClass('mod-single')
                }
			}
			illustrations.forEach(function(currentValue){
                //lastContainer = false
				check_append( node.path.normalize(_g.path.pics.ships) + currentValue + '/8.webp', 0 )
				check_append( node.path.normalize(_g.path.pics.ships) + currentValue + '/9.webp', 1 )
			})
            if( index % 2 )
                illusts.addClass('is-singlelast')
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


_frame.infos.__ship_init = function( $el ){
    
    // touch support for illustrations
        let x
            ,originalX = -1
            ,startX
            ,startY
            ,startTime
            ,deltaX
            ,deltaY
            ,isPanning = false
            ,isScrollSnap = ( _huCss.csscheck_full('scroll-snap-type') && !bFirefox )
            //,isScrollSnap = _huCss.csscheck_full('scroll-snap-type')
            //,isMoving = 0
            ,scrollLock = false
            ,mouseWheelLock = false
            ,illustMain = $el.find('.illustrations')
            ,illust = illustMain.find('.body')
            ,imgs = illust.children('span')
            //,s = imgs.eq(0)
            ,n = 'e'+_g.timeNow()
            ,labels = illustMain.children('label')
            ,inputs = illustMain.children('input[type="radio"]')
                        .on('change', function(e, scrollTime){
                            let i = parseInt( e.target.getAttribute('value') ) - 1
                            if( !labels.eq(i).is(':visible') ){
                                i--
                                inputs.eq(i).prop('checked', true)
                            }
                            if( isScrollSnap && !scrollLock ){
                                //illust.scrollLeft( imgs.eq(i)[0].offsetLeft )
                                scrollLock = true
                                illust.off('scroll')
                                    .animate({
                                        scrollLeft:		imgs.eq(i)[0].offsetLeft
                                    }, typeof scrollTime == 'undefined' ? 200 : scrollTime, function(){
                                        setTimeout(function(){
                                            scrollLock = false
                                            illust.on('scroll', scrollHandler)
                                        }, 50)
                                    })
                            }else{
                                
                            }
                        })
            ,illustWidth = 0
            ,inputCur = 0
            ,sCount = 1
            ,extraCount = 0
        
        function count(){
            inputCur = parseInt(inputs.filter(':checked').val()) - 1
            sCount = Math.ceil(inputs.length / labels.filter(':visible').length)
            extraCount = illustMain.hasClass('is-singlelast') && sCount == 2 ? 1 : 0
        }
        function countReset(){
            inputCur = 0
            sCount = 0
            extraCount = 0
        }
        
        function scrollStart(){
            originalX = illust.scrollLeft()
            illustWidth = illust.width()
            count()
        }
        function scrollHandler(){
            if( originalX >= 0 ){
                x = illust.scrollLeft()
                if( !isPanning ){
                    requestAnimationFrame(scrollX);
                }
                isPanning = true
            }
        }
        function scrollX(){
            let delta = x - originalX
                ,pDelta = (Math.floor(Math.abs(delta) / illustWidth) + (Math.abs(delta % illustWidth) > (illustWidth / 2) ? 1 : 0) )
                            * (x < originalX ? -1 : 1)
                //,pDelta = Math.abs(delta % illustWidth) > (illustWidth / 3) ? Math.ceil(delta / illustWidth) : Math.floor(delta / illustWidth)
            //console.log(delta, pDelta)
            isPanning = false
            //console.log( inputCur , pDelta , sCount )
            if( delta !== 0 ){
                let t = inputCur + pDelta * sCount
                if( t < 0 )
                    t = 0
                if( t + sCount > inputs.length + extraCount )
                    t = inputs.length - sCount
                //inputs.eq(t).prop('checked', true).trigger('change')
                inputs.eq(t).prop('checked', true)
            }
            //inputs.eq( Math.floor(x / (s.outerWidth() * 0.95)) ).prop('checked', true)
        }
        //function scrollToX(){
        //	isPanning = false
        //	illust.scrollLeft( originalX + deltaX )
        //}

        function _resized(){
            originalX = -1
            inputs.filter(':checked').trigger('change', 0)
            if( isScrollSnap )
                scrollStart()
        }
        function _show( is_firsttime ){
            $window.on('resized.'+n, _resized)
            _resized()
        }
        function _hide(){
            $window.off('resized.'+n)
        }
        $el.on({
            'show': _show,
            'hidden': _hide
        })
        
        // scroll snap
            if( isScrollSnap ){
                illustMain.addClass('mod-scroll-snap')
                illust.on({
                    'scroll': scrollHandler,
                    'pointerdown': function(e){
                        if( originalX < 0 && e.originalEvent.pointerType == 'touch' ){
                            scrollStart()
                        }
                    },
                    'touchstart': function(){
                        if( originalX < 0 ){
                            scrollStart()
                        }
                    }
                })
            }else{
                let isActualPanning = false
                    //,lastTick
                function panEnd(){
                    illust.css('transform', '').removeClass('is-panning')
                    originalX = 0
                    startX = 0
                    startY = 0
                    deltaX = 0
                    deltaY = 0
                    countReset()
                    //lastTick = 0
                    isActualPanning = false
                    $(document).off('touchmove.infosShipIllust touchend.infosShipIllust touchcancel.infosShipIllust')
                }
                function panX(){
                    isPanning = false
                    //let now = Date.parse(new Date())
                    //if( now - lastTick > 5 ){
                        let half = ((inputCur <= 0 && deltaX > 0) || (inputCur >= inputs.length - sCount && deltaX < 0))
                        illust/*.addClass('is-panning')*/.css('transform', 'translateX('+(deltaX * (half ? 0.3333 : 1) + originalX)+'px)')
                        //console.log( deltaX * (half ? 0.3333 : 1) + originalX )
                    //}
                    //lastTick = now
                }
                function panHandler(){
                    //if( originalX >= 0 ){
                        if( !isPanning ){
                            requestAnimationFrame(panX);
                        }
                        isPanning = true
                    //}
                }
                function bodyTouchMove(e){
                    if( !isPanning && (startX || startY) && e.originalEvent.targetTouches.length == 1 ){
                        deltaX = e.originalEvent.targetTouches[0].clientX - startX
                        if( isActualPanning ){
                            panHandler()
                        }else{
                            deltaY = e.originalEvent.targetTouches[0].clientY - startY
                            let absX = Math.abs(deltaX)
                                ,absY = Math.abs(deltaY)
                            if( (absX < 20 && absY < 20) || absX > absY ){
                                //console.log('pan pending')
                                e.preventDefault()
                                if( absX > absY ){
                                    //console.log('pan X')
                                    isActualPanning = true
                                    illust.addClass('is-panning')
                                    panHandler()
                                }
                            }else{
                                //console.log('pan Y')
                                panEnd()
                            }
                        }
                    }
                }
                function bodyTouchEnd(e){
                    requestAnimationFrame(function(){
                        if( deltaX && (Math.abs(deltaX) > illustWidth / 3 || _g.timeNow() - startTime < 300) ){
                            let t
                            if( deltaX < 0 && inputCur < inputs.length - 1 ){
                                t = inputCur + sCount
                            }else if( deltaX > 0 && inputCur > 0 ){
                                t = inputCur - 1
                            }
                            if( t < 0 )
                                t = 0
                            if( t + sCount > inputs.length + extraCount )
                                t = inputs.length - sCount
                            inputs.eq(t).prop('checked', true).trigger('change')
                        }
                        panEnd()
                    })
                    //inputs.filter(':checked').trigger('change')
                }
                illustMain
                    .on({
                        'touchstart': function(e){
                            if( e.originalEvent.targetTouches && e.originalEvent.targetTouches.length == 1 ){
                                let matrix = illust.css('transform').replace(/[^0-9\-.,]/g, '').split(',')
                                originalX = parseInt( matrix[12] || matrix[4] || 0 )
                                startX = e.originalEvent.targetTouches[0].clientX
                                startY = e.originalEvent.targetTouches[0].clientY
                                startTime = _g.timeNow()
                                count()
                                illustWidth = illust.width()
                                //lastTick = Date.parse(new Date())
                                
                                $(document).on({
                                    'touchmove.infosShipIllust': bodyTouchMove,
                                    'touchend.infosShipIllust': bodyTouchEnd,
                                    'touchcancel.infosShipIllust': bodyTouchEnd
                                })
                            }
                        },
                        'touchmove': function(e){
                            if( isActualPanning )
                            e.preventDefault()
                        }
                    })
                /* PEPjs
                illustMain.attr('touch-action', 'none')
                    .on({
                        'pointerdown': function(e){
                            if( e.originalEvent.pointerType == 'touch' ){
                                isMoving = e.clientX
                                let matrix = illust.css('transform').replace(/[^0-9\-.,]/g, '').split(',')
                                originalX = parseInt( matrix[12] || matrix[4] || 0 )
                            }
                        },
                        'pointermove': function(e){
                            if( isMoving ){
                                deltaX = e.clientX - isMoving
                                if( !isPanning ){
                                    requestAnimationFrame(panX);
                                }
                                isPanning = true
                            }
                        },
                        'pointerleave pointerup pointercancel': function(){
                            requestAnimationFrame(function(){
                                if( deltaX && Math.abs(deltaX) >= 30 ){
                                    illust.css('transform', '').removeClass('is-panning')
                                    let cur = parseInt(inputs.filter(':checked').val()) - 1
                                    if( deltaX < 0 && cur < inputs.length - 1 ){
                                        inputs.eq(cur+ Math.floor(illust.width() / (s.outerWidth() * 0.95)) ).prop('checked', true).trigger('change')
                                    }else if( deltaX > 0 && cur > 0 ){
                                        inputs.eq(cur-1).prop('checked', true).trigger('change')
                                    }
                                }
                                isMoving = 0
                                deltaX = 0
                            })
                            //inputs.filter(':checked').trigger('change')
                        }
                    })
                */
            }
    
    // prev/next for illustrations
        function illustShift( direction, jumpToAnotherEdge ){
            if( !direction || scrollLock )
                return

            let t = -10

            count()
            
            if( direction == 1 ){
                t = inputCur + sCount
            }else if( direction == -1 ){
                t = inputCur - 1
            }

            if( t < 0 && t > -10 ){
                if( jumpToAnotherEdge )
                    t = inputs.length - sCount
                else
                    t = 0
            }else if( t + sCount > inputs.length + extraCount ){
                if( jumpToAnotherEdge )
                    t = 0
                else
                    t = inputs.length - sCount
            }

            countReset()

            if( t >= 0 ){
                //illust.off('scroll')
                if( isScrollSnap )
                    scrollStart()
                inputs.eq(t).prop('checked', true).trigger('change')
            }
        }
    
    // mousewheel support for illustrations
        illustMain.on('mousewheel', function(e){
            if( mouseWheelLock || scrollLock || $el.get(0).scrollHeight > $el.get(0).clientHeight )
                return

            let direction
            
            if( isScrollSnap && e.originalEvent.deltaY )
                direction = e.originalEvent.deltaY < 0 ? -1 : 1
            else if( e.originalEvent.wheelDelta )
                direction = e.originalEvent.wheelDelta > 0 ? -1 : 1
            else if( e.originalEvent.deltaX )
                direction = e.originalEvent.deltaX < 0 ? -1 : 1
            else if( e.originalEvent.deltaY )
                direction = e.originalEvent.deltaY < 0 ? -1 : 1
            
            if( direction ){
                mouseWheelLock = true
                illustShift( direction )
                setTimeout(function(){
                    mouseWheelLock = false
                }, 100)
            }
        })
    
    // prev/next button for illustrations
        $('<button class="arrow prev" icon="arrow-left"/>')
            .on('click', function(){
                illustShift( -1, true )
            })
            .insertBefore( inputs.eq(0) )
        $('<button class="arrow next" icon="arrow-right"/>')
            .on('click', function(){
                illustShift( 1, true )
            })
            .insertAfter( labels.eq(labels.length - 1) )
    
};
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
	if( this.cur_page )
		this.page_dom[this.cur_page].trigger('modeSelectionExit')
	_frame.dom.layout.removeClass('mode-selection')
}

if( typeof _p.tip != 'undefined' ){


// [[EQUIPMENT::123]]
_p.tip.filters.push( function(cont){
	var exp = /^\[\[EQUIPMENT\:\:([0-9]+)\]\]$/.exec(cont)
	if( exp && exp.length > 1 )
		return _p.tip.content_equipment( _g.data.items[ parseInt(exp[1]) ] )
} )

_p.tip.content_equipment = function( d ){

	function _stat(stat, title){
		if( d['stat'][stat] ){
			if( d.type == 54 ){
				// 局地战斗机
				switch( stat ){
					case 'hit': 	title = '对爆';	break;
					case 'evasion': title = '迎击';	break;
				}
			}
			switch(stat){
				case 'range':
					return '<span>射程: ' + _g.getStatRange( d['stat'][stat] ) + '</span>';
					//break;
				case 'distance':
					return '<span>' + title + ': ' + d['stat'][stat] + '</span>';
				default:
					var val = parseInt( d['stat'][stat] )
					return '<span>' + ( val > 0 ? '+' : '') + val + ' ' + title + '</span>'
					//break;
			}
		}else{
			return ''
		}
	}

	/*
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
	*/

	let item_name = d.getName()
		,isAircraft = $.inArray(d.type, Formula.equipmentType.Aircrafts) > -1

	return '<h3 class="itemstat">'
			+ '<s class="equiptypeicon mod-'+d.getIconId()+'"></s>'
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
		+ ( isAircraft ? _stat('distance', '航程') : '' )

}



// [[EQUIPABLE::123]]
_p.tip.filters.push( function(cont){
	var exp = /^\[\[EQUIPABLE\:\:([0-9]+)\]\]$/.exec(cont)
	if( exp && exp.length > 1 )
		return _p.tip.content_equipable( _g.data.item_types[ parseInt(exp[1]) ] )
} )

_p.tip.content_equipable_results = {}
_p.tip.content_equipable = function( d ){
	if( !_p.tip.content_equipable_results[d.id] ){
		let html = `<h4 class="item_equipable_on">可装备于以下舰种</h4>`
			,equipable_extra_ship = d.equipable_extra_ship || []
		
		html+= `<p>`	
		if( d.equipable_on_type.length ){
			let types = []
			_g.ship_type_order_full.forEach( function(ship_type){
				if( d.equipable_on_type.indexOf( ship_type ) > -1 )
					types.push( ship_type )
			} )
			html+= types.map(function(ship_type){
					let shipType = _g.data.ship_types[ship_type]
					return '<span>' + (shipType.full_zh || shipType.full_game) + `(${shipType.code})` + '</span>'
				}).join(' / ')
		}else{
			html+= '无...'
		}
		html+= `</p>`	
		
		if( equipable_extra_ship.length ){
			html+= `<h4 class="item_equipable_on">也可装备于以下舰娘</h4>`
			html+= d.equipable_extra_ship.map(function(shipId){
					let ship = _g.data.ships[shipId]
						,shipType = ship.getType()
					return `<span><a href="?infos=ship&id=${shipId}" data-shipid="${shipId}" data-infos="[[SHIP::${shipId}]]" data-tip="[[SHIP::${shipId}]]">`
							+ (shipType ? `[${shipType}] ` : '' )
							+ ship.getName(_g.joint)
							+ `</a></span>`
				}).join(' / ')
		}
		
		_p.tip.content_equipable_results[d.id] = html
	}
	
	return _p.tip.content_equipable_results[d.id]
}



}

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

var modal = {}
modal.equipable = {
    'frames': {},
    'frame': function( typeId ){
        if( !typeId )
            return false

        if( !this.frames[typeId] ){
            let container = $('<div/>')
            
            let equipType = _g.data.item_types[typeId]
                ,onType = equipType.equipable_on_type || []
                ,extraShip = equipType.equipable_extra_ship || []
                ,types = []
                    
            _g.ship_type_order_full.forEach( function(ship_type){
                if( onType.indexOf( ship_type ) > -1 )
                    types.push( ship_type )
            } )
            
            _p.el.flexgrid.create().appendTo( container ).addClass('equipable-types').prepend( $(
                /*
                types.map(function(ship_type){
                    let shipType = _g.data.ship_types[ship_type]
                    return '<span>' + (shipType.full_zh || shipType.full_game) + ` (${shipType.code})` + '</span>'
                }).join('')
                */
                _g.ship_type_order_full.map( function(shipTypeId){
                    let shipType = _g.data.ship_types[shipTypeId]
                    if( shipType.hide || shipType.donotcompare )
                        return ''
                    return '<span class="unit' + ( onType.indexOf( shipTypeId ) > -1 ? ' on' : '' ) + '">'
                        + (shipType.full_zh || shipType.full_game) + ` (${shipType.code})`
                        + '</span>'
                } ).join('')
            ) ).appendTo( container )
			
            if( extraShip.length ){
                container.append('<p>以及以下舰娘...</p>')
                let containerExtraShip = _p.el.flexgrid.create().appendTo( container ).addClass('list-ship equipable-extra-ships')
                extraShip.forEach(function(shipId){
                    containerExtraShip.appendDOM(
                        _tmpl.link_ship(shipId).addClass('unit')
                    )
                })
            }
            
            this.frames[typeId] = container
        }
        
        return this.frames[typeId]
    },
    'show': function( typeId ){
        return _frame.modal.show(
            this.frame( typeId ),
            //'可装备于...',
            `${_g.data.item_types[typeId].name.zh_cn} 可装备于...`,
            {
                'classname': 	'modal-equipable',
                'detach':		true
            }
        )
    }
}
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
		
		container//.attr('data-index', this._index)
			.on('mouseenter.hovercolumn', '.tablelist-body dd', this.hovercolumn_delegate.bind(this))
			.on('mouseleave.hovercolumn', '.tablelist-body dd', this.hovercolumn_delegate_leave.bind(this))
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
		
			label = label ? $('<label'+(type == 'checkbox'? ' class="checkbox"' : '')+' for="'+id+'"/>')
								.html( label )
								.appendTo(line)
						: null		
			if( type == 'checkbox' && label )
				label.insertAfter(input)
		
			if( suffix )
				$('<label for="'+id+'"/>').html(suffix).appendTo(line)
		
			//_g.inputIndex++
			return line
		}

	// 强制 thead 重绘，以解决某些CSS计算延迟问题
		thead_redraw( timeout_duration ){
			//if( this.dom.thead && this.dom.thead.length ){
			//	var thead = this.dom.thead
			//	setTimeout(function(){
			//		thead.hide().show(0)
			//	}, timeout_duration || 10)
			//}
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
						tbody = this.dom.table.children('.tablelist-body')
					//rows = tbody.find('tr.row:visible').not('[data-donotcompare]')
					rows = tbody.children('dl:visible:not([data-donotcompare])')
				}
				nth = nth || 1
	
				// 建立临时用对象，在函数结束时delete
					this._tmp_values = []
					this._tmp_value_map_cell = {}
	
				// 遍历，将值全部导出到 _tmp_values，_tmp_value_map_cell 中记录 值 -> jQuery DOM
					rows.children('dd:nth-of-type(' + nth + ')').each(function(index, element){
						let cell = $(element)
							//,val = cell.data('value')
							,val = cell.attr('value')
	
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
					tbody = this.dom.table.children('.tablelist-body')
	
				//let rows = tbody.find('tr.row:visible').not('[data-donotcompare]')
				let rows = tbody.children('dl:visible:not([data-donotcompare])')
	
				rows.children('dd[value]').removeClass('sort-first sort-second')
	
				rows.eq(0).children('dd[value]').each(function(index, element){
					let is_ascending = false
						,$this = $(element)
						,stat = $this.attr('stat')
	
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
				
				let stat = cell.attr('stat')
					,sortData = this.sort_data_by_stat[stat]
				
				//console.log(stat, sortData)
					
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
							,trIndex = parseInt( $this.attr('trindex') )
						parent = parent || $this.parent()
						arr.push({
							'index': 	trIndex,
							'el': 		$this,
							'prev': 	parent.children('[trindex="' + (trIndex - 1) + '"]')
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
		/* v1
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
		*/


	// 高亮列相关
		hovercolumn_delegate(e){
			if( !$body_preventMouseover && e && e.originalEvent.path && this.dom.tbody ){
				//clearTimeout(_p.el.tablelist.hovercolumn_mouseleave_delay)
				//_p.el.tablelist.hovercolumn_mouseleave_delay = null
				let index = e.currentTarget.getAttribute('data-index')
				if( !index ){
					let el = $(e.currentTarget)
					index = el.index()
					el.attr('data-index', index)
				}else{
					index = parseInt(index)
				}
				
				//if( !this.dom.style )
				//	this.dom.style = $('<style/>').prependTo(this.dom.container)
				
				//this.dom.style.html('.tablelist[data-index="'+this._index+'"] .tablelist-body > p.row > span:nth-child('+(index+1)+'){background-color:rgba(0,0,0,.2)}')
				//_p.el.tablelist.hovercolumn_mouseenter( e.delegateTarget, index )
				this.dom.tbody.find('dl:visible dd:nth-child('+(index+1)+')').addClass('is-hover')
			}
		}
		hovercolumn_delegate_leave(e){
			if( !$body_preventMouseover && e && e.originalEvent.path && this.dom.tbody ){
				//_p.el.tablelist.hovercolumn_mouseleave_delay = setTimeout(function(){
					//e.delegateTarget.removeAttribute('td-nth-hovered')
					//this.dom.style.html('')
					this.dom.tbody.find('dd.is-hover').removeClass('is-hover')
					_p.el.tablelist.hovercolumn_mouseleave_delay = null
				//}.bind(this), 10)
			}
		}	
		//hovercolumn_mouseenter( body, td_index ){
		//	body.setAttribute( 'td-nth-hovered', td_index )
				//.find('tbody tr td:nth-of-type(' + ( parseInt(td_index) + 1 ) + ')').addClass('state-hover-column')
		//}
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
		this.mode_selection_filters = $()
		//this.checkbox = []
		this.rows = $()
		this.rowsById = {}
		this.rowsByHeader = {}
		//this.last_item = null
		//this.compare_checkbox

		// 标记全局载入状态
			_frame.app_main.loading.push('tablelist_'+this._index)
			_frame.app_main.is_loaded = false
	
			//_g.log( 'shiplist init', _frame.app_main.loading )
		
		this.initProgressMax = 0
		this.initProgressCur = 0

		this.dom.container.on({
			//'initdone': function(){
			//	_g.log('tablelist-ships init done')
			//},
			'initprogress': function(e, cur, max){
				this.initProgressCur = cur || this.initProgressCur
				this.initProgressMax = max || this.initProgressMax
			}
		})
		
		if( container.children('.tablelist-container').length ){
			this.init_parse()
		}//else if(this.init_new){
		//	this.init_new()
		//}
	}

	compare_btn_show( is_checked ){
		//if( (!is_checked && this.compare_checkbox.filter(':checked').length)
		if( (!is_checked && this.rows.filter('[compare="true"]').length)
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
			this.last_scrollTop = this.dom.tbody.scrollTop()
	
		// 更改视图
			this.dom.filter_container.attr('viewtype', 'compare')
			this.dom.tbody.scrollTop( 0 )
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
		this.dom.tbody.scrollTop( this.last_scrollTop )
		this.dom.table.removeClass('sortable')
		delete this.last_viewtype
		delete this.last_scrollTop
	}

	compare_end(){
		//this.compare_checkbox.filter(':checked').prop('checked', false).trigger('change')
		this.rows.filter('[compare="true"]').each(function(i, el){
			this.check(el, false)
		}.bind(this))
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
	
		if( !TablelistShips.contextmenu ){
			let createMenu = function(){
				let items = [
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
									//this.checkbox[TablelistShips.contextmenu._curid]
									//	.prop('checked', !this.checkbox[TablelistShips.contextmenu._curid].prop('checked'))
									//	.trigger('change')
									this.check( this.rowsById[TablelistShips.contextmenu._curid] )
								}.bind(this),
								'show': function(e){
									if( !TablelistShips.contextmenu._curid )
										return false
									
									if( _g.data.ship_types[_g['data']['ships'][TablelistShips.contextmenu._curid]['type']]['donotcompare'] )
										$(e.target).hide()
									else
										$(e.target).show()
										
									//if( this.checkbox[TablelistShips.contextmenu._curid].prop('checked') )
									if( this.rowsById[TablelistShips.contextmenu._curid].attr('compare') === 'true' )
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
										//checkbox = this.checkbox[currentValue['id']]
										checkbox = this.rowsById[currentValue['id']]
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
																//checkbox && checkbox.prop('checked')
																checkbox && checkbox.attr('compare') === 'true'
																	? '取消对比'
																	: '加入对比'
															)
															.on({
																'click': function(e){
																	if( checkbox ){
																		//this.checkbox[currentValue['id']]
																		//	.prop('checked', !checkbox.prop('checked'))
																		//	.trigger('change')
																		this.check( checkbox )
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
				
				if( TablelistShips.contextmenu ){
					if( TablelistShips.contextmenu.showing ){
						TablelistShips.contextmenu.hide(function(){
							TablelistShips.contextmenu.dom.body.empty()
							items.forEach(function(item){
								item.appendTo( TablelistShips.contextmenu.dom.body )
							})
							if( TablelistShips.contextmenu._is_rightclick )
								TablelistShips.contextmenu.show(
									TablelistShips.contextmenu._is_rightclick.x,
									TablelistShips.contextmenu._is_rightclick.y
								)
							else
								TablelistShips.contextmenu.show( TablelistShips.contextmenu._curel )
						})
					}else{
						TablelistShips.contextmenu.dom.body.empty()
						items.forEach(function(item){
							item.appendTo( TablelistShips.contextmenu.dom.body )
						})
					}
				}else{
					TablelistShips.contextmenu = new _menu({
						'className': 'contextmenu-ship',
						'items': items
					})
				}
				
				return TablelistShips.contextmenu
			}.bind(this)
			if( !this.is_init ){
				TablelistShips.contextmenu = new _menu({
					'className': 'contextmenu-ship',
					'items': [$('<menuitem/>').html('数据处理中，请稍候……　　')]
				})
				this.dom.container.on({
					'initprogress': function(e, cur, max){
						if( TablelistShips.contextmenu.showing ){
							TablelistShips.contextmenu.dom.body.empty().append(
								$('<menuitem/>').html(`数据处理中，请稍候 (${((cur / max) * 100).toFixed(1)}%)`)
							)
						}
					},
					'initdone': function(){
						createMenu()
					}
				})
			}else{
				createMenu()
			}
		}
	
		TablelistShips.contextmenu._curid = shipId || $el.data('shipid')
		TablelistShips.contextmenu._curel = $el

		if( is_rightclick ){
			TablelistShips.contextmenu._is_rightclick = {
				'x': is_rightclick.clientX,
				'y': is_rightclick.clientY
			}
			TablelistShips.contextmenu.show(is_rightclick.clientX, is_rightclick.clientY)
		}else{
			TablelistShips.contextmenu._is_rightclick = false
			TablelistShips.contextmenu.show($el)
		}
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
			// 搜索
				this.dom.search = $('<p class="search"/>').prependTo(this.dom.filters)
					.append( this.dom.searchInput = 
						$('<input type="search" placeholder="搜索舰娘..."/>')
							.on({
								'input': function(e){
									//if( e.target.value.length > 1 || !e.target.value.length ){
										clearTimeout( this.searchDelay )
										this.searchDelay = setTimeout(function(){
											this.search( e.target.value )
										}.bind(this), 100)
									//}
								}.bind(this),
								'focus': function(){
									this.dom.search.addClass('on')
								}.bind(this),
								'blur': function( e, force ){
									if( force || !this.dom.container.hasClass('mod-search') )
										this.dom.search.removeClass('on')
								}.bind(this)
							})
					)
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
			this.dom.table = this.dom.container.children('.tablelist-container')
			this.dom.thead = this.dom.table.children('.tablelist-header')
				.on('click', '[stat]', function(e){
						this.sort_table_from_theadcell($(e.currentTarget))
					}.bind(this))
			this.dom.tbody = this.dom.table.children('.tablelist-body')
				.on('contextmenu.contextmenu_ship', '[data-shipid]', function(e){
						this.contextmenu_show($(e.currentTarget), null, e)
						e.preventDefault()
					}.bind(this))
				/*.on('click.contextmenu_ship', '[data-shipid]>strong>em', function(e){
						this.contextmenu_show($(e.currentTarget).parent().parent())
						e.stopImmediatePropagation()
						e.stopPropagation()
					}.bind(this))*/
				.on('click', '[data-shipid]', function(e, forceInfos){
						if( e.target.tagName.toLowerCase() == 'label' ){
							//this.checkbox[e.currentTarget.getAttribute('data-shipid')]
							//	.prop('checked', !this.checkbox[e.currentTarget.getAttribute('data-shipid')].prop('checked'))
							//	.trigger('change')
							this.check( e.currentTarget )
							e.stopPropagation()
						}else if( e.target.tagName.toLowerCase() == 'em' ){
							this.contextmenu_show($(e.target), e.currentTarget.getAttribute('data-shipid'))
							e.preventDefault()
							e.stopImmediatePropagation()
							e.stopPropagation()
						}else if( !forceInfos && _frame.app_main.is_mode_selection() ){
							e.preventDefault()
							e.stopImmediatePropagation()
							e.stopPropagation()
							if( !e.currentTarget.getAttribute('data-donotcompare') )
								_frame.app_main.mode_selection_callback(e.currentTarget.getAttribute('data-shipid'))
						}
						this.dom.searchInput.trigger('blur', [true])
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
		let deferred = Q.defer()
			,chain = Q.fcall(function(){})
			,trs = this.dom.tbody.children('h4, dl')

		trs.each( function(index, tr){
			chain = chain.then( function(){
				//console.log(index)
				tr = $(tr)
				tr.attr('trindex', index)
				let deferred = Q.defer()
				let ship_id = tr.attr('data-shipid')
				let header_index = tr.attr('data-header')
				if( !this.rowsByHeader[header_index] )
					this.rowsByHeader[header_index] = $()
				if( tr[0].tagName == 'H4' ){
					let checkbox = tr.find('input[type="checkbox"]')
							.on({
								'change': function(){
									this.rowsByHeader[header_index].filter(':visible').each(function(i, el){
										this.check( el, checkbox.prop('checked'), true )
									}.bind(this))
								}.bind(this),
								'docheck': function(){
									// ATTR: compare
									var trs = this.rowsByHeader[header_index].filter(':visible')
										,checked = trs.filter('[compare="true"]')
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
								}.bind(this)
							})
					this.header_checkbox[header_index] = checkbox
					
					// 舰种显示/隐藏相关元素
						this.mode_selection_filters.add(
							$('<input/>',{
								'value': 	header_index,
								'type':		'checkbox',
								'class':	'shiptype',
								'id':		'shiptype-'+header_index
							}).prop('checked', !header_index).prependTo(this.dom.container)
						)
						$('<label/>',{
							'for':		'shiptype-'+header_index,
							'class':	'shiptype'
						}).prependTo(tr)
						tr.attr('inited', true)
				}else if( ship_id ){
					this.rowsByHeader[header_index] = this.rowsByHeader[header_index].add( tr )
					this.rowsById[ship_id] = tr
					this.rows = this.rows.add(tr)
				}
				this.dom.container.trigger('initprogress', [(index+1), trs.length])
				setTimeout( deferred.resolve , 0 )
				//deferred.resolve()
				return deferred.promise
			}.bind(this) )
		}.bind(this) )
		
		//this.compare_checkbox = this.dom.tbody.find('input[type="checkbox"].compare')
		
		chain = chain.then( function(){
			this.mark_high()
			this.thead_redraw()
			this.is_init = true
			this.dom.container.trigger('initdone')
			deferred.resolve()
		}.bind(this) )
		
		.catch(function(err){
			_g.log(err)
		})

		_frame.app_main.loaded('tablelist_'+this._index, true)
		
		return deferred.promise
	}
	
	check( row, checked, not_trigger_check ){
		if( row.length )
			row = row[0]
		
		if( typeof checked == 'undefined' || checked === null )
			checked = !(row.getAttribute('compare') == 'true')
		
		if( checked )
			row.setAttribute('compare', 'true')
		else
			row.removeAttribute('compare')
		
		this.compare_btn_show( checked )

		if( !not_trigger_check )
			this.header_checkbox[parseInt(row.getAttribute('data-header'))].trigger('docheck')
	}
	
	search( query ){
		if( !this.dom.style )
			this.dom.style = $('<style/>').appendTo( this.dom.container )

		if( !query ){
			this.dom.container.removeClass('mod-search')
			this.dom.filter_container.attr('filter-hide-premodel', this.dom.btn_hide_premodel.prop('checked'))
			this.dom.style.empty()
			return query
		}

		query = _g.search(query, 'ships')

		if( !query.length ){
			return query
		}
		
		this.dom.container.addClass('mod-search')
		this.dom.filter_container.attr('filter-hide-premodel', false)
		
		let r = '.tablelist.ships .tablelist-body dl:not(:empty)'		
		query.forEach(function(ship){
			r+= `:not([data-shipid="${ship.id}"])`
		})		
		r+= `{display:none!important}`
		
		this.dom.style.html(r)

		return query
	}
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
		
		if( container.children('.tablelist-container').length ){
			this.init_parse()
		}//else if(this.init_new){
		//	this.init_new()
		//}
	}

	apply_types(){
		//console.log('types: ' + TablelistEquipments.types)
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
			&& _g.data.ships[TablelistEquipments.shipId]
			&& $.inArray(_g.data.ships[TablelistEquipments.shipId].type, [9, 10, 11] ) > -1
		){
			let k = 0
				,el, t
	
			while( this.dom.types[k++].attr('data-equipmentcollection') != 3
				|| $.inArray((parseInt(this.dom.types[k].attr('data-type')) || null), TablelistEquipments.types) <= -1 ){
				el = this.dom.types[k+1]
			}
			
			el = el || this.dom.types[0]
			
			this.dom.type_radios[3].prop('checked', true).trigger('change')
			
			t = el[0].offsetTop
			if( t )
				t-= 32
			this.dom.tbody.scrollTop(t || 0)
			return
		}
		
		if( TablelistEquipments.types.length ){
			let k = 0
				,el, t
	
			while( $.inArray((parseInt(this.dom.types[k++].attr('data-type')) || null), TablelistEquipments.types) <= -1 ){
				el = this.dom.types[k]
			}
			
			el = el || this.dom.types[0]
			
			this.dom.type_radios[parseInt(el.attr('data-equipmentcollection')) || 1].prop('checked', true).trigger('change')
			
			t = el[0].offsetTop
			if( t )
				t-= 32
			this.dom.tbody.scrollTop(t || 0)
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
						this.dom.tbody.scrollTop(0)
						this.thead_redraw()
					}.bind(this))
			}.bind(this))
		
		// 装备类型过滤
			this.dom.filter_types = this.dom.container.children('input[name="types"][type="hidden"]')
	
		// 生成表格框架
			this.dom.table = this.dom.container.children('.tablelist-container')
			this.dom.thead = this.dom.table.children('.tablelist-header')
				//this.dom.thead.children('span').on('click', function(e){
				//		this.sort_table_from_theadcell($(e.currentTarget))
				//	}.bind(this))
			this.dom.tbody = this.dom.table.children('.tablelist-body')
	
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

		this.dom.tbody.children('h4, dl').each(function(index, tr){
			tr = $(tr)
			if( tr[0].tagName == 'H4' ){
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
				if( TablelistFleets.support.buildfile ){
					this.dom.btn_exportFile = $('<button class="export" icon="floppy-disk"/>').html('导出配置文件')
									.on('click',function(){
										_db.fleets.persistence.compactDatafile()
										if( _g.isNWjs ){
											_g.save(_db.fleets.filename, 'fleets.json')
										}else{
											_frame.app_main.loading_start('tablelist_fleets_export', false)
											let data = ''
											_db.fleets.find({}, function(err, docs){
												if( err ){
													_g.error(err)
												}else{
													docs.forEach(function(doc){
														data+= JSON.stringify(doc) + '\n'
													})
													let blob = new Blob([data], {type: "application/json"})
													_g.save( URL.createObjectURL(blob), 'fleets.json' )
												}
												_frame.app_main.loading_complete('tablelist_fleets_export')
											})
										}
									})
									.appendTo(this.dom.filters)
				}
			// 右 - 选项组
				this.dom.buttons_right = $('<div class="buttons_right"/>').appendTo(this.dom.filters)
				this.dom.setting_hqlv = $('<label/>',{
										'class':	'setting setting-hqlv',
										'html':		'默认司令部等级',
										'data-tip':	'如果舰队配置没有设置司令部等级，<br/>则会使用该默认数值<br/>司令部等级会影响索敌能力的计算'
									})
									.on({
										'mouseenter mouseleave': function(e){
											if( _p.tip.is_showing && !_p.tip.timeout_fade && this.dom.setting_hqlv_input.is(':focus') ){
												e.stopImmediatePropagation()
												e.stopPropagation()
											}
										}.bind(this)
									})
									.append(
										this.dom.setting_hqlv_input = $('<input/>',{
												'type':		'number',
												'min':		0,
												'max':		_g.shipMaxLv
											})
											.val(Lockr.get('hqLvDefault', _g.defaultHqLv))
											.on({
												'input': function(){
													_g.updateDefaultHqLv(this.dom.setting_hqlv_input.val())
												}.bind(this),
												'focus.tipshow': function(){
													this.dom.setting_hqlv_input.trigger('tipshow')
												}.bind(this),
												'blur.tiphide': function(){
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
			/*
				this.dom.warning = $('<div/>',{
						'class':	'warning',
						'html':		'功能移植/测试中，请勿日常使用'
					}).appendTo( this.dom.filter_container )
			*/

		// [创建] 表格框架
			this.dom.table = $('<div class="tablelist-container"/>').appendTo( this.dom.container )
			this.dom.thead = $('<dl/>').appendTo($('<div class="tablelist-header"/>').appendTo( this.dom.table ))
			this.dom.tbody = $('<div class="tablelist-body" scrollbody/>').appendTo( this.dom.table )
				.on('contextmenu.contextmenu_fleet', '[data-fleetid]', function(e){
						this.contextmenu_show($(e.currentTarget), null , e)
						e.preventDefault()
					}.bind(this))
				.on('click.contextmenu_fleet', '[data-fleetid]>dt>em', function(e){
						this.contextmenu_show($(e.currentTarget).parent().parent(), $(e.currentTarget))
						e.stopImmediatePropagation()
						e.stopPropagation()
					}.bind(this))
			
			this.columns.forEach(function(v, i){
				if( typeof v == 'object' ){
					$('<dd/>',{
						'stat': 	v[1],
						'html':		v[0]
					}).appendTo(this.dom.thead)
				}else{
					$('<dt/>').html(v[0]).appendTo(this.dom.thead)
				}
			}.bind(this))

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
				.appendTo( this.dom.table )
		
		// Auto select for number input
			this.dom.container.on('focus.number_input_select', 'input[type="number"]', function(e){
				e.currentTarget.select()
			})

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
									this.flexgrid_ph = $('<dl data-fleetid trindex="99999"/>').appendTo(this.dom.tbody)
								else
									$('<dl data-fleetid trindex="99999"/>').appendTo(this.dom.tbody)
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
							$('<h4/>',{
									'trindex': 	++this.trIndex,
									'html': 	'&nbsp;'
								})
								.appendTo( this.dom.tbody )
							this.trIndex++
					}
			}else{
				// 创建flexgrid placeholder
					while(k < this.flexgrid_empty_count){
						if( !k )
							this.flexgrid_ph = $('<dl data-fleetid trindex="99999"/>').appendTo(this.dom.tbody)
						else
							$('<dl data-fleetid trindex="99999"/>').appendTo(this.dom.tbody)
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
			
			let tr = $('<dl/>')
						.attr({
							'trindex': 		index,
							'data-fleetid': data._id || 'PLACEHOLDER',
							//'data-infos': 	'[[FLEET::'+JSON.stringify(data)+']]'
							'data-infos': 	'[[FLEET::'+data._id+']]',
							'data-theme':	data.theme,
							'class': 		'link_fleet'
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
								html+='<img class="img'+(_huCss.csscheck_full('mask-image') ? '' : ' nomask')
										+'" src="' + _g.path.pics.ships + '/' + ships[j][0]+'/0'
										+ (_huCss.csscheck_full('mask-image') ? '.webp' : '-mask-2.png')
										+ '" contextmenu="disabled"'
										+ '/>'
							else
								html+='<s class="img'+(_huCss.csscheck_full('mask-image') ? '' : ' nomask')+'"/>'
							j++
						}
						html+='</i>'
						$('<dt/>')
							.attr(
								'value',
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
						$('<dd/>')
							.attr(
								'value',
								datavalue
							)
							.html( datavalue )
							.appendTo(tr)
						break;
				}
			})
			
			if( isPrepend === true )
				return tr
	
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
					'className':'menu-fleets-new',
					'items': [
						$('<div class="menu-fleets-new"/>')
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
													$('<p class="aircraftimportmax"/>')
														.append(
															TablelistFleets.modalImportCheckAircraftMax = $('<input/>',{
																'type':	'checkbox',
																'id':	'_input_g' + _g.inputIndex
															}).prop('checked', Lockr.get( 'fleetlist-option-aircraftimportmax' ))
														)
														.append($('<label/>',{
																'class':'checkbox',
																'for':	'_input_g' + (_g.inputIndex++),
																'html':	'飞行器熟练度自动提升至'
															}) )
												)
												.append(
													TablelistFleets.modalImportBtn = $('<button class="button"/>').html('导入')
														.on('click', function(){
															let val = TablelistFleets.modalImportTextarea.val()
															//console.log(val)
															if( val ){
																val = JSON.parse(val)
																if( !val.length || !val.push )
																	val = _g.kancolle_calc.decode(val)
																this.action_new({
																	'data': 	val
																},{
																	'aircraftmax': TablelistFleets.modalImportCheckAircraftMax.prop('checked') || Lockr.get( 'fleetlist-option-aircraftimportmax' )
																})
																_frame.modal.hide()
																TablelistFleets.modalImportTextarea.val('')
															}
														}.bind(this))
												)
										}
										TablelistFleets.modalImportTextarea.val('')
										/*
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
											*/
										_frame.modal.show(
											TablelistFleets.modalImport,
											'导入配置代码',
											{
												'classname': 	'infos_fleet infos_fleet_import',
												'detach':		true
											}
										)
									}.bind(this))
							)
							.append(
								TablelistFleets.support.buildfile
									? $('<menuitem class="import_file"/>').html('导入配置文件').on('click', function(){
											this.dbfile_selector.trigger('click')
										}.bind(this))
									: null
							)
					]
				})
				this.dbfile_selector = $('<input type="file" class="none"/>')
					.on('change', function(e){
						return this.importBuilds(this.dbfile_selector)
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
		action_new( dataDefault, options ){
			dataDefault = dataDefault || {}
			options = options || {}
			//_frame.infos.show('[[FLEET::__NEW__]]')
			
			if( dataDefault.data ){
				let i = 0;
				dataDefault.data.forEach(function(fleet){if( fleet && fleet.push ){
					if( i < 4 ){
						fleet.forEach(function(ship){if( ship && ship.push ){
							ship[2].forEach(function(equipmentId, index){
								if( equipmentId && $.inArray(_g.data.items[equipmentId].type, Formula.equipmentType.Aircrafts) > -1 ){
									if( _g.data.items[equipmentId].rankupgradable ){
										if( options.aircraftmax )
											ship[4][index] = 7
										else
											ship[4][index] = ship[3][index] || null
									}
									ship[3][index] = null
								}
							})
						}})
					}else{
						fleet.forEach(function(field){if( field && field.push ){
							field.forEach(function(aircraft, index){
								if( aircraft
									&& aircraft[0]
									&& $.inArray(_g.data.items[aircraft[0]].type, Formula.equipmentType.Aircrafts) > -1
									&& _g.data.items[aircraft[0]].rankupgradable
									&& options.aircraftmax
								){
									aircraft[1] = 7
								}
							})
						}})
					}
					i++;
				}})
				InfosFleet.clean(dataDefault.data)
			}
	
			_db.fleets.insert( this.new_data(dataDefault, options), function(err, newDoc){
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
									if( id ){
										InfosFleet.modalRemove_show(id, TablelistFleets.contextmenu.curobject)
									}
									/*
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
									*/
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
		genlist(callback){
			Q.fcall(function(){})
	
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
					if( callback )
						callback()
					_g.log('Fleets list DONE')
				})
		}
	
	
	// 重新生成列表
		refresh(){
			console.log('refresh')
			this.dom.tbody.empty()
			this.genlist(function(){
				this.dom.tbody.scrollTop(this.dom.tbody.attr('scrollbody') || 0)
			}.bind(this))
		}
	
	// 导入配置文件
		importBuilds( $selector, filename ){
			$selector = $selector || this.dbfile_selector

			_frame.app_main.loading_start('tablelist_fleets_import', false)
			$selector.prop('disabled', true)
			
			let master_deferred = Q.defer()
				,promise_chain 	= Q.fcall(function(){
					let deferred = Q.defer()
					if( _g.isNWjs && filename ){
						// NW.js - 使用node.js方式读取文件内容
						let val = $selector.val()
						if( val.indexOf(';') > -1 )
							val = node.path.dirname( val.split(';')[0] )
						node.fs.readFile( node.path.join(val, filename) , 'utf8', function(err, data){
							if( err )
								deferred.reject('文件载入失败', new Error(err))
							else
								deferred.resolve(data)
						})
					}else{
						// HTML5方式
						// http://www.html5rocks.com/en/tutorials/file/dndfiles/
						for(let i = 0, f; f = $selector[0].files[i]; i++){
							let reader = new FileReader();
							reader.onload = (function(theFile) {
								return function(r) {
									return deferred.resolve(r.target.result)
								};
							})(f);
							reader.readAsText(f);
						}
					}
					return deferred.promise
			})

			promise_chain = promise_chain
			// 处理文件内容，以换行符为准创建Array
				.then(function(data){
					$selector.val('')

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
					let deferred = Q.defer()
						,chain = Q()
					array.forEach(function(data){
						chain = chain.then(function(){
							let deferred = Q.defer()
							_db.fleets.insert(data, function(err){
								if(err){
									if( err.errorType == "uniqueViolated" ){
										TablelistFleets.modalBuildConflictShow(data, deferred)
									}else{
										deferred.reject(err)
									}
								}else{
									deferred.resolve()
								}
							})
							return deferred.promise
						})
					})
					chain = chain
						.then(function(){
							deferred.resolve()
						})
						.catch(function(err){
							deferred.reject(err)
						})
						.done(function(){
							_frame.modal.hide()
						})
					return deferred.promise
				})
			
			promise_chain = promise_chain
				.then(function(){
					this.refresh()
					_g.badgeMsg('成功导入配置')
					master_deferred.resolve()
				}.bind(this))
			
			// 错误处理
				.catch(function(msg, err) {
					_g.log(msg)
					_g.error(err, '[舰队] 导入配置文件')
					_g.badgeError(msg)
					master_deferred.reject(msg, err)
				})
				.done(function(){
					_frame.app_main.loading_complete('tablelist_fleets_import')
					$selector.prop('disabled', false)
				})
			
			return master_deferred.promise
		}
}

TablelistFleets.support = {};
TablelistFleets.support.buildfile = (_g.isNWjs || (window.File && window.FileReader && window.FileList && window.Blob && window.URL)) ? true : false;

TablelistFleets.menuOptions_show = function( $el, $el_tablelist ){
	if( !TablelistFleets.menuOptions ){
		let items = [
				$('<menuitem class="mod-checkbox donot_hide option-in-tablelist option-groupbytheme"/>')
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

				$('<menuitem class="mod-checkbox donot_hide option-in-tablelist option-aircraftdefaultmax option-aircraftimportmax"/>')
					.append($('<input/>',{
							'type':	'checkbox',
							'id':	'_input_g' + _g.inputIndex
						}).prop('checked', Lockr.get( 'fleetlist-option-aircraftimportmax' ))
						.on('change', function(e){
							Lockr.set( 'fleetlist-option-aircraftimportmax', e.target.checked )
						}))
					.append($('<label/>',{
							'for':	'_input_g' + (_g.inputIndex++),
							'html':	'导入配置时提升飞行器熟练度至'
						})),

				//$('<hr class="option-in-tablelist"/>'),

				$('<menuitem class="mod-checkbox donot_hide option-aircraftdefaultmax"/>')
					.append($('<input/>',{
							'type':	'checkbox',
							'id':	'_input_g' + _g.inputIndex
						}).prop('checked', Lockr.get( 'fleetlist-option-aircraftdefaultmax' ))
						.on('change', function(e){
							Lockr.set( 'fleetlist-option-aircraftdefaultmax', e.target.checked )
						}))
					.append($('<label/>',{
							'for':	'_input_g' + (_g.inputIndex++),
							'html':	'<span class="inline option-in-tablelist">配装时</span>新增飞行器熟练度默认为'
						})),

				$('<hr class="option-in-infos"/>'),

				$('<menuitem/>',{
						'class':	'option-in-infos',
						'html':		'移除配置'
					}).on('click', function(){
						if( InfosFleet.cur )
							InfosFleet.cur.remove()
					})
			]
				
		if( _g.isNWjs ){
			items = items.concat(TablelistFleets.menuOptionsItemsBuildsLocation())
		}

		TablelistFleets.menuOptions = new _menu({
			'className':	'menu-tablelistfleets-options',
			'items': items
		})
	}

	TablelistFleets.menuOptions.curTablelist = $el_tablelist || null
	
	if( $el_tablelist )
		TablelistFleets.menuOptions.dom.menu.addClass('is-tablelist')
	else
		TablelistFleets.menuOptions.dom.menu.removeClass('is-tablelist')
	TablelistFleets.menuOptions.show($el)
}

TablelistFleets.modalBuildConflictShow = function(data, deferred){
	if( !data )
		return 
	
	if( !TablelistFleets.modalBuildConflict ){
		TablelistFleets.modalBuildConflict = $('<div/>')
			.append( $('<h4>原配置</h4>') )
			.append( TablelistFleets.modalBuildConflictOld = $('<dl class="link_fleet"/>') )
			.append( $('<h4>新配置</h4>') )
			.append( TablelistFleets.modalBuildConflictNew = $('<dl class="link_fleet"/>') )
			.append(
				$('<p class="actions"/>')
					.append( TablelistFleets.modalBuildConflictButtonConfirm = $('<button/>',{
							'class':	'button',
							'html':		'替换'
						}) )
					.append( TablelistFleets.modalBuildConflictButtonCancel = $('<button/>',{
							'class':	'button',
							'html': 	'跳过'
						}) )
			)
	}

	let dataOld
		,htmlFleet = function(data){
			let html = '<i>'
				,ships = InfosFleet.decompress(data.data)[0] || []
				,j = 0;
			while( j < 6 ){
				if( ships[j] && ships[j][0] )
					html+='<img class="img'+(_huCss.csscheck_full('mask-image') ? '' : ' nomask')
							+'" src="' + _g.path.pics.ships + '/' + ships[j][0]+'/0'
							+ (_huCss.csscheck_full('mask-image') ? '.webp' : '-mask-2.png')
							+ '" contextmenu="disabled"'
							+ '/>'
				else
					html+='<s class="img'+(_huCss.csscheck_full('mask-image') ? '' : ' nomask')+'"/>'
				j++
			}
			html+='</i>'
			html = `<dt>${html}<strong>${data['name']}</strong></dt>`
				+ `<span>最后更新: ${ (new Date(data.time_modify)).format('%Y年%m月%d日 %G:%i:%s') }</span>`
			return html
		}

	Q.fcall(function(){
		let _deferred = Q.defer()
		_db.fleets.find({
			_id: data._id
		}, function(err, docs){
			if( err ){
				if( deferred )
					deferred.reject(err)
				else
					_g.log(err)
			}else{
				dataOld = docs[0]
				_deferred.resolve()
			}
		})
		return _deferred.promise
	})
	.then(function(){
		TablelistFleets.modalBuildConflictButtonConfirm
			.off('click')
			.on('click', function(){
				_db.fleets.update({
					_id: data._id
				}, data, {}, function(err, numReplaced){
					if( err ){
						if( deferred )
							deferred.reject(err)
						else
							_g.log(err)
					}else{
						_g.log('build updated ' + numReplaced)
						if( _frame.infos.contentCache.fleet && _frame.infos.contentCache.fleet[data._id] ){
							_frame.infos.contentCache.fleet[data._id].remove()
							delete _frame.infos.contentCache.fleet[data._id]
							try{
								delete _frame.app_main.loading_state[_g.state2URI({
										'infos':	'fleet',
										'id':		data._id
									})]
							}catch(e){}
						}
					}
					if( deferred )
						deferred.resolve()
				})
			})

		if( data.time_modify > dataOld.time_modify ){
			TablelistFleets.modalBuildConflictButtonConfirm.trigger('click')
		}else if( data.time_modify < dataOld.time_modify ){
			TablelistFleets.modalBuildConflictOld
				.attr({
					'data-theme':	dataOld.theme,
					'class': 		'link_fleet'
				}).html(htmlFleet(dataOld))

			TablelistFleets.modalBuildConflictNew
				.attr({
					'data-theme':	data.theme,
					'class': 		'link_fleet'
				}).html(htmlFleet(data))

			TablelistFleets.modalBuildConflictButtonCancel
				.off('click')
				.on('click', function(){
					if( deferred )
						deferred.resolve()
				})

			_frame.modal.show(
				TablelistFleets.modalBuildConflict,
				'配置冲突',
				{
					'classname': 	'infos_fleet infos_fleet_import_conflict',
					'detach':		true,
					'onClose': 		function(){
						if( deferred )
							deferred.resolve()
					}
				}
			)
		}else{
			if( deferred )
				deferred.resolve()
		}

	})
};
TablelistFleets.menuOptionsItemsBuildsLocation = function(){
	// Lockr.get('fleets-builds-file', node.path.join(node.gui.App.dataPath, 'NeDB', 'fleets.json'))
	// Lockr.set('fleets-builds-file', node.path.join(node.gui.App.dataPath, 'NeDB', 'fleets.json'))
	return [
		$('<hr class="option-in-tablelist"/>'),
		
		$('<div class="option-in-tablelist option-filelocation"/>')
			.html('<span>配置文件位置</span>')
			.append(
				TablelistFleets.filelocation_selector = $('<input type="file" class="none" webkitdirectory/>')
					.on('change', function(e){
						TablelistFleets.migrateBuilds( TablelistFleets.filelocation_selector.val() )
					})
			)
			.append(
				$('<button type="button">还原</button>')
					.on('click', function(){
						TablelistFleets.migrateBuilds( node.path.join(node.gui.App.dataPath, 'NeDB') )
					})
			)
			.append(
				$('<button type="button">选择</button>')
					.on('click', function(){
						TablelistFleets.filelocation_selector.click()
					})
			)
	]
};

TablelistFleets.migrateBuilds = function(location){
	if( !location )
		return
	
	if( location.indexOf(';') > -1 )
		location = node.path.dirname( location.split(';')[0] )

	let n = 'fleets.json'
		,exist = false
		,oldPath = Lockr.get('fleets-builds-file', node.path.join(node.gui.App.dataPath, 'NeDB', 'fleets.json'))
		,newPath = node.path.join( location, n )
		,chain = Q()
	
	if( oldPath === newPath )
		return
	
	_frame.app_main.loading_start('tablelist_fleets_newlocation', false)
	TablelistFleets.filelocation_selector.prop('disabled', true)

	try{
		exist = node.fs.lstatSync( node.path.join( location, n ) ) ? true : false
	}catch(e){
	}
	
	function _done(){
		_frame.app_main.loading_complete('tablelist_fleets_newlocation')
		TablelistFleets.filelocation_selector.prop('disabled', false)
		TablelistFleets.filelocation_selector.val('')
		TablelistFleets.menuOptions.curTablelist = null
		_frame.modal.hide()
	}
	
	if( exist ){
		chain = chain.then(function(){
			let deferred = Q.defer()
			if( !TablelistFleets.modalMigrateBuilds ){
				TablelistFleets.modalMigrateBuilds = $('<div/>')
					.html(`在目标目录发现舰队配置文件 <strong>fleets.json</strong>`)
					.append(
						$('<p class="actions"/>')
							.append( TablelistFleets.modalMigrateBuildsButtonMerge = $('<button/>',{
									'class':	'button',
									'html':		'合并配置'
								}) )
							.append( TablelistFleets.modalMigrateBuildsButtonOver = $('<button/>',{
									'class':	'button',
									'html': 	'替换目标文件'
								}) )
							.append( TablelistFleets.modalMigrateBuildsButtonNew = $('<button/>',{
									'class':	'button',
									'html': 	'新建配置文件'
								}) )
					)
			}

			let j = 1
				,newName
			while( exist ){
				newName = 'fleets-' + (j++) + '.json'
				try{
					exist = node.fs.lstatSync( node.path.join( location, newName ) ) ? true : false
				}catch(e){
					exist = false
				}
			}

			TablelistFleets.modalMigrateBuildsButtonMerge.off('click').on('click',function(){
				Q.fcall(function(){
					TablelistFleets.modalMigrateBuilds.detach()
					if( TablelistFleets.menuOptions.curTablelist )
						return TablelistFleets.menuOptions.curTablelist.importBuilds(
								TablelistFleets.filelocation_selector,
								n
							)
					return true
				}).then(function(){
					deferred.resolve()
				})
			})
			
			TablelistFleets.modalMigrateBuildsButtonOver.off('click').on('click',function(){
				node.fs.unlink( node.path.join( location, n ), function(err){
					deferred.resolve()
				} )
			})
			
			TablelistFleets.modalMigrateBuildsButtonNew.html(`新建 ${newName}`).off('click').on('click',function(){
				n = newName
				deferred.resolve()
			})
			
			_frame.modal.show(
				TablelistFleets.modalMigrateBuilds,
				'配置文件冲突',
				{
					'classname': 	'infos_fleet infos_fleet_import',
					'detach':		true,
					'onClose': 		function(){
						_done()
					}
				}
			)
			return deferred.promise
		})
	}
	
	chain = chain
	.then(function(){
		newPath = node.path.join(location, n)
		_g.log(`migrate to ${newPath}`)
		Lockr.set('fleets-builds-file', newPath)
		_db.fleets = new node.nedb({
				filename: 	newPath
			})		
		// copy file to new location
		node.mkdirp.sync( location )
	})	
	.then(function(){
		let deferred = Q.defer()
			,cbCalled = false
			,rd = node.fs.createReadStream( oldPath )
		rd.on("error", function(err) {
			done(err);
		});
		let wr = node.fs.createWriteStream( newPath );
			wr.on("error", function(err) {
			done(err);
		});
		wr.on("close", function(ex) {
			done();
		});
		rd.pipe(wr);
		function done(err) {
			if (!cbCalled) {
				//callback(err, path_src, dest);
				deferred.resolve()
				cbCalled = true;
			}
		}
		return deferred.promise
	})
	.then(function(){
		let deferred = Q.defer()
		_db.fleets.loadDatabase(function(){
			deferred.resolve()
		})
		return deferred.promise
	})
	.catch(function(err){
		_g.err(err, '[舰队] 转移配置文件')
	})
	.done( _done )
};
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
		,label = checkbox.add( $('<label class="checkbox"/>') )
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
							+ '<label class="checkbox" for="' + checkbox_id + '">'
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
