// advertisement

_frame.gg = function(){
	$.ajax({
		'url':		'http://fleet.diablohu.com/!/g/',
		'method':	'get',
		'dataType':	'html',
		'success':	function(data){
			if( data ){
				_frame.dom.layout.append(
					$('<div class="g"/>').html(data)
							.append(
								$('<button type="button" class="close"/>')
									.on('click', function(){
										_frame.dom.layout.css('padding-bottom', '')
											.removeClass('mod-g')
									})
							)
				)
					.addClass('mod-g')
					//.css('padding-bottom', gg.height() + 1)
			}
		}
	})
};
