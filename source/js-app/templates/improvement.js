_tmpl.improvement = function (equipment, improvement_index, requirement_index, returnHTML) {
    if (typeof equipment == 'undefined')
        return false

    if (typeof equipment != 'object')
        if (!(equipment = _g.data.items[equipment]))
            return false

    improvement_index = improvement_index || 0
    requirement_index = requirement_index || [0]
    returnHTML = returnHTML || false

    let improvement = equipment['improvement'][improvement_index]
        , upgrade_to = improvement['upgrade']
            ? _g.data.items[improvement['upgrade'][0]]
            : false
        , req_ships = []
        , requirement = ''

    requirement_index.forEach(function (currentValue) {
        let req = improvement['req'][currentValue]
        if (req[1])
            req_ships.mergeFrom(req[1])

    })
    if (req_ships.length) {
        var names = []
        req_ships.forEach(function (id) {
            names.push(
                '<a'
                + ' href="?infos=ship&id=' + id + '"'
                + ' data-infos="[[SHIP::' + id + ']]"'
                + ' data-tip="[[SHIP::' + id + ']]"'
                + '>'
                + _g.data.ships[id].getName()
                + '</a>'
            )
        })
        requirement = '<font>' + names.join(' / ') + '</font>'
    } else {
        requirement = `<font class="no">${(improvement.resource[0][0] >= 0) ? '无秘书舰' : '未知'}要求</font>`
    }

    return _tmpl.export(
        '<span class="improvement">'
        + _tmpl.improvement__title(equipment, upgrade_to, improvement['upgrade'][1])
        + requirement
        + _tmpl.improvement__resource(improvement, upgrade_to ? true : false)
        + '</span>',
        returnHTML
    )
}










_tmpl.improvement_detail = function (equipment, returnHTML) {
    if (typeof equipment == 'undefined')
        return false

    if (typeof equipment != 'object')
        if (!(equipment = _g.data.items[equipment]))
            return false

    let html = ''
        , data = equipment['improvement'] || []

    data.forEach(function (improvement) {
        let upgrade_to = improvement['upgrade']
            ? _g.data.items[improvement['upgrade'][0]]
            : false
            , requirements = this.improvement__reqdetails(improvement.req, (improvement.resource[0][0] >= 0))

        html += '<span class="improvement improvement-details">'
            + _tmpl.improvement__title(equipment, upgrade_to, improvement['upgrade'][1])
            + requirements
            + _tmpl.improvement__resource(improvement, upgrade_to ? true : false)
            + '</span>'
    }, this)

    return _tmpl.export(
        html,
        returnHTML
    )
}










_tmpl.improvement_inEquipmentInfos = function (equipment, returnHTML) {
    if (typeof equipment == 'undefined')
        return false

    if (typeof equipment != 'object')
        if (!(equipment = _g.data.items[equipment]))
            return false

    let html = ''
        , data = equipment['improvement'] || []

    data.forEach(function (improvement) {
        let upgrade_to = improvement['upgrade']
            ? _g.data.items[improvement['upgrade'][0]]
            : false
            , requirements = this.improvement__reqdetails(improvement.req, (improvement.resource[0][0] >= 0))

        html += '<span class="unit improvement improvement-details">'
            + '<b>'
            + (upgrade_to
                ? '<span class="indicator true">可升级为</span>'
                //+ '<a style="background-image:url(../app/assets/images/itemicon/'
                //	+ upgrade_to.getIconId()
                //	+ '.png)"'
                + '<a class="equiptypeicon mod-left mod-'
                + upgrade_to.getIconId()
                + '"'
                + ' href="?infos=equipment&id=' + upgrade_to['id'] + '"'
                + ' data-infos="[[EQUIPMENT::' + upgrade_to['id'] + ']]"'
                + ' data-tip="[[EQUIPMENT::' + upgrade_to['id'] + ']]"'
                + '>' + upgrade_to.getName(true) + '</a>'
                + (improvement['upgrade'][1]
                    ? '<i>+' + improvement['upgrade'][1] + '</i>'
                    : ''
                )
                : '<span class="indicator false">不可升级</span>'
            )
            + '</b>'
            + requirements
            + _tmpl.improvement__resource(improvement, upgrade_to ? true : false)
            + '</span>'
    }, this)

    return _tmpl.export(
        html,
        returnHTML
    )
}









_tmpl.improvement__title = function (equipment, upgrade_to, upgrade_to_star) {
    return '<strong>'
        //+ '<a style="background-image:url(../app/assets/images/itemicon/'
        //	+ equipment.getIconId()
        //	+ '.png)"'
        + '<a class="equiptypeicon mod-left mod-'
        + equipment.getIconId()
        + '"'
        + ' href="?infos=equipment&id=' + equipment['id'] + '"'
        + ' data-infos="[[EQUIPMENT::' + equipment['id'] + ']]"'
        + ' data-tip="[[EQUIPMENT::' + equipment['id'] + ']]"'
        + '>' + equipment.getName(true) + '</a>'
        + (upgrade_to
            ? '<b></b>'
            //+ '<a style="background-image:url(../app/assets/images/itemicon/'
            //	+ upgrade_to.getIconId()
            //	+ '.png)"'
            + '<a class="equiptypeicon mod-left mod-'
            + upgrade_to.getIconId()
            + '"'
            + ' href="?infos=equipment&id=' + upgrade_to['id'] + '"'
            + ' data-infos="[[EQUIPMENT::' + upgrade_to['id'] + ']]"'
            + ' data-tip="[[EQUIPMENT::' + upgrade_to['id'] + ']]"'
            + '>' + upgrade_to.getName(true) + '</a>'
            + (upgrade_to_star
                ? '<i>+' + upgrade_to_star + '</i>'
                : ''
            )
            : ''
        )
        + '</strong>'
}
_tmpl.improvement__resource = function (improvement, upgradable) {
    function getValue(v) {
        v = parseInt(v)
        if (v < 0)
            return '?'
        return v
    }

    var resource = {}

    resource['all'] = '<span>'
        + '<em>必要资源</em>'
        + '<i class="fuel">' + getValue(improvement['resource'][0][0]) + '</i>'
        + '<i class="ammo">' + getValue(improvement['resource'][0][1]) + '</i>'
        + '<i class="steel">' + getValue(improvement['resource'][0][2]) + '</i>'
        + '<i class="bauxite">' + getValue(improvement['resource'][0][3]) + '</i>'
        + '</span>'

    for (var i = 1; i < 4; i++) {
        var title = ''
        switch (i) {
            case 1: title = '★+0 ~ +6'; break;
            case 2: title = '★+6 ~ MAX'; break;
            case 3: title = '升级'; break;
        }
        let requiredItem = improvement['resource'][i][4] || ''

        if (requiredItem) {
            if (isNaN(requiredItem)) {
                // 非数字时
                let match = /^consumable_([0-9]+)/.exec(requiredItem)
                if (match && match.length > 1) {
                    let name = _g.data.consumables[match[1]]._name
                    let quantity = getValue(improvement['resource'][i][5])
                    requiredItem = `<i>${name}<i>x${quantity}</i></i>`
                }
            } else {
                // 数字时，确定为装备
                requiredItem = '<a class="equiptypeicon mod-left mod-'
                    + _g.data.items[improvement['resource'][i][4]].getIconId()
                    + '"'
                    + ' href="?infos=equipment&id=' + improvement['resource'][i][4] + '"'
                    + ' data-infos="[[EQUIPMENT::' + improvement['resource'][i][4] + ']]"'
                    + ' data-tip="[[EQUIPMENT::' + improvement['resource'][i][4] + ']]"'
                    + '>'
                    + _g.data.items[improvement['resource'][i][4]].getName(true)
                    + '<i>x' + getValue(improvement['resource'][i][5]) + '</i>'
                    + '</a>'
            }
        }

        resource[i] = '<span>'
            + '<em>' + title + '</em>'
            + (i == 3 && !upgradable
                ? '<i class="no">-</i>'
                : (
                    '<i class="dev_mat">'
                    + getValue(improvement['resource'][i][0])
                    + '<i>(' + getValue(improvement['resource'][i][1]) + ')</i>'
                    + '</i>'
                    + '<i class="imp_mat">'
                    + getValue(improvement['resource'][i][2])
                    + '<i>(' + getValue(improvement['resource'][i][3]) + ')</i>'
                    + '</i>'
                    + requiredItem
                )
            )
            + '</span>'
    }

    return '<span>'
        + resource['all']
        + resource['1']
        + resource['2']
        + resource['3']
        + '</span>'

}
_tmpl.improvement__reqdetails = function (reqdata, dataready) {
    if (!reqdata || !reqdata.push || !reqdata.length)
        return ''

    var requirements = '<font>'

    reqdata.forEach(function (req) {
        var names = []
            , text

        requirements += '<b>'

        for (var k = 0; k < 7; k++) {
            switch (k) {
                case 0: text = '日'; break;
                case 1: text = '一'; break;
                case 2: text = '二'; break;
                case 3: text = '三'; break;
                case 4: text = '四'; break;
                case 5: text = '五'; break;
                case 6: text = '六'; break;
            }
            requirements += '<i' + (req[0][k] ? ' class="on"' : '') + '>' + text + '</i>'
        }

        if (req[1]) {
            req[1].forEach(function (shipid) {
                names.push(
                    '<a'
                    + ' href="?infos=ship&id=' + shipid + '"'
                    + ' data-infos="[[SHIP::' + shipid + ']]"'
                    + ' data-tip="[[SHIP::' + shipid + ']]"'
                    + '>'
                    + _g.data.ships[shipid].getName()
                    + '</a>'
                )
            })
            requirements += names.join(' / ')
        } else {
            requirements += `<b>${dataready ? '无秘书舰' : '未知'}要求</b>`
        }

        requirements += '</b>'
    })

    requirements += '</font>'

    return requirements
}
