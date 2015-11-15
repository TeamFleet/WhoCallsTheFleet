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
					
					// 将base64编码的图片地址转为URL
						container.find('a[data-entityid]').each(function(i, el){
							el = $(el)
							let id = el.attr('data-entityid')
							if( id )
								el.find('i')
									.removeAttr('style')
									.attr('search-entitymaskpic-id', id)
									.addClass('nomask')
						})
					
					deferred.resolve( maincontainer.html() )
				}
			},10)

			return deferred.promise
		})
		.then(function( mainhtml ){
			let searchRes
				,scrapePtrn = /search-entitymaskpic-id\=\"([^\"]+)\"/gi

			while( (searchRes = scrapePtrn.exec(mainhtml)) !== null ){
				try{
					mainhtml = mainhtml.replace( searchRes[0], 'style="background-image:url(/!/pics/entities/'+searchRes[1]+'/0-mask-1.png)"')
				}catch(e){}
			}
			
			return mainhtml
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
			
			searchRes = null
			scrapePtrn = /src="data\:image[^\"]+"/gi
			while( (searchRes = scrapePtrn.exec(output)) !== null ){
				try{
					output = output.replace( searchRes[0], 'src="/!/pics/entities/'+i+'/2.jpg"' )
				}catch(e){}
			}
			
			output = dev_output_filter(output)
		
			//console.log( outputPath )
			
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