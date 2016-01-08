var express = require('express');
var router = express.Router();

var Favorite = require('../models');
var User = require('../models/users.js');
var FBUser = require('../models/fb.users.js');

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
router.post('/favorites', function (req, res) { 
	Favorite.create(req.body, function onFinish(err, user) {
		if (err) {
			return res.status(500).json(err);
		}
		return res.status(201).json(user);
	});
});

//Get /api/users
router.get('/users', function (req, res){
	console.log('Estoy en /user')
	
	User.find({}, function (err, docs) {
		if(err){
			return res.sendStatus(500).json(err)
		}
		res.json(docs);
	})
});
router.post('/users', function (req, res) { 
	User.create(req.body, function onFinish(err, user) {
		if (err) {
			return res.status(500).json(err);
		}
		return res.status(201).json(user);
	});
});

//Get /api/fbusers
router.get('/fbusers', function (req, res){
	console.log('Estoy en /fbusers')
	
	FBUser.find({}, function (err, docs) {
		if(err){
			return res.sendStatus(500).json(err)
		}
		res.json(docs);
	})
});
router.post('/fbusers', function (req, res) { 
	FBUser.create(req.body, function onFinish(err, user) {
		if (err) {
			return res.status(500).json(err);
		}
		return res.status(201).json(user);
	});
});

module.exports = router;