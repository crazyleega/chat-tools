app.controller('loginCtrl',['$scope','$state','$rootScope',function($scope,$state,$rootScope){

  $scope.roomNumber = '';
  $scope.nickname = '';

  $scope.enterRoom = function(){
    console.log($scope.roomNumber);
    console.log($scope.nickname);
    localStorage.setItem('nickname',$scope.nickname);

    $rootScope.socket.emit('new user',$scope.nickname);

    $state.go('chatroom',{roomNumber:$scope.roomNumber})
  }
}])