angular.module('penocApp')
  .directive('resultList', ['EventsService', function (EventsService) {

      //The directive object to return when compiling
      var directive = {};

      //only match elements with this name
      directive.restrict = 'E';

      //URL of template html to render
      directive.templateUrl = 'Directives/ResultList.html'
      directive.replace = false;
      //need this line to set up an isolate scope
      directive.scope = {};

      //function that is called when binding to DOM
      directive.link = function (scope, element, attrs) {
          scope.courseID = attrs.courseid;
          alert('link Result List ' + scope.courseID);
          scope.resultList = EventsService.loadResults(scope.courseID);
      };

      //return the directive object
      return directive;
  } ]);
