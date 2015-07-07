class Equipment extends ITEM{
	constructor(data) {
		$.extend(true, this, data)
		super()
	}
	
	getName(small_brackets, language){
		language = language || _g.lang
		var result = ITEM.getName.call(this, language)
			,small_brackets_tag = small_brackets && !small_brackets === true ? small_brackets : 'small'
		return small_brackets
				? result.replace(/（([^（^）]+)）/g, '<'+small_brackets_tag+'>($1)</'+small_brackets_tag+'>')
				: result
	}
	
	getType(language){
		language = language || _g.lang
		return this['type']
				? _g['data']['item_types'][this['type']]['name'][language]
				: null
	}

	getIconId(){
		return _g.data.item_types[this['type']]['icon']
	}
}