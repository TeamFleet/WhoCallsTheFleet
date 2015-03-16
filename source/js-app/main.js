// node.js modules
	node.require('fs')
	node.require('nedb')
	node.require('path')
	node.require('mkdirp')





// Global Variables
	_g.animate_duration_delay = 320;
	_g.execPath = node.path.dirname(process.execPath)
	_g.inputIndex = 0

	_g.path = {
		'db': 		process.cwd() + '/data/',
		'pics': {
			'ships': 	process.cwd() + '/pics/ships/',
			'items': 	process.cwd() + '/pics/items/'
		},
		'illustrations': {
			'ships': 	_g.execPath + '/illust/ships/',
			'items': 	_g.execPath + '/illust/items/'
		}
	}

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
		'ships': {},
		'ship_id_by_type': [], 			// refer to _g.ship_type_order
		'ship_types': {}
	}

	var _db = {
		'ships': new node.nedb({
				filename: 	_g.path.db + '/ships.json'
			}),
		'ship_types': new node.nedb({
				filename: 	_g.path.db + '/ship_types.json'
			}),
		'ship_classes': new node.nedb({
				filename: 	_g.path.db + '/ship_classes.json'
			}),
		'ship_series': new node.nedb({
				filename: 	_g.path.db + '/ship_series.json'
			}),
		'ship_namesuffix': new node.nedb({
				filename: 	_g.path.db + '/ship_namesuffix.json'
			}),
		'items': new node.nedb({
				filename: 	_g.path.db + '/items.json'
			}),
		'item_types': new node.nedb({
				filename: 	_g.path.db + '/item_types.json'
			}),
		'entities': new node.nedb({
				filename: 	_g.path.db + '/entities.json'
			})
	}

	_g.ship_type_order = [
		//6,			// BB
		//[7, 18],	// BB (Fast)
		//20, 		// BB (Super Dreadnaught)
		[6, 7, 18, 20],	// BB
		8,			// BBV

		10,			// CV
		11,			// CV (Armored)
		9,			// CVL

		4,			// CA
		23,			// CA (AA)
		5,			// CAV

		2,			// CL
		3,			// CLT

		1,			// DD
		19,			// DD (AA)

		13,			// SS
		14,			// SSV

		17,			// AS
		12,			// AV
		15,			// LHA
		21,			// CT
		16,			// AR
	]
	// ship type -> ship order
	_g.ship_type_order_map = {}
	_g.ship_type_order_map_do = function(){
		for( var i in _g.ship_type_order ){
			var index = parseInt(i)
			if( typeof _g.ship_type_order[i] == 'object' ){
				for( var j in _g.ship_type_order[i] ){
					_g.ship_type_order_map[ _g.ship_type_order[i][j] ] = index
				}
			}else{
				_g.ship_type_order_map[ _g.ship_type_order[i] ] = index
			}
		}
	}
	_g.ship_type_order_map_do()
















// Global Functions
	_g.statSpeed = {
		5: 	'低速',
		10: '高速'
	}
	_g.statRange = {
		1: 	'短',
		2: 	'中',
		3: 	'长',
		4: 	'超长'
	}
	_g.getStatSpeed = function( speed ){
		speed = parseInt(speed)
		return _g.statSpeed[speed]
	}
	_g.getStatRange = function( range ){
		range = parseInt(range)
		return _g.statRange[range]
	}
















// Global Frame
_frame.app_main = {
	page: {},
	page_dom: {},

	// is_init: false
	bgimg_dir: 	'./app/assets/images/homebg',
	bgimgs: 	[],
	// cur_bgimg_el: null

	// cur_page: null

	// 尚未载入完毕的内容
		loading: [
			'dbs',
			'bgimgs',
			'db_namesuffix'
		],
		// is_loaded: false,

	// 载入完毕一项内容，并检查其余内容是否载入完毕
	// 如果全部载入完毕，#layout 添加 .ready
		loaded: function( item, is_instant ){
			_frame.app_main.loading.splice(_frame.app_main.loading.indexOf(item), 1)
			if( !_frame.app_main.loading.length && !_frame.app_main.is_loaded ){
				setTimeout(function(){
					if( _frame.app_main.is_loaded )
						_frame.dom.layout.addClass('ready')
				}, is_instant ? 300 : 1000)
				// 绑定onhashchange事件
					$(window).on('hashchange.pagechange', function(){
						_frame.app_main.load_page_func(_g.uriHash('page'))
					})

				_frame.app_main.load_page_func(_g.uriHash('page'))
				_frame.app_main.is_loaded = true
			}
		},


	// 更换背景图
		//change_bgimg_fadein: false,
		change_bgimg: function(){
			// _frame.app_main.bgimgs 未生成，函数不予执行
			if( !_frame.app_main.bgimgs.length )
				return false

			var img_new = _frame.app_main.bgimgs[_g.randInt(_frame.app_main.bgimgs.length)]
				,img_old = _frame.app_main.cur_bgimg_el ? _frame.app_main.cur_bgimg_el.css('background-image') : null

			img_old = img_old ? img_old.split('/') : null
			img_old = img_old ? img_old[img_old.length - 1].split(')') : null
			img_old = img_old ? img_old[0] : null

			while( img_new == img_old ){
				img_new = _frame.app_main.bgimgs[_g.randInt(_frame.app_main.bgimgs.length - 1)]
			}

			var img_new_blured = '.' + _frame.app_main.bgimg_dir + '/blured/' + img_new
			img_new = '.' + _frame.app_main.bgimg_dir + '/' + img_new

			function delete_old_dom( old_dom ){
				setTimeout(function(){
					old_dom.remove()
				}, _g.animate_duration_delay)
			}

			if( img_old ){
				delete_old_dom( _frame.app_main.cur_bgimg_el )
			}

			//_frame.app_main.cur_bgimg_el = $('<img src="' + img_new + '" />').appendTo( _frame.dom.bgimg )
			_frame.app_main.cur_bgimg_el = $('<div/>').css('background-image','url('+img_new+')').appendTo( _frame.dom.bgimg )
											.add( $('<s'+( _frame.app_main.change_bgimg_fadein ? ' class="fadein"' : '' )+'/>').css('background-image','url('+img_new_blured+')').appendTo( _frame.dom.nav ) )
											.add( $('<s'+( _frame.app_main.change_bgimg_fadein ? ' class="fadein"' : '' )+'/>').css('background-image','url('+img_new_blured+')').appendTo( _frame.dom.main ) )

			_frame.app_main.change_bgimg_fadein = true
		},





	// 隐藏内容，只显示背景图
		toggle_hidecontent: function(){
			_frame.dom.layout.toggleClass('hidecontent')
		},





	// 更换页面
		load_page: function( page ){
			_g.uriHash('page', page)
		},
		load_page_func: function( page ){
			if( _frame.app_main.cur_page == page || !page )
				return page

			if( !_frame.app_main.page_dom[page] ){
				_frame.app_main.page_dom[page] = $('<div class="page" page="'+page+'"/>').appendTo( _frame.dom.main )
				node.fs.readFile('./app/page/' + page + '.html', 'utf8', function(err, data){
					if(err)
						throw err
					_frame.app_main.page_dom[page].html( data )
					if( _frame.app_main.page[page] && _frame.app_main.page[page].init )
						_frame.app_main.page[page].init(_frame.app_main.page_dom[page])
					_p.initDOM(_frame.app_main.page_dom[page])
				})
			}

			_frame.app_main.page_dom[page].removeClass('off')

			// 关闭之前的页面
				if( _frame.app_main.cur_page ){
					_frame.dom.navs[_frame.app_main.cur_page].removeClass('on')
					_frame.app_main.page_dom[_frame.app_main.cur_page].addClass('off')
				}

			_frame.dom.navs[page].addClass('on')

			if( _frame.dom.layout.hasClass('ready') )
				_frame.app_main.change_bgimg()

			_frame.app_main.cur_page = page
		},






	init: function(){
		if( _frame.app_main.is_init )
			return true

		// 创建基础框架
			_frame.dom.nav = $('<nav/>').appendTo( _frame.dom.layout )
				_frame.dom.logo = $('<button class="logo" />')
									.on({
										'animationend, webkitAnimationEnd': function(e){
											$(this).addClass('ready-animated')
										}
									})
									.appendTo( _frame.dom.nav )
				/*
				_frame.dom.logo = $('<button class="logo" />').on('click', function(){
										_frame.app_main.toggle_hidecontent()
									})
									.html('<strong>' + node.gui.App.manifest['name'] + '</strong><b>' + node.gui.App.manifest['name'] + '</b>')
									.on({
										'animationend, webkitAnimationEnd': function(e){
											$(this).addClass('ready-animated')
										}
									})
									.appendTo( _frame.dom.nav )
				*/
				_frame.dom.navlinks = $('<div/>').appendTo( _frame.dom.nav )
			_frame.dom.main = $('<main/>').appendTo( _frame.dom.layout )
			_frame.dom.bgimg = $('<div class="bgimg" />').appendTo( _frame.dom.layout )

		// 创建主导航
			function navLink(page){
				return $('<button />').on('click', function(){
						_frame.app_main.load_page(page)
					})
			}
			if( _frame.app_main.nav && _frame.app_main.nav.length ){
				_frame.dom.navs = {}
				for( var i in _frame.app_main.nav ){
					var o = _frame.app_main.nav[i]
					_frame.dom.navs[o.page] = navLink(o.page).html(o.title).appendTo( _frame.dom.navlinks )
					if( i == 0 && !_g.uriHash('page') ){
						_frame.dom.navs[o.page].trigger('click')
					}
				}
			}

		// 获取背景图列表，生成背景图
			node.fs.readdir(_frame.app_main.bgimg_dir, function(err, files){
				for( var i in files ){
					if( !node.fs.lstatSync(_frame.app_main.bgimg_dir + '/' + files[i]).isDirectory() )
						_frame.app_main.bgimgs.push( files[i] )
				}
				_frame.app_main.change_bgimg();
				_frame.app_main.loaded('bgimgs')
				//if( !_g.uriHash('page') )
				//	_frame.app_main.load_page( _frame.app_main.nav[0].page )
				//setTimeout(function(){
				//	_frame.dom.layout.addClass('ready')
				//}, 1000)
			})

		// 读取db
			var _db_size = 0
				,_db_loaded = 0
			for( var i in _db )
				_db_size++
			function _db_load( db_name ){
				_db[db_name].loadDatabase(function(err){
					if( err ){

					}else{
						_db_loaded++

						switch( db_name ){
							case 'ship_namesuffix':
								_db.ship_namesuffix.find({}).sort({ 'id': 1 }).exec(function(err, docs){
									_g.data.ship_namesuffix = [{}].concat(docs)
									_frame.app_main.loaded('db_namesuffix')
								})
								break;
						}

						if( _db_loaded >= _db_size )
							_frame.app_main.loaded('dbs')
					}
				})
			}
			for( var i in _db ){
				_db_load(i)
			}

		// 部分全局事件委托
			$('html').on('click.openShipModal', '[data-shipid]', function(){
				if( $(this).data('shipmodal') == 'false' )
					return false
				if( $(this).data('shipedit') ){
					try{
						//_frame.app_main.page['ships'].show_ship_form( _g.data.ships[ $(this).data('shipid') ] )
					}catch(e){}
				}else{
					try{
						_frame.app_main.show_ship( _g.data.ships[ $(this).data('shipid') ] )
					}catch(e){}
				}
			})

		_frame.app_main.is_init = true
	}
}