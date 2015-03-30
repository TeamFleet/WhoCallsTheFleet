// node.js modules
	node.require('fs')
	node.require('nedb')
	node.require('path')
	node.require('mkdirp')





// Global Variables
	_g.animate_duration_delay = 320;
	_g.execPath = node.path.dirname(process.execPath)
	_g.inputIndex = 0
	_g.lang = 'zh_cn'

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
		'entities': {},
		'ships': {},
		'ship_id_by_type': [], 			// refer to _g.ship_type_order
		'ship_types': {},
		'ship_classes': {}
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
					$window.on('hashchange.pagechange', function(){
						_frame.app_main.load_page_func(_g.uriHash('page'))
					})

				_frame.app_main.load_page_func(_g.uriHash('page'))
				_frame.app_main.is_loaded = true
			}
		},


	// 更换背景图
		//change_bgimg_fadein: false,
		change_bgimg: function( bgimgs_new ){
			// _frame.app_main.bgimgs 未生成，函数不予执行
			if( !_frame.app_main.bgimgs.length )
				return false

			var bgimgs = bgimgs_new && bgimgs_new.length ? bgimgs_new : _frame.app_main.bgimgs
				,img_new = bgimgs[_g.randInt(bgimgs.length)]
				,img_old = _frame.app_main.cur_bgimg_el ? _frame.app_main.cur_bgimg_el.css('background-image') : null

			img_old = img_old ? img_old.split('/') : null
			img_old = img_old ? img_old[img_old.length - 1].split(')') : null
			img_old = img_old ? img_old[0] : null

			while( img_new == img_old ){
				img_new = bgimgs[_g.randInt(bgimgs.length - 1)]
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
				var bgimgs_last = _config.get('bgimgs').split(',')
					,bgimgs_new = []
				for( var i in files ){
					if( !node.fs.lstatSync(_frame.app_main.bgimg_dir + '/' + files[i]).isDirectory() ){
						_frame.app_main.bgimgs.push( files[i] )
						if( $.inArray( files[i], bgimgs_last ) < 0 )
							bgimgs_new.push( files[i] )
					}
				}
				_config.set(
					'bgimgs',
					_frame.app_main.bgimgs
				)
				_frame.app_main.change_bgimg( bgimgs_new );
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
							case 'entities':
								_db.entities.find({}, function(err, docs){
									for(var i in docs ){
										_g.data.entities[docs[i]['id']] = docs[i]
									}
								})
								break;
							case 'ship_namesuffix':
								_db.ship_namesuffix.find({}).sort({ 'id': 1 }).exec(function(err, docs){
									_g.data.ship_namesuffix = [{}].concat(docs)
									_frame.app_main.loaded('db_namesuffix')
								})
								break;
							case 'ship_types':
								_db.ship_types.find({}, function(err, docs){
									for(var i in docs ){
										_g.data.ship_types[docs[i]['id']] = docs[i]
									}
								})
								break;
							case 'ship_classes':
								_db.ship_classes.find({}, function(err, docs){
									for(var i in docs ){
										_g.data.ship_classes[docs[i]['id']] = docs[i]
									}
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

		_frame.app_main.is_init = true
	}
}
























// Modal: Ship
	_frame.app_main.show_ship = function( d ){
		function _val( val, show_zero ){
			if( !show_zero && (val == 0 || val == '0') )
				return '<small class="zero">-</small>'
			if( val == -1 || val == '-1' )
				return '<small class="zero">?</small>'
			return val
		}

		_frame.modal.resetContent()

		if( debugmode )
			console.log(d)

		var dom = $('<div class="ship"/>')

		// 图鉴
			var illusts = $('<div class="illustrations"/>')
							.append(
								$('<img src="' + _g.path.pics.ships + '/' + d['id'] + '/2.jpg' + '"/>')
							)
							.appendTo(dom)

		// 舰种&舰级
			$('<small/>')
				.html(
					( d['class'] ? _g['data']['ship_classes'][d['class']]['name_zh'] + '级' : '' )
						+ ( d['class_no'] ? '<em>' + d['class_no'] + '</em>号舰' : '' )
						+ ( d['type'] ? '<br/>' + _g['data']['ship_types'][d['type']]['full_zh'] : '' )
				)
				.appendTo(dom)

		// 默认装备&搭载数
			var equips = $('<div class="equipments"/>').appendTo(dom)
				,i = 0
			while( i < 4 ){
				var equip = $('<button/>').appendTo(equips)
					,icon = $('<i/>').appendTo( equip )
					,name = $('<small/>').appendTo( equip )
					,slot = $('<em/>').appendTo( equip )

				if( typeof d['slot'][i] == 'undefined' ){
					equip.addClass('no')
				}else if( typeof d['equip'][i] == 'undefined' || !d['equip'][i] || d['equip'][i] === '' ){
					equip.addClass('empty')
					name.html( '--未装备--' )
					slot.html( d['slot'][i] )
				}else{
					equip.attr({
						'data-itemid': 	d['equip'][i],
						'tooltip':		true
					})
					name.html( '装备#' + d['equip'][i] )
					slot.html( d['slot'][i] )
				}
				i++
			}

		// 属性
			var stat1 = $('<div class="stats"/>').appendTo(dom)
				,stat2 = $('<div class="stats"/>').appendTo(dom)
				,stat3 = $('<div class="stats"/>').appendTo(dom)
				,stat_consum = $('<div class="stats consum"/>').html('<strong>消耗</strong>').appendTo(dom)
			function _add_stat( name, title, val, tar ){
				$('<span/>')
					.html(
						'<small class="stat-'+name+'">' + title + '</small>'
						+ '<em>' + val + '</em>'
					)
					.appendTo(tar)
			}
			_add_stat( 'hp', 		'耐久', _val( d['stat']['hp'] ), 			stat1 )
			_add_stat( 'armor', 	'装甲', _val( d['stat']['armor_max'] ),		stat1 )
			_add_stat( 'evasion', 	'回避', _val( d['stat']['evasion_max'] ),	stat1 )
			_add_stat( 'carry', 	'搭载', _val( d['stat']['carry'] ),			stat1 )

			_add_stat( 'fire', 		'火力', _val( d['stat']['fire_max'] ),		stat2 )
			_add_stat( 'torpedo', 	'雷装', _val( d['stat']['torpedo_max'] ),	stat2 )
			_add_stat( 'aa', 		'对空', _val( d['stat']['aa_max'] ),		stat2 )
			_add_stat( 'asw', 		'对潜', _val( d['stat']['asw_max'], /^(5|8|9|12)$/.test( d['type'] ) ),		stat2 )

			_add_stat( 'speed', 	'航速', _g.getStatSpeed( d['stat']['speed'] ),		stat3 )
			_add_stat( 'range', 	'射程', _g.getStatRange( d['stat']['range'] ),		stat3 )
			_add_stat( 'los', 		'索敌', _val( d['stat']['los_max'] ),		stat3 )
			_add_stat( 'luck', 		'运', 	d['stat']['luck'] + '<sup>' + d['stat']['luck_max'] + '</sup>',		stat3 )

			_add_stat( 'fuel', 		'', _val( d['consum']['fuel'] ),		stat_consum )
			_add_stat( 'ammo', 		'', _val( d['consum']['ammo'] ),		stat_consum )

		// 声优&画师_g.data.entities
			$('<div class="entity"/>')
				.html(
					'<strong>声优</strong>'
					+ '<span>' + _g['data']['entities'][d['rels']['cv']]['name'][_g.lang] + '</span>'
				)
				.appendTo(dom)
			$('<div class="entity"/>')
				.html(
					'<strong>画师</strong>'
					+ '<span>' + _g['data']['entities'][d['rels']['illustrator']]['name'][_g.lang] + '</span>'
				)
				.appendTo(dom)

		// 改造信息
			if( d['series'] ){
				_db.ship_series.find({'id': d['series']}, function(err,docs){
					if( !err && docs && docs.length ){
						var prev_id = prev_lvl = prev_blueprint = next_id = next_lvl = next_blueprint = null
						// 遍历 docs[0].ships，寻找该舰娘ID，确定改造前后版本
							for(var i in docs[0].ships){
								if( docs[0].ships[i]['id'] == d['id'] ){
									var _i = parseInt(i)
									// 如果 i > 0，表明有改造前版本
										if( _i ){
											prev_id 		= docs[0].ships[ _i - 1 ]['id']
											prev_lvl 		= docs[0].ships[ _i - 1 ]['next_lvl']
											prev_blueprint 	= docs[0].ships[ _i - 1 ]['next_blueprint'] ? true : false
										}
									// 如果 i < docs[0].ships.length-1，表明有改造后版本
										if( _i < docs[0].ships.length-1 ){
											next_id 		= docs[0].ships[ _i + 1 ]['id']
											next_lvl 		= docs[0].ships[ _i ]['next_lvl']
											next_blueprint 	= docs[0].ships[ _i ]['next_blueprint'] ? true : false
										}
								}
							}
						// 根据刚才获得的数据创建改造信息DOM
							if( prev_id !== null || next_id !== null ){
								var remodels = $('<div class="remodels"/>').appendTo(dom)
								if( prev_id !== null ){
									$('<div/>')
										.addClass('prev' + (prev_blueprint ? ' blueprint' : '') )
										.html('<span>' + prev_lvl + '</span>')
										.append(
											$('<button data-shipid="'+ prev_id +'" modal="true"/>')
												.html('<img src="' + _g.path.pics.ships + '/' + prev_id+'/0.jpg"/>')
										)
										.appendTo(remodels)
								}
								if( next_id !== null ){
									$('<div/>')
										.addClass('next' + (next_blueprint ? ' blueprint' : '') )
										.html('<span>' + next_lvl + '</span>')
										.append(
											$('<button data-shipid="'+ next_id +'" modal="true"/>')
												.html('<img src="' + _g.path.pics.ships + '/' + next_id+'/0.jpg"/>')
										)
										.appendTo(remodels)
								}
							}
					}
				})
			}

		// 按钮
			var buttons = $('<div class="buttons"/>').appendTo(dom)

		_frame.modal.show(
			dom,
			_g.getName( d['name'], '・' ) || '舰娘',
			{
				'classname': 		'infos',
				'blank_to_close': 	true
			}
		)
	}