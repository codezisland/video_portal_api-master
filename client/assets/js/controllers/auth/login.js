app.controller("AuthLoginController", ["$scope","authService","$location", function($scope, authService, $location){
    angular.extend($scope, {
        username: null,
        password: null,
        notification: null,

        submitForm : function() {
            authService.login($scope.username, $scope.password).then(
                function(){
                    $location.path("/");
                },
                function(error){
                    $scope.notification = error;
                }
            );
        },

        close: function(){
            $scope.notification = null;
        }
    });
}]);