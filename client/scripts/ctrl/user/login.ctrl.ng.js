app.controller('loginCtrl',['$scope','$state',function($scope,$state){

  $scope.roomNumber = '';
  $scope.nickname = '';

  $scope.enterRoom = function(){
    console.log($scope.roomNumber);
    console.log($scope.nickname);
    localStorage.setItem('nickname',$scope.nickname);
    $state.go('chatroom',{roomNumber:$scope.roomNumber})
  }
}])