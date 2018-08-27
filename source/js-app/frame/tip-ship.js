if( typeof _p.tip != 'undefined' ){

_p.tip.filters.push( function(cont){
	var exp = /^\[\[SHIP\:\:([0-9]+)\]\]$/.exec(cont)
	if( exp && exp.length > 1 )
		return _p.tip.content_ship( _g.data.ships[ parseInt(exp[1]) ] )
} )

_p.tip.content_ship = function( d ){
	var ship_name = d.getName(_g.joint)
		,html = '<h3 class="shipinfo">'
				+ '<img src="' + KC.getFolderGroup(_g.path.pics.ships, d['id']) + '/' + d['id']+'/0.webp" width="160" height="40"/>'
				+ '<strong data-content="' + ship_name + '">'
					+ ship_name
				+ '</strong>'
				+ (
					d['type'] ?
						'<small>' + _g['data']['ship_types'][d['type']].name.zh_cn + '</span>'
						: ''
				)
			+ '</h3>'

	return html

}}
