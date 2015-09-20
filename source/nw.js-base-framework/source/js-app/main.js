// node.js modules
node.require('fs')

_frame.app_main = {
	// is_init: false
	init: function(){
		if( _frame.app_main.is_init )
			return true

		var imagelist 	= $('#imagelist')
			,directory 	= './resources/images'

		// get all files in target directory
			node.fs.readdir(directory, function(err, files){
				for( var i in files ){
					$('<img/>',{
						'src': 	'.' + directory + '/' + files[i]
					}).on('click', function(){
						node.openWin( 'picviewer.html?pic='+ $(this).attr('src'), {
								"frame": 		false,
								"transparent":	true
							})
					}).appendTo( imagelist )
				}
			})

		_frame.app_main.is_init = true
	}
}