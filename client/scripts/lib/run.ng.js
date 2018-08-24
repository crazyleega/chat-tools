app.run(['$rootScope','socketService',function($rootScope,socketService){
  $rootScope.safeApply = function(fn) {
    var phase = $rootScope.$$phase;
    if(phase == '$apply' || phase == '$digest') {
      if(fn && (typeof(fn) === 'function')) {
        fn();
      }
    } else {
      this.$apply(fn);
    }
  };

  $rootScope.messageList = [];
  //Get notify 1、pub/sub
  //           2、MQ
  //           3、socketio
  //           4、etc...
   socketService.connectSocket();
}])