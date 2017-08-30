app.controller("VideoDetailsController", ["$scope","video", "suggestedVideos", 'videoService',
    function($scope, video, suggestedVideos, videoService){
        video["rate"] = videoService.rateAvg(video);

        angular.extend($scope, {
            rate: null,
            rated: false,
            video: video,
            showVoteForm: false,
            play: function(){
                videoService.stopAllVideos($scope.video._id);
            },
            items: suggestedVideos,
            rateVideo : function(rate){
                if ($scope.rated)
                    return;

                $scope.rated = true;

                videoService.rate($scope.video._id, rate).then(function(response){
                    $scope.video = response;
                    $scope.video.rate = videoService.rateAvg($scope.video);

                }, function(reject){});
            }
        });

        // listener for rate
        $scope.$watch('rate', function(newValue, oldValue) {
            if (newValue != null)
                $scope.rateVideo(newValue);
        });
}]);