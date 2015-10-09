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
							.replace('<input id="arsenal_headtab-1" type="radio" name="arsenal_headtab">',
								'<input id="arsenal_headtab-1" type="radio" name="arsenal_headtab" checked />'
							)
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