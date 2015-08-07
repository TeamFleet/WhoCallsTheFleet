//class PageEquipments extends PAGE

_frame.app_main.page['equipments'] = {
	init: function( $page ){
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
				
						if( self.tablelistObj ){
							self.tablelistObj.thead_redraw()
							self.tablelistObj.apply_types()
						}
					},
					'modeSelectionEnter': function(e, callback_select, callback_enter){
						self.modeSelectionEnter(callback_select, callback_enter)
					},
					'show': function(){
						if( self.tablelistObj ){
							self.tablelistObj.thead_redraw()
							self.tablelistObj.apply_types()
						}
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

_frame.app_main.page['equipments'].gen_helper_equipable_on = function( type_id ){
	var equipable_on = ''
	_g.data.item_types[type_id]['equipable_on_type'].forEach(function(currentValue, i){
		var item_type_id = _g.data.item_types[type_id]['equipable_on_type'][i]
		equipable_on+= '<span>'
							+ _g['data']['ship_types'][item_type_id]['full_zh']
							+ ( i < _g.data.item_types[type_id]['equipable_on_type'].length-1 ? ',&nbsp;' : '' )
						+ '</span>'
	})
	return '<em class="helper" data-tip="<h4 class=item_equipable_on>可装备于</h4>' + equipable_on + '">?</em>'
}