_frame.app_main.page['arsenal'] = {}
_frame.app_main.page['arsenal'].init = function( page ){
	// tab radios
		//page.children('#arsenal_headtab-1').prop('checked', true)

	// Blinky Akashi - http://codepen.io/Diablohu/pen/RPjBgG
		let akashi = page.find('.akashi')
		akashi.attr({
				'animation':	Math.floor((Math.random() * 3) + 1)
			})
			.on(_g.event.animationiteration, function(){
				akashi.attr(
					'animation',
					Math.floor((Math.random() * 3) + 1)
				)
			})

	// contents
		this.elMain = page.children('.main')
		this.parse_weekday( this.elMain.children('.body-weekday') )
		this.parse_all( this.elMain.children('.body-all') )

		page.find('input[type="radio"]').on('change', function(){
				_frame.app_main.page['arsenal'].elMain.scrollTop(0)
			})
}




// 每日改修
	_frame.app_main.page['arsenal'].parse_weekday = function(body){
		let checkbox_showmeterials = body.find('#arsenal_weekday-showmeterials')
		checkbox_showmeterials.prop(
				'checked', Lockr.get('arsenal_weekday-showmeterials', true) ? true : false
			).on('change', function(){
				Lockr.set(
					'arsenal_weekday-showmeterials',
					checkbox_showmeterials.prop('checked') ? 1 : 0
				)
			})

		// 获取当前日本东京时间，选择星期
			let date = new Date()
			date.setTime( date.getTime() + date.getTimezoneOffset()*60*1000 )
			date.setTime( date.getTime() + 9*60*60*1000 )
			body.find('#arsenal_weekday-' + date.getDay()).prop('checked', true)

		return body
	}



// 明细表
	_frame.app_main.page['arsenal'].parse_all = function(body){
	}
