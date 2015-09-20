// 公式来源: http://bbs.ngacn.cc/read.php?tid=8329592

let Formula = {
	// 装备类型
		equipmentType: {
			SmallCaliber:		1,		// 小口径主炮
			SmallCaliberHigh:	2,		// 小口径主炮（高角）
			SmallCaliberAA:		3,		// 小口径主炮（高射）
			MediumCaliber:		4,		// 中口径主炮
			LargeCaliber:		5,		// 大口径主炮
			SuperCaliber:		6,		// 超大口径主炮
			SecondaryGun:		7,		// 副炮
			SecondaryGunHigh:	8,		// 副炮（高角）
			SecondaryGunAA:		9,		// 副炮（高射）
			APShell:			11,		// 穿甲弹
			Torpedo:			12,		// 鱼雷
			SubmarineTorpedo:	13,		// 潜艇鱼雷
			MidgetSubmarine:	14,		// 微型潜艇
			ReconSeaplane:		15,		// 水上侦察机
			ReconSeaplaneNight:	16,		// 夜侦
			SeaplaneBomber:		17,		// 水上轰炸机
			CarrierFighter:		18,		// 舰战 / 舰载战斗机
			TorpedoBomber:		19,		// 舰攻 / 舰载鱼雷轰炸机
			DiveBomber:			20,		// 舰爆 / 舰载俯冲轰炸机
			CarrierRecon:		21,		// 舰侦 / 舰载侦察机
			SmallRadar:			24,		// 小型雷达
			LargeRadar:			25,		// 大型雷达
			DepthCharge:		26,		// 爆雷
			Sonar:				27,		// 声纳
			LargeSonar:			28,		// 大型声纳
			AAGun:				29,		// 对空机枪
			AAGunConcentrated:	30,		// 对空机枪（集中配备）
			Searchlight:		39,		// 探照灯
			SearchlightLarge:	46,		// 大型探照灯
			SuparRadar:			47		// 超大型雷达
		},
	
	// 舰种
		shipType: {
			// 航空母舰
			Carriers: [
				9,
				10,
				11
			],
			// 轻巡系
			LightCruisers: [
				2,
				3,
				21,
				28
			],
			// 潜艇
			Submarines: [
				13,
				14
			]
		},
	
	calculate: function( type, ship, equipments_by_slot, star_by_slot, rank_by_slot, options ){
		if( !type || !ship )
			return 0
		
		if( !(ship instanceof Ship) )
			ship = _g.data.ships[ship]
		
		let result = 0
			,count = {
					'main': 0,
					'secondary': 0,
					'torpedo': 0,
					'seaplane': 0,
					'apshell': 0,
					'radar': 0
				}
			,powerFire = function(){
					let result = 0
						,isCV = false
					
					// 检查是否为航母攻击模式
						if( $.inArray(ship.type, Formula.shipType.Carriers) > -1 ){
							isCV = true
						}else{
							equipments_by_slot.forEach(function(equipment){
								if( equipment && !isCV && $.inArray(equipment.type, Formula.equipmentType.AircraftBased) > -1 )
									isCV = true
							})
						}
					
					if( isCV ){
						// 航母攻击模式
						let torpedoDamage = 0
							,bombDamage = 0
						ship.slot.map(function(carry, index){
							if( equipments_by_slot[index] ){
								result+= (equipments_by_slot[index].stat.fire * 1.5) || 0
								
								if( equipments_by_slot[index].type == Formula.equipmentType.TorpedoBomber )
									torpedoDamage+= equipments_by_slot[index].stat.torpedo || 0
									
								if( equipments_by_slot[index].type == Formula.equipmentType.DiveBomber )
									bombDamage+= equipments_by_slot[index].stat.bomb || 0
								
								if( $.inArray( equipments_by_slot[index].type, Formula.equipmentType.SecondaryGuns ) > -1 )
									result+= Math.sqrt((star_by_slot[index] || 0) * 1.5)
							}
						})
						if( !torpedoDamage && !bombDamage )
							return -1
						else
							result+= ( bombDamage * 1.3 + torpedoDamage + ship.stat.fire_max ) * 1.5 + 50
						return result
					}else{
						result = ship.stat.fire_max || 0
						// 其他舰种
						let CLGunNavalNumber = 0
							,CLGunTwinNumber = 0
						ship.slot.map(function(carry, index){
							if( equipments_by_slot[index] ){
								result+= equipments_by_slot[index].stat.fire || 0
								
								// 轻巡系主炮加成
									if( $.inArray(ship.type, Formula.shipType.LightCruisers) > -1 ){
										if( equipments_by_slot[index].id == 4 || equipments_by_slot[index].id == 65 )
											CLGunNavalNumber+= 1
										if( equipments_by_slot[index].id == 119 || equipments_by_slot[index].id == 139 )
											CLGunTwinNumber+= 1
									}
								
								// 改修加成
									if( star_by_slot[index] ){
										// 忽略装备类型: 鱼雷、雷达
										if( $.inArray( equipments_by_slot[index].type, Formula.equipmentType.Torpedos.concat(Formula.equipmentType.Radars) ) < 0 ){
											let multipler = 1
											// 对潜装备
												if( $.inArray( equipments_by_slot[index].type, Formula.equipmentType.AntiSubmarines ) > -1 )
													multipler = 0.75
											// 大口径主炮
												if( $.inArray( equipments_by_slot[index].type, Formula.equipmentType.LargeCalibers ) > -1 )
													multipler = 1.5
											result+= Math.sqrt(star_by_slot[index]) * multipler
										}
									}
							}
						})
						return result + 2 * Math.sqrt(CLGunTwinNumber) + Math.sqrt(CLGunNavalNumber)
					}
					return (ship.stat.fire_max || 0)
				}
			,powerTorpedo = function(){
					let result = 0
					if( $.inArray(ship.type, Formula.shipType.Carriers) > -1 ){
						return -1
					}else{
						result = ship.stat.torpedo_max || 0
						ship.slot.map(function(carry, index){
							if( equipments_by_slot[index] ){
								result+= equipments_by_slot[index].type == Formula.equipmentType.TorpedoBomber
											? 0
											: (equipments_by_slot[index].stat.torpedo || 0)
									
								// 改修加成
									if( star_by_slot[index] ){
										let multipler = 0
										// 鱼雷
											if( $.inArray( equipments_by_slot[index].type, Formula.equipmentType.Torpedos ) > -1 )
												multipler = 1.2
										// 机枪
											if( $.inArray( equipments_by_slot[index].type, Formula.equipmentType.AAGuns ) > -1 )
												multipler = 1
										result+= Math.sqrt(star_by_slot[index]) * multipler
									}
							}
						})
						return result
					}
					return (ship.stat.torpedo_max || 0)
				}
			,value = 0
		
		equipments_by_slot = equipments_by_slot.map(function(equipment){
				if( !equipment )
					return null
				if( equipment instanceof Equipment )
					return equipment
				return _g.data.items[equipment]
			}) || []
		star_by_slot = star_by_slot || []
		rank_by_slot = rank_by_slot || []
		options = options || {}
		
		equipments_by_slot.forEach(function(equipment){
			if( !equipment )
				return
			if( $.inArray( equipment.type, Formula.equipmentType.MainGuns ) > -1 )
				count.main+= 1
			else if( $.inArray( equipment.type, Formula.equipmentType.SecondaryGuns ) > -1 )
				count.secondary+= 1
			else if( $.inArray( equipment.type, Formula.equipmentType.Torpedos ) > -1 )
				count.torpedo+= 1
			else if( $.inArray( equipment.type, Formula.equipmentType.Seaplanes ) > -1 )
				count.seaplane+= 1
			else if( equipment.type == Formula.equipmentType.APShell )
				count.apshell+= 1
			else if( $.inArray( equipment.type, Formula.equipmentType.Radars ) > -1 )
				count.radar+= 1
		})
		
		switch(type){
			// 制空战力，装备须为战斗机类型 Formula.type.typeFighters
			case 'fighterPower':
				value = 0
				ship.slot.map(function(carry, index){
					if( equipments_by_slot[index]
						&& $.inArray( equipments_by_slot[index].type, Formula.equipmentType.Fighters ) > -1
						&& carry
					){
						value = Math.sqrt(carry) * (equipments_by_slot[index].stat.aa || 0)
						if( equipments_by_slot[index].type == Formula.equipmentType.CarrierFighter ){
							switch( rank_by_slot[index] ){
								case 1: case '1':
									value+= 1; break;
								case 2: case '2':
									value+= 4; break;
								case 3: case '3':
									value+= 6; break;
								case 4: case '4':
									value+= 11; break;
								case 5: case '5':
									value+= 16; break;
								case 6: case '6':
									value+= 17; break;
								case 7: case '7':
									value+= 25; break;
							}
						}else if( $.inArray( equipments_by_slot[index].type, Formula.equipmentType.Recons ) == -1 ){
							let max_per_slot = equipments_by_slot[index].type == Formula.equipmentType.SeaplaneBomber
												? 9
												: 3
							value+= rank_by_slot[index] == 1
										? 1
										: max_per_slot / 6 * (rank_by_slot[index] - 1)
						}
						result+= Math.floor(value)
					}
				})
				return result
				//return Math.floor(result)
				break;
			
			// 炮击威力，除潜艇外
			case 'shelling':
			case 'shellingDamage':
				if( $.inArray(ship.type, Formula.shipType.Submarines) > -1 ){
					return '-'
				}else{
					result = powerFire()
					if( result && result > -1 )
						return Math.floor(result) + 5
					return '-'
				}
				break;
			
			// 雷击威力，航母除外
			case 'torpedo':
			case 'torpedoDamage':
				result = powerTorpedo()
				if( result && result > -1 )
					return Math.floor(result) + 5
				return '-'
				break;
			
			// 夜战模式 & 伤害力
			case 'nightBattle':
				if( $.inArray(ship.type, Formula.shipType.Carriers) > -1 ){
					// 航母没有夜战
					return '-'
				}else{
					console.log(count)
					result = powerFire() + powerTorpedo()
					if( count.torpedo >= 2 ){
						return '雷击CI ' + Math.floor( result * 1.5 ) + ' x 2'
					}else if( count.main >= 3 ){
						return '炮击CI ' + Math.floor( result * 2 ) + ''
					}else if( count.main == 2 && count.secondary >= 1 ){
						return '炮击CI ' + Math.floor( result * 1.75 ) + ''
					}else if( count.main >= 1 && count.torpedo == 1 ){
						return '炮雷CI ' + Math.floor( result * 1.3 ) + ' x 2'
					}else if(
						(count.main == 2 && count.secondary <= 0 && count.torpedo <= 0)
						|| (count.main == 1 && count.secondary >= 1 && count.torpedo <= 0)
						|| (count.main == 0 && count.secondary >= 2 && count.torpedo >= 0)
					){
						return '连击 ' + Math.floor( result * 1.2 ) + ' x 2'
					}else{
						return '通常 ' + Math.floor( result ) + ''
					}
				}
				break;
			
			// 命中总和
			case 'addHit':
				ship.slot.map(function(carry, index){
					if( equipments_by_slot[index] )
						result+= equipments_by_slot[index].stat.hit || 0
				})
				return result>=0 ? '+'+result : result
				break;
			
			// 装甲总和
			case 'addArmor':
				ship.slot.map(function(carry, index){
					if( equipments_by_slot[index] )
						result+= equipments_by_slot[index].stat.armor || 0
				})
				return result
				break;
			
			// 回避总和
			case 'addEvasion':
				ship.slot.map(function(carry, index){
					if( equipments_by_slot[index] )
						result+= equipments_by_slot[index].stat.evasion || 0
				})
				return result
				break;
		}
		
		return '-'
	}
}

Formula.equipmentType.MainGuns = [
		Formula.equipmentType.SmallCaliber,
		Formula.equipmentType.SmallCaliberHigh,
		Formula.equipmentType.SmallCaliberAA,
		Formula.equipmentType.MediumCaliber,
		Formula.equipmentType.LargeCaliber,
		Formula.equipmentType.SuperCaliber
	]

Formula.equipmentType.LargeCalibers = [
		Formula.equipmentType.LargeCaliber,
		Formula.equipmentType.SuperCaliber
	]

Formula.equipmentType.SecondaryGuns = [
		Formula.equipmentType.SecondaryGun,
		Formula.equipmentType.SecondaryGunHigh,
		Formula.equipmentType.SecondaryGunAA
	]

Formula.equipmentType.Torpedos = [
		Formula.equipmentType.Torpedo,
		Formula.equipmentType.SubmarineTorpedo
	]

Formula.equipmentType.Seaplanes = [
		Formula.equipmentType.ReconSeaplane,
		Formula.equipmentType.ReconSeaplaneNight,
		Formula.equipmentType.SeaplaneBomber
	]

Formula.equipmentType.Fighters = [
		Formula.equipmentType.SeaplaneBomber,
		Formula.equipmentType.CarrierFighter,
		Formula.equipmentType.TorpedoBomber,
		Formula.equipmentType.DiveBomber,
		Formula.equipmentType.CarrierRecon
	]

Formula.equipmentType.Recons = [
		Formula.equipmentType.ReconSeaplane,
		Formula.equipmentType.ReconSeaplaneNight,
		Formula.equipmentType.CarrierRecon
	]

Formula.equipmentType.AircraftBased = [
		Formula.equipmentType.CarrierFighter,
		Formula.equipmentType.TorpedoBomber,
		Formula.equipmentType.DiveBomber,
		Formula.equipmentType.CarrierRecon
	]

Formula.equipmentType.Radars = [
		Formula.equipmentType.SmallRadar,
		Formula.equipmentType.LargeRadar,
		Formula.equipmentType.SuparRadar
	]

Formula.equipmentType.AntiSubmarines = [
		Formula.equipmentType.DepthCharge,
		Formula.equipmentType.Sonar,
		Formula.equipmentType.LargeSonar
	]

Formula.equipmentType.AAGuns = [
		Formula.equipmentType.AAGun,
		Formula.equipmentType.AAGunConcentrated
	]

Formula.equipmentType.Searchlights = [
		Formula.equipmentType.Searchlight,
		Formula.equipmentType.SearchlightLarge
	]




Formula.shellingDamage = function(ship, equipments_by_slot, star_by_slot, rank_by_slot){
	return this.calculate( 'shellingDamage', ship, equipments_by_slot, star_by_slot, rank_by_slot )
}
Formula.torpedoDamage = function(ship, equipments_by_slot, star_by_slot, rank_by_slot){
	return this.calculate( 'torpedoDamage', ship, equipments_by_slot, star_by_slot, rank_by_slot )
}
Formula.fighterPower = function(ship, equipments_by_slot, star_by_slot, rank_by_slot){
	return this.calculate( 'fighterPower', ship, equipments_by_slot, star_by_slot, rank_by_slot )
}
Formula.nightBattle = function(ship, equipments_by_slot, star_by_slot, rank_by_slot){
	return this.calculate( 'nightBattle', ship, equipments_by_slot, star_by_slot, rank_by_slot )
}
Formula.addHit = function(ship, equipments_by_slot, star_by_slot, rank_by_slot){
	return this.calculate( 'addHit', ship, equipments_by_slot, star_by_slot, rank_by_slot )
}
Formula.addArmor = function(ship, equipments_by_slot, star_by_slot, rank_by_slot){
	return this.calculate( 'addArmor', ship, equipments_by_slot, star_by_slot, rank_by_slot )
}
Formula.addEvasion = function(ship, equipments_by_slot, star_by_slot, rank_by_slot){
	return this.calculate( 'addEvasion', ship, equipments_by_slot, star_by_slot, rank_by_slot )
}