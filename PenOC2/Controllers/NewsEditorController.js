//-------------News Editor Controller-------------------

angular.module('penocApp').controller('NewsEditor', ['$scope', '$sce', function named($scope, $sce) {
    $scope.NewsTitle = "Test Title"
    $scope.NewsDate = ""
    $scope.NewsBody = ""
} ]);