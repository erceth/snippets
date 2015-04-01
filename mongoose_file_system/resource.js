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
	}
});

module.exports = mongoose.model('Resource', ResourceSchema);
