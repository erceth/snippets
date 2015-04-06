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
        //console.log(file.originalname + ' is starting ...')
    },
    onFileUploadComplete: function(file) {
        //console.log(file.fieldname + ' uploaded to  ' + file.path)
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

//app.use(express.static(__dirname + '/resource_library'));

//get resource_library file
app.get('/resource-library/:filename', function(req, res) {
    var options = {
        root: __dirname + "/resource_library",
        dotfiles: "deny",
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };
    var fileName = req.params.filename;
    res.sendFile(fileName, options, function(err) {
        if (err) {
            console.log(err);
            res.status(err.status).end();
        }// else {
        //     console.log('Sent:', fileName);
        // }
    });

});

app.get('/get-resources', function(req,res) {
	Resource.find(function(err, resources) {
		if (err) {
			res.json({error:err, message: "error getting resource"});
		} else {
			res.json({error:null, message: "successs", data: resources});
		}
	});
});

app.get('/get-resources/:resourceId', function(req,res) {
	Resource.findById(req.params.resourceId, function(err, resource) {
		if (err) {
			res.json({error:err, message: "error getting resource"});
		} else {
			res.json({error:null, message: "successs", data: resource});
		}
	});
});

app.post('/delete-resource', function(req,res) {

	Resource.findByIdAndRemove(req.body.id, function(err, resource) {
		if (err) {
			res.json({error:err, message: "error finding and removing resource"});
		} else {

			if (resource.thumbnailName) {
				fs.unlink(__dirname + "/resource_library/" + resource.thumbnailName, function(err) {
					if (err) {
						res.json({error: err, message: "error deleting the thumbnail"});
					}
				});
			}

			if (resource.type === "file") {
				fs.unlink(__dirname + "/resource_library/" + resource.fileName, function(err) {
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

});

app.post('/update-resource', function(req,res) {
	var updates = {};
	if (req.body.title) {
		updates.title = req.body.title;
	}
	if (req.body.description) {
		updates.description = req.body.description;
	}
	if (req.body.category) {
		updates.category = req.body.category;
	}
	Resource.findByIdAndUpdate(req.body.id, updates, function(err, resource) {
		if (err) {
			res.json({error: err, message: "error updating the file"});
		} else {
			res.json({error:null, message: "successs"});
		}
	});

});


app.post('/upload-url', function(req, res) {
	if (uploadedComplete === true) {
		uploadedComplete = false;
		var postData = JSON.parse(req.body.data);

		var newResource = new Resource({
			title: postData.title,
			description: postData.description,
			url: postData.url,
			thumbnail: ":" + port + "/resource-library/" + req.files.thumbnail.name,
			thumbnailName: req.files.thumbnail.name,
			category: postData.category,
			type: "url"
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



app.post('/upload-file', function(req, res) {
	if (uploadedComplete === true) {
		uploadedComplete = false;
		var postData = JSON.parse(req.body.data);
		var newResource = new Resource({
			title: postData.title,
			description: postData.description,
			url: ":" + port + "/resource-library/" + req.files.aFile.name,
			fileName: req.files.aFile.name,
			thumbnail: ":" + port + "/resource-library/" + req.files.thumbnail.name,
			thumbnailName: req.files.thumbnail.name,
			category: postData.category,
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

app.get('/get-categories', function(req, res) {
	Resource.distinct("category", function(err, categories) {
		if (err) {
			res.json({error: err, message: "error getting all categories"});	
		} else {
			res.json({error: null, message: "successs", data: categories});	
		}
	});
});



app.listen(port);
console.log('Magic happens on port ' + port);
