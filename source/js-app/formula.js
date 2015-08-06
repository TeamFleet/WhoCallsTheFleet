
let Formula = {
	// 装备类型
		equipmentType: {
			LargeCaliber:		5,		// 大口径主炮
			SuperCaliber:		6,		// 超大口径主炮
			SecondaryGun:		7,		// 副炮
			SecondaryGunHigh:	8,		// 副炮（高角）
			SecondaryGunAA:		9,		// 副炮（高射）
			ReconSeaplane:		15,		// 水上侦察机
			ReconSeaplaneNight:	16,		// 夜侦
			SeaplaneBomber:		17,		// 水上轰炸机
			CarrierFighter:		18,		// 舰战 / 舰载战斗机
			TorpedoBomber:		19,		// 舰攻 / 舰载鱼雷轰炸机
			DiveBomber:			20,		// 舰爆 / 舰载俯冲轰炸机
			CarrierRecon:		21,		// 舰侦 / 舰载侦察机
			Searchlight:		39,		// 探照灯
			SearchlightLarge:	46		// 大型探照灯
		},
	
	// 舰种
		shipType: {
			// 航空母舰
			Carrier: [
				9,
				10,
				11
			],
			// 潜艇
			Submarines: [
				13,
				14
			]
		},
	
	calculate: function( type, ship, equipments_by_slot, star_by_slot, options ){
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
		options = options || {}
		
		let result = 0
		
		switch(type){

			// 制空战力，装备须为战斗机类型 Formula.type.typeFighters
			case 'fighterPower':
				ship.slot.map(function(carry, index){
					if( equipments_by_slot[index]
						&& $.inArray( equipments_by_slot[index].type, Formula.equipmentType.Fighters ) > -1
					)
						result+= Math.floor(Math.sqrt(carry) * equipments_by_slot[index].stat.aa)
				})
				return result
				break;
			
			// 炮击威力，除潜艇外
			case 'shelling':
			case 'shellingDamage':
				if( $.inArray(ship.type, Formula.shipType.Submarines) > -1 ){
					return '-'
				}else if( $.inArray(ship.type, Formula.shipType.Carrier) > -1 ){
					// 航母
					let torpedoDamage = 0
						,bombDamage = 0
					ship.slot.map(function(carry, index){
						if( equipments_by_slot[index] ){
							result+= equipments_by_slot[index].stat.fire
							
							if( equipments_by_slot[index].type == Formula.equipmentType.TorpedoBomber )
								torpedoDamage+= equipments_by_slot[index].stat.torpedo
								
							if( equipments_by_slot[index].type == Formula.equipmentType.DiveBomber )
								bombDamage+= equipments_by_slot[index].stat.bomb
							
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
					ship.slot.map(function(carry, index){
						if( equipments_by_slot[index] )
							result+= equipments_by_slot[index].stat.fire
									+ Math.sqrt(
										(star_by_slot[index] || 0)
										* ( $.inArray( equipments_by_slot[index].type, Formula.equipmentType.LargeCalibers ) > -1
												? 1.5
												: 1
											)
									)
					})
					return Math.floor(result)
				}
				break;
		}
	}
}

Formula.equipmentType.LargeCalibers = [
		Formula.equipmentType.LargeCaliber,
		Formula.equipmentType.HeavyCaliber
	]

Formula.equipmentType.SecondaryGuns = [
		Formula.equipmentType.SecondaryGun,
		Formula.equipmentType.SecondaryGunHigh,
		Formula.equipmentType.SecondaryGunAA
	]

Formula.equipmentType.Fighters = [
		Formula.equipmentType.SeaplaneBomber,
		Formula.equipmentType.CarrierFighter,
		Formula.equipmentType.TorpedoBomber,
		Formula.equipmentType.DiveBomber,
		Formula.equipmentType.CarrierRecon
	]

Formula.equipmentType.Searchlights = [
		Formula.equipmentType.Searchlight,
		Formula.equipmentType.SearchlightLarge
	]




Formula.fighterPower = function(ship, equipments_by_slot){
	return this.calculate( 'fighterPower', ship, equipments_by_slot )
}
Formula.shellingDamage = function(ship, equipments_by_slot, star_by_slot){
	return this.calculate( 'shellingDamage', ship, equipments_by_slot, star_by_slot )
}