angular.module('penocApp')
  .directive('eventResults', ['EventsService', function (EventsService) {

      //The directive object to return when compiling
      var directive = {};

      //only match elements with this name
      directive.restrict = 'E';

      //URL of template html to render
      directive.template = '<div ng-repeat="course in courseList">id: {{course.id}}</div>'
      directive.replace = false;
      //need this line to set up an isolate scope
      directive.scope = {};

      //function that is called when binding to DOM
      directive.link = function (scope, element, attrs) {
          //scope.eventID = attrs.eventid;
          //alert('link EventResult ' + scope.eventID);
          scope.courseList = [{ id: Math.random() }, { id: Math.random() }, { id: Math.random()}];
      };

      //return the directive object
      return directive;
  } ]);