// node.js modules
	node.require('fs')
	node.require('nedb')
	node.require('mkdirp')
	node.require('request')
	node.require('request-progress')
	node.require('semver')
	node.require('url')

	var Q = node.require('q')
		,markdown = node.require( "markdown" ).markdown





// Global Variables	
	_g.event = {
		'animationend':			'webkitAnimationEnd',
		'animationiteration':	'webkitAnimationIteration',
		'transitionend':		'transitionend'
	};
	
	_g.path = {
		'db': 		node.path.join(_g.root, '/app-db/'),
		'page': 	node.path.join(_g.root, '/app/page/'),
		'bgimg_dir':node.path.join(_g.root, '/app/assets/images/homebg/'),
		'bgimg_custom_dir':node.path.join(_g.root, '/app/assets/images/homebg-custom/'),
		'pics': {
			'ships': 	node.path.join(_g.root, '/pics/ships/'),
			'items': 	node.path.join(_g.root, '/pics/items/')
		}
	}
	KC.path.pics = _g.path.pics

	_g.pathMakeObj = function(obj){
		for( var i in obj ){
			if( typeof obj[i] == 'object' ){
				_g.pathMakeObj( obj[i] )
			}else{
				node.mkdirp.sync( obj[i] )
			}
		}
	}
	_g.pathMakeObj( _g.path )

	_g.data = {
		'entities': {},

		'items': {},
		'item_types': {},

		'ships': {},
		'ship_id_by_type': [], 			// refer to _g.ship_type_order
		'ship_types': {},
		'ship_type_order': {},
		'ship_classes': {}
	}
	KC.db = _g.data

	var _db = {
		'fleets': new node.nedb({
				filename: 	Lockr.get('fleets-builds-file', node.path.join(node.gui.App.dataPath, 'NeDB', 'fleets.json'))
			})
	}
	_g.ship_type_order = []
	_g.ship_type_order_full = []
	_g.ship_type_order_map = {}











// extend NeDB
	// 根据 _id 更新数据，替换为新内容 docReplace，并执行 callback
	// 该方法会采用队列，即上一个更新操作正在进行时，新的更新操作会进入队列
		// 此时如果又有新的更新操作，之前队列的更新操作会被替换
		// 注：前一个callback将不会执行 
		node.nedb.prototype.updateById = function( _id, docReplace, callback ){
			if( !this._updateByIdQueue ){
				this._updateByIdQueue = {}
				Object.defineProperty(this._updateByIdQueue, 'running', {
					enumerable: false,
					value: false,
					writable: true
				})
			}
			
			docReplace = docReplace || {}
			docReplace._id = _id
			
			this._updateByIdQueue[_id] = {
				docReplace: docReplace,
				callback: callback || function(){}
			}
			
			this._updateById()
		}
		node.nedb.prototype._updateById = function(){
			if( !this._updateByIdQueue || this._updateByIdQueue.running )
				return false

			let _id
			for(let i in this._updateByIdQueue){
				if( this._updateByIdQueue[i] ){
					_id = i
					break;
				}
			}
			
			if( !_id )
				return false
			
			let queue = this._updateByIdQueue[_id]
			
			this._updateByIdQueue[_id] = null
			delete this._updateByIdQueue[_id]
			
			this._updateByIdQueue.running = true
			
			this.update({
				_id: _id
			}, queue.docReplace, {}, function (err, numReplaced) {
				queue.callback.call(this, err, numReplaced)
				this._updateByIdQueue.running = false
				this._updateById()
			}.bind(this))
		}
















// Global Functions
	/*
		moved to Ship.getName()
	_g.getName = function( nameObj, joint, lang ){
		joint = joint || ''
		if( !nameObj )
			return null
		return (
				nameObj[ _g.lang ] || nameObj['ja_jp']
				) + (
				nameObj.suffix ? (
						joint + (
								_g.data['ship_namesuffix'][nameObj.suffix][ _g.lang ] || _g.data['ship_namesuffix'][nameObj.suffix]['ja_jp']
							)
					) : ''
				)
	}
	*/
	_g.log = function(){
		if( debugmode )
			console.log.apply(console, arguments)
	}
	
	_g.save = function( url, n, callback ){
		_g.file_save_as(url, n, callback)
	}

	_g.getLink = function( t, id ){
		switch( t ){
				case 'ships':		t = 'ship';		break;
		}
		return `?infos=${t}&id=${id}`
	}
	
	_g.getImg = function( t, id, img ){
		return `${node.path.normalize(_g.path.pics[t])}/${id}/${img}.webp`
	}
















// Global Frame
_frame.app_main = {
	page: {},
	page_dom: {},
	page_html: {},

	// is_init: false

	// cur_page: null

	// 尚未载入完毕的内容
		loading: [
			'dbs',
			'bgimgs',
			'db_namesuffix'
		],
		// is_loaded: false,

	// 页面初始化载入完毕后执行的函数组
		functions_on_ready: [],

	// 载入完毕一项内容，并检查其余内容是否载入完毕
	// 如果全部载入完毕，#layout 添加 .ready
		loaded: function( item, is_instant ){
			if( item ){
				if( this.loading.indexOf(item) > -1 ){
					this.loading.splice(this.loading.indexOf(item), 1)
					this.is_loaded = false
				}
			}
			if( !this.loading.length && !this.is_loaded ){
				setTimeout(function(){
					if( _frame.app_main.is_loaded && !_frame.app_main.loading.length && !$html.hasClass('app-ready') ){
						_frame.dom.layout.addClass('ready')
						$html.addClass('app-ready')
						setTimeout(function(){
							let i = 0;
							while( _frame.app_main.functions_on_ready[i] ){
								_frame.app_main.functions_on_ready[i++]()
							}
							/*
							for(let i=0; i<_frame.app_main.functions_on_ready.length; i++){
								_frame.app_main.functions_on_ready[i]()
							}*/
						}, 1500)
					}
				}, is_instant ? 300 : 1000)

				// 绑定onhashchange事件
				//	$window.on('hashchange.pagechange', function(){
				//		_frame.app_main.load_page_func(_g.uriHash('page'))
				//	})

				// 初次检查 uriSearch
					if( !this.window_event_bound ){
						$window.on('popstate._global', function(e){
							if( e.originalEvent && e.originalEvent.state ){
								_frame.app_main.state( e.originalEvent.state )
							}else{
								var _uriGet = location.search ? location.search.split('?')[1] : ''
									,uriGet = {}
								_uriGet = _uriGet.split('&');
								for(var i=0;i<_uriGet.length;i++){
									var h=_uriGet[i].split('=')
									uriGet[h[0]] = h[1] || true
								}
								// 首次运行，检查是否存在 page
								// 如果URI未指定，自动加载 Lockr.get('last_page') || 第一个导航页
									if( !_frame.app_main.window_event_bound && !(uriGet['page'] || uriGet['infos']) ){
										_frame.app_main.load_page(
											Lockr.get('last_page', _frame.app_main.nav[0]['page'])
										)
										//_frame.app_main.load_page( _frame.app_main.nav[0]['page'] )
										//uriGet['page'] = _frame.app_main.nav[0]['page']
									}
								_frame.app_main.state( uriGet )
							}
						}).trigger('popstate._global')
						this.window_event_bound = true
					}

				//this.load_page_func(_g.uriHash('page'))
				this.is_loaded = true
			}
		},


	// pushState
		pushState: function( stateObj, title, url ){
			history.pushState( stateObj, title, url )

			if( !stateObj['infos'] )
				_frame.infos.hide()
		},


	// 根据 history state 运行相应函数
		state: function( stateObj ){
			//_g.log( stateObj )
			if( stateObj['infos'] ){
				_frame.infos.show_func( stateObj['infos'], stateObj['id'], null, stateObj['infosHistoryIndex'] )
			}else{
				_frame.infos.hide()
			}
			if( stateObj['page'] ){
				this.load_page_func( stateObj['page'] )
			}
		},
	
	
	
	
	// 载入中
		loading_queue: [],
		loading_state: {},
		//loading_cur: null,
		loading_start: function( url, callback_success, callback_error, callback_successAfter, callback_beforeSend, callback_complete ){
			url = url || location.pathname
			let isUrl = true
			
			if( typeof callback_success == 'object' ){
				isUrl = typeof callback_success.isUrl != 'undefined' ? callback_success.isUrl : true
				callback_error = callback_success.error
				callback_successAfter = callback_success.successAfter
				callback_beforeSend = callback_success.beforeSend
				callback_complete = callback_success.complete
				callback_success = callback_success.success
			}else if( callback_success === false ){
				isUrl = false
			}

			callback_beforeSend = callback_beforeSend || function(){}
			callback_success = callback_success || function(){}
			callback_successAfter = callback_successAfter || function(){}
			callback_error = callback_error || function(){}
			callback_complete = callback_complete || function(){}

			this.loading_cur = url
			
			if( typeof this.loading_state[url] == 'undefined' || this.loading_state[url] == 'fail' ){
				if( this.loading_state[url] != 'fail' )
					this.loading_state[url] = 'loading'
				this.loading_queue.push(url)
				_frame.dom.layout.addClass('is-loading')

				if( isUrl ){
					$.ajax({
						'url':		url,
						'type':		'get',
						'dataType':	'html',
						
						'beforeSend': function( jqXHR, settings ){
							callback_beforeSend( url, jqXHR, settings )
						},
						
						'success': function(data){
							let result_main = /\<main\>(.+)\<\/main\>/.exec(data)
								,result_title = /\<title\>([^\<]+)\<\/title\>/.exec(data)
							if( result_title && result_title.length > 1 ){
								_frame.app_main.page_title[url] = result_title[1]
							}
							callback_success( result_main && result_main.length > 1 ? result_main[1] : '' )
							if( url == _frame.app_main.loading_cur ){
							//if( url == location.pathname ){
								callback_successAfter( result_main && result_main.length > 1 ? result_main[1] : '' )
							}
							_frame.app_main.loading_state[url] = 'complete'
						},
						
						'error': function( jqXHR, textStatus, errorThrown ){
							errorThrown = errorThrown || ''
							_g.log( 'Loading Fail: ' + url + ' [' + textStatus + '] (' + errorThrown + ')' )
							
							if( _frame.app_main.loading_state[url] == 'fail'
								|| [
									'Bad Request',
									'Not Found',
									'Forbidden'
								].indexOf(errorThrown) > -1)
								return _frame.app_main.loading_fail(url, textStatus, errorThrown, callback_error)
	
							_frame.app_main.loading_state[url] = 'fail'
						},
						
						'complete': function( jqXHR, textStatus ){
							_frame.app_main.loading_complete( url )
							callback_complete( url, jqXHR, textStatus )
							
							if( _frame.app_main.loading_state[url] == 'fail' ){
								console.log('retry')
								_frame.app_main.loading_start( url, callback_success, callback_error, callback_successAfter, callback_beforeSend, callback_complete )
							}
						}
					})
				}else{
					
				}
			}else if( this.loading_state[url] == 'complete' ){
				callback_success()
				callback_successAfter()
			}
		},
		
		loading_complete: function( url ){
			if( !url )
				return
			if( url == this.loading_cur )
				this.loading_cur = null
			let i = this.loading_queue.indexOf(url)
			if( i >= 0 )
				this.loading_queue.splice(i, 1)
			if( this.loading_queue.length )
				return
			_frame.dom.layout.removeClass('is-loading')
		},
		
		loading_fail: function( url, textStatus, errorThrown, callback_error ){
			if( !url )
				return
			if( this.loading_state )
				delete this.loading_state[url]

			_frame.dom.layout.attr('data-errorbadge', url + ' 载入失败 (' + errorThrown + ')')
			clearTimeout( this.loading_fail_timeout_errorbadge )
			this.loading_fail_timeout_errorbadge = setTimeout(function(){
				_frame.dom.layout.removeAttr('data-errorbadge')
				delete _frame.app_main.loading_fail_timeout_errorbadge
			}, 3000)
			console.log( callback_error )
			return callback_error( url, textStatus, errorThrown )
		},





	// 更换页面
		load_page: function( page, options ){
			if( this.cur_page == page || !page )
				return page

			options = options || {}

			this.pushState(
				{
					'page': 	page
				},
				null,
				'?page=' + page
			)
			
			this.load_page_func( page, options )

			if( options.callback_modeSelection_select ){
				this.page_dom[page].trigger('modeSelectionEnter', [
					options.callback_modeSelection_select || function(){},
					options.callback_modeSelection_enter || function(){}
				])
			}else{
				this.mode_selection_off()
			}
			//_g.uriHash('page', page)
		},
		load_page_func: function( page, options ){
			if( this.load_page_lock )
				return
			this.load_page_lock = true
			
			_g.pageChangeBefore()

			_g.log( 'PREPARE LOADING: ' + page )
			//_g.log( 'CURRENT PAGE: ' + (this.cur_page || 'NO PAGE') )
			
			options = options || {}
			
			if( !page )
				return page
			
			// 检查page合法性，如果失效，读取第一个导航项
				let checked = false
					
				if( page == 'donate' ){
					checked = true
				}if( !this.cur_page ){
					this.nav.forEach(function(currentValue){
						if( page == currentValue.page )
							checked = true
					})
				}else{
					checked = true
				}
				
				if( !checked ){
					page = this.nav[0].page
					this.load_page(page, options)
					return page
				}

			if( !this.page_dom[page] ){
				this.page_dom[page] = $('<div class="page-container" page="'+page+'"/>').appendTo( _frame.dom.main )
				this.page_html[page] = node.fs.readFileSync(_g.path.page + page + '.html', 'utf8')
				if(this.page_html[page]){
					this.page_dom[page].html( this.page_html[page] )
					Page.init(page)
					//if( this.page[page] && this.page[page].init )
					//	this.page[page].init(this.page_dom[page])
					//_p.initDOM(this.page_dom[page])
				}
			}
			
			//this.page_dom[page].trigger('show')

			if( !options.callback_modeSelection_select ){
				//this.title = this.navtitle[page]
				_g.title(this.navtitle[page] || true)
				_frame.infos.last = null
	
				_ga.counter(
					location.search
				)
			}

			//_g.log(this.cur_page)
			if( this.cur_page == page ){
				this.load_page_lock = false
				return page
			}

			//this.page_dom[page].appendTo(_frame.dom.main).removeClass('off').trigger('on')
			Page.show(page)

			// 关闭之前的页面
				//if( this.cur_page ){
				//	Page.hide(this.cur_page)
					/*
					if( _frame.dom.navs[this.cur_page] )
						_frame.dom.navs[this.cur_page].removeClass('on')
					if( this.page_dom[this.cur_page] )
						//this.page_dom[this.cur_page].addClass('off').trigger('pageHide').detach()
					*/
				//}

			//if( _frame.dom.navs[page] )
			//	_frame.dom.navs[page].addClass('on')

			if( !options.callback_modeSelection_select ){
				if( _frame.dom.layout.hasClass('ready') )
					BgImg.change()

				if( page != 'about' )
					Lockr.set('last_page', page)
			}
			
			//_frame.dom.main.attr('data-theme', page)
			//this.cur_page = page

			_g.log( 'LOADED: ' + page )
			this.load_page_lock = false
		},








	init: function(){
		if( this.is_init )
			return true

		// 创建基础框架
			_frame.dom.mobilemenu = $('<input type="checkbox" id="view-mobile-menu"/>').prependTo( _frame.dom.layout )
			_frame.dom.logo = $('<div class="logo"/>')
								.on(_g.event.animationend, function(){
									_frame.dom.logo.addClass('ready-animated')
								})
								.appendTo( _frame.dom.layout )
			_frame.dom.nav = $('<nav/>').appendTo( _frame.dom.layout )
				_frame.dom.navlinks = $('<div class="pages"/>').appendTo( _frame.dom.nav )
					_frame.dom.globaloptions = $('<section class="options"/>').appendTo( _frame.dom.nav )
						.append(
							$('<button class="donate" icon="heart4"/>')
								.on('click', function(){_frame.app_main.load_page('donate')})
						)
						.append(
							$('<button class="show_only_bg" icon="images"/>')
								.on('click', function(){BgImg.controlsToggle()})
						)
				_frame.dom.btnsHistory = $('<div class="history"/>').insertBefore( _frame.dom.navlinks )
					_frame.dom.btnHistoryBack = $('<button class="button back" icon="arrow-set2-left"/>')
							.on({
								'click': function(){
									_frame.dom.btnHistoryForward.removeClass('disabled')
									history.back()
								}
							}).appendTo( _frame.dom.btnsHistory )
					_frame.dom.btnHistoryForward = $('<button class="button forward disabled" icon="arrow-set2-right"/>')
							.on('click', function(){
								history.forward()
							}).appendTo( _frame.dom.btnsHistory )
				_frame.dom.navtitle = $('<span class="title"/>')
							.append(
								$('<label for="view-mobile-menu"/>').html('<i></i>')
							)
							.append(
								_frame.dom.title = $('<span/>')
							)
							.appendTo( _frame.dom.nav )
			_frame.dom.main = $('<main/>').appendTo( _frame.dom.layout )
			//_frame.dom.bgimg = $('<div class="bgimg" />').appendTo( _frame.dom.layout )
			$('<div class="nav-mask"/>').appendTo( _frame.dom.layout )
				.on('click', function(){
					_frame.dom.mobilemenu.prop('checked', false)
				})

		// 功能按钮：反馈信息
		/*
			$('#titlebar>.buttons')
				.prepend(
					$('<button/>',{
						'icon': 	'cog',
						'html': 	'反馈信息'
					})
				)
		*/

		// 在右上角工具条中加入缩放功能
			let titlebar_btns = $('#titlebar > .buttons');
			if( titlebar_btns && titlebar_btns.length ){
				let o = $('<button/>',{
					'class':	'scale',
					'icon':		'zoomin',
					'html': 	Scale.get()
				}).on('click', function(){
					Scale.menuToggle(o)
				}).prependTo( titlebar_btns )
				Scale.doms.push( o )
			}

		// 创建主导航
			if( this.nav && this.nav.length ){
				_frame.dom.navs = {}
				this.navtitle = {}
				this.nav.forEach(function(o, i){
					_frame.app_main.navtitle[o.page] = o.title
					_frame.dom.navs[o.page] = (function(page){
								return $('<button class="button" />').on('click', function(){
										Page.resetScroll(page)
										_frame.app_main.load_page(page)
									})
							})(o.page).html(o.title).appendTo( _frame.dom.navlinks )
					if( o.state )
						_frame.dom.navs[o.page].attr('mod-state', o.state)
					//if( (i == 0 && !_g.uriHash('page') && !_g.uriSearch('page'))
					//	|| o.page == _g.uriSearch('page')
					//){
					//	_frame.dom.navs[o.page].trigger('click')
					//}
				})
			}

		var promise_chain 	= Q.fcall(function(){})

		// 开始异步函数链
			promise_chain

		// 检查 app-db 目录，预加载全部数据库
			.then(function(){
				var deferred = Q.defer()
				node.fs.readdir(_g.path.db, function(err, files){
					if( err ){
						deferred.reject(new Error(err))
					}else{
						files.forEach(function(file){
							_db[ node.path.parse(file)['name'] ]
								= new node.nedb({
										filename: 	node.path.join(_g.path.db, '/' + file)
									})
						})
						deferred.resolve(files)
					}
				})
				return deferred.promise
			})

		// 获取背景图列表，生成背景图
			.then(BgImg.init)

		// 读取db
			.then(function(){
				_g.log('Preload All DBs: START')
				var the_promises = []
					,dbs = []
					,loaded_count = 0

				for( var db_name in _db ){
					dbs.push(db_name)
				}

				dbs.forEach(function(db_name){
					var deferred = Q.defer()
					function _done(_db_name){
						_g.log('DB ' + _db_name + ' DONE')
						deferred.resolve()
						loaded_count++
						if( loaded_count >= dbs.length ){
							_g.log('Preload All DBs: DONE')
							setTimeout(function(){
								_frame.app_main.loaded('dbs')
							}, 100)
						}
					}
					_db[db_name].loadDatabase(function(err){
						if( err ){
							deferred.reject(new Error(err))
						}else{
							switch( db_name ){
								/*
									case 'entities':
									case 'items':
									case 'item_types':
									case 'ship_classes':
									case 'ship_types':
										_db[db_name].find({}, function(err, docs){
											if( typeof _g.data[db_name] == 'undefined' )
												_g.data[db_name] = {}
											for(var i in docs ){
												_g.data[db_name][docs[i]['id']] = docs[i]
											}
											_db_load_next()
										})
										break;
									*/
								case 'ships':
								case 'fleets':
									_done(db_name);
									break;
								case 'ship_namesuffix':
									_db.ship_namesuffix.find({}).sort({ 'id': 1 }).exec(function(dberr, docs){
										if( dberr ){
											deferred.reject(new Error(dberr))
										}else{
											_g.data.ship_namesuffix = [{}].concat(docs)
											_frame.app_main.loaded('db_namesuffix')
											_done(db_name)
										}
									})
									break;
								case 'ship_type_order':
									_db.ship_type_order.find({}).sort({'id': 1}).exec(function(dberr, docs){
										if( dberr ){
											deferred.reject(new Error(dberr))
										}else{
											docs.forEach(function(doc,i){
												_g.ship_type_order.push(
													doc['types'].length > 1 ? doc['types'] : doc['types'][0]
												)
												_g.ship_type_order_full = _g.ship_type_order_full.concat( doc['types'] )
												//_g.data['ship_type_order'][doc['id']] = doc
												_g.data['ship_type_order'][i] = doc
											})
											// ship type -> ship order
												_g.ship_type_order.forEach(function(currentValue, i){
													if( typeof _g.ship_type_order[i] == 'object' ){
														_g.ship_type_order[i].forEach(function(cur, j){
															_g.ship_type_order_map[ _g.ship_type_order[i][j] ] = i
														})
													}else{
														_g.ship_type_order_map[ _g.ship_type_order[i] ] = i
													}
												})
											_db.ships.find({}).sort({
												//'class': 1, 'class_no': 1, 'series': 1, 'type': 1, 'time_created': 1, 'name.suffix': 1
												'type': 1, 'class': 1, 'class_no': 1, 'time_created': 1, 'name.suffix': 1
											}).exec(function(dberr2, docs){
												if( dberr2 ){
													deferred.reject(new Error(dberr))
												}else{
													docs.forEach(function(doc){
														_g.data.ships[doc['id']] = new Ship(doc)

														if( typeof _g.data.ship_id_by_type[ _g.ship_type_order_map[doc['type']] ] == 'undefined' )
															_g.data.ship_id_by_type[ _g.ship_type_order_map[doc['type']] ] = []
														_g.data.ship_id_by_type[ _g.ship_type_order_map[doc['type']] ].push( doc['id'] )
													})
													function __(i){
														let j=0
														while(
															_g.data.ship_id_by_type[i]
															&& _g.data.ship_id_by_type[i][j]
														){
															let id = _g.data.ship_id_by_type[i][j]
																,i_remodel
																,next_id = _g.data.ships[id].remodel ? _g.data.ships[id].remodel.next : null
															if( next_id
																&& _g.data.ships[next_id]
																&& next_id != _g.data.ship_id_by_type[i][j+1]
																&& (i_remodel = $.inArray(next_id, _g.data.ship_id_by_type[i])) > -1
															){
																_g.log(
																	id
																	+ ', ' + next_id
																	+ ', ' + i_remodel
																)
																_g.data.ship_id_by_type[i].splice(
																	i_remodel,
																	1
																)
																_g.data.ship_id_by_type[i].splice(
																	$.inArray(id, _g.data.ship_id_by_type[i])+1,
																	0,
																	next_id
																)
																//console.log(_g.data.ship_id_by_type[i])
																__(i)
																break
															}
															if( j >= _g.data.ship_id_by_type[i].length - 2 ){
																i++
																j=0
															}else{
																j++
															}
														}
													}
													__(0)
													_done(db_name)
												}
											})
										}
									})
									break;
								case 'updates':
									if( typeof _g.data[db_name] == 'undefined' )
										_g.data[db_name] = {}
									_done(db_name)
									break;
								case 'arsenal_all':
									_g.data['arsenal_all'] = []
									_db.arsenal_all.find({}).sort({
										'sort': 1
									}).exec(function(err, docs){
										docs.forEach(function(doc){
											_g.data['arsenal_all'].push(doc['id'])
										})
										_done(db_name)
									})
									break;
								case 'arsenal_weekday':
									_g.data['arsenal_weekday'] = {}
									_db.arsenal_weekday.find({}).sort({
										'weekday': 1
									}).exec(function(err, docs){
										docs.forEach(function(doc, i){
											_g.data['arsenal_weekday'][i]
												= doc.improvements
										})
										_done(db_name)
									})
									break;
								default:
									_db[db_name].find({}, function(dberr, docs){
										if( dberr ){
											deferred.reject(new Error(dberr))
										}else{
											if( typeof _g.data[db_name] == 'undefined' )
												_g.data[db_name] = {}
											docs.forEach(function(doc){
												switch( db_name ){
													case 'items':
														_g.data[db_name][doc['id']] = new Equipment(doc)
														break;
													case 'entities':
														_g.data[db_name][doc['id']] = new Entity(doc)
														break;
													default:
														_g.data[db_name][doc['id']] = doc
														break;
												}
											})
											_done(db_name)
										}
									})
									break;
							}

						}
					})
					the_promises.push(deferred.promise)
				})

				return Q.all(the_promises);
			})

		// 根据装备大类和类型排序整理装备ID
			.then(function(){
				var deferred = Q.defer()
				_g.data.item_id_by_type = []
				_g.item_type_order = []
				var type_by_collection = {}
					,type_order_map = {}
				// 遍历大类
					for(var i in _g.data.item_type_collections){
						for(var j in _g.data.item_type_collections[i]['types']){
							type_by_collection[ _g.data.item_type_collections[i]['types'][j] ] = i
							_g.item_type_order.push( _g.data.item_type_collections[i]['types'][j] )
							type_order_map[ _g.data.item_type_collections[i]['types'][j] ] = _g.item_type_order.length - 1
						}
					}
				// 遍历装备数据
					for(var i in _g.data.items){
						var order = type_order_map[ _g.data.items[i]['type'] ]
						if( !_g.data.item_id_by_type[order] )
							_g.data.item_id_by_type[order] = {
								'collection': type_by_collection[_g.data.items[i]['type']],
								'equipments': [],
								'names': []
							}
						_g.data.item_id_by_type[order]['equipments'].push( _g.data.items[i]['id'] )
						_g.data.item_id_by_type[order]['names'].push( _g.data.items[i].getName() )
					}
				// 排序
					_g.data.item_id_by_type.forEach(function(currentValue){
						currentValue['equipments'].sort(function(a, b){
							let diff = _g.data.items[a].getPower() - _g.data.items[b].getPower()
							if( diff === 0 ){
								let diff_aa = _g.data.items[a]['stat']['aa'] - _g.data.items[b]['stat']['aa']
								if( diff_aa === 0 ){
									return _g.data.items[a]['stat']['hit'] - _g.data.items[b]['stat']['hit']
								}
								return diff_aa
							}
							return diff
						})
					})
				setTimeout(function(){
					deferred.resolve()
				}, 100)
				return deferred.promise
			})

		// 如果从启动器载入，检查数据是否有更新
			.then(function(){
				_g.log('数据更新检查: START')
				if( global.launcherOptions && global.launcherOptions["dataUpdated"] )
					return global.launcherOptions["dataUpdated"]
				return {}
			})
			.then(function(dataUpdated){
				var the_promises = []
					,updated = []
					,done_count = 0
					,doms = $()

				for(var i in dataUpdated){
					var version = dataUpdated[i].split('.')
						,_version = ''

					for( var j = 0; j < Math.min(3, version.length); j++ )
						_version+= '.' + version[j]

					_version = _version.substr(1)
					updated.push({
						'type': 	i,
						'version': 	_version
					})
				}

				if( !updated.length ){
					_g.log('数据更新检查: DONE，无数据更新')
					return false
				}else{
					updated.forEach(function(obj){
						var deferred = Q.defer()

						function _done(item){
							_g.log('数据更新检查: '+item+' DONE')
							deferred.resolve()
							done_count++
							if( done_count >= updated.length ){
								if( doms.length ){
									_g.log('数据更新检查: DONE')
									_frame.app_main.functions_on_ready.push(function(){
										_frame.modal.show(
											$('<div class="updates"/>')
												.append(doms)
												.on('click.infosHideModal', '[data-infos], a[href^="?page="]', function(){
													_frame.modal.hide()
												}),
											'<span>更新日志</span>',
											{
												'classname': 	'update_journal'
											}
										)
									})
								}else{
									_g.log('数据更新检查: DONE，无更新日志')
								}
								//setTimeout(function(){
								//}, 100)
							}
						}

						_db.updates.find(obj).sort({'date': -1}).exec(function(err, docs){
							if( err ){
								deferred.reject(new Error(err))
							}else{
								docs.forEach(function(doc){
									var section = $('<section class="update_journal" data-version-'+doc['type']+'="'+doc['version']+'"/>')
												.html(_frame.app_main.page['about'].journaltitle(doc))
									try{
										$(_frame.app_main.page['about'].journal_parse(doc['journal'])).appendTo( section )
									}catch(e){
										_g.error(e)
										section.remove()
									}
									doms = doms.add(section)
								})
								_done(obj['type'] + ' - ' + obj['version'])
							}
						})

						the_promises.push(deferred.promise)
					})

					return Q.all(the_promises);
				}
			})

		// 部分全局事件委托
			.then(function(){
				let link_page = function(e){
							e.preventDefault()
							_frame.app_main.load_page($(this).attr('href').substr('?page='.length))
						},
					link_infos = function(e){
							e.preventDefault()
							let el = $(this)
							if( !el.attr('data-infos') ){
								let exp = /^[\?]{0,1}infos\=([^\&]+)\&id\=([^\&]+)/ig.exec(el.attr('href'))
								el.attr('data-infos', '[[' + exp[1].toUpperCase() + '::' + exp[2] + ']]')
								//el.trigger('click')
								_frame.infos.click(el)
							}
						}
					
				$body.on('click.pagechange', 'a[href^="?page="]', link_page)
					.on('click.pagechange', 'a[href^="?infos="]', link_infos)
                    .on('keydown', function(e){
                        switch(e.keyCode){
                            case 123:
                                node.win.showDevTools()
                                break;
                        }
                    })
				/*
					$html.on('click.openShipModal', '[data-shipid][modal="true"]', function(e){
						if( !(e.target.tagName.toLowerCase() == 'input' && e.target.className == 'compare') ){
							if( $(this).data('shipedit') ){
								try{
									//_frame.app_main.page['ships'].show_ship_form( _g.data.ships[ $(this).data('shipid') ] )
								}catch(err){}
							}else{
								try{
									_frame.app_main.show_ship( _g.data.ships[ $(this).data('shipid') ] )
								}catch(err){}
							}
						}
					})
				*/
				return true
			})

		// 鼠标侧键操作

		// Debug Mode
			.then(function(){
				if( debugmode ){
					_frame.dom.hashbar = $('<input type="text"/>')
							.on({
								'urlchanged': function(){
									$(this).val(
										location.href.substr( (location.origin + location.pathname).length )
									)
								},
								'change': function(){
									location.replace( location.origin + location.pathname + _frame.dom.hashbar.blur().val() )
								}
							})
							.appendTo(
								$('<div class="debug_hashbar"/>').appendTo(_frame.dom.layout)
							)
							.trigger( 'urlchanged' )
					//_frame.dom.layout.addClass('debug-hashbar')
					$window.on({
						'hashchange.debug_mode_hashbar': function(){
							_frame.dom.hashbar.trigger('urlchanged')
						},
						'popstate.debug_mode_hashbar': function(){
							_frame.dom.hashbar.trigger('urlchanged')
						}
					})
					// HACK: 在 history.pushstate() 同时，触发 window.onpopstate 事件
					// http://felix-kling.de/blog/2011/01/06/how-to-detect-history-pushstate/
					function hackHistory(history){
						var pushState = history.pushState;
						history.pushState = function(state) {
							if (typeof history.onpushstate == "function") {
								history.onpushstate({state: state});
							}
							setTimeout(function(){
								//$window.trigger('popstate')
								_frame.dom.hashbar.trigger('urlchanged')
							}, 1)
							return pushState.apply(history, arguments);
						}
					}
					hackHistory(window.history);

					if( titlebar_btns && titlebar_btns.length ){					
						// 在标题栏添加hashbar开关
							titlebar_btns.prepend( $('<button/>',{
								'class':	'console',
								'html':		'Toggle Hashbar'
							}).on('click', function(){
								_frame.dom.layout.toggleClass('debug-hashbar')
							}) )
						
						// 在标题栏添加Web输出入口
							$.getScript('../dev-output/js-output/output.js', function(){
								titlebar_btns.prepend( $('<button/>',{
									'class':	'console',
									'html':		'Output to Web'
								}).on('click', function(){
									_frame.modal.show(
										dev_output_form(),
										'Output to Web',
										{
											'detach':	true
										}
									)
								}) )
							})
					}
				}
				return true
			})
		
		// 广告
			.then(function(){
				_frame.gg(_frame.dom.layout)
			})

		// 错误处理
			.catch(function (err) {
				_g.error(err, '初始化进程')
			})
			.done(function(){
				_g.buildIndex();
				_g.log('Global initialization DONE')
			})

		// 标记已进行过初始化函数
			this.is_init = true
	}
};









// 缩放相关
let Scale = {
	cur: 	1,
	doms:	[],
	preset: [
		0.75,
		1,
		1.25,
		1.5,
		2
	],

	get: function( value ){
		return (value || this.cur) * 100;
	},

	set: function( value ){
		if( value < 0.5 )
			value = 0.5
		_g.zoom(value);
		this.cur = value;
		this.update();
		localforage.setItem( 'scale', value )
	},

	update: function(){
		let value = this.get();
		this.doms.forEach(function($el){
			$el.html( value ).val( value );
		});
	},

	getPresetIndex: function( value ){
		value = value || this.cur;
		let index = 0;
		this.preset.some(function(v, i){
			index = i;
			return value <= v
		})
		return index
	},

	menuShow: function( $el ){
		if( !this.menu ){
			let setScale = function(value, e){
				if( e ){
					e.stopImmediatePropagation();
					e.stopPropagation();
				}
				Scale.set( value );
				setTimeout(function(){
					Scale.menu.position( $el );
				}, 100)

				if( value <= Scale.preset[0] )
					decrease.attr('disabled', true)
				else
					decrease.removeAttr('disabled')

				if( value >= Scale.preset[Scale.preset.length-1] )
					increase.attr('disabled', true)
				else
					increase.removeAttr('disabled')
			}

			let menuitems = []
			let input = $('<input/>',{
				'type':	'number'
			}).val(this.get(this.cur)).on({
				'change': function(){
					setScale(input.val() / 100)
				},
				'click': function(e){
					e.stopImmediatePropagation();
					e.stopPropagation();
				}
			});
			this.doms.push(input);

			let decrease = $('<menuitem/>',{
							'class':'decrease',
							'html':	'-'
						}).on('click', function(e){
							let index = Scale.getPresetIndex();
							index = Math.max( index, 1 );
							setScale( Scale.preset[index - 1], e );
						})
			let increase = $('<menuitem/>',{
							'class':'increase',
							'html':	'+'
						}).on('click', function(e){
							let index = Scale.getPresetIndex();
							if( Scale.cur == Scale.preset[index] )
								index++;
							index = Math.min( index, Scale.preset.length - 1 );
							setScale( Scale.preset[index], e );
						})

			menuitems.push($('<div class="item">窗口缩放</div>')
				.add(
					$('<div class="scale"/>')
						.append(decrease)
						.append(input)
						.append(
							$('<span>%</span>')
						)
						.append(increase)
				)
			);

			this.preset.forEach(function(value){
				menuitems.push(
					$('<menuitem/>',{
						'html':		Scale.get(value) + '%'
					}).on('click', function(e){
						setScale(value, e)
					})
				)
			});

			this.menu = new _menu({
				'className': 'contextmenu-scale',
				'items': menuitems
			})
		}
		this.menu.show( $el )
	},

	menuToggle: function( $el ){
		if( this.menu && this.menu.showing )
			this.menu.hide()
		else
			this.menuShow( $el )
	}
};
localforage.getItem(
	'scale',
	function(err, value){
		if( value )
			Scale.set(value);
	}
);