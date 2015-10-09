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
							.on('animationiteration webkitAnimationIteration', function(){
								akashi.attr(
									'animation',
									Math.floor((Math.random() * 3) + 1)
								)
							})
							.appendTo($('<div class="akashi"/>').prependTo(tabs))

	// contents
		this.elMain = $('<div class="main"/>')
			.append(this.init_weekday())
			.append(this.init_all())
			.appendTo(page)
			
		page.find('input[type="radio"]').on('change', function(){
				_frame.app_main.page['arsenal'].elMain.scrollTop(0)
			})
}




// 每日改修
	_frame.app_main.page['arsenal'].init_weekday = function(){
		var body = $('<div class="body body-1 body-weekday"/>')
			,weekday = $('<div class="weekday"/>').appendTo(body)
			,weekday_select = $('<div/>').html('<span>星期</span>').appendTo(weekday)
			,radios = []
			,checkbox_showmeterials = $('<input/>',{
						'type':	'checkbox',
						'id': 	'arsenal_weekday-showmeterials'
					}).prop(
						'checked', Lockr.get('arsenal_weekday-showmeterials', true) ? true : false
					).on('change', function(){
						Lockr.set(
							'arsenal_weekday-showmeterials',
							checkbox_showmeterials.prop('checked') ? 1 : 0
						)
					}).prependTo(body)

		for(var i=0; i<7; i++){
			var text

			switch(i){
				case 0: text = '日'; break;
				case 1: text = '一'; break;
				case 2: text = '二'; break;
				case 3: text = '三'; break;
				case 4: text = '四'; break;
				case 5: text = '五'; break;
				case 6: text = '六'; break;
			}

			radios[i] = $('<input/>',{
					'id':	'arsenal_weekday-' + i,
					'type':	'radio',
					'name':	'arsenal_weekday'
				}).prependTo(body)

			$('<label/>',{
					'html':	text,
					'for':	'arsenal_weekday-' + i
				}).appendTo(weekday_select)

			$('<div class="content content-'+i+'"/>')
				.append(
					_p.el.flexgrid.create()
						.appendDOM(function(){
							var o = $()
							for(var j in _g.data.arsenal_weekday[i]){
								var d = _g.data.arsenal_weekday[i][j]
								o = o.add(
									_tmpl.improvement(d[0], d[1], d[2])
										.addClass('unit')
								)
							}
							return o
						})
				)
				.appendTo(body)
		}

		$('<span/>',{
			'html':	'<b>*</b>日本东京时间'
		}).appendTo(weekday)

		$('<label/>',{
			'for': 	'arsenal_weekday-showmeterials',
			'html': '显示资源消耗'
		}).appendTo(weekday)

		// 获取当前日本东京时间，选择星期
			var date = new Date()
			date.setTime( date.getTime() + date.getTimezoneOffset()*60*1000 )
			date.setTime( date.getTime() + 9*60*60*1000 )
			radios[date.getDay()].prop('checked', true)

		return body
	}



// 明细表
	_frame.app_main.page['arsenal'].init_all = function(){
		var body = $('<div class="body body-2 body-all"/>')

		_g.data.arsenal_all.forEach(function(currentValue){
			_tmpl.improvement_detail(currentValue).appendTo(body)
		})

		return body
	}
