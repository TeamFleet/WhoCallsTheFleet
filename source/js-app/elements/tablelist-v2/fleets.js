/* TODO
    新建
        导入舰载机厨URL/用户名/字符串
        加载配置文件
    导出
        配置文件
    分享
        图片
        文本
*/

class TablelistFleets extends Tablelist{
    constructor( container, options ){
        super( container, options )
        
        this.columns = [
                '  ',
                ['创建者',	'user'],
                ['修改时间','time_modify'],
                ['评价',	'rating'],
                ['',		'options']
            ]
    
        this.kancolle_calc = {
            '_ApplicationId': 	'l1aps8iaIfcq2ZzhOHJWNUU2XrNySIzRahodijXW',
            '_ClientVersion': 	'js1.2.19',
            '_InstallationId': 	'62522018-ec82-b434-f5a5-08c3ab61d932',
            '_JavaScriptKey': 	'xOrFpWEQZFxUDK2fN1DwbKoj3zTKAEkgJHzwTuZ4'
        }
        
        //_g.data.fleets_tablelist = {
        //	lists: [],
        //	items: {}
        //}
    
        // 标记全局载入状态
            _frame.app_main.loading.push('tablelist_'+this._index)
            _frame.app_main.is_loaded = false
            //_g.data.fleets_tablelist.lists.push(this)

        // [创建] 过滤器与选项
            this.dom.filter_container = $('<div class="options" viewtype="card"/>').appendTo( this.dom.container )
            this.dom.filters = $('<div class="filters"/>').appendTo( this.dom.filter_container )
            // 左
                this.dom.btn_new = $('<button class="new" icon="import"/>').html('新建/导入')
                                    .on('click',function(e, target){
                                        this.btn_new(target)
                                    }.bind(this))
                                    .appendTo(this.dom.filters)
                if( TablelistFleets.support.buildfile ){
                    this.dom.btn_exportFile = $('<button class="export" icon="floppy-disk"/>').html('导出配置文件')
                                    .on('click',function(){
                                        _db.fleets.persistence.compactDatafile()
                                        if( _g.isNWjs ){
                                            _g.save(_db.fleets.filename, 'fleets.json')
                                        }else{
                                            _frame.app_main.loading_start('tablelist_fleets_export', false)
                                            let data = ''
                                            _db.fleets.find({}, function(err, docs){
                                                if( err ){
                                                    _g.error(err)
                                                }else{
                                                    docs.forEach(function(doc){
                                                        data+= JSON.stringify(doc) + '\n'
                                                    })
                                                    let blob = new Blob([data], {type: "application/json"})
                                                    _g.save( URL.createObjectURL(blob), 'fleets.json' )
                                                }
                                                _frame.app_main.loading_complete('tablelist_fleets_export')
                                            })
                                        }
                                    })
                                    .appendTo(this.dom.filters)
                }
            // 右 - 选项组
                this.dom.buttons_right = $('<div class="buttons_right"/>').appendTo(this.dom.filters)
                this.dom.setting_hqlv = $('<label/>',{
                                        'class':	'setting setting-hqlv',
                                        'html':		'默认司令部等级',
                                        'data-tip':	'如果舰队配置没有设置司令部等级，<br/>则会使用该默认数值<br/>司令部等级会影响索敌能力的计算'
                                    })
                                    .on({
                                        'mouseenter mouseleave': function(e){
                                            if( _p.tip.is_showing && !_p.tip.timeout_fade && this.dom.setting_hqlv_input.is(':focus') ){
                                                e.stopImmediatePropagation()
                                                e.stopPropagation()
                                            }
                                        }.bind(this)
                                    })
                                    .append(
                                        this.dom.setting_hqlv_input = $('<input/>',{
                                                'type':		'number',
                                                'min':		0,
                                                'max':		_g.hqMaxLv
                                            })
                                            .val(Lockr.get('hqLvDefault', _g.defaultHqLv))
                                            .on({
                                                'input': function(){
                                                    _g.updateDefaultHqLv(this.dom.setting_hqlv_input.val())
                                                }.bind(this),
                                                'focus.tipshow': function(){
                                                    this.dom.setting_hqlv_input.trigger('tipshow')
                                                }.bind(this),
                                                'blur.tiphide': function(){
                                                    this.dom.setting_hqlv_input.trigger('tiphide')
                                                    if (this.dom.setting_hqlv_input.val() > _g.hqMaxLv){
                                                        this.dom.setting_hqlv_input.val(_g.hqMaxLv)
                                                        this.dom.setting_hqlv_input.trigger('input')
                                                    }
                                                }.bind(this),
                                                'click': function(e){
                                                    e.stopImmediatePropagation()
                                                    e.stopPropagation()
                                                }
                                            })
                                    )
                                    .appendTo(this.dom.buttons_right)
                    $body.on('update_defaultHqLv.update_fleets_hqlv_input', function(e, val){
                        this.dom.setting_hqlv_input.val(val)
                    }.bind(this))
                this.dom.btn_settings = $('<button icon="cog"/>')
                                    .on('click',function(){
                                        this.btn_settings()
                                    }.bind(this))
                                    .appendTo(this.dom.buttons_right)
            /*
                this.dom.warning = $('<div/>',{
                        'class':	'warning',
                        'html':		'功能移植/测试中，请勿日常使用'
                    }).appendTo( this.dom.filter_container )
            */

        // [创建] 表格框架
            this.dom.table = $('<div class="tablelist-container"/>').appendTo( this.dom.container )
            this.dom.thead = $('<dl/>').appendTo($('<div class="tablelist-header"/>').appendTo( this.dom.table ))
            this.dom.tbody = $('<div class="tablelist-body" scrollbody/>').appendTo( this.dom.table )
                .on('contextmenu.contextmenu_fleet', '[data-fleetid]', function(e){
                        this.contextmenu_show($(e.currentTarget), null , e)
                        e.preventDefault()
                    }.bind(this))
                .on('click.contextmenu_fleet', '[data-fleetid]>dt>em', function(e){
                        this.contextmenu_show($(e.currentTarget).parent().parent(), $(e.currentTarget))
                        e.stopImmediatePropagation()
                        e.stopPropagation()
                    }.bind(this))
            
            this.columns.forEach(function(v, i){
                if( typeof v == 'object' ){
                    $('<dd/>',{
                        'stat': 	v[1],
                        'html':		v[0]
                    }).appendTo(this.dom.thead)
                }else{
                    $('<dt/>').html(v[0]).appendTo(this.dom.thead)
                }
            }.bind(this))

        // [创建] 无内容时的新建提示框架
            $('<div class="nocontent container"/>')
                .append(
                    $($('<div/>')
                        .append($('<span>').html('暂无舰队配置'))
                        .append($('<button>').html('新建/导入')
                                    .on('click',function(e){
                                        this.dom.btn_new.trigger('click', [e])
                                    }.bind(this))
                                )
                    )
                )
                .appendTo( this.dom.table )
        
        // Auto select for number input
            this.dom.container.on('focus.number_input_select', 'input[type="number"]', function(e){
                e.currentTarget.select()
            })

        this.genlist()
    }
    
    // 新建数据
        new_data(obj){
            return $.extend({
                'data': 		[],
                'time_create': 	(new Date()).valueOf(),
                'time_modify': 	(new Date()).valueOf(),
                'hq_lv': 		-1,
                'name': 		'',
                'note': 		'',
                'user': 		{},
                'rating': 		-1,
                'theme': 		_g.randNumber(10)
            }, obj || {})
        }

    // 读取已保存数据
        loaddata(){
            let deferred = Q.defer()
            
            _db.fleets.find({}).sort({name: 1}).exec(function(err, docs){
                if( err ){
                    deferred.resolve( [] )
                }else{
                    docs.forEach(function(doc){
                        doc.data =  InfosFleet.decompress(doc['data'])
                    })
                    console.log(docs)
                    deferred.resolve( docs )
                }
            })
            
            return deferred.promise
            //return []
            // PLACEHOLDER START
            /*
                var deferred = Q.defer()
                var data = $.extend( this.kancolle_calc, {
                        '_method': 	'GET',
                        'where': {
                            'owner': 	'Diablohu'
                        }
                    })
                $.ajax({
                    'url': 	'https://api.parse.com/1/classes/Deck',
                    'data': JSON.stringify(data),
                    'method': 'POST',
                    'success': function( data ){
                        var arr = []
                        if( data && data['results'] ){
                            for(var i in data['results']){
                                arr.push( this.parse_kancolle_calc_data(data['results'][i]) )
                            }
                        }
                        deferred.resolve( arr )
                    }.bind(this),
                    'error': function( jqXHR, textStatus, errorThrown ){
                        _g.log(jqXHR)
                        _g.log(textStatus)
                        _g.log(errorThrown)
                        deferred.resolve([])
                    }
                })
                return deferred.promise
            */
            // PLACEHOLDER END
            // PLACEHOLDER START
            /*
                return [
                    {
                        'name': 	'1-5',
                        'owner': 	'Diablohu',
                        'hq_lv': 	101,
                        'note': 	'',
                        'createdAt':'2014-09-30T21:06:44.046Z',
                        'updatedAt':'2015-05-20T03:04:51.898Z',
                        'ojbectId': 'XU9DFdVoVQ',
                        'data': 	'[[["408",[83,-1],[94,64,100,54]],["82",[58,-1],[79,79,79,26]],["321",[88,-1],[47,47,34,45]],["293",[54,-1],[47,47,87,45]]]]'
                    }
                ]*/
            // PLACEHOLDER END
        }

    // 检测数据，删除空数据条目
        validdata(arr){
            let deferred = Q.defer()
                ,to_remove = []
                ,i = 0
                ,valid = function( fleetdata ){
                    if( fleetdata['hq_lv'] > -1
                        || fleetdata['name']
                        || fleetdata['note']
                        || fleetdata['rating'] > -1
                    ){
                        return true
                    }
                    if( !fleetdata.data || !fleetdata.data.length || !fleetdata.data.push )
                        return false
                    let is_valid = false
                    for( let fleet of fleetdata.data ){
                        if( fleet && fleet.length && fleet.push ){
                            for( let shipdata of fleet ){
                                if( typeof shipdata != 'undefined' && shipdata && shipdata.push && typeof shipdata[0] != 'undefined' && shipdata[0] )
                                    is_valid = true
                            }
                        }
                    }
                    return is_valid
                }
                
            while( i < arr.length ){
                if( valid( arr[i] ) ){
                    i++
                }else{
                    to_remove.push( arr[i]._id )
                    arr.splice(i, 1)
                }
            }
            
            if( to_remove.length ){
                _db.fleets.remove({
                    _id: { $in: to_remove }
                }, { multi: true }, function (err, numRemoved) {
                    deferred.resolve( arr )
                });
            }else{
                deferred.resolve( arr )
            }
            
            return deferred.promise
        }

    // 检测已处理数据，如果没有条目，标记样式
        datacheck(arr){
            arr = arr || []
    
            if( !arr.length )
                this.dom.container.addClass('nocontent')
            else
                this.dom.container.removeClass('nocontent')
    
            return arr
        }

    // 创建全部数据行内容
        append_all_items(arr){
            arr = arr || []
            arr.sort(function(a, b){
                if (a['name'] < b['name']) return -1;
                if (a['name'] > b['name']) return 1;
                return 0;
            })
            //_g.log(arr)
            
            this.trIndex = 0
            
            // 处理“按主题颜色分组”选项默认值
                if( typeof Lockr.get( 'fleetlist-option-groupbytheme' ) == 'undefined' )
                    Lockr.set( 'fleetlist-option-groupbytheme', true )
    
            let deferred = Q.defer()
                ,k = 0
            
            if( Lockr.get( 'fleetlist-option-groupbytheme' ) ){
                // 按主题颜色分组array
                let sorted = {}
                    ,count = 0
                arr.forEach(function(cur,i){
                    if( !sorted[cur.theme] )
                        sorted[cur.theme] = []
                    sorted[cur.theme].push(i)
                })
                //console.log(sorted)
                
                // 根据主题颜色遍历
                    for( let i in sorted ){
                        k = 0
                        // 创建flexgrid placeholder
                            while(k < this.flexgrid_empty_count){
                                if( !k )
                                    this.flexgrid_ph = $('<dl data-fleetid trindex="99999"/>').appendTo(this.dom.tbody)
                                else
                                    $('<dl data-fleetid trindex="99999"/>').appendTo(this.dom.tbody)
                                k++
                            }

                        // 创建数据行
                            sorted[i].forEach(function(index){
                                setTimeout((function(i){
                                    this.append_item( arr[i] )
                                    count++
                                    if( count >= arr.length -1 )
                                        deferred.resolve()
                                }.bind(this))(index), 0)
                            }.bind(this))

                        // 创建强制换行
                            $('<h4/>',{
                                    'trindex': 	++this.trIndex,
                                    'html': 	'&nbsp;'
                                })
                                .appendTo( this.dom.tbody )
                            this.trIndex++
                    }
            }else{
                // 创建flexgrid placeholder
                    while(k < this.flexgrid_empty_count){
                        if( !k )
                            this.flexgrid_ph = $('<dl data-fleetid trindex="99999"/>').appendTo(this.dom.tbody)
                        else
                            $('<dl data-fleetid trindex="99999"/>').appendTo(this.dom.tbody)
                        k++
                    }
        
                // 创建数据行
                    arr.forEach(function(currentValue, i){
                        setTimeout((function(i){
                            this.append_item( arr[i] )
                            if( i >= arr.length -1 )
                                deferred.resolve()
                        }.bind(this))(i), 0)
                    }.bind(this))
            }
    
            if( !arr.length )
                deferred.resolve()
    
            return deferred.promise
        }

    // 创建单行数据行内容
        append_item( data, index, isPrepend ){
            if( !data )
                return false
    
            if( typeof index == 'undefined' ){
                index = this.trIndex
                this.trIndex++
            }
            
            //_g.log(data)
            
            let tr = $('<dl/>')
                        .attr({
                            'trindex': 		index,
                            'data-fleetid': data._id || 'PLACEHOLDER',
                            //'data-infos': 	'[[FLEET::'+JSON.stringify(data)+']]'
                            'data-infos': 	'[[FLEET::'+data._id+']]',
                            'data-theme':	data.theme,
                            'class': 		'link_fleet'
                        })
                        .data({
                            'initdata': 	data
                        })
            
            this.columns.forEach(function(column){
                switch( column[1] ){
                    case ' ':
                        var ships = data['data'][0] || []
                            ,j = 0
                            ,count = Math.min(8, Math.max(6, ships.length))
                            ,html = `<i data-count="${count}">`
                        while( j < count ){
                            if( ships[j] && ships[j][0] )
                                html+='<img class="img'+(_huCss.csscheck_full('mask-image') ? '' : ' nomask')
                                        +'" src="' + _g.path.pics.ships + '/' + ships[j][0]+'/0'
                                        + TablelistFleets.avatarImgSuffix
                                        + '" contextmenu="disabled"'
                                        + '/>'
                            else
                                html+='<s class="img'+(_huCss.csscheck_full('mask-image') ? '' : ' nomask')+'"/>'
                            j++
                        }
                        html+='</i>'
                        $('<dt/>')
                            .attr(
                                'value',
                                data['name']
                            )
                            .html(
                                html
                                + '<strong>' + data['name'] + '</strong>'
                                + '<em></em>'
                            )
                            .appendTo(tr)
                        break;
                    default:
                        var datavalue = data[column[1]]
                        $('<dd/>')
                            .attr(
                                'value',
                                datavalue
                            )
                            .html( datavalue )
                            .appendTo(tr)
                        break;
                }
            })
            
            if( isPrepend === true )
                return tr
    
            if( isPrepend )
                tr.prependTo( this.dom.tbody )
            else
                tr.insertBefore( this.flexgrid_ph )
    
            return tr
        }

    // [按钮操作] 新建/导入配置
        btn_new(target){
            if( !this.menu_new ){
                const items = [
                    $('<div class="menu-fleets-new"/>')
                        .append(
                            $('<menuitem/>').html('新建配置')
                                .on('click', function(){
                                    this.action_new()
                                }.bind(this))
                        )
                        .append(
                            $('<menuitem/>').html('导入配置代码')
                                .on('click', function(){
                                    if( !TablelistFleets.modalImport ){
                                        TablelistFleets.modalImport = $('<div/>')
                                            .append(
                                                TablelistFleets.modalImportTextarea = $('<textarea/>',{
                                                    'placeholder': '输入配置代码...'
                                                })
                                            )
                                            .append(
                                                $('<p/>').html('* 配置代码兼容<a href="http://www.kancolle-calc.net/deckbuilder.html">艦載機厨デッキビルダー</a>')
                                            )
                                            .append(
                                                $('<p class="aircraftimportmax"/>')
                                                    .append(
                                                        TablelistFleets.modalImportCheckAircraftMax = $('<input/>',{
                                                            'type':	'checkbox',
                                                            'id':	'_input_g' + _g.inputIndex
                                                        }).prop('checked', Lockr.get( 'fleetlist-option-aircraftimportmax' ))
                                                    )
                                                    .append($('<label/>',{
                                                            'class':'checkbox',
                                                            'for':	'_input_g' + (_g.inputIndex++),
                                                            'html':	'飞行器熟练度自动提升至'
                                                        }) )
                                            )
                                            .append(
                                                TablelistFleets.modalImportBtn = $('<button class="button"/>').html('导入')
                                                    .on('click', function(){
                                                        let val = TablelistFleets.modalImportTextarea.val()
                                                        //console.log(val)
                                                        if( val ){
                                                            val = JSON.parse(val)
                                                            if( !val.length || !val.push )
                                                                val = _g.kancolle_calc.decode(val)
                                                            this.action_new({
                                                                'data': 	val
                                                            },{
                                                                // 'aircraftmax': TablelistFleets.modalImportCheckAircraftMax.prop('checked') || Lockr.get( 'fleetlist-option-aircraftimportmax' )
                                                                'aircraftmax': TablelistFleets.modalImportCheckAircraftMax.prop('checked')
                                                            })
                                                            _frame.modal.hide()
                                                            TablelistFleets.modalImportTextarea.val('')
                                                        }
                                                    }.bind(this))
                                            )
                                    }
                                    TablelistFleets.modalImportTextarea.val('')
                                    /*
                                    TablelistFleets.modalImportBtn.off('click.import')
                                        .on('click', function(){
                                            let val = TablelistFleets.modalImportTextarea.val()
                                            //console.log(val)
                                            if( val ){
                                                val = JSON.parse(val)
                                                if( !val.length || !val.push )
                                                    val = _g.kancolle_calc.decode(val)
                                                this.action_new({
                                                    'data': 	val
                                                })
                                                _frame.modal.hide()
                                                TablelistFleets.modalImportTextarea.val('')
                                            }
                                        }.bind(this))
                                        */
                                    _frame.modal.show(
                                        TablelistFleets.modalImport,
                                        '导入配置代码',
                                        {
                                            'classname': 	'infos_fleet infos_fleet_import',
                                            'detach':		true
                                        }
                                    )
                                }.bind(this))
                        )
                        .append(
                            TablelistFleets.support.buildfile
                                ? $('<menuitem class="import_file"/>').html('导入配置文件').on('click', function(){
                                        this.dbfile_selector.trigger('click')
                                    }.bind(this))
                                : null
                        )
                ]
                let event
                if (_g.getCurrentEvent().some(e => {
                    if (e.code === 'leyteB') {
                        event = e
                        return true
                    }
                    return false
                })) {
                    items.push(
                        $('<hr/>')
                    )
                    items.push(
                        $('<small class="subtitle">期间限定</small>')
                    )
                    items.push(
                        $(`<div class="title">${event.title[_g.lang]}</div>`)
                    )
                    items.push(
                        $('<menuitem class="shipavatar"/>')
                            .html('<small class="sup">新建配置</small>第一游击部队 第三部队（西村队）')
                            .on('click', function(){
                                const data = {"version":4,"f1":{"s1":{"id":411,"luck":-1,"items":{}},"s2":{"id":412,"luck":-1,"items":{}},"s3":{"id":73,"luck":-1,"items":{}},"s4":{"id":489,"luck":-1,"items":{}},"s5":{"id":327,"luck":-1,"items":{}},"s6":{"id":328,"luck":-1,"items":{}},"s7":{"id":145,"luck":-1,"items":{}}},"f2":{},"f3":{},"f4":{},"fField":{}}
                                this.action_new({
                                    name: '第一游击部队 第三部队（西村队）',
                                    data: _g.kancolle_calc.decode(data)
                                },{
                                    // 'aircraftmax': TablelistFleets.modalImportCheckAircraftMax.prop('checked') || Lockr.get( 'fleetlist-option-aircraftimportmax' )
                                    'aircraftmax': Lockr.get( 'fleetlist-option-aircraftimportmax' )
                                })
                            }.bind(this))
                    )
                    items.push(
                        $('<menuitem class="shipavatar"/>')
                            .html('<small class="sup">新建配置</small>第二游击部队（志摩队）')
                            .on('click', function(){
                                const data = {"version":4,"f1":{"s1":{"id":192,"luck":-1,"items":{}},"s2":{"id":193,"luck":-1,"items":{}},"s3":{"id":200,"luck":-1,"items":{}},"s4":{"id":231,"luck":-1,"items":{}},"s5":{"id":407,"luck":-1,"items":{}},"s6":{"id":226,"luck":-1,"items":{}},"s7":{"id":470,"luck":-1,"items":{}}},"f2":{},"f3":{},"f4":{},"fField":{}}
                                this.action_new({
                                    name: '第二游击部队（志摩队）',
                                    data: _g.kancolle_calc.decode(data)
                                },{
                                    // 'aircraftmax': TablelistFleets.modalImportCheckAircraftMax.prop('checked') || Lockr.get( 'fleetlist-option-aircraftimportmax' )
                                    'aircraftmax': Lockr.get( 'fleetlist-option-aircraftimportmax' )
                                })
                            }.bind(this))
                    )
                }
                this.menu_new = new _menu({
                    'target': 	this.dom.btn_new,
                    'className':'menu-fleets-new',
                    items
                })
                this.dbfile_selector = $('<input type="file" class="none"/>')
                    .on('change', function(e){
                        return this.importBuilds(this.dbfile_selector)
                    }.bind(this))
                    .appendTo(this.dom.filters)
            }
            
            if( target && target.clientX )
                return this.menu_new.show(target.clientX, target.clientY)
            return this.menu_new.show(target)
        }

    // [按钮操作] 选项设置
        btn_settings(){
            TablelistFleets.menuOptions_show(this.dom.btn_settings, this)
        }

    // [操作] 新建配置
        action_new( dataDefault, options ){
            dataDefault = dataDefault || {}
            options = options || {}
            //_frame.infos.show('[[FLEET::__NEW__]]')
            
            if( dataDefault.data ){
                let i = 0;
                dataDefault.data.forEach(function(fleet){if( fleet && fleet.push ){
                    if( i < 4 ){
                        fleet.forEach(function(ship){if( ship && ship.push ){
                            ship[2].forEach(function(equipmentId, index){
                                if( equipmentId && $.inArray(_g.data.items[equipmentId].type, Formula.equipmentType.Aircrafts) > -1 ){
                                    if( _g.data.items[equipmentId].rankupgradable ){
                                        if( options.aircraftmax )
                                            ship[4][index] = 7
                                        // else
                                            // ship[4][index] = ship[3][index] || null
                                    }
                                    // ship[3][index] = null
                                }
                            })
                        }})
                    }else{
                        fleet.forEach(function(field){if( field && field.push ){
                            field.forEach(function(aircraft, index){
                                if( aircraft
                                    && aircraft[0]
                                    && $.inArray(_g.data.items[aircraft[0]].type, Formula.equipmentType.Aircrafts) > -1
                                    && _g.data.items[aircraft[0]].rankupgradable
                                    && options.aircraftmax
                                ){
                                    aircraft[1] = 7
                                }
                            })
                        }})
                    }
                    i++;
                }})
                InfosFleet.clean(dataDefault.data)
            }
    
            _db.fleets.insert( this.new_data(dataDefault, options), function(err, newDoc){
                console.log(err, newDoc)
                if(err){
                    _g.error(err)
                }else{
                    if( _frame.app_main.cur_page == 'fleets' ){
                        _frame.infos.show('[[FLEET::' + newDoc['_id'] + ']]')
                        this.menu_new.hide()
                        //this.init(newDoc)
                        
                        //for(let i in _g.data.fleets_tablelist.lists){
                        //	_g.data.fleets_tablelist.lists[i].append_item( newDoc, null, true )
                        //}
                    }
                }
            }.bind(this))
        }

    // 处理舰载机厨的单项数据，返回新格式
        parse_kancolle_calc_data(obj){
            return this.new_data(obj)
        }

    // 菜单
        contextmenu_show($tr, $em, is_rightclick){		
            if( !TablelistFleets.contextmenu ) {
                const items = [
                    $('<menuitem/>').html('详情')
                        .on({
                            'click': function(e){
                                TablelistFleets.contextmenu.curel.trigger('click', [true])
                            }
                        }),
                        
                    $('<menuitem/>').html('导出配置代码')
                        .on({
                            'click': function(e){
                                InfosFleet.modalExport_show(TablelistFleets.contextmenu.curel.data('initdata'))
                            }
                        }),
                        
                    $('<menuitem/>').html('导出配置文本')
                        .on({
                            'click': function(e){
                                InfosFleet.modalExportText_show(TablelistFleets.contextmenu.curel.data('initdata'))
                            }
                        }),
                        
                    $('<menuitem/>').html('移除')
                        .on({
                            'click': function(e){
                                let id = TablelistFleets.contextmenu.curel.attr('data-fleetid')
                                if( id ){
                                    InfosFleet.modalRemove_show(id, TablelistFleets.contextmenu.curobject)
                                }
                                /*
                                _db.fleets.remove({
                                    _id: id
                                }, { multi: true }, function (err, numRemoved) {
                                    _g.log('Fleet ' + id + ' removed.')
                                    _db.fleets.count({}, function(err, count){
                                        if( !count )
                                            TablelistFleets.contextmenu.curobject.dom.container.addClass('nocontent')
                                    })
                                });
                                TablelistFleets.contextmenu.curel.remove()
                                */
                            }
                        }),
                    
                    $('<menuitem class="remove-all-same-theme"/>')
                        .html('<span class="theme-block"></span>移除所有该主题颜色的配置')
                        .on({
                            'click': function(e){
                                TablelistFleets.modalRemoveAllSameTheme_show(TablelistFleets.contextmenu.curobject)
                            }
                        })
                ]
                TablelistFleets.contextmenu = new _menu({
                    'className': 'contextmenu-fleet',
                    items
                })
            }

            TablelistFleets.contextmenu.curobject = this
            TablelistFleets.contextmenu.curel = $tr

            TablelistFleets.contextmenu.dom.menu.attr('data-theme', $tr.data('theme'))

            if( is_rightclick )
                TablelistFleets.contextmenu.show(is_rightclick.clientX, is_rightclick.clientY)
            else
                TablelistFleets.contextmenu.show($em || $tr)
        }
    
    
    // 生成列表
        genlist(callback){
            // console.log(`========== Fleet list generating ==========`)
            // const t0 = performance.now()

            Q.fcall(function(){})
    
                //promise_chain
    
            // 读取已保存数据
                .then(function(){
                    return this.loaddata()
                }.bind(this))
            
            // 检查每条数据
                .then(function(arr){
                    return this.validdata(arr)
                }.bind(this))
    
            // 如果没有数据，标记状态
                .then(function(arr){
                    return this.datacheck(arr)
                }.bind(this))
    
            // [创建] 全部数据行
                .then(function(arr){
                    return this.append_all_items(arr)
                }.bind(this))
    
            // [框架] 标记读取完成
                .then(function(){
                    setTimeout(function(){
                        _frame.app_main.loaded('tablelist_'+this._index, true)
                    }.bind(this), 100)
                }.bind(this))
    
            // 错误处理
                .catch(function (err) {
                    _g.log(err)
                })
                .done(function(){
                    if( callback )
                        callback()
                    _g.log('Fleets list DONE')
                    // const t1 = performance.now()
                    // console.log(`========== Fleet list generated took ${t1 - t0}ms ==========`)
                })
        }
    
    
    // 重新生成列表
        refresh(){
            console.log('refresh')
            this.dom.tbody.empty()
            this.genlist(function(){
                this.dom.tbody.scrollTop(this.dom.tbody.attr('scrollbody') || 0)
            }.bind(this))
        }
    
    // 导入配置文件
        importBuilds( $selector, filename ){
            $selector = $selector || this.dbfile_selector

            _frame.app_main.loading_start('tablelist_fleets_import', false)
            $selector.prop('disabled', true)
            
            let master_deferred = Q.defer()
                ,promise_chain 	= Q.fcall(function(){
                    let deferred = Q.defer()
                    if( _g.isNWjs && filename ){
                        // NW.js - 使用node.js方式读取文件内容
                        let val = $selector.val()
                        if( val.indexOf(';') > -1 )
                            val = node.path.dirname( val.split(';')[0] )
                        node.fs.readFile( node.path.join(val, filename) , 'utf8', function(err, data){
                            if( err )
                                deferred.reject('文件载入失败', new Error(err))
                            else
                                deferred.resolve(data)
                        })
                    }else{
                        // HTML5方式
                        // http://www.html5rocks.com/en/tutorials/file/dndfiles/
                        for(let i = 0, f; f = $selector[0].files[i]; i++){
                            let reader = new FileReader();
                            reader.onload = (function(theFile) {
                                return function(r) {
                                    return deferred.resolve(r.target.result)
                                };
                            })(f);
                            reader.readAsText(f);
                        }
                    }
                    return deferred.promise
            })

            promise_chain = promise_chain
            // 处理文件内容，以换行符为准创建Array
                .then(function(data){
                    $selector.val('')

                    let array = []
                        ,deferred = Q.defer()
                    data.split('\n').forEach(function(line){
                        if( line ){
                            try{
                                array.push(JSON.parse(line))
                            }catch(e){
                                deferred.reject('文件格式错误', e)
                            }
                            deferred.resolve(array)
                        }else{
                            deferred.reject('文件无内容')
                        }
                    })
                    return deferred.promise
                })
            
            // 已处理JSON，导入
                .then(function(array){
                    let deferred = Q.defer()
                        ,chain = Q()
                    array.forEach(function(data){
                        chain = chain.then(function(){
                            let deferred = Q.defer()
                            _db.fleets.insert(data, function(err){
                                if(err){
                                    if( err.errorType == "uniqueViolated" ){
                                        TablelistFleets.modalBuildConflictShow(data, deferred)
                                    }else{
                                        deferred.reject(err)
                                    }
                                }else{
                                    deferred.resolve()
                                }
                            })
                            return deferred.promise
                        })
                    })
                    chain = chain
                        .then(function(){
                            deferred.resolve()
                        })
                        .catch(function(err){
                            deferred.reject(err)
                        })
                        .done(function(){
                            _frame.modal.hide()
                        })
                    return deferred.promise
                })
            
            promise_chain = promise_chain
                .then(function(){
                    this.refresh()
                    _g.badgeMsg('成功导入配置')
                    master_deferred.resolve()
                }.bind(this))
            
            // 错误处理
                .catch(function(msg, err) {
                    _g.log(msg)
                    _g.error(err, '[舰队] 导入配置文件')
                    _g.badgeError(msg)
                    master_deferred.reject(msg, err)
                })
                .done(function(){
                    _frame.app_main.loading_complete('tablelist_fleets_import')
                    $selector.prop('disabled', false)
                })
            
            return master_deferred.promise
        }
}

TablelistFleets.support = {};
TablelistFleets.support.buildfile = (_g.isNWjs || (window.File && window.FileReader && window.FileList && window.Blob && window.URL)) ? true : false;

TablelistFleets.avatarImgSuffix = _huCss.csscheck_full('mask-image') ? '.'+_g.imgExt : '-2.png'

TablelistFleets.menuOptions_show = function( $el, $el_tablelist ){
    if( !TablelistFleets.menuOptions ){
        let items = [
                $('<menuitem class="mod-checkbox donot_hide option-in-tablelist option-groupbytheme"/>')
                    .append($('<input/>',{
                            'type':	'checkbox',
                            'id':	'_input_g' + _g.inputIndex
                        }).prop('checked', Lockr.get( 'fleetlist-option-groupbytheme' ))
                        .on('change', function(e){
                            Lockr.set( 'fleetlist-option-groupbytheme', e.target.checked )
                            if( TablelistFleets.menuOptions.curTablelist ){
                                TablelistFleets.menuOptions.curTablelist.dom.tbody.empty()
                                TablelistFleets.menuOptions.curTablelist.genlist()
                            }
                        }))
                    .append($('<label/>',{
                            'for':	'_input_g' + (_g.inputIndex++),
                            'html':	'按主题颜色进行分组'
                        })),

                $('<menuitem class="mod-checkbox donot_hide option-in-tablelist option-aircraftdefaultmax option-aircraftimportmax"/>')
                    .append($('<input/>',{
                            'type':	'checkbox',
                            'id':	'_input_g' + _g.inputIndex
                        }).prop('checked', Lockr.get( 'fleetlist-option-aircraftimportmax' ))
                        .on('change', function(e){
                            Lockr.set( 'fleetlist-option-aircraftimportmax', e.target.checked )
                        }))
                    .append($('<label/>',{
                            'for':	'_input_g' + (_g.inputIndex++),
                            'html':	'导入配置时提升飞行器熟练度至'
                        })),

                //$('<hr class="option-in-tablelist"/>'),

                $('<menuitem class="mod-checkbox donot_hide option-aircraftdefaultmax"/>')
                    .append($('<input/>',{
                            'type':	'checkbox',
                            'id':	'_input_g' + _g.inputIndex
                        }).prop('checked', Lockr.get( 'fleetlist-option-aircraftdefaultmax' ))
                        .on('change', function(e){
                            Lockr.set( 'fleetlist-option-aircraftdefaultmax', e.target.checked )
                        }))
                    .append($('<label/>',{
                            'for':	'_input_g' + (_g.inputIndex++),
                            'html':	'<span class="inline option-in-tablelist">配装时</span>新增飞行器熟练度默认为'
                        })),

                $('<hr class="option-in-infos"/>'),

                $('<menuitem/>',{
                        'class':	'option-in-infos',
                        'html':		'移除配置'
                    }).on('click', function(){
                        console.log(InfosFleet.cur)
                        if( InfosFleet.cur )
                            InfosFleet.cur.remove()
                    })
            ]
                
        if( _g.isNWjs ){
            items = items.concat(TablelistFleets.menuOptionsItemsBuildsLocation())
        }

        TablelistFleets.menuOptions = new _menu({
            'className':	'menu-tablelistfleets-options',
            'items': items
        })
    }

    TablelistFleets.menuOptions.curTablelist = $el_tablelist || null
    
    if( $el_tablelist )
        TablelistFleets.menuOptions.dom.menu.addClass('is-tablelist')
    else
        TablelistFleets.menuOptions.dom.menu.removeClass('is-tablelist')
    TablelistFleets.menuOptions.show($el)
}

TablelistFleets.modalBuildConflictShow = function(data, deferred){
    if( !data )
        return 
    
    if( !TablelistFleets.modalBuildConflict ){
        TablelistFleets.modalBuildConflict = $('<div/>')
            .append( $('<h4>原配置</h4>') )
            .append( TablelistFleets.modalBuildConflictOld = $('<dl class="link_fleet"/>') )
            .append( $('<h4>新配置</h4>') )
            .append( TablelistFleets.modalBuildConflictNew = $('<dl class="link_fleet"/>') )
            .append(
                $('<p class="actions"/>')
                    .append( TablelistFleets.modalBuildConflictButtonConfirm = $('<button/>',{
                            'class':	'button',
                            'html':		'替换'
                        }) )
                    .append( TablelistFleets.modalBuildConflictButtonCancel = $('<button/>',{
                            'class':	'button',
                            'html': 	'跳过'
                        }) )
            )
    }

    let dataOld
        ,htmlFleet = function(data){
            let html = '<i>'
                ,ships = InfosFleet.decompress(data.data)[0] || []
                ,j = 0;
            while( j < 6 ){
                if( ships[j] && ships[j][0] )
                    html+='<img class="img'+(_huCss.csscheck_full('mask-image') ? '' : ' nomask')
                            +'" src="' + _g.path.pics.ships + '/' + ships[j][0]+'/0'
                            + TablelistFleets.avatarImgSuffix
                            + '" contextmenu="disabled"'
                            + '/>'
                else
                    html+='<s class="img'+(_huCss.csscheck_full('mask-image') ? '' : ' nomask')+'"/>'
                j++
            }
            html+='</i>'
            html = `<dt>${html}<strong>${data['name']}</strong></dt>`
                + `<span>最后更新: ${ (new Date(data.time_modify)).format('%Y年%m月%d日 %G:%i:%s') }</span>`
            return html
        }

    Q.fcall(function(){
        let _deferred = Q.defer()
        _db.fleets.find({
            _id: data._id
        }, function(err, docs){
            if( err ){
                if( deferred )
                    deferred.reject(err)
                else
                    _g.log(err)
            }else{
                dataOld = docs[0]
                _deferred.resolve()
            }
        })
        return _deferred.promise
    })
    .then(function(){
        TablelistFleets.modalBuildConflictButtonConfirm
            .off('click')
            .on('click', function(){
                _db.fleets.update({
                    _id: data._id
                }, data, {}, function(err, numReplaced){
                    if( err ){
                        if( deferred )
                            deferred.reject(err)
                        else
                            _g.log(err)
                    }else{
                        _g.log('build updated ' + numReplaced)
                        if( _frame.infos.contentCache.fleet && _frame.infos.contentCache.fleet[data._id] ){
                            _frame.infos.contentCache.fleet[data._id].remove()
                            delete _frame.infos.contentCache.fleet[data._id]
                            try{
                                delete _frame.app_main.loading_state[_g.state2URI({
                                        'infos':	'fleet',
                                        'id':		data._id
                                    })]
                            }catch(e){}
                        }
                    }
                    if( deferred )
                        deferred.resolve()
                })
            })

        if( data.time_modify > dataOld.time_modify ){
            TablelistFleets.modalBuildConflictButtonConfirm.trigger('click')
        }else if( data.time_modify < dataOld.time_modify ){
            TablelistFleets.modalBuildConflictOld
                .attr({
                    'data-theme':	dataOld.theme,
                    'class': 		'link_fleet'
                }).html(htmlFleet(dataOld))

            TablelistFleets.modalBuildConflictNew
                .attr({
                    'data-theme':	data.theme,
                    'class': 		'link_fleet'
                }).html(htmlFleet(data))

            TablelistFleets.modalBuildConflictButtonCancel
                .off('click')
                .on('click', function(){
                    if( deferred )
                        deferred.resolve()
                })

            _frame.modal.show(
                TablelistFleets.modalBuildConflict,
                '配置冲突',
                {
                    'classname': 	'infos_fleet infos_fleet_import_conflict',
                    'detach':		true,
                    'onClose': 		function(){
                        if( deferred )
                            deferred.resolve()
                    }
                }
            )
        }else{
            if( deferred )
                deferred.resolve()
        }

    })
};

TablelistFleets.modalRemoveAllSameTheme_show = (list) => {
    // return false

    const run = () => {
        const theme = TablelistFleets.contextmenu.curel.data('theme')
        const loadingId = 'remove_fleet_same_theme_' + theme
        _g.log(`Removing all fleet in theme ${theme}...`)
        _frame.app_main.loading_start(loadingId, false)
        _db.fleets.remove({
            theme: parseInt(theme)
        }, {
            multi: true
        }, function(err, numRemoved) {
            _frame.app_main.loading_complete(loadingId)
            _frame.modal.hide()
            _g.badgeMsg('已删除配置')
            if (typeof list === 'object' && list.refresh) {
                list.refresh()
            }
        })
    }

    if (!TablelistFleets.elModalRemoveAllSameTheme) {
        TablelistFleets.elModalRemoveAllSameTheme = $('<form/>')
            .append($('<p/>').html('是否删除所有该主题颜色的舰队配置？'))
            .append(
            $('<p class="actions"/>')
                .append(
                $('<button/>', {
                    'type': 'submit',
                    'class': 'button',
                    'html': '是'
                })
                )
                .append(
                $('<button/>', {
                    'type': 'button',
                    'class': 'button',
                    'html': '否'
                }).on('click', function () {
                    _frame.modal.hide()
                })
                )
            ).on('submit', function (e) {
                e.preventDefault()
                run()
                // let _id = TablelistFleets.elModalRemoveId.val()
                // if (_id) {
                //     _frame.app_main.loading_start('remove_fleet_' + _id, false)
                //     _db.fleets.remove({
                //         _id: _id
                //     }, { multi: true }, function (err, numRemoved) {
                //         _g.log('Fleet ' + _id + ' removed.')
                //         _frame.app_main.loading_complete('remove_fleet_' + _id)
                //         _frame.modal.hide()
                //         _g.badgeMsg('已删除配置')
                //         if (typeof is_list === 'object' && is_list.refresh) {
                //             is_list.refresh()
                //         } else {
                //             _frame.dom.navs.fleets.click()
                //         }
                //     });
                // }
                return false
            })
    }

    _frame.modal.show(
        TablelistFleets.elModalRemoveAllSameTheme,
        '删除配置',
        {
            'classname': 'infos_fleet infos_fleet_remove',
            'detach': true
        }
    )
}
