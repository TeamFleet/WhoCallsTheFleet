// 舰娘信息

_frame.infos.__ship = function (id) {
    var d = _g.data.ships[id]

    _g.log(d)

    function _val(val, show_zero) {
        if (typeof val != 'number')
            val = parseInt(val)
        if (isNaN(val) || val < 0)
            return '<small class="zero">?</small>'
        if (!show_zero && val == 0)
            return '<small class="zero">-</small>'
        return val
    }

    function _add_stat(name, title, tar) {
        let val99, valMax

        switch (name) {
            case 'hp':
                val99 = _val(d.getAttribute('hp', 99)) + '<sup>+' + (d.getStatExtraMax('hp', 99) || 0) + '</sup>'
                valMax = _val(d.getAttribute('hp', _g.shipMaxLv)) + '<sup>+' + (d.getStatExtraMax('hp', 100) || 0) + '</sup>'
                break;
            case 'asw':
                val99 = d.getAttribute('asw', 99)
                if (val99 || /^(5|8|9|12|24|30)$/.test(d['type'])) {
                    var sup = '<sup>+' + (d.getStatExtraMax('asw') || 0) + '</sup>'
                    val99 = _val(d.getAttribute('asw', 99), true) + sup
                    valMax = _val(d.getAttribute('asw', _g.shipMaxLv), true) + sup
                } else {
                    val99 = _val(0, false)
                    valMax = _val(0, false)
                }
                break;
            case 'evasion':
            case 'los':
                val99 = _val(d.getAttribute(name, 99))
                valMax = _val(d.getAttribute(name, _g.shipMaxLv))
                break;
            case 'speed':
                val99 = _g.getStatSpeed(d['stat']['speed'])
                break;
            case 'range':
                val99 = _g.getStatRange(d['stat']['range'])
                break;
            case 'luck':
                val99 = d['stat']['luck'] + '<sup>' + _val(d['stat']['luck_max']) + '</sup>'
                valMax = (d['stat']['luck'] + 3) + '<sup>' + _val(d['stat']['luck_max']) + '</sup>'
                break;
            case 'fuel':
            case 'ammo':
                val99 = _val(d.getAttribute(name, 99))
                valMax = _val(d.getAttribute(name, _g.shipMaxLv))
                break;
            default:
                val99 = _val(d.getAttribute(name, 99))
                break;
        }

        $('<span/>')
            .html('<small class="stat-' + name + '">' + title + '</small>'
            + '<em' + (valMax ? ' class="lvl99"' : '') + '>' + val99 + '</em>'
            + (valMax ? '<em class="lvl150">' + valMax + '</em>' : '')
            //+ '<em class="lvl99'+( !val150 ? ' lvl150' : '' )+'">' + val99 + '</em>'
            //+ ( val150 ? '<em class="lvl150">' + val150 + '</em>' : '' )
            )
            .appendTo(tar)
    }

    //_frame.modal.resetContent()

    var dom = $('<div class="infos-ship"/>').attr('data-infos-title', d._name + ' - 舰娘')
        , ship_name = d.getName(_g.joint) || '舰娘'
        , illustrations = []
        , illustrationsExtra = []
        , has_no = d['no'] && parseInt(d['no']) < 500 ? true : false

    { // 名称 & 舰种 & 舰级
        $('<div class="title"/>')
            .html('<h2 data-content="' + ship_name + '">' + ship_name + '</h2>'
            + '<small>'
            + '<span data-tip="' + (has_no ? '图鉴编号' : '无图鉴编号') + '">No.'
            + (has_no
                ? d['no']
                : '-'
            )
            + '</span>'
            + (d['class'] ? _g['data']['ship_classes'][d['class']].name.zh_cn + '级' : '')
            + (d['class_no'] ? '<em>' + d['class_no'] + '</em>号舰' : '')
            + (d['type'] ? ' / ' + _g['data']['ship_types'][d['type']].name.zh_cn : '')
            + '</small>'
            ).appendTo(dom)
    }

    { // 属性
        //var lvlRadio99_id = '_input_g' + parseInt(_g.inputIndex)
        //	,lvlRadio150_id = '_input_g' + (parseInt(_g.inputIndex) + 1)
        var lvlRadio99_id = id + '_stat_lv_99'
            , lvlRadio150_id = id + '_stat_lv_150'
            , curLvl = parseInt(_config.get('ship_infos_lvl') || 99)
            , stats = $('<div class="stats"/>')
                .html('<div class="title">'
                + '<h4 data-content="基础属性">基础属性</h4>'
                + '<span>'
                + '<label for="' + lvlRadio99_id + '" class="lvl99">99</label>'
                + '<label for="' + lvlRadio150_id + '" class="lvl150">' + _g.shipMaxLv + '</label>'
                + '</span>'
                + '</div>'
                )
                .prepend($('<input type="radio" name="ship_infos_lvl_' + id + '" id="' + lvlRadio99_id + '" value="99" checked/>')
                    .prop('checked', curLvl == 99)
                    .on('change', function () {
                        _config.set('ship_infos_lvl', 99)
                    })
                )
                .prepend($('<input type="radio" name="ship_infos_lvl_' + id + '" id="' + lvlRadio150_id + '" value="150"/>')
                    .prop('checked', curLvl == 150)
                    .on('change', function () {
                        _config.set('ship_infos_lvl', 150)
                    })
                )
                .appendTo(dom)
            , stat1 = $('<div class="stat"/>').appendTo(stats)
            , stat2 = $('<div class="stat"/>').appendTo(stats)
            , stat3 = $('<div class="stat"/>').appendTo(stats)
            , stat_consum = $('<div class="stat consum"/>').appendTo(stats)

        _g.inputIndex += 2

        _add_stat('hp', '耐久', stat1)
        _add_stat('armor', '装甲', stat1)
        _add_stat('evasion', '回避', stat1)
        _add_stat('carry', '搭载', stat1)

        _add_stat('fire', '火力', stat2)
        _add_stat('torpedo', '雷装', stat2)
        _add_stat('aa', '对空', stat2)
        _add_stat('asw', '对潜', stat2)

        _add_stat('speed', '航速', stat3)
        _add_stat('range', '射程', stat3)
        _add_stat('los', '索敌', stat3)
        _add_stat('luck', '运', stat3)

        _add_stat('fuel', '油耗', stat_consum)
        _add_stat('ammo', '弹耗', stat_consum)
    }

    { // 初始装备 & 搭载量
        var equips = $('<div class="equipments"/>').html('<h4 data-content="初始装备 & 搭载量">初始装备 & 搭载量</h4>').appendTo(dom)
            , i = 0

        while (i < 4) {
            var equip = $('<a/>').appendTo(equips)
                , icon = $('<i/>').appendTo(equip)
                , name = $('<small/>').appendTo(equip)
                , slot = $('<em/>').appendTo(equip)

            if (typeof d['slot'][i] == 'undefined') {
                equip.addClass('no')
            } else if (typeof d['equip'][i] == 'undefined' || !d['equip'][i] || d['equip'][i] === '') {
                equip.addClass('empty')
                name.html('--未装备--')
                slot.html(d['slot'][i])
            } else {
                //,item_icon = 'assets/images/itemicon/'
                //				+ item_data.getIconId()
                //				+ '.png'
                const equipmentId = typeof d.equip[i] === 'object' ? d.equip[i].id : d.equip[i]
                const item_data = _g.data.items[equipmentId]
                const star = typeof d.equip[i] === 'object' ? d.equip[i].star : undefined
                equip.attr({
                    'data-equipmentid': equipmentId,
                    'data-tip-position': 'left',
                    'data-infos': '[[EQUIPMENT::' + equipmentId + ']]',
                    'data-tip': '[[EQUIPMENT::' + equipmentId + ']]',
                    'href': '?infos=equipment&id=' + equipmentId
                })
                name.html(
                    item_data.getName(true)
                    + (star ? `<span class="star">${star}</span>` : '')
                )
                slot.html(d['slot'][i])
                icon.addClass('equiptypeicon mod-' + item_data.getIconId())
                //icon.css(
                //	'background-image',
                //	'url(' + item_icon + ')'
                //)
            }
            i++
        }
    }

    { // 近代化改修（合成）
        var modernization = $('<div class="modernization"/>').html('<h4 data-content="合成">合成</h4>').appendTo(equips)
            , has_modernization = false
        const stats = $('<div class="stats"/>').appendTo(modernization)
        if (d['modernization'])
            d['modernization'].forEach(function (currentValue, i) {
                if (currentValue) {
                    has_modernization = true
                    var stat
                    switch (i) {
                        case 0: stat = 'fire'; break;
                        case 1: stat = 'torpedo'; break;
                        case 2: stat = 'aa'; break;
                        case 3: stat = 'armor'; break;
                    }
                    $('<span class="stat-' + stat + '"/>').html('+' + currentValue).appendTo(stats)
                }
            })
        // まるゆ
        if (d['id'] == 163)
            $('<span class="stat-luck"/>').html('+1.2').appendTo(stats)
        if (d['id'] == 402)
            $('<span class="stat-luck"/>').html('+1.6').appendTo(stats)
        if (!has_modernization)
            modernization.addClass('no').append($('<em/>').html('-'))
    }

    // 可额外装备
    if (d['additional_item_types'] && d['additional_item_types'].length) {
        var additional_equipment_types = $('<div class="add_equip"/>').appendTo(dom)
            , _additional_equipment_types = $('<div/>').html('<h4 data-content="额外装备类型">额外装备类型</h4>').appendTo(additional_equipment_types)
        d['additional_item_types'].forEach(function (currentValue) {
            let _d = _g['data']['item_types'][currentValue]
            _additional_equipment_types.append(
                $('<span/>')
                    .html(_d['name'][_g.lang])
                    .addClass('equiptypeicon mod-left mod-' + _d['icon'])
                //.css({
                //	'background-image': 'url(assets/images/itemicon/'
                //			+ _d['icon']
                //			+ '.png'+')'
                //})
            )
        })
    }

    // 其他额外信息
    if (d['additional_night_shelling']) {
        $('<div class="add_equip add_other"/>')
            .html(`<div>
                    <h4 data-content="额外能力">额外能力</h4>
                    <span>夜战炮击</span>
                </div>`).appendTo(dom)
    }

    // 声优 & 画师 & 消耗
    let cvId = d.getRel('cv')
        , illustratorId = d.getRel('illustrator')
        , cvLink = $('<a/>', {
            'class': 'entity'
        })
            .html('<strong>声优</strong>'
            + '<span>' + (d._cv || '?') + '</span>'
            )
            .appendTo(dom)
        , illustratorLink = $('<a/>', {
            'class': 'entity'
        })
            .html('<strong>画师</strong>'
            + '<span>' + (d._illustrator || '?') + '</span>'
            )
            .appendTo(dom)
    if (cvId)
        cvLink.attr({
            'href': '?infos=entity&id=' + cvId,
            'data-infos': '[[ENTITY::' + cvId + ']]'
        })
    if (illustratorId)
        illustratorLink.attr({
            'href': '?infos=entity&id=' + illustratorId,
            'data-infos': '[[ENTITY::' + illustratorId + ']]'
        })
    /*
var consum = $('<span class="consum"/>').html('<strong>消耗</strong>').appendTo(dom)
_add_stat( 'fuel', 		'', _val( d['consum']['fuel'] ),		consum )
_add_stat( 'ammo', 		'', _val( d['consum']['ammo'] ),		consum )
*/

    // 图鉴
    // illustrations
    var illusts = $('<aside class="illustrations"/>').appendTo(dom)
        , illusts_wrapper = $('<div class="wrapper"/>').appendTo(illusts)
        , illusts_container = $('<div class="body"/>').appendTo(illusts_wrapper)

    // 改造信息
    //var remodels = $('<div class="remodels"/>').html('<h4 data-content="改造">改造</h4>').appendTo(dom)
    let remodels = $('<div class="remodels"/>').html('<h4 data-content="改造">改造</h4>').insertBefore(illusts)
        , remodels_container = _p.el.flexgrid.create().appendTo(remodels)
        , seriesData = d.getSeriesData()
    if (seriesData) {
        seriesData.forEach(function (currentValue, i) {
            let remodel_ship_data = _g.data.ships[currentValue['id']]
                , remodel_ship_name = remodel_ship_data.getName(_g.joint)
                , tip = '<h3 class="shipinfo">'
                    + '<strong data-content="' + remodel_ship_name + '">'
                    + remodel_ship_name
                    + '</strong>'
                    + (
                        remodel_ship_data['type'] ?
                            '<small>' + _g['data']['ship_types'][remodel_ship_data['type']].name.zh_cn + '</small>'
                            : ''
                    )
                    + '</h3>'
                , data_prev = i ? seriesData[i - 1] : null
                , remodel_lvl = data_prev ? data_prev['next_lvl'] : null
                , remodel_blueprint = data_prev ? (data_prev['next_blueprint']) : null
                , remodel_catapult = data_prev ? (data_prev['next_catapult']) : null
                , has_extra_illust = currentValue.illust_extra && currentValue.illust_extra.length && currentValue.illust_extra[0] ? true : false
                , flag = ''

            const getNavy = () => {
                if (remodel_ship_data.navy) return remodel_ship_data.navy
                return remodel_ship_data.class
                    ? (_g.data.ship_classes[remodel_ship_data.class].navy || 'ijn')
                    : 'ijn'
            }
            const navy = getNavy()
            if (navy && navy !== 'ijn') {
                flag += '<span class="flag-navy" data-navy="' + navy + '"></span>'
            }

            if (remodel_blueprint || remodel_catapult) {
                if (remodel_blueprint)
                    tip += '<span class="requirement is-blueprint">需要：改装设计图</span>'
                if (remodel_catapult)
                    tip += '<span class="requirement is-catapult">需要：试制甲板弹射器</span>'
            }

            if (!has_extra_illust && currentValue.illust_delete && data_prev)
                has_extra_illust = data_prev.illust_extra && data_prev.illust_extra.length && data_prev.illust_extra[0] ? true : false

            remodels_container.appendDOM(
                $('<a/>', {
                    'class': 'unit'
                        + (currentValue['id'] == d['id'] ? ' on' : '')
                        + (remodel_blueprint ? ' mod-blueprint' : '')
                        + (remodel_catapult ? ' mod-catapult' : ''),
                    'href': '?infos=ship&id=' + currentValue['id'],
                    'data-shipid': currentValue['id'],
                    'data-infos': '[[SHIP::' + currentValue['id'] + ']]',
                    'data-tip': tip,
                    'data-infos-nohistory': true,
                    'html': '<i><img src="' + _g.path.pics.ships + '/' + currentValue['id'] + '/0.webp"/></i>'
                        + (remodel_lvl ? '<strong>' + _val(remodel_lvl) + '</strong>' : '')
                        + (has_extra_illust ? '<em icon="hanger"></em>' : '')
                        + flag
                })
            )

            if (currentValue.next_loop)
                remodels_container.appendDOM(
                    $('<span class="unit" icon="loop-alt3" data-tip="可在两个改造版本间切换"/>').html('&nbsp;')
                )

            // 处理图鉴信息
            if (currentValue['id'] == d['id']) {
                if (currentValue.illust_delete) {
                    if (data_prev) {
                        illustrations.push(data_prev['id'])
                        if (data_prev.illust_extra && data_prev.illust_extra.length && data_prev.illust_extra[0]) {
                            data_prev.illust_extra.forEach(function (cur) {
                                illustrationsExtra.push(cur)
                            })
                        }
                    }
                } else {
                    illustrations.push(currentValue['id'])
                    if (currentValue.illust_extra && currentValue.illust_extra.length && currentValue.illust_extra[0]) {
                        currentValue.illust_extra.forEach(function (cur) {
                            illustrationsExtra.push(cur)
                        })
                    }
                }
            }
        })

        let index = 0

        //,lastContainer
        function check_append(file, positionInPair) {
            //file = file.replace(/\\/g, '/')
            try {
                let stat = node.fs.lstatSync(file)
                if (stat && stat.isFile()) {
                    index++
                    let radioid = 'ship_' + d['id'] + '_illustrations_' + index
                    //,isSingle = ( !lastContainer && positionInPair == 1 )
                    $('<input type="radio" name="ship_' + d['id'] + '_illustrations" id="' + radioid + '" value="' + index + '"' + (index == 1 ? ' checked' : '') + '/>')
                        .prop('checked', (index == 1))
                        .insertBefore(illusts_wrapper)
                    $('<label for="' + radioid + '"/>').insertBefore(illusts_wrapper)
                    //lastContainer =
                    $('<span/>')
                        .html('<img src="' + file + '" data-filename="' + ship_name + ' - ' + index + '.webp"/>')
                        //.css('background-image', 'url(' + file + ')')
                        .appendTo(illusts_container)
                    //.addClass( isSingle ? 'mod-single' : '' )
                } else {
                    //if( lastContainer )
                    //    lastContainer.addClass('mod-single')
                }
            } catch (e) {
                //if( lastContainer )
                //    lastContainer.addClass('mod-single')
            }
        }
        illustrations.forEach(function (currentValue) {
            //lastContainer = false
            check_append(node.path.normalize(_g.path.pics.ships) + currentValue + '/8.webp', 0)
            check_append(node.path.normalize(_g.path.pics.ships) + currentValue + '/9.webp', 1)
        })
        illustrationsExtra.forEach(function (currentValue) {
            //lastContainer = false
            check_append(node.path.normalize(_g.path.pics.shipsExtra) + currentValue + '/8.webp', 0)
            check_append(node.path.normalize(_g.path.pics.shipsExtra) + currentValue + '/9.webp', 1)
        })
        if (index % 2)
            illusts.addClass('is-singlelast')
        /*
        _db.ship_series.find({'id': d['series']}, function(err,docs){
            console.log(docs, d.getSeriesData())
            if( !err && docs && docs.length ){
                // 遍历 docs[0].ships
                    for(var i in docs[0].ships){
                        var _i = parseInt(i)
                            ,remodel_ship_data = _g.data.ships[docs[0].ships[i]['id']]
                            ,remodel_ship_name = remodel_ship_data.getName(_g.joint)
                            ,tip = '<h3 class="shipinfo">'
                                        + '<strong data-content="' + remodel_ship_name + '">'
                                            + remodel_ship_name
                                        + '</strong>'
                                        + (
                                            remodel_ship_data['type'] ?
                                                '<small>' + _g['data']['ship_types'][remodel_ship_data['type']].name.zh_cn + '</span>'
                                                : ''
                                        )
                                    + '</h3>'
                            ,remodel_lvl = _i ? docs[0].ships[ _i - 1 ]['next_lvl'] : null
                            ,remodel_blueprint = _i ? (docs[0].ships[ _i - 1 ]['next_blueprint']) : null

                        remodels_container.appendDOM(
                            $('<button class="unit" data-shipid="'+ docs[0].ships[i]['id'] +'"/>')
                                .attr({
                                    'data-infos': 	'[[SHIP::'+ docs[0].ships[i]['id'] +']]',
                                    'data-tip': 	tip,
                                    'data-infos-nohistory': true
                                })
                                .addClass(docs[0].ships[i]['id'] == d['id'] ? 'on' : '')
                                .addClass(remodel_blueprint ? 'blueprint' : '')
                                .html(
                                    '<i><img src="' + _g.path.pics.ships + '/' + docs[0].ships[i]['id']+'/0.webp"/></i>'
                                    + (remodel_lvl ? '<strong>' + remodel_lvl + '</strong>' : '')
                                )
                        )

                        // 处理图鉴信息
                            if( docs[0].ships[i]['id'] == d['id'] ){
                                if( docs[0].ships[i].illust_delete ){
                                    if( _i ){
                                        illustrations.push( docs[0].ships[_i - 1]['id'] )
                                        if( docs[0].ships[_i - 1].illust_extra && docs[0].ships[_i - 1].illust_extra.length && docs[0].ships[_i - 1].illust_extra[0] ){
                                            //illustrations = illustrations.concat('extra_'+docs[0].ships[_i - 1].illust_extra)
                                            for( var j in docs[0].ships[_i - 1].illust_extra ){
                                                illustrations.push( 'extra_' + docs[0].ships[_i - 1].illust_extra[j] )
                                            }
                                        }
                                    }
                                }else{
                                    illustrations.push( docs[0].ships[i]['id'] )
                                    if( docs[0].ships[i].illust_extra && docs[0].ships[i].illust_extra.length && docs[0].ships[i].illust_extra[0] ){
                                        for( var j in docs[0].ships[i].illust_extra ){
                                            illustrations.push( 'extra_' + docs[0].ships[i].illust_extra[j] )
                                        }
                                        //illustrations = illustrations.concat('extra_'+docs[0].ships[i].illust_extra)
                                    }
                                }
                            }
                    }
                    var index = 0
                    function check_append( file ){
                        file = file.replace(/\\/g, '/')
                        try{
                            var stat = node.fs.lstatSync(file)
                            if( stat && stat.isFile() ){
                                index++
                                $('<input type="radio" name="ship_'+d['id']+'_illustrations" value="'+index+'"/>')
                                    .prop('checked', (index == 1))
                                    .insertBefore(illusts_container)
                                $('<span class="container"/>')
                                    .html('<img src="'+file+'" data-filename="'+ship_name+' - '+index+'.webp"/>')
                                    //.css('background-image', 'url(' + file + ')')
                                    .appendTo(illusts_container)
                            }
                        }catch(e){}
                    }
                    for( var i in illustrations ){
                        //if( i )
                        //	check_append( _g.path.pics.ships + '/' + illustrations[i] + '/2.jpg' )
                        check_append( _g.path.pics.ships + '/' + illustrations[i] + '/8.webp' )
                        check_append( _g.path.pics.ships + '/' + illustrations[i] + '/9.webp' )
                    }
            }
        })*/
    }

    return dom
}
