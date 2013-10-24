'use strict';
angular
  .module('todoApp', ['goinstant'])
  .config(function(platformProvider) {
    platformProvider.set('https://goinstant.net/mattcreager/DingDong');
  })
  .controller('TodoCtrl', function($scope, GoAngular) {

    // Init GoAngular
    new GoAngular($scope, 'BinDing', { include: ['todos'] }).initialize();

    $scope.todos = [];

    $scope.addTodo = function() {
      $scope.todos.push({
        description: $scope.newTodo,
        complete: false
      });
    };

    $scope.removeTodo = function(todo) {
      $scope.todos.splice($scope.todos.indexOf(todo), 1);
    };

  });
