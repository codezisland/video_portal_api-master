app.controller("AuthLoginController", ["$scope","authService","$location", function($scope, authService, $location){
    angular.extend($scope, {
        username: null,
        password: null,
        notification: null,

        send : function() {
            authService.login($scope.username, $scope.password).then(
                function(){
                    $location.path("/");
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