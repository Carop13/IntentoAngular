var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var router = express.Router();

var User = require('../models/users.js');

//Get /api/users
router.get('/users', function (req, res){
	if(req.session.lastPage) {
	   	res.write('Last page was: ' + req.session.lastPage + '. ');
		console.log(req.cookies);
		console.log("////////////////////////////");
		console.log(req.session);
	 }

	 req.session.lastPage = '/users';

	
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