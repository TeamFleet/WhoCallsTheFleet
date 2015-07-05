var ITEM = function(){}

ITEM.prototype.getName = function(language){
	language = language || _g.lang
	return this['name']
			? (this['name'][language] || this['name'])
			: null
}