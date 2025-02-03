const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');  // Plugin for user authentication

const userSchema = new mongoose.Schema({
    username: String,
    email: String
});

userSchema.plugin(passportLocalMongoose);  // Add passport methods

module.exports = mongoose.model('User', userSchema);
