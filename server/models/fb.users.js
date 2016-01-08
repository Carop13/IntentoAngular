var mongoose = require('mongoose');

var FBUserSchema = mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: String
});

var FBUser = mongoose.model('FBUser', FBUserSchema);
module.exports = FBUser;
