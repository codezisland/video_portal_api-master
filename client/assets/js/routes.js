angular.module('videoApp')
    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider.when('/login', {
            templateUrl: "views/auth/form.html",
            controller: 'AuthLoginController'
        });

        $routeProvider.when('/', {
            templateUrl: "views/video/index.html",
            controller: 'VideoListController',
            resolve: {
                initVideos: ['videoService', function(videoService){
                    return videoService.list(0, videoService.pageSize);
                }]
            }
        });

        $routeProvider.when('/video/:videoId', {
            templateUrl: "views/video/details.html",
            controller: 'VideoDetailsController',
            resolve: {
                video: ['videoService', '$route', function(videoService, $route){
                    return videoService.get($route.current.params.videoId);
                }],
                suggestedVideos: ['videoService', function(videoService){
                    return videoService.list(0, 4);
                }]
            }
        });

        $routeProvider.otherwise({ redirectTo: '/' });
}]);
