app.controller("HeaderController", ["$scope","authService","$location", function($scope, authService, $location){
    angular.extend($scope, {
        notification: null,

        logout : function() {
            authService.logout().then(
                function(){
                    $location.path("/login");
                },
                function(response){
                    $scope.notification = response.error;
                }
            );
        },

        close: function(){
            $scope.notification = null;
        }
    });
}]);