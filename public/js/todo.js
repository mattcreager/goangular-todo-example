/* jshint browser: true */
/* globals angular, _ */

(function() {
'use strict';

var app = angular.module('todoApp', ['goangular']);

app.config(function($goConnectionProvider) {
  $goConnectionProvider.$set('https://goinstant.net/mattcreager/DingDong');
});

app.controller('TodoCtrl', function($scope, $goKey) {
  $scope.todos = $goKey('BinDing').$sync();

  window.todos = $scope.todos;

  $scope.addTodo = function() {
    $scope.todos.$add({
      description: $scope.newTodo,
      complete: false,
      timestamp: new Date().getTime()
    });
  };

  $scope.removeTodo = function(id) {
    $scope.todos.$key(id).$remove();
  };

  $scope.clearCompleted = function() {
    _.each($scope.todos.$omit(), function(todo, id) {
      if (todo.complete === true) {
        $scope.todos.$key(id).$remove();
      }
    });
  };

  $scope.completeTodo = function(id) {
    var complete = $scope.todos[id].complete;
    $scope.todos.$key(id).$key('complete').$set(complete);
  };
});

})();
