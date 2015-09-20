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
		_frame.modal.dom.container.off('transitionend.modal_hide').on({
										'transitionend.modal_hide': function(e){
											if( e.currentTarget == e.target && e.originalEvent.propertyName == 'opacity' ){
												switch( parseFloat($(this).css('opacity')) ){
													case 0:
														_frame.modal.hide_timeout = setTimeout(function(){
															_frame.modal.reset()
															_frame.modal.dom.container
																.removeClass('show')
																.off('transitionend.modal_hide')
															_frame.modal.showing = false
														}, 10)
														break;
												}
											}
										}
									}).removeClass('on')
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

	_frame.modal.dom.container = $('<div class="container modal" />').prependTo($body)
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