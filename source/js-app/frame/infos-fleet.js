// 舰队配置
	_frame.infos.__fleet = function( id ){
		return (new fleetInfos(id)).dom
	}









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

		while(i < 4){
			$('<input/>',{
					'type': 	'radio',
					'name': 	'fleet_' + d._id + '_tab',
					'id': 		'fleet_' + d._id + '_tab_' + (i+1),
					'value': 	(i+1)
				}).prop('checked', (i == 0)).prependTo( self.dom )

			$('<label/>',{
					'for': 		'fleet_' + d._id + '_tab_' + (i+1),
					'data-fleet':(i+1),
					'html': 	'#' + (i+1)
				}).appendTo( self.doms['tabs'] )

			$('<dl/>',{
					'data-fleet':(i+1)
				}).appendTo( self.doms['ships'] )

			i++
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
