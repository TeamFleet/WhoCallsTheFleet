"use strict";

let debug = (function(debug){

$('#titlebar > .buttons').prepend( $('<button/>',{
		'class':	'console',
		'html':		'Debug'
	}).on('click', function(){
		debug.container.toggleClass('on')
	}) )

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
}
.debug.on{
	display:	block;
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

return debug

})({});
