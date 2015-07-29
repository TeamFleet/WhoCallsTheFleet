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

		d = d || [null, [null, -1], [], []]
		this.data = d
		this.infosFleet = infosFleet
		this.infosFleetSubFleet = infosFleetSubFleet
		
		// 数据正在更新中，禁止触发任何存储操作
		//this._updating = false

		if( this.el )
			return this.el
		
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
														let value = parseInt(self.elInputLevel.val())
														console.log(value, isNaN(value))
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
				$('<span class="equipments"/>').html('装备')
			)
			// 属性
			.append(
				$('<span class="attributes"/>').html('属性')
			)
			// 选项/操作
			.append(
				$('<span class="options"/>')
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
	
	// 添加装备
		addEquipment(slotIndex, id){
			this.data[2][slotIndex] = id
			this.data[3][slotIndex] = 0
		}
	
	// 删除装备
		removeEquipment(slotIndex){
			this.data[2][slotIndex] = null
		}
	
	// 更改改修星级
		changeEquipmentStar(slotIndex, star){
			this.data[3][slotIndex] = star
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
			this.data[1][0] = value || -1
			this.elInputLevel.val( value ).trigger('change')
			//this.el.attr('data-shipLv', value)
			
			this.save()
		}
	
	// 舰娘运
	
	// 某位置装备
	
	// 某位置装备等级
	
	// 保存
		save(){
			if( this._updating )
				return false
			if( this.infosFleetSubFleet )
				this.infosFleetSubFleet.save()
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