/* 
 */

_frame.infos = {
	// curContent: 			null,			// 当前内容的hashCode

	// lastCurrentPage: null, 		// 进入 infos 框架之前显示的页面
	// last: null, 					// 上一次 infos，通常进入其他页面后会被重置
	// firstrun: false,
	historyLength: -1,
	historyCurrent: -1,

	contentCache: {},

	getContent: function(type, id, callback){
		if( !this.contentCache[type] )
			this.contentCache[type] = {}
		
		function cb($el){
			if( callback )
				callback($el)
			return $el
		}
		
		if( !this.firstrun ){
			let firstChildren = this.dom.container.children('.infosbody').eq(0)
			this.firstrun = true
			if( firstChildren.attr('data-infos-type') == type && firstChildren.attr('data-infos-id') == id ){
				this.contentCache[type][id] = _p.initDOM(firstChildren)
				_frame.app_main.page_title[_g.state2URI({
						'infos':	type,
						'id':		id
					})] = document.title
				return cb( this.contentCache[type][id] )
			}else if( firstChildren.attr('data-infos-type') == type ){
				firstChildren.remove()
			}
		}
		
		function initcont( $el ){
			if( type == 'fleet' )
				$el = _frame.infos['__' + type]( id, $el )
			
			return _p.initDOM(
				$el.addClass('infosbody')
					.attr({
						'data-infos-type':	type,
						'data-infos-id':	id
					})
			)
		}

		if( id == '__NEW__' )
			return cb( initcont( this['__' + type]( id ) ) )

		if( !this.contentCache[type][id] ){
			_frame.app_main.loading_start( _g.state2URI({
				'infos':	type,
				'id':		id
			}), {
				success: function(html){
					if( html ){
						let result = /\<div class\=\"wrapper\"\>(.+)\<\/div\>/.exec( html )
						_frame.infos.contentCache[type][id] = initcont( $(result.length > 1 ? result[1] : '') )
					}
				},
				successAfter: function(){
					return cb(_frame.infos.contentCache[type][id])
				},
				error: function(){
					if( typeof _frame.infos.contentCache[type][id] != 'undefined' )
						delete _frame.infos.contentCache[type][id]
					history.back()
				}
			} )
		}else{
			return cb(this.contentCache[type][id])
		}
	},

	show: function(cont, el, doNotPushHistory){
		var exp			= /^\[\[([^\:]+)\:\:(.+)\]\]$/.exec(cont)
			,infosType 	= null
			,infosId 	= null

		if( exp && exp.length > 2 ){
			infosType = exp[1].toLowerCase()
			if( isNaN(exp[2]) )
				//infosId = encodeURI(JSON.stringify( exp[2] ))
				infosId = exp[2]
			else
				infosId = parseInt( exp[2] )
			switch( infosType ){
				case 'item':
				case 'equip':
				case 'equipments':
					infosType = 'equipment'
					break;
			}
		}else{
			return false
		}

		// 如果为相同内容，不运行
			if( this.curContent == infosType + '::' + infosId )
				return this.dom.container.children('div:first-child')

		if( !doNotPushHistory ){
		//}else{
			this.historyCurrent++
			this.historyLength = this.historyCurrent
			_frame.app_main.pushState(
				{
					'infos':infosType,
					'id': 	infosId,
					'infosHistoryIndex': this.historyCurrent
				},
				null,
				_g.state2URI({
					'infos':infosType,
					'id': 	infosId
				})
				//'?infos=' + infosType + '&id=' + infosId
			)
		}

		this.show_func( infosType, infosId, doNotPushHistory )
	},

	//show_func: function(cont, el, history){
	show_func: function(type, id, doNotPushHistory, infosHistoryIndex){
		if( !type || !id )
			return false
		
		_g.pageChangeBefore()

		// 如果为相同内容，不运行
			if( this.curContent == type + '::' + id )
				return this.dom.container.children('div:first-child')

		type = type.toLowerCase()
		if( !isNaN(id) )
			id = parseInt(id)

		//let title
		
		//console.log('init infos: ' + type + ' - ' + id)

		// 第一次运行，创建相关DOM和变量
			if( !this.dom ){
				this.dom = {
					'main':		_frame.dom.main.children('.page-container.infos')
				}
				if( !this.dom.main.length ){
					this.dom.main = $('<div class="page-container infos"/>').appendTo( _frame.dom.main )
					this.dom.container = $('<div class="wrapper"/>').appendTo( this.dom.main )
				}else{
					this.dom.container = this.dom.main.children('.wrapper')
				}
				this.dom.main.on(eventName('transitionend', 'infos_hide'), function(e){
								if( e.currentTarget == e.target
									&& e.originalEvent.propertyName == 'opacity'
									&& _frame.infos.dom.main.css('opacity') == 0
								){
									_frame.infos.hide_finish()
								}
							})
				/*
				if( _frame.dom.btnHistoryBack )
					_frame.dom.btnHistoryBack.on(eventName('transitionend', 'infos_hide'), function(e){
									if( e.currentTarget == e.target
										&& e.originalEvent.propertyName == 'opacity'
										&& parseFloat(_frame.dom.btnHistoryBack.css('opacity')) == 0
									){
										_frame.infos.hide_finish()
									}
								})
				*/
			}

		// 计算历史记录相关，确定 Back/Forward 按钮是否可用
		/*
			if( _frame.dom.btnHistoryForward ){
				infosHistoryIndex = typeof infosHistoryIndex != 'undefined' ? infosHistoryIndex : this.historyCurrent
				this.historyCurrent = infosHistoryIndex
				//_g.log( this.historyCurrent, this.historyLength )
				if( this.historyCurrent == this.historyLength && this.historyCurrent > -1 )
					_frame.dom.btnHistoryForward.addClass('disabled')
			}
		*/

		// 先将内容区域设定为可见
			_frame.dom.layout.addClass('is-infos-show')
		
		this.curContent = type + '::' + id

		// 处理内容
			this.getContent(type, id, function(cont){
				// 隐藏除目标外所有已显示的内容
					this.dom.container.children().not(cont).each(function(i, el){
						let $el = $(el)
						if( $el.css('opacity') == 0 )
							$el.trigger('hidden')
					})
				
				switch(type){
					case 'ship':
					case 'equipment':
					case 'entity':
						//cont = this.getContent(type, id)
						this.dom.main.attr('data-infostype', type)
						//title = cont.attr('data-infos-title')
						break;
					case 'fleet':
						//cont = this.getContent(type, id)
						this.dom.main.attr('data-infostype', 'fleet')
						//_frame.app_main.mode_selection_off()
						TablelistEquipments.types = []
						break;
				}
				
				switch(type){
					case 'ship':
						_g.title( _frame.app_main.navtitle.ships );
						break;
					case 'equipment':
						_g.title( _frame.app_main.navtitle.equipments );
						break;
					case 'entity':
						_g.title( _frame.app_main.navtitle.entities );
						break;
					case 'fleet':
						_g.title( _frame.app_main.navtitle.fleets );
						break;
				}
				
				let is_firstShow = !cont.data('is_infosinit')
				
				if( !cont.data('is_infosinit') ){
					if( type == 'ship' ){
						let curLvl = parseInt(_config.get('ship_infos_lvl') || 99)
						cont.find('input[type="radio"][name^="ship_infos_lvl_"]').each(function(){
							let $el = $(this)
								,val = $el.val()
							$el.prop('checked', curLvl == val)
								.on('change', function(){
									_config.set('ship_infos_lvl', val)
								})
						})
					}
					
					if( _frame.infos['__' + type + '_init'] )
						_frame.infos['__' + type + '_init']( cont )
	
					cont.data('is_infosinit', true)
						.on('hidden', function(){
							cont.detach().data('is_show', false)
						})
						.on(eventName('transitionend', 'hide'), function(e){
							if( e.currentTarget == e.target
								&& e.originalEvent.propertyName == 'opacity'
								&& cont.css('opacity') == 0
								&& cont.data('is_show')
							){
								if( _frame.infos.curContent == type + '::' + id ){
									cont.prependTo( _frame.infos.dom.container )
								}else{
									cont.trigger('hidden')
								}
							}
						})
				}
				
				if( this.curContent != type + '::' + id )
					return
				
				cont.prependTo( this.dom.container )
					.trigger('show', [is_firstShow])
					.data('is_show', true)
				
				this.dom.main.scrollTop(0)

				//_p.initDOM( cont )
				//this.curContent = hashcode
				//this.curContent = type + '::' + id
		
				// 取消主导航上的当前项目状态
					if( _frame.app_main.cur_page ){
						//this.lastCurrentPage = _frame.app_main.cur_page
		
						// exit selection mode
							//_frame.app_main.mode_selection_off()
						
						if( _frame.dom.navs[_frame.app_main.cur_page] )
							_frame.dom.navs[_frame.app_main.cur_page].removeClass('on')
						if( _frame.app_main.page_dom[_frame.app_main.cur_page] )
							_frame.app_main.page_dom[_frame.app_main.cur_page].addClass('off').trigger('pageoff').detach()
						_frame.app_main.cur_page = null
					}
				
				// 确定 theme
					_frame.dom.main.attr('data-theme', cont.attr('data-theme') || type)
		
				setTimeout(function(){
					// 显示内容
						_frame.dom.layout.addClass('is-infos-on')
					
					//if( title ){
					//	_frame.app_main.title = title
					//}
					document.title = _frame.app_main.page_title[_g.state2URI({
							'infos':	type,
							'id':		id
						})]
					
					//console.log( _frame.infos.last )
					
					//if( _frame.infos.last != type + '::' + id )
						_ga.counter(
							location.search
						)
					
					//_frame.infos.last = type + '::' + id
				}, 1)
			}.bind(this))
	},

	hide: function(){
		if( !this.dom || !this.curContent )
			return false

		// 隐藏内容
			_frame.dom.layout.removeClass('is-infos-on')
			/*
			if( _frame.dom.btnHistoryForward )
				_frame.dom.btnHistoryForward.addClass('disabled')
			*/
			this.curContent = null

		//if( this.lastCurrentPage ){
		//	if( _frame.dom.navs[this.lastCurrentPage] )
		//		_frame.dom.navs[this.lastCurrentPage].addClass('on')
		//	_frame.app_main.cur_page = this.lastCurrentPage
		//}

		/*
		// 为主导航最后一个元素绑定 transitionEnd 事件
		// transitionEnd 触发后，检查 top CSS，如果为 0，判断动画播放结束
		// 将内容区域设定为不可见
			_frame.dom.navlinks.children('button:last-of-type')
					.on('transitionend.infos_hide', function(e){
						if( e.currentTarget == e.target && e.originalEvent.propertyName == 'top' && parseInt($(this).css('top')) == 0 ){
							_frame.dom.layout.removeClass('is-infos-show')
							_frame.infos.dom.main.attr('data-infostype', '')
							$(this).off('transitionend.infos_hide')
						}
					})
		*/
	},

	hide_finish: function(){
		// 仍在显示，不予执行
			if( this.curContent )
				return false

		this.dom.container.children().trigger('hidden')

		_frame.dom.layout.removeClass('is-infos-show')
		this.dom.main.attr({
			'data-infostype': 	'',
			'data-theme': 		''
		})
		//$(this).off('transitionend.infos_hide')
		this.historyLength = -1
		this.historyCurrent = -1
	},

/*
	historyback: function(){
		this.dom.main.children().slice(1).remove()
		this.dom.main.children().eq(0).removeClass('off').addClass('fadein')
		this.dom.historyback.empty().removeClass('show')

		if( this.dom.main.children().eq(0).hasClass('ship') )
			this.dom.main.attr('data-infostype', 'ship')
		else if( this.dom.main.children().eq(0).hasClass('equipment') )
			this.dom.main.attr('data-infostype', 'equipment')
		else if( this.dom.main.children().eq(0).hasClass('fleet') )
			this.dom.main.attr('data-infostype', 'fleet')
		else if( this.dom.main.children().eq(0).hasClass('entity') )
			this.dom.main.attr('data-infostype', 'entity')
	},
*/
	
	click: function(el){
		this.show(
			el.attr('data-infos'),
			el,
			el.attr('data-infos-nohistory')
		)
	},

	// 初始化
	init: function(){
		if( this.is_init )
			return true
	
		$body.on( 'click._infos', '[data-infos]', function(e){
				if( !(e.target.tagName.toLowerCase() == 'input' && e.target.className == 'compare') ){
					_frame.infos.click($(this))
	
					if( e.target.tagName.toLowerCase() == 'a' )
						e.preventDefault()
				}
			})
	
		this.is_init = true
		return true
	}
}