_tmpl.improvement = function( equipment, improvement_index, requirement_index, returnHTML ){
	if( typeof equipment == 'undefined' )
		return false

	if( typeof equipment != 'object' )
		if( !(equipment = _g.data.items[equipment]) )
			return false

	improvement_index = improvement_index || 0
	requirement_index = requirement_index || [0]
	returnHTML = returnHTML || false

	var improvement = equipment['improvement'][improvement_index]
		,upgrade_to = improvement['upgrade']
						? _g.data.items[improvement['upgrade'][0]]
						: false
		,req_ships = []
		,requirement = ''

	for(var i in requirement_index){
		var req = improvement['req'][requirement_index[i]]
		if( req[1] )
			req_ships = req_ships.concat(req[1])
	}
	if( req_ships.length ){
		var names = []
		for(var i in req_ships){
			names.push(
				'<span'
				+ ' data-infos="[[SHIP::'+req_ships[i]+']]"'
				+ ' data-tip="[[SHIP::'+req_ships[i]+']]"'
				+ '>'
				+ _g.getName( _g.data.ships[req_ships[i]]['name'], '' )
				+ '</span>'
			)
		}
		requirement = '<font>'+names.join(' / ')+'</font>'
	}else{
		requirement = '<font class="no">无秘书舰要求</font>'
	}

	return _tmpl.export(
			'<span class="improvement">'
				+ _tmpl.improvement__title(equipment, upgrade_to, improvement['upgrade'][1])
				+ requirement
				+ _tmpl.improvement__resource(improvement, upgrade_to ? true : false)
			+ '</span>',
			returnHTML
		)
}










_tmpl.improvement_detail = function( equipment, returnHTML ){
	if( typeof equipment == 'undefined' )
		return false

	if( typeof equipment != 'object' )
		if( !(equipment = _g.data.items[equipment]) )
			return false

	var html = ''

	for( var i in (equipment['improvement'] || [])){
		var improvement = equipment['improvement'][i]
			,upgrade_to = improvement['upgrade']
							? _g.data.items[improvement['upgrade'][0]]
							: false
			,requirements = '<font>'

		for( var j in improvement.req ){
			var req = improvement.req[j]
				,names = []
				,text

			requirements+= '<b>'

			for(var k=0; k<7; k++){
				switch(k){
					case 0: text = '日'; break;
					case 1: text = '一'; break;
					case 2: text = '二'; break;
					case 3: text = '三'; break;
					case 4: text = '四'; break;
					case 5: text = '五'; break;
					case 6: text = '六'; break;
				}
				requirements+= '<i' + (req[0][k] ? ' class="on"' : '') + '>'+text+'</i>'
			}

			if( req[1] ){
				for(var k in req[1]){
					names.push(
						'<span'
						+ ' data-infos="[[SHIP::'+req[1][k]+']]"'
						+ ' data-tip="[[SHIP::'+req[1][k]+']]"'
						+ '>'
						+ _g.getName( _g.data.ships[req[1][k]]['name'], '' )
						+ '</span>'
					)
				}
				requirements+= names.join(' / ')
			}else{
				requirements+= '<b>无秘书舰要求</b>'
			}

			requirements+= '</b>'
		}

		requirements+= '</font>'

		html+= '<span class="improvement improvement-details">'
					+ _tmpl.improvement__title(equipment, upgrade_to, improvement['upgrade'][1])
					+ requirements
					+ _tmpl.improvement__resource(improvement, upgrade_to ? true : false)
				+ '</span>'
	}

	return _tmpl.export(
			html,
			returnHTML
		)
}









_tmpl.improvement__getItemName = function(equipment){
	return equipment['name']['zh_cn'].replace(/（([^（^）]+)）/g, '<small>($1)</small>')
}
_tmpl.improvement__title = function(equipment, upgrade_to, upgrade_to_star){
	return '<strong>'
		+ '<em style="background-image:url(../app/assets/images/itemicon/'
			+ _g.data.item_types[equipment['type']]['icon']
			+ '.png)"'
			+ ' data-infos="[[EQUIPMENT::'+equipment['id']+']]"'
			+ ' data-tip="[[EQUIPMENT::'+equipment['id']+']]"'
		+ '">' + _tmpl.improvement__getItemName(equipment) + '</em>'
		+ ( upgrade_to
			? '<b>➝</b>'
				+ '<em style="background-image:url(../app/assets/images/itemicon/'
					+ _g.data.item_types[upgrade_to['type']]['icon']
					+ '.png)"'
					+ ' data-infos="[[EQUIPMENT::'+upgrade_to['id']+']]"'
					+ ' data-tip="[[EQUIPMENT::'+upgrade_to['id']+']]"'
				+ '">' + _tmpl.improvement__getItemName(upgrade_to) + '</em>'
				+ ( upgrade_to_star
					? '<i>+'+upgrade_to_star+'</i>'
					: ''
				)
			: ''
		)
	+ '</strong>'
}
_tmpl.improvement__resource = function(improvement, upgradable){
	function getValue( v ){
		v = parseInt(v)
		if( v<0 )
			return '?'
		return v
	}

	var resource = {}

	resource['all'] = '<span>'
						+ '<em>必要资源</em>'
						+ '<i class="fuel">' + getValue(improvement['resource'][0][0]) + '</i>'
						+ '<i class="ammo">' + getValue(improvement['resource'][0][1]) + '</i>'
						+ '<i class="steel">' + getValue(improvement['resource'][0][2]) + '</i>'
						+ '<i class="bauxite">' + getValue(improvement['resource'][0][3]) + '</i>'
					+ '</span>'

	for(var i=1; i<4; i++){
		var title = ''
		switch(i){
			case 1: title = '★+0 ~ +5'; break;
			case 2: title = '★+6 ~ MAX'; break;
			case 3: title = '升级'; break;
		}
		resource[i] = '<span>'
						+ '<em>'+title+'</em>'
						+ ( i == 3 && !upgradable
							? '<i class="no">-</i>'
							: (
								'<i class="dev_mat">'
									+ getValue(improvement['resource'][i][0])
									+ '<i>(' + getValue(improvement['resource'][i][1]) + ')</i>'
								+ '</i>'
								+ '<i class="imp_mat">'
									+ getValue(improvement['resource'][i][2])
									+ '<i>(' + getValue(improvement['resource'][i][3]) + ')</i>'
								+ '</i>'
								+ ( improvement['resource'][i][4]
									? (
										'<i class="equipment"'
											+ ' style="background-image:url(../app/assets/images/itemicon/'
											+ _g.data.item_types[_g.data.items[improvement['resource'][i][4]]['type']]['icon']
											+ '.png)"'
											+ ' data-infos="[[EQUIPMENT::'+improvement['resource'][i][4]+']]"'
											+ ' data-tip="[[EQUIPMENT::'+improvement['resource'][i][4]+']]"'
										+ '>'
										+ _tmpl.improvement__getItemName(_g.data.items[improvement['resource'][i][4]])
										+ '<i>x' + getValue(improvement['resource'][i][5]) + '</i>'
										+ '</i>'
									)
									: ''
								)
							)
						)
					+ '</span>'
	}

	return 	'<span>'
					+ resource['all']
					+ resource['1']
					+ resource['2']
					+ resource['3']
				+ '</span>'

}