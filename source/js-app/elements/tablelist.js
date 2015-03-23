/*
 */
_p.el.tablelist = {
	init_el: function(el){
		if( el.data('tablelist') )
			return true

		el.data({
			'tablelist': new _tablelist( el )
		})
	},

	init: function(tar, els){
		tar = tar || $body;
		els = els || tar.find('.tablelist')

		els.each(function(){
			_p.el.tablelist.init_el($(this))
		})
	}
}






var _tablelist = function( container, options ){
	this.dom = {
		'container': 	container
	}

	if( container.hasClass('ships') )
		this.listtype = 'ships'

	this._index = this.global_index
	this.global_index++

	this.init();
}

_tablelist.prototype.global_index = 0












// Ships
	_tablelist.prototype._ships_columns = [
		'  ',
		['火力',	'fire'],
		['雷装',	'torpedo'],
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
	_tablelist.prototype._ships_append_item = function( ship_data ){
		var self = this
			,tr = $('<tr class="row" data-shipid="'+ ship_data['id'] +'"'+ ( self.dom.container.hasClass('shiplist-edit') ? ' data-shipedit="true"' : '' ) +' modal="true"/>')
					.appendTo( this.dom.tbody )
			,max_carry = 0
			,name = ship_data['name']['zh_cn']
					+ (ship_data['name']['suffix']
						? '<small>' + _g.data.ship_namesuffix[ship_data['name']['suffix']]['zh_cn'] + '</small>'
						: '')

		for( var i in ship_data['carry'] ){
			max_carry+= ship_data['carry'][i]
		}

		function _val( val, show_zero ){
			if( !show_zero && (val == 0 || val == '0') )
				return '<small class="zero">-</small>'
			return val
		}

		for( var i in self._ships_columns ){
			switch( self._ships_columns[i][1] ){
				case ' ':
					$('<th/>')
						.html(
							'<img src="../pics/ships/'+ship_data['id']+'/0.jpg"/>'
							+ '<strong>' + name + '</strong>'
							//+ '<small>' + ship_data['pron'] + '</small>'
						)
						.prepend(
							$('<input type="checkbox" class="compare"/>').on('click, change',function(){
								if( $(this).prop('checked') )
									tr.attr('compare-checked', true )
								else
									tr.removeAttr('compare-checked')
								self._ships_compare_btn_show( $(this).prop('checked') )
							})
						)
						.appendTo(tr)
					break;
				case 'fire':
					$('<td data-stat="fire" data-value="' + ship_data['stat']['fire_max'] + '"/>')
						.html( _val( ship_data['stat']['fire_max'] ) )
						.appendTo(tr)
					break;
				case 'torpedo':
					$('<td data-stat="torpedo" data-value="' + ship_data['stat']['torpedo_max'] + '"/>')
						.html( _val( ship_data['stat']['torpedo_max'] ) )
						.appendTo(tr)
					break;
				case 'aa':
					$('<td data-stat="aa" data-value="' + ship_data['stat']['aa_max'] + '"/>')
						.html( _val( ship_data['stat']['aa_max'] ) )
						.appendTo(tr)
					break;
				case 'asw':
					$('<td data-stat="asw" data-value="' + ship_data['stat']['asw_max'] + '"/>')
						.html( _val(
							ship_data['stat']['asw_max'],
							/^[5,8,9]$/.test( ship_data['type'] )
						) )
						.appendTo(tr)
					break;
				case 'hp':
					$('<td data-stat="hp" data-value="' + ship_data['stat']['hp'] + '"/>')
						.html(_val( ship_data['stat']['hp'] ))
						.appendTo(tr)
					break;
				case 'armor':
					$('<td data-stat="armor" data-value="' + ship_data['stat']['armor_max'] + '"/>')
						.html(_val( ship_data['stat']['armor_max'] ))
						.appendTo(tr)
					break;
				case 'evasion':
					$('<td data-stat="evasion" data-value="' + ship_data['stat']['evasion_max'] + '"/>')
						.html(_val( ship_data['stat']['evasion_max'] ))
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
				case 'los':
					$('<td data-stat="los" data-value="' + ship_data['stat']['los_max'] + '"/>')
						.html(_val( ship_data['stat']['los_max'] ))
						.appendTo(tr)
					break;
				case 'luck':
					$('<td data-stat="luck" data-value="' + ship_data['stat']['luck'] + '"/>')
						.html(ship_data['stat']['luck'] + '<sup>' + ship_data['stat']['luck_max'] + '</sup>')
						.appendTo(tr)
					break;
				case 'consum_fuel':
					$('<td data-stat="consum_fuel" data-value="' + ship_data['consum']['fuel'] + '"/>')
						.html(ship_data['consum']['fuel'])
						.appendTo(tr)
					break;
				case 'consum_ammo':
					$('<td data-stat="consum_ammo" data-value="' + ship_data['consum']['ammo'] + '"/>')
						.html(ship_data['consum']['ammo'])
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
		/*
		for( var i in _g.data.ship_id_by_type ){
			if( typeof _g.ship_type_order[i] == 'object' ){
				var data_shiptype = _g.data.ship_types[ _g.ship_type_order[i][0] ]
			}else{
				var data_shiptype = _g.data.ship_types[ _g.ship_type_order[i] ]
			}
			$('<tr class="typetitle"><th colspan="' + (self._ships_columns.length + 1) + '">'
				+ data_shiptype['full_zh'] + '<small>[' + data_shiptype['code'] + ']</small>'
				+ '</th></tr>')
				.appendTo( this.dom.tbody )

			for( var j in _g.data.ship_id_by_type[i] ){
				self._ships_append_item( _g.data.ships[ _g.data.ship_id_by_type[i][j] ] )
			}

			var k = 0
			while(k < 9){
				$('<tr class="empty"/>').appendTo(this.dom.tbody)
				k++
			}
		}
		*/
		function _do( i, j ){
			if( _g.data.ship_id_by_type[i] ){
				if( !j ){
					if( typeof _g.ship_type_order[i] == 'object' ){
						var data_shiptype = _g.data.ship_types[ _g.ship_type_order[i][0] ]
					}else{
						var data_shiptype = _g.data.ship_types[ _g.ship_type_order[i] ]
					}
					$('<tr class="typetitle"><th colspan="' + (self._ships_columns.length + 1) + '">'
						+ data_shiptype['full_zh'] + '<small>[' + data_shiptype['code'] + ']</small>'
						+ '</th></tr>')
						.appendTo( self.dom.tbody )
				}

				self._ships_append_item( _g.data.ships[ _g.data.ship_id_by_type[i][j] ] )

				setTimeout(function(){
					if( j >= _g.data.ship_id_by_type[i].length - 1 ){
						var k = 0
						while(k < 9){
							$('<tr class="empty"/>').appendTo(self.dom.tbody)
							k++
						}
						_do( i+1, 0 )
					}else{
						_do( i, j+1 )
					}
				}, 0)
			}else{
				self.mark_high()
				_frame.app_main.loaded('tablelist_'+self._index, true)
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
		this.dom.msg_container.removeAttr('data-msgs')
		this._ships_last_viewtype = this.dom.filter_container.attr('viewtype')
		this.dom.filter_container.attr('viewtype', 'compare')
		_config.set( 'shiplist-viewtype', this._ships_last_viewtype )
		this.mark_high()
	}
	_tablelist.prototype._ships_compare_end = function(){
		this.dom.tbody.find('input[type="checkbox"].compare:checked').prop('checked', false).trigger('change')
		this.dom.filter_container.attr('viewtype', this._ships_last_viewtype)
		delete this._ships_last_viewtype
		this.dom.msg_container.removeAttr('data-msgs')
		this.mark_high()
	}
	_tablelist.prototype._ships_compare_continue = function(){
		this.dom.filter_container.attr('viewtype', this._ships_last_viewtype)
		delete this._ships_last_viewtype
		this.dom.msg_container.attr('data-msgs', 'comparestart')
		this.mark_high()
	}
	_tablelist.prototype._ships_init = function(){
		var self = this

		// 标记全局载入状态
			_frame.app_main.loading.push('tablelist_'+this._index)
			_frame.app_main.is_loaded = false

		// 生成过滤器与选项
			this.dom.filter_container = $('<div class="options"/>').appendTo( this.dom.container )
			this.dom.filters = $('<div class="filters"/>').appendTo( this.dom.filter_container )
			this.dom.exit_compare = $('<div class="exit_compare"/>')
									.append(
										$('<button icon="close"/>')
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

		// 初始化设置
			this.append_option( 'checkbox', 'hide-premodel', '仅显示同种同名舰最终版本',
				_config.get( 'shiplist-filter-hide-premodel' ) === 'false' ? null : true, null, {
					'onchange': function( e, input ){
						_config.set( 'shiplist-filter-hide-premodel', input.prop('checked') )
						self.dom.filter_container.attr('filter-hide-premodel', input.prop('checked'))
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
						}
					}
				} )
			this.dom.filters.find('input').trigger('change')

		// 生成表格框架
			this.dom.table_container = $('<div class="fixed-table-container"/>').appendTo( this.dom.container )
			this.dom.table_container_inner = $('<div class="fixed-table-container-inner"/>').appendTo( this.dom.table_container )
			this.dom.table = $('<table class="ships hashover hashover-column"/>').appendTo( this.dom.table_container_inner )
			function gen_thead(arr){
				var thead = $('<thead/>')
					,tr = $('<tr/>').appendTo(thead)
				for(var i in arr){
					if( typeof arr[i] == 'object' ){
						$('<td data-stat="' + arr[i][1] + '"/>').html('<div class="th-inner">'+arr[i][0]+'</div>').appendTo(tr)
					}else{
						$('<th/>').html('<div class="th-inner">'+arr[i]+'</div>').appendTo(tr)
					}
				}
				return thead
			}
			gen_thead( self._ships_columns ).appendTo( this.dom.table )
			this.dom.tbody = $('<tbody/>').appendTo( this.dom.table )

		// 获取所有舰娘数据，按舰种顺序 (_g.ship_type_order / _g.ship_type_order_map) 排序
		// -> 获取舰种名称
		// -> 生成舰娘DOM
			_db.ships.find({}).sort({'type': 1, 'class': 1, 'class_no': 1, 'time_created': 1, 'name.suffix': 1}).exec(function(err, docs){
				if( !err ){
					for(var i in docs){
						_g.data.ships[docs[i]['id']] = docs[i]

						if( typeof _g.data.ship_id_by_type[ _g.ship_type_order_map[docs[i]['type']] ] == 'undefined' )
							_g.data.ship_id_by_type[ _g.ship_type_order_map[docs[i]['type']] ] = []
						_g.data.ship_id_by_type[ _g.ship_type_order_map[docs[i]['type']] ].push( docs[i]['id'] )
					}
				}

				/*
				_db.ship_types.find({}, function(err2, docs2){
					if( !err2 ){
						for(var i in docs2 ){
							_g.data.ship_types[docs2[i]['id']] = docs2[i]
						}

					}
				})
				*/
				if( _g.data.ship_types ){
					self._ships_append_all_items()
				}else{
					$('<p/>').html('暂无数据...').appendTo( self.dom.table_container_inner )
				}
			})

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










_tablelist.prototype.append_option = function( type, name, label, value, suffix, options ){
	options = options || {}
	function gen_input(){
		switch( type ){
			case 'text':
			case 'number':
			case 'hidden':
				var input = $('<input type="'+type+'" name="'+name+'" id="'+id+'" />').val(value)
				break;
			case 'select':
				var input = $('<select name="'+name+'" id="'+id+'" />')
				var option_empty = $('<option value=""/>').html('').appendTo( input )
				for( var i in value ){
					if( typeof value[i] == 'object' ){
						var o_el = $('<option value="' + (typeof value[i].val == 'undefined' ? value[i]['value'] : value[i].val) + '"/>')
							.html(value[i]['title'] || value[i]['name'])
							.appendTo( input )
					}else{
						var o_el = $('<option value="' + value[i] + '"/>')
							.html(value[i])
							.appendTo( input )
					}
					if( typeof options['default'] != 'undefined' && o_el.val() == options['default'] ){
						o_el.prop('selected', true)
					}
				}
				if( !value || !value.length ){
					option_empty.remove()
					$('<option value=""/>').html('...').appendTo( input )
				}
				if( options['new'] ){
					$('<option value=""/>').html('==========').insertAfter( option_empty )
					$('<option value="___new___"/>').html('+ 新建').insertAfter( option_empty )
					input.on('change.___new___', function(){
						var select = $(this)
						if( select.val() == '___new___' ){
							select.val('')
							options['new']( input )
						}
					})
				}
				break;
			case 'checkbox':
				var input = $('<input type="'+type+'" name="'+name+'" id="'+id+'" />').prop('checked', value)
				break;
			case 'radio':
				var input = $();
				for( var i in value ){
					var title, val
						,checked = false
					if( value[i].push ){
						val = value[i][0]
						title = value[i][1]
					}else{
						val = value[i].val || value[i].value
						title = value[i].title || value[i].name
					}
					if( options.radio_default && options.radio_default == val )
						checked = true
					input = input.add(
						$('<input type="radio" name="'+name+'" id="'+id+'-'+val+'" ischecked="'+checked+'" />')
							.val(val)
							.prop('checked', (checked || (!checked && i == 0) ))
						)
					input = input.add($('<label for="'+id+'-'+val+'"/>').html( title ))
				}
				break;
		}

		if( options.required ){
			input.prop('required', true)
		}

		if( options.onchange ){
			input.on('change.___onchange___', function(e){
				options.onchange( e, $(this) )
			})
			if( options['default'] )
				input.trigger('change')
		}

		if( !name )
			input.attr('name', null)

		return input
	}

	var line = $('<p/>').addClass(name).appendTo( this.dom.filters )
		,id = '_input_g' + parseInt(_g.inputIndex)

		,label = label ? $('<label for="'+id+'"/>').html( label ).appendTo(line) : null
		,input = gen_input().appendTo(line)

	if( type == 'checkbox' && label )
		label.insertAfter(input)

	if( suffix )
		$('<label for="'+id+'"/>').html(suffix).appendTo(line)

	_g.inputIndex++
	return line
}














// 表格排序相关
	// 排序表格中正在显示行中某一列(td:nth-of-type)，返回DOM Array
	// 默认降序
		_tablelist.prototype.sort_column = function( nth, is_ascending, rows ){
			if( !rows ){
				var tbody = this.dom.tbody
				if( !tbody || !tbody.length )
					tbody = this.dom.table.find('tbody')
				rows = tbody.find('tr.row:visible')
			}
			nth = nth || 1

			// 建立临时用对象，在函数结束时delete
				this._tmp_values = []
				this._tmp_value_map_cell = {}

			var self = this

			// 遍历，将值全部导出到 _tmp_values，_tmp_value_map_cell 中记录 值 -> jQuery DOM
				rows.find('td:nth-of-type(' + nth + ')').each(function(index){
					var cell = $(this)
						,val = $(this).data('value')

					val = parseFloat(val)

					if( $.inArray( val, self._tmp_values ) < 0 )
						self._tmp_values.push( val )

					if( !self._tmp_value_map_cell[val] )
						self._tmp_value_map_cell[val] = $()

					self._tmp_value_map_cell[val] = self._tmp_value_map_cell[val].add( cell )
				})

			// 排序
				this._tmp_values.sort(function(a, b){
					if( is_ascending )
						return a-b
					else
						return b-a
				})

			// 根据排序结果，整理返回结果
				var return_array = []
				for(var i in this._tmp_values){
					return_array.push( this._tmp_value_map_cell[this._tmp_values[i]] )
				}

			// delete 临时对象
				delete this._tmp_values
				delete this._tmp_value_map_cell

			return return_array
		}

	// 标记表格全部数据列中第一和第二高值的单元格
		_tablelist.prototype.mark_high = function(){
			var tbody = this.dom.tbody
			if( !tbody || !tbody.length )
				tbody = this.dom.table.find('tbody')
			var rows = tbody.find('tr.row:visible')

			rows.find('td[data-value]').removeClass('sort-first sort-second')

			rows.eq(0).find('td[data-value]').each(function(index){
				var is_ascending = false

				// 以下属性不参与该计算
					if( $(this).data('stat').match(/\b(speed|range)\b/ ) )
						return

				// 以下属性为升序
					if( $(this).data('stat').match(/\b(consum_fuel|consum_ammo)\b/ ) )
						is_ascending = true

				var sort = _tablelist.prototype.sort_column( index+1, is_ascending, rows )
					,max = Math.min( 6, Math.ceil(rows.length / 2) + 1 )

				if( sort.length > 1 && sort[0].length < max ){
					sort[0].addClass('sort-first')
					if( sort.length > 2 && sort[1].length < max )
						sort[1].addClass('sort-second')
				}

			})
		}



















_tablelist.prototype.init = function(){
	if( this.is_init )
		return true

	if( this['_' + this.listtype + '_init'] )
		this['_' + this.listtype + '_init']()

	this.is_init = true
}