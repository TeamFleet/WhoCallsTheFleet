
dev_output_steps.push(function(){
	if( dev_output_only_assets )
		return
		
	let masterDeferred = Q.defer()
		,dir_templates = node.path.join( _g.root, 'dev-output', 'templates' )
		,pages = [
			{
				page:	'home',
				title:	null,
				source:	node.path.join( dir_templates, 'page', 'index.html' ),
				target:	node.path.join( dev_output_dir, 'index.html' ),
				filter:	dev_output_filters.page_home
			}
		]
		,updates = []

	// 获取更新日志
		,masterChain = Q.fcall(function(){
			dev_output_log('开始处理: 其他页面')
			var deferred = Q.defer()
			_db.updates.find({$not:{'date':""}}).sort({'date': -1, 'version': -1}).exec(function(err, docs){
				docs.forEach(function(doc){
					updates.push(doc)
				})
				deferred.resolve(err)
			})
			return deferred.promise
		})
	
	
	pages.forEach(function(o){
		masterChain = masterChain.then(function(){
			let deferred = Q.defer()
				,searchRes
				,scrapePtrn = /\{\{[ ]*mainContent[ ]*\}\}/gi
				,output = dev_output_tmpl
				,outputDir = node.path.dirname(o.target)
				,mainhtml = node.fs.readFileSync(o.source, 'utf-8')
			
			if( o.filter )
				mainhtml = o.filter(mainhtml, updates)
			
			if (!node.fs.existsSync(outputDir))
				node.fs.mkdirSync(outputDir);

			while( (searchRes = scrapePtrn.exec(output)) !== null ){
				try{
					output = output.replace( searchRes[0],
						dev_output_filter(
							mainhtml,
							'page',
							o.page
						)
					)
				}catch(e){}
			}
			
			searchRes = null
			scrapePtrn = /\{\{[ ]*title[ ]*\}\}/gi
			while( (searchRes = scrapePtrn.exec(output)) !== null ){
				try{
					output = output.replace( searchRes[0], dev_output_gen_title(o.title) )
				}catch(e){}
			}
			
			node.fs.writeFile(
				o.target,
				output,
				function(err){
					if( err ){
						deferred.reject(new Error(err))
					}else{
						dev_output_log('生成文件: ' + o.target)
						deferred.resolve()
					}
				}
			)

			return deferred.promise
		})
	})
		
	masterChain = masterChain.catch(function(e){
		console.log(e)
		dev_output_log('发生错误')
	}).done(function(){
		masterDeferred.resolve()
	})

	return masterDeferred.promise
});



dev_output_filters.page_home = function(html, updates){
	let searchRes
		,scrapePtrn = /\{\{[ ]*content::WhatsNew[ ]*\}\}/gi
		
		,section = $('<section class="update_journal" data-version-'+updates[0]['type']+'="'+updates[0]['version']+'"/>')
						.html('<h3>'
								+ '新内容'
								+ '<small>'+(updates[0]['date'] ? updates[0]['date'] : 'WIP')+'</small>'
								+ '</h3>'
							)
		try{
			$(_frame.app_main.page['about'].journal_parse(updates[0]['journal'])).appendTo( section )
		}catch(e){}

	while( (searchRes = scrapePtrn.exec(html)) !== null ){
		try{
			html = html.replace( searchRes[0], section[0].outerHTML )
		}catch(e){}
	}

	return html
};
