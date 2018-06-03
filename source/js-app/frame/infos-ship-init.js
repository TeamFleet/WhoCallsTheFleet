
_frame.infos.__ship_init = function( $el ){

    { // 按钮：查询装备额外属性加成
        $el.on('click.viewbonuses', '.button-viewbonuses', evt => {
            evt.preventDefault()
            if (evt.target.disabled) return
            modal.bonuses.show('ship', evt.target.getAttribute('data-ship-id'))
        })
    }

    // touch support for illustrations
        let x
            ,originalX = -1
            ,startX
            ,startY
            ,startTime
            ,deltaX
            ,deltaY
            ,isPanning = false
            ,isScrollSnap = ( _huCss.csscheck_full('scroll-snap-type') && !bFirefox )
            //,isScrollSnap = _huCss.csscheck_full('scroll-snap-type')
            //,isMoving = 0
            ,scrollLock = false
            ,mouseWheelLock = false
            ,illustMain = $el.find('.illustrations')
            ,illust = illustMain.find('.body')
            ,imgs = illust.children('span')
            //,s = imgs.eq(0)
            ,n = 'e'+_g.timeNow()
            ,labels = illustMain.children('label')
            ,inputs = illustMain.children('input[type="radio"]')
                        .on('change', function(e, scrollTime){
                            let i = parseInt( e.target.getAttribute('value') ) - 1
                            if( !labels.eq(i).is(':visible') ){
                                i--
                                inputs.eq(i).prop('checked', true)
                            }
                            if( isScrollSnap && !scrollLock ){
                                //illust.scrollLeft( imgs.eq(i)[0].offsetLeft )
                                scrollLock = true
                                illust.off('scroll')
                                    .animate({
                                        scrollLeft:		imgs.eq(i)[0].offsetLeft
                                    }, typeof scrollTime == 'undefined' ? 200 : scrollTime, function(){
                                        setTimeout(function(){
                                            scrollLock = false
                                            illust.on('scroll', scrollHandler)
                                        }, 50)
                                    })
                            }else{
                                
                            }
                        })
            ,illustWidth = 0
            ,inputCur = 0
            ,sCount = 1
            ,extraCount = 0
        
        function count(){
            inputCur = parseInt(inputs.filter(':checked').val()) - 1
            sCount = Math.ceil(inputs.length / labels.filter(':visible').length)
            extraCount = illustMain.hasClass('is-singlelast') && sCount == 2 ? 1 : 0
        }
        function countReset(){
            inputCur = 0
            sCount = 0
            extraCount = 0
        }
        
        function scrollStart(){
            originalX = illust.scrollLeft()
            illustWidth = illust.width()
            count()
        }
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
            //console.log( inputCur , pDelta , sCount )
            if( delta !== 0 ){
                let t = inputCur + pDelta * sCount
                if( t < 0 )
                    t = 0
                if( t + sCount > inputs.length + extraCount )
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

        function _resized(){
            originalX = -1
            inputs.filter(':checked').trigger('change', 0)
            if( isScrollSnap )
                scrollStart()
        }
        function _show( is_firsttime ){
            $window.on('resized.'+n, _resized)
            _resized()
        }
        function _hide(){
            $window.off('resized.'+n)
        }
        $el.on({
            'show': _show,
            'hidden': _hide
        })
        
        // scroll snap
            if( isScrollSnap ){
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
            }else{
                let isActualPanning = false
                    //,lastTick
                function panEnd(){
                    illust.css('transform', '').removeClass('is-panning')
                    originalX = 0
                    startX = 0
                    startY = 0
                    deltaX = 0
                    deltaY = 0
                    countReset()
                    //lastTick = 0
                    isActualPanning = false
                    $(document).off('touchmove.infosShipIllust touchend.infosShipIllust touchcancel.infosShipIllust')
                }
                function panX(){
                    isPanning = false
                    //let now = Date.parse(new Date())
                    //if( now - lastTick > 5 ){
                        let half = ((inputCur <= 0 && deltaX > 0) || (inputCur >= inputs.length - sCount && deltaX < 0))
                        illust/*.addClass('is-panning')*/.css('transform', 'translateX('+(deltaX * (half ? 0.3333 : 1) + originalX)+'px)')
                        //console.log( deltaX * (half ? 0.3333 : 1) + originalX )
                    //}
                    //lastTick = now
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
                    if( !isPanning && (startX || startY) && e.originalEvent.targetTouches.length == 1 ){
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
                            if( t + sCount > inputs.length + extraCount )
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
                                count()
                                illustWidth = illust.width()
                                //lastTick = Date.parse(new Date())
                                
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
    
    // prev/next for illustrations
        function illustShift( direction, jumpToAnotherEdge ){
            if( !direction || scrollLock )
                return

            let t = -10

            count()
            
            if( direction == 1 ){
                t = inputCur + sCount
            }else if( direction == -1 ){
                t = inputCur - 1
            }

            if( t < 0 && t > -10 ){
                if( jumpToAnotherEdge )
                    t = inputs.length - sCount
                else
                    t = 0
            }else if( t + sCount > inputs.length + extraCount ){
                if( jumpToAnotherEdge )
                    t = 0
                else
                    t = inputs.length - sCount
            }

            countReset()

            if( t >= 0 ){
                //illust.off('scroll')
                if( isScrollSnap )
                    scrollStart()
                inputs.eq(t).prop('checked', true).trigger('change')
            }
        }
    
    // mousewheel support for illustrations
        illustMain.on('mousewheel', function(e){
            if( mouseWheelLock || scrollLock || $el.get(0).scrollHeight > $el.get(0).clientHeight )
                return

            let direction
            
            if( isScrollSnap && e.originalEvent.deltaY )
                direction = e.originalEvent.deltaY < 0 ? -1 : 1
            else if( e.originalEvent.wheelDelta )
                direction = e.originalEvent.wheelDelta > 0 ? -1 : 1
            else if( e.originalEvent.deltaX )
                direction = e.originalEvent.deltaX < 0 ? -1 : 1
            else if( e.originalEvent.deltaY )
                direction = e.originalEvent.deltaY < 0 ? -1 : 1
            
            if( direction ){
                mouseWheelLock = true
                illustShift( direction )
                setTimeout(function(){
                    mouseWheelLock = false
                }, 100)
            }
        })
    
    // prev/next button for illustrations
        $('<button class="arrow prev" icon="arrow-left"/>')
            .on('click', function(){
                illustShift( -1, true )
            })
            .insertBefore( inputs.eq(0) )
        $('<button class="arrow next" icon="arrow-right"/>')
            .on('click', function(){
                illustShift( 1, true )
            })
            .insertAfter( labels.eq(labels.length - 1) )
    
};
