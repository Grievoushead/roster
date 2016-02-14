/*
<fab-button></fab-button>

Will add fab-button component
Click on button will raise event
*/

angular.module('groster.fabButton', [])
  .constant('fabButtonEvents', {
    'CLICK': 'fab-click'
  })
  .directive('fabButton',['fabButtonBus', 'fabButtonEvents', function(bus, events){
    var EVENTS = {
      CLICK: 'fab-click'
    };

    return {
        restrict: 'E',
        templateUrl: 'js/fab-button/fab-button.html',
        scope: {
          id: '@',
          icon: '@'
        },
        link: function($scope, elm, attr){
          $scope.click = function(){
            bus.emit(attr.id + '-' + events.CLICK, {data: 'test'});
          };
        }
      };
  }])
  .service('fabButtonBus', function(){
    var Bus = function(){
      var subscribers = {};
      this._getSubscribers = function(){
        return subscribers;
      };
    };

    Bus.prototype.subscribe = function(event, fn){
      var subscribers = this._getSubscribers();
      subscribers[event] = subscribers[event] || [];

      subscribers[event].push(fn);

      // return dispose func
      return function(){
        // remove last fn from array
        // since push add items to the end
        subscribers[event].pop();
      };
    };

    Bus.prototype.emit = function(event, args){
      var subscribers = this._getSubscribers()[event];
      if (subscribers && subscribers.length) {
        var i=0;
        do {
          subscribers[i](args);
          i++;
        } while (i < subscribers.length)
      }
    };

    return new Bus();
  });
