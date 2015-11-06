//class PageFleets extends PAGE

_frame.app_main.page['fleets'] = {
	init: function( $page ){		
		this.object = new class extends PAGE{
			constructor( $page ){
				super( $page )
				//this.inited = false
				$page.on({
					'show': function(){
						if( this.inited ){
							/*
							$page.html( _frame.app_main.page_html['fleets'] )
							_p.initDOM($page)
							*/
							$page.children('.tablelist').data('tablelist').refresh()
						}
						this.inited = true
					}
				})
			}
		}( $page )
	}
}
