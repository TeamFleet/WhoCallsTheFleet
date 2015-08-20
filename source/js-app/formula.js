// 公式来源: http://bbs.ngacn.cc/read.php?tid=8329592

let Formula = {
	// 装备类型
		equipmentType: {
			MediumCaliber:		4,		// 中口径主炮
			LargeCaliber:		5,		// 大口径主炮
			SuperCaliber:		6,		// 超大口径主炮
			SecondaryGun:		7,		// 副炮
			SecondaryGunHigh:	8,		// 副炮（高角）
			SecondaryGunAA:		9,		// 副炮（高射）
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
		
		let result = 0
		
		switch(type){

			// 制空战力，装备须为战斗机类型 Formula.type.typeFighters
			case 'fighterPower':
				ship.slot.map(function(carry, index){
					if( equipments_by_slot[index]
						&& $.inArray( equipments_by_slot[index].type, Formula.equipmentType.Fighters ) > -1
						&& carry
					){
						result+= Math.sqrt(carry) * (equipments_by_slot[index].stat.aa || 0)
						if( equipments_by_slot[index].type == Formula.equipmentType.CarrierFighter ){
							switch( rank_by_slot[index] ){
								case 1: case '1':
									result+= 1; break;
								case 2: case '2':
									result+= 4; break;
								case 3: case '3':
									result+= 6; break;
								case 4: case '4':
									result+= 11; break;
								case 5: case '5':
									result+= 16; break;
								case 6: case '6':
									result+= 17; break;
								case 7: case '7':
									result+= 25; break;
							}
						}else if( $.inArray( equipments_by_slot[index].type, Formula.equipmentType.Recons ) == -1 ){
							let max_per_slot = equipments_by_slot[index].type == Formula.equipmentType.SeaplaneBomber
												? 9
												: 3
							result+= rank_by_slot[index] == 1
										? 1
										: max_per_slot / 6 * (rank_by_slot[index] - 1)
						}
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
				}else if( $.inArray(ship.type, Formula.shipType.Carriers) > -1 ){
					// 航母
					let torpedoDamage = 0
						,bombDamage = 0
					ship.slot.map(function(carry, index){
						if( equipments_by_slot[index] ){
							result+= equipments_by_slot[index].stat.fire || 0
							
							if( equipments_by_slot[index].type == Formula.equipmentType.TorpedoBomber )
								torpedoDamage+= equipments_by_slot[index].stat.torpedo || 0
								
							if( equipments_by_slot[index].type == Formula.equipmentType.DiveBomber )
								bombDamage+= equipments_by_slot[index].stat.bomb || 0
							
							if( $.inArray( equipments_by_slot[index].type, Formula.equipmentType.SecondaryGuns ) > -1 )
								result+= Math.sqrt((star_by_slot[index] || 0) * 1.5)
						}
					})
					if( !torpedoDamage && !bombDamage )
						return '-'
					else
						result+= ( bombDamage * 1.3 + torpedoDamage + ship.stat.fire_max ) * 1.5 + 55
					return Math.floor(result)
				}else{
					// 其他舰种
					result = ship.stat.fire_max + 5
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
					return Math.floor(result + 2 * Math.sqrt(CLGunTwinNumber) + Math.sqrt(CLGunNavalNumber))
				}
				break;
			
			// 雷击威力，航母除外
			case 'torpedo':
			case 'torpedoDamage':
				if( $.inArray(ship.type, Formula.shipType.Carriers) > -1 ){
					return '-'
				}else{
					result = ship.stat.torpedo_max
					ship.slot.map(function(carry, index){
						if( equipments_by_slot[index] ){
							result+= equipments_by_slot[index].stat.torpedo || 0
								
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
					if( result )
						return Math.floor(result) + 5
					return '-'
				}
				break;
			
			// 命中总和
			case 'hitSum':
				ship.slot.map(function(carry, index){
					if( equipments_by_slot[index] )
						result+= equipments_by_slot[index].stat.hit || 0
				})
				return result>=0 ? '+'+result : result
				break;
		}
		
		return '-'
	}
}

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
Formula.hitSum = function(ship, equipments_by_slot, star_by_slot, rank_by_slot){
	return this.calculate( 'hitSum', ship, equipments_by_slot, star_by_slot, rank_by_slot )
}
Formula.fighterPower = function(ship, equipments_by_slot, star_by_slot, rank_by_slot){
	return this.calculate( 'fighterPower', ship, equipments_by_slot, star_by_slot, rank_by_slot )
}