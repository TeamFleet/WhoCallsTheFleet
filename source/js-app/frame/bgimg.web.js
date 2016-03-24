BgImg.quota = 10 * 1024 * 1024 // 10MB
BgImg.quotaUsed = 0

BgImg.getDefaultImgs = function(){
	let deferred = Q.defer()
	for( let i=_g.bgimg_count-1; i>=0; i-- ){
		BgImg.list.push( new BgImg({
			'name': 	'*' + i + '.jpg',
			'isDefault':true
		}) )
		//_frame.app_main.bgimgs.push( i + '.jpg' )
	}
	
	BgImg.dataCustom = {}
	localforage.getItem(
		'bgcustomlist',
		function(err, value){
			BgImg.dataCustom = value || {}
			for(let i in BgImg.dataCustom){
				let o = BgImg.dataCustom[i]
				o.name = i
				BgImg.list.push( new BgImg(o) )
				BgImg.countCustom++
				BgImg.quotaUsed+= o.size
			}
			BgImg.updateQuotaUsed()
			deferred.resolve(BgImg.list)
		}
	);

	return deferred.promise
	//return BgImg.list
};

BgImg.updateQuotaUsed = function(){
	if( BgImg.controlsEls.listCustomQuotaUsed )
		BgImg.controlsEls.listCustomQuotaUsed.html( _g.getSize(BgImg.quotaUsed, 'm') )
}

BgImg.getPath = function(o, t){
	o = BgImg.getObj(o)

	if( o.isDefault )
		return _g.path.bgimg_dir
				+ ( t ? t + '/' : '' )
				+ o.filename
	
	if( t )
		return o['_'+t]
	
	return o._path
};

BgImg.save = function(o){
	o = BgImg.getObj(o)
	_g.save( o.path, 'fleet.moe - ' + o.filename )
};

BgImg.readFile = function( e ){
	let deferred = Q.defer()
	
	Q.fcall(_g.getScriptCanvas)
	.then(function(){
		// HTML5方式
		// http://www.html5rocks.com/en/tutorials/file/dndfiles/
		for(let i = 0, f; f = e.target.files[i]; i++){
			if( BgImg.quotaUsed + f.size > BgImg.quota ){
				deferred.reject(`已超过 ${_g.getSize(BgImg.quota, 'm')} 上限`)
				break;
				return;
			}

			let reader = new FileReader();
			reader.onload = (function(theFile) {
				return function(r) {
					//return deferred.resolve(r.target.result)
					//let n = _g.timeNow() + '.' + theFile.name.split('.').pop();
					let n = BgImg.getUniqueName(theFile.name)
					BgImg.quotaUsed+= theFile.size
					BgImg.updateQuotaUsed()
					BgImg.dataCustom[n] = {
						'_path':	r.target.result,
						'size':		theFile.size
					}
					localforage.setItem(
						'bgcustomlist',
						BgImg.dataCustom,
						function(err, result){
							deferred.resolve(
								new BgImg({
									'name':		n,
									'_path':	r.target.result,
									'size':		theFile.size
								})
							)
						}
					);
				};
			})(f);
			reader.readAsDataURL(f);
		}
	})

	return deferred.promise
};

BgImg.set = function(o, t, canvas){
	o = BgImg.getObj(o)

	let base64 = canvas.toDataURL("image/jpeg", t == 'blured' ? 0.4 : 0.6)
		,deferred = Q.defer()

	o['_'+t] = base64
	BgImg.dataCustom[o.name]['_'+t] = base64

	localforage.setItem(
		'bgcustomlist',
		BgImg.dataCustom,
		function(err, result){
			deferred.resolve()
		}
	);

	return deferred.promise
};

BgImg.delete = function(o){
	o = BgImg.getObj(o)
	
	let deferred = Q.defer()

	o.elThumbnail.remove();
	o.els.remove();

	BgImg.listVisible.forEach(function(obj, i){
		if( obj === o )
			BgImg.listVisible.splice(i, 1)
	})
	BgImg.namesHidden.forEach(function(n, i){
		if( n === o.name )
			BgImg.namesHidden.splice(i, 1)
	})

	Lockr.set('BgImgHidden', BgImg.namesHidden)
	
	delete BgImg.dataCustom[o.name]

	localforage.setItem(
		'bgcustomlist',
		BgImg.dataCustom,
		function(err, result){
			BgImg.countCustom--;
			BgImg.quotaUsed-= o.size
			BgImg.updateQuotaUsed()
			BgImg.list.forEach(function(obj, i){
				if( obj === o )
					BgImg.list.splice(i, 1)
			})
			if( BgImg.cur === o )
				BgImg.change();
			deferred.resolve()
		}
	);

	return deferred.promise
};