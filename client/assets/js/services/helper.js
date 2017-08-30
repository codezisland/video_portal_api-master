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
                    if (response.data.status === "success"){
                        // debugger;
                        if (response.data.hasOwnProperty('data'))
                            deferred.resolve(response.data.data);
                        else
                            deferred.resolve(response.data);

                        return;
                    }

                    if (response.data.hasOwnProperty('error')) {
                        deferred.reject(response.data.error);
                        return;
                     }

                    deferred.reject("Something was wrong..");

                }, function(response){
                    if (response && response.data)
                        deferred.reject(response.data);
                    else
                        deferred.reject("Something was wrong..");
                }
            );

            return deferred.promise;
        }

        return {
            http: _http
        }
}]);
