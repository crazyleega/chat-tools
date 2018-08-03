app.controller('chatCtrl',['$scope','dbService','$rootScope','$stateParams',function($scope,dbService,$rootScope,$stateParams){

  $scope.roomNumber = $stateParams.roomNumber;
  $scope.nickname = '';
  if(localStorage.getItem('nickname')){
    $rootScope.safeApply(function(){
      $scope.nickname = localStorage.getItem('nickname')
    })
  }
  $scope.content = '';
  $scope.messageList = [];

  // chat-room
  //  1、input nickname，room number
  //  2、start chat



  ///type  1 私聊   2  群聊
  $scope.submit = function(){
    console.log($scope.nickname);
    console.log($scope.content);
    let time = Date.now();
    dbService.insertMessage({
      dbName:$scope.roomNumber,
      type:2,
      nickname:$scope.nickname,
      content:$scope.content,
      time:time
    },function(res){
      console.log(res);
      $rootScope.safeApply(function(){
        //$scope.messageList.push({
        //  time:time,
        //  content:$scope.content,
        //  nickname:$scope.nickname
        //})
      })
      dbService.syncToServer($scope.roomNumber);

    },function(error){
      console.error(error);
    })
  }


  $scope.getMessagesFromServer = function(){
    dbService.getMessageFromServer($scope.roomNumber,function(error,result){
      if(!error){
        $rootScope.safeApply(function(){
          $scope.messageList = result.rows;
        })
      }
    });
  }

  $scope.getMessagesFromServer();
}])