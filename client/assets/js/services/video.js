angular.module('videoApp')
    .service('videoService', ['helperService', function(helperService){
        return {
            pageSize: 10,
            rate: function(videoId, rating){
                return helperService.http({
                    method: 'POST',
                    url: "/video/ratings",
                    data: {
                        videoId: videoId,
                        rating: rating
                    }
                });
            },
            rateAvg: function(video){
                if (video.ratings == null || video.ratings.length == 0)
                    return 0;

                // rating average
                var _rate = 0;
                for(var r in video.ratings)
                    _rate+= video.ratings[r];

                return parseFloat((_rate / video.ratings.length).toFixed(2));
            },
            stopAllVideos: function(videoId){
                var videos = document.getElementsByTagName("video");

                for (var i = 0; i < videos.length; i++){
                    if (videos[i].id != videoId){
                        videos[i].pause();
                        videos[i].removeAttribute('running');
                    }
                }
            },

            list: function(skip, limit){
                return helperService.http({
                    method: 'GET',
                    url: "/videos",
                    params: {
                        skip: skip,
                        limit: limit
                    }
                });
            },
            get: function(videoId){
                return helperService.http({
                    method: 'GET',
                    url: "/video",
                    params: {
                        videoId: videoId
                    }
                });
            }
        }
}]);