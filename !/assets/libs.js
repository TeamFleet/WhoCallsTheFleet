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
 * Copyright 2009-2012 Kris Kowal under the terms of the MIT
 * license found at http://github.com/kriskowal/q/raw/master/LICENSE
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
    } else if (typeof self !== "undefined") {
        self.Q = definition();

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
        //   `process.nextTick()` yields "[object process]".
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
        error.stack &&
        error.stack.indexOf(STACK_JUMP_SEPARATOR) === -1
    ) {
        var stacks = [];
        for (var p = promise; !!p; p = p.source) {
            if (p.stack) {
                stacks.unshift(p.stack);
            }
        }
        stacks.unshift(error.stack);

        var concatedStacks = stacks.join("\n" + STACK_JUMP_SEPARATOR + "\n");
        error.stack = filterStackString(concatedStacks);
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
        }
    }

    // NOTE: we do the checks for `resolvedPromise` in each method, instead of
    // consolidating them into `become`, since otherwise we'd create new
    // promises with the lines `become(whatever(value))`. See e.g. GH-252.

    function become(newPromise) {
        resolvedPromise = newPromise;
        promise.source = newPromise;

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
            throw new Error("Can't join: not the same: " + x + " " + y);
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
        function onRejected() {
            pendingCount--;
            if (pendingCount === 0) {
                deferred.reject(new Error(
                    "Can't get fulfillment value from any promise, all " +
                    "promises were rejected."
                ));
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

// All code before this point will be filtered from stack traces.
var qEndingLine = captureLine();

return Q;

});

!function(t){if("function"==typeof bootstrap)bootstrap("nedb",t);else if("object"==typeof exports)module.exports=t();else if("function"==typeof define&&define.amd)define(t);else if("undefined"!=typeof ses){if(!ses.ok())return;ses.makeNedb=t}else"undefined"!=typeof window?window.Nedb=t():global.Nedb=t()}(function(){var t;return function(t,e,n){function r(n,o){if(!e[n]){if(!t[n]){var a="function"==typeof require&&require;if(!o&&a)return a(n,!0);if(i)return i(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=e[n]={exports:{}};t[n][0].call(u.exports,function(e){var i=t[n][1][e];return r(i?i:e)},u,u.exports)}return e[n].exports}for(var i="function"==typeof require&&require,o=0;o<n.length;o++)r(n[o]);return r}({1:[function(t,e,n){function r(t,e){if(t.indexOf)return t.indexOf(e);for(var n=0;n<t.length;n++)if(e===t[n])return n;return-1}var i=t("__browserify_process");i.EventEmitter||(i.EventEmitter=function(){});var o=n.EventEmitter=i.EventEmitter,a="function"==typeof Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)},u=10;o.prototype.setMaxListeners=function(t){this._events||(this._events={}),this._events.maxListeners=t},o.prototype.emit=function(t){if("error"===t&&(!this._events||!this._events.error||a(this._events.error)&&!this._events.error.length))throw arguments[1]instanceof Error?arguments[1]:new Error("Uncaught, unspecified 'error' event.");if(!this._events)return!1;var e=this._events[t];if(!e)return!1;if("function"==typeof e){switch(arguments.length){case 1:e.call(this);break;case 2:e.call(this,arguments[1]);break;case 3:e.call(this,arguments[1],arguments[2]);break;default:var n=Array.prototype.slice.call(arguments,1);e.apply(this,n)}return!0}if(a(e)){for(var n=Array.prototype.slice.call(arguments,1),r=e.slice(),i=0,o=r.length;o>i;i++)r[i].apply(this,n);return!0}return!1},o.prototype.addListener=function(t,e){if("function"!=typeof e)throw new Error("addListener only takes instances of Function");if(this._events||(this._events={}),this.emit("newListener",t,e),this._events[t])if(a(this._events[t])){if(!this._events[t].warned){var n;n=void 0!==this._events.maxListeners?this._events.maxListeners:u,n&&n>0&&this._events[t].length>n&&(this._events[t].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[t].length),console.trace())}this._events[t].push(e)}else this._events[t]=[this._events[t],e];else this._events[t]=e;return this},o.prototype.on=o.prototype.addListener,o.prototype.once=function(t,e){var n=this;return n.on(t,function r(){n.removeListener(t,r),e.apply(this,arguments)}),this},o.prototype.removeListener=function(t,e){if("function"!=typeof e)throw new Error("removeListener only takes instances of Function");if(!this._events||!this._events[t])return this;var n=this._events[t];if(a(n)){var i=r(n,e);if(0>i)return this;n.splice(i,1),0==n.length&&delete this._events[t]}else this._events[t]===e&&delete this._events[t];return this},o.prototype.removeAllListeners=function(t){return 0===arguments.length?(this._events={},this):(t&&this._events&&this._events[t]&&(this._events[t]=null),this)},o.prototype.listeners=function(t){return this._events||(this._events={}),this._events[t]||(this._events[t]=[]),a(this._events[t])||(this._events[t]=[this._events[t]]),this._events[t]},o.listenerCount=function(t,e){var n;return n=t._events&&t._events[e]?"function"==typeof t._events[e]?1:t._events[e].length:0}},{__browserify_process:4}],2:[function(t,e,n){function r(t,e){for(var n=[],r=0;r<t.length;r++)e(t[r],r,t)&&n.push(t[r]);return n}function i(t,e){for(var n=0,r=t.length;r>=0;r--){var i=t[r];"."==i?t.splice(r,1):".."===i?(t.splice(r,1),n++):n&&(t.splice(r,1),n--)}if(e)for(;n--;n)t.unshift("..");return t}var o=t("__browserify_process"),a=/^(.+\/(?!$)|\/)?((?:.+?)?(\.[^.]*)?)$/;n.resolve=function(){for(var t="",e=!1,n=arguments.length;n>=-1&&!e;n--){var a=n>=0?arguments[n]:o.cwd();"string"==typeof a&&a&&(t=a+"/"+t,e="/"===a.charAt(0))}return t=i(r(t.split("/"),function(t){return!!t}),!e).join("/"),(e?"/":"")+t||"."},n.normalize=function(t){var e="/"===t.charAt(0),n="/"===t.slice(-1);return t=i(r(t.split("/"),function(t){return!!t}),!e).join("/"),t||e||(t="."),t&&n&&(t+="/"),(e?"/":"")+t},n.join=function(){var t=Array.prototype.slice.call(arguments,0);return n.normalize(r(t,function(t){return t&&"string"==typeof t}).join("/"))},n.dirname=function(t){var e=a.exec(t)[1]||"",n=!1;return e?1===e.length||n&&e.length<=3&&":"===e.charAt(1)?e:e.substring(0,e.length-1):"."},n.basename=function(t,e){var n=a.exec(t)[2]||"";return e&&n.substr(-1*e.length)===e&&(n=n.substr(0,n.length-e.length)),n},n.extname=function(t){return a.exec(t)[3]||""},n.relative=function(t,e){function r(t){for(var e=0;e<t.length&&""===t[e];e++);for(var n=t.length-1;n>=0&&""===t[n];n--);return e>n?[]:t.slice(e,n-e+1)}t=n.resolve(t).substr(1),e=n.resolve(e).substr(1);for(var i=r(t.split("/")),o=r(e.split("/")),a=Math.min(i.length,o.length),u=a,s=0;a>s;s++)if(i[s]!==o[s]){u=s;break}for(var c=[],s=u;s<i.length;s++)c.push("..");return c=c.concat(o.slice(u)),c.join("/")},n.sep="/"},{__browserify_process:4}],3:[function(t,e,n){function r(t){return Array.isArray(t)||"object"==typeof t&&"[object Array]"===Object.prototype.toString.call(t)}function i(t){"object"==typeof t&&"[object RegExp]"===Object.prototype.toString.call(t)}function o(t){return"object"==typeof t&&"[object Date]"===Object.prototype.toString.call(t)}t("events"),n.isArray=r,n.isDate=function(t){return"[object Date]"===Object.prototype.toString.call(t)},n.isRegExp=function(t){return"[object RegExp]"===Object.prototype.toString.call(t)},n.print=function(){},n.puts=function(){},n.debug=function(){},n.inspect=function(t,e,s,c){function f(t,s){if(t&&"function"==typeof t.inspect&&t!==n&&(!t.constructor||t.constructor.prototype!==t))return t.inspect(s);switch(typeof t){case"undefined":return h("undefined","undefined");case"string":var c="'"+JSON.stringify(t).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return h(c,"string");case"number":return h(""+t,"number");case"boolean":return h(""+t,"boolean")}if(null===t)return h("null","null");var p=a(t),d=e?u(t):p;if("function"==typeof t&&0===d.length){if(i(t))return h(""+t,"regexp");var y=t.name?": "+t.name:"";return h("[Function"+y+"]","special")}if(o(t)&&0===d.length)return h(t.toUTCString(),"date");var v,g,m;if(r(t)?(g="Array",m=["[","]"]):(g="Object",m=["{","}"]),"function"==typeof t){var b=t.name?": "+t.name:"";v=i(t)?" "+t:" [Function"+b+"]"}else v="";if(o(t)&&(v=" "+t.toUTCString()),0===d.length)return m[0]+v+m[1];if(0>s)return i(t)?h(""+t,"regexp"):h("[Object]","special");l.push(t);var w=d.map(function(e){var n,i;if(t.__lookupGetter__&&(t.__lookupGetter__(e)?i=t.__lookupSetter__(e)?h("[Getter/Setter]","special"):h("[Getter]","special"):t.__lookupSetter__(e)&&(i=h("[Setter]","special"))),p.indexOf(e)<0&&(n="["+e+"]"),i||(l.indexOf(t[e])<0?(i=null===s?f(t[e]):f(t[e],s-1),i.indexOf("\n")>-1&&(i=r(t)?i.split("\n").map(function(t){return"  "+t}).join("\n").substr(2):"\n"+i.split("\n").map(function(t){return"   "+t}).join("\n"))):i=h("[Circular]","special")),"undefined"==typeof n){if("Array"===g&&e.match(/^\d+$/))return i;n=JSON.stringify(""+e),n.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(n=n.substr(1,n.length-2),n=h(n,"name")):(n=n.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),n=h(n,"string"))}return n+": "+i});l.pop();var _=0,k=w.reduce(function(t,e){return _++,e.indexOf("\n")>=0&&_++,t+e.length+1},0);return w=k>50?m[0]+(""===v?"":v+"\n ")+" "+w.join(",\n  ")+" "+m[1]:m[0]+v+" "+w.join(", ")+" "+m[1]}var l=[],h=function(t,e){var n={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},r={special:"cyan",number:"blue","boolean":"yellow",undefined:"grey","null":"bold",string:"green",date:"magenta",regexp:"red"}[e];return r?"["+n[r][0]+"m"+t+"["+n[r][1]+"m":t};return c||(h=function(t){return t}),f(t,"undefined"==typeof s?2:s)},n.log=function(){},n.pump=null;var a=Object.keys||function(t){var e=[];for(var n in t)e.push(n);return e},u=Object.getOwnPropertyNames||function(t){var e=[];for(var n in t)Object.hasOwnProperty.call(t,n)&&e.push(n);return e},s=Object.create||function(t,e){var n;if(null===t)n={__proto__:null};else{if("object"!=typeof t)throw new TypeError("typeof prototype["+typeof t+"] != 'object'");var r=function(){};r.prototype=t,n=new r,n.__proto__=t}return"undefined"!=typeof e&&Object.defineProperties&&Object.defineProperties(n,e),n};n.inherits=function(t,e){t.super_=e,t.prototype=s(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}})};var c=/%[sdj%]/g;n.format=function(t){if("string"!=typeof t){for(var e=[],r=0;r<arguments.length;r++)e.push(n.inspect(arguments[r]));return e.join(" ")}for(var r=1,i=arguments,o=i.length,a=String(t).replace(c,function(t){if("%%"===t)return"%";if(r>=o)return t;switch(t){case"%s":return String(i[r++]);case"%d":return Number(i[r++]);case"%j":return JSON.stringify(i[r++]);default:return t}}),u=i[r];o>r;u=i[++r])a+=null===u||"object"!=typeof u?" "+u:" "+n.inspect(u);return a}},{events:1}],4:[function(t,e){var n=e.exports={};n.nextTick=function(){var t="undefined"!=typeof window&&window.setImmediate,e="undefined"!=typeof window&&window.postMessage&&window.addEventListener;if(t)return function(t){return window.setImmediate(t)};if(e){var n=[];return window.addEventListener("message",function(t){var e=t.source;if((e===window||null===e)&&"process-tick"===t.data&&(t.stopPropagation(),n.length>0)){var r=n.shift();r()}},!0),function(t){n.push(t),window.postMessage("process-tick","*")}}return function(t){setTimeout(t,0)}}(),n.title="browser",n.browser=!0,n.env={},n.argv=[],n.binding=function(){throw new Error("process.binding is not supported")},n.cwd=function(){return"/"},n.chdir=function(){throw new Error("process.chdir is not supported")}},{}],5:[function(t,e){function n(t,e,n){this.db=t,this.query=e||{},n&&(this.execFn=n)}var r=t("./model"),i=t("underscore");n.prototype.limit=function(t){return this._limit=t,this},n.prototype.skip=function(t){return this._skip=t,this},n.prototype.sort=function(t){return this._sort=t,this},n.prototype.projection=function(t){return this._projection=t,this},n.prototype.project=function(t){var e,n,r,o=[],a=this;return void 0===this._projection||0===Object.keys(this._projection).length?t:(e=0===this._projection._id?!1:!0,this._projection=i.omit(this._projection,"_id"),r=Object.keys(this._projection),r.forEach(function(t){if(void 0!==n&&a._projection[t]!==n)throw new Error("Can't both keep and omit fields except for _id");n=a._projection[t]}),t.forEach(function(t){var a=1===n?i.pick(t,r):i.omit(t,r);e?a._id=t._id:delete a._id,o.push(a)}),o)},n.prototype._exec=function(t){var e,n,i,o=this.db.getCandidates(this.query),a=[],u=0,s=0,c=this,f=null;try{for(e=0;e<o.length;e+=1)if(r.match(o[e],this.query))if(this._sort)a.push(o[e]);else if(this._skip&&this._skip>s)s+=1;else if(a.push(o[e]),u+=1,this._limit&&this._limit<=u)break}catch(l){return t(l)}if(this._sort){n=Object.keys(this._sort);var h=[];for(e=0;e<n.length;e++)i=n[e],h.push({key:i,direction:c._sort[i]});a.sort(function(t,e){var n,i,o;for(o=0;o<h.length;o++)if(n=h[o],i=n.direction*r.compareThings(r.getDotValue(t,n.key),r.getDotValue(e,n.key)),0!==i)return i;return 0});var p=this._limit||a.length,d=this._skip||0;a=a.slice(d,d+p)}try{a=this.project(a)}catch(y){f=y,a=void 0}return this.execFn?this.execFn(f,a,t):t(f,a)},n.prototype.exec=function(){this.db.executor.push({"this":this,fn:this._exec,arguments:arguments})},e.exports=n},{"./model":10,underscore:19}],6:[function(t,e){function n(t){for(var e,e,n=new Array(t),r=0;t>r;r++)0==(3&r)&&(e=4294967296*Math.random()),n[r]=255&e>>>((3&r)<<3);return n}function r(t){function e(t){return o[63&t>>18]+o[63&t>>12]+o[63&t>>6]+o[63&t]}var n,r,i,o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",a=t.length%3,u="";for(i=0,r=t.length-a;r>i;i+=3)n=(t[i]<<16)+(t[i+1]<<8)+t[i+2],u+=e(n);switch(a){case 1:n=t[t.length-1],u+=o[n>>2],u+=o[63&n<<4],u+="==";break;case 2:n=(t[t.length-2]<<8)+t[t.length-1],u+=o[n>>10],u+=o[63&n>>4],u+=o[63&n<<2],u+="="}return u}function i(t){return r(n(Math.ceil(Math.max(8,2*t)))).replace(/[+\/]/g,"").slice(0,t)}e.exports.uid=i},{}],7:[function(t,e){function n(t){var e;"string"==typeof t?(e=t,this.inMemoryOnly=!1):(t=t||{},e=t.filename,this.inMemoryOnly=t.inMemoryOnly||!1,this.autoload=t.autoload||!1,this.timestampData=t.timestampData||!1),e&&"string"==typeof e&&0!==e.length?this.filename=e:(this.filename=null,this.inMemoryOnly=!0),this.persistence=new f({db:this,nodeWebkitAppName:t.nodeWebkitAppName,afterSerialization:t.afterSerialization,beforeDeserialization:t.beforeDeserialization,corruptAlertThreshold:t.corruptAlertThreshold}),this.executor=new a,this.inMemoryOnly&&(this.executor.ready=!0),this.indexes={},this.indexes._id=new u({fieldName:"_id",unique:!0}),this.autoload&&this.loadDatabase(t.onload||function(t){if(t)throw t})}var r=t("./customUtils"),i=t("./model"),o=t("async"),a=t("./executor"),u=t("./indexes"),s=t("util"),c=t("underscore"),f=t("./persistence"),l=t("./cursor");n.prototype.loadDatabase=function(){this.executor.push({"this":this.persistence,fn:this.persistence.loadDatabase,arguments:arguments},!0)},n.prototype.getAllData=function(){return this.indexes._id.getAll()},n.prototype.resetIndexes=function(t){var e=this;Object.keys(this.indexes).forEach(function(n){e.indexes[n].reset(t)})},n.prototype.ensureIndex=function(t,e){var n,r=e||function(){};if(t=t||{},!t.fieldName)return n=new Error("Cannot create an index without a fieldName"),n.missingFieldName=!0,r(n);if(this.indexes[t.fieldName])return r(null);this.indexes[t.fieldName]=new u(t);try{this.indexes[t.fieldName].insert(this.getAllData())}catch(i){return delete this.indexes[t.fieldName],r(i)}this.persistence.persistNewState([{$$indexCreated:t}],function(t){return t?r(t):r(null)})},n.prototype.removeIndex=function(t,e){var n=e||function(){};delete this.indexes[t],this.persistence.persistNewState([{$$indexRemoved:t}],function(t){return t?n(t):n(null)})},n.prototype.addToIndexes=function(t){var e,n,r,i=Object.keys(this.indexes);for(e=0;e<i.length;e+=1)try{this.indexes[i[e]].insert(t)}catch(o){n=e,r=o;break}if(r){for(e=0;n>e;e+=1)this.indexes[i[e]].remove(t);throw r}},n.prototype.removeFromIndexes=function(t){var e=this;Object.keys(this.indexes).forEach(function(n){e.indexes[n].remove(t)})},n.prototype.updateIndexes=function(t,e){var n,r,i,o=Object.keys(this.indexes);for(n=0;n<o.length;n+=1)try{this.indexes[o[n]].update(t,e)}catch(a){r=n,i=a;break}if(i){for(n=0;r>n;n+=1)this.indexes[o[n]].revertUpdate(t,e);throw i}},n.prototype.getCandidates=function(t){var e,n=Object.keys(this.indexes);return e=[],Object.keys(t).forEach(function(n){("string"==typeof t[n]||"number"==typeof t[n]||"boolean"==typeof t[n]||s.isDate(t[n])||null===t[n])&&e.push(n)}),e=c.intersection(e,n),e.length>0?this.indexes[e[0]].getMatching(t[e[0]]):(e=[],Object.keys(t).forEach(function(n){t[n]&&t[n].hasOwnProperty("$in")&&e.push(n)}),e=c.intersection(e,n),e.length>0?this.indexes[e[0]].getMatching(t[e[0]].$in):(e=[],Object.keys(t).forEach(function(n){t[n]&&(t[n].hasOwnProperty("$lt")||t[n].hasOwnProperty("$lte")||t[n].hasOwnProperty("$gt")||t[n].hasOwnProperty("$gte"))&&e.push(n)}),e=c.intersection(e,n),e.length>0?this.indexes[e[0]].getBetweenBounds(t[e[0]]):this.getAllData()))},n.prototype._insert=function(t,e){var n,r=e||function(){};try{n=this.prepareDocumentForInsertion(t),this._insertInCache(n)}catch(o){return r(o)}this.persistence.persistNewState(s.isArray(n)?n:[n],function(t){return t?r(t):r(null,i.deepCopy(n))})},n.prototype.createNewId=function(){var t=r.uid(16);return this.indexes._id.getMatching(t).length>0&&(t=this.createNewId()),t},n.prototype.prepareDocumentForInsertion=function(t){var e,n=this;if(s.isArray(t))e=[],t.forEach(function(t){e.push(n.prepareDocumentForInsertion(t))});else{e=i.deepCopy(t),void 0===e._id&&(e._id=this.createNewId());var r=new Date;this.timestampData&&void 0===e.createdAt&&(e.createdAt=r),this.timestampData&&void 0===e.updatedAt&&(e.updatedAt=r),i.checkObject(e)}return e},n.prototype._insertInCache=function(t){s.isArray(t)?this._insertMultipleDocsInCache(t):this.addToIndexes(t)},n.prototype._insertMultipleDocsInCache=function(t){var e,n,r;for(e=0;e<t.length;e+=1)try{this.addToIndexes(t[e])}catch(i){r=i,n=e;break}if(r){for(e=0;n>e;e+=1)this.removeFromIndexes(t[e]);throw r}},n.prototype.insert=function(){this.executor.push({"this":this,fn:this._insert,arguments:arguments})},n.prototype.count=function(t,e){var n=new l(this,t,function(t,e,n){return t?n(t):n(null,e.length)});return"function"!=typeof e?n:(n.exec(e),void 0)},n.prototype.find=function(t,e,n){switch(arguments.length){case 1:e={};break;case 2:"function"==typeof e&&(n=e,e={})}var r=new l(this,t,function(t,e,n){var r,o=[];if(t)return n(t);for(r=0;r<e.length;r+=1)o.push(i.deepCopy(e[r]));return n(null,o)});return r.projection(e),"function"!=typeof n?r:(r.exec(n),void 0)},n.prototype.findOne=function(t,e,n){switch(arguments.length){case 1:e={};break;case 2:"function"==typeof e&&(n=e,e={})}var r=new l(this,t,function(t,e,n){return t?n(t):1===e.length?n(null,i.deepCopy(e[0])):n(null,null)});return r.projection(e).limit(1),"function"!=typeof n?r:(r.exec(n),void 0)},n.prototype._update=function(t,e,n,r){var a,u,s,f,h=this,p=0;"function"==typeof n&&(r=n,n={}),a=r||function(){},u=void 0!==n.multi?n.multi:!1,s=void 0!==n.upsert?n.upsert:!1,o.waterfall([function(n){if(!s)return n();var r=new l(h,t);r.limit(1)._exec(function(r,o){if(r)return a(r);if(1===o.length)return n();var u;try{i.checkObject(e),u=e}catch(s){try{u=i.modify(i.deepCopy(t,!0),e)}catch(r){return a(r)}}return h._insert(u,function(t,e){return t?a(t):a(null,1,e)})})},function(){var r,o=h.getCandidates(t),s=[];try{for(f=0;f<o.length;f+=1)i.match(o[f],t)&&(u||0===p)&&(p+=1,r=i.modify(o[f],e),h.timestampData&&(r.updatedAt=new Date),s.push({oldDoc:o[f],newDoc:r}))}catch(l){return a(l)}try{h.updateIndexes(s)}catch(l){return a(l)}var d=c.pluck(s,"newDoc");h.persistence.persistNewState(d,function(t){if(t)return a(t);if(n.returnUpdatedDocs){var e=[];return d.forEach(function(t){e.push(i.deepCopy(t))}),a(null,p,e)}return a(null,p)})}])},n.prototype.update=function(){this.executor.push({"this":this,fn:this._update,arguments:arguments})},n.prototype._remove=function(t,e,n){var r,o,a=this,u=0,s=[],c=this.getCandidates(t);"function"==typeof e&&(n=e,e={}),r=n||function(){},o=void 0!==e.multi?e.multi:!1;try{c.forEach(function(e){i.match(e,t)&&(o||0===u)&&(u+=1,s.push({$$deleted:!0,_id:e._id}),a.removeFromIndexes(e))})}catch(f){return r(f)}a.persistence.persistNewState(s,function(t){return t?r(t):r(null,u)})},n.prototype.remove=function(){this.executor.push({"this":this,fn:this._remove,arguments:arguments})},e.exports=n},{"./cursor":5,"./customUtils":6,"./executor":8,"./indexes":9,"./model":10,"./persistence":11,async:13,underscore:19,util:3}],8:[function(t,e){function n(){this.buffer=[],this.ready=!1,this.queue=i.queue(function(t,e){var n,i,o=t.arguments[t.arguments.length-1],a=[];for(i=0;i<t.arguments.length;i+=1)a.push(t.arguments[i]);"function"==typeof o?(n=function(){"function"==typeof setImmediate?setImmediate(e):r.nextTick(e),o.apply(null,arguments)},a[a.length-1]=n):(n=function(){e()},a.push(n)),t.fn.apply(t.this,a)},1)}var r=t("__browserify_process"),i=t("async");n.prototype.push=function(t,e){this.ready||e?this.queue.push(t):this.buffer.push(t)},n.prototype.processBuffer=function(){var t;for(this.ready=!0,t=0;t<this.buffer.length;t+=1)this.queue.push(this.buffer[t]);this.buffer=[]},e.exports=n},{__browserify_process:4,async:13}],9:[function(t,e){function n(t,e){return t===e}function r(t){return null===t?"$null":"string"==typeof t?"$string"+t:"boolean"==typeof t?"$boolean"+t:"number"==typeof t?"$number"+t:s.isArray(t)?"$date"+t.getTime():t}function i(t){this.fieldName=t.fieldName,this.unique=t.unique||!1,this.sparse=t.sparse||!1,this.treeOptions={unique:this.unique,compareKeys:a.compareThings,checkValueEquality:n},this.reset()}var o=t("binary-search-tree").AVLTree,a=t("./model"),u=t("underscore"),s=t("util");i.prototype.reset=function(t){this.tree=new o(this.treeOptions),t&&this.insert(t)},i.prototype.insert=function(t){var e,n,i,o,c;if(s.isArray(t))return this.insertMultipleDocs(t),void 0;if(e=a.getDotValue(t,this.fieldName),void 0!==e||!this.sparse)if(s.isArray(e)){for(n=u.uniq(e,r),i=0;i<n.length;i+=1)try{this.tree.insert(n[i],t)}catch(f){c=f,o=i;break}if(c){for(i=0;o>i;i+=1)this.tree.delete(n[i],t);throw c}}else this.tree.insert(e,t)},i.prototype.insertMultipleDocs=function(t){var e,n,r;for(e=0;e<t.length;e+=1)try{this.insert(t[e])}catch(i){n=i,r=e;break}if(n){for(e=0;r>e;e+=1)this.remove(t[e]);throw n}},i.prototype.remove=function(t){var e,n=this;return s.isArray(t)?(t.forEach(function(t){n.remove(t)}),void 0):(e=a.getDotValue(t,this.fieldName),void 0===e&&this.sparse||(s.isArray(e)?u.uniq(e,r).forEach(function(e){n.tree.delete(e,t)}):this.tree.delete(e,t)),void 0)},i.prototype.update=function(t,e){if(s.isArray(t))return this.updateMultipleDocs(t),void 0;this.remove(t);try{this.insert(e)}catch(n){throw this.insert(t),n}},i.prototype.updateMultipleDocs=function(t){var e,n,r;for(e=0;e<t.length;e+=1)this.remove(t[e].oldDoc);for(e=0;e<t.length;e+=1)try{this.insert(t[e].newDoc)}catch(i){r=i,n=e;break}if(r){for(e=0;n>e;e+=1)this.remove(t[e].newDoc);for(e=0;e<t.length;e+=1)this.insert(t[e].oldDoc);throw r}},i.prototype.revertUpdate=function(t,e){var n=[];s.isArray(t)?(t.forEach(function(t){n.push({oldDoc:t.newDoc,newDoc:t.oldDoc})}),this.update(n)):this.update(e,t)},i.prototype.getMatching=function(t){var e=this;if(s.isArray(t)){var n={},r=[];return t.forEach(function(t){e.getMatching(t).forEach(function(t){n[t._id]=t})}),Object.keys(n).forEach(function(t){r.push(n[t])}),r}return e.tree.search(t)},i.prototype.getBetweenBounds=function(t){return this.tree.betweenBounds(t)},i.prototype.getAll=function(){var t=[];return this.tree.executeOnEveryNode(function(e){var n;for(n=0;n<e.data.length;n+=1)t.push(e.data[n])}),t},e.exports=i},{"./model":10,"binary-search-tree":14,underscore:19,util:3}],10:[function(t,e){function n(t,e){if("number"==typeof t&&(t=t.toString()),!("$"!==t[0]||"$$date"===t&&"number"==typeof e||"$$deleted"===t&&e===!0||"$$indexCreated"===t||"$$indexRemoved"===t))throw new Error("Field names cannot begin with the $ character");if(-1!==t.indexOf("."))throw new Error("Field names cannot contain a .")}function r(t){m.isArray(t)&&t.forEach(function(t){r(t)}),"object"==typeof t&&null!==t&&Object.keys(t).forEach(function(e){n(e,t[e]),r(t[e])})}function i(t){var e;return e=JSON.stringify(t,function(t,e){return n(t,e),void 0===e?void 0:null===e?null:"function"==typeof this[t].getTime?{$$date:this[t].getTime()}:e})}function o(t){return JSON.parse(t,function(t,e){return"$$date"===t?new Date(e):"string"==typeof e||"number"==typeof e||"boolean"==typeof e||null===e?e:e&&e.$$date?e.$$date:e})}function a(t,e){var n;return"boolean"==typeof t||"number"==typeof t||"string"==typeof t||null===t||m.isDate(t)?t:m.isArray(t)?(n=[],t.forEach(function(t){n.push(a(t,e))}),n):"object"==typeof t?(n={},Object.keys(t).forEach(function(r){(!e||"$"!==r[0]&&-1===r.indexOf("."))&&(n[r]=a(t[r],e))}),n):void 0}function u(t){return"boolean"==typeof t||"number"==typeof t||"string"==typeof t||null===t||m.isDate(t)||m.isArray(t)}function s(t,e){return e>t?-1:t>e?1:0}function c(t,e){var n,r;for(n=0;n<Math.min(t.length,e.length);n+=1)if(r=f(t[n],e[n]),0!==r)return r;return s(t.length,e.length)}function f(t,e){var n,r,i,o;if(void 0===t)return void 0===e?0:-1;if(void 0===e)return void 0===t?0:1;if(null===t)return null===e?0:-1;if(null===e)return null===t?0:1;if("number"==typeof t)return"number"==typeof e?s(t,e):-1;if("number"==typeof e)return"number"==typeof t?s(t,e):1;if("string"==typeof t)return"string"==typeof e?s(t,e):-1;if("string"==typeof e)return"string"==typeof t?s(t,e):1;if("boolean"==typeof t)return"boolean"==typeof e?s(t,e):-1;if("boolean"==typeof e)return"boolean"==typeof t?s(t,e):1;if(m.isDate(t))return m.isDate(e)?s(t.getTime(),e.getTime()):-1;if(m.isDate(e))return m.isDate(t)?s(t.getTime(),e.getTime()):1;if(m.isArray(t))return m.isArray(e)?c(t,e):-1;if(m.isArray(e))return m.isArray(t)?c(t,e):1;for(n=Object.keys(t).sort(),r=Object.keys(e).sort(),o=0;o<Math.min(n.length,r.length);o+=1)if(i=f(t[n[o]],e[r[o]]),0!==i)return i;return s(n.length,r.length)}function l(t){return function(e,n,r){var i="string"==typeof n?n.split("."):n;1===i.length?_[t](e,n,r):(e[i[0]]=e[i[0]]||{},w[t](e[i[0]],i.slice(1),r))}}function h(t,e){var n,i,o=Object.keys(e),u=b.map(o,function(t){return t[0]}),s=b.filter(u,function(t){return"$"===t});if(-1!==o.indexOf("_id")&&e._id!==t._id)throw new Error("You cannot change a document's _id");if(0!==s.length&&s.length!==u.length)throw new Error("You cannot mix modifiers and normal fields");if(0===s.length?(n=a(e),n._id=t._id):(i=b.uniq(o),n=a(t),i.forEach(function(t){var r;if(!w[t])throw new Error("Unknown modifier "+t);if("object"!=typeof e[t])throw new Error("Modifier "+t+"'s argument must be an object");r=Object.keys(e[t]),r.forEach(function(r){w[t](n,r,e[t][r])})})),r(n),t._id!==n._id)throw new Error("You can't change a document's _id");return n}function p(t,e){var n,r,i="string"==typeof e?e.split("."):e;if(!t)return void 0;if(0===i.length)return t;if(1===i.length)return t[i[0]];if(m.isArray(t[i[0]])){if(n=parseInt(i[1],10),"number"==typeof n&&!isNaN(n))return p(t[i[0]][n],i.slice(2));for(r=new Array,n=0;n<t[i[0]].length;n+=1)r.push(p(t[i[0]][n],i.slice(1)));return r}return p(t[i[0]],i.slice(1))}function d(t,e){var n,r,i;if(null===t||"string"==typeof t||"boolean"==typeof t||"number"==typeof t||null===e||"string"==typeof e||"boolean"==typeof e||"number"==typeof e)return t===e;if(m.isDate(t)||m.isDate(e))return m.isDate(t)&&m.isDate(e)&&t.getTime()===e.getTime();if(m.isArray(t)||m.isArray(e)||void 0===t||void 0===e)return!1;try{n=Object.keys(t),r=Object.keys(e)}catch(o){return!1}if(n.length!==r.length)return!1;for(i=0;i<n.length;i+=1){if(-1===r.indexOf(n[i]))return!1;if(!d(t[n[i]],e[n[i]]))return!1}return!0}function y(t,e){return"string"==typeof t||"number"==typeof t||m.isDate(t)||"string"==typeof e||"number"==typeof e||m.isDate(e)?typeof t!=typeof e?!1:!0:!1}function v(t,e){var n,r,i,o;if(u(t)||u(e))return g({needAKey:t},"needAKey",e);for(n=Object.keys(e),o=0;o<n.length;o+=1)if(r=n[o],i=e[r],"$"===r[0]){if(!x[r])throw new Error("Unknown logical operator "+r);if(!x[r](t,i))return!1}else if(!g(t,r,i))return!1;return!0}function g(t,e,n,r){var i,o,a,u,s=p(t,e);if(m.isArray(s)&&!r){if(null!==n&&"object"==typeof n&&!m.isRegExp(n))for(o=Object.keys(n),i=0;i<o.length;i+=1)if(E[o[i]])return g(t,e,n,!0);for(i=0;i<s.length;i+=1)if(g({k:s[i]},"k",n))return!0;return!1}if(null!==n&&"object"==typeof n&&!m.isRegExp(n)){if(o=Object.keys(n),a=b.map(o,function(t){return t[0]}),u=b.filter(a,function(t){return"$"===t}),0!==u.length&&u.length!==a.length)throw new Error("You cannot mix operators and normal fields");if(u.length>0){for(i=0;i<o.length;i+=1){if(!k[o[i]])throw new Error("Unknown comparison function "+o[i]);if(!k[o[i]](s,n[o[i]]))return!1}return!0}}return m.isRegExp(n)?k.$regex(s,n):d(s,n)?!0:!1}var m=t("util"),b=t("underscore"),w={},_={},k={},x={},E={};_.$set=function(t,e,n){t[e]=n},_.$unset=function(t,e){delete t[e]},_.$push=function(t,e,n){if(t.hasOwnProperty(e)||(t[e]=[]),!m.isArray(t[e]))throw new Error("Can't $push an element on non-array values");if(null!==n&&"object"==typeof n&&n.$each){if(Object.keys(n).length>1)throw new Error("Can't use another field in conjunction with $each");if(!m.isArray(n.$each))throw new Error("$each requires an array value");n.$each.forEach(function(n){t[e].push(n)})}else t[e].push(n)},_.$addToSet=function(t,e,n){var r=!0;if(t.hasOwnProperty(e)||(t[e]=[]),!m.isArray(t[e]))throw new Error("Can't $addToSet an element on non-array values");if(null!==n&&"object"==typeof n&&n.$each){if(Object.keys(n).length>1)throw new Error("Can't use another field in conjunction with $each");if(!m.isArray(n.$each))throw new Error("$each requires an array value");n.$each.forEach(function(n){_.$addToSet(t,e,n)})}else t[e].forEach(function(t){0===f(t,n)&&(r=!1)}),r&&t[e].push(n)},_.$pop=function(t,e,n){if(!m.isArray(t[e]))throw new Error("Can't $pop an element from non-array values");if("number"!=typeof n)throw new Error(n+" isn't an integer, can't use it with $pop");0!==n&&(t[e]=n>0?t[e].slice(0,t[e].length-1):t[e].slice(1))},_.$pull=function(t,e,n){var r,i;if(!m.isArray(t[e]))throw new Error("Can't $pull an element from non-array values");for(r=t[e],i=r.length-1;i>=0;i-=1)v(r[i],n)&&r.splice(i,1)},_.$inc=function(t,e,n){if("number"!=typeof n)throw new Error(n+" must be a number");if("number"!=typeof t[e]){if(b.has(t,e))throw new Error("Don't use the $inc modifier on non-number fields");t[e]=n}else t[e]+=n},Object.keys(_).forEach(function(t){w[t]=l(t)}),k.$lt=function(t,e){return y(t,e)&&e>t},k.$lte=function(t,e){return y(t,e)&&e>=t},k.$gt=function(t,e){return y(t,e)&&t>e},k.$gte=function(t,e){return y(t,e)&&t>=e},k.$ne=function(t,e){return void 0===t?!0:!d(t,e)},k.$in=function(t,e){var n;if(!m.isArray(e))throw new Error("$in operator called with a non-array");for(n=0;n<e.length;n+=1)if(d(t,e[n]))return!0;return!1},k.$nin=function(t,e){if(!m.isArray(e))throw new Error("$nin operator called with a non-array");return!k.$in(t,e)},k.$regex=function(t,e){if(!m.isRegExp(e))throw new Error("$regex operator called with non regular expression");return"string"!=typeof t?!1:e.test(t)},k.$exists=function(t,e){return e=e||""===e?!0:!1,void 0===t?!e:e},k.$size=function(t,e){if(!m.isArray(t))return!1;if(0!==e%1)throw new Error("$size operator called without an integer");return t.length==e},E.$size=!0,x.$or=function(t,e){var n;if(!m.isArray(e))throw new Error("$or operator used without an array");for(n=0;n<e.length;n+=1)if(v(t,e[n]))return!0;return!1},x.$and=function(t,e){var n;if(!m.isArray(e))throw new Error("$and operator used without an array");for(n=0;n<e.length;n+=1)if(!v(t,e[n]))return!1;return!0},x.$not=function(t,e){return!v(t,e)},x.$where=function(t,e){var n;if(!b.isFunction(e))throw new Error("$where operator used without a function");if(n=e.call(t),!b.isBoolean(n))throw new Error("$where function must return boolean");return n},e.exports.serialize=i,e.exports.deserialize=o,e.exports.deepCopy=a,e.exports.checkObject=r,e.exports.isPrimitiveType=u,e.exports.modify=h,e.exports.getDotValue=p,e.exports.match=v,e.exports.areThingsEqual=d,e.exports.compareThings=f},{underscore:19,util:3}],11:[function(t,e){function n(t){var e,r,i;if(this.db=t.db,this.inMemoryOnly=this.db.inMemoryOnly,this.filename=this.db.filename,this.corruptAlertThreshold=void 0!==t.corruptAlertThreshold?t.corruptAlertThreshold:.1,!this.inMemoryOnly&&this.filename&&"~"===this.filename.charAt(this.filename.length-1))throw new Error("The datafile name can't end with a ~, which is reserved for crash safe backup files");if(t.afterSerialization&&!t.beforeDeserialization)throw new Error("Serialization hook defined but deserialization hook undefined, cautiously refusing to start NeDB to prevent dataloss");if(!t.afterSerialization&&t.beforeDeserialization)throw new Error("Serialization hook undefined but deserialization hook defined, cautiously refusing to start NeDB to prevent dataloss");for(this.afterSerialization=t.afterSerialization||function(t){return t},this.beforeDeserialization=t.beforeDeserialization||function(t){return t},e=1;30>e;e+=1)for(r=0;10>r;r+=1)if(i=s.uid(e),this.beforeDeserialization(this.afterSerialization(i))!==i)throw new Error("beforeDeserialization is not the reverse of afterSerialization, cautiously refusing to start NeDB to prevent dataloss");this.filename&&t.nodeWebkitAppName&&(console.log("=================================================================="),console.log("WARNING: The nodeWebkitAppName option is deprecated"),console.log("To get the path to the directory where Node Webkit stores the data"),console.log("for your app, use the internal nw.gui module like this"),console.log("require('nw.gui').App.dataPath"),console.log("See https://github.com/rogerwang/node-webkit/issues/500"),console.log("=================================================================="),this.filename=n.getNWAppFilename(t.nodeWebkitAppName,this.filename))
}var r=t("__browserify_process"),i=t("./storage"),o=t("path"),a=t("./model"),u=t("async"),s=t("./customUtils"),c=t("./indexes");n.ensureDirectoryExists=function(t,e){var n=e||function(){};i.mkdirp(t,function(t){return n(t)})},n.getNWAppFilename=function(t,e){var n;switch(r.platform){case"win32":case"win64":if(n=r.env.LOCALAPPDATA||r.env.APPDATA,!n)throw new Error("Couldn't find the base application data folder");n=o.join(n,t);break;case"darwin":if(n=r.env.HOME,!n)throw new Error("Couldn't find the base application data directory");n=o.join(n,"Library","Application Support",t);break;case"linux":if(n=r.env.HOME,!n)throw new Error("Couldn't find the base application data directory");n=o.join(n,".config",t);break;default:throw new Error("Can't use the Node Webkit relative path for platform "+r.platform)}return o.join(n,"nedb-data",e)},n.prototype.persistCachedDatabase=function(t){var e=t||function(){},n="",r=this;return this.inMemoryOnly?e(null):(this.db.getAllData().forEach(function(t){n+=r.afterSerialization(a.serialize(t))+"\n"}),Object.keys(this.db.indexes).forEach(function(t){"_id"!=t&&(n+=r.afterSerialization(a.serialize({$$indexCreated:{fieldName:t,unique:r.db.indexes[t].unique,sparse:r.db.indexes[t].sparse}}))+"\n")}),i.crashSafeWriteFile(this.filename,n,e),void 0)},n.prototype.compactDatafile=function(){this.db.executor.push({"this":this,fn:this.persistCachedDatabase,arguments:[]})},n.prototype.setAutocompactionInterval=function(t){var e=this,n=5e3,r=Math.max(t||0,n);this.stopAutocompaction(),this.autocompactionIntervalId=setInterval(function(){e.compactDatafile()},r)},n.prototype.stopAutocompaction=function(){this.autocompactionIntervalId&&clearInterval(this.autocompactionIntervalId)},n.prototype.persistNewState=function(t,e){var n=this,r="",o=e||function(){};return n.inMemoryOnly?o(null):(t.forEach(function(t){r+=n.afterSerialization(a.serialize(t))+"\n"}),0===r.length?o(null):(i.appendFile(n.filename,r,"utf8",function(t){return o(t)}),void 0))},n.prototype.treatRawData=function(t){var e,n=t.split("\n"),r={},i=[],o={},u=-1;for(e=0;e<n.length;e+=1){var s;try{s=a.deserialize(this.beforeDeserialization(n[e])),s._id?s.$$deleted===!0?delete r[s._id]:r[s._id]=s:s.$$indexCreated&&void 0!=s.$$indexCreated.fieldName?o[s.$$indexCreated.fieldName]=s.$$indexCreated:"string"==typeof s.$$indexRemoved&&delete o[s.$$indexRemoved]}catch(c){u+=1}}if(n.length>0&&u/n.length>this.corruptAlertThreshold)throw new Error("More than "+Math.floor(100*this.corruptAlertThreshold)+"% of the data file is corrupt, the wrong beforeDeserialization hook may be used. Cautiously refusing to start NeDB to prevent dataloss");return Object.keys(r).forEach(function(t){i.push(r[t])}),{data:i,indexes:o}},n.prototype.loadDatabase=function(t){var e=t||function(){},r=this;return r.db.resetIndexes(),r.inMemoryOnly?e(null):(u.waterfall([function(t){n.ensureDirectoryExists(o.dirname(r.filename),function(){i.ensureDatafileIntegrity(r.filename,function(){i.readFile(r.filename,"utf8",function(e,n){if(e)return t(e);try{var i=r.treatRawData(n)}catch(o){return t(o)}Object.keys(i.indexes).forEach(function(t){r.db.indexes[t]=new c(i.indexes[t])});try{r.db.resetIndexes(i.data)}catch(o){return r.db.resetIndexes(),t(o)}r.db.persistence.persistCachedDatabase(t)})})})}],function(t){return t?e(t):(r.db.executor.processBuffer(),e(null))}),void 0)},e.exports=n},{"./customUtils":6,"./indexes":9,"./model":10,"./storage":12,__browserify_process:4,async:13,path:2}],12:[function(t,e){function n(t,e){f.getItem(t,function(t,n){return null!==n?e(!0):e(!1)})}function r(t,e,n){f.getItem(t,function(r,i){null===i?f.removeItem(e,function(){return n()}):f.setItem(e,i,function(){f.removeItem(t,function(){return n()})})})}function i(t,e,n,r){"function"==typeof n&&(r=n),f.setItem(t,e,function(){return r()})}function o(t,e,n,r){"function"==typeof n&&(r=n),f.getItem(t,function(n,i){i=i||"",i+=e,f.setItem(t,i,function(){return r()})})}function a(t,e,n){"function"==typeof e&&(n=e),f.getItem(t,function(t,e){return n(null,e||"")})}function u(t,e){f.removeItem(t,function(){return e()})}function s(t,e){return e()}function c(t,e){return e(null)}var f=t("localforage");f.config({name:"NeDB",storeName:"nedbdata"}),e.exports.exists=n,e.exports.rename=r,e.exports.writeFile=i,e.exports.crashSafeWriteFile=i,e.exports.appendFile=o,e.exports.readFile=a,e.exports.unlink=u,e.exports.mkdirp=s,e.exports.ensureDatafileIntegrity=c},{localforage:18}],13:[function(e,n){var r=e("__browserify_process");!function(){function e(t){var e=!1;return function(){if(e)throw new Error("Callback was already called.");e=!0,t.apply(i,arguments)}}var i,o,a={};i=this,null!=i&&(o=i.async),a.noConflict=function(){return i.async=o,a};var u=function(t,e){if(t.forEach)return t.forEach(e);for(var n=0;n<t.length;n+=1)e(t[n],n,t)},s=function(t,e){if(t.map)return t.map(e);var n=[];return u(t,function(t,r,i){n.push(e(t,r,i))}),n},c=function(t,e,n){return t.reduce?t.reduce(e,n):(u(t,function(t,r,i){n=e(n,t,r,i)}),n)},f=function(t){if(Object.keys)return Object.keys(t);var e=[];for(var n in t)t.hasOwnProperty(n)&&e.push(n);return e};"undefined"!=typeof r&&r.nextTick?(a.nextTick=r.nextTick,a.setImmediate="undefined"!=typeof setImmediate?function(t){setImmediate(t)}:a.nextTick):"function"==typeof setImmediate?(a.nextTick=function(t){setImmediate(t)},a.setImmediate=a.nextTick):(a.nextTick=function(t){setTimeout(t,0)},a.setImmediate=a.nextTick),a.each=function(t,n,r){if(r=r||function(){},!t.length)return r();var i=0;u(t,function(o){n(o,e(function(e){e?(r(e),r=function(){}):(i+=1,i>=t.length&&r(null))}))})},a.forEach=a.each,a.eachSeries=function(t,e,n){if(n=n||function(){},!t.length)return n();var r=0,i=function(){e(t[r],function(e){e?(n(e),n=function(){}):(r+=1,r>=t.length?n(null):i())})};i()},a.forEachSeries=a.eachSeries,a.eachLimit=function(t,e,n,r){var i=l(e);i.apply(null,[t,n,r])},a.forEachLimit=a.eachLimit;var l=function(t){return function(e,n,r){if(r=r||function(){},!e.length||0>=t)return r();var i=0,o=0,a=0;!function u(){if(i>=e.length)return r();for(;t>a&&o<e.length;)o+=1,a+=1,n(e[o-1],function(t){t?(r(t),r=function(){}):(i+=1,a-=1,i>=e.length?r():u())})}()}},h=function(t){return function(){var e=Array.prototype.slice.call(arguments);return t.apply(null,[a.each].concat(e))}},p=function(t,e){return function(){var n=Array.prototype.slice.call(arguments);return e.apply(null,[l(t)].concat(n))}},d=function(t){return function(){var e=Array.prototype.slice.call(arguments);return t.apply(null,[a.eachSeries].concat(e))}},y=function(t,e,n,r){var i=[];e=s(e,function(t,e){return{index:e,value:t}}),t(e,function(t,e){n(t.value,function(n,r){i[t.index]=r,e(n)})},function(t){r(t,i)})};a.map=h(y),a.mapSeries=d(y),a.mapLimit=function(t,e,n,r){return v(e)(t,n,r)};var v=function(t){return p(t,y)};a.reduce=function(t,e,n,r){a.eachSeries(t,function(t,r){n(e,t,function(t,n){e=n,r(t)})},function(t){r(t,e)})},a.inject=a.reduce,a.foldl=a.reduce,a.reduceRight=function(t,e,n,r){var i=s(t,function(t){return t}).reverse();a.reduce(i,e,n,r)},a.foldr=a.reduceRight;var g=function(t,e,n,r){var i=[];e=s(e,function(t,e){return{index:e,value:t}}),t(e,function(t,e){n(t.value,function(n){n&&i.push(t),e()})},function(){r(s(i.sort(function(t,e){return t.index-e.index}),function(t){return t.value}))})};a.filter=h(g),a.filterSeries=d(g),a.select=a.filter,a.selectSeries=a.filterSeries;var m=function(t,e,n,r){var i=[];e=s(e,function(t,e){return{index:e,value:t}}),t(e,function(t,e){n(t.value,function(n){n||i.push(t),e()})},function(){r(s(i.sort(function(t,e){return t.index-e.index}),function(t){return t.value}))})};a.reject=h(m),a.rejectSeries=d(m);var b=function(t,e,n,r){t(e,function(t,e){n(t,function(n){n?(r(t),r=function(){}):e()})},function(){r()})};a.detect=h(b),a.detectSeries=d(b),a.some=function(t,e,n){a.each(t,function(t,r){e(t,function(t){t&&(n(!0),n=function(){}),r()})},function(){n(!1)})},a.any=a.some,a.every=function(t,e,n){a.each(t,function(t,r){e(t,function(t){t||(n(!1),n=function(){}),r()})},function(){n(!0)})},a.all=a.every,a.sortBy=function(t,e,n){a.map(t,function(t,n){e(t,function(e,r){e?n(e):n(null,{value:t,criteria:r})})},function(t,e){if(t)return n(t);var r=function(t,e){var n=t.criteria,r=e.criteria;return r>n?-1:n>r?1:0};n(null,s(e.sort(r),function(t){return t.value}))})},a.auto=function(t,e){e=e||function(){};var n=f(t);if(!n.length)return e(null);var r={},i=[],o=function(t){i.unshift(t)},s=function(t){for(var e=0;e<i.length;e+=1)if(i[e]===t)return i.splice(e,1),void 0},l=function(){u(i.slice(0),function(t){t()})};o(function(){f(r).length===n.length&&(e(null,r),e=function(){})}),u(n,function(n){var i=t[n]instanceof Function?[t[n]]:t[n],h=function(t){var i=Array.prototype.slice.call(arguments,1);if(i.length<=1&&(i=i[0]),t){var o={};u(f(r),function(t){o[t]=r[t]}),o[n]=i,e(t,o),e=function(){}}else r[n]=i,a.setImmediate(l)},p=i.slice(0,Math.abs(i.length-1))||[],d=function(){return c(p,function(t,e){return t&&r.hasOwnProperty(e)},!0)&&!r.hasOwnProperty(n)};if(d())i[i.length-1](h,r);else{var y=function(){d()&&(s(y),i[i.length-1](h,r))};o(y)}})},a.waterfall=function(t,e){if(e=e||function(){},t.constructor!==Array){var n=new Error("First argument to waterfall must be an array of functions");return e(n)}if(!t.length)return e();var r=function(t){return function(n){if(n)e.apply(null,arguments),e=function(){};else{var i=Array.prototype.slice.call(arguments,1),o=t.next();o?i.push(r(o)):i.push(e),a.setImmediate(function(){t.apply(null,i)})}}};r(a.iterator(t))()};var w=function(t,e,n){if(n=n||function(){},e.constructor===Array)t.map(e,function(t,e){t&&t(function(t){var n=Array.prototype.slice.call(arguments,1);n.length<=1&&(n=n[0]),e.call(null,t,n)})},n);else{var r={};t.each(f(e),function(t,n){e[t](function(e){var i=Array.prototype.slice.call(arguments,1);i.length<=1&&(i=i[0]),r[t]=i,n(e)})},function(t){n(t,r)})}};a.parallel=function(t,e){w({map:a.map,each:a.each},t,e)},a.parallelLimit=function(t,e,n){w({map:v(e),each:l(e)},t,n)},a.series=function(t,e){if(e=e||function(){},t.constructor===Array)a.mapSeries(t,function(t,e){t&&t(function(t){var n=Array.prototype.slice.call(arguments,1);n.length<=1&&(n=n[0]),e.call(null,t,n)})},e);else{var n={};a.eachSeries(f(t),function(e,r){t[e](function(t){var i=Array.prototype.slice.call(arguments,1);i.length<=1&&(i=i[0]),n[e]=i,r(t)})},function(t){e(t,n)})}},a.iterator=function(t){var e=function(n){var r=function(){return t.length&&t[n].apply(null,arguments),r.next()};return r.next=function(){return n<t.length-1?e(n+1):null},r};return e(0)},a.apply=function(t){var e=Array.prototype.slice.call(arguments,1);return function(){return t.apply(null,e.concat(Array.prototype.slice.call(arguments)))}};var _=function(t,e,n,r){var i=[];t(e,function(t,e){n(t,function(t,n){i=i.concat(n||[]),e(t)})},function(t){r(t,i)})};a.concat=h(_),a.concatSeries=d(_),a.whilst=function(t,e,n){t()?e(function(r){return r?n(r):(a.whilst(t,e,n),void 0)}):n()},a.doWhilst=function(t,e,n){t(function(r){return r?n(r):(e()?a.doWhilst(t,e,n):n(),void 0)})},a.until=function(t,e,n){t()?n():e(function(r){return r?n(r):(a.until(t,e,n),void 0)})},a.doUntil=function(t,e,n){t(function(r){return r?n(r):(e()?n():a.doUntil(t,e,n),void 0)})},a.queue=function(t,n){function r(t,e,r,i){e.constructor!==Array&&(e=[e]),u(e,function(e){var o={data:e,callback:"function"==typeof i?i:null};r?t.tasks.unshift(o):t.tasks.push(o),t.saturated&&t.tasks.length===n&&t.saturated(),a.setImmediate(t.process)})}void 0===n&&(n=1);var i=0,o={tasks:[],concurrency:n,saturated:null,empty:null,drain:null,push:function(t,e){r(o,t,!1,e)},unshift:function(t,e){r(o,t,!0,e)},process:function(){if(i<o.concurrency&&o.tasks.length){var n=o.tasks.shift();o.empty&&0===o.tasks.length&&o.empty(),i+=1;var r=function(){i-=1,n.callback&&n.callback.apply(n,arguments),o.drain&&0===o.tasks.length+i&&o.drain(),o.process()},a=e(r);t(n.data,a)}},length:function(){return o.tasks.length},running:function(){return i}};return o},a.cargo=function(t,e){var n=!1,r=[],i={tasks:r,payload:e,saturated:null,empty:null,drain:null,push:function(t,n){t.constructor!==Array&&(t=[t]),u(t,function(t){r.push({data:t,callback:"function"==typeof n?n:null}),i.saturated&&r.length===e&&i.saturated()}),a.setImmediate(i.process)},process:function o(){if(!n){if(0===r.length)return i.drain&&i.drain(),void 0;var a="number"==typeof e?r.splice(0,e):r.splice(0),c=s(a,function(t){return t.data});i.empty&&i.empty(),n=!0,t(c,function(){n=!1;var t=arguments;u(a,function(e){e.callback&&e.callback.apply(null,t)}),o()})}},length:function(){return r.length},running:function(){return n}};return i};var k=function(t){return function(e){var n=Array.prototype.slice.call(arguments,1);e.apply(null,n.concat([function(e){var n=Array.prototype.slice.call(arguments,1);"undefined"!=typeof console&&(e?console.error&&console.error(e):console[t]&&u(n,function(e){console[t](e)}))}]))}};a.log=k("log"),a.dir=k("dir"),a.memoize=function(t,e){var n={},r={};e=e||function(t){return t};var i=function(){var i=Array.prototype.slice.call(arguments),o=i.pop(),a=e.apply(null,i);a in n?o.apply(null,n[a]):a in r?r[a].push(o):(r[a]=[o],t.apply(null,i.concat([function(){n[a]=arguments;var t=r[a];delete r[a];for(var e=0,i=t.length;i>e;e++)t[e].apply(null,arguments)}])))};return i.memo=n,i.unmemoized=t,i},a.unmemoize=function(t){return function(){return(t.unmemoized||t).apply(null,arguments)}},a.times=function(t,e,n){for(var r=[],i=0;t>i;i++)r.push(i);return a.map(r,e,n)},a.timesSeries=function(t,e,n){for(var r=[],i=0;t>i;i++)r.push(i);return a.mapSeries(r,e,n)},a.compose=function(){var t=Array.prototype.reverse.call(arguments);return function(){var e=this,n=Array.prototype.slice.call(arguments),r=n.pop();a.reduce(t,n,function(t,n,r){n.apply(e,t.concat([function(){var t=arguments[0],e=Array.prototype.slice.call(arguments,1);r(t,e)}]))},function(t,n){r.apply(e,[t].concat(n))})}};var x=function(t,e){var n=function(){var n=this,r=Array.prototype.slice.call(arguments),i=r.pop();return t(e,function(t,e){t.apply(n,r.concat([e]))},i)};if(arguments.length>2){var r=Array.prototype.slice.call(arguments,2);return n.apply(this,r)}return n};a.applyEach=h(x),a.applyEachSeries=d(x),a.forever=function(t,e){function n(r){if(r){if(e)return e(r);throw r}t(n)}n()},"undefined"!=typeof t&&t.amd?t([],function(){return a}):"undefined"!=typeof n&&n.exports?n.exports=a:i.async=a}()},{__browserify_process:4}],14:[function(t,e){e.exports.BinarySearchTree=t("./lib/bst"),e.exports.AVLTree=t("./lib/avltree")},{"./lib/avltree":15,"./lib/bst":16}],15:[function(t,e){function n(t){this.tree=new r(t)}function r(t){t=t||{},this.left=null,this.right=null,this.parent=void 0!==t.parent?t.parent:null,t.hasOwnProperty("key")&&(this.key=t.key),this.data=t.hasOwnProperty("value")?[t.value]:[],this.unique=t.unique||!1,this.compareKeys=t.compareKeys||o.defaultCompareKeysFunction,this.checkValueEquality=t.checkValueEquality||o.defaultCheckValueEquality}var i=t("./bst"),o=t("./customUtils"),a=t("util");t("underscore"),a.inherits(r,i),n._AVLTree=r,r.prototype.checkHeightCorrect=function(){var t,e;if(this.hasOwnProperty("key")){if(this.left&&void 0===this.left.height)throw new Error("Undefined height for node "+this.left.key);if(this.right&&void 0===this.right.height)throw new Error("Undefined height for node "+this.right.key);if(void 0===this.height)throw new Error("Undefined height for node "+this.key);if(t=this.left?this.left.height:0,e=this.right?this.right.height:0,this.height!==1+Math.max(t,e))throw new Error("Height constraint failed for node "+this.key);this.left&&this.left.checkHeightCorrect(),this.right&&this.right.checkHeightCorrect()}},r.prototype.balanceFactor=function(){var t=this.left?this.left.height:0,e=this.right?this.right.height:0;return t-e},r.prototype.checkBalanceFactors=function(){if(Math.abs(this.balanceFactor())>1)throw new Error("Tree is unbalanced at node "+this.key);this.left&&this.left.checkBalanceFactors(),this.right&&this.right.checkBalanceFactors()},r.prototype.checkIsAVLT=function(){r.super_.prototype.checkIsBST.call(this),this.checkHeightCorrect(),this.checkBalanceFactors()},n.prototype.checkIsAVLT=function(){this.tree.checkIsAVLT()},r.prototype.rightRotation=function(){var t,e,n,r,i=this,o=this.left;return o?(t=o.right,i.parent?(o.parent=i.parent,i.parent.left===i?i.parent.left=o:i.parent.right=o):o.parent=null,o.right=i,i.parent=o,i.left=t,t&&(t.parent=i),e=o.left?o.left.height:0,n=t?t.height:0,r=i.right?i.right.height:0,i.height=Math.max(n,r)+1,o.height=Math.max(e,i.height)+1,o):this},r.prototype.leftRotation=function(){var t,e,n,r,i=this,o=this.right;return o?(t=o.left,i.parent?(o.parent=i.parent,i.parent.left===i?i.parent.left=o:i.parent.right=o):o.parent=null,o.left=i,i.parent=o,i.right=t,t&&(t.parent=i),e=i.left?i.left.height:0,n=t?t.height:0,r=o.right?o.right.height:0,i.height=Math.max(e,n)+1,o.height=Math.max(r,i.height)+1,o):this},r.prototype.rightTooSmall=function(){return this.balanceFactor()<=1?this:(this.left.balanceFactor()<0&&this.left.leftRotation(),this.rightRotation())},r.prototype.leftTooSmall=function(){return this.balanceFactor()>=-1?this:(this.right.balanceFactor()>0&&this.right.rightRotation(),this.leftRotation())},r.prototype.rebalanceAlongPath=function(t){var e,n,r=this;if(!this.hasOwnProperty("key"))return delete this.height,this;for(n=t.length-1;n>=0;n-=1)t[n].height=1+Math.max(t[n].left?t[n].left.height:0,t[n].right?t[n].right.height:0),t[n].balanceFactor()>1&&(e=t[n].rightTooSmall(),0===n&&(r=e)),t[n].balanceFactor()<-1&&(e=t[n].leftTooSmall(),0===n&&(r=e));return r},r.prototype.insert=function(t,e){var n=[],r=this;if(!this.hasOwnProperty("key"))return this.key=t,this.data.push(e),this.height=1,this;for(;;){if(0===r.compareKeys(r.key,t)){if(r.unique){var i=new Error("Can't insert key "+t+", it violates the unique constraint");throw i.key=t,i.errorType="uniqueViolated",i}return r.data.push(e),this}if(n.push(r),r.compareKeys(t,r.key)<0){if(!r.left){n.push(r.createLeftChild({key:t,value:e}));break}r=r.left}else{if(!r.right){n.push(r.createRightChild({key:t,value:e}));break}r=r.right}}return this.rebalanceAlongPath(n)},n.prototype.insert=function(t,e){var n=this.tree.insert(t,e);n&&(this.tree=n)},r.prototype.delete=function(t,e){var n,r=[],i=this,o=[];if(!this.hasOwnProperty("key"))return this;for(;;){if(0===i.compareKeys(t,i.key))break;if(o.push(i),i.compareKeys(t,i.key)<0){if(!i.left)return this;i=i.left}else{if(!i.right)return this;i=i.right}}if(i.data.length>1&&e)return i.data.forEach(function(t){i.checkValueEquality(t,e)||r.push(t)}),i.data=r,this;if(!i.left&&!i.right)return i===this?(delete i.key,i.data=[],delete i.height,this):(i.parent.left===i?i.parent.left=null:i.parent.right=null,this.rebalanceAlongPath(o));if(!i.left||!i.right)return n=i.left?i.left:i.right,i===this?(n.parent=null,n):(i.parent.left===i?(i.parent.left=n,n.parent=i.parent):(i.parent.right=n,n.parent=i.parent),this.rebalanceAlongPath(o));if(o.push(i),n=i.left,!n.right)return i.key=n.key,i.data=n.data,i.left=n.left,n.left&&(n.left.parent=i),this.rebalanceAlongPath(o);for(;;){if(!n.right)break;o.push(n),n=n.right}return i.key=n.key,i.data=n.data,n.parent.right=n.left,n.left&&(n.left.parent=n.parent),this.rebalanceAlongPath(o)},n.prototype.delete=function(t,e){var n=this.tree.delete(t,e);n&&(this.tree=n)},["getNumberOfKeys","search","betweenBounds","prettyPrint","executeOnEveryNode"].forEach(function(t){n.prototype[t]=function(){return this.tree[t].apply(this.tree,arguments)}}),e.exports=n},{"./bst":16,"./customUtils":17,underscore:19,util:3}],16:[function(t,e){function n(t){t=t||{},this.left=null,this.right=null,this.parent=void 0!==t.parent?t.parent:null,t.hasOwnProperty("key")&&(this.key=t.key),this.data=t.hasOwnProperty("value")?[t.value]:[],this.unique=t.unique||!1,this.compareKeys=t.compareKeys||i.defaultCompareKeysFunction,this.checkValueEquality=t.checkValueEquality||i.defaultCheckValueEquality}function r(t,e){var n;for(n=0;n<e.length;n+=1)t.push(e[n])}var i=t("./customUtils");n.prototype.getMaxKeyDescendant=function(){return this.right?this.right.getMaxKeyDescendant():this},n.prototype.getMaxKey=function(){return this.getMaxKeyDescendant().key},n.prototype.getMinKeyDescendant=function(){return this.left?this.left.getMinKeyDescendant():this},n.prototype.getMinKey=function(){return this.getMinKeyDescendant().key},n.prototype.checkAllNodesFullfillCondition=function(t){this.hasOwnProperty("key")&&(t(this.key,this.data),this.left&&this.left.checkAllNodesFullfillCondition(t),this.right&&this.right.checkAllNodesFullfillCondition(t))},n.prototype.checkNodeOrdering=function(){var t=this;this.hasOwnProperty("key")&&(this.left&&(this.left.checkAllNodesFullfillCondition(function(e){if(t.compareKeys(e,t.key)>=0)throw new Error("Tree with root "+t.key+" is not a binary search tree")}),this.left.checkNodeOrdering()),this.right&&(this.right.checkAllNodesFullfillCondition(function(e){if(t.compareKeys(e,t.key)<=0)throw new Error("Tree with root "+t.key+" is not a binary search tree")}),this.right.checkNodeOrdering()))},n.prototype.checkInternalPointers=function(){if(this.left){if(this.left.parent!==this)throw new Error("Parent pointer broken for key "+this.key);this.left.checkInternalPointers()}if(this.right){if(this.right.parent!==this)throw new Error("Parent pointer broken for key "+this.key);this.right.checkInternalPointers()}},n.prototype.checkIsBST=function(){if(this.checkNodeOrdering(),this.checkInternalPointers(),this.parent)throw new Error("The root shouldn't have a parent")},n.prototype.getNumberOfKeys=function(){var t;return this.hasOwnProperty("key")?(t=1,this.left&&(t+=this.left.getNumberOfKeys()),this.right&&(t+=this.right.getNumberOfKeys()),t):0},n.prototype.createSimilar=function(t){return t=t||{},t.unique=this.unique,t.compareKeys=this.compareKeys,t.checkValueEquality=this.checkValueEquality,new this.constructor(t)},n.prototype.createLeftChild=function(t){var e=this.createSimilar(t);return e.parent=this,this.left=e,e},n.prototype.createRightChild=function(t){var e=this.createSimilar(t);return e.parent=this,this.right=e,e},n.prototype.insert=function(t,e){if(!this.hasOwnProperty("key"))return this.key=t,this.data.push(e),void 0;if(0===this.compareKeys(this.key,t)){if(this.unique){var n=new Error("Can't insert key "+t+", it violates the unique constraint");throw n.key=t,n.errorType="uniqueViolated",n}return this.data.push(e),void 0}this.compareKeys(t,this.key)<0?this.left?this.left.insert(t,e):this.createLeftChild({key:t,value:e}):this.right?this.right.insert(t,e):this.createRightChild({key:t,value:e})},n.prototype.search=function(t){return this.hasOwnProperty("key")?0===this.compareKeys(this.key,t)?this.data:this.compareKeys(t,this.key)<0?this.left?this.left.search(t):[]:this.right?this.right.search(t):[]:[]},n.prototype.getLowerBoundMatcher=function(t){var e=this;return t.hasOwnProperty("$gt")||t.hasOwnProperty("$gte")?t.hasOwnProperty("$gt")&&t.hasOwnProperty("$gte")?0===e.compareKeys(t.$gte,t.$gt)?function(n){return e.compareKeys(n,t.$gt)>0}:e.compareKeys(t.$gte,t.$gt)>0?function(n){return e.compareKeys(n,t.$gte)>=0}:function(n){return e.compareKeys(n,t.$gt)>0}:t.hasOwnProperty("$gt")?function(n){return e.compareKeys(n,t.$gt)>0}:function(n){return e.compareKeys(n,t.$gte)>=0}:function(){return!0}},n.prototype.getUpperBoundMatcher=function(t){var e=this;return t.hasOwnProperty("$lt")||t.hasOwnProperty("$lte")?t.hasOwnProperty("$lt")&&t.hasOwnProperty("$lte")?0===e.compareKeys(t.$lte,t.$lt)?function(n){return e.compareKeys(n,t.$lt)<0}:e.compareKeys(t.$lte,t.$lt)<0?function(n){return e.compareKeys(n,t.$lte)<=0}:function(n){return e.compareKeys(n,t.$lt)<0}:t.hasOwnProperty("$lt")?function(n){return e.compareKeys(n,t.$lt)<0}:function(n){return e.compareKeys(n,t.$lte)<=0}:function(){return!0}},n.prototype.betweenBounds=function(t,e,n){var i=[];return this.hasOwnProperty("key")?(e=e||this.getLowerBoundMatcher(t),n=n||this.getUpperBoundMatcher(t),e(this.key)&&this.left&&r(i,this.left.betweenBounds(t,e,n)),e(this.key)&&n(this.key)&&r(i,this.data),n(this.key)&&this.right&&r(i,this.right.betweenBounds(t,e,n)),i):[]},n.prototype.deleteIfLeaf=function(){return this.left||this.right?!1:this.parent?(this.parent.left===this?this.parent.left=null:this.parent.right=null,!0):(delete this.key,this.data=[],!0)},n.prototype.deleteIfOnlyOneChild=function(){var t;return this.left&&!this.right&&(t=this.left),!this.left&&this.right&&(t=this.right),t?this.parent?(this.parent.left===this?(this.parent.left=t,t.parent=this.parent):(this.parent.right=t,t.parent=this.parent),!0):(this.key=t.key,this.data=t.data,this.left=null,t.left&&(this.left=t.left,t.left.parent=this),this.right=null,t.right&&(this.right=t.right,t.right.parent=this),!0):!1},n.prototype.delete=function(t,e){var n,r=[],i=this;if(this.hasOwnProperty("key")){if(this.compareKeys(t,this.key)<0)return this.left&&this.left.delete(t,e),void 0;if(this.compareKeys(t,this.key)>0)return this.right&&this.right.delete(t,e),void 0;if(0!==!this.compareKeys(t,this.key))return this.data.length>1&&void 0!==e?(this.data.forEach(function(t){i.checkValueEquality(t,e)||r.push(t)}),i.data=r,void 0):(this.deleteIfLeaf()||this.deleteIfOnlyOneChild()||(Math.random()>=.5?(n=this.left.getMaxKeyDescendant(),this.key=n.key,this.data=n.data,this===n.parent?(this.left=n.left,n.left&&(n.left.parent=n.parent)):(n.parent.right=n.left,n.left&&(n.left.parent=n.parent))):(n=this.right.getMinKeyDescendant(),this.key=n.key,this.data=n.data,this===n.parent?(this.right=n.right,n.right&&(n.right.parent=n.parent)):(n.parent.left=n.right,n.right&&(n.right.parent=n.parent)))),void 0)}},n.prototype.executeOnEveryNode=function(t){this.left&&this.left.executeOnEveryNode(t),t(this),this.right&&this.right.executeOnEveryNode(t)},n.prototype.prettyPrint=function(t,e){e=e||"",console.log(e+"* "+this.key),t&&console.log(e+"* "+this.data),(this.left||this.right)&&(this.left?this.left.prettyPrint(t,e+"  "):console.log(e+"  *"),this.right?this.right.prettyPrint(t,e+"  "):console.log(e+"  *"))},e.exports=n},{"./customUtils":17}],17:[function(t,e){function n(t){var e,r;return 0===t?[]:1===t?[0]:(e=n(t-1),r=Math.floor(Math.random()*t),e.splice(r,0,t-1),e)}function r(t,e){if(e>t)return-1;if(t>e)return 1;if(t===e)return 0;var n=new Error("Couldn't compare elements");throw n.a=t,n.b=e,n}function i(t,e){return t===e}e.exports.getRandomArray=n,e.exports.defaultCompareKeysFunction=r,e.exports.defaultCheckValueEquality=i},{}],18:[function(e,n,r){var i=e("__browserify_process"),o=self;!function(){var t,e,n,r;!function(){var i={},o={};t=function(t,e,n){i[t]={deps:e,callback:n}},r=n=e=function(t){function n(e){if("."!==e.charAt(0))return e;for(var n=e.split("/"),r=t.split("/").slice(0,-1),i=0,o=n.length;o>i;i++){var a=n[i];if(".."===a)r.pop();else{if("."===a)continue;r.push(a)}}return r.join("/")}if(r._eak_seen=i,o[t])return o[t];if(o[t]={},!i[t])throw new Error("Could not find module "+t);for(var a,u=i[t],s=u.deps,c=u.callback,f=[],l=0,h=s.length;h>l;l++)"exports"===s[l]?f.push(a={}):f.push(e(n(s[l])));var p=c.apply(this,f);return o[t]=a||p}}(),t("promise/all",["./utils","exports"],function(t,e){"use strict";function n(t){var e=this;if(!r(t))throw new TypeError("You must pass an array to all.");return new e(function(e,n){function r(t){return function(e){o(t,e)}}function o(t,n){u[t]=n,0===--s&&e(u)}var a,u=[],s=t.length;0===s&&e([]);for(var c=0;c<t.length;c++)a=t[c],a&&i(a.then)?a.then(r(c),n):o(c,a)})}var r=t.isArray,i=t.isFunction;e.all=n}),t("promise/asap",["exports"],function(t){"use strict";function e(){return function(){i.nextTick(a)}}function n(){var t=0,e=new f(a),n=document.createTextNode("");return e.observe(n,{characterData:!0}),function(){n.data=t=++t%2}}function r(){return function(){l.setTimeout(a,1)}}function a(){for(var t=0;t<h.length;t++){var e=h[t],n=e[0],r=e[1];n(r)}h=[]}function u(t,e){var n=h.push([t,e]);1===n&&s()}var s,c="undefined"!=typeof window?window:{},f=c.MutationObserver||c.WebKitMutationObserver,l="undefined"!=typeof o?o:void 0===this?window:this,h=[];s="undefined"!=typeof i&&"[object process]"==={}.toString.call(i)?e():f?n():r(),t.asap=u}),t("promise/config",["exports"],function(t){"use strict";function e(t,e){return 2!==arguments.length?n[t]:(n[t]=e,void 0)}var n={instrument:!1};t.config=n,t.configure=e}),t("promise/polyfill",["./promise","./utils","exports"],function(t,e,n){"use strict";function r(){var t;t="undefined"!=typeof o?o:"undefined"!=typeof window&&window.document?window:self;var e="Promise"in t&&"resolve"in t.Promise&&"reject"in t.Promise&&"all"in t.Promise&&"race"in t.Promise&&function(){var e;return new t.Promise(function(t){e=t}),a(e)}();e||(t.Promise=i)}var i=t.Promise,a=e.isFunction;n.polyfill=r}),t("promise/promise",["./config","./utils","./all","./race","./resolve","./reject","./asap","exports"],function(t,e,n,r,i,o,a,u){"use strict";function s(t){if(!_(t))throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");if(!(this instanceof s))throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");this._subscribers=[],c(t,this)}function c(t,e){function n(t){d(e,t)}function r(t){v(e,t)}try{t(n,r)}catch(i){r(i)}}function f(t,e,n,r){var i,o,a,u,s=_(n);if(s)try{i=n(r),a=!0}catch(c){u=!0,o=c}else i=r,a=!0;p(e,i)||(s&&a?d(e,i):u?v(e,o):t===I?d(e,i):t===D&&v(e,i))}function l(t,e,n,r){var i=t._subscribers,o=i.length;i[o]=e,i[o+I]=n,i[o+D]=r}function h(t,e){for(var n,r,i=t._subscribers,o=t._detail,a=0;a<i.length;a+=3)n=i[a],r=i[a+e],f(e,n,r,o);t._subscribers=null}function p(t,e){var n,r=null;try{if(t===e)throw new TypeError("A promises callback cannot return that same promise.");if(w(e)&&(r=e.then,_(r)))return r.call(e,function(r){return n?!0:(n=!0,e!==r?d(t,r):y(t,r),void 0)},function(e){return n?!0:(n=!0,v(t,e),void 0)}),!0}catch(i){return n?!0:(v(t,i),!0)}return!1}function d(t,e){t===e?y(t,e):p(t,e)||y(t,e)}function y(t,e){t._state===S&&(t._state=j,t._detail=e,b.async(g,t))}function v(t,e){t._state===S&&(t._state=j,t._detail=e,b.async(m,t))}function g(t){h(t,t._state=I)}function m(t){h(t,t._state=D)}var b=t.config;t.configure;var w=e.objectOrFunction,_=e.isFunction;e.now;var k=n.all,x=r.race,E=i.resolve,A=o.reject,O=a.asap;b.async=O;var S=void 0,j=0,I=1,D=2;s.prototype={constructor:s,_state:void 0,_detail:void 0,_subscribers:void 0,then:function(t,e){var n=this,r=new this.constructor(function(){});if(this._state){var i=arguments;b.async(function(){f(n._state,r,i[n._state-1],n._detail)})}else l(this,r,t,e);return r},"catch":function(t){return this.then(null,t)}},s.all=k,s.race=x,s.resolve=E,s.reject=A,u.Promise=s}),t("promise/race",["./utils","exports"],function(t,e){"use strict";function n(t){var e=this;if(!r(t))throw new TypeError("You must pass an array to race.");return new e(function(e,n){for(var r,i=0;i<t.length;i++)r=t[i],r&&"function"==typeof r.then?r.then(e,n):e(r)})}var r=t.isArray;e.race=n}),t("promise/reject",["exports"],function(t){"use strict";function e(t){var e=this;return new e(function(e,n){n(t)})}t.reject=e}),t("promise/resolve",["exports"],function(t){"use strict";function e(t){if(t&&"object"==typeof t&&t.constructor===this)return t;var e=this;return new e(function(e){e(t)})}t.resolve=e}),t("promise/utils",["exports"],function(t){"use strict";function e(t){return n(t)||"object"==typeof t&&null!==t}function n(t){return"function"==typeof t}function r(t){return"[object Array]"===Object.prototype.toString.call(t)}var i=Date.now||function(){return(new Date).getTime()};t.objectOrFunction=e,t.isFunction=n,t.isArray=r,t.now=i}),e("promise/polyfill").polyfill()}(),function(e,i){"object"==typeof r&&"object"==typeof n?n.exports=i():"function"==typeof t&&t.amd?t([],i):"object"==typeof r?r.localforage=i():e.localforage=i()}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return t[r].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){"use strict";
function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}e.__esModule=!0,function(){function t(t,e){t[e]=function(){var n=arguments;return t.ready().then(function(){return t[e].apply(t,n)})}}function i(){for(var t=1;t<arguments.length;t++){var e=arguments[t];if(e)for(var n in e)e.hasOwnProperty(n)&&(arguments[0][n]=h(e[n])?e[n].slice():e[n])}return arguments[0]}function o(t){for(var e in u)if(u.hasOwnProperty(e)&&u[e]===t)return!0;return!1}var a={},u={INDEXEDDB:"asyncStorage",LOCALSTORAGE:"localStorageWrapper",WEBSQL:"webSQLStorage"},s=[u.INDEXEDDB,u.WEBSQL,u.LOCALSTORAGE],c=["clear","getItem","iterate","key","keys","length","removeItem","setItem"],f={description:"",driver:s.slice(),name:"localforage",size:4980736,storeName:"keyvaluepairs",version:1},l=function(t){var e=e||t.indexedDB||t.webkitIndexedDB||t.mozIndexedDB||t.OIndexedDB||t.msIndexedDB,n={};return n[u.WEBSQL]=!!t.openDatabase,n[u.INDEXEDDB]=!!function(){if("undefined"!=typeof t.openDatabase&&t.navigator&&t.navigator.userAgent&&/Safari/.test(t.navigator.userAgent)&&!/Chrome/.test(t.navigator.userAgent))return!1;try{return e&&"function"==typeof e.open&&"undefined"!=typeof t.IDBKeyRange}catch(n){return!1}}(),n[u.LOCALSTORAGE]=!!function(){try{return t.localStorage&&"setItem"in t.localStorage&&t.localStorage.setItem}catch(e){return!1}}(),n}(this),h=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)},p=function(){function e(t){r(this,e),this.INDEXEDDB=u.INDEXEDDB,this.LOCALSTORAGE=u.LOCALSTORAGE,this.WEBSQL=u.WEBSQL,this._defaultConfig=i({},f),this._config=i({},this._defaultConfig,t),this._driverSet=null,this._initDriver=null,this._ready=!1,this._dbInfo=null,this._wrapLibraryMethodsWithReady(),this.setDriver(this._config.driver)}return e.prototype.config=function(t){if("object"==typeof t){if(this._ready)return new Error("Can't call config() after localforage has been used.");for(var e in t)"storeName"===e&&(t[e]=t[e].replace(/\W/g,"_")),this._config[e]=t[e];return"driver"in t&&t.driver&&this.setDriver(this._config.driver),!0}return"string"==typeof t?this._config[t]:this._config},e.prototype.defineDriver=function(t,e,n){var r=new Promise(function(e,n){try{var r=t._driver,i=new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver"),u=new Error("Custom driver name already in use: "+t._driver);if(!t._driver)return n(i),void 0;if(o(t._driver))return n(u),void 0;for(var s=c.concat("_initStorage"),f=0;f<s.length;f++){var h=s[f];if(!h||!t[h]||"function"!=typeof t[h])return n(i),void 0}var p=Promise.resolve(!0);"_support"in t&&(p=t._support&&"function"==typeof t._support?t._support():Promise.resolve(!!t._support)),p.then(function(n){l[r]=n,a[r]=t,e()},n)}catch(d){n(d)}});return r.then(e,n),r},e.prototype.driver=function(){return this._driver||null},e.prototype.getDriver=function(t,e,r){var i=this,u=function(){if(o(t))switch(t){case i.INDEXEDDB:return new Promise(function(t){t(n(1))});case i.LOCALSTORAGE:return new Promise(function(t){t(n(2))});case i.WEBSQL:return new Promise(function(t){t(n(4))})}else if(a[t])return Promise.resolve(a[t]);return Promise.reject(new Error("Driver not found."))}();return u.then(e,r),u},e.prototype.getSerializer=function(t){var e=new Promise(function(t){t(n(3))});return t&&"function"==typeof t&&e.then(function(e){t(e)}),e},e.prototype.ready=function(t){var e=this,n=e._driverSet.then(function(){return null===e._ready&&(e._ready=e._initDriver()),e._ready});return n.then(t,t),n},e.prototype.setDriver=function(t,e,n){function r(){o._config.driver=o.driver()}function i(t){return function(){function e(){for(;n<t.length;){var i=t[n];return n++,o._dbInfo=null,o._ready=null,o.getDriver(i).then(function(t){return o._extend(t),r(),o._ready=o._initStorage(o._config),o._ready})["catch"](e)}r();var a=new Error("No available storage method found.");return o._driverSet=Promise.reject(a),o._driverSet}var n=0;return e()}}var o=this;h(t)||(t=[t]);var a=this._getSupportedDrivers(t),u=null!==this._driverSet?this._driverSet["catch"](function(){return Promise.resolve()}):Promise.resolve();return this._driverSet=u.then(function(){var t=a[0];return o._dbInfo=null,o._ready=null,o.getDriver(t).then(function(t){o._driver=t._driver,r(),o._wrapLibraryMethodsWithReady(),o._initDriver=i(a)})})["catch"](function(){r();var t=new Error("No available storage method found.");return o._driverSet=Promise.reject(t),o._driverSet}),this._driverSet.then(e,n),this._driverSet},e.prototype.supports=function(t){return!!l[t]},e.prototype._extend=function(t){i(this,t)},e.prototype._getSupportedDrivers=function(t){for(var e=[],n=0,r=t.length;r>n;n++){var i=t[n];this.supports(i)&&e.push(i)}return e},e.prototype._wrapLibraryMethodsWithReady=function(){for(var e=0;e<c.length;e++)t(this,c[e])},e.prototype.createInstance=function(t){return new e(t)},e}(),d=new p;e["default"]=d}.call("undefined"!=typeof window?window:self),t.exports=e["default"]},function(t,e){"use strict";e.__esModule=!0,function(){function t(t,e){t=t||[],e=e||{};try{return new Blob(t,e)}catch(n){if("TypeError"!==n.name)throw n;for(var r=x.BlobBuilder||x.MSBlobBuilder||x.MozBlobBuilder||x.WebKitBlobBuilder,i=new r,o=0;o<t.length;o+=1)i.append(t[o]);return i.getBlob(e.type)}}function n(t){for(var e=t.length,n=new ArrayBuffer(e),r=new Uint8Array(n),i=0;e>i;i++)r[i]=t.charCodeAt(i);return n}function r(t){return new Promise(function(e,n){var r=new XMLHttpRequest;r.open("GET",t),r.withCredentials=!0,r.responseType="arraybuffer",r.onreadystatechange=function(){return 4===r.readyState?200===r.status?e({response:r.response,type:r.getResponseHeader("Content-Type")}):(n({status:r.status,response:r.response}),void 0):void 0},r.send()})}function i(e){return new Promise(function(n,i){var o=t([""],{type:"image/png"}),a=e.transaction([S],"readwrite");a.objectStore(S).put(o,"key"),a.oncomplete=function(){var t=e.transaction([S],"readwrite"),o=t.objectStore(S).get("key");o.onerror=i,o.onsuccess=function(t){var e=t.target.result,i=URL.createObjectURL(e);r(i).then(function(t){n(!(!t||"image/png"!==t.type))},function(){n(!1)}).then(function(){URL.revokeObjectURL(i)})}}})["catch"](function(){return!1})}function o(t){return"boolean"==typeof A?Promise.resolve(A):i(t).then(function(t){return A=t})}function a(t){return new Promise(function(e,n){var r=new FileReader;r.onerror=n,r.onloadend=function(n){var r=btoa(n.target.result||"");e({__local_forage_encoded_blob:!0,data:r,type:t.type})},r.readAsBinaryString(t)})}function u(e){var r=n(atob(e.data));return t([r],{type:e.type})}function s(t){return t&&t.__local_forage_encoded_blob}function c(t){function e(){return Promise.resolve()}var n=this,r={db:null};if(t)for(var i in t)r[i]=t[i];O||(O={});var o=O[r.name];o||(o={forages:[],db:null},O[r.name]=o),o.forages.push(this);for(var a=[],u=0;u<o.forages.length;u++){var s=o.forages[u];s!==this&&a.push(s.ready()["catch"](e))}var c=o.forages.slice(0);return Promise.all(a).then(function(){return r.db=o.db,f(r)}).then(function(t){return r.db=t,p(r,n._defaultConfig.version)?l(r):t}).then(function(t){r.db=o.db=t,n._dbInfo=r;for(var e in c){var i=c[e];i!==n&&(i._dbInfo.db=r.db,i._dbInfo.version=r.version)}})}function f(t){return h(t,!1)}function l(t){return h(t,!0)}function h(t,e){return new Promise(function(n,r){if(t.db){if(!e)return n(t.db);t.db.close()}var i=[t.name];e&&i.push(t.version);var o=E.open.apply(E,i);e&&(o.onupgradeneeded=function(e){var n=o.result;try{n.createObjectStore(t.storeName),e.oldVersion<=1&&n.createObjectStore(S)}catch(r){if("ConstraintError"!==r.name)throw r;x.console.warn('The database "'+t.name+'"'+" has been upgraded from version "+e.oldVersion+" to version "+e.newVersion+', but the storage "'+t.storeName+'" already exists.')}}),o.onerror=function(){r(o.error)},o.onsuccess=function(){n(o.result)}})}function p(t,e){if(!t.db)return!0;var n=!t.db.objectStoreNames.contains(t.storeName),r=t.version<t.db.version,i=t.version>t.db.version;if(r&&(t.version!==e&&x.console.warn('The database "'+t.name+'"'+" can't be downgraded from version "+t.db.version+" to version "+t.version+"."),t.version=t.db.version),i||n){if(n){var o=t.db.version+1;o>t.version&&(t.version=o)}return!0}return!1}function d(t,e){var n=this;"string"!=typeof t&&(x.console.warn(t+" used as a key, but it is not a string."),t=String(t));var r=new Promise(function(e,r){n.ready().then(function(){var i=n._dbInfo,o=i.db.transaction(i.storeName,"readonly").objectStore(i.storeName),a=o.get(t);a.onsuccess=function(){var t=a.result;void 0===t&&(t=null),s(t)&&(t=u(t)),e(t)},a.onerror=function(){r(a.error)}})["catch"](r)});return k(r,e),r}function y(t,e){var n=this,r=new Promise(function(e,r){n.ready().then(function(){var i=n._dbInfo,o=i.db.transaction(i.storeName,"readonly").objectStore(i.storeName),a=o.openCursor(),c=1;a.onsuccess=function(){var n=a.result;if(n){var r=n.value;s(r)&&(r=u(r));var i=t(r,n.key,c++);void 0!==i?e(i):n["continue"]()}else e()},a.onerror=function(){r(a.error)}})["catch"](r)});return k(r,e),r}function v(t,e,n){var r=this;"string"!=typeof t&&(x.console.warn(t+" used as a key, but it is not a string."),t=String(t));var i=new Promise(function(n,i){var u;r.ready().then(function(){return u=r._dbInfo,o(u.db)}).then(function(t){return!t&&e instanceof Blob?a(e):e}).then(function(e){var r=u.db.transaction(u.storeName,"readwrite"),o=r.objectStore(u.storeName);null===e&&(e=void 0);var a=o.put(e,t);r.oncomplete=function(){void 0===e&&(e=null),n(e)},r.onabort=r.onerror=function(){var t=a.error?a.error:a.transaction.error;i(t)}})["catch"](i)});return k(i,n),i}function g(t,e){var n=this;"string"!=typeof t&&(x.console.warn(t+" used as a key, but it is not a string."),t=String(t));var r=new Promise(function(e,r){n.ready().then(function(){var i=n._dbInfo,o=i.db.transaction(i.storeName,"readwrite"),a=o.objectStore(i.storeName),u=a["delete"](t);o.oncomplete=function(){e()},o.onerror=function(){r(u.error)},o.onabort=function(){var t=u.error?u.error:u.transaction.error;r(t)}})["catch"](r)});return k(r,e),r}function m(t){var e=this,n=new Promise(function(t,n){e.ready().then(function(){var r=e._dbInfo,i=r.db.transaction(r.storeName,"readwrite"),o=i.objectStore(r.storeName),a=o.clear();i.oncomplete=function(){t()},i.onabort=i.onerror=function(){var t=a.error?a.error:a.transaction.error;n(t)}})["catch"](n)});return k(n,t),n}function b(t){var e=this,n=new Promise(function(t,n){e.ready().then(function(){var r=e._dbInfo,i=r.db.transaction(r.storeName,"readonly").objectStore(r.storeName),o=i.count();o.onsuccess=function(){t(o.result)},o.onerror=function(){n(o.error)}})["catch"](n)});return k(n,t),n}function w(t,e){var n=this,r=new Promise(function(e,r){return 0>t?(e(null),void 0):(n.ready().then(function(){var i=n._dbInfo,o=i.db.transaction(i.storeName,"readonly").objectStore(i.storeName),a=!1,u=o.openCursor();u.onsuccess=function(){var n=u.result;return n?(0===t?e(n.key):a?e(n.key):(a=!0,n.advance(t)),void 0):(e(null),void 0)},u.onerror=function(){r(u.error)}})["catch"](r),void 0)});return k(r,e),r}function _(t){var e=this,n=new Promise(function(t,n){e.ready().then(function(){var r=e._dbInfo,i=r.db.transaction(r.storeName,"readonly").objectStore(r.storeName),o=i.openCursor(),a=[];o.onsuccess=function(){var e=o.result;return e?(a.push(e.key),e["continue"](),void 0):(t(a),void 0)},o.onerror=function(){n(o.error)}})["catch"](n)});return k(n,t),n}function k(t,e){e&&t.then(function(t){e(null,t)},function(t){e(t)})}var x=this,E=E||this.indexedDB||this.webkitIndexedDB||this.mozIndexedDB||this.OIndexedDB||this.msIndexedDB;if(E){var A,O,S="local-forage-detect-blob-support",j={_driver:"asyncStorage",_initStorage:c,iterate:y,getItem:d,setItem:v,removeItem:g,clear:m,length:b,key:w,keys:_};e["default"]=j}}.call("undefined"!=typeof window?window:self),t.exports=e["default"]},function(t,e,n){"use strict";e.__esModule=!0,function(){function t(t){var e=this,r={};if(t)for(var i in t)r[i]=t[i];return r.keyPrefix=r.name+"/",r.storeName!==e._defaultConfig.storeName&&(r.keyPrefix+=r.storeName+"/"),e._dbInfo=r,new Promise(function(t){t(n(3))}).then(function(t){return r.serializer=t,Promise.resolve()})}function r(t){var e=this,n=e.ready().then(function(){for(var t=e._dbInfo.keyPrefix,n=p.length-1;n>=0;n--){var r=p.key(n);0===r.indexOf(t)&&p.removeItem(r)}});return l(n,t),n}function i(t,e){var n=this;"string"!=typeof t&&(h.console.warn(t+" used as a key, but it is not a string."),t=String(t));var r=n.ready().then(function(){var e=n._dbInfo,r=p.getItem(e.keyPrefix+t);return r&&(r=e.serializer.deserialize(r)),r});return l(r,e),r}function o(t,e){var n=this,r=n.ready().then(function(){for(var e=n._dbInfo,r=e.keyPrefix,i=r.length,o=p.length,a=1,u=0;o>u;u++){var s=p.key(u);if(0===s.indexOf(r)){var c=p.getItem(s);if(c&&(c=e.serializer.deserialize(c)),c=t(c,s.substring(i),a++),void 0!==c)return c}}});return l(r,e),r}function a(t,e){var n=this,r=n.ready().then(function(){var e,r=n._dbInfo;try{e=p.key(t)}catch(i){e=null}return e&&(e=e.substring(r.keyPrefix.length)),e});return l(r,e),r}function u(t){var e=this,n=e.ready().then(function(){for(var t=e._dbInfo,n=p.length,r=[],i=0;n>i;i++)0===p.key(i).indexOf(t.keyPrefix)&&r.push(p.key(i).substring(t.keyPrefix.length));return r});return l(n,t),n}function s(t){var e=this,n=e.keys().then(function(t){return t.length});return l(n,t),n}function c(t,e){var n=this;"string"!=typeof t&&(h.console.warn(t+" used as a key, but it is not a string."),t=String(t));var r=n.ready().then(function(){var e=n._dbInfo;p.removeItem(e.keyPrefix+t)});return l(r,e),r}function f(t,e,n){var r=this;"string"!=typeof t&&(h.console.warn(t+" used as a key, but it is not a string."),t=String(t));var i=r.ready().then(function(){void 0===e&&(e=null);var n=e;return new Promise(function(i,o){var a=r._dbInfo;a.serializer.serialize(e,function(e,r){if(r)o(r);else try{p.setItem(a.keyPrefix+t,e),i(n)}catch(u){("QuotaExceededError"===u.name||"NS_ERROR_DOM_QUOTA_REACHED"===u.name)&&o(u),o(u)}})})});return l(i,n),i}function l(t,e){e&&t.then(function(t){e(null,t)},function(t){e(t)})}var h=this,p=null;try{if(!(this.localStorage&&"setItem"in this.localStorage))return;p=this.localStorage}catch(d){return}var y={_driver:"localStorageWrapper",_initStorage:t,iterate:o,getItem:i,setItem:f,removeItem:c,clear:r,length:s,key:a,keys:u};e["default"]=y}.call("undefined"!=typeof window?window:self),t.exports=e["default"]},function(t,e){"use strict";e.__esModule=!0,function(){function t(t,e){t=t||[],e=e||{};try{return new Blob(t,e)}catch(n){if("TypeError"!==n.name)throw n;for(var r=x.BlobBuilder||x.MSBlobBuilder||x.MozBlobBuilder||x.WebKitBlobBuilder,i=new r,o=0;o<t.length;o+=1)i.append(t[o]);return i.getBlob(e.type)}}function n(t,e){var n="";if(t&&(n=t.toString()),t&&("[object ArrayBuffer]"===t.toString()||t.buffer&&"[object ArrayBuffer]"===t.buffer.toString())){var r,i=c;t instanceof ArrayBuffer?(r=t,i+=l):(r=t.buffer,"[object Int8Array]"===n?i+=p:"[object Uint8Array]"===n?i+=d:"[object Uint8ClampedArray]"===n?i+=y:"[object Int16Array]"===n?i+=v:"[object Uint16Array]"===n?i+=m:"[object Int32Array]"===n?i+=g:"[object Uint32Array]"===n?i+=b:"[object Float32Array]"===n?i+=w:"[object Float64Array]"===n?i+=_:e(new Error("Failed to get type for BinaryArray"))),e(i+o(r))}else if("[object Blob]"===n){var a=new FileReader;a.onload=function(){var n=u+t.type+"~"+o(this.result);e(c+h+n)},a.readAsArrayBuffer(t)}else try{e(JSON.stringify(t))}catch(s){console.error("Couldn't convert value into a JSON string: ",t),e(null,s)}}function r(e){if(e.substring(0,f)!==c)return JSON.parse(e);var n,r=e.substring(k),o=e.substring(f,k);if(o===h&&s.test(r)){var a=r.match(s);n=a[1],r=r.substring(a[0].length)}var u=i(r);switch(o){case l:return u;case h:return t([u],{type:n});case p:return new Int8Array(u);case d:return new Uint8Array(u);case y:return new Uint8ClampedArray(u);case v:return new Int16Array(u);case m:return new Uint16Array(u);case g:return new Int32Array(u);case b:return new Uint32Array(u);case w:return new Float32Array(u);case _:return new Float64Array(u);default:throw new Error("Unkown type: "+o)}}function i(t){var e,n,r,i,o,u=.75*t.length,s=t.length,c=0;"="===t[t.length-1]&&(u--,"="===t[t.length-2]&&u--);var f=new ArrayBuffer(u),l=new Uint8Array(f);for(e=0;s>e;e+=4)n=a.indexOf(t[e]),r=a.indexOf(t[e+1]),i=a.indexOf(t[e+2]),o=a.indexOf(t[e+3]),l[c++]=n<<2|r>>4,l[c++]=(15&r)<<4|i>>2,l[c++]=(3&i)<<6|63&o;return f}function o(t){var e,n=new Uint8Array(t),r="";for(e=0;e<n.length;e+=3)r+=a[n[e]>>2],r+=a[(3&n[e])<<4|n[e+1]>>4],r+=a[(15&n[e+1])<<2|n[e+2]>>6],r+=a[63&n[e+2]];return 2===n.length%3?r=r.substring(0,r.length-1)+"=":1===n.length%3&&(r=r.substring(0,r.length-2)+"=="),r}var a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",u="~~local_forage_type~",s=/^~~local_forage_type~([^~]+)~/,c="__lfsc__:",f=c.length,l="arbf",h="blob",p="si08",d="ui08",y="uic8",v="si16",g="si32",m="ur16",b="ui32",w="fl32",_="fl64",k=f+l.length,x=this,E={serialize:n,deserialize:r,stringToBuffer:i,bufferToString:o};e["default"]=E}.call("undefined"!=typeof window?window:self),t.exports=e["default"]},function(t,e,n){"use strict";e.__esModule=!0,function(){function t(t){var e=this,r={db:null};if(t)for(var i in t)r[i]="string"!=typeof t[i]?t[i].toString():t[i];var o=new Promise(function(n,i){try{r.db=p(r.name,String(r.version),r.description,r.size)}catch(o){return e.setDriver(e.LOCALSTORAGE).then(function(){return e._initStorage(t)}).then(n)["catch"](i)}r.db.transaction(function(t){t.executeSql("CREATE TABLE IF NOT EXISTS "+r.storeName+" (id INTEGER PRIMARY KEY, key unique, value)",[],function(){e._dbInfo=r,n()},function(t,e){i(e)})})});return new Promise(function(t){t(n(3))}).then(function(t){return r.serializer=t,o})}function r(t,e){var n=this;"string"!=typeof t&&(h.console.warn(t+" used as a key, but it is not a string."),t=String(t));var r=new Promise(function(e,r){n.ready().then(function(){var i=n._dbInfo;i.db.transaction(function(n){n.executeSql("SELECT * FROM "+i.storeName+" WHERE key = ? LIMIT 1",[t],function(t,n){var r=n.rows.length?n.rows.item(0).value:null;r&&(r=i.serializer.deserialize(r)),e(r)},function(t,e){r(e)})})})["catch"](r)});return l(r,e),r}function i(t,e){var n=this,r=new Promise(function(e,r){n.ready().then(function(){var i=n._dbInfo;i.db.transaction(function(n){n.executeSql("SELECT * FROM "+i.storeName,[],function(n,r){for(var o=r.rows,a=o.length,u=0;a>u;u++){var s=o.item(u),c=s.value;if(c&&(c=i.serializer.deserialize(c)),c=t(c,s.key,u+1),void 0!==c)return e(c),void 0}e()},function(t,e){r(e)})})})["catch"](r)});return l(r,e),r}function o(t,e,n){var r=this;"string"!=typeof t&&(h.console.warn(t+" used as a key, but it is not a string."),t=String(t));var i=new Promise(function(n,i){r.ready().then(function(){void 0===e&&(e=null);var o=e,a=r._dbInfo;a.serializer.serialize(e,function(e,r){r?i(r):a.db.transaction(function(r){r.executeSql("INSERT OR REPLACE INTO "+a.storeName+" (key, value) VALUES (?, ?)",[t,e],function(){n(o)},function(t,e){i(e)})},function(t){t.code===t.QUOTA_ERR&&i(t)})})})["catch"](i)});return l(i,n),i}function a(t,e){var n=this;"string"!=typeof t&&(h.console.warn(t+" used as a key, but it is not a string."),t=String(t));var r=new Promise(function(e,r){n.ready().then(function(){var i=n._dbInfo;i.db.transaction(function(n){n.executeSql("DELETE FROM "+i.storeName+" WHERE key = ?",[t],function(){e()},function(t,e){r(e)})})})["catch"](r)});return l(r,e),r}function u(t){var e=this,n=new Promise(function(t,n){e.ready().then(function(){var r=e._dbInfo;r.db.transaction(function(e){e.executeSql("DELETE FROM "+r.storeName,[],function(){t()},function(t,e){n(e)})})})["catch"](n)});return l(n,t),n}function s(t){var e=this,n=new Promise(function(t,n){e.ready().then(function(){var r=e._dbInfo;r.db.transaction(function(e){e.executeSql("SELECT COUNT(key) as c FROM "+r.storeName,[],function(e,n){var r=n.rows.item(0).c;t(r)},function(t,e){n(e)})})})["catch"](n)});return l(n,t),n}function c(t,e){var n=this,r=new Promise(function(e,r){n.ready().then(function(){var i=n._dbInfo;i.db.transaction(function(n){n.executeSql("SELECT key FROM "+i.storeName+" WHERE id = ? LIMIT 1",[t+1],function(t,n){var r=n.rows.length?n.rows.item(0).key:null;e(r)},function(t,e){r(e)})})})["catch"](r)});return l(r,e),r}function f(t){var e=this,n=new Promise(function(t,n){e.ready().then(function(){var r=e._dbInfo;r.db.transaction(function(e){e.executeSql("SELECT key FROM "+r.storeName,[],function(e,n){for(var r=[],i=0;i<n.rows.length;i++)r.push(n.rows.item(i).key);t(r)},function(t,e){n(e)})})})["catch"](n)});return l(n,t),n}function l(t,e){e&&t.then(function(t){e(null,t)},function(t){e(t)})}var h=this,p=this.openDatabase;if(p){var d={_driver:"webSQLStorage",_initStorage:t,iterate:i,getItem:r,setItem:o,removeItem:a,clear:u,length:s,key:c,keys:f};e["default"]=d}}.call("undefined"!=typeof window?window:self),t.exports=e["default"]}])})},{__browserify_process:4}],19:[function(t,e,n){!function(){var t=this,r=t._,i={},o=Array.prototype,a=Object.prototype,u=Function.prototype,s=o.push,c=o.slice,f=o.concat,l=a.toString,h=a.hasOwnProperty,p=o.forEach,d=o.map,y=o.reduce,v=o.reduceRight,g=o.filter,m=o.every,b=o.some,w=o.indexOf,_=o.lastIndexOf,k=Array.isArray,x=Object.keys,E=u.bind,A=function(t){return t instanceof A?t:this instanceof A?(this._wrapped=t,void 0):new A(t)};"undefined"!=typeof n?("undefined"!=typeof e&&e.exports&&(n=e.exports=A),n._=A):t._=A,A.VERSION="1.4.4";var O=A.each=A.forEach=function(t,e,n){if(null!=t)if(p&&t.forEach===p)t.forEach(e,n);else if(t.length===+t.length){for(var r=0,o=t.length;o>r;r++)if(e.call(n,t[r],r,t)===i)return}else for(var a in t)if(A.has(t,a)&&e.call(n,t[a],a,t)===i)return};A.map=A.collect=function(t,e,n){var r=[];return null==t?r:d&&t.map===d?t.map(e,n):(O(t,function(t,i,o){r[r.length]=e.call(n,t,i,o)}),r)};var S="Reduce of empty array with no initial value";A.reduce=A.foldl=A.inject=function(t,e,n,r){var i=arguments.length>2;if(null==t&&(t=[]),y&&t.reduce===y)return r&&(e=A.bind(e,r)),i?t.reduce(e,n):t.reduce(e);if(O(t,function(t,o,a){i?n=e.call(r,n,t,o,a):(n=t,i=!0)}),!i)throw new TypeError(S);return n},A.reduceRight=A.foldr=function(t,e,n,r){var i=arguments.length>2;if(null==t&&(t=[]),v&&t.reduceRight===v)return r&&(e=A.bind(e,r)),i?t.reduceRight(e,n):t.reduceRight(e);var o=t.length;if(o!==+o){var a=A.keys(t);o=a.length}if(O(t,function(u,s,c){s=a?a[--o]:--o,i?n=e.call(r,n,t[s],s,c):(n=t[s],i=!0)}),!i)throw new TypeError(S);return n},A.find=A.detect=function(t,e,n){var r;return j(t,function(t,i,o){return e.call(n,t,i,o)?(r=t,!0):void 0}),r},A.filter=A.select=function(t,e,n){var r=[];return null==t?r:g&&t.filter===g?t.filter(e,n):(O(t,function(t,i,o){e.call(n,t,i,o)&&(r[r.length]=t)}),r)},A.reject=function(t,e,n){return A.filter(t,function(t,r,i){return!e.call(n,t,r,i)},n)},A.every=A.all=function(t,e,n){e||(e=A.identity);var r=!0;return null==t?r:m&&t.every===m?t.every(e,n):(O(t,function(t,o,a){return(r=r&&e.call(n,t,o,a))?void 0:i}),!!r)};var j=A.some=A.any=function(t,e,n){e||(e=A.identity);var r=!1;return null==t?r:b&&t.some===b?t.some(e,n):(O(t,function(t,o,a){return r||(r=e.call(n,t,o,a))?i:void 0}),!!r)};A.contains=A.include=function(t,e){return null==t?!1:w&&t.indexOf===w?-1!=t.indexOf(e):j(t,function(t){return t===e})},A.invoke=function(t,e){var n=c.call(arguments,2),r=A.isFunction(e);return A.map(t,function(t){return(r?e:t[e]).apply(t,n)})},A.pluck=function(t,e){return A.map(t,function(t){return t[e]})},A.where=function(t,e,n){return A.isEmpty(e)?n?null:[]:A[n?"find":"filter"](t,function(t){for(var n in e)if(e[n]!==t[n])return!1;return!0})},A.findWhere=function(t,e){return A.where(t,e,!0)},A.max=function(t,e,n){if(!e&&A.isArray(t)&&t[0]===+t[0]&&t.length<65535)return Math.max.apply(Math,t);if(!e&&A.isEmpty(t))return-1/0;var r={computed:-1/0,value:-1/0};return O(t,function(t,i,o){var a=e?e.call(n,t,i,o):t;a>=r.computed&&(r={value:t,computed:a})}),r.value},A.min=function(t,e,n){if(!e&&A.isArray(t)&&t[0]===+t[0]&&t.length<65535)return Math.min.apply(Math,t);if(!e&&A.isEmpty(t))return 1/0;var r={computed:1/0,value:1/0};return O(t,function(t,i,o){var a=e?e.call(n,t,i,o):t;a<r.computed&&(r={value:t,computed:a})}),r.value},A.shuffle=function(t){var e,n=0,r=[];return O(t,function(t){e=A.random(n++),r[n-1]=r[e],r[e]=t}),r};var I=function(t){return A.isFunction(t)?t:function(e){return e[t]}};A.sortBy=function(t,e,n){var r=I(e);return A.pluck(A.map(t,function(t,e,i){return{value:t,index:e,criteria:r.call(n,t,e,i)}}).sort(function(t,e){var n=t.criteria,r=e.criteria;if(n!==r){if(n>r||void 0===n)return 1;if(r>n||void 0===r)return-1}return t.index<e.index?-1:1}),"value")};var D=function(t,e,n,r){var i={},o=I(e||A.identity);return O(t,function(e,a){var u=o.call(n,e,a,t);r(i,u,e)}),i};A.groupBy=function(t,e,n){return D(t,e,n,function(t,e,n){(A.has(t,e)?t[e]:t[e]=[]).push(n)})},A.countBy=function(t,e,n){return D(t,e,n,function(t,e){A.has(t,e)||(t[e]=0),t[e]++})},A.sortedIndex=function(t,e,n,r){n=null==n?A.identity:I(n);for(var i=n.call(r,e),o=0,a=t.length;a>o;){var u=o+a>>>1;n.call(r,t[u])<i?o=u+1:a=u}return o},A.toArray=function(t){return t?A.isArray(t)?c.call(t):t.length===+t.length?A.map(t,A.identity):A.values(t):[]},A.size=function(t){return null==t?0:t.length===+t.length?t.length:A.keys(t).length},A.first=A.head=A.take=function(t,e,n){return null==t?void 0:null==e||n?t[0]:c.call(t,0,e)},A.initial=function(t,e,n){return c.call(t,0,t.length-(null==e||n?1:e))},A.last=function(t,e,n){return null==t?void 0:null==e||n?t[t.length-1]:c.call(t,Math.max(t.length-e,0))},A.rest=A.tail=A.drop=function(t,e,n){return c.call(t,null==e||n?1:e)},A.compact=function(t){return A.filter(t,A.identity)};var $=function(t,e,n){return O(t,function(t){A.isArray(t)?e?s.apply(n,t):$(t,e,n):n.push(t)}),n};A.flatten=function(t,e){return $(t,e,[])},A.without=function(t){return A.difference(t,c.call(arguments,1))},A.uniq=A.unique=function(t,e,n,r){A.isFunction(e)&&(r=n,n=e,e=!1);var i=n?A.map(t,n,r):t,o=[],a=[];return O(i,function(n,r){(e?r&&a[a.length-1]===n:A.contains(a,n))||(a.push(n),o.push(t[r]))}),o},A.union=function(){return A.uniq(f.apply(o,arguments))},A.intersection=function(t){var e=c.call(arguments,1);return A.filter(A.uniq(t),function(t){return A.every(e,function(e){return A.indexOf(e,t)>=0})})},A.difference=function(t){var e=f.apply(o,c.call(arguments,1));return A.filter(t,function(t){return!A.contains(e,t)})},A.zip=function(){for(var t=c.call(arguments),e=A.max(A.pluck(t,"length")),n=new Array(e),r=0;e>r;r++)n[r]=A.pluck(t,""+r);return n},A.object=function(t,e){if(null==t)return{};for(var n={},r=0,i=t.length;i>r;r++)e?n[t[r]]=e[r]:n[t[r][0]]=t[r][1];return n},A.indexOf=function(t,e,n){if(null==t)return-1;var r=0,i=t.length;if(n){if("number"!=typeof n)return r=A.sortedIndex(t,e),t[r]===e?r:-1;r=0>n?Math.max(0,i+n):n}if(w&&t.indexOf===w)return t.indexOf(e,n);for(;i>r;r++)if(t[r]===e)return r;return-1},A.lastIndexOf=function(t,e,n){if(null==t)return-1;var r=null!=n;if(_&&t.lastIndexOf===_)return r?t.lastIndexOf(e,n):t.lastIndexOf(e);for(var i=r?n:t.length;i--;)if(t[i]===e)return i;return-1},A.range=function(t,e,n){arguments.length<=1&&(e=t||0,t=0),n=arguments[2]||1;for(var r=Math.max(Math.ceil((e-t)/n),0),i=0,o=new Array(r);r>i;)o[i++]=t,t+=n;return o},A.bind=function(t,e){if(t.bind===E&&E)return E.apply(t,c.call(arguments,1));var n=c.call(arguments,2);return function(){return t.apply(e,n.concat(c.call(arguments)))}},A.partial=function(t){var e=c.call(arguments,1);return function(){return t.apply(this,e.concat(c.call(arguments)))}},A.bindAll=function(t){var e=c.call(arguments,1);return 0===e.length&&(e=A.functions(t)),O(e,function(e){t[e]=A.bind(t[e],t)}),t},A.memoize=function(t,e){var n={};return e||(e=A.identity),function(){var r=e.apply(this,arguments);return A.has(n,r)?n[r]:n[r]=t.apply(this,arguments)}},A.delay=function(t,e){var n=c.call(arguments,2);return setTimeout(function(){return t.apply(null,n)},e)},A.defer=function(t){return A.delay.apply(A,[t,1].concat(c.call(arguments,1)))},A.throttle=function(t,e){var n,r,i,o,a=0,u=function(){a=new Date,i=null,o=t.apply(n,r)};return function(){var s=new Date,c=e-(s-a);return n=this,r=arguments,0>=c?(clearTimeout(i),i=null,a=s,o=t.apply(n,r)):i||(i=setTimeout(u,c)),o}},A.debounce=function(t,e,n){var r,i;return function(){var o=this,a=arguments,u=function(){r=null,n||(i=t.apply(o,a))},s=n&&!r;return clearTimeout(r),r=setTimeout(u,e),s&&(i=t.apply(o,a)),i}},A.once=function(t){var e,n=!1;return function(){return n?e:(n=!0,e=t.apply(this,arguments),t=null,e)}},A.wrap=function(t,e){return function(){var n=[t];return s.apply(n,arguments),e.apply(this,n)}},A.compose=function(){var t=arguments;return function(){for(var e=arguments,n=t.length-1;n>=0;n--)e=[t[n].apply(this,e)];return e[0]}},A.after=function(t,e){return 0>=t?e():function(){return--t<1?e.apply(this,arguments):void 0}},A.keys=x||function(t){if(t!==Object(t))throw new TypeError("Invalid object");var e=[];for(var n in t)A.has(t,n)&&(e[e.length]=n);return e},A.values=function(t){var e=[];for(var n in t)A.has(t,n)&&e.push(t[n]);return e},A.pairs=function(t){var e=[];for(var n in t)A.has(t,n)&&e.push([n,t[n]]);return e},A.invert=function(t){var e={};for(var n in t)A.has(t,n)&&(e[t[n]]=n);return e},A.functions=A.methods=function(t){var e=[];for(var n in t)A.isFunction(t[n])&&e.push(n);return e.sort()},A.extend=function(t){return O(c.call(arguments,1),function(e){if(e)for(var n in e)t[n]=e[n]}),t},A.pick=function(t){var e={},n=f.apply(o,c.call(arguments,1));return O(n,function(n){n in t&&(e[n]=t[n])}),e},A.omit=function(t){var e={},n=f.apply(o,c.call(arguments,1));for(var r in t)A.contains(n,r)||(e[r]=t[r]);return e},A.defaults=function(t){return O(c.call(arguments,1),function(e){if(e)for(var n in e)null==t[n]&&(t[n]=e[n])}),t},A.clone=function(t){return A.isObject(t)?A.isArray(t)?t.slice():A.extend({},t):t},A.tap=function(t,e){return e(t),t};var N=function(t,e,n,r){if(t===e)return 0!==t||1/t==1/e;if(null==t||null==e)return t===e;t instanceof A&&(t=t._wrapped),e instanceof A&&(e=e._wrapped);var i=l.call(t);if(i!=l.call(e))return!1;switch(i){case"[object String]":return t==String(e);case"[object Number]":return t!=+t?e!=+e:0==t?1/t==1/e:t==+e;case"[object Date]":case"[object Boolean]":return+t==+e;case"[object RegExp]":return t.source==e.source&&t.global==e.global&&t.multiline==e.multiline&&t.ignoreCase==e.ignoreCase}if("object"!=typeof t||"object"!=typeof e)return!1;for(var o=n.length;o--;)if(n[o]==t)return r[o]==e;n.push(t),r.push(e);var a=0,u=!0;if("[object Array]"==i){if(a=t.length,u=a==e.length)for(;a--&&(u=N(t[a],e[a],n,r)););}else{var s=t.constructor,c=e.constructor;if(s!==c&&!(A.isFunction(s)&&s instanceof s&&A.isFunction(c)&&c instanceof c))return!1;for(var f in t)if(A.has(t,f)&&(a++,!(u=A.has(e,f)&&N(t[f],e[f],n,r))))break;if(u){for(f in e)if(A.has(e,f)&&!a--)break;u=!a}}return n.pop(),r.pop(),u};A.isEqual=function(t,e){return N(t,e,[],[])},A.isEmpty=function(t){if(null==t)return!0;if(A.isArray(t)||A.isString(t))return 0===t.length;for(var e in t)if(A.has(t,e))return!1;return!0},A.isElement=function(t){return!(!t||1!==t.nodeType)},A.isArray=k||function(t){return"[object Array]"==l.call(t)},A.isObject=function(t){return t===Object(t)},O(["Arguments","Function","String","Number","Date","RegExp"],function(t){A["is"+t]=function(e){return l.call(e)=="[object "+t+"]"}}),A.isArguments(arguments)||(A.isArguments=function(t){return!(!t||!A.has(t,"callee"))}),"function"!=typeof/./&&(A.isFunction=function(t){return"function"==typeof t}),A.isFinite=function(t){return isFinite(t)&&!isNaN(parseFloat(t))},A.isNaN=function(t){return A.isNumber(t)&&t!=+t},A.isBoolean=function(t){return t===!0||t===!1||"[object Boolean]"==l.call(t)},A.isNull=function(t){return null===t},A.isUndefined=function(t){return void 0===t},A.has=function(t,e){return h.call(t,e)},A.noConflict=function(){return t._=r,this},A.identity=function(t){return t},A.times=function(t,e,n){for(var r=Array(t),i=0;t>i;i++)r[i]=e.call(n,i);return r},A.random=function(t,e){return null==e&&(e=t,t=0),t+Math.floor(Math.random()*(e-t+1))
};var P={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;"}};P.unescape=A.invert(P.escape);var T={escape:new RegExp("["+A.keys(P.escape).join("")+"]","g"),unescape:new RegExp("("+A.keys(P.unescape).join("|")+")","g")};A.each(["escape","unescape"],function(t){A[t]=function(e){return null==e?"":(""+e).replace(T[t],function(e){return P[t][e]})}}),A.result=function(t,e){if(null==t)return null;var n=t[e];return A.isFunction(n)?n.call(t):n},A.mixin=function(t){O(A.functions(t),function(e){var n=A[e]=t[e];A.prototype[e]=function(){var t=[this._wrapped];return s.apply(t,arguments),R.call(this,n.apply(A,t))}})};var C=0;A.uniqueId=function(t){var e=++C+"";return t?t+e:e},A.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var M=/(.)^/,B={"'":"'","\\":"\\","\r":"r","\n":"n","	":"t","\u2028":"u2028","\u2029":"u2029"},F=/\\|'|\r|\n|\t|\u2028|\u2029/g;A.template=function(t,e,n){var r;n=A.defaults({},n,A.templateSettings);var i=new RegExp([(n.escape||M).source,(n.interpolate||M).source,(n.evaluate||M).source].join("|")+"|$","g"),o=0,a="__p+='";t.replace(i,function(e,n,r,i,u){return a+=t.slice(o,u).replace(F,function(t){return"\\"+B[t]}),n&&(a+="'+\n((__t=("+n+"))==null?'':_.escape(__t))+\n'"),r&&(a+="'+\n((__t=("+r+"))==null?'':__t)+\n'"),i&&(a+="';\n"+i+"\n__p+='"),o=u+e.length,e}),a+="';\n",n.variable||(a="with(obj||{}){\n"+a+"}\n"),a="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+a+"return __p;\n";try{r=new Function(n.variable||"obj","_",a)}catch(u){throw u.source=a,u}if(e)return r(e,A);var s=function(t){return r.call(this,t,A)};return s.source="function("+(n.variable||"obj")+"){\n"+a+"}",s},A.chain=function(t){return A(t).chain()};var R=function(t){return this._chain?A(t).chain():t};A.mixin(A),O(["pop","push","reverse","shift","sort","splice","unshift"],function(t){var e=o[t];A.prototype[t]=function(){var n=this._wrapped;return e.apply(n,arguments),"shift"!=t&&"splice"!=t||0!==n.length||delete n[0],R.call(this,n)}}),O(["concat","join","slice"],function(t){var e=o[t];A.prototype[t]=function(){return R.call(this,e.apply(this._wrapped,arguments))}}),A.extend(A.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}})}.call(this)},{}]},{},[7])(7)});
!function(root,factory){"undefined"!=typeof exports?"undefined"!=typeof module&&module.exports&&(exports=module.exports=factory(root,exports)):"function"==typeof define&&define.amd?define(["exports"],function(exports){root.Lockr=factory(root,exports)}):root.Lockr=factory(root,{})}(this,function(root,Lockr){"use strict";return Array.prototype.indexOf||(Array.prototype.indexOf=function(elt){var len=this.length>>>0,from=Number(arguments[1])||0;for(from=0>from?Math.ceil(from):Math.floor(from),0>from&&(from+=len);len>from;from++)if(from in this&&this[from]===elt)return from;return-1}),Lockr.prefix="",Lockr._getPrefixedKey=function(key,options){return options=options||{},options.noPrefix?key:this.prefix+key},Lockr.set=function(key,value,options){var query_key=this._getPrefixedKey(key,options);try{localStorage.setItem(query_key,JSON.stringify({data:value}))}catch(e){console&&console.warn("Lockr didn't successfully save the '{"+key+": "+value+"}' pair, because the localStorage is full.")}},Lockr.get=function(key,missing,options){var value,query_key=this._getPrefixedKey(key,options);try{value=JSON.parse(localStorage.getItem(query_key))}catch(e){try{value=localStorage[query_key]?JSON.parse('{"data":"'+localStorage.getItem(query_key)+'"}'):null}catch(e){console&&console.warn("Lockr could not load the item with key "+key)}}return null===value?missing:"undefined"!=typeof value.data?value.data:missing},Lockr.sadd=function(key,value,options){var json,query_key=this._getPrefixedKey(key,options),values=Lockr.smembers(key);if(values.indexOf(value)>-1)return null;try{values.push(value),json=JSON.stringify({data:values}),localStorage.setItem(query_key,json)}catch(e){console.log(e),console&&console.warn("Lockr didn't successfully add the "+value+" to "+key+" set, because the localStorage is full.")}},Lockr.smembers=function(key,options){var value,query_key=this._getPrefixedKey(key,options);try{value=JSON.parse(localStorage.getItem(query_key))}catch(e){value=null}return null===value?[]:value.data||[]},Lockr.sismember=function(key,value,options){this._getPrefixedKey(key,options);return Lockr.smembers(key).indexOf(value)>-1},Lockr.getAll=function(){var keys=Object.keys(localStorage);return keys.map(function(key){return Lockr.get(key)})},Lockr.srem=function(key,value,options){var json,index,query_key=this._getPrefixedKey(key,options),values=Lockr.smembers(key,value);index=values.indexOf(value),index>-1&&values.splice(index,1),json=JSON.stringify({data:values});try{localStorage.setItem(query_key,json)}catch(e){console&&console.warn("Lockr couldn't remove the "+value+" from the set "+key)}},Lockr.rm=function(key){localStorage.removeItem(key)},Lockr.flush=function(){localStorage.clear()},Lockr});
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
 * PEP v0.4.1 | https://github.com/jquery/PEP
 * Copyright jQuery Foundation and other contributors | http://jquery.org/license
 */
!function(a,b){"object"==typeof exports&&"undefined"!=typeof module?module.exports=b():"function"==typeof define&&define.amd?define(b):a.PointerEventsPolyfill=b()}(this,function(){"use strict";function a(a,b){b=b||Object.create(null);var c=document.createEvent("Event");c.initEvent(a,b.bubbles||!1,b.cancelable||!1);for(var d,e=2;e<k.length;e++)d=k[e],c[d]=b[d]||l[e];c.buttons=b.buttons||0;var f=0;return f=b.pressure?b.pressure:c.buttons?.5:0,c.x=c.clientX,c.y=c.clientY,c.pointerId=b.pointerId||0,c.width=b.width||0,c.height=b.height||0,c.pressure=f,c.tiltX=b.tiltX||0,c.tiltY=b.tiltY||0,c.pointerType=b.pointerType||"",c.hwTimestamp=b.hwTimestamp||0,c.isPrimary=b.isPrimary||!1,c}function b(){this.array=[],this.size=0}function c(a,b,c,d){this.addCallback=a.bind(d),this.removeCallback=b.bind(d),this.changedCallback=c.bind(d),B&&(this.observer=new B(this.mutationWatcher.bind(this)))}function d(a){return"body /shadow-deep/ "+e(a)}function e(a){return'[touch-action="'+a+'"]'}function f(a){return"{ -ms-touch-action: "+a+"; touch-action: "+a+"; touch-action-delay: none; }"}function g(){if(H){F.forEach(function(a){String(a)===a?(G+=e(a)+f(a)+"\n",I&&(G+=d(a)+f(a)+"\n")):(G+=a.selectors.map(e)+f(a.rule)+"\n",I&&(G+=a.selectors.map(d)+f(a.rule)+"\n"))});var a=document.createElement("style");a.textContent=G,document.head.appendChild(a)}}function h(){if(!window.PointerEvent){if(window.PointerEvent=m,window.navigator.msPointerEnabled){var a=window.navigator.msMaxTouchPoints;Object.defineProperty(window.navigator,"maxTouchPoints",{value:a,enumerable:!0}),v.registerSource("ms",ea)}else v.registerSource("mouse",Q),void 0!==window.ontouchstart&&v.registerSource("touch",aa);v.register(document)}}function i(a){if(!v.pointermap.has(a))throw new Error("InvalidPointerId")}function j(){window.Element&&!Element.prototype.setPointerCapture&&Object.defineProperties(Element.prototype,{setPointerCapture:{value:$},releasePointerCapture:{value:_}})}var k=["bubbles","cancelable","view","detail","screenX","screenY","clientX","clientY","ctrlKey","altKey","shiftKey","metaKey","button","relatedTarget","pageX","pageY"],l=[!1,!1,null,null,0,0,0,0,!1,!1,!1,!1,0,null,0,0],m=a,n=window.Map&&window.Map.prototype.forEach,o=n?Map:b;b.prototype={set:function(a,b){return void 0===b?this["delete"](a):(this.has(a)||this.size++,void(this.array[a]=b))},has:function(a){return void 0!==this.array[a]},"delete":function(a){this.has(a)&&(delete this.array[a],this.size--)},get:function(a){return this.array[a]},clear:function(){this.array.length=0,this.size=0},forEach:function(a,b){return this.array.forEach(function(c,d){a.call(b,c,d,this)},this)}};var p=o,q=["bubbles","cancelable","view","detail","screenX","screenY","clientX","clientY","ctrlKey","altKey","shiftKey","metaKey","button","relatedTarget","buttons","pointerId","width","height","pressure","tiltX","tiltY","pointerType","hwTimestamp","isPrimary","type","target","currentTarget","which","pageX","pageY","timeStamp"],r=[!1,!1,null,null,0,0,0,0,!1,!1,!1,!1,0,null,0,0,0,0,0,0,0,"",0,!1,"",null,null,0,0,0,0],s={pointerover:1,pointerout:1,pointerenter:1,pointerleave:1},t="undefined"!=typeof SVGElementInstance,u={pointermap:new p,eventMap:Object.create(null),captureInfo:Object.create(null),eventSources:Object.create(null),eventSourceList:[],registerSource:function(a,b){var c=b,d=c.events;d&&(d.forEach(function(a){c[a]&&(this.eventMap[a]=c[a].bind(c))},this),this.eventSources[a]=c,this.eventSourceList.push(c))},register:function(a){for(var b,c=this.eventSourceList.length,d=0;c>d&&(b=this.eventSourceList[d]);d++)b.register.call(b,a)},unregister:function(a){for(var b,c=this.eventSourceList.length,d=0;c>d&&(b=this.eventSourceList[d]);d++)b.unregister.call(b,a)},contains:function(a,b){try{return a.contains(b)}catch(c){return!1}},down:function(a){a.bubbles=!0,this.fireEvent("pointerdown",a)},move:function(a){a.bubbles=!0,this.fireEvent("pointermove",a)},up:function(a){a.bubbles=!0,this.fireEvent("pointerup",a)},enter:function(a){a.bubbles=!1,this.fireEvent("pointerenter",a)},leave:function(a){a.bubbles=!1,this.fireEvent("pointerleave",a)},over:function(a){a.bubbles=!0,this.fireEvent("pointerover",a)},out:function(a){a.bubbles=!0,this.fireEvent("pointerout",a)},cancel:function(a){a.bubbles=!0,this.fireEvent("pointercancel",a)},leaveOut:function(a){this.out(a),this.contains(a.target,a.relatedTarget)||this.leave(a)},enterOver:function(a){this.over(a),this.contains(a.target,a.relatedTarget)||this.enter(a)},eventHandler:function(a){if(!a._handledByPE){var b=a.type,c=this.eventMap&&this.eventMap[b];c&&c(a),a._handledByPE=!0}},listen:function(a,b){b.forEach(function(b){this.addEvent(a,b)},this)},unlisten:function(a,b){b.forEach(function(b){this.removeEvent(a,b)},this)},addEvent:function(a,b){a.addEventListener(b,this.boundHandler)},removeEvent:function(a,b){a.removeEventListener(b,this.boundHandler)},makeEvent:function(a,b){this.captureInfo[b.pointerId]&&(b.relatedTarget=null);var c=new m(a,b);return b.preventDefault&&(c.preventDefault=b.preventDefault),c._target=c._target||b.target,c},fireEvent:function(a,b){var c=this.makeEvent(a,b);return this.dispatchEvent(c)},cloneEvent:function(a){for(var b,c=Object.create(null),d=0;d<q.length;d++)b=q[d],c[b]=a[b]||r[d],!t||"target"!==b&&"relatedTarget"!==b||c[b]instanceof SVGElementInstance&&(c[b]=c[b].correspondingUseElement);return a.preventDefault&&(c.preventDefault=function(){a.preventDefault()}),c},getTarget:function(a){var b=this.captureInfo[a.pointerId];return b?a._target!==b&&a.type in s?void 0:b:a._target},setCapture:function(a,b){this.captureInfo[a]&&this.releaseCapture(a),this.captureInfo[a]=b;var c=document.createEvent("Event");c.initEvent("gotpointercapture",!0,!1),c.pointerId=a,this.implicitRelease=this.releaseCapture.bind(this,a),document.addEventListener("pointerup",this.implicitRelease),document.addEventListener("pointercancel",this.implicitRelease),c._target=b,this.asyncDispatchEvent(c)},releaseCapture:function(a){var b=this.captureInfo[a];if(b){var c=document.createEvent("Event");c.initEvent("lostpointercapture",!0,!1),c.pointerId=a,this.captureInfo[a]=void 0,document.removeEventListener("pointerup",this.implicitRelease),document.removeEventListener("pointercancel",this.implicitRelease),c._target=b,this.asyncDispatchEvent(c)}},dispatchEvent:function(a){var b=this.getTarget(a);return b?b.dispatchEvent(a):void 0},asyncDispatchEvent:function(a){requestAnimationFrame(this.dispatchEvent.bind(this,a))}};u.boundHandler=u.eventHandler.bind(u);var v=u,w={shadow:function(a){return a?a.shadowRoot||a.webkitShadowRoot:void 0},canTarget:function(a){return a&&Boolean(a.elementFromPoint)},targetingShadow:function(a){var b=this.shadow(a);return this.canTarget(b)?b:void 0},olderShadow:function(a){var b=a.olderShadowRoot;if(!b){var c=a.querySelector("shadow");c&&(b=c.olderShadowRoot)}return b},allShadows:function(a){for(var b=[],c=this.shadow(a);c;)b.push(c),c=this.olderShadow(c);return b},searchRoot:function(a,b,c){if(a){var d,e,f=a.elementFromPoint(b,c);for(e=this.targetingShadow(f);e;){if(d=e.elementFromPoint(b,c)){var g=this.targetingShadow(d);return this.searchRoot(g,b,c)||d}e=this.olderShadow(e)}return f}},owner:function(a){for(var b=a;b.parentNode;)b=b.parentNode;return b.nodeType!==Node.DOCUMENT_NODE&&b.nodeType!==Node.DOCUMENT_FRAGMENT_NODE&&(b=document),b},findTarget:function(a){var b=a.clientX,c=a.clientY,d=this.owner(a.target);return d.elementFromPoint(b,c)||(d=document),this.searchRoot(d,b,c)}},x=Array.prototype.forEach.call.bind(Array.prototype.forEach),y=Array.prototype.map.call.bind(Array.prototype.map),z=Array.prototype.slice.call.bind(Array.prototype.slice),A=Array.prototype.filter.call.bind(Array.prototype.filter),B=window.MutationObserver||window.WebKitMutationObserver,C="[touch-action]",D={subtree:!0,childList:!0,attributes:!0,attributeOldValue:!0,attributeFilter:["touch-action"]};c.prototype={watchSubtree:function(a){this.observer&&w.canTarget(a)&&this.observer.observe(a,D)},enableOnSubtree:function(a){this.watchSubtree(a),a===document&&"complete"!==document.readyState?this.installOnLoad():this.installNewSubtree(a)},installNewSubtree:function(a){x(this.findElements(a),this.addElement,this)},findElements:function(a){return a.querySelectorAll?a.querySelectorAll(C):[]},removeElement:function(a){this.removeCallback(a)},addElement:function(a){this.addCallback(a)},elementChanged:function(a,b){this.changedCallback(a,b)},concatLists:function(a,b){return a.concat(z(b))},installOnLoad:function(){document.addEventListener("readystatechange",function(){"complete"===document.readyState&&this.installNewSubtree(document)}.bind(this))},isElement:function(a){return a.nodeType===Node.ELEMENT_NODE},flattenMutationTree:function(a){var b=y(a,this.findElements,this);return b.push(A(a,this.isElement)),b.reduce(this.concatLists,[])},mutationWatcher:function(a){a.forEach(this.mutationHandler,this)},mutationHandler:function(a){if("childList"===a.type){var b=this.flattenMutationTree(a.addedNodes);b.forEach(this.addElement,this);var c=this.flattenMutationTree(a.removedNodes);c.forEach(this.removeElement,this)}else"attributes"===a.type&&this.elementChanged(a.target,a.oldValue)}};var E=c,F=["none","auto","pan-x","pan-y",{rule:"pan-x pan-y",selectors:["pan-x pan-y","pan-y pan-x"]}],G="",H=window.PointerEvent||window.MSPointerEvent,I=!window.ShadowDOMPolyfill&&document.head.createShadowRoot,J=v.pointermap,K=25,L=[1,4,2,8,16],M=!1;try{M=1===new MouseEvent("test",{buttons:1}).buttons}catch(N){}var O,P={POINTER_ID:1,POINTER_TYPE:"mouse",events:["mousedown","mousemove","mouseup","mouseover","mouseout"],register:function(a){v.listen(a,this.events)},unregister:function(a){v.unlisten(a,this.events)},lastTouches:[],isEventSimulatedFromTouch:function(a){for(var b,c=this.lastTouches,d=a.clientX,e=a.clientY,f=0,g=c.length;g>f&&(b=c[f]);f++){var h=Math.abs(d-b.x),i=Math.abs(e-b.y);if(K>=h&&K>=i)return!0}},prepareEvent:function(a){var b=v.cloneEvent(a),c=b.preventDefault;return b.preventDefault=function(){a.preventDefault(),c()},b.pointerId=this.POINTER_ID,b.isPrimary=!0,b.pointerType=this.POINTER_TYPE,b},prepareButtonsForMove:function(a,b){var c=J.get(this.POINTER_ID);a.buttons=c?c.buttons:0,b.buttons=a.buttons},mousedown:function(a){if(!this.isEventSimulatedFromTouch(a)){var b=J.get(this.POINTER_ID),c=this.prepareEvent(a);M||(c.buttons=L[c.button],b&&(c.buttons|=b.buttons),a.buttons=c.buttons),J.set(this.POINTER_ID,a),b?v.move(c):v.down(c)}},mousemove:function(a){if(!this.isEventSimulatedFromTouch(a)){var b=this.prepareEvent(a);M||this.prepareButtonsForMove(b,a),v.move(b)}},mouseup:function(a){if(!this.isEventSimulatedFromTouch(a)){var b=J.get(this.POINTER_ID),c=this.prepareEvent(a);if(!M){var d=L[c.button];c.buttons=b?b.buttons&~d:0,a.buttons=c.buttons}J.set(this.POINTER_ID,a),0===c.buttons||c.buttons===L[c.button]?(this.cleanupMouse(),v.up(c)):v.move(c)}},mouseover:function(a){if(!this.isEventSimulatedFromTouch(a)){var b=this.prepareEvent(a);M||this.prepareButtonsForMove(b,a),v.enterOver(b)}},mouseout:function(a){if(!this.isEventSimulatedFromTouch(a)){var b=this.prepareEvent(a);M||this.prepareButtonsForMove(b,a),v.leaveOut(b)}},cancel:function(a){var b=this.prepareEvent(a);v.cancel(b),this.cleanupMouse()},cleanupMouse:function(){J["delete"](this.POINTER_ID)}},Q=P,R=v.captureInfo,S=w.findTarget.bind(w),T=w.allShadows.bind(w),U=v.pointermap,V=2500,W=200,X="touch-action",Y=!1,Z={events:["touchstart","touchmove","touchend","touchcancel"],register:function(a){Y?v.listen(a,this.events):O.enableOnSubtree(a)},unregister:function(a){Y&&v.unlisten(a,this.events)},elementAdded:function(a){var b=a.getAttribute(X),c=this.touchActionToScrollType(b);c&&(a._scrollType=c,v.listen(a,this.events),T(a).forEach(function(a){a._scrollType=c,v.listen(a,this.events)},this))},elementRemoved:function(a){a._scrollType=void 0,v.unlisten(a,this.events),T(a).forEach(function(a){a._scrollType=void 0,v.unlisten(a,this.events)},this)},elementChanged:function(a,b){var c=a.getAttribute(X),d=this.touchActionToScrollType(c),e=this.touchActionToScrollType(b);d&&e?(a._scrollType=d,T(a).forEach(function(a){a._scrollType=d},this)):e?this.elementRemoved(a):d&&this.elementAdded(a)},scrollTypes:{EMITTER:"none",XSCROLLER:"pan-x",YSCROLLER:"pan-y",SCROLLER:/^(?:pan-x pan-y)|(?:pan-y pan-x)|auto$/},touchActionToScrollType:function(a){var b=a,c=this.scrollTypes;return"none"===b?"none":b===c.XSCROLLER?"X":b===c.YSCROLLER?"Y":c.SCROLLER.exec(b)?"XY":void 0},POINTER_TYPE:"touch",firstTouch:null,isPrimaryTouch:function(a){return this.firstTouch===a.identifier},setPrimaryTouch:function(a){(0===U.size||1===U.size&&U.has(1))&&(this.firstTouch=a.identifier,this.firstXY={X:a.clientX,Y:a.clientY},this.scrolling=!1,this.cancelResetClickCount())},removePrimaryPointer:function(a){a.isPrimary&&(this.firstTouch=null,this.firstXY=null,this.resetClickCount())},clickCount:0,resetId:null,resetClickCount:function(){var a=function(){this.clickCount=0,this.resetId=null}.bind(this);this.resetId=setTimeout(a,W)},cancelResetClickCount:function(){this.resetId&&clearTimeout(this.resetId)},typeToButtons:function(a){var b=0;return("touchstart"===a||"touchmove"===a)&&(b=1),b},touchToPointer:function(a){var b=this.currentTouchEvent,c=v.cloneEvent(a),d=c.pointerId=a.identifier+2;c.target=R[d]||S(c),c.bubbles=!0,c.cancelable=!0,c.detail=this.clickCount,c.button=0,c.buttons=this.typeToButtons(b.type),c.width=a.radiusX||a.webkitRadiusX||0,c.height=a.radiusY||a.webkitRadiusY||0,c.pressure=a.force||a.webkitForce||.5,c.isPrimary=this.isPrimaryTouch(a),c.pointerType=this.POINTER_TYPE;var e=this;return c.preventDefault=function(){e.scrolling=!1,e.firstXY=null,b.preventDefault()},c},processTouches:function(a,b){var c=a.changedTouches;this.currentTouchEvent=a;for(var d,e=0;e<c.length;e++)d=c[e],b.call(this,this.touchToPointer(d))},shouldScroll:function(a){if(this.firstXY){var b,c=a.currentTarget._scrollType;if("none"===c)b=!1;else if("XY"===c)b=!0;else{var d=a.changedTouches[0],e=c,f="Y"===c?"X":"Y",g=Math.abs(d["client"+e]-this.firstXY[e]),h=Math.abs(d["client"+f]-this.firstXY[f]);b=g>=h}return this.firstXY=null,b}},findTouch:function(a,b){for(var c,d=0,e=a.length;e>d&&(c=a[d]);d++)if(c.identifier===b)return!0},vacuumTouches:function(a){var b=a.touches;if(U.size>=b.length){var c=[];U.forEach(function(a,d){if(1!==d&&!this.findTouch(b,d-2)){var e=a.out;c.push(e)}},this),c.forEach(this.cancelOut,this)}},touchstart:function(a){this.vacuumTouches(a),this.setPrimaryTouch(a.changedTouches[0]),this.dedupSynthMouse(a),this.scrolling||(this.clickCount++,this.processTouches(a,this.overDown))},overDown:function(a){U.set(a.pointerId,{target:a.target,out:a,outTarget:a.target}),v.over(a),v.enter(a),v.down(a)},touchmove:function(a){this.scrolling||(this.shouldScroll(a)?(this.scrolling=!0,this.touchcancel(a)):(a.preventDefault(),this.processTouches(a,this.moveOverOut)))},moveOverOut:function(a){var b=a,c=U.get(b.pointerId);if(c){var d=c.out,e=c.outTarget;v.move(b),d&&e!==b.target&&(d.relatedTarget=b.target,b.relatedTarget=e,d.target=e,b.target?(v.leaveOut(d),v.enterOver(b)):(b.target=e,b.relatedTarget=null,this.cancelOut(b))),c.out=b,c.outTarget=b.target}},touchend:function(a){this.dedupSynthMouse(a),this.processTouches(a,this.upOut)},upOut:function(a){this.scrolling||(v.up(a),v.out(a),v.leave(a)),this.cleanUpPointer(a)},touchcancel:function(a){this.processTouches(a,this.cancelOut)},cancelOut:function(a){v.cancel(a),v.out(a),v.leave(a),this.cleanUpPointer(a)},cleanUpPointer:function(a){U["delete"](a.pointerId),this.removePrimaryPointer(a)},dedupSynthMouse:function(a){var b=Q.lastTouches,c=a.changedTouches[0];if(this.isPrimaryTouch(c)){var d={x:c.clientX,y:c.clientY};b.push(d);var e=function(a,b){var c=a.indexOf(b);c>-1&&a.splice(c,1)}.bind(null,b,d);setTimeout(e,V)}}};Y||(O=new E(Z.elementAdded,Z.elementRemoved,Z.elementChanged,Z));var $,_,aa=Z,ba=v.pointermap,ca=window.MSPointerEvent&&"number"==typeof window.MSPointerEvent.MSPOINTER_TYPE_MOUSE,da={events:["MSPointerDown","MSPointerMove","MSPointerUp","MSPointerOut","MSPointerOver","MSPointerCancel","MSGotPointerCapture","MSLostPointerCapture"],register:function(a){v.listen(a,this.events)},unregister:function(a){v.unlisten(a,this.events)},POINTER_TYPES:["","unavailable","touch","pen","mouse"],prepareEvent:function(a){var b=a;return ca&&(b=v.cloneEvent(a),b.pointerType=this.POINTER_TYPES[a.pointerType]),b},cleanup:function(a){ba["delete"](a)},MSPointerDown:function(a){ba.set(a.pointerId,a);var b=this.prepareEvent(a);v.down(b)},MSPointerMove:function(a){var b=this.prepareEvent(a);v.move(b)},MSPointerUp:function(a){var b=this.prepareEvent(a);v.up(b),this.cleanup(a.pointerId)},MSPointerOut:function(a){var b=this.prepareEvent(a);v.leaveOut(b)},MSPointerOver:function(a){var b=this.prepareEvent(a);v.enterOver(b)},MSPointerCancel:function(a){var b=this.prepareEvent(a);v.cancel(b),this.cleanup(a.pointerId)},MSLostPointerCapture:function(a){var b=v.makeEvent("lostpointercapture",a);v.dispatchEvent(b)},MSGotPointerCapture:function(a){var b=v.makeEvent("gotpointercapture",a);v.dispatchEvent(b)}},ea=da,fa=window.navigator;fa.msPointerEnabled?($=function(a){i(a),this.msSetPointerCapture(a)},_=function(a){i(a),this.msReleasePointerCapture(a)}):($=function(a){i(a),v.setCapture(a,this)},_=function(a){i(a),v.releaseCapture(a,this)}),g(),h(),j();var ga={dispatcher:v,Installer:E,PointerEvent:m,PointerMap:p,targetFinding:w};return ga});
/*!
    localForage -- Offline Storage, Improved
    Version 1.3.1
    https://mozilla.github.io/localForage
    (c) 2013-2015 Mozilla, Apache License 2.0
*/
!function(a,b){"object"==typeof exports&&"object"==typeof module?module.exports=b():"function"==typeof define&&define.amd?define([],b):"object"==typeof exports?exports.localforage=b():a.localforage=b()}(this,function(){return function(a){function b(d){if(c[d])return c[d].exports;var e=c[d]={exports:{},id:d,loaded:!1};return a[d].call(e.exports,e,e.exports,b),e.loaded=!0,e.exports}var c={};return b.m=a,b.c=c,b.p="",b(0)}([function(a,b,c){"use strict";function d(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}b.__esModule=!0,function(){function a(a,b){a[b]=function(){var c=arguments;return a.ready().then(function(){return a[b].apply(a,c)})}}function e(){for(var a=1;a<arguments.length;a++){var b=arguments[a];if(b)for(var c in b)b.hasOwnProperty(c)&&(m(b[c])?arguments[0][c]=b[c].slice():arguments[0][c]=b[c])}return arguments[0]}function f(a){for(var b in h)if(h.hasOwnProperty(b)&&h[b]===a)return!0;return!1}var g={},h={INDEXEDDB:"asyncStorage",LOCALSTORAGE:"localStorageWrapper",WEBSQL:"webSQLStorage"},i=[h.INDEXEDDB,h.WEBSQL,h.LOCALSTORAGE],j=["clear","getItem","iterate","key","keys","length","removeItem","setItem"],k={description:"",driver:i.slice(),name:"localforage",size:4980736,storeName:"keyvaluepairs",version:1},l=function(a){var b=b||a.indexedDB||a.webkitIndexedDB||a.mozIndexedDB||a.OIndexedDB||a.msIndexedDB,c={};return c[h.WEBSQL]=!!a.openDatabase,c[h.INDEXEDDB]=!!function(){if("undefined"!=typeof a.openDatabase&&a.navigator&&a.navigator.userAgent&&/Safari/.test(a.navigator.userAgent)&&!/Chrome/.test(a.navigator.userAgent))return!1;try{return b&&"function"==typeof b.open&&"undefined"!=typeof a.IDBKeyRange}catch(c){return!1}}(),c[h.LOCALSTORAGE]=!!function(){try{return a.localStorage&&"setItem"in a.localStorage&&a.localStorage.setItem}catch(b){return!1}}(),c}(this),m=Array.isArray||function(a){return"[object Array]"===Object.prototype.toString.call(a)},n=function(){function b(a){d(this,b),this.INDEXEDDB=h.INDEXEDDB,this.LOCALSTORAGE=h.LOCALSTORAGE,this.WEBSQL=h.WEBSQL,this._defaultConfig=e({},k),this._config=e({},this._defaultConfig,a),this._driverSet=null,this._initDriver=null,this._ready=!1,this._dbInfo=null,this._wrapLibraryMethodsWithReady(),this.setDriver(this._config.driver)}return b.prototype.config=function(a){if("object"==typeof a){if(this._ready)return new Error("Can't call config() after localforage has been used.");for(var b in a)"storeName"===b&&(a[b]=a[b].replace(/\W/g,"_")),this._config[b]=a[b];return"driver"in a&&a.driver&&this.setDriver(this._config.driver),!0}return"string"==typeof a?this._config[a]:this._config},b.prototype.defineDriver=function(a,b,c){var d=new Promise(function(b,c){try{var d=a._driver,e=new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver"),h=new Error("Custom driver name already in use: "+a._driver);if(!a._driver)return void c(e);if(f(a._driver))return void c(h);for(var i=j.concat("_initStorage"),k=0;k<i.length;k++){var m=i[k];if(!m||!a[m]||"function"!=typeof a[m])return void c(e)}var n=Promise.resolve(!0);"_support"in a&&(n=a._support&&"function"==typeof a._support?a._support():Promise.resolve(!!a._support)),n.then(function(c){l[d]=c,g[d]=a,b()},c)}catch(o){c(o)}});return d.then(b,c),d},b.prototype.driver=function(){return this._driver||null},b.prototype.getDriver=function(a,b,d){var e=this,h=function(){if(f(a))switch(a){case e.INDEXEDDB:return new Promise(function(a,b){a(c(1))});case e.LOCALSTORAGE:return new Promise(function(a,b){a(c(2))});case e.WEBSQL:return new Promise(function(a,b){a(c(4))})}else if(g[a])return Promise.resolve(g[a]);return Promise.reject(new Error("Driver not found."))}();return h.then(b,d),h},b.prototype.getSerializer=function(a){var b=new Promise(function(a,b){a(c(3))});return a&&"function"==typeof a&&b.then(function(b){a(b)}),b},b.prototype.ready=function(a){var b=this,c=b._driverSet.then(function(){return null===b._ready&&(b._ready=b._initDriver()),b._ready});return c.then(a,a),c},b.prototype.setDriver=function(a,b,c){function d(){f._config.driver=f.driver()}function e(a){return function(){function b(){for(;c<a.length;){var e=a[c];return c++,f._dbInfo=null,f._ready=null,f.getDriver(e).then(function(a){return f._extend(a),d(),f._ready=f._initStorage(f._config),f._ready})["catch"](b)}d();var g=new Error("No available storage method found.");return f._driverSet=Promise.reject(g),f._driverSet}var c=0;return b()}}var f=this;m(a)||(a=[a]);var g=this._getSupportedDrivers(a),h=null!==this._driverSet?this._driverSet["catch"](function(){return Promise.resolve()}):Promise.resolve();return this._driverSet=h.then(function(){var a=g[0];return f._dbInfo=null,f._ready=null,f.getDriver(a).then(function(a){f._driver=a._driver,d(),f._wrapLibraryMethodsWithReady(),f._initDriver=e(g)})})["catch"](function(){d();var a=new Error("No available storage method found.");return f._driverSet=Promise.reject(a),f._driverSet}),this._driverSet.then(b,c),this._driverSet},b.prototype.supports=function(a){return!!l[a]},b.prototype._extend=function(a){e(this,a)},b.prototype._getSupportedDrivers=function(a){for(var b=[],c=0,d=a.length;d>c;c++){var e=a[c];this.supports(e)&&b.push(e)}return b},b.prototype._wrapLibraryMethodsWithReady=function(){for(var b=0;b<j.length;b++)a(this,j[b])},b.prototype.createInstance=function(a){return new b(a)},b}(),o=new n;b["default"]=o}.call("undefined"!=typeof window?window:self),a.exports=b["default"]},function(a,b){"use strict";b.__esModule=!0,function(){function a(a,b){a=a||[],b=b||{};try{return new Blob(a,b)}catch(c){if("TypeError"!==c.name)throw c;for(var d=x.BlobBuilder||x.MSBlobBuilder||x.MozBlobBuilder||x.WebKitBlobBuilder,e=new d,f=0;f<a.length;f+=1)e.append(a[f]);return e.getBlob(b.type)}}function c(a){for(var b=a.length,c=new ArrayBuffer(b),d=new Uint8Array(c),e=0;b>e;e++)d[e]=a.charCodeAt(e);return c}function d(a){return new Promise(function(b,c){var d=new XMLHttpRequest;d.open("GET",a),d.withCredentials=!0,d.responseType="arraybuffer",d.onreadystatechange=function(){return 4===d.readyState?200===d.status?b({response:d.response,type:d.getResponseHeader("Content-Type")}):void c({status:d.status,response:d.response}):void 0},d.send()})}function e(b){return new Promise(function(c,e){var f=a([""],{type:"image/png"}),g=b.transaction([B],"readwrite");g.objectStore(B).put(f,"key"),g.oncomplete=function(){var a=b.transaction([B],"readwrite"),f=a.objectStore(B).get("key");f.onerror=e,f.onsuccess=function(a){var b=a.target.result,e=URL.createObjectURL(b);d(e).then(function(a){c(!(!a||"image/png"!==a.type))},function(){c(!1)}).then(function(){URL.revokeObjectURL(e)})}}})["catch"](function(){return!1})}function f(a){return"boolean"==typeof z?Promise.resolve(z):e(a).then(function(a){return z=a})}function g(a){return new Promise(function(b,c){var d=new FileReader;d.onerror=c,d.onloadend=function(c){var d=btoa(c.target.result||"");b({__local_forage_encoded_blob:!0,data:d,type:a.type})},d.readAsBinaryString(a)})}function h(b){var d=c(atob(b.data));return a([d],{type:b.type})}function i(a){return a&&a.__local_forage_encoded_blob}function j(a){function b(){return Promise.resolve()}var c=this,d={db:null};if(a)for(var e in a)d[e]=a[e];A||(A={});var f=A[d.name];f||(f={forages:[],db:null},A[d.name]=f),f.forages.push(this);for(var g=[],h=0;h<f.forages.length;h++){var i=f.forages[h];i!==this&&g.push(i.ready()["catch"](b))}var j=f.forages.slice(0);return Promise.all(g).then(function(){return d.db=f.db,k(d)}).then(function(a){return d.db=a,n(d,c._defaultConfig.version)?l(d):a}).then(function(a){d.db=f.db=a,c._dbInfo=d;for(var b=0;b<j.length;b++){var e=j[b];e!==c&&(e._dbInfo.db=d.db,e._dbInfo.version=d.version)}})}function k(a){return m(a,!1)}function l(a){return m(a,!0)}function m(a,b){return new Promise(function(c,d){if(a.db){if(!b)return c(a.db);a.db.close()}var e=[a.name];b&&e.push(a.version);var f=y.open.apply(y,e);b&&(f.onupgradeneeded=function(b){var c=f.result;try{c.createObjectStore(a.storeName),b.oldVersion<=1&&c.createObjectStore(B)}catch(d){if("ConstraintError"!==d.name)throw d;x.console.warn('The database "'+a.name+'" has been upgraded from version '+b.oldVersion+" to version "+b.newVersion+', but the storage "'+a.storeName+'" already exists.')}}),f.onerror=function(){d(f.error)},f.onsuccess=function(){c(f.result)}})}function n(a,b){if(!a.db)return!0;var c=!a.db.objectStoreNames.contains(a.storeName),d=a.version<a.db.version,e=a.version>a.db.version;if(d&&(a.version!==b&&x.console.warn('The database "'+a.name+"\" can't be downgraded from version "+a.db.version+" to version "+a.version+"."),a.version=a.db.version),e||c){if(c){var f=a.db.version+1;f>a.version&&(a.version=f)}return!0}return!1}function o(a,b){var c=this;"string"!=typeof a&&(x.console.warn(a+" used as a key, but it is not a string."),a=String(a));var d=new Promise(function(b,d){c.ready().then(function(){var e=c._dbInfo,f=e.db.transaction(e.storeName,"readonly").objectStore(e.storeName),g=f.get(a);g.onsuccess=function(){var a=g.result;void 0===a&&(a=null),i(a)&&(a=h(a)),b(a)},g.onerror=function(){d(g.error)}})["catch"](d)});return w(d,b),d}function p(a,b){var c=this,d=new Promise(function(b,d){c.ready().then(function(){var e=c._dbInfo,f=e.db.transaction(e.storeName,"readonly").objectStore(e.storeName),g=f.openCursor(),j=1;g.onsuccess=function(){var c=g.result;if(c){var d=c.value;i(d)&&(d=h(d));var e=a(d,c.key,j++);void 0!==e?b(e):c["continue"]()}else b()},g.onerror=function(){d(g.error)}})["catch"](d)});return w(d,b),d}function q(a,b,c){var d=this;"string"!=typeof a&&(x.console.warn(a+" used as a key, but it is not a string."),a=String(a));var e=new Promise(function(c,e){var h;d.ready().then(function(){return h=d._dbInfo,b instanceof Blob?f(h.db).then(function(a){return a?b:g(b)}):b}).then(function(b){var d=h.db.transaction(h.storeName,"readwrite"),f=d.objectStore(h.storeName);null===b&&(b=void 0);var g=f.put(b,a);d.oncomplete=function(){void 0===b&&(b=null),c(b)},d.onabort=d.onerror=function(){var a=g.error?g.error:g.transaction.error;e(a)}})["catch"](e)});return w(e,c),e}function r(a,b){var c=this;"string"!=typeof a&&(x.console.warn(a+" used as a key, but it is not a string."),a=String(a));var d=new Promise(function(b,d){c.ready().then(function(){var e=c._dbInfo,f=e.db.transaction(e.storeName,"readwrite"),g=f.objectStore(e.storeName),h=g["delete"](a);f.oncomplete=function(){b()},f.onerror=function(){d(h.error)},f.onabort=function(){var a=h.error?h.error:h.transaction.error;d(a)}})["catch"](d)});return w(d,b),d}function s(a){var b=this,c=new Promise(function(a,c){b.ready().then(function(){var d=b._dbInfo,e=d.db.transaction(d.storeName,"readwrite"),f=e.objectStore(d.storeName),g=f.clear();e.oncomplete=function(){a()},e.onabort=e.onerror=function(){var a=g.error?g.error:g.transaction.error;c(a)}})["catch"](c)});return w(c,a),c}function t(a){var b=this,c=new Promise(function(a,c){b.ready().then(function(){var d=b._dbInfo,e=d.db.transaction(d.storeName,"readonly").objectStore(d.storeName),f=e.count();f.onsuccess=function(){a(f.result)},f.onerror=function(){c(f.error)}})["catch"](c)});return w(c,a),c}function u(a,b){var c=this,d=new Promise(function(b,d){return 0>a?void b(null):void c.ready().then(function(){var e=c._dbInfo,f=e.db.transaction(e.storeName,"readonly").objectStore(e.storeName),g=!1,h=f.openCursor();h.onsuccess=function(){var c=h.result;return c?void(0===a?b(c.key):g?b(c.key):(g=!0,c.advance(a))):void b(null)},h.onerror=function(){d(h.error)}})["catch"](d)});return w(d,b),d}function v(a){var b=this,c=new Promise(function(a,c){b.ready().then(function(){var d=b._dbInfo,e=d.db.transaction(d.storeName,"readonly").objectStore(d.storeName),f=e.openCursor(),g=[];f.onsuccess=function(){var b=f.result;return b?(g.push(b.key),void b["continue"]()):void a(g)},f.onerror=function(){c(f.error)}})["catch"](c)});return w(c,a),c}function w(a,b){b&&a.then(function(a){b(null,a)},function(a){b(a)})}var x=this,y=y||this.indexedDB||this.webkitIndexedDB||this.mozIndexedDB||this.OIndexedDB||this.msIndexedDB;if(y){var z,A,B="local-forage-detect-blob-support",C={_driver:"asyncStorage",_initStorage:j,iterate:p,getItem:o,setItem:q,removeItem:r,clear:s,length:t,key:u,keys:v};b["default"]=C}}.call("undefined"!=typeof window?window:self),a.exports=b["default"]},function(a,b,c){"use strict";b.__esModule=!0,function(){function a(a){var b=this,d={};if(a)for(var e in a)d[e]=a[e];return d.keyPrefix=d.name+"/",d.storeName!==b._defaultConfig.storeName&&(d.keyPrefix+=d.storeName+"/"),b._dbInfo=d,new Promise(function(a,b){a(c(3))}).then(function(a){return d.serializer=a,Promise.resolve()})}function d(a){var b=this,c=b.ready().then(function(){for(var a=b._dbInfo.keyPrefix,c=n.length-1;c>=0;c--){var d=n.key(c);0===d.indexOf(a)&&n.removeItem(d)}});return l(c,a),c}function e(a,b){var c=this;"string"!=typeof a&&(m.console.warn(a+" used as a key, but it is not a string."),a=String(a));var d=c.ready().then(function(){var b=c._dbInfo,d=n.getItem(b.keyPrefix+a);return d&&(d=b.serializer.deserialize(d)),d});return l(d,b),d}function f(a,b){var c=this,d=c.ready().then(function(){for(var b=c._dbInfo,d=b.keyPrefix,e=d.length,f=n.length,g=1,h=0;f>h;h++){var i=n.key(h);if(0===i.indexOf(d)){var j=n.getItem(i);if(j&&(j=b.serializer.deserialize(j)),j=a(j,i.substring(e),g++),void 0!==j)return j}}});return l(d,b),d}function g(a,b){var c=this,d=c.ready().then(function(){var b,d=c._dbInfo;try{b=n.key(a)}catch(e){b=null}return b&&(b=b.substring(d.keyPrefix.length)),b});return l(d,b),d}function h(a){var b=this,c=b.ready().then(function(){for(var a=b._dbInfo,c=n.length,d=[],e=0;c>e;e++)0===n.key(e).indexOf(a.keyPrefix)&&d.push(n.key(e).substring(a.keyPrefix.length));return d});return l(c,a),c}function i(a){var b=this,c=b.keys().then(function(a){return a.length});return l(c,a),c}function j(a,b){var c=this;"string"!=typeof a&&(m.console.warn(a+" used as a key, but it is not a string."),a=String(a));var d=c.ready().then(function(){var b=c._dbInfo;n.removeItem(b.keyPrefix+a)});return l(d,b),d}function k(a,b,c){var d=this;"string"!=typeof a&&(m.console.warn(a+" used as a key, but it is not a string."),a=String(a));var e=d.ready().then(function(){void 0===b&&(b=null);var c=b;return new Promise(function(e,f){var g=d._dbInfo;g.serializer.serialize(b,function(b,d){if(d)f(d);else try{n.setItem(g.keyPrefix+a,b),e(c)}catch(h){("QuotaExceededError"===h.name||"NS_ERROR_DOM_QUOTA_REACHED"===h.name)&&f(h),f(h)}})})});return l(e,c),e}function l(a,b){b&&a.then(function(a){b(null,a)},function(a){b(a)})}var m=this,n=null;try{if(!(this.localStorage&&"setItem"in this.localStorage))return;n=this.localStorage}catch(o){return}var p={_driver:"localStorageWrapper",_initStorage:a,iterate:f,getItem:e,setItem:k,removeItem:j,clear:d,length:i,key:g,keys:h};b["default"]=p}.call("undefined"!=typeof window?window:self),a.exports=b["default"]},function(a,b){"use strict";b.__esModule=!0,function(){function a(a,b){a=a||[],b=b||{};try{return new Blob(a,b)}catch(c){if("TypeError"!==c.name)throw c;for(var d=x.BlobBuilder||x.MSBlobBuilder||x.MozBlobBuilder||x.WebKitBlobBuilder,e=new d,f=0;f<a.length;f+=1)e.append(a[f]);return e.getBlob(b.type)}}function c(a,b){var c="";if(a&&(c=a.toString()),a&&("[object ArrayBuffer]"===a.toString()||a.buffer&&"[object ArrayBuffer]"===a.buffer.toString())){var d,e=j;a instanceof ArrayBuffer?(d=a,e+=l):(d=a.buffer,"[object Int8Array]"===c?e+=n:"[object Uint8Array]"===c?e+=o:"[object Uint8ClampedArray]"===c?e+=p:"[object Int16Array]"===c?e+=q:"[object Uint16Array]"===c?e+=s:"[object Int32Array]"===c?e+=r:"[object Uint32Array]"===c?e+=t:"[object Float32Array]"===c?e+=u:"[object Float64Array]"===c?e+=v:b(new Error("Failed to get type for BinaryArray"))),b(e+f(d))}else if("[object Blob]"===c){var g=new FileReader;g.onload=function(){var c=h+a.type+"~"+f(this.result);b(j+m+c)},g.readAsArrayBuffer(a)}else try{b(JSON.stringify(a))}catch(i){console.error("Couldn't convert value into a JSON string: ",a),b(null,i)}}function d(b){if(b.substring(0,k)!==j)return JSON.parse(b);var c,d=b.substring(w),f=b.substring(k,w);if(f===m&&i.test(d)){var g=d.match(i);c=g[1],d=d.substring(g[0].length)}var h=e(d);switch(f){case l:return h;case m:return a([h],{type:c});case n:return new Int8Array(h);case o:return new Uint8Array(h);case p:return new Uint8ClampedArray(h);case q:return new Int16Array(h);case s:return new Uint16Array(h);case r:return new Int32Array(h);case t:return new Uint32Array(h);case u:return new Float32Array(h);case v:return new Float64Array(h);default:throw new Error("Unkown type: "+f)}}function e(a){var b,c,d,e,f,h=.75*a.length,i=a.length,j=0;"="===a[a.length-1]&&(h--,"="===a[a.length-2]&&h--);var k=new ArrayBuffer(h),l=new Uint8Array(k);for(b=0;i>b;b+=4)c=g.indexOf(a[b]),d=g.indexOf(a[b+1]),e=g.indexOf(a[b+2]),f=g.indexOf(a[b+3]),l[j++]=c<<2|d>>4,l[j++]=(15&d)<<4|e>>2,l[j++]=(3&e)<<6|63&f;return k}function f(a){var b,c=new Uint8Array(a),d="";for(b=0;b<c.length;b+=3)d+=g[c[b]>>2],d+=g[(3&c[b])<<4|c[b+1]>>4],d+=g[(15&c[b+1])<<2|c[b+2]>>6],d+=g[63&c[b+2]];return c.length%3===2?d=d.substring(0,d.length-1)+"=":c.length%3===1&&(d=d.substring(0,d.length-2)+"=="),d}var g="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",h="~~local_forage_type~",i=/^~~local_forage_type~([^~]+)~/,j="__lfsc__:",k=j.length,l="arbf",m="blob",n="si08",o="ui08",p="uic8",q="si16",r="si32",s="ur16",t="ui32",u="fl32",v="fl64",w=k+l.length,x=this,y={serialize:c,deserialize:d,stringToBuffer:e,bufferToString:f};b["default"]=y}.call("undefined"!=typeof window?window:self),a.exports=b["default"]},function(a,b,c){"use strict";b.__esModule=!0,function(){function a(a){var b=this,d={db:null};if(a)for(var e in a)d[e]="string"!=typeof a[e]?a[e].toString():a[e];var f=new Promise(function(c,e){try{d.db=n(d.name,String(d.version),d.description,d.size)}catch(f){return b.setDriver(b.LOCALSTORAGE).then(function(){return b._initStorage(a)}).then(c)["catch"](e)}d.db.transaction(function(a){a.executeSql("CREATE TABLE IF NOT EXISTS "+d.storeName+" (id INTEGER PRIMARY KEY, key unique, value)",[],function(){b._dbInfo=d,c()},function(a,b){e(b)})})});return new Promise(function(a,b){a(c(3))}).then(function(a){return d.serializer=a,f})}function d(a,b){var c=this;"string"!=typeof a&&(m.console.warn(a+" used as a key, but it is not a string."),a=String(a));var d=new Promise(function(b,d){c.ready().then(function(){var e=c._dbInfo;e.db.transaction(function(c){c.executeSql("SELECT * FROM "+e.storeName+" WHERE key = ? LIMIT 1",[a],function(a,c){var d=c.rows.length?c.rows.item(0).value:null;d&&(d=e.serializer.deserialize(d)),b(d)},function(a,b){d(b)})})})["catch"](d)});return l(d,b),d}function e(a,b){var c=this,d=new Promise(function(b,d){c.ready().then(function(){var e=c._dbInfo;e.db.transaction(function(c){c.executeSql("SELECT * FROM "+e.storeName,[],function(c,d){for(var f=d.rows,g=f.length,h=0;g>h;h++){var i=f.item(h),j=i.value;if(j&&(j=e.serializer.deserialize(j)),j=a(j,i.key,h+1),void 0!==j)return void b(j)}b()},function(a,b){d(b)})})})["catch"](d)});return l(d,b),d}function f(a,b,c){var d=this;"string"!=typeof a&&(m.console.warn(a+" used as a key, but it is not a string."),a=String(a));var e=new Promise(function(c,e){d.ready().then(function(){void 0===b&&(b=null);var f=b,g=d._dbInfo;g.serializer.serialize(b,function(b,d){d?e(d):g.db.transaction(function(d){d.executeSql("INSERT OR REPLACE INTO "+g.storeName+" (key, value) VALUES (?, ?)",[a,b],function(){c(f)},function(a,b){e(b)})},function(a){a.code===a.QUOTA_ERR&&e(a)})})})["catch"](e)});return l(e,c),e}function g(a,b){var c=this;"string"!=typeof a&&(m.console.warn(a+" used as a key, but it is not a string."),a=String(a));var d=new Promise(function(b,d){c.ready().then(function(){var e=c._dbInfo;e.db.transaction(function(c){c.executeSql("DELETE FROM "+e.storeName+" WHERE key = ?",[a],function(){b()},function(a,b){d(b)})})})["catch"](d)});return l(d,b),d}function h(a){var b=this,c=new Promise(function(a,c){b.ready().then(function(){var d=b._dbInfo;d.db.transaction(function(b){b.executeSql("DELETE FROM "+d.storeName,[],function(){a()},function(a,b){c(b)})})})["catch"](c)});return l(c,a),c}function i(a){var b=this,c=new Promise(function(a,c){b.ready().then(function(){var d=b._dbInfo;d.db.transaction(function(b){b.executeSql("SELECT COUNT(key) as c FROM "+d.storeName,[],function(b,c){var d=c.rows.item(0).c;a(d)},function(a,b){c(b)})})})["catch"](c)});return l(c,a),c}function j(a,b){var c=this,d=new Promise(function(b,d){c.ready().then(function(){var e=c._dbInfo;e.db.transaction(function(c){c.executeSql("SELECT key FROM "+e.storeName+" WHERE id = ? LIMIT 1",[a+1],function(a,c){var d=c.rows.length?c.rows.item(0).key:null;b(d)},function(a,b){d(b)})})})["catch"](d)});return l(d,b),d}function k(a){var b=this,c=new Promise(function(a,c){b.ready().then(function(){var d=b._dbInfo;d.db.transaction(function(b){b.executeSql("SELECT key FROM "+d.storeName,[],function(b,c){for(var d=[],e=0;e<c.rows.length;e++)d.push(c.rows.item(e).key);a(d)},function(a,b){c(b)})})})["catch"](c)});return l(c,a),c}function l(a,b){b&&a.then(function(a){b(null,a)},function(a){b(a)})}var m=this,n=this.openDatabase;if(n){var o={_driver:"webSQLStorage",_initStorage:a,iterate:e,getItem:d,setItem:f,removeItem:g,clear:h,length:i,key:j,keys:k};b["default"]=o}}.call("undefined"!=typeof window?window:self),a.exports=b["default"]}])});