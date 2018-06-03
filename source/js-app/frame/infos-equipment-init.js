
_frame.infos.__equipment_init = function( $el ){  
    function showEquipable( e ){
        return modal.equipable.show( e.currentTarget.getAttribute('data-equipment-type') )
    }
    
    $el.on('click.equipable', 'button[data-equipment-type]', showEquipable)
    
    { // 按钮：查询额外属性加成
        $el.on('click.viewbonuses', '.button-viewbonuses', evt => {
            evt.preventDefault()
            if (evt.target.disabled) return
            modal.bonuses.show('equipment', evt.target.getAttribute('data-equipment-id'))
        })
    }
};
