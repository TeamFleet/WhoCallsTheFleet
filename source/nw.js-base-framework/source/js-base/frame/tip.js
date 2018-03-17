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

