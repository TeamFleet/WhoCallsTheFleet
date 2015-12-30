BgImg.getDefaultImgs = function( deferred ){
	for( let i=_g.bgimg_count-1; i>=0; i-- ){
		BgImg.list.push( new BgImg({
			'name': 	i + '.jpg',
			'isDefault':true
		}) )
		//_frame.app_main.bgimgs.push( i + '.jpg' )
	}

	deferred.resolve()
	return BgImg.list
};

BgImg.getPath = function(o, t){
	o = BgImg.getObj(o)

	return _g.path.bgimg_dir
			+ ( t ? t + '/' : '' )
			+ o.name
};

BgImg.save = function(o){
	o = BgImg.getObj(o)
	_g.save( o.path, 'fleet.diablohu.com - ' + o.name )
};