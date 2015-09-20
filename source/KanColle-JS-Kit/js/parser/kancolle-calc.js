/* Perser for kancolle-calc.net

 *******************************************************************

_g.kancolle_calc.decode( data, version )
	解析舰载机厨格式为是谁呼叫舰队格式
	变量
		data
			String		字符串化的（stringify）JSON
			Object		JSON，原数据
		version		[OPTIONAL]
			Number		代码版本，目前支持：3；如果不填，默认为当前支持的最新版本
	返回值
		Array		是谁呼叫舰队的存储格式

_g.kancolle_calc.encode( data, version )
	将是谁呼叫舰队格式编码为舰载机厨格式
	变量
		data
			String		字符串化的（stringify）Array
			Array		原数据
		version		[OPTIONAL]
			Number		代码版本，目前支持：3；如果不填，默认为当前支持的最新版本
	返回值
		Object		舰载机厨格式

 *******************************************************************

舰载机厨格式 - V3
	{
		// 版本
		"version": 3,
		
		// 舰队#1
		"f1": {
			// 舰娘#1
			"s1": {
				"id":	330,
				"lv":	97 || null,
				"luck":	-1 || 50,		// -1 表示默认值
				"items": {
					"ix": {},
					// 装备#1
					"i1": {
						"id":	122,
						"rf":	1		// 改修星级
					}
				}
			}
		},
		
		// 舰队#2
		"f2": {},
		
		// 舰队#3
		"f3": {},
		
		// 舰队#4
		"f4": {}
	}

实例
	{"version":3,"f1":{"s1":{"id":330,"lv":97,"luck":-1,"items":{"ix":{},"i1":{"id":122,"rf":1},"i2":{"id":122,"rf":0},"i3":{"id":106,"rf":7}}},"s2":{"id":144,"lv":98,"luck":-1,"items":{"ix":{},"i1":{"id":63,"rf":1},"i2":{"id":147,"rf":0},"i3":{"id":47,"rf":3}}},"s3":{"id":145,"lv":98,"luck":-1,"items":{"ix":{},"i1":{"id":122,"rf":0},"i2":{"id":122,"rf":0},"i3":{"id":106,"rf":0}}},"s4":{"id":420,"lv":92,"luck":-1,"items":{"ix":{},"i1":{"id":122,"rf":10},"i2":{"id":91,"rf":0},"i3":{"id":106,"rf":0}}},"s5":{"id":426,"lv":87,"luck":-1,"items":{"ix":{},"i1":{"id":122,"rf":10},"i2":{"id":91,"rf":0},"i3":{"id":88,"rf":6}}},"s6":{"id":141,"lv":81,"luck":-1,"items":{"ix":{},"i1":{"id":135,"rf":10},"i2":{"id":131,"rf":0},"i3":{"id":124,"rf":0}}}},"f2":{},"f3":{},"f4":{}}
	{"version":3,"f1":{"s1":{"id":411,"lv":null,"luck":-1,"items":{"ix":{},"i1":{"id":9,"rf":10},"i2":{"id":137,"rf":10},"i3":{"id":116,"rf":6},"i4":{"id":80,"rf":0}}},"s2":{"id":427,"lv":null,"luck":-1,"items":{"ix":{},"i1":{"id":50,"rf":7},"i2":{"id":123,"rf":0},"i3":{"id":59,"rf":0},"i4":{"id":35,"rf":0}}},"s3":{"id":319,"lv":null,"luck":-1,"items":{"ix":{},"i1":{"id":50,"rf":10},"i2":{"id":123,"rf":0},"i3":{"id":102,"rf":0},"i4":{"id":35,"rf":0}}},"s4":{"id":428,"lv":null,"luck":-1,"items":{"ix":{},"i1":{"id":50,"rf":4},"i2":{"id":135,"rf":10},"i3":{"id":131,"rf":0},"i4":{"id":35,"rf":0}}},"s5":{"id":156,"lv":null,"luck":-1,"items":{"ix":{},"i1":{"id":60,"rf":0},"i2":{"id":110,"rf":0},"i3":{"id":110,"rf":0},"i4":{"id":54,"rf":0}}},"s6":{"id":278,"lv":null,"luck":-1,"items":{"ix":{},"i1":{"id":22,"rf":0},"i2":{"id":22,"rf":0},"i3":{"id":144,"rf":0},"i4":{"id":22,"rf":0}}}},"f2":{},"f3":{},"f4":{}}

可使用URL直接访问
	http://www.kancolle-calc.net/deckbuilder.html?predeck=XXOO
	使用 encodeURIComponent 对数据进行编码

 *******************************************************************

是谁呼叫舰队格式
	[
		// 舰队#1
		[
			// 舰娘#1
			[
				STRING/NUMBER 舰娘ID,
				[
					NUMBER 等级,
					NUMBER 运，如果没有特殊指定则为 -1
				],
				[
					NUMBER 装备ID,	// 实际装备
					...
				],
				[
					NUMBER 改修星级,	// 实际装备，此ARRAY可选
					...
				],
				[
					NUMBER 熟练度, 	// 实际装备，此ARRAY可选
				]
			]
		]
	]

实例
	["319",[91,40],[50,58,58,101],[7,6,0,0]]
	["144",[96,-1],[122,29,88],[1,0,0]
	["145",[96,-1],[122,29,29],[]]
	["403",[83,-1],[127,58],[0,0]]

 *******************************************************************
 */

_g.kancolle_calc = {
	version: 3,

	decode: function(data, version){
		if( !data )
			return
		if( typeof data == 'string' )
			data = JSON.parse(data)
		if( typeof data != 'object' )
			return
		version = parseInt(data.version) || this.version
		
		let result
			,i = 0
			,j = 0
			,k = 0
			,data_fleet
			,data_ship
			,data_item
		
		switch(version){
			case 3:
				result = []
				i=0
				while( data_fleet = data['f' + (i+1)] ){
					result[i] = []
					j=0
					while( data_ship = data_fleet['s' + (j+1)] ){
						if( data_ship.id ){
							result[i][j] = [
								data_ship.id,
								[
									data_ship.lv || null,
									data_ship.luck || -1
								],
								[],
								[],
								[]
							]
						}
						if( data_ship.items ){
							k=0
							while( data_item = data_ship.items['i' + (k+1)] ){
								if( data_item.id ){
									result[i][j][2][k] = data_item.id
									result[i][j][3][k] = data_item.rf || null
									result[i][j][4][k] = data_item.rp || null
								}
								k++
							}
						}
						j++
					}
					i++
				}
				break;
		}
		
		return result
	},

	encode: function(data, version){
		if( !data )
			return
		if( !data.length || !data.push )
			data = JSON.parse(data)
		if( !data.length || !data.push )
			return
		version = parseInt(version) || this.version
		
		let result
		
		switch(version){
			case 3:
				result = {
					'version': 3
				}
				data.forEach(function(data_fleet, i){
					result['f' + (i+1)] = {}
					data_fleet.forEach(function(data_ship, j){
						if( data_ship[0] ){
							result['f' + (i+1)]['s' + (j+1)] = {
								'id':	parseInt(data_ship[0]),
								'lv':	parseInt(data_ship[1][0]) || null,
								'luck':	parseInt(data_ship[1][1]) || -1,
								'items':{
									'ix': {}
								}
							}
							data_ship[2].forEach(function(id_item, k){
								if( id_item ){
									result['f' + (i+1)]['s' + (j+1)].items['i' + (k+1)] = {
										'id':	parseInt(id_item)
									}
									if( data_ship[3] )
										result['f' + (i+1)]['s' + (j+1)].items['i' + (k+1)].rf
											= parseInt(data_ship[3][k]) || 0
									if( data_ship[4] )
										result['f' + (i+1)]['s' + (j+1)].items['i' + (k+1)].rp
											= parseInt(data_ship[4][k]) || 0
								}
							})
						}
					})
				})
				break;
		}
		
		return result
	}
}