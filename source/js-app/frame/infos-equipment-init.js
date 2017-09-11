
_frame.infos.__equipment_init = function( $el ){  
    function showEquipable( e ){
        return modal.equipable.show( e.currentTarget.getAttribute('data-equipment-type') )
    }
    
    $el.on('click.equipable', 'button[data-equipment-type]', showEquipable)
};