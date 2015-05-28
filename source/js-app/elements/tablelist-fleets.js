	_tablelist.prototype._fleets_columns = [
		'  ',
		['创建者',	'user'],
		['修改时间','edit'],
		['评价',	'rating'],
		['',		'options']
	]



// 检查并读取已保存数据
	_tablelist.prototype._fleets_loaddata = function(){

	}



// 检测数据，如果没有，标记样式
	_tablelist.prototype._fleets_datacheck = function(obj){

	}



// 创建全部数据行内容
	_tablelist.prototype._fleets_append_all_items = function(){

	}



// [按钮操作] 新建/导入配置
	_tablelist.prototype._fleets_btn_new = function(){
		_g.log('CLICK: 新建/导入配置')
	}



// [按钮操作] 选项设置
	_tablelist.prototype._fleets_btn_settings = function(){
		_g.log('CLICK: 选项设置')
	}



// 初始化函数
	_tablelist.prototype._fleets_init = function(){
		var self = this
			,promise_chain 	= Q.fcall(function(){})

		// 标记全局载入状态
			_frame.app_main.loading.push('tablelist_'+this._index)
			_frame.app_main.is_loaded = false

		// [创建] 过滤器与选项
			this.dom.filter_container = $('<div class="options" viewtype="card"/>').appendTo( this.dom.container )
			this.dom.filters = $('<div class="filters"/>').appendTo( this.dom.filter_container )
			// 左 - 新建
				this.dom.btn_new = $('<button class="new" icon="import"/>')
									.on('click',function(){
										self._fleets_btn_new()
									})
									.appendTo(self.dom.filters)
			// 右 - 选项组
				this.dom.option_group = $('<div class="option_group"/>').appendTo(self.dom.filters)
				this.dom.option_btn_settings = $('<button icon="cog"/>')
									.on('click',function(){
										self._fleets_btn_settings()
									})
									.appendTo(self.dom.option_group)

		// [创建] 表格框架
			this.dom.table_container = $('<div class="fixed-table-container"/>').appendTo( this.dom.container )
			this.dom.table_container_inner = $('<div class="fixed-table-container-inner"/>').appendTo( this.dom.table_container )
			this.dom.table = $('<table class="fleets hashover hashover-column"/>').appendTo( this.dom.table_container_inner )
			function gen_thead(arr){
				self.dom.thead = $('<thead/>')
				var tr = $('<tr/>').appendTo(self.dom.thead)
				for(var i in arr){
					if( typeof arr[i] == 'object' ){
						$('<td data-stat="' + arr[i][1] + '"/>')
							.html('<div class="th-inner-wrapper"><span><span>'+arr[i][0]+'</span></span></div>').appendTo(tr)
					}else{
						$('<th/>').html('<div class="th-inner-wrapper"><span><span>'+arr[i][0]+'</span></span></div>').appendTo(tr)
					}
				}
				return self.dom.thead
			}
			gen_thead( self._fleets_columns ).appendTo( this.dom.table )
			this.dom.tbody = $('<tbody/>').appendTo( this.dom.table )

		// [创建] 无内容时的新建提示框架

			promise_chain
		// 检查并读取已保存数据
			.then( self._fleets_loaddata )

		// 如果没有数据，标记状态
			.then( self._fleets_datacheck )

		// [创建] 数据行
			.then( self._fleets_append_all_items )

		// [框架] 标记读取完成
			.then(function(){
				setTimeout(function(){
					_frame.app_main.loaded('tablelist_'+self._index, true)
				}, 100)
			})
	}
