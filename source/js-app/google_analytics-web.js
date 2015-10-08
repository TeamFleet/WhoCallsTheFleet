var _ga = {	
	counter: function(path, title, screenName){
		//_g.log('ga')
		
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

		_frame.dom.hiddenIframe[0].contentWindow.location.replace(
						'/ga.html' + path
						+ ( title
							? ('&title=' + encodeURIComponent(title))
							: ''
						)
					)
	}
}
