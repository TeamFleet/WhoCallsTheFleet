_frame.app_main.page['calctp'] = {
	'init': function(page){
		page.find('form.tpcalculator').each(function(i, form){
			form = $(form)
			let resultA = form.find('.result_a')
				,resultS = form.find('.result_s')
			
			form.on('input', 'input', function(){
				form.trigger('submit')
			}).on('submit', function(e){
				let d = form.serializeObject()
					,r = 0
				
				for(let i in d){
					let count = parseInt(d[i]) || 0;
					switch(i){
						case 'dd':
						case 'cl':
						case 'cav':
							r+= 3 * count;
							break;
						case 'av':
							r+= 8 * count;
							break;
						case 'lha':
						case 'ao':
							r+= 10 * count;
							break;
						case 'e75':
							r+= 3.5 * count;
							break;
						case 'e68':
							r+= 5.5 * count;
							break;
					}
				}
				e.preventDefault()
				resultA.html(Math.floor(r))
				resultS.html(Math.floor(r * 1.45))
			})
		})
	}
};