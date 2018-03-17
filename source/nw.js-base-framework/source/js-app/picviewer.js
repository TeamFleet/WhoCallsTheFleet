node.require('fs')

_frame.app_picviewer = {
	// is_init: false
	btn_fullview: null,
	input_saveas: null,

	toggle_fullview: function(){
		$('#picviewer').toggleClass('fullview')
		_frame.app_picviewer.btn_fullview.html(
				$('#picviewer').hasClass('fullview')
					? '适应窗口'
					: '原尺寸显示'
			)
	},

	init: function(){
		if( _frame.app_picviewer.is_init )
			return true

		var image = _g.uriSearch('pic')
			,toolbar = $('#picviewer-toolbar')
			,filename = image.split('/')

		filename = filename[filename.length - 1]

		// 插入图片
			if( image ){
				$('<img/>',{
					'src': image
				}).appendTo( $('#picviewer').addClass('fullview') )
			}

		// 创建工具栏按钮
			_frame.app_picviewer.btn_fullview = $('<button/>',{
					'type': 	'button',
					'html': 	'适应窗口'
				}).on({
					'click': function(){
						_frame.app_picviewer.toggle_fullview()
					}
				}).appendTo( toolbar )

			_frame.app_picviewer.input_saveas = $('<input/>',{
					'type': 	'file',
					'nwsaveas': decodeURI(filename)
				}).on({
					'change': function(){
						var el = $(this)
							,dest = el.val()
						if( dest ){
							node.fs.readFile(image.substr(1), function (err, data) {
								if (err) throw err;
								node.fs.writeFile(dest, data);
							});
							el.val('')
						}
					}
				}).appendTo( _frame.dom.hidden )
			$('<button/>',{
					'type': 	'button',
					'html': 	'保存图片'
				}).on({
					'click': function(){
						_frame.app_picviewer.input_saveas.trigger('click')
					}
				}).appendTo( toolbar )

		_frame.app_picviewer.is_init = true
	}
}