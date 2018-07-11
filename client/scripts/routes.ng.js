import chatUrl from  '../templates/chat/chat.ng.html';

app.config(["$stateProvider", "$urlRouterProvider", "$locationProvider", function($stateProvider, $urlRouterProvider, $locationProvider) {

  $stateProvider
      .state('/', {
        url: '/',
        templateUrl: chatUrl,
        controller:'chatCtrl'
      })

  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix('!');
}]);
