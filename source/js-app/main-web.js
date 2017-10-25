// Global Variables
    _g.db_version = '20171026';

    _g.bgimg_count = 0;

    _g.event = {
        'animationend':			'animationend webkitAnimationEnd',
        'animationiteration':	'animationiteration webkitAnimationIteration',
        'transitionend':		'transitionend webkitTransitionEnd mozTransitionEnd'
    };
    
    _g.path = {
        'db': 		'/!/db/',
        'bgimg_dir':'/!/assets/images/homebg/',
        'pics': {
            ships: 		'/!/pics-ships/',
            shipsExtra: '/!/pics-ships-extra/',
            items: 		'/!/pics/items/'
        }
    }
    KC.path.pics = _g.path.pics
    
    _g.dbs = [
        'ships',
        'ship_types',
        'ship_classes',
        'ship_series',
        'ship_namesuffix',
        
        'items',
        'item_types'
    ];

    _g.data = {
        'ships': {},
        'items': {}
    }
    KC.db = _g.data

    var _db = {
        'fleets': new Nedb({
                filename: 	'fleets'
            })
    }











// extend Nedb
    // 根据 _id 更新数据，替换为新内容 docReplace，并执行 callback
    // 该方法会采用队列，即上一个更新操作正在进行时，新的更新操作会进入队列
        // 此时如果又有新的更新操作，之前队列的更新操作会被替换
        // 注：前一个callback将不会执行 
        Nedb.prototype.updateById = function( _id, docReplace, callback ){
            if( !this._updateByIdQueue ){
                this._updateByIdQueue = {}
                Object.defineProperty(this._updateByIdQueue, 'running', {
                    enumerable: false,
                    value: false,
                    writable: true
                })
            }
            
            docReplace = docReplace || {}
            docReplace._id = _id
            
            this._updateByIdQueue[_id] = {
                docReplace: docReplace,
                callback: callback || function(){}
            }
            
            this._updateById()
        }
        Nedb.prototype._updateById = function(){
            if( !this._updateByIdQueue || this._updateByIdQueue.running )
                return false

            let _id
            for(let i in this._updateByIdQueue){
                if( this._updateByIdQueue[i] ){
                    _id = i
                    break;
                }
            }
            
            if( !_id )
                return false
            
            let queue = this._updateByIdQueue[_id]
            
            this._updateByIdQueue[_id] = null
            delete this._updateByIdQueue[_id]
            
            this._updateByIdQueue.running = true
            
            this.update({
                _id: _id
            }, queue.docReplace, {}, function (err, numReplaced) {
                queue.callback.call(this, err, numReplaced)
                this._updateByIdQueue.running = false
                this._updateById()
            }.bind(this))
        }
















// Global Functions
    _g.log = function(){
        console.log.apply(console, arguments)
    }
    
    _g.parseURI = function(uri){
        uri = uri || location.pathname
        let parts = uri.split('/').filter(function(c){return c})
        
        if( !parts.length ){
            return {
                'page':		'home'
            }
        }else if( parts.length == 1 ){
            return {
                'page':		parts[0]
            }
        }else if( parts.length == 2 ){
            let t = parts[0]
            switch( t ){
                case 'ships':		t = 'ship';			break;
                case 'equipments':	t = 'equipment';	break;
                case 'entities':	t = 'entity';		break;
                case 'fleets':
                    t = 'fleet';
                    parts[1] = _g.uriSearch('i') || '__NEW__'
                    break;
            }
            return {
                'infos':	t,
                'id':		parts[1]
            }
        }
    }
    
    _g.state2URI = function(state){
        if( !state || state.page == 'home' )
            return '/'
            
        if( state.page )
            return '/' + state.page + '/'
            
        if( state.infos ){
            var t = state.infos
                ,extra = ''
            switch(t){
                case 'ship':		t = 'ships';		break;
                case 'equipment':	t = 'equipments';	break;
                case 'entity':		t = 'entities';		break;
                case 'fleet':
                    t = 'fleets';
                    extra = '?i='+state.id;
                    state.id = 'build';
                    break;
            }
            return '/' + t + '/' + state.id + '/' + extra
        }
    }
    
    _g.save = function( url, n ){
        if( !_g.save_ )
            _g.save_ = document.createElement('a')
        _g.save_.href = url
        if( typeof _g.save_.download != 'undefined' )
            _g.save_.download = n
        else
            _g.save_.target = '_blank'
        _g.save_.click()
    };
    
    _g.getScriptCanvas = function(){
        let deferred = Q.defer();
        $.getScript('/!/assets/lib.canvas.min.js', function(){
            deferred.resolve();
        });
        return deferred.promise
    };

    _g.getLink = function( t, id ){
        return _g.state2URI({
            'infos':t,
            'id': 	id
        })
    }
    
    _g.getImg = function( t, id, img ){
        return `${_g.path.pics[t]}/${id}/${img}.png`
    }
















// Global Frame
_frame.app_main = {
    page: {},
    page_dom: {},
    page_html: {},
    page_title: {},

    // is_init: false

    // cur_page: null

    // 尚未载入完毕的内容
        loading: [
            'dbs',
            'bgimgs'
        ],
        // is_loaded: false,

    // 页面初始化载入完毕后执行的函数组
        functions_on_ready: [],

    // 载入完毕一项内容，并检查其余内容是否载入完毕
    // 如果全部载入完毕，#layout 添加 .ready
        loaded: function( item, is_instant ){
            _g.log(item + ' loaded.')
            if( item ){
                if( this.loading.indexOf(item) > -1 ){
                    this.loading.splice(this.loading.indexOf(item), 1)
                    this.is_loaded = false
                }
            }
            if( !this.loading.length && !this.is_loaded ){
                setTimeout(function(){
                    if( _frame.app_main.is_loaded && !_frame.app_main.loading.length && !$html.hasClass('app-ready') ){
                        _frame.dom.layout.addClass('ready')
                        $html.addClass('app-ready')
                        setTimeout(function(){
                            let i = 0;
                            while( _frame.app_main.functions_on_ready[i] ){
                                _frame.app_main.functions_on_ready[i++]()
                            }
                            /*
                            for(let i=0; i<_frame.app_main.functions_on_ready.length; i++){
                                _frame.app_main.functions_on_ready[i]()
                            }*/
                        }, 1500)
                    }
                }, is_instant ? 300 : 1000)

                // 绑定onhashchange事件
                //	$window.on('hashchange.pagechange', function(){
                //		_frame.app_main.load_page_func(_g.uriHash('page'))
                //	})

                // 初次进入
                    if( !this.window_event_bound ){
                        $window.on('popstate._global', function(e){
                            if( e.originalEvent && e.originalEvent.state ){
                                _frame.app_main.state( e.originalEvent.state )
                            }else{
                                _frame.app_main.state( _g.parseURI() )
                            }
                        }).trigger('popstate._global')
                        this.window_event_bound = true
                    }

                //this.load_page_func(_g.uriHash('page'))
                this.is_loaded = true
            }
        },


    // pushState
        pushState: function( stateObj, title, url ){
            history.pushState( stateObj, title, url )
            
            //console.log(stateObj)

            //if( !stateObj['infos'] )
            //	_frame.infos.hide()
        },


    // 根据 history state 运行相应函数
        state: function( stateObj ){
            //_g.log( stateObj )
            if( stateObj['infos'] ){
                _frame.infos.show_func( stateObj['infos'], stateObj['id'], null, stateObj['infosHistoryIndex'] )
            }else{
                _frame.infos.hide()
            }
            if( stateObj['page'] ){
                this.load_page_func( stateObj['page'] )
            }
        },
    
    
    
    
    // 载入中
        loading_queue: [],
        loading_state: {},
        //loading_cur: null,
        loading_start: function( url, callback_success, callback_error, callback_successAfter, callback_beforeSend, callback_complete ){
            url = url || location.pathname
            let isUrl = true
            
            if( typeof callback_success == 'object' ){
                isUrl = typeof callback_success.isUrl != 'undefined' ? callback_success.isUrl : true
                callback_error = callback_success.error
                callback_successAfter = callback_success.successAfter
                callback_beforeSend = callback_success.beforeSend
                callback_complete = callback_success.complete
                callback_success = callback_success.success
            }else if( callback_success === false ){
                isUrl = false
            }

            callback_beforeSend = callback_beforeSend || function(){}
            callback_success = callback_success || function(){}
            callback_successAfter = callback_successAfter || function(){}
            callback_error = callback_error || function(){}
            callback_complete = callback_complete || function(){}

            this.loading_cur = url
            
            if( typeof this.loading_state[url] == 'undefined' || this.loading_state[url] == 'fail' ){
                if( this.loading_state[url] != 'fail' )
                    this.loading_state[url] = 'loading'
                this.loading_queue.push(url)
                _frame.dom.layout.addClass('is-loading')

                if( isUrl ){
                    $.ajax({
                        'url':		url,
                        'type':		'get',
                        'dataType':	'html',
                        
                        'beforeSend': function( jqXHR, settings ){
                            callback_beforeSend( url, jqXHR, settings )
                        },
                        
                        'success': function(data){
                            let result_main = /\<main\>(.+)\<\/main\>/.exec(data)
                                ,result_title = /\<title\>([^\<]+)\<\/title\>/.exec(data)
                            if( result_title && result_title.length > 1 ){
                                _frame.app_main.page_title[url] = result_title[1]
                            }
                            callback_success( result_main && result_main.length > 1 ? result_main[1] : '' )
                            if( url == _frame.app_main.loading_cur ){
                            //if( url == location.pathname ){
                                callback_successAfter( result_main && result_main.length > 1 ? result_main[1] : '' )
                            }
                            _frame.app_main.loading_state[url] = 'complete'
                        },
                        
                        'error': function( jqXHR, textStatus, errorThrown ){
                            errorThrown = errorThrown || ''
                            _g.log( 'Loading Fail: ' + url + ' [' + textStatus + '] (' + errorThrown + ')' )
                            
                            if( _frame.app_main.loading_state[url] == 'fail'
                                || [
                                    'Bad Request',
                                    'Not Found',
                                    'Forbidden'
                                ].indexOf(errorThrown) > -1)
                                return _frame.app_main.loading_fail(url, textStatus, errorThrown, callback_error)
    
                            _frame.app_main.loading_state[url] = 'fail'
                        },
                        
                        'complete': function( jqXHR, textStatus ){
                            _frame.app_main.loading_complete( url )
                            callback_complete( url, jqXHR, textStatus )
                            
                            if( _frame.app_main.loading_state[url] == 'fail' ){
                                console.log('retry')
                                url+= (url.substr(url.length - 1) == '/' ? '' : '/') + 'index.html'
                                _frame.app_main.loading_start( url, callback_success, callback_error, callback_successAfter, callback_beforeSend, callback_complete )
                            }
                        }
                    })
                }else{
                    
                }
            }else if( this.loading_state[url] == 'complete' ){
                callback_success()
                callback_successAfter()
            }
        },
        
        loading_complete: function( url ){
            if( !url )
                return
            if( url == this.loading_cur )
                this.loading_cur = null
            let i = this.loading_queue.indexOf(url)
            if( i >= 0 )
                this.loading_queue.splice(i, 1)
            if( this.loading_queue.length )
                return
            _frame.dom.layout.removeClass('is-loading')
        },
        
        loading_fail: function( url, textStatus, errorThrown, callback_error ){
            if( !url )
                return
            if( this.loading_state )
                delete this.loading_state[url]

            _frame.dom.layout.attr('data-errorbadge', url + ' 载入失败 (' + errorThrown + ')')
            clearTimeout( this.loading_fail_timeout_errorbadge )
            this.loading_fail_timeout_errorbadge = setTimeout(function(){
                _frame.dom.layout.removeAttr('data-errorbadge')
                delete _frame.app_main.loading_fail_timeout_errorbadge
            }, 3000)
            console.log( callback_error )
            return callback_error( url, textStatus, errorThrown )
        },





    // 更换页面
        load_page: function( page, options ){
            if( this.cur_page == page || !page )
                return page

            options = options || {}

            this.pushState(
                {
                    'page': 	page
                },
                null,
                _g.state2URI({
                    'page': 	page
                })
                //'?page=' + page
            )
            
            this.load_page_func( page, options )
            //_g.uriHash('page', page)
        },
        load_page_func: function( page, options ){
            _g.pageChangeBefore()
            
            _g.log( 'PREPARE LOADING: ' + page )
            options = options || {}
            
            if( !page )
                return page
            
            // 检查page合法性，如果失效，读取第一个导航项
                let checked = false
                    
                if( page == 'donate' ){
                    checked = true
                }if( !this.cur_page ){
                    this.nav.forEach(function(currentValue){
                        if( page == currentValue.page )
                            checked = true
                    })
                }else{
                    checked = true
                }
                
                if( !checked ){
                    page = this.nav[0].page
                    this.load_page(page, options)
                    return page
                }
                
            let u = _g.state2URI({page: page})
            
            function callback(){
                //_frame.app_main.page_dom[page].trigger('show')
                _frame.infos.hide()
    
                if( !options.callback_modeSelection_select ){
                    //_frame.app_main.title = _frame.app_main.navtitle[page]
                    //_frame.infos.last = null

                    //console.log(u, _frame.app_main.page_title[u])
                    document.title = _frame.app_main.page_title[u]
                    _g.title(_frame.app_main.navtitle[page] || true)

                    _ga.counter(
                        location.search
                    )
                }
    
                if( _frame.app_main.cur_page == page )
                    return page
    
                //_frame.app_main.page_dom[page].appendTo(_frame.dom.main).removeClass('off').trigger('on')
                Page.show(page)
    
                // 关闭之前的页面
                    //if( _frame.app_main.cur_page ){
                    //	setTimeout((function(p){
                    //		Page.hide(p)
                    //	})(_frame.app_main.cur_page), 100)
                        /*
                        if( _frame.dom.navs[_frame.app_main.cur_page] )
                            _frame.dom.navs[_frame.app_main.cur_page].removeClass('on')
                        if( _frame.app_main.page_dom[_frame.app_main.cur_page] )
                            setTimeout((function(p){
                                _frame.app_main.page_dom[p].trigger('pageHide')
                                //_frame.app_main.page_dom[p].addClass('off').trigger('pageHide').detach()
                            })(_frame.app_main.cur_page), 100)
                        */
                    //}

                //if( _frame.dom.navs[page] )
                //	_frame.dom.navs[page].addClass('on')
    
                if( !options.callback_modeSelection_select ){
                    //if( _frame.dom.layout.hasClass('ready') )
                    //	_frame.app_main.change_bgimg()
    
                    if( page != 'about' )
                        Lockr.set('last_page', page)
                }
    
                //_frame.dom.main.attr('data-theme', page)
                //_frame.app_main.cur_page = page
    
                _g.log( 'LOADED: ' + page )

                if( options.callback_modeSelection_select ){
                    _frame.app_main.page_dom[page].trigger('modeSelectionEnter', [
                        options.callback_modeSelection_select || function(){},
                        options.callback_modeSelection_enter || function(){}
                    ])
                }else{
                    _frame.app_main.mode_selection_off()
                }
            }

            if( !this.page_dom[page] ){
                this.page_dom[page] = _frame.dom.main.find('.page-container[page="'+page+'"]')
                if( this.page_dom[page].length ){
                    //this.page_init(page)
                    Page.init(page)
                    this.page_title[u] = document.title
                    callback()
                }else{
                    //this.page_dom[page] = $('<div class="page-container" page="'+page+'"/>').appendTo( _frame.dom.main )
                    //let u = '/' + page + '/'
                    //let u = _g.state2URI({page: page})
                    this.loading_start( u, {
                        success: function(html){
                            if( html ){
                                _frame.app_main.page_dom[page] = $(html).appendTo( _frame.dom.main )
                                if( u != location.pathname )
                                    _frame.app_main.page_dom[page].addClass('off')
                                //_frame.app_main.page_dom[page].html( html )
                                //_frame.app_main.page_init(page)
                                Page.init(page)
                            }
                        },
                        successAfter: callback,
                        error: function(){
                            delete _frame.app_main.page_dom[page]
                            history.back()
                        }
                    } )
                }
            }else{
                callback()
            }
        },








    init: function(){
        if( this.is_init )
            return true

        // 创建基础框架
            _frame.dom.mobilemenu = _frame.dom.layout.children('#view-mobile-menu')
            _frame.dom.logo = $('<div class="logo"/>')
                                .on(_g.event.animationend, function(){
                                    _frame.dom.logo.addClass('ready-animated')
                                })
                                .appendTo( _frame.dom.layout )
            _frame.dom.nav = _frame.dom.layout.children('nav')
                _frame.dom.navlinks = _frame.dom.nav.children('.pages')
                _frame.dom.globaloptions = _frame.dom.nav.children('section.options')
                        .append(
                            $('<button class="show_only_bg" icon="images"/>')
                                .on('click', function(){BgImg.controlsToggle()})
                        )
                    //_frame.dom.btnDonates = $('<button class="donate" icon="heart4"/>')
                    //						.on('click', function(){_frame.app_main.load_page('donate')}).appendTo( _frame.dom.globaloptions )
                    //_frame.dom.btnShowOnlyBg = $('<button class="show_only_bg" icon="images"/>')
                    //						.on('click', function(){_frame.app_main.only_bg_toggle()}).appendTo( _frame.dom.globaloptions )
                if( _g.isClient ){
                    _frame.dom.btnsHistory = $('<div class="history"/>').insertBefore( _frame.dom.navlinks )
                        _frame.dom.btnHistoryBack = $('<button class="button back" icon="arrow-set2-left"/>')
                                .on({
                                    'click': function(){
                                        _frame.dom.btnHistoryForward.removeClass('disabled')
                                        history.back()
                                    }
                                }).appendTo( _frame.dom.btnsHistory )
                        _frame.dom.btnHistoryForward = $('<button class="button forward disabled" icon="arrow-set2-right"/>')
                                .on('click', function(){
                                    history.forward()
                                }).appendTo( _frame.dom.btnsHistory )
                }
            _frame.dom.main = _frame.dom.layout.children('main')
            //_frame.dom.bgimg = $('<div class="bgimg" />').appendTo( _frame.dom.layout )
            _frame.dom.title = _frame.dom.nav.children('.title').children('span')
            $('<div class="nav-mask"/>').appendTo( _frame.dom.layout )
                .on('click', function(){
                    _frame.dom.mobilemenu.prop('checked', false)
                })

        // 功能按钮：反馈信息
        /*
            $('#titlebar>.buttons')
                .prepend(
                    $('<button/>',{
                        'icon': 	'cog',
                        'html': 	'反馈信息'
                    })
                )
        */

        var promise_chain 	= Q.fcall(function(){})

        this.nav = []
        this.navtitle = {}

        // 开始异步函数链
            promise_chain
        
        // 处理导航项信息
            .then(function(){
                _frame.dom.navs = {}
                //_frame.dom.navlinks.children('a').each(function(index, $el){
                _frame.dom.navlinks.find('a').each(function(index, $el){
                    $el = $($el)
                    let p = _g.parseURI($el.attr('href')).page
                        ,t = $el.text()
                    _frame.app_main.nav.push({
                        'title':	t,
                        'state':	$el.attr('mod-state'),
                        'page':		p
                    })
                    _frame.app_main.navtitle[p] = t
                    if( !$el.hasClass('button') )
                        $el = $el.parent()
                    _frame.dom.navs[p] = $el.on('click', function(){
                        Page.resetScroll(p)
                    })
                })
                return _frame.app_main.nav
            })

        // 预加载 _g.dbs 数据库
        /*
            .then(function(){
                _g.dbs.forEach(function(dbname){
                    _db[dbname] = new Nedb({
                        filename:	_g.path.db + dbname + '.json'
                    })
                })
                return _g.dbs
            })
        */

        // 获取背景图列表，生成背景图
            .then(BgImg.init)

        // 读取db
            .then(function(){
                _g.log('Preload All DBs (JSON ver.): START')
                
                let dbchain = Q()
                    ,masterDeferred = Q.defer()
                /*
                    ,lastVersion = Lockr.get('db_version')
                    
                Lockr.set('db_version', _g.db_version)
                */

                _g.dbs.forEach(function(db_name){
                    dbchain = dbchain.then(function(){
                        let deferred = Q.defer()
                        
                        $.ajax({
                            'url':		'/!/db/' + db_name + '.nedb?v=' + _g.db_version,
                            'dataType':	'text',
                            'success': function(data){
                                data = LZString.decompressFromBase64(data)
                                let arr = data.split('\n')
                                switch(db_name){
                                    default:
                                        if( typeof _g.data[db_name] == 'undefined' )
                                            _g.data[db_name] = {}
                                        arr.forEach(function(str){
                                            if( str ){
                                                let doc = JSON.parse(str)
                                                switch( db_name ){
                                                    case 'ships':
                                                        _g.data[db_name][doc['id']] = new Ship(doc)
                                                        break;
                                                    case 'items':
                                                        _g.data[db_name][doc['id']] = new Equipment(doc)
                                                        break;
                                                    case 'entities':
                                                        _g.data[db_name][doc['id']] = new Entity(doc)
                                                        break;
                                                    default:
                                                        _g.data[db_name][doc['id']] = doc
                                                        break;
                                                }
                                            }
                                        })
                                        break;
                                }
                            },
                            'complete': function(jqXHR, textStatus){
                                deferred.resolve()
                            }
                        })
                        
                        return deferred.promise
                    })
                })
                
                dbchain = dbchain.catch(function(e){
                        console.log(e)
                    }).done(function(){
                        _g.log('Preload All DBs (JSON ver.): DONE')
                        //setTimeout(function(){
                        //	_frame.app_main.loaded('dbs')
                        //}, 100)
                        masterDeferred.resolve()
                    })

                return masterDeferred.promise
            })
            .then(function(){
                _g.log('Preload All DBs: START')
                var the_promises = []
                    ,dbs = []
                    ,loaded_count = 0

                for( var db_name in _db ){
                    dbs.push(db_name)
                }

                dbs.forEach(function(db_name){
                    var deferred = Q.defer()
                    function _done(_db_name){
                        _g.log('DB ' + _db_name + ' DONE')
                        deferred.resolve()
                        loaded_count++
                        if( loaded_count >= dbs.length ){
                            _g.log('Preload All DBs: DONE')
                            setTimeout(function(){
                                _frame.app_main.loaded('dbs')
                            }, 100)
                        }
                    }
                    _db[db_name].loadDatabase(function(err){
                        if( err ){
                            deferred.reject(new Error(err))
                        }else{
                            _db[db_name].find({}, function(dberr, docs){
                                if( dberr ){
                                    deferred.reject(new Error(dberr))
                                }else{
                                    if( typeof _g.data[db_name] == 'undefined' )
                                        _g.data[db_name] = {}
                                    docs.forEach(function(doc){
                                        _g.data[db_name][doc['id']] = doc
                                    })
                                    _done(db_name)
                                }
                            })
                        }
                    })
                    the_promises.push(deferred.promise)
                })

                return Q.all(the_promises);
            })

        // 部分全局事件委托
            .then(function(){
                let link_page = function(e){
                            e.preventDefault()
                            _frame.app_main.load_page($(this).attr('href').substr('?page='.length))
                        },
                    link_infos = function(e){
                            e.preventDefault()
                            let el = $(this)
                            if( !el.attr('data-infos') ){
                                let exp = /^[\?]{0,1}infos\=([^\&]+)\&id\=([^\&]+)/ig.exec(el.attr('href'))
                                el.attr('data-infos', '[[' + exp[1].toUpperCase() + '::' + exp[2] + ']]')
                                //el.trigger('click')
                                _frame.infos.click(el)
                            }
                        },
                    link_default = function(e){
                            e.preventDefault()
                            let el = $(this)
                                ,parse = _g.parseURI(el.attr('href'))
                                //,href_parts = el.attr('href').split('/').filter(function(c){return c})
                            if( parse.page ){
                                _frame.app_main.load_page( parse.page )
                            }else if( parse.infos ){
                                _frame.infos.click(el.attr('data-infos', '[[' + parse.infos.toUpperCase() + '::' + parse.id + ']]'))
                                //el.attr('data-infos', '[[' + parse.infos.toUpperCase() + '::' + parse.id + ']]')
                                //el.off('click.global_delegate').trigger('click')
                            }
                        },
                    link_external = function(e){
                        if( e.currentTarget.getAttribute('href').indexOf('//' + location.host) < 0 ){
                            return e.currentTarget.setAttribute('target', '_blank');
                        }
                    }

                $body.on('click.global_delegate_page', 'a[href^="?page="]', link_page)
                    .on('click.global_delegate_infos', 'a[href^="?infos="]', link_infos)
                    .on('click.global_delegate_default', 'a[href^="/"]', link_default)
                    .on('click.global_external_links pointerdown.global_external_links', 'a:not([target]):not([href^="/"]):not([href^="javascript:"])', link_external)

                //_frame.dom.bgimg.on(_g.event.animationend, 'div', function(){
                //	_frame.app_main.change_bgimg_after()
                //})
                /*
                    $html.on('click.openShipModal', '[data-shipid][modal="true"]', function(e){
                        if( !(e.target.tagName.toLowerCase() == 'input' && e.target.className == 'compare') ){
                            if( $(this).data('shipedit') ){
                                try{
                                    //_frame.app_main.page['ships'].show_ship_form( _g.data.ships[ $(this).data('shipid') ] )
                                }catch(err){}
                            }else{
                                try{
                                    _frame.app_main.show_ship( _g.data.ships[ $(this).data('shipid') ] )
                                }catch(err){}
                            }
                        }
                    })
                */
                return true
            })

        // 鼠标侧键操作
        
        // 广告
            .then(function(){
                _frame.gg(_frame.dom.layout)
            })

        // 错误处理
            .catch(function (err) {
                _g.error(err)
            })
            .done(function(){
                _g.buildIndex();
                _g.log('Global initialization DONE')
            })

        // 标记已进行过初始化函数
            this.is_init = true
    }
};













_g.error = function(err){
    if( !(err instanceof Error) )
        err = new Error(err)

    _g.badgeError( err instanceof Error ? err.message : err )
    _g.log(err)
};





var debugmode = false
