
(function () {

    var app = angular.module("githubView", []);

    var MainController = function ($scope, github, $interval, $log, $location ,$anchorScroll) {

        var onUserComplete = function (data) {
            $scope.user = data;
            github.getRepos($scope.user).then(onRepos,onError);
                 
        };

        var onRepos = function (data) {
            $scope.repos =data;
            $location.hash("userinfo");
            $anchorScroll();
        }

        var onError = function (reason) {
            $scope.error = "can't find data";
        };

        
        $scope.search = function (username) {
            $log.info("serarching for " + $scope.username);
            github.getUser(username).then(onUserComplete, onError);
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


