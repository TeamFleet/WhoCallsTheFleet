
_frame.infos.__ship_init = function( $el ){
	let x
		,originalX
		,deltaX
		,isPanning = false
		,isScrollSnap = ( _huCss.csscheck_full('scroll-snap-type') && !bFirefox )
		,isMoving = 0
		,illustMain = $el.find('.illustrations')
		,illust = illustMain.children('div')
		,imgs = illust.children('span')
		,s = imgs.eq(0)
		,labels = illustMain.children('label')
		,inputs = illustMain.children('input[type="radio"]')
					.on('change', function(e){
						let i = parseInt( e.target.getAttribute('value') ) - 1
						if( !labels.eq(i).is(':visible') ){
							i--
							inputs.eq(i).prop('checked', true)
						}
						if( isScrollSnap ){
							//illust.scrollLeft( imgs.eq(i)[0].offsetLeft )
							illust.off('scroll')
								.animate({
									scrollLeft:		imgs.eq(i)[0].offsetLeft
								}, 200, function(){
									illust.on('scroll', scrollHandler)
								})
						}else{
							
						}
					})
		,illustWidth = 0
		,inputCur = 0
		,sCount = 1
	
	function scrollStart(){
		originalX = illust.scrollLeft()
		illustWidth = illust.width()
		inputCur = parseInt(inputs.filter(':checked').val()) - 1
		sCount = Math.floor(illustWidth / (s.outerWidth() * 0.95))
	}
	function scrollHandler(){
		x = illust.scrollLeft()
		if( !isPanning ){
			requestAnimationFrame(scrollX);
		}
		isPanning = true
	}
	function scrollX(){
		let delta = x - originalX
			,pDelta = (Math.floor(Math.abs(delta) / illustWidth) + (Math.abs(delta % illustWidth) > (illustWidth / 2) ? 1 : 0) )
						* (x < originalX ? -1 : 1)
			//,pDelta = Math.abs(delta % illustWidth) > (illustWidth / 3) ? Math.ceil(delta / illustWidth) : Math.floor(delta / illustWidth)
		//console.log(delta, pDelta)
		isPanning = false
		if( delta !== 0 )
			inputs.eq(inputCur + pDelta * sCount).prop('checked', true)
		//inputs.eq( Math.floor(x / (s.outerWidth() * 0.95)) ).prop('checked', true)
	}
	//function scrollToX(){
	//	isPanning = false
	//	illust.scrollLeft( originalX + deltaX )
	//}
	function panX(){
		isPanning = false
		illust.addClass('is-panning').css('transform', 'translateX('+(deltaX + originalX)+'px)')
	}
	function calcScrollbar(){
		//illust.css('bottom',
		//	0 - illust.outerHeight() + (s.height() + parseInt(illust.css('padding-top')) + parseInt(illust.css('padding-bottom')))
		//)
	}
	
	// scroll snap
		if( isScrollSnap ){
			illustMain.addClass('mod-scroll-snap')
			$window.on('resized', function(){
				scrollStart();
				if( $el.data('is_show') )
					inputs.filter(':checked').trigger('change')
			})
			illust.on({
				'scroll': scrollHandler,
				'pointerdown': function(e){
					if( e.originalEvent.pointerType == 'touch' ){
						scrollStart()
						//isMoving = e.clientX
						//illust.off('scroll')
					}
				}/*,
				'pointermove': function(e){
					if( isMoving ){
						deltaX = isMoving - e.clientX
						if( !isPanning ){
							requestAnimationFrame(scrollToX);
						}
						isPanning = true
					}
				},
				'pointerleave pointerup pointercancel': function(){
					isMoving = 0
					originalX = 0
					illust.on('scroll', scrollHandler).trigger('scroll')
					inputs.filter(':checked').trigger('change')
				}*/
			})
			calcScrollbar()
		}else{
			illustMain.attr('touch-action', 'none')
				.on({
					'pointerdown': function(e){
						if( e.originalEvent.pointerType == 'touch' ){
							isMoving = e.clientX
							let matrix = illust.css('transform').replace(/[^0-9\-.,]/g, '').split(',')
							originalX = parseInt( matrix[12] || matrix[4] || 0 )
						}
					},
					'pointermove': function(e){
						if( isMoving ){
							deltaX = e.clientX - isMoving
							if( !isPanning ){
								requestAnimationFrame(panX);
							}
							isPanning = true
						}
					},
					'pointerleave pointerup pointercancel': function(){
						requestAnimationFrame(function(){
							if( deltaX && Math.abs(deltaX) >= 30 ){
								illust.css('transform', '').removeClass('is-panning')
								let cur = parseInt(inputs.filter(':checked').val()) - 1
								if( deltaX < 0 && cur < inputs.length - 1 ){
									inputs.eq(cur+ Math.floor(illust.width() / (s.outerWidth() * 0.95)) ).prop('checked', true).trigger('change')
								}else if( deltaX > 0 && cur > 0 ){
									inputs.eq(cur-1).prop('checked', true).trigger('change')
								}
							}
							isMoving = 0
							deltaX = 0
						})
						//inputs.filter(':checked').trigger('change')
					}
				})
		}
};