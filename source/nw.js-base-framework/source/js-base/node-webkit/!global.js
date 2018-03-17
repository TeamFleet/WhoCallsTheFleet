// https://github.com/nwjs/nw.js/blob/nw13/src/resources/nw_pre13_shim.js
(function () {

    // console.log(
    //     top.nw,
    //     self.nw
    // )

    if (self !== top && top.nw && top.nw.require) self.nw = top.nw

    // detect `nw` object of NW13
    if (!(self.nw && self.nw.require)) return

    var realrequire = nw.require;
    self.require = function () {
        if (arguments[0] === 'nw.gui') {
            return nw;
        } else {
            return realrequire.apply(self, [].slice.call(arguments, 0));
        }
    };
    self.require.cache = realrequire.cache;
    self.require.extensions = realrequire.extensions;
    self.require.resolve = realrequire.resolve;

    // Following items exist when running with `--mixed-context`.
    // Copy them from `nw` to browser context
    if (!self.process) self.process = self.nw.process;
    if (!self.Buffer) self.Buffer = self.nw.Buffer;
    if (!self.global) self.global = self.nw.global;
    if (!self.root) self.root = self.nw.root;

}());

// define and require node.js libraries & modules
var node = {
    'require': function (module, only_require) {
        /*var r = typeof nw != 'undefined' && nw.require
                    ? nw.require
                    : require
                    */
        if (!node[module] && !only_require) {
            node[module] = require(module)
            if (typeof self[module] === 'undefined')
                self[module] = node[module]
        } if (only_require)
            return require(module)
        return node[module]
    }
}


node.gui = node.require('nw.gui', true)
// node.win = node.gui.Window.get()
node.clipboard = node.gui.Clipboard.get();

node.require('path')
node.require('fs')

if (typeof launcherOptions === 'undefined')
    self.launcherOptions = {
        window: {}
    }
node.win = node.win || self.win || (typeof nw !== 'undefined' ? nw.Window.get() : undefined) || node.gui.Window.get()


if (typeof debugmode == 'undefined')
    var debugmode = false
        || (
            node.gui.App.manifest['debug']
            || node.gui.App.manifest['window']['debug']
        )

if (global && launcherOptions && launcherOptions.window && typeof launcherOptions['window']['debug'] !== 'undefined') {
    debugmode = launcherOptions['debug'] || launcherOptions['window']['debug']
}



// _g.root, nw.js 程序运行目录
// _g.root = node.path.dirname(process.execPath).split(node.path.sep)
// _g.root = (_g.root[_g.root.length - 1] == 'nwjs' && node.path.basename( process.execPath ) == 'nw.exe')
// 				? process.cwd()
// 				: node.path.dirname(process.execPath)
// // 对app根目录再做检查，如果不存在，则指向到缓存目录
// // 该情况通常发生于使用launcer启动时
// 	try{
// 		var stat = node.fs.lstatSync( node.path.join( _g.root , '/app/main.html' ) )
// 	}catch(e){
// 		_g.root	= node.path.join( node.gui.App.dataPath, '/Extracted Data/')
// 	}
// _g.root = node.path.dirname(process.execPath)
// try {
//     node.fs.accessSync(
//         node.path.join(_g.root, 'package.json'),
//         node.fs.F_OK
//     );
// } catch (e) {
//     _g.root = process.cwd()
//     try {
//         node.fs.accessSync(
//             node.path.join(_g.root, 'package.json'),
//             node.fs.F_OK
//         );
//     } catch (e) {
//         _g.root = node.path.join(node.gui.App.dataPath, '/Extracted Data/')
//     }
// }
_g.rootscheck = [
    node.path.dirname(process.execPath),
    process.cwd(),
    node.path.join(node.gui.App.dataPath, '/Extracted Data/')
]
_g.rootscheckentry = node.gui.App.manifest.main
_g.rootscheckentry = _g.rootscheckentry.split('://')
_g.rootscheckentry = _g.rootscheckentry[_g.rootscheckentry.length - 1]
for (var i = 0; i < _g.rootscheck.length; i++) {
    var dir = _g.rootscheck[i]
    // var hasMain = true
    // try {
    //     node.fs.accessSync(
    //         node.path.join(dir, 'app', 'main.html'),
    //         node.fs.F_OK
    //     );
    // } catch (e) {
    //     hasMain = false
    // }
    if (!_g.root && node.fs.existsSync(node.path.join(dir, 'app', 'main.html'))) {
        _g.root = dir
        continue
    }
}


// _g.execPath
_g.execPath = node.path.dirname(process.execPath).split(node.path.sep)
_g.execPath = (process.platform == 'darwin' || (_g.execPath[_g.execPath.length - 1] == 'nwjs' && node.path.basename(process.execPath) == 'nw.exe'))
    ? process.cwd()
    : node.path.dirname(process.execPath)



// 文件另存为
_g.file_save_as = function (path_src, filename, callback) {
    path_src = node.path.normalize(path_src)
    if (!_frame.dom.hidden_saveform)
        _frame.dom.hidden_saveform = $('<input type="file" nwsaveas/>')
            .on('change', function () {
                var input = _frame.dom.hidden_saveform
                    , dest = input.val()
                    , path_file = input.attr('nwsaveas_file')
                input.attr('nwsaveas', '').attr('nwsaveas_file', '').val('')

                if (dest) {
                    var cbCalled = false
                        , rd = node.fs.createReadStream(path_file)
                    rd.on("error", function (err) {
                        done(err);
                    });
                    var wr = node.fs.createWriteStream(dest);
                    wr.on("error", function (err) {
                        done(err);
                    });
                    wr.on("close", function (ex) {
                        done();
                    });
                    rd.pipe(wr);
                    function done(err) {
                        if (!cbCalled) {
                            callback(err, path_src, dest);
                            cbCalled = true;
                        }
                    }
                }
            })
            .appendTo(_frame.dom.hidden)
    _frame.dom.hidden_saveform
        .attr({
            'nwsaveas': filename || '',
            'nwsaveas_file': path_src
        }).trigger('click')
}


// Set actual page zoom, 1 = 100%, 0.5 = 50%, 2 = 200%, etc...
_g.zoom = function (v) {
    v = v || 1
    node.win.zoomLevel = Math.log(v) / Math.log(1.2)
    return node.win.zoomLevel
}
