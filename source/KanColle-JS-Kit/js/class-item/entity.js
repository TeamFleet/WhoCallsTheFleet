// Class for Entity (Person/Group, such as CVs, illustrators)

class Entity extends ItemBase{
	constructor(data) {
		super()
		$.extend(true, this, data)
	}
}