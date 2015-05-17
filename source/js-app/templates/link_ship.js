_tmpl.link_ship = function( ship, tagName, returnHTML ){
	if( !ship )
		return false

	if( typeof tagName == 'object' )
		return _tmpl.link_ship(
					ship,
					tagName['tagName'] || null,
					tagName['returnHTML'] || null
				)

	tagName = tagName || 'button'
	returnHTML = returnHTML || false

	if( typeof ship != 'object' ){
		var shipId = parseInt(ship)
		ship = _g.data.ships[shipId]
	}else{
		var shipId = ship['id']
	}

	var shipName = (ship['type'] ? '<small>' + _g['data']['ship_types'][ship['type']]['full_zh'] + '</small>' : '' )
					+ _g.getName( ship['name'], '・' )

	return _tmpl.export(
			'<' + tagName + ' class="unit link_ship" data-shipid="' + shipId + '" data-infos="[[SHIP::' + shipId + ']]">'
				+ '<img src="' + _g.path.pics.ships + '/' + shipId + '/0.webp"/>'
				+ '<span>'
					+ (ship['type'] ? '<small>' + _g['data']['ship_types'][ship['type']]['full_zh'] + '</small>' : '' )
					+ _g.getName( ship['name'], '・' )
				+ '</span>'
			+ '</' + tagName + '>',
			/*
			`<${tagName} class="unit link_ship" data-shipid="${shipId}" data-infos="[[SHIP::${shipId}]]">
				<img src="${_g.path.pics.ships}/${shipId}/0.webp"/>
				<span>${shipName}</span>
			</${tagName}>`,*/
			returnHTML
		)
}