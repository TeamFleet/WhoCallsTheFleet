/*
舰队数据
	综合选项
		更改舰队模式：单舰队阵型，联合舰队阵型，影响属性计算

图片输出
	允许编辑文字
*/

// 舰队配置
	_frame.infos.__fleet = function( id ){
		return (new InfosFleet(id)).el
	}









class InfosFleet{
	constructor( id ){
		this.el = $('<div class="fleet infos-fleet-body loading"/>')
		this.doms = {}

		this.fleets = []
		//this._updating = false
	
		if( id == '__NEW__' ){
			_db.fleets.insert( _tablelist.prototype._fleets_new_data(), function(err, newDoc){
				if(err){
					_g.error(err)
				}else{
					if( _frame.infos.curContent == 'fleet::__NEW__' )
						_frame.infos.show('[[FLEET::' + newDoc['_id'] + ']]')
						//this.init(newDoc)
				}
			}.bind(this))
		}else{
			_db.fleets.find({
				'_id': 		id
			}, function(err, docs){
				if(err || !docs){
					_g.error(err)
				}else{
					if( _frame.infos.curContent == 'fleet::' + id )
						this.init(docs[0])
				}
			}.bind(this))
		}
	}



	// 初始化内容
	init( d ){
		if( !d )
			return false

		//$.extend(true, this, d)
		this.data = d
		//_g.log(this.data)

		let i = 0

		this.el.attr({
				'data-fleetid': d._id,
				'data-theme':	d.theme
			})
			//.data('fleet', d)
			.removeClass('loading')
		
		// 创建DOM
			$('<header/>')
				.append(
					this.doms['name'] = $('<h3 contenteditable/>')
						.html('点击编辑标题')
						.on({
							'input': function(){
								this.update_data({})
								this.doms['name'].trigger('namechange')
							}.bind(this),
							'focus': function(){
								if( this.doms['name'].text() == '点击编辑标题' )
									this.doms['name'].html('')
							}.bind(this),
							'blur': function(){
								if( !this.doms['name'].text() )
									this.doms['name'].html('点击编辑标题')
							}.bind(this),
							'namechange': function(e, content){
								if( typeof content == 'undefined' ){
									content = this.doms['name'].text()
								}
								
								this._name = content
								return this.doms['name']
							}.bind(this),
							'keydown': function(e){
								if( e.keyCode == 13 )
									this.doms['name'].blur()
							}.bind(this)
						})
				)
				.append(
					this.doms['user'] = $('<button/>')
				)
				.appendTo(this.el)
	
			$('<div class="fleets"/>')
				.append(
					this.doms['tabs'] = $('<div class="tabs"/>')
				)
				.append(
					this.doms['options'] = $('<div class="options"/>')
						.append(
							this.doms['theme'] = $('<select class="option option-theme-value"/>')
								.on('change', function(){
									this._theme = this.doms['theme'].val()
								}.bind(this))
								.append(function(){
									let els = $()
									for( let j=1; j<11; j++ ){
										els = els.add(
											$('<option/>',{
												'value':	j,
												'html':		'主题-'+j
											})
										)
									}
									return els
								})
						)
						.append(
							this.doms['themeOption'] = $('<button class="option option-theme"/>').html('主题').on('click', function(){
								if( !InfosFleet.menuTheme ){
									InfosFleet.menuThemeItems = $('<div/>')
									for(let i=1; i<11; i++){
										$('<button class="theme-' + i + '"/>').html(i)
											.on('click', function(){
												InfosFleet.menuThemeCur._theme = i
												this.el.attr('data-theme', this._theme)
											}.bind(this))
											.appendTo(InfosFleet.menuThemeItems)
									}
									InfosFleet.menuTheme = new _menu({
										'className': 'contextmenu-infos_fleet_themes',
										'items': [InfosFleet.menuThemeItems]
									})
								}
								InfosFleet.menuThemeCur = this
								InfosFleet.menuTheme.show(this.doms['themeOption'])
							}.bind(this))
						)
						.append(
							$('<button class="option"/>').html('导出配置代码').on('click', function(){
								this.modalExport_show()
							}.bind(this))
						)
						.append(
							$('<button class="option"/>').html('导出配置文本').on('click', function(){
								this.modalExportText_show()
							}.bind(this))
						)
						/*
						.append(
							$('<span class="option"/>').html('[PH] 阵型')
						)
						.append(
							$('<span class="option"/>').html('[PH] 导出图片')
						)
						*/
				)
				.appendTo(this.el)
	
			this.doms['ships'] = $('<div class="ships"/>').appendTo(this.el)
	
			// 4个分舰队
				while(i < 4){
					this.fleets[i] = new InfosFleetSubFleet(this, [])

					$('<input/>',{
							'type': 	'radio',
							'name': 	'fleet_' + d._id + '_tab',
							'id': 		'fleet_' + d._id + '_tab_' + i,
							'value': 	i
						}).prop('checked', (i == 0)).prependTo( this.el )
			
					$('<label/>',{
							'for': 		'fleet_' + d._id + '_tab_' + i,
							'data-fleet':i,
							'html': 	'#' + (i+1)
						}).appendTo( this.doms['tabs'] )

					this.fleets[i].el
						.attr('data-fleet', i)
						.appendTo( this.doms['ships'] )

					i++
				}

		// 根据数据更新DOM
			this.update( d )
	}



	// 根据数据更新内容
	update( d ){
		this._updating = true
		d = d || {}

		// 主题颜色
			if( typeof d['theme'] != 'undefined' ){
				_frame.infos.dom.main.attr('data-theme', d['theme'])
				this.doms['theme'].val(d['theme']).attr('value', d['theme'])
			}

		// 标题
			if( typeof d['name'] != 'undefined' )
				this.doms['name'].trigger('namechange',[d['name']]).trigger('blur')

		// 分舰队
			if( d['data'] && d['data'].push ){
				d['data'].forEach(function(currentValue, i){
					//_g.log(currentValue)
					this.fleets[i].updateEl(currentValue)
				}, this)
			}
		
		this._updating = false
	}



	// 每个操作都会更新数据，并触发更新数据库倒计时
	update_data( d ){
		d = d || {}
		this.update(d)
	}



	// 更新数据库



	
	// 舰队名
		get _name(){
			return this.data['name']
		}
		set _name( value ){
			this.data['name'] = value
			this.doms['name'].html(value)

			if( value ){
				this.doms['name'].attr('data-content', value)
			}else{
				this.doms['name'].removeAttr('data-content')
			}
			
			this.save()
		}

	// 主题
		get _theme(){
			return this.data['theme']
		}
		set _theme( value ){
			this.data['theme'] = value || 1
			this.doms['theme'].val(this.data['theme']).attr('value', this.data['theme'])
			_frame.infos.dom.main.attr('data-theme', this.data['theme'])
			this.el.attr('data-theme', this.data['theme'])
			this.save()
		}
	
	// 保存
		save( not_save_to_file ){
			if( this._updating )
				return this
			
			this.fleets.forEach(function(currentValue, i){
				this.data.data[i] = currentValue.data
			}, this)
			
			// 更新时间
			this.data.time_modify = _g.timeNow()
			
			// 清理Array中的null值
			/*
			let deleteNull = function(arr){
				if( arr && arr.length && arr.push ){
					arr.forEach(function(value, i){
						if( value === null ){
							delete arr[i]
							console.log(arr)
						}
						if( value && value.length && value.push )
							deleteNull(value)
					})
				}
			}
			deleteNull(this.data.data)
			
			//_g.log(this)
			_g.log(JSON.stringify(this.data.data))
			*/
			
			if( !not_save_to_file )
				_db.fleets.updateById(this.data._id, this.data, function(){
					_g.log('saved')
				})
			return this
		}
	
	// 浮动窗口
		modalExport_show(){
			InfosFleet.modalExport_show(this.data)
		}
		modalExportText_show(){
			InfosFleet.modalExportText_show(this.data)
		}
}
InfosFleet.modalExport = function(curval){
	if( !InfosFleet.elModalExport ){
		InfosFleet.elModalExport = $('<div/>')
			.append(
				InfosFleet.elModalExportTextarea = $('<textarea/>',{
					'readonly': true
				})
			)
			.append(
				$('<p class="note-codeusage"/>').html('* 该配置代码可用于<a href="http://www.kancolle-calc.net/deckbuilder.html">艦載機厨デッキビルダー</a>')
			)
			.append(
				$('<button class="button"/>').html('复制到剪切板')
					.on('click', function(){
						node.clipboard.set(InfosFleet.elModalExportTextarea.val(), 'text');
					})
			)
	}
	InfosFleet.elModalExportTextarea.val(curval || '')
	
	return InfosFleet.elModalExport
}
InfosFleet.modalExport_show = function(data){
	data = data.data || []

	data = JSON.stringify(data)
	while( data.indexOf(',null]') > -1 )
		data = data.replace(/\,null\]/g,']')
	while( data.indexOf('[null]') > -1 )
		data = data.replace(/\[null\]/g,'[]')

	_frame.modal.show(
		InfosFleet.modalExport(data),
		'导出配置代码',
		{
			'classname': 	'infos_fleet infos_fleet_export'
		}
	)
}
InfosFleet.modalExportText_show = function(data){
	if( !data )
		return false
	
	let text = ''
		,fleets = data.data.filter(function(value){
						return value.length
					}) || []
	
	text+= data.name || ''
	
	fleets.forEach(function(fleet, i){
		console.log(fleet)
		text+= (text ? '\n' : '')
			+ ( fleets.length > 1 ? '\n第 ' + (i+1) + ' 舰队' : '')
		fleet.filter(function(value){
			return value.length > 0 && value[0] 
		}).forEach(function(ship, j){
			text+= '\n'
				+ '(' + (i ? (i+1) + '-' : '') + (j+1) + ')'
				+ _g.data.ships[ship[0]]._name
				+ ( ship[1] && ship[1][0] ? ' Lv.' + ship[1][0] : '' )
			let equipments = ship[2] || []
				,stars = ship[3] || []
				,ranks = ship[4] || []
			equipments.filter(function(value){
				return value
			}).forEach(function(equipment, k){
				text+= (!k ? ' | ' : ', ')
					+ _g.data.items[equipment]._name
					+ (stars[k] ? '★'+stars[k] : '')
					+ (ranks[k] ? '['+_g.textRank[ranks[k]]+']' : '')
			})
		})
	})
	
	text+= (text ? '\n\n' : '')
		+ '* 创建自 是谁呼叫舰队 (fleet.diablohu.com)'

	_frame.modal.show(
		InfosFleet.modalExport(text),
		'导出配置文本',
		{
			'classname': 	'infos_fleet infos_fleet_export mod-text'
		}
	)
}







// 类：子舰队
class InfosFleetSubFleet{
	constructor(infosFleet, d){
		d = d || []
		this.data = d

		this.el = $('<dl class="fleetinfos-ships"/>')
		
		this.ships = []

		// 6个舰娘
			let i = 0
			while( i < 6 ){
				this.ships[i] = new InfosFleetShip(infosFleet, this, i)
				this.ships[i].getEl().appendTo( this.el )
				//$('<s/>').appendTo( this.el )
				i++
			}
		
		// 舰队综合属性
			this.elSummary = $('<span class="summary"/>')
				//.html('<h4 data-content="舰队数据">舰队数据</h4>')
				.appendTo( this.el )
				.append(
					$('<span class="summary-item"/>')
						.html('航速')
						.append(
							this.elSummarySpeed = $('<strong/>').html('-')
						)
				)
				.append(
					$('<span class="summary-item"/>')
						.html('制空战力')
						.append(
							this.elSummaryFighterPower = $('<strong/>').html('-')
						)
				)
				/*
				.append(
					$('<span class="summary-item"/>')
						.html('索敌能力')
						.append(
							this.elSummaryLOS = $('<strong/>')
						)
				)*/
		
		this.infosFleet = infosFleet

		this.updateEl()
	}


	// 更新元数据
	
	// 根据元数据更新页面元素
		updateEl(d){
			this.data = d || this.data
			if( d )
				d.forEach(function(currentValue, i){
					this.ships[i].updateEl(currentValue)
				}, this)
		}
	
	// 获取当前状态的元数据
		getData(){
			return this.data
		}
	
	// 遍历该子舰队下全部装备，计算相关舰队数据
		summaryCalc(){
			if( this.summaryCalculating )
				return false
			
			this.summaryCalculating = setTimeout(function(){
				let fighterPower = 0
					,fleetSpeet = 'fast'
				
				this.ships.forEach(function(shipdata){
					if( shipdata.data[0] ){
						let ship = _g.data.ships[shipdata.data[0]]
						
						// 计算：航速
							if( ship.stat.speed < 10 )
								fleetSpeet = 'slow'
						
						// 计算：制空战力
							fighterPower+= shipdata.calculate('fighterPower')
					}
				})
				
				this.elSummarySpeed.html( fleetSpeet == 'fast' ? '高速' : '低速' )
				
				this.elSummaryFighterPower.html( Math.floor(fighterPower) )
				if( fighterPower > 0 )
					this.elSummaryFighterPower.removeClass('empty')
				else
					this.elSummaryFighterPower.addClass('empty')

				this.summaryCalculating = null
			}.bind(this), 10)
		}



	
	// 保存
		save(){
			// 如果该子舰队下没有任何数据，则存储数据时不传输该子舰队数据
			let allEmpty = true
			this.data = this.data || []
			
			this.ships.forEach(function(currentValue,i){
				this.data[i] = currentValue.data
				
				if( currentValue.data[0] )
					allEmpty = false
			}, this)
			
			if( allEmpty )
				this.data = null
			
			if( this.infosFleet )
				this.infosFleet.save()
		}
}







// 类：舰娘
class InfosFleetShip{
	constructor(infosFleet, infosFleetSubFleet, index, d){
		// 数据结构
		/* [
				STRING 舰娘ID,
				[
					NUMBER 等级,
					NUMBER 运，如果没有特殊指定则为 -1
				],
				[
					NUMBER 装备ID,	// 实际装备
					...
				],
				[
					NUMBER 改修星级,	// 实际装备
					...
				],
				[
					NUMBER 熟练度, 	// 实际装备
				]
			]*/
		// 数据实例
		// ["319",[91,40],[50,58,58,101],[7,6,0,0]]
		// ["144",[96,-1],[122,29,88],[1,0,0]
		// ["145",[96,-1],[122,29,29],[]]
		// ["403",[83,-1],[127,58],[0,0]]
		
		// 数据正在更新中，禁止触发任何存储操作
		//this._updating = false

		if( this.el )
			return this.el

		d = d || [null, [null, -1], [], [], []]
		this.data = d
		this.infosFleet = infosFleet
		this.infosFleetSubFleet = infosFleetSubFleet		
		this.equipments = []
		this.index = index
		
		this.el = $('<dd class="noship"/>')
			// 头像 & 名称
			.append(
				$('<dt/>')
					.append(
						this.elAvatar = $('<s draggable="true"/>').on({
							'dragstart': function(e){
								e.preventDefault()
								if( this.data[0] )
									InfosFleetShip.dragStart( this )
							}.bind(this)
						})
					)
					.append(
						this.elInfos = $('<div/>').html('<span>选择舰娘...</span>')
							.append(
								this.elInfosTitle = $('<div class="title"/>')
							)
							.append(
								$('<div class="info"/>')
									.append(
										$('<label/>').html('Lv.')
											.append(
												this.elInputLevel = $('<input/>',{
													'type':	'number',
													'min':	0,
													'max':	150
												}).on({
													'change': function(e){
														let value = this.elInputLevel.val()
														
														if( (typeof value == 'undefined' || value === '') && this.data[1][0] )
															this.shipLv = null
														
														value = parseInt(value)
														if( !isNaN(value) && this.data[1][0] != value )
															this.shipLv = value
													}.bind(this)
												})
											)
									)
									.append(
										this.elInfosInfo = $('<span/>')
									)
							)
					)
			)
			// 装备
			.append(
				$('<div class="equipments"/>').append(function(){
					let els = $()
					for( let i=0; i<4; i++ ){
						this.equipments[i] = new InfosFleetShipEquipment(this, i)
						els = els.add(this.equipments[i].el)
					}
					return els
				}.bind(this))
			)
			// 属性
			.append(
				$('<div class="attributes"/>')
					.append(
						this.elAttrShelling = $('<span class="shelling"/>').html('-')
					)
					.append(
						this.elAttrTorpedo = $('<span class="torpedo"/>').html('-')
					)
					.append(
						this.elAttrHitSum = $('<span class="hitsum"/>').html('-')
					)
				/*
					.append($('<span class="shelling"/>').html('炮击力').append(
						this.elAttrShelling = $('<strong/>').html('-')
					))
					*/
			)
			// 选项/操作
			.append(
				$('<div class="options"/>')
					.append(
						this.elBtnOptions = $('<button class="options"/>').on('click', function(e){
								this.showMenu()
							}.bind(this))
					)
				/*
					.append(
						$('<button/>',{
							'html':			'i',
							'data-tip':		'查看资料'
						}).on('click', function(e){
								_frame.infos.show('[[SHIP::'+this.shipId+']]', $(this))
								e.stopPropagation()
							}.bind(this))
					)
					.append(
						$('<button/>').html('×')
							.on('click', function(e){
								this.shipId = null
								e.preventDefault()
								e.stopPropagation()
							}.bind(this))
					)*/
			)
			// 事件
			.on({
				// [点击] 无舰娘时，选择舰娘
					'click': function(){
						if( !this.data[0] )
							this.selectShipStart()
					}.bind(this),
					
					'mouseenter': function(e){
						InfosFleetShip.dragEnter(this)
					}.bind(this)
			})
		
		this.after = $('<s/>')
		
		this.els = this.el.add(this.after)

		//this.updateEl()
	}
	
	// 返回页面元素
		getEl(){
			return this.els
		}
	
	// 开始选择
		selectShipStart(){
			_g.log('开始选择舰娘')

			//_frame.infos.hide()
			//_frame.app_main.cur_page = null
			_frame.app_main.load_page('ships', {
				callback_modeSelection_select:		function(id){
					history.back()
					this.shipId = id
					this.shipLv = null
					if( this.infosFleet )
						_frame.infos.dom.main.attr('data-theme', this.infosFleet.data['theme'])
				}.bind(this)
			})
		}
	
	// 更改运
		changeLuck(luck){
			this.data[1][1] = luck || -1
		}
	
	// 计算并显示属性
		updateAttrs(){
			this.elAttrShelling.html( this.calculate('shellingDamage') )
			this.elAttrTorpedo.html( this.calculate('torpedoDamage') )
			this.elAttrHitSum.html( this.calculate('hitSum') )
		}
	
	// 单项属性计算
		calculate(type){
			if( Formula[type] )
				return Formula[type]( this.shipId, this.data[2], this.data[3], this.data[4] )
			return null
		}

	// 更新元数据
	
	// 根据元数据更新页面元素
		updateEl(d){
			this._updating = true
			
			this.data = d || this.data
		
			if( typeof this.data[0] == 'string' )
				this.data[0] = parseInt(this.data[0])
			if( !this.data[2] )
				this.data[2] = []
			if( !this.data[3] )
				this.data[3] = []
			if( !this.data[4] )
				this.data[4] = []
			
			if( this.data[0] )
				this.shipId = this.data[0]
			
			if( this.data[1][0] )
				this.shipLv = this.data[1][0]
			
			for( let i=0; i<4; i++ ){
				this.equipments[i].id = this.data[2][i]
				this.equipments[i].star = this.data[3][i]
				this.equipments[i].rank = this.data[4][i]
			}
			
			this.updateAttrs()
			
			this._updating = false
		}
	
	// 获取当前状态的元数据
		getData(){
			return this.data
		}
	
	// 显示舰娘相关操作菜单
		showMenu(){
			InfosFleetShip.menuCurObj = this
		
			if( !InfosFleetShip.menu ){
				InfosFleetShip.menuItems = [
					$('<menuitem class="move move-up"/>').html(' ')
						.on({
							'click': function(e){
								InfosFleetShip.menuCurObj.moveUp()
							},
							'show': function(){
								if( InfosFleetShip.menuCurObj.index )
									InfosFleetShip.menuItems[0].removeClass('disabled')
								else
									InfosFleetShip.menuItems[0].addClass('disabled')
							}
						}),
					$('<menuitem class="move move-down"/>').html(' ')
						.on({
							'click': function(e){
								InfosFleetShip.menuCurObj.moveDown()
							},
							'show': function(){
								if( InfosFleetShip.menuCurObj.index < 5 )
									InfosFleetShip.menuItems[1].removeClass('disabled')
								else
									InfosFleetShip.menuItems[1].addClass('disabled')
							}
						}),
					
					$('<hr/>'),
					
					$('<menuitem/>').html('查看资料')
						.on({
							'show': function(){
								InfosFleetShip.menuItems[3].attr(
									'data-infos',
									'[[SHIP::'+InfosFleetShip.menuCurObj.shipId+']]'
								)
							}
						}),
						
					$('<menuitem/>').html('移除')
						.on({
							'click': function(e){
								InfosFleetShip.menuCurObj.shipId = null
							}
						}),
						
					$('<menuitem/>').html('替换为 ...')
						.on({
							'click': function(e){
								InfosFleetShip.menuCurObj.selectShipStart()
							}
						}),
						
					$('<div/>').on('show', function(){
						var $div = InfosFleetShip.menuItems[6].empty()
						if( InfosFleetShip.menuCurObj.shipId ){
							var series = _g['data']['ships'][InfosFleetShip.menuCurObj.shipId].getSeriesData() || []
							if( series.length > 1 ){
								series.forEach(function(currentValue, i){
									if( !i )
										$div.append($('<hr/>'))
									if( currentValue['id'] != InfosFleetShip.menuCurObj.shipId )
									$div.append(
										$('<menuitem/>')
											.html('替换为 ' + _g['data']['ships'][currentValue['id']].getName(true))
											.on({
												'click': function(){
													InfosFleetShip.menuCurObj.shipId = currentValue['id']
												}
											})
									)
								})
							}
						}
					})
				]
				InfosFleetShip.menu = new _menu({
					'className': 'contextmenu-ship',
					'items': InfosFleetShip.menuItems
				})
			}
		
			InfosFleetShip.menu.show(this.elBtnOptions)
		}
	
	// 移动
		swap(target, save){
			if( typeof target == 'number' )
				target = this.infosFleetSubFleet.ships[target]

			if( this.index > target.index ){
				this.el.insertBefore(target.el)
			}else{
				this.el.insertAfter(target.after)
			}
			this.after.insertAfter(this.el)
			
			let newIndex_dragging = target.index
				,newIndex_enter = this.index
			
			console.log(newIndex_dragging, newIndex_enter)
			
			this.index = newIndex_dragging
			target.index = newIndex_enter
			this.infosFleetSubFleet.ships[newIndex_dragging] = this
			this.infosFleetSubFleet.ships[newIndex_enter] = target
			
			if( save )
				this.save()
		}
		moveUp(){
			if( this.index <= 0 )
				return
			
			this.swap( this.index - 1, true )
		}
		moveDown(){
			if( this.index >= 5 )
				return
			
			this.swap( this.index + 1, true )
		}
	
	
	
	// 舰娘ID
		get shipId(){
			return this.data[0]
		}
		set shipId( value ){
			if( value != this.data[0] ){
				this.data[0] = value
				this.shipLv = null
			}
			
			if( value ){
				let ship = _g.data.ships[value]
					,suffix = ship.getSuffix()
					,speed = ship._speed
					,stype = ship._type
				
				stype = stype.replace(speed, '')
					
				this.el.attr('data-shipId', value)
				this.el.removeClass('noship')
				this.elAvatar.html('<img src="' + ship.getPic(10) + '"/>')
				this.elInfosTitle.html('<h4 data-content="'+ship['name'][_g.lang]+'">' +ship['name'][_g.lang]+'</h4>'
										+ ( suffix
											? '<h5 data-content="'+suffix+'">' +suffix+'</h5>'
											: ''
										)
									)
				this.elInfosInfo.html( speed + ' ' + stype )
				
				// 装备栏数据
					for( let i=0; i<4; i++ ){
						this.equipments[i].carry = ship.slot[i]
						if( !this._updating ){
							this.equipments[i].id = null
							this.equipments[i].star = null
							this.equipments[i].rank = null
						}
					}
			}else{
				this.el.removeAttr('data-shipId')
				this.el.addClass('noship')
				this.elAvatar.html('')
				this.data[2] = []
				this.data[3] = []
				this.data[4] = []
				// [null, [null, -1], [], [], []]
			}
			
			this.save()
		}
	
	// 舰娘等级
		get shipLv(){
			return this.data[1][0]
		}
		set shipLv( value ){
			this.data[1][0] = value || null
			if( value && value > 0 ){
				this.elInputLevel.val( value )
			}else{
				this.elInputLevel.val('')
			}
			//this.el.attr('data-shipLv', value)
			
			this.save()
		}
	
	// 舰娘运
	
	// 保存
		save(){
			this.infosFleetSubFleet.summaryCalc()

			if( this._updating )
				return false

			if( this._saveTimeout )
				return false
			
			this._saveTimeout = setTimeout(function(){
				// 计算属性
					this.updateAttrs()
				
				if( this.infosFleetSubFleet )
					this.infosFleetSubFleet.save()
				
				this._saveTimeout = null
			}.bind(this), 100)
		}
}
InfosFleetShip.dragStart = function(infosFleetShip){
	if( InfosFleetShip.dragging || !infosFleetShip )
		return false

	InfosFleetShip.dragging = infosFleetShip
	infosFleetShip.el.css('opacity', '.5')
	
	if( !InfosFleetShip.isInit ){
		$body.on({
			'mouseup.InfosFleetShip_dragend': function(){
				if( InfosFleetShip.dragging ){
					InfosFleetShip.dragging.el.css('opacity', '')
					InfosFleetShip.dragging.save()
					InfosFleetShip.dragging = null
				}
			}
		})
		InfosFleetShip.isInit = true
	}
}
InfosFleetShip.dragEnter = function(infosFleetShip_enter){
	if( !InfosFleetShip.dragging || !infosFleetShip_enter || InfosFleetShip.dragging == infosFleetShip_enter )
		return false
	
	InfosFleetShip.dragging.swap(infosFleetShip_enter)
}







// 类：装备
class InfosFleetShipEquipment{
	constructor(infosFleetShip, index){
		// 数据结构
		/* [
				STRING 舰娘ID,
				[
					NUMBER 等级,
					NUMBER 运，如果没有特殊指定则为 -1
				],
				[
					NUMBER 装备ID,	// 实际装备
					...
				],
				[
					NUMBER 改修星级,	// 实际装备
					...
				]
			]*/
		// 数据实例
		// ["319",[91,40],[50,58,58,101],[7,6,0,0]]
		// ["144",[96,-1],[122,29,88],[1,0,0]
		// ["145",[96,-1],[122,29,29],[]]
		// ["403",[83,-1],[127,58],[0,0]]

		// 直接对 infosFleetShip.data 相关数据进行读写 
		
		this.index = index || 0
		this.infosFleetShip = infosFleetShip
		
		// 数据正在更新中，禁止触发任何存储操作
		//this._updating = false

		if( this.el )
			return this.el
		
		this.el = $('<div class="equipment"/>')
					.append(
						this.elCarry = $('<div class="equipment-layer equipment-add"/>')
										.on('click', function(){
											this.selectEquipmentStart()
										}.bind(this))
					)
					.append(
						$('<div class="equipment-layer equipment-infos"/>')
							.append(
								this.elName = $('<span class="equipment-name"/>')
							)
							.append(
								this.elStar = $('<span class="equipment-star"/>').html(0)
							)
							.append(
								this.elRank = $('<span class="equipment-rank"/>')
							)
							.append(function(){
								let el = $('<span class="equipment-carry"/>').html(0)
								this.elCarry = this.elCarry.add( el )
								return el
							}.bind(this))
					)
					.append(
						$('<div class="equipment-layer equipment-options"/>')
							.append(
								this.elInputStar = $('<input/>',{
									'class':		'equipment-starinput',
									'type':			'number',
									'placeholder':	0
								}).on('input', function(){
									let value = this.elInputStar.val()
									
									if( (typeof value == 'undefined' || value === '') && this.star )
										this.star = null
									
									value = parseInt(value)
									if( !isNaN(value) && this.star != value )
										this.star = value
								}.bind(this))				
							)
							.append(
								this.elSelectRank = $('<div/>',{
									'class':	'equipment-rankselect',
									'html': 	'<span>无</span>'
								}).on('click', function(){
									if( !InfosFleet.menuRankSelect ){
										InfosFleet.menuRankSelectItems = $('<div/>')
										for(let i=0; i<8; i++){
											$('<button class="rank-' + i + '"/>')
												.html( !i ? '无' : '' )
												.on('click', function(){
													InfosFleet.menuRankSelectCur.rank = i
												})
												.appendTo(InfosFleet.menuRankSelectItems)
										}
										InfosFleet.menuRankSelect = new _menu({
											'className': 'contextmenu-infos_fleet_rank_select',
											'items': [InfosFleet.menuRankSelectItems]
										})
									}
									InfosFleet.menuRankSelectCur = this
									InfosFleet.menuRankSelect.show(this.elSelectRank)
								}.bind(this))				
							)
							.append(
								//this.elButtonInspect = $('<button class="inspect"/>').html('资料').on('click', function(){
								this.elButtonInspect = $('<button class="inspect" icon="search"/>').on('click', function(){
									if( this.id )
										_frame.infos.show('[[EQUIPMENT::' + this.id + ']]')
								}.bind(this))
							)
							.append(
								//$('<button class="change"/>').html('更变').on('click',function(){
								$('<button class="change" icon="loop"/>').on('click',function(){
									this.selectEquipmentStart()
								}.bind(this))
							)
							.append(
								$('<button class="remove"/>').html('×').on('click',function(){
									this.id = null
								}.bind(this))
							)
					)
	}
	
	// 返回页面元素
		getEl(){
			return this.el
		}
	
	// 开始选择
		selectEquipmentStart(){
			_g.log('开始选择装备')

			_frame.app_main.load_page('equipments', {
				callback_modeSelection_select: function(id){
					history.back()
					this.id = id
					this.star = 0
					this.rank = 0
					TablelistEquipments.types = []
					TablelistEquipments.shipId = null
					if( this.infosFleetShip.infosFleet )
						_frame.infos.dom.main.attr('data-theme', this.infosFleetShip.infosFleet.data['theme'])
				}.bind(this),
				callback_modeSelection_enter: function(){
					TablelistEquipments.types = _g.data.ships[this.infosFleetShip.shipId].getEquipmentTypes()
					TablelistEquipments.shipId = this.infosFleetShip.shipId
					_frame.app_main.page['equipments'].object.tablelistObj.apply_types()
				}.bind(this)
			})
		}
	
	// 获取当前状态的元数据
		getData(){
			return this.data
		}
	
	
	
	// 装备ID
		get id(){
			return this.infosFleetShip.data[2][this.index]
		}
		set id( value ){
			value = parseInt(value) || null
			//this.star = 0
			_p.tip.hide()
			this.el.removeData(['tip', 'tip-filtered'])
			
			if( value != this.infosFleetShip.data[2][this.index] )
				this.star = 0
			
			if( value && !isNaN(value) ){
				this.infosFleetShip.data[2][this.index] = value
				this.improvable = _g.data.items[value].improvable || false
				this.el.attr({
							'data-equipmentid': value,
							'data-tip':			'[[EQUIPMENT::' +value+ ']]'
						})
						.css('background-image', 'url('+_g.data.items[value]._icon+')')
				this.elName.html(_g.data.items[value]._name)
				// 如果装备为飞行器，标记样式
					if( $.inArray(_g.data.items[value].type, _g.data.item_type_collections[3].types) > -1 )
						this.el.addClass('is-aircraft')
					else
						this.el.removeClass('is-aircraft')
			}else{
				this.infosFleetShip.data[2][this.index] = null
				this.improvable = false
				this.el.removeAttr('data-equipmentId')
						.removeAttr('data-tip')
						.css('background-image', '')
						.removeClass('is-aircraft')
				this.elName.html('')
			}
			
			this.infosFleetShip.infosFleetSubFleet.summaryCalc()
			this.save()
		}
	
	// 改修星级
		get star(){
			return this.infosFleetShip.data[3][this.index]
		}
		set star( value ){
			if( this._improvable ){
				value = parseInt(value) || null
				
				if( value > 10 )
					value = 10
				
				if( value < 0 )
					value = 0
				
				if( value ){
					this.infosFleetShip.data[3][this.index] = value
					this.elInputStar.val( value )
					this.elStar.html(value)
					this.el.attr('data-star', value)
				}else{
					this.infosFleetShip.data[3][this.index] = null
					this.elInputStar.val('')
					this.elStar.html(0)
					this.el.attr('data-star', '')
				}
				
			}else{
				this.infosFleetShip.data[3][this.index] = null
				this.el.removeAttr('data-star')
			}
			this.infosFleetShip.infosFleetSubFleet.summaryCalc()
			this.save()
		}
	
	// 熟练度
		get rank(){
			return this.infosFleetShip.data[4][this.index]
		}
		set rank( value ){
			if( this.id && $.inArray(_g.data.items[this.id].type, _g.data.item_type_collections[3].types) > -1 ){
				value = parseInt(value) || null
				
				if( value > 7 )
					value = 7
				
				if( value < 0 )
					value = 0
				
				if( value ){
					this.infosFleetShip.data[4][this.index] = value
					this.el.attr('data-rank', value)
				}else{
					this.infosFleetShip.data[4][this.index] = null
					this.el.attr('data-rank', '')
				}
				
			}else{
				this.infosFleetShip.data[4][this.index] = null
				this.el.removeAttr('data-rank')
			}
			this.infosFleetShip.infosFleetSubFleet.summaryCalc()
			this.save()
		}
	
	// 搭载数 & 是否可用
		set carry(value){
			if( typeof value == 'undefined' ){
				this.el.removeAttr('data-carry')
				this.elCarry.html(0)
			}else{
				value = parseInt(value) || 0
				this.el.attr('data-carry', value)
				this.elCarry.html(value)
			}
		}
	
	// 是否可改修
		set improvable(value){
			if( !value ){
				this.el.removeAttr('data-star')
				this.elInputStar.prop('disabled', true)
								.attr('placeholder', '--')
				this._improvable = false
			}else{
				this.el.attr('data-star', '')
				this.elInputStar.prop('disabled', false)
								.attr('placeholder', '0')
				this._improvable = true
			}
		}
	
	// 保存
		save(){
			if( this._updating )
				return false
			if( this.infosFleetShip ){
				//this.infosFleetShip.data[2][this.index] = this.id
				//this.infosFleetShip.data[3][this.index] = this.star
				this.infosFleetShip.save()
			}
		}
}