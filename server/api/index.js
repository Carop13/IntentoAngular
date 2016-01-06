var express = require('express');
var router = express.Router();

var Vote = require('../models');
// console.log(Vote);

// //GET /api/votes
router.get('/votes', function (req, res){
	console.log('Estoy en /votes')
	
	Vote.find({}, function (err, docs) {
		if(err){
			return res.sendStatus(500).json(err)
		}
		res.json(docs);
	})
	
});

module.exports = router;