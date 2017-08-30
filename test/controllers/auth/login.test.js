describe('AuthLoginController', function() {
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
        spyOn(authService, 'login').and.returnValue(deferred.promise);

        _$controller_('AuthLoginController', { 
            $scope: $scope,
            authService: authService,
        });
    }));

    describe('notification', function() {
        it('close notification', function() {
            $scope.notification = "fake message";
            $scope.close();

            expect($scope.notification).toBeNull();
        });

    });

    describe('login', function() {

        it('auth success', inject(function($location){
            $scope.submitForm();

             // mocks the promise
            deferred.resolve();
            $scope.$apply();

            expect($location.path()).toEqual("/");    
        }));

        it('auth fail', inject(function($location){
            $scope.submitForm();           

             // mocks the promise
            deferred.reject("An error ocurred.");
            $scope.$apply();

            expect($scope.notification).toEqual("An error ocurred.");  
        }));
    });
});