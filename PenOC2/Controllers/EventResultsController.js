//-------------Event Results Controller-------------------

angular.module('penocApp').controller('EventSummary', ['$scope', 'EventsService', function named($scope, EventsService) {

    //----------------------------------------------------------------------------
    $scope.loadEvent = function (intEventID) {
        $scope.event = EventsService.loadEvent(intEventID);
    };

    //----------------------------------------------------------------------------
    $scope.nextEvent = function () {
        $scope.loadEvent($scope.event.eventID + 1);
    };

    //----------------------------------------------------------------------------
    $scope.previousEvent = function () {
        $scope.loadEvent($scope.event.eventID - 1);
    };

    //----------------------------------------------------------------------------
    $scope.loadEvent(EventsService.mostRecentEventID());

    //----------------------------------------------------------------------------

} ]);