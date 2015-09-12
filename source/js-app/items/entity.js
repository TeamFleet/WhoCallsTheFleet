class Entity extends ITEM{
	constructor(data) {
		super()
		$.extend(true, this, data)
	}
}