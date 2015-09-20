/*******************************************************************
 Function shortcut for OBJECT

 *******************************************************************

 Oebjet._size
 	-> 返回第一级项目数量




 *******************************************************************/












Object.defineProperty(Object.prototype, '_size', {
	enumerable:	false,
	//writable:	false,
	get: function(){
		var size = 0
		for( var i in this ){
			size++
		}
		return size
	}
})