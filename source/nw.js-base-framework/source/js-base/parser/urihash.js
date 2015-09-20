/* URI Hash 解析处理
 */

_g.parse_urihash = {
	is_init: false,
	keys: {},

	register: function( key, type, settings, handler ){
		settings = settings || {}
		settings['type'] = type
		_g.parse_urihash.keys[key] = settings

		if ($.isFunction(handler) && !this.hasOwnProperty('hashchange' + type)) {
			this['hashchange' + type] = handler;
		}
	},

	init: function(){
		if( _g.parse_urihash.is_init )
			return true

		$window.on({
			'hashchange.parser': function(){
				setTimeout(function(){
					//for( var k in _g.uriHashArr ){
					//	if( k in _g.parse_urihash.keys ){
					//		_g.parse_urihash['hashchange'+_g.parse_urihash.keys[k].type]( k )
					//	}
					//}
					for( var k in _g.parse_urihash.keys ){
						_g.parse_urihash['hashchange'+_g.parse_urihash.keys[k].type]( k )
					}
				}, 1)
			}
		})

		_g.parse_urihash.is_init = true
	},

	hashchange1: function( key ){
		var d = _g.parse_urihash.keys[key]
			,value = _g.uriHashArr[key]

		if( !value && d.func_hide ){
			d.func_hide()
			return false
		}

		if( d.check_showing && d.check_showing( value ) )
			return false

		if( !d.tempEl )
			d.tempEl = {}

		if( !d.cache )
			d.cache = {}

		var el = null
			,category = null

		if( d.tempEl[value] ){
			//d.cache[value].trigger('click', [{isInstant:isInstant}])
			d.tempEl[value].trigger('click')
			return true
		}

		try{
			if( d.cache[value] ){
				el = d.cache[value].el
				category = d.cache[value].category
			}else{
				el = _frame.dom.content.find('['+d.check_attr+'="'+value+'"]')

				// 未查到 el ，到 _frame.category.dom.ph 查询
				if( !el.length ){
					el = _frame.dom.hidden.find('['+d.check_attr+'="'+value+'"]')
					// 查询到结果
					if( el.length ){
						// 检查所在的 category
						var check = el
						while( !check.attr('acgdb-category') && check != _frame.dom.hidden ){
							check = check.parent()
						}
						//_frame.category.show_func( check.attr('acgdb-category') )
						if( check = check.attr('acgdb-category') ){
							d.cache[value] = {
								'el': 		el,
								'category': check
							}
							//_g.uriHash('mid', '')
							var _el = el
							setTimeout( function(){
								_g.uriHash('c', check)
								//_el.trigger('click', [{isInstant:isInstant}])
							}, _g.animate_duration_delay)
						}
						//el = null
					}
				}else{
					category = _frame.dom.content.children('.unit[acgdb-category].on').attr('acgdb-category')
					d.cache[value] = {
						'el': 		el,
						'category': category
					}
				}
			}

			if( el ){
				if( category && category != _frame.category.cur ){
					//_g.uriHash('mid', '')
					setTimeout( function(){
						_g.uriHash('c', category)
						el.trigger('click')
						//el.trigger('click', [{isInstant:isInstant}])
					}, _g.animate_duration_delay)
				}else{
					//el.trigger('click', [{isInstant:isInstant}])
					el.trigger('click')
				}
			}
		} catch (e) {
		}

		// 没有找到任何匹配，建立空链接元素，打开图片查看器
		if( (!el || !el.length) && _g.isEntityId(value) ){
			if( !d.tempEl[value] && d.func_createEl )
				d.tempEl[value] = d.func_createEl(value).appendTo( _frame.dom.hidden )

			//d.tempEl[value].trigger('click', [{isInstant:isInstant}])
			d.tempEl[value].trigger('click')
		}
	}
}