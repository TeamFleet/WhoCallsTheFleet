/*

自动更新流程
	获取本地版本
		JSON.parse( _config.get['nwjs-data-version'] )
	获取远端版本
		http://fleet.diablohu.com/versions.json
		packages[name].version
	对比各数据包版本
	如果没有更新
		返回
	如果有更新
		创建更新器提示
		按顺序
			获取文件
				http://fleet.diablohu.com/ + packages[name].path
				更新器提示的更新进度
			检查文件大小和MD5
				packages[name].bytes
				packages[name].md5
			检查通过
				pipe 程序目录
					[name].updated
				删除原有数据包
				重命名新数据包
				如果以上过程发生错误
					权限不足
						提示用户
						TODO 弹出权限请求，之后继续流程
					其他原因
						放弃操作
		全部完成后
			删除 data/prev || 删除 [node.gui.App.dataPath]/Extracted Data/__prev__
			更新器提示的提示状态
*/

var _updater = {
	'local_versions':{},
	'remote_root':	'http://fleet.diablohu.com',
	'remote_url': 	'http://fleet.diablohu.com/versions.json',
	'remote_data': 	{}
}

// 获取本地版本
	_updater.get_local_version = function(){
		_updater.local_versions = JSON.parse( localStorage['nwjs-data-version'] || '{}' )
		return _updater.local_versions
	}

// 获取远端版本
	_updater.get_remote = function(){
		var deferred = Q.defer()
		node.request({
			'uri': 		_updater.remote_url,
			'method': 	'GET'
		}, function(err, response, body){
			if(err){
				deferred.reject(new Error(err))
			}else if(response.statusCode != 200){
				deferred.reject(new Error(response.statusCode))
			}else{
				_updater.remote_data = JSON.parse( body || '{}' ) || {}
				deferred.resolve( _updater.remote_data )
			}
		})
		return deferred.promise
	}

// 对比各数据包版本，检查哪些数据包需要更新
	_updater.get_packages_updated = function(){
		// compare version
			// 对比版本号 a 相对于 b
			// a > b => 1
			// a = b => 0
			// a < b => -1
			function compareVersion(a, b) {
				var i;
				var len;

				if (typeof a + typeof b !== 'stringstring') {
					return false;
				}

				a = a.split('.');
				b = b.split('.');
				i = 0;
				len = Math.max(a.length, b.length);

				for (; i < len; i++) {
					if ((a[i] && !b[i] && parseInt(a[i]) > 0) || (parseInt(a[i]) > parseInt(b[i]))) {
						return 1;
					} else if ((b[i] && !a[i] && parseInt(b[i]) > 0) || (parseInt(a[i]) < parseInt(b[i]))) {
						return -1;
					}
				}

				return 0;
			};
		var updated = []

		for( var i in _updater.local_versions ){
			if( _updater.remote_data.packages && _updater.remote_data.packages[i] ){
				var remote_version = _updater.remote_data.packages[i].version
										? _updater.remote_data.packages[i].version
										: _updater.remote_data.packages[i]
				if( compareVersion( remote_version , _updater.local_versions[i] ) > 0 )
					updated.push(i)
			}
		}


		// 根据文件大小升序排序
		return updated.sort(function(a, b){
			// 降序
				//return _updater.remote_data.packages[b].bytes - _updater.remote_data.packages[a].bytes
			// 升序
				return _updater.remote_data.packages[a].bytes - _updater.remote_data.packages[b].bytes
		})
	}

// 创建更新器提示
	_updater.create_update_indicator = function(){
		if( !_updater.update_indicator || !_updater.update_indicator.length ){
			_updater.update_indicator = $('<button class="update_progress" icon="stairs-up" data-tip="检测到新版本<br>更新中..."/>').appendTo( _frame.dom.globaloptions )
			_updater.update_indicator_bar = $('<s/>').appendTo( _updater.update_indicator )
		}
	}

// 更新数据包流程
	_updater.update = function(){
		var promise_chain 	= Q.fcall(function(){})
			,dirRoot = node.path.dirname(process.execPath).split(node.path.sep)
			,dirData = ''
			,datadir_exists = false
		dirRoot = (process.platform == 'darwin' || (dirRoot[dirRoot.length - 1] == 'nwjs' && node.path.basename( process.execPath ) == 'nw.exe') )
					? process.cwd()
					: node.path.dirname(process.execPath)
		dirData = node.path.join( dirRoot, 'data' )

		// 开始异步函数链
			promise_chain

		// 检查数据包目录是否存在
			.then(function(){
				var deferred = Q.defer()
				node.fs.lstat(dirData, function(err, stats){
					if( err || !stats.isDirectory() ){
						deferred.reject( '数据包目录不存在, 不进行自动更新' )
					}else{
						datadir_exists = true
						deferred.resolve( true )
					}
				})
				return deferred.promise
			})

		// 获取数据包目录下的文件列表，并筛选 .updated 文件
			.then(function(){
				var deferred = Q.defer()
				node.fs.readdir(dirData, function(err, files){
					if( err ){
						deferred.reject( err )
					}else{
						var selected = []
						for(var i in files){
							if( node.path.extname(files[i]) == '.updated' )
								selected.push(files[i])
						}
						deferred.resolve( selected )
					}
				})
				return deferred.promise
			})

		// 清理数据包目录下所有的 .updated 文件
			.then(function(files){
				var the_promises = []
				files.forEach(function(filename){
					var deferred = Q.defer()
					node.fs.unlink( node.path.join( dirData, filename ), function(err){
						_g.log('已删除更新残留文件 ' + filename)
						deferred.resolve()
					} )
					the_promises.push(deferred.promise)
				})
				return Q.all(the_promises);
			})

		// 其余流程
			.then(_updater.get_local_version())
			.then(_updater.get_remote)
			.then(_updater.get_packages_updated)
			.then(function(updated){
				if( !updated.length ){
					_g.log('所有数据包均为最新')
					return false
				}

				_g.log('自动更新过程开始 (' + updated.join(', ') + ')')
				_updater.create_update_indicator()
				var promise_chain_update = Q.fcall(function(){})
					,count = 0
					,permission = true
					,size_total = 0
					,size_received = 0

				updated.forEach(function(package_name){
					(function(package_name, count){
						size_total+= _updater.remote_data.packages[package_name].bytes

						promise_chain_update = promise_chain_update.then(function(){
							var deferred = Q.defer()
								,savefile = false

							var tempfile = node.path.join(
										dirData,
										package_name
										+ node.path.extname(_updater.remote_data.packages[package_name].path)
										+ '.updated'
									)
								,targetFile = node.path.join(
										dirData,
										package_name
										+ node.path.extname(_updater.remote_data.packages[package_name].path)
									)

							/*
							tempfile = node.path.join(
										node.path.normalize('C:\Program Files (x86)\\'),
										'__' + package_name
										+ node.path.extname(_updater.remote_data.packages[package_name].path)
									)
							*/

							function err_handler(err, msg){
								msg = msg || ''
								if( err.errno == -4048 || err.message.indexOf( 'not permitted' ) > -1 ){
									_g.log('    ' + msg + '权限不足')
								}else{
									_g.log(err)
									_g.log('    ' + msg + '发生错误 [' +err.errno+ ']: ' + err.message)
								}
							}

							_g.log('')
							_g.log('========== ' + count + '/' + updated.length + ' ==========')
							_g.log('')
							_g.log('    ' + package_name
								+ ' | 本地版本: ' + _updater.local_versions[package_name]
								+ ' | 服务器版本: ' + (_updater.remote_data.packages[package_name].version
														? _updater.remote_data.packages[package_name].version
														: _updater.remote_data.packages[package_name])
							)

							node['request-progress'](
							node.request({
								'uri': 		node.url.format(
												_updater.remote_root + '/'
												+ _updater.remote_data.packages[package_name].path
											),
								'method': 	'GET'
							}).on('error',function(err){
								_g.log('    下载数据包出错')
								node.fs.unlink(tempfile, function(err2){
									deferred.reject(new Error(err))
								})
								//deferred.reject(new Error(err))
							}).on('response', function(response){
								if( response.statusCode == 200
									&& parseInt(response.headers['content-length']) == _updater.remote_data.packages[package_name].bytes
								)
									savefile = true
							})).on('error',function(err){
								_g.log('    下载数据包出错')
								node.fs.unlink(tempfile, function(err2){
									deferred.reject(new Error(err))
								})
								//deferred.reject(new Error(err))
							}).on('progress',function(state){
								_updater.update_indicator.addClass('on')
								_g.log('    ' + state.received + ' / ' + state.total + ' (' + state.percent + '%)'
									+ ' | ' + Math.floor( (size_received + state.received) / size_total * 100 ) + '%'
								)
								_updater.update_indicator_bar.css('width', Math.floor( (size_received + state.received) / size_total * 100 ) + '%')
							}).pipe(
								node.fs.createWriteStream(tempfile)
								.on('finish', function(){
									if( savefile ){
										size_received+= _updater.remote_data.packages[package_name].bytes
										node.fs.unlink(targetFile, function(err){
											if( err ){
												err_handler(err, '删除原有数据包')
												_g.log('    跳过')
												//deferred.resolve()
											}//else{
												node.fs.rename(
													tempfile,
													targetFile,
													function(err){
														if( err ){
															err_handler(err, '重命名新数据包')
															_g.log('    跳过')
														}else{
															_g.log('    该数据包更新完成')
														}
														deferred.resolve()
													}
												)
											//}
										})
									}else{
										_g.log('    下载数据包出错')
										node.fs.unlink(tempfile, function(err){
											deferred.resolve()
										})
									}
								}).on('error', function(err){
									err_handler(err, '写入文件')
									_g.log('    流程结束')
									//deferred.resolve()
									deferred.reject(new Error(err))
								})
							)
							return deferred.promise
						})
					})(package_name, count)
					count++
				})
				promise_chain_update = promise_chain_update
					.catch(function (err) {
						_g.error(err)
						_g.log('自动更新失败')
						_updater.update_indicator.removeClass('on')
					})
					.done(function(){
						_g.log('')
						if( size_received >= size_total ){
							_g.log('========== ' + updated.length + '/' + updated.length + ' ==========')
							_g.log('')
							_g.log('自动更新完毕')
							_updater.update_indicator.addClass('done').data('tip', '更新完成<br>请重新启动程序')
							_updater.update_indicator_bar.css('width', '')
						}else{
							_g.log('========== ' + updated.length + '/' + updated.length + ' ==========')
							_g.log('')
							_g.log('自动更新失败, 结束流程')
							_updater.update_indicator.removeClass('on')
						}
					})
			})
		
		// 错误处理
			.catch(function (err) {
				_g.error(err)
				_g.log('自动更新失败')
				if( _updater.update_indicator && _updater.update_indicator.length )
					_updater.update_indicator.remove()
			})
			.done(function(){
				_g.log('自动更新过程初始化完毕')
			})
	}


// 将更新流程加入页面序列
	_frame.app_main.functions_on_ready.push( _updater.update )