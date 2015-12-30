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
	add(new)
	delete(index)
		only work on custom img
	generate(index || object, blur || thumbnail)
	set(index || object, blur || thumbnail)
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
	
	save(){
		BgImg.save(this)
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
		if( !this._blur ){
			if( this.isDefault ){
				this._blur = BgImg.getPath(this, 'blured')
			}else{
				this._blur = BgImg.getPath(this, 'blured')
			}
		}
		return this._blur
	}
	
	get thumbnail(){
		if( !this._thumbnail ){
			if( this.isDefault ){
				this._thumbnail = BgImg.getPath(this, 'thumbnail')
			}else{
				this._thumbnail = BgImg.getPath(this, 'thumbnail')
			}
		}
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
				.append( BgImg.controlsEls.listDefault =
					$('<dl/>',{
						'html':	'<dt></dt>'
					})
				)
			BgImg.list.forEach(function(o){
				o.elThumbnail.appendTo( BgImg.controlsEls.listDefault )
				if( BgImg.cur && BgImg.cur.name === o.name )
					o.elThumbnail.addClass('on')
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

/*

		only_bg_on: function(){
			if( this.only_bg )
				return true

			if( !_frame.dom.bg_controls ){
				_frame.dom.bg_controls = $('<div class="bg_controls"/>')
						.on(eventName('transitionend', 'only_bg_off'), function(e){
							if( e.currentTarget == e.target
								&& e.originalEvent.propertyName == 'bottom'
								//&& _frame.dom.layout.hasClass('mod-only-bg')
								&& _frame.app_main.only_bg
								//&& _frame.dom.bg_controls.offset().top >= $body.height()
								&& parseInt( _frame.dom.bg_controls.css('bottom') ) < 0
							){
								_frame.dom.layout.removeClass('mod-only-bg')
								_frame.app_main.only_bg = false
							}
						})
						.append(
							$('<button class="prev" icon="arrow-left"/>')
									.on('click', function(){
										var pathParse = node.path.parse(_frame.app_main.bgimg_path)
											,index = $.inArray( pathParse['base'], _frame.app_main.bgimgs ) - 1
										if( index < 0 )
											index = _frame.app_main.bgimgs.length - 1
										_frame.app_main.change_bgimg( [_frame.app_main.bgimgs[index]] )
									})
						)
						.append(
							$('<button class="back"/>')
									.html('返回')
									.on('click', function(){
										_frame.app_main.only_bg_off()
									})
						)
						.append(
							$('<button class="back"/>')
									.html('保存图片')
									.on('click', function(){
										var pathParse = node.path.parse(_frame.app_main.bgimg_path)
											,index = $.inArray( pathParse['base'], _frame.app_main.bgimgs )
										_g.file_save_as( _frame.app_main.bgimg_path, (index + 1) + pathParse['ext'] )
									})
						)
						.append(
							$('<button class="next" icon="arrow-right"/>')
									.on('click', function(){
										var pathParse = node.path.parse(_frame.app_main.bgimg_path)
											,index = $.inArray( pathParse['base'], _frame.app_main.bgimgs ) + 1
										if( index >= _frame.app_main.bgimgs.length )
											index = 0
										_frame.app_main.change_bgimg( [_frame.app_main.bgimgs[index]] )
									})
						)
						.appendTo(_frame.dom.layout)

				this.cur_bgimg_el = this.cur_bgimg_el.add(
						this.cur_bgimg_el.eq(0).clone().appendTo( _frame.dom.bg_controls)
					)
			}

			_frame.dom.layout.addClass('mod-only-bg')
			setTimeout(function(){
				_frame.dom.bg_controls.addClass('on')
			}, 10)

			this.only_bg = true
		},
		only_bg_off: function(){
			if( !this.only_bg )
				return true
			_frame.dom.bg_controls.removeClass('on')
			//_frame.dom.layout.removeClass('only_bg')
			//this.only_bg = false
		},
		only_bg_toggle: function(){
			if( this.only_bg )
				return this.only_bg_off()
			return this.only_bg_on()
		},
*/