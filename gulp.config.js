module.exports = function() {
    var bower = {
        //json: require('./bower.json'),
        //directory: './bower_components/',
        exclude: ['bootstrap.js', 'bootstrap.css'],
        ignorePath: ['../bower_components/']
    };
    var app = './src/';
    var temp = '.tmp';

    var config = {
        temp: temp,

        /**
         * File paths
         */
        sass: [
          app + 'css/app.scss'
        ],

        // all javascript we want to vet
        alljs: [
            app + 'app/**/*.js'
        ],
        allhtml: app + '**/*.html',
        index: app + 'index.html',
        js: [
            app + 'app.js',
            app + '**/*.js',
            '!' + app + 'libs/*.*'
        ],
        bower: bower

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