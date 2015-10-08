"use strict";

let dev_output_steps = []
	,dev_output_tmpl
	,dev_output_dir
	,dev_output_el_log
	,dev_output_only_assets = false
	,dev_output_log = function(msg){
		dev_output_el_log.prepend($('<div/>',{
			'html':	msg
		}))
		_g.log(msg)
	}

function dev_output_gen_title(){
	if( arguments && arguments.length )
		return Array.prototype.join.call(arguments, ' - ') + ' - 是谁呼叫舰队'
	return '是谁呼叫舰队'
}

function dev_output_filter(output, pagetype, name){
	let searchRes
		,scrapePtrn = /\.\.\/\.\.\/app\//gi
		while( (searchRes = scrapePtrn.exec(output)) !== null ){
			try{
				console.log(searchRes[0])
				output = output.replace( searchRes[0], '/!/assets/' )
			}catch(e){}
		}

	searchRes = null
	scrapePtrn = /\.\.\/app\/assets\//gi
		while( (searchRes = scrapePtrn.exec(output)) !== null ){
			try{
				output = output.replace( searchRes[0], '/!/assets/' )
			}catch(e){}
		}

	searchRes = null
	scrapePtrn = /\.\.\/pics\//gi
		while( (searchRes = scrapePtrn.exec(output)) !== null ){
			try{
				output = output.replace( searchRes[0], '/!/pics/' )
			}catch(e){}
		}

	searchRes = null
	scrapePtrn = new RegExp(_g.path.pics.ships.replace(/\\/g, '/').replace(/\./g, '\\.'), 'gi')
		while( (searchRes = scrapePtrn.exec(output)) !== null ){
			try{
				output = output.replace( searchRes[0], '/!/pics/ships/' )
			}catch(e){}
		}

	searchRes = null
	scrapePtrn = new RegExp(_g.path.pics.ships.replace(/\\/g, '\\\\').replace(/\./g, '\\.'), 'gi')
		while( (searchRes = scrapePtrn.exec(output)) !== null ){
			try{
				output = output.replace( searchRes[0], '/!/pics/ships/' )
			}catch(e){}
		}

	searchRes = null
	scrapePtrn = new RegExp(_g.path.pics.items.replace(/\\/g, '/').replace(/\./g, '\\.'), 'gi')
		while( (searchRes = scrapePtrn.exec(output)) !== null ){
			try{
				output = output.replace( searchRes[0], '/!/pics/items/' )
			}catch(e){}
		}

	searchRes = null
	scrapePtrn = new RegExp(_g.path.pics.items.replace(/\\/g, '\\\\').replace(/\./g, '\\.'), 'gi')
		while( (searchRes = scrapePtrn.exec(output)) !== null ){
			try{
				output = output.replace( searchRes[0], '/!/pics/items/' )
			}catch(e){}
		}

	searchRes = null
	scrapePtrn = /\?infos=([a-z]+)\&amp;id=([^\&^"^']+)/gi
		while( (searchRes = scrapePtrn.exec(output)) !== null ){
			try{
				var t = ''
				switch( searchRes[1] ){
					case 'ship': 		t = 'ships'; 		break;
					case 'equipment': 	t = 'equipments'; 	break;
					case 'entity':	 	t = 'entities'; 	break;
					default:
						t = searchRes[1]
						break;
				}
				output = output.replace( searchRes[0], '/' + t + '/' + searchRes[2] + '/' )
			}catch(e){}
		}

	searchRes = null
	scrapePtrn = /^\s*[\r\n]/gm
		while( (searchRes = scrapePtrn.exec(output)) !== null ){
			try{
				output = output.replace( searchRes[0], '' )
			}catch(e){}
		}
	
	switch(pagetype){
		case 'page':
			output = '<div class="page-container"'
						+ (name
							? ' page="' +name+ '"'
							: ''
						)
					+ '>'
					+ output
					+ '</div>'
			break;
		case 'info':
		case 'infos':
			output = '<div class="page-container infos"'
						+ (name
							? ' data-infostype="' +name+ '"'
							: ''
						)
					+ '>'
					+ '<div class="wrapper">'
					+ output
					+ '</div>'
					+ '</div>'
			break;
	}

	return output
}

function dev_output_form(){
	let el = {}
		,processing = false

	el.container = $('<div/>').css({
			'position':	'relative',
			'width':	'100%',
			'height':	'100%',
			'display':	'flex',
			'flex-flow':'column nowrap'
		}).append(
			el.form = $('<form/>').css({
				'display':	'flex',
				'flex-flow':'row nowrap',
				'flex':		'0 0 40px',
				'height':	'40px',
				'line-height':'30px',
				'font-size':'16px',
				'padding':	'0 0 10px 0',
				'border-bottom':'1px solid rgba(255, 255, 255, .35)',
				'margin':	'0 0 10px 0'
			}).on('submit', function(e){
				e.preventDefault()
				if( !processing ){
					dev_output_el_log.empty()
					processing = true
					dev_output_log('start')
					
					// 处理模板
						dev_output_tmpl = node.fs.readFileSync('dev-output/templates/base.html', 'utf-8')
						let searchRes
							,scrapePtrn = /\{\{[ ]*navContent[ ]*\}\}/gi
							,elNav = $('<div/>')
							,navlinks = $('<div class="pages"/>').appendTo( elNav )
							,globaloptions = $('<section class="options"/>').appendTo( elNav )
							,btnDonates = $('<a class="donate" icon="heart4" href="/donate/"/>').appendTo( globaloptions )
						_frame.app_main.nav.forEach(function(o, i){
							(function(page){
										return $('<a class="button" href="/'+page+'/"/>')
									})(o.page).html(o.title).appendTo( navlinks )
							if( o.state )
								_frame.dom.navs[o.page].attr('mod-state', o.state)
						})
					
						while( (searchRes = scrapePtrn.exec(dev_output_tmpl)) !== null ){
							try{
								dev_output_tmpl = dev_output_tmpl.replace( searchRes[0], elNav.html() )
							}catch(e){}
						}
					
					console.log(dev_output_tmpl)

					//Q.all(dev_output_steps).done(function(values){
					//	console.log(values)
					//	dev_output_log('end')
					//})
					dev_output_steps.push(function(){
						dev_output_log('end')
						processing = false
						dev_output_only_assets = false
						return true
					})
					var result = Q(dev_output_tmpl);
					dev_output_steps.forEach(function (f) {
						result = result.then(f);
					});
					return result;
				}
				return
			}).append(
				el.selector = $('<input type="file" nwdirectory/>').css({
					'display':	'none'
				}).on('change', function(){
					let val = el.selector.val() || ''
					el.input.val( val )
					Lockr.set('debug_output_directory', val)
					dev_output_dir = val
					el.selector.val('')
				})
			).append(
				el.input = $('<input type="text"/>').css({
					'display':	'block',
					'flex':		'1 0 auto',
					'height':	'30px',
					'line-height':'inherit',
					'font-size':'inherit',
					'margin-right':'10px'
				}).val( Lockr.get('debug_output_directory') || '' )
			).append(
				$('<button/>',{
					'type':		'button',
					'html':		'Browse'
				}).css({
					'flex':		'0 0 auto',
					'margin-right':'10px'
				}).on('click', function(){
					el.selector.click()
				})
			).append(
				$('<input/>',{
					'type':		'submit',
					'html':		'Export'
				}).css({
					'flex':		'0 0 auto',
					'margin-right':'10px'
				})
			).append(
				$('<button/>',{
					'type':		'button',
					'html':		'Export (Only Assets)'
				}).css({
					'flex':		'0 0 auto',
					'margin-right':'10px'
				}).on('click', function(){
					dev_output_only_assets = true
					el.form.submit()
				})
			)
		).append(
			dev_output_el_log = $('<div/>').css({
				'flex':		'1 0 auto',
				'line-height':'1.5em',
				'font-size':'13px',
				'overflow-y':'auto'
			})
		)
	
	dev_output_dir = el.input.val()
	
	return el.container
}

/*

Template
dev_output_tmpl
	let searchRes
		,scrapePtrn = /\{\{[ ]*navContent[ ]*\}\}/gi
	while( (searchRes = scrapePtrn.exec(dev_output_tmpl)) !== null ){
		try{
			dev_output_tmpl = dev_output_tmpl.replace( searchRes[0], CONTENT )
		}catch(e){}
	}

Directory
dev_output_dir

Logging Function
dev_output_log(msg)

*/


dev_output_steps.push(function(){
	if( dev_output_only_assets )
		return
		
	let masterDeferred = Q.defer()

	// /ships/index.html
		,masterChain = Q.fcall(function(){
			dev_output_log('开始处理: SHIPS')

			let deferred = Q.defer()
				,searchRes
				,scrapePtrn = /\{\{[ ]*mainContent[ ]*\}\}/gi
				,output = dev_output_tmpl
				,outputPath = node.path.normalize( dev_output_dir + '/ships/index.html' )

			while( (searchRes = scrapePtrn.exec(output)) !== null ){
				try{
					output = output.replace( searchRes[0],
						dev_output_filter( node.fs.readFileSync(_g.path.page + 'ships.html', 'utf8'), 'page', 'ships' )
					)
				}catch(e){}
			}
			
			searchRes = null
			scrapePtrn = /\{\{[ ]*title[ ]*\}\}/gi
			while( (searchRes = scrapePtrn.exec(output)) !== null ){
				try{
					output = output.replace( searchRes[0], dev_output_gen_title('舰娘') )
				}catch(e){}
			}
			
			output = dev_output_filter(output)
		
			console.log( outputPath )
			
			node.fs.writeFile(
				outputPath,
				output,
				function(err){
					if( err ){
						deferred.reject(new Error(err))
					}else{
						dev_output_log('生成文件: ' + outputPath)
						deferred.resolve()
					}
				}
			)

			return deferred.promise
		})
	
	
	for(let i in _g.data.ships){
		masterChain = masterChain.then(function(){
			let deferred = Q.defer()
				,searchRes
				,scrapePtrn = /\{\{[ ]*mainContent[ ]*\}\}/gi
				,output = dev_output_tmpl
				,outputDir = node.path.normalize( dev_output_dir + '/ships/' +i )
				,outputPath = node.path.normalize( outputDir+ '/index.html' )
			
			if (!node.fs.existsSync(outputDir)){
				node.fs.mkdirSync(outputDir);
			}

			while( (searchRes = scrapePtrn.exec(output)) !== null ){
				try{
					output = output.replace( searchRes[0],
						dev_output_filter(
							_frame.infos.getContent('ship', i)[0].outerHTML,
							'infos',
							'ship'
						)
					)
				}catch(e){}
			}
			
			searchRes = null
			scrapePtrn = /\{\{[ ]*title[ ]*\}\}/gi
			while( (searchRes = scrapePtrn.exec(output)) !== null ){
				try{
					output = output.replace( searchRes[0], dev_output_gen_title(_g.data.ships[i].getName(true) + ' - 舰娘') )
				}catch(e){}
			}
			
			output = dev_output_filter(output)
		
			console.log( outputPath )
			
			node.fs.writeFile(
				outputPath,
				output,
				function(err){
					if( err ){
						deferred.reject(new Error(err))
					}else{
						dev_output_log('生成文件: ' + outputPath)
						deferred.resolve()
					}
				}
			)

			return deferred.promise
		})
	}
	
	
	masterChain = masterChain.catch(function(e){
			console.log(e)
			dev_output_log('发生错误')
		}).done(function(){
			masterDeferred.resolve()
		})

	return masterDeferred.promise
})

/*

Template
dev_output_tmpl
	let searchRes
		,scrapePtrn = /\{\{[ ]*navContent[ ]*\}\}/gi
	while( (searchRes = scrapePtrn.exec(dev_output_tmpl)) !== null ){
		try{
			dev_output_tmpl = dev_output_tmpl.replace( searchRes[0], CONTENT )
		}catch(e){}
	}

Directory
dev_output_dir

Logging Function
dev_output_log(msg)

*/

dev_output_steps.push(function(){
	if( dev_output_only_assets )
		return
		
	let masterDeferred = Q.defer()

	// /equipments/index.html
		,masterChain = Q.fcall(function(){
			dev_output_log('开始处理: EQUIPMENTS')

			let deferred = Q.defer()
				,searchRes
				,scrapePtrn = /\{\{[ ]*mainContent[ ]*\}\}/gi
				,output = dev_output_tmpl
				,outputPath = node.path.normalize( dev_output_dir + '/equipments/index.html' )

			while( (searchRes = scrapePtrn.exec(output)) !== null ){
				try{
					output = output.replace( searchRes[0],
						dev_output_filter( node.fs.readFileSync(_g.path.page + 'equipments.html', 'utf8'), 'page', 'equipments' )
					)
				}catch(e){}
			}
			
			searchRes = null
			scrapePtrn = /\{\{[ ]*title[ ]*\}\}/gi
			while( (searchRes = scrapePtrn.exec(output)) !== null ){
				try{
					output = output.replace( searchRes[0], dev_output_gen_title('装备') )
				}catch(e){}
			}
			
			output = dev_output_filter(output)
		
			console.log( outputPath )
			
			node.fs.writeFile(
				outputPath,
				output,
				function(err){
					if( err ){
						deferred.reject(new Error(err))
					}else{
						dev_output_log('生成文件: ' + outputPath)
						deferred.resolve()
					}
				}
			)

			return deferred.promise
		})
	
	
	for(let i in _g.data.items){
		masterChain = masterChain.then(function(){
			let deferred = Q.defer()
				,searchRes
				,scrapePtrn = /\{\{[ ]*mainContent[ ]*\}\}/gi
				,output = dev_output_tmpl
				,outputDir = node.path.normalize( dev_output_dir + '/equipments/' +i )
				,outputPath = node.path.normalize( outputDir+ '/index.html' )
			
			if (!node.fs.existsSync(outputDir)){
				node.fs.mkdirSync(outputDir);
			}

			while( (searchRes = scrapePtrn.exec(output)) !== null ){
				try{
					output = output.replace( searchRes[0],
						dev_output_filter(
							_frame.infos.getContent('equipment', i)[0].outerHTML,
							'infos',
							'equipment'
						)
					)
				}catch(e){}
			}
			
			searchRes = null
			scrapePtrn = /\{\{[ ]*title[ ]*\}\}/gi
			while( (searchRes = scrapePtrn.exec(output)) !== null ){
				try{
					output = output.replace( searchRes[0], dev_output_gen_title(_g.data.items[i]._name + ' - 装备') )
				}catch(e){}
			}
			
			output = dev_output_filter(output)
		
			console.log( outputPath )
			
			node.fs.writeFile(
				outputPath,
				output,
				function(err){
					if( err ){
						deferred.reject(new Error(err))
					}else{
						dev_output_log('生成文件: ' + outputPath)
						deferred.resolve()
					}
				}
			)

			return deferred.promise
		})
	}
	
	
	masterChain = masterChain.catch(function(e){
			console.log(e)
			dev_output_log('发生错误')
		}).done(function(){
			masterDeferred.resolve()
		})

	return masterDeferred.promise
})

/*

Template
dev_output_tmpl
	let searchRes
		,scrapePtrn = /\{\{[ ]*navContent[ ]*\}\}/gi
	while( (searchRes = scrapePtrn.exec(dev_output_tmpl)) !== null ){
		try{
			dev_output_tmpl = dev_output_tmpl.replace( searchRes[0], CONTENT )
		}catch(e){}
	}

Directory
dev_output_dir

Logging Function
dev_output_log(msg)

*/


dev_output_steps.push(function(){
	if( dev_output_only_assets )
		return
		
	let masterDeferred = Q.defer()

	// /entities/index.html
		,masterChain = Q.fcall(function(){
			dev_output_log('开始处理: ENTITIES')

			let deferred = Q.defer()
				,maincontainer = $('<div/>')
				,container = $( node.fs.readFileSync(_g.path.page + 'entities.html', 'utf8') ).appendTo(maincontainer)
				,data = new TablelistEntities( container )

			let interval = setInterval(function(){
				if( data.generated ){
					clearInterval(interval)
					interval = null
					deferred.resolve( maincontainer.html() )
				}
			},10)

			return deferred.promise
		})
		.then(function( mainhtml ){

			let deferred = Q.defer()
				,searchRes
				,scrapePtrn = /\{\{[ ]*mainContent[ ]*\}\}/gi
				,output = dev_output_tmpl
				,outputPath = node.path.normalize( dev_output_dir + '/entities/index.html' )

			while( (searchRes = scrapePtrn.exec(output)) !== null ){
				try{
					output = output.replace( searchRes[0], dev_output_filter( mainhtml, 'page', 'entities' ))
				}catch(e){}
			}
			
			searchRes = null
			scrapePtrn = /\{\{[ ]*title[ ]*\}\}/gi
			while( (searchRes = scrapePtrn.exec(output)) !== null ){
				try{
					output = output.replace( searchRes[0], dev_output_gen_title('声优&画师') )
				}catch(e){}
			}
			
			output = dev_output_filter(output)
		
			console.log( outputPath )
			
			node.fs.writeFile(
				outputPath,
				output,
				function(err){
					if( err ){
						deferred.reject(new Error(err))
					}else{
						dev_output_log('生成文件: ' + outputPath)
						deferred.resolve()
					}
				}
			)

			return deferred.promise
		})
	
	
	for(let i in _g.data.entities){
		masterChain = masterChain.then(function(){
			let deferred = Q.defer()
				,searchRes
				,scrapePtrn = /\{\{[ ]*mainContent[ ]*\}\}/gi
				,output = dev_output_tmpl
				,outputDir = node.path.normalize( dev_output_dir + '/entities/' +i )
				,outputPath = node.path.normalize( outputDir+ '/index.html' )
			
			if (!node.fs.existsSync(outputDir)){
				node.fs.mkdirSync(outputDir);
			}

			while( (searchRes = scrapePtrn.exec(output)) !== null ){
				try{
					output = output.replace( searchRes[0],
						dev_output_filter(
							_frame.infos.getContent('entity', i)[0].outerHTML,
							'infos',
							'entity'
						)
					)
				}catch(e){}
			}
			
			searchRes = null
			scrapePtrn = /\{\{[ ]*title[ ]*\}\}/gi
			while( (searchRes = scrapePtrn.exec(output)) !== null ){
				try{
					output = output.replace( searchRes[0], dev_output_gen_title(_g.data.entities[i]._name + ' - 声优&画师') )
				}catch(e){}
			}
			
			output = dev_output_filter(output)
		
			console.log( outputPath )
			
			node.fs.writeFile(
				outputPath,
				output,
				function(err){
					if( err ){
						deferred.reject(new Error(err))
					}else{
						dev_output_log('生成文件: ' + outputPath)
						deferred.resolve()
					}
				}
			)

			return deferred.promise
		})
	}
	
	
	masterChain = masterChain.catch(function(e){
			console.log(e)
			dev_output_log('发生错误')
		}).done(function(){
			masterDeferred.resolve()
		})

	return masterDeferred.promise
})

/*

Template
dev_output_tmpl
	let searchRes
		,scrapePtrn = /\{\{[ ]*navContent[ ]*\}\}/gi
	while( (searchRes = scrapePtrn.exec(dev_output_tmpl)) !== null ){
		try{
			dev_output_tmpl = dev_output_tmpl.replace( searchRes[0], CONTENT )
		}catch(e){}
	}

Directory
dev_output_dir

Logging Function
dev_output_log(msg)

*/


dev_output_steps.push(function(){
	if( dev_output_only_assets )
		return
	
	let masterDeferred = Q.defer()

	// /entities/index.html
		Q.fcall(function(){
			dev_output_log('开始处理: ARSENAL')

			let maincontainer = $('<div/>')
				,container = $( node.fs.readFileSync(_g.path.page + 'arsenal.html', 'utf8') ).appendTo(maincontainer)
			
			_frame.app_main.page['arsenal'].init( maincontainer )
			
			return maincontainer.html()
		})
		.then(function( mainhtml ){

			let deferred = Q.defer()
				,searchRes
				,scrapePtrn = /\{\{[ ]*mainContent[ ]*\}\}/gi
				,output = dev_output_tmpl
				,outputPath = node.path.normalize( dev_output_dir + '/arsenal/index.html' )

			while( (searchRes = scrapePtrn.exec(output)) !== null ){
				try{
					output = output.replace( searchRes[0],
						dev_output_filter( mainhtml, 'page', 'arsenal' )
					)
				}catch(e){}
			}
			
			searchRes = null
			scrapePtrn = /\{\{[ ]*title[ ]*\}\}/gi
			while( (searchRes = scrapePtrn.exec(output)) !== null ){
				try{
					output = output.replace( searchRes[0], dev_output_gen_title('改修工厂') )
				}catch(e){}
			}
		
			console.log( outputPath )
			
			node.fs.writeFile(
				outputPath,
				output,
				function(err){
					if( err ){
						deferred.reject(new Error(err))
					}else{
						dev_output_log('生成文件: ' + outputPath)
						deferred.resolve()
					}
				}
			)

			return deferred.promise
		}).catch(function(e){
			console.log(e)
			dev_output_log('发生错误')
		}).done(function(){
			masterDeferred.resolve()
		})

	return masterDeferred.promise
})

/*

Template
dev_output_tmpl
	let searchRes
		,scrapePtrn = /\{\{[ ]*navContent[ ]*\}\}/gi
	while( (searchRes = scrapePtrn.exec(dev_output_tmpl)) !== null ){
		try{
			dev_output_tmpl = dev_output_tmpl.replace( searchRes[0], CONTENT )
		}catch(e){}
	}

Directory
dev_output_dir

Logging Function
dev_output_log(msg)

*/


dev_output_steps.push(function(){
	if( dev_output_only_assets )
		return
		
	let masterDeferred = Q.defer()

	// /entities/index.html
		Q.fcall(function(){
			dev_output_log('开始处理: DONATE')

			let deferred = Q.defer()
				,searchRes
				,scrapePtrn = /\{\{[ ]*mainContent[ ]*\}\}/gi
				,output = dev_output_tmpl
				,outputPath = node.path.normalize( dev_output_dir + '/donate/index.html' )

			while( (searchRes = scrapePtrn.exec(output)) !== null ){
				try{
					output = output.replace( searchRes[0],
						dev_output_filter( node.fs.readFileSync(_g.path.page + 'donate.html', 'utf8'), 'page', 'donate' )
					)
				}catch(e){}
			}
			
			searchRes = null
			scrapePtrn = /\{\{[ ]*title[ ]*\}\}/gi
			while( (searchRes = scrapePtrn.exec(output)) !== null ){
				try{
					output = output.replace( searchRes[0], dev_output_gen_title('捐助') )
				}catch(e){}
			}
		
			console.log( outputPath )
			
			node.fs.writeFile(
				outputPath,
				output,
				function(err){
					if( err ){
						deferred.reject(new Error(err))
					}else{
						dev_output_log('生成文件: ' + outputPath)
						deferred.resolve()
					}
				}
			)

			return deferred.promise
		}).catch(function(e){
			console.log(e)
			dev_output_log('发生错误')
		}).done(function(){
			masterDeferred.resolve()
		})

	return masterDeferred.promise
})

/*

Template
dev_output_tmpl
	let searchRes
		,scrapePtrn = /\{\{[ ]*navContent[ ]*\}\}/gi
	while( (searchRes = scrapePtrn.exec(dev_output_tmpl)) !== null ){
		try{
			dev_output_tmpl = dev_output_tmpl.replace( searchRes[0], CONTENT )
		}catch(e){}
	}

Directory
dev_output_dir

Logging Function
dev_output_log(msg)

*/


dev_output_steps.push(function(){
	function copyFile(source, target, cb) {
		Q.fcall(function(){
			let deferred = Q.defer()
			node.fs.readFile(source, 'utf8', function(err, data){
				if( err ){
					deferred.reject(new Error(err))
				}else{
					deferred.resolve(data)
				}
			})
			return deferred.promise
		})
		.then(function(data){
			let deferred = Q.defer()
			//data = dev_output_filter(data)
			data = dev_output_filter(data)
			data = data.replace(/_g\.bgimg_count[\t]*=[\t]*0\;/g, '_g.bgimg_count='+ bgimg_count +';')
			node.fs.writeFile(
				target,
				data,
				function(err){
					if( err ){
						deferred.reject(new Error(err))
					}else{
						deferred.resolve()
					}
				}
			)
			return deferred.promise
		})
		.done(cb)
	}
	function copyFile2(source, target, cb) {
		var cbCalled = false;
		
		var rd = node.fs.createReadStream(source);
		rd.on("error", done);
		
		var wr = node.fs.createWriteStream(target);
		wr.on("error", done);
		wr.on("close", function(ex) {
			done();
		});
		rd.pipe(wr);
		
		function done(err) {
			if (!cbCalled) {
			cb(err);
			cbCalled = true;
			}
		}
	}

	let masterDeferred = Q.defer()
		,bgimg_count = 0

		Q.fcall(function(){
			dev_output_log('开始处理: BG IMAGES')
			
			let deferred = Q.defer()

			node.fs.readdir(node.path.join( _g.path.bgimg_dir, 'blured'), function(err, files){
				if( err ){
					deferred.reject(new Error(err))
				}else{
					bgimg_count = files.length
					deferred.resolve(files)
				}
			})
			
			return deferred.promise
		})
		.then(function(files){
			let deferred = Q.defer()
				,result = Q(files)

			files.forEach(function (file, index) {
				console.log(file)
				result = result.then(function(){
					let _deferred = Q.defer()
						,filePath1 = node.path.join( _g.path.bgimg_dir, file )
						,filePath2 = node.path.join( _g.path.bgimg_dir, 'blured', file )
						,outputPath1 = node.path.join( dev_output_dir, '!', 'assets', 'images', 'homebg', index + '.jpg' )
						,outputPath2 = node.path.join( dev_output_dir, '!', 'assets', 'images', 'homebg', 'blured', index + '.jpg' )

					copyFile2(
						filePath1,
						outputPath1,
						function(err){
							if( err ){
								_deferred.reject(new Error(err))
							}else{
								dev_output_log('生成文件: ' + outputPath1)
								copyFile2(
									filePath2,
									outputPath2,
									function(err){
										if( err ){
											_deferred.reject(new Error(err))
										}else{
											dev_output_log('生成文件: ' + outputPath2)
											_deferred.resolve()
										}
									}
								)
							}
						}
					)

					return _deferred.promise
				});
			});
			
			result = result.done(function(){
				deferred.resolve()
			})
			
			return deferred.promise
		})
		.then(function(){
			dev_output_log('开始处理: CSS & JS')
			
			let deferred = Q.defer()

			node.fs.readdir(node.path.join( _g.root, 'dev-output', 'assets-output'), function(err, files){
				if( err ){
					deferred.reject(new Error(err))
				}else{
					deferred.resolve(files)
				}
			})
			
			return deferred.promise
		})
		.then(function(files){
			let deferred = Q.defer()
				,result = Q(files)

			files.forEach(function (file) {
				result = result.then(function(){
					let _deferred = Q.defer()
						,outputPath = node.path.join( dev_output_dir, '!', 'assets', file )
					copyFile(
						node.path.join( _g.root, 'dev-output', 'assets-output', file ),
						outputPath,
						function(err){
							if( err ){
								_deferred.reject(new Error(err))
							}else{
								dev_output_log('生成文件: ' + outputPath)
								_deferred.resolve()
							}
						}
					)
					return _deferred.promise
				});
			});
			
			result = result.done(function(){
				deferred.resolve()
			})
			
			return deferred.promise
		})
		.then(function(){
			let deferred = Q.defer()
				,outputPath = node.path.join( dev_output_dir, '!', 'assets', 'fonts', 'icons.ttf' )
			copyFile2(
				node.path.join( _g.root, 'app', 'assets', 'fonts', 'icons.ttf' ),
				outputPath,
				function(err){
					if( err ){
						deferred.reject(new Error(err))
					}else{
						dev_output_log('生成文件: ' + outputPath)
						deferred.resolve()
					}
				}
			)
			return deferred.promise
		})
		.catch(function(e){
			console.log(e)
			dev_output_log('发生错误')
		}).done(function(){
			masterDeferred.resolve()
		})

	return masterDeferred.promise
})

/*

URI pattern
	/					/index.html
	/ships				/ships/index.html
	/ships/1			/ships/1/index.html
	/equipments			/equipments/index.html
	/equipments/1		/equipments/1/index.html

Ajax request uri
	/					/_/index.html
	/ships				/_/ships/index.html
	/ships/1			/_/ships/1/index.html
	/equipments			/_/equipments/index.html
	/equipments/1		/_/equipments/1/index.html

 */


// @koala-prepend "steps/!.js"

// @koala-prepend "steps/ships.js"
// @koala-prepend "steps/equipments.js"
// @koala-prepend "steps/entities.js"
// @koala-prepend "steps/arsenal.js"
// @koala-prepend "steps/donate.js"

// @koala-prepend "steps/assets.js"