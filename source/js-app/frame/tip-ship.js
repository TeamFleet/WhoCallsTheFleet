if( typeof _p.tip != 'undefined' ){

_p.tip.filters.push( function(cont){
	var exp = /^\[\[SHIP\:\:([0-9]+)\]\]$/.exec(cont)
	if( exp && exp.length > 1 )
		return _p.tip.content_ship( _g.data.ships[ parseInt(exp[1]) ] )
} )

_p.tip.content_ship = function( d ){
	var ship_name = d['name']['zh_cn']
					+ (d['name']['suffix']
						? '・' + _g.data.ship_namesuffix[d['name']['suffix']]['zh_cn']
						: '')
		,html = '<h3 class="shipinfo">'
				+ '<img src="' + _g.path.pics.ships + '/' + d['id']+'/0.webp"/>'
				+ '<strong data-content="' + ship_name + '">'
					+ ship_name
				+ '</strong>'
				+ (
					d['type'] ?
						'<small>' + _g['data']['ship_types'][d['type']]['full_zh'] + '</span>'
						: ''
				)
			+ '</h3>'

	return html

}}