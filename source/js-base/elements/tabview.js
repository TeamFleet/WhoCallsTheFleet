/*
 */

_p.el.tabview = {
	dom: {},
	index: 0,

	init_el: function(el){
		if( el.data('is_init_tabview') )
			return true

		var tabid = 'tabv' + _p.el.tabview.index
			,tabc = el.children('section')
			,tabs = $('<header/>').prependTo( el )

		_p.el.tabview.dom[tabid] = el

		tabc.each(function(index){
			var _id = '_tabview-'+tabid+'-'+(index+1)
				,_content = $(this)
				,title = _content.data('tabname')
			// 创建radio input
				$('<input />',{
						'type': 	'radio',
						'name': 	'_tabview-'+tabid,
						'id': 		_id,
						'value': 	(index + 1),
						'class': 	'tabview-switch'
					})
					.data('tabview-content', _content)
					.prop('checked', (index == 0))
					.on('change', function(){
						if($(this).prop('checked')){
							$(this).data('tabview-content').trigger('tabview-show')
							_g.uriHash('tv_'+tabid, (index+1))
						}else{
							$(this).data('tabview-content').trigger('tabview-hide')
						}
					})
					.prependTo( el )
			// 创建各tabview-tabs button
				$('<label/>',{
						'for': 		_id,
						'html': 	title
					}).appendTo( tabs )

			if( !index )
				_content.trigger('tabview-show')
		})

		_p.el.tabview.index++

		$window.on('hashchange.tabview-'+tabid, function(){
			var hash = _g.uriHash('tv_'+tabid)
			if( hash ){
				_p.el.tabview.dom[tabid].children('input[type="radio"].tabview-switch[value="'+hash+'"]').prop('checked')
			}
		})

		el.data('is_init_tabview', true)
	},
	
	
	
	
	
	
	
	

	init: function(tar, els){
		tar = tar || $body;
		els = els || tar.find('.tabview')

		els.each(function(){
			_p.el.tabview.init_el($(this))
		})
	}
};