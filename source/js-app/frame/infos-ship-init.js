
_frame.infos.__ship_init = function( $el ){
	let x
		,originalX = -1
		,startX
		,startY
		,startTime
		,deltaX
		,deltaY
		,isPanning = false
		,isScrollSnap = ( _huCss.csscheck_full('scroll-snap-type') && !bFirefox )
		//,isMoving = 0
		,illustMain = $el.find('.illustrations')
		,illust = illustMain.children('div')
		,imgs = illust.children('span')
		,s = imgs.eq(0)
		,labels = illustMain.children('label')
		,inputs = illustMain.children('input[type="radio"]')
					.on('change', function(e, scrollTime){
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
								}, typeof scrollTime == 'undefined' ? 200 : scrollTime, function(){
									illust.on('scroll', scrollHandler)
								})
						}else{
							
						}
					})
		,illustWidth = 0
		,inputCur = 0
		,sCount = 1
	
	function scrollHandler(){
		if( originalX >= 0 ){
			x = illust.scrollLeft()
			if( !isPanning ){
				requestAnimationFrame(scrollX);
			}
			isPanning = true
		}
	}
	function scrollX(){
		let delta = x - originalX
			,pDelta = (Math.floor(Math.abs(delta) / illustWidth) + (Math.abs(delta % illustWidth) > (illustWidth / 2) ? 1 : 0) )
						* (x < originalX ? -1 : 1)
			//,pDelta = Math.abs(delta % illustWidth) > (illustWidth / 3) ? Math.ceil(delta / illustWidth) : Math.floor(delta / illustWidth)
		//console.log(delta, pDelta)
		isPanning = false
		if( delta !== 0 ){
			let t = inputCur + pDelta * sCount
			if( t < 0 )
				t = 0
			if( t + sCount > inputs.length )
				t = inputs.length - sCount
			//inputs.eq(t).prop('checked', true).trigger('change')
			inputs.eq(t).prop('checked', true)
		}
		//inputs.eq( Math.floor(x / (s.outerWidth() * 0.95)) ).prop('checked', true)
	}
	//function scrollToX(){
	//	isPanning = false
	//	illust.scrollLeft( originalX + deltaX )
	//}
	
	// scroll snap
		if( isScrollSnap ){
			let n = 'e'+_g.timeNow()
			function scrollStart(){
				originalX = illust.scrollLeft()
				illustWidth = illust.width()
				inputCur = parseInt(inputs.filter(':checked').val()) - 1
				sCount = Math.floor(illustWidth / (s.outerWidth() * 0.95))
			}
			function _resized(){
				originalX = -1
				inputs.filter(':checked').trigger('change', 0)
				scrollStart()
			}
			function _show( is_firsttime ){
				$window.on('resized.'+n, _resized)
				_resized()
			}
			function _hide(){
				$window.off('resized.'+n)
			}
			illustMain.addClass('mod-scroll-snap')
			illust.on({
				'scroll': scrollHandler,
				'pointerdown': function(e){
					if( originalX < 0 && e.originalEvent.pointerType == 'touch' ){
						scrollStart()
					}
				},
				'touchstart': function(){
					if( originalX < 0 ){
						scrollStart()
					}
				}
			})
			$el.on({
				'show': _show,
				'hidden': _hide
			})
		}else{
			let isActualPanning = false
			function panEnd(){
				illust.css('transform', '').removeClass('is-panning')
				originalX = 0
				startX = 0
				startY = 0
				deltaX = 0
				deltaY = 0
				sCount = 0
				isActualPanning = false
				$(document).off('touchmove.infosShipIllust touchend.infosShipIllust touchcancel.infosShipIllust')
			}
			function panX(){
				isPanning = false
				let half = ((inputCur <= 0 && deltaX > 0) || (inputCur >= inputs.length - sCount && deltaX < 0))
				illust/*.addClass('is-panning')*/.css('transform', 'translateX('+(deltaX * (half ? 0.3333 : 1) + originalX)+'px)')
			}
			function panHandler(){
				//if( originalX >= 0 ){
					if( !isPanning ){
						requestAnimationFrame(panX);
					}
					isPanning = true
				//}
			}
			function bodyTouchMove(e){
				if( (startX || startY) && e.originalEvent.targetTouches.length == 1 ){
					deltaX = e.originalEvent.targetTouches[0].clientX - startX
					if( isActualPanning ){
						panHandler()
					}else{
						deltaY = e.originalEvent.targetTouches[0].clientY - startY
						let absX = Math.abs(deltaX)
							,absY = Math.abs(deltaY)
						if( (absX < 20 && absY < 20) || absX > absY ){
							//console.log('pan pending')
							e.preventDefault()
							if( absX > absY ){
								//console.log('pan X')
								isActualPanning = true
								illust.addClass('is-panning')
								panHandler()
							}
						}else{
							//console.log('pan Y')
							panEnd()
						}
					}
				}
			}
			function bodyTouchEnd(e){
				requestAnimationFrame(function(){
					if( deltaX && (Math.abs(deltaX) > illustWidth / 3 || _g.timeNow() - startTime < 300) ){
						let t
						if( deltaX < 0 && inputCur < inputs.length - 1 ){
							t = inputCur + sCount
						}else if( deltaX > 0 && inputCur > 0 ){
							t = inputCur - 1
						}
						if( t < 0 )
							t = 0
						if( t + sCount > inputs.length )
							t = inputs.length - sCount
						inputs.eq(t).prop('checked', true).trigger('change')
					}
					panEnd()
				})
				//inputs.filter(':checked').trigger('change')
			}
			illustMain
				.on({
					'touchstart': function(e){
						if( e.originalEvent.targetTouches && e.originalEvent.targetTouches.length == 1 ){
							let matrix = illust.css('transform').replace(/[^0-9\-.,]/g, '').split(',')
							originalX = parseInt( matrix[12] || matrix[4] || 0 )
							startX = e.originalEvent.targetTouches[0].clientX
							startY = e.originalEvent.targetTouches[0].clientY
							startTime = _g.timeNow()
							inputCur = parseInt(inputs.filter(':checked').val()) - 1
							sCount = Math.floor(illust.width() / (s.outerWidth() * 0.95))
							illustWidth = illust.width()
							
							$(document).on({
								'touchmove.infosShipIllust': bodyTouchMove,
								'touchend.infosShipIllust': bodyTouchEnd,
								'touchcancel.infosShipIllust': bodyTouchEnd
							})
						}
					},
					'touchmove': function(e){
						if( isActualPanning )
						e.preventDefault()
					}
				})
			/* PEPjs
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
			*/
		}
};