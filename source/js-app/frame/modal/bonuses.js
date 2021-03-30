modal.bonuses = (() => ({
    show: function (type, id) {

        this.type = undefined
        this.ship = undefined
        this.equipment = undefined

        switch (type.toLowerCase()) {
            case 'ship': {
                this.type = 'ship'
                this.ship = _g.data.ships[id]
                break
            }
            case 'equipment':
            case 'item': {
                this.type = 'equipment'
                this.equipment = _g.data.items[id]
                break
            }
        }

        return _frame.modal.show(
            this.getFrame(),
            this.getTitle(),
            {
                'classname': `modal-bonuses modal-bonuses-${this.type}`,
                'detach': true
            }
        )
    },

    // type: undefined,
    // ship: undefined,
    // equipment: undefined,
    _cache: {
        ship: {},
        equipment: {},
    },
    getFrame: function () {
        const cache = this._cache[this.type]
        const obj = this.ship || this.equipment
        const id = obj.id

        if (cache[id])
            return cache[id]

        cache[id] = $()

        const bonuses = {
            single: [],
            set: []
        }
        obj.getBonuses().forEach(bonus => {
            if (typeof bonus.equipments === 'object')
                bonuses.set.push(bonus)
            else
                bonuses.single.push(bonus)
        })

        if (bonuses.single.length) {
            // cache[id] = cache[id].add(this.renderSubTitle('single'))
            bonuses.single.forEach(bonus => {
                cache[id] = cache[id].add(this.renderBonusSingle(bonus))
            })
        }
        if (bonuses.set.length) {
            cache[id] = cache[id].add(this.renderSubTitle('set'))
            bonuses.set.forEach(bonus => {
                cache[id] = cache[id].add(this.renderBonusSet(bonus))
            })
        }
        if (!bonuses.single.length && !bonuses.set.length) {
            cache[id] = $('<span class="no-bonuses">无</span>')
        }

        return cache[id]
    },

    renderSubTitle(type) {
        return $(
            `<div class="bonus bonus-title">`
            + (type === 'set' ? '套装加成<small>每一个条件的效果仅计算一次，多个条件的效果可叠加</small>' : '')
            + `</div>`
        )
    },
    renderStat(bonus) {
        let r = ''
        _g.stats.forEach(arr => {
            const [stat] = arr
            if (isNaN(bonus[stat]) || !bonus[stat])
                return false

            const value = bonus[stat]
            let content = ''

            switch (stat) {
                case 'range': {
                    if (value <= 1)
                        content = '射程提高一档'
                    break
                }
            }

            const classNames = ['stat']
            if (typeof value === 'string')
                content += `+${value} (该属性不叠加)`
            else if (value < 0) {
                content = `${value}`
                classNames.push('negative')
            } else
                content = `+${value}`

            r += `<span class="${classNames.join(' ')}" data-stat="${stat}">${content}</span>`
        })
        return r
    },
    renderConditionShips(bonus) {
        let condition = ''
        if (typeof bonus.ship.isType !== 'undefined') {
            const types = Array.isArray(bonus.ship.isType)
                ? bonus.ship.isType
                : [bonus.ship.isType]
            condition += `<div class="condition">`
                + types
                    .map(typeId => {
                        const type = _g.data.ship_types[parseInt(typeId)]
                        return (type.name.zh_cn || type.name.ja_jp)
                    })
                    .map(s => `<span class="item ship-class">${s}</span>`)
                    .join('')
                + `</div>`
        }
        if (typeof bonus.ship.isNotType !== 'undefined') {
            const types = Array.isArray(bonus.ship.isNotType)
                ? bonus.ship.isNotType
                : [bonus.ship.isNotType]
            condition += `<div class="condition">`
                + types
                    .map(typeId => {
                        const type = _g.data.ship_types[parseInt(typeId)]
                        return (type.name.zh_cn || type.name.ja_jp)
                    })
                    .map(s => `<span class="item ship-exclude">${s}</span>`)
                    .join('')
                + `</div>`
        }
        if (typeof bonus.ship.isClass !== 'undefined') {
            const classes = Array.isArray(bonus.ship.isClass)
                ? bonus.ship.isClass
                : [bonus.ship.isClass]
            condition += `<div class="condition">`
                + classes
                    .map(classId => {
                        const d = _g.data.ship_classes[parseInt(classId)]
                        const type = _g.data.ship_types[parseInt(d.ship_type_id)]
                        return `${d.name.zh_cn || d.name.ja_jp}级${type.name.zh_cn || type.name.ja_jp}`
                    })
                    .map(s => `<span class="item ship-class">${s}</span>`)
                    .join('')
                + `</div>`
        }
        if (typeof bonus.ship.isID !== 'undefined') {
            const ids = Array.isArray(bonus.ship.isID)
                ? bonus.ship.isID
                : [bonus.ship.isID]
            condition += `<div class="condition">`
                + ids
                    .map(shipId => {
                        const ship = _g.data.ships[parseInt(shipId)]
                        return `<a class="item ship ship-link" href="${_g.getLink('ships', ship.id)}" data-shipid="${ship.id}">`
                            + `<em class="avatar"><img src="${ship.getPic(0, _g.imgExt)}"/></em>`
                            + `${ship._name}`
                            + `</a>`
                    })
                    .join('')
                + `</div>`
        }
        if (typeof bonus.ship.isNotID !== 'undefined') {
            const ids = Array.isArray(bonus.ship.isNotID)
                ? bonus.ship.isNotID
                : [bonus.ship.isNotID]
            condition += `<div class="condition">`
                + ids
                    .map(shipId => {
                        const ship = _g.data.ships[parseInt(shipId)]
                        return `<span class="item ship-exclude">`
                            + `${ship._name}`
                            + `</span>`
                    })
                    .join('')
                + `</div>`
        }

        if (condition)
            return `<div class="ships">${condition}</div>`

        return ''
    },
    renderConditionEquipmentOneOf(equipments) {
        if (!Array.isArray(equipments) && equipments.length)
            return ''
        
        return `<div class="one-of">`
        // + `<span class="info">仅在拥有以下任意装备时，拥有多个时效果不叠加，可与其他条件叠加</span>`
        + `<span class="info">仅限：</span>`
        + equipments.map(condition => {
            const id = condition.isID || condition
            if (!isNaN(id))
                return _tmpl.link_equipment(
                    id,
                    'span',
                    true,
                )
            return ''
        }).join('')
        + `</div>`
        + `<div class="one-of-trail"></div>`
    },
    renderConditionEquipmentOneOfForSet(bonus) {
        if (!bonus.equipments || !Array.isArray(bonus.equipments.hasOneOf))
            return ''
        
        return this.renderConditionEquipmentOneOf(bonus.equipments.hasOneOf)
    },
    renderBonusSingle: function (bonus) {
        let condition = ''
        let bonusStats = ''
        let bonusInfoText = ''

        switch (this.type) {
            case 'ship': {
                condition = `<div class="equipments">`
                    + _tmpl.link_equipment(bonus.equipment, undefined, true)
                    + `</div>`
                break
            }
            case 'equipment': {
                condition = this.renderConditionShips(bonus)
                const conditionKeys = typeof bonus.ship === 'object'
                    ? Object.keys(bonus.ship).filter(key => key.toLowerCase() !== 'canequip')
                    : []
                const hasNoCondition = (
                    typeof bonus.ship === 'object' &&
                    conditionKeys.length === 0
                )
                const isOnlyNotType = (
                    typeof bonus.ship === 'object' &&
                    conditionKeys.length === 1 &&
                    bonus.ship.isNotType !== 'undefined'
                )
                bonusInfoText = (() => {
                    if (hasNoCondition)
                        return '装备于任意舰娘时，'
                    if (isOnlyNotType)
                        return ''
                    return '装备于以上舰娘时，'
                })()
                break
            }
        }

        if (typeof bonus.bonusCount === 'object') {
            bonusInfoText += `该装备根据数量提供属性加成 (超额的部分不提供加成)</span>`
            Object.keys(bonus.bonusCount)
                .sort((a, b) => parseInt(a) - parseInt(b))
                .forEach(count => {
                    bonusStats += `<div class="has-extra">`
                        + `<div class="extra count" data-count="${count}">${count}</div>`
                        + this.renderStat(bonus.bonusCount[count])
                        + `</div>`
                })
        } else if (typeof bonus.bonusImprove === 'object') {
            bonusInfoText += `每个该装备根据改修星级提供属性加成`
            Object.keys(bonus.bonusImprove)
                .sort((a, b) => parseInt(a) - parseInt(b))
                .forEach(star => {
                    bonusStats += `<div class="has-extra">`
                        + `<div class="extra star" data-star="${star}">${star}</div>`
                        + this.renderStat(bonus.bonusImprove[star])
                        + `</div>`
                })
        } else if (typeof bonus.bonusArea === 'object') {
            bonusInfoText += `每个该装备根据所处海域提供属性加成`
            const areas = {
                north: '北方'
            }
            Object.keys(bonus.bonusArea)
                .forEach(area => {
                    bonusStats += `<div class="has-extra">`
                        + `<div class="extra area">${areas[area.toLowerCase()]}</div>`
                        + this.renderStat(bonus.bonusArea[area])
                        + `</div>`
                })
        } else if (typeof bonus.bonus === 'object') {
            bonusInfoText += `每个该装备提供属性加成`
            bonusStats = this.renderStat(bonus.bonus)
        }

        return $(
            `<div class="bonus bonus-single">`
            + condition
            + `<div class="stats">`
            + `<span class="info">${bonusInfoText}</span>`
            + bonusStats
            + `</div>`
            + `</div>`
        )
    },
    renderBonusSet: function (bonus) {
        const _this = this
        let condition = ''
        let bonusStats = ''
        let bonusInfoText = ''
        let noNeedAdditionalList = false

        switch (this.type) {
            case 'ship': {
                break
            }
            case 'equipment': {
                condition = this.renderConditionShips(bonus)
                break
            }
        }

        if (typeof bonus.bonus === 'object') {
            bonusInfoText = '满足该条件时提供额外属性加成'
            bonusStats = this.renderStat(bonus.bonus)
        }

        const stars = bonus.listStar || []

        console.log(bonus)

        return $(
            `<div class="bonus bonus-set">`
            + condition
            + `<div class="equipments">`
            + bonus.list
                .map((item, index) => {
                    if (!isNaN(item))
                        return _tmpl.link_equipment(
                            item,
                            this.type === 'equipment' && item == this.equipment.id ? 'span' : undefined,
                            true,
                            stars[index] || undefined
                        )
                    if (Array.isArray(item)) {
                        return item.map(item => _tmpl.link_equipment(
                            item,
                            this.type === 'equipment' && item == this.equipment.id ? 'span' : undefined,
                            true
                        )).join(' / ')
                    }
                    if (typeof item === 'object' && item.id) {
                        return _tmpl.link_equipment(
                            item.id,
                            this.type === 'equipment' && item.id == this.equipment.id ? 'span' : undefined,
                            true,
                            item.star
                        )
                    }
                    if (typeof item === 'string') {
                        let iconId, name
                        let type = item
                        let ids = []
                        const matches = /([a-zA-Z0-9]+)\[([0-9,]+)\]/.exec(item)
                        if (Array.isArray(matches) && matches.length > 2) {
                            type = matches[1]
                            ids = matches[2].split(',')
                        }
                        switch (type) {
                            case 'SurfaceRadar': {
                                iconId = 11
                                name = '对水面雷达/电探'
                            }
                            case 'AARadar': {
                                iconId = 11
                                name = '对空雷达/电探'
                            }
                            default: {
                                const typeId = KC.formula.equipmentType[item]
                                if (typeId) {
                                    const type = _g.data.item_types[typeId]
                                    iconId = type.icon
                                    name = type.name.zh_cn
                                }
                            }
                        }
                        if (ids.length) noNeedAdditionalList = true
                        if (iconId && name) 
                            return `<span class="link_equipment">`
                                + `<i style="background-image:url(assets/images/itemicon/${iconId}.png)"></i>`
                                + `<span>${name}</span>`
                                + `</span>`
                                + (ids.length > 0
                                    ? _this.renderConditionEquipmentOneOf(ids)
                                    : '')
                    }
                })
                .map(item => `<div class="equipment">${item}</div>`)
                .join('')
            + (noNeedAdditionalList ? '' : this.renderConditionEquipmentOneOfForSet(bonus))
            + `</div>`
            + `<div class="stats">`
            + `<span class="info">${bonusInfoText}</span>`
            + bonusStats
            + `</div>`
            + `</div>`
        )
    },

    getTitle: function () {
        switch (this.type) {
            case 'ship': {
                return $(
                    `<strong>${this.ship._name}</strong>`
                    + `<span>装备属性加成</span>`
                    + `<img src="${this.ship.getPic(10, _g.imgExt)}" />`
                )
            }
            case 'equipment': {
                return $(
                    `<strong>${this.equipment._name}</strong>`
                    + `<span>属性加成</span>`
                    + `<i style="background-image:url(assets/images/itemicon/${this.equipment.getIconId()}.png)"></i>`
                )
            }
        }
    },
}))()
