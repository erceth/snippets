var mongoose = require('mongoose');


var ResourceSchema = new mongoose.Schema({
	title: {
		type: String,
		require: true
	},
	description: {
		type: String,
		require: true
	},
	url: {
		type: String,
		require: true
	},
	type: {
		type: String,
		require: true
	},
	fileName: {
		type: String
	},
	thumbnail: {
		type: String
	},
	thumbnailName: {
		type: String
	},
	category: {
		type: String
	}

});

module.exports = mongoose.model('Resource', ResourceSchema);
