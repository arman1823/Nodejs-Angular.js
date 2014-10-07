var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

var genSalt = function(){
	return crypto.randomBytes(128).toString('base64');
};

var genHash = function(password, salt){
	var hash = crypto.createHash('sha512');
	hash.update(salt);
	hash.update(password);
	return hash.digest('hex');
};


var userSchema = new Schema({
	firstname: {
		type: String,
		required: true
	},
	lastname: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	points: {
		type: Number,
		default: 0
	},

	salt: String,

	sections: [{
		type: Schema.ObjectId,
		ref: "Section"
	}]
	
});

// fonction executée après save et avant l'enregistrement dans la bdd 

userSchema.pre('save', function (next){
	if (this.isNew) {
		this.salt = genSalt();
		this.password = genHash(this.password, this.salt);
	}
	next();
});

// fonction de validation du mot de passe

userSchema.methods.validatePassword = function (password){
	return this.password === genHash(password, this.salt);
};
var User = mongoose.model("User", userSchema);
exports.User = User;