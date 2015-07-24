var _ga = {
	/*
	defaults: {
		'v': 		1,					// Version
		'tid': 		'UA-63582858-1',	// Tracking ID / Property ID
		'cid': 		555, 				// Anonymous Client ID

			'an': 	'WhoCallsTheFleet_Desktop_nw.js',
			'av': 	node.gui.App.manifest.version
	},

	counter: function(path, title, screenName){
		var data = {
			// Hit type
			't': 	'pageview'
		}

		screenName = screenName || title

		// Session Control
			if( !ga.is_init )
				data['sc'] = 'start'

		// Document Path
			if( path )
				data['dp'] = path

		// Document Title
			if( title )
				data['dt'] = title

		// Screen Name
			data['cd'] = screenName || 'Default'

		node.request({
			'uri': 		'http://www.google-analytics.com',
			'method': 	'POST',
			'formData': $.extend(true, {}, ga.defaults, data)
		}, function(err, response, body){
			_g.log(err)
			_g.log(response)
			_g.log(body)
		})

		if( !ga.is_init ){
			node.win.on('close', function(){
				node.win.hide()
				node.request({
					'uri': 		'http://www.google-analytics.com',
					'method': 	'POST',
					'formData': $.extend(true, {}, ga.defaults, {
						'sc': 	'end'
					})
				}, function(err, response, body){
					_g.log(err)
					_g.log(response)
					_g.log(body)
					node.win.close(true)
				})
			})
			ga.is_init = true
		}
	}*/
	
	//hiddenIframe: false,
	
	counter: function(path, title, screenName){
		if( debugmode )
			return true
		/*
		ga('send', 'pageview', {
				'location':	'http://fleet.diablohu.com/ga.html',
				'page': 	'/' + path,
				'title': 	title || _frame.app_main.title
			});
		*/

		title = _frame.app_main.title

		_frame.dom.hiddenIframe[0].contentWindow.location.replace(node.url.format(
						'http://fleet.diablohu.com/ga.html' + path
						+ ( title
							? ('&title=' + encodeURIComponent(title))
							: ''
						)
					))
	}
}