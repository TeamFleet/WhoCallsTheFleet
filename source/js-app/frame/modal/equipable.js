modal.equipable = {
    'frames': {},
    'frame': function( typeId ){
        if( !typeId )
            return false

        if( !this.frames[typeId] ){
            let container = $('<div/>')
            
            let equipType = _g.data.item_types[typeId]
                ,onType = equipType.equipable_on_type || []
                ,extraShip = equipType.equipable_extra_ship || []
                ,types = []
                    
            _g.ship_type_order_full.forEach( function(ship_type){
                if( onType.indexOf( ship_type ) > -1 )
                    types.push( ship_type )
            } )
            
            _p.el.flexgrid.create().appendTo( container ).addClass('equipable-types').prepend( $(
                /*
                types.map(function(ship_type){
                    let shipType = _g.data.ship_types[ship_type]
                    return '<span>' + (shipType.name.zh_cn || shipType.name.ja_jp) + ` (${shipType.code})` + '</span>'
                }).join('')
                */
                _g.ship_type_order_full.map( function(shipTypeId){
                    let shipType = _g.data.ship_types[shipTypeId]
                    if( shipType.hide || shipType.donotcompare )
                        return ''
                    return '<span class="unit' + ( onType.indexOf( shipTypeId ) > -1 ? ' on' : '' ) + '">'
                        + (shipType.name.zh_cn || shipType.name.ja_jp) + ` (${shipType.code})`
                        + '</span>'
                } ).join('')
            ) ).appendTo( container )
			
            if( extraShip.length ){
                container.append('<p>以及以下舰娘...</p>')
                let containerExtraShip = _p.el.flexgrid.create().appendTo( container ).addClass('list-ship equipable-extra-ships')
                extraShip.forEach(function(shipId){
                    containerExtraShip.appendDOM(
                        _tmpl.link_ship(shipId).addClass('unit')
                    )
                })
            }
            
            this.frames[typeId] = container
        }
        
        return this.frames[typeId]
    },
    'show': function( typeId ){
        return _frame.modal.show(
            this.frame( typeId ),
            //'可装备于...',
            `${_g.data.item_types[typeId].name.zh_cn} 可装备于...`,
            {
                'classname': 	'modal-equipable',
                'detach':		true
            }
        )
    }
}