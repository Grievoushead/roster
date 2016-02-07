angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array



  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }];



  var ref = new Firebase('https://groster.firebaseio.com/roster');

  /*ref.push({
    id: 1,
    name: 'Ben Sparrow 2',
    lastText: '2 You on your way?',
    face: 'img/ben.png'
  });*/

  var service = {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    },

    callbacks: [],
    onData: function(callback){
      service.callbacks.push(callback);
    }
  };

  // Retrieve new posts as they are added to our database
  ref.on("child_added", function(snapshot, prevChildKey) {
    var data = snapshot.val();
    angular.forEach(service.callbacks, function(cb){
      cb(data);
    });
  });

  return service;
});
