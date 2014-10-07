var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var threadSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: new Date()
	},
	 section: {
	 	type: Schema.ObjectId,
	 	ref: "Section",
	 	required: true
	 },
	 author: {
	 	type: Schema.ObjectId,
	 	ref: "User",
	 	required: true
	 },
	 state: {
	 	type: String,
	 	default: "open",
	 	enum: ["open", "closed"]
	 }
});


var Thread = mongoose.model("Thread", threadSchema);
exports.Thread = Thread;