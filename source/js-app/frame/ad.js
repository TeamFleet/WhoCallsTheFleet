_frame.ad = function(){
	$.ajax({
		'url':		'http://fleet.diablohu.com/!/ad/',
		'method':	'get',
		'dataType':	'html',
		'success':	function(data){
			if( data ){
				let ad = $('<div class="ad"/>').html(data)
							.append(
								$('<button type="button" class="close"/>')
									.on('click', function(){
										_frame.dom.layout.css('padding-bottom', '')
											.removeClass('mod-ad')
									})
							)
				_frame.dom.layout.append(ad)
					.addClass('mod-ad')
					.css('padding-bottom', ad.height() + 1)
			}
		}
	})
};
