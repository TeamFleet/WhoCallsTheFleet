class Equipment extends ITEM{
	constructor(data) {
		super()
		$.extend(true, this, data)
	}
	
	getName(small_brackets, language){
		language = language || _g.lang
		var result = ITEM.prototype.getName.call(this, language)
			//,result = super.getName(language)
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
	
	getCaliber(){
		let name = this.getName(false, 'ja_jp')
			,caliber = parseFloat(name)
		
		return caliber
	}
	
	getPower(){
		return this.stat[
			_g.data['item_types'][this['type']]['main_attribute'] || 'fire'
		]
		/*
		switch( this['type'] ){
			// Guns
				case 1:
				case 2:
				case 3:
				case 4:
				case 5:
				case 6:
				case 7:
				case 8:
				case 9:
		}
		*/
	}
}