/* Class: Ship / 舰娘

 *******************************************************************

new Ship( Object data )
	data	原始数据

 *******************************************************************

ship instanceof Ship

ship.getName( joint, language )
	获取舰名
	joint		[OPTIONAL]
		String		连接符，如果存在后缀名，则在舰名和后缀名之间插入该字符串
		Boolean		如果为 true，则添加默认连接符
					如果为 false，则不添加连接符
		null		不添加连接符
	language	[OPTIONAL]
		String		语言代码，默认为 _g.lang
	返回值
		String		舰名 + 连接符（如果有） + 后缀名（如果有）
	快捷方式
		ship._name	默认连接符，默认语言

ship.getSuffix( language )
	获取后缀名
	language	[OPTIONAL]
		String		语言代码，默认为 _g.lang
	返回值
		String		后缀名

ship.getType( language )
	获取舰种
	language	[OPTIONAL]
		String		语言代码，默认为 _g.lang
	返回值
		String		舰种
	快捷方式
		ship._type	默认语言

ship.getSeriesData()
	获取系列数据
	返回值
		Object		系列

ship.getPic( picId )
	获取图鉴uri/path
	picId	[OPTIONAL]
		Number		图鉴Id，默认 0
	返回值
		String		uri/path
	快捷方式
		ship._pics	获取全部图鉴，Array

 */

class Ship extends ITEM{
	constructor(data){
		super()
		$.extend(true, this, data)
	}
	
	getName(joint, language){
		joint = joint || ''
		language = language || _g.lang
		let suffix = this.getSuffix(language)
		return (
				this['name'][language] || this['name']['ja_jp']
				) + ( suffix ? (
						(joint === true ? _g.joint : joint)
						+ suffix
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
	get _type(){
		return this.getType()
	}
	
	getSeriesData(){
		return this['series']
				? _g['data']['ship_series'][this['series']]['ships']
				: []
	}
	
	getPic(picId){
		let series = this.getSeriesData()
		picId = parseInt(picId || 0)
		
		for(let i=0; i<series.length; i++){
			if( series[i].id == this.id ){
				switch(picId){
					case 0:
					case 1:
					case 2:
					case 3:
					case 12:
					case 13:
					case 14:
						return node.path.join(_g.path.pics.ships, this.id + '/' +picId+ '.webp')
						break;
					default:
						if( series[i].illust_delete ){
							return node.path.join(_g.path.pics.ships, series[i-1].id + '/' +picId+ '.webp')
						}else{
							return node.path.join(_g.path.pics.ships, this.id + '/' +picId+ '.webp')
						}
						break;
				}
				break;
			}
		}
	}
	get _pics(){
		let arr = []
		for(let i=0; i<15; i++){
			arr.push( this.getPic(i) )
		}
		return arr
	}
	
	getSpeed(language){
		language = language || _g.lang
		return _g.statSpeed[parseInt(this.stat.speed)]
	}
	get _speed(){
		return this.getSpeed()
	}
	
	getRange(language){
		language = language || _g.lang
		return _g.statRange[parseInt(this.stat.range)]
	}
	get _range(){
		return this.getRange()
	}
	
	getEquipmentTypes(){
		return _g.data.ship_types[this['type']].equipable.concat( ( this.additional_item_types || [] ) ).sort(function(a, b){
			return a-b
		})
	}
	
	getAttribute(attr, lvl){
		lvl = lvl || 1
		if( lvl > 150 )
			lvl = 150
		
		let getStatOfLvl = function( lvl, base, max ){
			lvl = lvl || 1
			base = parseFloat(base)
			max = parseFloat(max) || base
			if( base < 0 || max < 0 )
				return -1
			return Math.floor( base + (max - base) * lvl / 99 )
		}
		
		let value
		
		switch(attr){
			case 'hp':
				value = this['stat']['hp']
				if( lvl > 99 ){
					if (this['stat']['hp'] >= 90) value = this['stat']['hp'] + 9
					else if (this['stat']['hp'] >= 70) value = this['stat']['hp'] + 8
					else if (this['stat']['hp'] >= 50) value = this['stat']['hp'] + 7
					else if (this['stat']['hp'] >= 40) value = this['stat']['hp'] + 6
					else if (this['stat']['hp'] >= 30) value = this['stat']['hp'] + 5
					else value = this['stat']['hp'] + 4
					if (value > this['stat']['hp_max']) value = this['stat']['hp_max']
				}
				return value
				break;
			case 'speed':
				return _g.getStatSpeed( this['stat']['speed'] )
				break;
			case 'range':
				return _g.getStatRange( this['stat']['range'] )
				break;
			case 'luck':
				if( lvl > 99 )
					return (this['stat']['luck'] + 3)
				return this['stat']['luck']
				break;
			case 'fuel':
			case 'ammo':
				if( lvl > 99 )
					return Math.floor( this['consum'][attr] * 0.85 )
				return this['consum'][attr]
				break;
			case 'aa':
			case 'armor':
			case 'fire':
			case 'torpedo':
				return this['stat'][attr+'_max'] || this['stat'][attr]
				break;
			default:
				return getStatOfLvl( lvl, this['stat'][attr], this['stat'][attr + '_max'] )
				break;
		}
	}
}