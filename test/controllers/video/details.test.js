describe('VideoDetailsController', function() {
    var _video = { ratings: [1, 2, 3, 4, 5]},
        _avg = 3,
        $scope,
        $q,
        deferred;

    beforeEach(module('videoApp'));

    beforeEach(inject(function(_$controller_, _$rootScope_, _$q_, videoService) {
        $q = _$q_;
        $scope = _$rootScope_.$new();

        // We use the $q service to create a mock instance of defer
        deferred = _$q_.defer();
        
        // Use a Jasmine Spy to return the deferred promise
        spyOn(videoService, 'rate').and.returnValue(deferred.promise);
        
        // Init the controller, passing our spy service instance
        _$controller_('VideoDetailsController', { 
              $scope: $scope,
              video : _video,
              suggestedVideos: [],
              videoService: videoService
        });
    }));

    it('rate video success', function () {
        expect($scope.video.rate).toEqual(_avg);

        var _ratings = [5, 4, 3];
        $scope.rateVideo(3);

        // mocks the promise
        deferred.resolve( {ratings: _ratings});
        $scope.$apply();

        expect($scope.video.ratings).toEqual(_ratings);
        expect($scope.video.rate).toEqual(4);
    });
});