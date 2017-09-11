"use strict";

const rootRequire = function (name) {
    try {
        return require(name);
    } catch (e) {
        return require('../node_modules/' + name);
    }
}

const root = '../';
const rootSource = '../source';
const rootOutput = '../dev-output';

const fs = rootRequire('fs');
const path = rootRequire('path');

// Include gulp
const gulp = rootRequire('gulp');

// Include Plugins
const concat = rootRequire('gulp-concat');
const uglify = rootRequire('gulp-uglify');
const less = rootRequire('gulp-less');
//const minifyCSS = rootRequire('gulp-minify-css');
const nano = rootRequire('gulp-cssnano');
const postcss = rootRequire('gulp-postcss');
const autoprefixer = rootRequire('autoprefixer');
const LessPluginCleanCSS = rootRequire('less-plugin-clean-css');
const cleanCSSPlugin = new LessPluginCleanCSS({ advanced: true });
const babel = rootRequire('gulp-babel');
const rename = rootRequire('gulp-rename');
const notify = rootRequire("gulp-notify");
const watchLess = rootRequire('gulp-watch-less2');

function parseKoalaJS() {
    let filename = Array.prototype.pop.call(arguments);
    let dir = Array.prototype.join.call(arguments, '/');
    return fs.readFileSync(path.join(dir, filename), 'utf-8')
        .replace(/\r?\n|\r/g, '')
        .split('// @koala-prepend ')
        .filter(function (value) {
            return value
        })
        .map(function (value) {
            if (value)
                return path.join(dir, value.replace(/^"(.+)"$/g, '$1'))
        });
}


gulp.task('js-base', function () {
    return gulp.src(parseKoalaJS(rootSource, 'js-base.js'))
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
        .pipe(gulp.dest(path.join(root, 'app', 'assets')));
});

gulp.task('js-app', function () {
    return gulp.src(parseKoalaJS(rootSource, 'js-app.js'))
        .pipe(concat('js-app.js'))
        .pipe(babel({
            'highlightCode': false,
            'comments': false,
            'compact': false,
            'ast': false,
            "presets": [
                rootRequire('babel-preset-latest')
            ],
            "plugins": [
                require("babel-plugin-transform-minify-booleans")
            ]
        }))
        //.pipe(uglify())
        .pipe(gulp.dest(path.join(root, 'app', 'assets')));
});

gulp.task('js-output', function () {
    return gulp.src(parseKoalaJS(rootOutput, 'js-source', 'output.js'))
        .pipe(concat('output.js'))
        //.pipe(uglify())
        .pipe(gulp.dest(path.join(rootOutput, 'js-output')));
});

gulp.task('Web-js', function () {
    return gulp.src(parseKoalaJS(rootOutput, 'assets-source', 'js.js'))
        .pipe(concat('js.js'))
        .pipe(babel({
            'highlightCode': false,
            'comments': false,
            'compact': false,
            'ast': false,
            "presets": [
                rootRequire('babel-preset-latest')//,
                //"stage-0"
            ],
            "plugins": [
                require("babel-plugin-transform-minify-booleans")
            ]
        }))
        .pipe(gulp.dest(path.join(rootOutput, 'assets-output')))
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest(path.join(rootOutput, 'assets-output')));
});

gulp.task('Web-js-libs', function () {
    return gulp.src(parseKoalaJS(rootOutput, 'assets-source', 'libs.js'))
        .pipe(concat('libs.js'))
        .pipe(gulp.dest(path.join(rootOutput, 'assets-output')))
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest(path.join(rootOutput, 'assets-output')));
});

gulp.task('Web-js-lib-canvas', function () {
    return gulp.src(parseKoalaJS(rootOutput, 'assets-source', 'lib.canvas.js'))
        .pipe(concat('lib.canvas.js'))
        .pipe(gulp.dest(path.join(rootOutput, 'assets-output')))
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest(path.join(rootOutput, 'assets-output')));
});

gulp.task('css-app', function () {
    let f = path.join(rootSource, 'css-app.less');
    return gulp.src(f)
        .pipe(watchLess(f, { verbose: true }, function () {
            lessCompile(f, path.join(root, 'app', 'assets'), {
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

gulp.task('css-base', function () {
    let f = path.join(rootSource, 'css-base.less');
    return gulp.src(f)
        .pipe(watchLess(f, { verbose: true }, function () {
            lessCompile(f, path.join(root, 'app', 'assets'), {
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

gulp.task('Web-css', function () {
    let f = path.join(rootOutput, 'assets-source', 'css.less');
    return gulp.src(f)
        .pipe(watchLess(f, { verbose: true }, function () {
            lessCompile(f, path.join(rootOutput, 'assets-output'), {
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

function lessCompile(file, outputPath, options) {
    options = options || {}

    function log() {
        console.log(`Compiled LESS ${file}`)
    }

    if (options.onlyMinify) {
        return gulp.src(file)
            .pipe(less())
            .pipe(nano(options.nano))
            .pipe(gulp.dest(outputPath))
            .on('end', log)
            .on('error', log);
    } else {
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
            .pipe(gulp.dest(outputPath))
            .pipe(nano(options.nano))
            .pipe(rename({ extname: '.min.css' }))
            .pipe(gulp.dest(outputPath))
            .on('end', log)
            .on('error', log);
    }
}

gulp.task('watch', function () {
    gulp.watch(
        path.join(rootSource, 'js-app', '**/*.js'),
        ['js-app', 'Web-js']
    );
    gulp.watch(
        path.join(rootSource, 'KanColle-JS-Kit', '**/*.js'),
        ['js-app', 'Web-js']
    );
    gulp.watch(
        path.join(rootSource, 'nw.js-base-framework', '**/*.js'),
        ['js-base', 'js-app', 'Web-js']
    );
    gulp.watch(
        path.join(rootSource, 'libs', '**/*.js'),
        ['js-app', 'Web-js-libs']
    );
    gulp.watch(
        path.join(rootSource, 'js-app', 'canvas', '**/*.js'),
        ['Web-js-lib-canvas']
    );
    //gulp.watch(
    //		path.join( rootSource, '**/*.js' ),
    //		['js-base', 'js-app', 'Web-js', 'Web-js-libs']
    //	);
    gulp.watch(
        path.join(rootOutput, 'js-source', '**/*.js'),
        ['js-output']
    );
    //gulp.watch(
    //		path.join( rootSource, '**/*.less' ),
    //		['css-app', 'css-base', 'Web-css']
    //	);
});

gulp.task('default', [
    'js-base',
    'js-app',
    'js-output',
    'Web-js',
    'Web-js-libs',
    'Web-js-lib-canvas',
    'css-base',
    'css-app',
    'Web-css',
    'watch'
]);
