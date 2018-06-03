modal.shipBonuses = {

    show: shipId => _frame.modal.show(
        modal.shipBonuses.getFrame(shipId),
        modal.shipBonuses.getTitle(shipId),
        {
            'classname': 'modal-shipbonuses',
            'detach': true
        }
    ),

    _cache: {},
    getFrame: shipId => {
        const cache = modal.shipBonuses._cache

        if (cache[shipId])
            return cache[shipId]

        cache[shipId] = $('<div>123123123</div>')

        return cache[shipId]
    },
    getTitle: shipId => (
        `${_g.data.ships[shipId]._name} / 装备属性加成`
    ),

}
