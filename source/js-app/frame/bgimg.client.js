BgImg.getDefaultImgs = function( deferred ){
	node.fs.readdirSync( _g.path.bgimg_dir )
		.filter(function(file){
			return !node.fs.lstatSync( node.path.join( _g.path.bgimg_dir , file) ).isDirectory()
		})
		.map(function(v) { 
			return {
				name: v,
				time: node.fs.statSync( node.path.join( _g.path.bgimg_dir , v) ).mtime.getTime()
			}; 
		})
		.sort(function(a, b) { return b.time - a.time; })
		.map(function(v) { return v.name; })
		.forEach(function(name){
			BgImg.list.push( new BgImg({
				'name': 	name,
				'isDefault':true
			}) )
			//_frame.app_main.bgimgs.push( name )
		})

	deferred.resolve()
	return BgImg.list
	
	/*
	node.fs.readdir(_g.path.bgimg_dir, function(err, files){
		if( err ){
			deferred.reject(new Error(err))
		}else{
			var bgimgs_last = _config.get('bgimgs')
				,bgimgs_new = []
			bgimgs_last = bgimgs_last ? bgimgs_last.split(',') : []
			files.forEach(function(file){
				var lstat = node.fs.lstatSync( node.path.join( _g.path.bgimg_dir , '/' + file) )
				if( !lstat.isDirectory() ){
					_frame.app_main.bgimgs.push( file )

					// 存在bgimgs_last：直接比对
					// 不存在bgimgs_last：比对每个文件，找出最新者
					if( bgimgs_last.length ){
						if( $.inArray( file, bgimgs_last ) < 0 )
							bgimgs_new.push( file )
					}else{
						var ctime = parseInt(lstat.ctime.valueOf())
						if( bgimgs_new.length ){
							if( ctime > bgimgs_new[1] )
								bgimgs_new = [ file, ctime ]
						}else{
							bgimgs_new = [ file, ctime ]
						}
					}
				}
			})
			if( !bgimgs_last.length )
				bgimgs_new.pop()
			_config.set(
				'bgimgs',
				_frame.app_main.bgimgs
			)
			_frame.app_main.change_bgimg( bgimgs_new );
			_frame.app_main.loaded('bgimgs')
			//if( !_g.uriHash('page') )
			//	_frame.app_main.load_page( _frame.app_main.nav[0].page )
			//setTimeout(function(){
			//	_frame.dom.layout.addClass('ready')
			//}, 1000)
			_g.log('背景图: DONE')
			deferred.resolve()
		}
	})
	*/
};

BgImg.getPath = function(o, t){
	o = BgImg.getObj(o)
	
	if( t )
		return 'file://' + encodeURI( node.path.join( _g.path.bgimg_dir , t, o.name ).replace(/\\/g, '/') )

	return 'file://' + encodeURI( node.path.join( _g.path.bgimg_dir , o.name ).replace(/\\/g, '/') )
};

BgImg.save = function(o){
	o = BgImg.getObj(o)
	_g.save( node.path.join( _g.path.bgimg_dir , o.name ), o.name )
};