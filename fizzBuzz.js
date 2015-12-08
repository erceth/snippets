

function fizzBuzz(limit) {
    limit = (limit) ? limit : 100;
    var output;
    for (var i = 1; i < limit; i++) {
        output = "";
        if (i % 3 === 0) {
            output += "Fizz";
        }
        if (i % 5 === 0) {
            output += "Buzz";
        }
        if (output) {
            console.log(i, output);    
        }
    }
}

fizzBuzz(16);
