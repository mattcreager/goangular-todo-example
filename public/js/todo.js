angular
  .module('todoApp', ['goinstant'])
  .config(function(platformProvider) {
    platformProvider.set('https://goinstant.net/mattcreager/DingDong');
  })
  .controller('TodoCtrl', function($scope, GoAngular) {
    'use strict';

    $scope.newTodo = '';
    $scope.todos = [];
    $scope.currentStatus = 'Show All';
    $scope.statusFilter = {};

    var goAngular = new GoAngular($scope, 'BinDing', { include: ['todos'] });
    goAngular.initialize();

    $scope.addTodo = function() {
      $scope.todos.push({
        description: $scope.newTodo,
        complete: false
      });

      $scope.newTodo = '';
    };

    $scope.removeTodo = function(todo) {
      $scope.todos.splice($scope.todos.indexOf(todo), 1);
    };

    $scope.incomplete = function() {
      var i = [];

      angular.forEach($scope.todos, function(todo) {
        if (!todo.complete) i.push(todo);
      });

      return i.length;
    };

    $scope.clearCompleted = function() {
      var oldTodos = $scope.todos;
      $scope.todos = [];

      angular.forEach(oldTodos, function(todo) {
        if (!todo.complete) $scope.todos.push(todo);
      });
    };

    $scope.newStatus = function(status) {
      $scope.currentStatus = status;

      switch (status) {
        case 'Show All':
          $scope.statusFilter = {};
          break;
        case 'Active':
          $scope.statusFilter.complete = false;
          break;
        case 'Completed':
          $scope.statusFilter.complete = true;
          break;
      }
    };
  });
