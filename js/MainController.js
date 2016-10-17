
(function () {

    var app = angular.module("githubView");

    var MainController = function ($scope, $interval, $log, $location) {

         var decrementcountdown = function () {
            $scope.countdown -= 1;
            if ($scope.countdown < 1) {
                $scope.search($scope.username);
            }
         }
         var intervalcountdown = null;
           var startcountdown = function () {
            intervalcountdown=$interval(decrementcountdown, 1000, $scope.countdown);
           }

        $scope.search = function (username) {
            $log.info("searching for " + username);
          
            if (intervalcountdown) {
                $interval.cancel(intervalcountdown);
                $scope.countdown = null;
            };
            $location.path("/user/" + username);
        };
       
         
        
        
       
        $scope.username = "Angular";
       
        $scope.countdown = 5;
        startcountdown();
    };

    app.controller("MainController",MainController);

    }()); 


