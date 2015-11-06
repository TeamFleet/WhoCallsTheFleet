_frame.app_main.is_mode_selection = function(){
	return $html.hasClass('mode-selection') || _frame.dom.layout.hasClass('mode-selection')
}

_frame.app_main.mode_selection_callback = null

_frame.app_main.mode_selection_on = function( callback ){
	if( !_frame.dom.navSelectionInfo ){
		_frame.dom.navSelectionInfo = $('<div class="selection-info"/>').html('请选择……').appendTo( _frame.dom.nav )
	}
	callback = callback || function(){}
	callback()
	_frame.dom.layout.addClass('mode-selection')
}

_frame.app_main.mode_selection_off = function(){
	if( this.cur_page )
		this.page_dom[this.cur_page].trigger('modeSelectionExit')
	_frame.dom.layout.removeClass('mode-selection')
}
