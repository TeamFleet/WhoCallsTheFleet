_frame.app_main.page['about'] = {}
_frame.app_main.page['about'].init = function( page ){
	/*
	var latestVersionSection = $('[data-version-app]:first-of-type')
		,latestVersion = latestVersionSection.attr('data-version-app').split('.')
		,latestVersionSub = latestVersion[0] + '.' + latestVersion[1]
	*/
	//$('[data-version-app^="'+latestVersionSub+'"]')

	function addUpdateJournal( updateData ){
		var section = $('<section data-version-'+updateData['type']+'="'+updateData['version']+'"/>')
						.html(
							'<h3>'+updateData['version']
							+ '<small>'+(updateData['date'] ? updateData['date'] : 'WIP')+'</small>'
							+ '</h3>'
						)
						.appendTo(page)
			,searchRes
			,scrapePtrn = /\[\[([^\:]+)\:\:([0-9]+)\]\]/gi
			,resultHTML = markdown.toHTML( updateData['journal'] )

		while( (searchRes = scrapePtrn.exec(updateData['journal'])) !== null ){
			try{
				resultHTML = resultHTML.replace( searchRes[0], _tmpl['link_'+searchRes[1].toLowerCase()](searchRes[2], null, true) )
			}catch(e){}
		}

		try{
			$(resultHTML).appendTo( section )
		}catch(e){}
	}

	var promise_chain 	= Q.fcall(function(){})

	// 开始异步函数链
		promise_chain

	// 获取全部开发中的更新日志
		.then(function(){
			return _db.updates.find({'date': ""}).sort({'date': -1}).exec(function(err, docs){
				for( var i in docs ){
					addUpdateJournal(docs[i])
				}
			})
		})

	// 获取全部已更新的更新日志
		.then(function(){
			return _db.updates.find({$not:{'date':""}}).sort({'date': -1}).exec(function(err, docs){
				for( var i in docs ){
					addUpdateJournal(docs[i])
				}
			})
		})

}