TablelistFleets.menuOptionsItemsBuildsLocation = function(){
	// Lockr.get('fleets-builds-file', node.path.join(node.gui.App.dataPath, 'NeDB', 'fleets.json'))
	// Lockr.set('fleets-builds-file', node.path.join(node.gui.App.dataPath, 'NeDB', 'fleets.json'))
	return [
		$('<hr class="option-in-tablelist"/>'),
		
		$('<div class="option-in-tablelist option-filelocation"/>')
			.html('<span>配置文件位置</span>')
			.append(
				TablelistFleets.filelocation_selector = $('<input type="file" class="none" webkitdirectory/>')
					.on('change', function(e){
						TablelistFleets.moveBuildsLocation(TablelistFleets.filelocation_selector.val())
					})
			)
			.append(
				$('<button type="button">还原</button>')
					.on('click', function(){
						TablelistFleets.moveBuildsLocation( node.path.join(node.gui.App.dataPath, 'NeDB') )
					})
			)
			.append(
				$('<button type="button">选择</button>')
					.on('click', function(){
						TablelistFleets.filelocation_selector.click()
					})
			)
	]
};

TablelistFleets.moveBuildsLocation = function(location){
	if( !location )
		return
	
	_frame.app_main.loading_start('tablelist_fleets_newlocation', false)
	TablelistFleets.filelocation_selector.prop('disabled', true)

	let n = 'fleets.json'
		,j = 1
		,exist = false
		,oldPath = Lockr.get('fleets-builds-file', node.path.join(node.gui.App.dataPath, 'NeDB', 'fleets.json'))

	try{
		exist = node.fs.lstatSync( node.path.join( location, n ) ) ? true : false
	}catch(e){
		exist = false
	}
	while( exist ){
		n = 'fleets-' + (j++) + '.json'
		try{
			exist = node.fs.lstatSync( node.path.join( location, n ) ) ? true : false
		}catch(e){
			exist = false
		}
	}

	let path = node.path.join(location, n)
	Lockr.set('fleets-builds-file', path)
	_db.fleets = new node.nedb({
			filename: 	path
		})
	
	// copy file to new location
	node.mkdirp.sync( location )
	Q.fcall(function(){
		let deferred = Q.defer()
			,cbCalled = false
			,rd = node.fs.createReadStream( oldPath )
		rd.on("error", function(err) {
			done(err);
		});
		let wr = node.fs.createWriteStream( path );
			wr.on("error", function(err) {
			done(err);
		});
		wr.on("close", function(ex) {
			done();
		});
		rd.pipe(wr);
		function done(err) {
			if (!cbCalled) {
				//callback(err, path_src, dest);
				deferred.resolve()
				cbCalled = true;
			}
		}
		return deferred.promise
	})
	.then(function(){
		let deferred = Q.defer()
		_db.fleets.loadDatabase(function(){
			deferred.resolve()
		})
		return deferred.promise
	})
	.done(function(){
		_frame.app_main.loading_complete('tablelist_fleets_newlocation')
		TablelistFleets.filelocation_selector.prop('disabled', false)
		TablelistFleets.filelocation_selector.val('')
	})
};