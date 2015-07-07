_frame.app_menu = {
	//is_init: false,

	init: function(){
		if( _frame.app_menu.is_init )
			return true

		// 创建各种菜单
			_frame.app_menu.menus = {}


		// 事件委托
			$body.on('contextmenu.contextmenu_image', 'img', function(e){
				var img = $(this)
				attr_contextmenu = img.attr('contextmenu')
				if( !attr_contextmenu || !attr_contextmenu == 'disabled' || attr_contextmenu == 'false' ){
					e.preventDefault()
					var menu = new node.gui.Menu()
					menu.append(new node.gui.MenuItem({
							'label': 	'保存图片',
							'click': function(){
								_g.file_save_as(
									node.path.normalize(img.attr('src')),
									img.data('filename') || ''
								)
							}
						}));
					menu.popup(e.clientX, e.clientY);
					return false
				}
			})

		_frame.app_menu.is_init = true
	}
}