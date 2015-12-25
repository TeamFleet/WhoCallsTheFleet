//class PageEquipments extends Page

_frame.app_main.page['equipments'] = {
	init: function( $page ){
		this.object = new class extends Page{
			constructor( $page ){
				super( $page )
				
				this.tablelist = $page.find('.tablelist')
				this.tablelistObj = this.tablelist.data('tablelist')
			
				$page.on({
					'modeSelectionEnter': function(e, callback_select, callback_enter){
						this.modeSelectionEnter(callback_select, callback_enter)
					}.bind(this),
					'pageShow': function(){
						if( !this.tablelistObj )
							this.tablelistObj
								= this.tablelist.data('tablelist')

						if( this.tablelistObj ){
							this.tablelistObj.thead_redraw()
							this.tablelistObj.apply_types()
						}
					}.bind(this),
					'pageHide': function(){
						TablelistEquipments.types = []
						TablelistEquipments.shipId = null
						if( this.tablelistObj ){
							this.tablelistObj.apply_types()
						}
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
