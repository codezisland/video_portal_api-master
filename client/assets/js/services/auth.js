angular.module('videoApp')
    .service('authService', ['$q','helperService','md5','$cookies', function($q,helperService,md5,$cookies){
        return {
            login: function(username, password){
                var deferred = $q.defer();

                helperService.http({
                    method: 'POST',
                    url: "/user/auth",
                    data: {
                        username: username,
                        password: md5.createHash(password)
                    }
                }).then(function (response) {
                        $cookies.put('sessionId', response["sessionId"]);
                        return deferred.resolve(response);
                    }, deferred.reject
                );

                return deferred.promise;
            },
            logout: function(){
                return helperService.http({
                    method: 'GET',
                    url: "/user/logout"
                });
            }
        }
}]);