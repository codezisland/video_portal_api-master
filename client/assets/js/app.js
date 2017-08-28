var app = angular.module('videoApp', ['ngRoute', 'ngCookies', 'ngTouch', 'ui.bootstrap', 'angular-md5', 'infinite-scroll']);

app.config(['$routeProvider', '$httpProvider',  function ($routeProvider, $httpProvider) {
    $httpProvider.interceptors.push(["$q", "$location", function ($q, $location) {

        function _responseError(rejection) {
            // unauthenticated
            if (rejection.status === 401){
                $location.path("/login");
                return $q.reject(rejection);
            }

            return $q.reject(rejection);
        }

        return {
            responseError: _responseError
        };
    }
    ]);
}]);