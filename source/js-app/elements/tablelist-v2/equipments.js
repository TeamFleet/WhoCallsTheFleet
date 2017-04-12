// Equipments

class TablelistEquipments extends Tablelist{
    constructor( container, options ){
        super( container, options )

        this.columns = [
            '  ',
            ['火力',	'fire'],
            ['雷装',	'torpedo'],
            ['对空',	'aa'],
            ['对潜',	'asw'],
            ['爆装',	'bomb'],
            ['命中',	'hit'],
            ['装甲',	'armor'],
            ['回避',	'evasion'],
            ['索敌',	'los'],
            ['射程',	'range'],
            ['可改修','improvable']
        ]

        // 标记全局载入状态
            _frame.app_main.loading.push('tablelist_'+this._index)
            _frame.app_main.is_loaded = false
        
        if( container.children('.tablelist-container').length ){
            this.init_parse()
        }//else if(this.init_new){
        //	this.init_new()
        //}
    }

    apply_types(){
        //console.log('types: ' + TablelistEquipments.types)
        this.dom.filter_types.removeAttr('class')
        
        if( TablelistEquipments.types.length ){
            this.dom.filter_types.addClass('type' + TablelistEquipments.types.join(' type'))
            if( this.generated )
                this.apply_types_check()
        }

        // 清除上次选择的额外可选装备
        this.dom.tbody.children('.extra').removeClass('extra').removeAttr('style')

        // 额外可选择装备
        if( TablelistEquipments.extraEquipments ){
            TablelistEquipments.extraEquipments.forEach(id => {
                this.dom.tbody.children('[data-equipmentid="'+id+'"]').css({
                    display: 'flex',
                    opacity: 1
                }).addClass('extra')
            })
        }
    }

    apply_types_check(){
        if( TablelistEquipments.shipIdLast && TablelistEquipments.shipIdLast == TablelistEquipments.shipId )
            return
        
        TablelistEquipments.shipIdLast = TablelistEquipments.shipId
        
        // 航母：直接进入飞行器页
        if( !TablelistEquipments.isExtraSlot
            && TablelistEquipments.shipId
            && _g.data.ships[TablelistEquipments.shipId]
            && $.inArray(_g.data.ships[TablelistEquipments.shipId].type, [9, 10, 11, 30] ) > -1
        ){
            let k = 0
                ,el, t

            while( this.dom.types[k++]
                && this.dom.types[k]
                && (
                    this.dom.types[k].attr('data-equipmentcollection') != 3
                    || $.inArray((parseInt(this.dom.types[k].attr('data-type')) || null), TablelistEquipments.types) <= -1
                )
            ){
                el = this.dom.types[k+1]
            }
            
            el = el || this.dom.types[0]
            
            this.dom.type_radios[3].prop('checked', true).trigger('change')
            
            t = el[0].offsetTop
            if( t )
                t-= 32
            this.dom.tbody.scrollTop(t || 0)
            return
        }
        
        if( TablelistEquipments.types.length ){
            let k = 0
                ,el, t
    
            while( $.inArray((parseInt(this.dom.types[k++].attr('data-type')) || null), TablelistEquipments.types) <= -1 ){
                el = this.dom.types[k]
            }
            
            el = el || this.dom.types[0]
            
            this.dom.type_radios[parseInt(el.attr('data-equipmentcollection')) || 1].prop('checked', true).trigger('change')
            
            t = el[0].offsetTop
            if( t )
                t-= 32
            this.dom.tbody.scrollTop(t || 0)
        }
    }
    
    
    
    
    
    
    
    
    

    init_parse(){
        // 生成过滤器与选项
            this.dom.filter_container = this.dom.container.children('.options')
            this.dom.filters = this.dom.filter_container.children('.filters')
    
        // 装备大类切换
            this.dom.type_radios = {}
            this.dom.container.children('input[type="radio"][name="equipmentcollection"]').each(function(i, radio){
                radio = $(radio)
                let val = parseInt(radio.val())
                this.dom.type_radios[val] = radio
                    .prop('checked', val == 1 )
                    .on('change', function(){
                        // force thead redraw
                        this.dom.tbody.scrollTop(0)
                        this.thead_redraw()
                    }.bind(this))
            }.bind(this))
        
        // 装备类型过滤
            this.dom.filter_types = this.dom.container.children('input[name="types"][type="hidden"]')
    
        // 生成表格框架
            this.dom.table = this.dom.container.children('.tablelist-container')
            this.dom.thead = this.dom.table.children('.tablelist-header')
                //this.dom.thead.children('span').on('click', function(e){
                //		this.sort_table_from_theadcell($(e.currentTarget))
                //	}.bind(this))
            this.dom.tbody = this.dom.table.children('.tablelist-body')
    
        // 生成装备数据DOM
            this.parse_all_items()
    
        // 生成底部内容框架
            this.dom.msg_container = this.dom.container.children('.msgs')
            if( !_config.get( 'hide-equipmentsinfos' ) )
                this.dom.msg_container.attr( 'data-msgs', 'equipmentsinfos' )
            else
                this.dom.msg_container.removeAttr( 'data-msgs' )
    
        // 生成部分底部内容
            let equipmentsinfos = this.dom.msg_container.children('.equipmentsinfos')
                equipmentsinfos.children('button').on('click', function(){
                    this.dom.msg_container.removeAttr('data-msgs')
                    _config.set( 'hide-equipmentsinfos', true )
                }.bind(this))
    }
    parse_all_items(){
        this.generated = false
        this.dom.types = []
        
        let header_index = -1

        this.dom.tbody.children('h4, dl').each(function(index, tr){
            tr = $(tr)
            if( tr[0].tagName == 'H4' ){
                header_index++
                this.dom.types[header_index] = tr
            }else{
                //let equipment_data = _g.data.items[ tr.attr('data-equipmentid') ]
                let etype = parseInt(tr.attr('data-equipmenttype')) || -1
                    ,eid = parseInt(tr.attr('data-equipmentid'))
                tr.on('click', function(e, forceInfos){
                        if( !forceInfos && _frame.app_main.is_mode_selection() ){
                            e.preventDefault()
                            e.stopImmediatePropagation()
                            e.stopPropagation()
                            
                            if(
                                $.inArray(etype, TablelistEquipments.types || []) > -1
                                || $.inArray(eid, TablelistEquipments.extraEquipments || []) > -1
                            )
                                _frame.app_main.mode_selection_callback(eid)

                            setTimeout(function(){
                                TablelistEquipments.types = []
                                TablelistEquipments.extraEquipments = []
                                TablelistEquipments.shipId = null
                                tr.removeAttr('style')
                            }, 20)
                            
                            //if( $.inArray(equipment_data.type, TablelistEquipments.types) > -1 )
                            //	_frame.app_main.mode_selection_callback(equipment_data['id'])
                        }
                    })
            }
        }.bind(this))

        this.thead_redraw()
        this.generated = true
        this.apply_types_check()
        _frame.app_main.loaded('tablelist_'+this._index, true)
    }
}

TablelistEquipments.gen_helper_equipable_on = function( type_id ){
    var equipable_on = ''
    _g.data.item_types[type_id]['equipable_on_type'].forEach(function(currentValue, i){
        var item_type_id = _g.data.item_types[type_id]['equipable_on_type'][i]
        equipable_on+= '<span>'
                            + _g['data']['ship_types'][item_type_id]['full_zh']
                            + ( i < _g.data.item_types[type_id]['equipable_on_type'].length-1 ? ',&nbsp;' : '' )
                        + '</span>'
    })
    return '<em class="helper" data-tip="<h4 class=item_equipable_on>可装备于</h4>' + equipable_on + '">?</em>'
}

TablelistEquipments.types = []
TablelistEquipments.shipId = null
TablelistEquipments.shipIdLast = null
