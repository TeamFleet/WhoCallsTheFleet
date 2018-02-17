

class TablelistShips extends Tablelist {
    constructor(container, options) {

        super(container, options)

        this.columns = [
            '  ',
            ['火力', 'fire'],
            ['雷装', 'torpedo'],
            ['夜战', 'nightpower'],
            ['对空', 'aa'],
            ['对潜', 'asw'],
            ['耐久', 'hp'],
            ['装甲', 'armor'],
            ['回避', 'evasion'],
            ['搭载', 'carry'],
            ['航速', 'speed'],
            ['射程', 'range'],
            ['索敌', 'los'],
            ['运', 'luck'],
            ['油耗', 'consum_fuel'],
            ['弹耗', 'consum_ammo'],
            ['多立绘', 'extra_illust']
        ]
        this.header_checkbox = []
        this.mode_selection_filters = $()
        //this.checkbox = []
        this.rows = $()
        this.rowsById = {}
        this.rowsByHeader = {}
        //this.last_item = null
        //this.compare_checkbox

        this.functionsOnEnter = []
        this.functionsOnExit = []

        // 标记全局载入状态
        _frame.app_main.loading.push('tablelist_' + this._index)
        _frame.app_main.is_loaded = false

        //_g.log( 'shiplist init', _frame.app_main.loading )

        this.initProgressMax = 0
        this.initProgressCur = 0

        this.dom.container.on({
            //'initdone': function(){
            //	_g.log('tablelist-ships init done')
            //},
            'initprogress': function (e, cur, max) {
                this.initProgressCur = cur || this.initProgressCur
                this.initProgressMax = max || this.initProgressMax
            }
        })

        if (container.children('.tablelist-container').length) {
            this.init_parse()
        }//else if(this.init_new){
        //	this.init_new()
        //}
    }

    compare_btn_show(is_checked) {
        //if( (!is_checked && this.compare_checkbox.filter(':checked').length)
        if ((!is_checked && this.rows.filter('[compare="true"]').length)
            || is_checked
        ) {
            this.dom.msg_container.attr('data-msgs', 'comparestart')
        } else {
            this.dom.msg_container.removeAttr('data-msgs')
        }
    }

    compare_start() {
        // 隐藏底部提示信息
        this.dom.msg_container.removeAttr('data-msgs')

        // 存储当前状态
        this.last_viewtype = this.dom.filter_container.attr('viewtype')
        _config.set('shiplist-viewtype', this.last_viewtype)
        this.last_scrollTop = this.dom.tbody.scrollTop()

        // 更改视图
        this.dom.filter_container.attr('viewtype', 'compare')
        this.dom.tbody.scrollTop(0)
        this.dom.table.addClass('sortable')

        // 计算数据排序排序
        this.mark_high(true)
        this.thead_redraw(500)
    }

    compare_off() {
        this.dom.filter_container.attr('viewtype', this.last_viewtype)
        this.sort_table_restore()
        this.mark_high()
        this.thead_redraw(500)
        this.dom.tbody.scrollTop(this.last_scrollTop)
        this.dom.table.removeClass('sortable')
        delete this.last_viewtype
        delete this.last_scrollTop
    }

    compare_end() {
        //this.compare_checkbox.filter(':checked').prop('checked', false).trigger('change')
        this.rows.filter('[compare="true"]').each(function (i, el) {
            this.check(el, false)
        }.bind(this))
        this.dom.msg_container.removeAttr('data-msgs')
        this.compare_off()
    }

    compare_continue() {
        this.dom.msg_container.attr('data-msgs', 'comparestart')
        this.compare_off()
    }

    contextmenu_show($el, shipId, is_rightclick) {
        if (this.dom.filter_container.attr('viewtype') == 'compare' || $el.attr('data-donotcompare') == 'true')
            return false

        if (!TablelistShips.contextmenu) {
            let createMenu = function () {
                let items = [
                    $('<menuitem/>').html('选择')
                        .on({
                            'click': function (e) {
                                if (_frame.app_main.is_mode_selection())
                                    _frame.app_main.mode_selection_callback(TablelistShips.contextmenu._curid)
                            },
                            'show': function () {
                                if (_frame.app_main.is_mode_selection())
                                    $(this).show()
                                else
                                    $(this).hide()
                            }
                        }),
                    $('<menuitem/>').html('查看资料')
                        .on({
                            'click': function (e) {
                                TablelistShips.contextmenu._curel.trigger('click', [true])
                            }
                        }),

                    $('<menuitem/>').html('将该舰娘加入对比')
                        .on({
                            'click': function (e) {
                                //this.checkbox[TablelistShips.contextmenu._curid]
                                //	.prop('checked', !this.checkbox[TablelistShips.contextmenu._curid].prop('checked'))
                                //	.trigger('change')
                                this.check(this.rowsById[TablelistShips.contextmenu._curid])
                            }.bind(this),
                            'show': function (e) {
                                if (!TablelistShips.contextmenu._curid)
                                    return false

                                if (_g.data.ship_types[_g['data']['ships'][TablelistShips.contextmenu._curid]['type']]['donotcompare'])
                                    $(e.target).hide()
                                else
                                    $(e.target).show()

                                //if( this.checkbox[TablelistShips.contextmenu._curid].prop('checked') )
                                if (this.rowsById[TablelistShips.contextmenu._curid].attr('compare') === 'true')
                                    $(e.target).html('取消对比')
                                else
                                    $(e.target).html('将该舰娘加入对比')
                            }.bind(this)
                        }),

                    $('<div/>').on('show', function (e) {
                        var $div = $(e.target).empty()
                        if (TablelistShips.contextmenu._curid) {
                            var series = _g['data']['ships'][TablelistShips.contextmenu._curid].getSeriesData() || []
                            series.forEach(function (currentValue, i) {
                                if (!i)
                                    $div.append($('<hr/>'))
                                let checkbox = null
                                try {
                                    //checkbox = this.checkbox[currentValue['id']]
                                    checkbox = this.rowsById[currentValue['id']]
                                } catch (e) { }
                                $div.append(
                                    $('<div class="item"/>')
                                        .html('<span>' + _g['data']['ships'][currentValue['id']].getName(true) + '</span>')
                                        .append(
                                            $('<div class="group"/>')
                                                .append(function () {
                                                    var els = $()

                                                    if (_frame.app_main.is_mode_selection()) {
                                                        els = els.add(
                                                            $('<menuitem/>')
                                                                .html('选择')
                                                                .on({
                                                                    'click': function () {
                                                                        if (_frame.app_main.is_mode_selection())
                                                                            _frame.app_main.mode_selection_callback(currentValue['id'])
                                                                    }
                                                                })
                                                        )
                                                    }

                                                    return els
                                                })
                                                .append(
                                                    $('<menuitem data-infos="[[SHIP::' + currentValue['id'] + ']]"/>')
                                                        .html('查看资料')
                                                )
                                                .append(
                                                    $('<menuitem/>')
                                                        .html(
                                                            //checkbox && checkbox.prop('checked')
                                                            checkbox && checkbox.attr('compare') === 'true'
                                                                ? '取消对比'
                                                                : '加入对比'
                                                        )
                                                        .on({
                                                            'click': function (e) {
                                                                if (checkbox) {
                                                                    //this.checkbox[currentValue['id']]
                                                                    //	.prop('checked', !checkbox.prop('checked'))
                                                                    //	.trigger('change')
                                                                    this.check(checkbox)
                                                                }
                                                            }.bind(this)
                                                        })
                                                )
                                        )
                                )
                            }, this)
                        }
                    }.bind(this))
                ]

                if (TablelistShips.contextmenu) {
                    if (TablelistShips.contextmenu.showing) {
                        TablelistShips.contextmenu.hide(function () {
                            TablelistShips.contextmenu.dom.body.empty()
                            items.forEach(function (item) {
                                item.appendTo(TablelistShips.contextmenu.dom.body)
                            })
                            if (TablelistShips.contextmenu._is_rightclick)
                                TablelistShips.contextmenu.show(
                                    TablelistShips.contextmenu._is_rightclick.x,
                                    TablelistShips.contextmenu._is_rightclick.y
                                )
                            else
                                TablelistShips.contextmenu.show(TablelistShips.contextmenu._curel)
                        })
                    } else {
                        TablelistShips.contextmenu.dom.body.empty()
                        items.forEach(function (item) {
                            item.appendTo(TablelistShips.contextmenu.dom.body)
                        })
                    }
                } else {
                    TablelistShips.contextmenu = new _menu({
                        'className': 'contextmenu-ship',
                        'items': items
                    })
                }

                return TablelistShips.contextmenu
            }.bind(this)
            if (!this.is_init) {
                TablelistShips.contextmenu = new _menu({
                    'className': 'contextmenu-ship',
                    'items': [$('<menuitem/>').html('数据处理中，请稍候……　　')]
                })
                this.dom.container.on({
                    'initprogress': function (e, cur, max) {
                        if (TablelistShips.contextmenu.showing) {
                            TablelistShips.contextmenu.dom.body.empty().append(
                                $('<menuitem/>').html(`数据处理中，请稍候 (${((cur / max) * 100).toFixed(1)}%)`)
                            )
                        }
                    },
                    'initdone': function () {
                        createMenu()
                    }
                })
            } else {
                createMenu()
            }
        }

        TablelistShips.contextmenu._curid = shipId || $el.data('shipid')
        TablelistShips.contextmenu._curel = $el

        if (is_rightclick) {
            TablelistShips.contextmenu._is_rightclick = {
                'x': is_rightclick.clientX,
                'y': is_rightclick.clientY
            }
            TablelistShips.contextmenu.show(is_rightclick.clientX, is_rightclick.clientY)
        } else {
            TablelistShips.contextmenu._is_rightclick = false
            TablelistShips.contextmenu.show($el)
        }
    }

    init_parse() {
        { // 生成过滤器与选项
            this.dom.filter_container = this.dom.container.children('.options')
            this.dom.filters = this.dom.filter_container.children('.filters')
            this.dom.exit_compare = this.dom.filter_container.children('.exit_compare')
        }
        { // 结束对比
            this.dom.exit_compare.children('button[icon="arrow-set2-left"]').on('click', function () {
                this.compare_end()
            }.bind(this))
        }
        { // 继续选择
            this.dom.exit_compare.children('button[icon="checkbox-checked"]').on('click', function () {
                this.compare_continue()
            }.bind(this))
        }
        { // 点击表格标题可排序
            this.dom.btn_compare_sort = this.dom.exit_compare.children('button[icon="sort-amount-desc"]')
                .on('click', function () {
                    if (!this.dom.btn_compare_sort.hasClass('disabled'))
                        this.sort_table_restore()
                }.bind(this))
        }
        { // 搜索
            this.dom.search = $('<p class="search"/>').prependTo(this.dom.filters)
                .append(this.dom.searchInput =
                    $('<input type="search" placeholder="搜索舰娘..."/>')
                        .on({
                            'input': function (e) {
                                //if( e.target.value.length > 1 || !e.target.value.length ){
                                clearTimeout(this.searchDelay)
                                this.searchDelay = setTimeout(function () {
                                    this.search(e.target.value)
                                }.bind(this), 100)
                                //}
                            }.bind(this),
                            'focus': function () {
                                this.dom.search.addClass('on')
                            }.bind(this),
                            'blur': function (e, force) {
                                if (force || !this.dom.container.hasClass('mod-search'))
                                    this.dom.search.removeClass('on')
                            }.bind(this)
                        })
                )
        }
        { // 仅显示同种同名舰最终版本
            this.dom.btn_hide_premodel = this.dom.filters.find('[name="hide-premodel"]')
                .prop('checked', _config.get('shiplist-filter-hide-premodel') === 'false' ? null : true)
                .on('change', function (e) {
                    _config.set('shiplist-filter-hide-premodel', this.dom.btn_hide_premodel.prop('checked'))
                    this.dom.filter_container.attr('filter-hide-premodel', this.dom.btn_hide_premodel.prop('checked'))
                    this.thead_redraw()
                }.bind(this))
        }
        { // 视图切换
            this.dom.filters.find('[name="viewtype"]').each(function (index, $el) {
                $el = $($el)
                let viewtype = _config.get('shiplist-viewtype') || 'card'
                if ($el.val() == viewtype)
                    $el.prop('checked', true)
                $el.on('change', function (e) {
                    if ($el.is(':checked')) {
                        _config.set('shiplist-viewtype', $el.val())
                        this.dom.filter_container.attr('viewtype', $el.val())
                        this.thead_redraw()
                    }
                }.bind(this))
            }.bind(this))
            this.dom.filters.find('input').trigger('change')
        }

        { // 生成表格框架
            this.dom.table = this.dom.container.children('.tablelist-container')
            this.dom.thead = this.dom.table.children('.tablelist-header')
                .on('click', '[stat]', function (e) {
                    this.sort_table_from_theadcell($(e.currentTarget))
                }.bind(this))
            this.dom.tbody = this.dom.table.children('.tablelist-body')
                .on('contextmenu.contextmenu_ship', '[data-shipid]', function (e) {
                    this.contextmenu_show($(e.currentTarget), null, e)
                    e.preventDefault()
                }.bind(this))
                /*.on('click.contextmenu_ship', '[data-shipid]>strong>em', function(e){
                        this.contextmenu_show($(e.currentTarget).parent().parent())
                        e.stopImmediatePropagation()
                        e.stopPropagation()
                    }.bind(this))*/
                .on('click', '[data-shipid]', function (e, forceInfos) {
                    if (e.target.tagName.toLowerCase() == 'label') {
                        //this.checkbox[e.currentTarget.getAttribute('data-shipid')]
                        //	.prop('checked', !this.checkbox[e.currentTarget.getAttribute('data-shipid')].prop('checked'))
                        //	.trigger('change')
                        this.check(e.currentTarget)
                        e.stopPropagation()
                    } else if (e.target.tagName.toLowerCase() == 'em') {
                        this.contextmenu_show($(e.target), e.currentTarget.getAttribute('data-shipid'))
                        e.preventDefault()
                        e.stopImmediatePropagation()
                        e.stopPropagation()
                    } else if (!forceInfos && _frame.app_main.is_mode_selection()) {
                        e.preventDefault()
                        e.stopImmediatePropagation()
                        e.stopPropagation()
                        if (!e.currentTarget.getAttribute('data-donotcompare'))
                            _frame.app_main.mode_selection_callback(e.currentTarget.getAttribute('data-shipid'))
                    }
                    this.dom.searchInput.trigger('blur', [true])
                }.bind(this))
        }

        { // 生成底部内容框架
            this.dom.msg_container = this.dom.container.children('.msgs')
            if (_config.get('hide-compareinfos'))
                this.dom.msg_container.removeAttr('data-msgs')
            else
                this.dom.msg_container.attr('data-msgs', 'compareinfos')
        }

        { // 处理所有舰娘数据
            //if( _g.data.ship_types ){
            this.parse_all_items()
            //}
        }

        // 生成部分底部内容
        let compareinfos = this.dom.msg_container.children('.compareinfos')
        compareinfos.children('button').on('click', function () {
            this.dom.msg_container.removeAttr('data-msgs')
            _config.set('hide-compareinfos', true)
        }.bind(this))
        this.dom.msg_container.children('.comparestart')
            .on('click', function () {
                this.compare_start()
            }.bind(this))

        { // 活动
            let event
            if (_g.getCurrentEvent().some(e => {
                if (e.code === 'leyteB') {
                    event = e
                    return true
                }
                return false
            })) {
                const filters = [
                    [false, '全部'],
                    ['kurita', '栗田'],
                    ['ozawa', '小泽'],
                    ['nishimura', '西村'],
                    ['shima', '志摩'],
                    ['shima_transport', '志摩 (运输)'],
                    ['squadron16', '第16战队 (运兵)'],
                    ['off', '无所属'],
                ]
                const els = {}
                const filter = (filter) => {
                    for (const key in els) {
                        els[key].removeClass('on')
                    }
                    if (filter) {
                        els[filter].addClass('on')
                        this.dom.container
                            .attr('data-leyte-fleet', filter)
                    } else {
                        els._.addClass('on')
                        this.dom.container
                            .removeAttr('data-leyte-fleet')
                    }
                }
                const container =
                    $('<div class="event-container"/>')
                        .insertAfter(this.dom.filter_container)
                filters.forEach(o => {
                    const type = o[0]
                    const name = o[1]
                    els[type || '_'] = $('<span/>', {
                        class: 'filter',
                        'data-leyte-fleet': type || undefined,
                        html: name
                    })
                        .on('click', () => filter(type))
                        .appendTo(container)
                })
                console.log(els)
                filter(false)
                { // 重置过滤器
                    const reset = () => {
                        filter(false)
                    }
                    reset()
                    this.functionsOnEnter.push(reset)
                    this.functionsOnExit.push(reset)
                }
            }
        }
    }

    parse_all_items() {
        let deferred = Q.defer()
            , chain = Q.fcall(function () { })
            , trs = this.dom.tbody.children('h4, dl')

        trs.each(function (index, tr) {
            chain = chain.then(function () {
                //console.log(index)
                tr = $(tr)
                tr.attr('trindex', index)
                let deferred = Q.defer()
                let ship_id = tr.attr('data-shipid')
                let header_index = tr.attr('data-header')
                if (!this.rowsByHeader[header_index])
                    this.rowsByHeader[header_index] = $()
                if (tr[0].tagName == 'H4') {
                    let checkbox = tr.find('input[type="checkbox"]')
                        .on({
                            'change': function () {
                                this.rowsByHeader[header_index].filter(':visible').each(function (i, el) {
                                    this.check(el, checkbox.prop('checked'), true)
                                }.bind(this))
                            }.bind(this),
                            'docheck': function () {
                                // ATTR: compare
                                var trs = this.rowsByHeader[header_index].filter(':visible')
                                    , checked = trs.filter('[compare="true"]')
                                if (!checked.length) {
                                    checkbox.prop({
                                        'checked': false,
                                        'indeterminate': false
                                    })
                                } else if (checked.length < trs.length) {
                                    checkbox.prop({
                                        'checked': false,
                                        'indeterminate': true
                                    })
                                } else {
                                    checkbox.prop({
                                        'checked': true,
                                        'indeterminate': false
                                    })
                                }
                            }.bind(this)
                        })
                    this.header_checkbox[header_index] = checkbox

                    // 舰种显示/隐藏相关元素
                    this.mode_selection_filters.add(
                        $('<input/>', {
                            'value': header_index,
                            'type': 'checkbox',
                            'class': 'shiptype',
                            'id': 'shiptype-' + header_index
                        }).prop('checked', !header_index).prependTo(this.dom.container)
                    )
                    $('<label/>', {
                        'for': 'shiptype-' + header_index,
                        'class': 'shiptype'
                    }).prependTo(tr)
                    tr.attr('inited', true)
                } else if (ship_id) {
                    this.rowsByHeader[header_index] = this.rowsByHeader[header_index].add(tr)
                    this.rowsById[ship_id] = tr
                    this.rows = this.rows.add(tr)
                }
                this.dom.container.trigger('initprogress', [(index + 1), trs.length])
                setTimeout(deferred.resolve, 0)
                //deferred.resolve()
                return deferred.promise
            }.bind(this))
        }.bind(this))

        //this.compare_checkbox = this.dom.tbody.find('input[type="checkbox"].compare')

        chain = chain.then(function () {
            this.mark_high()
            this.thead_redraw()
            this.is_init = true
            this.dom.container.trigger('initdone')
            deferred.resolve()
        }.bind(this))

            .catch(function (err) {
                _g.log(err)
            })

        _frame.app_main.loaded('tablelist_' + this._index, true)

        return deferred.promise
    }

    check(row, checked, not_trigger_check) {
        if (row.length)
            row = row[0]

        if (typeof checked == 'undefined' || checked === null)
            checked = !(row.getAttribute('compare') == 'true')

        if (checked)
            row.setAttribute('compare', 'true')
        else
            row.removeAttribute('compare')

        this.compare_btn_show(checked)

        if (!not_trigger_check)
            this.header_checkbox[parseInt(row.getAttribute('data-header'))].trigger('docheck')
    }

    search(query) {
        if (!this.dom.style)
            this.dom.style = $('<style/>').appendTo(this.dom.container)

        if (!query) {
            this.dom.container.removeClass('mod-search')
            this.dom.filter_container.attr('filter-hide-premodel', this.dom.btn_hide_premodel.prop('checked'))
            this.dom.style.empty()
            return query
        }

        query = _g.search(query, 'ships')

        if (!query.length) {
            return query
        }

        this.dom.container.addClass('mod-search')
        this.dom.filter_container.attr('filter-hide-premodel', false)

        let r = '.tablelist.ships .tablelist-body dl:not(:empty)'
        query.forEach(function (ship) {
            r += `:not([data-shipid="${ship.id}"])`
        })
        r += `{display:none!important}`

        this.dom.style.html(r)

        return query
    }

    onEnter() {
        console.log('tablelist-ship on-enter')
        this.functionsOnEnter.forEach(func => {
            if (typeof func === 'function')
                func()
        })
    }

    onExit() {
        console.log('tablelist-ship on-exit')
        this.functionsOnExit.forEach(func => {
            if (typeof func === 'function')
                func()
        })
    }
}
