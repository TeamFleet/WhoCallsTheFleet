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
		
		// 隐藏/关闭时，使用 detach 而非 remove
			// 'detach':	false
		
		// 关闭时运行的函数
			// 'onClose': 	function(){}
	},

	show: function(content, title, options, callback){
		clearTimeout( this.hide_timeout )
		this.hide_timeout = null

		this.dom.container.addClass('show')
		this.showing = true

		var settings = $.extend( {}, this.defaults, options );

		if( settings.detach )
			this.content = content

		//this.dom.content.empty()
		content.appendTo( this.dom.content )
		
		if( settings.onClose )
			_frame.modal.dom.container.on('close', settings.onClose)

		//this.dom.container.removeClass( this.dom.container.data('customclass') )

		//if( this.dom.blured ){
		//	this.dom.blured.remove()
		//	this.dom.blured = null
		//}

		if( title ){
			this.dom.titlebar.html(title)
			this.dom.container.addClass('hastitle')
		}else{
			this.dom.titlebar.html('')
			this.dom.container.removeClass('hastitle')
		}

		this.dom.box.css({
			'width': 	settings.width || null,
			'height': 	settings.height || null
		})

		if( settings.showBlured ){
			if( !this.dom.blured && typeof node != 'undefined' ){
				node.win.capturePage(function(datauri){
					//_frame.modal.dom.blured = $('<img/>').attr('src', datauri).appendTo(_frame.modal.dom.container)
					//_frame.modal.dom.blured = $('<s/>').css('background-image', 'url('+datauri+')').appendTo(_frame.modal.dom.container)
					/*_frame.modal.dom.blured = $('<s/>')
												.append( $('<img/>').attr('src', datauri) )
												.appendTo(_frame.modal.dom.container)*/
					_frame.modal.dom.blured = $('<img/>').attr('src', datauri)
												.appendTo( _frame.modal.dom.bg )
				}, {
					format: 'jpg',
					datatype: 'datauri'
				})
				this.dom.container.addClass('mod-blur-shot')
			}
		}//else{
		//	this.dom.container.removeClass('mod-blur-shot')
		//}

		setTimeout(function(){
			_frame.modal.dom.container.addClass('on ' + settings.classname).data('customclass', settings.classname)
		}, 0)
		_p.initDOM( this.dom.content )

		this.dom.bg.off('click.blank_to_close').on('click.blank_to_close', function(){
			if( settings.blank_to_close ){
				_frame.modal.dom.btn_close.trigger('click')
			}
		})

		if( callback )
			callback( this.dom.content )
	},

	hide: function(){
		if( !this.showing )
			return false

		clearTimeout( this.hide_timeout )
		this.hide_timeout = null
		this.dom.container.removeClass('on')
	},
	//hide_timeout,

	reset: function(){
		this.resetContent()

		if( this.dom.blured ){
			if( !parseInt(this.dom.container.css('opacity')) ){
				this.dom.blured.remove()
				this.dom.blured = null
			}
			this.dom.container.removeClass('mod-blur-shot')
		}
	},

	resetContent: function(){
		if( this.content ){
			this.content.detach()
			this.content = null
		}
		
		this.dom.content.empty()

		this.dom.container.removeClass( this.dom.container.data('customclass') )
		this.dom.container.data('customclass', '')

		this.dom.titlebar.html('')
		this.dom.container.removeClass('hastitle')
	}
}







// 初始化
_frame.modal.init = function(){
	if( this.is_init )
		return true

	this.dom.container = $('<div class="modal" />').on({
										//'transitionend.modal_hide': function(e){
										'transitionend.modal_hide webkitTransitionEnd.modal_hide mozTransitionEnd.modal_hide': function(e){
											if( _frame.modal.showing
												&& e.currentTarget == e.target
												&& e.originalEvent.propertyName == 'opacity'
												&& _frame.modal.dom.container.css('opacity') == 0
											){
												_frame.modal.hide_timeout = setTimeout(function(){
													_frame.modal.reset()
													_frame.modal.dom.container.removeClass('show')
														//.off('transitionend.modal_hide')
													_frame.modal.showing = false
													_frame.modal.dom.container.trigger('close').off('close')
												}, 10)
											}
										}
									}).prependTo($body)
		this.dom.box = $('<div/>').appendTo(this.dom.container)
			this.dom.titlebar = $('<header/>').appendTo(this.dom.box)
			this.dom.content = $('<section/>').appendTo(this.dom.box)
			this.dom.btn_close = $('<button class="close" />').html('&times;').on('click',function(){_frame.modal.hide()}).appendTo(this.dom.box)
		this.dom.bg = $('<s/>').appendTo(this.dom.container)

	_hotkey.bind(
		'27',
		function(){
			_frame.modal.hide()
		}
	)


	this.is_init = true
	return true
}