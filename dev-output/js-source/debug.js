"use strict";

let debug = (function(debug){

$('#titlebar > .buttons').prepend( $('<button/>',{
		'class':	'console',
		'html':		'Debug'
	}).on('click', function(){
		debug.init().toggleClass('on')
	}) )

debug.init = function(){
	if( debug.container )
		return debug.container

	debug.container = $('<div class="debug"/>').appendTo(_frame.dom.main)
		.append($('<style/>').html(`
.debug{
	position:	absolute;
	top:		0;
	right:		0;
	bottom:		0;
	left:		0;
	z-index:	50;
	display:	none;
	background:	rgba(0,0,0,.85);
	padding:	20px 40px;
	overflow:	auto;
}
.debug.on{
	display:	block;
}
.debug h3 ~ h3{
	margin-top:	2em;
}
.debug button[type="button"]{
	display:	inline-block;
	padding:	0 .35em;
	border:		1px solid rgba(255,255,255,.35);
	background:	rgba(255,255,255,.25);
}
.debug .divider{
	display:	inline-block;
	width:		1px;
	height:		1.25em;
	vertical-align: middle;
	margin:		0 10px;
	background:	rgba(255,255,255,.25);
}
.debug .icons{
	overflow:	hidden;
}
.debug .icons dl{
	display:	inline-block;
	margin:		0 10px 10px 0;
	padding:	0 0 0 40px;
	float:		left;
	width:		175px;
	height:		45px;
	position:	relative;
}
.debug .icons dl dt:before{
	display:	block;
	position:	absolute;
	width:		32px;
	line-height:40px;
	padding:	0;
	font-size:	32px;
	top:		0;
	left:		0;
	text-align:	center;
}
.debug .icons dl dd{
	margin:		0;
	padding:	0;
	font-size:	12px;
	position:	absolute;
	top:		50%;
	transform:	translateY(-50%);
}
.debug textarea{
	background:	#000;
}
`))

	// updater progress indicator
		let updater, updaterBar;
		function updaterInit(){
			if( !updater ){
				updater = $('<button class="update_progress" icon="stairs-up" data-tip="检测到新版本<br>更新中..."/>')
												.prependTo( _frame.dom.globaloptions )
				updaterBar = $('<s/>').appendTo( updater )
			}
		}
		function updaterToggle(){
			updaterInit()
			updater.toggleClass('on')
		}
		function updaterSet(percentage){
			updaterInit()
			percentage = parseFloat(percentage) || 0
			updater.addClass('on')
			updaterBar.css('width', percentage + '%')
		}
		function updaterToggle_Complete(){
			updaterInit()
			updater.addClass('on').toggleClass('done')
		}
		debug.container
			.append($('<h3/>',{
				'html': 	'Updater Progress Indicator'
			}))
			.append($('<p/>')
				.append( $('<button/>',{
					'type':	'button',
					'html':	'Show/Hide'
				}).on('click', updaterToggle) )
				.append( $('<span/>',{
					'class':'divider'
				}) )
				.append( $('<span/>',{
					'html':	'Set percentage'
				}) )
				.append( $('<button/>',{
					'type':	'button',
					'html':	'0%'
				}).on('click', function(){updaterSet(0)}) )
				.append( $('<button/>',{
					'type':	'button',
					'html':	'25%'
				}).on('click', function(){updaterSet(25)}) )
				.append( $('<button/>',{
					'type':	'button',
					'html':	'50%'
				}).on('click', function(){updaterSet(50)}) )
				.append( $('<button/>',{
					'type':	'button',
					'html':	'98%'
				}).on('click', function(){updaterSet(98)}) )
				.append( $('<span/>',{
					'class':'divider'
				}) )
				.append( $('<button/>',{
					'type':	'button',
					'html':	'Toggle Complete'
				}).on('click', updaterToggle_Complete) )
			)

	// Icons
		debug.container
			.append($('<h3/>',{
				'html': 	'Icons'
			}))
			.append(
				debug._icons = $('<div class="icons"/>')
			)
		/*
		node.fs.readFile(node.path.join(_g.root, 'source', 'less-app', 'icons.less'), 'utf8', function(err, data){
			if( err || !data )
				return
			data = data.replace(/^\s*[\r\n]/gm, '')

			let searchRes
				,scrapePtrn = /\@iconcode\-([a-zA-Z0-9-_]+):[\t]*\"([^\"]+)\";/gi
				while( (searchRes = scrapePtrn.exec(data)) !== null ){
					try{
						if( searchRes && searchRes.length > 1 ){
							//console.log( searchRes[1], searchRes[2] )
							//$(`<dl><dt icon=${searchRes[1]}>${searchRes[1]}</dt><dd>${searchRes[2]}</dd></dl>`).appendTo(debug._icons)
							$(`<dl><dt icon=${searchRes[1]}></dt><dd>${searchRes[1]}</dd></dl>`).appendTo(debug._icons)
						}
					}catch(e){}
				}
		})
		*/
		let data = node.fs.readFileSync(node.path.join(_g.root, 'source', 'less-app', 'icons.less'), 'utf8')
			data = data.replace(/^\s*[\r\n]/gm, '')

			let searchRes
				,scrapePtrn = /\@iconcode\-([a-zA-Z0-9-_]+):[\t]*\"([^\"]+)\";/gi
				while( (searchRes = scrapePtrn.exec(data)) !== null ){
					try{
						if( searchRes && searchRes.length > 1 ){
							$(`<dl><dt icon=${searchRes[1]}></dt><dd>@iconcode-${searchRes[1]}</dd></dl>`).appendTo(debug._icons)
						}
					}catch(e){}
				}

	// Output Release Notes
		Q.fcall(function(){
			let deferred = Q.defer()
			function releaseNotesGet( _id ){
				let deferred = Q.defer()
				_db.updates.find({'_id':_id}).exec(function(err, docs){
					let content = '';
					if( docs && docs.length ){
						content+= docs[0].journal
					}
					deferred.resolve(content);
				})
				return deferred.promise
			}
			function releaseNotesToGitHub(){
				Q.fcall(function(){
					return releaseNotesGet( debug._releasenotesselect.val() )
				})
				.then(function(content){
					let searchRes
						,scrapePtrn = /\[\[([^\:]+)\:([0-9]+)(\:TEXT)?\]\]/gi
						,result = content
					while( (searchRes = scrapePtrn.exec(content)) !== null ){
						try{
							result = result.replace( searchRes[0], '`' + _tmpl['textlink_'+searchRes[1].toLowerCase()](searchRes[2], null, false).text() + '`' )
						}catch(e){}
					}
					debug._releasenotesresult.html(result)
				})
			}
			function releaseNotesToNGA(){
				Q.fcall(function(){
					return releaseNotesGet( debug._releasenotesselect.val() )
				})
				.then(function(content){
					let searchRes
						,scrapePtrn = /\[\[([^\:]+)\:([0-9]+)(\:TEXT)?\]\]/gi
						,result = markdown.toHTML( content )
					while( (searchRes = scrapePtrn.exec(content)) !== null ){
						try{
							var t = searchRes[1].toLowerCase()
							switch(t){
								case 'ship':		t = 'ships';		break;
								case 'equipment':	t = 'equipments';	break;
								case 'entity':		t = 'entities';		break;
							}
							result = result.replace( searchRes[0],
								'[url=http://fleet.diablohu.com/'+t+'/'+searchRes[2]+']'
								+ _tmpl['textlink_'+searchRes[1].toLowerCase()](searchRes[2], null, false).text()
								+ '[/url]'
							)
						}catch(e){}
					}
					content = result
					searchRes = null
					scrapePtrn = /\<p\>\<strong\>([^\<]+)\<\/strong\>\<\/p\>/gi
					while( (searchRes = scrapePtrn.exec(content)) !== null ){
						try{
							result = result.replace( searchRes[0], '[b]' + searchRes[1] + '[/b]' )
						}catch(e){}
					}
					content = result
					searchRes = null
					scrapePtrn = /\<li\>/gi
					while( (searchRes = scrapePtrn.exec(content)) !== null ){
						try{
							result = result.replace( searchRes[0], '[*]' )
						}catch(e){}
					}
					content = result
					searchRes = null
					scrapePtrn = /\<\/li\>/gi
					while( (searchRes = scrapePtrn.exec(content)) !== null ){
						try{
							result = result.replace( searchRes[0], '' )
						}catch(e){}
					}
					content = result
					searchRes = null
					scrapePtrn = /\<ul\>/gi
					while( (searchRes = scrapePtrn.exec(content)) !== null ){
						try{
							result = result.replace( searchRes[0], '[list]' )
						}catch(e){}
					}
					content = result
					searchRes = null
					scrapePtrn = /\<\/ul\>/gi
					while( (searchRes = scrapePtrn.exec(content)) !== null ){
						try{
							result = result.replace( searchRes[0], '[/list]' )
						}catch(e){}
					}
					debug._releasenotesresult.html(result)
				})
			}
			debug.container
				.append($('<h3/>',{
					'html': 	'Output Release Notes'
				}))
				.append(
					$('<p/>')
						.append(
							debug._releasenotesselect = $('<select/>')
						)
						.append( $('<span/>',{
							'class':'divider'
						}) )
						.append( $('<span/>',{
							'html':	'Target'
						}) )
						.append( $('<button/>',{
							'type':	'button',
							'html':	'GitHub'
						}).on('click', releaseNotesToGitHub) )
						.append( $('<button/>',{
							'type':	'button',
							'html':	'NGA'
						}).on('click', releaseNotesToNGA) )
				).append(
					$('<p/>')
						.append(
							debug._releasenotesresult = $('<textarea/>')
						)
				)
			_db.updates.find({$not:{'date':""}}).sort({'date': -1, 'version': -1}).exec(function(err, docs){
				docs.forEach(function(doc){
					$('<option/>',{
						'value':	doc._id,
						'html':		(doc.type != 'app' ? '['+doc.type+'] ' : '') + doc.version
					}).appendTo(debug._releasenotesselect)
				})
				deferred.resolve();
			})
			
			return deferred.promise
		})
	
	return debug.container
}

return debug

})({});
