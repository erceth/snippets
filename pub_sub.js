(function() {
    /*variables*/
    var EVENT_INTERVAL = 2000;
    var model = {};
    var subscribableEvents = {"event1":"event1", "event2":"event2"};


    function generateEvents(eventName) {
        setInterval(function() {
            var data = generateData();
            publish(eventName, data);

        }, EVENT_INTERVAL);
    }


    /*public functions*/
    function subscribe(eventName, func) {
        if (eventName && !subscribableEvents[eventName]) {
            console.error("cannot subscribe to event: ", eventName);
            return;
        }

        if(!model[eventName]){
            model[eventName] = [];
        }
        var index = model[eventName].push(func);
        index = index - 1;
        return {
            delete: function() {
                model[eventName].splice(index, 1);
            }
        }
    }


    /*private functions*/
    function publish(eventName, data) {
        var functions = model[eventName];
        if (functions) {
            for (var j = 0; j < functions.length; j++) {
                functions[j](data);
            }
        }
        
    }
    
    function generateData() {
        return "" + Math.floor(Math.random() * 10000000); //temp id
    }



    /*init*/
    (function () {
        var event1 = subscribableEvents["event1"];
        var event2 = subscribableEvents["event2"];

//         subscribe(event1, function(data) {
//             console.log("The latest event it: " + data);
//         });

//         subscribe(event2, function(data) {
//             console.log("asdf: " + data);
//         });

//         subscribe("nope", function(data) {
//             console.log("asdf: " + data);
//         });

        var delSub = subscribe(event1, function(data) {
            console.log("Only here for a little bit: " + data);
        });

        setTimeout(function() {
            delSub.delete();
        }, 5000);
        

        generateEvents(event1);
        generateEvents(event2);
    })();


})();