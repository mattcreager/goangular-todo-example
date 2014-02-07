/* global _ , angular*/

'use strict';

angular
  .module('todoApp', ['goangular'])
  .config(function($goConnectionProvider) {
    $goConnectionProvider.$set('https://goinstant.net/mattcreager/DingDong');
  })
  .controller('TodoCtrl', ['$scope', '$goQuery', function($scope, $query) {

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

    $scope.showAll = function() {
      $scope.todos = $query('todos', {});
      $scope.todos.$sync();
    };

    $scope.showActive = function() {
      $scope.todos = $query('todos', { complete: false }, {});
      $scope.todos.$sync();
    };

    $scope.showComplete = function() {
      $scope.todos = $query('todos', { complete: true }, {});
      $scope.todos.$sync();
    };

    $scope.clearCompleted = function() {
      var completeTodos = $query('todos', { complete: true }, {}).$sync();

      completeTodos.$on('ready', function() {
         _.map(completeTodos.$omit(), function(todo, key) {
          completeTodos.$key(key).$remove();
        });
      });
    };

    $scope.showAll();
  }]);
