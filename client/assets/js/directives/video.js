angular.module('videoApp')
    .directive('videoItem', [function () {
        return {
            restrict: "E",
            templateUrl: 'views/video/item.html',
            scope: {
                item: '='
            },
            controller: ['$scope','videoService', function ($scope, videoService) {
                $scope.item["rate"] = videoService.rateAvg($scope.item);

                angular.extend($scope, {
                    play: function(video){
                        var element = document.getElementById(video._id);

                        if (element.paused){
                            element.play();
                            element.setAttribute('running','running');
                            videoService.stopAllVideos(video._id);
                        }else{
                            element.pause();
                            element.removeAttribute('running');
                        }
                    }
                });
            }]
        };
    }]);


//directive to capture when a video was played
angular.module('videoApp').directive('onVideoPlay', function () {
    return function ($scope, $element, $attrs) {
        $element.bind("play", function (event) {
            $scope.$apply(function () {
                $scope.$eval($attrs.onVideoPlay, {});
            });
        });
    }
});