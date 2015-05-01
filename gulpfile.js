var gulp = require('gulp');
var argv = require('yargs').argv;
var del = require('del');
var config = require('./gulp.config')();
var BOWER_COMPONENTS_FOLDER = 'bower_components';

var $ = require('gulp-load-plugins')({lazy: true});

// TODO

// list gulp tasks
gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

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

gulp.task('scripts', ['vet'], function() {
    log('Copying javascripts');
    gulp.src('src/**/*.js')
        .pipe(gulp.dest(config.temp))
        .pipe($.livereload());
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

/**
 * Serve the files after dependency tasks are completed
 */
gulp.task('serve', ['styles', 'html', 'scripts'], $.serve({
        port: 8888,
        root: ['.tmp', 'resources', BOWER_COMPONENTS_FOLDER]
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
    gulp.watch(['src/**/*.scss'], ['sass']);
    //gulp.watch(['src/**/*.css'], ['css']);
});

//////////////************** old *******************/////////////////

//var gulp = require('gulp');
//var plug = require('gulp-load-plugins')();
//var BOWER_COMPONENTS_FOLDER = 'bower_components';
//var del = require('del');
//
///**
// * Static file server
// */
//gulp.task('serve', plug.serve({
//    port: 8888,
//    root: ['.tmp', 'resources', BOWER_COMPONENTS_FOLDER]
//}));
//
//gulp.task('index', function() {
//    gulp.src('src/index.html')
//        .pipe(gulp.dest('.tmp'))
//        .pipe(plug.livereload());
//});
//
//gulp.task('html', function() {
//    gulp.src(['src/**/*.html', '!src/index.html'])
//        .pipe(gulp.dest('.tmp'))
//        .pipe(plug.livereload());
//});
//
//gulp.task('scripts', function() {
//    gulp.src('src/**/*.js')
//        .pipe(gulp.dest('.tmp'))
//        .pipe(plug.livereload());
//});
//
//gulp.task('css', function() {
//    gulp.src('src/**/*.css')
//        .pipe(plug.sass())
//        .pipe(gulp.dest('.tmp'))
//        .pipe(plug.livereload());
//});
//
//gulp.task('sass', function() {
//    gulp.src('src/css/app.scss')
//        .pipe(plug.sass())
//        .pipe(gulp.dest('.tmp/css'))
//        .pipe(plug.livereload());
//});
//
//gulp.task('fonts', function() {
//    gulp.src('src/fonts/**/*.*')
//        .pipe(gulp.dest('.tmp/fonts/'))
//        .pipe(plug.livereload());
//});
//
//gulp.task('clean', function() {
//    del(['.tmp/']);
//});
//
//gulp.task('serve-dev', ['serve', 'index', 'html', 'scripts', 'css', 'sass', 'fonts'], function() {
//    plug.livereload.listen();
//    gulp.watch(['src/index.html'], ['index']);
//    gulp.watch(['src/**/*.html', '!src/index.html'], ['html']);
//    gulp.watch(['src/**/*.js'], ['scripts']);
//    gulp.watch(['src/**/*.scss'], ['sass']);
//    gulp.watch(['src/**/*.css'], ['css']);
//});