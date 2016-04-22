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
						TablelistFleets.migrateBuilds( TablelistFleets.filelocation_selector.val() )
					})
			)
			.append(
				$('<button type="button">还原</button>')
					.on('click', function(){
						TablelistFleets.migrateBuilds( node.path.join(node.gui.App.dataPath, 'NeDB') )
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

TablelistFleets.migrateBuilds = function(location){
	if( !location )
		return
	
	if( location.indexOf(';') > -1 )
		location = node.path.dirname( location.split(';')[0] )

	let n = 'fleets.json'
		,exist = false
		,oldPath = Lockr.get('fleets-builds-file', node.path.join(node.gui.App.dataPath, 'NeDB', 'fleets.json'))
		,newPath = node.path.join( location, n )
		,chain = Q()
	
	if( oldPath === newPath )
		return
	
	_frame.app_main.loading_start('tablelist_fleets_newlocation', false)
	TablelistFleets.filelocation_selector.prop('disabled', true)

	try{
		exist = node.fs.lstatSync( node.path.join( location, n ) ) ? true : false
	}catch(e){
	}
	
	function _done(){
		_frame.app_main.loading_complete('tablelist_fleets_newlocation')
		TablelistFleets.filelocation_selector.prop('disabled', false)
		TablelistFleets.filelocation_selector.val('')
		TablelistFleets.menuOptions.curTablelist = null
		_frame.modal.hide()
	}
	
	if( exist ){
		chain = chain.then(function(){
			let deferred = Q.defer()
			if( !TablelistFleets.modalMigrateBuilds ){
				TablelistFleets.modalMigrateBuilds = $('<div/>')
					.html(`在目标目录发现舰队配置文件 <strong>fleets.json</strong>`)
					.append(
						$('<p class="actions"/>')
							.append( TablelistFleets.modalMigrateBuildsButtonMerge = $('<button/>',{
									'class':	'button',
									'html':		'合并配置'
								}) )
							.append( TablelistFleets.modalMigrateBuildsButtonOver = $('<button/>',{
									'class':	'button',
									'html': 	'替换目标文件'
								}) )
							.append( TablelistFleets.modalMigrateBuildsButtonNew = $('<button/>',{
									'class':	'button',
									'html': 	'新建配置文件'
								}) )
					)
			}

			let j = 1
				,newName
			while( exist ){
				newName = 'fleets-' + (j++) + '.json'
				try{
					exist = node.fs.lstatSync( node.path.join( location, newName ) ) ? true : false
				}catch(e){
					exist = false
				}
			}

			TablelistFleets.modalMigrateBuildsButtonMerge.off('click').on('click',function(){
				Q.fcall(function(){
					TablelistFleets.modalMigrateBuilds.detach()
					if( TablelistFleets.menuOptions.curTablelist )
						return TablelistFleets.menuOptions.curTablelist.importBuilds(
								TablelistFleets.filelocation_selector,
								n
							)
					return true
				}).then(function(){
					deferred.resolve()
				})
			})
			
			TablelistFleets.modalMigrateBuildsButtonOver.off('click').on('click',function(){
				node.fs.unlink( node.path.join( location, n ), function(err){
					deferred.resolve()
				} )
			})
			
			TablelistFleets.modalMigrateBuildsButtonNew.html(`新建 ${newName}`).off('click').on('click',function(){
				n = newName
				deferred.resolve()
			})
			
			_frame.modal.show(
				TablelistFleets.modalMigrateBuilds,
				'配置文件冲突',
				{
					'classname': 	'infos_fleet infos_fleet_import',
					'detach':		true,
					'onClose': 		function(){
						_done()
					}
				}
			)
			return deferred.promise
		})
	}
	
	chain = chain
	.then(function(){
		newPath = node.path.join(location, n)
		_g.log(`migrate to ${newPath}`)
		Lockr.set('fleets-builds-file', newPath)
		_db.fleets = new node.nedb({
				filename: 	newPath
			})		
		// copy file to new location
		node.mkdirp.sync( location )
	})	
	.then(function(){
		let deferred = Q.defer()
			,cbCalled = false
			,rd = node.fs.createReadStream( oldPath )
		rd.on("error", function(err) {
			done(err);
		});
		let wr = node.fs.createWriteStream( newPath );
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
	.catch(function(err){
		_g.err(err, '[舰队] 转移配置文件')
	})
	.done( _done )
};