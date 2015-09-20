/*******************************************************************
 Function shortcut for STRING

 *******************************************************************
_g.getText( STRING text, OBJECT table [, STRING locale] )
	获取翻译文本，如果查询未果，则返回原值
	返回
		STRING text_translated
	变量
		text				*必须*	STRING 		欲查询的值
		table 				*必须*	OBJECT 		查询的表
		locale 				[可选] 	STRING 		目标语言，如果没有给定，则默认使用当前语言
	快捷方式
		STRING._( OBJECT table [, STRING locale] )
		STRING.getText( OBJECT table [, STRING locale] )


 STRING.getText( *table*, *locale* )
 STRING._( *table*, *locale* )
 	-> _g.getText( STRING, *table*, *locale*, true )



 STRING.hashCode()
 	-> _g.hashCode( STRING )



 STRING.filter()
 	-> _g.stringFilter( STRING )



 STRING.filterCensored()
 	-> _g.stringFilterCensored( STRING )




 *******************************************************************/












String.prototype.getText = function( table, locale ){
	return _g.getText( this, table, locale, true )
};
String.prototype._ = String.prototype.getText






// 获取翻译文本
_g.getText = function( text, table, locale, isString ){
	if( !text || !table )
		return text

	function _r( t ){
		if( typeof t == 'object' && t.length )
			return t[0]
		return t
	}

	locale = locale || _g.lang

	var result = null

	if( table[text] ){
		if( typeof table[text] == 'string' )
			return _r(table[text])
		if( table[text][locale] )
			return _r(table[text][locale])
	}

	if( table[locale] ){
		if( table[locale][text] )
			return _r(table[locale][text])
	}

	if( typeof text != 'string' && isString ){
		_t = ''
		for( i=0; i<text.length; i++ )
			_t+= text[i]
		text = _t
	}

	return _r(text)
}

// hashCode
_g.hashCode = function( t ){
	var length = 5
	//var length = 10
		//,t = this
	t = encodeURIComponent(t)
		//,t = escape(this)
	
	try{
		return t.split("").reduce(function(a,b){a=((a<<length)-a)+b.charCodeAt(0);return a&a},0).toString(16);
	}catch(e){
		var hash = 0, i, char;
		if (t.length == 0) return hash;
		for (i = 0, l = t.length; i < l; i++) {
			char  = t.charCodeAt(i);
			hash  = ((hash<<length)-hash)+char;
			hash |= 0; // Convert to 32bit integer
		}
		return hash.toString(16);
	}
};
String.prototype.hashCode = function(){
	return _g.hashCode( this )
};








String.prototype.filter = function(){
	return _g.stringFilter( this )
};
	String.prototype.filterCensored = function(){
		return _g.stringFilterCensored( this )
	}









String.prototype.escape = function() {
    return $('<div />').text(this).html();
};