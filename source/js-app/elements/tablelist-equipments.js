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
		
		if( container.children('.fixed-table-container').length ){
			this.init_parse()
		}else if(this.init_new){
			this.init_new()
		}
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
	
	
	
	
	
	
	
	
	

	init_parse(){
		// 生成过滤器与选项
			this.dom.filter_container = this.dom.container.children('.options')
			this.dom.filters = this.dom.filter_container.children('.filters')
	
		// 装备大类切换
			this.dom.type_radios = {}
			this.dom.container.children('input[type="radio"][name="equipmentcollection"]').each(function(i, radio){
				radio = $(radio)
				let val = parseInt(radio.val())
				this.dom.type_radios[val] = radio
					.prop('checked', val == 1 )
					.on('change', function(){
						// force thead redraw
						this.dom.table_container_inner.scrollTop(0)
						this.thead_redraw()
					}.bind(this))
			}.bind(this))
		
		// 装备类型过滤
			this.dom.filter_types = this.dom.container.children('input[name="types"][type="hidden"]')
	
		// 生成表格框架
			this.dom.table_container = this.dom.container.children('.fixed-table-container')
			this.dom.table_container_inner = this.dom.table_container.children('.fixed-table-container-inner')
			this.dom.table = this.dom.table_container_inner.children('.equipments.hashover.hashover-column')
			this.dom.thead = this.dom.table.children('thead')
			this.dom.tbody = this.dom.table.children('tbody')
	
		// 生成装备数据DOM
			this.parse_all_items()
	
		// 生成底部内容框架
			this.dom.msg_container = this.dom.container.children('.msgs')
			if( !_config.get( 'hide-equipmentsinfos' ) )
				this.dom.msg_container.attr( 'data-msgs', 'equipmentsinfos' )
			else
				this.dom.msg_container.removeAttr( 'data-msgs' )
	
		// 生成部分底部内容
			let equipmentsinfos = this.dom.msg_container.children('.equipmentsinfos')
				equipmentsinfos.children('button').on('click', function(){
					this.dom.msg_container.removeAttr('data-msgs')
					_config.set( 'hide-equipmentsinfos', true )
				}.bind(this))
	}
	parse_all_items(){
		this.generated = false
		this.dom.types = []
		
		let header_index = -1

		this.dom.tbody.children('tr.typetitle,tr.row').each(function(index, tr){
			tr = $(tr)
			if( tr.hasClass('typetitle') ){
				header_index++
				this.dom.types[header_index] = tr
			}else{
				//let equipment_data = _g.data.items[ tr.attr('data-equipmentid') ]
				let etype = tr.attr('data-equipmenttype')
					,eid = tr.attr('data-equipmentid')
				tr.on('click', function(e, forceInfos){
						if( !forceInfos && _frame.app_main.is_mode_selection() ){
							e.preventDefault()
							e.stopImmediatePropagation()
							e.stopPropagation()
							
							if( $.inArray(etype, TablelistEquipments.types) > -1 )
								_frame.app_main.mode_selection_callback(eid)
							
							//if( $.inArray(equipment_data.type, TablelistEquipments.types) > -1 )
							//	_frame.app_main.mode_selection_callback(equipment_data['id'])
						}
					})
			}
		}.bind(this))

		this.thead_redraw()
		this.generated = true
		this.apply_types_check()
		_frame.app_main.loaded('tablelist_'+this._index, true)
	}
}

TablelistEquipments.gen_helper_equipable_on = function( type_id ){
	var equipable_on = ''
	_g.data.item_types[type_id]['equipable_on_type'].forEach(function(currentValue, i){
		var item_type_id = _g.data.item_types[type_id]['equipable_on_type'][i]
		equipable_on+= '<span>'
							+ _g['data']['ship_types'][item_type_id]['full_zh']
							+ ( i < _g.data.item_types[type_id]['equipable_on_type'].length-1 ? ',&nbsp;' : '' )
						+ '</span>'
	})
	return '<em class="helper" data-tip="<h4 class=item_equipable_on>可装备于</h4>' + equipable_on + '">?</em>'
}

TablelistEquipments.types = []
TablelistEquipments.shipId = null
TablelistEquipments.shipIdLast = null
