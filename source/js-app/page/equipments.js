//class PageEquipments extends PAGE

_frame.app_main.page['equipments'] = {
	init: function( $page ){
		this.object = new class extends PAGE{
			constructor( $page ){
				super( $page )
				
				this.tablelist = $page.find('.tablelist')
				this.tablelistObj = this.tablelist.data('tablelist')
			
				$page.on({
					'on': function(){
						if( !this.tablelistObj )
							this.tablelistObj
								= this.tablelist.data('tablelist')
				
						if( this.tablelistObj ){
							this.tablelistObj.thead_redraw()
							this.tablelistObj.apply_types()
						}
					}.bind(this),
					'modeSelectionEnter': function(e, callback_select, callback_enter){
						this.modeSelectionEnter(callback_select, callback_enter)
					}.bind(this),
					'show': function(){
						if( this.tablelistObj ){
							this.tablelistObj.thead_redraw()
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