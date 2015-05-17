_tmpl.link_equipment = function( equipment, tagName, returnHTML, improvementStar ){
	if( !equipment )
		return false

	if( tagName && typeof tagName == 'object' )
		return _tmpl.link_equipment(
					equipment,
					tagName['tagName'] || null,
					tagName['returnHTML'] || null,
					typeof tagName['improvementStar'] == 'undefined' ? null : tagName['improvementStar']
				)

	tagName = tagName || 'button'
	returnHTML = returnHTML || false
	improvementStar = typeof improvementStar == 'undefined' ? null : improvementStar

	if( typeof equipment != 'object' ){
		var equipmentId = parseInt(equipment)
		equipment = _g.data.items[equipmentId]
	}else{
		var equipmentId = equipment['id']
	}

	return _tmpl.export(
			'<' + tagName + ' class="link_equipment"'
				+ ' data-equipmentid="' + equipmentId + '"'
				+ ' data-tip-position="right"'
				+ ' data-infos="[[EQUIPMENT::' + equipmentId + ']]"'
				+ ' data-tip="[[EQUIPMENT::' + equipmentId + ']]"'
			+ '>'
				+ '<i style="background-image:url(assets/images/itemicon/'
					+ _g.data.item_types[equipment['type']]['icon']
					+ '.png)"></i>'
				+ '<small>'
					+ equipment['name']['zh_cn'].replace(/（([^（^）]+)）/g, '<small>($1)</small>')
				+ '</small>'
				+ ( improvementStar !== null
					? '<em' + (improvementStar<=0 ? ' class="zero"' : '') + '>+' + improvementStar + '</em>'
					: ''
				)
			+ '</' + tagName + '>',
			returnHTML
		)
}