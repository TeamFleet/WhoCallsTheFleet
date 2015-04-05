/* 
 */

_frame.infos = {
	// curContent: 			null,			// 当前内容的hashCode

	show: function(cont, el){
		// 第一次运行，创建相关DOM和变量
			if( !_frame.infos.dom ){
				_frame.infos.dom = {
					'nav': 		$('<div class="infos"/>').appendTo( _frame.dom.nav ),
					'main': 	$('<div class="page infos"/>').appendTo( _frame.dom.main )
				}
				_frame.infos.dom.back = $('<button class="back"/>')
						.html('返回')
						.on('click', function(){
							_frame.infos.hide()
						}).appendTo( _frame.infos.dom.nav )
			}

		// 先将内容区域设定为可见
			_frame.dom.layout.addClass('infos-show')

		// 处理内容
			switch(cont){
				case '__ship__':
					cont = _frame.infos.__ship(el)
					break;
			}
			var hashcode = (cont.append) ? cont[0].outerHTML.hashCode() : cont.hashCode()
			if( _frame.infos.curContent != hashcode ){
				_frame.infos.dom.main.empty()
				if( cont.append )
					cont.appendTo( _frame.infos.dom.main )
				else
					_frame.infos.dom.main.html(cont)
				_p.initDOM( _frame.infos.dom.main )
				_frame.infos.curContent = hashcode
			}

		setTimeout(function(){
			// 显示内容
				_frame.dom.layout.addClass('infos-on')
		}, 1)
	},

	hide: function(){
		// 隐藏内容
			_frame.dom.layout.removeClass('infos-on')

		// 为主导航最后一个元素绑定 transitionEnd 事件
		// transitionEnd 触发后，检查 top CSS，如果为 0，判断动画播放结束
		// 将内容区域设定为不可见
			_frame.dom.navlinks.children('button:last-of-type')
					.on('transitionend', function(e){
						if( e.currentTarget == e.target && e.originalEvent.propertyName == 'top' && parseInt($(this).css('top')) == 0 ){
							_frame.dom.layout.removeClass('infos-show')
						}
					})
	}
}







// 初始化
_frame.infos.init = function(){
	if( _frame.infos.is_init )
		return true

	$body.on( 'click._infos', '[data-infos]', function(e){
			if( !(e.target.tagName.toLowerCase() == 'input' && e.target.className == 'compare') ){
				var el = $(this)
				_frame.infos.show(
					el.attr('data-infos'),
					el
				)
			}
		})

	_frame.infos.is_init = true
	return true
}














// 特殊内容

	// 舰娘信息
		_frame.infos.__ship = function( el ){
			var d = _g.data.ships[ el.data('shipid') ]

			if( debugmode )
				console.log(d)

			function _val( val, show_zero ){
				if( !show_zero && (val == 0 || val == '0') )
					return '<small class="zero">-</small>'
				if( val == -1 || val == '-1' )
					return '<small class="zero">?</small>'
				return val
			}
			function _add_stat( name, title, val, tar ){
				$('<span/>')
					.html(
						'<small class="stat-'+name+'">' + title + '</small>'
						+ '<em>' + val + '</em>'
					)
					.appendTo(tar)
			}

			//_frame.modal.resetContent()

			var dom = $('<div class="ship"/>')
				,ship_name = _g.getName( d['name'], '・' ) || '舰娘'
				,illustrations = []

			// 名称 & 舰种 & 舰级
				$('<div class="title"/>')
					.html(
						'<h2 data-content="' + ship_name + '">' + ship_name + '</h2>'
						+ '<small>'
							+ ( d['class'] ? _g['data']['ship_classes'][d['class']]['name_zh'] + '级' : '' )
							+ ( d['class_no'] ? '<em>' + d['class_no'] + '</em>号舰' : '' )
							+ ( d['type'] ? ' / ' + _g['data']['ship_types'][d['type']]['full_zh'] : '' )
						+ '</small>'
					).appendTo(dom)

			// 属性
				var stats = $('<div class="stats"/>').html('<h4 data-content="基础属性">基础属性</h4>').appendTo(dom)
					,stat1 = $('<div/>').appendTo(stats)
					,stat2 = $('<div/>').appendTo(stats)
					,stat3 = $('<div/>').appendTo(stats)
					,stat_consum = $('<div class="consum"/>').appendTo(stats)
				_add_stat( 'hp', 		'耐久', _val( d['stat']['hp'] ), 			stat1 )
				_add_stat( 'armor', 	'装甲', _val( d['stat']['armor_max'] ),		stat1 )
				_add_stat( 'evasion', 	'回避', _val( d['stat']['evasion_max'] ),	stat1 )
				_add_stat( 'carry', 	'搭载', _val( d['stat']['carry'] ),			stat1 )

				_add_stat( 'fire', 		'火力', _val( d['stat']['fire_max'] ),		stat2 )
				_add_stat( 'torpedo', 	'雷装', _val( d['stat']['torpedo_max'] ),	stat2 )
				_add_stat( 'aa', 		'对空', _val( d['stat']['aa_max'] ),		stat2 )
				_add_stat( 'asw', 		'对潜', _val( d['stat']['asw_max'], /^(5|8|9|12)$/.test( d['type'] ) ),		stat2 )

				_add_stat( 'speed', 	'航速', _g.getStatSpeed( d['stat']['speed'] ),		stat3 )
				_add_stat( 'range', 	'射程', _g.getStatRange( d['stat']['range'] ),		stat3 )
				_add_stat( 'los', 		'索敌', _val( d['stat']['los_max'] ),		stat3 )
				_add_stat( 'luck', 		'运', 	d['stat']['luck'] + '<sup>' + d['stat']['luck_max'] + '</sup>',		stat3 )

				_add_stat( 'fuel', 		'油耗', _val( d['consum']['fuel'] ),		stat_consum )
				_add_stat( 'ammo', 		'弹耗', _val( d['consum']['ammo'] ),		stat_consum )

			// 初始装备 & 搭载量
				var equips = $('<div class="equipments"/>').html('<h4 data-content="初始装备 & 搭载量">初始装备 & 搭载量</h4>').appendTo(dom)
					,i = 0
				while( i < 4 ){
					var equip = $('<button/>').appendTo(equips)
						,icon = $('<i/>').appendTo( equip )
						,name = $('<small/>').appendTo( equip )
						,slot = $('<em/>').appendTo( equip )

					if( typeof d['slot'][i] == 'undefined' ){
						equip.addClass('no')
					}else if( typeof d['equip'][i] == 'undefined' || !d['equip'][i] || d['equip'][i] === '' ){
						equip.addClass('empty')
						name.html( '--未装备--' )
						slot.html( d['slot'][i] )
					}else{
						var item_data = _g.data.items[d['equip'][i]]
							,item_icon = 'assets/images/itemicon/'
											+ _g.data.item_types[item_data['type']]['icon']
											+ '.png'
						function _stat(stat, title){
							if( item_data['stat'][stat] ){
								switch(stat){
									case 'range':
										return '<span>射程: ' + _g.getStatRange( item_data['stat'][stat] ) + '</span>';
										break;
									default:
										var val = parseInt( item_data['stat'][stat] )
										return '<span>' + ( val > 0 ? '+' : '') + val + ' ' + title + '</span>'
										break;
								}
							}else{
								return ''
							}
						}
						equip.attr({
							'data-itemid': 	d['equip'][i],
							'data-tip':		'<h3 class="itemstat">'
												+ '<s style="background-image: url(' + item_icon + ')"></s>'
												+ '<strong data-content="' + item_data['name']['zh_cn'] + '">'
													+ item_data['name']['zh_cn']
												+ '</strong>'
												+ '<small>' + _g.data.item_types[item_data['type']]['name']['zh_cn'] + '</small>'
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
						})
						name.html(
							item_data['name']['zh_cn'].replace(/（([^（^）]+)）/g, '<small>($1)</small>')
						)
						slot.html( d['slot'][i] )
						icon.css(
							'background-image',
							'url(' + item_icon + ')'
						)
					}
					i++
				}

			// 声优 & 画师 & 消耗
				$('<span class="entity"/>')
					.html(
						'<strong>声优</strong>'
						+ '<span>' + _g['data']['entities'][d['rels']['cv']]['name'][_g.lang] + '</span>'
					)
					.appendTo(dom)
				$('<span class="entity"/>')
					.html(
						'<strong>画师</strong>'
						+ '<span>' + _g['data']['entities'][d['rels']['illustrator']]['name'][_g.lang] + '</span>'
					)
					.appendTo(dom)
					/*
				var consum = $('<span class="consum"/>').html('<strong>消耗</strong>').appendTo(dom)
				_add_stat( 'fuel', 		'', _val( d['consum']['fuel'] ),		consum )
				_add_stat( 'ammo', 		'', _val( d['consum']['ammo'] ),		consum )
				*/

			// 改造信息
				var remodels = $('<div class="remodels"/>').html('<h4 data-content="改造">改造</h4>').appendTo(dom)
				if( d['series'] ){
					_db.ship_series.find({'id': d['series']}, function(err,docs){
						if( !err && docs && docs.length ){
							// 遍历 docs[0].ships
								for(var i in docs[0].ships){
									var _i = parseInt(i)
										,remodel_ship_data = _g.data.ships[docs[0].ships[i]['id']]
										,remodel_ship_name = remodel_ship_data['name']['zh_cn']
														+ (remodel_ship_data['name']['suffix']
															? '・' + _g.data.ship_namesuffix[remodel_ship_data['name']['suffix']]['zh_cn']
															: '')
										,tip = '<h3 class="shipinfo">'
													+ '<strong data-content="' + remodel_ship_name + '">'
														+ remodel_ship_name
													+ '</strong>'
													+ (
														remodel_ship_data['type'] ?
															'<small>' + _g['data']['ship_types'][remodel_ship_data['type']]['full_zh'] + '</span>'
															: ''
													)
												+ '</h3>'
										,remodel_lvl = _i ? docs[0].ships[ _i - 1 ]['next_lvl'] : null
										,remodel_blueprint = _i ? (docs[0].ships[ _i - 1 ]['next_blueprint']) : null

									$('<button/>')
										.attr('data-tip', tip)
										.addClass(docs[0].ships[i]['id'] == d['id'] ? 'on' : '')
										.addClass(remodel_blueprint ? 'blueprint' : '')
										.html(
											'<img src="' + _g.path.pics.ships + '/' + docs[0].ships[i]['id']+'/0.jpg"/>'
											+ (remodel_lvl ? '<strong>' + remodel_lvl + '</strong>' : '')
										)
										.appendTo(remodels)

									// 处理图鉴信息
										if( docs[0].ships[i]['id'] == d['id'] ){
											if( docs[0].ships[i].illust_delete ){
												if( _i ){
													illustrations.push( docs[0].ships[_i - 1]['id'] )
													if( docs[0].ships[_i - 1].illust_extra && docs[0].ships[_i - 1].illust_extra.length && docs[0].ships[_i - 1].illust_extra[0] ){
														illustrations = illustrations.concat('extra_'+docs[0].ships[_i - 1].illust_extra)
													}
												}
											}else{
												illustrations.push( docs[0].ships[i]['id'] )
												if( docs[0].ships[i].illust_extra && docs[0].ships[i].illust_extra.length && docs[0].ships[i].illust_extra[0] ){
													illustrations = illustrations.concat('extra_'+docs[0].ships[i].illust_extra)
												}
											}
										}
								}
								for( var i in illustrations ){
									$('<img src="' + _g.path.pics.ships + '/' + illustrations[i] + '/8.png' + '"/>').appendTo(illusts)
									$('<img src="' + _g.path.pics.ships + '/' + illustrations[i] + '/9.png' + '"/>').appendTo(illusts)
								}
						}
					})
				}

			// 图鉴
				// illustrations
				var illusts = $('<aside class="illustrations container"/>').appendTo(dom)

			return dom
			/*
			// 按钮
				var buttons = $('<div class="buttons"/>').appendTo(dom)

			_frame.modal.show(
				dom,
				_g.getName( d['name'], '・' ) || '舰娘',
				{
					'classname': 		'infos',
					'blank_to_close': 	true
				}
			)
			*/
		}