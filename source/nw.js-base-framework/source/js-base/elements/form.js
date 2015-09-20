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










