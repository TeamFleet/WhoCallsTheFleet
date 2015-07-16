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

