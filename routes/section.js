var express = require('express');
var router = express.Router();
var Section = require('../model/section').Section;
var model = require('../model/model');
var checkToken = require('./auth').checkToken;

/* GET home page. */
// il liste les sections qui n'ont pas de parent
router.get('/list', function (req, res) {
	Section.find({parent: null}).exec(function (err, docs){
		model.processError(err, res, function (){
			res.json({
				success: true,
				sections: docs
			});
		});
	});
});

// récupère les sections dont le parent possède un id
router.get('/list/:id', function (req, res) {
		
	if(req.params.id){
		Section.find({parent: req.params.id}).exec(function (err, docs){
			model.processError(err, res, function (){
				res.json({
					success: true,
					sections: docs
				});
			});
		});
	}else{
		res.send(400);
	}
	console.log(req.params);
});
// route pour rajouter une section

router.put('/', checkToken, function (req, res){
	if(req.body.section){
		var s = new Section(req.body.section);
		s.save(function (err, doc){
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

module.exports = router;
