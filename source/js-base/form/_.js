/*************************************************
* Library for form sections creation
**************************************************
*
* Default behavior for forms
*
* Each section/line is a DL
* <DL>
* 	<DT>
* 	<DD>
*
**************************************************
*/

var _form = {}

_form.section = function(type, name, label, value, suffix, options){
	if( !type )
		return false

	if( typeof type == 'object' )
		return _form.section(type['type'], type['name'] || null, type['label'] || null, type['value'] || null, type['suffix'] || null, type)

	if( typeof name == 'object' )
		return _form.section(type, name, name['label'] || null, name['value'] || null, name['suffix'] || null, name)

	if( typeof label == 'object' )
		return _form.section(type, name, label['label'] || null, label['value'] || null, label['suffix'] || null, label)

	if( typeof value == 'object' )
		return _form.section(type, name, id, value['value'] || null, value['suffix'] || null, value)

	if( typeof suffix == 'object' )
		return _form.section(type, name, id, value || null, suffix['suffix'] || null, suffix)

	options = options || {}

	var line = $('<dl/>').addClass(type, options.className)
		,title = $('<dt/>').appendTo(line)
		,cont = $('<dd/>').appendTo(line)
		,id = '_input_g' + _g.inputIndex
	_g.inputIndex++

	switch( type ){
		case 'directory':
			$('<label/>').html( label ).appendTo(title)
			break;
		default:
			if( suffix ){
				$('<label/>').html( label ).appendTo(title)
			}else{
				$('<label for="'+id+'"/>').html( label ).appendTo(title)
			}
			break;
	}

	_form.element(type, name, id, value, options).appendTo(cont)

	if( suffix )
		$('<label for="'+id+'"/>').html(suffix).appendTo(cont)

	if( options.add )
		cont.append( options.add )

	return cont
}
_form.line = _form.section

_form.element = function(type, name, id, value, options){
	if( !type )
		return false

	if( typeof type == 'object' )
		return _form.element(type['type'], type['name'] || null, type['id'] || null, type['value'] || null, type)

	if( typeof name == 'object' )
		return _form.element(type, name, name['id'] || null, name['value'] || null, name)

	if( typeof id == 'object' )
		return _form.element(type, name, id['id'] || null, id['value'] || null, id)

	if( typeof value == 'object' )
		return _form.element(type, name, id, value['value'] || null, value)

	options = options || {}
	id = id || null

	if( id === null ){
		id = '_input_g' + _g.inputIndex
		_g.inputIndex++
	}

	var element = $()
		,defaultValue = options['default'] || options['defaultValue']

	switch( type ){
		default:
			element = $('<input/>',{
					'type': 	type,
					'name': 	name,
					'id': 		id
				}).val(value)
			break;
		case 'select':
			element = $('<select/>',{
					'name': 	name,
					'id': 		id
				}).val(value)
			var optionEmpty = $('<option value=""/>').appendTo( element )
			for( var i in value ){
				if( typeof value[i] == 'object' ){
					var v = value[i]['value'] || value[i].val
						,o_el = $('<option value="' + v + '"/>')
							.html(value[i]['title'] || value[i]['name'])
							.appendTo( element )
				}else{
					var v = value[i]
						,o_el = $('<option value="' + v + '"/>')
							.html(v)
							.appendTo( element )
				}
				if( typeof defaultValue != 'undefined' && v == defaultValue ){
					o_el.prop('selected', true)
				}
				if( !o_el.val() ){
					o_el.attr('disabled', true)
				}
			}
			if( !value || !value.length ){
				optionEmpty.html('...')
			}
			if( options['new'] ){
				$('<option value="" disabled/>').html('==========').insertAfter( optionEmpty )
				$('<option value="___new___"/>').html('+ 新建').insertAfter( optionEmpty )
				element.on('change.___new___', function(){
					if( element.val() == '___new___' ){
						element.val('')
						options['new']( element )
					}
				})
			}
			break;
		case 'select_group':
		case 'selectGroup':
			element = $('<select/>',{
					'name': 	name,
					'id': 		id
				}).val(value)
			var optionEmpty = $('<option value=""/>').appendTo( element )
			for( var i in value ){
				var group = $('<optgroup label="'+value[i][0]+'"/>').appendTo( element )
				for( var j in value[i][1] ){
					var _v = value[i][1][j]
					if( typeof _v == 'object' ){
						var o_el = $('<option value="' + (typeof _v.val == 'undefined' ? _v['value'] : _v.val) + '"/>')
							.html(_v['title'] || _v['name'])
							.appendTo( group )
					}else{
						var o_el = $('<option value="' + _v + '"/>')
							.html(_v)
							.appendTo( group )
					}
					if( typeof defaultValue != 'undefined' && o_el.val() == defaultValue ){
						o_el.prop('selected', true)
					}
					if( !o_el.val() ){
						o_el.attr('disabled', true)
					}
				}
			}
			if( !value || !value.length ){
				optionEmpty.html('...')
			}
			if( options['new'] ){
				$('<option value="" disabled/>').html('==========').insertAfter( optionEmpty )
				$('<option value="___new___"/>').html('+ 新建').insertAfter( optionEmpty )
				element.on('change.___new___', function(){
					if( element.val() == '___new___' ){
						element.val('')
						options['new']( element )
					}
				})
			}
			break;
		case 'checkbox':
			element = $('<input/>',{
					'type': 	type,
					'name': 	name,
					'id': 		id
				})

			if( typeof value == 'string' && value.toLowerCase() !== 'true' ){
				element.val(value).prop('checked', options['checked'])
			}else{
				element.prop('checked', typeof options['checked'] == 'undefined' ? value : options['checked'])
			}
			break;
		case 'checkboxes':
			for( var i in value ){
				var v = value[i]
				if( typeof v != 'object' )
					v = [v, false]

				if( parseInt(i) ){
					_g.inputIndex++
					id = '_input_g' + _g.inputIndex
				}

				element = element.add(
							$('<input type="checkbox" name="'+name+'" id="'+id+'" value="'+v[0]+'" />').prop('checked', v[1])
						).add(
							$('<label for="'+id+'"/>').html(v[2] || v[0])
						)
			}
			break;
		case 'directory':
		case 'file':
			element = $('<input type="text" name="'+name+'" id="'+id+'" />')
								.on({
									'input': function(){
										element.trigger('change')
									},
									'click': function(){
										if( !element.val() )
											button.trigger('click')
									}
								}).val(value)
			var fileinput 	= $('<input type="file" class="none"' +(type == 'directory' ? ' nwdirectory' : '')+ ' />')
								.on('change', function(){
									element.val( $(this).val() ).trigger('change')
								})
				,button 	= $('<button type="button" value="Browse..."/>').html('Browse...')
								.on('click', function(){
									//console.log(123)
									//if( type == 'file' )
										fileinput.trigger('click')
								})
			var elementAll	= element.add(fileinput).add(button)
			if( options['accept'] )
				fileinput.attr('accept', options['accept'])
			break;
	}

	if( options.required )
		element.prop('required', true)

	if( options.onchange ){
		element.on('change.___onchange___', options.onchange )
		if( options['default'] )
			element.trigger('change')
	}

	if( elementAll )
		return elementAll

	return element
}