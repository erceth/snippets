angular.module("promises", []).config(config).controller("AppCtrl", AppCtrl);

function config() {

}

function AppCtrl($q) {

    /*
     *	async call returns a promise using $q
     */
    function asyncCall(input) {
        var deferred = $q.defer();
        setTimeout(function() {
            if (input === 0) {
                deferred.resolve("resolved");
            } else if (input === 1) {
                deferred.reject("reject");
            } else {
                deferred.notify("notify");
                deferred.notify("notify");
                deferred.notify("notify");
                deferred.resolve("resolved");
            }
        }, 3000);
        return deferred.promise;
    }

    var asyncInput1 = 0;
    var asyncInput2 = 1;
    var asyncInput3 = 2;

    //example1(asyncInput1);
    //example2(asyncInput1);
    //example3(asyncInput1);
    //example4(asyncInput1);
    //example5(asyncInput1);
    example6(asyncInput1);


    function example1(asyncInput) {
        var promise = asyncCall(asyncInput);
        promise.then(function(response) {
            console.log("resolve function " + response);
        }, function(response) {
            console.log("reject function " + response);
        }, function(response) {
            console.log("notify function " + response);
        });
    }

    function example2(asyncInput) {
        asyncCall(asyncInput).then(function(input) {
            console.log(input);
            return 1;
        }).then(function(input) {
            console.log(input);
            return 2;
        }).then(function(input) {
            console.log(input)
        });
    }

    function example3(asyncInput) {
    	asyncCall().then(function(response) {
    		return $q.reject("my-failure-reason"); //reject in the success callback
    	}).then(function(results) {
    		console.log("code never gets here");
    	}, function(error) {
    		console.log(error);
			// error === "my-failure-reason"
    	})
    }

    function example4(asyncInput) {
    	asyncCall().then(function(response) {
    		console.log(response);
    		return response;
    	}).finally(function(response) {
    		console.log(response);
    	});
    }

    //just for fun
    function example5(asyncInput) {
    	asyncCall().finally(function() {
    		console.log("first");
    	}).finally(function() {
    		console.log("second");
    	}).then(function() {
    		console.log("third");
    	}).finally(function() {
    		console.log("fourth");
    	}).then(function() {
    		console.log("fifth");
    	});
    }

    function example6(asyncInput) {
    	asyncCall().then(function(results) {
    		throw "my-failure-reason"; //similar to $q.reject()
    	}).then(function() {
    		console.log("code never gets here");
    	}, function(error) {
    		console.log(error); //error === "my-failture-reason"
    	});
    }






}