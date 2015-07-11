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



