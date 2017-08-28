app.controller("VideoListController", ["$scope","initVideos","videoService", function($scope, initVideos, videoService){
    angular.extend($scope, {
        first: true,
        loading: false,
        noData: false,
        notification: null,
        items: initVideos.data,

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
                    var data = response.data;

                    for (var i = 0; i < data.length; i++)
                        $scope.items.push(data[i]);

                    $scope.loading = false;

                    // loaded all videos
                    if (data.length < videoService.pageSize)
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