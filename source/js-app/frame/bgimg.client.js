BgImg.getDefaultImgs = function( deferred ){
	
	function _list(p){
		return node.fs.readdirSync( p )
			.filter(function(file){
				return !node.fs.lstatSync( node.path.join( p , file) ).isDirectory()
			})
			.map(function(v) { 
				return {
					name: v,
					time: node.fs.statSync( node.path.join( p , v) ).mtime.getTime()
				}; 
			})
			.sort(function(a, b) { return b.time - a.time; })
			.map(function(v) { return v.name; })
	}
	
	_list( _g.path.bgimg_dir )
		.forEach(function(name){
			BgImg.list.push( new BgImg({
				'name': 	name,
				'isDefault':true
			}) )
		})
	
	_list( _g.path.bgimg_custom_dir )
		.forEach(function(name){
			BgImg.list.push( new BgImg({
				'name': 	name
			}) )
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
	
	let folder = o.isDefault ? _g.path.bgimg_dir : _g.path.bgimg_custom_dir
	
	if( t )
		return 'file://' + encodeURI( node.path.join( folder , t, o.name ).replace(/\\/g, '/') )

	return 'file://' + encodeURI( node.path.join( folder , o.name ).replace(/\\/g, '/') )
};

BgImg.save = function(o){
	o = BgImg.getObj(o)
	_g.save( node.path.join( o.isDefault ? _g.path.bgimg_dir : _g.path.bgimg_custom_dir , o.name ), o.name )
};

BgImg.readFile = function( e ){
	// make sure custom bgimg folder exists
		node.mkdirp.sync( node.path.normalize(_g.path.bgimg_custom_dir) )
		node.mkdirp.sync( node.path.join(_g.path.bgimg_custom_dir, 'blured') )
		node.mkdirp.sync( node.path.join(_g.path.bgimg_custom_dir, 'thumbnail') )

	let deferred = Q.defer()
		,path = BgImg.fileSelector.val()
		,pathParse = node.path.parse( path )
		,streamRead = node.fs.createReadStream( path )
		,streamWrite = node.fs.createWriteStream( node.path.join(_g.path.bgimg_custom_dir, pathParse.base) )

	streamRead.on('error', function(err){
		deferred.reject('文件载入失败', new Error(err))
	});

	streamRead.on('close', function(err){
		let o = new BgImg({
			'name':	pathParse.base
		})
		deferred.resolve(o)
	});
	streamRead.pipe(streamWrite)

	return deferred.promise
};

BgImg.set = function(o, t, canvas){
	o = BgImg.getObj(o)
	let base64 = canvas.toDataURL("image/jpeg", 0.4)
		,deferred = Q.defer()
	
	function decodeBase64Image(dataString) {
		var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
		response = {};

		if (matches.length !== 3) {
			return new Error('Invalid input string');
		}

		response.type = matches[1];
		response.data = new Buffer(matches[2], 'base64');

		return response;
	}
	
	let imageBuffer = decodeBase64Image(base64)
		,folder = o.isDefault ? _g.path.bgimg_dir : _g.path.bgimg_custom_dir

	node.fs.writeFile(
		node.path.join( folder , t, o.name ),
		imageBuffer.data,
		function(err) {
			canvas.remove()
			deferred.resolve()
		}
	);

	return deferred.promise
};