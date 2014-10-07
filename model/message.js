var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
	date: Date,
	text: String,
	author: {
		type: Schema.ObjectId,
		ref: "User",
		required: true
	},
	thread: {
		type: Schema.ObjectId,
		ref: "Thread",
		required: true
	}
});
// fonction executée avant de sauvegarder dans la bdd
messageSchema.pre('save', function (next) {
	if (typeof this.text !== "undefined" && this.text.length > 0) {
		next();
	} else {
		next(new Error("Texte vide"));
	}
});

var Message = mongoose.model("Message", messageSchema);
exports.Message = Message;