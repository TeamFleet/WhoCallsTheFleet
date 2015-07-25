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
	
	getSuffix(language){
		language = language || _g.lang
		return this['name'].suffix
					? (
						_g.data['ship_namesuffix'][this['name'].suffix][language]
						|| _g.data['ship_namesuffix'][this['name'].suffix]['ja_jp']
						|| ''
					)
					: ''
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
	
	getIllust(illustId){
		let series = this.getSeriesData()
		illustId = parseInt(illustId)
		
		for(let i in series){
			if( series[i].id == this.id ){
				switch(illustId){
					case 0:
					case 1:
					case 2:
					case 3:
					case 12:
					case 13:
					case 14:
						return node.path.join(_g.path.pics.ships, this.id + '/' +illustId+ '.webp')
						break;
					default:
						if( series[i].illust_delete ){
							return node.path.join(_g.path.pics.ships, series[i-1].id + '/' +illustId+ '.webp')
						}else{
							return node.path.join(_g.path.pics.ships, this.id + '/' +illustId+ '.webp')
						}
						break;
				}
				break;
			}
		}
	}
	get _illustrations(){
		let arr = []
		for(let i=0; i<15; i++){
			arr.push( this.getIllust(i) )
		}
		return arr
	}
}