// 实体信息

_frame.infos.__entity = function( id ){
	let d = _g.data.entities[ id ]
		,dom = $('<div class="infos-entity"/>')
					.attr('data-infos-title', d._name + ' - 声优&画师')
		//,serieses = []
		//,seriesCV = []
		//,seriesIllustrator = []

	_g.log(d)
	
	// 标题
		$('<div class="title"/>')
			.html(
				'<h2 data-content="' + d.getName() + '">' + d.getName() + '</h2>'
				+ '<small>' + d.getName('ja_jp') + '</small>'
			).appendTo(dom)
	
	// 图片
		if( d.picture && d.picture.avatar ){
			dom.addClass('is-hasavatar')
			$('<img/>',{
				'src':			d.picture.avatar,
				'class':		'avatar'//,
				//'data-filename':d.getName() + '.jpg'
			}).appendTo(dom)
		}

	/*
	// 遍历全部舰娘，分析声优、画师数据
	// 缓存舰娘所属系列，目前每一个系列只会有一位声优、画师
		_g.data.ship_id_by_type.forEach(function(thisType){
			thisType.forEach(function(thisShip){
				thisShip = _g.data.ships[thisShip]
				if( !thisShip.series || $.inArray( thisShip.series, serieses ) < 0 ){
					if( thisShip.series )
						serieses.push( thisShip.series )
					
					let seriesData = thisShip.getSeriesData()

					if( thisShip.getRel('cv') == id )
						seriesCV.push(seriesData)

					if( thisShip.getRel('illustrator') == id )
						seriesIllustrator.push(seriesData)
				}
			})
		})
	
	let appendInfos = function(title, seriesArray){
		if( !seriesArray.length )
			return

		let container = $('<div class="entity-info"/>').html('<h4 data-content="'+title+'">'+title + '<small>(' + seriesArray.length + ')</small>'+'</h4>').appendTo(dom)
			,flexgrid = _p.el.flexgrid.create().appendTo( container ).addClass('list-ship')
		
		seriesArray.forEach(function(seriesData){
			flexgrid.appendDOM(
				_tmpl.link_ship(seriesData[seriesData.length-1].id, {
					mode:	'names'
				}).addClass('unit')
			)
		})
	}
	
	appendInfos('配音', seriesCV)
	appendInfos('绘制', seriesIllustrator)
	*/
	
	let appendInfos = function(title, t){
		if( !d.relation || !d.relation[t] || !d.relation[t].length )
			return

		let container = $('<div class="entity-info"/>')
						.html('<h4 data-content="'+title+'">'+title + '<small>(' + d.relation[t].length + ')</small>'+'</h4>')
						.appendTo(dom)
			,flexgrid = _p.el.flexgrid.create().appendTo( container ).addClass('list-ship')
		
		d.relation[t].forEach(function(seriesShipIds){
			flexgrid.appendDOM(
				_tmpl.link_ship(seriesShipIds[seriesShipIds.length-1], {
					mode:	'names'
				}).addClass('unit')
			)
		})
	}
	
	appendInfos('配音', 'cv')
	appendInfos('绘制', 'illustrator')
	
	return dom
}
