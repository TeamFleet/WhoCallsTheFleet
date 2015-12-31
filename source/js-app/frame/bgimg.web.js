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

BgImg.readFile = function( e ){
	let deferred = Q.defer()

	// HTML5方式
	// http://www.html5rocks.com/en/tutorials/file/dndfiles/
	for(let i = 0, f; f = e.target.files[i]; i++){
		let reader = new FileReader();
		reader.onload = (function(theFile) {
			return function(r) {
				return deferred.resolve(r.target.result)
			};
		})(f);
		reader.readAsText(f);
	}

	return deferred.promise
};

/*
BgImg.upload11 = function(){
					BgImg.fileSelector.prop('disabled', true)

						_frame.app_main.loading_start('tablelist_fleets_import', false)
						
						let file = this.dbfile_selector.val()
							,promise_chain 	= Q.fcall(function(){})
						
						promise_chain
						
						// 载入文件
							.then(function(){
								let deferred = Q.defer()
								if( _g.isNWjs ){
									// NW.js - 使用node.js方式读取文件内容
									node.fs.readFile(file, 'utf8', function(err, data){
										if( err )
											deferred.reject('文件载入失败', new Error(err))
										else
											deferred.resolve(data)
									})
								}else{
									// HTML5方式
									// http://www.html5rocks.com/en/tutorials/file/dndfiles/
									for(let i = 0, f; f = e.target.files[i]; i++){
										let reader = new FileReader();
										reader.onload = (function(theFile) {
											return function(r) {
												return deferred.resolve(r.target.result)
											};
										})(f);
										reader.readAsText(f);
									}
								}
								return deferred.promise
							})

						// 处理文件内容，以换行符为准创建Array
							.then(function(data){
								this.dbfile_selector.val('')

								let array = []
									,deferred = Q.defer()
								data.split('\n').forEach(function(line){
									if( line ){
										try{
											array.push(JSON.parse(line))
										}catch(e){
											deferred.reject('文件格式错误', e)
										}
										deferred.resolve(array)
									}else{
										deferred.reject('文件无内容')
									}
								})
								return deferred.promise
							}.bind(this))
						
						// 已处理JSON，导入
							.then(function(array){
								let the_promises = []
									,complete = 0
								
								array.forEach(function(data){
									let deferred = Q.defer()
									the_promises.push(deferred.promise)
									
									_db.fleets.insert(data, function(err){
										complete++
										if(err && err.errorType == "uniqueViolated"){
											//if( confirm('舰队 [' + (data['name']||'无标题') + '] 已经存在，是否更新？') ){
												_db.fleets.update({
													_id: data._id
												}, data, {}, function(err, numReplaced){
													deferred.resolve()
													if( err )
														_g.log(err)
													else
														_g.log(numReplaced)
												})
											//}else{
											//	deferred.resolve()
											//}
										}else{
											deferred.resolve()
										}
									})
								})
								
								return Q.all(the_promises);
							})
							.then(function(){
								this.refresh()
								_g.badgeMsg('成功导入配置')
							}.bind(this))
						
						// 错误处理
							.catch(function(msg, err) {
								_g.log(msg)
								_g.error(err)
								_g.badgeError(msg)
							})
							.done(function(){
								_g.log('import complete')
								_frame.app_main.loading_complete('tablelist_fleets_import')
								this.dbfile_selector.prop('disabled', false)
							}.bind(this))
};
*/