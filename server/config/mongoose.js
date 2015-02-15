
var mongoose = require('mongoose'),
    crypto = require('crypto');

module.exports = function(config){

    mongoose.connect(config.db)
    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function(callback) {
        console.log('multivision db opened.');
    });

    var userSchema = mongoose.Schema({
        firstname : String,
        lastname: String,
        username: String,
        salt: String,
        hashed_pwd: String
    });

    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function(err, collection){
        if (collection.length === 0) {
            var salt, hash;
            salt = createSalt();
            hash = hashPwd(salt, 'tstark');
            User.create({firstname: 'Tony', lastname: 'Stark', username: 'tstark', salt: salt, hashed_pwd: hash})
            salt = createSalt();
            hash = hashPwd(salt, 'ckent');
            User.create({firstname: 'Clark', lastname: 'Kent', username: 'ckent', salt: salt, hashed_pwd: hash})
            salt = createSalt();
            hash = hashPwd(salt, 'smash');
            User.create({firstname: 'Bruce', lastname: 'Banner', username: 'smash', salt: salt, hashed_pwd: hash})
        }
    })

}

function createSalt() {
    return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt, pwd) {
    var hmac = crypto.createHmac('sha1', salt);
    return hmac.update(pwd).digest('hex');
}