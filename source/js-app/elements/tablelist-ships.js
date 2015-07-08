// Ships
_tablelist.prototype._ships_columns = [
	'  ',
	['火力',	'fire'],
	['雷装',	'torpedo'],
	['夜战',	'nightpower'],
	['对空',	'aa'],
	['对潜',	'asw'],
	['耐久',	'hp'],
	['装甲',	'armor'],
	['回避',	'evasion'],
	['搭载',	'carry'],
	['航速',	'speed'],
	['射程',	'range'],
	['索敌',	'los'],
	['运',		'luck'],
	['油耗',	'consum_fuel'],
	['弹耗',	'consum_ammo']
]
_tablelist.prototype._ships_header_checkbox = []
_tablelist.prototype._ships_checkbox = []
_tablelist.prototype._ships_last_item = null
_tablelist.prototype._ships_append_item = function( ship_data, header_index ){
	var self = this
		//,tr = $('<tr class="row" data-shipid="'+ ship_data['id'] +'" data-header="'+ header_index +'" modal="true"/>')
		//,tr = $('<tr class="row" data-shipid="'+ ship_data['id'] +'" data-header="'+ header_index +'" data-infos="__ship__"/>')
		,donotcompare = _g.data.ship_types[ship_data['type']]['donotcompare'] ? true : false
		,tr = $('<tr class="row" data-shipid="'+ ship_data['id'] +'" data-header="'+ header_index +'" data-trindex="'+self.trIndex+'"/>')
				.attr({
					'data-infos': 	'[[SHIP::'+ship_data['id']+']]',
					'data-shipedit':self.dom.container.hasClass('shiplist-edit') ? 'true' : null,
					'data-donotcompare': donotcompare ? true : null
				})
				//.appendTo( this.dom.tbody )
				.insertAfter( self._ships_last_item )
		,max_carry = 0
		,name = ship_data['name'][_g.lang]
				+ (ship_data['name']['suffix']
					? '<small>' + _g.data.ship_namesuffix[ship_data['name']['suffix']][_g.lang] + '</small>'
					: '')
		,checkbox = $('<input type="checkbox" class="compare"/>')
						.prop('disabled', donotcompare)
						.on('click, change',function(e, not_trigger_check){
							if( $(this).prop('checked') )
								tr.attr('compare-checked', true )
							else
								tr.removeAttr('compare-checked')
							self._ships_compare_btn_show( $(this).prop('checked') )
							if( !not_trigger_check )
								self._ships_header_checkbox[header_index].trigger('docheck')
						})

	self._ships_last_item = tr
	self.trIndex++

	self._ships_header_checkbox[header_index].data(
			'ships',
			self._ships_header_checkbox[header_index].data('ships').add( tr )
		)
	tr.data('checkbox', checkbox)
	
	self._ships_checkbox[ship_data['id']] = checkbox

	for( var i in ship_data['carry'] ){
		max_carry+= ship_data['carry'][i]
	}

	function _val( val, show_zero ){
		if( !show_zero && (val == 0 || val == '0') )
			return '<small class="zero">-</small>'
		if( val == -1 || val == '-1' )
			return '<small class="zero">?</small>'
		return val
	}

	for( var i in self._ships_columns ){
		switch( self._ships_columns[i][1] ){
			case ' ':
				$('<th/>')
					.html(
						//'<img src="../pics/ships/'+ship_data['id']+'/0.jpg"/>'
						'<img src="' + _g.path.pics.ships + '/' + ship_data['id']+'/0.webp" contextmenu="disabled"/>'
						+ '<strong>' + name + '</strong>'
						+ '<em></em>'
						//+ '<small>' + ship_data['pron'] + '</small>'
					)
					.prepend(
						checkbox
					)
					.appendTo(tr)
				break;
			case 'nightpower':
				// 航母没有夜战火力
				var datavalue = /^(9|10|11)$/.test( ship_data['type'] )
								? 0
								: (parseInt(ship_data['stat']['fire_max'] || 0)
									+ parseInt(ship_data['stat']['torpedo_max'] || 0) )
				$('<td data-stat="nightpower"/>')
					.attr(
						'data-value',
						datavalue == -1 || datavalue == '-1'
							? null
							: datavalue
					)
					.html( _val( datavalue ) )
					.appendTo(tr)
				break;
			case 'asw':
				$('<td data-stat="asw" />')
					.attr(
						'data-value',
						ship_data['stat']['asw_max'] == -1 || ship_data['stat']['asw_max'] == '-1'
							? null
							: ship_data['stat']['asw_max']
					)
					.html( _val(
						ship_data['stat']['asw_max'],
						/^(5|8|9|12|24)$/.test( ship_data['type'] )
					) )
					.appendTo(tr)
				break;
			case 'hp':
				$('<td data-stat="hp" data-value="' + ship_data['stat']['hp'] + '"/>')
					.html(_val( ship_data['stat']['hp'] ))
					.appendTo(tr)
				break;
			case 'carry':
				$('<td data-stat="carry" data-value="' + ship_data['stat']['carry'] + '"/>')
					.html(_val( ship_data['stat']['carry'] ))
					.appendTo(tr)
				break;
			case 'speed':
				$('<td data-stat="speed" data-value="' + ship_data['stat']['speed'] + '"/>')
					.html( _g.getStatSpeed( ship_data['stat']['speed'] ) )
					.appendTo(tr)
				break;
			case 'range':
				$('<td data-stat="range" data-value="' + ship_data['stat']['range'] + '"/>')
					.html( _g.getStatRange( ship_data['stat']['range'] ) )
					.appendTo(tr)
				break;
			case 'luck':
				$('<td data-stat="luck" data-value="' + ship_data['stat']['luck'] + '"/>')
					.html(ship_data['stat']['luck'] + '<sup>' + ship_data['stat']['luck_max'] + '</sup>')
					.appendTo(tr)
				break;
			case 'consum_fuel':
				$('<td data-stat="consum_fuel"/>')
					.attr(
						'data-value',
						ship_data['consum']['fuel'] == -1 || ship_data['consum']['fuel'] == '-1'
							? null
							: ship_data['consum']['fuel']
					)
					.html( _val(ship_data['consum']['fuel']) )
					.appendTo(tr)
				break;
			case 'consum_ammo':
				$('<td data-stat="consum_ammo"/>')
					.attr(
						'data-value',
						ship_data['consum']['ammo'] == -1 || ship_data['consum']['ammo'] == '-1'
							? null
							: ship_data['consum']['ammo']
					)
					.html( _val(ship_data['consum']['ammo']) )
					.appendTo(tr)
				break;
			default:
				var datavalue = ship_data['stat'][self._ships_columns[i][1] + '_max']
				$('<td data-stat="'+self._ships_columns[i][1]+'"/>')
					.attr(
						'data-value',
						datavalue == -1 || datavalue == '-1'
							? -1
							: datavalue
					)
					.html( _val( datavalue ) )
					.appendTo(tr)
				break;
		}
	}

	// 检查数据是否存在 remodel_next
	// 如果 remodel_next 与当前数据 type & name 相同，标记当前为可改造前版本
	if( ship_data.remodel_next
		&& _g.data.ships[ ship_data.remodel_next ]
		&& _g.ship_type_order_map[ship_data['type']] == _g.ship_type_order_map[_g.data.ships[ ship_data.remodel_next ]['type']]
		&& ship_data['name']['ja_jp'] == _g.data.ships[ ship_data.remodel_next ]['name']['ja_jp']
	){
		tr.addClass('premodeled')
	}

	return tr
}
_tablelist.prototype._ships_append_all_items = function(){
	var self = this
	function _do( i, j ){
		if( _g.data.ship_id_by_type[i] ){
			if( !j ){
				if( typeof _g.ship_type_order[i] == 'object' ){
					var data_shiptype = _g.data.ship_types[ _g.ship_type_order[i][0] ]
				}else{
					var data_shiptype = _g.data.ship_types[ _g.ship_type_order[i] ]
				}

				var checkbox_id = '_input_g' + parseInt(_g.inputIndex)
				self._ships_last_item =
						$('<tr class="typetitle" data-trindex="'+self.trIndex+'">'
							+ '<th colspan="' + (self._ships_columns.length + 1) + '">'
							+ '<label for="' + checkbox_id + '">'
							//+ data_shiptype['full_zh']
							//+ _g.data['ship_type_order'][i+1]['name']['zh_cn']
							+ _g.data['ship_type_order'][i]['name']['zh_cn']
							//+ ( _g.data['ship_type_order'][i+1]['name']['zh_cn'] == data_shiptype['full_zh']
							+ ( _g.data['ship_type_order'][i]['name']['zh_cn'] == data_shiptype['full_zh']
								? ('<small>[' + data_shiptype['code'] + ']</small>')
								: ''
							)
							+ '</label></th></tr>')
							.appendTo( self.dom.tbody )
				self.trIndex++

				// 创建空DOM，欺骗flexbox layout排版
					var k = 0
					while(k < self.flexgrid_empty_count){
						var _index = self.trIndex + _g.data.ship_id_by_type[i].length + k
						$('<tr class="empty" data-trindex="'+_index+'" data-shipid/>').appendTo(self.dom.tbody)
						k++
					}

				self._ships_header_checkbox[i]
					= $('<input type="checkbox" id="' + checkbox_id + '"/>')
						//.prop('disabled', _g.data['ship_type_order'][i+1]['donotcompare'] ? true : false)
						.prop('disabled', _g.data['ship_type_order'][i]['donotcompare'] ? true : false)
						.on({
							'change': function(){
								var _checkbox = $(this)
								_checkbox.data('ships').filter(':visible').each(function(){
									$(this).data('checkbox').prop('checked', _checkbox.prop('checked')).trigger('change', [true])
								})
							},
							'docheck': function(){
								// ATTR: compare-checked
								var trs = $(this).data('ships').filter(':visible')
									,checked = trs.filter('[compare-checked=true]')
								if( !checked.length ){
									$(this).prop({
										'checked': 			false,
										'indeterminate': 	false
									})
								}else if( checked.length < trs.length ){
									$(this).prop({
										'checked': 			false,
										'indeterminate': 	true
									})
								}else{
									$(this).prop({
										'checked': 			true,
										'indeterminate': 	false
									})
								}
							}
						})
						.data('ships', $())
						.prependTo( self._ships_last_item.find('th') )

				_g.inputIndex++
			}

			self._ships_append_item( _g.data.ships[ _g.data.ship_id_by_type[i][j] ], i )

			setTimeout(function(){
				if( j >= _g.data.ship_id_by_type[i].length - 1 ){
					self.trIndex+= self.flexgrid_empty_count
					_do( i+1, 0 )
				}else{
					_do( i, j+1 )
				}
			}, 0)
		}else{
			self.mark_high()
			self.thead_redraw()
			_frame.app_main.loaded('tablelist_'+self._index, true)
			//_g.log( self._ships_last_item )
			delete( self._ships_last_item )
			//_g.log( self._ships_last_item )
		}
	}
	_do( 0, 0 )
}
_tablelist.prototype._ships_compare_btn_show = function( is_checked ){
	if( (!is_checked && this.dom.tbody.find('input[type="checkbox"].compare:checked').length)
		|| is_checked
	){
		this.dom.msg_container.attr('data-msgs', 'comparestart')
	}else{
		this.dom.msg_container.removeAttr('data-msgs')
	}
}
_tablelist.prototype._ships_compare_start = function(){
	// 隐藏底部提示信息
		this.dom.msg_container.removeAttr('data-msgs')

	// 存储当前状态
		this._ships_last_viewtype = this.dom.filter_container.attr('viewtype')
		_config.set( 'shiplist-viewtype', this._ships_last_viewtype )
		this._ships_last_scrollTop = this.dom.table_container_inner.scrollTop()

	// 更改视图
		this.dom.filter_container.attr('viewtype', 'compare')
		this.dom.table_container_inner.scrollTop( 0 )
		this.dom.table.addClass('sortable')

	// 计算数据排序排序
		this.mark_high( true )
		this.thead_redraw( 500 )
}
_tablelist.prototype._ships_compare_off = function(){
	this.dom.filter_container.attr('viewtype', this._ships_last_viewtype)
	this.sort_table_restore()
	this.mark_high()
	this.thead_redraw( 500 )
	this.dom.table_container_inner.scrollTop( this._ships_last_scrollTop )
	this.dom.table.removeClass('sortable')
	delete this._ships_last_viewtype
	delete this._ships_last_scrollTop
}
_tablelist.prototype._ships_compare_end = function(){
	this.dom.tbody.find('input[type="checkbox"].compare:checked').prop('checked', false).trigger('change')
	this.dom.msg_container.removeAttr('data-msgs')
	this._ships_compare_off()
}
_tablelist.prototype._ships_compare_continue = function(){
	this.dom.msg_container.attr('data-msgs', 'comparestart')
	this._ships_compare_off()
}

_tablelist.prototype._ships_contextmenu_show = function($el, shipId){
	this._ships_contextmenu_curid = shipId || $el.data('shipid')

	let self = this
		,items = [
				$('<menuitem/>').html('查看资料')
					.on({
						'click': function(e){
							if( _frame.app_main.is_mode_selection() )
								_frame.app_main.mode_selection_callback(self._ships_contextmenu_curid)
							else
								$el.trigger('click')
						},
						'show': function(){
							if( _frame.app_main.is_mode_selection() )
								$(this).html('选择')
							else
								$(this).html('查看资料')
						}
					}),
				$('<menuitem/>').html('将该舰娘加入对比')
					.on({
						'click': function(e){
							self._ships_checkbox[self._ships_contextmenu_curid]
								.prop('checked', !self._ships_checkbox[self._ships_contextmenu_curid].prop('checked'))
								.trigger('change')
						},
						'show': function(e){
							if( !self._ships_contextmenu_curid )
								return false
								
							if( self._ships_checkbox[self._ships_contextmenu_curid].prop('checked') )
								$(this).html('取消对比')
							else
								$(this).html('将该舰娘加入对比')
						}
					}),
				
				$('<div/>').on('show', function(){
					var $div = $(this).empty()
					if( self._ships_contextmenu_curid ){
						var series = _g['data']['ships'][self._ships_contextmenu_curid].getSeriesData() || []
						for(let i in series){
							if( i == '0' )
								$div.append($('<hr/>'))
							$div.append(
								$('<div class="item"/>')
									.html('<span>' + _g['data']['ships'][series[i]['id']].getName(true) + '</span>')
									.append(
										$('<div class="group"/>')
											.append(
												$('<menuitem data-infos="[[SHIP::'+series[i]['id']+']]"/>')
													.html(
														_frame.app_main.is_mode_selection()
															? '选择'
															: '查看资料'
													)
													.on({
														'click': function(e){
															if( _frame.app_main.is_mode_selection() ){
																_frame.app_main.mode_selection_callback(series[i]['id'])
																e.preventDefault()
															}
														}
													})
											)
											.append(
												$('<menuitem/>')
													.html(
														self._ships_checkbox[series[i]['id']].prop('checked')
															? '取消对比'
															: '加入对比'
													)
													.on({
														'click': function(e){
															self._ships_checkbox[series[i]['id']]
																.prop('checked', !self._ships_checkbox[series[i]['id']].prop('checked'))
																.trigger('change')
														}
													})
											)
									)
							)
						}
					}
				})
			]

	if( !self._ships_contextmenu )
		self._ships_contextmenu = new _menu({
			'items': items
		})
							
	if( self.dom.filter_container.attr('viewtype') != 'compare' )
		self._ships_contextmenu.show($el)
}




_tablelist.prototype._ships_init = function(){
	var self = this
		this.trIndex = 0

	// 标记全局载入状态
		_frame.app_main.loading.push('tablelist_'+this._index)
		_frame.app_main.is_loaded = false

		//_g.log( 'shiplist init', _frame.app_main.loading )

	// 生成过滤器与选项
		this.dom.filter_container = $('<div class="options"/>').appendTo( this.dom.container )
		this.dom.filters = $('<div class="filters"/>').appendTo( this.dom.filter_container )
		this.dom.exit_compare = $('<div class="exit_compare"/>')
								.append(
									$('<button icon="arrow-set2-left"/>')
										.html('结束对比')
										.on('click', function(){
											self._ships_compare_end()
										})
								)
								.append(
									$('<button icon="checkbox-checked"/>')
										.html('继续选择')
										.on('click', function(){
											self._ships_compare_continue()
										})
								)
								.appendTo( this.dom.filter_container )
		this.dom.btn_compare_sort = $('<button icon="sort-amount-desc" class="disabled"/>')
											.html('点击表格标题可排序')
											.on('click', function(){
												if( !self.dom.btn_compare_sort.hasClass('disabled') )
													self.sort_table_restore()
											}).appendTo( this.dom.exit_compare )

	// 初始化设置
		this.append_option( 'checkbox', 'hide-premodel', '仅显示同种同名舰最终版本',
			_config.get( 'shiplist-filter-hide-premodel' ) === 'false' ? null : true, null, {
				'onchange': function( e, input ){
					_config.set( 'shiplist-filter-hide-premodel', input.prop('checked') )
					self.dom.filter_container.attr('filter-hide-premodel', input.prop('checked'))
					self.thead_redraw()
				}
			} )
		this.append_option( 'radio', 'viewtype', null, [
				['card', ''],
				['list', '']
			], null, {
				'radio_default': _config.get( 'shiplist-viewtype' ),
				'onchange': function( e, input ){
					if( input.is(':checked') ){
						_config.set( 'shiplist-viewtype', input.val() )
						self.dom.filter_container.attr('viewtype', input.val())
						self.thead_redraw()
					}
				}
			} )
		this.dom.filters.find('input').trigger('change')

	// 生成表格框架
		this.dom.table_container = $('<div class="fixed-table-container"/>').appendTo( this.dom.container )
		this.dom.table_container_inner = $('<div class="fixed-table-container-inner"/>').appendTo( this.dom.table_container )
		this.dom.table = $('<table class="ships hashover hashover-column"/>').appendTo( this.dom.table_container_inner )
		function gen_thead(arr){
			self.dom.thead = $('<thead/>')
			var tr = $('<tr/>').appendTo(self.dom.thead)
			for(var i in arr){
				(function( obj ){
					if( typeof obj == 'object' ){
						var td = $('<td data-stat="' + obj[1] + '"/>')
									.html('<div class="th-inner-wrapper"><span><span>'+obj[0]+'</span></span></div>')
									.on('click', function(){
										self.sort_table_from_theadcell(td)
									})
									.appendTo(tr)
					}else{
						$('<th/>').html('<div class="th-inner-wrapper"><span><span>'+obj[0]+'</span></span></div>').appendTo(tr)
					}
				})(arr[i])
			}
			return self.dom.thead
		}
		gen_thead( self._ships_columns ).appendTo( this.dom.table )
		this.dom.tbody = $('<tbody/>').appendTo( this.dom.table )
	
	// 右键菜单事件
		this.dom.table.on('contextmenu.contextmenu_ship', 'tr[data-shipid]', function(e){
			self._ships_contextmenu_show($(this))
		}).on('click.contextmenu_ship', 'tr[data-shipid]>th>em', function(e){
			self._ships_contextmenu_show($(this).parent().parent())
			e.stopImmediatePropagation()
			e.stopPropagation()
		})

	// 获取所有舰娘数据，按舰种顺序 (_g.ship_type_order / _g.ship_type_order_map) 排序
	// -> 获取舰种名称
	// -> 生成舰娘DOM
		if( _g.data.ship_types ){
			self._ships_append_all_items()
		}else{
			$('<p/>').html('暂无数据...').appendTo( self.dom.table_container_inner )
		}
		//_db.ships.find({}).sort({'type': 1, 'class': 1, 'class_no': 1, 'time_created': 1, 'name.suffix': 1}).exec(function(err, docs){
		//	if( !err ){
		//		for(var i in docs){
		//			_g.data.ships[docs[i]['id']] = docs[i]

		//			if( typeof _g.data.ship_id_by_type[ _g.ship_type_order_map[docs[i]['type']] ] == 'undefined' )
		//				_g.data.ship_id_by_type[ _g.ship_type_order_map[docs[i]['type']] ] = []
		//			_g.data.ship_id_by_type[ _g.ship_type_order_map[docs[i]['type']] ].push( docs[i]['id'] )
		//		}
		//	}

			/*
			_db.ship_types.find({}, function(err2, docs2){
				if( !err2 ){
					for(var i in docs2 ){
						_g.data.ship_types[docs2[i]['id']] = docs2[i]
					}

				}
			})
			*/
		//	if( _g.data.ship_types ){
		//		self._ships_append_all_items()
		//	}else{
		//		$('<p/>').html('暂无数据...').appendTo( self.dom.table_container_inner )
		//	}
		//})

	// 生成底部内容框架
		this.dom.msg_container = $('<div class="msgs"/>').appendTo( this.dom.container )
		if( !_config.get( 'hide-compareinfos' ) )
			this.dom.msg_container.attr( 'data-msgs', 'compareinfos' )

	// 生成部分底部内容
		var compareinfos = $('<div class="compareinfos"/>').html('点击舰娘查询详细信息，勾选舰娘进行对比').appendTo( this.dom.msg_container )
			$('<button/>').html('&times;').on('click', function(){
				self.dom.msg_container.removeAttr('data-msgs')
				_config.set( 'hide-compareinfos', true )
			}).appendTo( compareinfos )
		var comparestart = $('<div class="comparestart"/>').html('开始对比')
							.on('click', function(){
								self._ships_compare_start()
							}).appendTo( this.dom.msg_container )
}