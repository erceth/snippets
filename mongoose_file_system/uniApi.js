angular.module("services.uniApi", ['lr.upload']) //https://github.com/leon/angular-upload

.factory('uniApi', function ($http, $resource, upload) {
    var url = "http://localhost:5555";
    return {

        test: function() {
            $http.get(url + "/").success(function(data, status, headers, config) {
                console.log(data);
            });
        },
        getResources: function(callback) {
            $http.get(url + "/get-resources").success(function(data, status, headers, config) {
                callback(data, status, headers, config);
            });
        },
        deleteResource: function(id, callback) {
            $http.post(url + "/delete-resource", {id:id}).success(function(data, status, headers, config) {
                callback();
            });
        },
        uploadFile: function(file, data, callback) {
            upload({
                url: url + "/upload-file",
                method: 'POST',
                    data: {
                        data: JSON.stringify(data),
                        aFile: file // a jqLite type="file" element, upload() will extract all the files from the input and put them into the FormData object before sending.
                    }
                }).then(
                    function(response) {
                        console.log(response.data); // will output whatever you choose to return from the server on a successful upload
                    },
                    function(response) {
                        console.error(response); //  Will return if status code is above 200 and lower than 300, same as $http
                    }
                );
        },
        uploadUrl: function(data) {
            console.log(data);
            $http.post(url + "/upload-url", data).success(function(data, status, headers, config) {
                console.log(data);
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