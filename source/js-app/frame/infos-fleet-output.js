// 舰队配置 - OUTPUT
	_frame.infos.__fleet__OUTPUT = function( id ){
		return $('<div class="infos-fleet loading"/>')
			.append(
				$('<div class="loading-msg"/>').html('Loading...')
			)
	}