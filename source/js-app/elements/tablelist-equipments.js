// Equipments

class TablelistEquipments extends Tablelist{
	constructor( container, options ){
		super( container, options )

		this.columns = [
			'  ',
			['火力',	'fire'],
			['雷装',	'torpedo'],
			['对空',	'aa'],
			['对潜',	'asw'],
			['爆装',	'bomb'],
			['命中',	'hit'],
			['装甲',	'armor'],
			['回避',	'evasion'],
			['索敌',	'los'],
			['射程',	'range'],
			['可改修','improvable']
		]

		// 标记全局载入状态
			_frame.app_main.loading.push('tablelist_'+this._index)
			_frame.app_main.is_loaded = false
	
		// 生成过滤器与选项
			this.dom.filter_container = $('<div class="options"/>').appendTo( this.dom.container )
			this.dom.filters = $('<div class="filters"/>').appendTo( this.dom.filter_container )
	
		// 装备大类切换
			var checked = false
			this.dom.type_radios = {}
			for(var i in _g.data.item_type_collections){
				var radio_id = '_input_g' + parseInt(_g.inputIndex)
				this.dom.type_radios[i] = $('<input type="radio" name="equipmentcollection" id="'+radio_id+'" value="'+i+'"/>')
					.prop('checked', !checked )
					.on('change', function(){
						// force thead redraw
						this.dom.table_container_inner.scrollTop(0)
						this.thead_redraw()
					}.bind(this))
					.prependTo( this.dom.container )
				$('<label class="tab container" for="'+radio_id+'" data-equipmentcollection="'+i+'"/>')
					.html(
						'<i></i>'
						+ '<span>' + _g.data.item_type_collections[i]['name']['zh_cn'].replace(/\&/g, '<br/>') + '</span>'
					)
					.appendTo( this.dom.filters )
				checked = true
				_g.inputIndex++
			}
		
		// 装备类型过滤
			this.dom.filter_types = $('<input name="types" type="hidden"/>').prependTo( this.dom.container )
	
		// 生成表格框架
			this.dom.table_container = $('<div class="fixed-table-container"/>').appendTo( this.dom.container )
			this.dom.table_container_inner = $('<div class="fixed-table-container-inner"/>').appendTo( this.dom.table_container )
			this.dom.table = $('<table class="equipments hashover hashover-column"/>').appendTo( this.dom.table_container_inner )
			function gen_thead(arr){
				this.dom.thead = $('<thead/>')
				var tr = $('<tr/>').appendTo(this.dom.thead)
				arr.forEach(function(currentValue){
					if( typeof currentValue == 'object' ){
						$('<td data-stat="' + currentValue[1] + '"/>')
							.html('<div class="th-inner-wrapper"><span><span>'+currentValue[0]+'</span></span></div>').appendTo(tr)
					}else{
						$('<th/>').html('<div class="th-inner-wrapper"><span><span>'+currentValue[0]+'</span></span></div>').appendTo(tr)
					}
				})
				return this.dom.thead
			}
			gen_thead = gen_thead.bind(this)
			gen_thead( this.columns ).appendTo( this.dom.table )
			this.dom.tbody = $('<tbody/>').appendTo( this.dom.table )
	
		// 生成装备数据DOM
			this.append_all_items()
	
		// 生成底部内容框架
			this.dom.msg_container = $('<div class="msgs"/>').appendTo( this.dom.container )
			if( !_config.get( 'hide-equipmentsinfos' ) )
				this.dom.msg_container.attr( 'data-msgs', 'equipmentsinfos' )
	
		// 生成部分底部内容
			var equipmentsinfos = $('<div class="equipmentsinfos"/>').html('点击装备查询初装舰娘等信息').appendTo( this.dom.msg_container )
				$('<button/>').html('&times;').on('click', function(){
					this.dom.msg_container.removeAttr('data-msgs')
					_config.set( 'hide-equipmentsinfos', true )
				}.bind(this)).appendTo( equipmentsinfos )
	}

	append_item( equipment_data, collection_id ){
		let tr = $('<tr/>',{
						'class':			'row',
						'data-equipmentid':	equipment_data['id'],
						'data-equipmentcollection':	collection_id,
						'data-infos': 		'[[EQUIPMENT::'+ equipment_data['id'] +']]',
						'data-equipmentedit':this.dom.container.hasClass('equipmentlist-edit') ? 'true' : null,
						'data-equipmenttype':equipment_data.type
					})
					.on('click', function(e, forceInfos){
						if( !forceInfos && _frame.app_main.is_mode_selection() ){
							e.preventDefault()
							e.stopImmediatePropagation()
							e.stopPropagation()
							
							if( $.inArray(equipment_data.type, TablelistEquipments.types) > -1 )
								_frame.app_main.mode_selection_callback(equipment_data['id'])
						}
					})
					.appendTo( this.dom.tbody )
	
		function _val( val, show_zero ){
			if( !show_zero && (val == 0 || val === '0' || val === '') )
				return '<small class="zero">-</small>'
			//if( val > 0 )
			//	return '+' + val
			return val
		}
	
		this.columns.forEach(function(currentValue){
			switch( currentValue[1] ){
				case ' ':
					$('<th/>').html(equipment_data.getName()).appendTo(tr)
					break;
				case 'range':
					$('<td data-stat="range" data-value="' + equipment_data['stat']['range'] + '"/>')
						.html(
							equipment_data['stat']['range']
								? _g.getStatRange( equipment_data['stat']['range'] )
								: '<small class="zero">-</small>'
						)
						.appendTo(tr)
					break;
				case 'improvable':
					$('<td data-stat="range" data-value="' + (equipment_data['improvable'] ? '1' : '0') + '"/>')
						.html(
							equipment_data['improvable']
								? '✓'
								: '<small class="zero">-</small>'
						)
						.appendTo(tr)
					break;
				default:
					$('<td data-stat="'+currentValue[1]+'" data-value="' + equipment_data['stat'][currentValue[1]] + '"/>')
						.addClass( equipment_data['stat'][currentValue[1]] < 0 ? 'negative' : '' )
						.html( _val( equipment_data['stat'][currentValue[1]] ) )
						.appendTo(tr)
					break;
			}
		})
	
		return tr
	}

	append_all_items(){
		this.generated = false
		this.dom.types = []
		function _do( i, j ){
			if( _g.data.item_id_by_type[i] ){
				if( !j ){
					var data_equipmenttype = _g.data.item_types[ _g.item_type_order[i] ]
					this.dom.types.push(
						$('<tr class="typetitle" data-equipmentcollection="'+_g.data.item_id_by_type[i]['collection']+'" data-type="'+data_equipmenttype.id+'">'
								+ '<th colspan="' + (this.columns.length + 1) + '">'
									+ '<span style="background-image: url(../app/assets/images/itemicon/'+data_equipmenttype['icon']+'.png)"></span>'
									+ data_equipmenttype['name']['zh_cn']
									+ _frame.app_main.page['equipments'].gen_helper_equipable_on( data_equipmenttype['id'] )
								+ '</th></tr>'
							).appendTo( this.dom.tbody )
					)
				}
	
				this.append_item(
					_g.data.items[ _g.data.item_id_by_type[i]['equipments'][j] ],
					_g.data.item_id_by_type[i]['collection']
				)
	
				setTimeout(function(){
					if( j >= _g.data.item_id_by_type[i]['equipments'].length - 1 ){
						_do( i+1, 0 )
					}else{
						_do( i, j+1 )
					}
				}, 0)
			}else{
				//this.mark_high()
				// force thead redraw
					this.thead_redraw()
					this.generated = true
					this.apply_types_check()
				_frame.app_main.loaded('tablelist_'+this._index, true)
			}
		}
		_do = _do.bind(this)
		_do( 0, 0 )
	}

	apply_types(){
		console.log('types: ' + TablelistEquipments.types)
		this.dom.filter_types.removeAttr('class')
		
		if( TablelistEquipments.types.length ){
			this.dom.filter_types.addClass('type' + TablelistEquipments.types.join(' type'))
			if( this.generated )
				this.apply_types_check()
		}
	}

	apply_types_check(){
		if( TablelistEquipments.shipIdLast && TablelistEquipments.shipIdLast == TablelistEquipments.shipId )
			return
		
		TablelistEquipments.shipIdLast = TablelistEquipments.shipId
		
		// 航母：直接进入飞行器页
		if( TablelistEquipments.shipId
			&& $.inArray(_g.data.ships[TablelistEquipments.shipId].type, [9, 10, 11] ) > -1
		){
			let k = 0
				,el
	
			while( this.dom.types[k++].attr('data-equipmentcollection') != 3
				|| $.inArray((parseInt(this.dom.types[k].attr('data-type')) || null), TablelistEquipments.types) <= -1 ){
				el = this.dom.types[k+1]
			}
			
			el = el || this.dom.types[0]
			
			this.dom.type_radios[3].prop('checked', true).trigger('change')
			this.dom.table_container_inner.scrollTop(el[0].offsetTop || 0)
			return
		}
		
		if( TablelistEquipments.types.length ){
			let k = 0
				,el
	
			while( $.inArray((parseInt(this.dom.types[k++].attr('data-type')) || null), TablelistEquipments.types) <= -1 ){
				el = this.dom.types[k]
			}
			
			el = el || this.dom.types[0]
			
			this.dom.type_radios[parseInt(el.attr('data-equipmentcollection')) || 1].prop('checked', true).trigger('change')
			this.dom.table_container_inner.scrollTop(el[0].offsetTop || 0)
		}
	}
}

TablelistEquipments.types = []
TablelistEquipments.shipId = null
TablelistEquipments.shipIdLast = null