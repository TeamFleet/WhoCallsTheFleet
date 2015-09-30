_tmpl.link_entity = function( entity, tagName, returnHTML, count ){
	if( !entity )
		return false

	if( tagName && typeof tagName == 'object' )
		return _tmpl.link_entity(
					entity,
					tagName['tagName'] || null,
					tagName['returnHTML'] || null,
					tagName['count'] || null
				)

	tagName = tagName || 'a'
	returnHTML = returnHTML || false
	count = typeof count == 'undefined' ? false : count

	if( typeof entity != 'object' ){
		var entityId = parseInt(entity)
		entity = _g.data.entities[entityId]
	}else{
		var entityId = entity['id']
	}

	return _tmpl.export(
			'<' + tagName
				+ (tagName == 'a' ? ' href="?infos=entity&id='+entityId+'"' : '')
				+ ' class="link_entity" data-entityid="' + entityId + '" data-infos="[[ENTITY::' + entityId + ']]">'
				+ (entity.picture && entity.picture.avatar
					? '<i style="background-image:url(' + entity.picture.avatar + ')"></i>'
					: '<i></i>'
				)
				+ '<span>'
					+ entity._name
					+ ( typeof count == 'undefined'
						? ''
						: ' <small>(' + count + ')</small>'
					)
				+ '</span>'
			+ '</' + tagName + '>',
			returnHTML
		)
}