//-------------Event Notice Controller-------------------

angular.module('penocApp').controller('EventNotice', ['$scope', 'EventsService', function named($scope, EventsService) {
    $scope.currentEventID = 0;

    //----------------------------------------------------------------------------
    $scope.loadCurrentEvent = function () {
        $scope.event = EventsService.loadEvent($scope.currentEventID);
    };

    //----------------------------------------------------------------------------
    $scope.nextEvent = function () {
        $scope.currentEventID++;
        $scope.loadCurrentEvent();
    };

    //----------------------------------------------------------------------------
    $scope.previousEvent = function () {
        $scope.currentEventID--;
        $scope.loadCurrentEvent();
    };

    //----------------------------------------------------------------------------
    $scope.currentEventID = EventsService.nextEventID();
    $scope.loadCurrentEvent();

    //----------------------------------------------------------------------------

} ]);