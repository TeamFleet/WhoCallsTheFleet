/* 
 */

_frame.infos = {
	// curContent: 			null,			// 当前内容的hashCode

	show: function(cont, el, history){
		// 第一次运行，创建相关DOM和变量
			if( !_frame.infos.dom ){
				_frame.infos.dom = {
					'nav': 		$('<div class="infos"/>').appendTo( _frame.dom.nav ),
					'main': 	$('<div class="page infos"/>').appendTo( _frame.dom.main )
				}
				_frame.infos.dom.back = $('<button class="back" icon="arrow-left"/>')
						.html('返回')
						.on('click', function(){
							_frame.infos.hide()
						}).appendTo( _frame.infos.dom.nav )
				_frame.infos.dom.historyback = $('<button class="history"/>')
						.html('HISTORY BACK')
						.on('click', function(){
							_frame.infos.historyback()
						}).appendTo( _frame.infos.dom.nav )
			}

		// 先将内容区域设定为可见
			_frame.dom.layout.addClass('infos-show')

		// 处理内容
			switch(cont){
				case '__ship__':
					cont = _frame.infos.__ship(el)
					_frame.infos.dom.main.attr('data-infostype', 'shipinfo')
					break;
				case '__equipment__':
					cont = _frame.infos.__equipment(el)
					_frame.infos.dom.main.attr('data-infostype', 'equipmentinfo')
					break;
			}
			var hashcode = (cont.append) ? cont[0].outerHTML.hashCode() : cont.hashCode()
			if( _frame.infos.curContent != hashcode ){
				if( history ){
					_frame.infos.dom.main.children().slice(2).remove()
					_frame.infos.dom.main.children().eq(0).addClass('off')
					_frame.infos.dom.historyback.html(history).addClass('show')
				}else{
					_frame.infos.dom.historyback.removeClass('show')
					_frame.infos.dom.main.empty()
				}

				if( cont.append )
					cont.appendTo( _frame.infos.dom.main )
				else
					_frame.infos.dom.main.append($(cont))

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
					.on('transitionend.infos_hide', function(e){
						if( e.currentTarget == e.target && e.originalEvent.propertyName == 'top' && parseInt($(this).css('top')) == 0 ){
							_frame.dom.layout.removeClass('infos-show')
							_frame.infos.dom.main.attr('data-infostype', '')
							$(this).off('transitionend.infos_hide')
						}
					})
	},

	historyback: function(){
		_frame.infos.dom.main.children().slice(1).remove()
		_frame.infos.dom.main.children().eq(0).removeClass('off').addClass('fadein')
		_frame.infos.dom.historyback.removeClass('show')

		if( _frame.infos.dom.main.children().eq(0).hasClass('ship') )
			_frame.infos.dom.main.attr('data-infostype', 'shipinfo')
		else if( _frame.infos.dom.main.children().eq(0).hasClass('equipment') )
			_frame.infos.dom.main.attr('data-infostype', 'equipmentinfo')
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
					el,
					el.attr('data-infos-history')
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
			function _add_stat( name, title, tar ){
				var val99 = 0
					,val150 = null

				function getStatOfLvl( lvl, base, max ){
					return Math.floor( base + (max - base) * lvl / 99 )
				}

				switch( name ){
					case 'hp':
						val99 = _val( d['stat']['hp'] )
						if (d['stat']['hp'] >= 90) val150 = d['stat']['hp'] + 9
						else if (d['stat']['hp'] >= 70) val150 = d['stat']['hp'] + 8
						else if (d['stat']['hp'] >= 50) val150 = d['stat']['hp'] + 7
						else if (d['stat']['hp'] >= 40) val150 = d['stat']['hp'] + 6
						else if (d['stat']['hp'] >= 30) val150 = d['stat']['hp'] + 5
						else val150 = d['stat']['hp'] + 4
						if (val150 > d['stat']['hp_max']) val150 = d['stat']['hp_max']
						break;
					case 'asw':
						val99 = _val( getStatOfLvl( 99, d['stat']['asw'], d['stat']['asw_max'] ), /^(5|8|9|12)$/.test(d['type']) )
						val150 = _val( getStatOfLvl( 150, d['stat']['asw'], d['stat']['asw_max'] ), /^(5|8|9|12)$/.test(d['type']) )
						break;
					case 'evasion':
					case 'los':
						val99 = _val( getStatOfLvl( 99, d['stat'][name], d['stat'][name + '_max'] ) )
						val150 = _val( getStatOfLvl( 150, d['stat'][name], d['stat'][name + '_max'] ) )
						break;
					case 'speed':
						val99 = _g.getStatSpeed( d['stat']['speed'] )
						break;
					case 'range':
						val99 = _g.getStatRange( d['stat']['range'] )
						break;
					case 'luck':
						val99 = d['stat']['luck'] + '<sup>' + d['stat']['luck_max'] + '</sup>'
						val150 = (d['stat']['luck'] + 3) + '<sup>' + d['stat']['luck_max'] + '</sup>'
						break;
					case 'fuel':
					case 'ammo':
						val99 = _val( d['consum'][name] )
						val150 = _val( Math.floor( d['consum'][name] * 0.85 ) )
						break;
					default:
						val99 = _val( d['stat'][name + '_max'] || d['stat'][name] )
						break;
				}

				$('<span/>')
					.html(
						'<small class="stat-'+name+'">' + title + '</small>'
						+ '<em'+( val150 ? ' class="lvl99"' : '' )+'>' + val99 + '</em>'
						+ ( val150 ? '<em class="lvl150">' + val150 + '</em>' : '' )
						//+ '<em class="lvl99'+( !val150 ? ' lvl150' : '' )+'">' + val99 + '</em>'
						//+ ( val150 ? '<em class="lvl150">' + val150 + '</em>' : '' )
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
				var lvlRadio99_id = '_input_g' + parseInt(_g.inputIndex)
					,lvlRadio150_id = '_input_g' + (parseInt(_g.inputIndex) + 1)
					,curLvl = parseInt(_config.get('ship_infos_lvl') || 99)
					,stats = $('<div class="stats"/>')
								.html(
									'<div class="title">'
										+ '<h4 data-content="基础属性">基础属性</h4>'
										+ '<span>'
											+ '<label for="'+lvlRadio99_id+'" class="lvl99">99</label>'
											+ '<label for="'+lvlRadio150_id+'" class="lvl150">150</label>'
										+ '</span>'
									+ '</div>'
								)
								.prepend(
									$('<input type="radio" name="ship_infos_lvl" id="'+lvlRadio99_id+'" value="99"/>')
										.prop('checked', curLvl == 99)
										.on('change', function(){
											_config.set('ship_infos_lvl', $(this).val())
										})
								)
								.prepend(
									$('<input type="radio" name="ship_infos_lvl" id="'+lvlRadio150_id+'" value="150"/>')
										.prop('checked', curLvl == 150)
										.on('change', function(){
											_config.set('ship_infos_lvl', $(this).val())
										})
								)
								.appendTo(dom)
					,stat1 = $('<div class="stat"/>').appendTo(stats)
					,stat2 = $('<div class="stat"/>').appendTo(stats)
					,stat3 = $('<div class="stat"/>').appendTo(stats)
					,stat_consum = $('<div class="stat consum"/>').appendTo(stats)

				_g.inputIndex+=2

				_add_stat( 'hp', 		'耐久',	stat1 )
				_add_stat( 'armor', 	'装甲',	stat1 )
				_add_stat( 'evasion', 	'回避',	stat1 )
				_add_stat( 'carry', 	'搭载',	stat1 )

				_add_stat( 'fire', 		'火力',	stat2 )
				_add_stat( 'torpedo', 	'雷装',	stat2 )
				_add_stat( 'aa', 		'对空',	stat2 )
				_add_stat( 'asw', 		'对潜',	stat2 )

				_add_stat( 'speed', 	'航速',	stat3 )
				_add_stat( 'range', 	'射程',	stat3 )
				_add_stat( 'los', 		'索敌',	stat3 )
				_add_stat( 'luck', 		'运',	stat3 )

				_add_stat( 'fuel', 		'油耗',	stat_consum )
				_add_stat( 'ammo', 		'弹耗',	stat_consum )

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
							//'data-equipmentid': 	d['equip'][i],
							'data-tip-position': 	'left',
							//'data-infos': 			"__equipment__",
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
					,remodels_container = _p.el.flexgrid.create().appendTo( remodels )
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

									remodels_container.appendDOM(
										$('<button class="unit" data-shipid="'+ docs[0].ships[i]['id'] +'" data-infos="__ship__"/>')
											.attr('data-tip', tip)
											.addClass(docs[0].ships[i]['id'] == d['id'] ? 'on' : '')
											.addClass(remodel_blueprint ? 'blueprint' : '')
											.html(
												'<i><img src="' + _g.path.pics.ships + '/' + docs[0].ships[i]['id']+'/0.webp"/></i>'
												+ (remodel_lvl ? '<strong>' + remodel_lvl + '</strong>' : '')
											)
									)

									// 处理图鉴信息
										if( docs[0].ships[i]['id'] == d['id'] ){
											if( docs[0].ships[i].illust_delete ){
												if( _i ){
													illustrations.push( docs[0].ships[_i - 1]['id'] )
													if( docs[0].ships[_i - 1].illust_extra && docs[0].ships[_i - 1].illust_extra.length && docs[0].ships[_i - 1].illust_extra[0] ){
														//illustrations = illustrations.concat('extra_'+docs[0].ships[_i - 1].illust_extra)
														for( var j in docs[0].ships[_i - 1].illust_extra ){
															illustrations.push( 'extra_' + docs[0].ships[_i - 1].illust_extra[j] )
														}
													}
												}
											}else{
												illustrations.push( docs[0].ships[i]['id'] )
												if( docs[0].ships[i].illust_extra && docs[0].ships[i].illust_extra.length && docs[0].ships[i].illust_extra[0] ){
													for( var j in docs[0].ships[i].illust_extra ){
														illustrations.push( 'extra_' + docs[0].ships[i].illust_extra[j] )
													}
													//illustrations = illustrations.concat('extra_'+docs[0].ships[i].illust_extra)
												}
											}
										}
								}
								var index = 0
								function check_append( file ){
									file = file.replace(/\\/g, '/')
									try{
										var stat = node.fs.lstatSync(file)
										if( stat && stat.isFile() ){
											index++
											$('<input type="radio" name="ship_'+d['id']+'_illustrations" value="'+index+'"/>')
												.prop('checked', (index == 1))
												.insertBefore(illusts_container)
											$('<span class="container"/>')
												.html('<img src="'+file+'"/>')
												//.css('background-image', 'url(' + file + ')')
												.appendTo(illusts_container)
										}
									}catch(e){}
								}
								for( var i in illustrations ){
									//if( i )
									//	check_append( _g.path.pics.ships + '/' + illustrations[i] + '/2.jpg' )
									check_append( _g.path.pics.ships + '/' + illustrations[i] + '/8.webp' )
									check_append( _g.path.pics.ships + '/' + illustrations[i] + '/9.webp' )
								}
						}
					})
				}

			// 图鉴
				// illustrations
				var illusts = $('<aside class="illustrations"/>').appendTo(dom)
					,illusts_container = $('<div/>').appendTo(illusts)

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

	// 装备信息
		_frame.infos.__equipment = function( el ){
			var d = _g.data.items[ el.data('equipmentid') ]

			if( debugmode )
				console.log(d)

			function _stat(stat, title){
				if( d['stat'][stat] ){
					var value = ''
					switch(stat){
						case 'range':
							value = '<span>射程: ' + _g.getStatRange( d['stat'][stat] ) + '</span>';
							break;
						default:
							var val = parseInt( d['stat'][stat] )
							value = '<span>' + ( val > 0 ? '+' : '') + val + ' ' + title + '</span>'
							break;
					}
					$('<span/>').html(value).appendTo(stat_container)
				}//else{
				//	return ''
				//}
			}

			var dom = $('<div class="equipment"/>')

			// 名称 & 类型
				$('<div class="title"/>')
					.html(
						'<h2 data-content="' + d['name']['zh_cn'] + '">' + d['name']['zh_cn'] + '</h2>'
						+ '<small>'
							+ ( d['type'] ? _g['data']['item_types'][d['type']]['name']['zh_cn'] : '' )
						+ '</small>'
					).appendTo(dom)

			// 属性
				var stats = $('<div class="stats"/>')
								.html('<h4 data-content="属性">属性</h4>')
								.appendTo(dom)
					,stat_container = $('<div class="stat"/>').appendTo(stats)

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

			// 初始装备于
				var equipped = $('<div class="equipped"/>').html('<h4 data-content="初始装备于">初始装备于</h4>').appendTo(dom)
					,equipped_container = _p.el.flexgrid.create().appendTo( equipped )
				if( d.default_equipped_on && d.default_equipped_on.length ){
					for( var i in d.default_equipped_on ){
						var ship_data = _g.data.ships[d.default_equipped_on[i]]
						equipped_container.appendDOM(
							$('<button class="unit" data-infos="__ship__"/>')
								.attr({
									'data-shipid': 	d.default_equipped_on[i],
									'data-infos': 	'__ship__',
									'data-infos-history': 	'<span class="equipment"><span>'
																+ (d['type'] ? '<small>' + _g['data']['item_types'][d['type']]['name']['zh_cn'] + '</small><br/>' : '')
																+ d['name']['zh_cn']
															+ '</span></span>'
								})
								.html(
									'<img src="' + _g.path.pics.ships + '/' + d.default_equipped_on[i]+'/0.webp"/>'
									+ '<span>'
										+ (d['type'] ? '<small>' + _g['data']['ship_types'][ship_data['type']]['full_zh'] + '</small>' : '' )
										+ _g.getName( ship_data['name'], '・' )
									+ '</span>'
								)
						)
					}
				}else{
					equipped_container.addClass('no').html('暂无初始配置该装备的舰娘...')
				}

			// 图鉴
				var illusts = $('<aside class="illustrations"/>').appendTo(dom)
				try{
					var file = _g.path.pics.items + '/' + d['id'] + '/card.webp'
						,stat = node.fs.lstatSync(file)
					if( stat && stat.isFile() ){
						$('<img src="'+file+'"/>')
							.appendTo(illusts)
					}
				}catch(e){}

			return dom
		}