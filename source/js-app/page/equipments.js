_frame.app_main.page['equipments'] = {}








_frame.app_main.page['equipments'].init = function( page ){
	this.tablelist = page.find('.tablelist')
	this.tablelistObj = this.tablelist.data('tablelist')

	page.on('on', function(){
		if( !_frame.app_main.page['equipments'].tablelistObj )
			_frame.app_main.page['equipments'].tablelistObj
				= _frame.app_main.page['equipments'].tablelist.data('tablelist')

		if( _frame.app_main.page['equipments'].tablelistObj )
			_frame.app_main.page['equipments'].tablelistObj.thead_redraw()
	})
}








_frame.app_main.page['equipments'].gen_helper_equipable_on = function( type_id ){
	var equipable_on = ''
	for( var i in _g.data.item_types[type_id]['equipable_on_type'] ){
		var item_type_id = _g.data.item_types[type_id]['equipable_on_type'][i]
		equipable_on+= '<span>'
							+ _g['data']['ship_types'][item_type_id]['full_zh']
							+ ( parseInt(i) < _g.data.item_types[type_id]['equipable_on_type'].length-1 ? ',&nbsp;' : '' )
						+ '</span>'
	}
	return '<em class="helper" data-tip="<h4 class=item_equipable_on>可装备于</h4>' + equipable_on + '">?</em>'
}