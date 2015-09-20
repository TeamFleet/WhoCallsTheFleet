// 打开新的node-webkit窗口
node.openWin = function( path, options ){
	node.gui.Window.open( path , $.extend( true, {
		"title": 			null,
		"width": 			Math.max(Math.floor(screen.availWidth * 0.85), 320),
		"height":			Math.max(Math.floor(screen.availHeight * 0.85), 320),
		"toolbar":			node.gui.App.manifest['window']['toolbar'],
		"icon": 			node.gui.App.manifest['window']['icon'],
		"position":			"center",
		"min_width":		320,
		"min_height":		320,
		"max_width":		null,
		"max_height":		null,
		"as_desktop":		false,
		"resizable":		node.gui.App.manifest['window']['resizable'],
		"always-on-top":	false,
		"fullscreen":		false,
		"show_in_taskbar":	node.gui.App.manifest['window']['show_in_taskbar'],
		"frame":			node.gui.App.manifest['window']['frame'],
		"show":				true,
		"kiosk":			false,
		"transparent":		node.gui.App.manifest['window']['transparent']
	}, options ) )
}










node.win.on('loaded', function(){
})







_frame.app_window = {
	//is_init: false,

	init: function(){
		if( _frame.app_window.is_init )
			return true

		if( $html.hasClass('app') ){
			// 恢复窗口尺寸和位置
				//if( !global.launcherOptions ){
					var windowX = parseInt(_config.get( 'windowX' ))
						,windowY = parseInt(_config.get( 'windowY' ))
					if( _config.get( 'windowMaximize' ) ){
						windowX = parseInt(_config.get( 'windowMaximizeX' )) || windowX
						windowY = parseInt(_config.get( 'windowMaximizeY' )) || windowY
						if( !isNaN(windowX) && !isNaN(windowY) ){
							node.win.moveTo( windowX, windowY )
						}
						node.win.maximize()
						$html.addClass('window-maxmize')
					}else{
						var windowWidth = Math.max(
											parseInt(
												_config.get( 'windowWidth' )
												|| ( global.launcherOptions && global.launcherOptions['window']
													? global.launcherOptions['window']['width']
													: node.gui.App.manifest['window']['width'])
											)
											,( global.launcherOptions && global.launcherOptions['window']
												? global.launcherOptions['window']['min_width']
												: node.gui.App.manifest['window']['min_width'])
										)
							,windowHeight = Math.max(
											parseInt(
												_config.get( 'windowHeight' )
												|| ( global.launcherOptions && global.launcherOptions['window']
													? global.launcherOptions['window']['height']
													: node.gui.App.manifest['window']['height'])
											)
											,( global.launcherOptions && global.launcherOptions['window']
												? global.launcherOptions['window']['min_height']
												: node.gui.App.manifest['window']['min_height'])
										)

						if( !isNaN(windowX) && !isNaN(windowY) ){
							node.win.moveTo( windowX, windowY )

							var availWidth 		= screen.availWidth + (screen.availLeft || 0)
								,availHeight 	= screen.availHeight + (screen.availTop || 0)

							// 保证窗口不超出屏幕
								if( windowX < 0 )
									windowX = 0
								if( windowWidth + windowX > availWidth )
									windowX = availWidth - windowWidth
								if( windowY < 0 )
									windowY = 0
								if( windowHeight + windowY > availHeight )
									windowY = availHeight - windowHeight

							node.win.moveTo( windowX, windowY )
						}

						if( !isNaN(windowWidth) && !isNaN(windowHeight) && windowWidth && windowHeight ){
							node.win.resizeTo( windowWidth, windowHeight )
						}
					}
				//}

			// 为窗口绑定事件
				node.win.on('blur', function(){
					$html.addClass('window-blured')
				})
				node.win.on('focus', function(){
					$html.removeClass('window-blured')
				})
				node.win.on('maximize', function(){
					$html.addClass('window-maxmize')
					_config.set( 'windowMaximize', true )
					_config.set( 'windowMaximizeX', screen.availLeft || 0 )
					_config.set( 'windowMaximizeY', screen.availTop || 0 )
					_config.set( 'windowX', null )
					_config.set( 'windowY', null )
					_config.set( 'windowWidth', null )
					_config.set( 'windowHeight', null )
				})
				node.win.on('unmaximize', function(){
					$html.removeClass('window-maxmize')
					_config.set( 'windowMaximize', null )
					_config.set( 'windowMaximizeX', null )
					_config.set( 'windowMaximizeY', null )
				})
				node.win.on('enter-fullscreen', function(){
					$html.addClass('window-fullscreen')
					_config.set( 'windowFullscreen', true )
				})
				node.win.on('leave-fullscreen', function(){
					$html.removeClass('window-fullscreen')
					_config.set( 'windowFullscreen', null )
				})
				node.win.on('move', function(x, y){
					_config.set( 'windowX', x )
					_config.set( 'windowY', y )
				})
				node.win.on('resize', function(width, height){
					_config.set( 'windowWidth', width )
					_config.set( 'windowHeight', height )
				})
				//node.win.on('close', function(){
				//	alert( 'dumpWindowStatus' )
				//	this.close(true)
				//})

			// 处理标题栏标题与按钮
				if( (!global.launcherOptions && node.gui.App.manifest['window']['frame']) || (global.launcherOptions && global.launcherOptions['window']['frame']) ){
					if( debugmode ){
						_frame.dom.debugbtns = $('<div class="debugbtns"/>').appendTo( $body )
						$('<button/>',{
								'html': 	'Console'
							}).on('click',function(){
								node.win.showDevTools()
							}).appendTo( _frame.dom.debugbtns )
						$('<button/>',{
								'html': 	'Reload'
							}).on('click',function(){
								location.reload()
							}).appendTo( _frame.dom.debugbtns )
					}
				}else{
					$html.addClass('window-noframe')
					var titlebar = $('#titlebar')
					if( !titlebar || !titlebar.length ){
						titlebar = $('<div id="titlebar"/>').appendTo($body)
						$('<strong/>').appendTo( titlebar )
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
							.appendTo( titlebar )
						$('<div id="window_border"/>').insertAfter( titlebar )
					}
					titlebar.children('strong').html(node.win.title)
					titlebar.find('.buttons .minimize').on('click', function(){
							node.win.minimize()
						})
					titlebar.find('.buttons .maximize').on('click', function(){
							if( $html.hasClass('window-maxmize') )
								node.win.restore()
							else
								node.win.maximize()
						})
					titlebar.find('.buttons .close').on('click', function(){
							node.win.close()
						})
					if( debugmode ){
						$('<button/>',{
								'class': 	'console',
								'html': 	'Console'
							}).on('click',function(){
								node.win.showDevTools()
							}).prependTo( titlebar.find('.buttons') )
						$('<button/>',{
								'class': 	'console',
								'html': 	'Reload'
							}).on('click',function(){
								location.reload()
							}).prependTo( titlebar.find('.buttons') )
					}
				}

			node.win.show()
			node.win.focus()
		}

		_frame.app_window.is_init = true
	}
}
