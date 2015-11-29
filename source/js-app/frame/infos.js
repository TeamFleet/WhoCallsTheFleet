/* 
 */

_frame.infos = {
	// curContent: 			null,			// 当前内容的hashCode

	// lastCurrentPage: null, 		// 进入 infos 框架之前显示的页面
	// last: null, 					// 上一次 infos，通常进入其他页面后会被重置
	historyLength: -1,
	historyCurrent: -1,

	contentCache: {},

	getContent: function(type, id){
		if( !this.contentCache[type] )
			this.contentCache[type] = {}
		
		function initcont( $el ){
			return _p.initDOM(
				$el.addClass('infosbody')
					.attr({
						'data-infos-type':	type,
						'data-infos-id':	id
					})
			)
		}

		if( id == '__NEW__' )
			return initcont( this['__' + type]( id ) )
		
		if( id == '__OUTPUT__' )
			this.contentCache[type][id] = initcont( this['__' + type + '__OUTPUT']( id ) ).removeAttr('data-infos-id')

		if( !this.contentCache[type][id] ){
			this.contentCache[type][id] = initcont( this['__' + type]( id ) )
		}

		return this.contentCache[type][id]
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
				'?infos=' + infosType + '&id=' + infosId
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
		if( isNaN(id) )
			id = id
		else
			id = parseInt(id)

		var cont = ''
			,title = null

		// 第一次运行，创建相关DOM和变量
			if( !this.dom ){
				this.dom = {
					//'nav': 		$('<div class="infos"/>').appendTo( _frame.dom.nav ),
					'main': 	$('<div class="page-container infos"/>').appendTo( _frame.dom.main )
				}
				this.dom.container = $('<div class="wrapper"/>').appendTo( this.dom.main )
				/*
				this.dom.back = $('<button class="back" icon="arrow-set2-left"/>')
						.on({
							'click': function(){
								_frame.infos.dom.forward.removeClass('disabled')
								history.back()
								//_frame.infos.hide()
							},
							'transitionend.infos_hide': function(e){
								if( e.currentTarget == e.target
									&& e.originalEvent.propertyName == 'opacity'
									&& parseInt(_frame.infos.dom.back.css('opacity')) == 0
								){
									_frame.infos.hide_finish()
								}
							}
						}).appendTo( this.dom.nav )
				this.dom.forward = $('<button class="forward disabled" icon="arrow-set2-right"/>')
						.on('click', function(){
							history.forward()
							//_frame.infos.hide()
						}).appendTo( this.dom.nav )
				*/
				_frame.dom.btnHistoryBack.on(eventName('transitionend', 'infos_hide'), function(e){
								if( e.currentTarget == e.target
									&& e.originalEvent.propertyName == 'opacity'
									&& parseFloat(_frame.dom.btnHistoryBack.css('opacity')) == 0
								){
									_frame.infos.hide_finish()
								}
							})
			}

		// 计算历史记录相关，确定 Back/Forward 按钮是否可用
			infosHistoryIndex = typeof infosHistoryIndex != 'undefined' ? infosHistoryIndex : this.historyCurrent
			this.historyCurrent = infosHistoryIndex
			//_g.log( this.historyCurrent, this.historyLength )
			if( this.historyCurrent == this.historyLength && this.historyCurrent > -1 )
				_frame.dom.btnHistoryForward.addClass('disabled')

		// 先将内容区域设定为可见
			_frame.dom.layout.addClass('is-infos-show')

		// 处理内容
			switch(type){
				case 'ship':
				case 'equipment':
				case 'entity':
					cont = this.getContent(type, id)
					this.dom.main.attr('data-infostype', type)
					title = cont.attr('data-infos-title')
					break;
				case 'fleet':
					cont = this.getContent(type, id)
					this.dom.main.attr('data-infostype', 'fleet')
					_frame.app_main.mode_selection_off()
					TablelistEquipments.types = []
					break;
			}
			//var hashcode = (cont.append) ? cont[0].outerHTML.hashCode() : cont.hashCode()
			//if( this.curContent != hashcode ){
				var contentDOM = cont.append ? cont : $(cont)
					,is_firstShow = !contentDOM.data('is_infosinit')

				//if( el && el.attr('data-infos-history-skip-this') )
				//	contentDOM.attr('data-infos-history-skip-this', true)

				//if( this.dom.main.children().length )
				//	contentDOM.addClass('fadein')

				/*
				if( history ){
					this.dom.main.children().filter('[data-infos-history-skip-this="true"]').remove()
					this.dom.main.children().slice(2).remove()
					this.dom.main.children().eq(0).addClass('off')
					this.dom.historyback.html(history).addClass('show')
				}else{
					this.dom.historyback.html('').removeClass('show')
					this.dom.main.empty()
				}*/
				//data-infos-history-skip-this

				if( !contentDOM.data('is_infosinit') ){
					contentDOM.data('is_infosinit', true)
						.on(eventName('transitionend','hide'), function(e){
							if( e.currentTarget == e.target && e.originalEvent.propertyName == 'opacity' && parseInt(contentDOM.css('opacity')) == 0 ){
								contentDOM.detach()
									.data('is_show', false)
									.trigger('hidden')
							}
						})
				}
				contentDOM.prependTo( this.dom.container )
					.trigger('show', [is_firstShow])
					.data('is_show', true)

				this.dom.main.scrollTop(0)

				//_p.initDOM( contentDOM )
				//this.curContent = hashcode
				this.curContent = type + '::' + id
			//}

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
				
			_frame.app_main.title = title
			
			//console.log( _frame.infos.last )
			
			if( _frame.infos.last != title )
				_ga.counter(
					location.search
				)
			
			_frame.infos.last = title
		}, 1)
	},

	hide: function(){
		if( !this.dom || !this.curContent )
			return false

		// 隐藏内容
			_frame.dom.layout.removeClass('is-infos-on')
			_frame.dom.btnHistoryForward.addClass('disabled')
			this.curContent = null

		//if( this.lastCurrentPage ){
		//	if( _frame.dom.navs[this.lastCurrentPage] )
		//		_frame.dom.navs[this.lastCurrentPage].addClass('on')
			//_frame.app_main.cur_page = this.lastCurrentPage
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
