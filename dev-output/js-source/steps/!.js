"use strict";

let dev_output_steps = []
	,dev_output_tmpl
	,dev_output_dir
	,dev_output_el_log
	,dev_output_only_assets = false
	,dev_output_log = function(msg){
		dev_output_el_log.prepend($('<div/>',{
			'html':	msg
		}))
		_g.log(msg)
	}

function dev_output_gen_title(){
	if( arguments && arguments.length )
		return Array.prototype.join.call(arguments, ' - ') + ' - 是谁呼叫舰队'
	return '是谁呼叫舰队'
}

function dev_output_filter(output, pagetype, name){
	let searchRes
		,scrapePtrn = /\.\.\/\.\.\/app\//gi
		while( (searchRes = scrapePtrn.exec(output)) !== null ){
			try{
				console.log(searchRes[0])
				output = output.replace( searchRes[0], '/!/assets/' )
			}catch(e){}
		}

	searchRes = null
	scrapePtrn = /\.\.\/app\/assets\//gi
		while( (searchRes = scrapePtrn.exec(output)) !== null ){
			try{
				output = output.replace( searchRes[0], '/!/assets/' )
			}catch(e){}
		}

	searchRes = null
	scrapePtrn = /\.\.\/pics\//gi
		while( (searchRes = scrapePtrn.exec(output)) !== null ){
			try{
				output = output.replace( searchRes[0], '/!/pics/' )
			}catch(e){}
		}

	searchRes = null
	scrapePtrn = new RegExp(_g.path.pics.ships.replace(/\\/g, '/').replace(/\./g, '\\.'), 'gi')
		while( (searchRes = scrapePtrn.exec(output)) !== null ){
			try{
				output = output.replace( searchRes[0], '/!/pics/ships/' )
			}catch(e){}
		}

	searchRes = null
	scrapePtrn = new RegExp(_g.path.pics.ships.replace(/\\/g, '\\\\').replace(/\./g, '\\.'), 'gi')
		while( (searchRes = scrapePtrn.exec(output)) !== null ){
			try{
				output = output.replace( searchRes[0], '/!/pics/ships/' )
			}catch(e){}
		}

	searchRes = null
	scrapePtrn = new RegExp(_g.path.pics.items.replace(/\\/g, '/').replace(/\./g, '\\.'), 'gi')
		while( (searchRes = scrapePtrn.exec(output)) !== null ){
			try{
				output = output.replace( searchRes[0], '/!/pics/items/' )
			}catch(e){}
		}

	searchRes = null
	scrapePtrn = new RegExp(_g.path.pics.items.replace(/\\/g, '\\\\').replace(/\./g, '\\.'), 'gi')
		while( (searchRes = scrapePtrn.exec(output)) !== null ){
			try{
				output = output.replace( searchRes[0], '/!/pics/items/' )
			}catch(e){}
		}

	searchRes = null
	scrapePtrn = /\?infos=([a-z]+)\&amp;id=([^\&^"^']+)/gi
		while( (searchRes = scrapePtrn.exec(output)) !== null ){
			try{
				var t = ''
				switch( searchRes[1] ){
					case 'ship': 		t = 'ships'; 		break;
					case 'equipment': 	t = 'equipments'; 	break;
					case 'entity':	 	t = 'entities'; 	break;
					default:
						t = searchRes[1]
						break;
				}
				output = output.replace( searchRes[0], '/' + t + '/' + searchRes[2] + '/' )
			}catch(e){}
		}

	searchRes = null
	scrapePtrn = /^\s*[\r\n]/gm
		while( (searchRes = scrapePtrn.exec(output)) !== null ){
			try{
				output = output.replace( searchRes[0], '' )
			}catch(e){}
		}
	
	switch(pagetype){
		case 'page':
			output = '<div class="page-container"'
						+ (name
							? ' page="' +name+ '"'
							: ''
						)
					+ '>'
					+ output
					+ '</div>'
			break;
		case 'info':
		case 'infos':
			output = '<div class="page-container infos"'
						+ (name
							? ' data-infostype="' +name+ '"'
							: ''
						)
					+ '>'
					+ '<div class="wrapper">'
					+ output
					+ '</div>'
					+ '</div>'
			break;
	}

	return output
}

function dev_output_form(){
	let el = {}
		,processing = false

	el.container = $('<div/>').css({
			'position':	'relative',
			'width':	'100%',
			'height':	'100%',
			'display':	'flex',
			'flex-flow':'column nowrap'
		}).append(
			el.form = $('<form/>').css({
				'display':	'flex',
				'flex-flow':'row nowrap',
				'flex':		'0 0 40px',
				'height':	'40px',
				'line-height':'30px',
				'font-size':'16px',
				'padding':	'0 0 10px 0',
				'border-bottom':'1px solid rgba(255, 255, 255, .35)',
				'margin':	'0 0 10px 0'
			}).on('submit', function(e){
				e.preventDefault()
				if( !processing ){
					dev_output_el_log.empty()
					processing = true
					dev_output_log('start')
					
					// 处理模板
						dev_output_tmpl = node.fs.readFileSync('dev-output/templates/base.html', 'utf-8')
						let searchRes
							,scrapePtrn = /\{\{[ ]*navContent[ ]*\}\}/gi
							,elNav = $('<div/>')
							,navlinks = $('<div class="pages"/>').appendTo( elNav )
							,globaloptions = $('<section class="options"/>').appendTo( elNav )
							,btnDonates = $('<a class="donate" icon="heart4" href="/donate/"/>').appendTo( globaloptions )
						_frame.app_main.nav.forEach(function(o, i){
							(function(page){
										return $('<a class="button" href="/'+page+'/"/>')
									})(o.page).html(o.title).appendTo( navlinks )
							if( o.state )
								_frame.dom.navs[o.page].attr('mod-state', o.state)
						})
					
						while( (searchRes = scrapePtrn.exec(dev_output_tmpl)) !== null ){
							try{
								dev_output_tmpl = dev_output_tmpl.replace( searchRes[0], elNav.html() )
							}catch(e){}
						}
					
					console.log(dev_output_tmpl)

					//Q.all(dev_output_steps).done(function(values){
					//	console.log(values)
					//	dev_output_log('end')
					//})
					dev_output_steps.push(function(){
						dev_output_log('end')
						processing = false
						dev_output_only_assets = false
						return true
					})
					var result = Q(dev_output_tmpl);
					dev_output_steps.forEach(function (f) {
						result = result.then(f);
					});
					return result;
				}
				return
			}).append(
				el.selector = $('<input type="file" nwdirectory/>').css({
					'display':	'none'
				}).on('change', function(){
					let val = el.selector.val() || ''
					el.input.val( val )
					Lockr.set('debug_output_directory', val)
					dev_output_dir = val
					el.selector.val('')
				})
			).append(
				el.input = $('<input type="text"/>').css({
					'display':	'block',
					'flex':		'1 0 auto',
					'height':	'30px',
					'line-height':'inherit',
					'font-size':'inherit',
					'margin-right':'10px'
				}).val( Lockr.get('debug_output_directory') || '' )
			).append(
				$('<button/>',{
					'type':		'button',
					'html':		'Browse'
				}).css({
					'flex':		'0 0 auto',
					'margin-right':'10px'
				}).on('click', function(){
					el.selector.click()
				})
			).append(
				$('<input/>',{
					'type':		'submit',
					'html':		'Export'
				}).css({
					'flex':		'0 0 auto',
					'margin-right':'10px'
				})
			).append(
				$('<button/>',{
					'type':		'button',
					'html':		'Export (Only Assets)'
				}).css({
					'flex':		'0 0 auto',
					'margin-right':'10px'
				}).on('click', function(){
					dev_output_only_assets = true
					el.form.submit()
				})
			)
		).append(
			dev_output_el_log = $('<div/>').css({
				'flex':		'1 0 auto',
				'line-height':'1.5em',
				'font-size':'13px',
				'overflow-y':'auto'
			})
		)
	
	dev_output_dir = el.input.val()
	
	return el.container
}