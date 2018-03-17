// 打开新的node-webkit窗口
node.openWin = function (path, options) {
    node.gui.Window.open(path, $.extend(true, {
        "title": null,
        "width": Math.max(Math.floor(screen.availWidth * 0.85), 320),
        "height": Math.max(Math.floor(screen.availHeight * 0.85), 320),
        "toolbar": node.gui.App.manifest['window']['toolbar'],
        "icon": node.gui.App.manifest['window']['icon'],
        "position": "center",
        "min_width": 320,
        "min_height": 320,
        "max_width": null,
        "max_height": null,
        "as_desktop": false,
        "resizable": node.gui.App.manifest['window']['resizable'],
        "always-on-top": false,
        "fullscreen": false,
        "show_in_taskbar": node.gui.App.manifest['window']['show_in_taskbar'],
        "frame": node.gui.App.manifest['window']['frame'],
        "show": true,
        "kiosk": false,
        "transparent": node.gui.App.manifest['window']['transparent']
    }, options))
}










//node.win.on('loaded', function(){
//})







_frame.app_window = {
    //is_init: false,

    bindEvents: function (thisWin) {
        thisWin = thisWin || self.win || node.win

        setTimeout(function () {
            thisWin.on('blur', function () {
                $html.addClass('window-blured')
            })
            thisWin.on('focus', function () {
                $html.removeClass('window-blured')
            })
            thisWin.on('maximize', function () {
                $html.addClass('window-maxmize')
                _config.set('windowMaximize', true)
                _config.set('windowMaximizeX', screen.availLeft || 0)
                _config.set('windowMaximizeY', screen.availTop || 0)
                _config.set('windowX', null)
                _config.set('windowY', null)
                _config.set('windowWidth', null)
                _config.set('windowHeight', null)
            })
            thisWin.on('unmaximize', function () {
                $html.removeClass('window-maxmize')
                _config.set('windowMaximize', null)
                _config.set('windowMaximizeX', null)
                _config.set('windowMaximizeY', null)
            })
            thisWin.on('enter-fullscreen', function () {
                $html.addClass('window-fullscreen')
                _config.set('windowFullscreen', true)
            })
            thisWin.on('leave-fullscreen', function () {
                $html.removeClass('window-fullscreen')
                _config.set('windowFullscreen', null)
            })
            thisWin.on('move', function (x, y) {
                _config.set('windowX', x)
                _config.set('windowY', y)
            })
            thisWin.on('resize', function (width, height) {
                _config.set('windowWidth', width)
                _config.set('windowHeight', height)
            })
            //win.on('close', function(){
            //	alert( 'dumpWindowStatus' )
            //	this.close(true)
            //})
            $window.on('resize', function () {
                _config.set('windowWidth', window.outerWidth)
                _config.set('windowHeight', window.outerHeight)
                // console.log(window.outerWidth, window.outerHeight)
            })
        }, 100)
    },

    init: function (thisWin) {
        if (_frame.app_window.is_init)
            return true

        thisWin = thisWin || self.win || node.win

        if ($html.hasClass('app')) {
            // 恢复窗口尺寸和位置
            //if( !global.launcherOptions ){
            var windowX = parseInt(_config.get('windowX'))
                , windowY = parseInt(_config.get('windowY'))
            if (_config.get('windowMaximize')) {
                windowX = parseInt(_config.get('windowMaximizeX')) || windowX
                windowY = parseInt(_config.get('windowMaximizeY')) || windowY
                if (!isNaN(windowX) && !isNaN(windowY)) {
                    thisWin.moveTo(windowX, windowY)
                }
                thisWin.maximize()
                $html.addClass('window-maxmize')
            } else {
                var windowWidth = Math.max(
                    parseInt(
                        _config.get('windowWidth')
                        || (launcherOptions && launcherOptions['window']
                            ? launcherOptions['window']['width']
                            : node.gui.App.manifest['window']['width'])
                    )
                    , (launcherOptions && launcherOptions['window'] && launcherOptions['window']['min_width']
                        ? launcherOptions['window']['min_width']
                        : node.gui.App.manifest['window']['min_width']) || 0
                )
                    , windowHeight = Math.max(
                        parseInt(
                            _config.get('windowHeight')
                            || (launcherOptions && launcherOptions['window']
                                ? launcherOptions['window']['height']
                                : node.gui.App.manifest['window']['height'])
                        )
                        , (launcherOptions && launcherOptions['window'] && launcherOptions['window']['min_height']
                            ? launcherOptions['window']['min_height']
                            : node.gui.App.manifest['window']['min_height']) || 0
                    )

                if (!isNaN(windowX) && !isNaN(windowY)) {
                    thisWin.moveTo(windowX, windowY)

                    var availWidth = screen.availWidth + (screen.availLeft || 0)
                        , availHeight = screen.availHeight + (screen.availTop || 0)

                    // 保证窗口不超出屏幕
                    if (windowX < 0)
                        windowX = 0
                    if (windowWidth + windowX > availWidth)
                        windowX = availWidth - windowWidth
                    if (windowY < 0)
                        windowY = 0
                    if (windowHeight + windowY > availHeight)
                        windowY = availHeight - windowHeight

                    thisWin.moveTo(windowX, windowY)
                }

                // console.log(_config.get('windowWidth'), _config.get('windowHeight'))
                // console.log(windowWidth, windowHeight)
                // alert(_config.get('windowWidth') + ' x ' + _config.get('windowHeight'))
                // alert(windowWidth + ' x ' + windowHeight)
                if (!isNaN(windowWidth) && !isNaN(windowHeight) && windowWidth && windowHeight) {
                    thisWin.resizeTo(Math.floor(windowWidth), Math.floor(windowHeight))
                    if (!windowX || !windowY) {
                        thisWin.moveTo(
                            Math.floor(screen.availLeft + (screen.availWidth - windowWidth) / 2),
                            Math.floor(screen.availTop + (screen.availHeight - windowHeight) / 2)
                        )
                    }
                }
            }
            //}

            // 为窗口绑定事件
            _frame.app_window.bindEvents()

            // 处理标题栏标题与按钮
            if ((!launcherOptions && node.gui.App.manifest['window']['frame']) || (launcherOptions && launcherOptions['window']['frame'])) {
                if (debugmode) {
                    _frame.dom.debugbtns = $('<div class="debugbtns"/>').appendTo($body)
                    $('<button/>', {
                        'html': 'Console'
                    }).on('click', function () {
                        thisWin.showDevTools()
                    }).appendTo(_frame.dom.debugbtns)
                    $('<button/>', {
                        'html': 'Reload'
                    }).on('click', function () {
                        location.reload()
                    }).appendTo(_frame.dom.debugbtns)
                }
            } else {
                $html.addClass('window-noframe')
                var titlebar = $('#titlebar')
                if (!titlebar || !titlebar.length) {
                    titlebar = $('<div id="titlebar"/>').appendTo($body)
                    $('<strong/>').appendTo(titlebar)
                    $('<div class="buttons"/>')
                        .append(
                        $('<button class="icon minimize"/>')
                        )
                        .append(
                        $('<button class="icon maximize"/>')
                        )
                        .append(
                        $('<button class="icon close"/>')
                        )
                        .appendTo(titlebar)
                    $('<div id="window_border"/>').insertAfter(titlebar)
                }
                titlebar.children('strong').html(thisWin.title)
                titlebar.find('.buttons .minimize').on('click', function () {
                    thisWin.minimize()
                })
                titlebar.find('.buttons .maximize').on('click', function () {
                    if ($html.hasClass('window-maxmize')) {
                        thisWin.restore()
                        $html.removeClass('window-maxmize')
                        _config.set('windowMaximize', null)
                        _config.set('windowMaximizeX', null)
                        _config.set('windowMaximizeY', null)
                    } else
                        thisWin.maximize()
                })
                titlebar.find('.buttons .close').on('click', function () {
                    thisWin.close()
                })
                if (debugmode) {
                    $('<button/>', {
                        'class': 'console',
                        'html': 'Console'
                    }).on('click', function () {
                        thisWin.showDevTools()
                    }).prependTo(titlebar.find('.buttons'))
                    $('<button/>', {
                        'class': 'console',
                        'html': 'Reload'
                    }).on('click', function () {
                        location.reload()
                    }).prependTo(titlebar.find('.buttons'))
                }
            }

            thisWin.show()
            thisWin.focus()
        }

        _frame.app_window.is_init = true
    }
}
