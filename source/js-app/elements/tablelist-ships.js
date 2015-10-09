

class TablelistShips extends Tablelist{
	constructor( container, options ){
		super( container, options )

		this.columns = [
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
		this.header_checkbox = []
		this.checkbox = []
		this.last_item = null

		// 标记全局载入状态
			_frame.app_main.loading.push('tablelist_'+this._index)
			_frame.app_main.is_loaded = false
	
			//_g.log( 'shiplist init', _frame.app_main.loading )
		
		if( container.children('.fixed-table-container').length ){
			this.init_parse()
		}else if(this.init_new){
			this.init_new()
		}
	}

	compare_btn_show( is_checked ){
		if( (!is_checked && this.dom.tbody.find('input[type="checkbox"].compare:checked').length)
			|| is_checked
		){
			this.dom.msg_container.attr('data-msgs', 'comparestart')
		}else{
			this.dom.msg_container.removeAttr('data-msgs')
		}
	}

	compare_start(){
		// 隐藏底部提示信息
			this.dom.msg_container.removeAttr('data-msgs')
	
		// 存储当前状态
			this.last_viewtype = this.dom.filter_container.attr('viewtype')
			_config.set( 'shiplist-viewtype', this.last_viewtype )
			this.last_scrollTop = this.dom.table_container_inner.scrollTop()
	
		// 更改视图
			this.dom.filter_container.attr('viewtype', 'compare')
			this.dom.table_container_inner.scrollTop( 0 )
			this.dom.table.addClass('sortable')
	
		// 计算数据排序排序
			this.mark_high( true )
			this.thead_redraw( 500 )
	}

	compare_off(){
		this.dom.filter_container.attr('viewtype', this.last_viewtype)
		this.sort_table_restore()
		this.mark_high()
		this.thead_redraw( 500 )
		this.dom.table_container_inner.scrollTop( this.last_scrollTop )
		this.dom.table.removeClass('sortable')
		delete this.last_viewtype
		delete this.last_scrollTop
	}

	compare_end(){
		this.dom.tbody.find('input[type="checkbox"].compare:checked').prop('checked', false).trigger('change')
		this.dom.msg_container.removeAttr('data-msgs')
		this.compare_off()
	}

	compare_continue(){
		this.dom.msg_container.attr('data-msgs', 'comparestart')
		this.compare_off()
	}
	
	contextmenu_show($el, shipId, is_rightclick){
		if( this.dom.filter_container.attr('viewtype') == 'compare' || $el.attr('data-donotcompare') == 'true' )
			return false
	
		if( !TablelistShips.contextmenu )
			TablelistShips.contextmenu = new _menu({
				'className': 'contextmenu-ship',
				'items': [
					$('<menuitem/>').html('选择')
						.on({
							'click': function(e){
								if( _frame.app_main.is_mode_selection() )
									_frame.app_main.mode_selection_callback(TablelistShips.contextmenu._curid)
							},
							'show': function(){
								if( _frame.app_main.is_mode_selection() )
									$(this).show()
								else
									$(this).hide()
							}
						}),
					$('<menuitem/>').html('查看资料')
						.on({
							'click': function(e){
								TablelistShips.contextmenu._curel.trigger('click', [true])
							}
						}),
	
					$('<menuitem/>').html('将该舰娘加入对比')
						.on({
							'click': function(e){
								this.checkbox[TablelistShips.contextmenu._curid]
									.prop('checked', !this.checkbox[TablelistShips.contextmenu._curid].prop('checked'))
									.trigger('change')
							}.bind(this),
							'show': function(e){
								if( !TablelistShips.contextmenu._curid )
									return false
								
								if( _g.data.ship_types[_g['data']['ships'][TablelistShips.contextmenu._curid]['type']]['donotcompare'] )
									$(e.target).hide()
								else
									$(e.target).show()
									
								if( this.checkbox[TablelistShips.contextmenu._curid].prop('checked') )
									$(e.target).html('取消对比')
								else
									$(e.target).html('将该舰娘加入对比')
							}.bind(this)
						}),
					
					$('<div/>').on('show', function(e){
						var $div = $(e.target).empty()
						if( TablelistShips.contextmenu._curid ){
							var series = _g['data']['ships'][TablelistShips.contextmenu._curid].getSeriesData() || []
							series.forEach(function(currentValue, i){
								if( !i )
									$div.append($('<hr/>'))
								let checkbox = null
								try{
									checkbox = this.checkbox[currentValue['id']]
								}catch(e){}
								$div.append(
									$('<div class="item"/>')
										.html('<span>' + _g['data']['ships'][currentValue['id']].getName(true) + '</span>')
										.append(
											$('<div class="group"/>')
												.append(function(){
													var els = $()
													
													if( _frame.app_main.is_mode_selection() ){
														els = els.add(
															$('<menuitem/>')
																.html('选择')
																.on({
																	'click': function(){
																		if( _frame.app_main.is_mode_selection() )
																			_frame.app_main.mode_selection_callback(currentValue['id'])
																	}
																})
														)
													}
													
													return els
												})
												.append(
													$('<menuitem data-infos="[[SHIP::'+currentValue['id']+']]"/>')
														.html('查看资料')
												)
												.append(
													$('<menuitem/>')
														.html(
															checkbox && checkbox.prop('checked')
																? '取消对比'
																: '加入对比'
														)
														.on({
															'click': function(e){
																if( checkbox ){
																	this.checkbox[currentValue['id']]
																		.prop('checked', !checkbox.prop('checked'))
																		.trigger('change')
																}
															}.bind(this)
														})
												)
										)
								)
							}, this)
						}
					}.bind(this))
				]
			})
	
		TablelistShips.contextmenu._curid = shipId || $el.data('shipid')
		TablelistShips.contextmenu._curel = $el

		if( is_rightclick )
			TablelistShips.contextmenu.show(is_rightclick.clientX, is_rightclick.clientY)
		else
			TablelistShips.contextmenu.show($el)
	}
	
	
	
	
	
	
	
	
	
	init_parse(){
		// 生成过滤器与选项
			this.dom.filter_container = this.dom.container.children('.options')
			this.dom.filters = this.dom.filter_container.children('.filters')
			this.dom.exit_compare = this.dom.filter_container.children('.exit_compare')
			// 结束对比
				this.dom.exit_compare.children('button[icon="arrow-set2-left"]').on('click', function(){
						this.compare_end()
					}.bind(this))
			// 继续选择
				this.dom.exit_compare.children('button[icon="checkbox-checked"]').on('click', function(){
						this.compare_continue()
					}.bind(this))
			// 点击表格标题可排序
				this.dom.btn_compare_sort = this.dom.exit_compare.children('button[icon="sort-amount-desc"]')
					.on('click', function(){
						if( !this.dom.btn_compare_sort.hasClass('disabled') )
							this.sort_table_restore()
					}.bind(this))
			// 仅显示同种同名舰最终版本
				this.dom.btn_hide_premodel = this.dom.filters.find('[name="hide-premodel"]')
					.prop('checked', _config.get( 'shiplist-filter-hide-premodel' ) === 'false' ? null : true)
					.on('change', function( e ){
						_config.set( 'shiplist-filter-hide-premodel', this.dom.btn_hide_premodel.prop('checked') )
						this.dom.filter_container.attr('filter-hide-premodel', this.dom.btn_hide_premodel.prop('checked'))
						this.thead_redraw()
					}.bind(this))
			// 视图切换
				this.dom.filters.find('[name="viewtype"]').each(function(index, $el){
					$el = $($el)
					let viewtype = _config.get( 'shiplist-viewtype' ) || 'card'
					if( $el.val() == viewtype )
						$el.prop('checked', true)
					$el.on('change', function( e ){
						if( $el.is(':checked') ){
							_config.set( 'shiplist-viewtype', $el.val() )
							this.dom.filter_container.attr('viewtype', $el.val())
							this.thead_redraw()
						}
					}.bind(this))
				}.bind(this))
			this.dom.filters.find('input').trigger('change')
	
		// 生成表格框架
			this.dom.table_container = this.dom.container.children('.fixed-table-container')
			this.dom.table_container_inner = this.dom.table_container.children('.fixed-table-container-inner')
			this.dom.table = this.dom.table_container_inner.children('table.ships')
				this.dom.table.find('thead td').on('click', function(e){
										this.sort_table_from_theadcell($(e.currentTarget))
									}.bind(this))
			this.dom.tbody = this.dom.table.children('tbody')
		
		// 右键菜单事件
			this.dom.table.on('contextmenu.contextmenu_ship', 'tr[data-shipid]', function(e){
				this.contextmenu_show($(e.currentTarget), null, e)
			}.bind(this)).on('click.contextmenu_ship', 'tr[data-shipid]>th>em', function(e){
				this.contextmenu_show($(e.currentTarget).parent().parent())
				e.stopImmediatePropagation()
				e.stopPropagation()
			}.bind(this))
	
		// 生成底部内容框架
			this.dom.msg_container = this.dom.container.children('.msgs')
			if( _config.get( 'hide-compareinfos' ) )
				this.dom.msg_container.removeAttr('data-msgs')
			else
				this.dom.msg_container.attr( 'data-msgs', 'compareinfos' )
	
		// 处理所有舰娘数据
			//if( _g.data.ship_types ){
				this.parse_all_items()
			//}
	
		// 生成部分底部内容
			let compareinfos = this.dom.msg_container.children('.compareinfos')
				compareinfos.children('button').on('click', function(){
						this.dom.msg_container.removeAttr('data-msgs')
						_config.set( 'hide-compareinfos', true )
					}.bind(this))
			this.dom.msg_container.children('.comparestart')
					.on('click', function(){
						this.compare_start()
					}.bind(this))
	}
	parse_all_items(){
		let header_index = -1

		this.dom.tbody.children('tr.typetitle,tr.row').each(function(index, tr){
			tr = $(tr)
			if( tr.hasClass('typetitle') ){
				header_index++
				this.last_item = tr
				let checkbox = tr.find('input[type="checkbox"]')
						//.prop('disabled', _g.data['ship_type_order'][header_index]['donotcompare'] ? true : false)
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
				this.header_checkbox[header_index] = checkbox
			}else{
				let donotcompare = tr.attr('data-donotcompare')
					//,ship_data = _g.data.ships[ tr.attr('data-shipid') ]
					,ship_id = tr.attr('data-shipid')
					,checkbox = tr.find('input[type="checkbox"]')
					,title_index = header_index
				
				tr.on('click', function(e, forceInfos){
						if( !forceInfos && e.target.tagName.toLowerCase() != 'em' && _frame.app_main.is_mode_selection() ){
							e.preventDefault()
							e.stopImmediatePropagation()
							e.stopPropagation()
							if(!donotcompare)
								_frame.app_main.mode_selection_callback(ship_id)
						}
					})

				checkbox.prop('disabled', donotcompare)
					.on('click change',function(e, not_trigger_check){
						e.stopImmediatePropagation()
						e.stopPropagation()
						if( checkbox.prop('checked') )
							tr.attr('compare-checked', true )
						else
							tr.removeAttr('compare-checked')
						this.compare_btn_show( checkbox.prop('checked') )
						if( !not_trigger_check )
							this.header_checkbox[title_index].trigger('docheck')
					}.bind(this))
	
				this.header_checkbox[title_index].data(
						'ships',
						this.header_checkbox[title_index].data('ships').add( tr )
					)

				tr.data('checkbox', checkbox)
			
				this.checkbox[ship_id] = checkbox
			}
		}.bind(this))

		this.mark_high()
		this.thead_redraw()
		_frame.app_main.loaded('tablelist_'+this._index, true)
		delete( this.last_item )
	}
}
