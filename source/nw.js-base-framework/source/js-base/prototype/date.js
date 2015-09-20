/*******************************************************************
 Function shortcut for DATE

 *******************************************************************

 DATE.format( *pattern*, *set* )
 	-> _g.getText( DATE, *pattern*, *set* )

_g.formatTime( DATE time, STRING pattern[, OBJECT settings] )
	根据pattern返回格式化的时间字符串
	严格遵循PHP规则：http://www.php.net/manual/en/function.date.php
	返回
		STRING time
	变量
		time				*必须*	DATE 		欲格式化的时间对象，或时间戳
		pattern 			*必须*	STRING 		格式化公式
		settings 			[可选] 	OBJECT 		选项参数
	可用的选项
		midnight_astoday: false 	BOLLEAN 	设定为 true 后，会将深夜视为前一天，1月2日03:00 这样的时间会被输出成 1月1日27:00
		output_timezone: null 		NUMBER 		时区，必须为整数，可正负。设定后，会将时间以目标时区当时的时间输出
	可用格式化公式
		%Y 					完整的年份 				2013
		%m 					月，两位数 				01, 02 ~ 12
		%n 					月 						1, 2 ~ 12
		%d 					日，两位数 				01, 02, ...
		%j 					日 		 				1, 2, ...
		%H 					时，24小时制，两位数 	01, 02, ...
		%G 					时，24小时制 			1, 2, ...
		%i 					分，两位数 				01, 02, ...
		%s 					秒，两位数 				01, 02, ...
		%l 					星期 					周一, 周二, ...
	示例
		_g.formatTime( 1380039114581 , "%Y-%m")
			-> 2013-09



 *******************************************************************/

Date.prototype.format = function( pattern, set ){
	return _g.formatTime( this, pattern, set )
};











_g.formatTime_string = {
	'zh_CN': {
		'Midnight': '深夜',

		'Sunday': 	'周日',
		'Monday': 	'周一',
		'Tuesday': 	'周二',
		'Wednesday': '周三',
		'Thursday': '周四',
		'Friday': 	'周五',
		'Saturday':	'周六'
	}
}
_g.formatTime_weekdaymappding = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday'
]
_g.formatTime = function( time, pattern, set ){
	/*
		set = {
			midnight_astoday: 0 / today || 1 / tomorrow
			output_timezone: -12, -11, ..., -1, 0, 1, ..., 11, 12
		}
	*/
	if( !time )
		return false

	set = set || {}
	pattern = pattern || '%Y年%m月%d日'

	if( typeof time != 'date' )
		time = new Date(time)

	var timestamp = time.valueOf()

	function _zero( num ){
		return num<10 ? '0'+(num) : num
	}

	// 计算时区差
	if( typeof set.output_timezone != 'undefined' ){
		timestamp+= (set.output_timezone + time.getTimezoneOffset() / 60) * 60 * 60 * 1000
		time = new Date(timestamp)
		//console.log( time.getTimezoneOffset() / 60, set.output_timezone + time.getTimezoneOffset() / 60 , time)
	}

	var _G 	= time.getHours()
		,_H = _zero(_G)

	if( set.midnight_astoday && (_G < 6 || _G == 24) ){
		// 如果设定深夜档视为转天
			// 小时+24
			// 时间减去一天再输出
		_G+= 24
		_H = _G
		timestamp-= 24 * 60 * 60 * 1000
		time = new Date(timestamp)
		pattern = pattern.replace(/\%midnight/g, 'Midnight'._(_g.formatTime_string) )
	}else{
		pattern = pattern.replace(/\%midnight/g, '' )
	}

	return (
			pattern
				.replace(/\%Y/g,time.getFullYear())

				.replace(/\%m/g, _zero(time.getMonth()+1) )
				.replace(/\%n/g,time.getMonth()+1)

				.replace(/\%d/g, _zero(time.getDate()) )
				.replace(/\%j/g,time.getDate())

				.replace(/\%G/g, _G )
				.replace(/\%H/g, _H )

				.replace(/\%i/g, _zero(time.getMinutes()) )

				.replace(/\%s/g, _zero(time.getSeconds()) )

				.replace(/\%l/g, _g.formatTime_weekdaymappding[time.getDay()]._(_g.formatTime_string) )
			)
};