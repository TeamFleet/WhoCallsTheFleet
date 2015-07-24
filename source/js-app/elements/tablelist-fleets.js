/*
	使用 NeDB (localstorage)
	每个舰队配置拥有独立ID
	舰队详情界面内，在每个操作后都自动计算并更新配置数据

	新建
		新建空舰队
		导入字符串/组
		导入舰载机厨URL/用户名/字符串
		加载配置文件

	导出
		配置文件
		配置字符串

	分享
		图片
		文本

	fleet list update (_id, data)
		no argument: update all
		if _id not find, add new line
		delete empty lines
*/

	_tablelist.prototype._fleets_columns = [
			'  ',
			['创建者',	'user'],
			['修改时间','time_modify'],
			['评价',	'rating'],
			['',		'options']
		]

	_tablelist.prototype.kancolle_calc = {
		'_ApplicationId': 	'l1aps8iaIfcq2ZzhOHJWNUU2XrNySIzRahodijXW',
		'_ClientVersion': 	'js1.2.19',
		'_InstallationId': 	'62522018-ec82-b434-f5a5-08c3ab61d932',
		'_JavaScriptKey': 	'xOrFpWEQZFxUDK2fN1DwbKoj3zTKAEkgJHzwTuZ4'
	}



// 新建数据
	_tablelist.prototype._fleets_new_data = function(obj){
		return $.extend({
			'data': 		[],
			'time_create': 	(new Date()).valueOf(),
			'time_modify': 	(new Date()).valueOf(),
			'hq_lv': 		-1,
			'name': 		'',
			'note': 		'',
			'user': 		{},
			'rating': 		-1,
			'theme': 		1
		}, obj || {})
	}



// 检查并读取已保存数据
	_tablelist.prototype._fleets_loaddata = function(){
		var self = this
		return []
	// PLACEHOLDER START
	/*
		var deferred = Q.defer()
		var data = $.extend( self.kancolle_calc, {
				'_method': 	'GET',
				'where': {
					'owner': 	'Diablohu'
				}
			})
		$.ajax({
			'url': 	'https://api.parse.com/1/classes/Deck',
			'data': JSON.stringify(data),
			'method': 'POST',
			'success': function( data ){
				var arr = []
				if( data && data['results'] ){
					for(var i in data['results']){
						arr.push( self._fleets_parse_kancolle_calc_data(data['results'][i]) )
					}
				}
				deferred.resolve( arr )
			},
			'error': function( jqXHR, textStatus, errorThrown ){
				_g.log(jqXHR)
				_g.log(textStatus)
				_g.log(errorThrown)
				deferred.resolve([])
			}
		})
		return deferred.promise
	*/
	// PLACEHOLDER END
	// PLACEHOLDER START
	/*
		return [
			{
				'name': 	'1-5',
				'owner': 	'Diablohu',
				'hq_lv': 	101,
				'note': 	'',
				'createdAt':'2014-09-30T21:06:44.046Z',
				'updatedAt':'2015-05-20T03:04:51.898Z',
				'ojbectId': 'XU9DFdVoVQ',
				'data': 	'[[["408",[83,-1],[94,64,100,54]],["82",[58,-1],[79,79,79,26]],["321",[88,-1],[47,47,34,45]],["293",[54,-1],[47,47,87,45]]]]'
			}
		]*/
	// PLACEHOLDER END
	}



// 检测数据，如果没有，标记样式
	_tablelist.prototype._fleets_datacheck = function(arr){
		arr = arr || []

		if( !arr.length )
			this.dom.container.addClass('nocontent')

		return arr
	}



// 创建全部数据行内容
	_tablelist.prototype._fleets_append_all_items = function(arr){
		arr = arr || []
		arr.sort(function(a, b){
			if (a['name'] < b['name']) return -1;
			if (a['name'] > b['name']) return 1;
			return 0;
		})
		_g.log(arr)

		var self = this
			,deferred = Q.defer()

		// 创建flexgrid placeholder
			var k = 0
			while(k < self.flexgrid_empty_count){
				if( !k )
					self.flexgrid_ph = $('<tr class="empty" data-fleetid="-1" data-trindex="99999"/>').appendTo(self.dom.tbody)
				else
					$('<tr class="empty" data-fleetid="-1" data-trindex="99999"/>').appendTo(self.dom.tbody)
				k++
			}

		// 创建数据行
			for( var i in arr ){
				setTimeout((function(i){
					self._fleets_append_item( arr[i] )
					if( i >= arr.length -1 )
						deferred.resolve()
				})(i), 0)
			}

		if( !arr.length )
			deferred.resolve()

		return deferred.promise
	}



// 创建单行数据行内容
	_tablelist.prototype._fleets_append_item = function( data, index ){
		if( !data )
			return false

		if( typeof index == 'undefined' ){
			index = this.trIndex
			this.trIndex++
		}

		var self = this
			,tr = $('<tr class="row"/>')
				.attr({
					'data-trindex': index,
					'data-fleetid': 'PLACEHOLDER',
					//'data-infos': 	'[[FLEET::'+JSON.stringify(data)+']]'
					'data-infos': 	'[[FLEET::'+data._id+']]'
				})
				.insertBefore( this.flexgrid_ph )

		for( var i in self._fleets_columns ){
			switch( self._fleets_columns[i][1] ){
				case ' ':
					var html = '<i>'
						,ships = data['data'][0] || []
						,j = 0;
					while( j < 6 ){
						if( ships[j] )
							html+='<img src="' + _g.path.pics.ships + '/' + ships[j][0]+'/0.webp" contextmenu="disabled"/>'
						else
							html+='<s/>'
						j++
					}
					html+='</i>'
					$('<th/>')
						.attr(
							'data-value',
							data['name']
						)
						.html(
							html
							+ '<strong>' + data['name'] + '</strong>'
						)
						.appendTo(tr)
					break;
				default:
					var datavalue = data[self._fleets_columns[i][1]]
					$('<td/>')
						.attr(
							'data-value',
							datavalue
						)
						.html( datavalue )
						.appendTo(tr)
					break;
			}
		}

		return tr
	}


// [按钮操作] 新建/导入配置
	_tablelist.prototype._fleets_btn_new = function(){
		var self = this

		if( !this._fleets_menu_new )
			this._fleets_menu_new = new _menu({
				'target': 	self.dom.btn_new,
				'items': [
					$('<div class="menu_fleets_new"/>')
						.append(
							$('<menuitem/>').html('新建配置')
								.on('click', function(){
									self._fleets_action_new()
								})
						)
						.append(
							$('<menuitem/>').html('导入配置代码')
						)
						.append(
							$('<menuitem/>').html('导入配置文件')
						)
				]
			})

		this._fleets_menu_new.show()
	}



// [按钮操作] 选项设置
	_tablelist.prototype._fleets_btn_settings = function(){
		_g.log('CLICK: 选项设置')
	}


// [操作] 新建配置
	_tablelist.prototype._fleets_action_new = function(){
		var self = this
		//_frame.infos.show('[[FLEET::__NEW__]]')

		_db.fleets.insert( _tablelist.prototype._fleets_new_data(), function(err, newDoc){
			if(err){
				_g.error(err)
			}else{
				if( _frame.app_main.cur_page == 'fleets' ){
					_frame.infos.show('[[FLEET::' + newDoc['_id'] + ']]')
					self._fleets_menu_new.hide()
					//self.init(newDoc)
				}
			}
		})
	}



// 处理舰载机厨的单项数据，返回新格式
	_tablelist.prototype._fleets_parse_kancolle_calc_data = function(obj){
		return this._fleets_new_data(obj)
	}



// 初始化函数
	_tablelist.prototype._fleets_init = function(){
		var self = this
			,promise_chain 	= Q.fcall(function(){})

		// 标记全局载入状态
			_frame.app_main.loading.push('tablelist_'+this._index)
			_frame.app_main.is_loaded = false

		// [创建] 过滤器与选项
			this.dom.filter_container = $('<div class="options" viewtype="card"/>').appendTo( this.dom.container )
			this.dom.filters = $('<div class="filters"/>').appendTo( this.dom.filter_container )
			// 左 - 新建
				this.dom.btn_new = $('<button class="new" icon="import"/>').html('新建/导入')
									.on('click',function(){
										self._fleets_btn_new()
									})
									.appendTo(self.dom.filters)
			// 右 - 选项组
				this.dom.buttons_right = $('<div class="buttons_right"/>').appendTo(self.dom.filters)
				this.dom.btn_settings = $('<button icon="cog"/>')
									.on('click',function(){
										self._fleets_btn_settings()
									})
									.appendTo(self.dom.buttons_right)

		// [创建] 表格框架
			this.dom.table_container = $('<div class="fixed-table-container"/>').appendTo( this.dom.container )
			this.dom.table_container_inner = $('<div class="fixed-table-container-inner"/>').appendTo( this.dom.table_container )
			this.dom.table = $('<table class="fleets hashover hashover-column"/>').appendTo( this.dom.table_container_inner )
			function gen_thead(arr){
				self.dom.thead = $('<thead/>')
				var tr = $('<tr/>').appendTo(self.dom.thead)
				for(var i in arr){
					if( typeof arr[i] == 'object' ){
						$('<td data-stat="' + arr[i][1] + '"/>')
							.html('<div class="th-inner-wrapper"><span><span>'+arr[i][0]+'</span></span></div>').appendTo(tr)
					}else{
						$('<th/>').html('<div class="th-inner-wrapper"><span><span>'+arr[i][0]+'</span></span></div>').appendTo(tr)
					}
				}
				return self.dom.thead
			}
			gen_thead( self._fleets_columns ).appendTo( this.dom.table )
			this.dom.tbody = $('<tbody/>').appendTo( this.dom.table )

		// [创建] 无内容时的新建提示框架
			$('<div class="nocontent container"/>')
				.append(
					$($('<div/>')
						.append($('<span>').html('暂无舰队配置'))
						.append($('<button>').html('新建/导入')
									.on('click',function(){
										self.dom.btn_new.click()
									})
								)
					)
				)
				.appendTo( this.dom.table_container_inner )

			promise_chain
		// 检查并读取已保存数据
			.then(function(){
				return self._fleets_loaddata()
			})

		// 如果没有数据，标记状态
			.then(function(arr){
				return self._fleets_datacheck(arr)
			})

		// [创建] 全部数据行
			.then(function(arr){
				return self._fleets_append_all_items(arr)
			})

		// [框架] 标记读取完成
			.then(function(){
				setTimeout(function(){
					_frame.app_main.loaded('tablelist_'+self._index, true)
				}, 100)
			})

		// 错误处理
			.catch(function (err) {
				_g.log(err)
			})
			.done(function(){
				_g.log('Fleets list DONE')
			})
	}
