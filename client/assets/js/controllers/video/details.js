app.controller("VideoDetailsController", ["$scope","video", "suggestedVideos", 'videoService',
    function($scope, video, suggestedVideos, videoService){

        var _video =  video.data;
        _video["rate"] = videoService.rateAvg(_video);

        angular.extend($scope, {
            rate: null,
            video: _video,
            showVoteForm: false,
            play: function(){
                videoService.stopAllVideos($scope.video._id);
            },
            items: suggestedVideos.data
        });

        // listener for rate
        $scope.$watch('rate', function(newValue, oldValue) {
            if (newValue != null){
                videoService.rate($scope.video._id, newValue).then(function(response){
                    $scope.video = response.data;
                    $scope.video.rate = videoService.rateAvg($scope.video);

                }, function(reject){});
            }
        });
}]);