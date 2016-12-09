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