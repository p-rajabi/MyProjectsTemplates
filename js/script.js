
var MainController = function ($scope, $http) {

    var onUserComplete = function (response) {
        $scope.user = response.data;
    }

    var onError = function (reason) {
        $scope.error = "can't find data";
    }

    $http.get("http://api.github.com/users/odetocode")
         .then(onUserComplete, onError)
   
}

   


