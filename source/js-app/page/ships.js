_frame.app_main.page['ships'] = {}








_frame.app_main.page['ships'].init = function( page ){
	this.tablelist = page.find('.tablelist')
	this.tablelistObj = this.tablelist.data('tablelist')

	page.on('pageon', function(){
		if( !_frame.app_main.page['ships'].tablelistObj )
			_frame.app_main.page['ships'].tablelistObj
				= _frame.app_main.page['ships'].tablelist.data('tablelist')

		if( _frame.app_main.page['ships'].tablelistObj )
			_frame.app_main.page['ships'].tablelistObj.thead_redraw()
	})
}