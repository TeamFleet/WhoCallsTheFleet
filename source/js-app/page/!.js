class PAGE {
	constructor( $page ) {
	}
	
	modeSelectionEnter(callback_select){
		console.log('modeSelectionEnter')
		
		let self = this
			,_callback_select
		
		callback_select = callback_select || function(){}
		_callback_select = function(){
			//callback_select.apply( callback_select, arguments )
			callback_select(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], arguments[10])
			self.modeSelectionExit()
		}
		
		_frame.app_main.mode_selection_callback = _callback_select
		
		_frame.dom.layout.addClass('mode-selection')
		
		return _callback_select
	}
	
	modeSelectionExit(){
		if( !_frame.dom.layout.hasClass('mode-selection') )
			return false

		console.log('modeSelectionExit')
		
		_frame.dom.layout.removeClass('mode-selection')
	}
}