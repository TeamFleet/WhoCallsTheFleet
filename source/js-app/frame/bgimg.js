/*

static
	cur
	list
	isInit: false

	init()
		controlsInit()
		get_default_imgs()
	_get(index || object || name)
	change(index = random || first)
	save(index = current)
	add(new)
	delete(index)
		only work on custom img
	generate(index || object, blur || thumbnail)
	set(index || object, blur || thumbnail)
	controlsShow()
	controlsHide()

class
	name
	isEnable
	isDefault

	show()
	hide()
	toggle()
	save()
	delete()
	get blur()
	set blur()
	get thumbnail()
	set thumbnail()

to modify
	_frame.app_main.bgimgs
	_frame.app_main.change_bgimg
	_frame.app_main.cur_bgimg_el
	_frame.app_main.change_bgimg_oldEl
	_frame.app_main.bgimg_path
	_frame.app_main.change_bgimg_fadein
	
	_frame.dom.bgimg
	
	_frame.app_main.only_bg_on
	_frame.app_main.only_bg_off
	_frame.app_main.only_bg_toggle
	_frame.dom.bg_controls
	_frame.app_main.only_bg

*/

class BgImg{
	constructor(options){
		options = options || {}
		this.settings = $.extend(true, {}, ShareBar.defaults, options)
	}
}





BgImg.default = {
	isEnable: 	true,
	isDefault:	true
};
BgImg.list = [];





// controls
	BgImg.controlsInit = function(){
		
	};
	BgImg.controlsShow = function(){
		
	};
	BgImg.controlsHide = function(){
		
	};
