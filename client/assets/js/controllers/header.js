app.controller("HeaderController", ["$scope","authService","$location", function($scope, authService, $location){
    angular.extend($scope, {
        logout : function() {
            authService.logout().then(
                function(){
                    $location.path("/login");
                },
                function(error){}
            );
        }
    });
}]);