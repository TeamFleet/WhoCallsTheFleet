//class PageShips extends PAGE

_frame.app_main.page['ships'] = {
	init: function( $page ){
		/*
		this.tablelist = page.find('.tablelist')
		this.tablelistObj = this.tablelist.data('tablelist')
	
		page.on('pageon', function(){
			if( !_frame.app_main.page['ships'].tablelistObj )
				_frame.app_main.page['ships'].tablelistObj
					= _frame.app_main.page['ships'].tablelist.data('tablelist')
	
			if( _frame.app_main.page['ships'].tablelistObj )
				_frame.app_main.page['ships'].tablelistObj.thead_redraw()
		})
		*/
		
		this.object = new class extends PAGE{
			constructor( $page ){
				super( $page )
				
				let self = this
				
				this.tablelist = $page.find('.tablelist')
				this.tablelistObj = this.tablelist.data('tablelist')
			
				$page.on({
					'on': function(){
						if( !self.tablelistObj )
							self.tablelistObj
								= self.tablelist.data('tablelist')
				
						if( self.tablelistObj )
							self.tablelistObj.thead_redraw()
					},
					'modeSelectionEnter': function(e, callback_select){
						self.modeSelectionEnter(callback_select)
					}
				})
			}
			
			//modeSelectionEnter(callback_select){
			//	callback_select = super.modeSelectionEnter(callback_select)
			//	console.log(callback_select)
			//}
		}( $page )
	}
}