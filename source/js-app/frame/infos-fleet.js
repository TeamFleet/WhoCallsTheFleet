// 舰队配置
	_frame.infos.__fleet = function( id ){
		return (new InfosFleet(id)).dom
	}









class InfosFleet{
	constructor( id ){
		var self = this
		
		this.dom = $('<div class="fleet loading"/>')
		this.doms = {}
		this.fleets = []
	
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

		_g.log(d)
		this.data = d

		let self = this
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
				self.fleets[i] = new InfosFleetSubFleet(self, i)
			}

		// 更新DOM
			this.update( d )
	}



	// 根据数据更新内容
	update( d ){
		d = d || {}
		let self = this

		// 主题颜色
			if( typeof d['theme'] != 'undefined' )
				_frame.infos.dom.main.attr('data-theme', d['theme'])

		// 标题
			if( typeof d['name'] != 'undefined' )
				this.doms['name'].trigger('namechange',[d['name']]).trigger('blur')

		// 分舰队
			if( d['data'] && d['data'].push ){
			}
	}



	// 每个操作都会更新数据，并触发更新数据库倒计时
	update_data( d ){
		d = d || {}
		this.update(d)
	}



	// 更新数据库
}







// 类：子舰队
class InfosFleetSubFleet{
	constructor(infosFleet, index, d){
		const self = this

		d = d || []
		this.data = d
		
		$('<input/>',{
				'type': 	'radio',
				'name': 	'fleet_' + d._id + '_tab',
				'id': 		'fleet_' + d._id + '_tab_' + index,
				'value': 	index
			}).prop('checked', (index == 1)).prependTo( infosFleet.dom )

		$('<label/>',{
				'for': 		'fleet_' + d._id + '_tab_' + index,
				'data-fleet':index,
				'html': 	'#' + index
			}).appendTo( infosFleet.doms['tabs'] )

		infosFleet.doms['fleet' + index] = $('<dl/>',{
				'data-fleet':index
			}).appendTo( infosFleet.doms['ships'] )

		// 6个舰娘
			let j = 0
			while( j < 6 ){
				j++
				infosFleet.doms['ship' + index + '-' + j]
					= (new InfosFleetShip(infosFleet, self)).getEl()
					.appendTo( infosFleet.doms['fleet' + index] )
				$('<s/>').appendTo( infosFleet.doms['fleet' + index] )
			}
		
		// 舰队综合属性
			infosFleet.doms['fleetsummary' + index] = $('<span/>').appendTo( infosFleet.doms['fleet' + index] )

		this.updateEl()
	}

	// 更新元数据
	
	// 根据元数据更新页面元素
		updateEl(d){
			this.data = d || this.data
		}
	
	// 获取当前状态的元数据
		getData(){
			return this.data
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
						self.elInfos = $('<font/>').html('选择舰娘...')
					)
			)
			// 装备
			.append(
				$('<ul/>')
			)
			// 属性
			.append(
				$('<span/>')
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
			this.data = d || this.data

			this.updateAttrs()
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
			
			this.el.attr('data-shipId', value)
			
			if( value ){
				this.el.removeClass('noship')
				this.elAvatar.html('<img src="' + node.path.join(_g.path.pics.ships, value + '/10.webp') + '"/>')
				this.elInfos.html(_g.data.ships[value]._name)
			}else{
				this.el.addClass('noship')
				this.elAvatar.html('')
				this.elInfos.html('选择舰娘...')
			}
		}
	
	// 舰娘等级
		get shipLv(){
			return this.data[1][0]
		}
		set shipLv( value ){
			this.data[1][0] = lv || -1
			this.el.attr('data-shipLv', value)
		}
	
	// 舰娘运
	
	// 某位置装备
	
	// 某位置装备等级
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