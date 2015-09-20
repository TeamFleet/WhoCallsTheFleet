/* page elements/components
*/


// indicate whether _p.init_document_ready() run
	//_p.is_init_document_ready = false

//
	_p.initDOM = function(tar){
		//tar = tar || ( _frame.dom.layout || ( $('#layout') || $body ) );
		tar = tar || ( _frame.dom.layout || ( _frame.dom.layout || $body ) );

		return tar.initAll()
	}
	_p.initAll = _p.initDOM
	$.fn.initDOM = function(){
		// call init() function in all _p.el
			for(var i in _p.el){
				if( _p.el[i].init )
					_p.el[i].init(this)
			}

		//_p.hashlinks(tar);
		return this
	};
	$.fn.initAll = $.fn.initDOM

//
	_p.init_document_ready = function(){
		if( !_p.is_init_document_ready ){
			_p.initDOM($body);
			_p.is_init_document_ready = true
		}
	}





// 获取页面描述信息
_p.getSummary=function(){
	var summary=$('#summary').text()||false;
	if(!summary&&$('head').find('meta[name=keywords]').length){
		summary=$('head').find('meta[name=Description]').attr('content');
		summary=summary.substr(0,summary.indexOf(' - ACGDB'))
	}
	return summary;
},





// 获取目标元素/元素组
_p.get_tar = function(tar, className, is_startwith){
	//tar = tar || $('body');
	tar = tar || ( _frame.dom.layout || ( $('#layout') || $body ) );

	if(className.substr(0,1) == '.')
		className = className.substr(1);
	if(tar.hasClass(className))
		return tar;
	if(is_startwith)
		return tar.find('[class^="'+className+'"]')
	return tar.find('.'+className)
};









// 处理URI Hash链接
_p.hashlinks = function(tar){
	tar = tar || $body;
	tar.find('a[href^=#]').each(function(){
		$(this)
			.off('click.hashlink')
			.on({
				'click.hashlink': function(){
					_g.goto_hash($(this).attr('href'));
					return false;
				}
			})
	});
}





// 返回目标元素的行数
_p.get_lines = function(el, el_lineheight){
	el_lineheight = el_lineheight || el
	return Math.max(
				1,
				Math.floor(
					Math.min(
						el.innerHeight(),
						el.height()
					) / parseFloat(el_lineheight.css('line-height'))
				)
			)
}





// 处理时间元素
_p.el.time = {
	init: function(tar){
		var els = _p.get_tar(tar, '.time');
		els.each(function(){
			var o = $(this),
				str = o.text()
				time = str ? _g.time(str) : null

			if(time){
				_g.posttime.push({
					time:	time,
					obj:	o
				})
			}
		});
		_g.timeDiffInterval()
	}
}
// 处理时间元素：秒
_p.el.timeSec = {
	init: function(tar){
		var els = _p.get_tar(tar, '.time-sec');
		els.each(function(){
			var o = $(this)

			if( o.data('acgdb-time-sec') )
				return o.data('acgdb-time-sec')

			var str = o.text()
				,time = /\s*([0-9]+)/.exec( str )
			if( time && time.length > 1 ){
				time = parseInt(time[1])
				var m 	= Math.floor( time / 60 )
					,s 	= time % 60
					,t 	= (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s + "'"
				o.text(t)
			}
			o.data('acgdb-time-sec', time)
		});
	}
}







// 移除空的textNode
_p.removeEmptyTextNode = function( el ){
	el = $(el)
	
	if( !el.length )
		return false
	
	el.contents()
		.filter(function() {
			return this.nodeType === 3; //Node.TEXT_NODE
		}).remove()
}
