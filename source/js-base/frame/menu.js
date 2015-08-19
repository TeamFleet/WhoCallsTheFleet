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
				,left 	= offset.left - $body.scrollLeft()
				
				,viewport_height	= $window.height() - 10
				,viewport_width		= $window.width() - 10
				
				,menu_height		= this.dom.menu.outerHeight()
				,menu_width			= this.dom.menu.outerWidth()

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