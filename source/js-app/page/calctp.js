_frame.app_main.page['calctp'] = {
	'init': function(page){
		page.find('form.tpcalculator').each(function(i, form){
			form = $(form)
			let resultA = form.find('.result_a')
				,resultS = form.find('.result_s')
			
			form.on('input', 'input', function(){
				form.trigger('submit')
			}).on('submit', function(e){
				e.preventDefault()

				let d = form.serializeObject()
					,rA = 0
					,rS = 0

				for(let i in d){
					let count = parseInt(d[i]) || 0;
					switch(i){
						case 'dd':
							rS+= 5 * count;
							break;
						case 'cl':
							rS+= 2 * count;
							break;
						case 'cav':
							rS+= 4 * count;
							break;
						case 'av':
							rS+= 9.5 * count;
							break;
						case 'lha':
							rS+= 12.25 * count;
							break;
						case 'ao':
							rS+= 14.75 * count;
							break;
						// canister
						case 'e75':
							rS+= 5 * count;
							break;
						case 'e68':
							rS+= 8 * count;
							break;
					}
				}
				rA = rS * 0.7
				resultA.html(Math.floor(rA))
				resultS.html(Math.floor(rS))
				
				/* old
				for(let i in d){
					let count = parseInt(d[i]) || 0;
					switch(i){
						case 'dd':
						case 'cl':
							rA+= 3 * count;
							rS+= 4.5 * count;
							break;
						case 'cav':
							rA+= 3 * count;
							rS+= 4 * count;
							break;
						case 'av':
							rA+= 8 * count;
							rS+= 10.5 * count;
							break;
						case 'lha':
						case 'ao':
							rA+= 10 * count;
							rS+= 13.5 * count;
							break;
						// canister
						case 'e75':
							rA+= 3.5 * count;
							rS+= 5 * count;
							break;
						case 'e68':
							rA+= 5.5 * count;
							rS+= 8.3333 * count;
							break;
					}
				}				
				resultA.html(Math.floor(rA))
				resultS.html(Math.floor(rS))
				*/
			})
		})
	}
};