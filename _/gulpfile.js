"use strict";

const fs = require('fs');
const path = require('path');
const gulp = require('gulp');

const dev = true

const root = '../';
const rootSource = '../source';
const rootOutput = '../dev-output';

// Include Plugins
const concat = require('gulp-concat');
// const uglify = require('gulp-uglify');
const less = require('gulp-less');
//const minifyCSS = require('gulp-minify-css');
const nano = require('gulp-cssnano');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const LessPluginCleanCSS = require('less-plugin-clean-css');
const cleanCSSPlugin = new LessPluginCleanCSS({ advanced: true });
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const notify = require("gulp-notify");
const watchLess = require('gulp-watch-less2');
const browserify = require('browserify')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const terser = require("gulp-terser")

// Defaults ===================================================================

const terserOptions = {
    mangle: false,
    keep_classnames: true,
    keep_fnames: true,
}

// Tasks ======================================================================

const scripts = {
    base: () => 
        gulp.src(parseKoalaJS(rootSource, 'js-base.js'))
            .pipe(concat('js-base.js'))
            // .pipe(terser(terserOptions))
            // .pipe(babel({
            //     'highlightCode': false,
            //     'comments': false,
            //     'compact': false,
            //     'ast': false,
            //     "presets": [
            //         require('@babel/preset-es2015'),
            //         require('@babel/preset-stage-0'),
            //         // "es2015",
            //         // "stage-0"
            //     ],
            //     "plugins": [
            //         require("@babel/plugin-transform-minify-booleans")
            //         // "transform-minify-booleans"
            //     ]
            // }))
            .pipe(gulp.dest(path.join(root, 'app', 'assets'))),

    app: () => 
        gulp.src(
            parseKoalaJS(rootSource, 'js-app.js')
                .concat(path.resolve(__dirname, '../source/js-app/.base/**/*.js'))
        )
            .pipe(concat('js-app.js'))
            .pipe(babel({
                'highlightCode': false,
                'comments': false,
                'compact': false,
                'ast': false,
                "presets": [
                    require('@babel/preset-env')
                ],
                // "plugins": [
                //     require("@babel/plugin-transform-minify-booleans")
                // ]
            }))
            //.pipe(terser(terserOptions))
            .pipe(gulp.dest(path.join(root, 'app', 'assets'))),

    output: () => 
        gulp.src(parseKoalaJS(rootOutput, 'js-source', 'output.js'))
            .pipe(concat('output.js'))
            //.pipe(terser(terserOptions))
            .pipe(gulp.dest(path.join(rootOutput, 'js-output'))),

    web: () => 
        gulp.src(parseKoalaJS(rootOutput, 'assets-source', 'js.js'))
            .pipe(concat('js.js'))
            .pipe(babel({
                'highlightCode': false,
                'comments': false,
                'compact': false,
                'ast': false,
                "presets": [
                    require('@babel/preset-env')//,
                    //"stage-0"
                ],
                // "plugins": [
                //     require("@babel/plugin-transform-minify-booleans")
                // ]
            }))
            .pipe(gulp.dest(path.join(rootOutput, 'assets-output')))
            .pipe(terser(terserOptions))
            .pipe(rename({ extname: '.min.js' }))
            .pipe(gulp.dest(path.join(rootOutput, 'assets-output'))),

    webLibs: () =>
        gulp.src(parseKoalaJS(rootOutput, 'assets-source', 'libs.js'))
            .pipe(concat('libs.js'))
            // .pipe(babel({
            //     'highlightCode': false,
            //     'comments': false,
            //     'compact': false,
            //     'ast': false,
            //     "presets": [
            //         require('@babel/preset-env')//,
            //         //"stage-0"
            //     ],
            //     // "plugins": [
            //     //     require("@babel/plugin-transform-minify-booleans")
            //     // ]
            // }))
            .pipe(gulp.dest(path.join(rootOutput, 'assets-output')))
            .pipe(terser(terserOptions))
            .pipe(rename({ extname: '.min.js' }))
            .pipe(gulp.dest(path.join(rootOutput, 'assets-output'))),

    webLibsCanvas: () => 
        gulp.src(parseKoalaJS(rootOutput, 'assets-source', 'lib.canvas.js'))
            .pipe(concat('lib.canvas.js'))
            .pipe(gulp.dest(path.join(rootOutput, 'assets-output')))
            .pipe(terser(terserOptions))
            .pipe(rename({ extname: '.min.js' }))
            .pipe(gulp.dest(path.join(rootOutput, 'assets-output')))
}

const styles = {
    base: () => {
        const f = path.join(rootSource, 'css-base.less');
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
    },

    app: () => {
        const f = path.join(rootSource, 'css-app.less');
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
    },

    web: () => {
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
    }
}

const allTasks = {
    scripts: Object.values(scripts),
    styles: Object.values(styles)
}

const build = gulp.parallel(
    ...Object.values(allTasks).map(tasks => gulp.parallel(...tasks))
)

exports.build = build

exports.watch = function () {
    gulp.watch(
        path.join(rootSource, 'js-app', '**/*.js'),
        [scripts.app, scripts.web]
    );
    gulp.watch(
        path.join(rootSource, 'KanColle-JS-Kit', '**/*.js'),
        [scripts.app, scripts.web]
    );
    gulp.watch(
        path.join(rootSource, 'nw.js-base-framework', '**/*.js'),
        [scripts.base, scripts.app, scripts.web]
    );
    gulp.watch(
        path.join(rootSource, 'libs', '**/*.js'),
        [scripts.app, scripts.webLibs]
    );
    gulp.watch(
        path.join(rootSource, 'js-app', 'canvas', '**/*.js'),
        [scripts.webLibsCanvas]
    );
    //gulp.watch(
    //		path.join( rootSource, '**/*.js' ),
    //		[scripts.base, scripts.app, scripts.web, scripts.webLibs]
    //	);
    gulp.watch(
        path.join(rootOutput, 'js-source', '**/*.js'),
        [scripts.output]
    );
    //gulp.watch(
    //		path.join( rootSource, '**/*.less' ),
    //		['css-app', 'css-base', 'Web-css']
    //	);
}

// Commons ====================================================================

function parseKoalaJS() {
    const filename = Array.prototype.pop.call(arguments);
    const dir = Array.prototype.join.call(arguments, '/');
    return fs.readFileSync(path.join(dir, filename), 'utf-8')
        .replace(/\r?\n|\r/g, '')
        .split('// @koala-prepend ')
        .filter(function (value) {
            return value
        })
        .map(function (value) {
            if (value)
                return path.join(dir, value.replace(/^"(.+)"$/g, '$1'))
        })
        // .map(v => {
        //     console.log(v)
        //     return v
        // });
}

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

exports.default = build
