angular.module('tools.ResourceLibraryAddRes', ['angularFileUpload'])

/**
 * And of course we define a controller for our route.
 */
.controller('ResourceLibraryAddResCtrl', function addResourceCtrl($scope, uniApi) {
    $scope.uploadDetails = {
        title: "",
        description: "",
        url: ""
    };
    $scope.feedback = [];

    $scope.upload = function() {
        $scope.feedback = [];
        if (!$scope.uploadDetails.title) {
            $scope.feedback.push("title_missing");
        }
        if (!$scope.uploadDetails.description) {
            $scope.feedback.push("description_missing");
        }
        if ($scope.feedback.length > 0) {return;}
        uniApi.uploadUrl($scope.uploadDetails);
    };

    $scope.uploadFile = function() {
        var inputElement = angular.element("#uploadFile");
        uniApi.uploadFile(inputElement, $scope.uploadDetails, function() {
            
        });
    };




    //function for removing hex code from object
    // $scope.ngObjFix = function(ngObj) {
    //     var output;
    //     output = angular.toJson(ngObj);
    //     output = angular.fromJson(output);
    //     return output;
    // };
    // $scope.Resources = $scope.Resources || {};
    // $scope.categories = $scope.current.categories || {};


    // if ($scope.current.EditResource === 0) {
    //     $scope.Resources = {};
    //     $scope.Resources.type = 1; //for default checked file input
    //     $scope.CategoryID = $scope.CategoryID || 0;
    // } else {
    //     $scope.ResourcesData = [];
    //     $scope.tmpData = $scope.current.resources;
    //     $scope.ResourcesData = _.filter($scope.tmpData, function(Obj) {
    //         return Obj.resourceID == $scope.current.resourceID;
    //     });
    //     $scope.Resources = $scope.ngObjFix($scope.ResourcesData[0]);
    //     if ($scope.Resources.youtube_url) {
    //         var remove_v = $scope.Resources.youtube_url;
    //         $scope.Resources.youtube_url = remove_v.substring(3, remove_v.length);
    //     }

    //     $scope.CategoryID = parseInt($scope.Resources.CategoryID, 10);
    //     $scope.Resources.type = $scope.Resources.type;
    // }

    // $scope.onFileSelect = function($files) {
    //     $scope.Resources.file = $files[0];
    // };
    // $scope.back = function() {
    //     $location.path("/tools/resource-library");
    // };
    // $scope.save = function() {
    //     $rootScope.loaded = false;
    //     var JsonReq = {};
    //     $scope.Resources.CategoryDescription = "";
    //     $scope.Resources.Category = _.filter($scope.current.categories, function(obj) {
    //         if (obj.CategoryID === parseInt($scope.CategoryID, 10)) {
    //             var desc = obj.CategoryDescription;
    //             return desc;
    //         } else {
    //             return null;
    //         }
    //     });

    //     var today = new Date();
    //     var dd = today.getDate();
    //     var mm = today.getMonth() + 1; //January is 0!
    //     var yyyy = today.getFullYear();
    //     if (dd < 10) {
    //         dd = '0' + dd;
    //     }
    //     if (mm < 10) {
    //         mm = '0' + mm;
    //     }
    //     today = mm + '-' + dd + '-' + yyyy;

    //     if ($scope.CategoryID !== null || $scope.CategoryID !== undefined) {

    //         //you tube
    //         if (parseInt($scope.Resources.type, 10) === 0) {
    //             $scope.Resource = {
    //                 'title': $scope.Resources.title,
    //                 'description': $scope.Resources.description,
    //                 'CategoryID': parseInt($scope.CategoryID, 10),
    //                 'CategoryDescription': $scope.Resources.Category[0].CategoryDescription,
    //                 'youtube_url': $scope.Resources.youtube_url,
    //                 'url': $scope.Resources.youtube_url,
    //                 'type': 0,
    //                 'date': today
    //             };
    //             if ($scope.current.EditResource === 0) {
    //                 $scope.responseBean = $hydraService.addResources($scope.Resource);
    //                 $scope.responseBean.set_complete_cb(function(bean) {
    //                     if (bean.error) {
    //                         alert(bean.error);
    //                     } else if (bean !== undefined || bean.data !== null) {
    //                         $scope.responseBean = bean.data;
    //                         $rootScope.loaded = true;
    //                         alert('Resources have been added..!!');
    //                         $location.path('/tools/resource-library');
    //                     }
    //                 });
    //             } else {
    //                 $scope.Resource.resourceID = $scope.current.resourceID;
    //                 $scope.responseBean = $hydraService.updateResources($scope.Resource);
    //                 $scope.responseBean.set_complete_cb(function(bean) {
    //                     if (bean.error) {
    //                         alert(bean.error);
    //                     } else if (bean !== undefined || bean.data !== null) {
    //                         $scope.responseBean = bean.data;
    //                         $rootScope.loaded = true;
    //                         alert('Resources have been updated..!!');
    //                         $location.path('/tools/resource-library');
    //                     }
    //                 });
    //             }
    //         } else {
    //             //fileUpload
    //             $scope.Resource = {
    //                 'title': $scope.Resources.title,
    //                 'description': $scope.Resources.description,
    //                 'CategoryID': parseInt($scope.CategoryID, 10),
    //                 'CategoryDescription': $scope.Resources.Category[0].CategoryDescription,
    //                 'youtube_url': 'file_upload',
    //                 'url': '',
    //                 'type': $scope.Resources.type,
    //                 'date': today
    //             };
    //             if ($scope.current.EditResource === 0) {
    //                 //add upload
    //                 var $file = $scope.Resources.file;
    //                 var sFileName = $file.name;
    //                 $scope.Resource.url = sFileName;
    //                 var sFileExtension = sFileName.split('.')[sFileName.split('.').length - 1].toLowerCase();
    //                 if (sFileExtension === "pdf" || sFileExtension === "doc" || sFileExtension === "docx") {
    //                     $scope.Resource.type = 2;
    //                 } else if (sFileExtension === "jpg" || sFileExtension === "png" || sFileExtension === "jpeg" || sFileExtension === "bmp") {
    //                     $scope.Resource.type = 1;
    //                 } else {
    //                     $scope.Resource.type = 3;
    //                 }
    //                 JsonReq = {
    //                     'JsonData': $scope.Resource
    //                 };
    //                 JsonReq.Operation = 0;
    //                 $scope.upload = $upload.upload({
    //                     url: supplementalApiUri + '/upload',
    //                     method: 'POST',
    //                     withCredential: true,
    //                     data: JsonReq,
    //                     file: $file
    //                 }).success(function(data, status, headers, config) {
    //                     $rootScope.loaded = true;
    //                     alert('Resources have been updated..!!');
    //                     $location.path("/tools/resource-library");
    //                 }).error(function(data, status, headers, config) {
    //                     alert('error');
    //                     //alert(data);
    //                 });
    //             } else {
    //                 //update upload
    //                 $scope.Resource.resourceID = $scope.current.resourceID;
    //                 $scope.responseBean = $hydraService.updateResources($scope.Resource);
    //                 $scope.responseBean.set_complete_cb(function(bean) {
    //                     if (bean.error) {
    //                         alert(bean.error);
    //                     } else if (bean !== undefined || bean.data !== null) {
    //                         $scope.responseBean = bean.data;
    //                         $scope.loaded = true;
    //                         alert('Resources have been updated..!!');
    //                         $location.path("/tools/resource-library");
    //                     }
    //                 });
    //             }

    //         }
    //     }
    // };
});
