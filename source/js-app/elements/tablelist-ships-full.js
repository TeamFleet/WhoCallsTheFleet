TablelistShips.prototype.append_item = function( ship_data, header_index ){
		//,tr = $('<tr class="row" data-shipid="'+ ship_data['id'] +'" data-header="'+ header_index +'" modal="true"/>')
		//,tr = $('<tr class="row" data-shipid="'+ ship_data['id'] +'" data-header="'+ header_index +'" data-infos="__ship__"/>')
	let donotcompare = _g.data.ship_types[ship_data['type']]['donotcompare'] ? true : false
		,tr = $('<tr/>',{
					'class':		'row',
					'data-shipid':	ship_data['id'],
					'data-header':	header_index,
					'data-trindex': this.trIndex,
					'data-infos': 	'[[SHIP::'+ship_data['id']+']]',
					'data-shipedit':this.dom.container.hasClass('shiplist-edit') ? 'true' : null,
					'data-donotcompare': donotcompare ? true : null
				})
				.on('click', function(e, forceInfos){
					if( !forceInfos && e.target.tagName.toLowerCase() != 'em' && _frame.app_main.is_mode_selection() ){
						e.preventDefault()
						e.stopImmediatePropagation()
						e.stopPropagation()
						if(!donotcompare)
							_frame.app_main.mode_selection_callback(ship_data['id'])
					}
				})
				//.appendTo( this.dom.tbody )
				.insertAfter( this.last_item )
		,name = ship_data['name'][_g.lang]
				+ (ship_data['name']['suffix']
					? '<small>' + _g.data.ship_namesuffix[ship_data['name']['suffix']][_g.lang] + '</small>'
					: '')
		,checkbox = $('<input type="checkbox" class="compare"/>')
						.prop('disabled', donotcompare)
						.on('click, change',function(e, not_trigger_check){
							if( checkbox.prop('checked') )
								tr.attr('compare-checked', true )
							else
								tr.removeAttr('compare-checked')
							this.compare_btn_show( checkbox.prop('checked') )
							if( !not_trigger_check )
								this.header_checkbox[header_index].trigger('docheck')
						}.bind(this))
		,has_extra_illust = false
		,seriesData = ship_data.getSeriesData()
	
	seriesData.forEach(function(data_cur, i){
		let data_prev = i ? seriesData[ i - 1 ] : null
		
		has_extra_illust = data_cur.illust_extra && data_cur.illust_extra.length && data_cur.illust_extra[0] ? true : false
		
		if( !has_extra_illust && data_cur.illust_delete && data_prev )
			has_extra_illust = data_prev.illust_extra && data_prev.illust_extra.length && data_prev.illust_extra[0] ? true : false
	})

	this.last_item = tr
	this.trIndex++

	this.header_checkbox[header_index].data(
			'ships',
			this.header_checkbox[header_index].data('ships').add( tr )
		)
	tr.data('checkbox', checkbox)
	
	this.checkbox[ship_data['id']] = checkbox

	function _val( val, show_zero ){
		if( !show_zero && (val == 0 || val == '0') )
			return '<small class="zero">-</small>'
		if( val == -1 || val == '-1' )
			return '<small class="zero">?</small>'
		return val
	}

	this.columns.forEach(function(currentValue, i){
		switch( currentValue[1] ){
			case ' ':
				$('<th/>')
					.html(
						//'<img src="../pics/ships/'+ship_data['id']+'/0.jpg"/>'
						//'<img src="' + _g.path.pics.ships + '/' + ship_data['id']+'/0.webp" contextmenu="disabled"/>'
						'<a href="?infos=ship&id='+ship_data['id']+'"'
							+ (has_extra_illust ? ' icon="hanger"' : '')
						+ '>'
						+ '<img src="../pics/ships/'+ship_data['id']+'/0.webp" contextmenu="disabled"/>'
						+ '<strong>' + name + '</strong>'
						+ '</a>'
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
									+ parseInt(ship_data['stat']['torpedo_max'] || 0)
								)
				$('<td data-stat="nightpower"/>')
					.attr(
						'data-value',
						datavalue
					)
					.html( _val( datavalue ) )
					.appendTo(tr)
				break;
			case 'asw':
				$('<td data-stat="asw" />')
					.attr(
						'data-value',
						ship_data['stat']['asw_max']
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
						ship_data['consum']['fuel']
					)
					.html( _val(ship_data['consum']['fuel']) )
					.appendTo(tr)
				break;
			case 'consum_ammo':
				$('<td data-stat="consum_ammo"/>')
					.attr(
						'data-value',
						ship_data['consum']['ammo']
					)
					.html( _val(ship_data['consum']['ammo']) )
					.appendTo(tr)
				break;
			case 'extra_illust':
				$('<td data-stat="'+currentValue[1]+'" data-value="' + (has_extra_illust ? '1' : '0') + '"/>')
					.html(
						has_extra_illust
							? '✓'
							: '<small class="zero">-</small>'
					)
					.appendTo(tr)
				break;
			default:
				$('<td data-stat="'+currentValue[1]+'"/>')
					.attr(
						'data-value',
						ship_data['stat'][currentValue[1] + '_max']
					)
					.html( _val( ship_data['stat'][currentValue[1] + '_max'] ) )
					.appendTo(tr)
				break;
		}
	})

	// 检查数据是否存在 remodel.next
	// 如果 remodel.next 与当前数据 type & name 相同，标记当前为可改造前版本
	if( ship_data.remodel && ship_data.remodel.next
		&& _g.data.ships[ ship_data.remodel.next ]
		&& _g.ship_type_order_map[ship_data['type']] == _g.ship_type_order_map[_g.data.ships[ ship_data.remodel.next ]['type']]
		&& ship_data['name']['ja_jp'] == _g.data.ships[ ship_data.remodel.next ]['name']['ja_jp']
	){
		tr.addClass('premodeled')
	}

	return tr
}

TablelistShips.prototype.append_all_items = function(){
	function _do( i, j ){
		if( _g.data.ship_id_by_type[i] ){
			if( !j ){
				let data_shiptype
					,checkbox

				if( typeof _g.ship_type_order[i] == 'object' ){
					data_shiptype = _g.data.ship_types[ _g.ship_type_order[i][0] ]
				}else{
					data_shiptype = _g.data.ship_types[ _g.ship_type_order[i] ]
				}

				//let checkbox_id = '_input_g' + parseInt(_g.inputIndex)
				let checkbox_id = Tablelist.genId()
				
				this.last_item =
						$('<tr class="typetitle" data-trindex="'+this.trIndex+'">'
							+ '<th colspan="' + (this.columns.length + 1) + '">'
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
							.appendTo( this.dom.tbody )
				this.trIndex++

				// 创建空DOM，欺骗flexbox layout排版
					var k = 0
					while(k < this.flexgrid_empty_count){
						var _index = this.trIndex + _g.data.ship_id_by_type[i].length + k
						$('<tr class="empty" data-trindex="'+_index+'" data-shipid/>').appendTo(this.dom.tbody)
						k++
					}

				checkbox = $('<input type="checkbox" id="' + checkbox_id + '"/>')
						//.prop('disabled', _g.data['ship_type_order'][i+1]['donotcompare'] ? true : false)
						.prop('disabled', _g.data['ship_type_order'][i]['donotcompare'] ? true : false)
						.on({
							'change': function(){
								checkbox.data('ships').filter(':visible').each(function(index, element){
									$(element).data('checkbox').prop('checked', checkbox.prop('checked')).trigger('change', [true])
								})
							},
							'docheck': function(){
								// ATTR: compare-checked
								var trs = checkbox.data('ships').filter(':visible')
									,checked = trs.filter('[compare-checked=true]')
								if( !checked.length ){
									checkbox.prop({
										'checked': 			false,
										'indeterminate': 	false
									})
								}else if( checked.length < trs.length ){
									checkbox.prop({
										'checked': 			false,
										'indeterminate': 	true
									})
								}else{
									checkbox.prop({
										'checked': 			true,
										'indeterminate': 	false
									})
								}
							}
						})
						.data('ships', $())
						.prependTo( this.last_item.find('th') )

				this.header_checkbox[i] = checkbox

				//_g.inputIndex++
			}

			this.append_item( _g.data.ships[ _g.data.ship_id_by_type[i][j] ], i )

			setTimeout(function(){
				if( j >= _g.data.ship_id_by_type[i].length - 1 ){
					this.trIndex+= this.flexgrid_empty_count
					_do( i+1, 0 )
				}else{
					_do( i, j+1 )
				}
			}.bind(this), 0)
		}else{
			this.mark_high()
			this.thead_redraw()
			_frame.app_main.loaded('tablelist_'+this._index, true)
			//_g.log( this.last_item )
			delete( this.last_item )
			//_g.log( this.last_item )
		}
	}
	_do = _do.bind(this)
	_do( 0, 0 )
}
	
	
	
	
	
	
	
	
	
TablelistShips.prototype.init_new = function(){
	// 生成过滤器与选项
		this.dom.filter_container = $('<div class="options"/>').appendTo( this.dom.container )
		this.dom.filters = $('<div class="filters"/>').appendTo( this.dom.filter_container )
		this.dom.exit_compare = $('<div class="exit_compare"/>')
								.append(
									$('<button icon="arrow-set2-left"/>')
										.html('结束对比')
										.on('click', function(){
											this.compare_end()
										}.bind(this))
								)
								.append(
									$('<button icon="checkbox-checked"/>')
										.html('继续选择')
										.on('click', function(){
											this.compare_continue()
										}.bind(this))
								)
								.appendTo( this.dom.filter_container )
		this.dom.btn_compare_sort = $('<button icon="sort-amount-desc" class="disabled"/>')
											.html('点击表格标题可排序')
											.on('click', function(){
												if( !this.dom.btn_compare_sort.hasClass('disabled') )
													this.sort_table_restore()
											}.bind(this)).appendTo( this.dom.exit_compare )

	// 初始化设置
		this.append_option( 'checkbox', 'hide-premodel', '仅显示同种同名舰最终版本',
			_config.get( 'shiplist-filter-hide-premodel' ) === 'false' ? null : true, null, {
				'onchange': function( e, input ){
					_config.set( 'shiplist-filter-hide-premodel', input.prop('checked') )
					this.dom.filter_container.attr('filter-hide-premodel', input.prop('checked'))
					this.thead_redraw()
				}.bind(this)
			} )
		this.append_option( 'radio', 'viewtype', null, [
				['card', ''],
				['list', '']
			], null, {
				'radio_default': _config.get( 'shiplist-viewtype' ),
				'onchange': function( e, input ){
					if( input.is(':checked') ){
						_config.set( 'shiplist-viewtype', input.val() )
						this.dom.filter_container.attr('viewtype', input.val())
						this.thead_redraw()
					}
				}.bind(this)
			} ).attr('data-caption', '布局')
		this.dom.filters.find('input').trigger('change')

	// 生成表格框架
		this.dom.table_container = $('<div class="fixed-table-container"/>').appendTo( this.dom.container )
		this.dom.table_container_inner = $('<div class="fixed-table-container-inner"/>').appendTo( this.dom.table_container )
		this.dom.table = $('<table class="ships hashover hashover-column"/>').appendTo( this.dom.table_container_inner )
		function gen_thead(arr){
			this.dom.thead = $('<thead/>')
			var tr = $('<tr/>').appendTo(this.dom.thead)
			arr.forEach(function(currentValue, i){
				if( typeof currentValue == 'object' ){
					var td = $('<td data-stat="' + currentValue[1] + '"/>')
								.html('<div class="th-inner-wrapper"><span><span>'+currentValue[0]+'</span></span></div>')
								.on('click', function(){
									this.sort_table_from_theadcell(td)
								}.bind(this))
								.appendTo(tr)
				}else{
					$('<th/>').html('<div class="th-inner-wrapper"><span><span>'+currentValue[0]+'</span></span></div>').appendTo(tr)
				}
			}, this)
			return this.dom.thead
		}
		gen_thead = gen_thead.bind(this)
		gen_thead( this.columns ).appendTo( this.dom.table )
		this.dom.tbody = $('<tbody/>').appendTo( this.dom.table )
	
	// 右键菜单事件
		this.dom.table.on('contextmenu.contextmenu_ship', 'tr[data-shipid]', function(e){
			this.contextmenu_show($(e.currentTarget), null, e)
		}.bind(this)).on('click.contextmenu_ship', 'tr[data-shipid]>th em', function(e){
			this.contextmenu_show($(e.currentTarget).parent().parent())
			e.stopImmediatePropagation()
			e.stopPropagation()
		}.bind(this))

	// 获取所有舰娘数据，按舰种顺序 (_g.ship_type_order / _g.ship_type_order_map) 排序
	// -> 获取舰种名称
	// -> 生成舰娘DOM
		if( _g.data.ship_types ){
			this.append_all_items()
		}else{
			$('<p/>').html('暂无数据...').appendTo( this.dom.table_container_inner )
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
		//		this.append_all_items()
		//	}else{
		//		$('<p/>').html('暂无数据...').appendTo( this.dom.table_container_inner )
		//	}
		//})

	// 生成底部内容框架
		this.dom.msg_container = $('<div class="msgs"/>').appendTo( this.dom.container )
		if( !_config.get( 'hide-compareinfos' ) )
			this.dom.msg_container.attr( 'data-msgs', 'compareinfos' )

	// 生成部分底部内容
		let compareinfos = $('<div class="compareinfos"/>').html('点击舰娘查询详细信息，勾选舰娘进行对比').appendTo( this.dom.msg_container )
			$('<button/>').html('&times;').on('click', function(){
				this.dom.msg_container.removeAttr('data-msgs')
				_config.set( 'hide-compareinfos', true )
			}.bind(this)).appendTo( compareinfos )
		$('<div class="comparestart"/>').html('开始对比')
							.on('click', function(){
								this.compare_start()
							}.bind(this)).appendTo( this.dom.msg_container )
}
