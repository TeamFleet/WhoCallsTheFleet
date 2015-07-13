/* Extra properties & methods for Array
 *******************************************************************

Array.mergeFrom( array2 )
	merge array2 into Array
	returns merged Array
	unlike concat, this method will not create a new Array

 *******************************************************************
*/












Object.defineProperty(Array.prototype, 'mergeFrom', {
	enumerable:	false,
	//writable:	false,
	value: function( arr2 ){
		Array.prototype.push.apply(
			this,
			(arr2 instanceof Array) ? arr2 : [arr2]
		)
		return this
	}
})