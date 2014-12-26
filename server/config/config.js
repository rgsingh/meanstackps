var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost:27017/multivision',
        port: process.env.PORT || 3030
    },
    production : {
        db: 'mongodb://multivision:multivision@ds031477.mongolab.com:31477/multivision',
        rootPath: rootPath,
        port: process.env.PORT || 80
    }
}