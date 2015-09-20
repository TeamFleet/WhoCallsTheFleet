/*************************************************
* Library for HTML Templates
**************************************************

_tmpl.export( value[, returnHTML] )
	RETURNS
		jQuery object or HTML string
	PARAMETERS
		JQUERY-OBJECT || HTML-STRING value
			The thing that will be exported.
		[optional] BOOLEAN returnHTML
			default: false
			Whether export HTML string or not.

**************************************************
 */




var _tmpl = {
	export: function( value, returnHTML ){
		if( value.attr && returnHTML )
			return value.prop('outerHTML')
		if( value.attr && !returnHTML )
			return value
		if( !value.attr && returnHTML )
			return value
		if( !value.attr && !returnHTML )
			return $(value)
	}
}