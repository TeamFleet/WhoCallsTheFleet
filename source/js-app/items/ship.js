var Ship = function( data ){
	$.extend(true, this, data)
}
Ship.prototype = Object.create(ITEM.prototype)

Ship.prototype.getName = function(joint, language){
	joint = joint || ''
	language = language || _g.lang
	return (
			this['name'][language] || this['name']['ja_jp']
			) + (
			this['name'].suffix ? (
					joint + (
							_g.data['ship_namesuffix'][this['name'].suffix][language]
							|| _g.data['ship_namesuffix'][this['name'].suffix]['ja_jp']
						)
				) : ''
			)
}

Ship.prototype.getType = function(language){
	language = language || _g.lang
	return this['type']
			? _g['data']['ship_types'][this['type']]['full_zh']
			: null
}