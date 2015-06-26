_frame.app_main.page['about'] = {}

_frame.app_main.page['about'].journal_parse = function( raw ){
	var searchRes
		,scrapePtrn = /\[\[([^\:]+)\:([0-9]+)\]\]/gi
		,resultHTML = markdown.toHTML( raw )

	while( (searchRes = scrapePtrn.exec(raw)) !== null ){
		try{
			resultHTML = resultHTML.replace( searchRes[0], _tmpl['link_'+searchRes[1].toLowerCase()](searchRes[2], null, true) )
		}catch(e){}
	}

	searchRes = null
	scrapePtrn = /\[\[([^\:]+)\:([0-9]+)\:TEXT\]\]/gi
	while( (searchRes = scrapePtrn.exec(raw)) !== null ){
		try{
			resultHTML = resultHTML.replace( searchRes[0], _tmpl['textlink_'+searchRes[1].toLowerCase()](searchRes[2], null, true) )
		}catch(e){}
	}

	return resultHTML
}

_frame.app_main.page['about'].journaltitle = function( d, tagName ){
	d = d || {}
	tagName = tagName || 'h3'

	return 	'<h3>'
			+ (d['hotfix']
				? 'HOTFIX - '
				: '')
			+ (d['type'] == 'app'
				? ''
				: (d['type'] == 'app-db' ? 'DB' : d['type']).toUpperCase() + ' / ')
			+ d['version']
			+ '<small>'+(d['date'] ? d['date'] : 'WIP')+'</small>'
			+ '</h3>'
}

_frame.app_main.page['about'].init = function( page ){
	/*
	var latestVersionSection = $('[data-version-app]:first-of-type')
		,latestVersion = latestVersionSection.attr('data-version-app').split('.')
		,latestVersionSub = latestVersion[0] + '.' + latestVersion[1]
	*/
	//$('[data-version-app^="'+latestVersionSub+'"]')

	function addUpdateJournal( updateData ){
		var section = $('<section class="update_journal" data-version-'+updateData['type']+'="'+updateData['version']+'"/>')
						.html(_frame.app_main.page['about'].journaltitle(updateData))
						.appendTo(page)
		try{
			$(_frame.app_main.page['about'].journal_parse(updateData['journal'])).appendTo( section )
		}catch(e){
			_g.error(e)
			section.remove()
		}
	}

	var promise_chain 	= Q.fcall(function(){})

	// 开始异步函数链
		promise_chain

	// 获取全部开发中的更新日志
		.then(function(){
			var deferred = Q.defer()
			_db.updates.find({'date': ""}).sort({'date': -1}).exec(function(err, docs){
				for( var i in docs ){
					addUpdateJournal(docs[i])
				}
				deferred.resolve(err)
			})
			return deferred.promise
		})

	// 获取全部已更新的更新日志
		.then(function(){
			var deferred = Q.defer()
			_db.updates.find({$not:{'date':""}}).sort({'date': -1}).exec(function(err, docs){
				for( var i in docs ){
					addUpdateJournal(docs[i])
				}
				deferred.resolve(err)
			})
			return deferred.promise
		})

}