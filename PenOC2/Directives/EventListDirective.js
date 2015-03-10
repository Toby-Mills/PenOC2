angular.module('penocApp')
  .directive('eventList', ['EventsService', function (EventsService) {

      //The directive object to return when compiling
      var directive = {};

      //only match elements with this name
      directive.restrict = 'E';

      //URL of template html to render
      directive.templateUrl = 'Directives/EventListDirective.html'
      directive.replace = true;
      //need this line to set up an isolate scope
      directive.scope = {};

      //function that is called when binding to DOM
      directive.link = function (scope, element, attrs) {
          scope.eventCount = attrs.eventcount;
          scope.direction = attrs.direction;
          if (scope.direction == 'past') {
              scope.eventList = EventsService.recentEvents(scope.eventCount);
          }
          if (scope.direction == 'future') {
              scope.eventList = EventsService.upcomingEvents(scope.eventCount);
          }
      };

      //return the directive object
      return directive;

  } ]);
