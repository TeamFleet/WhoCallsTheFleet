//class PageShips extends Page

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
		
		this.object = new class extends Page{
			constructor( $page ){
				super( $page )
				
				this.tablelist = $page.find('.tablelist')
				this.tablelistObj = this.tablelist.data('tablelist')
			
				$page.on({
					'on': function(){
						if( !this.tablelistObj )
							this.tablelistObj
								= this.tablelist.data('tablelist')
				
						if( this.tablelistObj )
							this.tablelistObj.thead_redraw()
					}.bind(this),
					'modeSelectionEnter': function(e, callback_select){
						this.modeSelectionEnter(callback_select)
					}.bind(this)
				})
			}
			
			//modeSelectionEnter(callback_select){
			//	callback_select = super.modeSelectionEnter(callback_select)
			//	console.log(callback_select)
			//}
		}( $page )
	}
}
