class ITEM {
	constructor() {
	}

	getName(language){
		language = language || _g.lang
		return this['name']
				? (this['name'][language] || this['name'])
				: null
	}
	
	get _name(){
		return this.getName()
	}
}