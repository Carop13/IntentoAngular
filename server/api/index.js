var express = require('express');
var router = express.Router();

var User = require('../models/users.js');

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

module.exports = router;