app.controller('chatCtrl',['$scope','dbService','$rootScope',function($scope,dbService,$rootScope){
  console.log('is in chat ctrl');

  $scope.nickname = '';
  $scope.content = '';
  $scope.messageList = [];

  //1、get data from server
  //2、sync New data to server

  console.log(navigator.userAgent.indexOf("compatible") > -1 && navigator.userAgent.indexOf("MSIE") > -1 || navigator.userAgent.indexOf("Firefox") > -1);
  $scope.submit = function(){
    console.log($scope.nickname);
    console.log($scope.content);
    let time = Date.now();
    dbService.insertMessage({
      nickname:$scope.nickname,
      content:$scope.content,
      time:time
    },function(res){
      console.log(res);
      $rootScope.safeApply(function(){
        $scope.messageList.push({
          time:time,
          content:$scope.content,
          nickname:$scope.nickname
        })
      })


    },function(error){
      console.error(error);
    })
  }
}])