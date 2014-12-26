
var mongoose = require('mongoose');

module.exports = function(config){

    mongoose.connect(config.db)
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

}