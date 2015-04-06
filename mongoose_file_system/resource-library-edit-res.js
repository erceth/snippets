angular.module('tools.ResourceLibraryEditRes', ['angularFileUpload'])

/**
 * And of course we define a controller for our route.
 */
.controller('ResourceLibraryEditResCtrl', function ($scope, uniApi, $state, $stateParams) {

    $scope.editMode = false;

    $scope.uploadDetails = {
        id: "",
        title: "",
        description: "",
        url: "",
        category: ""
    };

    $scope.options = {
        category: "select_category"
    };

    $scope.feedback = [];


    //edit mode
    if ($stateParams.resourceid) {
        uniApi.getSingleResource($stateParams.resourceid, function(data, status, headers, config) {
            $scope.editMode = true;
            $scope.uploadDetails = {
                id: data.data._id,
                title: data.data.title,
                description: data.data.description,
                url: data.data.url,
                category: data.data.category
            };
        });

    }
    

    uniApi.getCategories(function(data) {
        $scope.categories = data.data;
    });

    $scope.update = function () {
        uniApi.updateResource($scope.uploadDetails, function(response) {
            alert("updated");
        });
    };
});
