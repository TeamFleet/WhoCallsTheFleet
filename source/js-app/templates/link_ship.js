_tmpl.link_ship = function( ship, tagName, returnHTML, mode, extraIllust ){
	if( !ship )
		return false

	if( tagName && typeof tagName == 'object' )
		return _tmpl.link_ship(
					ship,
					tagName['tagName'] || null,
					tagName['returnHTML'] || null,
					tagName['mode'] || null,
					tagName['extraIllust'] || null
				)

	tagName = tagName || 'a'
	returnHTML = returnHTML || false
	mode = mode || 'default'

	if( typeof ship != 'object' ){
		var shipId = parseInt(ship)
		ship = _g.data.ships[shipId]
	}else{
		var shipId = ship['id']
	}
	
	let content = ''
		,shipType = ship.getType()
		,hasExtraIllust = false
	
	switch(mode){
		case 'names':
			var names = []
			ship.getSeriesData().forEach(function(thisSeries){
				let thisName = _g.data.ships[thisSeries.id].getNameNoSuffix()
				if( $.inArray( thisName, names ) < 0 )
					names.push( thisName )
			})
			content = names.join(' / ')
			break;
		default:
			content = (shipType ? '<small>' + shipType + '</small>' : '' )
						+ ship.getName(_g.joint)
			break;
	}
	
	if( extraIllust ){
		let seriesData = ship.getSeriesData()
		seriesData.forEach(function(data_cur, i){
			hasExtraIllust = data_cur.illust_extra && data_cur.illust_extra.length && data_cur.illust_extra[0] ? true : false
			if( !hasExtraIllust && data_cur.illust_delete ){
				let data_prev = i ? seriesData[ i - 1 ] : null
				if( data_prev )
					hasExtraIllust = data_prev.illust_extra && data_prev.illust_extra.length && data_prev.illust_extra[0] ? true : false
			}
		})
	}

	return _tmpl.export(
			`<${tagName}`
				+ (tagName == 'a' ? ` href="${_g.getLink('ships', shipId)}"` : '')
				+ ` class="link_ship" data-shipid="${shipId}" data-infos="[[SHIP::${shipId}]]"`
				+ (hasExtraIllust ? ` icon="hanger"` : '')
			+ `>`
				+ `<img src="${_g.getImg('ships', shipId, 0)}"/>`
				+ `<span>${content}</span>`
			+ `</${tagName}>`,
		/*
			'<' + tagName
				+ (tagName == 'a' ? ' href="?infos=ship&id='+shipId+'"' : '')
				+ ' class="link_ship" data-shipid="' + shipId + '" data-infos="[[SHIP::' + shipId + ']]">'
				+ '<img src="' + node.path.normalize(_g.path.pics.ships) + '/' + shipId + '/0.webp"/>'
				+ '<span>'
					+ content
				+ '</span>'
			+ '</' + tagName + '>',
		*/
			/*
			`<${tagName} class="unit link_ship" data-shipid="${shipId}" data-infos="[[SHIP::${shipId}]]">
				<img src="${_g.path.pics.ships}/${shipId}/0.webp"/>
				<span>${shipName}</span>
			</${tagName}>`,*/
			returnHTML
		)
}
