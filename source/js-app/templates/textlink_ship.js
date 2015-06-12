_tmpl.textlink_ship = function( ship, tagName, returnHTML ){
	if( !ship )
		return false

	if( tagName && typeof tagName == 'object' )
		return _tmpl.link_ship(
					ship,
					tagName['tagName'] || null,
					tagName['returnHTML'] || null
				)

	tagName = tagName || 'a'
	returnHTML = returnHTML || false

	if( typeof ship != 'object' ){
		var shipId = parseInt(ship)
		ship = _g.data.ships[shipId]
	}else{
		var shipId = ship['id']
	}

	return _tmpl.export(
			'<' + tagName + ' href="?infos=ship&id=' + shipId + '" data-shipid="' + shipId + '" data-infos="[[SHIP::' + shipId + ']]">'
				+ (ship['type'] ? '[' + _g['data']['ship_types'][ship['type']]['full_zh'] + '] ' : '' )
				+ _g.getName( ship['name'], '・' )
			+ '</' + tagName + '>',
			returnHTML
		)
}