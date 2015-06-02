var gulp = require('gulp');
var argv = require('yargs').argv;
var del = require('del');
var config = require('./gulp.config')();
var BOWER_COMPONENTS_FOLDER = 'bower_components';
var $ = require('gulp-load-plugins')({lazy: true});

// list gulp tasks
gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

/**
 * Build development version
 * No source files are changed, all new files are outputted to temp folder.
 */
gulp.task('build', ['styles', 'scripts', 'html', 'lib'], function() {
});

gulp.task('resources', function() {
    log('Copying resources to build folder')
    return gulp
        .src(config.resources)
        .pipe(gulp.dest(config.build))
});

/**
 * Remove the .tmp and build folders
 */
gulp.task('clean', function(done) {
    var delConfig = [].concat(config.temp, config.build);
    log('Cleaning: ' + delConfig);
    del(delConfig, done);
});

/**
 * Remove all styles from the build folder
 * @param  {Function} done - callback when complete
 */
gulp.task('clean-fonts', function(done) {
    log('Cleaning fonts in build folder');
    clean(config.build + 'fonts', done);
});

/**
 * Remove all images from the build folder
 * @param  {Function} done - callback when complete
 */
gulp.task('clean-images', function(done) {
    log('Cleaning images in build folder');
    clean(config.build + 'images', done);
});

/**
 * Remove all styles from the temp folder
 * @param  {Function} done - callback when complete
 */
gulp.task('clean-styles', function(done) {
    log('Cleaning styles');
    clean(config.temp + '**/*.css', done);
});

/**
 * Copy all fonts to build folder
 */
gulp.task('fonts', ['clean-fonts'], function() {
   log('Copying fonts');
    return gulp
        .src(config.fonts)
        .pipe(gulp.dest(config.build + 'fonts/bootstrap/fonts/'))
});

gulp.task('html', ['wiredep'], function() {
    log('Copying html');
    gulp.src(['src/**/*.html', '!src/index.html'])
        .pipe(gulp.dest(config.temp))
        .pipe($.livereload());
});

/**
 * Copy all fonts to build folder
 */
gulp.task('images', ['clean-images'], function() {
    log('Copying images');
    return gulp
        .src(config.images)
        //.pipe($.imagemin({optimizationLevel: 4}))
        .pipe(gulp.dest(config.build + 'images'))
});

gulp.task('jquery-ui-images', function() {
    log('Copying images used by jquery-ui to build folder');
    return gulp
        .src(BOWER_COMPONENTS_FOLDER + '/jquery-ui/themes/smoothness/images/*.*')
        .pipe(gulp.dest(config.build + 'css/images'))

});

gulp.task('lib', function() {
    log('Copying 3rd party libraries');
    return gulp
        .src(config.lib)
        .pipe(gulp.dest(config.temp + 'lib'))
});

gulp.task('optimize', ['build', 'templatecache', 'resources', 'jquery-ui-images'], function() {
    log('Optimizing javascripts');
    var assets = $.useref.assets({searchPath: ['.tmp/', './bower_components/', './']});
    var templateCache = config.temp + config.templateCache.file;
    var cssFilter = $.filter('**/*.css');
    var jsLibFilter = $.filter('**/lib.js');
    var jsAppFilter = $.filter('**/app.js');

    return gulp
        .src(config.temp + 'index.html')
        .pipe($.plumber())
        .pipe($.inject(gulp.src(templateCache, {read: false}), {
            starttag: '<!-- inject:templates:js -->'
        }))
        .pipe(assets)

        //css min
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore())

        //vendor js min
        .pipe(jsLibFilter)
        .pipe($.uglify())
        .pipe(jsLibFilter.restore())

        //app js annotate and min
        .pipe(jsAppFilter)
        .pipe($.ngAnnotate())
        .pipe($.uglify())
        .pipe(jsAppFilter.restore())

        .pipe(assets.restore())
        .pipe($.useref())
        .pipe(gulp.dest(config.build));
});

gulp.task('scripts', ['vet'], function() {
    log('Copying javascripts');
    gulp.src('src/**/*.js')
        .pipe(gulp.dest(config.temp))
        .pipe($.livereload());
});

/**
 * Build and serve the dev version
 */
gulp.task('serve', ['build'], $.serve({
    port: 8888,
    root: ['.tmp', 'resources', BOWER_COMPONENTS_FOLDER]
}));

/**
 * Build and serve the dist version
 */
gulp.task('serve-dist', $.serve({
    port: 7777,
    root: ['./build/']
}));

/**
 * Serve and watch for changes
 */
gulp.task('serve-dev', ['serve'], function() {
    $.livereload.listen();
    //watch index.html
    gulp.watch([config.index], ['wiredep']);
    //watch all other html
    gulp.watch([config.allhtml, '!' + config.index], ['html']);
    //watch all javascript files
    gulp.watch(['src/**/*.js'], ['scripts', 'vet']);
    // watch Sass
    gulp.watch(['src/**/*.scss'], ['styles']);
});

/**
 * compile Sass to CSS
 * @return {stream}
 */
gulp.task('styles', ['clean-styles'], function() {
    log('Compiling Sass --> CSS');
    return gulp
        .src(config.sass)
        .pipe($.plumber())
        .pipe($.sass())
        .pipe($.autoprefixer({browser: ['last 2 version', '> 5%']}))
        .pipe(gulp.dest(config.temp + '/css/'))
        .pipe($.livereload());
});

gulp.task('templatecache', ['clean'],function() {
   log('Creating AngularJS template cache');
    return gulp
        .src(config.templates)
        .pipe($.minifyHtml({empty: true}))
        .pipe($.angularTemplatecache(
            config.templateCache.file,
            config.templateCache.options
        ))
        .pipe(gulp.dest(config.temp))
});

/**
 * vet all scripts with JSHint and JSCS
 * @return {stream}
 */
gulp.task('vet', function() {
    log('Analyzing js sources with JSHint and JSCS');
    return gulp
        .src(config.alljs)
        .pipe($.if(argv.verbose, $.print()))
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe($.jshint.reporter('fail'))
});

/**
 * Wire-up the bower dependencies
 * @return {Stream}
 */
gulp.task('wiredep', function() {
    log('Wiring the bower dependencies into the html');

    var wiredep = require('wiredep').stream;
    var options = config.getWiredepDefaultOptions();

    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.js), {relative: true}))
        .pipe(gulp.dest(config.temp))
        .pipe($.livereload());
});

////////////////////////////////////////////////////////////

/**
 * Remove all files from the temp folders
 * @param  {Function} done - callback when complete
 */
function clean(path, done) {
    log('Cleaning: ' + $.util.colors.blue(path));
    del(path, done);
}

/**
 * Log a message or series of messages using chalk's blue color.
 * Can pass in a string, object or array.
 */
function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}



gulp.task('t', function () {
    $.livereload.listen();
    gulp.watch(['src/**/*.scss'], ['styles2']);
});

gulp.task('styles2', ['clean-styles'], function(done) {
    return gulp
        .src(config.sass)
        .pipe($.plumber(), done)
        .pipe($.sass())
        .pipe($.autoprefixer({browser: ['last 2 version', '> 5%']}))
        //.pipe(gulp.dest(dirs.src + '/styles'))
        .pipe($.livereload());
});