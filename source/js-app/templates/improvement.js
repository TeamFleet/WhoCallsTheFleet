_tmpl.improvement = function( equipment, improvement_index, requirement_index, returnHTML ){
	if( typeof equipment == 'undefined' )
		return false

    if( typeof equipment != 'object' )
        if( !(equipment = _g.data.items[equipment]) )
            return false

    improvement_index = improvement_index || 0
    requirement_index = requirement_index || 0
	returnHTML = returnHTML || false

    function getValue( v ){
        v = parseInt(v)
        if( v<0 )
            return '?'
        return v
    }
    function getItemName( d ){
        if( typeof d != 'object' )
            d = _g.data.items[d]
        return d['name']['zh_cn'].replace(/（([^（^）]+)）/g, '($1)')
    }

    var improvement = equipment['improvement'][improvement_index]
        ,upgrade_to = improvement['upgrade']
                        ? _g.data.items[improvement['upgrade'][0]]
                        : false
        ,requirement = improvement['req'][requirement_index]
        ,resource = {}

    _g.log(improvement)

    if( requirement[1] ){
        var names = []
        for(var i in requirement[1]){
            names.push( _g.getName( _g.data.ships[requirement[1][i]]['name'], '' ) )
        }
        requirement = '<font>'+names.join(' / ')+'</font>'
    }else{
        requirement = '<font class="no">无秘书舰要求</font>'
    }

    resource['all'] = '<span>'
                        + '<em>必要资源</em>'
                        + '<i class="fuel">' + getValue(improvement['resource'][0][0]) + '</i>'
                        + '<i class="ammo">' + getValue(improvement['resource'][0][1]) + '</i>'
                        + '<i class="steel">' + getValue(improvement['resource'][0][2]) + '</i>'
                        + '<i class="bauxite">' + getValue(improvement['resource'][0][3]) + '</i>'
                    + '</span>'

    for(var i=1; i<4; i++){
        var title = ''
        switch(i){
            case 1: title = '★+0 ~ +5'; break;
            case 2: title = '★+6 ~ MAX'; break;
            case 3: title = '升级'; break;
        }
        resource[i] = '<span>'
                        + '<em>'+title+'</em>'
                        + ( i == 3 && !upgrade_to
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
                                + ( improvement['resource'][i][4]
                                    ? (
                                        '<i class="equipment"'
                                            + ' style="background-image:url(../app/assets/images/itemicon/'
                                            + _g.data.item_types[_g.data.items[improvement['resource'][i][4]]['type']]
                                            + '.png)">'
                                        + getItemName(improvement['resource'][i][4])
                                        + '<i>x' + getValue(improvement['resource'][i][5]) + '</i>'
                                        + '</i>'
                                    )
                                    : ''
                                )
                            )
                        )
                    + '</span>'
    }

	return _tmpl.export(
			'<span class="improvement">'
                + '<strong>'
                    + '<em style="background-image:url(../app/assets/images/itemicon/'
                        + _g.data.item_types[equipment['type']]['icon']
                        + '.png)"'
                        + ' data-infos="[[EQUIPMENT::'+equipment['id']+']]"'
                        + ' data-tip="[[EQUIPMENT::'+equipment['id']+']]"'
                    + '">' + getItemName(equipment) + '</em>'
                    + ( upgrade_to
                        ? '<b>➝</b>'
                            + '<em style="background-image:url(../app/assets/images/itemicon/'
                                + _g.data.item_types[upgrade_to['type']]['icon']
                                + '.png)"'
                                + ' data-infos="[[EQUIPMENT::'+upgrade_to['id']+']]"'
                                + ' data-tip="[[EQUIPMENT::'+upgrade_to['id']+']]"'
                            + '">' + getItemName(upgrade_to) + '</em>'
                            + ( improvement['upgrade'][1]
                                ? '<i>+'+improvement['upgrade'][1]+'</i>'
                                : ''
                            )
                        : ''
                    )
                + '</strong>'

                + requirement
                + resource['all']
                + resource['1']
                + resource['2']
                + resource['3']

			+ '</span>',
			returnHTML
		)
}
