_frame.app_main.is_mode_selection = function(){
	return $html.hasClass('mode-selection') || _frame.dom.layout.hasClass('mode-selection')
}

_frame.app_main.mode_selection_callback = null