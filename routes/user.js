var express = require('express');
var router = express.Router();
var User = require('../model/user').User;
var model = require('../model/model');
var auth = require('./auth');
var checkToken = require('./auth').checkToken;



router.put('/', checkToken, function (req, res){
	if(req.body.user){
		var u = new User(req.body.user);
		u.save(function (err, doc){
			model.processError(err, res, function (){
				res.json({
					success: true,
					section: doc
				});
			});
		});
	}else{
		res.send(400);
	}
});

router.get('/:id', checkToken, function (req, res) {
	if (req.params.id){
		User.findById(req.params.id).populate("sections", "parent").exec(function (err, doc) {
			doc.salt = null;
			doc.password = null;
			res.json({
				success: true,
				user: doc
			});
		});
	}
	
});

router.post('/add/point/:id', checkToken, function (req, res){
	// vérification d'ID
	if(req.params.id){
		User.findById(req.params.id, function (error, doc){
			if(req.user._id.equals(doc._id) ){
				res.send(403);
			}else{
				doc.points++;
				doc.save(function (err, document){
					res.json({
						success: true,
						points: doc.points
					});
				});
			}	
		});
	}
});


router.post('/login', auth.login);



module.exports = router;