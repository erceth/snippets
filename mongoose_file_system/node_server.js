var express = require('express');
var app = express();
var multer = require('multer');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs');

mongoose.connect('mongodb://localhost/primebiz');

var Resource = require("./mongo_modals/resource");

var uploadedComplete = false;
app.use(multer({
    dest: './resource_library/',
    rename: function(fieldname, filename) {
        return filename + Date.now();
    },
    onFileUploadStart: function(file) {
        console.log(file.originalname + ' is starting ...')
    },
    onFileUploadComplete: function(file) {
        console.log(file.fieldname + ' uploaded to  ' + file.path)
        uploadedComplete = true;
    }
}));

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    next();
});

var port = 5555;

app.use(express.static(__dirname + '/resource_library'));

app.get('/get-resources',function(req,res) {
	Resource.find(function(err, resources) {
		if (err) {
			res.json({error:err, message: "error getting resource"});
		} else {
			res.json({error:null, message: "successs", data: resources});
		}
	});
});

app.post('/delete-resource', function(req,res) {

	Resource.findByIdAndRemove(req.body.id, function(err, resource) {
		if (err) {
			res.json({error:err, message: "error finding and removing resource"});
		} else {
			if (resource.type === "file") {
				fs.unlink(__dirname + "/resource_library/" + resource.url, function(err) {
					if (err) {
						res.json({error: err, message: "error deleting the file"});
					} else {
						res.json({error:null, message: "successs"});
					}
				});
			} else {
				res.json({error:null, message: "successs"});
			}
		}
	});


		

	// Resource.remove({"_id": req.body.id}, function(err) {
	// 	if (err) {
	// 		res.json({error:err, message: "error removing resource"});
	// 	} else {
	// 		res.json({error:null, message: "successs"});
	// 	}
	// });
});

app.post('/upload-url',function(req,res) {
	var newResource = new Resource({
		title: req.body.title,
		description: req.body.description,
		url: req.body.url,
		type: "url"
	});

	newResource.save(function(err) {
		if (err) {
			res.json({error:err, message:"error saving resource"});
		} else {
			res.json({error: null, message:"resource saved"});
		}
	});
});


app.post('/upload-file', function(req, res) {
	if (uploadedComplete === true) {
		uploadedComplete = false;
		var postData = JSON.parse(req.body.data);
		console.log(postData);
		var newResource = new Resource({
			title: postData.title,
			description: postData.description,
			url: req.files.aFile.name,
			type: "file"
		});
		newResource.save(function(err) {
			if (err) {
				res.json({error:err, message:"error saving resource"});
			} else {
				res.json({error: null, message:"resource saved"});
			}
		});
    }
});



app.listen(port);
console.log('Magic happens on port ' + port);
