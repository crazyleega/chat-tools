app.controller('chatCtrl',['$scope','dbService','$rootScope','$stateParams','$state',function($scope,dbService,$rootScope,$stateParams,$state){

  $scope.roomNumber = $stateParams.roomNumber;
  $rootScope.roomNumber = $scope.roomNumber;
  $scope.nickname = '';
  if(localStorage.getItem('nickname')){
    $rootScope.safeApply(function(){
      $scope.nickname = localStorage.getItem('nickname')
    })
  }else{
    $state.go('/')
  }
  $scope.content = '';
  $rootScope.messageList = [];

  ///type  1 私聊   2  群聊
  $scope.submit = function(){
    let time = Date.now();
    dbService.insertMessage({
      dbName:$scope.roomNumber,
      type:2,
      nickname:$scope.nickname,
      content:$scope.content,
      time:time
    },function(res){
      console.log(res);
      if(res.ok){
        let message = {
          content:$scope.content,
          nickname:$scope.nickname,
          time:time,
          _id:res.id,
          roomNumber: $scope.roomNumber
        }
        $rootScope.safeApply(function(){
          $rootScope.messageList.push(message)
          $rootScope.socket.emit('new message',message);
          $scope.content = '';
        })
        dbService.syncToServer($scope.roomNumber);
      }
    },function(error){
      console.error(error);
    })
  }


  $scope.getMessagesFromServer = function(){
    dbService.getMessageFromServer($scope.roomNumber,function(error,result){
      if(!error){
        console.log(result);
        $rootScope.safeApply(function(){
          //$rootScope.messageList = result.rows;
          $rootScope.messageList = result.docs;
        })
      }
    });
  }

  $scope.getAllUser = function(){
    Meteor.call('getAllUser',(error, result) => {
      if(!error){
        $rootScope.safeApply(function(){
          //console.log(result);
          $rootScope.userList = result
        })
      }
    })
  }

  $scope.getAllUser();
  $scope.getMessagesFromServer();

  //$scope.$on("$destroy",function(){
  //  console.log('is in ')
  //  dbService.syncToServer($scope.roomNumber);
  //})

}])