
var express = require('express'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    stylus = require('stylus');

module.exports = function(app, config) {
    // Used by stylus middleware
    function compile(str, path) {
        return stylus(str).set('filename', path);
    }
    app.set('views', config.rootPath + '/server/views');
    app.set('view engine', 'jade');

    // Turn on express logging and bodyParser
    app.use(logger('dev'));

    //app.use(bodyParser()); // deprecated
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());


    // Stylus middleware referencing the compile function
    app.use(stylus.middleware(
        {
            src: config.rootPath + '/public/',
            compile: compile
        }
    ));

    /*
     This static route tell Express that when a request comes in for a resource in
     'public' directory, serve up that file
     (e.g. /favicon.ico)
     */
    app.use(express.static(config.rootPath + '/public'));
}
