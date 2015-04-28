var gulp = require('gulp');
var argv = require('yargs').argv;
var config = require('./gulp.config')();

var $ = require('gulp-load-plugins')({lazy: true});

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