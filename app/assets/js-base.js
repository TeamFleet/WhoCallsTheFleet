"use strict"

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
			_huCss.csscheck_div = document.createElement( "div" )
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
	$html.addClass('gecko')
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

	$body.data('preventMouseover', false).on({
		'touchstart.preventMouseover': function(){
			$body.removeClass('hover')
			$body_preventMouseover = true
			//$body_hover = false
			//console.log('touchstart')
		},
		'touchend.preventMouseover': function(){
			// make touchend trigger after mouseleave
			setTimeout(function(){
				$body_preventMouseover = false
				//console.log('touchend')
			}, 1)
		},
		'pointerover': function(e){
			if( e.originalEvent.pointerType == 'touch' )
				$body.trigger('touchstart.preventMouseover')
		},
		'pointerleave': function(e){
			if( e.originalEvent.pointerType == 'touch' )
				$body.trigger('touchend.preventMouseover')
		},
		'mouseenter': function(){
			//console.log('mouseenter')
			if( !$body_preventMouseover ){
				//if( !$body_hover ){
					$body.addClass('hover')
					//$body_hover = true
				//}
			}else{
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
			(arr2 instanceof Array) ? arr2 : [arr2]
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

// define and require node.js libraries & modules
var node = {
	'require': 	function(module, only_require){
		if( !node[module] && !only_require ){
			node[module] = require(module)
		}if( only_require ){
			return require(module)
		}
		return node[module]
	}
}


node.gui 		= node.require('nw.gui', true)
node.win 		= node.gui.Window.get()
node.clipboard 	= node.gui.Clipboard.get();

node.require('path')
node.require('fs')


if(typeof debugmode == 'undefined')
	var debugmode = false
						|| (
							node.gui.App.manifest['debug']
							|| node.gui.App.manifest['window']['debug']
						)

if( global.launcherOptions ){
	debugmode = global.launcherOptions['debug'] || global.launcherOptions['window']['debug']
}



// _g.root, nw.js 程序运行目录
	_g.root = node.path.dirname(process.execPath).split(node.path.sep)
	_g.root = (_g.root[_g.root.length - 1] == 'nwjs' && node.path.basename( process.execPath ) == 'nw.exe')
					? process.cwd()
					: node.path.dirname(process.execPath)
	// 对app根目录再做检查，如果不存在，则指向到缓存目录
	// 该情况通常发生于使用launcer启动时
		try{
			var stat = node.fs.lstatSync( node.path.join( _g.root , '/app/main.html' ) )
		}catch(e){
			_g.root	= node.path.join( node.gui.App.dataPath, '/Extracted Data/')
		}


// _g.execPath
	_g.execPath = node.path.dirname(process.execPath).split(node.path.sep)
	_g.execPath = (process.platform == 'darwin' || (_g.execPath[_g.execPath.length - 1] == 'nwjs' && node.path.basename( process.execPath ) == 'nw.exe') )
					? process.cwd()
					: node.path.dirname(process.execPath)



// 文件另存为
	_g.file_save_as = function( path_src, filename ){
		path_src = node.path.normalize(path_src)
		if( !_frame.dom.hidden_saveform )
			_frame.dom.hidden_saveform = $('<input type="file" nwsaveas/>')
					.on('change', function(){
						var input = _frame.dom.hidden_saveform
							,dest = input.val()
							,path_file = input.attr('nwsaveas_file')
						input.attr('nwsaveas', '').attr('nwsaveas_file', '').val('')

						if( dest ){
							var cbCalled = false
								,rd = node.fs.createReadStream( path_file )
							rd.on("error", function(err) {
								done(err);
							});
							var wr = node.fs.createWriteStream(dest);
								wr.on("error", function(err) {
								done(err);
							});
							wr.on("close", function(ex) {
								done();
							});
							rd.pipe(wr);
							function done(err) {
								if (!cbCalled) {
									//callback(err, src, dest);
									cbCalled = true;
								}
							}
						}
					})
					.appendTo( _frame.dom.hidden )
		_frame.dom.hidden_saveform
			.attr({
				'nwsaveas': 	filename || '',
				'nwsaveas_file':path_src
			}).trigger('click')
	}


// Set actual page zoom, 1 = 100%, 0.5 = 50%, 2 = 200%, etc...
	_g.zoom = function(v){
		v = v || 1
		node.win.zoomLevel = Math.log(v) / Math.log(1.2)
		return node.win.zoomLevel
	}


var _config = {
	getFullKeyname: function( key ){
		return 'config_' + key
	},

	get: function( key ){
		if( !localStorage )
			return false

		var value = localStorage[ _config.getFullKeyname(key) ]

		if( value === 'true' )
			return true

		if( value === 'undefined' ){
			delete localStorage[ _config.getFullKeyname(key) ]
			return null
		}

		return value
	},

	set: function( key, value ){
		if( !localStorage )
			return false

		if( value === null && localStorage[ _config.getFullKeyname(key) ] ){
			delete localStorage[ _config.getFullKeyname(key) ]
		}else{
			localStorage[ _config.getFullKeyname(key) ] = value
		}
	}
}




_frame.app_config = {
	//is_init: false,

	init: function(){
		if( _frame.app_config.is_init )
			return true

		_frame.app_config.is_init = true
	}
}

_frame.app_menu = {
	//is_init: false,

	init: function(){
		if( _frame.app_menu.is_init )
			return true

		// 创建各种菜单
			_frame.app_menu.menus = {}


		// 事件委托
			$body.on('contextmenu.contextmenu_image', 'img', function(e){
				var img = $(this)
				attr_contextmenu = img.attr('contextmenu')
				if( !attr_contextmenu || !attr_contextmenu == 'disabled' || attr_contextmenu == 'false' ){
					e.preventDefault()
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
					return false
				}
			})

		_frame.app_menu.is_init = true
	}
}

// 打开新的node-webkit窗口
node.openWin = function( path, options ){
	node.gui.Window.open( path , $.extend( true, {
		"title": 			null,
		"width": 			Math.max(Math.floor(screen.availWidth * 0.85), 320),
		"height":			Math.max(Math.floor(screen.availHeight * 0.85), 320),
		"toolbar":			node.gui.App.manifest['window']['toolbar'],
		"icon": 			node.gui.App.manifest['window']['icon'],
		"position":			"center",
		"min_width":		320,
		"min_height":		320,
		"max_width":		null,
		"max_height":		null,
		"as_desktop":		false,
		"resizable":		node.gui.App.manifest['window']['resizable'],
		"always-on-top":	false,
		"fullscreen":		false,
		"show_in_taskbar":	node.gui.App.manifest['window']['show_in_taskbar'],
		"frame":			node.gui.App.manifest['window']['frame'],
		"show":				true,
		"kiosk":			false,
		"transparent":		node.gui.App.manifest['window']['transparent']
	}, options ) )
}










node.win.on('loaded', function(){
})







_frame.app_window = {
	//is_init: false,

	init: function(){
		if( _frame.app_window.is_init )
			return true

		if( $html.hasClass('app') ){
			// 恢复窗口尺寸和位置
				//if( !global.launcherOptions ){
					var windowX = parseInt(_config.get( 'windowX' ))
						,windowY = parseInt(_config.get( 'windowY' ))
					if( _config.get( 'windowMaximize' ) ){
						windowX = parseInt(_config.get( 'windowMaximizeX' )) || windowX
						windowY = parseInt(_config.get( 'windowMaximizeY' )) || windowY
						if( !isNaN(windowX) && !isNaN(windowY) ){
							node.win.moveTo( windowX, windowY )
						}
						node.win.maximize()
						$html.addClass('window-maxmize')
					}else{
						var windowWidth = Math.max(
											parseInt(
												_config.get( 'windowWidth' )
												|| ( global.launcherOptions && global.launcherOptions['window']
													? global.launcherOptions['window']['width']
													: node.gui.App.manifest['window']['width'])
											)
											,( global.launcherOptions && global.launcherOptions['window']
												? global.launcherOptions['window']['min_width']
												: node.gui.App.manifest['window']['min_width'])
										)
							,windowHeight = Math.max(
											parseInt(
												_config.get( 'windowHeight' )
												|| ( global.launcherOptions && global.launcherOptions['window']
													? global.launcherOptions['window']['height']
													: node.gui.App.manifest['window']['height'])
											)
											,( global.launcherOptions && global.launcherOptions['window']
												? global.launcherOptions['window']['min_height']
												: node.gui.App.manifest['window']['min_height'])
										)

						if( !isNaN(windowX) && !isNaN(windowY) ){
							node.win.moveTo( windowX, windowY )

							var availWidth 		= screen.availWidth + (screen.availLeft || 0)
								,availHeight 	= screen.availHeight + (screen.availTop || 0)

							// 保证窗口不超出屏幕
								if( windowX < 0 )
									windowX = 0
								if( windowWidth + windowX > availWidth )
									windowX = availWidth - windowWidth
								if( windowY < 0 )
									windowY = 0
								if( windowHeight + windowY > availHeight )
									windowY = availHeight - windowHeight

							node.win.moveTo( windowX, windowY )
						}

						if( !isNaN(windowWidth) && !isNaN(windowHeight) && windowWidth && windowHeight ){
							node.win.resizeTo( windowWidth, windowHeight )
						}
					}
				//}

			// 为窗口绑定事件
				node.win.on('blur', function(){
					$html.addClass('window-blured')
				})
				node.win.on('focus', function(){
					$html.removeClass('window-blured')
				})
				node.win.on('maximize', function(){
					$html.addClass('window-maxmize')
					_config.set( 'windowMaximize', true )
					_config.set( 'windowMaximizeX', screen.availLeft || 0 )
					_config.set( 'windowMaximizeY', screen.availTop || 0 )
					_config.set( 'windowX', null )
					_config.set( 'windowY', null )
					_config.set( 'windowWidth', null )
					_config.set( 'windowHeight', null )
				})
				node.win.on('unmaximize', function(){
					$html.removeClass('window-maxmize')
					_config.set( 'windowMaximize', null )
					_config.set( 'windowMaximizeX', null )
					_config.set( 'windowMaximizeY', null )
				})
				node.win.on('enter-fullscreen', function(){
					$html.addClass('window-fullscreen')
					_config.set( 'windowFullscreen', true )
				})
				node.win.on('leave-fullscreen', function(){
					$html.removeClass('window-fullscreen')
					_config.set( 'windowFullscreen', null )
				})
				node.win.on('move', function(x, y){
					_config.set( 'windowX', x )
					_config.set( 'windowY', y )
				})
				node.win.on('resize', function(width, height){
					_config.set( 'windowWidth', width )
					_config.set( 'windowHeight', height )
				})
				//node.win.on('close', function(){
				//	alert( 'dumpWindowStatus' )
				//	this.close(true)
				//})

			// 处理标题栏标题与按钮
				if( (!global.launcherOptions && node.gui.App.manifest['window']['frame']) || (global.launcherOptions && global.launcherOptions['window']['frame']) ){
					if( debugmode ){
						_frame.dom.debugbtns = $('<div class="debugbtns"/>').appendTo( $body )
						$('<button/>',{
								'html': 	'Console'
							}).on('click',function(){
								node.win.showDevTools()
							}).appendTo( _frame.dom.debugbtns )
						$('<button/>',{
								'html': 	'Reload'
							}).on('click',function(){
								location.reload()
							}).appendTo( _frame.dom.debugbtns )
					}
				}else{
					$html.addClass('window-noframe')
					var titlebar = $('#titlebar')
					if( !titlebar || !titlebar.length ){
						titlebar = $('<div id="titlebar"/>').appendTo($body)
						$('<strong/>').appendTo( titlebar )
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
							.appendTo( titlebar )
						$('<div id="window_border"/>').insertAfter( titlebar )
					}
					titlebar.children('strong').html(node.win.title)
					titlebar.find('.buttons .minimize').on('click', function(){
							node.win.minimize()
						})
					titlebar.find('.buttons .maximize').on('click', function(){
							if( $html.hasClass('window-maxmize') )
								node.win.restore()
							else
								node.win.maximize()
						})
					titlebar.find('.buttons .close').on('click', function(){
							node.win.close()
						})
					if( debugmode ){
						$('<button/>',{
								'class': 	'console',
								'html': 	'Console'
							}).on('click',function(){
								node.win.showDevTools()
							}).prependTo( titlebar.find('.buttons') )
						$('<button/>',{
								'class': 	'console',
								'html': 	'Reload'
							}).on('click',function(){
								location.reload()
							}).prependTo( titlebar.find('.buttons') )
					}
				}

			node.win.show()
			node.win.focus()
		}

		_frame.app_window.is_init = true
	}
}


/* 
 */



_frame.dom = {}




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
	if( this.settings )
		return this

	this.settings = $.extend(
			true,
			{},
			this.defaults,
			settings || {}
		)
	
	this.init()
}

_menu.prototype.defaults = {
	// 菜单项目
		'items': 		[],
	// 目标元素，如果存在，会根据该元素计算菜单呼出位置
		'target': 		null,
	// 追加样式
		'className': 	null,
	// 显示虚化背景
		'showBlured':	true
}

_menu.prototype.init = function(){
	var self = this

	// 创建DOM
		this.dom = {}
		this.dom.menu 	= $('<div class="menu"/>')
							.addClass(this.settings.className)
							.on('click', function(){
								self.hide()
							})
							.appendTo(_frame.menu.dom.container)
		this.dom.body 	= $('<div class="body"/>').appendTo(this.dom.menu)
	
	// 绑定transitionend事件，自动触发隐藏函数
		this.dom.menu.on({
			'transitionend.menu_hide': function(e){
				if( e.currentTarget == e.target
					&& e.originalEvent.propertyName == 'opacity'
					&& parseFloat(self.dom.menu.css('opacity')) === 0
				){
					self.hideTrue()
				}
			}
		})
	
	// 创建全部菜单项目
		for(var i in this.settings.items){
			var menuitem = self.settings.items[i]
			switch( menuitem ){
				case 'separator':
					menuitem = $('<hr/>')
					break;
			}
			self.appendItem( menuitem )
		}

	_frame.menu.menus.push(this)
}

_menu.prototype.show = function( targetEl ){
	if( this.showing )
		return this

	var self = this
	targetEl = targetEl || this.settings.target
	
	clearTimeout(_frame.menu.timeout_hideall)
	_frame.menu.timeout_hideall = null

	// addClass: show
		this.dom.menu.addClass('show')
		_frame.menu.dom.container.addClass('on')
	
	// 设置状态
		this.showing = true
	
	// 触发所有子元素的onshow事件
		this.dom.body.children().trigger('show')

	// 计算并设置位置
		if( targetEl instanceof jQuery ){
			var offset = targetEl.offset()
				,top	= offset.top + targetEl.height() - $body.scrollTop()
				,viewport_height	= $window.height()
				,menu_height		= this.dom.menu.outerHeight()
			this.dom.menu.css({
				'top': 		top + menu_height > viewport_height
								? viewport_height - menu_height
								: top,
				'left': 	offset.left - $body.scrollLeft()
			})
		}

	// 虚化背景
		if( this.settings.showBlured ){
			node.win.capturePage(function(datauri){
				if( self.showing ){
					self.dom.blured = $('<s class="blured"/>').css('background-image', 'url('+datauri+')').appendTo( self.dom.menu.addClass('on') )
				}
			}, 'jpg', 'datauri')
		}else{
			this.dom.menu.addClass('on')
		}
}

_menu.prototype.hide = function(){
	if( !this.showing )
		return false

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
	
	// 移除虚化背景DOM
		if( this.dom.blured instanceof jQuery ){
			this.dom.blured.remove()
			delete this.dom.blured
		}
	
	// 重置状态
		this.showing = false
		_frame.menu.dom.container.removeClass('on')
}

_menu.prototype.appendItem = function(item){
	if( item instanceof jQuery )
		return item.appendTo( this.dom.body )
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
						_frame.menu.timeout_hideall = setTimeout(function(){
							for(var i in _frame.menu.menus){
								if( _frame.menu.menus[i].hide )
									_frame.menu.menus[i].hide()
							}
							_frame.menu.timeout_hideall = null
						}, ms || 1)
					},
					'contextmenu': function(){
						_frame.menu.dom.container.trigger('click')
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
			'classname': 	'',

		// 尺寸，CSS标准
			//'width': 		'75%',
			//'height': 	'75%',

		// 是否显示模糊背景，模拟毛玻璃特效
			'showBlured': 	true,

		// 是否允许点击空白区域隐藏modal
			//'blank_to_close': 	false
	},

	show: function(content, title, options, callback){
		clearTimeout( _frame.modal.hide_timeout )
		_frame.modal.hide_timeout = null

		_frame.modal.dom.container.addClass('show')
		_frame.modal.showing = true

		var settings = $.extend( {}, _frame.modal.defaults, options );

		//_frame.modal.dom.content.empty()
		content.appendTo( _frame.modal.dom.content )

		//_frame.modal.dom.container.removeClass( _frame.modal.dom.container.data('customclass') )

		//if( _frame.modal.dom.blured ){
		//	_frame.modal.dom.blured.remove()
		//	_frame.modal.dom.blured = null
		//}

		if( title ){
			_frame.modal.dom.titlebar.html(title)
			_frame.modal.dom.container.addClass('hastitle')
		}else{
			_frame.modal.dom.titlebar.html('')
			_frame.modal.dom.container.removeClass('hastitle')
		}

		_frame.modal.dom.box.css({
			'width': 	settings.width || null,
			'height': 	settings.height || null
		})

		if( settings.showBlured ){
			if( !_frame.modal.dom.blured )
				node.win.capturePage(function(datauri){
					//_frame.modal.dom.blured = $('<img/>').attr('src', datauri).appendTo(_frame.modal.dom.container)
					//_frame.modal.dom.blured = $('<s/>').css('background-image', 'url('+datauri+')').appendTo(_frame.modal.dom.container)
					/*_frame.modal.dom.blured = $('<s/>')
												.append( $('<img/>').attr('src', datauri) )
												.appendTo(_frame.modal.dom.container)*/
					_frame.modal.dom.blured = $('<img/>').attr('src', datauri)
												.appendTo( _frame.modal.dom.bg )
				}, 'jpg', 'datauri')
			_frame.modal.dom.container.addClass('bluredbg')
		}//else{
		//	_frame.modal.dom.container.removeClass('bluredbg')
		//}

		_frame.modal.dom.container.addClass('on ' + settings.classname).data('customclass', settings.classname)
		_p.initDOM( _frame.modal.dom.content )

		_frame.modal.dom.bg.off('click.blank_to_close').on('click.blank_to_close', function(){
			if( settings.blank_to_close ){
				_frame.modal.dom.btn_close.trigger('click')
			}
		})

		if( callback )
			callback( _frame.modal.dom.content )
	},

	hide: function(){
		if( !_frame.modal.showing )
			return false

		clearTimeout( _frame.modal.hide_timeout )
		_frame.modal.hide_timeout = null
		_frame.modal.dom.container.off('transitionend.modal_hide').on({
										'transitionend.modal_hide': function(e){
											if( e.currentTarget == e.target && e.originalEvent.propertyName == 'opacity' ){
												switch( parseFloat($(this).css('opacity')) ){
													case 0:
														_frame.modal.hide_timeout = setTimeout(function(){
															_frame.modal.reset()
															_frame.modal.dom.container
																.removeClass('show')
																.off('transitionend.modal_hide')
															_frame.modal.showing = false
														}, 10)
														break;
												}
											}
										}
									}).removeClass('on')
	},
	//hide_timeout,

	reset: function(){
		_frame.modal.resetContent()

		if( _frame.modal.dom.blured ){
			if( !parseInt(_frame.modal.dom.container.css('opacity')) ){
				_frame.modal.dom.blured.remove()
				_frame.modal.dom.blured = null
			}
			_frame.modal.dom.container.removeClass('bluredbg')
		}
	},

	resetContent: function(){
		_frame.modal.dom.content.empty()

		_frame.modal.dom.container.removeClass( _frame.modal.dom.container.data('customclass') )
		_frame.modal.dom.container.data('customclass', '')

		_frame.modal.dom.titlebar.html('')
		_frame.modal.dom.container.removeClass('hastitle')
	}
}







// 初始化
_frame.modal.init = function(){
	if( _frame.modal.is_init )
		return true

	_frame.modal.dom.container = $('<div class="container modal" />').prependTo($body)
		_frame.modal.dom.box = $('<div/>').appendTo(_frame.modal.dom.container)
			_frame.modal.dom.titlebar = $('<header/>').appendTo(_frame.modal.dom.box)
			_frame.modal.dom.content = $('<section/>').appendTo(_frame.modal.dom.box)
			_frame.modal.dom.btn_close = $('<button class="close" />').html('&times;').on('click',function(){_frame.modal.hide()}).appendTo(_frame.modal.dom.box)
		_frame.modal.dom.bg = $('<s/>').appendTo(_frame.modal.dom.container)

	_hotkey.bind(
		'27',
		function(){
			_frame.modal.hide()
		}
	)


	_frame.modal.is_init = true
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
		if(_p.tip.is_init)
			return false

		_p.tip.dom = $('<div id="tip"/>')
						.on('transitionend', function(e){
							if( e.currentTarget == e.target && e.originalEvent.propertyName == 'opacity' && parseFloat(_p.tip.dom.css('opacity')) == 0 ){
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
								_p.tip.dom_bluredbg.css('background-image', '')
							}
						})
						.appendTo($body)

		_p.tip.dom_body = $('<div class="body"/>').appendTo(_p.tip.dom)
		_p.tip.dom_bluredbg = $('<div/>').appendTo($('<div class="bluredbg"/>').appendTo(_p.tip.dom))

		// 注册ESC热键
		//_frame.global.esc_register(function(){
		//	_p.tip.hide(true)
		//})

		_p.tip.is_init=true
	},

	// 显示
	// cont:	HTML内容
	// el:		触发tip的DOM，通常为鼠标指向位置
	// pos:		tip位置
	show: function( cont, el, pos ){
		// 如果为非指针指向，不执行
		// 无内容则不执行
		if( $('body').data('preventMouseover') || !cont )
			return false

		clearTimeout(_p.tip.timeout_fade)
		_p.tip.timeout_fade = null

		//if( el )
		//	el.data('tip-indicator-pos-original', el.attr('data-tip-indicator-pos') || null)

		el = el || 'body';
		_p.tip.el = $(el)

		pos = pos || _p.tip.pos

		// tip已显示则不运行之后的函数
		//if( _p.tip.is_showing )
			//return true

		cont = _p.tip.content(cont)

		_p.tip.init_global();

		if( !_p.tip.dom.hasClass('show') ){
			node.win.capturePage(function(datauri){
				_p.tip.dom_bluredbg.css(
					'background-image',
					'url('+datauri+')'
				)
			}, 'jpg', 'datauri')
			_p.tip.dom.addClass('show')
		}

		_p.tip.position( cont, pos );

		_p.tip.is_showing=true;
	},

	// 计算tip位置
	position:function(cont, pos){
		var hashcode = cont.hashCode()

		if( _p.tip.curContent != hashcode ){
			_p.tip.dom.css({
					top:	'-1000px',
					left:	'-1000px'
				})
			_p.tip.dom_body.html(cont)
			_p.initDOM( _p.tip.dom_body )
			/*
			_p.tip.dom.css({
					top:	'-1000px',
					left:	'-1000px'
				}).html(cont)
			_p.initDOM( _p.tip.dom )
			*/

			_p.tip.curContent = hashcode
		}

		var coords = _p.tip['pos_'+pos]( _p.tip.dom.outerWidth() , _p.tip.dom.outerHeight() );
		if(coords){
			_p.tip.move(coords.x, coords.y)
		}
	},

	// 隐藏tip
	// is_instant：瞬间隐藏，没有延迟
	hide:function( is_instant ){
		if( !_p.tip.is_init || !_p.tip.is_showing )
			return false

		_p.tip.timeout_fade = setTimeout(function(){
			_p.tip.el = null

			_p.tip.dom.removeClass('on')

			_p.tip.is_showing = false
			_p.tip.curContent = null
		}, is_instant ? 0 : _p.tip.countdown_fade)
	},
	
	// 格式化tip内容
	content: function( cont, el ){
		el = el || _p.tip.el
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
		_p.tip.dom.css({
			top:	y,
			left:	x
		}).addClass('on')
	},

	// 获取小箭头尺寸
	get_indicator_size: function(){
		return _p.tip.size_indicator * _g.baseMultiper;
	},

	// tip位置函数
	pos_mouse: function(w,h){
		_p.tip.el.unbind('mousemove.tooltip').bind('mousemove.tooltip',function(e){
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
		var el		= _p.tip.el
			,dom	= _p.tip.dom
			,offset	= el.offset()
			,x		= offset.left + ( el.outerWidth() - dom.outerWidth() )/2
			,y		= offset.top + el.outerHeight() + _p.tip.get_indicator_size()

		_p.tip.dom.attr('data-tip-indicator-pos', 'top' )

		return _p.tip.checkpos(x,y,w,h)
	},
	pos_top: function(w,h){
		var el		= _p.tip.el
			,dom	= _p.tip.dom
			,offset	= el.offset()
			,x		= offset.left + ( el.outerWidth() - dom.outerWidth() )/2
			,y		= offset.top - h - _p.tip.get_indicator_size()

		_p.tip.dom.attr('data-tip-indicator-pos', 'bottom' )

		return _p.tip.checkpos(x,y,w,h)
	},
	pos_left: function(w,h){
		var el		= _p.tip.el
			,dom	= _p.tip.dom
			,offset	= el.offset()
			,x		= offset.left - w - _p.tip.get_indicator_size()
			,y		= offset.top + ( el.outerHeight() - dom.outerHeight() )/2

		_p.tip.dom.attr('data-tip-indicator-pos', 'right' )

		return _p.tip.checkpos(x,y,w,h)
	},
	pos_right: function(w,h){
		var el		= _p.tip.el
			,dom	= _p.tip.dom
			,offset	= el.offset()
			,x		= offset.left + el.outerWidth() + _p.tip.get_indicator_size()
			,y		= offset.top + ( el.outerHeight() - dom.outerHeight() )/2

		_p.tip.dom.attr('data-tip-indicator-pos', 'left' )

		return _p.tip.checkpos(x,y,w,h)
	},
	checkpos: function(x,y,w,h){
		var el = _p.tip.el
			,dom = _p.tip.dom
			,offset = el.offset()
			,nx = x
			,ny = y
			,pos = {x:nx,y:ny}

			,clientWidth = $document.width() || $window.width()

		// 超出X轴右边界
		if ((x + w) > clientWidth ){
			if( w > el.offset().left ){
				pos = {
					'x': clientWidth - w - 2,
					'y': y
				}
			}else{
				//nx = offset.left - w;
				pos = _p.tip['pos_left']( w , h )
			}
		}

		// 超出X轴左边界
		else if (x < 0)
			//nx = 15;
			pos = _p.tip['pos_right']( w , h )

		// 超出Y轴下边界
		if ( (y + h) > ($(window).scrollTop() + $(window).height()) )
			//ny = _p.tip.pos == 'bottom' ? ( offset.top - _p.tip.el.outerHeight() ) : ( $(window).scrollTop() + $(window).height() - h );
			pos = _p.tip['pos_top']( w , h )

			/*
		// Node on top of viewport scroll
		else if ((offset.top - 100) < $(window).scrollTop())
			ny = offset.top + _p.tip.el.outerHeight();

		// Less than y viewport scrolled
		else if (y < $(window).scrollTop())
			ny = $(window).scrollTop() + 10;

		// Less than y viewport
		else if (y < 0)
			ny = 15;*/

		// 超出Y轴上边界
		else if ( y < $(window).scrollTop() )
			//ny = _p.tip.pos == 'bottom' ? ( offset.top - _p.tip.el.outerHeight() ) : ( $(window).scrollTop() + $(window).height() - h );
			pos = _p.tip['pos_bottom']( w , h )

		dom.attr({
			'data-tip-indicator-offset-x': (x - nx)+'px',
			'data-tip-indicator-offset-y': (y - ny)+'px'
		})
		return pos
	}
};





_p.el.tip = {
	// isInit: false,

	init: function(){
		if( _p.el.tip.isInit )
			return false

		$body.on( 'mouseenter._tip', '[data-tip]', function(){
				if( $body_preventMouseover )
					return false

				var el 			= $(this)
					,cont 		= el.data('tip')

				if( !el.data('tip-filtered') ){
					for( var i in _p.tip.filters )
						cont = _p.tip.filters[i](cont) || cont
					el.data({
						'tip': 				cont,
						'tip-filtered': 	true
					})
				}

				_p.tip.show(
					cont,
					el,
					el.data('tip-position')
				)
			})
			.on( 'mouseleave._tip', '[data-tip]', function(){
				_p.tip.hide()
			})
			.on( 'click._tip', '[data-tip]', function(){
				_p.tip.hide(true)
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

				if( this.hostname != window.location.hostname )
					target = '_external'

				if( target == '_external' || target == '_blank' ){
					node.gui.Shell.openExternal($(this).attr('href'));
					e.preventDefault()
					return true
				}

				_p.el.links.click($(this), e)
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

/*
 */

_p.el.table = {
	dom: {},
	// is_init: false,


	/*
	hover_column_getTable: function( td ){
		function _check( el ){
			if( el[0].tagName.toLowerCase() == 'table' )
				return el
			
			return _check( el.parent() )
		}
		return _check( td.parent() )
	},
	hover_column_getTr: function( td ){
		function _check( el ){
			if( el[0].tagName.toLowerCase() == 'tr' )
				return el
			
			return _check( el.parent() )
		}
		return _check( td.parent() )
	},*/
	hover_column_getTable: function( path ){
		function _check( index ){
			if( path[index].tagName.toLowerCase() == 'table' )
				return $(path[index])
			
			return _check( index + 1 )
		}
		return _check( 0 )
	},
	hover_column_getTr: function( path ){
		function _check( index ){
			if( path[index].tagName.toLowerCase() == 'tr' )
				return $(path[index])
			
			return _check( index + 1 )
		}
		return _check( 0 )
	},
	hover_column_mouseenter: function( table, td_index ){
		table//.attr( 'td-nth-hovered', parseInt(td_index) + 1 )
			.find('tbody tr td:nth-of-type(' + ( parseInt(td_index) + 1 ) + ')').addClass('state-hover-column')
	},
	hover_column_mouseleave: function( table, td_index ){
		table//.attr( 'td-nth-hovered', '' )
			.find('tbody tr td:nth-of-type(' + ( parseInt(td_index) + 1 ) + ')').removeClass('state-hover-column')
	},



	init_el: function(el){
		if( el.data('is_init_table') )
			return true


		el.data('is_init_table', true)
	},
	
	
	
	
	
	
	
	

	init: function(tar, els){
		tar = tar || $body;
		els = els || tar.find('table')

		if( !_p.el.table.is_init ){
			/*
			$html.on('mouseenter.tablehover-column', 'body.hover table.hashover-column tbody td', function(){
				//$(this).addClass('state-hover-column')
				var td = $(this).on('mouseleave.tablehover-column', function(){
							_p.el.table.hover_column_mouseleave( table, index )
							$(this).off('mouseleave.tablehover-column')
						})
					,table = _p.el.table.hover_column_getTable( td )
					,tr = _p.el.table.hover_column_getTr( td )
					// index starts from 0
					,index = $.inArray( td[0], tr.find('td') )

				_p.el.table.hover_column_mouseenter( table, index )
			})
			*/
			$html.on('mouseenter.tablehover-column', 'body.hover table.hashover-column tbody td', function(e){
				var path = e.originalEvent.path
					,td = $(this).on('mouseleave.tablehover-column', function(){
							_p.el.table.hover_column_mouseleave( table, index )
							td.off('mouseleave.tablehover-column')
						})
					,table = _p.el.table.hover_column_getTable( path )
					,tr = _p.el.table.hover_column_getTr( path )
					// index starts from 0
					,index = $.inArray( td[0], tr.find('td') )
				_p.el.table.hover_column_mouseenter( table, index )
			})
			_p.el.table.is_init = true
		}

		els.each(function(){
			_p.el.table.init_el($(this))
		})
	}
};

/*
 */

_p.el.tabview = {
	dom: {},
	index: 0,

	init_el: function(el){
		if( el.data('is_init_tabview') )
			return true

		var tabid = 'tabv' + _p.el.tabview.index
			,tabc = el.children('section')
			,tabs = $('<header/>').prependTo( el )

		_p.el.tabview.dom[tabid] = el

		tabc.each(function(index){
			var _id = '_tabview-'+tabid+'-'+(index+1)
				,_content = $(this)
				,title = _content.data('tabname')
			// 创建radio input
				$('<input />',{
						'type': 	'radio',
						'name': 	'_tabview-'+tabid,
						'id': 		_id,
						'value': 	(index + 1),
						'class': 	'tabview-switch'
					})
					.data('tabview-content', _content)
					.prop('checked', (index == 0))
					.on('change', function(){
						if($(this).prop('checked')){
							$(this).data('tabview-content').trigger('tabview-show')
							_g.uriHash('tv_'+tabid, (index+1))
						}else{
							$(this).data('tabview-content').trigger('tabview-hide')
						}
					})
					.prependTo( el )
			// 创建各tabview-tabs button
				$('<label/>',{
						'for': 		_id,
						'html': 	title
					}).appendTo( tabs )

			if( !index )
				_content.trigger('tabview-show')
		})

		_p.el.tabview.index++

		$window.on('hashchange.tabview-'+tabid, function(){
			var hash = _g.uriHash('tv_'+tabid)
			if( hash ){
				_p.el.tabview.dom[tabid].children('input[type="radio"].tabview-switch[value="'+hash+'"]').prop('checked')
			}
		})

		el.data('is_init_tabview', true)
	},
	
	
	
	
	
	
	
	

	init: function(tar, els){
		tar = tar || $body;
		els = els || tar.find('.tabview')

		els.each(function(){
			_p.el.tabview.init_el($(this))
		})
	}
};

$document.ready(function(){

	var timeStart = _g.timeNow()

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

	var timeEnd = _g.timeNow()
		,t = timeEnd - timeStart

	//console.log(
	//	'time initializing: '+ (timeEnd - timeStart) +'ms'
	//)

	if( t > 5000 || bMobile ){
		$html.addClass('no-transition')
	}
})

/*
 my base framework for nw.js project: https://github.com/Diablohu/nw.js-base-framework
 */

// @koala-prepend "js-base/!.js"

// @koala-prepend "js-base/libs/jquery-2.1.3.min.js"

// @koala-prepend "js-base/_g-variables.js"
// @koala-prepend "js-base/_g.js"
// @koala-prepend "js-base/_p.js"

// @koala-prepend "js-base/libs/visibility/visibility.core.js"
// @koala-prepend "js-base/libs/jquery.mousewheel.js"

// @koala-prepend "js-base/prototype/Array.js"
// @koala-prepend "js-base/prototype/date.js"
// @koala-prepend "js-base/prototype/object.js"
// @koala-prepend "js-base/prototype/string.js"

// @koala-prepend "js-base/templates/_.js"

// @koala-prepend "js-base/hotkey/_.js"

// @koala-prepend "js-base/form/_.js"

// @koala-prepend "js-base/node-webkit/!global.js"
// @koala-prepend "js-base/node-webkit/configuration.js"
// @koala-prepend "js-base/node-webkit/menu.js"
// @koala-prepend "js-base/node-webkit/window.js"

// @koala-prepend "js-base/frame/_global.js"
// @koala-prepend "js-base/frame/menu.js"
// @koala-prepend "js-base/frame/modal.js"
// @koala-prepend "js-base/frame/tip.js"

// @koala-prepend "js-base/elements/_a.js"
// @koala-prepend "js-base/elements/form.js"
// @koala-prepend "js-base/elements/flexgrid.js"
// @koala-prepend "js-base/elements/input.js"
// @koala-prepend "js-base/elements/table.js"
// @koala-prepend "js-base/elements/tabview.js"

// @koala-prepend "js-base/!last.js"