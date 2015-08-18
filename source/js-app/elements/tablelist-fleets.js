/* TODO
	新建
		导入舰载机厨URL/用户名/字符串
		加载配置文件
	导出
		配置文件
	分享
		图片
		文本
*/

class TablelistFleets extends Tablelist{
	constructor( container, options ){
		super( container, options )
		
		this.columns = [
				'  ',
				['创建者',	'user'],
				['修改时间','time_modify'],
				['评价',	'rating'],
				['',		'options']
			]
	
		this.kancolle_calc = {
			'_ApplicationId': 	'l1aps8iaIfcq2ZzhOHJWNUU2XrNySIzRahodijXW',
			'_ClientVersion': 	'js1.2.19',
			'_InstallationId': 	'62522018-ec82-b434-f5a5-08c3ab61d932',
			'_JavaScriptKey': 	'xOrFpWEQZFxUDK2fN1DwbKoj3zTKAEkgJHzwTuZ4'
		}
		
		//_g.data.fleets_tablelist = {
		//	lists: [],
		//	items: {}
		//}

		let promise_chain 	= Q.fcall(function(){})

		// 标记全局载入状态
			_frame.app_main.loading.push('tablelist_'+this._index)
			_frame.app_main.is_loaded = false
			//_g.data.fleets_tablelist.lists.push(this)

		// [创建] 过滤器与选项
			this.dom.filter_container = $('<div class="options" viewtype="card"/>').appendTo( this.dom.container )
			this.dom.filters = $('<div class="filters"/>').appendTo( this.dom.filter_container )
			// 左 - 新建
				this.dom.btn_new = $('<button class="new" icon="import"/>').html('新建/导入')
									.on('click',function(){
										this.btn_new()
									}.bind(this))
									.appendTo(this.dom.filters)
			// 右 - 选项组
				this.dom.buttons_right = $('<div class="buttons_right"/>').appendTo(this.dom.filters)
				/*
				this.dom.btn_settings = $('<button icon="cog"/>')
									.on('click',function(){
										this.btn_settings()
									}.bind(this))
									.appendTo(this.dom.buttons_right)
				*/

		// [创建] 表格框架
			this.dom.table_container = $('<div class="fixed-table-container"/>').appendTo( this.dom.container )
			this.dom.table_container_inner = $('<div class="fixed-table-container-inner"/>').appendTo( this.dom.table_container )
			this.dom.table = $('<table class="fleets hashover hashover-column"/>').appendTo( this.dom.table_container_inner )
			function gen_thead(arr){
				this.dom.thead = $('<thead/>')
				var tr = $('<tr/>').appendTo(this.dom.thead)
				arr.forEach(function(column){
					if( typeof column == 'object' ){
						$('<td data-stat="' + column[1] + '"/>')
							.html('<div class="th-inner-wrapper"><span><span>'+column[0]+'</span></span></div>').appendTo(tr)
					}else{
						$('<th/>').html('<div class="th-inner-wrapper"><span><span>'+column[0]+'</span></span></div>').appendTo(tr)
					}
				})
				return this.dom.thead
			}
			gen_thead = gen_thead.bind(this)
			gen_thead( this.columns ).appendTo( this.dom.table )
			this.dom.tbody = $('<tbody/>').appendTo( this.dom.table )

		// [创建] 无内容时的新建提示框架
			$('<div class="nocontent container"/>')
				.append(
					$($('<div/>')
						.append($('<span>').html('暂无舰队配置'))
						.append($('<button>').html('新建/导入')
									.on('click',function(){
										this.dom.btn_new.click()
									}.bind(this))
								)
					)
				)
				.appendTo( this.dom.table_container_inner )
	
		// 右键菜单事件
			this.dom.table.on('contextmenu.contextmenu_fleet', 'tr[data-fleetid]', function(e){
				this.contextmenu_show($(e.currentTarget))
			}.bind(this)).on('click.contextmenu_fleet', 'tr[data-fleetid]>th>em', function(e){
				this.contextmenu_show($(e.currentTarget).parent().parent(), $(e.currentTarget))
				e.stopImmediatePropagation()
				e.stopPropagation()
			}.bind(this))

			promise_chain

		// 读取已保存数据
			.then(function(){
				return this.loaddata()
			}.bind(this))
		
		// 检查每条数据
			.then(function(arr){
				return this.validdata(arr)
			}.bind(this))

		// 如果没有数据，标记状态
			.then(function(arr){
				return this.datacheck(arr)
			}.bind(this))

		// [创建] 全部数据行
			.then(function(arr){
				return this.append_all_items(arr)
			}.bind(this))

		// [框架] 标记读取完成
			.then(function(){
				setTimeout(function(){
					_frame.app_main.loaded('tablelist_'+this._index, true)
				}.bind(this), 100)
			}.bind(this))

		// 错误处理
			.catch(function (err) {
				_g.log(err)
			})
			.done(function(){
				_g.log('Fleets list DONE')
			})
	}
	
	// 新建数据
		new_data(obj){
			return $.extend({
				'data': 		[],
				'time_create': 	(new Date()).valueOf(),
				'time_modify': 	(new Date()).valueOf(),
				'hq_lv': 		-1,
				'name': 		'',
				'note': 		'',
				'user': 		{},
				'rating': 		-1,
				'theme': 		_g.randNumber(10)
			}, obj || {})
		}

	// 读取已保存数据
		loaddata(){
			let deferred = Q.defer()
			
			_db.fleets.find({}).sort({name: 1}).exec(function(err, docs){
				if( err ){
					deferred.resolve( [] )
				}else{
					deferred.resolve( docs )
				}
			})
			
			return deferred.promise
			//return []
			// PLACEHOLDER START
			/*
				var deferred = Q.defer()
				var data = $.extend( this.kancolle_calc, {
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
								arr.push( this.parse_kancolle_calc_data(data['results'][i]) )
							}
						}
						deferred.resolve( arr )
					}.bind(this),
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

	// 检测数据，删除空数据条目
		validdata(arr){
			let deferred = Q.defer()
				,to_remove = []
				,i = 0
				,valid = function( fleetdata ){
					if( fleetdata['hq_lv'] > -1
						|| fleetdata['name']
						|| fleetdata['note']
						|| fleetdata['rating'] > -1
					){
						return true
					}
					if( !fleetdata.data || !fleetdata.data.length || !fleetdata.data.push )
						return false
					for( let fleet of fleetdata.data ){
						if( !fleet || !fleet.length || !fleet.push )
							return false
						for( let shipdata of fleet ){
							if( typeof shipdata != 'undefined' && typeof shipdata[0] != 'undefined' && shipdata[0] )
								return true
						}
					}
					return false
				}
				
			while( i < arr.length ){
				if( valid( arr[i] ) ){
					i++
				}else{
					to_remove.push( arr[i]._id )
					arr.splice(i, 1)
				}
			}
			
			if( to_remove.length ){
				_db.fleets.remove({
					_id: { $in: to_remove }
				}, { multi: true }, function (err, numRemoved) {
					deferred.resolve( arr )
				});
			}else{
				deferred.resolve( arr )
			}
			
			return deferred.promise
		}

	// 检测已处理数据，如果没有条目，标记样式
		datacheck(arr){
			arr = arr || []
	
			if( !arr.length )
				this.dom.container.addClass('nocontent')
	
			return arr
		}

	// 创建全部数据行内容
		append_all_items(arr){
			arr = arr || []
			arr.sort(function(a, b){
				if (a['name'] < b['name']) return -1;
				if (a['name'] > b['name']) return 1;
				return 0;
			})
			_g.log(arr)
	
			let deferred = Q.defer()
				,k = 0
	
			// 创建flexgrid placeholder
				while(k < this.flexgrid_empty_count){
					if( !k )
						this.flexgrid_ph = $('<tr class="empty" data-fleetid="-1" data-trindex="99999"/>').appendTo(this.dom.tbody)
					else
						$('<tr class="empty" data-fleetid="-1" data-trindex="99999"/>').appendTo(this.dom.tbody)
					k++
				}
	
			// 创建数据行
				arr.forEach(function(currentValue, i){
					setTimeout((function(i){
						this.append_item( arr[i] )
						if( i >= arr.length -1 )
							deferred.resolve()
					}.bind(this))(i), 0)
				}.bind(this))
	
			if( !arr.length )
				deferred.resolve()
	
			return deferred.promise
		}

	// 创建单行数据行内容
		append_item( data, index, isPrepend ){
			if( !data )
				return false
	
			if( typeof index == 'undefined' ){
				index = this.trIndex
				this.trIndex++
			}
			
			//_g.log(data)
			
			let tr = $('<tr class="row"/>')
						.attr({
							'data-trindex': index,
							'data-fleetid': data._id || 'PLACEHOLDER',
							//'data-infos': 	'[[FLEET::'+JSON.stringify(data)+']]'
							'data-infos': 	'[[FLEET::'+data._id+']]',
							'data-theme':	data.theme
						})
						.data({
							'initdata': 	data
						})
			
			this.columns.forEach(function(column){
				switch( column[1] ){
					case ' ':
						var html = '<i>'
							,ships = data['data'][0] || []
							,j = 0;
						while( j < 6 ){
							if( ships[j] && ships[j][0] )
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
								+ '<em></em>'
							)
							.appendTo(tr)
						break;
					default:
						var datavalue = data[column[1]]
						$('<td/>')
							.attr(
								'data-value',
								datavalue
							)
							.html( datavalue )
							.appendTo(tr)
						break;
				}
			})
	
			if( isPrepend )
				tr.prependTo( this.dom.tbody )
			else
				tr.insertBefore( this.flexgrid_ph )
	
			return tr
		}

	// [按钮操作] 新建/导入配置
		btn_new(){
			if( !this.menu_new )
				this.menu_new = new _menu({
					'target': 	this.dom.btn_new,
					'items': [
						$('<div class="menu_fleets_new"/>')
							.append(
								$('<menuitem/>').html('新建配置')
									.on('click', function(){
										this.action_new()
									}.bind(this))
							)
							.append(
								$('<menuitem/>').html('导入配置代码')
									.on('click', function(){
										if( !TablelistFleets.modalImport ){
											TablelistFleets.modalImport = $('<div/>')
												.append(
													TablelistFleets.modalImportTextarea = $('<textarea/>',{
														'placeholder': '输入配置代码...'
													})
												)
												.append(
													$('<p/>').html('* 配置代码兼容<a href="http://www.kancolle-calc.net/deckbuilder.html">艦載機厨デッキビルダー</a>')
												)
												.append(
													TablelistFleets.modalImportBtn = $('<button class="button"/>').html('导入')
												)
										}
										TablelistFleets.modalImportTextarea.val('')
										TablelistFleets.modalImportBtn.off('click.import')
											.on('click', function(){
												let val = TablelistFleets.modalImportTextarea.val()
												console.log(val)
												if( val ){
													this.action_new({
														'data': 	JSON.parse(TablelistFleets.modalImportTextarea.val())
													})
													_frame.modal.hide()
													TablelistFleets.modalImportTextarea.val('')
												}
											}.bind(this))
										_frame.modal.show(
											TablelistFleets.modalImport,
											'导入配置代码',
											{
												'classname': 	'infos_fleet infos_fleet_import'
											}
										)
									}.bind(this))
							)
							.append(
								$('<menuitem/>').html('[NYI] 导入配置文件')
							)
					]
				})
	
			this.menu_new.show()
		}

	// [按钮操作] 选项设置
		btn_settings(){
			_g.log('CLICK: 选项设置')
		}

	// [操作] 新建配置
		action_new( dataDefault ){
			dataDefault = dataDefault || {}
			//_frame.infos.show('[[FLEET::__NEW__]]')
			console.log(dataDefault)
	
			_db.fleets.insert( this.new_data(dataDefault), function(err, newDoc){
				console.log(err, newDoc)
				if(err){
					_g.error(err)
				}else{
					if( _frame.app_main.cur_page == 'fleets' ){
						_frame.infos.show('[[FLEET::' + newDoc['_id'] + ']]')
						this.menu_new.hide()
						//this.init(newDoc)
						
						//for(let i in _g.data.fleets_tablelist.lists){
						//	_g.data.fleets_tablelist.lists[i].append_item( newDoc, null, true )
						//}
					}
				}
			}.bind(this))
		}

	// 处理舰载机厨的单项数据，返回新格式
		parse_kancolle_calc_data(obj){
			return this.new_data(obj)
		}

	// 菜单
		contextmenu_show($tr, $em){
			TablelistFleets.contextmenu_curel = $tr
		
			if( !TablelistFleets.contextmenu )
				TablelistFleets.contextmenu = new _menu({
					'className': 'contextmenu-fleet',
					'items': [
						$('<menuitem/>').html('详情')
							.on({
								'click': function(e){
									TablelistFleets.contextmenu_curel.trigger('click', [true])
								}
							}),
							
						$('<menuitem/>').html('导出配置')
							.on({
								'click': function(e){
									InfosFleet.modalExport_show(TablelistFleets.contextmenu_curel.data('initdata'))
								}
							}),
							
						$('<menuitem/>').html('移除')
							.on({
								'click': function(e){
									let id = TablelistFleets.contextmenu_curel.attr('data-fleetid')
									_db.fleets.remove({
										_id: id
									}, { multi: true }, function (err, numRemoved) {
										_g.log('Fleet ' + id + ' removed.')
									});
									TablelistFleets.contextmenu_curel.remove()
								}
							})
					]
				})

			TablelistFleets.contextmenu.show($em || $tr)
		}
}