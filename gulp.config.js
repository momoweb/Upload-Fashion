module.exports = function() {

    var config = {
        temp: './.tmp',

        // sass files
        sass: [
          './src/css/app.scss'
        ],

        // all the js files to vet
        alljs: [
            './src/app/**/*.js'
        ]
    };
    return config;
};