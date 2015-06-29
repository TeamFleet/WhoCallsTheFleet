_frame.app_main.page['arsenal'] = {}
_frame.app_main.page['arsenal'].init = function( page ){
	// tab radios
		$('<input/>',{
			'id':	'arsenal_headtab-1',
			'type':	'radio',
			'name':	'arsenal_headtab'
		}).prop('checked', true).appendTo(page)
		$('<input/>',{
			'id':	'arsenal_headtab-2',
			'type':	'radio',
			'name':	'arsenal_headtab'
		}).appendTo(page)

	// tabs
		var tabs = $('<div/>',{
				'class':	'tabs',
				'html':		'<label for="arsenal_headtab-1" class="tab">'
								+ '每日改修'
							+ '</label>'
							+ '<label for="arsenal_headtab-2" class="tab">'
								+ '明细表'
							+ '</label>'
			}).appendTo(page)
		// Blinky Akashi - http://codepen.io/Diablohu/pen/RPjBgG
			var akashi = $('<span/>',{
								'animation':	Math.floor((Math.random() * 3) + 1)
							})
							.on('animationiteration, webkitAnimationIteration', function(){
								_g.log('animationiteration')
								akashi.attr(
									'animation',
									Math.floor((Math.random() * 3) + 1)
								)
							})
							.appendTo($('<div class="akashi"/>').prependTo(tabs))

	// contens
		$('<div class="main"/>')
			.append(this.init_weekday())
			.append(this.init_all())
			.appendTo(page)
}


_frame.app_main.page['arsenal'].init_weekday = function(){
	var body = $('<div class="body body-1"/>')

	$('<h2/>',{
		'html':	'WEEKDAY'
	}).appendTo(body)

	return body
}


_frame.app_main.page['arsenal'].init_all = function(){
	var body = $('<div class="body body-2"/>')

	$('<h2/>',{
		'html':	'ALL'
	}).appendTo(body)

	return body
}
