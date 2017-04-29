// 装备信息
	_frame.infos.__equipment = function( id ){
		var d = _g.data.items[ id ]
			,isAircraft = $.inArray(_g.data.items[id].type, _g.data.item_type_collections[3].types) > -1

		_g.log(d)

		function _stat(stat, title){
			if( d['stat'][stat] ){
				if( Formula.equipmentType.Interceptors.indexOf(d.type) > -1 ){
					// 局地战斗机
					switch( stat ){
						case 'hit': 	title = '对爆';	break;
						case 'evasion': title = '迎击';	break;
					}
				}
				var html = '<small class="stat-'+stat+'">' + title + '</small>'
				switch(stat){
					case 'range':
						html+= '<em>' + _g.getStatRange( d['stat'][stat] ) + '</em>';
						break;
					case 'distance':
						html+= '<em>' + d['stat'][stat] + '</em>';
						break;
					default:
						var val = parseInt( d['stat'][stat] )
						html+= '<em'+ (val < 0 ? ' class="negative"' : '') +'>' + ( val > 0 ? '+' : '') + val + '</em>'
						break;
				}
				$('<span/>').html(html).appendTo(stat_container)
			}//else{
			//	return ''
			//}
		}

		var dom = $('<div class="infos-equipment"/>')
					.attr('data-infos-title', d._name + ' - 装备')

		// 名称 & 类型 & 开发改修
            let upgradable = d['upgrade_to'] && d['upgrade_to'].push && d['upgrade_to'].length ? true : false
			let title = $('<div class="title right-gutter"/>')
				.html(
					'<h2 data-content="' + d.getName() + '">' + d.getName() + '</h2>'
					+ '<small>'
						+ '<span data-tip="图鉴编号">No.' + d['id'] + '</span>'
						+ ( d['type']
							? ( d.getType()
								//+ `<em class="helper" data-tip="[[EQUIPABLE::${d['type']}]]">?</em>`
							): '' )
					+ '</small>'
					+ '<small>'
						+ '<small class="indicator '+(d['craftable'] ? 'true' : 'false')+'">'
							+ ( d['craftable'] ? '可开发' : '不可开发' )
						+ '</small>'
                        + `<small class="indicator ${d['improvable'] ? 'true' : 'false'}">${d['improvable'] ? '可改修' : '不可改修'}</small>`
                        + `<small class="indicator ${upgradable ? 'true' : 'false'}">${upgradable ? '可升级' : '不可升级'}</small>`
						+ (isAircraft
							? '<small class="indicator '+(d['rankupgradable'] ? 'true' : 'false')+'">'
									+ ( d['rankupgradable'] ? '可提升熟练度' : '无熟练度' )
								+ '</small>'
							: ''
						)
					+ '</small>'
				).appendTo(dom)
		
		// 可装备于
			/*
			$('<div class="equipable"/>')
				.append(
					$('<button/>', {
						'type': 	'button',
						'class': 	'button-equipable'
						'html': 	'查询可装备舰娘',
						'data-equipment-type': d['type']
					}).on('click', showEquipable)
				)
				.appendTo( title )
				*/
			$('<button/>', {
				'type': 	'button',
				'class': 	'button-equipable',
				'html': 	'可装备于...',
				'data-equipment-type': d['type']
			}).appendTo( title.find('small').eq(0) )

		// 属性
			var stats = $('<div class="stats"/>')
							.html('<h4 data-content="属性">属性</h4>')
							.appendTo(dom)
				,stat_container = $('<div class="stat right-gutter"/>').appendTo(stats)

			_stat('fire', '火力')
			_stat('torpedo', '雷装')
			_stat('aa', '对空')
			_stat('asw', '对潜')
			_stat('bomb', '爆装')
			_stat('hit', '命中')
			_stat('armor', '装甲')
			_stat('evasion', '回避')
			_stat('los', '索敌')
			_stat('range', '射程')
			if( isAircraft )
				_stat('distance', '航程')
			
			if( !stat_container.html() )
				stat_container.html('<div class="no-content">无...</div>')

		// 开发 & 改修
		/*
			var arsenal = $('<div class="stats"/>')
							.html('<h4 data-content="开发改修">开发改修</h4>')
							.appendTo(dom)
				,arsenal1 = $('<div class="stat"/>').appendTo(arsenal)

			$('<span/>')
				.append(
					$('<small class="indicator">')
						.addClass( d['craftable'] ? 'true' : 'false' )
						.html( d['craftable'] ? '可开发' : '不可开发' )
				)
				.appendTo( arsenal1 )
			$('<span/>')
				.append(
					$('<small class="indicator">')
						.addClass( d['improvable'] ? 'true' : 'false' )
						.html( d['improvable'] ? '可改修' : '不可改修' )
				)
				.appendTo( arsenal1 )
			if( d['improvable'] && !(d['upgrade_to'] && d['upgrade_to'].push && d['upgrade_to'].length) ){
				$('<span/>').html('<small class="indicator false">不可升级</small>')
					.appendTo( arsenal1 )
			}

			// 可升级为
				if( d['upgrade_to'] && d['upgrade_to'].push && d['upgrade_to'].length ){
					var arsenal_to = $('<div class="stat upgrade"/>')
							.html('<span><small class="indicator true">可升级为</small></span>')
							.appendTo(arsenal)
					for( var i in d['upgrade_to'] ){
						_tmpl.link_equipment(d['upgrade_to'][i][0], null, null, d['upgrade_to'][i][1]).appendTo( arsenal_to )
					}
				}
		*/

		// 废弃获得资源
			var dismantle = $('<div class="dismantle"/>')
							.html('<h4 data-content="废弃获得资源">废弃获得资源</h4>')
							.appendTo(dom)
			_g.resourcesTable.forEach(function(v, i){
				$(`<span class="${v}">${d.dismantle[i] || 0}</span>`).appendTo(dismantle)
			})

		// 改修选项
			if( d['improvement'] && d['improvement'].push && d['improvement'].length ){
				//var improvements = $('<div class="stats improvement-options"/>')
				//		.html('<h4 data-content="改修选项">改修选项</h4>')
				//		.appendTo(dom)
				//_tmpl.improvement_inEquipmentInfos(d).appendTo(improvements)
				_p.el.flexgrid.create()
					.addClass('improvement-options')
					.appendDOM(_tmpl.improvement_inEquipmentInfos(d))
					.prepend($('<h4 data-content="改修选项">改修选项</h4>'))
					.appendTo(dom)
			}

		// 可用于其他装备改修
			if( d['upgrade_for'] && d['upgrade_for'].push && d['upgrade_for'].length ){
				var upgrade_for = $('<div class="upgrade-for"/>')
								.html('<h4 data-content="可用于改修其他装备">可用于改修其他装备</h4>')
								.appendTo(dom)
					,upgrade_for1 = $('<div class="stat upgrade"/>')
						.appendTo(upgrade_for)
				d['upgrade_for'].forEach(function(currentValue){
					_tmpl.link_equipment(currentValue).appendTo( upgrade_for1 )
				})
			}

		// 升级来源
			if( d['upgrade_from'] && d['upgrade_from'].push && d['upgrade_from'].length ){
				var upgrade_from = $('<div class="upgrade-from"/>')
								.html('<h4 data-content="可由以下装备升级获得">可由以下装备升级获得</h4>')
								.appendTo(dom)
					,upgrade_from1 = $('<div class="stat upgrade"/>')
						.appendTo(upgrade_from)
				d['upgrade_from'].forEach(function(currentValue){
					_tmpl.link_equipment(currentValue).appendTo( upgrade_from1 )
				})
			}

		// 初始装备于
			var equipped = $('<div class="equipped"/>').html('<h4 data-content="初始装备于">初始装备于</h4>').appendTo(dom)
				,equipped_container = _p.el.flexgrid.create().appendTo( equipped ).addClass('list-ship')
			if( d.default_equipped_on && d.default_equipped_on.length ){
				d.default_equipped_on.forEach(function(currentValue){
					equipped_container.appendDOM(
						_tmpl.link_ship(currentValue).addClass('unit')
					)
				})
			}else{
				equipped_container.addClass('no no-content').html('暂无初始配置该装备的舰娘...')
			}

		// 图鉴
			var illusts = $('<aside class="illustrations"/>').appendTo(dom)
			try{
				var file = node.path.normalize(_g.path.pics.items) + d['id'] + '/card.webp'
					,stat = node.fs.lstatSync(file)
				if( stat && stat.isFile() ){
					$('<img src="'+file+'" data-filename="'+d.getName()+'.webp"/>')
						.appendTo(illusts)
				}
			}catch(e){}

		return dom
	}
