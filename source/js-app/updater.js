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
			尝试
				移动 data 目录下的文件到 data/prev
				流存储到 data 目录下
			遇到错误
				移动 [node.gui.App.dataPath]/Extracted Data 下的对应目录到 __prev__
				流存储到临时目录
				解压缩数据包
				更新 localstorage['nwjs-data-version']
				删除临时目录内压缩包
		全部完成后
			删除 data/prev || 删除 [node.gui.App.dataPath]/Extracted Data/__prev__
			更新器提示的提示状态
*/

var _updater = {
	'remote_url': 	'http://fleet.diablohu.com/versions.json',
	'remote_data': 	{}
}

// 获取本地版本
	_updater.get_local_version = function(){
		return JSON.parse( _config.get['nwjs-data-version'] || '{}' )
	}

// 获取远端版本
	_updater.get_remote = function(){
		var deferred = Q.defer()
		request({
			'uri': 		_updater.remote_url,
			'method': 	'GET'
		}, function(err, response, body){
			if(err){
				deferred.reject(new Error(err))
			}else if(response.statusCode != 200){
				_g.log(response.statusCode)
				deferred.reject(new Error(err))
			}else{
				_g.log(body)
				_updater.remote_data = body
				deferred.resolve()
			}
		})
		return deferred.promise
	}

// 对比各数据包版本
	_updater.compare_versions = function(){
	}

// 创建更新器提示
	_updater.create_update_indicator = function(){
	}

// 更新数据包流程
	_updater.update = function(){

	}