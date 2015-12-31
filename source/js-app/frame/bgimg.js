/*

static
	cur
	list
	isInit: false

	init()
		controlsInit()
		getDefaultImgs()
	getObj(index || object || name)
	getPath(index || object, type)
	change(index = random || first)
	save(index = current)
	add()
		upload()
	delete(index)
		only work on custom img
	generate(index || object, blur || thumbnail)
	set(index || object, blur || thumbnail, canvas)
	controlsShow()
	controlsHide()
	controlsToggle()

class
	name
	isEnable
	isDefault

	show()
	hide()
	toggle()
	save()
	add()
	delete()
	get index()
	get els()
	get elThumbnail()
	get path()
	get blur()
	get thumbnail()

*/

class BgImg{
	constructor(options){
		options = options || {}
		$.extend(true, this, BgImg.defaults, options)
	}
	
	show(){
		BgImg.change(this)
	}
	
	save(){
		BgImg.save(this)
	}
	
	add(){
		if( this.isDefault ){
			if( BgImg.controlsEls.listDefault )
				this.elThumbnail.appendTo( BgImg.controlsEls.listDefault )
		}else{
			if( BgImg.controlsEls.listCustomAdd )
				this.elThumbnail.insertBefore( BgImg.controlsEls.listCustomAdd )
		}
		if( BgImg.cur && BgImg.cur.name === this.name )
			this.elThumbnail.addClass('on')
	}
	
	get index(){
		let i = -1
		BgImg.list.some(function(o, index){
			if( o.name === this.name )
				i = index
			return o.name === this.name
		}.bind(this))
		return i
	}
	
	get els(){
		if( !this._els ){
			this._els = $('<s class="bgimg"/>').css('background-image','url(' + this.path + ')')
					.add( $('<s class="bgimg"/>').css('background-image','url(' + this.blur + ')') )
					.add( $('<s class="bgimg"/>').css('background-image','url(' + this.blur + ')') )
					.add( $('<s class="bgimg"/>').css('background-image','url(' + this.blur + ')') )
		}
		return this._els
	}
	
	get elThumbnail(){
		if( !this._elThumbnail ){
			this._elThumbnail = $('<dd/>')
				.on('click', function(){
					BgImg.change(this)
				}.bind(this))
				.append(
					$('<s/>').css('background-image','url(' + this.thumbnail + ')')
				)
		}
		return this._elThumbnail
	}
	
	get path(){
		if( !this._path )
			this._path = BgImg.getPath(this)
		return this._path
	}
	
	get blur(){
		if( !this._blur )
			this._blur = BgImg.getPath(this, 'blured')
		return this._blur
	}
	
	get thumbnail(){
		if( !this._thumbnail )
			this._thumbnail = BgImg.getPath(this, 'thumbnail')
		return this._thumbnail
	}
}





BgImg.default = {
	isEnable: 	true//,
	//isDefault:	true
};
BgImg.list = [];





// global
	// BgImg.isInit = false
	BgImg.init = function(){
		if( BgImg.isInit )
			return BgImg.list

		_g.log('背景图: START')
		
		BgImg.controlsInit()
		
		_frame.dom.bgimg = $('<div class="bgimgs"/>').appendTo( _frame.dom.layout )
			.on(_g.event.animationend, 's', function(){
				BgImg.changeAfter()
			})
		
		let deferred = Q.defer()
			,_new = []

		BgImg.getDefaultImgs( deferred )

		BgImg.list.some(function(o){
			if( o.name != Lockr.get('BgImgLast', '') )
				_new.push(o.name)
			return o.name == Lockr.get('BgImgLast', '')
		})

		Lockr.set('BgImgLast', BgImg.list[0].name)

		BgImg.change( _new[0] );
		_frame.app_main.loaded('bgimgs')

		BgImg.isInit = true
		
		_g.log('背景图: DONE')
		return deferred.promise
	};
	
	BgImg.getObj = function(o){
		if( typeof o == 'string' ){
			let r
			BgImg.list.some(function(obj){
				if( obj.name === o )
					r = obj
				return obj.name === o
			})
			return r
		}
		
		if( typeof o == 'number' ){
			return BgImg.list[o]
		}
		
		if( typeof o == 'undefined' ){
			return BgImg.cur
		}

		return o
	}
	
	BgImg.change = function( o ){
		if( !BgImg.list.length )
			return
		
		if( typeof o == 'undefined' ){
			o = BgImg.list[ _g.randInt(BgImg.list.length - 1) ]
			if( BgImg.cur && o.name === BgImg.cur.name )
				return BgImg.change()
		}else{
			o = BgImg.getObj(o)
			if( BgImg.cur && o.name === BgImg.cur.name )
				return o
		}
		
		let isFadeIn = false
		
		if( BgImg.cur ){
			BgImg.lastToHide = BgImg.cur
			isFadeIn = true
			BgImg.cur.elThumbnail.removeClass('on')
		}
		
		o.els.addClass( isFadeIn ? 'fadein' : '' )
		o.els.eq(0).appendTo( _frame.dom.bgimg )
		o.els.eq(1).appendTo( _frame.dom.nav )
		o.els.eq(2).appendTo( _frame.dom.main )
		o.els.eq(3).appendTo( BgImg.controlsEls.bgimgs )
		o.elThumbnail.addClass('on')
		
		BgImg.cur = o
		return o
	};
	
	BgImg.changeAfter = function(){
		if( BgImg.lastToHide ){
			BgImg.lastToHide.els.detach()
			delete BgImg.lastToHide
		}
	};
	
	BgImg.upload = function(){
		if( !BgImg.fileSelector ){
			BgImg.fileSelector = $('<input type="file" class="none"/>')
				.on('change', function(e){
					BgImg.controlsEls.body.addClass('is-loading')
					BgImg.fileSelector.prop('disabled', true)
					
					let o
					
					Q.fcall(function(){
						return BgImg.readFile(e)
					})
					.then(function(obj){
						o = obj
						return BgImg.generate(o, 'thumbnail')
					})
					.then(function(canvas){
						return BgImg.set(o, 'thumbnail', canvas)
					})
					.then(function(){
						return BgImg.generate(o, 'blured')
					})
					.then(function(canvas){
						return BgImg.set(o, 'blured', canvas)
					})
					.then(function(){
						o.add()
						o.show()
					})
					.done(function(){
						BgImg.controlsEls.body.removeClass('is-loading')
						BgImg.fileSelector.prop('disabled', false)
						_g.log('BgImg.add() complete')
					}.bind(this))
				})
		}
		BgImg.fileSelector.trigger('click')
	};
	
	BgImg.generate = function(o, t){
		o = BgImg.getObj(o)
		let deferred = Q.defer()
		
		switch( t ){
			case 'thumbnail':
				var img = $('<img/>',{
					'src': 	o.path
				}).on({
					'load': function(){
						let cv = canvas.downScale(img[0], 150 / Math.min(img[0].width, img[0].height))
						img.remove()
						deferred.resolve( cv )
					}
				}).appendTo($body)
				break;
			
			case 'blured':
				var img = $('<img/>',{
					'src': 	o.path
				}).on({
					'load': function(){
						let cv = $('<canvas/>')
						canvas.blur.image(
							img[0],
							cv[0],
							20 * Math.min(img[0].width, img[0].height) / 1080
							/*, blurAlphaChannel*/
						);
						img.remove()
						deferred.resolve( cv[0] )
					}
				}).appendTo($body)
				break;
		}

		return deferred.promise
	};





// controls
	// BgImg.controlsShowing = false
	BgImg.controlsInit = function(){
		if( BgImg.controlsEls )
			return BgImg.controlsEls.container

		BgImg.controlsEls = {}
		BgImg.controlsEls.body = $('<div class="bgcontrols"/>').appendTo( _frame.dom.layout )
			.on(_g.event.animationend, function(e){
				if( e.currentTarget == e.target ){
					if( BgImg.controlsShowing ){
						BgImg.controlsHideAfter()
					}else{
						BgImg.controlsShowAfter()
					}
					/*
					if( e.originalEvent.animationName == 'sideInRight' ){
						BgImg.controlsHideAfter()
					}else if( e.originalEvent.animationName == 'sideOutRight' ){
						BgImg.controlsShowAfter()
					}
					*/
				}
			})
			.append( BgImg.controlsEls.container = 
				$('<div class="wrapper"/>')
				.append( BgImg.controlsEls.bgimgs = 
					$('<div class="bgimgs"/>')
				)
			)

		return BgImg.controlsEls.container
	};
	BgImg.controlsShow = function(){
		if( !BgImg.controlsEls || BgImg.controlsShowing ) return;
		if( !BgImg.controlsEls.listDefault ){
			$('<div class="controls"/>').appendTo( BgImg.controlsEls.container )
				.append( BgImg.controlsEls.btnViewingToggle =
					$('<button icon="eye"/>').on('click', BgImg.controlsViewingToggle)
				)
				.append(
					$('<button icon="floppy-disk"/>').on('click', function(){
						BgImg.save()
					})
				)
				.append(
					$('<button icon="arrow-set2-right"/>').on('click', BgImg.controlsHide)
				)
			$('<div class="list"/>').appendTo( BgImg.controlsEls.container )
			/*
				.append( BgImg.controlsEls.listCustom =
					$('<dl/>',{
						'html':	'<dt>自定义</dt>'
					})
					.append( BgImg.controlsEls.listCustomAdd =
						$('<dd/>',{
							'class':	'add',
							'html':		'<s></s>'
						}).on('click',function(){
							BgImg.upload()
						})
					)
				)
			*/
				.append( BgImg.controlsEls.listDefault =
					$('<dl/>',{
						'html':	'<dt></dt>'
					})
				)
			BgImg.list.forEach(function(o){
				o.add()
			})
		}
		_frame.dom.layout.addClass('mod-bgcontrols')
	};
	BgImg.controlsShowAfter = function(){
		if( !BgImg.controlsEls || BgImg.controlsShowing ) return;
		BgImg.controlsEls.body.addClass('is-on')
		BgImg.controlsShowing = true
	};
	BgImg.controlsHide = function(){
		if( !BgImg.controlsEls || !BgImg.controlsShowing ) return;
		BgImg.controlsEls.body.addClass('is-hiding')
	};
	BgImg.controlsHideAfter = function(){
		if( !BgImg.controlsEls || !BgImg.controlsShowing ) return;
		_frame.dom.layout.removeClass('mod-bgcontrols')
		BgImg.controlsEls.body.removeClass('is-on is-hiding')
		BgImg.controlsShowing = false
	};
	BgImg.controlsToggle = function(){
		if( BgImg.controlsShowing )
			return BgImg.controlsHide()
		return BgImg.controlsShow()
	};
	BgImg.controlsViewingToggle = function(){
		BgImg.controlsEls.body.toggleClass('mod-viewing')
		BgImg.controlsEls.btnViewingToggle.toggleClass('on')
	};
