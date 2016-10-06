(function () {
    var app = angular.module("githubviewer", []);

    var MainController = function ($scope, $http, $interval, $log) {

        var onUserComplete = function (response) {
            $scope.user = response.data;
            $http.get($scope.user.repos_url)
                 .then(onRepos, onError);
        }

        var onRepos = function (response) {
            $scope.repos = response.data;
        }

        var onError = function (reason) {
            $scope.error = "Could not fetch the user."
        };

        var decrementCountDown = function () {
            $scope.CountDown -= 1;
            if ($scope.CountDown < 1) {
                $scope.search($scope.username);
            }
        };
        // too Changes hameye taghiraat ro neshoon mide behet ... 
        // bad ye message barash type mikoni va committesh mikoni... 
        var startCountDown = function () {
            $interval(decrementCountDown, 1000, $scope.CountDown);
        }

        $scope.search = function (username) {
            $log.info("Searching for " + username);
            $http.get("http://api.github.com/users/" +username)
             .then(onUserComplete, onError);
        };
        

        $scope.username="angular"
        $scope.message = "GitHub viewer";
        $scope.reposortorder = "-stargazers_count";
        $scope.CountDown = 5;
        startCountDown();
    }

    app.controller("MainController", MainController);

}());