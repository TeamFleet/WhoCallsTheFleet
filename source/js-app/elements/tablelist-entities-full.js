// Entities

TablelistEntities.prototype.append_item_cv = function( entity ){
	return _tmpl.link_entity( entity, null, false, entity.relation.cv.length ).addClass('unit cv')
}

TablelistEntities.prototype.append_item_illustrator = function( entity ){
	return $('<a/>',{
		'class':	'unit illustrator',
		'href':		'?infos=entity&id=' + entity.id,
		'html':		entity._name + ' (' + entity.relation.illustrator.length + ')'
	})
}

TablelistEntities.prototype.append_items = function( title, arr, callback_append_item ){
	let container
	
	this.dom.container
		.append(
			$('<div/>',{
				'class':	'typetitle',
				'html':		title
			})
		)
		.append(
			container = _p.el.flexgrid.create().addClass('tablelist-list')
		)
	
	arr.forEach(function(item){
		container.appendDOM( callback_append_item( item ) )
	}, this)
}

	
	
	
	
	
	
	
	
	
TablelistEntities.prototype.init_new = function(){
	let listCV = [],
		listIllustrator = []
	
	for( let i in _g.data.entities ){
		let entity = _g.data.entities[i]
		if( !entity.relation )
			continue
		if( entity.relation.cv && entity.relation.cv.length )
			listCV.push(entity)
		if( entity.relation.illustrator && entity.relation.illustrator.length )
			listIllustrator.push(entity)
	}

	this.append_items(
		'声优',
		listCV.sort(function(a,b){
			return b.relation.cv.length - a.relation.cv.length
		}),
		this.append_item_cv
	)
	this.append_items(
		'画师',
		listIllustrator.sort(function(a,b){
			return b.relation.illustrator.length - a.relation.illustrator.length
		}),
		this.append_item_illustrator
	)
	
	this.generated = true
	_frame.app_main.loaded('tablelist_'+this._index, true)
}
