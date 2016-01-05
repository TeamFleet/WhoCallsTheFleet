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
		when isDefault === true, name leads as *
		use .filename to get real filename / name
	filename
	isDefault

	GET			index
	GET			els
	GET			elThumbnail
	GET			path
	GET/SET		_path
	GET			blur
	GET/SET		_blur
	GET			thumbnail
	GET/SET		_thumbnail
	GET/SET		visible

	show()
	save()
	append()
	delete()

*/

class BgImg{
	constructor(options){
		options = options || {}
		$.extend(true, this, BgImg.defaults, options)
	}
	
	show(){
		return BgImg.change(this)
	}
	
	save(){
		return BgImg.save(this)
	}
	
	append(){
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
	
	delete(){
		BgImg.delete(this)
	}
	
	get filename(){
		return this.isDefault ? this.name.substr(1) : this.name
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
			//let checkId = 'checkbox-' + _g.timeNow()
			this._elThumbnail = $('<dd/>')
				.on('click', function(){
					BgImg.change(this)
				}.bind(this))
				.append(
					$('<s/>').css('background-image','url(' + this.thumbnail + ')')
				)
				.append(
					$('<i/>').on('click', function(e){
						e.preventDefault()
						e.stopImmediatePropagation()
						e.stopPropagation()
						this.visible = !this.visible
					}.bind(this))
				)
			if( !this.isDefault )
				this._elThumbnail.append(
					$('<del/>').on('click', function(e){
						e.preventDefault()
						e.stopImmediatePropagation()
						e.stopPropagation()
						this.delete()
					}.bind(this))
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
		if( !this._blured )
			this._blured = BgImg.getPath(this, 'blured')
		return this._blured
	}
	
	get thumbnail(){
		if( !this._thumbnail )
			this._thumbnail = BgImg.getPath(this, 'thumbnail')
		return this._thumbnail
	}
	
	get visible(){
		return this.elThumbnail.hasClass('is-visible')
	}
	set visible( v ){
		if( v ){
			if( !this.visible ){
				this.elThumbnail.addClass('is-visible')
				BgImg.listVisible.push(this)
				BgImg.namesHidden.forEach(function(n, i){
					if( n === this.name )
						BgImg.namesHidden.splice(i, 1)
				}.bind(this))
			}
		}else{
			if( this.visible ){
				this.elThumbnail.removeClass('is-visible')
				BgImg.listVisible.forEach(function(o, i){
					if( o === this )
						BgImg.listVisible.splice(i, 1)
				}.bind(this))
				BgImg.namesHidden.push(this.name)
			}
		}
		Lockr.set('BgImgHidden', BgImg.namesHidden)
	}
}





BgImg.default = {
	isEnable: 	true//,
	//isDefault:	true
};
BgImg.list = [];
BgImg.listVisible = [];
//BgImg.namesHidden = [];
BgImg.countCustom = 0;





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
			,_new

		BgImg.namesHidden = Lockr.get('BgImgHidden', [])

		Q.fcall(BgImg.getDefaultImgs)
		.then(function(){
			BgImg.list.forEach(function(o){
				if( BgImg.namesHidden.indexOf(o.name) > -1 ){
					o.visible = false
				}else{
					o.visible = true
				}
			})
			
			//console.log(BgImg.listVisible)
			BgImg.ensureVisible();

			BgImg.listVisible.some(function(o){
				if( !_new && o.name != Lockr.get('BgImgLast', '') )
					_new = o
				return o.name == Lockr.get('BgImgLast', '')
			})

			Lockr.set('BgImgLast', BgImg.listVisible[0].name)

			BgImg.change( _new );
			_frame.app_main.loaded('bgimgs')

			BgImg.isInit = true
			
			_g.log('背景图: DONE')
			deferred.resolve()
		})
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
			BgImg.ensureVisible();
			o = BgImg.listVisible[ _g.randInt(BgImg.listVisible.length) ]
			if( BgImg.cur && o.name === BgImg.cur.name ){
				if( BgImg.listVisible.length == 1 )
					return o
				return BgImg.change()
			}
		}else{
			o = BgImg.getObj(o)
			if( BgImg.cur && o.name === BgImg.cur.name )
				return o
		}
		
		if( BgImg.cur ){
			BgImg.lastToHide = BgImg.cur
			BgImg.cur.elThumbnail.removeClass('on')
		}
		
		o.els.addClass( BgImg.cur ? 'fadein' : '' )
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
					if( BgImg.fileSelector.val() ){
						let o
						
						Q.fcall(function(){
							BgImg.controlsEls.body.addClass('is-loading')
							BgImg.fileSelector.prop('disabled', true)
							return BgImg.readFile(e)
						})
						.then(function(obj){
							o = obj
							BgImg.list.push(o)
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
							// 如果是上传第一张自定义图片，在随机背景图列表中取消所有内置图片
							if( !BgImg.countCustom ){
								BgImg.list.forEach(function(obj){
									if( obj.visible )
										obj.visible = false
								})
							}
							o.append()
							o.show()
							o.visible = true
							BgImg.countCustom++
						})
						.catch(function(err){
							_g.error(err)
						})
						.done(function(){
							BgImg.controlsEls.body.removeClass('is-loading')
							BgImg.fileSelector.prop('disabled', false)
							BgImg.fileSelector.val('')
							_g.log('BgImg.add() complete')
						}.bind(this))
					}
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
	
	BgImg.getUniqueName = function( n ){
		let o, i=1, n2 = n
		if( typeof n == 'number' )
			n = '' + n
		while( o = BgImg.getObj(n2) ){
			n2 = n.split('.')
			let ext = n2.pop()
			n2 = n2.join('.') + '-' + (i++) + '.' + ext
		}
		return n2
	};
	
	BgImg.ensureVisible = function(){
		if( !BgImg.listVisible.length ){
			BgImg.list.forEach(function(o){
				if( (BgImg.countCustom && !o.isDefault)
					|| (!BgImg.countCustom && o.isDefault)
				){
					o.visible = true
				}
			})
		}
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
				.append(
					$('<dl/>',{
						'class':	'notes',
						'html':		'勾选的图片将会出现在背景图随机队列中'
					})
				)
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
				.append( BgImg.controlsEls.listDefault =
					$('<dl/>',{
						'html':	'<dt></dt>'
					})
				)
			BgImg.list.forEach(function(o){
				o.append()
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
