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
        ],
        [
            /\/!\/pics-ships-[0-9]+\//gi,
            '/!/pics-ships/'
        ],
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

// Copyright (c) 2013 Pieroxy <pieroxy@pieroxy.net>
// This work is free. You can redistribute it and/or modify it
// under the terms of the WTFPL, Version 2
// For more information see LICENSE.txt or http://www.wtfpl.net/
//
// For more information, the home page:
// http://pieroxy.net/blog/pages/lz-string/testing.html
//
// LZ-based compression algorithm, version 1.4.4
var LZString = (function() {

// private property
var f = String.fromCharCode;
var keyStrBase64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
var keyStrUriSafe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$";
var baseReverseDic = {};

function getBaseValue(alphabet, character) {
  if (!baseReverseDic[alphabet]) {
    baseReverseDic[alphabet] = {};
    for (var i=0 ; i<alphabet.length ; i++) {
      baseReverseDic[alphabet][alphabet.charAt(i)] = i;
    }
  }
  return baseReverseDic[alphabet][character];
}

var LZString = {
  compressToBase64 : function (input) {
    if (input == null) return "";
    var res = LZString._compress(input, 6, function(a){return keyStrBase64.charAt(a);});
    switch (res.length % 4) { // To produce valid Base64
    default: // When could this happen ?
    case 0 : return res;
    case 1 : return res+"===";
    case 2 : return res+"==";
    case 3 : return res+"=";
    }
  },

  decompressFromBase64 : function (input) {
    if (input == null) return "";
    if (input == "") return null;
    return LZString._decompress(input.length, 32, function(index) { return getBaseValue(keyStrBase64, input.charAt(index)); });
  },

  compressToUTF16 : function (input) {
    if (input == null) return "";
    return LZString._compress(input, 15, function(a){return f(a+32);}) + " ";
  },

  decompressFromUTF16: function (compressed) {
    if (compressed == null) return "";
    if (compressed == "") return null;
    return LZString._decompress(compressed.length, 16384, function(index) { return compressed.charCodeAt(index) - 32; });
  },

  //compress into uint8array (UCS-2 big endian format)
  compressToUint8Array: function (uncompressed) {
    var compressed = LZString.compress(uncompressed);
    var buf=new Uint8Array(compressed.length*2); // 2 bytes per character

    for (var i=0, TotalLen=compressed.length; i<TotalLen; i++) {
      var current_value = compressed.charCodeAt(i);
      buf[i*2] = current_value >>> 8;
      buf[i*2+1] = current_value % 256;
    }
    return buf;
  },

  //decompress from uint8array (UCS-2 big endian format)
  decompressFromUint8Array:function (compressed) {
    if (compressed===null || compressed===undefined){
        return LZString.decompress(compressed);
    } else {
        var buf=new Array(compressed.length/2); // 2 bytes per character
        for (var i=0, TotalLen=buf.length; i<TotalLen; i++) {
          buf[i]=compressed[i*2]*256+compressed[i*2+1];
        }

        var result = [];
        buf.forEach(function (c) {
          result.push(f(c));
        });
        return LZString.decompress(result.join(''));

    }

  },


  //compress into a string that is already URI encoded
  compressToEncodedURIComponent: function (input) {
    if (input == null) return "";
    return LZString._compress(input, 6, function(a){return keyStrUriSafe.charAt(a);});
  },

  //decompress from an output of compressToEncodedURIComponent
  decompressFromEncodedURIComponent:function (input) {
    if (input == null) return "";
    if (input == "") return null;
    input = input.replace(/ /g, "+");
    return LZString._decompress(input.length, 32, function(index) { return getBaseValue(keyStrUriSafe, input.charAt(index)); });
  },

  compress: function (uncompressed) {
    return LZString._compress(uncompressed, 16, function(a){return f(a);});
  },
  _compress: function (uncompressed, bitsPerChar, getCharFromInt) {
    if (uncompressed == null) return "";
    var i, value,
        context_dictionary= {},
        context_dictionaryToCreate= {},
        context_c="",
        context_wc="",
        context_w="",
        context_enlargeIn= 2, // Compensate for the first entry which should not count
        context_dictSize= 3,
        context_numBits= 2,
        context_data=[],
        context_data_val=0,
        context_data_position=0,
        ii;

    for (ii = 0; ii < uncompressed.length; ii += 1) {
      context_c = uncompressed.charAt(ii);
      if (!Object.prototype.hasOwnProperty.call(context_dictionary,context_c)) {
        context_dictionary[context_c] = context_dictSize++;
        context_dictionaryToCreate[context_c] = true;
      }

      context_wc = context_w + context_c;
      if (Object.prototype.hasOwnProperty.call(context_dictionary,context_wc)) {
        context_w = context_wc;
      } else {
        if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate,context_w)) {
          if (context_w.charCodeAt(0)<256) {
            for (i=0 ; i<context_numBits ; i++) {
              context_data_val = (context_data_val << 1);
              if (context_data_position == bitsPerChar-1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
            }
            value = context_w.charCodeAt(0);
            for (i=0 ; i<8 ; i++) {
              context_data_val = (context_data_val << 1) | (value&1);
              if (context_data_position == bitsPerChar-1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
              value = value >> 1;
            }
          } else {
            value = 1;
            for (i=0 ; i<context_numBits ; i++) {
              context_data_val = (context_data_val << 1) | value;
              if (context_data_position ==bitsPerChar-1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
              value = 0;
            }
            value = context_w.charCodeAt(0);
            for (i=0 ; i<16 ; i++) {
              context_data_val = (context_data_val << 1) | (value&1);
              if (context_data_position == bitsPerChar-1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
              value = value >> 1;
            }
          }
          context_enlargeIn--;
          if (context_enlargeIn == 0) {
            context_enlargeIn = Math.pow(2, context_numBits);
            context_numBits++;
          }
          delete context_dictionaryToCreate[context_w];
        } else {
          value = context_dictionary[context_w];
          for (i=0 ; i<context_numBits ; i++) {
            context_data_val = (context_data_val << 1) | (value&1);
            if (context_data_position == bitsPerChar-1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
            value = value >> 1;
          }


        }
        context_enlargeIn--;
        if (context_enlargeIn == 0) {
          context_enlargeIn = Math.pow(2, context_numBits);
          context_numBits++;
        }
        // Add wc to the dictionary.
        context_dictionary[context_wc] = context_dictSize++;
        context_w = String(context_c);
      }
    }

    // Output the code for w.
    if (context_w !== "") {
      if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate,context_w)) {
        if (context_w.charCodeAt(0)<256) {
          for (i=0 ; i<context_numBits ; i++) {
            context_data_val = (context_data_val << 1);
            if (context_data_position == bitsPerChar-1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
          }
          value = context_w.charCodeAt(0);
          for (i=0 ; i<8 ; i++) {
            context_data_val = (context_data_val << 1) | (value&1);
            if (context_data_position == bitsPerChar-1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
            value = value >> 1;
          }
        } else {
          value = 1;
          for (i=0 ; i<context_numBits ; i++) {
            context_data_val = (context_data_val << 1) | value;
            if (context_data_position == bitsPerChar-1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
            value = 0;
          }
          value = context_w.charCodeAt(0);
          for (i=0 ; i<16 ; i++) {
            context_data_val = (context_data_val << 1) | (value&1);
            if (context_data_position == bitsPerChar-1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
            value = value >> 1;
          }
        }
        context_enlargeIn--;
        if (context_enlargeIn == 0) {
          context_enlargeIn = Math.pow(2, context_numBits);
          context_numBits++;
        }
        delete context_dictionaryToCreate[context_w];
      } else {
        value = context_dictionary[context_w];
        for (i=0 ; i<context_numBits ; i++) {
          context_data_val = (context_data_val << 1) | (value&1);
          if (context_data_position == bitsPerChar-1) {
            context_data_position = 0;
            context_data.push(getCharFromInt(context_data_val));
            context_data_val = 0;
          } else {
            context_data_position++;
          }
          value = value >> 1;
        }


      }
      context_enlargeIn--;
      if (context_enlargeIn == 0) {
        context_enlargeIn = Math.pow(2, context_numBits);
        context_numBits++;
      }
    }

    // Mark the end of the stream
    value = 2;
    for (i=0 ; i<context_numBits ; i++) {
      context_data_val = (context_data_val << 1) | (value&1);
      if (context_data_position == bitsPerChar-1) {
        context_data_position = 0;
        context_data.push(getCharFromInt(context_data_val));
        context_data_val = 0;
      } else {
        context_data_position++;
      }
      value = value >> 1;
    }

    // Flush the last char
    while (true) {
      context_data_val = (context_data_val << 1);
      if (context_data_position == bitsPerChar-1) {
        context_data.push(getCharFromInt(context_data_val));
        break;
      }
      else context_data_position++;
    }
    return context_data.join('');
  },

  decompress: function (compressed) {
    if (compressed == null) return "";
    if (compressed == "") return null;
    return LZString._decompress(compressed.length, 32768, function(index) { return compressed.charCodeAt(index); });
  },

  _decompress: function (length, resetValue, getNextValue) {
    var dictionary = [],
        next,
        enlargeIn = 4,
        dictSize = 4,
        numBits = 3,
        entry = "",
        result = [],
        i,
        w,
        bits, resb, maxpower, power,
        c,
        data = {val:getNextValue(0), position:resetValue, index:1};

    for (i = 0; i < 3; i += 1) {
      dictionary[i] = i;
    }

    bits = 0;
    maxpower = Math.pow(2,2);
    power=1;
    while (power!=maxpower) {
      resb = data.val & data.position;
      data.position >>= 1;
      if (data.position == 0) {
        data.position = resetValue;
        data.val = getNextValue(data.index++);
      }
      bits |= (resb>0 ? 1 : 0) * power;
      power <<= 1;
    }

    switch (next = bits) {
      case 0:
          bits = 0;
          maxpower = Math.pow(2,8);
          power=1;
          while (power!=maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }
            bits |= (resb>0 ? 1 : 0) * power;
            power <<= 1;
          }
        c = f(bits);
        break;
      case 1:
          bits = 0;
          maxpower = Math.pow(2,16);
          power=1;
          while (power!=maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }
            bits |= (resb>0 ? 1 : 0) * power;
            power <<= 1;
          }
        c = f(bits);
        break;
      case 2:
        return "";
    }
    dictionary[3] = c;
    w = c;
    result.push(c);
    while (true) {
      if (data.index > length) {
        return "";
      }

      bits = 0;
      maxpower = Math.pow(2,numBits);
      power=1;
      while (power!=maxpower) {
        resb = data.val & data.position;
        data.position >>= 1;
        if (data.position == 0) {
          data.position = resetValue;
          data.val = getNextValue(data.index++);
        }
        bits |= (resb>0 ? 1 : 0) * power;
        power <<= 1;
      }

      switch (c = bits) {
        case 0:
          bits = 0;
          maxpower = Math.pow(2,8);
          power=1;
          while (power!=maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }
            bits |= (resb>0 ? 1 : 0) * power;
            power <<= 1;
          }

          dictionary[dictSize++] = f(bits);
          c = dictSize-1;
          enlargeIn--;
          break;
        case 1:
          bits = 0;
          maxpower = Math.pow(2,16);
          power=1;
          while (power!=maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }
            bits |= (resb>0 ? 1 : 0) * power;
            power <<= 1;
          }
          dictionary[dictSize++] = f(bits);
          c = dictSize-1;
          enlargeIn--;
          break;
        case 2:
          return result.join('');
      }

      if (enlargeIn == 0) {
        enlargeIn = Math.pow(2, numBits);
        numBits++;
      }

      if (dictionary[c]) {
        entry = dictionary[c];
      } else {
        if (c === dictSize) {
          entry = w + w.charAt(0);
        } else {
          return null;
        }
      }
      result.push(entry);

      // Add w+entry[0] to the dictionary.
      dictionary[dictSize++] = w + entry.charAt(0);
      enlargeIn--;

      w = entry;

      if (enlargeIn == 0) {
        enlargeIn = Math.pow(2, numBits);
        numBits++;
      }

    }
  }
};
  return LZString;
})();

if (typeof define === 'function' && define.amd) {
  define(function () { return LZString; });
} else if( typeof module !== 'undefined' && module != null ) {
  module.exports = LZString
}

// Copyright (c) 2013 Pieroxy <pieroxy@pieroxy.net>
// This work is free. You can redistribute it and/or modify it
// under the terms of the WTFPL, Version 2
// For more information see LICENSE.txt or http://www.wtfpl.net/
//
// This lib is part of the lz-string project.
// For more information, the home page:
// http://pieroxy.net/blog/pages/lz-string/index.html
//
// Base64 compression / decompression for already compressed content (gif, png, jpg, mp3, ...) 
// version 1.4.1
var Base64String = {
  
  compressToUTF16 : function (input) {
    var output = [],
        i,c,
        current,
        status = 0;
    
    input = this.compress(input);
    
    for (i=0 ; i<input.length ; i++) {
      c = input.charCodeAt(i);
      switch (status++) {
        case 0:
          output.push(String.fromCharCode((c >> 1)+32));
          current = (c & 1) << 14;
          break;
        case 1:
          output.push(String.fromCharCode((current + (c >> 2))+32));
          current = (c & 3) << 13;
          break;
        case 2:
          output.push(String.fromCharCode((current + (c >> 3))+32));
          current = (c & 7) << 12;
          break;
        case 3:
          output.push(String.fromCharCode((current + (c >> 4))+32));
          current = (c & 15) << 11;
          break;
        case 4:
          output.push(String.fromCharCode((current + (c >> 5))+32));
          current = (c & 31) << 10;
          break;
        case 5:
          output.push(String.fromCharCode((current + (c >> 6))+32));
          current = (c & 63) << 9;
          break;
        case 6:
          output.push(String.fromCharCode((current + (c >> 7))+32));
          current = (c & 127) << 8;
          break;
        case 7:
          output.push(String.fromCharCode((current + (c >> 8))+32));
          current = (c & 255) << 7;
          break;
        case 8:
          output.push(String.fromCharCode((current + (c >> 9))+32));
          current = (c & 511) << 6;
          break;
        case 9:
          output.push(String.fromCharCode((current + (c >> 10))+32));
          current = (c & 1023) << 5;
          break;
        case 10:
          output.push(String.fromCharCode((current + (c >> 11))+32));
          current = (c & 2047) << 4;
          break;
        case 11:
          output.push(String.fromCharCode((current + (c >> 12))+32));
          current = (c & 4095) << 3;
          break;
        case 12:
          output.push(String.fromCharCode((current + (c >> 13))+32));
          current = (c & 8191) << 2;
          break;
        case 13:
          output.push(String.fromCharCode((current + (c >> 14))+32));
          current = (c & 16383) << 1;
          break;
        case 14:
          output.push(String.fromCharCode((current + (c >> 15))+32, (c & 32767)+32));
          status = 0;
          break;
      }
    }
    output.push(String.fromCharCode(current + 32));
    return output.join('');
  },
  

  decompressFromUTF16 : function (input) {
    var output = [],
        current,c,
        status=0,
        i = 0;
    
    while (i < input.length) {
      c = input.charCodeAt(i) - 32;
      
      switch (status++) {
        case 0:
          current = c << 1;
          break;
        case 1:
          output.push(String.fromCharCode(current | (c >> 14)));
          current = (c&16383) << 2;
          break;
        case 2:
          output.push(String.fromCharCode(current | (c >> 13)));
          current = (c&8191) << 3;
          break;
        case 3:
          output.push(String.fromCharCode(current | (c >> 12)));
          current = (c&4095) << 4;
          break;
        case 4:
          output.push(String.fromCharCode(current | (c >> 11)));
          current = (c&2047) << 5;
          break;
        case 5:
          output.push(String.fromCharCode(current | (c >> 10)));
          current = (c&1023) << 6;
          break;
        case 6:
          output.push(String.fromCharCode(current | (c >> 9)));
          current = (c&511) << 7;
          break;
        case 7:
          output.push(String.fromCharCode(current | (c >> 8)));
          current = (c&255) << 8;
          break;
        case 8:
          output.push(String.fromCharCode(current | (c >> 7)));
          current = (c&127) << 9;
          break;
        case 9:
          output.push(String.fromCharCode(current | (c >> 6)));
          current = (c&63) << 10;
          break;
        case 10:
          output.push(String.fromCharCode(current | (c >> 5)));
          current = (c&31) << 11;
          break;
        case 11:
          output.push(String.fromCharCode(current | (c >> 4)));
          current = (c&15) << 12;
          break;
        case 12:
          output.push(String.fromCharCode(current | (c >> 3)));
          current = (c&7) << 13;
          break;
        case 13:
          output.push(String.fromCharCode(current | (c >> 2)));
          current = (c&3) << 14;
          break;
        case 14:
          output.push(String.fromCharCode(current | (c >> 1)));
          current = (c&1) << 15;
          break;
        case 15:
          output.push(String.fromCharCode(current | c));
          status=0;
          break;
      }
      
      
      i++;
    }
    
    return this.decompress(output.join(''));
    //return output;
    
  },


  // private property
  _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  
  decompress : function (input) {
    var output = [];
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 1;
    var odd = input.charCodeAt(0) >> 8;
    
    while (i < input.length*2 && (i < input.length*2-1 || odd==0)) {
      
      if (i%2==0) {
        chr1 = input.charCodeAt(i/2) >> 8;
        chr2 = input.charCodeAt(i/2) & 255;
        if (i/2+1 < input.length) 
          chr3 = input.charCodeAt(i/2+1) >> 8;
        else 
          chr3 = NaN;
      } else {
        chr1 = input.charCodeAt((i-1)/2) & 255;
        if ((i+1)/2 < input.length) {
          chr2 = input.charCodeAt((i+1)/2) >> 8;
          chr3 = input.charCodeAt((i+1)/2) & 255;
        } else 
          chr2=chr3=NaN;
      }
      i+=3;
      
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      
      if (isNaN(chr2) || (i==input.length*2+1 && odd)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3) || (i==input.length*2 && odd)) {
        enc4 = 64;
      }
      
      output.push(this._keyStr.charAt(enc1));
      output.push(this._keyStr.charAt(enc2));
      output.push(this._keyStr.charAt(enc3));
      output.push(this._keyStr.charAt(enc4));
    }
    
    return output.join('');
  },
  
  compress : function (input) {
    var output = [],
        ol = 1, 
        output_,
        chr1, chr2, chr3,
        enc1, enc2, enc3, enc4,
        i = 0, flush=false;
    
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    
    while (i < input.length) {
      
      enc1 = this._keyStr.indexOf(input.charAt(i++));
      enc2 = this._keyStr.indexOf(input.charAt(i++));
      enc3 = this._keyStr.indexOf(input.charAt(i++));
      enc4 = this._keyStr.indexOf(input.charAt(i++));
      
      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;
      
      if (ol%2==0) {
        output_ = chr1 << 8;
        flush = true;
        
        if (enc3 != 64) {
          output.push(String.fromCharCode(output_ | chr2));
          flush = false;
        }
        if (enc4 != 64) {
          output_ = chr3 << 8;
          flush = true;
        }
      } else {
        output.push(String.fromCharCode(output_ | chr1));
        flush = false;
        
        if (enc3 != 64) {
          output_ = chr2 << 8;
          flush = true;
        }
        if (enc4 != 64) {
          output.push(String.fromCharCode(output_ | chr3));
          flush = false;
        }
      }
      ol+=3;
    }
    
    if (flush) {
      output.push(String.fromCharCode(output_));
      output = output.join('');
      output = String.fromCharCode(output.charCodeAt(0)|256) + output.substring(1);
    } else {
      output = output.join('');
    }
    
    return output;
    
  }
}

/*

Template
dev_output_tmpl
    let searchRes
        ,scrapePtrn = /\{\{[ ]*navContent[ ]*\}\}/gi
    while( (searchRes = scrapePtrn.exec(dev_output_tmpl)) !== null ){
        try{
            dev_output_tmpl = dev_output_tmpl.replace( searchRes[0], CONTENT )
        }catch(e){}
    }

Directory
dev_output_dir

Logging Function
dev_output_log(msg)

*/


dev_output_steps.push(function(){
    if( dev_output_only_assets )
        return
        
    let masterDeferred = Q.defer()

    // /ships/index.html
        ,masterChain = Q.fcall(function(){
            dev_output_log('开始处理: SHIPS')

            let deferred = Q.defer()
                ,searchRes
                ,scrapePtrn = /\{\{[ ]*mainContent[ ]*\}\}/gi
                ,output = dev_output_tmpl
                ,outputPath = node.path.normalize( dev_output_dir + '/ships/index.html' )

            while( (searchRes = scrapePtrn.exec(output)) !== null ){
                try{
                    output = output.replace( searchRes[0],
                        dev_output_filter( node.fs.readFileSync(_g.path.page + 'ships.html', 'utf8'), 'page', 'ships' )
                    )
                }catch(e){}
            }
            
            searchRes = null
            scrapePtrn = /\{\{[ ]*title[ ]*\}\}/gi
            while( (searchRes = scrapePtrn.exec(output)) !== null ){
                try{
                    output = output.replace( searchRes[0], dev_output_gen_title('舰娘') )
                }catch(e){}
            }
            
            //output = dev_output_filter(output)
        
            console.log( outputPath )
            
            node.fs.writeFile(
                outputPath,
                output,
                function(err){
                    if( err ){
                        deferred.reject(new Error(err))
                    }else{
                        dev_output_log('生成文件: ' + outputPath)
                        deferred.resolve()
                    }
                }
            )

            return deferred.promise
        })
    
    
    for(let i in _g.data.ships){
        masterChain = masterChain.then(function(){
            let deferred = Q.defer()
                ,searchRes
                ,scrapePtrn = /\{\{[ ]*mainContent[ ]*\}\}/gi
                ,output = dev_output_tmpl
                ,outputDir = node.path.normalize( dev_output_dir + '/ships/' +i )
                ,outputPath = node.path.normalize( outputDir+ '/index.html' )
            
            if (!node.fs.existsSync(outputDir)){
                node.fs.mkdirSync(outputDir);
            }

            while( (searchRes = scrapePtrn.exec(output)) !== null ){
                try{
                    output = output.replace( searchRes[0],
                        dev_output_filter(
                            _frame.infos.getContent('ship', i)[0].outerHTML,
                            'infos',
                            'ship'
                        )
                    )
                }catch(e){}
            }
            
            searchRes = null
            scrapePtrn = /\{\{[ ]*title[ ]*\}\}/gi
            while( (searchRes = scrapePtrn.exec(output)) !== null ){
                try{
                    output = output.replace( searchRes[0], dev_output_gen_title(_g.data.ships[i].getName(true) + ' - 舰娘') )
                }catch(e){}
            }
            
            //output = dev_output_filter(output)
        
            console.log( outputPath )
            
            node.fs.writeFile(
                outputPath,
                output,
                function(err){
                    if( err ){
                        deferred.reject(new Error(err))
                    }else{
                        dev_output_log('生成文件: ' + outputPath)
                        deferred.resolve()
                    }
                }
            )

            return deferred.promise
        })
    }
    
    
    masterChain = masterChain.catch(function(e){
            console.log(e)
            dev_output_log('发生错误')
        }).done(function(){
            masterDeferred.resolve()
        })

    return masterDeferred.promise
})
/*

Template
dev_output_tmpl
	let searchRes
		,scrapePtrn = /\{\{[ ]*navContent[ ]*\}\}/gi
	while( (searchRes = scrapePtrn.exec(dev_output_tmpl)) !== null ){
		try{
			dev_output_tmpl = dev_output_tmpl.replace( searchRes[0], CONTENT )
		}catch(e){}
	}

Directory
dev_output_dir

Logging Function
dev_output_log(msg)

*/

dev_output_steps.push(function(){
	if( dev_output_only_assets )
		return
		
	let masterDeferred = Q.defer()

	// /equipments/index.html
		,masterChain = Q.fcall(function(){
			dev_output_log('开始处理: EQUIPMENTS')

			let deferred = Q.defer()
				,searchRes
				,scrapePtrn = /\{\{[ ]*mainContent[ ]*\}\}/gi
				,output = dev_output_tmpl
				,outputPath = node.path.normalize( dev_output_dir + '/equipments/index.html' )

			while( (searchRes = scrapePtrn.exec(output)) !== null ){
				try{
					output = output.replace( searchRes[0],
						dev_output_filter( node.fs.readFileSync(_g.path.page + 'equipments.html', 'utf8'), 'page', 'equipments' )
					)
				}catch(e){}
			}
			
			searchRes = null
			scrapePtrn = /\{\{[ ]*title[ ]*\}\}/gi
			while( (searchRes = scrapePtrn.exec(output)) !== null ){
				try{
					output = output.replace( searchRes[0], dev_output_gen_title('装备') )
				}catch(e){}
			}
			
			//output = dev_output_filter(output)
		
			console.log( outputPath )
			
			node.fs.writeFile(
				outputPath,
				output,
				function(err){
					if( err ){
						deferred.reject(new Error(err))
					}else{
						dev_output_log('生成文件: ' + outputPath)
						deferred.resolve()
					}
				}
			)

			return deferred.promise
		})
	
	
	for(let i in _g.data.items){
		masterChain = masterChain.then(function(){
			let deferred = Q.defer()
				,searchRes
				,scrapePtrn = /\{\{[ ]*mainContent[ ]*\}\}/gi
				,output = dev_output_tmpl
				,outputDir = node.path.normalize( dev_output_dir + '/equipments/' +i )
				,outputPath = node.path.normalize( outputDir+ '/index.html' )
			
			if (!node.fs.existsSync(outputDir)){
				node.fs.mkdirSync(outputDir);
			}

			while( (searchRes = scrapePtrn.exec(output)) !== null ){
				try{
					output = output.replace( searchRes[0],
						dev_output_filter(
							_frame.infos.getContent('equipment', i)[0].outerHTML,
							'infos',
							'equipment'
						)
					)
				}catch(e){}
			}
			
			searchRes = null
			scrapePtrn = /\{\{[ ]*title[ ]*\}\}/gi
			while( (searchRes = scrapePtrn.exec(output)) !== null ){
				try{
					output = output.replace( searchRes[0], dev_output_gen_title(_g.data.items[i]._name + ' - 装备') )
				}catch(e){}
			}
			
			//output = dev_output_filter(output)
		
			console.log( outputPath )
			
			node.fs.writeFile(
				outputPath,
				output,
				function(err){
					if( err ){
						deferred.reject(new Error(err))
					}else{
						dev_output_log('生成文件: ' + outputPath)
						deferred.resolve()
					}
				}
			)

			return deferred.promise
		})
	}
	
	
	masterChain = masterChain.catch(function(e){
			console.log(e)
			dev_output_log('发生错误')
		}).done(function(){
			masterDeferred.resolve()
		})

	return masterDeferred.promise
})
/*

Template
dev_output_tmpl
	let searchRes
		,scrapePtrn = /\{\{[ ]*navContent[ ]*\}\}/gi
	while( (searchRes = scrapePtrn.exec(dev_output_tmpl)) !== null ){
		try{
			dev_output_tmpl = dev_output_tmpl.replace( searchRes[0], CONTENT )
		}catch(e){}
	}

Directory
dev_output_dir

Logging Function
dev_output_log(msg)

*/


dev_output_steps.push(function(){
	if( dev_output_only_assets )
		return
		
	let masterDeferred = Q.defer()

	// /entities/index.html
		,masterChain = Q.fcall(function(){
			dev_output_log('开始处理: ENTITIES')

			let deferred = Q.defer()
				,maincontainer = $('<div/>')
				,container = $( node.fs.readFileSync(_g.path.page + 'entities.html', 'utf8') ).appendTo(maincontainer)
				,data = new TablelistEntities( container )

			let interval = setInterval(function(){
				if( data.generated ){
					clearInterval(interval)
					interval = null
					
					// 将base64编码的图片地址转为URL
						container.find('a[data-entityid]').each(function(i, el){
							el = $(el)
							let id = el.attr('data-entityid')
							if( id )
								el.find('i')
									.removeAttr('style')
									.attr('search-entitymaskpic-id', id)
									.addClass('nomask')
						})
					
					deferred.resolve( maincontainer.html() )
				}
			},10)

			return deferred.promise
		})
		.then(function( mainhtml ){
			let searchRes
				,scrapePtrn = /search-entitymaskpic-id\=\"([^\"]+)\"/gi

			while( (searchRes = scrapePtrn.exec(mainhtml)) !== null ){
				try{
					mainhtml = mainhtml.replace( searchRes[0], 'style="background-image:url(/!/pics/entities/'+searchRes[1]+'/0-1.png)"')
				}catch(e){}
			}
			
			return mainhtml
		})
		.then(function( mainhtml ){
			let deferred = Q.defer()
				,searchRes
				,scrapePtrn = /\{\{[ ]*mainContent[ ]*\}\}/gi
				,output = dev_output_tmpl
				,outputPath = node.path.normalize( dev_output_dir + '/entities/index.html' )

			while( (searchRes = scrapePtrn.exec(output)) !== null ){
				try{
					output = output.replace( searchRes[0], dev_output_filter( mainhtml, 'page', 'entities' ))
				}catch(e){}
			}
			
			searchRes = null
			scrapePtrn = /\{\{[ ]*title[ ]*\}\}/gi
			while( (searchRes = scrapePtrn.exec(output)) !== null ){
				try{
					output = output.replace( searchRes[0], dev_output_gen_title('声优&画师') )
				}catch(e){}
			}
			
			//output = dev_output_filter(output)
		
			console.log( outputPath )
			
			node.fs.writeFile(
				outputPath,
				output,
				function(err){
					if( err ){
						deferred.reject(new Error(err))
					}else{
						dev_output_log('生成文件: ' + outputPath)
						deferred.resolve()
					}
				}
			)

			return deferred.promise
		})
	
	
	for(let i in _g.data.entities){
		masterChain = masterChain.then(function(){
			let deferred = Q.defer()
				,searchRes
				,scrapePtrn = /\{\{[ ]*mainContent[ ]*\}\}/gi
				,output = dev_output_tmpl
				,outputDir = node.path.normalize( dev_output_dir + '/entities/' +i )
				,outputPath = node.path.normalize( outputDir+ '/index.html' )
			
			if (!node.fs.existsSync(outputDir)){
				node.fs.mkdirSync(outputDir);
			}

			while( (searchRes = scrapePtrn.exec(output)) !== null ){
				try{
					output = output.replace( searchRes[0],
						dev_output_filter(
							_frame.infos.getContent('entity', i)[0].outerHTML,
							'infos',
							'entity'
						)
					)
				}catch(e){}
			}
			
			searchRes = null
			scrapePtrn = /\{\{[ ]*title[ ]*\}\}/gi
			while( (searchRes = scrapePtrn.exec(output)) !== null ){
				try{
					output = output.replace( searchRes[0], dev_output_gen_title(_g.data.entities[i]._name + ' - 声优&画师') )
				}catch(e){}
			}
			
			searchRes = null
			scrapePtrn = /src="data\:image[^\"]+"/gi
			while( (searchRes = scrapePtrn.exec(output)) !== null ){
				try{
					output = output.replace( searchRes[0], 'src="/!/pics/entities/'+i+'/2.jpg"' )
				}catch(e){}
			}
			
			//output = dev_output_filter(output)
		
			//console.log( outputPath )
			
			node.fs.writeFile(
				outputPath,
				output,
				function(err){
					if( err ){
						deferred.reject(new Error(err))
					}else{
						dev_output_log('生成文件: ' + outputPath)
						deferred.resolve()
					}
				}
			)

			return deferred.promise
		})
	}
	
	
	masterChain = masterChain.catch(function(e){
			console.log(e)
			dev_output_log('发生错误')
		}).done(function(){
			masterDeferred.resolve()
		})

	return masterDeferred.promise
})

/*

Template
dev_output_tmpl
	let searchRes
		,scrapePtrn = /\{\{[ ]*navContent[ ]*\}\}/gi
	while( (searchRes = scrapePtrn.exec(dev_output_tmpl)) !== null ){
		try{
			dev_output_tmpl = dev_output_tmpl.replace( searchRes[0], CONTENT )
		}catch(e){}
	}

Directory
dev_output_dir

Logging Function
dev_output_log(msg)

*/


dev_output_steps.push(function(){
	if( dev_output_only_assets )
		return
	
	let masterDeferred = Q.defer()

	// /entities/index.html
		Q.fcall(function(){
			dev_output_log('开始处理: ARSENAL')

			let maincontainer = $('<div/>')
				,container = $( node.fs.readFileSync(_g.path.page + 'arsenal.html', 'utf8') ).appendTo(maincontainer)
			
			_frame.app_main.page['arsenal'].init( maincontainer )
			
			return maincontainer.html()
		})
		.then(function( mainhtml ){

			let deferred = Q.defer()
				,searchRes
				,scrapePtrn = /\{\{[ ]*mainContent[ ]*\}\}/gi
				,output = dev_output_tmpl
				,outputPath = node.path.normalize( dev_output_dir + '/arsenal/index.html' )

			while( (searchRes = scrapePtrn.exec(output)) !== null ){
				try{
					output = output.replace( searchRes[0],
						dev_output_filter( mainhtml, 'page', 'arsenal' )
							.replace('<input id="arsenal_headtab-1" type="radio" name="arsenal_headtab">',
								'<input id="arsenal_headtab-1" type="radio" name="arsenal_headtab" checked />'
							)
					)
				}catch(e){}
			}
			
			searchRes = null
			scrapePtrn = /\{\{[ ]*title[ ]*\}\}/gi
			while( (searchRes = scrapePtrn.exec(output)) !== null ){
				try{
					output = output.replace( searchRes[0], dev_output_gen_title('改修工厂') )
				}catch(e){}
			}
		
			console.log( outputPath )
			
			node.fs.writeFile(
				outputPath,
				output,
				function(err){
					if( err ){
						deferred.reject(new Error(err))
					}else{
						dev_output_log('生成文件: ' + outputPath)
						deferred.resolve()
					}
				}
			)

			return deferred.promise
		}).catch(function(e){
			console.log(e)
			dev_output_log('发生错误')
		}).done(function(){
			masterDeferred.resolve()
		})

	return masterDeferred.promise
})
/*

Template
dev_output_tmpl
	let searchRes
		,scrapePtrn = /\{\{[ ]*navContent[ ]*\}\}/gi
	while( (searchRes = scrapePtrn.exec(dev_output_tmpl)) !== null ){
		try{
			dev_output_tmpl = dev_output_tmpl.replace( searchRes[0], CONTENT )
		}catch(e){}
	}

Directory
dev_output_dir

Logging Function
dev_output_log(msg)

*/


dev_output_steps.push(function(){
	if( dev_output_only_assets )
		return
		
	let masterDeferred = Q.defer()

	// /entities/index.html
		Q.fcall(function(){
			dev_output_log('开始处理: DONATE')

			let deferred = Q.defer()
				,searchRes
				,scrapePtrn = /\{\{[ ]*mainContent[ ]*\}\}/gi
				,output = dev_output_tmpl
				,outputPath = node.path.normalize( dev_output_dir + '/donate/index.html' )

			while( (searchRes = scrapePtrn.exec(output)) !== null ){
				try{
					output = output.replace( searchRes[0],
						dev_output_filter( node.fs.readFileSync(_g.path.page + 'donate.html', 'utf8'), 'page', 'donate' )
					)
				}catch(e){}
			}
			
			searchRes = null
			scrapePtrn = /\{\{[ ]*title[ ]*\}\}/gi
			while( (searchRes = scrapePtrn.exec(output)) !== null ){
				try{
					output = output.replace( searchRes[0], dev_output_gen_title('捐助') )
				}catch(e){}
			}
		
			console.log( outputPath )
			
			node.fs.writeFile(
				outputPath,
				output,
				function(err){
					if( err ){
						deferred.reject(new Error(err))
					}else{
						dev_output_log('生成文件: ' + outputPath)
						deferred.resolve()
					}
				}
			)

			return deferred.promise
		}).catch(function(e){
			console.log(e)
			dev_output_log('发生错误')
		}).done(function(){
			masterDeferred.resolve()
		})

	return masterDeferred.promise
})

dev_output_steps.push(function(){
	if( dev_output_only_assets )
		return
		
	let masterDeferred = Q.defer()

	// /fleets/index.html
		,masterChain = Q.fcall(function(){
			dev_output_log('开始处理: FLEETS')

			let deferred = Q.defer()
				,maincontainer = $('<div/>')
				,container = $( node.fs.readFileSync(_g.path.page + 'fleets.html', 'utf8') ).appendTo(maincontainer)
				/*,data = new TablelistEntities( container )

			let interval = setInterval(function(){
				if( data.generated ){
					clearInterval(interval)
					interval = null
					deferred.resolve( maincontainer.html() )
				}
			},10)
			*/
			deferred.resolve( maincontainer.html() )

			return deferred.promise
		})
		.then(function( mainhtml ){

			let deferred = Q.defer()
				,searchRes
				,scrapePtrn = /\{\{[ ]*mainContent[ ]*\}\}/gi
				,output = dev_output_tmpl
				,outputPath = node.path.normalize( dev_output_dir + '/fleets/index.html' )

			while( (searchRes = scrapePtrn.exec(output)) !== null ){
				try{
					output = output.replace( searchRes[0], dev_output_filter( mainhtml, 'page', 'fleets' ))
				}catch(e){}
			}
			
			searchRes = null
			scrapePtrn = /\{\{[ ]*title[ ]*\}\}/gi
			while( (searchRes = scrapePtrn.exec(output)) !== null ){
				try{
					output = output.replace( searchRes[0], dev_output_gen_title('舰队') )
				}catch(e){}
			}
			
			//output = dev_output_filter(output)
		
			console.log( outputPath )
			
			node.fs.writeFile(
				outputPath,
				output,
				function(err){
					if( err ){
						deferred.reject(new Error(err))
					}else{
						dev_output_log('生成文件: ' + outputPath)
						deferred.resolve()
					}
				}
			)

			return deferred.promise
		})
	
	// /fleets/build/index.html
		.then(function(){
			let deferred = Q.defer()
				,searchRes
				,scrapePtrn = /\{\{[ ]*mainContent[ ]*\}\}/gi
				,output = dev_output_tmpl
				,outputDir = node.path.normalize( dev_output_dir + '/fleets/build/' )
				,outputPath = node.path.normalize( outputDir+ '/index.html' )
			
			if (!node.fs.existsSync(outputDir)){
				node.fs.mkdirSync(outputDir);
			}

			while( (searchRes = scrapePtrn.exec(output)) !== null ){
				try{
					output = output.replace( searchRes[0],
						dev_output_filter(
							_frame.infos.getContent('fleet', '__OUTPUT__')[0].outerHTML,
							'infos',
							'entity'
						)
					)
				}catch(e){}
			}
			
			searchRes = null
			scrapePtrn = /\{\{[ ]*title[ ]*\}\}/gi
			while( (searchRes = scrapePtrn.exec(output)) !== null ){
				try{
					output = output.replace( searchRes[0], dev_output_gen_title('舰队配置') )
				}catch(e){}
			}
			
			//output = dev_output_filter(output)
		
			console.log( outputPath )
			
			node.fs.writeFile(
				outputPath,
				output,
				function(err){
					if( err ){
						deferred.reject(new Error(err))
					}else{
						dev_output_log('生成文件: ' + outputPath)
						deferred.resolve()
					}
				}
			)

			return deferred.promise
		})
	
	
	masterChain = masterChain.catch(function(e){
			console.log(e)
			dev_output_log('发生错误')
		}).done(function(){
			masterDeferred.resolve()
		})

	return masterDeferred.promise
})

dev_output_steps.push(function(){
	if( dev_output_only_assets )
		return
		
	let masterDeferred = Q.defer()
		,dir_templates = node.path.join( _g.root, 'dev-output', 'templates' )
		,pages = [
			{
				page:	'home',
				title:	null,
				source:	node.path.join( dir_templates, 'page', 'index.html' ),
				target:	node.path.join( dev_output_dir, 'index.html' ),
				filter:	dev_output_filters.page_home
			},
			{
				page:	'calctp',
				title:	'TP计算器',
				source:	node.path.join( _g.path.page, 'calctp.html' ),
				target:	node.path.join( dev_output_dir, 'calctp', 'index.html' )
			}
		]
		,updates = []

	// 获取更新日志
		,masterChain = Q.fcall(function(){
			dev_output_log('开始处理: 其他页面')
			var deferred = Q.defer()
			_db.updates.find({$not:{'date':""}}).sort({'date': -1, 'version': -1}).exec(function(err, docs){
				docs.forEach(function(doc){
					updates.push(doc)
				})
				deferred.resolve(err)
			})
			return deferred.promise
		})
	
	
	pages.forEach(function(o){
		masterChain = masterChain.then(function(){
			let deferred = Q.defer()
				,searchRes
				,scrapePtrn = /\{\{[ ]*mainContent[ ]*\}\}/gi
				,output = dev_output_tmpl
				,outputDir = node.path.dirname(o.target)
				,mainhtml = node.fs.readFileSync(o.source, 'utf-8')
			
			if( o.filter )
				mainhtml = o.filter(mainhtml, updates)
			
			if (!node.fs.existsSync(outputDir))
				node.fs.mkdirSync(outputDir);

			while( (searchRes = scrapePtrn.exec(output)) !== null ){
				try{
					output = output.replace( searchRes[0],
						dev_output_filter(
							mainhtml,
							'page',
							o.page
						)
					)
				}catch(e){}
			}
			
			searchRes = null
			scrapePtrn = /\{\{[ ]*title[ ]*\}\}/gi
			while( (searchRes = scrapePtrn.exec(output)) !== null ){
				try{
					output = output.replace( searchRes[0], dev_output_gen_title(o.title) )
				}catch(e){}
			}
			
			node.fs.writeFile(
				o.target,
				output,
				function(err){
					if( err ){
						deferred.reject(new Error(err))
					}else{
						dev_output_log('生成文件: ' + o.target)
						deferred.resolve()
					}
				}
			)

			return deferred.promise
		})
	})
		
	masterChain = masterChain.catch(function(e){
		console.log(e)
		dev_output_log('发生错误')
	}).done(function(){
		masterDeferred.resolve()
	})

	return masterDeferred.promise
});



dev_output_filters.page_home = function(html, updates){
	// if update date not reached, filtered out
	updates = updates.filter(function(update){
		let target = parseInt(update.date.split('-').join(''))
			,now = parseInt((new Date()).format('%Y%m%d'))		
		return (now >= target)
	})

	let searchRes
		,scrapePtrn = /\{\{[ ]*content::WhatsNew[ ]*\}\}/gi
        ,updateIndex = 0
		
		,section = $('<section class="update_journal" data-version-'+updates[updateIndex]['type']+'="'+updates[updateIndex]['version']+'"/>')
						.html('<h3>'
								+ '新内容'
								+ '<small>'+(updates[updateIndex]['date'] ? updates[updateIndex]['date'] : 'WIP')+'</small>'
								+ '</h3>'
							)
		try{
			$(_frame.app_main.page['about'].journal_parse(updates[0]['journal'])).appendTo( section )
		}catch(e){}
    
    while( section.text().length < 200 ){
        updateIndex++
        let _update = updates[updateIndex]
        section
            .append( $(`<h3>新内容<small>${_update['date'] ? _update['date'] : 'WIP'}</small></h3>`) )
            .append( _frame.app_main.page['about'].journal_parse(_update['journal']) )
    }

	while( (searchRes = scrapePtrn.exec(html)) !== null ){
		try{
			html = html.replace( searchRes[0], section[0].outerHTML )
		}catch(e){}
	}

	return html
};


dev_output_steps.push(function(){
	if( dev_output_only_assets )
		return
		
	let masterDeferred = Q.defer()

	// 
		,masterChain = Q.fcall(function(){
			return dev_output_log('开始处理: TIP')
		})
	
	// 舰娘 zh_cn
		for(let i in _g.data.ships){
			masterChain = masterChain.then(function(){
				let deferred = Q.defer()
					,d = _g.data.ships[i]
					,l = 'zh_cn'
					,output = ''
					,outputDir = node.path.normalize( dev_output_dir + '/!/tip/ships/' + l )
					,outputPath = node.path.normalize( outputDir+ '/' + d.id + '.js' )
				
				if (!node.fs.existsSync(outputDir)){
					node.fs.mkdirSync(outputDir);
				}
				
				function _val( val, show_zero ){
					if( !show_zero && (val == 0 || val == '0') )
						return '-'
					if( val == -1 || val == '-1' )
						return '?'
					return val
				}
				function attr(a){
					switch(a){
						case 'asw':
							return _val( d.getAttribute(a, 99), /^(5|8|9|12|24)$/.test(d['type']) )
							break;
						case 'speed':
							return _g.getStatSpeed( d['stat']['speed'] )
							break;
						case 'range':
							return _g.getStatRange( d['stat']['range'] )
							break;
						case 'luck':
							return d['stat']['luck'] + '<sup>' + d['stat']['luck_max'] + '</sup>'
							break;
						case 'carry':
							return d.stat.carry
									+ (d.stat.carry > 0
									? '<sup>' + d.slot.join(',') + '</sup>'
									: '')
							break;
						default:
							return _val( d.getAttribute(a, 99) )
					}
				}

				output = 'KCTip.loaded("ships",'+d.id+',"'+l+'","'
							+ '<img src=\\"http://fleet.moe/!/pics-ships/'+d.id+'/2.png\\" width=\\"218\\" height=\\"300\\"/>'
							+ '<h3>' + d.getNameNoSuffix(l) + '<small>' + d.getSuffix(l) + '</small></h3>'
							+ '<h4>'
								+ ( d['class'] ? _g['data']['ship_classes'][d['class']].name[l] + '级' : '' )
								+ ( d['class_no'] ? '<i>' + d['class_no'] + '</i>号舰' : '' )
								+ ( d['type'] ? '<b>/</b>' + _g['data']['ship_types'][d['type']].name[l] : '' )
							+ '</h4>'
							+ '<dl>'
								+ '<dt>耐久</dt><dd>'+ attr('hp') +'</dd>'
								+ '<dt>装甲</dt><dd>'+ attr('armor') +'</dd>'
								+ '<dt>回避</dt><dd>'+ attr('evasion') +'</dd>'
								+ '<dt>搭载</dt><dd>'+ attr('carry') +'</dd>'
								+ '<dt>火力</dt><dd>'+ attr('fire') +'</dd>'
								+ '<dt>雷装</dt><dd>'+ attr('torpedo') +'</dd>'
								+ '<dt>对空</dt><dd>'+ attr('aa') +'</dd>'
								+ '<dt>对潜</dt><dd>'+ attr('asw') +'</dd>'
								+ '<dt>航速</dt><dd>'+ attr('speed') +'</dd>'
								+ '<dt>射程</dt><dd>'+ attr('range') +'</dd>'
								+ '<dt>索敌</dt><dd>'+ attr('los') +'</dd>'
								+ '<dt>运</dt><dd>'+ attr('luck') +'</dd>'
							+ '</dl>'
						+ '")'

				node.fs.writeFile(
					outputPath,
					output,
					function(err){
						if( err ){
							deferred.reject(new Error(err))
						}else{
							dev_output_log('生成文件: ' + outputPath)
							deferred.resolve()
						}
					}
				)
	
				return deferred.promise
			})
		}
	
	// 装备 zh_cn
		for(let i in _g.data.items){
			masterChain = masterChain.then(function(){
				let deferred = Q.defer()
					,d = _g.data.items[i]
					,l = 'zh_cn'
					,output = ''
					,outputDir = node.path.normalize( dev_output_dir + '/!/tip/equipments/' + l )
					,outputPath = node.path.normalize( outputDir+ '/' + d.id + '.js' )
				
				if (!node.fs.existsSync(outputDir)){
					node.fs.mkdirSync(outputDir);
				}

				function _stat(stat, title){
					if( d['stat'][stat] ){
						if( d.type == 54 ){
							// 局地战斗机
							switch( stat ){
								case 'hit': 	title = '对爆';	break;
								case 'evasion': title = '迎击';	break;
							}
						}
						switch(stat){
							case 'range':
								return '<span>射程: ' + _g.getStatRange( d['stat'][stat] ) + '</span>';
							case 'distance':
								return '<span>' + title + ': ' + d['stat'][stat] + '</span>';
							default:
								var val = parseInt( d['stat'][stat] )
								return '<span>' + ( val > 0 ? '+' : '') + val + ' ' + title + '</span>'
						}
					}else{
						return ''
					}
				}
			
				var item_icon = 'http://fleet.moe/!/assets/images/itemicon/'
									+ d.getIconId()
									+ '.png'
					,item_name = d.getName(l)
					,isAircraft = $.inArray(d.type, Formula.equipmentType.Aircrafts) > -1
				output = 'KCTip.loaded("equipments",'+d.id+',"'+l+'","'
							+ '<h3>'
								+ '<s style=\\"background-image: url(' + item_icon + ')\\"></s>'
								+ '<strong>'
									+ item_name
								+ '</strong>'
								+ '<small>' + _g.data.item_types[d['type']]['name'][l] + '</small>'
							+ '</h3>'
							+ _stat('fire', '火力')
							+ _stat('torpedo', '雷装')
							+ _stat('aa', '对空')
							+ _stat('asw', '对潜')
							+ _stat('bomb', '爆装')
							+ _stat('hit', '命中')
							+ _stat('armor', '装甲')
							+ _stat('evasion', '回避')
							+ _stat('los', '索敌')
							+ _stat('range', '射程')
							+ ( isAircraft ? _stat('distance', '航程') : '' )
						+ '")'

				node.fs.writeFile(
					outputPath,
					output,
					function(err){
						if( err ){
							deferred.reject(new Error(err))
						}else{
							dev_output_log('生成文件: ' + outputPath)
							deferred.resolve()
						}
					}
				)
	
				return deferred.promise
			})
		}
		
	masterChain = masterChain.catch(function(e){
		console.log(e)
		dev_output_log('发生错误')
	}).done(function(){
		masterDeferred.resolve()
	})

	return masterDeferred.promise
});

/*

Template
dev_output_tmpl
    let searchRes
        ,scrapePtrn = /\{\{[ ]*navContent[ ]*\}\}/gi
    while( (searchRes = scrapePtrn.exec(dev_output_tmpl)) !== null ){
        try{
            dev_output_tmpl = dev_output_tmpl.replace( searchRes[0], CONTENT )
        }catch(e){}
    }

Directory
dev_output_dir

Logging Function
dev_output_log(msg)

*/


dev_output_steps.push(function(){
    function copyFile(source, target, cb, t) {
        Q.fcall(function(){
            let deferred = Q.defer()
            node.fs.readFile(source, 'utf8', function(err, data){
                if( err ){
                    deferred.reject(new Error(err))
                }else{
                    deferred.resolve(data)
                }
            })
            return deferred.promise
        })
        .then(function(data){
            let deferred = Q.defer()
            //data = dev_output_filter(data)
            data = dev_output_filter(data, t)
            data = data.replace(/_g\.bgimg_count[\t ]*=[\t ]*0/g, '_g.bgimg_count='+ bgimg_count)
            node.fs.writeFile(
                target,
                data,
                function(err){
                    if( err ){
                        deferred.reject(new Error(err))
                    }else{
                        deferred.resolve()
                    }
                }
            )
            return deferred.promise
        })
        .done(cb)
    }
    function copyFile2(source, target, cb) {
        var cbCalled = false;
        
        var rd = node.fs.createReadStream(source);
        rd.on("error", done);
        
        var wr = node.fs.createWriteStream(target);
        wr.on("error", done);
        wr.on("close", function(ex) {
            done();
        });
        rd.pipe(wr);
        
        function done(err) {
            if (!cbCalled) {
            cb(err);
            cbCalled = true;
            }
        }
    }
    function copyFile_compress(source, target, cb, donotcompress) {
        Q.fcall(function(){
            let deferred = Q.defer()
            node.fs.readFile(source, 'utf8', function(err, data){
                if( err ){
                    deferred.reject(new Error(err))
                }else{
                    deferred.resolve(data)
                }
            })
            return deferred.promise
        })
        .then(function(data){
            let deferred = Q.defer()
            node.fs.writeFile(
                target,
                donotcompress ? data : LZString.compressToBase64(data),
                function(err){
                    if( err ){
                        deferred.reject(new Error(err))
                    }else{
                        deferred.resolve()
                    }
                }
            )
            return deferred.promise
        })
        .done(cb)
    }

    let masterDeferred = Q.defer()
        ,bgimg_count = 0

        Q.fcall(function(){
            dev_output_log('开始处理: BG IMAGES')
            
            let deferred = Q.defer()
                ,files = []
            
            /*
            node.fs.readdir(node.path.join( _g.path.bgimg_dir, 'blured'), function(err, files){
                if( err ){
                    deferred.reject(new Error(err))
                }else{
                    bgimg_count = files.length
                    deferred.resolve(files)
                }
            })
            */
            node.fs.readdirSync( _g.path.bgimg_dir )
                .filter(function(file){
                    return !node.fs.lstatSync( node.path.join( _g.path.bgimg_dir , file) ).isDirectory()
                })
                .map(function(v) { 
                    return {
                        name: v,
                        time: node.fs.statSync( node.path.join( _g.path.bgimg_dir , v) ).mtime.getTime()
                    }; 
                })
                .sort(function(a, b) { return a.time - b.time; })
                .map(function(v) { return v.name; })
                .forEach(function(name){
                    files.push( name )
                })
            bgimg_count = files.length
            deferred.resolve(files)
            return deferred.promise
        })
        .then(function(files){
            let deferred = Q.defer()
                ,result = Q(files)

            files.forEach(function (file, index) {
                console.log(file)
                result = result.then(function(){
                    let _deferred = Q.defer()
                        ,filePath1 = node.path.join( _g.path.bgimg_dir, file )
                        ,filePath2 = node.path.join( _g.path.bgimg_dir, 'blured', file )
                        ,filePath3 = node.path.join( _g.path.bgimg_dir, 'thumbnail', file )
                        ,outputPath1 = node.path.join( dev_output_dir, '!', 'assets', 'images', 'homebg', index + '.jpg' )
                        ,outputPath2 = node.path.join( dev_output_dir, '!', 'assets', 'images', 'homebg', 'blured', index + '.jpg' )
                        ,outputPath3 = node.path.join( dev_output_dir, '!', 'assets', 'images', 'homebg', 'thumbnail', index + '.jpg' )
                    
                    Q.fcall(function(){})
                    .then(function(){
                        let __deferred = Q.defer()
                        copyFile2(
                            filePath1,
                            outputPath1,
                            function(err){
                                if( err ){
                                    __deferred.reject(new Error(err))
                                }else{
                                    dev_output_log('生成文件: ' + outputPath1)
                                    __deferred.resolve()
                                }
                            }
                        )
                        return __deferred.promise
                    })
                    .then(function(){
                        let __deferred = Q.defer()
                        copyFile2(
                            filePath2,
                            outputPath2,
                            function(err){
                                if( err ){
                                    __deferred.reject(new Error(err))
                                }else{
                                    dev_output_log('生成文件: ' + outputPath2)
                                    __deferred.resolve()
                                }
                            }
                        )
                        return __deferred.promise
                    })
                    .then(function(){
                        let __deferred = Q.defer()
                        copyFile2(
                            filePath3,
                            outputPath3,
                            function(err){
                                if( err ){
                                    __deferred.reject(new Error(err))
                                }else{
                                    dev_output_log('生成文件: ' + outputPath3)
                                    __deferred.resolve()
                                    _deferred.resolve()
                                }
                            }
                        )
                        return __deferred.promise
                    })

                    return _deferred.promise
                });
            });
            
            result = result.done(function(){
                deferred.resolve()
            })
            
            return deferred.promise
        })
        
        
        
        
        .then(function(){
            dev_output_log('开始处理: CSS & JS')
            
            let deferred = Q.defer()

            node.fs.readdir(node.path.join( _g.root, 'dev-output', 'assets-output'), function(err, files){
                if( err ){
                    deferred.reject(new Error(err))
                }else{
                    deferred.resolve(files)
                }
            })
            
            return deferred.promise
        })
        .then(function(files){
            let deferred = Q.defer()
                ,result = Q(files)

            files.forEach(function (file) {
                result = result.then(function(){
                    let _deferred = Q.defer()
                        ,outputPath = node.path.join( dev_output_dir, '!', 'assets', file )
                    copyFile(
                        node.path.join( _g.root, 'dev-output', 'assets-output', file ),
                        outputPath,
                        function(err){
                            if( err ){
                                _deferred.reject(new Error(err))
                            }else{
                                dev_output_log('生成文件: ' + outputPath)
                                _deferred.resolve()
                            }
                        },
                        node.path.extname(file)
                    )
                    return _deferred.promise
                });
            });
            
            result = result.done(function(){
                deferred.resolve()
            })
            
            return deferred.promise
        })
        .then(function(){
            let deferred = Q.defer()
                ,fontfiles = [
                    'icons.eot',
                    'icons.svg',
                    'icons.ttf',
                    'icons.woff'
                ]
                ,chain = Q()
            
            fontfiles.forEach(function(filename){
                chain = chain.then(function(){
                    let outputPath = node.path.join( dev_output_dir, '!', 'assets', 'fonts', filename )
                        ,_deferred = Q.defer()
                    copyFile2(
                        //node.path.join( _g.root, 'app', 'assets', 'fonts', filename ),
                        node.path.join( _g.root, 'dev-output', 'js-source', 'fonts', filename ),
                        outputPath,
                        function(err){
                            if( err ){
                                _deferred.reject(new Error(err))
                            }else{
                                dev_output_log('生成文件: ' + outputPath)
                                _deferred.resolve()
                            }
                        }
                    )
                })
            })
            
            chain = chain.catch(function(){
                deferred.resolve()
            }).done(function(){
                deferred.resolve()
            })
            
            return deferred.promise
        })
        
        
        
        
        .then(function(){
            dev_output_log('开始处理: DB JSONs')
            
            let deferred = Q.defer()

            node.fs.readdir(node.path.normalize( _g.path.db ), function(err, files){
                if( err ){
                    deferred.reject(new Error(err))
                }else{
                    deferred.resolve(files)
                }
            })
            
            return deferred.promise
        })
        .then(function(files){
            let deferred = Q.defer()
                ,result = Q(files)

            files.forEach(function (file) {
                result = result.then(function(){
                    let _deferred = Q.defer()
                        ,outputPath = node.path.join( dev_output_dir, '!', 'db', file )
                        
                    copyFile_compress(
                        node.path.join( _g.path.db, file ),
                        outputPath,
                        function(err){
                            if( err ){
                                _deferred.reject(new Error(err))
                            }else{
                                dev_output_log('生成文件 (已压缩): ' + outputPath)
                                _deferred.resolve()
                            }
                        },
                        file == 'entities.nedb' ? true : null
                    )
                    
                    return _deferred.promise
                });
            });
            
            result = result.done(function(){
                deferred.resolve()
            })
            
            return deferred.promise
        })
        
        
        
        
        .catch(function(e){
            console.log(e)
            dev_output_log('发生错误')
        }).done(function(){
            masterDeferred.resolve()
        })

    return masterDeferred.promise
})

"use strict";

let debug = (function(debug){

$('#titlebar > .buttons').prepend( $('<button/>',{
		'class':	'console',
		'html':		'Debug'
	}).on('click', function(){
		debug.init().toggleClass('on')
	}) )

debug.init = function(){
	if( debug.container )
		return debug.container

	debug.container = $('<div class="debug"/>').appendTo(_frame.dom.main)
		.append($('<style/>').html(`
.debug{
	position:	absolute;
	top:		0;
	right:		0;
	bottom:		0;
	left:		0;
	z-index:	50;
	display:	none;
	background:	rgba(0,0,0,.85);
	padding:	20px 40px;
	overflow:	auto;
}
.debug.on{
	display:	block;
}
.debug h3 ~ h3{
	margin-top:	2em;
}
.debug button[type="button"]{
	display:	inline-block;
	padding:	0 .35em;
	border:		1px solid rgba(255,255,255,.35);
	background:	rgba(255,255,255,.25);
}
.debug .divider{
	display:	inline-block;
	width:		1px;
	height:		1.25em;
	vertical-align: middle;
	margin:		0 10px;
	background:	rgba(255,255,255,.25);
}
.debug .icons{
	overflow:	hidden;
}
.debug .icons dl{
	display:	inline-block;
	margin:		0 10px 10px 0;
	padding:	0 0 0 40px;
	float:		left;
	width:		175px;
	height:		45px;
	position:	relative;
}
.debug .icons dl dt:before{
	display:	block;
	position:	absolute;
	width:		32px;
	line-height:40px;
	padding:	0;
	font-size:	32px;
	top:		0;
	left:		0;
	text-align:	center;
}
.debug .icons dl dd{
	margin:		0;
	padding:	0;
	font-size:	12px;
	position:	absolute;
	top:		50%;
	transform:	translateY(-50%);
}
.debug textarea{
	background:	#000;
}
`))

	// updater progress indicator
		function updaterToggle(){
			if( !_updater.indicatorEl )
				_updater.indicator()
			_updater.indicatorEl.toggleClass('on')
		}
		function updaterSet(percentage){
			_updater.indicator( percentage / 100 )
		}
		function updaterToggle_Complete(){
			_updater.indicator( 1 )
		}
		debug.container
			.append($('<h3/>',{
				'html': 	'Updater Progress Indicator'
			}))
			.append($('<p/>')
				.append( $('<button/>',{
					'type':	'button',
					'html':	'Show/Hide'
				}).on('click', updaterToggle) )
				.append( $('<span/>',{
					'class':'divider'
				}) )
				.append( $('<span/>',{
					'html':	'Set percentage'
				}) )
				.append( $('<button/>',{
					'type':	'button',
					'html':	'0%'
				}).on('click', function(){updaterSet(0)}) )
				.append( $('<button/>',{
					'type':	'button',
					'html':	'25%'
				}).on('click', function(){updaterSet(25)}) )
				.append( $('<button/>',{
					'type':	'button',
					'html':	'50%'
				}).on('click', function(){updaterSet(50)}) )
				.append( $('<button/>',{
					'type':	'button',
					'html':	'98%'
				}).on('click', function(){updaterSet(98)}) )
				.append( $('<button/>',{
					'type':	'button',
					'html':	'100%'
				}).on('click', function(){updaterSet(100)}) )
				/*
				.append( $('<span/>',{
					'class':'divider'
				}) )
				.append( $('<button/>',{
					'type':	'button',
					'html':	'Toggle Complete'
				}).on('click', updaterToggle_Complete) )
				*/
			)

	// Icons
		debug.container
			.append($('<h3/>',{
				'html': 	'Icons'
			}))
			.append(
				debug._icons = $('<div class="icons"/>')
			)
		/*
		node.fs.readFile(node.path.join(_g.root, 'source', 'less-app', 'icons.less'), 'utf8', function(err, data){
			if( err || !data )
				return
			data = data.replace(/^\s*[\r\n]/gm, '')

			let searchRes
				,scrapePtrn = /\@iconcode\-([a-zA-Z0-9-_]+):[\t]*\"([^\"]+)\";/gi
				while( (searchRes = scrapePtrn.exec(data)) !== null ){
					try{
						if( searchRes && searchRes.length > 1 ){
							//console.log( searchRes[1], searchRes[2] )
							//$(`<dl><dt icon=${searchRes[1]}>${searchRes[1]}</dt><dd>${searchRes[2]}</dd></dl>`).appendTo(debug._icons)
							$(`<dl><dt icon=${searchRes[1]}></dt><dd>${searchRes[1]}</dd></dl>`).appendTo(debug._icons)
						}
					}catch(e){}
				}
		})
		*/
		let data = node.fs.readFileSync(node.path.join(_g.root, 'source', 'less-app', 'icons.less'), 'utf8')
			data = data.replace(/^\s*[\r\n]/gm, '')

			let searchRes
				,scrapePtrn = /\@iconcode\-([a-zA-Z0-9-_]+):[\t]*\"([^\"]+)\";/gi
				while( (searchRes = scrapePtrn.exec(data)) !== null ){
					try{
						if( searchRes && searchRes.length > 1 ){
							$(`<dl><dt icon=${searchRes[1]}></dt><dd>@iconcode-${searchRes[1]}</dd></dl>`).appendTo(debug._icons)
						}
					}catch(e){}
				}

	// Output Release Notes
		Q.fcall(function(){
			let deferred = Q.defer()
			function releaseNotesGet( _id ){
				let deferred = Q.defer()
				_db.updates.find({'_id':_id}).exec(function(err, docs){
					let content = '';
					if( docs && docs.length ){
						content+= docs[0].journal
					}
					deferred.resolve(content);
				})
				return deferred.promise
			}
			function releaseNotesToGitHub(){
				Q.fcall(function(){
					return releaseNotesGet( debug._releasenotesselect.val() )
				})
				.then(function(content){
					let searchRes
						,scrapePtrn = /\[\[([^\:]+)\:([0-9]+)(\:TEXT)?\]\]/gi
						,result = content
					while( (searchRes = scrapePtrn.exec(content)) !== null ){
						try{
							result = result.replace( searchRes[0], '`' + _tmpl['textlink_'+searchRes[1].toLowerCase()](searchRes[2], null, false).text() + '`' )
						}catch(e){
                            try{
                                result = result.replace( searchRes[0], '`' + _tmpl['link_'+searchRes[1].toLowerCase()](searchRes[2], null, false).text() + '`' )
                            }catch(e){}
                        }
					}
					debug._releasenotesresult.html(result)
				})
			}
			function releaseNotesToNGA(){
				Q.fcall(function(){
					return releaseNotesGet( debug._releasenotesselect.val() )
				})
				.then(function(content){
					let searchRes
						,scrapePtrn = /\[\[([^\:]+)\:([0-9]+)(\:TEXT)?\]\]/gi
						,result = markdown.toHTML( content )
					while( (searchRes = scrapePtrn.exec(content)) !== null ){
                        var t = searchRes[1].toLowerCase()
                        switch(t){
                            case 'ship':		t = 'ships';		break;
                            case 'equipment':	t = 'equipments';	break;
                            case 'entity':		t = 'entities';		break;
                        }
						try{
							result = result.replace( searchRes[0],
								'[url=http://fleet.moe/'+t+'/'+searchRes[2]+']'
								+ _tmpl['textlink_'+searchRes[1].toLowerCase()](searchRes[2], null, false).text()
								+ '[/url]'
							)
						}catch(e){
                            try{
                                result = result.replace( searchRes[0],
                                    '[url=http://fleet.moe/'+t+'/'+searchRes[2]+']'
                                    + _tmpl['link_'+searchRes[1].toLowerCase()](searchRes[2], null, false).text()
                                    + '[/url]'
                                )
                            }catch(e){}
                        }
					}
					content = result
					searchRes = null
					scrapePtrn = /\<p\>\<strong\>([^\<]+)\<\/strong\>\<\/p\>/gi
					while( (searchRes = scrapePtrn.exec(content)) !== null ){
						try{
							result = result.replace( searchRes[0], '[b]' + searchRes[1] + '[/b]' )
						}catch(e){}
					}
					content = result
					searchRes = null
					scrapePtrn = /\<li\>/gi
					while( (searchRes = scrapePtrn.exec(content)) !== null ){
						try{
							result = result.replace( searchRes[0], '[*]' )
						}catch(e){}
					}
					content = result
					searchRes = null
					scrapePtrn = /\<\/li\>/gi
					while( (searchRes = scrapePtrn.exec(content)) !== null ){
						try{
							result = result.replace( searchRes[0], '' )
						}catch(e){}
					}
					content = result
					searchRes = null
					scrapePtrn = /\<ul\>/gi
					while( (searchRes = scrapePtrn.exec(content)) !== null ){
						try{
							result = result.replace( searchRes[0], '[list]' )
						}catch(e){}
					}
					content = result
					searchRes = null
					scrapePtrn = /\<\/ul\>/gi
					while( (searchRes = scrapePtrn.exec(content)) !== null ){
						try{
							result = result.replace( searchRes[0], '[/list]' )
						}catch(e){}
					}
					debug._releasenotesresult.html(result)
				})
			}
			debug.container
				.append($('<h3/>',{
					'html': 	'Output Release Notes'
				}))
				.append(
					$('<p/>')
						.append(
							debug._releasenotesselect = $('<select/>')
						)
						.append( $('<span/>',{
							'class':'divider'
						}) )
						.append( $('<span/>',{
							'html':	'Target'
						}) )
						.append( $('<button/>',{
							'type':	'button',
							'html':	'GitHub'
						}).on('click', releaseNotesToGitHub) )
						.append( $('<button/>',{
							'type':	'button',
							'html':	'NGA'
						}).on('click', releaseNotesToNGA) )
				).append(
					$('<p/>')
						.append(
							debug._releasenotesresult = $('<textarea/>')
						)
				)
			_db.updates.find({$not:{'date':""}}).sort({'date': -1, 'version': -1}).exec(function(err, docs){
				docs.forEach(function(doc){
					$('<option/>',{
						'value':	doc._id,
						'html':		(doc.type != 'app' ? '['+doc.type+'] ' : '') + doc.version
					}).appendTo(debug._releasenotesselect)
				})
				deferred.resolve();
			})
			
			return deferred.promise
		})
	
	return debug.container
}

return debug

})({});
