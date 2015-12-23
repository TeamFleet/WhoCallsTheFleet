/*

# KCTip by Diablohu

* https://github.com/Diablohu/KCTip



## Current status

* Tip layout done
* Tip content NYI
* Browser compatibility NYI



## DOM tree

div#kctip.kctip
	div.wrapper
		CONTENT



## polyfill to do

* transition event
* classList
* requestAnimationFrame
* DOMContentLoaded

*/


var KCTip = (function(){
	"use strict";
	
	
	/* */
		// check element matches query selector 
		function elmatches(elm, selector) {
			if( elm == document )
				return false;
			let matches = (elm.document || elm.ownerDocument).querySelectorAll(selector),
				i = matches.length;
			while (--i >= 0 && matches.item(i) !== elm) ;
			return i > -1;
		}
		function _append(p, c){
			return p.appendChild(c);
		}
		function _create(t){
			return document.createElement(t);
		}
		function _on(target, type, listener, useCapture){
			return target.addEventListener(type, listener, useCapture);
		}
		function _off(target, type, listener, useCapture){
			return target.removeEventListener(type, listener, useCapture);
		}
		function _delegatedo(e, querySelector, callback){
			for (var target=e.target; target && target!=this; target=target.parentNode) {
				if( elmatches(target, querySelector) ){
					return callback(target);
					break;
				}
			}
		}
		function _addClass(target, c){
			return target.classList.add(c);
		}
		function _removeClass(target, c){
			return target.classList.remove(c);
		}
		function _hasClass(target, c){
			return target.classList.contains(c);
		}
	
	
	
	let _isMoving = false
		,_x, _y;
	
	/* style */
		// STYLE will be replaced with CSS
		let style = _create('style');
		style.innerHTML = '[[STYLE]]';
		_append(document.head, style);


	/* makesure mouseover triggered by mouse not touch */
		let _preventMouseover = false
			,_isTouch = false
			,_isHover = false;


	let KCTip = {
		//is_init:		false,
		//is_showing:	false,
		//curLoading: 	null,
		pos:			'top',
		//pos:			'mouse',
		//w:			0,
		//h:			0,
		//t: 			null,
		size_indicator:	8,
		language: 		'zh_cn',
		cache: {},
		
		// content type that currently supported
		types: [
				'ships',
				'equipments'
			],
	
		// content filters
		filters: [],
	
		// delay to hide tip
		countdown_fade:			250,
	
		init: function(){
			if(this.is_init)
				return this;
			
			this.body = _create('div');
			_addClass(this.body, 'kctip');
			this.body.setAttribute('id', 'kctip');
			let evts = ['transitionend','webkitTransitionEnd','mozTransitionEnd'];
			evts.forEach(function(evt){
				_on(this.body, evt, function(e) {
					let style = window.getComputedStyle ? getComputedStyle(e.target, null) : e.target.currentStyle;
					if( e.currentTarget == e.target && e.propertyName == 'opacity' && style.opacity == 0 )
						KCTip.hideAfter();
				})
			}, this)
			_append(document.body, this.body);
			
			this.container = _create('div');
			_addClass(this.container, 'wrapper');
			_append(this.body, this.container);
	
			// backdrop-filter
				if( 'backdrop-filter' in document.documentElement.style || '-webkit-backdrop-filter' in document.documentElement.style )
					_addClass(this.body, 'mod-blur-backdrop');
	
			this.is_init=true;
		},
	
		// 显示
		// el:		element that trigger the tip
		// cont: 	HTML code or element node
		// pos:		tip position, top || bottom || right || left
		show: function( el, cont, pos ){
			if( _preventMouseover || !_isHover || !el )
				return false;

			this.el = el || document.body;
			cont = this.content(cont);
			if( !cont )
				return false;

			clearTimeout(this.timeout_fade);
			//pos = pos || el.getAttribute('kctip-position') || this.pos;
			this.pos = pos || this.el.getAttribute('kctip-position') || this.pos;

			this.init();
	
			if( !_hasClass(this.body, 'show') )
				_addClass(this.body, 'show');
	
			this.update(cont);
			//this.position( pos );	
			this.is_showing=true;
		},
	
		// 计算tip位置
		position:function(pos){
			this.body.style.top = '';
			this.body.style.left = '';
			this.w = this.body.offsetWidth;
			this.h = this.body.offsetHeight;
	
			let coords = this['pos_'+(pos||this.pos)]( this.w , this.h );
			if(coords)
				this.move(coords.x, coords.y);
		},
	
		// 隐藏tip
		// is_instant：瞬间隐藏，没有延迟
		hide:function( is_instant ){
			if( !this.is_init || !this.is_showing )
				return false;
	
			//this.el_pending = null
			
			function h(){
				_removeClass(KCTip.body, 'on');
				_off( KCTip.el, 'mousemove', KCTipMouseMoveHandler );
				KCTip.el = null;
				KCTip.is_showing = false;
				KCTip.pos = 'bottom';
			}
			
			if( this.pos == 'mouse' )
				requestAnimationFrame(h);
			else
				this.timeout_fade = setTimeout(h, is_instant ? 0 : this.countdown_fade);
		},
		
		// 完全隐藏
		hideAfter: function(){
			_removeClass(this.body, 'show');
			this.body.style.top = '';
			this.body.style.left = '';
			this.body.removeAttribute('kctip-indicator-pos');
			this.body.removeAttribute('kctip-indicator-offset-x');
			this.body.removeAttribute('kctip-indicator-offset-y');
			this.body.removeAttribute('kctip-class');
			this.container.innerHTML = ''
			delete this.curLoading;
			delete this.t;
			delete this.w;
			delete this.h;
			_x = null;
			_y = null;
		},
		
		// 格式化tip内容
		content: function( cont, el ){
			if( !cont ){
				let t, i;
				el = el || this.el;
				cont = el.getAttribute('href');
				let matches = /\/([a-z]+)\/([0-9]+)/gi.exec(cont);
				if( matches && matches.length > 1 ){
					t = matches[1];
					i = matches[2];
				}
				if( t && i && this.types.indexOf(t) >= 0 ){
					this.t = t;
					
					if( !this.cache[t] )
						this.cache[t] = {};
					if( !this.cache[t][this.language] )
						this.cache[t][this.language] = {};
	
					if( this.cache[t][this.language][i] )
						return this.cache[t][this.language][i];
					
					return this.load(t, i, this.language);
				}else{
					return null
				}
			}
	
			return cont;
		},
		
		// update content html
		update: function( cont, t ){
			this.t = t || this.t;
			
			if( cont.nodeType && cont.nodeType == 1 )
				_append(this.container, cont);
			else
				this.container.innerHTML = cont;
				
			if( this.t )
				this.body.setAttribute('kctip-class', this.t);
			else
				this.body.removeAttribute('kctip-class');
				
			return this.position();
		},
		
		// load content
		// t = TYPE
		// i = ID
		// l = LANGUAGE
		load: function(t, i, l){
			this.curLoading = t + '::' + i + '::' + l;
			//if( !this.cache.loading ){
			//	this.cache.loading = _create('div');
			//	_addClass(this.cache, 'loading');
			//}
			//this.cache.loading.innerHTML = '载入中...';
			
			let script = _create('script');
			script.src = 'http://fleet.diablohu.com/!/tip/'+t+'/'+l+'/'+i+'.js';
			_on(script, 'error', function(e) {
				//KCTip.cache.loading.innerHTML = '发生错误...';
				KCTip.update('发生错误...', 'error');
			});
			
			_append(document.head, script);
			
			this.t = 'loading';
			return '载入中...';
		},
		
		// content loaded
		loaded: function( t, i, l, html ){
			if( !this.cache[t] )
				this.cache[t] = {};
			if( !this.cache[t][this.language] )
				this.cache[t][this.language] = {};
			this.cache[t][this.language][i] = html
			
			if( t + '::' + i + '::' + l == this.curLoading )
				return KCTip.update(html, t)
		},
	
		// move tip to x, y
		move: function(x,y){
			this.body.style.top = y + 'px';
			this.body.style.left = x + 'px';
			_addClass(this.body, 'on');
		},
	
		// 获取小箭头尺寸
		get_indicator_size: function(){
			return this.size_indicator;
		},
	
		// tip位置函数
		pos_mouse: function(w,h){
			_on(this.el, 'mousemove', KCTipMouseMoveHandler);
		},
		pos_bottom: function(w,h){
			let o	= offset(this.el)
				,x	= o.left + ( this.el.offsetWidth - this.body.offsetWidth )/2
				,y	= o.top + this.el.offsetHeight + this.get_indicator_size();
	
			this.body.setAttribute('kctip-indicator-pos', 'top' );
			return this.checkpos(x,y,w,h,o);
		},
		pos_top: function(w,h){
			let o	= offset(this.el)
				,x	= o.left + ( this.el.offsetWidth - this.body.offsetWidth )/2
				,y	= o.top - h - this.get_indicator_size();
	
			this.body.setAttribute('kctip-indicator-pos', 'bottom' );
			return this.checkpos(x,y,w,h,o);
		},
		pos_left: function(w,h){
			let o	= offset(this.el)
				,x	= o.left - w - this.get_indicator_size()
				,y	= o.top + ( this.el.offsetHeight - this.body.offsetHeight )/2;
	
			this.body.setAttribute('kctip-indicator-pos', 'right' );
			return this.checkpos(x,y,w,h,o);
		},
		pos_right: function(w,h){
			let o	= offset(this.el)
				,x	= o.left + this.el.offsetWidth + this.get_indicator_size()
				,y	= o.top + ( this.el.offsetHeight - this.body.offsetHeight )/2;
	
			this.body.setAttribute('kctip-indicator-pos', 'left' );
			return this.checkpos(x,y,w,h,o);
		},
		checkpos: function(x,y,w,h,o){
			o = o || offset(this.el)
			let nx 	= x
				,ny = y
				,pos = {x:nx,y:ny}
	
				,clientWidth = document.documentElement.clientWidth
				,clientHeight = document.documentElement.clientHeight
				,scrollLeft	= typeof o.scrollLeft == 'undefined'
								? (window.pageXOffset || document.documentElement.scrollLeft)
								: o.scrollLeft
				,scrollTop 	= typeof o.scrollTop == 'undefined'
								? (window.pageYOffset || document.documentElement.scrollTop)
								: o.scrollTop;
			
			w = w || this.w;
			h = h || this.h;
	
			// 超出X轴右边界
			if ((x + w) > clientWidth + scrollLeft ){
				if( w > o.left ){
					pos = {
						'x': clientWidth + scrollLeft - w - 2,
						'y': y
					};
				}else{
					//nx = o.left - w;
					pos = this['pos_left']( w , h );
				}
			}
	
			// 超出X轴左边界
			else if (x < 0){
				//nx = 15;
				//pos = this['pos_right']( w , h );
				pos = {
					'x': 10,
					'y': y
				}
			}
	
			// 超出Y轴下边界
			if ( (y + h) > (scrollTop + clientHeight) )
				//ny = this.pos == 'bottom' ? ( o.top - this.el.outerHeight() ) : ( $(window).scrollTop() + $(window).height() - h );
				pos = this['pos_top']( w , h );
	
			// Node on top of viewport scroll
			//else if ((o.top - 100) < $(window).scrollTop())
			//	ny = o.top + this.el.outerHeight();
	
			// Less than y viewport scrolled
			//else if (y < $(window).scrollTop())
			//	ny = $(window).scrollTop() + 10;
	
			// Less than y viewport
			//else if (y < 0)
			//	ny = 15;
	
			// 超出Y轴上边界
			else if ( y < scrollTop )
				//ny = this.pos == 'bottom' ? ( o.top - this.el.outerHeight() ) : ( $(window).scrollTop() + $(window).height() - h );
				pos = this['pos_bottom']( w , h );
	
			this.body.setAttribute('kctip-indicator-offset-x', (x - nx)+'px' );
			this.body.setAttribute('kctip-indicator-offset-y', (y - ny)+'px' );

			return pos;
		},
		
		trigger_by_el: function(el){
			this.show(el);
		}
	};


	
	/* delegate event */
		function _onDOMReady(){
			let _body = document.body;
			function touchstartPreventMouseover(e){
					_preventMouseover = true;
					_isTouch = true;
					_isHover = false;
				}
			function touchendPreventMouseover(e){
					_preventMouseover = false;
					_isTouch = false;
					_isHover = false;
				}
			_on(_body, "touchstart", touchstartPreventMouseover);
			_on(_body, "touchend", touchendPreventMouseover);
			_on(_body, "touchcancel", touchendPreventMouseover);
			_on(_body, "pointerover", function pointerenterPreventMouseover(e){
				// pointerenter
					if( e.pointerType == 'touch' )
						touchstartPreventMouseover();
					else{
						_preventMouseover = false;
						_isTouch = false;
					}
				});
			_on(_body, "mouseover", function mouseoverPreventMouseover(e){
				// mouseenter
					if( _isTouch ){
						_isTouch = false;
						_preventMouseover = true;
					}else{
						_preventMouseover = false;
						_isHover = true;
					}
				});
			_on(_body, "mouseout", function mouseleavePreventMouseover(e){
				// mouseleave
					_isHover = false
				})

			let querySelector = '[href^="http://fleet.diablohu.com/"], [kctip]'
				,eventTipshow = document.createEvent('Event')
				,eventTiphide = document.createEvent('Event');
			eventTipshow.initEvent('tipshow', true, true);
			eventTiphide.initEvent('tiphide', true, true);
			_on(_body, "mouseover", function mouseoverKCTip(e) {
					if( !_preventMouseover ){
						_delegatedo(e, querySelector, function(t){
							KCTip.show(t);
						});
					}
				});
			_on(_body, "mouseout", function mouseoutKCTip(e) {
					_delegatedo(e, querySelector, function(){
						KCTip.hide();
					});
				});
			_on(_body, "click", function clickKCTip(e) {
					_delegatedo(e, querySelector, function(){
						KCTip.hide(true);
					});
				});
			_on(_body, "tipshow", function tipshowKCTip(e) {
					_delegatedo(e, querySelector, function(t){
						KCTip.trigger_by_el(t);
					});
				});
			_on(_body, "tiphide", function tiphideKCTip(e) {
					_delegatedo(e, querySelector, function(){
						KCTip.hide();
					});
				});
		}
		if( document.readyState !== "loading" ){
			_onDOMReady();
		}else{
			_on(document, "DOMContentLoaded", function(){
				_onDOMReady();
			});
		}
	
	
	/* plain js */
	/* https://plainjs.com/ */
		function offset(el) {
			let rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			return {
				top: rect.top + scrollTop,
				left: rect.left + scrollLeft,
				scrollTop: scrollTop,
				scrollLeft: scrollLeft
			}
		}


	function KCTipMouseMoveHandler(e){
		_x = e.clientX;
		_y = e.clientY;
		if( !_isMoving )
			requestAnimationFrame(KCTipMouseMove);
		_isMoving = true;
	}
	function KCTipMouseMove(){
		_isMoving = false;
		let clientWidth = document.documentElement.clientWidth
			,clientHeight = document.documentElement.clientHeight
			,scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
			,scrollTop = window.pageYOffset || document.documentElement.scrollTop
			,x = _x + 10 + scrollLeft
			,y = _y + 25 + scrollTop;
	
		// 超出X轴右边界
			if ((x + KCTip.w + 10) > clientWidth + scrollLeft )
				x = clientWidth + scrollLeft - KCTip.w - 10;
	
		// 超出Y轴下边界
			if ((y + KCTip.h + 10) > clientHeight + scrollTop )
				y = clientHeight + scrollTop - KCTip.h - 10;

		return KCTip.move(x,y);
	}
	
	return KCTip;
})();
