
(function () {

    var app = angular.module("githubView", []);

    var MainController = function ($scope, $http) {

        var onUserComplete = function (response) {
            $scope.user = response.data;
            $http.get($scope.user.repos_url)
                 .then(onRepos, onError);
        };

        var onRepos = function (response) {
            $scope.repos = response.data;
        }

        var onError = function (reason) {
            $scope.error = "can't find data";
        };

        $scope.search = function (username) {
            $http.get("http://api.github.com/users/" + username)
                 .then(onUserComplete, onError);
        }

        $scope.username = "Angular";

    };

    app.controller("MainController", MainController);

    }()); 


