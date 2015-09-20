/*
 */
_p.el.flexgrid = {
	create: function(){
		var el = $('<div class="flexgrid"/>')
		_p.el.flexgrid.init_el(el)
		return el
	},

	init_el: function(el){
		if( el.data('is_init_flexgrid') )
			return true

		if( !el.data('append_before_this') ){
			el.data('append_before_this', $('<div class="unit"/>').appendTo(el))
			var i = 0
			while(i < 9){
				$('<div class="unit"/>').appendTo(el)
				i++
			}
		}

		el.data('is_init_flexgrid', true)
	},

	init: function(tar, els){
		tar = tar || $body;
		els = els || tar.find('.flexgrid')

		els.each(function(){
			_p.el.flexgrid.init_el($(this))
		})
	}
};




jQuery.fn.extend({
	appendDOM: function( el_to_append ){
		if( typeof el_to_append == 'function' )
			el_to_append = el_to_append()
			
		if( el_to_append )
			el_to_append.insertBefore( this.data('append_before_this') )
		return this
	}
})
