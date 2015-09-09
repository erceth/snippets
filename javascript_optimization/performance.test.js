scope.videoToggle = function(camera) {
    var source = $rootScope.streamingUrl + 'camera?id_camera=' + camera.id;
    var imgTags = $(element).find('img'),
        playing;

    // Is the player playing?
    if (angular.isDefined(camera.playing)) {
        playing = camera.playing;
    } else {
        playing = false;
    }

    var imgIndex = 0;
    var imgCount = 0;
    var latestReturnedImg = -1;
    var imgSet = $(element).find('.player-container[name="' + camera.name + '"] img');
    var modulus = imgSet.length;

    var t0 = 0;
    var t1 = 0;
    if (!playing) {
        camera.playing = true;
        camera.playerInterval = $interval(function() {
            var localImgCount = imgCount++;
            t0 = performance.now(); //start timer

            var count = new Date().valueOf()

            //fake high latency
            if (Math.floor(Math.random() * 10) < 8) {
                (function() {
                    var tempImgIndex = imgIndex;
                    $timeout(function() {
                        imgSet[tempImgIndex].src = source + '&rnd' + count; //load imgIndex
                    }, Math.floor(Math.random() * 1000 + 500));
                })();

            } else {
                imgSet[imgIndex].src = source + '&rnd' + count; //load imgIndex
            }

            //real latency
            //imgSet[imgIndex].src = source + '&rnd' + count; //load imgIndex

            imgSet[imgIndex].onload = function() {
                if (localImgCount > latestReturnedImg) { //if later than latest
                    latestReturnedImg = localImgCount;
                    this.style.zIndex = imgCount //show oldest imgIndex
                } else {
                    console.error("frame skipped", localImgCount, latestReturnedImg, imgCount);
                }
            };

            imgIndex = ++imgIndex % modulus;

            t1 = performance.now(); //end timer
            console.log('Took', (t1 - t0).toFixed(4), 'milliseconds to cycle');
        }, 333);

        scope.videoTimout(camera, element);
    } else {
        scope.destroyVideo(camera, element);
    }

}