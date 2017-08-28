angular.module('videoApp')
    .service('helperService', ['$http', '$q','$cookies', function ($http, $q, $cookies) {
        function _http(httpParams) {
            var deferred = $q.defer();

            var sessionId = $cookies.get('sessionId');

            if (sessionId){
                if (httpParams.params)
                    httpParams.params["sessionId"] = sessionId;
                else
                    httpParams.params = { sessionId: sessionId };
            }

            $http(httpParams).then(
                function (response) {
                    if (response.status === 200 && response.data && response.data.status === "success") {
                        deferred.resolve(response.data);
                    } else {
                        deferred.reject(response.data);
                    }
                },
                function(response){
                    if (response && response.data)
                        deferred.reject(response.data);
                    else
                        deferred.reject({error: "Something was wrong.."});
                }
            );

            return deferred.promise;
        }

        return {
            http: _http
        }
}]);
