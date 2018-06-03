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

        bonuses.single.forEach(bonus => {
            cache[id] = cache[id].add(this.renderBonusSingle(bonus))
        })
        bonuses.set.forEach(bonus => {
            cache[id] = cache[id].add(this.renderBonusSet(bonus))
        })

        return cache[id]
    },

    renderStat: (bonus) => {
        let r = ''
        _g.stats.forEach(arr => {
            const [stat] = arr
            if (isNaN(bonus[stat]) || !bonus[stat])
                return false
            r += `<span class="stat" data-stat="${stat}">+${bonus[stat]}</span>`
        })
        return r
    },
    renderBonusSingle: function (bonus) {
        let bonusStats = ''

        if (typeof bonus.bonusCount === 'object') {
            bonusStats = `<span class="info">该装备根据数量提供属性加成 (超额的部分不提供加成)</span>`
            Object.keys(bonus.bonusCount)
                .sort((a, b) => parseInt(a) - parseInt(b))
                .forEach(count => {
                    bonusStats += `<div class="has-extra">`
                        + `<div class="extra count" data-count="${count}">${count}</div>`
                        + this.renderStat(bonus.bonusCount[count])
                        + `</div>`
                })
        } else if (typeof bonus.bonusImprove === 'object') {
            bonusStats = `<span class="info">每个该装备根据改修星级提供属性加成</span>`
            Object.keys(bonus.bonusImprove)
                .sort((a, b) => parseInt(a) - parseInt(b))
                .forEach(star => {
                    bonusStats += `<div class="has-extra">`
                        + `<div class="extra star" data-star="${star}">${star}</div>`
                        + this.renderStat(bonus.bonusImprove[star])
                        + `</div>`
                })
        } else if (typeof bonus.bonus === 'object') {
            bonusStats = `<span class="info">每个该装备提供属性加成</span>`
                + this.renderStat(bonus.bonus)
        }

        return $(
            `<div class="bonus bonus-single">`
            + `<div class="equipments">`
            + _tmpl.link_equipment(bonus.equipment, undefined, true)
            + `</div>`
            + `<div class="stats">`
            + bonusStats
            + `</div>`
            + `</div>`
        )
    },
    renderBonusSet: function (bonus) {
        let bonusStats = ''
        if (typeof bonus.bonus === 'object') {
            bonusStats = `<span class="info">满足该条件时提供属性加成</span>`
                + this.renderStat(bonus.bonus)
        }
        return $(
            `<div class="bonus bonus-set">`
            + `<div class="equipments">`
            + bonus.list
                .map(item => {
                    if (!isNaN(item))
                        return _tmpl.link_equipment(item, undefined, true)
                    if (typeof item === 'string') {
                        switch (item) {
                            case 'SurfaceRadar':
                                return `<span class="link_equipment">`
                                    + `<i style="background-image:url(assets/images/itemicon/11.png)"></i>`
                                    + `<span>对水面雷达/电探</span>`
                                    + `</span>`
                            case 'AARadar':
                                return `<span class="link_equipment">`
                                    + `<i style="background-image:url(assets/images/itemicon/11.png)"></i>`
                                    + `<span>对空雷达/电探</span>`
                                    + `</span>`
                        }
                    }
                })
                .map(item => `<div class="equipment">${item}</div>`)
                .join('')
            + `</div>`
            + `<div class="stats">`
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
                )
            }
        }
    },
}))()
