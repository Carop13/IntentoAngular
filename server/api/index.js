var express = require('express');
var router = express.Router();

var Favorite = require('../models');
var User = require('../models/users.js');

// //GET /api/favorites
router.get('/favorites', function (req, res){
	console.log('Estoy en /favorite')
	
	Favorite.find({}, function (err, docs) {
		if(err){
			return res.sendStatus(500).json(err)
		}
		res.json(docs);
	})
});

router.get('/users', function (req, res){
	console.log('Estoy en /user')
	
	User.find({}, function (err, docs) {
		if(err){
			return res.sendStatus(500).json(err)
		}
		res.json(docs);
	})
});

//POST /api/users
router.post('/users', function (req, res) { 
	User.create(req.body, function onFinish(err, user) {
		if (err) {
			return res.status(500).json(err);
		}
		return res.status(201).json(user);
	});
});

module.exports = router;