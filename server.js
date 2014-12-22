/**
 * Created by rsingh on 7/13/14.
 */

//CONFIG SECTION

var express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser  = require('body-parser'), // pre-req for other middleware needed
    mongoose = require('mongoose');

// Used by stylus middleware
function compile(str, path) {
    return stylus(str).set('filename', path);
}

var env = process.env.NODE_ENV = process.env.NODE_ENV  || 'development';
var app  = express();

app.set('views', __dirname + '/server/views');
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
        src: __dirname + '/public/',
        compile: compile
    }
));

/*
  This static route tell Express that when a request comes in for a resource in
  'public' directory, serve up that file
  (e.g. /favicon.ico)
 */
app.use(express.static(__dirname + '/public'));


// END CONFIG SECTION

// MONGODB SECTION

//    Initialize connection to mongod process and get the data.
if (env === 'development') {
  mongoose.connect('mongodb://localhost:27017/multivision')
} else {
  mongoose.connect('mongodb://multivision:multivision@ds031477.mongolab.com:31477/multivision')
}
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function(callback) {
    console.log('multivision db opened.');
});

var MessageSchema = mongoose.Schema({
    _id: Number,
    message : String,
    messageDetail: String
});

MessageSchema.methods.findByDetail = function findByDetail(message) {
    return this.model('Message').find({messageDetail: this.messageDetail}, message);
};

var Message = mongoose.model('Message', MessageSchema);

var mainMessage = new Message({
    _id: 123,
    message: 'This is a also yet another test',
    messageDetail: 'Specifically, this test is to demonstrate retrieval of data from MongoDB.'
});

// Find an entry that matches 'Specifically, this test is to demonstrate retrieval of data from MongoDB.'
mainMessage.findByDetail(function (err, specificMessage) {
    if (err) throw err

    //Prepare data to be inserted or updated
    var upsertMessage = mainMessage.toObject();

    // We cannot update the _id field onto an existing record so remove it.
    delete upsertMessage._id;

    // Update the field that matches by _id only. Otherwise, insert a new record
    Message.update({_id: mainMessage._id}, upsertMessage, {upsert: true}, function(err){
        if (err) throw err;

        // Make sure it was inserted by retrieving it from the DB.
        Message.findOne().exec(function(err, messageDoc){
            if (err) throw err;

            specificMessage.message  = "(Upsert completed for " + messageDoc._id + " ) "  + messageDoc.message,
            specificMessage.messageDetail = messageDoc.messageDetail;
        });

    });

    // update the globals...not elegant, but okay for this tutorial...Angular services would be best. Globals suck.
    mongoMessage = specificMessage.message;
    mongoMessageDetail = specificMessage.messageDetail;
})



// END MONGODB SECTION


/*
  Another route that can serve up any of the partials that need to be rendered
  as jade partials by the server
 */
app.get('/partials/:partialPath', function(req, res) {
    res.render('partials/' + req.params.partialPath);
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

var port = process.env.PORT || 3030;
app.listen(port);

console.log('Listening on port ' + port + '...');
