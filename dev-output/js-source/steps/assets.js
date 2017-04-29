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
                        node.path.join( _g.root, '!design', 'iconfont', 'fonts', filename ),
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