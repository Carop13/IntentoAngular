var mongoose = require('mongoose');

var VoteSchema = mongoose.Schema({
    showId: { type: Number, required: true, unique: true },
    name: String,
    lat: { type: Number, default: 0 },
    long: { type: Number, default: 0 }
});

var Vote = mongoose.model('Vote', VoteSchema);
module.exports = Vote;
