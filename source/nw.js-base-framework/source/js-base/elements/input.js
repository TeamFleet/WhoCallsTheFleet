/* Element: Input
*/

/*
_p.el.input = {
	index:	0,

	msg: {
		'text':		'请填写正确的内容',
		'email':	'请填写正确的电子邮件地址',
		'url':		'请填写正确的网址'
	},

	init_el: function(el){
		if( el.data('is_init_input_el') )
			return true
		
		
		// 如果元素没有id，则绑定新的id
		if( !el.attr('id') ){
			el.attr('id', 'input_global_'+_p.el.input.index)
			_p.el.input.index++
		}
		
		
		
		// 根据input类型执行相应函数

		var type	= el.attr('type')

		if( _p.el.input['type_'+type] )
			_p.el.input['type_'+type](el)
		
		// 自定义select样式
			_p.el.input.init_el_select_custom( el )

		// 处理textarea
			_p.el.input.init_el_textarea( el )

		el.data('is_init_input_el', true)
	},
	
	init_el_select_custom: function( el ){
		if( el[0].tagName == 'SELECT' && el.parent().hasClass('select') ){
			var select = $('<font/>').appendTo(el.parent())
			
			el.on({
				'change.custom_select': function(){
					var _el		= $(this)
						,val	= _el.val()
						,option	= _el.find('option[value="'+val+'"]')
					
					if( option.length ){
						val = option.html() || option.val()
					}else{
						if( !_el.find('option').eq(0).attr('value') )
							val = _el.find('option').eq(0).html()
					}
					
					select.html( val )
					
					//_el.blur();
				}
			})
			
			el.trigger('change.custom_select')
		}
	},

	init_el_textarea: function( el ){
		if( el[0].tagName == 'TEXTAREA' ){
			el.on({
				'change.contentcheck': function(){
					var el = $(this)
					if( el.val() ){
						el.addClass('has_content')
					}else{
						el.removeClass('has_content')
					}
				}
			})

			// 字数限制
			if( max = el.attr('max') ){
				max = parseInt(max)
				var tip = $('<em/>',{
					'class': 	'tip-count',
					'html': 	'<em>0</em>/'+max
				}).insertAfter(el)
				el.on({
					'input.checkcount': function(){
						var el = $(this)
							,count = el.val().length
						tip.find('em').text( count )
						if( count > max ){
							tip.addClass('exceed')
						}else{
							tip.removeClass('exceed')
						}
					}
				}).trigger('input.checkcount')
				if( bIE8 ){
					el.on({
						'keydown.checkcount': function(){
							$(this).trigger('input.checkcount')
						}
					})
				}
			}
		}
	},

	init: function(tar, els){
		tar = tar || $body;
		els = els || tar.find('input, select, textarea')

		els.each(function(){
			_p.el.input.init_el($(this))
		})
	},
	
	
	
	
	// 检查内容正确性
	check_valid: function(el){
		var type	= el.attr('type')
			,val	= el.val()
			,valid	= true
			,pattern= el.attr('pattern')
			,typetocheck = [
				'email',
				'url',
				'number'
			]
			,tocheck = type || pattern

		if( !tocheck || $.inArray(tocheck, typetocheck) < 0 )
			return true
		
		return _g.check_valid( val, tocheck )

		//switch( el.attr('type') ){
		//	case 'email':
		//		valid = /^[^\@]+\@[^\@]+\.[a-z]+$/i.test(val)
		//		break;
		//	case 'url':
		//		valid = /^.+\.[a-z]+$/i.test(val)
		//		break;
		//}
		
		// 正则
		//if( pattern ){
		//	pattern = new RegExp(pattern)
		//	valid = pattern.test(val)
		//}

		return valid
	},




	type_text: function(el){
		el.on({
			'change.contentcheck': function(){
				var el = $(this)
				if( el.val() ){
					el.addClass('has_content')
				}else{
					el.removeClass('has_content')
				}
			}
		})
	},




	// fix for TYPE
	type_checkbox: function(el){
		if( bIE8 ){
			// 如果当前为选中状态，添加样式
			if( el.prop('checked') )
				el.addClass('state-checked')
		}

		el.on({
			'change._blur_fix': function(){
				var el		= $(this)

				if( bIE8 ){
					if( el.prop('checked') ){
						el.addClass('state-checked')
							//.prop('checked', false)
					}else{
						el.removeClass('state-checked')
							//.prop('checked', true)
					}
				}

				el.trigger('blur')
			}
		})
	},
	
	
	
	type_date: function( el ){
		// 针对移动浏览器，不显示网站自定的日期选择器
		if( bMobile )
			return false
		
		var name		= el.attr('name') || null
			,id			= el.attr('id') || null
			,id_year	= id ? id + '_year' : null
			,id_month	= id ? id + '_month' : null
			,id_date	= id ? id + '_date' : null
			,outer		= $('<span/>',{
					'class':	'date_picker'
				}).insertBefore(el)

			,months = [
					'一月',
					'二月',
					'三月',
					'四月',
					'五月',
					'六月',
					'七月',
					'八月',
					'九月',
					'十月',
					'十一月',
					'十二月',
				]
			
			,year = $('<input/>',{
						'type':		'text',
						//'max':		4,
						'id':		id_year,
						'class':	'date_year'
					}).on({
						'input.datechange': function(){
							var cur_year	= $(this).val()
								,is_leap	= cur_year ? (( cur_year%4 == 0 && cur_year%100 != 0 ) || cur_year%400 == 0) : false
								,date_num	= [
										31,
										is_leap ? 29 : 28,
										31,
										30,
										31,
										30,
										31,
										31,
										30,
										31,
										30,
										31
									]

							month.val('').trigger('change.custom_select').trigger('change.date')
							//date.val('').empty().trigger('change.custom_select')
						},
						'keyup.datechange': function(){
							if( bIE8 )
								$(this).trigger('input.datechange')
						}
					}).appendTo(outer)
			
			,month = $('<select/>',{
						'class':	'date_month',
						'id':		id_month
					}).appendTo(outer)
			
			,date = $('<select/>',{
						'class':	'date_date',
						'id':		id_date
					}).appendTo(outer)

			
		el.addClass('none')
		
		$('<label/>',{
			'for':		id_year,
			'html':		'年'
		}).insertAfter(year)
		
		month.wrap('<span class="select date_month"/>')
			.on({
				'change.date': function(){
					var cur_year	= year.val()
						,cur_month	= parseInt($(this).val()) - 1
						,is_leap	= cur_year ? (( cur_year%4 == 0 && cur_year%100 != 0 ) || cur_year%400 == 0) : false
						,date_num	= [
								31,
								is_leap ? 29 : 28,
								31,
								30,
								31,
								30,
								31,
								31,
								30,
								31,
								30,
								31
							]
					
					date.val('').trigger('change.custom_select').empty()
					
					for( var i=0; i<date_num[cur_month]; i++ ){
						var num = parseInt(i)
							,num2 = num+1
						if( !num ){
							$('<option/>',{
								'value':	null,
								'html':		'--日--'
							}).appendTo(date)
						}
						$('<option/>',{
							'value':	num2 < 10 ? '0'+num2 : num2,
							'html':		(num+1)+'日'
						}).appendTo(date)
					}
					
					date.trigger('change.custom_select')
				}
			})

		for( var i in months ){
			var num = parseInt(i)
				,num2 = num+1
			
			if( !num ){
				$('<option/>',{
					'value':	null,
					'html':		'--月--'
				}).appendTo(month)
			}
			$('<option/>',{
				'value':	num2 < 10 ? '0'+num2 : num2,
				'html':		months[num]
			}).appendTo(month)
		}

		
		date.wrap('<span class="select date_date"/>')
		$('<option/>',{
			'value':	null,
			'html':		'--日--'
		}).appendTo(date)

		_p.el.input.init(outer)

	},




	type_file: function(el){
		//	<input id="option_dest" type="text" required />
		//	<button type="button" value="Browse...">浏览...</button>
		//	<input id="option_dest_selector" type="file" nwdirectory />
		if( el.prop('nwdirectory') ){
			var parent 	= el.parent()
				,text 	= parent.find('input[type="text"]')
				,button = parent.find('button').on('click', function(){
								el.trigger('click')
							})
			el.on({
				'click.reset': function(){
					el.val('')
				},
				'change.result': function(){
					text.val(el.val())
				}
			})
		}
	}
}
*/