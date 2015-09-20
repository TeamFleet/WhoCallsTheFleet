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
