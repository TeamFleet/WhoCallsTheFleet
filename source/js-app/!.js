"use strict";

// Global Variables
	_g.animate_duration_delay = 320;
	_g.inputIndex = 0;
	_g.lang = 'zh_cn';
	_g.joint = '・';
	_g.isClient = typeof node == 'undefined' && typeof nw == 'undefined' ? false : true;
	_g.defaultHqLv = 90;
	
	function eventName(event, name){
		name = name ? ('.' + name) : ''
		if( _g.event[event] )
			return _g.event[event].split(' ').map(function(value){
				return value + name
			}).join(' ')
		return event + name
	}

	_g.updateDefaultHqLv = function(val){
		val = parseInt(val) || _g.defaultHqLv
		if( val <= 0 )
			val = _g.defaultHqLv
		if( val != Lockr.get('hqLvDefault', _g.defaultHqLv) ){
			Lockr.set('hqLvDefault', val)
			clearTimeout(this.delay_updateDefaultHqLv)
			this.delay_updateDefaultHqLv = setTimeout(function(){
				$body.trigger('update_defaultHqLv', [val])
				clearTimeout(this.delay_updateDefaultHqLv)
				this.delay_updateDefaultHqLv = null
			}.bind(this), 200)
		}
	};



// locale object
	let _l = {};



// String
	String.prototype.printf = function() {
		if( typeof vsprintf != 'undefined' )
			return vsprintf(this, Array.prototype.slice.call(arguments));
		return this;
	};
