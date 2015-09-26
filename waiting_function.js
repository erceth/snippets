//handy waiting function
function wait (timesToCheck, timeToWait, isItTimeYetFn, scope, callback) {
	var self = this;
	timesToCheck -=1;
	if (timesToCheck <= 0) {
		console.log("time expired");
		return;
	}
	setTimeout(function() {
		if (isItTimeYetFn.call(scope)) {
			callback();
		} else {
			self.wait(timesToCheck, timeToWait, isItTimeYetFn, scope, callback);
		}
	}, timeToWait);
}