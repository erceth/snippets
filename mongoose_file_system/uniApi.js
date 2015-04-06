angular.module("services.uniApi", ['lr.upload'])

.factory('uniApi', function ($http, $resource, upload, $location) {

    var url = "http://localhost:5555";
    if (($location.absUrl()).indexOf("unicityqa") > -1 ) {
        url = "http://primebiz.ng.unicityqa.com:5555";
    }
    
    return {

        getResources: function(callback) {
            $http.get(url + "/get-resources").success(function(data, status, headers, config) {
                callback(data, status, headers, config);
            });
        },
        getSingleResource: function(resourceId, callback) {
            $http.get(url + "/get-resources/" + resourceId).success(function(data, status, headers, config) {
                callback(data, status, headers, config);
            });
        },
        deleteResource: function(id, callback) {
            $http.post(url + "/delete-resource", {id:id}).success(function(data, status, headers, config) {
                if (callback) {callback(data, status, headers, config);}
            });
        },
        updateResource: function(resourceDetails, callback) {
            $http.post(url + "/update-resource", resourceDetails).success(function(data, status, headers, config) {
                if (callback) {callback(data, status, headers, config);}
            });
        },
        uploadUrl: function(thumbnail, data, callback) {
            upload({
                url: url + "/upload-url",
                method: 'POST',
                    data: {
                        thumbnail: thumbnail, // a jqLite type="file" element, upload() will extract all the files from the input and put them into the FormData object before sending.
                        data: JSON.stringify(data)
                    }
                }).then(
                    function(response) {
                        if (response.data.error) {
                            console.error(response.data.error, response.data.message);
                        }
                        if (callback) {callback(response.data);}
                    },
                    function(response) {
                        console.error(response, "error uploading resource"); //  Will return if status code is above 200 and lower than 300, same as $http
                    }
                );

            // $http.post(url + "/upload-url", data).success(function(data, status, headers, config) {
            //     console.log(data);
            // });
        },
        uploadFile: function(file, thumbnail, data, callback) {
            upload({
                url: url + "/upload-file",
                method: 'POST',
                    data: {
                        aFile: file, // a jqLite type="file" element, upload() will extract all the files from the input and put them into the FormData object before sending.
                        thumbnail: thumbnail,
                        data: JSON.stringify(data)
                    }
                }).then(
                    function(response) {
                        if (response.data.error) {
                            console.error(response.data.error, response.data.message);
                        }
                        if (callback) {callback(response.data);}
                    },
                    function(response) {
                        console.error(response, "error uploading resource"); //  Will return if status code is above 200 and lower than 300, same as $http
                    }
                );
        },
        getCategories: function(callback) {
            $http.get(url + "/get-categories").success(function(data, status, headers, config) {
                callback(data, status, headers, config);
            });
        }
        


        
        // getAttendees: function(callback) {
        //     var request = $http.get('/api/data/9/2014');
        //     request.success(callback)
        //     .error(function () {
        //         console.error("error getting attendees")
        //     });
        // },
        // getAttendeeDetails: function(id, callback) {
        //     var request = $http.get('/api/attendee/' + id);
        //     request.success(callback)
        //     .error(function () {
        //         console.error("error getting attendee details");
        //     });
        // },
        // addMessage: function (params, callback) {
        //     var request = $http.post('/api/attendee/newmessage', params).success(callback)
        //     .error(function(){
        //         console.error("error adding message");
        //     });
            
            
        // },

        // deleteMessage: function(params, callback) {
        //     var request = $http.post('api/attendee/deletemessage', params).success(callback)
        //     .error(function() {
        //        console.error("error deleting message");
        //     });
        // }
    };
    
});