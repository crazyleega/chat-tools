app.factory('socketService',['$rootScope',function($rootScope){
  return {
    connectSocket: function(){
      if(!$rootScope.socket){
        $rootScope.socket = require('socket.io-client')(`http://localhost:8080`);

        $rootScope.socket.on('connect', function() {
          console.log('Client connected');

          if(localStorage.getItem('nickname')){
            $rootScope.socket.emit('new user',localStorage.getItem('nickname'));
          }

          $rootScope.socket.on('notify',function(msg){
            console.log(msg);
            console.log('client get msg'+msg);
            //TODO 通过type区别 是什么类型的通知
            if(msg.roomNumber == $rootScope.roomNumber){
              $rootScope.safeApply(function(){
                $rootScope.messageList.push(msg);
              })
            }

          });

          $rootScope.socket.on('system message',function(msg,userList){
            $rootScope.safeApply(function(){
              //通过isPublic 判断是否是系统通知
              $rootScope.messageList.push({_id:new Date().getTime(),content:msg,isPublic:true});
              $rootScope.userList = userList;
            })
          })
        });
        $rootScope.socket.on('disconnect', function() {
          console.log('Client disconnected');
        })
      }
      ;
    }
  }
}])