(function () {
 
    var app = angular.module("githubView", ["ngRoute"]);
    app.config(function ($routeProvider) {
        $routeProvider
            .when("/main", {
                templateUrl: "main.html",
                controller: "MainController"
            })
            .when("/user/:username", {
                templateUrl: "user.html",
                controller:"userController"
            })
            .otherwise({ redirectTo: "/main" });
    })

}());