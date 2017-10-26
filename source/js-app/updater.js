/*

自动更新流程
    获取本地版本
        JSON.parse( _config.get['nwjs-data-version'] )
    获取远端版本
        http://fleet.moe/versions.json
        packages[name].version
    对比各数据包版本
    如果没有更新
        返回
    如果有更新
        创建更新器提示
        按顺序
            获取文件
                http://fleet.moe/ + packages[name].path
                更新器提示的更新进度
            检查文件大小和MD5
                packages[name].bytes
                packages[name].md5
            检查通过
                pipe 程序目录
                    [name].updated
            全部下载完成
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

/*
 * 测试流程
 * 
 * debugmode = true
 * _updater.remote_path = '/versions-beta.json'
 * _updater.update()
 * 
 */

var _updater = {
    'local_versions': {},
    'remote_root': 'http://fleet.moe',
    'remote_path': '/versions.json',
    'remote_data': {},
    updatable: false
}

// 获取本地版本
_updater.get_local_version = function () {
    var localVersions = localStorage['nwjs-data-version']
    _updater.local_versions = JSON.parse(localVersions || '{}')
    if (localVersions) {
        _g.log('本地版本: ', _updater.local_versions)
        _updater.updatable = true
    }
    return _updater.local_versions
}

// 获取远端版本
_updater.get_remote = function () {
    var deferred = Q.defer()
    node.request({
        'uri': _updater.remote_root + _updater.remote_path,
        'method': 'GET'
    }, function (err, response, body) {
        if (err) {
            deferred.reject(new Error(err))
        } else if (response.statusCode != 200) {
            deferred.reject(new Error(response.statusCode))
        } else {
            _updater.remote_data = JSON.parse(body || '{}') || {}
            _g.log('服务器版本: ', _updater.remote_data)
            // alert(JSON.stringify(_updater.remote_data))
            // 检查主程序版本
            if (node.semver.lt(process.versions.nw, _updater.remote_data.core || '0.1.0')) {
                _g.badgeError('!! 主程序已更新，请访问 fleet.moe 手动下载最新版本 !!', true)
                deferred.reject()
            }
            deferred.resolve(_updater.remote_data)
        }
    })
    return deferred.promise
}

// 对比各数据包版本，检查哪些数据包需要更新
_updater.get_packages_updated = function () {
    if (!_updater.updatable || !_updater.remote_data.packages)
        return [];
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

    for (var i in _updater.remote_data.packages) {
        var remote_version = _updater.remote_data.packages[i].version
            ? _updater.remote_data.packages[i].version
            : _updater.remote_data.packages[i]
        if (!_updater.local_versions[i])
            updated.push(i)
        else if (compareVersion(remote_version, _updater.local_versions[i]) > 0)
            updated.push(i)
    }


    // 根据文件大小升序排序
    return updated.sort(function (a, b) {
        // 降序
        //return _updater.remote_data.packages[b].bytes - _updater.remote_data.packages[a].bytes
        // 升序
        return _updater.remote_data.packages[a].bytes - _updater.remote_data.packages[b].bytes
    })
}

// 更新提示
_updater.indicator = function (progress) {
    if (!_updater.indicatorEl) {
        _updater.indicatorEl = $('<button class="update_progress" icon="stairs-up" data-tip="检测到新版本<br>更新中..."/>')
            .prependTo(_frame.dom.globaloptions)
            .append(_updater.indicatorElBar = $('<s/>'))
    }
    if (typeof progress == 'number' && progress >= 0 && progress < 1) {
        progress = Math.floor(progress * 100)
        _updater.indicatorEl.addClass('on').attr('progress', progress)
        _updater.indicatorElBar.css('width', progress + '%')
        node.win.setProgressBar(progress / 100)
    } else if (progress) {
        _updater.indicatorEl.addClass('on').attr('progress', 100).data('tip', '更新完成<br>请重新启动程序')
        _updater.indicatorElBar.css('width', '')
        node.win.setProgressBar(1)
    } else {
        _updater.indicatorEl.removeClass('on').removeAttr('progress')
        node.win.setProgressBar(0)
    }
}

// 更新数据包流程
_updater.update = function () {
    var promise_chain = Q.fcall(function () {
        _g.log('')
        _g.log('========== 自动更新 - 开始 ==========')
        _g.log('')
    })
        , dirRoot = node.path.dirname(process.execPath).split(node.path.sep)
        , dirData = ''
        , datadir_exists = false
        , renamePair = []
        , size_total = 0
        , size_received = 0

    dirRoot = (process.platform == 'darwin' || (dirRoot[dirRoot.length - 1] == 'nwjs' && node.path.basename(process.execPath) == 'nw.exe'))
        ? process.cwd()
        : node.path.dirname(process.execPath)
    dirData = node.path.join(dirRoot, 'data')

    function err_handler(err, msg) {
        msg = msg || ''
        if (err.errno == -4048 || err.message.indexOf('not permitted') > -1) {
            _g.log('    ' + msg + '权限不足')
        } else {
            _g.log(err)
            _g.log('    ' + msg + '发生错误 [' + err.errno + ']: ' + err.message)
        }
    }

    // 检查上次运行时的主程序版本
    if (process.versions && process.versions.nw) {
        const lastNwjsVer = Lockr.get('nwjs-ver', '0.12.2')
        if (node.semver.lt(lastNwjsVer, '0.26.0')) {
            _frame.modal.show(
                $(`<div>
                    <h3>!! 舰队模拟的以下选项需要重新配置 !!</h3>
                    <list>
                        <li>如果设置了配置文件存储位置，需要重新选择</li>
                        <li>默认司令部等级</li>
                        <li>导入配置/配装时默认飞行器熟练度是否为满</li>
                    </list>
                    <p>为您带来的不便敬请谅解</p>
                </div>`),
                '主程序已更新',
                {
                    classname: 'modal-nwjs-core-updated'
                }
            )
        }
        Lockr.set('nwjs-ver', process.versions.nw)
    }

    // 开始异步函数链
    promise_chain = promise_chain

        // 检查数据包目录是否存在
        .then(function () {
            var deferred = Q.defer()
            node.fs.lstat(dirData, function (err, stats) {
                if (err || !stats.isDirectory()) {
                    deferred.reject('数据包目录不存在, 不进行自动更新')
                } else {
                    datadir_exists = true
                    deferred.resolve(true)
                }
            })
            return deferred.promise
        })

        // 获取数据包目录下的文件列表，并筛选 .updated 文件
        .then(function () {
            var deferred = Q.defer()
            node.fs.readdir(dirData, function (err, files) {
                if (err) {
                    deferred.reject(err)
                } else {
                    var selected = []
                    files.forEach(function (file) {
                        if (node.path.extname(file) == '.updated')
                            selected.push(file)
                    })
                    deferred.resolve(selected)
                }
            })
            return deferred.promise
        })

        // 清理数据包目录下所有的 .updated 文件
        .then(function (files) {
            var the_promises = []
            files.forEach(function (filename) {
                var deferred = Q.defer()
                node.fs.unlink(node.path.join(dirData, filename), function (err) {
                    _g.log('已删除更新残留文件 ' + filename)
                    deferred.resolve()
                })
                the_promises.push(deferred.promise)
            })
            return Q.all(the_promises);
        })

        // 其余流程
        .then(_updater.get_local_version)
        .then(_updater.get_remote)
        .then(_updater.get_packages_updated)
        .then(function (updated) {
            //_g.log(updated)

            if (!updated.length) {
                _g.log('所有数据包均为最新')
                return true
            }

            console.log('[自动更新] 开始')
            _g.log('更新开始: ' + updated.join(', '))

            let promise_chain_update = Q.fcall(function () { })
                //,permission = true
                , deferredUpdating = Q.defer()

            updated.forEach(function (package_name, index) {
                size_total += _updater.remote_data.packages[package_name].bytes

                promise_chain_update = promise_chain_update.then(function () {
                    let deferred = Q.defer()
                        , savefile = false
                        , filesize = _updater.remote_data.packages[package_name].bytes

                    var tempfile = node.path.join(
                        dirData,
                        package_name
                        + node.path.extname(_updater.remote_data.packages[package_name].path)
                        + '.updated'
                    )
                        , targetFile = node.path.join(
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

                    function err_handler(err, msg) {
                        msg = msg || ''
                        if (err.errno == -4048 || err.message.indexOf('not permitted') > -1) {
                            _g.log('    ' + msg + '权限不足')
                        } else {
                            _g.log(err)
                            _g.log('    ' + msg + '发生错误 [' + err.errno + ']: ' + err.message)
                        }
                    }

                    _g.log('')
                    _g.log('========= ' + (index + 1) + '/' + updated.length + ' ==========')
                    _g.log('    ' + package_name
                        + ' | 本地版本: ' + _updater.local_versions[package_name]
                        + ' | 服务器版本: ' + (_updater.remote_data.packages[package_name].version
                            ? _updater.remote_data.packages[package_name].version
                            : _updater.remote_data.packages[package_name])
                    )

                    node['request-progress'](
                        node.request({
                            'uri': node.url.format(
                                _updater.remote_root + '/'
                                + _updater.remote_data.packages[package_name].path
                            ),
                            'method': 'GET'
                        }).on('error', function (err) {
                            _g.log('    下载数据包出错')
                            node.fs.unlink(tempfile, function (err2) {
                                deferred.reject(new Error(err))
                            })
                            //deferred.reject(new Error(err))
                        }).on('response', function (response) {
                            if (response.statusCode == 200
                                && parseInt(response.headers['content-length']) == filesize
                            )
                                savefile = true
                        })).on('error', function (err) {
                            _g.log('    下载数据包出错')
                            node.fs.unlink(tempfile, function (err2) {
                                deferred.reject(new Error(err))
                            })
                            //deferred.reject(new Error(err))
                        }).on('progress', function (state) {
                            _g.log('    ' + state.received + ' / ' + state.total + ' (' + state.percent + '%)'
                                + ' | ' + Math.floor((size_received + state.received) / size_total * 100) + '%'
                            )
                            _updater.indicator((size_received + state.received) / size_total)
                        }).pipe(
                        node.fs.createWriteStream(tempfile)
                            .on('finish', function () {
                                let complete = false
                                if (savefile) {
                                    let stat = node.fs.statSync(tempfile)
                                    //console.log(
                                    //	`    ${package_name} | received: ${stat.size} , target: ${filesize}`
                                    //)
                                    if (stat.size == filesize)
                                        complete = true
                                }

                                if (complete) {
                                    size_received += filesize
                                    renamePair.push([
                                        package_name,
                                        tempfile,
                                        targetFile
                                    ])
                                    _g.log('[自动更新] ' + package_name + ' | 下载完成')
                                    deferred.resolve()
                                } else {
                                    _g.error('[自动更新] ' + package_name + ' | 下载出现错误')
                                    node.fs.unlink(tempfile, function (err) {
                                        deferred.resolve()
                                    })
                                }
                            }).on('error', function (err) {
                                err_handler(err, '写入文件')
                                _g.log('    流程结束')
                                //deferred.resolve()
                                deferred.reject(new Error(err))
                            })
                        )
                    return deferred.promise
                })
            })
            promise_chain_update = promise_chain_update
                .then(function () {
                    deferredUpdating.resolve()
                })
                .catch(function (err) {
                    deferredUpdating.reject(err)
                })
            return deferredUpdating.promise
        })

    // 全部下载完成		
    promise_chain = promise_chain
        .then(function () {
            if (size_total > size_received)
                return true
            _g.log('')
            _g.log('全部数据包下载完成')
            let deferred = Q.defer()
                , chain = Q.fcall(function () { })
            renamePair.forEach(function (pair) {
                chain = chain.then(function () {
                    let deferred = Q.defer()

                    node.fs.unlink(pair[2], function (err) {
                        if (err) {
                            err_handler(err, '删除原有数据包')
                            _g.log('    ' + pair[0] + ' | 删除原有数据包出错')
                            //deferred.resolve()
                        }//else{
                        node.fs.rename(
                            pair[1],
                            pair[2],
                            function (err) {
                                if (err) {
                                    err_handler(err, '重命名新数据包')
                                    _g.log('    ' + pair[0] + ' | 重命名新数据包出错')
                                } else {
                                    _g.log('    ' + pair[0] + ' | 更新完成')
                                }
                                deferred.resolve()
                            }
                        )
                        //}
                    })

                    return deferred.promise
                })
            })
            chain = chain.then(function () {
                deferred.resolve()
            })
                .catch(function (err) {
                    deferred.reject(err)
                })
            return deferred.promise
        })

        // 错误处理
        .then(function () {
            if (size_received && size_received >= size_total) {
                _g.log('')
                _g.log('更新完成')
                console.log('[自动更新] 完成')
                _updater.indicator(1)
            } else if (_updater.indicatorEl) {
                _g.log('')
                _g.log('自动更新失败, 结束流程')
                console.log('[自动更新] 失败')
                //_updater.update_indicator.removeClass('on')
                _updater.indicator(false)
                _g.badgeError('自动更新失败，请访问 fleet.moe 手动下载最新版本')
            }
        })
        .catch(function (err) {
            _g.log('自动更新失败')
            if (err == '数据包目录不存在, 不进行自动更新')
                console.warn(err)
            else {
                _g.error(err)
                _g.badgeError('自动更新失败，请访问 fleet.moe 手动下载最新版本')
            }
            if (_updater.indicatorEl)
                _updater.indicator(false)
        })
        .done(function () {
            //_g.log('自动更新过程初始化完毕')
            _g.log('')
            _g.log('========== 自动更新 - 结束 ==========')
            _g.log('')
        })
}


// 将更新流程加入页面序列
_frame.app_main.functions_on_ready.push(_updater.update)