var app = angular.module("app.todos", ["xeditable"]);

app.controller("todoController", ['$scope', 'svTodos', function ($scope, svTodos) {
    $scope.appName = "Node todos !!!";
    $scope.formData = {};
    $scope.todos = [];

    svTodos.get().success(function (data){
        $scope.todos = data;
    })

    $scope.createTodo = function () {
        var todo = {
            text: $scope.formData.text,
            isDone: false,
        }

        svTodos.create(todo)
        .success(function (data) {
            $scope.todos = data;
            $scope.formData.text = "";
        })
    }

    $scope.updataTodo = function (todo) {
        console.log("Updata", todo);
    }

    $scope.deleteTodo = function (todo) {
        console.log("Updata", todo);
    }
}]);