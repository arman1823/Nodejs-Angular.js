var express = require('express');
var router = express.Router();
var Thread = require('../model/thread').Thread;
var model = require('../model/model');
var Message = require('../model/message').Message;
var checkToken = require('./auth').checkToken;




// route pour récupérer les fils de discussion d'une section

router.get('/list/section/:id', function (req, res){
	if(req.params.id){
		Thread.find({section: req.params.id}).populate('author', 'firstname lastname').exec(function (err, docs){
			if(err){
				res.json({
					success: false,
					error: err
				});
			}else{

				res.json({
					success: true,
					threads: docs
				});
			}
		});
	}else{
		res.send(400);
	}
});


// route pour rajouter un fil de discussion

router.put('/add/section/:id', checkToken, function (req, res){
	// condition qui vérifie l'id de la section, le thread et le message
	if(req.params.id && req.body.thread && req.body.message){
		var t = new Thread(req.body.thread);
		t.date = new Date();
		t.section = req.params.id;
		t.author = req.user._id;
		t.state = "open";
		t.save(function (err, doc){
			model.processError(err, res, function(){
				var m = new Message(req.body.message);
				m.date = new Date();
				m.author = req.user._id;
				m.thread = doc._id;
				m.save(function (error, document){
					model.processError(error, document, function(){
						res.json({
							success: true,
							thread: doc,
							message: document
						});
					});
				});
			});
		});

	}else{
		res.send(400);
	}
});

router.get('/:threadId', checkToken, function (req, res){
	if(req.params.threadId){
		Thread.findById(req.params.threadId).populate("author", "firstname lastname").lean().exec(function (err, doc){
			model.processError(err, res, function (){
				Message.find({thread: doc._id}).populate("author", "firstname lastname").exec(function (error, docs){
					model.processError(error, res, function (){
						doc.messages = docs;
						res.json({
							success: true,
							thread: doc
						});
					});
				});
			});
		});
	}
});

router.post('/update/status/:id', checkToken, function (req, res){
	if(req.params.id){
		Thread.findById(req.params.id, function (err, doc){
			doc.state = "closed";
			doc.save(function (error, document){
				res.json({
					success: true,
					state: "closed"
				});
			});
		});
	}
});






module.exports = router;