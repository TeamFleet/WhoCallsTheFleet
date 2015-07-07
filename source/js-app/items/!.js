class ITEM {
	constructor() {
	}
	
	static getName(language){
		language = language || _g.lang
		return this['name']
				? (this['name'][language] || this['name'])
				: null
	}
}