"use strict";

var root = '../';
var rootSource = '../source';
var rootOutput = '../dev-output';

// Include gulp
var gulp = require('gulp'); 

var fs = require('fs');
var path = require('path');

// Include Plugins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
//var minifyCSS = require('gulp-minify-css');
var nano = require('gulp-cssnano');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var LessPluginCleanCSS = require('less-plugin-clean-css');
var cleanCSSPlugin = new LessPluginCleanCSS({advanced: true});
var babel = require('gulp-babel');
var rename = require('gulp-rename');
var notify = require("gulp-notify");
var watchLess = require('gulp-watch-less2');

function parseKoalaJS(){
	var filename = Array.prototype.pop.call(arguments);
	var dir = Array.prototype.join.call(arguments, '/');
	return fs.readFileSync( path.join( dir, filename ), 'utf-8')
				.replace(/\r?\n|\r/g, '')
				.split('// @koala-prepend ')
				.filter(function(value){
					return value
				})
				.map(function(value){
					if( value )
						return path.join(dir, value.replace(/^\"(.+)\"$/g, '$1') )
				});
};


gulp.task('WhoCallsTheFleet-js-base', function(){
	return gulp.src(parseKoalaJS( rootSource, 'js-base.js' ))
		.pipe(concat('js-base.js'))
		.pipe(uglify())
		/*
		.pipe(babel({
			'highlightCode':	false,
			'comments':			false,
			'compact':			false,
			'ast':				false,
			"presets": 			[
					"es2015",
					"stage-0"
				],
			"plugins":			[
					"transform-minify-booleans"
				]
		}))
		*/
		.pipe(gulp.dest( path.join( root, 'app', 'assets' ) ));
});

gulp.task('WhoCallsTheFleet-js-app', function(){
	return gulp.src(parseKoalaJS( rootSource, 'js-app.js' ))
		.pipe(concat('js-app.js'))
		/*
		.pipe(babel({
			'highlightCode':	false,
			'comments':			false,
			'compact':			false,
			'ast':				false,
			"presets": 			[
					"es2015",
					"stage-0"
				],
			"plugins":			[
					"transform-minify-booleans"
				]
		}))
		*/
		//.pipe(uglify())
		.pipe(gulp.dest( path.join( root, 'app', 'assets' ) ));
});

gulp.task('WhoCallsTheFleet-js-output', function(){
	return gulp.src(parseKoalaJS( rootOutput, 'js-source', 'output.js' ))
		.pipe(concat('output.js'))
		//.pipe(uglify())
		.pipe(gulp.dest( path.join( rootOutput, 'js-output' ) ));
});

gulp.task('WhoCallsTheFleet-Web-js', function(){
	return gulp.src(parseKoalaJS( rootOutput, 'assets-source', 'js.js' ))
		.pipe(concat('js.js'))
		.pipe(babel({
			'highlightCode':	false,
			'comments':			false,
			'compact':			false,
			'ast':				false,
			"presets": 			[
					"es2015",
					"stage-0"
				],
			"plugins":			[
					"transform-minify-booleans"
				]
		}))
		.pipe(gulp.dest( path.join( rootOutput, 'assets-output' ) ))
		.pipe(uglify())
		.pipe(rename({ extname: '.min.js' }))
		.pipe(gulp.dest( path.join( rootOutput, 'assets-output' ) ));
});

gulp.task('WhoCallsTheFleet-Web-js-libs', function(){
	return gulp.src(parseKoalaJS( rootOutput, 'assets-source', 'libs.js' ))
		.pipe(concat('libs.js'))
		.pipe(gulp.dest( path.join( rootOutput, 'assets-output' ) ))
		.pipe(uglify())
		.pipe(rename({ extname: '.min.js' }))
		.pipe(gulp.dest( path.join( rootOutput, 'assets-output' ) ));
});

gulp.task('WhoCallsTheFleet-Web-js-lib-canvas', function(){
	return gulp.src(parseKoalaJS( rootOutput, 'assets-source', 'lib.canvas.js' ))
		.pipe(concat('lib.canvas.js'))
		.pipe(gulp.dest( path.join( rootOutput, 'assets-output' ) ))
		.pipe(uglify())
		.pipe(rename({ extname: '.min.js' }))
		.pipe(gulp.dest( path.join( rootOutput, 'assets-output' ) ));
});

gulp.task('WhoCallsTheFleet-css-app', function(){
    let f = path.join( rootSource, 'css-app.less' );
	return gulp.src(f)
        .pipe(watchLess(f, {verbose: true}, function(){
            lessCompile(f, path.join( root, 'app', 'assets' ), {
                onlyMinify: true,
                nano: {
                    autoprefixer: {
                        browsers: ['Chrome >= 41'],
                        add: true
                    }
                }
            })
        }))
    /*
	return gulp.src( path.join( rootSource, 'css-app.less' ) )
		.pipe(less())
		//.pipe(less({
		//	'plugins':	[cleanCSSPlugin]
		//}))
		.pipe(postcss([
			autoprefixer({browsers: ['Chrome >= 41']})
		]))
		.pipe(nano({
			//safe: 	true
		}))
		.pipe(gulp.dest( path.join( root, 'app', 'assets' ) ));
    */
});

gulp.task('WhoCallsTheFleet-css-base', function(){
    let f = path.join( rootSource, 'css-base.less' );
	return gulp.src(f)
        .pipe(watchLess(f, {verbose: true}, function(){
            lessCompile(f, path.join( root, 'app', 'assets' ), {
                onlyMinify: true
            })
        }))
    /*
	return gulp.src( path.join( rootSource, 'css-base.less' ) )
		.pipe(less())
		.pipe(nano())
		//.pipe(postcss([
		//	autoprefixer()
		//]))
		.pipe(gulp.dest( path.join( root, 'app', 'assets' ) ));
    */
});

gulp.task('WhoCallsTheFleet-Web-css', function(){
    let f = path.join( rootOutput, 'assets-source', 'css.less' );
	return gulp.src(f)
        .pipe(watchLess(f, {verbose: true}, function(){
            lessCompile(f, path.join( rootOutput, 'assets-output' ), {
                nano: {
                    autoprefixer: {
                        'browsers': [
                            'Android >= 2',
                            'Chrome >= 20',
                            'Firefox >= 20',
                            'ie >= 11',
                            'Edge >= 12',
                            'iOS >= 5',
                            'ChromeAndroid >= 20',
                            'ExplorerMobile >= 11'
                        ],
                        add: true
                    }
                }
            })
        }))
    /*
	return gulp.src( path.join( rootOutput, 'assets-source', 'css.less' ) )
		.pipe(less())
		.pipe(postcss([
			autoprefixer()
		]))
		.pipe(gulp.dest( path.join( rootOutput, 'assets-output' ) ))
		//.pipe(nano())
		.pipe(nano({
			//safe: 	true
		}))
		.pipe(rename({ extname: '.min.css' }))
		.pipe(gulp.dest( path.join( rootOutput, 'assets-output' ) ));
    */
});

function lessCompile( file, outputPath, options ){
    options = options || {}
    
    function log(){
        console.log(`Compiled LESS ${file}`)
    }
    
    if( options.onlyMinify ){
        return gulp.src(file)
            .pipe(less())
            .pipe(nano( options.nano ))
            .pipe(gulp.dest( outputPath ))   
            .on('end', log)
            .on('error', log);     
    }else{
        return gulp.src(file)
            .pipe(less())
            /*
            .pipe(postcss([
                autoprefixer({
                    'browsers': [
                        'Android >= 2',
                        'Chrome >= 20',
                        'Firefox >= 20',
                        'ie >= 11',
                        'Edge >= 12',
                        'iOS >= 5',
                        'ChromeAndroid >= 20',
                        'ExplorerMobile >= 11'
                    ]
                })
            ]))
            */
            .pipe(gulp.dest( outputPath ))
            .pipe(nano( options.nano ))
            .pipe(rename({ extname: '.min.css' }))
            .pipe(gulp.dest( outputPath ))
            .on('end', log)
            .on('error', log);
    }
}

gulp.task('WhoCallsTheFleet-watch', function(){
	gulp.watch(
			path.join( rootSource, 'js-app', '**/*.js' ),
			['WhoCallsTheFleet-js-app', 'WhoCallsTheFleet-Web-js']
		);
	gulp.watch(
			path.join( rootSource, 'KanColle-JS-Kit', '**/*.js' ),
			['WhoCallsTheFleet-js-app', 'WhoCallsTheFleet-Web-js']
		);
	gulp.watch(
			path.join( rootSource, 'nw.js-base-framework', '**/*.js' ),
			['WhoCallsTheFleet-js-base', 'WhoCallsTheFleet-js-app', 'WhoCallsTheFleet-Web-js']
		);
	gulp.watch(
			path.join( rootSource, 'libs', '**/*.js' ),
			['WhoCallsTheFleet-js-app', 'WhoCallsTheFleet-Web-js-libs']
		);
	gulp.watch(
			path.join( rootSource, 'js-app', 'canvas', '**/*.js' ),
			['WhoCallsTheFleet-Web-js-lib-canvas']
		);
	//gulp.watch(
	//		path.join( rootSource, '**/*.js' ),
	//		['WhoCallsTheFleet-js-base', 'WhoCallsTheFleet-js-app', 'WhoCallsTheFleet-Web-js', 'WhoCallsTheFleet-Web-js-libs']
	//	);
	gulp.watch(
			path.join( rootOutput, 'js-source', '**/*.js' ),
			['WhoCallsTheFleet-js-output']
		);
	//gulp.watch(
	//		path.join( rootSource, '**/*.less' ),
	//		['WhoCallsTheFleet-css-app', 'WhoCallsTheFleet-css-base', 'WhoCallsTheFleet-Web-css']
	//	);
});

gulp.task('default',[
	'WhoCallsTheFleet-js-base',
	'WhoCallsTheFleet-js-app',
	'WhoCallsTheFleet-js-output',
	'WhoCallsTheFleet-Web-js',
	'WhoCallsTheFleet-Web-js-libs',
	'WhoCallsTheFleet-Web-js-lib-canvas',
	'WhoCallsTheFleet-css-base',
	'WhoCallsTheFleet-css-app',
	'WhoCallsTheFleet-Web-css',
	'WhoCallsTheFleet-watch'
]);