app.factory('socketService',['$rootScope',function($rootScope){
  return {
    connectSocket: function(){
      if(!$rootScope.socket){
        $rootScope.socket = require('socket.io-client')(`http://localhost:8080`);

        $rootScope.socket.on('connect', function() {
          console.log('Client connected');

          $rootScope.socket.on('notify',function(msg){
            console.log(msg);
            console.log('client get msg'+msg);
            if(msg.roomNumber == $rootScope.roomNumber){
              $rootScope.safeApply(function(){
                $rootScope.messageList.push(msg);
              })
            }
          });
        });
        $rootScope.socket.on('disconnect', function() {
          console.log('Client disconnected');
        })
      }
      ;
    }
  }
}])