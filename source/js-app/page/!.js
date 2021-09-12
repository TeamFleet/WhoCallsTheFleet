class Page {
    constructor($page) {
        this.lastScrollY = 0

        $page.on({
            'pageHide': function () {
                this.modeSelectionExit()
            }.bind(this)
        })
    }

    modeSelectionEnter(callback_select, callback_enter) {
        let _callback_select

        callback_select = callback_select || function () { }
        _callback_select = function () {
            //callback_select.apply( callback_select, arguments )
            callback_select(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], arguments[10])
            setTimeout(function () {
                this.modeSelectionExit()
            }.bind(this), 10)
        }.bind(this)

        _frame.app_main.mode_selection_callback = _callback_select

        _frame.app_main.mode_selection_on(callback_enter)

        return _callback_select
    }

    modeSelectionExit() {
        if (!_frame.dom.layout.hasClass('mode-selection'))
            return false

        _frame.app_main.mode_selection_off()
    }
}

Page.hide = function (page) {
    // console.log(`========== Page hiding: ${page} ==========`)
    // const t0 = performance.now()
    page = page || _frame.app_main.cur_page
    if (typeof page == 'string') {
        if (_frame.app_main.page_dom[page])
            _frame.app_main.page_dom[page].addClass('off').trigger('pageHide').detach()
        if (_frame.dom.navs[page])
            _frame.dom.navs[page].removeClass('on')
    } else {
        page.addClass('off').trigger('pageHide').detach()
        let p = page.attr('page')
        if (p && _frame.dom.navs[p])
            _frame.dom.navs[p].removeClass('on')
    }
    _frame.app_main.cur_page = null
    // const t1 = performance.now()
    // console.log(`========== Page hide: ${page}, took ${t1 - t0}ms ==========`)
}

Page.show = function (page) {
    // console.log(`========== Page Showing: ${page} ==========`)
    // const t0 = performance.now()

    page = page || _frame.app_main.cur_page
    let p

    if (typeof page == 'string') {
        if (_frame.app_main.page_dom[page])
            _frame.app_main.page_dom[page].appendTo(_frame.dom.main).removeClass('off').trigger('pageShow')
        if (_frame.dom.navs[page])
            _frame.dom.navs[page].addClass('on')
        p = page
    } else {
        page.appendTo(_frame.dom.main).removeClass('off').trigger('pageShow')
        p = page.attr('page')
    }

    // 关闭之前的页面
    if (_frame.app_main.cur_page)
        Page.hide(_frame.app_main.cur_page)

    if (p) {
        if (_frame.dom.navs[p])
            _frame.dom.navs[p].addClass('on')
        //_frame.dom.main.attr('data-theme', p)
        _frame.dom.layout.attr('data-theme', p)
        _frame.app_main.cur_page = p
    }

    // const t1 = performance.now()
    // console.log(`========== Page Showed: ${page}, took ${t1 - t0}ms ==========`)
}

Page.resetScroll = function (page) {
    page = page || _frame.app_main.cur_page
    if (typeof page == 'string')
        page = _frame.app_main.page_dom[page]

    if (page && page.length) {
        page.attr('scrollbody', 0)
        page.find('[scrollbody]').each(function (i, el) {
            el.setAttribute('scrollbody', 0)
        })
    }
}

Page.init = function (page) {
    // if (_g.v1Frame) {
    //     return
    // }
    page = page || _frame.app_main.cur_page
    let p

    if (typeof page == 'string') {
        p = page
        page = _frame.app_main.page_dom[page]
    } else {
        page.appendTo(_frame.dom.main).removeClass('off').trigger('pageShow')
        p = page.attr('page')
    }

    if (!page || !page.length)
        return

    // function handlerScroll(e) {
    //     //$(e.currentTarget).data('scrollTop', e.currentTarget.scrollTop)
    //     e.currentTarget.setAttribute('scrollbody', e.currentTarget.scrollTop)
    // }

    if (p && _frame.app_main.page[p] && _frame.app_main.page[p].init)
        _frame.app_main.page[p].init(page)
    _p.initDOM(page)

    // page.find('[scrollbody]').on('scroll', handlerScroll)

    page.on({
        // 'scroll': handlerScroll,
        'pageShow.scrollbody': function () {
            // console.log('pageShow.scrollbody', page, page.attr('scrollbody'))
            page.scrollTop(page.attr('scrollbody') || 0)
            page.find('[scrollbody]').each(function (i, el) {
                //el.scrollTop = $(el).data('scrollTop')
                // console.log(
                //     'pageShow.scrollbody',
                //     el,
                //     el.getAttribute('scrollbody')
                // )
                el.scrollTop = el.getAttribute('scrollbody') || 0
                // setTimeout(function () {
                //     console.log(
                //         'pageShow.scrollbody',
                //         el,
                //         el.getAttribute('scrollbody')
                //     )
                //     el.scrollTop = el.getAttribute('scrollbody') || 0
                // }, 10)
            })
        }
    })
}
