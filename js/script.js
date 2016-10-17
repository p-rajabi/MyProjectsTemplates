
(function () {

    var app = angular.module("githubView", []);

    var MainController = function ($scope, $http, $interval, $log) {

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
            $log.info("serarching for " + $scope.username);
            $http.get("http://api.github.com/users/" + username)
                 .then(onUserComplete, onError);
            if (intervalcountdown) {
                $interval.cancel(intervalcountdown);
                $scope.countdown = null;
            }
           
        }

        var decrementcountdown = function () {
            $scope.countdown -= 1;
            if ($scope.countdown < 1) {
                $scope.search($scope.username);
            }
        }

        
       
        var startcountdown = function () {
            intervalcountdown=$interval(decrementcountdown, 1000, $scope.countdown);
        }
        
        var intervalcountdown = null;
        $scope.username = "Angular";
        $scope.repoSortOrder = '-stargazers_count';
        $scope.countdown = 5;
        startcountdown();
    };

    app.controller("MainController",MainController);

    }()); 


