_frame.app_main.page_init = function(page, $page){
	$page = $page || _frame.app_main.page_dom[page]
	if( _frame.app_main.page[page] && _frame.app_main.page[page].init )
		_frame.app_main.page[page].init($page)
	_p.initDOM($page)
}
