if( typeof _p.tip != 'undefined' ){


// [[EQUIPMENT::123]]
_p.tip.filters.push( function(cont){
	var exp = /^\[\[EQUIPMENT\:\:([0-9]+)\]\]$/.exec(cont)
	if( exp && exp.length > 1 )
		return _p.tip.content_equipment( _g.data.items[ parseInt(exp[1]) ] )
} )

_p.tip.content_equipment = function( d ){

	function _stat(stat, title){
		if( d['stat'][stat] ){
			if( d.type == 54 ){
				// 局地战斗机
				switch( stat ){
					case 'hit': 	title = '对爆';	break;
					case 'evasion': title = '迎击';	break;
				}
			}
			switch(stat){
				case 'range':
					return '<span>射程: ' + _g.getStatRange( d['stat'][stat] ) + '</span>';
					//break;
				case 'distance':
					return '<span>' + title + ': ' + d['stat'][stat] + '</span>';
				default:
					var val = parseInt( d['stat'][stat] )
					return '<span>' + ( val > 0 ? '+' : '') + val + ' ' + title + '</span>'
					//break;
			}
		}else{
			return ''
		}
	}

	/*
	var item_icon = 'assets/images/itemicon/'
						+ d.getIconId()
						+ '.png'
		,item_name = d.getName()
		,html = '<h3 class="itemstat">'
					+ '<s style="background-image: url(' + item_icon + ')"></s>'
					+ '<strong data-content="' + item_name + '">'
						+ item_name
					+ '</strong>'
					+ '<small>' + _g.data.item_types[d['type']]['name']['zh_cn'] + '</small>'
				+ '</h3>'
				+ _stat('fire', '火力')
				+ _stat('torpedo', '雷装')
				+ _stat('aa', '对空')
				+ _stat('asw', '对潜')
				+ _stat('bomb', '爆装')
				+ _stat('hit', '命中')
				+ _stat('armor', '装甲')
				+ _stat('evasion', '回避')
				+ _stat('los', '索敌')
				+ _stat('range', '射程')
	*/

	let item_name = d.getName()
		,isAircraft = $.inArray(d.type, Formula.equipmentType.Aircrafts) > -1

	return '<h3 class="itemstat">'
			+ '<s class="equiptypeicon mod-'+d.getIconId()+'"></s>'
			+ '<strong data-content="' + item_name + '">'
				+ item_name
			+ '</strong>'
			+ '<small>' + _g.data.item_types[d['type']]['name']['zh_cn'] + '</small>'
		+ '</h3>'
		+ _stat('fire', '火力')
		+ _stat('torpedo', '雷装')
		+ _stat('aa', '对空')
		+ _stat('asw', '对潜')
		+ _stat('bomb', '爆装')
		+ _stat('hit', '命中')
		+ _stat('armor', '装甲')
		+ _stat('evasion', '回避')
		+ _stat('los', '索敌')
		+ _stat('range', '射程')
		+ ( isAircraft ? _stat('distance', '航程') : '' )

}



// [[EQUIPABLE::123]]
_p.tip.filters.push( function(cont){
	var exp = /^\[\[EQUIPABLE\:\:([0-9]+)\]\]$/.exec(cont)
	if( exp && exp.length > 1 )
		return _p.tip.content_equipable( _g.data.item_types[ parseInt(exp[1]) ] )
} )

_p.tip.content_equipable_results = {}
_p.tip.content_equipable = function( d ){
	if( !_p.tip.content_equipable_results[d.id] ){
		let html = `<h4 class="item_equipable_on">可装备于以下舰种</h4>`
			,equipable_extra_ship = d.equipable_extra_ship || []
		
		html+= `<p>`	
		if( d.equipable_on_type.length ){
			let types = []
			_g.ship_type_order_full.forEach( function(ship_type){
				if( d.equipable_on_type.indexOf( ship_type ) > -1 )
					types.push( ship_type )
			} )
			html+= types.map(function(ship_type){
					let shipType = _g.data.ship_types[ship_type]
					return '<span>' + (shipType.full_zh || shipType.full_game) + `(${shipType.code})` + '</span>'
				}).join(' / ')
		}else{
			html+= '无...'
		}
		html+= `</p>`	
		
		if( equipable_extra_ship.length ){
			html+= `<h4 class="item_equipable_on">也可装备于以下舰娘</h4>`
			html+= d.equipable_extra_ship.map(function(shipId){
					let ship = _g.data.ships[shipId]
						,shipType = ship.getType()
					return `<span><a href="?infos=ship&id=${shipId}" data-shipid="${shipId}" data-infos="[[SHIP::${shipId}]]" data-tip="[[SHIP::${shipId}]]">`
							+ (shipType ? `[${shipType}] ` : '' )
							+ ship.getName(_g.joint)
							+ `</a></span>`
				}).join(' / ')
		}
		
		_p.tip.content_equipable_results[d.id] = html
	}
	
	return _p.tip.content_equipable_results[d.id]
}



}
