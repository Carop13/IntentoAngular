var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
	id: { type: Number, required: true, unique: true },
    name: String,
    password: String,
    email: String
});

var User = mongoose.model('User', UserSchema);
module.exports = User;