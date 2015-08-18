/*
 */
_p.el.tablelist = {
	init_el: function(el){
		if( el.data('tablelist') )
			return true

		if( el.hasClass('ships') )
			el.data({
				'tablelist': new TablelistShips( el )
			})
		else if( el.hasClass('equipments') )
			el.data({
				'tablelist': new TablelistEquipments( el )
			})
		else if( el.hasClass('fleets') )
			el.data({
				'tablelist': new TablelistFleets( el )
			})
		/*
		else
			el.data({
				'tablelist': new _tablelist( el )
			})*/
	},

	init: function(tar, els){
		tar = tar || $body;
		els = els || tar.find('.tablelist')

		els.each(function(){
			_p.el.tablelist.init_el($(this))
		})
	}
}





class Tablelist{
	constructor( container, options ){
		this.dom = {
			'container': container
		}
		
		options = options || {}
		
		this.trIndex = 0
		this.flexgrid_empty_count = options.flexgrid_empty_count || 8
		this.sort_data_by_stat = options.sort_data_by_stat || {}
		this.sort_default_order_by_stat = options.sort_default_order_by_stat || {}
		/*
		if( this.is_init )
			return true
	
		if( this['_' + this.listtype + '_init'] )
			this['_' + this.listtype + '_init']()
	
		this.is_init = true
		*/
	}

	// 添加选项
		append_option( type, name, label, value, suffix, options ){
			options = options || {}
			function gen_input(){
				let input
					,option_empty
					,o_el
					,id = null
				switch( type ){
					case 'text':
					case 'number':
					case 'hidden':
						input = $('<input type="'+type+'" name="'+name+'" id="'+id+'" />').val(value)
						break;
					case 'select':
						input = $('<select name="'+name+'" id="'+id+'" />')
						option_empty = $('<option value=""/>').html('').appendTo( input )
						value.forEach(function(currentValue, i){
							if( typeof currentValue == 'object' ){
								o_el = $('<option value="' + (typeof currentValue.val == 'undefined' ? currentValue['value'] : currentValue.val) + '"/>')
									.html(currentValue['title'] || currentValue['name'])
									.appendTo( input )
							}else{
								o_el = $('<option value="' + currentValue + '"/>')
									.html(currentValue)
									.appendTo( input )
							}
							if( typeof options['default'] != 'undefined' && o_el.val() == options['default'] ){
								o_el.prop('selected', true)
							}
						})
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
						input = $('<input type="'+type+'" name="'+name+'" id="'+id+'" />').prop('checked', value)
						break;
					case 'radio':
						input = $();
						value.forEach(function(currentValue, i){
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
						})
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
		
			let line = $('<p/>').addClass(name).appendTo( this.dom.filters )
				,id = '_input_g' + parseInt(_g.inputIndex)
				,input = gen_input().appendTo(line)
		
			label = label ? $('<label for="'+id+'"/>').html( label ).appendTo(line) : null
		
			if( type == 'checkbox' && label )
				label.insertAfter(input)
		
			if( suffix )
				$('<label for="'+id+'"/>').html(suffix).appendTo(line)
		
			_g.inputIndex++
			return line
		}

		// 强制 thead 重绘，以解决某些CSS计算延迟问题
			thead_redraw( timeout_duration ){
				if( this.dom.thead && this.dom.thead.length ){
					var thead = this.dom.thead
					setTimeout(function(){
						thead.hide().show(0)
					}, timeout_duration || 10)
				}
			}

		// 表格排序相关
			// 排序表格中正在显示行中某一列(td:nth-of-type)
			// 返回一个Array，每一个元素为jQuery DOM Object
			// is_ascending 	是否为升序，默认降序
			// rows				目标行，默认为全部可见行
				sort_column( nth, is_ascending, rows ){
					if( !rows ){
						let tbody = this.dom.tbody
						if( !tbody || !tbody.length )
							tbody = this.dom.table.find('tbody')
						rows = tbody.find('tr.row:visible').not('[data-donotcompare]')
					}
					nth = nth || 1
		
					// 建立临时用对象，在函数结束时delete
						this._tmp_values = []
						this._tmp_value_map_cell = {}
		
					// 遍历，将值全部导出到 _tmp_values，_tmp_value_map_cell 中记录 值 -> jQuery DOM
						rows.find('td:nth-of-type(' + nth + ')').each(function(index, element){
							let cell = $(element)
								,val = cell.data('value')
		
							val = parseFloat(val)
		
							if( $.inArray( val, this._tmp_values ) < 0 )
								this._tmp_values.push( val )
		
							if( !this._tmp_value_map_cell[val] )
								this._tmp_value_map_cell[val] = $()
		
							this._tmp_value_map_cell[val] = this._tmp_value_map_cell[val].add( cell )
						}.bind(this))
		
					// 排序
						this._tmp_values.sort(function(a, b){
							if( is_ascending )
								return a-b
							else
								return b-a
						})
		
					// 根据排序结果，整理返回结果
						let return_array = []
						this._tmp_values.forEach(function(currentValue){
							return_array.push( this._tmp_value_map_cell[currentValue] )
						}, this)
		
					// delete 临时对象
						delete this._tmp_values
						delete this._tmp_value_map_cell
		
					return return_array
				}

			// 标记表格全部数据列中第一和第二高值的单元格
				mark_high( cacheSortData ){
					let tbody = this.dom.tbody
		
					if( !tbody || !tbody.length )
						tbody = this.dom.table.find('tbody')
		
					let rows = tbody.find('tr.row:visible').not('[data-donotcompare]')
						,sort_data_by_stat = this.sort_data_by_stat
		
					rows.find('td[data-value]').removeClass('sort-first sort-second')
		
					rows.eq(0).find('td[data-value]').each(function(index, element){
						let is_ascending = false
							,$this = $(element)
							,stat = $this.data('stat')
		
						// 以下属性不进行标记，但仍计算排序
							,noMark = stat.match(/\b(speed|range)\b/ )
		
						if( typeof this.sort_default_order_by_stat[stat] == 'undefined' ){
							// 以下属性为升序
								if( stat.match(/\b(consum_fuel|consum_ammo)\b/ ) )
									is_ascending = true
							this.sort_default_order_by_stat[stat] = is_ascending ? 'asc' : 'desc'
						}else{
							is_ascending = this.sort_default_order_by_stat[stat] == 'asc' ? true : false
						}
		
						let sort = this.sort_column( index+1, is_ascending, rows )
							,max = Math.min( 6, Math.ceil(rows.length / 2) + 1 )
		
						if( !noMark && sort.length > 1 && sort[0].length < max ){
							sort[0].addClass('sort-first')
							if( sort.length > 2 && sort[1].length < max )
								sort[1].addClass('sort-second')
						}
						
						console.log(is_ascending, sort)
		
						// 将排序结果存储到表头对应的列中
							if( cacheSortData )
								sort_data_by_stat[stat] = sort
							else
								delete( sort_data_by_stat[stat] )
		
					}.bind(this))
		
					return rows
				}

			// thead td, thead th
			// 点击表头单元格，表格排序
				sort_table_from_theadcell( cell ){
					if( !cell )
						return
					
					let stat = cell.data('stat')
						,sortData = this.sort_data_by_stat[stat]
						
					if( !stat || !sortData )
						return false
		
					if( stat != this.lastSortedStat ){
						if( this.lastSortedHeader )
							this.lastSortedHeader.removeClass('sorting desc asc')
						cell.addClass('sorting')
					}
		
					let order = (stat == this.lastSortedStat && this.lastSortedOrder == 'obverse')
									? 'reverse'
									: 'obverse'
						,i = order == 'reverse' ? sortData.length - 1 : 0
		
					if( this.sort_default_order_by_stat[stat] ){
						let reverse = this.sort_default_order_by_stat[stat] == 'asc' ? 'desc' : 'asc'
						if( order == 'obverse' ){
							cell.removeClass(reverse).addClass(this.sort_default_order_by_stat[stat])
						}else{
							cell.removeClass(this.sort_default_order_by_stat[stat]).addClass(reverse)
						}
					}
		
					this.sortedRow = $()
		
					while( sortData[i] ){
						this._tmpDOM = sortData[i].parent()
						this.sortedRow = this.sortedRow.add( this._tmpDOM )
						this._tmpDOM.appendTo( this.dom.tbody )
						i = order == 'reverse' ? i - 1 : i + 1
					}
		
					// 修改排序提示按钮
						this.dom.btn_compare_sort.removeClass('disabled').html('取消排序')
		
					this.lastSortedStat = stat
					this.lastSortedOrder = order
					this.lastSortedHeader = cell
					delete this._tmpDOM
				}

			// 重置表格排序
				sort_table_restore(){
					if( !this.sortedRow )
						return true
		
					// 还原所有DOM位置
						let parent, arr = []
						this.sortedRow.each(function(index, element){
							var $this = $(element)
								,trIndex = parseInt( $this.data('trindex') )
							parent = parent || $this.parent()
							arr.push({
								'index': 	trIndex,
								'el': 		$this,
								'prev': 	parent.children('tr[data-trindex="' + (trIndex - 1) + '"]')
							})
						})
						// 如果在上一步直接将DOM移动到上一个index行的后方，可能会因为目标DOM也为排序目标同时在当前DOM顺序后，造成结果不正常
						// 故需要两步操作
						arr.sort(function(a, b){
							return a['index']-b['index']
						})
						arr.forEach(function(currentValue){
							currentValue.el.insertAfter( currentValue.prev )
						})
		
					// 修改排序提示按钮
						this.dom.btn_compare_sort.addClass('disabled').html('点击表格标题可排序')
		
					// 重置其他样式
						this.lastSortedHeader.removeClass('sorting desc asc')
		
					delete this.sortedRow
					delete this.lastSortedStat
					delete this.lastSortedOrder
					delete this.lastSortedHeader
					return true
				}
}
Tablelist.index = 0