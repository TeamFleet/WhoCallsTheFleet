/*

static
	cur

	init()
		controls_init()
		get_default_imgs()
	change(index = random || first)
	controls_show()
	controls_hide()
	save(index = current)
	_get(index || object || name)
	add(new)
	delete(index)
		only work on custom img
	generate(index || object, blur || thumbnail)
	set(index || object, blur || thumbnail)

class
	name
	enable

	show()
	hide()
	toggle()
	save()
	delete()
	get blur()
	set blur()
	get thumbnail()
	set thumbnail()

*/

class BgImg{
	constructor(options){
		options = options || {}
		this.settings = $.extend(true, {}, ShareBar.defaults, options)
	}
}

BgImg.default = {
	enable: 	true
}

BgImg.obj = []
