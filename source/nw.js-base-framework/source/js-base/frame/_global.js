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












