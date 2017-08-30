app.controller("VideoListController", ["$scope","initVideos","videoService", function($scope, initVideos, videoService){
    angular.extend($scope, {
        first: true,
        loading: false,
        noData: false,
        notification: null,
        items: initVideos,

        loadMore: function(){
            // avoid first request, initial elements was injected in initVideos
           if ($scope.first){
                $scope.first = false;
                return;
            }

            if ($scope.loading || $scope.noData)
                return;

            $scope.loading = true;

            videoService.list($scope.items.length, videoService.pageSize).then(function(response){
                    for (var i = 0; i < response.length; i++)
                        $scope.items.push(response[i]);

                    $scope.loading = false;

                    // loaded all videos
                    if (response.length < videoService.pageSize)
                        $scope.noData = true;
                }
            , function(response){
                $scope.notification = response.error;
            });
        },
        close: function(){
            $scope.notification = null;
        }
    });
}]);