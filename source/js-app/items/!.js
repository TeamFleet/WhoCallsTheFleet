var ITEM = function(){}

ITEM.prototype.getName = function(language){
	return this['name']
			? (this['name'][language] || this['name'])
			: null
}