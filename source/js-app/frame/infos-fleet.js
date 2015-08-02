// 舰队配置
	_frame.infos.__fleet = function( id ){
		return (new InfosFleet(id)).el
	}









class InfosFleet{
	constructor( id ){
		var self = this
		
		this.el = $('<div class="fleet loading"/>')
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
						//self.init(newDoc)
				}
			})
		}else{
			_db.fleets.find({
				'_id': 		id
			}, function(err, docs){
				if(err || !docs){
					_g.error(err)
				}else{
					if( _frame.infos.curContent == 'fleet::' + id )
						self.init(docs[0])
				}
			})
		}
	}



	// 初始化内容
	init( d ){
		if( !d )
			return false

		//$.extend(true, this, d)
		//_g.log(this)
		this.data = d

		let self = this
			,i = 0

		this.el.attr({
				'data-fleetid': d._id,
				'data-theme':	d.theme
			})
			//.data('fleet', d)
			.removeClass('loading')
		
		// 创建DOM
			$('<header/>')
				.append(
					self.doms['name'] = $('<h3 contenteditable/>')
						.html('点击编辑标题')
						.on({
							'input': function(){
								self.update_data({})
								self.doms['name'].trigger('namechange')
							},
							'focus': function(){
								if( self.doms['name'].text() == '点击编辑标题' )
									self.doms['name'].html('')
							},
							'blur': function(){
								if( !self.doms['name'].text() )
									self.doms['name'].html('点击编辑标题')
							},
							'namechange': function(e, content){
								if( typeof content == 'undefined' ){
									content = self.doms['name'].text()
								}
								
								self._name = content
								return self.doms['name']
							}
						})
				)
				.append(
					self.doms['user'] = $('<button/>')
				)
				.appendTo(self.el)
	
			$('<div class="fleets"/>')
				.append(
					self.doms['tabs'] = $('<div class="tabs"/>')
				)
				.append(
					self.doms['options'] = $('<div class="options"/>')
						.append(
							self.doms['theme'] = $('<select class="option-theme"/>')
								.on('change', function(){
									self._theme = self.doms['theme'].val()
								})
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
							$('<span/>').html('[PH] 阵型')
						)
						.append(
							$('<span/>').html('[PH] 颜色')
						)
						.append(
							$('<span/>').html('[PH] 分享')
						)
				)
				.appendTo(self.el)
	
			this.doms['ships'] = $('<div class="ships"/>').appendTo(self.el)
	
			// 4个分舰队
				while(i < 4){
					self.fleets[i] = new InfosFleetSubFleet(self, self.data[i] || [])

					$('<input/>',{
							'type': 	'radio',
							'name': 	'fleet_' + d._id + '_tab',
							'id': 		'fleet_' + d._id + '_tab_' + i,
							'value': 	i
						}).prop('checked', (i == 0)).prependTo( self.el )
			
					$('<label/>',{
							'for': 		'fleet_' + d._id + '_tab_' + i,
							'data-fleet':i,
							'html': 	'#' + (i+1)
						}).appendTo( self.doms['tabs'] )

					self.fleets[i].el
						.attr('data-fleet', i)
						.appendTo( self.doms['ships'] )

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
				this.doms['theme'].val(d['theme'])
			}

		// 标题
			if( typeof d['name'] != 'undefined' )
				this.doms['name'].trigger('namechange',[d['name']]).trigger('blur')

		// 分舰队
			if( d['data'] && d['data'].push ){
				for(let i in d['data']){
					//_g.log(d['data'][i])
					this.fleets[i].updateEl(d['data'][i])
				}
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
			_frame.infos.dom.main.attr('data-theme', value)			
			this.save()
		}
	
	// 保存
		save(){
			if( this._updating )
				return this
			
			for(let i in this.fleets){
				this.data.data[i] = this.fleets[i].data
			}
			
			// 更新时间
			this.data.time_modify = _g.timeNow()
			
			// 更新TablelistFleetItem
			/*
			try{
				for(let i in _g.data.fleets_tablelist.items[this.data._id]){
					_g.data.fleets_tablelist.items[this.data._id][i].update(this.data)
				}
			}catch(e){}
			*/
			
			//_g.log(this)
			_db.fleets.updateById(this.data._id, this.data, function(){
				_g.log('saved')
			})
			return this
		}
}







// 类：子舰队
class InfosFleetSubFleet{
	constructor(infosFleet, d){
		const self = this

		d = d || []
		this.data = d

		this.el = $('<dl/>')
		
		this.ships = []

		// 6个舰娘
			let i = 0
			while( i < 6 ){
				self.ships[i] = new InfosFleetShip(infosFleet, self, self.data[i] || null)
				self.ships[i].getEl().appendTo( self.el )
				$('<s/>').appendTo( self.el )
				i++
			}
		
		// 舰队综合属性
			this.elSummary = $('<span/>').appendTo( this.el )
		
		this.infosFleet = infosFleet

		this.updateEl()
	}


	// 更新元数据
	
	// 根据元数据更新页面元素
		updateEl(d){
			this.data = d || this.data
			for(let i in d){
				this.ships[i].updateEl(d[i])
			}
		}
	
	// 获取当前状态的元数据
		getData(){
			return this.data
		}



	
	// 保存
		save(){
			for(let i in this.ships){
				this.data[i] = this.ships[i].data
			}
			
			if( this.infosFleet )
				this.infosFleet.save()
		}
}







// 类：舰娘
class InfosFleetShip{
	constructor(infosFleet, infosFleetSubFleet, d){
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

		const self = this
		
		// 数据正在更新中，禁止触发任何存储操作
		//this._updating = false

		if( this.el )
			return this.el

		d = d || [null, [null, -1], [], []]
		this.data = d
		this.infosFleet = infosFleet
		this.infosFleetSubFleet = infosFleetSubFleet		
		this.equipments = []
		
		this.el = $('<dd class="noship"/>')
			// 头像 & 名称
			.append(
				$('<dt/>')
					.append(
						self.elAvatar = $('<s/>')
					)
					.append(
						self.elInfos = $('<div/>').html('<span>选择舰娘...</span>')
							.append(
								self.elInfosTitle = $('<div class="title"/>')
							)
							.append(
								$('<div class="info"/>')
									.append(
										$('<label/>').html('Lv.')
											.append(
												self.elInputLevel = $('<input/>',{
													'type':	'number',
													'min':	0,
													'max':	150
												}).on({
													'change': function(e){
														let value = self.elInputLevel.val()
														
														if( (typeof value == 'undefined' || value === '') && self.data[1][0] )
															self.shipLv = null
														
														value = parseInt(value)
														if( !isNaN(value) && self.data[1][0] != value )
															self.shipLv = value
													}
												})
											)
									)
									.append(
										self.elInfosInfo = $('<span/>')
									)
							)
					)
			)
			// 装备
			.append(
				$('<div class="equipments"/>').append(function(){
					let els = $()
					for( let i=0; i<4; i++ ){
						self.equipments[i] = new InfosFleetShipEquipment(self, i)
						els = els.add(self.equipments[i].el)
					}
					return els
				})
			)
			// 属性
			.append(
				$('<div class="attributes"/>').html('属性')
			)
			// 选项/操作
			.append(
				$('<div class="options"/>')
					.append(
						$('<button/>',{
							'html':			'i',
							'data-tip':		'查看资料'
						}).on('click', function(e){
								_frame.infos.show('[[SHIP::'+self.shipId+']]', $(this))
								e.stopPropagation()
							})
					)
					.append(
						$('<button/>').html('×')
							.on('click', function(e){
								self.shipId = null
								e.preventDefault()
								e.stopPropagation()
							})
					)
			)
			.on('click', function(){
				if( self.el.hasClass('noship') )
					self.selectShipStart()
			})

		this.updateEl()
	}
	
	// 返回页面元素
		getEl(){
			return this.el
		}
	
	// 开始选择
		selectShipStart(){
			_g.log('开始选择舰娘')
			let self = this

			//_frame.infos.hide()
			//_frame.app_main.cur_page = null
			_frame.app_main.load_page('ships', {
				callback_modeSelection_select:		function(id){
					history.back()
					self.shipId = id
					if( self.infosFleet )
						_frame.infos.dom.main.attr('data-theme', self.infosFleet.data['theme'])
				}
			})
		}
	
	// 更改运
		changeLuck(luck){
			this.data[1][1] = luck || -1
		}
	
	// 计算并显示属性
		updateAttrs(){
			
		}

	// 更新元数据
	
	// 根据元数据更新页面元素
		updateEl(d){
			this._updating = true
			
			this.data = d || this.data		
			
			if( this.data[0] )	
				this.shipId = this.data[0]
			
			if( this.data[1][0] )
				this.shipLv = this.data[1][0]
			
			for( let i=0; i<4; i++ ){
				this.equipments[i].id = this.data[2][i]
				this.equipments[i].star = this.data[3][i]
			}
			
			this.updateAttrs()
			
			this._updating = false
		}
	
	// 获取当前状态的元数据
		getData(){
			return this.data
		}
	
	
	
	// 舰娘ID
		get shipId(){
			return this.data[0]
		}
		set shipId( value ){
			this.data[0] = value
			
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
						console.log(this.equipments[i])
					}
			}else{
				this.el.removeAttr('data-shipId')
				this.el.addClass('noship')
				this.elAvatar.html('')
			}
			
			this.save()
		}
	
	// 舰娘等级
		get shipLv(){
			return this.data[1][0]
		}
		set shipLv( value ){
			this.data[1][0] = value || null
			if( value ){
				this.elInputLevel.val( value ).trigger('change')
			}else{
				this.elInputLevel.val('').trigger('change')
			}
			//this.el.attr('data-shipLv', value)
			
			this.save()
		}
	
	// 舰娘运
	
	// 保存
		save(){
			if( this._updating )
				return false
			if( this.infosFleetSubFleet )
				this.infosFleetSubFleet.save()
		}
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

		const self = this
		
		this.index = index || 0
		this.infosFleetShip = infosFleetShip
		
		// 数据正在更新中，禁止触发任何存储操作
		//this._updating = false

		if( this.el )
			return this.el
		
		this.el = $('<div class="equipment"/>')
					.append(
						self.elCarry = $('<div class="equipment-layer equipment-add"/>')
					)
					.append(
						$('<div class="equipment-layer equipment-infos"/>')
							.append(
								self.elName = $('<span class="equipment-name"/>')
							)
							.append(
								self.elStar = $('<span class="equipment-star"/>').html(0)
							)
							.append(function(){
								let el = $('<span class="equipment-carry"/>').html(0)
								self.elCarry = self.elCarry.add( el )
								return el
							})
					)
					.append(
						$('<div class="equipment-layer equipment-options"/>')
							.append(
								self.elInputStar = $('<input/>',{
									'class':		'equipment-starinput',
									'type':			'number',
									'placeholder':	0
								}).on('change', function(){
									let value = self.elInputStar.val()
									
									if( (typeof value == 'undefined' || value === '') && self.star )
										self.star = null
									
									value = parseInt(value)
									if( !isNaN(value) && self.star != value )
										self.star = value
								})				
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
			let self = this

			_frame.app_main.load_page('equipments', {
				callback_modeSelection_select:		function(id){
					history.back()
					self.id = id
					if( self.infosFleetShip.infosFleet )
						_frame.infos.dom.main.attr('data-theme', self.infosFleetShip.infosFleet.data['theme'])
				}
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
			value = parseInt(value)
			
			if( this.infosFleetShip.data[2][this.index] != value ){
				this.star = 0
				
				if( value && !isNaN(value) ){
					this.infosFleetShip.data[2][this.index] = value
					this.el.attr('data-equipmentId', value)
				}else{
					this.infosFleetShip.data[2][this.index] = null
					this.el.removeAttr('data-equipmentId')
				}
				
				this.save()
			}
		}
	
	// 改修星级
		get star(){
			return this.infosFleetShip.data[3][this.index]
		}
		set star( value ){
			value = parseInt(value) || null
			
			if( this.infosFleetShip.data[3][this.index] != value ){
				if( value && isNaN(value) ){
					this.infosFleetShip.data[3][this.index] = value
					this.elInputStar.val( value ).trigger('change')
					this.elStar.html(value)
				}else{
					this.infosFleetShip.data[3][this.index] = null
					this.elInputStar.val('').trigger('change')
					this.elStar.html(0)
				}
				
				this.save()
			}
			
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






/*
var fleetInfos = function( id ){
	var self = this

	this.dom = $('<div class="fleet loading"/>')
	this.doms = {}

	if( id == '__NEW__' ){
		_db.fleets.insert(_tablelist.prototype._fleets_new_data(), function(err, newDoc){
			if(err){
				_g.error(err)
			}else{
				if( _frame.infos.curContent == 'fleet::__NEW__' )
					self.init(newDoc)
			}
		})
	}else{
		_db.fleets.find({
			'_id': 		id
		}, function(err, docs){
			if(err || !docs){
				_g.error(err)
			}else{
				if( _frame.infos.curContent == 'fleet::' + id )
					self.init(docs[i])
			}
		})
	}
}



// 初始化内容
	fleetInfos.prototype.init = function( d ){
		if( !d )
			return false

		_g.log(d)

		var self = this
			,i = 0

		this.dom.attr('data-fleetid', d._id)
			.data('fleet', d)
			.removeClass('loading')

		$('<header/>')
			.append(
				self.doms['name'] = $('<h3 contenteditable/>')
					.html('点击编辑标题')
					.on({
						'input': function(){
							self.update_data({})
							self.doms['name'].trigger('namechange')
						},
						'focus': function(){
							if( self.doms['name'].text() == '点击编辑标题' )
								self.doms['name'].html('')
						},
						'blur': function(){
							if( !self.doms['name'].text() )
								self.doms['name'].html('点击编辑标题')
						},
						'namechange': function(e, content){
							if( typeof content == 'undefined' ){
								content = self.doms['name'].text()
							}else{
								self.doms['name'].html(content)
							}

							if( content ){
								self.doms['name'].attr('data-content', content)
							}else{
								self.doms['name'].removeAttr('data-content')
							}

							return self.doms['name']
						}
					})
			)
			.append(
				self.doms['user'] = $('<button/>')
			)
			.appendTo(self.dom)

		$('<div class="fleets"/>')
			.append(
				self.doms['tabs'] = $('<div class="tabs"/>')
			)
			.append(
				self.doms['options'] = $('<div class="options"/>')
					.append(
						$('<span/>').html('[PH] 阵型')
					)
					.append(
						$('<span/>').html('[PH] 颜色')
					)
					.append(
						$('<span/>').html('[PH] 分享')
					)
			)
			.appendTo(self.dom)

		this.doms['ships'] = $('<div class="ships"/>').appendTo(self.dom)

		// 4个分舰队
			while(i < 4){
				i++
	
				$('<input/>',{
						'type': 	'radio',
						'name': 	'fleet_' + d._id + '_tab',
						'id': 		'fleet_' + d._id + '_tab_' + i,
						'value': 	i
					}).prop('checked', (i == 1)).prependTo( self.dom )
	
				$('<label/>',{
						'for': 		'fleet_' + d._id + '_tab_' + i,
						'data-fleet':i,
						'html': 	'#' + i
					}).appendTo( self.doms['tabs'] )
	
				self.doms['fleet' + i] = $('<dl/>',{
						'data-fleet':i
					}).appendTo( self.doms['ships'] )
	
				// 6个舰娘
					let j = 0
					while( j < 6 ){
						j++
						self.doms['ship' + i + '-' + j] = $('<dd/>',{
								'class':	'noship',
								'id':		'ship_' + d._id + '_' + i + '_' + 'j'
							})
							.html('ship' + i + '-' + j)
							.appendTo( self.doms['fleet' + i] )
					}
			}
	
			this.update( d )
		}



// 添加舰队tab
	fleetInfos.prototype.fleettab_add = function( is_click ){

	}



// 根据数据更新内容
	fleetInfos.prototype.update = function( d ){
		d = d || {}
		var self = this

		// 主题颜色
			if( typeof d['theme'] != 'undefined' )
				_frame.infos.dom.main.attr('data-theme', d['theme'])

		// 标题
			if( typeof d['name'] != 'undefined' )
				this.doms['name'].trigger('namechange',[d['name']]).trigger('blur')

		// 舰队
			if( d['data'] && d['data'].push ){
				if( !d['data'].length ){
					self.fleettab_add()
				}else{
					for(var i in d['data']){
						self.fleettab_add()
					}
				}
			}
	}



// 每个操作都会更新数据，并触发更新数据库倒计时
	fleetInfos.prototype.update_data = function( d ){
		d = d || {}
		this.update(d)
	}



// 更新数据库
*/