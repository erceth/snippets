angular.module('tools.ResourceLibraryAddRes', ['angularFileUpload'])

/**
 * And of course we define a controller for our route.
 */
.controller('ResourceLibraryAddResCtrl', function addResourceCtrl($scope, uniApi, $state) {

    $scope.uploadDetails = {
        title: "",
        description: "",
        url: "",
        category: ""
    };
    $scope.feedback = [];

    $scope.options = {
        type: "url",
        category: "select_category"
    };

    uniApi.getCategories(function(data) {
        $scope.categories = data.data;
    });


    $scope.upload = function() {
        $scope.feedback = [];
        if (!$scope.uploadDetails.title) {
            $scope.feedback.push("title_missing");
        }
        if (!$scope.uploadDetails.description) {
            $scope.feedback.push("description_missing");
        }
        if ($scope.feedback.length > 0) {return;}

        if ($scope.options.type === "url") {
            uniApi.uploadUrl(angular.element("#thumbnail"), $scope.uploadDetails, function(response) {
                alert(response.message); //TODO: replace with translations
            });

        } else if ($scope.options.type === "file") {
            uniApi.uploadFile(angular.element("#uploadFile"), angular.element("#thumbnail"), $scope.uploadDetails, function(response) {
                alert(response.message); //TODO: replace with translations
            });
        }
    };
});
