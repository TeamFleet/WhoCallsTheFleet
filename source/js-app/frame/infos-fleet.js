// 舰队配置
	_frame.infos.__fleet = function( id ){
		var dom = $('<div class="fleet loading"/>')

		// 根据取得的数据，初始化内容
			function init_infos( d ){
				if( !d )
					return false

				dom.attr('data-fleetid', d._id)
					.data('fleet', d)
					.removeClass('loading')

				if( d.theme )
					_frame.infos.dom.main.attr('data-theme', d.theme)
			}

		// 每个操作都会更新数据，并触发更新数据库倒计时

		// 更新数据库

		if( id == '__NEW__' ){
			_db.fleets.insert(_tablelist.prototype._fleets_new_data(), function(err, newDoc){
				if(err){
					_g.error(err)
				}else{
					if( _frame.infos.curContent == 'fleet::__NEW__' )
						init_infos(newDoc)
				}
			})
		}else{
			_db.fleets.find({
				'_id': 		id
			}, function(err, docs){
				if(err || !docs){
					_g.error(err)
				}else{
					if( _frame.infos.curContent == 'fleet::' + id )
						init_infos(docs[i])
				}
			})
		}

		return dom
	}
