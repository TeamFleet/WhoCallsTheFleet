"use strict";



var minify = require("../dev-output/js-source/node_modules/html-minifier").minify;
var fsExtra = require("../dev-output/js-source/node_modules/fs-extra")
let glob = require("../dev-output/js-source/node_modules/glob")

let dev_output_steps = []
    ,dev_output_tmpl
    ,dev_output_dir
    ,dev_output_el_log
    ,dev_output_only_assets = false
    ,dev_output_log = function(msg){
        dev_output_el_log.prepend($('<div/>',{
            'html':	msg
        }))
        _g.log(msg)
    }
    ,dev_output_filters = {}

function dev_output_gen_title(){
    if( arguments && arguments.length && arguments[0] )
        return Array.prototype.join.call(arguments, ' - ') + ' - 是谁呼叫舰队'
    return '是谁呼叫舰队'
}

function dev_output_filter(output, pagetype, name){
    pagetype = pagetype || ''
    /*
    if( pagetype == 'javascript' ){
        output = babel.transform(output, {
            'highlightCode':	false,
            'comments':			false,
            'compact':			true,
            'ast':				false
        })
        output = output.code
    }
    */

    const pathPicsShips = _g.path.pics.ships + '-[0-9]+'
    const pathPicsShipsExtra = _g.path.pics.shipsExtra + '-[0-9]+'

    let replacePair = [
        [
            /\.\.\/\.\.\/app\//gi,
            '/!/assets/'
        ],
        [
            /\.\.\/app\/assets\//gi,
            '/!/assets/'
        ],
        [
            new RegExp('file\:///' + node.path.join(_g.root, 'app').replace(/\\/g, '/').replace(/\./g, '\\.'), 'gi'),
            '/!'
        ],
        // [
        //     /\.\.\/pics\//gi,
        //     '/!/pics/'
        // ],
        [
            new RegExp(pathPicsShips.replace(/\\/g, '/').replace(/\./g, '\\.'), 'gi'),
            '/!/pics-ships/'
        ],
        [
            new RegExp(pathPicsShips.replace(/\\/g, '\\\\').replace(/\./g, '\\.'), 'gi'),
            '/!/pics-ships/'
        ],
        [
            new RegExp(pathPicsShipsExtra.replace(/\\/g, '/').replace(/\./g, '\\.'), 'gi'),
            '/!/pics-ships-extra/'
        ],
        [
            new RegExp(pathPicsShipsExtra.replace(/\\/g, '\\\\').replace(/\./g, '\\.'), 'gi'),
            '/!/pics-ships-extra/'
        ],
        [
            new RegExp(_g.path.pics.items.replace(/\\/g, '/').replace(/\./g, '\\.'), 'gi'),
            '/!/pics/items/'
        ],
        [
            new RegExp(_g.path.pics.items.replace(/\\/g, '\\\\').replace(/\./g, '\\.'), 'gi'),
            '/!/pics/items/'
        ],
        [
            /\.\.\/pics\/ships\-[0-9]+\//gi,
            '/!/pics-ships/'
        ],
        [
            /\.\.\/pics\/ships-extra\-[0-9]+\//gi,
            '/!/pics-ships-extra/'
        ],
        [
            /\/!\/pics-ships-[0-9]+/gi,
            '/!/pics-ships'
        ],
        [
            /\/!\/pics-ships\/\/\//gi,
            '/!/pics-ships/'
        ],
        [
            /\.\.\/pics\//gi,
            '/!/pics/'
        ],
        [
            /\.\.\/pics-/gi,
            '/!/pics-'
        ],
        [
            /\'assets\//gi,
            '\'/!/assets/'
        ],
        [
            /\"assets\//gi,
            '"/!/assets/'
        ],
        [
            /\(assets\//gi,
            '(/!/assets/'
        ]
    ]

    let searchRes, scrapePtrn
    replacePair.forEach(pair => {
        searchRes = null
        scrapePtrn = pair[0]
        while( (searchRes = scrapePtrn.exec(output)) !== null ){
            try{
                console.log(searchRes[0])
                output = output.replace( searchRes[0], pair[1] )
            }catch(e){}
        }
    })

    if( pagetype == 'page' || pagetype == 'infos' ){
        searchRes = null
        scrapePtrn = /0\.webp\"/gi
            while( (searchRes = scrapePtrn.exec(output)) !== null ){
                try{
                    let mask = '-1'
                        ,c = ' class="nomask"'
                    if( pagetype == 'page' && name == 'ships' )
                        mask = '-1'
                    else if( pagetype == 'infos' && name == 'ship' ){
                        mask = ''
                        c = ''
                    }
                    output = output.replace( searchRes[0], '0' + mask + '.png"' + c + '' )
                }catch(e){}
            }
    }

    searchRes = null
    scrapePtrn = /\.webp/gi
        while( (searchRes = scrapePtrn.exec(output)) !== null ){
            try{
                output = output.replace( searchRes[0], '.png' )
            }catch(e){}
        }

    searchRes = null
    scrapePtrn = /\?infos=([a-z]+)\&amp;id=([^\&^"^']+)/gi
        while( (searchRes = scrapePtrn.exec(output)) !== null ){
            try{
                var t = ''
                switch( searchRes[1] ){
                    case 'ship': 		t = 'ships'; 		break;
                    case 'equipment': 	t = 'equipments'; 	break;
                    case 'entity':	 	t = 'entities'; 	break;
                    default:
                        t = searchRes[1]
                        break;
                }
                output = output.replace( searchRes[0], '/' + t + '/' + searchRes[2] + '/' )
            }catch(e){}
        }

    //if( ['.js', '.css', '.jpg'].indexOf(pagetype) < 0 ){
    if( pagetype.substr(0,1) !== '.' ){
        /*
        searchRes = null
        scrapePtrn = /^\s*[\r\n]/gm
            while( (searchRes = scrapePtrn.exec(output)) !== null ){
                try{
                    output = output.replace( searchRes[0], '' )
                }catch(e){}
            }
    
        searchRes = null
        scrapePtrn = /\r?\n|\r/g
            while( (searchRes = scrapePtrn.exec(output)) !== null ){
                try{
                    output = output.replace( searchRes[0], '' )
                }catch(e){}
            }
        */
        output = minify(output, {
            removeComments:		true,
            collapseWhitespace:	true
        })
    }
    
    switch(pagetype){
        case 'page':
            output = '<div class="page-container"'
                        + (name
                            ? ' page="' +name+ '"'
                            : ''
                        )
                    + '>'
                    + output
                    + '</div>'
            break;
        case 'info':
        case 'infos':
            output = '<div class="page-container infos"'
                        + (name
                            ? ' data-infostype="' +name+ '"'
                            : ''
                        )
                    + '>'
                    + '<div class="wrapper">'
                    + output
                    + '</div>'
                    + '</div>'
            break;
    }

    return output
}

function dev_output_form(){
    let el = {}
        ,processing = false

    el.container = $('<div/>').css({
            'position':	'relative',
            'width':	'100%',
            'height':	'100%',
            'display':	'flex',
            'flex-flow':'column nowrap'
        }).append(
            el.form = $('<form/>').css({
                'display':	'flex',
                'flex-flow':'row nowrap',
                'flex':		'0 0 40px',
                'height':	'40px',
                'line-height':'30px',
                'font-size':'16px',
                'padding':	'0 0 10px 0',
                'border-bottom':'1px solid rgba(255, 255, 255, .35)',
                'margin':	'0 0 10px 0'
            }).on('submit', function(e){
                e.preventDefault()
                if( !processing ){
                    dev_output_el_log.empty()
                    processing = true
                    dev_output_log('start')
                    
                    //dev_output_steps = []
                    
                    // 处理模板
                        dev_output_tmpl = node.fs.readFileSync('dev-output/templates/base.html', 'utf-8')
                        let searchRes
                            ,scrapePtrn = /\{\{[ ]*navContent[ ]*\}\}/gi
                            ,elNav = $('<div/>')
                            ,navobj = [].concat(_frame.app_main.nav)
                            ,navlinks = $('<div class="pages"/>').appendTo( elNav )
                            ,globaloptions = $('<section class="options"/>').appendTo( elNav )
                            ,btnDonates = $('<a class="donate" icon="heart4" href="/donate/"/>').appendTo( globaloptions )

                        // 首页
                            $('<h1 class="button home"/>').html('<a href="/">是谁呼叫舰队</a>').appendTo( navlinks )

                        navobj.forEach(function(o, i){
                            if( o.title != '关于' )
                                (function(page){
                                        let $el = $('<a class="button" href="/'+page+'/"/>')
                                        if( o.state )
                                            $el.attr('mod-state', o.state)
                                        return $el
                                    })(o.page).html(o.title).appendTo( navlinks )
                        })
                        
                        $('<span class="title"/>')
                            .append(
                                $('<label for="view-mobile-menu"/>').html('<i></i>')
                            )
                            .append(
                                $('<span/>')
                            )
                            .appendTo( elNav )
                    
                        while( (searchRes = scrapePtrn.exec(dev_output_tmpl)) !== null ){
                            try{
                                dev_output_tmpl = dev_output_tmpl.replace( searchRes[0], elNav.html() )
                            }catch(e){}
                        }

                        dev_output_tmpl = minify(dev_output_tmpl, {
                            removeComments:		true,
                            collapseWhitespace:	true
                        })
                    
                    //console.log(dev_output_tmpl)

                    //Q.all(dev_output_steps).done(function(values){
                    //	console.log(values)
                    //	dev_output_log('end')
                    //})
                    /*
                    dev_output_steps.push(function(){
                        dev_output_log('end')
                        processing = false
                        dev_output_only_assets = false
                        return true
                    })
                    */
                    var result = Q(dev_output_tmpl);
                    dev_output_steps.forEach(function (f) {
                        result = result.then(f);
                    });
                    result = result.done(function(){
                        dev_output_log('end')
                        processing = false
                        dev_output_only_assets = false
                        return true
                    })
                    return result;
                }
                return
            }).append(
                el.selector = $('<input type="file" nwdirectory/>').css({
                    'display':	'none'
                }).on('change', function(){
                    let val = el.selector.val() || ''
                    el.input.val( val )
                    Lockr.set('debug_output_directory', val)
                    dev_output_dir = val
                    el.selector.val('')
                })
            ).append(
                el.input = $('<input type="text"/>').css({
                    'display':	'block',
                    'flex':		'1 0 auto',
                    'height':	'30px',
                    'line-height':'inherit',
                    'font-size':'inherit',
                    'margin-right':'10px'
                }).val( Lockr.get('debug_output_directory') || '' )
            ).append(
                $('<button/>',{
                    'type':		'button',
                    'html':		'Browse'
                }).css({
                    'flex':		'0 0 auto',
                    'margin-right':'10px'
                }).on('click', function(){
                    el.selector.click()
                })
            ).append(
                $('<input/>',{
                    'type':		'submit',
                    'html':		'Export'
                }).css({
                    'flex':		'0 0 auto',
                    'margin-right':'10px'
                })
            ).append(
                $('<button/>',{
                    'type':		'button',
                    'html':		'Export (Only Assets)'
                }).css({
                    'flex':		'0 0 auto',
                    'margin-right':'10px'
                }).on('click', function(){
                    dev_output_only_assets = true
                    el.form.submit()
                })
            )
        ).append(
            el.form2 = $('<form/>').css({
                'display':	'flex',
                'flex-flow':'row nowrap',
                'flex':		'0 0 40px',
                'height':	'40px',
                'line-height':'30px',
                'font-size':'16px',
                'padding':	'0 0 10px 0',
                'border-bottom':'1px solid rgba(255, 255, 255, .35)',
                'margin':	'0 0 10px 0'
            }).on('submit', function(e){
                e.preventDefault()
                if( !processing ){
                    dev_output_el_log.empty()
                    processing = true
                    dev_output_log('start')
                    
                    let pathFrom = Lockr.get('debug_output_directory', dev_output_dir)
                        ,pathTo = Lockr.get('debug_output_directory2', el.selector2.val() || '')
                        ,files = [
                            'favicon.ico',
                            'favicon.png',
                            'ga.html',
                            'index.html',
                            'manifest.json',
                            'robots.txt',

                            'arsenal/',
                            'calctp/',
                            'donate/',
                            'entities/',
                            'equipments/',
                            'fleets/',
                            'ships/',
                            
                            '!/assets/',
                            '!/db/',
                            '!/pics/'
                        ]
                        ,chain = Q(function(){})
                    
                    files.forEach(function(f){
                        chain = chain.then(function(){
                            let deferred = Q.defer()
                            fsExtra.copy(
                                node.path.join( pathFrom, f ),
                                node.path.join( pathTo, f ),
                                {
                                    clobber: true,
                                    preserveTimestamps: true,
                                    filter: function(thisFile){
                                        if( f == '!/pics/' )
                                            return node.path.extname(thisFile).toLowerCase() != '.webp'
                                        return true
                                    }
                                },
                                function(err){
                                    if( err ){
                                        deferred.reject(err)
                                    }else{
                                        dev_output_log('COPY: ' + f )
                                        deferred.resolve()
                                    }
                                }
                            )
                            return deferred.promise
                        })
                    })
                    
                    chain = chain.catch(function(err){
                        _g.log(err)
                    }).done(function(){
                        dev_output_log('end')
                        processing = false
                        return true
                    })
                }
                return
            }).append(
                $('<span/>',{
                    'html':		'Output Static'
                }).css({
                    'flex':		'0 0 auto',
                    'margin-right':'10px'
                })
            ).append(
                el.selector2 = $('<input type="file" nwdirectory/>').css({
                    'display':	'none'
                }).on('change', function(){
                    let val = el.selector2.val() || ''
                    el.input2.val( val )
                    Lockr.set('debug_output_directory2', val)
                    el.selector2.val('')
                })
            ).append(
                el.input2 = $('<input type="text"/>').css({
                    'display':	'block',
                    'flex':		'1 0 auto',
                    'height':	'30px',
                    'line-height':'inherit',
                    'font-size':'inherit',
                    'margin-right':'10px'
                }).val( Lockr.get('debug_output_directory2') || '' )
            ).append(
                $('<button/>',{
                    'type':		'button',
                    'html':		'Browse'
                }).css({
                    'flex':		'0 0 auto',
                    'margin-right':'10px'
                }).on('click', function(){
                    el.selector2.click()
                })
            ).append(
                $('<input/>',{
                    'type':		'submit',
                    'html':		'Export'
                }).css({
                    'flex':		'0 0 auto',
                    'margin-right':'10px'
                })
            )
        ).append(
            el.form2 = $('<form/>').css({
                'display':	'flex',
                'flex-flow':'row nowrap',
                'flex':		'0 0 40px',
                'height':	'40px',
                'line-height':'30px',
                'font-size':'16px',
                'padding':	'0 0 10px 0',
                'border-bottom':'1px solid rgba(255, 255, 255, .35)',
                'margin':	'0 0 10px 0'
            }).on('submit', function(e){
                e.preventDefault()
                if( !processing ){
                    dev_output_el_log.empty()
                    processing = true
                    dev_output_log('start')
                    
                    let pathFrom = Lockr.get('debug_output_directory', dev_output_dir)
                        ,pathTo = Lockr.get('debug_output_redirect', el.directoryRedirect.val() || '')
                        ,files = [
                            'favicon.ico',
                            'favicon.png',
                            'manifest.json',
                            'robots.txt',
                            
                            /*
                            'arsenal/',
                            'calctp/',
                            'donate/',
                            'entities/',
                            'equipments/',
                            'fleets/',
                            'ships/',
                            */
                            
                            '!/assets/',
                            '!/db/',
                            '!/pics/'
                        ]
                        ,htmlFiles = []
                        ,chain = Q(function(){})
                    
                    files.forEach(function(f){
                        chain = chain.then(function(){
                            let deferred = Q.defer()
                            fsExtra.copy(
                                node.path.join( pathFrom, f ),
                                node.path.join( pathTo, f ),
                                {
                                    clobber: true,
                                    preserveTimestamps: true,
                                    filter: function(thisFile){
                                        //console.log(thisFile, thisFile2)
                                        if( f == '!/pics/' ){
                                            return false;
                                            if( node.path.extname(thisFile).toLowerCase() == '.webp' )
                                                return false
                                                
                                            try {
                                                fs.accessSync(thisFile, fs.F_OK);
                                                return false
                                            } catch (e) {
                                                return true
                                            }
                                            
                                            return node.path.extname(thisFile).toLowerCase() != '.webp'
                                        }
                                        return true
                                    }
                                },
                                function(err){
                                    if( err ){
                                        deferred.reject(err)
                                    }else{
                                        dev_output_log('COPY: ' + f )
                                        deferred.resolve()
                                    }
                                }
                            )
                            return deferred.promise
                        })
                    })
                    
                    chain = chain.then(function(){
                        let deferred = Q.defer()
                            ,chain2 = Q(function(){})
                            ,tmplDirection = node.fs.readFileSync('dev-output/templates/redirect.html', 'utf-8')
                            
                        glob(node.path.join( pathFrom, "**/*.html" ), {}, function (er, files) {
                            //console.log(files)
                            htmlFiles = files
                    
                            console.log( pathTo )
                            htmlFiles.forEach(function(f){
                                chain2 = chain2.then(function(){
                                    let deferred2 = Q.defer()
                                    
                                    let filename = f.substr( f.indexOf(pathFrom) + pathFrom.length + 2 )
                                    let output = tmplDirection
                                    let htmlpage = node.fs.readFileSync(f, 'utf-8')
                                    let searchRes = null
                                    let scrapePtrn = /\{\{[ ]*title[ ]*\}\}/gi
                                    
                                    let title = /\<title\>([^\<]+)\<\/title\>/gi.exec(htmlpage)
                                    
                                    let outputPath = node.path.join( pathTo, filename )
                                    let outputDir = node.path.dirname( outputPath )
                                    
                                    while( (searchRes = scrapePtrn.exec(output)) !== null ){
                                        try{
                                            if( title && title.length > 1 ){
                                                output = output.replace( searchRes[0], title[1] )
                                            }else{
                                                output = output.replace( searchRes[0], '是谁呼叫舰队' )
                                            }
                                        }catch(e){}
                                    }
            
                                    searchRes = null
                                    scrapePtrn = /\{\{[ ]*url[ ]*\}\}/gi
                                    while( (searchRes = scrapePtrn.exec(output)) !== null ){
                                        try{
                                            output = output.replace(
                                                searchRes[0],
                                                filename.replace(/\/index\.html$/gi, '').replace(/index\.html$/gi, '') + '?utm_source=olddomain'
                                            )
                                        }catch(e){}
                                    }
            
                                    node.mkdirp.sync( outputDir )
                                    
                                    output = minify(output, {
                                        removeComments:		true,
                                        collapseWhitespace:	true
                                    })
            
                                    node.fs.writeFile(
                                        outputPath,
                                        output,
                                        function(err){
                                            if( err ){
                                                deferred2.reject(new Error(err))
                                            }else{
                                                dev_output_log('生成文件: ' + filename)
                                                deferred2.resolve()
                                            }
                                        }
                                    )

                                    //deferred2.resolve()
                                    return deferred2.promise
                                })
                            })
                            
                            chain2 = chain2.catch(function(err){
                                deferred.reject(err)
                            }).done(function(){
                                deferred.resolve()
                            })

                        })
                        return deferred.promise
                    })
                    
                    chain = chain.catch(function(err){
                        _g.log(err)
                    }).done(function(){
                        dev_output_log('end')
                        processing = false
                        return true
                    })
                }
                return
            }).append(
                $('<span/>',{
                    'html':		'Output Redirect'
                }).css({
                    'flex':		'0 0 auto',
                    'margin-right':'10px'
                })
            ).append(
                el.directoryRedirect = $('<input type="file" nwdirectory/>').css({
                    'display':	'none'
                }).on('change', function(){
                    let val = el.directoryRedirect.val() || ''
                    el.input2.val( val )
                    Lockr.set('debug_output_redirect', val)
                    el.directoryRedirect.val('')
                })
            ).append(
                el.input2 = $('<input type="text"/>').css({
                    'display':	'block',
                    'flex':		'1 0 auto',
                    'height':	'30px',
                    'line-height':'inherit',
                    'font-size':'inherit',
                    'margin-right':'10px'
                }).val( Lockr.get('debug_output_redirect') || '' )
            ).append(
                $('<button/>',{
                    'type':		'button',
                    'html':		'Browse'
                }).css({
                    'flex':		'0 0 auto',
                    'margin-right':'10px'
                }).on('click', function(){
                    el.directoryRedirect.click()
                })
            ).append(
                $('<input/>',{
                    'type':		'submit',
                    'html':		'Export'
                }).css({
                    'flex':		'0 0 auto',
                    'margin-right':'10px'
                })
            )
        ).append(
            dev_output_el_log = $('<div/>').css({
                'flex':		'1 0 auto',
                'line-height':'1.5em',
                'font-size':'13px',
                'overflow-y':'auto'
            })
        )
    
    dev_output_dir = el.input.val()
    
    return el.container
}
