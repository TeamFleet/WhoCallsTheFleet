/*
 */

_p.el.table = {
	dom: {},
	// is_init: false,


	/*
	hover_column_getTable: function( td ){
		function _check( el ){
			if( el[0].tagName.toLowerCase() == 'table' )
				return el
			
			return _check( el.parent() )
		}
		return _check( td.parent() )
	},
	hover_column_getTr: function( td ){
		function _check( el ){
			if( el[0].tagName.toLowerCase() == 'tr' )
				return el
			
			return _check( el.parent() )
		}
		return _check( td.parent() )
	},*/
	hover_column_getTable: function( path ){
		function _check( index ){
			if( path[index].tagName.toLowerCase() == 'table' )
				return $(path[index])
			
			return _check( index + 1 )
		}
		return _check( 0 )
	},
	hover_column_getTr: function( path ){
		function _check( index ){
			if( path[index].tagName.toLowerCase() == 'tr' )
				return $(path[index])
			
			return _check( index + 1 )
		}
		return _check( 0 )
	},
	hover_column_mouseenter: function( table, td_index ){
		table//.attr( 'td-nth-hovered', parseInt(td_index) + 1 )
			.find('tbody tr td:nth-of-type(' + ( parseInt(td_index) + 1 ) + ')').addClass('state-hover-column')
	},
	hover_column_mouseleave: function( table, td_index ){
		table//.attr( 'td-nth-hovered', '' )
			.find('tbody tr td:nth-of-type(' + ( parseInt(td_index) + 1 ) + ')').removeClass('state-hover-column')
	},



	init_el: function(el){
		if( el.data('is_init_table') )
			return true


		el.data('is_init_table', true)
	},
	
	
	
	
	
	
	
	

	init: function(tar, els){
		tar = tar || $body;
		els = els || tar.find('table')

		if( !_p.el.table.is_init ){
			/*
			$html.on('mouseenter.tablehover-column', 'body.hover table.hashover-column tbody td', function(){
				//$(this).addClass('state-hover-column')
				var td = $(this).on('mouseleave.tablehover-column', function(){
							_p.el.table.hover_column_mouseleave( table, index )
							$(this).off('mouseleave.tablehover-column')
						})
					,table = _p.el.table.hover_column_getTable( td )
					,tr = _p.el.table.hover_column_getTr( td )
					// index starts from 0
					,index = $.inArray( td[0], tr.find('td') )

				_p.el.table.hover_column_mouseenter( table, index )
			})
			*/
			$html.on('mouseenter.tablehover-column', 'body.hover table.hashover-column tbody td', function(e){
				var path = e.originalEvent.path
					,td = $(this).on('mouseleave.tablehover-column', function(){
							_p.el.table.hover_column_mouseleave( table, index )
							td.off('mouseleave.tablehover-column')
						})
					,table = _p.el.table.hover_column_getTable( path )
					,tr = _p.el.table.hover_column_getTr( path )
					// index starts from 0
					,index = $.inArray( td[0], tr.find('td') )
				_p.el.table.hover_column_mouseenter( table, index )
			})
			_p.el.table.is_init = true
		}

		els.each(function(){
			_p.el.table.init_el($(this))
		})
	}
};