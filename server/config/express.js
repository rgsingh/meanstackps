
var express = require('express'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    stylus = require('stylus'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport');

module.exports = function(app, config) {
    // Used by stylus middleware
    function compile(str, path) {
        return stylus(str).set('filename', path);
    }
    app.set('views', config.rootPath + '/server/views');
    app.set('view engine', 'jade');

    // Turn on express logging and bodyParser
    app.use(logger('dev'));

    app.use(cookieParser());

    //app.use(bodyParser()); // deprecated
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    app.use(session(
        {
            secret:'multi vision unicorns',
            resave:true,
            saveUninitialized:true
        }
    ));

    app.use(passport.initialize());
    app.use(passport.session());

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
