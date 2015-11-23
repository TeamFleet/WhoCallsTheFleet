// advertisement

_frame.gg = function(){
	$.ajax({
		'url':		'http://fleet.diablohu.com/!/gg/',
		'method':	'get',
		'dataType':	'html',
		'success':	function(data){
			if( data ){
				let gg = $('<div class="gg"/>').html(data)
							.append(
								$('<button type="button" class="close"/>')
									.on('click', function(){
										_frame.dom.layout.css('padding-bottom', '')
											.removeClass('mod-gg')
									})
							)
				_frame.dom.layout.append(gg)
					.addClass('mod-gg')
					.css('padding-bottom', gg.height() + 1)
			}
		}
	})
};
