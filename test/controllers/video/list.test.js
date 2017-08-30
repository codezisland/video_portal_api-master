describe('VideoListController', function() {
	var _videos1 = [],
		_videos2 = [];

	// seed videos
	for(let i = 0; i < 24;i++){
		if (i < 10)
			_videos1.push({_id: i});
		else
			_videos2.push({_id: i});
	}

	var _len1 = _videos1.length, 
		_len2 = _videos2.length;

    var $scope,
        $q,
        deferred;

    beforeEach(module('videoApp'));

    beforeEach(inject(function(_$controller_, _$rootScope_, _$q_, videoService) {
        $q = _$q_;
        $scope = _$rootScope_.$new();

        // We use the $q service to create a mock instance of defer
        deferred = _$q_.defer();
        
        // Use a Jasmine Spy to return the deferred promise
        spyOn(videoService, 'list').and.returnValue(deferred.promise);

        // Init the controller, passing our spy service instance
        _$controller_('VideoListController', { 
              $scope: $scope,
              initVideos : angular.copy(_videos1),
              videoService: videoService
        });
    }));

    describe("video requests", function(){

	    it('load videos success', function () {
	    	deferred.resolve( _videos2 );

	    	// the first call to loadMore avoid unnecesary request to server
	        $scope.loadMore();
	        $scope.$apply();
			
			expect($scope.items.length).toEqual(_len1);        

			// second request
	        $scope.loadMore();

	        expect($scope.loading).toEqual(true);
	        
	        $scope.$apply();

	        expect($scope.loading).toEqual(false);

	      	expect($scope.items.length).toEqual(_len1 + _len2);        
	    });

	    it('load videos fails', function () {
	    	// the first call to loadMore avoid unnecesary request to server
	        $scope.loadMore();
			
			//first request didn't send then don't have any error yet 
			expect($scope.notification).toBeNull();

			// second request trigger error
	        $scope.loadMore();
	    	deferred.reject({ error: "Some error..." });
	        $scope.$apply();

	      	expect($scope.notification).toEqual("Some error...");
	    });
    })    

    describe("notification", function(){
    	 it('close notification', function() {
            $scope.notification = "fake message";
            $scope.close();

            expect($scope.notification).toBeNull();
        });
  	})    
});