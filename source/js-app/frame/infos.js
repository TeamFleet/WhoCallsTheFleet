/* 
 */

_frame.infos = {
	// curContent: 			null,			// 当前内容的hashCode

	// lastCurrentPage: null, 		// 进入 infos 框架之前显示的页面
	// last: null, 					// 上一次 infos，通常进入其他页面后会被重置
	historyLength: -1,
	historyCurrent: -1,

	contentCache: {},

	getContent: function(type, id){
		if( !this.contentCache[type] )
			this.contentCache[type] = {}

		if( id == '__NEW__' )
			return _p.initDOM( _frame.infos['__' + type]( id ).addClass('infosbody') )

		if( !this.contentCache[type][id] ){
			this.contentCache[type][id] = _p.initDOM( _frame.infos['__' + type]( id ).addClass('infosbody') )
		}

		return this.contentCache[type][id]
	},

	show: function(cont, el, doNotPushHistory){
		var exp			= /^\[\[([^\:]+)\:\:(.+)\]\]$/.exec(cont)
			,infosType 	= null
			,infosId 	= null

		if( exp && exp.length > 2 ){
			infosType = exp[1].toLowerCase()
			if( isNaN(exp[2]) )
				//infosId = encodeURI(JSON.stringify( exp[2] ))
				infosId = exp[2]
			else
				infosId = parseInt( exp[2] )
			switch( infosType ){
				case 'item':
				case 'equip':
					infosType = 'equipment'
					break;
			}
		}else{
			return false
		}

		// 如果为相同内容，不运行
			if( this.curContent == infosType + '::' + infosId )
				return _frame.infos.dom.container.children('div:first-child')

		if( !doNotPushHistory ){
		//}else{
			this.historyCurrent++
			this.historyLength = this.historyCurrent
			_frame.app_main.pushState(
				{
					'infos':infosType,
					'id': 	infosId,
					'infosHistoryIndex': _frame.infos.historyCurrent
				},
				null,
				'?infos=' + infosType + '&id=' + infosId
			)
		}

		this.show_func( infosType, infosId, doNotPushHistory )
	},

	//show_func: function(cont, el, history){
	show_func: function(type, id, doNotPushHistory, infosHistoryIndex){
		if( !type || !id )
			return false

		// 如果为相同内容，不运行
			if( this.curContent == type + '::' + id )
				return _frame.infos.dom.container.children('div:first-child')

		type = type.toLowerCase()
		if( isNaN(id) )
			id = id
		else
			id = parseInt(id)

		var cont = ''
			,title = null

		// 第一次运行，创建相关DOM和变量
			if( !_frame.infos.dom ){
				_frame.infos.dom = {
					//'nav': 		$('<div class="infos"/>').appendTo( _frame.dom.nav ),
					'main': 	$('<div class="page-container infos"/>').appendTo( _frame.dom.main )
				}
				_frame.infos.dom.container = $('<div class="wrapper"/>').appendTo( _frame.infos.dom.main )
				/*
				_frame.infos.dom.back = $('<button class="back" icon="arrow-set2-left"/>')
						.on({
							'click': function(){
								_frame.infos.dom.forward.removeClass('disabled')
								history.back()
								//_frame.infos.hide()
							},
							'transitionend.infos_hide': function(e){
								if( e.currentTarget == e.target
									&& e.originalEvent.propertyName == 'opacity'
									&& parseInt(_frame.infos.dom.back.css('opacity')) == 0
								){
									_frame.infos.hide_finish()
								}
							}
						}).appendTo( _frame.infos.dom.nav )
				_frame.infos.dom.forward = $('<button class="forward disabled" icon="arrow-set2-right"/>')
						.on('click', function(){
							history.forward()
							//_frame.infos.hide()
						}).appendTo( _frame.infos.dom.nav )
				*/
				_frame.dom.btnHistoryBack.on({
							'transitionend.infos_hide': function(e){
								if( e.currentTarget == e.target
									&& e.originalEvent.propertyName == 'opacity'
									&& parseFloat(_frame.dom.btnHistoryBack.css('opacity')) == 0
								){
									_frame.infos.hide_finish()
								}
							}
						})
			}

		// 计算历史记录相关，确定 Back/Forward 按钮是否可用
			infosHistoryIndex = typeof infosHistoryIndex != 'undefined' ? infosHistoryIndex : this.historyCurrent
			this.historyCurrent = infosHistoryIndex
			//_g.log( this.historyCurrent, this.historyLength )
			if( this.historyCurrent == this.historyLength && this.historyCurrent > -1 )
				_frame.dom.btnHistoryForward.addClass('disabled')

		// 先将内容区域设定为可见
			_frame.dom.layout.addClass('is-infos-show')

		// 处理内容
			switch(type){
				case 'ship':
					cont = this.getContent(type, id)
					_frame.infos.dom.main.attr('data-infostype', 'ship')
					title = '资料 - 舰娘 - ' + _g.data.ships[id]._name
					break;
				case 'equipment':
					cont = this.getContent(type, id)
					_frame.infos.dom.main.attr('data-infostype', 'equipment')
					title = '资料 - 装备 - ' + _g.data.items[id]._name
					break;
				case 'fleet':
					cont = this.getContent(type, id)
					_frame.infos.dom.main.attr('data-infostype', 'fleet')
					title = '舰队 - ' + id
					_frame.app_main.mode_selection_off()
					TablelistEquipments.types = []
					break;
				case 'entity':
					cont = this.getContent(type, id)
					_frame.infos.dom.main.attr('data-infostype', 'entity')
					title = '资料 - 人物团体 - ' + _g.data.entities[id]._name
					break;
			}
			//var hashcode = (cont.append) ? cont[0].outerHTML.hashCode() : cont.hashCode()
			//if( _frame.infos.curContent != hashcode ){
				var contentDOM = cont.append ? cont : $(cont)

				//if( el && el.attr('data-infos-history-skip-this') )
				//	contentDOM.attr('data-infos-history-skip-this', true)

				//if( _frame.infos.dom.main.children().length )
				//	contentDOM.addClass('fadein')

				/*
				if( history ){
					_frame.infos.dom.main.children().filter('[data-infos-history-skip-this="true"]').remove()
					_frame.infos.dom.main.children().slice(2).remove()
					_frame.infos.dom.main.children().eq(0).addClass('off')
					_frame.infos.dom.historyback.html(history).addClass('show')
				}else{
					_frame.infos.dom.historyback.html('').removeClass('show')
					_frame.infos.dom.main.empty()
				}*/
				//data-infos-history-skip-this

				contentDOM
					.on('transitionend.hide', function(e){
						if( e.currentTarget == e.target && e.originalEvent.propertyName == 'opacity' && parseInt(contentDOM.css('opacity')) == 0 ){
							contentDOM.detach()
						}
					})
					.prependTo( _frame.infos.dom.container )

				//_p.initDOM( contentDOM )
				//_frame.infos.curContent = hashcode
				this.curContent = type + '::' + id
			//}

		// 取消主导航上的当前项目状态
			if( _frame.app_main.cur_page ){
				this.lastCurrentPage = _frame.app_main.cur_page

				// exit selection mode
					//_frame.app_main.mode_selection_off()
				
				if( _frame.dom.navs[_frame.app_main.cur_page] )
					_frame.dom.navs[_frame.app_main.cur_page].removeClass('on')
				_frame.app_main.cur_page = null
			}
		
		// 确定 theme
			_frame.infos.dom.main.attr({
				'data-theme': 		cont.attr('data-theme')
			})

		setTimeout(function(){
			// 显示内容
				_frame.dom.layout.addClass('is-infos-on')
				
			_frame.app_main.title = title
			
			console.log( _frame.infos.last )
			
			if( _frame.infos.last != title )
				_ga.counter(
					location.search
				)
			
			_frame.infos.last = title
		}, 1)
	},

	hide: function(){
		if( !_frame.infos.dom || !this.curContent )
			return false

		// 隐藏内容
			_frame.dom.layout.removeClass('is-infos-on')
			_frame.dom.btnHistoryForward.addClass('disabled')
			this.curContent = null

		if( this.lastCurrentPage ){
			if( _frame.dom.navs[this.lastCurrentPage] )
				_frame.dom.navs[this.lastCurrentPage].addClass('on')
			_frame.app_main.cur_page = this.lastCurrentPage
		}

		/*
		// 为主导航最后一个元素绑定 transitionEnd 事件
		// transitionEnd 触发后，检查 top CSS，如果为 0，判断动画播放结束
		// 将内容区域设定为不可见
			_frame.dom.navlinks.children('button:last-of-type')
					.on('transitionend.infos_hide', function(e){
						if( e.currentTarget == e.target && e.originalEvent.propertyName == 'top' && parseInt($(this).css('top')) == 0 ){
							_frame.dom.layout.removeClass('is-infos-show')
							_frame.infos.dom.main.attr('data-infostype', '')
							$(this).off('transitionend.infos_hide')
						}
					})
		*/
	},

	hide_finish: function(){
		// 仍在显示，不予执行
			if( _frame.infos.curContent )
				return false

		_frame.dom.layout.removeClass('is-infos-show')
		_frame.infos.dom.main.attr({
			'data-infostype': 	'',
			'data-theme': 		''
		})
		//$(this).off('transitionend.infos_hide')
		this.historyLength = -1
		this.historyCurrent = -1
	},

	historyback: function(){
		_frame.infos.dom.main.children().slice(1).remove()
		_frame.infos.dom.main.children().eq(0).removeClass('off').addClass('fadein')
		_frame.infos.dom.historyback.empty().removeClass('show')

		if( _frame.infos.dom.main.children().eq(0).hasClass('ship') )
			_frame.infos.dom.main.attr('data-infostype', 'ship')
		else if( _frame.infos.dom.main.children().eq(0).hasClass('equipment') )
			_frame.infos.dom.main.attr('data-infostype', 'equipment')
		else if( _frame.infos.dom.main.children().eq(0).hasClass('fleet') )
			_frame.infos.dom.main.attr('data-infostype', 'fleet')
		else if( _frame.infos.dom.main.children().eq(0).hasClass('entity') )
			_frame.infos.dom.main.attr('data-infostype', 'entity')
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
					el.attr('data-infos-nohistory')
				)

				if( e.target.tagName.toLowerCase() == 'a' )
					e.preventDefault()
			}
		})

	_frame.infos.is_init = true
	return true
}














// 特殊内容

	// 舰娘信息
		_frame.infos.__ship = function( id ){
			var d = _g.data.ships[ id ]

			_g.log(d)

			function _val( val, show_zero ){
				if( !show_zero && (val == 0 || val == '0') )
					return '<small class="zero">-</small>'
				if( val == -1 || val == '-1' )
					return '<small class="zero">?</small>'
				return val
			}
			function _add_stat( name, title, tar ){
				let val99, val150

				switch( name ){
					case 'hp':
						val99 = _val( d.getAttribute('hp', 99) )
						val150 = _val( d.getAttribute('hp', 150) )
						break;
					case 'asw':
						val99 = _val( d.getAttribute('asw', 99), /^(5|8|9|12|24)$/.test(d['type']) )
						val150 = _val( d.getAttribute('asw', 150), /^(5|8|9|12|24)$/.test(d['type']) )
						break;
					case 'evasion':
					case 'los':
						val99 = _val( d.getAttribute(name, 99) )
						val150 = _val( d.getAttribute(name, 150) )
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
						val99 = d.getAttribute(name, 99)
						val150 = d.getAttribute(name, 150)
						break;
					default:
						val99 = _val( d.getAttribute(name, 99) )
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

			var dom = $('<div class="infos-ship"/>')
				,ship_name = d.getName(_g.joint) || '舰娘'
				,illustrations = []
				,has_no = d['no'] && parseInt(d['no']) < 500 ? true : false

			// 名称 & 舰种 & 舰级
				$('<div class="title"/>')
					.html(
						'<h2 data-content="' + ship_name + '">' + ship_name + '</h2>'
						+ '<small>'
							+ '<span data-tip="' + (has_no ? '图鉴编号' : '无图鉴编号') + '">No.'
								+ ( has_no
									? d['no']
									: '-'
								)
							+ '</span>'
							+ ( d['class'] ? _g['data']['ship_classes'][d['class']]['name_zh'] + '级' : '' )
							+ ( d['class_no'] ? '<em>' + d['class_no'] + '</em>号舰' : '' )
							+ ( d['type'] ? ' / ' + _g['data']['ship_types'][d['type']]['full_zh'] : '' )
						+ '</small>'
					).appendTo(dom)

			// 属性
				//var lvlRadio99_id = '_input_g' + parseInt(_g.inputIndex)
				//	,lvlRadio150_id = '_input_g' + (parseInt(_g.inputIndex) + 1)
				var lvlRadio99_id = id + '_stat_lv_99'
					,lvlRadio150_id = id + '_stat_lv_150'
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
									$('<input type="radio" name="ship_infos_lvl_'+id+'" id="'+lvlRadio99_id+'" value="99"/>')
										.prop('checked', curLvl == 99)
										.on('change', function(){
											_config.set('ship_infos_lvl', $(this).val())
										})
								)
								.prepend(
									$('<input type="radio" name="ship_infos_lvl_'+id+'" id="'+lvlRadio150_id+'" value="150"/>')
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
					var equip = $('<a/>').appendTo(equips)
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
											+ item_data.getIconId()
											+ '.png'
						equip.attr({
							'data-equipmentid': 	d['equip'][i],
							'data-tip-position': 	'left',
							'data-infos': 			'[[EQUIPMENT::'+d['equip'][i]+']]',
							'data-tip':				'[[EQUIPMENT::'+d['equip'][i]+']]',
							'href':					'?infos=equipment&id=' + d['equip'][i]
						})
						name.html(
							item_data.getName(true)
						)
						slot.html( d['slot'][i] )
						icon.css(
							'background-image',
							'url(' + item_icon + ')'
						)
					}
					i++
				}

			// 近代化改修（合成）
				var modernization = $('<div class="modernization"/>').html('<h4 data-content="合成">合成</h4>').appendTo(equips)
					,stats = $('<div class="stats"/>').appendTo(modernization)
					,has_modernization = false
				if( d['modernization'] )
					d['modernization'].forEach(function(currentValue, i){
						if( currentValue ){
							has_modernization = true
							var stat
							switch(i){
								case 0: stat = 'fire'; break;
								case 1: stat = 'torpedo'; break;
								case 2: stat = 'aa'; break;
								case 3: stat = 'armor'; break;
							}
							$('<span class="stat-' + stat + '"/>').html('+' + currentValue).appendTo(stats)
						}
					})
				// まるゆ
					if( d['id'] == 163 )
						$('<span class="stat-luck"/>').html('+1.2').appendTo(stats)
					if( d['id'] == 402 )
						$('<span class="stat-luck"/>').html('+1.6').appendTo(stats)
				if( !has_modernization )
					modernization.addClass('no').append($('<em/>').html('-'))
			
			// 可额外装备
				if( d['additional_item_types'] && d['additional_item_types'].length ){
					var additional_equipment_types = $('<div class="add_equip"/>').appendTo(dom)
						,_additional_equipment_types = $('<div/>').html('<h4 data-content="特有装备类型">特有装备类型</h4>').appendTo(additional_equipment_types)
					d['additional_item_types'].forEach(function(currentValue){
						let _d = _g['data']['item_types'][currentValue]
						_additional_equipment_types.append(
							$('<span/>')
								.html(_d['name'][_g.lang])
								.css({
									'background-image': 'url(assets/images/itemicon/'
											+ _d['icon']
											+ '.png'+')'
								})
						)
					})
				}

			// 声优 & 画师 & 消耗
				let cvId = d.getRel('cv')
					,illustratorId = d.getRel('illustrator')
					,cvLink = $('<a/>',{
							'class':		'entity'
						})
						.html(
							'<strong>声优</strong>'
							+ '<span>' + ( d._cv || '?' ) + '</span>'
						)
						.appendTo(dom)
					,illustratorLink = $('<a/>',{
							'class':		'entity'
						})
						.html(
							'<strong>画师</strong>'
							+ '<span>' + ( d._illustrator || '?' ) + '</span>'
						)
						.appendTo(dom)
				if( cvId )
					cvLink.attr({
						'href':			'?infos=entity&id=' + cvId,
						'data-infos':	'[[ENTITY::' + cvId + ']]'
					})
				if( illustratorId )
					illustratorLink.attr({
						'href':			'?infos=entity&id=' + illustratorId,
						'data-infos':	'[[ENTITY::' + illustratorId + ']]'
					})
					/*
				var consum = $('<span class="consum"/>').html('<strong>消耗</strong>').appendTo(dom)
				_add_stat( 'fuel', 		'', _val( d['consum']['fuel'] ),		consum )
				_add_stat( 'ammo', 		'', _val( d['consum']['ammo'] ),		consum )
				*/

			// 图鉴
				// illustrations
				var illusts = $('<aside class="illustrations"/>').appendTo(dom)
					,illusts_container = $('<div/>').appendTo(illusts)

			// 改造信息
				//var remodels = $('<div class="remodels"/>').html('<h4 data-content="改造">改造</h4>').appendTo(dom)
				let remodels = $('<div class="remodels"/>').html('<h4 data-content="改造">改造</h4>').insertBefore(illusts)
					,remodels_container = _p.el.flexgrid.create().appendTo( remodels )
					,seriesData = d.getSeriesData()
				if( seriesData ){
					seriesData.forEach(function(currentValue, i){
						let remodel_ship_data = _g.data.ships[currentValue['id']]
							,remodel_ship_name = remodel_ship_data.getName(_g.joint)
							,tip = '<h3 class="shipinfo">'
										+ '<strong data-content="' + remodel_ship_name + '">'
											+ remodel_ship_name
										+ '</strong>'
										+ (
											remodel_ship_data['type'] ?
												'<small>' + _g['data']['ship_types'][remodel_ship_data['type']]['full_zh'] + '</small>'
												: ''
										)
									+ '</h3>'
							,data_prev = i ? seriesData[ i - 1 ] : null
							,remodel_lvl = data_prev ? data_prev['next_lvl'] : null
							,remodel_blueprint = data_prev ? (data_prev['next_blueprint']) : null
							,remodel_catapult = data_prev ? (data_prev['next_catapult']) : null
						
						if( remodel_blueprint || remodel_catapult ){
							if( remodel_blueprint )
								tip+= '<span class="requirement is-blueprint">需要：改装设计图</span>'
							if( remodel_catapult )
								tip+= '<span class="requirement is-catapult">需要：试制甲板弹射器</span>'
						}

						remodels_container.appendDOM(
							$('<a/>',{
									'class':		'unit',
									'href':			'?infos=ship&id=' + currentValue['id'],
									'data-shipid':	currentValue['id'],
									'data-infos': 	'[[SHIP::'+ currentValue['id'] +']]',
									'data-tip': 	tip,
									'data-infos-nohistory': true
								})
								.addClass(currentValue['id'] == d['id'] ? 'on' : '')
								.addClass(remodel_blueprint ? 'mod-blueprint' : '')
								.addClass(remodel_catapult ? 'mod-catapult' : '')
								.html(
									'<i><img src="' + _g.path.pics.ships + '/' + currentValue['id']+'/0.webp"/></i>'
									+ (remodel_lvl ? '<strong>' + remodel_lvl + '</strong>' : '')
								)
						)
						
						if( currentValue.next_loop )
							remodels_container.appendDOM(
								$('<span class="unit" icon="loop-alt3" data-tip="可在两个改造版本间切换"/>').html(' ')
							)

						// 处理图鉴信息
							if( currentValue['id'] == d['id'] ){
								if( currentValue.illust_delete ){
									if( data_prev ){
										illustrations.push( data_prev['id'] )
										if( data_prev.illust_extra && data_prev.illust_extra.length && data_prev.illust_extra[0] ){
											data_prev.illust_extra.forEach(function(cur){
												illustrations.push( 'extra_' + cur )
											})
										}
									}
								}else{
									illustrations.push( currentValue['id'] )
									if( currentValue.illust_extra && currentValue.illust_extra.length && currentValue.illust_extra[0] ){
										currentValue.illust_extra.forEach(function(cur){
											illustrations.push( 'extra_' + cur )
										})
									}
								}
							}
					})
					
					let index = 0
					function check_append( file ){
						//file = file.replace(/\\/g, '/')
						try{
							let stat = node.fs.lstatSync(file)
							if( stat && stat.isFile() ){
								index++
								$('<input type="radio" name="ship_'+d['id']+'_illustrations" value="'+index+'"/>')
									.prop('checked', (index == 1))
									.insertBefore(illusts_container)
								$('<span class="container"/>')
									.html('<img src="'+file+'" data-filename="'+ship_name+' - '+index+'.webp"/>')
									//.css('background-image', 'url(' + file + ')')
									.appendTo(illusts_container)
							}
						}catch(e){}
					}
					illustrations.forEach(function(currentValue){
						check_append( node.path.normalize(_g.path.pics.ships) + currentValue + '/8.webp' )
						check_append( node.path.normalize(_g.path.pics.ships) + currentValue + '/9.webp' )
					})
					/*
					_db.ship_series.find({'id': d['series']}, function(err,docs){
						console.log(docs, d.getSeriesData())
						if( !err && docs && docs.length ){
							// 遍历 docs[0].ships
								for(var i in docs[0].ships){
									var _i = parseInt(i)
										,remodel_ship_data = _g.data.ships[docs[0].ships[i]['id']]
										,remodel_ship_name = remodel_ship_data.getName(_g.joint)
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
										$('<button class="unit" data-shipid="'+ docs[0].ships[i]['id'] +'"/>')
											.attr({
												'data-infos': 	'[[SHIP::'+ docs[0].ships[i]['id'] +']]',
												'data-tip': 	tip,
												'data-infos-nohistory': true
											})
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
												.html('<img src="'+file+'" data-filename="'+ship_name+' - '+index+'.webp"/>')
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
					})*/
				}

			return dom
		}
