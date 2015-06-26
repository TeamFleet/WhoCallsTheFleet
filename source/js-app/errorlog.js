// 
_g.error = function( err ){
	_g.log(err)

	node.fs.appendFileSync(
		node.path.join(_g.execPath, 'errorlog.txt'),
		new Date()
		+ "\r\n"
		+ ( (err instanceof Error)
			? err.message || ''
			: err
		)
		+ "\r\n"
		+ "\r\n"
		+ "========================================"
		+ "\r\n"
		+ "\r\n"
	)
}
