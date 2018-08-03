import loginUrl from '../templates/user/login.ng.html'
import chatUrl from  '../templates/chat/chat.ng.html';

app.config(["$stateProvider", "$urlRouterProvider", "$locationProvider", function($stateProvider, $urlRouterProvider, $locationProvider) {

  $stateProvider
      .state('chatroom', {
        url: '/chatroom/:roomNumber',
        templateUrl: chatUrl,
        controller:'chatCtrl'
      })
      .state('login', {
        url: '/login',
        templateUrl: loginUrl,
        controller:'loginCtrl'
      })

  $urlRouterProvider.otherwise('/login');
  $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix('!');
}]);
