if( typeof _p.tip != 'undefined' ){

_p.tip.filters.push( function(cont){
	var exp = /^\[\[EQUIPMENT\:\:([0-9]+)\]\]$/.exec(cont)
	if( exp && exp.length > 1 )
		return _p.tip.content_equipment( _g.data.items[ parseInt(exp[1]) ] )
} )

_p.tip.content_equipment = function( d ){

	function _stat(stat, title){
		if( d['stat'][stat] ){
			switch(stat){
				case 'range':
					return '<span>射程: ' + _g.getStatRange( d['stat'][stat] ) + '</span>';
					break;
				default:
					var val = parseInt( d['stat'][stat] )
					return '<span>' + ( val > 0 ? '+' : '') + val + ' ' + title + '</span>'
					break;
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

}}
