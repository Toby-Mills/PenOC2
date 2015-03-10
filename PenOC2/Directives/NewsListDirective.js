angular.module('penocApp')
  .directive('newsList', ['NewsService', function (NewsService) {

      //The directive object to return when compiling
      var directive = {};

      //only match elements with this name
      directive.restrict = 'E';

      //URL of template html to render
      directive.templateUrl = 'Directives/NewsListDirective.html'

      //need this line to set up an isolate scope
      directive.scope = {};

      //function that is called when binding to DOM
      directive.link = function (scope, element, attrs) {
          scope.count = attrs.count;
          scope.newsList = NewsService.recentNews(scope.count);
      };

      //return the directive object
      return directive;

  } ]);
