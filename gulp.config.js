module.exports = function() {
    var app = './src/';
    var bower = {
        //json: require('./bower.json'),
        //directory: './bower_components/',
        exclude: ['bootstrap.js', 'bootstrap.css'],
        ignorePath: ['../bower_components/']
    };
    var temp = '.tmp/';

    var config = {
        /**
         * File paths
         */
        allhtml: app + '**/*.html',
        // all javascript we want to vet
        alljs: [
            app + 'app/**/*.js'
        ],
        bower: bower,
        build: './build/',
        fonts: './bower_components/bootstrap/fonts/**.*',
        images: './resources/images/**/*.*',
        index: app + 'index.html',
        js: [
            app + 'app.js',
            app + '**/*.js',
            '!' + app + 'libs/*.*'
        ],
        sass: app + 'css/app.scss',
        temp: temp
    };

    /**
     * wiredep and bower settings
     */
    config.getWiredepDefaultOptions = function() {
        var options = {
            //bowerJson: config.bower.json,
            //directory: config.bower.directory,
            ignorePath: config.bower.ignorePath,
            exclude: config.bower.exclude
        };
        return options;
    };

    return config;
};