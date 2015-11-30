
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
							+ '<img src=\\"http://fleet.diablohu.com/!/pics/ships/'+d.id+'/2.jpg\\" width=\\"218\\" height=\\"300\\"/>'
							+ '<h3>' + d.getNameNoSuffix(l) + '<small>' + d.getSuffix(l) + '</small></h3>'
							+ '<h4>'
								+ ( d['class'] ? _g['data']['ship_classes'][d['class']]['name_zh'] + '级' : '' )
								+ ( d['class_no'] ? '<i>' + d['class_no'] + '</i>号舰' : '' )
								+ ( d['type'] ? '<b>/</b>' + _g['data']['ship_types'][d['type']]['full_zh'] : '' )
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
