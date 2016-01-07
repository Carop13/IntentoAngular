var mongoose = require('mongoose');

var FavoriteSchema = mongoose.Schema({
    showId: { type: Number, required: true, unique: true },
    name: String,
    lat: { type: Number, default: 0 },
    long: { type: Number, default: 0 }
});

var Favorite = mongoose.model('Favorite', FavoriteSchema);
module.exports = Favorite;
