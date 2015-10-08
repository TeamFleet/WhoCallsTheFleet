"use strict";

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


// Released under MIT license
// Copyright (c) 2009-2010 Dominic Baggott
// Copyright (c) 2009-2010 Ash Berlin
// Copyright (c) 2011 Christoph Dorn <christoph@christophdorn.com> (http://www.christophdorn.com)

/*jshint browser:true, devel:true */

(function( expose ) {

/**
 *  class Markdown
 *
 *  Markdown processing in Javascript done right. We have very particular views
 *  on what constitutes 'right' which include:
 *
 *  - produces well-formed HTML (this means that em and strong nesting is
 *    important)
 *
 *  - has an intermediate representation to allow processing of parsed data (We
 *    in fact have two, both as [JsonML]: a markdown tree and an HTML tree).
 *
 *  - is easily extensible to add new dialects without having to rewrite the
 *    entire parsing mechanics
 *
 *  - has a good test suite
 *
 *  This implementation fulfills all of these (except that the test suite could
 *  do with expanding to automatically run all the fixtures from other Markdown
 *  implementations.)
 *
 *  ##### Intermediate Representation
 *
 *  *TODO* Talk about this :) Its JsonML, but document the node names we use.
 *
 *  [JsonML]: http://jsonml.org/ "JSON Markup Language"
 **/
var Markdown = expose.Markdown = function(dialect) {
  switch (typeof dialect) {
    case "undefined":
      this.dialect = Markdown.dialects.Gruber;
      break;
    case "object":
      this.dialect = dialect;
      break;
    default:
      if ( dialect in Markdown.dialects ) {
        this.dialect = Markdown.dialects[dialect];
      }
      else {
        throw new Error("Unknown Markdown dialect '" + String(dialect) + "'");
      }
      break;
  }
  this.em_state = [];
  this.strong_state = [];
  this.debug_indent = "";
};

/**
 *  parse( markdown, [dialect] ) -> JsonML
 *  - markdown (String): markdown string to parse
 *  - dialect (String | Dialect): the dialect to use, defaults to gruber
 *
 *  Parse `markdown` and return a markdown document as a Markdown.JsonML tree.
 **/
expose.parse = function( source, dialect ) {
  // dialect will default if undefined
  var md = new Markdown( dialect );
  return md.toTree( source );
};

/**
 *  toHTML( markdown, [dialect]  ) -> String
 *  toHTML( md_tree ) -> String
 *  - markdown (String): markdown string to parse
 *  - md_tree (Markdown.JsonML): parsed markdown tree
 *
 *  Take markdown (either as a string or as a JsonML tree) and run it through
 *  [[toHTMLTree]] then turn it into a well-formated HTML fragment.
 **/
expose.toHTML = function toHTML( source , dialect , options ) {
  var input = expose.toHTMLTree( source , dialect , options );

  return expose.renderJsonML( input );
};

/**
 *  toHTMLTree( markdown, [dialect] ) -> JsonML
 *  toHTMLTree( md_tree ) -> JsonML
 *  - markdown (String): markdown string to parse
 *  - dialect (String | Dialect): the dialect to use, defaults to gruber
 *  - md_tree (Markdown.JsonML): parsed markdown tree
 *
 *  Turn markdown into HTML, represented as a JsonML tree. If a string is given
 *  to this function, it is first parsed into a markdown tree by calling
 *  [[parse]].
 **/
expose.toHTMLTree = function toHTMLTree( input, dialect , options ) {
  // convert string input to an MD tree
  if ( typeof input ==="string" ) input = this.parse( input, dialect );

  // Now convert the MD tree to an HTML tree

  // remove references from the tree
  var attrs = extract_attr( input ),
      refs = {};

  if ( attrs && attrs.references ) {
    refs = attrs.references;
  }

  var html = convert_tree_to_html( input, refs , options );
  merge_text_nodes( html );
  return html;
};

// For Spidermonkey based engines
function mk_block_toSource() {
  return "Markdown.mk_block( " +
          uneval(this.toString()) +
          ", " +
          uneval(this.trailing) +
          ", " +
          uneval(this.lineNumber) +
          " )";
}

// node
function mk_block_inspect() {
  var util = require("util");
  return "Markdown.mk_block( " +
          util.inspect(this.toString()) +
          ", " +
          util.inspect(this.trailing) +
          ", " +
          util.inspect(this.lineNumber) +
          " )";

}

var mk_block = Markdown.mk_block = function(block, trail, line) {
  // Be helpful for default case in tests.
  if ( arguments.length == 1 ) trail = "\n\n";

  var s = new String(block);
  s.trailing = trail;
  // To make it clear its not just a string
  s.inspect = mk_block_inspect;
  s.toSource = mk_block_toSource;

  if ( line != undefined )
    s.lineNumber = line;

  return s;
};

function count_lines( str ) {
  var n = 0, i = -1;
  while ( ( i = str.indexOf("\n", i + 1) ) !== -1 ) n++;
  return n;
}

// Internal - split source into rough blocks
Markdown.prototype.split_blocks = function splitBlocks( input, startLine ) {
  input = input.replace(/(\r\n|\n|\r)/g, "\n");
  // [\s\S] matches _anything_ (newline or space)
  // [^] is equivalent but doesn't work in IEs.
  var re = /([\s\S]+?)($|\n#|\n(?:\s*\n|$)+)/g,
      blocks = [],
      m;

  var line_no = 1;

  if ( ( m = /^(\s*\n)/.exec(input) ) != null ) {
    // skip (but count) leading blank lines
    line_no += count_lines( m[0] );
    re.lastIndex = m[0].length;
  }

  while ( ( m = re.exec(input) ) !== null ) {
    if (m[2] == "\n#") {
      m[2] = "\n";
      re.lastIndex--;
    }
    blocks.push( mk_block( m[1], m[2], line_no ) );
    line_no += count_lines( m[0] );
  }

  return blocks;
};

/**
 *  Markdown#processBlock( block, next ) -> undefined | [ JsonML, ... ]
 *  - block (String): the block to process
 *  - next (Array): the following blocks
 *
 * Process `block` and return an array of JsonML nodes representing `block`.
 *
 * It does this by asking each block level function in the dialect to process
 * the block until one can. Succesful handling is indicated by returning an
 * array (with zero or more JsonML nodes), failure by a false value.
 *
 * Blocks handlers are responsible for calling [[Markdown#processInline]]
 * themselves as appropriate.
 *
 * If the blocks were split incorrectly or adjacent blocks need collapsing you
 * can adjust `next` in place using shift/splice etc.
 *
 * If any of this default behaviour is not right for the dialect, you can
 * define a `__call__` method on the dialect that will get invoked to handle
 * the block processing.
 */
Markdown.prototype.processBlock = function processBlock( block, next ) {
  var cbs = this.dialect.block,
      ord = cbs.__order__;

  if ( "__call__" in cbs ) {
    return cbs.__call__.call(this, block, next);
  }

  for ( var i = 0; i < ord.length; i++ ) {
    //D:this.debug( "Testing", ord[i] );
    var res = cbs[ ord[i] ].call( this, block, next );
    if ( res ) {
      //D:this.debug("  matched");
      if ( !isArray(res) || ( res.length > 0 && !( isArray(res[0]) ) ) )
        this.debug(ord[i], "didn't return a proper array");
      //D:this.debug( "" );
      return res;
    }
  }

  // Uhoh! no match! Should we throw an error?
  return [];
};

Markdown.prototype.processInline = function processInline( block ) {
  return this.dialect.inline.__call__.call( this, String( block ) );
};

/**
 *  Markdown#toTree( source ) -> JsonML
 *  - source (String): markdown source to parse
 *
 *  Parse `source` into a JsonML tree representing the markdown document.
 **/
// custom_tree means set this.tree to `custom_tree` and restore old value on return
Markdown.prototype.toTree = function toTree( source, custom_root ) {
  var blocks = source instanceof Array ? source : this.split_blocks( source );

  // Make tree a member variable so its easier to mess with in extensions
  var old_tree = this.tree;
  try {
    this.tree = custom_root || this.tree || [ "markdown" ];

    blocks:
    while ( blocks.length ) {
      var b = this.processBlock( blocks.shift(), blocks );

      // Reference blocks and the like won't return any content
      if ( !b.length ) continue blocks;

      this.tree.push.apply( this.tree, b );
    }
    return this.tree;
  }
  finally {
    if ( custom_root ) {
      this.tree = old_tree;
    }
  }
};

// Noop by default
Markdown.prototype.debug = function () {
  var args = Array.prototype.slice.call( arguments);
  args.unshift(this.debug_indent);
  if ( typeof print !== "undefined" )
      print.apply( print, args );
  if ( typeof console !== "undefined" && typeof console.log !== "undefined" )
      console.log.apply( null, args );
}

Markdown.prototype.loop_re_over_block = function( re, block, cb ) {
  // Dont use /g regexps with this
  var m,
      b = block.valueOf();

  while ( b.length && (m = re.exec(b) ) != null ) {
    b = b.substr( m[0].length );
    cb.call(this, m);
  }
  return b;
};

/**
 * Markdown.dialects
 *
 * Namespace of built-in dialects.
 **/
Markdown.dialects = {};

/**
 * Markdown.dialects.Gruber
 *
 * The default dialect that follows the rules set out by John Gruber's
 * markdown.pl as closely as possible. Well actually we follow the behaviour of
 * that script which in some places is not exactly what the syntax web page
 * says.
 **/
Markdown.dialects.Gruber = {
  block: {
    atxHeader: function atxHeader( block, next ) {
      var m = block.match( /^(#{1,6})\s*(.*?)\s*#*\s*(?:\n|$)/ );

      if ( !m ) return undefined;

      var header = [ "header", { level: m[ 1 ].length } ];
      Array.prototype.push.apply(header, this.processInline(m[ 2 ]));

      if ( m[0].length < block.length )
        next.unshift( mk_block( block.substr( m[0].length ), block.trailing, block.lineNumber + 2 ) );

      return [ header ];
    },

    setextHeader: function setextHeader( block, next ) {
      var m = block.match( /^(.*)\n([-=])\2\2+(?:\n|$)/ );

      if ( !m ) return undefined;

      var level = ( m[ 2 ] === "=" ) ? 1 : 2;
      var header = [ "header", { level : level }, m[ 1 ] ];

      if ( m[0].length < block.length )
        next.unshift( mk_block( block.substr( m[0].length ), block.trailing, block.lineNumber + 2 ) );

      return [ header ];
    },

    code: function code( block, next ) {
      // |    Foo
      // |bar
      // should be a code block followed by a paragraph. Fun
      //
      // There might also be adjacent code block to merge.

      var ret = [],
          re = /^(?: {0,3}\t| {4})(.*)\n?/,
          lines;

      // 4 spaces + content
      if ( !block.match( re ) ) return undefined;

      block_search:
      do {
        // Now pull out the rest of the lines
        var b = this.loop_re_over_block(
                  re, block.valueOf(), function( m ) { ret.push( m[1] ); } );

        if ( b.length ) {
          // Case alluded to in first comment. push it back on as a new block
          next.unshift( mk_block(b, block.trailing) );
          break block_search;
        }
        else if ( next.length ) {
          // Check the next block - it might be code too
          if ( !next[0].match( re ) ) break block_search;

          // Pull how how many blanks lines follow - minus two to account for .join
          ret.push ( block.trailing.replace(/[^\n]/g, "").substring(2) );

          block = next.shift();
        }
        else {
          break block_search;
        }
      } while ( true );

      return [ [ "code_block", ret.join("\n") ] ];
    },

    horizRule: function horizRule( block, next ) {
      // this needs to find any hr in the block to handle abutting blocks
      var m = block.match( /^(?:([\s\S]*?)\n)?[ \t]*([-_*])(?:[ \t]*\2){2,}[ \t]*(?:\n([\s\S]*))?$/ );

      if ( !m ) {
        return undefined;
      }

      var jsonml = [ [ "hr" ] ];

      // if there's a leading abutting block, process it
      if ( m[ 1 ] ) {
        jsonml.unshift.apply( jsonml, this.processBlock( m[ 1 ], [] ) );
      }

      // if there's a trailing abutting block, stick it into next
      if ( m[ 3 ] ) {
        next.unshift( mk_block( m[ 3 ] ) );
      }

      return jsonml;
    },

    // There are two types of lists. Tight and loose. Tight lists have no whitespace
    // between the items (and result in text just in the <li>) and loose lists,
    // which have an empty line between list items, resulting in (one or more)
    // paragraphs inside the <li>.
    //
    // There are all sorts weird edge cases about the original markdown.pl's
    // handling of lists:
    //
    // * Nested lists are supposed to be indented by four chars per level. But
    //   if they aren't, you can get a nested list by indenting by less than
    //   four so long as the indent doesn't match an indent of an existing list
    //   item in the 'nest stack'.
    //
    // * The type of the list (bullet or number) is controlled just by the
    //    first item at the indent. Subsequent changes are ignored unless they
    //    are for nested lists
    //
    lists: (function( ) {
      // Use a closure to hide a few variables.
      var any_list = "[*+-]|\\d+\\.",
          bullet_list = /[*+-]/,
          number_list = /\d+\./,
          // Capture leading indent as it matters for determining nested lists.
          is_list_re = new RegExp( "^( {0,3})(" + any_list + ")[ \t]+" ),
          indent_re = "(?: {0,3}\\t| {4})";

      // TODO: Cache this regexp for certain depths.
      // Create a regexp suitable for matching an li for a given stack depth
      function regex_for_depth( depth ) {

        return new RegExp(
          // m[1] = indent, m[2] = list_type
          "(?:^(" + indent_re + "{0," + depth + "} {0,3})(" + any_list + ")\\s+)|" +
          // m[3] = cont
          "(^" + indent_re + "{0," + (depth-1) + "}[ ]{0,4})"
        );
      }
      function expand_tab( input ) {
        return input.replace( / {0,3}\t/g, "    " );
      }

      // Add inline content `inline` to `li`. inline comes from processInline
      // so is an array of content
      function add(li, loose, inline, nl) {
        if ( loose ) {
          li.push( [ "para" ].concat(inline) );
          return;
        }
        // Hmmm, should this be any block level element or just paras?
        var add_to = li[li.length -1] instanceof Array && li[li.length - 1][0] == "para"
                   ? li[li.length -1]
                   : li;

        // If there is already some content in this list, add the new line in
        if ( nl && li.length > 1 ) inline.unshift(nl);

        for ( var i = 0; i < inline.length; i++ ) {
          var what = inline[i],
              is_str = typeof what == "string";
          if ( is_str && add_to.length > 1 && typeof add_to[add_to.length-1] == "string" ) {
            add_to[ add_to.length-1 ] += what;
          }
          else {
            add_to.push( what );
          }
        }
      }

      // contained means have an indent greater than the current one. On
      // *every* line in the block
      function get_contained_blocks( depth, blocks ) {

        var re = new RegExp( "^(" + indent_re + "{" + depth + "}.*?\\n?)*$" ),
            replace = new RegExp("^" + indent_re + "{" + depth + "}", "gm"),
            ret = [];

        while ( blocks.length > 0 ) {
          if ( re.exec( blocks[0] ) ) {
            var b = blocks.shift(),
                // Now remove that indent
                x = b.replace( replace, "");

            ret.push( mk_block( x, b.trailing, b.lineNumber ) );
          }
          else {
            break;
          }
        }
        return ret;
      }

      // passed to stack.forEach to turn list items up the stack into paras
      function paragraphify(s, i, stack) {
        var list = s.list;
        var last_li = list[list.length-1];

        if ( last_li[1] instanceof Array && last_li[1][0] == "para" ) {
          return;
        }
        if ( i + 1 == stack.length ) {
          // Last stack frame
          // Keep the same array, but replace the contents
          last_li.push( ["para"].concat( last_li.splice(1, last_li.length - 1) ) );
        }
        else {
          var sublist = last_li.pop();
          last_li.push( ["para"].concat( last_li.splice(1, last_li.length - 1) ), sublist );
        }
      }

      // The matcher function
      return function( block, next ) {
        var m = block.match( is_list_re );
        if ( !m ) return undefined;

        function make_list( m ) {
          var list = bullet_list.exec( m[2] )
                   ? ["bulletlist"]
                   : ["numberlist"];

          stack.push( { list: list, indent: m[1] } );
          return list;
        }


        var stack = [], // Stack of lists for nesting.
            list = make_list( m ),
            last_li,
            loose = false,
            ret = [ stack[0].list ],
            i;

        // Loop to search over block looking for inner block elements and loose lists
        loose_search:
        while ( true ) {
          // Split into lines preserving new lines at end of line
          var lines = block.split( /(?=\n)/ );

          // We have to grab all lines for a li and call processInline on them
          // once as there are some inline things that can span lines.
          var li_accumulate = "";

          // Loop over the lines in this block looking for tight lists.
          tight_search:
          for ( var line_no = 0; line_no < lines.length; line_no++ ) {
            var nl = "",
                l = lines[line_no].replace(/^\n/, function(n) { nl = n; return ""; });

            // TODO: really should cache this
            var line_re = regex_for_depth( stack.length );

            m = l.match( line_re );
            //print( "line:", uneval(l), "\nline match:", uneval(m) );

            // We have a list item
            if ( m[1] !== undefined ) {
              // Process the previous list item, if any
              if ( li_accumulate.length ) {
                add( last_li, loose, this.processInline( li_accumulate ), nl );
                // Loose mode will have been dealt with. Reset it
                loose = false;
                li_accumulate = "";
              }

              m[1] = expand_tab( m[1] );
              var wanted_depth = Math.floor(m[1].length/4)+1;
              //print( "want:", wanted_depth, "stack:", stack.length);
              if ( wanted_depth > stack.length ) {
                // Deep enough for a nested list outright
                //print ( "new nested list" );
                list = make_list( m );
                last_li.push( list );
                last_li = list[1] = [ "listitem" ];
              }
              else {
                // We aren't deep enough to be strictly a new level. This is
                // where Md.pl goes nuts. If the indent matches a level in the
                // stack, put it there, else put it one deeper then the
                // wanted_depth deserves.
                var found = false;
                for ( i = 0; i < stack.length; i++ ) {
                  if ( stack[ i ].indent != m[1] ) continue;
                  list = stack[ i ].list;
                  stack.splice( i+1, stack.length - (i+1) );
                  found = true;
                  break;
                }

                if (!found) {
                  //print("not found. l:", uneval(l));
                  wanted_depth++;
                  if ( wanted_depth <= stack.length ) {
                    stack.splice(wanted_depth, stack.length - wanted_depth);
                    //print("Desired depth now", wanted_depth, "stack:", stack.length);
                    list = stack[wanted_depth-1].list;
                    //print("list:", uneval(list) );
                  }
                  else {
                    //print ("made new stack for messy indent");
                    list = make_list(m);
                    last_li.push(list);
                  }
                }

                //print( uneval(list), "last", list === stack[stack.length-1].list );
                last_li = [ "listitem" ];
                list.push(last_li);
              } // end depth of shenegains
              nl = "";
            }

            // Add content
            if ( l.length > m[0].length ) {
              li_accumulate += nl + l.substr( m[0].length );
            }
          } // tight_search

          if ( li_accumulate.length ) {
            add( last_li, loose, this.processInline( li_accumulate ), nl );
            // Loose mode will have been dealt with. Reset it
            loose = false;
            li_accumulate = "";
          }

          // Look at the next block - we might have a loose list. Or an extra
          // paragraph for the current li
          var contained = get_contained_blocks( stack.length, next );

          // Deal with code blocks or properly nested lists
          if ( contained.length > 0 ) {
            // Make sure all listitems up the stack are paragraphs
            forEach( stack, paragraphify, this);

            last_li.push.apply( last_li, this.toTree( contained, [] ) );
          }

          var next_block = next[0] && next[0].valueOf() || "";

          if ( next_block.match(is_list_re) || next_block.match( /^ / ) ) {
            block = next.shift();

            // Check for an HR following a list: features/lists/hr_abutting
            var hr = this.dialect.block.horizRule( block, next );

            if ( hr ) {
              ret.push.apply(ret, hr);
              break;
            }

            // Make sure all listitems up the stack are paragraphs
            forEach( stack, paragraphify, this);

            loose = true;
            continue loose_search;
          }
          break;
        } // loose_search

        return ret;
      };
    })(),

    blockquote: function blockquote( block, next ) {
      if ( !block.match( /^>/m ) )
        return undefined;

      var jsonml = [];

      // separate out the leading abutting block, if any. I.e. in this case:
      //
      //  a
      //  > b
      //
      if ( block[ 0 ] != ">" ) {
        var lines = block.split( /\n/ ),
            prev = [],
            line_no = block.lineNumber;

        // keep shifting lines until you find a crotchet
        while ( lines.length && lines[ 0 ][ 0 ] != ">" ) {
            prev.push( lines.shift() );
            line_no++;
        }

        var abutting = mk_block( prev.join( "\n" ), "\n", block.lineNumber );
        jsonml.push.apply( jsonml, this.processBlock( abutting, [] ) );
        // reassemble new block of just block quotes!
        block = mk_block( lines.join( "\n" ), block.trailing, line_no );
      }


      // if the next block is also a blockquote merge it in
      while ( next.length && next[ 0 ][ 0 ] == ">" ) {
        var b = next.shift();
        block = mk_block( block + block.trailing + b, b.trailing, block.lineNumber );
      }

      // Strip off the leading "> " and re-process as a block.
      var input = block.replace( /^> ?/gm, "" ),
          old_tree = this.tree,
          processedBlock = this.toTree( input, [ "blockquote" ] ),
          attr = extract_attr( processedBlock );

      // If any link references were found get rid of them
      if ( attr && attr.references ) {
        delete attr.references;
        // And then remove the attribute object if it's empty
        if ( isEmpty( attr ) ) {
          processedBlock.splice( 1, 1 );
        }
      }

      jsonml.push( processedBlock );
      return jsonml;
    },

    referenceDefn: function referenceDefn( block, next) {
      var re = /^\s*\[(.*?)\]:\s*(\S+)(?:\s+(?:(['"])(.*?)\3|\((.*?)\)))?\n?/;
      // interesting matches are [ , ref_id, url, , title, title ]

      if ( !block.match(re) )
        return undefined;

      // make an attribute node if it doesn't exist
      if ( !extract_attr( this.tree ) ) {
        this.tree.splice( 1, 0, {} );
      }

      var attrs = extract_attr( this.tree );

      // make a references hash if it doesn't exist
      if ( attrs.references === undefined ) {
        attrs.references = {};
      }

      var b = this.loop_re_over_block(re, block, function( m ) {

        if ( m[2] && m[2][0] == "<" && m[2][m[2].length-1] == ">" )
          m[2] = m[2].substring( 1, m[2].length - 1 );

        var ref = attrs.references[ m[1].toLowerCase() ] = {
          href: m[2]
        };

        if ( m[4] !== undefined )
          ref.title = m[4];
        else if ( m[5] !== undefined )
          ref.title = m[5];

      } );

      if ( b.length )
        next.unshift( mk_block( b, block.trailing ) );

      return [];
    },

    para: function para( block, next ) {
      // everything's a para!
      return [ ["para"].concat( this.processInline( block ) ) ];
    }
  }
};

Markdown.dialects.Gruber.inline = {

    __oneElement__: function oneElement( text, patterns_or_re, previous_nodes ) {
      var m,
          res,
          lastIndex = 0;

      patterns_or_re = patterns_or_re || this.dialect.inline.__patterns__;
      var re = new RegExp( "([\\s\\S]*?)(" + (patterns_or_re.source || patterns_or_re) + ")" );

      m = re.exec( text );
      if (!m) {
        // Just boring text
        return [ text.length, text ];
      }
      else if ( m[1] ) {
        // Some un-interesting text matched. Return that first
        return [ m[1].length, m[1] ];
      }

      var res;
      if ( m[2] in this.dialect.inline ) {
        res = this.dialect.inline[ m[2] ].call(
                  this,
                  text.substr( m.index ), m, previous_nodes || [] );
      }
      // Default for now to make dev easier. just slurp special and output it.
      res = res || [ m[2].length, m[2] ];
      return res;
    },

    __call__: function inline( text, patterns ) {

      var out = [],
          res;

      function add(x) {
        //D:self.debug("  adding output", uneval(x));
        if ( typeof x == "string" && typeof out[out.length-1] == "string" )
          out[ out.length-1 ] += x;
        else
          out.push(x);
      }

      while ( text.length > 0 ) {
        res = this.dialect.inline.__oneElement__.call(this, text, patterns, out );
        text = text.substr( res.shift() );
        forEach(res, add )
      }

      return out;
    },

    // These characters are intersting elsewhere, so have rules for them so that
    // chunks of plain text blocks don't include them
    "]": function () {},
    "}": function () {},

    __escape__ : /^\\[\\`\*_{}\[\]()#\+.!\-]/,

    "\\": function escaped( text ) {
      // [ length of input processed, node/children to add... ]
      // Only esacape: \ ` * _ { } [ ] ( ) # * + - . !
      if ( this.dialect.inline.__escape__.exec( text ) )
        return [ 2, text.charAt( 1 ) ];
      else
        // Not an esacpe
        return [ 1, "\\" ];
    },

    "![": function image( text ) {

      // Unlike images, alt text is plain text only. no other elements are
      // allowed in there

      // ![Alt text](/path/to/img.jpg "Optional title")
      //      1          2            3       4         <--- captures
      var m = text.match( /^!\[(.*?)\][ \t]*\([ \t]*([^")]*?)(?:[ \t]+(["'])(.*?)\3)?[ \t]*\)/ );

      if ( m ) {
        if ( m[2] && m[2][0] == "<" && m[2][m[2].length-1] == ">" )
          m[2] = m[2].substring( 1, m[2].length - 1 );

        m[2] = this.dialect.inline.__call__.call( this, m[2], /\\/ )[0];

        var attrs = { alt: m[1], href: m[2] || "" };
        if ( m[4] !== undefined)
          attrs.title = m[4];

        return [ m[0].length, [ "img", attrs ] ];
      }

      // ![Alt text][id]
      m = text.match( /^!\[(.*?)\][ \t]*\[(.*?)\]/ );

      if ( m ) {
        // We can't check if the reference is known here as it likely wont be
        // found till after. Check it in md tree->hmtl tree conversion
        return [ m[0].length, [ "img_ref", { alt: m[1], ref: m[2].toLowerCase(), original: m[0] } ] ];
      }

      // Just consume the '!['
      return [ 2, "![" ];
    },

    "[": function link( text ) {

      var orig = String(text);
      // Inline content is possible inside `link text`
      var res = Markdown.DialectHelpers.inline_until_char.call( this, text.substr(1), "]" );

      // No closing ']' found. Just consume the [
      if ( !res ) return [ 1, "[" ];

      var consumed = 1 + res[ 0 ],
          children = res[ 1 ],
          link,
          attrs;

      // At this point the first [...] has been parsed. See what follows to find
      // out which kind of link we are (reference or direct url)
      text = text.substr( consumed );

      // [link text](/path/to/img.jpg "Optional title")
      //                 1            2       3         <--- captures
      // This will capture up to the last paren in the block. We then pull
      // back based on if there a matching ones in the url
      //    ([here](/url/(test))
      // The parens have to be balanced
      var m = text.match( /^\s*\([ \t]*([^"']*)(?:[ \t]+(["'])(.*?)\2)?[ \t]*\)/ );
      if ( m ) {
        var url = m[1];
        consumed += m[0].length;

        if ( url && url[0] == "<" && url[url.length-1] == ">" )
          url = url.substring( 1, url.length - 1 );

        // If there is a title we don't have to worry about parens in the url
        if ( !m[3] ) {
          var open_parens = 1; // One open that isn't in the capture
          for ( var len = 0; len < url.length; len++ ) {
            switch ( url[len] ) {
            case "(":
              open_parens++;
              break;
            case ")":
              if ( --open_parens == 0) {
                consumed -= url.length - len;
                url = url.substring(0, len);
              }
              break;
            }
          }
        }

        // Process escapes only
        url = this.dialect.inline.__call__.call( this, url, /\\/ )[0];

        attrs = { href: url || "" };
        if ( m[3] !== undefined)
          attrs.title = m[3];

        link = [ "link", attrs ].concat( children );
        return [ consumed, link ];
      }

      // [Alt text][id]
      // [Alt text] [id]
      m = text.match( /^\s*\[(.*?)\]/ );

      if ( m ) {

        consumed += m[ 0 ].length;

        // [links][] uses links as its reference
        attrs = { ref: ( m[ 1 ] || String(children) ).toLowerCase(),  original: orig.substr( 0, consumed ) };

        link = [ "link_ref", attrs ].concat( children );

        // We can't check if the reference is known here as it likely wont be
        // found till after. Check it in md tree->hmtl tree conversion.
        // Store the original so that conversion can revert if the ref isn't found.
        return [ consumed, link ];
      }

      // [id]
      // Only if id is plain (no formatting.)
      if ( children.length == 1 && typeof children[0] == "string" ) {

        attrs = { ref: children[0].toLowerCase(),  original: orig.substr( 0, consumed ) };
        link = [ "link_ref", attrs, children[0] ];
        return [ consumed, link ];
      }

      // Just consume the "["
      return [ 1, "[" ];
    },


    "<": function autoLink( text ) {
      var m;

      if ( ( m = text.match( /^<(?:((https?|ftp|mailto):[^>]+)|(.*?@.*?\.[a-zA-Z]+))>/ ) ) != null ) {
        if ( m[3] ) {
          return [ m[0].length, [ "link", { href: "mailto:" + m[3] }, m[3] ] ];

        }
        else if ( m[2] == "mailto" ) {
          return [ m[0].length, [ "link", { href: m[1] }, m[1].substr("mailto:".length ) ] ];
        }
        else
          return [ m[0].length, [ "link", { href: m[1] }, m[1] ] ];
      }

      return [ 1, "<" ];
    },

    "`": function inlineCode( text ) {
      // Inline code block. as many backticks as you like to start it
      // Always skip over the opening ticks.
      var m = text.match( /(`+)(([\s\S]*?)\1)/ );

      if ( m && m[2] )
        return [ m[1].length + m[2].length, [ "inlinecode", m[3] ] ];
      else {
        // TODO: No matching end code found - warn!
        return [ 1, "`" ];
      }
    },

    "  \n": function lineBreak( text ) {
      return [ 3, [ "linebreak" ] ];
    }

};

// Meta Helper/generator method for em and strong handling
function strong_em( tag, md ) {

  var state_slot = tag + "_state",
      other_slot = tag == "strong" ? "em_state" : "strong_state";

  function CloseTag(len) {
    this.len_after = len;
    this.name = "close_" + md;
  }

  return function ( text, orig_match ) {

    if ( this[state_slot][0] == md ) {
      // Most recent em is of this type
      //D:this.debug("closing", md);
      this[state_slot].shift();

      // "Consume" everything to go back to the recrusion in the else-block below
      return[ text.length, new CloseTag(text.length-md.length) ];
    }
    else {
      // Store a clone of the em/strong states
      var other = this[other_slot].slice(),
          state = this[state_slot].slice();

      this[state_slot].unshift(md);

      //D:this.debug_indent += "  ";

      // Recurse
      var res = this.processInline( text.substr( md.length ) );
      //D:this.debug_indent = this.debug_indent.substr(2);

      var last = res[res.length - 1];

      //D:this.debug("processInline from", tag + ": ", uneval( res ) );

      var check = this[state_slot].shift();
      if ( last instanceof CloseTag ) {
        res.pop();
        // We matched! Huzzah.
        var consumed = text.length - last.len_after;
        return [ consumed, [ tag ].concat(res) ];
      }
      else {
        // Restore the state of the other kind. We might have mistakenly closed it.
        this[other_slot] = other;
        this[state_slot] = state;

        // We can't reuse the processed result as it could have wrong parsing contexts in it.
        return [ md.length, md ];
      }
    }
  }; // End returned function
}

Markdown.dialects.Gruber.inline["**"] = strong_em("strong", "**");
Markdown.dialects.Gruber.inline["__"] = strong_em("strong", "__");
Markdown.dialects.Gruber.inline["*"]  = strong_em("em", "*");
Markdown.dialects.Gruber.inline["_"]  = strong_em("em", "_");


// Build default order from insertion order.
Markdown.buildBlockOrder = function(d) {
  var ord = [];
  for ( var i in d ) {
    if ( i == "__order__" || i == "__call__" ) continue;
    ord.push( i );
  }
  d.__order__ = ord;
};

// Build patterns for inline matcher
Markdown.buildInlinePatterns = function(d) {
  var patterns = [];

  for ( var i in d ) {
    // __foo__ is reserved and not a pattern
    if ( i.match( /^__.*__$/) ) continue;
    var l = i.replace( /([\\.*+?|()\[\]{}])/g, "\\$1" )
             .replace( /\n/, "\\n" );
    patterns.push( i.length == 1 ? l : "(?:" + l + ")" );
  }

  patterns = patterns.join("|");
  d.__patterns__ = patterns;
  //print("patterns:", uneval( patterns ) );

  var fn = d.__call__;
  d.__call__ = function(text, pattern) {
    if ( pattern != undefined ) {
      return fn.call(this, text, pattern);
    }
    else
    {
      return fn.call(this, text, patterns);
    }
  };
};

Markdown.DialectHelpers = {};
Markdown.DialectHelpers.inline_until_char = function( text, want ) {
  var consumed = 0,
      nodes = [];

  while ( true ) {
    if ( text.charAt( consumed ) == want ) {
      // Found the character we were looking for
      consumed++;
      return [ consumed, nodes ];
    }

    if ( consumed >= text.length ) {
      // No closing char found. Abort.
      return null;
    }

    var res = this.dialect.inline.__oneElement__.call(this, text.substr( consumed ) );
    consumed += res[ 0 ];
    // Add any returned nodes.
    nodes.push.apply( nodes, res.slice( 1 ) );
  }
}

// Helper function to make sub-classing a dialect easier
Markdown.subclassDialect = function( d ) {
  function Block() {}
  Block.prototype = d.block;
  function Inline() {}
  Inline.prototype = d.inline;

  return { block: new Block(), inline: new Inline() };
};

Markdown.buildBlockOrder ( Markdown.dialects.Gruber.block );
Markdown.buildInlinePatterns( Markdown.dialects.Gruber.inline );

Markdown.dialects.Maruku = Markdown.subclassDialect( Markdown.dialects.Gruber );

Markdown.dialects.Maruku.processMetaHash = function processMetaHash( meta_string ) {
  var meta = split_meta_hash( meta_string ),
      attr = {};

  for ( var i = 0; i < meta.length; ++i ) {
    // id: #foo
    if ( /^#/.test( meta[ i ] ) ) {
      attr.id = meta[ i ].substring( 1 );
    }
    // class: .foo
    else if ( /^\./.test( meta[ i ] ) ) {
      // if class already exists, append the new one
      if ( attr["class"] ) {
        attr["class"] = attr["class"] + meta[ i ].replace( /./, " " );
      }
      else {
        attr["class"] = meta[ i ].substring( 1 );
      }
    }
    // attribute: foo=bar
    else if ( /\=/.test( meta[ i ] ) ) {
      var s = meta[ i ].split( /\=/ );
      attr[ s[ 0 ] ] = s[ 1 ];
    }
  }

  return attr;
}

function split_meta_hash( meta_string ) {
  var meta = meta_string.split( "" ),
      parts = [ "" ],
      in_quotes = false;

  while ( meta.length ) {
    var letter = meta.shift();
    switch ( letter ) {
      case " " :
        // if we're in a quoted section, keep it
        if ( in_quotes ) {
          parts[ parts.length - 1 ] += letter;
        }
        // otherwise make a new part
        else {
          parts.push( "" );
        }
        break;
      case "'" :
      case '"' :
        // reverse the quotes and move straight on
        in_quotes = !in_quotes;
        break;
      case "\\" :
        // shift off the next letter to be used straight away.
        // it was escaped so we'll keep it whatever it is
        letter = meta.shift();
      default :
        parts[ parts.length - 1 ] += letter;
        break;
    }
  }

  return parts;
}

Markdown.dialects.Maruku.block.document_meta = function document_meta( block, next ) {
  // we're only interested in the first block
  if ( block.lineNumber > 1 ) return undefined;

  // document_meta blocks consist of one or more lines of `Key: Value\n`
  if ( ! block.match( /^(?:\w+:.*\n)*\w+:.*$/ ) ) return undefined;

  // make an attribute node if it doesn't exist
  if ( !extract_attr( this.tree ) ) {
    this.tree.splice( 1, 0, {} );
  }

  var pairs = block.split( /\n/ );
  for ( p in pairs ) {
    var m = pairs[ p ].match( /(\w+):\s*(.*)$/ ),
        key = m[ 1 ].toLowerCase(),
        value = m[ 2 ];

    this.tree[ 1 ][ key ] = value;
  }

  // document_meta produces no content!
  return [];
};

Markdown.dialects.Maruku.block.block_meta = function block_meta( block, next ) {
  // check if the last line of the block is an meta hash
  var m = block.match( /(^|\n) {0,3}\{:\s*((?:\\\}|[^\}])*)\s*\}$/ );
  if ( !m ) return undefined;

  // process the meta hash
  var attr = this.dialect.processMetaHash( m[ 2 ] );

  var hash;

  // if we matched ^ then we need to apply meta to the previous block
  if ( m[ 1 ] === "" ) {
    var node = this.tree[ this.tree.length - 1 ];
    hash = extract_attr( node );

    // if the node is a string (rather than JsonML), bail
    if ( typeof node === "string" ) return undefined;

    // create the attribute hash if it doesn't exist
    if ( !hash ) {
      hash = {};
      node.splice( 1, 0, hash );
    }

    // add the attributes in
    for ( a in attr ) {
      hash[ a ] = attr[ a ];
    }

    // return nothing so the meta hash is removed
    return [];
  }

  // pull the meta hash off the block and process what's left
  var b = block.replace( /\n.*$/, "" ),
      result = this.processBlock( b, [] );

  // get or make the attributes hash
  hash = extract_attr( result[ 0 ] );
  if ( !hash ) {
    hash = {};
    result[ 0 ].splice( 1, 0, hash );
  }

  // attach the attributes to the block
  for ( a in attr ) {
    hash[ a ] = attr[ a ];
  }

  return result;
};

Markdown.dialects.Maruku.block.definition_list = function definition_list( block, next ) {
  // one or more terms followed by one or more definitions, in a single block
  var tight = /^((?:[^\s:].*\n)+):\s+([\s\S]+)$/,
      list = [ "dl" ],
      i, m;

  // see if we're dealing with a tight or loose block
  if ( ( m = block.match( tight ) ) ) {
    // pull subsequent tight DL blocks out of `next`
    var blocks = [ block ];
    while ( next.length && tight.exec( next[ 0 ] ) ) {
      blocks.push( next.shift() );
    }

    for ( var b = 0; b < blocks.length; ++b ) {
      var m = blocks[ b ].match( tight ),
          terms = m[ 1 ].replace( /\n$/, "" ).split( /\n/ ),
          defns = m[ 2 ].split( /\n:\s+/ );

      // print( uneval( m ) );

      for ( i = 0; i < terms.length; ++i ) {
        list.push( [ "dt", terms[ i ] ] );
      }

      for ( i = 0; i < defns.length; ++i ) {
        // run inline processing over the definition
        list.push( [ "dd" ].concat( this.processInline( defns[ i ].replace( /(\n)\s+/, "$1" ) ) ) );
      }
    }
  }
  else {
    return undefined;
  }

  return [ list ];
};

// splits on unescaped instances of @ch. If @ch is not a character the result
// can be unpredictable

Markdown.dialects.Maruku.block.table = function table (block, next) {

    var _split_on_unescaped = function(s, ch) {
        ch = ch || '\\s';
        if (ch.match(/^[\\|\[\]{}?*.+^$]$/)) { ch = '\\' + ch; }
        var res = [ ],
            r = new RegExp('^((?:\\\\.|[^\\\\' + ch + '])*)' + ch + '(.*)'),
            m;
        while(m = s.match(r)) {
            res.push(m[1]);
            s = m[2];
        }
        res.push(s);
        return res;
    }

    var leading_pipe = /^ {0,3}\|(.+)\n {0,3}\|\s*([\-:]+[\-| :]*)\n((?:\s*\|.*(?:\n|$))*)(?=\n|$)/,
        // find at least an unescaped pipe in each line
        no_leading_pipe = /^ {0,3}(\S(?:\\.|[^\\|])*\|.*)\n {0,3}([\-:]+\s*\|[\-| :]*)\n((?:(?:\\.|[^\\|])*\|.*(?:\n|$))*)(?=\n|$)/,
        i, m;
    if (m = block.match(leading_pipe)) {
        // remove leading pipes in contents
        // (header and horizontal rule already have the leading pipe left out)
        m[3] = m[3].replace(/^\s*\|/gm, '');
    } else if (! ( m = block.match(no_leading_pipe))) {
        return undefined;
    }

    var table = [ "table", [ "thead", [ "tr" ] ], [ "tbody" ] ];

    // remove trailing pipes, then split on pipes
    // (no escaped pipes are allowed in horizontal rule)
    m[2] = m[2].replace(/\|\s*$/, '').split('|');

    // process alignment
    var html_attrs = [ ];
    forEach (m[2], function (s) {
        if (s.match(/^\s*-+:\s*$/))       html_attrs.push({align: "right"});
        else if (s.match(/^\s*:-+\s*$/))  html_attrs.push({align: "left"});
        else if (s.match(/^\s*:-+:\s*$/)) html_attrs.push({align: "center"});
        else                              html_attrs.push({});
    });

    // now for the header, avoid escaped pipes
    m[1] = _split_on_unescaped(m[1].replace(/\|\s*$/, ''), '|');
    for (i = 0; i < m[1].length; i++) {
        table[1][1].push(['th', html_attrs[i] || {}].concat(
            this.processInline(m[1][i].trim())));
    }

    // now for body contents
    forEach (m[3].replace(/\|\s*$/mg, '').split('\n'), function (row) {
        var html_row = ['tr'];
        row = _split_on_unescaped(row, '|');
        for (i = 0; i < row.length; i++) {
            html_row.push(['td', html_attrs[i] || {}].concat(this.processInline(row[i].trim())));
        }
        table[2].push(html_row);
    }, this);

    return [table];
}

Markdown.dialects.Maruku.inline[ "{:" ] = function inline_meta( text, matches, out ) {
  if ( !out.length ) {
    return [ 2, "{:" ];
  }

  // get the preceeding element
  var before = out[ out.length - 1 ];

  if ( typeof before === "string" ) {
    return [ 2, "{:" ];
  }

  // match a meta hash
  var m = text.match( /^\{:\s*((?:\\\}|[^\}])*)\s*\}/ );

  // no match, false alarm
  if ( !m ) {
    return [ 2, "{:" ];
  }

  // attach the attributes to the preceeding element
  var meta = this.dialect.processMetaHash( m[ 1 ] ),
      attr = extract_attr( before );

  if ( !attr ) {
    attr = {};
    before.splice( 1, 0, attr );
  }

  for ( var k in meta ) {
    attr[ k ] = meta[ k ];
  }

  // cut out the string and replace it with nothing
  return [ m[ 0 ].length, "" ];
};

Markdown.dialects.Maruku.inline.__escape__ = /^\\[\\`\*_{}\[\]()#\+.!\-|:]/;

Markdown.buildBlockOrder ( Markdown.dialects.Maruku.block );
Markdown.buildInlinePatterns( Markdown.dialects.Maruku.inline );

var isArray = Array.isArray || function(obj) {
  return Object.prototype.toString.call(obj) == "[object Array]";
};

var forEach;
// Don't mess with Array.prototype. Its not friendly
if ( Array.prototype.forEach ) {
  forEach = function( arr, cb, thisp ) {
    return arr.forEach( cb, thisp );
  };
}
else {
  forEach = function(arr, cb, thisp) {
    for (var i = 0; i < arr.length; i++) {
      cb.call(thisp || arr, arr[i], i, arr);
    }
  }
}

var isEmpty = function( obj ) {
  for ( var key in obj ) {
    if ( hasOwnProperty.call( obj, key ) ) {
      return false;
    }
  }

  return true;
}

function extract_attr( jsonml ) {
  return isArray(jsonml)
      && jsonml.length > 1
      && typeof jsonml[ 1 ] === "object"
      && !( isArray(jsonml[ 1 ]) )
      ? jsonml[ 1 ]
      : undefined;
}



/**
 *  renderJsonML( jsonml[, options] ) -> String
 *  - jsonml (Array): JsonML array to render to XML
 *  - options (Object): options
 *
 *  Converts the given JsonML into well-formed XML.
 *
 *  The options currently understood are:
 *
 *  - root (Boolean): wether or not the root node should be included in the
 *    output, or just its children. The default `false` is to not include the
 *    root itself.
 */
expose.renderJsonML = function( jsonml, options ) {
  options = options || {};
  // include the root element in the rendered output?
  options.root = options.root || false;

  var content = [];

  if ( options.root ) {
    content.push( render_tree( jsonml ) );
  }
  else {
    jsonml.shift(); // get rid of the tag
    if ( jsonml.length && typeof jsonml[ 0 ] === "object" && !( jsonml[ 0 ] instanceof Array ) ) {
      jsonml.shift(); // get rid of the attributes
    }

    while ( jsonml.length ) {
      content.push( render_tree( jsonml.shift() ) );
    }
  }

  return content.join( "\n\n" );
};

function escapeHTML( text ) {
  return text.replace( /&/g, "&amp;" )
             .replace( /</g, "&lt;" )
             .replace( />/g, "&gt;" )
             .replace( /"/g, "&quot;" )
             .replace( /'/g, "&#39;" );
}

function render_tree( jsonml ) {
  // basic case
  if ( typeof jsonml === "string" ) {
    return escapeHTML( jsonml );
  }

  var tag = jsonml.shift(),
      attributes = {},
      content = [];

  if ( jsonml.length && typeof jsonml[ 0 ] === "object" && !( jsonml[ 0 ] instanceof Array ) ) {
    attributes = jsonml.shift();
  }

  while ( jsonml.length ) {
    content.push( render_tree( jsonml.shift() ) );
  }

  var tag_attrs = "";
  for ( var a in attributes ) {
    tag_attrs += " " + a + '="' + escapeHTML( attributes[ a ] ) + '"';
  }

  // be careful about adding whitespace here for inline elements
  if ( tag == "img" || tag == "br" || tag == "hr" ) {
    return "<"+ tag + tag_attrs + "/>";
  }
  else {
    return "<"+ tag + tag_attrs + ">" + content.join( "" ) + "</" + tag + ">";
  }
}

function convert_tree_to_html( tree, references, options ) {
  var i;
  options = options || {};

  // shallow clone
  var jsonml = tree.slice( 0 );

  if ( typeof options.preprocessTreeNode === "function" ) {
      jsonml = options.preprocessTreeNode(jsonml, references);
  }

  // Clone attributes if they exist
  var attrs = extract_attr( jsonml );
  if ( attrs ) {
    jsonml[ 1 ] = {};
    for ( i in attrs ) {
      jsonml[ 1 ][ i ] = attrs[ i ];
    }
    attrs = jsonml[ 1 ];
  }

  // basic case
  if ( typeof jsonml === "string" ) {
    return jsonml;
  }

  // convert this node
  switch ( jsonml[ 0 ] ) {
    case "header":
      jsonml[ 0 ] = "h" + jsonml[ 1 ].level;
      delete jsonml[ 1 ].level;
      break;
    case "bulletlist":
      jsonml[ 0 ] = "ul";
      break;
    case "numberlist":
      jsonml[ 0 ] = "ol";
      break;
    case "listitem":
      jsonml[ 0 ] = "li";
      break;
    case "para":
      jsonml[ 0 ] = "p";
      break;
    case "markdown":
      jsonml[ 0 ] = "html";
      if ( attrs ) delete attrs.references;
      break;
    case "code_block":
      jsonml[ 0 ] = "pre";
      i = attrs ? 2 : 1;
      var code = [ "code" ];
      code.push.apply( code, jsonml.splice( i, jsonml.length - i ) );
      jsonml[ i ] = code;
      break;
    case "inlinecode":
      jsonml[ 0 ] = "code";
      break;
    case "img":
      jsonml[ 1 ].src = jsonml[ 1 ].href;
      delete jsonml[ 1 ].href;
      break;
    case "linebreak":
      jsonml[ 0 ] = "br";
    break;
    case "link":
      jsonml[ 0 ] = "a";
      break;
    case "link_ref":
      jsonml[ 0 ] = "a";

      // grab this ref and clean up the attribute node
      var ref = references[ attrs.ref ];

      // if the reference exists, make the link
      if ( ref ) {
        delete attrs.ref;

        // add in the href and title, if present
        attrs.href = ref.href;
        if ( ref.title ) {
          attrs.title = ref.title;
        }

        // get rid of the unneeded original text
        delete attrs.original;
      }
      // the reference doesn't exist, so revert to plain text
      else {
        return attrs.original;
      }
      break;
    case "img_ref":
      jsonml[ 0 ] = "img";

      // grab this ref and clean up the attribute node
      var ref = references[ attrs.ref ];

      // if the reference exists, make the link
      if ( ref ) {
        delete attrs.ref;

        // add in the href and title, if present
        attrs.src = ref.href;
        if ( ref.title ) {
          attrs.title = ref.title;
        }

        // get rid of the unneeded original text
        delete attrs.original;
      }
      // the reference doesn't exist, so revert to plain text
      else {
        return attrs.original;
      }
      break;
  }

  // convert all the children
  i = 1;

  // deal with the attribute node, if it exists
  if ( attrs ) {
    // if there are keys, skip over it
    for ( var key in jsonml[ 1 ] ) {
        i = 2;
        break;
    }
    // if there aren't, remove it
    if ( i === 1 ) {
      jsonml.splice( i, 1 );
    }
  }

  for ( ; i < jsonml.length; ++i ) {
    jsonml[ i ] = convert_tree_to_html( jsonml[ i ], references, options );
  }

  return jsonml;
}


// merges adjacent text nodes into a single node
function merge_text_nodes( jsonml ) {
  // skip the tag name and attribute hash
  var i = extract_attr( jsonml ) ? 2 : 1;

  while ( i < jsonml.length ) {
    // if it's a string check the next item too
    if ( typeof jsonml[ i ] === "string" ) {
      if ( i + 1 < jsonml.length && typeof jsonml[ i + 1 ] === "string" ) {
        // merge the second string into the first and remove it
        jsonml[ i ] += jsonml.splice( i + 1, 1 )[ 0 ];
      }
      else {
        ++i;
      }
    }
    // if it's not a string recurse
    else {
      merge_text_nodes( jsonml[ i ] );
      ++i;
    }
  }
}

} )( (function() {
  if ( typeof exports === "undefined" ) {
    window.markdown = {};
    return window.markdown;
  }
  else {
    return exports;
  }
} )() );


(function(e){if("function"==typeof bootstrap)bootstrap("nedb",e);else if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else if("undefined"!=typeof ses){if(!ses.ok())return;ses.makeNedb=e}else"undefined"!=typeof window?window.Nedb=e():global.Nedb=e()})(function(){var define,ses,bootstrap,module,exports;
return (function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
var process=require("__browserify_process");if (!process.EventEmitter) process.EventEmitter = function () {};

var EventEmitter = exports.EventEmitter = process.EventEmitter;
var isArray = typeof Array.isArray === 'function'
    ? Array.isArray
    : function (xs) {
        return Object.prototype.toString.call(xs) === '[object Array]'
    }
;
function indexOf (xs, x) {
    if (xs.indexOf) return xs.indexOf(x);
    for (var i = 0; i < xs.length; i++) {
        if (x === xs[i]) return i;
    }
    return -1;
}

// By default EventEmitters will print a warning if more than
// 10 listeners are added to it. This is a useful default which
// helps finding memory leaks.
//
// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
var defaultMaxListeners = 10;
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!this._events) this._events = {};
  this._events.maxListeners = n;
};


EventEmitter.prototype.emit = function(type) {
  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events || !this._events.error ||
        (isArray(this._events.error) && !this._events.error.length))
    {
      if (arguments[1] instanceof Error) {
        throw arguments[1]; // Unhandled 'error' event
      } else {
        throw new Error("Uncaught, unspecified 'error' event.");
      }
      return false;
    }
  }

  if (!this._events) return false;
  var handler = this._events[type];
  if (!handler) return false;

  if (typeof handler == 'function') {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        var args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
    return true;

  } else if (isArray(handler)) {
    var args = Array.prototype.slice.call(arguments, 1);

    var listeners = handler.slice();
    for (var i = 0, l = listeners.length; i < l; i++) {
      listeners[i].apply(this, args);
    }
    return true;

  } else {
    return false;
  }
};

// EventEmitter is defined in src/node_events.cc
// EventEmitter.prototype.emit() is also defined there.
EventEmitter.prototype.addListener = function(type, listener) {
  if ('function' !== typeof listener) {
    throw new Error('addListener only takes instances of Function');
  }

  if (!this._events) this._events = {};

  // To avoid recursion in the case that type == "newListeners"! Before
  // adding it to the listeners, first emit "newListeners".
  this.emit('newListener', type, listener);

  if (!this._events[type]) {
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  } else if (isArray(this._events[type])) {

    // Check for listener leak
    if (!this._events[type].warned) {
      var m;
      if (this._events.maxListeners !== undefined) {
        m = this._events.maxListeners;
      } else {
        m = defaultMaxListeners;
      }

      if (m && m > 0 && this._events[type].length > m) {
        this._events[type].warned = true;
        console.error('(node) warning: possible EventEmitter memory ' +
                      'leak detected. %d listeners added. ' +
                      'Use emitter.setMaxListeners() to increase limit.',
                      this._events[type].length);
        console.trace();
      }
    }

    // If we've already got an array, just append.
    this._events[type].push(listener);
  } else {
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  var self = this;
  self.on(type, function g() {
    self.removeListener(type, g);
    listener.apply(this, arguments);
  });

  return this;
};

EventEmitter.prototype.removeListener = function(type, listener) {
  if ('function' !== typeof listener) {
    throw new Error('removeListener only takes instances of Function');
  }

  // does not use listeners(), so no side effect of creating _events[type]
  if (!this._events || !this._events[type]) return this;

  var list = this._events[type];

  if (isArray(list)) {
    var i = indexOf(list, listener);
    if (i < 0) return this;
    list.splice(i, 1);
    if (list.length == 0)
      delete this._events[type];
  } else if (this._events[type] === listener) {
    delete this._events[type];
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  if (arguments.length === 0) {
    this._events = {};
    return this;
  }

  // does not use listeners(), so no side effect of creating _events[type]
  if (type && this._events && this._events[type]) this._events[type] = null;
  return this;
};

EventEmitter.prototype.listeners = function(type) {
  if (!this._events) this._events = {};
  if (!this._events[type]) this._events[type] = [];
  if (!isArray(this._events[type])) {
    this._events[type] = [this._events[type]];
  }
  return this._events[type];
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (typeof emitter._events[type] === 'function')
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

},{"__browserify_process":4}],2:[function(require,module,exports){
var process=require("__browserify_process");function filter (xs, fn) {
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (fn(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length; i >= 0; i--) {
    var last = parts[i];
    if (last == '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Regex to split a filename into [*, dir, basename, ext]
// posix version
var splitPathRe = /^(.+\/(?!$)|\/)?((?:.+?)?(\.[^.]*)?)$/;

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
var resolvedPath = '',
    resolvedAbsolute = false;

for (var i = arguments.length; i >= -1 && !resolvedAbsolute; i--) {
  var path = (i >= 0)
      ? arguments[i]
      : process.cwd();

  // Skip empty and invalid entries
  if (typeof path !== 'string' || !path) {
    continue;
  }

  resolvedPath = path + '/' + resolvedPath;
  resolvedAbsolute = path.charAt(0) === '/';
}

// At this point the path should be resolved to a full absolute path, but
// handle relative paths to be safe (might happen when process.cwd() fails)

// Normalize the path
resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
var isAbsolute = path.charAt(0) === '/',
    trailingSlash = path.slice(-1) === '/';

// Normalize the path
path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }
  
  return (isAbsolute ? '/' : '') + path;
};


// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    return p && typeof p === 'string';
  }).join('/'));
};


exports.dirname = function(path) {
  var dir = splitPathRe.exec(path)[1] || '';
  var isWindows = false;
  if (!dir) {
    // No dirname
    return '.';
  } else if (dir.length === 1 ||
      (isWindows && dir.length <= 3 && dir.charAt(1) === ':')) {
    // It is just a slash or a drive letter with a slash
    return dir;
  } else {
    // It is a full dirname, strip trailing slash
    return dir.substring(0, dir.length - 1);
  }
};


exports.basename = function(path, ext) {
  var f = splitPathRe.exec(path)[2] || '';
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPathRe.exec(path)[3] || '';
};

exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';

},{"__browserify_process":4}],3:[function(require,module,exports){
var events = require('events');

exports.isArray = isArray;
exports.isDate = function(obj){return Object.prototype.toString.call(obj) === '[object Date]'};
exports.isRegExp = function(obj){return Object.prototype.toString.call(obj) === '[object RegExp]'};


exports.print = function () {};
exports.puts = function () {};
exports.debug = function() {};

exports.inspect = function(obj, showHidden, depth, colors) {
  var seen = [];

  var stylize = function(str, styleType) {
    // http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
    var styles =
        { 'bold' : [1, 22],
          'italic' : [3, 23],
          'underline' : [4, 24],
          'inverse' : [7, 27],
          'white' : [37, 39],
          'grey' : [90, 39],
          'black' : [30, 39],
          'blue' : [34, 39],
          'cyan' : [36, 39],
          'green' : [32, 39],
          'magenta' : [35, 39],
          'red' : [31, 39],
          'yellow' : [33, 39] };

    var style =
        { 'special': 'cyan',
          'number': 'blue',
          'boolean': 'yellow',
          'undefined': 'grey',
          'null': 'bold',
          'string': 'green',
          'date': 'magenta',
          // "name": intentionally not styling
          'regexp': 'red' }[styleType];

    if (style) {
      return '\u001b[' + styles[style][0] + 'm' + str +
             '\u001b[' + styles[style][1] + 'm';
    } else {
      return str;
    }
  };
  if (! colors) {
    stylize = function(str, styleType) { return str; };
  }

  function format(value, recurseTimes) {
    // Provide a hook for user-specified inspect functions.
    // Check that value is an object with an inspect function on it
    if (value && typeof value.inspect === 'function' &&
        // Filter out the util module, it's inspect function is special
        value !== exports &&
        // Also filter out any prototype objects using the circular check.
        !(value.constructor && value.constructor.prototype === value)) {
      return value.inspect(recurseTimes);
    }

    // Primitive types cannot have properties
    switch (typeof value) {
      case 'undefined':
        return stylize('undefined', 'undefined');

      case 'string':
        var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                                 .replace(/'/g, "\\'")
                                                 .replace(/\\"/g, '"') + '\'';
        return stylize(simple, 'string');

      case 'number':
        return stylize('' + value, 'number');

      case 'boolean':
        return stylize('' + value, 'boolean');
    }
    // For some reason typeof null is "object", so special case here.
    if (value === null) {
      return stylize('null', 'null');
    }

    // Look up the keys of the object.
    var visible_keys = Object_keys(value);
    var keys = showHidden ? Object_getOwnPropertyNames(value) : visible_keys;

    // Functions without properties can be shortcutted.
    if (typeof value === 'function' && keys.length === 0) {
      if (isRegExp(value)) {
        return stylize('' + value, 'regexp');
      } else {
        var name = value.name ? ': ' + value.name : '';
        return stylize('[Function' + name + ']', 'special');
      }
    }

    // Dates without properties can be shortcutted
    if (isDate(value) && keys.length === 0) {
      return stylize(value.toUTCString(), 'date');
    }

    var base, type, braces;
    // Determine the object type
    if (isArray(value)) {
      type = 'Array';
      braces = ['[', ']'];
    } else {
      type = 'Object';
      braces = ['{', '}'];
    }

    // Make functions say that they are functions
    if (typeof value === 'function') {
      var n = value.name ? ': ' + value.name : '';
      base = (isRegExp(value)) ? ' ' + value : ' [Function' + n + ']';
    } else {
      base = '';
    }

    // Make dates with properties first say the date
    if (isDate(value)) {
      base = ' ' + value.toUTCString();
    }

    if (keys.length === 0) {
      return braces[0] + base + braces[1];
    }

    if (recurseTimes < 0) {
      if (isRegExp(value)) {
        return stylize('' + value, 'regexp');
      } else {
        return stylize('[Object]', 'special');
      }
    }

    seen.push(value);

    var output = keys.map(function(key) {
      var name, str;
      if (value.__lookupGetter__) {
        if (value.__lookupGetter__(key)) {
          if (value.__lookupSetter__(key)) {
            str = stylize('[Getter/Setter]', 'special');
          } else {
            str = stylize('[Getter]', 'special');
          }
        } else {
          if (value.__lookupSetter__(key)) {
            str = stylize('[Setter]', 'special');
          }
        }
      }
      if (visible_keys.indexOf(key) < 0) {
        name = '[' + key + ']';
      }
      if (!str) {
        if (seen.indexOf(value[key]) < 0) {
          if (recurseTimes === null) {
            str = format(value[key]);
          } else {
            str = format(value[key], recurseTimes - 1);
          }
          if (str.indexOf('\n') > -1) {
            if (isArray(value)) {
              str = str.split('\n').map(function(line) {
                return '  ' + line;
              }).join('\n').substr(2);
            } else {
              str = '\n' + str.split('\n').map(function(line) {
                return '   ' + line;
              }).join('\n');
            }
          }
        } else {
          str = stylize('[Circular]', 'special');
        }
      }
      if (typeof name === 'undefined') {
        if (type === 'Array' && key.match(/^\d+$/)) {
          return str;
        }
        name = JSON.stringify('' + key);
        if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
          name = name.substr(1, name.length - 2);
          name = stylize(name, 'name');
        } else {
          name = name.replace(/'/g, "\\'")
                     .replace(/\\"/g, '"')
                     .replace(/(^"|"$)/g, "'");
          name = stylize(name, 'string');
        }
      }

      return name + ': ' + str;
    });

    seen.pop();

    var numLinesEst = 0;
    var length = output.reduce(function(prev, cur) {
      numLinesEst++;
      if (cur.indexOf('\n') >= 0) numLinesEst++;
      return prev + cur.length + 1;
    }, 0);

    if (length > 50) {
      output = braces[0] +
               (base === '' ? '' : base + '\n ') +
               ' ' +
               output.join(',\n  ') +
               ' ' +
               braces[1];

    } else {
      output = braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
    }

    return output;
  }
  return format(obj, (typeof depth === 'undefined' ? 2 : depth));
};


function isArray(ar) {
  return Array.isArray(ar) ||
         (typeof ar === 'object' && Object.prototype.toString.call(ar) === '[object Array]');
}


function isRegExp(re) {
  typeof re === 'object' && Object.prototype.toString.call(re) === '[object RegExp]';
}


function isDate(d) {
  return typeof d === 'object' && Object.prototype.toString.call(d) === '[object Date]';
}

function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}

var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}

exports.log = function (msg) {};

exports.pump = null;

var Object_keys = Object.keys || function (obj) {
    var res = [];
    for (var key in obj) res.push(key);
    return res;
};

var Object_getOwnPropertyNames = Object.getOwnPropertyNames || function (obj) {
    var res = [];
    for (var key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) res.push(key);
    }
    return res;
};

var Object_create = Object.create || function (prototype, properties) {
    // from es5-shim
    var object;
    if (prototype === null) {
        object = { '__proto__' : null };
    }
    else {
        if (typeof prototype !== 'object') {
            throw new TypeError(
                'typeof prototype[' + (typeof prototype) + '] != \'object\''
            );
        }
        var Type = function () {};
        Type.prototype = prototype;
        object = new Type();
        object.__proto__ = prototype;
    }
    if (typeof properties !== 'undefined' && Object.defineProperties) {
        Object.defineProperties(object, properties);
    }
    return object;
};

exports.inherits = function(ctor, superCtor) {
  ctor.super_ = superCtor;
  ctor.prototype = Object_create(superCtor.prototype, {
    constructor: {
      value: ctor,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
};

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (typeof f !== 'string') {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(exports.inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j': return JSON.stringify(args[i++]);
      default:
        return x;
    }
  });
  for(var x = args[i]; i < len; x = args[++i]){
    if (x === null || typeof x !== 'object') {
      str += ' ' + x;
    } else {
      str += ' ' + exports.inspect(x);
    }
  }
  return str;
};

},{"events":1}],4:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],5:[function(require,module,exports){
/**
 * Manage access to data, be it to find, update or remove it
 */
var model = require('./model')
  , _ = require('underscore')
  ;



/**
 * Create a new cursor for this collection
 * @param {Datastore} db - The datastore this cursor is bound to
 * @param {Query} query - The query this cursor will operate on
 * @param {Function} execDn - Handler to be executed after cursor has found the results and before the callback passed to find/findOne/update/remove
 */
function Cursor (db, query, execFn) {
  this.db = db;
  this.query = query || {};
  if (execFn) { this.execFn = execFn; }
}


/**
 * Set a limit to the number of results
 */
Cursor.prototype.limit = function(limit) {
  this._limit = limit;
  return this;
};


/**
 * Skip a the number of results
 */
Cursor.prototype.skip = function(skip) {
  this._skip = skip;
  return this;
};


/**
 * Sort results of the query
 * @param {SortQuery} sortQuery - SortQuery is { field: order }, field can use the dot-notation, order is 1 for ascending and -1 for descending
 */
Cursor.prototype.sort = function(sortQuery) {
  this._sort = sortQuery;
  return this;
};


/**
 * Add the use of a projection
 * @param {Object} projection - MongoDB-style projection. {} means take all fields. Then it's { key1: 1, key2: 1 } to take only key1 and key2
 *                              { key1: 0, key2: 0 } to omit only key1 and key2. Except _id, you can't mix takes and omits
 */
Cursor.prototype.projection = function(projection) {
  this._projection = projection;
  return this;
};


/**
 * Apply the projection
 */
Cursor.prototype.project = function (candidates) {
  var res = [], self = this
    , keepId, action, keys
    ;

  if (this._projection === undefined || Object.keys(this._projection).length === 0) {
    return candidates;
  }

  keepId = this._projection._id === 0 ? false : true;
  this._projection = _.omit(this._projection, '_id');

  // Check for consistency
  keys = Object.keys(this._projection);
  keys.forEach(function (k) {
    if (action !== undefined && self._projection[k] !== action) { throw "Can't both keep and omit fields except for _id"; }
    action = self._projection[k];
  });

  // Do the actual projection
  candidates.forEach(function (candidate) {
    var toPush = action === 1 ? _.pick(candidate, keys) : _.omit(candidate, keys);
    if (keepId) {
      toPush._id = candidate._id;
    } else {
      delete toPush._id;
    }
    res.push(toPush);
  });

  return res;
};


/**
 * Get all matching elements
 * Will return pointers to matched elements (shallow copies), returning full copies is the role of find or findOne
 * This is an internal function, use exec which uses the executor
 *
 * @param {Function} callback - Signature: err, results
 */
Cursor.prototype._exec = function(callback) {
  var candidates = this.db.getCandidates(this.query)
    , res = [], added = 0, skipped = 0, self = this
    , error = null
    , i, keys, key
    ;

  try {
    for (i = 0; i < candidates.length; i += 1) {
      if (model.match(candidates[i], this.query)) {
        // If a sort is defined, wait for the results to be sorted before applying limit and skip
        if (!this._sort) {
          if (this._skip && this._skip > skipped) {
            skipped += 1;
          } else {
            res.push(candidates[i]);
            added += 1;
            if (this._limit && this._limit <= added) { break; }
          }
        } else {
          res.push(candidates[i]);
        }
      }
    }
  } catch (err) {
    return callback(err);
  }

  // Apply all sorts
  if (this._sort) {
    keys = Object.keys(this._sort);

    // Sorting
    var criteria = [];
    for (i = 0; i < keys.length; i++) {
      key = keys[i];
      criteria.push({ key: key, direction: self._sort[key] });
    }
    res.sort(function(a, b) {
      var criterion, compare, i;
      for (i = 0; i < criteria.length; i++) {
        criterion = criteria[i];
        compare = criterion.direction * model.compareThings(model.getDotValue(a, criterion.key), model.getDotValue(b, criterion.key));
        if (compare !== 0) {
          return compare;
        }
      }
      return 0;
    });

    // Applying limit and skip
    var limit = this._limit || res.length
      , skip = this._skip || 0;

    res = res.slice(skip, skip + limit);
  }

  // Apply projection
  try {
    res = this.project(res);
  } catch (e) {
    error = e;
    res = undefined;
  }

  if (this.execFn) {
    return this.execFn(error, res, callback);
  } else {
    return callback(error, res);
  }
};

Cursor.prototype.exec = function () {
  this.db.executor.push({ this: this, fn: this._exec, arguments: arguments });
};



// Interface
module.exports = Cursor;

},{"./model":10,"underscore":18}],6:[function(require,module,exports){
/**
 * Specific customUtils for the browser, where we don't have access to the Crypto and Buffer modules
 */

/**
 * Taken from the crypto-browserify module
 * https://github.com/dominictarr/crypto-browserify
 * NOTE: Math.random() does not guarantee "cryptographic quality" but we actually don't need it
 */
function randomBytes (size) {
  var bytes = new Array(size);
  var r;

  for (var i = 0, r; i < size; i++) {
    if ((i & 0x03) == 0) r = Math.random() * 0x100000000;
    bytes[i] = r >>> ((i & 0x03) << 3) & 0xff;
  }

  return bytes;
}


/**
 * Taken from the base64-js module
 * https://github.com/beatgammit/base64-js/
 */
function byteArrayToBase64 (uint8) {
  var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
    , extraBytes = uint8.length % 3   // if we have 1 byte left, pad 2 bytes
    , output = ""
    , temp, length, i;

  function tripletToBase64 (num) {
    return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
  };

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
    temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2]);
    output += tripletToBase64(temp);
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  switch (extraBytes) {
    case 1:
      temp = uint8[uint8.length - 1];
      output += lookup[temp >> 2];
      output += lookup[(temp << 4) & 0x3F];
      output += '==';
      break;
    case 2:
      temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1]);
      output += lookup[temp >> 10];
      output += lookup[(temp >> 4) & 0x3F];
      output += lookup[(temp << 2) & 0x3F];
      output += '=';
      break;
  }

  return output;
}


/**
 * Return a random alphanumerical string of length len
 * There is a very small probability (less than 1/1,000,000) for the length to be less than len
 * (il the base64 conversion yields too many pluses and slashes) but
 * that's not an issue here
 * The probability of a collision is extremely small (need 3*10^12 documents to have one chance in a million of a collision)
 * See http://en.wikipedia.org/wiki/Birthday_problem
 */
function uid (len) {
  return byteArrayToBase64(randomBytes(Math.ceil(Math.max(8, len * 2)))).replace(/[+\/]/g, '').slice(0, len);
}



module.exports.uid = uid;

},{}],7:[function(require,module,exports){
var customUtils = require('./customUtils')
  , model = require('./model')
  , async = require('async')
  , Executor = require('./executor')
  , Index = require('./indexes')
  , util = require('util')
  , _ = require('underscore')
  , Persistence = require('./persistence')
  , Cursor = require('./cursor')
  ;


/**
 * Create a new collection
 * @param {String} options.filename Optional, datastore will be in-memory only if not provided
 * @param {Boolean} options.inMemoryOnly Optional, default to false
 * @param {Boolean} options.nodeWebkitAppName Optional, specify the name of your NW app if you want options.filename to be relative to the directory where
 *                                            Node Webkit stores application data such as cookies and local storage (the best place to store data in my opinion)
 * @param {Boolean} options.autoload Optional, defaults to false
 * @param {Function} options.onload Optional, if autoload is used this will be called after the load database with the error object as parameter. If you don't pass it the error will be thrown
 * @param {Function} options.afterSerialization and options.beforeDeserialization Optional, serialization hooks
 * @param {Number} options.corruptAlertThreshold Optional, threshold after which an alert is thrown if too much data is corrupt
 */
function Datastore (options) {
  var filename;

  // Retrocompatibility with v0.6 and before
  if (typeof options === 'string') {
    filename = options;
    this.inMemoryOnly = false;   // Default
  } else {
    options = options || {};
    filename = options.filename;
    this.inMemoryOnly = options.inMemoryOnly || false;
    this.autoload = options.autoload || false;
  }

  // Determine whether in memory or persistent
  if (!filename || typeof filename !== 'string' || filename.length === 0) {
    this.filename = null;
    this.inMemoryOnly = true;
  } else {
    this.filename = filename;
  }

  // Persistence handling
  this.persistence = new Persistence({ db: this, nodeWebkitAppName: options.nodeWebkitAppName
                                      , afterSerialization: options.afterSerialization
                                      , beforeDeserialization: options.beforeDeserialization
                                      , corruptAlertThreshold: options.corruptAlertThreshold
                                      });

  // This new executor is ready if we don't use persistence
  // If we do, it will only be ready once loadDatabase is called
  this.executor = new Executor();
  if (this.inMemoryOnly) { this.executor.ready = true; }

  // Indexed by field name, dot notation can be used
  // _id is always indexed and since _ids are generated randomly the underlying
  // binary is always well-balanced
  this.indexes = {};
  this.indexes._id = new Index({ fieldName: '_id', unique: true });
  
  // Queue a load of the database right away and call the onload handler
  // By default (no onload handler), if there is an error there, no operation will be possible so warn the user by throwing an exception
  if (this.autoload) { this.loadDatabase(options.onload || function (err) {
    if (err) { throw err; }
  }); }
}


/**
 * Load the database from the datafile, and trigger the execution of buffered commands if any
 */
Datastore.prototype.loadDatabase = function () {
  this.executor.push({ this: this.persistence, fn: this.persistence.loadDatabase, arguments: arguments }, true);
};


/**
 * Get an array of all the data in the database
 */
Datastore.prototype.getAllData = function () {
  return this.indexes._id.getAll();
};


/**
 * Reset all currently defined indexes
 */
Datastore.prototype.resetIndexes = function (newData) {
  var self = this;

  Object.keys(this.indexes).forEach(function (i) {
    self.indexes[i].reset(newData);
  });
};


/**
 * Ensure an index is kept for this field. Same parameters as lib/indexes
 * For now this function is synchronous, we need to test how much time it takes
 * We use an async API for consistency with the rest of the code
 * @param {String} options.fieldName
 * @param {Boolean} options.unique
 * @param {Boolean} options.sparse
 * @param {Function} cb Optional callback, signature: err
 */
Datastore.prototype.ensureIndex = function (options, cb) {
  var callback = cb || function () {};

  options = options || {};

  if (!options.fieldName) { return callback({ missingFieldName: true }); }
  if (this.indexes[options.fieldName]) { return callback(null); }

  this.indexes[options.fieldName] = new Index(options);

  try {
    this.indexes[options.fieldName].insert(this.getAllData());
  } catch (e) {
    delete this.indexes[options.fieldName];
    return callback(e);
  }

  // We may want to force all options to be persisted including defaults, not just the ones passed the index creation function
  this.persistence.persistNewState([{ $$indexCreated: options }], function (err) {
    if (err) { return callback(err); }
    return callback(null);
  });
};


/**
 * Remove an index
 * @param {String} fieldName
 * @param {Function} cb Optional callback, signature: err 
 */
Datastore.prototype.removeIndex = function (fieldName, cb) {
  var callback = cb || function () {};
  
  delete this.indexes[fieldName];
  
  this.persistence.persistNewState([{ $$indexRemoved: fieldName }], function (err) {
    if (err) { return callback(err); }
    return callback(null);
  });  
};


/**
 * Add one or several document(s) to all indexes
 */
Datastore.prototype.addToIndexes = function (doc) {
  var i, failingIndex, error
    , keys = Object.keys(this.indexes)
    ;

  for (i = 0; i < keys.length; i += 1) {
    try {
      this.indexes[keys[i]].insert(doc);
    } catch (e) {
      failingIndex = i;
      error = e;
      break;
    }
  }

  // If an error happened, we need to rollback the insert on all other indexes
  if (error) {
    for (i = 0; i < failingIndex; i += 1) {
      this.indexes[keys[i]].remove(doc);
    }

    throw error;
  }
};


/**
 * Remove one or several document(s) from all indexes
 */
Datastore.prototype.removeFromIndexes = function (doc) {
  var self = this;

  Object.keys(this.indexes).forEach(function (i) {
    self.indexes[i].remove(doc);
  });
};


/**
 * Update one or several documents in all indexes
 * To update multiple documents, oldDoc must be an array of { oldDoc, newDoc } pairs
 * If one update violates a constraint, all changes are rolled back
 */
Datastore.prototype.updateIndexes = function (oldDoc, newDoc) {
  var i, failingIndex, error
    , keys = Object.keys(this.indexes)
    ;

  for (i = 0; i < keys.length; i += 1) {
    try {
      this.indexes[keys[i]].update(oldDoc, newDoc);
    } catch (e) {
      failingIndex = i;
      error = e;
      break;
    }
  }

  // If an error happened, we need to rollback the update on all other indexes
  if (error) {
    for (i = 0; i < failingIndex; i += 1) {
      this.indexes[keys[i]].revertUpdate(oldDoc, newDoc);
    }

    throw error;
  }
};


/**
 * Return the list of candidates for a given query
 * Crude implementation for now, we return the candidates given by the first usable index if any
 * We try the following query types, in this order: basic match, $in match, comparison match
 * One way to make it better would be to enable the use of multiple indexes if the first usable index
 * returns too much data. I may do it in the future.
 *
 * TODO: needs to be moved to the Cursor module
 */
Datastore.prototype.getCandidates = function (query) {
  var indexNames = Object.keys(this.indexes)
    , usableQueryKeys;

  // For a basic match
  usableQueryKeys = [];
  Object.keys(query).forEach(function (k) {
    if (typeof query[k] === 'string' || typeof query[k] === 'number' || typeof query[k] === 'boolean' || util.isDate(query[k]) || query[k] === null) {
      usableQueryKeys.push(k);
    }
  });
  usableQueryKeys = _.intersection(usableQueryKeys, indexNames);
  if (usableQueryKeys.length > 0) {
    return this.indexes[usableQueryKeys[0]].getMatching(query[usableQueryKeys[0]]);
  }

  // For a $in match
  usableQueryKeys = [];
  Object.keys(query).forEach(function (k) {
    if (query[k] && query[k].hasOwnProperty('$in')) {
      usableQueryKeys.push(k);
    }
  });
  usableQueryKeys = _.intersection(usableQueryKeys, indexNames);
  if (usableQueryKeys.length > 0) {
    return this.indexes[usableQueryKeys[0]].getMatching(query[usableQueryKeys[0]].$in);
  }

  // For a comparison match
  usableQueryKeys = [];
  Object.keys(query).forEach(function (k) {
    if (query[k] && (query[k].hasOwnProperty('$lt') || query[k].hasOwnProperty('$lte') || query[k].hasOwnProperty('$gt') || query[k].hasOwnProperty('$gte'))) {
      usableQueryKeys.push(k);
    }
  });
  usableQueryKeys = _.intersection(usableQueryKeys, indexNames);
  if (usableQueryKeys.length > 0) {
    return this.indexes[usableQueryKeys[0]].getBetweenBounds(query[usableQueryKeys[0]]);
  }

  // By default, return all the DB data
  return this.getAllData();
};


/**
 * Insert a new document
 * @param {Function} cb Optional callback, signature: err, insertedDoc
 *
 * @api private Use Datastore.insert which has the same signature
 */
Datastore.prototype._insert = function (newDoc, cb) {
  var callback = cb || function () {}
    ;

  try {
    this._insertInCache(newDoc);
  } catch (e) {
    return callback(e);
  }

  this.persistence.persistNewState(util.isArray(newDoc) ? newDoc : [newDoc], function (err) {
    if (err) { return callback(err); }
    return callback(null, newDoc);
  });
};

/**
 * Create a new _id that's not already in use
 */
Datastore.prototype.createNewId = function () {
  var tentativeId = customUtils.uid(16);
  // Try as many times as needed to get an unused _id. As explained in customUtils, the probability of this ever happening is extremely small, so this is O(1)
  if (this.indexes._id.getMatching(tentativeId).length > 0) {
    tentativeId = this.createNewId();
  }
  return tentativeId;
};

/**
 * Prepare a document (or array of documents) to be inserted in a database
 * @api private
 */
Datastore.prototype.prepareDocumentForInsertion = function (newDoc) {
  var preparedDoc, self = this;

  if (util.isArray(newDoc)) {
    preparedDoc = [];
    newDoc.forEach(function (doc) { preparedDoc.push(self.prepareDocumentForInsertion(doc)); });
  } else {
    if (newDoc._id === undefined) {
      newDoc._id = this.createNewId();
    }
    preparedDoc = model.deepCopy(newDoc);
    model.checkObject(preparedDoc);
  }
  
  return preparedDoc;
};

/**
 * If newDoc is an array of documents, this will insert all documents in the cache
 * @api private
 */
Datastore.prototype._insertInCache = function (newDoc) {
  if (util.isArray(newDoc)) {
    this._insertMultipleDocsInCache(newDoc);
  } else {
    this.addToIndexes(this.prepareDocumentForInsertion(newDoc));  
  }
};

/**
 * If one insertion fails (e.g. because of a unique constraint), roll back all previous
 * inserts and throws the error
 * @api private
 */
Datastore.prototype._insertMultipleDocsInCache = function (newDocs) {
  var i, failingI, error
    , preparedDocs = this.prepareDocumentForInsertion(newDocs)
    ;

  for (i = 0; i < preparedDocs.length; i += 1) {
    try {
      this.addToIndexes(preparedDocs[i]);
    } catch (e) {
      error = e;
      failingI = i;
      break;
    }
  }
  
  if (error) {
    for (i = 0; i < failingI; i += 1) {
      this.removeFromIndexes(preparedDocs[i]);
    }
    
    throw error;
  }
};

Datastore.prototype.insert = function () {
  this.executor.push({ this: this, fn: this._insert, arguments: arguments });
};


/**
 * Count all documents matching the query
 * @param {Object} query MongoDB-style query
 */
Datastore.prototype.count = function(query, callback) {
  var cursor = new Cursor(this, query, function(err, docs, callback) {
    if (err) { return callback(err); }
    return callback(null, docs.length);
  });

  if (typeof callback === 'function') {
    cursor.exec(callback);
  } else {
    return cursor;
  }
};


/**
 * Find all documents matching the query
 * If no callback is passed, we return the cursor so that user can limit, skip and finally exec
 * @param {Object} query MongoDB-style query
 * @param {Object} projection MongoDB-style projection
 */
Datastore.prototype.find = function (query, projection, callback) {
  switch (arguments.length) {
    case 1:
      projection = {};
      // callback is undefined, will return a cursor
      break;
    case 2:
      if (typeof projection === 'function') {
        callback = projection;
        projection = {};
      }   // If not assume projection is an object and callback undefined
      break;
  }

  var cursor = new Cursor(this, query, function(err, docs, callback) {
    var res = [], i;

    if (err) { return callback(err); }

    for (i = 0; i < docs.length; i += 1) {
      res.push(model.deepCopy(docs[i]));
    }
    return callback(null, res);
  });

  cursor.projection(projection);
  if (typeof callback === 'function') {
    cursor.exec(callback);
  } else {
    return cursor;
  }
};


/**
 * Find one document matching the query
 * @param {Object} query MongoDB-style query
 * @param {Object} projection MongoDB-style projection
 */
Datastore.prototype.findOne = function (query, projection, callback) {
  switch (arguments.length) {
    case 1:
      projection = {};
      // callback is undefined, will return a cursor
      break;
    case 2:
      if (typeof projection === 'function') {
        callback = projection;
        projection = {};
      }   // If not assume projection is an object and callback undefined
      break;
  }

  var cursor = new Cursor(this, query, function(err, docs, callback) {
    if (err) { return callback(err); }
    if (docs.length === 1) {
      return callback(null, model.deepCopy(docs[0]));
    } else {
      return callback(null, null);
    }
  });

  cursor.projection(projection).limit(1);
  if (typeof callback === 'function') {
    cursor.exec(callback);
  } else {
    return cursor;
  }
};


/**
 * Update all docs matching query
 * For now, very naive implementation (recalculating the whole database)
 * @param {Object} query
 * @param {Object} updateQuery
 * @param {Object} options Optional options
 *                 options.multi If true, can update multiple documents (defaults to false)
 *                 options.upsert If true, document is inserted if the query doesn't match anything
 * @param {Function} cb Optional callback, signature: err, numReplaced, upsert (set to true if the update was in fact an upsert)
 *
 * @api private Use Datastore.update which has the same signature
 */
Datastore.prototype._update = function (query, updateQuery, options, cb) {
  var callback
    , self = this
    , numReplaced = 0
    , multi, upsert
    , i
    ;

  if (typeof options === 'function') { cb = options; options = {}; }
  callback = cb || function () {};
  multi = options.multi !== undefined ? options.multi : false;
  upsert = options.upsert !== undefined ? options.upsert : false;

  async.waterfall([
  function (cb) {   // If upsert option is set, check whether we need to insert the doc
    if (!upsert) { return cb(); }

    // Need to use an internal function not tied to the executor to avoid deadlock
    var cursor = new Cursor(self, query);
    cursor.limit(1)._exec(function (err, docs) {
      if (err) { return callback(err); }
      if (docs.length === 1) {
        return cb();
      } else {
        var toBeInserted;
        
        try {
          model.checkObject(updateQuery);
          // updateQuery is a simple object with no modifier, use it as the document to insert
          toBeInserted = updateQuery;
        } catch (e) {
          // updateQuery contains modifiers, use the find query as the base,
          // strip it from all operators and update it according to updateQuery
          try {
            toBeInserted = model.modify(model.deepCopy(query, true), updateQuery);
          } catch (err) {
            return callback(err);
          }
        }

        return self._insert(toBeInserted, function (err, newDoc) {
          if (err) { return callback(err); }
          return callback(null, 1, newDoc);
        });
      }
    });
  }
  , function () {   // Perform the update
    var modifiedDoc
	  , candidates = self.getCandidates(query)
	  , modifications = []
	  ;

	// Preparing update (if an error is thrown here neither the datafile nor
	// the in-memory indexes are affected)
    try {
      for (i = 0; i < candidates.length; i += 1) {
        if (model.match(candidates[i], query) && (multi || numReplaced === 0)) {
          numReplaced += 1;
          modifiedDoc = model.modify(candidates[i], updateQuery);
          modifications.push({ oldDoc: candidates[i], newDoc: modifiedDoc });
        }
      }
    } catch (err) {
      return callback(err);
    }
	
	// Change the docs in memory
	try {
      self.updateIndexes(modifications);
	} catch (err) {
	  return callback(err);
	}

	// Update the datafile
    self.persistence.persistNewState(_.pluck(modifications, 'newDoc'), function (err) {
      if (err) { return callback(err); }
      return callback(null, numReplaced);
    });
  }
  ]);
};
Datastore.prototype.update = function () {
  this.executor.push({ this: this, fn: this._update, arguments: arguments });
};


/**
 * Remove all docs matching the query
 * For now very naive implementation (similar to update)
 * @param {Object} query
 * @param {Object} options Optional options
 *                 options.multi If true, can update multiple documents (defaults to false)
 * @param {Function} cb Optional callback, signature: err, numRemoved
 *
 * @api private Use Datastore.remove which has the same signature
 */
Datastore.prototype._remove = function (query, options, cb) {
  var callback
    , self = this
    , numRemoved = 0
    , multi
    , removedDocs = []
    , candidates = this.getCandidates(query)
    ;

  if (typeof options === 'function') { cb = options; options = {}; }
  callback = cb || function () {};
  multi = options.multi !== undefined ? options.multi : false;

  try {
    candidates.forEach(function (d) {
      if (model.match(d, query) && (multi || numRemoved === 0)) {
        numRemoved += 1;
        removedDocs.push({ $$deleted: true, _id: d._id });
        self.removeFromIndexes(d);
      }
    });
  } catch (err) { return callback(err); }

  self.persistence.persistNewState(removedDocs, function (err) {
    if (err) { return callback(err); }
    return callback(null, numRemoved);
  });
};
Datastore.prototype.remove = function () {
  this.executor.push({ this: this, fn: this._remove, arguments: arguments });
};






module.exports = Datastore;

},{"./cursor":5,"./customUtils":6,"./executor":8,"./indexes":9,"./model":10,"./persistence":11,"async":13,"underscore":18,"util":3}],8:[function(require,module,exports){
var process=require("__browserify_process");/**
 * Responsible for sequentially executing actions on the database
 */

var async = require('async')
  ;

function Executor () {
  this.buffer = [];
  this.ready = false;

  // This queue will execute all commands, one-by-one in order
  this.queue = async.queue(function (task, cb) {
    var callback
      , lastArg = task.arguments[task.arguments.length - 1]
      , i, newArguments = []
      ;

    // task.arguments is an array-like object on which adding a new field doesn't work, so we transform it into a real array
    for (i = 0; i < task.arguments.length; i += 1) { newArguments.push(task.arguments[i]); }

    // Always tell the queue task is complete. Execute callback if any was given.
    if (typeof lastArg === 'function') {
      callback = function () {
        if (typeof setImmediate === 'function') {
           setImmediate(cb);
        } else {
          process.nextTick(cb);
        }
        lastArg.apply(null, arguments);
      };

      newArguments[newArguments.length - 1] = callback;
    } else {
      callback = function () { cb(); };
      newArguments.push(callback);
    }


    task.fn.apply(task.this, newArguments);
  }, 1);
}


/**
 * If executor is ready, queue task (and process it immediately if executor was idle)
 * If not, buffer task for later processing
 * @param {Object} task
 *                 task.this - Object to use as this
 *                 task.fn - Function to execute
 *                 task.arguments - Array of arguments
 * @param {Boolean} forceQueuing Optional (defaults to false) force executor to queue task even if it is not ready
 */
Executor.prototype.push = function (task, forceQueuing) {
  if (this.ready || forceQueuing) {
    this.queue.push(task);
  } else {
    this.buffer.push(task);
  }
};


/**
 * Queue all tasks in buffer (in the same order they came in)
 * Automatically sets executor as ready
 */
Executor.prototype.processBuffer = function () {
  var i;
  this.ready = true;
  for (i = 0; i < this.buffer.length; i += 1) { this.queue.push(this.buffer[i]); }
  this.buffer = [];
};



// Interface
module.exports = Executor;

},{"__browserify_process":4,"async":13}],9:[function(require,module,exports){
var BinarySearchTree = require('binary-search-tree').AVLTree
  , model = require('./model')
  , _ = require('underscore')
  , util = require('util')
  ;

/**
 * Two indexed pointers are equal iif they point to the same place
 */
function checkValueEquality (a, b) {
  return a === b;
}

/**
 * Type-aware projection
 */
function projectForUnique (elt) {
  if (elt === null) { return '$null'; }
  if (typeof elt === 'string') { return '$string' + elt; }
  if (typeof elt === 'boolean') { return '$boolean' + elt; }
  if (typeof elt === 'number') { return '$number' + elt; }
  if (util.isArray(elt)) { return '$date' + elt.getTime(); }
  
  return elt;   // Arrays and objects, will check for pointer equality
}


/**
 * Create a new index
 * All methods on an index guarantee that either the whole operation was successful and the index changed
 * or the operation was unsuccessful and an error is thrown while the index is unchanged
 * @param {String} options.fieldName On which field should the index apply (can use dot notation to index on sub fields)
 * @param {Boolean} options.unique Optional, enforce a unique constraint (default: false)
 * @param {Boolean} options.sparse Optional, allow a sparse index (we can have documents for which fieldName is undefined) (default: false)
 */
function Index (options) {
  this.fieldName = options.fieldName;
  this.unique = options.unique || false;
  this.sparse = options.sparse || false;

  this.treeOptions = { unique: this.unique, compareKeys: model.compareThings, checkValueEquality: checkValueEquality };

  this.reset();   // No data in the beginning
}


/**
 * Reset an index
 * @param {Document or Array of documents} newData Optional, data to initialize the index with
 *                                                 If an error is thrown during insertion, the index is not modified
 */
Index.prototype.reset = function (newData) {
  this.tree = new BinarySearchTree(this.treeOptions);

  if (newData) { this.insert(newData); }
};


/**
 * Insert a new document in the index
 * If an array is passed, we insert all its elements (if one insertion fails the index is not modified)
 * O(log(n))
 */
Index.prototype.insert = function (doc) {
  var key, self = this
    , keys, i, failingI, error
    ;

  if (util.isArray(doc)) { this.insertMultipleDocs(doc); return; }

  key = model.getDotValue(doc, this.fieldName);

  // We don't index documents that don't contain the field if the index is sparse
  if (key === undefined && this.sparse) { return; }

  if (!util.isArray(key)) {
    this.tree.insert(key, doc);
  } else {
    // If an insert fails due to a unique constraint, roll back all inserts before it
    keys = _.uniq(key, projectForUnique);

    for (i = 0; i < keys.length; i += 1) {
      try {
        this.tree.insert(keys[i], doc);
      } catch (e) {
        error = e;
        failingI = i;
        break;
      }
    }
    
    if (error) {
      for (i = 0; i < failingI; i += 1) {
        this.tree.delete(keys[i], doc);
      }
      
      throw error;
    }
  }
};


/**
 * Insert an array of documents in the index
 * If a constraint is violated, the changes should be rolled back and an error thrown
 *
 * @API private
 */
Index.prototype.insertMultipleDocs = function (docs) {
  var i, error, failingI;

  for (i = 0; i < docs.length; i += 1) {
    try {
      this.insert(docs[i]);
    } catch (e) {
      error = e;
      failingI = i;
      break;
    }
  }

  if (error) {
    for (i = 0; i < failingI; i += 1) {
      this.remove(docs[i]);
    }

    throw error;
  }
};


/**
 * Remove a document from the index
 * If an array is passed, we remove all its elements
 * The remove operation is safe with regards to the 'unique' constraint
 * O(log(n))
 */
Index.prototype.remove = function (doc) {
  var key, self = this;

  if (util.isArray(doc)) { doc.forEach(function (d) { self.remove(d); }); return; }

  key = model.getDotValue(doc, this.fieldName);

  if (key === undefined && this.sparse) { return; }

  if (!util.isArray(key)) {
    this.tree.delete(key, doc);
  } else {
    _.uniq(key, projectForUnique).forEach(function (_key) {
      self.tree.delete(_key, doc);
    });
  }
};


/**
 * Update a document in the index
 * If a constraint is violated, changes are rolled back and an error thrown
 * Naive implementation, still in O(log(n))
 */
Index.prototype.update = function (oldDoc, newDoc) {
  if (util.isArray(oldDoc)) { this.updateMultipleDocs(oldDoc); return; }

  this.remove(oldDoc);

  try {
    this.insert(newDoc);
  } catch (e) {
    this.insert(oldDoc);
    throw e;
  }
};


/**
 * Update multiple documents in the index
 * If a constraint is violated, the changes need to be rolled back
 * and an error thrown
 * @param {Array of oldDoc, newDoc pairs} pairs
 *
 * @API private
 */
Index.prototype.updateMultipleDocs = function (pairs) {
  var i, failingI, error;

  for (i = 0; i < pairs.length; i += 1) {
    this.remove(pairs[i].oldDoc);
  }

  for (i = 0; i < pairs.length; i += 1) {
    try {
      this.insert(pairs[i].newDoc);
    } catch (e) {
      error = e;
      failingI = i;
      break;
    }
  }

  // If an error was raised, roll back changes in the inverse order
  if (error) {
    for (i = 0; i < failingI; i += 1) {
      this.remove(pairs[i].newDoc);
    }

    for (i = 0; i < pairs.length; i += 1) {
      this.insert(pairs[i].oldDoc);
    }

    throw error;
  }
};


/**
 * Revert an update
 */
Index.prototype.revertUpdate = function (oldDoc, newDoc) {
  var revert = [];

  if (!util.isArray(oldDoc)) {
    this.update(newDoc, oldDoc);
  } else {
    oldDoc.forEach(function (pair) {
      revert.push({ oldDoc: pair.newDoc, newDoc: pair.oldDoc });
    });
    this.update(revert);
  }
};


// Append all elements in toAppend to array
function append (array, toAppend) {
  var i;

  for (i = 0; i < toAppend.length; i += 1) {
    array.push(toAppend[i]);
  }
}


/**
 * Get all documents in index whose key match value (if it is a Thing) or one of the elements of value (if it is an array of Things)
 * @param {Thing} value Value to match the key against
 * @return {Array of documents}
 */
Index.prototype.getMatching = function (value) {
  var res, self = this;

  if (!util.isArray(value)) {
    return this.tree.search(value);
  } else {
    res = [];
    value.forEach(function (v) { append(res, self.getMatching(v)); });
    return res;
  }
};


/**
 * Get all documents in index whose key is between bounds are they are defined by query
 * Documents are sorted by key
 * @param {Query} query
 * @return {Array of documents}
 */
Index.prototype.getBetweenBounds = function (query) {
  return this.tree.betweenBounds(query);
};


/**
 * Get all elements in the index
 * @return {Array of documents}
 */
Index.prototype.getAll = function () {
  var res = [];

  this.tree.executeOnEveryNode(function (node) {
    var i;

    for (i = 0; i < node.data.length; i += 1) {
      res.push(node.data[i]);
    }
  });

  return res;
};




// Interface
module.exports = Index;

},{"./model":10,"binary-search-tree":14,"underscore":18,"util":3}],10:[function(require,module,exports){
/**
 * Handle models (i.e. docs)
 * Serialization/deserialization
 * Copying
 * Querying, update
 */

var util = require('util')
  , _ = require('underscore')
  , modifierFunctions = {}
  , lastStepModifierFunctions = {}
  , comparisonFunctions = {}
  , logicalOperators = {}
  , arrayComparisonFunctions = {}
  ;


/**
 * Check a key, throw an error if the key is non valid
 * @param {String} k key
 * @param {Model} v value, needed to treat the Date edge case
 * Non-treatable edge cases here: if part of the object if of the form { $$date: number } or { $$deleted: true }
 * Its serialized-then-deserialized version it will transformed into a Date object
 * But you really need to want it to trigger such behaviour, even when warned not to use '$' at the beginning of the field names...
 */
function checkKey (k, v) {
  if (k[0] === '$' && !(k === '$$date' && typeof v === 'number') && !(k === '$$deleted' && v === true) && !(k === '$$indexCreated') && !(k === '$$indexRemoved')) {
    throw 'Field names cannot begin with the $ character';
  }

  if (k.indexOf('.') !== -1) {
    throw 'Field names cannot contain a .';
  }
}


/**
 * Check a DB object and throw an error if it's not valid
 * Works by applying the above checkKey function to all fields recursively
 */
function checkObject (obj) {
  if (util.isArray(obj)) {
    obj.forEach(function (o) {
      checkObject(o);
    });
  }

  if (typeof obj === 'object' && obj !== null) {
    Object.keys(obj).forEach(function (k) {
      checkKey(k, obj[k]);
      checkObject(obj[k]);
    });
  }
}


/**
 * Serialize an object to be persisted to a one-line string
 * For serialization/deserialization, we use the native JSON parser and not eval or Function
 * That gives us less freedom but data entered in the database may come from users
 * so eval and the like are not safe
 * Accepted primitive types: Number, String, Boolean, Date, null
 * Accepted secondary types: Objects, Arrays
 */
function serialize (obj) {
  var res;
  
  res = JSON.stringify(obj, function (k, v) {
    checkKey(k, v);
    
    if (v === undefined) { return undefined; }
    if (v === null) { return null; }

    // Hackish way of checking if object is Date (this way it works between execution contexts in node-webkit).
    // We can't use value directly because for dates it is already string in this function (date.toJSON was already called), so we use this
    if (typeof this[k].getTime === 'function') { return { $$date: this[k].getTime() }; }

    return v;
  });

  return res;
}


/**
 * From a one-line representation of an object generate by the serialize function
 * Return the object itself
 */
function deserialize (rawData) {
  return JSON.parse(rawData, function (k, v) {
    if (k === '$$date') { return new Date(v); }
    if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean' || v === null) { return v; }
    if (v && v.$$date) { return v.$$date; }

    return v;
  });
}


/**
 * Deep copy a DB object
 * The optional strictKeys flag (defaulting to false) indicates whether to copy everything or only fields
 * where the keys are valid, i.e. don't begin with $ and don't contain a .
 */
function deepCopy (obj, strictKeys) {
  var res;

  if ( typeof obj === 'boolean' ||
       typeof obj === 'number' ||
       typeof obj === 'string' ||
       obj === null ||
       (util.isDate(obj)) ) {
    return obj;
  }

  if (util.isArray(obj)) {
    res = [];
    obj.forEach(function (o) { res.push(deepCopy(o, strictKeys)); });
    return res;
  }

  if (typeof obj === 'object') {
    res = {};
    Object.keys(obj).forEach(function (k) {
      if (!strictKeys || (k[0] !== '$' && k.indexOf('.') === -1)) {
        res[k] = deepCopy(obj[k], strictKeys);
      }
    });
    return res;
  }

  return undefined;   // For now everything else is undefined. We should probably throw an error instead
}


/**
 * Tells if an object is a primitive type or a "real" object
 * Arrays are considered primitive
 */
function isPrimitiveType (obj) {
  return ( typeof obj === 'boolean' ||
       typeof obj === 'number' ||
       typeof obj === 'string' ||
       obj === null ||
       util.isDate(obj) ||
       util.isArray(obj));
}


/**
 * Utility functions for comparing things
 * Assumes type checking was already done (a and b already have the same type)
 * compareNSB works for numbers, strings and booleans
 */
function compareNSB (a, b) {
  if (a < b) { return -1; }
  if (a > b) { return 1; }
  return 0;
}

function compareArrays (a, b) {
  var i, comp;

  for (i = 0; i < Math.min(a.length, b.length); i += 1) {
    comp = compareThings(a[i], b[i]);

    if (comp !== 0) { return comp; }
  }

  // Common section was identical, longest one wins
  return compareNSB(a.length, b.length);
}


/**
 * Compare { things U undefined }
 * Things are defined as any native types (string, number, boolean, null, date) and objects
 * We need to compare with undefined as it will be used in indexes
 * In the case of objects and arrays, we deep-compare
 * If two objects dont have the same type, the (arbitrary) type hierarchy is: undefined, null, number, strings, boolean, dates, arrays, objects
 * Return -1 if a < b, 1 if a > b and 0 if a = b (note that equality here is NOT the same as defined in areThingsEqual!)
 */
function compareThings (a, b) {
  var aKeys, bKeys, comp, i;

  // undefined
  if (a === undefined) { return b === undefined ? 0 : -1; }
  if (b === undefined) { return a === undefined ? 0 : 1; }

  // null
  if (a === null) { return b === null ? 0 : -1; }
  if (b === null) { return a === null ? 0 : 1; }

  // Numbers
  if (typeof a === 'number') { return typeof b === 'number' ? compareNSB(a, b) : -1; }
  if (typeof b === 'number') { return typeof a === 'number' ? compareNSB(a, b) : 1; }

  // Strings
  if (typeof a === 'string') { return typeof b === 'string' ? compareNSB(a, b) : -1; }
  if (typeof b === 'string') { return typeof a === 'string' ? compareNSB(a, b) : 1; }

  // Booleans
  if (typeof a === 'boolean') { return typeof b === 'boolean' ? compareNSB(a, b) : -1; }
  if (typeof b === 'boolean') { return typeof a === 'boolean' ? compareNSB(a, b) : 1; }

  // Dates
  if (util.isDate(a)) { return util.isDate(b) ? compareNSB(a.getTime(), b.getTime()) : -1; }
  if (util.isDate(b)) { return util.isDate(a) ? compareNSB(a.getTime(), b.getTime()) : 1; }

  // Arrays (first element is most significant and so on)
  if (util.isArray(a)) { return util.isArray(b) ? compareArrays(a, b) : -1; }
  if (util.isArray(b)) { return util.isArray(a) ? compareArrays(a, b) : 1; }

  // Objects
  aKeys = Object.keys(a).sort();
  bKeys = Object.keys(b).sort();

  for (i = 0; i < Math.min(aKeys.length, bKeys.length); i += 1) {
    comp = compareThings(a[aKeys[i]], b[bKeys[i]]);

    if (comp !== 0) { return comp; }
  }

  return compareNSB(aKeys.length, bKeys.length);
}



// ==============================================================
// Updating documents
// ==============================================================

/**
 * The signature of modifier functions is as follows
 * Their structure is always the same: recursively follow the dot notation while creating
 * the nested documents if needed, then apply the "last step modifier"
 * @param {Object} obj The model to modify
 * @param {String} field Can contain dots, in that case that means we will set a subfield recursively
 * @param {Model} value
 */

/**
 * Set a field to a new value
 */
lastStepModifierFunctions.$set = function (obj, field, value) {
  obj[field] = value;
};


/**
 * Unset a field
 */
lastStepModifierFunctions.$unset = function (obj, field, value) {
  delete obj[field];
};


/**
 * Push an element to the end of an array field
 */
lastStepModifierFunctions.$push = function (obj, field, value) {
  // Create the array if it doesn't exist
  if (!obj.hasOwnProperty(field)) { obj[field] = []; }

  if (!util.isArray(obj[field])) { throw "Can't $push an element on non-array values"; }

  if (value !== null && typeof value === 'object' && value.$each) {
    if (Object.keys(value).length > 1) { throw "Can't use another field in conjunction with $each"; }
    if (!util.isArray(value.$each)) { throw "$each requires an array value"; }

    value.$each.forEach(function (v) {
      obj[field].push(v);
    });
  } else {
    obj[field].push(value);
  }
};


/**
 * Add an element to an array field only if it is not already in it
 * No modification if the element is already in the array
 * Note that it doesn't check whether the original array contains duplicates
 */
lastStepModifierFunctions.$addToSet = function (obj, field, value) {
  var addToSet = true;

  // Create the array if it doesn't exist
  if (!obj.hasOwnProperty(field)) { obj[field] = []; }

  if (!util.isArray(obj[field])) { throw "Can't $addToSet an element on non-array values"; }

  if (value !== null && typeof value === 'object' && value.$each) {
    if (Object.keys(value).length > 1) { throw "Can't use another field in conjunction with $each"; }
    if (!util.isArray(value.$each)) { throw "$each requires an array value"; }

    value.$each.forEach(function (v) {
      lastStepModifierFunctions.$addToSet(obj, field, v);
    });
  } else {
    obj[field].forEach(function (v) {
      if (compareThings(v, value) === 0) { addToSet = false; }
    });
    if (addToSet) { obj[field].push(value); }
  }
};


/**
 * Remove the first or last element of an array
 */
lastStepModifierFunctions.$pop = function (obj, field, value) {
  if (!util.isArray(obj[field])) { throw "Can't $pop an element from non-array values"; }
  if (typeof value !== 'number') { throw value + " isn't an integer, can't use it with $pop"; }
  if (value === 0) { return; }

  if (value > 0) {
    obj[field] = obj[field].slice(0, obj[field].length - 1);
  } else {
    obj[field] = obj[field].slice(1);
  }
};


/**
 * Removes all instances of a value from an existing array
 */
lastStepModifierFunctions.$pull = function (obj, field, value) {
  var arr, i;
  
  if (!util.isArray(obj[field])) { throw "Can't $pull an element from non-array values"; }

  arr = obj[field];
  for (i = arr.length - 1; i >= 0; i -= 1) {
    if (match(arr[i], value)) {
      arr.splice(i, 1);
    }
  }
};


/**
 * Increment a numeric field's value
 */
lastStepModifierFunctions.$inc = function (obj, field, value) {
  if (typeof value !== 'number') { throw value + " must be a number"; }

  if (typeof obj[field] !== 'number') {
    if (!_.has(obj, field)) {
      obj[field] = value;
    } else {
      throw "Don't use the $inc modifier on non-number fields";
    }
  } else {
    obj[field] += value;
  }
};

// Given its name, create the complete modifier function
function createModifierFunction (modifier) {
  return function (obj, field, value) {
    var fieldParts = typeof field === 'string' ? field.split('.') : field;

    if (fieldParts.length === 1) {
      lastStepModifierFunctions[modifier](obj, field, value);
    } else {
      obj[fieldParts[0]] = obj[fieldParts[0]] || {};
      modifierFunctions[modifier](obj[fieldParts[0]], fieldParts.slice(1), value);
    }
  };
}

// Actually create all modifier functions
Object.keys(lastStepModifierFunctions).forEach(function (modifier) {
  modifierFunctions[modifier] = createModifierFunction(modifier);
});


/**
 * Modify a DB object according to an update query
 */
function modify (obj, updateQuery) {
  var keys = Object.keys(updateQuery)
    , firstChars = _.map(keys, function (item) { return item[0]; })
    , dollarFirstChars = _.filter(firstChars, function (c) { return c === '$'; })
    , newDoc, modifiers
    ;

  if (keys.indexOf('_id') !== -1 && updateQuery._id !== obj._id) { throw "You cannot change a document's _id"; }

  if (dollarFirstChars.length !== 0 && dollarFirstChars.length !== firstChars.length) {
    throw "You cannot mix modifiers and normal fields";
  }

  if (dollarFirstChars.length === 0) {
    // Simply replace the object with the update query contents
    newDoc = deepCopy(updateQuery);
    newDoc._id = obj._id;
  } else {
    // Apply modifiers
    modifiers = _.uniq(keys);
    newDoc = deepCopy(obj);
    modifiers.forEach(function (m) {
      var keys;

      if (!modifierFunctions[m]) { throw "Unknown modifier " + m; }

      try {
        keys = Object.keys(updateQuery[m]);
      } catch (e) {
        throw "Modifier " + m + "'s argument must be an object";
      }

      keys.forEach(function (k) {
        modifierFunctions[m](newDoc, k, updateQuery[m][k]);
      });
    });
  }

  // Check result is valid and return it
  checkObject(newDoc);
  
  if (obj._id !== newDoc._id) { throw "You can't change a document's _id"; }
  return newDoc;
};


// ==============================================================
// Finding documents
// ==============================================================

/**
 * Get a value from object with dot notation
 * @param {Object} obj
 * @param {String} field
 */
function getDotValue (obj, field) {
  var fieldParts = typeof field === 'string' ? field.split('.') : field
    , i, objs;

  if (!obj) { return undefined; }   // field cannot be empty so that means we should return undefined so that nothing can match

  if (fieldParts.length === 0) { return obj; }

  if (fieldParts.length === 1) { return obj[fieldParts[0]]; }
  
  if (util.isArray(obj[fieldParts[0]])) {
    // If the next field is an integer, return only this item of the array
    i = parseInt(fieldParts[1], 10);
    if (typeof i === 'number' && !isNaN(i)) {
      return getDotValue(obj[fieldParts[0]][i], fieldParts.slice(2))
    }

    // Return the array of values
    objs = new Array();
    for (i = 0; i < obj[fieldParts[0]].length; i += 1) {
       objs.push(getDotValue(obj[fieldParts[0]][i], fieldParts.slice(1)));
    }
    return objs;
  } else {
    return getDotValue(obj[fieldParts[0]], fieldParts.slice(1));
  }
}


/**
 * Check whether 'things' are equal
 * Things are defined as any native types (string, number, boolean, null, date) and objects
 * In the case of object, we check deep equality
 * Returns true if they are, false otherwise
 */
function areThingsEqual (a, b) {
  var aKeys , bKeys , i;

  // Strings, booleans, numbers, null
  if (a === null || typeof a === 'string' || typeof a === 'boolean' || typeof a === 'number' ||
      b === null || typeof b === 'string' || typeof b === 'boolean' || typeof b === 'number') { return a === b; }

  // Dates
  if (util.isDate(a) || util.isDate(b)) { return util.isDate(a) && util.isDate(b) && a.getTime() === b.getTime(); }

  // Arrays (no match since arrays are used as a $in)
  // undefined (no match since they mean field doesn't exist and can't be serialized)
  if (util.isArray(a) || util.isArray(b) || a === undefined || b === undefined) { return false; }

  // General objects (check for deep equality)
  // a and b should be objects at this point
  try {
    aKeys = Object.keys(a);
    bKeys = Object.keys(b);
  } catch (e) {
    return false;
  }

  if (aKeys.length !== bKeys.length) { return false; }
  for (i = 0; i < aKeys.length; i += 1) {
    if (bKeys.indexOf(aKeys[i]) === -1) { return false; }
    if (!areThingsEqual(a[aKeys[i]], b[aKeys[i]])) { return false; }
  }
  return true;
}


/**
 * Check that two values are comparable
 */
function areComparable (a, b) {
  if (typeof a !== 'string' && typeof a !== 'number' && !util.isDate(a) &&
      typeof b !== 'string' && typeof b !== 'number' && !util.isDate(b)) {
    return false;
  }

  if (typeof a !== typeof b) { return false; }

  return true;
}


/**
 * Arithmetic and comparison operators
 * @param {Native value} a Value in the object
 * @param {Native value} b Value in the query
 */
comparisonFunctions.$lt = function (a, b) {
  return areComparable(a, b) && a < b;
};

comparisonFunctions.$lte = function (a, b) {
  return areComparable(a, b) && a <= b;
};

comparisonFunctions.$gt = function (a, b) {
  return areComparable(a, b) && a > b;
};

comparisonFunctions.$gte = function (a, b) {
  return areComparable(a, b) && a >= b;
};

comparisonFunctions.$ne = function (a, b) {
  if (a === undefined) { return true; }
  return !areThingsEqual(a, b);
};

comparisonFunctions.$in = function (a, b) {
  var i;

  if (!util.isArray(b)) { throw "$in operator called with a non-array"; }

  for (i = 0; i < b.length; i += 1) {
    if (areThingsEqual(a, b[i])) { return true; }
  }

  return false;
};

comparisonFunctions.$nin = function (a, b) {
  if (!util.isArray(b)) { throw "$nin operator called with a non-array"; }

  return !comparisonFunctions.$in(a, b);
};

comparisonFunctions.$regex = function (a, b) {
  if (!util.isRegExp(b)) { throw "$regex operator called with non regular expression"; }

  if (typeof a !== 'string') {
    return false
  } else {
    return b.test(a);
  }
};

comparisonFunctions.$exists = function (value, exists) {
  if (exists || exists === '') {   // This will be true for all values of exists except false, null, undefined and 0
    exists = true;                 // That's strange behaviour (we should only use true/false) but that's the way Mongo does it...
  } else {
    exists = false;
  }

  if (value === undefined) {
    return !exists
  } else {
    return exists;
  }
};

// Specific to arrays
comparisonFunctions.$size = function (obj, value) {
    if (!util.isArray(obj)) { return false; }
    if (value % 1 !== 0) { throw "$size operator called without an integer"; }

    return (obj.length == value);
};
arrayComparisonFunctions.$size = true;


/**
 * Match any of the subqueries
 * @param {Model} obj
 * @param {Array of Queries} query
 */
logicalOperators.$or = function (obj, query) {
  var i;

  if (!util.isArray(query)) { throw "$or operator used without an array"; }

  for (i = 0; i < query.length; i += 1) {
    if (match(obj, query[i])) { return true; }
  }

  return false;
};


/**
 * Match all of the subqueries
 * @param {Model} obj
 * @param {Array of Queries} query
 */
logicalOperators.$and = function (obj, query) {
  var i;

  if (!util.isArray(query)) { throw "$and operator used without an array"; }

  for (i = 0; i < query.length; i += 1) {
    if (!match(obj, query[i])) { return false; }
  }

  return true;
};


/**
 * Inverted match of the query
 * @param {Model} obj
 * @param {Query} query
 */
logicalOperators.$not = function (obj, query) {
  return !match(obj, query);
};


/**
 * Use a function to match
 * @param {Model} obj
 * @param {Query} query
 */
logicalOperators.$where = function (obj, fn) {
  var result;

  if (!_.isFunction(fn)) { throw "$where operator used without a function"; }

  result = fn.call(obj);
  if (!_.isBoolean(result)) { throw "$where function must return boolean"; }

  return result;
};


/**
 * Tell if a given document matches a query
 * @param {Object} obj Document to check
 * @param {Object} query
 */
function match (obj, query) {
  var queryKeys, queryKey, queryValue, i;

  // Primitive query against a primitive type
  // This is a bit of a hack since we construct an object with an arbitrary key only to dereference it later
  // But I don't have time for a cleaner implementation now
  if (isPrimitiveType(obj) || isPrimitiveType(query)) {
    return matchQueryPart({ needAKey: obj }, 'needAKey', query);
  }
    
  // Normal query
  queryKeys = Object.keys(query);
  for (i = 0; i < queryKeys.length; i += 1) {
    queryKey = queryKeys[i];
    queryValue = query[queryKey];
  
    if (queryKey[0] === '$') {
      if (!logicalOperators[queryKey]) { throw "Unknown logical operator " + queryKey; }
      if (!logicalOperators[queryKey](obj, queryValue)) { return false; }
    } else {
      if (!matchQueryPart(obj, queryKey, queryValue)) { return false; }
    }
  }

  return true;
};


/**
 * Match an object against a specific { key: value } part of a query
 * if the treatObjAsValue flag is set, don't try to match every part separately, but the array as a whole
 */
function matchQueryPart (obj, queryKey, queryValue, treatObjAsValue) {
  var objValue = getDotValue(obj, queryKey)
    , i, keys, firstChars, dollarFirstChars;

  // Check if the value is an array if we don't force a treatment as value
  if (util.isArray(objValue) && !treatObjAsValue) {
    // Check if we are using an array-specific comparison function
    if (queryValue !== null && typeof queryValue === 'object' && !util.isRegExp(queryValue)) {
      keys = Object.keys(queryValue);      
      for (i = 0; i < keys.length; i += 1) {
        if (arrayComparisonFunctions[keys[i]]) { return matchQueryPart(obj, queryKey, queryValue, true); }
      }
    }

    // If not, treat it as an array of { obj, query } where there needs to be at least one match
    for (i = 0; i < objValue.length; i += 1) {
      if (matchQueryPart({ k: objValue[i] }, 'k', queryValue)) { return true; }   // k here could be any string
    }
    return false;
  }

  // queryValue is an actual object. Determine whether it contains comparison operators
  // or only normal fields. Mixed objects are not allowed
  if (queryValue !== null && typeof queryValue === 'object' && !util.isRegExp(queryValue)) {
    keys = Object.keys(queryValue);
    firstChars = _.map(keys, function (item) { return item[0]; });
    dollarFirstChars = _.filter(firstChars, function (c) { return c === '$'; });

    if (dollarFirstChars.length !== 0 && dollarFirstChars.length !== firstChars.length) {
      throw "You cannot mix operators and normal fields";
    }

    // queryValue is an object of this form: { $comparisonOperator1: value1, ... }
    if (dollarFirstChars.length > 0) {
      for (i = 0; i < keys.length; i += 1) {
        if (!comparisonFunctions[keys[i]]) { throw "Unknown comparison function " + keys[i]; }

        if (!comparisonFunctions[keys[i]](objValue, queryValue[keys[i]])) { return false; }
      }
      return true;
    }
  }

  // Using regular expressions with basic querying
  if (util.isRegExp(queryValue)) { return comparisonFunctions.$regex(objValue, queryValue); }

  // queryValue is either a native value or a normal object
  // Basic matching is possible
  if (!areThingsEqual(objValue, queryValue)) { return false; }

  return true;
}


// Interface
module.exports.serialize = serialize;
module.exports.deserialize = deserialize;
module.exports.deepCopy = deepCopy;
module.exports.checkObject = checkObject;
module.exports.isPrimitiveType = isPrimitiveType;
module.exports.modify = modify;
module.exports.getDotValue = getDotValue;
module.exports.match = match;
module.exports.areThingsEqual = areThingsEqual;
module.exports.compareThings = compareThings;

},{"underscore":18,"util":3}],11:[function(require,module,exports){
var process=require("__browserify_process");/**
 * Handle every persistence-related task
 * The interface Datastore expects to be implemented is
 * * Persistence.loadDatabase(callback) and callback has signature err
 * * Persistence.persistNewState(newDocs, callback) where newDocs is an array of documents and callback has signature err
 */

var storage = require('./storage')
  , path = require('path')
  , model = require('./model')
  , async = require('async')
  , customUtils = require('./customUtils')
  , Index = require('./indexes')
  ;


/**
 * Create a new Persistence object for database options.db
 * @param {Datastore} options.db
 * @param {Boolean} options.nodeWebkitAppName Optional, specify the name of your NW app if you want options.filename to be relative to the directory where
 *                                            Node Webkit stores application data such as cookies and local storage (the best place to store data in my opinion)
 */
function Persistence (options) {
  var i, j, randomString;
  
  this.db = options.db;
  this.inMemoryOnly = this.db.inMemoryOnly;
  this.filename = this.db.filename;
  this.corruptAlertThreshold = options.corruptAlertThreshold !== undefined ? options.corruptAlertThreshold : 0.1;
  
  if (!this.inMemoryOnly && this.filename) {
    if (this.filename.charAt(this.filename.length - 1) === '~') {
      throw "The datafile name can't end with a ~, which is reserved for automatic backup files";
    } else {
      this.tempFilename = this.filename + '~';
      this.oldFilename = this.filename + '~~';
    }
  }

  // After serialization and before deserialization hooks with some basic sanity checks
  if (options.afterSerialization && !options.beforeDeserialization) {
    throw "Serialization hook defined but deserialization hook undefined, cautiously refusing to start NeDB to prevent dataloss";
  }
  if (!options.afterSerialization && options.beforeDeserialization) {
    throw "Serialization hook undefined but deserialization hook defined, cautiously refusing to start NeDB to prevent dataloss";
  }
  this.afterSerialization = options.afterSerialization || function (s) { return s; };
  this.beforeDeserialization = options.beforeDeserialization || function (s) { return s; };
  for (i = 1; i < 30; i += 1) {
    for (j = 0; j < 10; j += 1) {
      randomString = customUtils.uid(i);
      if (this.beforeDeserialization(this.afterSerialization(randomString)) !== randomString) {
        throw "beforeDeserialization is not the reverse of afterSerialization, cautiously refusing to start NeDB to prevent dataloss";
      }
    }
  }
  
  // For NW apps, store data in the same directory where NW stores application data
  if (this.filename && options.nodeWebkitAppName) {
    console.log("==================================================================");
    console.log("WARNING: The nodeWebkitAppName option is deprecated");
    console.log("To get the path to the directory where Node Webkit stores the data");
    console.log("for your app, use the internal nw.gui module like this");
    console.log("require('nw.gui').App.dataPath");
    console.log("See https://github.com/rogerwang/node-webkit/issues/500");
    console.log("==================================================================");
    this.filename = Persistence.getNWAppFilename(options.nodeWebkitAppName, this.filename);
    this.tempFilename = Persistence.getNWAppFilename(options.nodeWebkitAppName, this.tempFilename);
    this.oldFilename = Persistence.getNWAppFilename(options.nodeWebkitAppName, this.oldFilename);
  }
};


/**
 * Check if a directory exists and create it on the fly if it is not the case
 * cb is optional, signature: err
 */
Persistence.ensureDirectoryExists = function (dir, cb) {
  var callback = cb || function () {}
    ;

  storage.mkdirp(dir, function (err) { return callback(err); });
};


Persistence.ensureFileDoesntExist = function (file, callback) {
  storage.exists(file, function (exists) {
    if (!exists) { return callback(null); }
    
    storage.unlink(file, function (err) { return callback(err); });
  });
};


/**
 * Return the path the datafile if the given filename is relative to the directory where Node Webkit stores
 * data for this application. Probably the best place to store data
 */
Persistence.getNWAppFilename = function (appName, relativeFilename) {
  var home;

  switch (process.platform) {
    case 'win32':
    case 'win64':
      home = process.env.LOCALAPPDATA || process.env.APPDATA;
      if (!home) { throw "Couldn't find the base application data folder"; }
      home = path.join(home, appName);
      break;
    case 'darwin':
      home = process.env.HOME;
      if (!home) { throw "Couldn't find the base application data directory"; }
      home = path.join(home, 'Library', 'Application Support', appName);
      break;
    case 'linux':
      home = process.env.HOME;
      if (!home) { throw "Couldn't find the base application data directory"; }
      home = path.join(home, '.config', appName);
      break;
    default:
      throw "Can't use the Node Webkit relative path for platform " + process.platform;
      break;
  }

  return path.join(home, 'nedb-data', relativeFilename);
}


/**
 * Persist cached database
 * This serves as a compaction function since the cache always contains only the number of documents in the collection
 * while the data file is append-only so it may grow larger
 * @param {Function} cb Optional callback, signature: err
 */
Persistence.prototype.persistCachedDatabase = function (cb) {
  var callback = cb || function () {}
    , toPersist = ''
    , self = this
    ;

  if (this.inMemoryOnly) { return callback(null); } 

  this.db.getAllData().forEach(function (doc) {
    toPersist += self.afterSerialization(model.serialize(doc)) + '\n';
  });
  Object.keys(this.db.indexes).forEach(function (fieldName) {
    if (fieldName != "_id") {   // The special _id index is managed by datastore.js, the others need to be persisted
      toPersist += self.afterSerialization(model.serialize({ $$indexCreated: { fieldName: fieldName, unique: self.db.indexes[fieldName].unique, sparse: self.db.indexes[fieldName].sparse }})) + '\n';
    }
  });

  async.waterfall([
    async.apply(Persistence.ensureFileDoesntExist, self.tempFilename)
  , async.apply(Persistence.ensureFileDoesntExist, self.oldFilename)
  , function (cb) {
      storage.exists(self.filename, function (exists) {
        if (exists) {
          storage.rename(self.filename, self.oldFilename, function (err) { return cb(err); });
        } else {
          return cb();
        }
      });  
  }
  , function (cb) {
      storage.writeFile(self.tempFilename, toPersist, function (err) { return cb(err); });
    }
  , function (cb) {
      storage.rename(self.tempFilename, self.filename, function (err) { return cb(err); });
    }
  , async.apply(Persistence.ensureFileDoesntExist, self.oldFilename)
  ], function (err) { if (err) { return callback(err); } else { return callback(null); } })
};


/**
 * Queue a rewrite of the datafile
 */
Persistence.prototype.compactDatafile = function () {
  this.db.executor.push({ this: this, fn: this.persistCachedDatabase, arguments: [] });
};


/**
 * Set automatic compaction every interval ms
 * @param {Number} interval in milliseconds, with an enforced minimum of 5 seconds
 */
Persistence.prototype.setAutocompactionInterval = function (interval) {
  var self = this
    , minInterval = 5000
    , realInterval = Math.max(interval || 0, minInterval)
    ;

  this.stopAutocompaction();

  this.autocompactionIntervalId = setInterval(function () {
    self.compactDatafile();
  }, realInterval);
};


/**
 * Stop autocompaction (do nothing if autocompaction was not running)
 */
Persistence.prototype.stopAutocompaction = function () {
  if (this.autocompactionIntervalId) { clearInterval(this.autocompactionIntervalId); }
};


/**
 * Persist new state for the given newDocs (can be insertion, update or removal)
 * Use an append-only format
 * @param {Array} newDocs Can be empty if no doc was updated/removed
 * @param {Function} cb Optional, signature: err
 */
Persistence.prototype.persistNewState = function (newDocs, cb) {
  var self = this
    , toPersist = ''
    , callback = cb || function () {}
    ;

  // In-memory only datastore
  if (self.inMemoryOnly) { return callback(null); }

  newDocs.forEach(function (doc) {
    toPersist += self.afterSerialization(model.serialize(doc)) + '\n';
  });

  if (toPersist.length === 0) { return callback(null); }

  storage.appendFile(self.filename, toPersist, 'utf8', function (err) {
    return callback(err);
  });
};


/**
 * From a database's raw data, return the corresponding
 * machine understandable collection
 */
Persistence.prototype.treatRawData = function (rawData) {
  var data = rawData.split('\n')
    , dataById = {}
    , tdata = []
    , i
    , indexes = {}
    , corruptItems = -1   // Last line of every data file is usually blank so not really corrupt
    ;
    
  for (i = 0; i < data.length; i += 1) {
    var doc;
    
    try {
      doc = model.deserialize(this.beforeDeserialization(data[i]));
      if (doc._id) {
        if (doc.$$deleted === true) {
          delete dataById[doc._id];
        } else {
          dataById[doc._id] = doc;
        }
      } else if (doc.$$indexCreated && doc.$$indexCreated.fieldName != undefined) {
        indexes[doc.$$indexCreated.fieldName] = doc.$$indexCreated;
      } else if (typeof doc.$$indexRemoved === "string") {
        delete indexes[doc.$$indexRemoved];
      }
    } catch (e) {
      corruptItems += 1;
    }
  }
    
  // A bit lenient on corruption
  if (data.length > 0 && corruptItems / data.length > this.corruptAlertThreshold) {
    throw "More than 10% of the data file is corrupt, the wrong beforeDeserialization hook may be used. Cautiously refusing to start NeDB to prevent dataloss"
  }

  Object.keys(dataById).forEach(function (k) {
    tdata.push(dataById[k]);
  });

  return { data: tdata, indexes: indexes };
};


/**
 * Ensure that this.filename contains the most up-to-date version of the data
 * Even if a loadDatabase crashed before
 */
Persistence.prototype.ensureDatafileIntegrity = function (callback) {
  var self = this  ;

  storage.exists(self.filename, function (filenameExists) {
    // Write was successful
    if (filenameExists) { return callback(null); }
  
    storage.exists(self.oldFilename, function (oldFilenameExists) {
      // New database
      if (!oldFilenameExists) {
        return storage.writeFile(self.filename, '', 'utf8', function (err) { callback(err); });            
      }
    
      // Write failed, use old version
      storage.rename(self.oldFilename, self.filename, function (err) { return callback(err); });
    });
  });
};


/**
 * Load the database
 * 1) Create all indexes
 * 2) Insert all data
 * 3) Compact the database
 * This means pulling data out of the data file or creating it if it doesn't exist
 * Also, all data is persisted right away, which has the effect of compacting the database file
 * This operation is very quick at startup for a big collection (60ms for ~10k docs)
 * @param {Function} cb Optional callback, signature: err
 */
Persistence.prototype.loadDatabase = function (cb) {
  var callback = cb || function () {}
    , self = this
    ;

  self.db.resetIndexes();

  // In-memory only datastore
  if (self.inMemoryOnly) { return callback(null); }

  async.waterfall([
    function (cb) {
      Persistence.ensureDirectoryExists(path.dirname(self.filename), function (err) {
        self.ensureDatafileIntegrity(function (exists) {
          storage.readFile(self.filename, 'utf8', function (err, rawData) {
            if (err) { return cb(err); }
            
            try {
              var treatedData = self.treatRawData(rawData);
            } catch (e) {
              return cb(e);
            }
            
            // Recreate all indexes in the datafile
            Object.keys(treatedData.indexes).forEach(function (key) {
              self.db.indexes[key] = new Index(treatedData.indexes[key]);
            });

            // Fill cached database (i.e. all indexes) with data
            try {
              self.db.resetIndexes(treatedData.data);
            } catch (e) {
              self.db.resetIndexes();   // Rollback any index which didn't fail
              return cb(e);
            }

            self.db.persistence.persistCachedDatabase(cb);
          });
        });
      });
    }
  ], function (err) {
       if (err) { return callback(err); }

       self.db.executor.processBuffer();
       return callback(null);
     });
};


// Interface
module.exports = Persistence;

},{"./customUtils":6,"./indexes":9,"./model":10,"./storage":12,"__browserify_process":4,"async":13,"path":2}],12:[function(require,module,exports){
/**
 * Way data is stored for this database
 * For a Node.js/Node Webkit database it's the file system
 * For a browser-side database it's localStorage when supported
 *
 * This version is the Node.js/Node Webkit version
 */



function exists (filename, callback) {
  // In this specific case this always answers that the file doesn't exist
  if (typeof localStorage === 'undefined') { console.log("WARNING - This browser doesn't support localStorage, no data will be saved in NeDB!"); return callback(); }

  if (localStorage.getItem(filename) !== null) {
    return callback(true);
  } else {
    return callback(false);
  }
}


function rename (filename, newFilename, callback) {
  if (typeof localStorage === 'undefined') { console.log("WARNING - This browser doesn't support localStorage, no data will be saved in NeDB!"); return callback(); }

  if (localStorage.getItem(filename) === null) {
    localStorage.removeItem(newFilename);
  } else {
    localStorage.setItem(newFilename, localStorage.getItem(filename));
    localStorage.removeItem(filename);
  }

  return callback();
}


function writeFile (filename, contents, options, callback) {
  if (typeof localStorage === 'undefined') { console.log("WARNING - This browser doesn't support localStorage, no data will be saved in NeDB!"); return callback(); }
  
  // Options do not matter in browser setup
  if (typeof options === 'function') { callback = options; }

  localStorage.setItem(filename, contents);
  return callback();
}


function appendFile (filename, toAppend, options, callback) {
  if (typeof localStorage === 'undefined') { console.log("WARNING - This browser doesn't support localStorage, no data will be saved in NeDB!"); return callback(); }
  
  // Options do not matter in browser setup
  if (typeof options === 'function') { callback = options; }

  var contents = localStorage.getItem(filename) || '';
  contents += toAppend;

  localStorage.setItem(filename, contents);
  return callback();
}


function readFile (filename, options, callback) {
  if (typeof localStorage === 'undefined') { console.log("WARNING - This browser doesn't support localStorage, no data will be saved in NeDB!"); return callback(); }
  
  // Options do not matter in browser setup
  if (typeof options === 'function') { callback = options; }

  var contents = localStorage.getItem(filename) || '';
  return callback(null, contents);
}


function unlink (filename, callback) {
  if (typeof localStorage === 'undefined') { console.log("WARNING - This browser doesn't support localStorage, no data will be saved in NeDB!"); return callback(); }

  localStorage.removeItem(filename);
  return callback();
}


// Nothing done, no directories will be used on the browser
function mkdirp (dir, callback) {
  return callback();
}



// Interface
module.exports.exists = exists;
module.exports.rename = rename;
module.exports.writeFile = writeFile;
module.exports.appendFile = appendFile;
module.exports.readFile = readFile;
module.exports.unlink = unlink;
module.exports.mkdirp = mkdirp;


},{}],13:[function(require,module,exports){
var process=require("__browserify_process");/*global setImmediate: false, setTimeout: false, console: false */
(function () {

    var async = {};

    // global on the server, window in the browser
    var root, previous_async;

    root = this;
    if (root != null) {
      previous_async = root.async;
    }

    async.noConflict = function () {
        root.async = previous_async;
        return async;
    };

    function only_once(fn) {
        var called = false;
        return function() {
            if (called) throw new Error("Callback was already called.");
            called = true;
            fn.apply(root, arguments);
        }
    }

    //// cross-browser compatiblity functions ////

    var _each = function (arr, iterator) {
        if (arr.forEach) {
            return arr.forEach(iterator);
        }
        for (var i = 0; i < arr.length; i += 1) {
            iterator(arr[i], i, arr);
        }
    };

    var _map = function (arr, iterator) {
        if (arr.map) {
            return arr.map(iterator);
        }
        var results = [];
        _each(arr, function (x, i, a) {
            results.push(iterator(x, i, a));
        });
        return results;
    };

    var _reduce = function (arr, iterator, memo) {
        if (arr.reduce) {
            return arr.reduce(iterator, memo);
        }
        _each(arr, function (x, i, a) {
            memo = iterator(memo, x, i, a);
        });
        return memo;
    };

    var _keys = function (obj) {
        if (Object.keys) {
            return Object.keys(obj);
        }
        var keys = [];
        for (var k in obj) {
            if (obj.hasOwnProperty(k)) {
                keys.push(k);
            }
        }
        return keys;
    };

    //// exported async module functions ////

    //// nextTick implementation with browser-compatible fallback ////
    if (typeof process === 'undefined' || !(process.nextTick)) {
        if (typeof setImmediate === 'function') {
            async.nextTick = function (fn) {
                // not a direct alias for IE10 compatibility
                setImmediate(fn);
            };
            async.setImmediate = async.nextTick;
        }
        else {
            async.nextTick = function (fn) {
                setTimeout(fn, 0);
            };
            async.setImmediate = async.nextTick;
        }
    }
    else {
        async.nextTick = process.nextTick;
        if (typeof setImmediate !== 'undefined') {
            async.setImmediate = function (fn) {
              // not a direct alias for IE10 compatibility
              setImmediate(fn);
            };
        }
        else {
            async.setImmediate = async.nextTick;
        }
    }

    async.each = function (arr, iterator, callback) {
        callback = callback || function () {};
        if (!arr.length) {
            return callback();
        }
        var completed = 0;
        _each(arr, function (x) {
            iterator(x, only_once(function (err) {
                if (err) {
                    callback(err);
                    callback = function () {};
                }
                else {
                    completed += 1;
                    if (completed >= arr.length) {
                        callback(null);
                    }
                }
            }));
        });
    };
    async.forEach = async.each;

    async.eachSeries = function (arr, iterator, callback) {
        callback = callback || function () {};
        if (!arr.length) {
            return callback();
        }
        var completed = 0;
        var iterate = function () {
            iterator(arr[completed], function (err) {
                if (err) {
                    callback(err);
                    callback = function () {};
                }
                else {
                    completed += 1;
                    if (completed >= arr.length) {
                        callback(null);
                    }
                    else {
                        iterate();
                    }
                }
            });
        };
        iterate();
    };
    async.forEachSeries = async.eachSeries;

    async.eachLimit = function (arr, limit, iterator, callback) {
        var fn = _eachLimit(limit);
        fn.apply(null, [arr, iterator, callback]);
    };
    async.forEachLimit = async.eachLimit;

    var _eachLimit = function (limit) {

        return function (arr, iterator, callback) {
            callback = callback || function () {};
            if (!arr.length || limit <= 0) {
                return callback();
            }
            var completed = 0;
            var started = 0;
            var running = 0;

            (function replenish () {
                if (completed >= arr.length) {
                    return callback();
                }

                while (running < limit && started < arr.length) {
                    started += 1;
                    running += 1;
                    iterator(arr[started - 1], function (err) {
                        if (err) {
                            callback(err);
                            callback = function () {};
                        }
                        else {
                            completed += 1;
                            running -= 1;
                            if (completed >= arr.length) {
                                callback();
                            }
                            else {
                                replenish();
                            }
                        }
                    });
                }
            })();
        };
    };


    var doParallel = function (fn) {
        return function () {
            var args = Array.prototype.slice.call(arguments);
            return fn.apply(null, [async.each].concat(args));
        };
    };
    var doParallelLimit = function(limit, fn) {
        return function () {
            var args = Array.prototype.slice.call(arguments);
            return fn.apply(null, [_eachLimit(limit)].concat(args));
        };
    };
    var doSeries = function (fn) {
        return function () {
            var args = Array.prototype.slice.call(arguments);
            return fn.apply(null, [async.eachSeries].concat(args));
        };
    };


    var _asyncMap = function (eachfn, arr, iterator, callback) {
        var results = [];
        arr = _map(arr, function (x, i) {
            return {index: i, value: x};
        });
        eachfn(arr, function (x, callback) {
            iterator(x.value, function (err, v) {
                results[x.index] = v;
                callback(err);
            });
        }, function (err) {
            callback(err, results);
        });
    };
    async.map = doParallel(_asyncMap);
    async.mapSeries = doSeries(_asyncMap);
    async.mapLimit = function (arr, limit, iterator, callback) {
        return _mapLimit(limit)(arr, iterator, callback);
    };

    var _mapLimit = function(limit) {
        return doParallelLimit(limit, _asyncMap);
    };

    // reduce only has a series version, as doing reduce in parallel won't
    // work in many situations.
    async.reduce = function (arr, memo, iterator, callback) {
        async.eachSeries(arr, function (x, callback) {
            iterator(memo, x, function (err, v) {
                memo = v;
                callback(err);
            });
        }, function (err) {
            callback(err, memo);
        });
    };
    // inject alias
    async.inject = async.reduce;
    // foldl alias
    async.foldl = async.reduce;

    async.reduceRight = function (arr, memo, iterator, callback) {
        var reversed = _map(arr, function (x) {
            return x;
        }).reverse();
        async.reduce(reversed, memo, iterator, callback);
    };
    // foldr alias
    async.foldr = async.reduceRight;

    var _filter = function (eachfn, arr, iterator, callback) {
        var results = [];
        arr = _map(arr, function (x, i) {
            return {index: i, value: x};
        });
        eachfn(arr, function (x, callback) {
            iterator(x.value, function (v) {
                if (v) {
                    results.push(x);
                }
                callback();
            });
        }, function (err) {
            callback(_map(results.sort(function (a, b) {
                return a.index - b.index;
            }), function (x) {
                return x.value;
            }));
        });
    };
    async.filter = doParallel(_filter);
    async.filterSeries = doSeries(_filter);
    // select alias
    async.select = async.filter;
    async.selectSeries = async.filterSeries;

    var _reject = function (eachfn, arr, iterator, callback) {
        var results = [];
        arr = _map(arr, function (x, i) {
            return {index: i, value: x};
        });
        eachfn(arr, function (x, callback) {
            iterator(x.value, function (v) {
                if (!v) {
                    results.push(x);
                }
                callback();
            });
        }, function (err) {
            callback(_map(results.sort(function (a, b) {
                return a.index - b.index;
            }), function (x) {
                return x.value;
            }));
        });
    };
    async.reject = doParallel(_reject);
    async.rejectSeries = doSeries(_reject);

    var _detect = function (eachfn, arr, iterator, main_callback) {
        eachfn(arr, function (x, callback) {
            iterator(x, function (result) {
                if (result) {
                    main_callback(x);
                    main_callback = function () {};
                }
                else {
                    callback();
                }
            });
        }, function (err) {
            main_callback();
        });
    };
    async.detect = doParallel(_detect);
    async.detectSeries = doSeries(_detect);

    async.some = function (arr, iterator, main_callback) {
        async.each(arr, function (x, callback) {
            iterator(x, function (v) {
                if (v) {
                    main_callback(true);
                    main_callback = function () {};
                }
                callback();
            });
        }, function (err) {
            main_callback(false);
        });
    };
    // any alias
    async.any = async.some;

    async.every = function (arr, iterator, main_callback) {
        async.each(arr, function (x, callback) {
            iterator(x, function (v) {
                if (!v) {
                    main_callback(false);
                    main_callback = function () {};
                }
                callback();
            });
        }, function (err) {
            main_callback(true);
        });
    };
    // all alias
    async.all = async.every;

    async.sortBy = function (arr, iterator, callback) {
        async.map(arr, function (x, callback) {
            iterator(x, function (err, criteria) {
                if (err) {
                    callback(err);
                }
                else {
                    callback(null, {value: x, criteria: criteria});
                }
            });
        }, function (err, results) {
            if (err) {
                return callback(err);
            }
            else {
                var fn = function (left, right) {
                    var a = left.criteria, b = right.criteria;
                    return a < b ? -1 : a > b ? 1 : 0;
                };
                callback(null, _map(results.sort(fn), function (x) {
                    return x.value;
                }));
            }
        });
    };

    async.auto = function (tasks, callback) {
        callback = callback || function () {};
        var keys = _keys(tasks);
        if (!keys.length) {
            return callback(null);
        }

        var results = {};

        var listeners = [];
        var addListener = function (fn) {
            listeners.unshift(fn);
        };
        var removeListener = function (fn) {
            for (var i = 0; i < listeners.length; i += 1) {
                if (listeners[i] === fn) {
                    listeners.splice(i, 1);
                    return;
                }
            }
        };
        var taskComplete = function () {
            _each(listeners.slice(0), function (fn) {
                fn();
            });
        };

        addListener(function () {
            if (_keys(results).length === keys.length) {
                callback(null, results);
                callback = function () {};
            }
        });

        _each(keys, function (k) {
            var task = (tasks[k] instanceof Function) ? [tasks[k]]: tasks[k];
            var taskCallback = function (err) {
                var args = Array.prototype.slice.call(arguments, 1);
                if (args.length <= 1) {
                    args = args[0];
                }
                if (err) {
                    var safeResults = {};
                    _each(_keys(results), function(rkey) {
                        safeResults[rkey] = results[rkey];
                    });
                    safeResults[k] = args;
                    callback(err, safeResults);
                    // stop subsequent errors hitting callback multiple times
                    callback = function () {};
                }
                else {
                    results[k] = args;
                    async.setImmediate(taskComplete);
                }
            };
            var requires = task.slice(0, Math.abs(task.length - 1)) || [];
            var ready = function () {
                return _reduce(requires, function (a, x) {
                    return (a && results.hasOwnProperty(x));
                }, true) && !results.hasOwnProperty(k);
            };
            if (ready()) {
                task[task.length - 1](taskCallback, results);
            }
            else {
                var listener = function () {
                    if (ready()) {
                        removeListener(listener);
                        task[task.length - 1](taskCallback, results);
                    }
                };
                addListener(listener);
            }
        });
    };

    async.waterfall = function (tasks, callback) {
        callback = callback || function () {};
        if (tasks.constructor !== Array) {
          var err = new Error('First argument to waterfall must be an array of functions');
          return callback(err);
        }
        if (!tasks.length) {
            return callback();
        }
        var wrapIterator = function (iterator) {
            return function (err) {
                if (err) {
                    callback.apply(null, arguments);
                    callback = function () {};
                }
                else {
                    var args = Array.prototype.slice.call(arguments, 1);
                    var next = iterator.next();
                    if (next) {
                        args.push(wrapIterator(next));
                    }
                    else {
                        args.push(callback);
                    }
                    async.setImmediate(function () {
                        iterator.apply(null, args);
                    });
                }
            };
        };
        wrapIterator(async.iterator(tasks))();
    };

    var _parallel = function(eachfn, tasks, callback) {
        callback = callback || function () {};
        if (tasks.constructor === Array) {
            eachfn.map(tasks, function (fn, callback) {
                if (fn) {
                    fn(function (err) {
                        var args = Array.prototype.slice.call(arguments, 1);
                        if (args.length <= 1) {
                            args = args[0];
                        }
                        callback.call(null, err, args);
                    });
                }
            }, callback);
        }
        else {
            var results = {};
            eachfn.each(_keys(tasks), function (k, callback) {
                tasks[k](function (err) {
                    var args = Array.prototype.slice.call(arguments, 1);
                    if (args.length <= 1) {
                        args = args[0];
                    }
                    results[k] = args;
                    callback(err);
                });
            }, function (err) {
                callback(err, results);
            });
        }
    };

    async.parallel = function (tasks, callback) {
        _parallel({ map: async.map, each: async.each }, tasks, callback);
    };

    async.parallelLimit = function(tasks, limit, callback) {
        _parallel({ map: _mapLimit(limit), each: _eachLimit(limit) }, tasks, callback);
    };

    async.series = function (tasks, callback) {
        callback = callback || function () {};
        if (tasks.constructor === Array) {
            async.mapSeries(tasks, function (fn, callback) {
                if (fn) {
                    fn(function (err) {
                        var args = Array.prototype.slice.call(arguments, 1);
                        if (args.length <= 1) {
                            args = args[0];
                        }
                        callback.call(null, err, args);
                    });
                }
            }, callback);
        }
        else {
            var results = {};
            async.eachSeries(_keys(tasks), function (k, callback) {
                tasks[k](function (err) {
                    var args = Array.prototype.slice.call(arguments, 1);
                    if (args.length <= 1) {
                        args = args[0];
                    }
                    results[k] = args;
                    callback(err);
                });
            }, function (err) {
                callback(err, results);
            });
        }
    };

    async.iterator = function (tasks) {
        var makeCallback = function (index) {
            var fn = function () {
                if (tasks.length) {
                    tasks[index].apply(null, arguments);
                }
                return fn.next();
            };
            fn.next = function () {
                return (index < tasks.length - 1) ? makeCallback(index + 1): null;
            };
            return fn;
        };
        return makeCallback(0);
    };

    async.apply = function (fn) {
        var args = Array.prototype.slice.call(arguments, 1);
        return function () {
            return fn.apply(
                null, args.concat(Array.prototype.slice.call(arguments))
            );
        };
    };

    var _concat = function (eachfn, arr, fn, callback) {
        var r = [];
        eachfn(arr, function (x, cb) {
            fn(x, function (err, y) {
                r = r.concat(y || []);
                cb(err);
            });
        }, function (err) {
            callback(err, r);
        });
    };
    async.concat = doParallel(_concat);
    async.concatSeries = doSeries(_concat);

    async.whilst = function (test, iterator, callback) {
        if (test()) {
            iterator(function (err) {
                if (err) {
                    return callback(err);
                }
                async.whilst(test, iterator, callback);
            });
        }
        else {
            callback();
        }
    };

    async.doWhilst = function (iterator, test, callback) {
        iterator(function (err) {
            if (err) {
                return callback(err);
            }
            if (test()) {
                async.doWhilst(iterator, test, callback);
            }
            else {
                callback();
            }
        });
    };

    async.until = function (test, iterator, callback) {
        if (!test()) {
            iterator(function (err) {
                if (err) {
                    return callback(err);
                }
                async.until(test, iterator, callback);
            });
        }
        else {
            callback();
        }
    };

    async.doUntil = function (iterator, test, callback) {
        iterator(function (err) {
            if (err) {
                return callback(err);
            }
            if (!test()) {
                async.doUntil(iterator, test, callback);
            }
            else {
                callback();
            }
        });
    };

    async.queue = function (worker, concurrency) {
        if (concurrency === undefined) {
            concurrency = 1;
        }
        function _insert(q, data, pos, callback) {
          if(data.constructor !== Array) {
              data = [data];
          }
          _each(data, function(task) {
              var item = {
                  data: task,
                  callback: typeof callback === 'function' ? callback : null
              };

              if (pos) {
                q.tasks.unshift(item);
              } else {
                q.tasks.push(item);
              }

              if (q.saturated && q.tasks.length === concurrency) {
                  q.saturated();
              }
              async.setImmediate(q.process);
          });
        }

        var workers = 0;
        var q = {
            tasks: [],
            concurrency: concurrency,
            saturated: null,
            empty: null,
            drain: null,
            push: function (data, callback) {
              _insert(q, data, false, callback);
            },
            unshift: function (data, callback) {
              _insert(q, data, true, callback);
            },
            process: function () {
                if (workers < q.concurrency && q.tasks.length) {
                    var task = q.tasks.shift();
                    if (q.empty && q.tasks.length === 0) {
                        q.empty();
                    }
                    workers += 1;
                    var next = function () {
                        workers -= 1;
                        if (task.callback) {
                            task.callback.apply(task, arguments);
                        }
                        if (q.drain && q.tasks.length + workers === 0) {
                            q.drain();
                        }
                        q.process();
                    };
                    var cb = only_once(next);
                    worker(task.data, cb);
                }
            },
            length: function () {
                return q.tasks.length;
            },
            running: function () {
                return workers;
            }
        };
        return q;
    };

    async.cargo = function (worker, payload) {
        var working     = false,
            tasks       = [];

        var cargo = {
            tasks: tasks,
            payload: payload,
            saturated: null,
            empty: null,
            drain: null,
            push: function (data, callback) {
                if(data.constructor !== Array) {
                    data = [data];
                }
                _each(data, function(task) {
                    tasks.push({
                        data: task,
                        callback: typeof callback === 'function' ? callback : null
                    });
                    if (cargo.saturated && tasks.length === payload) {
                        cargo.saturated();
                    }
                });
                async.setImmediate(cargo.process);
            },
            process: function process() {
                if (working) return;
                if (tasks.length === 0) {
                    if(cargo.drain) cargo.drain();
                    return;
                }

                var ts = typeof payload === 'number'
                            ? tasks.splice(0, payload)
                            : tasks.splice(0);

                var ds = _map(ts, function (task) {
                    return task.data;
                });

                if(cargo.empty) cargo.empty();
                working = true;
                worker(ds, function () {
                    working = false;

                    var args = arguments;
                    _each(ts, function (data) {
                        if (data.callback) {
                            data.callback.apply(null, args);
                        }
                    });

                    process();
                });
            },
            length: function () {
                return tasks.length;
            },
            running: function () {
                return working;
            }
        };
        return cargo;
    };

    var _console_fn = function (name) {
        return function (fn) {
            var args = Array.prototype.slice.call(arguments, 1);
            fn.apply(null, args.concat([function (err) {
                var args = Array.prototype.slice.call(arguments, 1);
                if (typeof console !== 'undefined') {
                    if (err) {
                        if (console.error) {
                            console.error(err);
                        }
                    }
                    else if (console[name]) {
                        _each(args, function (x) {
                            console[name](x);
                        });
                    }
                }
            }]));
        };
    };
    async.log = _console_fn('log');
    async.dir = _console_fn('dir');
    /*async.info = _console_fn('info');
    async.warn = _console_fn('warn');
    async.error = _console_fn('error');*/

    async.memoize = function (fn, hasher) {
        var memo = {};
        var queues = {};
        hasher = hasher || function (x) {
            return x;
        };
        var memoized = function () {
            var args = Array.prototype.slice.call(arguments);
            var callback = args.pop();
            var key = hasher.apply(null, args);
            if (key in memo) {
                callback.apply(null, memo[key]);
            }
            else if (key in queues) {
                queues[key].push(callback);
            }
            else {
                queues[key] = [callback];
                fn.apply(null, args.concat([function () {
                    memo[key] = arguments;
                    var q = queues[key];
                    delete queues[key];
                    for (var i = 0, l = q.length; i < l; i++) {
                      q[i].apply(null, arguments);
                    }
                }]));
            }
        };
        memoized.memo = memo;
        memoized.unmemoized = fn;
        return memoized;
    };

    async.unmemoize = function (fn) {
      return function () {
        return (fn.unmemoized || fn).apply(null, arguments);
      };
    };

    async.times = function (count, iterator, callback) {
        var counter = [];
        for (var i = 0; i < count; i++) {
            counter.push(i);
        }
        return async.map(counter, iterator, callback);
    };

    async.timesSeries = function (count, iterator, callback) {
        var counter = [];
        for (var i = 0; i < count; i++) {
            counter.push(i);
        }
        return async.mapSeries(counter, iterator, callback);
    };

    async.compose = function (/* functions... */) {
        var fns = Array.prototype.reverse.call(arguments);
        return function () {
            var that = this;
            var args = Array.prototype.slice.call(arguments);
            var callback = args.pop();
            async.reduce(fns, args, function (newargs, fn, cb) {
                fn.apply(that, newargs.concat([function () {
                    var err = arguments[0];
                    var nextargs = Array.prototype.slice.call(arguments, 1);
                    cb(err, nextargs);
                }]))
            },
            function (err, results) {
                callback.apply(that, [err].concat(results));
            });
        };
    };

    var _applyEach = function (eachfn, fns /*args...*/) {
        var go = function () {
            var that = this;
            var args = Array.prototype.slice.call(arguments);
            var callback = args.pop();
            return eachfn(fns, function (fn, cb) {
                fn.apply(that, args.concat([cb]));
            },
            callback);
        };
        if (arguments.length > 2) {
            var args = Array.prototype.slice.call(arguments, 2);
            return go.apply(this, args);
        }
        else {
            return go;
        }
    };
    async.applyEach = doParallel(_applyEach);
    async.applyEachSeries = doSeries(_applyEach);

    async.forever = function (fn, callback) {
        function next(err) {
            if (err) {
                if (callback) {
                    return callback(err);
                }
                throw err;
            }
            fn(next);
        }
        next();
    };

    // AMD / RequireJS
    if (typeof define !== 'undefined' && define.amd) {
        define([], function () {
            return async;
        });
    }
    // Node.js
    else if (typeof module !== 'undefined' && module.exports) {
        module.exports = async;
    }
    // included directly via <script> tag
    else {
        root.async = async;
    }

}());

},{"__browserify_process":4}],14:[function(require,module,exports){
module.exports.BinarySearchTree = require('./lib/bst');
module.exports.AVLTree = require('./lib/avltree');

},{"./lib/avltree":15,"./lib/bst":16}],15:[function(require,module,exports){
/**
 * Self-balancing binary search tree using the AVL implementation
 */
var BinarySearchTree = require('./bst')
  , customUtils = require('./customUtils')
  , util = require('util')
  , _ = require('underscore')
  ;


/**
 * Constructor
 * We can't use a direct pointer to the root node (as in the simple binary search tree)
 * as the root will change during tree rotations
 * @param {Boolean}  options.unique Whether to enforce a 'unique' constraint on the key or not
 * @param {Function} options.compareKeys Initialize this BST's compareKeys
 */
function AVLTree (options) {
  this.tree = new _AVLTree(options);
}


/**
 * Constructor of the internal AVLTree
 * @param {Object} options Optional
 * @param {Boolean}  options.unique Whether to enforce a 'unique' constraint on the key or not
 * @param {Key}      options.key Initialize this BST's key with key
 * @param {Value}    options.value Initialize this BST's data with [value]
 * @param {Function} options.compareKeys Initialize this BST's compareKeys
 */
function _AVLTree (options) {
  options = options || {};

  this.left = null;
  this.right = null;
  this.parent = options.parent !== undefined ? options.parent : null;
  if (options.hasOwnProperty('key')) { this.key = options.key; }
  this.data = options.hasOwnProperty('value') ? [options.value] : [];
  this.unique = options.unique || false;

  this.compareKeys = options.compareKeys || customUtils.defaultCompareKeysFunction;
  this.checkValueEquality = options.checkValueEquality || customUtils.defaultCheckValueEquality;
}


/**
 * Inherit basic functions from the basic binary search tree
 */
util.inherits(_AVLTree, BinarySearchTree);

/**
 * Keep a pointer to the internal tree constructor for testing purposes
 */
AVLTree._AVLTree = _AVLTree;


/**
 * Check the recorded height is correct for every node
 * Throws if one height doesn't match
 */
_AVLTree.prototype.checkHeightCorrect = function () {
  var leftH, rightH;

  if (!this.hasOwnProperty('key')) { return; }   // Empty tree

  if (this.left && this.left.height === undefined) { throw "Undefined height for node " + this.left.key; }
  if (this.right && this.right.height === undefined) { throw "Undefined height for node " + this.right.key; }
  if (this.height === undefined) { throw "Undefined height for node " + this.key; }

  leftH = this.left ? this.left.height : 0;
  rightH = this.right ? this.right.height : 0;

  if (this.height !== 1 + Math.max(leftH, rightH)) { throw "Height constraint failed for node " + this.key; }
  if (this.left) { this.left.checkHeightCorrect(); }
  if (this.right) { this.right.checkHeightCorrect(); }
};


/**
 * Return the balance factor
 */
_AVLTree.prototype.balanceFactor = function () {
  var leftH = this.left ? this.left.height : 0
    , rightH = this.right ? this.right.height : 0
    ;
  return leftH - rightH;
};


/**
 * Check that the balance factors are all between -1 and 1
 */
_AVLTree.prototype.checkBalanceFactors = function () {
  if (Math.abs(this.balanceFactor()) > 1) { throw 'Tree is unbalanced at node ' + this.key; }

  if (this.left) { this.left.checkBalanceFactors(); }
  if (this.right) { this.right.checkBalanceFactors(); }
};


/**
 * When checking if the BST conditions are met, also check that the heights are correct
 * and the tree is balanced
 */
_AVLTree.prototype.checkIsAVLT = function () {
  _AVLTree.super_.prototype.checkIsBST.call(this);
  this.checkHeightCorrect();
  this.checkBalanceFactors();
};
AVLTree.prototype.checkIsAVLT = function () { this.tree.checkIsAVLT(); };


/**
 * Perform a right rotation of the tree if possible
 * and return the root of the resulting tree
 * The resulting tree's nodes' heights are also updated
 */
_AVLTree.prototype.rightRotation = function () {
  var q = this
    , p = this.left
    , b
    , ah, bh, ch;

  if (!p) { return this; }   // No change

  b = p.right;

  // Alter tree structure
  if (q.parent) {
    p.parent = q.parent;
    if (q.parent.left === q) { q.parent.left = p; } else { q.parent.right = p; }
  } else {
    p.parent = null;
  }
  p.right = q;
  q.parent = p;
  q.left = b;
  if (b) { b.parent = q; }

  // Update heights
  ah = p.left ? p.left.height : 0;
  bh = b ? b.height : 0;
  ch = q.right ? q.right.height : 0;
  q.height = Math.max(bh, ch) + 1;
  p.height = Math.max(ah, q.height) + 1;

  return p;
};


/**
 * Perform a left rotation of the tree if possible
 * and return the root of the resulting tree
 * The resulting tree's nodes' heights are also updated
 */
_AVLTree.prototype.leftRotation = function () {
  var p = this
    , q = this.right
    , b
    , ah, bh, ch;

  if (!q) { return this; }   // No change

  b = q.left;

  // Alter tree structure
  if (p.parent) {
    q.parent = p.parent;
    if (p.parent.left === p) { p.parent.left = q; } else { p.parent.right = q; }
  } else {
    q.parent = null;
  }
  q.left = p;
  p.parent = q;
  p.right = b;
  if (b) { b.parent = p; }

  // Update heights
  ah = p.left ? p.left.height : 0;
  bh = b ? b.height : 0;
  ch = q.right ? q.right.height : 0;
  p.height = Math.max(ah, bh) + 1;
  q.height = Math.max(ch, p.height) + 1;

  return q;
};


/**
 * Modify the tree if its right subtree is too small compared to the left
 * Return the new root if any
 */
_AVLTree.prototype.rightTooSmall = function () {
  if (this.balanceFactor() <= 1) { return this; }   // Right is not too small, don't change

  if (this.left.balanceFactor() < 0) {
    this.left.leftRotation();
  }

  return this.rightRotation();
};


/**
 * Modify the tree if its left subtree is too small compared to the right
 * Return the new root if any
 */
_AVLTree.prototype.leftTooSmall = function () {
  if (this.balanceFactor() >= -1) { return this; }   // Left is not too small, don't change

  if (this.right.balanceFactor() > 0) {
    this.right.rightRotation();
  }

  return this.leftRotation();
};


/**
 * Rebalance the tree along the given path. The path is given reversed (as he was calculated
 * in the insert and delete functions).
 * Returns the new root of the tree
 * Of course, the first element of the path must be the root of the tree
 */
_AVLTree.prototype.rebalanceAlongPath = function (path) {
  var newRoot = this
    , rotated
    , i;

  if (!this.hasOwnProperty('key')) { delete this.height; return this; }   // Empty tree

  // Rebalance the tree and update all heights
  for (i = path.length - 1; i >= 0; i -= 1) {
    path[i].height = 1 + Math.max(path[i].left ? path[i].left.height : 0, path[i].right ? path[i].right.height : 0);

    if (path[i].balanceFactor() > 1) {
      rotated = path[i].rightTooSmall();
      if (i === 0) { newRoot = rotated; }
    }

    if (path[i].balanceFactor() < -1) {
      rotated = path[i].leftTooSmall();
      if (i === 0) { newRoot = rotated; }
    }
  }

  return newRoot;
};


/**
 * Insert a key, value pair in the tree while maintaining the AVL tree height constraint
 * Return a pointer to the root node, which may have changed
 */
_AVLTree.prototype.insert = function (key, value) {
  var insertPath = []
    , currentNode = this
    ;

  // Empty tree, insert as root
  if (!this.hasOwnProperty('key')) {
    this.key = key;
    this.data.push(value);
    this.height = 1;
    return this;
  }

  // Insert new leaf at the right place
  while (true) {
    // Same key: no change in the tree structure
    if (currentNode.compareKeys(currentNode.key, key) === 0) {
      if (currentNode.unique) {
        throw { message: "Can't insert key " + key + ", it violates the unique constraint"
              , key: key
              , errorType: 'uniqueViolated'
              };
      } else {
        currentNode.data.push(value);
      }
      return this;
    }

    insertPath.push(currentNode);

    if (currentNode.compareKeys(key, currentNode.key) < 0) {
      if (!currentNode.left) {
        insertPath.push(currentNode.createLeftChild({ key: key, value: value }));
        break;
      } else {
        currentNode = currentNode.left;
      }
    } else {
      if (!currentNode.right) {
        insertPath.push(currentNode.createRightChild({ key: key, value: value }));
        break;
      } else {
        currentNode = currentNode.right;
      }
    }
  }

  return this.rebalanceAlongPath(insertPath);
};

// Insert in the internal tree, update the pointer to the root if needed
AVLTree.prototype.insert = function (key, value) {
  var newTree = this.tree.insert(key, value);

  // If newTree is undefined, that means its structure was not modified
  if (newTree) { this.tree = newTree; }
};


/**
 * Delete a key or just a value and return the new root of the tree
 * @param {Key} key
 * @param {Value} value Optional. If not set, the whole key is deleted. If set, only this value is deleted
 */
_AVLTree.prototype.delete = function (key, value) {
  var newData = [], replaceWith
    , self = this
    , currentNode = this
    , deletePath = []
    ;

  if (!this.hasOwnProperty('key')) { return this; }   // Empty tree

  // Either no match is found and the function will return from within the loop
  // Or a match is found and deletePath will contain the path from the root to the node to delete after the loop
  while (true) {
    if (currentNode.compareKeys(key, currentNode.key) === 0) { break; }

    deletePath.push(currentNode);

    if (currentNode.compareKeys(key, currentNode.key) < 0) {
      if (currentNode.left) {
        currentNode = currentNode.left;
      } else {
        return this;   // Key not found, no modification
      }
    } else {
      // currentNode.compareKeys(key, currentNode.key) is > 0
      if (currentNode.right) {
        currentNode = currentNode.right;
      } else {
        return this;   // Key not found, no modification
      }
    }
  }

  // Delete only a value (no tree modification)
  if (currentNode.data.length > 1 && value) {
    currentNode.data.forEach(function (d) {
      if (!currentNode.checkValueEquality(d, value)) { newData.push(d); }
    });
    currentNode.data = newData;
    return this;
  }

  // Delete a whole node

  // Leaf
  if (!currentNode.left && !currentNode.right) {
    if (currentNode === this) {   // This leaf is also the root
      delete currentNode.key;
      currentNode.data = [];
      delete currentNode.height;
      return this;
    } else {
      if (currentNode.parent.left === currentNode) {
        currentNode.parent.left = null;
      } else {
        currentNode.parent.right = null;
      }
      return this.rebalanceAlongPath(deletePath);
    }
  }


  // Node with only one child
  if (!currentNode.left || !currentNode.right) {
    replaceWith = currentNode.left ? currentNode.left : currentNode.right;

    if (currentNode === this) {   // This node is also the root
      replaceWith.parent = null;
      return replaceWith;   // height of replaceWith is necessarily 1 because the tree was balanced before deletion
    } else {
      if (currentNode.parent.left === currentNode) {
        currentNode.parent.left = replaceWith;
        replaceWith.parent = currentNode.parent;
      } else {
        currentNode.parent.right = replaceWith;
        replaceWith.parent = currentNode.parent;
      }

      return this.rebalanceAlongPath(deletePath);
    }
  }


  // Node with two children
  // Use the in-order predecessor (no need to randomize since we actively rebalance)
  deletePath.push(currentNode);
  replaceWith = currentNode.left;

  // Special case: the in-order predecessor is right below the node to delete
  if (!replaceWith.right) {
    currentNode.key = replaceWith.key;
    currentNode.data = replaceWith.data;
    currentNode.left = replaceWith.left;
    if (replaceWith.left) { replaceWith.left.parent = currentNode; }
    return this.rebalanceAlongPath(deletePath);
  }

  // After this loop, replaceWith is the right-most leaf in the left subtree
  // and deletePath the path from the root (inclusive) to replaceWith (exclusive)
  while (true) {
    if (replaceWith.right) {
      deletePath.push(replaceWith);
      replaceWith = replaceWith.right;
    } else {
      break;
    }
  }

  currentNode.key = replaceWith.key;
  currentNode.data = replaceWith.data;

  replaceWith.parent.right = replaceWith.left;
  if (replaceWith.left) { replaceWith.left.parent = replaceWith.parent; }

  return this.rebalanceAlongPath(deletePath);
};

// Delete a value
AVLTree.prototype.delete = function (key, value) {
  var newTree = this.tree.delete(key, value);

  // If newTree is undefined, that means its structure was not modified
  if (newTree) { this.tree = newTree; }
};


/**
 * Other functions we want to use on an AVLTree as if it were the internal _AVLTree
 */
['getNumberOfKeys', 'search', 'betweenBounds', 'prettyPrint', 'executeOnEveryNode'].forEach(function (fn) {
  AVLTree.prototype[fn] = function () {
    return this.tree[fn].apply(this.tree, arguments);
  };
});


// Interface
module.exports = AVLTree;

},{"./bst":16,"./customUtils":17,"underscore":18,"util":3}],16:[function(require,module,exports){
/**
 * Simple binary search tree
 */
var customUtils = require('./customUtils');


/**
 * Constructor
 * @param {Object} options Optional
 * @param {Boolean}  options.unique Whether to enforce a 'unique' constraint on the key or not
 * @param {Key}      options.key Initialize this BST's key with key
 * @param {Value}    options.value Initialize this BST's data with [value]
 * @param {Function} options.compareKeys Initialize this BST's compareKeys
 */
function BinarySearchTree (options) {
  options = options || {};

  this.left = null;
  this.right = null;
  this.parent = options.parent !== undefined ? options.parent : null;
  if (options.hasOwnProperty('key')) { this.key = options.key; }
  this.data = options.hasOwnProperty('value') ? [options.value] : [];
  this.unique = options.unique || false;

  this.compareKeys = options.compareKeys || customUtils.defaultCompareKeysFunction;
  this.checkValueEquality = options.checkValueEquality || customUtils.defaultCheckValueEquality;
}


// ================================
// Methods used to test the tree
// ================================


/**
 * Get the descendant with max key
 */
BinarySearchTree.prototype.getMaxKeyDescendant = function () {
  if (this.right) {
    return this.right.getMaxKeyDescendant();
  } else {
    return this;
  }
};


/**
 * Get the maximum key
 */
BinarySearchTree.prototype.getMaxKey = function () {
  return this.getMaxKeyDescendant().key;
};


/**
 * Get the descendant with min key
 */
BinarySearchTree.prototype.getMinKeyDescendant = function () {
  if (this.left) {
    return this.left.getMinKeyDescendant()
  } else {
    return this;
  }
};


/**
 * Get the minimum key
 */
BinarySearchTree.prototype.getMinKey = function () {
  return this.getMinKeyDescendant().key;
};


/**
 * Check that all nodes (incl. leaves) fullfil condition given by fn
 * test is a function passed every (key, data) and which throws if the condition is not met
 */
BinarySearchTree.prototype.checkAllNodesFullfillCondition = function (test) {
  if (!this.hasOwnProperty('key')) { return; }

  test(this.key, this.data);
  if (this.left) { this.left.checkAllNodesFullfillCondition(test); }
  if (this.right) { this.right.checkAllNodesFullfillCondition(test); }
};


/**
 * Check that the core BST properties on node ordering are verified
 * Throw if they aren't
 */
BinarySearchTree.prototype.checkNodeOrdering = function () {
  var self = this;

  if (!this.hasOwnProperty('key')) { return; }

  if (this.left) {
    this.left.checkAllNodesFullfillCondition(function (k) {
      if (self.compareKeys(k, self.key) >= 0) {
        throw 'Tree with root ' + self.key + ' is not a binary search tree';
      }
    });
    this.left.checkNodeOrdering();
  }

  if (this.right) {
    this.right.checkAllNodesFullfillCondition(function (k) {
      if (self.compareKeys(k, self.key) <= 0) {
        throw 'Tree with root ' + self.key + ' is not a binary search tree';
      }
    });
    this.right.checkNodeOrdering();
  }
};


/**
 * Check that all pointers are coherent in this tree
 */
BinarySearchTree.prototype.checkInternalPointers = function () {
  if (this.left) {
    if (this.left.parent !== this) { throw 'Parent pointer broken for key ' + this.key; }
    this.left.checkInternalPointers();
  }

  if (this.right) {
    if (this.right.parent !== this) { throw 'Parent pointer broken for key ' + this.key; }
    this.right.checkInternalPointers();
  }
};


/**
 * Check that a tree is a BST as defined here (node ordering and pointer references)
 */
BinarySearchTree.prototype.checkIsBST = function () {
  this.checkNodeOrdering();
  this.checkInternalPointers();
  if (this.parent) { throw "The root shouldn't have a parent"; }
};


/**
 * Get number of keys inserted
 */
BinarySearchTree.prototype.getNumberOfKeys = function () {
  var res;

  if (!this.hasOwnProperty('key')) { return 0; }

  res = 1;
  if (this.left) { res += this.left.getNumberOfKeys(); }
  if (this.right) { res += this.right.getNumberOfKeys(); }

  return res;
};



// ============================================
// Methods used to actually work on the tree
// ============================================

/**
 * Create a BST similar (i.e. same options except for key and value) to the current one
 * Use the same constructor (i.e. BinarySearchTree, AVLTree etc)
 * @param {Object} options see constructor
 */
BinarySearchTree.prototype.createSimilar = function (options) {
  options = options || {};
  options.unique = this.unique;
  options.compareKeys = this.compareKeys;
  options.checkValueEquality = this.checkValueEquality;

  return new this.constructor(options);
};


/**
 * Create the left child of this BST and return it
 */
BinarySearchTree.prototype.createLeftChild = function (options) {
  var leftChild = this.createSimilar(options);
  leftChild.parent = this;
  this.left = leftChild;

  return leftChild;
};


/**
 * Create the right child of this BST and return it
 */
BinarySearchTree.prototype.createRightChild = function (options) {
  var rightChild = this.createSimilar(options);
  rightChild.parent = this;
  this.right = rightChild;

  return rightChild;
};


/**
 * Insert a new element
 */
BinarySearchTree.prototype.insert = function (key, value) {
  // Empty tree, insert as root
  if (!this.hasOwnProperty('key')) {
    this.key = key;
    this.data.push(value);
    return;
  }

  // Same key as root
  if (this.compareKeys(this.key, key) === 0) {
    if (this.unique) {
      throw { message: "Can't insert key " + key + ", it violates the unique constraint"
            , key: key
            , errorType: 'uniqueViolated'
            };
    } else {
      this.data.push(value);
    }
    return;
  }

  if (this.compareKeys(key, this.key) < 0) {
    // Insert in left subtree
    if (this.left) {
      this.left.insert(key, value);
    } else {
      this.createLeftChild({ key: key, value: value });
    }
  } else {
    // Insert in right subtree
    if (this.right) {
      this.right.insert(key, value);
    } else {
      this.createRightChild({ key: key, value: value });
    }
  }
};


/**
 * Search for all data corresponding to a key
 */
BinarySearchTree.prototype.search = function (key) {
  if (!this.hasOwnProperty('key')) { return []; }

  if (this.compareKeys(this.key, key) === 0) { return this.data; }

  if (this.compareKeys(key, this.key) < 0) {
    if (this.left) {
      return this.left.search(key);
    } else {
      return [];
    }
  } else {
    if (this.right) {
      return this.right.search(key);
    } else {
      return [];
    }
  }
};


/**
 * Return a function that tells whether a given key matches a lower bound
 */
BinarySearchTree.prototype.getLowerBoundMatcher = function (query) {
  var self = this;

  // No lower bound
  if (!query.hasOwnProperty('$gt') && !query.hasOwnProperty('$gte')) {
    return function () { return true; };
  }

  if (query.hasOwnProperty('$gt') && query.hasOwnProperty('$gte')) {
    if (self.compareKeys(query.$gte, query.$gt) === 0) {
      return function (key) { return self.compareKeys(key, query.$gt) > 0; };
    }

    if (self.compareKeys(query.$gte, query.$gt) > 0) {
      return function (key) { return self.compareKeys(key, query.$gte) >= 0; };
    } else {
      return function (key) { return self.compareKeys(key, query.$gt) > 0; };
    }
  }

  if (query.hasOwnProperty('$gt')) {
    return function (key) { return self.compareKeys(key, query.$gt) > 0; };
  } else {
    return function (key) { return self.compareKeys(key, query.$gte) >= 0; };
  }
};


/**
 * Return a function that tells whether a given key matches an upper bound
 */
BinarySearchTree.prototype.getUpperBoundMatcher = function (query) {
  var self = this;

  // No lower bound
  if (!query.hasOwnProperty('$lt') && !query.hasOwnProperty('$lte')) {
    return function () { return true; };
  }

  if (query.hasOwnProperty('$lt') && query.hasOwnProperty('$lte')) {
    if (self.compareKeys(query.$lte, query.$lt) === 0) {
      return function (key) { return self.compareKeys(key, query.$lt) < 0; };
    }

    if (self.compareKeys(query.$lte, query.$lt) < 0) {
      return function (key) { return self.compareKeys(key, query.$lte) <= 0; };
    } else {
      return function (key) { return self.compareKeys(key, query.$lt) < 0; };
    }
  }

  if (query.hasOwnProperty('$lt')) {
    return function (key) { return self.compareKeys(key, query.$lt) < 0; };
  } else {
    return function (key) { return self.compareKeys(key, query.$lte) <= 0; };
  }
};


// Append all elements in toAppend to array
function append (array, toAppend) {
  var i;

  for (i = 0; i < toAppend.length; i += 1) {
    array.push(toAppend[i]);
  }
}


/**
 * Get all data for a key between bounds
 * Return it in key order
 * @param {Object} query Mongo-style query where keys are $lt, $lte, $gt or $gte (other keys are not considered)
 * @param {Functions} lbm/ubm matching functions calculated at the first recursive step
 */
BinarySearchTree.prototype.betweenBounds = function (query, lbm, ubm) {
  var res = [];

  if (!this.hasOwnProperty('key')) { return []; }   // Empty tree

  lbm = lbm || this.getLowerBoundMatcher(query);
  ubm = ubm || this.getUpperBoundMatcher(query);

  if (lbm(this.key) && this.left) { append(res, this.left.betweenBounds(query, lbm, ubm)); }
  if (lbm(this.key) && ubm(this.key)) { append(res, this.data); }
  if (ubm(this.key) && this.right) { append(res, this.right.betweenBounds(query, lbm, ubm)); }

  return res;
};


/**
 * Delete the current node if it is a leaf
 * Return true if it was deleted
 */
BinarySearchTree.prototype.deleteIfLeaf = function () {
  if (this.left || this.right) { return false; }

  // The leaf is itself a root
  if (!this.parent) {
    delete this.key;
    this.data = [];
    return true;
  }

  if (this.parent.left === this) {
    this.parent.left = null;
  } else {
    this.parent.right = null;
  }

  return true;
};


/**
 * Delete the current node if it has only one child
 * Return true if it was deleted
 */
BinarySearchTree.prototype.deleteIfOnlyOneChild = function () {
  var child;

  if (this.left && !this.right) { child = this.left; }
  if (!this.left && this.right) { child = this.right; }
  if (!child) { return false; }

  // Root
  if (!this.parent) {
    this.key = child.key;
    this.data = child.data;

    this.left = null;
    if (child.left) {
      this.left = child.left;
      child.left.parent = this;
    }

    this.right = null;
    if (child.right) {
      this.right = child.right;
      child.right.parent = this;
    }

    return true;
  }

  if (this.parent.left === this) {
    this.parent.left = child;
    child.parent = this.parent;
  } else {
    this.parent.right = child;
    child.parent = this.parent;
  }

  return true;
};


/**
 * Delete a key or just a value
 * @param {Key} key
 * @param {Value} value Optional. If not set, the whole key is deleted. If set, only this value is deleted
 */
BinarySearchTree.prototype.delete = function (key, value) {
  var newData = [], replaceWith
    , self = this
    ;

  if (!this.hasOwnProperty('key')) { return; }

  if (this.compareKeys(key, this.key) < 0) {
    if (this.left) { this.left.delete(key, value); }
    return;
  }

  if (this.compareKeys(key, this.key) > 0) {
    if (this.right) { this.right.delete(key, value); }
    return;
  }

  if (!this.compareKeys(key, this.key) === 0) { return; }

  // Delete only a value
  if (this.data.length > 1 && value !== undefined) {
    this.data.forEach(function (d) {
      if (!self.checkValueEquality(d, value)) { newData.push(d); }
    });
    self.data = newData;
    return;
  }

  // Delete the whole node
  if (this.deleteIfLeaf()) {
    return;
  }
  if (this.deleteIfOnlyOneChild()) {
    return;
  }

  // We are in the case where the node to delete has two children
  if (Math.random() >= 0.5) {   // Randomize replacement to avoid unbalancing the tree too much
    // Use the in-order predecessor
    replaceWith = this.left.getMaxKeyDescendant();

    this.key = replaceWith.key;
    this.data = replaceWith.data;

    if (this === replaceWith.parent) {   // Special case
      this.left = replaceWith.left;
      if (replaceWith.left) { replaceWith.left.parent = replaceWith.parent; }
    } else {
      replaceWith.parent.right = replaceWith.left;
      if (replaceWith.left) { replaceWith.left.parent = replaceWith.parent; }
    }
  } else {
    // Use the in-order successor
    replaceWith = this.right.getMinKeyDescendant();

    this.key = replaceWith.key;
    this.data = replaceWith.data;

    if (this === replaceWith.parent) {   // Special case
      this.right = replaceWith.right;
      if (replaceWith.right) { replaceWith.right.parent = replaceWith.parent; }
    } else {
      replaceWith.parent.left = replaceWith.right;
      if (replaceWith.right) { replaceWith.right.parent = replaceWith.parent; }
    }
  }
};


/**
 * Execute a function on every node of the tree, in key order
 * @param {Function} fn Signature: node. Most useful will probably be node.key and node.data
 */
BinarySearchTree.prototype.executeOnEveryNode = function (fn) {
  if (this.left) { this.left.executeOnEveryNode(fn); }
  fn(this);
  if (this.right) { this.right.executeOnEveryNode(fn); }
};


/**
 * Pretty print a tree
 * @param {Boolean} printData To print the nodes' data along with the key
 */
BinarySearchTree.prototype.prettyPrint = function (printData, spacing) {
  spacing = spacing || "";

  console.log(spacing + "* " + this.key);
  if (printData) { console.log(spacing + "* " + this.data); }

  if (!this.left && !this.right) { return; }

  if (this.left) {
    this.left.prettyPrint(printData, spacing + "  ");
  } else {
    console.log(spacing + "  *");
  }
  if (this.right) {
    this.right.prettyPrint(printData, spacing + "  ");
  } else {
    console.log(spacing + "  *");
  }
};




// Interface
module.exports = BinarySearchTree;

},{"./customUtils":17}],17:[function(require,module,exports){
/**
 * Return an array with the numbers from 0 to n-1, in a random order
 */
function getRandomArray (n) {
  var res, next;

  if (n === 0) { return []; }
  if (n === 1) { return [0]; }

  res = getRandomArray(n - 1);
  next = Math.floor(Math.random() * n);
  res.splice(next, 0, n - 1);   // Add n-1 at a random position in the array

  return res;
};
module.exports.getRandomArray = getRandomArray;


/*
 * Default compareKeys function will work for numbers, strings and dates
 */
function defaultCompareKeysFunction (a, b) {
  if (a < b) { return -1; }
  if (a > b) { return 1; }
  if (a === b) { return 0; }

  throw { message: "Couldn't compare elements", a: a, b: b };
}
module.exports.defaultCompareKeysFunction = defaultCompareKeysFunction;


/**
 * Check whether two values are equal (used in non-unique deletion)
 */
function defaultCheckValueEquality (a, b) {
  return a === b;
}
module.exports.defaultCheckValueEquality = defaultCheckValueEquality;

},{}],18:[function(require,module,exports){
//     Underscore.js 1.4.4
//     http://underscorejs.org
//     (c) 2009-2013 Jeremy Ashkenas, DocumentCloud Inc.
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `global` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var push             = ArrayProto.push,
      slice            = ArrayProto.slice,
      concat           = ArrayProto.concat,
      toString         = ObjProto.toString,
      hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.4.4';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, l = obj.length; i < l; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      for (var key in obj) {
        if (_.has(obj, key)) {
          if (iterator.call(context, obj[key], key, obj) === breaker) return;
        }
      }
    }
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results[results.length] = iterator.call(context, value, index, list);
    });
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var length = obj.length;
    if (length !== +length) {
      var keys = _.keys(obj);
      length = keys.length;
    }
    each(obj, function(value, index, list) {
      index = keys ? keys[--length] : --length;
      if (!initial) {
        memo = obj[index];
        initial = true;
      } else {
        memo = iterator.call(context, memo, obj[index], index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, iterator, context) {
    var result;
    any(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
    each(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, iterator, context) {
    return _.filter(obj, function(value, index, list) {
      return !iterator.call(context, value, index, list);
    }, context);
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
    each(obj, function(value, index, list) {
      if (!(result = result && iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
    each(obj, function(value, index, list) {
      if (result || (result = iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    return any(obj, function(value) {
      return value === target;
    });
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, function(value){ return value[key]; });
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs, first) {
    if (_.isEmpty(attrs)) return first ? null : [];
    return _[first ? 'find' : 'filter'](obj, function(value) {
      for (var key in attrs) {
        if (attrs[key] !== value[key]) return false;
      }
      return true;
    });
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.where(obj, attrs, true);
  };

  // Return the maximum element or (element-based computation).
  // Can't optimize arrays of integers longer than 65,535 elements.
  // See: https://bugs.webkit.org/show_bug.cgi?id=80797
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.max.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return -Infinity;
    var result = {computed : -Infinity, value: -Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed >= result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.min.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return Infinity;
    var result = {computed : Infinity, value: Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed < result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Shuffle an array.
  _.shuffle = function(obj) {
    var rand;
    var index = 0;
    var shuffled = [];
    each(obj, function(value) {
      rand = _.random(index++);
      shuffled[index - 1] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };

  // An internal function to generate lookup iterators.
  var lookupIterator = function(value) {
    return _.isFunction(value) ? value : function(obj){ return obj[value]; };
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, value, context) {
    var iterator = lookupIterator(value);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value : value,
        index : index,
        criteria : iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index < right.index ? -1 : 1;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(obj, value, context, behavior) {
    var result = {};
    var iterator = lookupIterator(value || _.identity);
    each(obj, function(value, index) {
      var key = iterator.call(context, value, index, obj);
      behavior(result, key, value);
    });
    return result;
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = function(obj, value, context) {
    return group(obj, value, context, function(result, key, value) {
      (_.has(result, key) ? result[key] : (result[key] = [])).push(value);
    });
  };

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = function(obj, value, context) {
    return group(obj, value, context, function(result, key) {
      if (!_.has(result, key)) result[key] = 0;
      result[key]++;
    });
  };

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator, context) {
    iterator = iterator == null ? _.identity : lookupIterator(iterator);
    var value = iterator.call(context, obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >>> 1;
      iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely convert anything iterable into a real, live array.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    return (n != null) && !guard ? slice.call(array, 0, n) : array[0];
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n != null) && !guard) {
      return slice.call(array, Math.max(array.length - n, 0));
    } else {
      return array[array.length - 1];
    }
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, (n == null) || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, output) {
    each(input, function(value) {
      if (_.isArray(value)) {
        shallow ? push.apply(output, value) : flatten(value, shallow, output);
      } else {
        output.push(value);
      }
    });
    return output;
  };

  // Return a completely flattened version of an array.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator, context) {
    if (_.isFunction(isSorted)) {
      context = iterator;
      iterator = isSorted;
      isSorted = false;
    }
    var initial = iterator ? _.map(array, iterator, context) : array;
    var results = [];
    var seen = [];
    each(initial, function(value, index) {
      if (isSorted ? (!index || seen[seen.length - 1] !== value) : !_.contains(seen, value)) {
        seen.push(value);
        results.push(array[index]);
      }
    });
    return results;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(concat.apply(ArrayProto, arguments));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.indexOf(other, item) >= 0;
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
    return _.filter(array, function(value){ return !_.contains(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var args = slice.call(arguments);
    var length = _.max(_.pluck(args, 'length'));
    var results = new Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(args, "" + i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, l = list.length; i < l; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, l = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = (isSorted < 0 ? Math.max(0, l + isSorted) : isSorted);
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
    for (; i < l; i++) if (array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var hasIndex = from != null;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
      return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
    }
    var i = (hasIndex ? from : array.length);
    while (i--) if (array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var len = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(len);

    while(idx < len) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    if (func.bind === nativeBind && nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    var args = slice.call(arguments, 2);
    return function() {
      return func.apply(context, args.concat(slice.call(arguments)));
    };
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context.
  _.partial = function(func) {
    var args = slice.call(arguments, 1);
    return function() {
      return func.apply(this, args.concat(slice.call(arguments)));
    };
  };

  // Bind all of an object's methods to that object. Useful for ensuring that
  // all callbacks defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length === 0) funcs = _.functions(obj);
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  _.throttle = function(func, wait) {
    var context, args, timeout, result;
    var previous = 0;
    var later = function() {
      previous = new Date;
      timeout = null;
      result = func.apply(context, args);
    };
    return function() {
      var now = new Date;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
      } else if (!timeout) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, result;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) result = func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) result = func.apply(context, args);
      return result;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      memo = func.apply(this, arguments);
      func = null;
      return memo;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return function() {
      var args = [func];
      push.apply(args, arguments);
      return wrapper.apply(this, args);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    if (times <= 0) return func();
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = nativeKeys || function(obj) {
    if (obj !== Object(obj)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys[keys.length] = key;
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var values = [];
    for (var key in obj) if (_.has(obj, key)) values.push(obj[key]);
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var pairs = [];
    for (var key in obj) if (_.has(obj, key)) pairs.push([key, obj[key]]);
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    for (var key in obj) if (_.has(obj, key)) result[obj[key]] = key;
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    each(keys, function(key) {
      if (key in obj) copy[key] = obj[key];
    });
    return copy;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    for (var key in obj) {
      if (!_.contains(keys, key)) copy[key] = obj[key];
    }
    return copy;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] == null) obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the Harmony `egal` proposal: http://wiki.ecmascript.org/doku.php?id=harmony:egal.
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] == a) return bStack[length] == b;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Objects with different constructors are not equivalent, but `Object`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) &&
                               _.isFunction(bCtor) && (bCtor instanceof bCtor))) {
        return false;
      }
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) == '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Optimize `isFunction` if appropriate.
  if (typeof (/./) !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj === 'function';
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj != +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  // Run a function **n** times.
  _.times = function(n, iterator, context) {
    var accum = Array(n);
    for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // List of HTML entities for escaping.
  var entityMap = {
    escape: {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '/': '&#x2F;'
    }
  };
  entityMap.unescape = _.invert(entityMap.escape);

  // Regexes containing the keys and values listed immediately above.
  var entityRegexes = {
    escape:   new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
    unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
  };

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  _.each(['escape', 'unescape'], function(method) {
    _[method] = function(string) {
      if (string == null) return '';
      return ('' + string).replace(entityRegexes[method], function(match) {
        return entityMap[method][match];
      });
    };
  });

  // If the value of the named property is a function then invoke it;
  // otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return null;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name){
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\t':     't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(text, data, settings) {
    var render;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = new RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset)
        .replace(escaper, function(match) { return '\\' + escapes[match]; });

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      }
      if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      }
      if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }
      index = offset + match.length;
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + "return __p;\n";

    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    if (data) return render(data, _);
    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled function source as a convenience for precompilation.
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  _.extend(_.prototype, {

    // Start chaining a wrapped Underscore object.
    chain: function() {
      this._chain = true;
      return this;
    },

    // Extracts the result from a wrapped and chained object.
    value: function() {
      return this._wrapped;
    }

  });

}).call(this);

},{}]},{},[7])(7)
});
;

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
								if( !self.timeout_hideself )
									self.timeout_hideself = setTimeout(function(){
										self.timeout_hideself = null
										self.hide()
									}, 10)
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

	_frame.menu.menus.push(this)
}

_menu.prototype.show = function( targetEl, mouseX, mouseY ){
	if( this.showing )
		return this
	
	if( typeof targetEl == 'number' )
		return this.show( 'mouse', targetEl, mouseX )

	var top, left, viewport_height, viewport_width, menu_height, menu_width
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
		if( targetEl && targetEl instanceof jQuery ){
			var offset 	= targetEl.offset()
			top		= offset.top + targetEl.height() - $body.scrollTop()
			left 	= offset.left - $body.scrollLeft()
		}else if( targetEl == 'mouse' || (!targetEl && typeof mouseX == 'number') ){
			left	= mouseX || 0
			top 	= (mouseY + 5) || 0
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

	// 虚化背景
		if( this.settings.showBlured ){
			node.win.capturePage(this.capturePage_callback.bind(this), 'jpg', 'datauri')
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

_menu.prototype.capturePage_callback = function( datauri ){
	console.log(this)
	if( this.showing ){
		this.dom.blured = $('<s class="blured"/>').css('background-image', 'url('+datauri+')').appendTo( this.dom.menu.addClass('on') )
	}
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
		_frame.modal.dom.container.removeClass('on')
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

	_frame.modal.dom.container = $('<div class="container modal" />').on({
										'transitionend.modal_hide': function(e){
											if( _frame.modal.showing
												&& e.currentTarget == e.target
												&& e.originalEvent.propertyName == 'opacity'
												&& parseFloat($(this).css('opacity')) <= 0
											){
												_frame.modal.hide_timeout = setTimeout(function(){
													_frame.modal.reset()
													_frame.modal.dom.container.removeClass('show')
														//.off('transitionend.modal_hide')
													_frame.modal.showing = false
												}, 10)
											}
										}
									}).prependTo($body)
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
			if( typeof node != 'undefined' ){
				node.win.capturePage(function(datauri){
					_p.tip.dom_bluredbg.css(
						'background-image',
						'url('+datauri+')'
					)
				}, 'jpg', 'datauri')
			}
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

		//_p.tip.el_pending = null

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
			if( w > offset.left ){
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
					_p.tip.filters.forEach(function(filter){
						cont = filter(cont) || cont
					})
					el.data({
						'tip': 				cont,
						'tip-filtered': 	true
					})
				}

				//_p.tip.el_pending = el
				
				//setTimeout(function(){
				//	if( _p.tip.el_pending == el )
						_p.tip.show(
							cont,
							el,
							el.data('tip-position')
						)
				//}, 100)
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
});

"use strict";

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
			SmallRadar:			24,		// 小型雷达
			LargeRadar:			25,		// 大型雷达
			DepthCharge:		26,		// 爆雷
			Sonar:				27,		// 声纳
			LargeSonar:			28,		// 大型声纳
			AAGun:				29,		// 对空机枪
			AAGunConcentrated:	30,		// 对空机枪（集中配备）
			Searchlight:		39,		// 探照灯
			SearchlightLarge:	46,		// 大型探照灯
			SuparRadar:			47		// 超大型雷达
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
								if( equipment && !isCV && $.inArray(equipment.type, Formula.equipmentType.AircraftBased) > -1 )
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
			// 制空战力，装备须为战斗机类型 Formula.type.typeFighters
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
					console.log(count)
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
		}
		
		return '-'
	}
}

Formula.equipmentType.MainGuns = [
		Formula.equipmentType.SmallCaliber,
		Formula.equipmentType.SmallCaliberHigh,
		Formula.equipmentType.SmallCaliberAA,
		Formula.equipmentType.MediumCaliber,
		Formula.equipmentType.LargeCaliber,
		Formula.equipmentType.SuperCaliber
	]

Formula.equipmentType.LargeCalibers = [
		Formula.equipmentType.LargeCaliber,
		Formula.equipmentType.SuperCaliber
	]

Formula.equipmentType.SecondaryGuns = [
		Formula.equipmentType.SecondaryGun,
		Formula.equipmentType.SecondaryGunHigh,
		Formula.equipmentType.SecondaryGunAA
	]

Formula.equipmentType.Torpedos = [
		Formula.equipmentType.Torpedo,
		Formula.equipmentType.SubmarineTorpedo
	]

Formula.equipmentType.Seaplanes = [
		Formula.equipmentType.ReconSeaplane,
		Formula.equipmentType.ReconSeaplaneNight,
		Formula.equipmentType.SeaplaneBomber
	]

Formula.equipmentType.Fighters = [
		Formula.equipmentType.SeaplaneBomber,
		Formula.equipmentType.CarrierFighter,
		Formula.equipmentType.TorpedoBomber,
		Formula.equipmentType.DiveBomber,
		Formula.equipmentType.CarrierRecon
	]

Formula.equipmentType.Recons = [
		Formula.equipmentType.ReconSeaplane,
		Formula.equipmentType.ReconSeaplaneNight,
		Formula.equipmentType.CarrierRecon
	]

Formula.equipmentType.AircraftBased = [
		Formula.equipmentType.CarrierFighter,
		Formula.equipmentType.TorpedoBomber,
		Formula.equipmentType.DiveBomber,
		Formula.equipmentType.CarrierRecon
	]

Formula.equipmentType.Radars = [
		Formula.equipmentType.SmallRadar,
		Formula.equipmentType.LargeRadar,
		Formula.equipmentType.SuparRadar
	]

Formula.equipmentType.AntiSubmarines = [
		Formula.equipmentType.DepthCharge,
		Formula.equipmentType.Sonar,
		Formula.equipmentType.LargeSonar
	]

Formula.equipmentType.AAGuns = [
		Formula.equipmentType.AAGun,
		Formula.equipmentType.AAGunConcentrated
	]

Formula.equipmentType.Searchlights = [
		Formula.equipmentType.Searchlight,
		Formula.equipmentType.SearchlightLarge
	]




Formula.shellingDamage = function(ship, equipments_by_slot, star_by_slot, rank_by_slot){
	return this.calculate( 'shellingDamage', ship, equipments_by_slot, star_by_slot, rank_by_slot )
}
Formula.torpedoDamage = function(ship, equipments_by_slot, star_by_slot, rank_by_slot){
	return this.calculate( 'torpedoDamage', ship, equipments_by_slot, star_by_slot, rank_by_slot )
}
Formula.fighterPower = function(ship, equipments_by_slot, star_by_slot, rank_by_slot){
	return this.calculate( 'fighterPower', ship, equipments_by_slot, star_by_slot, rank_by_slot )
}
Formula.nightBattle = function(ship, equipments_by_slot, star_by_slot, rank_by_slot){
	return this.calculate( 'nightBattle', ship, equipments_by_slot, star_by_slot, rank_by_slot )
}
Formula.addHit = function(ship, equipments_by_slot, star_by_slot, rank_by_slot){
	return this.calculate( 'addHit', ship, equipments_by_slot, star_by_slot, rank_by_slot )
}
Formula.addArmor = function(ship, equipments_by_slot, star_by_slot, rank_by_slot){
	return this.calculate( 'addArmor', ship, equipments_by_slot, star_by_slot, rank_by_slot )
}
Formula.addEvasion = function(ship, equipments_by_slot, star_by_slot, rank_by_slot){
	return this.calculate( 'addEvasion', ship, equipments_by_slot, star_by_slot, rank_by_slot )
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
						return node.path.join(_g.path.pics.ships, this.id + '/' +picId+ '.webp')
						break;
					default:
						if( series[i].illust_delete ){
							return node.path.join(_g.path.pics.ships, series[i-1].id + '/' +picId+ '.webp')
						}else{
							return node.path.join(_g.path.pics.ships, this.id + '/' +picId+ '.webp')
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
		
		switch(version){
			case 3:
				result = []
				i=0
				while( data_fleet = data['f' + (i+1)] ){
					result[i] = []
					j=0
					while( data_ship = data_fleet['s' + (j+1)] ){
						if( data_ship.id ){
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
						}
						if( data_ship.items ){
							k=0
							while( data_item = data_ship.items['i' + (k+1)] ){
								if( data_item.id ){
									result[i][j][2][k] = data_item.id
									result[i][j][3][k] = data_item.rf || null
									result[i][j][4][k] = data_item.rp || null
								}
								k++
							}
						}
						j++
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


// Global Variables
	_g.animate_duration_delay = 320;
	_g.inputIndex = 0
	_g.lang = 'zh_cn'
	_g.joint = '・'

	_g.path = {
		'db': 		'/!/db/',
		'bgimg_dir':'/!/assets/images/homebg/',
		'pics': {
			'ships': 	'/!/pics/ships/',
			'items': 	'/!/pics/items/'
		}
	}
	
	_g.dbs = [
		'ships',
		'ship_types',
		'ship_series',
		'ship_namesuffix',
		
		'items',
		'item_types'
	]

	_g.data = {}

	var _db = {
		'fleets': new nedb({
				filename: 	'fleets'
			})
	}











// extend NeDB
	// 根据 _id 更新数据，替换为新内容 docReplace，并执行 callback
	// 该方法会采用队列，即上一个更新操作正在进行时，新的更新操作会进入队列
		// 此时如果又有新的更新操作，之前队列的更新操作会被替换
		// 注：前一个callback将不会执行 
		nedb.prototype.updateById = function( _id, docReplace, callback ){
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
		nedb.prototype._updateById = function(){
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
	_g.log = function(){
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
						.on('transitionend.only_bg_off', function(e){
							if( e.currentTarget == e.target
								&& e.originalEvent.propertyName == 'top'
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
			_frame.dom.nav = _frame.dom.layout.children('nav')
				_frame.dom.logo = $('<button class="logo"/>')
									.on({
										'animationend, webkitAnimationEnd': function(e){
											_frame.dom.logo.addClass('ready-animated')
										}
									})
									.appendTo( _frame.dom.nav )
				_frame.dom.navlinks = _frame.dom.nav.children('.pages')
				_frame.dom.globaloptions = _frame.dom.nav.children('section.options')
					//_frame.dom.btnDonates = $('<button class="donate" icon="heart4"/>')
					//						.on('click', function(){_frame.app_main.load_page('donate')}).appendTo( _frame.dom.globaloptions )
					_frame.dom.btnShowOnlyBg = $('<button class="show_only_bg" icon="images"/>')
											.on('click', function(){_frame.app_main.only_bg_toggle()}).appendTo( _frame.dom.globaloptions )
				_frame.dom.btnShowOnlyBgBack = $('<button class="show_only_bg_back" icon="arrow-set2-left"/>')
										.on('click', function(){_frame.app_main.only_bg_off()}).appendTo( _frame.dom.nav )
				/*
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
				*/
			_frame.dom.main = _frame.dom.layout.children('main')
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

		var promise_chain 	= Q.fcall(function(){})

		// 开始异步函数链
			promise_chain

		// 预加载 _g.dbs 数据库
			.then(function(){
				_g.dbs.forEach(function(dbname){
					_db[dbname] = new nedb({
						filename:	_g.path.db + dbname + '.json'
					})
				})
				return _g.dbs
			})

		// 获取背景图列表，生成背景图
			.then(function(){
				for( let i=0; i++; i<_g.bgimg_count ){
					_frame.app_main.bgimgs.push( i + '.jpg' )
				}
				
				_frame.app_main.change_bgimg();
				_frame.app_main.loaded('bgimgs')
				
				return _frame.app_main.bgimgs
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
								//case 'ships':
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
								/*
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
								*/
								case 'updates':
									if( typeof _g.data[db_name] == 'undefined' )
										_g.data[db_name] = {}
									_done(db_name)
									break;
								/*
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
								*/
								default:
									_db[db_name].find({}, function(dberr, docs){
										if( dberr ){
											deferred.reject(new Error(dberr))
										}else{
											if( typeof _g.data[db_name] == 'undefined' )
												_g.data[db_name] = {}
											docs.forEach(function(doc){
												switch( db_name ){
													case 'ships':
														_g.data[db_name][doc['id']] = new Ship(doc)
														break;
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
		/*
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
		*/

		// 如果从启动器载入，检查数据是否有更新
		/*
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
		*/

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
								el.trigger('click')
							}
						},
					link_default = function(e){
							e.preventDefault()
							let el = $(this)
								,href_parts = el.attr('href').split('/').filter(function(c){return c})
							
							if( href_parts.length == 1 ){
								_frame.app_main.load_page( href_parts[0] )
							}else if( href_parts.length == 2 ){
								let t = href_parts[0]
								switch( t ){
									case 'ships':		t = 'ship';			break;
									case 'equipments':	t = 'equipment';	break;
									case 'entities':	t = 'entity';		break;
									case 'fleets':		t = 'fleet';		break;
								}
								el.attr('data-infos', '[[' + t.toUpperCase() + '::' + exp[1] + ']]')
								el.trigger('click')
							}
						}
				$body.on('click.pagechange', 'a[href^="?page="]', link_page)
					.on('click.pagechange', 'a[href^="?infos="]', link_infos)
					.on('click.pagechange', 'a[href^="/"]', link_default)
				_frame.dom.bgimg.on('animationend, webkitAnimationEnd', 'div', function(){
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
		/*
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
		*/

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













_g.error = function(err){
	if( !(err instanceof Error) )
		err = new Error(err)

	_g.log(err)
}

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
								+ '">' + upgrade_to.getName(true) + '</a>'
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
		+ '">' + equipment.getName(true) + '</a>'
		+ ( upgrade_to
			? '<b></b>'
				+ '<a style="background-image:url(../app/assets/images/itemicon/'
					+ upgrade_to.getIconId()
					+ '.png)"'
					+ ' href="?infos=equipment&id='+upgrade_to['id']+'"'
					+ ' data-infos="[[EQUIPMENT::'+upgrade_to['id']+']]"'
					+ ' data-tip="[[EQUIPMENT::'+upgrade_to['id']+']]"'
				+ '">' + upgrade_to.getName(true) + '</a>'
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
							$page.html( _frame.app_main.page_html['fleets'] )
							_p.initDOM($page)
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
							.on('animationiteration webkitAnimationIteration', function(){
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

		$('<input/>',{
			'type':	'checkbox',
			'id': 	'arsenal_weekday-showmeterials'
		}).prop(
			'checked', Lockr.get('arsenal_weekday-showmeterials', true) ? true : false
		).on('change', function(){
			Lockr.set(
				'arsenal_weekday-showmeterials',
				$(this).prop('checked') ? 1 : 0
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
			_db.updates.find({'date': ""}).sort({'date': -1}).exec(function(err, docs){
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
			_db.updates.find({$not:{'date':""}}).sort({'date': -1}).exec(function(err, docs){
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

		if( id == '__NEW__' )
			return _p.initDOM( _frame.infos['__' + type]( id ).addClass('infosbody') )

		if( !this.contentCache[type][id] ){
			this.contentCache[type][id] = _p.initDOM( _frame.infos['__' + type]( id ).addClass('infosbody') )
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
				_frame.dom.btnHistoryBack.on({
							'transitionend.infos_hide': function(e){
								if( e.currentTarget == e.target
									&& e.originalEvent.propertyName == 'opacity'
									&& parseFloat(_frame.dom.btnHistoryBack.css('opacity')) == 0
								){
									_frame.infos.hide_finish()
								}
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
					cont = this.getContent(type, id)
					_frame.infos.dom.main.attr('data-infostype', 'ship')
					title = '资料 - 舰娘 - ' + _g.data.ships[id]._name
					break;
				case 'equipment':
					cont = this.getContent(type, id)
					_frame.infos.dom.main.attr('data-infostype', 'equipment')
					title = '资料 - 装备 - ' + _g.data.items[id]._name
					break;
				case 'fleet':
					cont = this.getContent(type, id)
					_frame.infos.dom.main.attr('data-infostype', 'fleet')
					title = '舰队 - ' + id
					_frame.app_main.mode_selection_off()
					TablelistEquipments.types = []
					break;
				case 'entity':
					cont = this.getContent(type, id)
					_frame.infos.dom.main.attr('data-infostype', 'entity')
					title = '资料 - 人物团体 - ' + _g.data.entities[id]._name
					break;
			}
			//var hashcode = (cont.append) ? cont[0].outerHTML.hashCode() : cont.hashCode()
			//if( _frame.infos.curContent != hashcode ){
				var contentDOM = cont.append ? cont : $(cont)

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

				contentDOM
					.on('transitionend.hide', function(e){
						if( e.currentTarget == e.target && e.originalEvent.propertyName == 'opacity' && parseInt(contentDOM.css('opacity')) == 0 ){
							contentDOM.detach()
						}
					})
					.prependTo( _frame.infos.dom.container )

				//_p.initDOM( contentDOM )
				//_frame.infos.curContent = hashcode
				this.curContent = type + '::' + id
			//}

		// 取消主导航上的当前项目状态
			if( _frame.app_main.cur_page ){
				this.lastCurrentPage = _frame.app_main.cur_page

				// exit selection mode
					//_frame.app_main.mode_selection_off()
				
				if( _frame.dom.navs[_frame.app_main.cur_page] )
					_frame.dom.navs[_frame.app_main.cur_page].removeClass('on')
				_frame.app_main.cur_page = null
			}
		
		// 确定 theme
			_frame.infos.dom.main.attr({
				'data-theme': 		cont.attr('data-theme')
			})

		setTimeout(function(){
			// 显示内容
				_frame.dom.layout.addClass('is-infos-on')
				
			_frame.app_main.title = title
			
			console.log( _frame.infos.last )
			
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

		if( this.lastCurrentPage ){
			if( _frame.dom.navs[this.lastCurrentPage] )
				_frame.dom.navs[this.lastCurrentPage].addClass('on')
			_frame.app_main.cur_page = this.lastCurrentPage
		}

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
	}
}







// 初始化
_frame.infos.init = function(){
	if( _frame.infos.is_init )
		return true

	$body.on( 'click._infos', '[data-infos]', function(e){
			if( !(e.target.tagName.toLowerCase() == 'input' && e.target.className == 'compare') ){
				var el = $(this)
				_frame.infos.show(
					el.attr('data-infos'),
					el,
					el.attr('data-infos-nohistory')
				)

				if( e.target.tagName.toLowerCase() == 'a' )
					e.preventDefault()
			}
		})

	_frame.infos.is_init = true
	return true
}














// 特殊内容

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
									$('<input type="radio" name="ship_infos_lvl_'+id+'" id="'+lvlRadio99_id+'" value="99"/>')
										.prop('checked', curLvl == 99)
										.on('change', function(){
											_config.set('ship_infos_lvl', $(this).val())
										})
								)
								.prepend(
									$('<input type="radio" name="ship_infos_lvl_'+id+'" id="'+lvlRadio150_id+'" value="150"/>')
										.prop('checked', curLvl == 150)
										.on('change', function(){
											_config.set('ship_infos_lvl', $(this).val())
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
						
						if( remodel_blueprint || remodel_catapult ){
							if( remodel_blueprint )
								tip+= '<span class="requirement is-blueprint">需要：改装设计图</span>'
							if( remodel_catapult )
								tip+= '<span class="requirement is-catapult">需要：试制甲板弹射器</span>'
						}

						remodels_container.appendDOM(
							$('<a/>',{
									'class':		'unit',
									'href':			'?infos=ship&id=' + currentValue['id'],
									'data-shipid':	currentValue['id'],
									'data-infos': 	'[[SHIP::'+ currentValue['id'] +']]',
									'data-tip': 	tip,
									'data-infos-nohistory': true
								})
								.addClass(currentValue['id'] == d['id'] ? 'on' : '')
								.addClass(remodel_blueprint ? 'mod-blueprint' : '')
								.addClass(remodel_catapult ? 'mod-catapult' : '')
								.html(
									'<i><img src="' + _g.path.pics.ships + '/' + currentValue['id']+'/0.webp"/></i>'
									+ (remodel_lvl ? '<strong>' + remodel_lvl + '</strong>' : '')
								)
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


// 实体信息

_frame.infos.__entity = function( id ){
	let d = _g.data.entities[ id ]
		,dom = $('<div class="infos-entity"/>')
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
						+ '<small class="indicator '+(d['improvable'] ? 'true' : 'false')+'">'
							+ ( d['improvable'] ? '可改修' : '不可改修' )
						+ '</small>'
						+ '<small class="indicator '+(d['upgrade_to'] && d['upgrade_to'].push && d['upgrade_to'].length ? 'true' : 'false')+'">'
							+ ( d['upgrade_to'] && d['upgrade_to'].push && d['upgrade_to'].length ? '可升级' : '不可升级' )
						+ '</small>'
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


/*
舰队数据
	综合选项
		更改舰队模式：单舰队阵型，联合舰队阵型，影响属性计算

图片输出
	允许编辑文字
*/

// 舰队配置
	_frame.infos.__fleet = function( id ){
		return (new InfosFleet(id)).el
	}









class InfosFleet{
	constructor( id ){
		this.el = $('<div class="infos-fleet loading"/>')
		this.doms = {}

		this.fleets = []
		//this._updating = false
	
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
	}



	// 初始化内容
	init( d ){
		if( !d )
			return false

		//$.extend(true, this, d)
		this.data = d
		//_g.log(this.data)

		let i = 0

		this.el.attr({
				'data-fleetid': d._id,
				'data-theme':	d.theme
			})
			//.data('fleet', d)
			.removeClass('loading')
		
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
							this.doms['themeOption'] = $('<button class="option option-theme"/>').html('主题').on('click', function(){
								if( !InfosFleet.menuTheme ){
									InfosFleet.menuThemeItems = $('<div/>')
									for(let i=1; i<11; i++){
										$('<button class="theme-' + i + '"/>').html(i)
											.on('click', function(){
												InfosFleet.menuThemeCur._theme = i
												this.el.attr('data-theme', this._theme)
											}.bind(this))
											.appendTo(InfosFleet.menuThemeItems)
									}
									InfosFleet.menuTheme = new _menu({
										'className': 'contextmenu-infos_fleet_themes',
										'items': [InfosFleet.menuThemeItems]
									})
								}
								InfosFleet.menuThemeCur = this
								InfosFleet.menuTheme.show(this.doms['themeOption'])
							}.bind(this))
						)
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
					this.fleets[i] = new InfosFleetSubFleet(this, [])

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
	}



	// 根据数据更新内容
	update( d ){
		this._updating = true
		d = d || {}

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
			this.save()
		}
	
	// 保存
		save( not_save_to_file ){
			if( this._updating )
				return this
			
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
			
			if( !not_save_to_file )
				_db.fleets.updateById(this.data._id, this.data, function(){
					_g.log('saved')
				})
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
	data = data.data || []

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
		,fleets = data.data.filter(function(value){
						return value.length
					}) || []
	
	text+= data.name || ''
	
	fleets.forEach(function(fleet, i){
		console.log(fleet)
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







// 类：子舰队
class InfosFleetSubFleet{
	constructor(infosFleet, d){
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
		summaryCalc(){
			if( this.summaryCalculating )
				return false
			
			this.summaryCalculating = setTimeout(function(){
				let fighterPower = 0
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
							fighterPower+= shipdata.calculate('fighterPower')
						
						// 总消耗
							consumFuel+= ship.getAttribute('fuel', shipdata.shipLv) || 0
							consumAmmo+= ship.getAttribute('ammo', shipdata.shipLv) || 0
					}
				})
				
				this.elSummarySpeed.html( fleetSpeet == 'fast' ? '高速' : '低速' )
				
				this.elSummaryFighterPower.html( fighterPower > 0 ? Math.floor(fighterPower) : '-' )
				if( fighterPower > 0 )
					this.elSummaryFighterPower.removeClass('empty')
				else
					this.elSummaryFighterPower.addClass('empty')
				
				this.elSummaryConsummation.html(
					(consumFuel || consumAmmo)
						? '<span class="fuel">' + consumFuel + '</span><span class="ammo">' + consumAmmo + '</span>'
						: '-'
				)

				this.summaryCalculating = null
			}.bind(this), 10)
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
			this.elAttrEvasion.html( this.shipLv
										? this.calculate('attribute', 'evasion') + this.calculate('addEvasion')
										: '-'
									)
			this.elAttrNightBattle.html( this.calculate('nightBattle') )
		}
	
	// 单项属性计算
		calculate(type, attr){
			if( !this.shipId )
				return '-'
			if( type == 'attribute' )
				return _g.data.ships[this.shipId].getAttribute(attr, this.shipLv)
			if( Formula[type] )
				return Formula[type]( this.shipId, this.data[2], this.data[3], this.data[4] )
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
									&& $.inArray(_g.data.items[id].type, _g.data.item_type_collections[3].types) > -1
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
					if( $.inArray(_g.data.items[value].type, _g.data.item_type_collections[3].types) > -1 )
						this.el.addClass('is-aircraft')
					else
						this.el.removeClass('is-aircraft')
			}else{
				this.infosFleetShip.data[2][this.index] = null
				this.improvable = false
				this.el.removeAttr('data-equipmentId')
						.removeAttr('data-tip')
						.css('background-image', '')
						.removeClass('is-aircraft')
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
			if( this.id && $.inArray(_g.data.items[this.id].type, _g.data.item_type_collections[3].types) > -1 ){
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
				+ '<img src="' + _g.path.pics.ships + '/' + d['id']+'/0.webp"/>'
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
		else if( el.hasClass('equipments') )
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
						rows = tbody.find('tr.row:visible').not('[data-donotcompare]')
					}
					nth = nth || 1
		
					// 建立临时用对象，在函数结束时delete
						this._tmp_values = []
						this._tmp_value_map_cell = {}
		
					// 遍历，将值全部导出到 _tmp_values，_tmp_value_map_cell 中记录 值 -> jQuery DOM
						rows.find('td:nth-of-type(' + nth + ')').each(function(index, element){
							let cell = $(element)
								,val = cell.data('value')
		
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
		
					let rows = tbody.find('tr.row:visible').not('[data-donotcompare]')
						,sort_data_by_stat = this.sort_data_by_stat
		
					rows.find('td[data-value]').removeClass('sort-first sort-second')
		
					rows.eq(0).find('td[data-value]').each(function(index, element){
						let is_ascending = false
							,$this = $(element)
							,stat = $this.data('stat')
		
						// 以下属性不进行标记，但仍计算排序
							,noMark = stat.match(/\b(speed|range)\b/ )
		
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
								sort_data_by_stat[stat] = sort
							else
								delete( sort_data_by_stat[stat] )
		
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
		}else{
			this.init_new()
		}
	}

	append_item_cv( entity ){
		return _tmpl.link_entity( entity, null, false, entity.relation.cv.length ).addClass('unit cv')
	}

	append_item_illustrator( entity ){
		return $('<a/>',{
			'class':	'unit illustrator',
			'href':		'?infos=entity&id=' + entity.id,
			'html':		entity._name + ' (' + entity.relation.illustrator.length + ')'
		})
	}

	append_items( title, arr, callback_append_item ){
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

	
	
	
	
	
	
	
	
	
	init_new(){
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
	
	
	
	
	
	
	
	
	
	init_parse(){
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
		
		if( container.children('.fixed-table-container').length ){
			this.init_parse()
		}else{
			this.init_new()
		}
	}

	append_item( equipment_data, collection_id ){
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
				return '<small class="zero">-</small>'
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
					$('<td data-stat="'+currentValue[1]+'" data-value="' + equipment_data['stat'][currentValue[1]] + '"/>')
						.addClass( equipment_data['stat'][currentValue[1]] < 0 ? 'negative' : '' )
						.html( _val( equipment_data['stat'][currentValue[1]] ) )
						.appendTo(tr)
					break;
			}
		})
	
		return tr
	}

	append_all_items(){
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
	
	
	
	
	
	
	
	
	
	init_new(){
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
				let equipment_data = _g.data.items[ tr.attr('data-equipmentid') ]
				tr.on('click', function(e, forceInfos){
						if( !forceInfos && _frame.app_main.is_mode_selection() ){
							e.preventDefault()
							e.stopImmediatePropagation()
							e.stopPropagation()
							
							if( $.inArray(equipment_data.type, TablelistEquipments.types) > -1 )
								_frame.app_main.mode_selection_callback(equipment_data['id'])
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
									.on('click',function(){
										this.btn_new()
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
				this.dom.btn_settings = $('<button icon="cog"/>')
									.on('click',function(){
										this.btn_settings()
									}.bind(this))
									.appendTo(this.dom.buttons_right)

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
									.on('click',function(){
										this.dom.btn_new.click()
									}.bind(this))
								)
					)
				)
				.appendTo( this.dom.table_container_inner )
	
		// 右键菜单事件
			this.dom.table.on('contextmenu.contextmenu_fleet', 'tr[data-fleetid]', function(e){
				this.contextmenu_show($(e.currentTarget), null , e)
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
					for( let fleet of fleetdata.data ){
						if( !fleet || !fleet.length || !fleet.push )
							return false
						for( let shipdata of fleet ){
							if( typeof shipdata != 'undefined' && typeof shipdata[0] != 'undefined' && shipdata[0] )
								return true
						}
					}
					return false
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
			_g.log(arr)
			
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
				console.log(sorted)
				
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
		btn_new(){
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
	
			this.menu_new.show()
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
									});
									TablelistFleets.contextmenu.curel.remove()
								}
							})
					]
				})

			TablelistFleets.contextmenu.curel = $tr

			if( is_rightclick )
				TablelistFleets.contextmenu.show(is_rightclick.clientX, is_rightclick.clientY)
			else
				TablelistFleets.contextmenu.show($em || $tr)
		}
	
	
	// 生成列表
		genlist(){
			let promise_chain 	= Q.fcall(function(){})
	
				promise_chain
	
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
			['弹耗',	'consum_ammo']
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
		}else{
			this.init_new()
		}
	}

	append_item( ship_data, header_index ){
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
				return '<small class="zero">-</small>'
			if( val == -1 || val == '-1' )
				return '<small class="zero">?</small>'
			return val
		}
	
		this.columns.forEach(function(currentValue, i){
			switch( currentValue[1] ){
				case ' ':
					$('<th/>')
						.html(
							//'<img src="../pics/ships/'+ship_data['id']+'/0.jpg"/>'
							//'<img src="' + _g.path.pics.ships + '/' + ship_data['id']+'/0.webp" contextmenu="disabled"/>'
							'<img src="../pics/ships/'+ship_data['id']+'/0.webp" contextmenu="disabled"/>'
							+ '<strong>' + name + '</strong>'
							+ '<em></em>'
							//+ '<small>' + ship_data['pron'] + '</small>'
						)
						.prepend(
							checkbox
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
							ship_data['stat']['asw_max']
						)
						.html( _val(
							ship_data['stat']['asw_max'],
							/^(5|8|9|12|24)$/.test( ship_data['type'] )
						) )
						.appendTo(tr)
					break;
				case 'hp':
					$('<td data-stat="hp" data-value="' + ship_data['stat']['hp'] + '"/>')
						.html(_val( ship_data['stat']['hp'] ))
						.appendTo(tr)
					break;
				case 'carry':
					$('<td data-stat="carry" data-value="' + ship_data['stat']['carry'] + '"/>')
						.html(_val( ship_data['stat']['carry'] ))
						.appendTo(tr)
					break;
				case 'speed':
					$('<td data-stat="speed" data-value="' + ship_data['stat']['speed'] + '"/>')
						.html( _g.getStatSpeed( ship_data['stat']['speed'] ) )
						.appendTo(tr)
					break;
				case 'range':
					$('<td data-stat="range" data-value="' + ship_data['stat']['range'] + '"/>')
						.html( _g.getStatRange( ship_data['stat']['range'] ) )
						.appendTo(tr)
					break;
				case 'luck':
					$('<td data-stat="luck" data-value="' + ship_data['stat']['luck'] + '"/>')
						.html(ship_data['stat']['luck'] + '<sup>' + ship_data['stat']['luck_max'] + '</sup>')
						.appendTo(tr)
					break;
				case 'consum_fuel':
					$('<td data-stat="consum_fuel"/>')
						.attr(
							'data-value',
							ship_data['consum']['fuel']
						)
						.html( _val(ship_data['consum']['fuel']) )
						.appendTo(tr)
					break;
				case 'consum_ammo':
					$('<td data-stat="consum_ammo"/>')
						.attr(
							'data-value',
							ship_data['consum']['ammo']
						)
						.html( _val(ship_data['consum']['ammo']) )
						.appendTo(tr)
					break;
				default:
					$('<td data-stat="'+currentValue[1]+'"/>')
						.attr(
							'data-value',
							ship_data['stat'][currentValue[1] + '_max']
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

	append_all_items(){
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
	
	
	
	
	
	
	
	
	
	init_new(){
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
				} )
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
					if( $el.val() == _config.get( 'shiplist-viewtype' ) )
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
			if( _g.data.ship_types ){
				this.parse_all_items()
			}
	
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
						.prop('disabled', _g.data['ship_type_order'][header_index]['donotcompare'] ? true : false)
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
					,ship_data = _g.data.ships[ tr.attr('data-shipid') ]
					,checkbox = tr.find('input[type="checkbox"]')
					,title_index = header_index
				
				tr.on('click', function(e, forceInfos){
						if( !forceInfos && e.target.tagName.toLowerCase() != 'em' && _frame.app_main.is_mode_selection() ){
							e.preventDefault()
							e.stopImmediatePropagation()
							e.stopPropagation()
							if(!donotcompare)
								_frame.app_main.mode_selection_callback(ship_data['id'])
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
			
				this.checkbox[ship_data['id']] = checkbox
			}
		}.bind(this))

		this.mark_high()
		this.thead_redraw()
		_frame.app_main.loaded('tablelist_'+this._index, true)
		delete( this.last_item )
	}
}


// @koala-prepend "../../source/nw.js-base-framework/source/js-base/!.js"

// @koala-prepend "../../source/nw.js-base-framework/source/js-base/_g-variables.js"
// @koala-prepend "../../source/nw.js-base-framework/source/js-base/_g.js"
// @koala-prepend "../../source/nw.js-base-framework/source/js-base/_p.js"

_g.bgimg_count = 0;

// @koala-prepend "../../source/nw.js-base-framework/source/js-base/libs/visibility/visibility.core.js"
// @koala-prepend "../../source/nw.js-base-framework/source/js-base/libs/jquery.mousewheel.js"
// @koala-prepend "../../node_modules/q/q.js"
// @koala-prepend "../../node_modules/markdown/lib/markdown.js"
// @koala-prepend "../../node_modules/nedb/browser-version/out/nedb.js"

// @koala-prepend "../../source/nw.js-base-framework/source/js-base/prototype/Array.js"
// @koala-prepend "../../source/nw.js-base-framework/source/js-base/prototype/date.js"
// @koala-prepend "../../source/nw.js-base-framework/source/js-base/prototype/object.js"
// @koala-prepend "../../source/nw.js-base-framework/source/js-base/prototype/string.js"

// @koala-prepend "../../source/nw.js-base-framework/source/js-base/templates/_.js"

// @koala-prepend "../../source/nw.js-base-framework/source/js-base/hotkey/_.js"

// @koala-prepend "../../source/nw.js-base-framework/source/js-base/form/_.js"

// @koala-prepend "../../source/nw.js-base-framework/source/js-base/frame/_global.js"
// @koala-prepend "../../source/nw.js-base-framework/source/js-base/frame/menu.js"
// @koala-prepend "../../source/nw.js-base-framework/source/js-base/frame/modal.js"
// @koala-prepend "../../source/nw.js-base-framework/source/js-base/frame/tip.js"

// @koala-prepend "../../source/nw.js-base-framework/source/js-base/elements/_a.js"
// @koala-prepend "../../source/nw.js-base-framework/source/js-base/elements/form.js"
// @koala-prepend "../../source/nw.js-base-framework/source/js-base/elements/flexgrid.js"
// @koala-prepend "../../source/nw.js-base-framework/source/js-base/elements/input.js"
// @koala-prepend "../../source/nw.js-base-framework/source/js-base/elements/table.js"
// @koala-prepend "../../source/nw.js-base-framework/source/js-base/elements/tabview.js"

// @koala-prepend "../../source/nw.js-base-framework/source/js-base/!last.js"










// @koala-prepend "../../source/js-app/!.js"

// @koala-prepend "../../source/js-app/lib/lockr.js"
// @koala-prepend "../../source/js-app/lib/SmoothScroll.js"

// @koala-prepend "../../source/js-app/google_analytics.js"

// @koala-prepend "../../source/KanColle-JS-Kit/js/!.js"
// @koala-prepend "../../source/KanColle-JS-Kit/js/formula.js"
// @koala-prepend "../../source/KanColle-JS-Kit/js/class-item/!.js"
// @koala-prepend "../../source/KanColle-JS-Kit/js/class-item/entity.js"
// @koala-prepend "../../source/KanColle-JS-Kit/js/class-item/equipment.js"
// @koala-prepend "../../source/KanColle-JS-Kit/js/class-item/ship.js"
// @koala-prepend "../../source/KanColle-JS-Kit/js/parser/kancolle-calc.js"

// @koala-prepend "../../source/js-app/main-web.js"

// @koala-prepend "../../source/js-app/templates/improvement.js"
// @koala-prepend "../../source/js-app/templates/link_entity.js"
// @koala-prepend "../../source/js-app/templates/link_equipment.js"
// @koala-prepend "../../source/js-app/templates/link_ship.js"
// @koala-prepend "../../source/js-app/templates/textlink_entity.js"
// @koala-prepend "../../source/js-app/templates/textlink_ship.js"

// @koala-prepend "../../source/js-app/page/!.js"
// @koala-prepend "../../source/js-app/page/fleets.js"
// @koala-prepend "../../source/js-app/page/ships.js"
// @koala-prepend "../../source/js-app/page/equipments.js"
// @koala-prepend "../../source/js-app/page/arsenal.js"
// @koala-prepend "../../source/js-app/page/about.js"

// @koala-prepend "../../source/js-app/frame/infos.js"
// @koala-prepend "../../source/js-app/frame/infos-entity.js"
// @koala-prepend "../../source/js-app/frame/infos-equipment.js"
// @koala-prepend "../../source/js-app/frame/infos-fleet.js"
// @koala-prepend "../../source/js-app/frame/mode-selection.js"
// @koala-prepend "../../source/js-app/frame/tip-equipment.js"
// @koala-prepend "../../source/js-app/frame/tip-ship.js"

// @koala-prepend "../../source/js-app/elements/tablelist.js"
// @koala-prepend "../../source/js-app/elements/tablelist-entities.js"
// @koala-prepend "../../source/js-app/elements/tablelist-equipments.js"
// @koala-prepend "../../source/js-app/elements/tablelist-fleets.js"
// @koala-prepend "../../source/js-app/elements/tablelist-ships.js"