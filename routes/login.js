var express = require('express');
var router = express.Router();
var auth = require('./auth');
var model = require('../model/model');
var User = require('../model/user').User;

router.post('/login', auth.login);
router.put('/register', function (req, res, next){
	if(req.body.user){
		var u = new User(req.body.user);
		u.save(function (err, doc){
			model.processError(err, res, function (){
				req.body.username = req.body.user.email;
				req.body.password = req.body.user.password;
				next();
			});
		});
	}else{
		res.send(400);
	}
}, auth.login);


module.exports = router;