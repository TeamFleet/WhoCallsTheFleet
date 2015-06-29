//
_g.error = function( err ){
	if( !(err instanceof Error) )
		err = new Error(err)

	_g.log(err)

	node.fs.appendFileSync(
		node.path.join(_g.execPath, 'errorlog.txt'),
		new Date()
		+ "\r\n"
		+ err.message
		+ "\r\n"
		+ "\r\n"
		+ "========================================"
		+ "\r\n"
		+ "\r\n"
	)

	throw err
}
