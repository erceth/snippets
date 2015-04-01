angular.module('tools.ResourceLibrary', [])


.controller('ResourceLibraryCtrl', function($scope, uniApi ) {

    function getResources() {
        uniApi.getResources(function(data) {
            $scope.resources = data.data;
        });    
    }
    getResources();
    

    $scope.deleteResource = function(id) {
        var answer = confirm("confirm_resource_delete"); //TODO: translate
        if (answer) {
            uniApi.deleteResource(id, function () {
                getResources();
            });
        }
    };





})

;