var express = require('express');
var router = express.Router();
var Message = require('../model/message').Message;
var model = require('../model/model');
var checkToken = require('./auth').checkToken;


// il liste tous les massages dont les auteurs sont indiqués

router.get('/list/:id', function (req, res) {
		
	if(req.params.id){
		Message.find({author: req.params.id}).exec(function (err, docs){
			model.processError(err, res, function (){
				res.json({
					success: true,
					messages: docs
				});
			});
		});
	}else{
		res.send(400);
	}
	console.log(req.params);
});

// route pour ajouter des messages

router.put('/add/thread/:id', checkToken, function (req, res){
	if(req.body.message && req.params.id){
		var m = new Message(req.body.message);
		m.date = new Date();
		m.author = req.user._id;
		m.thread = req.params.id;
		m.save(function (err, doc){
			model.processError(err, res, function (){
				doc = doc.toObject();
				req.user.password = null;
				req.user.salt = null;
				req.user.email = null;
				doc.author = req.user;
				res.json({
					success: true,
					message: doc
				});
			});
		});
	}else{
		res.send(400);
	}
});

router.get('/first/thread/:id', checkToken, function (req, res){
	if(req.params.id){
		Message.find({
			thread: req.params.id
		}).sort("date").limit(1).exec(function (err, doc){
			model.processError(err, res, function (){
				res.json({
					success: true,
					message: doc[0]
				});
			});
		});
	}
});




module.exports = router;