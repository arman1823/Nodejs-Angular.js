var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sectionSchema = new Schema({
	name: String,
	year: Number,
	parent: {
		type: Schema.ObjectId,
		ref: "Section"
	}
});

var Section = mongoose.model('Section', sectionSchema);
exports.Section = Section;