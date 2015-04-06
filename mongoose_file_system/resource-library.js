    angular.module('tools.ResourceLibrary', [])

.controller('ResourceLibraryCtrl', function($scope, uniApi, $location, $state ) {

    $scope.selectedCategory = "all";

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

    $scope.editResource = function(id) {
        $state.go("resource-library-edit-res", {resourceid:id});
    };

    $scope.host = $location.host();
    

    $scope.$on("resource_library_select_resource", function(event, selectedCategory) {
            $scope.selectedCategory = selectedCategory;
    });

    $scope.filterByCategory = function(item) {
        if ($scope.selectedCategory === "all") {
            return true;
        }

        return item.category === $scope.selectedCategory;
    };

})

;
