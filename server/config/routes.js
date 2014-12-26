
module.exports = function(app){

    /*
     Another route that can serve up any of the partials that need to be rendered
     as jade partials by the server
     */
    app.get('/partials/*', function(req, res) {
        res.render('../../public/app/' + req.params[0]);
    });

    /*
     This route will deliver index page
     whenever a request is made for a non-existent path.
     For example;
     1) GET request from client for /foo
     2) Server side '*' route will handle request and hand off
     the index page to the client side routing mechanism
     3) Client side /foo route will get invoked and show the appropriate
     view
     4) If the original requested client side route (/foo) is not found
     then a catch-all 404 route should be defined server side
     to an infinite loop.

     */
    app.get('*', function(req, res) {
        res.render('index', {
//        Comment out the message injected into the view
            //mongoMessage: mongoMessage
            mongoMessage: 'A simple test'

        });
    })

}