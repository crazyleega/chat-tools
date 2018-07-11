import angular from 'angular';
import 'angular-meteor';
import 'angular-ui-router';
app = angular.module('chat-tools',[
  'angular-meteor',
  'ui.router'
])

angular.element(document).ready(function(){
  angular.bootstrap(document, ["chat-tools"]);
});