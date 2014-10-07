var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var jwt = require('jwt-simple');
var User = require('../model/user').User;

// la stratégie locale s'occupe de la connextion avec email et mot de passport-http-bearer

passport.use(new LocalStrategy(function (email, password, done){
	User.findOne({email: email}).populate("sections", "parent").exec(function (err, doc){
		if(err){
			return done(err, null);
		}
		if(!doc || doc === false || !doc.validatePassword(password)){
			return done({type: "wrongCredentials", message: "Email ou mot de passe incorrect"}, null);
		}
		return done(null, doc);
	});
}));

passport.use(new BearerStrategy(function (token, done){
	process.nextTick(function (){
		if(token===null){
			return done({type: "noToken", message: "Aucun token"}, null);
		}
		var decoded = jwt.decode(token, "SJ4z8hUxy4");
		User.findById(decoded.id, function (err, doc){
			return done(err, doc);
		});
	});
}));
// point d'entrée d'authentification

exports.login = function (req, res, next){
	if(req.body.username && req.body.password){
		console.log(req.body);
		passport.authenticate('local', function (err, user){
			if(err === null){
				var token = jwt.encode({
					id: user._id
				}, "SJ4z8hUxy4");
				var userSection = null;
				for(var i = 0, len = user.sections.length; i < len; i+=1){
					if(user.sections[i].parent === null){
						userSection = user.sections[i];
						break;
					}
				}
				user.salt = null;
				user.password = null;
				console.log(user);
				res.json({
					success: true,
					token: token,
					user: user
				});
			}else{
				res.json({
					success: false,
					error: err
				});
			}
		})(req, res, next); // pour filer à passport req res et next
	}else{
		res.send(400);
	}
};

// fonction qui vérifie que l'utilisateur a accès à l'application

exports.checkToken = function (req, res, next){
	passport.authenticate('bearer', function (err, user){
		if(err===null){
			if(user!==null && user!==false){
				req.user = user;
				next();
			}else{
				res.send(401);
			}
		}else{
			res.send(401);
		}
	})(req, res, next);

}







exports.passport = passport;

