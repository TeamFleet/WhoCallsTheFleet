// Entities

class TablelistEntities extends Tablelist{
	constructor( container, options ){
		super( container, options )

		// 标记全局载入状态
			_frame.app_main.loading.push('tablelist_'+this._index)
			_frame.app_main.is_loaded = false
		
		if( container.children('.tablelist-list').length ){
			this.init_parse()
		}else if( this.init_new ){
			this.init_new()
		}
	}
	
	
	
	
	
	
	
	
	
	init_parse(){
		this.generated = true
		_frame.app_main.loaded('tablelist_'+this._index, true)
	}
}
