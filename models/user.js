const mongoose = require('mongoose');
const mongoConfig = require('config').app.mongoConfig;
const database = mongoose.connection.useDb(mongoConfig.dbName);

const Schema = mongoose.Schema;

const userSchema = new Schema({    
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true 
    },
    resetToken: String,
    resetTokenExpiration: Date
});

module.exports = database.model('User', userSchema);

