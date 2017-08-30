describe('HeaderController', function() {
    beforeEach(module('videoApp'));

    var $controller,
        $scope,
        $q,
        deferred

    beforeEach(inject(function(_$controller_, _$rootScope_, _$q_, authService){
        $q = _$q_;
        $scope = _$rootScope_.$new();

        // We use the $q service to create a mock instance of defer
        deferred = _$q_.defer();
        
        // Use a Jasmine Spy to return the deferred promise
        spyOn(authService, 'logout').and.returnValue(deferred.promise);

        _$controller_('HeaderController', { 
            $scope: $scope,
            authService: authService,
        });
    }));

    describe('logout', function() {

        it('close session success', inject(function($location){
            $scope.logout();

             // mocks the promise
            deferred.resolve();
            $scope.$apply();

            expect($location.path()).toEqual("/login");    
        }));

        it('close session fails', inject(function($location){
            $scope.logout();           

             // mocks the promise
            deferred.reject({error: "An error ocurred."});
            $scope.$apply();

            expect($scope.notification).toEqual("An error ocurred.");  
        }));
    });
});