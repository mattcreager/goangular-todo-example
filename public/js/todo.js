/* global _ , angular*/

'use strict';

angular
  .module('todoApp', ['goangular'])
  .config(function($goConnectionProvider) {
    $goConnectionProvider.$set('https://goinstant.net/mattcreager/DingDong');
  })
  .controller('TodoCtrl', ['$scope', '$goKey', function($scope, $key) {
    $scope.todos = $key('todos');
    $scope.todos.$sync();

    $scope.addTodo = _.throttle(function() {
      var desc = $scope.newTodo;

      if (desc === undefined || desc === '') {
        return;
      }

      $scope.todos.$add({
        timestamp: new Date().getTime(),
        description: desc,
        complete: false
      }).then(function() {
        $scope.$apply(function() {
          $scope.newTodo = '';
        });
      });
    }, 100);

    $scope.changeStatus = function(key) {
      var status = !$scope.todos[key].complete;

      $scope.todos[key].pendingUpdate = true;
      $scope.todos.$key(key + '/complete').$set(status);
    };

    $scope.removeTodo = function(key) {
      $scope.todos.$key(key).$remove();
    };
  }]);
