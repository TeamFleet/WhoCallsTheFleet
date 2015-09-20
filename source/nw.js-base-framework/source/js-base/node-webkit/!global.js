// define and require node.js libraries & modules
var node = {
	'require': 	function(module, only_require){
		if( !node[module] && !only_require ){
			node[module] = require(module)
		}if( only_require ){
			return require(module)
		}
		return node[module]
	}
}


node.gui 		= node.require('nw.gui', true)
node.win 		= node.gui.Window.get()
node.clipboard 	= node.gui.Clipboard.get();

node.require('path')
node.require('fs')


if(typeof debugmode == 'undefined')
	var debugmode = false
						|| (
							node.gui.App.manifest['debug']
							|| node.gui.App.manifest['window']['debug']
						)

if( global.launcherOptions ){
	debugmode = global.launcherOptions['debug'] || global.launcherOptions['window']['debug']
}



// _g.root, nw.js 程序运行目录
	_g.root = node.path.dirname(process.execPath).split(node.path.sep)
	_g.root = (_g.root[_g.root.length - 1] == 'nwjs' && node.path.basename( process.execPath ) == 'nw.exe')
					? process.cwd()
					: node.path.dirname(process.execPath)
	// 对app根目录再做检查，如果不存在，则指向到缓存目录
	// 该情况通常发生于使用launcer启动时
		try{
			var stat = node.fs.lstatSync( node.path.join( _g.root , '/app/main.html' ) )
		}catch(e){
			_g.root	= node.path.join( node.gui.App.dataPath, '/Extracted Data/')
		}


// _g.execPath
	_g.execPath = node.path.dirname(process.execPath).split(node.path.sep)
	_g.execPath = (process.platform == 'darwin' || (_g.execPath[_g.execPath.length - 1] == 'nwjs' && node.path.basename( process.execPath ) == 'nw.exe') )
					? process.cwd()
					: node.path.dirname(process.execPath)



// 文件另存为
	_g.file_save_as = function( path_src, filename ){
		path_src = node.path.normalize(path_src)
		if( !_frame.dom.hidden_saveform )
			_frame.dom.hidden_saveform = $('<input type="file" nwsaveas/>')
					.on('change', function(){
						var input = _frame.dom.hidden_saveform
							,dest = input.val()
							,path_file = input.attr('nwsaveas_file')
						input.attr('nwsaveas', '').attr('nwsaveas_file', '').val('')

						if( dest ){
							var cbCalled = false
								,rd = node.fs.createReadStream( path_file )
							rd.on("error", function(err) {
								done(err);
							});
							var wr = node.fs.createWriteStream(dest);
								wr.on("error", function(err) {
								done(err);
							});
							wr.on("close", function(ex) {
								done();
							});
							rd.pipe(wr);
							function done(err) {
								if (!cbCalled) {
									//callback(err, src, dest);
									cbCalled = true;
								}
							}
						}
					})
					.appendTo( _frame.dom.hidden )
		_frame.dom.hidden_saveform
			.attr({
				'nwsaveas': 	filename || '',
				'nwsaveas_file':path_src
			}).trigger('click')
	}


// Set actual page zoom, 1 = 100%, 0.5 = 50%, 2 = 200%, etc...
	_g.zoom = function(v){
		v = v || 1
		node.win.zoomLevel = Math.log(v) / Math.log(1.2)
		return node.win.zoomLevel
	}
