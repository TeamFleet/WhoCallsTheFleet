var _ga = {
	//init_count:	false,
	counter: function(path, title, screenName){
		//_g.log('ga')
		
		if( debugmode )
			return true
		
		if( !this.init_count ){
			this.init_count = true
			return
		}

		if( typeof ga != 'undefined' )
			ga('send', 'pageview', {
					'location':	location.href,
					'page': 	location.pathname
				});
	}
}
