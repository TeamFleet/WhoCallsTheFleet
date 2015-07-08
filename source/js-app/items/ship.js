class Ship extends ITEM{
	constructor(data){
		super()
		$.extend(true, this, data)
	}
	
	getName(joint, language){
		joint = joint || ''
		language = language || _g.lang
		return (
				this['name'][language] || this['name']['ja_jp']
				) + (
				this['name'].suffix ? (
						(joint === true ? _g.joint : joint)
						+ (
								_g.data['ship_namesuffix'][this['name'].suffix][language]
								|| _g.data['ship_namesuffix'][this['name'].suffix]['ja_jp']
							)
					) : ''
				)
	}
	
	getType(language){
		language = language || _g.lang
		return this['type']
				? _g['data']['ship_types'][this['type']]['full_zh']
				: null
	}
	
	getSeriesData(){
		return this['series']
				? _g['data']['ship_series'][this['series']]['ships']
				: []
	}
}