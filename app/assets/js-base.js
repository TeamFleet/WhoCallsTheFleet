
if (!Array.prototype.filter)
    Array.prototype.filter = function(func, thisArg) {
      'use strict';
      if ( ! ((typeof func === 'Function') && this) )
          throw new TypeError();
      
      var len = this.length >>> 0,
          res = new Array(len), // preallocate array
          c = 0, i = -1;
      if (thisArg === undefined)
        while (++i !== len)
          // checks to see if the key was set
          if (i in this)
            if (func(t[i], i, t))
              res[c++] = t[i];
      else
        while (++i !== len)
          // checks to see if the key was set
          if (i in this)
            if (func.call(thisArg, t[i], i, t))
              res[c++] = t[i];
      
      res.length = c; // shrink down array to proper size
      return res;
    };

// https://tc39.github.io/ecma262/#sec-array.prototype.includes
if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, 'includes', {
    value: function(searchElement, fromIndex) {

      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If len is 0, return false.
      if (len === 0) {
        return false;
      }

      // 4. Let n be ? ToInteger(fromIndex).
      //    (If fromIndex is undefined, this step produces the value 0.)
      var n = fromIndex | 0;

      // 5. If n ≥ 0, then
      //  a. Let k be n.
      // 6. Else n < 0,
      //  a. Let k be len + n.
      //  b. If k < 0, let k be 0.
      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

      function sameValueZero(x, y) {
        return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
      }

      // 7. Repeat, while k < len
      while (k < len) {
        // a. Let elementK be the result of ? Get(O, ! ToString(k)).
        // b. If SameValueZero(searchElement, elementK) is true, return true.
        // c. Increase k by 1. 
        if (sameValueZero(o[k], searchElement)) {
          return true;
        }
        k++;
      }

      // 8. Return false
      return false;
    }
  });
}
"use strict";
/*! jQuery v2.1.3 | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k={},l=a.document,m="2.1.3",n=function(a,b){return new n.fn.init(a,b)},o=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};n.fn=n.prototype={jquery:m,constructor:n,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=n.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return n.each(this,a,b)},map:function(a){return this.pushStack(n.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},n.extend=n.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||n.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(n.isPlainObject(d)||(e=n.isArray(d)))?(e?(e=!1,f=c&&n.isArray(c)?c:[]):f=c&&n.isPlainObject(c)?c:{},g[b]=n.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},n.extend({expando:"jQuery"+(m+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===n.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){return!n.isArray(a)&&a-parseFloat(a)+1>=0},isPlainObject:function(a){return"object"!==n.type(a)||a.nodeType||n.isWindow(a)?!1:a.constructor&&!j.call(a.constructor.prototype,"isPrototypeOf")?!1:!0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(a){var b,c=eval;a=n.trim(a),a&&(1===a.indexOf("use strict")?(b=l.createElement("script"),b.text=a,l.head.appendChild(b).parentNode.removeChild(b)):c(a))},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=s(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(o,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?n.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:g.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;c>d;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=s(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(c=a[b],b=a,a=c),n.isFunction(a)?(e=d.call(arguments,2),f=function(){return a.apply(b||this,e.concat(d.call(arguments)))},f.guid=a.guid=a.guid||n.guid++,f):void 0},now:Date.now,support:k}),n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function s(a){var b=a.length,c=n.type(a);return"function"===c||n.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=hb(),z=hb(),A=hb(),B=function(a,b){return a===b&&(l=!0),0},C=1<<31,D={}.hasOwnProperty,E=[],F=E.pop,G=E.push,H=E.push,I=E.slice,J=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},K="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",L="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",N=M.replace("w","w#"),O="\\["+L+"*("+M+")(?:"+L+"*([*^$|!~]?=)"+L+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+N+"))|)"+L+"*\\]",P=":("+M+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+O+")*)|.*)\\)|)",Q=new RegExp(L+"+","g"),R=new RegExp("^"+L+"+|((?:^|[^\\\\])(?:\\\\.)*)"+L+"+$","g"),S=new RegExp("^"+L+"*,"+L+"*"),T=new RegExp("^"+L+"*([>+~]|"+L+")"+L+"*"),U=new RegExp("="+L+"*([^\\]'\"]*?)"+L+"*\\]","g"),V=new RegExp(P),W=new RegExp("^"+N+"$"),X={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),TAG:new RegExp("^("+M.replace("w","w*")+")"),ATTR:new RegExp("^"+O),PSEUDO:new RegExp("^"+P),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+L+"*(even|odd|(([+-]|)(\\d*)n|)"+L+"*(?:([+-]|)"+L+"*(\\d+)|))"+L+"*\\)|)","i"),bool:new RegExp("^(?:"+K+")$","i"),needsContext:new RegExp("^"+L+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+L+"*((?:-\\d)?\\d*)"+L+"*\\)|)(?=[^-]|$)","i")},Y=/^(?:input|select|textarea|button)$/i,Z=/^h\d$/i,$=/^[^{]+\{\s*\[native \w/,_=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ab=/[+~]/,bb=/'|\\/g,cb=new RegExp("\\\\([\\da-f]{1,6}"+L+"?|("+L+")|.)","ig"),db=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},eb=function(){m()};try{H.apply(E=I.call(v.childNodes),v.childNodes),E[v.childNodes.length].nodeType}catch(fb){H={apply:E.length?function(a,b){G.apply(a,I.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function gb(a,b,d,e){var f,h,j,k,l,o,r,s,w,x;if((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,d=d||[],k=b.nodeType,"string"!=typeof a||!a||1!==k&&9!==k&&11!==k)return d;if(!e&&p){if(11!==k&&(f=_.exec(a)))if(j=f[1]){if(9===k){if(h=b.getElementById(j),!h||!h.parentNode)return d;if(h.id===j)return d.push(h),d}else if(b.ownerDocument&&(h=b.ownerDocument.getElementById(j))&&t(b,h)&&h.id===j)return d.push(h),d}else{if(f[2])return H.apply(d,b.getElementsByTagName(a)),d;if((j=f[3])&&c.getElementsByClassName)return H.apply(d,b.getElementsByClassName(j)),d}if(c.qsa&&(!q||!q.test(a))){if(s=r=u,w=b,x=1!==k&&a,1===k&&"object"!==b.nodeName.toLowerCase()){o=g(a),(r=b.getAttribute("id"))?s=r.replace(bb,"\\$&"):b.setAttribute("id",s),s="[id='"+s+"'] ",l=o.length;while(l--)o[l]=s+rb(o[l]);w=ab.test(a)&&pb(b.parentNode)||b,x=o.join(",")}if(x)try{return H.apply(d,w.querySelectorAll(x)),d}catch(y){}finally{r||b.removeAttribute("id")}}}return i(a.replace(R,"$1"),b,d,e)}function hb(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ib(a){return a[u]=!0,a}function jb(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function kb(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function lb(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||C)-(~a.sourceIndex||C);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function mb(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function nb(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function ob(a){return ib(function(b){return b=+b,ib(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function pb(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=gb.support={},f=gb.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=gb.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=g.documentElement,e=g.defaultView,e&&e!==e.top&&(e.addEventListener?e.addEventListener("unload",eb,!1):e.attachEvent&&e.attachEvent("onunload",eb)),p=!f(g),c.attributes=jb(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=jb(function(a){return a.appendChild(g.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=$.test(g.getElementsByClassName),c.getById=jb(function(a){return o.appendChild(a).id=u,!g.getElementsByName||!g.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(cb,db);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(cb,db);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=$.test(g.querySelectorAll))&&(jb(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\f]' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+L+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+L+"*(?:value|"+K+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),jb(function(a){var b=g.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+L+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=$.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&jb(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",P)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=$.test(o.compareDocumentPosition),t=b||$.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===g||a.ownerDocument===v&&t(v,a)?-1:b===g||b.ownerDocument===v&&t(v,b)?1:k?J(k,a)-J(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,h=[a],i=[b];if(!e||!f)return a===g?-1:b===g?1:e?-1:f?1:k?J(k,a)-J(k,b):0;if(e===f)return lb(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)i.unshift(c);while(h[d]===i[d])d++;return d?lb(h[d],i[d]):h[d]===v?-1:i[d]===v?1:0},g):n},gb.matches=function(a,b){return gb(a,null,null,b)},gb.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(U,"='$1']"),!(!c.matchesSelector||!p||r&&r.test(b)||q&&q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return gb(b,n,null,[a]).length>0},gb.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},gb.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&D.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},gb.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},gb.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=gb.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=gb.selectors={cacheLength:50,createPseudo:ib,match:X,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(cb,db),a[3]=(a[3]||a[4]||a[5]||"").replace(cb,db),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||gb.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&gb.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return X.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&V.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(cb,db).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+L+")"+a+"("+L+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=gb.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(Q," ")+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){k=q[u]||(q[u]={}),j=k[a]||[],n=j[0]===w&&j[1],m=j[0]===w&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[w,n,m];break}}else if(s&&(j=(b[u]||(b[u]={}))[a])&&j[0]===w)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(s&&((l[u]||(l[u]={}))[a]=[w,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||gb.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ib(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=J(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ib(function(a){var b=[],c=[],d=h(a.replace(R,"$1"));return d[u]?ib(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ib(function(a){return function(b){return gb(a,b).length>0}}),contains:ib(function(a){return a=a.replace(cb,db),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ib(function(a){return W.test(a||"")||gb.error("unsupported lang: "+a),a=a.replace(cb,db).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Z.test(a.nodeName)},input:function(a){return Y.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:ob(function(){return[0]}),last:ob(function(a,b){return[b-1]}),eq:ob(function(a,b,c){return[0>c?c+b:c]}),even:ob(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:ob(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:ob(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:ob(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=mb(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=nb(b);function qb(){}qb.prototype=d.filters=d.pseudos,d.setFilters=new qb,g=gb.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=S.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=T.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(R," ")}),h=h.slice(c.length));for(g in d.filter)!(e=X[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?gb.error(a):z(a,i).slice(0)};function rb(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function sb(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[u]||(b[u]={}),(h=i[d])&&h[0]===w&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function tb(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function ub(a,b,c){for(var d=0,e=b.length;e>d;d++)gb(a,b[d],c);return c}function vb(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function wb(a,b,c,d,e,f){return d&&!d[u]&&(d=wb(d)),e&&!e[u]&&(e=wb(e,f)),ib(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||ub(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:vb(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=vb(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?J(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=vb(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):H.apply(g,r)})}function xb(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=sb(function(a){return a===b},h,!0),l=sb(function(a){return J(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];f>i;i++)if(c=d.relative[a[i].type])m=[sb(tb(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return wb(i>1&&tb(m),i>1&&rb(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(R,"$1"),c,e>i&&xb(a.slice(i,e)),f>e&&xb(a=a.slice(e)),f>e&&rb(a))}m.push(c)}return tb(m)}function yb(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,m,o,p=0,q="0",r=f&&[],s=[],t=j,u=f||e&&d.find.TAG("*",k),v=w+=null==t?1:Math.random()||.1,x=u.length;for(k&&(j=g!==n&&g);q!==x&&null!=(l=u[q]);q++){if(e&&l){m=0;while(o=a[m++])if(o(l,g,h)){i.push(l);break}k&&(w=v)}c&&((l=!o&&l)&&p--,f&&r.push(l))}if(p+=q,c&&q!==p){m=0;while(o=b[m++])o(r,s,g,h);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=F.call(i));s=vb(s)}H.apply(i,s),k&&!f&&s.length>0&&p+b.length>1&&gb.uniqueSort(i)}return k&&(w=v,j=t),r};return c?ib(f):f}return h=gb.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=xb(b[c]),f[u]?d.push(f):e.push(f);f=A(a,yb(e,d)),f.selector=a}return f},i=gb.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(cb,db),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=X.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(cb,db),ab.test(j[0].type)&&pb(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&rb(j),!a)return H.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,ab.test(a)&&pb(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=jb(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),jb(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||kb("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&jb(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||kb("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),jb(function(a){return null==a.getAttribute("disabled")})||kb(K,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),gb}(a);n.find=t,n.expr=t.selectors,n.expr[":"]=n.expr.pseudos,n.unique=t.uniqueSort,n.text=t.getText,n.isXMLDoc=t.isXML,n.contains=t.contains;var u=n.expr.match.needsContext,v=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,w=/^.[^:#\[\.,]*$/;function x(a,b,c){if(n.isFunction(b))return n.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return n.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(w.test(b))return n.filter(b,a,c);b=n.filter(b,a)}return n.grep(a,function(a){return g.call(b,a)>=0!==c})}n.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?n.find.matchesSelector(d,a)?[d]:[]:n.find.matches(a,n.grep(b,function(a){return 1===a.nodeType}))},n.fn.extend({find:function(a){var b,c=this.length,d=[],e=this;if("string"!=typeof a)return this.pushStack(n(a).filter(function(){for(b=0;c>b;b++)if(n.contains(e[b],this))return!0}));for(b=0;c>b;b++)n.find(a,e[b],d);return d=this.pushStack(c>1?n.unique(d):d),d.selector=this.selector?this.selector+" "+a:a,d},filter:function(a){return this.pushStack(x(this,a||[],!1))},not:function(a){return this.pushStack(x(this,a||[],!0))},is:function(a){return!!x(this,"string"==typeof a&&u.test(a)?n(a):a||[],!1).length}});var y,z=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,A=n.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:z.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||y).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof n?b[0]:b,n.merge(this,n.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:l,!0)),v.test(c[1])&&n.isPlainObject(b))for(c in b)n.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}return d=l.getElementById(c[2]),d&&d.parentNode&&(this.length=1,this[0]=d),this.context=l,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):n.isFunction(a)?"undefined"!=typeof y.ready?y.ready(a):a(n):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),n.makeArray(a,this))};A.prototype=n.fn,y=n(l);var B=/^(?:parents|prev(?:Until|All))/,C={children:!0,contents:!0,next:!0,prev:!0};n.extend({dir:function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&n(a).is(c))break;d.push(a)}return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),n.fn.extend({has:function(a){var b=n(a,this),c=b.length;return this.filter(function(){for(var a=0;c>a;a++)if(n.contains(this,b[a]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=u.test(a)||"string"!=typeof a?n(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&n.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?n.unique(f):f)},index:function(a){return a?"string"==typeof a?g.call(n(a),this[0]):g.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(n.unique(n.merge(this.get(),n(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function D(a,b){while((a=a[b])&&1!==a.nodeType);return a}n.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return n.dir(a,"parentNode")},parentsUntil:function(a,b,c){return n.dir(a,"parentNode",c)},next:function(a){return D(a,"nextSibling")},prev:function(a){return D(a,"previousSibling")},nextAll:function(a){return n.dir(a,"nextSibling")},prevAll:function(a){return n.dir(a,"previousSibling")},nextUntil:function(a,b,c){return n.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return n.dir(a,"previousSibling",c)},siblings:function(a){return n.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return n.sibling(a.firstChild)},contents:function(a){return a.contentDocument||n.merge([],a.childNodes)}},function(a,b){n.fn[a]=function(c,d){var e=n.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=n.filter(d,e)),this.length>1&&(C[a]||n.unique(e),B.test(a)&&e.reverse()),this.pushStack(e)}});var E=/\S+/g,F={};function G(a){var b=F[a]={};return n.each(a.match(E)||[],function(a,c){b[c]=!0}),b}n.Callbacks=function(a){a="string"==typeof a?F[a]||G(a):n.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(b=a.memory&&l,c=!0,g=e||0,e=0,f=h.length,d=!0;h&&f>g;g++)if(h[g].apply(l[0],l[1])===!1&&a.stopOnFalse){b=!1;break}d=!1,h&&(i?i.length&&j(i.shift()):b?h=[]:k.disable())},k={add:function(){if(h){var c=h.length;!function g(b){n.each(b,function(b,c){var d=n.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&g(c)})}(arguments),d?f=h.length:b&&(e=c,j(b))}return this},remove:function(){return h&&n.each(arguments,function(a,b){var c;while((c=n.inArray(b,h,c))>-1)h.splice(c,1),d&&(f>=c&&f--,g>=c&&g--)}),this},has:function(a){return a?n.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],f=0,this},disable:function(){return h=i=b=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,b||k.disable(),this},locked:function(){return!i},fireWith:function(a,b){return!h||c&&!i||(b=b||[],b=[a,b.slice?b.slice():b],d?i.push(b):j(b)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!c}};return k},n.extend({Deferred:function(a){var b=[["resolve","done",n.Callbacks("once memory"),"resolved"],["reject","fail",n.Callbacks("once memory"),"rejected"],["notify","progress",n.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return n.Deferred(function(c){n.each(b,function(b,f){var g=n.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&n.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?n.extend(a,d):d}},e={};return d.pipe=d.then,n.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&n.isFunction(a.promise)?e:0,g=1===f?a:n.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&n.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var H;n.fn.ready=function(a){return n.ready.promise().done(a),this},n.extend({isReady:!1,readyWait:1,holdReady:function(a){a?n.readyWait++:n.ready(!0)},ready:function(a){(a===!0?--n.readyWait:n.isReady)||(n.isReady=!0,a!==!0&&--n.readyWait>0||(H.resolveWith(l,[n]),n.fn.triggerHandler&&(n(l).triggerHandler("ready"),n(l).off("ready"))))}});function I(){l.removeEventListener("DOMContentLoaded",I,!1),a.removeEventListener("load",I,!1),n.ready()}n.ready.promise=function(b){return H||(H=n.Deferred(),"complete"===l.readyState?setTimeout(n.ready):(l.addEventListener("DOMContentLoaded",I,!1),a.addEventListener("load",I,!1))),H.promise(b)},n.ready.promise();var J=n.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===n.type(c)){e=!0;for(h in c)n.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,n.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(n(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f};n.acceptData=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function K(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=n.expando+K.uid++}K.uid=1,K.accepts=n.acceptData,K.prototype={key:function(a){if(!K.accepts(a))return 0;var b={},c=a[this.expando];if(!c){c=K.uid++;try{b[this.expando]={value:c},Object.defineProperties(a,b)}catch(d){b[this.expando]=c,n.extend(a,b)}}return this.cache[c]||(this.cache[c]={}),c},set:function(a,b,c){var d,e=this.key(a),f=this.cache[e];if("string"==typeof b)f[b]=c;else if(n.isEmptyObject(f))n.extend(this.cache[e],b);else for(d in b)f[d]=b[d];return f},get:function(a,b){var c=this.cache[this.key(a)];return void 0===b?c:c[b]},access:function(a,b,c){var d;return void 0===b||b&&"string"==typeof b&&void 0===c?(d=this.get(a,b),void 0!==d?d:this.get(a,n.camelCase(b))):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d,e,f=this.key(a),g=this.cache[f];if(void 0===b)this.cache[f]={};else{n.isArray(b)?d=b.concat(b.map(n.camelCase)):(e=n.camelCase(b),b in g?d=[b,e]:(d=e,d=d in g?[d]:d.match(E)||[])),c=d.length;while(c--)delete g[d[c]]}},hasData:function(a){return!n.isEmptyObject(this.cache[a[this.expando]]||{})},discard:function(a){a[this.expando]&&delete this.cache[a[this.expando]]}};var L=new K,M=new K,N=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,O=/([A-Z])/g;function P(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(O,"-$1").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:N.test(c)?n.parseJSON(c):c}catch(e){}M.set(a,b,c)}else c=void 0;return c}n.extend({hasData:function(a){return M.hasData(a)||L.hasData(a)},data:function(a,b,c){return M.access(a,b,c)
},removeData:function(a,b){M.remove(a,b)},_data:function(a,b,c){return L.access(a,b,c)},_removeData:function(a,b){L.remove(a,b)}}),n.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=M.get(f),1===f.nodeType&&!L.get(f,"hasDataAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=n.camelCase(d.slice(5)),P(f,d,e[d])));L.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){M.set(this,a)}):J(this,function(b){var c,d=n.camelCase(a);if(f&&void 0===b){if(c=M.get(f,a),void 0!==c)return c;if(c=M.get(f,d),void 0!==c)return c;if(c=P(f,d,void 0),void 0!==c)return c}else this.each(function(){var c=M.get(this,d);M.set(this,d,b),-1!==a.indexOf("-")&&void 0!==c&&M.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){M.remove(this,a)})}}),n.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=L.get(a,b),c&&(!d||n.isArray(c)?d=L.access(a,b,n.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=n.queue(a,b),d=c.length,e=c.shift(),f=n._queueHooks(a,b),g=function(){n.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return L.get(a,c)||L.access(a,c,{empty:n.Callbacks("once memory").add(function(){L.remove(a,[b+"queue",c])})})}}),n.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?n.queue(this[0],a):void 0===b?this:this.each(function(){var c=n.queue(this,a,b);n._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&n.dequeue(this,a)})},dequeue:function(a){return this.each(function(){n.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=n.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=L.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var Q=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,R=["Top","Right","Bottom","Left"],S=function(a,b){return a=b||a,"none"===n.css(a,"display")||!n.contains(a.ownerDocument,a)},T=/^(?:checkbox|radio)$/i;!function(){var a=l.createDocumentFragment(),b=a.appendChild(l.createElement("div")),c=l.createElement("input");c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),b.appendChild(c),k.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",k.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var U="undefined";k.focusinBubbles="onfocusin"in a;var V=/^key/,W=/^(?:mouse|pointer|contextmenu)|click/,X=/^(?:focusinfocus|focusoutblur)$/,Y=/^([^.]*)(?:\.(.+)|)$/;function Z(){return!0}function $(){return!1}function _(){try{return l.activeElement}catch(a){}}n.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=L.get(a);if(r){c.handler&&(f=c,c=f.handler,e=f.selector),c.guid||(c.guid=n.guid++),(i=r.events)||(i=r.events={}),(g=r.handle)||(g=r.handle=function(b){return typeof n!==U&&n.event.triggered!==b.type?n.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(E)||[""],j=b.length;while(j--)h=Y.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o&&(l=n.event.special[o]||{},o=(e?l.delegateType:l.bindType)||o,l=n.event.special[o]||{},k=n.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&n.expr.match.needsContext.test(e),namespace:p.join(".")},f),(m=i[o])||(m=i[o]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,p,g)!==!1||a.addEventListener&&a.addEventListener(o,g,!1)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),n.event.global[o]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=L.hasData(a)&&L.get(a);if(r&&(i=r.events)){b=(b||"").match(E)||[""],j=b.length;while(j--)if(h=Y.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=n.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,m=i[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&q!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||n.removeEvent(a,o,r.handle),delete i[o])}else for(o in i)n.event.remove(a,o+b[j],c,d,!0);n.isEmptyObject(i)&&(delete r.handle,L.remove(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,m,o,p=[d||l],q=j.call(b,"type")?b.type:b,r=j.call(b,"namespace")?b.namespace.split("."):[];if(g=h=d=d||l,3!==d.nodeType&&8!==d.nodeType&&!X.test(q+n.event.triggered)&&(q.indexOf(".")>=0&&(r=q.split("."),q=r.shift(),r.sort()),k=q.indexOf(":")<0&&"on"+q,b=b[n.expando]?b:new n.Event(q,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=r.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+r.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:n.makeArray(c,[b]),o=n.event.special[q]||{},e||!o.trigger||o.trigger.apply(d,c)!==!1)){if(!e&&!o.noBubble&&!n.isWindow(d)){for(i=o.delegateType||q,X.test(i+q)||(g=g.parentNode);g;g=g.parentNode)p.push(g),h=g;h===(d.ownerDocument||l)&&p.push(h.defaultView||h.parentWindow||a)}f=0;while((g=p[f++])&&!b.isPropagationStopped())b.type=f>1?i:o.bindType||q,m=(L.get(g,"events")||{})[b.type]&&L.get(g,"handle"),m&&m.apply(g,c),m=k&&g[k],m&&m.apply&&n.acceptData(g)&&(b.result=m.apply(g,c),b.result===!1&&b.preventDefault());return b.type=q,e||b.isDefaultPrevented()||o._default&&o._default.apply(p.pop(),c)!==!1||!n.acceptData(d)||k&&n.isFunction(d[q])&&!n.isWindow(d)&&(h=d[k],h&&(d[k]=null),n.event.triggered=q,d[q](),n.event.triggered=void 0,h&&(d[k]=h)),b.result}},dispatch:function(a){a=n.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(L.get(this,"events")||{})[a.type]||[],k=n.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=n.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,c=0;while((g=f.handlers[c++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(g.namespace))&&(a.handleObj=g,a.data=g.data,e=((n.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==e&&(a.result=e)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!==this;i=i.parentNode||this)if(i.disabled!==!0||"click"!==a.type){for(d=[],c=0;h>c;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?n(e,this).index(i)>=0:n.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button;return null==a.pageX&&null!=b.clientX&&(c=a.target.ownerDocument||l,d=c.documentElement,e=c.body,a.pageX=b.clientX+(d&&d.scrollLeft||e&&e.scrollLeft||0)-(d&&d.clientLeft||e&&e.clientLeft||0),a.pageY=b.clientY+(d&&d.scrollTop||e&&e.scrollTop||0)-(d&&d.clientTop||e&&e.clientTop||0)),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},fix:function(a){if(a[n.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=W.test(e)?this.mouseHooks:V.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new n.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=l),3===a.target.nodeType&&(a.target=a.target.parentNode),g.filter?g.filter(a,f):a},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==_()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===_()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&n.nodeName(this,"input")?(this.click(),!1):void 0},_default:function(a){return n.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=n.extend(new n.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?n.event.trigger(e,null,b):n.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},n.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)},n.Event=function(a,b){return this instanceof n.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?Z:$):this.type=a,b&&n.extend(this,b),this.timeStamp=a&&a.timeStamp||n.now(),void(this[n.expando]=!0)):new n.Event(a,b)},n.Event.prototype={isDefaultPrevented:$,isPropagationStopped:$,isImmediatePropagationStopped:$,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=Z,a&&a.preventDefault&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=Z,a&&a.stopPropagation&&a.stopPropagation()},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=Z,a&&a.stopImmediatePropagation&&a.stopImmediatePropagation(),this.stopPropagation()}},n.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){n.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!n.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),k.focusinBubbles||n.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){n.event.simulate(b,a.target,n.event.fix(a),!0)};n.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=L.access(d,b);e||d.addEventListener(a,c,!0),L.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=L.access(d,b)-1;e?L.access(d,b,e):(d.removeEventListener(a,c,!0),L.remove(d,b))}}}),n.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(g in a)this.on(g,b,c,a[g],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=$;else if(!d)return this;return 1===e&&(f=d,d=function(a){return n().off(a),f.apply(this,arguments)},d.guid=f.guid||(f.guid=n.guid++)),this.each(function(){n.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,n(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=$),this.each(function(){n.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){n.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?n.event.trigger(a,b,c,!0):void 0}});var ab=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bb=/<([\w:]+)/,cb=/<|&#?\w+;/,db=/<(?:script|style|link)/i,eb=/checked\s*(?:[^=]|=\s*.checked.)/i,fb=/^$|\/(?:java|ecma)script/i,gb=/^true\/(.*)/,hb=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,ib={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ib.optgroup=ib.option,ib.tbody=ib.tfoot=ib.colgroup=ib.caption=ib.thead,ib.th=ib.td;function jb(a,b){return n.nodeName(a,"table")&&n.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function kb(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function lb(a){var b=gb.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function mb(a,b){for(var c=0,d=a.length;d>c;c++)L.set(a[c],"globalEval",!b||L.get(b[c],"globalEval"))}function nb(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(L.hasData(a)&&(f=L.access(a),g=L.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;d>c;c++)n.event.add(b,e,j[e][c])}M.hasData(a)&&(h=M.access(a),i=n.extend({},h),M.set(b,i))}}function ob(a,b){var c=a.getElementsByTagName?a.getElementsByTagName(b||"*"):a.querySelectorAll?a.querySelectorAll(b||"*"):[];return void 0===b||b&&n.nodeName(a,b)?n.merge([a],c):c}function pb(a,b){var c=b.nodeName.toLowerCase();"input"===c&&T.test(a.type)?b.checked=a.checked:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}n.extend({clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=n.contains(a.ownerDocument,a);if(!(k.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||n.isXMLDoc(a)))for(g=ob(h),f=ob(a),d=0,e=f.length;e>d;d++)pb(f[d],g[d]);if(b)if(c)for(f=f||ob(a),g=g||ob(h),d=0,e=f.length;e>d;d++)nb(f[d],g[d]);else nb(a,h);return g=ob(h,"script"),g.length>0&&mb(g,!i&&ob(a,"script")),h},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,k=b.createDocumentFragment(),l=[],m=0,o=a.length;o>m;m++)if(e=a[m],e||0===e)if("object"===n.type(e))n.merge(l,e.nodeType?[e]:e);else if(cb.test(e)){f=f||k.appendChild(b.createElement("div")),g=(bb.exec(e)||["",""])[1].toLowerCase(),h=ib[g]||ib._default,f.innerHTML=h[1]+e.replace(ab,"<$1></$2>")+h[2],j=h[0];while(j--)f=f.lastChild;n.merge(l,f.childNodes),f=k.firstChild,f.textContent=""}else l.push(b.createTextNode(e));k.textContent="",m=0;while(e=l[m++])if((!d||-1===n.inArray(e,d))&&(i=n.contains(e.ownerDocument,e),f=ob(k.appendChild(e),"script"),i&&mb(f),c)){j=0;while(e=f[j++])fb.test(e.type||"")&&c.push(e)}return k},cleanData:function(a){for(var b,c,d,e,f=n.event.special,g=0;void 0!==(c=a[g]);g++){if(n.acceptData(c)&&(e=c[L.expando],e&&(b=L.cache[e]))){if(b.events)for(d in b.events)f[d]?n.event.remove(c,d):n.removeEvent(c,d,b.handle);L.cache[e]&&delete L.cache[e]}delete M.cache[c[M.expando]]}}}),n.fn.extend({text:function(a){return J(this,function(a){return void 0===a?n.text(this):this.empty().each(function(){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&(this.textContent=a)})},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=jb(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=jb(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?n.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||n.cleanData(ob(c)),c.parentNode&&(b&&n.contains(c.ownerDocument,c)&&mb(ob(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(n.cleanData(ob(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return n.clone(this,a,b)})},html:function(a){return J(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!db.test(a)&&!ib[(bb.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(ab,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(n.cleanData(ob(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,n.cleanData(ob(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,l=this.length,m=this,o=l-1,p=a[0],q=n.isFunction(p);if(q||l>1&&"string"==typeof p&&!k.checkClone&&eb.test(p))return this.each(function(c){var d=m.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(l&&(c=n.buildFragment(a,this[0].ownerDocument,!1,this),d=c.firstChild,1===c.childNodes.length&&(c=d),d)){for(f=n.map(ob(c,"script"),kb),g=f.length;l>j;j++)h=c,j!==o&&(h=n.clone(h,!0,!0),g&&n.merge(f,ob(h,"script"))),b.call(this[j],h,j);if(g)for(i=f[f.length-1].ownerDocument,n.map(f,lb),j=0;g>j;j++)h=f[j],fb.test(h.type||"")&&!L.access(h,"globalEval")&&n.contains(i,h)&&(h.src?n._evalUrl&&n._evalUrl(h.src):n.globalEval(h.textContent.replace(hb,"")))}return this}}),n.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){n.fn[a]=function(a){for(var c,d=[],e=n(a),g=e.length-1,h=0;g>=h;h++)c=h===g?this:this.clone(!0),n(e[h])[b](c),f.apply(d,c.get());return this.pushStack(d)}});var qb,rb={};function sb(b,c){var d,e=n(c.createElement(b)).appendTo(c.body),f=a.getDefaultComputedStyle&&(d=a.getDefaultComputedStyle(e[0]))?d.display:n.css(e[0],"display");return e.detach(),f}function tb(a){var b=l,c=rb[a];return c||(c=sb(a,b),"none"!==c&&c||(qb=(qb||n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=qb[0].contentDocument,b.write(),b.close(),c=sb(a,b),qb.detach()),rb[a]=c),c}var ub=/^margin/,vb=new RegExp("^("+Q+")(?!px)[a-z%]+$","i"),wb=function(b){return b.ownerDocument.defaultView.opener?b.ownerDocument.defaultView.getComputedStyle(b,null):a.getComputedStyle(b,null)};function xb(a,b,c){var d,e,f,g,h=a.style;return c=c||wb(a),c&&(g=c.getPropertyValue(b)||c[b]),c&&(""!==g||n.contains(a.ownerDocument,a)||(g=n.style(a,b)),vb.test(g)&&ub.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0!==g?g+"":g}function yb(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d=l.documentElement,e=l.createElement("div"),f=l.createElement("div");if(f.style){f.style.backgroundClip="content-box",f.cloneNode(!0).style.backgroundClip="",k.clearCloneStyle="content-box"===f.style.backgroundClip,e.style.cssText="border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute",e.appendChild(f);function g(){f.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",f.innerHTML="",d.appendChild(e);var g=a.getComputedStyle(f,null);b="1%"!==g.top,c="4px"===g.width,d.removeChild(e)}a.getComputedStyle&&n.extend(k,{pixelPosition:function(){return g(),b},boxSizingReliable:function(){return null==c&&g(),c},reliableMarginRight:function(){var b,c=f.appendChild(l.createElement("div"));return c.style.cssText=f.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",c.style.marginRight=c.style.width="0",f.style.width="1px",d.appendChild(e),b=!parseFloat(a.getComputedStyle(c,null).marginRight),d.removeChild(e),f.removeChild(c),b}})}}(),n.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var zb=/^(none|table(?!-c[ea]).+)/,Ab=new RegExp("^("+Q+")(.*)$","i"),Bb=new RegExp("^([+-])=("+Q+")","i"),Cb={position:"absolute",visibility:"hidden",display:"block"},Db={letterSpacing:"0",fontWeight:"400"},Eb=["Webkit","O","Moz","ms"];function Fb(a,b){if(b in a)return b;var c=b[0].toUpperCase()+b.slice(1),d=b,e=Eb.length;while(e--)if(b=Eb[e]+c,b in a)return b;return d}function Gb(a,b,c){var d=Ab.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Hb(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=n.css(a,c+R[f],!0,e)),d?("content"===c&&(g-=n.css(a,"padding"+R[f],!0,e)),"margin"!==c&&(g-=n.css(a,"border"+R[f]+"Width",!0,e))):(g+=n.css(a,"padding"+R[f],!0,e),"padding"!==c&&(g+=n.css(a,"border"+R[f]+"Width",!0,e)));return g}function Ib(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=wb(a),g="border-box"===n.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=xb(a,b,f),(0>e||null==e)&&(e=a.style[b]),vb.test(e))return e;d=g&&(k.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Hb(a,b,c||(g?"border":"content"),d,f)+"px"}function Jb(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=L.get(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&S(d)&&(f[g]=L.access(d,"olddisplay",tb(d.nodeName)))):(e=S(d),"none"===c&&e||L.set(d,"olddisplay",e?c:n.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}n.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=xb(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=n.camelCase(b),i=a.style;return b=n.cssProps[h]||(n.cssProps[h]=Fb(i,h)),g=n.cssHooks[b]||n.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]:(f=typeof c,"string"===f&&(e=Bb.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(n.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||n.cssNumber[h]||(c+="px"),k.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=n.camelCase(b);return b=n.cssProps[h]||(n.cssProps[h]=Fb(a.style,h)),g=n.cssHooks[b]||n.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=xb(a,b,d)),"normal"===e&&b in Db&&(e=Db[b]),""===c||c?(f=parseFloat(e),c===!0||n.isNumeric(f)?f||0:e):e}}),n.each(["height","width"],function(a,b){n.cssHooks[b]={get:function(a,c,d){return c?zb.test(n.css(a,"display"))&&0===a.offsetWidth?n.swap(a,Cb,function(){return Ib(a,b,d)}):Ib(a,b,d):void 0},set:function(a,c,d){var e=d&&wb(a);return Gb(a,c,d?Hb(a,b,d,"border-box"===n.css(a,"boxSizing",!1,e),e):0)}}}),n.cssHooks.marginRight=yb(k.reliableMarginRight,function(a,b){return b?n.swap(a,{display:"inline-block"},xb,[a,"marginRight"]):void 0}),n.each({margin:"",padding:"",border:"Width"},function(a,b){n.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+R[d]+b]=f[d]||f[d-2]||f[0];return e}},ub.test(a)||(n.cssHooks[a+b].set=Gb)}),n.fn.extend({css:function(a,b){return J(this,function(a,b,c){var d,e,f={},g=0;if(n.isArray(b)){for(d=wb(a),e=b.length;e>g;g++)f[b[g]]=n.css(a,b[g],!1,d);return f}return void 0!==c?n.style(a,b,c):n.css(a,b)},a,b,arguments.length>1)},show:function(){return Jb(this,!0)},hide:function(){return Jb(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){S(this)?n(this).show():n(this).hide()})}});function Kb(a,b,c,d,e){return new Kb.prototype.init(a,b,c,d,e)}n.Tween=Kb,Kb.prototype={constructor:Kb,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(n.cssNumber[c]?"":"px")},cur:function(){var a=Kb.propHooks[this.prop];return a&&a.get?a.get(this):Kb.propHooks._default.get(this)},run:function(a){var b,c=Kb.propHooks[this.prop];return this.pos=b=this.options.duration?n.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Kb.propHooks._default.set(this),this}},Kb.prototype.init.prototype=Kb.prototype,Kb.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=n.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){n.fx.step[a.prop]?n.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[n.cssProps[a.prop]]||n.cssHooks[a.prop])?n.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},Kb.propHooks.scrollTop=Kb.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},n.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},n.fx=Kb.prototype.init,n.fx.step={};var Lb,Mb,Nb=/^(?:toggle|show|hide)$/,Ob=new RegExp("^(?:([+-])=|)("+Q+")([a-z%]*)$","i"),Pb=/queueHooks$/,Qb=[Vb],Rb={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=Ob.exec(b),f=e&&e[3]||(n.cssNumber[a]?"":"px"),g=(n.cssNumber[a]||"px"!==f&&+d)&&Ob.exec(n.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,n.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function Sb(){return setTimeout(function(){Lb=void 0}),Lb=n.now()}function Tb(a,b){var c,d=0,e={height:a};for(b=b?1:0;4>d;d+=2-b)c=R[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function Ub(a,b,c){for(var d,e=(Rb[b]||[]).concat(Rb["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function Vb(a,b,c){var d,e,f,g,h,i,j,k,l=this,m={},o=a.style,p=a.nodeType&&S(a),q=L.get(a,"fxshow");c.queue||(h=n._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,l.always(function(){l.always(function(){h.unqueued--,n.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[o.overflow,o.overflowX,o.overflowY],j=n.css(a,"display"),k="none"===j?L.get(a,"olddisplay")||tb(a.nodeName):j,"inline"===k&&"none"===n.css(a,"float")&&(o.display="inline-block")),c.overflow&&(o.overflow="hidden",l.always(function(){o.overflow=c.overflow[0],o.overflowX=c.overflow[1],o.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],Nb.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(p?"hide":"show")){if("show"!==e||!q||void 0===q[d])continue;p=!0}m[d]=q&&q[d]||n.style(a,d)}else j=void 0;if(n.isEmptyObject(m))"inline"===("none"===j?tb(a.nodeName):j)&&(o.display=j);else{q?"hidden"in q&&(p=q.hidden):q=L.access(a,"fxshow",{}),f&&(q.hidden=!p),p?n(a).show():l.done(function(){n(a).hide()}),l.done(function(){var b;L.remove(a,"fxshow");for(b in m)n.style(a,b,m[b])});for(d in m)g=Ub(p?q[d]:0,d,l),d in q||(q[d]=g.start,p&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function Wb(a,b){var c,d,e,f,g;for(c in a)if(d=n.camelCase(c),e=b[d],f=a[c],n.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=n.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function Xb(a,b,c){var d,e,f=0,g=Qb.length,h=n.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=Lb||Sb(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:n.extend({},b),opts:n.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:Lb||Sb(),duration:c.duration,tweens:[],createTween:function(b,c){var d=n.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(Wb(k,j.opts.specialEasing);g>f;f++)if(d=Qb[f].call(j,a,k,j.opts))return d;return n.map(k,Ub,j),n.isFunction(j.opts.start)&&j.opts.start.call(a,j),n.fx.timer(n.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}n.Animation=n.extend(Xb,{tweener:function(a,b){n.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],Rb[c]=Rb[c]||[],Rb[c].unshift(b)},prefilter:function(a,b){b?Qb.unshift(a):Qb.push(a)}}),n.speed=function(a,b,c){var d=a&&"object"==typeof a?n.extend({},a):{complete:c||!c&&b||n.isFunction(a)&&a,duration:a,easing:c&&b||b&&!n.isFunction(b)&&b};return d.duration=n.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in n.fx.speeds?n.fx.speeds[d.duration]:n.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){n.isFunction(d.old)&&d.old.call(this),d.queue&&n.dequeue(this,d.queue)},d},n.fn.extend({fadeTo:function(a,b,c,d){return this.filter(S).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=n.isEmptyObject(a),f=n.speed(b,c,d),g=function(){var b=Xb(this,n.extend({},a),f);(e||L.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=n.timers,g=L.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&Pb.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&n.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=L.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=n.timers,g=d?d.length:0;for(c.finish=!0,n.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),n.each(["toggle","show","hide"],function(a,b){var c=n.fn[b];n.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(Tb(b,!0),a,d,e)}}),n.each({slideDown:Tb("show"),slideUp:Tb("hide"),slideToggle:Tb("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){n.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),n.timers=[],n.fx.tick=function(){var a,b=0,c=n.timers;for(Lb=n.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||n.fx.stop(),Lb=void 0},n.fx.timer=function(a){n.timers.push(a),a()?n.fx.start():n.timers.pop()},n.fx.interval=13,n.fx.start=function(){Mb||(Mb=setInterval(n.fx.tick,n.fx.interval))},n.fx.stop=function(){clearInterval(Mb),Mb=null},n.fx.speeds={slow:600,fast:200,_default:400},n.fn.delay=function(a,b){return a=n.fx?n.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a=l.createElement("input"),b=l.createElement("select"),c=b.appendChild(l.createElement("option"));a.type="checkbox",k.checkOn=""!==a.value,k.optSelected=c.selected,b.disabled=!0,k.optDisabled=!c.disabled,a=l.createElement("input"),a.value="t",a.type="radio",k.radioValue="t"===a.value}();var Yb,Zb,$b=n.expr.attrHandle;n.fn.extend({attr:function(a,b){return J(this,n.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){n.removeAttr(this,a)})}}),n.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===U?n.prop(a,b,c):(1===f&&n.isXMLDoc(a)||(b=b.toLowerCase(),d=n.attrHooks[b]||(n.expr.match.bool.test(b)?Zb:Yb)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=n.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void n.removeAttr(a,b))
},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(E);if(f&&1===a.nodeType)while(c=f[e++])d=n.propFix[c]||c,n.expr.match.bool.test(c)&&(a[d]=!1),a.removeAttribute(c)},attrHooks:{type:{set:function(a,b){if(!k.radioValue&&"radio"===b&&n.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),Zb={set:function(a,b,c){return b===!1?n.removeAttr(a,c):a.setAttribute(c,c),c}},n.each(n.expr.match.bool.source.match(/\w+/g),function(a,b){var c=$b[b]||n.find.attr;$b[b]=function(a,b,d){var e,f;return d||(f=$b[b],$b[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,$b[b]=f),e}});var _b=/^(?:input|select|textarea|button)$/i;n.fn.extend({prop:function(a,b){return J(this,n.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[n.propFix[a]||a]})}}),n.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!n.isXMLDoc(a),f&&(b=n.propFix[b]||b,e=n.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){return a.hasAttribute("tabindex")||_b.test(a.nodeName)||a.href?a.tabIndex:-1}}}}),k.optSelected||(n.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null}}),n.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){n.propFix[this.toLowerCase()]=this});var ac=/[\t\r\n\f]/g;n.fn.extend({addClass:function(a){var b,c,d,e,f,g,h="string"==typeof a&&a,i=0,j=this.length;if(n.isFunction(a))return this.each(function(b){n(this).addClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ac," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=n.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0===arguments.length||"string"==typeof a&&a,i=0,j=this.length;if(n.isFunction(a))return this.each(function(b){n(this).removeClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ac," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?n.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(n.isFunction(a)?function(c){n(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=n(this),f=a.match(E)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===U||"boolean"===c)&&(this.className&&L.set(this,"__className__",this.className),this.className=this.className||a===!1?"":L.get(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(ac," ").indexOf(b)>=0)return!0;return!1}});var bc=/\r/g;n.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=n.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,n(this).val()):a,null==e?e="":"number"==typeof e?e+="":n.isArray(e)&&(e=n.map(e,function(a){return null==a?"":a+""})),b=n.valHooks[this.type]||n.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=n.valHooks[e.type]||n.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(bc,""):null==c?"":c)}}}),n.extend({valHooks:{option:{get:function(a){var b=n.find.attr(a,"value");return null!=b?b:n.trim(n.text(a))}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(k.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&n.nodeName(c.parentNode,"optgroup"))){if(b=n(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=n.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=n.inArray(d.value,f)>=0)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),n.each(["radio","checkbox"],function(){n.valHooks[this]={set:function(a,b){return n.isArray(b)?a.checked=n.inArray(n(a).val(),b)>=0:void 0}},k.checkOn||(n.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})}),n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){n.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),n.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var cc=n.now(),dc=/\?/;n.parseJSON=function(a){return JSON.parse(a+"")},n.parseXML=function(a){var b,c;if(!a||"string"!=typeof a)return null;try{c=new DOMParser,b=c.parseFromString(a,"text/xml")}catch(d){b=void 0}return(!b||b.getElementsByTagName("parsererror").length)&&n.error("Invalid XML: "+a),b};var ec=/#.*$/,fc=/([?&])_=[^&]*/,gc=/^(.*?):[ \t]*([^\r\n]*)$/gm,hc=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,ic=/^(?:GET|HEAD)$/,jc=/^\/\//,kc=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,lc={},mc={},nc="*/".concat("*"),oc=a.location.href,pc=kc.exec(oc.toLowerCase())||[];function qc(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(E)||[];if(n.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function rc(a,b,c,d){var e={},f=a===mc;function g(h){var i;return e[h]=!0,n.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function sc(a,b){var c,d,e=n.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&n.extend(!0,a,d),a}function tc(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function uc(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}n.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:oc,type:"GET",isLocal:hc.test(pc[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":nc,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":n.parseJSON,"text xml":n.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?sc(sc(a,n.ajaxSettings),b):sc(n.ajaxSettings,a)},ajaxPrefilter:qc(lc),ajaxTransport:qc(mc),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=n.ajaxSetup({},b),l=k.context||k,m=k.context&&(l.nodeType||l.jquery)?n(l):n.event,o=n.Deferred(),p=n.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!f){f={};while(b=gc.exec(e))f[b[1].toLowerCase()]=b[2]}b=f[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?e:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return c&&c.abort(b),x(0,b),this}};if(o.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||oc)+"").replace(ec,"").replace(jc,pc[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=n.trim(k.dataType||"*").toLowerCase().match(E)||[""],null==k.crossDomain&&(h=kc.exec(k.url.toLowerCase()),k.crossDomain=!(!h||h[1]===pc[1]&&h[2]===pc[2]&&(h[3]||("http:"===h[1]?"80":"443"))===(pc[3]||("http:"===pc[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=n.param(k.data,k.traditional)),rc(lc,k,b,v),2===t)return v;i=n.event&&k.global,i&&0===n.active++&&n.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!ic.test(k.type),d=k.url,k.hasContent||(k.data&&(d=k.url+=(dc.test(d)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=fc.test(d)?d.replace(fc,"$1_="+cc++):d+(dc.test(d)?"&":"?")+"_="+cc++)),k.ifModified&&(n.lastModified[d]&&v.setRequestHeader("If-Modified-Since",n.lastModified[d]),n.etag[d]&&v.setRequestHeader("If-None-Match",n.etag[d])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+nc+"; q=0.01":""):k.accepts["*"]);for(j in k.headers)v.setRequestHeader(j,k.headers[j]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(j in{success:1,error:1,complete:1})v[j](k[j]);if(c=rc(mc,k,b,v)){v.readyState=1,i&&m.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,c.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,f,h){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),c=void 0,e=h||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,f&&(u=tc(k,v,f)),u=uc(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(n.lastModified[d]=w),w=v.getResponseHeader("etag"),w&&(n.etag[d]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?o.resolveWith(l,[r,x,v]):o.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,i&&m.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),i&&(m.trigger("ajaxComplete",[v,k]),--n.active||n.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return n.get(a,b,c,"json")},getScript:function(a,b){return n.get(a,void 0,b,"script")}}),n.each(["get","post"],function(a,b){n[b]=function(a,c,d,e){return n.isFunction(c)&&(e=e||d,d=c,c=void 0),n.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),n._evalUrl=function(a){return n.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},n.fn.extend({wrapAll:function(a){var b;return n.isFunction(a)?this.each(function(b){n(this).wrapAll(a.call(this,b))}):(this[0]&&(b=n(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this)},wrapInner:function(a){return this.each(n.isFunction(a)?function(b){n(this).wrapInner(a.call(this,b))}:function(){var b=n(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=n.isFunction(a);return this.each(function(c){n(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){n.nodeName(this,"body")||n(this).replaceWith(this.childNodes)}).end()}}),n.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0},n.expr.filters.visible=function(a){return!n.expr.filters.hidden(a)};var vc=/%20/g,wc=/\[\]$/,xc=/\r?\n/g,yc=/^(?:submit|button|image|reset|file)$/i,zc=/^(?:input|select|textarea|keygen)/i;function Ac(a,b,c,d){var e;if(n.isArray(b))n.each(b,function(b,e){c||wc.test(a)?d(a,e):Ac(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==n.type(b))d(a,b);else for(e in b)Ac(a+"["+e+"]",b[e],c,d)}n.param=function(a,b){var c,d=[],e=function(a,b){b=n.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=n.ajaxSettings&&n.ajaxSettings.traditional),n.isArray(a)||a.jquery&&!n.isPlainObject(a))n.each(a,function(){e(this.name,this.value)});else for(c in a)Ac(c,a[c],b,e);return d.join("&").replace(vc,"+")},n.fn.extend({serialize:function(){return n.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=n.prop(this,"elements");return a?n.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!n(this).is(":disabled")&&zc.test(this.nodeName)&&!yc.test(a)&&(this.checked||!T.test(a))}).map(function(a,b){var c=n(this).val();return null==c?null:n.isArray(c)?n.map(c,function(a){return{name:b.name,value:a.replace(xc,"\r\n")}}):{name:b.name,value:c.replace(xc,"\r\n")}}).get()}}),n.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(a){}};var Bc=0,Cc={},Dc={0:200,1223:204},Ec=n.ajaxSettings.xhr();a.attachEvent&&a.attachEvent("onunload",function(){for(var a in Cc)Cc[a]()}),k.cors=!!Ec&&"withCredentials"in Ec,k.ajax=Ec=!!Ec,n.ajaxTransport(function(a){var b;return k.cors||Ec&&!a.crossDomain?{send:function(c,d){var e,f=a.xhr(),g=++Bc;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)f.setRequestHeader(e,c[e]);b=function(a){return function(){b&&(delete Cc[g],b=f.onload=f.onerror=null,"abort"===a?f.abort():"error"===a?d(f.status,f.statusText):d(Dc[f.status]||f.status,f.statusText,"string"==typeof f.responseText?{text:f.responseText}:void 0,f.getAllResponseHeaders()))}},f.onload=b(),f.onerror=b("error"),b=Cc[g]=b("abort");try{f.send(a.hasContent&&a.data||null)}catch(h){if(b)throw h}},abort:function(){b&&b()}}:void 0}),n.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return n.globalEval(a),a}}}),n.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),n.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(d,e){b=n("<script>").prop({async:!0,charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&e("error"===a.type?404:200,a.type)}),l.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Fc=[],Gc=/(=)\?(?=&|$)|\?\?/;n.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Fc.pop()||n.expando+"_"+cc++;return this[a]=!0,a}}),n.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Gc.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Gc.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=n.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Gc,"$1"+e):b.jsonp!==!1&&(b.url+=(dc.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||n.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Fc.push(e)),g&&n.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),n.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||l;var d=v.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=n.buildFragment([a],b,e),e&&e.length&&n(e).remove(),n.merge([],d.childNodes))};var Hc=n.fn.load;n.fn.load=function(a,b,c){if("string"!=typeof a&&Hc)return Hc.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=n.trim(a.slice(h)),a=a.slice(0,h)),n.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&n.ajax({url:a,type:e,dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?n("<div>").append(n.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,f||[a.responseText,b,a])}),this},n.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){n.fn[b]=function(a){return this.on(b,a)}}),n.expr.filters.animated=function(a){return n.grep(n.timers,function(b){return a===b.elem}).length};var Ic=a.document.documentElement;function Jc(a){return n.isWindow(a)?a:9===a.nodeType&&a.defaultView}n.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=n.css(a,"position"),l=n(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=n.css(a,"top"),i=n.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),n.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},n.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){n.offset.setOffset(this,a,b)});var b,c,d=this[0],e={top:0,left:0},f=d&&d.ownerDocument;if(f)return b=f.documentElement,n.contains(b,d)?(typeof d.getBoundingClientRect!==U&&(e=d.getBoundingClientRect()),c=Jc(f),{top:e.top+c.pageYOffset-b.clientTop,left:e.left+c.pageXOffset-b.clientLeft}):e},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===n.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),n.nodeName(a[0],"html")||(d=a.offset()),d.top+=n.css(a[0],"borderTopWidth",!0),d.left+=n.css(a[0],"borderLeftWidth",!0)),{top:b.top-d.top-n.css(c,"marginTop",!0),left:b.left-d.left-n.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||Ic;while(a&&!n.nodeName(a,"html")&&"static"===n.css(a,"position"))a=a.offsetParent;return a||Ic})}}),n.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(b,c){var d="pageYOffset"===c;n.fn[b]=function(e){return J(this,function(b,e,f){var g=Jc(b);return void 0===f?g?g[c]:b[e]:void(g?g.scrollTo(d?a.pageXOffset:f,d?f:a.pageYOffset):b[e]=f)},b,e,arguments.length,null)}}),n.each(["top","left"],function(a,b){n.cssHooks[b]=yb(k.pixelPosition,function(a,c){return c?(c=xb(a,b),vb.test(c)?n(a).position()[b]+"px":c):void 0})}),n.each({Height:"height",Width:"width"},function(a,b){n.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){n.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return J(this,function(b,c,d){var e;return n.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?n.css(b,c,g):n.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),n.fn.size=function(){return this.length},n.fn.andSelf=n.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return n});var Kc=a.jQuery,Lc=a.$;return n.noConflict=function(b){return a.$===n&&(a.$=Lc),b&&a.jQuery===n&&(a.jQuery=Kc),n},typeof b===U&&(a.jQuery=a.$=n),n});

/* Global Variables
 *******************************************************************

Required jQuery

 *******************************************************************
*/


var $window 	= $(window)
	,$document 	= $(document)
	,$html 		= $('html')
	,$body 		= $('body')
		,$body_preventMouseover	= false
		,$body_isTouch			= false
		//,$body_hover 			= false


,_g={
	// determine if _g.init() run
		isinit: 	false,
		
	// indicate load event
		isload:		false,

	// indicate if current page/tab is focused, using the lib Visibility
		isfocus: 	document.hasFocus ? document.hasFocus() : true,

	// indicate if current page/tab is ever focues
		everfocus:	document.hasFocus ? document.hasFocus() : true,

	posttime:[],
	time_format:		'm月d日',		// 按PHP date()函数规则
	time_format2:		'Y年m月d日',		// 按PHP date()函数规则
	//time_diff_range:	86400000,			// 86400000毫秒，1小时
	time_diff_range:	4*24*60*60*1000,	// 4天
	time_diff_range2:	365*24*60*60*1000,	// 365天

	last: {
		width:		0,
		height:		0
	},

	interval:{},

	// 页面初始字号与系数
	initSize:		20,
	// 页面基础字号
	baseSize:		10,
	// 页面基础尺寸系数（根据基础字号算得）
	baseMultiper:	1,
	// 最近一次改动前的基础字号
	lastBaseSize:	10,

	// 像素缩放值
	pixelRatio: 	window.devicePixelRatio
						? window.devicePixelRatio
						: ( screen.deviceXDPI
							? screen.deviceXDPI / 72
							: 1 ),

	// 最大字号倍数
	maxMultiper: 	Math.max(1,
						Math.ceil(
							( screen.availHeight || screen.height || $window.height() ) / 800 * 10
						) / 10
					),

	//
	//readyLock: false

	/*
	// window.onscroll事件触发后的计时
	// 该变量为对象，需要使用该计时器时请指定对象变量
	timeout_scroll:	{
		// 全局计时延迟
		throttle:	100
	},

	// window.resize事件触发后的计时
	// 大多数浏览器中，windows在触发resize事件时会触发两次，为了使函数仅运行一次，引入该计时
	// 该变量为对象，需要使用该计时器时请指定对象变量
	timeout_resize:	{
		// 全局计时延迟
		throttle:	200,
		global:		false
	},*/

	strings: {},

    // global input Index
        inputIndex: 0,

    // default locale
        lang: 'zh_cn',


	// placeholder
	_:	false
}

// _p.js
,_p={
	// objects under _p.el will automatically run _p.el[object].init(), while _p.comp dosen't
		comp: {},
		el: {}
}

// 页面框架
,_frame = {
	dom: {},
	init_all: function(){
		for( var i in _frame ){
			if( _frame[i].init ){
				_frame[i].init()
			}
		}
	}
}

// 模块
,_module={}

// 页面
,_page={}

// 数据
,_data={}








// huScrolled
if( typeof _huScrolled == 'undefined' )var _huScrolled = {};
if( !_huScrolled.ver || _huScrolled.ver < 1.2 ){
	_huScrolled.ver = 1.2;
	_huScrolled.timeout = false;
	_huScrolled.throttle = _huScrolled.throttle || 100;

	var bIEnew		= /\(Windows NT [0-9\.]+.+Trident\/[0-9\.]+.+rv.{1}[0-9\.]+\)/.test(navigator.userAgent)
		,bIE		= (!!(window.attachEvent&&!window.opera)) || bIEnew

	var el = (bIE&&parseFloat(navigator.appVersion.split("MSIE")[1])<9)
				? $window
				: $document

	el.on({
		'scroll.huScrolled':function(){
			if(_huScrolled.timeout)
				return true;

			_huScrolled.timeout = setTimeout(function(){
				$document.trigger('huScrolled');

				_huScrolled.timeout = null;
			},_huScrolled.throttle)
		}
	})
}

// huResized
if( typeof _huResized == 'undefined' )var _huResized = {};

if( !_huResized.ver || _huResized.ver < 2.1 ){
	_huResized.ver = 2.1;
	_huResized.throttle = _huResized.throttle || 300
	_huResized.startSize = {}
	//_huResized.maskShowing = false
	//_huResized.isChanging = false
	//_huResized.timeout = null;
	//_huResized.topmask = null;

	_huResized.viewport = function(){
		var e 	= window
			,a 	= 'inner';
		if ( !( 'innerWidth' in window ) ){
			a = 'client';
			e = document.documentElement || document.body;
		}
		return {
			width : e[ a+'Width' ] ,
			height : e[ a+'Height' ]
		}
	}

	$window.on({
		'resize.huResized':function(e, settings){
			settings = settings || {}

			var viewport 	= _huResized.viewport()
				,sWidth 	= _huResized.startSize.width || viewport.width
				,sHeight 	= _huResized.startSize.height || viewport.height
				,toshow 	= (Math.abs(viewport.width - sWidth) > 50 || Math.abs(viewport.height - sHeight) > 50)


			if(_huResized.timeout){
				// 存在延迟，取消之
					clearTimeout( _huResized.timeout )
					_huResized.timeout = null
			}


			// 没有顶级遮罩，创建
				if( !_huResized.topmask )
					_huResized.topmask = $('<div/>').css({
								'z-index': 	'16777269',
								'display': 	'none',
								'position': 'fixed',
								'width': 	'100%',
								'height': 	'100%',
								'top': 		0,
								'left': 	0,
								'background-color':'rgba(0,0,0,.5)'
							}).appendTo( $body )

			 if( toshow && !settings.isInitial && !_huResized.maskShowing ){
				// 开启顶级遮罩
					_huResized.topmask.css('display', 'block')
					_huResized.maskShowing = true
			}

			if( !toshow && !_huResized.isChanging ){
				_huResized.startSize = {
					width: 	viewport.width,
					height: viewport.height
				}
			}

			_huResized.isChanging = true

				_huResized.timeout = setTimeout(function(){
					$window.trigger('huResized');
					_huResized.timeout = null;
					_huResized.maskShowing = false
					_huResized.isChanging = false
					// 隐藏顶级遮罩
						_huResized.topmask.css('display', 'none')

					viewport 	= _huResized.viewport()
					_huResized.startSize = {
						width: 	viewport.width,
						height: viewport.height
					}
				}, settings.isInitial ? 0 : _huResized.throttle)
		}
	})
}

// huCss
if( typeof _huCss == 'undefined' )var _huCss = {};
if( !_huCss.ver || _huCss.ver < 1.2 ){
	_huCss.ver = 1.2;
	_huCss.cssprefix_result = {};

	// CSS Compatibility check
	_huCss.csscheck = function(prop){
		if( !_huCss.csscheck_div ){
			_huCss.csscheck_div = document.documentElement
			//_huCss.csscheck_div = document.createElement( "div" )
		}
		if( prop in _huCss.csscheck_div.style ){
			return true
		}else{
			// parse prop name like "background-image" to "backgroundImage"
			var strs = prop.split('-')
				prop = strs[0]
			for( var i = 1; i < strs.length ;i++){
				prop += strs[1].substr(0,1).toUpperCase()+strs[1].substr(1)
			}
			return ( prop in _huCss.csscheck_div.style )
		}
	};
	_huCss.csscheck_full = function(prop){
		return _huCss.cssprefix(prop, null, true)
	};

	// CSS prefix
	_huCss.cssprefix = function(prop, onlyPrefix, isCheck){
		if( _huCss.cssprefix_result[prop] ){
			var b = _huCss.cssprefix_result[prop]
		}else if( _huCss.cssprefix_result[prop] === false ){
			if( isCheck )
				return false;
			var b = '';
		}else{
			var b = ''
				,pre = [
					'-webkit-',
					'-moz-',
					'-ms-',
					'-o-'
				]
				,check		= _huCss.csscheck(prop)

			if( !check ){
				b = false;
				for( var i = 0; i < pre.length; i++ ){
					if( _huCss.csscheck(pre[i]+prop) ){
						b = pre[i];
						break;
					}
				}
			}

			_huCss.cssprefix_result[prop] = b;

			if( isCheck ){
				b = b===false ? false : true
				return b;
			}
		}

		b = b===false ? '' : b;

		return onlyPrefix ? b : b+prop
	}

	// check if browser support CSS3 3D transform
	_huCss.csscheck_3d = function(){
		return _huCss.csscheck_full('perspective')
	}


	_huCss.createSheet = function(name){
/*
			var style = document.createElement('style');
			document.getElementsByTagName('head')[0].appendChild(style);
			if (!window.createPopup) { For Safari
				style.appendChild(document.createTextNode(''));
			}

			_huCss.sheet = document.styleSheets[document.styleSheets.length - 1];

			sheet = _huCss.sheet
*/
		var sheet = document.createElement('style');

		if( name )
			sheet.title = name

		document.getElementsByTagName('head')[0].appendChild(sheet);
		if (!window.createPopup) { /* For Safari */
			sheet.appendChild(document.createTextNode(''));
		}

		//console.log(sheet)
		//sheet = document.styleSheets[document.styleSheets.length - 1];
		if( name ){
			for( var i = 0; i<document.styleSheets.length; i++ ){
				if( document.styleSheets[i].title == name ){
					return document.styleSheets[i]
				}
			}
		}

		return document.styleSheets[document.styleSheets.length - 1];

		//console.log(sheet.title)
		//return sheet
	}

	_huCss.getSheet = function(sheet){
		sheet = sheet || _huCss.sheet;
		if( !sheet ){
			_huCss.sheet = _huCss.createSheet('__huCss_sheet');

			sheet = _huCss.sheet
		}
		return sheet;
	}

	_huCss.getCssRulesNum = function(sheet){
		sheet = _huCss.getSheet(sheet)
		return sheet.cssRules ? sheet.cssRules.length : 0
	}
	// Add CSS Style Sheet
	_huCss.addRule = function(selector, declaration, index, sheet){
		var v = ''
		sheet = _huCss.getSheet(sheet)

		for(var i in declaration){
			//if( !_huCss.csscheck_full('perspective') && _huCss.csscheck_full('filter') ){
			if( !_huCss.csscheck_full(i) ){
				if( i == 'opacity' && _huCss.csscheck_full('filter') ){
					v += 'filter:alpha(opacity=' + declaration[i]*100 + ')'
				}
			}else{
				v += _huCss.cssprefix(i) + ':' + declaration[i]+';'
			}
		}

		if( !index && index !== 0 ){
			index = sheet.cssRules ? sheet.cssRules.length : _huCss.getCssRulesNum();
			//index = sheet.cssRules ? sheet.cssRules.length : -1;
		}

		if(sheet.insertRule){
			//alert(v)
			sheet.insertRule(selector+'{'+v+'}', index)
		}else{
			selector = selector.split(',')
			for( i = 0; i<selector.length ; i++){
				sheet.addRule(selector[i], v, index)
			}
		}
	}
	_huCss.removeRule = function(index, sheet){
		if(!index && index!==0 )
			return false;

		sheet = _huCss.getSheet(sheet)
		try{
			sheet.deleteRule(index)
		}catch(e){
			sheet.removeRule(index)
		}
	}
}








/* Browser Compatibility
浏览器相关变量
	userAgent		userAgent值
	bChrome			是否为Chrome
	bSafari			是否为Safari
	bFirefox		是否为Firefox
	bOpera			是否为Opera
	bIE				是否为IE
	bIE6			是否为IE6及以下版本
	bIE7			是否为IE7及以下版本
	bIE8			是否为IE8及以下版本
	bIE9			是否为IE9及以下版本
	bIE10			是否为IE10及以下版本
	bWebkit			是否为Webkit核心
	bGecko			是否为Gecko核心
	bIphone			是否为iPhone设备
	bIpad			是否为iPad设备
	bAndroid		是否为Android设备
	bMobile			是否为移动设备 (iOS, Android)
	bCSS3			是否支持CSS3
	bCSS3A			是否支持CSS3动画及过渡（Animation, Transition）
	b3D				是否支持CSS3 3D效果
*/
var _UA = navigator.userAgent
	,bChrome	= /Chrome/.test(_UA)
	,bChromeVer	= bChrome ? /Chrome\/([0-9\.]+)/.exec(navigator.appVersion) : false

	,bSafari	= /Safari/.test(_UA)&&!bChrome
	,bFirefox	= /Firefox/.test(_UA)
	,bOpera		= /Opera/.test(_UA)

	,bWebkit	= /WebKit/.test(_UA)
	,bWebkitVer	= bWebkit ? /(AppleWebKit|Safari)\/([0-9\.]+)/.exec(navigator.appVersion) : false

	,bIEnew		= /\(Windows NT [0-9\.]+.+Trident\/[0-9\.]+.+rv.{1}[0-9\.]+\)/.test(_UA)
	,bIEnewVer	= bIEnew ? parseFloat(_UA.split('rv:')[1]) : false
	,bIE		= (!!(window.attachEvent&&!window.opera)) || bIEnew
	,bIE6		= (bIE&&parseFloat(navigator.appVersion.split("MSIE")[1])<7)
	,bIE7		= (bIE&&parseFloat(navigator.appVersion.split("MSIE")[1])<8)
	,bIE8		= (bIE&&parseFloat(navigator.appVersion.split("MSIE")[1])<9)
	,bIE9		= (bIE&&parseFloat(navigator.appVersion.split("MSIE")[1])<10)
	,bIE10		= (bIE&&parseFloat(navigator.appVersion.split("MSIE")[1])<11)
	,bIE11		= (bIEnewVer && bIEnewVer < 12)

	,bGecko		= (!bIE && !bIEnew && !bWebkit && _UA.indexOf("Gecko")!=-1)

	,bIphone	= /iPhone/i.test(_UA)
	,bIpad		= /iPad/i.test(_UA)
	,bAndroid	= /Android/i.test(_UA)
	,bIOS 		= false

	,bIOSver 	= (bIphone || bIpad) ?
						/CPU.*OS\s*([0-9_]+)/i.exec(navigator.appVersion)
						: false

	,bMobile	= bIphone || bIpad || bAndroid

	// 是否支持 rem 数值单位
	,bCSSrem	= !bIE8
	// 是否支持CSS3
	,bCSS3		= _huCss.csscheck_full('border-radius')
	// 是否支持CSS3动画和渐变
	,bCSS3A		= _huCss.csscheck_full('animation')
	// 是否支持CSS3 Flex
	,bCSS3flex	= _huCss.csscheck_full('flex')
	// 是否支持CSS3 3D
	,b3D		= _huCss.csscheck_full('perspective')
	// 是否支持CSS3单位计算（calc）
	,bCSS3calc	= bCSSrem

	// 是否支持触控
	,bTouch		= /Touch/.test(_UA)

	// 不支持的浏览器
	,bUnsupport	= bIE7

	// HTML5支持
		,bHTML5m3u8 		= bMobile

	// 是否可以访问某些网站
		,bAccessYoutube 	= false
		,bAccessTwitter 	= false
		,bAccessFacebook 	= false

if(bWebkitVer && bWebkitVer.length)
	bWebkitVer = bWebkitVer[2]

if(bChromeVer && bChromeVer.length)
	bChromeVer = parseFloat( bChromeVer[1] )

if(bIOSver && bIOSver.length){
	bIOSver = parseFloat( bIOSver[1].replace(/_/, '.') )
	bIOS = true
}

if( (bChromeVer && bChromeVer < 29) || (bIOSver && bIOSver < 7) )
	bCSS3flex = false

if( bIOSver && bIOSver < 6 ){
	bCSS3calc = false
}

/*
// 针对IE6设置取消背景图缓存
if(bIE6){
	try{
		document.execCommand('BackgroundImageCache',false,true);
	}catch(e){}
}
*/

// HTML标签添加兼容性Class
if(bGecko){
	$html.addClass('is-gecko')
}else if(bIE11 && !bIE10){
	$html.removeClass('ie9').addClass('ie11' + (bTouch ? ' ie-touch' : '' ))
}else if(bIE10 && !bIE9){
	$html.removeClass('ie9').addClass('ie10' + (bTouch ? ' ie-touch' : '' ))
}else if(bMobile){
	$html.addClass('mobile')
	if(bIOS){
		$html.addClass('ios')
	}
	if(bIphone){
		$html.addClass('iphone')
	}
	if(bIpad){
		$html.addClass('ipad')
	}
	if(bAndroid){
		$html.addClass('android')
	}
}else if(bWebkitVer < 537){
	$html.addClass('oldwebkit')
}

if( bTouch ){
	$html.addClass('touch')
}




/* Global Variables & functions
 *******************************************************************

 *******************************************************************
*/











// Force viewport fix for Windows Phone
if (navigator.userAgent.match(/IEMobile\/10\.0/) ) {
	var msViewportStyle = document.createElement("style");
	msViewportStyle.appendChild(
		document.createTextNode(
			"@-ms-viewport{width:auto!important}"
		)
	);
	document.getElementsByTagName("head")[0].appendChild(msViewportStyle);
}












/* Global Functions -------------------------------------------------------------------------------------------
*/
_g.getUrl=function(){
	return location.href.split('#')[0]
};


_g.uriSearchArr	= {}
_g.uriHashArr	= {}
_g.timeHash=function(){var d=new Date();d=d.getTime();return d};
_g.uriSearch=function(name){
	if(!_g.uriSearchArr.length){
		var _s= location.search ? location.search.split('?')[1] : ''
		_s = _s.split('&');
		for(var i=0;i<_s.length;i++){
			var h=_s[i].split('=')
			_g.uriSearchArr[h[0]] = h[1] || ''
		}
	}
	return !name
				? location.search.substr(location.search.indexOf('?')+1)
				: _g.uriSearchArr[name];
};
_g.uriHash=function(name, val, value){
	var curH = location.hash
		,_h = curH ? curH.split('#')[1] : '';
	_h = _h.split('&');

	if( !_g.uriHashInited ){
		// 缓存数据
			_g.uriHashArr={};
			for( var i in _h ){
				var h = _h[i].split('=')
				if(h[0] !== '')
					_g.uriHashArr[h[0]] = h[1] || false
			}
			_g.uriHashInited = true
	}
	/*
	_g.uriHashArr={};


	for( var i in _h ){
		var h = _h[i].split('=')
		_g.uriHashArr[h[0]] = h[1] || false
	}
	*/
	//for( var i=0 ; i<_h.length ; i++){var h=_h[i].split('=');_g.uriHashArr[h[0]]=h[1]||false}

	//val = ( val === null || val === false ) ? false : val
	//val = val===0 ? 0 : val || false;

	if( typeof( name ) == 'object' ){
		for( var k in name ){
			curH = _g.uriHash( k, name[k], curH )
		}
		location.hash = curH
	}else{
		if( val === false || val === '' ){
			curH = curH.replace( '&'+name+'='+_g.uriHashArr[name], '' )
					.replace( name+'='+_g.uriHashArr[name], '' )

			if( curH == '#' || curH == '' || !curH )
				curH = '_'

			location.hash = curH
		}else if( typeof( val ) != 'undefined' ){
			if( val == _g.uriHashArr[name] )
				return val

			var _val = _g.uriHashArr[name]
						? curH.replace( name+'='+_g.uriHashArr[name], name+'='+val )
						: ( curH + ( curH == '' ? '#' : '&' ) + name + '=' + val );
			_g.uriHashArr[name] = val
			if( value ){
				return _val
			}else{
				location.hash = _val
			}
			return val
		}
	}
	return !name
			? location.hash.substr(location.hash.indexOf('#')+1)
			: (_g.uriHashArr[name] || false)
};


_g.randNumber=function(maxn){var d=new Date();d=d.getTime();d=(d*9301+49297)%233280;if(!maxn){maxn=1000};return Math.ceil((d/(233280.0))*maxn)};
_g.randInt = function(max, min){
	return Math.floor((Math.random() * parseInt(max)) + (min ? parseInt(min) : 0) )
};


_g.scrollTo=function(tar,y){
	if(isNaN(tar)){
		tar=$(tar);
		var cur = tar.scrollTop();
	}else{
		y=tar;
		tar=$('html,body')
		var cur = $window.scrollTop();
	}

	var diff = Math.abs( cur - y )
		,height = $window.height()
		,time = diff <= height ? 200 : 200 * ( diff / height ) * ( 2/3 );

	tar.stop().animate({
		'scrollTop': y
	},time)
	//tar.stop().animate({
	//	'scrollTop':y
	//},200)
};


_g.get_em = function(num, el, fix){
	var _num = parseFloat(num);
	el = el || $body;
	fix = fix || 0;
	if(isNaN(_num))
		return num;
	return ( _num / parseFloat(el.css('font-size')) + fix ) + 'em';
}


_g.get_fontsize = function(el){
	el = el || $body;
	return parseInt(el.css('font-size'));
}


_g.get_basesize = function(){
	return parseInt( $body.css('font-size') ) / _g.initSize * 10;
}

_g.get_basesize_true = function(){
	return parseInt( $body.css('font-size') );
}

_g.get_basemultiper = function(){
	return parseFloat( _g.get_basesize() / 10 )
}



// 以当前最初字号为基础，计算REM单位
_g.get_rem = function(unit){
	/*
	var _num = parseFloat(num)
		,el = $('body')
		,fontsize = parseFloat(el.css('font-size'));
	if(isNaN(_num))
		return num;
	if(bIE8)
		return _num + 'px';
	_num = Math.floor( ( _num / fontsize ) * 100) / 100;
	return _num + 'rem';
	*/
	var num = parseFloat(unit)

	if(isNaN(num))
		return unit;

	if(!bCSSrem)
		return unit;

	//return (num / _g.baseMultiper / _g.initSize)+'rem'
	return (num / _g.initSize)+'rem'

}


// 以当前基础字号为基础，计算REM单位
_g.rem = function( unit, demical ){
	var num = parseFloat(unit)

	if(isNaN(num))
		return unit;

	if(!bCSSrem)
		return unit;

	//num = num / _g.baseMultiper / _g.initSize
	num = num / (_g.get_basesize() / 10) / _g.initSize

	if( demical )
		return num+'rem'

	//return (Math.ceil(10 * num) / 10)+'rem'
	return (Math.round(10 * num) / 10)+'rem'
}

// 计算REM单位为PX单位
_g.px = function( unit, only_number ){
	var num = parseFloat(unit)

	if(isNaN(num))
		return unit;

	if(bIE8)
		return unit;

	return (num * _g.initSize)+ ( only_number ? 0 : 'px')
}


_g.get_animate_duration = function(duration){
	return _g.isfocus ? duration : 0;
};




// 访问锚点
_g.goto_hash = function(hash, time){
	hash = hash || location.hash;
	hash = hash.replace(/^([\#]{0,1})(.+)/, '$2');

	// #!xxooxxooxxoo
	if( hash[0] == '!' )
		return false;

	var tar = $('#'+hash);
	if(!tar.length)
		return false;

	var tarY = tar.offset().top
		,curY = $window.scrollTop()
		,diff = Math.abs( curY - tarY )
		,height = $window.height();

	time = time == null ? diff <= height ? 200 : 200 * ( diff / height ) * ( 2/3 ) : time;

	if( time ){
		// 时间不为0
		$('html,body').stop().animate({
			'scrollTop': tarY
		},time,function(){
			location.hash = hash;
		})
	}else{
		$('html,body').scrollTop( tarY );
		location.hash = hash;
	}

	return hash;
};











/* 时间相关操作 -----------------------------------------------------------------------------------------------
*/
// 以给定的时间生成Date对象，并返回该对象
_g.time = function( str ){
	if(!str)
		return _g.timeNow();

	var time,
		patt = [
				{
					exp: /(\d{4}).(\d{1,2}).(\d{1,2})[^0-9]*(\d{0,2})[:]{0,1}(\d{0,2})[:]{0,1}(\d{0,2})([\+\-])(\d{2})\:(\d{2})/i, // YYYY/MM/DD hh:mm:ss+00:00
					p: {
						year:	1,
						month:	2,
						day:	3,
						hour:	4,
						min:	5,
						sec:	6,
						zoneD: 	7,
						zoneH: 	8,
						zoneM: 	9
					}
				},
				{
					exp: /(\d{1,2}).(\d{1,2}).(\d{4})[^0-9]*(\d{0,2})[:]{0,1}(\d{0,2})[:]{0,1}(\d{0,2})/i, // MM/DD/YYYY hh:mm:ss
					p: {
						year:	3,
						month:	1,
						day:	2,
						hour:	4,
						min:	5,
						sec:	6
					}
				},
				{
					exp: /(\d{4}).(\d{1,2}).(\d{1,2})[^0-9]*(\d{0,2})[:]{0,1}(\d{0,2})[:]{0,1}(\d{0,2})/i, // YYYY/MM/DD hh:mm:ss
					p: {
						year:	1,
						month:	2,
						day:	3,
						hour:	4,
						min:	5,
						sec:	6
					}
				}
			]

	for( var i = 0; i<patt.length ; i++){
		var exp = patt[i].exp,
			m = str.match(exp);

		if(!time && m && m.length){
			var year = parseInt( m[patt[i].p.year] ),
				month = parseInt( m[patt[i].p.month] ) || 0,
				day = parseInt( m[patt[i].p.day] ) || 1,
				hour = parseInt( m[patt[i].p.hour] ) || 0,
				min = parseInt( m[patt[i].p.min] ) || 0,
				sec = parseInt( m[patt[i].p.sec] ) || 0

			time = new Date(year,month-1,day,hour,min,sec,0)

			if( patt[i].p.zoneD && m[patt[i].p.zoneD] ){
				// 存在时区
				var delta 	= m[patt[i].p.zoneD] == '+' ? -1 : 1
					,hour 	= parseInt( m[patt[i].p.zoneH] ) || 0
					,min 	= parseInt( m[patt[i].p.zoneM] ) || 0
					,zone 	= delta * ( min + hour * 60 + time.getTimezoneOffset() ) * 60 * 1000
				time = new Date(time.valueOf() + zone)
			}
		}
	}

	return time;

};
// 计算给定的时间秒毫秒
_g.timeCal = function(timestamp, hasfix){
	if(timestamp<60000){
		// 60秒，1分钟
		return Math.floor(timestamp/1000)+'秒'+(hasfix?'前':'');
	}else if(timestamp<3600000){
		// 60分钟，1小时
		return Math.floor(timestamp/60000)+'分钟'+(hasfix?'前':'');
	}else if(timestamp<86400000){
		// 24小时，1天
		return Math.floor(timestamp/3600000)+'小时'+(hasfix?'前':'');
	}else if(timestamp<172800000){
		// 48小时，昨天
		return '昨天';
	}else if(timestamp<2592000000){
		// 30天，1月
		return Math.floor(timestamp/86400000)+'天'+(hasfix?'前':'');
	}else if(timestamp<31536000000){
		// 365天，1年
		return Math.floor(timestamp/2592000000)+'月'+(hasfix?'前':'');
	}else{
		return Math.floor(timestamp/31536000000)+'年'+(hasfix?'前':'');
	}
};
// 返回当前时间的时间戳
_g.timeNow = function(){
	var now=new Date()
	return now.getTime();
};
// 时间差异操作
_g.timeDiff = function(data){
	var defaults = {
		time:	_g.timeNow(),		// 目标时间
		obj:	null,				// 需操作的元素的jQuery Object
		format:	_g.time_format,		// 若超过上限则显示的时间格式
		format2:_g.time_format2,	// 第二阈值的时间格式
		range:	_g.time_diff_range,	// 第一阈值，毫秒。小于该值时才显示时间差异，否则输出上面格式的时间
		range2:	_g.time_diff_range2,// 第二阈值，毫秒。大于该值时显示第二时间格式
		is_init:true
	}
	$.extend(defaults, data);
	if( !defaults.obj )
		return false;
	data = defaults;
	return data
	/*
	_g.posttime.push(defaults);
	_g.timeDiffInterval();*/
}
// 每隔1分钟对_g.posttime的元素运行_g.timeCal()
// 运行该函数可强制刷新一次时钟，多用于新增该类元素后需要立刻获得结果的情形
_g.timeDiffInterval = function(){
	function theinterval(){
		if( !_g.isfocus )
			return false

		for(var i=0;i<_g.posttime.length;i++){
			var cur = ( !_g.posttime[i].is_init ) ? _g.timeDiff(_g.posttime[i]) : _g.posttime[i]
				,now = new Date()
				//,diff = now.getTime()-cur.time.getTime()
				,diff = now.getTime()-cur.time
				,range = cur.range
				,range2 = cur.range2

			if(diff < range){
				cur.obj.html(
					diff < 60000 ? '刚刚' : _g.timeCal(diff, true)
				)
			}else{
				var text = ( diff > range2 ) ? cur.format2 : cur.format,
					_c = cur.time

				text=text.replace(/Y/g,_c.getFullYear());
				text=text.replace(/M/g,_c.getMonth()+1<10?'0'+(_c.getMonth()+1):_c.getMonth()+1);
				text=text.replace(/m/g,_c.getMonth()+1);
				text=text.replace(/D/g,_c.getDate()<10?'0'+_c.getDate():_c.getDate());
				text=text.replace(/d/g,_c.getDate());

				cur.obj.html(text)
			}
		}
	}
	clearInterval(_g.interval.posttime);
	theinterval();
	_g.interval.posttime=setInterval(function(){
		theinterval()
	},60000);
};









/* 浏览器技术支持检查 -----------------------------------------------------------------------------------------
*/
var _support = {
	cache: {},
	check: function( technology ){
		technology = technology.toLowerCase()
						.replace(/[ :-_]/g, '')
		if( typeof _support.cache[technology] == 'undefined' && _support['_' + technology] ){
			_support.cache[technology] = _support['_' + technology]()
		}
		return _support.cache[technology]
	}
}
function _b( string ){
	return _support.check( string )
}

	// CSS3 相关
		// 基础判断
			_support._css3 = function(){
				return _huCss.csscheck_full('border-radius')
			}
		// animation
			_support._css3animation = function(){
				return _huCss.csscheck_full('animation')
			}
		// transition
			_support._css3transition = function(){
				return _huCss.csscheck_full('transition')
			}
		// flex
			_support._css3flex = function(){
				return _huCss.csscheck_full('flex')
			}
		// 3D
			_support._css33d = function(){
				return _huCss.csscheck_full('perspective')
			}
			_support._css3d = _support._css33d
		// Media Query
			_support._css3mediaquery = function(){
				return (window.matchMedia || window.msMatchMedia) ? true : false
			}
			_support._mediaquery = _support._css3mediaquery
		// Image Set
			_support._css3imageset = function(){
				var result = null
					,test = $('<div/>',{
								'style': 	'background-image:url(' + _g.pathImg + '_g-p.gif' + ')'
							})

				function _test( prefix ){
					test.css('background-image', 'image-set(url(' + _g.pathImg + '_g-p.gif' + ') 1x)')
					var r = test.css('background-image')

					if( r && r != 'none' )
						return true

					if( prefix ){
						test.css('background-image', prefix + 'image-set(url(' + _g.pathImg + '_g-p.gif' + ') 1x)')
						r = test.css('background-image')
						if( r && r != 'none' )
							return prefix
					}

					return false
				}

				if( bWebkit ){
					result = _test('-webkit-')
				}else if( bGecko ){
					result = _test('-moz-')
				}else if( bIE ){
					result = _test('-ms-')
				}else{
					result = _test()
				}

				return result
			}

	// 常用插件支持
		// Flash Player
			_support._pluginflash = function(){
				var _ = false
				try{
					_ = (
								(
									typeof navigator.plugins != "undefined"
									&& typeof navigator.plugins["Shockwave Flash"] == "object"
								) || (
									window.ActiveXObject
									&& (
										new ActiveXObject("ShockwaveFlash.ShockwaveFlash")
									) != false
								)
							)
				}catch(e){}
				return _
			}
			_support._flash = _support._pluginflash

	// HTML5支持
		// 属性: download
			_support._html5attrdownload = function(){
				return ("download" in document.createElement("a"))
			}
			_support._html5download = _support._html5attrdownload
			_support._html5attributedownload = _support._html5attrdownload
		// 视频格式: MP4
			_support._html5videomp4 = function(){
				var mp4check = document.createElement('video')
					,_ = false
				if(mp4check.canPlayType && mp4check.canPlayType('video/mp4').replace(/no/, ''))
					_ = true;
				return _
			}
			_support._html5mp4 = _support._html5videomp4









/* 页面初始化主函数 -------------------------------------------------------------------------------------------
*/
_g.init=function(){
	// 自定义事件
	// resized：浏览器尺寸改变事件
		// 为了效率考虑，建立该事件
		// 所有需要注册在 window.onresize 上的事件均要注册在该事件上
	// basechange：页面基础字号/基础尺寸系数改变事件
		// _g.baseSize		页面基础字号
		// _g.baseMultiper	页面基础尺寸系数
		// _g.lastBaseSize	最近一次改动前的基础字号
	// resized_check：检查浏览器尺寸是否改变，如果改变，则触发resized
	_g.baseSize = _g.get_basesize();
	_g.baseMultiper = parseFloat( _g.baseSize / 10 );
	_g.lastBaseSize = _g.get_basesize();

	//_huResized.throttle = 200;
	//_huResized.throttle = _g.animate_duration_delay;

	_g.isfocus 		= (Visibility.state() == 'visible')
	_g.everfocus 	= _g.isfocus

	//if( mobileNoHoverState )
	//	mobileNoHoverState.init()

	Visibility.change(function (e, state) {
		//console.log( e, state )
		//Statistics.visibilityChange(state);
		if( state == 'visible' ){
			_g.isfocus = true
			if( !_g.everfocus ){
				_g.everfocus = true
				_g.last.width = -1
				_g.last.height = -1
				_frame.main.last.width = -1
				_frame.main.last.height = -1
			}
			$window.trigger('resized_check._g');
			_g.timeDiffInterval()
		}else{
			_g.isfocus = false
		}
	});

	//_g.parse_urihash.init()




	// 兼容性检查：是否可以访问某些网站
	/*
		,bAccessYoutube 	= false
		,bAccessTwitter 	= false
		,bAccessFacebook 	= false
	var accesscheck = $('<iframe/>', {
		'src': 		'http://www.youtube.com'
	}).on({
		'load': function(){
			bAccessYoutube = true
			console.log('youtube loaded')
		},
		'error': function(){
			console.log('youtube cannot load')
		}
	})
	*/



	$window.on({
		/*
		'resized.debug': function(event){
			console.log(event, _g.baseMultiper)
		},*/

		'orientationchange': function(){
			// 屏幕角度改变时
			// 例：iPad 90度旋转
			$window.trigger('resize')
		},

		'huResized': function(){
			$window.trigger('resized_check._g');
			//$window.trigger('resized');
			//console.log('resized')
		},
		/*
		'resized._g_last': function(){
		},*/
		'resized_check._g': function(){
			if( !_g.isfocus )
				return false

			var w = $window
				,_width = w.width()
				,_height = w.height()
			//w.trigger('resized_before')

			/*
			if( !_g.isEverResized ){
				w.trigger('resized_before', [{
						is_widthchange:		true,
						is_heightchange:	true
					}])
					.trigger('resized', [{
						is_widthchange:		true,
						is_heightchange:	true
					}]);
				_g.isEverResized = true
			}else{*/
				_g.baseSize = _g.get_basesize()
				_g.orientation = _width >= _height ? 'landscape' : 'portrait'

				if( _g.baseSize != _g.lastBaseSize ){
					_g.baseMultiper = parseFloat( _g.baseSize / 10 );
					_g.lastBaseSize = _g.baseSize;
					_g.isBaseChange = true
					//_g.last.width = -1
					//_g.last.height = -1
					w.trigger('basechange');
				}
				if( _width != _g.last.width
					|| _height != _g.last.height
				){
					var data = {
						is_widthchange: 	_width != _g.last.width,
						is_heightchange: 	_height != _g.last.height
					}

					w.trigger('resized_before', [data])
						.trigger('resized', [data]);

					_g.isEverResized = true
				}
				_g.last.width = _width
				_g.last.height = _height
			//}

		},
		/*
		'resize.check_base': function(){
			//if( _g.timeout_resize_check_base )
				return false
			//_g.timeout_resize_check_base = setTimeout(function(){
				_g.baseSize = _g.get_basesize()
				if( _g.baseSize != _g.lastBaseSize ){
					_g.baseMultiper = parseFloat( _g.baseSize / 10 );
					_g.lastBaseSize = _g.baseSize;
					$(window).trigger('basechange');
				}
				//_g.timeout_resize_check_base = null
			//}, _huResized.throttle / 20)
		},*/
		/*
		'resize': function(){
			if(_g.timeout_resize.global)
				return true;

			_g.timeout_resize.global = setTimeout(function(){
				$(window).trigger('resized');

				_g.timeout_resize.global = null;
			},_g.timeout_resize.throttle)
		},*/

		'basechange': function(){
			/*
			$(window).trigger('resized', [{
					is_basechange:	true
				}]);
				*/
			if( _g.isBaseChange ){
				_g.isBaseChange = false
				setTimeout(function(){
					$window.trigger('resized_before')
						.trigger('resized', [{
							is_basechange:	true
						}]);
					//console.log( 'basechange' )
				//},_huResized.throttle)
				//},_g.animate_duration_delay + 10)
				},_g.animate_duration_delay)
			}
		},
		/*
		'huResized.basechange': function(){
			if( _g.get_basesize() != _g.lastBaseSize ){
				_g.baseSize = _g.get_basesize();
				_g.baseMultiper = parseFloat( _g.baseSize / 10 );
				_g.lastBaseSize = _g.get_basesize();
				_g.isBaseChange = true
				$(window).trigger('basechange');
			}
		},*/
		'load.trigger_resized': function(){
			//_g.last.width = 0
			//_g.last.height = 0
			if( !_g.isfocus )
				return false

			setTimeout(function(){
				$window.trigger('resized_before', [{
							//is_basechange:	true,
							//is_heightchange:true,
							//is_widthchange:	true
							is_load:	true
						}])
						.trigger('resized', [{
							//is_basechange:	true,
							//is_heightchange:true,
							//is_widthchange:	true
							is_load:	true
						}]);
			}, _g.readyLock ? _g.animate_duration * 4 + 10 : 0)
			_g.isload = true
		},
		/*
		'focus._g': function(){
			_g.isfocus = true
			if( !_g.everfocus ){
				_g.everfocus = true
				_g.last.width = -1
				_g.last.height = -1
			}
			$(window).trigger('resized_check._g');
		},
		'blur._g': function(){
			_g.isfocus = false
		},*/
		"hashchange._global": function(e){
			//if( !_g.uriHashInited ){
				// 缓存数据
					_g.uriHashArr={};
					var _h = (location.hash ? location.hash.split('#')[1] : '').split('&');
					for( var i in _h ){
						var h = _h[i].split('=')
						if(h[0] !== '')
							_g.uriHashArr[h[0]] = h[1] || false
					}
					_g.uriHashInited = true
			//}
			// 空hash
				if( !_g.uriHash() || _g.uriHash() == '' ){
					e.preventDefault()
					e.stopPropagation()
				}
		},

		// 基础字号更改时，重新计算元素offset
		/*
		'basechange.huSticky':function(){
			var scrollTop = $(window).scrollTop();
			for(var i=0; i<_huSticky.index; i++){
				var obj = _huSticky.obj[i]
					,data = obj.data('huSticky');
				data.outerH	= data.dom.outerHeight(true);
				if( data.callback.basechange ){
					data.callback.basechange(data.dom)
				}else{
					data.restore();
					data.pos_ori = obj.offset();
					data.cal_pos();
					if( data.callback.resized )
						data.callback.resized(data.dom);
				}
			}
		}
		,'mainresized.debug': function(event){
			console.log(event)
		}

		,'uploader_complete': function( e, files ){
			console.log(
				e,
				files
			)
		}*/

		'unload.focuswindow': function(){
			$(this).focus()
		}
	})

	setTimeout(function(){
		$window.trigger('hashchange')
	},_g.animate_duration_delay + 10)

	$document.on({
		'huScrolled': function(){
			$window.trigger('scrolled');
			//console.log('scrolled')
		}
		/*,
		'scrolled.debug': function(event){
			console.log(event)
		},
		'mainscrolled.debug': function(event){
			console.log(event)
		}*/
	})

	$body/*.data('preventMouseover', false)*/.on({
		'touchstart.preventMouseover': function(){
			$body.removeClass('hover')
			$body_preventMouseover = true
			$body_isTouch = true
			//$body_hover = false
			//console.log('touchstart')
		},
		//'touchend.preventMouseover': function(){
			// make touchend trigger after mouseleave
			//setTimeout(function(){
			//	$body_preventMouseover = false
			//	//console.log('touchend')
			//}, 1)
		//},
		'pointerenter': function(e){
			if( e.originalEvent.pointerType == 'touch' )
				$body.trigger('touchstart.preventMouseover')
			else{
				$body_preventMouseover = false
				$body_isTouch = false
			}
		},
		//'pointerleave': function(e){
		//	if( e.originalEvent.pointerType == 'touch' )
		//		$body.trigger('touchend.preventMouseover')
		//},
		//'mouseenter': function(){
		'mouseover': function(){
			//console.log('mouseenter')
			/*
			if( !$body_preventMouseover ){
				//if( !$body_hover ){
					$body.addClass('hover')
					//$body_hover = true
				//}
			}else{
				$body_preventMouseover = false
			}*/
			if( $body_isTouch ){
				$body_isTouch = false
				$body_preventMouseover = true
			}else{
				$body.addClass('hover')
				$body_preventMouseover = false
			}
		},
		'mouseleave': function(){
			$body.removeClass('hover')
			//$body_hover = false
		}
		/*,
		'scrolled.debug': function(event){
			console.log(event)
		},
		'mainscrolled.debug': function(event){
			console.log(event)
		}*/
	})

	if( top!=self ){
		try{
			// 如果页面被套用到其他域名的iframe中，则跳出
			// 多为ISP劫持
				if( self.location.host != top.location.host )
					top.location.replace(self.location.href)
			// 为body添加样式和主题样式
				if( self.location.host == top.location.host ){
					$body.addClass('only-content');
					_g.changeTheme( top._g.getTheme() )
				}
			// 继承font-size
				$html.css('font-size', top.$html.css('font-size'))
				$window.on({
					'resized.iframe_resize': function(){
						$html.css('font-size', top.$html.css('font-size'))
					}
				})
		}catch(e){

		}
	}

	// 页面框架处理
	_hotkey.init()
	_frame.init_all()

	/*
	// 模块处理
	for(var i in _module){
		if(typeof _module[i].init != 'undefined')
			_module[i].init()
	}*/

	/*
	// 页面处理
	for(var i in _page){
		if(typeof _page[i].init != 'undefined')
			_page[i].init()
	}*/

	_p.init_document_ready();

	// 为 html 标签添加 ready 样式
	$html.addClass('ready')

	/*
	if( _frame.horiz.check() || (_frame.horiz['switch'] && _frame.horiz['switch'].prop('checked') ) )
		setTimeout(function(){
			$(window).resize()
		}, _g.animate_duration_delay)*/
	$window.trigger('resize', [{ isInitial: true }])

	_g.readyLock = true
	setTimeout(function(){
		_g.readyLock = null
	}, _g.animate_duration * 4 + 10)

	// Clear Badge Message in Windows 8 Start Screen
		try {
			window.external.msSiteModeClearBadge();
		}
		catch (e) {}

	_g.isinit=true
	return false;
};



function addHandler(object, event, handler) {
	if (typeof object.addEventListener != 'undefined')
		object.addEventListener(event, handler, false);
	else
		if (typeof object.attachEvent != 'undefined')
			object.attachEvent('on' + event, handler);
		else
			throw 'Incompatible browser';
}



/* Cookie -----------------------------------------------------------------------------------------------------
*/
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
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
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = '; path=' + (options.path ? options.path : '/');
        var domain = options.domain ? '; domain=' + (options.domain) : (/(.*)([\.]*)acgdb\.com/.test(location.host) ? '; domain=.acgdb.com' : '');
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};
















/* 自定义jQuery属性/函数 --------------------------------------------------------------------------------------
 */
(function($){
/* innerWidth & innerHeight -----------------------------------------------------------------------------------
 * jQuery在1.8版本中为了修正对boxing-size的计算模式，给.width()/.height()函数加了一级验证，会影响到效率
 * 若想取得元素的CSS宽或高，请使用.innerWidth()或.innerHeight()
 */
	$.fn.innerWidth = function(){
		return parseFloat(this.css('width'));
	};
	$.fn.innerHeight = function(){
		return parseFloat(this.css('height'));
	};

}(jQuery));

$.fn.serializeObject = function(){
	var o = {};
	var a = this.serializeArray();
	function _mobj( obj, arr, val ){
		if( !arr.length ){
			return obj
		}

		var e = arr[0]

		if( typeof obj[e] == 'undefined' ){
			obj[e] = arr.length > 1 ? {} : val
		}else if( arr.length == 1 ){
			if (!obj[e].push) {
				obj[e] = [ obj[e] ];
			}
				obj[e].push( _val(val) );
		}

		arr.shift()

		_mobj( obj[e], arr, val )
	}
	function _val( value ){
		if( typeof value == 'number' && value === 0 )
			return value
		return value || ''
	}
	$.each(a, function() {
		if( !/^_tabview\-/.test( this.name ) ){
			this.value = (isNaN(this.value) || !this.value) ? this.value : parseFloat(this.value)
			if ( this.name.indexOf('.') > -1 ){
				var sep = this.name.split('.')
				_mobj( o, sep, this.value )
			}else{
				if (o[this.name] || o[this.name] === 0) {
					if (!o[this.name].push) {
						o[this.name] = [o[this.name]];
					}
						o[this.name].push( _val(this.value) );
				} else {
					o[this.name] = _val(this.value);
				}
			}
		}
	});
	return o;
};

/* page elements/components
*/


// indicate whether _p.init_document_ready() run
	//_p.is_init_document_ready = false

//
	_p.initDOM = function(tar){
		//tar = tar || ( _frame.dom.layout || ( $('#layout') || $body ) );
		tar = tar || ( _frame.dom.layout || ( _frame.dom.layout || $body ) );

		return tar.initAll()
	}
	_p.initAll = _p.initDOM
	$.fn.initDOM = function(){
		// call init() function in all _p.el
			for(var i in _p.el){
				if( _p.el[i].init )
					_p.el[i].init(this)
			}

		//_p.hashlinks(tar);
		return this
	};
	$.fn.initAll = $.fn.initDOM

//
	_p.init_document_ready = function(){
		if( !_p.is_init_document_ready ){
			_p.initDOM($body);
			_p.is_init_document_ready = true
		}
	}





// 获取页面描述信息
_p.getSummary=function(){
	var summary=$('#summary').text()||false;
	if(!summary&&$('head').find('meta[name=keywords]').length){
		summary=$('head').find('meta[name=Description]').attr('content');
		summary=summary.substr(0,summary.indexOf(' - ACGDB'))
	}
	return summary;
},





// 获取目标元素/元素组
_p.get_tar = function(tar, className, is_startwith){
	//tar = tar || $('body');
	tar = tar || ( _frame.dom.layout || ( $('#layout') || $body ) );

	if(className.substr(0,1) == '.')
		className = className.substr(1);
	if(tar.hasClass(className))
		return tar;
	if(is_startwith)
		return tar.find('[class^="'+className+'"]')
	return tar.find('.'+className)
};









// 处理URI Hash链接
_p.hashlinks = function(tar){
	tar = tar || $body;
	tar.find('a[href^=#]').each(function(){
		$(this)
			.off('click.hashlink')
			.on({
				'click.hashlink': function(){
					_g.goto_hash($(this).attr('href'));
					return false;
				}
			})
	});
}





// 返回目标元素的行数
_p.get_lines = function(el, el_lineheight){
	el_lineheight = el_lineheight || el
	return Math.max(
				1,
				Math.floor(
					Math.min(
						el.innerHeight(),
						el.height()
					) / parseFloat(el_lineheight.css('line-height'))
				)
			)
}





// 处理时间元素
_p.el.time = {
	init: function(tar){
		var els = _p.get_tar(tar, '.time');
		els.each(function(){
			var o = $(this),
				str = o.text()
				time = str ? _g.time(str) : null

			if(time){
				_g.posttime.push({
					time:	time,
					obj:	o
				})
			}
		});
		_g.timeDiffInterval()
	}
}
// 处理时间元素：秒
_p.el.timeSec = {
	init: function(tar){
		var els = _p.get_tar(tar, '.time-sec');
		els.each(function(){
			var o = $(this)

			if( o.data('acgdb-time-sec') )
				return o.data('acgdb-time-sec')

			var str = o.text()
				,time = /\s*([0-9]+)/.exec( str )
			if( time && time.length > 1 ){
				time = parseInt(time[1])
				var m 	= Math.floor( time / 60 )
					,s 	= time % 60
					,t 	= (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s + "'"
				o.text(t)
			}
			o.data('acgdb-time-sec', time)
		});
	}
}







// 移除空的textNode
_p.removeEmptyTextNode = function( el ){
	el = $(el)
	
	if( !el.length )
		return false
	
	el.contents()
		.filter(function() {
			return this.nodeType === 3; //Node.TEXT_NODE
		}).remove()
}

;(function (undefined) {
    "use strict";

    var defined = function (variable) {
        return (variable != undefined);
    };

    // Visibility.js allow you to know, that your web page is in the background
    // tab and thus not visible to the user. This library is wrap under
    // Page Visibility API. It fix problems with different vendor prefixes and
    // add high-level useful functions.
    var self = window.Visibility = {

        // Call callback only when page become to visible for user or
        // call it now if page is visible now or Page Visibility API
        // doesn’t supported.
        //
        // Return false if API isn’t supported, true if page is already visible
        // or listener ID (you can use it in `unbind` method) if page isn’t
        // visible now.
        //
        //   Visibility.onVisible(function () {
        //       startIntroAnimation();
        //   });
        onVisible: function (callback) {
            if ( !self.isSupported() || !self.hidden() ) {
                callback();
                return self.isSupported();
            }

            var listener = self.change(function (e, state) {
                if ( !self.hidden() ) {
                    self.unbind(listener);
                    callback();
                }
            });
            return listener;
        },

        // Call callback when visibility will be changed. First argument for
        // callback will be original event object, second will be visibility
        // state name.
        //
        // Return listener ID to unbind listener by `unbind` method.
        //
        // If Page Visibility API doesn’t supported method will be return false
        // and callback never will be called.
        //
        //   Visibility.change(function(e, state) {
        //       Statistics.visibilityChange(state);
        //   });
        //
        // It is just proxy to `visibilitychange` event, but use vendor prefix.
        change: function (callback) {
            if ( !self.isSupported() ) {
                return false;
            }
            self._lastCallback += 1;
            var number = self._lastCallback;
            self._callbacks[number] = callback;
            self._setListener();
            return number;
        },

        // Remove `change` listener by it ID.
        //
        //   var id = Visibility.change(function(e, state) {
        //       firstChangeCallback();
        //       Visibility.unbind(id);
        //   });
        unbind: function (id) {
            delete self._callbacks[id];
        },

        // Call `callback` in any state, expect “prerender”. If current state
        // is “prerender” it will wait until state will be changed.
        // If Page Visibility API doesn’t supported, it will call `callback`
        // immediately.
        //
        // Return false if API isn’t supported, true if page is already after
        // prerendering or listener ID (you can use it in `unbind` method)
        // if page is prerended now.
        //
        //   Visibility.afterPrerendering(function () {
        //       Statistics.countVisitor();
        //   });
        afterPrerendering: function (callback) {
            if ( !self.isSupported() || 'prerender' != self.state() ) {
                callback();
                return self.isSupported();
            }

            var listener = self.change(function (e, state) {
                if ( 'prerender' != state ) {
                    self.unbind(listener);
                    callback();
                }
            });
            return listener;
        },

        // Return true if page now isn’t visible to user.
        //
        //   if ( !Visibility.hidden() ) {
        //       VideoPlayer.play();
        //   }
        //
        // It is just proxy to `document.hidden`, but use vendor prefix.
        hidden: function () {
            return self._prop('hidden', false);
        },

        // Return visibility state: 'visible', 'hidden' or 'prerender'.
        //
        //   if ( 'prerender' == Visibility.state() ) {
        //       Statistics.pageIsPrerendering();
        //   }
        //
        // Don’t use `Visibility.state()` to detect, is page visible, because
        // visibility states can extend in next API versions.
        // Use more simpler and general `Visibility.hidden()` for this cases.
        //
        // It is just proxy to `document.visibilityState`, but use
        // vendor prefix.
        state: function () {
            return self._prop('visibilityState', 'visible');
        },

        // Return true if browser support Page Visibility API.
        //
        //   if ( Visibility.isSupported() ) {
        //       Statistics.startTrackingVisibility();
        //       Visibility.change(function(e, state)) {
        //           Statistics.trackVisibility(state);
        //       });
        //   }
        isSupported: function () {
            return defined(self._prefix());
        },

        // Link to document object to change it in tests.
        _doc: window.document,

        // Vendor prefix cached by `_prefix` function.
        _chechedPrefix: null,

        // Is listener for `visibilitychange` event is already added
        // by `_setListener` method.
        _listening: false,

        // Last timer number.
        _lastCallback: -1,

        // Callbacks from `change` method, that wait visibility changes.
        _callbacks: { },

        // Variable to check hidden-visible state changes.
        _hiddenBefore: false,

        // Initialize variables on page loading.
        _init: function () {
            self._hiddenBefore = self.hidden();
        },

        // Detect vendor prefix and return it.
        _prefix: function () {
            if ( null !== self._chechedPrefix ) {
                return self._chechedPrefix;
            }
            if ( defined(self._doc.visibilityState) ) {
                return self._chechedPrefix = '';
            }
            if ( defined(self._doc.webkitVisibilityState) ) {
                return self._chechedPrefix = 'webkit';
            }
        },

        // Return property name with vendor prefix.
        _name: function (name) {
            var prefix = self._prefix();
            if ( '' == prefix ) {
                return name;
            } else {
                return prefix +
                    name.substr(0, 1).toUpperCase() + name.substr(1);
            }
        },

        // Return document’s property value with name with vendor prefix.
        // If API is not support, it will retun `unsupported` value.
        _prop: function (name, unsupported) {
            if ( !self.isSupported() ) {
                return unsupported;
            }
            return self._doc[self._name(name)];
        },

        // Listener for `visibilitychange` event.
        _onChange: function(event) {
            var state = self.state();

            for ( var i in self._callbacks ) {
                self._callbacks[i].call(self._doc, event, state);
            }

            self._hiddenBefore = self.hidden();
        },

        // Set listener for `visibilitychange` event.
        _setListener: function () {
            if ( self._listening ) {
                return;
            }
            var event = self._prefix() + 'visibilitychange';
            var listener = function () {
                self._onChange.apply(Visibility, arguments);
            };
            if ( self._doc.addEventListener ) {
                self._doc.addEventListener(event, listener, false);
            } else {
                self._doc.attachEvent(event, listener);
            }
            self._listening = true;
            self._hiddenBefore = self.hidden();
        }

    };

    self._init();

})();

/*! Copyright (c) 2013 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.1.3
 *
 * Requires: 1.2.2+
 */

(function (factory) {
    if ( typeof define === 'function' && define.amd ) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS style for Browserify
        module.exports = factory;
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    var toFix = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'];
    var toBind = 'onwheel' in document || document.documentMode >= 9 ? ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'];
    var lowestDelta, lowestDeltaXY;

    if ( $.event.fixHooks ) {
        for ( var i = toFix.length; i; ) {
            $.event.fixHooks[ toFix[--i] ] = $.event.mouseHooks;
        }
    }

    $.event.special.mousewheel = {
        setup: function() {
            if ( this.addEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.addEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = handler;
            }
        },

        teardown: function() {
            if ( this.removeEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.removeEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = null;
            }
        }
    };

    $.fn.extend({
        mousewheel: function(fn) {
            return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
        },

        unmousewheel: function(fn) {
            return this.unbind("mousewheel", fn);
        }
    });


    function handler(event) {
        var orgEvent = event || window.event,
            args = [].slice.call(arguments, 1),
            delta = 0,
            deltaX = 0,
            deltaY = 0,
            absDelta = 0,
            absDeltaXY = 0,
            fn,
            wheelData = {
                deltaMode:      orgEvent.deltaMode || 0,
                delta:          orgEvent.delta || orgEvent.wheelDelta || 0,
                deltaX:         orgEvent.deltaX || orgEvent.wheelDeltaX || 0,
                deltaY:         orgEvent.deltaY || orgEvent.wheelDeltaY || 0,
                deltaZ:         orgEvent.deltaZ || orgEvent.wheelDeltaZ || 0,
                deltaLine:      orgEvent.DOM_DELTA_LINE || 0,
                deltaPage:      orgEvent.DOM_DELTA_PAGE || 0,
                deltaPixel:     orgEvent.DOM_DELTA_PIXEL || 0,
                detail:         orgEvent.detail || 0,
                type:           orgEvent.type || 0
            }

        if( !wheelData.delta )
            wheelData.delta = wheelData.deltaX || wheelData.deltaY || wheelData.deltaZ

        event = $.event.fix(orgEvent);
        event.type = "mousewheel";

        // Old school scrollwheel delta
        if ( orgEvent.wheelDelta ) { delta = orgEvent.wheelDelta; }
        if ( orgEvent.detail )     { delta = orgEvent.detail * -1; }

        // New school wheel delta (wheel event)
        if ( orgEvent.deltaY ) {
            deltaY = orgEvent.deltaY * -1;
            delta  = deltaY;
        }
        if ( orgEvent.deltaX ) {
            deltaX = orgEvent.deltaX;
            delta  = deltaX * -1;
        }

        // Webkit
        if ( orgEvent.wheelDeltaY !== undefined ) { deltaY = orgEvent.wheelDeltaY; }
        if ( orgEvent.wheelDeltaX !== undefined ) { deltaX = orgEvent.wheelDeltaX * -1; }

        // Look for lowest delta to normalize the delta values
        absDelta = Math.abs(delta);
        if ( !lowestDelta || absDelta < lowestDelta ) { lowestDelta = absDelta; }
        absDeltaXY = Math.max(Math.abs(deltaY), Math.abs(deltaX));
        if ( !lowestDeltaXY || absDeltaXY < lowestDeltaXY ) { lowestDeltaXY = absDeltaXY; }

        // Get a whole value for the deltas
        fn = delta > 0 ? 'floor' : 'ceil';
        delta  = Math[fn](delta / lowestDelta);
        deltaX = Math[fn](deltaX / lowestDeltaXY);
        deltaY = Math[fn](deltaY / lowestDeltaXY);

        // Add event and delta to the front of the arguments
        args.unshift(event, delta, deltaX, deltaY, wheelData);

        return ($.event.dispatch || $.event.handle).apply(this, args);
    }

}));

/* Extra properties & methods for Array
 *******************************************************************

Array.mergeFrom( array2 )
	merge array2 into Array
	returns merged Array
	unlike concat, this method will not create a new Array

 *******************************************************************
*/












Object.defineProperty(Array.prototype, 'mergeFrom', {
	enumerable:	false,
	//writable:	false,
	value: function( arr2 ){
		Array.prototype.push.apply(
			this,
			(arr2 instanceof Array || arr2.push) ? arr2 : [arr2]
		)
		return this
	}
})
/*******************************************************************
 Function shortcut for DATE

 *******************************************************************

 DATE.format( *pattern*, *set* )
 	-> _g.getText( DATE, *pattern*, *set* )

_g.formatTime( DATE time, STRING pattern[, OBJECT settings] )
	根据pattern返回格式化的时间字符串
	严格遵循PHP规则：http://www.php.net/manual/en/function.date.php
	返回
		STRING time
	变量
		time				*必须*	DATE 		欲格式化的时间对象，或时间戳
		pattern 			*必须*	STRING 		格式化公式
		settings 			[可选] 	OBJECT 		选项参数
	可用的选项
		midnight_astoday: false 	BOLLEAN 	设定为 true 后，会将深夜视为前一天，1月2日03:00 这样的时间会被输出成 1月1日27:00
		output_timezone: null 		NUMBER 		时区，必须为整数，可正负。设定后，会将时间以目标时区当时的时间输出
	可用格式化公式
		%Y 					完整的年份 				2013
		%m 					月，两位数 				01, 02 ~ 12
		%n 					月 						1, 2 ~ 12
		%d 					日，两位数 				01, 02, ...
		%j 					日 		 				1, 2, ...
		%H 					时，24小时制，两位数 	01, 02, ...
		%G 					时，24小时制 			1, 2, ...
		%i 					分，两位数 				01, 02, ...
		%s 					秒，两位数 				01, 02, ...
		%l 					星期 					周一, 周二, ...
	示例
		_g.formatTime( 1380039114581 , "%Y-%m")
			-> 2013-09



 *******************************************************************/

Date.prototype.format = function( pattern, set ){
	return _g.formatTime( this, pattern, set )
};











_g.formatTime_string = {
	'zh_CN': {
		'Midnight': '深夜',

		'Sunday': 	'周日',
		'Monday': 	'周一',
		'Tuesday': 	'周二',
		'Wednesday': '周三',
		'Thursday': '周四',
		'Friday': 	'周五',
		'Saturday':	'周六'
	}
}
_g.formatTime_weekdaymappding = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday'
]
_g.formatTime = function( time, pattern, set ){
	/*
		set = {
			midnight_astoday: 0 / today || 1 / tomorrow
			output_timezone: -12, -11, ..., -1, 0, 1, ..., 11, 12
		}
	*/
	if( !time )
		return false

	set = set || {}
	pattern = pattern || '%Y年%m月%d日'

	if( typeof time != 'date' )
		time = new Date(time)

	var timestamp = time.valueOf()

	function _zero( num ){
		return num<10 ? '0'+(num) : num
	}

	// 计算时区差
	if( typeof set.output_timezone != 'undefined' ){
		timestamp+= (set.output_timezone + time.getTimezoneOffset() / 60) * 60 * 60 * 1000
		time = new Date(timestamp)
		//console.log( time.getTimezoneOffset() / 60, set.output_timezone + time.getTimezoneOffset() / 60 , time)
	}

	var _G 	= time.getHours()
		,_H = _zero(_G)

	if( set.midnight_astoday && (_G < 6 || _G == 24) ){
		// 如果设定深夜档视为转天
			// 小时+24
			// 时间减去一天再输出
		_G+= 24
		_H = _G
		timestamp-= 24 * 60 * 60 * 1000
		time = new Date(timestamp)
		pattern = pattern.replace(/\%midnight/g, 'Midnight'._(_g.formatTime_string) )
	}else{
		pattern = pattern.replace(/\%midnight/g, '' )
	}

	return (
			pattern
				.replace(/\%Y/g,time.getFullYear())

				.replace(/\%m/g, _zero(time.getMonth()+1) )
				.replace(/\%n/g,time.getMonth()+1)

				.replace(/\%d/g, _zero(time.getDate()) )
				.replace(/\%j/g,time.getDate())

				.replace(/\%G/g, _G )
				.replace(/\%H/g, _H )

				.replace(/\%i/g, _zero(time.getMinutes()) )

				.replace(/\%s/g, _zero(time.getSeconds()) )

				.replace(/\%l/g, _g.formatTime_weekdaymappding[time.getDay()]._(_g.formatTime_string) )
			)
};
/*******************************************************************
 Function shortcut for OBJECT

 *******************************************************************

 Oebjet._size
 	-> 返回第一级项目数量




 *******************************************************************/












Object.defineProperty(Object.prototype, '_size', {
	enumerable:	false,
	//writable:	false,
	get: function(){
		var size = 0
		for( var i in this ){
			size++
		}
		return size
	}
})
/*******************************************************************
 Function shortcut for STRING

 *******************************************************************
_g.getText( STRING text, OBJECT table [, STRING locale] )
	获取翻译文本，如果查询未果，则返回原值
	返回
		STRING text_translated
	变量
		text				*必须*	STRING 		欲查询的值
		table 				*必须*	OBJECT 		查询的表
		locale 				[可选] 	STRING 		目标语言，如果没有给定，则默认使用当前语言
	快捷方式
		STRING._( OBJECT table [, STRING locale] )
		STRING.getText( OBJECT table [, STRING locale] )


 STRING.getText( *table*, *locale* )
 STRING._( *table*, *locale* )
 	-> _g.getText( STRING, *table*, *locale*, true )



 STRING.hashCode()
 	-> _g.hashCode( STRING )



 STRING.filter()
 	-> _g.stringFilter( STRING )



 STRING.filterCensored()
 	-> _g.stringFilterCensored( STRING )




 *******************************************************************/












String.prototype.getText = function( table, locale ){
	return _g.getText( this, table, locale, true )
};
String.prototype._ = String.prototype.getText






// 获取翻译文本
_g.getText = function( text, table, locale, isString ){
	if( !text || !table )
		return text

	function _r( t ){
		if( typeof t == 'object' && t.length )
			return t[0]
		return t
	}

	locale = locale || _g.lang

	var result = null

	if( table[text] ){
		if( typeof table[text] == 'string' )
			return _r(table[text])
		if( table[text][locale] )
			return _r(table[text][locale])
	}

	if( table[locale] ){
		if( table[locale][text] )
			return _r(table[locale][text])
	}

	if( typeof text != 'string' && isString ){
		_t = ''
		for( i=0; i<text.length; i++ )
			_t+= text[i]
		text = _t
	}

	return _r(text)
}

// hashCode
_g.hashCode = function( t ){
	var length = 5
	//var length = 10
		//,t = this
	t = encodeURIComponent(t)
		//,t = escape(this)
	
	try{
		return t.split("").reduce(function(a,b){a=((a<<length)-a)+b.charCodeAt(0);return a&a},0).toString(16);
	}catch(e){
		var hash = 0, i, char;
		if (t.length == 0) return hash;
		for (i = 0, l = t.length; i < l; i++) {
			char  = t.charCodeAt(i);
			hash  = ((hash<<length)-hash)+char;
			hash |= 0; // Convert to 32bit integer
		}
		return hash.toString(16);
	}
};
String.prototype.hashCode = function(){
	return _g.hashCode( this )
};








String.prototype.filter = function(){
	return _g.stringFilter( this )
};
	String.prototype.filterCensored = function(){
		return _g.stringFilterCensored( this )
	}









String.prototype.escape = function() {
    return $('<div />').text(this).html();
};
/*************************************************
* Library for HTML Templates
**************************************************

_tmpl.export( value[, returnHTML] )
	RETURNS
		jQuery object or HTML string
	PARAMETERS
		JQUERY-OBJECT || HTML-STRING value
			The thing that will be exported.
		[optional] BOOLEAN returnHTML
			default: false
			Whether export HTML string or not.

**************************************************
 */




var _tmpl = {
	export: function( value, returnHTML ){
		if( value.attr && returnHTML )
			return value.prop('outerHTML')
		if( value.attr && !returnHTML )
			return value
		if( !value.attr && returnHTML )
			return value
		if( !value.attr && !returnHTML )
			return $(value)
	}
}
/*************************************************
* Library for Hotkey bindings
**************************************************
*
* Default behavior for hotkey
*
* Bind on $window
* Triggered on keydown event
* Triggered globally unless:
	* any input, select or textarea element is being focused
	* default modal window is showing
* There's no conflit for hotkey binding. All binded functions will be run simultaneously when triggered.
*
**************************************************

_hotkey.bind( keyCode[, modifier], function[, options] )
	RETURNS
		true		if bind success
		false		if bind failed
	PARAMETERS
		STRING || NUMBER keyCode
			You can use STRING.charCodeAt() function to get key code for character.
		[optional] STRING || ARRAY modifier
			Keyboard modifier(s). Array means hotkey will be triggered when holding all the modifer keys.
			Example:
				'CTRL'
				'alt'
				'meta'
				['Meta', 'Alt']
		FUNCTION function
			Function to run.
		[optional] OBJECT options
 */




var _hotkey = {
	allowed: 	true,
	keyCodeBindings: {}
}

_hotkey.bind = function(keyCode, modifier, func, options){
	if( typeof modifier == 'function' )
		return _hotkey.bind( keyCode, null, modifier, func )

	if( !keyCode || !func )
		return false

	keyCode = parseInt( keyCode )
	modifier = typeof modifier == 'text' ? [modifier] : (modifier || [])
	options = options || {}

	if( typeof _hotkey.keyCodeBindings[keyCode] == 'undefined' )
		_hotkey.keyCodeBindings[keyCode] = {
			'default': [],
			'meta': [],
			'alt': [],
			'shift': [],
			'meta+alt': [],
			'meta+shift': [],
			'alt+shift': [],
			'meta+alt+shift': []
		}

	var metaKey = false
		,altKey = false
		,shiftKey = false

	for( var i in modifier ){
		modifier[i] = modifier[i].toLowerCase()

		if( modifier[i] == 'ctrl' || modifier[i] == 'meta' )
			metaKey = true
		if( modifier[i] == 'alt' )
			altKey = true
		if( modifier[i] == 'shift' )
			shiftKey = true
	}

	if( metaKey && altKey && shiftKey ){
		_hotkey.keyCodeBindings[keyCode]['meta+alt+shift'].push( func )
	}else if( metaKey && altKey ){
		_hotkey.keyCodeBindings[keyCode]['meta+alt'].push( func )
	}else if( metaKey && shiftKey ){
		_hotkey.keyCodeBindings[keyCode]['meta+shift'].push( func )
	}else if( altKey && shiftKey ){
		_hotkey.keyCodeBindings[keyCode]['alt+shift'].push( func )
	}else if( metaKey ){
		_hotkey.keyCodeBindings[keyCode]['meta'].push( func )
	}else if( altKey ){
		_hotkey.keyCodeBindings[keyCode]['alt'].push( func )
	}else if( shiftKey ){
		_hotkey.keyCodeBindings[keyCode]['shift'].push( func )
	}else{
		_hotkey.keyCodeBindings[keyCode]['default'].push( func )
	}

	return true
}

_hotkey._run = function( arr ){
	for( var i in arr )
		arr[i]()
}

_hotkey.init = function(){
	if( _hotkey.is_init )
		return _hotkey

	$window.on('keydown._hotkey', function(e){
		if( document.activeElement.tagName != 'INPUT'
			&& document.activeElement.tagName != 'TEXTAREA'
			&& document.activeElement.tagName != 'SELECT'
			&& !document.activeElement.hasAttribute('contenteditable')
			&& _hotkey.allowed
		){
			var keyCode = parseInt( e.keyCode || e.which )
			if( _hotkey.keyCodeBindings[keyCode] ){
				if( (e.ctrlKey || e.metaKey) && e.altKey && e.shiftKey ){
					_hotkey._run( _hotkey.keyCodeBindings[keyCode]['meta+alt+shift'] )
				}else if( (e.ctrlKey || e.metaKey) && e.altKey ){
					_hotkey._run( _hotkey.keyCodeBindings[keyCode]['meta+alt'] )
				}else if( (e.ctrlKey || e.metaKey) && e.shiftKey ){
					_hotkey._run( _hotkey.keyCodeBindings[keyCode]['meta+shift'] )
				}else if( e.altKey && e.shiftKey ){
					_hotkey._run( _hotkey.keyCodeBindings[keyCode]['alt+shift'] )
				}else if( e.ctrlKey || e.metaKey ){
					_hotkey._run( _hotkey.keyCodeBindings[keyCode]['meta'] )
				}else if( e.altKey ){
					_hotkey._run( _hotkey.keyCodeBindings[keyCode]['alt'] )
				}else if( e.shiftKey ){
					_hotkey._run( _hotkey.keyCodeBindings[keyCode]['shift'] )
				}else if( !e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey ){
					_hotkey._run( _hotkey.keyCodeBindings[keyCode]['default'] )
				}
			}
		}
	})

	_hotkey.is_init = true
}

/*************************************************
* Library for form sections creation
**************************************************
*
* Default behavior for forms
*
* Each section/line is a DL
* <DL>
* 	<DT>
* 	<DD>
*
**************************************************
*/

var _form = {}

_form.section = function(type, name, label, value, suffix, options){
	if( !type )
		return false

	if( typeof type == 'object' )
		return _form.section(type['type'], type['name'] || null, type['label'] || null, type['value'] || null, type['suffix'] || null, type)

	if( typeof name == 'object' )
		return _form.section(type, name, name['label'] || null, name['value'] || null, name['suffix'] || null, name)

	if( typeof label == 'object' )
		return _form.section(type, name, label['label'] || null, label['value'] || null, label['suffix'] || null, label)

	if( typeof value == 'object' )
		return _form.section(type, name, id, value['value'] || null, value['suffix'] || null, value)

	if( typeof suffix == 'object' )
		return _form.section(type, name, id, value || null, suffix['suffix'] || null, suffix)

	options = options || {}

	var line = $('<dl/>').addClass(type, options.className)
		,title = $('<dt/>').appendTo(line)
		,cont = $('<dd/>').appendTo(line)
		,id = '_input_g' + _g.inputIndex
	_g.inputIndex++

	switch( type ){
		case 'directory':
			$('<label/>').html( label ).appendTo(title)
			break;
		default:
			if( suffix ){
				$('<label/>').html( label ).appendTo(title)
			}else{
				$('<label for="'+id+'"/>').html( label ).appendTo(title)
			}
			break;
	}

	_form.element(type, name, id, value, options).appendTo(cont)

	if( suffix )
		$('<label for="'+id+'"/>').html(suffix).appendTo(cont)

	if( options.add )
		cont.append( options.add )

	return cont
}
_form.line = _form.section

_form.element = function(type, name, id, value, options){
	if( !type )
		return false

	if( typeof type == 'object' )
		return _form.element(type['type'], type['name'] || null, type['id'] || null, type['value'] || null, type)

	if( typeof name == 'object' )
		return _form.element(type, name, name['id'] || null, name['value'] || null, name)

	if( typeof id == 'object' )
		return _form.element(type, name, id['id'] || null, id['value'] || null, id)

	if( typeof value == 'object' )
		return _form.element(type, name, id, value['value'] || null, value)

	options = options || {}
	id = id || null

	if( id === null ){
		id = '_input_g' + _g.inputIndex
		_g.inputIndex++
	}

	var element = $()
		,defaultValue = options['default'] || options['defaultValue']

	switch( type ){
		default:
			element = $('<input/>',{
					'type': 	type,
					'name': 	name,
					'id': 		id
				}).val(value)
			break;
		case 'select':
			element = $('<select/>',{
					'name': 	name,
					'id': 		id
				}).val(value)
			var optionEmpty = $('<option value=""/>').appendTo( element )
			for( var i in value ){
				if( typeof value[i] == 'object' ){
					var v = value[i]['value'] || value[i].val
						,o_el = $('<option value="' + v + '"/>')
							.html(value[i]['title'] || value[i]['name'])
							.appendTo( element )
				}else{
					var v = value[i]
						,o_el = $('<option value="' + v + '"/>')
							.html(v)
							.appendTo( element )
				}
				if( typeof defaultValue != 'undefined' && v == defaultValue ){
					o_el.prop('selected', true)
				}
				if( !o_el.val() ){
					o_el.attr('disabled', true)
				}
			}
			if( !value || !value.length ){
				optionEmpty.html('...')
			}
			if( options['new'] ){
				$('<option value="" disabled/>').html('==========').insertAfter( optionEmpty )
				$('<option value="___new___"/>').html('+ 新建').insertAfter( optionEmpty )
				element.on('change.___new___', function(){
					if( element.val() == '___new___' ){
						element.val('')
						options['new']( element )
					}
				})
			}
			break;
		case 'select_group':
		case 'selectGroup':
			element = $('<select/>',{
					'name': 	name,
					'id': 		id
				}).val(value)
			var optionEmpty = $('<option value=""/>').appendTo( element )
			for( var i in value ){
				var group = $('<optgroup label="'+value[i][0]+'"/>').appendTo( element )
				for( var j in value[i][1] ){
					var _v = value[i][1][j]
					if( typeof _v == 'object' ){
						var o_el = $('<option value="' + (typeof _v.val == 'undefined' ? _v['value'] : _v.val) + '"/>')
							.html(_v['title'] || _v['name'])
							.appendTo( group )
					}else{
						var o_el = $('<option value="' + _v + '"/>')
							.html(_v)
							.appendTo( group )
					}
					if( typeof defaultValue != 'undefined' && o_el.val() == defaultValue ){
						o_el.prop('selected', true)
					}
					if( !o_el.val() ){
						o_el.attr('disabled', true)
					}
				}
			}
			if( !value || !value.length ){
				optionEmpty.html('...')
			}
			if( options['new'] ){
				$('<option value="" disabled/>').html('==========').insertAfter( optionEmpty )
				$('<option value="___new___"/>').html('+ 新建').insertAfter( optionEmpty )
				element.on('change.___new___', function(){
					if( element.val() == '___new___' ){
						element.val('')
						options['new']( element )
					}
				})
			}
			break;
		case 'checkbox':
			element = $('<input/>',{
					'type': 	type,
					'name': 	name,
					'id': 		id
				})

			if( typeof value == 'string' && value.toLowerCase() !== 'true' ){
				element.val(value).prop('checked', options['checked'])
			}else{
				element.prop('checked', typeof options['checked'] == 'undefined' ? value : options['checked'])
			}
			break;
		case 'checkboxes':
			for( var i in value ){
				var v = value[i]
				if( typeof v != 'object' )
					v = [v, false]

				if( parseInt(i) ){
					_g.inputIndex++
					id = '_input_g' + _g.inputIndex
				}

				element = element.add(
							$('<input type="checkbox" name="'+name+'" id="'+id+'" value="'+v[0]+'" />').prop('checked', v[1])
						).add(
							$('<label for="'+id+'"/>').html(v[2] || v[0])
						)
			}
			break;
		case 'directory':
		case 'file':
			element = $('<input type="text" name="'+name+'" id="'+id+'" />')
								.on({
									'input': function(){
										element.trigger('change')
									},
									'click': function(){
										if( !element.val() )
											button.trigger('click')
									}
								}).val(value)
			var fileinput 	= $('<input type="file" class="none"' +(type == 'directory' ? ' nwdirectory' : '')+ ' />')
								.on('change', function(){
									element.val( $(this).val() ).trigger('change')
								})
				,button 	= $('<button type="button" value="Browse..."/>').html('Browse...')
								.on('click', function(){
									//console.log(123)
									//if( type == 'file' )
										fileinput.trigger('click')
								})
			var elementAll	= element.add(fileinput).add(button)
			if( options['accept'] )
				fileinput.attr('accept', options['accept'])
			break;
	}

	if( options.required )
		element.prop('required', true)

	if( options.onchange ){
		element.on('change.___onchange___', options.onchange )
		if( options['default'] )
			element.trigger('change')
	}

	if( elementAll )
		return elementAll

	return element
}
// https://github.com/nwjs/nw.js/blob/nw13/src/resources/nw_pre13_shim.js
(function () {

    // console.log(
    //     top.nw,
    //     self.nw
    // )

    if (self !== top && top.nw && top.nw.require) self.nw = top.nw

    // detect `nw` object of NW13
    if (!(self.nw && self.nw.require)) return

    var realrequire = nw.require;
    self.require = function () {
        if (arguments[0] === 'nw.gui') {
            return nw;
        } else {
            return realrequire.apply(self, [].slice.call(arguments, 0));
        }
    };
    self.require.cache = realrequire.cache;
    self.require.extensions = realrequire.extensions;
    self.require.resolve = realrequire.resolve;

    // Following items exist when running with `--mixed-context`.
    // Copy them from `nw` to browser context
    if (!self.process) self.process = self.nw.process;
    if (!self.Buffer) self.Buffer = self.nw.Buffer;
    if (!self.global) self.global = self.nw.global;
    if (!self.root) self.root = self.nw.root;

}());

// define and require node.js libraries & modules
var node = {
    'require': function (module, only_require) {
        /*var r = typeof nw != 'undefined' && nw.require
                    ? nw.require
                    : require
                    */
        if (!node[module] && !only_require) {
            node[module] = require(module)
            if (typeof self[module] === 'undefined')
                self[module] = node[module]
        } if (only_require)
            return require(module)
        return node[module]
    }
}


node.gui = node.require('nw.gui', true)
// node.win = node.gui.Window.get()
node.clipboard = node.gui.Clipboard.get();

node.require('path')
node.require('fs')

if (typeof launcherOptions === 'undefined')
    self.launcherOptions = {
        window: {}
    }
node.win = node.win || self.win || (typeof nw !== 'undefined' ? nw.Window.get() : undefined) || node.gui.Window.get()


if (typeof debugmode == 'undefined')
    var debugmode = false
        || (
            node.gui.App.manifest['debug']
            || node.gui.App.manifest['window']['debug']
        )

if (global && launcherOptions && launcherOptions.window && typeof launcherOptions['window']['debug'] !== 'undefined') {
    debugmode = launcherOptions['debug'] || launcherOptions['window']['debug']
}



// _g.root, nw.js 程序运行目录
// _g.root = node.path.dirname(process.execPath).split(node.path.sep)
// _g.root = (_g.root[_g.root.length - 1] == 'nwjs' && node.path.basename( process.execPath ) == 'nw.exe')
// 				? process.cwd()
// 				: node.path.dirname(process.execPath)
// // 对app根目录再做检查，如果不存在，则指向到缓存目录
// // 该情况通常发生于使用launcer启动时
// 	try{
// 		var stat = node.fs.lstatSync( node.path.join( _g.root , '/app/main.html' ) )
// 	}catch(e){
// 		_g.root	= node.path.join( node.gui.App.dataPath, '/Extracted Data/')
// 	}
// _g.root = node.path.dirname(process.execPath)
// try {
//     node.fs.accessSync(
//         node.path.join(_g.root, 'package.json'),
//         node.fs.F_OK
//     );
// } catch (e) {
//     _g.root = process.cwd()
//     try {
//         node.fs.accessSync(
//             node.path.join(_g.root, 'package.json'),
//             node.fs.F_OK
//         );
//     } catch (e) {
//         _g.root = node.path.join(node.gui.App.dataPath, '/Extracted Data/')
//     }
// }
_g.rootscheck = [
    node.path.dirname(process.execPath),
    process.cwd(),
    node.path.join(node.gui.App.dataPath, '/Extracted Data/')
]
_g.rootscheckentry = node.gui.App.manifest.main
_g.rootscheckentry = _g.rootscheckentry.split('://')
_g.rootscheckentry = _g.rootscheckentry[_g.rootscheckentry.length - 1]
for (var i = 0; i < _g.rootscheck.length; i++) {
    var dir = _g.rootscheck[i]
    // var hasMain = true
    // try {
    //     node.fs.accessSync(
    //         node.path.join(dir, 'app', 'main.html'),
    //         node.fs.F_OK
    //     );
    // } catch (e) {
    //     hasMain = false
    // }
    if (!_g.root && node.fs.existsSync(node.path.join(dir, 'app', 'main.html'))) {
        _g.root = dir
        continue
    }
}


// _g.execPath
_g.execPath = node.path.dirname(process.execPath).split(node.path.sep)
_g.execPath = (process.platform == 'darwin' || (_g.execPath[_g.execPath.length - 1] == 'nwjs' && node.path.basename(process.execPath) == 'nw.exe'))
    ? process.cwd()
    : node.path.dirname(process.execPath)



// 文件另存为
_g.file_save_as = function (path_src, filename, callback) {
    path_src = node.path.normalize(path_src)
    if (!_frame.dom.hidden_saveform)
        _frame.dom.hidden_saveform = $('<input type="file" nwsaveas/>')
            .on('change', function () {
                var input = _frame.dom.hidden_saveform
                    , dest = input.val()
                    , path_file = input.attr('nwsaveas_file')
                input.attr('nwsaveas', '').attr('nwsaveas_file', '').val('')

                if (dest) {
                    var cbCalled = false
                        , rd = node.fs.createReadStream(path_file)
                    rd.on("error", function (err) {
                        done(err);
                    });
                    var wr = node.fs.createWriteStream(dest);
                    wr.on("error", function (err) {
                        done(err);
                    });
                    wr.on("close", function (ex) {
                        done();
                    });
                    rd.pipe(wr);
                    function done(err) {
                        if (!cbCalled) {
                            callback(err, path_src, dest);
                            cbCalled = true;
                        }
                    }
                }
            })
            .appendTo(_frame.dom.hidden)
    _frame.dom.hidden_saveform
        .attr({
            'nwsaveas': filename || '',
            'nwsaveas_file': path_src
        }).trigger('click')
}


// Set actual page zoom, 1 = 100%, 0.5 = 50%, 2 = 200%, etc...
_g.zoom = function (v) {
    v = v || 1
    node.win.zoomLevel = Math.log(v) / Math.log(1.2)
    return node.win.zoomLevel
}

var _config = {
    getFullKeyname: function (key) {
        return 'config_' + key
    },

    get: function (key) {
        if (!localStorage)
            return false

        key = _config.getFullKeyname(key)

        var value = Lockr.get(key)
        // var value = localStorage[_config.getFullKeyname(key)]

        if (value === 'true')
            return true

        if (value === 'undefined') {
            Lockr.rm(key)
            // delete localStorage[_config.getFullKeyname(key)]
            return null
        }

        return value
    },

    set: function (key, value) {
        if (!localStorage)
            return false

        key = _config.getFullKeyname(key)

        if (value === null && Lockr.get(key)) {
            // delete localStorage[_config.getFullKeyname(key)]
            Lockr.rm(key)
        } else {
            Lockr.set(key, value)
            // localStorage[_config.getFullKeyname(key)] = value
        }
    }
}




_frame.app_config = {
    //is_init: false,

    init: function () {
        if (_frame.app_config.is_init)
            return true

        _frame.app_config.is_init = true
    }
}
_frame.app_menu = {
	menus: {},
	//is_init: false,

	init: function(){
		if( _frame.app_menu.is_init )
			return true

		// 创建各种菜单
			_frame.app_menu.menus = {}


		// 事件委托
			$body.on('contextmenu.contextmenu_image', 'img[data-filename]', function(e){
				var img = $(this)
					,attr_contextmenu = img.attr('contextmenu')
				if( !attr_contextmenu || !attr_contextmenu == 'disabled' || attr_contextmenu == 'false' ){
					e.preventDefault()
					console.log(e)
					if( !_frame.app_menu.img ){
						_frame.app_menu.img = new _menu({
								'className': 'contextmenu-img',
								'items': [
									$('<menuitem/>').html('保存图片')
										.on({
											'click': function(){
												_g.file_save_as(
													_frame.app_menu.img.file_original,
													_frame.app_menu.img.file_save_as
												)
											}
										})
								]
							})
					}
					_frame.app_menu.img.file_original = node.path.normalize(img.attr('src'))
					_frame.app_menu.img.file_save_as = img.data('filename') || ''
					_frame.app_menu.img.show(e.clientX, e.clientY)
					/*
					var menu = new node.gui.Menu()
					menu.append(new node.gui.MenuItem({
							'label': 	'保存图片',
							'click': function(){
								_g.file_save_as(
									node.path.normalize(img.attr('src')),
									img.data('filename') || ''
								)
							}
						}));
					menu.popup(e.clientX, e.clientY);
					*/
					return false
				}
			})

		_frame.app_menu.is_init = true
	}
}
// 打开新的node-webkit窗口
node.openWin = function (path, options) {
    node.gui.Window.open(path, $.extend(true, {
        "title": null,
        "width": Math.max(Math.floor(screen.availWidth * 0.85), 320),
        "height": Math.max(Math.floor(screen.availHeight * 0.85), 320),
        "toolbar": node.gui.App.manifest['window']['toolbar'],
        "icon": node.gui.App.manifest['window']['icon'],
        "position": "center",
        "min_width": 320,
        "min_height": 320,
        "max_width": null,
        "max_height": null,
        "as_desktop": false,
        "resizable": node.gui.App.manifest['window']['resizable'],
        "always-on-top": false,
        "fullscreen": false,
        "show_in_taskbar": node.gui.App.manifest['window']['show_in_taskbar'],
        "frame": node.gui.App.manifest['window']['frame'],
        "show": true,
        "kiosk": false,
        "transparent": node.gui.App.manifest['window']['transparent']
    }, options))
}










//node.win.on('loaded', function(){
//})







_frame.app_window = {
    //is_init: false,

    bindEvents: function (thisWin) {
        thisWin = thisWin || self.win || node.win

        setTimeout(function () {
            thisWin.on('blur', function () {
                $html.addClass('window-blured')
            })
            thisWin.on('focus', function () {
                $html.removeClass('window-blured')
            })
            thisWin.on('maximize', function () {
                $html.addClass('window-maxmize')
                _config.set('windowMaximize', true)
                _config.set('windowMaximizeX', screen.availLeft || 0)
                _config.set('windowMaximizeY', screen.availTop || 0)
                _config.set('windowX', null)
                _config.set('windowY', null)
                _config.set('windowWidth', null)
                _config.set('windowHeight', null)
            })
            thisWin.on('unmaximize', function () {
                $html.removeClass('window-maxmize')
                _config.set('windowMaximize', null)
                _config.set('windowMaximizeX', null)
                _config.set('windowMaximizeY', null)
            })
            thisWin.on('enter-fullscreen', function () {
                $html.addClass('window-fullscreen')
                _config.set('windowFullscreen', true)
            })
            thisWin.on('leave-fullscreen', function () {
                $html.removeClass('window-fullscreen')
                _config.set('windowFullscreen', null)
            })
            thisWin.on('move', function (x, y) {
                _config.set('windowX', x)
                _config.set('windowY', y)
            })
            thisWin.on('resize', function (width, height) {
                _config.set('windowWidth', width)
                _config.set('windowHeight', height)
            })
            //win.on('close', function(){
            //	alert( 'dumpWindowStatus' )
            //	this.close(true)
            //})
            $window.on('resize', function () {
                _config.set('windowWidth', window.outerWidth)
                _config.set('windowHeight', window.outerHeight)
                // console.log(window.outerWidth, window.outerHeight)
            })
        }, 100)
    },

    init: function (thisWin) {
        if (_frame.app_window.is_init)
            return true

        thisWin = thisWin || self.win || node.win

        if ($html.hasClass('app')) {
            // 恢复窗口尺寸和位置
            //if( !global.launcherOptions ){
            var windowX = parseInt(_config.get('windowX'))
                , windowY = parseInt(_config.get('windowY'))
            if (_config.get('windowMaximize')) {
                windowX = parseInt(_config.get('windowMaximizeX')) || windowX
                windowY = parseInt(_config.get('windowMaximizeY')) || windowY
                if (!isNaN(windowX) && !isNaN(windowY)) {
                    thisWin.moveTo(windowX, windowY)
                }
                thisWin.maximize()
                $html.addClass('window-maxmize')
            } else {
                var windowWidth = Math.max(
                    parseInt(
                        _config.get('windowWidth')
                        || (launcherOptions && launcherOptions['window']
                            ? launcherOptions['window']['width']
                            : node.gui.App.manifest['window']['width'])
                    )
                    , (launcherOptions && launcherOptions['window'] && launcherOptions['window']['min_width']
                        ? launcherOptions['window']['min_width']
                        : node.gui.App.manifest['window']['min_width']) || 0
                )
                    , windowHeight = Math.max(
                        parseInt(
                            _config.get('windowHeight')
                            || (launcherOptions && launcherOptions['window']
                                ? launcherOptions['window']['height']
                                : node.gui.App.manifest['window']['height'])
                        )
                        , (launcherOptions && launcherOptions['window'] && launcherOptions['window']['min_height']
                            ? launcherOptions['window']['min_height']
                            : node.gui.App.manifest['window']['min_height']) || 0
                    )

                if (!isNaN(windowX) && !isNaN(windowY)) {
                    thisWin.moveTo(windowX, windowY)

                    var availWidth = screen.availWidth + (screen.availLeft || 0)
                        , availHeight = screen.availHeight + (screen.availTop || 0)

                    // 保证窗口不超出屏幕
                    if (windowX < 0)
                        windowX = 0
                    if (windowWidth + windowX > availWidth)
                        windowX = availWidth - windowWidth
                    if (windowY < 0)
                        windowY = 0
                    if (windowHeight + windowY > availHeight)
                        windowY = availHeight - windowHeight

                    thisWin.moveTo(windowX, windowY)
                }

                // console.log(_config.get('windowWidth'), _config.get('windowHeight'))
                // console.log(windowWidth, windowHeight)
                // alert(_config.get('windowWidth') + ' x ' + _config.get('windowHeight'))
                // alert(windowWidth + ' x ' + windowHeight)
                if (!isNaN(windowWidth) && !isNaN(windowHeight) && windowWidth && windowHeight) {
                    thisWin.resizeTo(Math.floor(windowWidth), Math.floor(windowHeight))
                    if (!windowX || !windowY) {
                        thisWin.moveTo(
                            Math.floor(screen.availLeft + (screen.availWidth - windowWidth) / 2),
                            Math.floor(screen.availTop + (screen.availHeight - windowHeight) / 2)
                        )
                    }
                }
            }
            //}

            // 为窗口绑定事件
            _frame.app_window.bindEvents()

            // 处理标题栏标题与按钮
            if ((!launcherOptions && node.gui.App.manifest['window']['frame']) || (launcherOptions && launcherOptions['window']['frame'])) {
                if (debugmode) {
                    _frame.dom.debugbtns = $('<div class="debugbtns"/>').appendTo($body)
                    $('<button/>', {
                        'html': 'Console'
                    }).on('click', function () {
                        thisWin.showDevTools()
                    }).appendTo(_frame.dom.debugbtns)
                    $('<button/>', {
                        'html': 'Reload'
                    }).on('click', function () {
                        location.reload()
                    }).appendTo(_frame.dom.debugbtns)
                }
            } else {
                $html.addClass('window-noframe')
                var titlebar = $('#titlebar')
                if (!titlebar || !titlebar.length) {
                    titlebar = $('<div id="titlebar"/>').appendTo($body)
                    $('<strong/>').appendTo(titlebar)
                    $('<div class="buttons"/>')
                        .append(
                        $('<button class="icon minimize"/>')
                        )
                        .append(
                        $('<button class="icon maximize"/>')
                        )
                        .append(
                        $('<button class="icon close"/>')
                        )
                        .appendTo(titlebar)
                    $('<div id="window_border"/>').insertAfter(titlebar)
                }
                titlebar.children('strong').html(thisWin.title)
                titlebar.find('.buttons .minimize').on('click', function () {
                    thisWin.minimize()
                })
                titlebar.find('.buttons .maximize').on('click', function () {
                    if ($html.hasClass('window-maxmize')) {
                        thisWin.restore()
                        $html.removeClass('window-maxmize')
                        _config.set('windowMaximize', null)
                        _config.set('windowMaximizeX', null)
                        _config.set('windowMaximizeY', null)
                    } else
                        thisWin.maximize()
                })
                titlebar.find('.buttons .close').on('click', function () {
                    thisWin.close()
                })
                if (debugmode) {
                    $('<button/>', {
                        'class': 'console',
                        'html': 'Console'
                    }).on('click', function () {
                        thisWin.showDevTools()
                    }).prependTo(titlebar.find('.buttons'))
                    $('<button/>', {
                        'class': 'console',
                        'html': 'Reload'
                    }).on('click', function () {
                        location.reload()
                    }).prependTo(titlebar.find('.buttons'))
                }
            }

            thisWin.show()
            thisWin.focus()
        }

        _frame.app_window.is_init = true
    }
}

/* 
 */



_frame.dom = {}
_frame.main = {
	'last': {}
}




_frame.global = {
	// 已注册的快捷键
	key_registerd: [],

	esc_funcs: [],
	//is_init:	false,

	allowKeyNav: true, 			// 是否允许键盘导航，如箭头、pagedown、pageup




	// 注册ESC热键所触发的函数
	esc_register: function( func ){
		_frame.global.esc_funcs.push( func )
	},



	// 禁用页面自身滚动能力
	disableBodyScroll: function(){
		$(document.body).on("touchmove.disableBodyScroll mousewheel.disableBodyScroll", function(event) {
			event.preventDefault();
			event.stopPropagation();
		});
	},
	// 恢复页面自身滚动能力
	enableBodyScroll: function(){
		$(document.body).off("touchmove.disableBodyScroll mousewheel.disableBodyScroll")
	}

}







// 初始化
_frame.global.init = function(){
	if( _frame.global.is_init )
		return true

	
	_frame.dom = {
		'layout': 	$('#layout')
	}


	// 注册热键
		$body.on({
			'keydown.esckey': function(e){
				if( document.activeElement.tagName != 'INPUT'
					&& document.activeElement.tagName != 'TEXTAREA'
					&& document.activeElement.tagName != 'SELECT'
					&& !$(document.activeElement).attr('contenteditable')
					&& _frame.global.allowKeyNav
				){
					if( !e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey ){
						var key = window.event ? e.keyCode : e.which
							key = key.toString()
						//console.log(key)
					}
				}else if( !_frame.global.allowKeyNav ){
					if( !e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey ){
						var key = window.event ? e.keyCode : e.which
							key = key.toString()
						switch( key ){
							case '27': // ESC：关闭全部浮动层级
								for( var i=0; i<_frame.global.esc_funcs.length; i++){
									_frame.global.esc_funcs[i]()
								}
								break;
						}
					}
				}
			}
		})


	// 创建隐藏地点
		_frame.dom.hidden 			= $('<div/>',{'class':'none'}).appendTo($body)
		_frame.dom.hiddenVisible 	= $('<div/>',{'class':'none-visible'}).appendTo($body)
		_frame.dom.hiddenIframe 	= $('<iframe/>',{'class':'none', 'name':'hiddeniframe'}).appendTo($body)


	// 事件委托
		$body.on( 'submit.check_submitting_status', 'form', function(e){
			var form = $(this)
			if( form.hasClass('submitting') || form.hasClass('loading') || form.hasClass('disabled') )
				e.preventDefault()
		});


	_frame.global.is_init = true

	
	return true
}













var _menu = function( settings ){
	if( !this.settings ){
		this.settings = $.extend(
				true,
				{},
				this.defaults,
				settings || {}
			)
		
		this.init()
	}
}

_menu.prototype.defaults = {
	// 菜单项目
		'items': 		[],
	// 目标元素，如果存在，会根据该元素计算菜单呼出位置
		'target': 		null,
	// 追加样式
		'className': 	null
}

_menu.prototype.init = function(){
	var self = this

	// 创建DOM
		this.dom = {}
		this.dom.menu 	= $('<div class="menu"/>')
							.addClass(this.settings.className)
							.on('click', function(){
								if( !self.timeout_hideself )
									self.timeout_hideself = setTimeout(function(){
										self.timeout_hideself = null
										self.hide()
									}, 10)
							})
							//.appendTo(_frame.menu.dom.container)
		this.dom.body 	= $('<div class="body"/>').appendTo(this.dom.menu)
	
	// 绑定transitionend事件，自动触发隐藏函数
		this.dom.menu.on({
			//'transitionend.menu_hide': function(e){
			'transitionend.menu_hide webkitTransitionEnd.menu_hide mozTransitionEnd.menu_hide': function(e){
				if( e.currentTarget == e.target
					&& e.originalEvent.propertyName == 'opacity'
					&& parseFloat(self.dom.menu.css('opacity')) === 0
				){
					self.hideTrue()
				}
			}
		})
	
	// 创建全部菜单项目
		for(var i = 0, menuitem; menuitem = this.settings.items[i] ; i++){
			if( menuitem ){
				switch( menuitem ){
					case 'separator':
						menuitem = $('<hr/>')
						break;
				}
				if( menuitem.hasClass('donot_hide') ){
					menuitem.on('click', function(){
						setTimeout(function(){
							clearTimeout(self.timeout_hideself)
							self.timeout_hideself = null
						}, 1)
					})
				}
				self.appendItem( menuitem )
			}
		}
		this.dom.body.find('input[type="checkbox"]+label').addClass('checkbox')

	// 虚化背景
		if( typeof node != 'undefined' ){
			this.dom.menu.addClass('mod-blur-shot')
		}

	_frame.menu.menus.push(this)
}

_menu.prototype.show = function( targetEl, x, y ){
	if( this.showing )
		return this
	
	if( typeof targetEl == 'number' )
		return this.show( 'mouse', targetEl, x )

	targetEl = targetEl || this.settings.target

	clearTimeout(_frame.menu.timeout_hideall)
	_frame.menu.timeout_hideall = null

	// addClass: show
		this.dom.menu.appendTo(_frame.menu.dom.container).addClass('show')
		_frame.menu.dom.container.addClass('on')
	
	// 设置状态
		this.showing = true
	
	// 触发所有子元素的onshow事件
		this.dom.body.children().trigger('show')

	// 计算并设置位置
		this.position( targetEl, x, y )

	// 虚化背景
		if( typeof node != 'undefined' ){
			node.win.capturePage(this.capturePage_callback.bind(this), {
				format: 'jpg',
				datatype: 'datauri'
			})
		}else{
			this.dom.menu.addClass('on')
		}
}

_menu.prototype.hide = function( callback_hide ){
	if( !this.showing )
		return false
	
	if( callback_hide )
		this.callback_hide = callback_hide

	if( !this.dom.menu.hasClass('on') )
		this.hideTrue()

	// removeClass: on
		this.dom.menu.removeClass('on')
}

_menu.prototype.hideTrue = function(){
	// 重置样式与位置
		this.dom.menu.removeClass('show')
			.css({
				'top': 	'',
				'left': ''
			})
			.detach()
	
	// 移除虚化背景DOM
		if( this.dom.blured instanceof jQuery ){
			this.dom.blured.remove()
			delete this.dom.blured
		}
	
	// 重置状态
		this.showing = false
		_frame.menu.dom.container.removeClass('on')
	
	if( this.callback_hide )
		this.callback_hide()
	
	delete( this.callback_hide )
}

_menu.prototype.position = function( targetEl, x, y ){
	var top, left, viewport_height, viewport_width, menu_height, menu_width
	
	targetEl = targetEl || this.settings.target

	this.dom.menu
		.css({
			'top': 	'',
			'left': ''
		})

	if( targetEl && targetEl instanceof jQuery ){
		var offset 	= targetEl.offset()
		top		= offset.top + targetEl.height() - $body.scrollTop() + (y || 0)
		left 	= offset.left - $body.scrollLeft() + (x || 0)
	}else if( targetEl == 'mouse' || (!targetEl && typeof x == 'number') ){
		left	= x || 0
		top 	= (y + 5) || 0
	}

	viewport_height		= $window.height() - 10
	viewport_width		= $window.width() - 10

	menu_height			= this.dom.menu.outerHeight()
	menu_width			= this.dom.menu.outerWidth()

	this.dom.menu.css({
		'top': 		top + menu_height > viewport_height
						? viewport_height - menu_height
						: top,
		//'left': 	offset.left - $body.scrollLeft()
		'left': 	left + menu_width > viewport_width
						? viewport_width - menu_width
						: left
	})
}

_menu.prototype.appendItem = function(item){
	if( item instanceof jQuery )
		return item.appendTo( this.dom.body )
}

_menu.prototype.capturePage_callback = function( datauri ){
	//console.log(this)
	if( this.showing ){
		this.dom.blured = $('<s class="blured"/>').css('background-image', 'url('+datauri+')').appendTo( this.dom.menu.addClass('on') )
	}
}

_menu.hideAll = function(ms){
	_frame.menu.timeout_hideall = setTimeout(function(){
		for(var i in _frame.menu.menus){
			if( _frame.menu.menus[i].hide )
				_frame.menu.menus[i].hide()
		}
		_frame.menu.timeout_hideall = null
	}, ms || 1)
}










_frame.menu = {
	dom: {},
	menus: [],
	init: function(){
		if( this.is_init )
			return this
		
		// 创建顶级DOM，用于承载各menu
			this.dom.container = $('<div class="menus"/>')
				.on({
					'click': function(e, ms){
						_menu.hideAll(ms)
					},
					'contextmenu': function(e){
						_frame.menu.dom.container.trigger('click')
						e.preventDefault()
					}/*,
					'mousemove': function(){
						if( !_frame.menu.timeout_hideall )
							_frame.menu.dom.container.trigger('click', [500])
					}*/
				})
				.appendTo($body)

		// 绑定事件，在菜单内的点击不会触发隐藏全部菜单
			$body.on('click.cancel_hideall', '.menus>.menu', function(e){
				clearTimeout(_frame.menu.timeout_hideall)
				_frame.menu.timeout_hideall = null
			})

		this.is_init = true
	}
}
/* 
 */

_frame.modal = {
	dom: {},

	defaults: {
		// modal追加class
		'classname': '',

		// 尺寸，CSS标准
		//'width': 		'75%',
		//'height': 	'75%',

		// 是否显示模糊背景，模拟毛玻璃特效
		'showBlured': true,

		// 是否允许点击空白区域隐藏modal
		//'blank_to_close': 	false

		// 隐藏/关闭时，使用 detach 而非 remove
		// 'detach':	false

		// 关闭时运行的函数
		// 'onClose': 	function(){}
	},

	show: function (content, title, options, callback) {
		clearTimeout(this.hide_timeout)
		this.hide_timeout = null

		this.dom.container.addClass('show')
		this.showing = true

		var settings = $.extend({}, this.defaults, options);

		if (settings.detach)
			this.content = content

		//this.dom.content.empty()
		content.appendTo(this.dom.content)

		if (settings.onClose)
			_frame.modal.dom.container.on('close', settings.onClose)

		//this.dom.container.removeClass( this.dom.container.data('customclass') )

		//if( this.dom.blured ){
		//	this.dom.blured.remove()
		//	this.dom.blured = null
		//}

		if (title) {
			this.dom.titlebar.html(title)
			this.dom.container.addClass('hastitle')
		} else {
			this.dom.titlebar.html('')
			this.dom.container.removeClass('hastitle')
		}

		this.dom.box.css({
			'width': settings.width || null,
			'height': settings.height || null
		})

		if (settings.showBlured) {
			if (!this.dom.blured && typeof node != 'undefined') {
				node.win.capturePage(function (datauri) {
					//_frame.modal.dom.blured = $('<img/>').attr('src', datauri).appendTo(_frame.modal.dom.container)
					//_frame.modal.dom.blured = $('<s/>').css('background-image', 'url('+datauri+')').appendTo(_frame.modal.dom.container)
					/*_frame.modal.dom.blured = $('<s/>')
												.append( $('<img/>').attr('src', datauri) )
												.appendTo(_frame.modal.dom.container)*/
					_frame.modal.dom.blured = $('<img/>').attr('src', datauri)
						.appendTo(_frame.modal.dom.bg)
				}, {
						format: 'jpg',
						datatype: 'datauri'
					})
				this.dom.container.addClass('mod-blur-shot')
			}
		}//else{
		//	this.dom.container.removeClass('mod-blur-shot')
		//}

		setTimeout(function () {
			_frame.modal.dom.container.addClass('on ' + settings.classname).data('customclass', settings.classname)
		}, 0)
		_p.initDOM(this.dom.content)

		this.dom.bg.off('click.blank_to_close').on('click.blank_to_close', function () {
			if (settings.blank_to_close) {
				_frame.modal.dom.btn_close.trigger('click')
			}
		})

		if (callback)
			callback(this.dom.content)

		this.dom.content.scrollTop(0)
	},

	hide: function () {
		if (!this.showing)
			return false

		clearTimeout(this.hide_timeout)
		this.hide_timeout = null
		this.dom.container.removeClass('on')
	},
	//hide_timeout,

	reset: function () {
		this.resetContent()

		if (this.dom.blured) {
			if (!parseInt(this.dom.container.css('opacity'))) {
				this.dom.blured.remove()
				this.dom.blured = null
			}
			this.dom.container.removeClass('mod-blur-shot')
		}
	},

	resetContent: function () {
		if (this.content) {
			this.content.detach()
			this.content = null
		}

		this.dom.content.empty()

		this.dom.container.removeClass(this.dom.container.data('customclass'))
		this.dom.container.data('customclass', '')

		this.dom.titlebar.html('')
		this.dom.container.removeClass('hastitle')
	}
}







// 初始化
_frame.modal.init = function () {
	if (this.is_init)
		return true

	this.dom.container = $('<div class="modal" />').on({
		//'transitionend.modal_hide': function(e){
		'transitionend.modal_hide webkitTransitionEnd.modal_hide mozTransitionEnd.modal_hide': function (e) {
			if (_frame.modal.showing
				&& e.currentTarget == e.target
				&& e.originalEvent.propertyName == 'opacity'
				&& _frame.modal.dom.container.css('opacity') == 0
			) {
				_frame.modal.hide_timeout = setTimeout(function () {
					_frame.modal.reset()
					_frame.modal.dom.container.removeClass('show')
					//.off('transitionend.modal_hide')
					_frame.modal.showing = false
					_frame.modal.dom.container.trigger('close').off('close')
				}, 10)
			}
		}
	}).prependTo($body)
	this.dom.box = $('<div/>').appendTo(this.dom.container)
	this.dom.titlebar = $('<header/>').appendTo(this.dom.box)
	this.dom.content = $('<section/>').appendTo(this.dom.box)
	this.dom.btn_close = $('<button class="close" />').html('&times;').on('click', function () { _frame.modal.hide() }).appendTo(this.dom.box)
	this.dom.bg = $('<s/>').appendTo(this.dom.container)

	_hotkey.bind(
		'27',
		function () {
			_frame.modal.hide()
		}
	)


	this.is_init = true
	return true
}

/* Tooltip ----------------------------------------------------------------------------------------------------
Tooltip
	_p.tip.show(HTMLcontent, this[, options])
*/


_p.tip = {
	//is_init:				false,
	//is_showing:				false,
	//dom:					null,
	//el:						null,
	//el_pending:			null,
	pos:					'bottom',
	size_indicator:			8,
	//timeout_fade:			null,

	// 文本滤镜，可任意加入滤镜函数
	filters: [],

	// 隐藏tip延迟时间，毫秒
	countdown_fade:			250,

	// curContent: 			null,			// 当前内容的hashCode

	// 初始化tip
	init_global: function(){
		if(this.is_init)
			return false

		this.dom = $('<div id="tip"/>')
						//.on('transitionend', function(e){
						.on('transitionend webkitTransitionEnd mozTransitionEnd', function(e){
							if( e.currentTarget == e.target && e.originalEvent.propertyName == 'opacity' && _p.tip.dom.css('opacity') == 0 ){
								_p.tip.dom
									.removeClass('show')
									.css({
										'top': 	'',
										'left': ''
									}).attr({
										'data-tip-indicator-pos':		'',
										'data-tip-indicator-offset-x':	'',
										'data-tip-indicator-offset-y':	''
									})
								if( _p.tip.dom_bluredbg )
									_p.tip.dom_bluredbg.css('background-image', '')
							}
						})
						.appendTo($body)

		this.dom_body = $('<div class="body"/>').appendTo(this.dom)

		// 虚化背景
			if( typeof node != 'undefined' ){
				this.dom.addClass('mod-blur-shot')
				this.dom_bluredbg = $('<div/>').appendTo($('<div class="bluredbg"/>').appendTo(this.dom))
			}

		// 注册ESC热键
		//_frame.global.esc_register(function(){
		//	this.hide(true)
		//})

		this.is_init=true
	},

	// 显示
	// cont:	HTML内容
	// el:		触发tip的DOM，通常为鼠标指向位置
	// pos:		tip位置
	show: function( cont, el, pos ){
		// 如果为非指针指向，不执行
		// 无内容则不执行
		//if( $('body').data('preventMouseover') || $body_preventMouseover || !cont )
		if( !cont )
			return false

		clearTimeout(this.timeout_fade)
		this.timeout_fade = null

		//if( el )
		//	el.data('tip-indicator-pos-original', el.attr('data-tip-indicator-pos') || null)

		el = el || 'body';
		this.el = $(el)

		pos = pos || this.pos

		// tip已显示则不运行之后的函数
		//if( this.is_showing )
			//return true

		cont = this.content(cont)

		this.init_global();

		if( !this.dom.hasClass('show') ){
			if( this.dom_bluredbg && typeof node != 'undefined' ){
				node.win.capturePage(function(datauri){
					_p.tip.dom_bluredbg.css(
						'background-image',
						'url('+datauri+')'
					)
				}, {
					format: 'jpg',
					datatype: 'datauri'
				})
			}
			this.dom.addClass('show')
		}

		this.position( cont, pos );

		this.is_showing=true;
	},

	// 计算tip位置
	position:function(cont, pos){
		var hashcode = cont.hashCode()

		if( this.curContent != hashcode ){
			this.dom.css({
					top:	'-1000px',
					left:	'-1000px'
				})
			this.dom_body.html(cont)
			_p.initDOM( this.dom_body )
			/*
			this.dom.css({
					top:	'-1000px',
					left:	'-1000px'
				}).html(cont)
			_p.initDOM( this.dom )
			*/

			this.curContent = hashcode
		}

		var coords = this['pos_'+pos]( this.dom.outerWidth() , this.dom.outerHeight() );
		if(coords){
			this.move(coords.x, coords.y)
		}
	},

	// 隐藏tip
	// is_instant：瞬间隐藏，没有延迟
	hide:function( is_instant ){
		if( !this.is_init || !this.is_showing )
			return false

		//this.el_pending = null

		this.timeout_fade = setTimeout(function(){
			_p.tip.el = null

			_p.tip.dom.removeClass('on')

			_p.tip.is_showing = false
			_p.tip.curContent = null
			
			_p.tip.timeout_fade = null
		}, is_instant ? 0 : this.countdown_fade)
	},
	
	// 格式化tip内容
	content: function( cont, el ){
		el = el || this.el
		//var contOriginal = cont

		// 替换快捷键，如果存在acgdb-hotkey
		//if( cont.indexOf('&HOTKEY') != -1 && el.attr('acgdb-hotkey') ){
		//	var hotkey = el.attr('acgdb-hotkey-text') || _hotkey.format(el.attr('acgdb-hotkey'))
		//	cont = cont.replace('&HOTKEY', hotkey)
		//}

		return cont
	},

	// 移动tip到 x,y
	move: function(x,y){
		this.dom.css({
			top:	y,
			left:	x
		}).addClass('on')
	},

	// 获取小箭头尺寸
	get_indicator_size: function(){
		return this.size_indicator * _g.baseMultiper;
	},

	// tip位置函数
	pos_mouse: function(w,h){
		this.el.unbind('mousemove.tooltip').bind('mousemove.tooltip',function(e){
			var xOff=25
				,yOff=30
				,x=e.pageX+xOff
				,y=e.pageY+20
				,_w=jQuery(window).innerWidth()
				,_h=jQuery(window).innerHeight()
				,_t=jQuery(window).scrollTop()
				,_l=jQuery(window).scrollLeft();
			if(x+w+xOff>_w+_l){
				x=x-w-xOff-20
			}
			if(y+10+h>_h+_t){
				y=_h+_t-h-10
			}
			_p.tip.move(x,y)
		})
	},
	pos_bottom: function(w,h){
		var el		= this.el
			,dom	= this.dom
			,offset	= el.offset()
			,x		= offset.left + ( el.outerWidth() - dom.outerWidth() )/2
			,y		= offset.top + el.outerHeight() + this.get_indicator_size()

		this.dom.attr('data-tip-indicator-pos', 'top' )

		return this.checkpos(x,y,w,h)
	},
	pos_top: function(w,h){
		var el		= this.el
			,dom	= this.dom
			,offset	= el.offset()
			,x		= offset.left + ( el.outerWidth() - dom.outerWidth() )/2
			,y		= offset.top - h - this.get_indicator_size()

		this.dom.attr('data-tip-indicator-pos', 'bottom' )

		return this.checkpos(x,y,w,h)
	},
	pos_left: function(w,h){
		var el		= this.el
			,dom	= this.dom
			,offset	= el.offset()
			,x		= offset.left - w - this.get_indicator_size()
			,y		= offset.top + ( el.outerHeight() - dom.outerHeight() )/2

		this.dom.attr('data-tip-indicator-pos', 'right' )

		return this.checkpos(x,y,w,h)
	},
	pos_right: function(w,h){
		var el		= this.el
			,dom	= this.dom
			,offset	= el.offset()
			,x		= offset.left + el.outerWidth() + this.get_indicator_size()
			,y		= offset.top + ( el.outerHeight() - dom.outerHeight() )/2

		this.dom.attr('data-tip-indicator-pos', 'left' )

		return this.checkpos(x,y,w,h)
	},
	checkpos: function(x,y,w,h){
		var el = this.el
			,dom = this.dom
			,offset = el.offset()
			,nx = x
			,ny = y
			,pos = {x:nx,y:ny}

			,clientWidth = $document.width() || $window.width()

		// 超出X轴右边界
		if ((x + w) > clientWidth ){
			if( w > offset.left ){
				pos = {
					'x': clientWidth - w - 2,
					'y': y
				}
			}else{
				//nx = offset.left - w;
				pos = this['pos_left']( w , h )
			}
		}

		// 超出X轴左边界
		else if (x < 0)
			//nx = 15;
			pos = this['pos_right']( w , h )

		// 超出Y轴下边界
		if ( (y + h) > ($(window).scrollTop() + $(window).height()) )
			//ny = this.pos == 'bottom' ? ( offset.top - this.el.outerHeight() ) : ( $(window).scrollTop() + $(window).height() - h );
			pos = this['pos_top']( w , h )

			/*
		// Node on top of viewport scroll
		else if ((offset.top - 100) < $(window).scrollTop())
			ny = offset.top + this.el.outerHeight();

		// Less than y viewport scrolled
		else if (y < $(window).scrollTop())
			ny = $(window).scrollTop() + 10;

		// Less than y viewport
		else if (y < 0)
			ny = 15;*/

		// 超出Y轴上边界
		else if ( y < $(window).scrollTop() )
			//ny = this.pos == 'bottom' ? ( offset.top - this.el.outerHeight() ) : ( $(window).scrollTop() + $(window).height() - h );
			pos = this['pos_bottom']( w , h )

		dom.attr({
			'data-tip-indicator-offset-x': (x - nx)+'px',
			'data-tip-indicator-offset-y': (y - ny)+'px'
		})
		return pos
	},
	
	trigger_by_el: function(el){
		var cont 		= el.data('tip')

		if( !el.data('tip-filtered') ){
			this.filters.forEach(function(filter){
				cont = filter(cont) || cont
			})
			el.data({
				'tip': 				cont,
				'tip-filtered': 	true
			})
		}

		//this.el_pending = el
		
		//setTimeout(function(){
		//	if( this.el_pending == el )
				this.show(
					cont,
					el,
					el.data('tip-position')
				)
		//}, 100)
	}
};





_p.el.tip = {
	// isInit: false,

	init: function(){
		if( _p.el.tip.isInit )
			return false

		$body.on( 'mouseenter._tip', '[data-tip]', function(){
				if( !$body_preventMouseover )
					_p.tip.trigger_by_el($(this))
			})
			.on( 'mouseleave._tip', '[data-tip]', function(){
				_p.tip.hide()
			})
			.on( 'click._tip', '[data-tip]', function(){
				_p.tip.hide(true)
			})
			.on( 'tipshow._tip', '[data-tip]', function(){
				_p.tip.trigger_by_el($(this))
			})
			.on( 'tiphide._tip', '[data-tip]', function(){
				_p.tip.hide()
			})

		_p.el.tip.isInit = true
	}
}


// 初始化所有 A 标签，使用delegate方式绑定事件



_p.el.links = {
	is_init:	false,
	
	// 点击事件
	click: function(el, e){
		var href = el.attr('href')
		/*
			,is_functional = href
								? (href.substr(0, 1) == '#' || href.substr(0,11).toLowerCase() == 'javascript:')
								: true
								*/

		// 带有 .disabled 的链接点击无效
		if( el.hasClass('disabled') ){
			if( e ){
				e.preventDefault()
				e.stopImmediatePropagation();
				e.stopPropagation()
			}
			return false
		}
	},

	init: function(tar){
		if( !_p.el.links.is_init ){			
			$body.on( 'click.link_delegate', 'a', function(e){
				var el = $(this)
					,target = el.attr('target')
				
				if( typeof node != 'undefined' ){
					if( this.hostname != window.location.hostname )
						target = '_external'
	
					if( target == '_external' || target == '_blank' ){
						node.gui.Shell.openExternal(el.attr('href'));
						e.preventDefault()
						return true
					}
				}

				_p.el.links.click(el, e)
			})//.on( 'click.openExternalLink', 'a[href][target="_external"]', function(e){
			//	node.gui.Shell.openExternal($(this).attr('href'));
			//	e.preventDefault()
			//});

			_p.el.links.is_init = true
		}
	}
}

/*
 */

_p.el.form = {
	init_el: function(el){
		if( el.data('is_init_form_el') )
			return true

		// 注册 CTRL+ENTER 快捷键
		el.find('textarea').on({
				'keyup.ctrl_enter_submit': function(e){
					var key = window.event ? e.keyCode : e.which
						key = key.toString()
					switch( key ){
						case '13': // ENTER
							if( e.metaKey || e.ctrlKey ){
								// CTRL + ENTER
								el.submit()
							}
							break;
					}
				}
			})

		el.data('is_init_form_el', true)
	},
	
	
	
	
	
	
	
	

	init: function(tar, els){
		tar = tar || $body;
		els = els || tar.find('form')

		els.each(function(){
			_p.el.form.init_el($(this))
		})
	}
};











/*
 */
_p.el.flexgrid = {
	create: function(){
		var el = $('<div class="flexgrid"/>')
		_p.el.flexgrid.init_el(el)
		return el
	},

	init_el: function(el){
		if( el.data('is_init_flexgrid') )
			return true

		if( !el.data('append_before_this') ){
			el.data('append_before_this', $('<div class="unit"/>').appendTo(el))
			var i = 0
			while(i < 9){
				$('<div class="unit"/>').appendTo(el)
				i++
			}
		}

		el.data('is_init_flexgrid', true)
	},

	init: function(tar, els){
		tar = tar || $body;
		els = els || tar.find('.flexgrid')

		els.each(function(){
			_p.el.flexgrid.init_el($(this))
		})
	}
};




jQuery.fn.extend({
	appendDOM: function( el_to_append ){
		if( typeof el_to_append == 'function' )
			el_to_append = el_to_append()
			
		if( el_to_append )
			el_to_append.insertBefore( this.data('append_before_this') )
		return this
	}
})

/* Element: Input
*/

/*
_p.el.input = {
	index:	0,

	msg: {
		'text':		'请填写正确的内容',
		'email':	'请填写正确的电子邮件地址',
		'url':		'请填写正确的网址'
	},

	init_el: function(el){
		if( el.data('is_init_input_el') )
			return true
		
		
		// 如果元素没有id，则绑定新的id
		if( !el.attr('id') ){
			el.attr('id', 'input_global_'+_p.el.input.index)
			_p.el.input.index++
		}
		
		
		
		// 根据input类型执行相应函数

		var type	= el.attr('type')

		if( _p.el.input['type_'+type] )
			_p.el.input['type_'+type](el)
		
		// 自定义select样式
			_p.el.input.init_el_select_custom( el )

		// 处理textarea
			_p.el.input.init_el_textarea( el )

		el.data('is_init_input_el', true)
	},
	
	init_el_select_custom: function( el ){
		if( el[0].tagName == 'SELECT' && el.parent().hasClass('select') ){
			var select = $('<font/>').appendTo(el.parent())
			
			el.on({
				'change.custom_select': function(){
					var _el		= $(this)
						,val	= _el.val()
						,option	= _el.find('option[value="'+val+'"]')
					
					if( option.length ){
						val = option.html() || option.val()
					}else{
						if( !_el.find('option').eq(0).attr('value') )
							val = _el.find('option').eq(0).html()
					}
					
					select.html( val )
					
					//_el.blur();
				}
			})
			
			el.trigger('change.custom_select')
		}
	},

	init_el_textarea: function( el ){
		if( el[0].tagName == 'TEXTAREA' ){
			el.on({
				'change.contentcheck': function(){
					var el = $(this)
					if( el.val() ){
						el.addClass('has_content')
					}else{
						el.removeClass('has_content')
					}
				}
			})

			// 字数限制
			if( max = el.attr('max') ){
				max = parseInt(max)
				var tip = $('<em/>',{
					'class': 	'tip-count',
					'html': 	'<em>0</em>/'+max
				}).insertAfter(el)
				el.on({
					'input.checkcount': function(){
						var el = $(this)
							,count = el.val().length
						tip.find('em').text( count )
						if( count > max ){
							tip.addClass('exceed')
						}else{
							tip.removeClass('exceed')
						}
					}
				}).trigger('input.checkcount')
				if( bIE8 ){
					el.on({
						'keydown.checkcount': function(){
							$(this).trigger('input.checkcount')
						}
					})
				}
			}
		}
	},

	init: function(tar, els){
		tar = tar || $body;
		els = els || tar.find('input, select, textarea')

		els.each(function(){
			_p.el.input.init_el($(this))
		})
	},
	
	
	
	
	// 检查内容正确性
	check_valid: function(el){
		var type	= el.attr('type')
			,val	= el.val()
			,valid	= true
			,pattern= el.attr('pattern')
			,typetocheck = [
				'email',
				'url',
				'number'
			]
			,tocheck = type || pattern

		if( !tocheck || $.inArray(tocheck, typetocheck) < 0 )
			return true
		
		return _g.check_valid( val, tocheck )

		//switch( el.attr('type') ){
		//	case 'email':
		//		valid = /^[^\@]+\@[^\@]+\.[a-z]+$/i.test(val)
		//		break;
		//	case 'url':
		//		valid = /^.+\.[a-z]+$/i.test(val)
		//		break;
		//}
		
		// 正则
		//if( pattern ){
		//	pattern = new RegExp(pattern)
		//	valid = pattern.test(val)
		//}

		return valid
	},




	type_text: function(el){
		el.on({
			'change.contentcheck': function(){
				var el = $(this)
				if( el.val() ){
					el.addClass('has_content')
				}else{
					el.removeClass('has_content')
				}
			}
		})
	},




	// fix for TYPE
	type_checkbox: function(el){
		if( bIE8 ){
			// 如果当前为选中状态，添加样式
			if( el.prop('checked') )
				el.addClass('state-checked')
		}

		el.on({
			'change._blur_fix': function(){
				var el		= $(this)

				if( bIE8 ){
					if( el.prop('checked') ){
						el.addClass('state-checked')
							//.prop('checked', false)
					}else{
						el.removeClass('state-checked')
							//.prop('checked', true)
					}
				}

				el.trigger('blur')
			}
		})
	},
	
	
	
	type_date: function( el ){
		// 针对移动浏览器，不显示网站自定的日期选择器
		if( bMobile )
			return false
		
		var name		= el.attr('name') || null
			,id			= el.attr('id') || null
			,id_year	= id ? id + '_year' : null
			,id_month	= id ? id + '_month' : null
			,id_date	= id ? id + '_date' : null
			,outer		= $('<span/>',{
					'class':	'date_picker'
				}).insertBefore(el)

			,months = [
					'一月',
					'二月',
					'三月',
					'四月',
					'五月',
					'六月',
					'七月',
					'八月',
					'九月',
					'十月',
					'十一月',
					'十二月',
				]
			
			,year = $('<input/>',{
						'type':		'text',
						//'max':		4,
						'id':		id_year,
						'class':	'date_year'
					}).on({
						'input.datechange': function(){
							var cur_year	= $(this).val()
								,is_leap	= cur_year ? (( cur_year%4 == 0 && cur_year%100 != 0 ) || cur_year%400 == 0) : false
								,date_num	= [
										31,
										is_leap ? 29 : 28,
										31,
										30,
										31,
										30,
										31,
										31,
										30,
										31,
										30,
										31
									]

							month.val('').trigger('change.custom_select').trigger('change.date')
							//date.val('').empty().trigger('change.custom_select')
						},
						'keyup.datechange': function(){
							if( bIE8 )
								$(this).trigger('input.datechange')
						}
					}).appendTo(outer)
			
			,month = $('<select/>',{
						'class':	'date_month',
						'id':		id_month
					}).appendTo(outer)
			
			,date = $('<select/>',{
						'class':	'date_date',
						'id':		id_date
					}).appendTo(outer)

			
		el.addClass('none')
		
		$('<label/>',{
			'for':		id_year,
			'html':		'年'
		}).insertAfter(year)
		
		month.wrap('<span class="select date_month"/>')
			.on({
				'change.date': function(){
					var cur_year	= year.val()
						,cur_month	= parseInt($(this).val()) - 1
						,is_leap	= cur_year ? (( cur_year%4 == 0 && cur_year%100 != 0 ) || cur_year%400 == 0) : false
						,date_num	= [
								31,
								is_leap ? 29 : 28,
								31,
								30,
								31,
								30,
								31,
								31,
								30,
								31,
								30,
								31
							]
					
					date.val('').trigger('change.custom_select').empty()
					
					for( var i=0; i<date_num[cur_month]; i++ ){
						var num = parseInt(i)
							,num2 = num+1
						if( !num ){
							$('<option/>',{
								'value':	null,
								'html':		'--日--'
							}).appendTo(date)
						}
						$('<option/>',{
							'value':	num2 < 10 ? '0'+num2 : num2,
							'html':		(num+1)+'日'
						}).appendTo(date)
					}
					
					date.trigger('change.custom_select')
				}
			})

		for( var i in months ){
			var num = parseInt(i)
				,num2 = num+1
			
			if( !num ){
				$('<option/>',{
					'value':	null,
					'html':		'--月--'
				}).appendTo(month)
			}
			$('<option/>',{
				'value':	num2 < 10 ? '0'+num2 : num2,
				'html':		months[num]
			}).appendTo(month)
		}

		
		date.wrap('<span class="select date_date"/>')
		$('<option/>',{
			'value':	null,
			'html':		'--日--'
		}).appendTo(date)

		_p.el.input.init(outer)

	},




	type_file: function(el){
		//	<input id="option_dest" type="text" required />
		//	<button type="button" value="Browse...">浏览...</button>
		//	<input id="option_dest_selector" type="file" nwdirectory />
		if( el.prop('nwdirectory') ){
			var parent 	= el.parent()
				,text 	= parent.find('input[type="text"]')
				,button = parent.find('button').on('click', function(){
								el.trigger('click')
							})
			el.on({
				'click.reset': function(){
					el.val('')
				},
				'change.result': function(){
					text.val(el.val())
				}
			})
		}
	}
}
*/
!function(root,factory){"undefined"!=typeof exports?"undefined"!=typeof module&&module.exports&&(exports=module.exports=factory(root,exports)):"function"==typeof define&&define.amd?define(["exports"],function(exports){root.Lockr=factory(root,exports)}):root.Lockr=factory(root,{})}(this,function(root,Lockr){"use strict";return Array.prototype.indexOf||(Array.prototype.indexOf=function(elt){var len=this.length>>>0,from=Number(arguments[1])||0;for(from=from<0?Math.ceil(from):Math.floor(from),from<0&&(from+=len);from<len;from++)if(from in this&&this[from]===elt)return from;return-1}),Lockr.prefix="",Lockr._getPrefixedKey=function(key,options){return options=options||{},options.noPrefix?key:this.prefix+key},Lockr.set=function(key,value,options){var query_key=this._getPrefixedKey(key,options);try{localStorage.setItem(query_key,JSON.stringify({data:value}))}catch(e){console&&console.warn("Lockr didn't successfully save the '{"+key+": "+value+"}' pair, because the localStorage is full.")}},Lockr.get=function(key,missing,options){var value,query_key=this._getPrefixedKey(key,options);try{value=JSON.parse(localStorage.getItem(query_key))}catch(e){value=localStorage[query_key]?{data:localStorage.getItem(query_key)}:null}return value?"object"==typeof value&&"undefined"!=typeof value.data?value.data:void 0:missing},Lockr.sadd=function(key,value,options){var json,query_key=this._getPrefixedKey(key,options),values=Lockr.smembers(key);if(values.indexOf(value)>-1)return null;try{values.push(value),json=JSON.stringify({data:values}),localStorage.setItem(query_key,json)}catch(e){console.log(e),console&&console.warn("Lockr didn't successfully add the "+value+" to "+key+" set, because the localStorage is full.")}},Lockr.smembers=function(key,options){var value,query_key=this._getPrefixedKey(key,options);try{value=JSON.parse(localStorage.getItem(query_key))}catch(e){value=null}return value&&value.data?value.data:[]},Lockr.sismember=function(key,value,options){return Lockr.smembers(key).indexOf(value)>-1},Lockr.keys=function(){var keys=[],allKeys=Object.keys(localStorage);return 0===Lockr.prefix.length?allKeys:(allKeys.forEach(function(key){key.indexOf(Lockr.prefix)!==-1&&keys.push(key.replace(Lockr.prefix,""))}),keys)},Lockr.getAll=function(includeKeys){var keys=Lockr.keys();return includeKeys?keys.reduce(function(accum,key){var tempObj={};return tempObj[key]=Lockr.get(key),accum.push(tempObj),accum},[]):keys.map(function(key){return Lockr.get(key)})},Lockr.srem=function(key,value,options){var json,index,query_key=this._getPrefixedKey(key,options),values=Lockr.smembers(key,value);index=values.indexOf(value),index>-1&&values.splice(index,1),json=JSON.stringify({data:values});try{localStorage.setItem(query_key,json)}catch(e){console&&console.warn("Lockr couldn't remove the "+value+" from the set "+key)}},Lockr.rm=function(key){var queryKey=this._getPrefixedKey(key);localStorage.removeItem(queryKey)},Lockr.flush=function(){Lockr.prefix.length?Lockr.keys().forEach(function(key){localStorage.removeItem(Lockr._getPrefixedKey(key))}):localStorage.clear()},Lockr});
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

/* global window, exports, define */

!function() {
    'use strict'

    var re = {
        not_string: /[^s]/,
        not_bool: /[^t]/,
        not_type: /[^T]/,
        not_primitive: /[^v]/,
        number: /[diefg]/,
        numeric_arg: /[bcdiefguxX]/,
        json: /[j]/,
        not_json: /[^j]/,
        text: /^[^\x25]+/,
        modulo: /^\x25{2}/,
        placeholder: /^\x25(?:([1-9]\d*)\$|\(([^)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijostTuvxX])/,
        key: /^([a-z_][a-z_\d]*)/i,
        key_access: /^\.([a-z_][a-z_\d]*)/i,
        index_access: /^\[(\d+)\]/,
        sign: /^[+-]/
    }

    function sprintf(key) {
        // `arguments` is not an array, but should be fine for this call
        return sprintf_format(sprintf_parse(key), arguments)
    }

    function vsprintf(fmt, argv) {
        return sprintf.apply(null, [fmt].concat(argv || []))
    }

    function sprintf_format(parse_tree, argv) {
        var cursor = 1, tree_length = parse_tree.length, arg, output = '', i, k, ph, pad, pad_character, pad_length, is_positive, sign
        for (i = 0; i < tree_length; i++) {
            if (typeof parse_tree[i] === 'string') {
                output += parse_tree[i]
            }
            else if (typeof parse_tree[i] === 'object') {
                ph = parse_tree[i] // convenience purposes only
                if (ph.keys) { // keyword argument
                    arg = argv[cursor]
                    for (k = 0; k < ph.keys.length; k++) {
                        if (arg == undefined) {
                            throw new Error(sprintf('[sprintf] Cannot access property "%s" of undefined value "%s"', ph.keys[k], ph.keys[k-1]))
                        }
                        arg = arg[ph.keys[k]]
                    }
                }
                else if (ph.param_no) { // positional argument (explicit)
                    arg = argv[ph.param_no]
                }
                else { // positional argument (implicit)
                    arg = argv[cursor++]
                }

                if (re.not_type.test(ph.type) && re.not_primitive.test(ph.type) && arg instanceof Function) {
                    arg = arg()
                }

                if (re.numeric_arg.test(ph.type) && (typeof arg !== 'number' && isNaN(arg))) {
                    throw new TypeError(sprintf('[sprintf] expecting number but found %T', arg))
                }

                if (re.number.test(ph.type)) {
                    is_positive = arg >= 0
                }

                switch (ph.type) {
                    case 'b':
                        arg = parseInt(arg, 10).toString(2)
                        break
                    case 'c':
                        arg = String.fromCharCode(parseInt(arg, 10))
                        break
                    case 'd':
                    case 'i':
                        arg = parseInt(arg, 10)
                        break
                    case 'j':
                        arg = JSON.stringify(arg, null, ph.width ? parseInt(ph.width) : 0)
                        break
                    case 'e':
                        arg = ph.precision ? parseFloat(arg).toExponential(ph.precision) : parseFloat(arg).toExponential()
                        break
                    case 'f':
                        arg = ph.precision ? parseFloat(arg).toFixed(ph.precision) : parseFloat(arg)
                        break
                    case 'g':
                        arg = ph.precision ? String(Number(arg.toPrecision(ph.precision))) : parseFloat(arg)
                        break
                    case 'o':
                        arg = (parseInt(arg, 10) >>> 0).toString(8)
                        break
                    case 's':
                        arg = String(arg)
                        arg = (ph.precision ? arg.substring(0, ph.precision) : arg)
                        break
                    case 't':
                        arg = String(!!arg)
                        arg = (ph.precision ? arg.substring(0, ph.precision) : arg)
                        break
                    case 'T':
                        arg = Object.prototype.toString.call(arg).slice(8, -1).toLowerCase()
                        arg = (ph.precision ? arg.substring(0, ph.precision) : arg)
                        break
                    case 'u':
                        arg = parseInt(arg, 10) >>> 0
                        break
                    case 'v':
                        arg = arg.valueOf()
                        arg = (ph.precision ? arg.substring(0, ph.precision) : arg)
                        break
                    case 'x':
                        arg = (parseInt(arg, 10) >>> 0).toString(16)
                        break
                    case 'X':
                        arg = (parseInt(arg, 10) >>> 0).toString(16).toUpperCase()
                        break
                }
                if (re.json.test(ph.type)) {
                    output += arg
                }
                else {
                    if (re.number.test(ph.type) && (!is_positive || ph.sign)) {
                        sign = is_positive ? '+' : '-'
                        arg = arg.toString().replace(re.sign, '')
                    }
                    else {
                        sign = ''
                    }
                    pad_character = ph.pad_char ? ph.pad_char === '0' ? '0' : ph.pad_char.charAt(1) : ' '
                    pad_length = ph.width - (sign + arg).length
                    pad = ph.width ? (pad_length > 0 ? pad_character.repeat(pad_length) : '') : ''
                    output += ph.align ? sign + arg + pad : (pad_character === '0' ? sign + pad + arg : pad + sign + arg)
                }
            }
        }
        return output
    }

    var sprintf_cache = Object.create(null)

    function sprintf_parse(fmt) {
        if (sprintf_cache[fmt]) {
            return sprintf_cache[fmt]
        }

        var _fmt = fmt, match, parse_tree = [], arg_names = 0
        while (_fmt) {
            if ((match = re.text.exec(_fmt)) !== null) {
                parse_tree.push(match[0])
            }
            else if ((match = re.modulo.exec(_fmt)) !== null) {
                parse_tree.push('%')
            }
            else if ((match = re.placeholder.exec(_fmt)) !== null) {
                if (match[2]) {
                    arg_names |= 1
                    var field_list = [], replacement_field = match[2], field_match = []
                    if ((field_match = re.key.exec(replacement_field)) !== null) {
                        field_list.push(field_match[1])
                        while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '') {
                            if ((field_match = re.key_access.exec(replacement_field)) !== null) {
                                field_list.push(field_match[1])
                            }
                            else if ((field_match = re.index_access.exec(replacement_field)) !== null) {
                                field_list.push(field_match[1])
                            }
                            else {
                                throw new SyntaxError('[sprintf] failed to parse named argument key')
                            }
                        }
                    }
                    else {
                        throw new SyntaxError('[sprintf] failed to parse named argument key')
                    }
                    match[2] = field_list
                }
                else {
                    arg_names |= 2
                }
                if (arg_names === 3) {
                    throw new Error('[sprintf] mixing positional and named placeholders is not (yet) supported')
                }

                parse_tree.push(
                    {
                        placeholder: match[0],
                        param_no:    match[1],
                        keys:        match[2],
                        sign:        match[3],
                        pad_char:    match[4],
                        align:       match[5],
                        width:       match[6],
                        precision:   match[7],
                        type:        match[8]
                    }
                )
            }
            else {
                throw new SyntaxError('[sprintf] unexpected placeholder')
            }
            _fmt = _fmt.substring(match[0].length)
        }
        return sprintf_cache[fmt] = parse_tree
    }

    /**
     * export to either browser or node.js
     */
    /* eslint-disable quote-props */
    if (typeof exports !== 'undefined') {
        exports['sprintf'] = sprintf
        exports['vsprintf'] = vsprintf
    }
    if (typeof window !== 'undefined') {
        window['sprintf'] = sprintf
        window['vsprintf'] = vsprintf

        if (typeof define === 'function' && define['amd']) {
            define(function() {
                return {
                    'sprintf': sprintf,
                    'vsprintf': vsprintf
                }
            })
        }
    }
    /* eslint-enable quote-props */
}(); // eslint-disable-line

/*!
 * PEP v0.5.1 | https://github.com/jquery/PEP
 * Copyright jQuery Foundation and other contributors | http://jquery.org/license
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.PointerEventsPolyfill = factory());
}(this, function () { 'use strict';

  /**
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
  var MOUSE_PROPS = [
    'bubbles',
    'cancelable',
    'view',
    'screenX',
    'screenY',
    'clientX',
    'clientY',
    'ctrlKey',
    'altKey',
    'shiftKey',
    'metaKey',
    'button',
    'relatedTarget',
    'pageX',
    'pageY'
  ];

  var MOUSE_DEFAULTS = [
    false,
    false,
    null,
    0,
    0,
    0,
    0,
    false,
    false,
    false,
    false,
    0,
    null,
    0,
    0
  ];

  function PointerEvent(inType, inDict) {
    inDict = inDict || Object.create(null);

    var e = document.createEvent('Event');
    e.initEvent(inType, inDict.bubbles || false, inDict.cancelable || false);

    // define inherited MouseEvent properties
    // skip bubbles and cancelable since they're set above in initEvent()
    for (var i = 2, p; i < MOUSE_PROPS.length; i++) {
      p = MOUSE_PROPS[i];
      e[p] = inDict[p] || MOUSE_DEFAULTS[i];
    }
    e.buttons = inDict.buttons || 0;

    // Spec requires that pointers without pressure specified use 0.5 for down
    // state and 0 for up state.
    var pressure = 0;

    if (inDict.pressure !== undefined && e.buttons) {
      pressure = inDict.pressure;
    } else {
      pressure = e.buttons ? 0.5 : 0;
    }

    // add x/y properties aliased to clientX/Y
    e.x = e.clientX;
    e.y = e.clientY;

    // define the properties of the PointerEvent interface
    e.pointerId = inDict.pointerId || 0;
    e.width = inDict.width || 1;
    e.height = inDict.height || 1;
    e.pressure = pressure;
    e.tiltX = inDict.tiltX || 0;
    e.tiltY = inDict.tiltY || 0;
    e.twist = inDict.twist || 0;
    e.tangentialPressure = inDict.tangentialPressure || 0;
    e.pointerType = inDict.pointerType || '';
    e.hwTimestamp = inDict.hwTimestamp || 0;
    e.isPrimary = inDict.isPrimary || false;
    e.detail = 0;
    return e;
  }

  /**
   * This module implements a map of pointer states
   */
  var USE_MAP = window.Map && window.Map.prototype.forEach;
  var PointerMap = USE_MAP ? Map : SparseArrayMap;

  function SparseArrayMap() {
    this.array = [];
    this.size = 0;
  }

  SparseArrayMap.prototype = {
    set: function(k, v) {
      if (v === undefined) {
        return this.delete(k);
      }
      if (!this.has(k)) {
        this.size++;
      }
      this.array[k] = v;
    },
    has: function(k) {
      return this.array[k] !== undefined;
    },
    delete: function(k) {
      if (this.has(k)) {
        delete this.array[k];
        this.size--;
      }
    },
    get: function(k) {
      return this.array[k];
    },
    clear: function() {
      this.array.length = 0;
      this.size = 0;
    },

    // return value, key, map
    forEach: function(callback, thisArg) {
      return this.array.forEach(function(v, k) {
        callback.call(thisArg, v, k, this);
      }, this);
    }
  };

  var CLONE_PROPS = [

    // MouseEvent
    'bubbles',
    'cancelable',
    'view',
    'detail',
    'screenX',
    'screenY',
    'clientX',
    'clientY',
    'ctrlKey',
    'altKey',
    'shiftKey',
    'metaKey',
    'button',
    'relatedTarget',

    // DOM Level 3
    'buttons',

    // PointerEvent
    'pointerId',
    'width',
    'height',
    'pressure',
    'tiltX',
    'tiltY',
    'pointerType',
    'hwTimestamp',
    'isPrimary',

    // event instance
    'type',
    'target',
    'currentTarget',
    'which',
    'pageX',
    'pageY',
    'timeStamp'
  ];

  var CLONE_DEFAULTS = [

    // MouseEvent
    false,
    false,
    null,
    null,
    0,
    0,
    0,
    0,
    false,
    false,
    false,
    false,
    0,
    null,

    // DOM Level 3
    0,

    // PointerEvent
    0,
    0,
    0,
    0,
    0,
    0,
    '',
    0,
    false,

    // event instance
    '',
    null,
    null,
    0,
    0,
    0,
    0
  ];

  var BOUNDARY_EVENTS = {
    'pointerover': 1,
    'pointerout': 1,
    'pointerenter': 1,
    'pointerleave': 1
  };

  var HAS_SVG_INSTANCE = (typeof SVGElementInstance !== 'undefined');

  /**
   * This module is for normalizing events. Mouse and Touch events will be
   * collected here, and fire PointerEvents that have the same semantics, no
   * matter the source.
   * Events fired:
   *   - pointerdown: a pointing is added
   *   - pointerup: a pointer is removed
   *   - pointermove: a pointer is moved
   *   - pointerover: a pointer crosses into an element
   *   - pointerout: a pointer leaves an element
   *   - pointercancel: a pointer will no longer generate events
   */
  var dispatcher = {
    pointermap: new PointerMap(),
    eventMap: Object.create(null),
    captureInfo: Object.create(null),

    // Scope objects for native events.
    // This exists for ease of testing.
    eventSources: Object.create(null),
    eventSourceList: [],
    /**
     * Add a new event source that will generate pointer events.
     *
     * `inSource` must contain an array of event names named `events`, and
     * functions with the names specified in the `events` array.
     * @param {string} name A name for the event source
     * @param {Object} source A new source of platform events.
     */
    registerSource: function(name, source) {
      var s = source;
      var newEvents = s.events;
      if (newEvents) {
        newEvents.forEach(function(e) {
          if (s[e]) {
            this.eventMap[e] = s[e].bind(s);
          }
        }, this);
        this.eventSources[name] = s;
        this.eventSourceList.push(s);
      }
    },
    register: function(element) {
      var l = this.eventSourceList.length;
      for (var i = 0, es; (i < l) && (es = this.eventSourceList[i]); i++) {

        // call eventsource register
        es.register.call(es, element);
      }
    },
    unregister: function(element) {
      var l = this.eventSourceList.length;
      for (var i = 0, es; (i < l) && (es = this.eventSourceList[i]); i++) {

        // call eventsource register
        es.unregister.call(es, element);
      }
    },
    contains: /*scope.external.contains || */function(container, contained) {
      try {
        return container.contains(contained);
      } catch (ex) {

        // most likely: https://bugzilla.mozilla.org/show_bug.cgi?id=208427
        return false;
      }
    },

    // EVENTS
    down: function(inEvent) {
      inEvent.bubbles = true;
      this.fireEvent('pointerdown', inEvent);
    },
    move: function(inEvent) {
      inEvent.bubbles = true;
      this.fireEvent('pointermove', inEvent);
    },
    up: function(inEvent) {
      inEvent.bubbles = true;
      this.fireEvent('pointerup', inEvent);
    },
    enter: function(inEvent) {
      inEvent.bubbles = false;
      this.fireEvent('pointerenter', inEvent);
    },
    leave: function(inEvent) {
      inEvent.bubbles = false;
      this.fireEvent('pointerleave', inEvent);
    },
    over: function(inEvent) {
      inEvent.bubbles = true;
      this.fireEvent('pointerover', inEvent);
    },
    out: function(inEvent) {
      inEvent.bubbles = true;
      this.fireEvent('pointerout', inEvent);
    },
    cancel: function(inEvent) {
      inEvent.bubbles = true;
      this.fireEvent('pointercancel', inEvent);
    },
    leaveOut: function(event) {
      this.out(event);
      this.propagate(event, this.leave, false);
    },
    enterOver: function(event) {
      this.over(event);
      this.propagate(event, this.enter, true);
    },

    // LISTENER LOGIC
    eventHandler: function(inEvent) {

      // This is used to prevent multiple dispatch of pointerevents from
      // platform events. This can happen when two elements in different scopes
      // are set up to create pointer events, which is relevant to Shadow DOM.
      if (inEvent._handledByPE) {
        return;
      }
      var type = inEvent.type;
      var fn = this.eventMap && this.eventMap[type];
      if (fn) {
        fn(inEvent);
      }
      inEvent._handledByPE = true;
    },

    // set up event listeners
    listen: function(target, events) {
      events.forEach(function(e) {
        this.addEvent(target, e);
      }, this);
    },

    // remove event listeners
    unlisten: function(target, events) {
      events.forEach(function(e) {
        this.removeEvent(target, e);
      }, this);
    },
    addEvent: /*scope.external.addEvent || */function(target, eventName) {
      target.addEventListener(eventName, this.boundHandler);
    },
    removeEvent: /*scope.external.removeEvent || */function(target, eventName) {
      target.removeEventListener(eventName, this.boundHandler);
    },

    // EVENT CREATION AND TRACKING
    /**
     * Creates a new Event of type `inType`, based on the information in
     * `inEvent`.
     *
     * @param {string} inType A string representing the type of event to create
     * @param {Event} inEvent A platform event with a target
     * @return {Event} A PointerEvent of type `inType`
     */
    makeEvent: function(inType, inEvent) {

      // relatedTarget must be null if pointer is captured
      if (this.captureInfo[inEvent.pointerId]) {
        inEvent.relatedTarget = null;
      }
      var e = new PointerEvent(inType, inEvent);
      if (inEvent.preventDefault) {
        e.preventDefault = inEvent.preventDefault;
      }
      e._target = e._target || inEvent.target;
      return e;
    },

    // make and dispatch an event in one call
    fireEvent: function(inType, inEvent) {
      var e = this.makeEvent(inType, inEvent);
      return this.dispatchEvent(e);
    },
    /**
     * Returns a snapshot of inEvent, with writable properties.
     *
     * @param {Event} inEvent An event that contains properties to copy.
     * @return {Object} An object containing shallow copies of `inEvent`'s
     *    properties.
     */
    cloneEvent: function(inEvent) {
      var eventCopy = Object.create(null);
      var p;
      for (var i = 0; i < CLONE_PROPS.length; i++) {
        p = CLONE_PROPS[i];
        eventCopy[p] = inEvent[p] || CLONE_DEFAULTS[i];

        // Work around SVGInstanceElement shadow tree
        // Return the <use> element that is represented by the instance for Safari, Chrome, IE.
        // This is the behavior implemented by Firefox.
        if (HAS_SVG_INSTANCE && (p === 'target' || p === 'relatedTarget')) {
          if (eventCopy[p] instanceof SVGElementInstance) {
            eventCopy[p] = eventCopy[p].correspondingUseElement;
          }
        }
      }

      // keep the semantics of preventDefault
      if (inEvent.preventDefault) {
        eventCopy.preventDefault = function() {
          inEvent.preventDefault();
        };
      }
      return eventCopy;
    },
    getTarget: function(inEvent) {
      var capture = this.captureInfo[inEvent.pointerId];
      if (!capture) {
        return inEvent._target;
      }
      if (inEvent._target === capture || !(inEvent.type in BOUNDARY_EVENTS)) {
        return capture;
      }
    },
    propagate: function(event, fn, propagateDown) {
      var target = event.target;
      var targets = [];

      // Order of conditions due to document.contains() missing in IE.
      while (target != null && target !== document && !target.contains(event.relatedTarget)) {
        targets.push(target);
        target = target.parentNode;

        // Touch: Do not propagate if node is detached.
        if (!target) {
          return;
        }
      }
      if (propagateDown) {
        targets.reverse();
      }
      targets.forEach(function(target) {
        event.target = target;
        fn.call(this, event);
      }, this);
    },
    setCapture: function(inPointerId, inTarget, skipDispatch) {
      if (this.captureInfo[inPointerId]) {
        this.releaseCapture(inPointerId, skipDispatch);
      }

      this.captureInfo[inPointerId] = inTarget;
      this.implicitRelease = this.releaseCapture.bind(this, inPointerId, skipDispatch);
      document.addEventListener('pointerup', this.implicitRelease);
      document.addEventListener('pointercancel', this.implicitRelease);

      var e = new PointerEvent('gotpointercapture', { bubbles: true });
      e.pointerId = inPointerId;
      e._target = inTarget;

      if (!skipDispatch) {
        this.asyncDispatchEvent(e);
      }
    },
    releaseCapture: function(inPointerId, skipDispatch) {
      var t = this.captureInfo[inPointerId];
      if (!t) {
        return;
      }

      this.captureInfo[inPointerId] = undefined;
      document.removeEventListener('pointerup', this.implicitRelease);
      document.removeEventListener('pointercancel', this.implicitRelease);

      var e = new PointerEvent('lostpointercapture', { bubbles: true });
      e.pointerId = inPointerId;
      e._target = t;

      if (!skipDispatch) {
        this.asyncDispatchEvent(e);
      }
    },
    /**
     * Dispatches the event to its target.
     *
     * @param {Event} inEvent The event to be dispatched.
     * @return {Boolean} True if an event handler returns true, false otherwise.
     */
    dispatchEvent: /*scope.external.dispatchEvent || */function(inEvent) {
      var t = this.getTarget(inEvent);
      if (t) {
        return t.dispatchEvent(inEvent);
      }
    },
    asyncDispatchEvent: function(inEvent) {
      requestAnimationFrame(this.dispatchEvent.bind(this, inEvent));
    }
  };
  dispatcher.boundHandler = dispatcher.eventHandler.bind(dispatcher);

  var targeting = {
    shadow: function(inEl) {
      if (inEl) {
        return inEl.shadowRoot || inEl.webkitShadowRoot;
      }
    },
    canTarget: function(shadow) {
      return shadow && Boolean(shadow.elementFromPoint);
    },
    targetingShadow: function(inEl) {
      var s = this.shadow(inEl);
      if (this.canTarget(s)) {
        return s;
      }
    },
    olderShadow: function(shadow) {
      var os = shadow.olderShadowRoot;
      if (!os) {
        var se = shadow.querySelector('shadow');
        if (se) {
          os = se.olderShadowRoot;
        }
      }
      return os;
    },
    allShadows: function(element) {
      var shadows = [];
      var s = this.shadow(element);
      while (s) {
        shadows.push(s);
        s = this.olderShadow(s);
      }
      return shadows;
    },
    searchRoot: function(inRoot, x, y) {
      if (inRoot) {
        var t = inRoot.elementFromPoint(x, y);
        var st, sr;

        // is element a shadow host?
        sr = this.targetingShadow(t);
        while (sr) {

          // find the the element inside the shadow root
          st = sr.elementFromPoint(x, y);
          if (!st) {

            // check for older shadows
            sr = this.olderShadow(sr);
          } else {

            // shadowed element may contain a shadow root
            var ssr = this.targetingShadow(st);
            return this.searchRoot(ssr, x, y) || st;
          }
        }

        // light dom element is the target
        return t;
      }
    },
    owner: function(element) {
      var s = element;

      // walk up until you hit the shadow root or document
      while (s.parentNode) {
        s = s.parentNode;
      }

      // the owner element is expected to be a Document or ShadowRoot
      if (s.nodeType !== Node.DOCUMENT_NODE && s.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
        s = document;
      }
      return s;
    },
    findTarget: function(inEvent) {
      var x = inEvent.clientX;
      var y = inEvent.clientY;

      // if the listener is in the shadow root, it is much faster to start there
      var s = this.owner(inEvent.target);

      // if x, y is not in this root, fall back to document search
      if (!s.elementFromPoint(x, y)) {
        s = document;
      }
      return this.searchRoot(s, x, y);
    }
  };

  var forEach = Array.prototype.forEach.call.bind(Array.prototype.forEach);
  var map = Array.prototype.map.call.bind(Array.prototype.map);
  var toArray = Array.prototype.slice.call.bind(Array.prototype.slice);
  var filter = Array.prototype.filter.call.bind(Array.prototype.filter);
  var MO = window.MutationObserver || window.WebKitMutationObserver;
  var SELECTOR = '[touch-action]';
  var OBSERVER_INIT = {
    subtree: true,
    childList: true,
    attributes: true,
    attributeOldValue: true,
    attributeFilter: ['touch-action']
  };

  function Installer(add, remove, changed, binder) {
    this.addCallback = add.bind(binder);
    this.removeCallback = remove.bind(binder);
    this.changedCallback = changed.bind(binder);
    if (MO) {
      this.observer = new MO(this.mutationWatcher.bind(this));
    }
  }

  Installer.prototype = {
    watchSubtree: function(target) {

      // Only watch scopes that can target find, as these are top-level.
      // Otherwise we can see duplicate additions and removals that add noise.
      //
      // TODO(dfreedman): For some instances with ShadowDOMPolyfill, we can see
      // a removal without an insertion when a node is redistributed among
      // shadows. Since it all ends up correct in the document, watching only
      // the document will yield the correct mutations to watch.
      if (this.observer && targeting.canTarget(target)) {
        this.observer.observe(target, OBSERVER_INIT);
      }
    },
    enableOnSubtree: function(target) {
      this.watchSubtree(target);
      if (target === document && document.readyState !== 'complete') {
        this.installOnLoad();
      } else {
        this.installNewSubtree(target);
      }
    },
    installNewSubtree: function(target) {
      forEach(this.findElements(target), this.addElement, this);
    },
    findElements: function(target) {
      if (target.querySelectorAll) {
        return target.querySelectorAll(SELECTOR);
      }
      return [];
    },
    removeElement: function(el) {
      this.removeCallback(el);
    },
    addElement: function(el) {
      this.addCallback(el);
    },
    elementChanged: function(el, oldValue) {
      this.changedCallback(el, oldValue);
    },
    concatLists: function(accum, list) {
      return accum.concat(toArray(list));
    },

    // register all touch-action = none nodes on document load
    installOnLoad: function() {
      document.addEventListener('readystatechange', function() {
        if (document.readyState === 'complete') {
          this.installNewSubtree(document);
        }
      }.bind(this));
    },
    isElement: function(n) {
      return n.nodeType === Node.ELEMENT_NODE;
    },
    flattenMutationTree: function(inNodes) {

      // find children with touch-action
      var tree = map(inNodes, this.findElements, this);

      // make sure the added nodes are accounted for
      tree.push(filter(inNodes, this.isElement));

      // flatten the list
      return tree.reduce(this.concatLists, []);
    },
    mutationWatcher: function(mutations) {
      mutations.forEach(this.mutationHandler, this);
    },
    mutationHandler: function(m) {
      if (m.type === 'childList') {
        var added = this.flattenMutationTree(m.addedNodes);
        added.forEach(this.addElement, this);
        var removed = this.flattenMutationTree(m.removedNodes);
        removed.forEach(this.removeElement, this);
      } else if (m.type === 'attributes') {
        this.elementChanged(m.target, m.oldValue);
      }
    }
  };

  function shadowSelector(s) {
    return 'body /shadow-deep/ ' + s;
  }
  function rule(v) {
    return '{ -ms-touch-action: ' + v + '; touch-action: ' + v + '; }';
  }
  var attrib2css = [
    { selector: '[touch-action="none"]', value: 'none' },
    { selector: '[touch-action="auto"]', value: 'auto' },
    { selector: '[touch-action~="pan-x"]', value: 'pan-x' },
    { selector: '[touch-action~="pan-y"]', value: 'pan-y' },
    { selector: '[touch-action~="pan-up"]', value: 'pan-up' },
    { selector: '[touch-action~="pan-down"]', value: 'pan-down' },
    { selector: '[touch-action~="pan-left"]', value: 'pan-left' },
    { selector: '[touch-action~="pan-right"]', value: 'pan-right' }
  ];
  var styles = '';

  // only install stylesheet if the browser has touch action support
  var hasNativePE = window.PointerEvent || window.MSPointerEvent;

  // only add shadow selectors if shadowdom is supported
  var hasShadowRoot = !window.ShadowDOMPolyfill && document.head.createShadowRoot;

  function applyAttributeStyles() {
    if (hasNativePE) {
      attrib2css.forEach(function(r) {
        styles += r.selector + rule(r.value) + '\n';
        if (hasShadowRoot) {
          styles += shadowSelector(r.selector) + rule(r.value) + '\n';
        }
      });

      var el = document.createElement('style');
      el.textContent = styles;
      document.head.appendChild(el);
    }
  }

  var pointermap = dispatcher.pointermap;

  // radius around touchend that swallows mouse events
  var DEDUP_DIST = 25;

  // left, middle, right, back, forward
  var BUTTON_TO_BUTTONS = [1, 4, 2, 8, 16];

  var HAS_BUTTONS = false;
  try {
    HAS_BUTTONS = new MouseEvent('test', { buttons: 1 }).buttons === 1;
  } catch (e) {}

  // handler block for native mouse events
  var mouseEvents = {
    POINTER_ID: 1,
    POINTER_TYPE: 'mouse',
    events: [
      'mousedown',
      'webkitmouseforcechanged',
      'mousemove',
      'mouseup',
      'mouseover',
      'mouseout'
    ],
    register: function(target) {
      dispatcher.listen(target, this.events);
    },
    unregister: function(target) {
      dispatcher.unlisten(target, this.events);
    },
    lastTouches: [],

    // collide with the global mouse listener
    isEventSimulatedFromTouch: function(inEvent) {
      var lts = this.lastTouches;
      var x = inEvent.clientX;
      var y = inEvent.clientY;
      for (var i = 0, l = lts.length, t; i < l && (t = lts[i]); i++) {

        // simulated mouse events will be swallowed near a primary touchend
        var dx = Math.abs(x - t.x);
        var dy = Math.abs(y - t.y);
        if (dx <= DEDUP_DIST && dy <= DEDUP_DIST) {
          return true;
        }
      }
    },
    prepareEvent: function(inEvent) {
      var e = dispatcher.cloneEvent(inEvent);

      // forward mouse preventDefault
      var pd = e.preventDefault;
      e.preventDefault = function() {
        inEvent.preventDefault();
        pd();
      };
      e.pointerId = this.POINTER_ID;
      e.isPrimary = true;
      e.pointerType = this.POINTER_TYPE;
      if ('webkitForce' in inEvent) {
        e.pressure = inEvent.webkitForce - MouseEvent.WEBKIT_FORCE_AT_MOUSE_DOWN;
      }
      return e;
    },
    prepareButtonsForMove: function(e, inEvent) {
      var p = pointermap.get(this.POINTER_ID);

      // Update buttons state after possible out-of-document mouseup.
      if (inEvent.which === 0 || !p) {
        e.buttons = 0;
      } else {
        e.buttons = p.buttons;
      }
      inEvent.buttons = e.buttons;
    },
    mousedown: function(inEvent) {
      if (!this.isEventSimulatedFromTouch(inEvent)) {
        var p = pointermap.get(this.POINTER_ID);
        var e = this.prepareEvent(inEvent);
        if (!HAS_BUTTONS) {
          e.buttons = BUTTON_TO_BUTTONS[e.button];
          if (p) { e.buttons |= p.buttons; }
          inEvent.buttons = e.buttons;
        }
        pointermap.set(this.POINTER_ID, inEvent);
        if (!p || p.buttons === 0) {
          dispatcher.down(e);
        } else {
          dispatcher.move(e);
        }
      }
    },

    // This is called when the user force presses without moving x/y
    webkitmouseforcechanged: function(inEvent) {
      this.mousemove(inEvent);
    },
    mousemove: function(inEvent) {
      if (!this.isEventSimulatedFromTouch(inEvent)) {
        var e = this.prepareEvent(inEvent);
        if (!HAS_BUTTONS) { this.prepareButtonsForMove(e, inEvent); }
        e.button = -1;
        pointermap.set(this.POINTER_ID, inEvent);
        dispatcher.move(e);
      }
    },
    mouseup: function(inEvent) {
      if (!this.isEventSimulatedFromTouch(inEvent)) {
        var p = pointermap.get(this.POINTER_ID);
        var e = this.prepareEvent(inEvent);
        if (!HAS_BUTTONS) {
          var up = BUTTON_TO_BUTTONS[e.button];

          // Produces wrong state of buttons in Browsers without `buttons` support
          // when a mouse button that was pressed outside the document is released
          // inside and other buttons are still pressed down.
          e.buttons = p ? p.buttons & ~up : 0;
          inEvent.buttons = e.buttons;
        }
        pointermap.set(this.POINTER_ID, inEvent);

        // Support: Firefox <=44 only
        // FF Ubuntu includes the lifted button in the `buttons` property on
        // mouseup.
        // https://bugzilla.mozilla.org/show_bug.cgi?id=1223366
        e.buttons &= ~BUTTON_TO_BUTTONS[e.button];
        if (e.buttons === 0) {
          dispatcher.up(e);
        } else {
          dispatcher.move(e);
        }
      }
    },
    mouseover: function(inEvent) {
      if (!this.isEventSimulatedFromTouch(inEvent)) {
        var e = this.prepareEvent(inEvent);
        if (!HAS_BUTTONS) { this.prepareButtonsForMove(e, inEvent); }
        e.button = -1;
        pointermap.set(this.POINTER_ID, inEvent);
        dispatcher.enterOver(e);
      }
    },
    mouseout: function(inEvent) {
      if (!this.isEventSimulatedFromTouch(inEvent)) {
        var e = this.prepareEvent(inEvent);
        if (!HAS_BUTTONS) { this.prepareButtonsForMove(e, inEvent); }
        e.button = -1;
        dispatcher.leaveOut(e);
      }
    },
    cancel: function(inEvent) {
      var e = this.prepareEvent(inEvent);
      dispatcher.cancel(e);
      this.deactivateMouse();
    },
    deactivateMouse: function() {
      pointermap.delete(this.POINTER_ID);
    }
  };

  var captureInfo = dispatcher.captureInfo;
  var findTarget = targeting.findTarget.bind(targeting);
  var allShadows = targeting.allShadows.bind(targeting);
  var pointermap$1 = dispatcher.pointermap;

  // this should be long enough to ignore compat mouse events made by touch
  var DEDUP_TIMEOUT = 2500;
  var ATTRIB = 'touch-action';
  var INSTALLER;

  // bitmask for _scrollType
  var UP = 1;
  var DOWN = 2;
  var LEFT = 4;
  var RIGHT = 8;
  var AUTO = UP | DOWN | LEFT | RIGHT;

  // handler block for native touch events
  var touchEvents = {
    events: [
      'touchstart',
      'touchmove',
      'touchforcechange',
      'touchend',
      'touchcancel'
    ],
    register: function(target) {
      INSTALLER.enableOnSubtree(target);
    },
    unregister: function() {

      // TODO(dfreedman): is it worth it to disconnect the MO?
    },
    elementAdded: function(el) {
      var a = el.getAttribute(ATTRIB);
      var st = this.touchActionToScrollType(a);
      if (typeof st === "number") {
        el._scrollType = st;
        dispatcher.listen(el, this.events);

        // set touch-action on shadows as well
        allShadows(el).forEach(function(s) {
          s._scrollType = st;
          dispatcher.listen(s, this.events);
        }, this);
      }
    },
    elementRemoved: function(el) {

      // In some cases, an element is removed before a touchend.
      // When this is the case, we should wait for the touchend before unlistening,
      // because we still want pointer events to bubble up after removing from DOM.
      if (pointermap$1.size > 0) {
        var evts = this.events;
        el.addEventListener('touchend', function() {
          el._scrollType = undefined;
          dispatcher.unlisten(el, evts);
        });
      } else {
        el._scrollType = undefined;
        dispatcher.unlisten(el, this.events);
      }

      // remove touch-action from shadow
      allShadows(el).forEach(function(s) {
        s._scrollType = undefined;
        dispatcher.unlisten(s, this.events);
      }, this);
    },
    elementChanged: function(el, oldValue) {
      var a = el.getAttribute(ATTRIB);
      var st = this.touchActionToScrollType(a);
      var oldSt = this.touchActionToScrollType(oldValue);

      // simply update scrollType if listeners are already established
      if (typeof st === "number" && typeof oldSt === "number") {
        el._scrollType = st;
        allShadows(el).forEach(function(s) {
          s._scrollType = st;
        }, this);
      } else if (typeof oldSt === "number") {
        this.elementRemoved(el);
      } else if (typeof st === "number") {
        this.elementAdded(el);
      }
    },
    scrollTypes: {
      UP: function(s) {
        return s.includes('pan-y') || s.includes('pan-up') ? UP : 0;
      },
      DOWN: function(s) {
        return s.includes('pan-y') || s.includes('pan-down') ? DOWN : 0;
      },
      LEFT: function(s) {
        return s.includes('pan-x') || s.includes('pan-left') ? LEFT : 0;
      },
      RIGHT: function(s) {
        return s.includes('pan-x') || s.includes('pan-right') ? RIGHT : 0;
      }
    },
    touchActionToScrollType: function(touchAction) {
      if (!touchAction) {
        return;
      }

      if (touchAction === "auto") {
        return AUTO;
      }

      if (touchAction === "none") {
        return 0;
      }

      var s = touchAction.split(' ');
      var st = this.scrollTypes;

      // construct a bitmask of allowed scroll directions
      return st.UP(s) | st.DOWN(s) | st.LEFT(s) | st.RIGHT(s);
    },
    POINTER_TYPE: 'touch',
    firstTouch: null,
    isPrimaryTouch: function(inTouch) {
      return this.firstTouch === inTouch.identifier;
    },
    setPrimaryTouch: function(inTouch) {

      // set primary touch if there no pointers, or the only pointer is the mouse
      if (pointermap$1.size === 0 || (pointermap$1.size === 1 && pointermap$1.has(1))) {
        this.firstTouch = inTouch.identifier;
        this.firstXY = { X: inTouch.clientX, Y: inTouch.clientY };
        this.scrolling = false;
      }
    },
    removePrimaryPointer: function(inPointer) {
      if (inPointer.isPrimary) {
        this.firstTouch = null;
        this.firstXY = null;
      }
    },
    typeToButtons: function(type) {
      var ret = 0;
      if (type === 'touchstart' || type === 'touchmove' || type === 'touchforcechange') {
        ret = 1;
      }
      return ret;
    },
    touchToPointer: function(inTouch) {
      var cte = this.currentTouchEvent;
      var e = dispatcher.cloneEvent(inTouch);

      // We reserve pointerId 1 for Mouse.
      // Touch identifiers can start at 0.
      // Add 2 to the touch identifier for compatibility.
      var id = e.pointerId = inTouch.identifier + 2;
      e.target = captureInfo[id] || findTarget(e);
      e.bubbles = true;
      e.cancelable = true;
      e.button = 0;
      e.buttons = this.typeToButtons(cte.type);
      e.width = (inTouch.radiusX || inTouch.webkitRadiusX || 0) * 2;
      e.height = (inTouch.radiusY || inTouch.webkitRadiusY || 0) * 2;
      e.pressure = inTouch.force !== undefined ?
        inTouch.force :
        inTouch.webkitForce !== undefined ?
          inTouch.webkitForce : undefined;
      e.isPrimary = this.isPrimaryTouch(inTouch);
      if (inTouch.altitudeAngle) {
        const tan = Math.tan(inTouch.altitudeAngle);
        const radToDeg = 180 / Math.PI;
        e.tiltX = Math.atan(Math.cos(inTouch.azimuthAngle) / tan) * radToDeg;
        e.tiltY = Math.atan(Math.sin(inTouch.azimuthAngle) / tan) * radToDeg;
      } else {
        e.tiltX = 0;
        e.tiltY = 0;
      }
      if (inTouch.touchType === 'stylus') {
        e.pointerType = 'pen';
      } else {
        e.pointerType = this.POINTER_TYPE;
      }

      // forward modifier keys
      e.altKey = cte.altKey;
      e.ctrlKey = cte.ctrlKey;
      e.metaKey = cte.metaKey;
      e.shiftKey = cte.shiftKey;

      // forward touch preventDefaults
      var self = this;
      e.preventDefault = function() {
        self.scrolling = false;
        self.firstXY = null;
        cte.preventDefault();
      };
      return e;
    },
    processTouches: function(inEvent, inFunction) {
      var tl = inEvent.changedTouches;
      this.currentTouchEvent = inEvent;
      for (var i = 0, t; i < tl.length; i++) {
        t = tl[i];
        inFunction.call(this, this.touchToPointer(t));
      }
    },

    // For single axis scrollers, determines whether the element should emit
    // pointer events or behave as a scroller
    shouldScroll: function(inEvent) {
      if (this.firstXY) {
        var ret;
        var st = inEvent.currentTarget._scrollType;
        if (st === 0) {

          // this element is a `touch-action: none`, should never scroll
          ret = false;
        } else if (st === AUTO) {

          // this element is a `touch-action: auto`, should always scroll
          ret = true;
        } else {
          var t = inEvent.changedTouches[0];

          var dy = t.clientY - this.firstXY.Y;
          var dya = Math.abs(dy);
          var dx = t.clientX - this.firstXY.X;
          var dxa = Math.abs(dx);

          var up = st & UP;
          var down = st & DOWN;
          var left = st & LEFT;
          var right = st & RIGHT;

          if (left && right) {

            // should scroll on the x axis
            ret = dxa > dya;
          } else if (left) {

            // should scroll left
            ret = dxa > dya && dx > 0;
          } else if (right) {

            // should scroll right
            ret = dxa > dya && dx < 0;
          }

          if (!ret) {
            if (up && down) {

              // should scroll on the y axis
              ret = dxa < dya;
            } else if (up) {

              // should scroll up
              ret = dxa < dya && dy > 0;
            } else if (down) {

              // should scroll down
              ret = dxa < dya && dy < 0;
            }
          }

        }
        this.firstXY = null;
        return ret;
      }
    },
    findTouch: function(inTL, inId) {
      for (var i = 0, l = inTL.length, t; i < l && (t = inTL[i]); i++) {
        if (t.identifier === inId) {
          return true;
        }
      }
    },

    // In some instances, a touchstart can happen without a touchend. This
    // leaves the pointermap in a broken state.
    // Therefore, on every touchstart, we remove the touches that did not fire a
    // touchend event.
    // To keep state globally consistent, we fire a
    // pointercancel for this "abandoned" touch
    vacuumTouches: function(inEvent) {
      var tl = inEvent.touches;

      // pointermap.size should be < tl.length here, as the touchstart has not
      // been processed yet.
      if (pointermap$1.size >= tl.length) {
        var d = [];
        pointermap$1.forEach(function(value, key) {

          // Never remove pointerId == 1, which is mouse.
          // Touch identifiers are 2 smaller than their pointerId, which is the
          // index in pointermap.
          if (key !== 1 && !this.findTouch(tl, key - 2)) {
            var p = value.out;
            d.push(p);
          }
        }, this);
        d.forEach(this.cancelOut, this);
      }
    },
    touchstart: function(inEvent) {
      this.vacuumTouches(inEvent);
      this.setPrimaryTouch(inEvent.changedTouches[0]);
      this.dedupSynthMouse(inEvent);
      if (!this.scrolling) {
        this.processTouches(inEvent, this.overDown);
      }
    },
    overDown: function(inPointer) {
      pointermap$1.set(inPointer.pointerId, {
        target: inPointer.target,
        out: inPointer,
        outTarget: inPointer.target
      });
      dispatcher.enterOver(inPointer);
      dispatcher.down(inPointer);
    },

    // Called when pressure or tilt changes without the x/y changing
    touchforcechange: function(inEvent) {
      this.touchmove(inEvent);
    },
    touchmove: function(inEvent) {
      if (!this.scrolling) {
        if (this.shouldScroll(inEvent)) {
          this.scrolling = true;
          this.touchcancel(inEvent);
        } else {
          inEvent.preventDefault();
          this.processTouches(inEvent, this.moveOverOut);
        }
      }
    },
    moveOverOut: function(inPointer) {
      var event = inPointer;
      var pointer = pointermap$1.get(event.pointerId);

      // a finger drifted off the screen, ignore it
      if (!pointer) {
        return;
      }
      var outEvent = pointer.out;
      var outTarget = pointer.outTarget;
      dispatcher.move(event);
      if (outEvent && outTarget !== event.target) {
        outEvent.relatedTarget = event.target;
        event.relatedTarget = outTarget;

        // recover from retargeting by shadow
        outEvent.target = outTarget;
        if (event.target) {
          dispatcher.leaveOut(outEvent);
          dispatcher.enterOver(event);
        } else {

          // clean up case when finger leaves the screen
          event.target = outTarget;
          event.relatedTarget = null;
          this.cancelOut(event);
        }
      }
      pointer.out = event;
      pointer.outTarget = event.target;
    },
    touchend: function(inEvent) {
      this.dedupSynthMouse(inEvent);
      this.processTouches(inEvent, this.upOut);
    },
    upOut: function(inPointer) {
      if (!this.scrolling) {
        dispatcher.up(inPointer);
        dispatcher.leaveOut(inPointer);
      }
      this.cleanUpPointer(inPointer);
    },
    touchcancel: function(inEvent) {
      this.processTouches(inEvent, this.cancelOut);
    },
    cancelOut: function(inPointer) {
      dispatcher.cancel(inPointer);
      dispatcher.leaveOut(inPointer);
      this.cleanUpPointer(inPointer);
    },
    cleanUpPointer: function(inPointer) {
      pointermap$1.delete(inPointer.pointerId);
      this.removePrimaryPointer(inPointer);
    },

    // prevent synth mouse events from creating pointer events
    dedupSynthMouse: function(inEvent) {
      var lts = mouseEvents.lastTouches;
      var t = inEvent.changedTouches[0];

      // only the primary finger will synth mouse events
      if (this.isPrimaryTouch(t)) {

        // remember x/y of last touch
        var lt = { x: t.clientX, y: t.clientY };
        lts.push(lt);
        var fn = (function(lts, lt) {
          var i = lts.indexOf(lt);
          if (i > -1) {
            lts.splice(i, 1);
          }
        }).bind(null, lts, lt);
        setTimeout(fn, DEDUP_TIMEOUT);
      }
    }
  };

  INSTALLER = new Installer(touchEvents.elementAdded, touchEvents.elementRemoved,
    touchEvents.elementChanged, touchEvents);

  var pointermap$2 = dispatcher.pointermap;
  var HAS_BITMAP_TYPE = window.MSPointerEvent &&
    typeof window.MSPointerEvent.MSPOINTER_TYPE_MOUSE === 'number';
  var msEvents = {
    events: [
      'MSPointerDown',
      'MSPointerMove',
      'MSPointerUp',
      'MSPointerOut',
      'MSPointerOver',
      'MSPointerCancel',
      'MSGotPointerCapture',
      'MSLostPointerCapture'
    ],
    register: function(target) {
      dispatcher.listen(target, this.events);
    },
    unregister: function(target) {
      dispatcher.unlisten(target, this.events);
    },
    POINTER_TYPES: [
      '',
      'unavailable',
      'touch',
      'pen',
      'mouse'
    ],
    prepareEvent: function(inEvent) {
      var e = inEvent;
      if (HAS_BITMAP_TYPE) {
        e = dispatcher.cloneEvent(inEvent);
        e.pointerType = this.POINTER_TYPES[inEvent.pointerType];
      }
      return e;
    },
    cleanup: function(id) {
      pointermap$2.delete(id);
    },
    MSPointerDown: function(inEvent) {
      pointermap$2.set(inEvent.pointerId, inEvent);
      var e = this.prepareEvent(inEvent);
      dispatcher.down(e);
    },
    MSPointerMove: function(inEvent) {
      var e = this.prepareEvent(inEvent);
      dispatcher.move(e);
    },
    MSPointerUp: function(inEvent) {
      var e = this.prepareEvent(inEvent);
      dispatcher.up(e);
      this.cleanup(inEvent.pointerId);
    },
    MSPointerOut: function(inEvent) {
      var e = this.prepareEvent(inEvent);
      dispatcher.leaveOut(e);
    },
    MSPointerOver: function(inEvent) {
      var e = this.prepareEvent(inEvent);
      dispatcher.enterOver(e);
    },
    MSPointerCancel: function(inEvent) {
      var e = this.prepareEvent(inEvent);
      dispatcher.cancel(e);
      this.cleanup(inEvent.pointerId);
    },
    MSLostPointerCapture: function(inEvent) {
      var e = dispatcher.makeEvent('lostpointercapture', inEvent);
      dispatcher.dispatchEvent(e);
    },
    MSGotPointerCapture: function(inEvent) {
      var e = dispatcher.makeEvent('gotpointercapture', inEvent);
      dispatcher.dispatchEvent(e);
    }
  };

  function applyPolyfill() {

    // only activate if this platform does not have pointer events
    if (!window.PointerEvent) {
      window.PointerEvent = PointerEvent;

      if (window.navigator.msPointerEnabled) {
        var tp = window.navigator.msMaxTouchPoints;
        Object.defineProperty(window.navigator, 'maxTouchPoints', {
          value: tp,
          enumerable: true
        });
        dispatcher.registerSource('ms', msEvents);
      } else {
        Object.defineProperty(window.navigator, 'maxTouchPoints', {
          value: 0,
          enumerable: true
        });
        dispatcher.registerSource('mouse', mouseEvents);
        if (window.ontouchstart !== undefined) {
          dispatcher.registerSource('touch', touchEvents);
        }
      }

      dispatcher.register(document);
    }
  }

  var n = window.navigator;
  var s;
  var r;
  var h;
  function assertActive(id) {
    if (!dispatcher.pointermap.has(id)) {
      var error = new Error('NotFoundError');
      error.name = 'NotFoundError';
      throw error;
    }
  }
  function assertConnected(elem) {
    var parent = elem.parentNode;
    while (parent && parent !== elem.ownerDocument) {
      parent = parent.parentNode;
    }
    if (!parent) {
      var error = new Error('InvalidStateError');
      error.name = 'InvalidStateError';
      throw error;
    }
  }
  function inActiveButtonState(id) {
    var p = dispatcher.pointermap.get(id);
    return p.buttons !== 0;
  }
  if (n.msPointerEnabled) {
    s = function(pointerId) {
      assertActive(pointerId);
      assertConnected(this);
      if (inActiveButtonState(pointerId)) {
        dispatcher.setCapture(pointerId, this, true);
        this.msSetPointerCapture(pointerId);
      }
    };
    r = function(pointerId) {
      assertActive(pointerId);
      dispatcher.releaseCapture(pointerId, true);
      this.msReleasePointerCapture(pointerId);
    };
  } else {
    s = function setPointerCapture(pointerId) {
      assertActive(pointerId);
      assertConnected(this);
      if (inActiveButtonState(pointerId)) {
        dispatcher.setCapture(pointerId, this);
      }
    };
    r = function releasePointerCapture(pointerId) {
      assertActive(pointerId);
      dispatcher.releaseCapture(pointerId);
    };
  }
  h = function hasPointerCapture(pointerId) {
    return !!dispatcher.captureInfo[pointerId];
  };

  function applyPolyfill$1() {
    if (window.Element && !Element.prototype.setPointerCapture) {
      Object.defineProperties(Element.prototype, {
        'setPointerCapture': {
          value: s
        },
        'releasePointerCapture': {
          value: r
        },
        'hasPointerCapture': {
          value: h
        }
      });
    }
  }

  applyAttributeStyles();
  applyPolyfill();
  applyPolyfill$1();

  var pointerevents = {
    dispatcher: dispatcher,
    Installer: Installer,
    PointerEvent: PointerEvent,
    PointerMap: PointerMap,
    targetFinding: targeting
  };

  return pointerevents;

}));
/*!
    localForage -- Offline Storage, Improved
    Version 1.7.4
    https://localforage.github.io/localForage
    (c) 2013-2017 Mozilla, Apache License 2.0
*/
!function(a){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=a();else if("function"==typeof define&&define.amd)define([],a);else{var b;b="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,b.localforage=a()}}(function(){return function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c||a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){"use strict";function d(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function e(){try{if("undefined"!=typeof indexedDB)return indexedDB;if("undefined"!=typeof webkitIndexedDB)return webkitIndexedDB;if("undefined"!=typeof mozIndexedDB)return mozIndexedDB;if("undefined"!=typeof OIndexedDB)return OIndexedDB;if("undefined"!=typeof msIndexedDB)return msIndexedDB}catch(a){return}}function f(){try{if(!ua||!ua.open)return!1;var a="undefined"!=typeof openDatabase&&/(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent)&&!/BlackBerry/.test(navigator.platform),b="function"==typeof fetch&&-1!==fetch.toString().indexOf("[native code");return(!a||b)&&"undefined"!=typeof indexedDB&&"undefined"!=typeof IDBKeyRange}catch(a){return!1}}function g(a,b){a=a||[],b=b||{};try{return new Blob(a,b)}catch(f){if("TypeError"!==f.name)throw f;for(var c="undefined"!=typeof BlobBuilder?BlobBuilder:"undefined"!=typeof MSBlobBuilder?MSBlobBuilder:"undefined"!=typeof MozBlobBuilder?MozBlobBuilder:WebKitBlobBuilder,d=new c,e=0;e<a.length;e+=1)d.append(a[e]);return d.getBlob(b.type)}}function h(a,b){b&&a.then(function(a){b(null,a)},function(a){b(a)})}function i(a,b,c){"function"==typeof b&&a.then(b),"function"==typeof c&&a.catch(c)}function j(a){return"string"!=typeof a&&(console.warn(a+" used as a key, but it is not a string."),a=String(a)),a}function k(){if(arguments.length&&"function"==typeof arguments[arguments.length-1])return arguments[arguments.length-1]}function l(a){for(var b=a.length,c=new ArrayBuffer(b),d=new Uint8Array(c),e=0;e<b;e++)d[e]=a.charCodeAt(e);return c}function m(a){return new va(function(b){var c=a.transaction(wa,Ba),d=g([""]);c.objectStore(wa).put(d,"key"),c.onabort=function(a){a.preventDefault(),a.stopPropagation(),b(!1)},c.oncomplete=function(){var a=navigator.userAgent.match(/Chrome\/(\d+)/),c=navigator.userAgent.match(/Edge\//);b(c||!a||parseInt(a[1],10)>=43)}}).catch(function(){return!1})}function n(a){return"boolean"==typeof xa?va.resolve(xa):m(a).then(function(a){return xa=a})}function o(a){var b=ya[a.name],c={};c.promise=new va(function(a,b){c.resolve=a,c.reject=b}),b.deferredOperations.push(c),b.dbReady?b.dbReady=b.dbReady.then(function(){return c.promise}):b.dbReady=c.promise}function p(a){var b=ya[a.name],c=b.deferredOperations.pop();if(c)return c.resolve(),c.promise}function q(a,b){var c=ya[a.name],d=c.deferredOperations.pop();if(d)return d.reject(b),d.promise}function r(a,b){return new va(function(c,d){if(ya[a.name]=ya[a.name]||B(),a.db){if(!b)return c(a.db);o(a),a.db.close()}var e=[a.name];b&&e.push(a.version);var f=ua.open.apply(ua,e);b&&(f.onupgradeneeded=function(b){var c=f.result;try{c.createObjectStore(a.storeName),b.oldVersion<=1&&c.createObjectStore(wa)}catch(c){if("ConstraintError"!==c.name)throw c;console.warn('The database "'+a.name+'" has been upgraded from version '+b.oldVersion+" to version "+b.newVersion+', but the storage "'+a.storeName+'" already exists.')}}),f.onerror=function(a){a.preventDefault(),d(f.error)},f.onsuccess=function(){c(f.result),p(a)}})}function s(a){return r(a,!1)}function t(a){return r(a,!0)}function u(a,b){if(!a.db)return!0;var c=!a.db.objectStoreNames.contains(a.storeName),d=a.version<a.db.version,e=a.version>a.db.version;if(d&&(a.version!==b&&console.warn('The database "'+a.name+"\" can't be downgraded from version "+a.db.version+" to version "+a.version+"."),a.version=a.db.version),e||c){if(c){var f=a.db.version+1;f>a.version&&(a.version=f)}return!0}return!1}function v(a){return new va(function(b,c){var d=new FileReader;d.onerror=c,d.onloadend=function(c){var d=btoa(c.target.result||"");b({__local_forage_encoded_blob:!0,data:d,type:a.type})},d.readAsBinaryString(a)})}function w(a){return g([l(atob(a.data))],{type:a.type})}function x(a){return a&&a.__local_forage_encoded_blob}function y(a){var b=this,c=b._initReady().then(function(){var a=ya[b._dbInfo.name];if(a&&a.dbReady)return a.dbReady});return i(c,a,a),c}function z(a){o(a);for(var b=ya[a.name],c=b.forages,d=0;d<c.length;d++){var e=c[d];e._dbInfo.db&&(e._dbInfo.db.close(),e._dbInfo.db=null)}return a.db=null,s(a).then(function(b){return a.db=b,u(a)?t(a):b}).then(function(d){a.db=b.db=d;for(var e=0;e<c.length;e++)c[e]._dbInfo.db=d}).catch(function(b){throw q(a,b),b})}function A(a,b,c,d){void 0===d&&(d=1);try{var e=a.db.transaction(a.storeName,b);c(null,e)}catch(e){if(d>0&&(!a.db||"InvalidStateError"===e.name||"NotFoundError"===e.name))return va.resolve().then(function(){if(!a.db||"NotFoundError"===e.name&&!a.db.objectStoreNames.contains(a.storeName)&&a.version<=a.db.version)return a.db&&(a.version=a.db.version+1),t(a)}).then(function(){return z(a).then(function(){A(a,b,c,d-1)})}).catch(c);c(e)}}function B(){return{forages:[],db:null,dbReady:null,deferredOperations:[]}}function C(a){function b(){return va.resolve()}var c=this,d={db:null};if(a)for(var e in a)d[e]=a[e];var f=ya[d.name];f||(f=B(),ya[d.name]=f),f.forages.push(c),c._initReady||(c._initReady=c.ready,c.ready=y);for(var g=[],h=0;h<f.forages.length;h++){var i=f.forages[h];i!==c&&g.push(i._initReady().catch(b))}var j=f.forages.slice(0);return va.all(g).then(function(){return d.db=f.db,s(d)}).then(function(a){return d.db=a,u(d,c._defaultConfig.version)?t(d):a}).then(function(a){d.db=f.db=a,c._dbInfo=d;for(var b=0;b<j.length;b++){var e=j[b];e!==c&&(e._dbInfo.db=d.db,e._dbInfo.version=d.version)}})}function D(a,b){var c=this;a=j(a);var d=new va(function(b,d){c.ready().then(function(){A(c._dbInfo,Aa,function(e,f){if(e)return d(e);try{var g=f.objectStore(c._dbInfo.storeName),h=g.get(a);h.onsuccess=function(){var a=h.result;void 0===a&&(a=null),x(a)&&(a=w(a)),b(a)},h.onerror=function(){d(h.error)}}catch(a){d(a)}})}).catch(d)});return h(d,b),d}function E(a,b){var c=this,d=new va(function(b,d){c.ready().then(function(){A(c._dbInfo,Aa,function(e,f){if(e)return d(e);try{var g=f.objectStore(c._dbInfo.storeName),h=g.openCursor(),i=1;h.onsuccess=function(){var c=h.result;if(c){var d=c.value;x(d)&&(d=w(d));var e=a(d,c.key,i++);void 0!==e?b(e):c.continue()}else b()},h.onerror=function(){d(h.error)}}catch(a){d(a)}})}).catch(d)});return h(d,b),d}function F(a,b,c){var d=this;a=j(a);var e=new va(function(c,e){var f;d.ready().then(function(){return f=d._dbInfo,"[object Blob]"===za.call(b)?n(f.db).then(function(a){return a?b:v(b)}):b}).then(function(b){A(d._dbInfo,Ba,function(f,g){if(f)return e(f);try{var h=g.objectStore(d._dbInfo.storeName);null===b&&(b=void 0);var i=h.put(b,a);g.oncomplete=function(){void 0===b&&(b=null),c(b)},g.onabort=g.onerror=function(){var a=i.error?i.error:i.transaction.error;e(a)}}catch(a){e(a)}})}).catch(e)});return h(e,c),e}function G(a,b){var c=this;a=j(a);var d=new va(function(b,d){c.ready().then(function(){A(c._dbInfo,Ba,function(e,f){if(e)return d(e);try{var g=f.objectStore(c._dbInfo.storeName),h=g.delete(a);f.oncomplete=function(){b()},f.onerror=function(){d(h.error)},f.onabort=function(){var a=h.error?h.error:h.transaction.error;d(a)}}catch(a){d(a)}})}).catch(d)});return h(d,b),d}function H(a){var b=this,c=new va(function(a,c){b.ready().then(function(){A(b._dbInfo,Ba,function(d,e){if(d)return c(d);try{var f=e.objectStore(b._dbInfo.storeName),g=f.clear();e.oncomplete=function(){a()},e.onabort=e.onerror=function(){var a=g.error?g.error:g.transaction.error;c(a)}}catch(a){c(a)}})}).catch(c)});return h(c,a),c}function I(a){var b=this,c=new va(function(a,c){b.ready().then(function(){A(b._dbInfo,Aa,function(d,e){if(d)return c(d);try{var f=e.objectStore(b._dbInfo.storeName),g=f.count();g.onsuccess=function(){a(g.result)},g.onerror=function(){c(g.error)}}catch(a){c(a)}})}).catch(c)});return h(c,a),c}function J(a,b){var c=this,d=new va(function(b,d){if(a<0)return void b(null);c.ready().then(function(){A(c._dbInfo,Aa,function(e,f){if(e)return d(e);try{var g=f.objectStore(c._dbInfo.storeName),h=!1,i=g.openKeyCursor();i.onsuccess=function(){var c=i.result;if(!c)return void b(null);0===a?b(c.key):h?b(c.key):(h=!0,c.advance(a))},i.onerror=function(){d(i.error)}}catch(a){d(a)}})}).catch(d)});return h(d,b),d}function K(a){var b=this,c=new va(function(a,c){b.ready().then(function(){A(b._dbInfo,Aa,function(d,e){if(d)return c(d);try{var f=e.objectStore(b._dbInfo.storeName),g=f.openKeyCursor(),h=[];g.onsuccess=function(){var b=g.result;if(!b)return void a(h);h.push(b.key),b.continue()},g.onerror=function(){c(g.error)}}catch(a){c(a)}})}).catch(c)});return h(c,a),c}function L(a,b){b=k.apply(this,arguments);var c=this.config();a="function"!=typeof a&&a||{},a.name||(a.name=a.name||c.name,a.storeName=a.storeName||c.storeName);var d,e=this;if(a.name){var f=a.name===c.name&&e._dbInfo.db,g=f?va.resolve(e._dbInfo.db):s(a).then(function(b){var c=ya[a.name],d=c.forages;c.db=b;for(var e=0;e<d.length;e++)d[e]._dbInfo.db=b;return b});d=a.storeName?g.then(function(b){if(b.objectStoreNames.contains(a.storeName)){var c=b.version+1;o(a);var d=ya[a.name],e=d.forages;b.close();for(var f=0;f<e.length;f++){var g=e[f];g._dbInfo.db=null,g._dbInfo.version=c}return new va(function(b,d){var e=ua.open(a.name,c);e.onerror=function(a){e.result.close(),d(a)},e.onupgradeneeded=function(){e.result.deleteObjectStore(a.storeName)},e.onsuccess=function(){var a=e.result;a.close(),b(a)}}).then(function(a){d.db=a;for(var b=0;b<e.length;b++){var c=e[b];c._dbInfo.db=a,p(c._dbInfo)}}).catch(function(b){throw(q(a,b)||va.resolve()).catch(function(){}),b})}}):g.then(function(b){o(a);var c=ya[a.name],d=c.forages;b.close();for(var e=0;e<d.length;e++){d[e]._dbInfo.db=null}return new va(function(b,c){var d=ua.deleteDatabase(a.name);d.onerror=d.onblocked=function(a){var b=d.result;b&&b.close(),c(a)},d.onsuccess=function(){var a=d.result;a&&a.close(),b(a)}}).then(function(a){c.db=a;for(var b=0;b<d.length;b++)p(d[b]._dbInfo)}).catch(function(b){throw(q(a,b)||va.resolve()).catch(function(){}),b})})}else d=va.reject("Invalid arguments");return h(d,b),d}function M(){return"function"==typeof openDatabase}function N(a){var b,c,d,e,f,g=.75*a.length,h=a.length,i=0;"="===a[a.length-1]&&(g--,"="===a[a.length-2]&&g--);var j=new ArrayBuffer(g),k=new Uint8Array(j);for(b=0;b<h;b+=4)c=Da.indexOf(a[b]),d=Da.indexOf(a[b+1]),e=Da.indexOf(a[b+2]),f=Da.indexOf(a[b+3]),k[i++]=c<<2|d>>4,k[i++]=(15&d)<<4|e>>2,k[i++]=(3&e)<<6|63&f;return j}function O(a){var b,c=new Uint8Array(a),d="";for(b=0;b<c.length;b+=3)d+=Da[c[b]>>2],d+=Da[(3&c[b])<<4|c[b+1]>>4],d+=Da[(15&c[b+1])<<2|c[b+2]>>6],d+=Da[63&c[b+2]];return c.length%3==2?d=d.substring(0,d.length-1)+"=":c.length%3==1&&(d=d.substring(0,d.length-2)+"=="),d}function P(a,b){var c="";if(a&&(c=Ua.call(a)),a&&("[object ArrayBuffer]"===c||a.buffer&&"[object ArrayBuffer]"===Ua.call(a.buffer))){var d,e=Ga;a instanceof ArrayBuffer?(d=a,e+=Ia):(d=a.buffer,"[object Int8Array]"===c?e+=Ka:"[object Uint8Array]"===c?e+=La:"[object Uint8ClampedArray]"===c?e+=Ma:"[object Int16Array]"===c?e+=Na:"[object Uint16Array]"===c?e+=Pa:"[object Int32Array]"===c?e+=Oa:"[object Uint32Array]"===c?e+=Qa:"[object Float32Array]"===c?e+=Ra:"[object Float64Array]"===c?e+=Sa:b(new Error("Failed to get type for BinaryArray"))),b(e+O(d))}else if("[object Blob]"===c){var f=new FileReader;f.onload=function(){var c=Ea+a.type+"~"+O(this.result);b(Ga+Ja+c)},f.readAsArrayBuffer(a)}else try{b(JSON.stringify(a))}catch(c){console.error("Couldn't convert value into a JSON string: ",a),b(null,c)}}function Q(a){if(a.substring(0,Ha)!==Ga)return JSON.parse(a);var b,c=a.substring(Ta),d=a.substring(Ha,Ta);if(d===Ja&&Fa.test(c)){var e=c.match(Fa);b=e[1],c=c.substring(e[0].length)}var f=N(c);switch(d){case Ia:return f;case Ja:return g([f],{type:b});case Ka:return new Int8Array(f);case La:return new Uint8Array(f);case Ma:return new Uint8ClampedArray(f);case Na:return new Int16Array(f);case Pa:return new Uint16Array(f);case Oa:return new Int32Array(f);case Qa:return new Uint32Array(f);case Ra:return new Float32Array(f);case Sa:return new Float64Array(f);default:throw new Error("Unkown type: "+d)}}function R(a,b,c,d){a.executeSql("CREATE TABLE IF NOT EXISTS "+b.storeName+" (id INTEGER PRIMARY KEY, key unique, value)",[],c,d)}function S(a){var b=this,c={db:null};if(a)for(var d in a)c[d]="string"!=typeof a[d]?a[d].toString():a[d];var e=new va(function(a,d){try{c.db=openDatabase(c.name,String(c.version),c.description,c.size)}catch(a){return d(a)}c.db.transaction(function(e){R(e,c,function(){b._dbInfo=c,a()},function(a,b){d(b)})},d)});return c.serializer=Va,e}function T(a,b,c,d,e,f){a.executeSql(c,d,e,function(a,g){g.code===g.SYNTAX_ERR?a.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name = ?",[b.storeName],function(a,h){h.rows.length?f(a,g):R(a,b,function(){a.executeSql(c,d,e,f)},f)},f):f(a,g)},f)}function U(a,b){var c=this;a=j(a);var d=new va(function(b,d){c.ready().then(function(){var e=c._dbInfo;e.db.transaction(function(c){T(c,e,"SELECT * FROM "+e.storeName+" WHERE key = ? LIMIT 1",[a],function(a,c){var d=c.rows.length?c.rows.item(0).value:null;d&&(d=e.serializer.deserialize(d)),b(d)},function(a,b){d(b)})})}).catch(d)});return h(d,b),d}function V(a,b){var c=this,d=new va(function(b,d){c.ready().then(function(){var e=c._dbInfo;e.db.transaction(function(c){T(c,e,"SELECT * FROM "+e.storeName,[],function(c,d){for(var f=d.rows,g=f.length,h=0;h<g;h++){var i=f.item(h),j=i.value;if(j&&(j=e.serializer.deserialize(j)),void 0!==(j=a(j,i.key,h+1)))return void b(j)}b()},function(a,b){d(b)})})}).catch(d)});return h(d,b),d}function W(a,b,c,d){var e=this;a=j(a);var f=new va(function(f,g){e.ready().then(function(){void 0===b&&(b=null);var h=b,i=e._dbInfo;i.serializer.serialize(b,function(b,j){j?g(j):i.db.transaction(function(c){T(c,i,"INSERT OR REPLACE INTO "+i.storeName+" (key, value) VALUES (?, ?)",[a,b],function(){f(h)},function(a,b){g(b)})},function(b){if(b.code===b.QUOTA_ERR){if(d>0)return void f(W.apply(e,[a,h,c,d-1]));g(b)}})})}).catch(g)});return h(f,c),f}function X(a,b,c){return W.apply(this,[a,b,c,1])}function Y(a,b){var c=this;a=j(a);var d=new va(function(b,d){c.ready().then(function(){var e=c._dbInfo;e.db.transaction(function(c){T(c,e,"DELETE FROM "+e.storeName+" WHERE key = ?",[a],function(){b()},function(a,b){d(b)})})}).catch(d)});return h(d,b),d}function Z(a){var b=this,c=new va(function(a,c){b.ready().then(function(){var d=b._dbInfo;d.db.transaction(function(b){T(b,d,"DELETE FROM "+d.storeName,[],function(){a()},function(a,b){c(b)})})}).catch(c)});return h(c,a),c}function $(a){var b=this,c=new va(function(a,c){b.ready().then(function(){var d=b._dbInfo;d.db.transaction(function(b){T(b,d,"SELECT COUNT(key) as c FROM "+d.storeName,[],function(b,c){var d=c.rows.item(0).c;a(d)},function(a,b){c(b)})})}).catch(c)});return h(c,a),c}function _(a,b){var c=this,d=new va(function(b,d){c.ready().then(function(){var e=c._dbInfo;e.db.transaction(function(c){T(c,e,"SELECT key FROM "+e.storeName+" WHERE id = ? LIMIT 1",[a+1],function(a,c){var d=c.rows.length?c.rows.item(0).key:null;b(d)},function(a,b){d(b)})})}).catch(d)});return h(d,b),d}function aa(a){var b=this,c=new va(function(a,c){b.ready().then(function(){var d=b._dbInfo;d.db.transaction(function(b){T(b,d,"SELECT key FROM "+d.storeName,[],function(b,c){for(var d=[],e=0;e<c.rows.length;e++)d.push(c.rows.item(e).key);a(d)},function(a,b){c(b)})})}).catch(c)});return h(c,a),c}function ba(a){return new va(function(b,c){a.transaction(function(d){d.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'",[],function(c,d){for(var e=[],f=0;f<d.rows.length;f++)e.push(d.rows.item(f).name);b({db:a,storeNames:e})},function(a,b){c(b)})},function(a){c(a)})})}function ca(a,b){b=k.apply(this,arguments);var c=this.config();a="function"!=typeof a&&a||{},a.name||(a.name=a.name||c.name,a.storeName=a.storeName||c.storeName);var d,e=this;return d=a.name?new va(function(b){var d;d=a.name===c.name?e._dbInfo.db:openDatabase(a.name,"","",0),b(a.storeName?{db:d,storeNames:[a.storeName]}:ba(d))}).then(function(a){return new va(function(b,c){a.db.transaction(function(d){function e(a){return new va(function(b,c){d.executeSql("DROP TABLE IF EXISTS "+a,[],function(){b()},function(a,b){c(b)})})}for(var f=[],g=0,h=a.storeNames.length;g<h;g++)f.push(e(a.storeNames[g]));va.all(f).then(function(){b()}).catch(function(a){c(a)})},function(a){c(a)})})}):va.reject("Invalid arguments"),h(d,b),d}function da(){try{return"undefined"!=typeof localStorage&&"setItem"in localStorage&&!!localStorage.setItem}catch(a){return!1}}function ea(a,b){var c=a.name+"/";return a.storeName!==b.storeName&&(c+=a.storeName+"/"),c}function fa(){var a="_localforage_support_test";try{return localStorage.setItem(a,!0),localStorage.removeItem(a),!1}catch(a){return!0}}function ga(){return!fa()||localStorage.length>0}function ha(a){var b=this,c={};if(a)for(var d in a)c[d]=a[d];return c.keyPrefix=ea(a,b._defaultConfig),ga()?(b._dbInfo=c,c.serializer=Va,va.resolve()):va.reject()}function ia(a){var b=this,c=b.ready().then(function(){for(var a=b._dbInfo.keyPrefix,c=localStorage.length-1;c>=0;c--){var d=localStorage.key(c);0===d.indexOf(a)&&localStorage.removeItem(d)}});return h(c,a),c}function ja(a,b){var c=this;a=j(a);var d=c.ready().then(function(){var b=c._dbInfo,d=localStorage.getItem(b.keyPrefix+a);return d&&(d=b.serializer.deserialize(d)),d});return h(d,b),d}function ka(a,b){var c=this,d=c.ready().then(function(){for(var b=c._dbInfo,d=b.keyPrefix,e=d.length,f=localStorage.length,g=1,h=0;h<f;h++){var i=localStorage.key(h);if(0===i.indexOf(d)){var j=localStorage.getItem(i);if(j&&(j=b.serializer.deserialize(j)),void 0!==(j=a(j,i.substring(e),g++)))return j}}});return h(d,b),d}function la(a,b){var c=this,d=c.ready().then(function(){var b,d=c._dbInfo;try{b=localStorage.key(a)}catch(a){b=null}return b&&(b=b.substring(d.keyPrefix.length)),b});return h(d,b),d}function ma(a){var b=this,c=b.ready().then(function(){for(var a=b._dbInfo,c=localStorage.length,d=[],e=0;e<c;e++){var f=localStorage.key(e);0===f.indexOf(a.keyPrefix)&&d.push(f.substring(a.keyPrefix.length))}return d});return h(c,a),c}function na(a){var b=this,c=b.keys().then(function(a){return a.length});return h(c,a),c}function oa(a,b){var c=this;a=j(a);var d=c.ready().then(function(){var b=c._dbInfo;localStorage.removeItem(b.keyPrefix+a)});return h(d,b),d}function pa(a,b,c){var d=this;a=j(a);var e=d.ready().then(function(){void 0===b&&(b=null);var c=b;return new va(function(e,f){var g=d._dbInfo;g.serializer.serialize(b,function(b,d){if(d)f(d);else try{localStorage.setItem(g.keyPrefix+a,b),e(c)}catch(a){"QuotaExceededError"!==a.name&&"NS_ERROR_DOM_QUOTA_REACHED"!==a.name||f(a),f(a)}})})});return h(e,c),e}function qa(a,b){if(b=k.apply(this,arguments),a="function"!=typeof a&&a||{},!a.name){var c=this.config();a.name=a.name||c.name,a.storeName=a.storeName||c.storeName}var d,e=this;return d=a.name?new va(function(b){b(a.storeName?ea(a,e._defaultConfig):a.name+"/")}).then(function(a){for(var b=localStorage.length-1;b>=0;b--){var c=localStorage.key(b);0===c.indexOf(a)&&localStorage.removeItem(c)}}):va.reject("Invalid arguments"),h(d,b),d}function ra(a,b){a[b]=function(){var c=arguments;return a.ready().then(function(){return a[b].apply(a,c)})}}function sa(){for(var a=1;a<arguments.length;a++){var b=arguments[a];if(b)for(var c in b)b.hasOwnProperty(c)&&($a(b[c])?arguments[0][c]=b[c].slice():arguments[0][c]=b[c])}return arguments[0]}var ta="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},ua=e();"undefined"==typeof Promise&&a("lie/polyfill");var va=Promise,wa="local-forage-detect-blob-support",xa=void 0,ya={},za=Object.prototype.toString,Aa="readonly",Ba="readwrite",Ca={_driver:"asyncStorage",_initStorage:C,_support:f(),iterate:E,getItem:D,setItem:F,removeItem:G,clear:H,length:I,key:J,keys:K,dropInstance:L},Da="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",Ea="~~local_forage_type~",Fa=/^~~local_forage_type~([^~]+)~/,Ga="__lfsc__:",Ha=Ga.length,Ia="arbf",Ja="blob",Ka="si08",La="ui08",Ma="uic8",Na="si16",Oa="si32",Pa="ur16",Qa="ui32",Ra="fl32",Sa="fl64",Ta=Ha+Ia.length,Ua=Object.prototype.toString,Va={serialize:P,deserialize:Q,stringToBuffer:N,bufferToString:O},Wa={_driver:"webSQLStorage",_initStorage:S,_support:M(),iterate:V,getItem:U,setItem:X,removeItem:Y,clear:Z,length:$,key:_,keys:aa,dropInstance:ca},Xa={_driver:"localStorageWrapper",_initStorage:ha,_support:da(),iterate:ka,getItem:ja,setItem:pa,removeItem:oa,clear:ia,length:na,key:la,keys:ma,dropInstance:qa},Ya=function(a,b){return a===b||"number"==typeof a&&"number"==typeof b&&isNaN(a)&&isNaN(b)},Za=function(a,b){for(var c=a.length,d=0;d<c;){if(Ya(a[d],b))return!0;d++}return!1},$a=Array.isArray||function(a){return"[object Array]"===Object.prototype.toString.call(a)},_a={},ab={},bb={INDEXEDDB:Ca,WEBSQL:Wa,LOCALSTORAGE:Xa},cb=[bb.INDEXEDDB._driver,bb.WEBSQL._driver,bb.LOCALSTORAGE._driver],db=["dropInstance"],eb=["clear","getItem","iterate","key","keys","length","removeItem","setItem"].concat(db),fb={description:"",driver:cb.slice(),name:"localforage",size:4980736,storeName:"keyvaluepairs",version:1},gb=function(){function a(b){d(this,a);for(var c in bb)if(bb.hasOwnProperty(c)){var e=bb[c],f=e._driver;this[c]=f,_a[f]||this.defineDriver(e)}this._defaultConfig=sa({},fb),this._config=sa({},this._defaultConfig,b),this._driverSet=null,this._initDriver=null,this._ready=!1,this._dbInfo=null,this._wrapLibraryMethodsWithReady(),this.setDriver(this._config.driver).catch(function(){})}return a.prototype.config=function(a){if("object"===(void 0===a?"undefined":ta(a))){if(this._ready)return new Error("Can't call config() after localforage has been used.");for(var b in a){if("storeName"===b&&(a[b]=a[b].replace(/\W/g,"_")),"version"===b&&"number"!=typeof a[b])return new Error("Database version must be a number.");this._config[b]=a[b]}return!("driver"in a&&a.driver)||this.setDriver(this._config.driver)}return"string"==typeof a?this._config[a]:this._config},a.prototype.defineDriver=function(a,b,c){var d=new va(function(b,c){try{var d=a._driver,e=new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver");if(!a._driver)return void c(e);for(var f=eb.concat("_initStorage"),g=0,i=f.length;g<i;g++){var j=f[g];if((!Za(db,j)||a[j])&&"function"!=typeof a[j])return void c(e)}(function(){for(var b=function(a){return function(){var b=new Error("Method "+a+" is not implemented by the current driver"),c=va.reject(b);return h(c,arguments[arguments.length-1]),c}},c=0,d=db.length;c<d;c++){var e=db[c];a[e]||(a[e]=b(e))}})();var k=function(c){_a[d]&&console.info("Redefining LocalForage driver: "+d),_a[d]=a,ab[d]=c,b()};"_support"in a?a._support&&"function"==typeof a._support?a._support().then(k,c):k(!!a._support):k(!0)}catch(a){c(a)}});return i(d,b,c),d},a.prototype.driver=function(){return this._driver||null},a.prototype.getDriver=function(a,b,c){var d=_a[a]?va.resolve(_a[a]):va.reject(new Error("Driver not found."));return i(d,b,c),d},a.prototype.getSerializer=function(a){var b=va.resolve(Va);return i(b,a),b},a.prototype.ready=function(a){var b=this,c=b._driverSet.then(function(){return null===b._ready&&(b._ready=b._initDriver()),b._ready});return i(c,a,a),c},a.prototype.setDriver=function(a,b,c){function d(){g._config.driver=g.driver()}function e(a){return g._extend(a),d(),g._ready=g._initStorage(g._config),g._ready}function f(a){return function(){function b(){for(;c<a.length;){var f=a[c];return c++,g._dbInfo=null,g._ready=null,g.getDriver(f).then(e).catch(b)}d();var h=new Error("No available storage method found.");return g._driverSet=va.reject(h),g._driverSet}var c=0;return b()}}var g=this;$a(a)||(a=[a]);var h=this._getSupportedDrivers(a),j=null!==this._driverSet?this._driverSet.catch(function(){return va.resolve()}):va.resolve();return this._driverSet=j.then(function(){var a=h[0];return g._dbInfo=null,g._ready=null,g.getDriver(a).then(function(a){g._driver=a._driver,d(),g._wrapLibraryMethodsWithReady(),g._initDriver=f(h)})}).catch(function(){d();var a=new Error("No available storage method found.");return g._driverSet=va.reject(a),g._driverSet}),i(this._driverSet,b,c),this._driverSet},a.prototype.supports=function(a){return!!ab[a]},a.prototype._extend=function(a){sa(this,a)},a.prototype._getSupportedDrivers=function(a){for(var b=[],c=0,d=a.length;c<d;c++){var e=a[c];this.supports(e)&&b.push(e)}return b},a.prototype._wrapLibraryMethodsWithReady=function(){for(var a=0,b=eb.length;a<b;a++)ra(this,eb[a])},a.prototype.createInstance=function(b){return new a(b)},a}(),hb=new gb;b.exports=hb},{undefined:void 0}]},{},[1])(1)});
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/kckit.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/kckit/src/data/bonus/index.js":
/*!****************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\nvar bonusIsSet = __webpack_require__(/*! ../../utils/bonus-is-set */ \"./node_modules/kckit/src/utils/bonus-is-set.js\");\n\n/**\n * 装备额外属性收益\n * @module\n */\n\n// https://wikiwiki.jp/kancolle/%E8%A3%85%E5%82%99#bonus\n\n/**\n * @member {Number} [equipment] 单一装备\n * @member {Object} [equipments] 条件：装备组合\n * @member {Object} ship 条件：匹配的舰娘\n * @member {Object} [bonus] 收益。数字表示可叠加，字符串表示仅单次\n * @member {Object} [bonusCount] 仅当为单一装备时可用：不同装备数量的收益\n * @member {Object} [bonusImprove] 仅当为单一装备时可用：不同改修星级的收益\n * @member {Array} [list] 显示的内容\n */\nvar dataBonuses = [].concat(_toConsumableArray(__webpack_require__(/*! ./小口径主砲/12cm単装砲改二 */ \"./node_modules/kckit/src/data/bonus/小口径主砲/12cm単装砲改二.js\")), _toConsumableArray(__webpack_require__(/*! ./小口径主砲/12cm単装高角砲E型 */ \"./node_modules/kckit/src/data/bonus/小口径主砲/12cm単装高角砲E型.js\")), _toConsumableArray(__webpack_require__(/*! ./小口径主砲/12.7cm単装高角砲(後期型) */ \"./node_modules/kckit/src/data/bonus/小口径主砲/12.7cm単装高角砲(後期型).js\")), _toConsumableArray(__webpack_require__(/*! ./小口径主砲/12.7cm単装高角砲改二 */ \"./node_modules/kckit/src/data/bonus/小口径主砲/12.7cm単装高角砲改二.js\")), _toConsumableArray(__webpack_require__(/*! ./小口径主砲/12.7cm連装高角砲改二 */ \"./node_modules/kckit/src/data/bonus/小口径主砲/12.7cm連装高角砲改二.js\")), _toConsumableArray(__webpack_require__(/*! ./小口径主砲/12.7cm連装砲A型 */ \"./node_modules/kckit/src/data/bonus/小口径主砲/12.7cm連装砲A型.js\")), _toConsumableArray(__webpack_require__(/*! ./小口径主砲/12.7cm連装砲A型改二 */ \"./node_modules/kckit/src/data/bonus/小口径主砲/12.7cm連装砲A型改二.js\")), _toConsumableArray(__webpack_require__(/*! ./小口径主砲/12.7cm連装砲A型改三(戦時改修)+高射装置 */ \"./node_modules/kckit/src/data/bonus/小口径主砲/12.7cm連装砲A型改三(戦時改修)+高射装置.js\")), _toConsumableArray(__webpack_require__(/*! ./小口径主砲/12.7cm連装砲B型改二 */ \"./node_modules/kckit/src/data/bonus/小口径主砲/12.7cm連装砲B型改二.js\")), _toConsumableArray(__webpack_require__(/*! ./小口径主砲/12.7cm連装砲B型改四(戦時改修)+高射装置 */ \"./node_modules/kckit/src/data/bonus/小口径主砲/12.7cm連装砲B型改四(戦時改修)+高射装置.js\")), _toConsumableArray(__webpack_require__(/*! ./小口径主砲/12.7cm連装砲C型改二 */ \"./node_modules/kckit/src/data/bonus/小口径主砲/12.7cm連装砲C型改二.js\")), _toConsumableArray(__webpack_require__(/*! ./小口径主砲/12.7cm連装砲D型改二 */ \"./node_modules/kckit/src/data/bonus/小口径主砲/12.7cm連装砲D型改二.js\")), _toConsumableArray(__webpack_require__(/*! ./小口径主砲/12.7cm連装砲D型改三 */ \"./node_modules/kckit/src/data/bonus/小口径主砲/12.7cm連装砲D型改三.js\")), _toConsumableArray(__webpack_require__(/*! ./小口径主砲/5inch単装砲 Mk.30改 */ \"./node_modules/kckit/src/data/bonus/小口径主砲/5inch単装砲 Mk.30改.js\")), _toConsumableArray(__webpack_require__(/*! ./小口径主砲/5inch単装砲 Mk.30改+GFCS Mk.37 */ \"./node_modules/kckit/src/data/bonus/小口径主砲/5inch単装砲 Mk.30改+GFCS Mk.37.js\")), _toConsumableArray(__webpack_require__(/*! ./小口径主砲/130mm B-13連装砲 */ \"./node_modules/kckit/src/data/bonus/小口径主砲/130mm B-13連装砲.js\")), _toConsumableArray(__webpack_require__(/*! ./中口径主砲/5inch連装両用砲(集中配備) */ \"./node_modules/kckit/src/data/bonus/中口径主砲/5inch連装両用砲(集中配備).js\")), _toConsumableArray(__webpack_require__(/*! ./中口径主砲/14cm連装砲 */ \"./node_modules/kckit/src/data/bonus/中口径主砲/14cm連装砲.js\")), _toConsumableArray(__webpack_require__(/*! ./中口径主砲/14cm連装砲改 */ \"./node_modules/kckit/src/data/bonus/中口径主砲/14cm連装砲改.js\")), _toConsumableArray(__webpack_require__(/*! ./中口径主砲/Bofors 15cm連装速射砲 */ \"./node_modules/kckit/src/data/bonus/中口径主砲/Bofors 15cm連装速射砲.js\")), _toConsumableArray(__webpack_require__(/*! ./中口径主砲/Bofors 15.2cm連装砲 Model 1930 */ \"./node_modules/kckit/src/data/bonus/中口径主砲/Bofors 15.2cm連装砲 Model 1930.js\")), _toConsumableArray(__webpack_require__(/*! ./中口径主砲/152mm／55 三連装速射砲 */ \"./node_modules/kckit/src/data/bonus/中口径主砲/152mm／55 三連装速射砲.js\")), _toConsumableArray(__webpack_require__(/*! ./中口径主砲/6inch連装速射砲 */ \"./node_modules/kckit/src/data/bonus/中口径主砲/6inch連装速射砲.js\")), _toConsumableArray(__webpack_require__(/*! ./中口径主砲/6inch三連装速射砲 Mk.16 */ \"./node_modules/kckit/src/data/bonus/中口径主砲/6inch三連装速射砲 Mk.16.js\")), _toConsumableArray(__webpack_require__(/*! ./中口径主砲/20.3cm(2号)連装砲 */ \"./node_modules/kckit/src/data/bonus/中口径主砲/20.3cm(2号)連装砲.js\")), _toConsumableArray(__webpack_require__(/*! ./中口径主砲/20.3cm(3号)連装砲 */ \"./node_modules/kckit/src/data/bonus/中口径主砲/20.3cm(3号)連装砲.js\")), _toConsumableArray(__webpack_require__(/*! ./中口径主砲/8inch三連装砲 Mk.9 */ \"./node_modules/kckit/src/data/bonus/中口径主砲/8inch三連装砲 Mk.9.js\")), _toConsumableArray(__webpack_require__(/*! ./大口径主砲/35.6cm連装砲(ダズル迷彩) */ \"./node_modules/kckit/src/data/bonus/大口径主砲/35.6cm連装砲(ダズル迷彩).js\")), _toConsumableArray(__webpack_require__(/*! ./大口径主砲/35.6cm連装砲改 */ \"./node_modules/kckit/src/data/bonus/大口径主砲/35.6cm連装砲改.js\")), _toConsumableArray(__webpack_require__(/*! ./大口径主砲/35.6cm連装砲改二 */ \"./node_modules/kckit/src/data/bonus/大口径主砲/35.6cm連装砲改二.js\")), _toConsumableArray(__webpack_require__(/*! ./大口径主砲/35.6cm三連装砲改(ダズル迷彩仕様) */ \"./node_modules/kckit/src/data/bonus/大口径主砲/35.6cm三連装砲改(ダズル迷彩仕様).js\")), _toConsumableArray(__webpack_require__(/*! ./大口径主砲/41cm連装砲改二 */ \"./node_modules/kckit/src/data/bonus/大口径主砲/41cm連装砲改二.js\")), _toConsumableArray(__webpack_require__(/*! ./大口径主砲/41cm三連装砲改二 */ \"./node_modules/kckit/src/data/bonus/大口径主砲/41cm三連装砲改二.js\")), _toConsumableArray(__webpack_require__(/*! ./大口径主砲/16inch連装砲 (USN) */ \"./node_modules/kckit/src/data/bonus/大口径主砲/16inch連装砲 (USN).js\")), _toConsumableArray(__webpack_require__(/*! ./大口径主砲/16inch三連装砲 Mk.6 */ \"./node_modules/kckit/src/data/bonus/大口径主砲/16inch三連装砲 Mk.6.js\")), _toConsumableArray(__webpack_require__(/*! ./大口径主砲/16inch Mk.I三連装砲 */ \"./node_modules/kckit/src/data/bonus/大口径主砲/16inch Mk.I三連装砲.js\")), _toConsumableArray(__webpack_require__(/*! ./副砲/usn.5inch */ \"./node_modules/kckit/src/data/bonus/副砲/usn.5inch.js\")), _toConsumableArray(__webpack_require__(/*! ./魚雷/53cm連装魚雷 */ \"./node_modules/kckit/src/data/bonus/魚雷/53cm連装魚雷.js\")), _toConsumableArray(__webpack_require__(/*! ./魚雷/53cm艦首(酸素)魚雷 */ \"./node_modules/kckit/src/data/bonus/魚雷/53cm艦首(酸素)魚雷.js\")), _toConsumableArray(__webpack_require__(/*! ./魚雷/533mm 三連装魚雷 */ \"./node_modules/kckit/src/data/bonus/魚雷/533mm 三連装魚雷.js\")), _toConsumableArray(__webpack_require__(/*! ./魚雷/533mm五連装魚雷 */ \"./node_modules/kckit/src/data/bonus/魚雷/533mm五連装魚雷.js\")), _toConsumableArray(__webpack_require__(/*! ./魚雷/61cm三連装(酸素)魚雷後期型 */ \"./node_modules/kckit/src/data/bonus/魚雷/61cm三連装(酸素)魚雷後期型.js\")), _toConsumableArray(__webpack_require__(/*! ./魚雷/61cm四連装(酸素)魚雷 */ \"./node_modules/kckit/src/data/bonus/魚雷/61cm四連装(酸素)魚雷.js\")), _toConsumableArray(__webpack_require__(/*! ./魚雷/61cm四連装(酸素)魚雷後期型 */ \"./node_modules/kckit/src/data/bonus/魚雷/61cm四連装(酸素)魚雷後期型.js\")), _toConsumableArray(__webpack_require__(/*! ./魚雷/61cm五連装(酸素)魚雷 */ \"./node_modules/kckit/src/data/bonus/魚雷/61cm五連装(酸素)魚雷.js\")), _toConsumableArray(__webpack_require__(/*! ./魚雷/試製61cm六連装(酸素)魚雷 */ \"./node_modules/kckit/src/data/bonus/魚雷/試製61cm六連装(酸素)魚雷.js\")), _toConsumableArray(__webpack_require__(/*! ./魚雷/後期型艦首魚雷(6門) */ \"./node_modules/kckit/src/data/bonus/魚雷/後期型艦首魚雷(6門).js\")), _toConsumableArray(__webpack_require__(/*! ./魚雷/熟練聴音員+後期型艦首魚雷(6門) */ \"./node_modules/kckit/src/data/bonus/魚雷/熟練聴音員+後期型艦首魚雷(6門).js\")), _toConsumableArray(__webpack_require__(/*! ./魚雷/後期型53cm艦首魚雷(8門) */ \"./node_modules/kckit/src/data/bonus/魚雷/後期型53cm艦首魚雷(8門).js\")), _toConsumableArray(__webpack_require__(/*! ./水上機/OS2U */ \"./node_modules/kckit/src/data/bonus/水上機/OS2U.js\")), _toConsumableArray(__webpack_require__(/*! ./水上機/S9 Osprey */ \"./node_modules/kckit/src/data/bonus/水上機/S9 Osprey.js\")), _toConsumableArray(__webpack_require__(/*! ./水上機/Laté 298B */ \"./node_modules/kckit/src/data/bonus/水上機/Laté 298B.js\")), _toConsumableArray(__webpack_require__(/*! ./水上機/Swordfish */ \"./node_modules/kckit/src/data/bonus/水上機/Swordfish.js\")), _toConsumableArray(__webpack_require__(/*! ./水上機/Seafox */ \"./node_modules/kckit/src/data/bonus/水上機/Seafox.js\")), _toConsumableArray(__webpack_require__(/*! ./水上機/瑞雲(六三四空) */ \"./node_modules/kckit/src/data/bonus/水上機/瑞雲(六三四空).js\")), _toConsumableArray(__webpack_require__(/*! ./水上機/瑞雲12型(六三四空) */ \"./node_modules/kckit/src/data/bonus/水上機/瑞雲12型(六三四空).js\")), _toConsumableArray(__webpack_require__(/*! ./水上機/瑞雲(六三四空／熟練) */ \"./node_modules/kckit/src/data/bonus/水上機/瑞雲(六三四空／熟練).js\")), _toConsumableArray(__webpack_require__(/*! ./水上機/瑞雲改二(六三四空) */ \"./node_modules/kckit/src/data/bonus/水上機/瑞雲改二(六三四空).js\")), _toConsumableArray(__webpack_require__(/*! ./水上機/瑞雲改二(六三四空／熟練) */ \"./node_modules/kckit/src/data/bonus/水上機/瑞雲改二(六三四空／熟練).js\")), _toConsumableArray(__webpack_require__(/*! ./艦上機/九六式艦戦 */ \"./node_modules/kckit/src/data/bonus/艦上機/九六式艦戦.js\")), _toConsumableArray(__webpack_require__(/*! ./艦上機/烈風改 */ \"./node_modules/kckit/src/data/bonus/艦上機/烈風改.js\")), _toConsumableArray(__webpack_require__(/*! ./艦上機/烈風改二 */ \"./node_modules/kckit/src/data/bonus/艦上機/烈風改二.js\")), _toConsumableArray(__webpack_require__(/*! ./艦上機/烈風改二戊型 */ \"./node_modules/kckit/src/data/bonus/艦上機/烈風改二戊型.js\")), _toConsumableArray(__webpack_require__(/*! ./艦上機/Re.2001 OR改 */ \"./node_modules/kckit/src/data/bonus/艦上機/Re.2001 OR改.js\")), _toConsumableArray(__webpack_require__(/*! ./艦上機/Re.2005 改 */ \"./node_modules/kckit/src/data/bonus/艦上機/Re.2005 改.js\")), _toConsumableArray(__webpack_require__(/*! ./艦上機/XF5U */ \"./node_modules/kckit/src/data/bonus/艦上機/XF5U.js\")), _toConsumableArray(__webpack_require__(/*! ./艦上機/九九式艦爆(江草隊) */ \"./node_modules/kckit/src/data/bonus/艦上機/九九式艦爆(江草隊).js\")), _toConsumableArray(__webpack_require__(/*! ./艦上機/彗星 */ \"./node_modules/kckit/src/data/bonus/艦上機/彗星.js\")), _toConsumableArray(__webpack_require__(/*! ./艦上機/彗星(六〇一空) */ \"./node_modules/kckit/src/data/bonus/艦上機/彗星(六〇一空).js\")), _toConsumableArray(__webpack_require__(/*! ./艦上機/彗星一二型甲 */ \"./node_modules/kckit/src/data/bonus/艦上機/彗星一二型甲.js\")), _toConsumableArray(__webpack_require__(/*! ./艦上機/彗星(江草隊) */ \"./node_modules/kckit/src/data/bonus/艦上機/彗星(江草隊).js\")), _toConsumableArray(__webpack_require__(/*! ./艦上機/彗星二二型(六三四空) */ \"./node_modules/kckit/src/data/bonus/艦上機/彗星二二型(六三四空).js\")), _toConsumableArray(__webpack_require__(/*! ./艦上機/彗星二二型(六三四空／熟練) */ \"./node_modules/kckit/src/data/bonus/艦上機/彗星二二型(六三四空／熟練).js\")), _toConsumableArray(__webpack_require__(/*! ./艦上機/彗星一二型(六三四空／三号爆弾搭載機) */ \"./node_modules/kckit/src/data/bonus/艦上機/彗星一二型(六三四空／三号爆弾搭載機).js\")), _toConsumableArray(__webpack_require__(/*! ./艦上機/彗星一ニ型(三一号光電管爆弾搭載機) */ \"./node_modules/kckit/src/data/bonus/艦上機/彗星一ニ型(三一号光電管爆弾搭載機).js\")), _toConsumableArray(__webpack_require__(/*! ./艦上機/Ju87C改二(KMX搭載機) */ \"./node_modules/kckit/src/data/bonus/艦上機/Ju87C改二(KMX搭載機).js\")), _toConsumableArray(__webpack_require__(/*! ./艦上機/Re.2001 CB改 */ \"./node_modules/kckit/src/data/bonus/艦上機/Re.2001 CB改.js\")), _toConsumableArray(__webpack_require__(/*! ./艦上機/九七式艦攻(九三一空) */ \"./node_modules/kckit/src/data/bonus/艦上機/九七式艦攻(九三一空).js\")), _toConsumableArray(__webpack_require__(/*! ./艦上機/九七式艦攻(友永隊) */ \"./node_modules/kckit/src/data/bonus/艦上機/九七式艦攻(友永隊).js\")), _toConsumableArray(__webpack_require__(/*! ./艦上機/九七式艦攻(村田隊) */ \"./node_modules/kckit/src/data/bonus/艦上機/九七式艦攻(村田隊).js\")), _toConsumableArray(__webpack_require__(/*! ./艦上機/九七式艦攻改 */ \"./node_modules/kckit/src/data/bonus/艦上機/九七式艦攻改.js\")), _toConsumableArray(__webpack_require__(/*! ./艦上機/流星 */ \"./node_modules/kckit/src/data/bonus/艦上機/流星.js\")), _toConsumableArray(__webpack_require__(/*! ./艦上機/流星改(一航戦) */ \"./node_modules/kckit/src/data/bonus/艦上機/流星改(一航戦).js\")), _toConsumableArray(__webpack_require__(/*! ./艦上機/天山一二型(友永隊) */ \"./node_modules/kckit/src/data/bonus/艦上機/天山一二型(友永隊).js\")), _toConsumableArray(__webpack_require__(/*! ./艦上機/天山一二型(村田隊) */ \"./node_modules/kckit/src/data/bonus/艦上機/天山一二型(村田隊).js\")), _toConsumableArray(__webpack_require__(/*! ./艦上機/天山一二型甲 */ \"./node_modules/kckit/src/data/bonus/艦上機/天山一二型甲.js\")), _toConsumableArray(__webpack_require__(/*! ./艦上機/天山一二型甲改(空六号電探改装備機) */ \"./node_modules/kckit/src/data/bonus/艦上機/天山一二型甲改(空六号電探改装備機).js\")), _toConsumableArray(__webpack_require__(/*! ./艦上機/Re.2001 G改 */ \"./node_modules/kckit/src/data/bonus/艦上機/Re.2001 G改.js\")), _toConsumableArray(__webpack_require__(/*! ./艦上機/彩雲 */ \"./node_modules/kckit/src/data/bonus/艦上機/彩雲.js\")), _toConsumableArray(__webpack_require__(/*! ./艦上機/二式艦上偵察機 */ \"./node_modules/kckit/src/data/bonus/艦上機/二式艦上偵察機.js\")), _toConsumableArray(__webpack_require__(/*! ./艦上機/試製景雲(艦偵型) */ \"./node_modules/kckit/src/data/bonus/艦上機/試製景雲(艦偵型).js\")), _toConsumableArray(__webpack_require__(/*! ./電探/13号対空電探改 */ \"./node_modules/kckit/src/data/bonus/電探/13号対空電探改.js\")), _toConsumableArray(__webpack_require__(/*! ./電探/GFCS Mk.37 */ \"./node_modules/kckit/src/data/bonus/電探/GFCS Mk.37.js\")), _toConsumableArray(__webpack_require__(/*! ./電探/SK／SGレーダー */ \"./node_modules/kckit/src/data/bonus/電探/SK／SGレーダー.js\")), _toConsumableArray(__webpack_require__(/*! ./対潜兵装/三式水中探信儀 */ \"./node_modules/kckit/src/data/bonus/対潜兵装/三式水中探信儀.js\")), _toConsumableArray(__webpack_require__(/*! ./対潜兵装/四式水中聴音機 */ \"./node_modules/kckit/src/data/bonus/対潜兵装/四式水中聴音機.js\")), _toConsumableArray(__webpack_require__(/*! ./対潜兵装/三式爆雷投射機 集中配備 */ \"./node_modules/kckit/src/data/bonus/対潜兵装/三式爆雷投射機 集中配備.js\")), _toConsumableArray(__webpack_require__(/*! ./対潜兵装/試製15cm9連装対潜噴進砲 */ \"./node_modules/kckit/src/data/bonus/対潜兵装/試製15cm9連装対潜噴進砲.js\")), _toConsumableArray(__webpack_require__(/*! ./対潜兵装/RUR-4A */ \"./node_modules/kckit/src/data/bonus/対潜兵装/RUR-4A.js\")), _toConsumableArray(__webpack_require__(/*! ./対潜兵装/対潜短魚雷 */ \"./node_modules/kckit/src/data/bonus/対潜兵装/対潜短魚雷.js\")), _toConsumableArray(__webpack_require__(/*! ./対空機銃/20連装7inch UP Rocket Launchers */ \"./node_modules/kckit/src/data/bonus/対空機銃/20連装7inch UP Rocket Launchers.js\")), _toConsumableArray(__webpack_require__(/*! ./増設バルジ/新型高温高圧缶 */ \"./node_modules/kckit/src/data/bonus/増設バルジ/新型高温高圧缶.js\")), _toConsumableArray(__webpack_require__(/*! ./増設バルジ/北方迷彩(＋北方装備) */ \"./node_modules/kckit/src/data/bonus/増設バルジ/北方迷彩(＋北方装備).js\")), _toConsumableArray(__webpack_require__(/*! ./増設バルジ/艦本新設計 増設バルジ(大型艦) */ \"./node_modules/kckit/src/data/bonus/増設バルジ/艦本新設計 増設バルジ(大型艦).js\")), _toConsumableArray(__webpack_require__(/*! ./その他/一式徹甲弾改 */ \"./node_modules/kckit/src/data/bonus/その他/一式徹甲弾改.js\")), _toConsumableArray(__webpack_require__(/*! ./その他/三式弾 */ \"./node_modules/kckit/src/data/bonus/その他/三式弾.js\")), _toConsumableArray(__webpack_require__(/*! ./その他/三式弾改 */ \"./node_modules/kckit/src/data/bonus/その他/三式弾改.js\")), _toConsumableArray(__webpack_require__(/*! ./その他/甲標的 丁型改(蛟龍改) */ \"./node_modules/kckit/src/data/bonus/その他/甲標的 丁型改(蛟龍改).js\")), _toConsumableArray(__webpack_require__(/*! ./その他/オ号観測機改 */ \"./node_modules/kckit/src/data/bonus/その他/オ号観測機改.js\")), _toConsumableArray(__webpack_require__(/*! ./その他/オ号観測機改二 */ \"./node_modules/kckit/src/data/bonus/その他/オ号観測機改二.js\")), _toConsumableArray(__webpack_require__(/*! ./その他/S-51J */ \"./node_modules/kckit/src/data/bonus/その他/S-51J.js\")), _toConsumableArray(__webpack_require__(/*! ./その他/S-51J改 */ \"./node_modules/kckit/src/data/bonus/その他/S-51J改.js\")), _toConsumableArray(__webpack_require__(/*! ./その他/探照灯 */ \"./node_modules/kckit/src/data/bonus/その他/探照灯.js\")), _toConsumableArray(__webpack_require__(/*! ./その他/96式150cm探照灯 */ \"./node_modules/kckit/src/data/bonus/その他/96式150cm探照灯.js\")), _toConsumableArray(__webpack_require__(/*! ./その他/熟練見張員 */ \"./node_modules/kckit/src/data/bonus/その他/熟練見張員.js\")), _toConsumableArray(__webpack_require__(/*! ./その他/後期型潜水艦搭載電探＆逆探 */ \"./node_modules/kckit/src/data/bonus/その他/後期型潜水艦搭載電探＆逆探.js\")));\n\n// 检查所有套装加成\n// 如果 list 为 Number[]，检查是否是其他某个套装加成的子集\n// 如果是，修改对应套装加成，添加 bonusAccumulate\n{\n    var bonusSets = dataBonuses.filter(bonusIsSet);\n\n    bonusSets.forEach(function (bonus, index) {\n        if (!bonus.list.every(function (item) {\n            return !isNaN(item);\n        })) return;\n        bonusSets.forEach(function (toCheck, indexToCheck) {\n            if (index === indexToCheck || bonus.list.length >= toCheck.list.length || !bonus.list.every(function (item) {\n                return toCheck.list.includes(item);\n            })) return;\n            if (!toCheck.bonusAccumulate) toCheck.bonusAccumulate = _extends({}, toCheck.bonus || {});\n            Object.keys(bonus.bonus).forEach(function (stat) {\n                if (typeof toCheck.bonusAccumulate[stat] === 'undefined') toCheck.bonusAccumulate[stat] = 0;\n                toCheck.bonusAccumulate[stat] += bonus.bonus[stat];\n            });\n        });\n    });\n}\n\nmodule.exports = dataBonuses;\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/index.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/その他/96式150cm探照灯.js":
/*!**************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/その他/96式150cm探照灯.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n/**\n * 装备额外属性收益 - 96式150cm探照灯\n *\n * @module\n */\n\n// https://wikiwiki.jp/kancolle/96%E5%BC%8F150cm%E6%8E%A2%E7%85%A7%E7%81%AF\n\nvar _require = __webpack_require__(/*! ../../ship-series */ \"./node_modules/kckit/src/data/ship-series/index.js\"),\n    Hiei = _require.Hiei,\n    Kirishima = _require.Kirishima;\n\nvar _require2 = __webpack_require__(/*! ../../ship-classes */ \"./node_modules/kckit/src/data/ship-classes.js\"),\n    BB_Yamato = _require2.BB_Yamato;\n\nvar _require3 = __webpack_require__(/*! ../../ship-ids */ \"./node_modules/kckit/src/data/ship-ids/index.js\"),\n    比叡改二丙 = _require3.比叡改二丙;\n\nmodule.exports = [{\n    equipment: 140,\n    ship: {\n        isID: [].concat(_toConsumableArray(Hiei), _toConsumableArray(Kirishima)).filter(function (id) {\n            return id !== 比叡改二丙;\n        })\n    },\n    bonusCount: {\n        1: {\n            fire: 6,\n            evasion: -2\n        }\n    }\n}, {\n    equipment: 140,\n    ship: {\n        isID: [比叡改二丙]\n    },\n    bonusCount: {\n        1: {\n            fire: 9,\n            torpedo: 3,\n            evasion: -2\n        }\n    }\n}, {\n    equipment: 140,\n    ship: {\n        isClass: [BB_Yamato]\n    },\n    bonusCount: {\n        1: {\n            fire: 4,\n            evasion: -1\n        }\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E3%81%9D%E3%81%AE%E4%BB%96/96%E5%BC%8F150cm%E6%8E%A2%E7%85%A7%E7%81%AF.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/その他/S-51J.js":
/*!********************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/その他/S-51J.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * @module\r\n * 装备额外属性收益\r\n * 326. **S-51J**\r\n */\n\n// https://wikiwiki.jp/kancolle/S-51J%E6%94%B9\n\nmodule.exports = [{\n    equipment: 326,\n    ship: {\n        isID: 553 // 伊勢改二\n    },\n    bonus: {\n        asw: 2,\n        evasion: 1\n    }\n}, {\n    equipment: 326,\n    ship: {\n        isID: 554 // 日向改二\n    },\n    bonus: {\n        fire: 1,\n        asw: 3,\n        evasion: 2\n    }\n\n    // ------------------------------------------------------------------------\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E3%81%9D%E3%81%AE%E4%BB%96/S-51J.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/その他/S-51J改.js":
/*!*********************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/その他/S-51J改.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * @module\r\n * 装备额外属性收益\r\n * 327. **S-51J改**\r\n */\n\n// https://wikiwiki.jp/kancolle/S-51J%E6%94%B9\n\nmodule.exports = [{\n    equipment: 327,\n    ship: {\n        isID: 553 // 伊勢改二\n    },\n    bonus: {\n        fire: 1,\n        asw: 3,\n        evasion: 1\n    }\n}, {\n    equipment: 327,\n    ship: {\n        isID: 554 // 日向改二\n    },\n    bonus: {\n        fire: 2,\n        asw: 4,\n        evasion: 2\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E3%81%9D%E3%81%AE%E4%BB%96/S-51J%E6%94%B9.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/その他/オ号観測機改.js":
/*!*********************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/その他/オ号観測機改.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * @module\r\n * 装备额外属性收益\r\n * 324. **オ号観測機改**\r\n */\n\n// https://wikiwiki.jp/kancolle/%E3%82%AA%E5%8F%B7%E8%A6%B3%E6%B8%AC%E6%A9%9F%E6%94%B9\n\nmodule.exports = [{\n    equipment: 324,\n    ship: {\n        isID: 553 // 伊勢改二\n    },\n    bonus: {\n        asw: 1,\n        evasion: 1\n    }\n}, {\n    equipment: 324,\n    ship: {\n        isID: 554 // 日向改二\n    },\n    bonus: {\n        asw: 2,\n        evasion: 1\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E3%81%9D%E3%81%AE%E4%BB%96/%E3%82%AA%E5%8F%B7%E8%A6%B3%E6%B8%AC%E6%A9%9F%E6%94%B9.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/その他/オ号観測機改二.js":
/*!**********************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/その他/オ号観測機改二.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * @module\r\n * 装备额外属性收益\r\n * 325. **オ号観測機改二**\r\n */\n\n// https://wikiwiki.jp/kancolle/%E3%82%AA%E5%8F%B7%E8%A6%B3%E6%B8%AC%E6%A9%9F%E6%94%B9\n\nmodule.exports = [{\n    equipment: 325,\n    ship: {\n        isID: 553 // 伊勢改二\n    },\n    bonus: {\n        asw: 1,\n        evasion: 1\n    }\n}, {\n    equipment: 325,\n    ship: {\n        isID: 554 // 日向改二\n    },\n    bonus: {\n        asw: 2,\n        evasion: 1\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E3%81%9D%E3%81%AE%E4%BB%96/%E3%82%AA%E5%8F%B7%E8%A6%B3%E6%B8%AC%E6%A9%9F%E6%94%B9%E4%BA%8C.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/その他/一式徹甲弾改.js":
/*!*********************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/その他/一式徹甲弾改.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n/**\n * @module\n * 装备额外属性收益\n *\n * 365. 一式徹甲弾改\n *      https://wikiwiki.jp/kancolle/%E4%B8%80%E5%BC%8F%E5%BE%B9%E7%94%B2%E5%BC%BE%E6%94%B9\n *\n */\n\nvar _require = __webpack_require__(/*! ../../ship-classes */ \"./node_modules/kckit/src/data/ship-classes.js\"),\n    group_BB_Ise = _require.group_BB_Ise,\n    group_BB_Fusou = _require.group_BB_Fusou,\n    BB_Nagato = _require.BB_Nagato,\n    BB_Yamato = _require.BB_Yamato,\n    BB_Kongou = _require.BB_Kongou,\n    BB_Kongou2 = _require.BB_Kongou2;\n\nvar _require2 = __webpack_require__(/*! ../../ship-ids */ \"./node_modules/kckit/src/data/ship-ids/index.js\"),\n    比叡改二丙 = _require2.比叡改二丙;\n\nvar tier2IDs = [541, // 長門改二\n573, // 陸奥改二\n136, // 大和改\n546];\nvar tier3IDs = [591, // 金剛改二丙\n比叡改二丙];\n\nmodule.exports = [{\n    equipment: 365,\n    ship: {\n        isID: tier3IDs\n    },\n    bonus: {\n        fire: 3\n    }\n}, {\n    equipment: 365,\n    ship: {\n        isID: tier2IDs\n    },\n    bonus: {\n        fire: 2\n    }\n}, {\n    equipment: 365,\n    ship: {\n        isClass: [].concat(_toConsumableArray(group_BB_Ise), _toConsumableArray(group_BB_Fusou), [BB_Nagato, BB_Yamato, BB_Kongou, BB_Kongou2]),\n        isNotID: [].concat(tier2IDs, tier3IDs)\n    },\n    bonus: {\n        fire: 1\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E3%81%9D%E3%81%AE%E4%BB%96/%E4%B8%80%E5%BC%8F%E5%BE%B9%E7%94%B2%E5%BC%BE%E6%94%B9.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/その他/三式弾.js":
/*!******************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/その他/三式弾.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * @module\n * 装备额外属性收益\n * 35. **三式弾**\n */\n\n// https://wikiwiki.jp/kancolle/%E4%B8%89%E5%BC%8F%E5%BC%BE\n\nmodule.exports = [{\n    equipment: 35,\n    ship: {\n        isID: [149, // 金剛改二\n        591, // 金剛改二丙\n        592]\n    },\n    bonusCount: {\n        1: {\n            fire: 1,\n            aa: 1\n        }\n    }\n}, {\n    equipment: 35,\n    ship: {\n        isID: [150]\n    },\n    bonusCount: {\n        1: {\n            aa: 1\n        }\n    }\n}, {\n    equipment: 35,\n    ship: {\n        isID: [151]\n    },\n    bonusCount: {\n        1: {\n            aa: 1,\n            evasion: 1\n        }\n    }\n}, {\n    equipment: 35,\n    ship: {\n        isID: [152]\n    },\n    bonusCount: {\n        1: {\n            fire: 1\n        }\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E3%81%9D%E3%81%AE%E4%BB%96/%E4%B8%89%E5%BC%8F%E5%BC%BE.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/その他/三式弾改.js":
/*!*******************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/その他/三式弾改.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * @module\n * 装备额外属性收益\n * 317. **三式弾改**\n */\n\n// https://wikiwiki.jp/kancolle/%E4%B8%89%E5%BC%8F%E5%BC%BE%E6%94%B9\n\nmodule.exports = [{\n    equipment: 317,\n    ship: {\n        isID: [78, // 金剛\n        209, // 金剛改\n        86, // 比叡\n        210, // 比叡改\n        79, // 榛名\n        211, // 榛名改\n        85, // 霧島\n        212]\n    },\n    bonusCount: {\n        1: {\n            fire: 1,\n            aa: 1\n        }\n    }\n}, {\n    equipment: 317,\n    ship: {\n        isID: [149, // 金剛改二\n        591, // 金剛改二丙\n        592]\n    },\n    bonusCount: {\n        1: {\n            fire: 3,\n            aa: 3\n        }\n    }\n}, {\n    equipment: 317,\n    ship: {\n        isID: [150]\n    },\n    bonusCount: {\n        1: {\n            fire: 2,\n            aa: 2\n        }\n    }\n}, {\n    equipment: 317,\n    ship: {\n        isID: [151]\n    },\n    bonusCount: {\n        1: {\n            fire: 2,\n            aa: 2,\n            evasion: 1\n        }\n    }\n}, {\n    equipment: 317,\n    ship: {\n        isID: [152]\n    },\n    bonusCount: {\n        1: {\n            fire: 3,\n            aa: 2\n        }\n    }\n}, {\n    equipment: 317,\n    ship: {\n        isID: [541]\n    },\n    bonusCount: {\n        1: {\n            fire: 1,\n            aa: 2\n        }\n    }\n}, {\n    equipment: 317,\n    ship: {\n        isID: [573]\n    },\n    bonusCount: {\n        1: {\n            fire: 2,\n            aa: 2,\n            evasion: 1\n        }\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E3%81%9D%E3%81%AE%E4%BB%96/%E4%B8%89%E5%BC%8F%E5%BC%BE%E6%94%B9.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/その他/後期型潜水艦搭載電探＆逆探.js":
/*!****************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/その他/後期型潜水艦搭載電探＆逆探.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n/**\n * @module\n * 装备额外属性收益\n *\n * 384. 後期型潜水艦搭載電探＆逆探\n *      https://wikiwiki.jp/kancolle/%E5%BE%8C%E6%9C%9F%E5%9E%8B%E6%BD%9C%E6%B0%B4%E8%89%A6%E6%90%AD%E8%BC%89%E9%9B%BB%E6%8E%A2%EF%BC%86%E9%80%86%E6%8E%A2\n *\n */\n\nvar _require = __webpack_require__(/*! ../../ship-series */ \"./node_modules/kckit/src/data/ship-series/index.js\"),\n    I47 = _require.I47,\n    I58 = _require.I58,\n    I400 = _require.I400,\n    I401 = _require.I401;\n// ============================================================================\n\nmodule.exports = [{\n    equipment: 384,\n    ship: {\n        isID: [].concat(_toConsumableArray(I58))\n    },\n    bonus: {\n        evasion: 2\n    }\n}, {\n    equipment: 384,\n    ship: {\n        isID: [].concat(_toConsumableArray(I47), _toConsumableArray(I400), _toConsumableArray(I401))\n    },\n    bonus: {\n        evasion: 3\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E3%81%9D%E3%81%AE%E4%BB%96/%E5%BE%8C%E6%9C%9F%E5%9E%8B%E6%BD%9C%E6%B0%B4%E8%89%A6%E6%90%AD%E8%BC%89%E9%9B%BB%E6%8E%A2%EF%BC%86%E9%80%86%E6%8E%A2.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/その他/探照灯.js":
/*!******************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/その他/探照灯.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n/**\r\n * 装备额外属性收益 - 探照灯\r\n *\r\n * @module\r\n */\n\n// https://wikiwiki.jp/kancolle/%E6%8E%A2%E7%85%A7%E7%81%AF\n\nvar _require = __webpack_require__(/*! ../../ship-series */ \"./node_modules/kckit/src/data/ship-series/index.js\"),\n    Hiei = _require.Hiei,\n    Kirishima = _require.Kirishima,\n    Choukai = _require.Choukai,\n    Jintsu = _require.Jintsu,\n    Akatsuki = _require.Akatsuki,\n    Akigumo = _require.Akigumo,\n    Yukikaze = _require.Yukikaze;\n\nmodule.exports = [{\n    equipment: 74,\n    ship: {\n        isID: [].concat(_toConsumableArray(Akigumo))\n    },\n    bonus: {\n        fire: 2\n    }\n}, {\n    equipment: 74,\n    ship: {\n        isID: [].concat(_toConsumableArray(Yukikaze))\n    },\n    bonus: {\n        fire: 1,\n        aa: 1\n    }\n}, {\n    equipment: 74,\n    ship: {\n        isID: [].concat(_toConsumableArray(Hiei), _toConsumableArray(Kirishima), _toConsumableArray(Choukai), _toConsumableArray(Akatsuki))\n    },\n    bonusCount: {\n        1: {\n            fire: 4,\n            evasion: -1\n        }\n    }\n}, {\n    equipment: 74,\n    ship: {\n        isID: [].concat(_toConsumableArray(Jintsu))\n    },\n    bonusCount: {\n        1: {\n            fire: 8,\n            torpedo: 6,\n            evasion: -1\n        }\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E3%81%9D%E3%81%AE%E4%BB%96/%E6%8E%A2%E7%85%A7%E7%81%AF.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/その他/熟練見張員.js":
/*!********************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/その他/熟練見張員.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n/**\r\n * @module\r\n * 装备额外属性收益\r\n *\r\n * 129. 熟練見張員\r\n *      https://wikiwiki.jp/kancolle/%E7%86%9F%E7%B7%B4%E8%A6%8B%E5%BC%B5%E5%93%A1\r\n *\r\n */\n\nvar _require = __webpack_require__(/*! ../../ship-classes */ \"./node_modules/kckit/src/data/ship-classes.js\"),\n    group_CAV_Navy_IJN = _require.group_CAV_Navy_IJN,\n    group_CA_Navy_IJN = _require.group_CA_Navy_IJN,\n    group_CL_S_Navy_IJN = _require.group_CL_S_Navy_IJN,\n    group_DD_Navy_IJN = _require.group_DD_Navy_IJN;\n\nmodule.exports = [{\n    equipment: 129,\n    ship: {\n        isClass: [].concat(_toConsumableArray(group_CAV_Navy_IJN), _toConsumableArray(group_CA_Navy_IJN))\n    },\n    bonus: {\n        fire: 1,\n        los: 3,\n        evasion: 2\n    }\n}, {\n    equipment: 129,\n    ship: {\n        isClass: [].concat(_toConsumableArray(group_CL_S_Navy_IJN))\n    },\n    bonus: {\n        fire: 1,\n        torpedo: 2,\n        los: 3,\n        evasion: 2\n    }\n}, {\n    equipment: 129,\n    ship: {\n        isClass: [].concat(_toConsumableArray(group_DD_Navy_IJN))\n    },\n    bonus: {\n        fire: 1,\n        torpedo: 2,\n        asw: 2,\n        los: 1,\n        evasion: 2\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E3%81%9D%E3%81%AE%E4%BB%96/%E7%86%9F%E7%B7%B4%E8%A6%8B%E5%BC%B5%E5%93%A1.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/その他/甲標的 丁型改(蛟龍改).js":
/*!***************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/その他/甲標的 丁型改(蛟龍改).js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * @module\r\n * 装备额外属性收益\r\n *\r\n * 364. 甲標的 丁型改(蛟龍改)\r\n *      https://wikiwiki.jp/kancolle/%E4%B8%80%E5%BC%8F%E5%BE%B9%E7%94%B2%E5%BC%BE%E6%94%B9\r\n *\r\n */\n\nmodule.exports = [{\n    equipment: 364,\n    ship: {\n        isID: [623 // 夕張改二特\n        ]\n    },\n    bonus: {\n        fire: 1,\n        torpedo: 4,\n        evasion: -2\n    }\n}, {\n    equipment: 364,\n    ship: {\n        isID: [119 // 北上改二\n        ]\n    },\n    bonus: {\n        torpedo: 2,\n        evasion: -2\n    }\n}, {\n    equipment: 364,\n    ship: {\n        isID: [118, // 大井改二\n        586 // 日進甲\n        ]\n    },\n    bonus: {\n        torpedo: 1,\n        evasion: -2\n    }\n}, {\n    equipment: 364,\n    ship: {\n        canEquip: [12],\n        isType: [13, 14]\n    },\n    bonus: {\n        fire: -1,\n        evasion: -7\n    }\n}, {\n    equipment: 364,\n    ship: {\n        isID: [146, // 木曽改二\n        488, // 由良改二\n        200, // 阿武隈改二\n        102, // 千歳\n        104, // 千歳改\n        106, // 千歳甲\n        103, // 千代田\n        105, // 千代田改\n        107, // 千代田甲\n        451, // 瑞穂\n        348 // 瑞穂改\n        ]\n    },\n    bonus: {\n        fire: -1,\n        evasion: -7\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E3%81%9D%E3%81%AE%E4%BB%96/%E7%94%B2%E6%A8%99%E7%9A%84_%E4%B8%81%E5%9E%8B%E6%94%B9(%E8%9B%9F%E9%BE%8D%E6%94%B9).js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/中口径主砲/14cm連装砲.js":
/*!************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/中口径主砲/14cm連装砲.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * @module\r\n * 装备额外属性收益\r\n * 119. **14cm連装砲**\r\n */\n\n// https://wikiwiki.jp/kancolle/14cm%E9%80%A3%E8%A3%85%E7%A0%B2\n\nvar _require = __webpack_require__(/*! ../../ship-classes */ \"./node_modules/kckit/src/data/ship-classes.js\"),\n    CL_Yuubari = _require.CL_Yuubari,\n    CL_Yuubari2 = _require.CL_Yuubari2,\n    CT_Katori = _require.CT_Katori,\n    AV_Nisshin = _require.AV_Nisshin;\n\nmodule.exports = [{\n    equipment: 119,\n    ship: {\n        isClass: [CL_Yuubari, CL_Yuubari2, CT_Katori]\n    },\n    bonus: {\n        fire: 1\n    }\n}, {\n    equipment: 119,\n    ship: {\n        isClass: [AV_Nisshin]\n    },\n    bonus: {\n        fire: 2,\n        torpedo: 1\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E4%B8%AD%E5%8F%A3%E5%BE%84%E4%B8%BB%E7%A0%B2/14cm%E9%80%A3%E8%A3%85%E7%A0%B2.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/中口径主砲/14cm連装砲改.js":
/*!*************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/中口径主砲/14cm連装砲改.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * @module\r\n * 装备额外属性收益\r\n * 310. **14cm連装砲改**\r\n */\n\n// https://wikiwiki.jp/kancolle/14cm%E9%80%A3%E8%A3%85%E7%A0%B2%E6%94%B9\n\nvar _require = __webpack_require__(/*! ../../ship-classes */ \"./node_modules/kckit/src/data/ship-classes.js\"),\n    CL_Yuubari = _require.CL_Yuubari,\n    CL_Yuubari2 = _require.CL_Yuubari2,\n    CT_Katori = _require.CT_Katori,\n    AV_Nisshin = _require.AV_Nisshin;\n\nmodule.exports = [{\n    equipment: 310,\n    ship: {\n        isClass: [CL_Yuubari]\n    },\n    bonus: {\n        fire: 2,\n        aa: 1,\n        evasion: 1\n    }\n}, {\n    equipment: 310,\n    ship: {\n        isClass: [CL_Yuubari2]\n    },\n    bonusImprove: {\n        0: {\n            fire: 4,\n            aa: 1,\n            evasion: 2,\n            asw: 1\n        },\n        8: {\n            fire: 5,\n            torpedo: 1,\n            aa: 1,\n            evasion: 2,\n            asw: 1\n        }\n    }\n}, {\n    equipment: 310,\n    ship: {\n        isClass: [CT_Katori]\n    },\n    bonus: {\n        fire: 2,\n        evasion: 1\n    }\n}, {\n    equipment: 310,\n    ship: {\n        isClass: [AV_Nisshin]\n    },\n    bonus: {\n        fire: 3,\n        torpedo: 2,\n        aa: 1,\n        evasion: 1\n    }\n},\n\n// ------------------------------------------------------------------------\n\n// + 对水上電探\n{\n    list: [310, 'SurfaceRadar'],\n    equipments: {\n        hasID: [310],\n        hasSurfaceRadar: !0\n    },\n    ship: {\n        isClass: [CL_Yuubari2]\n    },\n    bonus: {\n        fire: 3,\n        torpedo: 2,\n        evasion: 2\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E4%B8%AD%E5%8F%A3%E5%BE%84%E4%B8%BB%E7%A0%B2/14cm%E9%80%A3%E8%A3%85%E7%A0%B2%E6%94%B9.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/中口径主砲/152mm／55 三連装速射砲.js":
/*!********************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/中口径主砲/152mm／55 三連装速射砲.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * @module\n * 装备额外属性收益\n * 340. **152mm/55 三連装速射砲**\n * 341. **152mm/55 三連装速射砲改**\n */\n\nvar _require = __webpack_require__(/*! ../../ship-classes */ \"./node_modules/kckit/src/data/ship-classes.js\"),\n    CL_Abruzzi = _require.CL_Abruzzi,\n    CL_Gotland = _require.CL_Gotland,\n    CLV_Gotland = _require.CLV_Gotland;\n\nmodule.exports = [\n// ========================================================================\n// 152mm/55 三連装速射砲\n// https://wikiwiki.jp/kancolle/152mm%EF%BC%8F55%20%E4%B8%89%E9%80%A3%E8%A3%85%E9%80%9F%E5%B0%84%E7%A0%B2\n// ========================================================================\n{\n    equipment: 340,\n    ship: {\n        isClass: [CL_Abruzzi]\n    },\n    bonus: {\n        fire: 1,\n        aa: 1,\n        evasion: 1\n    }\n},\n\n// ========================================================================\n// 152mm/55 三連装速射砲改\n// https://wikiwiki.jp/kancolle/152mm%EF%BC%8F55%20%E4%B8%89%E9%80%A3%E8%A3%85%E9%80%9F%E5%B0%84%E7%A0%B2%E6%94%B9\n// ========================================================================\n{\n    equipment: 341,\n    ship: {\n        isClass: [CL_Gotland, CLV_Gotland]\n    },\n    bonus: {\n        fire: 1,\n        aa: 1,\n        evasion: 1\n    }\n}, {\n    equipment: 341,\n    ship: {\n        isClass: [CL_Abruzzi]\n    },\n    bonus: {\n        fire: 2,\n        aa: 1,\n        evasion: 1\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E4%B8%AD%E5%8F%A3%E5%BE%84%E4%B8%BB%E7%A0%B2/152mm%EF%BC%8F55_%E4%B8%89%E9%80%A3%E8%A3%85%E9%80%9F%E5%B0%84%E7%A0%B2.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/中口径主砲/20.3cm(2号)連装砲.js":
/*!******************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/中口径主砲/20.3cm(2号)連装砲.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n/**\r\n * @module\r\n * 装备额外属性收益\r\n *\r\n *  90. 20.3cm(2号)連装砲\r\n *      https://wikiwiki.jp/kancolle/20.3cm%282%E5%8F%B7%29%E9%80%A3%E8%A3%85%E7%A0%B2\r\n *\r\n */\n\nvar _require = __webpack_require__(/*! ../../ship-classes */ \"./node_modules/kckit/src/data/ship-classes.js\"),\n    CA_Furutaka = _require.CA_Furutaka,\n    CA_Aoba = _require.CA_Aoba,\n    group_CAV_Navy_IJN = _require.group_CAV_Navy_IJN,\n    group_CA_Navy_IJN = _require.group_CA_Navy_IJN;\n\nmodule.exports = [{\n    equipment: 90,\n    ship: {\n        isID: [416, // 古鷹改二\n        417, // 加古改二\n        295]\n    },\n    bonus: {\n        fire: 2\n    }\n}, {\n    equipment: 90,\n    ship: {\n        isID: [264]\n    },\n    bonus: {\n        fire: 2,\n        aa: 1\n    }\n}, {\n    equipment: 90,\n    ship: {\n        isID: [142]\n    },\n    bonus: {\n        fire: 3,\n        evasion: 1\n    }\n}, {\n    equipment: 90,\n    ship: {\n        isClass: [].concat(_toConsumableArray(group_CA_Navy_IJN), _toConsumableArray(group_CAV_Navy_IJN)),\n        isNotID: [416, // 古鷹改二\n        417, // 加古改二\n        264, // 青葉改\n        295, // 衣笠改\n        142]\n    },\n    bonus: {\n        fire: 1\n    }\n},\n\n// ------------------------------------------------------------------------\n\n{\n    list: [90, 'SurfaceRadar'],\n    equipments: {\n        hasID: [90],\n        hasSurfaceRadar: !0\n    },\n    ship: {\n        isClass: [CA_Furutaka, CA_Aoba]\n    },\n    bonus: {\n        fire: 3,\n        torpedo: 2,\n        evasion: 2\n    }\n}, {\n    list: [90, 'AARadar'],\n    equipments: {\n        hasID: [90],\n        hasAARadar: !0\n    },\n    ship: {\n        isID: [264]\n    },\n    bonus: {\n        aa: 5,\n        evasion: 2\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E4%B8%AD%E5%8F%A3%E5%BE%84%E4%B8%BB%E7%A0%B2/20.3cm(2%E5%8F%B7)%E9%80%A3%E8%A3%85%E7%A0%B2.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/中口径主砲/20.3cm(3号)連装砲.js":
/*!******************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/中口径主砲/20.3cm(3号)連装砲.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * @module\r\n * 装备额外属性收益\r\n *\r\n *  50. 20.3cm(3号)連装砲\r\n *      https://wikiwiki.jp/kancolle/20.3cm%283%E5%8F%B7%29%E9%80%A3%E8%A3%85%E7%A0%B2\r\n *\r\n */\n\nvar _require = __webpack_require__(/*! ../../ship-classes */ \"./node_modules/kckit/src/data/ship-classes.js\"),\n    CAV_Mogami = _require.CAV_Mogami,\n    CAV_MogamiRevised = _require.CAV_MogamiRevised,\n    CAV_Tone = _require.CAV_Tone,\n    CA_Furutaka = _require.CA_Furutaka,\n    CA_Aoba = _require.CA_Aoba,\n    CA_Myoukou = _require.CA_Myoukou,\n    CA_Takao = _require.CA_Takao,\n    CA_Mogami = _require.CA_Mogami,\n    CA_Tone = _require.CA_Tone;\n\nmodule.exports = [{\n    equipment: 50,\n    ship: {\n        isClass: [CA_Mogami, CAV_Mogami, CAV_MogamiRevised, CA_Tone, CAV_Tone]\n    },\n    bonusCount: {\n        1: {\n            fire: 2,\n            evasion: 1\n        },\n        2: {\n            fire: 6,\n            evasion: 2\n        },\n        3: {\n            fire: 9,\n            evasion: 3\n        },\n        4: {\n            fire: 12,\n            evasion: 4\n        }\n    }\n}, {\n    equipment: 50,\n    ship: {\n        isClass: [CA_Myoukou, CA_Takao]\n    },\n    bonus: {\n        fire: 2,\n        evasion: 1\n    }\n}, {\n    equipment: 50,\n    ship: {\n        isClass: [CA_Furutaka, CA_Aoba]\n    },\n    bonus: {\n        fire: 1\n    }\n},\n\n// ------------------------------------------------------------------------\n\n{\n    list: [50, 'SurfaceRadar'],\n    equipments: {\n        hasID: [50],\n        hasSurfaceRadar: !0\n    },\n    ship: {\n        isClass: [CA_Furutaka, CA_Aoba]\n    },\n    bonus: {\n        fire: 1,\n        torpedo: 1,\n        evasion: 1\n    }\n}, {\n    list: [50, 'SurfaceRadar'],\n    equipments: {\n        hasID: [50],\n        hasSurfaceRadar: !0\n    },\n    ship: {\n        isClass: [CA_Myoukou, CA_Takao, CA_Mogami, CAV_Mogami, CAV_MogamiRevised, CA_Tone, CAV_Tone]\n    },\n    bonus: {\n        fire: 3,\n        torpedo: 2,\n        evasion: 2\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E4%B8%AD%E5%8F%A3%E5%BE%84%E4%B8%BB%E7%A0%B2/20.3cm(3%E5%8F%B7)%E9%80%A3%E8%A3%85%E7%A0%B2.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/中口径主砲/5inch連装両用砲(集中配備).js":
/*!*********************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/中口径主砲/5inch連装両用砲(集中配備).js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\n/**\n * @module\n * 装备额外属性收益\n *\n * 362. 5inch連装両用砲(集中配備)\n *      https://wikiwiki.jp/kancolle/5inch%E9%80%A3%E8%A3%85%E4%B8%A1%E7%94%A8%E7%A0%B2%28%E9%9B%86%E4%B8%AD%E9%85%8D%E5%82%99%29\n *\n * 363. GFCS Mk.37＋5inch連装両用砲(集中配備)\n *      https://wikiwiki.jp/kancolle/GFCS%20Mk.37%EF%BC%8B5inch%E9%80%A3%E8%A3%85%E4%B8%A1%E7%94%A8%E7%A0%B2%28%E9%9B%86%E4%B8%AD%E9%85%8D%E5%82%99%29\n *\n */\n\nvar _require = __webpack_require__(/*! ../../ship-classes */ \"./node_modules/kckit/src/data/ship-classes.js\"),\n    BB_Colorado = _require.BB_Colorado,\n    CA_Houston = _require.CA_Houston,\n    CL_Tenryuu = _require.CL_Tenryuu,\n    CL_Kuma = _require.CL_Kuma,\n    CLT_Kuma = _require.CLT_Kuma,\n    CL_Nagara = _require.CL_Nagara,\n    CL_Sendai = _require.CL_Sendai,\n    CL_Agano = _require.CL_Agano,\n    CL_Yuubari = _require.CL_Yuubari,\n    CL_Yuubari2 = _require.CL_Yuubari2,\n    CL_Ooyodo = _require.CL_Ooyodo,\n    CL_Gotland = _require.CL_Gotland,\n    CLV_Gotland = _require.CLV_Gotland,\n    CL_DeRuyter = _require.CL_DeRuyter,\n    CL_Atlanta = _require.CL_Atlanta,\n    CT_Katori = _require.CT_Katori;\n\nvar bonuses = [{\n    ship: {\n        isClass: [CL_Atlanta]\n    },\n    bonus: {\n        fire: 1,\n        aa: 3,\n        evasion: 2\n    }\n}, {\n    ship: {\n        isClass: [BB_Colorado, CA_Houston]\n    },\n    bonus: {\n        aa: 1,\n        evasion: 1\n    }\n}, {\n    ship: {\n        isClass: [CL_Agano, CL_Ooyodo, CL_DeRuyter]\n    },\n    bonus: {\n        aa: -1,\n        evasion: -2\n    }\n}, {\n    ship: {\n        isClass: [CLV_Gotland, CL_Gotland, CT_Katori]\n    },\n    bonus: {\n        fire: -2,\n        aa: -1,\n        evasion: -4\n    }\n}, {\n    ship: {\n        isClass: [CL_Kuma, CLT_Kuma, CL_Nagara, CL_Sendai]\n    },\n    bonus: {\n        fire: -3,\n        aa: -2,\n        evasion: -6\n    }\n}, {\n    ship: {\n        isClass: [CL_Tenryuu, CL_Yuubari, CL_Yuubari2]\n    },\n    bonus: {\n        fire: -3,\n        aa: -3,\n        evasion: -8\n    }\n}];\n\nvar result = [];\n[362, 363].forEach(function (equipment) {\n    bonuses.forEach(function (bonus) {\n        result.push(_extends({\n            equipment: equipment\n        }, bonus));\n    });\n});\nmodule.exports = result;\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E4%B8%AD%E5%8F%A3%E5%BE%84%E4%B8%BB%E7%A0%B2/5inch%E9%80%A3%E8%A3%85%E4%B8%A1%E7%94%A8%E7%A0%B2(%E9%9B%86%E4%B8%AD%E9%85%8D%E5%82%99).js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/中口径主砲/6inch三連装速射砲 Mk.16.js":
/*!**********************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/中口径主砲/6inch三連装速射砲 Mk.16.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n/**\n * @module\n * 装备额外属性收益\n *\n * 386. 6inch三連装速射砲 Mk.16\n *      https://wikiwiki.jp/kancolle/6inch%E4%B8%89%E9%80%A3%E8%A3%85%E9%80%9F%E5%B0%84%E7%A0%B2%20Mk.16\n *\n * 387. 6inch三連装速射砲 Mk.16 mod.2\n *      https://wikiwiki.jp/kancolle/6inch%E4%B8%89%E9%80%A3%E8%A3%85%E9%80%9F%E5%B0%84%E7%A0%B2%20Mk.16%20mod.2\n *\n */\n\nvar _require = __webpack_require__(/*! ../../ship-classes */ \"./node_modules/kckit/src/data/ship-classes.js\"),\n    group_BB_exclude_BC_Navy_USN = _require.group_BB_exclude_BC_Navy_USN,\n    group_CA_Navy_USN = _require.group_CA_Navy_USN,\n    group_CL_Navy_USN = _require.group_CL_Navy_USN;\n\n// ============================================================================\n\nvar MK16 = [{\n    equipment: 386,\n    ship: {\n        isClass: [].concat(_toConsumableArray(group_BB_exclude_BC_Navy_USN), _toConsumableArray(group_CA_Navy_USN), _toConsumableArray(group_CL_Navy_USN))\n    },\n    bonusImprove: {\n        0: {\n            fire: 1\n        },\n        2: {\n            fire: 2\n        },\n        7: {\n            fire: 3\n        }\n    }\n}];\n\n// ============================================================================\n\nvar MK16mod2 = [{\n    equipment: 387,\n    ship: {\n        isClass: [].concat(_toConsumableArray(group_BB_exclude_BC_Navy_USN), _toConsumableArray(group_CA_Navy_USN), _toConsumableArray(group_CL_Navy_USN))\n    },\n    bonusImprove: {\n        0: {\n            fire: 1\n        },\n        2: {\n            fire: 2\n        },\n        7: {\n            fire: 3\n        }\n    }\n}];\n\nmodule.exports = [].concat(MK16, MK16mod2);\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E4%B8%AD%E5%8F%A3%E5%BE%84%E4%B8%BB%E7%A0%B2/6inch%E4%B8%89%E9%80%A3%E8%A3%85%E9%80%9F%E5%B0%84%E7%A0%B2_Mk.16.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/中口径主砲/6inch連装速射砲.js":
/*!***************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/中口径主砲/6inch連装速射砲.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * @module\r\n * 装备额外属性收益\r\n *\r\n * 359. 6inch連装速射砲 Mk.XXI\r\n *      https://wikiwiki.jp/kancolle/6inch%E9%80%A3%E8%A3%85%E9%80%9F%E5%B0%84%E7%A0%B2%20Mk.XXI\r\n *\r\n */\n\nvar _require = __webpack_require__(/*! ../../ship-classes */ \"./node_modules/kckit/src/data/ship-classes.js\"),\n    CL_Perth = _require.CL_Perth,\n    CL_Yuubari = _require.CL_Yuubari,\n    CL_Yuubari2 = _require.CL_Yuubari2;\n\nmodule.exports = [{\n    equipment: 359,\n    ship: {\n        isClass: CL_Yuubari2\n    },\n    bonus: {\n        fire: 2,\n        aa: 2,\n        evasion: 1\n    }\n}, {\n    equipment: 359,\n    ship: {\n        isClass: CL_Yuubari\n    },\n    bonus: {\n        fire: 1,\n        aa: 1,\n        evasion: 1\n    }\n}, {\n    equipment: 359,\n    ship: {\n        isClass: CL_Perth\n    },\n    bonus: {\n        fire: 2,\n        aa: 2,\n        evasion: 1\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E4%B8%AD%E5%8F%A3%E5%BE%84%E4%B8%BB%E7%A0%B2/6inch%E9%80%A3%E8%A3%85%E9%80%9F%E5%B0%84%E7%A0%B2.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/中口径主砲/8inch三連装砲 Mk.9.js":
/*!*******************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/中口径主砲/8inch三連装砲 Mk.9.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * @module\r\n * 装备额外属性收益\r\n *\r\n * 356. 8inch三連装砲 Mk.9\r\n *      https://wikiwiki.jp/kancolle/8inch%E4%B8%89%E9%80%A3%E8%A3%85%E7%A0%B2%20Mk.9\r\n *\r\n * 357. 8inch三連装砲 Mk.9 mod.2\r\n *      https://wikiwiki.jp/kancolle/8inch%E4%B8%89%E9%80%A3%E8%A3%85%E7%A0%B2%20Mk.9%20mod.2\r\n *\r\n */\n\nvar _require = __webpack_require__(/*! ../../ship-classes */ \"./node_modules/kckit/src/data/ship-classes.js\"),\n    CA_Mogami = _require.CA_Mogami,\n    CAV_Mogami = _require.CAV_Mogami,\n    CAV_MogamiRevised = _require.CAV_MogamiRevised,\n    CA_Houston = _require.CA_Houston;\n\nvar result = [];\n[356, 357].forEach(function (equipment) {\n    result.push({\n        equipment: equipment,\n        ship: {\n            isClass: [CA_Mogami, CAV_Mogami, CAV_MogamiRevised]\n        },\n        bonus: {\n            fire: 1\n        }\n    });\n    result.push({\n        equipment: equipment,\n        ship: {\n            isClass: [CA_Houston]\n        },\n        bonus: {\n            fire: 2\n        }\n    });\n});\nmodule.exports = result;\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E4%B8%AD%E5%8F%A3%E5%BE%84%E4%B8%BB%E7%A0%B2/8inch%E4%B8%89%E9%80%A3%E8%A3%85%E7%A0%B2_Mk.9.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/中口径主砲/Bofors 15.2cm連装砲 Model 1930.js":
/*!********************************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/中口径主砲/Bofors 15.2cm連装砲 Model 1930.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * 装备额外属性收益 - Bofors 15.2cm連装砲 Model 1930\r\n *\r\n * @module\r\n */\n\n// https://wikiwiki.jp/kancolle/Bofors15.2cm%E9%80%A3%E8%A3%85%E7%A0%B2%20Model1930\n\nvar _require = __webpack_require__(/*! ../../ship-classes */ \"./node_modules/kckit/src/data/ship-classes.js\"),\n    CL_Kuma = _require.CL_Kuma,\n    CL_Nagara = _require.CL_Nagara,\n    CL_Sendai = _require.CL_Sendai,\n    CL_Agano = _require.CL_Agano,\n    CLT_Kuma = _require.CLT_Kuma,\n    CL_Gotland = _require.CL_Gotland,\n    CLV_Gotland = _require.CLV_Gotland;\n\nmodule.exports = [{\n    equipment: 303,\n    ship: {\n        isClass: [CL_Kuma, CL_Nagara, CL_Sendai, CL_Agano, CLT_Kuma]\n    },\n    bonus: {\n        fire: 1,\n        aa: 1\n    }\n}, {\n    equipment: 303,\n    ship: {\n        isClass: [CL_Gotland, CLV_Gotland]\n    },\n    bonus: {\n        fire: 1,\n        aa: 2,\n        evasion: 1\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E4%B8%AD%E5%8F%A3%E5%BE%84%E4%B8%BB%E7%A0%B2/Bofors_15.2cm%E9%80%A3%E8%A3%85%E7%A0%B2_Model_1930.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/中口径主砲/Bofors 15cm連装速射砲.js":
/*!*********************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/中口径主砲/Bofors 15cm連装速射砲.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * @module\n * 装备额外属性收益\n *\n * 360. Bofors 15cm連装速射砲 Mk.9 Model 1938\n *      https://wikiwiki.jp/kancolle/Bofors%2015cm%E9%80%A3%E8%A3%85%E9%80%9F%E5%B0%84%E7%A0%B2%20Mk.9%20Model%201938\n *\n * 361. Bofors 15cm連装速射砲 Mk.9改 + 単装速射砲 Mk.10改 Model 1938\n *      https://wikiwiki.jp/kancolle/Bofors%2015cm%E9%80%A3%E8%A3%85%E9%80%9F%E5%B0%84%E7%A0%B2%20Mk.9%E6%94%B9%EF%BC%8B%E5%8D%98%E8%A3%85%E9%80%9F%E5%B0%84%E7%A0%B2%20Mk.10%E6%94%B9%20Model%201938\n *\n */\n\nvar _require = __webpack_require__(/*! ../../ship-classes */ \"./node_modules/kckit/src/data/ship-classes.js\"),\n    CL_Agano = _require.CL_Agano,\n    CL_Gotland = _require.CL_Gotland,\n    CLV_Gotland = _require.CLV_Gotland,\n    CL_DeRuyter = _require.CL_DeRuyter;\n\nvar result = [];\n[360, 361].forEach(function (equipment) {\n    result.push({\n        equipment: equipment,\n        ship: {\n            isClass: [CL_Agano]\n        },\n        bonus: {\n            fire: 1,\n            aa: 1\n        }\n    });\n    result.push({\n        equipment: equipment,\n        ship: {\n            isClass: [CL_Gotland, CLV_Gotland]\n        },\n        bonus: {\n            fire: 2,\n            aa: 1,\n            evasion: 1\n        }\n    });\n    result.push({\n        equipment: equipment,\n        ship: {\n            isClass: [CL_DeRuyter]\n        },\n        bonus: {\n            fire: 2,\n            aa: 2,\n            evasion: 1\n        }\n    });\n});\nmodule.exports = result;\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E4%B8%AD%E5%8F%A3%E5%BE%84%E4%B8%BB%E7%A0%B2/Bofors_15cm%E9%80%A3%E8%A3%85%E9%80%9F%E5%B0%84%E7%A0%B2.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/副砲/usn.5inch.js":
/*!***********************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/副砲/usn.5inch.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n/**\r\n * @module\r\n * 装备额外属性收益\r\n *\r\n * 358. 5inch 単装高角砲群\r\n *      https://wikiwiki.jp/kancolle/5inch%20%E5%8D%98%E8%A3%85%E9%AB%98%E8%A7%92%E7%A0%B2%E7%BE%A4\r\n *\r\n */\nvar _require = __webpack_require__(/*! ../../ship-classes */ \"./node_modules/kckit/src/data/ship-classes.js\"),\n    group_CA_Navy_USN = _require.group_CA_Navy_USN,\n    group_BB_Navy_USN = _require.group_BB_Navy_USN,\n    group_CV_Navy_USN = _require.group_CV_Navy_USN,\n    group_BB_Navy_RN = _require.group_BB_Navy_RN,\n    group_CV_Navy_RN = _require.group_CV_Navy_RN;\n\nmodule.exports = [{\n    equipment: 358,\n    ship: {\n        isClass: group_CA_Navy_USN\n    },\n    bonus: {\n        fire: 2,\n        aa: 3,\n        evasion: 3\n    }\n}, {\n    equipment: 358,\n    ship: {\n        isClass: [].concat(_toConsumableArray(group_BB_Navy_USN), _toConsumableArray(group_CV_Navy_USN), _toConsumableArray(group_BB_Navy_RN), _toConsumableArray(group_CV_Navy_RN))\n    },\n    bonus: {\n        fire: 1,\n        aa: 1,\n        evasion: 1\n    }\n\n    // ------------------------------------------------------------------------\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E5%89%AF%E7%A0%B2/usn.5inch.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/増設バルジ/北方迷彩(＋北方装備).js":
/*!****************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/増設バルジ/北方迷彩(＋北方装備).js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * 装备额外属性收益 - 北方迷彩(＋北方装備)\r\n * \r\n * @module\r\n */\n\nvar _require = __webpack_require__(/*! ../../ships */ \"./node_modules/kckit/src/data/ships.js\"),\n    CL_KumaClassRemodelAll = _require.CL_KumaClassRemodelAll;\n\nmodule.exports = [{\n    equipment: 268,\n    ship: {\n        canEquip: [33]\n    },\n    bonusArea: {\n        North: {\n            armor: 3\n        }\n    }\n},\n\n// @ 球磨型 改\n{\n    equipment: 268,\n    ship: {\n        isID: CL_KumaClassRemodelAll\n    },\n    bonusCount: {\n        1: {\n            armor: 2,\n            evasion: 7\n        }\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E5%A2%97%E8%A8%AD%E3%83%90%E3%83%AB%E3%82%B8/%E5%8C%97%E6%96%B9%E8%BF%B7%E5%BD%A9(%EF%BC%8B%E5%8C%97%E6%96%B9%E8%A3%85%E5%82%99).js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/増設バルジ/新型高温高圧缶.js":
/*!************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/増設バルジ/新型高温高圧缶.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * @module\n * 装备额外属性收益\n *\n *  87. 新型高温高圧缶\n *      https://wikiwiki.jp/kancolle/%E6%96%B0%E5%9E%8B%E9%AB%98%E6%B8%A9%E9%AB%98%E5%9C%A7%E7%BC%B6\n *\n */\n\nvar _require = __webpack_require__(/*! ../../ship-ids */ \"./node_modules/kckit/src/data/ship-ids/index.js\"),\n    金剛改二丙 = _require.金剛改二丙,\n    比叡改二丙 = _require.比叡改二丙;\n\nmodule.exports = [{\n    equipment: 87,\n    ship: {\n        isID: [金剛改二丙, 比叡改二丙]\n    },\n    bonusImprove: {\n        0: {\n            torpedo: 1,\n            evasion: 2\n        },\n        8: {\n            torpedo: 2,\n            evasion: 3\n        },\n        10: {\n            fire: 1,\n            torpedo: 2,\n            evasion: 3\n        }\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E5%A2%97%E8%A8%AD%E3%83%90%E3%83%AB%E3%82%B8/%E6%96%B0%E5%9E%8B%E9%AB%98%E6%B8%A9%E9%AB%98%E5%9C%A7%E7%BC%B6.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/増設バルジ/艦本新設計 増設バルジ(大型艦).js":
/*!*********************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/増設バルジ/艦本新設計 増設バルジ(大型艦).js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * @module\n * 装备额外属性收益\n *\n * 204. 艦本新設計 増設バルジ(大型艦)\n *      https://wikiwiki.jp/kancolle/%E8%89%A6%E6%9C%AC%E6%96%B0%E8%A8%AD%E8%A8%88%20%E5%A2%97%E8%A8%AD%E3%83%90%E3%83%AB%E3%82%B8%28%E5%A4%A7%E5%9E%8B%E8%89%A6%29\n *\n */\n\nvar _require = __webpack_require__(/*! ../../ship-ids */ \"./node_modules/kckit/src/data/ship-ids/index.js\"),\n    金剛改二丙 = _require.金剛改二丙,\n    比叡改二丙 = _require.比叡改二丙;\n\nmodule.exports = [{\n    equipment: 204,\n    ship: {\n        isID: [金剛改二丙, 比叡改二丙]\n    },\n    bonusImprove: {\n        0: {\n            torpedo: 1,\n            armor: 1\n        },\n        7: {\n            torpedo: 1,\n            armor: 2\n        },\n        10: {\n            torpedo: 2,\n            armor: 2\n        }\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E5%A2%97%E8%A8%AD%E3%83%90%E3%83%AB%E3%82%B8/%E8%89%A6%E6%9C%AC%E6%96%B0%E8%A8%AD%E8%A8%88_%E5%A2%97%E8%A8%AD%E3%83%90%E3%83%AB%E3%82%B8(%E5%A4%A7%E5%9E%8B%E8%89%A6).js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/大口径主砲/16inch Mk.I三連装砲.js":
/*!********************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/大口径主砲/16inch Mk.I三連装砲.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\n/**\n * @module\n * 装备额外属性收益\n * 298. **16inch Mk.I三連装砲**\n * 299. **16inch Mk.I三連装砲＋AFCT改**\n * 300. **16inch Mk.I三連装砲改＋FCR type284**\n */\n\n// https://wikiwiki.jp/kancolle/16inch%20Mk.I%E4%B8%89%E9%80%A3%E8%A3%85%E7%A0%B2\n// https://wikiwiki.jp/kancolle/16inch%20Mk.I%E4%B8%89%E9%80%A3%E8%A3%85%E7%A0%B2%EF%BC%8BAFCT%E6%94%B9\n// https://wikiwiki.jp/kancolle/16inch%20Mk.I%E4%B8%89%E9%80%A3%E8%A3%85%E7%A0%B2%E6%94%B9%EF%BC%8BFCR%20type284\n\nvar _require = __webpack_require__(/*! ../../ship-classes */ \"./node_modules/kckit/src/data/ship-classes.js\"),\n    BB_QueenElizabeth = _require.BB_QueenElizabeth,\n    BB_Nelson = _require.BB_Nelson;\n\nvar _require2 = __webpack_require__(/*! ../../ships */ \"./node_modules/kckit/src/data/ships.js\"),\n    BB_KongouClass2ndRemodel = _require2.BB_KongouClass2ndRemodel;\n\nvar _require3 = __webpack_require__(/*! ../../ship-ids */ \"./node_modules/kckit/src/data/ship-ids/index.js\"),\n    比叡改二丙 = _require3.比叡改二丙;\n\nvar bonusNelson = {\n    ship: {\n        isClass: [BB_Nelson]\n    },\n    bonus: {\n        fire: 2,\n        armor: 1\n    }\n};\nvar bonusWarspite = {\n    ship: {\n        isClass: [BB_QueenElizabeth]\n    },\n    bonus: {\n        fire: 2,\n        armor: 1,\n        evasion: -2\n    }\n};\nvar bonusKongouKaiNi = {\n    ship: {\n        isID: BB_KongouClass2ndRemodel.filter(function (id) {\n            return id !== 591 && id !== 比叡改二丙;\n        } // exclude 金剛改二丙\n        )\n    },\n    bonus: {\n        fire: 1,\n        armor: 1,\n        evasion: -3\n    }\n};\n\nvar result = [];\n[298, 299, 300].forEach(function (equipmentId) {\n    result.push(_extends({\n        equipment: equipmentId\n    }, bonusKongouKaiNi));\n    result.push(_extends({\n        equipment: equipmentId\n    }, bonusWarspite));\n    result.push(_extends({\n        equipment: equipmentId\n    }, bonusNelson));\n});\n\nmodule.exports = result;\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E5%A4%A7%E5%8F%A3%E5%BE%84%E4%B8%BB%E7%A0%B2/16inch_Mk.I%E4%B8%89%E9%80%A3%E8%A3%85%E7%A0%B2.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/大口径主砲/16inch三連装砲 Mk.6.js":
/*!********************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/大口径主砲/16inch三連装砲 Mk.6.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n/**\n * @module\n * 装备额外属性收益\n *\n * 381. 16inch三連装砲 Mk.6\n *      https://wikiwiki.jp/kancolle/16inch%E4%B8%89%E9%80%A3%E8%A3%85%E7%A0%B2%20Mk.6\n *\n * 385. 16inch三連装砲 Mk.6 mod.2\n *      https://wikiwiki.jp/kancolle/16inch%E4%B8%89%E9%80%A3%E8%A3%85%E7%A0%B2%20Mk.6%20mod.2\n *\n */\n\nvar _require = __webpack_require__(/*! ../../ship-classes */ \"./node_modules/kckit/src/data/ship-classes.js\"),\n    BB_SouthDakota = _require.BB_SouthDakota,\n    BB_Kongou = _require.BB_Kongou,\n    BB_Kongou2 = _require.BB_Kongou2,\n    BB_Bismarck = _require.BB_Bismarck,\n    BB_VittorioVeneto = _require.BB_VittorioVeneto,\n    BB_Richelieu = _require.BB_Richelieu,\n    BB_Gangut = _require.BB_Gangut,\n    group_BB_Navy_USN = _require.group_BB_Navy_USN;\n\nvar group_BB_Navy_USN_exclude_SouthDakota = group_BB_Navy_USN.filter(function (id) {\n    return id !== BB_SouthDakota;\n});\n\n// ============================================================================\n\nvar MK6 = [{\n    equipment: 381,\n    ship: {\n        isClass: [].concat(_toConsumableArray(group_BB_Navy_USN_exclude_SouthDakota))\n    },\n    bonusImprove: {\n        0: {\n            fire: 1\n        },\n        6: {\n            fire: 2\n        }\n    }\n}, {\n    equipment: 381,\n    ship: {\n        isClass: [BB_SouthDakota]\n    },\n    bonusImprove: {\n        0: {\n            fire: 2\n        },\n        6: {\n            fire: 3\n        }\n    }\n}];\n\n// ============================================================================\n\nvar MK6mod2 = [{\n    equipment: 385,\n    ship: {\n        isClass: [BB_Kongou, BB_Kongou2, BB_Bismarck, BB_VittorioVeneto, BB_Richelieu, BB_Gangut]\n    },\n    bonus: {\n        fire: 1\n    }\n}, {\n    equipment: 385,\n    ship: {\n        isClass: [].concat(_toConsumableArray(group_BB_Navy_USN_exclude_SouthDakota))\n    },\n    bonusImprove: {\n        0: {\n            fire: 2\n        },\n        2: {\n            fire: 3\n        },\n        10: {\n            fire: 3,\n            armor: 1\n        }\n    }\n}, {\n    equipment: 385,\n    ship: {\n        isClass: [BB_SouthDakota]\n    },\n    bonusImprove: {\n        0: {\n            fire: 2,\n            armor: 1\n        },\n        2: {\n            fire: 3,\n            armor: 1\n        },\n        6: {\n            fire: 4,\n            armor: 1\n        },\n        10: {\n            fire: 4,\n            armor: 2\n        }\n    }\n}];\n\nmodule.exports = [].concat(MK6, MK6mod2);\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E5%A4%A7%E5%8F%A3%E5%BE%84%E4%B8%BB%E7%A0%B2/16inch%E4%B8%89%E9%80%A3%E8%A3%85%E7%A0%B2_Mk.6.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/大口径主砲/16inch連装砲 (USN).js":
/*!********************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/大口径主砲/16inch連装砲 (USN).js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n/**\n * @module\n * 装备额外属性收益\n * 330. **16inch Mk.I連装砲**\n * 331. **16inch Mk.V連装砲**\n * 332. **16inch Mk.VIII連装砲改**\n */\n\nvar _require = __webpack_require__(/*! ../../ships */ \"./node_modules/kckit/src/data/ships.js\"),\n    BB_NagatoClassRemodel = _require.BB_NagatoClassRemodel,\n    BB_NagatoClass2ndRemodel = _require.BB_NagatoClass2ndRemodel,\n    BB_NelsonClassRemodel = _require.BB_NelsonClassRemodel;\n\nvar _require2 = __webpack_require__(/*! ../../ship-series */ \"./node_modules/kckit/src/data/ship-series/index.js\"),\n    Colorado = _require2.Colorado;\n\nmodule.exports = [\n// ========================================================================\n// 16inch Mk.I連装砲\n// https://wikiwiki.jp/kancolle/16inch%20Mk.I%E9%80%A3%E8%A3%85%E7%A0%B2\n// ========================================================================\n{\n    equipment: 330,\n    ship: {\n        isID: [].concat(_toConsumableArray(BB_NagatoClassRemodel), _toConsumableArray(Colorado))\n    },\n    bonus: {\n        fire: 1\n    }\n}, {\n    equipment: 330,\n    ship: {\n        isID: [].concat(_toConsumableArray(BB_NagatoClass2ndRemodel), _toConsumableArray(BB_NelsonClassRemodel))\n    },\n    bonus: {\n        fire: 2\n    }\n},\n\n// ========================================================================\n// 16inch Mk.V連装砲\n// https://wikiwiki.jp/kancolle/16inch%20Mk.V%E9%80%A3%E8%A3%85%E7%A0%B2\n// ========================================================================\n{\n    equipment: 331,\n    ship: {\n        isID: [].concat(_toConsumableArray(BB_NagatoClassRemodel), [601]) // Colorado\n    },\n    bonus: {\n        fire: 1\n    }\n}, {\n    equipment: 331,\n    ship: {\n        isID: [].concat(_toConsumableArray(BB_NagatoClass2ndRemodel), _toConsumableArray(BB_NelsonClassRemodel))\n    },\n    bonus: {\n        fire: 2\n    }\n}, {\n    equipment: 331,\n    ship: {\n        isID: [1496] // Colorado改\n    },\n    bonus: {\n        fire: 2,\n        evasion: 1\n    }\n},\n\n// ========================================================================\n// 16inch Mk.VIII連装砲改\n// https://wikiwiki.jp/kancolle/16inch%20Mk.VIII%E9%80%A3%E8%A3%85%E7%A0%B2%E6%94%B9\n// ========================================================================\n{\n    equipment: 332,\n    ship: {\n        isID: [].concat(_toConsumableArray(BB_NagatoClassRemodel), [601]) // Colorado\n    },\n    bonus: {\n        fire: 1\n    }\n}, {\n    equipment: 332,\n    ship: {\n        isID: [].concat(_toConsumableArray(BB_NagatoClass2ndRemodel), _toConsumableArray(BB_NelsonClassRemodel))\n    },\n    bonus: {\n        fire: 2\n    }\n}, {\n    equipment: 332,\n    ship: {\n        isID: [1496] // Colorado改\n    },\n    bonus: {\n        fire: 2,\n        aa: 1\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E5%A4%A7%E5%8F%A3%E5%BE%84%E4%B8%BB%E7%A0%B2/16inch%E9%80%A3%E8%A3%85%E7%A0%B2_(USN).js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/大口径主砲/35.6cm三連装砲改(ダズル迷彩仕様).js":
/*!*************************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/大口径主砲/35.6cm三連装砲改(ダズル迷彩仕様).js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * @module\n * 装备额外属性收益\n * 289. **35.6cm三連装砲改(ダズル迷彩仕様)**\n */\n\n// https://wikiwiki.jp/kancolle/35.6cm%E4%B8%89%E9%80%A3%E8%A3%85%E7%A0%B2%E6%94%B9%28%E3%83%80%E3%82%BA%E3%83%AB%E8%BF%B7%E5%BD%A9%E4%BB%95%E6%A7%98%29\n\nmodule.exports = [\n// 金剛改二丙 ※補正なし\n// 比叡改二丙 ※補正なし\n\n{\n    equipment: 289,\n    ship: {\n        isID: [149]\n    },\n    bonus: {\n        fire: 2,\n        aa: 1\n    }\n},\n\n// @ 比叡改二 / 霧島改二\n{\n    equipment: 289,\n    ship: {\n        isID: [150, 152]\n    },\n    bonus: {\n        fire: 1\n    }\n},\n\n// @ 榛名改二\n{\n    equipment: 289,\n    ship: {\n        isID: [151]\n    },\n    bonus: {\n        fire: 2,\n        aa: 2,\n        evasion: 2\n    }\n},\n\n// ------------------------------------------------------------------------\n\n// @ 金剛型 改二\n{\n    list: [289, 'SurfaceRadar'],\n    equipments: {\n        hasID: [289],\n        hasSurfaceRadar: !0\n    },\n    ship: {\n        isID: [149, // 金剛改二\n        151]\n    },\n    bonus: {\n        fire: 2,\n        evasion: 2\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E5%A4%A7%E5%8F%A3%E5%BE%84%E4%B8%BB%E7%A0%B2/35.6cm%E4%B8%89%E9%80%A3%E8%A3%85%E7%A0%B2%E6%94%B9(%E3%83%80%E3%82%BA%E3%83%AB%E8%BF%B7%E5%BD%A9%E4%BB%95%E6%A7%98).js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/大口径主砲/35.6cm連装砲(ダズル迷彩).js":
/*!*********************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/大口径主砲/35.6cm連装砲(ダズル迷彩).js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * @module\n * 装备额外属性收益\n * 104. **35.6cm連装砲(ダズル迷彩)**\n */\n\n// https://wikiwiki.jp/kancolle/35.6cm%E9%80%A3%E8%A3%85%E7%A0%B2%28%E3%83%80%E3%82%BA%E3%83%AB%E8%BF%B7%E5%BD%A9%29\n\nmodule.exports = [\n// 金剛改二丙 ※補正なし\n// 比叡改二丙 ※補正なし\n\n{\n    equipment: 104,\n    ship: {\n        isID: [149]\n    },\n    bonus: {\n        fire: 2\n    }\n},\n\n// @ 比叡改二 / 霧島改二\n{\n    equipment: 104,\n    ship: {\n        isID: [150, 152]\n    },\n    bonus: {\n        fire: 1\n    }\n},\n\n// @ 榛名改二\n{\n    equipment: 104,\n    ship: {\n        isID: [151]\n    },\n    bonus: {\n        fire: 2,\n        aa: 1,\n        evasion: 2\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E5%A4%A7%E5%8F%A3%E5%BE%84%E4%B8%BB%E7%A0%B2/35.6cm%E9%80%A3%E8%A3%85%E7%A0%B2(%E3%83%80%E3%82%BA%E3%83%AB%E8%BF%B7%E5%BD%A9).js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/大口径主砲/35.6cm連装砲改.js":
/*!***************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/大口径主砲/35.6cm連装砲改.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n/**\n * @module\n * 装备额外属性收益\n * 328. **35.6cm連装砲改**\n */\n\n// https://wikiwiki.jp/kancolle/35.6cm%E9%80%A3%E8%A3%85%E7%A0%B2%E6%94%B9\n\nvar _require = __webpack_require__(/*! ../../ship-series */ \"./node_modules/kckit/src/data/ship-series/index.js\"),\n    Kongou = _require.Kongou,\n    Hiei = _require.Hiei,\n    Haruna = _require.Haruna,\n    Kirishima = _require.Kirishima,\n    Ise = _require.Ise,\n    Hyuuga = _require.Hyuuga,\n    Fusou = _require.Fusou,\n    Yamashiro = _require.Yamashiro;\n\nvar _require2 = __webpack_require__(/*! ../../ships */ \"./node_modules/kckit/src/data/ships.js\"),\n    BB_KongouClassRemodelAll = _require2.BB_KongouClassRemodelAll;\n\nvar _require3 = __webpack_require__(/*! ../../ship-ids */ \"./node_modules/kckit/src/data/ship-ids/index.js\"),\n    比叡改二丙 = _require3.比叡改二丙;\n\nmodule.exports = [\n// @ 金剛型(未改造) & 扶桑型 & 伊勢型\n{\n    equipment: 328,\n    ship: {\n        isID: [].concat(_toConsumableArray(Kongou), _toConsumableArray(Hiei), _toConsumableArray(Haruna), _toConsumableArray(Kirishima), _toConsumableArray(Ise), _toConsumableArray(Hyuuga), _toConsumableArray(Fusou), _toConsumableArray(Yamashiro)).filter(function (id) {\n            return !BB_KongouClassRemodelAll.includes(id);\n        })\n    },\n    bonus: {\n        fire: 1\n    }\n},\n\n// @ 金剛型改/改二\n{\n    equipment: 328,\n    ship: {\n        isID: BB_KongouClassRemodelAll.filter(function (id) {\n            return id !== 591 && id !== 比叡改二丙;\n        })\n    },\n    bonus: {\n        fire: 2,\n        evasion: 1\n    }\n}, {\n    equipment: 328,\n    ship: {\n        isID: [591]\n    },\n    bonus: {\n        fire: 3,\n        torpedo: 1,\n        evasion: 1\n    }\n}, {\n    equipment: 328,\n    ship: {\n        isID: [比叡改二丙]\n    },\n    bonus: {\n        fire: 3,\n        aa: 1,\n        evasion: 1\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E5%A4%A7%E5%8F%A3%E5%BE%84%E4%B8%BB%E7%A0%B2/35.6cm%E9%80%A3%E8%A3%85%E7%A0%B2%E6%94%B9.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/大口径主砲/35.6cm連装砲改二.js":
/*!****************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/大口径主砲/35.6cm連装砲改二.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n/**\n * @module\n * 装备额外属性收益\n * 329. **35.6cm連装砲改二**\n */\n\n// https://wikiwiki.jp/kancolle/35.6cm%E9%80%A3%E8%A3%85%E7%A0%B2%E6%94%B9%E4%BA%8C\n\nvar _require = __webpack_require__(/*! ../../ship-series */ \"./node_modules/kckit/src/data/ship-series/index.js\"),\n    Kongou = _require.Kongou,\n    Hiei = _require.Hiei,\n    Haruna = _require.Haruna,\n    Kirishima = _require.Kirishima,\n    Ise = _require.Ise,\n    Hyuuga = _require.Hyuuga,\n    Fusou = _require.Fusou,\n    Yamashiro = _require.Yamashiro;\n\nvar _require2 = __webpack_require__(/*! ../../ships */ \"./node_modules/kckit/src/data/ships.js\"),\n    BB_KongouClassRemodel = _require2.BB_KongouClassRemodel,\n    BB_KongouClass2ndRemodel = _require2.BB_KongouClass2ndRemodel,\n    BB_KongouClassRemodelAll = _require2.BB_KongouClassRemodelAll;\n\nvar _require3 = __webpack_require__(/*! ../../ship-ids */ \"./node_modules/kckit/src/data/ship-ids/index.js\"),\n    比叡改二丙 = _require3.比叡改二丙;\n\nmodule.exports = [\n// @ 金剛型(未改造) & 扶桑型 & 伊勢型\n{\n    equipment: 329,\n    ship: {\n        isID: [].concat(_toConsumableArray(Kongou), _toConsumableArray(Hiei), _toConsumableArray(Haruna), _toConsumableArray(Kirishima), _toConsumableArray(Ise), _toConsumableArray(Hyuuga), _toConsumableArray(Fusou), _toConsumableArray(Yamashiro)).filter(function (id) {\n            return !BB_KongouClassRemodelAll.includes(id);\n        })\n    },\n    bonus: {\n        fire: 1\n    }\n},\n\n// @ 金剛型改\n{\n    equipment: 329,\n    ship: {\n        isID: BB_KongouClassRemodel\n    },\n    bonus: {\n        fire: 2,\n        evasion: 1\n    }\n},\n\n// @ 金剛型改二\n{\n    equipment: 329,\n    ship: {\n        isID: BB_KongouClass2ndRemodel.filter(function (id) {\n            return id !== 591 && id !== 比叡改二丙;\n        })\n    },\n    bonus: {\n        fire: 3,\n        aa: 1,\n        evasion: 1\n    }\n},\n\n// @ 金剛型改二\n{\n    equipment: 329,\n    ship: {\n        isID: [591, // 金剛改二丙\n        比叡改二丙]\n    },\n    bonus: {\n        fire: 4,\n        torpedo: 2,\n        aa: 1,\n        evasion: 1\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E5%A4%A7%E5%8F%A3%E5%BE%84%E4%B8%BB%E7%A0%B2/35.6cm%E9%80%A3%E8%A3%85%E7%A0%B2%E6%94%B9%E4%BA%8C.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/大口径主砲/41cm三連装砲改二.js":
/*!***************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/大口径主砲/41cm三連装砲改二.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * 装备额外属性收益 - 41cm三連装砲改二\r\n *\r\n * @module\r\n */\n\nvar _require = __webpack_require__(/*! ../../ships */ \"./node_modules/kckit/src/data/ships.js\"),\n    BB_IseClassRemodel = _require.BB_IseClassRemodel,\n    BB_IseClassRemodelAll = _require.BB_IseClassRemodelAll,\n    BB_FusouClass2ndRemodel = _require.BB_FusouClass2ndRemodel;\n\nmodule.exports = [\n// @ 扶桑型 改二\n{\n    equipment: 290,\n    ship: {\n        isID: BB_FusouClass2ndRemodel\n    },\n    bonus: {\n        fire: 1\n    }\n},\n\n// @ 伊勢型 改\n{\n    equipment: 290,\n    ship: {\n        isID: BB_IseClassRemodel\n    },\n    bonus: {\n        fire: 2,\n        aa: 2,\n        evasion: 1\n    }\n}, {\n    equipment: 290,\n    ship: {\n        isID: [553]\n    },\n    bonus: {\n        fire: 3,\n        aa: 2,\n        evasion: 1,\n        hit: 3\n    }\n}, {\n    equipment: 290,\n    ship: {\n        isID: [554]\n    },\n    bonus: {\n        fire: 3,\n        aa: 2,\n        evasion: 2,\n        hit: 3\n    }\n},\n\n// ------------------------------------------------------------------------\n\n// + 对空電探\n// @ 伊勢型 改+\n{\n    list: [290, 'AARadar'],\n    equipments: {\n        hasID: [290],\n        hasAARadar: !0\n    },\n    ship: {\n        isID: BB_IseClassRemodelAll\n    },\n    bonus: {\n        aa: 2,\n        evasion: 3\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E5%A4%A7%E5%8F%A3%E5%BE%84%E4%B8%BB%E7%A0%B2/41cm%E4%B8%89%E9%80%A3%E8%A3%85%E7%A0%B2%E6%94%B9%E4%BA%8C.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/大口径主砲/41cm連装砲改二.js":
/*!**************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/大口径主砲/41cm連装砲改二.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n/**\r\n * @module\r\n * 装备额外属性收益\r\n *\r\n * 318. 41cm連装砲改二\r\n *      https://wikiwiki.jp/kancolle/41cm%E9%80%A3%E8%A3%85%E7%A0%B2%E6%94%B9%E4%BA%8C\r\n *\r\n */\n\nvar _require = __webpack_require__(/*! ../../ships */ \"./node_modules/kckit/src/data/ships.js\"),\n    BB_NagatoClass2ndRemodel = _require.BB_NagatoClass2ndRemodel,\n    BB_IseClassRemodel = _require.BB_IseClassRemodel,\n    BB_IseClassRemodelAll = _require.BB_IseClassRemodelAll,\n    BB_FusouClass2ndRemodel = _require.BB_FusouClass2ndRemodel;\n\nmodule.exports = [{\n    equipment: 318,\n    ship: {\n        isID: BB_FusouClass2ndRemodel\n    },\n    bonus: {\n        fire: 1\n    }\n}, {\n    equipment: 318,\n    ship: {\n        isID: BB_IseClassRemodel\n    },\n    bonus: {\n        fire: 2,\n        aa: 2,\n        evasion: 2\n    }\n}, {\n    equipment: 318,\n    ship: {\n        isID: [553]\n    },\n    bonus: {\n        fire: 2,\n        aa: 2,\n        evasion: 2,\n        hit: 3\n    }\n}, {\n    equipment: 318,\n    ship: {\n        isID: [554]\n    },\n    bonus: {\n        fire: 3,\n        aa: 2,\n        evasion: 2,\n        hit: 3\n    }\n}, {\n    equipment: 318,\n    ship: {\n        isID: BB_NagatoClass2ndRemodel\n    },\n    bonus: {\n        fire: 3,\n        aa: 2,\n        evasion: 1,\n        hit: 2\n    }\n},\n\n// ------------------------------------------------------------------------\n\n{\n    list: [318, 290],\n    equipments: {\n        hasID: [318, 290]\n    },\n    ship: {\n        isID: [554]\n    },\n    bonus: {\n        fire: 1,\n        evasion: 2,\n        armor: 1,\n        hit: 1\n    }\n}, {\n    list: [318, 290],\n    equipments: {\n        hasID: [318, 290]\n    },\n    ship: {\n        isID: [553].concat(_toConsumableArray(BB_IseClassRemodel))\n    },\n    bonus: {\n        evasion: 2,\n        armor: 1\n    }\n}, {\n    list: [318, 290],\n    equipments: {\n        hasID: [318, 290]\n    },\n    ship: {\n        isID: BB_NagatoClass2ndRemodel\n    },\n    bonus: {\n        fire: 2,\n        evasion: 2,\n        armor: 1,\n        hit: 1\n    }\n}, {\n    list: [318, 'AARadar'],\n    equipments: {\n        hasID: [318],\n        hasAARadar: !0\n    },\n    ship: {\n        isID: BB_IseClassRemodelAll\n    },\n    bonus: {\n        aa: 2,\n        evasion: 3,\n        hit: 1\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E5%A4%A7%E5%8F%A3%E5%BE%84%E4%B8%BB%E7%A0%B2/41cm%E9%80%A3%E8%A3%85%E7%A0%B2%E6%94%B9%E4%BA%8C.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/対潜兵装/RUR-4A.js":
/*!**********************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/対潜兵装/RUR-4A.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n/**\n * @module\n * 装备额外属性收益\n *\n * 377. RUR-4A Weapon Alpha改\n *      https://wikiwiki.jp/kancolle/RUR-4A%20Weapon%20Alpha%E6%94%B9\n *\n */\n\nvar _require = __webpack_require__(/*! ../../ship-ids */ \"./node_modules/kckit/src/data/ship-ids/index.js\"),\n    FletcherMkII = _require['Fletcher Mk.II'];\n\nvar _require2 = __webpack_require__(/*! ../../ship-classes */ \"./node_modules/kckit/src/data/ship-classes.js\"),\n    group_CL_Navy_USN = _require2.group_CL_Navy_USN,\n    group_DD_Navy_USN = _require2.group_DD_Navy_USN,\n    group_DD_Navy_RN = _require2.group_DD_Navy_RN,\n    group_CL_Navy_RAN = _require2.group_CL_Navy_RAN;\n\nmodule.exports = [{\n    equipment: 377,\n    ship: {\n        isID: [FletcherMkII]\n    },\n    bonus: {\n        asw: 3,\n        evasion: 3\n    }\n}, {\n    equipment: 377,\n    ship: {\n        isClass: [].concat(_toConsumableArray(group_CL_Navy_USN), _toConsumableArray(group_DD_Navy_USN)),\n        isNotID: [FletcherMkII]\n    },\n    bonus: {\n        asw: 2,\n        evasion: 1\n    }\n}, {\n    equipment: 377,\n    ship: {\n        isClass: [].concat(_toConsumableArray(group_DD_Navy_RN), _toConsumableArray(group_CL_Navy_RAN))\n    },\n    bonus: {\n        asw: 1,\n        evasion: 1\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E5%AF%BE%E6%BD%9C%E5%85%B5%E8%A3%85/RUR-4A.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/対潜兵装/三式水中探信儀.js":
/*!***********************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/対潜兵装/三式水中探信儀.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n/**\n * 装备额外属性收益\n * 47. **三式水中探信儀**\n *\n * @module\n */\n\n// https://wikiwiki.jp/kancolle/%E4%B8%89%E5%BC%8F%E6%B0%B4%E4%B8%AD%E6%8E%A2%E4%BF%A1%E5%84%80\n\nvar _require = __webpack_require__(/*! ../../ships */ \"./node_modules/kckit/src/data/ships.js\"),\n    Kamikaze = _require.Kamikaze,\n    Harukaze = _require.Harukaze,\n    Ushio = _require.Ushio,\n    Ikazuchi = _require.Ikazuchi,\n    Shigure = _require.Shigure,\n    Yamakaze = _require.Yamakaze,\n    Yamagumo = _require.Yamagumo,\n    Isokaze = _require.Isokaze,\n    Hamakaze = _require.Hamakaze,\n    Maikaze = _require.Maikaze,\n    Kishinami = _require.Kishinami,\n    Asashimo = _require.Asashimo;\n\nmodule.exports = [{\n    equipment: 47,\n    ship: {\n        isID: [].concat(_toConsumableArray(Ushio), _toConsumableArray(Ikazuchi), _toConsumableArray(Yamagumo), _toConsumableArray(Isokaze), _toConsumableArray(Hamakaze), _toConsumableArray(Kishinami))\n    },\n    bonus: {\n        evasion: 2,\n        asw: 2\n    }\n}, {\n    equipment: 47,\n    ship: {\n        isID: [].concat(_toConsumableArray(Kamikaze), _toConsumableArray(Harukaze), _toConsumableArray(Shigure), _toConsumableArray(Yamakaze), _toConsumableArray(Maikaze), _toConsumableArray(Asashimo))\n    },\n    bonus: {\n        fire: 1,\n        evasion: 2,\n        asw: 3\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E5%AF%BE%E6%BD%9C%E5%85%B5%E8%A3%85/%E4%B8%89%E5%BC%8F%E6%B0%B4%E4%B8%AD%E6%8E%A2%E4%BF%A1%E5%84%80.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/対潜兵装/三式爆雷投射機 集中配備.js":
/*!****************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/対潜兵装/三式爆雷投射機 集中配備.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * @module\n * 装备额外属性收益\n *\n * 287. 三式爆雷投射機 集中配備\n *      https://wikiwiki.jp/kancolle/%E4%B8%89%E5%BC%8F%E7%88%86%E9%9B%B7%E6%8A%95%E5%B0%84%E6%A9%9F%20%E9%9B%86%E4%B8%AD%E9%85%8D%E5%82%99\n *\n */\n\nvar _require = __webpack_require__(/*! ../../ship-ids */ \"./node_modules/kckit/src/data/ship-ids/index.js\"),\n    由良改二 = _require.由良改二,\n    那珂改二 = _require.那珂改二,\n    五十鈴改二 = _require.五十鈴改二,\n    夕張改二丁 = _require.夕張改二丁;\n\n// ============================================================================\n\nmodule.exports = [{\n    equipment: 287,\n    ship: {\n        isID: [五十鈴改二, 由良改二, 那珂改二, 夕張改二丁]\n    },\n    bonus: {\n        asw: 1,\n        evasion: 1\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E5%AF%BE%E6%BD%9C%E5%85%B5%E8%A3%85/%E4%B8%89%E5%BC%8F%E7%88%86%E9%9B%B7%E6%8A%95%E5%B0%84%E6%A9%9F_%E9%9B%86%E4%B8%AD%E9%85%8D%E5%82%99.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/対潜兵装/四式水中聴音機.js":
/*!***********************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/対潜兵装/四式水中聴音機.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * @module\n * 装备额外属性收益\n *\n * 149. 四式水中聴音機\n *      https://wikiwiki.jp/kancolle/%E4%B8%80%E5%BC%8F%E5%BE%B9%E7%94%B2%E5%BC%BE%E6%94%B9\n *\n */\n\nvar _require = __webpack_require__(/*! ../../ship-classes */ \"./node_modules/kckit/src/data/ship-classes.js\"),\n    DD_Akizuki = _require.DD_Akizuki;\n\nmodule.exports = [{\n    equipment: 149,\n    ship: {\n        isID: [624]\n    },\n    bonus: {\n        asw: 3,\n        evasion: 5\n    }\n}, {\n    equipment: 149,\n    ship: {\n        isID: [622, // 夕張改二\n        623, // 夕張改二特\n        141, // 五十鈴改二\n        488, // 由良改二\n        160]\n    },\n    bonus: {\n        asw: 1,\n        evasion: 3\n    }\n}, {\n    equipment: 149,\n    ship: {\n        isClass: [DD_Akizuki]\n    },\n    bonus: {\n        asw: 1,\n        evasion: 2\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E5%AF%BE%E6%BD%9C%E5%85%B5%E8%A3%85/%E5%9B%9B%E5%BC%8F%E6%B0%B4%E4%B8%AD%E8%81%B4%E9%9F%B3%E6%A9%9F.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/対潜兵装/対潜短魚雷.js":
/*!*********************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/対潜兵装/対潜短魚雷.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n/**\n * @module\n * 装备额外属性收益\n *\n * 378. 対潜短魚雷(試作初期型)\n *      https://wikiwiki.jp/kancolle/%E5%AF%BE%E6%BD%9C%E7%9F%AD%E9%AD%9A%E9%9B%B7%28%E8%A9%A6%E4%BD%9C%E5%88%9D%E6%9C%9F%E5%9E%8B%29\n *\n */\n\nvar _require = __webpack_require__(/*! ../../ship-ids */ \"./node_modules/kckit/src/data/ship-ids/index.js\"),\n    FletcherMkII = _require['Fletcher Mk.II'];\n\nvar _require2 = __webpack_require__(/*! ../../ship-classes */ \"./node_modules/kckit/src/data/ship-classes.js\"),\n    group_CL_Navy_USN = _require2.group_CL_Navy_USN,\n    group_DD_Navy_USN = _require2.group_DD_Navy_USN,\n    group_DD_Navy_RN = _require2.group_DD_Navy_RN,\n    group_CL_Navy_RAN = _require2.group_CL_Navy_RAN;\n\nmodule.exports = [{\n    equipment: 378,\n    ship: {\n        isID: [FletcherMkII]\n    },\n    bonus: {\n        asw: 4,\n        evasion: 2\n    }\n}, {\n    equipment: 378,\n    ship: {\n        isClass: [].concat(_toConsumableArray(group_CL_Navy_USN), _toConsumableArray(group_DD_Navy_USN)),\n        isNotID: [FletcherMkII]\n    },\n    bonus: {\n        asw: 3,\n        evasion: 1\n    }\n}, {\n    equipment: 378,\n    ship: {\n        isClass: [].concat(_toConsumableArray(group_DD_Navy_RN))\n    },\n    bonus: {\n        asw: 2,\n        evasion: 1\n    }\n}, {\n    equipment: 378,\n    ship: {\n        isClass: [].concat(_toConsumableArray(group_CL_Navy_RAN))\n    },\n    bonus: {\n        asw: 1,\n        evasion: 1\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E5%AF%BE%E6%BD%9C%E5%85%B5%E8%A3%85/%E5%AF%BE%E6%BD%9C%E7%9F%AD%E9%AD%9A%E9%9B%B7.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/対潜兵装/試製15cm9連装対潜噴進砲.js":
/*!******************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/対潜兵装/試製15cm9連装対潜噴進砲.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * @module\n * 装备额外属性收益\n *\n * 288. 試製15cm9連装対潜噴進砲\n *      https://wikiwiki.jp/kancolle/%E8%A9%A6%E8%A3%BD15cm9%E9%80%A3%E8%A3%85%E5%AF%BE%E6%BD%9C%E5%99%B4%E9%80%B2%E7%A0%B2\n *\n */\n\nvar _require = __webpack_require__(/*! ../../ship-ids */ \"./node_modules/kckit/src/data/ship-ids/index.js\"),\n    由良改二 = _require.由良改二,\n    那珂改二 = _require.那珂改二,\n    五十鈴改二 = _require.五十鈴改二,\n    夕張改二丁 = _require.夕張改二丁;\n\n// ============================================================================\n\nmodule.exports = [{\n    equipment: 288,\n    ship: {\n        isID: [夕張改二丁]\n    },\n    bonus: {\n        fire: 1,\n        asw: 3,\n        evasion: 5\n    }\n}, {\n    equipment: 288,\n    ship: {\n        isID: [五十鈴改二, 由良改二, 那珂改二]\n    },\n    bonus: {\n        asw: 2,\n        evasion: 1\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E5%AF%BE%E6%BD%9C%E5%85%B5%E8%A3%85/%E8%A9%A6%E8%A3%BD15cm9%E9%80%A3%E8%A3%85%E5%AF%BE%E6%BD%9C%E5%99%B4%E9%80%B2%E7%A0%B2.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/対空機銃/20連装7inch UP Rocket Launchers.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/対空機銃/20連装7inch UP Rocket Launchers.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * 装备额外属性收益 - 20連装7inch UP Rocket Launchers\r\n * \r\n * @module\r\n */\n\n// https://wikiwiki.jp/kancolle/20%E9%80%A3%E8%A3%857inch%20UP%20Rocket%20Launchers\n\nvar _require = __webpack_require__(/*! ../../ship-classes */ \"./node_modules/kckit/src/data/ship-classes.js\"),\n    group_Navy_RN = _require.group_Navy_RN;\n\nmodule.exports = [{\n    equipment: 301,\n    ship: {\n        isClass: group_Navy_RN\n    },\n    bonus: {\n        aa: 2,\n        evasion: 1,\n        armor: 1\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E5%AF%BE%E7%A9%BA%E6%A9%9F%E9%8A%83/20%E9%80%A3%E8%A3%857inch_UP_Rocket_Launchers.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/小口径主砲/12.7cm単装高角砲(後期型).js":
/*!*********************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/小口径主砲/12.7cm単装高角砲(後期型).js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * @module\n * 装备额外属性收益\n * 229. **12.7cm単装高角砲(後期型)**\n */\n\nvar _require = __webpack_require__(/*! ../../ships */ \"./node_modules/kckit/src/data/ships.js\"),\n    CL_NagaraClass2ndRemodel = _require.CL_NagaraClass2ndRemodel;\n\nvar _require2 = __webpack_require__(/*! ../../ship-ids */ \"./node_modules/kckit/src/data/ship-ids/index.js\"),\n    由良 = _require2.由良,\n    由良改 = _require2.由良改,\n    由良改二 = _require2.由良改二,\n    鬼怒 = _require2.鬼怒,\n    鬼怒改 = _require2.鬼怒改,\n    鬼怒改二 = _require2.鬼怒改二,\n    那珂 = _require2.那珂,\n    那珂改 = _require2.那珂改,\n    那珂改二 = _require2.那珂改二,\n    夕張改二 = _require2.夕張改二,\n    夕張改二特 = _require2.夕張改二特,\n    夕張改二丁 = _require2.夕張改二丁;\n\nmodule.exports = [\n// @ 海防艦\n{\n    equipment: 229,\n    ship: {\n        isID: [夕張改二, 夕張改二特, 夕張改二丁]\n    },\n    bonus: {\n        fire: 1,\n        aa: 1\n    }\n},\n\n// @ 海防艦\n{\n    equipment: 229,\n    ship: {\n        isType: [31]\n    },\n    bonusImprove: {\n        7: {\n            fire: 1,\n            aa: 1\n        }\n    }\n},\n\n// @ 神風型 / 睦月型\n{\n    equipment: 229,\n    ship: {\n        isClass: [84, 12]\n    },\n    bonusImprove: {\n        7: {\n            fire: 1,\n            aa: 1\n        }\n    }\n}, {\n    equipment: 229,\n    ship: {\n        isID: [鬼怒, 那珂]\n    },\n    bonusImprove: {\n        7: {\n            fire: 2\n        }\n    }\n}, {\n    equipment: 229,\n    ship: {\n        isID: [由良, 鬼怒改, 那珂改]\n    },\n    bonusImprove: {\n        7: {\n            fire: 2,\n            aa: 1\n        }\n    }\n}, {\n    equipment: 229,\n    ship: {\n        isID: [由良改, 鬼怒改二, 那珂改二]\n    },\n    bonusImprove: {\n        7: {\n            fire: 2,\n            aa: 2\n        }\n    }\n},\n\n// @ 由良改二\n{\n    equipment: 229,\n    ship: {\n        isID: [由良改二]\n    },\n    bonusImprove: {\n        7: {\n            fire: 2,\n            aa: 3\n        }\n    }\n},\n\n// ------------------------------------------------------------------------\n\n{\n    list: [229, 'SurfaceRadar'],\n    equipments: {\n        hasID: [229],\n        hasSurfaceRadar: !0\n    },\n    ship: {\n        isID: [夕張改二, 夕張改二特, 夕張改二丁]\n    },\n    bonus: {\n        fire: 1,\n        evasion: 1\n    }\n}, {\n    list: [229, 'AARadar'],\n    equipments: {\n        hasID: [229],\n        hasAARadar: !0\n    },\n    ship: {\n        isID: [夕張改二, 夕張改二特, 夕張改二丁]\n    },\n    bonus: {\n        aa: 2,\n        evasion: 2\n    }\n},\n\n// + 对水上電探\n// @ 海防艦\n{\n    list: [{\n        id: 229,\n        star: 10\n    }, 'SurfaceRadar'],\n    equipments: [{\n        isID: 229,\n        improvement: 7\n    }, {\n        isSurfaceRadar: !0\n    }],\n    ship: {\n        isType: [31]\n    },\n    bonus: {\n        fire: 1,\n        evasion: 4\n    }\n},\n\n// + 对水上電探\n// @ 神風型 / 睦月型\n{\n    list: [{\n        id: 229,\n        star: 10\n    }, 'SurfaceRadar'],\n    equipments: [{\n        isID: 229,\n        improvement: 7\n    }, {\n        isSurfaceRadar: !0\n    }],\n    ship: {\n        isClass: [84, 12]\n    },\n    bonus: {\n        fire: 2,\n        evasion: 3\n    }\n},\n\n// + 对水上電探\n// @ 長良型 改二\n{\n    list: [{\n        id: 229,\n        star: 10\n    }, 'SurfaceRadar'],\n    equipments: [{\n        isID: 229,\n        improvement: 7\n    }, {\n        isSurfaceRadar: !0\n    }],\n    ship: {\n        isID: CL_NagaraClass2ndRemodel\n    },\n    bonus: {\n        fire: 3,\n        evasion: 2\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E5%B0%8F%E5%8F%A3%E5%BE%84%E4%B8%BB%E7%A0%B2/12.7cm%E5%8D%98%E8%A3%85%E9%AB%98%E8%A7%92%E7%A0%B2(%E5%BE%8C%E6%9C%9F%E5%9E%8B).js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/小口径主砲/12.7cm単装高角砲改二.js":
/*!******************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/小口径主砲/12.7cm単装高角砲改二.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * @module\n * 装备额外属性收益\n *\n * 379. 12.7cm単装高角砲改二\n *      https://wikiwiki.jp/kancolle/12.7cm%E5%8D%98%E8%A3%85%E9%AB%98%E8%A7%92%E7%A0%B2%E6%94%B9%E4%BA%8C\n *\n */\n\nvar _require = __webpack_require__(/*! ../../ship-classes */ \"./node_modules/kckit/src/data/ship-classes.js\"),\n    DD_Kamikaze = _require.DD_Kamikaze,\n    DD_Mutsuki = _require.DD_Mutsuki,\n    DD_Matsu = _require.DD_Matsu;\n\nvar _require2 = __webpack_require__(/*! ../../ship-ids */ \"./node_modules/kckit/src/data/ship-ids/index.js\"),\n    天龍 = _require2.天龍,\n    天龍改 = _require2.天龍改,\n    天龍改二 = _require2.天龍改二,\n    龍田 = _require2.龍田,\n    龍田改 = _require2.龍田改,\n    龍田改二 = _require2.龍田改二,\n    北上 = _require2.北上,\n    北上改 = _require2.北上改,\n    北上改二 = _require2.北上改二,\n    大井 = _require2.大井,\n    大井改 = _require2.大井改,\n    大井改二 = _require2.大井改二,\n    五十鈴 = _require2.五十鈴,\n    五十鈴改 = _require2.五十鈴改,\n    五十鈴改二 = _require2.五十鈴改二,\n    由良 = _require2.由良,\n    由良改 = _require2.由良改,\n    由良改二 = _require2.由良改二,\n    鬼怒 = _require2.鬼怒,\n    鬼怒改 = _require2.鬼怒改,\n    鬼怒改二 = _require2.鬼怒改二,\n    那珂 = _require2.那珂,\n    那珂改 = _require2.那珂改,\n    那珂改二 = _require2.那珂改二,\n    夕張 = _require2.夕張,\n    夕張改 = _require2.夕張改,\n    夕張改二 = _require2.夕張改二,\n    夕張改二特 = _require2.夕張改二特,\n    夕張改二丁 = _require2.夕張改二丁;\n\n// ============================================================================\n\nvar 単体ボーナス = [{\n    equipment: 379,\n    ship: {\n        isType: [31] // 海防艦\n    },\n    bonus: {\n        fire: 1,\n        aa: 2\n    }\n}, {\n    equipment: 379,\n    ship: {\n        isClass: [DD_Kamikaze, DD_Mutsuki]\n    },\n    bonus: {\n        fire: 1,\n        aa: 2\n    }\n}, {\n    equipment: 379,\n    ship: {\n        isClass: [DD_Matsu]\n    },\n    bonus: {\n        fire: 3,\n        aa: 4\n    }\n}, {\n    equipment: 379,\n    ship: {\n        isID: [天龍, 天龍改, 龍田, 龍田改]\n    },\n    bonus: {\n        fire: 1\n    }\n}, {\n    equipment: 379,\n    ship: {\n        isID: [天龍改二, 龍田改二]\n    },\n    bonus: {\n        fire: 1,\n        aa: 2,\n        asw: 2\n    }\n}, {\n    equipment: 379,\n    ship: {\n        isID: [五十鈴, 五十鈴改, 由良, 鬼怒, 鬼怒改, 那珂, 那珂改]\n    },\n    bonus: {\n        fire: 2,\n        aa: 2,\n        asw: 1\n    }\n}, {\n    equipment: 379,\n    ship: {\n        isID: [由良改]\n    },\n    bonus: {\n        fire: 2,\n        aa: 3,\n        asw: 1\n    }\n}, {\n    equipment: 379,\n    ship: {\n        isID: [五十鈴改二, 鬼怒改二, 那珂改二]\n    },\n    bonus: {\n        fire: 2,\n        aa: 3,\n        asw: 2\n    }\n}, {\n    equipment: 379,\n    ship: {\n        isID: [由良改二]\n    },\n    bonus: {\n        fire: 2,\n        aa: 4,\n        asw: 2\n    }\n}, {\n    equipment: 379,\n    ship: {\n        isID: [北上, 北上改, 北上改二, 大井, 大井改, 大井改二]\n    },\n    bonus: {\n        fire: 2,\n        aa: 2\n    }\n}, {\n    equipment: 379,\n    ship: {\n        isID: [夕張, 夕張改, 夕張改二特]\n    },\n    bonus: {\n        fire: 1,\n        asw: 1\n    }\n}, {\n    equipment: 379,\n    ship: {\n        isID: [夕張改二]\n    },\n    bonus: {\n        fire: 1,\n        aa: 2,\n        asw: 1\n    }\n}, {\n    equipment: 379,\n    ship: {\n        isID: [夕張改二丁]\n    },\n    bonus: {\n        fire: 1,\n        aa: 2,\n        asw: 3\n    }\n}, {\n    equipment: 379,\n    ship: {\n        isType: [21, // 練習巡洋艦\n        12, // 水上機母艦\n        24]\n    },\n    bonus: {\n        fire: 1,\n        aa: 1\n    }\n}];\n\n// ============================================================================\n\nvar 相互シナジーボーナス = [{\n    list: [379, 'SurfaceRadar'],\n    equipments: {\n        hasID: [379],\n        hasSurfaceRadar: !0\n    },\n    ship: {\n        isType: [31] // 海防艦\n    },\n    bonus: {\n        fire: 1,\n        evasion: 4\n    }\n}, {\n    list: [379, 'SurfaceRadar'],\n    equipments: {\n        hasID: [379],\n        hasSurfaceRadar: !0\n    },\n    ship: {\n        isClass: [DD_Kamikaze, DD_Mutsuki]\n    },\n    bonus: {\n        fire: 2,\n        evasion: 3\n    }\n}, {\n    list: [379, 'SurfaceRadar'],\n    equipments: {\n        hasID: [379],\n        hasSurfaceRadar: !0\n    },\n    ship: {\n        isClass: [DD_Matsu]\n    },\n    bonus: {\n        fire: 4,\n        evasion: 3\n    }\n}, {\n    list: [379, 'SurfaceRadar'],\n    equipments: {\n        hasID: [379],\n        hasSurfaceRadar: !0\n    },\n    ship: {\n        isID: [北上改二, 大井改二, 五十鈴改二, 鬼怒改二, 那珂改二]\n    },\n    bonus: {\n        fire: 2,\n        evasion: 3\n    }\n}, {\n    list: [379, 'SurfaceRadar'],\n    equipments: {\n        hasID: [379],\n        hasSurfaceRadar: !0\n    },\n    ship: {\n        isID: [由良改二]\n    },\n    bonus: {\n        fire: 3,\n        evasion: 4\n    }\n}, {\n    list: [379, 'SurfaceRadar'],\n    equipments: {\n        hasID: [379],\n        hasSurfaceRadar: !0\n    },\n    ship: {\n        isID: [天龍, 天龍改, 天龍改二, 龍田, 龍田改, 龍田改二, 夕張, 夕張改, 夕張改二, 夕張改二特, 夕張改二丁]\n    },\n    bonus: {\n        fire: 3,\n        evasion: 5\n    }\n}, {\n    list: [379, 'SurfaceRadar'],\n    equipments: {\n        hasID: [379],\n        hasSurfaceRadar: !0\n    },\n    ship: {\n        isType: [3, // CL\n        34, 35, 28, 2, 21, 12, // AV\n        24],\n        isNotID: [天龍, 天龍改, 天龍改二, 龍田, 龍田改, 龍田改二, 北上改二, 大井改二, 五十鈴改二, 由良改二, 鬼怒改二, 那珂改二, 夕張, 夕張改, 夕張改二, 夕張改二特, 夕張改二丁]\n    },\n    bonus: {\n        fire: 1,\n        evasion: 2\n    }\n}];\n\n// ============================================================================\n\nmodule.exports = [].concat(単体ボーナス, 相互シナジーボーナス);\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E5%B0%8F%E5%8F%A3%E5%BE%84%E4%B8%BB%E7%A0%B2/12.7cm%E5%8D%98%E8%A3%85%E9%AB%98%E8%A7%92%E7%A0%B2%E6%94%B9%E4%BA%8C.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/小口径主砲/12.7cm連装砲A型.js":
/*!****************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/小口径主砲/12.7cm連装砲A型.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * 装备额外属性收益 - 12.7cm連装砲A型\r\n * \r\n * @module\r\n */\n\nvar _require = __webpack_require__(/*! ../../ship-classes */ \"./node_modules/kckit/src/data/ship-classes.js\"),\n    DD_Fubuki = _require.DD_Fubuki,\n    DD_Ayanami = _require.DD_Ayanami,\n    DD_Akatsuki = _require.DD_Akatsuki;\n\nmodule.exports = [{\n    equipment: 297,\n    ship: {\n        isClass: [DD_Ayanami, DD_Akatsuki]\n    },\n    bonus: {\n        evasion: 1\n    }\n}, {\n    equipment: 297,\n    ship: {\n        isClass: [DD_Fubuki]\n    },\n    bonus: {\n        evasion: 2\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E5%B0%8F%E5%8F%A3%E5%BE%84%E4%B8%BB%E7%A0%B2/12.7cm%E9%80%A3%E8%A3%85%E7%A0%B2A%E5%9E%8B.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/小口径主砲/12.7cm連装砲A型改三(戦時改修)+高射装置.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/小口径主砲/12.7cm連装砲A型改三(戦時改修)+高射装置.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * 装备额外属性收益 - 12.7cm連装砲A型改三(戦時改修)+高射装置\r\n * \r\n * @module\r\n */\n\nvar _require = __webpack_require__(/*! ../../ship-classes */ \"./node_modules/kckit/src/data/ship-classes.js\"),\n    group_DD_Tokugata = _require.group_DD_Tokugata;\n\nmodule.exports = [{\n    equipment: 295,\n    ship: {\n        isClass: group_DD_Tokugata\n    },\n    bonus: {\n        fire: 2,\n        aa: 2\n    }\n},\n\n// ------------------------------------------------------------------------\n\n// + 对水上電探\n{\n    list: [295, 'SurfaceRadar'],\n    equipments: {\n        hasID: [295],\n        hasSurfaceRadar: !0\n    },\n    ship: {\n        isClass: group_DD_Tokugata\n    },\n    bonus: {\n        fire: 3,\n        torpedo: 1,\n        evasion: 2\n    }\n},\n\n// + 对空電探\n{\n    list: [295, 'AARadar'],\n    equipments: {\n        hasID: [295],\n        hasAARadar: !0\n    },\n    ship: {\n        isClass: group_DD_Tokugata\n    },\n    bonus: {\n        aa: 6\n    }\n},\n\n// + 61cm三連装(酸素)魚雷\n{\n    list: [295, 125],\n    equipments: [{ isID: 295 }, { isID: 125 }],\n    ship: {\n        isClass: group_DD_Tokugata\n    },\n    bonus: {\n        fire: 1,\n        torpedo: 3\n    }\n},\n\n// + 61cm三連装(酸素)魚雷 x2\n{\n    list: [295, 125, 125],\n    equipments: [{ isID: 295 }, { isID: 125 }, { isID: 125 }],\n    ship: {\n        isClass: group_DD_Tokugata\n    },\n    bonus: {\n        torpedo: 2\n    }\n},\n\n// + 61cm三連装(酸素)魚雷後期型\n{\n    list: [295, 285],\n    equipments: [{ isID: 295 }, { isID: 285 }],\n    ship: {\n        isClass: group_DD_Tokugata\n    },\n    bonus: {\n        fire: 1,\n        torpedo: 4\n    }\n},\n\n// + 61cm三連装(酸素)魚雷後期型 x2\n{\n    list: [295, 285, 285],\n    equipments: [{ isID: 295 }, { isID: 285 }, { isID: 285 }],\n    ship: {\n        isClass: group_DD_Tokugata\n    },\n    bonus: {\n        torpedo: 2\n    }\n},\n\n// + 61cm三連装(酸素)魚雷 + 61cm三連装(酸素)魚雷後期型\n{\n    list: [295, 125, 285],\n    equipments: [{ isID: 295 }, { isID: 125 }, { isID: 285 }],\n    ship: {\n        isClass: group_DD_Tokugata\n    },\n    bonus: {\n        torpedo: -1\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E5%B0%8F%E5%8F%A3%E5%BE%84%E4%B8%BB%E7%A0%B2/12.7cm%E9%80%A3%E8%A3%85%E7%A0%B2A%E5%9E%8B%E6%94%B9%E4%B8%89(%E6%88%A6%E6%99%82%E6%94%B9%E4%BF%AE)+%E9%AB%98%E5%B0%84%E8%A3%85%E7%BD%AE.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/小口径主砲/12.7cm連装砲A型改二.js":
/*!******************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/小口径主砲/12.7cm連装砲A型改二.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * 装备额外属性收益 - 12.7cm連装砲A型改二\r\n * \r\n * @module\r\n */\n\nvar _require = __webpack_require__(/*! ../../ship-classes */ \"./node_modules/kckit/src/data/ship-classes.js\"),\n    group_DD_Tokugata = _require.group_DD_Tokugata;\n\nmodule.exports = [{\n    equipment: 294,\n    ship: {\n        isClass: group_DD_Tokugata\n    },\n    bonus: {\n        fire: 1\n    }\n},\n\n// ------------------------------------------------------------------------\n\n// + 对水上電探\n{\n    list: [294, 'SurfaceRadar'],\n    equipments: {\n        hasID: [294],\n        hasSurfaceRadar: !0\n    },\n    ship: {\n        isClass: group_DD_Tokugata\n    },\n    bonus: {\n        fire: 3,\n        torpedo: 1,\n        evasion: 2\n    }\n},\n\n// + 61cm三連装(酸素)魚雷\n{\n    list: [294, 125],\n    equipments: [{\n        isID: 294\n    }, {\n        isID: 125\n    }],\n    ship: {\n        isClass: group_DD_Tokugata\n    },\n    bonus: {\n        fire: 1,\n        torpedo: 3\n    }\n},\n\n// + 61cm三連装(酸素)魚雷 x2\n// @ 吹雪型\n{\n    list: [294, 125, 125],\n    equipments: [{\n        isID: 294\n    }, {\n        isID: 125\n    }, {\n        isID: 125\n    }],\n    ship: {\n        isClass: group_DD_Tokugata\n    },\n    bonus: {\n        fire: 1,\n        torpedo: 2\n    }\n},\n\n// + 61cm三連装(酸素)魚雷後期型\n{\n    list: [294, 285],\n    equipments: [{\n        isID: 294\n    }, {\n        isID: 285\n    }],\n    ship: {\n        isClass: group_DD_Tokugata\n    },\n    bonus: {\n        fire: 1,\n        torpedo: 4\n    }\n},\n\n// + 61cm三連装(酸素)魚雷後期型 x2\n// @ 吹雪型\n{\n    list: [294, 285, 285],\n    equipments: [{\n        isID: 294\n    }, {\n        isID: 285\n    }, {\n        isID: 285\n    }],\n    ship: {\n        isClass: group_DD_Tokugata\n    },\n    bonus: {\n        fire: 1,\n        torpedo: 2\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E5%B0%8F%E5%8F%A3%E5%BE%84%E4%B8%BB%E7%A0%B2/12.7cm%E9%80%A3%E8%A3%85%E7%A0%B2A%E5%9E%8B%E6%94%B9%E4%BA%8C.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/小口径主砲/12.7cm連装砲B型改二.js":
/*!******************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/小口径主砲/12.7cm連装砲B型改二.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * @module\n * 装备额外属性收益\n * 63. **12.7cm連装砲B型改二**\n */\n\n// https://wikiwiki.jp/kancolle/12.7cm%E9%80%A3%E8%A3%85%E7%A0%B2B%E5%9E%8B%E6%94%B9%E4%BA%8C\n\nvar _require = __webpack_require__(/*! ../../ship-classes */ \"./node_modules/kckit/src/data/ship-classes.js\"),\n    DD_Ayanami = _require.DD_Ayanami,\n    DD_Akatsuki = _require.DD_Akatsuki,\n    DD_Hatsuharu = _require.DD_Hatsuharu;\n\nvar _require2 = __webpack_require__(/*! ../../ship-series/dd */ \"./node_modules/kckit/src/data/ship-series/dd.js\"),\n    Shikinami2ndRemodelAll = _require2.Shikinami2ndRemodelAll;\n\nmodule.exports = [\n// 綾波型改 / 暁型改 / 初春型改\n{\n    equipment: 63,\n    ship: {\n        isClass: [DD_Ayanami, DD_Akatsuki, DD_Hatsuharu],\n        isNotID: Shikinami2ndRemodelAll\n    },\n    bonus: {\n        aa: 1\n    }\n}, {\n    equipment: 63,\n    ship: {\n        isID: Shikinami2ndRemodelAll\n    },\n    bonus: {\n        fire: 1,\n        aa: 1\n    }\n}, {\n    equipment: 63,\n    ship: {\n        isID: [242, // 白露改\n        497, // 白露改二\n        498]\n    },\n    bonus: {\n        evasion: 1\n    }\n}, {\n    equipment: 63,\n    ship: {\n        isID: [145]\n    },\n    bonus: {\n        fire: 1\n    }\n}, {\n    equipment: 63,\n    ship: {\n        isID: [469]\n    },\n    bonus: {\n        evasion: 2\n    }\n}, {\n    equipment: 63,\n    ship: {\n        isID: [144]\n    },\n    bonus: {\n        fire: 1,\n        torpedo: 1,\n        aa: 1,\n        evasion: 2\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E5%B0%8F%E5%8F%A3%E5%BE%84%E4%B8%BB%E7%A0%B2/12.7cm%E9%80%A3%E8%A3%85%E7%A0%B2B%E5%9E%8B%E6%94%B9%E4%BA%8C.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/小口径主砲/12.7cm連装砲B型改四(戦時改修)+高射装置.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/小口径主砲/12.7cm連装砲B型改四(戦時改修)+高射装置.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n/**\r\n * @module\r\n * 装备额外属性收益\r\n * 296. **12.7cm連装砲B型改四(戦時改修)+高射装置**\r\n */\n\n// https://wikiwiki.jp/kancolle/12.7cm%E9%80%A3%E8%A3%85%E7%A0%B2B%E5%9E%8B%E6%94%B9%E5%9B%9B%28%E6%88%A6%E6%99%82%E6%94%B9%E4%BF%AE%29%EF%BC%8B%E9%AB%98%E5%B0%84%E8%A3%85%E7%BD%AE\n\nvar _require = __webpack_require__(/*! ../../ships */ \"./node_modules/kckit/src/data/ships.js\"),\n    DD_ShiratsuyuClass2ndRemodel = _require.DD_ShiratsuyuClass2ndRemodel;\n\nvar _require2 = __webpack_require__(/*! ../../ship-classes */ \"./node_modules/kckit/src/data/ship-classes.js\"),\n    DD_Ayanami = _require2.DD_Ayanami,\n    DD_Akatsuki = _require2.DD_Akatsuki,\n    DD_Hatsuharu = _require2.DD_Hatsuharu,\n    DD_Shiratsuyu = _require2.DD_Shiratsuyu;\n\nvar _require3 = __webpack_require__(/*! ../../ship-series/dd */ \"./node_modules/kckit/src/data/ship-series/dd.js\"),\n    Shikinami2ndRemodelAll = _require3.Shikinami2ndRemodelAll;\n\n// const classesAyanamiAkatsuki = [DD_Ayanami, DD_Akatsuki]\n\n\nvar classesAyanamiAkatsukiShiratsuyu = [DD_Ayanami, DD_Akatsuki, DD_Shiratsuyu];\nvar classesAyanamiAkatsukiHatsuharu = [DD_Ayanami, DD_Akatsuki, DD_Hatsuharu];\n\nmodule.exports = [\n// 綾波型 / 暁型 / 白露型\n{\n    equipment: 296,\n    ship: {\n        isClass: classesAyanamiAkatsukiShiratsuyu,\n        isNotID: [].concat(_toConsumableArray(Shikinami2ndRemodelAll), _toConsumableArray(DD_ShiratsuyuClass2ndRemodel))\n    },\n    bonus: {\n        fire: 1\n    }\n}, {\n    equipment: 296,\n    ship: {\n        isID: Shikinami2ndRemodelAll\n    },\n    bonus: {\n        fire: 3,\n        torpedo: 1\n    }\n},\n\n// 初春型\n{\n    equipment: 296,\n    ship: {\n        isClass: [DD_Hatsuharu]\n    },\n    bonus: {\n        fire: 1,\n        evasion: 1\n    }\n}, {\n    equipment: 296,\n    ship: {\n        isID: [497 // 白露改二\n        ]\n    },\n    bonus: {\n        fire: 2,\n        evasion: 2\n    }\n}, {\n    equipment: 296,\n    ship: {\n        isID: [145 // 時雨改二\n        ]\n    },\n    bonus: {\n        fire: 2,\n        aa: 1,\n        evasion: 1\n    }\n}, {\n    equipment: 296,\n    ship: {\n        isID: [498 // 村雨改二\n        ]\n    },\n    bonus: {\n        fire: 1,\n        aa: 1,\n        evasion: 2\n    }\n}, {\n    equipment: 296,\n    ship: {\n        isID: [144 // 夕立改二\n        ]\n    },\n    bonus: {\n        fire: 2,\n        torpedo: 1,\n        evasion: 1\n    }\n}, {\n    equipment: 296,\n    ship: {\n        isID: [587, // 海風改二\n        469 // 江風改二\n        ]\n    },\n    bonus: {\n        fire: 1,\n        evasion: 2\n    }\n},\n\n// ------------------------------------------------------------------------\n\n// + 对水上電探\n{\n    list: [296, 'SurfaceRadar'],\n    equipments: {\n        hasID: [296],\n        hasSurfaceRadar: !0\n    },\n    ship: {\n        isClass: classesAyanamiAkatsukiHatsuharu\n    },\n    bonus: {\n        fire: 1,\n        torpedo: 2,\n        evasion: 2\n    }\n}, {\n    list: [296, 'SurfaceRadar'],\n    equipments: {\n        hasID: [296],\n        hasSurfaceRadar: !0\n    },\n    ship: {\n        isClass: [DD_Shiratsuyu]\n    },\n    bonus: {\n        fire: 1,\n        torpedo: 3,\n        evasion: 2\n    }\n},\n\n// + 对空電探\n{\n    list: [296, 'AARadar'],\n    equipments: {\n        hasID: [296],\n        hasAARadar: !0\n    },\n    ship: {\n        isClass: classesAyanamiAkatsukiHatsuharu\n    },\n    bonus: {\n        aa: 5\n    }\n}, {\n    list: [296, 'AARadar'],\n    equipments: {\n        hasID: [296],\n        hasAARadar: !0\n    },\n    ship: {\n        isClass: [DD_Shiratsuyu]\n    },\n    bonus: {\n        aa: 6\n    }\n},\n\n// + 61cm三連装(酸素)魚雷後期型\n{\n    list: [296, 285],\n    equipments: [{\n        isID: 296\n    }, {\n        isID: 285\n    }],\n    ship: {\n        isClass: classesAyanamiAkatsukiHatsuharu\n    },\n    bonus: {\n        fire: 1,\n        torpedo: 3\n    }\n},\n\n// + 61cm四連装(酸素)魚雷後期型\n{\n    list: [296, 286],\n    equipments: [{\n        isID: 296\n    }, {\n        isID: 286\n    }],\n    ship: {\n        isClass: [DD_Shiratsuyu]\n    },\n    bonus: {\n        fire: 1,\n        torpedo: 3\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E5%B0%8F%E5%8F%A3%E5%BE%84%E4%B8%BB%E7%A0%B2/12.7cm%E9%80%A3%E8%A3%85%E7%A0%B2B%E5%9E%8B%E6%94%B9%E5%9B%9B(%E6%88%A6%E6%99%82%E6%94%B9%E4%BF%AE)+%E9%AB%98%E5%B0%84%E8%A3%85%E7%BD%AE.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/小口径主砲/12.7cm連装砲C型改二.js":
/*!******************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/小口径主砲/12.7cm連装砲C型改二.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * 装备额外属性收益 - 12.7cm連装砲C型改二\r\n *\r\n * @module\r\n */\n\nvar _require = __webpack_require__(/*! ../../ships */ \"./node_modules/kckit/src/data/ships.js\"),\n    DD_KagerouClass2ndRemodel = _require.DD_KagerouClass2ndRemodel;\n\nvar conditionSpecials = [145, // 時雨改二\n228, // 雪風改\n557];\nvar condition1excludes = DD_KagerouClass2ndRemodel.concat(conditionSpecials);\n\nmodule.exports = [{\n    equipment: 266,\n    ship: {\n        isClass: [19, // 白露型\n        20, // 朝潮型\n        21],\n        isNotID: condition1excludes\n    },\n    bonus: {\n        fire: 1\n    }\n}, {\n    equipment: 266,\n    ship: {\n        isID: conditionSpecials\n    },\n    bonus: {\n        fire: 1,\n        evasion: 1\n    }\n},\n\n// @ 陽炎型 改二\n{\n    equipment: 266,\n    ship: {\n        isID: DD_KagerouClass2ndRemodel\n    },\n    bonusCount: {\n        1: {\n            fire: 2\n        },\n        2: {\n            fire: 5\n        },\n        3: {\n            fire: 6\n        }\n    }\n},\n\n// ------------------------------------------------------------------------\n\n// + 对水上電探\n{\n    list: [266, 'SurfaceRadar'],\n    equipments: {\n        hasID: [266],\n        hasSurfaceRadar: !0\n    },\n    ship: {\n        isClass: [19, // 白露型\n        20]\n    },\n    bonus: {\n        fire: 1,\n        torpedo: 3,\n        evasion: 1\n    }\n},\n\n// + 对水上電探\n{\n    list: [266, 'SurfaceRadar'],\n    equipments: {\n        hasID: [266],\n        hasSurfaceRadar: !0\n    },\n    ship: {\n        isClass: [21]\n    },\n    bonus: {\n        fire: 2,\n        torpedo: 3,\n        evasion: 1\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E5%B0%8F%E5%8F%A3%E5%BE%84%E4%B8%BB%E7%A0%B2/12.7cm%E9%80%A3%E8%A3%85%E7%A0%B2C%E5%9E%8B%E6%94%B9%E4%BA%8C.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/小口径主砲/12.7cm連装砲D型改三.js":
/*!******************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/小口径主砲/12.7cm連装砲D型改三.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n/**\r\n * @module\r\n * 装备额外属性收益\r\n *\r\n * 366. 12.7cm連装砲D型改三\r\n *      https://wikiwiki.jp/kancolle/12.7cm%E9%80%A3%E8%A3%85%E7%A0%B2D%E5%9E%8B%E6%94%B9%E4%B8%89\r\n *\r\n */\n\nvar _require = __webpack_require__(/*! ../../ships */ \"./node_modules/kckit/src/data/ships.js\"),\n    DD_KagerouClass2ndRemodel = _require.DD_KagerouClass2ndRemodel,\n    DD_YuugumoClass2ndRemodel = _require.DD_YuugumoClass2ndRemodel,\n    DD_ShimakazeRemodel = _require.DD_ShimakazeRemodel;\n\nmodule.exports = [\n// @ 陽炎型\n{\n    equipment: 366,\n    ship: {\n        isClass: [21],\n        isNotID: DD_KagerouClass2ndRemodel\n    },\n    bonus: {\n        fire: 1,\n        evasion: 1\n    }\n},\n\n// @ 陽炎型 改二\n{\n    equipment: 366,\n    ship: {\n        isID: DD_KagerouClass2ndRemodel\n    },\n    bonus: {\n        fire: 2,\n        aa: 2,\n        evasion: 1\n    }\n}, {\n    equipment: 366,\n    ship: {\n        isID: [50]\n    },\n    bonus: {\n        fire: 2,\n        evasion: 1\n    }\n}, {\n    equipment: 366,\n    ship: {\n        isID: DD_ShimakazeRemodel\n    },\n    bonus: {\n        fire: 2,\n        aa: 3,\n        evasion: 1\n    }\n},\n\n// @ 夕雲型\n{\n    equipment: 366,\n    ship: {\n        isClass: [22],\n        isNotID: DD_YuugumoClass2ndRemodel\n    },\n    bonus: {\n        fire: 2,\n        evasion: 1\n    }\n},\n\n// @ 夕雲型 改二\n{\n    equipment: 366,\n    ship: {\n        isID: DD_YuugumoClass2ndRemodel.filter(function (shipId) {\n            return shipId !== 569;\n        })\n    },\n    bonus: {\n        fire: 3,\n        aa: 3,\n        evasion: 1\n    }\n}, {\n    equipment: 366,\n    ship: {\n        isID: [569]\n    },\n    bonus: {\n        fire: 4,\n        aa: 5,\n        evasion: 1\n    }\n},\n\n// ------------------------------------------------------------------------\n\n// + 对水上電探\n{\n    list: [366, 'SurfaceRadar'],\n    equipments: {\n        hasID: [366],\n        hasSurfaceRadar: !0\n    },\n    ship: {\n        isID: [].concat(_toConsumableArray(DD_YuugumoClass2ndRemodel), _toConsumableArray(DD_ShimakazeRemodel))\n    },\n    bonus: {\n        fire: 2,\n        torpedo: 4,\n        evasion: 2\n    }\n},\n\n// + 对水上電探\n{\n    list: [366, 'AARadar'],\n    equipments: {\n        hasID: [366],\n        hasAARadar: !0\n    },\n    ship: {\n        isID: [].concat(_toConsumableArray(DD_YuugumoClass2ndRemodel), _toConsumableArray(DD_ShimakazeRemodel))\n    },\n    bonus: {\n        fire: 1,\n        aa: 5,\n        evasion: 2\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E5%B0%8F%E5%8F%A3%E5%BE%84%E4%B8%BB%E7%A0%B2/12.7cm%E9%80%A3%E8%A3%85%E7%A0%B2D%E5%9E%8B%E6%94%B9%E4%B8%89.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/小口径主砲/12.7cm連装砲D型改二.js":
/*!******************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/小口径主砲/12.7cm連装砲D型改二.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * @module\r\n * 装备额外属性收益\r\n *\r\n * 267. 12.7cm連装砲D型改二\r\n *      https://wikiwiki.jp/kancolle/12.7cm%E9%80%A3%E8%A3%85%E7%A0%B2D%E5%9E%8B%E6%94%B9%E4%BA%8C\r\n *\r\n */\n\nvar _require = __webpack_require__(/*! ../../ships */ \"./node_modules/kckit/src/data/ships.js\"),\n    DD_KagerouClass2ndRemodel = _require.DD_KagerouClass2ndRemodel,\n    DD_YuugumoClass2ndRemodel = _require.DD_YuugumoClass2ndRemodel,\n    DD_ShimakazeRemodel = _require.DD_ShimakazeRemodel;\n\nmodule.exports = [\n// @ 陽炎型\n{\n    equipment: 267,\n    ship: {\n        isClass: [21],\n        isNotID: DD_KagerouClass2ndRemodel\n    },\n    bonus: {\n        fire: 1,\n        evasion: 1\n    }\n},\n\n// @ 夕雲型 / 島風型\n{\n    equipment: 267,\n    ship: {\n        isClass: [22, 24],\n        isNotID: DD_YuugumoClass2ndRemodel\n    },\n    bonus: {\n        fire: 2,\n        evasion: 1\n    }\n},\n\n// @ 陽炎型 改二\n{\n    equipment: 267,\n    ship: {\n        isID: DD_KagerouClass2ndRemodel\n    },\n    bonusCount: {\n        1: {\n            fire: 2,\n            evasion: 1\n        },\n        2: {\n            fire: 3,\n            evasion: 2\n        },\n        3: {\n            fire: 4,\n            evasion: 3\n        }\n    }\n},\n\n// @ 夕雲型 改二\n{\n    equipment: 267,\n    ship: {\n        isID: DD_YuugumoClass2ndRemodel\n    },\n    bonus: {\n        fire: 3,\n        evasion: 1\n    }\n},\n\n// ------------------------------------------------------------------------\n\n// + 对水上電探\n// @ 島風改\n{\n    list: [267, 'SurfaceRadar'],\n    equipments: {\n        hasID: [267],\n        hasSurfaceRadar: !0\n    },\n    ship: {\n        isID: DD_ShimakazeRemodel\n    },\n    bonus: {\n        fire: 1,\n        torpedo: 3,\n        evasion: 2\n    }\n},\n\n// + 对水上電探\n// @ 夕雲型\n{\n    list: [267, 'SurfaceRadar'],\n    equipments: {\n        hasID: [267],\n        hasSurfaceRadar: !0\n    },\n    ship: {\n        isClass: [22],\n        isNotID: DD_YuugumoClass2ndRemodel\n    },\n    bonus: {\n        fire: 2,\n        torpedo: 3,\n        evasion: 1\n    }\n},\n\n// + 对水上電探\n// @ 夕雲型 改二\n{\n    list: [267, 'SurfaceRadar'],\n    equipments: {\n        hasID: [267],\n        hasSurfaceRadar: !0\n    },\n    ship: {\n        isID: DD_YuugumoClass2ndRemodel\n    },\n    bonus: {\n        fire: 3,\n        torpedo: 4,\n        evasion: 3\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E5%B0%8F%E5%8F%A3%E5%BE%84%E4%B8%BB%E7%A0%B2/12.7cm%E9%80%A3%E8%A3%85%E7%A0%B2D%E5%9E%8B%E6%94%B9%E4%BA%8C.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/小口径主砲/12.7cm連装高角砲改二.js":
/*!******************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/小口径主砲/12.7cm連装高角砲改二.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * @module\n * 装备额外属性收益\n *\n * 380. 12.7cm連装高角砲改二\n *      https://wikiwiki.jp/kancolle/12.7cm%E9%80%A3%E8%A3%85%E9%AB%98%E8%A7%92%E7%A0%B2%E6%94%B9%E4%BA%8C\n *\n */\n\nvar _require = __webpack_require__(/*! ../../ship-classes */ \"./node_modules/kckit/src/data/ship-classes.js\"),\n    DD_Matsu = _require.DD_Matsu;\n\nvar _require2 = __webpack_require__(/*! ../../ship-ids */ \"./node_modules/kckit/src/data/ship-ids/index.js\"),\n    天龍改二 = _require2.天龍改二,\n    龍田改二 = _require2.龍田改二,\n    北上改二 = _require2.北上改二,\n    大井改二 = _require2.大井改二,\n    五十鈴改二 = _require2.五十鈴改二,\n    由良改二 = _require2.由良改二,\n    鬼怒改二 = _require2.鬼怒改二,\n    那珂改二 = _require2.那珂改二,\n    夕張改 = _require2.夕張改,\n    夕張改二 = _require2.夕張改二,\n    夕張改二丁 = _require2.夕張改二丁;\n\n// ============================================================================\n\nvar 単体ボーナス = [{\n    equipment: 380,\n    ship: {\n        isClass: [DD_Matsu]\n    },\n    bonus: {\n        fire: 3,\n        aa: 4\n    }\n}, {\n    equipment: 380,\n    ship: {\n        isID: [天龍改二, 龍田改二]\n    },\n    bonus: {\n        fire: 1,\n        aa: 2,\n        asw: 2\n    }\n}, {\n    equipment: 380,\n    ship: {\n        isID: [五十鈴改二, 鬼怒改二, 那珂改二]\n    },\n    bonus: {\n        fire: 2,\n        aa: 3,\n        asw: 2\n    }\n}, {\n    equipment: 380,\n    ship: {\n        isID: [由良改二]\n    },\n    bonus: {\n        fire: 2,\n        aa: 4,\n        asw: 2\n    }\n}, {\n    equipment: 380,\n    ship: {\n        isID: [夕張改]\n    },\n    bonus: {\n        fire: 1,\n        asw: 1\n    }\n}, {\n    equipment: 380,\n    ship: {\n        isID: [夕張改二]\n    },\n    bonus: {\n        fire: 1,\n        aa: 2,\n        asw: 1\n    }\n}, {\n    equipment: 380,\n    ship: {\n        isID: [夕張改二丁]\n    },\n    bonus: {\n        fire: 1,\n        aa: 2,\n        asw: 3\n    }\n}, {\n    equipment: 380,\n    ship: {\n        isID: [北上改二, 大井改二]\n    },\n    bonus: {\n        fire: 3,\n        aa: 2\n    }\n}, {\n    equipment: 380,\n    ship: {\n        isType: [21, // 練習巡洋艦\n        12, // 水上機母艦\n        24]\n    },\n    bonus: {\n        fire: 1,\n        aa: 2\n    }\n}];\n\n// ============================================================================\n\nvar 相互シナジーボーナス = [{\n    list: [380, 'SurfaceRadar'],\n    equipments: {\n        hasID: [380],\n        hasSurfaceRadar: !0\n    },\n    ship: {\n        isClass: [DD_Matsu]\n    },\n    bonus: {\n        fire: 4,\n        evasion: 3\n    }\n}, {\n    list: [380, 'SurfaceRadar'],\n    equipments: {\n        hasID: [380],\n        hasSurfaceRadar: !0\n    },\n    ship: {\n        isID: [北上改二, 大井改二, 五十鈴改二, 由良改二, 鬼怒改二]\n    },\n    bonus: {\n        fire: 3,\n        evasion: 3\n    }\n}, {\n    list: [380, 'SurfaceRadar'],\n    equipments: {\n        hasID: [380],\n        hasSurfaceRadar: !0\n    },\n    ship: {\n        isType: [3, // CL\n        34, 35, 28, 2, 21, 12, // AV\n        24],\n        isNotID: [北上改二, 大井改二, 五十鈴改二, 由良改二, 鬼怒改二]\n    },\n    bonus: {\n        fire: 2,\n        evasion: 1\n    }\n}];\n\n// ============================================================================\n\nmodule.exports = [].concat(単体ボーナス, 相互シナジーボーナス);\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E5%B0%8F%E5%8F%A3%E5%BE%84%E4%B8%BB%E7%A0%B2/12.7cm%E9%80%A3%E8%A3%85%E9%AB%98%E8%A7%92%E7%A0%B2%E6%94%B9%E4%BA%8C.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/小口径主砲/12cm単装砲改二.js":
/*!**************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/小口径主砲/12cm単装砲改二.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * 装备额外属性收益 - 12cm単装砲改二\n *\n * @module\n */\n\n// https://wikiwiki.jp/kancolle/12cm%E5%8D%98%E8%A3%85%E7%A0%B2%E6%94%B9%E4%BA%8C\n\nmodule.exports = [{\n    equipment: 293,\n    ship: {\n        isClass: [92, // 占守型\n        94]\n    },\n    bonus: {\n        fire: 1,\n        aa: 1,\n        evasion: 2\n    }\n}, {\n    equipment: 293,\n    ship: {\n        isClass: [84, // 神風型\n        12]\n    },\n    bonus: {\n        fire: 2,\n        aa: 1,\n        evasion: 3\n    }\n},\n\n// ------------------------------------------------------------------------\n\n// + 对水上電探\n{\n    list: [293, 'SurfaceRadar'],\n    equipments: {\n        hasID: [293],\n        hasSurfaceRadar: !0\n    },\n    ship: {\n        isClass: [92, // 占守型\n        94]\n    },\n    bonus: {\n        fire: 2,\n        evasion: 3,\n        asw: 1\n    }\n},\n\n// + 对水上電探\n{\n    list: [293, 'SurfaceRadar'],\n    equipments: {\n        hasID: [293],\n        hasSurfaceRadar: !0\n    },\n    ship: {\n        isClass: [84, // 神風型\n        12]\n    },\n    bonus: {\n        fire: 2,\n        torpedo: 1,\n        evasion: 3\n    }\n},\n\n// + 53cm連装魚雷\n{\n    list: [293, 174],\n    equipments: [{\n        isID: 293\n    }, {\n        isID: 174\n    }],\n    ship: {\n        isClass: [84, // 神風型\n        12]\n    },\n    bonus: {\n        fire: 2,\n        torpedo: 4\n    }\n},\n\n// + 53cm連装魚雷 + 53cm連装魚雷\n{\n    list: [293, 174, 174],\n    equipments: [{\n        isID: 293\n    }, {\n        isID: 174\n    }, {\n        isID: 174\n    }],\n    ship: {\n        isClass: [84, // 神風型\n        12]\n    },\n    bonus: {\n        fire: 1,\n        torpedo: 3\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E5%B0%8F%E5%8F%A3%E5%BE%84%E4%B8%BB%E7%A0%B2/12cm%E5%8D%98%E8%A3%85%E7%A0%B2%E6%94%B9%E4%BA%8C.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/小口径主砲/12cm単装高角砲E型.js":
/*!****************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/小口径主砲/12cm単装高角砲E型.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * @module\n * 装备额外属性收益\n *\n * 382. 12cm単装高角砲E型\n *      https://wikiwiki.jp/kancolle/12cm%E5%8D%98%E8%A3%85%E9%AB%98%E8%A7%92%E7%A0%B2E%E5%9E%8B\n *\n */\n\nvar _require = __webpack_require__(/*! ../../ship-classes */ \"./node_modules/kckit/src/data/ship-classes.js\"),\n    DD_Kamikaze = _require.DD_Kamikaze,\n    DD_Mutsuki = _require.DD_Mutsuki,\n    DD_Matsu = _require.DD_Matsu;\n\nvar _require2 = __webpack_require__(/*! ../../ship-ids */ \"./node_modules/kckit/src/data/ship-ids/index.js\"),\n    由良 = _require2.由良,\n    由良改 = _require2.由良改,\n    由良改二 = _require2.由良改二,\n    鬼怒 = _require2.鬼怒,\n    鬼怒改 = _require2.鬼怒改,\n    鬼怒改二 = _require2.鬼怒改二,\n    那珂 = _require2.那珂,\n    那珂改 = _require2.那珂改,\n    那珂改二 = _require2.那珂改二;\n\n// ============================================================================\n\nvar 単体ボーナス = [{\n    equipment: 382,\n    ship: {\n        isType: [31] // 海防艦\n    },\n    bonus: {\n        aa: 2,\n        asw: 1,\n        evasion: 2\n    }\n}, {\n    equipment: 382,\n    ship: {\n        isClass: [DD_Kamikaze, DD_Mutsuki, DD_Matsu]\n    },\n    bonus: {\n        aa: 2,\n        evasion: 1\n    }\n}, {\n    equipment: 382,\n    ship: {\n        isID: [由良, 鬼怒, 那珂]\n    },\n    bonus: {\n        aa: 1\n    }\n}, {\n    equipment: 382,\n    ship: {\n        isID: [由良改, 由良改二, 鬼怒改, 鬼怒改二, 那珂改, 那珂改二]\n    },\n    bonus: {\n        aa: 1,\n        evasion: 1\n    }\n}];\n\n// ============================================================================\n\nvar 相互シナジーボーナス = [{\n    list: [382, 'SurfaceRadar'],\n    equipments: {\n        hasID: [382],\n        hasSurfaceRadar: !0\n    },\n    ship: {\n        isType: [31] // 海防艦\n    },\n    bonus: {\n        fire: 2,\n        evasion: 3\n    }\n}, {\n    list: [382, 'AARadar'],\n    equipments: {\n        hasID: [382],\n        hasAARadar: !0\n    },\n    ship: {\n        isType: [31] // 海防艦\n    },\n    bonus: {\n        aa: 2,\n        evasion: 3\n    }\n}, {\n    list: [382, 'SurfaceRadar'],\n    equipments: {\n        hasID: [382],\n        hasSurfaceRadar: !0\n    },\n    ship: {\n        isClass: [DD_Kamikaze, DD_Mutsuki, DD_Matsu]\n    },\n    bonus: {\n        fire: 1,\n        evasion: 2\n    }\n}, {\n    list: [382, 'AARadar'],\n    equipments: {\n        hasID: [382],\n        hasAARadar: !0\n    },\n    ship: {\n        isClass: [DD_Kamikaze, DD_Mutsuki, DD_Matsu]\n    },\n    bonus: {\n        aa: 2,\n        evasion: 2\n    }\n}, {\n    list: [382, 'SurfaceRadar'],\n    equipments: {\n        hasID: [382],\n        hasSurfaceRadar: !0\n    },\n    ship: {\n        isID: [由良改二, 鬼怒改二, 那珂改二]\n    },\n    bonus: {\n        fire: 1,\n        evasion: 1\n    }\n}, {\n    list: [382, 'AARadar'],\n    equipments: {\n        hasID: [382],\n        hasAARadar: !0\n    },\n    ship: {\n        isID: [由良改二, 鬼怒改二, 那珂改二]\n    },\n    bonus: {\n        aa: 2,\n        evasion: 2\n    }\n}];\n\n// ============================================================================\n\nmodule.exports = [].concat(単体ボーナス, 相互シナジーボーナス);\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E5%B0%8F%E5%8F%A3%E5%BE%84%E4%B8%BB%E7%A0%B2/12cm%E5%8D%98%E8%A3%85%E9%AB%98%E8%A7%92%E7%A0%B2E%E5%9E%8B.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/小口径主砲/130mm B-13連装砲.js":
/*!******************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/小口径主砲/130mm B-13連装砲.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n/**\r\n * 装备额外属性收益\r\n * 282. **130mm B-13連装砲**\r\n *\r\n * @module\r\n */\n\n// https://wikiwiki.jp/kancolle/130mm%20B-13%E9%80%A3%E8%A3%85%E7%A0%B2\n\nvar _require = __webpack_require__(/*! ../../ships */ \"./node_modules/kckit/src/data/ships.js\"),\n    vmf_DD = _require.vmf_DD;\n\nvar _require2 = __webpack_require__(/*! ../../ship-series/cl */ \"./node_modules/kckit/src/data/ship-series/cl.js\"),\n    Yuubari = _require2.Yuubari;\n\nmodule.exports = [{\n    equipment: 282,\n    ship: {\n        isID: [].concat(_toConsumableArray(vmf_DD), _toConsumableArray(Yuubari))\n    },\n    bonus: {\n        fire: 2,\n        armor: 1\n    }\n\n    // ------------------------------------------------------------------------\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E5%B0%8F%E5%8F%A3%E5%BE%84%E4%B8%BB%E7%A0%B2/130mm_B-13%E9%80%A3%E8%A3%85%E7%A0%B2.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/小口径主砲/5inch単装砲 Mk.30改+GFCS Mk.37.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/小口径主砲/5inch単装砲 Mk.30改+GFCS Mk.37.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * 装备额外属性收益\r\n * 308. **5inch単装砲 Mk.30改+GFCS Mk.37**\r\n *\r\n * @module\r\n */\n\n// https://wikiwiki.jp/kancolle/5inch%E5%8D%98%E8%A3%85%E7%A0%B2%20Mk.30%E6%94%B9%EF%BC%8BGFCS%20Mk.37\n\nvar _require = __webpack_require__(/*! ../../ship-classes */ \"./node_modules/kckit/src/data/ship-classes.js\"),\n    group_DD_Navy_USN = _require.group_DD_Navy_USN,\n    group_CL_Navy_USN = _require.group_CL_Navy_USN;\n\nmodule.exports = [\n// @ 海防艦\n{\n    equipment: 308,\n    ship: {\n        isType: [31]\n    },\n    bonus: {\n        aa: 1,\n        evasion: 1\n    }\n},\n\n// @ 駆逐艦\n{\n    equipment: 308,\n    ship: {\n        isType: [1, 19],\n        isNotClass: group_DD_Navy_USN\n    },\n    bonus: {\n        fire: 1\n    }\n}, {\n    equipment: 308,\n    ship: {\n        isClass: group_CL_Navy_USN\n    },\n    bonus: {\n        fire: 1,\n        aa: 1,\n        evasion: 1\n    }\n}, {\n    equipment: 308,\n    ship: {\n        isClass: group_DD_Navy_USN\n    },\n    bonus: {\n        fire: 2,\n        aa: 1,\n        evasion: 1\n    }\n\n    // ------------------------------------------------------------------------\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E5%B0%8F%E5%8F%A3%E5%BE%84%E4%B8%BB%E7%A0%B2/5inch%E5%8D%98%E8%A3%85%E7%A0%B2_Mk.30%E6%94%B9+GFCS_Mk.37.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/小口径主砲/5inch単装砲 Mk.30改.js":
/*!********************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/小口径主砲/5inch単装砲 Mk.30改.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * 装备额外属性收益\r\n * 313. **5inch単装砲 Mk.30改**\r\n * \r\n * @module\r\n */\n\n// https://wikiwiki.jp/kancolle/5inch%E5%8D%98%E8%A3%85%E7%A0%B2%20Mk.30%E6%94%B9\n\nvar _require = __webpack_require__(/*! ../../ship-classes */ \"./node_modules/kckit/src/data/ship-classes.js\"),\n    group_DD_Navy_USN = _require.group_DD_Navy_USN;\n\nmodule.exports = [{\n    equipment: 313,\n    ship: {\n        isClass: group_DD_Navy_USN\n    },\n    bonus: {\n        fire: 2,\n        aa: 2,\n        evasion: 1,\n        armor: 1\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E5%B0%8F%E5%8F%A3%E5%BE%84%E4%B8%BB%E7%A0%B2/5inch%E5%8D%98%E8%A3%85%E7%A0%B2_Mk.30%E6%94%B9.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/水上機/Laté 298B.js":
/*!************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/水上機/Laté 298B.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n/**\r\n * @module\r\n * 装备额外属性收益\r\n *\r\n * 194. Laté 298B\r\n *      https://wikiwiki.jp/kancolle/Late%20298B\r\n *\r\n */\n\nvar _require = __webpack_require__(/*! ../../ship-series */ \"./node_modules/kckit/src/data/ship-series/index.js\"),\n    Mizuho = _require.Mizuho,\n    Kamoi = _require.Kamoi,\n    CommandantTeste = _require.CommandantTeste;\n\nmodule.exports = [{\n    equipment: 194,\n    ship: {\n        isID: [].concat(_toConsumableArray(Mizuho), _toConsumableArray(Kamoi))\n    },\n    bonus: {\n        evasion: 1,\n        los: 2\n    }\n}, {\n    equipment: 194,\n    ship: {\n        isID: [].concat(_toConsumableArray(CommandantTeste))\n    },\n    bonus: {\n        fire: 3,\n        evasion: 2,\n        los: 2\n    }\n}, {\n    equipment: 194,\n    ship: {\n        isID: [392]\n    },\n    bonus: {\n        fire: 1,\n        evasion: 2,\n        los: 2\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E6%B0%B4%E4%B8%8A%E6%A9%9F/Lat%C3%A9_298B.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/水上機/OS2U.js":
/*!*******************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/水上機/OS2U.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n/**\n * @module\n * 装备额外属性收益\n *\n * 171. OS2U\n *      https://wikiwiki.jp/kancolle/OS2U\n *\n */\n\nvar _require = __webpack_require__(/*! ../../ship-classes */ \"./node_modules/kckit/src/data/ship-classes.js\"),\n    group_BB_Navy_USN = _require.group_BB_Navy_USN,\n    group_CA_Navy_USN = _require.group_CA_Navy_USN,\n    group_CL_Navy_USN = _require.group_CL_Navy_USN;\n\nmodule.exports = [{\n    equipment: 171,\n    ship: {\n        isClass: [].concat(_toConsumableArray(group_BB_Navy_USN), _toConsumableArray(group_CA_Navy_USN), _toConsumableArray(group_CL_Navy_USN))\n    },\n    bonusImprove: {\n        5: {\n            los: 1\n        },\n        10: {\n            fire: 1,\n            los: 1\n        }\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E6%B0%B4%E4%B8%8A%E6%A9%9F/OS2U.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/水上機/S9 Osprey.js":
/*!************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/水上機/S9 Osprey.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * 装备额外属性收益 - S9 Osprey\n *\n * @module\n */\n\nvar _require = __webpack_require__(/*! ../../ship-classes */ \"./node_modules/kckit/src/data/ship-classes.js\"),\n    CL_Kuma = _require.CL_Kuma,\n    CL_Nagara = _require.CL_Nagara,\n    CL_Sendai = _require.CL_Sendai,\n    CL_Agano = _require.CL_Agano,\n    CLT_Kuma = _require.CLT_Kuma,\n    CL_Gotland = _require.CL_Gotland,\n    CLV_Gotland = _require.CLV_Gotland;\n\nmodule.exports = [{\n    equipment: 304,\n    ship: {\n        isClass: [CL_Kuma, CL_Nagara, CL_Sendai, CL_Agano, CLT_Kuma]\n    },\n    bonus: {\n        fire: 1,\n        evasion: 1,\n        asw: 1\n    }\n}, {\n    equipment: 304,\n    ship: {\n        isClass: [CL_Gotland, CLV_Gotland]\n    },\n    bonus: {\n        fire: 1,\n        evasion: 2,\n        asw: 2\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E6%B0%B4%E4%B8%8A%E6%A9%9F/S9_Osprey.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/水上機/Seafox.js":
/*!*********************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/水上機/Seafox.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * @module\n * 装备额外属性收益\n *\n * 371. Fairey Seafox改\n *      https://wikiwiki.jp/kancolle/Fairey%20Seafox%E6%94%B9\n *\n */\n\nvar _require = __webpack_require__(/*! ../../ship-classes */ \"./node_modules/kckit/src/data/ship-classes.js\"),\n    BB_QueenElizabeth = _require.BB_QueenElizabeth,\n    BB_Nelson = _require.BB_Nelson,\n    BB_Richelieu = _require.BB_Richelieu,\n    AV_CommandantTeste = _require.AV_CommandantTeste;\n\nvar _require2 = __webpack_require__(/*! ../../ship-ids */ \"./node_modules/kckit/src/data/ship-ids/index.js\"),\n    Gotland = _require2.Gotland,\n    Gotland改 = _require2.Gotland改,\n    GotlandAndra = _require2['Gotland andra'];\n\nmodule.exports = [{\n    equipment: 371,\n    ship: {\n        isID: [Gotland, Gotland改]\n    },\n    bonus: {\n        fire: 4,\n        asw: 2,\n        los: 6,\n        evasion: 3\n    }\n}, {\n    equipment: 371,\n    ship: {\n        isID: [GotlandAndra]\n    },\n    bonus: {\n        fire: 6,\n        asw: 2,\n        los: 9,\n        evasion: 5\n    }\n}, {\n    equipment: 371,\n    ship: {\n        isClass: [AV_CommandantTeste]\n    },\n    bonus: {\n        fire: 2,\n        asw: 1,\n        los: 4,\n        evasion: 2\n    }\n},\n// {\n//     equipment: 371,\n//     ship: {\n//         isClass: [AV_Mizuho, AO_Kamoi, AV_Kamoi],\n//     },\n//     bonus: {\n//         fire: 1,\n//         asw: 2,\n//         los: 1,\n//         evasion: 1,\n//     },\n// },\n{\n    equipment: 371,\n    ship: {\n        isClass: [BB_QueenElizabeth]\n    },\n    bonus: {\n        fire: 3,\n        asw: 1,\n        los: 3,\n        evasion: 2\n    }\n}, {\n    equipment: 371,\n    ship: {\n        isClass: [BB_Nelson]\n    },\n    bonus: {\n        fire: 6,\n        asw: 1,\n        los: 5,\n        evasion: 1\n    }\n}, {\n    equipment: 371,\n    ship: {\n        isClass: [BB_Richelieu]\n    },\n    bonus: {\n        fire: 2,\n        los: 3,\n        evasion: 1\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E6%B0%B4%E4%B8%8A%E6%A9%9F/Seafox.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/水上機/Swordfish.js":
/*!************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/水上機/Swordfish.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * @module\n * 装备额外属性收益\n *\n * 367. Swordfish(水上機型)\n *      https://wikiwiki.jp/kancolle/Swordfish%28%E6%B0%B4%E4%B8%8A%E6%A9%9F%E5%9E%8B%29\n * 368. Swordfish Mk.III改(水上機型)\n *      https://wikiwiki.jp/kancolle/Swordfish%20Mk.III%E6%94%B9%28%E6%B0%B4%E4%B8%8A%E6%A9%9F%E5%9E%8B%29\n * 369. Swordfish Mk.III改(水上機型/熟練)\n *      https://wikiwiki.jp/kancolle/Swordfish%20Mk.III%E6%94%B9%28%E6%B0%B4%E4%B8%8A%E6%A9%9F%E5%9E%8B%EF%BC%8F%E7%86%9F%E7%B7%B4%29\n * 370. Swordfish Mk.II改(水偵型)\n *      https://wikiwiki.jp/kancolle/Swordfish%20Mk.II%E6%94%B9%28%E6%B0%B4%E5%81%B5%E5%9E%8B%29\n *\n */\n\nvar _require = __webpack_require__(/*! ../../ship-classes */ \"./node_modules/kckit/src/data/ship-classes.js\"),\n    BB_QueenElizabeth = _require.BB_QueenElizabeth,\n    BB_Nelson = _require.BB_Nelson,\n    CL_Gotland = _require.CL_Gotland,\n    CLV_Gotland = _require.CLV_Gotland,\n    AV_CommandantTeste = _require.AV_CommandantTeste,\n    AV_Mizuho = _require.AV_Mizuho,\n    AO_Kamoi = _require.AO_Kamoi,\n    AV_Kamoi = _require.AV_Kamoi;\n\nvar _require2 = __webpack_require__(/*! ../../ship-ids */ \"./node_modules/kckit/src/data/ship-ids/index.js\"),\n    Gotland = _require2.Gotland,\n    Gotland改 = _require2.Gotland改,\n    GotlandAndra = _require2['Gotland andra'];\n\nmodule.exports = [\n// ========================================================================\n//\n// Swordfish(水上機型)\n//\n// ========================================================================\n{\n    equipment: 367,\n    ship: {\n        isClass: [CL_Gotland, CLV_Gotland]\n    },\n    bonus: {\n        fire: 2,\n        asw: 1,\n        los: 1,\n        evasion: 1\n    }\n}, {\n    equipment: 367,\n    ship: {\n        isClass: [AV_CommandantTeste]\n    },\n    bonus: {\n        fire: 1,\n        asw: 1,\n        los: 1,\n        evasion: 1\n    }\n}, {\n    equipment: 367,\n    ship: {\n        isClass: [AV_Mizuho, AO_Kamoi, AV_Kamoi]\n    },\n    bonus: {\n        fire: 1,\n        los: 1,\n        evasion: 1\n    }\n},\n\n// ========================================================================\n//\n// Swordfish Mk.III改(水上機型)\n//\n// ========================================================================\n{\n    equipment: 368,\n    ship: {\n        isID: [Gotland, Gotland改]\n    },\n    bonus: {\n        fire: 4,\n        asw: 3,\n        los: 3,\n        evasion: 2\n    }\n}, {\n    equipment: 368,\n    ship: {\n        isID: [GotlandAndra]\n    },\n    bonusCount: {\n        1: {\n            fire: 6,\n            torpedo: 2,\n            asw: 3,\n            los: 4,\n            evasion: 3\n        },\n        2: {\n            fire: 10,\n            torpedo: 2,\n            asw: 6,\n            los: 7,\n            evasion: 5\n        }\n    }\n}, {\n    equipment: 368,\n    ship: {\n        isClass: [AV_CommandantTeste]\n    },\n    bonus: {\n        fire: 2,\n        asw: 3,\n        los: 2,\n        evasion: 1\n    }\n}, {\n    equipment: 368,\n    ship: {\n        isClass: [AV_Mizuho, AO_Kamoi, AV_Kamoi]\n    },\n    bonus: {\n        fire: 1,\n        asw: 2,\n        los: 2,\n        evasion: 1\n    }\n},\n\n// ========================================================================\n//\n// Swordfish Mk.III改(水上機型/熟練)\n//\n// ========================================================================\n{\n    equipment: 369,\n    ship: {\n        isID: [Gotland, Gotland改]\n    },\n    bonus: {\n        fire: 5,\n        asw: 4,\n        los: 3,\n        evasion: 4\n    }\n}, {\n    equipment: 369,\n    ship: {\n        isID: [GotlandAndra]\n    },\n    bonus: {\n        fire: 8,\n        torpedo: 3,\n        asw: 4,\n        los: 5,\n        evasion: 6\n    }\n}, {\n    equipment: 369,\n    ship: {\n        isClass: [AV_CommandantTeste]\n    },\n    bonus: {\n        fire: 3,\n        asw: 3,\n        los: 3,\n        evasion: 2\n    }\n}, {\n    equipment: 369,\n    ship: {\n        isClass: [AV_Mizuho, AO_Kamoi, AV_Kamoi]\n    },\n    bonus: {\n        fire: 2,\n        asw: 2,\n        los: 2,\n        evasion: 1\n    }\n},\n\n// ========================================================================\n//\n// Swordfish Mk.II改(水偵型)\n//\n// ========================================================================\n{\n    equipment: 370,\n    ship: {\n        isClass: [CL_Gotland, CLV_Gotland]\n    },\n    bonus: {\n        fire: 1,\n        asw: 3,\n        los: 2,\n        evasion: 1\n    }\n}, {\n    equipment: 370,\n    ship: {\n        isClass: [AV_CommandantTeste]\n    },\n    bonus: {\n        fire: 1,\n        asw: 3,\n        los: 1,\n        evasion: 1\n    }\n}, {\n    equipment: 370,\n    ship: {\n        isClass: [AV_Mizuho, AO_Kamoi, AV_Kamoi]\n    },\n    bonus: {\n        fire: 1,\n        asw: 2,\n        los: 1,\n        evasion: 1\n    }\n}, {\n    equipment: 370,\n    ship: {\n        isClass: [BB_QueenElizabeth]\n    },\n    bonus: {\n        fire: 6,\n        asw: 3,\n        los: 3,\n        evasion: 3\n    }\n}, {\n    equipment: 370,\n    ship: {\n        isClass: [BB_Nelson]\n    },\n    bonus: {\n        fire: 2,\n        asw: 3,\n        los: 2,\n        evasion: 2\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E6%B0%B4%E4%B8%8A%E6%A9%9F/Swordfish.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/水上機/瑞雲(六三四空).js":
/*!***********************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/水上機/瑞雲(六三四空).js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * 装备额外属性收益 - 瑞雲(六三四空)\r\n * \r\n * @module\r\n */\n\nvar _require = __webpack_require__(/*! ../../ships */ \"./node_modules/kckit/src/data/ships.js\"),\n    BB_IseClass2ndRemodel = _require.BB_IseClass2ndRemodel,\n    BB_IseClassRemodel_PLUS_FusouClass2ndRemodel = _require.BB_IseClassRemodel_PLUS_FusouClass2ndRemodel;\n\nmodule.exports = [\n\n// @ 伊勢型 改 / 扶桑型 改二\n{\n    equipment: 79,\n    ship: {\n        isID: BB_IseClassRemodel_PLUS_FusouClass2ndRemodel\n    },\n    bonus: {\n        fire: 2\n    }\n},\n\n// @ 伊勢型 改二\n{\n    equipment: 79,\n    ship: {\n        isID: BB_IseClass2ndRemodel\n    },\n    bonus: {\n        fire: 3\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E6%B0%B4%E4%B8%8A%E6%A9%9F/%E7%91%9E%E9%9B%B2(%E5%85%AD%E4%B8%89%E5%9B%9B%E7%A9%BA).js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/水上機/瑞雲(六三四空／熟練).js":
/*!**************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/水上機/瑞雲(六三四空／熟練).js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * 装备额外属性收益 - 瑞雲(六三四空/熟練)\r\n * \r\n * @module\r\n */\n\nvar _require = __webpack_require__(/*! ../../ships */ \"./node_modules/kckit/src/data/ships.js\"),\n    BB_IseClassRemodel = _require.BB_IseClassRemodel,\n    BB_IseClass2ndRemodel = _require.BB_IseClass2ndRemodel,\n    BB_FusouClass2ndRemodel = _require.BB_FusouClass2ndRemodel;\n\nmodule.exports = [\n\n// @ 扶桑型 改二\n{\n    equipment: 237,\n    ship: {\n        isID: BB_FusouClass2ndRemodel\n    },\n    bonus: {\n        fire: 2\n    }\n},\n\n// @ 伊勢型 改\n{\n    equipment: 237,\n    ship: {\n        isID: BB_IseClassRemodel\n    },\n    bonus: {\n        fire: 3,\n        evasion: 1\n    }\n},\n\n// @ 伊勢型 改二\n{\n    equipment: 237,\n    ship: {\n        isID: BB_IseClass2ndRemodel\n    },\n    bonus: {\n        fire: 4,\n        evasion: 2\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E6%B0%B4%E4%B8%8A%E6%A9%9F/%E7%91%9E%E9%9B%B2(%E5%85%AD%E4%B8%89%E5%9B%9B%E7%A9%BA%EF%BC%8F%E7%86%9F%E7%B7%B4).js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/水上機/瑞雲12型(六三四空).js":
/*!**************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/水上機/瑞雲12型(六三四空).js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * 装备额外属性收益 - 瑞雲12型(六三四空)\r\n * \r\n * @module\r\n */\n\nvar _require = __webpack_require__(/*! ../../ships */ \"./node_modules/kckit/src/data/ships.js\"),\n    BB_IseClass2ndRemodel = _require.BB_IseClass2ndRemodel,\n    BB_IseClassRemodel_PLUS_FusouClass2ndRemodel = _require.BB_IseClassRemodel_PLUS_FusouClass2ndRemodel;\n\nmodule.exports = [\n\n// @ 伊勢型 改 / 扶桑型 改二\n{\n    equipment: 81,\n    ship: {\n        isID: BB_IseClassRemodel_PLUS_FusouClass2ndRemodel\n    },\n    bonus: {\n        fire: 2\n    }\n},\n\n// @ 伊勢型 改二\n{\n    equipment: 81,\n    ship: {\n        isID: BB_IseClass2ndRemodel\n    },\n    bonus: {\n        fire: 3\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E6%B0%B4%E4%B8%8A%E6%A9%9F/%E7%91%9E%E9%9B%B212%E5%9E%8B(%E5%85%AD%E4%B8%89%E5%9B%9B%E7%A9%BA).js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/水上機/瑞雲改二(六三四空).js":
/*!*************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/水上機/瑞雲改二(六三四空).js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * @module\r\n * 装备额外属性收益\r\n * 322. **瑞雲改二(六三四空)**\r\n */\n\n// https://wikiwiki.jp/kancolle/%E7%91%9E%E9%9B%B2%E6%94%B9%E4%BA%8C%28%E5%85%AD%E4%B8%89%E5%9B%9B%E7%A9%BA%29\n\nvar _require = __webpack_require__(/*! ../../ships */ \"./node_modules/kckit/src/data/ships.js\"),\n    BB_IseClass2ndRemodel = _require.BB_IseClass2ndRemodel;\n\nmodule.exports = [{\n    equipment: 322,\n    ship: {\n        isID: BB_IseClass2ndRemodel\n    },\n    bonus: {\n        fire: 5,\n        aa: 2,\n        asw: 1,\n        evasion: 2\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E6%B0%B4%E4%B8%8A%E6%A9%9F/%E7%91%9E%E9%9B%B2%E6%94%B9%E4%BA%8C(%E5%85%AD%E4%B8%89%E5%9B%9B%E7%A9%BA).js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/水上機/瑞雲改二(六三四空／熟練).js":
/*!****************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/水上機/瑞雲改二(六三四空／熟練).js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * @module\r\n * 装备额外属性收益\r\n * 323. **瑞雲改二(六三四空/熟練)**\r\n */\n\n// https://wikiwiki.jp/kancolle/%E5%BD%97%E6%98%9F%E4%B8%80%E4%BA%8C%E5%9E%8B%28%E5%85%AD%E4%B8%89%E5%9B%9B%E7%A9%BA%EF%BC%8F%E4%B8%89%E5%8F%B7%E7%88%86%E5%BC%BE%E6%90%AD%E8%BC%89%E6%A9%9F%29\n\nvar _require = __webpack_require__(/*! ../../ships */ \"./node_modules/kckit/src/data/ships.js\"),\n    BB_IseClass2ndRemodel = _require.BB_IseClass2ndRemodel;\n\nmodule.exports = [{\n    equipment: 323,\n    ship: {\n        isID: BB_IseClass2ndRemodel\n    },\n    bonus: {\n        fire: 6,\n        aa: 3,\n        asw: 2,\n        evasion: 3\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E6%B0%B4%E4%B8%8A%E6%A9%9F/%E7%91%9E%E9%9B%B2%E6%94%B9%E4%BA%8C(%E5%85%AD%E4%B8%89%E5%9B%9B%E7%A9%BA%EF%BC%8F%E7%86%9F%E7%B7%B4).js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/艦上機/Ju87C改二(KMX搭載機).js":
/*!******************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/艦上機/Ju87C改二(KMX搭載機).js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n/**\r\n * 装备额外属性收益 - Ju87C改二(KMX搭載機)\r\n * [305] Ju87C改二(KMX搭載機)\r\n * [306] Ju87C改二(KMX搭載機/熟練)\r\n *\r\n * @module\r\n */\n\n// https://wikiwiki.jp/kancolle/Ju87C%E6%94%B9%E4%BA%8C%28KMX%E6%90%AD%E8%BC%89%E6%A9%9F%29\n// https://wikiwiki.jp/kancolle/Ju87C%E6%94%B9%E4%BA%8C%28KMX%E6%90%AD%E8%BC%89%E6%A9%9F%EF%BC%8F%E7%86%9F%E7%B7%B4%29\n\nvar _require = __webpack_require__(/*! ../../ship-classes */ \"./node_modules/kckit/src/data/ship-classes.js\"),\n    group_CV_Navy_RM = _require.group_CV_Navy_RM,\n    group_CV_Navy_KM = _require.group_CV_Navy_KM;\n\nvar bonusGrafZeppelinAquila = {\n    ship: {\n        isClass: [].concat(_toConsumableArray(group_CV_Navy_RM), _toConsumableArray(group_CV_Navy_KM))\n    },\n    bonus: {\n        fire: 1,\n        evasion: 1\n    }\n};\nvar bonusTaiyou = {\n    ship: {\n        isID: [526, // 大鷹\n        380, // 大鷹改\n        529 // 大鷹改二\n        ]\n    },\n    bonus: {\n        asw: 1,\n        evasion: 1\n    }\n};\nvar bonusShinyou = {\n    ship: {\n        isID: [534, // 神鷹\n        381, // 神鷹改\n        536 // 神鷹改二\n        ]\n    },\n    bonus: {\n        asw: 3,\n        evasion: 2\n    }\n};\n\nmodule.exports = [\n// Ju87C改二(KMX搭載機)\n_extends({\n    equipment: 305\n}, bonusGrafZeppelinAquila), _extends({\n    equipment: 305\n}, bonusTaiyou), _extends({\n    equipment: 305\n}, bonusShinyou),\n\n// Ju87C改二(KMX搭載機/熟練)\n_extends({\n    equipment: 306\n}, bonusGrafZeppelinAquila), _extends({\n    equipment: 306\n}, bonusTaiyou), _extends({\n    equipment: 306\n}, bonusShinyou)\n\n// ------------------------------------------------------------------------\n];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E8%89%A6%E4%B8%8A%E6%A9%9F/Ju87C%E6%94%B9%E4%BA%8C(KMX%E6%90%AD%E8%BC%89%E6%A9%9F).js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/艦上機/Re.2001 CB改.js":
/*!**************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/艦上機/Re.2001 CB改.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * 装备额外属性收益\r\n * 316. **Re.2001 CB改**\r\n * \r\n * @module\r\n */\n\n// https://wikiwiki.jp/kancolle/Re.2001%20CB%E6%94%B9\n\nvar _require = __webpack_require__(/*! ../../ship-classes */ \"./node_modules/kckit/src/data/ship-classes.js\"),\n    group_CV_Navy_RM = _require.group_CV_Navy_RM;\n\nmodule.exports = [{\n    equipment: 316,\n    ship: {\n        isClass: group_CV_Navy_RM\n    },\n    bonus: {\n        fire: 4,\n        aa: 1,\n        evasion: 1\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E8%89%A6%E4%B8%8A%E6%A9%9F/Re.2001_CB%E6%94%B9.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/艦上機/Re.2001 G改.js":
/*!*************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/艦上機/Re.2001 G改.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * 装备额外属性收益\r\n * 188. **Re.2001 G改**\r\n * \r\n * @module\r\n */\n\n// https://wikiwiki.jp/kancolle/Re.2001%20G%E6%94%B9\n\nvar _require = __webpack_require__(/*! ../../ship-classes */ \"./node_modules/kckit/src/data/ship-classes.js\"),\n    group_CV_Navy_RM = _require.group_CV_Navy_RM;\n\nmodule.exports = [{\n    equipment: 188,\n    ship: {\n        isClass: group_CV_Navy_RM\n    },\n    bonus: {\n        fire: 3,\n        aa: 1,\n        evasion: 1\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E8%89%A6%E4%B8%8A%E6%A9%9F/Re.2001_G%E6%94%B9.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/艦上機/Re.2001 OR改.js":
/*!**************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/艦上機/Re.2001 OR改.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * 装备额外属性收益\r\n * 184. **Re.2001 OR改**\r\n * \r\n * @module\r\n */\n\n// https://wikiwiki.jp/kancolle/Re.2001%20OR%E6%94%B9\n\nvar _require = __webpack_require__(/*! ../../ship-classes */ \"./node_modules/kckit/src/data/ship-classes.js\"),\n    group_CV_Navy_RM = _require.group_CV_Navy_RM;\n\nmodule.exports = [{\n    equipment: 184,\n    ship: {\n        isClass: group_CV_Navy_RM\n    },\n    bonus: {\n        fire: 1,\n        aa: 2,\n        evasion: 3\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E8%89%A6%E4%B8%8A%E6%A9%9F/Re.2001_OR%E6%94%B9.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/艦上機/Re.2005 改.js":
/*!************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/艦上機/Re.2005 改.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n/**\r\n * 装备额外属性收益\r\n * 189. **Re.2005 改**\r\n * \r\n * @module\r\n */\n\n// https://wikiwiki.jp/kancolle/Re.2005%20%E6%94%B9\n\nvar _require = __webpack_require__(/*! ../../ship-classes */ \"./node_modules/kckit/src/data/ship-classes.js\"),\n    group_CV_Navy_RM = _require.group_CV_Navy_RM,\n    group_CV_Navy_KM = _require.group_CV_Navy_KM;\n\nmodule.exports = [{\n    equipment: 189,\n    ship: {\n        isClass: [].concat(_toConsumableArray(group_CV_Navy_RM), _toConsumableArray(group_CV_Navy_KM))\n    },\n    bonus: {\n        aa: 1,\n        evasion: 2\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E8%89%A6%E4%B8%8A%E6%A9%9F/Re.2005_%E6%94%B9.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/艦上機/XF5U.js":
/*!*******************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/艦上機/XF5U.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n/**\n * @module\n * 装备额外属性收益\n *\n * 375. XF5U\n *      https://wikiwiki.jp/kancolle/XF5U\n *\n */\n\nvar _require = __webpack_require__(/*! ../../ship-classes */ \"./node_modules/kckit/src/data/ship-classes.js\"),\n    CV_Kaga = _require.CV_Kaga,\n    group_CV_Navy_USN = _require.group_CV_Navy_USN;\n\nmodule.exports = [{\n    equipment: 375,\n    ship: {\n        isClass: [].concat(_toConsumableArray(group_CV_Navy_USN))\n    },\n    bonus: {\n        fire: 3,\n        aa: 3,\n        asw: 3,\n        evasion: 3\n    }\n}, {\n    equipment: 375,\n    ship: {\n        isClass: [CV_Kaga]\n    },\n    bonus: {\n        fire: 1,\n        aa: 1,\n        asw: 1,\n        evasion: 1\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E8%89%A6%E4%B8%8A%E6%A9%9F/XF5U.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/艦上機/九七式艦攻(九三一空).js":
/*!**************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/艦上機/九七式艦攻(九三一空).js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\n/**\r\n * 装备额外属性收益 - 九七式艦攻(九三一空)\r\n * [82] 九七式艦攻(九三一空)\r\n * [302] 九七式艦攻(九三一空/熟練)\r\n * \r\n * @module\r\n */\n\n// https://wikiwiki.jp/kancolle/%E4%B9%9D%E4%B8%83%E5%BC%8F%E8%89%A6%E6%94%BB%28%E4%B9%9D%E4%B8%89%E4%B8%80%E7%A9%BA%29\n// https://wikiwiki.jp/kancolle/%E4%B9%9D%E4%B8%83%E5%BC%8F%E8%89%A6%E6%94%BB%28%E4%B9%9D%E4%B8%89%E4%B8%80%E7%A9%BA%EF%BC%8F%E7%86%9F%E7%B7%B4%29\n\nvar bonusTaiyou = {\n    ship: {\n        isID: [380, // 大鷹改\n        529, // 大鷹改二\n        381, // 神鷹改\n        536]\n    },\n    bonus: {\n        asw: 1,\n        evasion: 1\n    }\n};\n\nmodule.exports = [\n\n// 九七式艦攻(九三一空)\n_extends({\n    equipment: 82\n}, bonusTaiyou),\n\n// 九七式艦攻(九三一空/熟練)\n_extends({\n    equipment: 302\n}, bonusTaiyou)];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E8%89%A6%E4%B8%8A%E6%A9%9F/%E4%B9%9D%E4%B8%83%E5%BC%8F%E8%89%A6%E6%94%BB(%E4%B9%9D%E4%B8%89%E4%B8%80%E7%A9%BA).js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/艦上機/九七式艦攻(友永隊).js":
/*!*************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/艦上機/九七式艦攻(友永隊).js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * @module\r\n * 装备额外属性收益\r\n * 93. **九七式艦攻(友永隊)**\r\n */\n\n// https://wikiwiki.jp/kancolle/%E4%B9%9D%E4%B8%83%E5%BC%8F%E8%89%A6%E6%94%BB%28%E5%8F%8B%E6%B0%B8%E9%9A%8A%29\n\nvar _require = __webpack_require__(/*! ../../ship-series */ \"./node_modules/kckit/src/data/ship-series/index.js\"),\n    Souryuu = _require.Souryuu,\n    Hiryuu = _require.Hiryuu;\n\nmodule.exports = [{\n    equipment: 93,\n    ship: {\n        isID: Souryuu\n    },\n    bonusCount: {\n        1: {\n            fire: 1\n        }\n    }\n}, {\n    equipment: 93,\n    ship: {\n        isID: Hiryuu\n    },\n    bonusCount: {\n        1: {\n            fire: 3\n        }\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E8%89%A6%E4%B8%8A%E6%A9%9F/%E4%B9%9D%E4%B8%83%E5%BC%8F%E8%89%A6%E6%94%BB(%E5%8F%8B%E6%B0%B8%E9%9A%8A).js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/艦上機/九七式艦攻(村田隊).js":
/*!*************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/艦上機/九七式艦攻(村田隊).js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n/**\r\n * @module\r\n * 装备额外属性收益\r\n * 143. **九七式艦攻(村田隊)**\r\n */\n\n// https://wikiwiki.jp/kancolle/%E4%B9%9D%E4%B8%83%E5%BC%8F%E8%89%A6%E6%94%BB%28%E6%9D%91%E7%94%B0%E9%9A%8A%29\n\nvar _require = __webpack_require__(/*! ../../ship-series */ \"./node_modules/kckit/src/data/ship-series/index.js\"),\n    Shoukaku = _require.Shoukaku,\n    Zuikaku = _require.Zuikaku;\n\nvar _require2 = __webpack_require__(/*! ../../ships */ \"./node_modules/kckit/src/data/ships.js\"),\n    CV_AkagiClassRemodelAll = _require2.CV_AkagiClassRemodelAll;\n\nmodule.exports = [{\n    equipment: 143,\n    ship: {\n        isID: [157] // 龍驤改二\n    },\n    bonusCount: {\n        1: {\n            fire: 1\n        }\n    }\n}, {\n    equipment: 143,\n    ship: {\n        isID: [].concat(_toConsumableArray(CV_AkagiClassRemodelAll))\n    },\n    bonusCount: {\n        1: {\n            fire: 3\n        }\n    }\n}, {\n    equipment: 143,\n    ship: {\n        isID: [278] // 加賀改\n    },\n    bonusCount: {\n        1: {\n            fire: 2\n        }\n    }\n}, {\n    equipment: 143,\n    ship: {\n        isID: Shoukaku\n    },\n    bonusCount: {\n        1: {\n            fire: 2\n        }\n    }\n}, {\n    equipment: 143,\n    ship: {\n        isID: Zuikaku\n    },\n    bonusCount: {\n        1: {\n            fire: 1\n        }\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E8%89%A6%E4%B8%8A%E6%A9%9F/%E4%B9%9D%E4%B8%83%E5%BC%8F%E8%89%A6%E6%94%BB(%E6%9D%91%E7%94%B0%E9%9A%8A).js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/艦上機/九七式艦攻改.js":
/*!*********************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/艦上機/九七式艦攻改.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * @module\n * 装备额外属性收益\n *\n * 344. 九七式艦攻改 試製三号戊型(空六号電探改装備機)\n *      https://wikiwiki.jp/kancolle/%E4%B9%9D%E4%B8%83%E5%BC%8F%E8%89%A6%E6%94%BB%E6%94%B9%20%E8%A9%A6%E8%A3%BD%E4%B8%89%E5%8F%B7%E6%88%8A%E5%9E%8B%28%E7%A9%BA%E5%85%AD%E5%8F%B7%E9%9B%BB%E6%8E%A2%E6%94%B9%E8%A3%85%E5%82%99%E6%A9%9F%29\n * 345. 九七式艦攻改(熟練) 試製三号戊型(空六号電探改装備機)\n *      https://wikiwiki.jp/kancolle/%E4%B9%9D%E4%B8%83%E5%BC%8F%E8%89%A6%E6%94%BB%E6%94%B9%28%E7%86%9F%E7%B7%B4%29%20%E8%A9%A6%E8%A3%BD%E4%B8%89%E5%8F%B7%E6%88%8A%E5%9E%8B%28%E7%A9%BA%E5%85%AD%E5%8F%B7%E9%9B%BB%E6%8E%A2%E6%94%B9%E8%A3%85%E5%82%99%E6%A9%9F%29\n *\n */\n\nvar _require = __webpack_require__(/*! ../../ship-ids */ \"./node_modules/kckit/src/data/ship-ids/index.js\"),\n    赤城改二戊 = _require.赤城改二戊,\n    龍鳳改 = _require.龍鳳改,\n    祥鳳改 = _require.祥鳳改,\n    瑞鳳改二 = _require.瑞鳳改二,\n    瑞鳳改二乙 = _require.瑞鳳改二乙;\n\nvar 九七式艦攻改_試製三号戊型_空六号電探改装備機 = [{\n    equipment: 344,\n    ship: {\n        isID: [祥鳳改]\n    },\n    bonus: {\n        fire: 2,\n        asw: 1\n    }\n}, {\n    equipment: 344,\n    ship: {\n        isID: [瑞鳳改二, 瑞鳳改二乙]\n    },\n    bonus: {\n        fire: 2,\n        asw: 2\n    }\n}, {\n    equipment: 344,\n    ship: {\n        isID: [龍鳳改]\n    },\n    bonus: {\n        fire: 4,\n        asw: 1\n    }\n}, {\n    equipment: 344,\n    ship: {\n        isID: [赤城改二戊]\n    },\n    bonus: {\n        fire: 3\n    }\n}];\n\nvar 九七式艦攻改_熟練_試製三号戊型_空六号電探改装備機 = [{\n    equipment: 345,\n    ship: {\n        isID: [祥鳳改]\n    },\n    bonus: {\n        fire: 3,\n        evasion: 1,\n        asw: 1\n    }\n}, {\n    equipment: 345,\n    ship: {\n        isID: [瑞鳳改二, 瑞鳳改二乙]\n    },\n    bonus: {\n        fire: 3,\n        evasion: 3,\n        asw: 2\n    }\n}, {\n    equipment: 345,\n    ship: {\n        isID: [龍鳳改]\n    },\n    bonus: {\n        fire: 5,\n        evasion: 2,\n        asw: 1\n    }\n}, {\n    equipment: 345,\n    ship: {\n        isID: [赤城改二戊]\n    },\n    bonus: {\n        fire: 3,\n        evasion: 1\n    }\n}];\n\nmodule.exports = [].concat(九七式艦攻改_試製三号戊型_空六号電探改装備機, 九七式艦攻改_熟練_試製三号戊型_空六号電探改装備機);\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E8%89%A6%E4%B8%8A%E6%A9%9F/%E4%B9%9D%E4%B8%83%E5%BC%8F%E8%89%A6%E6%94%BB%E6%94%B9.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/艦上機/九九式艦爆(江草隊).js":
/*!*************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/艦上機/九九式艦爆(江草隊).js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * @module\r\n * 装备额外属性收益\r\n * 99. **九九式艦爆(江草隊)**\r\n */\n\n// https://wikiwiki.jp/kancolle/%E4%B9%9D%E4%B9%9D%E5%BC%8F%E8%89%A6%E7%88%86%28%E6%B1%9F%E8%8D%89%E9%9A%8A%29\n\nvar _require = __webpack_require__(/*! ../../ship-series */ \"./node_modules/kckit/src/data/ship-series/index.js\"),\n    Souryuu = _require.Souryuu,\n    Hiryuu = _require.Hiryuu;\n\nmodule.exports = [{\n    equipment: 99,\n    ship: {\n        isID: Souryuu\n    },\n    bonusCount: {\n        1: {\n            fire: 4\n        }\n    }\n}, {\n    equipment: 99,\n    ship: {\n        isID: Hiryuu\n    },\n    bonusCount: {\n        1: {\n            fire: 1\n        }\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E8%89%A6%E4%B8%8A%E6%A9%9F/%E4%B9%9D%E4%B9%9D%E5%BC%8F%E8%89%A6%E7%88%86(%E6%B1%9F%E8%8D%89%E9%9A%8A).js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/艦上機/九六式艦戦.js":
/*!********************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/艦上機/九六式艦戦.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * @module\r\n * 装备额外属性收益\r\n * 19. **九六式艦戦**\r\n * 228. **九六式艦戦改**\r\n */\n\n// https://wikiwiki.jp/kancolle/%E4%B9%9D%E4%B8%83%E5%BC%8F%E8%89%A6%E6%94%BB%28%E6%9D%91%E7%94%B0%E9%9A%8A%29\n\nvar _require = __webpack_require__(/*! ../../ship-classes */ \"./node_modules/kckit/src/data/ship-classes.js\"),\n    CV_Houshou = _require.CV_Houshou,\n    CV_Kagasumaru = _require.CV_Kagasumaru,\n    CV_Taiyou_SP = _require.CV_Taiyou_SP,\n    CV_Taiyou = _require.CV_Taiyou;\n\nmodule.exports = [\n// ========================================================================\n// 九六式艦戦\n// https://wikiwiki.jp/kancolle/%E4%B9%9D%E5%85%AD%E5%BC%8F%E8%89%A6%E6%88%A6\n// ========================================================================\n{\n    equipment: 19,\n    ship: {\n        isType: [9],\n        isNotClass: [CV_Houshou, CV_Kagasumaru, CV_Taiyou_SP, CV_Taiyou]\n    },\n    bonus: {\n        aa: 1,\n        evasion: 1\n    }\n}, {\n    equipment: 19,\n    ship: {\n        isClass: [CV_Houshou]\n    },\n    bonus: {\n        fire: 2,\n        aa: 3,\n        asw: 2,\n        evasion: 3\n    }\n}, {\n    equipment: 19,\n    ship: {\n        isClass: [CV_Kagasumaru, CV_Taiyou_SP, CV_Taiyou]\n    },\n    bonus: {\n        fire: 2,\n        aa: 1,\n        asw: 3,\n        evasion: 1\n    }\n},\n\n// ========================================================================\n// 九六式艦戦改\n// https://wikiwiki.jp/kancolle/%E4%B9%9D%E5%85%AD%E5%BC%8F%E8%89%A6%E6%88%A6%E6%94%B9\n// ========================================================================\n{\n    equipment: 228,\n    ship: {\n        isType: [9],\n        isNotClass: [CV_Houshou, CV_Kagasumaru, CV_Taiyou_SP, CV_Taiyou]\n    },\n    bonus: {\n        aa: 1,\n        asw: 2,\n        evasion: 1\n    }\n}, {\n    equipment: 228,\n    ship: {\n        isClass: [CV_Houshou]\n    },\n    bonus: {\n        fire: 3,\n        aa: 4,\n        asw: 6,\n        evasion: 5\n    }\n}, {\n    equipment: 228,\n    ship: {\n        isClass: [CV_Kagasumaru, CV_Taiyou_SP, CV_Taiyou]\n    },\n    bonus: {\n        fire: 2,\n        aa: 2,\n        asw: 7,\n        evasion: 2\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E8%89%A6%E4%B8%8A%E6%A9%9F/%E4%B9%9D%E5%85%AD%E5%BC%8F%E8%89%A6%E6%88%A6.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/艦上機/二式艦上偵察機.js":
/*!**********************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/艦上機/二式艦上偵察機.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * 装备额外属性收益\r\n * 61. **二式艦上偵察機**\r\n *\r\n * @module\r\n */\n\n// https://wikiwiki.jp/kancolle/%E4%BA%8C%E5%BC%8F%E8%89%A6%E4%B8%8A%E5%81%B5%E5%AF%9F%E6%A9%9F\n\nvar _require = __webpack_require__(/*! ../../../types/ships */ \"./node_modules/kckit/src/types/ships.js\"),\n    Carriers = _require.Carriers;\n\nmodule.exports = [{\n    equipment: 61,\n    ship: {\n        isID: [553] // 伊勢改二\n    },\n    bonusImprove: {\n        0: {\n            fire: 3,\n            evasion: 2,\n            armor: 1,\n            range: '1'\n        },\n        2: {\n            fire: 3,\n            evasion: 2,\n            armor: 1,\n            los: 1,\n            range: '1'\n        },\n        4: {\n            fire: 4,\n            evasion: 2,\n            armor: 1,\n            los: 1,\n            range: '1'\n        },\n        6: {\n            fire: 4,\n            evasion: 2,\n            armor: 1,\n            los: 2,\n            range: '1'\n        },\n        10: {\n            fire: 5,\n            evasion: 2,\n            armor: 1,\n            los: 3,\n            range: '1'\n        }\n    }\n}, {\n    equipment: 61,\n    ship: {\n        isID: [554] // 日向改二\n    },\n    bonusImprove: {\n        0: {\n            fire: 3,\n            evasion: 3,\n            armor: 3,\n            range: '1'\n        },\n        2: {\n            fire: 3,\n            evasion: 3,\n            armor: 3,\n            los: 1,\n            range: '1'\n        },\n        4: {\n            fire: 4,\n            evasion: 3,\n            armor: 3,\n            los: 1,\n            range: '1'\n        },\n        6: {\n            fire: 4,\n            evasion: 3,\n            armor: 3,\n            los: 2,\n            range: '1'\n        },\n        10: {\n            fire: 5,\n            evasion: 3,\n            armor: 3,\n            los: 3,\n            range: '1'\n        }\n    }\n},\n\n// @ CV\n{\n    equipment: 61,\n    ship: {\n        isType: Carriers,\n        isNotID: [560, // 瑞鳳改二乙\n        508, // 鈴谷航改二\n        509, // 熊野航改二\n        197, // 蒼龍改二\n        196 // 飛龍改二\n        ]\n    },\n    bonusImprove: {\n        2: {\n            los: 1\n        },\n        4: {\n            fire: 1,\n            los: 1\n        },\n        6: {\n            fire: 1,\n            los: 2\n        },\n        10: {\n            fire: 2,\n            los: 3\n        }\n    }\n}, {\n    equipment: 61,\n    ship: {\n        isID: [560, // 瑞鳳改二乙\n        508, // 鈴谷航改二\n        509 // 熊野航改二\n        ]\n    },\n    bonusImprove: {\n        1: {\n            fire: 1,\n            los: 1\n        },\n        2: {\n            fire: 1,\n            los: 2\n        },\n        4: {\n            fire: 2,\n            los: 2\n        },\n        6: {\n            fire: 2,\n            los: 3\n        },\n        10: {\n            fire: 3,\n            los: 4\n        }\n    }\n}, {\n    equipment: 61,\n    ship: {\n        isID: [197 // 蒼龍改二\n        ]\n    },\n    bonusImprove: {\n        0: {\n            range: '1'\n        },\n        1: {\n            fire: 3,\n            los: 3,\n            range: '1'\n        },\n        2: {\n            fire: 3,\n            los: 4,\n            range: '1'\n        },\n        4: {\n            fire: 4,\n            los: 4,\n            range: '1'\n        },\n        6: {\n            fire: 4,\n            los: 5,\n            range: '1'\n        },\n        8: {\n            fire: 5,\n            los: 6,\n            range: '1'\n        },\n        10: {\n            fire: 6,\n            los: 7,\n            range: '1'\n        }\n    }\n}, {\n    equipment: 61,\n    ship: {\n        isID: [196 // 飛龍改二\n        ]\n    },\n    bonusImprove: {\n        0: {\n            range: '1'\n        },\n        1: {\n            fire: 2,\n            los: 2,\n            range: '1'\n        },\n        2: {\n            fire: 2,\n            los: 3,\n            range: '1'\n        },\n        4: {\n            fire: 3,\n            los: 3,\n            range: '1'\n        },\n        6: {\n            fire: 3,\n            los: 4,\n            range: '1'\n        },\n        10: {\n            fire: 4,\n            los: 5,\n            range: '1'\n        }\n    }\n\n    // ------------------------------------------------------------------------\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E8%89%A6%E4%B8%8A%E6%A9%9F/%E4%BA%8C%E5%BC%8F%E8%89%A6%E4%B8%8A%E5%81%B5%E5%AF%9F%E6%A9%9F.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/艦上機/天山一二型(友永隊).js":
/*!*************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/艦上機/天山一二型(友永隊).js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * @module\r\n * 装备额外属性收益\r\n * 94. **天山一二型(友永隊)**\r\n */\n\n// https://wikiwiki.jp/kancolle/%E5%A4%A9%E5%B1%B1%E4%B8%80%E4%BA%8C%E5%9E%8B%28%E5%8F%8B%E6%B0%B8%E9%9A%8A%29\n\nvar _require = __webpack_require__(/*! ../../ship-series */ \"./node_modules/kckit/src/data/ship-series/index.js\"),\n    Souryuu = _require.Souryuu,\n    Hiryuu = _require.Hiryuu;\n\nmodule.exports = [{\n    equipment: 94,\n    ship: {\n        isID: Souryuu\n    },\n    bonusCount: {\n        1: {\n            fire: 3\n        }\n    }\n}, {\n    equipment: 94,\n    ship: {\n        isID: Hiryuu\n    },\n    bonusCount: {\n        1: {\n            fire: 7\n        }\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E8%89%A6%E4%B8%8A%E6%A9%9F/%E5%A4%A9%E5%B1%B1%E4%B8%80%E4%BA%8C%E5%9E%8B(%E5%8F%8B%E6%B0%B8%E9%9A%8A).js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/艦上機/天山一二型(村田隊).js":
/*!*************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/艦上機/天山一二型(村田隊).js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n/**\r\n * @module\r\n * 装备额外属性收益\r\n * 144. **天山一二型(村田隊)**\r\n */\n\n// https://wikiwiki.jp/kancolle/%E5%A4%A9%E5%B1%B1%28%E6%9D%91%E7%94%B0%E9%9A%8A%29\n\nvar _require = __webpack_require__(/*! ../../ships */ \"./node_modules/kckit/src/data/ships.js\"),\n    CV_AkagiClassRemodelAll = _require.CV_AkagiClassRemodelAll;\n\nmodule.exports = [{\n    equipment: 144,\n    ship: {\n        isID: [157] // 龍驤改二\n    },\n    bonusCount: {\n        1: {\n            fire: 1\n        }\n    }\n}, {\n    equipment: 144,\n    ship: {\n        isID: [].concat(_toConsumableArray(CV_AkagiClassRemodelAll))\n    },\n    bonusCount: {\n        1: {\n            fire: 3\n        }\n    }\n}, {\n    equipment: 144,\n    ship: {\n        isID: [278] // 加賀改\n    },\n    bonusCount: {\n        1: {\n            fire: 2\n        }\n    }\n}, {\n    equipment: 144,\n    ship: {\n        isID: [110, 288] // 翔鶴 / 翔鶴改\n    },\n    bonusCount: {\n        1: {\n            fire: 2\n        }\n    }\n}, {\n    equipment: 144,\n    ship: {\n        isID: [461, 466] // 翔鶴改二 / 翔鶴改二甲\n    },\n    bonusCount: {\n        1: {\n            fire: 4\n        }\n    }\n}, {\n    equipment: 144,\n    ship: {\n        isID: [111, 112] // 瑞鶴 / 瑞鶴改\n    },\n    bonusCount: {\n        1: {\n            fire: 1\n        }\n    }\n}, {\n    equipment: 144,\n    ship: {\n        isID: [462, 467] // 瑞鶴改二 / 瑞鶴改二甲\n    },\n    bonusCount: {\n        1: {\n            fire: 2\n        }\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E8%89%A6%E4%B8%8A%E6%A9%9F/%E5%A4%A9%E5%B1%B1%E4%B8%80%E4%BA%8C%E5%9E%8B(%E6%9D%91%E7%94%B0%E9%9A%8A).js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/艦上機/天山一二型甲.js":
/*!*********************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/艦上機/天山一二型甲.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n/**\n * @module\n * 装备额外属性收益\n *\n * 372. 天山一二型甲\n *      https://wikiwiki.jp/kancolle/%E5%A4%A9%E5%B1%B1%E4%B8%80%E4%BA%8C%E5%9E%8B%E7%94%B2\n *\n */\n\nvar _require = __webpack_require__(/*! ../../ship-ids */ \"./node_modules/kckit/src/data/ship-ids/index.js\"),\n    龍鳳 = _require.龍鳳,\n    龍鳳改 = _require.龍鳳改,\n    祥鳳 = _require.祥鳳,\n    祥鳳改 = _require.祥鳳改,\n    瑞鳳 = _require.瑞鳳,\n    瑞鳳改 = _require.瑞鳳改,\n    瑞鳳改二 = _require.瑞鳳改二,\n    瑞鳳改二乙 = _require.瑞鳳改二乙,\n    千歳航 = _require.千歳航,\n    千歳航改 = _require.千歳航改,\n    千歳航改二 = _require.千歳航改二,\n    千代田航 = _require.千代田航,\n    千代田航改 = _require.千代田航改,\n    千代田航改二 = _require.千代田航改二;\n\nvar _require2 = __webpack_require__(/*! ../../ship-series */ \"./node_modules/kckit/src/data/ship-series/index.js\"),\n    Shoukaku = _require2.Shoukaku,\n    Zuikaku = _require2.Zuikaku,\n    Taihou = _require2.Taihou,\n    Hiyou = _require2.Hiyou,\n    Junyou = _require2.Junyou;\n\nmodule.exports = [{\n    equipment: 372,\n    ship: {\n        isID: [].concat(_toConsumableArray(Shoukaku), _toConsumableArray(Zuikaku), _toConsumableArray(Taihou))\n    },\n    bonus: {\n        fire: 1,\n        torpedo: 1\n    }\n}, {\n    equipment: 372,\n    ship: {\n        isID: [].concat(_toConsumableArray(Hiyou), _toConsumableArray(Junyou), [千歳航, 千歳航改, 千歳航改二, 千代田航, 千代田航改, 千代田航改二])\n    },\n    bonus: {\n        fire: 1\n    }\n}, {\n    equipment: 372,\n    ship: {\n        isID: [祥鳳, 祥鳳改, 瑞鳳, 瑞鳳改, 龍鳳]\n    },\n    bonus: {\n        asw: 1\n    }\n}, {\n    equipment: 372,\n    ship: {\n        isID: [瑞鳳改二, 瑞鳳改二乙, 龍鳳改]\n    },\n    bonus: {\n        fire: 1,\n        asw: 1\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E8%89%A6%E4%B8%8A%E6%A9%9F/%E5%A4%A9%E5%B1%B1%E4%B8%80%E4%BA%8C%E5%9E%8B%E7%94%B2.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/艦上機/天山一二型甲改(空六号電探改装備機).js":
/*!*********************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/艦上機/天山一二型甲改(空六号電探改装備機).js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n/**\n * @module\n * 装备额外属性收益\n *\n * 373. 天山一二型甲改(空六号電探改装備機)\n *      https://wikiwiki.jp/kancolle/%E5%A4%A9%E5%B1%B1%E4%B8%80%E4%BA%8C%E5%9E%8B%E7%94%B2%E6%94%B9%28%E7%A9%BA%E5%85%AD%E5%8F%B7%E9%9B%BB%E6%8E%A2%E6%94%B9%E8%A3%85%E5%82%99%E6%A9%9F%29\n * 374. 天山一二型甲改(熟練/空六号電探改装備機)\n *      https://wikiwiki.jp/kancolle/%E5%A4%A9%E5%B1%B1%E4%B8%80%E4%BA%8C%E5%9E%8B%E7%94%B2%E6%94%B9%28%E7%86%9F%E7%B7%B4%EF%BC%8F%E7%A9%BA%E5%85%AD%E5%8F%B7%E9%9B%BB%E6%8E%A2%E6%94%B9%E8%A3%85%E5%82%99%E6%A9%9F%29\n *\n */\n\nvar _require = __webpack_require__(/*! ../../ship-ids */ \"./node_modules/kckit/src/data/ship-ids/index.js\"),\n    翔鶴改二 = _require.翔鶴改二,\n    翔鶴改二甲 = _require.翔鶴改二甲,\n    瑞鶴改二 = _require.瑞鶴改二,\n    瑞鶴改二甲 = _require.瑞鶴改二甲,\n    大鳳改 = _require.大鳳改,\n    龍鳳 = _require.龍鳳,\n    龍鳳改 = _require.龍鳳改,\n    祥鳳 = _require.祥鳳,\n    祥鳳改 = _require.祥鳳改,\n    瑞鳳 = _require.瑞鳳,\n    瑞鳳改 = _require.瑞鳳改,\n    瑞鳳改二 = _require.瑞鳳改二,\n    瑞鳳改二乙 = _require.瑞鳳改二乙,\n    飛鷹改 = _require.飛鷹改,\n    隼鷹改二 = _require.隼鷹改二,\n    千歳航 = _require.千歳航,\n    千歳航改 = _require.千歳航改,\n    千歳航改二 = _require.千歳航改二,\n    千代田航 = _require.千代田航,\n    千代田航改 = _require.千代田航改,\n    千代田航改二 = _require.千代田航改二,\n    鈴谷航改二 = _require.鈴谷航改二,\n    熊野航改二 = _require.熊野航改二;\n\nvar _require2 = __webpack_require__(/*! ../../ship-series */ \"./node_modules/kckit/src/data/ship-series/index.js\"),\n    Shoukaku = _require2.Shoukaku,\n    Zuikaku = _require2.Zuikaku,\n    Taihou = _require2.Taihou,\n    Hiyou = _require2.Hiyou,\n    Junyou = _require2.Junyou;\n\nvar 天山一二型甲改_空六号電探改装備機 = [{\n    equipment: 373,\n    ship: {\n        isID: [].concat(_toConsumableArray(Shoukaku))\n    },\n    bonus: {\n        fire: 2,\n        torpedo: 2,\n        evasion: 2\n    }\n}, {\n    equipment: 373,\n    ship: {\n        isID: [].concat(_toConsumableArray(Zuikaku))\n    },\n    bonus: {\n        fire: 1,\n        torpedo: 2,\n        evasion: 3\n    }\n}, {\n    equipment: 373,\n    ship: {\n        isID: [].concat(_toConsumableArray(Taihou), [鈴谷航改二, 熊野航改二])\n    },\n    bonus: {\n        fire: 1,\n        torpedo: 2,\n        evasion: 2\n    }\n}, {\n    equipment: 373,\n    ship: {\n        isID: [祥鳳, 瑞鳳]\n    },\n    bonus: {\n        torpedo: 1,\n        asw: 1\n    }\n}, {\n    equipment: 373,\n    ship: {\n        isID: [龍鳳, 祥鳳改, 瑞鳳改]\n    },\n    bonus: {\n        fire: 1,\n        torpedo: 1,\n        asw: 1\n    }\n}, {\n    equipment: 373,\n    ship: {\n        isID: [龍鳳改, 瑞鳳改二, 瑞鳳改二乙]\n    },\n    bonus: {\n        fire: 1,\n        torpedo: 1,\n        asw: 2,\n        evasion: 1\n    }\n}, {\n    equipment: 373,\n    ship: {\n        isID: [千歳航, 千代田航]\n    },\n    bonus: {\n        fire: 1\n    }\n}, {\n    equipment: 373,\n    ship: {\n        isID: [千歳航改, 千代田航改]\n    },\n    bonus: {\n        fire: 1,\n        torpedo: 1\n    }\n}, {\n    equipment: 373,\n    ship: {\n        isID: [].concat(_toConsumableArray(Hiyou), _toConsumableArray(Junyou), [千歳航改二, 千代田航改二])\n    },\n    bonus: {\n        fire: 1,\n        torpedo: 1,\n        evasion: 1\n    }\n}];\n\nvar 天山一二型甲改_熟練_空六号電探改装備機 = [{\n    equipment: 374,\n    ship: {\n        isID: [翔鶴改二, 翔鶴改二甲]\n    },\n    bonus: {\n        fire: 3,\n        torpedo: 3,\n        evasion: 3\n    }\n}, {\n    equipment: 374,\n    ship: {\n        isID: [瑞鶴改二, 瑞鶴改二甲]\n    },\n    bonus: {\n        fire: 2,\n        torpedo: 3,\n        evasion: 4\n    }\n}, {\n    equipment: 374,\n    ship: {\n        isID: [大鳳改]\n    },\n    bonus: {\n        fire: 2,\n        torpedo: 3,\n        evasion: 2\n    }\n}, {\n    equipment: 374,\n    ship: {\n        isID: [瑞鳳改二, 瑞鳳改二乙, 龍鳳改]\n    },\n    bonus: {\n        fire: 1,\n        torpedo: 1,\n        asw: 3,\n        evasion: 2\n    }\n}, {\n    equipment: 374,\n    ship: {\n        isID: [鈴谷航改二, 熊野航改二]\n    },\n    bonus: {\n        fire: 1,\n        torpedo: 2,\n        asw: 2,\n        evasion: 3\n    }\n}, {\n    equipment: 374,\n    ship: {\n        isID: [千歳航改二, 千代田航改二]\n    },\n    bonus: {\n        fire: 1,\n        torpedo: 1,\n        asw: 1,\n        evasion: 1\n    }\n}, {\n    equipment: 374,\n    ship: {\n        isID: [飛鷹改, 隼鷹改二]\n    },\n    bonus: {\n        fire: 1,\n        torpedo: 2,\n        evasion: 2\n    }\n}, {\n    equipment: 374,\n    ship: {\n        isID: [祥鳳改]\n    },\n    bonus: {\n        fire: 1,\n        torpedo: 2,\n        asw: 2,\n        evasion: 1\n    }\n}];\n\nmodule.exports = [].concat(天山一二型甲改_空六号電探改装備機, 天山一二型甲改_熟練_空六号電探改装備機);\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E8%89%A6%E4%B8%8A%E6%A9%9F/%E5%A4%A9%E5%B1%B1%E4%B8%80%E4%BA%8C%E5%9E%8B%E7%94%B2%E6%94%B9(%E7%A9%BA%E5%85%AD%E5%8F%B7%E9%9B%BB%E6%8E%A2%E6%94%B9%E8%A3%85%E5%82%99%E6%A9%9F).js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/艦上機/彗星(六〇一空).js":
/*!***********************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/艦上機/彗星(六〇一空).js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * 装备额外属性收益 - 彗星(六〇一空)\r\n * \r\n * @module\r\n */\n\nvar _require = __webpack_require__(/*! ../../ships */ \"./node_modules/kckit/src/data/ships.js\"),\n    BB_IseClass2ndRemodel = _require.BB_IseClass2ndRemodel;\n\nmodule.exports = [\n\n// @ 伊勢型 改二\n{\n    equipment: 111,\n    ship: {\n        isID: BB_IseClass2ndRemodel\n    },\n    bonus: {\n        fire: 2\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E8%89%A6%E4%B8%8A%E6%A9%9F/%E5%BD%97%E6%98%9F(%E5%85%AD%E3%80%87%E4%B8%80%E7%A9%BA).js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/艦上機/彗星(江草隊).js":
/*!**********************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/艦上機/彗星(江草隊).js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * @module\r\n * 装备额外属性收益\r\n * 100. **彗星(江草隊)**\r\n */\n\n// https://wikiwiki.jp/kancolle/%E4%B9%9D%E4%B9%9D%E5%BC%8F%E8%89%A6%E7%88%86%28%E6%B1%9F%E8%8D%89%E9%9A%8A%29\n\nvar _require = __webpack_require__(/*! ../../ship-series */ \"./node_modules/kckit/src/data/ship-series/index.js\"),\n    Souryuu = _require.Souryuu,\n    Hiryuu = _require.Hiryuu;\n\nvar _require2 = __webpack_require__(/*! ../../ships */ \"./node_modules/kckit/src/data/ships.js\"),\n    BB_IseClass2ndRemodel = _require2.BB_IseClass2ndRemodel;\n\nmodule.exports = [\n\n// @ 伊勢型 改二\n{\n    equipment: 100,\n    ship: {\n        isID: BB_IseClass2ndRemodel\n    },\n    bonus: {\n        fire: 4\n    }\n}, {\n    equipment: 100,\n    ship: {\n        isID: Souryuu\n    },\n    bonusCount: {\n        1: {\n            fire: 6\n        }\n    }\n}, {\n    equipment: 100,\n    ship: {\n        isID: Hiryuu\n    },\n    bonusCount: {\n        1: {\n            fire: 3\n        }\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E8%89%A6%E4%B8%8A%E6%A9%9F/%E5%BD%97%E6%98%9F(%E6%B1%9F%E8%8D%89%E9%9A%8A).js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/艦上機/彗星.js":
/*!*****************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/艦上機/彗星.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * 装备额外属性收益 - 彗星\r\n * \r\n * @module\r\n */\n\nvar _require = __webpack_require__(/*! ../../ships */ \"./node_modules/kckit/src/data/ships.js\"),\n    BB_IseClass2ndRemodel = _require.BB_IseClass2ndRemodel;\n\nmodule.exports = [\n\n// @ 伊勢型 改二\n{\n    equipment: 24,\n    ship: {\n        isID: BB_IseClass2ndRemodel\n    },\n    bonus: {\n        fire: 2\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E8%89%A6%E4%B8%8A%E6%A9%9F/%E5%BD%97%E6%98%9F.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/艦上機/彗星一ニ型(三一号光電管爆弾搭載機).js":
/*!*********************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/艦上機/彗星一ニ型(三一号光電管爆弾搭載機).js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * @module\r\n * 装备额外属性收益\r\n * 320. **彗星一ニ型(三一号光電管爆弾搭載機)**\r\n */\n\n// https://wikiwiki.jp/kancolle/%E5%BD%97%E6%98%9F%E4%B8%80%E3%83%8B%E5%9E%8B%28%E4%B8%89%E4%B8%80%E5%8F%B7%E5%85%89%E9%9B%BB%E7%AE%A1%E7%88%86%E5%BC%BE%E6%90%AD%E8%BC%89%E6%A9%9F%29\n\nmodule.exports = [{\n    equipment: 320,\n    ship: {\n        isID: [553 // 伊勢改二\n        ]\n    },\n    bonus: {\n        fire: 2\n    }\n}, {\n    equipment: 320,\n    ship: {\n        isID: [554 // 日向改二\n        ]\n    },\n    bonus: {\n        fire: 4\n    }\n}, {\n    equipment: 320,\n    ship: {\n        isID: [197, // 蒼龍改二\n        196 // 飛龍改二\n        ]\n    },\n    bonus: {\n        fire: 3\n    }\n}, {\n    equipment: 320,\n    ship: {\n        isID: [508, // 鈴谷航改二\n        509 // 熊野航改二\n        ]\n    },\n    bonus: {\n        fire: 4\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E8%89%A6%E4%B8%8A%E6%A9%9F/%E5%BD%97%E6%98%9F%E4%B8%80%E3%83%8B%E5%9E%8B(%E4%B8%89%E4%B8%80%E5%8F%B7%E5%85%89%E9%9B%BB%E7%AE%A1%E7%88%86%E5%BC%BE%E6%90%AD%E8%BC%89%E6%A9%9F).js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/艦上機/彗星一二型(六三四空／三号爆弾搭載機).js":
/*!**********************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/艦上機/彗星一二型(六三四空／三号爆弾搭載機).js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * @module\r\n * 装备额外属性收益\r\n * 319. **彗星一二型(六三四空/三号爆弾搭載機)**\r\n */\n\n// https://wikiwiki.jp/kancolle/%E5%BD%97%E6%98%9F%E4%B8%80%E4%BA%8C%E5%9E%8B%28%E5%85%AD%E4%B8%89%E5%9B%9B%E7%A9%BA%EF%BC%8F%E4%B8%89%E5%8F%B7%E7%88%86%E5%BC%BE%E6%90%AD%E8%BC%89%E6%A9%9F%29\n\nvar _require = __webpack_require__(/*! ../../ships */ \"./node_modules/kckit/src/data/ships.js\"),\n    BB_IseClass2ndRemodel = _require.BB_IseClass2ndRemodel;\n\nmodule.exports = [{\n    equipment: 319,\n    ship: {\n        isID: BB_IseClass2ndRemodel\n    },\n    bonus: {\n        fire: 7,\n        aa: 3,\n        evasion: 2\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E8%89%A6%E4%B8%8A%E6%A9%9F/%E5%BD%97%E6%98%9F%E4%B8%80%E4%BA%8C%E5%9E%8B(%E5%85%AD%E4%B8%89%E5%9B%9B%E7%A9%BA%EF%BC%8F%E4%B8%89%E5%8F%B7%E7%88%86%E5%BC%BE%E6%90%AD%E8%BC%89%E6%A9%9F).js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/艦上機/彗星一二型甲.js":
/*!*********************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/艦上機/彗星一二型甲.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * 装备额外属性收益 - 彗星一二型甲\r\n * \r\n * @module\r\n */\n\nvar _require = __webpack_require__(/*! ../../ships */ \"./node_modules/kckit/src/data/ships.js\"),\n    BB_IseClass2ndRemodel = _require.BB_IseClass2ndRemodel;\n\nmodule.exports = [\n\n// @ 伊勢型 改二\n{\n    equipment: 57,\n    ship: {\n        isID: BB_IseClass2ndRemodel\n    },\n    bonus: {\n        fire: 2\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E8%89%A6%E4%B8%8A%E6%A9%9F/%E5%BD%97%E6%98%9F%E4%B8%80%E4%BA%8C%E5%9E%8B%E7%94%B2.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/艦上機/彗星二二型(六三四空).js":
/*!**************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/艦上機/彗星二二型(六三四空).js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * 装备额外属性收益 - 彗星二二型(六三四空)\r\n * \r\n * @module\r\n */\n\nvar _require = __webpack_require__(/*! ../../ships */ \"./node_modules/kckit/src/data/ships.js\"),\n    BB_IseClass2ndRemodel = _require.BB_IseClass2ndRemodel;\n\nmodule.exports = [\n\n// @ 伊勢型 改二\n{\n    equipment: 291,\n    ship: {\n        isID: BB_IseClass2ndRemodel\n    },\n    bonus: {\n        fire: 6,\n        evasion: 1\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E8%89%A6%E4%B8%8A%E6%A9%9F/%E5%BD%97%E6%98%9F%E4%BA%8C%E4%BA%8C%E5%9E%8B(%E5%85%AD%E4%B8%89%E5%9B%9B%E7%A9%BA).js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/艦上機/彗星二二型(六三四空／熟練).js":
/*!*****************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/艦上機/彗星二二型(六三四空／熟練).js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * 装备额外属性收益 - 彗星二二型(六三四空/熟練)\r\n * \r\n * @module\r\n */\n\nvar _require = __webpack_require__(/*! ../../ships */ \"./node_modules/kckit/src/data/ships.js\"),\n    BB_IseClass2ndRemodel = _require.BB_IseClass2ndRemodel;\n\nmodule.exports = [\n\n// @ 伊勢型 改二\n{\n    equipment: 292,\n    ship: {\n        isID: BB_IseClass2ndRemodel\n    },\n    bonus: {\n        fire: 8,\n        aa: 1,\n        evasion: 2\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E8%89%A6%E4%B8%8A%E6%A9%9F/%E5%BD%97%E6%98%9F%E4%BA%8C%E4%BA%8C%E5%9E%8B(%E5%85%AD%E4%B8%89%E5%9B%9B%E7%A9%BA%EF%BC%8F%E7%86%9F%E7%B7%B4).js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/艦上機/彩雲.js":
/*!*****************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/艦上機/彩雲.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * @module\r\n * 装备额外属性收益\r\n *\r\n *  54. 彩雲\r\n *      https://wikiwiki.jp/kancolle/%E5%BD%A9%E9%9B%B2\r\n *\r\n */\n\nvar _require = __webpack_require__(/*! ../../../types/ships */ \"./node_modules/kckit/src/types/ships.js\"),\n    Carriers = _require.Carriers;\n\nmodule.exports = [{\n    equipment: 54,\n    ship: {\n        isType: Carriers\n    },\n    bonusImprove: {\n        2: {\n            los: 1\n        }\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E8%89%A6%E4%B8%8A%E6%A9%9F/%E5%BD%A9%E9%9B%B2.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/艦上機/流星.js":
/*!*****************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/艦上機/流星.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * @module\r\n * 装备额外属性收益\r\n * 18. **流星**\r\n * 52. **流星改**\r\n */\n\n// https://wikiwiki.jp/kancolle/%E6%B5%81%E6%98%9F\n// https://wikiwiki.jp/kancolle/%E6%B5%81%E6%98%9F%E6%94%B9\n\nvar equipments = [18, 52];\nvar result = [];\n\nequipments.forEach(function (equipment) {\n    result.push({\n        equipment: equipment,\n        ship: {\n            isID: [277, // 赤城改\n            278, // 加賀改\n            156 // 大鳳改\n            ]\n        },\n        bonus: {\n            fire: 1\n        }\n    });\n    result.push({\n        equipment: equipment,\n        ship: {\n            isID: [594 // 赤城改二\n            ]\n        },\n        bonus: {\n            fire: 1,\n            evasion: 1\n        }\n    });\n    result.push({\n        equipment: equipment,\n        ship: {\n            isID: [599 // 赤城改二戊\n            ]\n        },\n        bonus: {\n            fire: 2,\n            evasion: 1\n        }\n    });\n});\n\nmodule.exports = result;\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E8%89%A6%E4%B8%8A%E6%A9%9F/%E6%B5%81%E6%98%9F.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/艦上機/流星改(一航戦).js":
/*!***********************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/艦上機/流星改(一航戦).js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n/**\r\n * @module\r\n * 装备额外属性收益\r\n * 342. **流星改(一航戦)**\r\n * 343. **流星改(一航戦/熟練)**\r\n */\n\nvar _require = __webpack_require__(/*! ../../ships */ \"./node_modules/kckit/src/data/ships.js\"),\n    CV_ShoukakuClass2ndRemodel = _require.CV_ShoukakuClass2ndRemodel;\n\nmodule.exports = [\n// ========================================================================\n// 流星改(一航戦)\n// https://wikiwiki.jp/kancolle/%E6%B5%81%E6%98%9F%E6%94%B9%28%E4%B8%80%E8%88%AA%E6%88%A6%29\n// ========================================================================\n{\n    equipment: 342,\n    ship: {\n        isID: [277, // 赤城改\n        278].concat(_toConsumableArray(CV_ShoukakuClass2ndRemodel))\n    },\n    bonus: {\n        fire: 1\n    }\n}, {\n    equipment: 342,\n    ship: {\n        isID: [594 // 赤城改二\n        ]\n    },\n    bonus: {\n        fire: 2,\n        aa: 2,\n        evasion: 1\n    }\n}, {\n    equipment: 342,\n    ship: {\n        isID: [599 // 赤城改二戊\n        ]\n    },\n    bonus: {\n        fire: 3,\n        aa: 2,\n        evasion: 2\n    }\n},\n\n// ========================================================================\n// 流星改(一航戦/熟練)\n// https://wikiwiki.jp/kancolle/%E6%B5%81%E6%98%9F%E6%94%B9%28%E4%B8%80%E8%88%AA%E6%88%A6%EF%BC%8F%E7%86%9F%E7%B7%B4%29\n// ========================================================================\n{\n    equipment: 343,\n    ship: {\n        isID: [].concat(_toConsumableArray(CV_ShoukakuClass2ndRemodel))\n    },\n    bonus: {\n        fire: 1\n    }\n}, {\n    equipment: 343,\n    ship: {\n        isID: [277, // 赤城改\n        278 // 加賀改\n        ]\n    },\n    bonus: {\n        fire: 2\n    }\n}, {\n    equipment: 343,\n    ship: {\n        isID: [594 // 赤城改二\n        ]\n    },\n    bonus: {\n        fire: 3,\n        aa: 2,\n        evasion: 1\n    }\n}, {\n    equipment: 343,\n    ship: {\n        isID: [599 // 赤城改二戊\n        ]\n    },\n    bonus: {\n        fire: 5,\n        aa: 3,\n        evasion: 3\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E8%89%A6%E4%B8%8A%E6%A9%9F/%E6%B5%81%E6%98%9F%E6%94%B9(%E4%B8%80%E8%88%AA%E6%88%A6).js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/艦上機/烈風改.js":
/*!******************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/艦上機/烈風改.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n/**\r\n * @module\r\n * 装备额外属性收益\r\n * 335. **烈風改(試製艦載型)**\r\n */\n\nvar _require = __webpack_require__(/*! ../../ships */ \"./node_modules/kckit/src/data/ships.js\"),\n    CV_AkagiClass2ndRemodel = _require.CV_AkagiClass2ndRemodel;\n\nmodule.exports = [\n// ========================================================================\n// 烈風改(試製艦載型)\n// https://wikiwiki.jp/kancolle/%E7%83%88%E9%A2%A8%E6%94%B9%28%E8%A9%A6%E8%A3%BD%E8%89%A6%E8%BC%89%E5%9E%8B%29\n// ========================================================================\n{\n    equipment: 335,\n    ship: {\n        isID: [277, // 赤城改\n        278 // 加賀改\n        ]\n    },\n    bonus: {\n        aa: 1,\n        evasion: 1\n    }\n}, {\n    equipment: 335,\n    ship: {\n        isID: [].concat(_toConsumableArray(CV_AkagiClass2ndRemodel))\n    },\n    bonus: {\n        aa: 2,\n        evasion: 1\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E8%89%A6%E4%B8%8A%E6%A9%9F/%E7%83%88%E9%A2%A8%E6%94%B9.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/艦上機/烈風改二.js":
/*!*******************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/艦上機/烈風改二.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n/**\r\n * @module\r\n * 装备额外属性收益\r\n * 336. **烈風改二**\r\n */\n\nvar _require = __webpack_require__(/*! ../../ships */ \"./node_modules/kckit/src/data/ships.js\"),\n    CV_AkagiClass2ndRemodel = _require.CV_AkagiClass2ndRemodel;\n\nmodule.exports = [\n// ========================================================================\n// 烈風改二\n// https://wikiwiki.jp/kancolle/%E7%83%88%E9%A2%A8%E6%94%B9%E4%BA%8C\n// ========================================================================\n{\n    equipment: 336,\n    ship: {\n        isID: [277, // 赤城改\n        278 // 加賀改\n        ]\n    },\n    bonus: {\n        fire: 1,\n        aa: 1,\n        evasion: 1\n    }\n}, {\n    equipment: 336,\n    ship: {\n        isID: [].concat(_toConsumableArray(CV_AkagiClass2ndRemodel))\n    },\n    bonus: {\n        fire: 1,\n        aa: 2,\n        evasion: 1\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E8%89%A6%E4%B8%8A%E6%A9%9F/%E7%83%88%E9%A2%A8%E6%94%B9%E4%BA%8C.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/艦上機/烈風改二戊型.js":
/*!*********************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/艦上機/烈風改二戊型.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * @module\r\n * 装备额外属性收益\r\n * 338. **烈風改二戊型**\r\n * 339. **烈風改二戊型(一航戦/熟練)**\r\n */\n\nmodule.exports = [\n// ========================================================================\n// 烈風改二戊型\n// https://wikiwiki.jp/kancolle/%E7%83%88%E9%A2%A8%E6%94%B9%E4%BA%8C%E6%88%8A%E5%9E%8B\n// ========================================================================\n{\n    equipment: 338,\n    ship: {\n        isID: [277, // 赤城改\n        278 // 加賀改\n        ]\n    },\n    bonus: {\n        fire: 1,\n        aa: 1,\n        evasion: 2\n    }\n}, {\n    equipment: 338,\n    ship: {\n        isID: [594] // 赤城改二\n    },\n    bonus: {\n        fire: 1,\n        aa: 2,\n        evasion: 3\n    }\n}, {\n    equipment: 338,\n    ship: {\n        isID: [599] // 赤城改二戊\n    },\n    bonus: {\n        fire: 4,\n        aa: 3,\n        evasion: 4\n    }\n},\n\n// ========================================================================\n// 烈風改二戊型(一航戦/熟練)\n// https://wikiwiki.jp/kancolle/%E7%83%88%E9%A2%A8%E6%94%B9%E4%BA%8C%E6%88%8A%E5%9E%8B%28%E4%B8%80%E8%88%AA%E6%88%A6%EF%BC%8F%E7%86%9F%E7%B7%B4%29\n// ========================================================================\n{\n    equipment: 339,\n    ship: {\n        isID: [277, // 赤城改\n        278 // 加賀改\n        ]\n    },\n    bonus: {\n        fire: 1,\n        aa: 2,\n        evasion: 2\n    }\n}, {\n    equipment: 339,\n    ship: {\n        isID: [594] // 赤城改二\n    },\n    bonus: {\n        fire: 1,\n        aa: 3,\n        evasion: 4\n    }\n}, {\n    equipment: 339,\n    ship: {\n        isID: [599] // 赤城改二戊\n    },\n    bonus: {\n        fire: 6,\n        aa: 4,\n        evasion: 5\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E8%89%A6%E4%B8%8A%E6%A9%9F/%E7%83%88%E9%A2%A8%E6%94%B9%E4%BA%8C%E6%88%8A%E5%9E%8B.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/艦上機/試製景雲(艦偵型).js":
/*!************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/艦上機/試製景雲(艦偵型).js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * @module\r\n * 装备额外属性收益\r\n *\r\n * 151. 試製景雲(艦偵型)\r\n *      https://wikiwiki.jp/kancolle/%E8%A9%A6%E8%A3%BD%E6%99%AF%E9%9B%B2%28%E8%89%A6%E5%81%B5%E5%9E%8B%29\r\n *\r\n */\n\nmodule.exports = [{\n    equipment: 151,\n    ship: {\n        isType: [11 // 装甲空母\n        ]\n    },\n    bonusImprove: {\n        2: {\n            los: 1\n        },\n        4: {\n            fire: 1,\n            los: 1\n        },\n        6: {\n            fire: 1,\n            los: 2\n        },\n        10: {\n            fire: 2,\n            los: 3\n        }\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E8%89%A6%E4%B8%8A%E6%A9%9F/%E8%A9%A6%E8%A3%BD%E6%99%AF%E9%9B%B2(%E8%89%A6%E5%81%B5%E5%9E%8B).js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/電探/13号対空電探改.js":
/*!**********************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/電探/13号対空電探改.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n/**\r\n * 装备额外属性收益\r\n * 106. **13号対空電探改**\r\n * \r\n * @module\r\n */\n\n// https://wikiwiki.jp/kancolle/13%E5%8F%B7%E5%AF%BE%E7%A9%BA%E9%9B%BB%E6%8E%A2%E6%94%B9\n\nvar _require = __webpack_require__(/*! ../../ships */ \"./node_modules/kckit/src/data/ships.js\"),\n    Yahagi = _require.Yahagi,\n    Ooyodo = _require.Ooyodo,\n    Kashima = _require.Kashima,\n    Hibiki = _require.Hibiki,\n    Kasumi = _require.Kasumi,\n    Yukikaze = _require.Yukikaze,\n    Isokaze = _require.Isokaze,\n    Hamakaze = _require.Hamakaze,\n    Asashimo = _require.Asashimo,\n    Suzutsuki = _require.Suzutsuki;\n\nmodule.exports = [{\n    equipment: 106,\n    ship: {\n        isID: [].concat(_toConsumableArray(Ooyodo), _toConsumableArray(Kashima), _toConsumableArray(Hibiki))\n    },\n    bonus: {\n        aa: 1,\n        evasion: 3,\n        armor: 1\n    }\n}, {\n    equipment: 106,\n    ship: {\n        isID: [].concat(_toConsumableArray(Yahagi), _toConsumableArray(Kasumi), _toConsumableArray(Yukikaze), _toConsumableArray(Isokaze), _toConsumableArray(Hamakaze), _toConsumableArray(Asashimo), _toConsumableArray(Suzutsuki))\n    },\n    bonus: {\n        aa: 2,\n        evasion: 2,\n        armor: 1\n    }\n}, {\n    equipment: 106,\n    ship: {\n        isID: [151, // 榛名改二\n        541, // 長門改二\n        407, // 潮改二\n        145, // 時雨改二\n        419]\n    },\n    bonus: {\n        fire: 1,\n        aa: 2,\n        evasion: 3,\n        armor: 1\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E9%9B%BB%E6%8E%A2/13%E5%8F%B7%E5%AF%BE%E7%A9%BA%E9%9B%BB%E6%8E%A2%E6%94%B9.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/電探/GFCS Mk.37.js":
/*!************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/電探/GFCS Mk.37.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * 装备额外属性收益\r\n * 307. **GFCS Mk.37**\r\n * \r\n * @module\r\n */\n\n// https://wikiwiki.jp/kancolle/GFCS%20Mk.37\n\nvar _require = __webpack_require__(/*! ../../ship-classes */ \"./node_modules/kckit/src/data/ship-classes.js\"),\n    group_Navy_USN = _require.group_Navy_USN;\n\nmodule.exports = [\n\n// @ US Navy\n{\n    equipment: 307,\n    ship: {\n        isClass: group_Navy_USN\n    },\n    bonus: {\n        fire: 1,\n        aa: 1,\n        evasion: 1\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E9%9B%BB%E6%8E%A2/GFCS_Mk.37.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/電探/SK／SGレーダー.js":
/*!***********************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/電探/SK／SGレーダー.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n/**\n * @module\n * 装备额外属性收益\n *\n * 315. SG レーダー(初期型)\n *      https://wikiwiki.jp/kancolle/SG%20%E3%83%AC%E3%83%BC%E3%83%80%E3%83%BC%28%E5%88%9D%E6%9C%9F%E5%9E%8B%29\n * 278. SK レーダー\n *      https://wikiwiki.jp/kancolle/SK%E3%83%AC%E3%83%BC%E3%83%80%E3%83%BC\n * 279. SK+SG レーダー\n *      https://wikiwiki.jp/kancolle/SK%EF%BC%8BSG%E3%83%AC%E3%83%BC%E3%83%80%E3%83%BC\n *\n */\n\nvar _require = __webpack_require__(/*! ../../ship-classes */ \"./node_modules/kckit/src/data/ship-classes.js\"),\n    group_Navy_USN = _require.group_Navy_USN,\n    group_DD_Navy_USN = _require.group_DD_Navy_USN,\n    group_BB_Navy_RN = _require.group_BB_Navy_RN,\n    group_CV_Navy_RN = _require.group_CV_Navy_RN,\n    group_CL_Navy_RAN = _require.group_CL_Navy_RAN;\n\nvar _require2 = __webpack_require__(/*! ../../ship-ids */ \"./node_modules/kckit/src/data/ship-ids/index.js\"),\n    沖波改二 = _require2.沖波改二;\n\nvar group_Navy_USN_excludes_DD = group_Navy_USN.filter(function (classId) {\n    return !group_DD_Navy_USN.includes(classId);\n});\n\n// ============================================================================\n\nvar SGレーダー_初期型 = [{\n    equipment: 315,\n    ship: {\n        isClass: group_DD_Navy_USN\n    },\n    bonus: {\n        fire: 3,\n        evasion: 3,\n        los: 4,\n        range: '1'\n    }\n}, {\n    equipment: 315,\n    ship: {\n        isClass: [].concat(_toConsumableArray(group_Navy_USN_excludes_DD))\n    },\n    bonus: {\n        fire: 2,\n        evasion: 3,\n        los: 4\n    }\n}, {\n    equipment: 315,\n    ship: {\n        isID: [沖波改二]\n    },\n    bonusCount: {\n        1: {\n            fire: 1,\n            aa: 2,\n            evasion: 3\n        }\n    }\n}];\n\n// ============================================================================\n\nvar SKレーダー = [{\n    equipment: 278,\n    ship: {\n        isClass: [].concat(_toConsumableArray(group_Navy_USN_excludes_DD))\n    },\n    bonus: {\n        aa: 1,\n        los: 1,\n        evasion: 3\n    }\n}, {\n    equipment: 278,\n    ship: {\n        isClass: [].concat(_toConsumableArray(group_BB_Navy_RN), _toConsumableArray(group_CV_Navy_RN))\n    },\n    bonus: {\n        aa: 1,\n        evasion: 2\n    }\n}, {\n    equipment: 278,\n    ship: {\n        isClass: [].concat(_toConsumableArray(group_CL_Navy_RAN))\n    },\n    bonus: {\n        aa: 1,\n        evasion: 1\n    }\n}];\n\n// ============================================================================\n\nvar SK_SG_レーダー = [{\n    equipment: 279,\n    ship: {\n        isClass: [].concat(_toConsumableArray(group_Navy_USN_excludes_DD))\n    },\n    bonus: {\n        fire: 2,\n        aa: 2,\n        los: 2,\n        evasion: 3\n    }\n}, {\n    equipment: 279,\n    ship: {\n        isClass: [].concat(_toConsumableArray(group_BB_Navy_RN), _toConsumableArray(group_CV_Navy_RN))\n    },\n    bonus: {\n        fire: 1,\n        aa: 1,\n        los: 1,\n        evasion: 2\n    }\n}, {\n    equipment: 279,\n    ship: {\n        isClass: [].concat(_toConsumableArray(group_CL_Navy_RAN))\n    },\n    bonus: {\n        fire: 1,\n        aa: 1,\n        evasion: 1\n    }\n}];\n\nmodule.exports = [].concat(SGレーダー_初期型, SKレーダー, SK_SG_レーダー);\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E9%9B%BB%E6%8E%A2/SK%EF%BC%8FSG%E3%83%AC%E3%83%BC%E3%83%80%E3%83%BC.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/魚雷/533mm 三連装魚雷.js":
/*!*************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/魚雷/533mm 三連装魚雷.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * 装备额外属性收益\r\n * 283. **533mm 三連装魚雷**\r\n * \r\n * @module\r\n */\n\n// https://wikiwiki.jp/kancolle/533mm%20%E4%B8%89%E9%80%A3%E8%A3%85%E9%AD%9A%E9%9B%B7\n\nvar _require = __webpack_require__(/*! ../../ships */ \"./node_modules/kckit/src/data/ships.js\"),\n    vmf_DD = _require.vmf_DD;\n\nmodule.exports = [{\n    equipment: 283,\n    ship: {\n        isID: vmf_DD\n    },\n    bonus: {\n        fire: 1,\n        torpedo: 3,\n        armor: 1\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E9%AD%9A%E9%9B%B7/533mm_%E4%B8%89%E9%80%A3%E8%A3%85%E9%AD%9A%E9%9B%B7.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/魚雷/533mm五連装魚雷.js":
/*!************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/魚雷/533mm五連装魚雷.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n/**\n * @module\n * 装备额外属性收益\n *\n * 314. 533mm五連装魚雷(初期型)\n *      https://wikiwiki.jp/kancolle/533mm%E4%BA%94%E9%80%A3%E8%A3%85%E9%AD%9A%E9%9B%B7%28%E5%88%9D%E6%9C%9F%E5%9E%8B%29\n * 376. 533mm五連装魚雷(後期型)\n *      https://wikiwiki.jp/kancolle/533mm%E4%BA%94%E9%80%A3%E8%A3%85%E9%AD%9A%E9%9B%B7%28%E5%BE%8C%E6%9C%9F%E5%9E%8B%29\n *\n */\n\nvar _require = __webpack_require__(/*! ../../ship-classes */ \"./node_modules/kckit/src/data/ship-classes.js\"),\n    group_CA_Navy_USN = _require.group_CA_Navy_USN,\n    group_CL_Navy_USN = _require.group_CL_Navy_USN,\n    group_DD_Navy_USN = _require.group_DD_Navy_USN,\n    group_CL_Navy_RAN = _require.group_CL_Navy_RAN,\n    group_DD_Navy_RN = _require.group_DD_Navy_RN;\n\nvar 初期型 = [{\n    equipment: 314,\n    ship: {\n        isClass: group_DD_Navy_USN\n    },\n    bonus: {\n        fire: 1,\n        torpedo: 3\n    }\n}];\n\nvar 後期型 = [{\n    equipment: 376,\n    ship: {\n        isClass: [].concat(_toConsumableArray(group_CA_Navy_USN), _toConsumableArray(group_CL_Navy_USN), _toConsumableArray(group_DD_Navy_USN))\n    },\n    bonus: {\n        fire: 2,\n        torpedo: 4\n    }\n}, {\n    equipment: 376,\n    ship: {\n        isClass: [].concat(_toConsumableArray(group_DD_Navy_RN))\n    },\n    bonus: {\n        fire: 1,\n        torpedo: 2\n    }\n}, {\n    equipment: 376,\n    ship: {\n        isClass: [].concat(_toConsumableArray(group_CL_Navy_RAN))\n    },\n    bonus: {\n        fire: 1,\n        torpedo: 1\n    }\n}];\n\nmodule.exports = [].concat(初期型, 後期型);\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E9%AD%9A%E9%9B%B7/533mm%E4%BA%94%E9%80%A3%E8%A3%85%E9%AD%9A%E9%9B%B7.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/魚雷/53cm艦首(酸素)魚雷.js":
/*!**************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/魚雷/53cm艦首(酸素)魚雷.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * 装备额外属性收益 - 53cm艦首(酸素)魚雷\r\n * \r\n * @module\r\n */\n\nmodule.exports = [{\n    equipment: 67,\n    ship: {\n        canEquip: [12],\n        isNotType: [13, 14]\n    },\n    bonus: {\n        torpedo: -5\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E9%AD%9A%E9%9B%B7/53cm%E8%89%A6%E9%A6%96(%E9%85%B8%E7%B4%A0)%E9%AD%9A%E9%9B%B7.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/魚雷/53cm連装魚雷.js":
/*!**********************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/魚雷/53cm連装魚雷.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * @module\n * 装备额外属性收益\n * 174. **53cm連装魚雷**\n */\n\n// https://wikiwiki.jp/kancolle/53cm%E9%80%A3%E8%A3%85%E9%AD%9A%E9%9B%B7\n\nvar _require = __webpack_require__(/*! ../../ship-classes */ \"./node_modules/kckit/src/data/ship-classes.js\"),\n    DD_Kamikaze = _require.DD_Kamikaze;\n\nvar _require2 = __webpack_require__(/*! ../../ship-ids */ \"./node_modules/kckit/src/data/ship-ids/index.js\"),\n    比叡改二丙 = _require2.比叡改二丙;\n\nmodule.exports = [{\n    equipment: 174,\n    ship: {\n        isClass: [DD_Kamikaze]\n    },\n    bonus: {\n        torpedo: 1,\n        evasion: 2\n    }\n}, {\n    equipment: 174,\n    ship: {\n        isID: [591, // 金剛改二丙\n        比叡改二丙]\n    },\n    bonus: {\n        torpedo: 6,\n        evasion: 3\n    }\n},\n\n// ------------------------------------------------------------------------\n\n// + 96式150cm探照灯\n{\n    list: [174, 140],\n    equipments: [{\n        isID: 174\n    }, {\n        isID: 140\n    }],\n    ship: {\n        isID: [比叡改二丙]\n    },\n    bonus: {\n        torpedo: 5\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E9%AD%9A%E9%9B%B7/53cm%E9%80%A3%E8%A3%85%E9%AD%9A%E9%9B%B7.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/魚雷/61cm三連装(酸素)魚雷後期型.js":
/*!******************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/魚雷/61cm三連装(酸素)魚雷後期型.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n/**\r\n * 装备额外属性收益 - 61cm三連装(酸素)魚雷後期型\r\n *\r\n * @module\r\n */\n\nvar _require = __webpack_require__(/*! ../../ships */ \"./node_modules/kckit/src/data/ships.js\"),\n    DD_FubukiClass2ndRemodel = _require.DD_FubukiClass2ndRemodel,\n    DD_AyanamiClass2ndRemodel = _require.DD_AyanamiClass2ndRemodel,\n    DD_AkatsukiClass2ndRemodel = _require.DD_AkatsukiClass2ndRemodel,\n    DD_HatsuharuClass2ndRemodel = _require.DD_HatsuharuClass2ndRemodel;\n\nmodule.exports = [\n// @ 特型駆逐艦 改二 / 初春型 改二\n{\n    equipment: 285,\n    ship: {\n        isID: [].concat(_toConsumableArray(DD_FubukiClass2ndRemodel), _toConsumableArray(DD_AyanamiClass2ndRemodel), _toConsumableArray(DD_AkatsukiClass2ndRemodel), _toConsumableArray(DD_HatsuharuClass2ndRemodel))\n    },\n    bonusImprove: {\n        0: {\n            torpedo: 2,\n            evasion: 1\n        },\n        10: {\n            fire: 1,\n            torpedo: 2,\n            evasion: 1\n        }\n    }\n\n    // ------------------------------------------------------------------------\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E9%AD%9A%E9%9B%B7/61cm%E4%B8%89%E9%80%A3%E8%A3%85(%E9%85%B8%E7%B4%A0)%E9%AD%9A%E9%9B%B7%E5%BE%8C%E6%9C%9F%E5%9E%8B.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/魚雷/61cm五連装(酸素)魚雷.js":
/*!***************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/魚雷/61cm五連装(酸素)魚雷.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * 装备额外属性收益 - 61cm五連装(酸素)魚雷\r\n * \r\n * @module\r\n */\n\nvar _require = __webpack_require__(/*! ../../ship-classes */ \"./node_modules/kckit/src/data/ship-classes.js\"),\n    CLT_Kuma = _require.CLT_Kuma,\n    DD_Shimakaze = _require.DD_Shimakaze,\n    DD_Akizuki = _require.DD_Akizuki;\n\nmodule.exports = [{\n    equipment: 58,\n    ship: {\n        isClass: [CLT_Kuma, DD_Shimakaze, DD_Akizuki]\n    },\n    bonus: {\n        torpedo: 1\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E9%AD%9A%E9%9B%B7/61cm%E4%BA%94%E9%80%A3%E8%A3%85(%E9%85%B8%E7%B4%A0)%E9%AD%9A%E9%9B%B7.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/魚雷/61cm四連装(酸素)魚雷.js":
/*!***************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/魚雷/61cm四連装(酸素)魚雷.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * 装备额外属性收益 - 61cm四連装(酸素)魚雷\r\n * \r\n * @module\r\n */\n\nvar _require = __webpack_require__(/*! ../../ships */ \"./node_modules/kckit/src/data/ships.js\"),\n    DD_KagerouClass2ndRemodel = _require.DD_KagerouClass2ndRemodel;\n\nmodule.exports = [\n\n// @ 陽炎型 改二\n{\n    equipment: 15,\n    ship: {\n        isID: DD_KagerouClass2ndRemodel\n    },\n    bonusCount: {\n        1: {\n            torpedo: 2\n        },\n        2: {\n            torpedo: 4\n        }\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E9%AD%9A%E9%9B%B7/61cm%E5%9B%9B%E9%80%A3%E8%A3%85(%E9%85%B8%E7%B4%A0)%E9%AD%9A%E9%9B%B7.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/魚雷/61cm四連装(酸素)魚雷後期型.js":
/*!******************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/魚雷/61cm四連装(酸素)魚雷後期型.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * @module\r\n * 装备额外属性收益\r\n * 286. **61cm四連装(酸素)魚雷後期型**\r\n */\n\n// https://wikiwiki.jp/kancolle/61cm%E5%9B%9B%E9%80%A3%E8%A3%85%28%E9%85%B8%E7%B4%A0%29%E9%AD%9A%E9%9B%B7%E5%BE%8C%E6%9C%9F%E5%9E%8B\n\nvar _require = __webpack_require__(/*! ../../ships */ \"./node_modules/kckit/src/data/ships.js\"),\n    DD_ShiratsuyuClass2ndRemodel = _require.DD_ShiratsuyuClass2ndRemodel,\n    DD_AsashioClass2ndRemodel = _require.DD_AsashioClass2ndRemodel,\n    DD_KagerouClass2ndRemodel = _require.DD_KagerouClass2ndRemodel,\n    DD_YuugumoClass2ndRemodel = _require.DD_YuugumoClass2ndRemodel;\n\nvar DD2nd_Shiratsuyu_Asashio_Yuugumo = DD_ShiratsuyuClass2ndRemodel.concat(DD_AsashioClass2ndRemodel, DD_YuugumoClass2ndRemodel);\n\nmodule.exports = [\n// @ 白露型 改二 / 朝潮型 改二 / 夕雲型 改二\n{\n    equipment: 286,\n    ship: {\n        isID: DD2nd_Shiratsuyu_Asashio_Yuugumo\n    },\n    bonusImprove: {\n        0: {\n            torpedo: 2,\n            evasion: 1\n        },\n        10: {\n            fire: 1,\n            torpedo: 2,\n            evasion: 1\n        }\n    }\n},\n\n// @ 陽炎型 改二\n{\n    equipment: 286,\n    ship: {\n        isID: DD_KagerouClass2ndRemodel\n    },\n    bonusImprove: {\n        0: {\n            torpedo: 2,\n            evasion: 1\n        },\n        5: {\n            torpedo: 3,\n            evasion: 1\n        },\n        10: {\n            fire: 1,\n            torpedo: 3,\n            evasion: 1\n        }\n    }\n\n    // ------------------------------------------------------------------------\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E9%AD%9A%E9%9B%B7/61cm%E5%9B%9B%E9%80%A3%E8%A3%85(%E9%85%B8%E7%B4%A0)%E9%AD%9A%E9%9B%B7%E5%BE%8C%E6%9C%9F%E5%9E%8B.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/魚雷/後期型53cm艦首魚雷(8門).js":
/*!*****************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/魚雷/後期型53cm艦首魚雷(8門).js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n/**\n * @module\n * 装备额外属性收益\n *\n * 383. 後期型53cm艦首魚雷(8門)\n *      https://wikiwiki.jp/kancolle/%E5%BE%8C%E6%9C%9F%E5%9E%8B53cm%E8%89%A6%E9%A6%96%E9%AD%9A%E9%9B%B7%288%E9%96%80%29\n *\n */\n\nvar _require = __webpack_require__(/*! ../../ship-series */ \"./node_modules/kckit/src/data/ship-series/index.js\"),\n    I47 = _require.I47,\n    I58 = _require.I58,\n    I400 = _require.I400,\n    I401 = _require.I401;\n\n// ============================================================================\n\nvar 単体ボーナス = [{\n    equipment: 383,\n    ship: {\n        isID: [].concat(_toConsumableArray(I58))\n    },\n    bonus: {\n        torpedo: 1\n    }\n}, {\n    equipment: 383,\n    ship: {\n        isID: [].concat(_toConsumableArray(I400), _toConsumableArray(I401))\n    },\n    bonus: {\n        torpedo: 2\n    }\n}, {\n    equipment: 383,\n    ship: {\n        isID: [].concat(_toConsumableArray(I47))\n    },\n    bonus: {\n        torpedo: 3\n    }\n}];\n\n// ============================================================================\n\nvar 相互シナジーボーナス = [\n// + 後期型潜水艦搭載電探＆逆探\n{\n    list: [383, 384],\n    equipments: [{ isID: 383 }, { isID: 384 }],\n    ship: {\n        isType: [13, // SS\n        14]\n    },\n    bonus: {\n        torpedo: 3,\n        evasion: 2\n    }\n}];\n\n// ============================================================================\n\nmodule.exports = [].concat(単体ボーナス, 相互シナジーボーナス);\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E9%AD%9A%E9%9B%B7/%E5%BE%8C%E6%9C%9F%E5%9E%8B53cm%E8%89%A6%E9%A6%96%E9%AD%9A%E9%9B%B7(8%E9%96%80).js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/魚雷/後期型艦首魚雷(6門).js":
/*!*************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/魚雷/後期型艦首魚雷(6門).js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * @module\n * 装备额外属性收益\n *\n * 213. 後期型艦首魚雷(6門)\n *      https://wikiwiki.jp/kancolle/%E5%BE%8C%E6%9C%9F%E5%9E%8B%E8%89%A6%E9%A6%96%E9%AD%9A%E9%9B%B7%286%E9%96%80%29\n *\n */\n\n// const { I47, I58, I400, I401 } = require('../../ship-series');\n\n// ============================================================================\n\n// const 単体ボーナス = [];\n\n// ============================================================================\n\nvar 相互シナジーボーナス = [\n// + 後期型潜水艦搭載電探＆逆探\n{\n    list: [213, 384],\n    equipments: [{ isID: 213 }, { isID: 384 }],\n    ship: {\n        isType: [13, // SS\n        14]\n    },\n    bonus: {\n        torpedo: 3,\n        evasion: 2\n    }\n}];\n\n// ============================================================================\n\nmodule.exports = [].concat(相互シナジーボーナス);\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E9%AD%9A%E9%9B%B7/%E5%BE%8C%E6%9C%9F%E5%9E%8B%E8%89%A6%E9%A6%96%E9%AD%9A%E9%9B%B7(6%E9%96%80).js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/魚雷/熟練聴音員+後期型艦首魚雷(6門).js":
/*!*******************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/魚雷/熟練聴音員+後期型艦首魚雷(6門).js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * @module\n * 装备额外属性收益\n *\n * 214. 熟練聴音員+後期型艦首魚雷(6門)\n *      https://wikiwiki.jp/kancolle/%E7%86%9F%E7%B7%B4%E8%81%B4%E9%9F%B3%E5%93%A1%EF%BC%8B%E5%BE%8C%E6%9C%9F%E5%9E%8B%E8%89%A6%E9%A6%96%E9%AD%9A%E9%9B%B7%286%E9%96%80%29\n *\n */\n\n// const { I47, I58, I400, I401 } = require('../../ship-series');\n\n// ============================================================================\n\n// const 単体ボーナス = [];\n\n// ============================================================================\n\nvar 相互シナジーボーナス = [\n// + 後期型潜水艦搭載電探＆逆探\n{\n    list: [214, 384],\n    equipments: [{ isID: 214 }, { isID: 384 }],\n    ship: {\n        isType: [13, // SS\n        14]\n    },\n    bonus: {\n        torpedo: 3,\n        evasion: 2\n    }\n}];\n\n// ============================================================================\n\nmodule.exports = [].concat(相互シナジーボーナス);\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E9%AD%9A%E9%9B%B7/%E7%86%9F%E7%B7%B4%E8%81%B4%E9%9F%B3%E5%93%A1+%E5%BE%8C%E6%9C%9F%E5%9E%8B%E8%89%A6%E9%A6%96%E9%AD%9A%E9%9B%B7(6%E9%96%80).js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/bonus/魚雷/試製61cm六連装(酸素)魚雷.js":
/*!*****************************************************************!*\
  !*** ./node_modules/kckit/src/data/bonus/魚雷/試製61cm六連装(酸素)魚雷.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * 装备额外属性收益 - 試製61cm六連装(酸素)魚雷\r\n * \r\n * @module\r\n */\n\nvar _require = __webpack_require__(/*! ../../ship-classes */ \"./node_modules/kckit/src/data/ship-classes.js\"),\n    DD_Akizuki = _require.DD_Akizuki;\n\nmodule.exports = [{\n    equipment: 179,\n    ship: {\n        isClass: DD_Akizuki\n    },\n    bonus: {\n        torpedo: 1\n    }\n}];\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/bonus/%E9%AD%9A%E9%9B%B7/%E8%A9%A6%E8%A3%BD61cm%E5%85%AD%E9%80%A3%E8%A3%85(%E9%85%B8%E7%B4%A0)%E9%AD%9A%E9%9B%B7.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/ship-classes.js":
/*!*****************************************************!*\
  !*** ./node_modules/kckit/src/data/ship-classes.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n// ============================================================================\n//\n// BB\n//\n// ============================================================================const BB_Ise = 2;\nvar BB_Ise = 2;\nvar BBV_Ise = 6;\nvar BBVR_Ise = 113;\nvar group_BB_Ise = [BB_Ise, BBV_Ise, BBVR_Ise];\nvar BB_Fusou = 4;\nvar BBV_Fusou = 11;\nvar group_BB_Fusou = [BB_Fusou, BBV_Fusou];\nvar BB_Bismarck = 7;\nvar BB_VittorioVeneto = 70;\nvar BB_Colorado = 122;\nvar BB_Iowa = 82;\nvar BB_SouthDakota = 134;\nvar BB_QueenElizabeth = 85;\nvar BB_Nelson = 115;\nvar BB_Richelieu = 100;\nvar BB_Gangut = 93;\nvar group_BC_Navy_USN = [BB_Iowa, BB_SouthDakota];\nvar group_BB_exclude_BC_Navy_USN = [BB_Colorado];\nvar group_BB_Navy_USN = [].concat(group_BB_exclude_BC_Navy_USN, group_BC_Navy_USN);\nvar group_BB_Navy_RN = [BB_QueenElizabeth, BB_Nelson];\n\n// ============================================================================\n//\n// CV\n//\n// ============================================================================\nvar CV_Kaga = 27;\nvar CVB_Lexington = 105;\nvar CV_Lexington = 87;\nvar CV_Essex = 110;\nvar CV_Yorktown = 135;\nvar CV_ArkRoyal = 101;\nvar CV_GrafZeppelin = 80;\nvar CV_Aquila = 91;\nvar CV_Casablanca = 106;\nvar group_CV_Navy_KM = [CV_GrafZeppelin];\nvar group_CV_Navy_RM = [CV_Aquila];\nvar group_CV_Navy_USN = [CVB_Lexington, CV_Lexington, CV_Essex, CV_Yorktown, CV_Casablanca];\nvar group_CV_Navy_RN = [CV_ArkRoyal];\n\n// ============================================================================\n//\n// CA\n//\n// ============================================================================\nvar CAV_Mogami = 45;\nvar CAV_MogamiRevised = 90;\nvar CAV_Tone = 46;\nvar group_CAV_Navy_IJN = [CAV_Mogami, CAV_MogamiRevised, CAV_Tone];\nvar CA_Furutaka = 39;\nvar CA_Aoba = 40;\nvar CA_Myoukou = 41;\nvar CA_Takao = 42;\nvar CA_Houston = 124;\nvar CA_Mogami = 43;\nvar CA_Tone = 44;\nvar group_CA_Navy_IJN = [CA_Furutaka, CA_Aoba, CA_Mogami, CA_Myoukou, CA_Takao, CA_Tone];\nvar group_CA_Navy_USN = [CA_Houston];\n\n// ============================================================================\n//\n// CL\n//\n// ============================================================================\n// 重雷装巡洋艦\nvar CLT_Kuma = 54;\n// 軽航空巡洋艦\nvar CLV_Gotland = 116;\n// 兵装実験軽巡洋艦\nvar CL_Yuubari2 = 129;\n// 防空巡洋艦\nvar CL_Atlanta = 128;\n// 軽巡洋艦\nvar CL_Tenryuu = 47;\nvar CL_Kuma = 48;\nvar CL_Nagara = 49;\nvar CL_Sendai = 50;\nvar CL_Yuubari = 51;\nvar CL_Agano = 52;\nvar CL_Ooyodo = 53;\nvar CL_Gotland = 114;\nvar CL_Abruzzi = 120;\nvar CL_DeRuyter = 127;\nvar CL_Perth = 125;\nvar CL_StLouis = 136;\n// 練習巡洋艦\nvar CT_Katori = 55;\n// GROUPS\nvar group_CL_Navy_IJN = [CL_Tenryuu, CL_Kuma, CL_Nagara, CL_Sendai, CL_Yuubari, CL_Agano, CL_Ooyodo];\nvar group_CL_Navy_RM = [CL_Abruzzi];\nvar group_CL_Navy_RNLN = [CL_DeRuyter];\nvar group_CL_Navy_RAN = [CL_Perth];\nvar group_CL_Navy_USN = [CL_Atlanta, CL_StLouis];\nvar group_CL_S_Navy_IJN = [CLT_Kuma, CL_Yuubari2].concat(group_CL_Navy_IJN, [CT_Katori]);\n\n// ============================================================================\n//\n// DD\n//\n// ============================================================================\nvar DD_Kamikaze = 84;\nvar DD_Mutsuki = 12;\nvar DD_Fubuki = 15;\nvar DD_Ayanami = 16;\nvar DD_Akatsuki = 17;\nvar DD_Hatsuharu = 18;\nvar DD_Shiratsuyu = 19;\nvar DD_Asashio = 20;\nvar DD_Kagerou = 21;\nvar DD_Yuugumo = 22;\nvar DD_Shimakaze = 24;\nvar DD_Akizuki = 23;\nvar DD_Matsu = 131;\nvar DD_JohnCButler = 112;\nvar DD_Fletcher = 117;\nvar DD_J = 107;\n// GROUPS\nvar group_DD_Navy_IJN = [DD_Kamikaze, DD_Mutsuki, DD_Fubuki, DD_Ayanami, DD_Akatsuki, DD_Hatsuharu, DD_Shiratsuyu, DD_Asashio, DD_Kagerou, DD_Yuugumo, DD_Akizuki, DD_Shimakaze, DD_Matsu];\nvar group_DD_Navy_USN = [DD_JohnCButler, DD_Fletcher];\nvar group_DD_Navy_RN = [DD_J];\n\nmodule.exports = {\n    // ========================================================================\n    BB_Ise: BB_Ise,\n    BBV_Ise: BBV_Ise,\n    BBVR_Ise: BBVR_Ise,\n    group_BB_Ise: group_BB_Ise,\n    BB_Fusou: BB_Fusou,\n    BBV_Fusou: BBV_Fusou,\n    group_BB_Fusou: group_BB_Fusou,\n    BB_Nagato: 10,\n    BB_Yamato: 83,\n    BB_Kongou: 9,\n    BB_Kongou2: 119,\n    BB_Bismarck: BB_Bismarck,\n    BB_VittorioVeneto: BB_VittorioVeneto,\n    BB_Colorado: BB_Colorado,\n    BB_Iowa: BB_Iowa,\n    BB_SouthDakota: BB_SouthDakota,\n    BB_QueenElizabeth: BB_QueenElizabeth,\n    BB_Nelson: BB_Nelson,\n    BB_Richelieu: BB_Richelieu,\n    BB_Gangut: BB_Gangut,\n    group_BC_Navy_USN: group_BC_Navy_USN,\n    group_BB_exclude_BC_Navy_USN: group_BB_exclude_BC_Navy_USN,\n    group_BB_Navy_USN: group_BB_Navy_USN,\n    group_BB_Navy_RN: group_BB_Navy_RN,\n\n    // ========================================================================\n    CV_Kaga: CV_Kaga,\n    CV_Lexington: CV_Lexington,\n    CVB_Lexington: CVB_Lexington,\n    CV_Essex: CV_Essex,\n    CV_Yorktown: CV_Yorktown,\n    CV_ArkRoyal: CV_ArkRoyal,\n    CV_GrafZeppelin: CV_GrafZeppelin,\n    CV_Aquila: CV_Aquila,\n    group_CV_Navy_KM: group_CV_Navy_KM,\n    group_CV_Navy_RM: group_CV_Navy_RM,\n    group_CV_Navy_USN: group_CV_Navy_USN,\n    group_CV_Navy_RN: group_CV_Navy_RN,\n\n    CV_Houshou: 33,\n    CV_Kagasumaru: 95,\n    CV_Taiyou_SP: 96,\n    CV_Taiyou: 97,\n    CV_Casablanca: CV_Casablanca,\n\n    // ========================================================================\n    CAV_Mogami: CAV_Mogami,\n    CAV_MogamiRevised: CAV_MogamiRevised,\n    CAV_Tone: CAV_Tone,\n    group_CAV_Navy_IJN: group_CAV_Navy_IJN,\n    CA_Furutaka: CA_Furutaka,\n    CA_Aoba: CA_Aoba,\n    CA_Myoukou: CA_Myoukou,\n    CA_Takao: CA_Takao,\n    CA_Mogami: CA_Mogami,\n    CA_Tone: CA_Tone,\n    CA_Houston: CA_Houston,\n    group_CA_Navy_IJN: group_CA_Navy_IJN,\n    group_CA_Navy_USN: group_CA_Navy_USN,\n\n    // ========================================================================\n    // 重雷装巡洋艦\n    CLT_Kuma: CLT_Kuma,\n    // 軽航空巡洋艦\n    CLV_Gotland: CLV_Gotland,\n    // 兵装実験軽巡洋艦\n    CL_Yuubari2: CL_Yuubari2,\n    // 防空巡洋艦\n    CL_Atlanta: CL_Atlanta,\n    // 軽巡洋艦\n    CL_Tenryuu: CL_Tenryuu,\n    CL_Kuma: CL_Kuma,\n    CL_Nagara: CL_Nagara,\n    CL_Sendai: CL_Sendai,\n    CL_Yuubari: CL_Yuubari,\n    CL_Agano: CL_Agano,\n    CL_Ooyodo: CL_Ooyodo,\n    CL_Gotland: CL_Gotland,\n    CL_Abruzzi: CL_Abruzzi,\n    CL_DeRuyter: CL_DeRuyter,\n    CL_Perth: CL_Perth,\n    CL_StLouis: CL_StLouis,\n    // 練習巡洋艦\n    CT_Katori: CT_Katori,\n    // GROUPS\n    group_CL_Navy_IJN: group_CL_Navy_IJN,\n    group_CL_Navy_RNLN: group_CL_Navy_RNLN,\n    group_CL_Navy_RAN: group_CL_Navy_RAN,\n    group_CL_Navy_USN: group_CL_Navy_USN,\n    group_CL_S_Navy_IJN: group_CL_S_Navy_IJN,\n\n    // ========================================================================\n    DD_Kamikaze: DD_Kamikaze,\n    DD_Mutsuki: DD_Mutsuki,\n    DD_Special: [DD_Fubuki, DD_Ayanami, DD_Akatsuki],\n    DD_Tokugata: [DD_Fubuki, DD_Ayanami, DD_Akatsuki],\n    DD_Fubuki: DD_Fubuki,\n    DD_Ayanami: DD_Ayanami,\n    DD_Akatsuki: DD_Akatsuki,\n    DD_Hatsuharu: DD_Hatsuharu,\n    DD_Shiratsuyu: DD_Shiratsuyu,\n    DD_Asashio: DD_Asashio,\n    DD_Kagerou: DD_Kagerou,\n    DD_Yuugumo: DD_Yuugumo,\n    DD_Akizuki: DD_Akizuki,\n    DD_Shimakaze: DD_Shimakaze,\n    DD_Matsu: DD_Matsu,\n    DD_J: DD_J,\n    DD_JohnCButler: DD_JohnCButler,\n    DD_Fletcher: DD_Fletcher,\n    group_DD_Tokugata: [DD_Fubuki, DD_Ayanami, DD_Akatsuki],\n    group_DD_Navy_IJN: group_DD_Navy_IJN,\n    group_DD_Navy_USN: group_DD_Navy_USN,\n    group_DD_Navy_RN: group_DD_Navy_RN,\n\n    // ========================================================================\n    AV_Nisshin: 118,\n    AV_CommandantTeste: 86,\n    AV_Mizuho: 77,\n    AO_Kamoi: 98,\n    AV_Kamoi: 99,\n\n    // ========================================================================\n    group_Navy_USN: [].concat(_toConsumableArray(group_BB_Navy_USN), group_CV_Navy_USN, group_CA_Navy_USN, group_CL_Navy_USN, group_DD_Navy_USN),\n    group_Navy_KM: [].concat(group_CV_Navy_KM),\n    group_Navy_RN: [].concat(group_BB_Navy_RN, group_CV_Navy_RN, group_DD_Navy_RN),\n    group_Navy_RM: [].concat(group_CV_Navy_RM, group_CL_Navy_RM),\n    group_Navy_RNLN: [].concat(group_CL_Navy_RNLN),\n    group_Navy_RAN: [].concat(group_CL_Navy_RAN)\n};\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/ship-classes.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/ship-ids/bb.js":
/*!****************************************************!*\
  !*** ./node_modules/kckit/src/data/ship-ids/bb.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = {\n    金剛改二丙: 591,\n    比叡改二丙: 592,\n\n    'South Dakota': 602,\n    'South Dakota改': 697\n};\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/ship-ids/bb.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/ship-ids/cl.js":
/*!****************************************************!*\
  !*** ./node_modules/kckit/src/data/ship-ids/cl.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = {\n    天龍: 51,\n    天龍改: 213,\n    天龍改二: 477,\n\n    龍田: 52,\n    龍田改: 214,\n    龍田改二: 478,\n\n    // 球磨\n    // 多摩\n\n    北上: 25,\n    北上改: 58,\n    北上改二: 119,\n\n    大井: 24,\n    大井改: 57,\n    大井改二: 118,\n\n    // 木曽\n    // 長良\n\n    五十鈴: 22,\n    五十鈴改: 219,\n    五十鈴改二: 141,\n\n    // 名取\n\n    由良: 23,\n    由良改: 220,\n    由良改二: 488,\n\n    鬼怒: 113,\n    鬼怒改: 289,\n    鬼怒改二: 487,\n\n    // 阿武隈\n    // 川内\n    // 神通\n\n    那珂: 56,\n    那珂改: 224,\n    那珂改二: 160,\n\n    夕張: 115,\n    夕張改: 293,\n    夕張改二: 622,\n    夕張改二特: 623,\n    夕張改二丁: 624,\n\n    //\n    //\n\n    Gotland: 574,\n    Gotland改: 579,\n    'Gotland andra': 630\n};\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/ship-ids/cl.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/ship-ids/cv.js":
/*!****************************************************!*\
  !*** ./node_modules/kckit/src/data/ship-ids/cv.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar 装甲空母 = {\n    大鳳: 153,\n    大鳳改: 156,\n\n    翔鶴改二甲: 466,\n\n    瑞鶴改二甲: 467\n};\n\nvar 正規空母 = {\n    赤城改二戊: 599,\n\n    翔鶴: 110,\n    翔鶴改: 288,\n    翔鶴改二: 461,\n\n    瑞鶴: 111,\n    瑞鶴改: 112,\n    瑞鶴改二: 462,\n\n    Hornet: 603,\n    Hornet改: 704\n};\n\nvar 軽空母 = {\n    龍鳳: 185,\n    龍鳳改: 318,\n\n    祥鳳: 74,\n    祥鳳改: 282,\n\n    瑞鳳: 116,\n    瑞鳳改: 117,\n    瑞鳳改二: 555,\n    瑞鳳改二乙: 560,\n\n    飛鷹: 75,\n    飛鷹改: 283,\n\n    隼鷹: 92,\n    隼鷹改: 284,\n    隼鷹改二: 408,\n\n    千歳航: 108,\n    千歳航改: 291,\n    千歳航改二: 296,\n\n    千代田航: 109,\n    千代田航改: 292,\n    千代田航改二: 297,\n\n    鈴谷航改二: 508,\n    熊野航改二: 509\n};\n\nmodule.exports = _extends({}, 装甲空母, 正規空母, 軽空母);\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/ship-ids/cv.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/ship-ids/dd.js":
/*!****************************************************!*\
  !*** ./node_modules/kckit/src/data/ship-ids/dd.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = {\n    沖波改二: 569,\n\n    'Fletcher Mk.II': 629\n};\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/ship-ids/dd.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/ship-ids/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/kckit/src/data/ship-ids/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nmodule.exports = _extends({}, __webpack_require__(/*! ./bb */ \"./node_modules/kckit/src/data/ship-ids/bb.js\"), __webpack_require__(/*! ./cv */ \"./node_modules/kckit/src/data/ship-ids/cv.js\"), __webpack_require__(/*! ./cl */ \"./node_modules/kckit/src/data/ship-ids/cl.js\"), __webpack_require__(/*! ./dd */ \"./node_modules/kckit/src/data/ship-ids/dd.js\"), __webpack_require__(/*! ./ss */ \"./node_modules/kckit/src/data/ship-ids/ss.js\"));\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/ship-ids/index.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/ship-ids/ss.js":
/*!****************************************************!*\
  !*** ./node_modules/kckit/src/data/ship-ids/ss.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = {\n    伊47: 636,\n    伊47改: 607,\n\n    伊58: 127,\n    伊58改: 399,\n\n    伊400: 493,\n    伊400改: 606,\n\n    伊401: 155,\n    伊401改: 403\n};\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/ship-ids/ss.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/ship-series/bb.js":
/*!*******************************************************!*\
  !*** ./node_modules/kckit/src/data/ship-series/bb.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _require = __webpack_require__(/*! ../ship-ids */ \"./node_modules/kckit/src/data/ship-ids/index.js\"),\n    比叡改二丙 = _require.比叡改二丙;\n\nmodule.exports = {\n    Colorado: [601, // Colorado\n    1496],\n\n    Kongou: [78, // 金剛\n    209, // 金剛改\n    149, // 金剛改二\n    591],\n    Hiei: [86, // 比叡\n    210, // 比叡改\n    150, // 比叡改二\n    比叡改二丙],\n    Haruna: [79, // 榛名\n    211, // 榛名改\n    151],\n    Kirishima: [85, // 霧島\n    212, // 霧島改\n    152],\n\n    Ise: [77, // 伊勢\n    82, // 伊勢改\n    553],\n    Hyuuga: [87, // 日向\n    88, // 日向改\n    554],\n\n    Fusou: [26, // 扶桑\n    286, // 扶桑改\n    411],\n    Yamashiro: [27, // 山城\n    287, // 山城改\n    412]\n};\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/ship-series/bb.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/ship-series/ca.js":
/*!*******************************************************!*\
  !*** ./node_modules/kckit/src/data/ship-series/ca.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = {\n    Choukai: [69, // 鳥海\n    272, // 鳥海改\n    427 // 鳥海改二\n    ]\n};\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/ship-series/ca.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/ship-series/cl.js":
/*!*******************************************************!*\
  !*** ./node_modules/kckit/src/data/ship-series/cl.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = {\n    // 轻巡洋舰\n    Jintsu: [55, // 神通\n    223, // 神通改\n    159 // 神通改二\n    ],\n    Yuubari: [115, // 夕張\n    293, // 夕張改\n    622, // 夕張改二\n    623, // 夕張改二特\n    624 // 夕張改二丁\n    ],\n\n    // 练习巡洋舰\n    Katori: [154, // 香取\n    343 // 香取改\n    ],\n    Kashima: [465, // 鹿島\n    356 // 鹿島改\n    ]\n};\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/ship-series/cl.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/ship-series/cv.js":
/*!*******************************************************!*\
  !*** ./node_modules/kckit/src/data/ship-series/cv.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _require = __webpack_require__(/*! ../ship-ids */ \"./node_modules/kckit/src/data/ship-ids/index.js\"),\n    翔鶴 = _require.翔鶴,\n    翔鶴改 = _require.翔鶴改,\n    翔鶴改二 = _require.翔鶴改二,\n    翔鶴改二甲 = _require.翔鶴改二甲,\n    瑞鶴 = _require.瑞鶴,\n    瑞鶴改 = _require.瑞鶴改,\n    瑞鶴改二 = _require.瑞鶴改二,\n    瑞鶴改二甲 = _require.瑞鶴改二甲,\n    大鳳 = _require.大鳳,\n    大鳳改 = _require.大鳳改,\n    祥鳳 = _require.祥鳳,\n    祥鳳改 = _require.祥鳳改,\n    瑞鳳 = _require.瑞鳳,\n    瑞鳳改 = _require.瑞鳳改,\n    瑞鳳改二 = _require.瑞鳳改二,\n    瑞鳳改二乙 = _require.瑞鳳改二乙,\n    飛鷹 = _require.飛鷹,\n    飛鷹改 = _require.飛鷹改,\n    隼鷹 = _require.隼鷹,\n    隼鷹改 = _require.隼鷹改,\n    隼鷹改二 = _require.隼鷹改二;\n\nmodule.exports = {\n    // 航母\n    Akagi: [83, 277, 594, 599],\n    Kaga: [84, 278],\n    Souryuu: [90, 279, 197],\n    Hiryuu: [91, 280, 196],\n    Shoukaku: [翔鶴, 翔鶴改, 翔鶴改二, 翔鶴改二甲],\n    Zuikaku: [瑞鶴, 瑞鶴改, 瑞鶴改二, 瑞鶴改二甲],\n    Taihou: [大鳳, 大鳳改],\n\n    // 轻型航母\n    Shouhou: [祥鳳, 祥鳳改],\n    Zuihou: [瑞鳳, 瑞鳳改, 瑞鳳改二, 瑞鳳改二乙],\n    Hiyou: [飛鷹, 飛鷹改],\n    Junyou: [隼鷹, 隼鷹改, 隼鷹改二]\n};\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/ship-series/cv.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/ship-series/dd.js":
/*!*******************************************************!*\
  !*** ./node_modules/kckit/src/data/ship-series/dd.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar Shikinami2ndRemodelAll = [627];\n\nmodule.exports = {\n    //\n\n    Shikinami: [14, 208].concat(Shikinami2ndRemodelAll),\n    Shikinami2ndRemodelAll: Shikinami2ndRemodelAll,\n    Akatsuki: [34, // 暁\n    234, // 暁改\n    437 // 暁改二\n    ],\n\n    //\n\n    Yukikaze: [20, // 雪風\n    228 // 雪風改\n    ],\n    Akigumo: [132, // 秋雲\n    301 // 秋雲改\n    ]\n};\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/ship-series/dd.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/ship-series/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/kckit/src/data/ship-series/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\n/** @type {Object} 舰娘系列 */\nmodule.exports = _extends({}, __webpack_require__(/*! ./bb */ \"./node_modules/kckit/src/data/ship-series/bb.js\"), __webpack_require__(/*! ./cv */ \"./node_modules/kckit/src/data/ship-series/cv.js\"), __webpack_require__(/*! ./ca */ \"./node_modules/kckit/src/data/ship-series/ca.js\"), __webpack_require__(/*! ./cl */ \"./node_modules/kckit/src/data/ship-series/cl.js\"), __webpack_require__(/*! ./dd */ \"./node_modules/kckit/src/data/ship-series/dd.js\"), __webpack_require__(/*! ./ss */ \"./node_modules/kckit/src/data/ship-series/ss.js\"), {\n\n    //\n\n    Mizuho: [451, 348],\n    Kamoi: [162, 499, 500],\n    CommandantTeste: [491, 372]\n});\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/ship-series/index.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/ship-series/ss.js":
/*!*******************************************************!*\
  !*** ./node_modules/kckit/src/data/ship-series/ss.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _require = __webpack_require__(/*! ../ship-ids */ \"./node_modules/kckit/src/data/ship-ids/index.js\"),\n    伊47 = _require.伊47,\n    伊47改 = _require.伊47改,\n    伊58 = _require.伊58,\n    伊58改 = _require.伊58改,\n    伊400 = _require.伊400,\n    伊400改 = _require.伊400改,\n    伊401 = _require.伊401,\n    伊401改 = _require.伊401改;\n\nmodule.exports = {\n    I47: [伊47, 伊47改],\n    I58: [伊58, 伊58改],\n    I400: [伊400, 伊400改],\n    I401: [伊401, 伊401改]\n};\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/ship-series/ss.js?");

/***/ }),

/***/ "./node_modules/kckit/src/data/ships.js":
/*!**********************************************!*\
  !*** ./node_modules/kckit/src/data/ships.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar S = __webpack_require__(/*! ./ship-series */ \"./node_modules/kckit/src/data/ship-series/index.js\");\n\nvar _require = __webpack_require__(/*! ./ship-ids */ \"./node_modules/kckit/src/data/ship-ids/index.js\"),\n    SouthDakota = _require['South Dakota'],\n    SouthDakota改 = _require['South Dakota改'],\n    Hornet = _require.Hornet,\n    Hornet改 = _require.Hornet改;\n\n// ============================================================================\n\nvar BB_NagatoClassRemodel = [275, // 長門改\n276];\nvar BB_NagatoClass2ndRemodel = [541, // 長門改二\n573];\nvar BB_NagatoClassRemodelAll = [].concat(BB_NagatoClassRemodel, BB_NagatoClass2ndRemodel);\nvar BB_KongouClassRemodel = [209, // 金剛改\n210, // 比叡改\n211, // 榛名改\n212];\nvar BB_KongouClass2ndRemodel = [149, // 金剛改二\n591, // 金剛改二丙\n150, // 比叡改二\n592, // 比叡改二丙\n151, // 榛名改二\n152];\nvar BB_KongouClassRemodelAll = [].concat(BB_KongouClassRemodel, BB_KongouClass2ndRemodel);\nvar BB_IseClassRemodel = [82, // 伊勢改\n88];\nvar BB_IseClass2ndRemodel = [553, // 伊勢改二\n554];\nvar BB_IseClassRemodelAll = BB_IseClassRemodel.concat(BB_IseClass2ndRemodel);\nvar BB_FusouClass2ndRemodel = [411, // 扶桑改二\n412];\nvar BB_IseClassRemodel_PLUS_FusouClass2ndRemodel = BB_IseClassRemodel.concat(BB_FusouClass2ndRemodel);\nvar BB_NelsonClassRemodel = [576];\n\n/*************************************************************************/\n\nvar CV_AkagiClassRemodel = [277];\nvar CV_AkagiClass2ndRemodel = [594, // 赤城改二\n599];\nvar CV_AkagiClassRemodelAll = [].concat(CV_AkagiClassRemodel, CV_AkagiClass2ndRemodel);\nvar CV_KagaClassRemodel = [278];\nvar CV_ShoukakuClass2ndRemodel = [461, // 翔鶴改二\n466, // 翔鶴改二甲\n462, // 瑞鶴改二\n467];\nvar CVE_TaiyouClassRemodelAll = [380, // 大鹰改\n529, // 大鹰改二\n381, // 神鷹改\n536];\nvar CVE = [526, // 大鹰\n534, // 神鷹\n544, // Gambier Bay\n396, // Gambier Bay改\n560].concat(CVE_TaiyouClassRemodelAll);\n\n/*************************************************************************/\n\nvar CL_KumaClassRemodel = [216, // 多摩改\n217];\nvar CL_KumaClass2ndRemodel = [547, // 多摩改二\n146];\nvar CL_KumaClassRemodelAll = CL_KumaClassRemodel.concat(CL_KumaClass2ndRemodel);\nvar CL_NagaraClass2ndRemodel = [488, // 由良改二\n487];\nvar CL_YuubariClass2ndRemodel = [622, 623, 624];\n\n/*************************************************************************/\n\nvar DD_FubukiClass2ndRemodel = [426, // 吹雪改二\n420];\nvar DD_AyanamiClassRemodel = [207, // 綾波改\n208, // 敷波改\n390, // 天霧改\n391, // 狭霧改\n230, // 朧改\n231, // 曙改\n232, // 漣改\n233];\nvar DD_AyanamiClass2ndRemodel = [195, // 綾波改二\n627, // 敷波改二\n407];\nvar DD_AyanamiClassRemodelAll = DD_AyanamiClassRemodel.concat(DD_AyanamiClass2ndRemodel);\nvar DD_AkatsukiClassRemodel = [234, // 暁改\n235, // 響改\n236, // 雷改\n237];\nvar DD_AkatsukiClass2ndRemodel = [437, // 暁改二\n147];\nvar DD_AkatsukiClassRemodelAll = DD_AkatsukiClassRemodel.concat(DD_AkatsukiClass2ndRemodel);\nvar DD_HatsuharuClassRemodel = [238, // 初春改\n239, // 子日改\n240, // 若葉改\n241, // 初霜改\n703];\nvar DD_HatsuharuClass2ndRemodel = [326, // 初春改二\n419];\nvar DD_HatsuharuClassRemodelAll = DD_HatsuharuClassRemodel.concat(DD_HatsuharuClass2ndRemodel);\nvar DD_ShiratsuyuClass2ndRemodel = [497, // 白露改二\n145, // 時雨改二\n498, // 村雨改二\n144, // 夕立改二\n587, // 海風改二\n469];\nvar DD_AsashioClass2ndRemodel = [463, // 朝潮改二\n468, // 朝潮改二丁\n199, // 大潮改二\n489, // 満潮改二\n490, // 荒潮改二\n198, // 霰改二\n464, // 霞改二\n470];\nvar DD_KagerouClassRemodel = [225, // 陽炎改\n226, // 不知火改\n227, // 黒潮改\n362, // 親潮改\n300, // 初風改\n228, // 雪風改\n316, // 天津風改\n322, // 時津風改\n317, // 浦風改\n556, // 浦風丁改\n320, // 磯風改\n557, // 磯風乙改\n312, // 浜風改\n558, // 浜風乙改\n313, // 谷風改\n559, // 谷風丁改\n329, // 野分改\n354, // 嵐改\n355, // 萩風改\n294, // 舞風改\n301];\nvar DD_KagerouClass2ndRemodel = [566, // 陽炎改二\n567, // 不知火改二\n568];\nvar DD_KagerouClassRemodelB = [557, // 磯風乙改\n558];\nvar DD_KagerouClassRemodelAll = DD_KagerouClassRemodel.concat(DD_KagerouClass2ndRemodel);\nvar DD_YuugumoClass2ndRemodel = [542, // 夕雲改二\n563, // 巻雲改二\n564, // 風雲改二\n543, // 長波改二\n569, // 沖波改二\n578];\nvar DD_ShimakazeRemodel = [229];\nvar DD_YuugumoClass2ndRemodel_PLUS_ShimakazeRemodel = DD_YuugumoClass2ndRemodel.concat(DD_ShimakazeRemodel);\n\n/*************************************************************************/\n\nvar rn_BB = [571, 576, // Nelson\n439, 364];\nvar rn = [].concat(rn_BB, [515, 393, // Ark Royal\n519, 394, // Jervis\n520, // Janus\n893]);\nvar ran = [];\nvar usn_BB = [601, // Colorado\n1496, // Colorado改\n440, 360, // Iowa\nSouthDakota, SouthDakota改];\nvar usn_CV = [544, 396, // Gambier Bay\n549, 397, // Interpid\n433, 438, 545, 550, // Saratoga\nHornet, Hornet改];\nvar usn_DD = [561, 681, // Samuel B.Roberts\n596, // Fletcher\n692, // Flechter改\n562, 689];\nvar usn = [].concat(usn_BB, usn_CV, usn_DD);\nvar vmf_DD = [516, 395, // Ташкент\n147];\nvar vmf = [].concat(vmf_DD);\n\n/*************************************************************************/\n\nmodule.exports = {\n    BB_NagatoClassRemodel: BB_NagatoClassRemodel,\n    BB_NagatoClass2ndRemodel: BB_NagatoClass2ndRemodel,\n    BB_NagatoClassRemodelAll: BB_NagatoClassRemodelAll,\n    BB_KongouClassRemodel: BB_KongouClassRemodel,\n    BB_KongouClass2ndRemodel: BB_KongouClass2ndRemodel,\n    BB_KongouClassRemodelAll: BB_KongouClassRemodelAll,\n    BB_IseClassRemodel: BB_IseClassRemodel,\n    BB_IseClass2ndRemodel: BB_IseClass2ndRemodel,\n    BB_IseClassRemodelAll: BB_IseClassRemodelAll,\n    BB_FusouClass2ndRemodel: BB_FusouClass2ndRemodel,\n    BB_IseClassRemodel_PLUS_FusouClass2ndRemodel: BB_IseClassRemodel_PLUS_FusouClass2ndRemodel,\n    BB_NelsonClassRemodel: BB_NelsonClassRemodel,\n\n    CV_AkagiClassRemodel: CV_AkagiClassRemodel,\n    CV_AkagiClass2ndRemodel: CV_AkagiClass2ndRemodel,\n    CV_AkagiClassRemodelAll: CV_AkagiClassRemodelAll,\n    CV_KagaClassRemodel: CV_KagaClassRemodel,\n    CV_ShoukakuClass2ndRemodel: CV_ShoukakuClass2ndRemodel,\n    CVE: CVE,\n    CVE_TaiyouClassRemodelAll: CVE_TaiyouClassRemodelAll,\n\n    CL_KumaClassRemodel: CL_KumaClassRemodel,\n    CL_KumaClass2ndRemodel: CL_KumaClass2ndRemodel,\n    CL_KumaClassRemodelAll: CL_KumaClassRemodelAll,\n    CL_NagaraClass2ndRemodel: CL_NagaraClass2ndRemodel,\n    CL_YuubariClass2ndRemodel: CL_YuubariClass2ndRemodel,\n    Yahagi: [139, 307],\n    Ooyodo: [183, 321],\n    Kashima: [465, 356],\n\n    DD_FubukiClass2ndRemodel: DD_FubukiClass2ndRemodel,\n    DD_AyanamiClassRemodel: DD_AyanamiClassRemodel,\n    DD_AyanamiClass2ndRemodel: DD_AyanamiClass2ndRemodel,\n    DD_AyanamiClassRemodelAll: DD_AyanamiClassRemodelAll,\n    DD_AkatsukiClassRemodel: DD_AkatsukiClassRemodel,\n    DD_AkatsukiClass2ndRemodel: DD_AkatsukiClass2ndRemodel,\n    DD_AkatsukiClassRemodelAll: DD_AkatsukiClassRemodelAll,\n    DD_HatsuharuClassRemodel: DD_HatsuharuClassRemodel,\n    DD_HatsuharuClass2ndRemodel: DD_HatsuharuClass2ndRemodel,\n    DD_HatsuharuClassRemodelAll: DD_HatsuharuClassRemodelAll,\n    DD_ShiratsuyuClass2ndRemodel: DD_ShiratsuyuClass2ndRemodel,\n    DD_AsashioClass2ndRemodel: DD_AsashioClass2ndRemodel,\n    DD_KagerouClassRemodel: DD_KagerouClassRemodel,\n    DD_KagerouClassRemodelB: DD_KagerouClassRemodelB,\n    DD_KagerouClass2ndRemodel: DD_KagerouClass2ndRemodel,\n    DD_KagerouClassRemodelAll: DD_KagerouClassRemodelAll,\n    DD_YuugumoClass2ndRemodel: DD_YuugumoClass2ndRemodel,\n    DD_YuugumoClass2ndRemodel_PLUS_ShimakazeRemodel: DD_YuugumoClass2ndRemodel_PLUS_ShimakazeRemodel,\n    DD_ShimakazeRemodel: DD_ShimakazeRemodel,\n    Kamikaze: [471, 476],\n    Harukaze: [473, 363],\n    Ushio: [16, 233, 407],\n    Hibiki: [35, 235, 147],\n    Ikazuchi: [36, 236],\n    Hatsushimo: [41, 241, 419],\n    Shigure: [43, 243, 145],\n    Yamakaze: [457, 369],\n    Yamagumo: [414, 328],\n    Kasumi: [49, 253, 464, 470],\n    Yukikaze: S.Yukikaze,\n    Isokaze: [167, 320, 557],\n    Hamakaze: [170, 312, 558],\n    Maikaze: [122, 294],\n    Kishinami: [527, 686],\n    Asashimo: [425, 344, 578],\n    Suzutsuki: [532, 537],\n\n    //\n\n    rn: rn,\n    rn_BB: rn_BB,\n    ran: ran,\n    usn: usn,\n    usn_BB: usn_BB,\n    usn_CV: usn_CV,\n    usn_DD: usn_DD,\n    vmf: vmf,\n    vmf_DD: vmf_DD\n};\n\n//# sourceURL=webpack:///./node_modules/kckit/src/data/ships.js?");

/***/ }),

/***/ "./node_modules/kckit/src/types/ships.js":
/*!***********************************************!*\
  !*** ./node_modules/kckit/src/types/ships.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = {\n    // 战列舰\n    Battleships: [8, 6, 20, 7, 18, 33 // 改装航空战列舰 / 战斗航空母舰\n    ],\n    // 航母\n    Carriers: [9, // 轻型航母\n    10, // 正规航母\n    11, // 装甲航母\n    30, // 攻击型轻航母\n    32 // 特设航母\n    ],\n    // 重巡\n    HeavyCruisers: [4 // 重巡洋舰\n    ],\n    // 轻巡\n    LightCruisers: [2, // 轻巡洋舰\n    3, // 重雷装巡洋舰\n    21, // 练习巡洋舰\n    34, // 轻航空巡洋舰\n    28 // 防空巡洋舰\n    ],\n    // 驱逐舰\n    Destroyers: [1, // 驱逐舰\n    19 // 防空驱逐舰\n    ],\n    // 潜艇\n    Submarines: [13, // 潜艇\n    14 // 航母潜艇\n    ],\n    // 水上机母舰\n    SeaplaneTenders: [12, // 水上机母舰\n    24 // 飞行艇母舰\n    ]\n};\n\n//# sourceURL=webpack:///./node_modules/kckit/src/types/ships.js?");

/***/ }),

/***/ "./node_modules/kckit/src/utils/bonus-is-set.js":
/*!******************************************************!*\
  !*** ./node_modules/kckit/src/utils/bonus-is-set.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\n/**\r\n * 检查属性加成对象是否是套装加成\r\n * @param {Object} bonus\r\n * @returns {Boolean}\r\n */\nvar bonusIsSet = function bonusIsSet(bonus) {\n    if ((typeof bonus === 'undefined' ? 'undefined' : _typeof(bonus)) !== 'object') return !1;\n    if (_typeof(bonus.equipments) === 'object' || _typeof(bonus.list) === 'object') return !0;\n    return !1;\n};\n\nmodule.exports = bonusIsSet;\n\n//# sourceURL=webpack:///./node_modules/kckit/src/utils/bonus-is-set.js?");

/***/ }),

/***/ "./src/.helpers/ArrayOrItem.js":
/*!*************************************!*\
  !*** ./src/.helpers/ArrayOrItem.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function (arg, func) {\n    if (Array.isArray(arg)) return arg.some(func);\n    return func(arg);\n};\n\n//# sourceURL=webpack:///./src/.helpers/ArrayOrItem.js?");

/***/ }),

/***/ "./src/.helpers/ArrayOrItemAll.js":
/*!****************************************!*\
  !*** ./src/.helpers/ArrayOrItemAll.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function (arg, func) {\n    if (Array.isArray(arg)) return arg.every(func);\n    return func(arg);\n};\n\n//# sourceURL=webpack:///./src/.helpers/ArrayOrItemAll.js?");

/***/ }),

/***/ "./src/.helpers/convert-slots-array-for-calculator.js":
/*!************************************************************!*\
  !*** ./src/.helpers/convert-slots-array-for-calculator.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * 处理 ship.slots 数组，在 index=4 插入一个 0，原 index >=4 均后延一位\r\n */\nmodule.exports = function (arrSlot) {\n    var slots = [];\n    arrSlot.forEach(function (value, index) {\n        slots[index >= 4 ? index + 1 : index] = value;\n    });\n    // let slots = arrSlot.map(value => value)\n    slots[4] = 0;\n    return slots;\n};\n\n//# sourceURL=webpack:///./src/.helpers/convert-slots-array-for-calculator.js?");

/***/ }),

/***/ "./src/.helpers/index.js":
/*!*******************************!*\
  !*** ./src/.helpers/index.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar ArrayOrItem = __webpack_require__(/*! ./ArrayOrItem */ \"./src/.helpers/ArrayOrItem.js\");\nvar ArrayOrItemAll = __webpack_require__(/*! ./ArrayOrItemAll */ \"./src/.helpers/ArrayOrItemAll.js\");\n\nmodule.exports = {\n    ArrayOrItem: ArrayOrItem,\n    ArrayOrItemAll: ArrayOrItemAll\n};\n\n//# sourceURL=webpack:///./src/.helpers/index.js?");

/***/ }),

/***/ "./src/calculate/bonus.js":
/*!********************************!*\
  !*** ./src/calculate/bonus.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nvar getShipAndEquipments = __webpack_require__(/*! ../get/ship-and-equipments */ \"./src/get/ship-and-equipments.js\");\nvar checkShip = __webpack_require__(/*! ../check/ship */ \"./src/check/ship.js\");\nvar checkEquipments = __webpack_require__(/*! ../check/equipments */ \"./src/check/equipments.js\");\nvar bonus = __webpack_require__(/*! ../data/bonus */ \"./src/data/bonus.js\");\n\n/**\r\n * Calculate stat bonus for specified ship with equipment(s)\r\n */\nvar calculateBonus = function calculateBonus(ship) {\n    var equipments = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];\n    var equipmentStars = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];\n    var equipmentRanks = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];\n    var stat = arguments[4];\n\n    if (typeof equipmentStars === 'string') return calculateBonus(ship, equipments, undefined, undefined, equipmentStars);\n    if (typeof equipmentRanks === 'string') return calculateBonus(ship, equipments, equipmentStars, undefined, equipmentRanks);\n\n    var _getShipAndEquipments = getShipAndEquipments(ship, equipments, equipmentStars, equipmentRanks);\n\n    ship = _getShipAndEquipments.ship;\n    equipments = _getShipAndEquipments.equipments;\n    equipmentStars = _getShipAndEquipments.equipmentStars;\n    equipmentRanks = _getShipAndEquipments.equipmentRanks;\n\n\n    var result = {};\n    var conditions = bonus.filter(function (bonus) {\n        return checkShip(ship, bonus.ship);\n    });\n    var addResult = function addResult() {\n        var bonus = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n\n        for (var _stat in bonus) {\n            if (typeof result[_stat] === 'undefined') result[_stat] = bonus[_stat];else if (typeof result[_stat] === 'number') result[_stat] += bonus[_stat];else result[_stat] = bonus[_stat];\n        }\n    };\n\n    // 条件：单一装备\n    conditions.filter(function (bonus) {\n        return typeof bonus.equipment === 'number' && equipments.some(function (equipment) {\n            return equipment && equipment.id && equipment.id == bonus.equipment;\n        });\n    }).forEach(function (bonus) {\n        var thisBonus = {};\n\n        // 根据改修星级\n        // 目前的数据结构下，改修星级条件与其他条件不能共存\n        // TODO: 改修星级条件与数量条件可并存\n        if (_typeof(bonus.bonusImprove) === 'object') {\n            // 从大到小排序可能的改修星级\n            var starsDesc = Object.keys(bonus.bonusImprove).sort(function (a, b) {\n                return parseInt(b) - parseInt(a);\n            });\n            // 每个装备的收益单独计算\n            equipments.forEach(function (equipment, index) {\n                if (equipment && equipment.id && equipment.id == bonus.equipment) {\n                    starsDesc.some(function (star) {\n                        if (equipmentStars[index] >= star) {\n                            for (var _stat2 in bonus.bonusImprove[star]) {\n                                if (typeof thisBonus[_stat2] === 'undefined') thisBonus[_stat2] = bonus.bonusImprove[star][_stat2];else if (typeof thisBonus[_stat2] === 'number') thisBonus[_stat2] += bonus.bonusImprove[star][_stat2];else thisBonus[_stat2] = bonus.bonusImprove[star][_stat2];\n                            }\n                            return !0;\n                        }\n                        return !1;\n                    });\n                }\n            });\n        } else {\n            var thisCount = 0;\n\n            // 统计目标装备的数量\n            equipments.forEach(function (equipment) {\n                if (equipment && equipment.id && equipment.id == bonus.equipment) {\n                    thisCount++;\n                }\n            });\n\n            if (_typeof(bonus.bonusCount) === 'object') {\n                Object.keys(bonus.bonusCount).sort(function (a, b) {\n                    return parseInt(b) - parseInt(a);\n                }).some(function (count) {\n                    if (thisCount >= count) {\n                        thisBonus = _extends({}, bonus.bonusCount[count]);\n                        return !0;\n                    }\n                    return !1;\n                });\n            } else if (_typeof(bonus.bonus) === 'object') {\n                thisBonus = _extends({}, bonus.bonus);\n                // add for count\n                for (var _stat3 in thisBonus) {\n                    thisBonus[_stat3] = typeof thisBonus[_stat3] === 'number' ? thisBonus[_stat3] * thisCount : parseInt(thisBonus[_stat3]);\n                }\n            }\n        }\n\n        addResult(thisBonus);\n    });\n\n    // 条件：套装\n    conditions.filter(function (bonus) {\n        return _typeof(bonus.equipments) === 'object' && checkEquipments(equipments, equipmentStars, equipmentRanks, bonus.equipments);\n    }).forEach(function (bonus) {\n        addResult(bonus.bonus);\n    });\n\n    if (typeof stat === 'string') return result[stat] || 0;\n\n    return result;\n};\n\nmodule.exports = calculateBonus;\n\n//# sourceURL=webpack:///./src/calculate/bonus.js?");

/***/ }),

/***/ "./src/calculate/night-power/cv-assult.js":
/*!************************************************!*\
  !*** ./src/calculate/night-power/cv-assult.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar getShip = __webpack_require__(/*! ../../get/ship */ \"./src/get/ship.js\");\nvar getShipSlots = __webpack_require__(/*! ../../get/ship-slots */ \"./src/get/ship-slots.js\");\nvar equipmentTypes = __webpack_require__(/*! ../../types/equipments */ \"./src/types/equipments.js\");\nvar convertSlotsArr = __webpack_require__(/*! ../../.helpers/convert-slots-array-for-calculator */ \"./src/.helpers/convert-slots-array-for-calculator.js\");\n\n// https://wikiwiki.jp/kancolle/%E6%88%A6%E9%97%98%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6#nightAS\n\n// console.log('_')\n\nvar calculateNightPowerCVAssult = function calculateNightPowerCVAssult(_ref) {\n    var _ship = _ref.ship,\n        _ref$equipments = _ref.equipments,\n        equipments = _ref$equipments === undefined ? [] : _ref$equipments,\n        _ref$equipmentStars = _ref.equipmentStars,\n        equipmentStars = _ref$equipmentStars === undefined ? [] : _ref$equipmentStars,\n        _ref$bonus = _ref.bonus,\n        bonus = _ref$bonus === undefined ? {} : _ref$bonus,\n        _ref$count = _ref.count,\n        count = _ref$count === undefined ? {} : _ref$count;\n\n    /**\r\n     * 基本攻撃力 = 素火力 + 夜間飛行機の火力 + 夜間飛行機の雷装 + 1スロットごとの夜間飛行機搭載補正の合計 + 夜間触接定数(+5)\r\n     * - 夜間飛行機……夜間戦闘機(夜戦)、夜間攻撃機(夜攻)、Swordfish系(SF系)、零戦62型(爆戦／岩井隊)(岩井爆戦)のこと。\r\n     * - 夜間飛行機の搭載数が0になった場合火力、雷装加算は無効となる。\r\n     * 1スロットごとの夜間飛行機搭載補正 = A × 搭載数 + B × (火力 + 雷装 + 爆装 + 対潜) × √(搭載数) + √(★)\r\n     * - 夜戦・夜攻： A = 3.0、B = 0.45\r\n     * - SF系・岩井爆戦： A = 0、B = 0.3\r\n     */\n\n    var ship = getShip(_ship);\n    var slots = convertSlotsArr(getShipSlots(ship));\n\n    /*\r\n    const starBonus = slots.reduce((total, slot, index) => {\r\n        if (!equipments[index]) return total\r\n        if (equipmentStars[index]) {\r\n            return total + KC.formula.getStarBonus(\r\n                equipments[index],\r\n                'night',\r\n                equipmentStars[index]\r\n            )\r\n            // starBonus += Math.sqrt(equipmentStars[index]) * formula.getStarMultiplier(\r\n            //     equipments[index].type,\r\n            //     'night'\r\n            // )\r\n        }\r\n    }, 0)\r\n    */\n\n    /** @type {Number} 基础伤害 */\n    var basePower = ship.stat.fire_max;\n    // + (bonus.fire || 0) // ゆめみ: 夜袭没有蓝字加成\n\n    /** @type {Number} 参与夜袭的特殊飞机总装备数 */\n    var countOtherAttackers = 0;\n\n    /** @type {Number[]} 可能的 CI 种类的伤害系数 */\n    var multipliersCI = [];\n\n    // if (ship.id === 599) {\n    //     console.log('');\n    //     console.log('----------');\n    //     console.log({\n    //         ship,\n    //         statFire: ship.stat.fire_max,\n    //         bonus,\n    //         slots,\n    //         equipments,\n    //         equipmentStars,\n    //         count,\n    //         basePower\n    //     });\n    // }\n\n    // 计算基础伤害\n    slots.forEach(function (carry, index) {\n        if (!equipments[index]) return;\n\n        var equipment = equipments[index];\n        if (ship.id === 599) console.log(equipment._name);\n        /** @type {Boolean} 是否为 _夜战_ 或 _夜攻_ */\n        var isNightSpecific = !1;\n        /** @type {Boolean} 是否参与夜袭 */\n        var participateAssult = !1;\n\n        // 检测装备类型\n        if (Array.isArray(equipment.type_ingame) && (equipment.type_ingame[3] === 45 || // 夜战\n        equipment.type_ingame[3] === 46) // 夜攻\n        ) {\n                isNightSpecific = !0;\n                participateAssult = !0;\n            } else if (equipmentTypes.TorpedoBombers.includes(equipment.type)) {\n            if (equipment.hasName('Swordfish', 'ja_jp')) {\n                participateAssult = !0;\n                countOtherAttackers++;\n            }\n        } else if (equipmentTypes.DiveBombers.includes(equipment.type)) {\n            if (equipment.hasName('岩井', 'ja_jp')) {\n                participateAssult = !0;\n                countOtherAttackers++;\n            }\n            if (equipment.hasName('三一号光電管爆弾', 'ja_jp')) {\n                participateAssult = !0;\n                countOtherAttackers++;\n            }\n        }\n\n        if (participateAssult) {\n            var multiplierA = isNightSpecific ? 3 : 0;\n            var multiplierB = isNightSpecific ? 0.45 : 0.3;\n            basePower += equipment.getStat('fire', ship) + equipment.getStat('torpedo', ship) + multiplierA * carry + multiplierB * Math.sqrt(carry) * (equipment.getStat('fire', ship) + equipment.getStat('torpedo', ship) + equipment.getStat('bomb', ship) + equipment.getStat('asw', ship)) + (equipmentStars[index] ? KC.formula.getStarBonus(equipments[index], 'night', equipmentStars[index]) : 0);\n        }\n\n        // console.log('｜', {\n        //     index,\n        //     carry,\n        //     equipment,\n        //     isNightSpecific, participateAssult, countOtherAttackers,\n        //     '火力': equipment.getStat('fire', ship),\n        //     '雷装': equipment.getStat('torpedo', ship),\n        //     '爆装': equipment.getStat('bomb', ship),\n        //     '対潜': equipment.getStat('asw', ship),\n        //     basePower\n        // })\n    });\n\n    // 计算 CI\n    if (count.carrierFighterNight >= 2 && count.torpedoBomberNight >= 1) multipliersCI.push(1.25);\n    if (count.carrierFighterNight >= 1 && count.torpedoBomberNight >= 1) multipliersCI.push(1.2);\n    if (count.carrierFighterNight >= 3 || count.carrierFighterNight >= 2 && countOtherAttackers >= 1 || count.carrierFighterNight >= 1 && count.torpedoBomberNight >= 1 && countOtherAttackers >= 1 || count.carrierFighterNight >= 1 && count.torpedoBomberNight >= 2 || count.carrierFighterNight >= 1 && countOtherAttackers >= 2) multipliersCI.push(1.18);\n\n    /** @type {Object} 结果对象 */\n    var result = {\n        type: '航空',\n        hit: 1,\n        damage: Math.floor(basePower),\n        isMax: !0\n    };\n\n    if (multipliersCI.length) {\n        result.cis = multipliersCI.map(function (multiplier) {\n            return [Math.floor(result.damage * multiplier), 1];\n        });\n    }\n\n    // console.log({ result })\n\n    return result;\n};\n\nmodule.exports = calculateNightPowerCVAssult;\n\n//# sourceURL=webpack:///./src/calculate/night-power/cv-assult.js?");

/***/ }),

/***/ "./src/check/equipment.js":
/*!********************************!*\
  !*** ./src/check/equipment.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nvar getEquipment = __webpack_require__(/*! ../get/equipment */ \"./src/get/equipment.js\");\nvar equipmentTypes = __webpack_require__(/*! ../types/equipments */ \"./src/types/equipments.js\");\n\nvar _require = __webpack_require__(/*! ../.helpers */ \"./src/.helpers/index.js\"),\n    ArrayOrItem = _require.ArrayOrItem,\n    ArrayOrItemAll = _require.ArrayOrItemAll;\n\n/**\r\n * 检查装备是否满足给定条件\r\n * \r\n * @param {(number|Equipment)} equipment 要判断的装备\r\n * @param {Number} [star=0] 改修星级\r\n * @param {Number} [rank=0] 熟练度级别\r\n * @param {any} [conditions={}] 条件，需满足所有条件\r\n * @param {(number|number[])} [conditions.isID] 判断装备ID是否精确匹配或匹配其中一项\r\n * @param {(number|number[])} [conditions.isNotID] 判断装备ID是否不匹配\r\n * @param {(string|string[])} [conditions.isName] 判断装备名是否精确匹配或匹配其中一项\r\n * @param {(string|string[])} [conditions.isNotName] 判断装备名是否不匹配\r\n * @param {(string|string[])} [conditions.isNameOf] 判断装备名片段是否匹配或匹配其中一项\r\n * @param {(string|string[])} [conditions.isNotNameOf] 判断装备名片段是否不匹配\r\n * @param {(number|number[])} [conditions.isType] 判断装备是否属于给定舰种或匹配其中一项\r\n * @param {(number|number[])} [conditions.isNotType] 判断装备是否不属于给定舰种\r\n */\n\n\nvar check = function check(equipment) {\n    var star = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;\n    var rank = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;\n    var conditions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};\n\n    if ((typeof star === 'undefined' ? 'undefined' : _typeof(star)) === 'object') return check(equipment, 0, 0, star);\n\n    if ((typeof rank === 'undefined' ? 'undefined' : _typeof(rank)) === 'object') return check(equipment, star, 0, rank);\n\n    equipment = getEquipment(equipment);\n    if (typeof equipment === 'undefined') return !1;\n\n    // 需满足所有条件\n    for (var key in conditions) {\n        if (typeof conditions[key] === 'undefined') continue;\n\n        var keyLowerCase = key.toLowerCase();\n\n        if (['improve', 'improvement', 'star'].includes(keyLowerCase)) {\n            return (parseInt(star || 0) || 0) >= parseInt(conditions[key]);\n        }\n\n        if (checkCondition[keyLowerCase]) {\n            // checkCondition 中存在该条件，直接运行\n            if (!checkCondition[keyLowerCase](equipment, conditions[key])) return !1;\n        } else if (key.substr(0, 2) === 'is') {\n            // 以 is 为开头，通常为检查装备类型\n            var typeName = key.substr(2);\n            if (typeName === 'HAMountAAFD') {\n                typeName = 'HAMountsAAFD';\n            } else if (typeName + 's' in equipmentTypes) {\n                typeName = typeName + 's';\n            } else if (typeName in equipmentTypes) {\n                // typeName = typeName\n            } else {\n                return !1;\n            }\n            // console.log(typeName)\n            // 条件是否为Object\n            var isConditionObj = _typeof(conditions[key]) === 'object' && !Array.isArray(conditions[key]);\n            var objConditions = conditions[key] && isConditionObj ? conditions[key] : undefined;\n            if (!checkCondition[conditions[key] === !0 || isConditionObj ? 'istype' : 'isnottype'](equipment, equipmentTypes[typeName], objConditions)) return !1;\n        }\n    }\n\n    return !0;\n};\n\nvar checkCondition = {\n    /**\r\n     * 是特定ID\r\n     */\n    isid: function isid(equipment, id) {\n        return ArrayOrItem(id, function (id) {\n            if (isNaN(id)) return !1;\n            return parseInt(id) === equipment.id;\n        });\n    },\n    /**\r\n     * 不是特定ID\r\n     */\n    isnotid: function isnotid(equipment, id) {\n        return ArrayOrItemAll(id, function (id) {\n            if (isNaN(id)) return !1;\n            return parseInt(id) !== equipment.id;\n        });\n    },\n\n    /**\r\n     * 完全匹配特定名称\r\n     */\n    isname: function isname(equipment, name) {\n        return ArrayOrItem(name, function (name) {\n            return equipment.isName(name)\n            // for (let key in equipment.name) {\n            //     if (key === 'suffix') continue\n            //     if (equipment.name[key] === name) return true\n            // }\n            // return false\n            ;\n        });\n    },\n    /**\r\n     * 不是特定名称\r\n     */\n    isnotname: function isnotname(equipment, name) {\n        return ArrayOrItemAll(name, function (name) {\n            return !equipment.isName(name)\n            // for (let key in equipment.name) {\n            //     if (key === 'suffix') continue\n            //     if (equipment.name[key] === name) return false\n            // }\n            // return true\n            ;\n        });\n    },\n\n    /**\r\n     * 名称里包含特定字段\r\n     */\n    isnameof: function isnameof(equipment, name) {\n        return ArrayOrItem(name, function (name) {\n            return equipment.hasName(name)\n            // for (let key in equipment.name) {\n            //     if (key === 'suffix') continue\n            //     if (equipment.name[key].includes(name)) return true\n            // }\n            // return false\n            ;\n        });\n    },\n    /**\r\n     * 名称里不包含特定字段\r\n     */\n    isnotnameof: function isnotnameof(equipment, name) {\n        return ArrayOrItemAll(name, function (name) {\n            return !equipment.hasName(name)\n            // for (let key in equipment.name) {\n            //     if (key === 'suffix') continue\n            //     if (equipment.name[key].includes(name)) return false\n            // }\n            // return true\n            ;\n        });\n    },\n\n    /**\r\n     * 是特定类型\r\n     * 如果判断条件为Object，也会进入该条件\r\n     */\n    istype: function istype(equipment, type, conditions) {\n        return ArrayOrItem(type, function (type) {\n            if (isNaN(type)) return !1;\n            if (parseInt(type) !== equipment.type) return !1;\n            // 条件是Object\n            if ((typeof conditions === 'undefined' ? 'undefined' : _typeof(conditions)) === 'object') {\n                // 包含属性\n                if (conditions.hasStat) {\n                    var pass = !0;\n                    for (var stat in conditions.hasStat) {\n                        if (Array.isArray(conditions.hasStat[stat])) {\n                            if (equipment.stat[stat] < conditions.hasStat[stat][0]) pass = !1;\n                            if (equipment.stat[stat] > conditions.hasStat[stat][1]) pass = !1;\n                        } else if (equipment.stat[stat] < conditions.hasStat[stat]) {\n                            pass = !1;\n                        }\n                    }\n                    if (!pass) return !1;\n                }\n            }\n            return !0;\n        });\n    },\n\n    /**\r\n     * 不是特定类型\r\n     */\n    isnottype: function isnottype(equipment, type) {\n        return ArrayOrItemAll(type, function (type) {\n            if (isNaN(type)) return !1;\n            return parseInt(type) !== equipment.type;\n        });\n    },\n\n    /**\r\n     * 是对空电探/雷达\r\n     */\n    isaaradar: function isaaradar(equipment, isTrue) {\n        // console.log(`[${equipment.id}]`, equipment._name)\n        return (this.istype(equipment, equipmentTypes.Radars) && !isNaN(equipment.stat.aa) && equipment.stat.aa >= 1) === isTrue;\n    },\n\n    /**\r\n     * 是对水面电探/雷达\r\n     */\n    issurfaceradar: function issurfaceradar(equipment, isTrue) {\n        // console.log(`[${equipment.id}]`, equipment._name)\n        return (this.istype(equipment, equipmentTypes.Radars)\n        // && (\n        //     (equipment.stat.fire || 0) > 0\n        //     || (equipment.stat.aa || 0) < 2\n        // )\n        && !isNaN(equipment.stat.hit) && equipment.stat.hit >= 3) === isTrue;\n    }\n};\n\nmodule.exports = check;\n\n//# sourceURL=webpack:///./src/check/equipment.js?");

/***/ }),

/***/ "./src/check/equipments.js":
/*!*********************************!*\
  !*** ./src/check/equipments.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }); } else { obj[key] = value; } return obj; }\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n// const getEquipment = require('../get/equipment')\nvar checkEquipment = __webpack_require__(/*! ./equipment */ \"./src/check/equipment.js\");\n\nvar checkListStatic = ['id', 'name', 'nameof', 'type'];\n\n/**\r\n * 检查装备列表是否满足给定条件\r\n * \r\n * @param {(number[]|Equipment[])} equipments 要判断的装备列表\r\n * @param {Number[]} [stars=[]] 各装备的改修星级\r\n * @param {Number[]} [ranks=[]] 各装备的熟练度级别\r\n * @param {any} [conditions={}] 条件，需满足所有条件\r\n */\nvar check = function check(equipments, stars, ranks) {\n    var conditions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};\n\n    if ((typeof stars === 'undefined' ? 'undefined' : _typeof(stars)) === 'object' && !Array.isArray(stars)) return check(equipments, [], [], stars);\n\n    if ((typeof ranks === 'undefined' ? 'undefined' : _typeof(ranks)) === 'object' && !Array.isArray(ranks)) return check(equipments, stars, [], ranks);\n\n    if (!Array.isArray(equipments)) return check([equipments], stars, ranks, conditions);\n\n    if (!Array.isArray(stars)) stars = [stars];\n    if (!Array.isArray(ranks)) ranks = [ranks];\n\n    // 需满足所有条件\n\n    // Array\n    if (Array.isArray(conditions)) {\n        // 当条件为 Array 时，各个条件互相独立且必须同时满足\n        // 存在多个条件相同的可能性，表示该条件的装备存在多个\n        // 当满足一个条件后从队列中移除该装备，以确保完全匹配\n        var restEquipments = [].concat(_toConsumableArray(equipments));\n        return conditions.every(function (condition) {\n            return restEquipments.some(function (equipment, index) {\n                if (checkEquipment(equipment, stars[index], ranks[index], condition)) {\n                    restEquipments.splice(index, 1);\n                    return !0;\n                }\n                return !1;\n            });\n        });\n    }\n\n    // 其他情况\n\n    var _loop = function _loop(key) {\n        if (typeof conditions[key] === 'undefined') return 'continue';\n        if (conditions[key] === !1) {\n            // 条件：不存在\n            if (!equipments.every(function (equipment, index) {\n                return checkEquipment(equipment, stars[index], ranks[index], _defineProperty({}, key.replace(/^has/, 'is'), conditions[key]));\n            })) return {\n                    v: !1\n                };\n        } else if (conditions[key] === !0) {\n            // 条件：存在\n            if (!equipments.some(function (equipment, index) {\n                return checkEquipment(equipment, stars[index], ranks[index], _defineProperty({}, key.replace(/^has/, 'is'), conditions[key]));\n            })) return {\n                    v: !1\n                };\n        } else if (key.substr(0, 3) === 'has' && checkListStatic.includes(key.substr(3).toLowerCase())) {\n            // 条件：checkListStatic 中的项目\n            if (Array.isArray(conditions[key])) {\n                if (!conditions[key].every(function (value) {\n                    return equipments.some(function (equipment, index) {\n                        return checkEquipment(equipment, stars[index], ranks[index], _defineProperty({}, key.replace(/^has/, 'is'), value));\n                    });\n                })) return {\n                        v: !1\n                    };\n            } else {\n                if (!equipments.some(function (equipment, index) {\n                    return checkEquipment(equipment, stars[index], ranks[index], _defineProperty({}, key.replace(/^has/, 'is'), conditions[key]));\n                })) return {\n                        v: !1\n                    };\n            }\n        } else if (key.substr(0, 3) === 'has' && _typeof(conditions[key]) === 'object' && !Array.isArray(conditions[key])) {\n            // 条件合集\n            var thisCondition = Object.assign({}, conditions[key]);\n            var count = typeof thisCondition.count === 'undefined' ? 1 : thisCondition.count;\n            delete thisCondition.count;\n            var filtered = equipments.filter(function (equipment, index) {\n                return checkEquipment(equipment, stars[index], ranks[index], _defineProperty({}, key.replace(/^has/, 'is'), thisCondition));\n            });\n            // console.log(thisCondition, equipments, filtered.length, count)\n            if (filtered.length < count) return {\n                    v: !1\n                };\n        } else if (key.substr(0, 3) === 'has' && !isNaN(conditions[key])) {\n            // 条件：有至少 N 个\n            var _filtered = equipments.filter(function (equipment, index) {\n                return checkEquipment(equipment, stars[index], ranks[index], _defineProperty({}, key.replace(/^has/, 'is'), !0));\n            });\n            if (_filtered.length < conditions[key]) return {\n                    v: !1\n                };\n        } else if (key.substr(0, 3) === 'has' && Array.isArray(conditions[key])) {\n            // 条件：有至少 value[0] 个至多 value[1] 个\n            var _filtered2 = equipments.filter(function (equipment, index) {\n                return checkEquipment(equipment, stars[index], ranks[index], _defineProperty({}, key.replace(/^has/, 'is'), !0));\n            });\n            if (_filtered2.length < conditions[key][0] || _filtered2.length > conditions[key][1]) return {\n                    v: !1\n                };\n        }\n    };\n\n    for (var key in conditions) {\n        var _ret = _loop(key);\n\n        switch (_ret) {\n            case 'continue':\n                continue;\n\n            default:\n                if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === \"object\") return _ret.v;\n        }\n    }\n\n    return !0;\n};\nmodule.exports = check;\n\n//# sourceURL=webpack:///./src/check/equipments.js?");

/***/ }),

/***/ "./src/check/ship.js":
/*!***************************!*\
  !*** ./src/check/ship.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar getShip = __webpack_require__(/*! ../get/ship */ \"./src/get/ship.js\");\n\nvar _require = __webpack_require__(/*! ../.helpers */ \"./src/.helpers/index.js\"),\n    ArrayOrItem = _require.ArrayOrItem,\n    ArrayOrItemAll = _require.ArrayOrItemAll;\n\n/**\r\n * 检查舰娘是否满足给定条件\r\n * \r\n * @param {(number|Ship)} ship 要判断的舰娘\r\n * @param {any} [conditions={}] 条件，需满足所有条件\r\n * @param {(number|number[])} [conditions.isID] 判断舰娘ID是否精确匹配或匹配其中一项\r\n * @param {(number|number[])} [conditions.isNotID] 判断舰娘ID是否不匹配\r\n * @param {(string|string[])} [conditions.isName] 判断舰娘名是否精确匹配或匹配其中一项\r\n * @param {(string|string[])} [conditions.isNotName] 判断舰娘名是否不匹配\r\n * @param {(number|number[])} [conditions.isType] 判断舰娘是否属于给定舰种或匹配其中一项\r\n * @param {(number|number[])} [conditions.isNotType] 判断舰娘是否不属于给定舰种\r\n * @param {(number|number[])} [conditions.isClass] 判断舰娘是否属于给定舰级或匹配其中一项\r\n * @param {(number|number[])} [conditions.isNotClass] 判断舰娘是否不属于给定舰级\r\n * @param {boolean} [conditions.isBattleship]\r\n * @param {boolean} [conditions.isBB]\r\n * @param {boolean} [conditions.isCarrier]\r\n * @param {boolean} [conditions.isCV]\r\n * @param {boolean} [conditions.isSubmarine]\r\n * @param {boolean} [conditions.isSS]\r\n * @param {number|[min,max]} [conditions.hasSlot] 判断舰娘的可配置栏位精确有 number 个，或 min ~ max 个\r\n * @param {number} [conditions.hasSlotMin] 判断舰娘的可配置栏位至少有 number 个\r\n * @param {number} [conditions.hasSlotMax] 判断舰娘的可配置栏位最多有 number 个\r\n */\n\n\nmodule.exports = function (ship) {\n    var conditions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n\n    ship = getShip(ship);\n    if (typeof ship === 'undefined') return !1;\n\n    // 需满足所有条件\n    for (var key in conditions) {\n        if (typeof conditions[key] === 'undefined') continue;\n        if (!checkCondition[key.toLowerCase()](ship, conditions[key])) return !1;\n    }\n\n    return !0;\n};\n\nvar checkCondition = {\n    // isID\n    isid: function isid(ship, id) {\n        return ArrayOrItem(id, function (id) {\n            if (isNaN(id)) return !1;\n            return parseInt(id) === ship.id;\n        });\n    },\n    isnotid: function isnotid(ship, id) {\n        return ArrayOrItemAll(id, function (id) {\n            if (isNaN(id)) return !1;\n            return parseInt(id) !== ship.id;\n        });\n    },\n\n    // isName\n    isname: function isname(ship, name) {\n        return ArrayOrItem(name, function (name) {\n            return ship.isName(name)\n            // for (let key in ship.name) {\n            //     if (key === 'suffix') continue\n            //     if (ship.name[key].toLowerCase() === name) return true\n            // }\n            // return false\n            ;\n        });\n    },\n    isnotname: function isnotname(ship, name) {\n        return ArrayOrItemAll(name, function (name) {\n            return !ship.isName(name)\n            // for (let key in ship.name) {\n            //     if (key === 'suffix') continue\n            //     if (ship.name[key].toLowerCase() === name) return false\n            // }\n            // return true\n            ;\n        });\n    },\n\n    // isType\n    istype: function istype(ship, type) {\n        return ArrayOrItem(type, function (type) {\n            if (isNaN(type)) return !1;\n            return parseInt(type) === ship.type;\n        });\n    },\n    isnottype: function isnottype(ship, type) {\n        return ArrayOrItemAll(type, function (type) {\n            if (isNaN(type)) return !1;\n            return parseInt(type) !== ship.type;\n        });\n    },\n    isbattleship: function isbattleship(ship, isTrue) {\n        return this.istype(ship, [8, 6, 20, 7, 18]) === isTrue;\n    },\n    isbb: function isbb(ship, isTrue) {\n        return this.isbattleship(ship, isTrue);\n    },\n    iscarrier: function iscarrier(ship, isTrue) {\n        return this.istype(ship, [11, 10, 9, 30, 32]) === isTrue;\n    },\n    iscv: function iscv(ship, isTrue) {\n        return this.iscarrier(ship, isTrue);\n    },\n    issubmarine: function issubmarine(ship, isTrue) {\n        return this.istype(ship, [14, 13]) === isTrue;\n    },\n    isss: function isss(ship, isTrue) {\n        return this.issubmarine(ship, isTrue);\n    },\n\n    // isClass\n    isclass: function isclass(ship, Class) {\n        return ArrayOrItem(Class, function (Class) {\n            if (isNaN(Class)) return !1;\n            return parseInt(Class) === ship.class;\n        });\n    },\n    isnotclass: function isnotclass(ship, Class) {\n        return ArrayOrItemAll(Class, function (Class) {\n            if (isNaN(Class)) return !1;\n            return parseInt(Class) !== ship.class;\n        });\n    },\n\n    // hasSlot\n    hasslot: function hasslot(ship, num) {\n        if (!Array.isArray(ship.slot)) return !1;\n        if (Array.isArray(num)) {\n            if (isNaN(num[0]) && !isNaN(num[1])) return ship.slot.length <= parseInt(num[1]);else if (!isNaN(num[0]) && isNaN(num[1])) return ship.slot.length >= parseInt(num[0]);else if (!isNaN(num[0]) && !isNaN(num[1])) return ship.slot.length >= parseInt(num[0]) && ship.slot.length <= parseInt(num[1]);else return !1;\n        } else return !isNaN(num) && parseInt(num) === ship.slot.length;\n    },\n    hasslotmin: function hasslotmin(ship, min) {\n        return this.hasslot(ship, [min, undefined]);\n    },\n    hasslotmax: function hasslotmax(ship, max) {\n        return this.hasslot(ship, [undefined, max]);\n    },\n\n    // minLevel\n    minlevel: function minlevel(ship, level) {\n        if (typeof ship.level !== 'undefined') return ship.level >= level;\n        return !0;\n    },\n\n    canequip: function canequip(ship, equipType) {\n        return ship.canEquip(equipType);\n    }\n};\n\n//# sourceURL=webpack:///./src/check/ship.js?");

/***/ }),

/***/ "./src/data/bonus.js":
/*!***************************!*\
  !*** ./src/data/bonus.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = __webpack_require__(/*! kckit/src/data/bonus */ \"./node_modules/kckit/src/data/bonus/index.js\");\n\n//# sourceURL=webpack:///./src/data/bonus.js?");

/***/ }),

/***/ "./src/get/equipment.js":
/*!******************************!*\
  !*** ./src/get/equipment.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nmodule.exports = function (equipment) {\n    if (equipment && (typeof equipment === 'undefined' ? 'undefined' : _typeof(equipment)) === 'object' && equipment.id) {\n        return equipment;\n    } else if (!isNaN(equipment)) {\n        var data = KC.db.equipments || KC.db.items || {};\n        return data[parseInt(equipment)];\n    } else {\n        return undefined;\n    }\n};\n\n//# sourceURL=webpack:///./src/get/equipment.js?");

/***/ }),

/***/ "./src/get/ship-and-equipments.js":
/*!****************************************!*\
  !*** ./src/get/ship-and-equipments.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\nvar getShip = __webpack_require__(/*! ./ship */ \"./src/get/ship.js\");\nvar getEquipment = __webpack_require__(/*! ./equipment */ \"./src/get/equipment.js\");\n\nvar maxSlotsPlusExtra = 5;\n\nmodule.exports = function (ship) {\n    var equipments = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];\n    var equipmentStars = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];\n    var equipmentRanks = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];\n\n    if (typeof equipments === 'number' || typeof equipments === 'string') equipments = [equipments];\n    if (typeof equipmentStars === 'number' || typeof equipmentStars === 'string') equipmentStars = [equipmentStars];\n    if (typeof equipmentRanks === 'number' || typeof equipmentRanks === 'string') equipmentRanks = [equipmentRanks];\n\n    ship = getShip(ship);\n\n    equipments = [].concat(_toConsumableArray(Array(Math.max(maxSlotsPlusExtra, ship.slot.length + 1)))).map(function (_, index) {\n        if (!ship) return undefined;\n        if (ship.slot.length <= index && index < 4) return undefined;\n        return getEquipment(equipments[index]) || undefined;\n        // if (!equipment) return undefined\n        // if (equipmentStars[index]) equipment.star = equipmentStars[index]\n        // if (equipmentRanks[index]) equipment.rank = equipmentRanks[index]\n        // return equipment\n    });\n\n    return {\n        ship: ship,\n        equipments: equipments,\n        equipmentStars: equipments.map(function (_, index) {\n            return _typeof(equipments[index]) === 'object' ? Math.min(10, parseInt(equipmentStars[index]) || 0) : undefined;\n        }),\n        equipmentRanks: equipments.map(function (_, index) {\n            return _typeof(equipments[index]) === 'object' ? Math.min(7, parseInt(equipmentRanks[index]) || 0) : undefined;\n        })\n    };\n};\n\n//# sourceURL=webpack:///./src/get/ship-and-equipments.js?");

/***/ }),

/***/ "./src/get/ship-class.js":
/*!*******************************!*\
  !*** ./src/get/ship-class.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nmodule.exports = function (shipClass) {\n    if ((typeof shipClass === 'undefined' ? 'undefined' : _typeof(shipClass)) === 'object' && shipClass.id) {\n        return shipClass;\n    } else if (!isNaN(shipClass)) {\n        return KC.db.ship_classes[parseInt(shipClass)];\n    } else {\n        return undefined;\n    }\n};\n\n//# sourceURL=webpack:///./src/get/ship-class.js?");

/***/ }),

/***/ "./src/get/ship-slots.js":
/*!*******************************!*\
  !*** ./src/get/ship-slots.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar maxSlotCount = 5;\n\nmodule.exports = function (_ship) {\n    var _require = __webpack_require__(/*! ./ship */ \"./src/get/ship.js\")(_ship),\n        _require$slot = _require.slot,\n        slot = _require$slot === undefined ? [] : _require$slot;\n\n    var result = [];\n\n    for (var i = 0; i < maxSlotCount; i++) {\n        result[i] = slot[i] || 0;\n    }\n\n    return result;\n};\n\n//# sourceURL=webpack:///./src/get/ship-slots.js?");

/***/ }),

/***/ "./src/get/ship-type.js":
/*!******************************!*\
  !*** ./src/get/ship-type.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nmodule.exports = function (shipType) {\n    if ((typeof shipType === 'undefined' ? 'undefined' : _typeof(shipType)) === 'object' && shipType.id) {\n        return shipType;\n    } else if (!isNaN(shipType)) {\n        return KC.db.ship_types[parseInt(shipType)];\n    } else {\n        return undefined;\n    }\n};\n\n//# sourceURL=webpack:///./src/get/ship-type.js?");

/***/ }),

/***/ "./src/get/ship.js":
/*!*************************!*\
  !*** ./src/get/ship.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nmodule.exports = function (ship) {\n    if ((typeof ship === 'undefined' ? 'undefined' : _typeof(ship)) === 'object' && ship.id) {\n        return ship;\n    } else if (!isNaN(ship)) {\n        return KC.db.ships[parseInt(ship)];\n    } else {\n        return undefined;\n    }\n};\n\n//# sourceURL=webpack:///./src/get/ship.js?");

/***/ }),

/***/ "./src/kckit.js":
/*!**********************!*\
  !*** ./src/kckit.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || !1; descriptor.configurable = !0; if (\"value\" in descriptor) descriptor.writable = !0; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }); } else { obj[key] = value; } return obj; }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: !1, writable: !0, configurable: !0 } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n(function (name, factory) {\n    // console.log(\n    //     name,\n    //     (typeof define === 'function' && define.amd) ? true : false,\n    //     (typeof module === 'object' && module.exports) ? true : false\n    // )\n    // if (typeof define === 'function' && define.amd) {\n    //     define(factory);\n    // } else if (typeof module === 'object' && module.exports) {\n    //     module.exports = factory()\n    // } else {\n    window[name] = factory();\n    // }\n})('KC', function () {\n    var dataBonuses = __webpack_require__(/*! ./data/bonus */ \"./src/data/bonus.js\");\n    var calculateBonus = __webpack_require__(/*! ./calculate/bonus */ \"./src/calculate/bonus.js\");\n    var checkShip = __webpack_require__(/*! ./check/ship */ \"./src/check/ship.js\");\n    var checkEquipment = __webpack_require__(/*! ./check/equipment */ \"./src/check/equipment.js\");\n    var getShip = __webpack_require__(/*! ./get/ship */ \"./src/get/ship.js\");\n    var getShipClass = __webpack_require__(/*! ./get/ship-class */ \"./src/get/ship-class.js\");\n    var getShipType = __webpack_require__(/*! ./get/ship-type */ \"./src/get/ship-type.js\");\n    var equipmentTypes = __webpack_require__(/*! ./types/equipments */ \"./src/types/equipments.js\");\n\n    var KC = {\n        lang: 'zh_cn',\n        joint: '・',\n        maxShipLv: 175,\n        maxHqLv: 120,\n        db: {},\n        path: {\n            db: '/kcdb/',\n            pics: {\n                ships: '/kcpic/ships/'\n            }\n        },\n        statSpeed: {\n            5: '低速',\n            10: '高速',\n            15: '高速+',\n            20: '最速'\n        },\n        getStatSpeed: function getStatSpeed(speed) {\n            return this.statSpeed[parseInt(speed)];\n        },\n        statRange: {\n            1: '短',\n            2: '中',\n            3: '长',\n            4: '超长'\n        },\n        getStatRange: function getStatRange(range) {\n            return this.statRange[parseInt(range)];\n        },\n        getFolderGroup: function getFolderGroup(folder, id) {\n            if (typeof node != 'undefined' && node && node.path) {\n                folder = folder.substr(folder.length - 1) == '/' ? folder.substr(0, folder - 1) : folder;\n                id = parseInt(id);\n                var groupCountMax = 50;\n                var currentGroupNumber = 1;\n                while (groupCountMax * currentGroupNumber < id) {\n                    currentGroupNumber++;\n                }\n                return folder + '-' + currentGroupNumber + '/';\n            }\n            return folder;\n        },\n        textRank: {\n            1: '|',\n            2: '||',\n            3: '|||',\n            4: '\\\\',\n            5: '\\\\\\\\',\n            6: '\\\\\\\\\\\\',\n            7: '》'\n        },\n        check: {\n            ship: checkShip,\n            equipment: checkEquipment\n        },\n        planesPerSlotLBAS: {\n            recon: 4,\n            attacker: 18\n        }\n    };\n\n    /**\r\n     * KC Classes\r\n     */\n    // Base class\n\n    var ItemBase = function () {\n        function ItemBase(data) {\n            _classCallCheck(this, ItemBase);\n\n            for (var i in data) {\n                this[i] = data[i];\n            }\n        }\n\n        _createClass(ItemBase, [{\n            key: 'getName',\n            value: function getName(language) {\n                language = language || KC.lang;\n                return this.name ? this.name[language] || this.name : null;\n            }\n        }, {\n            key: 'isName',\n\n\n            /**\r\n             * 检查名称是否为（完全匹配）给定字符串\r\n             *\r\n             * @param {String} nameToCheck - 要检查的名称\r\n             * @param {Boolean|String} [locale] - 要检查的语言。如果为 true 检查当前语言，如果为 falsy 检查所有语言\r\n             * @returns {Boolean} - 是否匹配\r\n             */\n            value: function isName(nameToCheck, locale) {\n                if (locale === !0) locale = KC.lang;\n                if (locale) {\n                    if (this.name[locale] === nameToCheck) return !0;\n                    return !1;\n                }\n\n                for (var key in this.name) {\n                    if (key === 'suffix') continue;\n                    if (this.name[key] === nameToCheck) return !0;\n                }\n                return !1;\n            }\n\n            /**\r\n             * 检查名称是否包含给定字符串\r\n             *\r\n             * @param {String} nameToCheck - 要检查的名称\r\n             * @param {Boolean|String} [locale] - 要检查的语言。如果为 true 检查当前语言，如果为 falsy 检查所有语言\r\n             * @returns {Boolean} - 是否匹配\r\n             */\n\n        }, {\n            key: 'hasName',\n            value: function hasName(nameToCheck, locale) {\n                if (locale === !0) locale = KC.lang;\n                if (locale) {\n                    if (this.name[locale].includes(nameToCheck)) return !0;\n                    return !1;\n                }\n\n                for (var key in this.name) {\n                    if (key === 'suffix') continue;\n                    if (this.name[key].includes(nameToCheck)) return !0;\n                }\n                return !1;\n            }\n        }, {\n            key: 'isNameOf',\n            value: function isNameOf() {\n                return this.hasName.apply(this, arguments);\n            }\n        }, {\n            key: '_name',\n            get: function get() {\n                return this.getName();\n            }\n        }]);\n\n        return ItemBase;\n    }();\n    // Class for Entity (Person/Group, such as CVs, illustrators)\n\n\n    var Entity = function (_ItemBase) {\n        _inherits(Entity, _ItemBase);\n\n        function Entity(data) {\n            _classCallCheck(this, Entity);\n\n            return _possibleConstructorReturn(this, (Entity.__proto__ || Object.getPrototypeOf(Entity)).call(this, data));\n        }\n\n        return Entity;\n    }(ItemBase);\n\n    var Equipment = function (_ItemBase2) {\n        _inherits(Equipment, _ItemBase2);\n\n        function Equipment(data) {\n            _classCallCheck(this, Equipment);\n\n            var _this2 = _possibleConstructorReturn(this, (Equipment.__proto__ || Object.getPrototypeOf(Equipment)).call(this, data));\n\n            Object.defineProperty(_this2, 'rankupgradable', {\n                value: _this2.isRankUpgradable()\n            });\n            return _this2;\n        }\n\n        _createClass(Equipment, [{\n            key: 'getName',\n            value: function getName(small_brackets, language) {\n                language = language || KC.lang;\n                var result = ItemBase.prototype.getName.call(this, language),\n                    small_brackets_tag = small_brackets && !small_brackets === !0 ? small_brackets : 'small';\n                return small_brackets ? result.replace(/（([^（^）]+)）/g, '<' + small_brackets_tag + '>($1)</' + small_brackets_tag + '>') : result;\n            }\n        }, {\n            key: 'getType',\n            value: function getType(language) {\n                language = language || KC.lang;\n                return this.type ? KC.db.item_types[this.type].name[language] : null;\n            }\n        }, {\n            key: 'getIconId',\n            value: function getIconId() {\n                if (Array.isArray(this.type_ingame) && this.type_ingame.length > 3) return this.type_ingame[3];\n                return KC.db.item_types[this.type].icon;\n            }\n        }, {\n            key: 'getCaliber',\n            value: function getCaliber() {\n                var name = this.getName(!1, 'ja_jp'),\n                    caliber = parseFloat(name);\n\n                return caliber;\n            }\n        }, {\n            key: 'getPower',\n            value: function getPower() {\n                return this.stat[KC.db.item_types[this.type].main_attribute || 'fire'];\n                /*\r\n                switch( this.type ){\r\n                    // Guns\r\n                        case 1:\r\n                        case 2:\r\n                        case 3:\r\n                        case 4:\r\n                        case 5:\r\n                        case 6:\r\n                        case 7:\r\n                        case 8:\r\n                        case 9:\r\n                }\r\n                */\n            }\n\n            /**\r\n             * 判断是否可装备入补强增设栏位\r\n             *\r\n             * @returns {boolean}\r\n             */\n\n        }, {\n            key: 'isEquipableExSlot',\n            value: function isEquipableExSlot() {\n                if (this.equipable_exslot) return this.equipable_exslot || !1;\n                return this.type ? KC.db.item_types[this.type].equipable_exslot || !1 : !1;\n            }\n\n            /**\r\n             * 判断是否可提升熟练度\r\n             *\r\n             * @returns {boolean}\r\n             */\n\n        }, {\n            key: 'isRankUpgradable',\n            value: function isRankUpgradable() {\n                return formula.equipmentType.Aircrafts.includes(this.type) && this.type !== formula.equipmentType.Autogyro && this.type !== formula.equipmentType.AntiSubPatrol;\n            }\n\n            /**\r\n             * 获取属性\r\n             *\r\n             * @param {String} statType - 属性类型\r\n             * @param {Number|Object} [ship] - 舰娘ID或舰娘数据，如果给出，会查询额外收益\r\n             * @returns {boolean}\r\n             */\n\n        }, {\n            key: 'getStat',\n            value: function getStat(statType, ship) {\n                statType = statType.toLowerCase();\n                var base = this.stat[statType];\n                if (!ship || base === undefined || !Array.isArray(this.stat_bonus)) return base;\n                if (ship && Array.isArray(this.stat_bonus)) {\n                    if ((typeof ship === 'undefined' ? 'undefined' : _typeof(ship)) !== 'object') ship = KC.db.ships[ship];\n                    var shipId = ship.id;\n\n                    var bonus = void 0;\n\n                    this.stat_bonus.forEach(function (o) {\n                        if (Array.isArray(o.ships)) o.ships.some(function (ship) {\n                            if (ship == shipId) {\n                                for (var stat in o.bonus) {\n                                    if (!bonus) bonus = {};\n                                    bonus[stat] = Math.max(o.bonus[stat], bonus[stat] || 0);\n                                }\n                                return !0;\n                            }\n                            return !1;\n                        });\n                        if (Array.isArray(o.ship_classes)) o.ship_classes.some(function (classId) {\n                            if (classId == ship.class) {\n                                for (var stat in o.bonus) {\n                                    if (!bonus) bonus = {};\n                                    bonus[stat] = Math.max(o.bonus[stat], bonus[stat] || 0);\n                                }\n                                return !0;\n                            }\n                            return !1;\n                        });\n                        // return typeof bonus !== 'undefined'\n                    });\n                    if (bonus) {\n                        return base + (bonus[statType] || 0);\n                    }\n                }\n                return base;\n            }\n\n            /**\r\n             * 获取该装备所有可用的属性加成和装备组合\r\n             * @returns {Array} Bonuses\r\n             */\n\n        }, {\n            key: 'getBonuses',\n            value: function getBonuses() {\n                var _this3 = this;\n\n                return dataBonuses.filter(function (bonus) {\n                    if (bonus.equipment == _this3.id) return !0;\n                    if (typeof bonus.equipments !== 'undefined' && _typeof(bonus.ship) === 'object') {\n                        if (Array.isArray(bonus.ship.isID) && !bonus.ship.isID.every(function (shipId) {\n                            return getShip(shipId).canEquip(_this3, !0);\n                        })) return !1;\n                        if (typeof bonus.ship.isID === 'number' && !getShip(bonus.ship.isID).canEquip(_this3, !0)) return !1;\n                        if (Array.isArray(bonus.ship.isType) && !bonus.ship.isType.every(function (typeId) {\n                            return getShipType(typeId).equipable.includes(_this3.type);\n                        })) return !1;\n                        if (typeof bonus.ship.isType === 'number' && !getShipType(bonus.ship.isType).equipable.includes(_this3.type)) return !1;\n                        if (Array.isArray(bonus.ship.isClass) && !bonus.ship.isClass.every(function (classId) {\n                            return getShipType(getShipClass(classId).ship_type_id).equipable.includes(_this3.type);\n                        })) return !1;\n                        if (typeof bonus.ship.isClass === 'number' && !getShipType(getShipClass(bonus.ship.isClass).ship_type_id).equipable.includes(_this3.type)) return !1;\n                    }\n                    if (Array.isArray(bonus.equipments)) {\n                        return bonus.equipments.some(function (condition) {\n                            return checkEquipment(_this3, 10, 7, condition);\n                        });\n                    }\n                    if (_typeof(bonus.equipments) === 'object') {\n                        return Object.keys(bonus.equipments).filter(function (key) {\n                            return (/^has/.test(key)\n                            );\n                        }).some(function (key) {\n                            return checkEquipment(_this3, _defineProperty({}, key.replace(/^has/, 'is'), bonus.equipments[key]));\n                        });\n                    }\n                    return !1;\n                });\n            }\n        }, {\n            key: '_icon',\n            get: function get() {\n                return 'assets/images/itemicon/' + this.getIconId() + '.png';\n            }\n        }]);\n\n        return Equipment;\n    }(ItemBase);\n\n    var Ship = function (_ItemBase3) {\n        _inherits(Ship, _ItemBase3);\n\n        function Ship(data) {\n            _classCallCheck(this, Ship);\n\n            return _possibleConstructorReturn(this, (Ship.__proto__ || Object.getPrototypeOf(Ship)).call(this, data));\n        }\n        /**\r\n         * @param {string} joint - OPTIONAL - 连接符，如果存在后缀名，则在舰名和后缀名之间插入该字符串\r\n         * @param {bollean} joint - OPTIONAL - 如果为 true，则添加默认连接符；false，则不添加连接符\r\n         * @param {null} joint - OPTIONAL - 不添加连接符\r\n         * @param {string} language - OPTIONAL - 语言代码，默认为 KCTip.lang\r\n         * @return {string} 舰名 + 连接符（如果有） + 后缀名（如果有）\r\n         * 快捷方式 - ship._name (默认连接符，默认语言)\r\n         */\n\n\n        _createClass(Ship, [{\n            key: 'getName',\n            value: function getName(joint, language) {\n                joint = joint || '';\n                language = language || KC.lang;\n                var suffix = this.getSuffix(language);\n                return (this.name[language] || this.name.ja_jp) + (suffix ? (joint === !0 ? KC.joint : joint) + suffix : '');\n            }\n            /*\t获取舰名，不包括后缀\r\n                变量\r\n                    language\t[OPTIONAL]\r\n                        String\t\t语言代码，默认为 KC.lang\r\n                返回值\r\n                    String\t\t舰名，不包括后缀\r\n            */\n\n        }, {\n            key: 'getNameNoSuffix',\n            value: function getNameNoSuffix(language) {\n                language = language || KC.lang;\n                return this.name[language] || this.name.ja_jp;\n            }\n            /*\t获取后缀名\r\n                变量\r\n                    language\t[OPTIONAL]\r\n                        String\t\t语言代码，默认为 KC.lang\r\n                返回值\r\n                    String\t\t后缀名\r\n            */\n\n        }, {\n            key: 'getSuffix',\n            value: function getSuffix(language) {\n                language = language || KC.lang;\n                return this.name.suffix ? KC.db.ship_namesuffix[this.name.suffix][language] || KC.db.ship_namesuffix[this.name.suffix].ja_jp || '' : '';\n            }\n            /*\t获取舰种\r\n                变量\r\n                    language\t[OPTIONAL]\r\n                        String\t\t语言代码，默认为 KC.lang\r\n                返回值\r\n                    String\t\t舰种\r\n                快捷方式\r\n                    ship._type\t默认语言\r\n            */\n\n        }, {\n            key: 'getType',\n            value: function getType(language) {\n                language = language || KC.lang;\n                return this.type ? KC.db.ship_types[this.type].name[language] || KC.db.ship_types[this.type].name.ja_jp || '' : null;\n            }\n        }, {\n            key: 'getSeriesData',\n\n            /*\t获取系列数据\r\n                返回值\r\n                    Object\t\t系列\r\n            */\n            value: function getSeriesData() {\n                return this.series ? KC.db.ship_series[this.series].ships : [{\n                    id: this.id\n                }];\n            }\n        }, {\n            key: 'getPic',\n\n            /**\r\n             * 获取图鉴uri/path\r\n             *\r\n             * @param {number} [picId = 0] - 图鉴Id，默认 0\r\n             * @param {string} [ext]\r\n             * @returns {string} uri/path\r\n             *\r\n             * @memberOf Ship\r\n             *\r\n             * 快捷方式\r\n             *      ship._pics\t获取全部图鉴，Array\r\n             */\n            value: function getPic(picId, ext) {\n                picId = parseInt(picId || 0);\n                var series = this.getSeriesData();\n                var strVersion = this.illust_version ? '?version=' + this.illust_version : '';\n\n                var getURI = function getURI(i, p) {\n                    if (typeof node != 'undefined' && node && node.path && KC.path.pics.ships) {\n                        return node.path.join(KC.getFolderGroup(KC.path.pics.ships, i), i + '/' + p + '.' + (ext ? ext : 'webp'));\n                    }\n                    if (KC.path.pics.ships) return KC.path.pics.ships + i + '/' + p + '.' + (ext ? ext : 'png') + strVersion;\n                    return '/' + i + '/' + p + '.' + (ext ? ext : 'png') + strVersion;\n                };\n\n                for (var i = 0; i < series.length; i++) {\n                    if (series[i].id == this.id) {\n                        switch (picId) {\n                            case 0:\n                            case 1:\n                            case 2:\n                            case 3:\n                            case 12:\n                            case 13:\n                            case 14:\n                                return getURI(this.id, picId);\n                            //break;\n                            default:\n                                if (series[i].illust_delete) {\n                                    return getURI(series[i - 1].id, picId);\n                                } else {\n                                    return getURI(this.id, picId);\n                                }\n                            //break;\n                        }\n                        //break;\n                    }\n                }\n            }\n        }, {\n            key: 'getSpeed',\n            value: function getSpeed() /*language*/{\n                // language = language || KC.lang\n                return KC.statSpeed[parseInt(this.stat.speed)];\n            }\n        }, {\n            key: 'getSpeedRule',\n            value: function getSpeedRule() {\n                if (this.speed_rule) return this.speed_rule;\n                // if (this.name.ja_jp === '天津風') return 'high-2'\n                return this.class ? KC.db.ship_classes[this.class].speed_rule : null;\n            }\n        }, {\n            key: 'getRange',\n            value: function getRange() /*language*/{\n                // language = language || KC.lang\n                return KC.statRange[parseInt(this.stat.range)];\n            }\n        }, {\n            key: 'getEquipmentTypes',\n\n\n            /**\r\n             * 获取可配置装备类型\r\n             * 快捷方式 - ship._equipmentTypes\r\n             *\r\n             * @param {number|boolean} [slotIndex] 装备栏位index\r\n             *                         - 从 0 开始，4 固定为补强增设栏，第 5 装备栏从 5 开始\r\n             *                         - 如果给定，则会查询该栏位的装备类型，包含该栏位特有的类型\r\n             *                         - 如果为 true，则会检查所有栏位可以装备的类型\r\n             * @returns {number[]} - 装备ID\r\n             */\n            value: function getEquipmentTypes(slotIndex) {\n                var disabled = this.additional_disable_item_types || [];\n                var shipType = KC.db.ship_types[this.type];\n                var types = (shipType.equipable || []).concat(this.additional_item_types || []);\n                /**\r\n                 * 忽略补强增设栏 (固定 index 4) 的 index\r\n                 * - 如果 index 为 4，忽略\r\n                 * - 如果 index 大于 4，减 1\r\n                 */\n                var trueSlotIndex = typeof slotIndex === 'number' && slotIndex !== 4 ? slotIndex > 4 ? slotIndex - 1 : slotIndex : undefined;\n\n                // 如果当前舰种存在根据装备栏位的额外可装备类型\n                if (Array.isArray(shipType.additional_item_types_by_slot)) {\n                    // 如果指定了装备栏位，将该栏位对应的装备类型追加到类型表中\n                    if (typeof trueSlotIndex === 'number') {\n                        if (Array.isArray(shipType.additional_item_types_by_slot[trueSlotIndex])) shipType.additional_item_types_by_slot[trueSlotIndex].forEach(function (id) {\n                            return types.push(id);\n                        });\n                    }\n                    // 如果 slotIndex 为 true，将所有栏位的额外可装备类型追加到类型表中\n                    else if (slotIndex === !0) {\n                            shipType.additional_item_types_by_slot.forEach(function (slotInfo) {\n                                slotInfo.forEach(function (id) {\n                                    return types.push(id);\n                                });\n                            });\n                        }\n                }\n\n                // 如果当前舰种存在根据装备栏位的可装备类型排除个例\n                if (typeof trueSlotIndex === 'number' && Array.isArray(shipType.equipable_exclude_by_slot) && Array.isArray(shipType.equipable_exclude_by_slot[trueSlotIndex])) {\n                    shipType.equipable_exclude_by_slot[trueSlotIndex].forEach(function (excludeId) {\n                        var index = types.indexOf(excludeId);\n                        if (index >= 0) types.splice(index, 1);\n                    });\n                }\n\n                return types.filter(function (type) {\n                    return disabled.indexOf(type) < 0;\n                }).sort(function (a, b) {\n                    return a - b;\n                });\n            }\n        }, {\n            key: 'getAttribute',\n            value: function getAttribute(attr, lvl) {\n                lvl = lvl || 1;\n                if (lvl > Ship.lvlMax) lvl = Ship.lvlMax;\n\n                var getStatOfLvl = function getStatOfLvl(lvl, base, max) {\n                    lvl = lvl || 1;\n                    base = parseFloat(base);\n                    max = parseFloat(max) || base;\n                    if (base < 0 || max < 0) return -1;\n                    if (base == max) return max;\n                    return Math.floor(base + (max - base) * lvl / 99);\n                };\n\n                var value = void 0;\n\n                switch (attr) {\n                    case 'hp':\n                        value = this.stat.hp;\n                        if (lvl > 99) {\n                            if (this.stat.hp >= 90) value = this.stat.hp + 9;else if (this.stat.hp >= 70) value = this.stat.hp + 8;else if (this.stat.hp >= 50) value = this.stat.hp + 7;else if (this.stat.hp >= 40) value = this.stat.hp + 6;else if (this.stat.hp >= 30) value = this.stat.hp + 5;else value = this.stat.hp + 4;\n                            if (value > this.stat.hp_max) value = this.stat.hp_max;\n                        }\n                        return value;\n                    //break;\n                    case 'speed':\n                        return KC.getStatSpeed(this.stat.speed);\n                    //break;\n                    case 'range':\n                        return KC.getStatRange(this.stat.range);\n                    //break;\n                    case 'luck':\n                        if (lvl > 99) return this.stat.luck + 3;\n                        return this.stat.luck;\n                    //break;\n                    case 'fuel':\n                    case 'ammo':\n                        if (lvl > 99) return Math.floor(this.consum[attr] * 0.85);\n                        return this.consum[attr];\n                    //break;\n                    case 'aa':\n                    case 'armor':\n                    case 'fire':\n                    case 'torpedo':\n                        return this.stat[attr + '_max'] || this.stat[attr];\n                    //break;\n                    default:\n                        return getStatOfLvl(lvl, this.stat[attr], this.stat[attr + '_max']);\n                    //break;\n                }\n            }\n            /*\t获取关系\r\n                变量\r\n                    relation\t[OPTIONAL]\r\n                        String\t\t关系名\r\n                返回值\r\n                    Object\t\t\t如果没有给出 relation，返回关系对象\r\n                    String||Number\t如果给出 relation，返回值，默认读取 rels 下的属性，如果不存在，读取上一个改造版本的对应关系\r\n            */\n\n        }, {\n            key: 'getRel',\n            value: function getRel(relation) {\n                if (relation) {\n                    if (!this.rels[relation] && this.remodel && this.remodel.prev) {\n                        var prev = KC.db.ships[this.remodel.prev];\n                        while (prev) {\n                            if (prev.rels && prev.rels[relation]) return prev.rels[relation];\n                            if (!prev.remodel || !prev.remodel.prev) prev = null;else prev = KC.db.ships[prev.remodel.prev];\n                        }\n                    }\n                    return this.rels[relation];\n                } else {\n                    return this.rels;\n                }\n            }\n            /*\t获取声优\r\n                变量\r\n                    language\t[OPTIONAL]\r\n                        String\t\t语言代码，默认为 KC.lang\r\n                返回值\r\n                    String\t\t声优名\r\n                快捷方式\r\n                    ship._cv\t默认语言\r\n            */\n\n        }, {\n            key: 'getCV',\n            value: function getCV(language) {\n                var entity = this.getRel('cv');\n                if (entity) return KC.db.entities[entity].getName(language || KC.lang);\n                return;\n            }\n        }, {\n            key: 'getIllustrator',\n\n            /*\t获取画师\r\n                变量\r\n                    language\t[OPTIONAL]\r\n                        String\t\t语言代码，默认为 KC.lang\r\n                返回值\r\n                    String\t\t画师名\r\n                快捷方式\r\n                    ship._illustrator\t默认语言\r\n            */\n            value: function getIllustrator(language) {\n                var entity = this.getRel('illustrator');\n                if (entity) return KC.db.entities[entity].getName(language || KC.lang);\n                return;\n            }\n        }, {\n            key: 'getMinLv',\n\n\n            /* 获取该舰娘可能的最低等级\r\n             */\n            value: function getMinLv() {\n                var _this5 = this;\n\n                var series = this._series;\n                var lv = void 0;\n                series.some(function (o, index) {\n                    if (_this5.id == o.id) {\n                        if (index) {\n                            lv = series[index - 1].next_lvl;\n                        } else {\n                            lv = 1;\n                        }\n                    }\n                    return lv;\n                });\n                return lv;\n            }\n        }, {\n            key: 'getNavy',\n\n\n            /**\r\n             * 获取所属海军简称\r\n             *\r\n             * @readonly\r\n             * @returns {String}\r\n             */\n            value: function getNavy() {\n                if (this.navy) return this.navy;\n                return this.class ? KC.db.ship_classes[this.class].navy || 'ijn' : 'ijn';\n            }\n        }, {\n            key: 'getCapability',\n\n\n            /**\r\n             * 获取额外能力\r\n             *\r\n             * @param {String} [type] - 要获取的能力\r\n             * @returns {Object|...} - 如果提供了 type，返回该能力。如果没有，返回 Object\r\n             */\n            value: function getCapability(type) {\n                if (!type) return this.capabilities || {};\n                if (!this.capabilities) return undefined;\n                return this.capabilities[type];\n            }\n\n            /**\r\n             * 获取额外可提升的值\r\n             *\r\n             * @param {String} [type] - 要获取的属性名\r\n             * @returns {Number} - 数值\r\n             */\n\n        }, {\n            key: 'getStatExtraMax',\n            value: function getStatExtraMax(type) {\n                var lvl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;\n\n                switch (type.toLowerCase()) {\n                    case 'hp':\n                        {\n                            // const hpBase = this.getStat(type, 99)\n                            // const hpAfterMarriage = this.getStat(type, 100)\n                            var stat = this.getAttribute(type, lvl);\n                            var statMax = this.stat.hp_max;\n                            return Math.max(0, Math.min(2, statMax - stat));\n                        }\n                    case 'asw':\n                        {\n                            if (this.stat.asw) return 9;\n                            if (formula.shipType.LightCruisers.concat(formula.shipType.Destroyers).includes(this.type)) return 9;\n                            return !1;\n                        }\n                    default:\n                        return !1;\n                }\n            }\n\n            /**\r\n             * 判断该舰娘是否可配置给定的类型的装备\r\n             *\r\n             * @param {(number|number[]|string|string[])} equipmentType 装备类型，如果为 Array，会判断是否满足所有条件\r\n             * @param {Number|Boolean} [slotIndex] 装备栏位index。从 0 开始。如果为 true，则检查所有栏位\r\n             * @returns {boolean}\r\n             */\n\n        }, {\n            key: 'canEquip',\n            value: function canEquip(equipmentType, slotIndex) {\n                var _this6 = this;\n\n                if (Array.isArray(equipmentType)) {\n                    return equipmentType.every(function (type) {\n                        return _this6.canEquip(type, slotIndex);\n                    });\n                }\n\n                // 如果 equipmentType 为 String，将其转为对应的类型数字或类型集\n                if (typeof equipmentType === 'string') {\n                    if (Array.isArray(equipmentTypes[equipmentType])) return equipmentTypes[equipmentType].some(function (type) {\n                        return _this6.canEquip(type, slotIndex);\n                    });\n                    if (typeof equipmentTypes[equipmentType] === 'number') return this.canEquip(equipmentTypes[equipmentType], slotIndex);\n                    if (Array.isArray(equipmentTypes[equipmentType + 's'])) return equipmentTypes[equipmentType + 's'].some(function (type) {\n                        return _this6.canEquip(type, slotIndex);\n                    });\n                }\n\n                // 如果equipmentType 为 Equipment，获取 type\n                if ((typeof equipmentType === 'undefined' ? 'undefined' : _typeof(equipmentType)) === 'object' && typeof equipmentType.type !== 'undefined') equipmentType = equipmentType.type;\n\n                if (isNaN(equipmentType)) {\n                    return !1;\n                } else {\n                    return this.getEquipmentTypes(slotIndex).includes(parseInt(equipmentType));\n                }\n            }\n\n            /**\r\n             * 判断该舰娘是否可配置给定的装备\r\n             *\r\n             * @param {(number|number[]|string|string[]|Equipment)} equipment 装备，如果为 Array，会判断是否满足所有条件\r\n             * @param {Number|Boolean} [slotIndex] 装备栏位index。从 0 开始。如果为 true，则检查所有栏位\r\n             * @returns {boolean}\r\n             */\n\n        }, {\n            key: 'canEquipThis',\n            value: function canEquipThis(equipment, slotIndex) {\n                var _this7 = this;\n\n                if (Array.isArray(equipment)) {\n                    return equipment.every(function (e) {\n                        return _this7.canEquipThis(e, slotIndex);\n                    });\n                }\n\n                if (typeof equipment === 'string') {\n                    if (isNaN(equipment)) return !1;\n                    equipment = parseInt(equipment);\n                }\n\n                var equipmentType = void 0;\n\n                if (typeof equipment === 'number') {\n                    equipmentType = KC.db.item_types[equipment].type;\n                }\n                if ((typeof equipment === 'undefined' ? 'undefined' : _typeof(equipment)) === 'object') {\n                    if (equipment.id) {\n                        equipmentType = equipment.type;\n                        equipment = equipment.id;\n                    } else return !1;\n                }\n\n                if (Array.isArray(this.additional_items) && this.additional_items.includes(equipment)) return !0;\n\n                return this.canEquip(equipmentType, slotIndex);\n            }\n\n            /**\r\n             * 获取该舰娘所有可用的属性加成装备和装备组合\r\n             * @returns {Array} Bonuses\r\n             */\n\n        }, {\n            key: 'getBonuses',\n            value: function getBonuses() {\n                var _this8 = this;\n\n                return dataBonuses.filter(function (bonus) {\n                    return checkShip(_this8, bonus.ship);\n                });\n            }\n        }, {\n            key: '_type',\n            get: function get() {\n                return this.getType();\n            }\n        }, {\n            key: '_series',\n            get: function get() {\n                return this.getSeriesData();\n            }\n        }, {\n            key: '_pics',\n            get: function get() {\n                var arr = [];\n                for (var i = 0; i < 15; i++) {\n                    arr.push(this.getPic(i));\n                }\n                return arr;\n            }\n        }, {\n            key: '_speed',\n            get: function get() {\n                return this.getSpeed();\n            }\n        }, {\n            key: '_speedRule',\n            get: function get() {\n                return this.getSpeedRule();\n            }\n        }, {\n            key: '_range',\n            get: function get() {\n                return this.getRange();\n            }\n        }, {\n            key: '_cv',\n            get: function get() {\n                return this.getCV();\n            }\n        }, {\n            key: '_illustrator',\n            get: function get() {\n                return this.getIllustrator();\n            }\n        }, {\n            key: '_minLv',\n            get: function get() {\n                return this.getMinLv();\n            }\n        }, {\n            key: '_navy',\n            get: function get() {\n                return this.getNavy();\n            }\n        }]);\n\n        return Ship;\n    }(ItemBase);\n\n    Ship.lvlMax = KC.maxShipLv;\n\n    var Consumable = function (_ItemBase4) {\n        _inherits(Consumable, _ItemBase4);\n\n        function Consumable(data) {\n            _classCallCheck(this, Consumable);\n\n            return _possibleConstructorReturn(this, (Consumable.__proto__ || Object.getPrototypeOf(Consumable)).call(this, data));\n        }\n\n        return Consumable;\n    }(ItemBase);\n\n    /**\r\n     * KC Database\r\n     */\n\n\n    KC.dbLoad = function (o) {\n        if (typeof o == 'string') return KC.dbLoad({ type: o });\n\n        if (!o.type && !o.url) return null;\n\n        return $.ajax({\n            url: o.url || KC.path.db + '/' + o.type + '.json',\n            dataType: 'text',\n            success: function success(data) {\n                var arr = [];\n                if (o.beforeProcess) arr = o.beforeProcess(data);\n                if (typeof KC.db[o.type] == 'undefined') KC.db[o.type] = {};\n                arr.forEach(function (str) {\n                    if (str) {\n                        var doc = JSON.parse(str);\n                        switch (o.type) {\n                            case 'ships':\n                                KC.db[o.type][doc.id] = new Ship(doc);\n                                break;\n                            case 'items':\n                                KC.db[o.type][doc.id] = new Equipment(doc);\n                                break;\n                            case 'entities':\n                                KC.db[o.type][doc.id] = new Entity(doc);\n                                break;\n                            default:\n                                KC.db[o.type][doc.id] = doc;\n                                break;\n                        }\n                    }\n                });\n                if (o.success) o.success(data);\n            },\n            complete: function complete(jqXHR, textStatus) {\n                if (o.complete) o.complete(jqXHR, textStatus);\n            }\n        });\n    };\n\n    /**\r\n     * KC Formulas\r\n     */\n    var _ship = function _ship(ship) {\n        return ship instanceof Ship ? ship : KC.db.ships ? KC.db.ships[ship] : {};\n    };\n    var _equipment = function _equipment(equipment) {\n        return equipment instanceof Equipment ? equipment : KC.db.equipments ? KC.db.equipments[equipment] : KC.db.items[equipment];\n    };\n    var _slots = __webpack_require__(/*! ./.helpers/convert-slots-array-for-calculator */ \"./src/.helpers/convert-slots-array-for-calculator.js\");\n    var formula = {\n        // 装备类型\n        equipmentType: equipmentTypes,\n        // 舰种\n        shipType: {\n            // 航母系列\n            Carriers: [9, // 轻型航母\n            10, // 正规航母\n            11, // 装甲航母\n            30, // 攻击型轻航母\n            32 // 特设航母\n            ],\n            // 轻巡系列\n            LightCruisers: [2, // 轻巡洋舰\n            3, // 重雷装巡洋舰\n            21, // 练习巡洋舰\n            34, // 轻航空巡洋舰\n            28 // 防空巡洋舰\n            ],\n            // 驱逐舰系列\n            Destroyers: [1, // 驱逐舰\n            19 // 防空驱逐舰\n            ],\n            // 潜艇系列\n            Submarines: [13, // 潜艇\n            14 // 航母潜艇\n            ]\n        },\n        // 根据舰娘与其装备计算\n        calcByShip: {},\n        // 根据舰队配置计算\n        calcByFleet: {},\n        // 根据航空队机场与其飞行器配置计算\n        calcByField: {},\n        calc: {}\n    };\n    var _equipmentType = formula.equipmentType;\n    _equipmentType.isInterceptor = function (equipment) {\n        equipment = _equipment(equipment);\n\n        if (equipment.type_ingame && equipment.type_ingame[2] == 47) return !1;\n\n        return _equipmentType.Interceptors.indexOf(equipment.type) > -1;\n    };\n\n    // 改修收益系数\n    formula.starMultiper = {\n        SmallCalibers: {\n            shelling: 1,\n            night: 1\n        },\n        MediumCalibers: {\n            shelling: 1,\n            night: 1\n        },\n        LargeCalibers: {\n            shelling: 1.5,\n            night: 1\n        },\n        SecondaryGuns: {\n            shelling: 1,\n            night: 1,\n            hit: 1\n        },\n        APShells: {\n            shelling: 1,\n            night: 1\n        },\n        AAShells: {\n            shelling: 1,\n            night: 1\n        },\n        AAFireDirectors: {\n            shelling: 1,\n            night: 1\n        },\n        Searchlights: {\n            shelling: 1,\n            night: 1\n        },\n        AAGuns: {\n            shelling: 1,\n            torpedo: 1.2\n        },\n        Torpedos: {\n            torpedo: 1.2,\n            night: 1\n        },\n        MidgetSubmarine: {\n            night: 1\n        },\n        DepthCharges: {\n            shelling: 0.75,\n            antisub: 1\n        },\n        Sonars: {\n            shelling: 0.75,\n            antisub: 1\n        },\n        SmallRadars: {\n            los: 1.25\n        },\n        LargeRadars: {\n            los: 1.4\n        },\n        Seaplanes: {},\n        SeaplaneRecons: {\n            los: 1.2\n        },\n        SeaplaneFighters: {\n            fighter: 0.2\n        },\n        SeaplaneBomber: {\n            // fighter: 0.2\n            los: 1.15\n        },\n        CarrierFighters: {\n            fighter: 0.2\n        },\n        DiveBombers: {\n            fighter: 0.25,\n            night: 1\n        },\n        // TorpedoBombers: {\n        //     shelling: 1,\n        //     night: 1\n        // },\n        CarrierRecons: {\n            los: 1.2\n        },\n        LandingCrafts: {\n            shelling: 1,\n            night: 1\n        },\n        Interceptors: {\n            fighter: 0.2\n        },\n\n        _10: {\n            shelling: ['multiplication', 0.2],\n            night: 1\n        },\n        _66: {\n            shelling: ['multiplication', 0.2],\n            night: 1\n            // aa\n            // aaFleet\n        },\n        _220: {\n            shelling: ['multiplication', 0.2],\n            night: 1\n            // aa\n            // aaFleet\n        },\n        _275: {\n            shelling: ['multiplication', 0.2],\n            night: 1\n            // aa\n            // aaFleet\n        },\n        // _247: {\n        //     _type: 'multiplication',\n        //     shelling: 0.3,\n        //     night: 0.3,\n        // },\n        _12: {\n            shelling: ['multiplication', 0.3],\n            night: ['multiplication', 0.3]\n        },\n        _234: {\n            shelling: ['multiplication', 0.3],\n            night: ['multiplication', 0.3]\n        }\n    };\n    // 获取改修加成对象\n    formula.getStarMultiplier = function (equipmentType, statType) {\n        // 如果 equipmentType 以 _ 开头，如 _123，则代表第 123 号装备，而非装备类型\n        if (!formula.starMultiper._init) {\n            var _loop = function _loop(i) {\n                if (_equipmentType[i] && _equipmentType[i].forEach) {\n                    _equipmentType[i].forEach(function (tid) {\n                        formula.starMultiper[tid] = formula.starMultiper[i];\n                    });\n                } else if (typeof _equipmentType[i] === 'number') {\n                    formula.starMultiper[_equipmentType[i]] = formula.starMultiper[i];\n                }\n            };\n\n            for (var i in formula.starMultiper) {\n                _loop(i);\n            }\n            formula.starMultiper._init = !0;\n        }\n        var bonus = formula.starMultiper[equipmentType] || {};\n        if (statType) return bonus[statType] || 0;\n        return bonus;\n    };\n    // 计算改修加成\n    formula.getStarBonus = function (equipment, stat, star) {\n        equipment = _equipment(equipment);\n\n        var _Object$assign = Object.assign({}, formula.getStarMultiplier(equipment.type), formula.starMultiper['_' + equipment.id]),\n            _Object$assign$stat = _Object$assign[stat],\n            bonus = _Object$assign$stat === undefined ? 0 : _Object$assign$stat;\n\n        var bonusType = 'sqrt';\n\n        if (Array.isArray(bonus)) {\n            bonusType = bonus[0];\n            bonus = bonus[1];\n        }\n\n        // const {\n        //     [stat]: bonus = 0,\n        //     _type: bonusType = 'sqrt'\n        // } = typeof formula.starMultiper[`_${equipment.id}`] === 'object'\n        //     ? formula.starMultiper[`_${equipment.id}`]\n        //     : formula.getStarMultiplier(equipment.type)\n        switch (bonusType) {\n            case 'sqrt':\n                {\n                    return bonus * Math.sqrt(star);\n                }\n            case 'multiplication':\n            case 'multiple':\n                {\n                    return bonus * star;\n                }\n            default:\n                {\n                    return 0;\n                }\n        }\n    };\n    // 飞行器熟练度对制空战力的加成\n    formula.getFighterPowerRankMultiper = function (equipment, rank /*, options = {}*/\n    ) {\n        // https://wikiwiki.jp/kancolle/艦載機熟練度\n\n        equipment = _equipment(equipment);\n\n        var rankInternal = [];\n        var typeValue = {};\n        // const {\n        //     isFromField = false\n        // } = options\n\n        rankInternal[0] = [0, 9];\n        rankInternal[1] = [10, 24];\n        rankInternal[2] = [25, 39];\n        rankInternal[3] = [40, 54];\n        rankInternal[4] = [55, 69];\n        rankInternal[5] = [70, 84];\n        rankInternal[6] = [85, 99];\n        rankInternal[7] = [100, 120];\n\n        typeValue.CarrierFighter = [0, 0, 2, 5, 9, 14, 14, 22];\n\n        typeValue.SeaplaneBomber = [0, 0, 1, 1, 1, 3, 3, 6];\n\n        /** @type {Number} 内部熟練ボーナス */\n        var rankBonus = rankInternal[rank];\n        /** @type {Number} 制空ボーナス */\n        var typeBonus = 0;\n\n        switch (equipment.type) {\n            case _equipmentType.CarrierFighter:\n            case _equipmentType.CarrierFighterNight:\n            case _equipmentType.Interceptor:\n            case _equipmentType.SeaplaneFighter:\n            case _equipmentType.LandBasedFighter:\n                typeBonus = typeValue.CarrierFighter[rank];\n                break;\n            case _equipmentType.SeaplaneBomber:\n                typeBonus = typeValue.SeaplaneBomber[rank];\n                break;\n        }\n\n        return {\n            min: Math.sqrt(rankBonus[0] / 10) + typeBonus,\n            max: Math.sqrt(rankBonus[1] / 10) + typeBonus\n        };\n    };\n    formula.calculate = function (type, ship, equipments_by_slot, star_by_slot, rank_by_slot, options) {\n        /**\r\n         * 计算\r\n         * @param {string} type - 计算类型\r\n         * @param {number || Ship} ship - 舰娘\r\n         * @param {array} equipments_by_slot - 每格装备ID/装备object\r\n         * @param {array} star_by_slot - 每格装备改修星级\r\n         * @param {array} rank_by_slot - 每格装备熟练度\r\n         * @param {object} options - 选项\r\n         */\n        if (!type || !ship) return 0;\n\n        if (!(ship instanceof Ship)) ship = KC.db.ships[ship];\n\n        var result = 0,\n            count = {\n            main: 0,\n            secondary: 0,\n            torpedo: 0,\n            torpedoLateModel: 0,\n            seaplane: 0,\n            apshell: 0,\n            radar: 0,\n            radarAA: 0,\n            radarSurface: 0,\n            submarineEquipment: 0,\n            carrierFighterNight: 0,\n            // 'diveBomberIwai': 0,\n            torpedoBomberNight: 0,\n            // 'torpedoBomberSwordfish': 0,\n            aviationPersonnelNight: 0,\n            surfaceShipPersonnel: 0\n        },\n            slots = _slots(ship.slot),\n\n        // , powerTorpedo = function (options) {\n        //     options = options || {}\n        //     let result = 0\n        //     if (formula.shipType.Carriers.indexOf(ship.type) > -1 && !options.isNight) {\n        //         return options.returnZero ? 0 : -1\n        //     } else {\n        //         result = ship.stat.torpedo_max || 0\n        //         slots.map(function (carry, index) {\n        //             if (equipments_by_slot[index]) {\n        //                 // result += (equipments_by_slot[index].type == _equipmentType.TorpedoBomber && !options.isNight)\n        //                 result += (_equipmentType.TorpedoBombers.indexOf(equipments_by_slot[index].type) > -1 && !options.isNight)\n        //                     ? 0\n        //                     : (equipments_by_slot[index].stat.torpedo || 0)\n\n        //                 // 改修加成\n        //                 if (star_by_slot[index] && !options.isNight) {\n        //                     result += Math.sqrt(star_by_slot[index]) * formula.getStarMultiplier(\n        //                         equipments_by_slot[index].type,\n        //                         'torpedo'\n        //                     )\n        //                 }\n        //             }\n        //         })\n        //         return result\n        //     }\n        //     //return (ship.stat.torpedo_max || 0)\n        // }\n        value = 0;\n\n        equipments_by_slot = equipments_by_slot.map(function (equipment) {\n            if (!equipment) return null;\n            if (equipment instanceof Equipment) return equipment;\n            return KC.db.equipments ? KC.db.equipments[equipment] : KC.db.items[equipment];\n        }) || [];\n        star_by_slot = star_by_slot || [];\n        rank_by_slot = rank_by_slot || [];\n        options = options || {};\n\n        equipments_by_slot.forEach(function (equipment) {\n            if (!equipment) return;\n            // 主炮\n            if (_equipmentType.MainGuns.indexOf(equipment.type) > -1) count.main += 1;\n            // 副炮\n            else if (_equipmentType.SecondaryGuns.indexOf(equipment.type) > -1) count.secondary += 1;\n                // 鱼雷\n                else if (_equipmentType.Torpedos.indexOf(equipment.type) > -1) {\n                        count.torpedo += 1;\n                        if (equipment.name.ja_jp.indexOf('後期型') > -1) count.torpedoLateModel += 1;\n                    }\n                    // 水上机\n                    else if (_equipmentType.Seaplanes.indexOf(equipment.type) > -1) count.seaplane += 1;\n                        // 穿甲弹\n                        else if (_equipmentType.APShells.indexOf(equipment.type) > -1) count.apshell += 1;\n                            // 电探/雷达\n                            else if (_equipmentType.Radars.indexOf(equipment.type) > -1) {\n                                    count.radar += 1;\n                                    if (equipment.stat.aa) count.radarAA += 1;\n                                    // else\n                                    if (equipment.stat.hit && equipment.stat.hit >= 3) count.radarSurface += 1;\n                                }\n                                // 潜艇装备\n                                else if (_equipmentType.SubmarineEquipment == equipment.type) count.submarineEquipment += 1;\n                                    // else if (_equipmentType.TorpedoBombers.indexOf(equipment.type) > -1) {\n                                    //     if (equipment.name.ja_jp.indexOf('Swordfish') > -1)\n                                    //         count.torpedoBomberSwordfish += 1\n                                    // }\n                                    // 夜间整备员\n                                    else if (_equipmentType.AviationPersonnels.indexOf(equipment.type) > -1) {\n                                            if (equipment.name.ja_jp.indexOf('夜間') > -1) count.aviationPersonnelNight += 1;\n                                        }\n                                        // else if (_equipmentType.DiveBombers.indexOf(equipment.type) > -1) {\n                                        //     if (equipment.name.ja_jp.indexOf('岩井') > -1)\n                                        //         count.diveBomberIwai += 1\n                                        // }\n                                        // 水上舰要员\n                                        else if (_equipmentType.SurfaceShipPersonnels.indexOf(equipment.type) > -1) count.surfaceShipPersonnel += 1;\n\n            // 夜间飞行器\n            if (equipment.type_ingame) {\n                // 夜间战斗机\n                if (equipment.type_ingame[3] === 45) count.carrierFighterNight += 1;\n                // 夜间轰炸机\n                else if (equipment.type_ingame[3] === 46) count.torpedoBomberNight += 1;\n            }\n        });\n\n        var bonus = calculateBonus(ship, equipments_by_slot, star_by_slot, rank_by_slot);\n\n        var powerTorpedo = function powerTorpedo(options) {\n            return formula.calcByShip.torpedoPower(ship, equipments_by_slot, star_by_slot, rank_by_slot, options, bonus);\n        };\n\n        switch (type) {\n            // 制空战力，装备须为战斗机类型 _equipmentType.Fighters\n            // 计算公式参考 http://bbs.ngacn.cc/read.php?tid=8680767\n            case 'fighterPower':\n                {\n                    value = 0;\n                    slots.map(function (carry, index) {\n                        if (equipments_by_slot[index] && _equipmentType.Fighters.indexOf(equipments_by_slot[index].type) > -1 && carry) {\n                            value = Math.sqrt(carry) * (equipments_by_slot[index].getStat('aa', ship) || 0);\n                            if (_equipmentType.CarrierFighters.includes(equipments_by_slot[index].type)) {\n                                switch (rank_by_slot[index]) {\n                                    case 1:\n                                    case '1':\n                                        value += 1;\n                                        break;\n                                    case 2:\n                                    case '2':\n                                        value += 4;\n                                        break;\n                                    case 3:\n                                    case '3':\n                                        value += 6;\n                                        break;\n                                    case 4:\n                                    case '4':\n                                        value += 11;\n                                        break;\n                                    case 5:\n                                    case '5':\n                                        value += 16;\n                                        break;\n                                    case 6:\n                                    case '6':\n                                        value += 17;\n                                        break;\n                                    case 7:\n                                    case '7':\n                                        value += 25;\n                                        break;\n                                }\n                            } else if (_equipmentType.Recons.indexOf(equipments_by_slot[index].type) == -1) {\n                                var max_per_slot = equipments_by_slot[index].type == _equipmentType.SeaplaneBomber ? 9 : 3;\n                                value += rank_by_slot[index] == 1 ? 1 : max_per_slot / 6 * (rank_by_slot[index] - 1);\n                            }\n                            result += Math.floor(value);\n                        }\n                    });\n                    return result;\n                    // return Math.floor(result)\n                    // break;\n                }\n\n            // 同时返回制空战力的上下限\n            // 返回值为Array\n            case 'fighterPower_v2':\n                {\n                    return formula.calcByShip.fighterPower_v2(ship, equipments_by_slot, star_by_slot, rank_by_slot);\n                    //break;\n                }\n\n            // 炮击威力，除潜艇外\n            case 'shelling':\n            case 'shellingDamage':\n                {\n                    if (formula.shipType.Submarines.indexOf(ship.type) > -1) {\n                        return '-';\n                    } else {\n                        result = formula.calcByShip.shellingPower(ship, equipments_by_slot, star_by_slot, rank_by_slot, {}, bonus);\n                        if (result && result > -1) return Math.floor(result); // + 5\n                        return '-';\n                    }\n                    //break;\n                }\n\n            // 雷击威力，航母除外\n            case 'torpedo':\n            case 'torpedoDamage':\n                {\n                    result = powerTorpedo();\n                    if (result && result > -1) return Math.floor(result); // + 5\n                    return '-';\n                    //break;\n                }\n\n            // 夜战模式 & 伤害力\n            case 'nightBattle':\n                {\n                    var nightPower = formula.calcByShip.nightPower(ship, equipments_by_slot, star_by_slot, rank_by_slot, {}, count, bonus);\n                    return nightPower.damage <= 0 ? '-' : nightPower.value;\n                    //break;\n                }\n\n            // 命中总和\n            case 'addHit':\n                {\n                    slots.map(function (carry, index) {\n                        if (equipments_by_slot[index]) result += equipments_by_slot[index].getStat('hit', ship) || 0;\n                    });\n                    result += bonus.hit || 0;\n                    return result >= 0 ? '+' + result : result;\n                    //break;\n                }\n\n            // 装甲总和\n            case 'addArmor':\n                {\n                    slots.map(function (carry, index) {\n                        if (equipments_by_slot[index]) result += equipments_by_slot[index].getStat('armor', ship) || 0;\n                    });\n                    return result + (bonus.armor || 0);\n                    //break;\n                }\n\n            // 回避总和\n            case 'addEvasion':\n                {\n                    slots.map(function (carry, index) {\n                        if (equipments_by_slot[index]) result += equipments_by_slot[index].getStat('evasion', ship) || 0;\n                    });\n                    return result + (bonus.evasion || 0);\n                    //break;\n                }\n\n            // 索敌能力\n            case 'losPower':\n                return formula.calcByShip.losPower(ship, equipments_by_slot, star_by_slot, rank_by_slot, options);\n            //break;\n            default:\n                return formula.calcByShip[type](ship, equipments_by_slot, star_by_slot, rank_by_slot, options, bonus);\n            //break;\n        }\n\n        //return '-'\n    };\n    // 计算快捷方式\n    formula.shellingDamage = function (ship, equipments_by_slot, star_by_slot, rank_by_slot) {\n        return this.calculate('shellingDamage', ship, equipments_by_slot, star_by_slot, rank_by_slot);\n    };\n    formula.torpedoDamage = function (ship, equipments_by_slot, star_by_slot, rank_by_slot) {\n        return this.calculate('torpedoDamage', ship, equipments_by_slot, star_by_slot, rank_by_slot);\n    };\n    formula.fighterPower = function (ship, equipments_by_slot, star_by_slot, rank_by_slot) {\n        return this.calculate('fighterPower', ship, equipments_by_slot, star_by_slot, rank_by_slot);\n    };\n    formula.fighterPower_v2 = function (ship, equipments_by_slot, star_by_slot, rank_by_slot) {\n        return this.calculate('fighterPower_v2', ship, equipments_by_slot, star_by_slot, rank_by_slot);\n    };\n    formula.nightBattle = function (ship, equipments_by_slot, star_by_slot, rank_by_slot) {\n        return this.calculate('nightBattle', ship, equipments_by_slot, star_by_slot, rank_by_slot);\n    };\n    formula.addHit = function (ship, equipments_by_slot, star_by_slot, rank_by_slot) {\n        return this.calculate('addHit', ship, equipments_by_slot, star_by_slot, rank_by_slot);\n    };\n    formula.addArmor = function (ship, equipments_by_slot, star_by_slot, rank_by_slot) {\n        return this.calculate('addArmor', ship, equipments_by_slot, star_by_slot, rank_by_slot);\n    };\n    formula.addEvasion = function (ship, equipments_by_slot, star_by_slot, rank_by_slot) {\n        return this.calculate('addEvasion', ship, equipments_by_slot, star_by_slot, rank_by_slot);\n    };\n    formula.losPower = function (ship, equipments_by_slot, star_by_slot, rank_by_slot, options) {\n        return this.calculate('losPower', ship, equipments_by_slot, star_by_slot, rank_by_slot, options);\n    };\n    // Formulas\n    formula.calc.losPower = function (data) {\n        // http://biikame.hatenablog.com/entry/2014/11/14/224925\n\n        var calc = function calc(x) {\n            if (typeof x['(Intercept)'] == 'undefined') x['(Intercept)'] = 1;\n            x.hqLv = Math.ceil(x.hqLv / 5) * 5;\n            var x_estimate = {};\n            var y_estimate = 0;\n            var x_std_error = {};\n            var y_std_error = 0;\n            keys.forEach(function (key) {\n                var estimate = x[key] * estimate_coefficients[key];\n                x_estimate[key] = estimate;\n                y_estimate += estimate;\n                x_std_error[key] = x[key] * std_error_coefficients[key];\n            });\n            keys.forEach(function (key) {\n                keys.forEach(function (key2) {\n                    y_std_error += x_std_error[key] * x_std_error[key2] * correlation[key][key2];\n                });\n            });\n            return {\n                x_estimate: x_estimate,\n                y_estimate: y_estimate,\n                x_std_error: x_std_error,\n                y_std_error: y_std_error\n            };\n        };\n        var keys = ['(Intercept)', 'DiveBombers', 'TorpedoBombers', 'CarrierRecons', 'SeaplaneRecons', 'SeaplaneBombers', 'SmallRadars', 'LargeRadars', 'Searchlights', 'statLos', 'hqLv'];\n        var estimate_coefficients = {\n            '(Intercept)': 0,\n            DiveBombers: 1.03745043134563,\n            TorpedoBombers: 1.3679056374142,\n            CarrierRecons: 1.65940512636315,\n            SeaplaneRecons: 2,\n            SeaplaneBombers: 1.77886368594467,\n            SmallRadars: 1.0045778494921,\n            LargeRadars: 0.990738063979571,\n            Searchlights: 0.906965144360512,\n            statLos: 1.6841895400986,\n            hqLv: -0.614246711531445\n        };\n        var std_error_coefficients = {\n            '(Intercept)': 4.66445565766347,\n            DiveBombers: 0.0965028505325845,\n            TorpedoBombers: 0.108636184978525,\n            CarrierRecons: 0.0976055279516298,\n            SeaplaneRecons: 0.0866229392463539,\n            SeaplaneBombers: 0.0917722496848294,\n            SmallRadars: 0.0492773648320346,\n            LargeRadars: 0.0491221486053861,\n            Searchlights: 0.0658283797225724,\n            statLos: 0.0781594211213618,\n            hqLv: 0.0369222352426548\n        };\n        var correlation = {\n            '(Intercept)': {\n                '(Intercept)': 1,\n                DiveBombers: -0.147020064768061,\n                TorpedoBombers: -0.379236131621529,\n                CarrierRecons: -0.572858669501918,\n                SeaplaneRecons: -0.733913857017495,\n                SeaplaneBombers: -0.642621825152428,\n                SmallRadars: -0.674829588068364,\n                LargeRadars: -0.707418111752863,\n                Searchlights: -0.502304601556193,\n                statLos: -0.737374218573832,\n                hqLv: -0.05071933950163\n            },\n            DiveBombers: {\n                '(Intercept)': -0.147020064768061,\n                DiveBombers: 1,\n                TorpedoBombers: 0.288506347076736,\n                CarrierRecons: 0.365820372770994,\n                SeaplaneRecons: 0.425744409856409,\n                SeaplaneBombers: 0.417783698791503,\n                SmallRadars: 0.409046013184429,\n                LargeRadars: 0.413855653833994,\n                Searchlights: 0.308730607324667,\n                statLos: 0.317984916914851,\n                hqLv: -0.386740224500626\n            },\n            TorpedoBombers: {\n                '(Intercept)': -0.379236131621529,\n                DiveBombers: 0.288506347076736,\n                TorpedoBombers: 1,\n                CarrierRecons: 0.482215071254241,\n                SeaplaneRecons: 0.584455876852325,\n                SeaplaneBombers: 0.558515133495825,\n                SmallRadars: 0.547260012897553,\n                LargeRadars: 0.560437619378443,\n                Searchlights: 0.437934879351188,\n                statLos: 0.533934507932748,\n                hqLv: -0.405349979885748\n            },\n            CarrierRecons: {\n                '(Intercept)': -0.572858669501918,\n                DiveBombers: 0.365820372770994,\n                TorpedoBombers: 0.482215071254241,\n                CarrierRecons: 1,\n                SeaplaneRecons: 0.804494553748065,\n                SeaplaneBombers: 0.75671307047535,\n                SmallRadars: 0.748420581669228,\n                LargeRadars: 0.767980338133817,\n                Searchlights: 0.589651513349878,\n                statLos: 0.743851348255527,\n                hqLv: -0.503544281376776\n            },\n            SeaplaneRecons: {\n                '(Intercept)': -0.733913857017495,\n                DiveBombers: 0.425744409856409,\n                TorpedoBombers: 0.584455876852325,\n                CarrierRecons: 0.804494553748065,\n                SeaplaneRecons: 1,\n                SeaplaneBombers: 0.932444440578382,\n                SmallRadars: 0.923988080549326,\n                LargeRadars: 0.94904944359066,\n                Searchlights: 0.727912987329348,\n                statLos: 0.944434077970518,\n                hqLv: -0.614921413821462\n            },\n            SeaplaneBombers: {\n                '(Intercept)': -0.642621825152428,\n                DiveBombers: 0.417783698791503,\n                TorpedoBombers: 0.558515133495825,\n                CarrierRecons: 0.75671307047535,\n                SeaplaneRecons: 0.932444440578382,\n                SeaplaneBombers: 1,\n                SmallRadars: 0.864289865445084,\n                LargeRadars: 0.886872388674911,\n                Searchlights: 0.68310647756898,\n                statLos: 0.88122333327317,\n                hqLv: -0.624797255805045\n            },\n            SmallRadars: {\n                '(Intercept)': -0.674829588068364,\n                DiveBombers: 0.409046013184429,\n                TorpedoBombers: 0.547260012897553,\n                CarrierRecons: 0.748420581669228,\n                SeaplaneRecons: 0.923988080549326,\n                SeaplaneBombers: 0.864289865445084,\n                SmallRadars: 1,\n                LargeRadars: 0.872011318623459,\n                Searchlights: 0.671926570242336,\n                statLos: 0.857213501657084,\n                hqLv: -0.560018086758868\n            },\n            LargeRadars: {\n                '(Intercept)': -0.707418111752863,\n                DiveBombers: 0.413855653833994,\n                TorpedoBombers: 0.560437619378443,\n                CarrierRecons: 0.767980338133817,\n                SeaplaneRecons: 0.94904944359066,\n                SeaplaneBombers: 0.886872388674911,\n                SmallRadars: 0.872011318623459,\n                LargeRadars: 1,\n                Searchlights: 0.690102027588321,\n                statLos: 0.883771367337743,\n                hqLv: -0.561336967269448\n            },\n            Searchlights: {\n                '(Intercept)': -0.502304601556193,\n                DiveBombers: 0.308730607324667,\n                TorpedoBombers: 0.437934879351188,\n                CarrierRecons: 0.589651513349878,\n                SeaplaneRecons: 0.727912987329348,\n                SeaplaneBombers: 0.68310647756898,\n                SmallRadars: 0.671926570242336,\n                LargeRadars: 0.690102027588321,\n                Searchlights: 1,\n                statLos: 0.723228553177704,\n                hqLv: -0.518427865593732\n            },\n            statLos: {\n                '(Intercept)': -0.737374218573832,\n                DiveBombers: 0.317984916914851,\n                TorpedoBombers: 0.533934507932748,\n                CarrierRecons: 0.743851348255527,\n                SeaplaneRecons: 0.944434077970518,\n                SeaplaneBombers: 0.88122333327317,\n                SmallRadars: 0.857213501657084,\n                LargeRadars: 0.883771367337743,\n                Searchlights: 0.723228553177704,\n                statLos: 1,\n                hqLv: -0.620804120587684\n            },\n            hqLv: {\n                '(Intercept)': -0.05071933950163,\n                DiveBombers: -0.386740224500626,\n                TorpedoBombers: -0.405349979885748,\n                CarrierRecons: -0.503544281376776,\n                SeaplaneRecons: -0.614921413821462,\n                SeaplaneBombers: -0.624797255805045,\n                SmallRadars: -0.560018086758868,\n                LargeRadars: -0.561336967269448,\n                Searchlights: -0.518427865593732,\n                statLos: -0.620804120587684,\n                hqLv: 1\n            }\n        };\n\n        var x = {\n            DiveBombers: 0,\n            TorpedoBombers: 0,\n            CarrierRecons: 0,\n            SeaplaneRecons: 0,\n            SeaplaneBombers: 0,\n            SmallRadars: 0,\n            LargeRadars: 0,\n            Searchlights: 0,\n            statLos: 1,\n            hqLv: 1\n        };\n\n        for (var i in data) {\n            x[i] = data[i];\n        }\n\n        return calc(x);\n        //var result = calc(x);\n        //var score = result.y_estimate.toFixed(1) + ' ± ' + result.y_std_error.toFixed(1);\n    };\n    formula.calc.los33 = function (data) {\n        if (!data) return;\n        /* data {\r\n            hq: 90,\r\n            equipments: [\r\n                {\r\n                    id: 123,\r\n                    star: 4,\r\n                    rank: 7\r\n                }\r\n            ],\r\n            ships: [\r\n                {\r\n                    id: 123,\r\n                    lv: 90\r\n                }\r\n            ]\r\n        }\r\n         */\n\n        var totalEquipmentValue = 0,\n            totalShipValue = 0;\n\n        var equipmentTypeValues = {\n            TorpedoBombers: 0.8,\n            CarrierRecons: 1,\n\n            ReconSeaplane: 1.2,\n            ReconSeaplaneNight: 1.2,\n            SeaplaneBomber: 1.1\n        };\n        Object.defineProperty(equipmentTypeValues, 'default', {\n            value: 0.6,\n            enumerable: !1,\n            configurable: !1,\n            writable: !1\n        });\n\n        data.equipments.forEach(function (o) {\n            if (o.id) {\n                var equipment = _equipment(o.id);\n\n                if (equipment.stat.los) {\n                    var typeValue = equipmentTypeValues.default;\n                    var star = o.star || 0;\n\n                    for (var types in equipmentTypeValues) {\n                        var typesForCheck = [];\n\n                        if (Array.isArray(_equipmentType[types])) typesForCheck = _equipmentType[types];else typesForCheck = [_equipmentType[types]];\n\n                        if (typesForCheck.indexOf(equipment.type) > -1) typeValue = equipmentTypeValues[types];\n                    }\n\n                    totalEquipmentValue += typeValue * (equipment.stat.los + formula.getStarBonus(equipment, 'los', star));\n                    // + formula.getStarMultiplier(equipment.type, 'los') * Math.sqrt(star)\n                }\n            }\n        });\n\n        data.ships.forEach(function (o) {\n            var ship = _ship(o.id);\n            var shipLOS = ship.getAttribute('los', Math.max(o.lv || 1, ship.getMinLv()));\n\n            totalShipValue += Math.sqrt(Math.max(shipLOS, 1));\n        });\n\n        return totalEquipmentValue + totalShipValue - Math.ceil(data.hq * 0.4) + 2 * (6 - data.ships.length);\n    };\n    formula.calc.TP = function (count) {\n        /* count\r\n         * {\r\n         * \t\tship: {\r\n         * \t\t\tdd\r\n         * \t\t\tcl\r\n         * \t\t\tct\r\n         * \t\t\tcav\r\n         * \t\t\tbbv\r\n         * \t\t\tav\r\n         * \t\t\tssv\r\n         * \t\t\tlha\r\n         * \t\t\tao\r\n         * \t\t\tas\r\n         * \t\t},\r\n         * \t\tequipment: {\r\n         * \t\t\t68\t// landing craft\r\n         * \t\t\t75  // canister\r\n         * \t\t\t166  // landing craft (force)\r\n         * \t\t}\r\n         * }\r\n         */\n        count = count || {};\n        var result = 0,\n            ship = count.ship || {},\n            equipment = count.equipment || {};\n\n        for (var i in ship) {\n            var multiper = 0;\n            switch (i) {\n                case 1:\n                case '1':\n                case 19:\n                case '19':\n                case 'dd':\n                    multiper = 5;\n                    break;\n\n                case 2:\n                case '2':\n                case 28:\n                case '28':\n                case 34:\n                case '34':\n                case 'cl':\n                    multiper = 2;\n                    break;\n\n                case 21:\n                case '21':\n                case 'ct':\n                    multiper = 6;\n                    break;\n\n                case 5:\n                case '5':\n                case 'cav':\n                    multiper = 4;\n                    break;\n\n                case 8:\n                case '8':\n                case 33:\n                case '33':\n                case 'bbv':\n                    multiper = 7;\n                    break;\n\n                case 12:\n                case '12':\n                case 24:\n                case '24':\n                case 'av':\n                    multiper = 9.5;\n                    break;\n\n                case 14:\n                case '14':\n                case 'ssv':\n                    multiper = 1;\n                    break;\n\n                case 15:\n                case '15':\n                case 'lha':\n                    multiper = 12;\n                    break;\n\n                case 29:\n                case '29':\n                case 'ao':\n                    multiper = 15;\n                    break;\n\n                case 17:\n                case '17':\n                case 'as':\n                    multiper = 7;\n                    break;\n            }\n            result += multiper * (parseInt(ship[i]) || 0);\n        }\n\n        for (var _i in equipment) {\n            var _multiper = 0,\n                id = parseInt(_i),\n                data = void 0;\n            switch (id) {\n                // 戦闘糧食\n                case 145:\n                    _multiper = 1;\n                    break;\n                // 秋刀魚の缶詰\n                case 150:\n                    _multiper = 1;\n                    break;\n                // canister\n                case 75:\n                    _multiper = 5;\n                    break;\n                // landing craft\n                case 68:\n                    _multiper = 8;\n                    break;\n                // landing craft (large)\n                case 193:\n                    _multiper = 8;\n                    break;\n                // landing craft (force)\n                case 166:\n                    _multiper = 8;\n                    break;\n                // 特二式内火艇\n                case 167:\n                    _multiper = 2;\n                    break;\n                default:\n                    // 瑞云 & 晴岚\n                    data = _equipment(id);\n                    switch (data.type) {\n                        // case formula.equipmentType.SeaplaneBomber:\n                        //     if( data.name.ja_jp.indexOf('瑞雲') > -1 )\n                        //         multiper = 2\n                        //     else if( data.name.ja_jp.indexOf('晴嵐') > -1 )\n                        //         multiper = 4\n                        //     break;\n                        case formula.equipmentType.LandingCraft:\n                            if (data.name.ja_jp.indexOf('大発動艇') > -1) _multiper = 8;\n                            break;\n                    }\n            }\n            result += _multiper * (parseInt(equipment[_i]) || 0);\n        }\n\n        return result;\n    };\n    formula.calc.fighterPower = function (equipment, carry, rank, star) {\n        var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};\n\n        // http://bbs.ngacn.cc/read.php?tid=8680767\n        // http://ja.kancolle.wikia.com/wiki/%E8%89%A6%E8%BC%89%E6%A9%9F%E7%86%9F%E7%B7%B4%E5%BA%A6\n        // https://wikiwiki.jp/kancolle/航空戦\n        // https://wikiwiki.jp/kancolle/艦載機熟練度\n        // https://wikiwiki.jp/kancolle/基地航空隊\n\n        if (!equipment) return [0, 0];\n\n        equipment = equipment instanceof Equipment ? equipment : KC.db.equipments ? KC.db.equipments[equipment] : KC.db.items[equipment];\n        carry = carry || 0;\n        rank = rank || 0;\n        star = star || 0;\n\n        var _options$isFromField = options.isFromField,\n            isFromField = _options$isFromField === undefined ? !1 : _options$isFromField;\n\n\n        var results = [0, 0];\n\n        if (carry && (isFromField || _equipmentType.Fighters.indexOf(equipment.type) > -1)) {\n            // Math.floor(Math.sqrt(carry) * (equipment.stat.aa || 0) + Math.sqrt( rankInternal / 10 ) + typeValue)\n            // if( star ) console.log( equipment._name, '★+' + star, star * formula.getStarMultiplier( equipment.type, 'fighter' ) )\n            var equipmentStatAA = (equipment.stat.aa || 0) + (_equipmentType.isInterceptor(equipment) ? equipment.stat.evasion * 1.5 : 0) + star * formula.getStarMultiplier(equipment.type, 'fighter');\n            var baseValue = equipmentStatAA * Math.sqrt(carry);\n\n            var _formula$getFighterPo = formula.getFighterPowerRankMultiper(equipment, rank),\n                bonusMin = _formula$getFighterPo.min,\n                bonusMax = _formula$getFighterPo.max;\n\n            results[0] += Math.floor(baseValue + bonusMin);\n            results[1] += Math.floor(baseValue + bonusMax);\n        }\n\n        return results;\n    };\n    formula.calc.fighterPowerAA = function (equipment, carry, rank, star) {\n        if (!equipment) return [0, 0];\n\n        equipment = _equipment(equipment);\n        carry = carry || 0;\n        rank = rank || 0;\n        star = star || 0;\n\n        // http://wikiwiki.jp/kancolle/?%B4%F0%C3%CF%B9%D2%B6%F5%C2%E2#AirSupremacy\n\n        var results = [0, 0];\n\n        if (carry) {\n            var statAA = (equipment.stat.aa || 0) + (_equipmentType.isInterceptor(equipment) ? equipment.stat.evasion : 0) + (_equipmentType.isInterceptor(equipment) ? equipment.stat.hit * 2 : 0) + star * formula.getStarMultiplier(equipment.type, 'fighter'),\n                base = statAA * Math.sqrt(carry),\n                rankBonus = formula.getFighterPowerRankMultiper(equipment, rank, {\n                isAA: !0\n            });\n\n            results[0] += Math.floor(base + rankBonus.min);\n            results[1] += Math.floor(base + rankBonus.max);\n        }\n\n        return results;\n    };\n    // Calculate by Ship\n    formula.calcByShip.shellingPower = function (ship, equipments_by_slot, star_by_slot, rank_by_slot, options, bonus) {\n        options = options || {};\n        bonus = bonus || calculateBonus(ship, equipments_by_slot, star_by_slot, rank_by_slot);\n\n        var result = 0,\n            isCV = !1,\n            slots = _slots(ship.slot);\n\n        // 检查是否为航母攻击模式\n        if (formula.shipType.Carriers.indexOf(ship.type) > -1) {\n            isCV = !0;\n        } else if (![33].includes(ship.type)) {\n            // 如果为BBV，判断为非航母模式\n\n            //equipments_by_slot.forEach(function(equipment){\n            //\tif( equipment && !isCV && _equipmentType.CarrierBased.indexOf( equipment.type ) > -1 )\n            //\t\tisCV = true\n            //})\n\n            // 如果有舰载机，判断为航母模式\n            equipments_by_slot.some(function (equipment) {\n                if (equipment && !isCV && _equipmentType.CarrierBased.indexOf(equipment.type) > -1) {\n                    isCV = !0;\n                    return !0;\n                }\n            });\n        }\n\n        if (isCV && !options.isNight) {\n            // 航母攻击模式\n            var torpedoDamage = 0,\n                bombDamage = 0;\n            slots.map(function (carry, index) {\n                if (equipments_by_slot[index]) {\n                    var equipment = equipments_by_slot[index];\n                    // result += (equipment.stat.fire * 1.5) || 0\n                    result += equipment.getStat('fire', ship) * 1.5 || 0;\n\n                    // if (equipment.type == _equipmentType.TorpedoBomber)\n                    if (_equipmentType.TorpedoBombers.indexOf(equipment.type) > -1)\n                        // torpedoDamage += equipment.stat.torpedo || 0\n                        torpedoDamage += equipment.getStat('torpedo', ship) || 0;\n\n                    //if( equipment.type == _equipmentType.DiveBomber )\n                    // bombDamage += equipment.stat.bomb || 0\n                    bombDamage += equipment.getStat('bomb', ship) || 0;\n\n                    if (_equipmentType.SecondaryGuns.indexOf(equipment.type) > -1) result += Math.sqrt((star_by_slot[index] || 0) * 1.5);\n                }\n            });\n            if (!torpedoDamage && !bombDamage) return -1;else result += Math.floor(1.5 * (Math.floor(bombDamage * 1.3) + torpedoDamage + ship.stat.fire_max + (bonus.fire || 0))) + 50;\n            return result;\n        } else {\n            // 其他舰种\n            result = ship.stat.fire_max || 0;\n\n            // 特定种类装备数量，仅在满足对特定条件时才会纳入数量统计\n            var count = {\n                CLMainGunNaval: 0, // 轻巡系主炮（单装炮）\n                CLMainGunTwin: 0, // 轻巡系主炮（连装炮）\n                ItalianCAMainGun: 0 // 意大利重巡主炮（仅对意大利重巡洋舰生效）\n            };\n            slots.map(function (carry, index) {\n                if (equipments_by_slot[index]) {\n                    var equipment = equipments_by_slot[index];\n                    // result += equipment.stat.fire || 0\n                    result += equipment.getStat('fire', ship) || 0;\n\n                    // 轻巡系主炮加成\n                    if (formula.shipType.LightCruisers.indexOf(ship.type) > -1 && !equipment.name.ja_jp.includes('Bofors')) {\n                        ['14cm単装砲', '15.2cm単装砲'].forEach(function (name) {\n                            // console.log(\n                            //     name,\n                            //     equipment.name.ja_jp,\n                            //     equipment.name.ja_jp.includes(name)\n                            // );\n                            if (equipment.name.ja_jp.includes(name)) count.CLMainGunNaval += 1;\n                        });\n                        ['14cm連装砲', '15.2cm連装砲'].forEach(function (name) {\n                            if (equipment.name.ja_jp.includes(name)) count.CLMainGunTwin += 1;\n                        });\n                    }\n\n                    // 意大利重巡主炮加成\n                    if (ship._navy === 'rm') {\n                        // console.log(ship, equipment)\n                        if (equipment.name.ja_jp.includes('203mm/53')) count.ItalianCAMainGun += 1;\n                    }\n\n                    // 改修加成\n                    if (star_by_slot[index] && !options.isNight) {\n                        /*\r\n                        console.log(\r\n                            equipments_by_slot[index]._name,\r\n                            '★+' + star_by_slot[index],\r\n                            formula.getStarMultiplier(\r\n                                equipments_by_slot[index].type,\r\n                                options.isNight ? 'night' : 'shelling'\r\n                            ),\r\n                            Math.sqrt(star_by_slot[index]) * formula.getStarMultiplier(\r\n                                equipments_by_slot[index].type,\r\n                                options.isNight ? 'night' : 'shelling'\r\n                            ),\r\n                            options.isNight ? '夜战' : '昼战'\r\n                        )\r\n                        */\n                        result += formula.getStarBonus(equipment, 'shelling', star_by_slot[index]);\n                        // result += Math.sqrt(star_by_slot[index]) * formula.getStarMultiplier(\n                        //     equipment.type,\n                        //     'shelling'\n                        // )\n                    }\n                }\n            });\n\n            // console.log(count)\n\n            // 加成\n            var thisBonus = 0 +\n            // 轻巡系主炮加成\n            2 * Math.sqrt(count.CLMainGunTwin) + Math.sqrt(count.CLMainGunNaval) +\n            // 意大利重巡主炮加成（仅对意大利重巡洋舰生效）\n            Math.sqrt(count.ItalianCAMainGun) + (bonus.fire || 0);\n\n            return result + thisBonus;\n        }\n        //return (ship.stat.fire_max || 0)\n    };\n    formula.calcByShip.torpedoPower = function (ship, equipments_by_slot, star_by_slot, rank_by_slot, options, bonus) {\n        options = options || {};\n        bonus = bonus || calculateBonus(ship, equipments_by_slot, star_by_slot, rank_by_slot);\n\n        var result = 0;\n        var slots = _slots(ship.slot);\n\n        if (formula.shipType.Carriers.indexOf(ship.type) > -1 && !options.isNight) {\n            return options.returnZero ? 0 : -1;\n        } else {\n            result = (ship.stat.torpedo_max || 0) + (bonus.torpedo || 0);\n            slots.map(function (carry, index) {\n                if (equipments_by_slot[index]) {\n                    var equipment = equipments_by_slot[index];\n                    // result += (equipment.type == _equipmentType.TorpedoBomber && !options.isNight)\n                    result += _equipmentType.TorpedoBombers.indexOf(equipment.type) > -1 && !options.isNight ? 0 : equipment.getStat('torpedo', ship) || 0;\n\n                    // 改修加成\n                    if (star_by_slot[index] && !options.isNight) {\n                        result += formula.getStarBonus(equipment, 'torpedo', star_by_slot[index]);\n                        // result += Math.sqrt(star_by_slot[index]) * formula.getStarMultiplier(\n                        //     equipment.type,\n                        //     'torpedo'\n                        // )\n                    }\n                }\n            });\n            return result;\n        }\n    };\n    formula.calcByShip.nightPower = function (ship, equipments_by_slot, star_by_slot, rank_by_slot, options, count, bonus) {\n        options = options || {};\n        bonus = bonus || calculateBonus(ship, equipments_by_slot, star_by_slot, rank_by_slot);\n\n        var result = {\n            // value: ''\n            // type: undefined,\n            damage: 0\n        };\n\n        // 改修加成\n        var starBonus = 0;\n        var slots = _slots(ship.slot);\n\n        // 航空夜战\n        // http://bbs.ngacn.cc/read.php?tid=12445064\n        // http://bbs.ngacn.cc/read.php?tid=12590487\n        if ([9, // 轻型航母\n        10, // 正规航母\n        11, // 装甲航母\n        30, // 攻击型轻航母\n        32 // 特设航母\n        ].includes(ship.type) && (count.aviationPersonnelNight || ship.getCapability('count_as_night_operation_aviation_personnel')) && (count.carrierFighterNight >= 1 || count.torpedoBomberNight >= 1)) {\n            Object.assign(result, __webpack_require__(/*! ./calculate/night-power/cv-assult */ \"./src/calculate/night-power/cv-assult.js\")({\n                ship: ship,\n                equipments: equipments_by_slot,\n                equipmentStars: star_by_slot,\n                equipmentRanks: rank_by_slot,\n                bonus: bonus,\n                count: count\n            }));\n        }\n\n        // Ark Royal：剑鱼夜战\n        else if (ship.getCapability('participate_night_battle_when_equip_swordfish')) {\n                result.damage += ship.stat.fire_max + (bonus.fire || 0) + ship.stat.torpedo_max + (bonus.torpedo || 0);\n                slots.forEach(function (carry, index) {\n                    var equipment = equipments_by_slot[index];\n                    if (!equipments_by_slot[index]) return;\n                    if (_equipmentType.TorpedoBombers.indexOf(equipment.type) > -1) {\n                        if (equipment.name.ja_jp.indexOf('Swordfish') > -1) {\n                            // result.damage += equipment.stat.fire + equipment.stat.torpedo\n                            result.damage += equipment.getStat('fire', ship) + equipment.getStat('torpedo', ship);\n                        }\n                    }\n                });\n                result.type = '通常';\n                result.damage = Math.floor(result.damage);\n                result.hit = 1;\n            }\n\n            // Base rule: If a ships has either Fire or Torpedo stat on level 1, she can participate night battle\n            else if (ship.stat.fire + ship.stat.torpedo <= 0)\n                    // if (!ship.additional_night_shelling && formula.shipType.Carriers.indexOf(ship.type) > -1) {\n                    // 航母没有夜战\n                    return {\n                        damage: 0\n                    };\n                    // 其他夜战方式\n                else {\n                        var addCI = function addCI(type, damage, hit) {\n                            damage = Math.floor(damage);\n                            hit = hit || 1;\n\n                            if (_typeof(result.ciAvailable[type]) === 'object') {\n                                if (damage * hit > result.ciAvailable[type].damage * result.ciAvailable[type].hit || damage * hit === result.ciAvailable[type].damage * result.ciAvailable[type].hit && hit > result.ciAvailable[type].hit) {\n                                    result.ciAvailable[type] = {\n                                        damage: damage,\n                                        hit: hit\n                                    };\n                                }\n                            } else {\n                                result.ciAvailable[type] = {\n                                    damage: damage,\n                                    hit: hit\n                                };\n                            }\n                        };\n                        /*\r\n                        console.log(\r\n                            '夜',\r\n                            formula.calcByShip.shellingPower(ship, equipments_by_slot, star_by_slot, rank_by_slot, {isNight: true}),\r\n                            powerTorpedo({isNight: true, returnZero: true}),\r\n                            result.damage\r\n                        )\r\n                        */\n                        // http://wikiwiki.jp/kancolle/?%C0%EF%C6%AE%A4%CB%A4%C4%A4%A4%A4%C6#NightBattle\n                        // console.log(\n                        //     count,\n                        //     formula.shipType.Submarines.indexOf(ship.type)\n                        // )\n\n                        // 标准\n\n\n                        var equipmentCount = {};\n                        slots.forEach(function (carry, index) {\n                            if (!equipments_by_slot[index]) return;\n\n                            if (star_by_slot[index]) {\n                                starBonus += formula.getStarBonus(equipments_by_slot[index], 'night', star_by_slot[index]);\n                                // starBonus += Math.sqrt(star_by_slot[index]) * formula.getStarMultiplier(\n                                //     equipments_by_slot[index].type,\n                                //     'night'\n                                // )\n                            }\n\n                            if (!equipments_by_slot[index]) return;\n                            var equipment = equipments_by_slot[index];\n                            if (!equipmentCount[equipment.id]) equipmentCount[equipment.id] = 1;else equipmentCount[equipment.id]++;\n                        });\n\n                        //console.log(count)\n                        delete result.damage;\n                        result.ciAvailable = {};\n\n                        var baseDamage = formula.calcByShip.shellingPower(ship, equipments_by_slot, star_by_slot, rank_by_slot, {\n                            isNight: !0\n                        }, bonus) + formula.calcByShip.torpedoPower(ship, equipments_by_slot, star_by_slot, rank_by_slot, {\n                            isNight: !0,\n                            returnZero: !0\n                        }, bonus) + starBonus + (bonus.nightExtra || 0);\n                        if (count.torpedo >= 2) addCI('雷击CI', baseDamage * 1.5, 2);\n                        if (count.main >= 3) addCI('炮击CI', baseDamage * 2, 1);\n                        if (count.main === 2 && count.secondary >= 1) addCI('炮击CI', baseDamage * 1.75, 1);\n                        if (count.main >= 1 && count.torpedo === 1) addCI('炮雷CI', baseDamage * 1.3, 1);\n\n                        // 潜艇专用\n                        if (formula.shipType.Submarines.indexOf(ship.type) > -1) {\n                            if (count.torpedoLateModel >= 1 && count.submarineEquipment >= 1) addCI('雷击CI', baseDamage * 1.75, 2);\n                            if (count.torpedoLateModel >= 2) addCI('雷击CI', baseDamage * 1.6, 2);\n                        }\n\n                        // 驱逐舰专用\n                        else if (formula.shipType.Destroyers.indexOf(ship.type) > -1) {\n                                // [267] 12.7cm連装砲D型改二\n                                // [366] 12.7cm連装砲D型改三\n                                var countDTypeGun = (equipmentCount[267] || 0) + (equipmentCount[366] || 0);\n                                var extraMultiplier = 1;\n                                if (countDTypeGun === 1) extraMultiplier *= 1.25;else if (countDTypeGun > 1) extraMultiplier *= 1.4;\n                                if (equipmentCount[366]) extraMultiplier *= 1.05;\n\n                                // 鱼雷+水上电探+瞭望员\n                                if (count.torpedo >= 1 && count.radarSurface >= 1 && count.surfaceShipPersonnel >= 1) {\n                                    addCI('电探CI', baseDamage * 1.2 * extraMultiplier, 1);\n                                }\n\n                                // 主炮+鱼雷+水上电探\n                                if (count.torpedo >= 1 && count.radarSurface >= 1 && count.main >= 1) {\n                                    // 覆盖 炮雷CI\n                                    // delete result.ciAvailable['炮雷CI'];\n                                    addCI('电雷CI', baseDamage * 1.3 * extraMultiplier, 1);\n                                }\n                            }\n\n                        // 没有匹配任何 CI\n                        if (Object.keys(result.ciAvailable).length === 0) {\n                            delete result.ciAvailable;\n\n                            // 标准连击\n                            if (count.main === 2 && count.secondary <= 0 && count.torpedo <= 0 || count.main === 1 && count.secondary >= 1 && count.torpedo <= 0 || count.main === 0 && count.secondary >= 2 && count.torpedo >= 0) {\n                                result.type = '连击';\n                                result.damage = Math.floor(baseDamage * 1.2);\n                                result.hit = 2;\n                            }\n\n                            // 通常攻击\n                            else {\n                                    result.type = '通常';\n                                    result.damage = Math.floor(baseDamage);\n                                    result.hit = 1;\n                                }\n                        }\n                    }\n\n        var jointSymbol = ' ';\n        if (_typeof(result.ciAvailable) === 'object' && Object.keys(result.ciAvailable).length) {\n            result.value = Object.entries(result.ciAvailable).map(function (entry) {\n                var type = entry[0];\n                var ci = entry[1];\n                return '' + type + jointSymbol + ci.damage + (ci.hit > 1 ? ' x ' + ci.hit : '');\n            }).join(' | ');\n        } else {\n            if (result.isMax) jointSymbol = ' ≤ ';\n            if (result.isMin) jointSymbol = ' ≥ ';\n            result.value = '' + result.type + jointSymbol + (result.damage || 0);\n            if (result.hit && result.hit > 1) result.value += ' x ' + result.hit;\n            if (Array.isArray(result.cis) && result.cis.length) {\n                result.value += ' (CI' + jointSymbol + result.cis.sort(function (a, b) {\n                    return a[0] - b[0];\n                }).map(function (ci) {\n                    return ci[0] + (ci[1] && ci[1] > 1 ? ' x ' + ci[1] : '');\n                }).join(' 或 ') + ')';\n            } else if (result.damage_ci) {\n                var hit = result.hit_ci || result.hit || 1;\n                result.value += ' (CI' + jointSymbol + result.damage_ci + ')';\n                if (hit && hit > 1) result.value += ' x ' + hit;\n            }\n        }\n\n        return result;\n    };\n    formula.calcByShip.fighterPower_v2 = function (ship, equipments_by_slot, star_by_slot, rank_by_slot) {\n        var results = [0, 0],\n            slots = _slots(ship.slot);\n\n        slots.map(function (carry, index) {\n            var r = formula.calc.fighterPower(equipments_by_slot[index], carry, rank_by_slot[index] || 0, star_by_slot[index] || 0);\n            results[0] += r[0];\n            results[1] += r[1];\n        });\n        return results;\n    };\n    formula.calcByShip.losPower = function (ship, equipments_by_slot, star_by_slot, rank_by_slot, options) {\n        // http://biikame.hatenablog.com/entry/2014/11/14/224925\n\n        options = options || {};\n        options.shipLv = options.shipLv || 1;\n        options.hqLv = options.hqLv || 1;\n\n        if (options.shipLv < 0) options.shipLv = 1;\n        if (options.hqLv < 0) options.hqLv = 1;\n\n        var x = {\n            DiveBombers: 0,\n            TorpedoBombers: 0,\n            CarrierRecons: 0,\n            SeaplaneRecons: 0,\n            SeaplaneBombers: 0,\n            SmallRadars: 0,\n            LargeRadars: 0,\n            Searchlights: 0,\n            statLos: Math.sqrt(ship.getAttribute('los', options.shipLv)),\n            hqLv: options.hqLv\n        };\n\n        equipments_by_slot.forEach(function (equipment) {\n            if (equipment) {\n                for (var i in x) {\n                    if (_equipmentType[i] && _equipmentType[i].push && _equipmentType[i].indexOf(equipment.type) > -1) x[i] += equipment.stat.los;\n                }\n            }\n        });\n\n        return formula.calc.losPower(x);\n    };\n    formula.calcByShip.TP = function (ship, equipments_by_slot) {\n        if (!ship || !equipments_by_slot || !equipments_by_slot.push) return 0;\n\n        ship = _ship(ship);\n        var count = {\n            ship: {},\n            equipment: {}\n        };\n        count.ship[ship.type] = 1;\n        equipments_by_slot.forEach(function (equipment) {\n            if (equipment) {\n                var id = typeof equipment == 'number' ? equipment : _equipment(equipment)['id'];\n                if (!count.equipment[id]) count.equipment[id] = 0;\n                count.equipment[id]++;\n            }\n        });\n\n        var count_as_landing_craft = ship.getCapability('count_as_landing_craft');\n        // console.log('count_as_landing_craft', count_as_landing_craft)\n        if (count_as_landing_craft) {\n            if (!count.equipment[68]) count.equipment[68] = 0;\n            count.equipment[68]++;\n        }\n\n        return formula.calc.TP(count);\n    };\n    formula.calcByShip.speed = function (ship, equipments_by_slot, star_by_slot, rank_by_slot, options) {\n        if (!ship) return '';\n        if ((typeof star_by_slot === 'undefined' ? 'undefined' : _typeof(star_by_slot)) === 'object' && star_by_slot.push) return formula.calcByShip.speed(ship, equipments_by_slot, [], [], star_by_slot);\n        if ((typeof rank_by_slot === 'undefined' ? 'undefined' : _typeof(rank_by_slot)) === 'object' && rank_by_slot.push) return formula.calcByShip.speed(ship, equipments_by_slot, star_by_slot, [], rank_by_slot);\n\n        ship = _ship(ship);\n        equipments_by_slot = equipments_by_slot || [];\n        options = options || {};\n\n        var result = parseInt(ship.stat.speed);\n        var theResult = function theResult(_theResult) {\n            _theResult = Math.min(20, _theResult || result);\n            if (options.returnNumber) return _theResult;\n            return KC.statSpeed[_theResult];\n        };\n\n        // if (equipments_by_slot[4]) {\n        //     let id = typeof equipment == 'number' ? equipments_by_slot[4] : _equipment(equipments_by_slot[4])['id']\n        //     if( id != 33 )\n        //         return theResult()\n        // } else {\n        //     return theResult()\n        // }\n\n        var count = {\n            '33': 0,\n            '34': 0,\n            '87': 0\n        };\n        var rule = ship._speedRule || 'low-2';\n        var multiper = 0;\n\n        equipments_by_slot.forEach(function (equipment) {\n            if (!equipment) return;\n\n            var id = typeof equipment == 'number' ? equipment : _equipment(equipment)['id'];\n\n            if (typeof count['' + id] !== 'undefined') count['' + id]++;\n        });\n\n        if (!count['33']) return theResult();\n\n        switch (rule) {\n            // x - +10\n            // y - +13\n            case 'low-1':\n                // 低速A\n                // \t基础\t\t5\n                // \t最大\t\t20\n                // \t1x + 0y\t\t+5\t\t0.3x\n                // \t2x + 0y\t\t+5\t\t0.3x\n                // \t3x + 0y\t\t+5\t\t0.3x\n                // \t0x + 1y\t\t+5\t\t0.7x\n                // \t1x + 1y\t\t+10\t\t1x\n                // \t2x + 1y\t\t+15\t\t1x\n                // \t3x + 1y\t\t+15\t\t1x\n                // \t0x + 2y\t\t+10\t\t1.4x\n                // \t1x + 2y\t\t+15\t\t1.7x\n                // \t2x + 2y\t\t+15\t\t1.7x\n                // \t3x + 2y\t\t+15\t\t1.7x\n                // \t0x + 3y\t\t+15\t\t2.1x\n                // \t1x + 2y\t\t+15\n                // \t2x + 2y\t\t+15\n                // \t3x + 2y\t\t+15\n                // \tx = 0.3\n                // \ty = 0.7\n                if (count['34'] && !count['87']) {\n                    multiper = 0.5;\n                } else if (count['34'] >= 2 && count['87']) {\n                    multiper = 1.5;\n                } else {\n                    multiper = 0.3 * Math.min(count['34'], 1) + 0.7 * count['87'];\n                }\n                break;\n            case 'low-2':\n            case 'high-3':\n                // 低速B\n                // \t基础\t\t5\n                // \t最大\t\t15\n                // \t1x + 0y\t\t+5\t\t0.33x\n                // \t2x + 0y\t\t+5\t\t0.66x\n                // \t3x + 0y\t\t+10\t\t1x\n                // \t0x + 1y\t\t+5\t\t0.5x\n                // \t1x + 1y\t\t+5\t\t0.83x\n                // \t2x + 1y\t\t+10\t\t1.33x\n                // \t0x + 2y\t\t+10\t\t1x\n                // \tx = 0.33\n                // \ty = 0.5\n                // 高速C\n                // \t基础\t\t10\n                // \t最大\t\t20\n                // \t1x + 0y\t\t+5\t\t0.33x\n                // \t2x + 0y\t\t+5\t\t0.66x\n                // \t3x + 0y\t\t+10\t\t1x\n                // \t0x + 1y\t\t+5\t\t0.5x\n                // \t1x + 1y\t\t+5\t\t0.83x\n                // \t2x + 1y\t\t+10\t\t1.33x\n                // \t0x + 2y\t\t+10\t\t1x\n                // \tx = 0.33\n                // \ty = 0.5\n                if (count['34'] || count['87']) multiper = Math.min(1, count['34'] / 3 + 0.5 * count['87']);\n                break;\n            case 'low-3':\n            case 'high-4':\n                // 低速C\n                // \t基础\t\t5\n                // \t最大\t\t10\n                // 高速D\n                // \t基础\t\t10\n                // \t最大\t\t15\n                if (count['34'] || count['87']) result += 5;\n                break;\n            case 'high-1':\n                // 高速A\n                // \t基础\t\t10\n                // \t最大 \t\t20\n                // \t1x + 0y\t\t+5\t\t0.5x\n                // \t1x + 1y\t\t+10\t\t1.5x\n                // \t0x + 1y\t\t+10\t\t1x\n                // \tx = 0.5\n                // \ty = 1\n                multiper = 0.5 * count['34'] + 1 * count['87'];\n                break;\n            case 'high-2':\n                // 高速B\n                // \t基础\t\t10\n                // \t最大 \t\t20\n                // \t1x + 0y\t\t+5\t\t0.5x\n                // \t2x + 0y\t\t+10\t\t1x\n                // \t0x + 1y\t\t+5\t\t0.5x\n                // \t1x + 1y\t\t+10\t\t1x\n                // \t0x + 2y\t\t+10\t\t1x\n                // \tx = 0.5\n                // \ty = 0.5\n                multiper = 0.5 * count['34'] + 0.5 * count['87'];\n                break;\n            case 'low-4':\n                // 低速特殊B群\n                // \t基础\t\t5\n                // \t最大 \t\t15\n                //  タービンのみで高速化可能\n                //  0x + 0y     +5\n                // \t1x + 0y\t\t+5\t\t0.33x\n                // \t2x + 0y\t\t+5\t\t0.66x\n                // \t3x + 0y\t\t+10\t\t1x\n                // \t4x + 0y\t\t+10\t\t1x\n                // \t0x + 1y\t\t+5\t\t0.5x\n                // \t1x + 1y\t\t+5\t\t0.83x\n                // \t2x + 1y\t\t+10\t\t1.33x\n                // \t3x + 1y\t\t+10\t\t1.33x\n                // \t0x + 2y\t\t+10\t\t1x\n                // \tx = 0.33\n                // \ty = 0.5\n                multiper = 0.5;\n                if (count['34'] >= 3 || count['87'] >= 2 || count['34'] >= 2 && count['87'] >= 1) multiper += 0.5;\n                break;\n            default:\n                {}\n        }\n\n        // console.log(\n        //     ship, equipments_by_slot,\n        //     count,\n        //     rule,\n        //     multiper\n        // )\n\n        if (multiper > 0 && multiper < 1) result += 5;else if (multiper >= 1 && multiper < 1.5) result += 10;else if (multiper >= 1.5) result += 15;\n\n        return theResult();\n    };\n    formula.calcByShip.fireRange = function (ship, equipments_by_slot, star_by_slot, rank_by_slot, options, bonus) {\n        if (!ship) return '-';\n        equipments_by_slot = equipments_by_slot || [];\n\n        options = options || {};\n        bonus = bonus || calculateBonus(ship, equipments_by_slot, star_by_slot, rank_by_slot);\n\n        var result = parseInt(ship.stat.range);\n\n        equipments_by_slot.forEach(function (equipment) {\n            if (!equipment) return;\n\n            result = Math.max(result, _equipment(equipment).stat.range || 0);\n        });\n\n        if (!isNaN(bonus.range)) result += parseInt(bonus.range);\n\n        return KC.statRange[Math.min(4, result)];\n    };\n    // Calculate by Fleet\n    formula.calcByFleet.los33 = function (data, hq) {\n        /* data [\r\n            [\r\n                {number} shipId,\r\n                [ // ship stat\r\n                    {number} shipLv,\r\n                    {number} shipLuck\r\n                ],\r\n                [ // equipment id\r\n                    {number} slot 1 id,\r\n                    {number} slot 2 id,\r\n                    {number} slot 3 id,\r\n                    {number} slot 4 id,\r\n                    {number} slot x id\r\n                ],\r\n                [ // equipment star\r\n                    {number} slot 1 star,\r\n                    {number} slot 2 star,\r\n                    {number} slot 3 star,\r\n                    {number} slot 4 star,\r\n                    {number} slot x star\r\n                ],\r\n                [ // equipment rank\r\n                    {number} slot 1 rank,\r\n                    {number} slot 2 rank,\r\n                    {number} slot 3 rank,\r\n                    {number} slot 4 rank,\r\n                    {number} slot x rank\r\n                ]\r\n            ]\r\n        ]*/\n\n        var equipments = [],\n            ships = [];\n\n        data.forEach(function (dataShip) {\n            if (!Array.isArray(dataShip)) return;\n\n            var shipId = dataShip[0];\n\n            if (shipId) {\n                var equipmentIdPerSlot = dataShip[2];\n                var equipmentStarPerSlot = dataShip[3];\n                var equipmentRankPerSlot = dataShip[4];\n                ships.push({\n                    id: shipId,\n                    lv: dataShip[1][0]\n                });\n                equipmentIdPerSlot.forEach(function (equipmentId, index) {\n                    equipments.push({\n                        id: equipmentId,\n                        star: equipmentStarPerSlot[index],\n                        rank: equipmentRankPerSlot[index]\n                    });\n                });\n            }\n        });\n\n        return formula.calc.los33({\n            hq: hq,\n            equipments: equipments,\n            ships: ships\n        });\n    };\n    // Calculate by Airfield\n    /**\r\n     * 按机场计算: 出击制空战力\r\n     * @param {Object[]} equipments\r\n     * @param {Equipment} equipments[].equipment\r\n     * @param {Number} equipments[].rank\r\n     * @param {Number} equipments[].star\r\n     * @param {Number} equipments[].carry\r\n     */\n    formula.calcByField.fighterPower = function (equipments) {\n        /** @type {Number[]} 计算结果 */\n        var result = [0, 0];\n        var reconBonus = 1;\n\n        var updateReconBonus = function updateReconBonus(bonus) {\n            reconBonus = Math.max(bonus, reconBonus);\n            return reconBonus;\n        };\n\n        equipments.forEach(function (d) {\n            var equipment = _equipment(d[0] || d.equipment || d.equipmentId);\n            var star = d[1] || d.star || 0;\n            var rank = d[2] || d.rank || 0;\n\n            var carry = d[3] || d.carry || 0;\n            if (!carry) {\n                if (formula.equipmentType.Recons.indexOf(equipment.type) > -1) carry = KC.planesPerSlotLBAS.recon;else carry = KC.planesPerSlotLBAS.attacker;\n            }\n\n            var value = formula.calc.fighterPower(equipment, carry, rank, star, { isFromField: !0 });\n\n            result[0] += value[0];\n            result[1] += value[1];\n\n            // 计算侦察机加成\n            // 二式陸上偵察機(熟練)\n            if (equipment.id == 312) {\n                updateReconBonus(1.18);\n            } else {\n                switch (equipment.type) {\n                    case _equipmentType.LandBasedRecon:\n                        {\n                            updateReconBonus(1.15);\n                            break;\n                        }\n                    default:\n                        {}\n                }\n            }\n        });\n\n        result[0] = result[0] * reconBonus;\n        result[1] = result[1] * reconBonus;\n\n        return result;\n    };\n    formula.calcByField.fighterPowerAA = function (data) {\n        /*\r\n         * data [\r\n         *      equipment: equipmentId || Equipment,\r\n         *      star: Number,\r\n         *      rank: Number,\r\n         *      [carry]: Number\r\n         * ]\r\n         */\n        var result = [0, 0],\n            reconBonus = 1;\n\n        function updateReconBonus(bonus) {\n            reconBonus = Math.max(bonus, reconBonus);\n            return reconBonus;\n        }\n\n        data.forEach(function (d) {\n            var equipment = _equipment(d[0] || d.equipment || d.equipmentId),\n                star = d[1] || d.star || 0,\n                rank = d[2] || d.rank || 0,\n                carry = d[3] || d.carry || 0;\n\n            if (!carry) {\n                if (formula.equipmentType.Recons.indexOf(equipment.type) > -1) carry = KC.planesPerSlotLBAS.recon;else carry = KC.planesPerSlotLBAS.attacker;\n            }\n\n            var _r = formula.calc.fighterPowerAA(equipment, carry, rank, star, { isFromField: !0 });\n\n            result[0] += _r[0];\n            result[1] += _r[1];\n\n            // 计算侦察机加成\n            switch (equipment.type) {\n                case _equipmentType.CarrierRecon:\n                case _equipmentType.CarrierRecon2:\n                    if (equipment.stat.los <= 7) {\n                        updateReconBonus(1.2);\n                    } else if (equipment.stat.los >= 9) {\n                        updateReconBonus(1.3);\n                    } else {\n                        updateReconBonus(1.25);\n                    }\n                    break;\n                case _equipmentType.ReconSeaplane:\n                case _equipmentType.ReconSeaplaneNight:\n                case _equipmentType.LargeFlyingBoat:\n                    if (equipment.stat.los <= 7) {\n                        updateReconBonus(1.1);\n                    } else if (equipment.stat.los >= 9) {\n                        updateReconBonus(1.16);\n                    } else {\n                        updateReconBonus(1.13);\n                    }\n                    break;\n                case _equipmentType.LandBasedRecon:\n                    {\n                        updateReconBonus(1.18);\n                        break;\n                    }\n                default:\n                    {}\n            }\n        });\n\n        result[0] = result[0] * reconBonus;\n        result[1] = result[1] * reconBonus;\n\n        return result;\n    };\n    // Get bonus for specified ship and equipment(s)\n    formula.getBonus = function (ship, equipments_by_slot, star_by_slot, rank_by_slot, stat) {\n        return calculateBonus(ship, equipments_by_slot, star_by_slot, rank_by_slot, stat);\n    };\n\n    /**\r\n     * ES/JS Functions/Features\r\n     */\n    // Array.prototype.indexOf()\n    // Production steps of ECMA-262, Edition 5, 15.4.4.14\n    // Reference: http://es5.github.io/#x15.4.4.14\n    if (!Array.prototype.indexOf) {\n        Array.prototype.indexOf = function (searchElement, fromIndex) {\n            var k;\n\n            // 1. Let o be the result of calling ToObject passing\n            //    the this value as the argument.\n            if (this == null) {\n                throw new TypeError('\"this\" is null or not defined');\n            }\n\n            var o = Object(this);\n\n            // 2. Let lenValue be the result of calling the Get\n            //    internal method of o with the argument \"length\".\n            // 3. Let len be ToUint32(lenValue).\n            var len = o.length >>> 0;\n\n            // 4. If len is 0, return -1.\n            if (len === 0) {\n                return -1;\n            }\n\n            // 5. If argument fromIndex was passed let n be\n            //    ToInteger(fromIndex); else let n be 0.\n            var n = +fromIndex || 0;\n\n            if (Math.abs(n) === Infinity) {\n                n = 0;\n            }\n\n            // 6. If n >= len, return -1.\n            if (n >= len) {\n                return -1;\n            }\n\n            // 7. If n >= 0, then Let k be n.\n            // 8. Else, n<0, Let k be len - abs(n).\n            //    If k is less than 0, then let k be 0.\n            k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);\n\n            // 9. Repeat, while k < len\n            while (k < len) {\n                // a. Let Pk be ToString(k).\n                //   This is implicit for LHS operands of the in operator\n                // b. Let kPresent be the result of calling the\n                //    HasProperty internal method of o with argument Pk.\n                //   This step can be combined with c\n                // c. If kPresent is true, then\n                //    i.  Let elementK be the result of calling the Get\n                //        internal method of o with the argument ToString(k).\n                //   ii.  Let same be the result of applying the\n                //        Strict Equality Comparison Algorithm to\n                //        searchElement and elementK.\n                //  iii.  If same is true, return k.\n                if (k in o && o[k] === searchElement) {\n                    return k;\n                }\n                k++;\n            }\n            return -1;\n        };\n    }\n\n    /**\r\n     *\r\n     */\n    KC.Entity = Entity;\n    KC.Equipment = Equipment;\n    KC.Ship = Ship;\n    KC.Consumable = Consumable;\n    KC.formula = formula;\n\n    return KC;\n});\n\n//# sourceURL=webpack:///./src/kckit.js?");

/***/ }),

/***/ "./src/types/equipments.js":
/*!*********************************!*\
  !*** ./src/types/equipments.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/*\r\n * HA       High Angle\r\n * AAFD     Anti-Air Fire Director\r\n */\n\n/**\r\n * @type {Object} 装备类型和类型集合\r\n */\nvar types = {\n    // Type ID\n    SmallCaliber: 1, // 小口径主炮\n    SmallCaliberHigh: 2, // 小口径高角主炮\n    SmallCaliberHA: 2, // 小口径高角主炮\n    SmallCaliberAA: 3, // 小口径高角主炮（强化）\n    SmallCaliberAAFD: 3, // 小口径高角主炮（强化）\n    MediumCaliber: 4, // 中口径主炮\n    MediumCaliberAA: 64, // 中口径高角主炮（强化）\n    MediumCaliberAAFD: 64, // 中口径高角主炮（强化）\n    LargeCaliber: 5, // 大口径主炮\n    SuperCaliber: 6, // 超大口径主炮\n    SecondaryGun: 7, // 副炮\n    SecondaryGunHigh: 8, // 高角副炮\n    SecondaryGunHA: 8, // 高角副炮\n    SecondaryGunAA: 9, // 高角副炮（强化）\n    SecondaryGunAAFD: 9, // 高角副炮（强化）\n    Type3Shell: 10, // 对空强化弹\n    APShell: 11, // 穿甲弹\n    Torpedo: 12, // 鱼雷\n    SubmarineTorpedo: 13, // 潜艇鱼雷\n    MidgetSubmarine: 14, // 微型潜艇\n    ReconSeaplane: 15, // 水上侦察机\n    ReconSeaplaneNight: 16, // 夜侦\n    SeaplaneBomber: 17, // 水上轰炸机\n    CarrierFighter: 18, // 舰战 / 舰载战斗机\n    TorpedoBomber: 19, // 舰攻 / 舰载鱼雷轰炸机\n    DiveBomber: 20, // 舰爆 / 舰载俯冲轰炸机\n    CarrierRecon: 21, // 舰侦 / 舰载侦察机\n    Autogyro: 22, // 旋翼机\n    AntiSubPatrol: 23, // 对潜哨戒机\n    SmallRadar: 24, // 小型雷达\n    LargeRadar: 25, // 大型雷达\n    DepthCharge: 26, // 爆雷\n    Sonar: 27, // 声纳\n    LargeSonar: 28, // 大型声纳\n    AAGun: 29, // 对空机枪\n    AAGunConcentrated: 30, // 对空机枪（强化）\n    AAGunCD: 30, // 对空机枪（强化）\n    CDMG: 30, // 对空机枪（强化）\n    AAFireDirector: 31, // 高射装置\n    AAFD: 31, // 高射装置\n    AviationPersonnel: 36, // 航空作战整备员\n    SurfaceShipPersonnel: 37, // 水上舰要员\n    LandingCraft: 38, // 登陆艇\n    Searchlight: 39, // 探照灯\n    SupplyContainer: 41, // 簡易輸送部材\n    CommandFacility: 45, // 舰队司令部设施\n    LargeFlyingBoat: 45, // 大型水上飞艇\n    SearchlightLarge: 46, // 大型探照灯\n    SuparRadar: 47, // 超大型雷达\n    CombatRation: 48, // 戦闘糧食\n    CarrierRecon2: 50, // 舰侦II / 舰载侦察机II\n    SeaplaneFighter: 51, // 水战 / 水上战斗机\n    AmphibiousCraft: 52, // 特型内火艇\n    LandBasedAttacker: 53, // 陆攻 / 陆上攻击机\n    Interceptor: 54, // 局战 / 局地战斗机\n    JetBomberFighter: 55, // 喷气式战斗轰炸机\n    JetBomberFighter2: 56, // 喷气式战斗轰炸机\n    TransportMaterial: 57, // 运输设备\n    SubmarineEquipment: 58, // 潜艇装备\n    LandBasedFighter: 59, // 陆战 / 陆上战斗机\n    CarrierFighterNight: 60, // 夜战 / 舰载战斗机（夜间）\n    TorpedoBomberNight: 61, // 夜攻 / 舰载鱼雷机（夜间）\n    LandBasedAntiSubPatrol: 62, // 陆上哨戒机\n    LandBasedRecon: 63 // 陆上侦察机\n};\n\n// Groups\ntypes.MainGuns = [types.SmallCaliber, types.SmallCaliberHigh, types.SmallCaliberAA, types.MediumCaliber, types.MediumCaliberAA, types.LargeCaliber, types.SuperCaliber];\ntypes.MainCalibers = types.MainGuns;\n\ntypes.SmallCalibers = [types.SmallCaliber, types.SmallCaliberHigh, types.SmallCaliberAA];\n\ntypes.MediumCalibers = [types.MediumCaliber, types.MediumCaliberAA];\n\ntypes.LargeCalibers = [types.LargeCaliber, types.SuperCaliber];\n\ntypes.SecondaryGuns = [types.SecondaryGun, types.SecondaryGunHigh, types.SecondaryGunAA];\n\ntypes.HAMounts = [types.SmallCaliberHigh, types.SmallCaliberAA, types.MediumCaliberAA, types.SecondaryGunHigh, types.SecondaryGunAA];\n\ntypes.HAMountsAAFD = [types.SmallCaliberAA, types.MediumCaliberAA, types.SecondaryGunAA];\n\ntypes.AAShells = [types.Type3Shell];\n\ntypes.APShells = [types.APShell];\n\ntypes.Torpedos = [types.Torpedo, types.SubmarineTorpedo];\n\ntypes.Seaplanes = [types.ReconSeaplane, types.ReconSeaplaneNight, types.SeaplaneBomber, types.SeaplaneFighter];\n\ntypes.Fighters = [types.SeaplaneBomber, types.CarrierFighter, types.CarrierFighterNight, types.TorpedoBomber, types.TorpedoBomberNight, types.DiveBomber, types.SeaplaneFighter, types.LandBasedAttacker, types.Interceptor,\n// types.CarrierRecon\ntypes.JetBomberFighter, types.JetBomberFighter2, types.LandBasedFighter];\n\ntypes.Interceptors = [types.Interceptor, types.LandBasedFighter];\n\ntypes.Recons = [types.ReconSeaplane, types.ReconSeaplaneNight, types.CarrierRecon, types.CarrierRecon2, types.LargeFlyingBoat, types.LandBasedRecon];\n\ntypes.SeaplaneRecons = [types.ReconSeaplane, types.ReconSeaplaneNight];\n\ntypes.SeaplaneReconsAll = [types.ReconSeaplane, types.ReconSeaplaneNight, types.LargeFlyingBoat];\n\ntypes.SeaplaneBombers = [types.SeaplaneBomber, types.SeaplaneFighter];\n\ntypes.SeaplaneFighters = [types.SeaplaneFighter];\n\ntypes.CarrierFighters = [types.CarrierFighter, types.CarrierFighterNight];\n\ntypes.CarrierRecons = [types.CarrierRecon, types.CarrierRecon2];\n\ntypes.CarrierBased = [types.CarrierFighter, types.CarrierFighterNight, types.TorpedoBomber, types.TorpedoBomberNight, types.DiveBomber, types.CarrierRecon, types.CarrierRecon2, types.JetBomberFighter, types.JetBomberFighter2];\n\ntypes.LandBased = [types.LandBasedAttacker, types.Interceptor, types.JetBomberFighter, types.JetBomberFighter2, types.LandBasedFighter, types.LandBasedAntiSubPatrol, types.LandBasedRecon];\n\ntypes.TorpedoBombers = [types.TorpedoBomber, types.TorpedoBomberNight];\n\ntypes.DiveBombers = [types.DiveBomber];\n\ntypes.JetBomberFighters = [types.JetBomberFighter, types.JetBomberFighter2];\n\ntypes.Jets = [types.JetBomberFighter, types.JetBomberFighter2];\n\ntypes.Autogyros = [types.Autogyro];\n\ntypes.AntiSubPatrols = [types.AntiSubPatrol, types.LandBasedAntiSubPatrol];\n\ntypes.Aircrafts = [];\n[].concat(types.Seaplanes).concat(types.Recons).concat(types.CarrierBased).concat(types.Autogyros).concat(types.AntiSubPatrols).concat(types.LandBased).forEach(function (v) {\n    if (types.Aircrafts.indexOf(v) < 0) types.Aircrafts.push(v);\n});\n\ntypes.Radars = [types.SmallRadar, types.LargeRadar, types.SuparRadar];\n\ntypes.SmallRadars = [types.SmallRadar];\n\ntypes.LargeRadars = [types.LargeRadar, types.SuparRadar];\n\ntypes.AntiSubmarines = [types.DepthCharge, types.Sonar, types.LargeSonar];\n\ntypes.DepthCharges = [types.DepthCharge];\n\ntypes.Sonars = [types.Sonar, types.LargeSonar];\n\ntypes.AAGuns = [types.AAGun, types.AAGunConcentrated];\n\ntypes.AAFireDirectors = [types.AAFireDirector];\ntypes.AAFDs = types.AAFireDirectors;\n\ntypes.Searchlights = [types.Searchlight, types.SearchlightLarge];\n\ntypes.AviationPersonnels = [types.AviationPersonnel];\n\ntypes.SurfaceShipPersonnels = [types.SurfaceShipPersonnel];\n\ntypes.LandingCrafts = [types.LandingCraft, types.AmphibiousCraft];\n\ntypes.AmphibiousCrafts = [types.AmphibiousCraft];\n\ntypes.SupplyContainers = [types.SupplyContainer];\n\ntypes.CombatRations = [types.CombatRation];\n\nmodule.exports = types;\n\n//# sourceURL=webpack:///./src/types/equipments.js?");

/***/ })

/******/ });
/*!
 * clipboard.js v2.0.6
 * https://clipboardjs.com/
 * 
 * Licensed MIT © Zeno Rocha
 */
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.ClipboardJS=e():t.ClipboardJS=e()}(this,function(){return o={},r.m=n=[function(t,e){t.exports=function(t){var e;if("SELECT"===t.nodeName)t.focus(),e=t.value;else if("INPUT"===t.nodeName||"TEXTAREA"===t.nodeName){var n=t.hasAttribute("readonly");n||t.setAttribute("readonly",""),t.select(),t.setSelectionRange(0,t.value.length),n||t.removeAttribute("readonly"),e=t.value}else{t.hasAttribute("contenteditable")&&t.focus();var o=window.getSelection(),r=document.createRange();r.selectNodeContents(t),o.removeAllRanges(),o.addRange(r),e=o.toString()}return e}},function(t,e){function n(){}n.prototype={on:function(t,e,n){var o=this.e||(this.e={});return(o[t]||(o[t]=[])).push({fn:e,ctx:n}),this},once:function(t,e,n){var o=this;function r(){o.off(t,r),e.apply(n,arguments)}return r._=e,this.on(t,r,n)},emit:function(t){for(var e=[].slice.call(arguments,1),n=((this.e||(this.e={}))[t]||[]).slice(),o=0,r=n.length;o<r;o++)n[o].fn.apply(n[o].ctx,e);return this},off:function(t,e){var n=this.e||(this.e={}),o=n[t],r=[];if(o&&e)for(var i=0,a=o.length;i<a;i++)o[i].fn!==e&&o[i].fn._!==e&&r.push(o[i]);return r.length?n[t]=r:delete n[t],this}},t.exports=n,t.exports.TinyEmitter=n},function(t,e,n){var d=n(3),h=n(4);t.exports=function(t,e,n){if(!t&&!e&&!n)throw new Error("Missing required arguments");if(!d.string(e))throw new TypeError("Second argument must be a String");if(!d.fn(n))throw new TypeError("Third argument must be a Function");if(d.node(t))return s=e,f=n,(u=t).addEventListener(s,f),{destroy:function(){u.removeEventListener(s,f)}};if(d.nodeList(t))return a=t,c=e,l=n,Array.prototype.forEach.call(a,function(t){t.addEventListener(c,l)}),{destroy:function(){Array.prototype.forEach.call(a,function(t){t.removeEventListener(c,l)})}};if(d.string(t))return o=t,r=e,i=n,h(document.body,o,r,i);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList");var o,r,i,a,c,l,u,s,f}},function(t,n){n.node=function(t){return void 0!==t&&t instanceof HTMLElement&&1===t.nodeType},n.nodeList=function(t){var e=Object.prototype.toString.call(t);return void 0!==t&&("[object NodeList]"===e||"[object HTMLCollection]"===e)&&"length"in t&&(0===t.length||n.node(t[0]))},n.string=function(t){return"string"==typeof t||t instanceof String},n.fn=function(t){return"[object Function]"===Object.prototype.toString.call(t)}},function(t,e,n){var a=n(5);function i(t,e,n,o,r){var i=function(e,n,t,o){return function(t){t.delegateTarget=a(t.target,n),t.delegateTarget&&o.call(e,t)}}.apply(this,arguments);return t.addEventListener(n,i,r),{destroy:function(){t.removeEventListener(n,i,r)}}}t.exports=function(t,e,n,o,r){return"function"==typeof t.addEventListener?i.apply(null,arguments):"function"==typeof n?i.bind(null,document).apply(null,arguments):("string"==typeof t&&(t=document.querySelectorAll(t)),Array.prototype.map.call(t,function(t){return i(t,e,n,o,r)}))}},function(t,e){if("undefined"!=typeof Element&&!Element.prototype.matches){var n=Element.prototype;n.matches=n.matchesSelector||n.mozMatchesSelector||n.msMatchesSelector||n.oMatchesSelector||n.webkitMatchesSelector}t.exports=function(t,e){for(;t&&9!==t.nodeType;){if("function"==typeof t.matches&&t.matches(e))return t;t=t.parentNode}}},function(t,e,n){"use strict";n.r(e);var o=n(0),r=n.n(o),i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};function a(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function c(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,c),this.resolveOptions(t),this.initSelection()}var l=(function(t,e,n){return e&&a(t.prototype,e),n&&a(t,n),t}(c,[{key:"resolveOptions",value:function(t){var e=0<arguments.length&&void 0!==t?t:{};this.action=e.action,this.container=e.container,this.emitter=e.emitter,this.target=e.target,this.text=e.text,this.trigger=e.trigger,this.selectedText=""}},{key:"initSelection",value:function(){this.text?this.selectFake():this.target&&this.selectTarget()}},{key:"selectFake",value:function(){var t=this,e="rtl"==document.documentElement.getAttribute("dir");this.removeFake(),this.fakeHandlerCallback=function(){return t.removeFake()},this.fakeHandler=this.container.addEventListener("click",this.fakeHandlerCallback)||!0,this.fakeElem=document.createElement("textarea"),this.fakeElem.style.fontSize="12pt",this.fakeElem.style.border="0",this.fakeElem.style.padding="0",this.fakeElem.style.margin="0",this.fakeElem.style.position="absolute",this.fakeElem.style[e?"right":"left"]="-9999px";var n=window.pageYOffset||document.documentElement.scrollTop;this.fakeElem.style.top=n+"px",this.fakeElem.setAttribute("readonly",""),this.fakeElem.value=this.text,this.container.appendChild(this.fakeElem),this.selectedText=r()(this.fakeElem),this.copyText()}},{key:"removeFake",value:function(){this.fakeHandler&&(this.container.removeEventListener("click",this.fakeHandlerCallback),this.fakeHandler=null,this.fakeHandlerCallback=null),this.fakeElem&&(this.container.removeChild(this.fakeElem),this.fakeElem=null)}},{key:"selectTarget",value:function(){this.selectedText=r()(this.target),this.copyText()}},{key:"copyText",value:function(){var e=void 0;try{e=document.execCommand(this.action)}catch(t){e=!1}this.handleResult(e)}},{key:"handleResult",value:function(t){this.emitter.emit(t?"success":"error",{action:this.action,text:this.selectedText,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)})}},{key:"clearSelection",value:function(){this.trigger&&this.trigger.focus(),document.activeElement.blur(),window.getSelection().removeAllRanges()}},{key:"destroy",value:function(){this.removeFake()}},{key:"action",set:function(t){var e=0<arguments.length&&void 0!==t?t:"copy";if(this._action=e,"copy"!==this._action&&"cut"!==this._action)throw new Error('Invalid "action" value, use either "copy" or "cut"')},get:function(){return this._action}},{key:"target",set:function(t){if(void 0!==t){if(!t||"object"!==(void 0===t?"undefined":i(t))||1!==t.nodeType)throw new Error('Invalid "target" value, use a valid Element');if("copy"===this.action&&t.hasAttribute("disabled"))throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');if("cut"===this.action&&(t.hasAttribute("readonly")||t.hasAttribute("disabled")))throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');this._target=t}},get:function(){return this._target}}]),c),u=n(1),s=n.n(u),f=n(2),d=n.n(f),h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},p=function(t,e,n){return e&&y(t.prototype,e),n&&y(t,n),t};function y(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}var m=(function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(v,s.a),p(v,[{key:"resolveOptions",value:function(t){var e=0<arguments.length&&void 0!==t?t:{};this.action="function"==typeof e.action?e.action:this.defaultAction,this.target="function"==typeof e.target?e.target:this.defaultTarget,this.text="function"==typeof e.text?e.text:this.defaultText,this.container="object"===h(e.container)?e.container:document.body}},{key:"listenClick",value:function(t){var e=this;this.listener=d()(t,"click",function(t){return e.onClick(t)})}},{key:"onClick",value:function(t){var e=t.delegateTarget||t.currentTarget;this.clipboardAction&&(this.clipboardAction=null),this.clipboardAction=new l({action:this.action(e),target:this.target(e),text:this.text(e),container:this.container,trigger:e,emitter:this})}},{key:"defaultAction",value:function(t){return b("action",t)}},{key:"defaultTarget",value:function(t){var e=b("target",t);if(e)return document.querySelector(e)}},{key:"defaultText",value:function(t){return b("text",t)}},{key:"destroy",value:function(){this.listener.destroy(),this.clipboardAction&&(this.clipboardAction.destroy(),this.clipboardAction=null)}}],[{key:"isSupported",value:function(t){var e=0<arguments.length&&void 0!==t?t:["copy","cut"],n="string"==typeof e?[e]:e,o=!!document.queryCommandSupported;return n.forEach(function(t){o=o&&!!document.queryCommandSupported(t)}),o}}]),v);function v(t,e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,v);var n=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(v.__proto__||Object.getPrototypeOf(v)).call(this));return n.resolveOptions(e),n.listenClick(t),n}function b(t,e){var n="data-clipboard-"+t;if(e.hasAttribute(n))return e.getAttribute(n)}e.default=m}],r.c=o,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=6).default;function r(t){if(o[t])return o[t].exports;var e=o[t]={i:t,l:!1,exports:{}};return n[t].call(e.exports,e,e.exports,r),e.l=!0,e.exports}var n,o});
$document.ready(function(){

	//var timeStart = _g.timeNow()

	$body 		= $('body')

	// 延迟一段时间，保存正确的基础字号信息
	//setTimeout(function(){
		//_g.baseSize = _g.get_basesize();
		//_g.baseMultiper = parseFloat( _g.baseSize / 10 );
		//_g.lastBaseSize = _g.get_basesize();
		
	//}, bIE10 ? 0 : 0 )
	// 延迟处理ready函数，以解决一些匪夷所思的bug
	//setTimeout(function(){
		//console.log( document.hasFocus ? document.hasFocus() : '123' )
		//console.log(_g.baseMultiper)
		for( var i in _g.func_first ){
			_g.func_first[i]()
		}
		
		_g.init();
		// 触发一次窗口的resize，以解决一些奇怪的bug
		//$(window).resize();
		
		for( var i in _g.func_last ){
			_g.func_last[i]()
		}
	//}, bIE10 ? 1 : 1 )
	//}, _g.animate_duration_delay * 10 )
	//setTimeout(function(){
		//console.log( document.hasFocus ? document.hasFocus() : '123' )
	//}, _g.animate_duration_delay * 10 )
	/*
	setTimeout(function(){
		if( _g.axis == 'y' )
			$(window).resize();
	}, _g.animate_duration_delay)*/

	//var timeEnd = _g.timeNow()
	//	,t = timeEnd - timeStart

	//console.log(
	//	'time initializing: '+ (timeEnd - timeStart) +'ms'
	//)

	//if( t > 5000 ){
	//if( t > 5000 || bMobile ){
	//	$html.addClass('no-transition')
	//}
});