angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats, $timeout, ionicMaterialInk, ionicMaterialMotion) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  $scope.$on('$ionicView.enter', function(e) {
    ionicMaterialInk.displayEffect();
    ionicMaterialMotion.ripple();
  });


  $scope.chats = Chats.all();

  $scope.remove = function(chat) {
    Chats.remove(chat);
  };

  $scope.doRefresh = function(){
    $timeout(function(){
      var first = angular.copy($scope.chats[0]);
      $scope.chats.push(first);
      // Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    }, 3000);
  };

  Chats.onData(function(data){
    debugger
    $timeout(function(){
      $scope.chats.push(data);
    }, true);
  });
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
