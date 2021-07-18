/*! jQuery v2.1.3 | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k={},l=a.document,m="2.1.3",n=function(a,b){return new n.fn.init(a,b)},o=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};n.fn=n.prototype={jquery:m,constructor:n,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=n.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return n.each(this,a,b)},map:function(a){return this.pushStack(n.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},n.extend=n.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||n.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(n.isPlainObject(d)||(e=n.isArray(d)))?(e?(e=!1,f=c&&n.isArray(c)?c:[]):f=c&&n.isPlainObject(c)?c:{},g[b]=n.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},n.extend({expando:"jQuery"+(m+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===n.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){return!n.isArray(a)&&a-parseFloat(a)+1>=0},isPlainObject:function(a){return"object"!==n.type(a)||a.nodeType||n.isWindow(a)?!1:a.constructor&&!j.call(a.constructor.prototype,"isPrototypeOf")?!1:!0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(a){var b,c=eval;a=n.trim(a),a&&(1===a.indexOf("use strict")?(b=l.createElement("script"),b.text=a,l.head.appendChild(b).parentNode.removeChild(b)):c(a))},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=s(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(o,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?n.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:g.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;c>d;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=s(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(c=a[b],b=a,a=c),n.isFunction(a)?(e=d.call(arguments,2),f=function(){return a.apply(b||this,e.concat(d.call(arguments)))},f.guid=a.guid=a.guid||n.guid++,f):void 0},now:Date.now,support:k}),n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function s(a){var b=a.length,c=n.type(a);return"function"===c||n.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=hb(),z=hb(),A=hb(),B=function(a,b){return a===b&&(l=!0),0},C=1<<31,D={}.hasOwnProperty,E=[],F=E.pop,G=E.push,H=E.push,I=E.slice,J=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},K="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",L="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",N=M.replace("w","w#"),O="\\["+L+"*("+M+")(?:"+L+"*([*^$|!~]?=)"+L+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+N+"))|)"+L+"*\\]",P=":("+M+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+O+")*)|.*)\\)|)",Q=new RegExp(L+"+","g"),R=new RegExp("^"+L+"+|((?:^|[^\\\\])(?:\\\\.)*)"+L+"+$","g"),S=new RegExp("^"+L+"*,"+L+"*"),T=new RegExp("^"+L+"*([>+~]|"+L+")"+L+"*"),U=new RegExp("="+L+"*([^\\]'\"]*?)"+L+"*\\]","g"),V=new RegExp(P),W=new RegExp("^"+N+"$"),X={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),TAG:new RegExp("^("+M.replace("w","w*")+")"),ATTR:new RegExp("^"+O),PSEUDO:new RegExp("^"+P),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+L+"*(even|odd|(([+-]|)(\\d*)n|)"+L+"*(?:([+-]|)"+L+"*(\\d+)|))"+L+"*\\)|)","i"),bool:new RegExp("^(?:"+K+")$","i"),needsContext:new RegExp("^"+L+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+L+"*((?:-\\d)?\\d*)"+L+"*\\)|)(?=[^-]|$)","i")},Y=/^(?:input|select|textarea|button)$/i,Z=/^h\d$/i,$=/^[^{]+\{\s*\[native \w/,_=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ab=/[+~]/,bb=/'|\\/g,cb=new RegExp("\\\\([\\da-f]{1,6}"+L+"?|("+L+")|.)","ig"),db=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},eb=function(){m()};try{H.apply(E=I.call(v.childNodes),v.childNodes),E[v.childNodes.length].nodeType}catch(fb){H={apply:E.length?function(a,b){G.apply(a,I.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function gb(a,b,d,e){var f,h,j,k,l,o,r,s,w,x;if((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,d=d||[],k=b.nodeType,"string"!=typeof a||!a||1!==k&&9!==k&&11!==k)return d;if(!e&&p){if(11!==k&&(f=_.exec(a)))if(j=f[1]){if(9===k){if(h=b.getElementById(j),!h||!h.parentNode)return d;if(h.id===j)return d.push(h),d}else if(b.ownerDocument&&(h=b.ownerDocument.getElementById(j))&&t(b,h)&&h.id===j)return d.push(h),d}else{if(f[2])return H.apply(d,b.getElementsByTagName(a)),d;if((j=f[3])&&c.getElementsByClassName)return H.apply(d,b.getElementsByClassName(j)),d}if(c.qsa&&(!q||!q.test(a))){if(s=r=u,w=b,x=1!==k&&a,1===k&&"object"!==b.nodeName.toLowerCase()){o=g(a),(r=b.getAttribute("id"))?s=r.replace(bb,"\\$&"):b.setAttribute("id",s),s="[id='"+s+"'] ",l=o.length;while(l--)o[l]=s+rb(o[l]);w=ab.test(a)&&pb(b.parentNode)||b,x=o.join(",")}if(x)try{return H.apply(d,w.querySelectorAll(x)),d}catch(y){}finally{r||b.removeAttribute("id")}}}return i(a.replace(R,"$1"),b,d,e)}function hb(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ib(a){return a[u]=!0,a}function jb(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function kb(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function lb(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||C)-(~a.sourceIndex||C);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function mb(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function nb(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function ob(a){return ib(function(b){return b=+b,ib(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function pb(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=gb.support={},f=gb.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=gb.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=g.documentElement,e=g.defaultView,e&&e!==e.top&&(e.addEventListener?e.addEventListener("unload",eb,!1):e.attachEvent&&e.attachEvent("onunload",eb)),p=!f(g),c.attributes=jb(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=jb(function(a){return a.appendChild(g.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=$.test(g.getElementsByClassName),c.getById=jb(function(a){return o.appendChild(a).id=u,!g.getElementsByName||!g.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(cb,db);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(cb,db);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=$.test(g.querySelectorAll))&&(jb(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\f]' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+L+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+L+"*(?:value|"+K+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),jb(function(a){var b=g.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+L+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=$.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&jb(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",P)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=$.test(o.compareDocumentPosition),t=b||$.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===g||a.ownerDocument===v&&t(v,a)?-1:b===g||b.ownerDocument===v&&t(v,b)?1:k?J(k,a)-J(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,h=[a],i=[b];if(!e||!f)return a===g?-1:b===g?1:e?-1:f?1:k?J(k,a)-J(k,b):0;if(e===f)return lb(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)i.unshift(c);while(h[d]===i[d])d++;return d?lb(h[d],i[d]):h[d]===v?-1:i[d]===v?1:0},g):n},gb.matches=function(a,b){return gb(a,null,null,b)},gb.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(U,"='$1']"),!(!c.matchesSelector||!p||r&&r.test(b)||q&&q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return gb(b,n,null,[a]).length>0},gb.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},gb.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&D.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},gb.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},gb.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=gb.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=gb.selectors={cacheLength:50,createPseudo:ib,match:X,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(cb,db),a[3]=(a[3]||a[4]||a[5]||"").replace(cb,db),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||gb.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&gb.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return X.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&V.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(cb,db).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+L+")"+a+"("+L+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=gb.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(Q," ")+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){k=q[u]||(q[u]={}),j=k[a]||[],n=j[0]===w&&j[1],m=j[0]===w&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[w,n,m];break}}else if(s&&(j=(b[u]||(b[u]={}))[a])&&j[0]===w)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(s&&((l[u]||(l[u]={}))[a]=[w,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||gb.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ib(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=J(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ib(function(a){var b=[],c=[],d=h(a.replace(R,"$1"));return d[u]?ib(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ib(function(a){return function(b){return gb(a,b).length>0}}),contains:ib(function(a){return a=a.replace(cb,db),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ib(function(a){return W.test(a||"")||gb.error("unsupported lang: "+a),a=a.replace(cb,db).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Z.test(a.nodeName)},input:function(a){return Y.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:ob(function(){return[0]}),last:ob(function(a,b){return[b-1]}),eq:ob(function(a,b,c){return[0>c?c+b:c]}),even:ob(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:ob(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:ob(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:ob(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=mb(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=nb(b);function qb(){}qb.prototype=d.filters=d.pseudos,d.setFilters=new qb,g=gb.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=S.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=T.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(R," ")}),h=h.slice(c.length));for(g in d.filter)!(e=X[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?gb.error(a):z(a,i).slice(0)};function rb(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function sb(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[u]||(b[u]={}),(h=i[d])&&h[0]===w&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function tb(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function ub(a,b,c){for(var d=0,e=b.length;e>d;d++)gb(a,b[d],c);return c}function vb(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function wb(a,b,c,d,e,f){return d&&!d[u]&&(d=wb(d)),e&&!e[u]&&(e=wb(e,f)),ib(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||ub(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:vb(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=vb(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?J(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=vb(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):H.apply(g,r)})}function xb(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=sb(function(a){return a===b},h,!0),l=sb(function(a){return J(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];f>i;i++)if(c=d.relative[a[i].type])m=[sb(tb(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return wb(i>1&&tb(m),i>1&&rb(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(R,"$1"),c,e>i&&xb(a.slice(i,e)),f>e&&xb(a=a.slice(e)),f>e&&rb(a))}m.push(c)}return tb(m)}function yb(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,m,o,p=0,q="0",r=f&&[],s=[],t=j,u=f||e&&d.find.TAG("*",k),v=w+=null==t?1:Math.random()||.1,x=u.length;for(k&&(j=g!==n&&g);q!==x&&null!=(l=u[q]);q++){if(e&&l){m=0;while(o=a[m++])if(o(l,g,h)){i.push(l);break}k&&(w=v)}c&&((l=!o&&l)&&p--,f&&r.push(l))}if(p+=q,c&&q!==p){m=0;while(o=b[m++])o(r,s,g,h);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=F.call(i));s=vb(s)}H.apply(i,s),k&&!f&&s.length>0&&p+b.length>1&&gb.uniqueSort(i)}return k&&(w=v,j=t),r};return c?ib(f):f}return h=gb.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=xb(b[c]),f[u]?d.push(f):e.push(f);f=A(a,yb(e,d)),f.selector=a}return f},i=gb.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(cb,db),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=X.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(cb,db),ab.test(j[0].type)&&pb(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&rb(j),!a)return H.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,ab.test(a)&&pb(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=jb(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),jb(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||kb("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&jb(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||kb("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),jb(function(a){return null==a.getAttribute("disabled")})||kb(K,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),gb}(a);n.find=t,n.expr=t.selectors,n.expr[":"]=n.expr.pseudos,n.unique=t.uniqueSort,n.text=t.getText,n.isXMLDoc=t.isXML,n.contains=t.contains;var u=n.expr.match.needsContext,v=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,w=/^.[^:#\[\.,]*$/;function x(a,b,c){if(n.isFunction(b))return n.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return n.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(w.test(b))return n.filter(b,a,c);b=n.filter(b,a)}return n.grep(a,function(a){return g.call(b,a)>=0!==c})}n.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?n.find.matchesSelector(d,a)?[d]:[]:n.find.matches(a,n.grep(b,function(a){return 1===a.nodeType}))},n.fn.extend({find:function(a){var b,c=this.length,d=[],e=this;if("string"!=typeof a)return this.pushStack(n(a).filter(function(){for(b=0;c>b;b++)if(n.contains(e[b],this))return!0}));for(b=0;c>b;b++)n.find(a,e[b],d);return d=this.pushStack(c>1?n.unique(d):d),d.selector=this.selector?this.selector+" "+a:a,d},filter:function(a){return this.pushStack(x(this,a||[],!1))},not:function(a){return this.pushStack(x(this,a||[],!0))},is:function(a){return!!x(this,"string"==typeof a&&u.test(a)?n(a):a||[],!1).length}});var y,z=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,A=n.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:z.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||y).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof n?b[0]:b,n.merge(this,n.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:l,!0)),v.test(c[1])&&n.isPlainObject(b))for(c in b)n.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}return d=l.getElementById(c[2]),d&&d.parentNode&&(this.length=1,this[0]=d),this.context=l,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):n.isFunction(a)?"undefined"!=typeof y.ready?y.ready(a):a(n):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),n.makeArray(a,this))};A.prototype=n.fn,y=n(l);var B=/^(?:parents|prev(?:Until|All))/,C={children:!0,contents:!0,next:!0,prev:!0};n.extend({dir:function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&n(a).is(c))break;d.push(a)}return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),n.fn.extend({has:function(a){var b=n(a,this),c=b.length;return this.filter(function(){for(var a=0;c>a;a++)if(n.contains(this,b[a]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=u.test(a)||"string"!=typeof a?n(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&n.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?n.unique(f):f)},index:function(a){return a?"string"==typeof a?g.call(n(a),this[0]):g.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(n.unique(n.merge(this.get(),n(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function D(a,b){while((a=a[b])&&1!==a.nodeType);return a}n.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return n.dir(a,"parentNode")},parentsUntil:function(a,b,c){return n.dir(a,"parentNode",c)},next:function(a){return D(a,"nextSibling")},prev:function(a){return D(a,"previousSibling")},nextAll:function(a){return n.dir(a,"nextSibling")},prevAll:function(a){return n.dir(a,"previousSibling")},nextUntil:function(a,b,c){return n.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return n.dir(a,"previousSibling",c)},siblings:function(a){return n.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return n.sibling(a.firstChild)},contents:function(a){return a.contentDocument||n.merge([],a.childNodes)}},function(a,b){n.fn[a]=function(c,d){var e=n.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=n.filter(d,e)),this.length>1&&(C[a]||n.unique(e),B.test(a)&&e.reverse()),this.pushStack(e)}});var E=/\S+/g,F={};function G(a){var b=F[a]={};return n.each(a.match(E)||[],function(a,c){b[c]=!0}),b}n.Callbacks=function(a){a="string"==typeof a?F[a]||G(a):n.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(b=a.memory&&l,c=!0,g=e||0,e=0,f=h.length,d=!0;h&&f>g;g++)if(h[g].apply(l[0],l[1])===!1&&a.stopOnFalse){b=!1;break}d=!1,h&&(i?i.length&&j(i.shift()):b?h=[]:k.disable())},k={add:function(){if(h){var c=h.length;!function g(b){n.each(b,function(b,c){var d=n.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&g(c)})}(arguments),d?f=h.length:b&&(e=c,j(b))}return this},remove:function(){return h&&n.each(arguments,function(a,b){var c;while((c=n.inArray(b,h,c))>-1)h.splice(c,1),d&&(f>=c&&f--,g>=c&&g--)}),this},has:function(a){return a?n.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],f=0,this},disable:function(){return h=i=b=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,b||k.disable(),this},locked:function(){return!i},fireWith:function(a,b){return!h||c&&!i||(b=b||[],b=[a,b.slice?b.slice():b],d?i.push(b):j(b)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!c}};return k},n.extend({Deferred:function(a){var b=[["resolve","done",n.Callbacks("once memory"),"resolved"],["reject","fail",n.Callbacks("once memory"),"rejected"],["notify","progress",n.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return n.Deferred(function(c){n.each(b,function(b,f){var g=n.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&n.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?n.extend(a,d):d}},e={};return d.pipe=d.then,n.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&n.isFunction(a.promise)?e:0,g=1===f?a:n.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&n.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var H;n.fn.ready=function(a){return n.ready.promise().done(a),this},n.extend({isReady:!1,readyWait:1,holdReady:function(a){a?n.readyWait++:n.ready(!0)},ready:function(a){(a===!0?--n.readyWait:n.isReady)||(n.isReady=!0,a!==!0&&--n.readyWait>0||(H.resolveWith(l,[n]),n.fn.triggerHandler&&(n(l).triggerHandler("ready"),n(l).off("ready"))))}});function I(){l.removeEventListener("DOMContentLoaded",I,!1),a.removeEventListener("load",I,!1),n.ready()}n.ready.promise=function(b){return H||(H=n.Deferred(),"complete"===l.readyState?setTimeout(n.ready):(l.addEventListener("DOMContentLoaded",I,!1),a.addEventListener("load",I,!1))),H.promise(b)},n.ready.promise();var J=n.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===n.type(c)){e=!0;for(h in c)n.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,n.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(n(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f};n.acceptData=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function K(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=n.expando+K.uid++}K.uid=1,K.accepts=n.acceptData,K.prototype={key:function(a){if(!K.accepts(a))return 0;var b={},c=a[this.expando];if(!c){c=K.uid++;try{b[this.expando]={value:c},Object.defineProperties(a,b)}catch(d){b[this.expando]=c,n.extend(a,b)}}return this.cache[c]||(this.cache[c]={}),c},set:function(a,b,c){var d,e=this.key(a),f=this.cache[e];if("string"==typeof b)f[b]=c;else if(n.isEmptyObject(f))n.extend(this.cache[e],b);else for(d in b)f[d]=b[d];return f},get:function(a,b){var c=this.cache[this.key(a)];return void 0===b?c:c[b]},access:function(a,b,c){var d;return void 0===b||b&&"string"==typeof b&&void 0===c?(d=this.get(a,b),void 0!==d?d:this.get(a,n.camelCase(b))):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d,e,f=this.key(a),g=this.cache[f];if(void 0===b)this.cache[f]={};else{n.isArray(b)?d=b.concat(b.map(n.camelCase)):(e=n.camelCase(b),b in g?d=[b,e]:(d=e,d=d in g?[d]:d.match(E)||[])),c=d.length;while(c--)delete g[d[c]]}},hasData:function(a){return!n.isEmptyObject(this.cache[a[this.expando]]||{})},discard:function(a){a[this.expando]&&delete this.cache[a[this.expando]]}};var L=new K,M=new K,N=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,O=/([A-Z])/g;function P(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(O,"-$1").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:N.test(c)?n.parseJSON(c):c}catch(e){}M.set(a,b,c)}else c=void 0;return c}n.extend({hasData:function(a){return M.hasData(a)||L.hasData(a)},data:function(a,b,c){return M.access(a,b,c)
},removeData:function(a,b){M.remove(a,b)},_data:function(a,b,c){return L.access(a,b,c)},_removeData:function(a,b){L.remove(a,b)}}),n.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=M.get(f),1===f.nodeType&&!L.get(f,"hasDataAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=n.camelCase(d.slice(5)),P(f,d,e[d])));L.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){M.set(this,a)}):J(this,function(b){var c,d=n.camelCase(a);if(f&&void 0===b){if(c=M.get(f,a),void 0!==c)return c;if(c=M.get(f,d),void 0!==c)return c;if(c=P(f,d,void 0),void 0!==c)return c}else this.each(function(){var c=M.get(this,d);M.set(this,d,b),-1!==a.indexOf("-")&&void 0!==c&&M.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){M.remove(this,a)})}}),n.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=L.get(a,b),c&&(!d||n.isArray(c)?d=L.access(a,b,n.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=n.queue(a,b),d=c.length,e=c.shift(),f=n._queueHooks(a,b),g=function(){n.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return L.get(a,c)||L.access(a,c,{empty:n.Callbacks("once memory").add(function(){L.remove(a,[b+"queue",c])})})}}),n.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?n.queue(this[0],a):void 0===b?this:this.each(function(){var c=n.queue(this,a,b);n._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&n.dequeue(this,a)})},dequeue:function(a){return this.each(function(){n.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=n.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=L.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var Q=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,R=["Top","Right","Bottom","Left"],S=function(a,b){return a=b||a,"none"===n.css(a,"display")||!n.contains(a.ownerDocument,a)},T=/^(?:checkbox|radio)$/i;!function(){var a=l.createDocumentFragment(),b=a.appendChild(l.createElement("div")),c=l.createElement("input");c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),b.appendChild(c),k.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",k.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var U="undefined";k.focusinBubbles="onfocusin"in a;var V=/^key/,W=/^(?:mouse|pointer|contextmenu)|click/,X=/^(?:focusinfocus|focusoutblur)$/,Y=/^([^.]*)(?:\.(.+)|)$/;function Z(){return!0}function $(){return!1}function _(){try{return l.activeElement}catch(a){}}n.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=L.get(a);if(r){c.handler&&(f=c,c=f.handler,e=f.selector),c.guid||(c.guid=n.guid++),(i=r.events)||(i=r.events={}),(g=r.handle)||(g=r.handle=function(b){return typeof n!==U&&n.event.triggered!==b.type?n.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(E)||[""],j=b.length;while(j--)h=Y.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o&&(l=n.event.special[o]||{},o=(e?l.delegateType:l.bindType)||o,l=n.event.special[o]||{},k=n.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&n.expr.match.needsContext.test(e),namespace:p.join(".")},f),(m=i[o])||(m=i[o]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,p,g)!==!1||a.addEventListener&&a.addEventListener(o,g,!1)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),n.event.global[o]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=L.hasData(a)&&L.get(a);if(r&&(i=r.events)){b=(b||"").match(E)||[""],j=b.length;while(j--)if(h=Y.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=n.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,m=i[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&q!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||n.removeEvent(a,o,r.handle),delete i[o])}else for(o in i)n.event.remove(a,o+b[j],c,d,!0);n.isEmptyObject(i)&&(delete r.handle,L.remove(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,m,o,p=[d||l],q=j.call(b,"type")?b.type:b,r=j.call(b,"namespace")?b.namespace.split("."):[];if(g=h=d=d||l,3!==d.nodeType&&8!==d.nodeType&&!X.test(q+n.event.triggered)&&(q.indexOf(".")>=0&&(r=q.split("."),q=r.shift(),r.sort()),k=q.indexOf(":")<0&&"on"+q,b=b[n.expando]?b:new n.Event(q,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=r.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+r.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:n.makeArray(c,[b]),o=n.event.special[q]||{},e||!o.trigger||o.trigger.apply(d,c)!==!1)){if(!e&&!o.noBubble&&!n.isWindow(d)){for(i=o.delegateType||q,X.test(i+q)||(g=g.parentNode);g;g=g.parentNode)p.push(g),h=g;h===(d.ownerDocument||l)&&p.push(h.defaultView||h.parentWindow||a)}f=0;while((g=p[f++])&&!b.isPropagationStopped())b.type=f>1?i:o.bindType||q,m=(L.get(g,"events")||{})[b.type]&&L.get(g,"handle"),m&&m.apply(g,c),m=k&&g[k],m&&m.apply&&n.acceptData(g)&&(b.result=m.apply(g,c),b.result===!1&&b.preventDefault());return b.type=q,e||b.isDefaultPrevented()||o._default&&o._default.apply(p.pop(),c)!==!1||!n.acceptData(d)||k&&n.isFunction(d[q])&&!n.isWindow(d)&&(h=d[k],h&&(d[k]=null),n.event.triggered=q,d[q](),n.event.triggered=void 0,h&&(d[k]=h)),b.result}},dispatch:function(a){a=n.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(L.get(this,"events")||{})[a.type]||[],k=n.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=n.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,c=0;while((g=f.handlers[c++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(g.namespace))&&(a.handleObj=g,a.data=g.data,e=((n.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==e&&(a.result=e)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!==this;i=i.parentNode||this)if(i.disabled!==!0||"click"!==a.type){for(d=[],c=0;h>c;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?n(e,this).index(i)>=0:n.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button;return null==a.pageX&&null!=b.clientX&&(c=a.target.ownerDocument||l,d=c.documentElement,e=c.body,a.pageX=b.clientX+(d&&d.scrollLeft||e&&e.scrollLeft||0)-(d&&d.clientLeft||e&&e.clientLeft||0),a.pageY=b.clientY+(d&&d.scrollTop||e&&e.scrollTop||0)-(d&&d.clientTop||e&&e.clientTop||0)),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},fix:function(a){if(a[n.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=W.test(e)?this.mouseHooks:V.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new n.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=l),3===a.target.nodeType&&(a.target=a.target.parentNode),g.filter?g.filter(a,f):a},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==_()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===_()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&n.nodeName(this,"input")?(this.click(),!1):void 0},_default:function(a){return n.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=n.extend(new n.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?n.event.trigger(e,null,b):n.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},n.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)},n.Event=function(a,b){return this instanceof n.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?Z:$):this.type=a,b&&n.extend(this,b),this.timeStamp=a&&a.timeStamp||n.now(),void(this[n.expando]=!0)):new n.Event(a,b)},n.Event.prototype={isDefaultPrevented:$,isPropagationStopped:$,isImmediatePropagationStopped:$,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=Z,a&&a.preventDefault&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=Z,a&&a.stopPropagation&&a.stopPropagation()},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=Z,a&&a.stopImmediatePropagation&&a.stopImmediatePropagation(),this.stopPropagation()}},n.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){n.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!n.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),k.focusinBubbles||n.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){n.event.simulate(b,a.target,n.event.fix(a),!0)};n.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=L.access(d,b);e||d.addEventListener(a,c,!0),L.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=L.access(d,b)-1;e?L.access(d,b,e):(d.removeEventListener(a,c,!0),L.remove(d,b))}}}),n.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(g in a)this.on(g,b,c,a[g],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=$;else if(!d)return this;return 1===e&&(f=d,d=function(a){return n().off(a),f.apply(this,arguments)},d.guid=f.guid||(f.guid=n.guid++)),this.each(function(){n.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,n(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=$),this.each(function(){n.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){n.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?n.event.trigger(a,b,c,!0):void 0}});var ab=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bb=/<([\w:]+)/,cb=/<|&#?\w+;/,db=/<(?:script|style|link)/i,eb=/checked\s*(?:[^=]|=\s*.checked.)/i,fb=/^$|\/(?:java|ecma)script/i,gb=/^true\/(.*)/,hb=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,ib={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ib.optgroup=ib.option,ib.tbody=ib.tfoot=ib.colgroup=ib.caption=ib.thead,ib.th=ib.td;function jb(a,b){return n.nodeName(a,"table")&&n.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function kb(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function lb(a){var b=gb.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function mb(a,b){for(var c=0,d=a.length;d>c;c++)L.set(a[c],"globalEval",!b||L.get(b[c],"globalEval"))}function nb(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(L.hasData(a)&&(f=L.access(a),g=L.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;d>c;c++)n.event.add(b,e,j[e][c])}M.hasData(a)&&(h=M.access(a),i=n.extend({},h),M.set(b,i))}}function ob(a,b){var c=a.getElementsByTagName?a.getElementsByTagName(b||"*"):a.querySelectorAll?a.querySelectorAll(b||"*"):[];return void 0===b||b&&n.nodeName(a,b)?n.merge([a],c):c}function pb(a,b){var c=b.nodeName.toLowerCase();"input"===c&&T.test(a.type)?b.checked=a.checked:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}n.extend({clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=n.contains(a.ownerDocument,a);if(!(k.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||n.isXMLDoc(a)))for(g=ob(h),f=ob(a),d=0,e=f.length;e>d;d++)pb(f[d],g[d]);if(b)if(c)for(f=f||ob(a),g=g||ob(h),d=0,e=f.length;e>d;d++)nb(f[d],g[d]);else nb(a,h);return g=ob(h,"script"),g.length>0&&mb(g,!i&&ob(a,"script")),h},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,k=b.createDocumentFragment(),l=[],m=0,o=a.length;o>m;m++)if(e=a[m],e||0===e)if("object"===n.type(e))n.merge(l,e.nodeType?[e]:e);else if(cb.test(e)){f=f||k.appendChild(b.createElement("div")),g=(bb.exec(e)||["",""])[1].toLowerCase(),h=ib[g]||ib._default,f.innerHTML=h[1]+e.replace(ab,"<$1></$2>")+h[2],j=h[0];while(j--)f=f.lastChild;n.merge(l,f.childNodes),f=k.firstChild,f.textContent=""}else l.push(b.createTextNode(e));k.textContent="",m=0;while(e=l[m++])if((!d||-1===n.inArray(e,d))&&(i=n.contains(e.ownerDocument,e),f=ob(k.appendChild(e),"script"),i&&mb(f),c)){j=0;while(e=f[j++])fb.test(e.type||"")&&c.push(e)}return k},cleanData:function(a){for(var b,c,d,e,f=n.event.special,g=0;void 0!==(c=a[g]);g++){if(n.acceptData(c)&&(e=c[L.expando],e&&(b=L.cache[e]))){if(b.events)for(d in b.events)f[d]?n.event.remove(c,d):n.removeEvent(c,d,b.handle);L.cache[e]&&delete L.cache[e]}delete M.cache[c[M.expando]]}}}),n.fn.extend({text:function(a){return J(this,function(a){return void 0===a?n.text(this):this.empty().each(function(){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&(this.textContent=a)})},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=jb(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=jb(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?n.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||n.cleanData(ob(c)),c.parentNode&&(b&&n.contains(c.ownerDocument,c)&&mb(ob(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(n.cleanData(ob(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return n.clone(this,a,b)})},html:function(a){return J(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!db.test(a)&&!ib[(bb.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(ab,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(n.cleanData(ob(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,n.cleanData(ob(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,l=this.length,m=this,o=l-1,p=a[0],q=n.isFunction(p);if(q||l>1&&"string"==typeof p&&!k.checkClone&&eb.test(p))return this.each(function(c){var d=m.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(l&&(c=n.buildFragment(a,this[0].ownerDocument,!1,this),d=c.firstChild,1===c.childNodes.length&&(c=d),d)){for(f=n.map(ob(c,"script"),kb),g=f.length;l>j;j++)h=c,j!==o&&(h=n.clone(h,!0,!0),g&&n.merge(f,ob(h,"script"))),b.call(this[j],h,j);if(g)for(i=f[f.length-1].ownerDocument,n.map(f,lb),j=0;g>j;j++)h=f[j],fb.test(h.type||"")&&!L.access(h,"globalEval")&&n.contains(i,h)&&(h.src?n._evalUrl&&n._evalUrl(h.src):n.globalEval(h.textContent.replace(hb,"")))}return this}}),n.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){n.fn[a]=function(a){for(var c,d=[],e=n(a),g=e.length-1,h=0;g>=h;h++)c=h===g?this:this.clone(!0),n(e[h])[b](c),f.apply(d,c.get());return this.pushStack(d)}});var qb,rb={};function sb(b,c){var d,e=n(c.createElement(b)).appendTo(c.body),f=a.getDefaultComputedStyle&&(d=a.getDefaultComputedStyle(e[0]))?d.display:n.css(e[0],"display");return e.detach(),f}function tb(a){var b=l,c=rb[a];return c||(c=sb(a,b),"none"!==c&&c||(qb=(qb||n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=qb[0].contentDocument,b.write(),b.close(),c=sb(a,b),qb.detach()),rb[a]=c),c}var ub=/^margin/,vb=new RegExp("^("+Q+")(?!px)[a-z%]+$","i"),wb=function(b){return b.ownerDocument.defaultView.opener?b.ownerDocument.defaultView.getComputedStyle(b,null):a.getComputedStyle(b,null)};function xb(a,b,c){var d,e,f,g,h=a.style;return c=c||wb(a),c&&(g=c.getPropertyValue(b)||c[b]),c&&(""!==g||n.contains(a.ownerDocument,a)||(g=n.style(a,b)),vb.test(g)&&ub.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0!==g?g+"":g}function yb(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d=l.documentElement,e=l.createElement("div"),f=l.createElement("div");if(f.style){f.style.backgroundClip="content-box",f.cloneNode(!0).style.backgroundClip="",k.clearCloneStyle="content-box"===f.style.backgroundClip,e.style.cssText="border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute",e.appendChild(f);function g(){f.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",f.innerHTML="",d.appendChild(e);var g=a.getComputedStyle(f,null);b="1%"!==g.top,c="4px"===g.width,d.removeChild(e)}a.getComputedStyle&&n.extend(k,{pixelPosition:function(){return g(),b},boxSizingReliable:function(){return null==c&&g(),c},reliableMarginRight:function(){var b,c=f.appendChild(l.createElement("div"));return c.style.cssText=f.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",c.style.marginRight=c.style.width="0",f.style.width="1px",d.appendChild(e),b=!parseFloat(a.getComputedStyle(c,null).marginRight),d.removeChild(e),f.removeChild(c),b}})}}(),n.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var zb=/^(none|table(?!-c[ea]).+)/,Ab=new RegExp("^("+Q+")(.*)$","i"),Bb=new RegExp("^([+-])=("+Q+")","i"),Cb={position:"absolute",visibility:"hidden",display:"block"},Db={letterSpacing:"0",fontWeight:"400"},Eb=["Webkit","O","Moz","ms"];function Fb(a,b){if(b in a)return b;var c=b[0].toUpperCase()+b.slice(1),d=b,e=Eb.length;while(e--)if(b=Eb[e]+c,b in a)return b;return d}function Gb(a,b,c){var d=Ab.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Hb(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=n.css(a,c+R[f],!0,e)),d?("content"===c&&(g-=n.css(a,"padding"+R[f],!0,e)),"margin"!==c&&(g-=n.css(a,"border"+R[f]+"Width",!0,e))):(g+=n.css(a,"padding"+R[f],!0,e),"padding"!==c&&(g+=n.css(a,"border"+R[f]+"Width",!0,e)));return g}function Ib(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=wb(a),g="border-box"===n.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=xb(a,b,f),(0>e||null==e)&&(e=a.style[b]),vb.test(e))return e;d=g&&(k.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Hb(a,b,c||(g?"border":"content"),d,f)+"px"}function Jb(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=L.get(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&S(d)&&(f[g]=L.access(d,"olddisplay",tb(d.nodeName)))):(e=S(d),"none"===c&&e||L.set(d,"olddisplay",e?c:n.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}n.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=xb(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=n.camelCase(b),i=a.style;return b=n.cssProps[h]||(n.cssProps[h]=Fb(i,h)),g=n.cssHooks[b]||n.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]:(f=typeof c,"string"===f&&(e=Bb.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(n.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||n.cssNumber[h]||(c+="px"),k.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=n.camelCase(b);return b=n.cssProps[h]||(n.cssProps[h]=Fb(a.style,h)),g=n.cssHooks[b]||n.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=xb(a,b,d)),"normal"===e&&b in Db&&(e=Db[b]),""===c||c?(f=parseFloat(e),c===!0||n.isNumeric(f)?f||0:e):e}}),n.each(["height","width"],function(a,b){n.cssHooks[b]={get:function(a,c,d){return c?zb.test(n.css(a,"display"))&&0===a.offsetWidth?n.swap(a,Cb,function(){return Ib(a,b,d)}):Ib(a,b,d):void 0},set:function(a,c,d){var e=d&&wb(a);return Gb(a,c,d?Hb(a,b,d,"border-box"===n.css(a,"boxSizing",!1,e),e):0)}}}),n.cssHooks.marginRight=yb(k.reliableMarginRight,function(a,b){return b?n.swap(a,{display:"inline-block"},xb,[a,"marginRight"]):void 0}),n.each({margin:"",padding:"",border:"Width"},function(a,b){n.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+R[d]+b]=f[d]||f[d-2]||f[0];return e}},ub.test(a)||(n.cssHooks[a+b].set=Gb)}),n.fn.extend({css:function(a,b){return J(this,function(a,b,c){var d,e,f={},g=0;if(n.isArray(b)){for(d=wb(a),e=b.length;e>g;g++)f[b[g]]=n.css(a,b[g],!1,d);return f}return void 0!==c?n.style(a,b,c):n.css(a,b)},a,b,arguments.length>1)},show:function(){return Jb(this,!0)},hide:function(){return Jb(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){S(this)?n(this).show():n(this).hide()})}});function Kb(a,b,c,d,e){return new Kb.prototype.init(a,b,c,d,e)}n.Tween=Kb,Kb.prototype={constructor:Kb,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(n.cssNumber[c]?"":"px")},cur:function(){var a=Kb.propHooks[this.prop];return a&&a.get?a.get(this):Kb.propHooks._default.get(this)},run:function(a){var b,c=Kb.propHooks[this.prop];return this.pos=b=this.options.duration?n.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Kb.propHooks._default.set(this),this}},Kb.prototype.init.prototype=Kb.prototype,Kb.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=n.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){n.fx.step[a.prop]?n.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[n.cssProps[a.prop]]||n.cssHooks[a.prop])?n.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},Kb.propHooks.scrollTop=Kb.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},n.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},n.fx=Kb.prototype.init,n.fx.step={};var Lb,Mb,Nb=/^(?:toggle|show|hide)$/,Ob=new RegExp("^(?:([+-])=|)("+Q+")([a-z%]*)$","i"),Pb=/queueHooks$/,Qb=[Vb],Rb={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=Ob.exec(b),f=e&&e[3]||(n.cssNumber[a]?"":"px"),g=(n.cssNumber[a]||"px"!==f&&+d)&&Ob.exec(n.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,n.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function Sb(){return setTimeout(function(){Lb=void 0}),Lb=n.now()}function Tb(a,b){var c,d=0,e={height:a};for(b=b?1:0;4>d;d+=2-b)c=R[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function Ub(a,b,c){for(var d,e=(Rb[b]||[]).concat(Rb["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function Vb(a,b,c){var d,e,f,g,h,i,j,k,l=this,m={},o=a.style,p=a.nodeType&&S(a),q=L.get(a,"fxshow");c.queue||(h=n._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,l.always(function(){l.always(function(){h.unqueued--,n.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[o.overflow,o.overflowX,o.overflowY],j=n.css(a,"display"),k="none"===j?L.get(a,"olddisplay")||tb(a.nodeName):j,"inline"===k&&"none"===n.css(a,"float")&&(o.display="inline-block")),c.overflow&&(o.overflow="hidden",l.always(function(){o.overflow=c.overflow[0],o.overflowX=c.overflow[1],o.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],Nb.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(p?"hide":"show")){if("show"!==e||!q||void 0===q[d])continue;p=!0}m[d]=q&&q[d]||n.style(a,d)}else j=void 0;if(n.isEmptyObject(m))"inline"===("none"===j?tb(a.nodeName):j)&&(o.display=j);else{q?"hidden"in q&&(p=q.hidden):q=L.access(a,"fxshow",{}),f&&(q.hidden=!p),p?n(a).show():l.done(function(){n(a).hide()}),l.done(function(){var b;L.remove(a,"fxshow");for(b in m)n.style(a,b,m[b])});for(d in m)g=Ub(p?q[d]:0,d,l),d in q||(q[d]=g.start,p&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function Wb(a,b){var c,d,e,f,g;for(c in a)if(d=n.camelCase(c),e=b[d],f=a[c],n.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=n.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function Xb(a,b,c){var d,e,f=0,g=Qb.length,h=n.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=Lb||Sb(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:n.extend({},b),opts:n.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:Lb||Sb(),duration:c.duration,tweens:[],createTween:function(b,c){var d=n.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(Wb(k,j.opts.specialEasing);g>f;f++)if(d=Qb[f].call(j,a,k,j.opts))return d;return n.map(k,Ub,j),n.isFunction(j.opts.start)&&j.opts.start.call(a,j),n.fx.timer(n.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}n.Animation=n.extend(Xb,{tweener:function(a,b){n.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],Rb[c]=Rb[c]||[],Rb[c].unshift(b)},prefilter:function(a,b){b?Qb.unshift(a):Qb.push(a)}}),n.speed=function(a,b,c){var d=a&&"object"==typeof a?n.extend({},a):{complete:c||!c&&b||n.isFunction(a)&&a,duration:a,easing:c&&b||b&&!n.isFunction(b)&&b};return d.duration=n.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in n.fx.speeds?n.fx.speeds[d.duration]:n.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){n.isFunction(d.old)&&d.old.call(this),d.queue&&n.dequeue(this,d.queue)},d},n.fn.extend({fadeTo:function(a,b,c,d){return this.filter(S).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=n.isEmptyObject(a),f=n.speed(b,c,d),g=function(){var b=Xb(this,n.extend({},a),f);(e||L.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=n.timers,g=L.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&Pb.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&n.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=L.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=n.timers,g=d?d.length:0;for(c.finish=!0,n.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),n.each(["toggle","show","hide"],function(a,b){var c=n.fn[b];n.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(Tb(b,!0),a,d,e)}}),n.each({slideDown:Tb("show"),slideUp:Tb("hide"),slideToggle:Tb("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){n.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),n.timers=[],n.fx.tick=function(){var a,b=0,c=n.timers;for(Lb=n.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||n.fx.stop(),Lb=void 0},n.fx.timer=function(a){n.timers.push(a),a()?n.fx.start():n.timers.pop()},n.fx.interval=13,n.fx.start=function(){Mb||(Mb=setInterval(n.fx.tick,n.fx.interval))},n.fx.stop=function(){clearInterval(Mb),Mb=null},n.fx.speeds={slow:600,fast:200,_default:400},n.fn.delay=function(a,b){return a=n.fx?n.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a=l.createElement("input"),b=l.createElement("select"),c=b.appendChild(l.createElement("option"));a.type="checkbox",k.checkOn=""!==a.value,k.optSelected=c.selected,b.disabled=!0,k.optDisabled=!c.disabled,a=l.createElement("input"),a.value="t",a.type="radio",k.radioValue="t"===a.value}();var Yb,Zb,$b=n.expr.attrHandle;n.fn.extend({attr:function(a,b){return J(this,n.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){n.removeAttr(this,a)})}}),n.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===U?n.prop(a,b,c):(1===f&&n.isXMLDoc(a)||(b=b.toLowerCase(),d=n.attrHooks[b]||(n.expr.match.bool.test(b)?Zb:Yb)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=n.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void n.removeAttr(a,b))
},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(E);if(f&&1===a.nodeType)while(c=f[e++])d=n.propFix[c]||c,n.expr.match.bool.test(c)&&(a[d]=!1),a.removeAttribute(c)},attrHooks:{type:{set:function(a,b){if(!k.radioValue&&"radio"===b&&n.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),Zb={set:function(a,b,c){return b===!1?n.removeAttr(a,c):a.setAttribute(c,c),c}},n.each(n.expr.match.bool.source.match(/\w+/g),function(a,b){var c=$b[b]||n.find.attr;$b[b]=function(a,b,d){var e,f;return d||(f=$b[b],$b[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,$b[b]=f),e}});var _b=/^(?:input|select|textarea|button)$/i;n.fn.extend({prop:function(a,b){return J(this,n.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[n.propFix[a]||a]})}}),n.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!n.isXMLDoc(a),f&&(b=n.propFix[b]||b,e=n.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){return a.hasAttribute("tabindex")||_b.test(a.nodeName)||a.href?a.tabIndex:-1}}}}),k.optSelected||(n.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null}}),n.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){n.propFix[this.toLowerCase()]=this});var ac=/[\t\r\n\f]/g;n.fn.extend({addClass:function(a){var b,c,d,e,f,g,h="string"==typeof a&&a,i=0,j=this.length;if(n.isFunction(a))return this.each(function(b){n(this).addClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ac," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=n.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0===arguments.length||"string"==typeof a&&a,i=0,j=this.length;if(n.isFunction(a))return this.each(function(b){n(this).removeClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ac," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?n.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(n.isFunction(a)?function(c){n(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=n(this),f=a.match(E)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===U||"boolean"===c)&&(this.className&&L.set(this,"__className__",this.className),this.className=this.className||a===!1?"":L.get(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(ac," ").indexOf(b)>=0)return!0;return!1}});var bc=/\r/g;n.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=n.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,n(this).val()):a,null==e?e="":"number"==typeof e?e+="":n.isArray(e)&&(e=n.map(e,function(a){return null==a?"":a+""})),b=n.valHooks[this.type]||n.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=n.valHooks[e.type]||n.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(bc,""):null==c?"":c)}}}),n.extend({valHooks:{option:{get:function(a){var b=n.find.attr(a,"value");return null!=b?b:n.trim(n.text(a))}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(k.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&n.nodeName(c.parentNode,"optgroup"))){if(b=n(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=n.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=n.inArray(d.value,f)>=0)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),n.each(["radio","checkbox"],function(){n.valHooks[this]={set:function(a,b){return n.isArray(b)?a.checked=n.inArray(n(a).val(),b)>=0:void 0}},k.checkOn||(n.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})}),n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){n.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),n.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var cc=n.now(),dc=/\?/;n.parseJSON=function(a){return JSON.parse(a+"")},n.parseXML=function(a){var b,c;if(!a||"string"!=typeof a)return null;try{c=new DOMParser,b=c.parseFromString(a,"text/xml")}catch(d){b=void 0}return(!b||b.getElementsByTagName("parsererror").length)&&n.error("Invalid XML: "+a),b};var ec=/#.*$/,fc=/([?&])_=[^&]*/,gc=/^(.*?):[ \t]*([^\r\n]*)$/gm,hc=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,ic=/^(?:GET|HEAD)$/,jc=/^\/\//,kc=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,lc={},mc={},nc="*/".concat("*"),oc=a.location.href,pc=kc.exec(oc.toLowerCase())||[];function qc(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(E)||[];if(n.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function rc(a,b,c,d){var e={},f=a===mc;function g(h){var i;return e[h]=!0,n.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function sc(a,b){var c,d,e=n.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&n.extend(!0,a,d),a}function tc(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function uc(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}n.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:oc,type:"GET",isLocal:hc.test(pc[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":nc,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":n.parseJSON,"text xml":n.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?sc(sc(a,n.ajaxSettings),b):sc(n.ajaxSettings,a)},ajaxPrefilter:qc(lc),ajaxTransport:qc(mc),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=n.ajaxSetup({},b),l=k.context||k,m=k.context&&(l.nodeType||l.jquery)?n(l):n.event,o=n.Deferred(),p=n.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!f){f={};while(b=gc.exec(e))f[b[1].toLowerCase()]=b[2]}b=f[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?e:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return c&&c.abort(b),x(0,b),this}};if(o.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||oc)+"").replace(ec,"").replace(jc,pc[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=n.trim(k.dataType||"*").toLowerCase().match(E)||[""],null==k.crossDomain&&(h=kc.exec(k.url.toLowerCase()),k.crossDomain=!(!h||h[1]===pc[1]&&h[2]===pc[2]&&(h[3]||("http:"===h[1]?"80":"443"))===(pc[3]||("http:"===pc[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=n.param(k.data,k.traditional)),rc(lc,k,b,v),2===t)return v;i=n.event&&k.global,i&&0===n.active++&&n.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!ic.test(k.type),d=k.url,k.hasContent||(k.data&&(d=k.url+=(dc.test(d)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=fc.test(d)?d.replace(fc,"$1_="+cc++):d+(dc.test(d)?"&":"?")+"_="+cc++)),k.ifModified&&(n.lastModified[d]&&v.setRequestHeader("If-Modified-Since",n.lastModified[d]),n.etag[d]&&v.setRequestHeader("If-None-Match",n.etag[d])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+nc+"; q=0.01":""):k.accepts["*"]);for(j in k.headers)v.setRequestHeader(j,k.headers[j]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(j in{success:1,error:1,complete:1})v[j](k[j]);if(c=rc(mc,k,b,v)){v.readyState=1,i&&m.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,c.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,f,h){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),c=void 0,e=h||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,f&&(u=tc(k,v,f)),u=uc(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(n.lastModified[d]=w),w=v.getResponseHeader("etag"),w&&(n.etag[d]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?o.resolveWith(l,[r,x,v]):o.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,i&&m.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),i&&(m.trigger("ajaxComplete",[v,k]),--n.active||n.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return n.get(a,b,c,"json")},getScript:function(a,b){return n.get(a,void 0,b,"script")}}),n.each(["get","post"],function(a,b){n[b]=function(a,c,d,e){return n.isFunction(c)&&(e=e||d,d=c,c=void 0),n.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),n._evalUrl=function(a){return n.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},n.fn.extend({wrapAll:function(a){var b;return n.isFunction(a)?this.each(function(b){n(this).wrapAll(a.call(this,b))}):(this[0]&&(b=n(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this)},wrapInner:function(a){return this.each(n.isFunction(a)?function(b){n(this).wrapInner(a.call(this,b))}:function(){var b=n(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=n.isFunction(a);return this.each(function(c){n(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){n.nodeName(this,"body")||n(this).replaceWith(this.childNodes)}).end()}}),n.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0},n.expr.filters.visible=function(a){return!n.expr.filters.hidden(a)};var vc=/%20/g,wc=/\[\]$/,xc=/\r?\n/g,yc=/^(?:submit|button|image|reset|file)$/i,zc=/^(?:input|select|textarea|keygen)/i;function Ac(a,b,c,d){var e;if(n.isArray(b))n.each(b,function(b,e){c||wc.test(a)?d(a,e):Ac(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==n.type(b))d(a,b);else for(e in b)Ac(a+"["+e+"]",b[e],c,d)}n.param=function(a,b){var c,d=[],e=function(a,b){b=n.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=n.ajaxSettings&&n.ajaxSettings.traditional),n.isArray(a)||a.jquery&&!n.isPlainObject(a))n.each(a,function(){e(this.name,this.value)});else for(c in a)Ac(c,a[c],b,e);return d.join("&").replace(vc,"+")},n.fn.extend({serialize:function(){return n.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=n.prop(this,"elements");return a?n.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!n(this).is(":disabled")&&zc.test(this.nodeName)&&!yc.test(a)&&(this.checked||!T.test(a))}).map(function(a,b){var c=n(this).val();return null==c?null:n.isArray(c)?n.map(c,function(a){return{name:b.name,value:a.replace(xc,"\r\n")}}):{name:b.name,value:c.replace(xc,"\r\n")}}).get()}}),n.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(a){}};var Bc=0,Cc={},Dc={0:200,1223:204},Ec=n.ajaxSettings.xhr();a.attachEvent&&a.attachEvent("onunload",function(){for(var a in Cc)Cc[a]()}),k.cors=!!Ec&&"withCredentials"in Ec,k.ajax=Ec=!!Ec,n.ajaxTransport(function(a){var b;return k.cors||Ec&&!a.crossDomain?{send:function(c,d){var e,f=a.xhr(),g=++Bc;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)f.setRequestHeader(e,c[e]);b=function(a){return function(){b&&(delete Cc[g],b=f.onload=f.onerror=null,"abort"===a?f.abort():"error"===a?d(f.status,f.statusText):d(Dc[f.status]||f.status,f.statusText,"string"==typeof f.responseText?{text:f.responseText}:void 0,f.getAllResponseHeaders()))}},f.onload=b(),f.onerror=b("error"),b=Cc[g]=b("abort");try{f.send(a.hasContent&&a.data||null)}catch(h){if(b)throw h}},abort:function(){b&&b()}}:void 0}),n.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return n.globalEval(a),a}}}),n.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),n.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(d,e){b=n("<script>").prop({async:!0,charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&e("error"===a.type?404:200,a.type)}),l.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Fc=[],Gc=/(=)\?(?=&|$)|\?\?/;n.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Fc.pop()||n.expando+"_"+cc++;return this[a]=!0,a}}),n.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Gc.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Gc.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=n.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Gc,"$1"+e):b.jsonp!==!1&&(b.url+=(dc.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||n.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Fc.push(e)),g&&n.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),n.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||l;var d=v.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=n.buildFragment([a],b,e),e&&e.length&&n(e).remove(),n.merge([],d.childNodes))};var Hc=n.fn.load;n.fn.load=function(a,b,c){if("string"!=typeof a&&Hc)return Hc.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=n.trim(a.slice(h)),a=a.slice(0,h)),n.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&n.ajax({url:a,type:e,dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?n("<div>").append(n.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,f||[a.responseText,b,a])}),this},n.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){n.fn[b]=function(a){return this.on(b,a)}}),n.expr.filters.animated=function(a){return n.grep(n.timers,function(b){return a===b.elem}).length};var Ic=a.document.documentElement;function Jc(a){return n.isWindow(a)?a:9===a.nodeType&&a.defaultView}n.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=n.css(a,"position"),l=n(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=n.css(a,"top"),i=n.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),n.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},n.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){n.offset.setOffset(this,a,b)});var b,c,d=this[0],e={top:0,left:0},f=d&&d.ownerDocument;if(f)return b=f.documentElement,n.contains(b,d)?(typeof d.getBoundingClientRect!==U&&(e=d.getBoundingClientRect()),c=Jc(f),{top:e.top+c.pageYOffset-b.clientTop,left:e.left+c.pageXOffset-b.clientLeft}):e},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===n.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),n.nodeName(a[0],"html")||(d=a.offset()),d.top+=n.css(a[0],"borderTopWidth",!0),d.left+=n.css(a[0],"borderLeftWidth",!0)),{top:b.top-d.top-n.css(c,"marginTop",!0),left:b.left-d.left-n.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||Ic;while(a&&!n.nodeName(a,"html")&&"static"===n.css(a,"position"))a=a.offsetParent;return a||Ic})}}),n.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(b,c){var d="pageYOffset"===c;n.fn[b]=function(e){return J(this,function(b,e,f){var g=Jc(b);return void 0===f?g?g[c]:b[e]:void(g?g.scrollTo(d?a.pageXOffset:f,d?f:a.pageYOffset):b[e]=f)},b,e,arguments.length,null)}}),n.each(["top","left"],function(a,b){n.cssHooks[b]=yb(k.pixelPosition,function(a,c){return c?(c=xb(a,b),vb.test(c)?n(a).position()[b]+"px":c):void 0})}),n.each({Height:"height",Width:"width"},function(a,b){n.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){n.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return J(this,function(b,c,d){var e;return n.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?n.css(b,c,g):n.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),n.fn.size=function(){return this.length},n.fn.andSelf=n.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return n});var Kc=a.jQuery,Lc=a.$;return n.noConflict=function(b){return a.$===n&&(a.$=Lc),b&&a.jQuery===n&&(a.jQuery=Kc),n},typeof b===U&&(a.jQuery=a.$=n),n});

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

// vim:ts=4:sts=4:sw=4:
/*!
 *
 * Copyright 2009-2017 Kris Kowal under the terms of the MIT
 * license found at https://github.com/kriskowal/q/blob/v1/LICENSE
 *
 * With parts by Tyler Close
 * Copyright 2007-2009 Tyler Close under the terms of the MIT X license found
 * at http://www.opensource.org/licenses/mit-license.html
 * Forked at ref_send.js version: 2009-05-11
 *
 * With parts by Mark Miller
 * Copyright (C) 2011 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

(function (definition) {
    "use strict";

    // This file will function properly as a <script> tag, or a module
    // using CommonJS and NodeJS or RequireJS module formats.  In
    // Common/Node/RequireJS, the module exports the Q API and when
    // executed as a simple <script>, it creates a Q global instead.

    // Montage Require
    if (typeof bootstrap === "function") {
        bootstrap("promise", definition);

    // CommonJS
    } else if (typeof exports === "object" && typeof module === "object") {
        module.exports = definition();

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
        define(definition);

    // SES (Secure EcmaScript)
    } else if (typeof ses !== "undefined") {
        if (!ses.ok()) {
            return;
        } else {
            ses.makeQ = definition;
        }

    // <script>
    } else if (typeof window !== "undefined" || typeof self !== "undefined") {
        // Prefer window over self for add-on scripts. Use self for
        // non-windowed contexts.
        var global = typeof window !== "undefined" ? window : self;

        // Get the `window` object, save the previous Q global
        // and initialize Q as a global.
        var previousQ = global.Q;
        global.Q = definition();

        // Add a noConflict function so Q can be removed from the
        // global namespace.
        global.Q.noConflict = function () {
            global.Q = previousQ;
            return this;
        };

    } else {
        throw new Error("This environment was not anticipated by Q. Please file a bug.");
    }

})(function () {
"use strict";

var hasStacks = false;
try {
    throw new Error();
} catch (e) {
    hasStacks = !!e.stack;
}

// All code after this point will be filtered from stack traces reported
// by Q.
var qStartingLine = captureLine();
var qFileName;

// shims

// used for fallback in "allResolved"
var noop = function () {};

// Use the fastest possible means to execute a task in a future turn
// of the event loop.
var nextTick =(function () {
    // linked list of tasks (single, with head node)
    var head = {task: void 0, next: null};
    var tail = head;
    var flushing = false;
    var requestTick = void 0;
    var isNodeJS = false;
    // queue for late tasks, used by unhandled rejection tracking
    var laterQueue = [];

    function flush() {
        /* jshint loopfunc: true */
        var task, domain;

        while (head.next) {
            head = head.next;
            task = head.task;
            head.task = void 0;
            domain = head.domain;

            if (domain) {
                head.domain = void 0;
                domain.enter();
            }
            runSingle(task, domain);

        }
        while (laterQueue.length) {
            task = laterQueue.pop();
            runSingle(task);
        }
        flushing = false;
    }
    // runs a single function in the async queue
    function runSingle(task, domain) {
        try {
            task();

        } catch (e) {
            if (isNodeJS) {
                // In node, uncaught exceptions are considered fatal errors.
                // Re-throw them synchronously to interrupt flushing!

                // Ensure continuation if the uncaught exception is suppressed
                // listening "uncaughtException" events (as domains does).
                // Continue in next event to avoid tick recursion.
                if (domain) {
                    domain.exit();
                }
                setTimeout(flush, 0);
                if (domain) {
                    domain.enter();
                }

                throw e;

            } else {
                // In browsers, uncaught exceptions are not fatal.
                // Re-throw them asynchronously to avoid slow-downs.
                setTimeout(function () {
                    throw e;
                }, 0);
            }
        }

        if (domain) {
            domain.exit();
        }
    }

    nextTick = function (task) {
        tail = tail.next = {
            task: task,
            domain: isNodeJS && process.domain,
            next: null
        };

        if (!flushing) {
            flushing = true;
            requestTick();
        }
    };

    if (typeof process === "object" &&
        process.toString() === "[object process]" && process.nextTick) {
        // Ensure Q is in a real Node environment, with a `process.nextTick`.
        // To see through fake Node environments:
        // * Mocha test runner - exposes a `process` global without a `nextTick`
        // * Browserify - exposes a `process.nexTick` function that uses
        //   `setTimeout`. In this case `setImmediate` is preferred because
        //    it is faster. Browserify's `process.toString()` yields
        //   "[object Object]", while in a real Node environment
        //   `process.toString()` yields "[object process]".
        isNodeJS = true;

        requestTick = function () {
            process.nextTick(flush);
        };

    } else if (typeof setImmediate === "function") {
        // In IE10, Node.js 0.9+, or https://github.com/NobleJS/setImmediate
        if (typeof window !== "undefined") {
            requestTick = setImmediate.bind(window, flush);
        } else {
            requestTick = function () {
                setImmediate(flush);
            };
        }

    } else if (typeof MessageChannel !== "undefined") {
        // modern browsers
        // http://www.nonblocking.io/2011/06/windownexttick.html
        var channel = new MessageChannel();
        // At least Safari Version 6.0.5 (8536.30.1) intermittently cannot create
        // working message ports the first time a page loads.
        channel.port1.onmessage = function () {
            requestTick = requestPortTick;
            channel.port1.onmessage = flush;
            flush();
        };
        var requestPortTick = function () {
            // Opera requires us to provide a message payload, regardless of
            // whether we use it.
            channel.port2.postMessage(0);
        };
        requestTick = function () {
            setTimeout(flush, 0);
            requestPortTick();
        };

    } else {
        // old browsers
        requestTick = function () {
            setTimeout(flush, 0);
        };
    }
    // runs a task after all other tasks have been run
    // this is useful for unhandled rejection tracking that needs to happen
    // after all `then`d tasks have been run.
    nextTick.runAfter = function (task) {
        laterQueue.push(task);
        if (!flushing) {
            flushing = true;
            requestTick();
        }
    };
    return nextTick;
})();

// Attempt to make generics safe in the face of downstream
// modifications.
// There is no situation where this is necessary.
// If you need a security guarantee, these primordials need to be
// deeply frozen anyway, and if you don’t need a security guarantee,
// this is just plain paranoid.
// However, this **might** have the nice side-effect of reducing the size of
// the minified code by reducing x.call() to merely x()
// See Mark Miller’s explanation of what this does.
// http://wiki.ecmascript.org/doku.php?id=conventions:safe_meta_programming
var call = Function.call;
function uncurryThis(f) {
    return function () {
        return call.apply(f, arguments);
    };
}
// This is equivalent, but slower:
// uncurryThis = Function_bind.bind(Function_bind.call);
// http://jsperf.com/uncurrythis

var array_slice = uncurryThis(Array.prototype.slice);

var array_reduce = uncurryThis(
    Array.prototype.reduce || function (callback, basis) {
        var index = 0,
            length = this.length;
        // concerning the initial value, if one is not provided
        if (arguments.length === 1) {
            // seek to the first value in the array, accounting
            // for the possibility that is is a sparse array
            do {
                if (index in this) {
                    basis = this[index++];
                    break;
                }
                if (++index >= length) {
                    throw new TypeError();
                }
            } while (1);
        }
        // reduce
        for (; index < length; index++) {
            // account for the possibility that the array is sparse
            if (index in this) {
                basis = callback(basis, this[index], index);
            }
        }
        return basis;
    }
);

var array_indexOf = uncurryThis(
    Array.prototype.indexOf || function (value) {
        // not a very good shim, but good enough for our one use of it
        for (var i = 0; i < this.length; i++) {
            if (this[i] === value) {
                return i;
            }
        }
        return -1;
    }
);

var array_map = uncurryThis(
    Array.prototype.map || function (callback, thisp) {
        var self = this;
        var collect = [];
        array_reduce(self, function (undefined, value, index) {
            collect.push(callback.call(thisp, value, index, self));
        }, void 0);
        return collect;
    }
);

var object_create = Object.create || function (prototype) {
    function Type() { }
    Type.prototype = prototype;
    return new Type();
};

var object_defineProperty = Object.defineProperty || function (obj, prop, descriptor) {
    obj[prop] = descriptor.value;
    return obj;
};

var object_hasOwnProperty = uncurryThis(Object.prototype.hasOwnProperty);

var object_keys = Object.keys || function (object) {
    var keys = [];
    for (var key in object) {
        if (object_hasOwnProperty(object, key)) {
            keys.push(key);
        }
    }
    return keys;
};

var object_toString = uncurryThis(Object.prototype.toString);

function isObject(value) {
    return value === Object(value);
}

// generator related shims

// FIXME: Remove this function once ES6 generators are in SpiderMonkey.
function isStopIteration(exception) {
    return (
        object_toString(exception) === "[object StopIteration]" ||
        exception instanceof QReturnValue
    );
}

// FIXME: Remove this helper and Q.return once ES6 generators are in
// SpiderMonkey.
var QReturnValue;
if (typeof ReturnValue !== "undefined") {
    QReturnValue = ReturnValue;
} else {
    QReturnValue = function (value) {
        this.value = value;
    };
}

// long stack traces

var STACK_JUMP_SEPARATOR = "From previous event:";

function makeStackTraceLong(error, promise) {
    // If possible, transform the error stack trace by removing Node and Q
    // cruft, then concatenating with the stack trace of `promise`. See #57.
    if (hasStacks &&
        promise.stack &&
        typeof error === "object" &&
        error !== null &&
        error.stack
    ) {
        var stacks = [];
        for (var p = promise; !!p; p = p.source) {
            if (p.stack && (!error.__minimumStackCounter__ || error.__minimumStackCounter__ > p.stackCounter)) {
                object_defineProperty(error, "__minimumStackCounter__", {value: p.stackCounter, configurable: true});
                stacks.unshift(p.stack);
            }
        }
        stacks.unshift(error.stack);

        var concatedStacks = stacks.join("\n" + STACK_JUMP_SEPARATOR + "\n");
        var stack = filterStackString(concatedStacks);
        object_defineProperty(error, "stack", {value: stack, configurable: true});
    }
}

function filterStackString(stackString) {
    var lines = stackString.split("\n");
    var desiredLines = [];
    for (var i = 0; i < lines.length; ++i) {
        var line = lines[i];

        if (!isInternalFrame(line) && !isNodeFrame(line) && line) {
            desiredLines.push(line);
        }
    }
    return desiredLines.join("\n");
}

function isNodeFrame(stackLine) {
    return stackLine.indexOf("(module.js:") !== -1 ||
           stackLine.indexOf("(node.js:") !== -1;
}

function getFileNameAndLineNumber(stackLine) {
    // Named functions: "at functionName (filename:lineNumber:columnNumber)"
    // In IE10 function name can have spaces ("Anonymous function") O_o
    var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
    if (attempt1) {
        return [attempt1[1], Number(attempt1[2])];
    }

    // Anonymous functions: "at filename:lineNumber:columnNumber"
    var attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
    if (attempt2) {
        return [attempt2[1], Number(attempt2[2])];
    }

    // Firefox style: "function@filename:lineNumber or @filename:lineNumber"
    var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
    if (attempt3) {
        return [attempt3[1], Number(attempt3[2])];
    }
}

function isInternalFrame(stackLine) {
    var fileNameAndLineNumber = getFileNameAndLineNumber(stackLine);

    if (!fileNameAndLineNumber) {
        return false;
    }

    var fileName = fileNameAndLineNumber[0];
    var lineNumber = fileNameAndLineNumber[1];

    return fileName === qFileName &&
        lineNumber >= qStartingLine &&
        lineNumber <= qEndingLine;
}

// discover own file name and line number range for filtering stack
// traces
function captureLine() {
    if (!hasStacks) {
        return;
    }

    try {
        throw new Error();
    } catch (e) {
        var lines = e.stack.split("\n");
        var firstLine = lines[0].indexOf("@") > 0 ? lines[1] : lines[2];
        var fileNameAndLineNumber = getFileNameAndLineNumber(firstLine);
        if (!fileNameAndLineNumber) {
            return;
        }

        qFileName = fileNameAndLineNumber[0];
        return fileNameAndLineNumber[1];
    }
}

function deprecate(callback, name, alternative) {
    return function () {
        if (typeof console !== "undefined" &&
            typeof console.warn === "function") {
            console.warn(name + " is deprecated, use " + alternative +
                         " instead.", new Error("").stack);
        }
        return callback.apply(callback, arguments);
    };
}

// end of shims
// beginning of real work

/**
 * Constructs a promise for an immediate reference, passes promises through, or
 * coerces promises from different systems.
 * @param value immediate reference or promise
 */
function Q(value) {
    // If the object is already a Promise, return it directly.  This enables
    // the resolve function to both be used to created references from objects,
    // but to tolerably coerce non-promises to promises.
    if (value instanceof Promise) {
        return value;
    }

    // assimilate thenables
    if (isPromiseAlike(value)) {
        return coerce(value);
    } else {
        return fulfill(value);
    }
}
Q.resolve = Q;

/**
 * Performs a task in a future turn of the event loop.
 * @param {Function} task
 */
Q.nextTick = nextTick;

/**
 * Controls whether or not long stack traces will be on
 */
Q.longStackSupport = false;

/**
 * The counter is used to determine the stopping point for building
 * long stack traces. In makeStackTraceLong we walk backwards through
 * the linked list of promises, only stacks which were created before
 * the rejection are concatenated.
 */
var longStackCounter = 1;

// enable long stacks if Q_DEBUG is set
if (typeof process === "object" && process && process.env && process.env.Q_DEBUG) {
    Q.longStackSupport = true;
}

/**
 * Constructs a {promise, resolve, reject} object.
 *
 * `resolve` is a callback to invoke with a more resolved value for the
 * promise. To fulfill the promise, invoke `resolve` with any value that is
 * not a thenable. To reject the promise, invoke `resolve` with a rejected
 * thenable, or invoke `reject` with the reason directly. To resolve the
 * promise to another thenable, thus putting it in the same state, invoke
 * `resolve` with that other thenable.
 */
Q.defer = defer;
function defer() {
    // if "messages" is an "Array", that indicates that the promise has not yet
    // been resolved.  If it is "undefined", it has been resolved.  Each
    // element of the messages array is itself an array of complete arguments to
    // forward to the resolved promise.  We coerce the resolution value to a
    // promise using the `resolve` function because it handles both fully
    // non-thenable values and other thenables gracefully.
    var messages = [], progressListeners = [], resolvedPromise;

    var deferred = object_create(defer.prototype);
    var promise = object_create(Promise.prototype);

    promise.promiseDispatch = function (resolve, op, operands) {
        var args = array_slice(arguments);
        if (messages) {
            messages.push(args);
            if (op === "when" && operands[1]) { // progress operand
                progressListeners.push(operands[1]);
            }
        } else {
            Q.nextTick(function () {
                resolvedPromise.promiseDispatch.apply(resolvedPromise, args);
            });
        }
    };

    // XXX deprecated
    promise.valueOf = function () {
        if (messages) {
            return promise;
        }
        var nearerValue = nearer(resolvedPromise);
        if (isPromise(nearerValue)) {
            resolvedPromise = nearerValue; // shorten chain
        }
        return nearerValue;
    };

    promise.inspect = function () {
        if (!resolvedPromise) {
            return { state: "pending" };
        }
        return resolvedPromise.inspect();
    };

    if (Q.longStackSupport && hasStacks) {
        try {
            throw new Error();
        } catch (e) {
            // NOTE: don't try to use `Error.captureStackTrace` or transfer the
            // accessor around; that causes memory leaks as per GH-111. Just
            // reify the stack trace as a string ASAP.
            //
            // At the same time, cut off the first line; it's always just
            // "[object Promise]\n", as per the `toString`.
            promise.stack = e.stack.substring(e.stack.indexOf("\n") + 1);
            promise.stackCounter = longStackCounter++;
        }
    }

    // NOTE: we do the checks for `resolvedPromise` in each method, instead of
    // consolidating them into `become`, since otherwise we'd create new
    // promises with the lines `become(whatever(value))`. See e.g. GH-252.

    function become(newPromise) {
        resolvedPromise = newPromise;

        if (Q.longStackSupport && hasStacks) {
            // Only hold a reference to the new promise if long stacks
            // are enabled to reduce memory usage
            promise.source = newPromise;
        }

        array_reduce(messages, function (undefined, message) {
            Q.nextTick(function () {
                newPromise.promiseDispatch.apply(newPromise, message);
            });
        }, void 0);

        messages = void 0;
        progressListeners = void 0;
    }

    deferred.promise = promise;
    deferred.resolve = function (value) {
        if (resolvedPromise) {
            return;
        }

        become(Q(value));
    };

    deferred.fulfill = function (value) {
        if (resolvedPromise) {
            return;
        }

        become(fulfill(value));
    };
    deferred.reject = function (reason) {
        if (resolvedPromise) {
            return;
        }

        become(reject(reason));
    };
    deferred.notify = function (progress) {
        if (resolvedPromise) {
            return;
        }

        array_reduce(progressListeners, function (undefined, progressListener) {
            Q.nextTick(function () {
                progressListener(progress);
            });
        }, void 0);
    };

    return deferred;
}

/**
 * Creates a Node-style callback that will resolve or reject the deferred
 * promise.
 * @returns a nodeback
 */
defer.prototype.makeNodeResolver = function () {
    var self = this;
    return function (error, value) {
        if (error) {
            self.reject(error);
        } else if (arguments.length > 2) {
            self.resolve(array_slice(arguments, 1));
        } else {
            self.resolve(value);
        }
    };
};

/**
 * @param resolver {Function} a function that returns nothing and accepts
 * the resolve, reject, and notify functions for a deferred.
 * @returns a promise that may be resolved with the given resolve and reject
 * functions, or rejected by a thrown exception in resolver
 */
Q.Promise = promise; // ES6
Q.promise = promise;
function promise(resolver) {
    if (typeof resolver !== "function") {
        throw new TypeError("resolver must be a function.");
    }
    var deferred = defer();
    try {
        resolver(deferred.resolve, deferred.reject, deferred.notify);
    } catch (reason) {
        deferred.reject(reason);
    }
    return deferred.promise;
}

promise.race = race; // ES6
promise.all = all; // ES6
promise.reject = reject; // ES6
promise.resolve = Q; // ES6

// XXX experimental.  This method is a way to denote that a local value is
// serializable and should be immediately dispatched to a remote upon request,
// instead of passing a reference.
Q.passByCopy = function (object) {
    //freeze(object);
    //passByCopies.set(object, true);
    return object;
};

Promise.prototype.passByCopy = function () {
    //freeze(object);
    //passByCopies.set(object, true);
    return this;
};

/**
 * If two promises eventually fulfill to the same value, promises that value,
 * but otherwise rejects.
 * @param x {Any*}
 * @param y {Any*}
 * @returns {Any*} a promise for x and y if they are the same, but a rejection
 * otherwise.
 *
 */
Q.join = function (x, y) {
    return Q(x).join(y);
};

Promise.prototype.join = function (that) {
    return Q([this, that]).spread(function (x, y) {
        if (x === y) {
            // TODO: "===" should be Object.is or equiv
            return x;
        } else {
            throw new Error("Q can't join: not the same: " + x + " " + y);
        }
    });
};

/**
 * Returns a promise for the first of an array of promises to become settled.
 * @param answers {Array[Any*]} promises to race
 * @returns {Any*} the first promise to be settled
 */
Q.race = race;
function race(answerPs) {
    return promise(function (resolve, reject) {
        // Switch to this once we can assume at least ES5
        // answerPs.forEach(function (answerP) {
        //     Q(answerP).then(resolve, reject);
        // });
        // Use this in the meantime
        for (var i = 0, len = answerPs.length; i < len; i++) {
            Q(answerPs[i]).then(resolve, reject);
        }
    });
}

Promise.prototype.race = function () {
    return this.then(Q.race);
};

/**
 * Constructs a Promise with a promise descriptor object and optional fallback
 * function.  The descriptor contains methods like when(rejected), get(name),
 * set(name, value), post(name, args), and delete(name), which all
 * return either a value, a promise for a value, or a rejection.  The fallback
 * accepts the operation name, a resolver, and any further arguments that would
 * have been forwarded to the appropriate method above had a method been
 * provided with the proper name.  The API makes no guarantees about the nature
 * of the returned object, apart from that it is usable whereever promises are
 * bought and sold.
 */
Q.makePromise = Promise;
function Promise(descriptor, fallback, inspect) {
    if (fallback === void 0) {
        fallback = function (op) {
            return reject(new Error(
                "Promise does not support operation: " + op
            ));
        };
    }
    if (inspect === void 0) {
        inspect = function () {
            return {state: "unknown"};
        };
    }

    var promise = object_create(Promise.prototype);

    promise.promiseDispatch = function (resolve, op, args) {
        var result;
        try {
            if (descriptor[op]) {
                result = descriptor[op].apply(promise, args);
            } else {
                result = fallback.call(promise, op, args);
            }
        } catch (exception) {
            result = reject(exception);
        }
        if (resolve) {
            resolve(result);
        }
    };

    promise.inspect = inspect;

    // XXX deprecated `valueOf` and `exception` support
    if (inspect) {
        var inspected = inspect();
        if (inspected.state === "rejected") {
            promise.exception = inspected.reason;
        }

        promise.valueOf = function () {
            var inspected = inspect();
            if (inspected.state === "pending" ||
                inspected.state === "rejected") {
                return promise;
            }
            return inspected.value;
        };
    }

    return promise;
}

Promise.prototype.toString = function () {
    return "[object Promise]";
};

Promise.prototype.then = function (fulfilled, rejected, progressed) {
    var self = this;
    var deferred = defer();
    var done = false;   // ensure the untrusted promise makes at most a
                        // single call to one of the callbacks

    function _fulfilled(value) {
        try {
            return typeof fulfilled === "function" ? fulfilled(value) : value;
        } catch (exception) {
            return reject(exception);
        }
    }

    function _rejected(exception) {
        if (typeof rejected === "function") {
            makeStackTraceLong(exception, self);
            try {
                return rejected(exception);
            } catch (newException) {
                return reject(newException);
            }
        }
        return reject(exception);
    }

    function _progressed(value) {
        return typeof progressed === "function" ? progressed(value) : value;
    }

    Q.nextTick(function () {
        self.promiseDispatch(function (value) {
            if (done) {
                return;
            }
            done = true;

            deferred.resolve(_fulfilled(value));
        }, "when", [function (exception) {
            if (done) {
                return;
            }
            done = true;

            deferred.resolve(_rejected(exception));
        }]);
    });

    // Progress propagator need to be attached in the current tick.
    self.promiseDispatch(void 0, "when", [void 0, function (value) {
        var newValue;
        var threw = false;
        try {
            newValue = _progressed(value);
        } catch (e) {
            threw = true;
            if (Q.onerror) {
                Q.onerror(e);
            } else {
                throw e;
            }
        }

        if (!threw) {
            deferred.notify(newValue);
        }
    }]);

    return deferred.promise;
};

Q.tap = function (promise, callback) {
    return Q(promise).tap(callback);
};

/**
 * Works almost like "finally", but not called for rejections.
 * Original resolution value is passed through callback unaffected.
 * Callback may return a promise that will be awaited for.
 * @param {Function} callback
 * @returns {Q.Promise}
 * @example
 * doSomething()
 *   .then(...)
 *   .tap(console.log)
 *   .then(...);
 */
Promise.prototype.tap = function (callback) {
    callback = Q(callback);

    return this.then(function (value) {
        return callback.fcall(value).thenResolve(value);
    });
};

/**
 * Registers an observer on a promise.
 *
 * Guarantees:
 *
 * 1. that fulfilled and rejected will be called only once.
 * 2. that either the fulfilled callback or the rejected callback will be
 *    called, but not both.
 * 3. that fulfilled and rejected will not be called in this turn.
 *
 * @param value      promise or immediate reference to observe
 * @param fulfilled  function to be called with the fulfilled value
 * @param rejected   function to be called with the rejection exception
 * @param progressed function to be called on any progress notifications
 * @return promise for the return value from the invoked callback
 */
Q.when = when;
function when(value, fulfilled, rejected, progressed) {
    return Q(value).then(fulfilled, rejected, progressed);
}

Promise.prototype.thenResolve = function (value) {
    return this.then(function () { return value; });
};

Q.thenResolve = function (promise, value) {
    return Q(promise).thenResolve(value);
};

Promise.prototype.thenReject = function (reason) {
    return this.then(function () { throw reason; });
};

Q.thenReject = function (promise, reason) {
    return Q(promise).thenReject(reason);
};

/**
 * If an object is not a promise, it is as "near" as possible.
 * If a promise is rejected, it is as "near" as possible too.
 * If it’s a fulfilled promise, the fulfillment value is nearer.
 * If it’s a deferred promise and the deferred has been resolved, the
 * resolution is "nearer".
 * @param object
 * @returns most resolved (nearest) form of the object
 */

// XXX should we re-do this?
Q.nearer = nearer;
function nearer(value) {
    if (isPromise(value)) {
        var inspected = value.inspect();
        if (inspected.state === "fulfilled") {
            return inspected.value;
        }
    }
    return value;
}

/**
 * @returns whether the given object is a promise.
 * Otherwise it is a fulfilled value.
 */
Q.isPromise = isPromise;
function isPromise(object) {
    return object instanceof Promise;
}

Q.isPromiseAlike = isPromiseAlike;
function isPromiseAlike(object) {
    return isObject(object) && typeof object.then === "function";
}

/**
 * @returns whether the given object is a pending promise, meaning not
 * fulfilled or rejected.
 */
Q.isPending = isPending;
function isPending(object) {
    return isPromise(object) && object.inspect().state === "pending";
}

Promise.prototype.isPending = function () {
    return this.inspect().state === "pending";
};

/**
 * @returns whether the given object is a value or fulfilled
 * promise.
 */
Q.isFulfilled = isFulfilled;
function isFulfilled(object) {
    return !isPromise(object) || object.inspect().state === "fulfilled";
}

Promise.prototype.isFulfilled = function () {
    return this.inspect().state === "fulfilled";
};

/**
 * @returns whether the given object is a rejected promise.
 */
Q.isRejected = isRejected;
function isRejected(object) {
    return isPromise(object) && object.inspect().state === "rejected";
}

Promise.prototype.isRejected = function () {
    return this.inspect().state === "rejected";
};

//// BEGIN UNHANDLED REJECTION TRACKING

// This promise library consumes exceptions thrown in handlers so they can be
// handled by a subsequent promise.  The exceptions get added to this array when
// they are created, and removed when they are handled.  Note that in ES6 or
// shimmed environments, this would naturally be a `Set`.
var unhandledReasons = [];
var unhandledRejections = [];
var reportedUnhandledRejections = [];
var trackUnhandledRejections = true;

function resetUnhandledRejections() {
    unhandledReasons.length = 0;
    unhandledRejections.length = 0;

    if (!trackUnhandledRejections) {
        trackUnhandledRejections = true;
    }
}

function trackRejection(promise, reason) {
    if (!trackUnhandledRejections) {
        return;
    }
    if (typeof process === "object" && typeof process.emit === "function") {
        Q.nextTick.runAfter(function () {
            if (array_indexOf(unhandledRejections, promise) !== -1) {
                process.emit("unhandledRejection", reason, promise);
                reportedUnhandledRejections.push(promise);
            }
        });
    }

    unhandledRejections.push(promise);
    if (reason && typeof reason.stack !== "undefined") {
        unhandledReasons.push(reason.stack);
    } else {
        unhandledReasons.push("(no stack) " + reason);
    }
}

function untrackRejection(promise) {
    if (!trackUnhandledRejections) {
        return;
    }

    var at = array_indexOf(unhandledRejections, promise);
    if (at !== -1) {
        if (typeof process === "object" && typeof process.emit === "function") {
            Q.nextTick.runAfter(function () {
                var atReport = array_indexOf(reportedUnhandledRejections, promise);
                if (atReport !== -1) {
                    process.emit("rejectionHandled", unhandledReasons[at], promise);
                    reportedUnhandledRejections.splice(atReport, 1);
                }
            });
        }
        unhandledRejections.splice(at, 1);
        unhandledReasons.splice(at, 1);
    }
}

Q.resetUnhandledRejections = resetUnhandledRejections;

Q.getUnhandledReasons = function () {
    // Make a copy so that consumers can't interfere with our internal state.
    return unhandledReasons.slice();
};

Q.stopUnhandledRejectionTracking = function () {
    resetUnhandledRejections();
    trackUnhandledRejections = false;
};

resetUnhandledRejections();

//// END UNHANDLED REJECTION TRACKING

/**
 * Constructs a rejected promise.
 * @param reason value describing the failure
 */
Q.reject = reject;
function reject(reason) {
    var rejection = Promise({
        "when": function (rejected) {
            // note that the error has been handled
            if (rejected) {
                untrackRejection(this);
            }
            return rejected ? rejected(reason) : this;
        }
    }, function fallback() {
        return this;
    }, function inspect() {
        return { state: "rejected", reason: reason };
    });

    // Note that the reason has not been handled.
    trackRejection(rejection, reason);

    return rejection;
}

/**
 * Constructs a fulfilled promise for an immediate reference.
 * @param value immediate reference
 */
Q.fulfill = fulfill;
function fulfill(value) {
    return Promise({
        "when": function () {
            return value;
        },
        "get": function (name) {
            return value[name];
        },
        "set": function (name, rhs) {
            value[name] = rhs;
        },
        "delete": function (name) {
            delete value[name];
        },
        "post": function (name, args) {
            // Mark Miller proposes that post with no name should apply a
            // promised function.
            if (name === null || name === void 0) {
                return value.apply(void 0, args);
            } else {
                return value[name].apply(value, args);
            }
        },
        "apply": function (thisp, args) {
            return value.apply(thisp, args);
        },
        "keys": function () {
            return object_keys(value);
        }
    }, void 0, function inspect() {
        return { state: "fulfilled", value: value };
    });
}

/**
 * Converts thenables to Q promises.
 * @param promise thenable promise
 * @returns a Q promise
 */
function coerce(promise) {
    var deferred = defer();
    Q.nextTick(function () {
        try {
            promise.then(deferred.resolve, deferred.reject, deferred.notify);
        } catch (exception) {
            deferred.reject(exception);
        }
    });
    return deferred.promise;
}

/**
 * Annotates an object such that it will never be
 * transferred away from this process over any promise
 * communication channel.
 * @param object
 * @returns promise a wrapping of that object that
 * additionally responds to the "isDef" message
 * without a rejection.
 */
Q.master = master;
function master(object) {
    return Promise({
        "isDef": function () {}
    }, function fallback(op, args) {
        return dispatch(object, op, args);
    }, function () {
        return Q(object).inspect();
    });
}

/**
 * Spreads the values of a promised array of arguments into the
 * fulfillment callback.
 * @param fulfilled callback that receives variadic arguments from the
 * promised array
 * @param rejected callback that receives the exception if the promise
 * is rejected.
 * @returns a promise for the return value or thrown exception of
 * either callback.
 */
Q.spread = spread;
function spread(value, fulfilled, rejected) {
    return Q(value).spread(fulfilled, rejected);
}

Promise.prototype.spread = function (fulfilled, rejected) {
    return this.all().then(function (array) {
        return fulfilled.apply(void 0, array);
    }, rejected);
};

/**
 * The async function is a decorator for generator functions, turning
 * them into asynchronous generators.  Although generators are only part
 * of the newest ECMAScript 6 drafts, this code does not cause syntax
 * errors in older engines.  This code should continue to work and will
 * in fact improve over time as the language improves.
 *
 * ES6 generators are currently part of V8 version 3.19 with the
 * --harmony-generators runtime flag enabled.  SpiderMonkey has had them
 * for longer, but under an older Python-inspired form.  This function
 * works on both kinds of generators.
 *
 * Decorates a generator function such that:
 *  - it may yield promises
 *  - execution will continue when that promise is fulfilled
 *  - the value of the yield expression will be the fulfilled value
 *  - it returns a promise for the return value (when the generator
 *    stops iterating)
 *  - the decorated function returns a promise for the return value
 *    of the generator or the first rejected promise among those
 *    yielded.
 *  - if an error is thrown in the generator, it propagates through
 *    every following yield until it is caught, or until it escapes
 *    the generator function altogether, and is translated into a
 *    rejection for the promise returned by the decorated generator.
 */
Q.async = async;
function async(makeGenerator) {
    return function () {
        // when verb is "send", arg is a value
        // when verb is "throw", arg is an exception
        function continuer(verb, arg) {
            var result;

            // Until V8 3.19 / Chromium 29 is released, SpiderMonkey is the only
            // engine that has a deployed base of browsers that support generators.
            // However, SM's generators use the Python-inspired semantics of
            // outdated ES6 drafts.  We would like to support ES6, but we'd also
            // like to make it possible to use generators in deployed browsers, so
            // we also support Python-style generators.  At some point we can remove
            // this block.

            if (typeof StopIteration === "undefined") {
                // ES6 Generators
                try {
                    result = generator[verb](arg);
                } catch (exception) {
                    return reject(exception);
                }
                if (result.done) {
                    return Q(result.value);
                } else {
                    return when(result.value, callback, errback);
                }
            } else {
                // SpiderMonkey Generators
                // FIXME: Remove this case when SM does ES6 generators.
                try {
                    result = generator[verb](arg);
                } catch (exception) {
                    if (isStopIteration(exception)) {
                        return Q(exception.value);
                    } else {
                        return reject(exception);
                    }
                }
                return when(result, callback, errback);
            }
        }
        var generator = makeGenerator.apply(this, arguments);
        var callback = continuer.bind(continuer, "next");
        var errback = continuer.bind(continuer, "throw");
        return callback();
    };
}

/**
 * The spawn function is a small wrapper around async that immediately
 * calls the generator and also ends the promise chain, so that any
 * unhandled errors are thrown instead of forwarded to the error
 * handler. This is useful because it's extremely common to run
 * generators at the top-level to work with libraries.
 */
Q.spawn = spawn;
function spawn(makeGenerator) {
    Q.done(Q.async(makeGenerator)());
}

// FIXME: Remove this interface once ES6 generators are in SpiderMonkey.
/**
 * Throws a ReturnValue exception to stop an asynchronous generator.
 *
 * This interface is a stop-gap measure to support generator return
 * values in older Firefox/SpiderMonkey.  In browsers that support ES6
 * generators like Chromium 29, just use "return" in your generator
 * functions.
 *
 * @param value the return value for the surrounding generator
 * @throws ReturnValue exception with the value.
 * @example
 * // ES6 style
 * Q.async(function* () {
 *      var foo = yield getFooPromise();
 *      var bar = yield getBarPromise();
 *      return foo + bar;
 * })
 * // Older SpiderMonkey style
 * Q.async(function () {
 *      var foo = yield getFooPromise();
 *      var bar = yield getBarPromise();
 *      Q.return(foo + bar);
 * })
 */
Q["return"] = _return;
function _return(value) {
    throw new QReturnValue(value);
}

/**
 * The promised function decorator ensures that any promise arguments
 * are settled and passed as values (`this` is also settled and passed
 * as a value).  It will also ensure that the result of a function is
 * always a promise.
 *
 * @example
 * var add = Q.promised(function (a, b) {
 *     return a + b;
 * });
 * add(Q(a), Q(B));
 *
 * @param {function} callback The function to decorate
 * @returns {function} a function that has been decorated.
 */
Q.promised = promised;
function promised(callback) {
    return function () {
        return spread([this, all(arguments)], function (self, args) {
            return callback.apply(self, args);
        });
    };
}

/**
 * sends a message to a value in a future turn
 * @param object* the recipient
 * @param op the name of the message operation, e.g., "when",
 * @param args further arguments to be forwarded to the operation
 * @returns result {Promise} a promise for the result of the operation
 */
Q.dispatch = dispatch;
function dispatch(object, op, args) {
    return Q(object).dispatch(op, args);
}

Promise.prototype.dispatch = function (op, args) {
    var self = this;
    var deferred = defer();
    Q.nextTick(function () {
        self.promiseDispatch(deferred.resolve, op, args);
    });
    return deferred.promise;
};

/**
 * Gets the value of a property in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of property to get
 * @return promise for the property value
 */
Q.get = function (object, key) {
    return Q(object).dispatch("get", [key]);
};

Promise.prototype.get = function (key) {
    return this.dispatch("get", [key]);
};

/**
 * Sets the value of a property in a future turn.
 * @param object    promise or immediate reference for object object
 * @param name      name of property to set
 * @param value     new value of property
 * @return promise for the return value
 */
Q.set = function (object, key, value) {
    return Q(object).dispatch("set", [key, value]);
};

Promise.prototype.set = function (key, value) {
    return this.dispatch("set", [key, value]);
};

/**
 * Deletes a property in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of property to delete
 * @return promise for the return value
 */
Q.del = // XXX legacy
Q["delete"] = function (object, key) {
    return Q(object).dispatch("delete", [key]);
};

Promise.prototype.del = // XXX legacy
Promise.prototype["delete"] = function (key) {
    return this.dispatch("delete", [key]);
};

/**
 * Invokes a method in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of method to invoke
 * @param value     a value to post, typically an array of
 *                  invocation arguments for promises that
 *                  are ultimately backed with `resolve` values,
 *                  as opposed to those backed with URLs
 *                  wherein the posted value can be any
 *                  JSON serializable object.
 * @return promise for the return value
 */
// bound locally because it is used by other methods
Q.mapply = // XXX As proposed by "Redsandro"
Q.post = function (object, name, args) {
    return Q(object).dispatch("post", [name, args]);
};

Promise.prototype.mapply = // XXX As proposed by "Redsandro"
Promise.prototype.post = function (name, args) {
    return this.dispatch("post", [name, args]);
};

/**
 * Invokes a method in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of method to invoke
 * @param ...args   array of invocation arguments
 * @return promise for the return value
 */
Q.send = // XXX Mark Miller's proposed parlance
Q.mcall = // XXX As proposed by "Redsandro"
Q.invoke = function (object, name /*...args*/) {
    return Q(object).dispatch("post", [name, array_slice(arguments, 2)]);
};

Promise.prototype.send = // XXX Mark Miller's proposed parlance
Promise.prototype.mcall = // XXX As proposed by "Redsandro"
Promise.prototype.invoke = function (name /*...args*/) {
    return this.dispatch("post", [name, array_slice(arguments, 1)]);
};

/**
 * Applies the promised function in a future turn.
 * @param object    promise or immediate reference for target function
 * @param args      array of application arguments
 */
Q.fapply = function (object, args) {
    return Q(object).dispatch("apply", [void 0, args]);
};

Promise.prototype.fapply = function (args) {
    return this.dispatch("apply", [void 0, args]);
};

/**
 * Calls the promised function in a future turn.
 * @param object    promise or immediate reference for target function
 * @param ...args   array of application arguments
 */
Q["try"] =
Q.fcall = function (object /* ...args*/) {
    return Q(object).dispatch("apply", [void 0, array_slice(arguments, 1)]);
};

Promise.prototype.fcall = function (/*...args*/) {
    return this.dispatch("apply", [void 0, array_slice(arguments)]);
};

/**
 * Binds the promised function, transforming return values into a fulfilled
 * promise and thrown errors into a rejected one.
 * @param object    promise or immediate reference for target function
 * @param ...args   array of application arguments
 */
Q.fbind = function (object /*...args*/) {
    var promise = Q(object);
    var args = array_slice(arguments, 1);
    return function fbound() {
        return promise.dispatch("apply", [
            this,
            args.concat(array_slice(arguments))
        ]);
    };
};
Promise.prototype.fbind = function (/*...args*/) {
    var promise = this;
    var args = array_slice(arguments);
    return function fbound() {
        return promise.dispatch("apply", [
            this,
            args.concat(array_slice(arguments))
        ]);
    };
};

/**
 * Requests the names of the owned properties of a promised
 * object in a future turn.
 * @param object    promise or immediate reference for target object
 * @return promise for the keys of the eventually settled object
 */
Q.keys = function (object) {
    return Q(object).dispatch("keys", []);
};

Promise.prototype.keys = function () {
    return this.dispatch("keys", []);
};

/**
 * Turns an array of promises into a promise for an array.  If any of
 * the promises gets rejected, the whole array is rejected immediately.
 * @param {Array*} an array (or promise for an array) of values (or
 * promises for values)
 * @returns a promise for an array of the corresponding values
 */
// By Mark Miller
// http://wiki.ecmascript.org/doku.php?id=strawman:concurrency&rev=1308776521#allfulfilled
Q.all = all;
function all(promises) {
    return when(promises, function (promises) {
        var pendingCount = 0;
        var deferred = defer();
        array_reduce(promises, function (undefined, promise, index) {
            var snapshot;
            if (
                isPromise(promise) &&
                (snapshot = promise.inspect()).state === "fulfilled"
            ) {
                promises[index] = snapshot.value;
            } else {
                ++pendingCount;
                when(
                    promise,
                    function (value) {
                        promises[index] = value;
                        if (--pendingCount === 0) {
                            deferred.resolve(promises);
                        }
                    },
                    deferred.reject,
                    function (progress) {
                        deferred.notify({ index: index, value: progress });
                    }
                );
            }
        }, void 0);
        if (pendingCount === 0) {
            deferred.resolve(promises);
        }
        return deferred.promise;
    });
}

Promise.prototype.all = function () {
    return all(this);
};

/**
 * Returns the first resolved promise of an array. Prior rejected promises are
 * ignored.  Rejects only if all promises are rejected.
 * @param {Array*} an array containing values or promises for values
 * @returns a promise fulfilled with the value of the first resolved promise,
 * or a rejected promise if all promises are rejected.
 */
Q.any = any;

function any(promises) {
    if (promises.length === 0) {
        return Q.resolve();
    }

    var deferred = Q.defer();
    var pendingCount = 0;
    array_reduce(promises, function (prev, current, index) {
        var promise = promises[index];

        pendingCount++;

        when(promise, onFulfilled, onRejected, onProgress);
        function onFulfilled(result) {
            deferred.resolve(result);
        }
        function onRejected(err) {
            pendingCount--;
            if (pendingCount === 0) {
                var rejection = err || new Error("" + err);

                rejection.message = ("Q can't get fulfillment value from any promise, all " +
                    "promises were rejected. Last error message: " + rejection.message);

                deferred.reject(rejection);
            }
        }
        function onProgress(progress) {
            deferred.notify({
                index: index,
                value: progress
            });
        }
    }, undefined);

    return deferred.promise;
}

Promise.prototype.any = function () {
    return any(this);
};

/**
 * Waits for all promises to be settled, either fulfilled or
 * rejected.  This is distinct from `all` since that would stop
 * waiting at the first rejection.  The promise returned by
 * `allResolved` will never be rejected.
 * @param promises a promise for an array (or an array) of promises
 * (or values)
 * @return a promise for an array of promises
 */
Q.allResolved = deprecate(allResolved, "allResolved", "allSettled");
function allResolved(promises) {
    return when(promises, function (promises) {
        promises = array_map(promises, Q);
        return when(all(array_map(promises, function (promise) {
            return when(promise, noop, noop);
        })), function () {
            return promises;
        });
    });
}

Promise.prototype.allResolved = function () {
    return allResolved(this);
};

/**
 * @see Promise#allSettled
 */
Q.allSettled = allSettled;
function allSettled(promises) {
    return Q(promises).allSettled();
}

/**
 * Turns an array of promises into a promise for an array of their states (as
 * returned by `inspect`) when they have all settled.
 * @param {Array[Any*]} values an array (or promise for an array) of values (or
 * promises for values)
 * @returns {Array[State]} an array of states for the respective values.
 */
Promise.prototype.allSettled = function () {
    return this.then(function (promises) {
        return all(array_map(promises, function (promise) {
            promise = Q(promise);
            function regardless() {
                return promise.inspect();
            }
            return promise.then(regardless, regardless);
        }));
    });
};

/**
 * Captures the failure of a promise, giving an oportunity to recover
 * with a callback.  If the given promise is fulfilled, the returned
 * promise is fulfilled.
 * @param {Any*} promise for something
 * @param {Function} callback to fulfill the returned promise if the
 * given promise is rejected
 * @returns a promise for the return value of the callback
 */
Q.fail = // XXX legacy
Q["catch"] = function (object, rejected) {
    return Q(object).then(void 0, rejected);
};

Promise.prototype.fail = // XXX legacy
Promise.prototype["catch"] = function (rejected) {
    return this.then(void 0, rejected);
};

/**
 * Attaches a listener that can respond to progress notifications from a
 * promise's originating deferred. This listener receives the exact arguments
 * passed to ``deferred.notify``.
 * @param {Any*} promise for something
 * @param {Function} callback to receive any progress notifications
 * @returns the given promise, unchanged
 */
Q.progress = progress;
function progress(object, progressed) {
    return Q(object).then(void 0, void 0, progressed);
}

Promise.prototype.progress = function (progressed) {
    return this.then(void 0, void 0, progressed);
};

/**
 * Provides an opportunity to observe the settling of a promise,
 * regardless of whether the promise is fulfilled or rejected.  Forwards
 * the resolution to the returned promise when the callback is done.
 * The callback can return a promise to defer completion.
 * @param {Any*} promise
 * @param {Function} callback to observe the resolution of the given
 * promise, takes no arguments.
 * @returns a promise for the resolution of the given promise when
 * ``fin`` is done.
 */
Q.fin = // XXX legacy
Q["finally"] = function (object, callback) {
    return Q(object)["finally"](callback);
};

Promise.prototype.fin = // XXX legacy
Promise.prototype["finally"] = function (callback) {
    if (!callback || typeof callback.apply !== "function") {
        throw new Error("Q can't apply finally callback");
    }
    callback = Q(callback);
    return this.then(function (value) {
        return callback.fcall().then(function () {
            return value;
        });
    }, function (reason) {
        // TODO attempt to recycle the rejection with "this".
        return callback.fcall().then(function () {
            throw reason;
        });
    });
};

/**
 * Terminates a chain of promises, forcing rejections to be
 * thrown as exceptions.
 * @param {Any*} promise at the end of a chain of promises
 * @returns nothing
 */
Q.done = function (object, fulfilled, rejected, progress) {
    return Q(object).done(fulfilled, rejected, progress);
};

Promise.prototype.done = function (fulfilled, rejected, progress) {
    var onUnhandledError = function (error) {
        // forward to a future turn so that ``when``
        // does not catch it and turn it into a rejection.
        Q.nextTick(function () {
            makeStackTraceLong(error, promise);
            if (Q.onerror) {
                Q.onerror(error);
            } else {
                throw error;
            }
        });
    };

    // Avoid unnecessary `nextTick`ing via an unnecessary `when`.
    var promise = fulfilled || rejected || progress ?
        this.then(fulfilled, rejected, progress) :
        this;

    if (typeof process === "object" && process && process.domain) {
        onUnhandledError = process.domain.bind(onUnhandledError);
    }

    promise.then(void 0, onUnhandledError);
};

/**
 * Causes a promise to be rejected if it does not get fulfilled before
 * some milliseconds time out.
 * @param {Any*} promise
 * @param {Number} milliseconds timeout
 * @param {Any*} custom error message or Error object (optional)
 * @returns a promise for the resolution of the given promise if it is
 * fulfilled before the timeout, otherwise rejected.
 */
Q.timeout = function (object, ms, error) {
    return Q(object).timeout(ms, error);
};

Promise.prototype.timeout = function (ms, error) {
    var deferred = defer();
    var timeoutId = setTimeout(function () {
        if (!error || "string" === typeof error) {
            error = new Error(error || "Timed out after " + ms + " ms");
            error.code = "ETIMEDOUT";
        }
        deferred.reject(error);
    }, ms);

    this.then(function (value) {
        clearTimeout(timeoutId);
        deferred.resolve(value);
    }, function (exception) {
        clearTimeout(timeoutId);
        deferred.reject(exception);
    }, deferred.notify);

    return deferred.promise;
};

/**
 * Returns a promise for the given value (or promised value), some
 * milliseconds after it resolved. Passes rejections immediately.
 * @param {Any*} promise
 * @param {Number} milliseconds
 * @returns a promise for the resolution of the given promise after milliseconds
 * time has elapsed since the resolution of the given promise.
 * If the given promise rejects, that is passed immediately.
 */
Q.delay = function (object, timeout) {
    if (timeout === void 0) {
        timeout = object;
        object = void 0;
    }
    return Q(object).delay(timeout);
};

Promise.prototype.delay = function (timeout) {
    return this.then(function (value) {
        var deferred = defer();
        setTimeout(function () {
            deferred.resolve(value);
        }, timeout);
        return deferred.promise;
    });
};

/**
 * Passes a continuation to a Node function, which is called with the given
 * arguments provided as an array, and returns a promise.
 *
 *      Q.nfapply(FS.readFile, [__filename])
 *      .then(function (content) {
 *      })
 *
 */
Q.nfapply = function (callback, args) {
    return Q(callback).nfapply(args);
};

Promise.prototype.nfapply = function (args) {
    var deferred = defer();
    var nodeArgs = array_slice(args);
    nodeArgs.push(deferred.makeNodeResolver());
    this.fapply(nodeArgs).fail(deferred.reject);
    return deferred.promise;
};

/**
 * Passes a continuation to a Node function, which is called with the given
 * arguments provided individually, and returns a promise.
 * @example
 * Q.nfcall(FS.readFile, __filename)
 * .then(function (content) {
 * })
 *
 */
Q.nfcall = function (callback /*...args*/) {
    var args = array_slice(arguments, 1);
    return Q(callback).nfapply(args);
};

Promise.prototype.nfcall = function (/*...args*/) {
    var nodeArgs = array_slice(arguments);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    this.fapply(nodeArgs).fail(deferred.reject);
    return deferred.promise;
};

/**
 * Wraps a NodeJS continuation passing function and returns an equivalent
 * version that returns a promise.
 * @example
 * Q.nfbind(FS.readFile, __filename)("utf-8")
 * .then(console.log)
 * .done()
 */
Q.nfbind =
Q.denodeify = function (callback /*...args*/) {
    if (callback === undefined) {
        throw new Error("Q can't wrap an undefined function");
    }
    var baseArgs = array_slice(arguments, 1);
    return function () {
        var nodeArgs = baseArgs.concat(array_slice(arguments));
        var deferred = defer();
        nodeArgs.push(deferred.makeNodeResolver());
        Q(callback).fapply(nodeArgs).fail(deferred.reject);
        return deferred.promise;
    };
};

Promise.prototype.nfbind =
Promise.prototype.denodeify = function (/*...args*/) {
    var args = array_slice(arguments);
    args.unshift(this);
    return Q.denodeify.apply(void 0, args);
};

Q.nbind = function (callback, thisp /*...args*/) {
    var baseArgs = array_slice(arguments, 2);
    return function () {
        var nodeArgs = baseArgs.concat(array_slice(arguments));
        var deferred = defer();
        nodeArgs.push(deferred.makeNodeResolver());
        function bound() {
            return callback.apply(thisp, arguments);
        }
        Q(bound).fapply(nodeArgs).fail(deferred.reject);
        return deferred.promise;
    };
};

Promise.prototype.nbind = function (/*thisp, ...args*/) {
    var args = array_slice(arguments, 0);
    args.unshift(this);
    return Q.nbind.apply(void 0, args);
};

/**
 * Calls a method of a Node-style object that accepts a Node-style
 * callback with a given array of arguments, plus a provided callback.
 * @param object an object that has the named method
 * @param {String} name name of the method of object
 * @param {Array} args arguments to pass to the method; the callback
 * will be provided by Q and appended to these arguments.
 * @returns a promise for the value or error
 */
Q.nmapply = // XXX As proposed by "Redsandro"
Q.npost = function (object, name, args) {
    return Q(object).npost(name, args);
};

Promise.prototype.nmapply = // XXX As proposed by "Redsandro"
Promise.prototype.npost = function (name, args) {
    var nodeArgs = array_slice(args || []);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    this.dispatch("post", [name, nodeArgs]).fail(deferred.reject);
    return deferred.promise;
};

/**
 * Calls a method of a Node-style object that accepts a Node-style
 * callback, forwarding the given variadic arguments, plus a provided
 * callback argument.
 * @param object an object that has the named method
 * @param {String} name name of the method of object
 * @param ...args arguments to pass to the method; the callback will
 * be provided by Q and appended to these arguments.
 * @returns a promise for the value or error
 */
Q.nsend = // XXX Based on Mark Miller's proposed "send"
Q.nmcall = // XXX Based on "Redsandro's" proposal
Q.ninvoke = function (object, name /*...args*/) {
    var nodeArgs = array_slice(arguments, 2);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    Q(object).dispatch("post", [name, nodeArgs]).fail(deferred.reject);
    return deferred.promise;
};

Promise.prototype.nsend = // XXX Based on Mark Miller's proposed "send"
Promise.prototype.nmcall = // XXX Based on "Redsandro's" proposal
Promise.prototype.ninvoke = function (name /*...args*/) {
    var nodeArgs = array_slice(arguments, 1);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    this.dispatch("post", [name, nodeArgs]).fail(deferred.reject);
    return deferred.promise;
};

/**
 * If a function would like to support both Node continuation-passing-style and
 * promise-returning-style, it can end its internal promise chain with
 * `nodeify(nodeback)`, forwarding the optional nodeback argument.  If the user
 * elects to use a nodeback, the result will be sent there.  If they do not
 * pass a nodeback, they will receive the result promise.
 * @param object a result (or a promise for a result)
 * @param {Function} nodeback a Node.js-style callback
 * @returns either the promise or nothing
 */
Q.nodeify = nodeify;
function nodeify(object, nodeback) {
    return Q(object).nodeify(nodeback);
}

Promise.prototype.nodeify = function (nodeback) {
    if (nodeback) {
        this.then(function (value) {
            Q.nextTick(function () {
                nodeback(null, value);
            });
        }, function (error) {
            Q.nextTick(function () {
                nodeback(error);
            });
        });
    } else {
        return this;
    }
};

Q.noConflict = function() {
    throw new Error("Q.noConflict only works when Q is used as a global");
};

// All code before this point will be filtered from stack traces.
var qEndingLine = captureLine();

return Q;

});

!function(t){if("function"==typeof bootstrap)bootstrap("nedb",t);else if("object"==typeof exports)module.exports=t();else if("function"==typeof define&&define.amd)define(t);else if("undefined"!=typeof ses){if(!ses.ok())return;ses.makeNedb=t}else"undefined"!=typeof window?window.Nedb=t():global.Nedb=t()}(function(){var t;return function(t,e,n){function r(n,o){if(!e[n]){if(!t[n]){var a="function"==typeof require&&require;if(!o&&a)return a(n,!0);if(i)return i(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=e[n]={exports:{}};t[n][0].call(u.exports,function(e){var i=t[n][1][e];return r(i?i:e)},u,u.exports)}return e[n].exports}for(var i="function"==typeof require&&require,o=0;o<n.length;o++)r(n[o]);return r}({1:[function(t,e,n){function r(t,e){if(t.indexOf)return t.indexOf(e);for(var n=0;n<t.length;n++)if(e===t[n])return n;return-1}var i=t("__browserify_process");i.EventEmitter||(i.EventEmitter=function(){});var o=n.EventEmitter=i.EventEmitter,a="function"==typeof Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)},u=10;o.prototype.setMaxListeners=function(t){this._events||(this._events={}),this._events.maxListeners=t},o.prototype.emit=function(t){if("error"===t&&(!this._events||!this._events.error||a(this._events.error)&&!this._events.error.length))throw arguments[1]instanceof Error?arguments[1]:new Error("Uncaught, unspecified 'error' event.");if(!this._events)return!1;var e=this._events[t];if(!e)return!1;if("function"==typeof e){switch(arguments.length){case 1:e.call(this);break;case 2:e.call(this,arguments[1]);break;case 3:e.call(this,arguments[1],arguments[2]);break;default:var n=Array.prototype.slice.call(arguments,1);e.apply(this,n)}return!0}if(a(e)){for(var n=Array.prototype.slice.call(arguments,1),r=e.slice(),i=0,o=r.length;o>i;i++)r[i].apply(this,n);return!0}return!1},o.prototype.addListener=function(t,e){if("function"!=typeof e)throw new Error("addListener only takes instances of Function");if(this._events||(this._events={}),this.emit("newListener",t,e),this._events[t])if(a(this._events[t])){if(!this._events[t].warned){var n;n=void 0!==this._events.maxListeners?this._events.maxListeners:u,n&&n>0&&this._events[t].length>n&&(this._events[t].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[t].length),console.trace())}this._events[t].push(e)}else this._events[t]=[this._events[t],e];else this._events[t]=e;return this},o.prototype.on=o.prototype.addListener,o.prototype.once=function(t,e){var n=this;return n.on(t,function r(){n.removeListener(t,r),e.apply(this,arguments)}),this},o.prototype.removeListener=function(t,e){if("function"!=typeof e)throw new Error("removeListener only takes instances of Function");if(!this._events||!this._events[t])return this;var n=this._events[t];if(a(n)){var i=r(n,e);if(0>i)return this;n.splice(i,1),0==n.length&&delete this._events[t]}else this._events[t]===e&&delete this._events[t];return this},o.prototype.removeAllListeners=function(t){return 0===arguments.length?(this._events={},this):(t&&this._events&&this._events[t]&&(this._events[t]=null),this)},o.prototype.listeners=function(t){return this._events||(this._events={}),this._events[t]||(this._events[t]=[]),a(this._events[t])||(this._events[t]=[this._events[t]]),this._events[t]},o.listenerCount=function(t,e){var n;return n=t._events&&t._events[e]?"function"==typeof t._events[e]?1:t._events[e].length:0}},{__browserify_process:4}],2:[function(t,e,n){function r(t,e){for(var n=[],r=0;r<t.length;r++)e(t[r],r,t)&&n.push(t[r]);return n}function i(t,e){for(var n=0,r=t.length;r>=0;r--){var i=t[r];"."==i?t.splice(r,1):".."===i?(t.splice(r,1),n++):n&&(t.splice(r,1),n--)}if(e)for(;n--;n)t.unshift("..");return t}var o=t("__browserify_process"),a=/^(.+\/(?!$)|\/)?((?:.+?)?(\.[^.]*)?)$/;n.resolve=function(){for(var t="",e=!1,n=arguments.length;n>=-1&&!e;n--){var a=n>=0?arguments[n]:o.cwd();"string"==typeof a&&a&&(t=a+"/"+t,e="/"===a.charAt(0))}return t=i(r(t.split("/"),function(t){return!!t}),!e).join("/"),(e?"/":"")+t||"."},n.normalize=function(t){var e="/"===t.charAt(0),n="/"===t.slice(-1);return t=i(r(t.split("/"),function(t){return!!t}),!e).join("/"),t||e||(t="."),t&&n&&(t+="/"),(e?"/":"")+t},n.join=function(){var t=Array.prototype.slice.call(arguments,0);return n.normalize(r(t,function(t){return t&&"string"==typeof t}).join("/"))},n.dirname=function(t){var e=a.exec(t)[1]||"",n=!1;return e?1===e.length||n&&e.length<=3&&":"===e.charAt(1)?e:e.substring(0,e.length-1):"."},n.basename=function(t,e){var n=a.exec(t)[2]||"";return e&&n.substr(-1*e.length)===e&&(n=n.substr(0,n.length-e.length)),n},n.extname=function(t){return a.exec(t)[3]||""},n.relative=function(t,e){function r(t){for(var e=0;e<t.length&&""===t[e];e++);for(var n=t.length-1;n>=0&&""===t[n];n--);return e>n?[]:t.slice(e,n-e+1)}t=n.resolve(t).substr(1),e=n.resolve(e).substr(1);for(var i=r(t.split("/")),o=r(e.split("/")),a=Math.min(i.length,o.length),u=a,s=0;a>s;s++)if(i[s]!==o[s]){u=s;break}for(var c=[],s=u;s<i.length;s++)c.push("..");return c=c.concat(o.slice(u)),c.join("/")},n.sep="/"},{__browserify_process:4}],3:[function(t,e,n){function r(t){return Array.isArray(t)||"object"==typeof t&&"[object Array]"===Object.prototype.toString.call(t)}function i(t){"object"==typeof t&&"[object RegExp]"===Object.prototype.toString.call(t)}function o(t){return"object"==typeof t&&"[object Date]"===Object.prototype.toString.call(t)}t("events"),n.isArray=r,n.isDate=function(t){return"[object Date]"===Object.prototype.toString.call(t)},n.isRegExp=function(t){return"[object RegExp]"===Object.prototype.toString.call(t)},n.print=function(){},n.puts=function(){},n.debug=function(){},n.inspect=function(t,e,s,c){function f(t,s){if(t&&"function"==typeof t.inspect&&t!==n&&(!t.constructor||t.constructor.prototype!==t))return t.inspect(s);switch(typeof t){case"undefined":return h("undefined","undefined");case"string":var c="'"+JSON.stringify(t).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return h(c,"string");case"number":return h(""+t,"number");case"boolean":return h(""+t,"boolean")}if(null===t)return h("null","null");var p=a(t),d=e?u(t):p;if("function"==typeof t&&0===d.length){if(i(t))return h(""+t,"regexp");var y=t.name?": "+t.name:"";return h("[Function"+y+"]","special")}if(o(t)&&0===d.length)return h(t.toUTCString(),"date");var v,g,m;if(r(t)?(g="Array",m=["[","]"]):(g="Object",m=["{","}"]),"function"==typeof t){var b=t.name?": "+t.name:"";v=i(t)?" "+t:" [Function"+b+"]"}else v="";if(o(t)&&(v=" "+t.toUTCString()),0===d.length)return m[0]+v+m[1];if(0>s)return i(t)?h(""+t,"regexp"):h("[Object]","special");l.push(t);var w=d.map(function(e){var n,i;if(t.__lookupGetter__&&(t.__lookupGetter__(e)?i=t.__lookupSetter__(e)?h("[Getter/Setter]","special"):h("[Getter]","special"):t.__lookupSetter__(e)&&(i=h("[Setter]","special"))),p.indexOf(e)<0&&(n="["+e+"]"),i||(l.indexOf(t[e])<0?(i=null===s?f(t[e]):f(t[e],s-1),i.indexOf("\n")>-1&&(i=r(t)?i.split("\n").map(function(t){return"  "+t}).join("\n").substr(2):"\n"+i.split("\n").map(function(t){return"   "+t}).join("\n"))):i=h("[Circular]","special")),"undefined"==typeof n){if("Array"===g&&e.match(/^\d+$/))return i;n=JSON.stringify(""+e),n.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(n=n.substr(1,n.length-2),n=h(n,"name")):(n=n.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),n=h(n,"string"))}return n+": "+i});l.pop();var _=0,k=w.reduce(function(t,e){return _++,e.indexOf("\n")>=0&&_++,t+e.length+1},0);return w=k>50?m[0]+(""===v?"":v+"\n ")+" "+w.join(",\n  ")+" "+m[1]:m[0]+v+" "+w.join(", ")+" "+m[1]}var l=[],h=function(t,e){var n={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},r={special:"cyan",number:"blue","boolean":"yellow",undefined:"grey","null":"bold",string:"green",date:"magenta",regexp:"red"}[e];return r?"["+n[r][0]+"m"+t+"["+n[r][1]+"m":t};return c||(h=function(t){return t}),f(t,"undefined"==typeof s?2:s)},n.log=function(){},n.pump=null;var a=Object.keys||function(t){var e=[];for(var n in t)e.push(n);return e},u=Object.getOwnPropertyNames||function(t){var e=[];for(var n in t)Object.hasOwnProperty.call(t,n)&&e.push(n);return e},s=Object.create||function(t,e){var n;if(null===t)n={__proto__:null};else{if("object"!=typeof t)throw new TypeError("typeof prototype["+typeof t+"] != 'object'");var r=function(){};r.prototype=t,n=new r,n.__proto__=t}return"undefined"!=typeof e&&Object.defineProperties&&Object.defineProperties(n,e),n};n.inherits=function(t,e){t.super_=e,t.prototype=s(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}})};var c=/%[sdj%]/g;n.format=function(t){if("string"!=typeof t){for(var e=[],r=0;r<arguments.length;r++)e.push(n.inspect(arguments[r]));return e.join(" ")}for(var r=1,i=arguments,o=i.length,a=String(t).replace(c,function(t){if("%%"===t)return"%";if(r>=o)return t;switch(t){case"%s":return String(i[r++]);case"%d":return Number(i[r++]);case"%j":return JSON.stringify(i[r++]);default:return t}}),u=i[r];o>r;u=i[++r])a+=null===u||"object"!=typeof u?" "+u:" "+n.inspect(u);return a}},{events:1}],4:[function(t,e){var n=e.exports={};n.nextTick=function(){var t="undefined"!=typeof window&&window.setImmediate,e="undefined"!=typeof window&&window.postMessage&&window.addEventListener;if(t)return function(t){return window.setImmediate(t)};if(e){var n=[];return window.addEventListener("message",function(t){var e=t.source;if((e===window||null===e)&&"process-tick"===t.data&&(t.stopPropagation(),n.length>0)){var r=n.shift();r()}},!0),function(t){n.push(t),window.postMessage("process-tick","*")}}return function(t){setTimeout(t,0)}}(),n.title="browser",n.browser=!0,n.env={},n.argv=[],n.binding=function(){throw new Error("process.binding is not supported")},n.cwd=function(){return"/"},n.chdir=function(){throw new Error("process.chdir is not supported")}},{}],5:[function(t,e){function n(t,e,n){this.db=t,this.query=e||{},n&&(this.execFn=n)}var r=t("./model"),i=t("underscore");n.prototype.limit=function(t){return this._limit=t,this},n.prototype.skip=function(t){return this._skip=t,this},n.prototype.sort=function(t){return this._sort=t,this},n.prototype.projection=function(t){return this._projection=t,this},n.prototype.project=function(t){var e,n,r,o=[],a=this;return void 0===this._projection||0===Object.keys(this._projection).length?t:(e=0===this._projection._id?!1:!0,this._projection=i.omit(this._projection,"_id"),r=Object.keys(this._projection),r.forEach(function(t){if(void 0!==n&&a._projection[t]!==n)throw new Error("Can't both keep and omit fields except for _id");n=a._projection[t]}),t.forEach(function(t){var a=1===n?i.pick(t,r):i.omit(t,r);e?a._id=t._id:delete a._id,o.push(a)}),o)},n.prototype._exec=function(t){var e,n,i,o=this.db.getCandidates(this.query),a=[],u=0,s=0,c=this,f=null;try{for(e=0;e<o.length;e+=1)if(r.match(o[e],this.query))if(this._sort)a.push(o[e]);else if(this._skip&&this._skip>s)s+=1;else if(a.push(o[e]),u+=1,this._limit&&this._limit<=u)break}catch(l){return t(l)}if(this._sort){n=Object.keys(this._sort);var h=[];for(e=0;e<n.length;e++)i=n[e],h.push({key:i,direction:c._sort[i]});a.sort(function(t,e){var n,i,o;for(o=0;o<h.length;o++)if(n=h[o],i=n.direction*r.compareThings(r.getDotValue(t,n.key),r.getDotValue(e,n.key),c.db.compareStrings),0!==i)return i;return 0});var p=this._limit||a.length,d=this._skip||0;a=a.slice(d,d+p)}try{a=this.project(a)}catch(y){f=y,a=void 0}return this.execFn?this.execFn(f,a,t):t(f,a)},n.prototype.exec=function(){this.db.executor.push({"this":this,fn:this._exec,arguments:arguments})},e.exports=n},{"./model":10,underscore:19}],6:[function(t,e){function n(t){for(var e,e,n=new Array(t),r=0;t>r;r++)0==(3&r)&&(e=4294967296*Math.random()),n[r]=255&e>>>((3&r)<<3);return n}function r(t){function e(t){return o[63&t>>18]+o[63&t>>12]+o[63&t>>6]+o[63&t]}var n,r,i,o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",a=t.length%3,u="";for(i=0,r=t.length-a;r>i;i+=3)n=(t[i]<<16)+(t[i+1]<<8)+t[i+2],u+=e(n);switch(a){case 1:n=t[t.length-1],u+=o[n>>2],u+=o[63&n<<4],u+="==";break;case 2:n=(t[t.length-2]<<8)+t[t.length-1],u+=o[n>>10],u+=o[63&n>>4],u+=o[63&n<<2],u+="="}return u}function i(t){return r(n(Math.ceil(Math.max(8,2*t)))).replace(/[+\/]/g,"").slice(0,t)}e.exports.uid=i},{}],7:[function(t,e){function n(t){var e;"string"==typeof t?(e=t,this.inMemoryOnly=!1):(t=t||{},e=t.filename,this.inMemoryOnly=t.inMemoryOnly||!1,this.autoload=t.autoload||!1,this.timestampData=t.timestampData||!1),e&&"string"==typeof e&&0!==e.length?this.filename=e:(this.filename=null,this.inMemoryOnly=!0),this.compareStrings=t.compareStrings,this.persistence=new f({db:this,nodeWebkitAppName:t.nodeWebkitAppName,afterSerialization:t.afterSerialization,beforeDeserialization:t.beforeDeserialization,corruptAlertThreshold:t.corruptAlertThreshold}),this.executor=new a,this.inMemoryOnly&&(this.executor.ready=!0),this.indexes={},this.indexes._id=new u({fieldName:"_id",unique:!0}),this.autoload&&this.loadDatabase(t.onload||function(t){if(t)throw t})}var r=t("./customUtils"),i=t("./model"),o=t("async"),a=t("./executor"),u=t("./indexes"),s=t("util"),c=t("underscore"),f=t("./persistence"),l=t("./cursor");s.inherits(n,t("events").EventEmitter),n.prototype.loadDatabase=function(){this.executor.push({"this":this.persistence,fn:this.persistence.loadDatabase,arguments:arguments},!0)},n.prototype.getAllData=function(){return this.indexes._id.getAll()},n.prototype.resetIndexes=function(t){var e=this;Object.keys(this.indexes).forEach(function(n){e.indexes[n].reset(t)})},n.prototype.ensureIndex=function(t,e){var n,r=e||function(){};if(t=t||{},!t.fieldName)return n=new Error("Cannot create an index without a fieldName"),n.missingFieldName=!0,r(n);if(this.indexes[t.fieldName])return r(null);this.indexes[t.fieldName]=new u(t);try{this.indexes[t.fieldName].insert(this.getAllData())}catch(i){return delete this.indexes[t.fieldName],r(i)}this.persistence.persistNewState([{$$indexCreated:t}],function(t){return t?r(t):r(null)})},n.prototype.removeIndex=function(t,e){var n=e||function(){};delete this.indexes[t],this.persistence.persistNewState([{$$indexRemoved:t}],function(t){return t?n(t):n(null)})},n.prototype.addToIndexes=function(t){var e,n,r,i=Object.keys(this.indexes);for(e=0;e<i.length;e+=1)try{this.indexes[i[e]].insert(t)}catch(o){n=e,r=o;break}if(r){for(e=0;n>e;e+=1)this.indexes[i[e]].remove(t);throw r}},n.prototype.removeFromIndexes=function(t){var e=this;Object.keys(this.indexes).forEach(function(n){e.indexes[n].remove(t)})},n.prototype.updateIndexes=function(t,e){var n,r,i,o=Object.keys(this.indexes);for(n=0;n<o.length;n+=1)try{this.indexes[o[n]].update(t,e)}catch(a){r=n,i=a;break}if(i){for(n=0;r>n;n+=1)this.indexes[o[n]].revertUpdate(t,e);throw i}},n.prototype.getCandidates=function(t){var e,n=Object.keys(this.indexes);return e=[],Object.keys(t).forEach(function(n){("string"==typeof t[n]||"number"==typeof t[n]||"boolean"==typeof t[n]||s.isDate(t[n])||null===t[n])&&e.push(n)}),e=c.intersection(e,n),e.length>0?this.indexes[e[0]].getMatching(t[e[0]]):(e=[],Object.keys(t).forEach(function(n){t[n]&&t[n].hasOwnProperty("$in")&&e.push(n)}),e=c.intersection(e,n),e.length>0?this.indexes[e[0]].getMatching(t[e[0]].$in):(e=[],Object.keys(t).forEach(function(n){t[n]&&(t[n].hasOwnProperty("$lt")||t[n].hasOwnProperty("$lte")||t[n].hasOwnProperty("$gt")||t[n].hasOwnProperty("$gte"))&&e.push(n)}),e=c.intersection(e,n),e.length>0?this.indexes[e[0]].getBetweenBounds(t[e[0]]):this.getAllData()))},n.prototype._insert=function(t,e){var n,r=e||function(){};try{n=this.prepareDocumentForInsertion(t),this._insertInCache(n)}catch(o){return r(o)}this.persistence.persistNewState(s.isArray(n)?n:[n],function(t){return t?r(t):r(null,i.deepCopy(n))})},n.prototype.createNewId=function(){var t=r.uid(16);return this.indexes._id.getMatching(t).length>0&&(t=this.createNewId()),t},n.prototype.prepareDocumentForInsertion=function(t){var e,n=this;if(s.isArray(t))e=[],t.forEach(function(t){e.push(n.prepareDocumentForInsertion(t))});else{e=i.deepCopy(t),void 0===e._id&&(e._id=this.createNewId());var r=new Date;this.timestampData&&void 0===e.createdAt&&(e.createdAt=r),this.timestampData&&void 0===e.updatedAt&&(e.updatedAt=r),i.checkObject(e)}return e},n.prototype._insertInCache=function(t){s.isArray(t)?this._insertMultipleDocsInCache(t):this.addToIndexes(t)},n.prototype._insertMultipleDocsInCache=function(t){var e,n,r;for(e=0;e<t.length;e+=1)try{this.addToIndexes(t[e])}catch(i){r=i,n=e;break}if(r){for(e=0;n>e;e+=1)this.removeFromIndexes(t[e]);throw r}},n.prototype.insert=function(){this.executor.push({"this":this,fn:this._insert,arguments:arguments})},n.prototype.count=function(t,e){var n=new l(this,t,function(t,e,n){return t?n(t):n(null,e.length)});return"function"!=typeof e?n:(n.exec(e),void 0)},n.prototype.find=function(t,e,n){switch(arguments.length){case 1:e={};break;case 2:"function"==typeof e&&(n=e,e={})}var r=new l(this,t,function(t,e,n){var r,o=[];if(t)return n(t);for(r=0;r<e.length;r+=1)o.push(i.deepCopy(e[r]));return n(null,o)});return r.projection(e),"function"!=typeof n?r:(r.exec(n),void 0)},n.prototype.findOne=function(t,e,n){switch(arguments.length){case 1:e={};break;case 2:"function"==typeof e&&(n=e,e={})}var r=new l(this,t,function(t,e,n){return t?n(t):1===e.length?n(null,i.deepCopy(e[0])):n(null,null)});return r.projection(e).limit(1),"function"!=typeof n?r:(r.exec(n),void 0)},n.prototype._update=function(t,e,n,r){var a,u,s,f,h=this,p=0;"function"==typeof n&&(r=n,n={}),a=r||function(){},u=void 0!==n.multi?n.multi:!1,s=void 0!==n.upsert?n.upsert:!1,o.waterfall([function(n){if(!s)return n();var r=new l(h,t);r.limit(1)._exec(function(r,o){if(r)return a(r);if(1===o.length)return n();var u;try{i.checkObject(e),u=e}catch(s){try{u=i.modify(i.deepCopy(t,!0),e)}catch(r){return a(r)}}return h._insert(u,function(t,e){return t?a(t):a(null,1,e)})})},function(){var r,o=h.getCandidates(t),s=[];try{for(f=0;f<o.length;f+=1)i.match(o[f],t)&&(u||0===p)&&(p+=1,r=i.modify(o[f],e),h.timestampData&&(r.updatedAt=new Date),s.push({oldDoc:o[f],newDoc:r}))}catch(l){return a(l)}try{h.updateIndexes(s)}catch(l){return a(l)}var d=c.pluck(s,"newDoc");h.persistence.persistNewState(d,function(t){if(t)return a(t);if(n.returnUpdatedDocs){var e=[];return d.forEach(function(t){e.push(i.deepCopy(t))}),a(null,p,e)}return a(null,p)})}])},n.prototype.update=function(){this.executor.push({"this":this,fn:this._update,arguments:arguments})},n.prototype._remove=function(t,e,n){var r,o,a=this,u=0,s=[],c=this.getCandidates(t);"function"==typeof e&&(n=e,e={}),r=n||function(){},o=void 0!==e.multi?e.multi:!1;try{c.forEach(function(e){i.match(e,t)&&(o||0===u)&&(u+=1,s.push({$$deleted:!0,_id:e._id}),a.removeFromIndexes(e))})}catch(f){return r(f)}a.persistence.persistNewState(s,function(t){return t?r(t):r(null,u)})},n.prototype.remove=function(){this.executor.push({"this":this,fn:this._remove,arguments:arguments})},e.exports=n},{"./cursor":5,"./customUtils":6,"./executor":8,"./indexes":9,"./model":10,"./persistence":11,async:13,events:1,underscore:19,util:3}],8:[function(t,e){function n(){this.buffer=[],this.ready=!1,this.queue=i.queue(function(t,e){var n,i,o=t.arguments[t.arguments.length-1],a=[];for(i=0;i<t.arguments.length;i+=1)a.push(t.arguments[i]);"function"==typeof o?(n=function(){"function"==typeof setImmediate?setImmediate(e):r.nextTick(e),o.apply(null,arguments)},a[a.length-1]=n):(n=function(){e()},a.push(n)),t.fn.apply(t.this,a)},1)}var r=t("__browserify_process"),i=t("async");n.prototype.push=function(t,e){this.ready||e?this.queue.push(t):this.buffer.push(t)},n.prototype.processBuffer=function(){var t;for(this.ready=!0,t=0;t<this.buffer.length;t+=1)this.queue.push(this.buffer[t]);this.buffer=[]},e.exports=n},{__browserify_process:4,async:13}],9:[function(t,e){function n(t,e){return t===e}function r(t){return null===t?"$null":"string"==typeof t?"$string"+t:"boolean"==typeof t?"$boolean"+t:"number"==typeof t?"$number"+t:s.isArray(t)?"$date"+t.getTime():t}function i(t){this.fieldName=t.fieldName,this.unique=t.unique||!1,this.sparse=t.sparse||!1,this.treeOptions={unique:this.unique,compareKeys:a.compareThings,checkValueEquality:n},this.reset()}var o=t("binary-search-tree").AVLTree,a=t("./model"),u=t("underscore"),s=t("util");i.prototype.reset=function(t){this.tree=new o(this.treeOptions),t&&this.insert(t)},i.prototype.insert=function(t){var e,n,i,o,c;if(s.isArray(t))return this.insertMultipleDocs(t),void 0;if(e=a.getDotValue(t,this.fieldName),void 0!==e||!this.sparse)if(s.isArray(e)){for(n=u.uniq(e,r),i=0;i<n.length;i+=1)try{this.tree.insert(n[i],t)}catch(f){c=f,o=i;break}if(c){for(i=0;o>i;i+=1)this.tree.delete(n[i],t);throw c}}else this.tree.insert(e,t)},i.prototype.insertMultipleDocs=function(t){var e,n,r;for(e=0;e<t.length;e+=1)try{this.insert(t[e])}catch(i){n=i,r=e;break}if(n){for(e=0;r>e;e+=1)this.remove(t[e]);throw n}},i.prototype.remove=function(t){var e,n=this;return s.isArray(t)?(t.forEach(function(t){n.remove(t)}),void 0):(e=a.getDotValue(t,this.fieldName),void 0===e&&this.sparse||(s.isArray(e)?u.uniq(e,r).forEach(function(e){n.tree.delete(e,t)}):this.tree.delete(e,t)),void 0)},i.prototype.update=function(t,e){if(s.isArray(t))return this.updateMultipleDocs(t),void 0;this.remove(t);try{this.insert(e)}catch(n){throw this.insert(t),n}},i.prototype.updateMultipleDocs=function(t){var e,n,r;for(e=0;e<t.length;e+=1)this.remove(t[e].oldDoc);for(e=0;e<t.length;e+=1)try{this.insert(t[e].newDoc)}catch(i){r=i,n=e;break}if(r){for(e=0;n>e;e+=1)this.remove(t[e].newDoc);for(e=0;e<t.length;e+=1)this.insert(t[e].oldDoc);throw r}},i.prototype.revertUpdate=function(t,e){var n=[];s.isArray(t)?(t.forEach(function(t){n.push({oldDoc:t.newDoc,newDoc:t.oldDoc})}),this.update(n)):this.update(e,t)},i.prototype.getMatching=function(t){var e=this;if(s.isArray(t)){var n={},r=[];return t.forEach(function(t){e.getMatching(t).forEach(function(t){n[t._id]=t})}),Object.keys(n).forEach(function(t){r.push(n[t])}),r}return e.tree.search(t)},i.prototype.getBetweenBounds=function(t){return this.tree.betweenBounds(t)},i.prototype.getAll=function(){var t=[];return this.tree.executeOnEveryNode(function(e){var n;for(n=0;n<e.data.length;n+=1)t.push(e.data[n])}),t},e.exports=i},{"./model":10,"binary-search-tree":14,underscore:19,util:3}],10:[function(t,e){function n(t,e){if("number"==typeof t&&(t=t.toString()),!("$"!==t[0]||"$$date"===t&&"number"==typeof e||"$$deleted"===t&&e===!0||"$$indexCreated"===t||"$$indexRemoved"===t))throw new Error("Field names cannot begin with the $ character");if(-1!==t.indexOf("."))throw new Error("Field names cannot contain a .")}function r(t){m.isArray(t)&&t.forEach(function(t){r(t)}),"object"==typeof t&&null!==t&&Object.keys(t).forEach(function(e){n(e,t[e]),r(t[e])})}function i(t){var e;return e=JSON.stringify(t,function(t,e){return n(t,e),void 0===e?void 0:null===e?null:"function"==typeof this[t].getTime?{$$date:this[t].getTime()}:e})}function o(t){return JSON.parse(t,function(t,e){return"$$date"===t?new Date(e):"string"==typeof e||"number"==typeof e||"boolean"==typeof e||null===e?e:e&&e.$$date?e.$$date:e})}function a(t,e){var n;return"boolean"==typeof t||"number"==typeof t||"string"==typeof t||null===t||m.isDate(t)?t:m.isArray(t)?(n=[],t.forEach(function(t){n.push(a(t,e))}),n):"object"==typeof t?(n={},Object.keys(t).forEach(function(r){(!e||"$"!==r[0]&&-1===r.indexOf("."))&&(n[r]=a(t[r],e))}),n):void 0}function u(t){return"boolean"==typeof t||"number"==typeof t||"string"==typeof t||null===t||m.isDate(t)||m.isArray(t)}function s(t,e){return e>t?-1:t>e?1:0}function c(t,e){var n,r;for(n=0;n<Math.min(t.length,e.length);n+=1)if(r=f(t[n],e[n]),0!==r)return r;return s(t.length,e.length)}function f(t,e,n){var r,i,o,a,u=n||s;if(void 0===t)return void 0===e?0:-1;if(void 0===e)return void 0===t?0:1;if(null===t)return null===e?0:-1;if(null===e)return null===t?0:1;if("number"==typeof t)return"number"==typeof e?s(t,e):-1;if("number"==typeof e)return"number"==typeof t?s(t,e):1;if("string"==typeof t)return"string"==typeof e?u(t,e):-1;if("string"==typeof e)return"string"==typeof t?u(t,e):1;if("boolean"==typeof t)return"boolean"==typeof e?s(t,e):-1;if("boolean"==typeof e)return"boolean"==typeof t?s(t,e):1;if(m.isDate(t))return m.isDate(e)?s(t.getTime(),e.getTime()):-1;if(m.isDate(e))return m.isDate(t)?s(t.getTime(),e.getTime()):1;if(m.isArray(t))return m.isArray(e)?c(t,e):-1;if(m.isArray(e))return m.isArray(t)?c(t,e):1;for(r=Object.keys(t).sort(),i=Object.keys(e).sort(),a=0;a<Math.min(r.length,i.length);a+=1)if(o=f(t[r[a]],e[i[a]]),0!==o)return o;return s(r.length,i.length)}function l(t){return function(e,n,r){var i="string"==typeof n?n.split("."):n;1===i.length?_[t](e,n,r):(e[i[0]]=e[i[0]]||{},w[t](e[i[0]],i.slice(1),r))}}function h(t,e){var n,i,o=Object.keys(e),u=b.map(o,function(t){return t[0]}),s=b.filter(u,function(t){return"$"===t});if(-1!==o.indexOf("_id")&&e._id!==t._id)throw new Error("You cannot change a document's _id");if(0!==s.length&&s.length!==u.length)throw new Error("You cannot mix modifiers and normal fields");if(0===s.length?(n=a(e),n._id=t._id):(i=b.uniq(o),n=a(t),i.forEach(function(t){var r;if(!w[t])throw new Error("Unknown modifier "+t);if("object"!=typeof e[t])throw new Error("Modifier "+t+"'s argument must be an object");r=Object.keys(e[t]),r.forEach(function(r){w[t](n,r,e[t][r])})})),r(n),t._id!==n._id)throw new Error("You can't change a document's _id");return n}function p(t,e){var n,r,i="string"==typeof e?e.split("."):e;if(!t)return void 0;if(0===i.length)return t;if(1===i.length)return t[i[0]];if(m.isArray(t[i[0]])){if(n=parseInt(i[1],10),"number"==typeof n&&!isNaN(n))return p(t[i[0]][n],i.slice(2));for(r=new Array,n=0;n<t[i[0]].length;n+=1)r.push(p(t[i[0]][n],i.slice(1)));return r}return p(t[i[0]],i.slice(1))}function d(t,e){var n,r,i;if(null===t||"string"==typeof t||"boolean"==typeof t||"number"==typeof t||null===e||"string"==typeof e||"boolean"==typeof e||"number"==typeof e)return t===e;if(m.isDate(t)||m.isDate(e))return m.isDate(t)&&m.isDate(e)&&t.getTime()===e.getTime();if((!m.isArray(t)||!m.isArray(e))&&(m.isArray(t)||m.isArray(e))||void 0===t||void 0===e)return!1;try{n=Object.keys(t),r=Object.keys(e)}catch(o){return!1}if(n.length!==r.length)return!1;for(i=0;i<n.length;i+=1){if(-1===r.indexOf(n[i]))return!1;if(!d(t[n[i]],e[n[i]]))return!1}return!0}function y(t,e){return"string"==typeof t||"number"==typeof t||m.isDate(t)||"string"==typeof e||"number"==typeof e||m.isDate(e)?typeof t!=typeof e?!1:!0:!1}function v(t,e){var n,r,i,o;if(u(t)||u(e))return g({needAKey:t},"needAKey",e);for(n=Object.keys(e),o=0;o<n.length;o+=1)if(r=n[o],i=e[r],"$"===r[0]){if(!x[r])throw new Error("Unknown logical operator "+r);if(!x[r](t,i))return!1}else if(!g(t,r,i))return!1;return!0}function g(t,e,n,r){var i,o,a,u,s=p(t,e);if(m.isArray(s)&&!r){if(m.isArray(n))return g(t,e,n,!0);if(null!==n&&"object"==typeof n&&!m.isRegExp(n))for(o=Object.keys(n),i=0;i<o.length;i+=1)if(E[o[i]])return g(t,e,n,!0);for(i=0;i<s.length;i+=1)if(g({k:s[i]},"k",n))return!0;return!1}if(null!==n&&"object"==typeof n&&!m.isRegExp(n)&&!m.isArray(n)){if(o=Object.keys(n),a=b.map(o,function(t){return t[0]}),u=b.filter(a,function(t){return"$"===t}),0!==u.length&&u.length!==a.length)throw new Error("You cannot mix operators and normal fields");if(u.length>0){for(i=0;i<o.length;i+=1){if(!k[o[i]])throw new Error("Unknown comparison function "+o[i]);if(!k[o[i]](s,n[o[i]]))return!1}return!0}}return m.isRegExp(n)?k.$regex(s,n):d(s,n)?!0:!1}var m=t("util"),b=t("underscore"),w={},_={},k={},x={},E={};_.$set=function(t,e,n){t[e]=n},_.$unset=function(t,e){delete t[e]},_.$push=function(t,e,n){if(t.hasOwnProperty(e)||(t[e]=[]),!m.isArray(t[e]))throw new Error("Can't $push an element on non-array values");if(null!==n&&"object"==typeof n&&n.$each){if(Object.keys(n).length>1)throw new Error("Can't use another field in conjunction with $each");if(!m.isArray(n.$each))throw new Error("$each requires an array value");n.$each.forEach(function(n){t[e].push(n)})}else t[e].push(n)},_.$addToSet=function(t,e,n){var r=!0;if(t.hasOwnProperty(e)||(t[e]=[]),!m.isArray(t[e]))throw new Error("Can't $addToSet an element on non-array values");if(null!==n&&"object"==typeof n&&n.$each){if(Object.keys(n).length>1)throw new Error("Can't use another field in conjunction with $each");if(!m.isArray(n.$each))throw new Error("$each requires an array value");n.$each.forEach(function(n){_.$addToSet(t,e,n)})}else t[e].forEach(function(t){0===f(t,n)&&(r=!1)}),r&&t[e].push(n)},_.$pop=function(t,e,n){if(!m.isArray(t[e]))throw new Error("Can't $pop an element from non-array values");if("number"!=typeof n)throw new Error(n+" isn't an integer, can't use it with $pop");0!==n&&(t[e]=n>0?t[e].slice(0,t[e].length-1):t[e].slice(1))},_.$pull=function(t,e,n){var r,i;if(!m.isArray(t[e]))throw new Error("Can't $pull an element from non-array values");for(r=t[e],i=r.length-1;i>=0;i-=1)v(r[i],n)&&r.splice(i,1)},_.$inc=function(t,e,n){if("number"!=typeof n)throw new Error(n+" must be a number");if("number"!=typeof t[e]){if(b.has(t,e))throw new Error("Don't use the $inc modifier on non-number fields");t[e]=n}else t[e]+=n},Object.keys(_).forEach(function(t){w[t]=l(t)}),k.$lt=function(t,e){return y(t,e)&&e>t},k.$lte=function(t,e){return y(t,e)&&e>=t},k.$gt=function(t,e){return y(t,e)&&t>e},k.$gte=function(t,e){return y(t,e)&&t>=e},k.$ne=function(t,e){return void 0===t?!0:!d(t,e)},k.$in=function(t,e){var n;if(!m.isArray(e))throw new Error("$in operator called with a non-array");for(n=0;n<e.length;n+=1)if(d(t,e[n]))return!0;return!1},k.$nin=function(t,e){if(!m.isArray(e))throw new Error("$nin operator called with a non-array");return!k.$in(t,e)},k.$regex=function(t,e){if(!m.isRegExp(e))throw new Error("$regex operator called with non regular expression");return"string"!=typeof t?!1:e.test(t)},k.$exists=function(t,e){return e=e||""===e?!0:!1,void 0===t?!e:e},k.$size=function(t,e){if(!m.isArray(t))return!1;if(0!==e%1)throw new Error("$size operator called without an integer");return t.length==e},E.$size=!0,x.$or=function(t,e){var n;if(!m.isArray(e))throw new Error("$or operator used without an array");for(n=0;n<e.length;n+=1)if(v(t,e[n]))return!0;return!1},x.$and=function(t,e){var n;if(!m.isArray(e))throw new Error("$and operator used without an array");for(n=0;n<e.length;n+=1)if(!v(t,e[n]))return!1;return!0},x.$not=function(t,e){return!v(t,e)},x.$where=function(t,e){var n;if(!b.isFunction(e))throw new Error("$where operator used without a function");if(n=e.call(t),!b.isBoolean(n))throw new Error("$where function must return boolean");return n},e.exports.serialize=i,e.exports.deserialize=o,e.exports.deepCopy=a,e.exports.checkObject=r,e.exports.isPrimitiveType=u,e.exports.modify=h,e.exports.getDotValue=p,e.exports.match=v,e.exports.areThingsEqual=d,e.exports.compareThings=f},{underscore:19,util:3}],11:[function(t,e){function n(t){var e,r,i;if(this.db=t.db,this.inMemoryOnly=this.db.inMemoryOnly,this.filename=this.db.filename,this.corruptAlertThreshold=void 0!==t.corruptAlertThreshold?t.corruptAlertThreshold:.1,!this.inMemoryOnly&&this.filename&&"~"===this.filename.charAt(this.filename.length-1))throw new Error("The datafile name can't end with a ~, which is reserved for crash safe backup files");if(t.afterSerialization&&!t.beforeDeserialization)throw new Error("Serialization hook defined but deserialization hook undefined, cautiously refusing to start NeDB to prevent dataloss");if(!t.afterSerialization&&t.beforeDeserialization)throw new Error("Serialization hook undefined but deserialization hook defined, cautiously refusing to start NeDB to prevent dataloss");for(this.afterSerialization=t.afterSerialization||function(t){return t},this.beforeDeserialization=t.beforeDeserialization||function(t){return t},e=1;30>e;e+=1)for(r=0;10>r;r+=1)if(i=s.uid(e),this.beforeDeserialization(this.afterSerialization(i))!==i)throw new Error("beforeDeserialization is not the reverse of afterSerialization, cautiously refusing to start NeDB to prevent dataloss");
this.filename&&t.nodeWebkitAppName&&(console.log("=================================================================="),console.log("WARNING: The nodeWebkitAppName option is deprecated"),console.log("To get the path to the directory where Node Webkit stores the data"),console.log("for your app, use the internal nw.gui module like this"),console.log("require('nw.gui').App.dataPath"),console.log("See https://github.com/rogerwang/node-webkit/issues/500"),console.log("=================================================================="),this.filename=n.getNWAppFilename(t.nodeWebkitAppName,this.filename))}var r=t("__browserify_process"),i=t("./storage"),o=t("path"),a=t("./model"),u=t("async"),s=t("./customUtils"),c=t("./indexes");n.ensureDirectoryExists=function(t,e){var n=e||function(){};i.mkdirp(t,function(t){return n(t)})},n.getNWAppFilename=function(t,e){var n;switch(r.platform){case"win32":case"win64":if(n=r.env.LOCALAPPDATA||r.env.APPDATA,!n)throw new Error("Couldn't find the base application data folder");n=o.join(n,t);break;case"darwin":if(n=r.env.HOME,!n)throw new Error("Couldn't find the base application data directory");n=o.join(n,"Library","Application Support",t);break;case"linux":if(n=r.env.HOME,!n)throw new Error("Couldn't find the base application data directory");n=o.join(n,".config",t);break;default:throw new Error("Can't use the Node Webkit relative path for platform "+r.platform)}return o.join(n,"nedb-data",e)},n.prototype.persistCachedDatabase=function(t){var e=t||function(){},n="",r=this;return this.inMemoryOnly?e(null):(this.db.getAllData().forEach(function(t){n+=r.afterSerialization(a.serialize(t))+"\n"}),Object.keys(this.db.indexes).forEach(function(t){"_id"!=t&&(n+=r.afterSerialization(a.serialize({$$indexCreated:{fieldName:t,unique:r.db.indexes[t].unique,sparse:r.db.indexes[t].sparse}}))+"\n")}),i.crashSafeWriteFile(this.filename,n,function(t){return t?e(t):(r.db.emit("compaction.done"),e(null))}),void 0)},n.prototype.compactDatafile=function(){this.db.executor.push({"this":this,fn:this.persistCachedDatabase,arguments:[]})},n.prototype.setAutocompactionInterval=function(t){var e=this,n=5e3,r=Math.max(t||0,n);this.stopAutocompaction(),this.autocompactionIntervalId=setInterval(function(){e.compactDatafile()},r)},n.prototype.stopAutocompaction=function(){this.autocompactionIntervalId&&clearInterval(this.autocompactionIntervalId)},n.prototype.persistNewState=function(t,e){var n=this,r="",o=e||function(){};return n.inMemoryOnly?o(null):(t.forEach(function(t){r+=n.afterSerialization(a.serialize(t))+"\n"}),0===r.length?o(null):(i.appendFile(n.filename,r,"utf8",function(t){return o(t)}),void 0))},n.prototype.treatRawData=function(t){var e,n=t.split("\n"),r={},i=[],o={},u=-1;for(e=0;e<n.length;e+=1){var s;try{s=a.deserialize(this.beforeDeserialization(n[e])),s._id?s.$$deleted===!0?delete r[s._id]:r[s._id]=s:s.$$indexCreated&&void 0!=s.$$indexCreated.fieldName?o[s.$$indexCreated.fieldName]=s.$$indexCreated:"string"==typeof s.$$indexRemoved&&delete o[s.$$indexRemoved]}catch(c){u+=1}}if(n.length>0&&u/n.length>this.corruptAlertThreshold)throw new Error("More than "+Math.floor(100*this.corruptAlertThreshold)+"% of the data file is corrupt, the wrong beforeDeserialization hook may be used. Cautiously refusing to start NeDB to prevent dataloss");return Object.keys(r).forEach(function(t){i.push(r[t])}),{data:i,indexes:o}},n.prototype.loadDatabase=function(t){var e=t||function(){},r=this;return r.db.resetIndexes(),r.inMemoryOnly?e(null):(u.waterfall([function(t){n.ensureDirectoryExists(o.dirname(r.filename),function(){i.ensureDatafileIntegrity(r.filename,function(){i.readFile(r.filename,"utf8",function(e,n){if(e)return t(e);try{var i=r.treatRawData(n)}catch(o){return t(o)}Object.keys(i.indexes).forEach(function(t){r.db.indexes[t]=new c(i.indexes[t])});try{r.db.resetIndexes(i.data)}catch(o){return r.db.resetIndexes(),t(o)}r.db.persistence.persistCachedDatabase(t)})})})}],function(t){return t?e(t):(r.db.executor.processBuffer(),e(null))}),void 0)},e.exports=n},{"./customUtils":6,"./indexes":9,"./model":10,"./storage":12,__browserify_process:4,async:13,path:2}],12:[function(t,e){function n(t,e){f.getItem(t,function(t,n){return null!==n?e(!0):e(!1)})}function r(t,e,n){f.getItem(t,function(r,i){null===i?f.removeItem(e,function(){return n()}):f.setItem(e,i,function(){f.removeItem(t,function(){return n()})})})}function i(t,e,n,r){"function"==typeof n&&(r=n),f.setItem(t,e,function(){return r()})}function o(t,e,n,r){"function"==typeof n&&(r=n),f.getItem(t,function(n,i){i=i||"",i+=e,f.setItem(t,i,function(){return r()})})}function a(t,e,n){"function"==typeof e&&(n=e),f.getItem(t,function(t,e){return n(null,e||"")})}function u(t,e){f.removeItem(t,function(){return e()})}function s(t,e){return e()}function c(t,e){return e(null)}var f=t("localforage");f.config({name:"NeDB",storeName:"nedbdata"}),e.exports.exists=n,e.exports.rename=r,e.exports.writeFile=i,e.exports.crashSafeWriteFile=i,e.exports.appendFile=o,e.exports.readFile=a,e.exports.unlink=u,e.exports.mkdirp=s,e.exports.ensureDatafileIntegrity=c},{localforage:18}],13:[function(e,n){var r=e("__browserify_process");!function(){function e(t){var e=!1;return function(){if(e)throw new Error("Callback was already called.");e=!0,t.apply(i,arguments)}}var i,o,a={};i=this,null!=i&&(o=i.async),a.noConflict=function(){return i.async=o,a};var u=function(t,e){if(t.forEach)return t.forEach(e);for(var n=0;n<t.length;n+=1)e(t[n],n,t)},s=function(t,e){if(t.map)return t.map(e);var n=[];return u(t,function(t,r,i){n.push(e(t,r,i))}),n},c=function(t,e,n){return t.reduce?t.reduce(e,n):(u(t,function(t,r,i){n=e(n,t,r,i)}),n)},f=function(t){if(Object.keys)return Object.keys(t);var e=[];for(var n in t)t.hasOwnProperty(n)&&e.push(n);return e};"undefined"!=typeof r&&r.nextTick?(a.nextTick=r.nextTick,a.setImmediate="undefined"!=typeof setImmediate?function(t){setImmediate(t)}:a.nextTick):"function"==typeof setImmediate?(a.nextTick=function(t){setImmediate(t)},a.setImmediate=a.nextTick):(a.nextTick=function(t){setTimeout(t,0)},a.setImmediate=a.nextTick),a.each=function(t,n,r){if(r=r||function(){},!t.length)return r();var i=0;u(t,function(o){n(o,e(function(e){e?(r(e),r=function(){}):(i+=1,i>=t.length&&r(null))}))})},a.forEach=a.each,a.eachSeries=function(t,e,n){if(n=n||function(){},!t.length)return n();var r=0,i=function(){e(t[r],function(e){e?(n(e),n=function(){}):(r+=1,r>=t.length?n(null):i())})};i()},a.forEachSeries=a.eachSeries,a.eachLimit=function(t,e,n,r){var i=l(e);i.apply(null,[t,n,r])},a.forEachLimit=a.eachLimit;var l=function(t){return function(e,n,r){if(r=r||function(){},!e.length||0>=t)return r();var i=0,o=0,a=0;!function u(){if(i>=e.length)return r();for(;t>a&&o<e.length;)o+=1,a+=1,n(e[o-1],function(t){t?(r(t),r=function(){}):(i+=1,a-=1,i>=e.length?r():u())})}()}},h=function(t){return function(){var e=Array.prototype.slice.call(arguments);return t.apply(null,[a.each].concat(e))}},p=function(t,e){return function(){var n=Array.prototype.slice.call(arguments);return e.apply(null,[l(t)].concat(n))}},d=function(t){return function(){var e=Array.prototype.slice.call(arguments);return t.apply(null,[a.eachSeries].concat(e))}},y=function(t,e,n,r){var i=[];e=s(e,function(t,e){return{index:e,value:t}}),t(e,function(t,e){n(t.value,function(n,r){i[t.index]=r,e(n)})},function(t){r(t,i)})};a.map=h(y),a.mapSeries=d(y),a.mapLimit=function(t,e,n,r){return v(e)(t,n,r)};var v=function(t){return p(t,y)};a.reduce=function(t,e,n,r){a.eachSeries(t,function(t,r){n(e,t,function(t,n){e=n,r(t)})},function(t){r(t,e)})},a.inject=a.reduce,a.foldl=a.reduce,a.reduceRight=function(t,e,n,r){var i=s(t,function(t){return t}).reverse();a.reduce(i,e,n,r)},a.foldr=a.reduceRight;var g=function(t,e,n,r){var i=[];e=s(e,function(t,e){return{index:e,value:t}}),t(e,function(t,e){n(t.value,function(n){n&&i.push(t),e()})},function(){r(s(i.sort(function(t,e){return t.index-e.index}),function(t){return t.value}))})};a.filter=h(g),a.filterSeries=d(g),a.select=a.filter,a.selectSeries=a.filterSeries;var m=function(t,e,n,r){var i=[];e=s(e,function(t,e){return{index:e,value:t}}),t(e,function(t,e){n(t.value,function(n){n||i.push(t),e()})},function(){r(s(i.sort(function(t,e){return t.index-e.index}),function(t){return t.value}))})};a.reject=h(m),a.rejectSeries=d(m);var b=function(t,e,n,r){t(e,function(t,e){n(t,function(n){n?(r(t),r=function(){}):e()})},function(){r()})};a.detect=h(b),a.detectSeries=d(b),a.some=function(t,e,n){a.each(t,function(t,r){e(t,function(t){t&&(n(!0),n=function(){}),r()})},function(){n(!1)})},a.any=a.some,a.every=function(t,e,n){a.each(t,function(t,r){e(t,function(t){t||(n(!1),n=function(){}),r()})},function(){n(!0)})},a.all=a.every,a.sortBy=function(t,e,n){a.map(t,function(t,n){e(t,function(e,r){e?n(e):n(null,{value:t,criteria:r})})},function(t,e){if(t)return n(t);var r=function(t,e){var n=t.criteria,r=e.criteria;return r>n?-1:n>r?1:0};n(null,s(e.sort(r),function(t){return t.value}))})},a.auto=function(t,e){e=e||function(){};var n=f(t);if(!n.length)return e(null);var r={},i=[],o=function(t){i.unshift(t)},s=function(t){for(var e=0;e<i.length;e+=1)if(i[e]===t)return i.splice(e,1),void 0},l=function(){u(i.slice(0),function(t){t()})};o(function(){f(r).length===n.length&&(e(null,r),e=function(){})}),u(n,function(n){var i=t[n]instanceof Function?[t[n]]:t[n],h=function(t){var i=Array.prototype.slice.call(arguments,1);if(i.length<=1&&(i=i[0]),t){var o={};u(f(r),function(t){o[t]=r[t]}),o[n]=i,e(t,o),e=function(){}}else r[n]=i,a.setImmediate(l)},p=i.slice(0,Math.abs(i.length-1))||[],d=function(){return c(p,function(t,e){return t&&r.hasOwnProperty(e)},!0)&&!r.hasOwnProperty(n)};if(d())i[i.length-1](h,r);else{var y=function(){d()&&(s(y),i[i.length-1](h,r))};o(y)}})},a.waterfall=function(t,e){if(e=e||function(){},t.constructor!==Array){var n=new Error("First argument to waterfall must be an array of functions");return e(n)}if(!t.length)return e();var r=function(t){return function(n){if(n)e.apply(null,arguments),e=function(){};else{var i=Array.prototype.slice.call(arguments,1),o=t.next();o?i.push(r(o)):i.push(e),a.setImmediate(function(){t.apply(null,i)})}}};r(a.iterator(t))()};var w=function(t,e,n){if(n=n||function(){},e.constructor===Array)t.map(e,function(t,e){t&&t(function(t){var n=Array.prototype.slice.call(arguments,1);n.length<=1&&(n=n[0]),e.call(null,t,n)})},n);else{var r={};t.each(f(e),function(t,n){e[t](function(e){var i=Array.prototype.slice.call(arguments,1);i.length<=1&&(i=i[0]),r[t]=i,n(e)})},function(t){n(t,r)})}};a.parallel=function(t,e){w({map:a.map,each:a.each},t,e)},a.parallelLimit=function(t,e,n){w({map:v(e),each:l(e)},t,n)},a.series=function(t,e){if(e=e||function(){},t.constructor===Array)a.mapSeries(t,function(t,e){t&&t(function(t){var n=Array.prototype.slice.call(arguments,1);n.length<=1&&(n=n[0]),e.call(null,t,n)})},e);else{var n={};a.eachSeries(f(t),function(e,r){t[e](function(t){var i=Array.prototype.slice.call(arguments,1);i.length<=1&&(i=i[0]),n[e]=i,r(t)})},function(t){e(t,n)})}},a.iterator=function(t){var e=function(n){var r=function(){return t.length&&t[n].apply(null,arguments),r.next()};return r.next=function(){return n<t.length-1?e(n+1):null},r};return e(0)},a.apply=function(t){var e=Array.prototype.slice.call(arguments,1);return function(){return t.apply(null,e.concat(Array.prototype.slice.call(arguments)))}};var _=function(t,e,n,r){var i=[];t(e,function(t,e){n(t,function(t,n){i=i.concat(n||[]),e(t)})},function(t){r(t,i)})};a.concat=h(_),a.concatSeries=d(_),a.whilst=function(t,e,n){t()?e(function(r){return r?n(r):(a.whilst(t,e,n),void 0)}):n()},a.doWhilst=function(t,e,n){t(function(r){return r?n(r):(e()?a.doWhilst(t,e,n):n(),void 0)})},a.until=function(t,e,n){t()?n():e(function(r){return r?n(r):(a.until(t,e,n),void 0)})},a.doUntil=function(t,e,n){t(function(r){return r?n(r):(e()?n():a.doUntil(t,e,n),void 0)})},a.queue=function(t,n){function r(t,e,r,i){e.constructor!==Array&&(e=[e]),u(e,function(e){var o={data:e,callback:"function"==typeof i?i:null};r?t.tasks.unshift(o):t.tasks.push(o),t.saturated&&t.tasks.length===n&&t.saturated(),a.setImmediate(t.process)})}void 0===n&&(n=1);var i=0,o={tasks:[],concurrency:n,saturated:null,empty:null,drain:null,push:function(t,e){r(o,t,!1,e)},unshift:function(t,e){r(o,t,!0,e)},process:function(){if(i<o.concurrency&&o.tasks.length){var n=o.tasks.shift();o.empty&&0===o.tasks.length&&o.empty(),i+=1;var r=function(){i-=1,n.callback&&n.callback.apply(n,arguments),o.drain&&0===o.tasks.length+i&&o.drain(),o.process()},a=e(r);t(n.data,a)}},length:function(){return o.tasks.length},running:function(){return i}};return o},a.cargo=function(t,e){var n=!1,r=[],i={tasks:r,payload:e,saturated:null,empty:null,drain:null,push:function(t,n){t.constructor!==Array&&(t=[t]),u(t,function(t){r.push({data:t,callback:"function"==typeof n?n:null}),i.saturated&&r.length===e&&i.saturated()}),a.setImmediate(i.process)},process:function o(){if(!n){if(0===r.length)return i.drain&&i.drain(),void 0;var a="number"==typeof e?r.splice(0,e):r.splice(0),c=s(a,function(t){return t.data});i.empty&&i.empty(),n=!0,t(c,function(){n=!1;var t=arguments;u(a,function(e){e.callback&&e.callback.apply(null,t)}),o()})}},length:function(){return r.length},running:function(){return n}};return i};var k=function(t){return function(e){var n=Array.prototype.slice.call(arguments,1);e.apply(null,n.concat([function(e){var n=Array.prototype.slice.call(arguments,1);"undefined"!=typeof console&&(e?console.error&&console.error(e):console[t]&&u(n,function(e){console[t](e)}))}]))}};a.log=k("log"),a.dir=k("dir"),a.memoize=function(t,e){var n={},r={};e=e||function(t){return t};var i=function(){var i=Array.prototype.slice.call(arguments),o=i.pop(),a=e.apply(null,i);a in n?o.apply(null,n[a]):a in r?r[a].push(o):(r[a]=[o],t.apply(null,i.concat([function(){n[a]=arguments;var t=r[a];delete r[a];for(var e=0,i=t.length;i>e;e++)t[e].apply(null,arguments)}])))};return i.memo=n,i.unmemoized=t,i},a.unmemoize=function(t){return function(){return(t.unmemoized||t).apply(null,arguments)}},a.times=function(t,e,n){for(var r=[],i=0;t>i;i++)r.push(i);return a.map(r,e,n)},a.timesSeries=function(t,e,n){for(var r=[],i=0;t>i;i++)r.push(i);return a.mapSeries(r,e,n)},a.compose=function(){var t=Array.prototype.reverse.call(arguments);return function(){var e=this,n=Array.prototype.slice.call(arguments),r=n.pop();a.reduce(t,n,function(t,n,r){n.apply(e,t.concat([function(){var t=arguments[0],e=Array.prototype.slice.call(arguments,1);r(t,e)}]))},function(t,n){r.apply(e,[t].concat(n))})}};var x=function(t,e){var n=function(){var n=this,r=Array.prototype.slice.call(arguments),i=r.pop();return t(e,function(t,e){t.apply(n,r.concat([e]))},i)};if(arguments.length>2){var r=Array.prototype.slice.call(arguments,2);return n.apply(this,r)}return n};a.applyEach=h(x),a.applyEachSeries=d(x),a.forever=function(t,e){function n(r){if(r){if(e)return e(r);throw r}t(n)}n()},"undefined"!=typeof t&&t.amd?t([],function(){return a}):"undefined"!=typeof n&&n.exports?n.exports=a:i.async=a}()},{__browserify_process:4}],14:[function(t,e){e.exports.BinarySearchTree=t("./lib/bst"),e.exports.AVLTree=t("./lib/avltree")},{"./lib/avltree":15,"./lib/bst":16}],15:[function(t,e){function n(t){this.tree=new r(t)}function r(t){t=t||{},this.left=null,this.right=null,this.parent=void 0!==t.parent?t.parent:null,t.hasOwnProperty("key")&&(this.key=t.key),this.data=t.hasOwnProperty("value")?[t.value]:[],this.unique=t.unique||!1,this.compareKeys=t.compareKeys||o.defaultCompareKeysFunction,this.checkValueEquality=t.checkValueEquality||o.defaultCheckValueEquality}var i=t("./bst"),o=t("./customUtils"),a=t("util");t("underscore"),a.inherits(r,i),n._AVLTree=r,r.prototype.checkHeightCorrect=function(){var t,e;if(this.hasOwnProperty("key")){if(this.left&&void 0===this.left.height)throw new Error("Undefined height for node "+this.left.key);if(this.right&&void 0===this.right.height)throw new Error("Undefined height for node "+this.right.key);if(void 0===this.height)throw new Error("Undefined height for node "+this.key);if(t=this.left?this.left.height:0,e=this.right?this.right.height:0,this.height!==1+Math.max(t,e))throw new Error("Height constraint failed for node "+this.key);this.left&&this.left.checkHeightCorrect(),this.right&&this.right.checkHeightCorrect()}},r.prototype.balanceFactor=function(){var t=this.left?this.left.height:0,e=this.right?this.right.height:0;return t-e},r.prototype.checkBalanceFactors=function(){if(Math.abs(this.balanceFactor())>1)throw new Error("Tree is unbalanced at node "+this.key);this.left&&this.left.checkBalanceFactors(),this.right&&this.right.checkBalanceFactors()},r.prototype.checkIsAVLT=function(){r.super_.prototype.checkIsBST.call(this),this.checkHeightCorrect(),this.checkBalanceFactors()},n.prototype.checkIsAVLT=function(){this.tree.checkIsAVLT()},r.prototype.rightRotation=function(){var t,e,n,r,i=this,o=this.left;return o?(t=o.right,i.parent?(o.parent=i.parent,i.parent.left===i?i.parent.left=o:i.parent.right=o):o.parent=null,o.right=i,i.parent=o,i.left=t,t&&(t.parent=i),e=o.left?o.left.height:0,n=t?t.height:0,r=i.right?i.right.height:0,i.height=Math.max(n,r)+1,o.height=Math.max(e,i.height)+1,o):this},r.prototype.leftRotation=function(){var t,e,n,r,i=this,o=this.right;return o?(t=o.left,i.parent?(o.parent=i.parent,i.parent.left===i?i.parent.left=o:i.parent.right=o):o.parent=null,o.left=i,i.parent=o,i.right=t,t&&(t.parent=i),e=i.left?i.left.height:0,n=t?t.height:0,r=o.right?o.right.height:0,i.height=Math.max(e,n)+1,o.height=Math.max(r,i.height)+1,o):this},r.prototype.rightTooSmall=function(){return this.balanceFactor()<=1?this:(this.left.balanceFactor()<0&&this.left.leftRotation(),this.rightRotation())},r.prototype.leftTooSmall=function(){return this.balanceFactor()>=-1?this:(this.right.balanceFactor()>0&&this.right.rightRotation(),this.leftRotation())},r.prototype.rebalanceAlongPath=function(t){var e,n,r=this;if(!this.hasOwnProperty("key"))return delete this.height,this;for(n=t.length-1;n>=0;n-=1)t[n].height=1+Math.max(t[n].left?t[n].left.height:0,t[n].right?t[n].right.height:0),t[n].balanceFactor()>1&&(e=t[n].rightTooSmall(),0===n&&(r=e)),t[n].balanceFactor()<-1&&(e=t[n].leftTooSmall(),0===n&&(r=e));return r},r.prototype.insert=function(t,e){var n=[],r=this;if(!this.hasOwnProperty("key"))return this.key=t,this.data.push(e),this.height=1,this;for(;;){if(0===r.compareKeys(r.key,t)){if(r.unique){var i=new Error("Can't insert key "+t+", it violates the unique constraint");throw i.key=t,i.errorType="uniqueViolated",i}return r.data.push(e),this}if(n.push(r),r.compareKeys(t,r.key)<0){if(!r.left){n.push(r.createLeftChild({key:t,value:e}));break}r=r.left}else{if(!r.right){n.push(r.createRightChild({key:t,value:e}));break}r=r.right}}return this.rebalanceAlongPath(n)},n.prototype.insert=function(t,e){var n=this.tree.insert(t,e);n&&(this.tree=n)},r.prototype.delete=function(t,e){var n,r=[],i=this,o=[];if(!this.hasOwnProperty("key"))return this;for(;;){if(0===i.compareKeys(t,i.key))break;if(o.push(i),i.compareKeys(t,i.key)<0){if(!i.left)return this;i=i.left}else{if(!i.right)return this;i=i.right}}if(i.data.length>1&&e)return i.data.forEach(function(t){i.checkValueEquality(t,e)||r.push(t)}),i.data=r,this;if(!i.left&&!i.right)return i===this?(delete i.key,i.data=[],delete i.height,this):(i.parent.left===i?i.parent.left=null:i.parent.right=null,this.rebalanceAlongPath(o));if(!i.left||!i.right)return n=i.left?i.left:i.right,i===this?(n.parent=null,n):(i.parent.left===i?(i.parent.left=n,n.parent=i.parent):(i.parent.right=n,n.parent=i.parent),this.rebalanceAlongPath(o));if(o.push(i),n=i.left,!n.right)return i.key=n.key,i.data=n.data,i.left=n.left,n.left&&(n.left.parent=i),this.rebalanceAlongPath(o);for(;;){if(!n.right)break;o.push(n),n=n.right}return i.key=n.key,i.data=n.data,n.parent.right=n.left,n.left&&(n.left.parent=n.parent),this.rebalanceAlongPath(o)},n.prototype.delete=function(t,e){var n=this.tree.delete(t,e);n&&(this.tree=n)},["getNumberOfKeys","search","betweenBounds","prettyPrint","executeOnEveryNode"].forEach(function(t){n.prototype[t]=function(){return this.tree[t].apply(this.tree,arguments)}}),e.exports=n},{"./bst":16,"./customUtils":17,underscore:19,util:3}],16:[function(t,e){function n(t){t=t||{},this.left=null,this.right=null,this.parent=void 0!==t.parent?t.parent:null,t.hasOwnProperty("key")&&(this.key=t.key),this.data=t.hasOwnProperty("value")?[t.value]:[],this.unique=t.unique||!1,this.compareKeys=t.compareKeys||i.defaultCompareKeysFunction,this.checkValueEquality=t.checkValueEquality||i.defaultCheckValueEquality}function r(t,e){var n;for(n=0;n<e.length;n+=1)t.push(e[n])}var i=t("./customUtils");n.prototype.getMaxKeyDescendant=function(){return this.right?this.right.getMaxKeyDescendant():this},n.prototype.getMaxKey=function(){return this.getMaxKeyDescendant().key},n.prototype.getMinKeyDescendant=function(){return this.left?this.left.getMinKeyDescendant():this},n.prototype.getMinKey=function(){return this.getMinKeyDescendant().key},n.prototype.checkAllNodesFullfillCondition=function(t){this.hasOwnProperty("key")&&(t(this.key,this.data),this.left&&this.left.checkAllNodesFullfillCondition(t),this.right&&this.right.checkAllNodesFullfillCondition(t))},n.prototype.checkNodeOrdering=function(){var t=this;this.hasOwnProperty("key")&&(this.left&&(this.left.checkAllNodesFullfillCondition(function(e){if(t.compareKeys(e,t.key)>=0)throw new Error("Tree with root "+t.key+" is not a binary search tree")}),this.left.checkNodeOrdering()),this.right&&(this.right.checkAllNodesFullfillCondition(function(e){if(t.compareKeys(e,t.key)<=0)throw new Error("Tree with root "+t.key+" is not a binary search tree")}),this.right.checkNodeOrdering()))},n.prototype.checkInternalPointers=function(){if(this.left){if(this.left.parent!==this)throw new Error("Parent pointer broken for key "+this.key);this.left.checkInternalPointers()}if(this.right){if(this.right.parent!==this)throw new Error("Parent pointer broken for key "+this.key);this.right.checkInternalPointers()}},n.prototype.checkIsBST=function(){if(this.checkNodeOrdering(),this.checkInternalPointers(),this.parent)throw new Error("The root shouldn't have a parent")},n.prototype.getNumberOfKeys=function(){var t;return this.hasOwnProperty("key")?(t=1,this.left&&(t+=this.left.getNumberOfKeys()),this.right&&(t+=this.right.getNumberOfKeys()),t):0},n.prototype.createSimilar=function(t){return t=t||{},t.unique=this.unique,t.compareKeys=this.compareKeys,t.checkValueEquality=this.checkValueEquality,new this.constructor(t)},n.prototype.createLeftChild=function(t){var e=this.createSimilar(t);return e.parent=this,this.left=e,e},n.prototype.createRightChild=function(t){var e=this.createSimilar(t);return e.parent=this,this.right=e,e},n.prototype.insert=function(t,e){if(!this.hasOwnProperty("key"))return this.key=t,this.data.push(e),void 0;if(0===this.compareKeys(this.key,t)){if(this.unique){var n=new Error("Can't insert key "+t+", it violates the unique constraint");throw n.key=t,n.errorType="uniqueViolated",n}return this.data.push(e),void 0}this.compareKeys(t,this.key)<0?this.left?this.left.insert(t,e):this.createLeftChild({key:t,value:e}):this.right?this.right.insert(t,e):this.createRightChild({key:t,value:e})},n.prototype.search=function(t){return this.hasOwnProperty("key")?0===this.compareKeys(this.key,t)?this.data:this.compareKeys(t,this.key)<0?this.left?this.left.search(t):[]:this.right?this.right.search(t):[]:[]},n.prototype.getLowerBoundMatcher=function(t){var e=this;return t.hasOwnProperty("$gt")||t.hasOwnProperty("$gte")?t.hasOwnProperty("$gt")&&t.hasOwnProperty("$gte")?0===e.compareKeys(t.$gte,t.$gt)?function(n){return e.compareKeys(n,t.$gt)>0}:e.compareKeys(t.$gte,t.$gt)>0?function(n){return e.compareKeys(n,t.$gte)>=0}:function(n){return e.compareKeys(n,t.$gt)>0}:t.hasOwnProperty("$gt")?function(n){return e.compareKeys(n,t.$gt)>0}:function(n){return e.compareKeys(n,t.$gte)>=0}:function(){return!0}},n.prototype.getUpperBoundMatcher=function(t){var e=this;return t.hasOwnProperty("$lt")||t.hasOwnProperty("$lte")?t.hasOwnProperty("$lt")&&t.hasOwnProperty("$lte")?0===e.compareKeys(t.$lte,t.$lt)?function(n){return e.compareKeys(n,t.$lt)<0}:e.compareKeys(t.$lte,t.$lt)<0?function(n){return e.compareKeys(n,t.$lte)<=0}:function(n){return e.compareKeys(n,t.$lt)<0}:t.hasOwnProperty("$lt")?function(n){return e.compareKeys(n,t.$lt)<0}:function(n){return e.compareKeys(n,t.$lte)<=0}:function(){return!0}},n.prototype.betweenBounds=function(t,e,n){var i=[];return this.hasOwnProperty("key")?(e=e||this.getLowerBoundMatcher(t),n=n||this.getUpperBoundMatcher(t),e(this.key)&&this.left&&r(i,this.left.betweenBounds(t,e,n)),e(this.key)&&n(this.key)&&r(i,this.data),n(this.key)&&this.right&&r(i,this.right.betweenBounds(t,e,n)),i):[]},n.prototype.deleteIfLeaf=function(){return this.left||this.right?!1:this.parent?(this.parent.left===this?this.parent.left=null:this.parent.right=null,!0):(delete this.key,this.data=[],!0)},n.prototype.deleteIfOnlyOneChild=function(){var t;return this.left&&!this.right&&(t=this.left),!this.left&&this.right&&(t=this.right),t?this.parent?(this.parent.left===this?(this.parent.left=t,t.parent=this.parent):(this.parent.right=t,t.parent=this.parent),!0):(this.key=t.key,this.data=t.data,this.left=null,t.left&&(this.left=t.left,t.left.parent=this),this.right=null,t.right&&(this.right=t.right,t.right.parent=this),!0):!1},n.prototype.delete=function(t,e){var n,r=[],i=this;if(this.hasOwnProperty("key")){if(this.compareKeys(t,this.key)<0)return this.left&&this.left.delete(t,e),void 0;if(this.compareKeys(t,this.key)>0)return this.right&&this.right.delete(t,e),void 0;if(0!==!this.compareKeys(t,this.key))return this.data.length>1&&void 0!==e?(this.data.forEach(function(t){i.checkValueEquality(t,e)||r.push(t)}),i.data=r,void 0):(this.deleteIfLeaf()||this.deleteIfOnlyOneChild()||(Math.random()>=.5?(n=this.left.getMaxKeyDescendant(),this.key=n.key,this.data=n.data,this===n.parent?(this.left=n.left,n.left&&(n.left.parent=n.parent)):(n.parent.right=n.left,n.left&&(n.left.parent=n.parent))):(n=this.right.getMinKeyDescendant(),this.key=n.key,this.data=n.data,this===n.parent?(this.right=n.right,n.right&&(n.right.parent=n.parent)):(n.parent.left=n.right,n.right&&(n.right.parent=n.parent)))),void 0)}},n.prototype.executeOnEveryNode=function(t){this.left&&this.left.executeOnEveryNode(t),t(this),this.right&&this.right.executeOnEveryNode(t)},n.prototype.prettyPrint=function(t,e){e=e||"",console.log(e+"* "+this.key),t&&console.log(e+"* "+this.data),(this.left||this.right)&&(this.left?this.left.prettyPrint(t,e+"  "):console.log(e+"  *"),this.right?this.right.prettyPrint(t,e+"  "):console.log(e+"  *"))},e.exports=n},{"./customUtils":17}],17:[function(t,e){function n(t){var e,r;return 0===t?[]:1===t?[0]:(e=n(t-1),r=Math.floor(Math.random()*t),e.splice(r,0,t-1),e)}function r(t,e){if(e>t)return-1;if(t>e)return 1;if(t===e)return 0;var n=new Error("Couldn't compare elements");throw n.a=t,n.b=e,n}function i(t,e){return t===e}e.exports.getRandomArray=n,e.exports.defaultCompareKeysFunction=r,e.exports.defaultCheckValueEquality=i},{}],18:[function(e,n,r){var i=e("__browserify_process"),o=self;!function(){var t,e,n,r;!function(){var i={},o={};t=function(t,e,n){i[t]={deps:e,callback:n}},r=n=e=function(t){function n(e){if("."!==e.charAt(0))return e;for(var n=e.split("/"),r=t.split("/").slice(0,-1),i=0,o=n.length;o>i;i++){var a=n[i];if(".."===a)r.pop();else{if("."===a)continue;r.push(a)}}return r.join("/")}if(r._eak_seen=i,o[t])return o[t];if(o[t]={},!i[t])throw new Error("Could not find module "+t);for(var a,u=i[t],s=u.deps,c=u.callback,f=[],l=0,h=s.length;h>l;l++)"exports"===s[l]?f.push(a={}):f.push(e(n(s[l])));var p=c.apply(this,f);return o[t]=a||p}}(),t("promise/all",["./utils","exports"],function(t,e){"use strict";function n(t){var e=this;if(!r(t))throw new TypeError("You must pass an array to all.");return new e(function(e,n){function r(t){return function(e){o(t,e)}}function o(t,n){u[t]=n,0===--s&&e(u)}var a,u=[],s=t.length;0===s&&e([]);for(var c=0;c<t.length;c++)a=t[c],a&&i(a.then)?a.then(r(c),n):o(c,a)})}var r=t.isArray,i=t.isFunction;e.all=n}),t("promise/asap",["exports"],function(t){"use strict";function e(){return function(){i.nextTick(a)}}function n(){var t=0,e=new f(a),n=document.createTextNode("");return e.observe(n,{characterData:!0}),function(){n.data=t=++t%2}}function r(){return function(){l.setTimeout(a,1)}}function a(){for(var t=0;t<h.length;t++){var e=h[t],n=e[0],r=e[1];n(r)}h=[]}function u(t,e){var n=h.push([t,e]);1===n&&s()}var s,c="undefined"!=typeof window?window:{},f=c.MutationObserver||c.WebKitMutationObserver,l="undefined"!=typeof o?o:void 0===this?window:this,h=[];s="undefined"!=typeof i&&"[object process]"==={}.toString.call(i)?e():f?n():r(),t.asap=u}),t("promise/config",["exports"],function(t){"use strict";function e(t,e){return 2!==arguments.length?n[t]:(n[t]=e,void 0)}var n={instrument:!1};t.config=n,t.configure=e}),t("promise/polyfill",["./promise","./utils","exports"],function(t,e,n){"use strict";function r(){var t;t="undefined"!=typeof o?o:"undefined"!=typeof window&&window.document?window:self;var e="Promise"in t&&"resolve"in t.Promise&&"reject"in t.Promise&&"all"in t.Promise&&"race"in t.Promise&&function(){var e;return new t.Promise(function(t){e=t}),a(e)}();e||(t.Promise=i)}var i=t.Promise,a=e.isFunction;n.polyfill=r}),t("promise/promise",["./config","./utils","./all","./race","./resolve","./reject","./asap","exports"],function(t,e,n,r,i,o,a,u){"use strict";function s(t){if(!_(t))throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");if(!(this instanceof s))throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");this._subscribers=[],c(t,this)}function c(t,e){function n(t){d(e,t)}function r(t){v(e,t)}try{t(n,r)}catch(i){r(i)}}function f(t,e,n,r){var i,o,a,u,s=_(n);if(s)try{i=n(r),a=!0}catch(c){u=!0,o=c}else i=r,a=!0;p(e,i)||(s&&a?d(e,i):u?v(e,o):t===I?d(e,i):t===D&&v(e,i))}function l(t,e,n,r){var i=t._subscribers,o=i.length;i[o]=e,i[o+I]=n,i[o+D]=r}function h(t,e){for(var n,r,i=t._subscribers,o=t._detail,a=0;a<i.length;a+=3)n=i[a],r=i[a+e],f(e,n,r,o);t._subscribers=null}function p(t,e){var n,r=null;try{if(t===e)throw new TypeError("A promises callback cannot return that same promise.");if(w(e)&&(r=e.then,_(r)))return r.call(e,function(r){return n?!0:(n=!0,e!==r?d(t,r):y(t,r),void 0)},function(e){return n?!0:(n=!0,v(t,e),void 0)}),!0}catch(i){return n?!0:(v(t,i),!0)}return!1}function d(t,e){t===e?y(t,e):p(t,e)||y(t,e)}function y(t,e){t._state===S&&(t._state=j,t._detail=e,b.async(g,t))}function v(t,e){t._state===S&&(t._state=j,t._detail=e,b.async(m,t))}function g(t){h(t,t._state=I)}function m(t){h(t,t._state=D)}var b=t.config;t.configure;var w=e.objectOrFunction,_=e.isFunction;e.now;var k=n.all,x=r.race,E=i.resolve,A=o.reject,O=a.asap;b.async=O;var S=void 0,j=0,I=1,D=2;s.prototype={constructor:s,_state:void 0,_detail:void 0,_subscribers:void 0,then:function(t,e){var n=this,r=new this.constructor(function(){});if(this._state){var i=arguments;b.async(function(){f(n._state,r,i[n._state-1],n._detail)})}else l(this,r,t,e);return r},"catch":function(t){return this.then(null,t)}},s.all=k,s.race=x,s.resolve=E,s.reject=A,u.Promise=s}),t("promise/race",["./utils","exports"],function(t,e){"use strict";function n(t){var e=this;if(!r(t))throw new TypeError("You must pass an array to race.");return new e(function(e,n){for(var r,i=0;i<t.length;i++)r=t[i],r&&"function"==typeof r.then?r.then(e,n):e(r)})}var r=t.isArray;e.race=n}),t("promise/reject",["exports"],function(t){"use strict";function e(t){var e=this;return new e(function(e,n){n(t)})}t.reject=e}),t("promise/resolve",["exports"],function(t){"use strict";function e(t){if(t&&"object"==typeof t&&t.constructor===this)return t;var e=this;return new e(function(e){e(t)})}t.resolve=e}),t("promise/utils",["exports"],function(t){"use strict";function e(t){return n(t)||"object"==typeof t&&null!==t
}function n(t){return"function"==typeof t}function r(t){return"[object Array]"===Object.prototype.toString.call(t)}var i=Date.now||function(){return(new Date).getTime()};t.objectOrFunction=e,t.isFunction=n,t.isArray=r,t.now=i}),e("promise/polyfill").polyfill()}(),function(e,i){"object"==typeof r&&"object"==typeof n?n.exports=i():"function"==typeof t&&t.amd?t([],i):"object"==typeof r?r.localforage=i():e.localforage=i()}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return t[r].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}e.__esModule=!0,function(){function t(t,e){t[e]=function(){var n=arguments;return t.ready().then(function(){return t[e].apply(t,n)})}}function i(){for(var t=1;t<arguments.length;t++){var e=arguments[t];if(e)for(var n in e)e.hasOwnProperty(n)&&(arguments[0][n]=h(e[n])?e[n].slice():e[n])}return arguments[0]}function o(t){for(var e in u)if(u.hasOwnProperty(e)&&u[e]===t)return!0;return!1}var a={},u={INDEXEDDB:"asyncStorage",LOCALSTORAGE:"localStorageWrapper",WEBSQL:"webSQLStorage"},s=[u.INDEXEDDB,u.WEBSQL,u.LOCALSTORAGE],c=["clear","getItem","iterate","key","keys","length","removeItem","setItem"],f={description:"",driver:s.slice(),name:"localforage",size:4980736,storeName:"keyvaluepairs",version:1},l=function(t){var e=e||t.indexedDB||t.webkitIndexedDB||t.mozIndexedDB||t.OIndexedDB||t.msIndexedDB,n={};return n[u.WEBSQL]=!!t.openDatabase,n[u.INDEXEDDB]=!!function(){if("undefined"!=typeof t.openDatabase&&t.navigator&&t.navigator.userAgent&&/Safari/.test(t.navigator.userAgent)&&!/Chrome/.test(t.navigator.userAgent))return!1;try{return e&&"function"==typeof e.open&&"undefined"!=typeof t.IDBKeyRange}catch(n){return!1}}(),n[u.LOCALSTORAGE]=!!function(){try{return t.localStorage&&"setItem"in t.localStorage&&t.localStorage.setItem}catch(e){return!1}}(),n}(this),h=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)},p=function(){function e(t){r(this,e),this.INDEXEDDB=u.INDEXEDDB,this.LOCALSTORAGE=u.LOCALSTORAGE,this.WEBSQL=u.WEBSQL,this._defaultConfig=i({},f),this._config=i({},this._defaultConfig,t),this._driverSet=null,this._initDriver=null,this._ready=!1,this._dbInfo=null,this._wrapLibraryMethodsWithReady(),this.setDriver(this._config.driver)}return e.prototype.config=function(t){if("object"==typeof t){if(this._ready)return new Error("Can't call config() after localforage has been used.");for(var e in t)"storeName"===e&&(t[e]=t[e].replace(/\W/g,"_")),this._config[e]=t[e];return"driver"in t&&t.driver&&this.setDriver(this._config.driver),!0}return"string"==typeof t?this._config[t]:this._config},e.prototype.defineDriver=function(t,e,n){var r=new Promise(function(e,n){try{var r=t._driver,i=new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver"),u=new Error("Custom driver name already in use: "+t._driver);if(!t._driver)return n(i),void 0;if(o(t._driver))return n(u),void 0;for(var s=c.concat("_initStorage"),f=0;f<s.length;f++){var h=s[f];if(!h||!t[h]||"function"!=typeof t[h])return n(i),void 0}var p=Promise.resolve(!0);"_support"in t&&(p=t._support&&"function"==typeof t._support?t._support():Promise.resolve(!!t._support)),p.then(function(n){l[r]=n,a[r]=t,e()},n)}catch(d){n(d)}});return r.then(e,n),r},e.prototype.driver=function(){return this._driver||null},e.prototype.getDriver=function(t,e,r){var i=this,u=function(){if(o(t))switch(t){case i.INDEXEDDB:return new Promise(function(t){t(n(1))});case i.LOCALSTORAGE:return new Promise(function(t){t(n(2))});case i.WEBSQL:return new Promise(function(t){t(n(4))})}else if(a[t])return Promise.resolve(a[t]);return Promise.reject(new Error("Driver not found."))}();return u.then(e,r),u},e.prototype.getSerializer=function(t){var e=new Promise(function(t){t(n(3))});return t&&"function"==typeof t&&e.then(function(e){t(e)}),e},e.prototype.ready=function(t){var e=this,n=e._driverSet.then(function(){return null===e._ready&&(e._ready=e._initDriver()),e._ready});return n.then(t,t),n},e.prototype.setDriver=function(t,e,n){function r(){o._config.driver=o.driver()}function i(t){return function(){function e(){for(;n<t.length;){var i=t[n];return n++,o._dbInfo=null,o._ready=null,o.getDriver(i).then(function(t){return o._extend(t),r(),o._ready=o._initStorage(o._config),o._ready})["catch"](e)}r();var a=new Error("No available storage method found.");return o._driverSet=Promise.reject(a),o._driverSet}var n=0;return e()}}var o=this;h(t)||(t=[t]);var a=this._getSupportedDrivers(t),u=null!==this._driverSet?this._driverSet["catch"](function(){return Promise.resolve()}):Promise.resolve();return this._driverSet=u.then(function(){var t=a[0];return o._dbInfo=null,o._ready=null,o.getDriver(t).then(function(t){o._driver=t._driver,r(),o._wrapLibraryMethodsWithReady(),o._initDriver=i(a)})})["catch"](function(){r();var t=new Error("No available storage method found.");return o._driverSet=Promise.reject(t),o._driverSet}),this._driverSet.then(e,n),this._driverSet},e.prototype.supports=function(t){return!!l[t]},e.prototype._extend=function(t){i(this,t)},e.prototype._getSupportedDrivers=function(t){for(var e=[],n=0,r=t.length;r>n;n++){var i=t[n];this.supports(i)&&e.push(i)}return e},e.prototype._wrapLibraryMethodsWithReady=function(){for(var e=0;e<c.length;e++)t(this,c[e])},e.prototype.createInstance=function(t){return new e(t)},e}(),d=new p;e["default"]=d}.call("undefined"!=typeof window?window:self),t.exports=e["default"]},function(t,e){"use strict";e.__esModule=!0,function(){function t(t,e){t=t||[],e=e||{};try{return new Blob(t,e)}catch(n){if("TypeError"!==n.name)throw n;for(var r=x.BlobBuilder||x.MSBlobBuilder||x.MozBlobBuilder||x.WebKitBlobBuilder,i=new r,o=0;o<t.length;o+=1)i.append(t[o]);return i.getBlob(e.type)}}function n(t){for(var e=t.length,n=new ArrayBuffer(e),r=new Uint8Array(n),i=0;e>i;i++)r[i]=t.charCodeAt(i);return n}function r(t){return new Promise(function(e,n){var r=new XMLHttpRequest;r.open("GET",t),r.withCredentials=!0,r.responseType="arraybuffer",r.onreadystatechange=function(){return 4===r.readyState?200===r.status?e({response:r.response,type:r.getResponseHeader("Content-Type")}):(n({status:r.status,response:r.response}),void 0):void 0},r.send()})}function i(e){return new Promise(function(n,i){var o=t([""],{type:"image/png"}),a=e.transaction([S],"readwrite");a.objectStore(S).put(o,"key"),a.oncomplete=function(){var t=e.transaction([S],"readwrite"),o=t.objectStore(S).get("key");o.onerror=i,o.onsuccess=function(t){var e=t.target.result,i=URL.createObjectURL(e);r(i).then(function(t){n(!(!t||"image/png"!==t.type))},function(){n(!1)}).then(function(){URL.revokeObjectURL(i)})}}})["catch"](function(){return!1})}function o(t){return"boolean"==typeof A?Promise.resolve(A):i(t).then(function(t){return A=t})}function a(t){return new Promise(function(e,n){var r=new FileReader;r.onerror=n,r.onloadend=function(n){var r=btoa(n.target.result||"");e({__local_forage_encoded_blob:!0,data:r,type:t.type})},r.readAsBinaryString(t)})}function u(e){var r=n(atob(e.data));return t([r],{type:e.type})}function s(t){return t&&t.__local_forage_encoded_blob}function c(t){function e(){return Promise.resolve()}var n=this,r={db:null};if(t)for(var i in t)r[i]=t[i];O||(O={});var o=O[r.name];o||(o={forages:[],db:null},O[r.name]=o),o.forages.push(this);for(var a=[],u=0;u<o.forages.length;u++){var s=o.forages[u];s!==this&&a.push(s.ready()["catch"](e))}var c=o.forages.slice(0);return Promise.all(a).then(function(){return r.db=o.db,f(r)}).then(function(t){return r.db=t,p(r,n._defaultConfig.version)?l(r):t}).then(function(t){r.db=o.db=t,n._dbInfo=r;for(var e in c){var i=c[e];i!==n&&(i._dbInfo.db=r.db,i._dbInfo.version=r.version)}})}function f(t){return h(t,!1)}function l(t){return h(t,!0)}function h(t,e){return new Promise(function(n,r){if(t.db){if(!e)return n(t.db);t.db.close()}var i=[t.name];e&&i.push(t.version);var o=E.open.apply(E,i);e&&(o.onupgradeneeded=function(e){var n=o.result;try{n.createObjectStore(t.storeName),e.oldVersion<=1&&n.createObjectStore(S)}catch(r){if("ConstraintError"!==r.name)throw r;x.console.warn('The database "'+t.name+'"'+" has been upgraded from version "+e.oldVersion+" to version "+e.newVersion+', but the storage "'+t.storeName+'" already exists.')}}),o.onerror=function(){r(o.error)},o.onsuccess=function(){n(o.result)}})}function p(t,e){if(!t.db)return!0;var n=!t.db.objectStoreNames.contains(t.storeName),r=t.version<t.db.version,i=t.version>t.db.version;if(r&&(t.version!==e&&x.console.warn('The database "'+t.name+'"'+" can't be downgraded from version "+t.db.version+" to version "+t.version+"."),t.version=t.db.version),i||n){if(n){var o=t.db.version+1;o>t.version&&(t.version=o)}return!0}return!1}function d(t,e){var n=this;"string"!=typeof t&&(x.console.warn(t+" used as a key, but it is not a string."),t=String(t));var r=new Promise(function(e,r){n.ready().then(function(){var i=n._dbInfo,o=i.db.transaction(i.storeName,"readonly").objectStore(i.storeName),a=o.get(t);a.onsuccess=function(){var t=a.result;void 0===t&&(t=null),s(t)&&(t=u(t)),e(t)},a.onerror=function(){r(a.error)}})["catch"](r)});return k(r,e),r}function y(t,e){var n=this,r=new Promise(function(e,r){n.ready().then(function(){var i=n._dbInfo,o=i.db.transaction(i.storeName,"readonly").objectStore(i.storeName),a=o.openCursor(),c=1;a.onsuccess=function(){var n=a.result;if(n){var r=n.value;s(r)&&(r=u(r));var i=t(r,n.key,c++);void 0!==i?e(i):n["continue"]()}else e()},a.onerror=function(){r(a.error)}})["catch"](r)});return k(r,e),r}function v(t,e,n){var r=this;"string"!=typeof t&&(x.console.warn(t+" used as a key, but it is not a string."),t=String(t));var i=new Promise(function(n,i){var u;r.ready().then(function(){return u=r._dbInfo,o(u.db)}).then(function(t){return!t&&e instanceof Blob?a(e):e}).then(function(e){var r=u.db.transaction(u.storeName,"readwrite"),o=r.objectStore(u.storeName);null===e&&(e=void 0);var a=o.put(e,t);r.oncomplete=function(){void 0===e&&(e=null),n(e)},r.onabort=r.onerror=function(){var t=a.error?a.error:a.transaction.error;i(t)}})["catch"](i)});return k(i,n),i}function g(t,e){var n=this;"string"!=typeof t&&(x.console.warn(t+" used as a key, but it is not a string."),t=String(t));var r=new Promise(function(e,r){n.ready().then(function(){var i=n._dbInfo,o=i.db.transaction(i.storeName,"readwrite"),a=o.objectStore(i.storeName),u=a["delete"](t);o.oncomplete=function(){e()},o.onerror=function(){r(u.error)},o.onabort=function(){var t=u.error?u.error:u.transaction.error;r(t)}})["catch"](r)});return k(r,e),r}function m(t){var e=this,n=new Promise(function(t,n){e.ready().then(function(){var r=e._dbInfo,i=r.db.transaction(r.storeName,"readwrite"),o=i.objectStore(r.storeName),a=o.clear();i.oncomplete=function(){t()},i.onabort=i.onerror=function(){var t=a.error?a.error:a.transaction.error;n(t)}})["catch"](n)});return k(n,t),n}function b(t){var e=this,n=new Promise(function(t,n){e.ready().then(function(){var r=e._dbInfo,i=r.db.transaction(r.storeName,"readonly").objectStore(r.storeName),o=i.count();o.onsuccess=function(){t(o.result)},o.onerror=function(){n(o.error)}})["catch"](n)});return k(n,t),n}function w(t,e){var n=this,r=new Promise(function(e,r){return 0>t?(e(null),void 0):(n.ready().then(function(){var i=n._dbInfo,o=i.db.transaction(i.storeName,"readonly").objectStore(i.storeName),a=!1,u=o.openCursor();u.onsuccess=function(){var n=u.result;return n?(0===t?e(n.key):a?e(n.key):(a=!0,n.advance(t)),void 0):(e(null),void 0)},u.onerror=function(){r(u.error)}})["catch"](r),void 0)});return k(r,e),r}function _(t){var e=this,n=new Promise(function(t,n){e.ready().then(function(){var r=e._dbInfo,i=r.db.transaction(r.storeName,"readonly").objectStore(r.storeName),o=i.openCursor(),a=[];o.onsuccess=function(){var e=o.result;return e?(a.push(e.key),e["continue"](),void 0):(t(a),void 0)},o.onerror=function(){n(o.error)}})["catch"](n)});return k(n,t),n}function k(t,e){e&&t.then(function(t){e(null,t)},function(t){e(t)})}var x=this,E=E||this.indexedDB||this.webkitIndexedDB||this.mozIndexedDB||this.OIndexedDB||this.msIndexedDB;if(E){var A,O,S="local-forage-detect-blob-support",j={_driver:"asyncStorage",_initStorage:c,iterate:y,getItem:d,setItem:v,removeItem:g,clear:m,length:b,key:w,keys:_};e["default"]=j}}.call("undefined"!=typeof window?window:self),t.exports=e["default"]},function(t,e,n){"use strict";e.__esModule=!0,function(){function t(t){var e=this,r={};if(t)for(var i in t)r[i]=t[i];return r.keyPrefix=r.name+"/",r.storeName!==e._defaultConfig.storeName&&(r.keyPrefix+=r.storeName+"/"),e._dbInfo=r,new Promise(function(t){t(n(3))}).then(function(t){return r.serializer=t,Promise.resolve()})}function r(t){var e=this,n=e.ready().then(function(){for(var t=e._dbInfo.keyPrefix,n=p.length-1;n>=0;n--){var r=p.key(n);0===r.indexOf(t)&&p.removeItem(r)}});return l(n,t),n}function i(t,e){var n=this;"string"!=typeof t&&(h.console.warn(t+" used as a key, but it is not a string."),t=String(t));var r=n.ready().then(function(){var e=n._dbInfo,r=p.getItem(e.keyPrefix+t);return r&&(r=e.serializer.deserialize(r)),r});return l(r,e),r}function o(t,e){var n=this,r=n.ready().then(function(){for(var e=n._dbInfo,r=e.keyPrefix,i=r.length,o=p.length,a=1,u=0;o>u;u++){var s=p.key(u);if(0===s.indexOf(r)){var c=p.getItem(s);if(c&&(c=e.serializer.deserialize(c)),c=t(c,s.substring(i),a++),void 0!==c)return c}}});return l(r,e),r}function a(t,e){var n=this,r=n.ready().then(function(){var e,r=n._dbInfo;try{e=p.key(t)}catch(i){e=null}return e&&(e=e.substring(r.keyPrefix.length)),e});return l(r,e),r}function u(t){var e=this,n=e.ready().then(function(){for(var t=e._dbInfo,n=p.length,r=[],i=0;n>i;i++)0===p.key(i).indexOf(t.keyPrefix)&&r.push(p.key(i).substring(t.keyPrefix.length));return r});return l(n,t),n}function s(t){var e=this,n=e.keys().then(function(t){return t.length});return l(n,t),n}function c(t,e){var n=this;"string"!=typeof t&&(h.console.warn(t+" used as a key, but it is not a string."),t=String(t));var r=n.ready().then(function(){var e=n._dbInfo;p.removeItem(e.keyPrefix+t)});return l(r,e),r}function f(t,e,n){var r=this;"string"!=typeof t&&(h.console.warn(t+" used as a key, but it is not a string."),t=String(t));var i=r.ready().then(function(){void 0===e&&(e=null);var n=e;return new Promise(function(i,o){var a=r._dbInfo;a.serializer.serialize(e,function(e,r){if(r)o(r);else try{p.setItem(a.keyPrefix+t,e),i(n)}catch(u){("QuotaExceededError"===u.name||"NS_ERROR_DOM_QUOTA_REACHED"===u.name)&&o(u),o(u)}})})});return l(i,n),i}function l(t,e){e&&t.then(function(t){e(null,t)},function(t){e(t)})}var h=this,p=null;try{if(!(this.localStorage&&"setItem"in this.localStorage))return;p=this.localStorage}catch(d){return}var y={_driver:"localStorageWrapper",_initStorage:t,iterate:o,getItem:i,setItem:f,removeItem:c,clear:r,length:s,key:a,keys:u};e["default"]=y}.call("undefined"!=typeof window?window:self),t.exports=e["default"]},function(t,e){"use strict";e.__esModule=!0,function(){function t(t,e){t=t||[],e=e||{};try{return new Blob(t,e)}catch(n){if("TypeError"!==n.name)throw n;for(var r=x.BlobBuilder||x.MSBlobBuilder||x.MozBlobBuilder||x.WebKitBlobBuilder,i=new r,o=0;o<t.length;o+=1)i.append(t[o]);return i.getBlob(e.type)}}function n(t,e){var n="";if(t&&(n=t.toString()),t&&("[object ArrayBuffer]"===t.toString()||t.buffer&&"[object ArrayBuffer]"===t.buffer.toString())){var r,i=c;t instanceof ArrayBuffer?(r=t,i+=l):(r=t.buffer,"[object Int8Array]"===n?i+=p:"[object Uint8Array]"===n?i+=d:"[object Uint8ClampedArray]"===n?i+=y:"[object Int16Array]"===n?i+=v:"[object Uint16Array]"===n?i+=m:"[object Int32Array]"===n?i+=g:"[object Uint32Array]"===n?i+=b:"[object Float32Array]"===n?i+=w:"[object Float64Array]"===n?i+=_:e(new Error("Failed to get type for BinaryArray"))),e(i+o(r))}else if("[object Blob]"===n){var a=new FileReader;a.onload=function(){var n=u+t.type+"~"+o(this.result);e(c+h+n)},a.readAsArrayBuffer(t)}else try{e(JSON.stringify(t))}catch(s){console.error("Couldn't convert value into a JSON string: ",t),e(null,s)}}function r(e){if(e.substring(0,f)!==c)return JSON.parse(e);var n,r=e.substring(k),o=e.substring(f,k);if(o===h&&s.test(r)){var a=r.match(s);n=a[1],r=r.substring(a[0].length)}var u=i(r);switch(o){case l:return u;case h:return t([u],{type:n});case p:return new Int8Array(u);case d:return new Uint8Array(u);case y:return new Uint8ClampedArray(u);case v:return new Int16Array(u);case m:return new Uint16Array(u);case g:return new Int32Array(u);case b:return new Uint32Array(u);case w:return new Float32Array(u);case _:return new Float64Array(u);default:throw new Error("Unkown type: "+o)}}function i(t){var e,n,r,i,o,u=.75*t.length,s=t.length,c=0;"="===t[t.length-1]&&(u--,"="===t[t.length-2]&&u--);var f=new ArrayBuffer(u),l=new Uint8Array(f);for(e=0;s>e;e+=4)n=a.indexOf(t[e]),r=a.indexOf(t[e+1]),i=a.indexOf(t[e+2]),o=a.indexOf(t[e+3]),l[c++]=n<<2|r>>4,l[c++]=(15&r)<<4|i>>2,l[c++]=(3&i)<<6|63&o;return f}function o(t){var e,n=new Uint8Array(t),r="";for(e=0;e<n.length;e+=3)r+=a[n[e]>>2],r+=a[(3&n[e])<<4|n[e+1]>>4],r+=a[(15&n[e+1])<<2|n[e+2]>>6],r+=a[63&n[e+2]];return 2===n.length%3?r=r.substring(0,r.length-1)+"=":1===n.length%3&&(r=r.substring(0,r.length-2)+"=="),r}var a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",u="~~local_forage_type~",s=/^~~local_forage_type~([^~]+)~/,c="__lfsc__:",f=c.length,l="arbf",h="blob",p="si08",d="ui08",y="uic8",v="si16",g="si32",m="ur16",b="ui32",w="fl32",_="fl64",k=f+l.length,x=this,E={serialize:n,deserialize:r,stringToBuffer:i,bufferToString:o};e["default"]=E}.call("undefined"!=typeof window?window:self),t.exports=e["default"]},function(t,e,n){"use strict";e.__esModule=!0,function(){function t(t){var e=this,r={db:null};if(t)for(var i in t)r[i]="string"!=typeof t[i]?t[i].toString():t[i];var o=new Promise(function(n,i){try{r.db=p(r.name,String(r.version),r.description,r.size)}catch(o){return e.setDriver(e.LOCALSTORAGE).then(function(){return e._initStorage(t)}).then(n)["catch"](i)}r.db.transaction(function(t){t.executeSql("CREATE TABLE IF NOT EXISTS "+r.storeName+" (id INTEGER PRIMARY KEY, key unique, value)",[],function(){e._dbInfo=r,n()},function(t,e){i(e)})})});return new Promise(function(t){t(n(3))}).then(function(t){return r.serializer=t,o})}function r(t,e){var n=this;"string"!=typeof t&&(h.console.warn(t+" used as a key, but it is not a string."),t=String(t));var r=new Promise(function(e,r){n.ready().then(function(){var i=n._dbInfo;i.db.transaction(function(n){n.executeSql("SELECT * FROM "+i.storeName+" WHERE key = ? LIMIT 1",[t],function(t,n){var r=n.rows.length?n.rows.item(0).value:null;r&&(r=i.serializer.deserialize(r)),e(r)},function(t,e){r(e)})})})["catch"](r)});return l(r,e),r}function i(t,e){var n=this,r=new Promise(function(e,r){n.ready().then(function(){var i=n._dbInfo;i.db.transaction(function(n){n.executeSql("SELECT * FROM "+i.storeName,[],function(n,r){for(var o=r.rows,a=o.length,u=0;a>u;u++){var s=o.item(u),c=s.value;if(c&&(c=i.serializer.deserialize(c)),c=t(c,s.key,u+1),void 0!==c)return e(c),void 0}e()},function(t,e){r(e)})})})["catch"](r)});return l(r,e),r}function o(t,e,n){var r=this;"string"!=typeof t&&(h.console.warn(t+" used as a key, but it is not a string."),t=String(t));var i=new Promise(function(n,i){r.ready().then(function(){void 0===e&&(e=null);var o=e,a=r._dbInfo;a.serializer.serialize(e,function(e,r){r?i(r):a.db.transaction(function(r){r.executeSql("INSERT OR REPLACE INTO "+a.storeName+" (key, value) VALUES (?, ?)",[t,e],function(){n(o)},function(t,e){i(e)})},function(t){t.code===t.QUOTA_ERR&&i(t)})})})["catch"](i)});return l(i,n),i}function a(t,e){var n=this;"string"!=typeof t&&(h.console.warn(t+" used as a key, but it is not a string."),t=String(t));var r=new Promise(function(e,r){n.ready().then(function(){var i=n._dbInfo;i.db.transaction(function(n){n.executeSql("DELETE FROM "+i.storeName+" WHERE key = ?",[t],function(){e()},function(t,e){r(e)})})})["catch"](r)});return l(r,e),r}function u(t){var e=this,n=new Promise(function(t,n){e.ready().then(function(){var r=e._dbInfo;r.db.transaction(function(e){e.executeSql("DELETE FROM "+r.storeName,[],function(){t()},function(t,e){n(e)})})})["catch"](n)});return l(n,t),n}function s(t){var e=this,n=new Promise(function(t,n){e.ready().then(function(){var r=e._dbInfo;r.db.transaction(function(e){e.executeSql("SELECT COUNT(key) as c FROM "+r.storeName,[],function(e,n){var r=n.rows.item(0).c;t(r)},function(t,e){n(e)})})})["catch"](n)});return l(n,t),n}function c(t,e){var n=this,r=new Promise(function(e,r){n.ready().then(function(){var i=n._dbInfo;i.db.transaction(function(n){n.executeSql("SELECT key FROM "+i.storeName+" WHERE id = ? LIMIT 1",[t+1],function(t,n){var r=n.rows.length?n.rows.item(0).key:null;e(r)},function(t,e){r(e)})})})["catch"](r)});return l(r,e),r}function f(t){var e=this,n=new Promise(function(t,n){e.ready().then(function(){var r=e._dbInfo;r.db.transaction(function(e){e.executeSql("SELECT key FROM "+r.storeName,[],function(e,n){for(var r=[],i=0;i<n.rows.length;i++)r.push(n.rows.item(i).key);t(r)},function(t,e){n(e)})})})["catch"](n)});return l(n,t),n}function l(t,e){e&&t.then(function(t){e(null,t)},function(t){e(t)})}var h=this,p=this.openDatabase;if(p){var d={_driver:"webSQLStorage",_initStorage:t,iterate:i,getItem:r,setItem:o,removeItem:a,clear:u,length:s,key:c,keys:f};e["default"]=d}}.call("undefined"!=typeof window?window:self),t.exports=e["default"]}])})},{__browserify_process:4}],19:[function(t,e,n){!function(){var t=this,r=t._,i={},o=Array.prototype,a=Object.prototype,u=Function.prototype,s=o.push,c=o.slice,f=o.concat,l=a.toString,h=a.hasOwnProperty,p=o.forEach,d=o.map,y=o.reduce,v=o.reduceRight,g=o.filter,m=o.every,b=o.some,w=o.indexOf,_=o.lastIndexOf,k=Array.isArray,x=Object.keys,E=u.bind,A=function(t){return t instanceof A?t:this instanceof A?(this._wrapped=t,void 0):new A(t)};"undefined"!=typeof n?("undefined"!=typeof e&&e.exports&&(n=e.exports=A),n._=A):t._=A,A.VERSION="1.4.4";var O=A.each=A.forEach=function(t,e,n){if(null!=t)if(p&&t.forEach===p)t.forEach(e,n);else if(t.length===+t.length){for(var r=0,o=t.length;o>r;r++)if(e.call(n,t[r],r,t)===i)return}else for(var a in t)if(A.has(t,a)&&e.call(n,t[a],a,t)===i)return};A.map=A.collect=function(t,e,n){var r=[];return null==t?r:d&&t.map===d?t.map(e,n):(O(t,function(t,i,o){r[r.length]=e.call(n,t,i,o)}),r)};var S="Reduce of empty array with no initial value";A.reduce=A.foldl=A.inject=function(t,e,n,r){var i=arguments.length>2;if(null==t&&(t=[]),y&&t.reduce===y)return r&&(e=A.bind(e,r)),i?t.reduce(e,n):t.reduce(e);if(O(t,function(t,o,a){i?n=e.call(r,n,t,o,a):(n=t,i=!0)}),!i)throw new TypeError(S);return n},A.reduceRight=A.foldr=function(t,e,n,r){var i=arguments.length>2;if(null==t&&(t=[]),v&&t.reduceRight===v)return r&&(e=A.bind(e,r)),i?t.reduceRight(e,n):t.reduceRight(e);var o=t.length;if(o!==+o){var a=A.keys(t);o=a.length}if(O(t,function(u,s,c){s=a?a[--o]:--o,i?n=e.call(r,n,t[s],s,c):(n=t[s],i=!0)}),!i)throw new TypeError(S);return n},A.find=A.detect=function(t,e,n){var r;return j(t,function(t,i,o){return e.call(n,t,i,o)?(r=t,!0):void 0}),r},A.filter=A.select=function(t,e,n){var r=[];return null==t?r:g&&t.filter===g?t.filter(e,n):(O(t,function(t,i,o){e.call(n,t,i,o)&&(r[r.length]=t)}),r)},A.reject=function(t,e,n){return A.filter(t,function(t,r,i){return!e.call(n,t,r,i)},n)},A.every=A.all=function(t,e,n){e||(e=A.identity);var r=!0;return null==t?r:m&&t.every===m?t.every(e,n):(O(t,function(t,o,a){return(r=r&&e.call(n,t,o,a))?void 0:i}),!!r)};var j=A.some=A.any=function(t,e,n){e||(e=A.identity);var r=!1;return null==t?r:b&&t.some===b?t.some(e,n):(O(t,function(t,o,a){return r||(r=e.call(n,t,o,a))?i:void 0}),!!r)};A.contains=A.include=function(t,e){return null==t?!1:w&&t.indexOf===w?-1!=t.indexOf(e):j(t,function(t){return t===e})},A.invoke=function(t,e){var n=c.call(arguments,2),r=A.isFunction(e);return A.map(t,function(t){return(r?e:t[e]).apply(t,n)})},A.pluck=function(t,e){return A.map(t,function(t){return t[e]})},A.where=function(t,e,n){return A.isEmpty(e)?n?null:[]:A[n?"find":"filter"](t,function(t){for(var n in e)if(e[n]!==t[n])return!1;return!0})},A.findWhere=function(t,e){return A.where(t,e,!0)},A.max=function(t,e,n){if(!e&&A.isArray(t)&&t[0]===+t[0]&&t.length<65535)return Math.max.apply(Math,t);if(!e&&A.isEmpty(t))return-1/0;var r={computed:-1/0,value:-1/0};return O(t,function(t,i,o){var a=e?e.call(n,t,i,o):t;a>=r.computed&&(r={value:t,computed:a})}),r.value},A.min=function(t,e,n){if(!e&&A.isArray(t)&&t[0]===+t[0]&&t.length<65535)return Math.min.apply(Math,t);if(!e&&A.isEmpty(t))return 1/0;var r={computed:1/0,value:1/0};return O(t,function(t,i,o){var a=e?e.call(n,t,i,o):t;a<r.computed&&(r={value:t,computed:a})}),r.value},A.shuffle=function(t){var e,n=0,r=[];return O(t,function(t){e=A.random(n++),r[n-1]=r[e],r[e]=t}),r};var I=function(t){return A.isFunction(t)?t:function(e){return e[t]}};A.sortBy=function(t,e,n){var r=I(e);return A.pluck(A.map(t,function(t,e,i){return{value:t,index:e,criteria:r.call(n,t,e,i)}}).sort(function(t,e){var n=t.criteria,r=e.criteria;if(n!==r){if(n>r||void 0===n)return 1;if(r>n||void 0===r)return-1}return t.index<e.index?-1:1}),"value")};var D=function(t,e,n,r){var i={},o=I(e||A.identity);return O(t,function(e,a){var u=o.call(n,e,a,t);r(i,u,e)}),i};A.groupBy=function(t,e,n){return D(t,e,n,function(t,e,n){(A.has(t,e)?t[e]:t[e]=[]).push(n)})},A.countBy=function(t,e,n){return D(t,e,n,function(t,e){A.has(t,e)||(t[e]=0),t[e]++})},A.sortedIndex=function(t,e,n,r){n=null==n?A.identity:I(n);for(var i=n.call(r,e),o=0,a=t.length;a>o;){var u=o+a>>>1;n.call(r,t[u])<i?o=u+1:a=u}return o},A.toArray=function(t){return t?A.isArray(t)?c.call(t):t.length===+t.length?A.map(t,A.identity):A.values(t):[]},A.size=function(t){return null==t?0:t.length===+t.length?t.length:A.keys(t).length},A.first=A.head=A.take=function(t,e,n){return null==t?void 0:null==e||n?t[0]:c.call(t,0,e)},A.initial=function(t,e,n){return c.call(t,0,t.length-(null==e||n?1:e))},A.last=function(t,e,n){return null==t?void 0:null==e||n?t[t.length-1]:c.call(t,Math.max(t.length-e,0))},A.rest=A.tail=A.drop=function(t,e,n){return c.call(t,null==e||n?1:e)},A.compact=function(t){return A.filter(t,A.identity)};var $=function(t,e,n){return O(t,function(t){A.isArray(t)?e?s.apply(n,t):$(t,e,n):n.push(t)}),n};A.flatten=function(t,e){return $(t,e,[])},A.without=function(t){return A.difference(t,c.call(arguments,1))},A.uniq=A.unique=function(t,e,n,r){A.isFunction(e)&&(r=n,n=e,e=!1);var i=n?A.map(t,n,r):t,o=[],a=[];return O(i,function(n,r){(e?r&&a[a.length-1]===n:A.contains(a,n))||(a.push(n),o.push(t[r]))}),o},A.union=function(){return A.uniq(f.apply(o,arguments))},A.intersection=function(t){var e=c.call(arguments,1);return A.filter(A.uniq(t),function(t){return A.every(e,function(e){return A.indexOf(e,t)>=0})})},A.difference=function(t){var e=f.apply(o,c.call(arguments,1));return A.filter(t,function(t){return!A.contains(e,t)})},A.zip=function(){for(var t=c.call(arguments),e=A.max(A.pluck(t,"length")),n=new Array(e),r=0;e>r;r++)n[r]=A.pluck(t,""+r);return n},A.object=function(t,e){if(null==t)return{};for(var n={},r=0,i=t.length;i>r;r++)e?n[t[r]]=e[r]:n[t[r][0]]=t[r][1];return n},A.indexOf=function(t,e,n){if(null==t)return-1;var r=0,i=t.length;if(n){if("number"!=typeof n)return r=A.sortedIndex(t,e),t[r]===e?r:-1;r=0>n?Math.max(0,i+n):n}if(w&&t.indexOf===w)return t.indexOf(e,n);for(;i>r;r++)if(t[r]===e)return r;return-1},A.lastIndexOf=function(t,e,n){if(null==t)return-1;var r=null!=n;if(_&&t.lastIndexOf===_)return r?t.lastIndexOf(e,n):t.lastIndexOf(e);for(var i=r?n:t.length;i--;)if(t[i]===e)return i;return-1},A.range=function(t,e,n){arguments.length<=1&&(e=t||0,t=0),n=arguments[2]||1;for(var r=Math.max(Math.ceil((e-t)/n),0),i=0,o=new Array(r);r>i;)o[i++]=t,t+=n;return o},A.bind=function(t,e){if(t.bind===E&&E)return E.apply(t,c.call(arguments,1));var n=c.call(arguments,2);return function(){return t.apply(e,n.concat(c.call(arguments)))}},A.partial=function(t){var e=c.call(arguments,1);return function(){return t.apply(this,e.concat(c.call(arguments)))}},A.bindAll=function(t){var e=c.call(arguments,1);return 0===e.length&&(e=A.functions(t)),O(e,function(e){t[e]=A.bind(t[e],t)}),t},A.memoize=function(t,e){var n={};return e||(e=A.identity),function(){var r=e.apply(this,arguments);return A.has(n,r)?n[r]:n[r]=t.apply(this,arguments)}},A.delay=function(t,e){var n=c.call(arguments,2);return setTimeout(function(){return t.apply(null,n)},e)},A.defer=function(t){return A.delay.apply(A,[t,1].concat(c.call(arguments,1)))},A.throttle=function(t,e){var n,r,i,o,a=0,u=function(){a=new Date,i=null,o=t.apply(n,r)};return function(){var s=new Date,c=e-(s-a);return n=this,r=arguments,0>=c?(clearTimeout(i),i=null,a=s,o=t.apply(n,r)):i||(i=setTimeout(u,c)),o}},A.debounce=function(t,e,n){var r,i;return function(){var o=this,a=arguments,u=function(){r=null,n||(i=t.apply(o,a))},s=n&&!r;return clearTimeout(r),r=setTimeout(u,e),s&&(i=t.apply(o,a)),i}},A.once=function(t){var e,n=!1;return function(){return n?e:(n=!0,e=t.apply(this,arguments),t=null,e)}},A.wrap=function(t,e){return function(){var n=[t];return s.apply(n,arguments),e.apply(this,n)}},A.compose=function(){var t=arguments;return function(){for(var e=arguments,n=t.length-1;n>=0;n--)e=[t[n].apply(this,e)];return e[0]}},A.after=function(t,e){return 0>=t?e():function(){return--t<1?e.apply(this,arguments):void 0}},A.keys=x||function(t){if(t!==Object(t))throw new TypeError("Invalid object");var e=[];for(var n in t)A.has(t,n)&&(e[e.length]=n);return e},A.values=function(t){var e=[];for(var n in t)A.has(t,n)&&e.push(t[n]);return e},A.pairs=function(t){var e=[];for(var n in t)A.has(t,n)&&e.push([n,t[n]]);return e},A.invert=function(t){var e={};for(var n in t)A.has(t,n)&&(e[t[n]]=n);return e},A.functions=A.methods=function(t){var e=[];for(var n in t)A.isFunction(t[n])&&e.push(n);return e.sort()},A.extend=function(t){return O(c.call(arguments,1),function(e){if(e)for(var n in e)t[n]=e[n]}),t},A.pick=function(t){var e={},n=f.apply(o,c.call(arguments,1));return O(n,function(n){n in t&&(e[n]=t[n])}),e},A.omit=function(t){var e={},n=f.apply(o,c.call(arguments,1));for(var r in t)A.contains(n,r)||(e[r]=t[r]);return e},A.defaults=function(t){return O(c.call(arguments,1),function(e){if(e)for(var n in e)null==t[n]&&(t[n]=e[n])}),t},A.clone=function(t){return A.isObject(t)?A.isArray(t)?t.slice():A.extend({},t):t},A.tap=function(t,e){return e(t),t};var N=function(t,e,n,r){if(t===e)return 0!==t||1/t==1/e;if(null==t||null==e)return t===e;t instanceof A&&(t=t._wrapped),e instanceof A&&(e=e._wrapped);var i=l.call(t);if(i!=l.call(e))return!1;switch(i){case"[object String]":return t==String(e);case"[object Number]":return t!=+t?e!=+e:0==t?1/t==1/e:t==+e;case"[object Date]":case"[object Boolean]":return+t==+e;case"[object RegExp]":return t.source==e.source&&t.global==e.global&&t.multiline==e.multiline&&t.ignoreCase==e.ignoreCase}if("object"!=typeof t||"object"!=typeof e)return!1;for(var o=n.length;o--;)if(n[o]==t)return r[o]==e;n.push(t),r.push(e);var a=0,u=!0;if("[object Array]"==i){if(a=t.length,u=a==e.length)for(;a--&&(u=N(t[a],e[a],n,r)););}else{var s=t.constructor,c=e.constructor;if(s!==c&&!(A.isFunction(s)&&s instanceof s&&A.isFunction(c)&&c instanceof c))return!1;for(var f in t)if(A.has(t,f)&&(a++,!(u=A.has(e,f)&&N(t[f],e[f],n,r))))break;if(u){for(f in e)if(A.has(e,f)&&!a--)break;u=!a}}return n.pop(),r.pop(),u};A.isEqual=function(t,e){return N(t,e,[],[])},A.isEmpty=function(t){if(null==t)return!0;if(A.isArray(t)||A.isString(t))return 0===t.length;for(var e in t)if(A.has(t,e))return!1;return!0},A.isElement=function(t){return!(!t||1!==t.nodeType)},A.isArray=k||function(t){return"[object Array]"==l.call(t)},A.isObject=function(t){return t===Object(t)},O(["Arguments","Function","String","Number","Date","RegExp"],function(t){A["is"+t]=function(e){return l.call(e)=="[object "+t+"]"}}),A.isArguments(arguments)||(A.isArguments=function(t){return!(!t||!A.has(t,"callee"))
}),"function"!=typeof/./&&(A.isFunction=function(t){return"function"==typeof t}),A.isFinite=function(t){return isFinite(t)&&!isNaN(parseFloat(t))},A.isNaN=function(t){return A.isNumber(t)&&t!=+t},A.isBoolean=function(t){return t===!0||t===!1||"[object Boolean]"==l.call(t)},A.isNull=function(t){return null===t},A.isUndefined=function(t){return void 0===t},A.has=function(t,e){return h.call(t,e)},A.noConflict=function(){return t._=r,this},A.identity=function(t){return t},A.times=function(t,e,n){for(var r=Array(t),i=0;t>i;i++)r[i]=e.call(n,i);return r},A.random=function(t,e){return null==e&&(e=t,t=0),t+Math.floor(Math.random()*(e-t+1))};var P={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;"}};P.unescape=A.invert(P.escape);var T={escape:new RegExp("["+A.keys(P.escape).join("")+"]","g"),unescape:new RegExp("("+A.keys(P.unescape).join("|")+")","g")};A.each(["escape","unescape"],function(t){A[t]=function(e){return null==e?"":(""+e).replace(T[t],function(e){return P[t][e]})}}),A.result=function(t,e){if(null==t)return null;var n=t[e];return A.isFunction(n)?n.call(t):n},A.mixin=function(t){O(A.functions(t),function(e){var n=A[e]=t[e];A.prototype[e]=function(){var t=[this._wrapped];return s.apply(t,arguments),R.call(this,n.apply(A,t))}})};var C=0;A.uniqueId=function(t){var e=++C+"";return t?t+e:e},A.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var M=/(.)^/,B={"'":"'","\\":"\\","\r":"r","\n":"n","	":"t","\u2028":"u2028","\u2029":"u2029"},F=/\\|'|\r|\n|\t|\u2028|\u2029/g;A.template=function(t,e,n){var r;n=A.defaults({},n,A.templateSettings);var i=new RegExp([(n.escape||M).source,(n.interpolate||M).source,(n.evaluate||M).source].join("|")+"|$","g"),o=0,a="__p+='";t.replace(i,function(e,n,r,i,u){return a+=t.slice(o,u).replace(F,function(t){return"\\"+B[t]}),n&&(a+="'+\n((__t=("+n+"))==null?'':_.escape(__t))+\n'"),r&&(a+="'+\n((__t=("+r+"))==null?'':__t)+\n'"),i&&(a+="';\n"+i+"\n__p+='"),o=u+e.length,e}),a+="';\n",n.variable||(a="with(obj||{}){\n"+a+"}\n"),a="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+a+"return __p;\n";try{r=new Function(n.variable||"obj","_",a)}catch(u){throw u.source=a,u}if(e)return r(e,A);var s=function(t){return r.call(this,t,A)};return s.source="function("+(n.variable||"obj")+"){\n"+a+"}",s},A.chain=function(t){return A(t).chain()};var R=function(t){return this._chain?A(t).chain():t};A.mixin(A),O(["pop","push","reverse","shift","sort","splice","unshift"],function(t){var e=o[t];A.prototype[t]=function(){var n=this._wrapped;return e.apply(n,arguments),"shift"!=t&&"splice"!=t||0!==n.length||delete n[0],R.call(this,n)}}),O(["concat","join","slice"],function(t){var e=o[t];A.prototype[t]=function(){return R.call(this,e.apply(this._wrapped,arguments))}}),A.extend(A.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}})}.call(this)},{}]},{},[7])(7)});
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
!function(e){var s={};function i(r){if(s[r])return s[r].exports;var a=s[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=e,i.c=s,i.d=function(e,s,r){i.o(e,s)||Object.defineProperty(e,s,{enumerable:!0,get:r})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,s){if(1&s&&(e=i(e)),8&s)return e;if(4&s&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&s&&"string"!=typeof e)for(var a in e)i.d(r,a,function(s){return e[s]}.bind(null,a));return r},i.n=function(e){var s=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(s,"a",s),s},i.o=function(e,s){return Object.prototype.hasOwnProperty.call(e,s)},i.p="",i(i.s=17)}([function(e,s,i){"use strict";var r=[2,6,113],a=[4,11],n=[82,134,141],t=[122],o=[].concat(t,n),u=[85,115],p=[7],c=[80],f=[91],l=[105,87,110,135,106],h=[101],m=[45,90,144,46],v=[39,40,43,41,42,44],d=[124],b=[57],y=54,g=129,_=[47,48,142,49,50,51,52,143,53],C=[140],D=[120],A=[127],I=[125],q=[128,147,136],S=[y,g].concat(_,[55]),R=[84,12,15,16,17,18,19,20,21,139,22,23,24,131],B=[112,117],N=[107],x=[78],L=[25];e.exports={BB_Ise:2,BBV_Ise:6,BBVR_Ise:113,group_BB_Ise:r,BB_Fusou:4,BBV_Fusou:11,group_BB_Fusou:a,BB_Nagato:10,BB_Yamato:83,BB_Kongou:9,BB_Kongou2:119,BB_Bismarck:7,BB_VittorioVeneto:70,BB_Colorado:122,BB_Iowa:82,BB_SouthDakota:134,BB_QueenElizabeth:85,BB_Nelson:115,BB_Richelieu:100,BB_Gangut:93,group_BC_Navy_USN:n,group_BB_exclude_BC_Navy_USN:t,group_BB_Navy_USN:o,group_BB_Navy_RN:u,group_BB_Navy_KM:p,CV_Kaga:27,CV_KagaRevised:137,CV_Lexington:87,CVB_Lexington:105,CV_Essex:110,CV_Yorktown:135,CV_ArkRoyal:101,CV_GrafZeppelin:80,CV_Aquila:91,group_CV_Navy_KM:c,group_CV_Navy_RM:f,group_CV_Navy_USN:l,group_CV_Navy_RN:h,CV_Houshou:33,CV_Kagasumaru:95,CV_Taiyou_SP:96,CV_Taiyou:97,CV_Casablanca:106,CVL_Ryuuhou:35,CVL_RyuuhouRevised:145,CVL_Shouhou:36,CVL_Hiyou:37,CVL_Chitose:38,CAV_Mogami:45,CAV_MogamiRevised:90,CAV_MogamiSuper:144,CAV_Tone:46,group_CAV_Navy_IJN:m,CA_Furutaka:39,CA_Aoba:40,CA_Myoukou:41,CA_Takao:42,CA_Mogami:43,CA_Tone:44,CA_AdmiralHipper:57,CA_Houston:124,group_CA_Navy_IJN:v,group_CA_Navy_USN:d,group_CA_Navy_KM:b,CLT_Kuma:y,CLV_Gotland:116,CL_Yuubari2:g,CL_Atlanta:128,CL_Tenryuu:47,CL_Kuma:48,CL_KumaRevised:142,CL_Nagara:49,CL_Sendai:50,CL_Yuubari:51,CL_Agano:52,CL_AganoRevised:143,CL_Ooyodo:53,CL_Gotland:114,CL_Abruzzi:120,CL_DeRuyter:127,CL_Perth:125,CL_Brooklyn:147,CL_StLouis:136,CT_Katori:55,group_CL_Navy_IJN:_,group_CL_Navy_RNLN:A,group_CL_Navy_RAN:I,group_CL_Navy_USN:q,group_CL_Navy_RN:C,group_CL_S_Navy_IJN:S,DD_Kamikaze:84,DD_Mutsuki:12,DD_Special:[15,16,17],DD_Tokugata:[15,16,17],DD_Fubuki:15,DD_Ayanami:16,DD_Akatsuki:17,DD_Hatsuharu:18,DD_Shiratsuyu:19,DD_Asashio:20,DD_Kagerou:21,DD_KagerouROCN:138,DD_Kagerou2:139,DD_Yuugumo:22,DD_Akizuki:23,DD_Shimakaze:24,DD_1934:25,DD_Matsu:131,DD_Maestrale:78,DD_J:107,DD_JohnCButler:112,DD_Fletcher:117,group_DD_Tokugata:[15,16,17],group_DD_Navy_IJN:R,group_DD_Navy_USN:B,group_DD_Navy_RN:N,group_DD_Navy_RM:x,group_DD_Navy_KM:L,AV_Nisshin:118,AV_CommandantTeste:86,AV_Mizuho:77,AO_Kamoi:98,AV_Kamoi:99,group_Navy_USN:[].concat(function(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}(o),l,d,q,B),group_Navy_KM:[].concat(p,c,b,L),group_Navy_RN:[].concat(u,h,N),group_Navy_RM:[].concat(f,D,x),group_Navy_RNLN:[].concat(A),group_Navy_RAN:[].concat(I)}},function(e,s,i){"use strict";var r=Object.assign||function(e){for(var s=1;s<arguments.length;s++){var i=arguments[s];for(var r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r])}return e};e.exports=r({},i(21),i(22),i(23),i(24),i(25),i(26),{"あきつ丸":161,"あきつ丸改":166,"神州丸":621,"神州丸改":626})},function(e,s,i){"use strict";function r(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}var a=i(4),n=i(1),t=n.扶桑改二,o=n.山城改二,u=n.長門改二,p=n.陸奥改二,c=n.金剛改二丙,f=n.比叡改二丙,l=n.榛名改二,h=n["South Dakota"],m=n["South Dakota改"],v=n.Hornet,d=n.Hornet改,b=n.龍鳳改二,y=n["Gambier Bay"],g=n["Gambier Bay改"],_=n["Gambier Bay Mk.II"],C=n.最上改二,D=n.最上改二特,A=n.能代改二,I=n.矢矧改二,q=n.矢矧改二乙,S=n.鹿島,R=n.鹿島改,B=n.曙改,N=n.曙改二,x=n.潮改,L=n.潮改二,k=n.丹陽,w=n.雪風改二,M=n.秋雲改,T=n.秋雲改二,V=n.沖波改二,O=n.高波改二,P=[275,276],j=[u,p],K=[].concat(P,j),F=[209,210,211,212],E=[149,c,150,f,l,152],G=[].concat(F,E),H=[82,88],U=[553,554],z=H.concat(U),Y=[t,o],J=H.concat(Y),Z=[277],W=[594,599],Q=[].concat(Z,W),$=[278],X=[698,610,646],ee=[].concat($,X),se=[380,529,381,536],ie=[526,534,y,g,_,560,b].concat(se),re=[C,D],ae=[216,217],ne=[547,146],te=ae.concat(ne),oe=[A,I,q],ue=[230,B,232,x],pe=[N,L],ce=[207,208,390,391].concat(ue),fe=[195,627].concat(pe),le=ce.concat(fe),he=[234,235,236,237],me=[437,147],ve=he.concat(me),de=[238,239,240,241,703],be=[326,419],ye=de.concat(be),ge=[225,226,227,362,300,228,316,322,317,556,320,557,312,558,313,559,329,354,355,294,M],_e=[566,567,568,k,w],Ce=[].concat(_e,[T]),De=ge.concat(Ce),Ae=[542,563,564,543,O,V,578],Ie=[229],qe=Ae.concat(Ie),Se=[571,576,439,364],Re=[].concat(r(a.Sheffield)),Be=[].concat(Se,[515,393],r(Re),[519,394,520,893]),Ne=[601,1496,440,360,h,m].concat(r(a.Washington)),xe=[y,g,_,549,397,433,438,545,550,v,d],Le=[561,681,596,692,562,689],ke=[].concat(r(Ne),xe,Le),we=[516,395,147],Me=[].concat(we),Te=[k];e.exports={BB_NagatoClassRemodel:P,BB_NagatoClass2ndRemodel:j,BB_NagatoClassRemodelAll:K,BB_KongouClassRemodel:F,BB_KongouClass2ndRemodel:E,BB_KongouClassRemodelAll:G,BB_IseClassRemodel:H,BB_IseClass2ndRemodel:U,BB_IseClassRemodelAll:z,BB_FusouClass2ndRemodel:Y,BB_IseClassRemodel_PLUS_FusouClass2ndRemodel:J,BB_NelsonClassRemodel:[576],CV_AkagiClassRemodel:Z,CV_AkagiClass2ndRemodel:W,CV_AkagiClassRemodelAll:Q,CV_KagaClassRemodel:$,CV_KagaClass2ndRemodel:X,CV_KagaClassRemodelAll:ee,CV_ShoukakuClass2ndRemodel:[461,466,462,467],CVE:ie,CVE_TaiyouClassRemodelAll:se,CAV_MogamiClassSuperRemodel:re,CL_KumaClassRemodel:ae,CL_KumaClass2ndRemodel:ne,CL_KumaClassRemodelAll:te,CL_NagaraClass2ndRemodel:[488,487],CL_AganoClass2ndRemodel:oe,CL_YuubariClass2ndRemodel:[622,623,624],Yahagi:[139,307,I,q],Ooyodo:[183,321],Kashima:[S,R],DD_FubukiClass2ndRemodel:[426,420],DD_AyanamiClassRemodel:ce,DD_AyanamiClass2ndRemodel:fe,DD_AyanamiClassRemodelAll:le,DD_Div7_Remodel:ue,DD_Div7_2ndRemodel:pe,DD_AkatsukiClassRemodel:he,DD_AkatsukiClass2ndRemodel:me,DD_AkatsukiClassRemodelAll:ve,DD_HatsuharuClassRemodel:de,DD_HatsuharuClass2ndRemodel:be,DD_HatsuharuClassRemodelAll:ye,DD_ShiratsuyuClass2ndRemodel:[497,145,498,144,587,469],DD_AsashioClass2ndRemodel:[463,468,199,489,490,198,464,470],DD_KagerouClassRemodel:ge,DD_KagerouClassRemodelB:[557,558],DD_KagerouClass2ndRemodelExcludeAkigumo:_e,DD_KagerouClass2ndRemodel:Ce,DD_KagerouClassRemodelAll:De,DD_YuugumoClass2ndRemodel:Ae,DD_YuugumoClass2ndRemodel_PLUS_ShimakazeRemodel:qe,DD_ShimakazeRemodel:Ie,Kamikaze:[471,476],Harukaze:[473,363],Ushio:[16,233,407],Hibiki:[35,235,147],Ikazuchi:[36,236],Hatsushimo:[41,241,419],Shigure:[43,243,145],Yamakaze:[457,369],Yamagumo:[414,328],Kasumi:[49,253,464,470],Yukikaze:a.Yukikaze,Isokaze:[167,320,557],Hamakaze:[170,312,558],Maikaze:[122,294],Kishinami:[527,686],Asashimo:[425,344,578],Suzutsuki:[532,537],rn:Be,rn_BB:Se,ran:[],usn:ke,usn_BB:Ne,usn_CV:xe,usn_DD:Le,vmf:Me,vmf_DD:we,rocn_DD:Te}},function(e,s,i){"use strict"},function(e,s,i){"use strict";var r=Object.assign||function(e){for(var s=1;s<arguments.length;s++){var i=arguments[s];for(var r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r])}return e},a=i(1),n=a.あきつ丸,t=a.あきつ丸改,o=a.神州丸,u=a.神州丸改;e.exports=r({},i(30),i(31),i(32),i(10),i(7),i(33),{Mizuho:[451,348],Kamoi:[162,499,500],CommandantTeste:[491,372],Akitsumaru:[n,t],Shinsyuumaru:[o,u]})},function(e,s,i){"use strict";e.exports={Battleships:[8,6,20,7,18,33],Carriers:[9,10,11,30,32],AviationCruisers:[36,5],HeavyCruisers:[4,23],LightCruisers:[2,3,21,34,35,28],LightCruisersNoCT:[2,3,34,35,28],TrainingCruisers:[21],Destroyers:[1,19],Submarines:[13,14],SeaplaneTenders:[12,24]}},function(e,s,i){"use strict";var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};e.exports=function(e){return"object"===(void 0===e?"undefined":r(e))&&e.id?e:isNaN(e)?void 0:KC.db.ships[parseInt(e)]}},function(e,s,i){"use strict";var r=i(1),a=r.雪風,n=r.雪風改,t=r.丹陽,o=r.雪風改二,u=r.秋雲,p=r.秋雲改,c=r.秋雲改二,f=r.Grecale,l=r.Grecale改,h=[627];e.exports={Shikinami:[14,208].concat(h),Shikinami2ndRemodelAll:h,Akatsuki:[34,234,437],Yukikaze:[a,n,t,o],Akigumo:[u,p,c],Grecale:[f,l]}},function(e,s,i){"use strict";var r={SmallCaliber:1,SmallCaliberHigh:2,SmallCaliberHA:2,SmallCaliberAA:3,SmallCaliberAAFD:3,MediumCaliber:4,MediumCaliberAA:64,MediumCaliberAAFD:64,LargeCaliber:5,SuperCaliber:6,SecondaryGun:7,SecondaryGunHigh:8,SecondaryGunHA:8,SecondaryGunAA:9,SecondaryGunAAFD:9,Type3Shell:10,APShell:11,Torpedo:12,SubmarineTorpedo:13,MidgetSubmarine:14,ReconSeaplane:15,ReconSeaplaneNight:16,SeaplaneBomber:17,CarrierFighter:18,TorpedoBomber:19,DiveBomber:20,CarrierRecon:21,Autogyro:22,AntiSubPatrol:23,SmallRadar:24,LargeRadar:25,DepthCharge:26,Sonar:27,LargeSonar:28,AAGun:29,AAGunConcentrated:30,AAGunCD:30,CDMG:30,AAFireDirector:31,AAFD:31,AviationPersonnel:36,SurfaceShipPersonnel:37,LandingCraft:38,Searchlight:39,SupplyContainer:41,CommandFacility:45,LargeFlyingBoat:45,SearchlightLarge:46,SuparRadar:47,CombatRation:48,CarrierRecon2:50,SeaplaneFighter:51,AmphibiousCraft:52,LandBasedAttacker:53,Interceptor:54,JetBomberFighter:55,JetBomberFighter2:56,TransportMaterial:57,SubmarineEquipment:58,LandBasedFighter:59,CarrierFighterNight:60,TorpedoBomberNight:61,LandBasedAntiSubPatrol:62,LandBasedRecon:63,LargeLandBasedAircraft:65};r.MainGuns=[r.SmallCaliber,r.SmallCaliberHigh,r.SmallCaliberAA,r.MediumCaliber,r.MediumCaliberAA,r.LargeCaliber,r.SuperCaliber],r.MainCalibers=r.MainGuns,r.SmallCalibers=[r.SmallCaliber,r.SmallCaliberHigh,r.SmallCaliberAA],r.MediumCalibers=[r.MediumCaliber,r.MediumCaliberAA],r.LargeCalibers=[r.LargeCaliber,r.SuperCaliber],r.SecondaryGuns=[r.SecondaryGun,r.SecondaryGunHigh,r.SecondaryGunAA],r.HAMounts=[r.SmallCaliberHigh,r.SmallCaliberAA,r.MediumCaliberAA,r.SecondaryGunHigh,r.SecondaryGunAA],r.HAMountsAAFD=[r.SmallCaliberAA,r.MediumCaliberAA,r.SecondaryGunAA],r.AAShells=[r.Type3Shell],r.APShells=[r.APShell],r.Torpedos=[r.Torpedo,r.SubmarineTorpedo],r.Seaplanes=[r.ReconSeaplane,r.ReconSeaplaneNight,r.SeaplaneBomber,r.SeaplaneFighter],r.Fighters=[r.SeaplaneBomber,r.CarrierFighter,r.CarrierFighterNight,r.TorpedoBomber,r.TorpedoBomberNight,r.DiveBomber,r.SeaplaneFighter,r.LandBasedAttacker,r.LargeLandBasedAircraft,r.Interceptor,r.JetBomberFighter,r.JetBomberFighter2,r.LandBasedFighter],r.Interceptors=[r.Interceptor,r.LandBasedFighter],r.Recons=[r.ReconSeaplane,r.ReconSeaplaneNight,r.CarrierRecon,r.CarrierRecon2,r.LargeFlyingBoat,r.LandBasedRecon],r.SeaplaneRecons=[r.ReconSeaplane,r.ReconSeaplaneNight],r.SeaplaneReconsAll=[r.ReconSeaplane,r.ReconSeaplaneNight,r.LargeFlyingBoat],r.SeaplaneBombers=[r.SeaplaneBomber,r.SeaplaneFighter],r.SeaplaneBombersNoFighters=[r.SeaplaneBomber],r.SeaplaneFighters=[r.SeaplaneFighter],r.CarrierFighters=[r.CarrierFighter,r.CarrierFighterNight],r.CarrierRecons=[r.CarrierRecon,r.CarrierRecon2],r.CarrierBased=[r.CarrierFighter,r.CarrierFighterNight,r.TorpedoBomber,r.TorpedoBomberNight,r.DiveBomber,r.CarrierRecon,r.CarrierRecon2,r.JetBomberFighter,r.JetBomberFighter2],r.LandBased=[r.LandBasedAttacker,r.LargeLandBasedAircraft,r.Interceptor,r.JetBomberFighter,r.JetBomberFighter2,r.LandBasedFighter,r.LandBasedAntiSubPatrol,r.LandBasedRecon],r.LandBasedBombers=[r.LandBasedAttacker,r.LandBasedAntiSubPatrol,r.LargeLandBasedAircraft],r.LandBasedLarge=[r.LargeLandBasedAircraft],r.TorpedoBombers=[r.TorpedoBomber,r.TorpedoBomberNight],r.DiveBombers=[r.DiveBomber],r.JetBomberFighters=[r.JetBomberFighter,r.JetBomberFighter2],r.Jets=[r.JetBomberFighter,r.JetBomberFighter2],r.Autogyros=[r.Autogyro],r.AntiSubPatrols=[r.AntiSubPatrol,r.LandBasedAntiSubPatrol],r.Aircrafts=[],[].concat(r.Seaplanes).concat(r.Recons).concat(r.CarrierBased).concat(r.Autogyros).concat(r.AntiSubPatrols).concat(r.LandBased).forEach(function(e){r.Aircrafts.indexOf(e)<0&&r.Aircrafts.push(e)}),r.Radars=[r.SmallRadar,r.LargeRadar,r.SuparRadar],r.SmallRadars=[r.SmallRadar],r.LargeRadars=[r.LargeRadar,r.SuparRadar],r.AntiSubmarines=[r.DepthCharge,r.Sonar,r.LargeSonar],r.DepthCharges=[r.DepthCharge],r.Sonars=[r.Sonar,r.LargeSonar],r.AAGuns=[r.AAGun,r.AAGunConcentrated],r.AAFireDirectors=[r.AAFireDirector],r.AAFDs=r.AAFireDirectors,r.Searchlights=[r.Searchlight,r.SearchlightLarge],r.AviationPersonnels=[r.AviationPersonnel],r.SurfaceShipPersonnels=[r.SurfaceShipPersonnel],r.LandingCrafts=[r.LandingCraft,r.AmphibiousCraft],r.AmphibiousCrafts=[r.AmphibiousCraft],r.SupplyContainers=[r.SupplyContainer],r.CombatRations=[r.CombatRation],e.exports=r},function(e,s,i){"use strict";e.exports=i(18)},function(e,s,i){"use strict";var r=i(1),a=r.夕張,n=r.夕張改,t=r.夕張改二,o=r.夕張改二特,u=r.夕張改二丁,p=r.Sheffield,c=r.Sheffield改,f=r.香取,l=r.香取改,h=r.鹿島,m=r.鹿島改;e.exports={Jintsu:[55,223,159],Yuubari:[a,n,t,o,u],Sheffield:[p,c],Katori:[f,l],Kashima:[h,m]}},function(e,s,i){"use strict";e.exports={"ReconSeaplanes_零式水上観測機":[59],"ReconSeaplanes_零式水上偵察機11型乙":[238,239],SeaplaneBombers_IJN_Low:[26,207,79,80,81,62,208],SeaplaneBombers_IJN_High:[237,322,323]}},function(e,s,i){"use strict";var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};e.exports=function(e){return e&&"object"===(void 0===e?"undefined":r(e))&&e.id?e:isNaN(e)?void 0:(KC.db.equipments||KC.db.items||{})[parseInt(e)]}},function(e,s,i){"use strict";var r=i(6),a=i(14),n=a.ArrayOrItem,t=a.ArrayOrItemAll;e.exports=function(e){var s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(void 0===(e=r(e)))return!1;for(var i in s)if(void 0!==s[i]&&!o[i.toLowerCase()](e,s[i]))return!1;return!0};var o={isid:function(e,s){return n(s,function(s){return!isNaN(s)&&parseInt(s)===e.id})},isnotid:function(e,s){return t(s,function(s){return!isNaN(s)&&parseInt(s)!==e.id})},isname:function(e,s){return n(s,function(s){return e.isName(s)})},isnotname:function(e,s){return t(s,function(s){return!e.isName(s)})},istype:function(e,s){return n(s,function(s){return!isNaN(s)&&parseInt(s)===e.type})},isnottype:function(e,s){return t(s,function(s){return!isNaN(s)&&parseInt(s)!==e.type})},isbattleship:function(e,s){return this.istype(e,[8,6,20,7,18])===s},isbb:function(e,s){return this.isbattleship(e,s)},iscarrier:function(e,s){return this.istype(e,[11,10,9,30,32])===s},iscv:function(e,s){return this.iscarrier(e,s)},issubmarine:function(e,s){return this.istype(e,[14,13])===s},isss:function(e,s){return this.issubmarine(e,s)},isclass:function(e,s){return n(s,function(s){return!isNaN(s)&&parseInt(s)===e.class})},isnotclass:function(e,s){return t(s,function(s){return!isNaN(s)&&parseInt(s)!==e.class})},hasslot:function(e,s){return!!Array.isArray(e.slot)&&(Array.isArray(s)?isNaN(s[0])&&!isNaN(s[1])?e.slot.length<=parseInt(s[1]):!isNaN(s[0])&&isNaN(s[1])?e.slot.length>=parseInt(s[0]):!isNaN(s[0])&&!isNaN(s[1])&&(e.slot.length>=parseInt(s[0])&&e.slot.length<=parseInt(s[1])):!isNaN(s)&&parseInt(s)===e.slot.length)},hasslotmin:function(e,s){return this.hasslot(e,[s,void 0])},hasslotmax:function(e,s){return this.hasslot(e,[void 0,s])},minlevel:function(e,s){return void 0===e.level||e.level>=s},canequip:function(e,s){return e.canEquip(s)}}},function(e,s,i){"use strict";var r=i(186),a=i(187);e.exports={ArrayOrItem:r,ArrayOrItemAll:a}},function(e,s,i){"use strict";var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},a=i(12),n=i(8),t=i(14),o=t.ArrayOrItem,u=t.ArrayOrItemAll,p={is:function(e){var s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=(arguments.length>2&&void 0!==arguments[2]&&arguments[2],arguments.length>3&&void 0!==arguments[3]?arguments[3]:{});return(!i.id||e.id===i.id)&&!(i.star&&s<i.star)},isid:function(e,s){return o(s,function(s){return!isNaN(s)&&parseInt(s)===e.id})},isnotid:function(e,s){return u(s,function(s){return!isNaN(s)&&parseInt(s)!==e.id})},isname:function(e,s){return o(s,function(s){return e.isName(s)})},isnotname:function(e,s){return u(s,function(s){return!e.isName(s)})},isnameof:function(e,s){return o(s,function(s){return e.hasName(s)})},isnotnameof:function(e,s){return u(s,function(s){return!e.hasName(s)})},istype:function(e,s,i){return o(s,function(s){if(isNaN(s))return!1;if(parseInt(s)!==e.type)return!1;if("object"===(void 0===i?"undefined":r(i))&&i.hasStat){var a=!0;for(var n in i.hasStat)Array.isArray(i.hasStat[n])?(e.stat[n]<i.hasStat[n][0]&&(a=!1),e.stat[n]>i.hasStat[n][1]&&(a=!1)):e.stat[n]<i.hasStat[n]&&(a=!1);if(!a)return!1}return!0})},isnottype:function(e,s){return u(s,function(s){return!isNaN(s)&&parseInt(s)!==e.type})},isaaradar:function(e,s){return(this.istype(e,n.Radars)&&!isNaN(e.stat.aa)&&e.stat.aa>=1)===s},issurfaceradar:function(e,s){return(this.istype(e,n.Radars)&&!isNaN(e.stat.hit)&&e.stat.hit>=3)===s}};e.exports=function e(s){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};if("object"===(void 0===i?"undefined":r(i)))return e(s,0,0,i);if("object"===(void 0===t?"undefined":r(t)))return e(s,i,0,t);if(void 0===(s=a(s)))return!1;for(var u in o)if(void 0!==o[u]){var c=u.toLowerCase();if(["improve","improvement","star"].includes(c))return(parseInt(i||0)||0)>=parseInt(o[u]);if("is"===c){if(!p[c](s,i,t,o[u]))return!1}else if("isoneof"===c&&Array.isArray(o[u])){if(!o[u].some(function(r){return e(s,i,t,r)}))return!1}else if(p[c]){if(!p[c](s,o[u]))return!1}else if("is"===u.substr(0,2)){var f=u.substr(2);if("HAMountAAFD"===f)f="HAMountsAAFD";else if(f+"s"in n)f+="s";else if(!(f in n))return!1;var l="object"===r(o[u])&&!Array.isArray(o[u]),h=o[u]&&l?o[u]:void 0;if(!p[!0===o[u]||l?"istype":"isnottype"](s,n[f],h))return!1}}return!0}},function(e,s,i){"use strict";e.exports=function(e){var s=[];return e.forEach(function(e,i){s[i>=4?i+1:i]=e}),s[4]=0,s}},function(e,s,i){"use strict";var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},a=function(){function e(e,s){for(var i=0;i<s.length;i++){var r=s[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(s,i,r){return i&&e(s.prototype,i),r&&e(s,r),s}}();function n(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}function t(e,s){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!s||"object"!=typeof s&&"function"!=typeof s?e:s}function o(e,s){if("function"!=typeof s&&null!==s)throw new TypeError("Super expression must either be null or a function, not "+typeof s);e.prototype=Object.create(s&&s.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),s&&(Object.setPrototypeOf?Object.setPrototypeOf(e,s):e.__proto__=s)}function u(e,s){if(!(e instanceof s))throw new TypeError("Cannot call a class as a function")}window.KC=function(){var e=i(9),s=i(184),p=i(13),c=i(15),f=i(6),l=i(189),h=i(190),m=i(8),v=i(191),d={lang:"zh_cn",joint:"・",maxShipLv:175,maxHqLv:120,db:{},path:{db:"/kcdb/",pics:{ships:"/kcpic/ships/"}},statSpeed:{5:"低速",10:"高速",15:"高速+",20:"最速"},getStatSpeed:function(e){return this.statSpeed[parseInt(e)]},statRange:{1:"短",2:"中",3:"长",4:"超长"},getStatRange:function(e){return this.statRange[parseInt(e)]},getFolderGroup:function(e,s){if("undefined"!=typeof node&&node&&node.path){e="/"==e.substr(e.length-1)?e.substr(0,e-1):e,s=parseInt(s);for(var i=1;50*i<s;)i++;return e+"-"+i+"/"}return e},textRank:{1:"|",2:"||",3:"|||",4:"\\",5:"\\\\",6:"\\\\\\",7:"》"},check:{ship:p,equipment:c},planesPerSlotLBAS:{recon:4,attacker:18,large:9}},b=function(){function e(s){for(var i in u(this,e),s)this[i]=s[i]}return a(e,[{key:"getName",value:function(e){return e=e||d.lang,this.name?this.name[e]||this.name:null}},{key:"isName",value:function(e,s){if(!0===s&&(s=d.lang),s)return this.name[s]===e;for(var i in this.name)if("suffix"!==i&&this.name[i]===e)return!0;return!1}},{key:"hasName",value:function(e,s){if(!0===s&&(s=d.lang),s)return!!this.name[s].includes(e);for(var i in this.name)if("suffix"!==i&&this.name[i].includes(e))return!0;return!1}},{key:"isNameOf",value:function(){return this.hasName.apply(this,arguments)}},{key:"_name",get:function(){return this.getName()}}]),e}(),y=function(e){function s(e){return u(this,s),t(this,(s.__proto__||Object.getPrototypeOf(s)).call(this,e))}return o(s,e),s}(b),g=function(s){function i(e){u(this,i);var s=t(this,(i.__proto__||Object.getPrototypeOf(i)).call(this,e));return Object.defineProperty(s,"rankupgradable",{value:s.isRankUpgradable()}),s}return o(i,s),a(i,[{key:"getName",value:function(e,s){s=s||d.lang;var i=b.prototype.getName.call(this,s),r=e&&1==!e?e:"small";return e?i.replace(/（([^（^）]+)）/g,"<"+r+">($1)</"+r+">"):i}},{key:"getType",value:function(e){return e=e||d.lang,this.type?d.db.item_types[this.type].name[e]:null}},{key:"getIconId",value:function(){return Array.isArray(this.type_ingame)&&this.type_ingame.length>3?this.type_ingame[3]:d.db.item_types[this.type].icon}},{key:"getCaliber",value:function(){var e=this.getName(!1,"ja_jp"),s=parseFloat(e);return s}},{key:"getPower",value:function(){return this.stat[d.db.item_types[this.type].main_attribute||"fire"]}},{key:"isEquipableExSlot",value:function(){return this.equipable_exslot?this.equipable_exslot||!1:this.type&&d.db.item_types[this.type].equipable_exslot||!1}},{key:"isRankUpgradable",value:function(){return q.equipmentType.Aircrafts.includes(this.type)&&this.type!==q.equipmentType.Autogyro&&this.type!==q.equipmentType.AntiSubPatrol}},{key:"getStat",value:function(e,s){e=e.toLowerCase();var i=this.stat[e];if(!s||void 0===i||!Array.isArray(this.stat_bonus))return i;if(s&&Array.isArray(this.stat_bonus)){"object"!==(void 0===s?"undefined":r(s))&&(s=d.db.ships[s]);var a=s.id,n=void 0;if(this.stat_bonus.forEach(function(e){Array.isArray(e.ships)&&e.ships.some(function(s){if(s==a){for(var i in e.bonus)n||(n={}),n[i]=Math.max(e.bonus[i],n[i]||0);return!0}return!1}),Array.isArray(e.ship_classes)&&e.ship_classes.some(function(i){if(i==s.class){for(var r in e.bonus)n||(n={}),n[r]=Math.max(e.bonus[r],n[r]||0);return!0}return!1})}),n)return i+(n[e]||0)}return i}},{key:"getBonuses",value:function(){var s=this;return e.filter(function(e){if(e.equipment==s.id)return!0;if(void 0!==e.equipments&&"object"===r(e.ship)&&!e.passEquippableCheck){if(Array.isArray(e.ship.isID)&&!e.ship.isID.every(function(e){return f(e).canEquip(s,!0)}))return!1;if("number"==typeof e.ship.isID&&!f(e.ship.isID).canEquip(s,!0))return!1;if(Array.isArray(e.ship.isType)&&!e.ship.isType.every(function(e){return h(e).equipable.includes(s.type)}))return!1;if("number"==typeof e.ship.isType&&!h(e.ship.isType).equipable.includes(s.type))return!1;if(Array.isArray(e.ship.isClass)&&!e.ship.isClass.every(function(e){return h(l(e).ship_type_id).equipable.includes(s.type)}))return!1;if("number"==typeof e.ship.isClass&&!h(l(e.ship.isClass).ship_type_id).equipable.includes(s.type))return!1}return Array.isArray(e.equipments)?e.equipments.some(function(e){return c(s,10,7,e)}):"object"===r(e.equipments)&&Object.keys(e.equipments).filter(function(e){return/^has/.test(e)}).some(function(i){return c(s,function(e,s,i){return s in e?Object.defineProperty(e,s,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[s]=i,e}({},i.replace(/^has/,"is"),e.equipments[i]))})})}},{key:"_icon",get:function(){return"/!/assets/images/itemicon/"+this.getIconId()+".png"}}]),i}(b),_=function(s){function i(e){return u(this,i),t(this,(i.__proto__||Object.getPrototypeOf(i)).call(this,e))}return o(i,s),a(i,[{key:"getName",value:function(e,s){e=e||"",s=s||d.lang;var i=this.getSuffix(s);return(this.name[s]||this.name.ja_jp)+(i?(!0===e?d.joint:e)+i:"")}},{key:"getNameNoSuffix",value:function(e){return e=e||d.lang,this.name[e]||this.name.ja_jp}},{key:"getSuffix",value:function(e){return e=e||d.lang,this.name.suffix&&(d.db.ship_namesuffix[this.name.suffix][e]||d.db.ship_namesuffix[this.name.suffix].ja_jp)||""}},{key:"getType",value:function(e){return e=e||d.lang,this.type?d.db.ship_types[this.type].name[e]||d.db.ship_types[this.type].name.ja_jp||"":null}},{key:"getSubType",value:function(){if("string"==typeof this.__SUBTYPE)return this.__SUBTYPE;if(this.isType("carrier")){var e=this.canEquip(33);"object"===r(this.capabilities)&&this.capabilities.count_as_night_operation_aviation_personnel?this.__SUBTYPE="NightCarrier":!e&&"number"==typeof this.stat.asw&&this.stat.asw>0?this.__SUBTYPE="ModernizedCarrier":e&&"number"==typeof this.stat.asw&&this.stat.asw>0?this.__SUBTYPE="EscortCarrier":"object"===r(this.capabilities)&&this.capabilities.attack_surface_ship_prioritised&&(this.__SUBTYPE="AssultCarrier")}else this.isType("aviationcruiser")?this.canEquip(14)&&(this.__SUBTYPE="SpecialRevisedAviationCruiser"):this.isType("lightcruiser")&&this.canEquip(14)&&(this.__SUBTYPE="HeavyRevisedLightCruiser");return this.__SUBTYPE}},{key:"getSeriesData",value:function(){return this.series?d.db.ship_series[this.series].ships:[{id:this.id}]}},{key:"getPic",value:function(e,s){e=parseInt(e||0);for(var i=this.getSeriesData(),r=this.illust_version?"?version="+this.illust_version:"",a=function(e,i){return"undefined"!=typeof node&&node&&node.path&&d.path.pics.ships?node.path.join(d.getFolderGroup(d.path.pics.ships,e),e+"/"+i+"."+(s||"webp")):d.path.pics.ships?d.path.pics.ships+e+"/"+i+"."+(s||"png")+r:"/"+e+"/"+i+"."+(s||"png")+r},n=0;n<i.length;n++)if(i[n].id==this.id)switch(e){case 0:case 1:case 2:case 3:case 12:case 13:case 14:return a(this.id,e);default:return i[n].illust_delete?a(i[n-1].id,e):a(this.id,e)}}},{key:"getSpeed",value:function(){return d.statSpeed[parseInt(this.stat.speed)]}},{key:"getSpeedRule",value:function(){return this.speed_rule?this.speed_rule:this.class?d.db.ship_classes[this.class].speed_rule:null}},{key:"getRange",value:function(){return d.statRange[parseInt(this.stat.range)]}},{key:"getEquipmentTypes",value:function(e){var s=this.additional_disable_item_types||[],i=d.db.ship_classes[this.class]||{},r=d.db.ship_types[this.type],a=[].concat(n(r.equipable||[]),n(i.additional_item_types||[]),n(this.additional_item_types||[])),t="number"==typeof e&&4!==e?e>4?e-1:e:void 0;if(Array.isArray(i.additional_item_types_by_slot)||Array.isArray(r.additional_item_types_by_slot)){var o=[].concat(n(i.additional_item_types_by_slot||[]),n(r.additional_item_types_by_slot||[]));"number"==typeof t?Array.isArray(o[t])&&o[t].forEach(function(e){return a.push(e)}):!0===e&&o.forEach(function(e){e.forEach(function(e){return a.push(e)})})}if("number"==typeof t&&(Array.isArray(i.equipable_exclude_by_slot)||Array.isArray(r.equipable_exclude_by_slot))){var u=[].concat(n(i.equipable_exclude_by_slot||[]),n(r.equipable_exclude_by_slot||[]));Array.isArray(u[t])&&u[t].forEach(function(e){var s=a.indexOf(e);s>=0&&a.splice(s,1)})}return a.filter(function(e){return s.indexOf(e)<0}).sort(function(e,s){return e-s})}},{key:"getAttribute",value:function(e,s){(s=s||1)>i.lvlMax&&(s=i.lvlMax);var r=void 0;switch(e){case"hp":return r=this.stat.hp,s>99&&(r=this.stat.hp>=90?this.stat.hp+9:this.stat.hp>=70?this.stat.hp+8:this.stat.hp>=50?this.stat.hp+7:this.stat.hp>=40?this.stat.hp+6:this.stat.hp>=30?this.stat.hp+5:this.stat.hp+4)>this.stat.hp_max&&(r=this.stat.hp_max),r;case"speed":return d.getStatSpeed(this.stat.speed);case"range":return d.getStatRange(this.stat.range);case"luck":return s>99?this.stat.luck+3:this.stat.luck;case"fuel":case"ammo":return s>99?Math.floor(.85*this.consum[e]):this.consum[e];case"aa":case"armor":case"fire":case"torpedo":return this.stat[e+"_max"]||this.stat[e];default:return function(e,s,i){return e=e||1,s=parseFloat(s),i=parseFloat(i)||s,s<0||i<0?-1:s==i?i:Math.floor(s+(i-s)*e/99)}(s,this.stat[e],this.stat[e+"_max"])}}},{key:"getRel",value:function(e){if(e){if(!this.rels[e]&&this.remodel&&this.remodel.prev)for(var s=d.db.ships[this.remodel.prev];s;){if(s.rels&&s.rels[e])return s.rels[e];s=s.remodel&&s.remodel.prev?d.db.ships[s.remodel.prev]:null}return this.rels[e]}return this.rels}},{key:"getCV",value:function(e){var s=this.getRel("cv");if(s)return d.db.entities[s].getName(e||d.lang)}},{key:"getIllustrator",value:function(e){var s=this.getRel("illustrator");if(s)return d.db.entities[s].getName(e||d.lang)}},{key:"getMinLv",value:function(){var e=this,s=this._series,i=void 0;return s.some(function(r,a){return e.id==r.id&&(i=a?s[a-1].next_lvl:1),i}),i}},{key:"isType",value:function(e){switch(e.toLowerCase()){case"battleship":case"battleships":case"bb":return v.Battleships.includes(this.type);case"carrier":case"carriers":case"cv":return v.Carriers.includes(this.type);case"aviationcruiser":case"aviationcruisers":case"cav":return v.AviationCruisers.includes(this.type);case"heavycruiser":case"heavycruisers":case"ca":return v.HeavyCruisers.includes(this.type);case"lightcruiser":case"lightcruisers":case"cl":return v.LightCruisers.includes(this.type);case"submarine":case"submarines":case"ss":return v.Submarines.includes(this.type);case"seaplanetender":case"seaplanetenders":case"seaplane tender":case"seaplane tenders":case"av":return v.SeaplaneTenders.includes(this.type);case"destroyer":case"destroyers":case"dd":return v.Destroyers.includes(this.type);default:return!1}}},{key:"getNavy",value:function(){return this.navy?this.navy:this.class&&d.db.ship_classes[this.class].navy||"ijn"}},{key:"getCapability",value:function(e){return e?this.capabilities?this.capabilities[e]:void 0:this.capabilities||{}}},{key:"getStatExtraMax",value:function(e){var s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;switch(e.toLowerCase()){case"hp":var i=this.getAttribute(e,s),r=this.stat.hp_max;return Math.max(0,Math.min(2,r-i));case"asw":return this.stat.asw?9:!!q.shipType.LightCruisers.concat(q.shipType.Destroyers).includes(this.type)&&9;default:return!1}}},{key:"canEquip",value:function(e,s){var i=this;if(Array.isArray(e))return e.every(function(e){return i.canEquip(e,s)});if("string"==typeof e){if(Array.isArray(m[e]))return m[e].some(function(e){return i.canEquip(e,s)});if("number"==typeof m[e])return this.canEquip(m[e],s);if(Array.isArray(m[e+"s"]))return m[e+"s"].some(function(e){return i.canEquip(e,s)})}return"object"===(void 0===e?"undefined":r(e))&&void 0!==e.type&&(e=e.type),!isNaN(e)&&this.getEquipmentTypes(s).includes(parseInt(e))}},{key:"canEquipThis",value:function(e,s){var i=this;if(Array.isArray(e))return e.every(function(e){return i.canEquipThis(e,s)});if("string"==typeof e){if(isNaN(e))return!1;e=parseInt(e)}var a=void 0;if("number"==typeof e&&(a=d.db.item_types[e].type),"object"===(void 0===e?"undefined":r(e))){if(!e.id)return!1;a=e.type,e=e.id}return!(!Array.isArray(this.additional_items)||!this.additional_items.includes(e))||this.canEquip(a,s)}},{key:"getBonuses",value:function(){var s=this;return e.filter(function(e){return p(s,e.ship)})}},{key:"_type",get:function(){return this.getType()}},{key:"_subType",get:function(){return this.getSubType()}},{key:"_series",get:function(){return this.getSeriesData()}},{key:"_pics",get:function(){for(var e=[],s=0;s<15;s++)e.push(this.getPic(s));return e}},{key:"_speed",get:function(){return this.getSpeed()}},{key:"_speedRule",get:function(){return this.getSpeedRule()}},{key:"_range",get:function(){return this.getRange()}},{key:"_cv",get:function(){return this.getCV()}},{key:"_illustrator",get:function(){return this.getIllustrator()}},{key:"_minLv",get:function(){return this.getMinLv()}},{key:"_navy",get:function(){return this.getNavy()}}]),i}(b);_.lvlMax=d.maxShipLv;var C=function(e){function s(e){return u(this,s),t(this,(s.__proto__||Object.getPrototypeOf(s)).call(this,e))}return o(s,e),s}(b);d.dbLoad=function(e){return"string"==typeof e?d.dbLoad({type:e}):e.type||e.url?$.ajax({url:e.url||d.path.db+"/"+e.type+".json",dataType:"text",success:function(s){var i=[];e.beforeProcess&&(i=e.beforeProcess(s)),void 0===d.db[e.type]&&(d.db[e.type]={}),i.forEach(function(s){if(s){var i=JSON.parse(s);switch(e.type){case"ships":d.db[e.type][i.id]=new _(i);break;case"items":d.db[e.type][i.id]=new g(i);break;case"entities":d.db[e.type][i.id]=new y(i);break;default:d.db[e.type][i.id]=i}}}),e.success&&e.success(s)},complete:function(s,i){e.complete&&e.complete(s,i)}}):null};var D=function(e){return e instanceof _?e:d.db.ships?d.db.ships[e]:{}},A=function(e){return e instanceof g?e:d.db.equipments?d.db.equipments[e]:d.db.items[e]},I=i(16),q={equipmentType:m,shipType:{Carriers:[9,10,11,30,32],LightCruisers:[2,3,21,34,28],Destroyers:[1,19],Submarines:[13,14]},calcByShip:{},calcByFleet:{},calcByField:{},calc:{}},S=q.equipmentType;return S.isInterceptor=function(e){return(!(e=A(e)).type_ingame||47!=e.type_ingame[2])&&S.Interceptors.indexOf(e.type)>-1},q.starMultiper={SmallCalibers:{shelling:1,night:1},MediumCalibers:{shelling:1,night:1},LargeCalibers:{shelling:1.5,night:1},SecondaryGuns:{shelling:1,night:1,hit:1},APShells:{shelling:1,night:1},AAShells:{shelling:1,night:1},AAFireDirectors:{shelling:1,night:1},Searchlights:{shelling:1,night:1},AAGuns:{shelling:1,torpedo:1.2},Torpedos:{torpedo:1.2,night:1},MidgetSubmarine:{night:1},DepthCharges:{shelling:.75,antisub:1},Sonars:{shelling:.75,antisub:1},SmallRadars:{los:1.25},LargeRadars:{los:1.4},Seaplanes:{},SeaplaneRecons:{los:1.2},SeaplaneFighters:{fighter:.2},SeaplaneBomber:{los:1.15},CarrierFighters:{fighter:.2},DiveBombers:{fighter:.25,night:1},CarrierRecons:{los:1.2},LandingCrafts:{shelling:1,night:1},Interceptors:{fighter:["multiplication",.2]},LandBasedBombers:{fighter:.5},_10:{shelling:["multiplication",.2],night:1},_66:{shelling:["multiplication",.2],night:1},_220:{shelling:["multiplication",.2],night:1},_275:{shelling:["multiplication",.2],night:1},_12:{shelling:["multiplication",.3],night:["multiplication",.3]},_234:{shelling:["multiplication",.3],night:["multiplication",.3]}},q.getStarMultiplier=function(e,s){if(!q.starMultiper._init){var i=function(e){S[e]&&S[e].forEach?S[e].forEach(function(s){q.starMultiper[s]=q.starMultiper[e]}):"number"==typeof S[e]&&(q.starMultiper[S[e]]=q.starMultiper[e])};for(var r in q.starMultiper)i(r);q.starMultiper._init=!0}var a=q.starMultiper[e]||{};return s?a[s]||0:a},q.getStarBonus=function(e,s,i){e=A(e);var r=Object.assign({},q.getStarMultiplier(e.type),q.starMultiper["_"+e.id])[s],a=void 0===r?0:r,n="sqrt";switch(Array.isArray(a)&&(n=a[0],a=a[1]),n){case"sqrt":return a*Math.sqrt(i);case"multiplication":case"multiple":return a*i;default:return 0}},q.getFighterPowerRankMultiper=function(e,s){e=A(e);var i=[],r={};i[0]=[0,9],i[1]=[10,24],i[2]=[25,39],i[3]=[40,54],i[4]=[55,69],i[5]=[70,84],i[6]=[85,99],i[7]=[100,120],r.CarrierFighter=[0,0,2,5,9,14,14,22],r.SeaplaneBomber=[0,0,1,1,1,3,3,6];var a=i[s],n=0;switch(e.type){case S.CarrierFighter:case S.CarrierFighterNight:case S.Interceptor:case S.SeaplaneFighter:case S.LandBasedFighter:n=r.CarrierFighter[s];break;case S.SeaplaneBomber:n=r.SeaplaneBomber[s]}return{min:Math.sqrt(a[0]/10)+n,max:Math.sqrt(a[1]/10)+n}},q.calculate=function(e,i,r,a,n,t){if(!e||!i)return 0;i instanceof _||(i=d.db.ships[i]);var o=0,u={main:0,secondary:0,torpedo:0,torpedoLateModel:0,seaplane:0,apshell:0,radar:0,radarAA:0,radarSurface:0,submarineEquipment:0,carrierFighterNight:0,torpedoBomberNight:0,aviationPersonnelNight:0,surfaceShipPersonnel:0,supplyContainer:0},p=I(i.slot),c=0;r=r.map(function(e){return e?e instanceof g?e:d.db.equipments?d.db.equipments[e]:d.db.items[e]:null})||[],a=a||[],n=n||[],t=t||{},r.forEach(function(e){e&&(S.MainGuns.indexOf(e.type)>-1?u.main+=1:S.SecondaryGuns.indexOf(e.type)>-1?u.secondary+=1:S.Torpedos.indexOf(e.type)>-1?(u.torpedo+=1,e.name.ja_jp.indexOf("後期型")>-1&&(u.torpedoLateModel+=1)):S.Seaplanes.indexOf(e.type)>-1?u.seaplane+=1:S.APShells.indexOf(e.type)>-1?u.apshell+=1:S.Radars.indexOf(e.type)>-1?(u.radar+=1,e.stat.aa&&(u.radarAA+=1),e.stat.hit&&e.stat.hit>=3&&(u.radarSurface+=1)):S.SubmarineEquipment==e.type?u.submarineEquipment+=1:S.AviationPersonnels.indexOf(e.type)>-1?e.name.ja_jp.indexOf("夜間")>-1&&(u.aviationPersonnelNight+=1):S.SurfaceShipPersonnels.indexOf(e.type)>-1?u.surfaceShipPersonnel+=1:S.SupplyContainers.indexOf(e.type)>-1&&(u.supplyContainer+=1),e.type_ingame&&(45===e.type_ingame[3]?u.carrierFighterNight+=1:46===e.type_ingame[3]&&(u.torpedoBomberNight+=1)))});var f=s(i,r,a,n);switch(e){case"fighterPower":return c=0,p.map(function(e,s){if(r[s]&&S.Fighters.indexOf(r[s].type)>-1&&e){if(c=Math.sqrt(e)*(r[s].getStat("aa",i)||0),S.CarrierFighters.includes(r[s].type))switch(n[s]){case 1:case"1":c+=1;break;case 2:case"2":c+=4;break;case 3:case"3":c+=6;break;case 4:case"4":c+=11;break;case 5:case"5":c+=16;break;case 6:case"6":c+=17;break;case 7:case"7":c+=25}else if(-1==S.Recons.indexOf(r[s].type)){var a=r[s].type==S.SeaplaneBomber?9:3;c+=1==n[s]?1:a/6*(n[s]-1)}o+=Math.floor(c)}}),o;case"fighterPower_v2":return q.calcByShip.fighterPower_v2(i,r,a,n);case"shelling":case"shellingDamage":return q.shipType.Submarines.indexOf(i.type)>-1?"-":(o=q.calcByShip.shellingPower(i,r,a,n,{},f))&&o>-1?Math.floor(o):"-";case"torpedo":case"torpedoDamage":return(o=function(e){return q.calcByShip.torpedoPower(i,r,a,n,e,f)}())&&o>-1?Math.floor(o):"-";case"nightBattle":var l=q.calcByShip.nightPower(i,r,a,n,{},u,f);return l.damage<=0?"-":l.value;case"addHit":return p.map(function(e,s){r[s]&&(o+=r[s].getStat("hit",i)||0)}),(o+=f.hit||0)>=0?"+"+o:o;case"addArmor":return p.map(function(e,s){r[s]&&(o+=r[s].getStat("armor",i)||0)}),o+(f.armor||0);case"addEvasion":return p.map(function(e,s){r[s]&&(o+=r[s].getStat("evasion",i)||0)}),o+(f.evasion||0);case"losPower":return q.calcByShip.losPower(i,r,a,n,t);default:return q.calcByShip[e](i,r,a,n,t,f)}},q.shellingDamage=function(e,s,i,r){return this.calculate("shellingDamage",e,s,i,r)},q.torpedoDamage=function(e,s,i,r){return this.calculate("torpedoDamage",e,s,i,r)},q.fighterPower=function(e,s,i,r){return this.calculate("fighterPower",e,s,i,r)},q.fighterPower_v2=function(e,s,i,r){return this.calculate("fighterPower_v2",e,s,i,r)},q.nightBattle=function(e,s,i,r){return this.calculate("nightBattle",e,s,i,r)},q.addHit=function(e,s,i,r){return this.calculate("addHit",e,s,i,r)},q.addArmor=function(e,s,i,r){return this.calculate("addArmor",e,s,i,r)},q.addEvasion=function(e,s,i,r){return this.calculate("addEvasion",e,s,i,r)},q.losPower=function(e,s,i,r,a){return this.calculate("losPower",e,s,i,r,a)},q.calc.losPower=function(e){var s=["(Intercept)","DiveBombers","TorpedoBombers","CarrierRecons","SeaplaneRecons","SeaplaneBombers","SmallRadars","LargeRadars","Searchlights","statLos","hqLv"],i={"(Intercept)":0,DiveBombers:1.03745043134563,TorpedoBombers:1.3679056374142,CarrierRecons:1.65940512636315,SeaplaneRecons:2,SeaplaneBombers:1.77886368594467,SmallRadars:1.0045778494921,LargeRadars:.990738063979571,Searchlights:.906965144360512,statLos:1.6841895400986,hqLv:-.614246711531445},r={"(Intercept)":4.66445565766347,DiveBombers:.0965028505325845,TorpedoBombers:.108636184978525,CarrierRecons:.0976055279516298,SeaplaneRecons:.0866229392463539,SeaplaneBombers:.0917722496848294,SmallRadars:.0492773648320346,LargeRadars:.0491221486053861,Searchlights:.0658283797225724,statLos:.0781594211213618,hqLv:.0369222352426548},a={"(Intercept)":{"(Intercept)":1,DiveBombers:-.147020064768061,TorpedoBombers:-.379236131621529,CarrierRecons:-.572858669501918,SeaplaneRecons:-.733913857017495,SeaplaneBombers:-.642621825152428,SmallRadars:-.674829588068364,LargeRadars:-.707418111752863,Searchlights:-.502304601556193,statLos:-.737374218573832,hqLv:-.05071933950163},DiveBombers:{"(Intercept)":-.147020064768061,DiveBombers:1,TorpedoBombers:.288506347076736,CarrierRecons:.365820372770994,SeaplaneRecons:.425744409856409,SeaplaneBombers:.417783698791503,SmallRadars:.409046013184429,LargeRadars:.413855653833994,Searchlights:.308730607324667,statLos:.317984916914851,hqLv:-.386740224500626},TorpedoBombers:{"(Intercept)":-.379236131621529,DiveBombers:.288506347076736,TorpedoBombers:1,CarrierRecons:.482215071254241,SeaplaneRecons:.584455876852325,SeaplaneBombers:.558515133495825,SmallRadars:.547260012897553,LargeRadars:.560437619378443,Searchlights:.437934879351188,statLos:.533934507932748,hqLv:-.405349979885748},CarrierRecons:{"(Intercept)":-.572858669501918,DiveBombers:.365820372770994,TorpedoBombers:.482215071254241,CarrierRecons:1,SeaplaneRecons:.804494553748065,SeaplaneBombers:.75671307047535,SmallRadars:.748420581669228,LargeRadars:.767980338133817,Searchlights:.589651513349878,statLos:.743851348255527,hqLv:-.503544281376776},SeaplaneRecons:{"(Intercept)":-.733913857017495,DiveBombers:.425744409856409,TorpedoBombers:.584455876852325,CarrierRecons:.804494553748065,SeaplaneRecons:1,SeaplaneBombers:.932444440578382,SmallRadars:.923988080549326,LargeRadars:.94904944359066,Searchlights:.727912987329348,statLos:.944434077970518,hqLv:-.614921413821462},SeaplaneBombers:{"(Intercept)":-.642621825152428,DiveBombers:.417783698791503,TorpedoBombers:.558515133495825,CarrierRecons:.75671307047535,SeaplaneRecons:.932444440578382,SeaplaneBombers:1,SmallRadars:.864289865445084,LargeRadars:.886872388674911,Searchlights:.68310647756898,statLos:.88122333327317,hqLv:-.624797255805045},SmallRadars:{"(Intercept)":-.674829588068364,DiveBombers:.409046013184429,TorpedoBombers:.547260012897553,CarrierRecons:.748420581669228,SeaplaneRecons:.923988080549326,SeaplaneBombers:.864289865445084,SmallRadars:1,LargeRadars:.872011318623459,Searchlights:.671926570242336,statLos:.857213501657084,hqLv:-.560018086758868},LargeRadars:{"(Intercept)":-.707418111752863,DiveBombers:.413855653833994,TorpedoBombers:.560437619378443,CarrierRecons:.767980338133817,SeaplaneRecons:.94904944359066,SeaplaneBombers:.886872388674911,SmallRadars:.872011318623459,LargeRadars:1,Searchlights:.690102027588321,statLos:.883771367337743,hqLv:-.561336967269448},Searchlights:{"(Intercept)":-.502304601556193,DiveBombers:.308730607324667,TorpedoBombers:.437934879351188,CarrierRecons:.589651513349878,SeaplaneRecons:.727912987329348,SeaplaneBombers:.68310647756898,SmallRadars:.671926570242336,LargeRadars:.690102027588321,Searchlights:1,statLos:.723228553177704,hqLv:-.518427865593732},statLos:{"(Intercept)":-.737374218573832,DiveBombers:.317984916914851,TorpedoBombers:.533934507932748,CarrierRecons:.743851348255527,SeaplaneRecons:.944434077970518,SeaplaneBombers:.88122333327317,SmallRadars:.857213501657084,LargeRadars:.883771367337743,Searchlights:.723228553177704,statLos:1,hqLv:-.620804120587684},hqLv:{"(Intercept)":-.05071933950163,DiveBombers:-.386740224500626,TorpedoBombers:-.405349979885748,CarrierRecons:-.503544281376776,SeaplaneRecons:-.614921413821462,SeaplaneBombers:-.624797255805045,SmallRadars:-.560018086758868,LargeRadars:-.561336967269448,Searchlights:-.518427865593732,statLos:-.620804120587684,hqLv:1}},n={DiveBombers:0,TorpedoBombers:0,CarrierRecons:0,SeaplaneRecons:0,SeaplaneBombers:0,SmallRadars:0,LargeRadars:0,Searchlights:0,statLos:1,hqLv:1};for(var t in e)n[t]=e[t];return function(e){void 0===e["(Intercept)"]&&(e["(Intercept)"]=1),e.hqLv=5*Math.ceil(e.hqLv/5);var n={},t=0,o={},u=0;return s.forEach(function(s){var a=e[s]*i[s];n[s]=a,t+=a,o[s]=e[s]*r[s]}),s.forEach(function(e){s.forEach(function(s){u+=o[e]*o[s]*a[e][s]})}),{x_estimate:n,y_estimate:t,x_std_error:o,y_std_error:u}}(n)},q.calc.los33=function(e){if(e){var s=0,i=0,r={TorpedoBombers:.8,CarrierRecons:1,ReconSeaplane:1.2,ReconSeaplaneNight:1.2,SeaplaneBomber:1.1};return Object.defineProperty(r,"default",{value:.6,enumerable:!1,configurable:!1,writable:!1}),e.equipments.forEach(function(e){if(e.id){var i=A(e.id);if(i.stat.los){var a=r.default,n=e.star||0;for(var t in r)(Array.isArray(S[t])?S[t]:[S[t]]).indexOf(i.type)>-1&&(a=r[t]);s+=a*(i.stat.los+q.getStarBonus(i,"los",n))}}}),e.ships.forEach(function(e){var s=D(e.id),r=s.getAttribute("los",Math.max(e.lv||1,s.getMinLv()));i+=Math.sqrt(Math.max(r,1))}),s+i-Math.ceil(.4*e.hq)+2*(6-e.ships.length)}},q.calc.TP=function(e){var s=0,i=(e=e||{}).ship||{},r=e.equipment||{};for(var a in i){var n=0;switch(a){case 1:case"1":case 19:case"19":case"dd":n=5;break;case 2:case"2":case 28:case"28":case 34:case"34":case"cl":n=2;break;case 21:case"21":case"ct":n=6;break;case 5:case"5":case"cav":n=4;break;case 8:case"8":case 33:case"33":case"bbv":n=7;break;case 12:case"12":case 24:case"24":case"av":n=9.5;break;case 14:case"14":case"ssv":n=1;break;case 15:case"15":case"lha":n=12;break;case 29:case"29":case"ao":n=15;break;case 17:case"17":case"as":n=7}s+=n*(parseInt(i[a])||0)}for(var t in r){var o=0,u=parseInt(t),p=void 0;switch(u){case 145:case 150:o=1;break;case 75:o=5;break;case 68:case 193:case 166:o=8;break;case 167:o=2;break;default:switch((p=A(u)).type){case q.equipmentType.LandingCraft:p.name.ja_jp.indexOf("大発動艇")>-1&&(o=8)}}s+=o*(parseInt(r[t])||0)}return s},q.calc.fighterPower=function(e,s,i,r){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{};if(!e)return[0,0];e=e instanceof g?e:d.db.equipments?d.db.equipments[e]:d.db.items[e],s=s||0,i=i||0,r=r||0;var n=a.isFromField,t=[0,0];if(s&&(void 0!==n&&n||S.Fighters.indexOf(e.type)>-1)){var o=((e.stat.aa||0)+(S.isInterceptor(e)?1.5*e.stat.evasion:0)+q.getStarBonus(e,"fighter",r))*Math.sqrt(s),u=q.getFighterPowerRankMultiper(e,i),p=u.min,c=u.max;t[0]+=Math.floor(o+p),t[1]+=Math.floor(o+c)}return t},q.calc.fighterPowerAA=function(e,s,i,r){if(!e)return[0,0];e=A(e),s=s||0,i=i||0,r=r||0;var a=[0,0];if(s){var n=((e.stat.aa||0)+(S.isInterceptor(e)?e.stat.evasion:0)+(S.isInterceptor(e)?2*e.stat.hit:0)+q.getStarBonus(e,"fighter",r))*Math.sqrt(s),t=q.getFighterPowerRankMultiper(e,i,{isAA:!0});a[0]+=Math.floor(n+t.min),a[1]+=Math.floor(n+t.max)}return a},q.calcByShip.shellingPower=function(e,i,r,a,n,t){n=n||{},t=t||s(e,i,r,a);var o=0,u=!1,p=I(e.slot);if(q.shipType.Carriers.indexOf(e.type)>-1?u=!0:[33].includes(e.type)||i.some(function(e){if(e&&!u&&S.CarrierBased.indexOf(e.type)>-1)return u=!0,!0}),u&&!n.isNight){var c=0,f=0;return p.map(function(s,a){if(i[a]){var n=i[a];o+=1.5*n.getStat("fire",e)||0,S.TorpedoBombers.indexOf(n.type)>-1&&(c+=n.getStat("torpedo",e)||0),f+=n.getStat("bomb",e)||0,S.SecondaryGuns.indexOf(n.type)>-1&&(o+=Math.sqrt(1.5*(r[a]||0)))}}),c||f?o+=Math.floor(1.5*(Math.floor(1.3*f)+c+e.stat.fire_max+(t.fire||0)))+50:-1}o=e.stat.fire_max||0;var l={CLMainGunNaval:0,CLMainGunTwin:0,ItalianCAMainGun:0};p.map(function(s,a){if(i[a]){var t=i[a];o+=t.getStat("fire",e)||0,q.shipType.LightCruisers.indexOf(e.type)>-1&&!t.name.ja_jp.includes("Bofors")&&(["14cm単装砲","15.2cm単装砲"].forEach(function(e){t.name.ja_jp.includes(e)&&(l.CLMainGunNaval+=1)}),["14cm連装砲","15.2cm連装砲"].forEach(function(e){t.name.ja_jp.includes(e)&&(l.CLMainGunTwin+=1)})),"rm"===e._navy&&t.name.ja_jp.includes("203mm/53")&&(l.ItalianCAMainGun+=1),r[a]&&!n.isNight&&(o+=q.getStarBonus(t,"shelling",r[a]))}});var h=0+2*Math.sqrt(l.CLMainGunTwin)+Math.sqrt(l.CLMainGunNaval)+Math.sqrt(l.ItalianCAMainGun)+(t.fire||0);return o+h},q.calcByShip.torpedoPower=function(e,i,r,a,n,t){n=n||{},t=t||s(e,i,r,a);var o=0,u=I(e.slot);return q.shipType.Carriers.indexOf(e.type)>-1&&!n.isNight?n.returnZero?0:-1:(o=(e.stat.torpedo_max||0)+(t.torpedo||0),u.map(function(s,a){if(i[a]){var t=i[a];o+=S.TorpedoBombers.indexOf(t.type)>-1&&!n.isNight?0:t.getStat("torpedo",e)||0,r[a]&&!n.isNight&&(o+=q.getStarBonus(t,"torpedo",r[a]))}}),o)},q.calcByShip.nightPower=function(e,a,n,t,o,u,p){o=o||{},p=p||s(e,a,n,t);var c={damage:0},f=0,l=I(e.slot);if([9,10,11,30,32].includes(e.type)&&(u.aviationPersonnelNight||e.getCapability("count_as_night_operation_aviation_personnel"))&&(u.carrierFighterNight>=1||u.torpedoBomberNight>=1))Object.assign(c,i(192)({ship:e,equipments:a,equipmentStars:n,equipmentRanks:t,bonus:p,count:u}));else if(e.getCapability("participate_night_battle_when_equip_swordfish"))c.damage+=e.stat.fire_max+(p.fire||0)+e.stat.torpedo_max+(p.torpedo||0),l.forEach(function(s,i){var r=a[i];a[i]&&S.TorpedoBombers.indexOf(r.type)>-1&&r.name.ja_jp.indexOf("Swordfish")>-1&&(c.damage+=r.getStat("fire",e)+r.getStat("torpedo",e))}),c.type="通常",c.damage=Math.floor(c.damage),c.hit=1;else{if(e.stat.fire+e.stat.torpedo<=0)return{damage:0};var h=function(e,s,i){s=Math.floor(s),"1/2"===(i=i||1)?c.ciAvailable[e]={damage:s,hit:i}:"object"===r(c.ciAvailable[e])?(s*i>c.ciAvailable[e].damage*c.ciAvailable[e].hit||s*i==c.ciAvailable[e].damage*c.ciAvailable[e].hit&&i>c.ciAvailable[e].hit)&&(c.ciAvailable[e]={damage:s,hit:i}):c.ciAvailable[e]={damage:s,hit:i}},m={};l.forEach(function(e,s){if(a[s]&&(n[s]&&(f+=q.getStarBonus(a[s],"night",n[s])),a[s])){var i=a[s];m[i.id]?m[i.id]++:m[i.id]=1}}),delete c.damage,c.ciAvailable={};var v=q.calcByShip.shellingPower(e,a,n,t,{isNight:!0},p)+q.calcByShip.torpedoPower(e,a,n,t,{isNight:!0,returnZero:!0},p)+f+(p.nightExtra||0);if(u.main>=3&&h("炮CI",2*v,1),2===u.main&&u.secondary>=1&&h("炮CI",1.75*v,1),u.torpedo>=2&&h("雷CI",1.5*v,2),u.main>=1&&1===u.torpedo&&h("炮雷CI",1.3*v,2),q.shipType.Submarines.indexOf(e.type)>-1)u.torpedoLateModel>=1&&u.submarineEquipment>=1&&h("[舰首]雷CI",1.75*v,2),u.torpedoLateModel>=2&&h("[舰首]雷CI",1.6*v,2);else if(q.shipType.Destroyers.indexOf(e.type)>-1){var d=(m[267]||0)+(m[366]||0),b=1;1===d?b*=1.25:d>1&&(b*=1.4),m[366]&&(b*=1.05),u.torpedo>=1&&u.radarSurface>=1&&u.main>=1&&h("炮雷电CI",1.3*v*b,"1/2"),u.torpedo>=1&&u.radarSurface>=1&&u.surfaceShipPersonnel>=1&&h("雷电见CI",1.2*v*b,"1/2"),m[412]>=1&&(u.torpedo>=2&&(delete c.ciAvailable["雷CI"],h("雷CI",1.5*v*b,"1/2")),u.torpedo>=1&&u.supplyContainer>=1&&h("雷桶CI",1.3*v*b,"1/2"))}0===Object.keys(c.ciAvailable).length&&(delete c.ciAvailable,2===u.main&&u.secondary<=0&&u.torpedo<=0||1===u.main&&u.secondary>=1&&u.torpedo<=0||0===u.main&&u.secondary>=2&&u.torpedo>=0?(c.type="连击",c.damage=Math.floor(1.2*v),c.hit=2):(c.type="通常",c.damage=Math.floor(v),c.hit=1))}var y=" ";if("object"===r(c.ciAvailable)&&Object.keys(c.ciAvailable).length)c.value=Object.entries(c.ciAvailable).map(function(e){var s=e[0],i=e[1];return""+s+y+i.damage+("string"==typeof i.hit||i.hit>1?" x "+i.hit:"")}).join(" | ");else if(c.isMax&&(y=" ≤ "),c.isMin&&(y=" ≥ "),c.value=""+c.type+y+(c.damage||0),("string"==typeof c.hit||c.hit&&c.hit>1)&&(c.value+=" x "+c.hit),Array.isArray(c.cis)&&c.cis.length)c.value+=" (CI"+y+c.cis.sort(function(e,s){return e[0]-s[0]}).map(function(e){return e[0]+(e[1]&&e[1]>1?" x "+e[1]:"")}).join(" 或 ")+")";else if(c.damage_ci){var g=c.hit_ci||c.hit||1;c.value+=" (CI"+y+c.damage_ci+")",g&&g>1&&(c.value+=" x "+g)}return c},q.calcByShip.fighterPower_v2=function(e,s,i,r){var a=[0,0];return I(e.slot).map(function(e,n){var t=q.calc.fighterPower(s[n],e,r[n]||0,i[n]||0);a[0]+=t[0],a[1]+=t[1]}),a},q.calcByShip.losPower=function(e,s,i,r,a){(a=a||{}).shipLv=a.shipLv||1,a.hqLv=a.hqLv||1,a.shipLv<0&&(a.shipLv=1),a.hqLv<0&&(a.hqLv=1);var n={DiveBombers:0,TorpedoBombers:0,CarrierRecons:0,SeaplaneRecons:0,SeaplaneBombers:0,SmallRadars:0,LargeRadars:0,Searchlights:0,statLos:Math.sqrt(e.getAttribute("los",a.shipLv)),hqLv:a.hqLv};return s.forEach(function(e){if(e)for(var s in n)S[s]&&S[s].push&&S[s].indexOf(e.type)>-1&&(n[s]+=e.stat.los)}),q.calc.losPower(n)},q.calcByShip.TP=function(e,s){if(!e||!s||!s.push)return 0;e=D(e);var i={ship:{},equipment:{}};return i.ship[e.type]=1,s.forEach(function(e){if(e){var s="number"==typeof e?e:A(e).id;i.equipment[s]||(i.equipment[s]=0),i.equipment[s]++}}),e.getCapability("count_as_landing_craft")&&(i.equipment[68]||(i.equipment[68]=0),i.equipment[68]++),q.calc.TP(i)},q.calcByShip.speed=function(e,s,i,a,n){if(!e)return"";if("object"===(void 0===i?"undefined":r(i))&&i.push)return q.calcByShip.speed(e,s,[],[],i);if("object"===(void 0===a?"undefined":r(a))&&a.push)return q.calcByShip.speed(e,s,i,[],a);e=D(e),s=s||[],n=n||{};var t=parseInt(e.stat.speed),o=function(e){return e=Math.min(20,e||t),n.returnNumber?e:d.statSpeed[e]},u={33:0,34:0,87:0},p=e._speedRule||"low-2",c=0;if(s.forEach(function(e){if(e){var s="number"==typeof e?e:A(e).id;void 0!==u[""+s]&&u[""+s]++}}),!u[33])return o();switch(p){case"low-1":c=u[34]&&!u[87]?.5:u[34]>=2&&u[87]?1.5:.3*Math.min(u[34],1)+.7*u[87];break;case"low-2":case"high-3":(u[34]||u[87])&&(c=Math.min(1,u[34]/3+.5*u[87]));break;case"low-3":case"high-4":(u[34]||u[87])&&(t+=5);break;case"high-1":c=.5*u[34]+1*u[87];break;case"high-2":c=.5*u[34]+.5*u[87];break;case"low-4":c=.5,(u[34]>=3||u[87]>=2||u[34]>=2&&u[87]>=1)&&(c+=.5)}return c>0&&c<1?t+=5:c>=1&&c<1.5?t+=10:c>=1.5&&(t+=15),o()},q.calcByShip.fireRange=function(e,i,r,a,n,t){if(!e)return"-";i=i||[],n=n||{},t=t||s(e,i,r,a);var o=parseInt(e.stat.range);return i.forEach(function(e){e&&(o=Math.max(o,A(e).stat.range||0))}),isNaN(t.range)||(o+=parseInt(t.range)),d.statRange[Math.min(4,o)]},q.calcByFleet.los33=function(e,s){var i=[],r=[];return e.forEach(function(e){if(Array.isArray(e)){var s=e[0];if(s){var a=e[2],n=e[3],t=e[4];r.push({id:s,lv:e[1][0]}),a.forEach(function(e,s){i.push({id:e,star:n[s],rank:t[s]})})}}}),q.calc.los33({hq:s,equipments:i,ships:r})},q.calcByField.fighterPower=function(e){var s=[0,0],i=1,r=function(e){return i=Math.max(e,i)};return e.forEach(function(e){var i=A(e[0]||e.equipment||e.equipmentId),a=e[1]||e.star||0,n=e[2]||e.rank||0,t=e[3]||e.carry||0;t||(t=q.equipmentType.Recons.indexOf(i.type)>-1?d.planesPerSlotLBAS.recon:q.equipmentType.LandBasedLarge.indexOf(i.type)>-1?d.planesPerSlotLBAS.large:d.planesPerSlotLBAS.attacker);var o=q.calc.fighterPower(i,t,n,a,{isFromField:!0});if(s[0]+=o[0],s[1]+=o[1],312==i.id)r(1.18);else switch(i.type){case S.LandBasedRecon:r(1.15)}}),s[0]=s[0]*i,s[1]=s[1]*i,s},q.calcByField.fighterPowerAA=function(e){var s=[0,0],i=1;function r(e){return i=Math.max(e,i)}return e.forEach(function(e){var i=A(e[0]||e.equipment||e.equipmentId),a=e[1]||e.star||0,n=e[2]||e.rank||0,t=e[3]||e.carry||0;t||(t=q.equipmentType.Recons.indexOf(i.type)>-1?d.planesPerSlotLBAS.recon:d.planesPerSlotLBAS.attacker);var o=q.calc.fighterPowerAA(i,t,n,a,{isFromField:!0});switch(s[0]+=o[0],s[1]+=o[1],i.type){case S.CarrierRecon:case S.CarrierRecon2:i.stat.los<=7?r(1.2):i.stat.los>=9?r(1.3):r(1.25);break;case S.ReconSeaplane:case S.ReconSeaplaneNight:case S.LargeFlyingBoat:i.stat.los<=7?r(1.1):i.stat.los>=9?r(1.16):r(1.13);break;case S.LandBasedRecon:r(1.18)}}),s[0]=s[0]*i,s[1]=s[1]*i,s},q.getBonus=function(e,i,r,a,n){return s(e,i,r,a,n)},Array.prototype.indexOf||(Array.prototype.indexOf=function(e,s){var i;if(null==this)throw new TypeError('"this" is null or not defined');var r=Object(this),a=r.length>>>0;if(0===a)return-1;var n=+s||0;if(Math.abs(n)===1/0&&(n=0),n>=a)return-1;for(i=Math.max(n>=0?n:a-Math.abs(n),0);i<a;){if(i in r&&r[i]===e)return i;i++}return-1}),d.Entity=y,d.Equipment=g,d.Ship=_,d.Consumable=C,d.formula=q,d}()},function(e,s,i){"use strict";var r=Object.assign||function(e){for(var s=1;s<arguments.length;s++){var i=arguments[s];for(var r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r])}return e};function a(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}i(3);var n=i(19),t=[].concat(a(i(20)),a(i(27)),a(i(28)),a(i(29)),a(i(34)),a(i(35)),a(i(36)),a(i(37)),a(i(38)),a(i(39)),a(i(40)),a(i(41)),a(i(42)),a(i(43)),a(i(44)),a(i(45)),a(i(46)),a(i(47)),a(i(48)),a(i(49)),a(i(50)),a(i(51)),a(i(52)),a(i(53)),a(i(54)),a(i(55)),a(i(56)),a(i(57)),a(i(58)),a(i(59)),a(i(60)),a(i(61)),a(i(62)),a(i(63)),a(i(64)),a(i(65)),a(i(66)),a(i(67)),a(i(68)),a(i(69)),a(i(70)),a(i(71)),a(i(72)),a(i(73)),a(i(74)),a(i(75)),a(i(76)),a(i(77)),a(i(78)),a(i(79)),a(i(80)),a(i(81)),a(i(82)),a(i(83)),a(i(84)),a(i(85)),a(i(86)),a(i(87)),a(i(88)),a(i(89)),a(i(90)),a(i(91)),a(i(92)),a(i(93)),a(i(94)),a(i(95)),a(i(96)),a(i(97)),a(i(98)),a(i(99)),a(i(100)),a(i(101)),a(i(102)),a(i(103)),a(i(104)),a(i(105)),a(i(106)),a(i(107)),a(i(108)),a(i(109)),a(i(110)),a(i(111)),a(i(112)),a(i(113)),a(i(114)),a(i(115)),a(i(116)),a(i(117)),a(i(118)),a(i(119)),a(i(120)),a(i(121)),a(i(122)),a(i(123)),a(i(124)),a(i(125)),a(i(126)),a(i(127)),a(i(128)),a(i(129)),a(i(130)),a(i(131)),a(i(132)),a(i(133)),a(i(134)),a(i(135)),a(i(136)),a(i(137)),a(i(138)),a(i(139)),a(i(140)),a(i(141)),a(i(142)),a(i(143)),a(i(144)),a(i(145)),a(i(146)),a(i(147)),a(i(148)),a(i(149)),a(i(150)),a(i(151)),a(i(152)),a(i(153)),a(i(154)),a(i(155)),a(i(156)),a(i(157)),a(i(158)),a(i(159)),a(i(160)),a(i(161)),a(i(162)),a(i(163)),a(i(164)),a(i(165)),a(i(166)),a(i(167)),a(i(168)),a(i(169)),a(i(170)),a(i(171)),a(i(172)),a(i(173)),a(i(174)),a(i(175)),a(i(176)),a(i(177)),a(i(178)),a(i(179)),a(i(180)),a(i(181))),o=t.filter(n);o.forEach(function(e,s){e.list.every(function(e){return!isNaN(e)})&&o.forEach(function(i,a){s===a||e.list.length>=i.list.length||!e.list.every(function(e){return i.list.includes(e)})||(i.bonusAccumulate||(i.bonusAccumulate=r({},i.bonus||{})),Object.keys(e.bonus).forEach(function(s){void 0===i.bonusAccumulate[s]&&(i.bonusAccumulate[s]=0),i.bonusAccumulate[s]+=e.bonus[s]}))})}),e.exports=t},function(e,s,i){"use strict";var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};e.exports=function(e){return"object"===(void 0===e?"undefined":r(e))&&("object"===r(e.equipments)||"object"===r(e.list))}},function(e,s,i){"use strict";i(3);var r=i(1).雪風改二,a=i(0).DD_Akizuki;e.exports=[{equipment:122,ship:{isClass:[a]},bonus:{fire:1,aa:2,evasion:1}},{equipment:122,ship:{isID:[r]},bonusImprove:{4:{fire:5,aa:3,evasion:2}}},{list:[122,"SurfaceRadar"],listStar:[4,void 0],equipments:{has:{id:122,star:4},hasSurfaceRadar:!0},ship:{isID:[r]},bonus:{fire:4,evasion:3}},{list:[122,"AARadar"],listStar:[4,void 0],equipments:{has:{id:122,star:4},hasAARadar:!0},ship:{isID:[r]},bonus:{aa:4,evasion:3}}]},function(e,s,i){"use strict";e.exports={"伊勢改二":553,"日向改二":554,"扶桑改二":411,"山城改二":412,"長門改二":541,"陸奥改二":573,"金剛改二丙":591,"比叡改二丙":592,"榛名改二":151,"South Dakota":602,"South Dakota改":697,Washington:654,"Washington改":659}},function(e,s,i){"use strict";var r=Object.assign||function(e){for(var s=1;s<arguments.length;s++){var i=arguments[s];for(var r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r])}return e};e.exports=r({},{"大鳳":153,"大鳳改":156,"翔鶴改二甲":466,"瑞鶴改二甲":467},{"赤城":83,"赤城改":277,"赤城改二":594,"赤城改二戊":599,"加賀":84,"加賀改":278,"加賀改二":698,"加賀改二戊":610,"加賀改二護":646,"翔鶴":110,"翔鶴改":288,"翔鶴改二":461,"瑞鶴":111,"瑞鶴改":112,"瑞鶴改二":462,Hornet:603,"Hornet改":704},{"龍鳳":185,"龍鳳改":318,"龍鳳改二戊":883,"龍鳳改二":888,"祥鳳":74,"祥鳳改":282,"瑞鳳":116,"瑞鳳改":117,"瑞鳳改二":555,"瑞鳳改二乙":560,"飛鷹":75,"飛鷹改":283,"隼鷹":92,"隼鷹改":284,"隼鷹改二":408,"千歳航":108,"千歳航改":291,"千歳航改二":296,"千代田航":109,"千代田航改":292,"千代田航改二":297,"鈴谷航改二":508,"熊野航改二":509,"Gambier Bay":544,"Gambier Bay改":396,"Gambier Bay Mk.II":707})},function(e,s,i){"use strict";e.exports={"最上改二":501,"最上改二特":506}},function(e,s,i){"use strict";e.exports={"天龍":51,"天龍改":213,"天龍改二":477,"龍田":52,"龍田改":214,"龍田改二":478,"球磨":99,"球磨改":215,"球磨改二":652,"球磨改二丁":657,"北上":25,"北上改":58,"北上改二":119,"大井":24,"大井改":57,"大井改二":118,"五十鈴":22,"五十鈴改":219,"五十鈴改二":141,"由良":23,"由良改":220,"由良改二":488,"鬼怒":113,"鬼怒改":289,"鬼怒改二":487,"那珂":56,"那珂改":224,"那珂改二":160,"夕張":115,"夕張改":293,"夕張改二":622,"夕張改二特":623,"夕張改二丁":624,"能代改二":662,"矢矧":139,"矢矧改":307,"矢矧改二":663,"矢矧改二乙":668,"大淀":183,"大淀改":321,Gotland:574,"Gotland改":579,"Gotland andra":630,Sheffield:514,"Sheffield改":705,"香取":154,"香取改":343,"鹿島":465,"鹿島改":356}},function(e,s,i){"use strict";e.exports={"曙":15,"曙改":231,"曙改二":665,"潮":16,"潮改":233,"潮改二":407,"雪風":20,"雪風改":228,"丹陽":651,"雪風改二":656,"秋雲":132,"秋雲改":301,"秋雲改二":648,"高波改二":649,"沖波改二":569,"竹":642,"竹改":706,Grecale:614,"Grecale改":619,"Fletcher Mk.II":629}},function(e,s,i){"use strict";e.exports={"伊47":636,"伊47改":607,"伊58":127,"伊58改":399,"伊400":493,"伊400改":606,"伊401":155,"伊401改":403}},function(e,s,i){"use strict";e.exports=[{equipment:293,ship:{isClass:[92,94]},bonus:{fire:1,aa:1,evasion:2}},{equipment:293,ship:{isClass:[84,12]},bonus:{fire:2,aa:1,evasion:3}},{list:[293,"SurfaceRadar"],equipments:{hasID:[293],hasSurfaceRadar:!0},ship:{isClass:[92,94]},bonus:{fire:2,evasion:3,asw:1}},{list:[293,"SurfaceRadar"],equipments:{hasID:[293],hasSurfaceRadar:!0},ship:{isClass:[84,12]},bonus:{fire:2,torpedo:1,evasion:3}},{list:[293,174],equipments:[{isID:293},{isID:174}],ship:{isClass:[84,12]},bonus:{fire:2,torpedo:4}},{list:[293,174,174],equipments:[{isID:293},{isID:174},{isID:174}],ship:{isClass:[84,12]},bonus:{fire:1,torpedo:3}}]},function(e,s,i){"use strict";var r=i(0),a=r.DD_Kamikaze,n=r.DD_Mutsuki,t=r.DD_Matsu,o=i(1),u=o.由良,p=o.由良改,c=o.由良改二,f=o.鬼怒,l=o.鬼怒改,h=o.鬼怒改二,m=o.那珂,v=o.那珂改,d=o.那珂改二,b=o.雪風改二,y=[{equipment:382,ship:{isType:[31]},bonus:{aa:2,asw:1,evasion:2}},{equipment:382,ship:{isClass:[a,n,t]},bonus:{aa:2,evasion:1}},{equipment:382,ship:{isID:[b]},bonus:{aa:3,evasion:2}},{equipment:382,ship:{isID:[u,f,m]},bonus:{aa:1}},{equipment:382,ship:{isID:[p,c,l,h,v,d]},bonus:{aa:1,evasion:1}}],g=[{list:[382,"SurfaceRadar"],equipments:{hasID:[382],hasSurfaceRadar:!0},ship:{isType:[31]},bonus:{fire:2,evasion:3}},{list:[382,"AARadar"],equipments:{hasID:[382],hasAARadar:!0},ship:{isType:[31]},bonus:{aa:2,evasion:3}},{list:[382,"SurfaceRadar"],equipments:{hasID:[382],hasSurfaceRadar:!0},ship:{isClass:[a,n,t]},bonus:{fire:1,evasion:2}},{list:[382,"AARadar"],equipments:{hasID:[382],hasAARadar:!0},ship:{isClass:[a,n,t]},bonus:{aa:2,evasion:2}},{list:[382,"SurfaceRadar"],equipments:{hasID:[382],hasSurfaceRadar:!0},ship:{isID:[b]},bonus:{fire:2,evasion:2}},{list:[382,"AARadar"],equipments:{hasID:[382],hasAARadar:!0},ship:{isID:[b]},bonus:{aa:3,evasion:2}},{list:[382,"SurfaceRadar"],equipments:{hasID:[382],hasSurfaceRadar:!0},ship:{isID:[c,h,d]},bonus:{fire:1,evasion:1}},{list:[382,"AARadar"],equipments:{hasID:[382],hasAARadar:!0},ship:{isID:[c,h,d]},bonus:{aa:2,evasion:2}}];e.exports=[].concat(y,g)},function(e,s,i){"use strict";function r(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}var a=i(0).group_DD_Navy_RM,n=i(4).Grecale,t=[{equipment:147,ship:{isClass:[].concat(r(a))},bonus:{fire:1,evasion:1}}],o=[{equipment:393,ship:{isClass:[].concat(r(a))},bonus:{fire:2,aa:1,evasion:1}}],u=[{equipment:394,ship:{isClass:[].concat(r(a)),isNotID:[].concat(r(n))},bonus:{fire:2,aa:1,evasion:2}},{equipment:394,ship:{isID:[].concat(r(n))},bonus:{fire:2,aa:1,evasion:3}}];e.exports=[].concat(t,o,u)},function(e,s,i){"use strict";var r=i(1),a=r.扶桑改二,n=r.山城改二,t=r.比叡改二丙,o=r.榛名改二,u=r.Washington,p=r.Washington改;e.exports={Colorado:[601,1496],Washington:[u,p],Kongou:[78,209,149,591],Hiei:[86,210,150,t],Haruna:[79,211,o],Kirishima:[85,212,152],Ise:[77,82,553],Hyuuga:[87,88,554],Fusou:[26,286,a],Yamashiro:[27,287,n]}},function(e,s,i){"use strict";var r=i(1),a=r.赤城,n=r.赤城改,t=r.赤城改二,o=r.赤城改二戊,u=r.加賀,p=r.加賀改,c=r.加賀改二,f=r.加賀改二戊,l=r.加賀改二護,h=r.翔鶴,m=r.翔鶴改,v=r.翔鶴改二,d=r.翔鶴改二甲,b=r.瑞鶴,y=r.瑞鶴改,g=r.瑞鶴改二,_=r.瑞鶴改二甲,C=r.大鳳,D=r.大鳳改,A=r.龍鳳,I=r.龍鳳改,q=r.龍鳳改二戊,S=r.龍鳳改二,R=r.祥鳳,B=r.祥鳳改,N=r.瑞鳳,x=r.瑞鳳改,L=r.瑞鳳改二,k=r.瑞鳳改二乙,w=r.飛鷹,M=r.飛鷹改,T=r.隼鷹,V=r.隼鷹改,O=r.隼鷹改二,P=r.千歳航,j=r.千歳航改,K=r.千歳航改二,F=r.千代田航,E=r.千代田航改,G=r.千代田航改二;e.exports={Akagi:[a,n,t,o],Kaga:[u,p,c,f,l],Souryuu:[90,279,197],Hiryuu:[91,280,196],Shoukaku:[h,m,v,d],Zuikaku:[b,y,g,_],Taihou:[C,D],Ryuuhou:[A,I,q,S],Shouhou:[R,B],Zuihou:[N,x,L,k],Hiyou:[w,M],Junyou:[T,V,O],Chitose:[P,j,K],Chiyoda:[F,E,G]}},function(e,s,i){"use strict";e.exports={Choukai:[69,272,427]}},function(e,s,i){"use strict";var r=i(1),a=r.伊47,n=r.伊47改,t=r.伊58,o=r.伊58改,u=r.伊400,p=r.伊400改,c=r.伊401,f=r.伊401改;e.exports={I47:[a,n],I58:[t,o],I400:[u,p],I401:[c,f]}},function(e,s,i){"use strict";function r(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}var a=i(0).group_DD_Navy_KM;e.exports=[{equipment:78,ship:{isClass:[].concat(r(a))},bonusImprove:{0:{fire:1,evasion:1},8:{fire:2,evasion:1},10:{fire:2,armor:1,evasion:1}}},{list:[78,"SurfaceRadar"],equipments:{hasID:[78],hasSurfaceRadar:!0},ship:{isClass:[].concat(r(a))},bonus:{fire:2,torpedo:2,evasion:2}}]},function(e,s,i){"use strict";var r=i(2).CL_NagaraClass2ndRemodel,a=i(1),n=a.由良,t=a.由良改,o=a.由良改二,u=a.鬼怒,p=a.鬼怒改,c=a.鬼怒改二,f=a.那珂,l=a.那珂改,h=a.那珂改二,m=a.夕張改二,v=a.夕張改二特,d=a.夕張改二丁;e.exports=[{equipment:229,ship:{isID:[m,v,d]},bonus:{fire:1,aa:1}},{equipment:229,ship:{isType:[31]},bonusImprove:{7:{fire:1,aa:1}}},{equipment:229,ship:{isClass:[84,12]},bonusImprove:{7:{fire:1,aa:1}}},{equipment:229,ship:{isID:[u,f]},bonusImprove:{7:{fire:2}}},{equipment:229,ship:{isID:[n,p,l]},bonusImprove:{7:{fire:2,aa:1}}},{equipment:229,ship:{isID:[t,c,h]},bonusImprove:{7:{fire:2,aa:2}}},{equipment:229,ship:{isID:[o]},bonusImprove:{7:{fire:2,aa:3}}},{list:[229,"SurfaceRadar"],equipments:{hasID:[229],hasSurfaceRadar:!0},ship:{isID:[m,v,d]},bonus:{fire:1,evasion:1}},{list:[229,"AARadar"],equipments:{hasID:[229],hasAARadar:!0},ship:{isID:[m,v,d]},bonus:{aa:2,evasion:2}},{list:[{id:229,star:10},"SurfaceRadar"],equipments:[{isID:229,improvement:7},{isSurfaceRadar:!0}],ship:{isType:[31]},bonus:{fire:1,evasion:4}},{list:[{id:229,star:10},"SurfaceRadar"],equipments:[{isID:229,improvement:7},{isSurfaceRadar:!0}],ship:{isClass:[84,12]},bonus:{fire:2,evasion:3}},{list:[{id:229,star:10},"SurfaceRadar"],equipments:[{isID:229,improvement:7},{isSurfaceRadar:!0}],ship:{isID:r},bonus:{fire:3,evasion:2}}]},function(e,s,i){"use strict";var r=i(0),a=r.DD_Kamikaze,n=r.DD_Mutsuki,t=r.DD_Matsu,o=i(1),u=o.天龍,p=o.天龍改,c=o.天龍改二,f=o.龍田,l=o.龍田改,h=o.龍田改二,m=o.北上,v=o.北上改,d=o.北上改二,b=o.大井,y=o.大井改,g=o.大井改二,_=o.五十鈴,C=o.五十鈴改,D=o.五十鈴改二,A=o.由良,I=o.由良改,q=o.由良改二,S=o.鬼怒,R=o.鬼怒改,B=o.鬼怒改二,N=o.那珂,x=o.那珂改,L=o.那珂改二,k=o.夕張,w=o.夕張改,M=o.夕張改二,T=o.夕張改二特,V=o.夕張改二丁,O=o.丹陽,P=o.雪風改二,j=[{equipment:379,ship:{isType:[31]},bonus:{fire:1,aa:2}},{equipment:379,ship:{isClass:[a,n]},bonus:{fire:1,aa:2}},{equipment:379,ship:{isClass:[t]},bonus:{fire:3,aa:4}},{equipment:379,ship:{isID:[O]},bonus:{fire:3,aa:3}},{equipment:379,ship:{isID:[P]},bonus:{fire:3,aa:3,asw:2,evasion:3}},{equipment:379,ship:{isID:[u,p,f,l]},bonus:{fire:1}},{equipment:379,ship:{isID:[c,h]},bonus:{fire:1,aa:2,asw:2}},{equipment:379,ship:{isID:[_,C,A,S,R,N,x]},bonus:{fire:2,aa:2,asw:1}},{equipment:379,ship:{isID:[I]},bonus:{fire:2,aa:3,asw:1}},{equipment:379,ship:{isID:[D,B,L]},bonus:{fire:2,aa:3,asw:2}},{equipment:379,ship:{isID:[q]},bonus:{fire:2,aa:4,asw:2}},{equipment:379,ship:{isID:[m,v,d,b,y,g]},bonus:{fire:2,aa:2}},{equipment:379,ship:{isID:[k,w,T]},bonus:{fire:1,asw:1}},{equipment:379,ship:{isID:[M]},bonus:{fire:1,aa:2,asw:1}},{equipment:379,ship:{isID:[V]},bonus:{fire:1,aa:2,asw:3}},{equipment:379,ship:{isType:[21,12,24]},bonus:{fire:1,aa:1}}],K=[{list:[379,"SurfaceRadar"],equipments:{hasID:[379],hasSurfaceRadar:!0},ship:{isType:[31]},bonus:{fire:1,evasion:4}},{list:[379,"SurfaceRadar"],equipments:{hasID:[379],hasSurfaceRadar:!0},ship:{isClass:[a,n]},bonus:{fire:2,evasion:3}},{list:[379,"SurfaceRadar"],equipments:{hasID:[379],hasSurfaceRadar:!0},ship:{isClass:[t]},bonus:{fire:4,evasion:3}},{list:[379,"SurfaceRadar"],equipments:{hasID:[379],hasSurfaceRadar:!0},ship:{isID:[O,P]},bonus:{fire:2,evasion:2}},{list:[379,"AARadar"],equipments:{hasID:[379],hasAARadar:!0},ship:{isID:[P]},bonus:{aa:3,evasion:2}},{list:[379,"SurfaceRadar"],equipments:{hasID:[379],hasSurfaceRadar:!0},ship:{isID:[d,g,D,B,L]},bonus:{fire:2,evasion:3}},{list:[379,"SurfaceRadar"],equipments:{hasID:[379],hasSurfaceRadar:!0},ship:{isID:[q]},bonus:{fire:3,evasion:4}},{list:[379,"SurfaceRadar"],equipments:{hasID:[379],hasSurfaceRadar:!0},ship:{isID:[u,p,c,f,l,h,k,w,M,T,V]},bonus:{fire:3,evasion:5}},{list:[379,"SurfaceRadar"],equipments:{hasID:[379],hasSurfaceRadar:!0},ship:{isType:[3,34,35,28,2,21,12,24],isNotID:[u,p,c,f,l,h,d,g,D,q,B,L,k,w,M,T,V]},bonus:{fire:1,evasion:2}}];e.exports=[].concat(j,K)},function(e,s,i){"use strict";function r(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}i(3);var a=i(0).DD_Matsu,n=i(2).DD_Div7_2ndRemodel,t=i(1),o=t.天龍改二,u=t.龍田改二,p=t.球磨改二,c=t.球磨改二丁,f=t.北上改二,l=t.大井改二,h=t.五十鈴改二,m=t.由良改二,v=t.鬼怒改二,d=t.那珂改二,b=t.夕張改,y=t.夕張改二,g=t.夕張改二丁,_=t.丹陽,C=t.雪風改二,D=[{equipment:380,ship:{isClass:[a]},bonusCount:{1:{fire:3,aa:4},2:{fire:4,aa:6},3:{fire:5,aa:8}}},{equipment:380,ship:{isID:[].concat(r(n))},bonusCount:{1:{fire:3,aa:3,evasion:2},2:{fire:5,aa:5,evasion:2},3:{fire:7,aa:7,evasion:2}}},{equipment:380,ship:{isID:[_,C]},bonus:{fire:3,aa:3}},{equipment:380,ship:{isID:[o,u]},bonus:{fire:1,aa:2,asw:2}},{equipment:380,ship:{isID:[p,c]},bonusCount:{1:{fire:3,aa:2},2:{fire:6,aa:2},3:{fire:9,aa:2}}},{equipment:380,ship:{isID:[h,v,d]},bonus:{fire:2,aa:3,asw:2}},{equipment:380,ship:{isID:[m]},bonus:{fire:2,aa:4,asw:2}},{equipment:380,ship:{isID:[m]},bonus:{fire:2,aa:4,asw:2}},{equipment:380,ship:{isID:[b]},bonus:{fire:1,asw:1}},{equipment:380,ship:{isID:[y]},bonus:{fire:1,aa:2,asw:1}},{equipment:380,ship:{isID:[g]},bonus:{fire:1,aa:2,asw:3}},{equipment:380,ship:{isID:[f,l]},bonus:{fire:3,aa:2}},{equipment:380,ship:{isType:[21,12,24]},bonus:{fire:1,aa:2}}],A=[{list:[380,"SurfaceRadar"],equipments:{hasID:[380],hasSurfaceRadar:!0},ship:{isClass:[a]},bonus:{fire:4,evasion:3}},{list:[380,"SurfaceRadar"],equipments:{hasID:[380],hasSurfaceRadar:!0},ship:{isID:[].concat(r(n))},bonus:{fire:2,evasion:1}},{list:[380,"SurfaceRadar"],equipments:{hasID:[380],hasSurfaceRadar:!0},ship:{isID:[_,C]},bonus:{fire:1,evasion:2}},{list:[380,"SurfaceRadar"],equipments:{hasID:[380],hasSurfaceRadar:!0},ship:{isID:[f,l,h,m,v]},bonus:{fire:3,evasion:3}},{list:[380,"SurfaceRadar"],equipments:{hasID:[380],hasSurfaceRadar:!0},ship:{isID:[p,c]},bonus:{fire:3,evasion:4}},{list:[380,"SurfaceRadar"],equipments:{hasID:[380],hasSurfaceRadar:!0},ship:{isType:[3,34,35,28,2,21,12,24],isNotID:[f,l,h,m,v]},bonus:{fire:2,evasion:1}},{list:[380,"AAGun"],equipments:{hasID:[380],hasAAGuns:!0},ship:{isID:[].concat(r(n))},bonus:{fire:1,aa:2,evasion:1}}];e.exports=[].concat(D,A)},function(e,s,i){"use strict";var r=i(0),a=r.DD_Fubuki,n=r.DD_Ayanami,t=r.DD_Akatsuki;e.exports=[{equipment:297,ship:{isClass:[n,t]},bonus:{evasion:1}},{equipment:297,ship:{isClass:[a]},bonus:{evasion:2}}]},function(e,s,i){"use strict";var r=i(0).group_DD_Tokugata;e.exports=[{equipment:294,ship:{isClass:r},bonus:{fire:1}},{list:[294,"SurfaceRadar"],equipments:{hasID:[294],hasSurfaceRadar:!0},ship:{isClass:r},bonus:{fire:3,torpedo:1,evasion:2}},{list:[294,125],equipments:[{isID:294},{isID:125}],ship:{isClass:r},bonus:{fire:1,torpedo:3}},{list:[294,125,125],equipments:[{isID:294},{isID:125},{isID:125}],ship:{isClass:r},bonus:{fire:1,torpedo:2}},{list:[294,285],equipments:[{isID:294},{isID:285}],ship:{isClass:r},bonus:{fire:1,torpedo:4}},{list:[294,285,285],equipments:[{isID:294},{isID:285},{isID:285}],ship:{isClass:r},bonus:{fire:1,torpedo:2}}]},function(e,s,i){"use strict";var r=i(0).group_DD_Tokugata;e.exports=[{equipment:295,ship:{isClass:r},bonus:{fire:2,aa:2}},{list:[295,"SurfaceRadar"],equipments:{hasID:[295],hasSurfaceRadar:!0},ship:{isClass:r},bonus:{fire:3,torpedo:1,evasion:2}},{list:[295,"AARadar"],equipments:{hasID:[295],hasAARadar:!0},ship:{isClass:r},bonus:{aa:6}},{list:[295,125],equipments:[{isID:295},{isID:125}],ship:{isClass:r},bonus:{fire:1,torpedo:3}},{list:[295,125,125],equipments:[{isID:295},{isID:125},{isID:125}],ship:{isClass:r},bonus:{torpedo:2}},{list:[295,285],equipments:[{isID:295},{isID:285}],ship:{isClass:r},bonus:{fire:1,torpedo:4}},{list:[295,285,285],equipments:[{isID:295},{isID:285},{isID:285}],ship:{isClass:r},bonus:{torpedo:2}},{list:[295,125,285],equipments:[{isID:295},{isID:125},{isID:285}],ship:{isClass:r},bonus:{torpedo:-1}}]},function(e,s,i){"use strict";var r=i(0),a=r.DD_Ayanami,n=r.DD_Akatsuki,t=r.DD_Hatsuharu,o=i(7).Shikinami2ndRemodelAll;e.exports=[{equipment:63,ship:{isClass:[a,n,t],isNotID:o},bonus:{aa:1}},{equipment:63,ship:{isID:o},bonus:{fire:1,aa:1}},{equipment:63,ship:{isID:[242,497,498]},bonus:{evasion:1}},{equipment:63,ship:{isID:[145]},bonus:{fire:1}},{equipment:63,ship:{isID:[469]},bonus:{evasion:2}},{equipment:63,ship:{isID:[144]},bonus:{fire:1,torpedo:1,aa:1,evasion:2}}]},function(e,s,i){"use strict";function r(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}var a=i(2).DD_ShiratsuyuClass2ndRemodel,n=i(0),t=n.DD_Ayanami,o=n.DD_Akatsuki,u=n.DD_Hatsuharu,p=n.DD_Shiratsuyu,c=i(7).Shikinami2ndRemodelAll,f=[t,o,p],l=[t,o,u];e.exports=[{equipment:296,ship:{isClass:f,isNotID:[].concat(r(c),r(a))},bonus:{fire:1}},{equipment:296,ship:{isID:c},bonus:{fire:3,torpedo:1}},{equipment:296,ship:{isClass:[u]},bonus:{fire:1,evasion:1}},{equipment:296,ship:{isID:[497]},bonus:{fire:2,evasion:2}},{equipment:296,ship:{isID:[145]},bonus:{fire:2,aa:1,evasion:1}},{equipment:296,ship:{isID:[498]},bonus:{fire:1,aa:1,evasion:2}},{equipment:296,ship:{isID:[144]},bonus:{fire:2,torpedo:1,evasion:1}},{equipment:296,ship:{isID:[587,469]},bonus:{fire:1,evasion:2}},{list:[296,"SurfaceRadar"],equipments:{hasID:[296],hasSurfaceRadar:!0},ship:{isClass:l},bonus:{fire:1,torpedo:2,evasion:2}},{list:[296,"SurfaceRadar"],equipments:{hasID:[296],hasSurfaceRadar:!0},ship:{isClass:[p]},bonus:{fire:1,torpedo:3,evasion:2}},{list:[296,"AARadar"],equipments:{hasID:[296],hasAARadar:!0},ship:{isClass:l},bonus:{aa:5}},{list:[296,"AARadar"],equipments:{hasID:[296],hasAARadar:!0},ship:{isClass:[p]},bonus:{aa:6}},{list:[296,285],equipments:[{isID:296},{isID:285}],ship:{isClass:l},bonus:{fire:1,torpedo:3}},{list:[296,15],equipments:[{isID:296},{isID:15}],ship:{isClass:[p]},bonus:{fire:1,torpedo:3}},{list:[296,286],equipments:[{isID:296},{isID:286}],ship:{isClass:[p]},bonus:{fire:1,torpedo:3}}]},function(e,s,i){"use strict";var r=i(2).DD_KagerouClass2ndRemodelExcludeAkigumo,a=i(1).丹陽,n=i(0),t=n.DD_Kagerou,o=n.DD_KagerouROCN,u=n.DD_Kagerou2,p=[145,228,a,557],c=r.concat(p);e.exports=[{equipment:266,ship:{isClass:[19,20,21],isNotID:c},bonus:{fire:1}},{equipment:266,ship:{isID:p},bonus:{fire:1,evasion:1}},{equipment:266,ship:{isID:r.filter(function(e){return e!==a})},bonusCount:{1:{fire:2},2:{fire:5},3:{fire:6}}},{list:[266,"SurfaceRadar"],equipments:{hasID:[266],hasSurfaceRadar:!0},ship:{isClass:[19,20]},bonus:{fire:1,torpedo:3,evasion:1}},{list:[266,"SurfaceRadar"],equipments:{hasID:[266],hasSurfaceRadar:!0},ship:{isClass:[t,o,u]},bonus:{fire:2,torpedo:3,evasion:1}}]},function(e,s,i){"use strict";function r(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}i(3);var a=i(2),n=a.DD_KagerouClass2ndRemodelExcludeAkigumo,t=a.DD_KagerouClass2ndRemodel,o=a.DD_YuugumoClass2ndRemodel,u=a.DD_ShimakazeRemodel,p=i(0),c=p.DD_Kagerou,f=p.DD_KagerouROCN,l=i(1),h=l.丹陽,m=l.秋雲改二,v=l.高波改二,d=o.filter(function(e){return e!==v});e.exports=[{equipment:267,ship:{isClass:[c,f],isNotID:t.filter(function(e){return e!==h})},bonus:{fire:1,evasion:1}},{equipment:267,ship:{isClass:[22,24],isNotID:o},bonus:{fire:2,evasion:1}},{equipment:267,ship:{isID:n.filter(function(e){return e!==h})},bonusCount:{1:{fire:2,evasion:1},2:{fire:3,evasion:2},3:{fire:4,evasion:3}}},{equipment:267,ship:{isID:[m].concat(r(d))},bonus:{fire:3,evasion:1}},{equipment:267,ship:{isID:[v]},bonus:{fire:4,evasion:1}},{list:[267,"SurfaceRadar"],equipments:{hasID:[267],hasSurfaceRadar:!0},ship:{isID:u},bonus:{fire:1,torpedo:3,evasion:2}},{list:[267,"SurfaceRadar"],equipments:{hasID:[267],hasSurfaceRadar:!0},ship:{isClass:[22],isNotID:o},bonus:{fire:2,torpedo:3,evasion:1}},{list:[267,"SurfaceRadar"],equipments:{hasID:[267],hasSurfaceRadar:!0},ship:{isID:[m].concat(r(o))},bonus:{fire:3,torpedo:6,evasion:3}},{list:[267,74],equipments:[{isID:267},{isID:74}],ship:{isID:m},bonus:{fire:3,evasion:-3}},{list:[267,"SurfaceShipPersonnel"],equipments:[{isID:267},{isSurfaceShipPersonnel:!0}],ship:{isID:m},bonus:{fire:2,aa:2,evasion:3}}]},function(e,s,i){"use strict";function r(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}i(3);var a=i(2),n=a.DD_KagerouClass2ndRemodelExcludeAkigumo,t=a.DD_KagerouClass2ndRemodel,o=a.DD_YuugumoClass2ndRemodel,u=a.DD_ShimakazeRemodel,p=i(0),c=p.DD_Kagerou,f=p.DD_KagerouROCN,l=i(1),h=l.丹陽,m=l.秋雲改二,v=l.高波改二,d=l.沖波改二,b=o.filter(function(e){return![v,d].includes(e)});e.exports=[{equipment:366,ship:{isClass:[c,f],isNotID:t.filter(function(e){return e!==h})},bonus:{fire:1,evasion:1}},{equipment:366,ship:{isID:n.filter(function(e){return e!==h})},bonus:{fire:2,aa:2,evasion:1}},{equipment:366,ship:{isID:[50]},bonus:{fire:2,evasion:1}},{equipment:366,ship:{isID:u},bonus:{fire:2,aa:3,evasion:1}},{equipment:366,ship:{isClass:[22],isNotID:o},bonus:{fire:2,evasion:1}},{equipment:366,ship:{isID:b},bonus:{fire:3,aa:3,evasion:1}},{equipment:366,ship:{isID:[v]},bonus:{fire:4,aa:3,evasion:1}},{equipment:366,ship:{isID:[m,d]},bonus:{fire:4,aa:5,evasion:1}},{list:[366,"SurfaceRadar"],equipments:{hasID:[366],hasSurfaceRadar:!0},ship:{isID:[m].concat(r(o),r(u))},bonus:{fire:2,torpedo:4,evasion:2}},{list:[366,"AARadar"],equipments:{hasID:[366],hasAARadar:!0},ship:{isID:[m].concat(r(o),r(u))},bonus:{fire:1,aa:5,evasion:2}},{list:[366,74],equipments:[{isID:366},{isID:74}],ship:{isID:m},bonus:{fire:3,evasion:-3}},{list:[366,"SurfaceShipPersonnel"],equipments:[{isID:366},{isSurfaceShipPersonnel:!0}],ship:{isID:m},bonus:{fire:2,aa:2,evasion:3}}]},function(e,s,i){"use strict";var r=i(0).group_DD_Navy_USN,a=i(1),n=a.丹陽,t=a.雪風改二;e.exports=[{equipment:313,ship:{isClass:r},bonus:{fire:2,aa:2,evasion:1,armor:1}},{equipment:313,ship:{isID:[n,t]},bonus:{fire:2,aa:2,evasion:1,armor:1}}]},function(e,s,i){"use strict";var r=i(0),a=r.group_DD_Navy_USN,n=r.group_CL_Navy_USN,t=i(1),o=t.丹陽,u=t.雪風改二;e.exports=[{equipment:308,ship:{isType:[31]},bonus:{aa:1,evasion:1}},{equipment:308,ship:{isType:[1,19],isNotClass:a,isNotID:[o,u]},bonus:{fire:1}},{equipment:308,ship:{isClass:n},bonus:{fire:1,aa:1,evasion:1}},{equipment:308,ship:{isClass:a},bonus:{fire:2,aa:1,evasion:1}},{equipment:308,ship:{isID:[o,u]},bonus:{fire:2,aa:1,evasion:1}}]},function(e,s,i){"use strict";function r(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}var a=i(2).vmf_DD,n=i(10).Yuubari;e.exports=[{equipment:282,ship:{isID:[].concat(r(a),r(n))},bonus:{fire:2,armor:1}},{list:[282,400],equipments:[{isID:282},{isID:400}],ship:{isID:[].concat(r(a))},bonus:{fire:2}}]},function(e,s,i){"use strict";var r=i(1),a=r.丹陽,n=r.雪風改二;e.exports=[{equipment:398,ship:{isID:[a]},bonusImprove:{0:{fire:4,aa:4,evasion:2},4:{fire:7,aa:4,evasion:4}}},{equipment:398,ship:{isID:[n]},bonusImprove:{0:{fire:3,aa:2,evasion:2},4:{fire:5,aa:2,evasion:3}}},{list:[398,"SurfaceRadar"],equipments:{hasID:[398],hasSurfaceRadar:!0},ship:{isID:[a,n]},bonus:{fire:3,evasion:3}},{list:[398,"AARadar"],equipments:{hasID:[398],hasAARadar:!0},ship:{isID:[a,n]},bonus:{aa:3,evasion:3}}]},function(e,s,i){"use strict";var r=i(1),a=r.丹陽,n=r.雪風改二;e.exports=[{equipment:397,ship:{isID:[a]},bonusImprove:{0:{fire:5,aa:2,evasion:1},4:{fire:9,aa:2,evasion:2}}},{equipment:397,ship:{isID:[n]},bonus:{fire:3,aa:1,evasion:1}},{list:[397,"SurfaceRadar"],equipments:{hasID:[397],hasSurfaceRadar:!0},ship:{isID:[a,n]},bonus:{fire:3,evasion:3}}]},function(e,s,i){"use strict";var r=Object.assign||function(e){for(var s=1;s<arguments.length;s++){var i=arguments[s];for(var r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r])}return e},a=i(0),n=a.BB_Colorado,t=a.CA_Houston,o=a.CL_Tenryuu,u=a.CL_Kuma,p=a.CL_KumaRevised,c=a.CLT_Kuma,f=a.CL_Nagara,l=a.CL_Sendai,h=a.CL_Agano,m=a.CL_AganoRevised,v=a.CL_Yuubari,d=a.CL_Yuubari2,b=a.CL_Ooyodo,y=a.CL_Gotland,g=a.CLV_Gotland,_=a.CL_DeRuyter,C=[{ship:{isClass:[a.CL_Atlanta]},bonus:{fire:1,aa:3,evasion:2}},{ship:{isClass:[n,t]},bonus:{aa:1,evasion:1}},{ship:{isClass:[h,m,b,_]},bonus:{aa:-1,evasion:-2}},{ship:{isClass:[g,y,a.CT_Katori]},bonus:{fire:-2,aa:-1,evasion:-4}},{ship:{isClass:[u,p,c,f,l]},bonus:{fire:-3,aa:-2,evasion:-6}},{ship:{isClass:[o,v,d]},bonus:{fire:-3,aa:-3,evasion:-8}}],D=[];[362,363].forEach(function(e){C.forEach(function(s){D.push(r({equipment:e},s))})}),e.exports=D},function(e,s,i){"use strict";var r=i(0),a=r.CL_Yuubari,n=r.CL_Yuubari2,t=r.CT_Katori,o=r.AV_Nisshin;e.exports=[{equipment:119,ship:{isClass:[a,n,t]},bonus:{fire:1}},{equipment:119,ship:{isClass:[o]},bonus:{fire:2,torpedo:1}}]},function(e,s,i){"use strict";var r=i(0),a=r.CL_Yuubari,n=r.CL_Yuubari2,t=r.CT_Katori,o=r.AV_Nisshin;e.exports=[{equipment:310,ship:{isClass:[a]},bonus:{fire:2,aa:1,evasion:1}},{equipment:310,ship:{isClass:[n]},bonusImprove:{0:{fire:4,aa:1,evasion:2,asw:1},7:{fire:5,torpedo:1,aa:1,evasion:2,asw:1},10:{fire:7,torpedo:1,aa:1,evasion:2,asw:1}}},{equipment:310,ship:{isClass:[t]},bonusImprove:{0:{fire:2,evasion:1},10:{fire:4,evasion:3}}},{equipment:310,ship:{isClass:[o]},bonusImprove:{0:{fire:3,torpedo:2,aa:1,evasion:1},10:{fire:4,torpedo:3,aa:1,evasion:1}}},{list:[310,"SurfaceRadar"],equipments:{hasID:[310],hasSurfaceRadar:!0},ship:{isClass:[n]},bonus:{fire:3,torpedo:2,evasion:2}}]},function(e,s,i){"use strict";var r=i(0),a=r.CL_Agano,n=r.CL_AganoRevised,t=r.CL_Gotland,o=r.CLV_Gotland,u=r.CL_DeRuyter,p=[];[360,361].forEach(function(e){p.push({equipment:e,ship:{isClass:[a,n]},bonus:{fire:1,aa:1}}),p.push({equipment:e,ship:{isClass:[t,o]},bonus:{fire:2,aa:1,evasion:1}}),p.push({equipment:e,ship:{isClass:[u]},bonus:{fire:2,aa:2,evasion:1}})}),e.exports=p},function(e,s,i){"use strict";var r=i(0),a=r.CL_Kuma,n=r.CL_KumaRevised,t=r.CL_Nagara,o=r.CL_Sendai,u=r.CL_Agano,p=r.CL_AganoRevised,c=r.CLT_Kuma,f=r.CL_Gotland,l=r.CLV_Gotland;e.exports=[{equipment:303,ship:{isClass:[a,n,t,o,u,p,c]},bonus:{fire:1,aa:1}},{equipment:303,ship:{isClass:[f,l]},bonus:{fire:1,aa:2,evasion:1}}]},function(e,s,i){"use strict";var r=i(0),a=r.CL_Abruzzi,n=r.CL_Gotland,t=r.CLV_Gotland;e.exports=[{equipment:340,ship:{isClass:[a]},bonus:{fire:1,aa:1,evasion:1}},{equipment:341,ship:{isClass:[n,t]},bonus:{fire:1,aa:1,evasion:1}},{equipment:341,ship:{isClass:[a]},bonus:{fire:2,aa:1,evasion:1}}]},function(e,s,i){"use strict";var r=i(0).CL_AganoRevised;e.exports=[{equipment:139,ship:{isClass:[r]},bonus:{fire:2,aa:1}}]},function(e,s,i){"use strict";var r=i(0).CL_AganoRevised;e.exports=[{equipment:407,ship:{isClass:[r]},bonus:{fire:4,aa:2,evasion:1}},{list:[407,"SurfaceRadar"],equipments:{hasID:[407],hasSurfaceRadar:!0},ship:{isClass:[r]},bonus:{fire:2,torpedo:2,evasion:2}},{list:[407,"AARadar"],equipments:{hasID:[407],hasAARadar:!0},ship:{isClass:[r]},bonus:{aa:2,evasion:3}}]},function(e,s,i){"use strict";var r=i(0),a=r.CL_Perth,n=r.CL_Yuubari,t=r.CL_Yuubari2;e.exports=[{equipment:359,ship:{isClass:t},bonus:{fire:2,aa:2,evasion:1}},{equipment:359,ship:{isClass:n},bonus:{fire:1,aa:1,evasion:1}},{equipment:359,ship:{isClass:a},bonus:{fire:2,aa:2,evasion:1}}]},function(e,s,i){"use strict";function r(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}var a=i(0),n=a.group_BB_exclude_BC_Navy_USN,t=a.group_CA_Navy_USN,o=a.group_CL_Navy_USN,u=[{equipment:386,ship:{isClass:[].concat(r(n),r(t),r(o))},bonusImprove:{0:{fire:1},2:{fire:2},7:{fire:3}}}],p=[{equipment:387,ship:{isClass:[].concat(r(n),r(t),r(o))},bonusImprove:{0:{fire:1},2:{fire:2},7:{fire:3}}}];e.exports=[].concat(u,p)},function(e,s,i){"use strict";var r=i(0).group_CL_Navy_RN;e.exports=[{equipment:399,ship:{isClass:[].concat(function(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}(r))},bonusImprove:{0:{fire:1,evasion:2},3:{fire:2,evasion:2}}}]},function(e,s,i){"use strict";var r=i(0),a=r.CAV_Mogami,n=r.CAV_MogamiRevised,t=r.CAV_MogamiSuper,o=r.CA_Mogami,u=r.CL_Ooyodo;e.exports=[{equipment:5,ship:{isClass:[a,n,t,o,u]},bonus:{fire:1}}]},function(e,s,i){"use strict";var r=i(0),a=r.CAV_Mogami,n=r.CAV_MogamiRevised,t=r.CAV_MogamiSuper,o=r.CA_Mogami,u=r.CL_Ooyodo,p=i(1),c=p.大淀,f=p.大淀改;e.exports=[{equipment:235,ship:{isID:[f]},bonus:{fire:2,aa:1,evasion:1}},{equipment:235,ship:{isID:[c]},bonus:{fire:1,aa:1}},{equipment:235,ship:{isClass:[a,n,t,o]},bonus:{fire:1,aa:1}},{list:[235,"SurfaceRadar"],equipments:{hasID:[235],hasSurfaceRadar:!0},ship:{isClass:[u]},bonus:{fire:3,evasion:2}},{list:[235,"AARadar"],equipments:{hasID:[235],hasAARadar:!0},ship:{isClass:[u]},bonus:{aa:3,evasion:3}}]},function(e,s,i){"use strict";function r(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}var a=i(0),n=a.CA_Furutaka,t=a.CA_Aoba,o=a.group_CAV_Navy_IJN,u=a.group_CA_Navy_IJN,p=i(2).CAV_MogamiClassSuperRemodel;e.exports=[{equipment:90,ship:{isID:[416,417,295].concat(r(p))},bonus:{fire:2}},{equipment:90,ship:{isID:[264]},bonus:{fire:2,aa:1}},{equipment:90,ship:{isID:[142]},bonus:{fire:3,evasion:1}},{equipment:90,ship:{isClass:[].concat(r(u),r(o)),isNotID:[416,417,264,295,142].concat(r(p))},bonus:{fire:1}},{list:[90,"SurfaceRadar"],equipments:{hasID:[90],hasSurfaceRadar:!0},ship:{isClass:[n,t]},bonus:{fire:3,torpedo:2,evasion:2}},{list:[90,"AARadar"],equipments:{hasID:[90],hasAARadar:!0},ship:{isID:[264]},bonus:{aa:5,evasion:2}}]},function(e,s,i){"use strict";function r(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}i(3);var a=i(0),n=a.CAV_Mogami,t=a.CAV_MogamiRevised,o=a.CAV_Tone,u=a.CA_Furutaka,p=a.CA_Aoba,c=a.CA_Myoukou,f=a.CA_Takao,l=a.CA_Mogami,h=a.CA_Tone,m=i(2).CAV_MogamiClassSuperRemodel;e.exports=[{equipment:50,ship:{isID:[].concat(r(m))},bonusCount:{1:{fire:3,evasion:1},2:{fire:8,evasion:2},3:{fire:12,evasion:3},4:{fire:16,evasion:3}}},{equipment:50,ship:{isClass:[l,n,t,h,o]},bonusCount:{1:{fire:2,evasion:1},2:{fire:6,evasion:2},3:{fire:9,evasion:3},4:{fire:12,evasion:4}}},{equipment:50,ship:{isClass:[c,f]},bonus:{fire:2,evasion:1}},{equipment:50,ship:{isClass:[u,p]},bonus:{fire:1}},{list:[50,"SurfaceRadar"],equipments:{hasID:[50],hasSurfaceRadar:!0},ship:{isClass:[u,p]},bonus:{fire:1,torpedo:1,evasion:1}},{list:[50,"SurfaceRadar"],equipments:{hasID:[50],hasSurfaceRadar:!0},ship:{isID:[].concat(r(m))},bonus:{fire:4,torpedo:2,evasion:3}},{list:[50,30],equipments:[{isID:50},{isID:30}],ship:{isID:[].concat(r(m))},bonus:{fire:1,aa:3,evasion:2}},{list:[50,410],equipments:[{isID:50},{isID:410}],ship:{isID:[].concat(r(m))},bonus:{fire:3,aa:3,evasion:2}},{list:[50,"SurfaceRadar"],equipments:{hasID:[50],hasSurfaceRadar:!0},ship:{isClass:[c,f,l,n,t,h,o]},bonus:{fire:3,torpedo:2,evasion:2}}]},function(e,s,i){"use strict";var r=i(0),a=r.CA_Mogami,n=r.CAV_Mogami,t=r.CAV_MogamiRevised,o=r.CAV_MogamiSuper,u=r.CA_Houston,p=[];[356,357].forEach(function(e){p.push({equipment:e,ship:{isClass:[a,n,t,o]},bonus:{fire:1}}),p.push({equipment:e,ship:{isClass:[u]},bonus:{fire:2}})}),e.exports=p},function(e,s,i){"use strict";var r=i(1).榛名改二;e.exports=[{equipment:104,ship:{isID:[149]},bonus:{fire:2}},{equipment:104,ship:{isID:[150,152]},bonus:{fire:1}},{equipment:104,ship:{isID:[r]},bonus:{fire:2,aa:1,evasion:2}}]},function(e,s,i){"use strict";function r(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}var a=i(4),n=a.Kongou,t=a.Hiei,o=a.Haruna,u=a.Kirishima,p=a.Ise,c=a.Hyuuga,f=a.Fusou,l=a.Yamashiro,h=i(2).BB_KongouClassRemodelAll,m=i(1).比叡改二丙;e.exports=[{equipment:328,ship:{isID:[].concat(r(n),r(t),r(o),r(u),r(p),r(c),r(f),r(l)).filter(function(e){return!h.includes(e)})},bonus:{fire:1}},{equipment:328,ship:{isID:h.filter(function(e){return 591!==e&&e!==m})},bonus:{fire:2,evasion:1}},{equipment:328,ship:{isID:[591]},bonus:{fire:3,torpedo:1,evasion:1}},{equipment:328,ship:{isID:[m]},bonus:{fire:3,aa:1,evasion:1}}]},function(e,s,i){"use strict";function r(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}var a=i(4),n=a.Kongou,t=a.Hiei,o=a.Haruna,u=a.Kirishima,p=a.Ise,c=a.Hyuuga,f=a.Fusou,l=a.Yamashiro,h=i(2),m=h.BB_KongouClassRemodel,v=h.BB_KongouClass2ndRemodel,d=h.BB_KongouClassRemodelAll,b=i(1),y=b.金剛改二丙,g=b.比叡改二丙;e.exports=[{equipment:329,ship:{isID:[].concat(r(n),r(t),r(o),r(u),r(p),r(c),r(f),r(l)).filter(function(e){return!d.includes(e)})},bonus:{fire:1}},{equipment:329,ship:{isID:m},bonus:{fire:2,evasion:1}},{equipment:329,ship:{isID:v.filter(function(e){return 591!==e&&e!==g})},bonus:{fire:3,aa:1,evasion:1}},{equipment:329,ship:{isID:[y,g]},bonus:{fire:4,torpedo:2,aa:1,evasion:1}}]},function(e,s,i){"use strict";var r=i(1).榛名改二;e.exports=[{equipment:289,ship:{isID:[149]},bonus:{fire:2,aa:1}},{equipment:289,ship:{isID:[150,152]},bonus:{fire:1}},{equipment:289,ship:{isID:[r]},bonus:{fire:2,aa:2,evasion:2}},{list:[289,"SurfaceRadar"],equipments:{hasID:[289],hasSurfaceRadar:!0},ship:{isID:[149,r]},bonus:{fire:2,evasion:2}}]},function(e,s,i){"use strict";var r=i(2),a=r.BB_NagatoClass2ndRemodel,n=r.BB_IseClassRemodel,t=r.BB_IseClassRemodelAll,o=r.BB_FusouClass2ndRemodel;e.exports=[{equipment:318,ship:{isID:o},bonus:{fire:1}},{equipment:318,ship:{isID:n},bonus:{fire:2,aa:2,evasion:2}},{equipment:318,ship:{isID:[553]},bonus:{fire:2,aa:2,evasion:2,hit:3}},{equipment:318,ship:{isID:[554]},bonus:{fire:3,aa:2,evasion:2,hit:3}},{equipment:318,ship:{isID:a},bonus:{fire:3,aa:2,evasion:1,hit:2}},{list:[318,290],equipments:{hasID:[318,290]},ship:{isID:[554]},bonus:{fire:1,evasion:2,armor:1,hit:1}},{list:[318,290],equipments:{hasID:[318,290]},ship:{isID:[553].concat(function(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}(n))},bonus:{evasion:2,armor:1}},{list:[318,290],equipments:{hasID:[318,290]},ship:{isID:a},bonus:{fire:2,evasion:2,armor:1,hit:1}},{list:[318,"AARadar"],equipments:{hasID:[318],hasAARadar:!0},ship:{isID:t},bonus:{aa:2,evasion:3,hit:1}}]},function(e,s,i){"use strict";var r=i(2),a=r.BB_IseClassRemodel,n=r.BB_IseClassRemodelAll,t=r.BB_FusouClass2ndRemodel;e.exports=[{equipment:290,ship:{isID:t},bonus:{fire:1}},{equipment:290,ship:{isID:a},bonus:{fire:2,aa:2,evasion:1}},{equipment:290,ship:{isID:[553]},bonus:{fire:3,aa:2,evasion:1,hit:3}},{equipment:290,ship:{isID:[554]},bonus:{fire:3,aa:2,evasion:2,hit:3}},{list:[290,"AARadar"],equipments:{hasID:[290],hasAARadar:!0},ship:{isID:n},bonus:{aa:2,evasion:3}}]},function(e,s,i){"use strict";function r(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}var a=i(2),n=a.BB_NagatoClassRemodel,t=a.BB_NagatoClass2ndRemodel,o=a.BB_NelsonClassRemodel,u=i(4).Colorado;e.exports=[{equipment:330,ship:{isID:[].concat(r(n),r(u))},bonus:{fire:1}},{equipment:330,ship:{isID:[].concat(r(t),r(o))},bonus:{fire:2}},{equipment:331,ship:{isID:[].concat(r(n),[601])},bonus:{fire:1}},{equipment:331,ship:{isID:[].concat(r(t),r(o))},bonus:{fire:2}},{equipment:331,ship:{isID:[1496]},bonus:{fire:2,evasion:1}},{equipment:332,ship:{isID:[].concat(r(n),[601])},bonus:{fire:1}},{equipment:332,ship:{isID:[].concat(r(t),r(o))},bonus:{fire:2}},{equipment:332,ship:{isID:[1496]},bonus:{fire:2,aa:1}}]},function(e,s,i){"use strict";function r(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}var a=i(0),n=a.BB_Iowa,t=a.BB_SouthDakota,o=a.BB_Kongou,u=a.BB_Kongou2,p=a.BB_Bismarck,c=a.BB_VittorioVeneto,f=a.BB_Richelieu,l=a.BB_Gangut,h=a.group_BB_Navy_USN,m=a.group_BC_Navy_USN,v=a.group_BB_exclude_BC_Navy_USN,d=[n].concat(r(v)),b=m.filter(function(e){return e!==n}),y=h.filter(function(e){return e!==t}),g=[{equipment:381,ship:{isClass:[].concat(r(y))},bonusImprove:{0:{fire:1},6:{fire:2}}},{equipment:381,ship:{isClass:[t]},bonusImprove:{0:{fire:2},6:{fire:3}}}],_=[{equipment:385,ship:{isClass:[o,u,p,c,f,l]},bonus:{fire:1}},{equipment:385,ship:{isClass:[].concat(r(d))},bonusImprove:{0:{fire:2},6:{fire:3},10:{fire:3,armor:1}}},{equipment:385,ship:{isClass:[].concat(r(b))},bonusImprove:{0:{fire:3,armor:1},6:{fire:4,armor:1},10:{fire:4,armor:2}}}],C=[{equipment:390,ship:{isClass:[o,u,p,c,f,l]},bonus:{fire:1}},{equipment:390,ship:{isClass:[].concat(r(d))},bonusImprove:{0:{fire:2},3:{fire:3},6:{fire:3,armor:1}}},{equipment:390,ship:{isClass:[].concat(r(b))},bonusImprove:{0:{fire:3,armor:1},3:{fire:4,armor:1},6:{fire:4,armor:1,evasion:1}}}];e.exports=[].concat(g,_,C)},function(e,s,i){"use strict";var r=Object.assign||function(e){for(var s=1;s<arguments.length;s++){var i=arguments[s];for(var r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r])}return e},a=i(0),n=a.BB_QueenElizabeth,t=a.BB_Nelson,o=i(2).BB_KongouClass2ndRemodel,u=i(1).比叡改二丙,p={ship:{isClass:[t]},bonus:{fire:2,armor:1}},c={ship:{isClass:[n]},bonus:{fire:2,armor:1,evasion:-2}},f={ship:{isID:o.filter(function(e){return 591!==e&&e!==u})},bonus:{fire:1,armor:1,evasion:-3}},l=[];[298,299,300].forEach(function(e){l.push(r({equipment:e},f)),l.push(r({equipment:e},c)),l.push(r({equipment:e},p))}),e.exports=l},function(e,s,i){"use strict";function r(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}i(3);var a=i(2),n=a.CAV_MogamiClassSuperRemodel,t=a.CL_AganoClass2ndRemodel;e.exports=[{equipment:66,ship:{isID:[].concat(r(n))},bonus:{fire:1,aa:2,evasion:2}},{equipment:66,ship:{isID:[].concat(r(t))},bonus:{aa:2,evasion:1}},{list:[66,"AARadar"],equipments:{hasID:[66],hasAARadar:!0},ship:{isID:[].concat(r(n),r(t))},bonus:{aa:1,evasion:2}}]},function(e,s,i){"use strict";function r(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}i(3);var a=i(2),n=a.CAV_MogamiClassSuperRemodel,t=a.CL_AganoClass2ndRemodel;e.exports=[{equipment:220,ship:{isID:[].concat(r(n))},bonus:{fire:2,aa:5,evasion:4}},{equipment:220,ship:{isID:[].concat(r(t))},bonus:{fire:1,aa:5,evasion:3}},{list:[220,"AARadar"],equipments:{hasID:[220],hasAARadar:!0},ship:{isID:[].concat(r(n),r(t))},bonus:{aa:4,evasion:5}},{list:[66,220,"AARadar"],equipments:[{isID:66},{isID:220},{isAARadar:!0}],ship:{isID:[].concat(r(n),r(t))},bonus:{aa:-1,evasion:-2}}]},function(e,s,i){"use strict";function r(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}var a=i(0),n=a.CL_Brooklyn,t=a.group_CA_Navy_USN,o=a.group_BB_Navy_USN,u=a.group_CV_Navy_USN,p=a.group_CL_Navy_USN,c=a.group_BB_Navy_RN,f=a.group_CV_Navy_RN;e.exports=[{equipment:358,ship:{isClass:[].concat(r(t),[n])},bonus:{fire:2,aa:3,evasion:3}},{equipment:358,ship:{isClass:[].concat(r(o),r(u),r(p.filter(function(e){return e!==n})),r(c),r(f))},bonus:{fire:1,aa:1,evasion:1}}]},function(e,s,i){"use strict";var r=i(0).DD_Kamikaze,a=i(1).比叡改二丙;e.exports=[{equipment:174,ship:{isClass:[r]},bonus:{torpedo:1,evasion:2}},{equipment:174,ship:{isID:[591,a]},bonus:{torpedo:6,evasion:3}},{list:[174,140],equipments:[{isID:174},{isID:140}],ship:{isID:[a]},bonus:{torpedo:5}}]},function(e,s,i){"use strict";e.exports=[{equipment:67,ship:{canEquip:[12],isNotType:[13,14]},bonus:{torpedo:-5}}]},function(e,s,i){"use strict";var r=i(2).vmf_DD,a=[{equipment:283,ship:{isID:r},bonus:{fire:1,torpedo:3,armor:1}}],n=[{equipment:400,ship:{isID:r},bonus:{fire:1,torpedo:5,armor:1,evasion:2}}];e.exports=[].concat(a,n)},function(e,s,i){"use strict";function r(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}var a=i(0),n=a.group_CA_Navy_USN,t=a.group_CL_Navy_USN,o=a.group_DD_Navy_USN,u=a.group_CL_Navy_RAN,p=a.group_CL_Navy_RN,c=a.group_DD_Navy_RN,f=[{equipment:314,ship:{isClass:o},bonus:{fire:1,torpedo:3}}],l=[{equipment:376,ship:{isClass:[].concat(r(n),r(t),r(o))},bonus:{fire:2,torpedo:4}},{equipment:376,ship:{isClass:[].concat(r(p),r(c))},bonus:{fire:1,torpedo:2}},{equipment:376,ship:{isClass:[].concat(r(u))},bonus:{fire:1,torpedo:1}}];e.exports=[].concat(f,l)},function(e,s,i){"use strict";function r(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}var a=i(2),n=a.DD_FubukiClass2ndRemodel,t=a.DD_AyanamiClass2ndRemodel,o=a.DD_AkatsukiClass2ndRemodel,u=a.DD_HatsuharuClass2ndRemodel;e.exports=[{equipment:285,ship:{isID:[].concat(r(n),r(t),r(o),r(u))},bonusImprove:{0:{torpedo:2,evasion:1},10:{fire:1,torpedo:2,evasion:1}}}]},function(e,s,i){"use strict";var r=i(2).DD_KagerouClass2ndRemodel,a=i(1),n=a.竹,t=a.竹改;e.exports=[{equipment:15,ship:{isID:r},bonusCount:{1:{torpedo:2},2:{torpedo:4}}},{equipment:15,ship:{isID:[n,t]},bonusCount:{1:{torpedo:5,evasion:1}}}]},function(e,s,i){"use strict";var r=i(2),a=r.DD_ShiratsuyuClass2ndRemodel,n=r.DD_AsashioClass2ndRemodel,t=r.DD_KagerouClass2ndRemodel,o=r.DD_YuugumoClass2ndRemodel,u=i(0).CL_AganoRevised,p=i(1),c=p.竹,f=p.竹改,l=a.concat(n,o);e.exports=[{equipment:286,ship:{isClass:[u]},bonus:{torpedo:2}},{equipment:286,ship:{isID:l},bonusImprove:{0:{torpedo:2,evasion:1},10:{fire:1,torpedo:2,evasion:1}}},{equipment:286,ship:{isID:t},bonusImprove:{0:{torpedo:2,evasion:1},5:{torpedo:3,evasion:1},10:{fire:1,torpedo:3,evasion:1}}},{equipment:286,ship:{isID:[c,f]},bonusImprove:{0:{torpedo:7,evasion:2},7:{torpedo:9,evasion:2},10:{torpedo:11,evasion:2}}},{list:[286,"SurfaceRadar"],equipments:{hasID:[286],hasSurfaceRadar:!0},ship:{isClass:[u]},bonus:{torpedo:3,evasion:2}}]},function(e,s,i){"use strict";var r=i(0),a=r.CLT_Kuma,n=r.DD_Shimakaze,t=r.DD_Akizuki;e.exports=[{equipment:58,ship:{isClass:[a,n,t]},bonus:{torpedo:1}}]},function(e,s,i){"use strict";var r=i(0).DD_Akizuki;e.exports=[{equipment:179,ship:{isClass:r},bonus:{torpedo:1}}]},function(e,s,i){"use strict";e.exports=[].concat([{list:[213,384],equipments:[{isID:213},{isID:384}],ship:{isType:[13,14]},bonus:{torpedo:3,evasion:2}}])},function(e,s,i){"use strict";e.exports=[].concat([{list:[214,384],equipments:[{isID:214},{isID:384}],ship:{isType:[13,14]},bonus:{torpedo:3,evasion:2}}])},function(e,s,i){"use strict";function r(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}var a=i(4),n=a.I47,t=a.I58,o=a.I400,u=a.I401,p=[{equipment:383,ship:{isID:[].concat(r(t))},bonus:{torpedo:1}},{equipment:383,ship:{isID:[].concat(r(o),r(u))},bonus:{torpedo:2}},{equipment:383,ship:{isID:[].concat(r(n))},bonus:{torpedo:3}}];e.exports=[].concat(p,[{list:[383,384],equipments:[{isID:383},{isID:384}],ship:{isType:[13,14]},bonus:{torpedo:3,evasion:2}}])},function(e,s,i){"use strict";var r=i(0).CL_Ooyodo;e.exports=[{equipment:118,ship:{isClass:[r]},bonusImprove:{0:{fire:1,evasion:2,los:2},10:{fire:3,evasion:2,los:3}}}]},function(e,s,i){"use strict";function r(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}i(3);var a=i(0),n=a.group_BB_Navy_USN,t=a.group_CA_Navy_USN,o=a.group_CL_Navy_USN;e.exports=[{equipment:414,ship:{isClass:[].concat(r(n))},bonusImprove:{0:{los:1},8:{los:1,evasion:1}}},{equipment:414,ship:{isClass:[].concat(r(t),r(o))},bonusImprove:{0:{fire:1,los:2},4:{fire:1,los:3},8:{fire:1,los:3,evasion:2},10:{fire:2,los:3,evasion:2}}}]},function(e,s,i){"use strict";function r(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}i(3);var a=i(0),n=a.group_BB_Navy_USN,t=a.group_CA_Navy_USN,o=a.group_CL_Navy_USN;e.exports=[{equipment:415,ship:{isClass:[].concat(r(n))},bonus:{los:1,asw:1}},{equipment:415,ship:{isClass:[].concat(r(t),r(o))},bonus:{fire:1,asw:1,los:1}}]},function(e,s,i){"use strict";function r(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}i(3);var a=i(0),n=a.group_BB_Navy_USN,t=a.group_CA_Navy_USN,o=a.group_CL_Navy_USN;e.exports=[{equipment:171,ship:{isClass:[].concat(r(n))},bonusImprove:{0:{fire:1,los:1},3:{fire:1,los:2},5:{fire:1,los:2,evasion:1},8:{fire:1,los:3,evasion:1},10:{fire:2,los:3,evasion:2}}},{equipment:171,ship:{isClass:[].concat(r(t),r(o))},bonusImprove:{5:{los:1},10:{fire:1,los:1}}}]},function(e,s,i){"use strict";var r=i(0),a=r.CL_Kuma,n=r.CL_KumaRevised,t=r.CL_Nagara,o=r.CL_Sendai,u=r.CL_Agano,p=r.CL_AganoRevised,c=r.CLT_Kuma,f=r.CL_Gotland,l=r.CLV_Gotland;e.exports=[{equipment:304,ship:{isClass:[a,n,t,o,u,p,c]},bonus:{fire:1,evasion:1,asw:1}},{equipment:304,ship:{isClass:[f,l]},bonus:{fire:1,evasion:2,asw:2}}]},function(e,s,i){"use strict";var r=i(0),a=r.BB_QueenElizabeth,n=r.BB_Nelson,t=r.CL_Gotland,o=r.CLV_Gotland,u=r.AV_CommandantTeste,p=r.AV_Mizuho,c=r.AO_Kamoi,f=r.AV_Kamoi,l=i(1),h=l.Gotland,m=l.Gotland改,v=l["Gotland andra"];e.exports=[{equipment:367,ship:{isClass:[t,o]},bonus:{fire:2,asw:1,los:1,evasion:1}},{equipment:367,ship:{isClass:[u]},bonus:{fire:1,asw:1,los:1,evasion:1}},{equipment:367,ship:{isClass:[p,c,f]},bonus:{fire:1,los:1,evasion:1}},{equipment:368,ship:{isID:[h,m]},bonus:{fire:4,asw:3,los:3,evasion:2}},{equipment:368,ship:{isID:[v]},bonusCount:{1:{fire:6,torpedo:2,asw:3,los:4,evasion:3},2:{fire:10,torpedo:2,asw:6,los:7,evasion:5}}},{equipment:368,ship:{isClass:[u]},bonus:{fire:2,asw:3,los:2,evasion:1}},{equipment:368,ship:{isClass:[p,c,f]},bonus:{fire:1,asw:2,los:2,evasion:1}},{equipment:369,ship:{isID:[h,m]},bonus:{fire:5,asw:4,los:3,evasion:4}},{equipment:369,ship:{isID:[v]},bonus:{fire:8,torpedo:3,asw:4,los:5,evasion:6}},{equipment:369,ship:{isClass:[u]},bonus:{fire:3,asw:3,los:3,evasion:2}},{equipment:369,ship:{isClass:[p,c,f]},bonus:{fire:2,asw:2,los:2,evasion:1}},{equipment:370,ship:{isClass:[t,o]},bonus:{fire:1,asw:3,los:2,evasion:1}},{equipment:370,ship:{isClass:[u]},bonus:{fire:1,asw:3,los:1,evasion:1}},{equipment:370,ship:{isClass:[p,c,f]},bonus:{fire:1,asw:2,los:1,evasion:1}},{equipment:370,ship:{isClass:[a]},bonus:{fire:6,asw:3,los:3,evasion:3}},{equipment:370,ship:{isClass:[n]},bonus:{fire:2,asw:3,los:2,evasion:2}}]},function(e,s,i){"use strict";var r=i(0),a=r.BB_QueenElizabeth,n=r.BB_Nelson,t=r.BB_Richelieu,o=r.AV_CommandantTeste,u=i(1),p=u.Gotland,c=u.Gotland改,f=u["Gotland andra"];e.exports=[{equipment:371,ship:{isID:[p,c]},bonus:{fire:4,asw:2,los:6,evasion:3}},{equipment:371,ship:{isID:[f]},bonus:{fire:6,asw:2,los:9,evasion:5}},{equipment:371,ship:{isClass:[o]},bonus:{fire:2,asw:1,los:4,evasion:2}},{equipment:371,ship:{isClass:[a]},bonus:{fire:3,asw:1,los:3,evasion:2}},{equipment:371,ship:{isClass:[n]},bonus:{fire:6,asw:1,los:5,evasion:1}},{equipment:371,ship:{isClass:[t]},bonus:{fire:2,los:3,evasion:1}}]},function(e,s,i){"use strict";var r=i(0),a=r.group_BB_Navy_KM,n=r.group_CA_Navy_KM;e.exports=[{equipment:115,ship:{isClass:[a,n]},bonusImprove:{0:{fire:2,evasion:1,los:2},10:{fire:3,evasion:2,los:2}}}]},function(e,s,i){"use strict";function r(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}var a=i(4),n=a.Mizuho,t=a.Kamoi,o=a.CommandantTeste;e.exports=[{equipment:194,ship:{isID:[].concat(r(n),r(t))},bonus:{evasion:1,los:2}},{equipment:194,ship:{isID:[].concat(r(o))},bonus:{fire:3,evasion:2,los:2}},{equipment:194,ship:{isID:[392]},bonus:{fire:1,evasion:2,los:2}}]},function(e,s,i){"use strict";var r=i(2),a=r.BB_IseClass2ndRemodel,n=r.BB_IseClassRemodel_PLUS_FusouClass2ndRemodel;e.exports=[{equipment:79,ship:{isID:n},bonus:{fire:2}},{equipment:79,ship:{isID:a},bonus:{fire:3}}]},function(e,s,i){"use strict";var r=i(2),a=r.BB_IseClass2ndRemodel,n=r.BB_IseClassRemodel_PLUS_FusouClass2ndRemodel;e.exports=[{equipment:81,ship:{isID:n},bonus:{fire:2}},{equipment:81,ship:{isID:a},bonus:{fire:3}}]},function(e,s,i){"use strict";var r=i(2),a=r.BB_IseClassRemodel,n=r.BB_IseClass2ndRemodel,t=r.BB_FusouClass2ndRemodel;e.exports=[{equipment:237,ship:{isID:t},bonus:{fire:2}},{equipment:237,ship:{isID:a},bonus:{fire:3,evasion:1}},{equipment:237,ship:{isID:n},bonus:{fire:4,evasion:2}}]},function(e,s,i){"use strict";var r=i(2).BB_IseClass2ndRemodel;e.exports=[{equipment:322,ship:{isID:r},bonus:{fire:5,aa:2,asw:1,evasion:2}}]},function(e,s,i){"use strict";var r=i(2).BB_IseClass2ndRemodel;e.exports=[{equipment:323,ship:{isID:r},bonus:{fire:6,aa:3,asw:2,evasion:3}}]},function(e,s,i){"use strict";i(3);var r=i(2).CAV_MogamiClassSuperRemodel;e.exports=[{equipment:217,ship:{isID:[].concat(function(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}(r))},bonus:{fire:1,aa:5,evasion:3}}]},function(e,s,i){"use strict";var r=i(0),a=r.CV_Houshou,n=r.CV_Kagasumaru,t=r.CV_Taiyou_SP,o=r.CV_Taiyou;e.exports=[{equipment:19,ship:{isType:[9],isNotClass:[a,n,t,o]},bonus:{aa:1,evasion:1}},{equipment:19,ship:{isClass:[a]},bonus:{fire:2,aa:3,asw:2,evasion:3}},{equipment:19,ship:{isClass:[n,t,o]},bonus:{fire:2,aa:1,asw:3,evasion:1}},{equipment:228,ship:{isType:[9],isNotClass:[a,n,t,o]},bonus:{aa:1,asw:2,evasion:1}},{equipment:228,ship:{isClass:[a]},bonus:{fire:3,aa:4,asw:6,evasion:5}},{equipment:228,ship:{isClass:[n,t,o]},bonus:{fire:2,aa:2,asw:7,evasion:2}}]},function(e,s,i){"use strict";function r(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}var a=i(2),n=a.CV_AkagiClass2ndRemodel,t=a.CV_KagaClass2ndRemodel,o=i(1),u=o.赤城改,p=o.加賀改;e.exports=[{equipment:335,ship:{isID:[u,p]},bonus:{aa:1,evasion:1}},{equipment:335,ship:{isID:[].concat(r(n),r(t))},bonus:{aa:2,evasion:1}}]},function(e,s,i){"use strict";function r(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}var a=i(2),n=a.CV_AkagiClass2ndRemodel,t=a.CV_KagaClass2ndRemodel,o=i(1),u=o.赤城改,p=o.加賀改;e.exports=[{equipment:336,ship:{isID:[u,p]},bonus:{fire:1,aa:1,evasion:1}},{equipment:336,ship:{isID:[].concat(r(n),r(t))},bonus:{fire:1,aa:2,evasion:1}}]},function(e,s,i){"use strict";var r=i(1),a=r.赤城改,n=r.赤城改二,t=r.赤城改二戊,o=r.加賀改,u=r.加賀改二,p=r.加賀改二戊,c=r.加賀改二護;e.exports=[{equipment:338,ship:{isID:[a,o]},bonus:{fire:1,aa:1,evasion:2}},{equipment:338,ship:{isID:[n,u,c]},bonus:{fire:1,aa:2,evasion:3}},{equipment:338,ship:{isID:[t,p]},bonus:{fire:4,aa:3,evasion:4}},{equipment:339,ship:{isID:[a,o]},bonus:{fire:1,aa:2,evasion:2}},{equipment:339,ship:{isID:[n,u,c]},bonus:{fire:1,aa:3,evasion:4}},{equipment:339,ship:{isID:[t,p]},bonus:{fire:6,aa:4,evasion:5}}]},function(e,s,i){"use strict";var r=i(0).group_CV_Navy_RM;e.exports=[{equipment:184,ship:{isClass:r},bonus:{fire:1,aa:2,evasion:3}}]},function(e,s,i){"use strict";function r(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}var a=i(0),n=a.group_CV_Navy_RM,t=a.group_CV_Navy_KM;e.exports=[{equipment:189,ship:{isClass:[].concat(r(n),r(t))},bonus:{aa:1,evasion:2}}]},function(e,s,i){"use strict";i(3);var r=i(0),a=r.CV_Essex,n=r.CV_Casablanca,t=r.CV_ArkRoyal,o=r.group_CV_Navy_USN;e.exports=[{equipment:422,ship:{isClass:[n]},bonus:{fire:3,aa:2,evasion:3}},{equipment:422,ship:{isClass:[a]},bonus:{fire:2,aa:1,evasion:1}},{equipment:422,ship:{isClass:[].concat(function(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}(o),[t]).filter(function(e){return![n,a].includes(e)})},bonus:{fire:1,evasion:1}}]},function(e,s,i){"use strict";var r=i(0),a=r.CV_Kaga,n=r.CV_KagaRevised,t=r.group_CV_Navy_USN;e.exports=[{equipment:375,ship:{isClass:[].concat(function(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}(t))},bonus:{fire:3,aa:3,asw:3,evasion:3}},{equipment:375,ship:{isClass:[a,n]},bonus:{fire:1,aa:1,asw:1,evasion:1}}]},function(e,s,i){"use strict";i(3);var r=i(0),a=r.CVL_Ryuuhou,n=r.CVL_Shouhou,t=r.CVL_Hiyou,o=r.CVL_Chitose,u=i(1),p=u.龍鳳改二戊,c=u.龍鳳改二,f=[];[60,154,219].forEach(function(e){f.push({equipment:e,ship:{isClass:[a,n,t,o]},bonus:{fire:1,aa:1,evasion:1}}),f.push({equipment:e,ship:{isID:[p,c]},bonus:{fire:2,aa:1,evasion:2}})}),e.exports=f},function(e,s,i){"use strict";var r=i(1),a=r.翔鶴改,n=r.瑞鶴改,t=r.龍鳳,o=r.龍鳳改,u=r.龍鳳改二,p=r.龍鳳改二戊,c=r.祥鳳改,f=r.瑞鳳,l=r.瑞鳳改,h=r.瑞鳳改二,m=r.瑞鳳改二乙,v=[{equipment:392,ship:{isID:[r.飛鷹改,r.隼鷹改二]},bonus:{fire:1,evasion:1}},{equipment:392,ship:{isID:[t,f]},bonus:{fire:2,evasion:1}},{equipment:392,ship:{isID:[a,n,o,u,p,c,l]},bonus:{fire:2,evasion:2}},{equipment:392,ship:{isID:[h,m]},bonus:{fire:3,evasion:2}}];e.exports=[].concat(v)},function(e,s,i){"use strict";var r=i(4),a=r.Souryuu,n=r.Hiryuu;e.exports=[{equipment:99,ship:{isID:a},bonusCount:{1:{fire:4}}},{equipment:99,ship:{isID:n},bonusCount:{1:{fire:1}}}]},function(e,s,i){"use strict";var r=i(2).BB_IseClass2ndRemodel;e.exports=[{equipment:24,ship:{isID:r},bonus:{fire:2}}]},function(e,s,i){"use strict";var r=i(2).BB_IseClass2ndRemodel;e.exports=[{equipment:111,ship:{isID:r},bonus:{fire:2}}]},function(e,s,i){"use strict";var r=i(2).BB_IseClass2ndRemodel;e.exports=[{equipment:57,ship:{isID:r},bonus:{fire:2}}]},function(e,s,i){"use strict";var r=i(4),a=r.Souryuu,n=r.Hiryuu,t=i(2).BB_IseClass2ndRemodel;e.exports=[{equipment:100,ship:{isID:t},bonus:{fire:4}},{equipment:100,ship:{isID:a},bonusCount:{1:{fire:6}}},{equipment:100,ship:{isID:n},bonusCount:{1:{fire:3}}}]},function(e,s,i){"use strict";var r=i(2).BB_IseClass2ndRemodel;e.exports=[{equipment:291,ship:{isID:r},bonus:{fire:6,evasion:1}}]},function(e,s,i){"use strict";var r=i(2).BB_IseClass2ndRemodel;e.exports=[{equipment:292,ship:{isID:r},bonus:{fire:8,aa:1,evasion:2}}]},function(e,s,i){"use strict";var r=i(2).BB_IseClass2ndRemodel;e.exports=[{equipment:319,ship:{isID:r},bonus:{fire:7,aa:3,evasion:2}}]},function(e,s,i){"use strict";e.exports=[{equipment:320,ship:{isID:[553]},bonus:{fire:2}},{equipment:320,ship:{isID:[554]},bonus:{fire:4}},{equipment:320,ship:{isID:[197,196]},bonus:{fire:3}},{equipment:320,ship:{isID:[508,509]},bonus:{fire:4}}]},function(e,s,i){"use strict";var r=Object.assign||function(e){for(var s=1;s<arguments.length;s++){var i=arguments[s];for(var r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r])}return e};function a(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}var n=i(0),t=n.group_CV_Navy_RM,o=n.group_CV_Navy_KM,u={ship:{isClass:[].concat(a(t),a(o))},bonus:{fire:1,evasion:1}},p={ship:{isID:[526,380,529]},bonus:{asw:1,evasion:1}},c={ship:{isID:[534,381,536]},bonus:{asw:3,evasion:2}};e.exports=[r({equipment:305},u),r({equipment:305},p),r({equipment:305},c),r({equipment:306},u),r({equipment:306},p),r({equipment:306},c)]},function(e,s,i){"use strict";var r=i(0).group_CV_Navy_RM;e.exports=[{equipment:316,ship:{isClass:r},bonus:{fire:4,aa:1,evasion:1}}]},function(e,s,i){"use strict";i(3);var r=i(0),a=r.CV_Casablanca,n=r.CV_ArkRoyal,t=r.group_CV_Navy_USN;e.exports=[{equipment:277,ship:{isClass:[a]},bonus:{fire:2,aa:1,evasion:2}},{equipment:277,ship:{isClass:[].concat(function(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}(t),[n]).filter(function(e){return e!==a})},bonus:{fire:1,evasion:1}}]},function(e,s,i){"use strict";i(3);var r=i(0).group_CV_Navy_USN;e.exports=[{equipment:195,ship:{isClass:[].concat(function(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}(r))},bonus:{fire:1}}]},function(e,s,i){"use strict";i(3);var r=i(0).group_CV_Navy_USN;e.exports=[{equipment:419,ship:{isClass:[].concat(function(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}(r))},bonusImprove:{0:{fire:2},2:{fire:3},7:{fire:4}}}]},function(e,s,i){"use strict";i(3);var r=i(0),a=r.CVB_Lexington,n=r.CV_Lexington,t=r.CV_Essex,o=r.CV_Yorktown,u=r.CV_Casablanca,p=r.CV_ArkRoyal;e.exports=[{equipment:420,ship:{isClass:t},bonusImprove:{0:{fire:2},3:{fire:3}}},{equipment:420,ship:{isClass:[a,n,o]},bonusImprove:{0:{fire:1},3:{fire:2}}},{equipment:420,ship:{isClass:[p]},bonusImprove:{3:{fire:1}}},{equipment:420,ship:{isClass:[u]},bonusImprove:{0:{fire:-1,armor:-2,evasion:-1},3:{armor:-2,evasion:-1}}},{equipment:420,ship:{isType:[9],isNotClass:[u]},bonus:{fire:-2,armor:-2,evasion:-1}}]},function(e,s,i){"use strict";i(3);var r=i(0),a=r.CVB_Lexington,n=r.CV_Lexington,t=r.CV_Essex,o=r.CV_Yorktown,u=r.CV_Casablanca,p=r.CV_ArkRoyal;e.exports=[{equipment:421,ship:{isClass:t},bonusImprove:{0:{fire:3},5:{fire:4}}},{equipment:421,ship:{isClass:[a,n,o]},bonusImprove:{0:{fire:2},5:{fire:3}}},{equipment:421,ship:{isClass:[p]},bonusImprove:{0:{fire:1},5:{fire:2}}},{equipment:421,ship:{isClass:[u]},bonusImprove:{0:{armor:-2,evasion:-1},5:{fire:1,armor:-2,evasion:-1}}},{equipment:421,ship:{isType:[9],isNotClass:[u]},bonus:{fire:-2,armor:-2,evasion:-1}}]},function(e,s,i){"use strict";var r=Object.assign||function(e){for(var s=1;s<arguments.length;s++){var i=arguments[s];for(var r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r])}return e},a={ship:{isID:[380,529,381,536]},bonus:{asw:1,evasion:1}};e.exports=[r({equipment:82},a),r({equipment:302},a)]},function(e,s,i){"use strict";var r=i(4),a=r.Souryuu,n=r.Hiryuu;e.exports=[{equipment:93,ship:{isID:a},bonusCount:{1:{fire:1}}},{equipment:93,ship:{isID:n},bonusCount:{1:{fire:3}}}]},function(e,s,i){"use strict";function r(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}var a=i(4),n=a.Shoukaku,t=a.Zuikaku,o=i(2),u=o.CV_AkagiClassRemodelAll,p=o.CV_KagaClassRemodelAll;e.exports=[{equipment:143,ship:{isID:[157]},bonusCount:{1:{fire:1}}},{equipment:143,ship:{isID:[].concat(r(u))},bonusCount:{1:{fire:3}}},{equipment:143,ship:{isID:[].concat(r(p))},bonusCount:{1:{fire:2}}},{equipment:143,ship:{isID:n},bonusCount:{1:{fire:2}}},{equipment:143,ship:{isID:t},bonusCount:{1:{fire:1}}}]},function(e,s,i){"use strict";var r=i(1),a=r.赤城改二戊,n=r.加賀改二戊,t=r.龍鳳改,o=r.龍鳳改二,u=r.龍鳳改二戊,p=r.祥鳳改,c=r.瑞鳳改二,f=r.瑞鳳改二乙,l=[{equipment:344,ship:{isID:[p]},bonus:{fire:2,asw:1}},{equipment:344,ship:{isID:[c,f]},bonus:{fire:2,asw:2}},{equipment:344,ship:{isID:[t]},bonus:{fire:4,asw:1}},{equipment:344,ship:{isID:[u]},bonus:{fire:5,asw:2}},{equipment:344,ship:{isID:[o]},bonus:{fire:4,asw:2}},{equipment:344,ship:{isID:[a,n]},bonus:{fire:3}}],h=[{equipment:345,ship:{isID:[p]},bonus:{fire:3,evasion:1,asw:1}},{equipment:345,ship:{isID:[c,f]},bonus:{fire:3,evasion:3,asw:2}},{equipment:345,ship:{isID:[t]},bonus:{fire:5,evasion:2,asw:1}},{equipment:345,ship:{isID:[u]},bonus:{fire:5,evasion:3,asw:2}},{equipment:345,ship:{isID:[o]},bonus:{fire:4,evasion:2,asw:2}},{equipment:345,ship:{isID:[a,n]},bonus:{fire:3,evasion:1}}];e.exports=[].concat(l,h)},function(e,s,i){"use strict";var r=i(1),a=r.赤城改,n=r.赤城改二,t=r.赤城改二戊,o=r.加賀改,u=r.加賀改二,p=r.加賀改二戊,c=r.加賀改二護,f=r.大鳳改,l=[];[18,52].forEach(function(e){l.push({equipment:e,ship:{isID:[a,o,f]},bonus:{fire:1}}),l.push({equipment:e,ship:{isID:[n,u,c]},bonus:{fire:1,evasion:1}}),l.push({equipment:e,ship:{isID:[t,p]},bonus:{fire:2,evasion:1}})}),e.exports=l},function(e,s,i){"use strict";function r(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}var a=i(2).CV_ShoukakuClass2ndRemodel,n=i(1),t=n.赤城改,o=n.赤城改二,u=n.赤城改二戊,p=n.加賀改,c=n.加賀改二,f=n.加賀改二戊,l=n.加賀改二護;e.exports=[{equipment:342,ship:{isID:[t,p].concat(r(a))},bonus:{fire:1}},{equipment:342,ship:{isID:[o,c,l]},bonus:{fire:2,aa:2,evasion:1}},{equipment:342,ship:{isID:[u,f]},bonus:{fire:3,aa:2,evasion:2}},{equipment:343,ship:{isID:[].concat(r(a))},bonus:{fire:1}},{equipment:343,ship:{isID:[t,p]},bonus:{fire:2}},{equipment:343,ship:{isID:[o,c,l]},bonus:{fire:3,aa:2,evasion:1}},{equipment:343,ship:{isID:[u,f]},bonus:{fire:5,aa:3,evasion:3}}]},function(e,s,i){"use strict";var r=i(4),a=r.Souryuu,n=r.Hiryuu;e.exports=[{equipment:94,ship:{isID:a},bonusCount:{1:{fire:3}}},{equipment:94,ship:{isID:n},bonusCount:{1:{fire:7}}}]},function(e,s,i){"use strict";function r(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}var a=i(2),n=a.CV_AkagiClassRemodelAll,t=a.CV_KagaClassRemodelAll;e.exports=[{equipment:144,ship:{isID:[157]},bonusCount:{1:{fire:1}}},{equipment:144,ship:{isID:[].concat(r(n))},bonusCount:{1:{fire:3}}},{equipment:144,ship:{isID:[].concat(r(t))},bonusCount:{1:{fire:2}}},{equipment:144,ship:{isID:[110,288]},bonusCount:{1:{fire:2}}},{equipment:144,ship:{isID:[461,466]},bonusCount:{1:{fire:4}}},{equipment:144,ship:{isID:[111,112]},bonusCount:{1:{fire:1}}},{equipment:144,ship:{isID:[462,467]},bonusCount:{1:{fire:2}}}]},function(e,s,i){"use strict";function r(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}i(3);var a=i(1),n=a.龍鳳,t=a.龍鳳改,o=a.龍鳳改二,u=a.龍鳳改二戊,p=a.祥鳳,c=a.祥鳳改,f=a.瑞鳳,l=a.瑞鳳改,h=a.瑞鳳改二,m=a.瑞鳳改二乙,v=a.千歳航,d=a.千歳航改,b=a.千歳航改二,y=a.千代田航,g=a.千代田航改,_=a.千代田航改二,C=i(4),D=C.Shoukaku,A=C.Zuikaku,I=C.Taihou,q=C.Hiyou,S=C.Junyou;e.exports=[{equipment:372,ship:{isID:[].concat(r(D),r(A),r(I))},bonus:{fire:1,torpedo:1}},{equipment:372,ship:{isID:[].concat(r(q),r(S),[v,d,b,y,g,_])},bonus:{fire:1}},{equipment:372,ship:{isID:[p,c,f,l,n]},bonus:{asw:1}},{equipment:372,ship:{isID:[o,u]},bonus:{fire:2,torpedo:2,asw:1}},{equipment:372,ship:{isID:[h,m,t]},bonus:{fire:1,asw:1}}]},function(e,s,i){"use strict";function r(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}i(3);var a=i(1),n=a.翔鶴改二,t=a.翔鶴改二甲,o=a.瑞鶴改二,u=a.瑞鶴改二甲,p=a.大鳳改,c=a.龍鳳,f=a.龍鳳改,l=a.龍鳳改二,h=a.龍鳳改二戊,m=a.祥鳳,v=a.祥鳳改,d=a.瑞鳳,b=a.瑞鳳改,y=a.瑞鳳改二,g=a.瑞鳳改二乙,_=a.飛鷹改,C=a.隼鷹改二,D=a.千歳航,A=a.千歳航改,I=a.千歳航改二,q=a.千代田航,S=a.千代田航改,R=a.千代田航改二,B=a.鈴谷航改二,N=a.熊野航改二,x=i(4),L=x.Shoukaku,k=x.Zuikaku,w=x.Taihou,M=x.Hiyou,T=x.Junyou,V=[{equipment:373,ship:{isID:[].concat(r(L))},bonusCount:{1:{fire:2,torpedo:2,evasion:2},2:{fire:2}}},{equipment:373,ship:{isID:[].concat(r(k))},bonusCount:{1:{fire:1,torpedo:2,evasion:3},2:{fire:1}}},{equipment:373,ship:{isID:[].concat(r(w),[B,N])},bonusCount:{1:{fire:1,torpedo:2,evasion:2},2:{fire:1}}},{equipment:373,ship:{isID:[m,d]},bonus:{torpedo:1,asw:1}},{equipment:373,ship:{isID:[c,v,b]},bonusCount:{1:{fire:1,torpedo:1,asw:1},2:{fire:1,asw:1}}},{equipment:373,ship:{isID:[f,y,g]},bonusCount:{1:{fire:1,torpedo:1,asw:2,evasion:1},2:{fire:1,asw:2}}},{equipment:373,ship:{isID:[h]},bonusCount:{1:{fire:1,torpedo:3,asw:2,evasion:4},2:{fire:1,asw:2}}},{equipment:373,ship:{isID:[l]},bonusCount:{1:{fire:2,torpedo:2,asw:2,evasion:2},2:{fire:2,asw:2}}},{equipment:373,ship:{isID:[D,q]},bonus:{fire:1}},{equipment:373,ship:{isID:[A,S]},bonus:{fire:1,torpedo:1}},{equipment:373,ship:{isID:[].concat(r(M),r(T),[I,R])},bonusCount:{1:{fire:1,torpedo:1,evasion:1},2:{fire:1}}}],O=[{equipment:374,ship:{isID:[n,t]},bonus:{fire:3,torpedo:3,evasion:3}},{equipment:374,ship:{isID:[o,u]},bonus:{fire:2,torpedo:3,evasion:4}},{equipment:374,ship:{isID:[p]},bonus:{fire:2,torpedo:3,evasion:2}},{equipment:374,ship:{isID:[y,g,f]},bonus:{fire:1,torpedo:1,asw:3,evasion:2}},{equipment:374,ship:{isID:[l,h]},bonus:{fire:3,torpedo:2,asw:3,evasion:3}},{equipment:374,ship:{isID:[B,N]},bonus:{fire:1,torpedo:2,asw:2,evasion:3}},{equipment:374,ship:{isID:[I,R]},bonus:{fire:1,torpedo:1,asw:1,evasion:1}},{equipment:374,ship:{isID:[_,C]},bonus:{fire:1,torpedo:2,evasion:2}},{equipment:374,ship:{isID:[v]},bonus:{fire:1,torpedo:2,asw:2,evasion:1}}];e.exports=[].concat(V,O)},function(e,s,i){"use strict";var r=i(0).group_CV_Navy_RM;e.exports=[{equipment:188,ship:{isClass:r},bonus:{fire:3,aa:1,evasion:1}}]},function(e,s,i){"use strict";function r(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}var a=i(0).group_CV_Navy_USN,n=i(1),t=n.赤城改二,o=n.赤城改二戊,u=n.加賀改二,p=n.加賀改二戊,c=n.加賀改二護,f=[{equipment:389,ship:{isID:[t,o]},bonus:{fire:2,evasion:2}},{equipment:389,ship:{isID:[u,p]},bonus:{fire:3,evasion:2}},{equipment:389,ship:{isID:c},bonus:{fire:4,asw:4,evasion:3}},{equipment:389,ship:{isClass:[].concat(r(a))},bonus:{fire:2,asw:3,evasion:1}}],l=[].concat(r([69,324,325].map(function(e){return{list:[389,e],equipments:[{isID:382},{isID:e}],ship:{isID:c},bonus:{fire:3,asw:6}}})),r([326,327].map(function(e){return{list:[389,e],equipments:[{isID:382},{isID:e}],ship:{isID:c},bonus:{fire:8,asw:10}}})));e.exports=[].concat(f,r(l))},function(e,s,i){"use strict";var r=i(5).Carriers;e.exports=[{equipment:54,ship:{isType:r},bonusImprove:{2:{los:1}}}]},function(e,s,i){"use strict";var r=i(5).Carriers;e.exports=[{equipment:61,ship:{isID:[553]},bonusImprove:{0:{fire:3,evasion:2,armor:1,range:"1"},2:{fire:3,evasion:2,armor:1,los:1,range:"1"},4:{fire:4,evasion:2,armor:1,los:1,range:"1"},6:{fire:4,evasion:2,armor:1,los:2,range:"1"},10:{fire:5,evasion:2,armor:1,los:3,range:"1"}}},{equipment:61,ship:{isID:[554]},bonusImprove:{0:{fire:3,evasion:3,armor:3,range:"1"},2:{fire:3,evasion:3,armor:3,los:1,range:"1"},4:{fire:4,evasion:3,armor:3,los:1,range:"1"},6:{fire:4,evasion:3,armor:3,los:2,range:"1"},10:{fire:5,evasion:3,armor:3,los:3,range:"1"}}},{equipment:61,ship:{isType:r,isNotID:[560,508,509,197,196]},bonusImprove:{2:{los:1},4:{fire:1,los:1},6:{fire:1,los:2},10:{fire:2,los:3}}},{equipment:61,ship:{isID:[560,508,509]},bonusImprove:{1:{fire:1,los:1},2:{fire:1,los:2},4:{fire:2,los:2},6:{fire:2,los:3},10:{fire:3,los:4}}},{equipment:61,ship:{isID:[197]},bonusImprove:{0:{range:"1"},1:{fire:3,los:3,range:"1"},2:{fire:3,los:4,range:"1"},4:{fire:4,los:4,range:"1"},6:{fire:4,los:5,range:"1"},8:{fire:5,los:6,range:"1"},10:{fire:6,los:7,range:"1"}}},{equipment:61,ship:{isID:[196]},bonusImprove:{0:{range:"1"},1:{fire:2,los:2,range:"1"},2:{fire:2,los:3,range:"1"},4:{fire:3,los:3,range:"1"},6:{fire:3,los:4,range:"1"},10:{fire:4,los:5,range:"1"}}}]},function(e,s,i){"use strict";e.exports=[{equipment:151,ship:{isType:[11]},bonusImprove:{2:{los:1},4:{fire:1,los:1},6:{fire:1,los:2},10:{fire:2,los:3}}}]},function(e,s,i){"use strict";function r(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}var a=i(2),n=a.Ooyodo,t=a.Kashima,o=a.Hibiki,u=a.Kasumi,p=a.Yukikaze,c=a.Isokaze,f=a.Hamakaze,l=a.Asashimo,h=a.Suzutsuki,m=i(1),v=m.長門改二,d=m.榛名改二,b=m.矢矧,y=m.矢矧改,g=m.矢矧改二,_=m.矢矧改二乙;e.exports=[{equipment:106,ship:{isID:[].concat(r(n),r(t),r(o))},bonus:{aa:1,evasion:3,armor:1}},{equipment:106,ship:{isID:[g,_]},bonus:{fire:1,aa:4,evasion:4,armor:2}},{equipment:106,ship:{isID:[b,y].concat(r(u),r(p),r(c),r(f),r(l),r(h))},bonus:{aa:2,evasion:2,armor:1}},{equipment:106,ship:{isID:[d,v,407,145,419]},bonus:{fire:1,aa:2,evasion:3,armor:1}}]},function(e,s,i){"use strict";i(3);var r=i(2).CAV_MogamiClassSuperRemodel,a=i(0).DD_Akizuki;e.exports=[{equipment:30,ship:{isID:[].concat(function(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}(r))},bonusCount:{1:{aa:3,evasion:2,los:2}}},{equipment:30,ship:{isClass:[a]},bonusCount:{1:{aa:3,evasion:2,los:2}}}]},function(e,s,i){"use strict";i(3);var r=i(2).CAV_MogamiClassSuperRemodel,a=i(0).DD_Akizuki;e.exports=[{equipment:410,ship:{isID:[].concat(function(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}(r))},bonusCount:{1:{fire:1,aa:5,evasion:4,los:2,armor:1}}},{equipment:410,ship:{isClass:[a]},bonusCount:{1:{fire:1,aa:5,evasion:4,los:2,armor:1}}}]},function(e,s,i){"use strict";function r(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}i(3);var a=i(1),n=a.伊勢改二,t=a.日向改二,o=a.扶桑改二,u=a.山城改二,p=a.長門改二,c=a.陸奥改二,f=a.榛名改二,l=i(5),h=l.AviationCruisers,m=l.HeavyCruisers,v=l.TrainingCruisers,d=l.LightCruisersNoCT,b=l.Destroyers;e.exports=[{equipment:411,ship:{isID:[o,u,f]},bonusImprove:{0:{fire:3,aa:4},4:{fire:4,aa:5},10:{fire:5,aa:6}}},{equipment:411,ship:{isID:[n,t,p,c]},bonusImprove:{0:{fire:2,aa:2},4:{fire:3,aa:3},10:{fire:4,aa:4}}},{equipment:411,ship:{isType:[].concat(r(h),r(m))},bonus:{evasion:-5}},{equipment:411,ship:{isType:[].concat(r(v))},bonus:{evasion:-6}},{equipment:411,ship:{isType:[].concat(r(d))},bonus:{evasion:-7}},{equipment:411,ship:{isType:[].concat(r(b))},bonus:{evasion:-9}}]},function(e,s,i){"use strict";var r=i(0).group_Navy_USN;e.exports=[{equipment:307,ship:{isClass:r},bonus:{fire:1,aa:1,evasion:1}}]},function(e,s,i){"use strict";function r(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}var a=i(0),n=a.group_Navy_USN,t=a.group_DD_Navy_USN,o=a.group_BB_Navy_RN,u=a.group_CV_Navy_RN,p=a.group_CL_Navy_RN,c=a.group_CL_Navy_RAN,f=i(1),l=f.丹陽,h=f.雪風改二,m=n.filter(function(e){return!t.includes(e)}),v=[{equipment:315,ship:{isClass:t},bonus:{fire:3,evasion:3,los:4,range:"1"}},{equipment:315,ship:{isClass:[].concat(r(m))},bonus:{fire:2,evasion:3,los:4}},{equipment:315,ship:{isID:[l,h]},bonus:{fire:2,aa:2,evasion:3,range:"1"}}],d=[{equipment:278,ship:{isClass:[].concat(r(m))},bonus:{aa:1,los:1,evasion:3}},{equipment:278,ship:{isClass:[].concat(r(o),r(u),r(p))},bonus:{aa:1,evasion:2}},{equipment:278,ship:{isClass:[].concat(r(c))},bonus:{aa:1,evasion:1}}],b=[{equipment:279,ship:{isClass:[].concat(r(m))},bonus:{fire:2,aa:2,los:2,evasion:3}},{equipment:279,ship:{isClass:[].concat(r(o),r(u),r(p))},bonus:{fire:1,aa:1,los:1,evasion:2}},{equipment:279,ship:{isClass:[].concat(r(c))},bonus:{fire:1,aa:1,evasion:1}}];e.exports=[].concat(v,d,b)},function(e,s,i){"use strict";var r=i(0).CT_Katori,a=[];[46,47,149].forEach(function(e){a.push({equipment:e,ship:{isClass:[r]},bonusCount:{1:{asw:2,evasion:3}}})}),e.exports=a},function(e,s,i){"use strict";var r=i(0).CT_Katori,a=[];[44,45,287,288].forEach(function(e){a.push({equipment:e,ship:{isClass:[r]},bonus:{asw:3,evasion:2}})}),e.exports=a},function(e,s,i){"use strict";function r(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}var a=i(2),n=a.Kamikaze,t=a.Harukaze,o=a.Ushio,u=a.Ikazuchi,p=a.Shigure,c=a.Yamakaze,f=a.Yamagumo,l=a.Isokaze,h=a.Hamakaze,m=a.Maikaze,v=a.Kishinami,d=a.Asashimo;e.exports=[{equipment:47,ship:{isID:[].concat(r(o),r(u),r(f),r(l),r(h),r(v))},bonus:{evasion:2,asw:2}},{equipment:47,ship:{isID:[].concat(r(n),r(t),r(p),r(c),r(m),r(d))},bonus:{fire:1,evasion:2,asw:3}}]},function(e,s,i){"use strict";var r=i(0).DD_Akizuki,a=i(1),n=a.能代改二,t=a.雪風改二;e.exports=[{equipment:149,ship:{isID:[n]},bonus:{asw:2,evasion:4}},{equipment:149,ship:{isID:[624]},bonus:{asw:3,evasion:5}},{equipment:149,ship:{isID:[622,623,141,488,160,t]},bonus:{asw:1,evasion:3}},{equipment:149,ship:{isClass:[r]},bonus:{asw:1,evasion:2}}]},function(e,s,i){"use strict";var r=i(1),a=r.能代改二,n=r.由良改二,t=r.那珂改二,o=r.五十鈴改二,u=r.夕張改二丁,p=r.雪風改二;e.exports=[{equipment:287,ship:{isID:[a]},bonus:{asw:3}},{equipment:287,ship:{isID:[o,n,t,u,p]},bonus:{asw:1,evasion:1}}]},function(e,s,i){"use strict";var r=i(1),a=r.能代改二,n=r.由良改二,t=r.那珂改二,o=r.五十鈴改二,u=r.夕張改二丁,p=r.雪風改二;e.exports=[{equipment:288,ship:{isID:[u]},bonus:{fire:1,asw:3,evasion:5}},{equipment:288,ship:{isID:[a]},bonus:{asw:4,evasion:1}},{equipment:288,ship:{isID:[o,n,t,p]},bonus:{asw:2,evasion:1}}]},function(e,s,i){"use strict";function r(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}var a=i(1),n=a["Fletcher Mk.II"],t=a.丹陽,o=a.雪風改二,u=i(0),p=u.group_CL_Navy_USN,c=u.group_DD_Navy_USN,f=u.group_CL_Navy_RN,l=u.group_DD_Navy_RN,h=u.group_CL_Navy_RAN;e.exports=[{equipment:377,ship:{isID:[n]},bonus:{asw:3,evasion:3}},{equipment:377,ship:{isClass:[].concat(r(p),r(c)),isNotID:[n]},bonus:{asw:2,evasion:1}},{equipment:377,ship:{isID:[t,o]},bonus:{asw:1,evasion:2}},{equipment:377,ship:{isClass:[].concat(r(h),r(f),r(l))},bonus:{asw:1,evasion:1}}]},function(e,s,i){"use strict";function r(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}var a=i(1),n=a["Fletcher Mk.II"],t=a.丹陽,o=a.雪風改二,u=i(0),p=u.group_CL_Navy_USN,c=u.group_DD_Navy_USN,f=u.group_CL_Navy_RN,l=u.group_DD_Navy_RN,h=u.group_CL_Navy_RAN;e.exports=[{equipment:378,ship:{isID:[n]},bonus:{asw:4,evasion:2}},{equipment:378,ship:{isClass:[].concat(r(p),r(c)),isNotID:[n]},bonus:{asw:3,evasion:1}},{equipment:378,ship:{isClass:[].concat(r(f),r(l))},bonus:{asw:2,evasion:1}},{equipment:378,ship:{isClass:[].concat(r(h))},bonus:{asw:1,evasion:1}},{equipment:378,ship:{isID:[t,o]},bonus:{asw:1,evasion:1}}]},function(e,s,i){"use strict";var r=i(0).group_Navy_RN;e.exports=[{equipment:301,ship:{isClass:r},bonus:{aa:2,evasion:1,armor:1}}]},function(e,s,i){"use strict";var r=i(0),a=r.CL_AganoRevised,n=r.CT_Katori,t=[];[49,39,40,131].forEach(function(e){t.push({equipment:e,ship:{isClass:[a]},bonus:{aa:2,evasion:1}}),t.push({equipment:e,ship:{isClass:[n]},bonus:{fire:1,aa:2,evasion:2}})}),e.exports=t},function(e,s,i){"use strict";var r=i(1),a=r.金剛改二丙,n=r.比叡改二丙;e.exports=[{equipment:87,ship:{isID:[a,n]},bonusImprove:{0:{torpedo:1,evasion:2},8:{torpedo:2,evasion:3},10:{fire:1,torpedo:2,evasion:3}}}]},function(e,s,i){"use strict";var r=i(2).CL_KumaClassRemodelAll;e.exports=[{equipment:268,ship:{canEquip:[33]},bonusArea:{North:{armor:3}}},{equipment:268,ship:{isID:r},bonusCount:{1:{armor:2,evasion:7}}}]},function(e,s,i){"use strict";var r=i(1),a=r.金剛改二丙,n=r.比叡改二丙;e.exports=[{equipment:204,ship:{isID:[a,n]},bonusImprove:{0:{torpedo:1,armor:1},7:{torpedo:1,armor:2},10:{torpedo:2,armor:2}}}]},function(e,s,i){"use strict";function r(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}var a=i(0),n=a.group_BB_Ise,t=a.group_BB_Fusou,o=a.BB_Nagato,u=a.BB_Yamato,p=a.BB_Kongou,c=a.BB_Kongou2,f=i(1),l=[f.長門改二,f.陸奥改二,136,546],h=[591,f.比叡改二丙];e.exports=[{equipment:365,ship:{isID:h},bonus:{fire:3}},{equipment:365,ship:{isID:l},bonus:{fire:2}},{equipment:365,ship:{isClass:[].concat(r(n),r(t),[o,u,p,c]),isNotID:[].concat(l,h)},bonus:{fire:1}}]},function(e,s,i){"use strict";var r=i(1).榛名改二;e.exports=[{equipment:35,ship:{isID:[149,591,592]},bonusCount:{1:{fire:1,aa:1}}},{equipment:35,ship:{isID:[150]},bonusCount:{1:{aa:1}}},{equipment:35,ship:{isID:[r]},bonusCount:{1:{aa:1,evasion:1}}},{equipment:35,ship:{isID:[152]},bonusCount:{1:{fire:1}}}]},function(e,s,i){"use strict";var r=i(1),a=r.長門改二,n=r.陸奥改二,t=r.榛名改二;e.exports=[{equipment:317,ship:{isID:[78,209,86,210,79,211,85,212]},bonusCount:{1:{fire:1,aa:1}}},{equipment:317,ship:{isID:[149,591,592]},bonusCount:{1:{fire:3,aa:3}}},{equipment:317,ship:{isID:[150]},bonusCount:{1:{fire:2,aa:2}}},{equipment:317,ship:{isID:[t]},bonusCount:{1:{fire:2,aa:2,evasion:1}}},{equipment:317,ship:{isID:[152]},bonusCount:{1:{fire:3,aa:2}}},{equipment:317,ship:{isID:[a]},bonusCount:{1:{fire:1,aa:2}}},{equipment:317,ship:{isID:[n]},bonusCount:{1:{fire:2,aa:2,evasion:1}}}]},function(e,s,i){"use strict";function r(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}i(3);var a=i(2),n=a.CAV_MogamiClassSuperRemodel,t=a.CL_AganoClass2ndRemodel;e.exports=[{equipment:364,ship:{isID:[623]},bonus:{fire:1,torpedo:4,evasion:-2}},{equipment:364,ship:{isID:[119]},bonus:{torpedo:2,evasion:-2}},{equipment:364,ship:{isID:[118,586].concat(r(n),r(t))},bonus:{torpedo:1,evasion:-2}},{equipment:364,ship:{canEquip:[12],isType:[13,14]},bonus:{fire:-1,evasion:-7}},{equipment:364,ship:{isID:[146,488,200,102,104,106,103,105,107,451,348]},bonus:{fire:-1,evasion:-7}}]},function(e,s,i){"use strict";var r=i(1),a=r.伊勢改二,n=r.日向改二,t=r.加賀改二護;e.exports=[{equipment:69,ship:{isID:a},bonus:{fire:1,asw:1}},{equipment:69,ship:{isID:[n,t]},bonus:{fire:1,asw:2}}]},function(e,s,i){"use strict";var r=i(1),a=r.伊勢改二,n=r.日向改二,t=r.加賀改二護;e.exports=[{equipment:324,ship:{isID:a},bonus:{fire:1,asw:2,evasion:1}},{equipment:324,ship:{isID:[n,t]},bonus:{fire:2,asw:3,evasion:1}}]},function(e,s,i){"use strict";var r=i(1),a=r.伊勢改二,n=r.日向改二,t=r.加賀改二護;e.exports=[{equipment:325,ship:{isID:a},bonus:{fire:1,asw:2,evasion:1}},{equipment:325,ship:{isID:[n,t]},bonus:{fire:2,asw:3,evasion:1}}]},function(e,s,i){"use strict";var r=i(1),a=r.伊勢改二,n=r.日向改二,t=r.加賀改二護;e.exports=[{equipment:326,ship:{isID:a},bonus:{fire:1,asw:3,evasion:1}},{equipment:326,ship:{isID:n},bonus:{fire:3,asw:4,evasion:2}},{equipment:326,ship:{isID:t},bonus:{fire:3,asw:5,evasion:3}}]},function(e,s,i){"use strict";var r=i(1),a=r.伊勢改二,n=r.日向改二,t=r.加賀改二護;e.exports=[{equipment:327,ship:{isID:a},bonus:{fire:2,asw:4,evasion:1}},{equipment:327,ship:{isID:n},bonus:{fire:4,asw:5,evasion:2}},{equipment:327,ship:{isID:t},bonus:{fire:5,asw:6,evasion:4}}]},function(e,s,i){"use strict";function r(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}var a=i(4),n=a.Hiei,t=a.Kirishima,o=a.Choukai,u=a.Jintsu,p=a.Akatsuki,c=a.Akigumo,f=a.Yukikaze,l=i(2).CL_AganoClass2ndRemodel;e.exports=[{equipment:74,ship:{isID:[].concat(r(c))},bonus:{fire:2}},{equipment:74,ship:{isID:[].concat(r(f))},bonus:{fire:1,aa:1}},{equipment:74,ship:{isID:[].concat(r(n),r(t),r(o),r(p))},bonusCount:{1:{fire:4,evasion:-1}}},{equipment:74,ship:{isID:[].concat(r(l))},bonusCount:{1:{fire:4,torpedo:2}}},{equipment:74,ship:{isID:[].concat(r(u))},bonusCount:{1:{fire:8,torpedo:8,evasion:-1}}}]},function(e,s,i){"use strict";function r(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}var a=i(4),n=a.Hiei,t=a.Kirishima,o=i(0).BB_Yamato,u=i(1).比叡改二丙;e.exports=[{equipment:140,ship:{isID:[].concat(r(n),r(t)).filter(function(e){return e!==u})},bonusCount:{1:{fire:6,evasion:-2}}},{equipment:140,ship:{isID:[u]},bonusCount:{1:{fire:9,torpedo:3,evasion:-2}}},{equipment:140,ship:{isClass:[o]},bonusCount:{1:{fire:4,evasion:-1}}}]},function(e,s,i){"use strict";function r(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}i(3);var a=i(0),n=a.DD_KagerouROCN,t=a.group_CAV_Navy_IJN,o=a.group_CA_Navy_IJN,u=a.group_CL_S_Navy_IJN,p=a.group_DD_Navy_IJN,c=[{equipment:129,ship:{isClass:[].concat(r(t),r(o))},bonus:{fire:1,los:3,evasion:2}},{equipment:129,ship:{isClass:[].concat(r(u))},bonus:{fire:1,torpedo:2,los:3,evasion:2}},{equipment:129,ship:{isClass:[].concat(r(p),[n])},bonus:{fire:1,torpedo:2,asw:2,los:1,evasion:2}}],f=[{equipment:412,ship:{isClass:[].concat(r(t),r(o))},bonus:{fire:1}},{equipment:412,ship:{isClass:[].concat(r(u))},bonusImprove:{1:{fire:3,torpedo:3},4:{fire:4,torpedo:3},8:{fire:4,torpedo:4}}},{equipment:412,ship:{isClass:[].concat(r(p),[n])},bonusImprove:{1:{fire:2,torpedo:4,asw:2},4:{fire:3,torpedo:4,asw:2},8:{fire:3,torpedo:5,asw:2}}},{list:[412],equipments:{hasID:[412]},ship:{isClass:[].concat(r(t),r(o))},bonus:{los:1,evasion:1}},{list:[412],equipments:{hasID:[412]},ship:{isClass:[].concat(r(u))},bonus:{los:3,evasion:2}},{list:[412],equipments:{hasID:[412]},ship:{isClass:[].concat(r(p),[n])},bonus:{los:1,evasion:3}}];e.exports=[].concat(c,f)},function(e,s,i){"use strict";function r(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}i(3);var a=i(5).Destroyers,n=i(4),t=n.Akitsumaru,o=n.Shinsyuumaru;e.exports=[{equipment:408,ship:{isID:[].concat(r(o))},bonus:{fire:2,los:2,evasion:2}},{equipment:408,ship:{isID:[].concat(r(t))},bonus:{fire:1,asw:1,los:1,evasion:1}},{equipment:408,ship:{isType:[].concat(r(a))},bonus:{fire:1,los:1,evasion:-5}}]},function(e,s,i){"use strict";function r(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}i(3);var a=i(4),n=a.Akitsumaru,t=a.Shinsyuumaru;e.exports=[{equipment:409,ship:{isID:[].concat(r(t))},bonus:{fire:2,aa:2,evasion:3}},{equipment:409,ship:{isID:[].concat(r(n))},bonus:{fire:1,aa:1,asw:1,evasion:1}}]},function(e,s,i){"use strict";function r(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}var a=i(4),n=a.I47,t=a.I58,o=a.I400,u=a.I401;e.exports=[{equipment:384,ship:{isID:[].concat(r(t))},bonus:{evasion:2}},{equipment:384,ship:{isID:[].concat(r(n),r(o),r(u))},bonus:{evasion:3}}]},function(e,s,i){"use strict";function r(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}var a=i(1),n=a.秋雲改二,t=[{list:["AARadar"],equipments:{hasAARadar:!0},ship:{isID:[n,a.沖波改二]},bonus:{fire:1,aa:2,evasion:3}}],o=[{list:[366,267,74],equipments:[{isID:366},{isID:267},{isID:74}],ship:{isID:n},bonus:{fire:-3,evasion:3}},{list:[366,267,"SurfaceShipPersonnel"],equipments:[{isID:366},{isID:267},{isSurfaceShipPersonnel:!0}],ship:{isID:n},bonus:{fire:-2,aa:-2,evasion:-3}}];e.exports=[].concat(t,o,r(i(182)),r(i(183)))},function(e,s,i){"use strict";function r(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}i(3);var a=i(0).CL_AganoRevised,n=i(1),t=n.能代改二,o=n.矢矧改二,u=n.矢矧改二乙,p=i(11),c=p.SeaplaneBombers_IJN_Low,f=p.SeaplaneBombers_IJN_High;e.exports=[{list:["Autogyro"],equipments:{hasAutogyro:!0},ship:{isID:[t]},bonus:{asw:4,evasion:1},passEquippableCheck:!0},{list:["Autogyro"],equipments:{hasAutogyro:!0},ship:{isID:[o,u]},bonus:{asw:3,evasion:1},passEquippableCheck:!0},{list:["ReconSeaplane"],equipments:{hasSeaplaneRecons:!0},ship:{isClass:[a]},bonus:{fire:2,asw:3,evasion:1}}].concat(r([].concat(r(c)).map(function(e){return{equipment:e,ship:{isID:[o,u]},bonus:{aa:1,evasion:1}}})),r([].concat(r(f)).map(function(e){return{equipment:e,ship:{isID:[o,u]},bonus:{fire:3,aa:1,evasion:2}}})),[{list:["SeaplaneBomber"],equipments:{hasSeaplaneBomber:!0},ship:{isClass:[a]},bonus:{fire:1,asw:1,evasion:1},passEquippableCheck:!0},{list:["SeaplaneBomber"],equipments:{hasOneOf:[].concat(r(c)).map(function(e){return{isID:e}})},ship:{isID:[t]},bonus:{fire:2,evasion:1},passEquippableCheck:!0},{list:["SeaplaneBomber"],equipments:{hasOneOf:[].concat(r(c)).map(function(e){return{isID:e}})},ship:{isID:[o,u]},bonus:{fire:2},passEquippableCheck:!0},{list:["SeaplaneBomber"],equipments:{hasOneOf:[].concat(r(f)).map(function(e){return{isID:e}})},ship:{isID:[t]},bonus:{fire:3,evasion:1},passEquippableCheck:!0}])},function(e,s,i){"use strict";function r(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}i(3);var a=i(2).CAV_MogamiClassSuperRemodel,n=i(11),t=n.ReconSeaplanes_零式水上観測機,o=n.ReconSeaplanes_零式水上偵察機11型乙,u=n.SeaplaneBombers_IJN_Low,p=n.SeaplaneBombers_IJN_High;e.exports=[{list:["ReconSeaplane"],equipments:{hasSeaplaneRecons:!0},ship:{isID:[].concat(r(a))},bonus:{fire:2}},{list:["ReconSeaplane"],equipments:{hasOneOf:[].concat(r(t)).map(function(e){return{isID:e}})},ship:{isID:[].concat(r(a))},bonus:{aa:1,evasion:1},passEquippableCheck:!0},{list:["ReconSeaplane"],equipments:{hasOneOf:[].concat(r(o)).map(function(e){return{isID:e}})},ship:{isID:[].concat(r(a))},bonus:{torpedo:1,evasion:1},passEquippableCheck:!0}].concat(r([].concat(r(u)).map(function(e){return{equipment:e,ship:{isID:[].concat(r(a))},bonus:{aa:1,evasion:1}}})),r([].concat(r(p)).map(function(e){return{equipment:e,ship:{isID:[].concat(r(a))},bonus:{fire:3,aa:1,evasion:2}}})),[{list:["SeaplaneBomber"],equipments:{hasSeaplaneBombersNoFighters:!0},ship:{isID:[].concat(r(a))},bonus:{fire:1,evasion:1},passEquippableCheck:!0},{list:["SeaplaneBomber"],equipments:{hasOneOf:[].concat(r(u)).map(function(e){return{isID:e}})},ship:{isID:[].concat(r(a))},bonus:{fire:2},passEquippableCheck:!0},{list:["SeaplaneFighter"],equipments:{hasOneOf:[165,216].map(function(e){return{isID:e}})},ship:{isID:[].concat(r(a))},bonus:{aa:2,evasion:2}}])},function(e,s,i){"use strict";var r=Object.assign||function(e){for(var s=1;s<arguments.length;s++){var i=arguments[s];for(var r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r])}return e},a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n=i(185),t=i(13),o=i(188),u=i(9);e.exports=function e(s){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],p=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],c=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[],f=arguments[4];if("string"==typeof p)return e(s,i,void 0,void 0,p);if("string"==typeof c)return e(s,i,p,void 0,c);var l=n(s,i,p,c);s=l.ship,i=l.equipments,p=l.equipmentStars,c=l.equipmentRanks;var h={},m=u.filter(function(e){return t(s,e.ship)}),v=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};for(var s in e)void 0===h[s]?h[s]=e[s]:"number"==typeof h[s]?h[s]+=e[s]:h[s]=e[s]};return m.filter(function(e){return"number"==typeof e.equipment&&i.some(function(s){return s&&s.id&&s.id==e.equipment})}).forEach(function(e){var s={};if("object"===a(e.bonusImprove)){var n=Object.keys(e.bonusImprove).sort(function(e,s){return parseInt(s)-parseInt(e)});i.forEach(function(i,r){i&&i.id&&i.id==e.equipment&&n.some(function(i){if(p[r]>=i){for(var a in e.bonusImprove[i])void 0===s[a]?s[a]=e.bonusImprove[i][a]:"number"==typeof s[a]?s[a]+=e.bonusImprove[i][a]:s[a]=e.bonusImprove[i][a];return!0}return!1})})}else{var t=0;if(i.forEach(function(s){s&&s.id&&s.id==e.equipment&&t++}),"object"===a(e.bonusCount))Object.keys(e.bonusCount).sort(function(e,s){return parseInt(s)-parseInt(e)}).some(function(i){return t>=i&&(s=r({},e.bonusCount[i]),!0)});else if("object"===a(e.bonus))for(var o in s=r({},e.bonus))s[o]="number"==typeof s[o]?s[o]*t:parseInt(s[o])}v(s)}),m.filter(function(e){return"object"===a(e.equipments)&&o(i,p,c,e.equipments)}).forEach(function(e){v(e.bonus)}),"string"==typeof f?h[f]||0:h}},function(e,s,i){"use strict";var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};var a=i(6),n=i(12);e.exports=function(e){var s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],t=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[];return"number"!=typeof s&&"string"!=typeof s||(s=[s]),"number"!=typeof i&&"string"!=typeof i||(i=[i]),"number"!=typeof t&&"string"!=typeof t||(t=[t]),e=a(e),s=[].concat(function(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}(Array(Math.max(5,e.slot.length+1)))).map(function(i,r){if(e&&!(e.slot.length<=r&&r<4))return n(s[r])||void 0}),{ship:e,equipments:s,equipmentStars:s.map(function(e,a){return"object"===r(s[a])?Math.min(10,parseInt(i[a])||0):void 0}),equipmentRanks:s.map(function(e,i){return"object"===r(s[i])?Math.min(7,parseInt(t[i])||0):void 0})}}},function(e,s,i){"use strict";e.exports=function(e,s){return Array.isArray(e)?e.some(s):s(e)}},function(e,s,i){"use strict";e.exports=function(e,s){return Array.isArray(e)?e.every(s):s(e)}},function(e,s,i){"use strict";var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};function a(e,s,i){return s in e?Object.defineProperty(e,s,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[s]=i,e}var n=i(15),t=["id","name","nameof","type"];e.exports=function e(s,i,o){var u=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};if("object"===(void 0===i?"undefined":r(i))&&!Array.isArray(i))return e(s,[],[],i);if("object"===(void 0===o?"undefined":r(o))&&!Array.isArray(o))return e(s,i,[],o);if(!Array.isArray(s))return e([s],i,o,u);if(Array.isArray(i)||(i=[i]),Array.isArray(o)||(o=[o]),Array.isArray(u)){var p=[].concat(function(e){if(Array.isArray(e)){for(var s=0,i=Array(e.length);s<e.length;s++)i[s]=e[s];return i}return Array.from(e)}(s));return u.every(function(e){return p.some(function(s,r){return!!n(s,i[r],o[r],e)&&(p.splice(r,1),!0)})})}var c=function(e){if(void 0===u[e])return"continue";if(!1===u[e]){if(!s.every(function(s,r){return n(s,i[r],o[r],a({},e.replace(/^has/,"is"),u[e]))}))return{v:!1}}else if(!0===u[e]){if(!s.some(function(s,r){return n(s,i[r],o[r],a({},e.replace(/^has/,"is"),u[e]))}))return{v:!1}}else if("hasoneof"===e.toLowerCase()){if(!s.some(function(s,r){return u[e].some(function(e){return n(s,i[r],o[r],e)})}))return{v:!1}}else if("has"===e.substr(0,3)&&t.includes(e.substr(3).toLowerCase())){if(Array.isArray(u[e])){if(!u[e].every(function(r){return s.some(function(s,t){return n(s,i[t],o[t],a({},e.replace(/^has/,"is"),r))})}))return{v:!1}}else if(!s.some(function(s,r){return n(s,i[r],o[r],a({},e.replace(/^has/,"is"),u[e]))}))return{v:!1}}else if("has"!==e.substr(0,3)||"object"!==r(u[e])||Array.isArray(u[e]))if("has"!==e.substr(0,3)||isNaN(u[e])){if("has"===e.substr(0,3)&&Array.isArray(u[e])){var p=s.filter(function(s,r){return n(s,i[r],o[r],a({},e.replace(/^has/,"is"),!0))});if(p.length<u[e][0]||p.length>u[e][1])return{v:!1}}}else{var c=a({},e.replace(/^has/,"is"),!0);if(/^hasID([_]*)([0-9]+)$/.test(e)&&(c={isID:e.replace(/^hasID([_]*)/,"")}),s.filter(function(e,s){return n(e,i[s],o[s],c)}).length<u[e])return{v:!1}}else{var f=Object.assign({},u[e]),l=void 0===f.count?1:f.count;if(delete f.count,s.filter(function(s,r){return n(s,i[r],o[r],a({},e.replace(/^has/,"is"),f))}).length<l)return{v:!1}}};for(var f in u){var l=c(f);switch(l){case"continue":continue;default:if("object"===(void 0===l?"undefined":r(l)))return l.v}}return!0}},function(e,s,i){"use strict";var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};e.exports=function(e){return"object"===(void 0===e?"undefined":r(e))&&e.id?e:isNaN(e)?void 0:KC.db.ship_classes[parseInt(e)]}},function(e,s,i){"use strict";var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};e.exports=function(e){return"object"===(void 0===e?"undefined":r(e))&&e.id?e:isNaN(e)?void 0:KC.db.ship_types[parseInt(e)]}},function(e,s,i){"use strict";var r=i(5);e.exports=r},function(e,s,i){"use strict";var r=i(6),a=i(193),n=i(8),t=i(16);e.exports=function(e){var s=e.ship,i=e.equipments,o=void 0===i?[]:i,u=e.equipmentStars,p=void 0===u?[]:u,c=(e.bonus,e.count),f=void 0===c?{}:c,l=r(s),h=t(a(l)),m=l.stat.fire_max,v=0,d=[];h.forEach(function(e,s){if(o[s]){var i=o[s],r=!1,a=!1;if(!Array.isArray(i.type_ingame)||45!==i.type_ingame[3]&&46!==i.type_ingame[3]?n.TorpedoBombers.includes(i.type)?i.hasName("Swordfish","ja_jp")&&(a=!0,v++):n.DiveBombers.includes(i.type)&&(i.hasName("岩井","ja_jp")&&(a=!0,v++),i.hasName("三一号光電管爆弾","ja_jp")&&(a=!0,v++)):(r=!0,a=!0),a){var t=r?3:0,u=r?.45:.3;m+=i.getStat("fire",l)+i.getStat("torpedo",l)+i.getStat("bomb",l)+t*e+u*Math.sqrt(e)*(i.getStat("fire",l)+i.getStat("torpedo",l)+i.getStat("bomb",l)+i.getStat("asw",l))+(p[s]?KC.formula.getStarBonus(o[s],"night",p[s]):0)}}}),f.carrierFighterNight>=2&&f.torpedoBomberNight>=1&&d.push(1.25),f.carrierFighterNight>=1&&f.torpedoBomberNight>=1&&d.push(1.2),(f.carrierFighterNight>=3||f.carrierFighterNight>=2&&v>=1||f.carrierFighterNight>=1&&f.torpedoBomberNight>=1&&v>=1||f.carrierFighterNight>=1&&f.torpedoBomberNight>=2||f.carrierFighterNight>=1&&v>=2)&&d.push(1.18);var b={type:"航空",hit:1,damage:Math.floor(m),isMax:!0};return d.length&&(b.cis=d.map(function(e){return[Math.floor(b.damage*e),1]})),b}},function(e,s,i){"use strict";e.exports=function(e){for(var s=i(6)(e).slot,r=void 0===s?[]:s,a=[],n=0;n<5;n++)a[n]=r[n]||0;return a}}]);
/*!
 * clipboard.js v2.0.6
 * https://clipboardjs.com/
 * 
 * Licensed MIT © Zeno Rocha
 */
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.ClipboardJS=e():t.ClipboardJS=e()}(this,function(){return o={},r.m=n=[function(t,e){t.exports=function(t){var e;if("SELECT"===t.nodeName)t.focus(),e=t.value;else if("INPUT"===t.nodeName||"TEXTAREA"===t.nodeName){var n=t.hasAttribute("readonly");n||t.setAttribute("readonly",""),t.select(),t.setSelectionRange(0,t.value.length),n||t.removeAttribute("readonly"),e=t.value}else{t.hasAttribute("contenteditable")&&t.focus();var o=window.getSelection(),r=document.createRange();r.selectNodeContents(t),o.removeAllRanges(),o.addRange(r),e=o.toString()}return e}},function(t,e){function n(){}n.prototype={on:function(t,e,n){var o=this.e||(this.e={});return(o[t]||(o[t]=[])).push({fn:e,ctx:n}),this},once:function(t,e,n){var o=this;function r(){o.off(t,r),e.apply(n,arguments)}return r._=e,this.on(t,r,n)},emit:function(t){for(var e=[].slice.call(arguments,1),n=((this.e||(this.e={}))[t]||[]).slice(),o=0,r=n.length;o<r;o++)n[o].fn.apply(n[o].ctx,e);return this},off:function(t,e){var n=this.e||(this.e={}),o=n[t],r=[];if(o&&e)for(var i=0,a=o.length;i<a;i++)o[i].fn!==e&&o[i].fn._!==e&&r.push(o[i]);return r.length?n[t]=r:delete n[t],this}},t.exports=n,t.exports.TinyEmitter=n},function(t,e,n){var d=n(3),h=n(4);t.exports=function(t,e,n){if(!t&&!e&&!n)throw new Error("Missing required arguments");if(!d.string(e))throw new TypeError("Second argument must be a String");if(!d.fn(n))throw new TypeError("Third argument must be a Function");if(d.node(t))return s=e,f=n,(u=t).addEventListener(s,f),{destroy:function(){u.removeEventListener(s,f)}};if(d.nodeList(t))return a=t,c=e,l=n,Array.prototype.forEach.call(a,function(t){t.addEventListener(c,l)}),{destroy:function(){Array.prototype.forEach.call(a,function(t){t.removeEventListener(c,l)})}};if(d.string(t))return o=t,r=e,i=n,h(document.body,o,r,i);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList");var o,r,i,a,c,l,u,s,f}},function(t,n){n.node=function(t){return void 0!==t&&t instanceof HTMLElement&&1===t.nodeType},n.nodeList=function(t){var e=Object.prototype.toString.call(t);return void 0!==t&&("[object NodeList]"===e||"[object HTMLCollection]"===e)&&"length"in t&&(0===t.length||n.node(t[0]))},n.string=function(t){return"string"==typeof t||t instanceof String},n.fn=function(t){return"[object Function]"===Object.prototype.toString.call(t)}},function(t,e,n){var a=n(5);function i(t,e,n,o,r){var i=function(e,n,t,o){return function(t){t.delegateTarget=a(t.target,n),t.delegateTarget&&o.call(e,t)}}.apply(this,arguments);return t.addEventListener(n,i,r),{destroy:function(){t.removeEventListener(n,i,r)}}}t.exports=function(t,e,n,o,r){return"function"==typeof t.addEventListener?i.apply(null,arguments):"function"==typeof n?i.bind(null,document).apply(null,arguments):("string"==typeof t&&(t=document.querySelectorAll(t)),Array.prototype.map.call(t,function(t){return i(t,e,n,o,r)}))}},function(t,e){if("undefined"!=typeof Element&&!Element.prototype.matches){var n=Element.prototype;n.matches=n.matchesSelector||n.mozMatchesSelector||n.msMatchesSelector||n.oMatchesSelector||n.webkitMatchesSelector}t.exports=function(t,e){for(;t&&9!==t.nodeType;){if("function"==typeof t.matches&&t.matches(e))return t;t=t.parentNode}}},function(t,e,n){"use strict";n.r(e);var o=n(0),r=n.n(o),i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};function a(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function c(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,c),this.resolveOptions(t),this.initSelection()}var l=(function(t,e,n){return e&&a(t.prototype,e),n&&a(t,n),t}(c,[{key:"resolveOptions",value:function(t){var e=0<arguments.length&&void 0!==t?t:{};this.action=e.action,this.container=e.container,this.emitter=e.emitter,this.target=e.target,this.text=e.text,this.trigger=e.trigger,this.selectedText=""}},{key:"initSelection",value:function(){this.text?this.selectFake():this.target&&this.selectTarget()}},{key:"selectFake",value:function(){var t=this,e="rtl"==document.documentElement.getAttribute("dir");this.removeFake(),this.fakeHandlerCallback=function(){return t.removeFake()},this.fakeHandler=this.container.addEventListener("click",this.fakeHandlerCallback)||!0,this.fakeElem=document.createElement("textarea"),this.fakeElem.style.fontSize="12pt",this.fakeElem.style.border="0",this.fakeElem.style.padding="0",this.fakeElem.style.margin="0",this.fakeElem.style.position="absolute",this.fakeElem.style[e?"right":"left"]="-9999px";var n=window.pageYOffset||document.documentElement.scrollTop;this.fakeElem.style.top=n+"px",this.fakeElem.setAttribute("readonly",""),this.fakeElem.value=this.text,this.container.appendChild(this.fakeElem),this.selectedText=r()(this.fakeElem),this.copyText()}},{key:"removeFake",value:function(){this.fakeHandler&&(this.container.removeEventListener("click",this.fakeHandlerCallback),this.fakeHandler=null,this.fakeHandlerCallback=null),this.fakeElem&&(this.container.removeChild(this.fakeElem),this.fakeElem=null)}},{key:"selectTarget",value:function(){this.selectedText=r()(this.target),this.copyText()}},{key:"copyText",value:function(){var e=void 0;try{e=document.execCommand(this.action)}catch(t){e=!1}this.handleResult(e)}},{key:"handleResult",value:function(t){this.emitter.emit(t?"success":"error",{action:this.action,text:this.selectedText,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)})}},{key:"clearSelection",value:function(){this.trigger&&this.trigger.focus(),document.activeElement.blur(),window.getSelection().removeAllRanges()}},{key:"destroy",value:function(){this.removeFake()}},{key:"action",set:function(t){var e=0<arguments.length&&void 0!==t?t:"copy";if(this._action=e,"copy"!==this._action&&"cut"!==this._action)throw new Error('Invalid "action" value, use either "copy" or "cut"')},get:function(){return this._action}},{key:"target",set:function(t){if(void 0!==t){if(!t||"object"!==(void 0===t?"undefined":i(t))||1!==t.nodeType)throw new Error('Invalid "target" value, use a valid Element');if("copy"===this.action&&t.hasAttribute("disabled"))throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');if("cut"===this.action&&(t.hasAttribute("readonly")||t.hasAttribute("disabled")))throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');this._target=t}},get:function(){return this._target}}]),c),u=n(1),s=n.n(u),f=n(2),d=n.n(f),h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},p=function(t,e,n){return e&&y(t.prototype,e),n&&y(t,n),t};function y(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}var m=(function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(v,s.a),p(v,[{key:"resolveOptions",value:function(t){var e=0<arguments.length&&void 0!==t?t:{};this.action="function"==typeof e.action?e.action:this.defaultAction,this.target="function"==typeof e.target?e.target:this.defaultTarget,this.text="function"==typeof e.text?e.text:this.defaultText,this.container="object"===h(e.container)?e.container:document.body}},{key:"listenClick",value:function(t){var e=this;this.listener=d()(t,"click",function(t){return e.onClick(t)})}},{key:"onClick",value:function(t){var e=t.delegateTarget||t.currentTarget;this.clipboardAction&&(this.clipboardAction=null),this.clipboardAction=new l({action:this.action(e),target:this.target(e),text:this.text(e),container:this.container,trigger:e,emitter:this})}},{key:"defaultAction",value:function(t){return b("action",t)}},{key:"defaultTarget",value:function(t){var e=b("target",t);if(e)return document.querySelector(e)}},{key:"defaultText",value:function(t){return b("text",t)}},{key:"destroy",value:function(){this.listener.destroy(),this.clipboardAction&&(this.clipboardAction.destroy(),this.clipboardAction=null)}}],[{key:"isSupported",value:function(t){var e=0<arguments.length&&void 0!==t?t:["copy","cut"],n="string"==typeof e?[e]:e,o=!!document.queryCommandSupported;return n.forEach(function(t){o=o&&!!document.queryCommandSupported(t)}),o}}]),v);function v(t,e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,v);var n=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(v.__proto__||Object.getPrototypeOf(v)).call(this));return n.resolveOptions(e),n.listenClick(t),n}function b(t,e){var n="data-clipboard-"+t;if(e.hasAttribute(n))return e.getAttribute(n)}e.default=m}],r.c=o,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=6).default;function r(t){if(o[t])return o[t].exports;var e=o[t]={i:t,l:!1,exports:{}};return n[t].call(e.exports,e,e.exports,r),e.l=!0,e.exports}var n,o});