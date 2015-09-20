var _config = {
	getFullKeyname: function( key ){
		return 'config_' + key
	},

	get: function( key ){
		if( !localStorage )
			return false

		var value = localStorage[ _config.getFullKeyname(key) ]

		if( value === 'true' )
			return true

		if( value === 'undefined' ){
			delete localStorage[ _config.getFullKeyname(key) ]
			return null
		}

		return value
	},

	set: function( key, value ){
		if( !localStorage )
			return false

		if( value === null && localStorage[ _config.getFullKeyname(key) ] ){
			delete localStorage[ _config.getFullKeyname(key) ]
		}else{
			localStorage[ _config.getFullKeyname(key) ] = value
		}
	}
}




_frame.app_config = {
	//is_init: false,

	init: function(){
		if( _frame.app_config.is_init )
			return true

		_frame.app_config.is_init = true
	}
}