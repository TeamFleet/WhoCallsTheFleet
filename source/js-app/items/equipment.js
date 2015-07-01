var Equipment = function( data ){
	$.extend(true, this, data)
}
Equipment.prototype = Object.create(ITEM.prototype)

Equipment.prototype.getName = function(small_brackets, language){
	language = language || _g.lang
	var result = ITEM.prototype.getName.call(this, language)
		,small_brackets_tag = small_brackets && !small_brackets === true ? small_brackets : 'small'
	return small_brackets
			? result.replace(/（([^（^）]+)）/g, '<'+small_brackets_tag+'>($1)</'+small_brackets_tag+'>')
			: result
}

Equipment.prototype.getType = function(language){
	language = language || _g.lang
	return this['type']
			? _g['data']['item_types'][this['type']]['name'][language]
			: null
}

Equipment.prototype.getIconId = function(){
	return _g.data.item_types[this['type']]['icon']
}