_tmpl.textlink_entity = function( entity, tagName, returnHTML ){
	if( !entity )
		return false

	if( tagName && typeof tagName == 'object' )
		return _tmpl.textlink_entity(
					entity,
					tagName['tagName'] || null,
					tagName['returnHTML'] || null
				)

	tagName = tagName || 'a'
	returnHTML = returnHTML || false

	if( typeof entity != 'object' ){
		var entityId = parseInt(entity)
		entity = _g.data.entities[entityId]
	}else{
		var entityId = entity['id']
	}

	return _tmpl.export(
			'<' + tagName
				+ (tagName == 'a' ? ' href="?infos=entity&id='+entityId+'"' : '')
				+ ' data-entityid="' + entityId + '" data-infos="[[ENTITY::' + entityId + ']]">'
				+ entity._name
			+ '</' + tagName + '>',
			returnHTML
		)
}