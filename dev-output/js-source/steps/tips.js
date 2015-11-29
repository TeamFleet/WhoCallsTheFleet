
dev_output_steps.push(function(){
	if( dev_output_only_assets )
		return
		
	let masterDeferred = Q.defer()

	// 
		,masterChain = Q.fcall(function(){
			return dev_output_log('开始处理: TIP')
		})
	
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
						switch(stat){
							case 'range':
								return '<span>射程: ' + _g.getStatRange( d['stat'][stat] ) + '</span>';
								break;
							default:
								var val = parseInt( d['stat'][stat] )
								return '<span>' + ( val > 0 ? '+' : '') + val + ' ' + title + '</span>'
								break;
						}
					}else{
						return ''
					}
				}
			
				var item_icon = 'http://fleet.diablohu.com/!/assets/images/itemicon/'
									+ d.getIconId()
									+ '.png'
					,item_name = d.getName(l)
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
