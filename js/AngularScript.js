(function () {
    var app = angular.module("githubviewer", []);

    var MainController = function ($scope, $http, $interval, $log ,$location, $anchorScroll ) {

        //******************************************
        //when loaded data

        var onUserComplete = function (response) {
            $scope.user = response.data;
            $http.get($scope.user.repos_url)
                 .then(onRepos, onError);
        }

        //******************************************
        //Repository data

        var onRepos = function (response) {
            $scope.repos = response.data;
            $location.hash("userDetails");
            $anchorSchroll();
        }

        //******************************************
        //error when it can't fetch the user

        var onError = function (reason) {
            $scope.error = "Could not fetch the user."
        };

        //******************************************
        //Coundown to 5 and search if user didn't search

        var decrementCountDown = function () {
            $scope.CountDown -= 1;
            if ($scope.CountDown < 1) {
                $scope.search($scope.username);
            }
        };

        //******************************************
        //after 1s call startCountDown function

        var countDownInterval = null;

        var startCountDown = function () {
           countDownInterval= $interval(decrementCountDown, 1000, $scope.CountDown);
        }

        //******************************************
        //Search function for username

        $scope.search = function (username) {
            $log.info("Searching for " + username);
            $http.get("http://api.github.com/users/" +username)
             .then(onUserComplete, onError);

            //*******************************************
            //Stop counting down if user searched something

            if (countDownInterval){
                $interval.cancel(countDownInterval);
                $scope.CountDown = null;
            }
        };
        

        $scope.username="angular"
        $scope.message = "GitHub viewer";
        $scope.reposortorder = "-stargazers_count";
        $scope.CountDown = 5;
        startCountDown();
    }

    app.controller("MainController", MainController);
    
}());